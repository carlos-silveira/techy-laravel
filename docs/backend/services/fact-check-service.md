# FactCheckService

The `FactCheckService.php` is responsible for mitigating AI hallucinations.

## Workflow

1. **Extraction:** It reads the generated `Article` content and prompts a lightweight LLM (e.g., Gemini Flash) to extract 3-5 specific, verifiable "claims" (e.g., numbers, dates, official announcements).
2. **Web Search:** For each claim, it calls the `SourceSearchService` (which uses Google Custom Search) to find relevant URLs.
3. **Scraping:** It passes the top URL to `JinaReaderService` to extract the plain text of the web page.
4. **Verification:** It prompts the LLM again, providing the original claim and the Jina-scraped evidence, asking for a strict verdict: `true`, `false`, or `misleading`.
5. **Persistence:** It creates `FactCheck` and `FactCheckClaim` records in the database.

If an article receives a `false` verdict on a critical claim, the article status may be downgraded to `draft` automatically.
