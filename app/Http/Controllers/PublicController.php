<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\App;
use App\Services\GeminiService;
use App\Services\NewsService;

class PublicController extends Controller
{
    private GeminiService $geminiService;
    private NewsService $newsService;

    public function __construct(GeminiService $geminiService, NewsService $newsService)
    {
        $this->geminiService = $geminiService;
        $this->newsService = $newsService;
    }

    /**
     * Display the public homepage.
     */
    public function index()
    {
        $locale = App::getLocale();

        $editorsChoice = Cache::remember("homepage_editors_choice_{$locale}", 3600, function () use ($locale) {
            $articles = Article::where('status', 'published')
                ->where('is_editors_choice', true)
                ->orderBy('created_at', 'desc')
                ->select('id', 'title', 'slug', 'ai_summary', 'updated_at', 'cover_image_path', 'language', 'translations', 'reading_time_minutes', 'tags')
                ->take(3)
                ->get();

            return $articles->map(fn($a) => $this->translateIfNecessary($a, $locale));
        });

        $articles = Cache::remember("homepage_articles_{$locale}", 3600, function () use ($locale) {
            $articles = Article::where('status', 'published')
                ->orderBy('created_at', 'desc')
                ->select('id', 'title', 'slug', 'ai_summary', 'updated_at', 'cover_image_path', 'language', 'translations', 'reading_time_minutes', 'tags')
                ->take(10)
                ->get();

            return $articles->map(fn($a) => $this->translateIfNecessary($a, $locale));
        });

        $restingMessage = "The intelligence pipeline is resting. Check back later for the latest tech signals.";
        $dailyBrief = Cache::get("homepage_daily_brief_{$locale}");

        // If cache failed or is empty, dynamically build a fallback brief to prevent an empty site
        if (empty($dailyBrief) || $dailyBrief === $restingMessage) {
            if ($articles->count() > 0) {
                $dailyBrief = "<p><strong>⚡ Breaking Signals:</strong></p><ul>";
                foreach ($articles->take(3) as $a) {
                    $dailyBrief .= "<li><a href='/article/{$a->slug}' class='text-primary-400 hover:text-primary-300 transition-colors'>{$a->title}</a></li>";
                }
                $dailyBrief .= "</ul>";
            } else {
                $dailyBrief = $restingMessage;
            }
        }

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
        $locale = App::getLocale();

        $article = Article::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $article = $this->translateIfNecessary($article, $locale);

        // Increment views_count for analytics (bypassing cache for this write)
        Article::where('id', $article->id)->increment('views_count');

        $relatedArticles = Cache::remember("article_{$slug}_related_{$locale}", 3600, function () use ($article, $locale) {
            $related = Article::where('status', 'published')
                ->where('id', '!=', $article->id)
                ->orderBy('created_at', 'desc')
                ->take(3)
                ->select('id', 'title', 'slug', 'updated_at', 'cover_image_path', 'ai_summary', 'language', 'translations')
                ->get();

            return $related->map(fn($a) => $this->translateIfNecessary($a, $locale));
        });

        return Inertia::render('ArticleShow', [
            'article' => $article,
            'relatedArticles' => $relatedArticles
        ]);
    }

    /**
     * Helper to translate an article if the requested locale differs from source.
     */
    public function translateIfNecessary(Article $article, string $locale): Article
    {
        // 1. If matches source language, return it.
        if ($article->language === $locale || ($locale === 'en' && $article->language === 'en')) {
            return $article;
        }

        $translations = $article->translations ?? [];

        // 2. If translation exists in cache, return it.
        if (isset($translations[$locale])) {
            $article->title = $translations[$locale]['title'];
            $article->ai_summary = $translations[$locale]['summary'];
            $article->content = $translations[$locale]['content'];
            return $article;
        }

        // 3. Trigger background translation for the future, but return original for now (non-blocking)
        \App\Jobs\TranslateArticle::dispatch($article, $locale);

        return $article;
    }

    /**
     * Recursively JSON-decode a string to handle double-encoding from AI models.
     */
    private function recursivelyUnwrap(mixed $value): mixed
    {
        if (!is_string($value)) {
            return $value;
        }

        $decoded = json_decode($value, true);
        if (json_last_error() === JSON_ERROR_NONE && (is_array($decoded) || is_string($decoded))) {
            return $this->recursivelyUnwrap($decoded);
        }

        // Clean up escaped slashes and wrapping quotes that might remain
        $value = stripslashes($value);
        return trim($value, '"');
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
