// cypress/support/e2e.js
// Global support file — runs before every test

// Custom command: switch language via the UI and wait for reload
Cypress.Commands.add('switchLanguage', (langCode) => {
    // Click the language switcher dropdown
    cy.get('[data-testid="language-switcher"]', { timeout: 5000 })
        .click();

    // Click the target language
    cy.contains(langCode === 'es' ? 'Español' : langCode === 'pt' ? 'Português' : 'English')
        .click();

    // Wait for page to reload with new locale
    cy.wait(1500);
});

// Custom command: check that the page locale is set correctly
Cypress.Commands.add('assertLocale', (expected) => {
    cy.window().then((win) => {
        // Inertia shares locale via usePage() — read it from the Inertia page data
        const locale = win.__inertia?.sharedData?.locale ?? win.document.documentElement.lang;
        expect(locale).to.include(expected);
    });
});

// Silence ResizeObserver errors (common in JSDOM/Cypress)
Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('ResizeObserver') || err.message.includes('Non-Error promise rejection')) {
        return false;
    }
});
