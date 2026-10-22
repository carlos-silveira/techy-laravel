<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ArticleResearchService
{
    private JinaReaderService $jinaReader;
    private SourceSearchService $sourceSearcher;

    public function __construct(JinaReaderService $jinaReader, SourceSearchService $sourceSearcher)
    {
        $this->jinaReader = $jinaReader;
        $this->sourceSearcher = $sourceSearcher;
    }

    /**
     * Build a multi-source research dossier containing primary and corroborating evidence.
     *
     * @return array{
     *   dossier_text: string,
     *   sources: array<int, array{label: string, url: string, domain: string, title: string}>,
     *   images: array<int, array{url: string, alt: string}>
     * }
     */
    public function buildResearchDossier(string $title, ?string $primarySourceUrl = null): array
    {
        Log::info("ArticleResearchService: Building dossier for '{$title}'");

        $sourcesLedger = [];
        $dossierSections = [];
        $extractedImages = [];
        $sourceIndex = 1;

        // 1. Primary Source
        if (!empty($primarySourceUrl)) {
            $host = parse_url($primarySourceUrl, PHP_URL_HOST) ?? 'primary-source';
            $primaryData = $this->jinaReader->fetchArticleContext($primarySourceUrl);

            if (!empty($primaryData['markdown'])) {
                $label = "[S{$sourceIndex}]";
                $sourcesLedger[] = [
                    'label' => $label,
                    'url' => $primarySourceUrl,
                    'domain' => $host,
                    'title' => $title,
                ];

                $dossierSections[] = "=== PRIMARY SOURCE {$label} ({$host}) ===\nURL: {$primarySourceUrl}\n\n" . $primaryData['markdown'];
                $sourceIndex++;

                if (!empty($primaryData['image_details'])) {
                    foreach ($primaryData['image_details'] as $img) {
                        $extractedImages[] = $img;
                    }
                }
            }
        }

        // 2. Corroborating Sources
        try {
            $searchQuery = $this->extractCoreKeywords($title);
            $additionalSources = $this->sourceSearcher->searchForClaim($searchQuery);

            foreach ($additionalSources as $src) {
                if ($primarySourceUrl && $src['url'] === $primarySourceUrl) {
                    continue;
                }

                $label = "[S{$sourceIndex}]";
                $sourcesLedger[] = [
                    'label' => $label,
                    'url' => $src['url'],
                    'domain' => $src['domain'] ?? parse_url($src['url'], PHP_URL_HOST),
                    'title' => $src['title'] ?? '',
                ];

                $dossierSections[] = "=== CORROBORATING SOURCE {$label} ({$src['domain']}) ===\n" .
                    "Title: {$src['title']}\nURL: {$src['url']}\n\n" .
                    $src['content_excerpt'];

                $sourceIndex++;
                if ($sourceIndex > 5) {
                    break;
                }
            }
        } catch (\Exception $e) {
            Log::warning("ArticleResearchService: Failed to gather additional sources: " . $e->getMessage());
        }

        // Deduplicate extracted images
        $uniqueImages = [];
        $seenUrls = [];
        foreach ($extractedImages as $img) {
            $u = $img['url'] ?? '';
            if (!empty($u) && !isset($seenUrls[$u])) {
                $seenUrls[$u] = true;
                $uniqueImages[] = $img;
            }
        }

        $dossierText = implode("\n\n" . str_repeat('=', 40) . "\n\n", $dossierSections);

        return [
            'dossier_text' => $dossierText,
            'sources' => $sourcesLedger,
            'images' => $uniqueImages,
        ];
    }

    /**
     * Extract key nouns and identifiers from a title for targeted searching.
     */
    private function extractCoreKeywords(string $title): string
    {
        $clean = preg_replace('/[^a-zA-Z0-9\s\-]/', ' ', $title);
        $words = array_filter(explode(' ', strtolower($clean)), fn($w) => strlen($w) > 2);

        $stopWords = [
            'the', 'and', 'for', 'with', 'after', 'before', 'days', 'hours',
            'critical', 'what', 'why', 'how', 'about', 'over', 'into', 'amid',
            'this', 'that', 'from', 'says', 'said', 'will', 'have', 'been',
        ];

        $keywords = array_values(array_diff($words, $stopWords));
        if (empty($keywords)) {
            return $title;
        }

        return implode(' ', array_slice($keywords, 0, 5));
    }
}
