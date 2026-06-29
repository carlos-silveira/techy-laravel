<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FactCheck extends Model
{
    protected $fillable = [
        'article_id',
        'overall_score',
        'status',
        'claims_count',
        'verified_count',
        'failed_count',
        'sources_checked',
        'checker_model',
        'raw_ai_response',
        'checked_at',
        'error_log',
    ];

    protected $casts = [
        'overall_score' => 'integer',
        'claims_count' => 'integer',
        'verified_count' => 'integer',
        'failed_count' => 'integer',
        'sources_checked' => 'array',
        'raw_ai_response' => 'array',
        'checked_at' => 'datetime',
    ];

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }

    public function claims(): HasMany
    {
        return $this->hasMany(FactCheckClaim::class);
    }

    public function getPassRateAttribute(): float
    {
        if ($this->claims_count === 0) return 0.0;
        return round(($this->verified_count / $this->claims_count) * 100, 1);
    }

    public function getIsPassingAttribute(): bool
    {
        return $this->overall_score !== null && $this->overall_score >= config('services.fact_check.min_score', 60);
    }

    public function getSummaryForHumansAttribute(): string
    {
        if ($this->status === 'pending' || $this->status === 'checking') {
            return "Fact check in progress...";
        }
        
        if ($this->status === 'failed' && $this->error_log) {
            return "Fact check failed: " . $this->error_log;
        }

        return "Score: {$this->overall_score}/100. Verified {$this->verified_count} out of {$this->claims_count} claims.";
    }

    public function scopePassing($query)
    {
        return $query->where('status', 'passed');
    }

    public function scopeFailing($query)
    {
        return $query->whereIn('status', ['failed', 'needs_review']);
    }

    public function scopePending($query)
    {
        return $query->whereIn('status', ['pending', 'checking']);
    }
}
