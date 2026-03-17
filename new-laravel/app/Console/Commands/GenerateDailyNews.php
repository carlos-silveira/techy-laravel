<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use App\Services\GeminiService;
use App\Services\NewsService;
use App\Models\Article;
use Illuminate\Support\Str;

#[Signature('news:generate-daily')]
#[Description('Automatically fetch tech news and generate a drafted article via Gemini AI')]
class GenerateDailyNews extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(NewsService $newsService, GeminiService $geminiService)
    {
        $this->info('Fetching today\'s tech news...');
        $newsItems = $newsService->fetchTodayTechNews();

        if (empty($newsItems)) {
            $this->error('No news items found. Aborting.');
            return;
        }

        $this->info('Asking Gemini for ideas based on news...');
        $ideas = $geminiService->generateIdeas($newsItems);

        if (empty($ideas)) {
            $this->error('Gemini could not generate ideas.');
            return;
        }

        // Pick the first idea
        $idea = $ideas[0];
        $this->info("Selected Idea: {$idea['title']}");

        // Wait to respect API rate limits
        $this->info('Waiting 10 seconds to respect rate limits...');
        sleep(10);

        $this->info('Generating full article draft...');
        $content = $geminiService->generateDraft($idea['title'], $idea['prompt'], $newsItems);

        if (empty($content)) {
            $this->error('Content generation failed.');
            return;
        }

        $this->info('Saving draft to database...');
        $slug = Str::slug($idea['title']) . '-' . uniqid();

        Article::create([
            'title' => $idea['title'],
            'slug' => $slug,
            'content' => json_encode($content),
            'status' => 'draft',
            'is_editors_choice' => false,
            'views_count' => 0,
            'likes_count' => 0,
            'reading_time_minutes' => max(1, (int) ceil(str_word_count(strip_tags($content)) / 200)),
        ]);

        $this->info('Daily news generated and saved as draft successfully!');
    }
}
