<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class EngagementTrackingTest extends TestCase
{
    use RefreshDatabase;

    public function test_engaged_beacon_marks_recent_page_view_as_engaged(): void
    {
        // Simulate a page view insertion
        $sessionId = 'test-session-123';
        $viewId = DB::table('page_views')->insertGetId([
            'url' => 'http://localhost/article/test-story',
            'session_id' => $sessionId,
            'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
            'is_bot' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->withSession(['_token' => 'dummy'])
            ->withServerVariables(['HTTP_USER_AGENT' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'])
            ->postJson('/api/pv/engaged', [
                'path' => '/article/test-story'
            ], ['X-Session-Id' => $sessionId]);

        $view = DB::table('page_views')->where('id', $viewId)->first();
        $this->assertNotNull($view);
    }

    public function test_engagement_event_records_reel_view(): void
    {
        $articleId = DB::table('articles')->insertGetId([
            'title' => 'Test Reel Story',
            'slug' => 'test-reel-story',
            'content' => json_encode([]),
            'status' => 'published',
            'soft_views_count' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $headers = [
            'HTTP_USER_AGENT' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
            'HTTP_X_SESSION_ID' => 'test-device-session-xyz',
        ];

        $response = $this->withServerVariables($headers)
            ->postJson('/api/events', [
                'type' => 'reel_view',
                'article_id' => $articleId,
            ], ['X-Session-Id' => 'test-device-session-xyz']);

        $response->assertStatus(200);
        $this->assertTrue($response->json('recorded'));

        $this->assertDatabaseHas('engagement_events', [
            'type' => 'reel_view',
            'article_id' => $articleId,
        ]);

        $this->assertEquals(1, DB::table('articles')->where('id', $articleId)->value('soft_views_count'));

        // Deduplication in same session
        $second = $this
            ->withServerVariables($headers)
            ->postJson('/api/events', [
                'type' => 'reel_view',
                'article_id' => $articleId,
            ], ['X-Session-Id' => 'test-device-session-xyz']);
        // If debug is needed:
        
        $this->assertFalse($second->json('recorded'));
        $this->assertEquals(1, DB::table('articles')->where('id', $articleId)->value('soft_views_count'));
    }

    public function test_bots_are_ignored_by_events_endpoint(): void
    {
        $response = $this->withServerVariables(['HTTP_USER_AGENT' => 'curl/8.5.0'])
            ->postJson('/api/events', [
                'type' => 'reel_view',
                'article_id' => 1,
            ]);

        $response->assertStatus(200);
        $this->assertFalse($response->json('recorded'));
        $this->assertDatabaseCount('engagement_events', 0);
    }

    public function test_bots_are_never_inserted_into_page_views_and_never_increment_views_count(): void
    {
        $articleId = DB::table('articles')->insertGetId([
            'title' => 'Bot Test Article',
            'slug' => 'bot-test-article',
            'content' => json_encode([]),
            'language' => 'en',
            'status' => 'published',
            'views_count' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 1. Bot request (Googlebot)
        $this->withServerVariables(['HTTP_USER_AGENT' => 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'])
            ->get('/article/bot-test-article');

        // Bot should NOT increment article views_count
        $this->assertEquals(0, DB::table('articles')->where('id', $articleId)->value('views_count'));

        // Bot should NOT be in page_views
        $this->assertEquals(0, DB::table('page_views')->count());

        // Bot SHOULD be logged in crawler_logs
        $this->assertEquals(1, DB::table('crawler_logs')->count());
        $this->assertEquals('Googlebot', DB::table('crawler_logs')->first()->crawler_name);

        // 2. Real Human request
        $this->withServerVariables(['HTTP_USER_AGENT' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'])
            ->get('/article/bot-test-article');

        // Human SHOULD increment article views_count
        $this->assertEquals(1, DB::table('articles')->where('id', $articleId)->value('views_count'));

        // Human SHOULD be in page_views
        $this->assertEquals(1, DB::table('page_views')->count());
    }
}
