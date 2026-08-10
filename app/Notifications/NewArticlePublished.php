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
    public $locale;

    /**
     * Create a new notification instance.
     */
    public function __construct(Article $article, string $locale = 'en')
    {
        $this->article = $article;
        $this->locale = $locale;
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
        $title = $this->article->title;
        $summary = $this->article->ai_summary ?? strip_tags($this->article->content);

        // Override with translation if available and requested locale is not English
        if ($this->locale !== 'en' && isset($this->article->translations[$this->locale])) {
            $translation = $this->article->translations[$this->locale];
            // Assuming translation returns an array with content/title or just the raw translated text based on GeminiService
            // The translation array returned from GeminiService->translateArticle usually contains 'title' and 'summary' keys if we provided them, or it returns just a string if it's simpler. Let's handle both.
            if (is_array($translation)) {
                $title = $translation['title'] ?? $title;
                $summary = $translation['summary'] ?? $translation['content'] ?? $summary;
            } elseif (is_string($translation)) {
                // If it's a raw string, we'll keep the English title but use translated summary (fallback)
                $summary = $translation;
            }
        }

        return (new WebPushMessage)
            ->title($title)
            ->icon('/img/logo_icon.png')
            ->body(\Illuminate\Support\Str::limit($summary, 50))
            ->data(['url' => '/article/' . $this->article->slug]);
    }
}
