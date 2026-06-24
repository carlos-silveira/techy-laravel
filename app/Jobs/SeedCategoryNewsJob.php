<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SeedCategoryNewsJob implements ShouldQueue
{
    use Queueable;

    public $timeout = 1200; // 20 mins for seeding
    public $tries = 2;

    protected $limit;
    protected $clear;

    /**
     * Create a new job instance.
     */
    public function __construct($limit = 10, $clear = false)
    {
        $this->limit = $limit;
        $this->clear = $clear;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $options = ['--limit' => $this->limit];
        if ($this->clear) {
            $options['--clear'] = true;
        }
        
        \Illuminate\Support\Facades\Artisan::call('news:seed-categories', $options);
    }
}
