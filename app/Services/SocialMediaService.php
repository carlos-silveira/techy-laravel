<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Abraham\TwitterOAuth\TwitterOAuth;

class SocialMediaService
{
    /**
     * Post to Twitter using Twitter API v2.
     * Uses OAuth 1.0a User Context or OAuth 2.0.
     * Assuming basic Bearer Token or simplified payload logic for the end-user API keys.
     */
    public function postToTwitter(Article $article)
    {
        $consumerKey = env('TWITTER_CONSUMER_KEY');
        $consumerSecret = env('TWITTER_CONSUMER_SECRET');
        $accessToken = env('TWITTER_ACCESS_TOKEN');
        $accessTokenSecret = env('TWITTER_ACCESS_TOKEN_SECRET');

        if (!$consumerKey || !$consumerSecret || !$accessToken || !$accessTokenSecret) {
            Log::warning('Twitter post skipped. OAuth 1.0a API Keys missing in .env.');
            return false;
        }

        try {
            $tweetText = $this->formatPostText($article);
            
            // Twitter requires OAuth 1.0a to post tweets; Bearer tokens are read-only.
            $connection = new TwitterOAuth($consumerKey, $consumerSecret, $accessToken, $accessTokenSecret);
            $connection->setApiVersion('2');
            
            $response = $connection->post("tweets", ["text" => $tweetText], ["jsonPayload" => true]);

            if ($connection->getLastHttpCode() == 201) {
                Log::info("Successfully posted to Twitter: {$article->slug}");
                return true;
            } else {
                Log::error("Failed to post to Twitter: " . json_encode($response));
                return false;
            }
        } catch (\Exception $e) {
            Log::error("Twitter Integration Exception: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Post to a Facebook Page using Graph API.
     */
    public function postToFacebook(Article $article)
    {
        if (!env('FACEBOOK_PAGE_ID') || !env('FACEBOOK_PAGE_ACCESS_TOKEN')) {
            Log::warning('Facebook post skipped. API Keys missing in .env.');
            return false;
        }

        try {
            $postText = $this->formatPostText($article);
            $pageId = env('FACEBOOK_PAGE_ID');
            $accessToken = env('FACEBOOK_PAGE_ACCESS_TOKEN');
            $link = url('/article/' . $article->slug);

            $response = Http::post("https://graph.facebook.com/v19.0/{$pageId}/feed", [
                'message' => $postText,
                'link' => $link,
                'access_token' => $accessToken,
            ]);

            if ($response->successful()) {
                Log::info("Successfully posted to Facebook Page: {$article->slug}");
                return true;
            } else {
                Log::error("Failed to post to Facebook: " . $response->body());
                return false;
            }
        } catch (\Exception $e) {
            Log::error("Facebook Integration Exception: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Helper to format the final string going to the social networks.
     */
    private function formatPostText(Article $article): string
    {
        $text = $article->ai_summary ?: $article->title;
        $url = url('/article/' . $article->slug);
        
        $hashtags = "\n\n#TechNews #Techy #AI";
        
        // Truncate logic if needed, Twitter max is 280, URL is ~23 chars format
        $maxChars = 280 - strlen($url) - strlen($hashtags) - 10;
        
        if (strlen($text) > $maxChars) {
            $text = substr($text, 0, $maxChars - 3) . '...';
        }

        return "{$text}\n\nRead more: {$url}{$hashtags}";
    }
}
