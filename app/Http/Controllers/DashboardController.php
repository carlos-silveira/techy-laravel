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

        // Device Breakdown (from user_agent)
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
            ->get();

        // Top Pages (non-article routes)
        $topPages = \Illuminate\Support\Facades\DB::table('page_views')
            ->selectRaw('url, COUNT(*) as views')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('url')
            ->orderByDesc('views')
            ->limit(10)
            ->get()
            ->map(function ($item) {
                // Clean URL for display
                $parsed = parse_url($item->url);
                return [
                    'path' => $parsed['path'] ?? '/',
                    'views' => $item->views,
                ];
            });

        // Hourly Traffic (last 24h)
        $hourlyTraffic = \Illuminate\Support\Facades\DB::table('page_views')
            ->selectRaw('HOUR(created_at) as hour, COUNT(*) as views')
            ->where('created_at', '>=', now()->subHours(24))
            ->groupBy('hour')
            ->orderBy('hour')
            ->get()
            ->map(fn($item) => ['hour' => sprintf('%02d:00', $item->hour), 'views' => $item->views]);

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

        $viewsGrowth = $totalViewsPrev7d > 0 
            ? round((($totalViews7d - $totalViewsPrev7d) / $totalViewsPrev7d) * 100, 1) 
            : ($totalViews7d > 0 ? 100 : 0);

        return Inertia::render('Dashboard', [
            'initialBrief' => 'The AI Daily Brief will appear here.',
            'articles' => $articles,
            'analytics' => [
                'viewsPerDay' => $viewsPerDay,
                'topArticles' => $topArticlesWithData,
                'deviceBreakdown' => $deviceBreakdown,
                'topPages' => $topPages,
                'hourlyTraffic' => $hourlyTraffic,
                'summary' => [
                    'totalViews7d' => $totalViews7d,
                    'viewsGrowth' => $viewsGrowth,
                    'uniqueVisitors7d' => $uniqueVisitors7d,
                    'totalArticles' => $totalArticles,
                    'totalLikes' => $totalLikes,
                ],
            ]
        ]);
    }
}
