<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Subscriber;
use App\Models\Article;
use Illuminate\Support\Facades\Mail;
use App\Mail\WeeklyNewsletter;

class SendWeeklyNewsletter extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'newsletter:send-weekly {--test= : Send only to this email address for testing}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send the weekly intelligence briefing to all subscribers';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $testEmail = $this->option('test');

        if ($testEmail) {
            $subscribers = collect([ (object) ['email' => $testEmail] ]);
            $this->info("Running in TEST mode. Sending to: {$testEmail}");
        } else {
            $subscribers = Subscriber::all();
            $this->info("Found {$subscribers->count()} subscribers.");
        }

        if ($subscribers->isEmpty()) {
            $this->warn('No subscribers found. Aborting.');
            return 0;
        }

        // Fetch top articles from the last 7 days
        // We'll prioritize editor's choice, then fall back to recent published articles
        $articles = Article::where('status', 'published')
            ->where('created_at', '>=', now()->subDays(7))
            ->orderBy('is_editors_choice', 'desc')
            ->orderBy('views_count', 'desc')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // If we don't have enough articles from this week, just get the latest 5
        if ($articles->count() < 3) {
            $articles = Article::where('status', 'published')
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();
        }

        if ($articles->isEmpty()) {
            $this->warn('No articles found to send. Aborting.');
            return 0;
        }

        $this->info("Sending {$articles->count()} articles in the newsletter...");

        $bar = $this->output->createProgressBar($subscribers->count());
        $bar->start();

        foreach ($subscribers as $subscriber) {
            try {
                Mail::to($subscriber->email)->send(new WeeklyNewsletter($articles));
            } catch (\Exception $e) {
                $this->error("\nFailed to send to {$subscriber->email}: " . $e->getMessage());
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info('Newsletter campaign completed successfully!');

        return 0;
    }
}
