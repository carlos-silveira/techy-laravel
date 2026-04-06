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
        // Generate the rolling daily briefing every 4 hours
        $schedule->command('news:generate-daily')->everyFourHours()->timezone('America/Mexico_City');
        
        // Stockpile new AI articles for categories every 4 hours
        $schedule->command('news:seed-categories')->everyFourHours()->timezone('America/Mexico_City');

        // AI QA Editor: Sweeps through recently published articles to polish them
        $schedule->command('article:polish')->everyFourHours()->timezone('America/Mexico_City');
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
