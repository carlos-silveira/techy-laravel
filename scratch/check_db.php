<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$articles = App\Models\Article::whereNotNull('translations')->latest()->limit(5)->get();
foreach ($articles as $a) {
    echo "ID: {$a->id}\n";
    echo "Title: {$a->title}\n";
    echo "DB AI Summary: " . (is_null($a->getRawOriginal('ai_summary')) ? 'NULL' : $a->getRawOriginal('ai_summary')) . "\n";
    echo "Translations: " . json_encode($a->translations) . "\n";
    echo "-------------------\n";
}
