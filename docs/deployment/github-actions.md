# CI/CD with GitHub Actions

TechyNews uses GitHub Actions for continuous integration and deployment. The pipeline is designed to ensure that only tested, verified code reaches the production server.

## Deployment Workflow (`deploy.yml`)

The primary workflow is triggered on pushes to the `main` branch. It consists of a single optimized job that builds, tests, and deploys the application:

1. **Security Audit:** Scans the codebase for hardcoded secrets before proceeding.
2. **Setup Environment:** Sets up PHP 8.3 and Node.js 22, matching the production environment.
3. **Install & Build:** Uses GitHub Actions caching for both Composer and NPM. Runs `composer install` and `npm run build`.
4. **Prepare Test Environment:** Sets up a lightning-fast local testing environment using SQLite (`database/database.sqlite`).
5. **E2E Smoke Tests:** Starts the built application via `php artisan serve` and runs Cypress E2E tests (`cypress/e2e/smoke.cy.js`) against it.
6. **Package Release:** Only if all tests pass, the action zips the essential production files (excluding `node_modules`, test databases, and logs) into `deploy.zip`.
7. **Deploy via Secure Webhook:** The ZIP file is sent via an HTTPS POST request to the production server webhook (`https://techynews.lat/_m/ci-cd`). The webhook handles extracting the ZIP and deploying the update.
8. **Health & Asset Integrity Checks:** After deployment, the pipeline curls several critical URLs to ensure they return HTTP 200, and verifies that the critical JS chunks referenced in `manifest.json` were actually uploaded.
9. **Auto-Rollback:** If any step fails during or after the deployment process, the action triggers a rollback webhook (`https://techynews.lat/_m/rollback`) to restore the previous working version.

## Secrets Management

The deployment action requires the following GitHub repository secrets:
- `TECHY_DEPLOY_TOKEN`: The secure token used to authenticate the webhook POST request on the production server.

## Rollbacks

The pipeline includes an automatic fallback mechanism. If the deployment webhook or subsequent health checks fail, it automatically sends a rollback command to the server. You can also trigger this manually if needed, or push a git revert to the `main` branch.
