<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Article;
use App\Services\ArticleWriterPipeline;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class RegenerateQualityArticle extends Command
{
    protected $signature = 'article:regenerate-quality {id : The ID or slug of the article} {--dry-run : Print preview without saving to DB}';
    protected $description = 'Regenerate an article using the Quality v2 pipeline (research, fact sheet, explanatory narrative, native localization).';

    public function handle(ArticleWriterPipeline $pipeline): int
    {
        $identifier = $this->argument('id');
        $dryRun = (bool) $this->option('dry-run');

        $article = is_numeric($identifier)
            ? Article::find((int) $identifier)
            : Article::where('slug', $identifier)->first();

        if (!$article) {
            $this->error("Article '{$identifier}' not found.");
            return 1;
        }

        $this->info("🚀 Starting Quality v2 upgrade for Article #{$article->id}: '{$article->title}'");
        $this->info("   Primary Source URL: " . ($article->source_url ?: 'None'));

        try {
            $bundle = $pipeline->produceArticle($article->title, $article->source_url);

            $this->info("✅ Pipeline synthesis complete!");
            $this->line("--------------------------------------------------");
            $this->info("PROPOSED NEW TITLE: " . $bundle['title']);
            $this->info("WORD COUNT (EN): " . str_word_count(strip_tags($bundle['content_en'])));
            $this->info("QUALITY GATE STATUS: " . ($bundle['audit']['passed'] ? 'PASSED (0 fluff)' : 'WARNINGS'));
            if (!empty($bundle['audit']['issues'])) {
                foreach ($bundle['audit']['issues'] as $issue) {
                    $this->warn(" - {$issue}");
                }
            }

            $this->line("\n=== FACT SHEET SUMMARY ===");
            $this->line("Core event: " . ($bundle['fact_sheet']['core_event'] ?? 'N/A'));
            $this->line("Affected systems: " . ($bundle['fact_sheet']['affected_systems_and_versions'] ?? 'N/A'));

            $esContent = $bundle['translations']['es']['content'] ?? '';
            $this->line("\n=== SPANISH TRANSLATION PREVIEW (first 400 chars) ===");
            $this->line(substr(strip_tags($esContent), 0, 400) . "...\n");

            if ($dryRun) {
                $this->warn("🔍 DRY RUN enabled: No database modifications made.");
                return 0;
            }

            // Save to database
            $article->title = $bundle['title'];
            $article->content = $bundle['content_en'];
            $article->ai_summary = $bundle['ai_summary'];
            $article->meta_description = $bundle['meta_description'];
            if (!empty($bundle['cover_image_path'])) {
                $article->cover_image_path = $bundle['cover_image_path'];
            }
            if (!empty($bundle['translations'])) {
                $article->translations = $bundle['translations'];
            }
            $article->reading_time_minutes = max(1, (int) ceil(str_word_count(strip_tags($bundle['content_en'])) / 200));
            $article->qa_passed = '1';
            $article->save();

            Cache::flush();

            $this->info("🎉 Article #{$article->id} successfully upgraded and saved in DB!");
            $this->info("   Live URL: " . config('app.url') . "/article/{$article->slug}");

            return 0;
        } catch (\Exception $e) {
            $this->error("❌ Quality upgrade failed: " . $e->getMessage());
            $this->line($e->getTraceAsString());
            return 1;
        }
    }
}
