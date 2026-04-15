#!/bin/sh
set -e

gh pr create \
  --title "fix(locale,rag,e2e): Spanish locale cache poisoning, RAG JSON bug, Cypress test suite" \
  --body "## Summary

Fixes two critical production regressions and adds a Cypress E2E test suite to prevent future regressions.

## Bug 1: Spanish Locale Shows English Content

**Root cause:** PublicController cached the English fallback under the 'es' cache key for 3600s. Once cached, translated content never appeared.

**Fix:**
- PublicController: New rememberLocaleAware() uses a 30s TTL when translations are missing, so the page self-heals after background jobs complete.
- LanguageController: Flushes all locale-specific caches when the user switches language.
- translateIfNecessary(): Now checks for both title AND content before applying translation.

Files: app/Http/Controllers/PublicController.php, app/Http/Controllers/LanguageController.php

## Bug 2: RAG Copilot Returns Raw JSON

**Root cause:** When embedText() returned empty (API failure), ChatController returned JSON. The frontend read it as stream text, displaying the raw JSON literally.

**Fix:**
- ChatController: Added keyword-based fallback when embedding fails (LIKE query on title/summary).
- ChatController: Error paths now stream plain text instead of returning JSON.
- RagCopilot.jsx: Updated Accept header and improved error handling.

Files: app/Http/Controllers/ChatController.php, resources/js/Components/RagCopilot.jsx

## New: Cypress E2E Test Suite

Tests target the local Docker staging mirror at http://localhost:8080.

- cypress/e2e/locale.cy.js: 5 tests for language switching
- cypress/e2e/rag-copilot.cy.js: 7 tests for backend API and UI widget

Run: npm run test:e2e (headless) or npm run cypress:open (interactive)

## QA
- npm run build passes (4.84s)
- No new production PHP dependencies
" \
  --head fix/locale-rag-cypress

gh pr merge --merge --delete-branch fix/locale-rag-cypress
