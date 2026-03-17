<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function show()
    {
        return view('welcome');
    }
}
