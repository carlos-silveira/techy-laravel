<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class NewsAgent
{
    private GeminiService $gemini;
    private NewsService $news;

    public function __construct(GeminiService $gemini, NewsService $news)
    {
        $this->gemini = $gemini;
        $this->news = $news;
    }

    /**
     * The core autonomous loop: Rank -> Choose -> Draft -> Critique -> Polished Publish.
     */
    public function runAutonomousCycle(int $limit = 1): array
    {
        Log::info("NewsAgent: Starting autonomous cycle (Limit: {$limit})");
        
        $results = [];

        // 1. RESEARCH
        $rawNews = $this->news->fetchTodayTechNews();
        if (empty($rawNews)) {
            return ['status' => 'error', 'message' => 'No news sourced.'];
        }

        // 2. RANK TRENDS (AI Intelligence)
        $rankedIdeas = $this->gemini->generateIdeas($rawNews);
        // We assume generateIdeas returns top 3 ranked by default
        
        $toProcess = array_slice($rankedIdeas, 0, $limit);

        foreach ($toProcess as $idea) {
            $results[] = $this->processArticle($idea, $rawNews);
            
            // Respect RPD limit and rate limits
            sleep(15); 
        }

        return $results;
    }

    private function processArticle(array $idea, array $contextNews): array
    {
        $title = $idea['title'];
        Log::info("NewsAgent: Processing '{$title}'");

        // 3. DRAFT
        try {
            $draft = $this->gemini->generateDraft($title, $idea['prompt'], $contextNews);
        } catch (\App\Exceptions\GenerationException $e) {
            Log::error("NewsAgent: Drafting failed for '{$title}': " . $e->getMessage());
            return ['title' => $title, 'status' => 'failed', 'reason' => 'Drafting failed: ' . $e->getMessage()];
        }

        // 4. CRITIQUE & POLISH
        // We use the new polishArticleHtml method for a second AI pass (Editorial Critique)
        $polishedHtml = $this->gemini->polishArticleHtml($draft['cuerpo_noticia']);
        
        // 5. METADATA & FINALIZE
        $meta = $this->gemini->generateArticleMeta($title, $polishedHtml);
        
        // 6. PUBLISH
        // Check for duplication before creating
        if (Article::where('title', 'like', '%' . $title . '%')
            ->where('created_at', '>', now()->subDays(2))
            ->exists()) {
            Log::warning("NewsAgent: Skipping duplicate topic '{$title}'");
            return ['title' => $title, 'status' => 'failed', 'reason' => 'Duplicate topic'];
        }

        $slug = Str::slug($title) . '-' . Str::random(6);
        $wordCount = str_word_count(strip_tags($polishedHtml));

        // Attempt image fetch (YOLO Mode)
        $imageQuery = $meta['tags'][0] ?? $title;
        $coverImage = $this->fetchCoverImageFallback($imageQuery);

        $article = Article::create([
            'title' => $title,
            'slug' => $slug,
            'content' => $polishedHtml,
            'status' => 'published',
            'is_editors_choice' => true,
            'reading_time_minutes' => max(1, (int) ceil($wordCount / 200)),
            'ai_summary' => $meta['summary'] ?? Str::limit(strip_tags($polishedHtml), 200),
            'meta_description' => $meta['meta_description'] ?? Str::limit(strip_tags($polishedHtml), 160),
            'seo_keywords' => $meta['seo_keywords'] ?? '',
            'tags' => $meta['tags'] ?? [],
            'cover_image_path' => $coverImage,
        ]);

        // --- SYNCHRONOUS TRANSLATIONS FOR YOLO MODE ---
        $languages = ['es', 'pt'];
        $translations = [];
        foreach ($languages as $lang) {
            Log::info("NewsAgent: Translating '{$title}' to " . strtoupper($lang));
            sleep(12); // Respect RPM + Buffer
            try {
                $translations[$lang] = $this->gemini->translateArticle($title, (string)$article->ai_summary, $polishedHtml, $lang);
            } catch (\Exception $e) {
                Log::error("NewsAgent: Translation to {$lang} failed: " . $e->getMessage());
            }
        }

        if (!empty($translations)) {
            $article->update(['translations' => $translations]);
        }

        return [
            'title' => $title,
            'status' => 'published',
            'id' => $article->id,
            'slug' => $article->slug
        ];
    /**
     * Fetch a copyright-free cover image from Unsplash or Wikimedia Commons fallback.
     */
    private function fetchCoverImageFallback(string $query): ?string
    {
        $accessKey = config('services.unsplash.access_key');
        if (!empty($accessKey)) {
            try {
                $response = \Illuminate\Support\Facades\Http::withHeaders([
                    'Authorization' => "Client-ID {$accessKey}",
                ])->get('https://api.unsplash.com/search/photos', [
                    'query' => $query,
                    'per_page' => 1,
                    'orientation' => 'landscape',
                ]);

                if ($response->successful()) {
                    $results = $response->json()['results'] ?? [];
                    if (!empty($results)) {
                        return $results[0]['urls']['regular'] ?? null;
                    }
                }
            } catch (\Exception $e) {
                Log::warning('Unsplash API error in NewsAgent: ' . $e->getMessage());
            }
        }

        // Wikimedia fallback
        try {
            $response = \Illuminate\Support\Facades\Http::get('https://commons.wikimedia.org/w/api.php', [
                'action' => 'query',
                'generator' => 'search',
                'gsrsearch' => "filetype:bitmap " . $query,
                'gsrnamespace' => 6,
                'gsrlimit' => 1,
                'prop' => 'imageinfo',
                'iiprop' => 'url',
                'format' => 'json'
            ]);

            if ($response->successful()) {
                $pages = $response->json()['query']['pages'] ?? [];
                if (!empty($pages)) {
                    $firstPage = reset($pages);
                    return $firstPage['imageinfo'][0]['url'] ?? null;
                }
            }
        } catch (\Exception $e) {
             Log::warning('Wikimedia API error in NewsAgent: ' . $e->getMessage());
        }

        return null;
    }
}

