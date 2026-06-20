describe('Smoke Tests (Deployment Safeguard)', () => {
    it('Visits the homepage without any JavaScript errors or Promise Rejections', () => {
        // Some apps throw unhandled rejections which Cypress doesn't always fail on automatically
        // Let's add a listener for unhandledrejection on the window.
        cy.visit('/', {
            onBeforeLoad(win) {
                win.addEventListener('unhandledrejection', (event) => {
                    throw new Error(`Unhandled Promise Rejection: ${event.reason}`);
                });
            }
        });

        // The React app should mount and we should see the title
        cy.contains('TechyNews').should('be.visible');

        // It should render the initial list of articles
        cy.get('body').should('contain', 'Now Reading');
    });

    it('Loads an article without errors', () => {
        cy.visit('/', {
            onBeforeLoad(win) {
                win.addEventListener('unhandledrejection', (event) => {
                    throw new Error(`Unhandled Promise Rejection: ${event.reason}`);
                });
            }
        });
        
        // Wait for the app to hydrate fully
        cy.get('a[href*="/article/"]').first().click({ force: true });
        
        // Ensure the article page loads
        cy.url().should('include', '/article/');
    });
});
