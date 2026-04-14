<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cache;

class LanguageController extends Controller
{
    /**
     * Change the language and bust the locale-specific page caches.
     * This ensures that when a user switches to Spanish/Portuguese,
     * they don't see stale English content that was previously cached
     * under the new locale's cache key.
     */
    public function setLocale(Request $request)
    {
        $locale = $request->input('locale');

        if (!in_array($locale, ['en', 'es', 'pt'])) {
            return response()->json(['error' => 'Unsupported locale'], 400);
        }

        $old = Session::get('locale', 'en');
        Session::put('locale', $locale);

        // Bust all locale-specific homepage/article page caches
        // so that fresh translated content is served immediately.
        if ($old !== $locale) {
            foreach (['en', 'es', 'pt'] as $lang) {
                Cache::forget("homepage_articles_{$lang}");
                Cache::forget("homepage_editors_choice_{$lang}");
                Cache::forget("homepage_trending_{$lang}");
                Cache::forget("homepage_daily_brief_{$lang}");
            }
        }

        return response()->json(['success' => true, 'locale' => $locale])
            ->withCookie(cookie()->forever('locale', $locale));
    }
}
