<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Autonomous AI News Agent (YOLO Mode)
        // Fetches news, critiques drafts, fixes HTML, and auto-publishes
        // Runs every 5 minutes to maximize free daily quota (~288 articles/day) without triggering RPM limits.
        $schedule->command('yolo:agent --limit=1')
            ->everyFiveMinutes()
            ->withoutOverlapping() // Crucial: prevents parallel execution if the AI API is slow
            ->timezone('America/Mexico_City');
        
        // Stockpile a few new AI articles for targeted categories daily
        $schedule->command('news:seed-categories --limit=2')
            ->dailyAt('08:00')
            ->withoutOverlapping()
            ->timezone('America/Mexico_City');
        
        // CTO Audience Growth Engine: Slowly drip-feed backlog articles to Twitter every 2 hours to beat algorithm limits
        $schedule->command('social:sync-backlog', ['--limit' => 2])->everyTwoHours()->timezone('America/Mexico_City');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
