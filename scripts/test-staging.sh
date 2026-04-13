#!/bin/bash

# Techy News Staging Mirror Test
# This script mirrors exactly what the GitHub Action does.

echo "🐳 Building Staging Mirror (Port 8888)..."
docker compose -f docker-compose.staging.yml up -d --build

echo "🐘 Preparing Staging Environment..."
# Wait for MySQL
sleep 12

docker exec staging-app git config --global --add safe.directory /var/www/html
docker exec staging-app /usr/bin/composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev --ignore-platform-reqs
docker exec staging-app cp .env.example .env
docker exec staging-app php artisan key:generate
docker exec staging-app php artisan migrate --force

echo "🔍 Running Health Checks..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:8888/ | grep "200" && echo "✅ Home Page: OK" || echo "❌ Home Page: FAIL"
curl -s -o /dev/null -w "%{http_code}" http://localhost:8888/api/search?q=AI | grep "200" && echo "✅ API Search: OK" || echo "❌ API Search: FAIL"

echo ""
echo "✨ Staging Mirror is running at http://localhost:8888"
echo "To stop: docker compose -f docker-compose.staging.yml down"
