<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

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

        // Terminate early if it's a known bot, a static asset, an internal API call, or from an admin
        if ($this->shouldIgnore($request)) {
            return $response;
        }

        try {
            // Anonymize IP address (e.g. hash of IP + UserAgent to separate unique devices uniquely without storing the raw IP)
            $ipRaw = $request->ip();
            $userAgent = $request->userAgent();
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
                    if ($article) {
                        $articleId = $article->id;
                    }
                }
            }

            DB::table('page_views')->insert([
                'url' => substr($request->fullUrl(), 0, 255),
                'route_name' => $request->route() ? $request->route()->getName() : null,
                'session_id' => $request->session()->getId(),
                'ip_address' => $ipHash,
                'user_agent' => substr($userAgent, 0, 500),
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
        // Ignore auth/admin panel routes
        if ($request->is('dashboard*') || $request->is('admin*') || $request->is('login') || $request->is('register')) {
            return true;
        }

        // Ignore API routes
        if ($request->is('api/*')) {
            return true;
        }

        // Ignore utility routes
        if ($request->is('sysinfo') || $request->is('run-image-*') || $request->is('read-seed-log') || $request->is('seed-*')) {
            return true;
        }

        // Ignore extremely simple bots and prefetch requests
        $userAgent = strtolower($request->userAgent() ?? '');
        $botKeywords = ['bot', 'crawler', 'spider', 'slurp', 'inspect', 'lighthouse', 'health'];
        foreach ($botKeywords as $bot) {
            if (str_contains($userAgent, $bot)) {
                return true;
            }
        }

        return false;
    }
}
