<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\GeminiService;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SeedCategoryNews extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'news:seed-categories';

    /**
     * The console command description.
     */
    protected $description = 'Seed the database with 1 AI-generated news article for each core category.';

    /**
     * Execute the console command.
     */
    public function handle(GeminiService $geminiService)
    {
        $this->info('🗑  Emptying the articles table...');
        Article::truncate();

        $categories = [
            'Artificial Intelligence',
            'Gadgets & Hardware',
            'Software & Apps',
            'Business Tech',
            'Gaming',
            'Cybersecurity & Privacy'
        ];

        foreach ($categories as $category) {
            $this->info("🚀 Generating article for category: {$category}");
            
            // Respect API limits
            sleep(5);

            $draftData = $geminiService->generateCategoryDraft($category);
            
            $title = $draftData['title'] ?? 'The Future of ' . $category;
            $htmlContent = $draftData['html_content'] ?? '<p>Content missing.</p>';
            
            $this->info("💡 Generated Title: {$title}");
            
            // Clean markdown fences if any
            $htmlContent = preg_replace('/^```(?:html)?\s*/i', '', $htmlContent);
            $htmlContent = preg_replace('/\s*```\s*$/', '', $htmlContent);
            
            $this->info('📝 Generating summary and meta...');
            sleep(5);
            $meta = $geminiService->generateArticleMeta($title, $htmlContent);
            
            // Resolve image placeholders
            $htmlContent = $this->resolveImagePlaceholders($htmlContent, $category);
            
            // Fetch cover image
            $coverImageUrl = $this->fetchCoverImage($title, $meta['tags'] ?? [$category]);
            
            $slug = Str::slug($title) . '-' . Str::random(6);
            $wordCount = str_word_count(strip_tags($htmlContent));

            $article = Article::create([
                'title' => $title,
                'slug' => $slug,
                'content' => trim($htmlContent),
                'status' => 'published',
                'is_editors_choice' => false,
                'views_count' => rand(10, 500),
                'likes_count' => rand(1, 50),
                'reading_time_minutes' => max(1, (int) ceil($wordCount / 200)),
                'ai_summary' => $meta['summary'] ?? Str::limit(strip_tags($htmlContent), 200),
                'meta_description' => $meta['meta_description'] ?? Str::limit(strip_tags($htmlContent), 160),
                'seo_keywords' => $meta['seo_keywords'] ?? '',
                'tags' => array_merge([$category], ($meta['tags'] ?? [])),
                'cover_image_path' => $coverImageUrl,
            ]);

            $this->info("✅ Saved article: '{$title}'");
            
            // Translation
            $languages = ['es', 'pt'];
            $translations = [];
            foreach ($languages as $lang) {
                $this->info("⏳ Translating to " . strtoupper($lang) . "... (5s pause)");
                sleep(5);
                try {
                    $translations[$lang] = $geminiService->translateArticle($title, $article->ai_summary, $htmlContent, $lang);
                    $this->info("✅ Translated to " . strtoupper($lang));
                } catch (\Exception $e) {
                    $this->error("❌ Translation to " . strtoupper($lang) . " failed: " . $e->getMessage());
                }
            }

            if (!empty($translations)) {
                $article->update(['translations' => $translations]);
            }
            
            $this->info("--------------------------------------------------");
        }
        
        $this->info('🎉 Completely finished seeding categories!');
        return 0;
    }

    private function fetchCoverImage(string $title, array $tags): ?string
    {
        $accessKey = config('services.unsplash.access_key');
        if (empty($accessKey)) return null;

        $query = $tags[0] ?? explode(' ', $title)[0];
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
                    $photo = $results[0];
                    return $photo['urls']['regular'] ?? $photo['urls']['small'] ?? null;
                }
            }
        } catch (\Exception $e) {
            Log::warning('Unsplash API error: ' . $e->getMessage());
        }
        return null;
    }

    private function resolveImagePlaceholders(string $content, string $fallbackQuery): string
    {
        return preg_replace_callback('/<img src="PLACEHOLDER_IMAGE" alt="([^"]+)">/i', function ($matches) use ($fallbackQuery) {
            $alt = $matches[1] ?: $fallbackQuery;
            sleep(2); 
            $url = $this->fetchCoverImage($alt, [$fallbackQuery]);
            return '<img src="' . ($url ?? 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80') . '" alt="' . $alt . '">';
        }, $content);
    }
}
