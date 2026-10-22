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
            $googleApiKey = config('services.google_cse.api_key');
            $googleCseId = config('services.google_cse.search_engine_id');
            
            $results = [];

            if ($googleApiKey && $googleCseId) {
                $results = $this->searchGoogleCSE($claim, $googleApiKey, $googleCseId);
            }
            
            if (empty($results)) {
                $results = $this->searchJina($claim);
            }

            if (empty($results)) {
                $results = $this->searchDuckDuckGo($claim);
            }

            if (empty($results)) {
                $results = $this->searchWikipedia($claim);
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
                        'content_excerpt' => Str::limit(strip_tags($contentResult['markdown']), 4000),
                    ];
                    $count++;
                    sleep(1);
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
            $jinaApiKey = config('services.jina.api_key');
            $headers = [
                'X-Return-Format' => 'json'
            ];
            if (!empty($jinaApiKey)) {
                $headers['Authorization'] = 'Bearer ' . $jinaApiKey;
            }

            $response = Http::withHeaders($headers)->timeout(15)->get("https://s.jina.ai/{$encodedQuery}");

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

    /**
     * Fallback search using DuckDuckGo HTML parser.
     */
    private function searchDuckDuckGo(string $query): array
    {
        try {
            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept' => 'text/html,application/xhtml+xml',
            ])->timeout(12)->get('https://html.duckduckgo.com/html/', [
                'q' => $query,
            ]);

            if (!$response->successful()) {
                Log::warning("DuckDuckGo Search failed status: " . $response->status());
                return [];
            }

            $html = $response->body();
            $results = [];

            if (preg_match_all('/<a[^>]+class=[\x22\x27][^\x22\x27]*result__a[^\x22\x27]*[\x22\x27][^>]+href=[\x22\x27]([^\x22\x27]+)[\x22\x27][^>]*>(.*?)<\/a>/si', $html, $matches, PREG_SET_ORDER)) {
                foreach ($matches as $match) {
                    $rawHref = $match[1] ?? '';
                    $rawTitle = strip_tags($match[2] ?? '');

                    $cleanUrl = '';
                    if (preg_match('/uddg=([^&]+)/', $rawHref, $urlMatch)) {
                        $cleanUrl = urldecode($urlMatch[1]);
                    } elseif (filter_var($rawHref, FILTER_VALIDATE_URL)) {
                        $cleanUrl = $rawHref;
                    }

                    if (!empty($cleanUrl)) {
                        $host = parse_url($cleanUrl, PHP_URL_HOST);
                        if ($host && TrustedSourceRegistry::isTrusted($cleanUrl)) {
                            $results[] = [
                                'url' => $cleanUrl,
                                'domain' => $host,
                                'title' => trim($rawTitle),
                                'snippet' => '',
                            ];
                        }
                    }

                    if (count($results) >= 5) {
                        break;
                    }
                }
            }

            return $results;
        } catch (\Exception $e) {
            Log::warning("DuckDuckGo Search Exception: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Fallback lookup against Wikipedia API.
     */
    private function searchWikipedia(string $query): array
    {
        try {
            // Clean up the query for Wikipedia search (e.g. remove verbs)
            $cleanTerm = trim(preg_replace('/[^a-zA-Z0-9\s\-]/', '', $query));
            $words = explode(' ', $cleanTerm);
            $shortQuery = implode(' ', array_slice($words, 0, 4));

            $response = Http::withHeaders([
                'User-Agent' => 'TechyNews/2.0 (editorial@techynews.lat)',
            ])->timeout(8)->get('https://en.wikipedia.org/w/api.php', [
                'action' => 'query',
                'list' => 'search',
                'srsearch' => $shortQuery,
                'format' => 'json',
                'srlimit' => 3,
            ]);

            if (!$response->successful()) {
                return [];
            }

            $searchItems = $response->json('query.search') ?? [];
            $results = [];

            foreach ($searchItems as $item) {
                $title = $item['title'] ?? '';
                if (!empty($title)) {
                    $encodedTitle = urlencode(str_replace(' ', '_', $title));
                    $results[] = [
                        'url' => "https://en.wikipedia.org/wiki/{$encodedTitle}",
                        'domain' => 'wikipedia.org',
                        'title' => $title,
                        'snippet' => strip_tags($item['snippet'] ?? ''),
                    ];
                }
            }

            return $results;
        } catch (\Exception $e) {
            Log::warning("Wikipedia search failed: " . $e->getMessage());
            return [];
        }
    }
}
