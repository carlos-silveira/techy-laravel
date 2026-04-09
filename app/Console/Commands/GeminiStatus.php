<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\GeminiService;

class GeminiStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gemini:status {--reset : Reset the quota exhaustion flag}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check or reset the Gemini API quota exhaustion status';

    /**
     * Execute the console command.
     */
    public function handle(GeminiService $geminiService)
    {
        if ($this->option('reset')) {
            $geminiService->resetQuota();
            $this->info('Gemini API quota has been manually reset.');
            return 0;
        }

        $isExhausted = $geminiService->isQuotaExhausted();

        if ($isExhausted) {
            $this->warn('Gemini API Quota is currently EXHAUSTED (Paused until midnight).');
            $this->line('All AI operations (translations, generation) are short-circuiting to prevent errors.');
        } else {
            $this->info('Gemini API Quota is ACTIVE.');
            $this->line('Daily limit (RPD) has not been reached yet today.');
        }

        return 0;
    }
}
