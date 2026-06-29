<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FactCheckClaim extends Model
{
    protected $fillable = [
        'fact_check_id',
        'claim_text',
        'verdict',
        'confidence',
        'supporting_sources',
        'contradicting_sources',
        'ai_explanation',
    ];

    protected $casts = [
        'confidence' => 'integer',
        'supporting_sources' => 'array',
        'contradicting_sources' => 'array',
    ];

    public function factCheck(): BelongsTo
    {
        return $this->belongsTo(FactCheck::class);
    }

    public function isVerified(): bool
    {
        return $this->verdict === 'verified';
    }

    public function isFalse(): bool
    {
        return $this->verdict === 'false';
    }

    public function isPartiallyTrue(): bool
    {
        return $this->verdict === 'partially_true';
    }

    public function bestSource(): ?array
    {
        if (empty($this->supporting_sources)) {
            return null;
        }

        $sources = $this->supporting_sources;
        
        // Sort by tier (1 is best, 4 is worst)
        usort($sources, function($a, $b) {
            $tierA = $a['tier'] ?? 4;
            $tierB = $b['tier'] ?? 4;
            return $tierA <=> $tierB;
        });

        return $sources[0];
    }
}
