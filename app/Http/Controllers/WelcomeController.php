<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function show()
    {
        $posts = Post::with('user')->get();
        return Inertia::render('Welcome', ['posts' => $posts]);
    }
}
