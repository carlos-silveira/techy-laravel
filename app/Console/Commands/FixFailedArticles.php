<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\GeminiService;
use App\Exceptions\GenerationException;

class FixFailedArticles extends Command
{
    protected $signature = 'articles:fix-failed-generation';
    protected $description = 'Find and rewrite articles that suffered from AI generation failures or prompt leaking.';

    public function handle(GeminiService $gemini)
    {
        $brokenArticles = Article::where('content', 'like', '%Failed to generate content%')
            ->orWhere('ai_summary', 'like', '%Rewrite this article%')
            ->get();

        $total = $brokenArticles->count();
        if ($total === 0) {
            $this->info("No broken articles found. Everything looks clean!");
            return 0;
        }

        $this->info("Found {$total} broken articles. Starting recovery...");

        foreach ($brokenArticles as $article) {
            $this->info("\nRecovering: {$article->title} (ID: {$article->id})");

            // We use the source_url if available for better context, otherwise title
            $ideaPrompt = "This article failed previously. High quality rewrite required. Maintain tone and topic.";
            $newsContext = [];
            
            if ($article->source_url) {
                $newsContext[] = [
                    'title' => $article->title,
                    'source' => $article->source_url
                ];
            } else {
                $newsContext[] = [
                    'title' => $article->title,
                    'source' => 'Original Intent'
                ];
            }

            try {
                // Generate new content using the hardened service
                $result = $gemini->generateDraft($article->title, $ideaPrompt, $newsContext);

                $article->title = $result['titular'] ?? $article->title;
                $article->content = $result['cuerpo_noticia'];
                $article->ai_summary = $result['tldr_twitter'] ?? $article->ai_summary;
                $article->status = 'published';
                $article->translations = []; // Reset translations
                
                $article->save();
                $this->info("✅ Successfully recovered article ID {$article->id}");

                // Aggressive throttle to ensure we don't hit rate limits during cleanup
                sleep(15);
            } catch (GenerationException $e) {
                $this->error("❌ Recovery failed for article ID {$article->id}: " . $e->getMessage());
            } catch (\Exception $e) {
                $this->error("❌ Critical error on article ID {$article->id}: " . $e->getMessage());
            }
        }

        $this->info("\nRecovery process finished. Updating RAG embeddings...");
        $this->call('vector:embed');
        
        return 0;
    }
}
