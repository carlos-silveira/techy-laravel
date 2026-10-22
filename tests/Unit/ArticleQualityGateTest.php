<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Services\ArticleQualityGate;
use Tests\TestCase;

class ArticleQualityGateTest extends TestCase
{
    private ArticleQualityGate $gate;

    protected function setUp(): void
    {
        parent::setUp();
        $this->gate = new ArticleQualityGate();
    }

    /** @test */
    public function it_flags_banned_corporate_fluff_phrases(): void
    {
        $fluffyHtml = '<h2>The Security Landscape</h2>' .
            '<p>This zero-day serves as a stark reminder that cyberattacks happen. ' .
            'Enterprises cannot afford to ignore this. They must elevate it to a business-critical function.</p>' .
            '<p>' . str_repeat('Additional filler content for testing purposes. ', 40) . '</p>';

        $audit = $this->gate->audit($fluffyHtml);

        $this->assertFalse($audit['passed']);
        $this->assertContains('stark reminder', $audit['fluff_violations']);
        $this->assertContains('enterprises cannot afford', $audit['fluff_violations']);
        $this->assertContains('elevate it to a business-critical function', $audit['fluff_violations']);
    }

    /** @test */
    public function it_flags_banned_generic_subheadings(): void
    {
        $badHeadingHtml = '<h2>Why It Matters</h2>' .
            '<p>' . str_repeat('Substantive text without banned words here for testing. ', 50) . '</p>' .
            '<h2>Conclusion</h2><p>Final summary of the event.</p>';

        $audit = $this->gate->audit($badHeadingHtml);

        $this->assertFalse($audit['passed']);
        $this->assertNotEmpty($audit['heading_violations']);
    }

    /** @test */
    public function it_passes_clean_informative_journalistic_articles(): void
    {
        $cleanHtml = '<h2>Active exploitation detected before patch release</h2>' .
            '<p>Researchers noted that the flaw stems from memory handling issues in core routines. ' .
            'Overheid.nl and several European public agencies took services offline as a precautionary measure.</p>' .
            '<h2>Mitigations and distribution updates</h2>' .
            '<p>System administrators can verify their runtime with php -v. Patches were published for 8.2 and 8.3.</p>' .
            '<p>' . str_repeat('Clear, concrete facts explaining the technical scope and affected web servers. ', 45) . '</p>';

        $audit = $this->gate->audit($cleanHtml);

        $this->assertTrue($audit['passed']);
        $this->assertEmpty($audit['fluff_violations']);
        $this->assertEmpty($audit['heading_violations']);
    }
}
