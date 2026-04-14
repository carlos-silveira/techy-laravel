<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use App\Services\GeminiService;
use App\Services\NewsAgent;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DeepCleanArticles extends Command
{
    protected $signature = 'articles:deep-clean {--fix : Attempt to regenerate broken content} {--dedupe : Remove duplicate articles}';
    protected $description = 'Find and destroy AI failure strings, prompt leaks, and duplicate topics.';

    public function handle(GeminiService $gemini, NewsAgent $agent)
    {
        $this->info("🧹 Article Deep Cleaner activated.");

        $this->scrubInstructionLeaks();

        if ($this->option('fix')) {
            $this->fixBrokenArticles($gemini);
        }

        if ($this->option('dedupe')) {
            $this->removeDuplicates();
        }

        $this->info("🏁 Cleaning complete.");
        return 0;
    }

    private function scrubInstructionLeaks()
    {
        $this->info("🧹 Scrubbing instruction leaks from existing articles...");
        
        $patterns = [
            '/^Rewrite this article to make it infinitely better[^:]+: /i',
            '/^Rewrite this article to make it infinitely better[^:]+: /i', // Dupe for certainty
            '/^Here is the refined version of the article[^:]+: /i',
            '/^Based on the editorial brief[^:]+: /i',
            '/^Current Summary: /i',
            '/^Drafting a high-quality journalistic deep-dive[^:]+: /i',
        ];

        Article::chunk(50, function($articles) use ($patterns) {
            foreach ($articles as $article) {
                $originalContent = $article->content;
                $originalSummary = $article->ai_summary;
                
                foreach ($patterns as $pattern) {
                    $article->content = preg_replace($pattern, '', (string)$article->content);
                    $article->ai_summary = preg_replace($pattern, '', (string)$article->ai_summary);
                    $article->title = preg_replace($pattern, '', (string)$article->title);
                }
                
                if ($article->isDirty()) {
                    $article->save();
                    $this->info("✨ Scrubbed leaks from ID {$article->id} - '{$article->title}'");
                }
            }
        });
    }

    private function fixBrokenArticles(GeminiService $gemini)
    {
        $garbage = [
            '%Failed to generate content%',
            '%Rewrite this article%',
            '%I cannot fulfill%',
            '%As an AI model%',
            '%Gemini API is currently resting%',
            '%Quota exhausted%',
            '%current summary%',
            '%editorial brief%'
        ];

        $broken = Article::where(function($q) use ($garbage) {
            foreach ($garbage as $pattern) {
                $q->orWhere('content', 'like', $pattern)
                  ->orWhere('ai_summary', 'like', $pattern)
                  ->orWhere('title', 'like', $pattern);
            }
        })->get();

        if ($broken->isEmpty()) {
            $this->info("✅ No broken articles found.");
            return;
        }

        $this->info("🛠️ Found {$broken->count()} broken articles. Repairing...");

        foreach ($broken as $article) {
            $this->warn("Repairing: '{$article->title}' (ID: {$article->id})");
            
            try {
                // Try to get a decent idea based on existing title
                $idea = [
                    'title' => $article->title,
                    'prompt' => "Provide a high-quality journalistic deep-dive into this topic. Technical, investigative, Wired-style."
                ];
                
                // We use an empty news array if we don't have sources, AI will use internal knowledge
                $draft = $gemini->generateDraft($idea['title'], $idea['prompt'], []);
                
                $article->update([
                    'content' => $draft['cuerpo_noticia'],
                    'ai_summary' => $draft['tldr_twitter'] ?? Str::limit(strip_tags($draft['cuerpo_noticia']), 200),
                    'meta_description' => $draft['tldr_twitter'] ?? '',
                    'status' => 'published',
                    'translations' => [] // Reset translations so they re-trigger correctly
                ]);
                
                $this->info("✅ Fixed article #{$article->id}");
                sleep(15); // Rate limit protection
            } catch (\Exception $e) {
                $this->error("❌ Failed to fix article #{$article->id}: " . $e->getMessage());
                // If we can't fix it and it's garbage, maybe unpublish it?
                $article->update(['status' => 'draft']);
            }
        }
    }

    private function removeDuplicates()
    {
        $this->info("🔍 Searching for duplicates (Case-Insensitive & Trimmed)...");

        // Use a more aggressive subquery to find articles that share the same normalized title
        $duplicates = DB::table('articles')
            ->select(DB::raw('LOWER(TRIM(title)) as normalized_title'), DB::raw('count(*) as count'))
            ->groupBy(DB::raw('LOWER(TRIM(title))'))
            ->having('count', '>', 1)
            ->get();

        if ($duplicates->isEmpty()) {
            $this->info("✅ No duplicate titles found.");
            return;
        }

        foreach ($duplicates as $duplicate) {
            $this->warn("Removing duplicates for: '{$duplicate->normalized_title}'");
            
            // Keep the one with most recent core content
            $articles = Article::whereRaw('LOWER(TRIM(title)) = ?', [$duplicate->normalized_title])
                ->orderBy('created_at', 'desc')
                ->get();

            $keep = $articles->shift(); // Keep first (newest)
            
            foreach ($articles as $redundant) {
                $this->info("🗑️ Deleting article ID {$redundant->id}: '{$redundant->title}'");
                $redundant->delete();
            }
        }
    }
}
