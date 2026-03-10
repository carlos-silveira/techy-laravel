<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\LlamaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private LlamaService $llamaService;

    public function __construct(LlamaService $llamaService)
    {
        $this->llamaService = $llamaService;
    }

    public function index()
    {
        $articles = \App\Models\Article::latest()->get();

        return Inertia::render('Dashboard', [
            'initialBrief' => 'The AI Daily Brief will appear here.',
            'articles' => $articles
        ]);
    }
}
