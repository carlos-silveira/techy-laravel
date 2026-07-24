# Studio CRUD & Utility Controllers

These controllers govern the granular admin routes and utility endpoints within the platform.

## Studio CRUD Controllers
These files handle basic Create, Read, Update, Delete operations for specific models within the admin panel.
- `StudioCategoryController.php`
- `StudioArticleController.php`
- `StudioScoutController.php`
- `StudioEeatController.php`
- `StudioSettingsController.php`
- `StudioAgentController.php`
- `StudioObservabilityController.php`
- `StudioSubscriberController.php`
- `StudioMediaController.php`
- `StudioAnalyticsController.php`
- `StudioFactCheckController.php`
- `AgentController.php`, `AnalyticsController.php`, `ProfileController.php`, `PostController.php`, `ChatController.php`, `AboutUsController.php`, `NewsletterController.php`, `SitemapController.php`, `AiController.php`, `NewsletterArchiveController.php`, `EeatUpgradeController.php`

**Standard Pattern:**
Most of these controllers simply fetch data from Eloquent and pass it to an `Index.jsx` Inertia view, or accept a `POST`/`PUT` request to update a single record and redirect back.

## Utility Controllers
- `ImageUploadController.php`: Handles async image uploads (e.g., from TipTap editor) and stores them in `storage/app/public`.
- `LanguageController.php`: A simple endpoint to switch the user's session locale.
