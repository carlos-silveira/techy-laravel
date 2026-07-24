# Article Model

`app/Models/Article.php` is the central model of the TechyNews platform. It represents published news stories, drafted AI articles, and localized content.

## Database Schema & Columns
- `id` (Primary Key)
- `title` (String): Original language headline.
- `slug` (String): Unique, SEO-friendly URL identifier.
- `summary` (Text): AI-generated short description for grid layouts.
- `content` (LongText): Stored as **RAW HTML**. This is a strict architectural rule to ensure instant rendering without frontend parsing delays.
- `translations` (JSON): The magic column for i18n. Stores locale overrides. Example structure: `{"es": {"title": "...", "summary": "...", "content": "..."}}`.
- `cover_image_path` (String): Unsplash API image URL.
- `status` (Enum/String): `draft`, `published`, `archived`.

## Key Methods & Attributes

### `getTranslatedAttribute($key, $locale)`
This method overrides the default attribute access. If the user's current locale is 'es', accessing `$article->title` will transparently check the `translations` JSON column for an 'es' key. If it exists, it returns the Spanish title; otherwise, it falls back to the original string.

### `sanitizeContent()`
Before any data is pushed to the frontend via Inertia, the `content` is passed through an HTML purifier. The model itself doesn't purify on save (to preserve AI generation quirks that can be fixed later), but it must be purified on read to prevent XSS.

## Relationships
- `belongsToMany(Category::class)`: Many-to-many relationship for grouping.
- `belongsToMany(Tag::class)`: Granular metadata tagging.
- `hasMany(FactCheck::class)`: Zero-to-many relationship with automated AI fact-checking reports.
