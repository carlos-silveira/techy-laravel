#!/bin/bash
set -e

echo "🛡️ Starting Internal Security Hardening Cycle..."

# 1. Update Composer Dependencies
echo "🐘 Updating PHP Dependencies (Composer)..."
composer update --no-interaction --prefer-dist

# 2. Modernize NPM & Audit Fix
echo "📦 Patching Node.js Vulnerabilities (NPM)..."
npm install --package-lock-only && npm audit fix --force

# 3. Final Build Check
echo "🏗️ Verifying Build Integrity..."
npm run build

echo "✅ Internal Security Hardening Complete!"
