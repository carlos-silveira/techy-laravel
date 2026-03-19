# Techy News — Comprehensive Project Guide

Welcome to the internal documentation for **Techy News**. This guide provides a full overview of the codebase, project structure, and operational procedures.

## 🏗 Technology Stack

### Backend
- **Laravel 13**: Modern PHP framework for rapid, secure development.
- **Eloquent ORM**: Fluent database interactions.
- **MySQL**: Persistent data storage for articles, subscribers, and analytics.
- **Inertia.js**: The "glue" that allows us to build a single-page app experience using classic server-side routing.

### Frontend
- **React 18**: Component-based UI library.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI building.
- **Framer Motion**: industry-standard animation library for React.
- **Lucide React**: Clean and consistent icon set.

### AI & Services
- **Gemini 2.0 Flash**: State-of-the-art LLM from Google for article synthesis and translation.
- **NewsService**: Aggregates data from global RSS feeds.

## 📂 Project Structure

- `app/`: The core PHP logic.
    - `Http/Controllers/`: Request handling and response coordination.
    - `Services/`: Business logic (Gemini integration, RSS parsing).
    - `Models/`: Database schema definitions.
- `resources/js/`: The React frontend.
    - `Pages/`: High-level page components (Welcome, ArticleShow, Archive).
    - `Components/`: Reusable UI elements (Navbar, LanguageSwitcher).
    - `Hooks/`: Custom React hooks (useLanguage).
- `docs/`: Comprehensive project documentation.
- `database/migrations/`: Database schema versioning.

## ⚙️ Core Workflows

### 1. The Content Lifecycle
Articles are generated through a semi-automated pipeline:
1. RSS feeds are fetched via `NewsService`.
2. Gemini analyzes headlines and suggests editorial ideas.
3. A draft is generated in raw HTML and saved to the database.
4. On first request in a new language, the translation engine kicks in.

### 2. Multi-language Support
We support **English (en)**, **Spanish (es)**, and **Portuguese (pt)**.
- Translations are handled via `es.json`, `pt.json`, etc.
- Database articles have a `translations` JSON column for content-specific overrides.

### 3. Frontend Theme System
- The project supports **Light** and **Dark** modes.
- Theme state is managed via a dedicated component (`ThemeToggle.jsx`) and persisted in `localStorage`.
- We use Tailwind's `dark:` modifier extensively.

## 🛠 Maintenance & Development

### Local Development
1. Run `php artisan serve` for the backend.
2. Run `npm run dev` for the frontend.
3. Access the dashboard at `/dashboard` to manage articles.

### Deployment
- Every push to `main` triggers a GitHub Action.
- The action builds assets and deploys via `rsync` to the production server.

## 📋 Best Practices
- **Content Security**: Always use `sanitizeContent()` before rendering raw HTML from the database.
- **Performance**: Use Laravel's `Cache` facade for any expensive AI or database operations.
- **Translations**: Always wrap user-facing strings in the `__()` helper.
