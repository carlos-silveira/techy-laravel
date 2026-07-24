# Welcome & Archive Pages

These are the primary public-facing Inertia components.

## `Welcome.jsx`
The dynamic homepage of TechyNews.

**Features:**
- **LCP Optimization:** Uses an injected `<link rel="preload">` in the server-side Blade template to aggressively preload the primary Hero image. The `fetchpriority="high"` attribute is applied to the first article card to ensure perfect Lighthouse scores.
- **Suspense Loading:** The `<RagCopilot />` chat interface is deferred using `React.lazy()` to strip ~46KB from the initial JS bundle.
- **Layout:** A grid system displaying the `editorsChoice` article at the top, followed by recent news.

## `Archive.jsx`
Handles pagination and historical searching.
- Receives a paginated `articles` prop from Laravel.
- Utilizes React state for client-side text filtering before falling back to backend search.
