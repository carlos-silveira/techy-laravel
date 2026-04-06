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

        // Analytics Data
        $viewsPerDay = \Illuminate\Support\Facades\DB::table('page_views')
            ->selectRaw('DATE(created_at) as date, COUNT(DISTINCT ip_address) as visitors, COUNT(id) as views')
            ->where('created_at', '>=', now()->subDays(14))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(function ($item) {
                // Ensure date format is clean
                return [
                    'date' => \Carbon\Carbon::parse($item->date)->format('M d'),
                    'visitors' => $item->visitors,
                    'views' => $item->views,
                ];
            });

        $topArticles = \Illuminate\Support\Facades\DB::table('page_views')
            ->selectRaw('article_id, COUNT(id) as views')
            ->whereNotNull('article_id')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('article_id')
            ->orderByDesc('views')
            ->limit(5)
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
            ];
        });

        return Inertia::render('Dashboard', [
            'initialBrief' => 'The AI Daily Brief will appear here.',
            'articles' => $articles,
            'analytics' => [
                'viewsPerDay' => $viewsPerDay,
                'topArticles' => $topArticlesWithData
            ]
        ]);
    }
}
