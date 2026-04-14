#!/bin/bash
set -e

echo "🚀 Starting Local Validation Cycle..."

# Consolidated Validation (Single Docker Session for speed & persistence)
echo "📦 Running Full Validation Suite inside Docker..."
docker-compose run --rm app sh -c "
    echo '--- Installing NPM Dependencies ---' && \
    npm install && \
    echo '--- Running NPM Build ---' && \
    npm run build && \
    echo '--- Checking PHP Syntax ---' && \
    find app config routes -name \"*.php\" -print0 | xargs -0 -n1 php -l
"

# 3. Docker Environment Check (Optional, but per user request)
if [ "$1" == "--docker" ]; then
    echo "🐳 Validating inside Docker container..."
    docker-compose run --rm app npm run build
    docker-compose run --rm app php artisan optimize:clear
fi

echo "✅ Validation Successful! Ready for PR."
