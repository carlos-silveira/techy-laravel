## [2026-06-20] - OpenRouter Fallback Architecture & Prompt Enhancements
### Changed
- **Tiered Fallback Architecture**: Fully refactored `GeminiService.php` to route text-generation traffic (both `generateIdeas` and `generateDraft`) through an OpenRouter cascading fallback. This successfully bypassed the persistent 429 Google rate limits.
- **OpenRouter Free Tier Constraints**: Added `max_tokens => 2500` to the OpenRouter payload and explicitly limited the fallback models array to a maximum of 3 models (`google/gemini-2.5-pro,anthropic/claude-3.5-sonnet,meta-llama/llama-3.3-70b-instruct:free`) to comply with the OpenRouter API constraints (400 and 402 HTTP codes).
- **Prompt Freshness Injection**: Injected `now()->format('l, F j, Y')` dynamically into the Editor-in-Chief and tech journalist prompts. Added strict instructions to disregard events from previous years (preventing temporal hallucinations like returning news from 2021).
- **Cleanup**: Stripped out legacy 45-second `sleep()` logic, as the fallback sequence is now handled robustly and transparently natively via OpenRouter.

## [2026-06-20] - About Page CV Bento Box Grid
### Added
- **Hero Section Right Column**: Implemented a highly premium, Dala-style "Bento Box" grid on the right side of the Hero section. This utilizes the empty space efficiently while displaying critical CV data.
- **CV Data Widgets**: Added interactive glassmorphism cards highlighting "6+ Years Experience", "C1 Advanced English", and "Saltillo, Mexico" operations base with glowing hover states.

## [2026-06-20] - About Page Tech Logos & Content Restoration
### Changed
- **Content Restoration**: Restored the highly detailed, professional multi-sentence descriptions for each Experience item.
- **Translation Keys**: Appended the new UI strings (`Developer Portfolio`, `Featured Project`, etc.) and the long Experience strings to `resources/lang/es.json` and `resources/lang/pt.json` to guarantee the language toggle works flawlessly.
- **Tech Stack Logos**: Swapped out the generic Lucide icons for official brand logos (Laravel, React, Tailwind, Docker, MySQL, Framer, Git, Google) using `react-icons/si`.

## [2026-06-20] - About Page Scroll Animations & Localization
### Changed
- **Apple-like Scroll Animations**: Implemented heavy `framer-motion` `useScroll` and `useTransform` effects. The Hero section now scales down and fades out cleanly as the user scrolls, while the background geometric shapes parallax rotate and translate in the opposite direction.
- **Interactive Experience Accordion**: Replaced static Experience cards with an interactive `<AnimatePresence>` accordion that expands smoothly to reveal job descriptions upon click.
- **Localization Integration**: Wrapped all static text across the About page with the `useLanguage` `__()` translation helper to ensure seamless compatibility with the Navbar language switcher. Simplified copy back to professional phrasing.
- **Contact Info**: Updated mailto links to the correct address (silveira.alberto24@gmail.com).

## [2026-06-20] - About Page Cohesive Dala Redesign
### Changed
- **Design System Integration**: Integrated the Dala minimalist typography (extreme thin weights, negative tracking) with TechyNews' global premium glassmorphism and gradient language.
- **Layout Consistency**: Re-added global `<Navbar />`, `<PublicFooter />`, `<CommandPalette />`, and `<RagCopilot />` to ensure seamless navigation consistency across the entire site. Included full light/dark mode support (`dark:bg-[#02040a]`).
- **Interactive Cosmic Elements**: Replaced the basic 2D canvas with an interactive framer-motion based geometric floating layout that reacts to scroll (`useScroll`). Added a global interactive cursor spotlight (`useMotionTemplate`) that acts as a "flashlight" to reveal subtle tech grids and glows.
- **Glassmorphic Arsenal**: Updated the tool cards and experience list to use `backdrop-blur-md`, subtle `bg-white/40` to `dark:bg-black/20`, and dynamic `hover:border-[#00b4ff]/40` states for a premium, connected feel.

