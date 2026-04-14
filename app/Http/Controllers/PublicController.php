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

        // --- Cache helpers with smart TTL ---
        // When locale != 'en' and translations aren't ready yet, translateIfNecessary()
        // falls back to English and dispatches a background job for future requests.
        // We detect whether any article is still untranslated and use a short TTL (30s)
        // so the page retries soon after the background job completes.
        // Once all articles are translated, the full 3600s TTL is used.

        $editorsChoice = $this->rememberLocaleAware(
            "homepage_editors_choice_{$locale}",
            $locale,
            function () use ($locale) {
                return Article::where('status', 'published')
                    ->where('is_editors_choice', true)
                    ->orderBy('created_at', 'desc')
                    ->select('id', 'title', 'slug', 'ai_summary', 'updated_at', 'cover_image_path', 'language', 'translations', 'reading_time_minutes', 'tags')
                    ->take(3)
                    ->get();
            }
        );

        $articles = $this->rememberLocaleAware(
            "homepage_articles_{$locale}",
            $locale,
            function () use ($locale) {
                return Article::where('status', 'published')
                    ->orderBy('created_at', 'desc')
                    ->select('id', 'title', 'slug', 'ai_summary', 'updated_at', 'cover_image_path', 'language', 'translations', 'reading_time_minutes', 'tags')
                    ->take(10)
                    ->get();
            }
        );

        $trendingArticles = $this->rememberLocaleAware(
            "homepage_trending_{$locale}",
            $locale,
            function () use ($locale) {
                $ids = \Illuminate\Support\Facades\DB::table('page_views')
                    ->where('created_at', '>=', now()->subDays(7))
                    ->whereNotNull('article_id')
                    ->select('article_id', \Illuminate\Support\Facades\DB::raw('count(*) as total_views'))
                    ->groupBy('article_id')
                    ->orderByDesc('total_views')
                    ->limit(5)
                    ->pluck('article_id');

                if ($ids->isEmpty()) {
                    $articles = Article::where('status', 'published')->orderByDesc('created_at')->limit(5)->get();
                } else {
                    $articles = Article::whereIn('id', $ids)
                        ->where('status', 'published')
                        ->get()
                        ->sortBy(fn($a) => array_search($a->id, $ids->toArray()));
                }

                if ($articles->isEmpty()) {
                    $articles = Article::where('status', 'published')->latest()->limit(5)->get();
                }

                return $articles;
            }
        );

        return Inertia::render('Welcome', [
            'editorsChoice' => $editorsChoice,
            'articles' => $articles,
            'trendingArticles' => $trendingArticles,
            'dailyBrief' => $this->getDailyBrief($locale),
        ]);
    }

    /**
     * Cache article collections with locale-aware TTL.
     *
     * If locale != 'en' and any article has no stored translation yet,
     * cache only for 30 seconds so the user gets translated content quickly
     * after the TranslateArticle background job finishes.
     * Once all articles are translated, the full 3600s TTL kicks in.
     */
    private function rememberLocaleAware(string $key, string $locale, callable $query): \Illuminate\Support\Collection
    {
        // For English, always use long cache
        if ($locale === 'en') {
            return Cache::remember($key, 3600, function () use ($query, $locale) {
                return $query()->map(fn($a) => $this->translateIfNecessary($a, $locale));
            });
        }

        // For non-English locales, check if cache already has fully-translated content
        if (Cache::has($key)) {
            return Cache::get($key);
        }

        // Fetch raw articles and apply translation
        $rawArticles = $query();
        $allTranslated = true;
        $translated = $rawArticles->map(function ($article) use ($locale, &$allTranslated) {
            $hasTranslation = !empty($article->translations[$locale]['title']);
            if (!$hasTranslation) {
                $allTranslated = false;
            }
            return $this->translateIfNecessary($article, $locale);
        });

        // Use a short TTL if any article fell back to English
        $ttl = $allTranslated ? 3600 : 30;
        Cache::put($key, $translated, $ttl);

        return $translated;
    }

    /**
     * Reusable logic to get the cached daily briefing or generate a dynamic fallback.
     */
    public function getDailyBrief(string $locale): string
    {
        $restingMessage = "The intelligence pipeline is resting. Check back later for the latest tech signals.";
        $brief = Cache::get("homepage_daily_brief_{$locale}");

        if (empty($brief) || $brief === $restingMessage) {
            $latest = Article::where('status', 'published')->latest()->take(3)->get();
            if ($latest->count() > 0) {
                $signalLabel = $locale === 'es' ? 'Señales de Última Hora' : ($locale === 'pt' ? 'Sinais de Última Hora' : 'Breaking Signals');
                $brief = "<p><strong>⚡ {$signalLabel}:</strong></p><ul>";
                foreach ($latest as $a) {
                    $translated = $this->translateIfNecessary($a, $locale);
                    $brief .= "<li><a href='/article/{$translated->slug}' class='text-primary-400 hover:text-primary-300 transition-colors'>{$translated->title}</a></li>";
                }
                $brief .= "</ul>";
            } else {
                $brief = $restingMessage;
            }
        }

        return $brief;
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

        $article->content = $this->sanitizeHtml($article->content);

        return Inertia::render('ArticleShow', [
            'article' => $article,
            'relatedArticles' => $relatedArticles
        ]);
    }

    /**
     * Server-side HTML sanitization to prevent XSS.
     * Allows only safe tags and removes dangerous attributes like onclick/onerror.
     */
    private function sanitizeHtml(mixed $content): mixed
    {
        if (!is_string($content)) return $content;

        // Whitelist of safe HTML tags
        $allowedTags = '<div><p><a><br><h1><h2><h3><h4><h5><h6><ul><li><ol><strong><em><code><pre><img><section><article><blockquote>';
        
        // Strip unknown tags
        $content = strip_tags($content, $allowedTags);

        // Remove dangerous attributes (on*, javascript:, etc) using regex
        $content = preg_replace('/on\w+="[^"]*"/i', '', $content);
        $content = preg_replace('/on\w+=\'[^\']*\'/i', '', $content);
        $content = preg_replace('/javascript:[^"]*/i', '', $content);

        return $content;
    }

    /**
     * Helper to translate an article if the requested locale differs from source.
     * Falls back to the original English content and dispatches a background
     * translation job if the requested locale's translation is not yet available.
     */
    public function translateIfNecessary(Article $article, string $locale): Article
    {
        // 1. If English is requested or article is already in the target locale, return as-is.
        if ($locale === 'en' || $article->language === $locale) {
            return $article;
        }

        $translations = $article->translations ?? [];

        // 2. If a full translation (title + content) exists, apply it.
        if (!empty($translations[$locale]['title']) && !empty($translations[$locale]['content'])) {
            $article->title      = $translations[$locale]['title'];
            $article->ai_summary = $translations[$locale]['summary'] ?? $article->ai_summary;
            $article->content    = $translations[$locale]['content'];
            return $article;
        }

        // 3. No translation available yet — dispatch background job and return original.
        // The rememberLocaleAware() method will cache this with a 30s TTL so it retries soon.
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
