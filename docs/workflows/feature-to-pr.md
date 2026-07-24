# Feature to PR Workflow

When an AI Agent or developer is tasked with adding a new feature to TechyNews, they must follow this rigorous standard operating procedure to maintain codebase stability.

## Phase 1: Planning
1. **Understand Context:** Read the relevant Model and Service documentation.
2. **Design Document:** Create a markdown file in `ai-specs/changes/FEATURE-NAME.md` outlining the proposed database migrations, controller changes, and React component updates.
3. **Approval:** Await user/senior developer approval on the plan.

## Phase 2: Implementation (Isolated)
1. **Branching:** Work MUST be done on a separate git branch (or a shared worktree for agents). NEVER commit directly to `main`.
2. **Backend First:** Create migrations (`php artisan make:migration`), models, and controllers. Run `php artisan test` continuously.
3. **Frontend Integration:** Update Inertia views and components. Ensure Tailwind classes adhere to the `Theme System` rules (always include `dark:` variants).

## Phase 3: QA & Verification
1. **Build Step:** You MUST run `npm run build` and ensure it completes with 0 errors. A Vite compilation failure means the PR is invalid.
2. **E2E Testing:** Run `npx playwright test`. 
3. **Linting:** Ensure PHP follows PSR-12 and React follows standard ESLint rules.

## Phase 4: Pull Request
1. Use the `techy-pr-builder` skill (if operating as an agent) to generate a standardized PR description.
2. Include screenshots of any UI changes.
3. Submit the PR for review. Merging to `main` will automatically trigger the GitHub Actions deployment pipeline.
