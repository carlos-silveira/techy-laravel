<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$articles = \App\Models\Article::orderBy('created_at', 'desc')->take(20)->get(['id', 'title', 'created_at']);
echo json_encode($articles, JSON_PRETTY_PRINT);
