<?php

declare(strict_types=1);

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\NewsAgent;

class GenerateDraftJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $scoutedId;

    /**
     * Delete the job if its models no longer exist.
     */
    public bool $deleteWhenMissingModels = true;

    /**
     * Create a new job instance.
     */
    public function __construct(int $scoutedId)
    {
        $this->scoutedId = $scoutedId;
        $this->queue = 'default';
    }

    /**
     * Execute the job.
     */
    public function handle(NewsAgent $newsAgent): void
    {
        $newsAgent->generateFromScouted($this->scoutedId);
    }
}
