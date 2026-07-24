# System Design Document (SDD) — Techy News

## 1. Overview
Techy News is an AI-native Content Management System (CMS) and news aggregator designed for high-performance developer journalism. It automates the entire content lifecycle: from raw RSS signal ingestion to multi-lingual, deeply researched technical long-form articles.

## 2. Core Architecture

### 2.1 Backend (Laravel 13)
The backend serves as the orchestration layer for AI services and data persistence.
- **Service Layer Pattern**: All business logic is encapsulated in `app/Services`.
    - `NewsService`: RSS aggregation and preprocessing.
    - `GeminiService`: Core LLM orchestration (Drafting, Metadata, Translation).
- **Inertia.js**: Bridges the gap between Laravel and React without the overhead of a client-side router (SPA) or a decoupled API.
- **Database Architecture**: MySQL 8.0+.
    - `Article` model: Stores raw HTML in the `content` column to maximize rendering speed.
    - `translations`: A JSON column storing locale-specific overrides for title, summary, and content.

### 2.2 Frontend (React 18 + Vite)
- **Styling**: Tailwind CSS + Custom Utility classes.
- **Interactions**: Framer Motion for sophisticated, hardware-accelerated animations.
- **Components**: Functional React components with a focus on atomic design principles.
- **Rich Text Rendering**:
    - Articles use a custom `TipTapRenderer` to parse ProseMirror-like JSON structures into semantic HTML.
    - Syntax highlighting is handled via `Prism.js` with dynamic language loading.
    - Mermaid.js is integrated for dynamic technical diagrams.

## 3. The Intelligence Pipeline

### 3.1 Signal Ingestion
The system periodically polls high-signal tech RSS feeds (TechCrunch, Hacker News, The Verge). These are aggregated and deduplicated.

### 3.2 Automated Synthesis
When a "Synthesis" event is triggered:
1. **Idea Generation**: Gemini analyzes headlines to find unique editorial angles.
2. **Drafting**: The AI generates a 1500-2000 word investigative piece using a "Blueprint Prompting" technique.
3. **Metadata Generation**: SEO tags, summaries, and reading times are generated in a post-processing pass.

### 3.3 The Translation Engine
A recursive unwrapping strategy is used to handle AI-generated content.
- **Recursive Decoding**: AI models occasionally return JSON-encoded strings (e.g., `"<h2>Title</h2>"`). The backend recursively decodes these until raw HTML is extracted.
- **Heuristic Cleanup**: Strips unnecessary slashes and wrapping quotes to ensure DB-ready HTML.

## 4. Performance & Optimization

### 4.1 Caching Strategy
- **Layered Cache**: 
    - Homepage Grid: 1 hour.
    - Daily AI Brief: 24 hours.
    - Article Views: 1 hour (per locale).
- **Pre-translation**: When an article is requested in one language, the system opportunistically translates and caches it in mandatory locales (EN, ES) to reduce future latency.

### 4.2 Asset Pipeline
- **Vite 6**: Optimized bundling with automatic code splitting for Inertia pages.
- **CDN Strategy**: Heavy libraries like Prism.js and Mermaid.js are loaded via high-availability CDNs to keep initial bundle sizes minimal.

## 5. Security & Stability
- **CSRF Protection**: Native Laravel middleware via Inertia.
- **Rate Limiting**: Integrated 10s back-off for Gemini API calls to prevent 429 errors.
- **Environment Isolation**: Production deployments via GitHub Actions ensure a clean build and automated test suite execution.
