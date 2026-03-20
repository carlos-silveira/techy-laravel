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
    public function it_generates_a_draft_article_as_array()
    {
        config(['services.gemini.api_key' => 'test-key']);

        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [[
                    'content' => [
                        'parts' => [[
                            'text' => '{"titular": "Refactored Title", "tldr_twitter": "Short summary", "cuerpo_noticia": "<p>Content</p>", "categoria_principal": "Artificial Intelligence"}'
                        ]]
                    ]
                ]]
            ], 200)
        ]);

        $service = new GeminiService();
        $result = $service->generateDraft('Test Title', 'A test prompt', []);

        $this->assertIsArray($result);
        $this->assertEquals('Refactored Title', $result['titular']);
        $this->assertEquals('Short summary', $result['tldr_twitter']);
        $this->assertEquals('Artificial Intelligence', $result['categoria_principal']);
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
    public function it_handles_gemini_api_errors_gracefully_by_throwing_on_non_json_requests()
    {
        config(['services.gemini.api_key' => 'test-key']);

        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response(['error' => 'Bad request'], 400)
        ]);

        $service = new GeminiService();

        $this->expectException(\RuntimeException::class);
        // regenerateDraft calls callGemini with expectJson = false, so it should throw
        $service->regenerateDraft('Test', 'Prompt', 'Feedback', 'Old');
    }

    /** @test */
    public function it_generates_daily_brief()
    {
        config(['services.gemini.api_key' => 'test-key']);

        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [[
                    'content' => [
                        'parts' => [[
                            'text' => 'This is a daily brief summary.'
                        ]]
                    ]
                ]]
            ], 200)
        ]);

        $service = new GeminiService();
        $brief = $service->generateDailyBrief([
            ['title' => 'News 1', 'description' => 'Desc 1', 'source' => 'Test']
        ]);

        $this->assertIsString($brief);
        $this->assertEquals('This is a daily brief summary.', $brief);
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

    /** @test */
    public function it_converts_tiptap_json_to_html()
    {
        $json = [
            'type' => 'doc',
            'content' => [
                [
                    'type' => 'heading',
                    'attrs' => ['level' => 2],
                    'content' => [['type' => 'text', 'text' => 'Hello World']]
                ],
                [
                    'type' => 'paragraph',
                    'content' => [
                        ['type' => 'text', 'text' => 'This is '],
                        ['type' => 'text', 'marks' => [['type' => 'bold']], 'text' => 'bold'],
                        ['type' => 'text', 'text' => ' and '],
                        ['type' => 'text', 'marks' => [['type' => 'italic']], 'text' => 'italic'],
                        ['type' => 'text', 'text' => '.']
                    ]
                ]
            ]
        ];

        $service = new GeminiService();
        $html = $service->tipTapToHtml($json);

        $this->assertStringContainsString('<h2>Hello World</h2>', $html);
        $this->assertStringContainsString('<p>This is <strong>bold</strong> and <em>italic</em>.</p>', $html);
    }
}
