<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class UpdateImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:update-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Updates all existing articles with new contextual illustrative Unsplash imagery based on their explicit titles.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info("🔄 Initiating Mass Cover Image Update on all DB Articles...");

        $articles = Article::all();
        $accessKey = config('services.unsplash.access_key');

        if (empty($accessKey)) {
            $this->error('⚠️  UNSPLASH_ACCESS_KEY not set.');
            return 1;
        }

        foreach ($articles as $article) {
            $this->info("Processing [{$article->id}]: {$article->title}");
            
            // Extract the punchiest 2 words from the title for Unsplash
            $words = explode(' ', str_replace([':', ',', '.', '!', '?'], '', $article->title));
            $stopWords = ['the', 'a', 'an', 'of', 'in', 'for', 'to', 'and', 'is', 'are', 'on', 'with', 'from', 'what', 'how', 'why', 'when'];
            
            // Also filter out super-generic tech buzzwords so we hit specific objects
            $forbidden = array_merge($stopWords, ['technology', 'tech', 'digital', 'abstract', 'future', 'neon']);
            
            $keywords = array_filter($words, function ($w) use ($forbidden) {
                return strlen($w) > 3 && !in_array(strtolower($w), $forbidden);
            });
            
            $query = implode(' ', array_slice(array_values($keywords), 0, 2));

            if (empty($query)) {
                $query = $article->category ?? 'office';
            }

            try {
                $response = Http::withHeaders([
                    'Authorization' => "Client-ID {$accessKey}",
                ])->get('https://api.unsplash.com/search/photos', [
                    'query' => $query,
                    'per_page' => 1,
                    'orientation' => 'landscape',
                    'content_filter' => 'high',
                ]);

                if ($response->successful()) {
                    $results = $response->json()['results'] ?? [];
                    if (!empty($results)) {
                        $photo = $results[0];
                        $imageUrl = $photo['urls']['regular'] ?? $photo['urls']['small'] ?? null;
                        
                        if ($imageUrl) {
                            $article->cover_image_path = $imageUrl;
                            $article->save();
                            $this->info("✅ Updated Image using query: '{$query}'");
                        }
                    } else {
                        $this->warn("⚠️  No images found for query: '{$query}'");
                    }
                }
            } catch (\Exception $e) {
                $this->error("❌ API Error on [{$query}]: " . $e->getMessage());
            }

            // Respect Unsplash limits 
            sleep(1);
        }

        \Illuminate\Support\Facades\Artisan::call('cache:clear');
        $this->info('🎉 Finished Updating All Images.');
        return 0;
    }
}
