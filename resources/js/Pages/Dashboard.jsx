import React, { useState, useEffect, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2, Plus, LogOut, CheckCircle2, Home, BarChart2, Star, Image as ImageIcon, UploadCloud, X, Layout, Zap, Search, ArrowRight } from 'lucide-react';
import AnalyticsChart from '@/Components/AnalyticsChart';

export default function Dashboard({ auth }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentArticleId, setCurrentArticleId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [isEditorsChoice, setIsEditorsChoice] = useState(false);
    const [coverImage, setCoverImage] = useState('');
    const [imagePrompt, setImagePrompt] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);

    // Auto-save mechanism
    useEffect(() => {
        if (!title && !content) return;
        const delayBounceFn = setTimeout(() => {
            handleSave(true);
        }, 3000);
        return () => clearTimeout(delayBounceFn);
    }, [title, content, isPublished, isEditorsChoice, coverImage, imagePrompt, tags]);

    const handleSave = async (silent = false) => {
        if (!title && !content) {
            if (!silent) toast.error('Empty narratives cannot be preserved.');
            return;
        }

        setIsSaving(true);
        try {
            const payload = {
                title,
                content,
                is_published: isPublished,
                is_editors_choice: isEditorsChoice,
                cover_image_path: coverImage,
                image_prompt: imagePrompt,
                tags: tags
            };
            if (currentArticleId) {
                await axios.put(`/articles/${currentArticleId}`, payload);
            } else {
                const res = await axios.post('/articles', payload);
                setCurrentArticleId(res.data.article.id);
            }
            if (!silent) toast.success('Narrative synced with cloud.');
        } catch (error) {
            if (!silent) toast.error('Cloud synchronization failed.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleGenerateBrief = async () => {
        if (!content) return toast.error('Context required for synthesis.');
        setIsGenerating(true);
        try {
            const res = await axios.post('/api/generate-brief', { content });
            setContent(content + '\n\n### AI Synthesis\n' + res.data.brief);
            toast.success('Intelligence synthesized.');
        } catch (error) {
            toast.error('Synthesis engine offline.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateSEO = async () => {
        if (!content) return toast.error('Content required for metadata extraction.');
        setIsGenerating(true);
        try {
            await axios.post('/api/generate-seo', { content });
            toast.success('Metadata optimized.');
            handleSave(true);
        } catch (error) {
            toast.error('Optimization failed.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0] || e.dataTransfer?.files?.[0];
        if (!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await axios.post('/upload-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setCoverImage(res.data.url);
            toast.success('Visual asset integrated.');
        } catch (error) {
            toast.error('Asset upload rejected.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleGenerateImagePrompt = async () => {
        if (!content || content.length < 50) return toast.error('Provide more context for visual prompting.');
        setIsGeneratingPrompt(true);
        try {
            const res = await axios.post('/api/generate-image-prompt', { content });
            setImagePrompt(res.data.prompt);
            toast.success('Visual prompt architected.');
        } catch (error) {
            toast.error('Prompt generation failed.');
        } finally {
            setIsGeneratingPrompt(false);
        }
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = tagInput.trim().toLowerCase();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setTagInput('');
        }
    };

    return (
        <div className="min-h-screen bg-[#02040a] text-white flex overflow-hidden font-sans selection:bg-primary/30">
            <Head title="AI Studio - Techy News" />

            {/* Premium Sidebar */}
            <aside className="w-20 md:w-72 border-r border-white/5 bg-[#02040a] flex flex-col items-center md:items-start py-10 px-6 justify-between sticky top-0 h-screen transition-all z-50">
                <div className="w-full">
                    <div className="flex items-center gap-3 mb-12 px-2">
                        <img src="/img/logo_wbc.png" alt="Studio" className="h-7 w-auto hidden md:block" />
                        <span className="hidden md:hidden text-2xl font-black tracking-tighter">S.</span>
                        <div className="md:hidden w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    <nav className="space-y-2 w-full">
                        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all group">
                            <Home className="w-5 h-5 group-hover:text-primary transition-colors" />
                            <span className="hidden md:block font-bold text-sm uppercase tracking-widest">Live View</span>
                        </Link>
                        <button onClick={() => { setCurrentArticleId(null); setTitle(''); setContent(''); setCoverImage(''); setImagePrompt(''); setTags([]); setIsPublished(false); setIsEditorsChoice(false); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all w-full group">
                            <Plus className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                            <span className="hidden md:block font-bold text-sm uppercase tracking-widest">New Story</span>
                        </button>
                    </nav>
                </div>

                <div className="w-full pt-8 border-t border-white/5 px-2">
                    <div className="hidden md:flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-sm">
                            {auth.user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black uppercase tracking-widest text-white">{auth.user.name}</span>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight truncate w-32">{auth.user.email}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-2">Classification Tags</label>
                        <div className="flex flex-wrap gap-2 mb-2 px-2">
                            {tags.map(tag => (
                                <span key={tag} className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter text-gray-400 group-hover:text-white transition-colors">
                                    #{tag}
                                    <button onClick={() => setTags(tags.filter(t => t !== tag))} className="hover:text-red-500 transition-colors"><X className="w-3 h-3" /></button>
                                </span>
                            ))}
                        </div>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Add identifiers..."
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-xs font-bold text-gray-300 placeholder-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagKeyDown}
                            />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Studio Workspace */}
            <main className="flex-1 flex flex-col overflow-y-auto w-full relative bg-[#02040a]">

                {/* Unified Studio Header */}
                <header className="sticky top-0 z-[60] bg-[#02040a]/80 backdrop-blur-2xl border-b border-white/5 px-10 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            {isSaving ? (
                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            ) : (
                                <CheckCircle2 className="w-4 h-4 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
                            )}
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                {isSaving ? 'Synchronizing' : 'Cloud Preserved'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsEditorsChoice(!isEditorsChoice)}
                            className={`p-2.5 rounded-xl transition-all border ${isEditorsChoice ? 'bg-primary/20 text-primary border-primary/50 shadow-[0_0_20px_rgba(43,124,238,0.2)]' : 'bg-transparent text-gray-600 border-white/5 hover:text-white hover:border-white/10'}`}
                            title="Editor's Choice"
                        >
                            <Star className={`w-5 h-5 ${isEditorsChoice ? 'fill-current' : ''}`} />
                        </button>

                        <button
                            onClick={handleGenerateSEO}
                            disabled={isGenerating}
                            className="text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/5 px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-50"
                        >
                            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Optimize Metadata'}
                        </button>

                        <button
                            onClick={() => { setIsPublished(!isPublished); handleSave(false); }}
                            className={`text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all shadow-xl ${isPublished ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/30' : 'bg-white text-black hover:scale-105 active:scale-95'}`}
                        >
                            {isPublished ? 'Retract' : 'Broadcast'}
                        </button>
                    </div>
                </header>

                <div className="flex-1 p-10 md:p-20 max-w-6xl mx-auto w-full flex flex-col gap-12">

                    {/* Visual Asset Integration */}
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { e.preventDefault(); handleImageUpload(e); }}
                        className={`relative w-full rounded-[2.5rem] border-2 border-dashed transition-all overflow-hidden group ${coverImage ? 'border-transparent aspect-video' : 'border-white/5 hover:border-primary/30 bg-white/[0.02] h-48 flex items-center justify-center cursor-pointer'}`}
                        onClick={() => !coverImage && document.getElementById('cover-image-upload').click()}
                    >
                        {coverImage ? (
                            <>
                                <img src={coverImage} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex items-center justify-center gap-6">
                                    <button onClick={(e) => { e.stopPropagation(); setCoverImage(''); }} className="bg-red-500/20 text-red-400 border border-red-500/50 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Remove Visual</button>
                                    <button onClick={(e) => { e.stopPropagation(); document.getElementById('cover-image-upload').click(); }} className="bg-white/10 text-white border border-white/20 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">Replace Asset</button>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center text-gray-700 group-hover:text-primary transition-colors">
                                <UploadCloud className="w-10 h-10 mb-3" />
                                <span className="font-black text-[10px] uppercase tracking-[0.2em]">{isUploading ? 'Integrating...' : 'Drop Visual Asset'}</span>
                            </div>
                        )}
                        <input type="file" id="cover-image-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] flex items-center gap-2 px-2">
                                <ImageIcon className="w-3 h-3" /> Neural Visual Prompt
                            </label>
                            <button onClick={handleGenerateImagePrompt} disabled={isGeneratingPrompt || !content} className="text-[10px] font-black text-primary hover:text-white transition-colors uppercase tracking-widest px-2 group">
                                {isGeneratingPrompt ? 'Synthesizing...' : 'Architect Prompt'}
                                <ArrowRight className="w-3 h-3 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Construct the visual identity of this narrative..."
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-xs font-bold text-gray-400 placeholder-gray-800 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                            value={imagePrompt}
                            onChange={(e) => setImagePrompt(e.target.value)}
                        />
                    </div>

                    <div className="space-y-8">
                        <input
                            type="text"
                            placeholder="Define the Title."
                            className="w-full bg-transparent border-none text-6xl md:text-8xl font-black tracking-tighter text-white placeholder-white/5 outline-none focus:ring-0 p-0 leading-[0.9]"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <div className="relative flex flex-col min-h-[400px]">
                            <textarea
                                placeholder="Commence the synthesis... Use Markdown for structural clarity."
                                className="w-full flex-1 bg-transparent border-none text-xl leading-relaxed text-gray-400 placeholder-white/5 outline-none focus:ring-0 resize-none font-light p-0 custom-scrollbar"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />

                            <AnimatePresence>
                                {content.length > 50 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="absolute bottom-6 right-0">
                                        <button onClick={handleGenerateBrief} disabled={isGenerating} className="bg-primary/10 text-primary border border-primary/30 backdrop-blur-xl px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-all flex items-center gap-3 shadow-2xl disabled:opacity-50">
                                            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                                            AI Synthesis
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="mt-20 pt-20 border-t border-white/5">
                        <h2 className="text-3xl font-black tracking-tighter mb-10 flex items-center gap-4">
                            <BarChart2 className="w-8 h-8 text-primary" /> Metrics & Engagement.
                        </h2>
                        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
                            <AnalyticsChart />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
