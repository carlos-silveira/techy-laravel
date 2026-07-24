<?php

declare(strict_types=1);

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class StudioScoutController extends Controller
{
    public function index()
    {
        return Inertia::render('Studio/Scout/Index');
    }
}
