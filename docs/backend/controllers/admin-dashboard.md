# Admin & Dashboard Controllers

These controllers govern the protected routes (`/dashboard/*`). They require the user to be authenticated via Sanctum/Session and typically demand Admin privileges.

## `DashboardController`
The entry point for the backend CMS.
- Aggregates high-level metrics (total articles, active subscribers, recent agent activity).
- Passes this data to `Dashboard.jsx` to render the Recharts graphs and summary widgets.

## `StudioController`
Handles the manual creation, editing, and deletion of articles.
- Receives the raw HTML payload from the `RichEditor` (TipTap) component.
- **Security:** Validates the input rigorously. Even though it accepts HTML, it must ensure no malicious scripts are injected by a compromised editor account.
- Manages the JSON translation column directly if editors manually correct AI translations.

## `ScoutQueueController`
Manages the `ScoutedArticle` table (the pre-ingestion RSS data).
- Allows admins to manually view, approve, or delete raw scraped data before the `NewsAgent` processes it.
- Triggers manual ingestion by calling the `NewsService` from the UI.

## `ObservabilityController`
The telemetry hub.
- Reads `storage/logs/laravel.log` or queries specific logging tables to serve real-time AI API metrics.
- Exposes endpoints that the frontend polls to update the `GeminiUsage` and `FactCheckDashboard` components.
