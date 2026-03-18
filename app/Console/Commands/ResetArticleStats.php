<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;

class ResetArticleStats extends Command
{
    protected $signature = 'articles:reset-stats';
    protected $description = 'Reset likes_count and views_count to 0 for all articles';

    public function handle()
    {
        $count = Article::count();
        
        Article::query()->update([
            'likes_count' => 0,
            'views_count' => 0,
        ]);

        $this->info("✅ Reset stats for {$count} articles (likes=0, views=0).");
        return 0;
    }
}
