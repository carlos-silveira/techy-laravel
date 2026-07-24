# Dashboard

`Dashboard.jsx` is the colossal admin interface. It acts as the command center for the entire TechyNews platform.

## Key Sub-Components
- **`AgentControl`**: Provides manual triggers for the autonomous `NewsAgent` (e.g., "Force Ingestion", "Run Fact Check").
- **`ScoutedQueue`**: A real-time data table showing the raw RSS signals currently waiting in the `ScoutedArticle` database.
- **`AnalyticsChart`**: Uses Recharts to visualize page views, API token usage, and latency.
- **`GeminiUsage`**: Monitors the token consumption of the AI pipeline to prevent budget overruns.

## Security
The Dashboard is heavily protected. 
- It requires an active authenticated session via Laravel Sanctum.
- All Inertia requests to the dashboard endpoints are guarded by the `auth` middleware in `routes/web.php`.
