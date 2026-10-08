<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Article;
use App\Services\SourceSearchService;
use App\Services\JinaReaderService;
use App\Services\GeminiService;

$gemini = app(GeminiService::class);
$sourceSearcher = app(SourceSearchService::class);
$jinaReader = app(JinaReaderService::class);

$articles = Article::where('status', 'published')->orderBy('created_at', 'desc')->take(5)->get();

foreach ($articles as $article) {
    echo "Updating article: {$article->title}\n";
    
    $richContext = "";
    if ($article->source_url) {
        echo "Fetching primary source...\n";
        $jinaData = $jinaReader->fetchArticleContext($article->source_url);
        if (!empty($jinaData['markdown'])) {
            $richContext = "Primary Source Context ({$article->source_url}):\n" . $jinaData['markdown'] . "\n\n";
        }
    }
    
    echo "Searching for additional sources...\n";
    $additionalSources = $sourceSearcher->searchForClaim($article->title);
    foreach ($additionalSources as $src) {
        if ($src['url'] !== $article->source_url) {
            $richContext .= "Additional Source ({$src['url']}):\n" . $src['content_excerpt'] . "\n\n";
        }
    }
    
    echo "Context size: " . strlen($richContext) . " bytes\n";
    echo "Generating new draft...\n";
    
    try {
        $prompt = "Detailed news report about: " . $article->title;
        $draftData = $gemini->generateDraft($article->title, $prompt, [], $richContext, []);
        
        if (!empty($draftData['article_body'])) {
            $content = preg_replace('/^```(?:html)?\s*/i', '', $draftData['article_body']);
            $content = preg_replace('/\s*```\s*$/', '', $content);
            
            $article->content = trim($content);
            $article->save();
            echo "✅ Article updated successfully.\n\n";
        } else {
            echo "❌ Failed to generate body (empty).\n\n";
        }
    } catch (\Exception $e) {
        echo "❌ Exception: " . $e->getMessage() . "\n\n";
    }
    sleep(5); // Rate limit
}
echo "Done!\n";
