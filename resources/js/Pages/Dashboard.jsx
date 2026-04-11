import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { 
    Loader2, Plus, LogOut, CheckCircle2, Home, BarChart2, Star, 
    Image as ImageIcon, UploadCloud, X, Layout, Zap, Search, 
    ArrowRight, Info, Edit3, Trash2, FileText, Clock, Eye,
    ChevronLeft, Sparkles, Globe, FileEdit, Save, ShieldCheck,
    Lightbulb, RefreshCw, MessageSquare, Send, Copy, ChevronRight,
    Cpu, Wand2, RotateCcw, ThumbsUp, ThumbsDown, Rocket, 
    ArrowLeft, Check, ChevronDown, Newspaper
} from 'lucide-react';
import AnalyticsChart from '@/Components/AnalyticsChart';
import RichEditor from '@/Components/RichEditor';
import ThemeToggle from '@/Components/ThemeToggle';
import RagCopilot from '@/Components/RagCopilot';
import GeminiUsage from '@/Components/GeminiUsage';

/* ──────────────────────────────────────────────
   WIZARD STEPS COMPONENT — No-code guided flow
   ────────────────────────────────────────────── */
const WIZARD_STEPS = ['Discover', 'Generate', 'Review', 'Publish'];

function WizardView({ onComplete, onSwitchToEditor }) {
    const [step, setStep] = useState(0);
    const [ideas, setIdeas] = useState([]);
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [customTitle, setCustomTitle] = useState('');
    const [draft, setDraft] = useState('');
    const [meta, setMeta] = useState({ summary: '', meta_description: '', seo_keywords: '', tags: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    // Step 1: Discover
    const fetchIdeas = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/api/generate-ideas');
            setIdeas(res.data.ideas || []);
            toast.success('Found trending stories!');
        } catch (err) {
            const msg = err?.response?.data?.error || 'Could not fetch trending stories.';
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const pickIdea = (idea) => {
        setSelectedIdea(idea);
        setStep(1);
        generateDraft(idea.title, idea.prompt);
    };

    const useCustomTitle = () => {
        if (!customTitle.trim()) return toast.error('Please type a topic first.');
        const idea = { title: customTitle, prompt: `Write an in-depth article about: ${customTitle}` };
        setSelectedIdea(idea);
        setStep(1);
        generateDraft(idea.title, idea.prompt);
    };

    // Step 2: Generate
    const generateDraft = async (title, prompt) => {
        setIsLoading(true);
        setDraft('');
        try {
            const res = await axios.post('/api/generate-draft', { title, prompt });
            setDraft(res.data.draft || '');
            
            if (res.data.title) {
                setSelectedIdea(prev => ({ ...prev, title: res.data.title }));
            }
            if (res.data.summary) {
                setMeta(prev => ({
                    ...prev,
                    summary: res.data.summary,
                    meta_description: res.data.summary.substring(0, 155),
                    image_prompt: res.data.image_prompt || '',
                    tags: res.data.category ? [res.data.category] : []
                }));
            }

            setStep(2);
            toast.success('Article ready for review!');
        } catch (err) {
            const msg = err?.response?.data?.error || 'Generation failed. Try again.';
            toast.error(msg);
            setStep(0);
        } finally {
            setIsLoading(false);
        }
    };

    // Step 3: Regenerate
    const regenerate = async () => {
        setIsLoading(true);
        setShowFeedback(false);
        try {
            const res = await axios.post('/api/regenerate-draft', { 
                title: selectedIdea.title, 
                prompt: selectedIdea.prompt,
                feedback: feedback || 'Make it better, more engaging.',
                previous_draft: draft
            });
            setDraft(res.data.draft || '');
            setFeedback('');
            toast.success('Regenerated!');
        } catch (err) {
            const msg = err?.response?.data?.error || 'Regeneration failed.';
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const approve = async () => {
        setIsLoading(true);
        try {
            // Generate metadata
            const res = await axios.post('/api/generate-article-meta', { 
                title: selectedIdea.title, 
                content: draft 
            });
            setMeta(prev => ({
                ...prev,
                ...res.data.meta,
                summary: prev.summary || res.data.meta.summary
            }));
            setStep(3);
        } catch {
            // Fallback meta
            setMeta(prev => ({ 
                ...prev,
                summary: prev.summary || draft.replace(/<[^>]*>/g, '').substring(0, 200),
                meta_description: prev.meta_description || draft.replace(/<[^>]*>/g, '').substring(0, 155),
                seo_keywords: '',
                tags: []
            }));
            setStep(3);
        } finally {
            setIsLoading(false);
        }
    };

    // Step 4: Publish
    const publish = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post('/articles', {
                title: selectedIdea.title,
                content: draft,
                is_published: true,
                is_editors_choice: true,
                meta_description: meta.meta_description,
                seo_keywords: meta.seo_keywords,
                tags: meta.tags || [],
            });
            toast.success('🚀 Published! Your article is now live.');
            onComplete(res.data.article);
        } catch {
            toast.error('Publishing failed.');
        } finally {
            setIsLoading(false);
        }
    };

    // Clean HTML for preview
    const sanitizeForPreview = (html) => {
        if (!html) return '';
        let content = html;
        try { const parsed = JSON.parse(content); if (typeof parsed === 'string') content = parsed; } catch {}
        content = content.replace(/\\\//g, '/').replace(/^"|"$/g, '');
        return content;
    };

    return (
        <div className="flex-1 overflow-y-auto">
            {/* Step Progress Bar */}
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#02040a]/90 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 px-4 sm:px-10 py-6 transition-colors duration-500">
                <div className="max-w-3xl mx-auto flex items-center gap-2 sm:gap-3">
                    {WIZARD_STEPS.map((name, i) => (
                        <React.Fragment key={name}>
                            <div className={`flex items-center gap-2 transition-all ${
                                i < step ? 'text-emerald-400' : i === step ? 'text-primary' : 'text-gray-700'
                            }`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                                    i < step ? 'bg-emerald-500/20 border border-emerald-500/30' : 
                                    i === step ? 'bg-primary/20 border border-primary/30 shadow-lg shadow-primary/10' : 
                                    'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10'
                                }`}>
                                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">{name}</span>
                            </div>
                            {i < WIZARD_STEPS.length - 1 && (
                                <div className={`flex-1 h-[2px] rounded-full transition-all ${i < step ? 'bg-emerald-500/30' : 'bg-black/5 dark:bg-white/5'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    <ThemeToggle />
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-10 py-10 sm:py-16">
                <AnimatePresence mode="wait">
                    {/* ─── STEP 1: DISCOVER ─── */}
                    {step === 0 && (
                        <motion.div key="discover" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10">
                            <div>
                                <div className="flex items-center gap-3 text-primary mb-4">
                                    <Newspaper className="w-5 h-5" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Step 1 of 4</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-3">What's the story?</h1>
                                <p className="text-gray-500 text-lg">Pick a trending topic or type your own idea.</p>
                            </div>

                            {/* Custom topic input */}
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={customTitle}
                                    onChange={(e) => setCustomTitle(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && useCustomTitle()}
                                    placeholder="Type your own topic..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-primary/50 outline-none transition-all placeholder-gray-700"
                                />
                                <button onClick={useCustomTitle} className="px-6 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-primary/80 transition-all shadow-lg shadow-primary/20">
                                    Use This
                                </button>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="flex-1 h-px bg-white/5" />
                                <span className="text-[10px] font-black uppercase tracking-widest">or pick a trending story</span>
                                <div className="flex-1 h-px bg-white/5" />
                            </div>

                            {ideas.length === 0 ? (
                                <button 
                                    onClick={fetchIdeas} 
                                    disabled={isLoading}
                                    className="w-full py-8 rounded-3xl border-2 border-dashed border-white/10 hover:border-primary/30 transition-all flex flex-col items-center gap-4 group"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                            <span className="text-sm font-bold text-gray-500">Scanning TechCrunch, The Verge, Ars Technica, Hacker News...</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Search className="w-8 h-8 text-primary" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">🔍 Find Trending Stories</span>
                                            <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">Click to scan 4 news sources</span>
                                        </>
                                    )}
                                </button>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{ideas.length} angles found</span>
                                        <button onClick={fetchIdeas} disabled={isLoading} className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                                            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
                                        </button>
                                    </div>
                                    {ideas.map((idea, idx) => (
                                        <button 
                                            key={idx} 
                                            onClick={() => pickIdea(idea)} 
                                            className="w-full text-left p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-white/[0.05] transition-all group"
                                        >
                                            <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors mb-2">{idea.title}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">{idea.prompt}</p>
                                            <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Wand2 className="w-3 h-3" /> Click to generate article <ArrowRight className="w-3 h-3" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* ─── STEP 2: GENERATING ─── */}
                    {step === 1 && (
                        <motion.div key="generating" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center justify-center py-32 space-y-8">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center animate-pulse">
                                    <Wand2 className="w-12 h-12 text-primary" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center animate-bounce">
                                    <Sparkles className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <div className="text-center">
                                <h2 className="text-3xl font-black text-white mb-3">Techy AI is writing...</h2>
                                <p className="text-gray-500 text-sm">Crafting a daily.dev-quality article on</p>
                                <p className="text-primary font-bold mt-1">"{selectedIdea?.title}"</p>
                            </div>
                            <div className="flex gap-2">
                                {[0, 1, 2].map(i => (
                                    <div key={i} className="w-3 h-3 rounded-full bg-primary/30 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ─── STEP 3: REVIEW ─── */}
                    {step === 2 && (
                        <motion.div key="review" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                            <div>
                                <div className="flex items-center gap-3 text-primary mb-4">
                                    <Eye className="w-5 h-5" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Step 3 of 4</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-3">Review your article</h1>
                                <p className="text-gray-500 text-lg">Read through it. Approve to publish, or regenerate with feedback.</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button 
                                    onClick={approve} 
                                    disabled={isLoading}
                                    className="flex-1 py-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black text-sm uppercase tracking-widest hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-3"
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ThumbsUp className="w-5 h-5" />}
                                    Approve & Continue
                                </button>
                                <button 
                                    onClick={() => setShowFeedback(!showFeedback)}
                                    className="flex-1 py-5 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-black text-sm uppercase tracking-widest hover:bg-orange-500/20 transition-all flex items-center justify-center gap-3"
                                >
                                    <RotateCcw className="w-5 h-5" /> Regenerate
                                </button>
                            </div>

                            {/* Feedback Input (for regeneration) */}
                            <AnimatePresence>
                                {showFeedback && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10 space-y-4">
                                            <h4 className="text-sm font-black text-orange-400 uppercase tracking-widest">What should change?</h4>
                                            <textarea
                                                value={feedback}
                                                onChange={(e) => setFeedback(e.target.value)}
                                                placeholder="e.g. 'Make it shorter', 'Focus more on React', 'Use a funnier tone'..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:border-orange-500/30 outline-none transition-all resize-none h-24"
                                            />
                                            <button
                                                onClick={regenerate}
                                                disabled={isLoading}
                                                className="w-full py-3 rounded-xl bg-orange-500 text-white font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                                            >
                                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                                                Regenerate Now
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Article Preview */}
                            <div className="rounded-3xl border border-white/10 overflow-hidden bg-white/[0.02]">
                                <div className="px-8 py-6 border-b border-white/5 bg-white/[0.02]">
                                    <h2 className="text-2xl font-black text-white tracking-tight">{selectedIdea?.title}</h2>
                                    <div className="flex items-center gap-4 mt-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                        <span>Preview</span>
                                        <span className="w-1 h-1 bg-gray-800 rounded-full" />
                                        <span>{Math.ceil((draft || '').split(' ').length / 200)} min read</span>
                                    </div>
                                </div>
                                <div className="px-8 py-8 prose prose-invert prose-primary max-w-none prose-p:text-gray-400 prose-p:font-light prose-p:leading-relaxed prose-headings:font-black prose-headings:text-white prose-strong:text-white prose-code:text-emerald-400 prose-pre:bg-white/[0.03] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl">
                                    <div dangerouslySetInnerHTML={{ __html: sanitizeForPreview(draft) }} />
                                </div>
                            </div>

                            {/* Open in Advanced Editor */}
                            <button 
                                onClick={() => onSwitchToEditor(selectedIdea?.title || '', draft)}
                                className="w-full py-3 rounded-xl text-gray-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                <Edit3 className="w-3 h-3" /> Open in Advanced Editor instead
                            </button>
                        </motion.div>
                    )}

                    {/* ─── STEP 4: PUBLISH ─── */}
                    {step === 3 && (
                        <motion.div key="publish" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                            <div>
                                <div className="flex items-center gap-3 text-emerald-400 mb-4">
                                    <Rocket className="w-5 h-5" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Step 4 of 4</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-3">Ready to publish!</h1>
                                <p className="text-gray-500 text-lg">Review the details below and hit publish to go live.</p>
                            </div>

                            {/* Metadata Card */}
                            <div className="space-y-6 p-8 rounded-3xl bg-white/[0.03] border border-white/10">
                                <div>
                                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-2">Title</label>
                                    <h2 className="text-2xl font-black text-white">{selectedIdea?.title}</h2>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-2">Summary</label>
                                    <p className="text-sm text-gray-400 leading-relaxed">{meta.summary || 'Auto-generated summary'}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-2">SEO Description</label>
                                    <p className="text-xs text-gray-500">{meta.meta_description || 'Auto-generated'}</p>
                                </div>
                                {meta.tags && meta.tags.length > 0 && (
                                    <div>
                                        <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-3">Tags</label>
                                        <div className="flex flex-wrap gap-2">
                                            {meta.tags.map((tag, i) => (
                                                <span key={i} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Publish Button */}
                            <button
                                onClick={publish}
                                disabled={isLoading}
                                className="w-full py-6 rounded-2xl bg-gradient-to-r from-primary to-purple-600 text-white font-black text-lg uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3"
                            >
                                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Rocket className="w-6 h-6" />}
                                Publish to techynews.lat
                            </button>

                            {/* Go Back */}
                            <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl text-gray-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                                <ArrowLeft className="w-3 h-3" /> Back to review
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────────
   MAIN DASHBOARD COMPONENT
   ────────────────────────────────────────────── */
export default function Dashboard({ auth, articles: initialArticles, analytics }) {
    const [articles, setArticles] = useState(initialArticles || []);
    const [title, setTitle] = useState('');
    const [richContent, setRichContent] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentArticleId, setCurrentArticleId] = useState(null);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [isEditorsChoice, setIsEditorsChoice] = useState(false);
    const [coverImage, setCoverImage] = useState('');
    const [imagePrompt, setImagePrompt] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [seoKeywords, setSeoKeywords] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
    const [view, setView] = useState('wizard'); // 'wizard', 'list', or 'editor'
    
    // Trigger for Editor Reset
    const [editorResetKey, setEditorResetKey] = useState(0);

    // Chat State
    const [chatMessages, setChatMessages] = useState([
        { role: 'assistant', content: "Hello! I'm your Studio Assistant. How can I help you shape your narrative today? I can research trends, draft sections, or refine your copy." }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Auto-save mechanism
    useEffect(() => {
        if (!title && !richContent) return;
        const delayBounceFn = setTimeout(() => {
            handleSave(true);
        }, 5000);
        return () => clearTimeout(delayBounceFn);
    }, [title, richContent, isPublished, isEditorsChoice, coverImage, imagePrompt, tags, metaDescription, seoKeywords]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    const handleSave = async (silent = false, overridePublished = null) => {
        if (!title && !richContent) return;
        setIsSaving(true);
        try {
            const payload = {
                title: title || 'Untitled Story',
                content: typeof richContent === 'string' ? richContent : JSON.stringify(richContent),
                is_published: overridePublished !== null ? overridePublished : isPublished,
                is_editors_choice: isEditorsChoice,
                cover_image_path: coverImage,
                image_prompt: imagePrompt,
                meta_description: metaDescription,
                seo_keywords: seoKeywords,
                tags: tags
            };
            let res;
            if (currentArticleId) {
                res = await axios.put(`/articles/${currentArticleId}`, payload);
                setArticles(prev => prev.map(a => a.id === currentArticleId ? res.data.article : a));
            } else {
                res = await axios.post('/articles', payload);
                if (res.data.article && res.data.article.id) {
                    setCurrentArticleId(res.data.article.id);
                    setArticles(prev => [res.data.article, ...prev]);
                }
            }
            if (!silent) toast.success('Narrative synced.');
        } catch (error) {
            if (!silent) toast.error('Sync failed.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!chatInput.trim() || isChatLoading) return;

        const userMessage = chatInput;
        setChatInput('');
        setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsChatLoading(true);
        try {
            const history = chatMessages.map(m => ({ role: m.role, content: m.content }));
            const res = await axios.post('/api/studio-chat', { 
                message: userMessage,
                history: history,
                editor_context: {
                    title: title,
                    content: typeof richContent === 'string' ? richContent : JSON.stringify(richContent)
                }
            });
            
            const rawResponse = res.data.response;
            
            let cleanMessage = rawResponse;
            try {
                const start = rawResponse.indexOf('{');
                const end = rawResponse.lastIndexOf('}');
                if (start !== -1 && end !== -1) {
                    const jsonStr = rawResponse.substring(start, end + 1);
                    const cmd = JSON.parse(jsonStr);
                    if (cmd.update_editor) {
                        applyEditorUpdate(cmd.update_editor);
                        cleanMessage = cmd.message || "I've updated the editor for you.";
                    }
                }
            } catch (e) {}

            setChatMessages(prev => [...prev, { role: 'assistant', content: cleanMessage }]);
        } catch (error) {
            toast.error('Assistant is currently unavailable.');
        } finally {
            setIsChatLoading(false);
        }
    };

    const applyEditorUpdate = (update) => {
        if (update.title) setTitle(update.title);
        if (update.content) {
            setRichContent(update.content);
            setEditorResetKey(prev => prev + 1);
        }
        if (update.seo_description) setMetaDescription(update.seo_description);
        if (update.seo_keywords) setSeoKeywords(update.seo_keywords);
        toast.info('AI updated your draft.');
    };

    const pushToEditor = (content) => {
        if (confirm('Inject this into the editor?')) {
            setRichContent(content);
            setEditorResetKey(prev => prev + 1);
            toast.success('Injected.');
        }
    };

    const handleEdit = (article) => {
        setCurrentArticleId(article.id);
        setTitle(article.title);
        let contentToSet;
        try { contentToSet = JSON.parse(article.content); } catch (e) { contentToSet = article.content; }
        setRichContent(contentToSet);
        setIsPublished(article.status === 'published');
        setIsEditorsChoice(!!article.is_editors_choice);
        setCoverImage(article.cover_image_path || '');
        setImagePrompt(article.image_prompt || '');
        setMetaDescription(article.meta_description || '');
        setSeoKeywords(article.seo_keywords || '');
        setTags(article.tags || []);
        setEditorResetKey(prev => prev + 1);
        setView('editor');
    };

    const handleDelete = async (id) => {
        if (!confirm('Purge this narrative?')) return;
        try {
            await axios.delete(`/articles/${id}`);
            setArticles(prev => prev.filter(a => a.id !== id));
            if (currentArticleId === id) resetEditor();
            toast.success('Purged.');
        } catch (error) {
            toast.error('Purge failed.');
        }
    };

    const resetEditor = () => {
        setCurrentArticleId(null);
        setTitle('');
        setRichContent(null);
        setCoverImage('');
        setImagePrompt('');
        setTags([]);
        setIsPublished(false);
        setIsEditorsChoice(false);
        setMetaDescription('');
        setSeoKeywords('');
        setEditorResetKey(prev => prev + 1);
    };

    const handleGenerateSEO = async () => {
        if (!richContent) return toast.error('No content.');
        setIsGenerating(true);
        try {
            const res = await axios.post('/api/generate-seo', { content: JSON.stringify(richContent) });
            setMetaDescription(res.data.description);
            setSeoKeywords(res.data.keywords);
            toast.success('SEO Optimized.');
        } catch (error) {
            toast.error('Failed.');
        } finally {
            setIsGenerating(false);
        }
    };

    const [isDragging, setIsDragging] = useState(false);

    const handleImageUpload = async (e) => {
        let file;
        if (e.type === 'drop') {
            e.preventDefault();
            setIsDragging(false);
            file = e.dataTransfer.files?.[0];
        } else {
            file = e.target.files?.[0];
        }

        if (!file) return;
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file.');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await axios.post('/upload-image', formData);
            setCoverImage(res.data.url);
            toast.success('Visual added.');
        } catch (error) {
            toast.error('Upload failed.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleGenerateImagePrompt = async () => {
        if (!richContent) return toast.error('No content.');
        setIsGeneratingPrompt(true);
        try {
            const res = await axios.post('/api/generate-image-prompt', { content: JSON.stringify(richContent) });
            setImagePrompt(res.data.prompt);
            toast.success('Visual prompt ready.');
        } catch (error) {
            toast.error('Failed.');
        } finally {
            setIsGeneratingPrompt(false);
        }
    };

    const handleWizardComplete = (article) => {
        if (article) setArticles(prev => [article, ...prev]);
        setView('list');
    };

    const handleWizardToEditor = (wizardTitle, wizardDraft) => {
        resetEditor();
        setTitle(wizardTitle);
        setRichContent(wizardDraft);
        setEditorResetKey(prev => prev + 1);
        setView('editor');
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#02040a] text-gray-900 dark:text-white flex overflow-hidden font-sans selection:bg-primary/30 transition-colors duration-500 relative">
            <Head title="AI Studio" />

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {showMobileSidebar && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowMobileSidebar(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Main Sidebar */}
            <aside className={`fixed inset-y-0 left-0 transform ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-64 border-r border-black/5 dark:border-white/5 bg-white dark:bg-[#02040a] flex flex-col py-10 px-4 justify-between h-screen z-[70] transition-all duration-300 ease-in-out`}>
                <div className="w-full flex-1 overflow-y-auto no-scrollbar">
                    <div className="flex items-center justify-between mb-12 px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0 shadow-2xl">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-black text-lg tracking-tighter text-gray-900 dark:text-white uppercase">STUDIO</span>
                        </div>
                        <button onClick={() => setShowMobileSidebar(false)} className="md:hidden p-2 text-gray-400">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <nav className="space-y-2 w-full mb-10">
                        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all group">
                            <Home className="w-5 h-5 group-hover:text-primary" />
                            <span className="hidden md:block font-bold text-xs uppercase tracking-widest">Live View</span>
                        </Link>
                        <button onClick={() => setView('wizard')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full group text-left ${view === 'wizard' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'}`}>
                            <Wand2 className="w-5 h-5" />
                            <span className="hidden md:block font-bold text-xs uppercase tracking-widest">Quick Create</span>
                        </button>
                        <button onClick={() => setView('list')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full group text-left ${view === 'list' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'}`}>
                            <Layout className="w-5 h-5" />
                            <span className="hidden md:block font-bold text-xs uppercase tracking-widest">Archives</span>
                        </button>
                        <button onClick={() => setView('analytics')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full group text-left ${view === 'analytics' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'}`}>
                            <BarChart2 className="w-5 h-5" />
                            <span className="hidden md:block font-bold text-xs uppercase tracking-widest">Analytics</span>
                        </button>
                        <button onClick={() => { resetEditor(); setView('editor'); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full group text-left ${view === 'editor' && !currentArticleId ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-black/5 dark:bg-white/5 text-black dark:text-white'}`}>
                            <Edit3 className="w-5 h-5 text-primary" />
                            <span className="hidden md:block font-bold text-xs uppercase tracking-widest">Advanced Editor</span>
                        </button>
                    </nav>
                </div>

                <div className="px-4 py-6 border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-3 text-gray-400 dark:text-gray-600">
                        <Cpu className="w-4 h-4" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em]">Gemini 2.0 Flash</span>
                    </div>
                </div>
            </aside>

            {/* Primary Workspace */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Mobile Header Toggle */}
                <header className="md:hidden flex items-center justify-between px-6 h-16 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#02040a] z-40 shrink-0">
                    <button onClick={() => setShowMobileSidebar(true)} className="p-2 -ml-2 text-gray-600 dark:text-gray-400">
                        <Home className="w-6 h-6" />
                    </button>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{view}</span>
                    <div className="w-10"></div> {/* Spacer */}
                </header>

                <div className="flex-1 flex flex-row overflow-hidden relative">
                    {view === 'wizard' && (
                    <WizardView 
                        onComplete={handleWizardComplete} 
                        onSwitchToEditor={handleWizardToEditor}
                    />
                )}

                {view === 'list' && (
                    <div className="flex-1 overflow-y-auto p-10 md:p-24 max-w-6xl mx-auto w-full">
                        <div className="mb-20">
                            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Central Archives</h3>
                            <h2 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white">Narrative Repository.</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {articles.map((article, i) => (
                                <div key={article.id} onClick={() => handleEdit(article)} className="p-6 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl hover:border-primary/30 transition-all flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-2xl bg-black overflow-hidden flex-shrink-0 border border-black/5 dark:border-white/10">
                                            {article.cover_image_path && <img src={article.cover_image_path} className="w-full h-full object-cover" alt="" />}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xl text-gray-900 dark:text-white group-hover:text-primary transition-colors">{article.title}</h3>
                                            <div className="flex items-center gap-5 text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase mt-1.5">
                                                <span className={`px-2 py-0.5 rounded border ${article.status === 'published' ? 'text-primary border-primary/20 bg-primary/5' : 'text-gray-400 border-black/5 dark:border-white/5'}`}>{article.status}</span>
                                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {new Date(article.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(article.id); }} className="opacity-0 group-hover:opacity-100 p-4 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all"><Trash2 className="w-5 h-5" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'analytics' && (
                    <div className="flex-1 overflow-y-auto p-4 sm:p-10 md:p-24 max-w-6xl mx-auto w-full">
                        <div className="mb-10 sm:mb-20">
                            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Live Metrics</h3>
                            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-gray-900 dark:text-white">Analytics.</h2>
                        </div>
                        <AnalyticsChart analyticsData={analytics} />
                        <GeminiUsage usageData={analytics.rawGeminiLogs} />
                    </div>
                )}

                {view === 'editor' && (
                    <>
                        {/* Editor Column */}
                        <div className="flex-1 flex flex-col border-r border-black/5 dark:border-white/5 overflow-y-auto no-scrollbar">
                            <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#02040a]/80 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 px-10 h-20 flex items-center justify-between transition-colors duration-500">
                                <div className="flex items-center gap-6">
                                    <button onClick={() => setView('list')} className="p-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl transition-all"><ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" /></button>
                                    <div className="flex flex-col">
                                        <h4 className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Advanced Editor</h4>
                                        <h2 className="text-sm font-black text-gray-900 dark:text-white truncate max-w-[200px]">{title || 'Untitled'}</h2>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ThemeToggle />
                                    <button onClick={handleGenerateSEO} className="p-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl transition-all" title="Optimize SEO"><Sparkles className="w-4 h-4 text-purple-400" /></button>
                                    <button onClick={() => { const next = !isPublished; setIsPublished(next); handleSave(false, next); }} className={`px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isPublished ? 'bg-red-500/10 text-red-500' : 'bg-primary text-white shadow-xl shadow-primary/20'}`}>{isPublished ? 'Retract' : 'Broadcast'}</button>
                                </div>
                            </header>

                            <div className="p-10 md:p-16 max-w-4xl mx-auto w-full flex flex-col gap-10">
                                <div className="space-y-6">
                                    <input type="text" placeholder="Narrative Title." className="w-full bg-transparent border-none text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white placeholder-black/10 dark:placeholder-white/[0.03] focus:ring-0 p-0" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    <div 
                                        className={`relative w-full rounded-3xl border-2 border-dashed overflow-hidden group transition-all duration-300 ${
                                            coverImage ? 'border-transparent aspect-video' : 
                                            isDragging ? 'border-primary bg-primary/5 scale-[1.01]' : 
                                            'border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] h-48 flex items-center justify-center cursor-pointer hover:border-black/20 dark:hover:border-white/20'
                                        }`} 
                                        onClick={() => !coverImage && document.getElementById('cover-image-upload').click()}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleImageUpload}
                                    >
                                        {coverImage ? (
                                            <>
                                                <img src={coverImage} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); setCoverImage(''); }}
                                                        className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 pointer-events-none">
                                                {isUploading ? (
                                                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                                ) : (
                                                    <ImageIcon className={`w-8 h-8 ${isDragging ? 'text-primary' : 'text-gray-800'}`} />
                                                )}
                                                <span className={`text-[10px] font-black uppercase ${isDragging ? 'text-primary' : 'text-gray-700'}`}>
                                                    {isDragging ? 'Drop to Upload' : 'Cover Asset'}
                                                </span>
                                            </div>
                                        )}
                                        <input type="file" id="cover-image-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </div>
                                    <RichEditor initialContent={richContent} onChange={(val) => setRichContent(val)} keyTrigger={editorResetKey} />
                                </div>
                            </div>
                        </div>

                        {/* Chat Assistant Column */}
                        <div className="w-[450px] flex flex-col bg-black/[0.01] dark:bg-white/[0.01] relative">
                            <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-white dark:bg-[#02040a]/50">
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    <h3 className="font-black text-xs uppercase tracking-widest">Studio Assistant</h3>
                                </div>
                                <Cpu className="w-4 h-4 text-gray-700" title="Gemini Session" />
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                                {chatMessages.map((msg, idx) => (
                                    <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[95%] p-4 rounded-2xl text-xs leading-relaxed transition-all duration-300 ${
                                            msg.role === 'user' 
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                            : 'bg-black/5 dark:bg-white/5 text-gray-900 dark:text-gray-300 border border-black/5 dark:border-white/5'
                                        }`}>
                                            {msg.role === 'assistant' ? (
                                                <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }} />
                                            ) : (
                                                <p>{msg.content}</p>
                                            )}
                                        </div>
                                        {msg.role === 'assistant' && msg.content.length > 100 && (
                                            <button onClick={() => pushToEditor(msg.content)} className="mt-2 flex items-center gap-2 text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors px-2">
                                                <Copy className="w-3 h-3" /> Push result to editor
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {isChatLoading && (
                                    <div className="flex items-center gap-3 text-gray-600 animate-pulse">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Analyzing context...</span>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            <form onSubmit={handleSendMessage} className="p-6 bg-white dark:bg-[#02040a] border-t border-black/5 dark:border-white/5 transition-colors duration-500">
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        value={chatInput} 
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Command your assistant..." 
                                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl pl-6 pr-14 py-4 text-xs font-bold text-gray-900 dark:text-white focus:border-primary/50 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-700"
                                    />
                                    <button type="submit" disabled={isChatLoading} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-50">
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-[8px] text-gray-400 dark:text-gray-700 font-bold uppercase mt-3 text-center tracking-widest">Multi-turn journalistic session active</p>
                            </form>
                        </div>
                    </>
                )}
            </main>
            <RagCopilot />
        </div>
    );
}
