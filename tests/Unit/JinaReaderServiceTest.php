<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Services\JinaReaderService;
use Tests\TestCase;

class JinaReaderServiceTest extends TestCase
{
    /** @test */
    public function it_cleans_cookie_consent_banners_and_navigation_junk(): void
    {
        $service = new JinaReaderService();

        $raw = "Manage your consent preferences\n" .
            "If you are a resident of Colorado...\n" .
            "- [x] On Essential\n" .
            "Confirm My Choices Reject All Accept All\n\n" .
            "[Skip to main content](https://example.com/#main)\n" .
            "# Critical Flaw Found in Core Library\n\n" .
            "Researchers announced today that a severe bug was patched.\n\n" .
            "## Comments (4)\n" .
            "Leave a comment below.";

        $cleaned = $service->cleanMarkdown($raw);

        $this->assertStringNotContainsString('Manage your consent preferences', $cleaned);
        $this->assertStringNotContainsString('Confirm My Choices', $cleaned);
        $this->assertStringNotContainsString('## Comments (4)', $cleaned);
        $this->assertStringContainsString('# Critical Flaw Found in Core Library', $cleaned);
        $this->assertStringContainsString('Researchers announced today', $cleaned);
    }

    /** @test */
    public function it_strips_promotional_acquisition_banners_and_tracker_pixels(): void
    {
        $service = new JinaReaderService();

        $raw = "# Big Tech News\n\n" .
            "[![Image 1: Subscribe to Wired](https://media.wired.com/photos/6aaa98648e983d8bad151ad7/original/pass/Wired_App_Rollover_Acquisition_01b.gif)](https://www.wired.com/v2/offers/wira)\n\n" .
            "![Image 2: Tracking Pixel](https://bat.bing.com/action/0?ti=4015762)\n\n" .
            "* [![Image 3: Sidebar story](https://media.wired.com/photos/123/1:1/w_120/undefined)](https://www.wired.com/story/other) Other story link\n\n" .
            "![Image 4: Real Editorial Graphic](https://media.wired.com/photos/6adbe0039bde53c96a68d73b/master/w_2560/real_graphic.jpg)\n\n" .
            "The main body content describing the tech announcement.";

        $cleaned = $service->cleanMarkdown($raw);

        $this->assertStringNotContainsString('Wired_App_Rollover_Acquisition', $cleaned);
        $this->assertStringNotContainsString('bat.bing.com', $cleaned);
        $this->assertStringNotContainsString('Other story link', $cleaned);
        $this->assertStringContainsString('real_graphic.jpg', $cleaned);
        $this->assertStringContainsString('The main body content describing the tech announcement.', $cleaned);
    }
}
