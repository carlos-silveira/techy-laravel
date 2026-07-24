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
    public function index(Request $request)
    {
        $articles = \App\Models\Article::latest()->get();
        $isMysql = config('database.default') === 'mysql';

        $period = $request->query('period', '7d');
        
        $startDate = match($period) {
            'today' => now()->startOfDay(),
            '7d' => now()->subDays(7),
            '30d' => now()->subDays(30),
            'all' => null,
            default => now()->subDays(7),
        };

        $prevStartDate = match($period) {
            'today' => now()->subDays(1)->startOfDay(),
            '7d' => now()->subDays(14),
            '30d' => now()->subDays(60),
            'all' => null,
            default => now()->subDays(14),
        };

        $prevEndDate = match($period) {
            'today' => now()->startOfDay(),
            '7d' => now()->subDays(7),
            '30d' => now()->subDays(30),
            'all' => null,
            default => now()->subDays(7),
        };

        $excludeBots = function ($q) {
            $q->where('user_agent', 'not like', '%bot%')
              ->where('user_agent', 'not like', '%Bot%')
              ->where('user_agent', 'not like', '%spider%')
              ->where('user_agent', 'not like', '%crawl%')
              ->where('user_agent', 'not like', '%Crawl%')
              ->where('user_agent', 'not like', '%Googlebot%')
              ->where('user_agent', 'not like', '%bingbot%')
              ->where('user_agent', 'not like', '%GPTBot%')
              ->where('user_agent', 'not like', '%Applebot%')
              ->where('user_agent', 'not like', '%facebookexternalhit%')
              ->where('user_agent', 'not like', '%Twitterbot%')
              ->where('user_agent', 'not like', '%LinkedInBot%')
              ->where('user_agent', 'not like', '%WhatsApp%');
        };

        // ─── TRAFFIC: Views + Unique Visitors (Human Only) ───
        $viewsPerDay = DB::table('page_views')
            ->selectRaw('DATE(created_at) as date, COUNT(DISTINCT ip_address) as visitors, COUNT(id) as views')
            ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
            ->where($excludeBots)
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(fn($item) => [
                'date' => Carbon::parse($item->date)->format('M d'),
                'visitors' => $item->visitors,
                'views' => $item->views,
            ]);

        // ─── SUMMARY COUNTS (Human Only) ───
        $totalViews = DB::table('page_views')
            ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
            ->where($excludeBots)->count();
            
        $totalViewsPrev = $prevStartDate ? DB::table('page_views')
            ->where('created_at', '>=', $prevStartDate)
            ->where('created_at', '<', $prevEndDate)
            ->where($excludeBots)->count() : 0;
            
        $uniqueVisitors = DB::table('page_views')
            ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
            ->where($excludeBots)
            ->distinct('ip_address')->count('ip_address');
            
        $totalArticles = \App\Models\Article::where('status', 'published')->count();
        $totalLikesAllTime = \App\Models\Article::sum('likes_count'); // Overall engagement metric
        $totalViewsAllTime = DB::table('page_views')->where($excludeBots)->count();
        
        $engagementRate = $totalViewsAllTime > 0
            ? round(($totalLikesAllTime / $totalViewsAllTime) * 100, 2)
            : 0;
            
        $viewsGrowth = $totalViewsPrev > 0
            ? round((($totalViews - $totalViewsPrev) / $totalViewsPrev) * 100, 1)
            : ($totalViews > 0 && $period !== 'all' ? 100 : 0);

        // ─── TOP ARTICLES (Human Only) ───
        $topArticles = DB::table('page_views')
            ->selectRaw('article_id, COUNT(id) as views, COUNT(DISTINCT ip_address) as unique_views')
            ->whereNotNull('article_id')
            ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
            ->where($excludeBots)
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

        // ─── TOP LIKED (Filtered by publication date) ───
        $topLikedArticles = \App\Models\Article::where('likes_count', '>', 0)
            ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
            ->orderByDesc('likes_count')
            ->limit(3)
            ->get(['title', 'slug', 'likes_count'])
            ->map(fn($item) => [
                'title' => $item->title,
                'slug' => $item->slug,
                'likes' => $item->likes_count
            ]);

        // ─── DEVICE BREAKDOWN (Includes bots to show ratio) ───
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
            ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
            ->groupBy('device')
            ->orderByDesc('count')
            ->get()
            ->map(fn($item) => [
                'device' => $item->device,
                'count' => (int) $item->count,
            ]);

        // ─── CRAWLER DETAILS ───
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
            ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
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

        // ─── TOP PAGES (Human Only) ───
        $topPages = DB::table('page_views')
            ->selectRaw("
                CASE
                    WHEN url LIKE '%?%' THEN SUBSTR(url, 1, INSTR(url, '?') - 1)
                    ELSE url
                END as clean_url,
                COUNT(*) as views
            ")
            ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
            ->where($excludeBots)
            ->groupBy('clean_url')
            ->orderByDesc('views')
            ->limit(10)
            ->get()
            ->map(fn($item) => [
                'path' => parse_url($item->clean_url, PHP_URL_PATH) ?: '/',
                'views' => $item->views,
            ]);

        // ─── REFERRERS (Human Only) ───
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
            ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
            ->where($excludeBots)
            ->groupBy('source')
            ->orderByDesc('views')
            ->limit(12)
            ->get()
            ->map(function ($item) {
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

        // ─── HOURLY TRAFFIC (Last 24h, always 24h for human) ───
        $hourFunc = $isMysql ? "HOUR(created_at)" : "strftime('%H', created_at)";
        $hourlyTraffic = DB::table('page_views')
            ->selectRaw("{$hourFunc} as hour, COUNT(*) as views")
            ->where('created_at', '>=', now()->subHours(24))
            ->where($excludeBots)
            ->groupBy('hour')
            ->orderBy('hour')
            ->get()
            ->map(fn($item) => ['hour' => sprintf('%02d:00', (int) $item->hour), 'views' => $item->views]);

        // ─── COUNTRY DATA (Human Only) ───
        $countriesData = DB::table('page_views')
            ->selectRaw('country, COUNT(*) as views')
            ->whereNotNull('country')
            ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
            ->where($excludeBots)
            ->groupBy('country')
            ->orderByDesc('views')
            ->get()
            ->map(fn($item) => [
                'id' => $item->country,
                'value' => (int) $item->views,
            ]);

        // ─── SESSION METRICS (Bounce Rate & Duration) ───
        $sessions = DB::table('page_views')
            ->selectRaw('session_id, COUNT(id) as hits, MIN(created_at) as first_hit, MAX(created_at) as last_hit')
            ->whereNotNull('session_id')
            ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
            ->where($excludeBots)
            ->groupBy('session_id')
            ->get();

        $totalSessions = $sessions->count();
        $bouncedSessions = $sessions->where('hits', 1)->count();
        $bounceRate = $totalSessions > 0 ? round(($bouncedSessions / $totalSessions) * 100, 1) : 0;

        $multiHitSessions = $sessions->where('hits', '>', 1);
        $totalDurationSeconds = 0;
        foreach ($multiHitSessions as $s) {
            $totalDurationSeconds += Carbon::parse($s->last_hit)->diffInSeconds(Carbon::parse($s->first_hit));
        }
        $avgDurationSeconds = $multiHitSessions->count() > 0 ? (int) round($totalDurationSeconds / $multiHitSessions->count()) : 0;
        $avgSessionDuration = gmdate("i:s", $avgDurationSeconds); // e.g. "02:34"

        // ─── GEMINI AI USAGE ───
        $dateFunc = "DATE(created_at)";
        $geminiUsagePerDay = Schema::hasTable('gemini_logs') ?
            DB::table('gemini_logs')
                ->selectRaw("{$dateFunc} as date, SUM(total_tokens) as tokens, COUNT(*) as requests, SUM(cost_estimate) as cost")
                ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
                ->groupBy('date')
                ->orderBy('date', 'asc')
                ->get()
                ->map(fn($item) => [
                    'date' => Carbon::parse($item->date)->format('M d'),
                    'tokens' => (int) $item->tokens,
                    'requests' => (int) $item->requests,
                    'cost' => round((float) $item->cost, 4),
                ]) : collect([]);

        $totalGeminiTokens = Schema::hasTable('gemini_logs') ?
            DB::table('gemini_logs')->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))->sum('total_tokens') : 0;
        $totalGeminiCost = Schema::hasTable('gemini_logs') ?
            DB::table('gemini_logs')->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))->sum('cost_estimate') : 0;
        $totalGeminiRequests = Schema::hasTable('gemini_logs') ?
            DB::table('gemini_logs')->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))->count() : 0;

        // ─── ADSENSE REVENUE PROJECTION (Dynamic based on Period) ───
        $rpmLow = 1.50;
        $rpmHigh = 4.00;
        $projLow = ($totalViews / 1000) * $rpmLow;
        $projHigh = ($totalViews / 1000) * $rpmHigh;
        
        $adsenseProjection = [
            'views' => $totalViews,
            'low' => round($projLow, 2),
            'high' => round($projHigh, 2),
            'rpmAverage' => 2.75, // Just for display
        ];

        // Raw Gemini logs
        $rawGeminiLogs = Schema::hasTable('gemini_logs') ?
            DB::table('gemini_logs')
                ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
                ->orderByDesc('created_at')
                ->limit(30)
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
                ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
                ->groupBy('model_name')
                ->get()
                ->map(fn($item) => [
                    'model' => str_replace('models/', '', $item->model_name),
                    'tokens' => (int) $item->tokens,
                    'requests' => (int) $item->requests,
                    'cost' => round((float) $item->cost, 4),
                    'percentage' => $totalGeminiTokens > 0 ? round(($item->tokens / $totalGeminiTokens) * 100, 1) : 0,
                ]) : collect([]);

        return Inertia::render('Dashboard', [
            'initialBrief' => 'The AI Daily Brief will appear here.',
            'articles' => $articles,
            'period' => $period,
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
                'countriesData' => $countriesData,
                'summary' => [
                    'totalViews' => $totalViews,
                    'viewsGrowth' => $viewsGrowth,
                    'uniqueVisitors' => $uniqueVisitors,
                    'totalArticles' => $totalArticles,
                    'totalLikes' => $totalLikesAllTime,
                    'topLikedArticles' => $topLikedArticles,
                    'engagementRate' => $engagementRate,
                    'bounceRate' => $bounceRate,
                    'avgSessionDuration' => $avgSessionDuration,
                    'totalViewsAllTime' => $totalViewsAllTime,
                    'totalGeminiTokens' => $totalGeminiTokens,
                    'totalGeminiCost' => round((float) $totalGeminiCost, 4),
                    'totalGeminiRequests' => $totalGeminiRequests,
                    'adsenseProjection' => $adsenseProjection,
                ],
            ]
        ]);
    }
}
