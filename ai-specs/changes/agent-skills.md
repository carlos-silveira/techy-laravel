# Agent Skills Integration

## Context
Based on the X thread recommendation by @zodchiii (status/2034924354337714642), we are implementing a robust set of Top 50 Agent Skills and MCP servers to standardise agent capabilities across the `techy-laravel` project, adapting them specifically for Gemini.

## Implementation Details

1. **Automated Fetching Tool `scripts/setup-agent-skills.sh`**:
   - Downloads the top 22 AI Skills from Github and dynamically adapts their prompts from Claude to Gemini.
   - Leverages `git sparse-checkout` for the official skills repo to prevent massive, unnecessary downloads.
   - Pulls community skills directly into `/.gemini/skills`.

2. **MCP Configurations `.gemini/mcp_servers_config.json`**:
   - Template for establishing the 3 highest-rated local MCP servers:
     - `tavily`: Powerful search engine meant for Agents.
     - `context7`: Up-to-date doc injection for the context window.
     - `task-master-ai`: Interprets PRDs into structured agent tasks.

3. **Repository Cleanliness**:
   - The `/.gemini/skills/` directory is appropriately protected by `.gitignore` to ensure these tools are strictly for local AI agent enhancement and do not bloat the production repository.

## Usage
Simply run `bash scripts/setup-agent-skills.sh` to download the skills. Restart your AI CLI or refer your Gemini agent context to the `.gemini/skills` directory so it knows the newly acquired capabilities.
