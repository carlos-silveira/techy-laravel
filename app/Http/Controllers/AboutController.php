<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;

class AboutController extends Controller
{
    /**
     * Display the portfolio/about page.
     */
    public function index()
    {
        return Inertia::render('About');
    }
}
