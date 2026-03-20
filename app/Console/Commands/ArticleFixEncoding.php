<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ArticleFixEncoding extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'article:fix-encoding {--article= : Specific article ID to fix}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix double-encoded HTML and JSON in articles content and translations';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $query = Article::query();

        if ($this->option('article')) {
            $query->where('id', $this->option('article'));
        }

        $articles = $query->get();
        $this->info("Found {$articles->count()} articles to process.");

        foreach ($articles as $article) {
            $this->comment("Processing article: {$article->title} (ID: {$article->id})");
            
            $changed = false;

            // 1. Fix main content
            $originalContent = $article->content;
            $cleanContent = $this->recursivelyUnwrap($originalContent);
            
            if ($originalContent !== $cleanContent) {
                $article->content = $cleanContent;
                $changed = true;
                $this->line("  - Fixed main content encoding");
            }

            // 2. Fix translations
            $translations = $article->translations ?? [];
            $fixedTranslations = [];
            
            foreach ($translations as $locale => $data) {
                $fixedData = $data;
                
                if (is_array($data)) {
                    foreach ($data as $key => $value) {
                        if (is_string($value)) {
                            $fixedValue = $this->recursivelyUnwrap($value);
                            if ($fixedValue !== $value) {
                                $fixedData[$key] = $fixedValue;
                                $changed = true;
                            }
                        }
                    }
                } elseif (is_string($data)) {
                    // Sometimes the whole translation for a locale is a string
                    $fixedData = $this->recursivelyUnwrap($data);
                    if ($fixedData !== $data) {
                        $changed = true;
                    }
                }
                
                $fixedTranslations[$locale] = $fixedData;
            }

            if ($changed) {
                $article->translations = $fixedTranslations;
                $article->save();
                $this->info("  ✅ Saved changes for article {$article->id}");
            } else {
                $this->line("  No encoding issues found.");
            }
        }

        $this->info('Fix process completed.');
    }

    /**
     * Recursively JSON-decode a string to handle double-encoding.
     */
    private function recursivelyUnwrap(mixed $value): mixed
    {
        if (!is_string($value)) {
            return $value;
        }

        $trimmed = trim($value);
        if (empty($trimmed)) {
            return $value;
        }

        // Check if it's a JSON string
        if (($trimmed[0] === '"' && $trimmed[strlen($trimmed)-1] === '"') || 
            ($trimmed[0] === '{' && $trimmed[strlen($trimmed)-1] === '}') ||
            ($trimmed[0] === '[' && $trimmed[strlen($trimmed)-1] === ']')) {
            
            $decoded = json_decode($value, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                // If it decoded to something else, keep unwrapping
                return $this->recursivelyUnwrap($decoded);
            }
        }

        // Clean up escaped slashes and wrapping quotes that might remain
        $value = stripslashes($value);
        
        // Remove literal \n \r \t
        $value = str_replace(['\n', '\r', '\t'], ["\n", "\r", "\t"], $value);
        
        return $value;
    }
}
