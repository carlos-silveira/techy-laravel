# React & Inertia Setup

TechyNews uses a modern frontend stack powered by React 18 and Inertia.js. This combination allows us to build a dynamic, single-page application (SPA) experience while maintaining the simplicity and SEO benefits of server-side routing with Laravel.

## Why Inertia.js?

Inertia.js acts as the glue between Laravel and React. It replaces the traditional API + separate SPA approach.
- **No Client-Side Routing:** We define all routes in Laravel's `web.php`.
- **Data Hydration:** Laravel controllers pass data directly to React components as props.
- **Seamless Transitions:** Inertia intercepts clicks on links and makes XHR requests to fetch the next page's component and data, resulting in instant page loads without full browser refreshes.

## Directory Structure

The frontend code lives in `resources/js/`:
- `Pages/`: High-level components that act as full pages (e.g., `Welcome.jsx`, `ArticleShow.jsx`). These map directly to responses from Laravel controllers.
- `Components/`: Reusable UI elements (e.g., buttons, navbars, modals).
- `Hooks/`: Custom React hooks for managing state and side effects.
- `Layouts/`: Shared layout components that wrap page content (e.g., header, footer, sidebar).

## Page Components

A typical page component receives data as props from Laravel:

```jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/DefaultLayout';

export default function ArticleShow({ article }) {
    return (
        <Layout>
            <Head title={article.title} />
            <article>
                <h1>{article.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>
        </Layout>
    );
}
```

*Note: Always ensure that HTML content from the database is sanitized before rendering it via `dangerouslySetInnerHTML` to prevent XSS attacks.*
