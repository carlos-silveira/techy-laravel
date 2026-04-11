<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\GeminiService;

class RewriteArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'articles:rewrite';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Rewrite existing articles to strictly adhere to new clickbait, anti-slop rules without losing analytics data.';

    /**
     * Execute the console command.
     */
    public function handle(GeminiService $gemini)
    {
        $articles = Article::all();
        $total = $articles->count();

        $this->info("Found {$total} articles to rewrite.");
        $bar = $this->output->createProgressBar($total);
        $bar->start();

        foreach ($articles as $article) {
            $this->info("\nRewriting: {$article->title}");
            
            // Re-draft based on the current title & summary to maintain contextual integrity
            $promptContext = 'Rewrite this article to make it infinitely better, maintaining the original topic but enforcing strict rules. Current Summary: ' . $article->ai_summary;
            
            try {
                // Pass the existing content itself as the context for better continuity
                $newsContext = [
                    ['title' => $article->title, 'source' => 'Original Content']
                ];

                // Generate new content
                $result = $gemini->generateDraft($article->title, $promptContext, $newsContext);
                
                // Update article ONLY if we got a valid result (Exception would have been thrown otherwise)
                $article->title = $result['titular'] ?? $article->title;
                $article->content = $result['cuerpo_noticia'] ?? $article->content;
                $article->ai_summary = $result['tldr_twitter'] ?? $article->ai_summary;
                
                // Clear translations so they get auto-translated dynamically on next view
                $article->translations = [];
                
                $article->save();
                $this->info("\n✅ Re-drafted: {$article->title}");

                // Wait 15 seconds to avoid rate-limiting the Gemini API
                sleep(15);
            } catch (\App\Exceptions\GenerationException $e) {
                $this->error("\n⚠️ Skipping article ID {$article->id} due to generation failure: " . $e->getMessage());
            } catch (\Exception $e) {
                $this->error("\n❌ System error on article ID {$article->id}: " . $e->getMessage());
            }

            $bar->advance();
        }

        $bar->finish();
        $this->info("\nAll articles rewritten. Running vector embedding to update RAG base...");
        
        $this->call('vector:embed');

        $this->info("Rewrite Pipeline Complete.");
    }
}
