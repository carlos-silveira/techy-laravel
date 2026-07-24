# FactCheck & FactCheckClaim Models

TechyNews uses an automated verification pipeline to ensure AI hallucinations don't reach production. This is powered by two distinct models.

## `FactCheck.php`
Represents a single "run" or verification session for a specific `Article`.

**Columns:**
- `article_id` (Foreign Key)
- `overall_verdict` (Enum): `true`, `false`, `mixed`, `unverifiable`.
- `confidence_score` (Integer 0-100)
- `raw_ai_response` (JSON): The raw analysis from Gemini before parsing.

**Relationships:**
- `belongsTo(Article::class)`
- `hasMany(FactCheckClaim::class)`

## `FactCheckClaim.php`
Represents an individual statement extracted from the article that was verified against trusted sources.

**Columns:**
- `fact_check_id` (Foreign Key)
- `claim_text` (String): "Apple announced the M4 chip on Tuesday."
- `verdict` (Enum): `true`, `false`, `misleading`.
- `evidence` (Text): The quoted evidence from a trusted source (via Jina Reader/Google).
- `source_url` (String): The URL of the verifying evidence.

## Business Logic Integration
These models are primarily manipulated by the `FactCheckService`. When an article is generated, the agent automatically spawns a `FactCheck` run, which populates multiple `FactCheckClaim` rows.
