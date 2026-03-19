# AI Activity Ledger — TechyNews

This log tracks all actions performed by AI agents in this repository.

## 2026-03-18
- **Agent**: Gemini CLI
- **Task 1**: Fix 404 image errors and improve cover image upload.
- **Actions**:
    - Created `App\Console\Commands\FixStorageLink` to repair broken symbolic links on production.
    - Updated `.github/workflows/deploy.yml` to automate storage link fixes during deployment.
    - Modified `resources/js/Pages/Dashboard.jsx` to add native Drag & Drop support for cover images.
    - Implemented visual dragging feedback and image deletion capability in the Studio interface.
    - Verified frontend integrity with a production build (`npm run build`).
    - Integrated "AI Accountability" rules into `GEMINI.md`.

- **Task 2**: Implement Full Multi-Language (i18n) Support with AI Translation.
- **Actions**:
    - **Database**: Added `language` and `translations` columns to `articles` table for localized content caching.
    - **Middleware**: Created `SetLocale` middleware for automatic browser language detection (Accept-Language) and session-based persistence.
    - **UI Localization**: Created JSON translation files for English, Spanish, and Portuguese.
    - **Frontend**: 
        - Created `useLanguage` hook for React components.
        - Centralized navigation into a new `Navbar` component with an integrated `LanguageSwitcher`.
        - Translated major UI strings across `Welcome.jsx` and `ArticleShow.jsx`.
    - **AI Engine**: Added `translateArticle` method to `GeminiService` to translate article titles, summaries, and HTML content on-demand.
    - **Backend Logic**: Updated `PublicController` to detect locale mismatches and trigger/cache AI translations for articles.
    - **Integrity**: Performed final production build to verify all localized components.

- **Task 3**: Fix "Bad Text" in Article View (Double Encoding).
- **Actions**:
    - **Frontend**: Refined `sanitizeContent` in `ArticleShow.jsx` to handle complex double-encoding scenarios more robustly.
    - **Logic**: Improved JSON parsing logic to only attempt parsing on valid JSON-like strings, preventing raw HTML from being corrupted.
    - **Deployment**: Re-built and pushed to production.

## 2026-03-19
- **Agent**: Gemini CLI
- **Task**: Fix article content JSON rendering issues.
- **Actions**:
    - **Backend**: Implemented `tipTapToHtml()` in `GeminiService` to convert TipTap JSON to clean HTML.
    - **Commands**: Updated `GenerateDailyNews` and `FixArticleEncoding` to automatically detect and convert TipTap JSON structures.
    - **Frontend**: Enhanced `ArticleShow.jsx` to correctly decode and render JSON fallback via `TipTapRenderer`.
    - **Prompt Engineering**: Updated `GeminiService` drafts to explicitly forbid JSON-formatted article content.
    - **Quality Assurance**: Added unit tests for `tipTapToHtml()` conversion and verified PHP syntax across all modified files.
    - **Theme Support**: Implemented Dark/Light mode toggle in `Navbar.jsx` with persistent user preference and system detection.
    - **Content Enrichment**: Integrated Mermaid.js for diagram rendering and updated AI prompts to include diagrams and image placeholders.
    - **Image Resolution**: Updated `GenerateDailyNews` to resolve image placeholders using the Unsplash API.
    - **UI Polishing**: 
        - Redesigned Navbar with a premium tech-blue/white theme and backdrop blur.
        - Implemented native Dark Mode support for the About and Studio (Dashboard) pages.
        - Enhanced code snippet rendering with language badges, premium typography, and hover effects.
    - **Localization**: 
        - Fixed language switching by moving the route to `web.php` for correct session/cookie persistence.
        - Updated `LanguageController` and `useLanguage` hook for robust locale handling.
    - **UX Fixes**: 
        - Replaced static AI brief on home page with a dynamic one from the database.
        - Fixed "warming up" message logic in `Welcome.jsx` to correctly detect empty states.
        - Resolved `Log` facade import issue in `PublicController.php`.
    - **Verification**: Performed full production build (`npm run build`) and verified all components.
    - **Deployment**: Pushed updates to production via CI/CD.
