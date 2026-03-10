import { render, screen } from '@testing-library/react';
import Welcome from '../../resources/js/Pages/Welcome';

class IntersectionObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
window.IntersectionObserver = IntersectionObserver;

jest.mock('@inertiajs/react', () => ({
    Head: ({ title }) => <title>{title}</title>,
    Link: ({ children, href }) => <a href={href}>{children}</a>
}));

describe('Welcome Landing Page', () => {
    it('renders the core components and AI Brief', () => {
        render(<Welcome articles={[]} dailyBrief="This is the AI Daily Briefing" />);

        expect(screen.getByText('Archive')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('This is the AI Daily Briefing')).toBeInTheDocument();
        expect(screen.getByText(/The Next Era of/i)).toBeInTheDocument();
        expect(screen.getByText('The studio is rendering the first batch of articles. Stay tuned.')).toBeInTheDocument();
    });

    it('renders the grid of published articles', () => {
        const publishedArticles = [
            { id: 1, title: 'GPT-5 Announced', slug: 'gpt-5-announced', updated_at: '2026-03-09' },
            { id: 2, title: 'React 20 Released', slug: 'react-20', updated_at: '2026-03-09', ai_summary: 'Awesome React features.' }
        ];

        render(<Welcome articles={publishedArticles} dailyBrief="Brief" />);

        expect(screen.getByText('GPT-5 Announced')).toBeInTheDocument();
        expect(screen.getByText('React 20 Released')).toBeInTheDocument();
        expect(screen.getByText('Awesome React features.')).toBeInTheDocument();
    });
});
