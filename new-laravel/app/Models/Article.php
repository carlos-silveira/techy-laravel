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
    ];

    protected $casts = [
        'is_editors_choice' => 'boolean',
        'tags' => 'array',
        'likes_count' => 'integer',
        'views_count' => 'integer',
        'reading_time_minutes' => 'integer',
    ];

    /**
     * Check if the article is published.
     */
    public function getIsPublishedAttribute(): bool
    {
        return $this->status === 'published';
    }
}
