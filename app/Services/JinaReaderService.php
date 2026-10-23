<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class JinaReaderService
{
    private ImageService $imageService;

    public function __construct(?ImageService $imageService = null)
    {
        $this->imageService = $imageService ?? app(ImageService::class);
    }
    /**
     * Fetch the rich markdown content and extract images from the source URL.
     *
     * @param string $url The source URL to scrape.
     * @return array Returns an array with 'markdown' (string), 'images' (array of urls), and 'image_details' (array of ['url' => ..., 'alt' => ...]).
     */
    public function fetchArticleContext(string $url): array
    {
        try {
            $jinaUrl = "https://r.jina.ai/" . $url;
            
            $jinaApiKey = config('services.jina.api_key');
            $headers = [
                'X-Return-Format' => 'markdown',
                'X-No-Boilerplate' => 'true',
            ];
            if (!empty($jinaApiKey)) {
                $headers['Authorization'] = 'Bearer ' . $jinaApiKey;
            }

            $response = Http::timeout(60)
                ->withHeaders($headers)
                ->get($jinaUrl);

            if (!$response->successful()) {
                Log::warning("JinaReaderService failed to fetch {$url}. Status: " . $response->status());
                return ['markdown' => '', 'images' => [], 'image_details' => []];
            }

            $raw = $response->body();
            $markdown = $this->cleanMarkdown($raw);
            
            // Allow up to 25,000 characters of clean content for in-depth analysis
            if (strlen($markdown) > 25000) {
                $markdown = substr($markdown, 0, 25000) . "\n\n...[Content Truncated]...";
            }

            // Extract images with alts
            $imageDetails = [];
            $images = [];
            if (preg_match_all('/!\[(.*?)\]\((.*?)\)/', $raw, $matches, PREG_SET_ORDER)) {
                foreach ($matches as $match) {
                    $alt = trim($match[1] ?? '');
                    $imgUrl = trim($match[2] ?? '');

                    if (str_starts_with($imgUrl, '/')) {
                        $parsedUrl = parse_url($url);
                        $base = ($parsedUrl['scheme'] ?? 'https') . '://' . ($parsedUrl['host'] ?? '');
                        $imgUrl = $base . $imgUrl;
                    }

                    if (filter_var($imgUrl, FILTER_VALIDATE_URL)) {
                        $upgradedUrl = $this->imageService->upgradeImageUrl($imgUrl);
                        if ($this->isValidArticleImage($upgradedUrl, $alt)) {
                            $images[] = $upgradedUrl;
                            $imageDetails[] = [
                                'url' => $upgradedUrl,
                                'alt' => $alt ?: 'Article illustration',
                            ];
                        }
                    }
                }
            }

            // Deduplicate
            $images = array_values(array_unique($images));
            $uniqueDetails = [];
            $seen = [];
            foreach ($imageDetails as $detail) {
                if (!isset($seen[$detail['url']])) {
                    $seen[$detail['url']] = true;
                    $uniqueDetails[] = $detail;
                }
            }

            return [
                'markdown' => $markdown,
                'images' => $images,
                'image_details' => $uniqueDetails,
            ];

        } catch (\Exception $e) {
            Log::error("JinaReaderService exception for {$url}: " . $e->getMessage());
            return ['markdown' => '', 'images' => [], 'image_details' => []];
        }
    }

    /**
     * Clean markdown to strip cookie consent banners, navigation headers, and footer comments.
     */
    public function cleanMarkdown(string $text): string
    {
        // 1. Remove common cookie preference and GDPR blocks
        $text = preg_replace('/Manage your consent preferences.*?(?=Skip to main content|# |\n## )/si', '', $text);
        $text = preg_replace('/Select your cookie preferences.*?(?=\n# |\n## |\[Skip)/si', '', $text);
        $text = preg_replace('/This website uses cookies.*?Confirm My Choices/si', '', $text);

        // 2. Cut off trailing junk (Comments, Most popular, Sign up for newsletter, etc.)
        $cutOffPatterns = [
            '/\n## Comments\b.*/si',
            '/\n## Most Popular\b.*/si',
            '/\nMost Popular\n\*/si',
            '/\nJoin the discussion\b.*/si',
            '/\n## 4 comentarios\b.*/si',
            '/\n## Comentarios\b.*/si',
            '/\nAlready a subscriber\?.*See offers/si',
            '/\nTe puede interesar\b.*/si',
        ];
        foreach ($cutOffPatterns as $pattern) {
            $text = preg_replace($pattern, '', $text);
        }

        // 3. Remove lines with checkboxes for cookie categories (e.g. "- [x] On", "- [ ] Off")
        $text = preg_replace('/^-\s*\[[x ]\]\s*(On|Off|Allowed).*$/mi', '', $text);

        // 4. Remove lines that are just navigation links repeated
        $text = preg_replace('/^\[(Skip to main content|Sign In|Create account|Newsletters|Podcasts|Video|Store|Search|Facebook|Twitter|Flipboard|E-mail)\]\(.*?\)$/mi', '', $text);

        // 5. Strip forbidden markdown logos, badges, and avatars from content
        $text = preg_replace_callback('/!\[(.*?)\]\((.*?)\)/i', function ($matches) {
            $alt = $matches[1] ?? '';
            $url = $matches[2] ?? '';
            if ($this->imageService->isForbiddenLogoOrBadge($url, $alt)) {
                return ''; // Drop from markdown
            }
            return $matches[0];
        }, $text);

        // 6. Clean excessive newlines
        $text = preg_replace('/\n{3,}/', "\n\n", $text);

        return trim($text);
    }

    /**
     * Filter out logos, avatars, tracking pixels, and ads.
     */
    public function isValidArticleImage(string $url, string $alt): bool
    {
        return !$this->imageService->isForbiddenLogoOrBadge($url, $alt);
    }
}