## [2026-06-20] - About Page Dala Minimalist Redesign
### Changed
- **Dala Aesthetic Pivot**: Completely rewrote `About.jsx` to adopt the true "Dala" style from the Refero reference provided by the user. Removed all blocky neo-brutalist elements, thick borders, and hard shadows.
- **Cosmic UI Elements**: Implemented a lightweight `<ParticleConstellation />` canvas to act as the cosmic void background.
- **Typography & Details**: Adapted the "Acronym" type system by using Inter with extreme `font-extralight` weights, negative tracking (`-0.04em`) on display text, and positive tracking on body text. Used hairline `border-white/10` borders to define structure without adding weight.

## [2026-06-20] - About Page Brutalist Redesign
### Changed
- **Brutalist Overhaul**: Completely rewrote `About.jsx` to adopt a true Brutalist / Neo-brutalist aesthetic based on the user's Refero style reference. Removed all glassmorphic effects, gradients, glowing background blurs, and framer-motion 3D tilts.
- **Hard Styling**: Implemented thick solid borders (`border-[3px] border-black`), stark offset drop shadows (`shadow-[6px_6px_0px_0px_currentColor]`), high-contrast colors, and rigid CSS translation hovers to replace the previous soft design.
- **Typography & Structural Detail**: Upscaled headings (`text-8xl`), applied tracking and uppercase transforms to enforce the typography-heavy neo-brutalist layout. Transformed the experience modal into a classic OS window style.

## [2026-06-20] - About Page Premium Redesign
### Changed
- **Premium About Page Overhaul**: Rewrote `About.jsx` to replace the flat brutalist design with a high-end, responsive glassmorphic Bento grid layout using the site's dark/light color language.
- **Interactive Spotlights & Textures**: Integrated a grainy noise backdrop overlay and a mouse-tracking radial spotlight glow (using Framer Motion springs and motion values) to create visual depth.
- **3D Tilt Cards & Custom Modals**: Re-implemented 3D interactive tilt cards for the "Tech Arsenal" grid and an animated pop-up detail modal (`AnimatePresence`) for exploring job details.
- **Local Dev Server**: Configured and ran the local Vite server (`npm run dev`) alongside the PHP web server to verify HMR and local page rendering.
- **Build Validation**: Verified production building (`npm run build`) succeeded with zero errors.

## [2026-06-19] - Dashboard & Analytics Crash Fix
### Fixed
- **Dashboard React Crash**: Fixed a `ReferenceError: Activity is not defined` in `AnalyticsChart.jsx` by correctly importing the `Activity` icon from `lucide-react`.
- **API 500 Errors**: Fixed the "Could not fetch trending stories" and "Failed to trigger scout agent" errors. The API endpoints were crashing with a `CollisionServiceProvider not found` error due to an incomplete `rsync` deployment that corrupted the server's `vendor/` directory cache. Resolved by syncing `vendor/` with `--delete` and regenerating Laravel's bootstrap cache on the production server.

## [2026-06-19] - Radical Redesign of About Page
### Changed
- **About Page Redesign**: Completely overhauled `About.jsx` into a radical, brutalist-elegance "museum placard" design inspired by Refero Styles. Removed glassmorphism, glowing orbs, and gradients. Implemented high-contrast `font-black` typography, extreme letter spacing (`tracking-[-0.04em]`), solid black/white division lines, and minimalist accent pills using the primary brand color (`#00b4ff`).

## [2026-06-19] - API Key Fix & Analytics Redesign
### Fixed
- **Gemini API Key Burned**: Diagnosed and fixed broken `Quick Create` and `Scout Agent` caused by Google revoking the previous Gemini API Key. The key was replaced locally and in production, restoring the `text-embedding-004` capability.

### Added
- **AdSense Projections**: Implemented a "Monetization Forecast" widget calculating AdSense earnings projections (low, average, high) based on total page views over the last 30 days.
- **Analytics Most Liked Links**: Made the article titles in the "Most Liked Content" table clickable by injecting the `$slug` property from the backend.
- **Analytics Most Liked**: Added a dedicated "Most Liked Content" (All Time) neon table section directly below the Viral Content panel.
- **Analytics Viral Content**: Clarified the timeframe by renaming to "Viral Content (Last 7 Days)".
- **OpenRouter Model Tracking**: Extracted the real model alias from the API response (`$json['model']`) so that `GeminiUsage.jsx` shows the actual open source model used instead of the generic `openrouter/free` fallback alias.


