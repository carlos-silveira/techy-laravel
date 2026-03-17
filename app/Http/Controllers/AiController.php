<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\LlamaService;
use App\Services\GeminiService;
use App\Services\NewsService;

class AiController extends Controller
{
    private LlamaService $llamaService;
    private GeminiService $geminiService;
    private NewsService $newsService;

    public function __construct(
        LlamaService $llamaService, 
        GeminiService $geminiService,
        NewsService $newsService
    ) {
        $this->llamaService = $llamaService;
        $this->geminiService = $geminiService;
        $this->newsService = $newsService;
    }

    /**
     * Synthesize article content into an executive brief.
     */
    public function generateBrief(Request $request)
    {
        $request->validate(['content' => 'required|string']);
        $brief = $this->llamaService->generateBrief($request->input('content'));

        return response()->json(['brief' => $brief]);
    }

    /**
     * Fetch today's news and generate prompt ideas.
     */
    public function generateIdeas()
    {
        $news = $this->newsService->fetchTodayTechNews();
        $ideas = $this->geminiService->generateIdeas($news);

        return response()->json(['ideas' => $ideas]);
    }

    /**
     * Auto-draft a full article based on an idea.
     */
    public function generateDraft(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'prompt' => 'required|string'
        ]);

        $news = $this->newsService->fetchTodayTechNews();
        $draft = $this->geminiService->generateDraft($request->input('title'), $request->input('prompt'), $news);

        return response()->json(['draft' => $draft]);
    }

    /**
     * Regenerate a draft with user feedback.
     */
    public function regenerateDraft(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'prompt' => 'required|string',
            'feedback' => 'nullable|string',
            'previous_draft' => 'nullable|string',
        ]);

        $draft = $this->geminiService->regenerateDraft(
            $request->input('title'),
            $request->input('prompt'),
            $request->input('feedback', ''),
            $request->input('previous_draft', '')
        );

        return response()->json(['draft' => $draft]);
    }

    /**
     * Generate article metadata (summary, SEO, tags).
     */
    public function generateArticleMeta(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
        ]);

        $meta = $this->geminiService->generateArticleMeta(
            $request->input('title'),
            $request->input('content')
        );

        return response()->json(['meta' => $meta]);
    }

    /**
     * Perform specific context-aware actions in the editor.
     */
    public function editorAction(Request $request)
    {
        $request->validate([
            'action' => 'required|string|in:continue,summarize,professional,fix_grammar',
            'text' => 'required|string'
        ]);

        $result = $this->geminiService->editorAction($request->input('action'), $request->input('text'));

        return response()->json(['result' => $result]);
    }

    /**
     * Handle multi-turn conversational AI for the Studio.
     */
    public function studioChat(Request $request)
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
     * Ask Llama for a generic response based on a prompt.
     */
    public function askLlama(Request $request)
    {
        $request->validate([
            'prompt' => 'required|string|max:1000'
        ]);

        $prompt = $request->input('prompt');
        $response = $this->llamaService->draftArticle($prompt, 'professional and concise');

        return response()->json(['response' => $response]);
    }

    /**
     * Generate SEO metadata (description and keywords).
     */
    public function generateSeoTags(Request $request)
    {
        $request->validate(['content' => 'required|string']);
        $tags = $this->llamaService->generateSeoTags($request->input('content'));

        return response()->json($tags);
    }

    /**
     * Architect a visual prompt for image generation.
     */
    public function generateImagePrompt(Request $request)
    {
        $request->validate(['content' => 'required|string']);
        $prompt = $this->llamaService->generateImagePrompt($request->input('content'));

        return response()->json(['prompt' => $prompt]);
    }
}
