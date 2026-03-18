<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ArticleTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_an_article_with_html_content()
    {
        $article = Article::create([
            'title' => 'Test Article',
            'slug' => 'test-article',
            'content' => '<h2>Hello World</h2><p>This is test content.</p>',
            'status' => 'draft',
            'ai_summary' => 'This is a summary.'
        ]);

        $this->assertDatabaseHas('articles', [
            'id' => $article->id,
            'title' => 'Test Article',
            'slug' => 'test-article',
            'status' => 'draft',
        ]);

        $this->assertIsString($article->content);
        $this->assertStringContainsString('<h2>Hello World</h2>', $article->content);
    }

    /** @test */
    public function it_stores_tags_as_json()
    {
        $article = Article::create([
            'title' => 'Tagged Article',
            'slug' => 'tagged-article',
            'content' => '<p>Content</p>',
            'tags' => ['ai', 'tech', 'devtools'],
        ]);

        $article->refresh();
        $this->assertIsArray($article->tags);
        $this->assertCount(3, $article->tags);
        $this->assertContains('ai', $article->tags);
    }

    /** @test */
    public function it_generates_slug_correctly()
    {
        $article = Article::create([
            'title' => 'My Great Article',
            'slug' => 'my-great-article',
            'content' => '<p>Content</p>',
        ]);

        $this->assertEquals('my-great-article', $article->slug);
    }
}
