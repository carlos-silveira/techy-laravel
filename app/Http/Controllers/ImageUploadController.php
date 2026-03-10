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
            $filename = Str::random(40) . '.' . $file->getClientOriginalExtension();

            // Store the file in the public disk under the 'uploads' directory
            $path = $file->storeAs('uploads', $filename, 'public');

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
