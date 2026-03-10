<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicFrontendTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_shows_published_articles_only()
    {
        // Custom creation matching Laravel 8 behavior
        $published = Article::forceCreate([
            'title' => 'Published Article',
            'slug' => 'published-article',
            'content' => json_encode(['type' => 'doc', 'content' => []]),
            'status' => 'published',
        ]);

        $draft = Article::forceCreate([
            'title' => 'Draft Article',
            'slug' => 'draft-article',
            'content' => json_encode(['type' => 'doc', 'content' => []]),
            'status' => 'draft',
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertSee('Published Article');
        $response->assertDontSee('Draft Article');
    }

    public function test_article_show_page_accessible_for_published_articles()
    {
        $published = Article::forceCreate([
            'title' => 'Published Show',
            'slug' => 'published-show',
            'content' => json_encode(['type' => 'doc', 'content' => []]),
            'status' => 'published',
        ]);

        $response = $this->get('/article/' . $published->slug);

        $response->assertStatus(200);
        $response->assertSee('Published Show');
    }

    public function test_article_show_page_404s_for_draft_articles()
    {
        $draft = Article::forceCreate([
            'title' => 'Draft Show',
            'slug' => 'draft-show',
            'content' => json_encode(['type' => 'doc', 'content' => []]),
            'status' => 'draft',
        ]);

        $response = $this->get('/article/' . $draft->slug);

        $response->assertStatus(404);
    }

    public function test_article_show_increments_views_count()
    {
        $published = Article::forceCreate([
            'title' => 'Published View Counter',
            'slug' => 'published-view-counter',
            'content' => json_encode(['type' => 'doc', 'content' => []]),
            'status' => 'published',
            'views_count' => 0,
        ]);

        $this->assertEquals(0, $published->views_count);

        $response = $this->get('/article/' . $published->slug);
        $response->assertStatus(200);

        $published->refresh();
        $this->assertEquals(1, $published->views_count);
    }

    public function test_about_page_accessible()
    {
        $response = $this->get('/about');
        $response->assertStatus(200);
    }

    public function test_archive_page_accessible()
    {
        $response = $this->get('/archive');
        $response->assertStatus(200);
    }
}
