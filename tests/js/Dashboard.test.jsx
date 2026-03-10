import { render, screen } from '@testing-library/react';
import Dashboard from '../../resources/js/Pages/Dashboard';
import axios from 'axios';

class IntersectionObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
window.IntersectionObserver = IntersectionObserver;

jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: { chart_data: [], total_views: 0, total_articles: 0 } })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} }))
}));
jest.mock('@inertiajs/react', () => ({
    Head: ({ title }) => <title>{title}</title>,
    Link: ({ children, href }) => <a href={href}>{children}</a>,
    router: { reload: jest.fn() }
}));

describe('Dashboard Component', () => {
    it('renders the main dashboard layout and initial brief', () => {
        render(<Dashboard initialBrief="Initial Mock Brief" articles={[]} />);

        // Dashboard UI assertions based on new AI Studio Design
        expect(screen.getByPlaceholderText('Article Title...')).toBeInTheDocument();
        expect(screen.getByText('Studio Assistant')).toBeInTheDocument();
        expect(screen.getByText('Initial Mock Brief')).toBeInTheDocument();
    });

    it('renders placeholder UI elements gracefully', () => {
        render(<Dashboard initialBrief="Brief Text" articles={[]} />);
        expect(screen.getByText('Workspace')).toBeInTheDocument();
    });
});
