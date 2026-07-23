<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Article;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $wiredPattern = 'media.wired.com/photos/';
        
        $articles = Article::where('content', 'like', "%{$wiredPattern}%")
                    ->orWhere('cover_image_path', 'like', "%{$wiredPattern}%")
                    ->get();

        foreach ($articles as $article) {
            $updated = false;

            // Fix cover_image_path
            if (str_contains($article->cover_image_path ?? '', $wiredPattern)) {
                $article->cover_image_path = null;
                $updated = true;
            }

            // Fix content
            if (str_contains($article->content ?? '', $wiredPattern)) {
                $newContent = preg_replace('/<img[^>]+src=["\'][^"\']*media\.wired\.com[^"\']*["\'][^>]*>/i', '', $article->content);
                $newContent = preg_replace('/<p>\s*<\/p>/i', '', $newContent); // clean up empty p tags left behind
                $article->content = $newContent;
                $updated = true;
            }
            
            // Fix translations
            $translations = $article->translations;
            if (is_array($translations)) {
                $transUpdated = false;
                foreach ($translations as $lang => $trans) {
                    if (isset($trans['content']) && str_contains($trans['content'], $wiredPattern)) {
                        $trans['content'] = preg_replace('/<img[^>]+src=["\'][^"\']*media\.wired\.com[^"\']*["\'][^>]*>/i', '', $trans['content']);
                        $trans['content'] = preg_replace('/<p>\s*<\/p>/i', '', $trans['content']);
                        $translations[$lang] = $trans;
                        $transUpdated = true;
                    }
                }
                if ($transUpdated) {
                    $article->translations = $translations;
                    $updated = true;
                }
            }

            if ($updated) {
                // Update without triggering timestamps or events just to be clean, or use normal save
                $article->saveQuietly();
                Log::info("Fixed wired image in article ID: {$article->id}");
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No down migration
    }
};
