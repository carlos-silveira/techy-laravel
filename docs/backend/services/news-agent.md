# NewsAgent & NewsService

These two services handle the autonomous, scheduled operations that drive the platform.

## `NewsService.php`
Responsible for data ingestion.
- Polls a predefined array of RSS URLs.
- Uses SimpleXML to parse feeds.
- Sanitizes input and deduplicates based on title strings and source URLs.
- Populates the `scouted_articles` table.

## `NewsAgent.php`
The orchestration engine that ties `NewsService` and `GeminiService` together. It acts as the autonomous "Editor-in-Chief".

**Execution Flow (triggered via CRON `php artisan news:generate-daily`):**
1. Calls `NewsService` to fetch fresh signals.
2. Selects the top 5 unprocessed `ScoutedArticle` rows.
3. Passes them to `GeminiService->generateIdeas()`.
4. Selects the best idea (heuristically or via AI scoring).
5. Calls `GeminiService->generateDraft()`.
6. Saves the new `Article` to the database.
7. Dispatches a job to `FactCheckService` to verify the new article asynchronously.
8. Marks the `ScoutedArticle` rows as `is_processed = true`.

## Observability
`NewsAgent` logs its state transitions heavily. It uses `Log::info()` and `Log::error()` at every step so the `/dashboard` UI can parse the logs and visualize the agent's progress in real-time.