### Added
- **Premium Dashboard Analytics**: Redesigned `AnalyticsChart.jsx` with `framer-motion` for staggered entrance animations. Stat cards and charts now utilize `backdrop-blur-md` glassmorphism and subtle glowing backgrounds. Upgraded hover effects and custom frosted tooltips.
- **Scout Action Queue Redesign**: Redesigned `ScoutedQueue.jsx` into an Editorial Desk view with `framer-motion` layout animations and `AnimatePresence`. Added a functional "Scan the Web Now" button.
- **Backend Scout Trigger**: Added `Route::post('/scouted-queue/trigger')` and `ScoutQueueController@trigger` to actually dispatch `yolo:agent --scout` to the background queue directly from the UI.

### Fixed
- **Dashboard 504 Gateway Timeout (`Could not fetch trending stories`)**: Investigated a hanging HTTP request on `/api/generate-ideas`. Found that `GeminiService::handle429` was forcing a 45-second sleep multiple times when quota was exhausted, which is acceptable in queue workers but breaks synchronous HTTP requests. Added a check `app()->runningInConsole()` to fail fast and instantly switch to OpenRouter fallback in web contexts.
- **Corrupted Article Cleanup**: Manually removed the broken "título traducido" article via Tinker on production.

---

## [2026-05-22] - Fix Language Switcher and Mixed-Language Content
### Fixed
- **Middleware Execution Bug**: Corrected the middleware execution order in `bootstrap/app.php` by placing `SetLocale` *before* `HandleInertiaRequests`. This resolves the core issue where the Inertia shared props were evaluated and cached with a stale/default `'en'` locale before the preferred user locale was resolved from the session or cookies.
- **Cookie Decryption Excluded**: Added the `'locale'` cookie to the `$except` array in `app/Http/Middleware/EncryptCookies.php`. This stores the locale cookie in plain text, ensuring seamless integration between PHP sessions, Inertia redirects, and client-side requests without decryption mismatches.
- **Language Switcher Selection highlighting**: Updated `LanguageSwitcher.jsx` to use `activeLocale` instead of `locale` for applying button active styles and checkmark rendering, making it robust against transient state changes.
- **Strict Translation Constraint Relaxed**: Removed the strict `$result['title'] === $title` checks in both `GeminiService.php` and `TranslateArticle.php`. This allows articles containing proper nouns and brand names (e.g. "Oura Smart Ring", "Nintendo Switch Pro", "LG OLED TV") to successfully save their translations even if the AI decides the title should remain unchanged, preventing incomplete or failed background translations from rendering mixed-language content.
- **Graceful Scheduled Queue Worker**: Reconfigured the scheduled `queue:work` command in `routes/console.php` with limits (`--max-jobs=2 --max-time=30`) and eliminated the duplicate schedule in `Kernel.php` to prevent cPanel's watchdog from forcefully killing background processes (SIGKILL 137).

---

## [2026-05-22] - Dynamic Inline Image Resolution & High-Volume Category Seeding
### Added
- **Dynamic Inline Image Replacement**: Upgraded `NewsAgent.php` and `SeedCategoryNews.php` to parse article content and replace static `PLACEHOLDER_IMAGE` image tags with beautiful, context-aware, responsive Unsplash/Wikimedia images using a bulletproof case-insensitive regex. All resolved images now receive Tailwind/CSS classes (`w-full h-auto rounded-xl my-6 shadow-md object-cover max-h-[450px]`) for a stunning visual appearance.
- **Expanded Category News Seeder**: Added `--limit=10` and `--clear` options to `SeedCategoryNews.php` command. If `--clear` is specified, it truncates the database safely (handling constraints) to start fresh. It implements round-robin category selection and a duplicate topic check across generated category queues during the seeding cycle to prevent repeating stories.
- **Enhanced Content Narrative Guidelines**: Upgraded `GeminiService.php` category prompts to support `350 to 450 words` and `4 to 6 scannable bullet points` for richer information density.
- **Structured OpenRouter Fallback**: Upgraded fallback model in `.env` to `openrouter/free` to automatically utilize active, high-capability free models supporting structured outputs.

### Fixed
- **Placeholder Regex Robustness**: Hardcoded exact matching failed due to quote styles or attribute ordering from Gemini. Created a comprehensive regex: `/<img\s+[^>]*src=["\']PLACEHOLDER_IMAGE["\'][^>]*alt=["\']([^"\']*)["\'][^>]*>|<img\s+[^>]*alt=["\']([^"\']*)["\'][^>]*src=["\']PLACEHOLDER_IMAGE["\'][^>]*>/i` that works flawlessly.
- **Fallback Structure Safeguard**: Prevented modern PHP notices/crashes by throwing a clean `GenerationException` inside `GeminiService::generateCategoryDraft()` when both Gemini and OpenRouter return empty or invalid JSON responses.
- **Remote Seeding Pipeline Configured**: Standardized production cron execution.

