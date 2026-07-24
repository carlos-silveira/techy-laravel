# CI/CD with GitHub Actions

TechyNews uses GitHub Actions for continuous integration and deployment. The pipeline is designed to ensure that only tested, verified code reaches the production server.

## Deployment Workflow

The primary workflow is triggered on pushes to the `main` branch.

1. **Checkout Code:** The action checks out the latest commit.
2. **Setup Environment:** Sets up PHP, Composer, Node.js, and npm.
3. **Install Dependencies:** Runs `composer install` and `npm ci`.
4. **Build Assets:** Executes `npm run build` to compile the Vite frontend assets (including SSR bundles if applicable).
5. **Run Tests:** Runs the automated test suite (PHPUnit, Jest).
6. **Deploy via Rsync:** If all tests pass, the compiled assets and codebase are securely deployed to the production cPanel server using `rsync` over SSH.
7. **Post-Deploy Hooks:** Clears the Laravel cache (`php artisan optimize:clear`) on the production server.

## Secrets Management

The deployment action requires several GitHub repository secrets:
- `SSH_PRIVATE_KEY`: For secure access to the production server.
- `SERVER_USER`: The cPanel username.
- `SERVER_IP`: The production server IP address.
- `SERVER_PORT`: Custom SSH port (e.g., 21098).

## Rollbacks

Because deployments are atomic (and rely on version control), rolling back involves reverting the problematic commit on the `main` branch and pushing, which triggers a new, stable build and deployment.
