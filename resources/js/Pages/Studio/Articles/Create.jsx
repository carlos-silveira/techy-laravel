import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import StudioLayout from '@/Layouts/StudioLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Newspaper,
  Check,
  RefreshCw,
  Loader2,
  ArrowRight,
  Globe,
  Tag,
  Share2,
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const WIZARD_STEPS = ['Discover', 'Generate', 'Review', 'Publish'];

export default function ArticlesCreate() {
  const [step, setStep] = useState(0);
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [customTitle, setCustomTitle] = useState('');
  const [draft, setDraft] = useState('');
  const [meta, setMeta] = useState({ meta_description: '', seo_keywords: '', summary: '', tags: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Fetch trending ideas on load
  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/generate-ideas');
      setIdeas(res.data);
    } catch (err) {
      toast.error('Failed to fetch trending topics');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectIdea = (idea) => {
    setSelectedIdea(idea);
    generateDraft(idea.prompt || idea.title);
  };

  const handleUseCustomTitle = () => {
    if (!customTitle.trim()) return;
    const idea = { title: customTitle, prompt: customTitle, source: 'Custom' };
    setSelectedIdea(idea);
    generateDraft(customTitle);
  };

  const generateDraft = async (prompt) => {
    setStep(1);
    setIsLoading(true);
    try {
      const res = await axios.post('/api/generate-draft', { topic: prompt });
      setDraft(res.data.draft);
      setStep(2);
      generateMeta(res.data.draft);
    } catch (err) {
      toast.error('Failed to generate draft.');
      setStep(0);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMeta = async (draftContent) => {
    try {
      const res = await axios.post('/api/generate-article-meta', {
        title: selectedIdea?.title || customTitle,
        content: draftContent,
      });
      setMeta(res.data);
    } catch (err) {
      console.error('Meta generation failed');
    }
  };

  const regenerateDraft = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/regenerate-draft', {
        currentDraft: draft,
        feedback: feedback || 'Make it more detailed, insightful, and technical.',
      });
      setDraft(res.data.draft);
      toast.success('Draft updated with your feedback!');
      setFeedback('');
    } catch (err) {
      toast.error('Regeneration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/articles', {
        title: selectedIdea?.title || customTitle,
        content: draft,
        is_published: true,
        is_editors_choice: true,
        meta_description: meta.meta_description,
        seo_keywords: meta.seo_keywords,
        ai_summary: meta.summary,
        tags: meta.tags || [],
      });
      toast.success('🚀 Published! Article is live.');
      router.visit(`/studio/articles/${res.data.article.id}/edit`);
    } catch (err) {
      toast.error('Publishing failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const sanitizeForPreview = (html) => {
    if (!html) return '';
    let content = html;
    try {
      const parsed = JSON.parse(content);
      if (typeof parsed === 'string') content = parsed;
    } catch {}
    return content.replace(/\\\//g, '/').replace(/^"|"$/g, '');
  };

  return (
    <StudioLayout>
      <Head title="AI Article Writer — Studio" />

      {/* Progress Bar Header */}
      <div className="sticky top-16 z-20 bg-[#02040a]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          {WIZARD_STEPS.map((name, i) => (
            <React.Fragment key={name}>
              <div
                className={`flex items-center gap-2 transition-all ${
                  i < step ? 'text-emerald-400' : i === step ? 'text-primary' : 'text-gray-600'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    i < step
                      ? 'bg-emerald-500/20 border border-emerald-500/30'
                      : i === step
                      ? 'bg-primary/20 border border-primary/30 shadow-lg shadow-primary/20 text-white'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">
                  {name}
                </span>
              </div>
              {i < WIZARD_STEPS.length - 1 && (
                <div
                  className={`flex-1 h-[2px] rounded-full transition-all ${
                    i < step ? 'bg-emerald-500/30' : 'bg-white/5'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* STEP 0: DISCOVER */}
          {step === 0 && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              <div>
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Newspaper className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Step 1 of 4</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2">
                  What's the story?
                </h1>
                <p className="text-gray-400 font-light text-base">
                  Pick a trending tech topic or write your own custom concept.
                </p>
              </div>

              {/* Custom Input */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleUseCustomTitle()}
                  placeholder="Type your own topic or headline..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white placeholder-gray-600 focus:border-primary/50 outline-none transition-all"
                />
                <button
                  onClick={handleUseCustomTitle}
                  className="px-6 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 shrink-0"
                >
                  Generate Draft
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  OR PICK A TRENDING CONCEPT
                </span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              {/* Trending Ideas List */}
              {isLoading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-3">
                  {ideas.map((idea, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleSelectIdea(idea)}
                      whileHover={{ scale: 1.01, x: 4 }}
                      className="w-full text-left p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all group flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                          {idea.source || 'Trending'}
                        </span>
                        <h3 className="text-base font-black text-white group-hover:text-primary transition-colors mt-2">
                          {idea.title}
                        </h3>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 1: GENERATING */}
          {step === 1 && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary animate-bounce">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black tracking-tighter text-white">
                Drafting your narrative...
              </h2>
              <p className="text-sm font-light text-gray-400 max-w-md mx-auto">
                Gemini 2.0 AI is researching facts, structuring sections, and synthesizing deep technical analysis.
              </p>
            </motion.div>
          )}

          {/* STEP 2: REVIEW & EDIT DRAFT */}
          {step === 2 && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block mb-2">
                  Step 3 of 4
                </span>
                <h1 className="text-4xl font-black tracking-tighter text-white">
                  Review & Refine Draft.
                </h1>
                <p className="text-sm font-light text-gray-400 mt-1">
                  Inspect the AI generated draft, request adjustments, or proceed to publishing metadata.
                </p>
              </div>

              {/* Regenerate with Feedback bar */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-3">
                <input
                  type="text"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Ask AI to change style, add details, or fix tone..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-white placeholder-gray-600 focus:border-primary/50 outline-none"
                />
                <button
                  onClick={regenerateDraft}
                  disabled={isLoading}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 shrink-0"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  Refine
                </button>
              </div>

              {/* Draft Content Preview */}
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 max-h-[50vh] overflow-y-auto prose prose-invert max-w-none text-gray-300">
                <div dangerouslySetInnerHTML={{ __html: sanitizeForPreview(draft) }} />
              </div>

              {/* Action buttons */}
              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setStep(0)}
                  className="px-6 py-3 rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  Start Over
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                  <span>Next: SEO & Publish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PUBLISH & META */}
          {step === 3 && (
            <motion.div
              key="publish"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 block mb-2">
                  Step 4 of 4
                </span>
                <h1 className="text-4xl font-black tracking-tighter text-white">
                  Metadata & Launch.
                </h1>
                <p className="text-sm font-light text-gray-400 mt-1">
                  Review the auto-generated SEO metadata before broadcasting live.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={selectedIdea?.title || customTitle}
                    readOnly
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                    Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={meta.meta_description}
                    onChange={(e) => setMeta({ ...meta, meta_description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-medium text-white focus:border-primary/50 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                    SEO Keywords
                  </label>
                  <input
                    type="text"
                    value={meta.seo_keywords}
                    onChange={(e) => setMeta({ ...meta, seo_keywords: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white focus:border-primary/50 outline-none"
                  />
                </div>

                {meta.tags && meta.tags.length > 0 && (
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                      Generated Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {meta.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all"
                >
                  Back to Review
                </button>
                <button
                  onClick={handlePublish}
                  disabled={isLoading}
                  className="px-8 py-4 rounded-xl bg-emerald-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Broadcast Live Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StudioLayout>
  );
}
