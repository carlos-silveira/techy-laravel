<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Console\Commands\GenerateDailyNews;
use App\Services\FactCheckService;
use App\Services\GeminiService;
use App\Services\ImageService;
use App\Services\JinaReaderService;
use App\Services\NewsService;
use App\Services\SourceSearchService;
use Tests\TestCase;

class GenerateDailyNewsTest extends TestCase
{
    /** @test */
    public function it_resolves_all_command_dependencies_from_container(): void
    {
        $command = app(GenerateDailyNews::class);
        $this->assertInstanceOf(GenerateDailyNews::class, $command);

        // Ensure all services invoked in GenerateDailyNews are bound and resolvable
        $this->assertInstanceOf(ImageService::class, app(ImageService::class));
        $this->assertInstanceOf(FactCheckService::class, app(FactCheckService::class));
        $this->assertInstanceOf(SourceSearchService::class, app(SourceSearchService::class));
        $this->assertInstanceOf(GeminiService::class, app(GeminiService::class));
        $this->assertInstanceOf(NewsService::class, app(NewsService::class));
        $this->assertInstanceOf(JinaReaderService::class, app(JinaReaderService::class));
    }

    /** @test */
    public function it_has_correct_image_service_import_and_no_unresolved_classes(): void
    {
        $reflection = new \ReflectionClass(GenerateDailyNews::class);
        $fileContents = file_get_contents($reflection->getFileName());

        // Assert that ImageService is imported via use App\Services\ImageService;
        $this->assertStringContainsString('use App\Services\ImageService;', $fileContents);

        // Ensure there is no accidental reference to App\Console\Commands\ImageService
        $this->assertStringNotContainsString('App\Console\Commands\ImageService', $fileContents);
    }
}
