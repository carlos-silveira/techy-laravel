# TechyNews — Codex Agent Guide

This file is the repository-level instruction entry point for Codex and other
coding agents. The detailed team policy lives in `.agents/AGENTS.md`; follow
both documents. If they conflict, the more specific instruction wins.

## Project context

- TechyNews is an AI-powered news platform built with Laravel 13, PHP 8.3,
  React 18, Inertia, Vite, TailwindCSS, and Framer Motion.
- Read `GEMINI.md` for the project architecture, legacy Antigravity workflow,
  and operational constraints.
- Start with the relevant VitePress documentation in `docs/` before inspecting
  large source files. Keep documentation current when a feature changes.

## Required workflow for code changes

1. Investigate the affected data flow, routes, controllers, UI, and logs.
2. For frontend changes, use the `techy-design-language` skill. For E2E QA,
   use the `techy-playwright-qa` skill.
3. Implement focused, reviewable changes. Do not alter unrelated dirty files.
4. Verify proportionally before handing off:
   - Backend: `php artisan test` and exercise the affected endpoint.
   - Frontend: `npm run build`.
   - UI/E2E: `npx playwright test`.
5. Update the relevant file under `docs/` and add an entry to
   `docs/AI_ACTIVITY.md` when the task is complete.

## Safety and delivery

- Do not commit, push, create a PR, deploy, change dependencies, or modify
  production configuration without explicit user approval.
- Do not modify `vendor/`, production `.env` files, or `storage/logs/`.
- Never store secrets in tracked files.
- Preserve existing user changes. Use atomic commits only after verification.
- For a feature PR, use the `techy-pr-builder` skill after all validation has
  passed.

## Content and UI constraints

- Store article content as raw HTML. Do not `json_encode()` HTML content.
- Sanitize content in the frontend before `dangerouslySetInnerHTML`.
- Keep a ten-second delay between Gemini API calls.
- Ensure mobile layouts and rendered Markdown tables cannot overflow.
- PWA icons must have a solid, non-transparent background.

## Useful project references

- Detailed policy: `.agents/AGENTS.md`
- Feature workflow: `.agents/workflows/feature-to-pr.md`
- Deployment workflow: `.agents/workflows/deploy.md`
- News workflow: `.agents/workflows/generate-news.md`
- Content repair workflow: `.agents/workflows/fix-content.md`
