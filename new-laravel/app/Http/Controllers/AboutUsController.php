<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AboutUsController extends Controller
{
    public function index()
    {
        return Inertia::render('AboutUs');
    }
}
