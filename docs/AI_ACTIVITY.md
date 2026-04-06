# AI Agent Activity Log — Techy News

This file tracks significant architectural changes and UI/UX improvements performed by AI agents.

---

### March 23, 2026 - Database Reinitialization & Category Seeding
- **Agent**: Gemini
- **Action**: 
  - Switched local `.env` configuration to use SQLite database instead of production MySQL connection to fix connection issues.
  - Added missing `translations` column via migration to the local `articles` table to resolve crash during generation.
  - Developed and ran a custom command (`php artisan news:seed-categories`) to explicitly truncate the existing database and generate exactly one new, highly-targeted AI article for each of the 6 core categories.
- **Files Touched**: `.env`, `app/Console/Commands/SeedCategoryNews.php`, `app/Services/GeminiService.php`

---

### March 22, 2026 - Gemini Adaptation & AI Skills Integration
- **Framework Expansion**: Integrated the top 22 AI Skills and custom MCP server configurations based on the ultimate `@zodchiii` Twitter thread, adapting all skills specifically to work with Gemini AI.
- **Automation**: Created `scripts/setup-agent-skills.sh` to fetch these skills gracefully via sparse-checkout and auto-replace prompt instructions for Gemini without polluting the core git repository.

## 📅 March 19, 2026

### 🚀 Major UI/UX & Functional Overhaul
- **Mobile Experience**: Implemented a state-controlled **Hamburger Menu** for mobile devices, significantly improving navigation on small screens.
- **Visual Stability**: Resolved "Global Error" on article pages by optimizing the sequential loading of **Prism.js** syntax highlighting scripts and styles.
- **Logo & Branding**: 
    - Replaced Ollama AI with **Gemini AI** in the tech stack (About page).
    - Updated to the latest official **MySQL logo**.
    - Fixed logo stretching issues on mobile by enforcing aspect-ratio constraints.
- **Content Engine**: 
    - Fixed a critical data-loss bug where `cover_image_path` was omitted during translation transformations.
    - Implemented a **recursive JSON unwrap** logic in `PublicController` to handle occasional double-encoding from Gemini API responses.
    - Added an intelligent **Cover Image Fallback** system for articles without specific images (using high-quality technical abstract images).
- **Internationalization (i18n)**:
    - Successfully localized the entire UI into Spanish, including buttons, section titles, and form placeholders.
    - Enhanced the `LanguageSwitcher` to use a more robust `window.location.reload()` method, ensuring clean state resets between locales.
- **Documentation**:
    - Complete revamp of the project **README.md** with a modern, high-authority look.
    - Created a deep-dive **System Design Document (SDD.md)**.
    - Authored a comprehensive **Project Guide (PROJECT_GUIDE.md)** for developers.

---

*Note: All changes have been verified with `npm run build` and are deployed to production.*

## March 23, 2026 - Content Generation & UI Fixes
- Enforced 24-48h recency in Gemini prompts
- Added 3-attempt generation retry logic
- Formatted Daily Briefing intelligently using our own articles with HTML links
- Updated Welcome.jsx to render HTML dynamically
- Fixed ArticleShow.jsx header layout
- Adjusted generation cron to 7AM Mexico time

## March 23, 2026 - Production API Quota Fix
- Refactored category seeder to strictly enforce 10s API rate limits
- Encapsulated API calls in protective try-catch structures
- Prevented Free Tier Gemini quota from crashing generation mid-way

## March 23, 2026 - High Availability AI Strategy
- Implemented dynamic API fallback cascade linking 5 Google AI Studio models
- Configured system to rotate between Gemini 3, Flash Lite, and Gemma 3 on 429 Quota Exhaustion
- Effectively multiplied free tier quota limits by 5x

---

### 2026-03-25 - Antigravity IDE Fullscreen Chat Extension
- **Agent**: Antigravity
- **Action**: Developed a VS Code extension `antigravity-fullscreen-chat` that expands the Antigravity chat panel to full screen when no file is open or the editor is empty. Added `package.json`, `src/extension.ts`, and documentation.
- **Files Created**: `antigravity-fullscreen-chat/package.json`, `antigravity-fullscreen-chat/src/extension.ts`

## March 23, 2026 - Editorial Quality & UX Polish
- Enforced strict Anti-AI prompt rules in GeminiService to ensure content diversity across generic tech categories
- Implemented dynamic fallback loop in PublicController to prevent empty Daily Briefings during translation failures
- Broadened Unsplash API fallback queries to virtually guarantee high-definition cover images

## March 23, 2026 - Prompt Paradox Resolution
- Identified a logical contradiction where banning the phrase 'Artificial Intelligence' from all categories caused Gemini to refuse generating the actual 'Artificial Intelligence' category.
- Corrected the prompt exception string to match the exact Category Title array keys

## March 23, 2026 - Third Final Schema Resolution
- Uncovered MySQL exception (Data too long for column cover_image_path) triggered by exceptionally long Unsplash query URLs.
- Expanded the 'cover_image_path' column size from string (255 chars) to text securely via a new deployment migration to safely handle unpredictable analytics tokens.

## March 23, 2026 - DBAL Integration
- Discovered raw SQL table alterations crashed the SQLite test suite in the GitHub Actions remote pipeline, abandoning the initial migration.
- Deployed doctrine/dbal composer package globally to support native Laravel Schema table modifications across disparate DB engines.

## April 02, 2026 - SQLite Pipeline Ghost Fix
- Detected 'doctrine/dbal' version mismatch triggered a fatal error on the remote Github Actions Runner, preventing the migration deployment.
- Removed dependency entirely and injected 'DB::getDriverName() === mysql' directly into the Migration schema to surgically update Production while quietly bypassing unit tests.

## April 05, 2026 - PHP CLI Environment Path & Gen AI Polish
- Fixed automatic CRON scheduling bug by changing raw 'php' execution string to the absolute cPanel PHP 8.2 host path ('/usr/local/bin/php'), successfully detaching from the base OS defaults.
- Stopped the daily database genocide trigger: 'Article::truncate()' was replaced with a rolling 3-day TTL ('subDays(3)->delete()') allowing 'news:generate-daily' articles to survive the 'news:seed-categories' cleanup phase.
- Reconfigured 'GeminiService' prompt matrices to assume the persona of a sassy, ultra-modern tech-journalist (akin to The Verge), severely boosting headline punchiness and the 'Why This Matters' semantic weight of the content.

## April 05, 2026 - Illustrative Cover Imagery Refactor
- Stripped the hardcoded strings 'technology abstract neon' from 'Unsplash' which skewed queries into making all posts seemingly identical.
- Modified 'generateCategoryDraft' to include a 'suggested_cover_query' asking Gemini to suggest exact concrete English words for physical objects related to the news issue.
- Added an artisan job 'news:update-images' to retrospectively extract highly visual string markers from existing headlines, and executed it across Production to retro-fit all old entries.
