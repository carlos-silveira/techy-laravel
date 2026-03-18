# GEMINI Configuration — TechyNews

## Project Context
This is an AI-powered tech news platform (techynews.lat) built with Laravel 13 + React/Inertia.js + Gemini API.

## Development Rules
@ai-specs/specs/base-standards.mdc
@ai-specs/specs/backend-standards.mdc
@ai-specs/specs/frontend-standards.mdc

## Workflows
Use the following workflows for common tasks:
- **Generate news**: Follow `.agents/workflows/generate-news.md`
- **Deploy**: Follow `.agents/workflows/deploy.md`
- **Fix content**: Follow `.agents/workflows/fix-content.md`

## Feature Development
For new features, follow the ai-specs command workflow:
1. **Plan**: Create a plan in `ai-specs/changes/FEATURE-NAME.md`
2. **Implement**: Follow the plan step-by-step
3. **Test**: `npm run build` + verify in browser
4. **Deploy**: Push to `main` → CI/CD auto-deploys
## Critical Rules
- **NEVER** use `json_encode()` on HTML content strings
- **ALWAYS** store article content as raw HTML
- **ALWAYS** use `sanitizeContent()` on the frontend before `dangerouslySetInnerHTML`
- **ALWAYS** add 10s delay between Gemini API calls
- **ALWAYS** run `npm run build` before pushing to verify no frontend errors
- **ALWAYS** document AI agent activity in `docs/AI_ACTIVITY.md` after completing a task.
---
