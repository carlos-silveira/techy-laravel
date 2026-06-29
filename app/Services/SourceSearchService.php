<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class SourceSearchService
{
    private JinaReaderService $jinaReader;

    public function __construct(JinaReaderService $jinaReader)
    {
        $this->jinaReader = $jinaReader;
    }

    /**
     * Search for evidence corroborating or contradicting a claim.
     */
    public function searchForClaim(string $claim): array
    {
        $hash = md5($claim);
        $cacheKey = "factcheck_search_{$hash}";
        
        return Cache::remember($cacheKey, now()->addHours(24), function () use ($claim) {
            // First try Google CSE if configured
            $googleApiKey = config('services.google_cse.api_key');
            $googleCseId = config('services.google_cse.search_engine_id');
            
            $results = [];

            if ($googleApiKey && $googleCseId) {
                $results = $this->searchGoogleCSE($claim, $googleApiKey, $googleCseId);
            } else {
                $results = $this->searchJina($claim);
            }

            // Fetch the actual content from the top 3 results using JinaReader
            $sourcesWithContent = [];
            $count = 0;
            
            foreach ($results as $result) {
                if ($count >= 3) break;
                
                // Fetch the article text
                $contentResult = $this->jinaReader->fetchArticleContext($result['url']);
                
                if (!empty($contentResult['markdown'])) {
                    $sourcesWithContent[] = [
                        'url' => $result['url'],
                        'domain' => $result['domain'],
                        'title' => $result['title'],
                        'snippet' => $result['snippet'],
                        'tier' => TrustedSourceRegistry::getTier($result['domain']),
                        'weight' => TrustedSourceRegistry::getTierWeight($result['domain']),
                        'content_excerpt' => Str::limit(strip_tags($contentResult['markdown']), 3000), // AI needs context, but not infinite
                    ];
                    $count++;
                    sleep(2); // Rate limit Jina calls
                }
            }

            return $sourcesWithContent;
        });
    }

    private function searchGoogleCSE(string $query, string $apiKey, string $cseId): array
    {
        try {
            // Append sites to search to force trusted sources (optional, but good for quality)
            // Or rely on the CSE configuration itself (better if the CSE is already restricted to these domains)
            $response = Http::timeout(10)->get('https://www.googleapis.com/customsearch/v1', [
                'key' => $apiKey,
                'cx' => $cseId,
                'q' => $query,
                'num' => 5, // Get top 5, we'll fetch content for top 3 valid ones
            ]);

            if (!$response->successful()) {
                Log::warning("Google CSE failed: " . $response->body());
                return $this->searchJina($query); // Fallback
            }

            $items = $response->json('items') ?? [];
            $results = [];

            foreach ($items as $item) {
                $url = $item['link'] ?? '';
                $host = parse_url($url, PHP_URL_HOST);
                
                if ($url && $host && TrustedSourceRegistry::isTrusted($url)) {
                    $results[] = [
                        'url' => $url,
                        'domain' => $host,
                        'title' => $item['title'] ?? '',
                        'snippet' => $item['snippet'] ?? '',
                    ];
                }
            }

            return $results;
        } catch (\Exception $e) {
            Log::error("Google CSE Exception: " . $e->getMessage());
            return $this->searchJina($query); // Fallback
        }
    }

    private function searchJina(string $query): array
    {
        try {
            // Jina Search API uses s.jina.ai
            $encodedQuery = urlencode($query);
            $response = Http::withHeaders([
                'X-Return-Format' => 'json'
            ])->timeout(15)->get("https://s.jina.ai/{$encodedQuery}");

            if (!$response->successful()) {
                Log::warning("Jina Search failed: " . $response->body());
                return [];
            }

            // Jina Search returns a markdown string with links, we need to parse it if we use s.jina.ai directly without JSON format
            // With X-Return-Format: json, it returns structured data
            $data = $response->json('data') ?? [];
            $results = [];

            foreach ($data as $item) {
                $url = $item['url'] ?? '';
                $host = parse_url($url, PHP_URL_HOST);
                
                if ($url && $host && TrustedSourceRegistry::isTrusted($url)) {
                    $results[] = [
                        'url' => $url,
                        'domain' => $host,
                        'title' => $item['title'] ?? '',
                        'snippet' => $item['description'] ?? '',
                    ];
                }
            }

            return $results;
        } catch (\Exception $e) {
            Log::error("Jina Search Exception: " . $e->getMessage());
            return [];
        }
    }
}
