# Atomic UI Components

Located in `resources/js/Components/`, these are the fundamental building blocks of the TechyNews design system.

## The Primitives
- `Button.jsx`: A standard HTML `<button>` wrapper with predefined Tailwind classes (primary, secondary, danger variants).
- `Input.jsx`: A styled text input field.
- `Label.jsx`: Form labels.
- `Checkbox.jsx`: Styled boolean inputs.
- `Dropdown.jsx`: A headless UI or simple state-driven dropdown menu.
- `Skeleton.jsx`: A loading placeholder used during Suspense or async data fetching.
- `ApplicationLogo.jsx`: The SVG or image tag for the brand logo.
- `ResponsiveNavLink.jsx` & `NavLink.jsx`: Styled Inertia `<Link>` wrappers for navigation menus.
- `ValidationErrors.jsx`: A component that iterates over Inertia's `errors` prop and displays them as red text alerts.
- `ErrorBoundary.jsx`: A React Error Boundary wrapper to catch component crashes gracefully.
- `AdSlot.jsx`: A placeholder or integration component for external ad networks.

## Context for AI Agents
Agents should **never** write raw HTML `<button>` or `<input>` tags when building forms. Always import and use these atomic components to maintain visual consistency across the application.
