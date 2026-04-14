import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        // Points to the local Docker staging mirror
        baseUrl: 'http://localhost:8080',
        specPattern: 'cypress/e2e/**/*.cy.js',
        supportFile: 'cypress/support/e2e.js',
        video: true,
        screenshotOnRunFailure: true,
        defaultCommandTimeout: 10000,
        requestTimeout: 15000,
        viewportWidth: 1280,
        viewportHeight: 800,
        env: {
            // Set these via cypress.env.json or --env flag
            ADMIN_EMAIL: 'admin@techynews.lat',
            ADMIN_PASSWORD: 'password',
        },
    },
});
