# API & Utility Controllers

These controllers operate mostly in the background, serving machines rather than browsers.

## `SeoController`
Crucial for SEO visibility and search engine indexation.
- Handles requests to `/sitemap.xml` and `/feed` (RSS).
- Dynamically generates the XML sitemap with Google Image extension schema (`xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`), attaching `<image:image>` metadata for every article.
- Filters published articles with valid slugs (`where('status', 'published')->whereNotNull('slug')`).
- Formats dates in ISO 8601 (`toAtomString()`) and caches results for 1 hour.
- Ensures all canonical URLs match the primary clean canonical structure without trailing slashes.
