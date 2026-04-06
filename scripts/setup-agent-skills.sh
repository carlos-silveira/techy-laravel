#!/bin/bash
# Description: Automated setup script for techy-laravel to pull top AI Agent Skills into .gemini/skills/

SKILLS_DIR="./.gemini/skills"
mkdir -p "$SKILLS_DIR"
cd "$SKILLS_DIR" || exit

echo "🚀 Installing Top Agent Skills into $SKILLS_DIR..."

# 1. Official Anthropic Skills (Using sparse-checkout to avoid downloading the entire repo multiple times)
echo "📦 Fetching Official Skills..."
if [ ! -d "anthropic-skills-repo" ]; then
    git clone --filter=blob:none --no-checkout https://github.com/anthropics/skills.git anthropic-skills-repo
    cd anthropic-skills-repo || exit
    git sparse-checkout init --cone
    # Adding the specific official skills we want
    git sparse-checkout set skills/pdf skills/docx skills/pptx skills/xlsx skills/doc-coauthoring skills/frontend-design skills/canvas-design skills/algorithmic-art skills/theme-factory skills/web-artifacts-builder skills/skill-creator skills/brand-guidelines
    git checkout main
    
    # Move them to the root skills dir
    echo "Moving official skills to .gemini/skills/"
    cp -r skills/* ../
    cd ..
    # Clean up the bare clone
    rm -rf anthropic-skills-repo
else
    echo "Official skills already fetched."
fi

# 2. Community Skills (Direct clones)
echo "📦 Fetching Community Skills..."

# Superpowers & Systematic Debugging
if [ ! -d "superpowers" ]; then
    git clone https://github.com/obra/superpowers.git superpowers
fi

# File Search (Massgen)
if [ ! -d "massgen" ]; then
    git clone https://github.com/massgen/massgen.git massgen
fi

# Context Optimization
if [ ! -d "agent-skills-for-context-engineering" ]; then
    git clone https://github.com/muratcankoylan/agent-skills-for-context-engineering.git agent-skills-for-context-engineering
fi

# Marketing Skills by Corey Haines
if [ ! -d "marketingskills" ]; then
    git clone https://github.com/coreyhaines31/marketingskills.git marketingskills
fi

# AI SEO
if [ ! -d "claude-seo" ]; then
    git clone https://github.com/AgriciDaniel/claude-seo.git claude-seo
fi

# NotebookLM Integration
if [ ! -d "notebooklm-skill" ]; then
    git clone https://github.com/PleasePrompto/notebooklm-skill.git notebooklm-skill
fi

# Obsidian Skills
if [ ! -d "obsidian-skills" ]; then
    git clone https://github.com/kepano/obsidian-skills.git obsidian-skills
fi

# Excel MCP Server
if [ ! -d "excel-mcp-server" ]; then
    git clone https://github.com/haris-musa/excel-mcp-server.git excel-mcp-server
fi

# Remotion Best Practices
echo "💡 Remotion best practices skill is highly dependent on project initialization, skipped deep clone."

echo "🔄 Adapting prompts for Gemini..."
# Find all markdown files and replace Claude with Gemini in macOS compatible sed pattern
find . -type f -name "*.md" -exec sed -i '' 's/Claude/Gemini/g' {} +
find . -type f -name "*.md" -exec sed -i '' 's/Anthropic/Google/g' {} +

echo "✅ All required skills have been successfully fetched and adapted into $SKILLS_DIR!"
echo "✨ Your Gemini agent is now ready to use these skills!"