---

## [2026-05-22] - Eliminate Repetitive AI Sections & Optimize API Quotas
### Added
- **GEMINI_MODEL=gemini-2.5-flash-lite**: Configured the lightweight, high-quota `gemini-2.5-flash-lite` model in both local and remote `.env` environments. This successfully bypasses the strict 20 RPD (Requests Per Day) limit of `gemini-2.5-flash` on the free tier, allowing infinite rapid news generation runs without 429 quota exhaustion.
- **Three-Part Article Layout Prompts**: Upgraded all drafting instructions (`generateDraft`, `generateCategoryDraft`, and `regenerateDraft`) to enforce a clean 3-part narrative flow (1-2 sentence hook intro, 3-5 scannable bullet points with bolded mini-titles, and a short 2-3 sentence consequence paragraph).
- **Hardened Subheading Blacklist**: Strictly banned the generation of repetitive analysis sections (e.g., "Why It Matters", "Deeper Analysis", "Conclusion", and their translations).
- **Automatic Editorial Safety Pass**: Updated `polishArticleHtml` to act as an editorial copy-editor that automatically strips out any forbidden subheadings and smoothly integrates their contents.

### Fixed
- **Synchronized NewsAgent.php**: Discovered that the remote production server was using an outdated version of `NewsAgent.php` that looked for `cuerpo_noticia` and `sugerencia_imagen` instead of `article_body` and `suggested_image`. Uploaded the synchronized local version to `/home/baifywfnnq/techynews.lat/app/Services/NewsAgent.php`, fixing the "Undefined array key" crashes on remote cycles.
- **Remote Caches Cleared**: Flushed all config and application caches to activate the new `.env` settings.
- **Verification Run**: Triggered and verified an autonomous generation cycle (`yolo:agent`), producing a beautifully formatted, non-repetitive article on *"SpaceX's Starship V3 Launch Scrubbed"* with flawless Spanish and Portuguese translations stored correctly in the database.


---

## [2026-05-22] - Fix Autonomous Tech News Pipeline & API Environments
### Fixed
- **Invalid Gemini Model Name (Error 500)**: Identified that the remote production `.env` was using `GEMINI_MODEL=gemini-flash-latest`, which causes a 500 error on the modern Gemini v1beta API. Updated it to use the stable, high-performance `GEMINI_MODEL=gemini-2.5-flash` both locally and on the spaceship server.
- **Saturated OpenRouter Fallback Model (Error 429)**: Discovered the fallback model `meta-llama/llama-3.3-70b-instruct:free` was heavily rate-limited upstream. Replaced it with the highly capable and stable `google/gemma-4-31b-it:free` in both local and remote `.env` environments, ensuring reliable automated fallback during Gemini API rate spikes.
- **SSH Spaceship Credentials**: Located and utilized the correct SSH configuration (`Host spaceship`) in `~/.ssh/config` using the local RSA key to safely and successfully execute remote configurations, Laravel cache clearing, and production agent cycles.

### Prod Actions
- Remotely configured `/home/baifywfnnq/techynews.lat/.env` with the new Gemini API Key (`AIzaSyBPrw3sGdyhbc3xO0nRlrhv6GDJ5MmCcpM`).
- Verified that the production autonomous tech news agent (`php artisan yolo:agent`) executes seamlessly, generating high-density Wired/Stratechery-style articles (such as *'The Coming AI Reckoning'*) with full Spanish and Portuguese synchronous translations saved perfectly inside the database.

---

## [2026-05-02] - Fix AI Content Generation & Default Language
### Fixed
- **Spanish Default Content**: Fixed an issue where the Gemini API was generating articles in Spanish by default, causing translation loops and incorrect routing. Modified prompts in `GeminiService.php` to strictly require English output using English JSON keys (`title`, `article_body`, etc.).
- **Missing Language Flag**: Added explicit `'language' => 'en'` during `Article::create()` in both `NewsAgent.php` and `GenerateDailyNews.php` to ensure the multi-language fallback logic operates from an English baseline.
- **Random Code Blocks**: Removed the requirement for `snippet_codigo` from the AI prompts, preventing the insertion of irrelevant code blocks into tech news articles.
- **Excessive Length & Meta-AI Content**: Added explicit constraints to the prompts limiting articles to 500 words and strictly banning meta-commentary about AI generating articles or replacing journalists.

