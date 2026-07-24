---
name: techy-pr-builder
description: Generates a PR description enforcing the TechyNews Ticket-to-PR structure.
---

# Techy-PR-Builder Skill

Whenever you are asked to finalize a feature or prepare a Pull Request, use this exact template for the PR description. Do not deviate.

```markdown
## 📝 Description
**Problem:** ...
**Solution:** ...

## 🔍 QA
**🚀 Feature Area:** | **⚙️ Environment:**
**ℹ️ Impact Description:** 
- (bullets explaining what was modified)

## 🧪 Test Cases to Validate
**Case 1: title** — Input: ... / Expected: ...

## ⚠️ Additional Changes
- [ ] DB changes required (inline SQL if yes)

## 📸 Evidence
(Raw CLI output of `npx playwright test` AND `php artisan test` demonstrating 0 errors)

## 📚 Useful Information
**📖 Documentation:** | **📌 Reference:** 
```

### Rules:
- The title of the PR must follow: `feat(scope): Short description` or `fix(scope): Short description`
- Never write the PR description manually; always follow this markdown structure with the Emojis.
