# TechyNews Workspace Rules

The following rules apply to all AI agents working within this repository. Agents MUST strictly adhere to these guidelines to maintain stability and UI consistency.

## Mandatory Senior Engineering Workflow (EVERY PROMPT)
- **Rule**: On EVERY prompt that involves code changes, the agent MUST follow this 3-phase workflow. No exceptions. No shortcuts.
- **Phase 1 — Analysis / Investigation**:
  - Understand the root cause BEFORE writing any code.
  - Read relevant source files, check server logs, trace the data flow end-to-end.
  - Identify ALL affected files and endpoints.
  - **Worktree Isolation**: If starting a new task, you MUST use `Workspace: "share"` (or `git worktree add`) to isolate your changes. NEVER work directly on the main branch.
- **Phase 2 — Implementation + Testing / QA / Code Review**:
  - Implement the fix or feature in chunks of at most 2 hours.
  - **Backend changes**: Run `php artisan test` and verify the endpoint returns the expected response.
  - **Frontend / E2E changes**: Run `npm run build`. You MUST run `npx playwright test` and ensure 0 errors. If tests fail, fix the code or the tests until they pass.
  - **Integration**: After deploying, verify the live endpoint actually works.
  - If ANY test fails, DO NOT deploy. Fix the issue first.
- **Phase 3 — Deploy + Verify**:
  - Only deploy after Phase 2 passes.
  - Generate the PR using the `techy-pr-builder` skill.
  - After deploy, run a smoke test on production.
  - Report the test results to the user.
- **Enforcement**: NEVER commit, push, or deploy code that has not been verified. Breaking this rule is unacceptable.

## Fail Fast — No Silent Error Swallowing
- **Rule**: All errors MUST be logged via `Log::error()` with actionable context (endpoint, input, stack trace). Never catch exceptions silently.
- **Frontend**: Always show the user a meaningful error via `toast.error()`. Never show generic messages like "Something went wrong" without logging the real cause.
- **API Keys / External Services**: Before deploying any code that uses an external API, verify the API key is valid by making a test request. If the key is invalid, report it immediately.

## Guardrails — Do Not Touch
- **NEVER** modify files in `vendor/`, `.env` on production without explicit user approval, or `storage/logs/`.
- **NEVER** add new Composer or NPM dependencies without checking with the user first.
- **NEVER** run destructive database operations (DROP, TRUNCATE, DELETE without WHERE) without explicit confirmation.
- **NEVER** hardcode API keys, tokens, or secrets in source code. Always use `.env` variables.

## Code Quality Standards
- **Single Responsibility**: Each method does ONE thing. If a method exceeds 40 lines, refactor into smaller private helpers.
- **Explicit over Implicit**: Use type hints on all PHP method parameters and return types. Use TypeScript-style JSDoc for complex React props.
- **Early Returns**: Prefer `if (!$condition) return;` over deeply nested if/else blocks.
- **No Magic Strings**: Use constants or enums for repeated string values (status codes, config keys, etc.).
- **DRY but Readable**: Extract shared logic into services/helpers, but don't over-abstract. Readability beats cleverness.

## Error Handling Patterns
- **Backend**: Wrap external API calls in try/catch. Log the error with context. Return a structured JSON error response with an appropriate HTTP status code.
- **Frontend**: Use `axios` interceptors or per-request catch blocks. Show `toast.error(specificMessage)`. Never silently fail.
- **Fallback Chain**: Gemini API → OpenRouter → graceful error message. Never let a single API failure crash the entire feature.

## Deployment Checklist (Before Every Push)
1. `npm run build` — Zero errors, zero warnings
2. `php artisan test` — All tests pass (when applicable)
3. `npx playwright test` — 100% E2E tests passing.
4. `git diff --stat` — Review what files changed
5. `rsync` to production → `php artisan optimize:clear`
6. Smoke test: `curl` the affected endpoints on production
7. Check `storage/logs/laravel.log` for new errors
8. Report results to user

## Mobile Responsive UI & Markdown Tables
- **Rule**: When building UI components that render Markdown, or when designing for mobile, extra care must be taken to prevent layout overflows.
- **Implementation**: Always wrap `<ReactMarkdown>` tables in `overflow-x-auto` to prevent flex containers from breaking on mobile viewports. Ensure all chat or floating UI elements use `calc(100vw - ...)` or safe max-widths so they don't cause horizontal scrolling on mobile.

## iOS PWA Icons
- **Rule**: When generating or modifying PWA icons (`apple-touch-icon.png`), never use transparent backgrounds.
- **Reasoning**: Apple iOS does not support transparency in home screen icons and will fill it with solid black. Always ensure a solid background color matching the app's theme.

## Dependency Management & PHP Versioning
- **Rule**: When updating or installing Composer packages, ensure `config.platform.php` in `composer.json` strictly matches the actual server runtime (PHP 8.3).
- **Enforcement**: This prevents Composer from pulling package versions that rely on unsupported newer syntax (like PHP 8.4 property hooks) which will crash the application during `package:discover`.

## Content Pipeline Integrity
- **NEVER** use `json_encode()` on HTML content strings before storing in DB.
- **ALWAYS** store article content as raw HTML in the `content` column.
- **ALWAYS** use `sanitizeContent()` on the frontend before `dangerouslySetInnerHTML`.
- **ALWAYS** add a 10-second delay between consecutive Gemini API calls to avoid rate limiting.

## AI Activity Documentation
- **ALWAYS** document AI agent activity in `docs/AI_ACTIVITY.md` after completing a task.
- Include: what was changed, why, what was tested, and the result.
