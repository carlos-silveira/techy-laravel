#!/bin/bash
# Restart the Inertia SSR process on production

PHP_BIN=${1:-php}

# 1. Kill any existing SSR process
echo "Killing existing SSR process..."
pkill -f "inertia:start-ssr" || true
pkill -f "ssr.mjs" || true

# Add Node.js to PATH. Use Node 20
export PATH=/opt/alt/alt-nodejs20/root/usr/bin:$PATH

# Give it a second to clean up
sleep 2

# 2. Start the new process in the background using nohup
echo "Starting SSR process..."
nohup node bootstrap/ssr/ssr.mjs > storage/logs/ssr.log 2>&1 &

echo "SSR process restarted!"
