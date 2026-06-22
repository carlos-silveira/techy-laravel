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

    /**
     * Ordered list of Gemini models to try, from best to most affordable.
     * If the primary model fails (429/quota/error), we cascade to the next.
     */
    private array $modelFallbackChain = [
        'gemini-2.5-pro',
        'gemini-2.5-flash',
        'gemini-2.0-flash',
        'gemini-2.0-flash-lite',
    ];

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key', env('GEMINI_API_KEY', ''));
        $this->model = config('services.gemini.model', env('GEMINI_MODEL', 'gemini-2.5-flash'));
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

        if (!app()->runningInConsole()) {
            Log::warning("Gemini RPM/TPM rate limit hit during HTTP request. Failing fast to trigger fallback.");
            throw new \RuntimeException("Rate limit hit during web request.");
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
    public function generateIdeas(array $newsItems, array $recentTitles = []): array
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

        $date = now()->format('l, F j, Y');

        // LAYER 1 DEDUP: Tell the AI which topics we already published
        $existingContext = '';
        if (!empty($recentTitles)) {
            $existingList = implode("\n", array_map(fn($t) => "- $t", array_slice($recentTitles, 0, 30)));
            $existingContext = "\n\nCRITICAL — ALREADY PUBLISHED (last 7 days, DO NOT REPEAT THESE TOPICS):\n{$existingList}\n\nYou MUST NOT suggest any topic that covers the same story, company, or event as any item in the list above. Even a different angle on the same news event is forbidden if it appears above.";
        }

        $prompt = "You are the Editor-in-Chief of techynews.lat. Today is {$date}. You have these trending headlines from today's tech news cycle:

{$newsContext}{$existingContext}

Your job is to select the 5 to 10 MOST IMPORTANT, exciting, and concrete individual tech news stories from the list above. DO NOT combine unrelated stories. Pick actual, factual events (e.g., a new product launch, a major lawsuit, an AI breakthrough).

Generate between 5 and 10 article ideas. Each MUST:
1. Focus on ONE specific news event. DO NOT try to connect unrelated headlines or invent 'cultural trends'.
2. Have a clear, catchy, and factual title.
3. Include a 'prompt' field: a 2-sentence brief explaining exactly what the article should be about in plain, simple English. What happened and why is it important?
4. Include an 'angle' field, which should be a simple category like 'product_launch', 'business', or 'ai_breakthrough'.

CRITICAL RECENCY RULE: Today is {$date}. ONLY focus on confirmed tech events from the EXACT last 24 to 48 hours. DO NOT output legacy news or events from previous years (e.g. do not act like it is 2021). If the news is not from today or yesterday, discard it.
CRITICAL TOPIC RULE: ABSOLUTELY DO NOT write meta-commentary about AI generating articles. Focus on actual tech industry news.
CRITICAL DEDUP RULE: If you already see a topic in the 'ALREADY PUBLISHED' list above, skip it entirely \u2014 even if the angle is slightly different.

Return ONLY a JSON array, no markdown fences:
[{\"title\": \"...\", \"prompt\": \"A simple 2-sentence explanation of the news.\", \"angle\": \"product_launch\"}]";

        $result = $this->callGemini($prompt, true);
        return is_array($result) && !empty($result) ? $result : [];
    }

    /**
     * Generate a long-form, daily.dev-quality investigative article.
     */
    public function generateDraft(string $title, string $ideaPrompt, array $newsItems): array
    {
        if ($this->isQuotaExhausted()) return ['article_body' => 'Quota exhausted. Check back tomorrow.'];

        $context = implode("\n", array_map(function ($n) {
            $source = $n['source'] ?? 'News';
            return "- [{$source}] {$n['title']}";
        }, $newsItems));

        $date = now()->format('l, F j, Y');
        $prompt = "You are a tech journalist for techynews.lat. Today is {$date}. Your absolute priority is CLARITY. You must write articles that are extremely easy to understand, avoiding all complicated jargon, 'verbal vomit', and overly academic language. DO NOT report on events from previous years as if they were new today.

ARTICLE TOPIC: {$title}
EDITORIAL BRIEF: {$ideaPrompt}
NEWS CONTEXT:
{$context}

Generate an article as a JSON object. The 'article_body' field MUST contain valid HTML.

CRITICAL WRITING RULES (FOR EXTREME CLARITY):
- CRITICAL LANGUAGE RULE: The output MUST be entirely in English.
- EXTREME SIMPLICITY: Write at a very basic reading level. Use everyday vocabulary.
- FACTUAL AND DIRECT: No 'fluff', no 'insider' voice. Just report the facts clearly like a bulleted summary.
- NO CODE BLOCKS: DO NOT include any code snippets, python code, or programming examples.
- NO AI CLICHES: NEVER use words like 'delve', 'complexities', 'nuanced', 'testament', 'tapestry', 'landscape', 'revolutionary', 'transformative'.
- MAXIMUM LENGTH: 450 words (typically target between 350 and 450 words for complete coverage).

ARTICLE STRUCTURE (HTML):
- BANNED HEADINGS: You are strictly FORBIDDEN from using generic, repetitive, or filler subheadings such as 'Why It's Important', 'Why It Matters', 'Deeper Analysis', 'Deep Dive', 'Conclusion', or their exact translations or equivalents.
- DO NOT divide the article into multiple rigid analytical sections that repeat the same information. Every single sentence and bullet point must add NEW, distinct information.
- Write the article so it is incredibly easy to scan, using this exact layout:
  1. **Intro**: A direct, punchy 1-2 sentence paragraph explaining exactly *what* happened, *who* is involved, and *when*. Start directly with the breaking news. Do NOT use any heading for this paragraph.
  2. **Details (Bulleted List)**: A bulleted list (`<ul>` containing 4 to 6 `<li>` elements) breaking down the key specs, facts, numbers, or timeline of the event. Bold the first 2-3 words of each bullet point to make it highly scannable. Each bullet point should be highly informative, containing 1 to 2 detailed sentences of distinct facts.
  3. **Consequence/Next Steps**: A final short paragraph (2-3 sentences max) explaining the immediate consequence or what happens next. Do NOT use any subheading for this final paragraph.
- Under NO circumstances should you use more than one `<h2>` heading in the entire article, and only use it if it describes a highly specific, contextual aspect of the details (e.g., `<h2>Specs and Pricing</h2>`). Never use generic headings.

Return ONLY a valid JSON object with these exact keys: \"title\", \"twitter_tldr\", \"article_body\", \"suggested_image\", \"main_category\".
CRITICAL RULE FOR X (TWITTER): The 'twitter_tldr' field MUST be written entirely in SPANISH (Español). All other fields MUST remain in English. Ensure the 'article_body' includes an unsplash image placeholder like <img src=\"PLACEHOLDER_IMAGE\" alt=\"description\">.
";

        $result = $this->callGemini($prompt, true);
        
        $content = $result['article_body'] ?? '';

        // --- HARDENED VALIDATION ---
        $this->validateGeneratedContent([
            'title' => $result['title'] ?? '',
            'twitter_tldr' => $result['twitter_tldr'] ?? '',
            'article_body' => $content,
        ], $title);

        if (strlen(strip_tags($content)) < 200) {
            throw new \App\Exceptions\GenerationException("Gemini returned insufficient content (too short) for '{$title}'.");
        }
        
        return [
            'title' => $result['title'] ?? $title,
            'twitter_tldr' => $result['twitter_tldr'] ?? $ideaPrompt,
            'article_body' => $content,
            'suggested_image' => $result['suggested_image'] ?? '',
            'main_category' => $result['main_category'] ?? 'Business Tech',
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
FORMATTING RULES:
1. Start with a short 1-2 sentence introduction about the day's news.
2. Group the articles into logical categories using <h2> headers (e.g., '<h2>Inteligencia Artificial</h2>', '<h2>Hardware y Cómputo</h2>').
3. For each article, create a bullet point (<ul><li>) that summarizes the article's main point.
4. Bold the first few words of the bullet point as a mini-title.

CRITICAL RULE: You MUST create inline HTML hyperlinks to the articles you mention using their Slug.
Use this format: <li><strong><a href=\"/article/THE-SLUG-HERE\" class=\"font-bold text-primary hover:text-purple-500 underline transition-colors decoration-primary/30 underline-offset-4\">Mini Title:</a></strong> The summary of the article.</li>

Do NOT use markdown code fences. Output ONLY the raw HTML string. Do NOT hallucinate any news outside of the provided articles. Do NOT include any code blocks.";

        return $this->callGemini($prompt, false);
    }

    /**
     * Generate a long-form article for a specific category.
     */
    public function generateCategoryDraft(string $category, array $newsItems = [], array $excludeTitles = []): array
    {
        if ($this->isQuotaExhausted()) return ['html_content' => '<p>Quota exhausted.</p>'];

        $context = "";
        if (!empty($newsItems)) {
            $context = "TODAY'S NEWS CONTEXT:\n" . implode("\n", array_map(function ($n) {
                return "- " . ($n['title'] ?? '');
            }, array_slice($newsItems, 0, 10))) . "\n\n";
        }

        $excludePrompt = "";
        if (!empty($excludeTitles)) {
            $excludePrompt = "CRITICAL EXCLUSION RULE: You ABSOLUTELY MUST NOT generate an article about any of the following topics, stories, or titles:\n" . implode("\n", array_map(fn($t) => "- {$t}", $excludeTitles)) . "\n\n";
        }

        $prompt = "Act as a tech journalist for a mainstream tech news site. Your absolute priority is CLARITY. You must write articles that are extremely easy to understand, avoiding complicated jargon and 'verbal vomit'.

CATEGORY: {$category}
TODAY'S NEWS CONTEXT:
{$context}
{$excludePrompt}CRITICAL RECENCY RULE: ONLY focus on actual, confirmed events from the EXACT last 24 to 48 hours. DO NOT output older news or repetitive rumors. If there is no real breaking news for this category in the context, synthesize the most recent trend simply.

CRITICAL EDITORIAL RULE: You MUST strictly write about {$category} topics. UNLESS the category is exactly 'Artificial Intelligence', you ABSOLUTELY MUST NOT mention Artificial Intelligence, OpenAI, ChatGPT, LLMs, or Machine Learning.

CRITICAL WRITING RULES:
- SIMPLE WORDS ONLY: Write at an 8th-grade reading level. Use everyday vocabulary.
- FACTUAL AND DIRECT: No 'fluff', no 'insider' voice. Just report the facts clearly like a bulleted summary.
- NO CODE BLOCKS: DO NOT include any code snippets or programming examples.
- NO AI CLICHES: NEVER use words like 'delve', 'complexities', 'nuanced', 'testament', 'tapestry', 'landscape', 'revolutionary', 'transformative', 'realm'.
- SHORT SENTENCES: Keep your sentences short and punchy. Active voice only.
- GET TO THE POINT: Start directly with the hook. No long, generic introductions.
- MAXIMUM LENGTH: 450 words (typically target between 350 and 450 words for complete coverage).

ARTICLE STRUCTURE (HTML):
- BANNED HEADINGS: You are strictly FORBIDDEN from using generic, repetitive, or filler subheadings such as 'Why It's Important', 'Why It Matters', 'Deeper Analysis', 'Deep Dive', 'Conclusion', or their exact translations or equivalents.
- DO NOT divide the article into multiple rigid analytical sections that repeat the same information. Every single sentence and bullet point must add NEW, distinct information.
- Write the article so it is incredibly easy to scan, using this exact layout:
  1. **Intro**: A direct, punchy 1-2 sentence paragraph explaining exactly *what* happened, *who* is involved, and *when*. Start directly with the breaking news. Do NOT use any heading for this paragraph.
  2. **Details (Bulleted List)**: A bulleted list (`<ul>` containing 4 to 6 `<li>` elements) breaking down the key specs, facts, numbers, or timeline of the event. Bold the first 2-3 words of each bullet point to make it highly scannable. Each bullet point should be highly informative, containing 1 to 2 detailed sentences of distinct facts.
  3. **Consequence/Next Steps**: A final short paragraph (2-3 sentences max) explaining the immediate consequence or what happens next. Do NOT use any subheading for this final paragraph.
- Under NO circumstances should you use more than one `<h2>` heading in the entire article, and only use it if it describes a highly specific, contextual aspect of the details (e.g., `<h2>Specs and Pricing</h2>`). Never use generic headings.

Write the article so it's incredibly easy to read. YOU MUST include an inline image placeholder like <img src=\"PLACEHOLDER_IMAGE\" alt=\"relevant description\"> inside the content where appropriate.

RETURN ONLY A JSON OBJECT. NO MARKDOWN FENCES.
{
  \"title\": \"A clear, catchy headline. Max 10 words.\",
  \"html_content\": \"The full article content in raw HTML. Do NOT use markdown. Ensure it is clean, valid HTML.\",
  \"category\": \"{$category}\",
  \"suggested_cover_query\": \"1 to 3 short concrete English words for Unsplash image search.\"
}";

        $result = $this->callGemini($prompt, true);

        if (empty($result) || !isset($result['html_content'])) {
            throw new \App\Exceptions\GenerationException("Gemini / OpenRouter fallback returned empty or invalid JSON structure.");
        }

        $this->validateGeneratedContent([
            'title' => $result['title'] ?? '',
            'html_content' => $result['html_content'],
        ], $category);

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

        $this->validateGeneratedContent([
            'summary' => $result['summary'] ?? '',
            'meta_description' => $result['meta_description'] ?? '',
        ], $title);

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

Rewrite the article incorporating the editor's feedback. Follow the same HTML formatting rules and strict guidelines:
- BANNED HEADINGS: You are strictly FORBIDDEN from using generic, repetitive, or filler subheadings such as 'Why It's Important', 'Why It Matters', 'Deeper Analysis', 'Deep Dive', 'Conclusion', or their exact translations or equivalents.
- DO NOT divide the article into multiple rigid analytical sections that repeat the same information. Every single sentence and bullet point must add NEW, distinct information.
- Write the article so it is incredibly easy to scan, using this exact layout:
  1. **Intro**: A direct, punchy 1-2 sentence paragraph explaining exactly *what* happened, *who* is involved, and *when*. Start directly with the breaking news. Do NOT use any heading for this paragraph.
  2. **Details (Bulleted List)**: A bulleted list (`<ul>` containing 3 to 5 `<li>` elements) breaking down the key specs, facts, numbers, or timeline of the event. Bold the first 2-3 words of each bullet point to make it highly scannable.
  3. **Consequence/Next Steps**: A final short paragraph (2-3 sentences max) explaining the immediate consequence or what happens next. Do NOT use any subheading for this final paragraph.
- Under NO circumstances should you use more than one `<h2>` heading in the entire article, and only use it if it describes a highly specific, contextual aspect of the details (e.g., `<h2>Specs and Pricing</h2>`). Never use generic headings.
- MAXIMUM LENGTH: 300 words.
- Address the editor's feedback directly in your rewrite.
- Output ONLY raw HTML, no markdown fences.

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

        if (empty($result) || empty($result['title'])) {
             throw new \RuntimeException("Translation to {$targetLanguage} failed: Invalid response or empty title.");
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
        $prompt = "Act as the final copy editor for a mainstream tech news site.
        I am giving you an article represented in HTML. It was previously generated by an AI and might have formatting errors, markdown fences inside the HTML, or overly complex vocabulary.
        
        YOUR JOB:
        1. Fix any broken HTML tags.
        2. Remove any markdown code fences (like ```html) from the output.
        3. SIMPLIFY THE WRITING: Ensure the text uses extremely simple, everyday English. Remove any 'verbal vomit', corporate jargon, or complicated words. If a sentence is too long or complex, break it down. It should be easy for anyone to understand.
        4. NEVER change the core facts. Just make it clearer, simpler, and more natural.
        5. STRICTLY REMOVE GENERIC/REPETITIVE SECTIONS & HEADINGS: Scan for and completely strip out any generic analysis headings like 'Why It's Important', 'Why It Matters', 'Deeper Analysis', 'Deep Dive', 'Conclusion' (or their exact translations/synonyms like 'Por qué es Importante', 'El Análisis Más Profundo', 'Conclusión'). Remove these headings, and merge their paragraph content smoothly into the rest of the text as simple, clean paragraphs or bullet points to avoid repetitive AI slop.
        
        ARTICLE HTML:
        {$currentHtml}
        
        CRITICAL: Return ONLY the raw completely corrected HTML string. Do not wrap it in markdown fences.";

        $result = $this->callGemini($prompt, false);
        return trim((string) $result);
    }

    /**
     * Call AI API for conversational messages (via OpenRouter).
     * Returns the text response or a user-friendly error.
     */
    private function callGeminiConversational(array $messages): string
    {
        try {
            return $this->callOpenRouterFallback($messages, false);
        } catch (\Exception $e) {
            Log::error("OpenRouter conversational failed: " . $e->getMessage());
            throw new \RuntimeException('AI API is currently resting or unavailable. Last error: ' . $e->getMessage());
        }
    }

    /**
     * Call AI API for single-prompt requests (via OpenRouter).
     */
    private function callGemini(string $prompt, bool $expectJson = false)
    {
        try {
            return $this->callOpenRouterFallback($prompt, $expectJson);
        } catch (\Exception $e) {
            Log::error("OpenRouter API failed: " . $e->getMessage());
            if ($expectJson) return [];
            throw new \RuntimeException('AI API is currently resting or unavailable. Last error: ' . $e->getMessage());
        }
    }

    /**
     * Fallback method using OpenRouter API
     */
    private function callOpenRouterFallback($promptOrMessages, bool $expectJson = false)
    {
        $apiKey = config('services.openrouter.api_key');
        $modelsConfig = config('services.openrouter.models', 'google/gemini-2.5-pro,anthropic/claude-3.5-sonnet,google/gemini-2.5-flash,meta-llama/llama-3.3-70b-instruct:free,qwen/qwen-2.5-72b-instruct:free,mistralai/mistral-nemo:free');
        
        $modelsArray = array_values(array_filter(array_map('trim', explode(',', $modelsConfig))));
        
        // OpenRouter API limits the 'models' array fallback to a maximum of 3 items
        $modelsArray = array_slice($modelsArray, 0, 3);

        if (is_string($promptOrMessages)) {
            $messages = [['role' => 'user', 'content' => $promptOrMessages]];
        } else {
            $messages = [];
            foreach ($promptOrMessages as $msg) {
                $role = (isset($msg['role']) && $msg['role'] === 'model') ? 'assistant' : 'user';
                $content = $msg['parts'][0]['text'] ?? '';
                $messages[] = ['role' => $role, 'content' => $content];
            }
        }

        $payload = [
            'models' => $modelsArray,
            'messages' => $messages,
            'max_tokens' => 4000,
        ];

        if ($expectJson) {
            $payload['response_format'] = ['type' => 'json_object'];
        }

        $response = Http::timeout(180)
            ->withHeaders([
                'Authorization' => "Bearer {$apiKey}",
                'HTTP-Referer' => config('app.url'),
                'X-Title' => config('app.name'),
            ])
            ->post('https://openrouter.ai/api/v1/chat/completions', $payload);

        if ($response->successful()) {
            $json = $response->json();
            $text = $json['choices'][0]['message']['content'] ?? '';
            $result = $expectJson ? $this->extractJson($text) : trim($text);

            // Track OpenRouter API Usage tokens
            if (isset($json['usage'])) {
                $actualModel = $json['model'] ?? 'openrouter';
                \Illuminate\Support\Facades\DB::table('gemini_logs')->insert([
                    'model_name' => $actualModel,
                    'operation_type' => 'openrouter',
                    'prompt_tokens' => $json['usage']['prompt_tokens'] ?? 0,
                    'completion_tokens' => $json['usage']['completion_tokens'] ?? 0,
                    'total_tokens' => $json['usage']['total_tokens'] ?? 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
            
            // Normalize single object responses to an array of objects
            if ($expectJson && is_array($result) && isset($result['title']) && isset($result['prompt'])) {
                return [$result];
            }
            return $result;
        }

        throw new \RuntimeException("OpenRouter API Error: " . $response->body());
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
        Log::warning("GeminiService: Failed to decode JSON. Raw response: " . $text);
        return [];
    }

    /**
     * Generate an embedding vector for the given text using gemini-embedding-2.
     * Returns an array of floats (typically 768 dimensions for Gemini).
     */
    public function embedText(string $text): array
    {
        $this->ensureApiKey();

        // Models to try in order of preference
        $embeddingModels = [
            'gemini-embedding-2',
            'text-embedding-004',
            'gemini-embedding-001'
        ];

        foreach ($embeddingModels as $model) {
            try {
                $response = Http::timeout(60)->post(
                    "https://generativelanguage.googleapis.com/v1beta/models/{$model}:embedContent?key={$this->apiKey}",
                    [
                        'model' => "models/{$model}",
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

                $status = $response->status();
                if ($status === 404 || $status === 400 || $status === 429) {
                    Log::warning("Gemini Embedding: Model '{$model}' failed ({$status}). Cascading to next model.");
                    continue;
                }

                Log::error("Gemini Embedding Error on model '{$model}': " . $response->body());
                // For other errors, we still try the next model just in case it's a model-specific outage
            } catch (\Exception $e) {
                Log::warning("Gemini Embedding Connection Error on model '{$model}': " . $e->getMessage());
                // Try next model
            }
        }

        Log::error("All Gemini embedding models failed.");
        return [];
    }

    /**
     * Check multiple fields for common AI failure patterns and prompt leaks.
     */
    private function validateGeneratedContent(array $fields, string $context = ''): void
    {
        $garbagePatterns = [
            'Failed to generate content',
            'Rewrite this article',
            'original topic but enforcing strict rules',
            'current summary',
            'editorial brief',
            'I cannot fulfill',
            'As an AI model',
            'is resting or unavailable',
            'Quota exhausted',
            'Internal Server Error'
        ];

        foreach ($fields as $key => $value) {
            if (!is_string($value)) continue;

            foreach ($garbagePatterns as $pattern) {
                if (stripos($value, $pattern) !== false) {
                    Log::warning("Gemini Integrity Warning: Pattern '{$pattern}' found in field '{$key}' for context '{$context}'.");
                    throw new \App\Exceptions\GenerationException("Gemini returned garbage/error content or prompt leak in field '{$key}'.");
                }
            }
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
