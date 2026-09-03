import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import PushSubscribe from './PushSubscribe';
import useLanguage from '@/Hooks/useLanguage';
import { Menu, X, ArrowRight, Search } from 'lucide-react';
import RagCopilot from './RagCopilot';

export default function Navbar({ transparent = false }) {
    const { __ } = useLanguage();
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Close menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isSidebarOpen]);

    const navLinks = [
        { href: '/archive', label: __('Archive') },
        { href: '/newsletter', label: __('Newsletter') },
        { href: '/about', label: __('About') },
    ];

    const openSearch = () => {
        window.dispatchEvent(new CustomEvent('open-command-palette'));
    };

    return (
        <>
            <nav className={`fixed w-full z-[100] transition-colors duration-500 ${transparent ? 'bg-gradient-to-b from-black/80 to-transparent' : 'border-b border-black/5 dark:border-white/5 bg-white/95 dark:bg-[#02040a]/90 backdrop-blur-xl'}`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 cursor-pointer"
                        
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hidden md:block hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                            <Menu className="w-5 h-5" />
                        </div>
                        <Link href="/" className="relative z-[110]">
                            <img 
                                src="/img/logo_wbc.webp" 
                                alt="Techy News" 
                                width="170"
                                height="32"
                                className={`h-8 w-auto object-contain transition-all duration-500 ${transparent ? 'brightness-100' : 'dark:brightness-100 brightness-0'}`} 
                            />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center flex-1 justify-between ml-8">
                        <div className={`flex items-center space-x-8 mr-8 h-8 ${transparent ? "hidden" : "border-r border-black/5 dark:border-white/10 pr-8"}`}>
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
                        
                        <div className="flex items-center gap-4 ml-auto">
                            <button
                                onClick={openSearch}
                                className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center gap-2 group"
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5" />
                                
                            </button>
                            <PushSubscribe />
                            {!transparent && <ThemeToggle />}
                            <RagCopilot variant="navbar" />
                            <LanguageSwitcher />
                            <Link 
                                href="/about" 
                                className="text-sm font-bold bg-black dark:bg-white text-white dark:text-black hover:opacity-90 px-5 py-2.5 rounded-xl transition-all hover:scale-105 shadow-xl"
                            >
                                {__('About')}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex md:hidden items-center gap-2 relative z-[110]">
                        <button
                            onClick={openSearch}
                            className={`p-2 rounded-xl ${transparent ? "bg-white/10 text-white" : "bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400"}`}
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <RagCopilot variant="navbar" />
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className={`p-2 rounded-xl ${transparent ? "bg-white/10 text-white" : "bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400"}`}
                            aria-label="Open menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Universal Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[120]"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 h-screen w-[80vw] max-w-sm bg-white dark:bg-[#0a0f1c] z-[130] shadow-2xl p-6 md:p-8 flex flex-col border-r border-black/10 dark:border-white/10"
                            onMouseLeave={() => setIsSidebarOpen(false)}
                        >
                            <div className="flex items-center mb-12 gap-4">
                                <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                                <img src="/img/logo_wbc.webp" alt="Techy News" className="h-8 w-auto dark:brightness-100 brightness-0" />
                            </div>

                            <div className="flex-1 overflow-y-auto pr-4 space-y-8">
                                <div className="space-y-2">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">{__('Menu')}</h4>
                                    <Link 
                                        href="/classic" 
                                        className="block text-xl font-black tracking-tighter text-black dark:text-white hover:text-primary transition-colors py-2"
                                    >
                                        {__('Formato Clásico')}
                                    </Link>
                                    {navLinks.map((link) => (
                                        <Link 
                                            key={link.href} 
                                            href={link.href} 
                                            className="block text-xl font-black tracking-tighter text-black dark:text-white hover:text-primary transition-colors py-2"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    <Link href="/dashboard" className="block text-xl font-black tracking-tighter text-primary transition-colors py-2">
                                        {__('Studio')}
                                    </Link>
                                </div>

                                <div className="h-px w-full bg-black/10 dark:bg-white/10" />

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{__('Legal & Social')}</h4>
                                    <div className="flex flex-col gap-3">
                                        <Link href="/terms" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors">{__('Terms of Use')}</Link>
                                        <Link href="/privacy" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors">{__('Privacy Policy')}</Link>
                                        <a href="https://github.com/carlos-silveira" target="_blank" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors">GitHub</a>
                                        <a href="https://x.com/TechyNewsLat" target="_blank" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors">𝕏 Twitter</a>
                                    </div>
                                </div>
                            </div>
                            
                            
                            {/* Mobile only controls inside sidebar */}
                            <div className="md:hidden flex flex-wrap items-center gap-4 py-4 mt-4 border-t border-black/10 dark:border-white/10">
                                <PushSubscribe />
                                <ThemeToggle />
                                <LanguageSwitcher />
                            </div>

                            <div className="mt-auto pt-8 md:border-t border-black/10 dark:border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-500">© 2026 Carlos Silveira</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
