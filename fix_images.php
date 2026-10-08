<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Article;
use App\Services\NewsAgent;

$agent = app(NewsAgent::class);

$articles = Article::where('cover_image_path', 'like', '%jetpackdigital%')
    ->orWhere('content', 'like', '%jetpackdigital%')
    ->get();

echo "Found " . $articles->count() . " articles to fix.\n";

foreach ($articles as $article) {
    echo "Fixing: {$article->title}\n";
    
    // 1. Remove the bad image from content
    if (str_contains($article->content, 'jetpackdigital.com')) {
        // Find and remove image tags containing jetpackdigital
        // It could be <img src="..."> or ![alt](...) but it's HTML since it's `content`
        $content = preg_replace('/<img[^>]*jetpackdigital[^>]*>/i', '', $article->content);
        // Also remove markdown if it leaked
        $content = preg_replace('/!\[.*?\]\(.*?jetpackdigital.*?\)/i', '', $content);
        $article->content = $content;
    }

    // 2. Generate a new cover image
    if (str_contains($article->cover_image_path ?? '', 'jetpackdigital')) {
        $tags = is_array($article->tags) ? implode(' ', $article->tags) : '';
        $query = trim(Illuminate\Support\Str::limit($article->title . ' ' . $tags, 30)) . ' technology';
        
        $newCover = $agent->fetchCoverImageFallback($query);
        
        if (empty($newCover)) {
            $fallbacks = [
                'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
                'https://images.unsplash.com/photo-1518770660439-4636190af475',
                'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
                'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
                'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e',
                'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
            ];
            $newCover = $fallbacks[array_rand($fallbacks)] . '?auto=format&fit=crop&w=1200&q=80';
        }
        
        $article->cover_image_path = $newCover;
    }
    
    $article->save();
    echo " -> Fixed!\n";
    sleep(1); // rate limit for Unsplash
}

echo "Done!\n";
