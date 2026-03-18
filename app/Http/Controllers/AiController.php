<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\GeminiService;
use App\Services\NewsService;
use Illuminate\Http\JsonResponse;

class AiController extends Controller
{
    private GeminiService $geminiService;
    private NewsService $newsService;

    public function __construct(GeminiService $geminiService, NewsService $newsService)
    {
        $this->geminiService = $geminiService;
        $this->newsService = $newsService;
    }

    /**
     * Fetch today's news and generate prompt ideas.
     */
    public function generateIdeas(): JsonResponse
    {
        try {
            $news = $this->newsService->fetchTodayTechNews();
            $ideas = $this->geminiService->generateIdeas($news);
            return response()->json(['ideas' => $ideas]);
        } catch (\RuntimeException $e) {
            return response()->json(['error' => $e->getMessage(), 'ideas' => []], 503);
        }
    }

    /**
     * Auto-draft a full article based on an idea.
     */
    public function generateDraft(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string',
            'prompt' => 'required|string'
        ]);

        try {
            $news = $this->newsService->fetchTodayTechNews();
            $draft = $this->geminiService->generateDraft(
                $request->input('title'),
                $request->input('prompt'),
                $news
            );
            return response()->json(['draft' => $draft]);
        } catch (\RuntimeException $e) {
            return response()->json(['error' => $e->getMessage()], 503);
        }
    }

    /**
     * Regenerate a draft with user feedback.
     */
    public function regenerateDraft(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string',
            'prompt' => 'required|string',
            'feedback' => 'nullable|string',
            'previous_draft' => 'nullable|string',
        ]);

        try {
            $draft = $this->geminiService->regenerateDraft(
                $request->input('title'),
                $request->input('prompt'),
                $request->input('feedback', ''),
                $request->input('previous_draft', '')
            );
            return response()->json(['draft' => $draft]);
        } catch (\RuntimeException $e) {
            return response()->json(['error' => $e->getMessage()], 503);
        }
    }

    /**
     * Generate article metadata (summary, SEO, tags).
     */
    public function generateArticleMeta(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
        ]);

        try {
            $meta = $this->geminiService->generateArticleMeta(
                $request->input('title'),
                $request->input('content')
            );
            return response()->json(['meta' => $meta]);
        } catch (\RuntimeException $e) {
            return response()->json(['error' => $e->getMessage(), 'meta' => []], 503);
        }
    }

    /**
     * Perform specific context-aware actions in the editor.
     */
    public function editorAction(Request $request): JsonResponse
    {
        $request->validate([
            'action' => 'required|string|in:continue,summarize,professional,fix_grammar',
            'text' => 'required|string'
        ]);

        try {
            $result = $this->geminiService->editorAction(
                $request->input('action'),
                $request->input('text')
            );
            return response()->json(['result' => $result]);
        } catch (\RuntimeException $e) {
            return response()->json(['error' => $e->getMessage()], 503);
        }
    }

    /**
     * Handle multi-turn conversational AI for the Studio.
     */
    public function studioChat(Request $request): JsonResponse
    {
        $request->validate([
            'message' => 'required|string',
            'history' => 'nullable|array',
            'editor_context' => 'nullable|array'
        ]);

        $response = $this->geminiService->studioChat(
            $request->input('message'),
            $request->input('history', []),
            $request->input('editor_context', [])
        );

        return response()->json(['response' => $response]);
    }

    /**
     * Generate SEO metadata (description and keywords).
     */
    public function generateSeoTags(Request $request): JsonResponse
    {
        $request->validate(['content' => 'required|string']);

        try {
            $meta = $this->geminiService->generateArticleMeta('', $request->input('content'));
            return response()->json([
                'description' => $meta['meta_description'] ?? '',
                'keywords' => $meta['seo_keywords'] ?? '',
            ]);
        } catch (\RuntimeException $e) {
            return response()->json(['error' => $e->getMessage()], 503);
        }
    }

    /**
     * Generate a visual prompt for image generation.
     */
    public function generateImagePrompt(Request $request): JsonResponse
    {
        $request->validate(['content' => 'required|string']);

        try {
            $result = $this->geminiService->editorAction('summarize', $request->input('content'));
            $prompt = "Create a stunning, atmospheric, futuristic image: " . $result;
            return response()->json(['prompt' => $prompt]);
        } catch (\RuntimeException $e) {
            return response()->json(['error' => $e->getMessage()], 503);
        }
    }
}
