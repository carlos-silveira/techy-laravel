<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    private string $apiKey;
    private string $model;

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key', env('GEMINI_API_KEY', ''));
        $this->model = config('services.gemini.model', env('GEMINI_MODEL', 'gemini-2.5-flash'));
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

        $messages = [
            ['role' => 'user', 'parts' => [['text' => $systemContext]]],
            ['role' => 'model', 'parts' => [['text' => "Acknowledged. Techy AI is online and ready to architect high-impact narratives."]]]
        ];
        
        foreach (array_slice($history, -12) as $msg) {
            $role = isset($msg['role']) ? ($msg['role'] === 'user' ? 'user' : 'model') : 'model';
            $content = $msg['content'] ?? '';
            if (!empty($content)) {
                $messages[] = ['role' => $role, 'parts' => [['text' => $content]]];
            }
        }
        
        $messages[] = ['role' => 'user', 'parts' => [['text' => $message]]];

        return $this->callGeminiConversational($messages);
    }

    /**
     * Generate editorial angles from trending news — daily.dev style hot takes.
     */
    public function generateIdeas(array $newsItems): array
    {
        if (empty($newsItems)) {
            return [['title' => 'The State of Developer Tools in 2026', 'prompt' => 'Analyze emerging developer tooling trends.']];
        }

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

        $result = $this->callGemini($prompt, true);
        return is_array($result) && !empty($result) ? $result : [
            ['title' => 'The State of Developer Tools in 2026', 'prompt' => 'Analyze emerging developer tooling trends.']
        ];
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

        $prompt = "You are a senior investigative tech journalist writing for daily.dev — the #1 developer news platform with 1M+ daily readers.

ARTICLE TITLE: {$title}
EDITORIAL BRIEF: {$ideaPrompt}
TODAY'S NEWS CONTEXT:
{$context}

Write a LONG-FORM, deeply researched article of **1500-2000 words** in clean HTML.

MANDATORY STRUCTURE (follow this exact blueprint):

1. **THE HOOK** (2-3 sentences max):
   - Start with a surprising stat, a bold claim, or a concrete scenario. Examples:
     'Last Tuesday, a 23-line pull request broke 4,000 CI pipelines across GitHub.'
     'The average React app now ships 2.1MB of JavaScript. Five years ago, it was 400KB.'
   - NEVER open with 'In today's rapidly evolving...' or any variation. That's lazy journalism.

2. **THE CONTEXT** (2-3 paragraphs):
   - What happened? Why now? Connect today's news items into a narrative.
   - Include at least ONE specific number, benchmark, or data point.
   - Name real companies, tools, or people when relevant.

3. **THE DEEP DIVE** — Use 3-5 <h2> sections. Each section header MUST be opinionated:
   - ✅ 'The Hidden Cost of Microservices Nobody Talks About'
   - ✅ 'Why Your Bundle Size Is Lying to You'
   - ❌ 'Overview of Current Trends' (boring, rejected)
   
   In at least ONE section, include a practical code example:
   <pre><code class=\"language-javascript\">// Wrap code in pre+code tags
const example = 'like this';
</code></pre>

4. **THE COUNTERARGUMENT** (1-2 paragraphs):
   - Steel-man the opposing view. Show intellectual honesty.
   - 'To be fair, proponents of X argue that...'

5. **THE PREDICTION** (final section):
   - End with a bold, specific, time-bound prediction developers can hold you to.
   - 'By Q4 2026, I predict X will Y. Here's what you should do NOW to prepare.'

HTML RULES:
- <h2> for section headers (never h1, never h3)
- <p> for paragraphs (3-4 sentences max per paragraph)
- <strong> for emphasis on key technical terms
- <blockquote> for impactful quotes or key takeaways (use at least once)
- <pre><code> for code snippets (use at least once)
- <ul><li> for comparison lists
- <em> for secondary emphasis

TONE:
- Write like Wired meets Hacker News: technically precise but never boring
- Take a CLEAR editorial stance — fence-sitting is lazy journalism
- Use 'you' and 'your' to speak directly to developers
- Include specific numbers: GitHub stars, npm downloads, benchmark results, funding amounts
- Reference real tools, libraries, and frameworks by name

ABSOLUTE PROHIBITIONS:
- NO markdown syntax of any kind — HTML only
- NO code fences wrapping your entire response  
- NO <h1> or <title> tags (title is handled separately)
- NO self-promotional language about AI or 'as an AI'
- NO generic filler paragraphs — every sentence must carry information
- Article MUST be at least 1500 words. Short articles are REJECTED.

Output ONLY the raw HTML content. Nothing else.";

        return $this->callGemini($prompt, false);
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

        $result = $this->callGemini($prompt, true);

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

        return $this->callGemini($prompt, false);
    }

    /**
     * Perform a specific editor action (continue, summarize, etc.)
     */
    public function editorAction(string $action, string $text): string
    {
        $prompts = [
            'continue' => "Write the next 2 journalistic paragraphs following this: {$text}",
            'summarize' => "Summarize this into one punchy sentence: {$text}",
            'professional' => "Rewrite this to sound like a senior editor at Wired: {$text}",
            'fix_grammar' => "Fix grammar and flow while maintaining the bold tone: {$text}"
        ];
        return $this->callGemini($prompts[$action] ?? $prompts['continue'], false);
    }

    /**
     * Translate an article to a target language.
     */
    public function translateArticle(string $title, string $summary, string $content, string $targetLocale): array
    {
        $languages = [
            'en' => 'English',
            'es' => 'Spanish',
            'pt' => 'Portuguese',
        ];

        $targetLanguage = $languages[$targetLocale] ?? 'English';

        $prompt = "You are a professional translator and tech journalist.
Translate the following tech article details into {$targetLanguage}.
MANDATORY:
- Maintain the SAME HTML structure and tags for the 'content'.
- Keep the technical tone bold and opinionated.
- Translate only the text content, never the HTML tags themselves.

ARTICLE TITLE: {$title}
EXECUTIVE SUMMARY: {$summary}
HTML CONTENT:
{$content}

Return exactly a JSON object (no markdown fences):
{
  \"title\": \"translated title\",
  \"summary\": \"translated summary\",
  \"content\": \"translated html content\"
}";

        $result = $this->callGemini($prompt, true);

        return [
            'title' => $result['title'] ?? $title,
            'summary' => $result['summary'] ?? $summary,
            'content' => $result['content'] ?? $content,
        ];
    }

    /**
     * Call Gemini API for conversational messages.
     * Returns the text response or a user-friendly error.
     */
    private function callGeminiConversational(array $messages): string
    {
        $this->ensureApiKey();

        try {
            $response = Http::timeout(60)->post(
                "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}",
                ['contents' => $messages]
            );

            if ($response->successful()) {
                return $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? '';
            }

            Log::error('Gemini API Error', [
                'status' => $response->status(),
                'body' => substr($response->body(), 0, 500),
            ]);
            return 'Gemini API returned an error. Please check your API key configuration.';
        } catch (\Exception $e) {
            Log::error('Gemini API Connection Error: ' . $e->getMessage());
            return 'Unable to connect to Gemini API. Please verify GEMINI_API_KEY is set in your .env file.';
        }
    }

    /**
     * Call Gemini API for single-prompt requests.
     * Returns parsed JSON array or trimmed string depending on $expectJson.
     * Throws GeminiApiException if the API is unreachable.
     */
    private function callGemini(string $prompt, bool $expectJson = false)
    {
        $this->ensureApiKey();

        $maxRetries = 2;
        $lastError = null;

        for ($attempt = 0; $attempt <= $maxRetries; $attempt++) {
            try {
                $response = Http::timeout(60)->post(
                    "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}",
                    ['contents' => [['parts' => [['text' => $prompt]]]]]
                );

                if ($response->successful()) {
                    $text = $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? '';
                    return $expectJson ? $this->extractJson($text) : trim($text);
                }

                // Retry on 429 rate limit
                if ($response->status() === 429 && $attempt < $maxRetries) {
                    $wait = ($attempt + 1) * 15;
                    Log::warning("Gemini 429 rate limit — retrying in {$wait}s (attempt " . ($attempt + 1) . ")");
                    sleep($wait);
                    continue;
                }

                $errorBody = substr($response->body(), 0, 500);
                Log::error('Gemini API Error', ['status' => $response->status(), 'body' => $errorBody]);
                $lastError = "Gemini API error ({$response->status()}): {$errorBody}";

                if ($expectJson) {
                    return [];
                }
                throw new \RuntimeException($lastError);
            } catch (\RuntimeException $e) {
                throw $e;
            } catch (\Exception $e) {
                Log::error('Gemini Connection Error: ' . $e->getMessage());
                throw new \RuntimeException('Unable to connect to Gemini API: ' . $e->getMessage());
            }
        }

        if ($expectJson) return [];
        throw new \RuntimeException($lastError ?? 'Gemini API failed after retries');
    }

    /**
     * Validate that an API key is configured.
     */
    private function ensureApiKey(): void
    {
        if (empty($this->apiKey)) {
            throw new \RuntimeException(
                'GEMINI_API_KEY is not configured. Please set it in your .env file.'
            );
        }
    }

    /**
     * Extract a JSON object or array from a text response.
     */
    private function extractJson(string $text): array
    {
        // Strip markdown code fences if present
        $text = preg_replace('/^```(?:json)?\s*/i', '', $text);
        $text = preg_replace('/\s*```\s*$/', '', $text);
        $text = trim($text);

        // Detect outermost JSON structure — prefer [] for arrays over {} for objects
        $arrayStart = strpos($text, '[');
        $objectStart = strpos($text, '{');

        // Use whichever appears first ([ for arrays, { for objects)
        if ($arrayStart !== false && ($objectStart === false || $arrayStart < $objectStart)) {
            $start = $arrayStart;
            $end = strrpos($text, ']');
        } else {
            $start = $objectStart;
            $end = strrpos($text, '}');
        }

        if ($start !== false && $end !== false && $end > $start) {
            $json = substr($text, $start, $end - $start + 1);
            $decoded = json_decode($json, true);
            if (is_array($decoded)) return $decoded;
        }
        return [];
    }
}
