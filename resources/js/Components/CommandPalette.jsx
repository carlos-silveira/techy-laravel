import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, router } from '@inertiajs/react';
import { Search, Command, X, Loader2, Zap, ArrowRight } from 'lucide-react';
import axios from 'axios';

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const inputRef = useRef(null);

    // Global Key Listener for Cmd+K / Ctrl+K and Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
            setResults([]);
            setActiveIndex(-1);
        }
    }, [isOpen]);

    // Debounced Search
    useEffect(() => {
        if (!query || query.length < 2) {
            setResults([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const timer = setTimeout(async () => {
            try {
                const res = await axios.get(`/api/search?q=${encodeURIComponent(query)}`);
                setResults(res.data);
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999]"
                    />

                    {/* Palette Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: -20 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-[8%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-[#02040a] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] rounded-3xl overflow-hidden z-[10000] flex flex-col"
                    >
                        {/* Search Input */}
                        <div className="flex items-center px-6 py-5 border-b border-white/5 gap-4">
                            {isLoading
                                ? <Loader2 className="w-5 h-5 animate-spin text-primary shrink-0" />
                                : <Search className="w-5 h-5 text-gray-600 shrink-0" />
                            }
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search articles, topics, or AI summaries..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none text-lg text-white placeholder-gray-700 focus:outline-none focus:ring-0 font-light"
                            />
                            <div className="flex items-center gap-2">
                                <kbd className="text-[10px] font-black text-gray-600 bg-white/5 border border-white/5 px-2 py-1 rounded-lg font-mono">ESC</kbd>
                                <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-white transition-colors p-1">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Results Area */}
                        <div className="max-h-[55vh] overflow-y-auto p-3">
                            {results.length === 0 && query.length >= 2 && !isLoading && (
                                <div className="text-center py-16 text-gray-600 flex flex-col items-center gap-3">
                                    <Search className="w-10 h-10 opacity-20" />
                                    <p className="font-black text-xs uppercase tracking-widest">No results for "{query}"</p>
                                </div>
                            )}

                            {results.length === 0 && (!query || query.length < 2) && (
                                <div className="text-center py-16 text-gray-700 flex flex-col items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                                        <Zap className="w-7 h-7 opacity-30 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-black text-xs uppercase tracking-widest text-gray-600">Start typing to search</p>
                                        <p className="text-[10px] text-gray-800 mt-1">Articles, topics, AI summaries</p>
                                    </div>
                                </div>
                            )}

                            {results.map((article, index) => (
                                <Link
                                    key={article.id}
                                    href={`/article/${article.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-start p-4 rounded-2xl transition-all group mb-1 ${activeIndex === index ? 'bg-white/10' : 'hover:bg-white/[0.05]'}`}
                                >
                                    {article.cover_image_path ? (
                                        <div
                                            className="w-14 h-14 rounded-xl bg-cover bg-center shrink-0 mr-4 border border-white/5 shadow-xl"
                                            style={{ backgroundImage: `url(${article.cover_image_path})` }}
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/5 shrink-0 mr-4 flex items-center justify-center">
                                            <Search className="w-5 h-5 text-gray-700" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-white font-black tracking-tight truncate group-hover:text-primary transition-colors text-base">
                                            {article.title}
                                        </h4>
                                        <p className="text-xs text-gray-600 truncate mt-1 font-light">
                                            {article.ai_summary || "Explore article"}
                                        </p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-800 group-hover:text-primary group-hover:translate-x-1 transition-all ml-3 shrink-0 self-center" />
                                </Link>
                            ))}
                        </div>

                        {/* Footer Hints */}
                        <div className="bg-white/[0.02] px-6 py-4 border-t border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-4 text-[10px] font-black text-gray-700 uppercase tracking-widest">
                                <span>↑↓ Navigate</span>
                                <span>↵ Open</span>
                                <span>ESC Close</span>
                            </div>
                            <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">
                                ⌘K to toggle
                            </span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

