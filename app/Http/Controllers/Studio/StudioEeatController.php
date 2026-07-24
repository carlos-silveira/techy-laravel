<?php

declare(strict_types=1);

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class StudioEeatController extends Controller
{
    public function index()
    {
        return Inertia::render('Studio/Eeat/Index');
    }
}
