---
name: techy-laravel-engineer
description: Expert guidance for developing the TechyNews platform. Use whenever generating articles, modifying backend logic (Laravel), or updating the React frontend.
---

# TechyLaravel Engineering Skill

This skill encodes the specific architectural and business rules for the `techy-laravel` project (techynews.lat).

## Core Directives

1. **Strict HTML Content**: 
   - Articles MUST be stored as raw HTML in the database.
   - NEVER use `json_encode()` on HTML strings before storing.
   - On the frontend, ALWAYS use `sanitizeContent()` before `dangerouslySetInnerHTML`.

2. **Backend Standards (Laravel)**:
   - Use strict typing (`declare(strict_types=1);`).
   - Controllers should be thin; business logic belongs in `Services` or `Actions`.
   - Use Eloquent eager loading to prevent N+1 issues.
   - Admin routes use `X-Deploy-Token` header for security.

3. **Frontend Standards (React)**:
   - Modern functional components with Hooks.
   - Glassmorphism and premium aesthetics (Harmonious colors, Inter/Outfit fonts).
   - Early returns for cleaner code.

4. **AI Generation Rules**:
   - 10-second delay between Gemini API calls to respect quotas.
   - Anti-Slop: Explicitly ban phrases like "In today's fast-paced world", "delve", "testament", etc.
   - Headlines: Maximum 60 characters to prevent UI breakage.

## Project Structure
- `app/Services/GeminiService.php`: Core LLM logic.
- `ai-specs/`: High-level feature plans.
- `.agents/workflows/`: Step-by-step guides for deployment and content fixes.
- `docs/AI_ACTIVITY.md`: Mandatory log of all agent modifications.

## Maintenance Commands
- `bash scripts/setup-agent-skills.sh`: Refresh the global AI skill set.
- `npm run build`: Must be run and verified before every push.
