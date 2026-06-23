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
        $consumerKey = config('services.twitter.consumer_key');
        $consumerSecret = config('services.twitter.consumer_secret');
        $accessToken = config('services.twitter.access_token');
        $accessTokenSecret = config('services.twitter.access_token_secret');

        if (!$consumerKey || !$consumerSecret || !$accessToken || !$accessTokenSecret) {
            Log::warning('Twitter post skipped. OAuth 1.0a API Keys missing in config.');
            return false;
        }

        try {
            $tweetText = $this->formatPostText($article);
            
            if (!$tweetText) {
                return false;
            }
            
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
        if (!config('services.facebook.page_id') || !config('services.facebook.page_access_token')) {
            Log::warning('Facebook post skipped. API Keys missing in config.');
            return false;
        }

        try {
            $translations = is_string($article->translations) ? json_decode($article->translations, true) : $article->translations;
            
            // ALWAYS SPANISH: Get the Spanish summary, or if unavailable, fallback to translating it on the fly or just use the English summary but ideally Spanish. 
            // Since we will move the dispatch AFTER translation, it should be available.
            $summaryEs = $translations['es']['summary'] ?? null;
            
            if (!$summaryEs) {
                // If translation somehow failed, we could log and abort to respect ALWAYS SPANISH.
                Log::warning("Facebook post skipped. Spanish translation unavailable for article: {$article->slug}");
                return false;
            }

            // Clean the summary to avoid "See more" - max ~250 chars
            $postText = $summaryEs;
            if (mb_strlen($postText, 'UTF-8') > 250) {
                $postText = mb_substr($postText, 0, 247, 'UTF-8') . '...';
            }

            $pageId = config('services.facebook.page_id');
            $accessToken = config('services.facebook.page_access_token');
            $baseUrl = rtrim(config('app.url', 'https://techynews.lat'), '/');
            // Force HTTPS to avoid redirect loops or cPanel firewall rules blocking HTTP bot requests
            if (!str_starts_with($baseUrl, 'https://')) {
                $baseUrl = str_replace('http://', 'https://', $baseUrl);
            }
            $link = $baseUrl . '/article/' . $article->slug;

            // 1. Force Facebook to scrape the URL first. 
            // This prevents the "403 Forbidden" preview bug where FB's internal crawler 
            // fails to fetch the OpenGraph data concurrently with the feed post.
            Http::post("https://graph.facebook.com/v19.0/", [
                'id' => $link,
                'scrape' => 'true',
                'access_token' => $accessToken,
            ]);

            // Wait 2 seconds to allow Facebook's cache to propagate internally
            sleep(2);

            // 2. POST ONLY the summary, no title, no hashtags.
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
    private function formatPostText(Article $article): ?string
    {
        // 1. Get Spanish Translations
        $translations = is_string($article->translations) ? json_decode($article->translations, true) : $article->translations;
        
        $title = $translations['es']['title'] ?? null;
        $summary = $translations['es']['summary'] ?? null;
        
        if (!$title || !$summary) {
            Log::warning("Twitter post skipped. Spanish translation unavailable for article: {$article->slug}");
            return null;
        }
        
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
        $link = rtrim(config('app.url', 'https://techynews.lat'), '/') . '/article/' . $article->slug;
        
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
