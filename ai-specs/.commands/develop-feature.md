---
description: Implement a planned feature for TechyNews
---

# Develop Feature

Implement a feature following an existing plan from `ai-specs/changes/`.

## Usage
```
/develop-feature @FEATURE-NAME.md
```

## Steps

1. **Read the plan** — Load `ai-specs/changes/FEATURE-NAME.md`
2. **Implement backend first** — Models → Migrations → Services → Controllers → Routes
3. **Implement frontend** — Components → Pages → API integration
4. **Run build** — `npm run build` to verify no errors
5. **Test locally** — Verify the feature works
6. **Commit** — `git add -A && git commit -m "feat: FEATURE-NAME"``
