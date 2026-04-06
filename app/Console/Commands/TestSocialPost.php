<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\SocialMediaService;

class TestSocialPost extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:social-post {slug?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test the autonomous Social Media Integration Service by attempting to post an article.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $slug = $this->argument('slug');

        if ($slug) {
            $article = Article::where('slug', $slug)->first();
        } else {
            $article = Article::where('status', 'published')->latest()->first();
        }

        if (!$article) {
            $this->error('No articles found in the database to test with.');
            return 1;
        }

        $this->info("Attempting to post article: {$article->title}");

        $service = new SocialMediaService();

        // 1. Twitter
        $this->line("-> Pinging Twitter API v2...");
        if (!env('TWITTER_BEARER_TOKEN')) {
            $this->warn("   [!] Missing Twitter Keys in .env (TWITTER_BEARER_TOKEN).");
        } else {
            $tw = $service->postToTwitter($article);
            if ($tw) $this->info("   [✓] Twitter Post Success!");
            else $this->error("   [x] Twitter Post Failed. Check logs.");
        }

        // 2. Facebook
        $this->line("-> Pinging Facebook Graph API...");
        if (!env('FACEBOOK_PAGE_ID') || !env('FACEBOOK_PAGE_ACCESS_TOKEN')) {
            $this->warn("   [!] Missing Facebook Keys in .env.");
        } else {
            $fb = $service->postToFacebook($article);
            if ($fb) $this->info("   [✓] Facebook Post Success!");
            else $this->error("   [x] Facebook Post Failed. Check logs.");
        }

        $this->info("Done! If you saw warnings, please create the developer accounts and add the keys to .env.");
        return 0;
    }
}
