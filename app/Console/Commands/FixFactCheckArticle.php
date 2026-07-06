<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\GeminiService;
use App\Services\FactCheckService;
use Illuminate\Support\Facades\Log;

class FixFactCheckArticle extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:fix-factcheck {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Rewrite an article specifically to fix hallucinated facts and low confidence scores.';

    /**
     * Execute the console command.
     */
    public function handle(GeminiService $gemini, FactCheckService $factCheck)
    {
        $id = $this->argument('id');
        $article = Article::find($id);

        if (!$article) {
            $this->error("Article {$id} not found.");
            return 1;
        }

        $this->info("Fixing Fact-Check for Article ID {$article->id} - {$article->title}");

        try {
            // Strong prompt to fix hallucinations
            $currentDate = date('Y-m-d');
            $currentYear = date('Y');
            
            $prompt = "CRITICAL INSTRUCTION: This article failed a recent fact-check due to severe AI hallucinations (e.g., incorrect dates, fake events, claiming things happened in the future). 
            Please rewrite the article to be 100% factually accurate. 
            Do NOT invent future dates. The current date is {$currentDate} (Year {$currentYear}). 
            If the original article claims an event happened in 2026 but it actually happened in 2024, FIX THE DATE to the correct past date.
            Maintain the original language and tone, but strictly adhere to reality.";
            
            $context = [];
            if ($article->source_url) {
                $context[] = ['title' => $article->title, 'source' => $article->source_url];
            } else {
                $context[] = ['title' => $article->title, 'source' => 'General tech news. Verify dates and remove future predictions framed as past events.'];
            }

            $result = $gemini->generateDraft($article->title, $prompt, $context);

            if (!empty($result['cuerpo_noticia'])) {
                $article->content = $result['cuerpo_noticia'];
                if (!empty($result['titular'])) {
                    $article->title = $result['titular'];
                }
                
                $this->info("Rewrite successful. Saving and running new Fact-Check...");
                $article->save();
                
                // Re-run Fact Check to update the score immediately
                $checkResult = $factCheck->checkArticle($article);
                
                $this->info("✅ Fix complete! New Fact-Check Score: {$checkResult->overall_score}");
            } else {
                $this->error("❌ Failed to generate fixed content.");
            }
        } catch (\Exception $e) {
            $this->error("❌ Error fixing article: " . $e->getMessage());
            Log::error("FixFactCheckArticle Error for ID {$article->id}: " . $e->getMessage());
            return 1;
        }

        return 0;
    }
}
