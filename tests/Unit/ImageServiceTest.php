<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Services\ImageService;
use Tests\TestCase;

class ImageServiceTest extends TestCase
{
    private ImageService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new ImageService();
    }

    /** @test */
    public function it_identifies_forbidden_publisher_logos_and_badges(): void
    {
        // Google News publisher badges (60px)
        $this->assertTrue($this->service->isForbiddenLogoOrBadge('https://lh3.googleusercontent.com/IMEohADQGV4rcD4GVSCa8AGELftSBzGQZh475GedJEeCUyL0U3WWaybctrO-uB0HN9k3X4i5-fkJs9nZBh3Mz6flS52sL-IOME6DySPeIseyhjtQcOs=h60'));
        $this->assertTrue($this->service->isForbiddenLogoOrBadge('https://lh3.googleusercontent.com/abc=s60'));

        // TechCrunch and publisher logos
        $this->assertTrue($this->service->isForbiddenLogoOrBadge('https://techcrunch.com/wp-content/uploads/2026/04/tc-logo.png'));
        $this->assertTrue($this->service->isForbiddenLogoOrBadge('https://example.com/images/theverge-logo.svg'));

        // Broken or undefined endings
        $this->assertTrue($this->service->isForbiddenLogoOrBadge('https://media.wired.com/photos/123/1:1/w_120%2Ch_120%2Cc_limit/undefined'));

        // Author avatars
        $this->assertTrue($this->service->isForbiddenLogoOrBadge('https://example.com/wp-content/uploads/author-avatar.jpg'));

        // Valid article photos should pass
        $this->assertFalse($this->service->isForbiddenLogoOrBadge('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'));
        $this->assertFalse($this->service->isForbiddenLogoOrBadge('https://substack-post-media.s3.amazonaws.com/public/images/2c731d5e-68ca-4054-894f-659601de6a66_2048x1536.jpeg', 'Calif exploit architecture'));
    }

    /** @test */
    public function it_upgrades_thumbnail_urls_to_high_resolution(): void
    {
        // Substack encoded S3 URL
        $substackUrl = 'https://substackcdn.com/image/fetch/$s_!TJW7!,w_320,h_213,c_fill,f_auto,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fphoto_2048x1536.jpeg';
        $upgraded = $this->service->upgradeImageUrl($substackUrl);
        $this->assertEquals('https://substack-post-media.s3.amazonaws.com/public/images/photo_2048x1536.jpeg', $upgraded);

        // Wired thumbnail
        $wiredUrl = 'https://media.wired.com/photos/123/1:1/w_120%2Ch_120%2Cc_limit/photo.jpg';
        $upgradedWired = $this->service->upgradeImageUrl($wiredUrl);
        $this->assertStringContainsString('w_1600', $upgradedWired);
        $this->assertStringContainsString('16:9', $upgradedWired);

        // WordPress thumbnail
        $wpUrl = 'https://example.com/wp-content/uploads/2026/10/circuit-board-300x200.jpg';
        $upgradedWp = $this->service->upgradeImageUrl($wpUrl);
        $this->assertEquals('https://example.com/wp-content/uploads/2026/10/circuit-board.jpg', $upgradedWp);

        // Wikimedia thumbnail
        $wikiUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Phabricator.png/320px-Phabricator.png';
        $upgradedWiki = $this->service->upgradeImageUrl($wikiUrl);
        $this->assertEquals('https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Phabricator.png/1200px-Phabricator.png', $upgradedWiki);
    }

    /** @test */
    public function it_cleans_content_images_and_formats_semantic_figures(): void
    {
        // 1. Purges TechCrunch/Google News logo containers
        $dirtyHtml = '<p>Some text</p><div class="my-6"><img src="https://lh3.googleusercontent.com/xyz=h60" alt="TechCrunch logo" /><p class="text-sm">CFS reactor caption</p></div><p>Following text</p>';
        $cleaned = $this->service->cleanContentImages($dirtyHtml);

        $this->assertStringNotContainsString('googleusercontent.com', $cleaned);
        $this->assertStringNotContainsString('CFS reactor caption', $cleaned);
        $this->assertStringContainsString('<p>Some text</p>', $cleaned);
        $this->assertStringContainsString('<p>Following text</p>', $cleaned);

        // 2. Formats naked <img> into semantic <figure> with upgraded URL
        $nakedHtml = '<p><img src="https://example.com/wp-content/uploads/2026/10/reactor-150x150.jpg" alt="Fusion reactor core"></p>';
        $formatted = $this->service->cleanContentImages($nakedHtml);

        $this->assertStringContainsString('<figure class="my-8 mx-auto max-w-3xl">', $formatted);
        $this->assertStringContainsString('reactor.jpg', $formatted);
        $this->assertStringContainsString('<figcaption class="text-sm text-gray-500 mt-3 text-center italic">Fusion reactor core</figcaption>', $formatted);

        // 3. Formats <div class="text-center"><img ...><p class="italic">caption</p></div> into semantic <figure>
        $divHtml = '<div class="text-center"><img src="https://substackcdn.com/image/fetch/$s_!TJW7!,w_320,h_213,c_fill,f_auto,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fphoto_2048x1536.jpeg" alt="Kernel Exploit"><p class="text-sm text-gray-500 italic mt-1">Exploit architecture diagram</p></div>';
        $divFormatted = $this->service->cleanContentImages($divHtml);

        $this->assertStringContainsString('<figure class="my-8 mx-auto max-w-3xl">', $divFormatted);
        $this->assertStringContainsString('https://substack-post-media.s3.amazonaws.com/public/images/photo_2048x1536.jpeg', $divFormatted);
        $this->assertStringNotContainsString('w_320,h_213', $divFormatted);
        $this->assertStringContainsString('<figcaption class="text-sm text-gray-500 mt-3 text-center italic">Exploit architecture diagram</figcaption>', $divFormatted);
    }

    /** @test */
    public function it_picks_topic_curated_cover_fallback(): void
    {
        // Disney title -> streaming category
        $disneyCover = $this->service->getCuratedFallback('Disney Implements Price Hikes Across Tiers as Ad Plan Expands');
        $this->assertNotEmpty($disneyCover);
        $this->assertStringNotContainsString('photo-1761044590673-d9d6c7a63a99', $disneyCover); // Must NEVER be HBO Max

        // Commonwealth Fusion title -> fusion category
        $fusionCover = $this->service->getCuratedFallback('Commonwealth Fusion Systems Lands $85 Million for Semiconductors');
        $this->assertNotEmpty($fusionCover);
        $this->assertStringNotContainsString('googleusercontent', $fusionCover);
    }
}
