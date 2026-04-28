<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ScoutedArticle extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'source',
        'url',
        'prompt',
        'status',
        'error_log',
        'article_id',
    ];

    /**
     * Relationship to the finalized Article (if generated).
     */
    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }
}
