import { useEffect, useRef } from 'react';
import axios from 'axios';

/**
 * Sends a beacon to mark the page visit as "engaged" (verified human reader)
 * once the user has spent at least minTimeMs on the page AND performed some interaction
 * (scroll, click, touch, or keypress).
 */
export default function useEngagementBeacon({ minTimeMs = 4000 } = {}) {
    const hasSent = useRef(false);
    const hasInteracted = useRef(false);

    useEffect(() => {
        hasSent.current = false;
        hasInteracted.current = false;

        const onInteract = () => {
            hasInteracted.current = true;
        };

        window.addEventListener('scroll', onInteract, { passive: true });
        window.addEventListener('click', onInteract, { passive: true });
        window.addEventListener('touchstart', onInteract, { passive: true });
        window.addEventListener('keydown', onInteract, { passive: true });

        const timer = setTimeout(() => {
            // Only send if the page was actually visible and user interacted or stayed focused
            if (!hasSent.current && document.visibilityState === 'visible') {
                hasSent.current = true;
                axios.post('/api/pv/engaged', {
                    path: window.location.pathname + window.location.search
                }).catch(() => {
                    // Non-blocking beacon failure
                });
            }
        }, minTimeMs);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', onInteract);
            window.removeEventListener('click', onInteract);
            window.removeEventListener('touchstart', onInteract);
            window.removeEventListener('keydown', onInteract);
        };
    }, []);
}
