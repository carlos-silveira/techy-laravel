<?php

declare(strict_types=1);

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudioAnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $dashboardController = new DashboardController();
        $response = $dashboardController->index($request);

        if ($response instanceof \Inertia\Response) {
            // Inertia Response exposes props via reflection or property access
            $reflection = new \ReflectionClass($response);
            $property = $reflection->getProperty('props');
            $property->setAccessible(true);
            $props = $property->getValue($response);

            return Inertia::render('Studio/Analytics/Index', $props);
        }

        return Inertia::render('Studio/Analytics/Index', []);
    }
}
