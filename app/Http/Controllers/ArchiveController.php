<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\App;

class ArchiveController extends Controller
{
    private PublicController $publicController;

    public function __construct(PublicController $publicController)
    {
        $this->publicController = $publicController;
    }

    /**
     * Display a paginated list of all published articles.
     */
    public function index(Request $request)
    {
        $locale = App::getLocale();
        $tag = $request->input('tag', '');
        $page = $request->input('page', 1);
        $cacheKey = "archive_articles_{$locale}_tag_{$tag}_page_{$page}";

        $articles = Cache::remember($cacheKey, 3600, function () use ($request, $locale) {
            $query = Article::where('status', 'published')
                ->latest()
                ->select('id', 'title', 'slug', 'ai_summary', 'updated_at', 'cover_image_path', 'language', 'translations', 'tags');

            if ($request->has('tag') && $request->input('tag') !== '') {
                $query->where('tags', 'like', '%"' . $request->input('tag') . '"%');
            }

            $paginator = $query->paginate(12)->withQueryString();
            
            // Translate each article in the collection
            $paginator->getCollection()->transform(function ($article) use ($locale) {
                return $this->publicController->translateIfNecessary($article, $locale);
            });

            return $paginator;
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
