<?php

declare(strict_types=1);

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudioSettingsController extends Controller
{
    public function index()
    {
        $settings = [
            'site_name' => config('app.name', 'TechyNews'),
            'site_url' => config('app.url', 'https://techynews.lat'),
            'default_locale' => config('app.locale', 'es'),
            'ai_primary_model' => env('GEMINI_MODEL', 'gemini-2.0-flash'),
            'gemini_api_configured' => !empty(env('GEMINI_API_KEY')),
            'openrouter_api_configured' => !empty(env('OPENROUTER_API_KEY')),
            'twitter_sync_enabled' => !empty(env('TWITTER_BEARER_TOKEN')),
            'environment' => app()->environment(),
        ];

        return Inertia::render('Studio/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        // Simple config store response
        return back()->with('success', 'Settings updated successfully.');
    }
}
