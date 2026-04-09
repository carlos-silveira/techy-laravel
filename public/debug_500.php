<?php
/**
 * Debugging script to identify the cause of HTTP 500 errors on production.
 * This script attempts to boot the Laravel application and catch any 
 * initialization errors.
 */

define('LARAVEL_START', microtime(true));

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

try {
    $kernel = $app->make(Kernel::class);
    
    // Attempt to capture a fake request to see where it fails
    echo "Booting Kernel...\n";
    $request = Request::create('/', 'GET');
    
    // We won't handle the full request to avoid infinite loops or side effects,
    // just test if we can resolve the kernel and basic components.
    echo "Kernel resolved: " . get_class($kernel) . "\n";
    
    echo "Environment: " . $app->environment() . "\n";
    echo "PHP Version: " . PHP_VERSION . "\n";
    
    echo "Success: Application booted basic components.\n";
} catch (\Throwable $e) {
    echo "CRITICAL ERROR CAUGHT:\n";
    echo "Message: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
    echo "Trace:\n" . $e->getTraceAsString() . "\n";
}
