import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import dayjs from 'dayjs';
import { Heart, Twitter, Linkedin, Link as LinkIcon, ArrowRight, BookOpen } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import CommandPalette from '@/Components/CommandPalette';
import Navbar from '@/Components/Navbar';
import PublicFooter from '@/Components/PublicFooter';
import AdSlot from '@/Components/AdSlot';
import useLanguage from '@/Hooks/useLanguage';

export default function ArticleShow({ article, relatedArticles, auth }) {
    const { __ } = useLanguage();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [likes, setLikes] = useState(article.likes_count || 0);
    const [isLiking, setIsLiking] = useState(false);

    const isAuthorized = !!auth?.user;

    // Spotlight mouse movement
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const handleMouseMove = (e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = windowHeight === 0 ? 0 : totalScroll / windowHeight;
            setScrollProgress(scroll * 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLike = async () => {
        if (isLiking) return;
        setIsLiking(true);
        try {
            const res = await axios.post(`/api/articles/${article.id}/like`);
            setLikes(res.data.likes_count);
            toast.success(__('Thanks for the applause!'));
        } catch {
            toast.error(__('Failed to register like.'));
        } finally {
            setIsLiking(false);
        }
    };

    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `${__('Read this incredible piece')}: ${article.title}`;
        if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        } else if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        } else {
            navigator.clipboard.writeText(url);
            toast.success(__('Link copied to clipboard!'));
        }
    };

    /**
     * Recursively decode JSON-encoded strings and unescape slashes.
     */
    const sanitizeContent = (raw) => {
        if (!raw) return '';
        let content = String(raw);

        // Aggressively attempt to parse JSON if it looks like it's encoded
        if (content.trim().startsWith('"') || content.trim().startsWith('{') || content.trim().startsWith('[')) {
            try {
                // Remove outer quotes and handle double slashes before parsing if it's a simple string
                let temp = content.trim();
                if (temp.startsWith('"') && temp.endsWith('"')) {
                    temp = temp.substring(1, temp.length - 1);
                }
                
                // If it still looks like JSON after stripping quotes, try to parse
                const parsed = JSON.parse(content);
                if (typeof parsed === 'string') return sanitizeContent(parsed);
                if (parsed && typeof parsed === 'object' && parsed.type === 'doc') return null;
                if (typeof parsed === 'string') content = parsed;
            } catch {
                // If parsing fails, just continue with raw content
            }
        }

        // Standard cleanup for HTML strings
        content = content.replace(/\\\\\//g, '/').replace(/\\/g, '');
        if (content.startsWith('"') && content.endsWith('"')) {
            content = content.substring(1, content.length - 1);
        }
        
        // Remove literal "\n" or "\r" strings that some AI models return
        content = content.replace(/\\n/g, '').replace(/\\r/g, '');
        
        return content;
    };

    /**
     * Helper to find the first image in the content (HTML string or JSON object).
     */
    const findFirstImage = (content) => {
        if (!content) return null;
        if (typeof content === 'string') {
            const match = content.match(/<img[^>]+src="([^">]+)"/);
            if (match) return match[1];
            return null;
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

    const getFinalImage = (article, width = 1600) => {
        let url = article.cover_image_path;
        if (!url) {
            url = findFirstImage(article.content);
        }
        
        // Generic tech fallbacks
        if (!url) {
            url = article.slug.includes('not-paid-to-write-code') 
                ? 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
                : 'https://images.unsplash.com/photo-1451187580459-43490279c0fa';
        }

        if (url && url.includes('unsplash.com')) {
            const separator = url.includes('?') ? '&' : '?';
            return `${url}${separator}auto=format&fit=crop&q=80&w=${width}`;
        }

        return url;
    };

    const finalCoverImage = getFinalImage(article);
    const cleanHtml = typeof article.content === 'string' ? sanitizeContent(article.content) : null;
    const parsedContent = (typeof article.content === 'string' && !cleanHtml) ? (() => { 
        try { return JSON.parse(article.content); } catch { return { type: 'doc', content: [] }; }
    })() : (article.content || { type: 'doc', content: [] });

    const contentString = typeof article.content === 'string' ? article.content : JSON.stringify(article.content);
    const estimatedReadTime = article.reading_time_minutes || Math.max(1, Math.ceil(contentString.split(' ').length / 200));

    return (
        <div onMouseMove={handleMouseMove} className="min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-black dark:text-white font-sans selection:bg-primary/30 relative overflow-hidden transition-colors duration-500">
            <Head title={`${article.title} - Techy News`}>
                <meta name="description" content={article.meta_description || article.ai_summary || `${__('Read')} ${article.title} ${__('on Techy News')}.`} />
                {/* Open Graph */}
                <meta property="og:title" content={article.title} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={finalCoverImage} />
                <meta property="og:url" content={`https://techynews.lat/article/${article.slug}`} />
                <meta property="og:description" content={article.ai_summary || article.meta_description || ''} />
                <meta property="og:site_name" content="Techy News" />
                {/* Twitter Card — makes tweets show rich preview cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.title} />
                <meta name="twitter:description" content={article.ai_summary || article.meta_description || ''} />
                <meta name="twitter:image" content={finalCoverImage} />
                <meta name="twitter:site" content="@TechyNewsLat" />
                {/* JSON-LD Structured Data — Google News & Search eligibility */}
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    "headline": article.title,
                    "image": [finalCoverImage],
                    "datePublished": article.created_at,
                    "dateModified": article.updated_at || article.created_at,
                    "author": [{ "@type": "Organization", "name": "Techy News", "url": "https://techynews.lat" }],
                    "publisher": { "@type": "Organization", "name": "Techy News", "logo": { "@type": "ImageObject", "url": "https://techynews.lat/img/logo_wbc.png" } },
                    "description": article.ai_summary || article.meta_description || '',
                    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://techynews.lat/article/${article.slug}` }
                })}</script>
            </Head>
            <CommandPalette />

            <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-purple-600 z-[100] transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }}></div>

            <Navbar />

            {/* Removed Problematic Parallax Background for Clean Light Mode */}

            <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">
                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <header className="mb-16">
                        <div className="flex flex-wrap items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-8">
                            <BookOpen className="w-4 h-4" /> {__('Synthesized Discovery')}
                        </div>
                        
                        <div className="w-full aspect-[21/9] md:aspect-[2.5/1] rounded-3xl overflow-hidden mb-12 shadow-2xl relative group bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 z-10 transition-colors duration-500 pointer-events-none"></div>
                            <img 
                                src={finalCoverImage} 
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-8 leading-[1.1] text-gray-900 dark:text-white transition-colors">
                            {article.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs font-black uppercase tracking-widest text-gray-600 dark:text-gray-500">
                            <span>{dayjs(article.updated_at).format('MMMM D, YYYY')}</span>
                            <span className="hidden md:inline-block w-1 h-1 bg-gray-300 dark:bg-gray-800 rounded-full"></span>
                            <span>{estimatedReadTime} {__('min read')}</span>
                            <span className="hidden md:inline-block w-1 h-1 bg-gray-300 dark:bg-gray-800 rounded-full"></span>
                            <span className="text-primary/70 uppercase">{__('Intelligent Draft')}</span>
                        </div>
                    </header>

                    {/* Floating Interaction Bar */}
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-12 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-50 flex md:flex-col items-center gap-6 bg-white/80 dark:bg-white/[0.03] backdrop-blur-2xl border border-black/5 dark:border-white/10 py-4 px-6 md:py-8 md:px-4 rounded-full shadow-2xl transition-colors duration-500">
                        {isAuthorized && (
                            <>
                                <Link 
                                    href="/dashboard" 
                                    className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                                    title={__('Edit Article')}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 012.828 0L21 8.586a2 2 0 010 2.828l-10.586 10.586a2 2 0 01-0.707.293l-3.992.399 0.399-3.992a2 2 0 010.293-0.707L17.586 3.414z" /></svg>
                                </Link>
                                <div className="w-[1px] h-6 md:w-6 md:h-[1px] bg-black/5 dark:bg-white/10"></div>
                            </>
                        )}
                        <button
                            onClick={handleLike}
                            className="group flex flex-col items-center gap-1 transition-transform active:scale-95"
                        >
                            <Heart className={`w-6 h-6 transition-colors ${likes > 0 ? 'fill-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'text-gray-500 group-hover:text-black dark:group-hover:text-white'}`} />
                            {likes > 0 && <span className="text-[10px] font-black text-gray-500 dark:text-gray-400">{likes}</span>}
                        </button>
                        <div className="w-[1px] h-6 md:w-6 md:h-[1px] bg-black/5 dark:bg-white/10"></div>
                        <button onClick={() => handleShare('twitter')} className="text-gray-500 hover:text-primary transition-colors">
                            <Twitter className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleShare('linkedin')} className="text-gray-500 hover:text-primary transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleShare('copy')} className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                            <LinkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {article.ai_summary && (
                        <div className="mb-16 p-10 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
                            <h3 className="text-primary font-black text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2 relative z-10">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                {__('Executive Summary')}
                            </h3>
                            <p className="text-xl text-gray-700 dark:text-gray-300 font-light leading-relaxed relative z-10 italic">"{article.ai_summary}"</p>
                        </div>
                    )}

                    <div className="prose dark:prose-invert prose-primary max-w-none prose-lg prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-black dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:font-light prose-p:leading-relaxed prose-strong:text-black dark:prose-strong:text-white prose-a:text-primary hover:prose-a:text-black dark:hover:prose-a:text-white prose-code:text-emerald-600 dark:prose-code:text-emerald-400 prose-pre:bg-gray-100 dark:prose-pre:bg-white/[0.03] prose-pre:border prose-pre:border-black/10 dark:prose-pre:border-white/10 prose-pre:rounded-2xl transition-colors">
                        {cleanHtml ? (
                            <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
                        ) : (
                            <TipTapRenderer content={parsedContent} />
                        )}
                    </div>
                </motion.article>

                {/* Article Footer Ad Slot */}
                <AdSlot className="mt-20 mb-8" />

                {/* Read Next Section */}
                {relatedArticles && relatedArticles.length > 0 && (
                    <section className="mt-40 pt-20 border-t border-black/5 dark:border-white/5">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white">{__('Read Next.')}</h2>
                            <Link href="/archive" className="text-xs font-black uppercase tracking-widest text-primary hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">
                                {__('Explorer Library')} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedArticles.map(related => (
                                <Link key={related.id} href={`/article/${related.slug}`} className="group block h-full">
                                    <div className="bg-white dark:bg-white/[0.03] rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/10 group-hover:border-primary/30 transition-all p-6 h-full flex flex-col shadow-sm dark:shadow-none">
                                        <div className="h-40 rounded-2xl bg-cover bg-center mb-6 shadow-xl" style={{ backgroundImage: `url(${related.cover_image_path || findFirstImage(related.content) || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072'})` }} />
                                        <div className="flex flex-col flex-1">
                                            <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">
                                                {dayjs(related.updated_at).format('MMM D, YYYY')}
                                            </div>
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 mb-3 leading-tight tracking-tight">
                                                {related.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-500 font-light line-clamp-2 leading-relaxed">
                                                {related.ai_summary}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <PublicFooter className="mt-20" />
        </div>
    );
}

import mermaid from 'mermaid';

const TipTapRenderer = ({ content }) => {
    React.useEffect(() => {
        mermaid.initialize({ startOnLoad: true, theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default' });
        mermaid.contentLoaded();
    }, [content]);

    // Prism Syntax Highlighting
    React.useEffect(() => {
        const loadPrism = async () => {
            if (!window.Prism) {
                // Load base Prism
                await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js";
                    script.async = true;
                    script.onload = resolve;
                    document.body.appendChild(script);
                });

                // Load required dependencies for languages
                const dependencies = ['markup-templating'];
                for (const dep of dependencies) {
                    await new Promise((resolve) => {
                        const script = document.createElement('script');
                        script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${dep}.min.js`;
                        script.async = true;
                        script.onload = resolve;
                        script.onerror = resolve;
                        document.body.appendChild(script);
                    });
                }

                // Load languages
                const languages = ['javascript', 'php', 'css', 'markup', 'bash', 'python', 'json'];
                for (const lang of languages) {
                    await new Promise((resolve) => {
                        const langScript = document.createElement('script');
                        langScript.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`;
                        langScript.async = true;
                        langScript.onload = resolve;
                        document.body.appendChild(langScript);
                    });
                }

                // Load theme
                const style = document.createElement('link');
                style.rel = 'stylesheet';
                style.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css";
                document.head.appendChild(style);
            }
            window.Prism?.highlightAll();
        };

        loadPrism();
    }, [content]);

    if (!content) return null;
    if (typeof content === 'string') return <div className="whitespace-pre-wrap">{content}</div>;
    if (!content.content) return null;

    const renderNode = (node, index) => {
        if (node.type === 'text') {
            let element = <React.Fragment key={index}>{node.text}</React.Fragment>;
            if (node.marks) {
                node.marks.forEach(mark => {
                    if (mark.type === 'bold') element = <strong key={`bold-${index}`}>{element}</strong>;
                    if (mark.type === 'italic') element = <em key={`italic-${index}`}>{element}</em>;
                    if (mark.type === 'strike') element = <del key={`strike-${index}`}>{element}</del>;
                    if (mark.type === 'code') element = <code key={`code-${index}`} className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-primary font-bold">{element}</code>;
                });
            }
            return element;
        }

        switch (node.type) {
            case 'paragraph':
                return <p key={index} className="mb-8">{node.content?.map((n, i) => renderNode(n, i))}</p>;
            case 'heading':
                const Tag = `h${node.attrs?.level || 2}`;
                const levelClasses = node.attrs?.level === 1 ? 'text-4xl' : node.attrs?.level === 2 ? 'text-3xl' : 'text-2xl';
                return <Tag key={index} className={`font-black mt-16 mb-6 tracking-tighter leading-tight text-black dark:text-white ${levelClasses}`}>{node.content?.map((n, i) => renderNode(n, i))}</Tag>;
            case 'bulletList':
                return <ul key={index} className="list-disc pl-8 mb-8 space-y-4">{node.content?.map((n, i) => renderNode(n, i))}</ul>;
            case 'listItem':
                return <li key={index} className="pl-2">{node.content?.map((n, i) => renderNode(n, i))}</li>;
            case 'codeBlock':
                if (node.attrs?.language === 'mermaid') {
                    return <div key={index} className="mermaid bg-white dark:bg-[#0d1117] p-6 rounded-2xl border border-black/5 dark:border-white/10 mb-8 my-10 overflow-auto">{node.content?.[0]?.text}</div>;
                }
                const codeContent = node.content?.map(n => n.text).join('') || '';
                return (
                    <div key={index} className="group relative my-10">
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg z-10 shadow-lg shadow-primary/20">
                            {node.attrs?.language || 'code'}
                        </div>
                        <pre className="bg-gray-100 dark:bg-white/[0.03] p-8 pt-10 rounded-[1.5rem] border border-black/10 dark:border-white/10 mb-8 overflow-auto group-hover:border-primary/30 transition-all duration-500 scrollbar-thin scrollbar-thumb-primary/20">
                            <code className={`language-${node.attrs?.language} text-sm text-gray-900 dark:text-gray-300 leading-relaxed block whitespace-pre`}>
                                {codeContent}
                            </code>
                        </pre>
                    </div>
                );
            case 'blockquote':
                return <blockquote key={index} className="border-l-4 border-primary pl-6 py-2 my-8 italic text-gray-700 dark:text-gray-300 bg-primary/5 rounded-r-xl">{node.content?.map((n, i) => renderNode(n, i))}</blockquote>;
            default:
                return null;
        }
    };

    return <div className="tiptap-content">{content.content.map((node, i) => renderNode(node, i))}</div>;
};
