import { usePage } from '@inertiajs/react';

export default function useLanguage() {
    const { translations, locale } = usePage().props;

    /**
     * Translate a given key.
     * If the key is not found in the translations, return the key itself.
     */
    const __ = (key) => {
        return translations?.[key] || key;
    };

    return { __, locale };
}
