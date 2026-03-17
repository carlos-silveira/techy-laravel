<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class ArchiveController extends Controller
{
    /**
     * Display a paginated list of all published articles.
     */
    public function index(Request $request)
    {
        $tag = $request->input('tag', '');
        $page = $request->input('page', 1);
        $cacheKey = "archive_articles_tag_{$tag}_page_{$page}";

        $articles = Cache::remember($cacheKey, 3600, function () use ($request) {
            $query = Article::where('status', 'published')->latest();
            if ($request->has('tag') && $request->input('tag') !== '') {
                // SQLite compatible workaround for checking JSON arrays
                $query->where('tags', 'like', '%"' . $request->input('tag') . '"%');
            }
            return $query->paginate(12)->withQueryString();
        });

        // Fetch top tags for the UI
        $popularTags = Cache::remember('archive_popular_tags', 3600, function () {
            return Article::where('status', 'published')
                ->whereNotNull('tags')
                ->pluck('tags')
                ->flatten()
                ->countBy()
                ->sortDesc()
                ->take(15)
                ->keys();
        });

        if ($request->wantsJson()) {
            return response()->json($articles);
        }

        return Inertia::render('Archive', [
            'articles' => $articles,
            'currentTag' => $request->input('tag'),
            'popularTags' => $popularTags,
        ]);
    }
}
