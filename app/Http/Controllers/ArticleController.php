<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class ArticleController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_published' => 'boolean',
            'is_editors_choice' => 'boolean',
            'cover_image_path' => 'nullable|string',
            'image_prompt' => 'nullable|string',
            'tags' => 'nullable|array',
        ]);

        $article = new Article();
        $article->title = $validated['title'];
        $article->content = $validated['content'];
        $article->slug = Str::slug($validated['title']) . '-' . uniqid();
        $article->status = ($validated['is_published'] ?? false) ? 'published' : 'draft';
        $article->is_editors_choice = $validated['is_editors_choice'] ?? false;
        $article->cover_image_path = $validated['cover_image_path'] ?? null;
        $article->image_prompt = $validated['image_prompt'] ?? null;
        $article->tags = $validated['tags'] ?? [];
        $article->save();

        Cache::flush(); // Invalidate public caches

        return response()->json([
            'message' => 'Article saved successfully',
            'article' => $article
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_published' => 'boolean',
            'is_editors_choice' => 'boolean',
            'cover_image_path' => 'nullable|string',
            'image_prompt' => 'nullable|string',
            'tags' => 'nullable|array',
        ]);

        $article = Article::findOrFail($id);
        $article->title = $validated['title'];
        $article->content = $validated['content'];
        if ($article->isDirty('title')) {
            $article->slug = Str::slug($validated['title']) . '-' . uniqid();
        }
        $article->status = ($validated['is_published'] ?? false) ? 'published' : 'draft';
        $article->is_editors_choice = $validated['is_editors_choice'] ?? false;
        $article->cover_image_path = $validated['cover_image_path'] ?? null;
        $article->image_prompt = $validated['image_prompt'] ?? null;
        $article->tags = $validated['tags'] ?? [];
        $article->save();

        Cache::flush(); // Invalidate public caches

        return response()->json([
            'message' => 'Article updated successfully',
            'article' => $article
        ]);
    }

    /**
     * Publish an article.
     */
    public function publish($id)
    {
        $article = Article::findOrFail($id);
        $article->update(['is_published' => true]);

        return response()->json(['message' => 'Article published successfully.']);
    }

    public function like($id)
    {
        $article = Article::where('is_published', true)->findOrFail($id);
        $article->increment('likes_count');

        return response()->json(['likes_count' => $article->likes_count]);
    }
}
