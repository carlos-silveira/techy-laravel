<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\GeminiService;
use App\Services\NewsService;
use App\Models\Article;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GenerateDailyNews extends Command
{
    protected $signature = 'news:generate-daily';
    protected $description = 'Fetch trending tech news and generate a daily.dev-quality article via Gemini AI';

    public function handle(NewsService $newsService, GeminiService $geminiService)
    {
        $this->info('🔍 Fetching today\'s tech news from multiple sources...');
        $newsItems = $newsService->fetchTodayTechNews();

        if (empty($newsItems)) {
            $this->error('No news items found. Aborting.');
            return 1;
        }

        $this->info("📰 Found " . count($newsItems) . " news items.");

        $this->info('🧠 Asking Gemini for editorial angles...');
        $ideas = $geminiService->generateIdeas($newsItems);

        if (empty($ideas)) {
            $this->error('Gemini could not generate ideas.');
            return 1;
        }

        $selectedIdea = null;
        foreach ($ideas as $idea) {
            $existing = Article::where('title', 'like', '%' . $idea['title'] . '%')
                ->orWhere('slug', 'like', '%' . Str::slug($idea['title']) . '%')
                ->where('created_at', '>', now()->subDays(3))
                ->exists();

            if (!$existing) {
                $selectedIdea = $idea;
                break;
            }
            $this->warn("⏩ Skipping already published topic: {$idea['title']}");
        }

        if (!$selectedIdea) {
            $this->error('No unique news ideas available today. All generated topics were recently published.');
            return 0; // Exit gracefully but do nothing
        }

        $this->info("💡 Selected unique angle: {$selectedIdea['title']}");

        // Rate limit pause
        $this->info('⏳ Respecting API rate limits (10s pause)...');
        sleep(10);

        $this->info('✍️  Generating long-form article...');
        
        $content = '';
        $attempts = 0;
        
        while ($attempts < 3) {
            $this->info("⏳ Attempt " . ($attempts + 1) . " of 3...");
            try {
                $draftData = $geminiService->generateDraft($idea['title'], $idea['prompt'], $newsItems);
                
                $content = $draftData['cuerpo_noticia'];
                if (!empty($draftData['snippet_codigo'])) {
                    $lang = $draftData['lenguaje_snippet'] ?? '';
                    $content .= "\n<pre><code class=\"language-{$lang}\">\n" . htmlspecialchars($draftData['snippet_codigo']) . "\n</code></pre>";
                }
                break;
            } catch (\App\Exceptions\GenerationException $e) {
                $this->warn("⚠️ Attempt failed: " . $e->getMessage());
                $attempts++;
                if ($attempts < 3) {
                    $this->info('Retrying in 10s...');
                    sleep(10);
                }
            }
        }

        if (empty($content)) {
            $this->error('Content generation failed after 3 attempts. Aborting publication.');
            return 1;
        }

        // Clean any markdown code fences that Gemini might wrap around HTML
        $content = $this->cleanContent($content);

        // Generate summary + tags in a separate call
        $this->info('⏳ Respecting API rate limits (10s pause)...');
        sleep(10);

        $this->info('📝 Generating summary and tags...');
        $meta = $geminiService->generateArticleMeta($idea['title'], $content);

        // Resolve image placeholders in the content
        $content = $this->resolveImagePlaceholders($content);

        // Fetch a cover image from Unsplash if not already set (fallback)
        $coverImageUrl = $this->fetchCoverImage($idea['title'], $meta['tags'] ?? []);

        $slug = Str::slug($idea['title']) . '-' . Str::random(6);
        $wordCount = str_word_count(strip_tags($content));

        $article = Article::create([
            'title' => $idea['title'],
            'slug' => $slug,
            'content' => $content, // Store raw HTML directly — NO json_encode
            'status' => 'published',
            'is_editors_choice' => true,
            'views_count' => 0,
            'likes_count' => 0,
            'reading_time_minutes' => max(1, (int) ceil($wordCount / 200)),
            'ai_summary' => $meta['summary'] ?? Str::limit(strip_tags($content), 200),
            'meta_description' => $meta['meta_description'] ?? Str::limit(strip_tags($content), 160),
            'seo_keywords' => $meta['seo_keywords'] ?? '',
            'tags' => $meta['tags'] ?? [],
            'cover_image_path' => $coverImageUrl,
        ]);

        \App\Events\ArticlePublished::dispatch($article);

        $this->info('✅ Article published: "' . $idea['title'] . '"');

        $this->info('🧠 Generating embedding for RAG...');
        $textToEmbed = "Title: {$article->title}\nSummary: {$article->ai_summary}\n\n" . strip_tags($article->content);
        $embedding = $geminiService->embedText(substr($textToEmbed, 0, 5000));
        if (!empty($embedding)) {
            $article->update(['embedding' => $embedding]);
            $this->info('✅ Embedding stored.');
        } else {
            $this->warn('⚠️ Failed to store embedding.');
        }

        // PRE-TRANSLATION for ES and PT
        $languages = ['es', 'pt'];
        $translations = [];
        
        foreach ($languages as $lang) {
            $this->info("⏳ Translating to " . strtoupper($lang) . "... (10s pause)");
            sleep(10);
            try {
                $translations[$lang] = $geminiService->translateArticle($idea['title'], $meta['summary'], $content, $lang);
                $this->info("✅ Translated to " . strtoupper($lang));
            } catch (\Exception $e) {
                $this->error("❌ Translation to " . strtoupper($lang) . " failed: " . $e->getMessage());
            }
        }

        if (!empty($translations)) {
            $article->update(['translations' => $translations]);
        }

        if ($coverImageUrl) {
            $this->info("🖼️  Cover image: {$coverImageUrl}");
        }

        // --- NEW: Generate the Daily Briefing based on our INTERNAL site articles ---
        $this->info("📈 Generating and pre-caching internal Daily Briefing in EN, ES, PT...");
        try {
            sleep(5);
            $recentArticles = Article::where('status', 'published')
                                ->orderBy('created_at', 'desc')
                                ->take(6)
                                ->get();
            
            $briefEn = $geminiService->generateInternalDailyBrief($recentArticles);
            \Illuminate\Support\Facades\Cache::forever("homepage_daily_brief_en", $briefEn);
            $this->info("✅ Cached EN Daily Briefing");

            // Translate into ES
            sleep(5);
            $briefEsResponse = $geminiService->translateArticle('Daily Brief', 'Summary', $briefEn, 'es');
            \Illuminate\Support\Facades\Cache::forever("homepage_daily_brief_es", $briefEsResponse['content'] ?? $briefEn);
            $this->info("✅ Cached ES Daily Briefing");

            // Translate into PT
            sleep(5);
            $briefPtResponse = $geminiService->translateArticle('Daily Brief', 'Summary', $briefEn, 'pt');
            \Illuminate\Support\Facades\Cache::forever("homepage_daily_brief_pt", $briefPtResponse['content'] ?? $briefEn);
            $this->info("✅ Cached PT Daily Briefing");

        } catch (\Exception $e) {
            $this->error("❌ Failed to generate Daily Briefing: " . $e->getMessage());
        }

        \Illuminate\Support\Facades\Cache::flush();
        $this->info("🧹 Cache flushed to ensure latest content is visible.");

        return 0;
    }

    /**
     * Fetch a copyright-free cover image from Unsplash or Wikimedia Commons fallback.
     */
    private function fetchCoverImage(string $title, array $tags): ?string
    {
        $query = $tags[0] ?? '';
        if (empty($query)) {
            $words = explode(' ', $title);
            $stopWords = ['the', 'a', 'an', 'of', 'in', 'for', 'to', 'and', 'is', 'are', 'what', 'how', 'why', 'when', 'your', 'you', 'need', 'know'];
            $keywords = array_filter($words, function ($w) use ($stopWords) {
                return strlen($w) > 2 && !in_array(strtolower($w), $stopWords);
            });
            $query = implode(' ', array_slice(array_values($keywords), 0, 3));
        }

        $query = trim($query);
        $accessKey = config('services.unsplash.access_key');

        if (!empty($accessKey)) {
            try {
                $response = \Illuminate\Support\Facades\Http::withHeaders([
                    'Authorization' => "Client-ID {$accessKey}",
                ])->get('https://api.unsplash.com/search/photos', [
                    'query' => $query,
                    'per_page' => 1,
                    'orientation' => 'landscape',
                    'content_filter' => 'high',
                ]);

                if ($response->successful()) {
                    $results = $response->json()['results'] ?? [];
                    if (!empty($results)) {
                        $photo = $results[0];
                        $imageUrl = $photo['urls']['regular'] ?? $photo['urls']['small'] ?? null;
                        $photographer = $photo['user']['name'] ?? 'Unknown';
                        $this->info("📸 Photo by {$photographer} on Unsplash");
                        return $imageUrl;
                    }
                }
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::warning('Unsplash API error: ' . $e->getMessage());
            }
        }

        // FALLBACK: Wikimedia Commons API (Free, No Keys Required)
        $this->warn('⚠️  Falling back to Wikimedia Commons API for image fetching...');
        try {
            $response = \Illuminate\Support\Facades\Http::get('https://commons.wikimedia.org/w/api.php', [
                'action' => 'query',
                'generator' => 'search',
                'gsrsearch' => "filetype:bitmap " . $query,
                'gsrnamespace' => 6, // File namespace
                'gsrlimit' => 3,
                'prop' => 'imageinfo',
                'iiprop' => 'url',
                'format' => 'json'
            ]);

            if ($response->successful()) {
                $pages = $response->json()['query']['pages'] ?? [];
                if (!empty($pages)) {
                    // Get the first available image
                    $firstPage = reset($pages);
                    $imageUrl = $firstPage['imageinfo'][0]['url'] ?? null;
                    if ($imageUrl) {
                        $this->info("📸 Photo sourced from Wikimedia Commons: {$imageUrl}");
                        return $imageUrl;
                    }
                }
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::warning('Wikimedia API error: ' . $e->getMessage());
        }

        $this->warn('⚠️  No images found at all. Skipping cover image.');
        return null;
    }

    /**
     * Strip any markdown code fences Gemini might have wrapped around the HTML.
     */
    private function cleanContent(string $content): string
    {
        // Remove ```html ... ``` wrappers
        $content = preg_replace('/^```(?:html)?\s*/i', '', $content);
        $content = preg_replace('/\s*```\s*$/', '', $content);

        // If the entire content is a JSON-encoded string, decode it
        $decoded = json_decode($content, true);
        if (is_string($decoded)) {
            $content = $decoded;
        } elseif (is_array($decoded) && isset($decoded['type']) && $decoded['type'] === 'doc') {
            // It's a TipTap JSON object, convert it to HTML
            $geminiService = app(GeminiService::class);
            $content = $geminiService->tipTapToHtml($decoded);
        }

        return trim($content);
    }

    /**
     * Resolve <img src="PLACEHOLDER_IMAGE" alt="..."> tags by fetching relative images from Unsplash.
     */
    private function resolveImagePlaceholders(string $content): string
    {
        return preg_replace_callback('/<img src="PLACEHOLDER_IMAGE" alt="([^"]+)">/i', function ($matches) {
            $alt = $matches[1];
            $this->info("🖼️  Resolving placeholder image for: {$alt}");
            
            // Respect rate limits between image fetches if multiple
            sleep(2); 

            $url = $this->fetchCoverImage($alt, []);
            return '<img src="' . ($url ?? 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80') . '" alt="' . $alt . '">';
        }, $content);
    }
}
