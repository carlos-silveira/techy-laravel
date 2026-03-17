<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class LlamaService
{
    /**
     * The base URL for the local MLX API (OpenAI compatible).
     */
    private string $baseUrl = 'http://localhost:8080/v1';
    private string $model;

    public function __construct()
    {
        // Using MLX native model for M4 performance
        $this->model = env('AI_MODEL', 'mlx-community/Qwen2.5-Coder-32B-4bit');
    }

    /**
     * Generate an AI brief summarizing the article content.
     */
    public function generateBrief(string $content): string
    {
        $prompt = "Generate a concise executive summary for the following tech article content. Focus on the main takeaways:\n\n" . mb_strimwidth($content, 0, 3000, "...");

        return $this->generate($prompt, $this->model);
    }

    /**
     * Ask AI directly with a custom prompt.
     */
    public function askLlamaDirect(string $prompt): string
    {
        return $this->generate($prompt, $this->model);
    }

    /**
     * Multi-turn chat with AI.
     */
    public function chat(array $messages): string
    {
        try {
            $response = Http::timeout(180)->post("{$this->baseUrl}/chat/completions", [
                'model' => $this->model,
                'messages' => $messages,
                'stream' => false,
            ]);

            if ($response->successful()) {
                return trim($response->json('choices.0.message.content') ?? '');
            }

            Log::error('AI Chat API Error: ' . $response->body());
            return "Error: " . $response->status();
        } catch (\Exception $e) {
            Log::error('AI Chat Connection Error: ' . $e->getMessage());
            return "Error: " . $e->getMessage();
        }
    }

    /**
     * Draft a full article based on a topic and tone.
     */
    public function draftArticle(string $topic, string $tone = 'professional'): string
    {
        $prompt = "Write a comprehensive article about \"{$topic}\". The tone should be {$tone}. Format the output in Markdown.";

        return $this->generate($prompt, $this->model);
    }

    /**
     * Generate a visual prompt for an image generator.
     */
    public function generateImagePrompt(string $content): string
    {
        $prompt = "Based on the following article content, generate a detailed visual description for an AI image generator. The prompt should be atmospheric, futuristic, and suitable for a high-end tech publication. Return ONLY the prompt text, no headers or explanations.\n\nContent:\n" . mb_strimwidth($content, 0, 2000, "...");

        return $this->generate($prompt, $this->model);
    }

    /**
     * Generate SEO metadata (description and keywords) from article content.
     */
    public function generateSeoTags(string $content): array
    {
        $prompt = "Analyze the following article content and generate a concise SEO meta description (max 150 characters) and a comma-separated list of 5 exact SEO keywords. Return ONLY a pure JSON object with the keys 'description' and 'keywords'.\n\nContent:\n" . mb_strimwidth($content, 0, 3000, "...");

        $response = $this->generate($prompt, $this->model);

        // Robust JSON extraction
        $decoded = $this->extractJson($response);

        return [
            'description' => $decoded['description'] ?? 'Techy News AI Automated Article',
            'keywords' => $decoded['keywords'] ?? 'news, tech, ai',
        ];
    }

    /**
     * Extracts JSON from a string that might contain other text.
     */
    private function extractJson(string $text): array
    {
        $start = strpos($text, '{');
        $end = strrpos($text, '}');

        if ($start !== false && $end !== false) {
            $json = substr($text, $start, $end - $start + 1);
            $decoded = json_decode($json, true);
            if (is_array($decoded)) {
                return $decoded;
            }
        }

        return [];
    }

    /**
     * Core method to communicate with the MLX API /v1/completions or /v1/chat/completions.
     */
    private function generate(string $prompt, string $model): string
    {
        try {
            $response = Http::timeout(180)->post("{$this->baseUrl}/chat/completions", [
                'model' => $model,
                'messages' => [
                    ['role' => 'user', 'content' => $prompt]
                ],
                'stream' => false,
            ]);

            if ($response->successful()) {
                return trim($response->json('choices.0.message.content') ?? '');
            }

            Log::error('AI API Error: ' . $response->body());
            return "Error: " . $response->status();
        } catch (\Exception $e) {
            Log::error('AI Connection Error: ' . $e->getMessage());
            return "Error: " . $e->getMessage();
        }
    }
}
