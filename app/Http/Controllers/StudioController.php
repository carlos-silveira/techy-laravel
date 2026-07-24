<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ScoutedArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class StudioController extends Controller
{
    public function index(Request $request)
    {
        $excludeBots = function ($q) {
            $q->where('user_agent', 'not like', '%bot%')
              ->where('user_agent', 'not like', '%Bot%')
              ->where('user_agent', 'not like', '%spider%')
              ->where('user_agent', 'not like', '%crawl%')
              ->where('user_agent', 'not like', '%Crawl%')
              ->where('user_agent', 'not like', '%Googlebot%')
              ->where('user_agent', 'not like', '%bingbot%')
              ->where('user_agent', 'not like', '%GPTBot%')
              ->where('user_agent', 'not like', '%Applebot%');
        };

        // Stats
        $totalArticles = Article::count();
        $publishedCount = Article::where('status', 'published')->count();
        $draftCount = Article::where('status', 'draft')->count();
        $publishedToday = Article::where('status', 'published')
            ->where('created_at', '>=', now()->startOfDay())
            ->count();

        $totalViews7d = DB::table('page_views')
            ->where('created_at', '>=', now()->subDays(7))
            ->where($excludeBots)
            ->count();

        $totalViewsPrev7d = DB::table('page_views')
            ->where('created_at', '>=', now()->subDays(14))
            ->where('created_at', '<', now()->subDays(7))
            ->where($excludeBots)
            ->count();

        $viewsGrowth = $totalViewsPrev7d > 0
            ? round((($totalViews7d - $totalViewsPrev7d) / $totalViewsPrev7d) * 100, 1)
            : 0;

        $totalLikes = (int) Article::sum('likes_count');
        $totalViewsAllTime = DB::table('page_views')->where($excludeBots)->count();
        $engagementRate = $totalViewsAllTime > 0
            ? round(($totalLikes / $totalViewsAllTime) * 100, 2)
            : 0;

        // Gemini API Costs (7 days)
        $geminiTokens7d = (int) (DB::table('gemini_logs')
            ->where('created_at', '>=', now()->subDays(7))
            ->sum('total_tokens') ?? 0);

        $geminiCost7d = (float) (DB::table('gemini_logs')
            ->where('created_at', '>=', now()->subDays(7))
            ->sum('cost_estimate') ?? 0);

        // Recent Activity Feed
        $recentArticles = Article::latest()->take(5)->get()->map(function ($a) {
            return [
                'type' => 'article',
                'id' => $a->id,
                'title' => $a->title,
                'status' => $a->status,
                'fact_check_score' => $a->fact_check_score,
                'time' => $a->created_at->diffForHumans(),
                'timestamp' => $a->created_at->timestamp,
            ];
        });

        $recentScouted = ScoutedArticle::latest()->take(3)->get()->map(function ($s) {
            return [
                'type' => 'scout',
                'id' => $s->id,
                'title' => $s->title,
                'status' => $s->status,
                'time' => $s->created_at->diffForHumans(),
                'timestamp' => $s->created_at->timestamp,
            ];
        });

        $activities = collect($recentArticles)
            ->concat($recentScouted)
            ->sortByDesc('timestamp')
            ->values()
            ->take(8);

        // Top 5 Performer Articles
        $topArticles = Article::where('status', 'published')
            ->orderBy('views_count', 'desc')
            ->take(5)
            ->get(['id', 'title', 'slug', 'views_count', 'likes_count', 'cover_image_path', 'updated_at']);

        // System Health Status
        $systemStatus = [
            'gemini_api' => !empty(config('services.gemini.key', env('GEMINI_API_KEY'))),
            'openrouter_fallback' => !empty(env('OPENROUTER_API_KEY')),
            'queue_health' => 'ok',
            'scout_pending' => ScoutedArticle::where('status', 'pending')->count(),
        ];

        return Inertia::render('Studio/Index', [
            'stats' => [
                'total_articles' => $totalArticles,
                'published_count' => $publishedCount,
                'draft_count' => $draftCount,
                'published_today' => $publishedToday,
                'total_views_7d' => $totalViews7d,
                'views_growth' => $viewsGrowth,
                'engagement_rate' => $engagementRate,
                'gemini_tokens_7d' => $geminiTokens7d,
                'gemini_cost_7d' => round($geminiCost7d, 4),
            ],
            'activities' => $activities,
            'topArticles' => $topArticles,
            'systemStatus' => $systemStatus,
        ]);
    }
}
