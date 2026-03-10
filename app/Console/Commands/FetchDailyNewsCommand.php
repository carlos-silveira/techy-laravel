<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\LlamaService;

class FetchDailyNewsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:fetch-daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch daily news and generate an AI brief';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @param LlamaService $llamaService
     * @return int
     */
    public function handle(LlamaService $llamaService)
    {
        $this->info('Fetching daily news... (Mocking RSS feed)');

        $mockNews = [
            ['title' => 'OpenAI Releases New Voice API'],
            ['title' => 'Laravel 12 Introduces New Features'],
            ['title' => 'React 19 RC Now Available']
        ];

        $this->info('Generating AI brief via Ollama...');

        $brief = $llamaService->generateBrief($mockNews);

        $this->info("Generated Brief:\n" . $brief);

        return 0;
    }
}
