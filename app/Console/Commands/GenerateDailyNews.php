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

        $idea = $ideas[0];
        $this->info("💡 Selected angle: {$idea['title']}");

        // Rate limit pause
        $this->info('⏳ Respecting API rate limits (10s pause)...');
        sleep(10);

        $this->info('✍️  Generating long-form article...');
        $content = $geminiService->generateDraft($idea['title'], $idea['prompt'], $newsItems);

        if (empty($content)) {
            $this->error('Content generation failed.');
            return 1;
        }

        // Clean any markdown code fences that Gemini might wrap around HTML
        $content = $this->cleanContent($content);

        // Generate summary + tags in a separate call
        $this->info('⏳ Respecting API rate limits (10s pause)...');
        sleep(10);

        $this->info('📝 Generating summary and tags...');
        $meta = $geminiService->generateArticleMeta($idea['title'], $content);

        // Fetch a cover image from Unsplash
        $coverImageUrl = $this->fetchCoverImage($idea['title'], $meta['tags'] ?? []);

        $slug = Str::slug($idea['title']) . '-' . Str::random(6);
        $wordCount = str_word_count(strip_tags($content));

        Article::create([
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

        $this->info('✅ Article published: "' . $idea['title'] . '"');
        if ($coverImageUrl) {
            $this->info("🖼️  Cover image: {$coverImageUrl}");
        }
        return 0;
    }

    /**
     * Fetch a copyright-free cover image from Unsplash API.
     */
    private function fetchCoverImage(string $title, array $tags): ?string
    {
        $accessKey = config('services.unsplash.access_key');

        if (empty($accessKey)) {
            $this->warn('⚠️  UNSPLASH_ACCESS_KEY not set — skipping cover image.');
            return null;
        }

        // Build search query from title + first tag
        $query = $tags[0] ?? '';
        if (empty($query)) {
            // Extract main keyword from title
            $words = explode(' ', $title);
            $stopWords = ['the', 'a', 'an', 'of', 'in', 'for', 'to', 'and', 'is', 'are', 'what', 'how', 'why', 'when', 'your', 'you', 'need', 'know'];
            $keywords = array_filter($words, function ($w) use ($stopWords) {
                return strlen($w) > 2 && !in_array(strtolower($w), $stopWords);
            });
            $query = implode(' ', array_slice(array_values($keywords), 0, 3));
        }

        // Always add 'technology' to bias results toward tech imagery
        $query = trim($query . ' technology');

        try {
            $response = Http::withHeaders([
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
                    // Use Unsplash CDN URL (hotlinking required by TOS)
                    $photo = $results[0];
                    $imageUrl = $photo['urls']['regular'] ?? $photo['urls']['small'] ?? null;
                    $photographer = $photo['user']['name'] ?? 'Unknown';
                    $this->info("📸 Photo by {$photographer} on Unsplash");
                    return $imageUrl;
                }
            }

            $this->warn('⚠️  No Unsplash images found for: ' . $query);
            return null;
        } catch (\Exception $e) {
            Log::warning('Unsplash API error: ' . $e->getMessage());
            $this->warn('⚠️  Unsplash API error — skipping cover image.');
            return null;
        }
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
}
