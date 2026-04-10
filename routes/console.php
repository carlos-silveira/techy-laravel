<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

use Illuminate\Support\Facades\Schedule;

// Generate AI-powered news every 4 hours
Schedule::command('news:generate-daily')->cron('0 */4 * * *')->withoutOverlapping();

// Auto-seed missing images (if unsplash limits were hit previously)
Schedule::command('news:update-images')->dailyAt('02:00')->withoutOverlapping();
