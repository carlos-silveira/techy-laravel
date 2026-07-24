import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import StudioLayout from '@/Layouts/StudioLayout';
import RichEditor from '@/Components/RichEditor';
import FactCheckPanel from '@/Components/FactCheckPanel';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Send,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Bot,
  CheckCircle2,
  Tag,
  Search,
  ChevronDown,
  ChevronUp,
  Loader2,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

export default function ArticlesEdit({ article }) {
  const [title, setTitle] = useState(article.title || '');
  const [content, setContent] = useState(article.content || '');
  const [status, setStatus] = useState(article.status || 'draft');
  const [coverImagePath, setCoverImagePath] = useState(article.cover_image_path || '');
  const [metaDescription, setMetaDescription] = useState(article.meta_description || '');
  const [seoKeywords, setSeoKeywords] = useState(article.seo_keywords || '');
  const [aiSummary, setAiSummary] = useState(article.ai_summary || '');
  const [tags, setTags] = useState(Array.isArray(article.tags) ? article.tags.join(', ') : '');

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState('assistant'); // assistant | factcheck | seo

  // Chat Assistant State
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: `Hello! I am your Studio Assistant. You can ask me to rewrite sections, generate SEO tags, change tone, or suggest titles for "${article.title}".`,
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);

  const sanitizeContent = (raw) => {
    if (!raw) return '';
    let c = String(raw);
    try {
      const parsed = JSON.parse(c);
      if (typeof parsed === 'string') c = parsed;
    } catch {}
    return c.replace(/\\\//g, '/').replace(/^"|"$/g, '');
  };

  const handleSave = async (targetStatus = status) => {
    setIsSaving(true);
    const parsedTags = tags.split(',').map((t) => t.trim()).filter(Boolean);
    try {
      const res = await axios.put(`/articles/${article.id}`, {
        title,
        content,
        status: targetStatus,
        cover_image_path: coverImagePath,
        meta_description: metaDescription,
        seo_keywords: seoKeywords,
        ai_summary: aiSummary,
        tags: parsedTags,
      });
      setStatus(targetStatus);
      toast.success(targetStatus === 'published' ? '🚀 Article published live!' : 'Draft saved successfully');
    } catch (err) {
      toast.error('Failed to save article.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await axios.post('/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setCoverImagePath(res.data.url);
      toast.success('Cover image uploaded!');
    } catch (err) {
      toast.error('Image upload failed.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isSendingChat) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsSendingChat(true);

    try {
      const res = await axios.post('/api/studio-chat', {
        message: userMessage,
        article: { title, content, metaDescription, tags },
      });

      const reply = res.data;
      if (reply.action === 'update_title' && reply.new_title) {
        setTitle(reply.new_title);
        toast.info('Title updated by Assistant');
      } else if (reply.action === 'update_content' && reply.new_content) {
        setContent(reply.new_content);
        toast.info('Content updated by Assistant');
      }

      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', text: reply.message || 'Done! Check the editor.' },
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Sorry, I hit an issue processing that instruction.' },
      ]);
    } finally {
      setIsSendingChat(false);
    }
  };

  return (
    <StudioLayout>
      <Head title={`Edit: ${article.title}`} />

      {/* Editor Header Bar */}
      <div className="sticky top-16 z-30 bg-[#02040a]/90 backdrop-blur-xl border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/studio/articles"
            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Archives
          </Link>
          <span className="text-gray-700">|</span>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">
            Advanced Editor
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/article/${article.slug}`}
            target="_blank"
            className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all text-xs"
            title="Preview Public Page"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>

          <button
            onClick={() => handleSave(status)}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save Draft
          </button>

          <button
            onClick={() => handleSave('published')}
            disabled={isSaving}
            className="px-5 py-2 rounded-xl bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            Broadcast Live
          </button>
        </div>
      </div>

      {/* Main 2-Column Workspace */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-8rem)]">
        {/* Left Editing Column */}
        <div className="flex-1 p-8 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
          {/* Title Editable Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article Title..."
            className="w-full bg-transparent border-none text-4xl md:text-5xl font-black tracking-tighter text-white placeholder-gray-700 focus:outline-none focus:ring-0 leading-tight"
          />

          {/* Cover Image Upload Area */}
          <div className="relative">
            {coverImagePath ? (
              <div className="relative rounded-3xl overflow-hidden border border-white/10 group h-64 bg-gray-900">
                <img
                  src={coverImagePath}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <label className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-black text-[10px] uppercase tracking-widest rounded-xl cursor-pointer transition-all">
                    Change Image
                    <input type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                  </label>
                  <button
                    onClick={() => setCoverImagePath('')}
                    className="p-2 bg-rose-500/20 text-rose-400 rounded-xl hover:bg-rose-500/30 border border-rose-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-44 rounded-3xl border-2 border-dashed border-white/10 hover:border-primary/40 bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors mb-2">
                  {isUploadingImage ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                  {isUploadingImage ? 'Uploading...' : 'Drop or select cover image'}
                </span>
                <input type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
              </label>
            )}
          </div>

          {/* TipTap Rich Editor */}
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6">
            <RichEditor
              content={sanitizeContent(content)}
              onChange={(newHtml) => setContent(newHtml)}
            />
          </div>
        </div>

        {/* Right Sidebar Assistant & Control Panel */}
        <div className="w-full lg:w-[380px] border-l border-white/5 bg-[#02040a] flex flex-col flex-shrink-0">
          {/* Panel Selector Tabs */}
          <div className="flex border-b border-white/5 bg-white/[0.01]">
            <button
              onClick={() => setActiveRightTab('assistant')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                activeRightTab === 'assistant'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              Assistant
            </button>

            <button
              onClick={() => setActiveRightTab('factcheck')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                activeRightTab === 'factcheck'
                  ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-400/5'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Fact-Check
            </button>

            <button
              onClick={() => setActiveRightTab('seo')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                activeRightTab === 'seo'
                  ? 'text-indigo-400 border-b-2 border-indigo-400 bg-indigo-400/5'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              SEO & Meta
            </button>
          </div>

          {/* Tab 1: Studio Assistant Chat */}
          {activeRightTab === 'assistant' && (
            <div className="flex-1 flex flex-col justify-between p-4 space-y-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed font-light ${
                        msg.role === 'user'
                          ? 'bg-primary text-white font-bold'
                          : 'bg-white/[0.03] border border-white/5 text-gray-300'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isSendingChat && (
                  <div className="flex items-center gap-2 text-xs text-primary font-bold p-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Assistant thinking...
                  </div>
                )}
              </div>

              <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-white/5">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Command assistant..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white placeholder-gray-600 focus:border-primary/50 outline-none"
                />
                <button
                  type="submit"
                  disabled={isSendingChat}
                  className="p-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Tab 2: Fact-Check Engine */}
          {activeRightTab === 'factcheck' && (
            <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
              <FactCheckPanel articleId={article.id} />
            </div>
          )}

          {/* Tab 3: SEO & Meta */}
          {activeRightTab === 'seo' && (
            <div className="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-hide">
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                  AI Summary
                </label>
                <textarea
                  rows={3}
                  value={aiSummary}
                  onChange={(e) => setAiSummary(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-medium text-white focus:border-primary/50 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-medium text-white focus:border-primary/50 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                  SEO Keywords
                </label>
                <input
                  type="text"
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-primary/50 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-primary/50 outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </StudioLayout>
  );
}
