import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import StudioLayout from '@/Layouts/StudioLayout';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Zap,
  Globe,
  Share2,
  Server,
  ShieldAlert,
  Save,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

export default function SettingsIndex({ settings }) {
  const [activeTab, setActiveTab] = useState('general');
  const [siteName, setSiteName] = useState(settings.site_name || 'TechyNews');
  const [siteUrl, setSiteUrl] = useState(settings.site_url || 'https://techynews.lat');
  const [locale, setLocale] = useState(settings.default_locale || 'es');
  const [aiModel, setAiModel] = useState(settings.ai_primary_model || 'gemini-2.0-flash');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'ai', label: 'AI Engine', icon: Zap },
    { id: 'seo', label: 'SEO Defaults', icon: SettingsIcon },
    { id: 'deployment', label: 'Deployment', icon: Server },
    { id: 'danger', label: 'Danger Zone', icon: ShieldAlert, danger: true },
  ];

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await axios.post('/studio/settings', { siteName, siteUrl, locale, aiModel });
      toast.success('Configuration saved!');
    } catch (err) {
      toast.error('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <StudioLayout>
      <Head title="Settings — Studio" />

      <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div>
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Configuration
          </h3>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
            Settings.
          </h1>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Vertical Tabs Sub-sidebar */}
          <div className="lg:col-span-3 bg-white/[0.02] border border-white/5 rounded-3xl p-3 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-left ${
                    tab.danger
                      ? isActive
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'text-rose-400/70 hover:text-rose-400 hover:bg-rose-500/10'
                      : isActive
                      ? 'bg-primary/10 text-primary border-l-2 border-primary shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Main Form Area */}
          <div className="lg:col-span-9 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 space-y-8">
            <form onSubmit={handleSave} className="space-y-8">
              {/* TAB 1: GENERAL */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-xl font-black text-white tracking-tight">
                      General Settings
                    </h3>
                    <p className="text-xs text-gray-500 font-light mt-1">
                      Configure basic site details, branding name, and default language.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-primary/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                        Site URL
                      </label>
                      <input
                        type="text"
                        value={siteUrl}
                        onChange={(e) => setSiteUrl(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-primary/50 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                        Default Language
                      </label>
                      <select
                        value={locale}
                        onChange={(e) => setLocale(e.target.value)}
                        className="w-full bg-[#02040a] border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-primary/50 outline-none"
                      >
                        <option value="es">Spanish (ES) — Primary</option>
                        <option value="en">English (EN)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: AI ENGINE */}
              {activeTab === 'ai' && (
                <div className="space-y-6">
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-xl font-black text-white tracking-tight">
                      AI Generation Engine
                    </h3>
                    <p className="text-xs text-gray-500 font-light mt-1">
                      Configure primary Gemini model and OpenRouter fallback options.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                        Primary AI Model
                      </label>
                      <select
                        value={aiModel}
                        onChange={(e) => setAiModel(e.target.value)}
                        className="w-full bg-[#02040a] border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-primary/50 outline-none"
                      >
                        <option value="gemini-2.0-flash">Google Gemini 2.0 Flash (Fastest / Low Cost)</option>
                        <option value="gemini-2.0-pro-exp-02-05">Google Gemini 2.0 Pro (High Intelligence)</option>
                      </select>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Zap className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-xs font-bold text-white">Gemini API Status</p>
                            <p className="text-[10px] font-medium text-gray-500">Configured via .env</p>
                          </div>
                        </div>
                        {settings.gemini_api_configured ? (
                          <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded uppercase tracking-widest">
                            Ready
                          </span>
                        ) : (
                          <span className="text-[9px] font-black text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded uppercase tracking-widest">
                            Key Missing
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SEO */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-xl font-black text-white tracking-tight">
                      SEO & Indexing
                    </h3>
                    <p className="text-xs text-gray-500 font-light mt-1">
                      Sitemap configuration and automated SEO generation rules.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">Dynamic XML Sitemap</p>
                        <p className="text-[10px] font-mono text-gray-500 mt-0.5">https://techynews.lat/sitemap.xml</p>
                      </div>
                      <a
                        href="/sitemap.xml"
                        target="_blank"
                        className="px-3 py-1.5 rounded-xl bg-white/5 text-xs font-black text-primary uppercase tracking-widest hover:bg-white/10"
                      >
                        View Sitemap
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: DEPLOYMENT */}
              {activeTab === 'deployment' && (
                <div className="space-y-6">
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-xl font-black text-white tracking-tight">
                      Deployment & Environment
                    </h3>
                    <p className="text-xs text-gray-500 font-light mt-1">
                      Server environment status and deployment pipeline logs.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">Environment</p>
                        <p className="text-[10px] font-mono text-gray-500 mt-0.5">{settings.environment}</p>
                      </div>
                      <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded uppercase tracking-widest">
                        Production Ready
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: DANGER ZONE */}
              {activeTab === 'danger' && (
                <div className="space-y-6">
                  <div className="border-b border-rose-500/20 pb-4">
                    <h3 className="text-xl font-black text-rose-400 tracking-tight flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> Danger Zone
                    </h3>
                    <p className="text-xs text-rose-300/70 font-light mt-1">
                      Destructive system maintenance actions. Proceed with caution.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-3">
                    <p className="text-xs font-bold text-rose-300">Cache Flush & Re-optimize</p>
                    <p className="text-[10px] font-light text-rose-200/70">
                      Clears route, view, and application cache.
                    </p>
                  </div>
                </div>
              )}

              {/* Save Footer */}
              <div className="pt-6 border-t border-white/5 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save Configuration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </StudioLayout>
  );
}
