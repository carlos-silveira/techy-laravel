<?php

namespace App\Jobs;

use App\Models\Article;
use App\Services\FactCheckService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class FactCheckArticleJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 2;
    public $backoff = 60; // Wait 1 minute before retrying

    protected Article $article;

    public function __construct(Article $article)
    {
        $this->article = $article;
    }

    public function handle(FactCheckService $factCheckService)
    {
        Log::info("FactCheckArticleJob: Starting for article ID {$this->article->id}");
        
        try {
            $factCheckService->checkArticle($this->article);
            Log::info("FactCheckArticleJob: Completed for article ID {$this->article->id}");
        } catch (\Exception $e) {
            Log::error("FactCheckArticleJob: Failed for article ID {$this->article->id} - " . $e->getMessage());
            
            // Re-queue if it's a quota issue
            if (str_contains(strtolower($e->getMessage()), 'quota')) {
                Log::warning("FactCheckArticleJob: Quota exhausted, releasing job back to queue with 1 hour delay.");
                $this->release(3600);
            } else {
                throw $e;
            }
        }
    }
}
