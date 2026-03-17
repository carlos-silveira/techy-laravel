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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::latest()->get();
        return response()->json($articles);
    }

    /**
     * Store a newly created article in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'required|string',
            'is_published' => 'boolean',
            'is_editors_choice' => 'boolean',
            'cover_image_path' => 'nullable|string',
            'image_prompt' => 'nullable|string',
            'tags' => 'nullable|array',
            'meta_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string',
        ]);

        $title = $validated['title'] ?: 'Untitled Story';

        $article = new Article();
        $this->fillArticle($article, $validated);
        $article->title = $title;
        $article->slug = Str::slug($title) . '-' . uniqid();
        $article->save();

        Cache::flush();

        return response()->json([
            'message' => 'Article created successfully',
            'article' => $article
        ]);
    }

    /**
     * Update the specified article in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'required|string',
            'is_published' => 'boolean',
            'is_editors_choice' => 'boolean',
            'cover_image_path' => 'nullable|string',
            'image_prompt' => 'nullable|string',
            'tags' => 'nullable|array',
            'meta_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string',
        ]);

        $article = Article::findOrFail($id);
        $title = $validated['title'] ?: 'Untitled Story';
        
        if ($article->title !== $title) {
            $article->slug = Str::slug($title) . '-' . uniqid();
        }
        
        $this->fillArticle($article, $validated);
        $article->title = $title;
        $article->save();

        Cache::flush();

        return response()->json([
            'message' => 'Article updated successfully',
            'article' => $article
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        Cache::flush();

        return response()->json(['message' => 'Article deleted successfully.']);
    }

    /**
     * Helper to fill article data.
     */
    private function fillArticle(Article $article, array $validated)
    {
        $article->title = $validated['title'];
        $article->content = $validated['content'];
        $article->status = ($validated['is_published'] ?? false) ? 'published' : 'draft';
        $article->is_editors_choice = $validated['is_editors_choice'] ?? false;
        $article->cover_image_path = $validated['cover_image_path'] ?? null;
        $article->image_prompt = $validated['image_prompt'] ?? null;
        $article->tags = $validated['tags'] ?? [];
        $article->meta_description = $validated['meta_description'] ?? null;
        $article->seo_keywords = $validated['seo_keywords'] ?? null;
    }

    /**
     * Publish an article directly.
     */
    public function publish($id)
    {
        $article = Article::findOrFail($id);
        $article->update(['status' => 'published']);
        Cache::flush();

        return response()->json(['message' => 'Article published successfully.']);
    }

    /**
     * Like an article.
     */
    public function like($id)
    {
        $article = Article::where('status', 'published')->findOrFail($id);
        $article->increment('likes_count');

        return response()->json(['likes_count' => $article->likes_count]);
    }
}
