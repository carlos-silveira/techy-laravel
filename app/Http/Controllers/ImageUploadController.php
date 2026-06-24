<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    /**
     * Store an uploaded image and return its public URL.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // Max 5MB
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = Str::random(40) . '.webp';

            // Create ImageManager with GD driver
            $manager = new \Intervention\Image\ImageManager(new \Intervention\Image\Drivers\Gd\Driver());
            
            // Read, resize and encode
            $image = $manager->read($file);
            $image->scaleDown(width: 1600);
            $encoded = $image->toWebp(80);

            // Store the WebP buffer in the public disk
            $path = 'uploads/' . $filename;
            Storage::disk('public')->put($path, $encoded->toString());

            // Return the full public URL
            $url = Storage::url($path);

            return response()->json([
                'success' => true,
                'url' => $url,
                'path' => $path
            ]);
        }

        return response()->json(['success' => false, 'message' => 'No image provided.'], 400);
    }
}
