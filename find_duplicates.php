<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$articles = \App\Models\Article::orderBy('created_at', 'desc')->take(20)->get();

echo "RECENT ARTICLES:\n";
foreach ($articles as $article) {
    echo "- ID: {$article->id} | {$article->title}\n";
}

$allArticles = \App\Models\Article::orderBy('views', 'desc')->get();
$duplicates = [];
$seenTitles = [];

foreach ($allArticles as $article) {
    $isDuplicate = false;
    $similarTo = null;
    
    foreach ($seenTitles as $seenId => $seenTitle) {
        similar_text(strtolower($article->title), strtolower($seenTitle), $percent);
        if ($percent > 65) {
            $isDuplicate = true;
            $similarTo = $seenId;
            $duplicates[] = [
                'percent' => round($percent, 2),
                'duplicate_id' => $article->id,
                'duplicate_title' => $article->title,
                'original_id' => $similarTo,
                'original_title' => $seenTitles[$similarTo],
            ];
            break;
        }
    }
    
    if (!$isDuplicate) {
        $seenTitles[$article->id] = $article->title;
    }
}

file_put_contents('duplicates.json', json_encode($duplicates, JSON_PRETTY_PRINT));
echo "\nFound " . count($duplicates) . " potential duplicates with > 65% similarity.\n";
