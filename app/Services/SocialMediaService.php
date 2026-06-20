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
        // 1. Get Spanish Translations
        $translations = is_string($article->translations) ? json_decode($article->translations, true) : $article->translations;
        
        $title = $translations['es']['title'] ?? $article->title;
        $summary = $translations['es']['summary'] ?? $article->ai_summary;
        
        // 2. Generate Dynamic Hashtags from Article tags
        $tags = is_string($article->tags) ? json_decode($article->tags, true) : $article->tags;
        if (is_array($tags) && count($tags) > 0) {
            $hashtagsList = array_map(function($tag) {
                return '#' . str_replace([' ', '-', '_'], '', ucwords($tag));
            }, array_slice($tags, 0, 3));
            $dynamicHashtags = implode(' ', $hashtagsList);
        } else {
            $dynamicHashtags = "#TechNews #Tecnología";
        }
        
        // 3. Build Footer
        $link = rtrim(env('APP_URL', 'https://techynews.lat'), '/') . '/article/' . $article->slug;
        
        // Twitter counts ALL URLs as exactly 23 characters regardless of actual length.
        $footerTextForTwitterCount = "\n\nLee la nota completa: [23_CHAR_URL_PLACEHOLDER]\n\n{$dynamicHashtags}";
        $footerLen = mb_strlen($footerTextForTwitterCount, 'UTF-8');
        
        // Max space for summary
        $maxSummaryChars = 280 - mb_strlen($title, 'UTF-8') - 4 - $footerLen;
        
        // 4. Clean Truncation (no '...')
        if (mb_strlen($summary, 'UTF-8') > $maxSummaryChars) {
            $summary = mb_substr($summary, 0, $maxSummaryChars, 'UTF-8');
            // Cut at the last space to avoid broken words
            $lastSpace = mb_strrpos($summary, ' ', 0, 'UTF-8');
            if ($lastSpace !== false) {
                $summary = mb_substr($summary, 0, $lastSpace, 'UTF-8');
            }
            // Strip trailing punctuation and finish with a dot
            $summary = rtrim($summary, '.,;:!?-') . '.';
        }

        return "{$title}\n\n{$summary}\n\nLee la nota completa: {$link}\n\n{$dynamicHashtags}";
    }
}
