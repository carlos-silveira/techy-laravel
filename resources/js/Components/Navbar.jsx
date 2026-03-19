import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import useLanguage from '@/Hooks/useLanguage';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
    const { __ } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const navLinks = [
        { href: '/archive', label: __('Archive') },
        { href: '/about', label: __('About') },
    ];

    return (
        <>
            <nav className="fixed w-full border-b border-black/5 dark:border-white/5 bg-white/95 dark:bg-[#02040a]/90 backdrop-blur-xl z-[100] transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center"
                    >
                        <Link href="/" className="relative z-[110]">
                            <img 
                                src="/img/logo_wbc.png" 
                                alt="Techy News" 
                                className="h-8 w-auto object-contain transition-all duration-500 dark:brightness-100 brightness-0" 
                            />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center">
                        <div className="flex items-center space-x-8 mr-8 border-r border-black/5 dark:border-white/10 pr-8 h-8">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.href} 
                                    href={link.href} 
                                    className="text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <LanguageSwitcher />
                            <Link 
                                href="/dashboard" 
                                className="text-sm font-bold bg-black dark:bg-white text-white dark:text-black hover:opacity-90 px-5 py-2.5 rounded-xl transition-all hover:scale-105 shadow-xl"
                            >
                                {__('Studio')}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex md:hidden items-center gap-3 relative z-[110]">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 bg-white dark:bg-[#02040a] z-[90] pt-32 px-10 flex flex-col"
                    >
                        <div className="space-y-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <Link 
                                        href={link.href} 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-5xl font-black tracking-tighter text-black dark:text-white block hover:text-primary transition-colors"
                                    >
                                        {link.label}.
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-auto mb-20 space-y-6"
                        >
                            <div className="h-px w-full bg-black/5 dark:bg-white/5" />
                            <Link 
                                href="/dashboard"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between w-full p-6 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-sm"
                            >
                                {__('Access Studio')}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
