<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$data = \Illuminate\Support\Facades\DB::table('gemini_logs')
    ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, model_name, SUM(total_tokens) as tokens, COUNT(*) as requests")
    ->groupBy('month', 'model_name')
    ->get();
echo json_encode($data, JSON_PRETTY_PRINT);
