import React from 'react';
import { Head, router } from '@inertiajs/react';
import StudioLayout from '@/Layouts/StudioLayout';
import AnalyticsChart from '@/Components/AnalyticsChart';
import GeminiUsage from '@/Components/GeminiUsage';
import { motion } from 'framer-motion';

export default function AnalyticsIndex(props) {
  const currentPeriod = new URLSearchParams(window.location.search).get('period') || '7d';

  const handlePeriodChange = (period) => {
    router.get('/studio/analytics', { period }, { preserveState: true, replace: true });
  };

  return (
    <StudioLayout>
      <Head title="Analytics — Studio" />

      <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-12">
        {/* Header & Period Toggles */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Live Metrics
            </h3>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
              Analytics.
            </h1>
          </div>

          {/* Period Toggles (Fully Dark) */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/5 p-1 rounded-2xl">
            {[
              { id: 'today', label: '24h' },
              { id: '7d', label: '7d' },
              { id: '30d', label: '30d' },
              { id: 'all', label: 'All' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => handlePeriodChange(p.id)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  currentPeriod === p.id
                    ? 'bg-white/10 text-white shadow-sm border border-white/10'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Traffic Analytics Suite */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-8">
          <AnalyticsChart {...props} />
        </div>

        {/* Gemini Token Usage */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
            AI Token Consumption Logs
          </h3>
          <GeminiUsage logs={props.geminiLogs || props.analytics?.rawGeminiLogs} totalCost={props.stats?.gemini_cost_7d || props.analytics?.summary?.totalGeminiCost} />
        </div>
      </div>
    </StudioLayout>
  );
}
