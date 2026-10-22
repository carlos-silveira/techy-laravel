# Article Quality v2 — Research → Fact Sheet → Draft → Editor

> AI-authored plan (Antigravity agent, 2026-10-22). Trigger: user review of
> article #1165 ("Hackers Exploited Critical PHP Vulnerabilities Days Before
> Official Patches") compared against Xataka's coverage of the same story.

## Problem (root causes found)

| Symptom reported | Root cause in the pipeline |
| --- | --- |
| "Investigadores de AWS" misleading — AWS didn't discover PHP2Shell | Draft was written from a single source. No "who did what" extraction, so *detected exploitation* (AWS) blurred into *discovered the bugs* (Wiz, Calif/OpenAI). |
| "75% of all websites" — imprecise | No numbers ledger. The model filled the gap from memory. W3Techs says ~69% of sites *whose server-side language is known*. |
| Few facts, lots of filler ("serves as a stark reminder… companies must…") | Prompt literally asks for "expert analysis: why does this matter / market impact" at 450–600 words, which produces moralizing filler when facts are thin. |
| Thin context | `JinaReaderService` truncates at 10 000 chars and Wired/AWS pages start with ~5 000 chars of cookie banners and nav → half the context was boilerplate. Corroborating search (`SourceSearchService`) returns nothing: Google CSE answers 403 and Jina Search needs an API key that isn't configured. |
| Fact-check passed with 100 | Fact-check also depends on `searchForClaim`, so every claim was "unverified" against zero evidence. |
| Images add nothing | Random Unsplash "cybersecurity concept" photo via `/photos/random`, plus inline placeholder stock image. |
| Spanish reads translated ("En un desarrollo inquietante…", "RECORDatorio") | Translation prompt asks for literal translation, not native localization. |

## Plan

1. **Clean extraction** (`JinaReaderService`): strip Jina header, cookie/nav
   boilerplate before the H1, trailing "Most popular/Comments" blocks, link-only
   lines; raise cap to 20 000 chars; return body links and image alts.
2. **Research dossier** (`ArticleResearchService`, new): primary source +
   up to 2 sources cited by the primary article (official blogs, advisories) +
   web search results (CSE → Jina → DuckDuckGo HTML fallback) + Wikipedia
   background for the key entity. Sources labelled `[S1]…[Sn]`.
3. **Fact sheet** (`GeminiService::buildFactSheet`): structured JSON with
   key facts, who-is-who (discovered vs detected vs reported), numbers with
   exact scope, timeline, quotes, reader impact, practical steps, unknowns,
   conflicts and jargon to explain.
4. **New writing prompt** (`EditorialStyleGuide`, new): Xataka-style
   explanatory journalism. Every paragraph carries a concrete fact; attribution
   and inline source links; jargon explained once; quotes; tables/timelines when
   useful; ending on a fact/open question; banned filler list (EN/ES/PT); length
   proportional to facts (650–1100 words).
5. **Editor pass + quality gate** (`ArticleQualityGate`, new +
   `GeminiService::reviseArticle`): deterministic checks (filler phrases, vague
   paragraphs, moralizing ending, links, headings, length) feed an AI editor that
   rewrites against the fact sheet. Result stored in `articles.qa_passed`.
6. **Images**: informative figures with captions/credits from the dossier
   (official source, Wikimedia) instead of stock placeholders; Unsplash cover via
   relevance search instead of random.
7. **Fact-check with evidence**: `FactCheckService::checkArticle()` accepts the
   dossier and verifies claims against it.
8. **Translation** prompt → native localization (LatAm Spanish / Brazilian
   Portuguese), facts/links/HTML preserved.
9. **Pipeline orchestration** (`ArticleWriterPipeline`, new) used by
   `news:generate-daily`, `NewsAgent` and a new `article:regenerate {id}`
   command (used to rebuild #1165 for user review).
10. Job timeout 600 → 1200 s; OpenRouter `max_tokens` 4000 → 8192.

## Verification

- `php artisan test` (new unit tests for cleaner, quality gate, pipeline helpers).
- `php artisan article:regenerate 1165 --dry-run` locally against live sources;
  manual read-through vs. Xataka article.
- `npm run build` (no frontend code changes expected).

## Out of scope / needs approval

- Deploy and running the regeneration on production (requires approval).
- Adding a `JINA_API_KEY` or fixing the Google CSE key (ops decision).
