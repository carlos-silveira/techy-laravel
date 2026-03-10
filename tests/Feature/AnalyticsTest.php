<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AnalyticsTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_analytics_endpoint_returns_correct_stats()
    {
        Article::forceCreate([
            'title' => 'Top Article 1',
            'slug' => 'top-article-1',
            'content' => json_encode([]),
            'status' => 'published',
            'views_count' => 100,
        ]);

        Article::forceCreate([
            'title' => 'Top Article 2',
            'slug' => 'top-article-2',
            'content' => json_encode([]),
            'status' => 'published',
            'views_count' => 50,
        ]);

        Article::forceCreate([
            'title' => 'Draft',
            'slug' => 'draft',
            'content' => json_encode([]),
            'status' => 'draft',
            'views_count' => 1000, // Should not be counted
        ]);

        $response = $this->getJson('/api/analytics/dashboard');

        $response->assertStatus(200);

        $response->assertJson([
            'total_views' => 150,
            'total_articles' => 2,
        ]);

        // Check top articles sorting
        $topArticles = $response->json('top_articles');
        $this->assertCount(2, $topArticles);
        $this->assertEquals('Top Article 1', $topArticles[0]['title']);
    }
}
