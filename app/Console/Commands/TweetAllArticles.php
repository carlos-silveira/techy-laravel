<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use Abraham\TwitterOAuth\TwitterOAuth;

class TweetAllArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'social:tweet-all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Automatically tweet the TLDRs of all articles to the X account.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $consumerKey = config('services.twitter.consumer_key');
        $consumerSecret = config('services.twitter.consumer_secret');
        $accessToken = config('services.twitter.access_token');
        $accessTokenSecret = config('services.twitter.access_token_secret');

        if (!$consumerKey || !$accessToken) {
            $this->error('Twitter credentials are not properly configured.');
            return;
        }

        $connection = new TwitterOAuth($consumerKey, $consumerSecret, $accessToken, $accessTokenSecret);
        $connection->setApiVersion('2');

        $articles = Article::where('status', 'published')->get();
        $this->info("Found " . $articles->count() . " articles to check/tweet.");

        $tweetedCount = 0;

        foreach ($articles as $article) {
            if (empty($article->ai_summary)) {
                continue; // Can't tweet without TLDR
            }

            // In a real production scenario, we'd add 'is_tweeted' to DB. For YOLO, we'll try to tweet them all.
            // X API limits duplicate tweets anyway.
            $link = url("/article/{$article->slug}");
            $tweetText = "{$article->ai_summary}\n\nRead the full report: {$link}";

            // Enforce hard tweet length limits (280 chars max)
            if (strlen($tweetText) > 280) {
                $cutoff = 280 - strlen("\n\nRead the full report: {$link}") - 3;
                $tweetText = substr($article->ai_summary, 0, $cutoff) . "...\n\nRead the full report: {$link}";
            }

            $this->info("Tweeting: {$article->title}");
            
            try {
                $response = $connection->post('tweets', ['text' => $tweetText], true);

                if ($connection->getLastHttpCode() == 201) {
                    $this->info("Successfully tweeted: {$article->title}");
                    $tweetedCount++;
                    sleep(20); // Prevent aggressive rate limits
                } else {
                    $this->error("Failed to tweet {$article->title}. Response: " . json_encode($response));
                }
            } catch (\Exception $e) {
                $this->error("Twitter API Error: " . $e->getMessage());
            }
        }

        $this->info("Done. Successfully published {$tweetedCount} tweets.");
    }
}
