<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Services\BotDetector;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Create crawler_logs table if it does not exist
        if (!Schema::hasTable('crawler_logs')) {
            Schema::create('crawler_logs', function (Blueprint $table) {
                $table->id();
                $table->string('crawler_name', 100)->nullable()->index();
                $table->string('url', 255)->nullable();
                $table->string('referrer', 255)->nullable();
                $table->string('ip_address', 64)->nullable();
                $table->string('user_agent', 500)->nullable();
                $table->foreignId('article_id')->nullable()->constrained()->nullOnDelete();
                $table->timestamp('created_at')->nullable()->index();
            });
        }

        // 2. Migrate existing bots from page_views to crawler_logs
        $detector = app(BotDetector::class);
        DB::table('page_views')
            ->where('is_bot', true)
            ->chunkById(500, function ($botViews) use ($detector) {
                $rows = [];
                foreach ($botViews as $pv) {
                    $rows[] = [
                        'crawler_name' => $detector->crawlerName($pv->user_agent) ?? 'Unknown Crawler',
                        'url' => $pv->url,
                        'referrer' => $pv->referrer,
                        'ip_address' => $pv->ip_address,
                        'user_agent' => $pv->user_agent,
                        'article_id' => $pv->article_id,
                        'created_at' => $pv->created_at,
                    ];
                }
                if (!empty($rows)) {
                    DB::table('crawler_logs')->insert($rows);
                }
            });

        // 3. Purge all bot rows from page_views: bot views are NOT views
        DB::table('page_views')->where('is_bot', true)->delete();

        // 4. Synchronize articles.views_count with actual human views
        try {
            DB::statement("
                UPDATE articles a
                LEFT JOIN (
                    SELECT article_id, COUNT(*) as real_views
                    FROM page_views
                    WHERE article_id IS NOT NULL
                    GROUP BY article_id
                ) pv ON a.id = pv.article_id
                SET a.views_count = COALESCE(pv.real_views, 0)
            ");
        } catch (\Throwable $e) {
            // SQLite compatibility for testing
            $articles = DB::table('articles')->get(['id']);
            foreach ($articles as $art) {
                $realViews = DB::table('page_views')->where('article_id', $art->id)->count();
                DB::table('articles')->where('id', $art->id)->update(['views_count' => $realViews]);
            }
        }

        // 5. Synchronize articles.soft_views_count with actual verified human reel views
        try {
            DB::statement("
                UPDATE articles a
                LEFT JOIN (
                    SELECT article_id, COUNT(*) as real_reels
                    FROM engagement_events
                    WHERE type = 'reel_view' AND article_id IS NOT NULL
                    GROUP BY article_id
                ) ee ON a.id = ee.article_id
                SET a.soft_views_count = COALESCE(ee.real_reels, 0)
            ");
        } catch (\Throwable $e) {
            // SQLite compatibility for testing
            $articles = DB::table('articles')->get(['id']);
            foreach ($articles as $art) {
                $realReels = DB::table('engagement_events')->where('article_id', $art->id)->where('type', 'reel_view')->count();
                DB::table('articles')->where('id', $art->id)->update(['soft_views_count' => $realReels]);
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('crawler_logs');
    }
};
