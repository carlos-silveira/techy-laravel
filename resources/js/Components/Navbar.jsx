import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import useLanguage from '@/Hooks/useLanguage';

export default function Navbar() {
    const { __ } = useLanguage();

    return (
        <nav className="fixed w-full border-b border-white/5 bg-[#02040a]/80 backdrop-blur-xl z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center"
                >
                    <Link href="/">
                        <img src="/img/logo_wbc.png" alt="Techy News" className="h-8 w-auto" />
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-4 md:space-x-8"
                >
                    <div className="hidden md:flex items-center space-x-8 mr-4 border-r border-white/10 pr-8 h-8">
                        <Link href="/archive" className="text-sm font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">{__('Archive')}</Link>
                        <Link href="/about" className="text-sm font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">{__('About')}</Link>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <Link href="/dashboard" className="text-[10px] md:text-sm font-bold bg-white text-black hover:bg-gray-200 px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.12)]">
                            {__('Studio')}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </nav>
    );
}
