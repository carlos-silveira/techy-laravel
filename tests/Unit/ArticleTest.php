<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ArticleTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_can_create_an_article()
    {
        $article = Article::create([
            'title' => 'Test Article',
            'slug' => 'test-article',
            'content' => ['block1' => 'Hello World'],
            'source_url' => 'http://example.com',
            'status' => 'draft',
            'ai_summary' => 'This is a summary.'
        ]);

        $this->assertDatabaseHas('articles', [
            'id' => $article->id,
            'title' => 'Test Article',
            'slug' => 'test-article',
            'status' => 'draft',
        ]);

        $this->assertIsArray($article->content);
        $this->assertEquals('Hello World', $article->content['block1']);
    }
}
