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
}
