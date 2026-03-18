<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class WizardApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        config(['services.gemini.api_key' => 'test-key']);
    }

    /** @test */
    public function wizard_can_fetch_ideas()
    {
        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [[
                    'content' => ['parts' => [['text' => '[{"title": "Test Idea", "prompt": "Brief"}]']]]
                ]]
            ], 200),
            '*' => Http::response(
                '<?xml version="1.0"?><rss><channel><item><title>Test</title><description>Desc</description></item></channel></rss>',
                200
            ),
        ]);

        $response = $this->getJson('/api/generate-ideas');
        $response->assertStatus(200);
        $response->assertJsonStructure(['ideas']);
    }

    /** @test */
    public function wizard_can_generate_draft()
    {
        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [[
                    'content' => ['parts' => [['text' => '<h2>Draft</h2><p>Content</p>']]]
                ]]
            ], 200),
            '*' => Http::response(
                '<?xml version="1.0"?><rss><channel><item><title>Test</title><description>Desc</description></item></channel></rss>',
                200
            ),
        ]);

        $response = $this->postJson('/api/generate-draft', [
            'title' => 'Test Article',
            'prompt' => 'Write about testing'
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['draft']);
    }

    /** @test */
    public function wizard_can_regenerate_draft_with_feedback()
    {
        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [[
                    'content' => ['parts' => [['text' => '<h2>Revised</h2><p>Updated content.</p>']]]
                ]]
            ], 200),
        ]);

        $response = $this->postJson('/api/regenerate-draft', [
            'title' => 'Test Article',
            'prompt' => 'Write about testing',
            'feedback' => 'Make it funnier',
            'previous_draft' => '<p>Old content</p>'
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['draft']);
    }

    /** @test */
    public function wizard_can_generate_article_meta()
    {
        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [[
                    'content' => ['parts' => [['text' => '{"summary":"Sum","meta_description":"Desc","seo_keywords":"kw","tags":["t"]}']]]
                ]]
            ], 200),
        ]);

        $response = $this->postJson('/api/generate-article-meta', [
            'title' => 'Test',
            'content' => '<p>Test content</p>'
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['meta']);
    }

    /** @test */
    public function wizard_returns_503_when_gemini_api_key_missing()
    {
        config(['services.gemini.api_key' => '']);

        $response = $this->postJson('/api/generate-draft', [
            'title' => 'Test',
            'prompt' => 'Test'
        ]);

        $response->assertStatus(503);
        $response->assertJsonStructure(['error']);
        $response->assertJsonFragment(['error' => 'GEMINI_API_KEY is not configured. Please set it in your .env file.']);
    }

    /** @test */
    public function wizard_validates_required_fields()
    {
        $response = $this->postJson('/api/generate-draft', []);
        $response->assertStatus(422);
    }

    /** @test */
    public function wizard_full_flow_creates_published_article()
    {
        $this->actingAs($this->user);

        $response = $this->postJson('/articles', [
            'title' => 'Wizard Created Article',
            'content' => '<h2>Test</h2><p>Content from wizard</p>',
            'is_published' => true,
            'is_editors_choice' => true,
            'meta_description' => 'SEO description',
            'seo_keywords' => 'test, wizard',
            'tags' => ['testing', 'wizard']
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('articles', [
            'title' => 'Wizard Created Article',
            'status' => 'published',
            'is_editors_choice' => true
        ]);

        $article = Article::where('title', 'Wizard Created Article')->first();
        $this->assertStringContainsString('<h2>Test</h2>', $article->content);
        $this->assertEquals(['testing', 'wizard'], $article->tags);
    }
}
