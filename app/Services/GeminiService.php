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

    /**
     * Generate editorial angles from trending news — daily.dev style hot takes.
     */
    public function generateIdeas(array $newsItems): array
    {
        if (empty($newsItems)) return [['title' => 'The State of Developer Tools in 2026', 'prompt' => 'Analyze emerging developer tooling trends.']];

        $newsContext = "";
        foreach ($newsItems as $item) {
            $source = $item['source'] ?? 'Unknown';
            $newsContext .= "- [{$source}] {$item['title']}: {$item['description']}\n";
        }

        $prompt = "You are a senior editor at daily.dev — the developer-first news platform. 
You have these trending headlines from today's tech news cycle:

{$newsContext}

Generate exactly 3 article ideas. Each MUST:
1. Have a provocative, opinion-driven title (like 'Why X Changes Everything' or 'The Hidden Cost of Y')
2. Target developers specifically — not general tech audiences
3. Connect multiple headlines into a single narrative when possible
4. Include a developer-action angle: what should devs learn, build, or stop doing

Return ONLY a JSON array, no markdown fences:
[{\"title\": \"...\", \"prompt\": \"A detailed 2-sentence editorial brief describing the angle, tone, and key arguments\"}]";

        return $this->callGeminiOrFallback($prompt, true);
    }

    /**
     * Generate a long-form, daily.dev-quality investigative article.
     */
    public function generateDraft(string $title, string $ideaPrompt, array $newsItems): string
    {
        $context = implode("\n", array_map(function ($n) {
            $source = $n['source'] ?? 'News';
            return "- [{$source}] {$n['title']}";
        }, $newsItems));

        $prompt = "You are a senior tech journalist writing for daily.dev — the #1 developer news platform.

ARTICLE TITLE: {$title}
EDITORIAL BRIEF: {$ideaPrompt}
TODAY'S NEWS CONTEXT:
{$context}

Write a compelling 800-1200 word article in clean HTML. Follow these rules STRICTLY:

STRUCTURE:
- Open with a punchy 1-2 sentence hook that grabs developers. NO generic openings like 'In today's rapidly evolving landscape...'
- Use <h2> for 3-4 section headers. Make them opinionated, not descriptive ('The Framework Tax' not 'Framework Considerations')
- Use <p> for paragraphs. Keep paragraphs to 3-4 sentences max
- Use <strong> for emphasis on key terms
- Use <blockquote> for impactful quotes or key takeaways
- Use <pre><code> for any code snippets (if relevant to the topic)
- Use <ul><li> for lists when comparing tools/frameworks

TONE:
- Write like The Verge meets Hacker News: technically accurate but opinionated
- Take a clear stance. Fence-sitting is boring
- Include real numbers, benchmarks, or technical details when possible
- Address developers directly using 'you' and 'your'
- End with a forward-looking prediction or call to action

DO NOT:
- Use markdown — only HTML tags
- Wrap your response in code fences
- Include a title tag (it's handled separately)
- Use self-promotional language about AI

Output ONLY the HTML content.";

        return $this->callGeminiOrFallback($prompt, false);
    }

    /**
     * Generate article metadata: summary, seo description, tags.
     */
    public function generateArticleMeta(string $title, string $content): array
    {
        $excerpt = substr(strip_tags($content), 0, 500);

        $prompt = "Given this article titled \"{$title}\" with content starting: \"{$excerpt}...\"

Generate metadata as a JSON object (no markdown fences):
{
  \"summary\": \"A compelling 2-sentence executive summary for the article\",
  \"meta_description\": \"A 155-character max SEO meta description\",
  \"seo_keywords\": \"comma, separated, seo, keywords\",
  \"tags\": [\"tag1\", \"tag2\", \"tag3\", \"tag4\"]
}

Make the summary intriguing — it will be shown as a preview. Tags should be developer-relevant topics.";

        $result = $this->callGeminiOrFallback($prompt, true);

        // Normalize the result
        return [
            'summary' => $result['summary'] ?? '',
            'meta_description' => $result['meta_description'] ?? '',
            'seo_keywords' => $result['seo_keywords'] ?? '',
            'tags' => $result['tags'] ?? [],
        ];
    }
    /**
     * Regenerate an article draft incorporating user feedback.
     */
    public function regenerateDraft(string $title, string $ideaPrompt, string $feedback, string $previousDraft): string
    {
        $excerpt = substr(strip_tags($previousDraft), 0, 500);

        $prompt = "You are rewriting a tech article that the editor wasn't satisfied with.

ARTICLE TITLE: {$title}
EDITORIAL BRIEF: {$ideaPrompt}
EDITOR FEEDBACK: {$feedback}

THE PREVIOUS DRAFT (excerpt):
{$excerpt}

Rewrite the article incorporating the editor's feedback. Follow the same HTML formatting rules:
- Use <h2> for section headers, <p> for paragraphs, <strong> for emphasis
- Keep it 800-1200 words, punchy and opinionated like daily.dev
- Address the editor's feedback directly in your rewrite
- Output ONLY raw HTML, no markdown fences

Output ONLY the HTML content.";

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
        // Strip markdown code fences if present
        $text = preg_replace('/^```(?:json)?\s*/i', '', $text);
        $text = preg_replace('/\s*```\s*$/', '', $text);

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
