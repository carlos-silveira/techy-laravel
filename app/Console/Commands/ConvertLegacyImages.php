<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ConvertLegacyImages extends Command
{
    protected $signature = 'images:convert-legacy';
    protected $description = 'Convert all legacy local article cover images to WebP format';

    public function handle()
    {
        $articles = \App\Models\Article::whereNotNull('cover_image_path')
            ->where('cover_image_path', 'not like', 'http%')
            ->where('cover_image_path', 'not like', '%.webp')
            ->get();

        $this->info("Found {$articles->count()} legacy images to convert.");

        $manager = new \Intervention\Image\ImageManager(new \Intervention\Image\Drivers\Gd\Driver());

        foreach ($articles as $article) {
            try {
                $oldPath = $article->cover_image_path; // usually "uploads/filename.jpg"
                
                // If it starts with /storage/, strip it to get the disk path
                if (str_starts_with($oldPath, '/storage/')) {
                    $oldPath = substr($oldPath, 9);
                }

                if (!\Illuminate\Support\Facades\Storage::disk('public')->exists($oldPath)) {
                    $this->warn("File not found: {$oldPath}");
                    continue;
                }

                $fileContents = \Illuminate\Support\Facades\Storage::disk('public')->get($oldPath);
                $image = $manager->decode($fileContents);
                $image->scaleDown(width: 1600);
                $encoded = $image->encode(new \Intervention\Image\Encoders\WebpEncoder(quality: 80));

                $newFilename = pathinfo($oldPath, PATHINFO_FILENAME) . '_' . uniqid() . '.webp';
                $newPath = 'uploads/' . $newFilename;
                
                \Illuminate\Support\Facades\Storage::disk('public')->put($newPath, $encoded->toString());

                $article->cover_image_path = $newPath;
                $article->save();

                $this->info("Converted: {$oldPath} -> {$newPath}");

            } catch (\Exception $e) {
                $this->error("Failed to convert article {$article->id}: " . $e->getMessage());
            }
        }

        $this->info("Done converting legacy images.");
    }
}
