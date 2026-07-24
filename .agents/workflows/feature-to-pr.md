# Feature to PR Workflow

This workflow is the absolute standard for introducing any feature or fix in the `techy-laravel` repository.

## 1. Branch Isolation (Git Worktrees)
All features must be developed in an isolated worktree to allow parallel AI agent tasks.
When spawning a subagent for a task, use the `Workspace: "share"` configuration in Antigravity, which handles worktree isolation automatically.

If doing it manually:
```bash
git worktree add .worktrees/<feature-name> -b <branch-name>
```

## 2. Investigation Phase
- Do NOT write code blindly.
- Read the DB schema, affected Controllers, and Inertia pages.
- Check `storage/logs/laravel.log` if fixing a bug.

## 3. Implementation (2-Hour Chunks)
- Implement logic in small, maximum 2-hour chunks.
- If a feature takes longer, split it up into sub-tasks.

## 4. Strict Testing
A feature is NOT complete until:
1. `npm run build` compiles with 0 errors.
2. `php artisan test` passes with 0 failures.
3. `npx playwright test` passes with 0 failures. (The QA Engineer skill must be applied here).

## 5. Commit & PR
- Once tests pass, atomic commits only: `feat(scope): Description` or `fix(scope): Description`.
- Invoke the `techy-pr-builder` skill to generate the PR description.
- Never push or create a PR without the user's explicit permission.
- Always prune worktrees when the PR is merged.
