# Laravel Core Architecture

TechyNews relies on Laravel 13 as the backend orchestration layer. This framework manages API routing, authentication, and the database schema, acting as the foundation for the AI-native features.

## Directory Structure

The key directories for the backend logic include:
- `app/Http/Controllers/`: Handles incoming HTTP requests and returns Inertia pages or JSON responses.
- `app/Models/`: Eloquent models representing the database tables.
- `app/Services/`: Contains the heavy business logic, isolating it from controllers.
- `routes/web.php` & `routes/api.php`: The routing layers for the frontend and backend integration.

## Controller Patterns

Controllers in TechyNews are kept as thin as possible. Their primary responsibilities are:
1. Validating incoming requests.
2. Calling the appropriate Service classes to handle the business logic.
3. Returning an `Inertia::render()` response to the React frontend.

### Example: ArticleController
```php
public function show($slug)
{
    $article = Article::where('slug', $slug)->firstOrFail();
    
    // Defer complex translation logic to a service if necessary
    
    return Inertia::render('ArticleShow', [
        'article' => $article
    ]);
}
```

## Error Handling

All critical errors, especially those involving the AI pipelines, must be logged using Laravel's `Log` facade. Silent failures are strictly prohibited as per the project's agent rules.
