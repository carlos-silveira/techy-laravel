<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Article;
use App\Services\BotDetector;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Client-side beacons used to separate real readers from bots:
 *  - POST /api/pv/engaged : the visitor stayed on the page and interacted → "verified reader".
 *  - POST /api/events     : reel_view (>=3s visible) / ad_view (>=50% visible for 1s).
 */
class EngagementController extends Controller
{
    public const TYPE_REEL_VIEW = 'reel_view';
    public const TYPE_AD_VIEW = 'ad_view';

    public function __construct(private readonly BotDetector $botDetector)
    {
    }

    public function engaged(Request $request): JsonResponse
    {
        $data = $request->validate(['path' => ['required', 'string', 'max:255']]);

        if ($this->botDetector->isBot($request->userAgent())) {
            return response()->json(['recorded' => false]);
        }

        try {
            $path = '/' . ltrim((string) parse_url($data['path'], PHP_URL_PATH), '/');
            $base = rtrim($request->getSchemeAndHttpHost(), '/') . $path;

            // Latest not-yet-verified view of this page in this session (last 6 hours).
            $id = DB::table('page_views')
                ->where('session_id', $request->session()->getId())
                ->where('is_bot', false)
                ->whereNull('engaged_at')
                ->where('created_at', '>=', now()->subHours(6))
                ->where(fn ($q) => $q->where('url', $base)->orWhere('url', 'like', $base . '?%'))
                ->orderByDesc('id')
                ->value('id');

            if ($id) {
                DB::table('page_views')->where('id', $id)->update(['engaged_at' => now()]);
            }

            return response()->json(['recorded' => (bool) $id]);
        } catch (\Throwable $e) {
            Log::error('Engaged beacon failed', ['path' => $data['path'], 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);

            return response()->json(['recorded' => false], 500);
        }
    }

    public function event(Request $request): JsonResponse
    {
        $data = $request->validate([
            'type' => ['required', 'in:' . self::TYPE_REEL_VIEW . ',' . self::TYPE_AD_VIEW],
            'article_id' => ['nullable', 'integer'],
            'slot' => ['nullable', 'string', 'max:120'],
        ]);

        if ($this->botDetector->isBot($request->userAgent())) {
            return response()->json(['recorded' => false]);
        }

        try {
            $rawSession = $request->header('X-Session-Id') ?: ($request->hasSession() ? $request->session()->getId() : $request->ip());
            $sessionHash = hash('sha256', $rawSession . config('app.key'));
            $articleId = isset($data['article_id']) && DB::table('articles')->where('id', $data['article_id'])->exists()
                ? (int) $data['article_id']
                : null;
            $slot = $data['slot'] ?? null;

            // Count each (session, type, article, slot) once.
            $query = DB::table('engagement_events')
                ->where('session_hash', $sessionHash)
                ->where('type', $data['type']);
            if ($articleId !== null) {
                $query->where('article_id', $articleId);
            } else {
                $query->whereNull('article_id');
            }
            if ($slot !== null) {
                $query->where('slot', $slot);
            } else {
                $query->whereNull('slot');
            }
            $exists = $query->exists();
            if (app()->environment('testing')) {
                // Log or trace for tests
            }

            if ($exists) {
                return response()->json(['recorded' => false]);
            }

            DB::table('engagement_events')->insert([
                'type' => $data['type'],
                'article_id' => $articleId,
                'slot' => $slot,
                'session_hash' => $sessionHash,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Keep the per-article lifetime counter in sync, but only for verified reel views.
            if ($data['type'] === self::TYPE_REEL_VIEW && $articleId) {
                DB::table('articles')->where('id', $articleId)->increment('soft_views_count');
            }

            return response()->json(['recorded' => true]);
        } catch (\Throwable $e) {
            Log::error('Engagement event failed', ['payload' => $data, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);

            return response()->json(['recorded' => false], 500);
        }
    }
}
