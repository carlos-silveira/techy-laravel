<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\GeminiService;

class FixArticleEncoding extends Command
{
    protected $signature = 'article:fix-encoding {slug?} {--article= : Specific article ID to fix}';
    protected $description = 'Fix double-encoded / escaped HTML content and placeholder translations in articles';

    public function handle()
    {
        $slug = $this->argument('slug');
        $articleId = $this->option('article');

        $query = Article::query();
        if ($slug) {
            $query->where('slug', $slug);
        } elseif ($articleId) {
            $query->where('id', $articleId);
        }

        $articles = $query->get();
        $fixed = 0;

        foreach ($articles as $article) {
            $raw = $article->getRawOriginal('content');
            $cleaned = $this->deepClean($raw);
            $needsSave = false;

            if ($cleaned !== $raw) {
                $article->content = $cleaned;
                $needsSave = true;
            }

            // Fix bad AI translations (placeholders like 'título traducido', '...', or corrupted)
            $translations = $article->translations ?? [];
            $badTranslationsCleared = [];
            foreach ($translations as $lang => $trans) {
                if (Article::isInvalidTranslation($trans, $article->content)) {
                    unset($translations[$lang]);
                    $badTranslationsCleared[] = $lang;
                }
            }

            if (!empty($badTranslationsCleared)) {
                $article->translations = $translations;
                $needsSave = true;
            }

            if ($needsSave) {
                $article->save();
                $clearedMsg = !empty($badTranslationsCleared) ? " (cleared bad translations for: " . implode(', ', $badTranslationsCleared) . ")" : "";
                $this->info("✅ Fixed: {$article->title}{$clearedMsg}");
                $fixed++;

                // Queue fresh translation for published articles
                if ($article->status === 'published') {
                    foreach ($badTranslationsCleared as $locale) {
                        \App\Jobs\TranslateArticle::dispatch($article, $locale);
                        $this->line("  🔄 Dispatched background translation for [{$locale}]");
                    }
                }
            } else {
                $this->line("  OK: '{$article->title}' — already clean.");
            }
        }

        $this->info("Done. Fixed {$fixed} article(s).");
        return 0;
    }

    /**
     * Recursively decode until we reach raw HTML.
     * Handles: json_encode(html), json_encode(json_encode(html)), escaped slashes, etc.
     */
    private function deepClean(string $raw): string
    {
        $content = $raw;
        $maxPasses = 5;

        for ($i = 0; $i < $maxPasses; $i++) {
            // Try JSON decode — catches double-encoded strings
            $decoded = json_decode($content, true);

            if (is_string($decoded)) {
                $content = $decoded;
                continue;
            }

            // If it decoded to an array/object it might be TipTap JSON
            if (is_array($decoded) && isset($decoded['type']) && $decoded['type'] === 'doc') {
                $content = app(GeminiService::class)->tipTapToHtml($decoded);
                break;
            }

            if (is_array($decoded)) {
                break;
            }

            // No more JSON layers — stop
            break;
        }

        // Strip any remaining escaped forward slashes: <\/h2> → </h2>
        $content = str_replace('\\/', '/', $content);

        // Strip leading/trailing quotes that shouldn't be there
        $content = trim($content, '"');

        // Remove markdown code fences
        $content = preg_replace('/^```(?:html)?\s*/i', '', $content);
        $content = preg_replace('/\s*```\s*$/', '', $content);

        return trim($content);
    }
}
