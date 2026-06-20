<?php

namespace App\Listeners;

use App\Events\ArticlePublished;
use Illuminate\Queue\InteractsWithQueue;
use App\Services\SocialMediaService;

class DispatchSocialPosts
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
