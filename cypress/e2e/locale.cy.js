/**
 * E2E Tests: Spanish Locale Switching
 *
 * Replicates the bug: switching to Spanish shows English content
 * due to cache-poisoning with the English fallback value.
 *
 * Runs against: http://localhost:8080 (Docker staging mirror)
 */

describe('Language / Locale Switching', () => {
    beforeEach(() => {
        // Start fresh — clear locale cookies so each test is independent
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('loads the homepage in English by default', () => {
        cy.visit('/');
        // Check some English UI strings that are translated in es.json
        cy.contains('Latest Stories').should('exist');
        cy.contains('Read More').should('exist');
    });

    it('POST /set-locale returns success and sets the locale cookie', () => {
        cy.visit('/');
        cy.request({
            method: 'POST',
            url: '/set-locale',
            body: { locale: 'es' },
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            form: false,
        }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body.success).to.be.true;
            expect(resp.body.locale).to.eq('es');
        });
    });

    it('serves Spanish UI strings after switching to Spanish', () => {
        cy.visit('/');

        // Hit the locale endpoint directly (simulates LanguageSwitcher.jsx)
        cy.request({
            method: 'POST',
            url: '/set-locale',
            body: { locale: 'es' },
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });

        // Reload the page — session now has locale=es
        cy.visit('/');

        // These keys must appear translated — pulled from resources/lang/es.json
        cy.contains('Últimas noticias').should('exist');
        cy.contains('Leer más').should('exist');
    });

    it('after switching to Spanish, re-switching to English restores English strings', () => {
        // Set to Spanish first
        cy.request({ method: 'POST', url: '/set-locale', body: { locale: 'es' }, headers: { 'X-Requested-With': 'XMLHttpRequest' } });
        cy.visit('/');
        cy.contains('Últimas noticias').should('exist');

        // Switch back to English
        cy.request({ method: 'POST', url: '/set-locale', body: { locale: 'en' }, headers: { 'X-Requested-With': 'XMLHttpRequest' } });
        cy.visit('/');
        cy.contains('Latest Stories').should('exist');
    });

    it('rejects unsupported locales with 400', () => {
        cy.visit('/');
        cy.request({
            method: 'POST',
            url: '/set-locale',
            body: { locale: 'fr' },
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            failOnStatusCode: false,
        }).then((resp) => {
            expect(resp.status).to.eq(400);
        });
    });

    it('Spanish article page serves translated content if available', () => {
        // Set to Spanish
        cy.request({ method: 'POST', url: '/set-locale', body: { locale: 'es' }, headers: { 'X-Requested-With': 'XMLHttpRequest' } });
        
        // Visit the homepage and grab the first article link
        cy.visit('/');
        cy.get('a[href^="/article/"]').first().invoke('attr', 'href').then((href) => {
            cy.visit(href);
            // Page should load without 500 error
            cy.url().should('include', '/article/');
        });
    });
});
