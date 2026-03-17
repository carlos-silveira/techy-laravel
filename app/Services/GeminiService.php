<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    private string $apiKey;
    private string $model;
    private LlamaService $llamaFallback;

    public function __construct(LlamaService $llamaFallback)
    {
        $this->apiKey = env('GEMINI_API_KEY', '');
        // Default to 2.0 Flash for superior performance/speed ratio
        $this->model = env('GEMINI_MODEL', 'gemini-2.0-flash'); 
        $this->llamaFallback = $llamaFallback;
    }

    /**
     * Handle a conversational chat specialized for creating news.
     */
    public function studioChat(string $message, array $history = []): string
    {
        $systemContext = "You are 'Techy AI', a world-class investigative tech journalist and editor.
        Your goal is to help the user build viral, high-authority tech news.
        
        CAPABILITIES:
        1. Contextual Research: Analyze today's news to find unique angles.
        2. Structural Drafting: Write full articles in clean HTML.
        3. Dynamic Editing: Update the Studio editor directly.

        COMMANDS:
        If you want to modify the editor, return a JSON object. You MUST include both 'update_editor' and 'message'.
        Example:
        {
          \"update_editor\": {
            \"title\": \"The Silicon Revolution\",
            \"content\": \"<h2>Intro</h2><p>Content...</p>\",
            \"seo_description\": \"A deep dive into silicon...\",
            \"seo_keywords\": \"tech, chips, innovation\"
          },
          \"message\": \"I've restructured your draft with a stronger hook.\"
        }

        JOURNALISTIC STYLE:
        - Avoid corporate fluff. Use punchy, 'The Verge' or 'Wired' style prose.
        - Use HTML tags correctly (h2 for subheaders, strong for emphasis).
        - Be proactive. Suggest better titles or trending tags without being asked.";

        $messages = [['role' => 'user', 'parts' => [['text' => $systemContext]]], ['role' => 'model', 'parts' => [['text' => "Acknowledged. Techy AI is online and ready to architect high-impact narratives."]]]];
        
        foreach (array_slice($history, -12) as $msg) {
            $role = isset($msg['role']) ? ($msg['role'] === 'user' ? 'user' : 'model') : 'model';
            $content = $msg['content'] ?? '';
            if (!empty($content)) {
                $messages[] = ['role' => $role, 'parts' => [['text' => $content]]];
            }
        }
        
        $messages[] = ['role' => 'user', 'parts' => [['text' => $message]]];

        return $this->callGeminiOrFallbackConversational($messages);
    }

    public function generateIdeas(array $newsItems): array
    {
        if (empty($newsItems)) return [['title' => 'Tech Trends', 'prompt' => 'Analyze the impact of AI on web dev.']];

        $newsContext = "";
        foreach ($newsItems as $item) {
            $newsContext .= "- {$item['title']}: {$item['description']}\n";
        }

        $prompt = "As a lead editor, analyze these headlines and propose 5 unique, 'hot-take' article ideas. 
        Format as JSON array: [{\"title\": \"...\", \"prompt\": \"...\"}]. 
        Headlines:\n{$newsContext}";

        return $this->callGeminiOrFallback($prompt, true);
    }

    public function generateDraft(string $title, string $ideaPrompt, array $newsItems): string
    {
        $context = implode("\n", array_map(fn($n) => $n['title'], $newsItems));
        $prompt = "Write a professional 5-paragraph tech article. 
        Title: {$title}
        Focus: {$ideaPrompt}
        News Context: {$context}
        Use clean HTML. Use <h2> for subheaders. No markdown blocks.";

        return $this->callGeminiOrFallback($prompt, false);
    }

    public function editorAction(string $action, string $text): string
    {
        $prompts = [
            'continue' => "Write the next 2 journalistic paragraphs following this: {$text}",
            'summarize' => "Summarize this into one punchy sentence: {$text}",
            'professional' => "Rewrite this to sound like a senior editor at Wired: {$text}",
            'fix_grammar' => "Fix grammar and flow while maintaining the bold tone: {$text}"
        ];
        return $this->callGeminiOrFallback($prompts[$action] ?? $prompts['continue'], false);
    }

    private function callGeminiOrFallbackConversational(array $messages)
    {
        if (!empty($this->apiKey)) {
            try {
                $response = Http::timeout(60)->post("https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}", [
                    'contents' => $messages
                ]);
                if ($response->successful()) return $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? '';
            } catch (\Exception $e) { Log::error('Gemini API Error: ' . $e->getMessage()); }
        }

        $llamaMessages = array_map(fn($m) => ['role' => ($m['role'] === 'model' ? 'assistant' : 'user'), 'content' => $m['parts'][0]['text']], $messages);
        return $this->llamaFallback->chat($llamaMessages);
    }

    private function callGeminiOrFallback(string $prompt, bool $expectJson = false)
    {
        if (!empty($this->apiKey)) {
            try {
                $response = Http::timeout(60)->post("https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}", [
                    'contents' => [['parts' => [['text' => $prompt]]]]
                ]);
                if ($response->successful()) {
                    $text = $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? '';
                    return $expectJson ? $this->extractJson($text) : trim($text);
                }
            } catch (\Exception $e) { Log::error('Gemini Error: ' . $e->getMessage()); }
        }
        $res = $this->llamaFallback->askLlamaDirect($prompt);
        return $expectJson ? $this->extractJson($res) : trim($res);
    }

    private function extractJson(string $text): array
    {
        $start = strpos($text, '{');
        $end = strrpos($text, '}');
        if ($start === false) { $start = strpos($text, '['); $end = strrpos($text, ']'); }
        if ($start !== false && $end !== false) {
            $json = substr($text, $start, $end - $start + 1);
            $decoded = json_decode($json, true);
            if (is_array($decoded)) return $decoded;
        }
        return [];
    }
}
