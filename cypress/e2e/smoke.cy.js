describe('Smoke Tests (Deployment Safeguard)', () => {
    beforeEach(() => {
        // Prevent Cypress from failing on random unhandled exceptions
        cy.on('uncaught:exception', (err, runnable) => {
            console.error('Cypress caught exception:', err);
            return false;
        });
    });

    it('Visits the homepage and checks for React hydration', () => {
        cy.visit('/');
        // The React app should mount and we should see the title
        cy.contains('TechyNews', { timeout: 10000 }).should('be.visible');
        // Ensure main layout is rendered
        cy.get('main').should('exist');
    });

    it('Loads an article page successfully', () => {
        cy.visit('/');
        // Find the first article link and click it
        cy.get('a[href*="/article/"]').first().click({ force: true });
        // Ensure the article page loads
        cy.url().should('include', '/article/');
        cy.get('article').should('exist');
    });
});