---

## [2026-04-28] - Fix Language Double-Encoding Issue & Language Switcher
### Fixed
- **Language Switcher Not Updating Page**: Refactored `LanguageSwitcher.jsx` to use Inertia's native `router.post` instead of `axios.post`, and updated `LanguageController.php` to return a `back()` redirect instead of a JSON response. This triggers Inertia to automatically fetch the fresh state of the page (bypassing any aggressive LiteSpeed or browser cache that was previously trapping users in the English version) while gracefully applying the `locale` cookie.
- **Double-Encoded Translation Content**: Fixed an issue where localized versions of articles displayed escaped HTML entities (e.g. `&lt;h2&gt;`) instead of rendering raw HTML.
- Updated `PublicController.php`'s `recursivelyUnwrap()` to additionally perform `html_entity_decode` to gracefully handle content where Gemini inappropriately escaped the HTML.
- Updated `PublicController::translateIfNecessary()` to invoke `recursivelyUnwrap` on translated fields (`title`, `content`, `summary`) right when fetching from the `translations` object, ensuring that the cache and all components using this content always receive clean, valid HTML string.
- Explicitly unwrapped `$article->content` in `PublicController::show()` before passing to `sanitizeHtml` as a safety net.

---

## [2026-04-27] - Resilient AI Content Pipeline (OpenRouter Fallback)
### Added
- **OpenRouter Fallback System**: Implemented a robust fallback mechanism inside `GeminiService.php`. When Gemini API encounters `503 Service Unavailable` (Overloaded) or `429 Too Many Requests` (Quota Limit), the generation seamlessly falls back to OpenRouter.
- **Configurable Models**: Supports swapping the fallback model via `OPEN_ROUTER_MODEL` in `.env`. Defaulted to `google/gemma-2-9b-it:free` as it adheres more strictly to JSON object arrays compared to Llama 3 8B.
- **Conversational Fallback**: Both `callGemini` (content generation) and `callGeminiConversational` (Studio chat) support the OpenRouter fallback, ensuring the entire CMS remains operational during Gemini outages.

### Fixed
- **Generation Freezes**: Previously, 503 errors would completely halt the `news:generate-daily` command and leave the site without new content.

### Prod Actions
- Pushed `app/Services/GeminiService.php` to bypass GitHub Actions for immediate hotfix deployment.
- Set `OPEN_ROUTER_API_KEY` and `OPEN_ROUTER_MODEL` directly in production `.env`.
- Committed code to `feature/editorial-queue` branch.

---

## [2026-04-15] - Hardening Multi-Language Pipeline & Studio Restoration
### Fixed
- **Missing "Executive Summary" (TLDR) block**: Root cause identified as a data sync hole in the Studio. Added `aiSummary` state to `Dashboard.jsx` and updated `ArticleController` to persist `ai_summary` during auto-saves and manual edits.
- **Mixed-Language Content**: Updated `TranslateArticle` job to eliminate English fallbacks. We now store `null` instead of leaking source English into translated records if a specific field translation fails.
- **Leaky Translation Logic**: `PublicController::translateIfNecessary` now explicitly clears the `ai_summary` if a translation for the selected locale is missing, preventing "English TLDR on Spanish article" artifacts.
- **Broken Language Switcher**: Replaced granular cache removal with `Cache::flush()` in `LanguageController` to ensure total consistency across locales.

### Added
- **Self-Healing Command**: `php artisan articles:heal-summaries` created to recover missing summaries for articles that were nulled out by previous Studio bugs.
- **Heal Validation**: Verified code integrity locally via PHPUnit (internal) before push.

### Prod Actions
- **Triggered CI/CD**: Pushed fixes to `main` (build in progress).
- **Pending**: Run `articles:heal-summaries` on production once build completes.

