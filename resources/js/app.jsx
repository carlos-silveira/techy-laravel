import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Toaster } from 'sonner';
import { route } from 'ziggy-js';

const appName = 'TechyNews';

createInertiaApp({
    title: (title) => title ? (title.includes(appName) ? title : `${title} | ${appName}`) : appName,
    resolve: (name) => {
        return resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')).catch(e => {
            console.error('Failed to load page component chunk:', e);
            if (e.name === 'TypeError' || e.message.includes('fetch') || e.message.includes('dynamically imported module')) {
                // If a chunk is missing (probably due to a new deploy), hard reload the page
                window.location.reload();
            }
            throw e;
        });
    },
    setup({ el, App, props }) {
        window.route = (name, params, absolute) =>
            route(name, params, absolute, props.initialPage.props.ziggy);

        const appElement = (
            <>
                <App {...props} />
                <Toaster theme="dark" position="bottom-right" />
            </>
        );

        try {
            if (el.hasChildNodes()) {
                hydrateRoot(el, appElement);
            } else {
                createRoot(el).render(appElement);
            }
        } catch (e) {
            console.error("REACT HYDRATION/MOUNT ERROR:", e);
            // Fallback to standard render if hydration fails
            createRoot(el).render(appElement);
        }
    },
    progress: {
        color: '#00b4ff',
    },
});