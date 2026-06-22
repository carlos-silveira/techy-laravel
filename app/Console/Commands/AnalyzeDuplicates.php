<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;

class AnalyzeDuplicates extends Command
{
    protected $signature = 'news:duplicates';
    protected $description = 'Find and resolve duplicate articles based on views';

    public function handle()
    {
        $this->info('Scanning for duplicate articles...');

        $articles = Article::where('status', 'published')->get(['id', 'title', 'views_count', 'created_at']);
        
        $stopWords = ['the','a','an','in','of','to','for','and','or','is','are','was',
                      'that','with','on','at','by','as','it','its','amid','new','over',
                      'after','into','about','how','what','why','says','say','us','ai'];

        $normalize = fn(string $title): array => array_values(array_diff(
            array_filter(explode(' ', preg_replace('/[^a-z0-9 ]/', '', strtolower($title)))),
            $stopWords
        ));

        $analyzed = [];
        $duplicatesFound = 0;

        foreach ($articles as $article) {
            $words = $normalize($article->title);
            
            foreach ($analyzed as $existingId => $existingData) {
                $existingWords = $existingData['words'];
                $overlap = count(array_intersect($words, $existingWords));
                $minLen = min(count($words), count($existingWords));
                
                if ($minLen > 0 && ($overlap / $minLen) >= 0.70) {
                    $this->warn("\nPotential Duplicate Found!");
                    
                    $this->line("A: [#{$existingData['model']->id}] {$existingData['model']->title}");
                    $this->line("   Views: {$existingData['model']->views_count} | Published: {$existingData['model']->created_at}");
                    
                    $this->line("B: [#{$article->id}] {$article->title}");
                    $this->line("   Views: {$article->views_count} | Published: {$article->created_at}");
                    
                    $toDelete = null;
                    if ($existingData['model']->views_count > $article->views_count) {
                        $this->info("Recommendation: Keep A (more views). Delete B?");
                        if ($this->confirm("Delete B ([#{$article->id}] {$article->title})?")) {
                            $toDelete = $article;
                        }
                    } else if ($existingData['model']->views_count < $article->views_count) {
                        $this->info("Recommendation: Keep B (more views). Delete A?");
                        if ($this->confirm("Delete A ([#{$existingData['model']->id}] {$existingData['model']->title})?")) {
                            $toDelete = $existingData['model'];
                        }
                    } else {
                        $this->info("Both have the same views. Keep the older one (A)?");
                        if ($this->confirm("Delete B ([#{$article->id}] {$article->title})?")) {
                            $toDelete = $article;
                        }
                    }

                    if ($toDelete) {
                        $toDelete->delete();
                        $this->info("Deleted article #{$toDelete->id}");
                        $duplicatesFound++;
                    } else {
                        $this->line("Kept both.");
                    }
                    
                    break;
                }
            }
            
            $analyzed[$article->id] = [
                'model' => $article,
                'words' => $words
            ];
        }

        $this->newLine();
        $this->info("Scan complete. Resolved $duplicatesFound duplicates.");
    }
}
