import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import dayjs from 'dayjs';
import axios from 'axios';
import { Loader2, Archive as ArchiveIcon, BookOpen } from 'lucide-react';
import CommandPalette from '@/Components/CommandPalette';
import Navbar from '@/Components/Navbar';
import PublicFooter from '@/Components/PublicFooter';
import useLanguage from '@/Hooks/useLanguage';

/**
 * Helper to find the first image in the content (HTML string or JSON object).
 */
const findFirstImage = (content) => {
  if (!content) return null;
  if (typeof content === 'string') {
    const match = content.match(/<img[^>]+src="([^">]+)"/);
    if (match) return match[1];
    try {
      const parsed = JSON.parse(content);
      return findFirstImage(parsed);
    } catch { return null; }
  }
  if (typeof content === 'object') {
    if (content.type === 'image' && content.attrs?.src) return content.attrs.src;
    if (content.content && Array.isArray(content.content)) {
      for (const node of content.content) {
        const found = findFirstImage(node);
        if (found) return found;
      }
    }
  }
  return null;
};

const getFinalImage = (article, width = 600) => {
  let url = article.cover_image_path;
  if (!url) {
    url = findFirstImage(article.content);
  }
  
  // Generic tech fallbacks
  if (!url) {
    url = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa';
  }

  if (url.includes('unsplash.com')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}auto=format&fit=crop&q=80&w=${width}`;
  }

  return url;
};

export default function Archive({ articles: originalArticles, currentTag, popularTags }) {
    const { __ } = useLanguage();
    const [articlesList, setArticlesList] = useState(originalArticles.data);
    const [nextPageUrl, setNextPageUrl] = useState(originalArticles.next_page_url);
    const [isLoading, setIsLoading] = useState(false);
    const observerTarget = useRef(null);

    // Spotlight mouse movement
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const loadMore = useCallback(async () => {
        if (!nextPageUrl || isLoading) return;
        setIsLoading(true);
        try {
            const response = await axios.get(nextPageUrl, {
                headers: { 'Accept': 'application/json' }
            });
            setArticlesList(prev => [...prev, ...response.data.data]);
            setNextPageUrl(response.data.next_page_url);
        } catch (error) {
            console.error("Failed to load more articles", error);
        } finally {
            setIsLoading(false);
        }
    }, [nextPageUrl, isLoading]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && nextPageUrl) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) observer.unobserve(observerTarget.current);
        };
    }, [loadMore, nextPageUrl]);

    return (
        <div onMouseMove={handleMouseMove} className="min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-black dark:text-white font-sans selection:bg-primary/30 relative overflow-hidden transition-colors duration-500">
            <Head title={`Archive - Techy News`}>
                <meta name="description" content="Browse all articles from Techy News — AI-powered tech journalism covering AI, cybersecurity, gaming, business tech, and more." />
                <meta property="og:title" content="Archive - Techy News" />
                <meta property="og:description" content="Browse all articles from Techy News — AI-powered tech journalism." />
                <meta property="og:url" content="https://techynews.lat/archive" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@TechyNewsLat" />
            </Head>
            <CommandPalette />

            {/* Dynamic Spotlight */}
            <motion.div
                className="fixed inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen"
                style={{
                    background: useSpring(
                        `radial-gradient(1000px circle at ${mouseX}px ${mouseY}px, rgba(43, 124, 238, 0.1), transparent 80%)`,
                        { damping: 50, stiffness: 400 }
                    )
                }}
            />

            {/* Background Glows */}
            <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-4">
                        <ArchiveIcon className="w-4 h-4" /> {__('The Intelligence Library')}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] text-black dark:text-white">
                        {currentTag ? (
                            <>{__('Exploring')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 capitalize">#{currentTag}</span></>
                        ) : __('/The Archive.')}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 font-light max-w-2xl leading-relaxed">
                        {__('A complete repository of every AI-synthesized narrative, research piece, and digital discovery recorded on this platform.')}
                    </p>

                    {/* Tag Cloud Filter */}
                    {popularTags && popularTags.length > 0 && (
                        <div className="mt-12 flex flex-wrap gap-3">
                            <Link
                                href="/archive"
                                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${!currentTag ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-xl' : 'bg-black/[0.02] dark:bg-white/5 text-gray-500 dark:text-gray-400 border-black/5 dark:border-white/10 hover:bg-black/[0.05] dark:hover:bg-white/10 hover:text-black dark:hover:text-white'}`}
                            >
                                {__('All Library')}
                            </Link>
                            {popularTags.map(tag => (
                                <Link
                                    href={`/archive?tag=${tag}`}
                                    key={tag}
                                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${currentTag === tag ? 'bg-primary text-white border-primary shadow-[0_0_25px_rgba(43,124,238,0.2)]' : 'bg-black/[0.02] dark:bg-white/5 text-gray-500 dark:text-gray-400 border-black/5 dark:border-white/10 hover:bg-black/[0.05] dark:hover:bg-white/10 hover:text-black dark:hover:text-white'}`}
                                >
                                    #{tag}
                                </Link>
                            ))}
                        </div>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    {articlesList.length === 0 ? (
                        <p className="text-gray-500 py-10 col-span-full">{__('No articles found in this sector.')}</p>
                    ) : (
                        articlesList.map((article, index) => (
                            <motion.div
                                key={`${article.id}-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                            >
                                <Link
                                    href={`/article/${article.slug}`}
                                    className="group block bg-white/[0.6] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 hover:border-primary/30 p-8 rounded-[2rem] transition-all hover:bg-white/5 relative overflow-hidden shadow-sm dark:shadow-none"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

                                    <div className="flex flex-col gap-6 relative z-10">
                                        <div 
                                            className="w-full h-48 rounded-2xl bg-cover bg-center border border-black/5 dark:border-white/10 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700" 
                                            style={{ backgroundImage: `url(${getFinalImage(article)})` }}
                                        />

                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2">
                                                {dayjs(article.updated_at).format('MMMM D, YYYY')}
                                                {article.ai_summary && <span className="w-1 h-1 bg-primary rounded-full"></span>}
                                                {article.ai_summary && <span className="text-primary tracking-widest uppercase">AI {__('Validated')}</span>}
                                            </div>
                                            <h2 className="text-2xl font-black text-black dark:text-white leading-tight group-hover:text-primary transition-colors tracking-tight line-clamp-2">
                                                {article.title}
                                            </h2>
                                            {article.ai_summary && (
                                                <p className="mt-4 text-gray-600 dark:text-gray-400 font-light line-clamp-2 leading-relaxed text-sm">
                                                    {article.ai_summary}
                                                </p>
                                            )}

                                            <div className="mt-6 flex flex-wrap gap-2">
                                                {article.tags && article.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className={`text-[10px] font-black uppercase tracking-tighter bg-black/[0.03] dark:bg-white/5 text-gray-500 px-3 py-1 rounded-full border border-black/5 dark:border-white/5`}>#{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Infinite Scroll Trigger & Loader */}
                <div ref={observerTarget} className="mt-20 py-20 flex flex-col justify-center items-center gap-4 border-t border-black/5 dark:border-white/5">
                    {isLoading && (
                        <div className="flex items-center gap-3 text-primary font-black tracking-widest text-xs uppercase animate-pulse">
                            <Loader2 className="w-4 h-4 animate-spin" /> {__('Accessing More Data')}...
                        </div>
                    )}
                    {!nextPageUrl && articlesList.length > 0 && (
                        <div className="text-gray-500 dark:text-gray-600 font-black tracking-widest text-[10px] uppercase opacity-40">
                            {__('End of Intelligence Stream')}
                        </div>
                    )}
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
