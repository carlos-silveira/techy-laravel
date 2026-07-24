<?php

declare(strict_types=1);

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudioArticleController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $status = $request->query('status');
        $sort = $request->query('sort', 'latest');

        $query = Article::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('ai_summary', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($status && in_array($status, ['published', 'draft'])) {
            $query->where('status', $status);
        }

        match ($sort) {
            'oldest' => $query->orderBy('created_at', 'asc'),
            'views' => $query->orderBy('views_count', 'desc'),
            'fact_check' => $query->orderBy('fact_check_score', 'asc'),
            default => $query->orderBy('created_at', 'desc'),
        };

        $articles = $query->paginate(15)->withQueryString();

        $counts = [
            'all' => Article::count(),
            'published' => Article::where('status', 'published')->count(),
            'draft' => Article::where('status', 'draft')->count(),
        ];

        return Inertia::render('Studio/Articles/Index', [
            'articles' => $articles,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'sort' => $sort,
            ],
            'counts' => $counts,
        ]);
    }

    public function create()
    {
        return Inertia::render('Studio/Articles/Create');
    }

    public function edit($id)
    {
        $article = Article::findOrFail($id);

        return Inertia::render('Studio/Articles/Edit', [
            'article' => $article,
        ]);
    }
}
