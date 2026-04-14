#!/bin/bash
set -e

echo "🚀 Starting Local Validation Cycle..."

# Consolidated Validation (Single Docker Session for speed & persistence)
echo "📦 Running Full Validation Suite inside Docker..."
docker-compose run --rm app sh -c "
    echo '--- Installing NPM Dependencies ---' && \
    npm install --no-audit --no-fund --legacy-peer-deps && \
    echo '--- Running NPM Build ---' && \
    npm run build && \
    echo '--- Checking PHP Syntax ---' && \
    find app config routes -name \"*.php\" -print0 | xargs -0 -n1 php -l
"

echo "✅ Validation Successful! Ready for PR."
