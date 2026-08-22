# ADR 0002: Modular Monolith vs Decoupled SPA (Inertia.js + React)

**Status:** Accepted
**Date:** 2024-05-25

## 1. Context and Problem
For the TechyNews platform, we needed to select a frontend and backend architecture that allows rapid feature development, excellent SEO (crucial for a news platform), and a highly interactive user experience.

The standard industry approach is often to build a decoupled REST or GraphQL API (Backend) and a completely separate Next.js or Nuxt.js application (Frontend). However, maintaining two separate repositories, duplicated state logic, and complex CORS/Auth configurations slows down development for small-to-medium teams.

## 2. Considered Options
* **Option A: Decoupled Architecture (Laravel API + Next.js Frontend).** 
* **Option B: Traditional Server-Side Rendering (Laravel Blade).** 
* **Option C: Modern Monolith (Laravel + React + Inertia.js).** 

## 3. Decision
We selected **Option C: Modern Monolith using Laravel and Inertia.js with React 18.**

Inertia.js acts as a "glue" layer that allows us to build a fully client-side rendered, single-page application (SPA) using React, without the complexity of building an API. Laravel handles the routing, database (MySQL/Eloquent), and controllers, returning Inertia responses instead of JSON or HTML views.

## 4. Consequences

### Positive:
* **Development Velocity:** No need to write separate REST API endpoints, manage state with Redux, or handle complex JWT authentication. We use standard Laravel session authentication out of the box.
* **Single Codebase:** Frontend and backend live in the same repository (`techy-laravel`), simplifying CI/CD pipelines (rsync/SSH to cPanel) and local environments.
* **Performance:** Users get the snappy, no-page-reload experience of a React SPA, which is enhanced by Framer Motion for smooth UI transitions.

### Negative / Trade-offs:
* **Mobile App Future-Proofing:** Since we aren't building a dedicated REST API, if we ever decide to build a native iOS/Android app in the future, we will need to expose a separate API layer at that time. (Mitigation: Laravel's modularity makes adding an API layer straightforward when needed).
* **Bundle Size:** Initial page loads carry the React and Inertia JavaScript bundles, which are slightly heavier than static HTML, though Vite handles code-splitting efficiently.
