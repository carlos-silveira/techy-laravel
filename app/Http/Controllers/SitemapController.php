<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Models\Article;
use Illuminate\Support\Facades\URL;

class SitemapController extends Controller
{
    public function index()
    {
        $articles = Article::where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->get();

        $content = '<?xml version="1.0" encoding="UTF-8"?>';
        $content .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // Static routes
        $staticRoutes = [
            '/',
            '/archive',
            '/about',
            '/terms',
            '/privacy'
        ];

        foreach ($staticRoutes as $route) {
            $content .= '<url>';
            $content .= '<loc>' . url($route) . '</loc>';
            $content .= '<lastmod>' . now()->toAtomString() . '</lastmod>';
            $content .= '<changefreq>daily</changefreq>';
            $content .= '<priority>0.8</priority>';
            $content .= '</url>';
        }

        // Article routes
        foreach ($articles as $article) {
            $content .= '<url>';
            $content .= '<loc>' . url('/article/' . $article->slug) . '</loc>';
            $content .= '<lastmod>' . $article->updated_at->toAtomString() . '</lastmod>';
            $content .= '<changefreq>weekly</changefreq>';
            $content .= '<priority>0.6</priority>';
            $content .= '</url>';
        }

        $content .= '</urlset>';

        return Response::make($content, 200, [
            'Content-Type' => 'application/xml',
            'Cache-Control' => 'public, max-age=3600'
        ]);
    }
}
