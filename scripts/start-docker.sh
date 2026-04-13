#!/bin/bash

# Techy News Docker Development Starter
# This script starts the app and database, and runs Vite for hot-reloading.

echo "🚀 Starting Techy News Development Environment..."

# 1. Start Docker Containers
docker compose up -d

echo "📦 Installing dependencies and running migrations..."
# 2. Run initial setup tasks in the container
docker exec -it techy-app-dev composer install
docker exec -it techy-app-dev php artisan migrate --force

echo "⚡ Starting Vite Dev Server (Hot Reloading)..."
# 3. Launch Vite in the background
docker exec -it techy-app-dev npm run dev &

echo "✨ All systems go!"
echo "📍 Website: http://localhost:8000"
echo "📍 Database (External): localhost:33066"
echo ""
echo "Use 'docker compose logs -f' to see real-time output."
