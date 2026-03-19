import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import dayjs from 'dayjs';
import { Heart, Twitter, Linkedin, Link as LinkIcon, ArrowRight, BookOpen } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import CommandPalette from '@/Components/CommandPalette';
import Navbar from '@/Components/Navbar';
import useLanguage from '@/Hooks/useLanguage';

export default function ArticleShow({ article, relatedArticles }) {
    const { __ } = useLanguage();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [likes, setLikes] = useState(article.likes_count || 0);
    const [isLiking, setIsLiking] = useState(false);

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
            const scroll = `${totalScroll / windowHeight}`;
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
     * Handles: json_encode(html), double-encoded, escaped slashes, etc.
     */
    const sanitizeContent = (raw) => {
        if (!raw || typeof raw !== 'string') return '';
        let content = raw;

        // Only attempt to parse if it looks like a JSON string (starts with " or { or [)
        if (content.trim().startsWith('"') || content.trim().startsWith('{') || content.trim().startsWith('[')) {
            for (let i = 0; i < 5; i++) {
                try {
                    const parsed = JSON.parse(content);
                    if (typeof parsed === 'string') {
                        content = parsed;
                        continue;
                    }
                    // If it's a TipTap object, return null so we use the renderer
                    if (parsed && typeof parsed === 'object' && parsed.type === 'doc') {
                        return null;
                    }
                    break;
                } catch {
                    break;
                }
            }
        }

        // Fix escaped forward slashes: <\/h2> → </h2>
        content = content.replace(/\\\\\//g, '/');
        // Strip leading/trailing quotes if they were added by double encoding
        if (content.startsWith('"') && content.endsWith('"')) {
            content = content.substring(1, content.length - 1);
        }
        return content;
    };

    const cleanHtml = typeof article.content === 'string' ? sanitizeContent(article.content) : null;
    const parsedContent = article.content || { type: 'doc', content: [] };
    const contentString = typeof parsedContent === 'string' ? parsedContent : JSON.stringify(parsedContent);
    const estimatedReadTime = article.reading_time_minutes || Math.max(1, Math.ceil(contentString.split(' ').length / 200));

    return (
        <div onMouseMove={handleMouseMove} className="min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-black dark:text-white font-sans selection:bg-primary/30 relative overflow-hidden transition-colors duration-500">
            <Head title={`${article.title} - Techy News`}>
                <meta name="description" content={article.meta_description || article.ai_summary || `${__('Read')} ${article.title} ${__('on Techy News')}.`} />
                <meta property="og:title" content={article.title} />
                <meta property="og:type" content="article" />
            </Head>
            <CommandPalette />

            {/* Dynamic Spotlight */}
            <motion.div
                className="fixed inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen"
                style={{
                    background: useSpring(
                        `radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(43, 124, 238, 0.1), transparent 80%)`,
                        { damping: 50, stiffness: 400 }
                    )
                }}
            />

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-purple-600 z-[100] transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }}></div>

            {/* ===== NAVBAR ===== */}
            <Navbar />

            {/* Parallax Hero Background */}
            {article.cover_image_path ? (
                <div
                    className="absolute top-0 w-full h-[70vh] bg-cover bg-center pointer-events-none opacity-40 blur-[2px]"
                    style={{
                        backgroundImage: `url(${article.cover_image_path})`,
                        transform: `translateY(${scrollProgress * 1.5}px)`
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/40 via-[#02040a]/80 to-[#02040a]"></div>
                </div>
            ) : (
                <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
            )}

            <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">
                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <header className="mb-16">
                        <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">
                            <BookOpen className="w-4 h-4" /> Synthesized Discovery
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] text-black dark:text-white transition-colors">
                            {article.title}
                        </h1>
                        <div className="flex items-center space-x-6 text-xs font-black uppercase tracking-widest text-gray-500">
                            <span>{dayjs(article.updated_at).format('MMMM D, YYYY')}</span>
                            <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                            <span>{estimatedReadTime} MIN READ</span>
                            <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                            <span className="text-primary/60">INTELLIGENT DRAFT</span>
                        </div>
                    </header>

                    {/* Floating Interaction Bar */}
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-12 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-50 flex md:flex-col items-center gap-6 bg-white/[0.03] backdrop-blur-2xl border border-white/10 py-4 px-6 md:py-8 md:px-4 rounded-full shadow-2xl">
                        <button
                            onClick={handleLike}
                            className="group flex flex-col items-center gap-1 transition-transform active:scale-95"
                        >
                            <Heart className={`w-6 h-6 transition-colors ${likes > 0 ? 'fill-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'text-gray-500 group-hover:text-white'}`} />
                            {likes > 0 && <span className="text-[10px] font-black text-gray-400">{likes}</span>}
                        </button>
                        <div className="w-[1px] h-6 md:w-6 md:h-[1px] bg-white/10"></div>
                        <button onClick={() => handleShare('twitter')} className="text-gray-500 hover:text-primary transition-colors">
                            <Twitter className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleShare('linkedin')} className="text-gray-500 hover:text-primary transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleShare('copy')} className="text-gray-500 hover:text-white transition-colors">
                            <LinkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {article.ai_summary && (
                        <div className="mb-16 p-10 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
                            <h3 className="text-primary font-black text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2 relative z-10">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                Executive Summary
                            </h3>
                            <p className="text-xl text-gray-300 font-light leading-relaxed relative z-10 italic">"{article.ai_summary}"</p>
                        </div>
                    )}

                    <div className="prose dark:prose-invert prose-primary max-w-none prose-xl prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-black dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:font-light prose-p:leading-relaxed prose-strong:text-black dark:prose-strong:text-white prose-a:text-primary hover:prose-a:text-black dark:hover:prose-a:text-white prose-code:text-emerald-600 dark:prose-code:text-emerald-400 prose-pre:bg-black/[0.02] dark:prose-pre:bg-white/[0.03] prose-pre:border prose-pre:border-black/5 dark:prose-pre:border-white/10 prose-pre:rounded-2xl transition-colors">
                        {cleanHtml ? (
                            <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
                        ) : (
                            <TipTapRenderer content={typeof article.content === 'string' ? (() => { 
                                try { return JSON.parse(article.content); } catch { return article.content; }
                            })() : article.content} />
                        )}
                    </div>
                </motion.article>

                {/* Read Next Section */}
                {relatedArticles && relatedArticles.length > 0 && (
                    <section className="mt-40 pt-20 border-t border-white/5">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-4xl font-black tracking-tighter">Read Next.</h2>
                            <Link href="/archive" className="text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors flex items-center gap-2">
                                Explorer Library <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedArticles.map(related => (
                                <Link key={related.id} href={`/article/${related.slug}`} className="group block h-full">
                                    <div className="bg-white/[0.03] rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-primary/30 transition-all p-6 h-full flex flex-col">
                                        {related.cover_image_path ? (
                                            <div className="h-40 rounded-2xl bg-cover bg-center mb-6 shadow-xl" style={{ backgroundImage: `url(${related.cover_image_path})` }} />
                                        ) : (
                                            <div className="h-40 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-6 border border-white/5">
                                                <BookOpen className="w-8 h-8 text-gray-800" />
                                            </div>
                                        )}
                                        <div className="flex flex-col flex-1">
                                            <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">
                                                {dayjs(related.updated_at).format('MMM D, YYYY')}
                                            </div>
                                            <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors line-clamp-2 mb-3 leading-tight tracking-tight">
                                                {related.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 font-light line-clamp-2 leading-relaxed">
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

            <footer className="border-t border-white/5 py-12 mt-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-600 font-black uppercase tracking-widest">
                    <p>© 2026 Carlos Silveira. All rights reserved.</p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <Link href="/archive" className="hover:text-white transition-colors">Archive</Link>
                        <a href="https://github.com/carlos-silveira" className="hover:text-white transition-colors capitalize">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

import mermaid from 'mermaid';

const TipTapRenderer = ({ content }) => {
    React.useEffect(() => {
        mermaid.initialize({ startOnLoad: true, theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default' });
        mermaid.contentLoaded();
    }, [content]);

    if (!content) return null;
    if (typeof content === 'string') return <div className="whitespace-pre-wrap">{content}</div>;
    if (!content.content) return null;

    const renderNode = (node, index) => {
        if (node.type === 'text') {
            let text = node.text;
            if (node.marks) {
                node.marks.forEach(mark => {
                    if (mark.type === 'bold') text = <strong key={`bold-${index}`}>{text}</strong>;
                    if (mark.type === 'italic') text = <em key={`italic-${index}`}>{text}</em>;
                    if (mark.type === 'strike') text = <del key={`strike-${index}`}>{text}</del>;
                    if (mark.type === 'code') text = <code key={`code-${index}`} className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">{text}</code>;
                });
            }
            return text;
        }

        switch (node.type) {
            case 'paragraph':
                return <p key={index} className="mb-8">{node.content?.map((n, i) => renderNode(n, i))}</p>;
            case 'heading':
                const Tag = `h${node.attrs?.level || 2}`;
                const levelClasses = node.attrs?.level === 1 ? 'text-5xl' : node.attrs?.level === 2 ? 'text-4xl' : 'text-3xl';
                return <Tag key={index} className={`font-black mt-16 mb-6 tracking-tighter leading-tight text-black dark:text-white ${levelClasses}`}>{node.content?.map((n, i) => renderNode(n, i))}</Tag>;
            case 'bulletList':
                return <ul key={index} className="list-disc pl-8 mb-8 space-y-4">{node.content?.map((n, i) => renderNode(n, i))}</ul>;
            case 'listItem':
                return <li key={index} className="pl-2">{node.content?.map((n, i) => renderNode(n, i))}</li>;
            case 'codeBlock':
                if (node.attrs?.language === 'mermaid') {
                    return <div key={index} className="mermaid bg-white dark:bg-[#0d1117] p-6 rounded-2xl border border-black/5 dark:border-white/10 mb-8 my-10 overflow-auto">{node.content?.[0]?.text}</div>;
                }
                return <pre key={index} className="bg-black/5 dark:bg-white/10 p-6 rounded-2xl border border-black/5 dark:border-white/10 mb-8 overflow-auto"><code className={`language-${node.attrs?.language}`}>{node.content?.[0]?.text}</code></pre>;
            case 'blockquote':
                return <blockquote key={index} className="border-l-4 border-primary pl-6 py-2 my-8 italic text-gray-700 dark:text-gray-300 bg-primary/5 rounded-r-xl">{node.content?.map((n, i) => renderNode(n, i))}</blockquote>;
            default:
                return null;
        }
    };

    return <div className="tiptap-content">{content.content.map((node, i) => renderNode(node, i))}</div>;
};
