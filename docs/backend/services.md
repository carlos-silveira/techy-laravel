# Services

The `app/Services/` directory encapsulates all the core business logic of TechyNews. By isolating complex operations into services, we keep our controllers clean and make the code easier to test and maintain.

## Key Services

### `NewsService`
This service handles the aggregation and preprocessing of external data.
- **Responsibilities:** 
  - Polling high-signal tech RSS feeds (e.g., TechCrunch, Hacker News, The Verge).
  - Deduplicating incoming news items.
  - Structuring raw feed data into a format suitable for the AI ingestion pipeline.

### `GeminiService` / `LlamaService`
This service is the primary orchestrator for all AI interactions.
- **Responsibilities:**
  - Generating editorial ideas from aggregated headlines.
  - Drafting full articles using "Blueprint Prompting".
  - Extracting metadata (SEO tags, summaries).
  - Translating content on-demand.
- **Integration:** Communicates with either the cloud-based Google Gemini 2.0 API or a local MLX-LM server running Qwen2.5-Coder.

## Best Practices for Services

- **Single Responsibility:** Each method inside a service should do exactly one thing. If a method grows beyond 40 lines, it should be refactored into smaller private helper methods.
- **Error Handling:** External API calls (like fetching RSS feeds or calling Gemini) must be wrapped in `try/catch` blocks. Errors must be logged with context using `Log::error()`.
- **Rate Limiting:** Ensure that calls to external APIs respect rate limits. For example, the Gemini integration includes a mandatory 10-second delay between consecutive calls to avoid 429 errors.
