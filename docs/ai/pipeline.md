# AI Data Pipeline

TechyNews relies on a sophisticated AI data pipeline to automate the creation of high-quality, multi-lingual journalism. This pipeline handles everything from ingesting raw news signals to synthesizing deep-dive articles.

## The Content Lifecycle

### 1. Signal Ingestion
The process begins by aggregating raw information.
- The `NewsService` periodically polls RSS feeds from high-signal technology sources like TechCrunch, Hacker News, and The Verge.
- Incoming items are parsed, sanitized, and deduplicated based on URLs and titles to ensure unique content.

### 2. Automated Synthesis
Once a critical mass of raw signals is collected, the synthesis phase begins.
- **Idea Generation:** Google Gemini analyzes the aggregated headlines to identify trends and propose unique editorial angles that go beyond simple summarization.
- **Drafting (Blueprint Prompting):** Gemini generates a comprehensive, 1500-2000 word investigative piece. We use a "Blueprint Prompting" technique, guiding the AI to structure the article with clear headings, introductions, and conclusions.
- **Storage:** The drafted article is returned in raw HTML format and stored directly in the `content` column of the `articles` database table.

### 3. Metadata Generation
In a post-processing pass, the AI extracts metadata from the generated article:
- **SEO Tags:** Optimized meta titles and descriptions.
- **Summaries:** Short, engaging excerpts for the homepage grid.
- **Reading Time:** Estimated based on word count.

## The Translation Engine

TechyNews is built for a global audience, supporting English (en), Spanish (es), and Portuguese (pt).

- **On-Demand Translation:** We employ an opportunistic translation strategy. When an article is requested for the first time in a new language, the translation engine kicks in.
- **Recursive Unwrapping:** AI models sometimes return JSON-encoded strings (e.g., `"{ \"content\": \"<h2>Title</h2>\" }"`). The backend recursively decodes these responses until raw HTML is successfully extracted and sanitized.
- **Caching:** Translated content is stored in the `translations` JSON column of the database, ensuring fast response times for subsequent requests.
