<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ArticleWriterPipeline
{
    private ArticleResearchService $researchService;
    private GeminiService $gemini;
    private ArticleQualityGate $qualityGate;
    private NewsAgent $newsAgent;
    private ImageService $imageService;

    public function __construct(
        ArticleResearchService $researchService,
        GeminiService $gemini,
        ArticleQualityGate $qualityGate,
        NewsAgent $newsAgent,
        ?ImageService $imageService = null
    ) {
        $this->researchService = $researchService;
        $this->gemini = $gemini;
        $this->qualityGate = $qualityGate;
        $this->newsAgent = $newsAgent;
        $this->imageService = $imageService ?? app(ImageService::class);
    }

    /**
     * Synthesize a top-tier article from scratch or from an existing title/source.
     *
     * @return array{
     *   title: string,
     *   content_en: string,
     *   translations: array<string, array{title: string, summary: ?string, content: string}>,
     *   ai_summary: string,
     *   meta_description: string,
     *   tags: array<int, string>,
     *   cover_image_path: string,
     *   fact_sheet: array,
     *   audit: array
     * }
     */
    public function produceArticle(string $title, ?string $sourceUrl = null): array
    {
        Log::info("ArticleWriterPipeline: Starting deep synthesis for '{$title}'");

        // 1. Gather multi-source research dossier
        $dossier = $this->researchService->buildResearchDossier($title, $sourceUrl);

        // 2. Distill Fact Sheet
        Log::info("ArticleWriterPipeline: Distilling Fact Sheet");
        $factSheet = $this->gemini->buildFactSheet($title, $dossier['dossier_text']);

        // 3. Draft long-form explanatory article
        Log::info("ArticleWriterPipeline: Drafting exploratory article");
        $draft = $this->gemini->generateExploratoryArticle(
            $title,
            $factSheet,
            $dossier['sources'],
            $dossier['images']
        );

        $htmlContent = $draft['article_body'];

        // Clean and sanitize any inline images
        $htmlContent = $this->imageService->cleanContentImages($htmlContent);

        // 4. Quality Audit & Automated Revision
        $audit = $this->qualityGate->audit($htmlContent);
        if (!$audit['passed']) {
            Log::info("ArticleWriterPipeline: Quality Gate flagged issues, performing editorial revision: " . implode('; ', $audit['issues']));
            $htmlContent = $this->gemini->reviewAndRefineArticle($htmlContent, $factSheet, $audit['issues']);
            $htmlContent = $this->imageService->cleanContentImages($htmlContent);
            $audit = $this->qualityGate->audit($htmlContent);
        }

        // 5. Generate Metadata
        $meta = $this->gemini->generateArticleMeta($draft['title'], $htmlContent);

        // 6. Brand-Safe, High-Resolution Cover Image Selection
        $coverImage = $this->imageService->resolveCoverImage(
            $draft['title'],
            $draft['suggested_image'] ?? null,
            $dossier['images'] ?? []
        );

        // 7. Localize into ES and PT
        $translations = [];
        $summary = $meta['summary'] ?? Str::limit(strip_tags($htmlContent), 220);

        foreach (['es', 'pt'] as $lang) {
            Log::info("ArticleWriterPipeline: Localizing into {$lang}");
            try {
                // Sleep briefly to respect RPM
                sleep(2);
                $translated = $this->gemini->translateArticle(
                    $draft['title'],
                    $summary,
                    $htmlContent,
                    $lang
                );
                if (isset($translated['content'])) {
                    $translated['content'] = $this->imageService->cleanContentImages($translated['content']);
                }
                $translations[$lang] = $translated;
            } catch (\Exception $e) {
                Log::warning("ArticleWriterPipeline: Localization to {$lang} failed: " . $e->getMessage());
            }
        }

        return [
            'title' => $draft['title'],
            'content_en' => $htmlContent,
            'translations' => $translations,
            'ai_summary' => $summary,
            'meta_description' => $meta['meta_description'] ?? Str::limit(strip_tags($htmlContent), 155),
            'tags' => $meta['tags'] ?? ['Tech', 'News'],
            'cover_image_path' => $coverImage,
            'fact_sheet' => $factSheet,
            'audit' => $audit,
        ];
    }
}
