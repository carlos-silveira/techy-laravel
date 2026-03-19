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

class PublicController extends Controller
{
    private GeminiService $geminiService;

    public function __construct(GeminiService $geminiService)
    {
        $this->geminiService = $geminiService;
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
                ->take(3)
                ->get();

            return $articles->map(fn($a) => $this->translateIfNecessary($a, $locale));
        });

        $articles = Cache::remember("homepage_articles_{$locale}", 3600, function () use ($locale) {
            $articles = Article::where('status', 'published')
                ->where('is_editors_choice', false)
                ->orderBy('created_at', 'desc')
                ->get();

            return $articles->map(fn($a) => $this->translateIfNecessary($a, $locale));
        });

        $dailyBrief = Cache::remember("homepage_daily_brief_{$locale}", 3600, function () {
            $latestArticle = Article::where('status', 'published')
                ->orderBy('created_at', 'desc')
                ->first();
            return $latestArticle?->ai_summary ?? "The rapid evolution of artificial intelligence frameworks...";
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
    private function translateIfNecessary(Article $article, string $locale): Article
    {
        // 1. If requested language is English and article is already in English, return it.
        // 2. If requested language matches article source language, return it.
        if ($article->language === $locale || ($locale === 'en' && $article->language === 'en')) {
            // Even if we match, we might want to pre-translate the OTHER mandatory language (ES/EN)
            $this->preTranslateMandatoryLocales($article);
            return $article;
        }

        $translations = $article->translations ?? [];

        if (isset($translations[$locale])) {
            $article->title = $translations[$locale]['title'];
            $article->ai_summary = $translations[$locale]['summary'];
            $article->content = $translations[$locale]['content'];
            
            // Ensure the OTHER mandatory language is also being prepared
            $this->preTranslateMandatoryLocales($article);
            
            return $article;
        }

        // Trigger AI translation for the current request
        $article = $this->performTranslation($article, $locale);
        
        // Ensure both ES and EN are cached
        $this->preTranslateMandatoryLocales($article);

        return $article;
    }

    /**
     * Pre-translate into mandatory languages (EN and ES) to minimize future Gemini calls.
     */
    private function preTranslateMandatoryLocales(Article $article): void
    {
        $mandatoryLocales = ['en', 'es'];
        foreach ($mandatoryLocales as $mandatoryLocale) {
            if ($article->language !== $mandatoryLocale && !isset(($article->translations ?? [])[$mandatoryLocale])) {
                // Pre-translate this language
                // Note: In a real environment with high traffic, this should be a background Job.
                // We'll perform it now to satisfy the "always cache" requirement.
                $this->performTranslation($article, $mandatoryLocale);
            }
        }
    }

    /**
     * Perform the actual Gemini translation and save it.
     */
    private function performTranslation(Article $article, string $locale): Article
    {
        try {
            // Skip if it's already translated
            $translations = $article->translations ?? [];
            if (isset($translations[$locale])) {
                return $article;
            }

            // Also skip if it's the original language
            if ($article->language === $locale) {
                return $article;
            }

            $result = $this->geminiService->translateArticle(
                $article->title,
                $article->ai_summary ?? '',
                $article->content ?? '',
                $locale
            );

            // Save to DB for future use
            $translations[$locale] = $result;
            $article->update(['translations' => $translations]);

            // Apply to current instance
            $article->title = $result['title'];
            $article->ai_summary = $result['summary'];
            $article->content = $result['content'];
        } catch (\Exception $e) {
            \Log::error("Translation failed for article {$article->id} to {$locale}: " . $e->getMessage());
        }

        return $article;
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
