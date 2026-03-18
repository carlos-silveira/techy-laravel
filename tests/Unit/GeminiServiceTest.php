<?php

namespace Tests\Unit;

use App\Services\GeminiService;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class GeminiServiceTest extends TestCase
{
    /** @test */
    public function it_throws_when_api_key_is_missing()
    {
        config(['services.gemini.api_key' => '']);

        $service = new GeminiService();

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('GEMINI_API_KEY is not configured');

        $service->generateDraft('Test Title', 'Test prompt', []);
    }

    /** @test */
    public function it_generates_ideas_from_news_items()
    {
        config(['services.gemini.api_key' => 'test-key']);

        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [[
                    'content' => [
                        'parts' => [[
                            'text' => '[{"title": "Test Idea", "prompt": "An editorial brief"}]'
                        ]]
                    ]
                ]]
            ], 200)
        ]);

        $service = new GeminiService();
        $ideas = $service->generateIdeas([
            ['title' => 'News 1', 'description' => 'Desc 1', 'source' => 'Test']
        ]);

        $this->assertIsArray($ideas);
        $this->assertNotEmpty($ideas);
        $this->assertArrayHasKey('title', $ideas[0]);
        $this->assertEquals('Test Idea', $ideas[0]['title']);
    }

    /** @test */
    public function it_returns_fallback_ideas_when_news_is_empty()
    {
        config(['services.gemini.api_key' => 'test-key']);

        $service = new GeminiService();
        $ideas = $service->generateIdeas([]);

        $this->assertIsArray($ideas);
        $this->assertNotEmpty($ideas);
        $this->assertEquals('The State of Developer Tools in 2026', $ideas[0]['title']);
    }

    /** @test */
    public function it_generates_a_draft_article()
    {
        config(['services.gemini.api_key' => 'test-key']);

        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [[
                    'content' => [
                        'parts' => [[
                            'text' => '<h2>Test Article</h2><p>This is a test draft.</p>'
                        ]]
                    ]
                ]]
            ], 200)
        ]);

        $service = new GeminiService();
        $draft = $service->generateDraft('Test Title', 'A test prompt', []);

        $this->assertIsString($draft);
        $this->assertStringContainsString('<h2>Test Article</h2>', $draft);
    }

    /** @test */
    public function it_regenerates_draft_with_feedback()
    {
        config(['services.gemini.api_key' => 'test-key']);

        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [[
                    'content' => [
                        'parts' => [[
                            'text' => '<h2>Improved Article</h2><p>Revised content.</p>'
                        ]]
                    ]
                ]]
            ], 200)
        ]);

        $service = new GeminiService();
        $draft = $service->regenerateDraft(
            'Test Title',
            'A test prompt',
            'Make it shorter',
            '<h2>Old Article</h2><p>Old content.</p>'
        );

        $this->assertIsString($draft);
        $this->assertStringContainsString('<h2>Improved Article</h2>', $draft);
    }

    /** @test */
    public function it_generates_article_meta()
    {
        config(['services.gemini.api_key' => 'test-key']);

        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [[
                    'content' => [
                        'parts' => [[
                            'text' => '{"summary": "A great article", "meta_description": "SEO desc", "seo_keywords": "ai, tech", "tags": ["ai", "tech"]}'
                        ]]
                    ]
                ]]
            ], 200)
        ]);

        $service = new GeminiService();
        $meta = $service->generateArticleMeta('Test Title', '<p>Some content here</p>');

        $this->assertIsArray($meta);
        $this->assertEquals('A great article', $meta['summary']);
        $this->assertEquals('SEO desc', $meta['meta_description']);
        $this->assertIsArray($meta['tags']);
    }

    /** @test */
    public function it_handles_gemini_api_errors_gracefully()
    {
        config(['services.gemini.api_key' => 'test-key']);

        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response(['error' => 'Bad request'], 400)
        ]);

        $service = new GeminiService();

        $this->expectException(\RuntimeException::class);
        $service->generateDraft('Test', 'Prompt', []);
    }

    /** @test */
    public function it_extracts_json_from_markdown_fenced_response()
    {
        config(['services.gemini.api_key' => 'test-key']);

        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [[
                    'content' => [
                        'parts' => [[
                            'text' => "```json\n{\"summary\": \"test\", \"meta_description\": \"desc\", \"seo_keywords\": \"kw\", \"tags\": [\"t1\"]}\n```"
                        ]]
                    ]
                ]]
            ], 200)
        ]);

        $service = new GeminiService();
        $meta = $service->generateArticleMeta('Test', '<p>Content</p>');

        $this->assertEquals('test', $meta['summary']);
    }
}
