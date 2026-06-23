<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Article;
use App\Services\GeminiService;

$articles = Article::latest()->take(20)->get();
$gemini = new GeminiService();
$count = 0;

foreach ($articles as $article) {
    if (empty($article->translations['es']['title'])) {
        echo "Translating: {$article->title}\n";
        try {
            $trans = $gemini->translateArticle($article->title, $article->ai_summary ?? '', $article->content, 'es');
            $translations = $article->translations ?? [];
            $translations['es'] = $trans;
            $article->translations = $translations;
            $article->saveQuietly(); // Use saveQuietly to avoid triggering infinite events
            echo "  -> Success!\n";
            $count++;
            
            // ALWAYS add 10s delay between Gemini API calls as per user rules
            sleep(12);
        } catch (\Exception $e) {
            echo "  -> Failed: " . $e->getMessage() . "\n";
            sleep(12); // Sleep anyway to let the rate limit cool down
        }
    }
}
echo "Done. Translated {$count} articles.\n";
