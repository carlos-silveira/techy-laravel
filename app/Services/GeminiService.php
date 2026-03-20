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
    public function generateDraft(string $title, string $ideaPrompt, array $newsItems): array
    {
        $context = implode("\n", array_map(function ($n) {
            $source = $n['source'] ?? 'News';
            return "- [{$source}] {$n['title']}";
        }, $newsItems));

        $prompt = "Act as an Editor-in-Chief for a tech news site designed for 'people in a hurry'. Your audience wants to be informed without reading long, boring articles.

ARTICLE TOPIC: {$title}
EDITORIAL BRIEF: {$ideaPrompt}
TODAY'S NEWS CONTEXT:
{$context}

OFFICIAL CATEGORIES: 
- Artificial Intelligence
- Gadgets & Hardware
- Software & Apps
- Cybersecurity & Privacy
- Business Tech
- Gaming
- Mobility & Transport
- Science & Space
- Culture & Social Media
- Crypto & Web3
- Reviews
- Tutorials & Guides
- Deals
- Opinion

Generate a refactored version strictly following this JSON format:
{
  \"titular\": \"Catchy, direct headline. Max 12 words.\",
  \"tldr_twitter\": \"Summary in under 280 characters. Impactful, independent context.\",
  \"cuerpo_noticia\": \"2 to 3 short paragraphs (max 4 lines each). Direct, slightly sarcastic/entertaining but 100% informative. Explain 'why it matters' without fluff. Use basic Markdown (**bold**) for keywords. YOU MUST include an inline image placeholder like <img src=\\\"https://source.unsplash.com/800x400/?technology,ai\\\" alt=\\\"relevant description\\\"> inside the content.\",
  \"snippet_codigo\": \"OPTIONAL. Include a code block ONLY if it adds real value (e.g., terminal command, API JSON, config). If business news, leave null. NO joke code.\",
  \"lenguaje_snippet\": \"Language of the snippet (e.g., bash, json, python). Null if snippet is null.\",
  \"sugerencia_imagen\": \"Short English prompt for a text-to-image model for the cover image. Descriptive and visually appealing.\",
  \"categoria_principal\": \"MUST be exactly one of the OFFICIAL CATEGORIES listed above.\"
}

RULES:
- No corporate fluff or journalistic filler. Write like you're telling a developer colleague over coffee.
- NO markdown fences around the response, output raw JSON only.";

        $result = $this->callGemini($prompt, true);
        
        // Ensure we always return the expected structure even if Gemini fails partially
        return [
            'titular' => $result['titular'] ?? $title,
            'tldr_twitter' => $result['tldr_twitter'] ?? $ideaPrompt,
            'cuerpo_noticia' => $result['cuerpo_noticia'] ?? 'Failed to generate content.',
            'snippet_codigo' => $result['snippet_codigo'] ?? null,
            'lenguaje_snippet' => $result['lenguaje_snippet'] ?? null,
            'sugerencia_imagen' => $result['sugerencia_imagen'] ?? '',
            'categoria_principal' => $result['categoria_principal'] ?? 'Business Tech',
        ];
    }

    /**
     * Generate a Daily Brief summarizing the day's top tech news.
     */
    public function generateDailyBrief(array $newsItems): string
    {
        if (empty($newsItems)) {
            return "The intelligence pipeline is resting. Check back later for the latest tech signals.";
        }

        // Take only top 5 to keep the prompt focused
        $topNews = array_slice($newsItems, 0, 5);
        $context = implode("\n", array_map(function ($n) {
            $source = $n['source'] ?? 'News';
            return "- [{$source}] {$n['title']}: {$n['description']}";
        }, $topNews));

        $prompt = "You are the Editor-in-Chief of a TL;DR tech news site. 
Based on these top headlines from today:

{$context}

Write a punchy, engaging 'Daily Brief' summarizing the most important trends or events from these headlines. 
Keep it to exactly 2 short paragraphs. 
Tone: Entertaining, insightful, no-fluff. Like a quick update to a developer friend.
Do NOT use markdown code fences. Just return the text.";

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

    /**
     * Convert TipTap/ProseMirror JSON structure to raw HTML.
     */
    public function tipTapToHtml(array $node): string
    {
        if (!isset($node['type'])) {
            return '';
        }

        if ($node['type'] === 'text') {
            $text = $node['text'] ?? '';
            if (isset($node['marks'])) {
                foreach ($node['marks'] as $mark) {
                    if ($mark['type'] === 'bold') {
                        $text = "<strong>{$text}</strong>";
                    }
                    if ($mark['type'] === 'italic') {
                        $text = "<em>{$text}</em>";
                    }
                    if ($mark['type'] === 'code') {
                        $text = "<code>{$text}</code>";
                    }
                    if ($mark['type'] === 'link' && isset($mark['attrs']['href'])) {
                        $text = "<a href=\"{$mark['attrs']['href']}\">{$text}</a>";
                    }
                }
            }
            return $text;
        }

        $html = '';
        if (isset($node['content']) && is_array($node['content'])) {
            foreach ($node['content'] as $child) {
                $html .= $this->tipTapToHtml($child);
            }
        }

        switch ($node['type']) {
            case 'doc':
                return $html;
            case 'paragraph':
                return "<p>{$html}</p>\n";
            case 'heading':
                $level = $node['attrs']['level'] ?? 2;
                return "<h{$level}>{$html}</h{$level}>\n";
            case 'bulletList':
                return "<ul>\n{$html}</ul>\n";
            case 'orderedList':
                return "<ol>\n{$html}</ol>\n";
            case 'listItem':
                return "<li>{$html}</li>\n";
            case 'blockquote':
                return "<blockquote>\n<p>{$html}</p>\n</blockquote>\n";
            case 'codeBlock':
                $language = $node['attrs']['language'] ?? '';
                return "<pre><code class=\"language-{$language}\">{$html}</code></pre>\n";
            case 'horizontalRule':
                return "<hr />\n";
            case 'hardBreak':
                return "<br />\n";
            default:
                return $html;
        }
    }
}
