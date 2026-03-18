<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cookie;

class LanguageController extends Controller
{
    /**
     * Change the language manually.
     */
    public function setLocale(Request $request)
    {
        $locale = $request->input('locale');
        
        if (!in_array($locale, ['en', 'es', 'pt'])) {
            return response()->json(['error' => 'Unsupported locale'], 400);
        }

        Session::put('locale', $locale);
        
        // Also set a long-lived cookie
        return response()->json(['success' => true])
            ->withCookie(cookie()->forever('locale', $locale));
    }
}
