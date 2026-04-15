## [2026-04-14] - Production Launch Prep: Critical Bug Fixes (direct push to main)

### Fixed
- **`news:generate-daily` TypeError crash** (`GenerateDailyNews.php:42`): Gemini's `generateIdeas()` sometimes returns a flat string array instead of associative objects. Added `is_array($idea) && isset($idea['title'])` guard to skip malformed entries gracefully.
- **Wrong variable in draft generation**: `generateDraft()` was called with `$idea` (loop variable, now undefined after loop) instead of `$selectedIdea`. Fixed to use `$selectedIdea` throughout.
- **Missing `language` field on `Article::create()`**: New articles were saved without `language => 'en'`, causing locale routing issues. Now always set to `'en'`.

### Prod Actions Triggered
- `GET /admin/migrate` — confirmed nothing to migrate
- `GET /admin/seed` — news generation dispatched (background)
- `GET /admin/images` — image update pass dispatched
- `GET /admin/clean` — deep clean + dedupe dispatched
- Second news generation will be triggered after CI deploy of the fix

---


### Fixed
- **Spanish/PT locale shows English:** `PublicController` was caching English fallback under the `es` cache key for 3600s. Introduced `rememberLocaleAware()` — uses 30s TTL when translations are missing so the page self-heals within seconds after background jobs complete.
- **LanguageController:** Now flushes all locale-specific caches (`homepage_*`) on language switch to prevent stale cross-locale cache poisoning.
- **translateIfNecessary():** Now requires both `title` AND `content` to be present before applying a translation (prevents partial data).
- **RAG returns `{"answer":"..."}`:** `ChatController` was returning JSON on embedding failure; frontend displayed it as raw text. Added keyword-based LIKE fallback and changed all error paths to stream plain text.
- **RAG API key missing check:** Now validates API key before calling cURL; surfaces errors as readable streamed messages.

### Added
- **Cypress E2E test suite** targeting Docker staging mirror (`http://localhost:8080`)
  - `cypress/e2e/locale.cy.js` — 5 tests covering locale switch flow end-to-end
  - `cypress/e2e/rag-copilot.cy.js` — 7 tests covering backend API + frontend UI widget
  - `npm run test:e2e` / `npm run cypress:open` scripts added
- `data-testid="language-switcher"` added to `LanguageSwitcher.jsx`

### Closed GitHub Issues
- #6 TEST ISSUE
- #7 Issue 1: News generation quality (resolved Sprint 1)
- #8 Issue 2: Docker pre-flight testing (resolved Sprint 1)
- #9 Issue 3: Analytics dashboard polish (resolved PR #16)

---


## [2026-04-14] - Analytics Dashboard Overhaul (PR #16)
### Added
- **Crawler Intelligence**: New dashboard section showing which bots are indexing the site (Googlebot, GPTBot, Bingbot, Ahrefs, etc.) with individual hit counts.
- **Real Referrer Domains**: Inbound Traffic now shows actual domain names (google.com, reddit.com, t.co) with type classification (search/social/referral) instead of generic "Reference".
- **Gemini Cost Estimation**: Token usage stat card now shows estimated API cost. Each operation in the log shows its individual cost.
- **Operation Labels**: Gemini operations display human-readable names (Draft Gen, SEO Meta, Studio Chat) instead of generic "Operation".

### Fixed
- **Device Breakdown 0.1%/0.0% bug**: Now shows absolute counts alongside correctly calculated percentages.
- **Gemini column mismatch**: Frontend was reading `log.action`/`log.model` but DB columns are `operation_type`/`model_name` — all mapped correctly now.
- **Bot traffic silently dropped**: Middleware was filtering out all bots. Now tracks them for analytics while still filtering internal tools (Lighthouse/PageSpeed).

### Changed
- `DashboardController.php` — Complete rewrite of analytics queries (referrers, devices, crawlers, Gemini logs)
- `TrackPageView.php` — Removed bot filtering, kept only internal tool filtering
- `AnalyticsChart.jsx` — Added crawler section, real referrer domains with type badges, fixed device stats
- `GeminiUsage.jsx` — Fixed column mapping, added operation labels, costs, request counts

---

## [2026-04-14] - Sprint 1: Stability & Content Excellence
### Added
- **Issue 1 (Quality)**: Upgraded Gemini editorial prompts to prioritize viral, high-authority tech narratives (Wired/Stratechery style).
- **Issue 2 (Workflow)**: Established `scripts/validate.sh` for pre-flight local Docker testing (Build + Syntax + Lint).
- **Hardened Deployment**: Fixed accidental route deletion in `web.php` and verified production recovery via Health Checks.

### Fixed
- **Engagement**: Successfully restored the **Likes System** by moving endpoints to session-aware middleware. Verified live.
- **Data Integrity**: Normalized Analytics Top Pages; eliminated path duplications caused by query strings.
- **Reporting**: Integrated **Gemini Model Distribution** tracking into the main dashboard.

## 🛠️ Current Development Queue (Sprint Backlog)
- [ ] **Issue 3**: Finalize Analytics Dashboard visual polish and chart consistency.
- [ ] **Issue 4**: Security Hardening: Address Dependabot vulnerabilities (63 reported).
- [ ] **Referrer Parsing**: Implement cross-database compatible domain extractor.
- [ ] **Performance Polish**: Implement query caching for high-traffic analytics endpoints.

---
*Status: Branch `feature/content-excellence-issue-1` ready for Merge. Production Stable.*
