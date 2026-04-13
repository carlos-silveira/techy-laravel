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

        if ($this->option('fix')) {
            $this->fixBrokenArticles($gemini);
        }

        if ($this->option('dedupe')) {
            $this->removeDuplicates();
        }

        $this->info("🏁 Cleaning complete.");
        return 0;
    }

    private function fixBrokenArticles(GeminiService $gemini)
    {
        $garbage = [
            '%Failed to generate content%',
            '%Rewrite this article%',
            '%I cannot fulfill%',
            '%As an AI model%',
            '%Gemini API is currently resting%',
            '%Quota exhausted%'
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
        $this->info("🔍 Searching for duplicates...");

        $duplicates = DB::table('articles')
            ->select('title', DB::raw('count(*) as count'))
            ->groupBy('title')
            ->having('count', '>', 1)
            ->get();

        if ($duplicates->isEmpty()) {
            $this->info("✅ No duplicate titles found.");
            return;
        }

        foreach ($duplicates as $duplicate) {
            $this->warn("Removing duplicates for: '{$duplicate->title}'");
            
            // Keep the one with highest views or most recent
            $articles = Article::where('title', $duplicate->title)
                ->orderBy('created_at', 'desc')
                ->get();

            $keep = $articles->shift(); // Keep first (newest)
            
            foreach ($articles as $redundant) {
                $this->info("🗑️ Deleting article ID {$redundant->id}");
                $redundant->delete();
            }
        }
    }
}
