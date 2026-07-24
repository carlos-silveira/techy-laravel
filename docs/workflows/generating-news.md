# Generating News Workflow

This workflow describes the exact internal lifecycle of an article from raw data to published content. AI agents modifying this codebase must understand this flow to avoid breaking the core CMS functionality.

## 1. Trigger
The process can be triggered automatically via a CRON job (`php artisan schedule:run`) or manually via the Dashboard UI (`/api/agents/force-synthesize`).

## 2. Aggregation & Selection
The `NewsAgent` queries the `ScoutedArticle` table:
```sql
SELECT * FROM scouted_articles WHERE is_processed = 0 ORDER BY relevance_score DESC LIMIT 5;
```

## 3. Idea Generation
The raw content from these 5 scouted articles is sent to `GeminiService->generateIdeas()`. 
- **Prompt Logic:** "Act as a Senior Editor. Read these 5 articles and synthesize 3 unique editorial angles that combine them."

## 4. Drafting
The best idea is passed to `GeminiService->generateDraft()`.
- **Output Constraint:** Gemini MUST return raw HTML. No Markdown. No JSON wrappers (unless handled by the recursive unwrapping logic).

## 5. Persistence & Translation
The raw HTML is stored in `Article->content`.
When a user requests the article in Spanish (`?locale=es`), the `ArticleController` intercepts the request. If the `translations` JSON column lacks the 'es' key, it triggers an on-the-fly translation via `GeminiService` before rendering.

## 6. Fact-Checking (Async)
A background Job is dispatched. The `FactCheckService` extracts claims, searches the web via `SourceSearchService`, scrapes via `JinaReaderService`, and assigns a truth score.
