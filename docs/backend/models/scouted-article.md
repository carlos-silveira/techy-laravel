# ScoutedArticle Model

`app/Models/ScoutedArticle.php` represents the "pre-ingestion" phase of the TechyNews pipeline. It acts as a holding queue for raw RSS feeds and scraped links before they are synthesized by the AI.

## Database Schema & Columns
- `id` (Primary Key)
- `source_url` (String): The original URL of the news piece.
- `original_title` (String): Unmodified headline from the RSS feed.
- `raw_content` (LongText): The scraped text body or RSS summary.
- `source_name` (String): e.g., "TechCrunch", "The Verge".
- `is_processed` (Boolean): Flag indicating if Gemini has already consumed this row to generate a final `Article`.
- `relevance_score` (Integer): Optional AI-scored metric to prioritize important news.

## Workflow Context
1. `NewsService` polls RSS feeds and bulk inserts rows into `scouted_articles` with `is_processed = false`.
2. A CRON job runs `NewsAgent` which selects the top 5 most relevant, unprocessed `ScoutedArticle` rows.
3. The Agent feeds this raw data to Gemini to write a new `Article`.
4. The Agent marks the used `ScoutedArticle` rows as `is_processed = true`.

## Relationships
- None explicitly required, though it conceptually acts as the parent data for an `Article`.
