<?php

namespace App\Console\Commands;

use App\Jobs\FactCheckBackfillJob;
use Illuminate\Console\Command;

class FactCheckBackfill extends Command
{
    protected $signature = 'factcheck:backfill {--limit=} {--force} {--queue}';
    protected $description = 'Trigger the fact-check backfill process for existing articles';

    public function handle()
    {
        $limit = $this->option('limit') ? (int) $this->option('limit') : null;
        $force = $this->option('force');
        $queue = $this->option('queue');

        $this->info("Starting backfill job (Limit: " . ($limit ?? 'None') . ", Force: " . ($force ? 'Yes' : 'No') . ")");

        if ($queue) {
            FactCheckBackfillJob::dispatch($force, $limit);
            $this->info("Job dispatched to queue.");
        } else {
            $job = new FactCheckBackfillJob($force, $limit);
            $job->handle();
            $this->info("Job completed synchronously.");
        }

        return 0;
    }
}
