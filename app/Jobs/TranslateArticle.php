<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class TranslateArticle implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $article;
    public $locale;

    /**
     * Create a new job instance.
     *
     * @param \App\Models\Article $article
     * @param string $locale
     * @return void
     */
    public function __construct(\App\Models\Article $article, string $locale)
    {
        $this->article = $article;
        $this->locale = $locale;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(\App\Services\GeminiService $geminiService)
    {
        try {
            // Already translated?
            $translations = $this->article->translations ?? [];
            if (isset($translations[$this->locale])) {
                return;
            }

            // Check if AI is currently paused globally due to RPD limit
            if ($geminiService->isQuotaExhausted()) {
                \Illuminate\Support\Facades\Log::notice("AI Quota exhausted. Postponing translation for Article #{$this->article->id} ({$this->locale}) to tomorrow.");
                $this->release(86400); // Try again in 24 hours
                return;
            }

            // Mandatory delay to respect Gemini Free Tier rate limits (RPM/RPD)
            sleep(10);

            // Perform translation
            $result = $geminiService->translateArticle(
                $this->article->title,
                $this->article->ai_summary ?? '',
                $this->article->content ?? '',
                $this->locale
            );

            // VALIDATION: Only save if we got a real title that is different from original
            // If it is the same, it likely failed or Gemini returned original text
            if (empty($result['title']) || $result['title'] === $this->article->title) {
                throw new \RuntimeException("Translation failed or returned original text for Article #{$this->article->id} ({$this->locale})");
            }

            // Save results
            $translations[$this->locale] = [
                'title' => $result['title'],
                'summary' => $result['summary'] ?? $this->article->ai_summary,
                'content' => $result['content'] ?? $this->article->content,
            ];
            
            $this->article->update(['translations' => $translations]);
            
            \Illuminate\Support\Facades\Log::info("Background translation complete for Article #{$this->article->id} -> {$this->locale}");
        } catch (\Exception $e) {
            // Handle specific Quota Exhausted exception from service
            if (str_contains($e->getMessage(), 'QUOTA_EXHAUSTED')) {
                \Illuminate\Support\Facades\Log::notice("Gemini Quota Hit. Re-queueing Article #{$this->article->id} for tomorrow.");
                $this->release(86400); 
                return;
            }

            \Illuminate\Support\Facades\Log::error("Background translation failed: " . $e->getMessage());
            throw $e; // Retry according to queue config
        }
    }
}
