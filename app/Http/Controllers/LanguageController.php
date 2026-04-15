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

        // Flush ALL caches when locale changes so every page serves
        // freshly-translated content. This covers homepage, article pages,
        // related-article caches, and daily brief caches.
        if ($old !== $locale) {
            Cache::flush();
        }

        return response()->json(['success' => true, 'locale' => $locale])
            ->withCookie(cookie()->forever('locale', $locale));
    }
}
