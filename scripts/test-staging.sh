export PATH=$PATH:/Applications/Docker.app/Contents/Resources/bin

echo "🐳 Building Staging Mirror (Port 8888)..."
docker compose -f docker-compose.staging.yml up -d --build

echo "🐘 Preparing Staging Environment..."
# Wait for MySQL to be ready
sleep 15

docker exec staging-app git config --global --add safe.directory /var/www/html
docker exec staging-app /usr/bin/composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev --ignore-platform-reqs

# Ensure .env exists and has an APP_KEY placeholder
docker exec staging-app cp .env.example .env
docker exec staging-app php artisan key:generate --force
docker exec staging-app php artisan migrate --force

echo "🔍 Running Health Checks..."
# More robust health check logic
HP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8888/)
if [ "$HP_STATUS" == "200" ]; then
    echo "✅ Home Page: OK (200)"
else
    echo "❌ Home Page: FAIL ($HP_STATUS)"
fi

API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8888/api/search?q=AI)
if [ "$API_STATUS" == "200" ]; then
    echo "✅ API Search: OK (200)"
else
    echo "❌ API Search: FAIL ($API_STATUS)"
fi

echo ""
echo "✨ Staging Mirror is running at http://localhost:8888"
echo "To stop: docker compose -f docker-compose.staging.yml down"
