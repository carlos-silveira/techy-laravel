<?php

namespace App\Services;

use App\Models\Article;
use App\Models\FactCheck;
use App\Models\FactCheckClaim;
use Illuminate\Support\Facades\Log;

class FactCheckService
{
    private GeminiService $gemini;
    private SourceSearchService $searcher;

    public function __construct(GeminiService $gemini, SourceSearchService $searcher)
    {
        $this->gemini = $gemini;
        $this->searcher = $searcher;
    }

    /**
     * Main entry point to fact-check an article.
     */
    public function checkArticle(Article $article): FactCheck
    {
        Log::info("FactCheckService: Starting check for article ID {$article->id} - '{$article->title}'");
        
        $factCheck = FactCheck::create([
            'article_id' => $article->id,
            'status' => 'checking',
            'checker_model' => config('services.gemini.model', 'gemini-2.5-flash'),
        ]);

        try {
            // 1. Extract Claims
            $claims = $this->extractClaims($article->content ?? '');
            
            if (empty($claims)) {
                Log::info("FactCheckService: No verifiable claims found for article ID {$article->id}");
                return $this->storeResults($article, $factCheck, 100, [], []); // Auto-pass if no claims
            }

            // 2. Search for sources for each claim
            $sourcesByClaim = [];
            foreach ($claims as $claim) {
                $sourcesByClaim[$claim] = $this->searcher->searchForClaim($claim);
            }

            // 3. Verify claims against sources using AI
            $verdicts = $this->crossReferenceVerify($claims, $sourcesByClaim);

            // 4. Calculate Score
            $score = $this->calculateScore($verdicts);

            // 5. Store Results
            return $this->storeResults($article, $factCheck, $score, $claims, $verdicts);

        } catch (\Exception $e) {
            Log::error("FactCheckService: Check failed for article ID {$article->id}: " . $e->getMessage());
            
            $factCheck->update([
                'status' => 'failed',
                'error_log' => $e->getMessage() . "\n" . $e->getTraceAsString(),
            ]);

            $article->update([
                'fact_check_status' => 'failed'
            ]);

            return $factCheck;
        }
    }

