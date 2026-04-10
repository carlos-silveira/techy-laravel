<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\GeminiService;

class EmbedArticles extends Command
{
    protected $signature = 'vector:embed {--all : Re-embed all articles}';
    protected $description = 'Generate embeddings for articles for RAG functionality';

    public function handle(GeminiService $gemini)
    {
        $query = Article::where('status', 'published');
        
        if (!$this->option('all')) {
            $query->whereNull('embedding');
        }

        $articles = $query->get();
        if ($articles->isEmpty()) {
            $this->info('No articles need embedding.');
            return 0;
        }

        $this->info('Embedding ' . $articles->count() . ' articles...');
        $bar = $this->output->createProgressBar($articles->count());

        foreach ($articles as $article) {
            // Build the string to embed
            $textToEmbed = "Title: {$article->title}\nSummary: {$article->ai_summary}\n\n" . strip_tags($article->content);
            $textToEmbed = substr($textToEmbed, 0, 5000); // Gemini embedding limit is large, but to be safe and save tokens

            $embedding = $gemini->embedText($textToEmbed);
            if (!empty($embedding)) {
                $article->update(['embedding' => $embedding]);
            } else {
                $this->error("\nFailed to embed article ID: {$article->id}");
            }

            $bar->advance();
            // sleep to avoid rate limits
            sleep(2);
        }

        $bar->finish();
        $this->info("\nDone!");
        return 0;
    }
}
