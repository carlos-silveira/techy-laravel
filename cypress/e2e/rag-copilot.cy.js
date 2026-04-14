/**
 * E2E Tests: RAG Copilot
 *
 * Tests both the backend API directly and the frontend UI widget.
 * Replicates the bug: the copilot returns raw JSON {"answer":"..."} instead
 * of streaming actual answer text.
 *
 * Runs against: http://localhost:8080 (Docker staging mirror)
 */

describe('RAG Copilot', () => {
    // ─── Backend API Tests ────────────────────────────────────────────────────

    describe('Backend: POST /api/rag-chat', () => {
        it('returns 422 if query is missing', () => {
            cy.request({
                method: 'POST',
                url: '/api/rag-chat',
                body: {},
                headers: { 'Content-Type': 'application/json' },
                failOnStatusCode: false,
            }).then((resp) => {
                expect(resp.status).to.eq(422);
            });
        });

        it('returns 200 with streamed plain text for a valid query', () => {
            cy.request({
                method: 'POST',
                url: '/api/rag-chat',
                body: { query: 'What tech topics do you cover?' },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain, text/event-stream',
                },
                failOnStatusCode: false,
            }).then((resp) => {
                expect(resp.status).to.eq(200);
                // Response should NOT start with {"answer": — that was the bug
                const body = typeof resp.body === 'string' ? resp.body : JSON.stringify(resp.body);
                expect(body).not.to.match(/^\{"answer":/);
                // Response should have some text content
                expect(body.length).to.be.greaterThan(5);
            });
        });

        it('works even when the query matches no articles specifically', () => {
            cy.request({
                method: 'POST',
                url: '/api/rag-chat',
                body: { query: 'xyzzy quantum blockchain metaverse aardvark' },
                headers: { 'Content-Type': 'application/json', 'Accept': 'text/plain' },
                failOnStatusCode: false,
            }).then((resp) => {
                // Should still return 200 — keyword fallback should kick in
                expect(resp.status).to.eq(200);
                const body = typeof resp.body === 'string' ? resp.body : JSON.stringify(resp.body);
                // Should not be raw JSON
                expect(body).not.to.match(/^\{"answer":/);
            });
        });

        it('rejects queries that are too long (>500 chars)', () => {
            cy.request({
                method: 'POST',
                url: '/api/rag-chat',
                body: { query: 'a'.repeat(501) },
                headers: { 'Content-Type': 'application/json' },
                failOnStatusCode: false,
            }).then((resp) => {
                expect(resp.status).to.eq(422);
            });
        });
    });

    // ─── Frontend UI Tests ────────────────────────────────────────────────────

    describe('Frontend: RAG Copilot Widget', () => {
        beforeEach(() => {
            cy.visit('/');
            // Wait for the page to fully load
            cy.get('body').should('be.visible');
        });

        it('RAG copilot toggle button is visible on the homepage', () => {
            // The floating button is always rendered
            cy.get('.fixed.bottom-20, .fixed.bottom-6')
                .find('button')
                .last()
                .should('be.visible');
        });

        it('opens the RAG copilot chat window on click', () => {
            // Find and click the floating button
            cy.get('.fixed').contains('button', '').last().click({ force: true });
            // The chat panel should appear
            cy.contains('Techy RAG').should('be.visible');
            cy.contains('BETA').should('be.visible');
        });

        it('sends a message and receives a non-JSON streamed response', () => {
            // Open the chat
            cy.get('button').filter(':visible').last().click({ force: true });
            
            cy.get('textarea[placeholder*="Ask"]', { timeout: 5000 }).should('be.visible').type('What is artificial intelligence?');
            
            // Submit
            cy.get('textarea').type('{enter}');

            // Wait for streaming response — it should not show raw JSON
            cy.get('.prose, [class*="prose"]', { timeout: 20000 })
                .should('not.contain', '{"answer":')
                .and('not.contain', '"answer"');

            // Should have some actual text (more than just the welcome message)
            cy.get('.prose').should(($els) => {
                const texts = [...$els].map(el => el.textContent);
                const hasNonWelcomeContent = texts.some(t => t.length > 50 && !t.includes('Hello! I am the Techy AI'));
                expect(hasNonWelcomeContent).to.be.true;
            });
        });

        it('shows a friendly error message (not raw JSON) if the API fails', () => {
            // Intercept the API call and simulate a failure
            cy.intercept('POST', '/api/rag-chat', {
                statusCode: 500,
                body: 'Internal Server Error',
            }).as('ragCall');

            // Open chat and send a message
            cy.get('button').filter(':visible').last().click({ force: true });
            cy.get('textarea[placeholder*="Ask"]', { timeout: 5000 }).type('test query');
            cy.get('textarea').type('{enter}');

            cy.wait('@ragCall');

            // Should show a human-friendly error message
            cy.contains("Sorry, I couldn't reach the knowledge engine", { timeout: 5000 })
                .should('be.visible');
        });
    });
});
