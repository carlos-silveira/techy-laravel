<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\GeminiService;

class PolishArticlesQA extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'article:polish {--limit=3 : Number of articles to process}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'AI QA Bot: Automatically polishes content and fixes formatting for recently generated articles.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(GeminiService $gemini)
    {
        $limit = (int) $this->option('limit');
        $this->info("🤖 AI QA Bot Initialized. Scanning for {$limit} unpolished articles...");

        $articles = Article::where('qa_passed', false)
            ->latest()
            ->take($limit)
            ->get();

        if ($articles->isEmpty()) {
            $this->info("✅ All core articles are fully polished. No QA needed.");
            return 0;
        }

        foreach ($articles as $article) {
            $this->info("🔍 QA Processing: '{$article->title}'...");

            try {
                // 1. Polish the HTML Content (English)
                $polishedHtml = $gemini->polishArticleHtml($article->content);
                
                // Remove trailing markdown code fences if AI returned them
                $polishedHtml = preg_replace('/^```(?:html)?\s*/i', '', $polishedHtml);
                $polishedHtml = preg_replace('/\s*```\s*$/', '', $polishedHtml);

                if (!empty(trim($polishedHtml))) {
                    $article->content = trim($polishedHtml);
                    $this->info("   ✔️ English HTML Polished successfully.");
                } else {
                    $this->error("   ❌ English HTML QA failed (Empty response). Skipping content update.");
                }

                // 2. Mark as QA Passed to prevent re-processing
                $article->qa_passed = true;
                $article->save();

                $this->info("   ✅ Article '{$article->title}' passed QA.\n");
                
                // Sleep to respect API rate limits
                sleep(5);

            } catch (\Exception $e) {
                $this->error("   ❌ QA Error on '{$article->title}': " . $e->getMessage());
            }
        }

        $this->info("🎉 AI QA Cycle complete.");
        return 0;
    }
}
