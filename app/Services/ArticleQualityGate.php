<?php

declare(strict_types=1);

namespace App\Services;

class ArticleQualityGate
{
    /**
     * Banned clichés and corporate fluff phrases across English and Spanish.
     */
    private const BANNED_PATTERNS = [
        // English fluff
        'stark reminder',
        'in a troubling development',
        'troubling development',
        'relentless pace',
        'enterprises cannot afford',
        'organizations must urgently',
        'elevate it to a business-critical function',
        'elevate it to a business critical function',
        'paradigm shift',
        'testament to',
        'delve into',
        'delving into',
        'rich tapestry',
        'intricate dance',
        'beacon of',
        'serves as a reminder',
        'is a reminder that',
        'wake-up call',
        'at the end of the day',
        'moving forward, companies must',

        // Spanish fluff
        'recordatorio contundente',
        'un recordatorio contundente',
        'en un desarrollo inquietante',
        'desarrollo inquietante',
        'ritmo implacable',
        'las empresas no pueden permitirse',
        'las organizaciones deben',
        'elevarlo a una función crítica',
        'elevarlo a una funcion critica',
        'cambio de paradigma',
        'un testimonio de',
        'adentrarse en',
        'llamada de atención',
        'llamada de atencion',
        'toque de atención',
        'el tiempo dirá',
        'solo el tiempo dirá',
        'en resumidas cuentas',
    ];

    /**
     * Banned generic headings.
     */
    private const BANNED_HEADINGS = [
        'why it matters',
        'why it is important',
        'deeper analysis',
        'deep dive',
        'conclusion',
        'final thoughts',
        'the techynews take',
        'looking ahead',
        'por qué es importante',
        'por que es importante',
        'por qué importa',
        'análisis más profundo',
        'analisis mas profundo',
        'conclusión',
        'conclusion',
        'reflexiones finales',
        'el veredicto de techy',
        'mirando al futuro',
    ];

    /**
     * Audit an article HTML string against quality guidelines.
     *
     * @return array{
     *   passed: bool,
     *   fluff_violations: array<int, string>,
     *   heading_violations: array<int, string>,
     *   word_count: int,
     *   issues: array<int, string>
     * }
     */
    public function audit(string $html): array
    {
        $cleanText = mb_strtolower(strip_tags($html), 'UTF-8');
        $fluffViolations = [];
        $headingViolations = [];
        $issues = [];

        // 1. Check for banned fluff
        foreach (self::BANNED_PATTERNS as $pattern) {
            if (str_contains($cleanText, $pattern)) {
                $fluffViolations[] = $pattern;
            }
        }

        // 2. Check for banned headings in <h2> and <h3>
        if (preg_match_all('/<h[2-4][^>]*>(.*?)<\/h[2-4]>/i', $html, $matches)) {
            foreach ($matches[1] as $heading) {
                $normalizedHeading = trim(mb_strtolower(strip_tags($heading), 'UTF-8'));
                foreach (self::BANNED_HEADINGS as $banned) {
                    if ($normalizedHeading === $banned || str_starts_with($normalizedHeading, $banned . ':')) {
                        $headingViolations[] = $heading;
                    }
                }
            }
        }

        // 3. Word count check
        $wordCount = str_word_count(strip_tags($html));
        if ($wordCount < 400) {
            $issues[] = "Article is too short ({$wordCount} words). Needs at least 450 words of concrete coverage.";
        }

        // 4. Check for forbidden publisher logos / badges in <img> tags
        $imageViolations = [];
        $imageService = app(ImageService::class);
        if (preg_match_all('/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/i', $html, $imgMatches)) {
            foreach ($imgMatches[1] as $imgSrc) {
                if ($imageService->isForbiddenLogoOrBadge($imgSrc)) {
                    $imageViolations[] = $imgSrc;
                }
            }
        }

        if (!empty($fluffViolations)) {
            $issues[] = "Contains " . count($fluffViolations) . " banned corporate fluff cliché(s): " . implode(', ', array_slice($fluffViolations, 0, 4));
        }

        if (!empty($headingViolations)) {
            $issues[] = "Contains generic heading(s): " . implode(', ', $headingViolations);
        }

        if (!empty($imageViolations)) {
            $issues[] = "Contains forbidden publisher logo/badge image(s): " . implode(', ', $imageViolations);
        }

        $passed = empty($fluffViolations) && empty($headingViolations) && empty($imageViolations) && $wordCount >= 400;

        return [
            'passed' => $passed,
            'fluff_violations' => $fluffViolations,
            'heading_violations' => $headingViolations,
            'image_violations' => $imageViolations,
            'word_count' => $wordCount,
            'issues' => $issues,
        ];
    }

    /**
     * Generate prompt instructions to remove detected issues during revision.
     */
    public function buildRevisionFeedback(array $auditResult): string
    {
        $instructions = [];
        if (!empty($auditResult['fluff_violations'])) {
            $instructions[] = "STRICTLY ELIMINATE these banned corporate fluff clichés: " .
                implode(', ', $auditResult['fluff_violations']) . ". Replace every generic moralizing sentence with a concrete fact, quote, or specific detail.";
        }

        if (!empty($auditResult['heading_violations'])) {
            $instructions[] = "REPLACE generic subheadings (" .
                implode(', ', $auditResult['heading_violations']) . ") with descriptive, narrative headers specific to this story.";
        }

        if (($auditResult['word_count'] ?? 0) < 450) {
            $instructions[] = "EXPAND the article with more concrete facts, statistics, real affected services, or technical context so it reaches 650-900 words without padding.";
        }

        return implode("\n", $instructions);
    }
}
