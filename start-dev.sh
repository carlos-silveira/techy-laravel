#!/bin/bash

# Development startup script for Laravel with Xdebug and npm watch

echo "🚀 Starting Laravel development environment..."

# Kill any existing processes
echo "🛑 Stopping existing processes..."
pkill -f "php artisan serve" 2>/dev/null
pkill -f "npm run watch" 2>/dev/null
pkill -f "npm run dev" 2>/dev/null

# Start Laravel server with Xdebug configuration
echo "🔧 Starting Laravel server with Xdebug..."
php -dxdebug.mode=debug \
   -dxdebug.start_with_request=yes \
   -dxdebug.client_host=127.0.0.1 \
   -dxdebug.client_port=9003 \
   -dxdebug.log=/tmp/xdebug.log \
   artisan serve &

LARAVEL_PID=$!

# Start npm watch for frontend
echo "🎨 Starting npm watch for frontend..."
npm run watch &

NPM_PID=$!

echo "✅ Development environment started!"
echo "📱 Laravel server: http://localhost:8000"
echo "🔍 Xdebug configured on port 9003"
echo "🎨 Frontend watching for changes..."
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for both processes
wait $LARAVEL_PID $NPM_PID 