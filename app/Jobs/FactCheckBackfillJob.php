<?php

namespace App\Jobs;

use App\Models\Article;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class FactCheckBackfillJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 3600; // 1 hour max

    protected bool $force;
    protected ?int $limit;

    public function __construct(bool $force = false, ?int $limit = null)
    {
        $this->force = $force;
        $this->limit = $limit;
    }

    public function handle()
    {
        Log::info("FactCheckBackfillJob: Starting...");

        $query = Article::where('status', 'published');

        if (!$this->force) {
            $query->whereNull('fact_check_status');
        }

        if ($this->limit) {
            $query->limit($this->limit);
        }

        $total = $query->count();
        if ($total === 0) {
            Log::info("FactCheckBackfillJob: No articles to process.");
            return;
        }

        // Initialize progress
        Cache::put('fact_check_backfill_progress', [
            'total' => $total,
            'completed' => 0,
            'failed' => 0,
            'current_article' => null,
            'status' => 'running',
            'started_at' => now(),
        ]);

        $completed = 0;
        $failed = 0;

        // Process in chunks to save memory
        $query->chunkById(20, function ($articles) use (&$completed, &$failed, $total) {
            foreach ($articles as $article) {
                // Check if user stopped the job
                $progress = Cache::get('fact_check_backfill_progress');
                if ($progress && ($progress['status'] ?? '') === 'stopped') {
                    Log::info("FactCheckBackfillJob: Stopped by user request.");
                    return false; // Break chunking
                }

                Cache::put('fact_check_backfill_progress', array_merge($progress ?? [], [
                    'current_article' => $article->title,
                ]));

                try {
                    // Dispatch the individual job synchronously or just run it here if we want sequential
                    // Sequential is better for backfill to strictly control rate limits
                    app(\App\Services\FactCheckService::class)->checkArticle($article);
                    $completed++;
                    
                    // Respect API rate limits (Gemini + Jina + Google)
                    sleep(15); 
                } catch (\Exception $e) {
                    Log::error("FactCheckBackfillJob: Failed on article ID {$article->id} - " . $e->getMessage());
                    $failed++;
                    
                    if (str_contains(strtolower($e->getMessage()), 'quota')) {
                         Log::warning("FactCheckBackfillJob: Quota exhausted. Stopping batch.");
                         $progress = Cache::get('fact_check_backfill_progress', []);
                         Cache::put('fact_check_backfill_progress', array_merge($progress, ['status' => 'quota_exhausted']));
                         return false;
                    }
                }

                $progress = Cache::get('fact_check_backfill_progress', []);
                Cache::put('fact_check_backfill_progress', array_merge($progress, [
                    'completed' => $completed,
                    'failed' => $failed,
                ]));
            }
        });
        
        $progress = Cache::get('fact_check_backfill_progress', []);
        if (($progress['status'] ?? '') !== 'stopped' && ($progress['status'] ?? '') !== 'quota_exhausted') {
            Cache::put('fact_check_backfill_progress', array_merge($progress, ['status' => 'completed']));
        }

        Log::info("FactCheckBackfillJob: Finished. Completed: {$completed}, Failed: {$failed}");
    }
}
