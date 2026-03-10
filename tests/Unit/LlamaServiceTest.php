<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\LlamaService;
use Illuminate\Support\Facades\Http;

class LlamaServiceTest extends TestCase
{
    public function test_it_generates_brief_correctly()
    {
        Http::fake([
            'localhost:11434/api/generate' => Http::response(['response' => 'Mock AI Brief'], 200)
        ]);

        $service = new LlamaService();
        $newsItems = [
            ['title' => 'Tech News 1'],
            ['title' => 'Tech News 2']
        ];

        $brief = $service->generateBrief($newsItems);

        $this->assertEquals('Mock AI Brief', $brief);
        Http::assertSent(function ($request) {
            return str_contains($request->url(), 'generate') &&
                $request['model'] === 'llama3' &&
                str_contains($request['prompt'], 'Tech News 1');
        });
    }

    public function test_it_handles_llama_api_failure_gracefully()
    {
        Http::fake([
            'localhost:11434/api/generate' => Http::response(null, 500)
        ]);

        $service = new LlamaService();
        $brief = $service->generateBrief([]);

        $this->assertStringContainsString('Error: Could not generate content', $brief);
    }
}
