<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Services\BotDetector;
use Tests\TestCase;

class BotDetectorTest extends TestCase
{
    private BotDetector $detector;

    protected function setUp(): void
    {
        parent::setUp();
        $this->detector = new BotDetector();
    }

    public function test_identifies_crawlers_and_search_engines(): void
    {
        $this->assertTrue($this->detector->isBot('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'));
        $this->assertTrue($this->detector->isBot('Mediapartners-Google'));
        $this->assertTrue($this->detector->isBot('Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'));
        $this->assertTrue($this->detector->isBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)'));
        $this->assertTrue($this->detector->isBot('facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'));
        $this->assertTrue($this->detector->isBot('Twitterbot/1.0'));
    }

    public function test_identifies_scripts_and_command_line_clients(): void
    {
        $this->assertTrue($this->detector->isBot('curl/8.5.0'));
        $this->assertTrue($this->detector->isBot('python-requests/2.31.0'));
        $this->assertTrue($this->detector->isBot('Wget/1.21.4'));
        $this->assertTrue($this->detector->isBot('Go-http-client/1.1'));
        $this->assertTrue($this->detector->isBot('axios/1.6.8'));
        $this->assertTrue($this->detector->isBot(''));
        $this->assertTrue($this->detector->isBot(null));
    }

    public function test_identifies_spoofed_iphone_scraper_uas(): void
    {
        $spoofed = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';
        $this->assertTrue($this->detector->isBot($spoofed));
    }

    public function test_allows_legitimate_browsers(): void
    {
        $chrome = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
        $firefox = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0';
        $iphone = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1';

        $this->assertFalse($this->detector->isBot($chrome));
        $this->assertFalse($this->detector->isBot($firefox));
        $this->assertFalse($this->detector->isBot($iphone));
    }
}
