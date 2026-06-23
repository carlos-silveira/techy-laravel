<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\NewsAgent;
use App\Services\GeminiService;

class NewsYoloAgent extends Command
{
    protected $signature = 'yolo:agent {--limit=10 : Number of articles to generate} {--scout : Only scout and rank trends}';
    protected $description = 'Run the autonomous high-quality tech news AI agent (YOLO Mode)';

    public function handle(NewsAgent $agent, GeminiService $gemini)
    {
        $this->info("🤖 Techy YOLO Agent activated.");
        
        // Track the last run time
        \Illuminate\Support\Facades\Cache::put('yolo_agent_last_run', now()->toIso8601String());

        if ($gemini->isQuotaExhausted()) {
            $this->error("🚫 Gemini quota is exhausted for today. Standby mode.");
            return 1;
        }

        $limit = (int) $this->option('limit');
        
        try {
            if ($this->option('scout')) {
                $this->info("🔍 Scouting top trends (Manual Flag)...");
                $results = $agent->scoutOnly($limit);
            } else {
                $this->info("🤖 Autonomous cycle initiated...");
                $results = $agent->runAutonomousCycle($limit);
            }

            foreach ($results as $res) {
                if (($res['status'] ?? '') === 'scouted') {
                    $this->info("✅ Scouted and queued: '{$res['title']}'");
                } else {
                    $this->error("❌ Framework Failed: " . ($res['message'] ?? 'Unknown'));
                }
            }
        } catch (\RuntimeException $e) {
            $this->error("🚨 AI API Error: " . $e->getMessage());
        }

        $this->info("🏁 Cycle complete.");
        return 0;
    }
}
