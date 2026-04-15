<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $locale = $this->getPreferredLocale($request);

        App::setLocale($locale);
        
        // Ensure the locale is stored in session and cookie for persistence and cache vary
        if ($request->cookie('locale') !== $locale) {
             \Illuminate\Support\Facades\Cookie::queue('locale', $locale, 60 * 24 * 30); // 30 days
        }
        
        if (Session::get('locale') !== $locale) {
            Session::put('locale', $locale);
        }

        $response = $next($request);
        
        // Add Vary header to tell LiteSpeed/Varnish to cache by locale cookie
        if (method_exists($response, 'header')) {
            $response->header('Vary', 'Cookie');
        }
        
        return $response;
    }

    /**
     * Determine the preferred locale.
     */
    protected function getPreferredLocale(Request $request): string
    {
        // 1. Check session (manual switch)
        if (Session::has('locale')) {
            return Session::get('locale');
        }

        // 2. Check cookie
        if ($request->hasCookie('locale')) {
            return $request->cookie('locale');
        }

        // 3. Detect from browser Accept-Language header
        $browserLocale = $request->getPreferredLanguage(['en', 'es', 'pt']);
        
        return $browserLocale ?: config('app.locale');
    }
}
