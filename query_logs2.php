<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$logs = \Illuminate\Support\Facades\DB::table('gemini_logs')->get();

$summary = [];
foreach($logs as $log) {
    $month = substr($log->created_at, 0, 7);
    if (!isset($summary[$month])) {
        $summary[$month] = ['gemini_tokens' => 0, 'gemini_req' => 0, 'gemini_cost' => 0, 'openrouter_tokens' => 0, 'openrouter_req' => 0, 'openrouter_cost' => 0];
    }
    
    // Check if native gemini or openrouter
    // Openrouter usually has a provider prefix like google/, nvidia/, meta-llama/ or suffix :free
    $is_gemini_native = str_starts_with($log->model_name, 'gemini-') || $log->model_name === 'google/gemini-2.5-pro' && str_contains($log->cost_estimate, '0.000000'); // Note: it's hard to tell perfectly, but all those :free are openrouter
    
    if (!str_contains($log->model_name, ':free') && (str_starts_with($log->model_name, 'gemini-') || $log->model_name === 'google/gemini-2.5-pro' || $log->model_name === 'google/gemini-2.5-flash')) {
        $summary[$month]['gemini_tokens'] += $log->total_tokens;
        $summary[$month]['gemini_req']++;
        $summary[$month]['gemini_cost'] += $log->cost_estimate;
    } else {
        $summary[$month]['openrouter_tokens'] += $log->total_tokens;
        $summary[$month]['openrouter_req']++;
        $summary[$month]['openrouter_cost'] += $log->cost_estimate;
    }
}

echo json_encode($summary, JSON_PRETTY_PRINT);
