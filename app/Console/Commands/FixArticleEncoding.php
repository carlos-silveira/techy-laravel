<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class FixArticleEncoding extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'article:fix-encoding {slug?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix double-encoded JSON content in articles';

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
     * @return int
     */
    public function handle()
    {
        $slug = $this->argument('slug');
        
        $query = \App\Models\Article::query();
        if ($slug) {
            $query->where('slug', $slug);
        }

        $articles = $query->get();

        foreach ($articles as $article) {
            $rawContent = $article->getRawOriginal('content');
            
            // Try to decode. If it decodes to a string, it means it was double encoded.
            $decoded = json_decode($rawContent, true);
            if ($decoded && is_string($decoded)) {
                $this->info("Fixing article: {$article->title}");
                $article->content = json_decode($decoded, true) ?? $decoded;
                $article->save();
            } else {
                $this->line("Article '{$article->title}' seems properly formatted.");
            }
        }
        
        $this->info('Done.');
        return 0;
    }
}
