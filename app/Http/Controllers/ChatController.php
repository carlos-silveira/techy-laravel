<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Services\GeminiService;

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

        // 1. Embed user query
        $queryEmbedding = $this->gemini->embedText($userQuery);
        
        if (empty($queryEmbedding)) {
            return response()->json(['answer' => 'I am currently unable to process your request. Please try again later.']);
        }

        // 2. Fetch all articles with embeddings
        // In a real large-scale app, you'd use a Vector DB (Pinecone, Qdrant) or pgvector/sqlite-vss
        // Since we have a manageably small dataset of elite articles, we compute Cosine Similarity in PHP
        $articles = Article::whereNotNull('embedding')->get();
        
        $scoredArticles = [];
        foreach ($articles as $article) {
            $similarity = $this->cosineSimilarity($queryEmbedding, $article->embedding);
            $scoredArticles[] = [
                'article' => $article,
                'score' => $similarity
            ];
        }

        // 3. Sort by highest similarity
        usort($scoredArticles, fn($a, $b) => $b['score'] <=> $a['score']);

        // 4. Take top 3 relevant articles for Context
        $topContext = array_slice($scoredArticles, 0, 3);
        $contextString = "";

        foreach ($topContext as $idx => $match) {
            $a = $match['article'];
            $contextString .= "Article " . ($idx+1) . " (Slug: {$a->slug}):\nTitle: {$a->title}\nSummary: {$a->ai_summary}\nContent Excerpt: " . substr(strip_tags($a->content), 0, 1500) . "\n\n";
        }

        // 5. Ask Gemini
        $prompt = "You are 'Techy AI', an internal copilot for our tech platform.
You must answer the user's question based strictly on the provided context retrieved from our database using RAG.
If the context doesn't have the answer, say you don't know based on our proprietary data. Do not hallucinate external facts.
Keep it punchy, professional, and directly address the user. 
Use Markdown to format your response nicely. If you mention an article, you can link to it like [Article Title](/article/slug-here).

RETRIEVED CONTEXT FROM OUR DATABASE:
{$contextString}

USER QUESTION:
{$userQuery}
";

        return response()->stream(function () use ($prompt) {
            $apiKey = config('services.gemini.api_key', env('GEMINI_API_KEY'));
            $model = 'gemini-2.5-flash';
            
            $payload = [
                'contents' => [['parts' => [['text' => $prompt]]]],
                'generationConfig' => [
                    'temperature' => 0.3
                ]
            ];

            $ch = curl_init("https://generativelanguage.googleapis.com/v1beta/models/{$model}:streamGenerateContent?alt=sse&key={$apiKey}");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
            curl_setopt($ch, CURLOPT_WRITEFUNCTION, function($ch, $chunk) {
                // Parse Server-Sent Events (SSE)
                $lines = explode("\n", $chunk);
                foreach ($lines as $line) {
                    if (str_starts_with($line, 'data: ')) {
                        $jsonString = substr($line, 6);
                        if ($jsonString === '[DONE]') continue;
                        
                        $data = json_decode($jsonString, true);
                        if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                            echo $data['candidates'][0]['content']['parts'][0]['text'];
                            flush();
                        }
                    }
                }
                return strlen($chunk);
            });
            
            curl_exec($ch);
            curl_close($ch);
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'X-Accel-Buffering' => 'no',
            'Cache-Control' => 'no-cache',
        ]);
    }

    /**
     * Compute cosine similarity between two vectors.
     */
    private function cosineSimilarity(array $A, array $B): float
    {
        $dotProduct = 0;
        $normA = 0;
        $normB = 0;
        $count = min(count($A), count($B));

        if ($count === 0) return 0;

        for ($i = 0; $i < $count; $i++) {
            $dotProduct += $A[$i] * $B[$i];
            $normA += $A[$i] * $A[$i];
            $normB += $B[$i] * $B[$i];
        }

        if ($normA == 0 || $normB == 0) return 0;

        return $dotProduct / (sqrt($normA) * sqrt($normB));
    }
}
