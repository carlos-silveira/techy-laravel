<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class JinaReaderService
{
    /**
     * Fetch the rich markdown content and extract images from the source URL.
     *
     * @param string $url The source URL to scrape.
     * @return array Returns an array with 'markdown' (string) and 'images' (array of urls).
     */
    public function fetchArticleContext(string $url): array
    {
        try {
            // Jina Reader API URL
            $jinaUrl = "https://r.jina.ai/" . $url;
            
            $jinaApiKey = config('services.jina.api_key');
            $headers = [
                'X-Return-Format' => 'markdown',
                // Ask Jina to remove heavily repeated boilerplate to save tokens
                'X-No-Boilerplate' => 'true'
            ];
            if (!empty($jinaApiKey)) {
                $headers['Authorization'] = 'Bearer ' . $jinaApiKey;
            }

            $response = Http::timeout(60)
                ->withHeaders($headers)
                ->get($jinaUrl);

            if (!$response->successful()) {
                Log::warning("JinaReaderService failed to fetch {$url}. Status: " . $response->status());
                return ['markdown' => '', 'images' => []];
            }

            $markdown = $response->body();
            
            // Truncate to 10,000 characters to avoid hitting token limits on free tier AI models
            if (strlen($markdown) > 10000) {
                $markdown = substr($markdown, 0, 10000) . "\n\n...[Content Truncated]...";
            }

            // Extract images using a regex for standard markdown images: ![alt](url)
            $images = [];
            if (preg_match_all('/!\[.*?\]\((.*?)\)/', $markdown, $matches)) {
                // $matches[1] contains the URLs
                foreach ($matches[1] as $imgUrl) {
                    $imgUrl = trim($imgUrl);
                    // Handle relative URLs if they happen to appear
                    if (str_starts_with($imgUrl, '/')) {
                        $parsedUrl = parse_url($url);
                        $base = ($parsedUrl['scheme'] ?? 'https') . '://' . ($parsedUrl['host'] ?? '');
                        $imgUrl = $base . $imgUrl;
                    }
                    if (filter_var($imgUrl, FILTER_VALIDATE_URL)) {
                        $images[] = $imgUrl;
                    }
                }
            }

            // Remove duplicates
            $images = array_values(array_unique($images));

            return [
                'markdown' => $markdown,
                'images' => $images,
            ];

        } catch (\Exception $e) {
            Log::error("JinaReaderService exception for {$url}: " . $e->getMessage());
            return ['markdown' => '', 'images' => []];
        }
    }
}