    /**
     * Uses AI to extract 5-10 specific, verifiable factual claims from the article text.
     */
    private function extractClaims(string $content): array
    {
        $cleanText = strip_tags($content);
        if (strlen($cleanText) < 100) return []; // Too short

        $prompt = "You are a senior fact-checker. Extract the most important verifiable factual claims from the following article.
        
ARTICLE TEXT:
{$cleanText}

RULES:
1. Extract 3 to 8 specific, concrete claims.
2. Focus ONLY on hard facts: numbers, dates, company announcements, product specs, specific events, or exact quotes.
3. Ignore subjective opinions, general trends, introductory fluff, or predictions.
4. Each claim must be a complete, standalone sentence that can be searched for independently. Example: 'Apple announced the iPhone 16 on September 9th, 2024.'

Return ONLY a JSON array of strings (no markdown fences). Example:
[\"Claim 1\", \"Claim 2\"]";

        try {
            // Re-using the GeminiService internal method conceptually. We'll use reflection or just expose a generic json call.
            // Since callGemini is private, we will use the studioChat or a custom method. Let's add a raw JSON call method to GeminiService if we could,
            // but we can also use editorAction with a workaround or instantiate Http here if we don't want to modify GeminiService too much.
            // ACTUALLY: Let's just use the generateArticleMeta style trick, or we can use the same API key logic here.
            // Wait, we can modify GeminiService to expose a `generateJson(string $prompt)` method. For now, I'll use Http directly here to ensure it works,
            // or I can assume `generateJson` exists and I'll add it to GeminiService next. Let's assume we add `askJson` to GeminiService.
            
            $response = $this->gemini->askJson($prompt);
            
            if (is_array($response)) {
                return array_filter($response, fn($c) => is_string($c));
            }
            
            // If it returned an object with a 'claims' key
            if (isset($response['claims']) && is_array($response['claims'])) {
                return array_filter($response['claims'], fn($c) => is_string($c));
            }
            
            return [];
        } catch (\Exception $e) {
            Log::warning("FactCheckService: Claim extraction failed: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Cross-references the claims against the fetched sources to determine a verdict.
     */
    private function crossReferenceVerify(array $claims, array $sourcesByClaim): array
    {
        $verdicts = [];
        
        // Batch verification to save AI calls
        $batchSize = 5;
        $chunks = array_chunk($claims, $batchSize);

        foreach ($chunks as $chunk) {
            $contextString = "";
            foreach ($chunk as $index => $claim) {
                $contextString .= "CLAIM " . ($index + 1) . ": {$claim}\n";
                $contextString .= "SOURCES FOUND FOR CLAIM " . ($index + 1) . ":\n";
                
                $sources = $sourcesByClaim[$claim] ?? [];
                if (empty($sources)) {
                    $contextString .= "  [No sources found]\n";
                } else {
                    foreach ($sources as $sIdx => $source) {
                        $contextString .= "  - Source " . ($sIdx + 1) . " [{$source['domain']}]: {$source['content_excerpt']}\n";
                    }
                }
                $contextString .= "\n";
            }

            $prompt = "You are an elite journalistic fact-checker. Evaluate the truthfulness of the following claims based STRICTLY on the provided source excerpts from trusted domains.

EVIDENCE CONTEXT:
{$contextString}

RULES:
1. For each claim, determine the verdict: 'verified', 'partially_true', 'false', 'unverifiable', or 'unverified' (if no sources found).
2. 'verified': The sources explicitly confirm the claim.
3. 'partially_true': The sources confirm part of it, but miss details or add nuance.
4. 'false': The sources explicitly contradict the claim.
5. 'unverifiable': The sources mention the topic but don't contain enough info to prove/disprove it.
6. Provide a 1-2 sentence explanation of your reasoning.
7. List the indexes of the sources (1, 2, 3) that support or contradict the claim.

Return ONLY a JSON array of objects (no markdown fences):
[
  {
    \"claim_index\": 1,
    \"verdict\": \"verified\",
    \"explanation\": \"Reuters confirms the exact date and product name.\",
    \"supporting_source_indexes\": [1],
    \"contradicting_source_indexes\": []
  }
]";

            try {
                $response = $this->gemini->askJson($prompt);
                
                $responseVerdicts = [];
                if (is_array($response)) {
                    if (isset($response['verdicts']) && is_array($response['verdicts'])) {
                        $responseVerdicts = $response['verdicts'];
                    } else {
                        $responseVerdicts = $response;
                    }
                }

                foreach ($responseVerdicts as $v) {
                    if (!isset($v['claim_index'])) continue;
                    
                    $originalIndex = $v['claim_index'] - 1; // 0-indexed
                    if (!isset($chunk[$originalIndex])) continue;

                    $claimStr = $chunk[$originalIndex];
                    $claimSources = $sourcesByClaim[$claimStr] ?? [];

                    $supporting = [];
                    $contradicting = [];

                    foreach ($v['supporting_source_indexes'] ?? [] as $sIdx) {
                        if (isset($claimSources[$sIdx - 1])) {
                            $supporting[] = $claimSources[$sIdx - 1];
                        }
                    }

                    foreach ($v['contradicting_source_indexes'] ?? [] as $sIdx) {
                        if (isset($claimSources[$sIdx - 1])) {
                            $contradicting[] = $claimSources[$sIdx - 1];
                        }
                    }

                    $verdicts[$claimStr] = [
                        'verdict' => $v['verdict'] ?? 'unverifiable',
                        'explanation' => $v['explanation'] ?? '',
                        'supporting_sources' => $supporting,
                        'contradicting_sources' => $contradicting,
                        'raw_ai' => $v
                    ];
                }
            } catch (\Exception $e) {
                Log::warning("FactCheckService: Verification batch failed: " . $e->getMessage());
                // Fallback: mark all in chunk as unverifiable if API fails
                foreach ($chunk as $claim) {
                    $verdicts[$claim] = [
                        'verdict' => 'unverifiable',
                        'explanation' => 'API Verification failed.',
                        'supporting_sources' => [],
                        'contradicting_sources' => [],
                        'raw_ai' => null
                    ];
                }
            }
        }

        return $verdicts;
    }

    /**
     * Computes the final 0-100 score based on verdicts and source tiers.
     */
    private function calculateScore(array $verdicts): int
    {
        if (empty($verdicts)) return 100;

        $totalScore = 0;
        $maxPossible = count($verdicts) * 100;
        $tier1Count = 0;

        foreach ($verdicts as $v) {
            $basePoints = 0;
            $bestWeight = 0.5; // default low weight if no sources

            switch ($v['verdict']) {
                case 'verified':
                    $basePoints = 100;
                    break;
                case 'partially_true':
                    $basePoints = 50;
                    break;
                case 'unverifiable':
                    $basePoints = 40; // Neutral, can't heavily penalize
                    break;
                case 'unverified':
                    $basePoints = 20; // Bad, means no corroborating evidence found for a factual claim
                    break;
                case 'false':
                    $basePoints = 0;
                    break;
            }

            // Find best source weight
            foreach ($v['supporting_sources'] as $source) {
                if (isset($source['weight']) && $source['weight'] > $bestWeight) {
                    $bestWeight = $source['weight'];
                }
                if (isset($source['tier']) && $source['tier'] === 1) {
                    $tier1Count++;
                }
            }

            // For negative verdicts, the weight works against them
            if ($basePoints < 50) {
                $totalScore += $basePoints; 
            } else {
                $totalScore += ($basePoints * $bestWeight);
            }
        }

        $finalScore = (int) round(($totalScore / $maxPossible) * 100);

        // Bonus for having multiple Tier 1 sources corroborating
        if ($tier1Count >= 3) {
            $finalScore += 5;
        }

        return min(100, max(0, $finalScore));
    }

    /**
     * Stores the final results to the database and updates the article.
     */
    private function storeResults(Article $article, FactCheck $factCheck, int $score, array $claims, array $verdicts): FactCheck
    {
        $minScore = (int) config('services.fact_check.min_score', 60);
        $blockScore = (int) config('services.fact_check.block_score', 40);

        $status = 'passed';
        if ($score < $blockScore) {
            $status = 'failed';
        } elseif ($score < $minScore) {
            $status = 'needs_review';
        }

        $verifiedCount = 0;
        $failedCount = 0;
        $allSourcesChecked = [];

        foreach ($verdicts as $claim => $v) {
            if ($v['verdict'] === 'verified') $verifiedCount++;
            if ($v['verdict'] === 'false') $failedCount++;

            foreach ($v['supporting_sources'] as $s) $allSourcesChecked[] = $s['url'];
            foreach ($v['contradicting_sources'] as $s) $allSourcesChecked[] = $s['url'];
        }

        $factCheck->update([
            'overall_score' => $score,
            'status' => $status,
            'claims_count' => count($claims),
            'verified_count' => $verifiedCount,
            'failed_count' => $failedCount,
            'sources_checked' => array_values(array_unique($allSourcesChecked)),
            'raw_ai_response' => $verdicts,
            'checked_at' => now(),
        ]);

        foreach ($verdicts as $claim => $v) {
            FactCheckClaim::create([
                'fact_check_id' => $factCheck->id,
                'claim_text' => $claim,
                'verdict' => $v['verdict'],
                'confidence' => ($v['verdict'] === 'verified' || $v['verdict'] === 'false') ? 90 : 50,
                'supporting_sources' => $v['supporting_sources'],
                'contradicting_sources' => $v['contradicting_sources'],
                'ai_explanation' => $v['explanation'],
            ]);
        }

        $article->update([
            'fact_check_score' => $score,
            'fact_check_status' => $status,
        ]);

        return $factCheck;
    }
}
