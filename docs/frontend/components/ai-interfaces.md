# AI Interface Components

These components are the direct bridges between the user and the backend AI services.

## `RagCopilot.jsx`
A floating, sticky chat interface that allows users to interact with a Retrieval-Augmented Generation (RAG) assistant.
- **State Management:** Uses React `useState` to maintain chat history locally before sending the entire array to the backend for context.
- **Performance:** Lazy-loaded to prevent slowing down the initial LCP on mobile devices.

## `AgentControl.jsx`
Located in the Dashboard. It renders a control panel with buttons triggering specific API routes:
- `/api/agents/force-ingest`
- `/api/agents/force-synthesize`
- It uses `axios` and `sonner` to display success/error toasts based on the HTTP response.

## `EeatUpgradeControl.jsx`
A specialized dashboard component that triggers the "E-E-A-T" (Experience, Expertise, Authoritativeness, Trustworthiness) AI pass on an existing article to boost its SEO ranking.
