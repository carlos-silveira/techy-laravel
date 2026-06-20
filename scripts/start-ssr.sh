#!/bin/bash
# Restart the Inertia SSR process on production

# 1. Kill any existing SSR process
echo "Killing existing SSR process..."
pkill -f "inertia:start-ssr" || true
pkill -f "ssr.mjs" || true

# Give it a second to clean up
sleep 2

# 2. Start the new process in the background using nohup
echo "Starting SSR process..."
nohup php artisan inertia:start-ssr > storage/logs/ssr.log 2>&1 &

echo "SSR process restarted!"
