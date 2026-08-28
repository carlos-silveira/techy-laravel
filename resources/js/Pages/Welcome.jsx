import axios from 'axios';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { toast } from 'sonner';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, MessageCircle, Clock, BookOpen, X, Send, ChevronDown } from 'lucide-react';
import { getFinalImage } from '@/utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import 'dayjs/locale/en';
import Navbar from '@/Components/Navbar';
import CommandPalette from '@/Components/CommandPalette';
import PublicFooter from '@/Components/PublicFooter';
import useLanguage from '@/Hooks/useLanguage';
import AdsterraAd from '@/Components/AdsterraAd';

dayjs.extend(relativeTime);

// Helper for generic username
const generateRandomName = () => `CyberUser${Math.floor(Math.random() * 9000) + 1000}`;

export default function ReelsDemo({ articles: initialArticlesData }) {
  const [articles, setArticles] = useState(initialArticlesData.data || []);
  const [nextPageUrl, setNextPageUrl] = useState(initialArticlesData.next_page_url);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const loadMore = async () => {
    if (!nextPageUrl || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
        const response = await axios.get(nextPageUrl, { headers: { 'Accept': 'application/json' } });
        setArticles(prev => [...prev, ...response.data.data]);
        setNextPageUrl(response.data.next_page_url);
    } catch (error) {
        console.error('Failed to load more articles', error);
    } finally {
        setIsLoadingMore(false);
    }
  };
  const { __, locale } = useLanguage();
  dayjs.locale(locale);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCommentArticleId, setActiveCommentArticleId] = useState(null);
  const [likedArticles, setLikedArticles] = useState([]);
  const containerRef = useRef(null);

  const handleLike = async (articleId) => {
    // Optimistic UI update
    const isLiked = likedArticles.includes(articleId);
    if (isLiked) {
      setLikedArticles(prev => prev.filter(id => id !== articleId));
    } else {
      setLikedArticles(prev => [...prev, articleId]);
    }

    try {
      await axios.post(`/api/articles/${articleId}/like`);
    } catch (error) {
      // Revert on failure
      toast.error('Failed to update like status');
      if (isLiked) {
        setLikedArticles(prev => [...prev, articleId]);
      } else {
        setLikedArticles(prev => prev.filter(id => id !== articleId));
      }
    }
  };

  const handleScroll = (e) => {
    const container = e.target;
    const itemHeight = container.clientHeight;
    const newIndex = Math.round(container.scrollTop / itemHeight);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
    
    // Infinite scroll trigger: load more when user is 3 items away from the end
    const isNearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight * 3;
    if (isNearBottom && nextPageUrl && !isLoadingMore) {
       loadMore();
    }
  };

  const currentArticle = articles.find(a => a.id === activeCommentArticleId) || null;

  const feedItems = [];
  let adCounter = 0;
  articles.forEach((article, idx) => {
    feedItems.push({ type: 'article', data: article });
    // After every 3 articles, insert an ad slide (unless it's the very last article)
    if ((idx + 1) % 3 === 0 && idx !== articles.length - 1) {
      adCounter++;
      feedItems.push({ type: 'ad', id: `ad-${adCounter}` });
    }
  });

  // Render footer as the very last slide if there's no more content
  if (!nextPageUrl) {
    feedItems.push({ type: 'footer', id: 'footer-slide' });
  }

  return (
    <div className="bg-black text-white h-screen w-screen overflow-hidden font-sans selection:bg-primary/30 relative">
      <Head title="TechyNews" />
      
      {/* Retain Global Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
         <Navbar transparent={true} />
      </div>

      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide scroll-smooth"
        onScroll={handleScroll} // pt-20 to clear navbar
      >
        {feedItems.map((item, index) => {
          const isActive = index === activeIndex;
          if (item.type === 'footer') {
            return (
              <div key={item.id} className="w-full snap-start snap-always bg-[#02040a]">
                <PublicFooter />
              </div>
            );
          }

          if (item.type === 'ad') {
            return (
              <div 
                key={item.id}
                className="h-screen w-full snap-start snap-always relative flex flex-col items-center justify-center bg-[#02040a] border-y border-white/5"
              >
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">{__('Advertisement')}</span>
                  <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-2 md:p-6 min-h-[400px] flex items-center justify-center mx-auto shadow-2xl overflow-hidden">
                      <AdsterraAd type="native" />
                  </div>
                  <div className="mt-12 flex flex-col items-center justify-center animate-bounce opacity-50">
                     <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-2">{__('Keep Scrolling')}</p>
                     <ChevronDown className="w-6 h-6 text-gray-400" />
                  </div>
              </div>
            );
          }

          const article = item.data;
          
          return (
            <div 
              key={article.id}
              className="h-screen w-full snap-start snap-always relative flex items-center justify-center bg-[#02040a]"
            >
              {/* Background Image / Media */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={getFinalImage(article, 1200)} 
                  alt={article.title}
                  fetchpriority={index === 0 ? "high" : "auto"}
                  loading={index === 0 ? "eager" : "lazy"}
                  className={`w-full h-full object-cover transition-transform duration-[10s] ease-out ${isActive ? 'scale-110' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/95" />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Main Content Overlay */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 md:p-12 lg:p-24 pb-10 md:pb-16 pt-28 md:pt-32 w-full max-w-5xl mx-auto">
                <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="max-w-3xl pr-16 md:pr-20"
                    >
                      {/* Tags */}
                      {article.tags?.[0] && (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 md:px-4 md:py-2 md:mb-4 text-[10px] font-black uppercase tracking-widest bg-primary/80 backdrop-blur-md rounded-full text-white shadow-lg border border-white/20">
                           <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          {article.tags[0]}
                        </span>
                      )}
                      
                      <h1 className="text-2xl md:text-5xl font-black tracking-tighter leading-tight md:leading-[1.1] mb-4 md:mb-6 text-white drop-shadow-lg">
                        <Link href={`/article/${article.slug}`} className="hover:text-primary transition-colors block">
                            {article.title}
                        </Link>
                      </h1>
                      
                      {/* TL;DR Section */}
                      <div className="mb-4 md:mb-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 md:p-5 rounded-2xl shadow-xl">
                         <div className="flex items-center gap-2 mb-2 md:mb-3">
                           <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                           <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-amber-400">{__('TL;DR Summary')}</h4>
                         </div>
                         <ul className="space-y-2 md:space-y-3">
                           {/* Split summary into bullet points for quick scanning */}
                           {(article.ai_summary || '').split('. ').slice(0,3).map((sentence, i) => sentence && (
                             <li key={i} className="text-white text-lg md:text-xl font-medium leading-relaxed md:leading-loose flex items-start gap-3">
                               <span className="text-primary mt-1 md:mt-1.5 text-xl md:text-2xl">•</span>
                               {sentence}{!sentence.endsWith('.') ? '.' : ''}
                             </li>
                           ))}
                         </ul>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-300">
                        <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                          <Clock className="w-4 h-4 text-primary" />
                          {article.reading_time_minutes || 5} {__('min read')}
                        </span>
                        <span className="opacity-70 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">{dayjs(article.updated_at).fromNow()}</span>
                      </div>
                      
                      <div className="mt-5 md:mt-8">
                        <Link 
                          href={`/article/${article.slug}`}
                          className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-black uppercase tracking-widest text-xs md:text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                        >
                          <BookOpen className="w-5 h-5" />
                          {__('Read Full Story')}
                        </Link>
                      </div>
                    </motion.div>
              </div>

              {/* Right Side Action Buttons */}
              <div className="absolute right-3 bottom-16 md:right-12 md:bottom-24 z-20 flex flex-col gap-4 md:gap-6 items-center">
                <ActionIcon 
                  icon={Heart} 
                  label={__("Like")}  
                  delay={0.3} 
                  active={likedArticles.includes(article.id)}
                  onClick={() => handleLike(article.id)}
                />
                <ActionIcon 
                  icon={MessageCircle} 
                  label={article.comments?.length || "0"} 
                  ariaLabel={__('Comments')}
                  delay={0.4} 
                  onClick={() => setActiveCommentArticleId(article.id)}
                />
                <ActionIcon 
                  icon={Share2} 
                  label={__("Share")}  
                  delay={0.5} 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: article.title, url: window.location.origin + '/article/' + article.slug }).catch(console.error);
                    } else {
                      navigator.clipboard.writeText(window.location.origin + '/article/' + article.slug);
                      toast.success('Link copied to clipboard!');
                    }
                  }}
                />
              </div>
              
              {/* Swipe Indicator (only on first slide) */}
              {index === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: [0, 8, 0] }}
                  transition={{ delay: 2, duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-50 pointer-events-none"
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white drop-shadow-lg">{__('Swipe')}</span>
                  <ChevronDown className="w-5 h-5 text-white drop-shadow-lg" />
                </motion.div>
              )}
            </div>
          );
        })}

        
      </div>

      {/* Comments Drawer */}
      <AnimatePresence>
        {activeCommentArticleId && currentArticle && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-96 bg-white dark:bg-[#0a0f1c] z-[120] shadow-2xl flex flex-col border-l border-black/10 dark:border-white/10"
          >
             <div className="p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
                <h3 className="font-black uppercase tracking-widest text-sm text-black dark:text-white">{__('Comments')} ({currentArticle.comments?.length || 0})</h3>
                <button onClick={() => setActiveCommentArticleId(null)} className="p-2 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-black dark:text-white" />
                </button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {currentArticle.comments && currentArticle.comments.length > 0 ? (
                  currentArticle.comments.map(c => (
                    <div key={c.id} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-black text-primary text-xs uppercase">{c.username.substring(0,2)}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-xs text-black dark:text-white">{c.username}</span>
                          <span className="text-[10px] text-gray-500">{dayjs(c.created_at).fromNow()}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-light">{c.body}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 text-sm mt-10 font-light">
                    {__('No comments yet. Be the first!')}
                  </div>
                )}
             </div>

             <div className="p-6 border-t border-black/10 dark:border-white/10 bg-gray-50 dark:bg-black">
                <CommentForm articleId={currentArticle.id} />
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Drawer Overlay */}
      <AnimatePresence>
        {activeCommentArticleId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCommentArticleId(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110]"
          />
        )}
      </AnimatePresence>
      <CommandPalette />
    </div>
  );
}

function CommentForm({ articleId }) {
  const { __ } = useLanguage();
  const { data, setData, post, processing, reset } = useForm({
    username: generateRandomName(),
    body: ''
  });

  const submit = (e) => {
    e.preventDefault();
    post(`/article/${articleId}/comment`, {
      preserveScroll: true,
      onSuccess: () => reset('body'),
    });
  };

  return (
    <form onSubmit={submit} className="flex items-end gap-2">
      <div className="flex-1 bg-white dark:bg-[#1a1f2e] rounded-xl border border-black/10 dark:border-white/10 overflow-hidden focus-within:border-primary transition-colors">
        <div className="px-3 py-2 border-b border-black/5 dark:border-white/5 bg-gray-50 dark:bg-white/5">
           <span className="text-[10px] font-black uppercase text-gray-500">{__('Posting as:')} {data.username}</span>
        </div>
        <textarea 
          value={data.body}
          onChange={e => setData('body', e.target.value)}
          placeholder={__("Add a comment...")}
          className="w-full bg-transparent border-none focus:ring-0 text-sm p-3 resize-none text-black dark:text-white placeholder:text-gray-400"
          rows="2"
          required
        />
      </div>
      <button 
        type="submit" 
        disabled={processing || !data.body.trim()}
        className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 flex-shrink-0"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}

function ActionIcon({ icon: Icon, label, ariaLabel, delay, onClick, active }) {
  return (
    <motion.button
      type="button"
      aria-label={ariaLabel || String(label)}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center gap-2 group cursor-pointer"
      onClick={onClick}
    >
      <div className={`w-10 h-10 md:w-14 md:h-14 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 md:group-hover:bg-primary/80 md:group-hover:border-primary transition-colors shadow-lg ${active ? "bg-primary/90 border-primary" : ""}`}>
        <Icon className={`w-5 h-5 md:w-7 md:h-7 ${active ? "text-white fill-white" : "text-white"}`} />
      </div>
      <span className="text-[8px] md:text-[10px] font-black text-white drop-shadow-md uppercase tracking-widest">{label}</span>
    </motion.button>
  );
}
