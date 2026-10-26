<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ImageService
{
    /**
     * Curated high-resolution landscape editorial cover photos (Unsplash direct IDs).
     * Categorized by topic to prevent generic fallback repetition and brand mismatches.
     */
    public const CURATED_COVERS = [
        'ai' => [
            'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=85', // Neural node array
            'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1600&q=85', // AI core visualization
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85', // Fluid algorithmic intelligence
        ],
        'security' => [
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=85', // Cyber terminal grid
            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=85', // Matrix encrypted terminal
            'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=85', // Shield network security
        ],
        'hardware' => [
            'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85', // Silicon motherboard traces
            'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1600&q=85', // GPU wafer silicon
            'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1600&q=85', // Microchip architecture
        ],
        'fusion' => [
            'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1600&q=85', // Plasma energy reactor glow
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85', // High energy physics orbital
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85', // Advanced industrial laboratory
        ],
        'streaming' => [
            'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1600&q=85', // Cinematic widescreen theater
            'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1600&q=85', // Modern streaming television display
            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=85', // Cinema hall projection
        ],
        'mobile' => [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=85', // Sleek flagship smartphone
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1600&q=85', // Modern smartphone device
            'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1600&q=85', // Mobile interface screen
        ],
        'cloud' => [
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85', // Enterprise server datacenter
            'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=85', // High-density server rack
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85', // Enterprise tech visualization
        ],
        'space' => [
            'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1600&q=85', // Mars red planet atmosphere
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85', // High orbit planetary science
            'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=85', // Deep space observatory
        ],
        'politics' => [
            'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1600&q=85', // Capitol dome governmental
            'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1600&q=85', // Tech policy & campaign finance
            'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&w=1600&q=85', // Corporate governance & elections
        ],
        'science' => [
            'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=85', // Laboratory microbiology research
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85', // Virology genetics pathogen research
            'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1600&q=85', // Scientific investigation discovery
        ],
        'gadgets' => [
            'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=85', // Smart home speaker & assistant
            'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=85', // Wireless IoT connected device
            'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=1600&q=85', // Connected hardware consumer tech
        ],
        'general' => [
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85', // Global network
            'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&q=85', // Clean workspace
            'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85', // Silicon microchip
        ],
    ];

    /**
     * Common conflicting competitor brand pairs. If an article title mentions the target,
     * photos matching the forbidden list must be strictly discarded.
     */
    private const BRAND_CONFLICT_MAP = [
        'disney' => ['hbo', 'hbomax', 'max', 'netflix', 'paramount', 'peacock', 'prime video', 'warner'],
        'apple' => ['android', 'samsung', 'pixel', 'windows', 'microsoft surface', 'huawei'],
        'iphone' => ['android', 'samsung', 'galaxy', 'pixel', 'oneplus'],
        'android' => ['iphone', 'apple logo', 'ipad', 'ios'],
        'nintendo' => ['playstation', 'xbox', 'sony'],
        'playstation' => ['xbox', 'nintendo', 'switch'],
        'sony' => ['xbox', 'nintendo'],
        'xbox' => ['playstation', 'nintendo', 'sony'],
        'intel' => ['amd', 'ryzen', 'radeon'],
        'amd' => ['intel', 'core i9', 'xeon'],
        'openai' => ['anthropic', 'claude', 'gemini logo'],
        'chatgpt' => ['anthropic', 'claude', 'gemini logo'],
        'anthropic' => ['chatgpt', 'openai logo'],
        'claude' => ['chatgpt', 'openai logo'],
        'meta' => ['tiktok', 'bytedance'],
    ];

    /**
     * Detect if a URL or alt text represents an unwanted publisher logo, badge, avatar, ad, or tracker.
     */
    public function isForbiddenLogoOrBadge(string $url, string $alt = ''): bool
    {
        if (empty(trim($url))) {
            return true;
        }

        // First test with upgraded URL to allow upgradable thumbnails (e.g. -150x150 -> original)
        $upgraded = $this->upgradeImageUrl($url);
        $lowerUrl = strtolower($upgraded);
        $lowerAlt = strtolower($alt);
        $pathOnly = parse_url($lowerUrl, PHP_URL_PATH) ?? '';
        $host = parse_url($lowerUrl, PHP_URL_HOST) ?? '';

        // 1. Must be a valid HTTP(S) URL
        if (!str_starts_with($lowerUrl, 'http://') && !str_starts_with($lowerUrl, 'https://')) {
            return true;
        }

        // 2. Specific known promotional/event banners and ad asset hashes
        $knownAdHashes = [
            '6ada3b21d1bc30ab6431b9be', // Wired World Fair / Sapphire Reserve ad banner
            '6aaa98648e983d8bad151ad7', // Wired App Rollover acquisition gif
            '6aaa989bb9f3b2223fc0f627', // Wired App Desktop acquisition gif
            '723b22a81ff6a760c4520b963b43451e', // TechCrunch author artifact
        ];
        foreach ($knownAdHashes as $hash) {
            if (str_contains($lowerUrl, $hash)) {
                return true;
            }
        }

        // 3. SVG and GIF extensions/formats are never suitable for article cover/editorial photos
        $ext = pathinfo($pathOnly, PATHINFO_EXTENSION);
        if (in_array($ext, ['svg', 'gif', 'ico'])) {
            return true;
        }
        if (preg_match('/[?&]format=(?:svg|gif|ico)\b/i', $lowerUrl) || str_contains($lowerUrl, '.svg?') || str_contains($lowerUrl, '.gif?')) {
            return true;
        }

        // 4. Tracking pixel, ad networks, and badge CDNs
        if (str_contains($host, 'googleusercontent.com')) {
            if (preg_match('/=(h|w|s)\d+/i', $lowerUrl) || str_contains($lowerUrl, '=h60') || str_contains($lowerUrl, '=s60') || str_contains($lowerUrl, '=w100')) {
                return true;
            }
        }
        if (str_contains($host, 'githubassets.com')) {
            return true; // GitHub emoji badges and UI assets
        }
        $trackingDomains = [
            'bat.bing.com', 'trx-hub.com', 'analytics.twitter.com',
            'sp.analytics.yahoo.com', 't.co', 'doubleclick.net', 'adnxs.com'
        ];
        foreach ($trackingDomains as $domain) {
            if (str_contains($host, $domain)) {
                return true;
            }
        }

        // 5. Generic ad/download filenames and broken endings
        if (str_ends_with($lowerUrl, '/undefined') || str_ends_with($lowerUrl, 'undefined')) {
            return true;
        }
        if (str_contains($lowerUrl, 'pass/download') ||
            str_contains($lowerUrl, 'download%2520') ||
            str_contains($lowerUrl, 'download%20') ||
            str_contains($lowerUrl, '/download.') ||
            preg_match('/download\s*\(\d+\)/i', $lowerUrl)) {
            return true;
        }

        // 6. Known publisher logos, promotional events, sponsor assets, and author avatars
        $forbiddenKeywords = [
            'tc-logo', 'techcrunch-logo', 'techcrunch', 'wired-logo', 'theverge-logo',
            'verge-logo', 'reuters-logo', 'bloomberg-logo', 'author', 'avatar',
            'headshot', 'profile', 'contributor', 'badge', 'tracker', 'pixel',
            'button', 'favicon', 'disrupt', 'gettyimages', 'reporter', 'writer',
            'world-fair', 'world fair', 'worldfair', 'sapphire', 'sapphire reserve',
            'sponsor', 'sponsored', 'partner', 'partnership',
            'promo', 'promotion', 'promotional',
            'acquisition', 'rollover',
            'newsletter', 'signup', 'subscribe', 'subscription',
            'conference', 'summit', 'festival',
            'tc-disrupt', 'techcrunch-event', 'techcrunch-summit',
            'wired-festival', 'wired-event', 'wired_app', 'wired-world',
            'emoji', 'banner', 'header-ad', 'footer-ad',
        ];

        foreach ($forbiddenKeywords as $word) {
            if (str_contains($lowerUrl, $word) || str_contains($lowerAlt, $word)) {
                return true;
            }
        }

        // 7. Low-resolution dimension parameters that indicate tiny icons/avatars (<= 200px)
        if (preg_match('/[?&](?:w|width|h|height|resize)=(?:[1-9]|[1-9]\d|1\d\d|200)\b/i', $lowerUrl)) {
            return true;
        }
        if (preg_match('/[_-](?:16|24|32|48|60|64|80|96|100|120|150|200)x\d+/i', $lowerUrl) ||
            preg_match('/w_(?:16|24|32|48|60|64|80|96|100|120|150|200)\b/i', $lowerUrl) ||
            preg_match('/h_(?:16|24|32|48|60|64|80|96|100|120|150|200)\b/i', $lowerUrl)) {
            return true;
        }

        return false;
    }

    /**
     * Upgrade CDN thumbnail URLs to full high-resolution versions.
     */
    public function upgradeImageUrl(string $url): string
    {
        // 1. Substack CDN fetch URL -> Extract underlying original S3 URL
        if (str_contains($url, 'substackcdn.com/image/fetch/')) {
            if (preg_match('/https%3A%2F%2F[^\s"\'<>]+/i', $url, $m)) {
                $decoded = urldecode($m[0]);
                if (filter_var($decoded, FILTER_VALIDATE_URL)) {
                    return $decoded;
                }
            }
            // Replace thumbnail dimension transform with high-res limit
            return preg_replace('/w_\d+,h_\d+,c_fill[^\/]*/i', 'w_1456,c_limit,f_auto,q_auto:good', $url);
        }

        // 2. Wired / Condé Nast CDN: w_120 -> w_1600
        if (str_contains($url, 'media.wired.com/photos/')) {
            $url = preg_replace('/w_\d+(?:%2Ch_\d+)?(?:%2Cc_limit|,c_limit)?/i', 'w_1600,c_limit', $url);
            return preg_replace('/1:1/i', '16:9', $url);
        }

        // 3. TechCrunch WordPress uploads: upgrade thumbnail parameters to high resolution (1200px)
        if (str_contains($url, 'techcrunch.com/wp-content/uploads/')) {
            if (preg_match('/[?&](?:w=\d+|resize=\d+,\d+)/i', $url)) {
                return preg_replace('/[?&](?:w=\d+|resize=\d+,\d+)[^&]*/i', '?w=1200', $url);
            }
        }

        // 4. WordPress thumbnail sizes: photo-150x150.jpg or photo-300x200.png -> photo.jpg
        if (preg_match('/^(.+)-\d{2,4}x\d{2,4}(\.(?:jpe?g|png|webp))$/i', $url, $matches)) {
            return $matches[1] . $matches[2];
        }

        // 5. Wikimedia Commons thumbnail: .../thumb/.../320px-File.jpg -> .../thumb/.../1200px-File.jpg
        if (str_contains($url, 'wikimedia.org/wikipedia/commons/thumb/')) {
            return preg_replace('#/\d{2,4}px-([^/]+)$#i', '/1200px-$1', $url);
        }

        return $url;
    }

    /**
     * Purge publisher logos, upgrade thumbnails, and format clean semantic <figure> tags in article HTML.
     */
    public function cleanContentImages(string $html): string
    {
        if (empty(trim($html))) {
            return '';
        }

        // 1. Process <div ...> containers containing an <img> (and optional caption) -> convert to <figure> or strip
        $html = preg_replace_callback('/<div[^>]*>\s*(<img[^>]+>)\s*(?:<p[^>]*>(.*?)<\/p>)?\s*<\/div>/si', function ($matches) {
            $rawImg = $matches[1];
            $caption = trim($matches[2] ?? '');

            if (preg_match('/src=["\']([^"\']+)["\']/i', $rawImg, $srcMatch)) {
                $src = $srcMatch[1];
                preg_match('/alt=["\']([^"\']*)["\']/i', $rawImg, $altMatch);
                $alt = $altMatch[1] ?? '';

                if ($this->isForbiddenLogoOrBadge($src, $alt)) {
                    return ''; // Strip forbidden container
                }

                $upgradedSrc = $this->upgradeImageUrl($src);
                $cleanCaption = strip_tags($caption ?: ($alt && $alt !== 'Article illustration' ? $alt : ''));
                $captionHtml = $cleanCaption ? '<figcaption class="text-sm text-gray-500 mt-3 text-center italic">' . htmlspecialchars($cleanCaption, ENT_QUOTES) . '</figcaption>' : '';

                return '<figure class="my-8 mx-auto max-w-3xl"><img src="' . htmlspecialchars($upgradedSrc, ENT_QUOTES) . '" alt="' . htmlspecialchars($alt, ENT_QUOTES) . '" class="w-full h-auto rounded-2xl shadow-lg border border-black/10 dark:border-white/10 object-contain max-h-[550px] mx-auto block" loading="lazy" />' . $captionHtml . '</figure>';
            }

            return $matches[0];
        }, $html);

        // 2. Remove any remaining publisher logo containers: <div class="..."><img src="...googleusercontent...=h60...">...</div>
        $html = preg_replace_callback('/<(?:div|figure)[^>]*>(.*?)<\/(?:div|figure)>/si', function ($matches) {
            $inner = $matches[1];
            if (preg_match('/<img[^>]+src=["\']([^"\']+)["\']/i', $inner, $imgMatch)) {
                $src = $imgMatch[1];
                if ($this->isForbiddenLogoOrBadge($src)) {
                    return ''; // Strip entire container
                }
            }
            return $matches[0];
        }, $html);

        // 3. Convert <p><img ...></p> into semantic <figure> with upgraded URL (or strip if forbidden)
        $html = preg_replace_callback('/<p[^>]*>\s*(<img[^>]+>)\s*<\/p>/si', function ($matches) {
            $rawImgTag = $matches[1];
            if (preg_match('/src=["\']([^"\']+)["\']/i', $rawImgTag, $srcMatch)) {
                $src = $srcMatch[1];
                preg_match('/alt=["\']([^"\']*)["\']/i', $rawImgTag, $altMatch);
                $alt = trim($altMatch[1] ?? '');

                if ($this->isForbiddenLogoOrBadge($src, $alt)) {
                    return '';
                }

                $upgradedSrc = $this->upgradeImageUrl($src);
                $caption = $alt && $alt !== 'Article illustration' ? htmlspecialchars($alt, ENT_QUOTES) : '';
                $captionHtml = $caption ? '<figcaption class="text-sm text-gray-500 mt-3 text-center italic">' . $caption . '</figcaption>' : '';

                return '<figure class="my-8 mx-auto max-w-3xl"><img src="' . htmlspecialchars($upgradedSrc, ENT_QUOTES) . '" alt="' . htmlspecialchars($alt, ENT_QUOTES) . '" class="w-full h-auto rounded-2xl shadow-lg border border-black/10 dark:border-white/10 object-contain max-h-[550px] mx-auto block" loading="lazy" />' . $captionHtml . '</figure>';
            }
            return $matches[0];
        }, $html);

        // 4. Upgrade URLs of existing <figure> images and format semantic classes
        $html = preg_replace_callback('/<figure[^>]*>\s*<img([^>]+src=["\']([^"\']+)["\'][^>]*)>\s*(?:<figcaption[^>]*>(.*?)<\/figcaption>)?\s*<\/figure>/si', function ($matches) {
            $rawImgTag = $matches[1];
            $src = $matches[2];
            $caption = trim($matches[3] ?? '');

            if ($this->isForbiddenLogoOrBadge($src)) {
                return '';
            }

            $upgradedSrc = $this->upgradeImageUrl($src);
            $cleanImgTag = preg_replace('/src=["\'][^"\']+["\']/i', 'src="' . htmlspecialchars($upgradedSrc, ENT_QUOTES) . '"', $rawImgTag);

            // Ensure responsive, non-stretching classes
            if (!str_contains($cleanImgTag, 'class=')) {
                $cleanImgTag .= ' class="w-full h-auto rounded-2xl shadow-lg border border-black/10 dark:border-white/10 object-contain max-h-[550px] mx-auto block"';
            } else {
                $cleanImgTag = preg_replace('/class=["\'][^"\']*["\']/i', 'class="w-full h-auto rounded-2xl shadow-lg border border-black/10 dark:border-white/10 object-contain max-h-[550px] mx-auto block"', $cleanImgTag);
            }

            $captionHtml = $caption ? '<figcaption class="text-sm text-gray-500 mt-3 text-center italic">' . $caption . '</figcaption>' : '';

            return '<figure class="my-8 mx-auto max-w-3xl"><img' . $cleanImgTag . '>' . $captionHtml . '</figure>';
        }, $html);

        // 5. Sweep ANY remaining naked <img ...>
        $html = preg_replace_callback('/<img([^>]+src=["\']([^"\']+)["\'][^>]*)>/i', function ($matches) {
            $rawImgTag = $matches[0];
            $src = $matches[2];

            if ($this->isForbiddenLogoOrBadge($src)) {
                return '';
            }

            $upgradedSrc = $this->upgradeImageUrl($src);
            if ($src !== $upgradedSrc) {
                return preg_replace('/src=["\'][^"\']+["\']/i', 'src="' . htmlspecialchars($upgradedSrc, ENT_QUOTES) . '"', $rawImgTag);
            }
            return $rawImgTag;
        }, $html);

        // 6. Clean empty containers
        $html = preg_replace('/<div[^>]*>\s*<\/div>/i', '', $html);
        $html = preg_replace('/<figure[^>]*>\s*<\/figure>/i', '', $html);
        $html = preg_replace('/<p class="text-sm text-gray-500 italic mt-1">\s*<\/p>/i', '', $html);

        return trim($html);
    }

    /**
     * Resolve a brand-safe, high-resolution cover image for an article.
     *
     * @param string $title Article title
     * @param string|null $suggestedQuery Optional search term from Gemini
     * @param array<int, array{url: string, alt?: string}> $dossierImages Extracted source images
     */
    public function resolveCoverImage(string $title, ?string $suggestedQuery = null, array $dossierImages = []): string
    {
        // 1. First priority: Check if dossier has a verified genuine source image
        foreach ($dossierImages as $img) {
            $url = $img['url'] ?? '';
            $alt = $img['alt'] ?? '';

            if (empty($url) || $this->isForbiddenLogoOrBadge($url, $alt)) {
                continue;
            }

            $upgraded = $this->upgradeImageUrl($url);
            Log::info("ImageService: Using verified source cover image: {$upgraded}");
            return $upgraded;
        }

        // 2. Identify brand constraints & negative keywords
        $lowerTitle = strtolower($title);
        $negativeKeywords = [];
        $detectedBrand = null;

        foreach (self::BRAND_CONFLICT_MAP as $brand => $forbidden) {
            if (str_contains($lowerTitle, $brand)) {
                $detectedBrand = $brand;
                $negativeKeywords = array_merge($negativeKeywords, $forbidden);
            }
        }

        // 3. Search Unsplash with brand safety
        $accessKey = config('services.unsplash.access_key');
        if (!empty($accessKey)) {
            $searchQuery = $this->buildSearchQuery($title, $suggestedQuery, $detectedBrand);

            try {
                $response = Http::withHeaders([
                    'Authorization' => "Client-ID {$accessKey}",
                ])->timeout(8)->get('https://api.unsplash.com/search/photos', [
                    'query' => $searchQuery,
                    'orientation' => 'landscape',
                    'per_page' => 5,
                ]);

                if ($response->successful()) {
                    $results = $response->json()['results'] ?? [];
                    foreach ($results as $photo) {
                        $desc = strtolower(($photo['description'] ?? '') . ' ' . ($photo['alt_description'] ?? ''));
                        $tags = implode(' ', array_column($photo['tags'] ?? [], 'title'));
                        $combinedText = strtolower($desc . ' ' . $tags);

                        // Check negative brand conflicts
                        $hasConflict = false;
                        foreach ($negativeKeywords as $neg) {
                            if (str_contains($combinedText, $neg)) {
                                Log::warning("ImageService: Skipping Unsplash photo {$photo['id']} due to brand conflict with '{$neg}' for article: {$title}");
                                $hasConflict = true;
                                break;
                            }
                        }

                        if (!$hasConflict && !empty($photo['urls']['regular'])) {
                            $imageUrl = $photo['urls']['regular'];
                            Log::info("ImageService: Selected brand-safe Unsplash photo for '{$title}' with query '{$searchQuery}'");
                            return $imageUrl;
                        }
                    }
                }
            } catch (\Exception $e) {
                Log::warning('ImageService: Unsplash search failed: ' . $e->getMessage());
            }
        }

        // 4. Fallback: Topic-matched curated high-resolution editorial photo
        return $this->getCuratedFallback($title);
    }

    /**
     * Pick a curated high-resolution fallback image matched to the article's core domain.
     */
    public function getCuratedFallback(string $title): string
    {
        $lower = strtolower($title);

        $category = 'general';
        if (str_contains($lower, 'fusion') || str_contains($lower, 'reactor') || str_contains($lower, 'plasma') || str_contains($lower, 'quantum')) {
            $category = 'fusion';
        } elseif (str_contains($lower, 'space') || str_contains($lower, 'mars') || str_contains($lower, 'planet') || str_contains($lower, 'orbit') || str_contains($lower, 'nasa') || str_contains($lower, 'astronomy') || str_contains($lower, 'cloud on mars')) {
            $category = 'space';
        } elseif (str_contains($lower, 'musk') || str_contains($lower, 'election') || str_contains($lower, 'campaign') || str_contains($lower, 'republican') || str_contains($lower, 'democrat') || str_contains($lower, 'congress') || str_contains($lower, 'senate') || str_contains($lower, 'capitol') || str_contains($lower, 'politics') || str_contains($lower, 'pac') || str_contains($lower, 'billionaire tax') || str_contains($lower, 'voter')) {
            $category = 'politics';
        } elseif (str_contains($lower, 'virus') || str_contains($lower, 'infection') || str_contains($lower, 'pathogen') || str_contains($lower, 'shamonda') || str_contains($lower, 'disease') || str_contains($lower, 'vaccine') || str_contains($lower, 'cancer') || str_contains($lower, 'biology') || str_contains($lower, 'medical')) {
            $category = 'science';
        } elseif (str_contains($lower, 'speaker') || str_contains($lower, 'google home') || str_contains($lower, 'wi-fi') || str_contains($lower, 'smart home') || str_contains($lower, 'gadget') || str_contains($lower, 'wearable') || str_contains($lower, 'headphone') || str_contains($lower, 'earbud') || str_contains($lower, 'smart ring') || str_contains($lower, 'watch') || str_contains($lower, 'audio')) {
            $category = 'gadgets';
        } elseif (str_contains($lower, 'disney') || str_contains($lower, 'streaming') || str_contains($lower, 'hulu') || str_contains($lower, 'movie') || str_contains($lower, 'cinema') || str_contains($lower, 'subscrip')) {
            $category = 'streaming';
        } elseif (str_contains($lower, 'security') || str_contains($lower, 'exploit') || str_contains($lower, 'hacker') || str_contains($lower, 'vulnerab') || str_contains($lower, 'patch') || str_contains($lower, 'breach') || str_contains($lower, 'openssl') || str_contains($lower, 'crypto') || str_contains($lower, 'malware') || str_contains($lower, 'spy')) {
            $category = 'security';
        } elseif (str_contains($lower, 'iphone') || str_contains($lower, 'smartphone') || str_contains($lower, 'apple') || str_contains($lower, 'mobile') || str_contains($lower, 'android') || str_contains($lower, 'dating') || str_contains($lower, 'app ') || str_contains($lower, 'apps')) {
            $category = 'mobile';
        } elseif (str_contains($lower, 'semiconductor') || str_contains($lower, 'chip') || str_contains($lower, 'gpu') || str_contains($lower, 'hardware') || str_contains($lower, 'silicon') || str_contains($lower, 'cfs')) {
            $category = 'hardware';
        } elseif (str_contains($lower, 'ai') || str_contains($lower, 'model') || str_contains($lower, 'llm') || str_contains($lower, 'gpt') || str_contains($lower, 'gemini') || str_contains($lower, 'claude') || str_contains($lower, 'chatgpt') || str_contains($lower, 'anthropic') || str_contains($lower, 'deepseek')) {
            $category = 'ai';
        } elseif (str_contains($lower, 'cloud') || str_contains($lower, 'aws') || str_contains($lower, 'server') || str_contains($lower, 'datacenter') || str_contains($lower, 'meta') || str_contains($lower, 'stock') || str_contains($lower, 'zuckerberg')) {
            $category = 'cloud';
        }

        $list = self::CURATED_COVERS[$category] ?? self::CURATED_COVERS['general'];
        // Pick deterministically based on title hash to keep it stable across refreshes
        $idx = abs(crc32($title)) % count($list);
        return $list[$idx];
    }

    /**
     * Build an explicit, unambiguous search query for Unsplash.
     */
    private function buildSearchQuery(string $title, ?string $suggestedQuery, ?string $detectedBrand): string
    {
        $lowerTitle = strtolower($title);

        // Special brand cases
        if ($detectedBrand === 'disney') {
            return 'disney streaming screen television';
        }
        if ($detectedBrand === 'iphone' || $detectedBrand === 'apple') {
            return 'apple smartphone technology';
        }
        if (str_contains($lowerTitle, 'fusion') || str_contains($lowerTitle, 'commonwealth fusion')) {
            return 'nuclear fusion energy laboratory';
        }
        if (str_contains($lowerTitle, 'zuckerberg') || str_contains($lowerTitle, 'meta')) {
            return 'corporate technology headquarters';
        }

        if (!empty($suggestedQuery) && strlen($suggestedQuery) > 3) {
            return $suggestedQuery;
        }

        // Extract top 2 significant words
        $words = preg_split('/[\s:,\.\-\!\?]+/', $title) ?: [];
        $stops = ['the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'with', 'from', 'as', 'by', 'is', 'are', 'was', 'were', 'will'];
        $clean = array_filter($words, fn($w) => strlen($w) > 3 && !in_array(strtolower($w), $stops));

        $slice = array_slice(array_values($clean), 0, 2);
        return !empty($slice) ? implode(' ', $slice) : 'technology';
    }
}
