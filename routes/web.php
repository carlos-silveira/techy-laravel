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
    ignore_user_abort(true);
    set_time_limit(600); // 10 minutes max
    \Illuminate\Support\Facades\Artisan::call('news:seed-categories');
    return "Seeding process completed perfectly in the background execution.";
});

Route::get('/read-seed-log', function() {
    $path = storage_path('logs/laravel.log');
    if (file_exists($path)) {
        // Read the last 20000 bytes
        $file = fopen($path, 'r');
        fseek($file, -20000, SEEK_END);
        $content = fread($file, 20000);
        fclose($file);
        return "<pre>" . htmlspecialchars($content) . "</pre>";
    }
    return "No log found.";
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
