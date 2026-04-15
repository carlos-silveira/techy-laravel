<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class HealArticleSummaries extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'articles:heal-summaries {--force : Regenerate even if summary exists}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Recover missing ai_summary by extracting snippets from content';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $query = Article::query();
        
        if (!$this->option('force')) {
            $query->whereNull('ai_summary')->orWhere('ai_summary', '');
        }

        $articles = $query->get();

        if ($articles->isEmpty()) {
            $this->info("No articles need healing.");
            return;
        }

        $this->info("Found " . $articles->count() . " articles to heal.");

        foreach ($articles as $article) {
            $cleanContent = strip_tags($article->content);
            $cleanContent = preg_replace('/\s+/', ' ', $cleanContent);
            $summary = Str::limit($cleanContent, 200);

            $article->update([
                'ai_summary' => $summary
            ]);

            $this->line("Healed Article #{$article->id}: " . Str::limit($article->title, 40));
        }

        \Illuminate\Support\Facades\Cache::flush();
        $this->info("Done! Caches flushed.");
    }
}
