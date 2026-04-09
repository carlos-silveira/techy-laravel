<?php
$logFile = __DIR__ . '/../storage/logs/laravel.log';
if (file_exists($logFile)) {
    echo "Last 50 lines of laravel.log:\n";
    $output = shell_exec("tail -n 50 " . escapeshellarg($logFile));
    echo $output;
} else {
    echo "Log file not found at: $logFile\n";
    // Try listing storage dir
    echo "Listing storage/logs:\n";
    print_r(scandir(__DIR__ . '/../storage/logs'));
}
?>
