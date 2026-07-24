# Studio Pages

The `resources/js/Pages/` directory contains numerous files named `Index.jsx` or similar, which act as the primary views for the various Studio CRUD controllers.

## Data Tables
Many of these pages (e.g., listing Categories, listing Subscribers) share a common pattern:
- They receive an array or paginated object of data via Inertia props.
- They render a standard Tailwind CSS HTML `<table>` or grid.
- They include generic "Edit" and "Delete" buttons that trigger Inertia `visit` or `delete` requests.

## Other Pages
- `TopNav.jsx`: Often a partial or specific navigation element used in complex layouts.
- `NewsletterArchive.jsx`, `AboutUs.jsx`: Specific views for their respective controllers.

## Context for AI Agents
When generating a new CRUD feature, agents will typically duplicate one of these standard `Index.jsx` files, change the data variables, and update the table columns.
