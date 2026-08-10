<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$article = App\Models\Article::where('slug', 'study-reveals-frontier-ai-models-are-remarkably-easy-to-jailbreak-yojqM5')->first();
if ($article) {
    echo json_encode([
        'title' => $article->title,
        'slug' => $article->slug,
        'translations' => $article->translations
    ], JSON_PRETTY_PRINT);
} else {
    echo "Article not found.";
}
