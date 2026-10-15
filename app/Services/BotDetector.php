<?php

declare(strict_types=1);

namespace App\Services;

/**
 * Single source of truth for classifying a User-Agent as a bot / crawler / script.
 *
 * Used by the page-view middleware (at write time), the engagement endpoints and
 * the `analytics:reclassify-bots` command (to backfill historical rows).
 */
class BotDetector
{
    /**
     * Known crawlers, in priority order. Key = display name, value = UA fragments (lowercase).
     *
     * @var array<string, list<string>>
     */
    private const NAMED_CRAWLERS = [
        'Googlebot' => ['googlebot', 'google-inspectiontool', 'googleother', 'apis-google', 'adsbot-google', 'storebot-google'],
        'Google AdSense' => ['mediapartners-google'],
        'Bingbot' => ['bingbot', 'bingpreview', 'msnbot'],
        'GPTBot (OpenAI)' => ['gptbot', 'chatgpt-user', 'oai-searchbot'],
        'Applebot' => ['applebot'],
        'Facebook' => ['facebookexternalhit', 'facebot', 'meta-externalagent'],
        'Twitter/X' => ['twitterbot'],
        'LinkedIn' => ['linkedinbot'],
        'WhatsApp' => ['whatsapp'],
        'Ahrefs' => ['ahrefsbot'],
        'Semrush' => ['semrushbot'],
        'Yandex' => ['yandexbot', 'yandex.com/bots'],
        'DuckDuckGo' => ['duckduckbot'],
        'PetalBot (Huawei)' => ['petalbot'],
        'Majestic' => ['mj12bot'],
        'Baidu' => ['baiduspider'],
        'Claude / Anthropic' => ['claudebot', 'claude-web', 'anthropic-ai'],
        'Perplexity' => ['perplexitybot'],
        'ByteDance' => ['bytespider'],
        'Scripts (curl/python/etc.)' => [
            'curl/', 'wget/', 'python-requests', 'python-urllib', 'python/', 'aiohttp', 'httpx', 'go-http-client',
            'okhttp', 'java/', 'apache-httpclient', 'libwww', 'axios/', 'node-fetch', 'node/', 'undici', 'postmanruntime',
            'scrapy', 'guzzlehttp', 'headlesschrome', 'phantomjs', 'puppeteer', 'playwright', 'selenium',
        ],
    ];

    /** Generic fragments that nearly always identify automated clients. */
    private const GENERIC_FRAGMENTS = ['bot', 'spider', 'crawl', 'slurp', 'scraper', 'fetcher', 'monitor', 'uptime', 'preview', 'validator'];

    /**
     * Exact UA signature that scrapers use massively (a spoofed, ancient iPhone OS 13.2.3 Safari 13.0.3).
     * On this site it shows ~1.9k hits, 0 cookies kept and 1 hit per session.
     */
    private const SPOOFED_SIGNATURES = ['iphone os 13_2_3 like mac os x) applewebkit/605.1.15 (khtml, like gecko) version/13.0.3'];

    public function isBot(?string $userAgent): bool
    {
        $ua = strtolower(trim((string) $userAgent));

        // Real browsers always send a UA that starts with "Mozilla/".
        if ($ua === '' || ! str_starts_with($ua, 'mozilla/')) {
            return true;
        }

        foreach (self::SPOOFED_SIGNATURES as $signature) {
            if (str_contains($ua, $signature)) {
                return true;
            }
        }

        if ($this->crawlerName($userAgent) !== null) {
            return true;
        }

        foreach (self::GENERIC_FRAGMENTS as $fragment) {
            if (str_contains($ua, $fragment)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Human readable crawler label for a bot UA, or null when the UA is not a known bot.
     */
    public function crawlerName(?string $userAgent): ?string
    {
        $ua = strtolower((string) $userAgent);

        foreach (self::NAMED_CRAWLERS as $name => $fragments) {
            foreach ($fragments as $fragment) {
                if (str_contains($ua, $fragment)) {
                    return $name;
                }
            }
        }

        return null;
    }

    /**
     * Label used by the dashboard's crawler breakdown (always returns a string for bot UAs).
     */
    public function label(?string $userAgent): string
    {
        $ua = trim((string) $userAgent);

        if ($ua === '') {
            return 'Empty User-Agent';
        }

        return $this->crawlerName($userAgent)
            ?? (str_starts_with(strtolower($ua), 'mozilla/') ? 'Spoofed / Other Bot' : 'Non-browser client');
    }
}
