# AI Agents & Workflows

TechyNews development is deeply integrated with autonomous AI agents. These agents follow strict rules and workflows defined in the `.agents` directory to maintain codebase stability, UI consistency, and engineering standards.

## Mandatory Senior Engineering Workflow

All AI agents working on this repository must adhere to a strict 3-phase workflow for every task involving code changes:

### Phase 1: Analysis / Investigation
- Understand the root cause before writing code.
- Trace data flow end-to-end and check server logs.
- Identify all affected files and endpoints.
- **Worktree Isolation:** Always use a branched or shared workspace (`git worktree add`) to isolate changes. Never work directly on the main branch.

### Phase 2: Implementation + Testing / QA
- Implement fixes or features in focused chunks.
- **Backend:** Run `php artisan test` and verify endpoint responses.
- **Frontend:** Run `npm run build` to ensure zero compilation errors.
- **E2E Tests:** Execute Playwright tests (`npx playwright test`).
- **Integration:** Verify the live endpoint works locally.
- *Rule:* If any test fails, do not deploy. Fix the issue first.

### Phase 3: Deploy + Verify
- Deploy only after all tests in Phase 2 pass.
- Generate PR descriptions using the internal `techy-pr-builder` skill.
- Run a smoke test on production post-deploy.

## Error Handling Philosophy

**Fail Fast — No Silent Error Swallowing**
- All backend errors must be logged via `Log::error()` with context.
- Frontend errors must display meaningful feedback (e.g., `toast.error()`) rather than generic messages, while logging the real cause.

## Standardized Workflows

Agents refer to specific markdown files in `.agents/workflows/` for common tasks:
- **`/generate-news`**: Steps to generate a new AI-powered article.
- **`/deploy`**: Procedures for pushing changes to the production server via rsync and SSH.
- **`/fix-content`**: Instructions on how article content is stored, rendered, and how to fix encoding issues.
- **`/feature-to-pr`**: The process of taking a feature from implementation to a Pull Request.

## AI Activity Documentation

Agents are required to document all significant actions in `docs/AI_ACTIVITY.md`. This maintains a clear audit trail of AI-driven changes, detailing what was modified, why, what tests were run, and the results.
