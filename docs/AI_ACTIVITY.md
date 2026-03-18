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
