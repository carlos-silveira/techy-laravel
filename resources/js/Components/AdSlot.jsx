import React, { useEffect, useRef } from 'react';

/**
 * A responsive Google AdSense slot that automatically pushes ads when rendered.
 * It remains invisible if no VITE_ADSENSE_ID is configured in the .env file.
 */
export default function AdSlot({ 
    adClient = import.meta.env.VITE_ADSENSE_ID || 'ca-pub-6228787275246149', 
    adSlot = import.meta.env.VITE_ADSENSE_DEFAULT_SLOT || null, 
    format = 'auto', 
    responsive = 'true',
    className = ''
}) {
    const isDev = import.meta.env.DEV;
    const adRef = useRef(null);

    useEffect(() => {
        if (!adClient) return;

        try {
            // Push the ad to AdSense on mount if not already pushed
            if (window) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("AdSense Error: ", e);
        }
    }, [adClient, adSlot]);

    // If keys are missing and not in dev mode, render nothing to avoid breaking the UI
    if (!adClient && !isDev) {
        return null;
    }

    // In DEV mode, if keys are missing, render a placeholder block to help with layout design
    if (!adClient && isDev) {
        return (
            <div className={`w-full flex items-center justify-center bg-gray-200 dark:bg-white/5 border border-dashed border-gray-400 dark:border-white/20 rounded-xl overflow-hidden min-h-[100px] ${className}`}>
                <span className="text-gray-500 font-bold uppercase tracking-widest text-xs opacity-50">
                    Advertisement Slot (Unconfigured)
                </span>
            </div>
        );
    }

    return (
        <div className={`ad-container overflow-hidden w-full ${className}`}>
            <ins 
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={adClient}
                {...(adSlot ? { 'data-ad-slot': adSlot } : {})}
                data-ad-format={format}
                data-full-width-responsive={responsive}
                ref={adRef}
            />
        </div>
    );
}
