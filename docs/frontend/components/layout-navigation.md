# Layout & Navigation Components

These are the structural components that wrap around the Inertia Pages.

## `Navbar.jsx` & `PublicFooter.jsx`
The global layout wrappers.
- They utilize Inertia's `<Link>` component to ensure client-side transitions (preventing full page reloads).
- **Responsive Design:** Includes a hamburger menu state for mobile devices (`sm:hidden block`).

## `CommandPalette.jsx`
A macOS-style `Cmd+K` global search palette.
- **Library:** Framer Motion (custom built, previously Headless UI).
- **Interaction:** Listens globally for keyboard shortcuts (`Cmd+K` or `Ctrl+K`) and for the `open-command-palette` custom event (dispatched by search buttons in the Navbar). When opened, it queries the backend's `/api/search` route to instantly find Articles by title.

## `LanguageSwitcher.jsx`
A dropdown component that updates the session locale.
- It triggers an Inertia POST request to the backend to update the user's language preference.
- Upon successful response, the page reloads the Inertia props, triggering the automatic translation cache on the backend.
