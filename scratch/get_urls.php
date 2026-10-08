<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$articles = \App\Models\Article::where('status', 'published')->orderBy('created_at', 'desc')->take(5)->get();
foreach($articles as $a) {
    echo "https://techynews.lat/article/" . $a->slug . "\n";
}
