<?php

namespace App\Services;

class TrustedSourceRegistry
{
    private static array $sources = [
        // Tier 1 - Wire Services & Gold Standard (Weight: 1.0)
        'reuters.com' => ['name' => 'Reuters', 'tier' => 1, 'weight' => 1.0],
        'apnews.com' => ['name' => 'Associated Press', 'tier' => 1, 'weight' => 1.0],
        'bbc.com' => ['name' => 'BBC Technology', 'tier' => 1, 'weight' => 1.0],
        'npr.org' => ['name' => 'NPR Technology', 'tier' => 1, 'weight' => 1.0],
        'theguardian.com' => ['name' => 'The Guardian Tech', 'tier' => 1, 'weight' => 1.0],

        // Tier 2 - Major Tech Press (Weight: 0.9)
        'theverge.com' => ['name' => 'The Verge', 'tier' => 2, 'weight' => 0.9],
        'arstechnica.com' => ['name' => 'Ars Technica', 'tier' => 2, 'weight' => 0.9],
        'techcrunch.com' => ['name' => 'TechCrunch', 'tier' => 2, 'weight' => 0.9],
        'wired.com' => ['name' => 'Wired', 'tier' => 2, 'weight' => 0.9],
        'cnet.com' => ['name' => 'CNET', 'tier' => 2, 'weight' => 0.9],
        'engadget.com' => ['name' => 'Engadget', 'tier' => 2, 'weight' => 0.9],
        'zdnet.com' => ['name' => 'ZDNet', 'tier' => 2, 'weight' => 0.9],
        'theregister.com' => ['name' => 'The Register', 'tier' => 2, 'weight' => 0.9],
        'spectrum.ieee.org' => ['name' => 'IEEE Spectrum', 'tier' => 2, 'weight' => 0.9],
        'technologyreview.com' => ['name' => 'MIT Technology Review', 'tier' => 2, 'weight' => 0.9],

        // Tier 3 - Specialized & Regional (Weight: 0.8)
        '9to5mac.com' => ['name' => '9to5Mac', 'tier' => 3, 'weight' => 0.8],
        '9to5google.com' => ['name' => '9to5Google', 'tier' => 3, 'weight' => 0.8],
        'androidauthority.com' => ['name' => 'Android Authority', 'tier' => 3, 'weight' => 0.8],
        'tomshardware.com' => ['name' => 'Tom\'s Hardware', 'tier' => 3, 'weight' => 0.8],
        'anandtech.com' => ['name' => 'AnandTech', 'tier' => 3, 'weight' => 0.8],
        'xataka.com' => ['name' => 'Xataka', 'tier' => 3, 'weight' => 0.8],
        'genbeta.com' => ['name' => 'Genbeta', 'tier' => 3, 'weight' => 0.8],
        'hipertextual.com' => ['name' => 'Hipertextual', 'tier' => 3, 'weight' => 0.8],
        'theinformation.com' => ['name' => 'The Information', 'tier' => 3, 'weight' => 0.8],

        // Tier 4 - Official Sources (Weight: 0.95)
        'apple.com' => ['name' => 'Apple', 'tier' => 4, 'weight' => 0.95],
        'blog.google' => ['name' => 'Google Blog', 'tier' => 4, 'weight' => 0.95],
        'openai.com' => ['name' => 'OpenAI', 'tier' => 4, 'weight' => 0.95],
        'microsoft.com' => ['name' => 'Microsoft', 'tier' => 4, 'weight' => 0.95],
        'meta.com' => ['name' => 'Meta', 'tier' => 4, 'weight' => 0.95],
        'amazon.com' => ['name' => 'Amazon', 'tier' => 4, 'weight' => 0.95],
        'nvidia.com' => ['name' => 'NVIDIA', 'tier' => 4, 'weight' => 0.95],
        'github.com' => ['name' => 'GitHub', 'tier' => 4, 'weight' => 0.95],
    ];

    public static function all(): array
    {
        return self::$sources;
    }

    public static function getSourceInfo(string $domain): ?array
    {
        $domain = strtolower(trim($domain));
        // Simple domain matching (e.g. www.reuters.com matches reuters.com)
        foreach (self::$sources as $sourceDomain => $info) {
            if ($domain === $sourceDomain || str_ends_with($domain, '.' . $sourceDomain)) {
                return $info;
            }
        }
        return null;
    }

    public static function getTierWeight(string $domain): float
    {
        $info = self::getSourceInfo($domain);
        return $info ? $info['weight'] : 0.0; // 0 weight if untrusted
    }
    
    public static function getTier(string $domain): int
    {
        $info = self::getSourceInfo($domain);
        return $info ? $info['tier'] : 99; // 99 for unknown
    }

    public static function isTrusted(string $url): bool
    {
        $host = parse_url($url, PHP_URL_HOST);
        if (!$host) return false;
        
        return self::getSourceInfo($host) !== null;
    }

    public static function getSearchDomains(): array
    {
        return array_keys(self::$sources);
    }
}
