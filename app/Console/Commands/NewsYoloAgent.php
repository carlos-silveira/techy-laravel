<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\NewsAgent;
use App\Services\GeminiService;

class NewsYoloAgent extends Command
{
    protected $signature = 'yolo:agent {--limit=1 : Number of articles to generate} {--scout : Only scout and rank trends}';
    protected $description = 'Run the autonomous high-quality tech news AI agent (YOLO Mode)';

    public function handle(NewsAgent $agent, GeminiService $gemini)
    {
        $this->info("🤖 Techy YOLO Agent activated.");
        
        if ($gemini->isQuotaExhausted()) {
            $this->error("🚫 Gemini quota is exhausted for today. Standby mode.");
            return 1;
        }

        $limit = (int) $this->option('limit');
        
        if ($this->option('scout')) {
            $this->info("🔍 Scouting top trends...");
            // Scout logic here if separate
            return 0;
        }

        $this->info("🚀 Starting generation cycle for target: {$limit} article(s)...");
        
        $results = $agent->runAutonomousCycle($limit);

        foreach ($results as $res) {
            if ($res['status'] === 'published') {
                $this->info("✅ Published: '{$res['title']}' -> " . url("/article/{$res['slug']}"));
            } else {
                $this->error("❌ Failed: '{$res['title']}' - Reason: {$res['reason']}");
            }
        }

        $this->info("🏁 Cycle complete.");
        return 0;
    }
}
