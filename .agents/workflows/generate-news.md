---
description: How to generate a new AI-powered news article for techynews.lat
---

# Generate News Article

This workflow generates a daily.dev-quality tech news article using the Gemini AI.

## Prerequisites
- `GEMINI_API_KEY` must be set in `.env`
- The Laravel app must be able to reach TechCrunch, The Verge, Ars Technica, and Hacker News APIs

## Steps

### 1. Run the generation command
// turbo
```bash
php artisan news:generate-daily
```

This will:
- Fetch trending headlines from 4 sources (TechCrunch, The Verge, Ars Technica, Hacker News)
- Ask Gemini for 3 editorial angle ideas
- Generate a full 800-1200 word article in clean HTML
- Generate metadata (summary, SEO description, tags)
- Save and auto-publish the article

### 2. Verify the article
// turbo
```bash
php artisan tinker --execute="echo App\Models\Article::latest()->first()->title;"
```

### 3. Fix any encoding issues (if needed)
// turbo
```bash
php artisan article:fix-encoding
```

### 4. Clear cache so the homepage updates
// turbo
```bash
php artisan cache:clear
```

## Automatic Schedule
The command runs automatically every day at 6:00 AM via `routes/console.php`.
To change the schedule, edit the `Schedule::command('news:generate-daily')` line.

## Customization
- **RSS Sources**: Edit `app/Services/NewsService.php` → `$feeds` array
- **Article Style**: Edit the system prompt in `app/Services/GeminiService.php` → `generateDraft()`
- **Metadata**: Edit `app/Services/GeminiService.php` → `generateArticleMeta()`
