import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import useLanguage from '@/Hooks/useLanguage';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
    const { __ } = useLanguage();

    return (
        <nav className="fixed w-full border-b border-black/5 dark:border-white/5 bg-white/95 dark:bg-[#0a192f]/90 backdrop-blur-xl z-50 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center"
                >
                    <Link href="/">
                        <img 
                            src="/img/logo_wbc.png" 
                            alt="Techy News" 
                            className="h-8 w-auto transition-all duration-500 dark:brightness-100 brightness-0" 
                        />
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-4 md:space-x-8"
                >
                    <div className="hidden md:flex items-center space-x-8 mr-4 border-r border-black/5 dark:border-white/10 pr-8 h-8">
                        <Link href="/archive" className="text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{__('Archive')}</Link>
                        <Link href="/about" className="text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{__('About')}</Link>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        <Link href="/dashboard" className="text-[10px] md:text-sm font-bold bg-white dark:bg-white text-black hover:bg-gray-200 px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.12)]">
                            {__('Studio')}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </nav>
    );
}
