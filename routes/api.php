<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AiController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\NewsletterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public AI API for Editor
Route::post('/generate-brief', [AiController::class, 'generateBrief']);
Route::post('/generate-seo', [AiController::class, 'generateSeoTags']);
Route::post('/generate-image-prompt', [AiController::class, 'generateImagePrompt']);
use App\Http\Controllers\LanguageController;

Route::post('/set-locale', [LanguageController::class, 'setLocale']);

Route::get('/generate-ideas', [AiController::class, 'generateIdeas']);
Route::post('/generate-draft', [AiController::class, 'generateDraft']);
Route::post('/editor-action', [AiController::class, 'editorAction']);
Route::post('/studio-chat', [AiController::class, 'studioChat']);
Route::post('/regenerate-draft', [AiController::class, 'regenerateDraft']);
Route::post('/generate-article-meta', [AiController::class, 'generateArticleMeta']);

// Public Analytics & Engagement
Route::get('/analytics/dashboard', [AnalyticsController::class, 'dashboardStats']);
Route::post('/subscribe', [NewsletterController::class, 'store']);
Route::post('/articles/{id}/like', [ArticleController::class, 'like']);
Route::get('/articles/{id}/stats', [AnalyticsController::class, 'articleStats']);

// Global Discovery
Route::get('/search', [\App\Http\Controllers\PublicController::class, 'search']);

// Protected API Routes (if any) using Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/ask-llama', [AiController::class, 'askLlama']);
});
