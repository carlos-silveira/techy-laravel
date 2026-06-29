<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Services\FactCheckService;
use Illuminate\Console\Command;

class FactCheckArticle extends Command
{
    protected $signature = 'factcheck:article {id}';
    protected $description = 'Run a fact-check on a specific article by ID';

    public function handle(FactCheckService $service)
    {
        $id = $this->argument('id');
        $article = Article::find($id);

        if (!$article) {
            $this->error("Article ID {$id} not found.");
            return 1;
        }

        $this->info("Fact-checking article: {$article->title}");
        
        try {
            $result = $service->checkArticle($article);
            
            $this->info("Score: {$result->overall_score}/100");
            $this->info("Status: {$result->status}");
            $this->info("Verified: {$result->verified_count} / {$result->claims_count}");
            
            if ($result->failed_count > 0) {
                $this->error("Failed claims: {$result->failed_count}");
            }
            
            return 0;
        } catch (\Exception $e) {
            $this->error("Failed: " . $e->getMessage());
            return 1;
        }
    }
}
