import React from 'react';
import { Link } from '@inertiajs/react';
import useLanguage from '@/Hooks/useLanguage';

export default function PublicFooter({ className = '' }) {
    const { __ } = useLanguage();

    return (
        <footer className={`border-t border-black/5 dark:border-white/5 py-12 relative z-10 transition-colors duration-500 ${className}`}>
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
                <img src="/img/logo_wbc.png" alt="Techy News" className="h-7 w-auto opacity-50 hover:opacity-100 transition-opacity dark:brightness-100 brightness-0" />
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-700">© 2026 Carlos Silveira</p>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                    <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors">{__('Home')}</Link>
                    <Link href="/archive" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors">{__('Archive')}</Link>
                    <a href="https://github.com/carlos-silveira" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors">GitHub</a>
                    <a href="https://x.com/TechyNewsLat" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors">𝕏 Twitter</a>
                    <Link href="/terms" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors">{__('Terms of Use')}</Link>
                    <Link href="/privacy" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors">{__('Privacy Policy')}</Link>
                </div>
            </div>
        </footer>
    );
}
