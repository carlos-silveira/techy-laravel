<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NewsService
{
    /**
     * Fetch latest tech news from an RSS feed.
     */
    public function fetchTodayTechNews(): array
    {
        try {
            // TechCrunch RSS feed is reliable and doesn't require an API key
            $response = Http::get('https://techcrunch.com/feed/');
            
            if (!$response->successful()) {
                Log::error('NewsService: Failed to fetch RSS feed');
                return [];
            }

            $xml = simplexml_load_string($response->body());
            $news = [];

            if ($xml && isset($xml->channel->item)) {
                foreach ($xml->channel->item as $item) {
                    $news[] = [
                        'title' => (string)$item->title,
                        'description' => strip_tags((string)$item->description),
                        'link' => (string)$item->link,
                        'pubDate' => (string)$item->pubDate,
                    ];
                    
                    // Limit to top 10 items
                    if (count($news) >= 10) break;
                }
            }

            return $news;
        } catch (\Exception $e) {
            Log::error('NewsService Error: ' . $e->getMessage());
            return [];
        }
    }
}
