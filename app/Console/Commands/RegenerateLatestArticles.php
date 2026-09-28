<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\GeminiService;
use App\Services\SourceSearchService;
use App\Services\JinaReaderService;

class RegenerateLatestArticles extends Command
{
    protected $signature = 'news:regenerate-latest {--limit=5}';
    protected $description = 'Regenerates the latest published articles using the new multi-source context logic.';

    public function handle(GeminiService $gemini, SourceSearchService $sourceSearcher, JinaReaderService $jinaReader)
    {
        $limit = (int) $this->option('limit');
        $articles = Article::where('status', 'published')->orderBy('created_at', 'desc')->take($limit)->get();

        foreach ($articles as $article) {
            $this->info("Updating article: {$article->title}");
            
            $richContext = "";
            if ($article->source_url) {
                $this->info("Fetching primary source...");
                $jinaData = $jinaReader->fetchArticleContext($article->source_url);
                if (!empty($jinaData['markdown'])) {
                    $richContext = "Primary Source Context ({$article->source_url}):\n" . $jinaData['markdown'] . "\n\n";
                }
            }
            
            $this->info("Searching for additional sources...");
            $additionalSources = $sourceSearcher->searchForClaim($article->title);
            foreach ($additionalSources as $src) {
                if ($src['url'] !== $article->source_url) {
                    $richContext .= "Additional Source ({$src['url']}):\n" . $src['content_excerpt'] . "\n\n";
                }
            }
            
            $this->info("Generating new draft with multi-source context...");
            try {
                $prompt = "Detailed news report about: " . $article->title;
                $draftData = $gemini->generateDraft($article->title, $prompt, [], $richContext, []);
                
                if (!empty($draftData['article_body'])) {
                    $content = preg_replace('/^```(?:html)?\s*/i', '', $draftData['article_body']);
                    $content = preg_replace('/\s*```\s*$/', '', $content);
                    
                    $article->content = trim($content);
                    $article->save();
                    $this->info("✅ Article updated successfully.");
                } else {
                    $this->error("❌ Failed to generate body (empty).");
                }
            } catch (\Exception $e) {
                $this->error("❌ Exception: " . $e->getMessage());
            }
            $this->info("Sleeping for 15s...");
            sleep(15);
        }
    }
}
