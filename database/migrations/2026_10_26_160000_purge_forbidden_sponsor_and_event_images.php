<?php

declare(strict_types=1);

use App\Models\Article;
use App\Services\ImageService;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $imageService = app(ImageService::class);
        $totalCleaned = 0;

        Article::chunk(100, function ($articles) use ($imageService, &$totalCleaned) {
            foreach ($articles as $article) {
                $updated = false;
                $cover = $article->cover_image_path;

                // 1. Validate & Heal Cover Image
                if (empty($cover) || $cover === 'None' || $cover === 'null' || $imageService->isForbiddenLogoOrBadge($cover)) {
                    $newCover = $imageService->resolveCoverImage($article->title);
                    $article->cover_image_path = $newCover;
                    $updated = true;
                    Log::info("purge_forbidden_sponsor_and_event_images: Replaced cover for article #{$article->id} ('{$article->title}') with {$newCover}");
                } else {
                    // Check if cover URL needs upgrading (e.g. low-res thumbnail)
                    $upgradedCover = $imageService->upgradeImageUrl($cover);
                    if ($upgradedCover !== $cover) {
                        $article->cover_image_path = $upgradedCover;
                        $updated = true;
                    }
                }

                // 2. Validate & Heal Content Images
                if (!empty($article->content)) {
                    $cleanedContent = $imageService->cleanContentImages($article->content);
                    if ($cleanedContent !== $article->content) {
                        $article->content = $cleanedContent;
                        $updated = true;
                    }
                }

                // 3. Validate & Heal Translations Content Images
                $translations = $article->translations;
                if (is_string($translations)) {
                    $translations = json_decode($translations, true);
                }

                if (is_array($translations)) {
                    $transChanged = false;
                    foreach ($translations as $lang => $transData) {
                        if (!empty($transData['content'])) {
                            $cleanedTrans = $imageService->cleanContentImages($transData['content']);
                            if ($cleanedTrans !== $transData['content']) {
                                $translations[$lang]['content'] = $cleanedTrans;
                                $transChanged = true;
                            }
                        }
                    }
                    if ($transChanged) {
                        $article->translations = $translations;
                        $updated = true;
                    }
                }

                if ($updated) {
                    $article->saveQuietly();
                    $totalCleaned++;
                }
            }
        });

        Log::info("purge_forbidden_sponsor_and_event_images migration completed. Total articles healed: {$totalCleaned}");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No down migration
    }
};
