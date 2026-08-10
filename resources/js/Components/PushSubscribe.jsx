import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export default function PushSubscribe() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isSupported, setIsSupported] = useState(false);

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true);
            checkSubscription();
        }
    }, []);

    const checkSubscription = async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            const subscription = await registration.pushManager.getSubscription();
            setIsSubscribed(!!subscription);
        } catch (e) {
            console.error('Service worker error:', e);
        }
    };

    const subscribe = async () => {
        try {
            const registration = await navigator.serviceWorker.ready;

            if (Notification.permission !== 'granted') {
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    toast.error('Notification permission denied.');
                    return;
                }
            }

            const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
            
            if (!vapidPublicKey) {
                console.error("VAPID public key not found in env");
                toast.error("Push notifications are not configured properly.");
                return;
            }

            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            });

            await axios.post('/push/subscribe', subscription.toJSON());

            setIsSubscribed(true);
            toast.success('Successfully subscribed to notifications!');
        } catch (err) {
            console.error('Failed to subscribe to push notifications:', err);
            toast.error('Failed to subscribe. Please try again.');
        }
    };

    const unsubscribe = async () => {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            
            if (subscription) {
                await axios.post('/push/unsubscribe', { endpoint: subscription.endpoint });
                await subscription.unsubscribe();
                setIsSubscribed(false);
                toast.success('Unsubscribed from notifications.');
            }
        } catch (err) {
            console.error('Failed to unsubscribe:', err);
            toast.error('Failed to unsubscribe.');
        }
    };

    if (!isSupported) return null;

    return (
        <button 
            onClick={isSubscribed ? unsubscribe : subscribe}
            className="flex items-center justify-center p-2 rounded-full transition-colors hover:bg-gray-800 text-gray-400 hover:text-white"
            title={isSubscribed ? "Unsubscribe from notifications" : "Subscribe to notifications"}
        >
            {isSubscribed ? (
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            )}
        </button>
    );
}
