import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Toaster } from 'sonner';
import { route } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        // Make route() available globally from Ziggy
        window.route = (name, params, absolute) =>
            route(name, params, absolute, props.initialPage.props.ziggy);

        const root = createRoot(el);
        try {
            root.render(
                <>
                    <App {...props} />
                    <Toaster theme="dark" position="bottom-right" />
                </>
            );
            console.log("React Mounted Successfully");
        } catch (e) {
            console.error("REACT MOUNT ERROR:", e);
            document.body.innerHTML += `<div style="color:red; background:white; padding:20px; z-index:9999; position:fixed; top:0; left:0;"><h1>Mount Error</h1><pre>${e.stack}</pre></div>`;
        }
    },
    progress: {
        color: '#00b4ff',
    },
});