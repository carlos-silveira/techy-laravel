<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class LlamaService
{
    /**
     * The base URL for the local Ollama API.
     * Default port is 11434.
     */
    private string $baseUrl = 'http://localhost:11434/api';

    /**
     * Generate an AI brief summarizing a list of news items.
     *
     * @param array $newsItems
     * @return string
     */
    public function generateBrief(array $newsItems): string
    {
        $prompt = "Generate a concise executive summary for the following tech news items:\n\n";
        foreach ($newsItems as $index => $item) {
            $prompt .= ($index + 1) . ". " . $item['title'] . "\n";
        }

        return $this->generate($prompt, 'llama3'); // Assuming 'llama3' is the default installed model
    }

    /**
     * Draft a full article based on a topic and tone.
     *
     * @param string $topic
     * @param string $tone
     * @return string
     */
    public function draftArticle(string $topic, string $tone = 'professional'): string
    {
        $prompt = "Write a comprehensive article about \"{$topic}\". The tone should be {$tone}. Format the output in Markdown.";

        return $this->generate($prompt, 'llama3');
    }

    /**
     * Generate SEO metadata (description and keywords) from article content.
     *
     * @param string $content
     * @return array
     */
    public function generateSeoTags(string $content): array
    {
        $prompt = "Analyze the following article content and generate a concise SEO meta description (max 150 characters) and a comma-separated list of 5 exact SEO keywords. Return ONLY a pure JSON object with the keys 'description' and 'keywords'. Do not wrap in markdown tags or add conversational text.\n\nContent:\n" . mb_strimwidth($content, 0, 3000, "...");

        $response = $this->generate($prompt, 'llama3');

        // Clean markdown JSON wrapping if present
        $cleanJson = str_replace(['```json', '```'], '', $response);
        $decoded = json_decode(trim($cleanJson), true);

        return [
            'description' => $decoded['description'] ?? 'Techy News AI Automated Article',
            'keywords' => $decoded['keywords'] ?? 'news, tech, ai',
        ];
    }

    /**
     * Core method to communicate with the Ollama /api/generate endpoint.
     *
     * @param string $prompt
     * @param string $model
     * @return string
     */
    private function generate(string $prompt, string $model): string
    {
        try {
            $response = Http::timeout(60)->post("{$this->baseUrl}/generate", [
                'model' => $model,
                'prompt' => $prompt,
                'stream' => false,
            ]);

            if ($response->successful()) {
                return $response->json('response') ?? '';
            }

            Log::error('Llama API Error: ' . $response->body());
            return "Error: Could not generate content. Verify Ollama is running.";
        } catch (\Exception $e) {
            Log::error('Llama Connection Error: ' . $e->getMessage());
            return "Error: Could not connect to the local Llama instance at {$this->baseUrl}. Is Ollama running?";
        }
    }
}
