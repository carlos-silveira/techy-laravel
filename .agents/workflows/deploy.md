---
description: How to deploy the Laravel application to production (techynews.lat)
---

# Deploy to Production

The project uses GitHub Actions CI/CD. Pushing to `main` triggers automatic deployment.

## Automatic Deployment (Push to main)

### 1. Commit and push your changes
```bash
git add -A && git commit -m "your message" && git push
```

### 2. Monitor the deployment
// turbo
```bash
gh run watch
```

The pipeline will:
1. Install PHP + Composer dependencies
2. Install Node.js + build frontend (`npm run build`)
3. Validate migrations on a test DB
4. Deploy via rsync to cPanel
5. Run migrations + cache clear + article encoding fix on production
6. Health check all key pages return 200

### 3. Verify live site
Open https://techynews.lat/ in the browser

## Manual Deployment (Fix Only)

If you need to trigger without code changes:
// turbo
```bash
gh workflow run deploy.yml
```

## SSH Access
The production server uses key-based SSH:
- Host: `66.29.148.140`
- Port: `21098`
- User: `baifywfnnq`
- Path: `/home/baifywfnnq/techynews.lat/`

## Important Files
- `.github/workflows/deploy.yml` — CI/CD pipeline
- `.env` (production) — Environment variables (never committed)
