<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $articles = \App\Models\Article::latest()->get();

        $isMysql = config('database.default') === 'mysql';

        // ─── TRAFFIC: Views + Unique Visitors (14d) ───
        $viewsPerDay = DB::table('page_views')
            ->selectRaw('DATE(created_at) as date, COUNT(DISTINCT ip_address) as visitors, COUNT(id) as views')
            ->where('created_at', '>=', now()->subDays(14))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(fn($item) => [
                'date' => Carbon::parse($item->date)->format('M d'),
                'visitors' => $item->visitors,
                'views' => $item->views,
            ]);

        // ─── SUMMARY COUNTS ───
        $totalViews7d = DB::table('page_views')
            ->where('created_at', '>=', now()->subDays(7))->count();
        $totalViewsPrev7d = DB::table('page_views')
            ->where('created_at', '>=', now()->subDays(14))
            ->where('created_at', '<', now()->subDays(7))->count();
        $uniqueVisitors7d = DB::table('page_views')
            ->where('created_at', '>=', now()->subDays(7))
            ->distinct('ip_address')->count('ip_address');
        $totalArticles = \App\Models\Article::where('status', 'published')->count();
        $totalLikes = \App\Models\Article::sum('likes_count');
        $totalViewsAllTime = \App\Models\Article::sum('views_count');
        $engagementRate = $totalViewsAllTime > 0
            ? round(($totalLikes / $totalViewsAllTime) * 100, 2)
            : 0;
        $viewsGrowth = $totalViewsPrev7d > 0
            ? round((($totalViews7d - $totalViewsPrev7d) / $totalViewsPrev7d) * 100, 1)
            : ($totalViews7d > 0 ? 100 : 0);

        // ─── TOP ARTICLES (7d) ───
        $topArticles = DB::table('page_views')
            ->selectRaw('article_id, COUNT(id) as views, COUNT(DISTINCT ip_address) as unique_views')
            ->whereNotNull('article_id')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('article_id')
            ->orderByDesc('views')
            ->limit(10)
            ->get();
        $topArticleIds = $topArticles->pluck('article_id');
        $topArticlesData = \App\Models\Article::whereIn('id', $topArticleIds)->get()->keyBy('id');
        $topArticlesWithData = $topArticles->map(fn($item) => [
            'id' => $item->article_id,
            'title' => $topArticlesData->get($item->article_id)?->title ?? 'Unknown',
            'slug' => $topArticlesData->get($item->article_id)?->slug ?? '#',
            'views' => $item->views,
            'unique_views' => $item->unique_views,
        ]);

        // ─── DEVICE BREAKDOWN (includes bots from user_agent) ───
        $deviceBreakdown = DB::table('page_views')
            ->selectRaw("
                CASE
                    WHEN user_agent LIKE '%Googlebot%' OR user_agent LIKE '%bingbot%' OR user_agent LIKE '%Baiduspider%'
                         OR user_agent LIKE '%YandexBot%' OR user_agent LIKE '%DuckDuckBot%' OR user_agent LIKE '%Slurp%'
                         OR user_agent LIKE '%facebookexternalhit%' OR user_agent LIKE '%Twitterbot%'
                         OR user_agent LIKE '%LinkedInBot%' OR user_agent LIKE '%WhatsApp%'
                         OR user_agent LIKE '%bot%' OR user_agent LIKE '%Bot%'
                         OR user_agent LIKE '%spider%' OR user_agent LIKE '%crawl%' OR user_agent LIKE '%Crawl%'
                         OR user_agent LIKE '%Applebot%' OR user_agent LIKE '%AhrefsBot%'
                         OR user_agent LIKE '%SemrushBot%' OR user_agent LIKE '%MJ12bot%'
                         OR user_agent LIKE '%PetalBot%' OR user_agent LIKE '%GPTBot%'
                    THEN 'Bot / Crawler'
                    WHEN user_agent LIKE '%Mobile%' OR user_agent LIKE '%Android%' OR user_agent LIKE '%iPhone%' THEN 'Mobile'
                    WHEN user_agent LIKE '%iPad%' OR user_agent LIKE '%Tablet%' THEN 'Tablet'
                    ELSE 'Desktop'
                END as device,
                COUNT(*) as count
            ")
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('device')
            ->orderByDesc('count')
            ->get()
            ->map(fn($item) => [
                'device' => $item->device,
                'count' => (int) $item->count,
            ]);

        // ─── CRAWLER DETAILS (who's crawling you?) ───
        $crawlerDetails = DB::table('page_views')
            ->selectRaw("
                CASE
                    WHEN user_agent LIKE '%Googlebot%' THEN 'Googlebot'
                    WHEN user_agent LIKE '%bingbot%' THEN 'Bingbot'
                    WHEN user_agent LIKE '%GPTBot%' THEN 'GPTBot (OpenAI)'
                    WHEN user_agent LIKE '%Applebot%' THEN 'Applebot'
                    WHEN user_agent LIKE '%facebookexternalhit%' THEN 'Facebook'
                    WHEN user_agent LIKE '%Twitterbot%' THEN 'Twitter/X'
                    WHEN user_agent LIKE '%LinkedInBot%' THEN 'LinkedIn'
                    WHEN user_agent LIKE '%WhatsApp%' THEN 'WhatsApp'
                    WHEN user_agent LIKE '%AhrefsBot%' THEN 'Ahrefs'
                    WHEN user_agent LIKE '%SemrushBot%' THEN 'Semrush'
                    WHEN user_agent LIKE '%YandexBot%' THEN 'Yandex'
                    WHEN user_agent LIKE '%DuckDuckBot%' THEN 'DuckDuckGo'
                    WHEN user_agent LIKE '%PetalBot%' THEN 'PetalBot (Huawei)'
                    WHEN user_agent LIKE '%MJ12bot%' THEN 'Majestic'
                    WHEN user_agent LIKE '%Baiduspider%' THEN 'Baidu'
                    ELSE 'Other Bot'
                END as crawler,
                COUNT(*) as hits
            ")
            ->where('created_at', '>=', now()->subDays(7))
            ->where(function ($q) {
                $q->where('user_agent', 'like', '%bot%')
                  ->orWhere('user_agent', 'like', '%Bot%')
                  ->orWhere('user_agent', 'like', '%spider%')
                  ->orWhere('user_agent', 'like', '%crawl%')
                  ->orWhere('user_agent', 'like', '%Crawl%')
                  ->orWhere('user_agent', 'like', '%Googlebot%')
                  ->orWhere('user_agent', 'like', '%bingbot%')
                  ->orWhere('user_agent', 'like', '%GPTBot%')
                  ->orWhere('user_agent', 'like', '%Applebot%')
                  ->orWhere('user_agent', 'like', '%facebookexternalhit%')
                  ->orWhere('user_agent', 'like', '%Twitterbot%')
                  ->orWhere('user_agent', 'like', '%LinkedInBot%')
                  ->orWhere('user_agent', 'like', '%WhatsApp%');
            })
            ->groupBy('crawler')
            ->orderByDesc('hits')
            ->limit(15)
            ->get();

        // ─── TOP PAGES ───
        $topPages = DB::table('page_views')
            ->selectRaw("
                CASE
                    WHEN url LIKE '%?%' THEN SUBSTR(url, 1, INSTR(url, '?') - 1)
                    ELSE url
                END as clean_url,
                COUNT(*) as views
            ")
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('clean_url')
            ->orderByDesc('views')
            ->limit(10)
            ->get()
            ->map(fn($item) => [
                'path' => parse_url($item->clean_url, PHP_URL_PATH) ?: '/',
                'views' => $item->views,
            ]);

        // ─── REFERRERS (extract actual domain, not just "Reference") ───
        $referrerExpr = $isMysql
            ? "SUBSTRING_INDEX(SUBSTRING_INDEX(REPLACE(REPLACE(referrer, 'https://', ''), 'http://', ''), '/', 1), '?', 1)"
            : "REPLACE(REPLACE(referrer, 'https://', ''), 'http://', '')";

        $topReferrers = DB::table('page_views')
            ->selectRaw("
                CASE
                    WHEN utm_source IS NOT NULL AND utm_source != '' THEN utm_source
                    WHEN referrer IS NULL OR referrer = '' THEN 'Direct / Bookmarked'
                    WHEN referrer LIKE '%techynews.lat%' THEN 'Internal Navigation'
                    ELSE {$referrerExpr}
                END as source,
                COUNT(*) as views
            ")
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('source')
            ->orderByDesc('views')
            ->limit(12)
            ->get()
            ->map(function ($item) {
                // Clean up referrer domains (strip trailing paths for non-MySQL)
                $source = $item->source;
                if (str_contains($source, '/')) {
                    $source = explode('/', $source)[0];
                }
                return [
                    'source' => $source,
                    'views' => $item->views,
                    'type' => match(true) {
                        $source === 'Direct / Bookmarked' => 'direct',
                        $source === 'Internal Navigation' => 'internal',
                        str_contains($source, 'google') => 'search',
                        str_contains($source, 'bing') => 'search',
                        str_contains($source, 'duckduckgo') => 'search',
                        str_contains($source, 'yahoo') => 'search',
                        str_contains($source, 't.co') || str_contains($source, 'twitter') || str_contains($source, 'x.com') => 'social',
                        str_contains($source, 'facebook') || str_contains($source, 'fb.') => 'social',
                        str_contains($source, 'linkedin') => 'social',
                        str_contains($source, 'reddit') => 'social',
                        str_contains($source, 'github') => 'social',
                        default => 'referral',
                    },
                ];
            });

        // ─── HOURLY TRAFFIC (24h) ───
        $hourFunc = $isMysql ? "HOUR(created_at)" : "strftime('%H', created_at)";
        $hourlyTraffic = DB::table('page_views')
            ->selectRaw("{$hourFunc} as hour, COUNT(*) as views")
            ->where('created_at', '>=', now()->subHours(24))
            ->groupBy('hour')
            ->orderBy('hour')
            ->get()
            ->map(fn($item) => ['hour' => sprintf('%02d:00', (int) $item->hour), 'views' => $item->views]);

        // ─── GEMINI AI USAGE (7d) ───
        $dateFunc = "DATE(created_at)";
        $geminiUsagePerDay = Schema::hasTable('gemini_logs') ?
            DB::table('gemini_logs')
                ->selectRaw("{$dateFunc} as date, SUM(total_tokens) as tokens, COUNT(*) as requests, SUM(cost_estimate) as cost")
                ->where('created_at', '>=', now()->subDays(7))
                ->groupBy('date')
                ->orderBy('date', 'asc')
                ->get()
                ->map(fn($item) => [
                    'date' => Carbon::parse($item->date)->format('M d'),
                    'tokens' => (int) $item->tokens,
                    'requests' => (int) $item->requests,
                    'cost' => round((float) $item->cost, 4),
                ]) : collect([]);

        $totalGeminiTokens7d = Schema::hasTable('gemini_logs') ?
            DB::table('gemini_logs')->where('created_at', '>=', now()->subDays(7))->sum('total_tokens') : 0;
        $totalGeminiCost7d = Schema::hasTable('gemini_logs') ?
            DB::table('gemini_logs')->where('created_at', '>=', now()->subDays(7))->sum('cost_estimate') : 0;
        $totalGeminiRequests7d = Schema::hasTable('gemini_logs') ?
            DB::table('gemini_logs')->where('created_at', '>=', now()->subDays(7))->count() : 0;

        // Raw Gemini logs (recent 15, with correct column names)
        $rawGeminiLogs = Schema::hasTable('gemini_logs') ?
            DB::table('gemini_logs')
                ->orderByDesc('created_at')
                ->limit(15)
                ->get()
                ->map(fn($log) => [
                    'id' => $log->id,
                    'model_name' => str_replace('models/', '', $log->model_name ?? ''),
                    'operation_type' => $log->operation_type ?? 'unknown',
                    'prompt_tokens' => $log->prompt_tokens,
                    'completion_tokens' => $log->completion_tokens,
                    'total_tokens' => $log->total_tokens,
                    'cost_estimate' => round((float) ($log->cost_estimate ?? 0), 6),
                    'created_at' => $log->created_at,
                ]) : collect([]);

        // Model Distribution
        $geminiModelDistribution = Schema::hasTable('gemini_logs') ?
            DB::table('gemini_logs')
                ->selectRaw('model_name, SUM(total_tokens) as tokens, COUNT(*) as requests, SUM(cost_estimate) as cost')
                ->where('created_at', '>=', now()->subDays(7))
                ->groupBy('model_name')
                ->get()
                ->map(fn($item) => [
                    'model' => str_replace('models/', '', $item->model_name),
                    'tokens' => (int) $item->tokens,
                    'requests' => (int) $item->requests,
                    'cost' => round((float) $item->cost, 4),
                    'percentage' => $totalGeminiTokens7d > 0 ? round(($item->tokens / $totalGeminiTokens7d) * 100, 1) : 0,
                ]) : collect([]);

        return Inertia::render('Dashboard', [
            'initialBrief' => 'The AI Daily Brief will appear here.',
            'articles' => $articles,
            'analytics' => [
                'viewsPerDay' => $viewsPerDay,
                'topArticles' => $topArticlesWithData,
                'deviceBreakdown' => $deviceBreakdown,
                'crawlerDetails' => $crawlerDetails,
                'topPages' => $topPages,
                'topReferrers' => $topReferrers,
                'hourlyTraffic' => $hourlyTraffic,
                'geminiUsage' => $geminiUsagePerDay,
                'geminiModelDistribution' => $geminiModelDistribution,
                'rawGeminiLogs' => $rawGeminiLogs,
                'summary' => [
                    'totalViews7d' => $totalViews7d,
                    'viewsGrowth' => $viewsGrowth,
                    'uniqueVisitors7d' => $uniqueVisitors7d,
                    'totalArticles' => $totalArticles,
                    'totalLikes' => $totalLikes,
                    'engagementRate' => $engagementRate,
                    'totalViewsAllTime' => $totalViewsAllTime,
                    'totalGeminiTokens7d' => $totalGeminiTokens7d,
                    'totalGeminiCost7d' => round((float) $totalGeminiCost7d, 4),
                    'totalGeminiRequests7d' => $totalGeminiRequests7d,
                ],
            ]
        ]);
    }
}
