import React from 'react';
import { Link } from '@inertiajs/react';
import useLanguage from '@/Hooks/useLanguage';

export default function PublicFooter({ className = '' }) {
    const { __ } = useLanguage();

    return (
        <footer className={`border-t border-black/5 dark:border-white/5 py-12 pb-32 md:pb-12 relative z-10 transition-colors duration-500 ${className}`}>
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
                <img src="/img/logo_wbc.webp" alt="Techy News" width="150" height="28" className="h-7 w-auto opacity-50 hover:opacity-100 transition-opacity dark:brightness-100 brightness-0" />
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-700 dark:text-gray-400">© 2026 Carlos Silveira</p>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                    <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{__('Home')}</Link>
                    <Link href="/archive" className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{__('Archive')}</Link>
                    <a href="https://github.com/carlos-silveira" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">GitHub</a>
                    <a href="https://x.com/TechyNewsLat" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">𝕏 Twitter</a>
                    <a href="https://www.facebook.com/techynews" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Facebook</a>
                    <Link href="/about" className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{__('Contact & About')}</Link>
                    <Link href="/terms" className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{__('Terms of Use')}</Link>
                    <Link href="/privacy" className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{__('Privacy Policy')}</Link>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-8 text-center border-t border-black/5 dark:border-white/5 pt-6">
                <p className="text-[11px] font-light text-gray-500 dark:text-gray-500 max-w-4xl mx-auto leading-relaxed">
                    {__('Editorial Disclaimer: TechyNews is a technology news publication. Our content is drafted with the assistance of artificial intelligence to ensure timely reporting, but every article is fact-checked, edited, and analyzed by our human editorial team to guarantee accuracy and provide deep industry insights. We are committed to high-quality journalism and transparency.')}
                </p>
            </div>
        </footer>
    );
}
