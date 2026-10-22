# AI Data Pipeline

TechyNews relies on a sophisticated AI data pipeline to automate the creation of high-quality, multi-lingual journalism. This pipeline handles everything from ingesting raw news signals to synthesizing deep-dive articles.

## The Content Lifecycle

### 1. Signal Ingestion
The process begins by aggregating raw information.
- The `NewsService` periodically polls RSS feeds from high-signal technology sources like TechCrunch, Hacker News, and The Verge.
- Incoming items are parsed, sanitized, and deduplicated based on URLs and titles to ensure unique content.

### 2. Automated Synthesis (Quality v2 Pipeline)
Once a critical mass of raw signals is collected, the synthesis phase begins:

- **Research Dossier (`ArticleResearchService`):** Rather than writing from a single scraped page, the system compiles a multi-source research dossier. It cleans primary markdown (stripping GDPR banners, cookies, and navigation chrome), fetches corroborating sources via DuckDuckGo and Wikipedia fallbacks, and collects verified figure images.
- **Fact Sheet Extraction (`GeminiService::buildFactSheet`):** The AI extracts a strict factual ledger before drafting. It explicitly distinguishes who discovered the flaw from who detected in-the-wild exploitation or issued patches, records exact statistics with their precise scope (e.g. W3Techs survey scope), and identifies real affected organizations.
- **Explanatory Drafting (`GeminiService::generateExploratoryArticle`):** Models articles after top-tier tech journalism (Xataka, Ars Technica, Wired). Talks directly to the reader, uses narrative subheadings, embeds real figures with captions, provides actionable guidance (e.g. `php -v`, WAF rules), and completely bans preachy corporate sermonizing.
- **Quality Audit (`ArticleQualityGate`):** Enforces a strict filter against 40+ banned corporate fluff clichés (e.g., "stark reminder", "recordatorio contundente", "enterprises must elevate security to a critical business function"). If violations are detected, an automated AI editor pass rewrites the text substituting fluff with concrete facts.
- **Storage:** Stored directly in raw HTML format in the `content` column of the `articles` database table.

### 3. Metadata Generation
In a post-processing pass, the AI extracts metadata from the generated article:
- **SEO Tags:** Optimized meta titles and descriptions.
- **Summaries:** Short, engaging excerpts for the homepage grid.
- **Reading Time:** Estimated based on word count.

## The Translation Engine

TechyNews supports English (en), Spanish (es), and Portuguese (pt).

- **Native Localization (`GeminiService::translateArticle`):** Rather than literal machine translation, the model acts as a native localization editor for leading Spanish tech publications (Xataka, Gizmodo en Español). It forbids literal calques ("en un desarrollo inquietante", "recordatorio contundente", "las empresas deben"), preserves all HTML tags and figures, and adapts phrasing for natural flow.
- **Caching:** Translated content is stored in the `translations` JSON column of the database.
