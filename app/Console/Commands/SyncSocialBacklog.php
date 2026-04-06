<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\SocialMediaService;

class SyncSocialBacklog extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'social:sync-backlog {--limit=10 : Protects API by capping batch size}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pushes existing database articles to Twitter up to a safety limit to avoid spam filters.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(SocialMediaService $socialMedia)
    {
        $limit = (int) $this->option('limit');
        $this->warn("⚠️ WARNING: You are attempting to mass-publish to Twitter.");
        $this->warn("Twitter's free API will instantly suspend accounts that burst-post more than ~15-17 tweets daily.");
        $this->info("Starting batch process. Limit cap: {$limit}");

        // Fetch the newest articles
        $articles = Article::where('status', 'published')
            ->latest()
            ->take($limit)
            ->get();

        if ($articles->isEmpty()) {
            $this->info("No articles found in the database. Run your generator first.");
            return 0;
        }

        $successCount = 0;
        foreach ($articles as $index => $article) {
            $this->info("🐦 [" . ($index + 1) . "/{$limit}] Tweeting: '{$article->title}'");
            
            $result = $socialMedia->postToTwitter($article);
            
            if ($result) {
                $successCount++;
                $this->info("   ✅ Tweet successful.");
            } else {
                $this->error("   ❌ Tweet failed (Rate limited or missing keys).");
            }

            // Artificial delay to prevent spam bot detection from Twitter heuristics
            if ($index < $articles->count() - 1) {
                $delay = rand(15, 25);
                $this->line("   ⏳ Sleeping for {$delay}s to avoid API ban...");
                sleep($delay);
            }
        }

        $this->info("🎉 Done! Successfully pushed {$successCount} articles to Twitter.");
        return 0;
    }
}
