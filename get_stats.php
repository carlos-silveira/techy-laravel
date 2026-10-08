<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$total = \App\Models\Article::count();
$draft = \App\Models\Article::where('status', 'draft')->count();
$published = \App\Models\Article::where('status', 'published')->count();

$failedFactCheck = \App\Models\Article::where('fact_check_status', 'failed')->count();

echo "Total: $total\nPublished: $published\nDraft (Failed Fact Check): $failedFactCheck\n";
