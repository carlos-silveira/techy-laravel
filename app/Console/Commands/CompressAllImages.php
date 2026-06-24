<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\WebpEncoder;
use App\Models\Article;

class CompressAllImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'images:compress';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Compress all existing WebP and JPG cover images down to a maximum of 800px width at quality 70 for maximum PageSpeed.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info("🔄 Initiating Mass Image Compression...");

        $articles = Article::whereNotNull('cover_image_path')
            ->where('cover_image_path', 'like', 'uploads/%') // only local files
            ->get();

        $this->info("Found {$articles->count()} local cover images.");

        $manager = new ImageManager(new Driver());
        $success = 0;
        $failed = 0;

        foreach ($articles as $article) {
            $path = $article->cover_image_path;

            if (!Storage::disk('public')->exists($path)) {
                $this->warn("⚠️ File not found: {$path}");
                continue;
            }

            try {
                $fileContents = Storage::disk('public')->get($path);
                
                // Read original size
                $sizeBefore = strlen($fileContents);
                
                $image = $manager->decode($fileContents);
                
                // Only scale down if width is greater than 800px
                if ($image->width() > 800) {
                    $image->scaleDown(width: 800);
                }

                // Compress heavily for web
                $encoded = $image->encode(new WebpEncoder(quality: 70));
                
                $sizeAfter = strlen($encoded->toString());

                // Overwrite the file in place
                Storage::disk('public')->put($path, $encoded->toString());

                $savedKb = round(($sizeBefore - $sizeAfter) / 1024);
                $this->info("✅ Compressed {$path}: Saved {$savedKb} KB");
                $success++;
            } catch (\Exception $e) {
                $this->error("❌ Failed to compress {$path}: " . $e->getMessage());
                $failed++;
            }
        }

        $this->info("🎉 Finished. Success: {$success} | Failed: {$failed}");
        
        return 0;
    }
}
