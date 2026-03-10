import '@testing-library/jest-dom'; 

// Mock IntersectionObserver for framer-motion in JSDOM
class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}
window.IntersectionObserver = IntersectionObserver;

// Mock ResizeObserver for Recharts
class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}
window.ResizeObserver = ResizeObserver;
