<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Reads REAL monetization numbers (impressions, clicks, revenue) from the Adsterra publisher API.
 * Docs: https://docs.adsterratools.com/public/ (X-API-Key header).
 */
class AdsterraStatsService
{
    private const BASE_URL = 'https://api3.adsterratools.com/publisher';
    private const CACHE_SECONDS = 900;

    public function isConfigured(): bool
    {
        return (string) config('services.adsterra.token') !== '';
    }

    /**
     * @return array{
     *   configured: bool, error: ?string,
     *   totals: array{impressions: int, clicks: int, revenue: float, ctr: float, cpm: float},
     *   perDay: list<array{date: string, impressions: int, clicks: int, revenue: float}>
     * }
     */
    public function stats(string $startDate, string $endDate): array
    {
        $empty = [
            'configured' => $this->isConfigured(),
            'error' => null,
            'totals' => ['impressions' => 0, 'clicks' => 0, 'revenue' => 0.0, 'ctr' => 0.0, 'cpm' => 0.0],
            'perDay' => [],
        ];

        if (! $this->isConfigured()) {
            return $empty;
        }

        $cacheKey = "adsterra_stats_{$startDate}_{$endDate}";
        $cached = Cache::get($cacheKey);
        if (is_array($cached)) {
            return $cached;
        }

        try {
            $response = Http::timeout(10)
                ->withHeaders(['X-API-Key' => config('services.adsterra.token'), 'Accept' => 'application/json'])
                ->get(self::BASE_URL . '/stats.json', [
                    'start_date' => $startDate,
                    'finish_date' => $endDate,
                    'group_by' => 'date',
                ]);

            if (! $response->successful()) {
                Log::error('Adsterra stats request failed', ['status' => $response->status(), 'body' => substr($response->body(), 0, 300), 'range' => [$startDate, $endDate]]);

                return array_merge($empty, ['error' => 'Adsterra API error (HTTP ' . $response->status() . ')']);
            }

            $result = $this->normalize($response->json('items', []), $empty);
            Cache::put($cacheKey, $result, self::CACHE_SECONDS);

            return $result;
        } catch (\Throwable $e) {
            Log::error('Adsterra stats exception', ['range' => [$startDate, $endDate], 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);

            return array_merge($empty, ['error' => 'Adsterra API unreachable']);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $items
     * @param  array<string, mixed>  $base
     * @return array<string, mixed>
     */
    private function normalize(array $items, array $base): array
    {
        $perDay = [];
        $impressions = 0;
        $clicks = 0;
        $revenue = 0.0;

        foreach ($items as $item) {
            $row = [
                'date' => (string) ($item['date'] ?? ''),
                'impressions' => (int) ($item['impression'] ?? 0),
                'clicks' => (int) ($item['clicks'] ?? 0),
                'revenue' => round((float) ($item['revenue'] ?? 0), 4),
            ];
            $perDay[] = $row;
            $impressions += $row['impressions'];
            $clicks += $row['clicks'];
            $revenue += $row['revenue'];
        }

        $base['totals'] = [
            'impressions' => $impressions,
            'clicks' => $clicks,
            'revenue' => round($revenue, 4),
            'ctr' => $impressions > 0 ? round($clicks / $impressions * 100, 3) : 0.0,
            'cpm' => $impressions > 0 ? round($revenue / $impressions * 1000, 4) : 0.0,
        ];
        $base['perDay'] = $perDay;

        return $base;
    }
}
