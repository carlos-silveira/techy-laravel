---
description: How article content is stored, rendered, and how to fix encoding issues
---

# Fix Article Content

Articles store their body text in the `content` column of the `articles` table as **raw HTML strings**.

## How Content Flows

1. **Generation**: `GeminiService::generateDraft()` returns raw HTML (`<h2>Title</h2><p>Text...</p>`)
2. **Storage**: `GenerateDailyNews` saves it directly to `Article::content` — NO `json_encode()`
3. **Rendering**: `ArticleShow.jsx` uses `sanitizeContent()` → `dangerouslySetInnerHTML`

## Common Issue: Escaped HTML Tags

If you see `<\/h2>` or `&lt;h2&gt;` on the live site, the content was double-encoded.

### Fix existing articles
// turbo
```bash
php artisan article:fix-encoding
```

This recursively decodes JSON layers and strips escaped slashes.

### Fix a specific article
// turbo
```bash
php artisan article:fix-encoding your-article-slug
```

### Manual fix via Tinker
```bash
php artisan tinker
```
```php
$article = Article::where('slug', 'your-slug')->first();
$article->content = '<h2>Clean HTML</h2><p>Your content here</p>';
$article->save();
```

## Prevention
- NEVER use `json_encode()` on HTML content before storing
- The `GenerateDailyNews` command already handles this correctly
- The frontend `sanitizeContent()` helper handles any remaining edge cases

## Key Files
- `app/Console/Commands/FixArticleEncoding.php` — DB cleanup tool
- `app/Console/Commands/GenerateDailyNews.php` — Content generation
- `resources/js/Pages/ArticleShow.jsx` — Frontend rendering (sanitizeContent)
- `app/Services/GeminiService.php` — AI prompt engineering
