<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\LlamaService;

class AiController extends Controller
{
    private LlamaService $llamaService;

    public function __construct(LlamaService $llamaService)
    {
        $this->llamaService = $llamaService;
    }

    public function generateBrief(Request $request)
    {
        // Mock news items for the dashboard update demo
        $mockNews = [
            ['title' => 'OpenAI Releases New Voice API'],
            ['title' => 'Laravel 12 Introduces New Features'],
            ['title' => 'React 19 RC Now Available']
        ];

        $brief = $this->llamaService->generateBrief($mockNews);

        return response()->json(['brief' => $brief]);
    }

    public function askLlama(Request $request)
    {
        $request->validate([
            'prompt' => 'required|string|max:1000'
        ]);

        $prompt = $request->input('prompt');
        $response = $this->llamaService->draftArticle($prompt, 'professional and concise');

        return response()->json(['response' => $response]);
    }

    public function generateSeo(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $tags = $this->llamaService->generateSeoTags($request->input('content'));

        return response()->json($tags);
    }
}
