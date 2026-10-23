<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Article;
use App\Services\ImageService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class FixArticleImages extends Command
{
    protected $signature = 'articles:fix-images {--id= : Heal a specific article ID} {--all : Process all articles in the database} {--dry-run : Preview changes without saving}';
    protected $description = 'Purge publisher logos, fix brand mismatches (e.g. Disney vs HBO), and upgrade thumbnail images across articles';

    private ImageService $imageService;

    public function __construct(ImageService $imageService)
    {
        parent::__construct();
        $this->imageService = $imageService;
    }

    public function handle(): int
    {
        $this->info("🖼️ Initiating Article Image Healing...");
        $dryRun = $this->option('dry-run');
        $specificId = $this->option('id');

        $query = Article::query();
        if ($specificId) {
            $query->where('id', (int) $specificId);
        }

        $totalFixed = 0;
        $articles = $query->get();

        foreach ($articles as $article) {
            $changed = false;
            $reasons = [];

            // 1. Cover Image Validation
            $oldCover = $article->cover_image_path;
            $newCover = $oldCover;

            // 1a. Check for forbidden publisher logos
            if (!empty($newCover) && $this->imageService->isForbiddenLogoOrBadge($newCover)) {
                $newCover = $this->imageService->resolveCoverImage($article->title);
                $reasons[] = "Replaced forbidden logo cover with curated topic cover";
            }

            // 1b. Check for brand conflicts (e.g. Disney title with HBO Max cover)
            $lowerTitle = strtolower($article->title);
            if (str_contains($lowerTitle, 'disney') && (str_contains($newCover ?? '', 'photo-1761044590673-d9d6c7a63a99') || str_contains(strtolower($newCover ?? ''), 'hbo'))) {
                $newCover = $this->imageService->resolveCoverImage($article->title);
                $reasons[] = "Fixed Disney vs HBO brand conflict on cover";
            }

            // 1c. Upgrade thumbnail in cover if applicable
            if (!empty($newCover)) {
                $upgradedCover = $this->imageService->upgradeImageUrl($newCover);
                if ($upgradedCover !== $newCover) {
                    $newCover = $upgradedCover;
                    $reasons[] = "Upgraded cover thumbnail URL to high-resolution";
                }
            }

            if ($newCover !== $oldCover) {
                $changed = true;
                if (!$dryRun) {
                    $article->cover_image_path = $newCover;
                }
            }

            // 2. Content Images Validation
            if (!empty($article->content)) {
                $cleanContent = $this->imageService->cleanContentImages($article->content);
                if ($cleanContent !== $article->content) {
                    $changed = true;
                    $reasons[] = "Cleaned inline content images (stripped logos, upgraded resolution)";
                    if (!$dryRun) {
                        $article->content = $cleanContent;
                    }
                }
            }

            // 3. Translations Content Validation
            $translations = $article->translations;
            if (is_string($translations)) {
                $translations = json_decode($translations, true);
            }

            if (is_array($translations)) {
                $transChanged = false;
                foreach ($translations as $lang => $transData) {
                    if (!empty($transData['content'])) {
                        $cleanTrans = $this->imageService->cleanContentImages($transData['content']);
                        if ($cleanTrans !== $transData['content']) {
                            $translations[$lang]['content'] = $cleanTrans;
                            $transChanged = true;
                        }
                    }
                }
                if ($transChanged) {
                    $changed = true;
                    $reasons[] = "Cleaned translated content images";
                    if (!$dryRun) {
                        $article->translations = $translations;
                    }
                }
            }

            if ($changed) {
                $totalFixed++;
                $this->info("✨ [{$article->id}] {$article->title}: " . implode(' | ', $reasons));
                if (!$dryRun) {
                    Article::withoutEvents(function () use ($article) {
                        $article->save();
                    });
                }
            }
        }

        if (!$dryRun && $totalFixed > 0) {
            Cache::flush();
        }

        $this->info("🎉 Completed! Fixed {$totalFixed} article(s)." . ($dryRun ? " (DRY-RUN - no changes saved)" : ""));
        return 0;
    }
}
