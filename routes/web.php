<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LanguageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
|*/

Route::get('/', [PublicController::class, 'index']);
Route::get('/article/{slug}', [PublicController::class, 'show']);
Route::get('/about', [AboutController::class, 'index']);
Route::get('/archive', [ArchiveController::class, 'index']);
Route::post('/set-locale', [LanguageController::class, 'setLocale']);

Route::get('/seed-categories-invincible', function () {
    // OS-level background fork. This makes the database seed entirely immune to cPanel FPM limits
    // and returns immediately, allowing the background server process to take as long as it needs.
    $command = "cd " . escapeshellarg(base_path()) . " && /usr/local/bin/php -d memory_limit=512M artisan news:generate-daily > /dev/null 2>&1 && /usr/local/bin/php -d memory_limit=512M artisan news:seed-categories > /dev/null 2>&1 &";
    exec($command);
    return "Generation dispatched to host OS successfully. Please wait up to 10 minutes for full DB repopulation.";
});

Route::get('/run-image-update', function () {
    $command = "cd " . escapeshellarg(base_path()) . " && /usr/local/bin/php artisan news:update-images > storage/logs/image-update.log 2>&1 &";
    exec($command);
    return "Mass image updater dispatched. Check /read-seed-log (temporarily repointed to image-update.log)";
});

Route::get('/sysinfo', function () {
    return "<pre>" .
           "PHP Version: " . phpversion() . "\n" .
           "which php: " . shell_exec('which php') . "\n" .
           "crontab -l: " . shell_exec('crontab -l') . "\n" .
           "</pre>";
});

Route::get('/read-seed-log', function () {
    $logPath = storage_path('logs/image-update.log');
    if (!file_exists($logPath)) {
        // Fallback
        $logPath = storage_path('logs/laravel.log');
    }
    
    if (!file_exists($logPath)) {
        return "Log file not found.";
    }
    // Read the last 500 lines using shell_exec for speed
    $output = shell_exec("tail -n 500 " . escapeshellarg($logPath));
    return "<pre>" . htmlspecialchars($output ?? '') . "</pre>";
});

Route::get('/force-migrate', function () {
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        return "<pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";
    } catch (\Exception $e) {
        return "<pre>Error: " . $e->getMessage() . "\n" . $e->getTraceAsString() . "</pre>";
    }
});

// Protected routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Article Authoring Routes
    Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
    Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
    Route::put('/articles/{id}', [ArticleController::class, 'update'])->name('articles.update');
    Route::delete('/articles/{id}', [ArticleController::class, 'destroy'])->name('articles.destroy');
    Route::post('/articles/{id}/publish', [ArticleController::class, 'publish'])->name('articles.publish');

    // Maintenance / Fix Tools
    Route::get('/maintenance/fix-encoding', function () {
        \Illuminate\Support\Facades\Artisan::call('article:fix-encoding');
        return "Fix command executed. Result: <pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";
    })->name('maintenance.fix-encoding');

    // Media Uploads
    Route::post('/upload-image', [ImageUploadController::class, 'store'])->name('image.upload');
});

require __DIR__ . '/auth.php';
