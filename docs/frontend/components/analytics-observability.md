# Analytics & Observability Components

To keep the AI platform transparent and performant, several components are dedicated purely to data visualization.

## `AnalyticsChart.jsx`
- **Library:** Recharts.
- **Usage:** Displays a beautiful, responsive area chart inside the Dashboard showing daily traffic, token burn rate, or active subscribers.
- **Styling:** Uses Tailwind classes combined with Recharts' `<ResponsiveContainer>` to ensure it doesn't break flex layouts on mobile devices.

## `Observability.jsx` & `GeminiUsage.jsx`
These components consume JSON data from the backend representing API call logs and latency metrics.
- They render dynamic Markdown tables.
- **Crucial Mobile Rule:** Markdown tables are wrapped in an `overflow-x-auto` container to prevent them from causing horizontal scrolling (overflow) on mobile viewports.

## `FactCheckDashboard.jsx`
Visualizes the results of `FactCheck` model runs. Displays confidence scores via color-coded progress bars (Green = High Confidence, Red = Hallucination detected).