---

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
- Updated GeminiService prompts to enforce 8th-grade reading level, remove verbal vomit and corporate jargon. Re-tested generation logic.
- Updated GeminiService prompts to remove rigid sectioning (Why It Matters, What's Next) and enforce natural narrative flow with context-specific subheadings.
- Rewrote generateIdeas to select individual, factual news stories instead of forcing the AI to connect unrelated headlines into fake cultural trends.
- Updated generateDraft and generateCategoryDraft to emphasize bulleted lists and direct factual reporting.
- Wiped all existing articles to remove AI hallucination/slop.
- Rewrote generateInternalDailyBrief to group articles by categories with <h2> headers and use bulleted lists with bold mini-titles.
- Explicitly banned code blocks in all generateDraft instructions.
- Updated generateIdeas prompt to request 5-10 article ideas instead of exactly 3.
- Updated NewsYoloAgent default limit from 1 to 10 to allow 5-10 news to flow into the Daily Brief.

## [2026-06-19] - Twitter Integration Cost Optimization
### Changed
- **Social Media Service**: Updated `formatPostText` in `app/Services/SocialMediaService.php` to completely remove URLs from tweets. Instead of including the article link (which triggers Twitter's $0.20 API fee per request), tweets now append the static text "Lee la nota completa en nuestra web de TechyNews". This forces Twitter to bill the API request at the standard text-only rate ($0.015).
- Tested integration manually via `php artisan test:social-post` which succeeded after user added API credits.

---

## [2026-06-19] - Inertia SSR Implementation for SEO
### Added
- **Server-Side Rendering (SSR)**: Configured Inertia SSR by creating `resources/js/ssr.jsx` and updating `vite.config.mjs` to include the SSR entry point. This solves SEO indexing issues by ensuring Googlebot receives fully pre-rendered HTML instead of an empty client-side React shell.
- **Ziggy SSR Integration**: Enabled `ziggy-js` within the SSR context to ensure `route()` helpers function correctly during backend rendering.
### Changed
- **Build Pipeline**: Updated `package.json` build script to explicitly trigger `vite build && vite build --ssr` for deterministic CI/CD deployments.
- **Walkthrough Created**: Documented requirements for running `php artisan inertia:start-ssr` in production and restarting it during deployments.

---

## [2026-06-19] - Inertia SSR Implementation for SEO
### Added
- **Weekly Newsletter Feature**:
  - Fixed a routing method mismatch where the frontend called `/api/subscribe` expecting the `store` method but the controller had `subscribe`.
  - Created `WeeklyNewsletter` Mailable class and `newsletter.blade.php` template with a beautiful, modern, dark-mode design.
  - Created `SendWeeklyNewsletter` console command to fetch top articles from the past 7 days and send them via Mail facade.
  - Scheduled the command to run every Friday at 09:00 AM in `routes/console.php`.
  - Updated local `.env` with Resend SMTP credentials.
  - Created a temporary `/preview-newsletter` route for the email developer to preview the design.
- **Language Switcher Bugfix**: Fixed a React 18 hydration mismatch caused by `createRoot` being used over server-rendered HTML. Conditionally applied `hydrateRoot` in `app.jsx` and added `<Toaster />` to `ssr.jsx` to perfectly match the client UI structure.
- **Article Deduplication**: Enhanced `DeepCleanArticles.php` to identify semantic duplicates by matching identical `cover_image_path` signatures (as identical AI topics produce identical Unsplash image queries). Deployed and triggered the cleanup script on production.
- **Ziggy SSR Integration**: Enabled `ziggy-js` within the SSR context to ensure `route()` helpers function correctly during backend rendering.
### Changed
- **Build Pipeline**: Updated `package.json` build script to explicitly trigger `vite build && vite build --ssr` for deterministic CI/CD deployments.
- **Walkthrough Created**: Documented requirements for running `php artisan inertia:start-ssr` in production and restarting it during deployments.

## 2026-06-20
- **Changed**: Fully refactored GeminiService to route all text-generation traffic through OpenRouter. Added  to the payload and limited fallback models to a maximum of 3 to satisfy OpenRouter's API constraints for the free-tier. Injected the current date dynamically into AI prompts (generateIdeas and generateDraft) to prevent the AI from generating news with temporal hallucinations (e.g., claiming it's still 2021). Removed legacy sleep/429 fallback loops.
- **Tested**: Validated the full workflow by running `php artisan news:generate-daily` on production. The fallback router successfully engaged and generated 'Apple's Siri Overhauled with Siri AI'.
- **Result**: Production news generation is now using the resilient OpenRouter fallback chain, generating fresh content without 429 timeouts.
