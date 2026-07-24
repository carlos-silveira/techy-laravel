<?php

declare(strict_types=1);

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;

class StudioMediaController extends Controller
{
    public function index(Request $request)
    {
        $disk = Storage::disk('public');
        $files = $disk->files('articles');

        $media = collect($files)->map(function ($filePath) use ($disk) {
            $lastModified = $disk->lastModified($filePath);
            $size = $disk->size($filePath);
            $url = Storage::url($filePath);
            $name = basename($filePath);

            return [
                'id' => md5($filePath),
                'path' => $filePath,
                'name' => $name,
                'url' => $url,
                'size' => $size,
                'formatted_size' => $this->formatBytes($size),
                'updated_at' => Carbon::createFromTimestamp($lastModified)->diffForHumans(),
                'timestamp' => $lastModified,
            ];
        })->sortByDesc('timestamp')->values();

        return Inertia::render('Studio/Media/Index', [
            'media' => $media,
        ]);
    }

    public function destroy(Request $request)
    {
        $path = $request->input('path');
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            return back()->with('success', 'Asset deleted successfully.');
        }

        return back()->withErrors(['error' => 'Asset not found.']);
    }

    private function formatBytes($bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);

        return round($bytes, $precision) . ' ' . $units[$pow];
    }
}
