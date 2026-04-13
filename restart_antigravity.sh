#!/bin/bash
echo "🛑 Closing Antigravity..."
killall "Antigravity" 2>/dev/null || true
sleep 2
echo "🚀 Starting Antigravity with Remote Debugging (Port 9222)..."
/Applications/Antigravity.app/Contents/MacOS/Electron --remote-debugging-port=9222 &
echo "✅ Restarted. Please refresh your phone browser at http://192.168.1.13:3000"
