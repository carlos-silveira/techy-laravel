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
            $this->info("🔍 Scouting top trends (Manual Flag)...");
            $results = $agent->scoutOnly($limit);
        } else {
            $this->info("🔍 Scouting top trends (Queue Mode Default)...");
            $results = $agent->scoutOnly($limit);
        }

        foreach ($results as $res) {
            if ($res['status'] === 'scouted') {
                $this->info("✅ Scouted and queued: '{$res['title']}'");
            } else {
                $this->error("❌ Framework Failed: " . ($res['message'] ?? 'Unknown'));
            }
        }

        $this->info("🏁 Cycle complete.");
        return 0;
    }
}
