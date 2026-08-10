<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use NotificationChannels\WebPush\WebPushMessage;
use NotificationChannels\WebPush\WebPushChannel;
use App\Models\Article;

class NewArticlePublished extends Notification
{
    use Queueable;

    public $article;

    /**
     * Create a new notification instance.
     */
    public function __construct(Article $article)
    {
        $this->article = $article;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return [WebPushChannel::class];
    }

    /**
     * Get the web push representation of the notification.
     */
    public function toWebPush($notifiable, $notification)
    {
        return (new WebPushMessage)
            ->title($this->article->title)
            ->icon('/img/logo_icon.png')
            ->body(\Illuminate\Support\Str::limit($this->article->ai_summary ?? strip_tags($this->article->content), 120))
            ->data(['url' => '/article/' . $this->article->slug]);
    }
}
