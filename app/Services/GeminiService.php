<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class GeminiService
{
    private string $apiKey;
    private string $model;
    private const QUOTA_CACHE_KEY = 'gemini_quota_exhausted';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key', env('GEMINI_API_KEY', ''));
        $this->model = config('services.gemini.model', env('GEMINI_MODEL', 'gemini-1.5-flash'));
    }

    /**
     * Check if the API is currently paused due to quota exhaustion.
     */
    public function isQuotaExhausted(): bool
    {
        return (bool) Cache::get(self::QUOTA_CACHE_KEY, false);
    }

    /**
     * Clear the quota exhaustion flag manually.
     */
    public function resetQuota(): void
    {
        Cache::forget(self::QUOTA_CACHE_KEY);
        Log::info("Gemini API quota manual reset confirmed.");
    }

    private function ensureQuotaNotExhausted(): void
    {
        if ($this->isQuotaExhausted()) {
            throw new \RuntimeException("QUOTA_EXHAUSTED: Gemini API daily quota is currently paused for the day.");
        }
    }

    /**
     * Detect if a 429 error is a permanent daily limit (RPD) or just temporary (RPM/TPM).
     */
    private function handle429($response, int $attempt): void
    {
        $body = $response->body();
        
        // If the body suggests the DAILY limit (Requests Per Day) is hit, vs just Requests Per Minute
        // Common messages: "Resource has been exhausted (e.g. check quota)."
        if (str_contains($body, 'exhausted')) {
            Log::error("Gemini DAILY QUOTA (RPD) EXHAUSTED. Pausing AI operations until midnight.");
            Cache::put(self::QUOTA_CACHE_KEY, true, now()->endOfDay());
            return;
        }

        Log::warning("Gemini RPM/TPM rate limit hit — Sleeping 45s (Attempt " . (string)$attempt . ").");
        sleep(45);
    }

    /**
     * Handle a conversational chat specialized for creating news.
     */
    public function studioChat(string $message, array $history = []): string
    {
        try {
            $this->ensureQuotaNotExhausted();
        } catch (\Exception $e) {
            return $e->getMessage();
        }

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
        if ($this->isQuotaExhausted()) return [];
        
        if (empty($newsItems)) {
            return [];
        }

        $newsContext = "";
        foreach ($newsItems as $item) {
            $source = $item['source'] ?? 'Unknown';
            $newsContext .= "- [{$source}] {$item['title']}: {$item['description']}\n";
        }

        $prompt = "You are a senior editor at a top-tier tech publication, synthesizing insights from sources like The Verge and Stratechery.
You have these trending headlines from today's tech news cycle:

{$newsContext}

Generate exactly 3 article ideas. Each MUST:
1. Have a provocative, insider-style title that frames a strong strategic or cultural thesis.
2. Target a sophisticated audience of engineers, CTOs, and tech founders.
3. Connect multiple headlines into a single, cohesive narrative that exposes a market shift or cultural trend.
4. Include a developer-action angle or a critical strategic takeaway.
5. Include a new 'angle' field suggesting the analytical approach: 'cultural_impact' (analyzing how technology affects users and society) or 'strategic_market_analysis' (analyzing business models, moats, and industry consolidation).

CRITICAL RECENCY RULE: ONLY focus on confirmed tech events from the EXACT last 24 to 48 hours. DO NOT output legacy news, repetitive AI hype, or rumors already covered. If the news is not from today, discard it.

Return ONLY a JSON array, no markdown fences:
[{\"title\": \"...\", \"prompt\": \"A detailed 2-sentence editorial brief describing the angle, tone, and key arguments\", \"angle\": \"cultural_impact\"}]";

        $result = $this->callGemini($prompt, true);
        return is_array($result) && !empty($result) ? $result : [];
    }

    /**
     * Generate a long-form, daily.dev-quality investigative article.
     */
    public function generateDraft(string $title, string $ideaPrompt, array $newsItems): array
    {
        if ($this->isQuotaExhausted()) return ['cuerpo_noticia' => 'Quota exhausted. Check back tomorrow.'];

        $context = implode("\n", array_map(function ($n) {
            $source = $n['source'] ?? 'News';
            return "- [{$source}] {$n['title']}";
        }, $newsItems));

        $prompt = "Act as a senior tech analyst and investigative journalist for a site like The Verge or Stratechery.

ARTICLE TOPIC: {$title}
EDITORIAL BRIEF: {$ideaPrompt}
NEWS CONTEXT:
{$context}

Generate an article as a JSON object. The 'cuerpo_noticia' field MUST contain valid HTML and follow this structural flow:

CRITICAL WRITING RULES (ANTI-SLOP & INVESTIGATIVE DEPTH):
- NEVER use generic intros like 'In today's fast-paced digital world', 'In the ever-evolving landscape', or 'Technology has changed the way we'.
- NEVER use AI-typical adjectives: 'dynamic', 'comprehensive', 'transformative', 'seamless', 'revolutionary' (unless describing a literal paradigm shift).
- NEVER use sludge words: 'delve', 'complexities', 'nuanced', 'testament', 'tapestry', 'a symphony of', 'navigating the'.
- Headline ('titular'): MUST be extremely punchy, short, and intriguing. ABSOLUTELY MAXIMUM 55 characters. Be a bold curator, not a boring summarizer.
- Voice: Be direct, slightly opinionated, and highly authoritative. Write as someone who has insider access to the industry.
- Specificity: Use real data points, architectural details, or market valuation numbers from the context.
- Prediction: DO NOT summarize. End with a sharp, bold prediction about where this trend goes in the next 12-24 months.

1.  **Thesis**: A single, bold, non-obvious thesis statement. Hook the reader immediately. (HTML: `<p>...</p>`)
2.  **Why It Matters**: The immediate, concrete impact of this news. (HTML: `<h2>Why It Matters</h2>...`)
3.  **Deeper Analysis**: The strategic, non-obvious implications. (HTML: `<h2>The Deeper Analysis</h2>...`)
4.  **Counter-Argument**: Risks, downsides, or why this might fail. (HTML: `<h2>The Counter-Argument</h2>...`)
5.  **Forward Outlook**: Strategic takeaways for builders and investors. (HTML: `<h2>Forward Outlook</h2>...`)

Return ONLY a valid JSON object with these exact keys: \"titular\", \"tldr_twitter\", \"cuerpo_noticia\", \"snippet_codigo\", \"lenguaje_snippet\", \"sugerencia_imagen\", \"categoria_principal\". Ensure the 'cuerpo_noticia' includes an unsplash image placeholder.
";

        $result = $this->callGemini($prompt, true);
        
        $content = $result['cuerpo_noticia'];

        // --- HARDENED VALIDATION ---
        $garbagePatterns = [
            'Failed to generate content',
            'Rewrite this article',
            'I cannot fulfill',
            'As an AI model',
            'is resting or unavailable',
            'Quota exhausted',
            'Internal Server Error'
        ];

        foreach ($garbagePatterns as $pattern) {
            if (stripos($content, $pattern) !== false || stripos($content, 'current summary') !== false) {
                throw new \App\Exceptions\GenerationException("Gemini returned garbage/error content or prompt leak for '{$title}'.");
            }
        }

        if (strlen(strip_tags($content)) < 400) {
            throw new \App\Exceptions\GenerationException("Gemini returned insufficient content (too short) for '{$title}'.");
        }
        
        return [
            'titular' => $result['titular'] ?? $title,
            'tldr_twitter' => $result['tldr_twitter'] ?? $ideaPrompt,
            'cuerpo_noticia' => $content,
            'snippet_codigo' => $result['snippet_codigo'] ?? null,
            'lenguaje_snippet' => $result['lenguaje_snippet'] ?? null,
            'sugerencia_imagen' => $result['sugerencia_imagen'] ?? '',
            'categoria_principal' => $result['categoria_principal'] ?? 'Business Tech',
        ];
    }

    /**
     * Generate a hyperlinked Daily Briefing summarizing the site's recent internal articles.
     */
    public function generateInternalDailyBrief(\Illuminate\Database\Eloquent\Collection $articles): string
    {
        if ($this->isQuotaExhausted() || $articles->isEmpty()) {
            return "The intelligence pipeline is resting. Check back later for the latest tech signals.";
        }

        $context = "";
        foreach ($articles as $idx => $a) {
            $context .= ($idx + 1) . ". Title: {$a->title} (Slug: {$a->slug})\n   Summary: {$a->ai_summary}\n\n";
        }

        $prompt = "You are the Editor-in-Chief of a high-end tech news site. 
Based on our site's latest published articles below:

{$context}

Write a punchy, engaging 'Daily Brief' summarizing these exact articles. 
Keep it to exactly 2 short paragraphs. 
Tone: Professional, investigative, and objective. No jokes, no sarcasm, pure journalistic integrity.

CRITICAL RULE: You MUST create inline HTML hyperlinks to the articles you mention.
Use this format: <a href=\"/article/THE-SLUG-HERE\" class=\"font-bold text-primary hover:text-purple-500 underline transition-colors decoration-primary/30 underline-offset-4\">The Article Title or relevant text</a>

Do NOT use markdown code fences. Output ONLY the raw HTML string for the paragraphs. Do NOT hallucinate any news outside of the provided articles.";

        return $this->callGemini($prompt, false);
    }

    /**
     * Generate a long-form article for a specific category.
     */
    public function generateCategoryDraft(string $category, array $newsItems = []): array
    {
        if ($this->isQuotaExhausted()) return ['html_content' => '<p>Quota exhausted.</p>'];

        $context = "";
        if (!empty($newsItems)) {
            $context = "TODAY'S NEWS CONTEXT:\n" . implode("\n", array_map(function ($n) {
                return "- " . ($n['title'] ?? '');
            }, array_slice($newsItems, 0, 10))) . "\n\n";
        }

        $prompt = "Act as an Editor-in-Chief for a cutting-edge tech news site designed for 'people in a hurry'. 
Generate a highly engaging, unique, and slightly opinionated tech news article specifically for the category: {$category}.

{$context}
CRITICAL RECENCY RULE: ONLY focus on actual, confirmed events from the EXACT last 24 to 48 hours. DO NOT output older news or repetitive rumors (such as old Nintendo Switch 2 leaks). If there is no real breaking news for this category in the context, synthesize the most recent trend.

CRITICAL EDITORIAL RULE: You MUST strictly write about pure {$category} topics. UNLESS the category is exactly 'Artificial Intelligence', you ABSOLUTELY MUST NOT mention Artificial Intelligence, OpenAI, ChatGPT, LLMs, or Machine Learning. Force topic diversity and strict adherence to the non-AI classical nature of the category.

TONE & STYLE:
1. Start with a punchy, controversial, or highly engaging HOOK. No boring introductions.
2. Focus heavily on 'Why this actually matters' and the human/industry impact, not just dry specifications.
3. Use a serious, authoritative, and deeply investigative journalistic tone (similar to Reuters or Bloomberg). Absolutely NO jokes, NO sarcasm, and NO informal filler.
4. Use high-impact HTML formatting: <h2> for subheaders, <strong> for dramatic emphasis, and <ul>/<li> for scannable bullet points.

Write 4 to 6 paragraphs. YOU MUST include an inline image placeholder like <img src=\"PLACEHOLDER_IMAGE\" alt=\"relevant description\"> inside the content where appropriate.

RETURN ONLY A JSON OBJECT. NO MARKDOWN FENCES.
{
  \"title\": \"A catchy, direct headline. Max 12 words.\",
  \"html_content\": \"The full article content in raw HTML. Do NOT use markdown. Ensure it is clean, valid HTML.\",
  \"category\": \"{$category}\",
  \"suggested_cover_query\": \"1 to 3 short concrete English words for Unsplash image search (e.g., 'spacex', 'smartphone lab', 'electric car', 'robot arm'). NO abstract concepts, NO 'neon', NO 'technology'.\"
}";

        $result = $this->callGemini($prompt, true);

        if (empty($result) || empty($result['html_content']) || stripos($result['html_content'], 'Failed to generate') !== false) {
            throw new \App\Exceptions\GenerationException("Category drafting failed for {$category}.");
        }

        return [
            'title' => $result['title'] ?? "The Future of {$category}",
            'html_content' => $result['html_content'],
            'category' => $result['category'] ?? $category,
            'suggested_cover_query' => $result['suggested_cover_query'] ?? null,
        ];
    }

    /**
     * Generate a Daily Brief summarizing the day's top tech news.
     */
    public function generateDailyBrief(array $newsItems): string
    {
        if ($this->isQuotaExhausted() || empty($newsItems)) {
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
        if ($this->isQuotaExhausted()) return [];
        
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
     * Throws an exception on quota exhaustion to notify calling jobs.
     */
    public function translateArticle(string $title, string $summary, string $content, string $targetLocale): array
    {
        $this->ensureQuotaNotExhausted();

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

        if (empty($result) || empty($result['title']) || $result['title'] === $title) {
             throw new \RuntimeException("Translation to {$targetLanguage} failed: Invalid response or returned original text.");
        }

        return [
            'title' => $result['title'],
            'summary' => $result['summary'],
            'content' => $result['content'],
        ];
    }

    /**
     * AI QA: Polishes raw article HTML to fix broken markdown fences and improve journalistic tone.
     */
    public function polishArticleHtml(string $currentHtml): string
    {
        $prompt = "Act as the Editor-in-Chief for a high-end tech news site.
        I am giving you an article represented in HTML. It was previously generated by an AI and might have formatting errors, markdown fences inside the HTML, or awkward phrasing.
        
        YOUR JOB:
        1. Fix any broken HTML tags.
        2. Remove any markdown code fences (like ```html) from the output.
        3. Polish the writing style to sound like a native-English TechCrunch journalist. Make it punchy and engaging.
        4. NEVER change the core facts or the narrative. Just improve the flow and fix syntax.
        
        ARTICLE HTML:
        {$currentHtml}
        
        CRITICAL: Return ONLY the raw completely corrected HTML string. Do not wrap it in markdown fences.";

        $result = $this->callGemini($prompt, false);
        return trim((string) $result);
    }

    /**
     * Call Gemini API for conversational messages.
     * Returns the text response or a user-friendly error.
     */
    private function callGeminiConversational(array $messages): string
    {
        $this->ensureApiKey();

        $maxRetriesPerModel = 5;
        $lastError = 'Unknown error';

        for ($attempt = 0; $attempt <= $maxRetriesPerModel; $attempt++) {
            if ($this->isQuotaExhausted()) break;

            try {
                $response = Http::timeout(60)->post(
                    "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}",
                    ['contents' => $messages]
                );

                if ($response->successful()) {
                    $json = $response->json();

                    // Track API Usage tokens
                    if (isset($json['usageMetadata'])) {
                        \Illuminate\Support\Facades\DB::table('gemini_logs')->insert([
                            'model_name' => $this->model,
                            'operation_type' => 'conversational',
                            'prompt_tokens' => $json['usageMetadata']['promptTokenCount'] ?? 0,
                            'completion_tokens' => $json['usageMetadata']['candidatesTokenCount'] ?? 0,
                            'total_tokens' => $json['usageMetadata']['totalTokenCount'] ?? 0,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }

                    return $json['candidates'][0]['content']['parts'][0]['text'] ?? '';
                }

                $status = $response->status();
                if ($status === 429) {
                    $this->handle429($response, $attempt);
                    if ($this->isQuotaExhausted()) break;
                    continue;
                }

                $errorBody = substr($response->body(), 0, 500);
                $lastError = "API Error ({$status}): {$errorBody}";

                if ($attempt < $maxRetriesPerModel) {
                    sleep(15);
                    continue;
                }
            } catch (\Exception $e) {
                $lastError = "Connection Error: " . $e->getMessage();
                if ($attempt < $maxRetriesPerModel) {
                    sleep(15);
                    continue;
                }
            }
        }
        
        return 'Gemini API is currently resting or unavailable. Please try again later. Notice: ' . $lastError;
    }

    /**
     * Call Gemini API for single-prompt requests.
     */
    private function callGemini(string $prompt, bool $expectJson = false)
    {
        $this->ensureApiKey();
        $this->ensureQuotaNotExhausted();

        $maxRetriesPerModel = 3;
        $lastError = 'Unknown error';

        $payload = [
            'contents' => [['parts' => [['text' => $prompt]]]],
            'safetySettings' => [
                ['category' => 'HARM_CATEGORY_HARASSMENT', 'threshold' => 'BLOCK_ONLY_HIGH'],
                ['category' => 'HARM_CATEGORY_HATE_SPEECH', 'threshold' => 'BLOCK_ONLY_HIGH'],
                ['category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'threshold' => 'BLOCK_ONLY_HIGH'],
                ['category' => 'HARM_CATEGORY_DANGEROUS_CONTENT', 'threshold' => 'BLOCK_ONLY_HIGH'],
            ]
        ];

        for ($attempt = 0; $attempt <= $maxRetriesPerModel; $attempt++) {
            if ($this->isQuotaExhausted()) break;

            try {
                $response = Http::timeout(120)->post(
                    "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}",
                    $payload
                );

                if ($response->successful()) {
                    $json = $response->json();
                    
                    // Track API Usage tokens
                    if (isset($json['usageMetadata'])) {
                        \Illuminate\Support\Facades\DB::table('gemini_logs')->insert([
                            'model_name' => $this->model,
                            'operation_type' => 'generateContent',
                            'prompt_tokens' => $json['usageMetadata']['promptTokenCount'] ?? 0,
                            'completion_tokens' => $json['usageMetadata']['candidatesTokenCount'] ?? 0,
                            'total_tokens' => $json['usageMetadata']['totalTokenCount'] ?? 0,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }

                    // Check for safety blocks
                    $candidate = $json['candidates'][0] ?? null;
                    if ($candidate && ($candidate['finishReason'] ?? '') === 'SAFETY') {
                        Log::warning("Gemini SAFETY BLOCK for prompt: " . Str::limit($prompt, 100));
                        return $expectJson ? [] : 'Content blocked by safety filters.';
                    }

                    $text = $candidate['content']['parts'][0]['text'] ?? '';
                    return $expectJson ? $this->extractJson($text) : trim($text);
                }

                $status = $response->status();
                if ($status === 429) {
                    $this->handle429($response, $attempt);
                    if ($this->isQuotaExhausted()) break;
                    continue;
                }

                $errorBody = substr($response->body(), 0, 500);
                $lastError = "Gemini API error ({$status}): {$errorBody}";
                Log::error($lastError);

                if ($attempt < $maxRetriesPerModel) {
                    sleep(10);
                    continue;
                }
            } catch (\Exception $e) {
                $lastError = "Gemini connection error: " . $e->getMessage();
                if ($attempt < $maxRetriesPerModel) {
                    sleep(10);
                    continue;
                }
            }
        }

        if ($this->isQuotaExhausted()) {
            throw new \RuntimeException("QUOTA_EXHAUSTED: Gemini API quota paused.");
        }

        if ($expectJson) return [];
        throw new \RuntimeException("All retries exhausted for model {$this->model}. Last error: " . $lastError);
    }

    /**
     * Validate that an API key is configured.
     */
    private function ensureApiKey(): void
    {
        if (empty($this->apiKey)) {
            throw new \RuntimeException('GEMINI_API_KEY is not configured.');
        }
    }

    /**
     * Extract a JSON object or array from a text response.
     */
    private function extractJson(string $text): array
    {
        // 1. Remove non-printable characters or Zero Width Spaces that often break JSON
        $text = str_replace(["\u200b", "\ufeff"], '', $text);

        // 2. Robust balanced extraction for JSON objects {}
        if (preg_match('/\{(?:[^{}]|(?R))*\}/s', $text, $matches)) {
            $jsonStr = $matches[0];
            $decoded = json_decode($jsonStr, true);
            if (is_array($decoded)) return $decoded;
        }

        // 3. Robust balanced extraction for JSON arrays []
        if (preg_match('/\[(?:[^\[\]]|(?R))*\]/s', $text, $matches)) {
            $jsonStr = $matches[0];
            $decoded = json_decode($jsonStr, true);
            if (is_array($decoded)) return $decoded;
        }

        // 4. Fallback to basic stripping
        $jsonCandidate = preg_replace('/^```(?:json)?\s*/i', '', $text);
        $jsonCandidate = preg_replace('/\s*```\s*$/', '', $jsonCandidate);
        $jsonCandidate = trim($jsonCandidate);
        $decoded = json_decode($jsonCandidate, true);
        
        if (is_array($decoded)) return $decoded;

        // If all decoding fails, log for debugging
        Log::warning("GeminiService: Failed to decode JSON. Raw response: " . substr($text, 0, 100));
        return [];
    }

    /**
     * Generate an embedding vector for the given text using text-embedding-004.
     * Returns an array of floats (typically 768 dimensions for Gemini).
     */
    public function embedText(string $text): array
    {
        $this->ensureApiKey();

        try {
            $response = Http::timeout(60)->post(
                "https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={$this->apiKey}",
                [
                    'model' => 'models/text-embedding-004',
                    'content' => [
                        'parts' => [
                            ['text' => $text]
                        ]
                    ]
                ]
            );

            if ($response->successful()) {
                return $response->json()['embedding']['values'] ?? [];
            }

            Log::error("Gemini Embedding Error: " . $response->body());
            return [];
        } catch (\Exception $e) {
            Log::error("Gemini Embedding Connection Error: " . $e->getMessage());
            return [];
        }
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
