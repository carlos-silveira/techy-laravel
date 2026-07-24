# API & Utility Controllers

These controllers operate mostly in the background, serving machines rather than browsers.

## `SeoController`
Crucial for SEO visibility.
- Handles requests to `/sitemap.xml` and `/robots.txt`.
- Dynamically generates the XML sitemap by querying all `Article::where('status', 'published')->get()`.
- Ensures that every time a new AI article is published, search engines can immediately discover the unique `slug`.
