<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class PublicController extends Controller
{
    /**
     * Display the public homepage.
     */
    public function index()
    {
        $editorsChoice = Cache::remember('homepage_editors_choice', 3600, function () {
            return Article::where('status', 'published')
                ->where('is_editors_choice', true)
                ->orderBy('created_at', 'desc')
                ->take(3)
                ->get();
        });

        $articles = Cache::remember('homepage_articles', 3600, function () {
            return Article::where('status', 'published')
                ->where('is_editors_choice', false)
                ->orderBy('created_at', 'desc')
                ->get();
        });

        $dailyBrief = Cache::remember('homepage_daily_brief', 3600, function () {
            return "The rapid evolution of artificial intelligence frameworks...";
        });

        return Inertia::render('Welcome', [
            'editorsChoice' => $editorsChoice,
            'articles' => $articles,
            'dailyBrief' => $dailyBrief,
        ]);
    }

    /**
     * Display a specific published article.
     */
    public function show(string $slug)
    {
        $article = Cache::remember("article_{$slug}", 3600, function () use ($slug) {
            return Article::where('slug', $slug)
                ->where('status', 'published')
                ->firstOrFail();
        });

        // Increment views_count for analytics (bypassing cache for this write)
        Article::where('id', $article->id)->increment('views_count');

        $relatedArticles = Cache::remember("article_{$slug}_related", 3600, function () use ($article) {
            return Article::where('status', 'published')
                ->where('id', '!=', $article->id)
                ->orderBy('created_at', 'desc')
                ->take(3)
                ->select('id', 'title', 'slug', 'updated_at', 'cover_image_path', 'ai_summary')
                ->get();
        });

        return Inertia::render('ArticleShow', [
            'article' => $article,
            'relatedArticles' => $relatedArticles
        ]);
    }

    /**
     * Search API for Cmd+K floating palette.
     */
    public function search(Request $request)
    {
        $query = $request->input('q');

        if (!$query || strlen($query) < 2) {
            return response()->json([]);
        }

        $results = Article::where('status', 'published')
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('ai_summary', 'like', "%{$query}%")
                    ->orWhere('tags', 'like', "%{$query}%");
            })
            ->select('id', 'title', 'slug', 'ai_summary', 'updated_at', 'cover_image_path')
            ->orderBy('updated_at', 'desc')
            ->limit(8)
            ->get();

        return response()->json($results);
    }
}
