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
        'viral_score',
        'is_quality_upgraded',
        'embedding',
        'fact_check_score',
        'fact_check_status',
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
     * Get the most recent fact check for this article.
     */
    public function factCheck()
    {
        return $this->hasOne(FactCheck::class)->latestOfMany();
    }

    /**
     * Get all fact checks for this article.
     */
    public function factChecks()
    {
        return $this->hasMany(FactCheck::class);
    }

    /**
     * Scope a query to only include fact-checked articles.
     */
    public function scopeFactChecked($query)
    {
        return $query->whereNotNull('fact_check_status');
    }

    /**
     * Scope a query to only include articles needing fact check.
     */
    public function scopeNeedsFactCheck($query)
    {
        return $query->whereNull('fact_check_status');
    }

    /**
     * Check if the article is published.
     */
    public function getIsPublishedAttribute(): bool
    {
        return $this->status === 'published';
    }

    /**
     * Get the final image URL, falling back to content extraction or generic defaults.
     */
    public function getFinalImageUrlAttribute(): string
    {
        $url = $this->cover_image_path;

        if (!$url) {
            if (preg_match('/<img[^>]+src=["\']([^"\']+)["\']/i', $this->content ?? '', $matches)) {
                $url = $matches[1];
            } elseif (preg_match('/"src"\s*:\s*"([^"]+)"/i', $this->content ?? '', $matches)) {
                $url = $matches[1];
            } else {
                if (str_contains($this->slug ?? '', 'not-paid-to-write-code')) {
                    return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200';
                }
                return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200';
            }
        }

        if (str_contains($url, 'unsplash.com')) {
            $separator = str_contains($url, '?') ? '&' : '?';
            return $url . $separator . 'auto=format&fit=crop&q=80&w=1200';
        }

        if (str_starts_with($url, 'http')) {
            return $url;
        }

        if (str_starts_with($url, '/storage/')) {
            return url($url);
        }

        return url('/storage/' . ltrim($url, '/'));
    }

    // NOTE: Translation is handled explicitly by PublicController::translateIfNecessary().
    // Do NOT add model accessors for auto-translation — they conflict with caching
    // and cause double-translation / mixed-language bugs.

    /**
     * Check if a translation array is invalid, empty, or contains AI placeholder text.
     */
    public static function isInvalidTranslation(mixed $translation, mixed $originalContent = null): bool
    {
        if (empty($translation)) {
            return true;
        }

        if (is_string($translation)) {
            $decoded = json_decode($translation, true);
            if (is_array($decoded)) {
                $translation = $decoded;
            } else {
                return true;
            }
        }

        if (!is_array($translation) || empty($translation['title']) || empty($translation['content'])) {
            return true;
        }

        $title = mb_strtolower(trim(strip_tags((string)$translation['title'])), 'UTF-8');
        $summary = mb_strtolower(trim(strip_tags((string)($translation['summary'] ?? ''))), 'UTF-8');
        $content = mb_strtolower(trim(strip_tags((string)$translation['content'])), 'UTF-8');

        // Banned dummy / placeholder strings (English, Spanish, Portuguese)
        $bannedPlaceholders = [
            'translated title',
            'título traducido',
            'titulo traducido',
            'título traduzido',
            'titulo traduzido',
            'translated summary',
            'resumen traducido',
            'resumo traduzido',
            'translated html content',
            'translated content',
            'contenido html traducido',
            'contenido traducido',
            'conteúdo html traduzido',
            'conteudo html traduzido',
            'conteúdo traduzido',
            'conteudo traduzido',
            '...',
            'n/a',
            'null',
        ];

        if (in_array($title, $bannedPlaceholders, true)) {
            return true;
        }

        if (!empty($summary) && in_array($summary, $bannedPlaceholders, true)) {
            return true;
        }

        if (in_array($content, $bannedPlaceholders, true)) {
            return true;
        }

        // Check if content is suspiciously short placeholder text
        if (strlen($content) < 40) {
            $origLen = is_string($originalContent) ? strlen(strip_tags($originalContent)) : 0;
            if ($origLen > 100) {
                return true;
            }
        }

        return false;
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
