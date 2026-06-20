<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\App;
use Carbon\Carbon;

class NewsletterArchiveController extends Controller
{
    private PublicController $publicController;

    public function __construct(PublicController $publicController)
    {
        $this->publicController = $publicController;
    }

    /**
     * Display the newsletter archive grouped by week.
     */
    public function index(Request $request)
    {
        $locale = App::getLocale();
        $cacheKey = "newsletter_archive_{$locale}";

        $newsletters = Cache::remember($cacheKey, 3600, function () use ($locale) {
            // Fetch published articles from the last 12 weeks
            $startDate = now()->subWeeks(12)->startOfWeek();
            
            $articles = Article::where('status', 'published')
                ->where('created_at', '>=', $startDate)
                ->orderBy('created_at', 'desc')
                ->select('id', 'title', 'slug', 'ai_summary', 'created_at', 'cover_image_path', 'language', 'translations', 'tags', 'views_count', 'is_editors_choice', 'content')
                ->get();
                
            // Group by week (e.g., "Week of Jun 12, 2026")
            $grouped = $articles->groupBy(function($article) {
                return $article->created_at->startOfWeek()->format('M j, Y');
            });
            
            $results = [];
            
            foreach ($grouped as $week => $weekArticles) {
                // Get top 5 articles for this week
                $topArticles = $weekArticles->sortByDesc(function($a) {
                    return ($a->is_editors_choice ? 1000 : 0) + $a->views_count;
                })->take(5)->values();
                
                // Translate
                $topArticles->transform(function ($article) use ($locale) {
                    return $this->publicController->translateIfNecessary($article, $locale);
                });
                
                $results[] = [
                    'week' => $week,
                    'articles' => $topArticles
                ];
            }
            
            return $results;
        });

        return Inertia::render('NewsletterArchive', [
            'newsletters' => $newsletters,
            'dailyBrief' => $this->publicController->getDailyBrief($locale),
        ]);
    }
}
