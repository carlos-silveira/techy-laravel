import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Toaster } from 'sonner';
import { route } from 'ziggy-js';

const appName = 'TechyNews';

createInertiaApp({
    title: (title) => title ? (title.includes(appName) ? title : `${title} | ${appName}`) : appName,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
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
                import('react-dom/client').then(({ hydrateRoot }) => {
                    hydrateRoot(el, appElement);
                });
            } else {
                import('react-dom/client').then(({ createRoot }) => {
                    createRoot(el).render(appElement);
                });
            }
        } catch (e) {
            console.error("REACT MOUNT ERROR:", e);
            document.body.innerHTML += `<div style="color:red; background:white; padding:20px; z-index:9999; position:fixed; top:0; left:0;"><h1>Mount Error</h1><pre>${e.stack}</pre></div>`;
        }
    },
    progress: {
        color: '#00b4ff',
    },
});