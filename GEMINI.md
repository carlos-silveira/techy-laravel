# GEMINI Configuration — TechyNews

## Project Context
This is an AI-powered tech news platform (techynews.lat) built with Laravel 13 + React/Inertia.js + Gemini API.

## Tech Stack
- **Backend**: Laravel 13, PHP 8.3, MySQL, Eloquent ORM
- **Frontend**: React 18, Inertia.js, Vite, Framer Motion, TailwindCSS
- **AI**: Google Gemini 2.0 Flash (primary), OpenRouter (fallback)
- **Deployment**: GitHub → rsync + SSH → cPanel (66.29.148.140:21098)

## Development Rules
@/Users/carlossilveira/Documents/Personal/techy-laravel/ai-specs/specs/base-standards.mdc
@/Users/carlossilveira/Documents/Personal/techy-laravel/ai-specs/specs/backend-standards.mdc
@/Users/carlossilveira/Documents/Personal/techy-laravel/ai-specs/specs/frontend-standards.mdc

## Workflows
Use the following workflows for common tasks:
- **Generate news**: Follow `.agents/workflows/generate-news.md`
- **Deploy**: Follow `.agents/workflows/deploy.md`
- **Fix content**: Follow `.agents/workflows/fix-content.md`
- **Feature to PR**: Follow `.agents/workflows/feature-to-pr.md`

## Feature Development
For new features, follow the ai-specs command workflow:
1. **Plan**: Create a plan in `ai-specs/changes/FEATURE-NAME.md`
2. **Implement**: Follow the plan step-by-step
3. **Test**: `npm run build` + `php artisan test` + verify in browser
4. **Deploy**: Push to `main` → CI/CD auto-deploys

## Senior Engineering Mindset
- **Think before you code**: Read the relevant files, understand the data flow, check server logs.
- **Test before you ship**: `npm run build` must pass. `curl` the endpoint. Check logs.
- **Verify after deploy**: Smoke test production. Report results.
- **Fix the root cause**: Don't band-aid symptoms. Trace the error to its origin.
- **One change, one commit**: Atomic commits with descriptive messages.

## Critical Rules
- **NEVER** use `json_encode()` on HTML content strings
- **ALWAYS** store article content as raw HTML
- **ALWAYS** use `sanitizeContent()` on the frontend before `dangerouslySetInnerHTML`
- **ALWAYS** add 10s delay between Gemini API calls
- **ALWAYS** run `npm run build` before pushing to verify no frontend errors
- **ALWAYS** verify API keys are valid before deploying features that depend on them
- **ALWAYS** document AI agent activity in `docs/AI_ACTIVITY.md` after completing a task
- **CRITICAL**: All changes MUST pass unit testing and/or component testing depending on what applies. DO NOT push or release unusable, broken, or untested code.
- **CRITICAL**: After every deploy, run a smoke test (`curl` endpoint, check logs) and report results.
---
