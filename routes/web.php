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
use App\Http\Controllers\SeoController;

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
Route::get('/sitemap.xml', [SeoController::class, 'sitemap']);
Route::get('/feed', [SeoController::class, 'rss']);

Route::get('/about', [AboutController::class, 'index']);
Route::get('/archive', [ArchiveController::class, 'index']);
Route::get('/terms', function () { return inertia('Terms'); });
Route::get('/privacy', function () { return inertia('Privacy'); });
Route::post('/set-locale', [LanguageController::class, 'setLocale']);

// ─── ADMIN ROUTES (Token-Gated) ────────────────────────────────────────────
// All admin routes require ?token=<ADMIN_SECRET> to prevent unauthorized access.
// Set ADMIN_SECRET in your .env (defaults to a hash of APP_KEY for zero-config security).

Route::middleware([])->group(function () {
    $gate = function () {
        $secret = env('ADMIN_SECRET', substr(md5(env('APP_KEY', 'fallback')), 0, 16));
        if (request()->query('token') !== $secret) {
            abort(404);
        }
    };

    Route::get('/admin/seed', function () use ($gate) {
        $gate();
        $command = "cd " . escapeshellarg(base_path()) . " && /usr/local/bin/php -d memory_limit=512M artisan news:generate-daily > /dev/null 2>&1 && /usr/local/bin/php -d memory_limit=512M artisan news:seed-categories > /dev/null 2>&1 &";
        exec($command);
        return "Generation dispatched.";
    });

    Route::get('/admin/images', function () use ($gate) {
        $gate();
        $command = "cd " . escapeshellarg(base_path()) . " && /usr/local/bin/php artisan news:update-images > storage/logs/image-update.log 2>&1 &";
        exec($command);
        return "Image updater dispatched.";
    });

    Route::get('/admin/twitter-sync', function () use ($gate) {
        $gate();
        $command = "cd " . escapeshellarg(base_path()) . " && /usr/local/bin/php artisan social:sync-backlog > storage/logs/twitter-sync.log 2>&1 &";
        exec($command);
        return "Twitter sync dispatched.";
    });

    Route::get('/admin/logs', function () use ($gate) {
        $gate();
        $logPath = storage_path('logs/laravel.log');
        if (!file_exists($logPath)) return "No logs.";
        $output = shell_exec("tail -n 200 " . escapeshellarg($logPath));
        return "<pre>" . htmlspecialchars($output ?? '') . "</pre>";
    });

    Route::get('/admin/migrate', function () use ($gate) {
        $gate();
        try {
            \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
            return "<pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";
        } catch (\Exception $e) {
            return "<pre>Error: " . $e->getMessage() . "</pre>";
        }
    });

    Route::post('/_m/ci-cd', function () use ($gate) {
        try {
            $gate();

            if (!request()->hasFile('deployFile')) {
                return response()->json(['status' => 'error', 'message' => 'No file uploaded'], 400);
            }

            $file = request()->file('deployFile');
            $zipPath = base_path('deploy-temp.zip');
            
            // Log for debugging
            $output = ["Starting deployment logic..."];
            
            $file->move(base_path(), 'deploy-temp.zip');
            $output[] = "File moved to base_path.";

            $base = base_path();
            $php = '/opt/alt/php85/usr/bin/php';
            $artisan = $base . '/artisan';

            exec("cd ".escapeshellarg($base)." && /usr/bin/unzip -o deploy-temp.zip 2>&1", $zipOut);
            $output[] = "Unzip: " . implode("\n", $zipOut);
            @unlink($zipPath);

            exec("$php $artisan migrate --force 2>&1", $migOut);
            $output[] = "Migrate: " . implode("\n", $migOut);
            
            exec("$php $artisan storage:fix 2>&1", $storeOut);
            $output[] = "Storage Fix: " . implode("\n", $storeOut);

            exec("$php $artisan optimize 2>&1", $optOut);
            $output[] = "Optimize: " . implode("\n", $optOut);

            exec("$php $artisan queue:restart 2>&1", $queueOut);
            $output[] = "Queue Restart: " . implode("\n", $queueOut);

            return response()->json([
                'status' => 'success',
                'logs' => implode("\n\n", $output)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'trace' => substr($e->getTraceAsString(), 0, 500)
            ], 500);
        }
    });
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
