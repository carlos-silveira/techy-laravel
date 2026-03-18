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
        
        // Ensure the locale is stored in session if it's the first time
        if (!Session::has('locale')) {
            Session::put('locale', $locale);
        }

        return $next($request);
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
