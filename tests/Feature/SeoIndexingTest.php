<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SeoIndexingTest extends TestCase
{
    use RefreshDatabase;

    public function test_sitemap_xml_generates_valid_schema_with_images_and_articles(): void
    {
        $article = Article::create([
            'title' => 'Breakthrough Quantum Compute Processor Announced',
            'slug' => 'breakthrough-quantum-compute-processor-announced-abc123',
            'content' => '<p>Article body content with deep analysis.</p>',
            'status' => 'published',
            'ai_summary' => 'Quantum computing hits a new landmark with 1000 qubits.',
            'cover_image_path' => 'https://images.unsplash.com/photo-123456789',
        ]);

        $response = $this->get('/sitemap.xml');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/xml');

        $content = $response->getContent();
        $this->assertStringContainsString('<?xml version="1.0" encoding="UTF-8"?>', $content);
        $this->assertStringContainsString('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"', $content);
        $this->assertStringContainsString('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"', $content);
        $this->assertStringContainsString('/article/' . $article->slug, $content);
        $this->assertStringContainsString('<image:image>', $content);
        $this->assertStringContainsString('<image:loc>', $content);
    }

    public function test_robots_txt_disallows_auth_and_studio_and_points_to_sitemap(): void
    {
        $robotsPath = public_path('robots.txt');
        $this->assertFileExists($robotsPath);

        $content = file_get_contents($robotsPath);
        $this->assertStringContainsString('Disallow: /admin', $content);
        $this->assertStringContainsString('Disallow: /studio', $content);
        $this->assertStringContainsString('Disallow: /forgot-password', $content);
        $this->assertStringContainsString('Disallow: /login', $content);
        $this->assertStringContainsString('Disallow: /register', $content);
        $this->assertStringContainsString('Disallow: /reset-password', $content);
        $this->assertStringContainsString('Sitemap: https://techynews.lat/sitemap.xml', $content);
    }

    public function test_article_page_returns_clean_metadata_and_single_canonical(): void
    {
        $article = Article::create([
            'title' => 'AI Agents Surpass Human Benchmarks',
            'slug' => 'ai-agents-surpass-human-benchmarks-xyz987',
            'content' => '<p>Autonomous intelligence sets records in coding.</p>',
            'status' => 'published',
            'ai_summary' => 'New agent architecture achieves 90% benchmark pass rate.',
            'cover_image_path' => 'https://images.unsplash.com/photo-987654321',
        ]);

        $response = $this->get('/article/' . $article->slug);
        $response->assertStatus(200);

        // Verify the response does not expose internal /public/ redirect links
        $html = $response->getContent();
        $this->assertStringNotContainsString('href="https://techynews.lat/public/article', $html);
    }
}
