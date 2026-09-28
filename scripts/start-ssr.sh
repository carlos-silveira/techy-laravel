#!/bin/bash
# Restart the Inertia SSR process on production

PHP_BIN=${1:-php}

# 1. Kill any existing SSR process
echo "Killing existing SSR process..."
pkill -f "inertia:start-ssr" || true
pkill -f "ssr.mjs" || true

# Add Node.js to PATH. Use Node 16 to avoid Wasm memory crashes on cPanel
export PATH=/opt/alt/alt-nodejs16/root/usr/bin:$PATH

# Give it a second to clean up
sleep 2

# Stub out Node 18's os.availableParallelism which Inertia uses, so Node 16 can run it
sed -i 's/import { availableParallelism } from "node:os";/const availableParallelism = () => 1;/g' bootstrap/ssr/ssr.mjs
sed -i 's/import { availableParallelism as .* } from "node:os";/const availableParallelism = () => 1;/g' bootstrap/ssr/ssr.mjs

# 2. Start the new process in the background using nohup
echo "Starting SSR process..."
nohup node bootstrap/ssr/ssr.mjs > storage/logs/ssr.log 2>&1 &

echo "SSR process restarted!"
