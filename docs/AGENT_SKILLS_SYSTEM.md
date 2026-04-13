# Engineering Knowledge: AI Agent Skills & Deployment Hardening

This document provides a detailed breakdown of the AI Agent capabilities integrated into the `techy-laravel` project and the security considerations for maintaining a public repository.

## 1. Agent Skills Architecture

We have implemented a dual-layered AI capability system:

### A. Core Skills (`.gemini/skills/`)
These are high-level instructions that help Gemini agents understand complex workflows.
- **Global Skills**: Sourced via `scripts/setup-agent-skills.sh` from top community repositories. They provide general-purpose capabilities (SEO, Systematic Debugging, Canvas Design).
- **Project Skill (`techy-laravel-engineer`)**: A bespoke skill created to enforce this project's specific "Gold Standards." It ensures agents respect:
    - HTML-only content storage.
    - Strict PHP 8.x typing.
    - Anti-Slop journalistic tone.
    - UI constraints (Headline length, Glassmorphism styles).

### B. MCP Servers (`.gemini/mcp_servers_config.json`)
Allows agents to securely connect to external tools like Tavily (for real-world news search), Stash (for context), and internal workspace tools.

## 2. Deployment Health Verification

The `.github/workflows/deploy.yml` has been hardened with a post-deployment health check. 
- **Endpoint checked**: `/api/search?q=AI`
- **Purpose**: Verifies that the Vector RAG (Retrieval Augmented Generation) system is live. Since the site relies on AI-powered discovery, this check prevents deployments that break the core search capability.

## 3. Security & Public Repository Safety

> [!IMPORTANT]
> Since `techy-laravel` is a **public repository**, we must adhere to strict credential hygiene.

### Recommended Security Fixes:
1. **Deployment Token**: The `X-Deploy-Token` is currently hardcoded in `deploy.yml`. 
    - **Risk**: Anyone viewing the public repo can find the secret and potentially trigger deployment hooks.
    - **Action**: Move `PURGED_SECRET` to a GitHub Repository Secret named `TECHY_DEPLOY_TOKEN` and update the workflow to user `${{ secrets.TECHY_DEPLOY_TOKEN }}`.
2. **MCP Keys**: The `mcp_servers_config.json` uses placeholders (`YOUR_TAVILY_API_KEY_HERE`). 
    - **Instruction**: Never commit actual keys to this file. Local developers should use a separate `.env` or local-only config.
3. **Internal Tools**: The `/_m/ci-cd` endpoint is a frequent target for sniffers. It is properly excluded from CSRF and uses a header-based secret gate.

## 4. Maintenance Workflow

To keep the agent skills up to date without bloating the repo:
1. The `.gemini/skills/` directory IS ignored by git except for the `.gitkeep` and `techy-laravel/` subdirectory.
2. Run `bash scripts/setup-agent-skills.sh` locally to refresh community skills.
3. Update `AI_ACTIVITY.md` after every major implementation to maintain the persistent "Brain" of the project.
