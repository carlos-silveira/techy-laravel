<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\GeminiService;

class PreTranslateArticles extends Command
{
    protected $signature = 'articles:pre-translate {--limit=10 : Limit number of articles to process}';
    protected $description = 'Pre-translate existing articles into English, Spanish, and Portuguese';

    public function handle(GeminiService $geminiService)
    {
        $limit = (int) $this->option('limit');
        
        $articles = Article::where('status', 'published')
            ->orderBy('id', 'desc')
            ->take($limit)
            ->get();

        $this->info("🔄 Processing " . $articles->count() . " articles...");

        $locales = ['en', 'es', 'pt'];

        foreach ($articles as $article) {
            $this->info("📰 Article: {$article->title}");
            $translations = $article->translations ?? [];
            $updated = false;

            foreach ($locales as $locale) {
                // Skip if it's the source language
                if ($article->language === $locale) continue;

                // Skip if already translated
                if (isset($translations[$locale])) {
                    $this->line("  - " . strtoupper($locale) . ": Already exists.");
                    continue;
                }

                $this->info("  - " . strtoupper($locale) . ": Translating... (10s pause)");
                sleep(10);

                try {
                    $result = $geminiService->translateArticle(
                        $article->title,
                        $article->ai_summary ?? '',
                        $article->content ?? '',
                        $locale
                    );

                    $translations[$locale] = $result;
                    $updated = true;
                    $this->info("  - " . strtoupper($locale) . ": ✅ Done.");
                } catch (\Exception $e) {
                    $this->error("  - " . strtoupper($locale) . ": ❌ Failed: " . $e->getMessage());
                }
            }

            if ($updated) {
                $article->update(['translations' => $translations]);
            }
        }

        $this->info('✅ Processing complete.');
    }
}
