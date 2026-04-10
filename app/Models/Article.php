<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'source_url',
        'status',
        'ai_summary',
        'views_count',
        'reading_time_minutes',
        'meta_description',
        'seo_keywords',
        'is_editors_choice',
        'likes_count',
        'cover_image_path',
        'image_prompt',
        'tags',
        'language',
        'translations',
        'qa_passed',
        'embedding',
    ];

    protected $casts = [
        'is_editors_choice' => 'boolean',
        'tags' => 'array',
        'likes_count' => 'integer',
        'views_count' => 'integer',
        'reading_time_minutes' => 'integer',
        'translations' => 'array',
        'embedding' => 'array',
    ];

    /**
     * Check if the article is published.
     */
    public function getIsPublishedAttribute(): bool
    {
        return $this->status === 'published';
    }

    /**
     * Dynamically translate title if a translation exists.
     */
    public function getTitleAttribute($value)
    {
        $locale = app()->getLocale();
        if ($locale !== 'en' && !empty($this->translations[$locale]['title'])) {
            return $this->translations[$locale]['title'];
        }
        return $value;
    }

    /**
     * Dynamically translate content if a translation exists.
     */
    public function getContentAttribute($value)
    {
        $locale = app()->getLocale();
        if ($locale !== 'en' && !empty($this->translations[$locale]['content'])) {
            return $this->translations[$locale]['content'];
        }
        return $value;
    }

    /**
     * Dynamically translate summary if a translation exists.
     */
    public function getAiSummaryAttribute($value)
    {
        $locale = app()->getLocale();
        if ($locale !== 'en' && !empty($this->translations[$locale]['summary'])) {
            return $this->translations[$locale]['summary'];
        }
        return $value;
    }

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::saved(function ($article) {
            // Clear all caches when an article is saved/updated
            \Illuminate\Support\Facades\Cache::flush();

            // Only pre-translate published articles to save API costs
            if ($article->status !== 'published') {
                return;
            }

            // We want to ensure English and Spanish are ALWAYS cached.
            // This logic will be handled by a background process in a real app,
            // but for now, we'll trigger it here. 
            // Note: In production with many users, this should be queued.
            
            $targetLocales = ['en', 'es'];
            
            foreach ($targetLocales as $locale) {
                if ($article->language === $locale) {
                    continue;
                }

                $translations = $article->translations ?? [];
                if (isset($translations[$locale])) {
                    continue;
                }

                // Dispatch to background queue
                \App\Jobs\TranslateArticle::dispatch($article, $locale);
            }
        });
    }
}
