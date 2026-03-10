import React from 'react';
import { render, screen } from '@testing-library/react';
import Archive from '../../resources/js/Pages/Archive';

class IntersectionObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
window.IntersectionObserver = IntersectionObserver;

jest.mock('@inertiajs/react', () => ({
    Link: ({ children, href }) => <a href={href}>{children}</a>,
    Head: ({ title }) => <title>{title}</title>,
}));

describe('Archive Component', () => {
    it('renders empty state when no articles exist', () => {
        const emptyArticles = { data: [], current_page: 1, last_page: 1 };
        render(<Archive articles={emptyArticles} />);

        expect(screen.getByText('The Archive')).toBeInTheDocument();
        expect(screen.getByText(/No articles published yet/i)).toBeInTheDocument();
        expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
    });

    it('renders articles when data is provided', () => {
        const mockArticles = {
            data: [
                { id: 1, title: 'Test Article 1', slug: 'test-1', updated_at: '2026-03-09T12:00:00Z', ai_summary: 'Summary 1' },
                { id: 2, title: 'Test Article 2', slug: 'test-2', updated_at: '2026-03-08T12:00:00Z', ai_summary: null }
            ],
            current_page: 1,
            last_page: 2,
            next_page_url: '/archive?page=2'
        };

        render(<Archive articles={mockArticles} />);

        expect(screen.getByText('Test Article 1')).toBeInTheDocument();
        expect(screen.getByText('Test Article 2')).toBeInTheDocument();
        expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
        expect(screen.getByText('Next →')).toBeInTheDocument();
    });
});
