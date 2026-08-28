# Public Facing Controllers

These controllers handle all unauthenticated traffic hitting the TechyNews platform. Their primary responsibility is fetching data efficiently and passing it to the Inertia frontend.

## `ReelsDemoController`
Serves the homepage (`/`) as a full-screen, vertical news feed.
- Queries published articles with their comments and paginates the feed for
  incremental loading.
- Applies stored article translations for the active locale.
- Returns JSON for additional page requests from the client.

## `ArchiveController`
Serves the historical feed (`/archive`).
- Implements Laravel's `paginate()` method.
- Passes the pagination meta-data directly to Inertia so the React frontend can build the "Next/Previous" buttons or infinite scroll.
- Handles optional `?search=` or `?category=` query parameters to filter the Eloquent query before paginating.

## `PublicController`, `AboutController`, `ContactController`
These are simple controllers for static or semi-static pages.
- **`AboutController`**: Renders the `About.jsx` page.
- **`ContactController`**: Handles form submissions from the public, typically validating the request and dispatching a Mailable.
- **`PublicController`**: Often acts as a catch-all or utility for generic public views (like terms and conditions if not handled by a dedicated controller).
