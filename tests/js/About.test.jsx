import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../../resources/js/Pages/About';

class IntersectionObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
window.IntersectionObserver = IntersectionObserver;

// Mock inertia Link and Head
jest.mock('@inertiajs/react', () => ({
    Link: ({ children, href }) => <a href={href}>{children}</a>,
    Head: ({ title }) => <title>{title}</title>,
}));

describe('About Component', () => {
    it('renders the portfolio headline and introduction', () => {
        render(<About />);

        // Assert headline
        expect(screen.getByText(/Building the future of/i)).toBeInTheDocument();
        expect(screen.getByText(/Digital Experiences/i)).toBeInTheDocument();

        // Assert intro text
        expect(screen.getByText(/Hello! I am a passionate Full-Stack Developer/i)).toBeInTheDocument();

        // Assert technologies section
        expect(screen.getByText('Core Technologies')).toBeInTheDocument();
        expect(screen.getByText('Laravel 12')).toBeInTheDocument();
        expect(screen.getByText('React 18')).toBeInTheDocument();
    });
});
