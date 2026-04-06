import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { toast } from 'sonner';
import {
  motion, useScroll, useTransform, useMotionTemplate,
  useMotionValue, useSpring, AnimatePresence
} from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import CommandPalette from '@/Components/CommandPalette';
import Navbar from '@/Components/Navbar';
import PublicFooter from '@/Components/PublicFooter';
import AdSlot from '@/Components/AdSlot';
import { ArrowRight, Zap, BookOpen, Clock } from 'lucide-react';
import useLanguage from '@/Hooks/useLanguage';

dayjs.extend(relativeTime);

/**
 * Helper to find the first image in the content (HTML string or JSON object).
 */
const findFirstImage = (content) => {
  if (!content) return null;
  
  if (typeof content === 'string') {
    // Basic regex to find <img> tags in raw HTML
    const match = content.match(/<img[^>]+src="([^">]+)"/);
    if (match) return match[1];
    
    // Check if it's JSON encoded string
    try {
      const parsed = JSON.parse(content);
      return findFirstImage(parsed);
    } catch {
      return null;
    }
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

const getFinalImage = (article) => {
  if (article.cover_image_path) return article.cover_image_path;
  const contentImage = findFirstImage(article.content);
  if (contentImage) return contentImage;
  
  // Generic tech fallbacks based on keywords or slug
  if (article.slug.includes('not-paid-to-write-code')) return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072';
  return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072';
};

export default function Welcome({ articles, editorsChoice, dailyBrief }) {
  const { __ } = useLanguage();
  const { scrollYProgress } = useScroll();

  // Dynamic Mouse Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const backgroundGlow = useMotionTemplate`radial-gradient(900px circle at ${smoothX}px ${smoothY}px, rgba(43, 124, 238, 0.06), transparent 80%)`;

  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);
    try {
      await axios.post('/api/subscribe', { email });
      toast.success(__('You\'re on the list!'));
      setEmail('');
    } catch (error) {
      toast.error(__('Subscription failed. Please try again.'));
    } finally {
      setIsSubscribing(false);
    }
  };

  // Featured article is the latest one
  const featured = articles?.[0];

  // Grid articles: skip the featured one and any that are in Editors Choice
  const gridArticles = articles?.slice(1).filter(a => 
    !editorsChoice?.some(ec => ec.id === a.id)
  ).slice(0, 6) || [];
  const tickerItems = articles?.slice(0, 8) || [];

  return (
    <div className="min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-black dark:text-white font-sans selection:bg-primary/30 overflow-x-hidden transition-colors duration-500">
      <Head title={`${__('Home')} — Techy News — AI-Powered Tech Intelligence`}>
        <meta name="description" content="A cutting-edge, AI-powered journalism platform delivering deep technical research and automated synthesis of global tech news." />
        <meta property="og:title" content="Techy News — AI-Powered Tech Intelligence" />
        <meta property="og:description" content="A cutting-edge, AI-powered journalism platform delivering deep technical research and automated synthesis of global tech news." />
        <meta property="og:type" content="website" />
      </Head>
      <CommandPalette />

      {/* Interactive Cursor Spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{ background: backgroundGlow }}
      />

      {/* Ambient Glows */}
      <div className="fixed top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-primary/8 rounded-full blur-[200px] pointer-events-none mix-blend-screen z-0"></div>
      <div className="fixed bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/8 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0"></div>

      {/* ===== NAVBAR ===== */}
      <Navbar />

      <main className="relative z-10">
        {/* ===== MASTER HERO SECTION ===== */}
        <section className="relative flex flex-col justify-end overflow-hidden mb-12 z-20 min-h-[90vh]">
          {/* Global Hero Background (tied to Featured Story) */}
          {featured && (
            <motion.div
              className="absolute inset-0"
              style={{ scale: useTransform(scrollYProgress, [0, 0.3], [1.05, 1]) }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${getFinalImage(featured)})` }}
              />
              {/* Multi-layer gradient overlay to fade into page background smoothly */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#f8f6f6] dark:from-[#02040a] via-[#f8f6f6]/80 dark:via-[#02040a]/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f8f6f6]/80 dark:from-[#02040a]/80 to-transparent" />
            </motion.div>
          )}

          {/* Master Content Wrapper wrapper */}
          <div className="relative z-30 max-w-7xl mx-auto px-6 pt-12 pb-20 w-full flex flex-col justify-between min-h-[85vh]">
            
            {/* TOP: DAILY BRIEF (The True TL;DR) */}
            <div>
              {dailyBrief && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="bg-white/80 dark:bg-[#0a0f1c]/80 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden max-w-5xl mx-auto mb-16"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] -mr-32 -mt-32"></div>
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-sm font-black uppercase tracking-[0.25em] text-primary mb-3">{__('Daily Briefing')}</h2>
                      <div 
                        className="prose dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:font-medium prose-p:text-lg lg:prose-p:text-xl prose-p:leading-relaxed prose-a:font-bold prose-a:text-primary hover:prose-a:text-purple-500 transition-colors max-w-none"
                        dangerouslySetInnerHTML={{ __html: dailyBrief }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* BOTTOM: FEATURED ARTICLE */}
            <div>
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="max-w-3xl"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-8 backdrop-blur-md"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{__('Featured Story')}</span>
                  </motion.div>

                  <Link href={`/article/${featured.slug}`}>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-6 text-black dark:text-white hover:text-primary transition-colors duration-500 cursor-pointer">
                      {featured.title}
                    </h1>
                  </Link>

                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-10 max-w-2xl drop-shadow-sm">
                    {featured.ai_summary}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                    <Link
                      href={`/article/${featured.slug}`}
                      className="inline-flex items-center justify-center gap-3 bg-black dark:bg-white text-white dark:text-black font-black px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.15)] uppercase tracking-wider text-sm group"
                    >
                      {__('Read Story')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs font-black uppercase tracking-widest bg-white/20 dark:bg-black/20 backdrop-blur-md px-4 py-3 rounded-xl border border-black/5 dark:border-white/5">
                      <Clock className="w-4 h-4" />
                      {featured.reading_time_minutes || '5'} {__('min read')}
                      <span className="mx-2">·</span>
                      {dayjs(featured.updated_at).fromNow()}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ===== EDITORS CHOICE ===== */}
        {editorsChoice && editorsChoice.length > 0 && (
          <section className="py-24 px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {editorsChoice.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/article/${article.slug}`} className="group block">
                    <div className="relative rounded-[2rem] overflow-hidden bg-white/[0.6] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 group-hover:border-amber-400/30 transition-all duration-500 shadow-sm dark:shadow-none">
                      <div
                        className="h-52 bg-gradient-to-br from-white/10 to-black/50 bg-cover bg-center relative overflow-hidden"
                        style={{ backgroundImage: `url(${getFinalImage(article)})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] to-transparent opacity-60" />
                        <div className="absolute inset-0 group-hover:bg-amber-400/5 transition-colors duration-500" />
                        <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1.5 rounded-full backdrop-blur-md">
                          ★ {__('Editors Pick')}
                        </span>
                      </div>
                      <div className="p-8">
                        <h3 className="text-xl font-black tracking-tight mb-3 text-black dark:text-white group-hover:text-amber-400 transition-colors leading-tight line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-500 font-light line-clamp-2 leading-relaxed">
                          {article.ai_summary}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* ===== BENTO ARTICLE GRID ===== */}
        {(articles?.length > 0 && gridArticles.length > 0) ? (
          <section className="py-20 px-6 max-w-7xl mx-auto border-t border-black/5 dark:border-white/5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-1 h-8 bg-primary rounded-full"></div>
                <div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.25em] block mb-1">{__('Latest Discoveries')}</span>
                  <h2 className="text-4xl font-black tracking-tighter text-black dark:text-white">{__('Now Reading')}</h2>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex overflow-x-auto gap-2 pb-2 w-full md:w-auto scrollbar-hide">
                {['Artificial Intelligence', 'Gadgets & Hardware', 'Software & Apps', 'Business Tech', 'Gaming', 'Cybersecurity & Privacy'].map(cat => (
                  <Link 
                    key={cat}
                    href={`/archive?tag=${encodeURIComponent(cat)}`}
                    className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20"
                  >
                    {__(cat)}
                  </Link>
                ))}
              </div>

              <Link href="/archive" className="hidden md:flex text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors items-center gap-2 group flex-shrink-0">
                {__('Full Archive')} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {gridArticles.map((article, index) => {
                const isLarge = index === 0;
                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className={isLarge ? 'lg:col-span-2 lg:row-span-2' : ''}
                  >
                    <Link href={`/article/${article.slug}`} className="group block h-full">
                      <div className={`h-full bg-white/[0.6] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 group-hover:border-primary/30 rounded-[2rem] overflow-hidden transition-all duration-500 flex flex-col shadow-sm dark:shadow-none ${isLarge ? 'min-h-[500px]' : 'min-h-[280px]'}`}>
                        <div
                          className={`w-full bg-cover bg-center flex-shrink-0 relative overflow-hidden ${isLarge ? 'h-72' : 'h-40'}`}
                          style={{ backgroundImage: `url(${getFinalImage(article)})` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent" />
                          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-700 mix-blend-overlay" />
                        </div>
                        <div className="p-7 flex flex-col flex-1 justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                                {dayjs(article.updated_at).fromNow()}
                              </span>
                              {article.tags?.[0] && (
                                <span className="text-[10px] font-black bg-white/5 text-gray-500 px-2.5 py-1 rounded-full">
                                  #{article.tags[0]}
                                </span>
                              )}
                            </div>
                             <h3 className={`font-black tracking-tight text-black dark:text-white group-hover:text-primary transition-colors duration-300 leading-tight line-clamp-3 ${isLarge ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
                              {article.title}
                            </h3>
                          </div>
                          {(isLarge) && (
                            <p className="text-sm text-gray-600 font-light line-clamp-2 leading-relaxed mt-4">
                              {article.ai_summary}
                            </p>
                          )}
                          <div className="mt-5 flex items-center gap-2 text-gray-700 text-[10px] font-black uppercase tracking-widest">
                            <Clock className="w-3 h-3" />
                            {article.reading_time_minutes || '5'} min
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/archive"
                className="inline-flex items-center gap-3 border border-black/10 dark:border-white/10 text-gray-400 hover:text-black dark:hover:text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:bg-black/5 dark:hover:bg-white/5 group"
              >
                {__('Load All Articles')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>
        ) : articles?.length === 0 && (
          <section className="py-20 px-6 max-w-7xl mx-auto border-t border-black/5 dark:border-white/5">
            <div className="py-32 text-center text-gray-500 dark:text-gray-700 font-light text-xl border border-black/5 dark:border-white/5 rounded-[2rem] transition-colors duration-500">
              {__('The intelligence pipeline is warming up. Check back shortly.')}
            </div>
          </section>
        )}

        <section className="px-6 max-w-7xl mx-auto py-12">
            <AdSlot className="my-8" />
        </section>

        {/* ===== NEWSLETTER ===== */}
        <section className="py-24 px-6 border-t border-black/5 dark:border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[3rem] p-14 md:p-20 relative overflow-hidden group shadow-sm dark:shadow-none"
            >
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-700 group-hover:scale-125"></div>
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="relative z-10 text-center">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block mb-6">{__('AI Weekly Digest')}</span>
                <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-[0.9] text-black dark:text-white transition-colors">
                  {__('Intelligence,')}<br />{__('delivered weekly.')}
                </h2>
                <p className="text-gray-500 mb-12 font-light text-lg max-w-lg mx-auto leading-relaxed">
                  {__('Every Friday: AI research breakthroughs, engineering insights, and curated tools — synthesized by machine, filtered by humans.')}
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={__('your@email.com')}
                    className="flex-1 w-full px-6 py-4 rounded-xl bg-gray-100 dark:bg-black/60 border border-black/5 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-black tracking-wider uppercase text-sm hover:scale-105 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg dark:shadow-none"
                  >
                    {isSubscribing ? __('Joining...') : __('Subscribe')}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <PublicFooter />

      </main>
    </div>
  );
}
