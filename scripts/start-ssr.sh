#!/bin/bash
# Restart the Inertia SSR process on production

PHP_BIN=${1:-php}

# 1. Kill any existing SSR process
echo "Killing existing SSR process..."
pkill -f "inertia:start-ssr" || true
pkill -f "ssr.mjs" || true

# Add Node.js to PATH. Use Node 18 or 20 to avoid Undici Wasm memory crashes on cPanel
if [ -d "/opt/alt/alt-nodejs18/root/usr/bin" ]; then
    export PATH=/opt/alt/alt-nodejs18/root/usr/bin:$PATH
elif [ -d "/opt/alt/alt-nodejs20/root/usr/bin" ]; then
    export PATH=/opt/alt/alt-nodejs20/root/usr/bin:$PATH
else
    export PATH=/opt/alt/alt-nodejs22/root/usr/bin:$PATH
fi

# Give it a second to clean up
sleep 2

# 2. Start the new process in the background using nohup
echo "Starting SSR process using PHP: $PHP_BIN"
nohup $PHP_BIN artisan inertia:start-ssr > storage/logs/ssr.log 2>&1 &

echo "SSR process restarted!"
