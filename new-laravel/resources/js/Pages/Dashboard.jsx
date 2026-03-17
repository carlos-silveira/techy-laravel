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
    Cpu
} from 'lucide-react';
import AnalyticsChart from '@/Components/AnalyticsChart';
import RichEditor from '@/Components/RichEditor';

export default function Dashboard({ auth, articles: initialArticles }) {
    const [articles, setArticles] = useState(initialArticles || []);
    const [title, setTitle] = useState('');
    const [richContent, setRichContent] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentArticleId, setCurrentArticleId] = useState(null);
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
    const [view, setView] = useState('list'); // 'list' or 'editor'
    
    // Trigger for Editor Reset
    const [editorResetKey, setEditorResetKey] = useState(0);

    // Chat State
    const [chatMessages, setChatMessages] = useState([
        { role: 'assistant', content: "Hello! I'm your Studio Assistant. How can I help you shape your narrative today? I can research trends, draft sections, or refine your copy." }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Idea Generator State
    const [ideas, setIdeas] = useState([]);
    const [isFetchingIdeas, setIsFetchingIdeas] = useState(false);

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
            
            // Try to detect command JSON
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
            } catch (e) {
                // Not a command or malformed, just use raw
            }

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

    const fetchIdeas = async () => {
        setIsFetchingIdeas(true);
        try {
            const res = await axios.get('/api/generate-ideas');
            setIdeas(res.data.ideas);
            toast.success('Gathered latest trends.');
        } catch (error) {
            toast.error('Failed to fetch ideas.');
        } finally {
            setIsFetchingIdeas(false);
        }
    };

    const useIdea = async (idea) => {
        resetEditor();
        setTitle(idea.title);
        setView('editor');
        setRichContent('Researching and drafting based on real-time news...');
        setEditorResetKey(prev => prev + 1);
        try {
            const res = await axios.post('/api/generate-draft', { title: idea.title, prompt: idea.prompt });
            setRichContent(res.data.draft);
            setEditorResetKey(prev => prev + 1);
            toast.success('Draft ready.');
        } catch (error) {
            setRichContent(idea.prompt);
            setEditorResetKey(prev => prev + 1);
        }
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

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
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

    return (
        <div className="min-h-screen bg-[#02040a] text-white flex overflow-hidden font-sans selection:bg-primary/30">
            <Head title="AI Studio" />

            {/* Main Sidebar (Slim) */}
            <aside className="w-20 md:w-64 border-r border-white/5 bg-[#02040a] flex flex-col py-10 px-4 justify-between sticky top-0 h-screen z-50">
                <div className="w-full flex-1 overflow-y-auto no-scrollbar">
                    <div className="flex items-center gap-3 mb-12 px-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0 shadow-2xl">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <span className="hidden md:block font-black text-lg tracking-tighter text-white">STUDIO</span>
                    </div>

                    <nav className="space-y-2 w-full mb-10">
                        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all group">
                            <Home className="w-5 h-5 group-hover:text-primary" />
                            <span className="hidden md:block font-bold text-xs uppercase tracking-widest">Live View</span>
                        </Link>
                        <button onClick={() => setView('list')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full group text-left ${view === 'list' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-500 hover:text-white'}`}>
                            <Layout className="w-5 h-5" />
                            <span className="hidden md:block font-bold text-xs uppercase tracking-widest">Archives</span>
                        </button>
                        <button onClick={() => { resetEditor(); setView('editor'); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full group text-left ${view === 'editor' && !currentArticleId ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-white/5 text-white'}`}>
                            <Plus className="w-5 h-5 text-primary" />
                            <span className="hidden md:block font-bold text-xs uppercase tracking-widest">New Story</span>
                        </button>
                    </nav>

                    <div className="hidden md:block space-y-6 px-2">
                        <div className="flex items-center justify-between text-primary">
                            <div className="flex items-center gap-2"><Lightbulb className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">Trends</span></div>
                            <button onClick={fetchIdeas} disabled={isFetchingIdeas} className="hover:rotate-180 transition-all duration-500"><RefreshCw className={`w-3 h-3 ${isFetchingIdeas ? 'animate-spin' : ''}`} /></button>
                        </div>
                        <div className="space-y-3">
                            {ideas.map((idea, idx) => (
                                <button key={idx} onClick={() => useIdea(idea)} className="w-full text-left p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all group">
                                    <h4 className="text-[10px] font-black text-white group-hover:text-primary transition-colors leading-tight mb-1">{idea.title}</h4>
                                    <p className="text-[8px] text-gray-600 font-bold uppercase">Generate Draft →</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Model Info */}
                <div className="px-4 py-6 border-t border-white/5">
                    <div className="flex items-center gap-3 text-gray-600">
                        <Cpu className="w-4 h-4" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em]">Ollama Engine Ready</span>
                    </div>
                </div>
            </aside>

            {/* Primary Workspace */}
            <main className="flex-1 flex flex-row overflow-hidden relative">
                
                {view === 'list' ? (
                    <div className="flex-1 overflow-y-auto p-10 md:p-24 max-w-6xl mx-auto w-full">
                        <div className="mb-20">
                            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Central Archives</h3>
                            <h2 className="text-5xl font-black tracking-tighter text-white">Narrative Repository.</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {articles.map((article, i) => (
                                <div key={article.id} onClick={() => handleEdit(article)} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-primary/30 transition-all flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-2xl bg-black overflow-hidden flex-shrink-0 border border-white/10">
                                            {article.cover_image_path && <img src={article.cover_image_path} className="w-full h-full object-cover" alt="" />}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xl text-white group-hover:text-primary transition-colors">{article.title}</h3>
                                            <div className="flex items-center gap-5 text-[10px] font-black text-gray-600 uppercase mt-1.5">
                                                <span className={`px-2 py-0.5 rounded border ${article.status === 'published' ? 'text-primary border-primary/20 bg-primary/5' : 'text-gray-500 border-white/5'}`}>{article.status}</span>
                                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {new Date(article.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(article.id); }} className="opacity-0 group-hover:opacity-100 p-4 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all"><Trash2 className="w-5 h-5" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Editor Column */}
                        <div className="flex-1 flex flex-col border-r border-white/5 overflow-y-auto no-scrollbar">
                            <header className="sticky top-0 z-40 bg-[#02040a]/80 backdrop-blur-2xl border-b border-white/5 px-10 h-20 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <button onClick={() => setView('list')} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all"><ChevronLeft className="w-5 h-5" /></button>
                                    <div className="flex flex-col">
                                        <h4 className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Editor</h4>
                                        <h2 className="text-sm font-black text-white truncate max-w-[200px]">{title || 'Untitled'}</h2>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={handleGenerateSEO} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all" title="Optimize SEO"><Sparkles className="w-4 h-4 text-purple-400" /></button>
                                    <button onClick={() => { const next = !isPublished; setIsPublished(next); handleSave(false, next); }} className={`px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isPublished ? 'bg-red-500/10 text-red-500' : 'bg-primary text-white shadow-xl shadow-primary/20'}`}>{isPublished ? 'Retract' : 'Broadcast'}</button>
                                </div>
                            </header>

                            <div className="p-10 md:p-16 max-w-4xl mx-auto w-full flex flex-col gap-10">
                                <div className="space-y-6">
                                    <input type="text" placeholder="Narrative Title." className="w-full bg-transparent border-none text-5xl md:text-7xl font-black tracking-tighter text-white placeholder-white/[0.03] focus:ring-0 p-0" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    <div className={`relative w-full rounded-3xl border-2 border-dashed overflow-hidden group ${coverImage ? 'border-transparent aspect-video' : 'border-white/5 bg-white/[0.01] h-48 flex items-center justify-center cursor-pointer'}`} onClick={() => !coverImage && document.getElementById('cover-image-upload').click()}>
                                        {coverImage ? <img src={coverImage} className="w-full h-full object-cover" /> : <div className="flex flex-col items-center gap-2"><ImageIcon className="w-8 h-8 text-gray-800" /><span className="text-[10px] font-black text-gray-700 uppercase">Cover Asset</span></div>}
                                        <input type="file" id="cover-image-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </div>
                                    <RichEditor initialContent={richContent} onChange={(val) => setRichContent(val)} keyTrigger={editorResetKey} />
                                </div>
                            </div>
                        </div>

                        {/* Chat Assistant Column */}
                        <div className="w-[450px] flex flex-col bg-white/[0.01] relative">
                            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#02040a]/50">
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    <h3 className="font-black text-xs uppercase tracking-widest">Studio Assistant</h3>
                                </div>
                                <Cpu className="w-4 h-4 text-gray-700" title="Stateful Llama Session" />
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                                {chatMessages.map((msg, idx) => (
                                    <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[95%] p-4 rounded-2xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-white/5 text-gray-300 border border-white/5'}`}>
                                            {msg.role === 'assistant' ? (
                                                <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }} />
                                            ) : (
                                                <p>{msg.content}</p>
                                            )}
                                        </div>
                                        {msg.role === 'assistant' && msg.content.length > 100 && (
                                            <button onClick={() => pushToEditor(msg.content)} className="mt-2 flex items-center gap-2 text-[9px] font-black uppercase text-gray-500 hover:text-white transition-colors px-2">
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

                            <form onSubmit={handleSendMessage} className="p-6 bg-[#02040a] border-t border-white/5">
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        value={chatInput} 
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Command your assistant..." 
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-xs font-bold focus:border-primary/50 outline-none transition-all placeholder-gray-700"
                                    />
                                    <button type="submit" disabled={isChatLoading} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-50">
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-[8px] text-gray-700 font-bold uppercase mt-3 text-center tracking-widest">Multi-turn journalistic session active</p>
                            </form>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
