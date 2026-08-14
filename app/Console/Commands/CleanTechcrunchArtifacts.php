<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use Illuminate\Support\Facades\DB;

class CleanTechcrunchArtifacts extends Command
{
    protected $signature = 'articles:clean-tc';
    protected $description = 'Clean TechCrunch artifacts (author credits, logos) from existing articles';

    public function handle()
    {
        $this->info("🧹 Cleaning TechCrunch artifacts from existing articles...");

        $patterns = [
            // Text patterns
            '/<p>[^<]*IMAGE CREDITS:[^<]*<\/p>/i' => '',
            '/<p>[^<]*contributed reporting from TechCrunch\.[^<]*<\/p>/i' => '',
            '/<p>[^<]*contributed reporting[^<]*<\/p>/i' => '',
            // Image patterns
            '/<img[^>]+src="[^"]*(author|profile|writer|contributor|tc-logo|disrupt|headshot)[^"]*"[^>]*>/i' => '',
        ];

        Article::chunk(100, function ($articles) use ($patterns) {
            foreach ($articles as $article) {
                $originalContent = $article->content;
                $originalTranslations = $article->translations;
                
                $cleanedContent = $originalContent;
                foreach ($patterns as $pattern => $replacement) {
                    $cleanedContent = preg_replace($pattern, $replacement, (string)$cleanedContent);
                }

                $cleanedTranslations = $originalTranslations;
                if (is_array($cleanedTranslations)) {
                    foreach ($cleanedTranslations as $lang => $translation) {
                        if (isset($translation['content'])) {
                            $cleanedTranslationContent = $translation['content'];
                            foreach ($patterns as $pattern => $replacement) {
                                $cleanedTranslationContent = preg_replace($pattern, $replacement, (string)$cleanedTranslationContent);
                            }
                            $cleanedTranslations[$lang]['content'] = $cleanedTranslationContent;
                        }
                    }
                }
                
                if ($cleanedContent !== $originalContent || json_encode($cleanedTranslations) !== json_encode($originalTranslations)) {
                    $article->content = $cleanedContent;
                    $article->translations = $cleanedTranslations;
                    $article->save();
                    $this->info("✨ Cleaned artifacts from ID {$article->id} - '{$article->title}'");
                }
            }
        });

        $this->info("✅ TechCrunch artifact cleaning complete.");
        return 0;
    }
}
