<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use Stevebauman\Location\Facades\Location;
use App\Services\BotDetector;

class TrackPageView
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Terminate early for non-navigations (POST/XHR), internal tools, API calls and admins
        if ($this->shouldIgnore($request)) {
            return $response;
        }

        try {
            // Anonymize IP address (e.g. hash of IP + UserAgent to separate unique devices uniquely without storing the raw IP)
            $ipRaw = $request->ip();
            $userAgent = $request->userAgent();
            $isBot = app(BotDetector::class)->isBot($userAgent);
            $ipHash = hash('sha256', $ipRaw . $userAgent . env('APP_KEY'));

            // Check if it's an article page
            $articleId = null;
            if ($request->routeIs('articles.show') || $request->is('article/*')) {
                // If the route doesn't have model binding, we might need to parse.
                // Assuming it's `/article/{slug}` and public controller doesn't use model binding natively in route,
                // we'll find the article ID by slug.
                $slug = $request->segment(2);
                if ($slug) {
                    $article = DB::table('articles')->where('slug', $slug)->first(['id']);
                    $articleId = $article?->id;
                }
            }

            // Lookup location before hashing IP
            $country = null;
            try {
                if ($position = Location::get($ipRaw)) {
                    $country = $position->countryCode;
                }
            } catch (\Exception $e) {
                // Ignore location errors
            }

            DB::table('page_views')->insert([
                'url' => substr($request->fullUrl(), 0, 255),
                'referrer' => substr($request->headers->get('referer', ''), 0, 255),
                'utm_source' => substr($request->query('utm_source', ''), 0, 100),
                'route_name' => $request->route() ? $request->route()->getName() : null,
                'session_id' => $request->session()->getId(),
                'ip_address' => $ipHash,
                'country' => $country,
                'user_agent' => substr((string) $userAgent, 0, 500),
                'is_bot' => $isBot,
                'article_id' => $articleId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } catch (\Exception $e) {
            // Silently fail, tracking should never break the main app
            \Illuminate\Support\Facades\Log::warning('Analytics tracker failed: ' . $e->getMessage());
        }

        return $response;
    }

    private function shouldIgnore(Request $request): bool
    {
        // Only count page navigations. POSTs (likes, comments, beacons) are never page views.
        if (! $request->isMethod('GET')) {
            return true;
        }

        // Prefetch requests are not real visits
        if ($request->headers->get('Purpose') === 'prefetch' || $request->headers->get('Sec-Purpose') === 'prefetch') {
            return true;
        }

        // Ignore Admin IP addresses
        $adminIps = array_filter(array_map('trim', explode(',', env('ADMIN_IPS', ''))));
        if (!empty($adminIps) && in_array($request->ip(), $adminIps)) {
            return true;
        }

        // Ignore auth/admin panel routes
        if ($request->is('dashboard*') || $request->is('admin*') || $request->is('login') || $request->is('register')) {
            return true;
        }

        // Ignore API routes
        if ($request->is('api/*')) {
            return true;
        }

        // Ignore utility and admin routes
        if ($request->is('sysinfo') || $request->is('sitemap.xml') || $request->is('_m/*')) {
            return true;
        }

        // Ignore prefetch/lighthouse (internal tools, not real visitors or crawlers)
        $userAgent = strtolower($request->userAgent() ?? '');
        $internalTools = ['lighthouse', 'pagespeed', 'headlesschrome/'];
        foreach ($internalTools as $tool) {
            if (str_contains($userAgent, $tool)) {
                return true;
            }
        }

        // NOTE: Bots are still stored (flagged with is_bot = true) so the dashboard can
        // show crawler activity, but they are excluded from every human metric.

        return false;
    }
}
