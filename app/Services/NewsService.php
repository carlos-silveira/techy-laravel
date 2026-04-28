<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NewsService
{
    /**
     * RSS sources for trending developer and tech news (Global + LatAm).
     */
    private array $feeds = [
        'TechCrunch'   => 'https://techcrunch.com/feed/',
        'Wired'        => 'https://www.wired.com/feed/rss',
        'Xataka'       => 'https://www.xataka.com/feed.xml',
        'TechTudo'     => 'https://www.techtudo.com.br/feed',
        'Contxto'      => 'https://contxto.com/feed/',
    ];

    /**
     * Fetch latest tech news from multiple RSS sources + Hacker News.
     */
    public function fetchTodayTechNews(): array
    {
        $news = [];

        // Fetch from RSS feeds
        foreach ($this->feeds as $source => $url) {
            try {
                $items = $this->parseRssFeed($url, $source);
                $news = array_merge($news, $items);
            } catch (\Exception $e) {
                Log::warning("NewsService: Failed to fetch {$source}: " . $e->getMessage());
            }
        }

        // Fetch Hacker News top stories (no API key needed)
        try {
            $hnItems = $this->fetchHackerNews();
            $news = array_merge($news, $hnItems);
        } catch (\Exception $e) {
            Log::warning('NewsService: Failed to fetch HN: ' . $e->getMessage());
        }

        // Deduplicate by rough title similarity and sort by freshness
        $news = $this->deduplicateNews($news);

        // Limit to top 15 items
        return array_slice($news, 0, 15);
    }

    private function parseRssFeed(string $url, string $source): array
    {
        $response = Http::timeout(10)->get($url);

        if (!$response->successful()) {
            return [];
        }

        $xml = @simplexml_load_string($response->body());
        if (!$xml) return [];

        $items = [];

        // Standard RSS format (<channel><item>)
        if (isset($xml->channel->item)) {
            foreach ($xml->channel->item as $item) {
                $items[] = [
                    'title' => (string) $item->title,
                    'description' => strip_tags((string) ($item->description ?? '')),
                    'link' => (string) $item->link,
                    'source' => $source,
                    'pubDate' => (string) ($item->pubDate ?? ''),
                ];
                if (count($items) >= 5) break;
            }
        }

        // Atom format (<entry>)
        if (empty($items) && isset($xml->entry)) {
            foreach ($xml->entry as $entry) {
                $link = '';
                if (isset($entry->link)) {
                    $link = (string) ($entry->link['href'] ?? $entry->link);
                }
                $items[] = [
                    'title' => (string) $entry->title,
                    'description' => strip_tags((string) ($entry->summary ?? $entry->content ?? '')),
                    'link' => $link,
                    'source' => $source,
                    'pubDate' => (string) ($entry->published ?? $entry->updated ?? ''),
                ];
                if (count($items) >= 5) break;
            }
        }

        return $items;
    }

    private function fetchHackerNews(): array
    {
        $response = Http::timeout(10)->get('https://hacker-news.firebaseio.com/v0/topstories.json');
        if (!$response->successful()) return [];

        $ids = array_slice($response->json() ?? [], 0, 5);
        $items = [];

        foreach ($ids as $id) {
            try {
                $story = Http::timeout(5)->get("https://hacker-news.firebaseio.com/v0/item/{$id}.json")->json();
                if (!$story || ($story['type'] ?? '') !== 'story') continue;

                $items[] = [
                    'title' => $story['title'] ?? '',
                    'description' => $story['title'] ?? '', // HN stories don't have descriptions
                    'link' => $story['url'] ?? "https://news.ycombinator.com/item?id={$id}",
                    'source' => 'Hacker News',
                    'pubDate' => date('Y-m-d H:i:s', $story['time'] ?? time()),
                ];
            } catch (\Exception $e) {
                continue;
            }
        }

        return $items;
    }

    /**
     * Remove near-duplicate entries by normalizing titles.
     */
    private function deduplicateNews(array $news): array
    {
        $seen = [];
        $unique = [];

        foreach ($news as $item) {
            $normalized = strtolower(preg_replace('/[^a-z0-9]/', '', $item['title']));
            $key = substr($normalized, 0, 40);

            if (!isset($seen[$key])) {
                $seen[$key] = true;
                $unique[] = $item;
            }
        }

        return $unique;
    }
}
