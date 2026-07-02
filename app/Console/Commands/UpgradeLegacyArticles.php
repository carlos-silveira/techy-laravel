<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\GeminiService;
use Illuminate\Support\Facades\Log;

class UpgradeLegacyArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:upgrade-legacy {--limit=1}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Upgrade legacy articles to meet the new E-E-A-T AdSense standards';

    /**
     * Execute the console command.
     */
    public function handle(GeminiService $gemini)
    {
        $limit = (int) $this->option('limit');

        $this->info("🔍 Searching for legacy articles to upgrade (Limit: {$limit})...");

        // Find articles that are not upgraded, sort by views_count desc to prioritize high-value content
        $articles = Article::where('is_quality_upgraded', false)
            ->whereNotNull('content')
            ->orderBy('views_count', 'desc')
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();

        if ($articles->isEmpty()) {
            $this->info("✅ No legacy articles found to upgrade. All caught up!");
            return 0;
        }

        foreach ($articles as $article) {
            $this->info("⚙️ Upgrading Article ID {$article->id}: {$article->title}");

            try {
                $result = $gemini->upgradeLegacyArticle($article);
                
                if (!empty($result['article_body'])) {
                    $article->content = $result['article_body'];
                    if (!empty($result['title'])) {
                        $article->title = $result['title'];
                    }
                    $article->is_quality_upgraded = true;
                    $article->save();

                    $this->info("✅ Article ID {$article->id} upgraded successfully.");
                } else {
                    $this->error("❌ Failed to upgrade Article ID {$article->id}: Empty body returned.");
                }
            } catch (\Exception $e) {
                $this->error("❌ Error upgrading Article ID {$article->id}: " . $e->getMessage());
                Log::error("UpgradeLegacyArticles error for ID {$article->id}: " . $e->getMessage());
            }

            // Sleep to avoid rate limits if limit > 1
            if ($limit > 1) {
                $this->info("⏳ Sleeping for 15 seconds to respect rate limits...");
                sleep(15);
            }
        }

        return 0;
    }
}
