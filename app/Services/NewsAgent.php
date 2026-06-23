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

        // 2. FETCH RECENT PUBLISHED TITLES (last 7 days) so the AI knows what already exists
        $recentTitles = Article::where('status', 'published')
            ->where('created_at', '>', now()->subDays(7))
            ->pluck('title')
            ->toArray();

        // 3. RANK TRENDS (AI Intelligence) — pass recent titles so AI avoids duplicates at source
        $rankedIdeas = $this->gemini->generateIdeas($rawNews, $recentTitles);

        // 4. LAYER 2: Keyword-based deduplication filter before spending API quota on drafting
        $filteredIdeas = $this->filterDuplicateIdeas($rankedIdeas, $recentTitles);
        Log::info("NewsAgent: {$this->count($rankedIdeas)} ideas ranked, {$this->count($filteredIdeas)} passed dedup filter.");

        $toProcess = array_slice($filteredIdeas, 0, $limit);

        foreach ($toProcess as $idea) {
            $results[] = $this->processArticle($idea, $rawNews);
            
            // Respect RPD limit and rate limits
            sleep(15); 
        }

        return $results;
    }

    /**
     * Count helper (avoids count() type error on non-countable).
     */
    private function count(mixed $arr): int
    {
        return is_array($arr) ? count($arr) : 0;
    }

    /**
     * LAYER 2 DEDUP: Filter AI-generated ideas against recently published titles.
     * Uses keyword overlap — removes any idea that shares 60%+ meaningful keywords
     * with a recently published article title.
     */
    private function filterDuplicateIdeas(array $ideas, array $recentTitles): array
    {
        $stopWords = ['the','a','an','in','of','to','for','and','or','is','are','was',
                      'that','with','on','at','by','as','it','its','amid','new','over',
                      'after','into','about','how','what','why','says','say','us','ai'];

        $normalize = fn(string $title): array => array_values(array_diff(
            array_filter(explode(' ', preg_replace('/[^a-z0-9 ]/', '', strtolower($title)))),
            $stopWords
        ));

        $recentKeywordSets = array_map($normalize, $recentTitles);

        return array_values(array_filter($ideas, function (array $idea) use ($normalize, $recentKeywordSets) {
            $ideaWords = $normalize($idea['title']);
            if (empty($ideaWords)) return true;

            foreach ($recentKeywordSets as $existingWords) {
                if (empty($existingWords)) continue;
                $overlap = count(array_intersect($ideaWords, $existingWords));
                $minLen  = min(count($ideaWords), count($existingWords));
                if ($minLen > 0 && ($overlap / $minLen) >= 0.60) {
                    Log::info("NewsAgent dedup: Skipping idea '{$idea['title']}' (" .
                        round(($overlap / $minLen) * 100) . "% overlap with existing article)");
                    return false;
                }
            }
            return true;
        }));
    }


    /**
     * Scout the internet for news and store ideas in the scouted_articles table.
     * Does NOT generate the full articles. Leaves them pending for human approval.
     */
    public function scoutOnly(int $limit = 5): array
    {
        Log::info("NewsAgent: Starting scout cycle (Limit: {$limit})");
        
        $results = [];

        // 1. RESEARCH
        $rawNews = $this->news->fetchTodayTechNews();
        if (empty($rawNews)) {
            return ['status' => 'error', 'message' => 'No news sourced.'];
        }

        // 2. Fetch recent titles for AI context + local dedup
        $recentTitles = Article::where('status', 'published')
            ->where('created_at', '>', now()->subDays(7))
            ->pluck('title')
            ->toArray();

        // 3. RANK TRENDS (AI Intelligence) — aware of existing articles
        $rankedIdeas = $this->gemini->generateIdeas($rawNews, $recentTitles);

        // 4. LAYER 2: Pre-filter by keyword overlap before storing
        $filteredIdeas = $this->filterDuplicateIdeas($rankedIdeas, $recentTitles);

        $toProcess = array_slice($filteredIdeas, 0, $limit);

        foreach ($toProcess as $idea) {
            $normalizedTitle = Str::slug($idea['title']);
            
            // Check for duplicate in live articles (slug-based)
            $existsLive = Article::where('slug', 'like', $normalizedTitle . '%')
                ->where('created_at', '>', now()->subDays(7))
                ->exists();
                
            // Check for duplicate in scouted queue
            $existsScouted = \App\Models\ScoutedArticle::where('title', $idea['title'])
                ->where('created_at', '>', now()->subDays(2))
                ->exists();

            if ($existsLive || $existsScouted) {
                Log::warning("NewsAgent: Skipping duplicate topic '{$idea['title']}'");
                continue;
            }

            // Store in Queue
            $scouted = \App\Models\ScoutedArticle::create([
                'title'  => $idea['title'],
                'url'    => $idea['source_url'] ?? null,
                'source' => 'AI Aggregator',
                'prompt' => $idea['prompt'],
                'status' => 'pending',
            ]);

            Log::info("NewsAgent: Scouted idea #{$scouted->id} -> {$idea['title']}");
            $results[] = [
                'id'     => $scouted->id,
                'title'  => $scouted->title,
                'status' => 'scouted',
            ];
        }

        return $results;
    }

    /**
     * Given a scouted article ID, generate the full article, publish it, and queue translations.
     */
    public function generateFromScouted(int $scoutedId): array
    {
        $scouted = \App\Models\ScoutedArticle::findOrFail($scoutedId);
        $title = $scouted->title;
        
        Log::info("NewsAgent: Starting generation for approved idea '{$title}'");
        
        $scouted->update(['status' => 'generating']);

        // Context (Ideally we should store rawNews context in DB, but fetching fresh context is also fine)
        $rawNews = $this->news->fetchTodayTechNews();
        $contextNews = array_slice($rawNews, 0, 5); // Just a quick fresh context

        try {
            // 1. DRAFT
            $draft = $this->gemini->generateDraft($title, $scouted->prompt, $contextNews);
            
            // 2. CRITIQUE & POLISH
            $polishedHtml = $this->gemini->polishArticleHtml($draft['article_body'] ?? '');
            $polishedHtml = $this->resolveImagePlaceholders($polishedHtml, $title);
            
            // 3. METADATA & FINALIZE
            $meta = $this->gemini->generateArticleMeta($title, $polishedHtml);

            // 4. PUBLISH
            $normalizedTitle = Str::slug($title);
            $slug = $normalizedTitle . '-' . Str::random(6);
            $wordCount = str_word_count(strip_tags($polishedHtml));

            $imageQuery = $draft['suggested_image'] ?? ($meta['tags'][0] ?? $title);
            $coverImage = $this->fetchCoverImageFallback(Str::limit($imageQuery, 50));
            if (empty($coverImage)) {
                $coverImage = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80';
            }

            $article = Article::create([
                'title' => $title,
                'slug' => $slug,
                'content' => $polishedHtml,
                'language' => 'en',
                'status' => 'published',
                'is_editors_choice' => true,
                'reading_time_minutes' => max(1, (int) ceil($wordCount / 200)),
                'ai_summary' => $meta['summary'] ?? Str::limit(strip_tags($polishedHtml), 250),
                'meta_description' => $meta['meta_description'] ?? Str::limit(strip_tags($polishedHtml), 155),
                'seo_keywords' => $meta['seo_keywords'] ?? '',
                'tags' => $meta['tags'] ?? [],
                'cover_image_path' => $coverImage,
            ]);

            // 5. UPDATE QUEUE STATUS
            $scouted->update([
                'status' => 'published',
                'article_id' => $article->id,
                'error_log' => null
            ]);

            // 6. QUEUE TRANSLATIONS ASYNC INSTEAD OF BLOCKING
            $languages = ['es', 'pt'];
            foreach ($languages as $lang) {
                // Dispatch isolated jobs via queue
                \App\Jobs\TranslateArticle::dispatch($article, $lang)->delay(now()->addSeconds(10));
            }

            return ['status' => 'success', 'article_id' => $article->id];

        } catch (\Exception $e) {
            Log::error("NewsAgent: Generation failed for '{$title}': " . $e->getMessage());
            $scouted->update([
                'status' => 'failed',
                'error_log' => $e->getMessage()
            ]);
            return ['status' => 'failed', 'reason' => $e->getMessage()];
        }
    }

    private function processArticle(array $idea, array $contextNews): array
    {
        $title = $idea['title'];
        $sourceUrl = $idea['source_url'] ?? null;
        Log::info("NewsAgent: Processing '{$title}'");

        // 2b. Exact source_url match (prevents drafting entirely if we already covered this exact URL)
        if (!empty($sourceUrl)) {
            if (Article::where('source_url', $sourceUrl)->exists()) {
                Log::warning("NewsAgent [L2.5-url]: Skipping duplicate topic '{$title}' (Exact source_url exists)");
                return ['title' => $title, 'status' => 'failed', 'reason' => 'Duplicate topic (source_url match)'];
            }
        }

        // 3. DRAFT
        try {
            $draft = $this->gemini->generateDraft($title, $idea['prompt'], $contextNews);
        } catch (\App\Exceptions\GenerationException $e) {
            Log::error("NewsAgent: Drafting failed for '{$title}': " . $e->getMessage());
            return ['title' => $title, 'status' => 'failed', 'reason' => 'Drafting failed: ' . $e->getMessage()];
        }

        // 4. CRITIQUE & POLISH
        // We use the new polishArticleHtml method for a second AI pass (Editorial Critique)
        $polishedHtml = $this->gemini->polishArticleHtml($draft['article_body'] ?? '');
        $polishedHtml = $this->resolveImagePlaceholders($polishedHtml, $title);
        
        // 5. METADATA & FINALIZE
        $meta = $this->gemini->generateArticleMeta($title, $polishedHtml);
        
        // 6. PUBLISH — LAYER 3 DEDUP GUARD (last line of defense before DB write)
        $normalizedTitle = Str::slug($title);

        // 6a. Exact slug match (fast)
        if (Article::where('slug', 'like', $normalizedTitle . '%')
            ->where('created_at', '>', now()->subDays(7))
            ->exists()) {
            Log::warning("NewsAgent [L3-slug]: Skipping duplicate topic '{$title}'");
            return ['title' => $title, 'status' => 'failed', 'reason' => 'Duplicate topic (slug match)'];
        }

        // 6b. Keyword overlap against all recent titles (catches same story, different title)
        $stopWords = ['the','a','an','in','of','to','for','and','or','is','are','was','that',
                      'with','on','at','by','as','it','its','amid','new','over','after','into',
                      'about','how','what','why','says','say','us','ai'];
        $normalize = fn(string $t): array => array_values(array_diff(
            array_filter(explode(' ', preg_replace('/[^a-z0-9 ]/', '', strtolower($t)))),
            $stopWords
        ));
        $ideaWords = $normalize($title);

        $recentArticles = Article::where('status', 'published')
            ->where('created_at', '>', now()->subDays(7))
            ->pluck('title')
            ->toArray();

        foreach ($recentArticles as $existingTitle) {
            $existingWords = $normalize($existingTitle);
            if (empty($existingWords) || empty($ideaWords)) continue;
            $overlap = count(array_intersect($ideaWords, $existingWords));
            $minLen  = min(count($ideaWords), count($existingWords));
            if ($minLen > 0 && ($overlap / $minLen) >= 0.60) {
                Log::warning("NewsAgent [L3-fuzzy]: Skipping '{$title}' — " .
                    round(($overlap / $minLen) * 100) . "% keyword overlap with '{$existingTitle}'");
                return ['title' => $title, 'status' => 'failed', 'reason' => 'Duplicate topic (keyword overlap)'];
            }
        }

        $slug = $normalizedTitle . '-' . Str::random(6);
        $wordCount = str_word_count(strip_tags($polishedHtml));

        // Attempt image fetch with improved query from meta if available
        $imageQuery = $draft['suggested_image'] ?? ($meta['tags'][0] ?? $title);
        $cleanQuery = trim(Str::limit($imageQuery, 30)) . ' technology';
        $coverImage = $this->fetchCoverImageFallback($cleanQuery);
        if (empty($coverImage)) {
            $coverImage = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80';
        }

        $article = Article::create([
            'title' => $title,
            'slug' => $slug,
            'content' => $polishedHtml,
            'source_url' => $sourceUrl,
            'language' => 'en',
            'status' => 'published',
            'is_editors_choice' => true,
            'reading_time_minutes' => max(1, (int) ceil($wordCount / 200)),
            'ai_summary' => $meta['summary'] ?? Str::limit(strip_tags($polishedHtml), 250),
            'meta_description' => $meta['meta_description'] ?? Str::limit(strip_tags($polishedHtml), 155),
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
    }

    /**
     * Resolve <img src="PLACEHOLDER_IMAGE" alt="..."> tags by fetching relative images from Unsplash.
     */
    public function resolveImagePlaceholders(string $content, string $fallbackQuery): string
    {
        $pattern = '/<img\s+[^>]*src=["\']PLACEHOLDER_IMAGE["\'][^>]*alt=["\']([^"\']*)["\'][^>]*>|<img\s+[^>]*alt=["\']([^"\']*)["\'][^>]*src=["\']PLACEHOLDER_IMAGE["\'][^>]*>/i';
        
        return preg_replace_callback($pattern, function ($matches) use ($fallbackQuery) {
            $alt = !empty($matches[1]) ? $matches[1] : (!empty($matches[2]) ? $matches[2] : '');
            $alt = trim($alt);
            if (empty($alt)) {
                $alt = $fallbackQuery;
            }
            
            Log::info("NewsAgent: Resolving inline placeholder image for: {$alt}");
            sleep(2); 
            
            $url = $this->fetchCoverImageFallback(Str::limit($alt, 50));
            $fallbackUrl = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80';
            
            return '<img src="' . ($url ?? $fallbackUrl) . '" alt="' . e($alt) . '" class="w-full h-auto rounded-xl my-6 shadow-md object-cover max-h-[450px]">';
        }, $content);
    }

    /**
     * Fetch a copyright-free cover image from Unsplash or Wikimedia Commons fallback.
     */
    public function fetchCoverImageFallback(string $query): ?string
    {
        $accessKey = config('services.unsplash.access_key');
        if (!empty($accessKey)) {
            try {
                $response = \Illuminate\Support\Facades\Http::withHeaders([
                    'Authorization' => "Client-ID {$accessKey}",
                ])->get('https://api.unsplash.com/photos/random', [
                    'query' => $query,
                    'orientation' => 'landscape',
                ]);

                if ($response->successful()) {
                    $result = $response->json();
                    if (!empty($result['urls']['regular'])) {
                        return $result['urls']['regular'];
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

