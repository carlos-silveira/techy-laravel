<?php

namespace App\Listeners;

use App\Events\ArticlePublished;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Services\SocialMediaService;

class DispatchSocialPosts implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\ArticlePublished  $event
     * @return void
     */
    public function handle(ArticlePublished $event)
    {
        $socialService = new SocialMediaService();
        
        // Post to attached platforms
        $socialService->postToTwitter($event->article);
        $socialService->postToFacebook($event->article);
    }
}
