# Jina Reader & Source Search

TechyNews needs to read the live internet to perform fact-checking and deep research.

## `SourceSearchService.php`
Uses the Google Programmable Search Engine API (or similar) to take a text query and return the top 3 relevant URLs.
- Validates that URLs are from trusted domains using `TrustedSourceRegistry.php` (e.g., ignoring Reddit or Quora for factual verification).

## `JinaReaderService.php`
Integrates with the `r.jina.ai` and `s.jina.ai` APIs.
- Takes a raw URL and returns a clean, markdown-formatted string containing only the core content of the page, stripping navigation, ads, and footers.
- **Image Pipeline:** Extracts images exclusively from cleaned markdown (`$markdown`) instead of raw HTML/boilerplate, ensuring stripped header ads, acquisition popups, and sidebar widgets are never extracted as article imagery.
- **Sanitization:** Integrates with `ImageService` to discard tracking pixels, publisher event banners (e.g. Wired World Fair, TC Disrupt), author avatars, and promotional links.
- **Security:** Requires an `Authorization: Bearer <JINA_API_KEY>` header to prevent 401 Unauthorized errors on the Jina backend.
