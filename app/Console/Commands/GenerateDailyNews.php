<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\GeminiService;
use App\Services\NewsService;
use App\Models\Article;
use Illuminate\Support\Str;

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
        ]);

        $this->info('✅ Article published: "' . $idea['title'] . '"');
        return 0;
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
        }

        return trim($content);
    }
}
