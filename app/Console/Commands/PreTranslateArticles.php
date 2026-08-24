<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\GeminiService;

class PreTranslateArticles extends Command
{
    protected $signature = 'articles:pre-translate 
                            {--limit=10 : Limit number of articles to process}
                            {--slug= : Specific article slug to process}
                            {--force : Force re-translation even if translation already exists}';
    protected $description = 'Pre-translate existing articles into English, Spanish, and Portuguese';

    public function handle(GeminiService $geminiService)
    {
        $limit = (int) $this->option('limit');
        $slug = $this->option('slug');
        $force = (bool) $this->option('force');
        
        $query = Article::where('status', 'published');

        if ($slug) {
            $query->where('slug', $slug);
        } else {
            $query->orderBy('id', 'desc')->take($limit);
        }

        $articles = $query->get();

        $this->info("🔄 Processing " . $articles->count() . " articles...");

        $locales = ['en', 'es', 'pt'];

        foreach ($articles as $article) {
            $this->info("📰 Article: {$article->title} (ID: {$article->id})");
            $translations = $article->translations ?? [];
            $updated = false;

            foreach ($locales as $locale) {
                // Skip if it's the source language
                if ($article->language === $locale) continue;

                $existing = $translations[$locale] ?? null;
                $isInvalid = Article::isInvalidTranslation($existing, $article->content);

                // Skip if already translated and valid (unless force is requested)
                if (!$force && !$isInvalid && isset($translations[$locale])) {
                    $this->line("  - " . strtoupper($locale) . ": Already exists and valid.");
                    continue;
                }

                if ($isInvalid && isset($translations[$locale])) {
                    $this->warn("  - " . strtoupper($locale) . ": Existing translation was placeholder/invalid. Re-translating...");
                }

                $this->info("  - " . strtoupper($locale) . ": Translating... (10s pause)");
                sleep(10);

                try {
                    $result = $geminiService->translateArticle(
                        $article->title,
                        $article->ai_summary ?? '',
                        $article->content ?? '',
                        $locale
                    );

                    $translations[$locale] = $result;
                    $updated = true;
                    $this->info("  - " . strtoupper($locale) . ": ✅ Done.");
                } catch (\Exception $e) {
                    $this->error("  - " . strtoupper($locale) . ": ❌ Failed: " . $e->getMessage());
                }
            }

            if ($updated) {
                $article->update(['translations' => $translations]);
                \Illuminate\Support\Facades\Cache::forget("homepage_editors_choice_es");
                \Illuminate\Support\Facades\Cache::forget("homepage_articles_es");
                \Illuminate\Support\Facades\Cache::forget("article_{$article->slug}_es");
                \Illuminate\Support\Facades\Cache::forget("article_{$article->slug}_en");
                \Illuminate\Support\Facades\Cache::forget("article_{$article->slug}_pt");
            }
        }

        $this->info('✅ Processing complete.');
    }
}
