<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    /**
     * Get aggregate analytics data for the dashboard.
     */
    public function dashboardStats(): JsonResponse
    {
        $publishedArticles = Article::where('status', 'published')->get();

        $totalViews = $publishedArticles->sum('views_count');
        $totalArticles = $publishedArticles->count();

        // Top 5 articles
        $topArticles = Article::where('status', 'published')
            ->orderByDesc('views_count')
            ->take(5)
            ->get(['id', 'title', 'slug', 'views_count']);

        // Data for chart (e.g., views over the last 7 days derived from published_at, but we'll use updated_at for now)
        // A real system would have a separate `article_views` table with timestamps, but we approximate for this CMS.
        $recentPerformance = $topArticles->map(function ($article) {
            return [
                'name' => mb_strimwidth($article->title, 0, 15, '...'),
                'views' => $article->views_count,
            ];
        });

        return response()->json([
            'total_views' => $totalViews,
            'total_articles' => $totalArticles,
            'top_articles' => $topArticles,
            'chart_data' => $recentPerformance,
        ]);
    }
}
