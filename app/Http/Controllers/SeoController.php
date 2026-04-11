<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

class SeoController extends Controller
{
    /**
     * Generate sitemap.xml dynamically.
     */
    public function sitemap(): Response
    {
        $xml = Cache::remember('sitemap_xml', 3600, function () {
            $articles = Article::where('status', 'published')
                ->orderBy('updated_at', 'desc')
                ->get();

            $content = '<?xml version="1.0" encoding="UTF-8"?>';
            $content .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
            
            // Homepage
            $content .= '<url>';
            $content .= '<loc>' . url('/') . '</loc>';
            $content .= '<lastmod>' . now()->toAtomString() . '</lastmod>';
            $content .= '<changefreq>daily</changefreq>';
            $content .= '<priority>1.0</priority>';
            $content .= '</url>';

            // About, Archives, etc.
            foreach (['about', 'archive', 'terms', 'privacy'] as $page) {
                $content .= '<url>';
                $content .= '<loc>' . url($page) . '</loc>';
                $content .= '<lastmod>' . now()->subDays(1)->toAtomString() . '</lastmod>';
                $content .= '<changefreq>monthly</changefreq>';
                $content .= '<priority>0.5</priority>';
                $content .= '</url>';
            }

            // Articles
            foreach ($articles as $article) {
                $content .= '<url>';
                $content .= '<loc>' . url('/article/' . $article->slug) . '</loc>';
                $content .= '<lastmod>' . ($article->updated_at ?? $article->created_at)->toAtomString() . '</lastmod>';
                $content .= '<changefreq>weekly</changefreq>';
                $content .= '<priority>0.8</priority>';
                $content .= '</url>';
            }

            $content .= '</urlset>';
            return $content;
        });

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }

    /**
     * Generate RSS Feed dynamically.
     */
    public function rss(): Response
    {
        $xml = Cache::remember('rss_feed', 3600, function () {
            $articles = Article::where('status', 'published')
                ->orderBy('created_at', 'desc')
                ->limit(20)
                ->get();

            $content = '<?xml version="1.0" encoding="UTF-8" ?>';
            $content .= '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">';
            $content .= '<channel>';
            $content .= '<title>Techy News</title>';
            $content .= '<link>' . url('/') . '</link>';
            $content .= '<description>AI-Powered Tech News Ecosystem</description>';
            $content .= '<language>en-us</language>';
            $content .= '<lastBuildDate>' . now()->toRfc2822String() . '</lastBuildDate>';
            $content .= '<atom:link href="' . url('/feed') . '" rel="self" type="application/rss+xml" />';

            foreach ($articles as $article) {
                $content .= '<item>';
                $content .= '<title>' . htmlspecialchars($article->title) . '</title>';
                $content .= '<link>' . url('/article/' . $article->slug) . '</link>';
                $content .= '<description>' . htmlspecialchars($article->ai_summary ?? '') . '</description>';
                $content .= '<pubDate>' . $article->created_at->toRfc2822String() . '</pubDate>';
                $content .= '<guid isPermaLink="false">' . $article->id . '</guid>';
                $content .= '</item>';
            }

            $content .= '</channel>';
            $content .= '</rss>';
            return $content;
        });

        return response($xml, 200, ['Content-Type' => 'application/rss+xml']);
    }
}
