<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\LlamaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private LlamaService $llamaService;

    public function __construct(LlamaService $llamaService)
    {
        $this->llamaService = $llamaService;
    }

    public function index()
    {
        $articles = \App\Models\Article::latest()->get();

        // Analytics Data — Views + Unique Visitors per day (14 days)
        // SQLite uses DATE() for dates, which is fine.
        $viewsPerDay = \Illuminate\Support\Facades\DB::table('page_views')
            ->selectRaw('DATE(created_at) as date, COUNT(DISTINCT ip_address) as visitors, COUNT(id) as views')
            ->where('created_at', '>=', now()->subDays(14))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => \Carbon\Carbon::parse($item->date)->format('M d'),
                    'visitors' => $item->visitors,
                    'views' => $item->views,
                ];
            });

        // Top Articles by Views (7 days)
        $topArticles = \Illuminate\Support\Facades\DB::table('page_views')
            ->selectRaw('article_id, COUNT(id) as views, COUNT(DISTINCT ip_address) as unique_views')
            ->whereNotNull('article_id')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('article_id')
            ->orderByDesc('views')
            ->limit(10)
            ->get();

        $topArticleIds = $topArticles->pluck('article_id');
        $topArticlesData = \App\Models\Article::whereIn('id', $topArticleIds)->get()->keyBy('id');
        
        $topArticlesWithData = $topArticles->map(function ($item) use ($topArticlesData) {
            $article = $topArticlesData->get($item->article_id);
            return [
                'id' => $item->article_id,
                'title' => $article ? $article->title : 'Unknown Article',
                'slug' => $article ? $article->slug : '#',
                'views' => $item->views,
                'unique_views' => $item->unique_views,
            ];
        });

        // Device Breakdown (More robust CASE)
        $deviceBreakdown = \Illuminate\Support\Facades\DB::table('page_views')
            ->selectRaw("
                CASE 
                    WHEN user_agent LIKE '%Mobile%' OR user_agent LIKE '%Android%' OR user_agent LIKE '%iPhone%' THEN 'Mobile'
                    WHEN user_agent LIKE '%Tablet%' OR user_agent LIKE '%iPad%' THEN 'Tablet'
                    WHEN user_agent LIKE '%bot%' OR user_agent LIKE '%Bot%' OR user_agent LIKE '%spider%' OR user_agent LIKE '%crawl%' THEN 'Bot'
                    ELSE 'Desktop'
                END as device,
                COUNT(*) as count
            ")
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('device')
            ->orderByDesc('count')
            ->get()
            ->map(function ($item) use ($totalViews7d) {
                return [
                    'device' => $item->device,
                    'count' => $item->count,
                    'percentage' => $totalViews7d > 0 ? round(($item->count / $totalViews7d) * 100, 1) : 0
                ];
            });

        // Top Pages (Normalized path grouping)
        // We strip query parameters to avoid duplicates like / and /?ref=...
        $topPages = \Illuminate\Support\Facades\DB::table('page_views')
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
            ->map(function ($item) {
                $path = parse_url($item->clean_url, PHP_URL_PATH) ?: '/';
                return [
                    'path' => $path,
                    'views' => $item->views,
                ];
            });

        // Top Referrers (Compatible parsing)
        $topReferrers = \Illuminate\Support\Facades\DB::table('page_views')
            ->selectRaw("
                CASE
                    WHEN utm_source IS NOT NULL AND utm_source != '' THEN utm_source
                    WHEN referrer IS NULL OR referrer = '' THEN 'Direct'
                    ELSE 'Reference'
                END as source,
                COUNT(*) as views
            ")
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('source')
            ->orderByDesc('views')
            ->limit(8)
            ->get();

        // Hourly Traffic (last 24h) - COMPATIBILITY FIX FOR SQLITE
        $isSqlite = config('database.default') === 'sqlite';
        $hourFunc = $isSqlite ? "strftime('%H', created_at)" : "HOUR(created_at)";

        $hourlyTraffic = \Illuminate\Support\Facades\DB::table('page_views')
            ->selectRaw("{$hourFunc} as hour, COUNT(*) as views")
            ->where('created_at', '>=', now()->subHours(24))
            ->groupBy('hour')
            ->orderBy('hour')
            ->get()
            ->map(fn($item) => ['hour' => sprintf('%02d:00', (int)$item->hour), 'views' => $item->views]);

        // Summary Stats
        $totalViews7d = \Illuminate\Support\Facades\DB::table('page_views')
            ->where('created_at', '>=', now()->subDays(7))->count();
        $totalViewsPrev7d = \Illuminate\Support\Facades\DB::table('page_views')
            ->where('created_at', '>=', now()->subDays(14))
            ->where('created_at', '<', now()->subDays(7))->count();
        $uniqueVisitors7d = \Illuminate\Support\Facades\DB::table('page_views')
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

        // Gemini Usage Stats (Last 7 days)
        $dateFunc = $isSqlite ? "DATE(created_at)" : "DATE(created_at)";
        $geminiUsagePerDay = \Illuminate\Support\Facades\Schema::hasTable('gemini_logs') ? 
            \Illuminate\Support\Facades\DB::table('gemini_logs')
                ->selectRaw("{$dateFunc} as date, SUM(total_tokens) as tokens, COUNT(*) as requests")
                ->where('created_at', '>=', now()->subDays(7))
                ->groupBy('date')
                ->orderBy('date', 'asc')
                ->get()
                ->map(function ($item) {
                    return [
                        'date' => \Carbon\Carbon::parse($item->date)->format('M d'),
                        'tokens' => $item->tokens,
                        'requests' => $item->requests,
                    ];
                }) : collect([]);

        $totalGeminiTokens7d = \Illuminate\Support\Facades\Schema::hasTable('gemini_logs') ? 
            \Illuminate\Support\Facades\DB::table('gemini_logs')
            ->where('created_at', '>=', now()->subDays(7))
            ->sum('total_tokens') : 0;

        $rawGeminiLogs = \Illuminate\Support\Facades\Schema::hasTable('gemini_logs') ?
            \Illuminate\Support\Facades\DB::table('gemini_logs')
                ->orderByDesc('created_at')
                ->limit(10)
                ->get() : collect([]);

        // NEW: Gemini Model Distribution (Pie Chart data)
        $geminiModelDistribution = \Illuminate\Support\Facades\Schema::hasTable('gemini_logs') ?
            \Illuminate\Support\Facades\DB::table('gemini_logs')
                ->selectRaw('model, SUM(total_tokens) as tokens')
                ->where('created_at', '>=', now()->subDays(7))
                ->groupBy('model')
                ->get()
                ->map(fn($item) => [
                    'model' => str_replace('models/', '', $item->model),
                    'tokens' => (int)$item->tokens,
                    'percentage' => $totalGeminiTokens7d > 0 ? round(($item->tokens / $totalGeminiTokens7d) * 100, 1) : 0
                ]) : collect([]);

        return Inertia::render('Dashboard', [
            'initialBrief' => 'The AI Daily Brief will appear here.',
            'articles' => $articles,
            'analytics' => [
                'viewsPerDay' => $viewsPerDay,
                'topArticles' => $topArticlesWithData,
                'deviceBreakdown' => $deviceBreakdown,
                'topPages' => $topPages,
                'topReferrers' => $topReferrers,
                'hourlyTraffic' => $hourlyTraffic,
                'geminiUsage' => $geminiUsagePerDay,
                'geminiModelDistribution' => $geminiModelDistribution, // NEW
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
                ],
            ]
        ]);
    }
}

