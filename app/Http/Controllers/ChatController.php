<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Services\GeminiService;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    private GeminiService $gemini;

    public function __construct(GeminiService $gemini)
    {
        $this->gemini = $gemini;
    }

    public function ask(Request $request)
    {
        $request->validate([
            'query' => 'required|string|max:500'
        ]);

        $userQuery = $request->input('query');

        // 1. Try vector embedding search first
        $contextString = '';
        $queryEmbedding = $this->gemini->embedText($userQuery);

        if (!empty($queryEmbedding)) {
            // Fetch all articles with embeddings and rank by cosine similarity
            $articles = Article::whereNotNull('embedding')->where('status', 'published')->get();

            if ($articles->isNotEmpty()) {
                $scoredArticles = [];
                foreach ($articles as $article) {
                    $similarity = $this->cosineSimilarity($queryEmbedding, $article->embedding);
                    $scoredArticles[] = ['article' => $article, 'score' => $similarity];
                }
                usort($scoredArticles, fn($a, $b) => $b['score'] <=> $a['score']);
                $topContext = array_slice($scoredArticles, 0, 3);

                foreach ($topContext as $idx => $match) {
                    $a = $match['article'];
                    $contextString .= "Article " . ($idx + 1) . " (Slug: {$a->slug}):\nTitle: {$a->title}\nSummary: {$a->ai_summary}\nContent Excerpt: " . substr(strip_tags($a->content), 0, 1500) . "\n\n";
                }
            }
        }

        // 2. Fallback: keyword-based search if embedding failed or returned no results
        if (empty($contextString)) {
            Log::warning('RAG: embedding empty, falling back to keyword search for query: ' . substr($userQuery, 0, 100));
            $keywords = array_filter(explode(' ', preg_replace('/[^\w\s]/u', '', $userQuery)));
            $queryBuilder = Article::where('status', 'published');

            if (!empty($keywords)) {
                $queryBuilder->where(function ($q) use ($keywords) {
                    foreach (array_slice($keywords, 0, 5) as $word) {
                        if (strlen($word) >= 3) {
                            $q->orWhere('title', 'like', "%{$word}%")
                              ->orWhere('ai_summary', 'like', "%{$word}%");
                        }
                    }
                });
            }

            $fallbackArticles = $queryBuilder->orderByDesc('created_at')->limit(3)->get();

            if ($fallbackArticles->isEmpty()) {
                // Last resort: just use the 3 most recent articles as context
                $fallbackArticles = Article::where('status', 'published')->latest()->limit(3)->get();
            }

            foreach ($fallbackArticles as $idx => $a) {
                $contextString .= "Article " . ($idx + 1) . " (Slug: {$a->slug}):\nTitle: {$a->title}\nSummary: {$a->ai_summary}\nContent Excerpt: " . substr(strip_tags($a->content ?? ''), 0, 1500) . "\n\n";
            }
        }

        // 3. Build the RAG prompt
        $prompt = <<<PROMPT
You are 'Techy AI', an internal copilot for our tech news platform.
Answer the user's question based on the context retrieved from our article database.
If the context doesn't directly answer the question, say so honestly — do not hallucinate.
Keep answers concise, professional, and punchy.
Use Markdown formatting. If you mention an article, link to it like [Article Title](/article/slug-here).

RETRIEVED CONTEXT FROM OUR DATABASE:
{$contextString}

USER QUESTION:
{$userQuery}
PROMPT;

        // 4. Stream the response as plain text (NOT JSON)
        return response()->stream(function () use ($prompt) {
            $apiKey = config('services.gemini.api_key', env('GEMINI_API_KEY'));
            $model  = 'gemini-1.5-flash';

            if (empty($apiKey)) {
                echo "I'm unable to connect to my knowledge engine right now. Please try again in a moment.";
                flush();
                return;
            }

            $payload = [
                'contents'         => [['parts' => [['text' => $prompt]]]],
                'generationConfig' => ['temperature' => 0.3, 'maxOutputTokens' => 1024],
            ];

            $ch = curl_init("https://generativelanguage.googleapis.com/v1beta/models/{$model}:streamGenerateContent?alt=sse&key={$apiKey}");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
            curl_setopt($ch, CURLOPT_TIMEOUT, 60);

            $gotContent = false;
            curl_setopt($ch, CURLOPT_WRITEFUNCTION, function ($ch, $chunk) use (&$gotContent) {
                $lines = explode("\n", $chunk);
                foreach ($lines as $line) {
                    if (!str_starts_with($line, 'data: ')) continue;
                    $jsonString = substr($line, 6);
                    if ($jsonString === '[DONE]') continue;

                    $data = json_decode($jsonString, true);
                    if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                        $text = $data['candidates'][0]['content']['parts'][0]['text'];
                        echo $text;
                        flush();
                        $gotContent = true;
                    }

                    // Surface any API error messages as plain text (not silent JSON)
                    if (isset($data['error']['message'])) {
                        $errMsg = $data['error']['message'];
                        Log::error("RAG stream API error: {$errMsg}");
                        if (!$gotContent) {
                            echo "\n\n*My knowledge engine encountered an error. Please try again in a moment.*";
                            flush();
                        }
                    }
                }
                return strlen($chunk);
            });

            $curlResult = curl_exec($ch);
            $curlError  = curl_error($ch);
            curl_close($ch);

            if ($curlError) {
                Log::error("RAG cURL error: {$curlError}");
                if (!$gotContent) {
                    echo "I'm having trouble connecting to my knowledge engine right now. Please try again.";
                    flush();
                }
            }
        }, 200, [
            'Content-Type'     => 'text/plain; charset=UTF-8',
            'X-Accel-Buffering' => 'no',
            'Cache-Control'    => 'no-cache',
        ]);
    }

    /**
     * Compute cosine similarity between two float vectors.
     */
    private function cosineSimilarity(array $A, array $B): float
    {
        $dotProduct = 0;
        $normA      = 0;
        $normB      = 0;
        $count      = min(count($A), count($B));

        if ($count === 0) return 0;

        for ($i = 0; $i < $count; $i++) {
            $dotProduct += $A[$i] * $B[$i];
            $normA      += $A[$i] * $A[$i];
            $normB      += $B[$i] * $B[$i];
        }

        if ($normA == 0 || $normB == 0) return 0;

        return $dotProduct / (sqrt($normA) * sqrt($normB));
    }
}
