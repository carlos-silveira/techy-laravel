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

    /** @test */
    public function it_identifies_invalid_translations()
    {
        $originalLong = '<p>' . str_repeat('Long content for testing purposes. ', 10) . '</p>';

        $this->assertTrue(Article::isInvalidTranslation(null));
        $this->assertTrue(Article::isInvalidTranslation([]));
        $this->assertTrue(Article::isInvalidTranslation(['title' => 'título traducido', 'content' => '<p>contenido HTML traducido</p>']));
        $this->assertTrue(Article::isInvalidTranslation(['title' => 'translated title', 'content' => 'translated html content']));
        $this->assertTrue(Article::isInvalidTranslation(['title' => 'título traduzido', 'content' => 'conteúdo HTML traduzido']));
        $this->assertTrue(Article::isInvalidTranslation(['title' => '...', 'content' => '...']));
        $this->assertTrue(Article::isInvalidTranslation(['title' => 'Valid Title', 'content' => 'too short'], $originalLong));

        $validTranslation = [
            'title' => 'Título Real y Traducido',
            'summary' => 'Resumen descriptivo en español',
            'content' => '<h2>Subtítulo</h2><p>' . str_repeat('Este es un contenido completo y traducido correctamente. ', 5) . '</p>'
        ];
        $this->assertFalse(Article::isInvalidTranslation($validTranslation, $originalLong));
    }
}
