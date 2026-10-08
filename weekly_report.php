<?php
require __DIR__ . "/vendor/autoload.php";
$app = require_once __DIR__ . "/bootstrap/app.php";
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$report = Illuminate\Support\Facades\DB::table('articles')
    ->select(Illuminate\Support\Facades\DB::raw('DATE(created_at) as date'), Illuminate\Support\Facades\DB::raw('count(*) as total'))
    ->where('created_at', '>=', now()->subDays(7))
    ->groupBy('date')
    ->orderBy('date', 'desc')
    ->get()
    ->toArray();

print_r($report);
