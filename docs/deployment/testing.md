# Testing & QA

Quality Assurance is a critical component of the TechyNews development lifecycle. All code changes must be verified before deployment.

## Test Suites

### 1. Backend Testing (PHPUnit)
We use PHPUnit for testing Laravel controllers, services, and models.
- **Run Tests:** `php artisan test`
- **Focus:** Ensure API endpoints return expected data, database interactions are correct, and AI services handle edge cases gracefully.

### 2. Frontend Testing (Jest / React Testing Library)
React components and utility functions are tested using Jest and React Testing Library.
- **Run Tests:** `npm test` or `npm run test`
- **Focus:** Component rendering, state management, and user interactions.

### 3. End-to-End Testing (Playwright / Cypress)
E2E testing is employed to simulate real user journeys.
- **Run Tests:** `npx playwright test` (or `npm run test:e2e` for Cypress).
- **Focus:** Complete workflows, such as navigating the site, reading an article, and toggling themes.

## The QA Process

Before any code is pushed to production, the developer or AI agent must follow these steps:
1. Ensure the local build succeeds (`npm run build`).
2. Run the full test suite (Backend, Frontend, E2E).
3. Conduct a manual smoke test if the change impacts critical UI components.
4. Only if all checks pass, generate a Pull Request or push to the `main` branch.
