<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
        ]);
    
        $post = new Post;
        $post->title = $validatedData['title'];
        $post->content = $validatedData['content'];
        $post->user_id = auth()->user()->id;
        $post->save();
    
        return redirect()->route('posts.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::findOrFail($id);

        $content = $this->parseContent($post->content);


        return Inertia::render('Post', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $content,
                'author' => $post->user->name,
                'avatar' => $post->user->avatar,
                'image' => $post->image,
                'date' => $post->created_at->format('Y-m-d'),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    private function parseContent(string $content): string
    {
        $content = preg_replace_callback(
            '/<(b|i|em|img)([^>]+)>/',
            function ($matches) {
                $tag = $matches[1];
                $content = $matches[2];

                switch ($tag) {
                    case 'b':
                        return '<strong>' . $content . '</strong>';
                    case 'i':
                        return '<em>' . $content . '</em>';
                    case 'em':
                        return '<em>' . $content . '</em>';
                    case 'img':
                        return '<img src="' . $content . '" />';
                }

                return $content;
            },
            $content
        );

        $content = str_replace("\n", '<br />', $content);

        return $content;
    }

}
