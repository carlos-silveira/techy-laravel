<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\GeminiService;
use App\Services\NewsService;
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
    public function handle(GeminiService $geminiService, NewsService $newsService)
    {
        $this->info('🗑  Cleaning up articles older than 3 days...');
        \App\Models\Article::where('created_at', '<', now()->subDays(3))->delete();
        \Illuminate\Support\Facades\Artisan::call('cache:clear');

        $this->info('📰 Fetching real news context...');
        $newsItems = $newsService->fetchTodayTechNews();

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
            
            $draftData = null;
            $attempts = 0;
            
            while ($attempts < 3) {
                $this->info("⏳ Attempt " . ($attempts + 1) . " of 3...");
                sleep(10); // Mandatory 10s API delay
                
                try {
                    $draftData = $geminiService->generateCategoryDraft($category, $newsItems);
                    if (!empty($draftData['html_content']) && strpos($draftData['html_content'], 'Content missing.') === false && strpos($draftData['html_content'], 'Content generation failed.') === false) {
                        break;
                    }
                } catch (\Exception $e) {
                    $this->error("API Error: " . $e->getMessage());
                }
                
                $attempts++;
                if ($attempts < 3) {
                    $this->warn('Generation failed or returned invalid data. Retrying in 15s...');
                    sleep(15);
                }
            }

            if (empty($draftData['html_content']) || strpos($draftData['html_content'], 'Content missing.') !== false || strpos($draftData['html_content'], 'Content generation failed.') !== false) {
                $this->error("Failed to generate category {$category} after 3 attempts. Skipping...");
                continue;
            }
            
            $title = $draftData['title'] ?? 'The Future of ' . $category;
            $htmlContent = $draftData['html_content'];
            
            $this->info("💡 Generated Title: {$title}");
            
            // Clean markdown fences if any
            $htmlContent = preg_replace('/^```(?:html)?\s*/i', '', $htmlContent);
            $htmlContent = preg_replace('/\s*```\s*$/', '', $htmlContent);
            
            $this->info('📝 Generating summary and meta...');
            sleep(10); // Mandatory 10s API delay

            $meta = [];
            try {
                $meta = $geminiService->generateArticleMeta($title, $htmlContent);
            } catch (\Exception $e) {
                $this->error("Meta generation failed. Proceeding with defaults. " . $e->getMessage());
            }
            
            // Resolve image placeholders
            $htmlContent = $this->resolveImagePlaceholders($htmlContent, $category);
            
            // Fetch cover image
            $coverImageUrl = $this->fetchCoverImage($title, [$draftData['suggested_cover_query'] ?? ''], $category);
            
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
                $this->info("⏳ Translating to " . strtoupper($lang) . "... (10s pause)");
                sleep(10); // Mandatory 10s API delay
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
        
        \Illuminate\Support\Facades\Artisan::call('cache:clear');
        
        $this->info("📈 Generating and caching Daily Briefing...");
        try {
            sleep(10); // Mandatory 10s API delay
            $recentArticles = Article::where('status', 'published')->orderBy('created_at', 'desc')->take(6)->get();
            $briefEn = $geminiService->generateInternalDailyBrief($recentArticles);
            \Illuminate\Support\Facades\Cache::forever("homepage_daily_brief_en", $briefEn);
            $this->info("✅ Cached EN Daily Briefing");

            try {
                sleep(10); // Mandatory 10s API delay
                $briefEsResponse = $geminiService->translateArticle('Daily Brief', 'Summary', $briefEn, 'es');
                \Illuminate\Support\Facades\Cache::forever("homepage_daily_brief_es", $briefEsResponse['content'] ?? $briefEn);
                $this->info("✅ Cached ES Daily Briefing");
            } catch (\Exception $e) {
                $this->error("❌ Failed to translate ES Daily Briefing: " . $e->getMessage());
            }

            try {
                sleep(10); // Mandatory 10s API delay
                $briefPtResponse = $geminiService->translateArticle('Daily Brief', 'Summary', $briefEn, 'pt');
                \Illuminate\Support\Facades\Cache::forever("homepage_daily_brief_pt", $briefPtResponse['content'] ?? $briefEn);
                $this->info("✅ Cached PT Daily Briefing");
            } catch (\Exception $e) {
                $this->error("❌ Failed to translate PT Daily Briefing: " . $e->getMessage());
            }

        } catch (\Exception $e) {
            $this->error("❌ Failed to generate Daily Briefing: " . $e->getMessage());
        }
        
        $this->info('🎉 Completely finished seeding categories!');
        return 0;
    }

    private function fetchCoverImage(string $title, array $tags, string $category = 'technology'): ?string
    {
        $accessKey = config('services.unsplash.access_key');
        if (empty($accessKey)) return null;

        $query = trim($tags[0] ?? '');
        if (empty($query)) {
            $words = explode(' ', str_replace([':', ',', '.', '!', '?'], '', $title));
            $stopWords = ['the', 'a', 'an', 'of', 'in', 'for', 'to', 'and', 'is', 'are', 'on', 'with', 'from', 'what', 'how', 'why', 'when'];
            $keywords = array_filter($words, function ($w) use ($stopWords) {
                return strlen($w) > 3 && !in_array(strtolower($w), $stopWords);
            });
            $query = implode(' ', array_slice(array_values($keywords), 0, 2));
        }

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
