import React from 'react';
import { Head, Link } from '@inertiajs/react';
import StudioLayout from '@/Layouts/StudioLayout';
import { motion } from 'framer-motion';
import {
  FileText,
  Eye,
  Heart,
  Zap,
  Sparkles,
  Radar,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Globe,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
} from 'lucide-react';

export default function StudioIndex({ stats, activities, topArticles, systemStatus }) {
  const statCards = [
    {
      label: 'PUBLISHED ARTICLES',
      value: stats.published_count,
      subValue: `${stats.draft_count} drafts pending`,
      icon: FileText,
      color: 'primary',
    },
    {
      label: 'PAGEVIEWS (7 DAYS)',
      value: stats.total_views_7d.toLocaleString(),
      trend: stats.views_growth,
      icon: Eye,
      color: 'emerald',
    },
    {
      label: 'ENGAGEMENT RATE',
      value: `${stats.engagement_rate}%`,
      subValue: 'Likes per view',
      icon: Heart,
      color: 'purple',
    },
    {
      label: 'GEMINI AI COST (7D)',
      value: `$${stats.gemini_cost_7d}`,
      subValue: `${(stats.gemini_tokens_7d / 1000).toFixed(1)}k tokens used`,
      icon: Zap,
      color: 'amber',
    },
  ];

  const quickActions = [
    {
      title: 'New AI Draft',
      desc: 'Generate or write a new piece',
      href: '/studio/articles/create',
      icon: Sparkles,
      color: 'text-primary bg-primary/10 border-primary/20',
    },
    {
      title: 'Scout Ideas',
      desc: 'Scan web for breaking topics',
      href: '/studio/scout',
      icon: Radar,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Fact-Check Engine',
      desc: 'Verify claims & auto-fix',
      href: '/studio/factcheck',
      icon: CheckCircle2,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'E-E-A-T Quality',
      desc: 'Upgrade legacy content',
      href: '/studio/eeat',
      icon: ShieldCheck,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'View Analytics',
      desc: 'Detailed traffic & audience',
      href: '/studio/analytics',
      icon: BarChart3,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Visit Live Site',
      desc: 'Open techynews.lat',
      href: '/',
      external: true,
      icon: Globe,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <StudioLayout>
      <Head title="Studio Dashboard" />

      <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div>
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Central Command
          </h3>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
            Dashboard.
          </h1>
        </div>

        {/* Hero Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            const isPositive = card.trend && card.trend >= 0;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all backdrop-blur-md relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  {card.trend !== undefined && (
                    <div
                      className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${
                        isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(card.trend)}%
                    </div>
                  )}
                </div>

                <div className="text-3xl font-black text-white tracking-tight mb-1">
                  {card.value}
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {card.label}
                </div>
                {card.subValue && (
                  <div className="text-[10px] font-medium text-gray-500 mt-1">
                    {card.subValue}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Main Grid: Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Recent Activity Feed */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary" />
                Recent Activity
              </h3>
              <Link
                href="/studio/articles"
                className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1"
              >
                All Articles <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-4">
              {activities.length > 0 ? (
                activities.map((item, idx) => (
                  <div
                    key={`${item.type}-${item.id}-${idx}`}
                    className="flex items-start gap-4 p-3.5 rounded-2xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 mt-0.5">
                      {item.type === 'article' ? (
                        <FileText className="w-4 h-4 text-primary" />
                      ) : (
                        <Radar className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-white truncate">{item.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span
                          className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                            item.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : item.status === 'approved'
                              ? 'bg-primary/10 text-primary border border-primary/20'
                              : 'bg-white/5 text-gray-400 border border-white/5'
                          }`}
                        >
                          {item.status}
                        </span>
                        {item.fact_check_score && (
                          <span className="text-[9px] font-bold text-amber-400">
                            Score: {item.fact_check_score}%
                          </span>
                        )}
                        <span className="text-[10px] font-medium text-gray-500">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 italic py-6 text-center">
                  No activity recorded yet.
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Quick Actions */}
          <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-white/5 pb-4">
              Quick Actions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                const Component = action.external ? 'a' : Link;
                return (
                  <Component
                    key={action.title}
                    href={action.href}
                    target={action.external ? '_blank' : undefined}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all hover:-translate-y-0.5 group block"
                  >
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-3 ${action.color}`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-white group-hover:text-primary transition-colors flex items-center gap-1">
                      {action.title}
                      {action.external && <ArrowUpRight className="w-3 h-3 text-gray-500" />}
                    </h4>
                    <p className="text-[10px] font-medium text-gray-500 mt-1 line-clamp-1">
                      {action.desc}
                    </p>
                  </Component>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Performing Articles & System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Top Performers */}
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-white/5 pb-4">
              Top Performing Articles
            </h3>

            <div className="space-y-3">
              {topArticles.map((art, idx) => (
                <div
                  key={art.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-lg font-black text-gray-600 font-mono w-6">
                      0{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <Link
                        href={`/article/${art.slug}`}
                        target="_blank"
                        className="text-xs font-bold text-white hover:text-primary transition-colors truncate block"
                      >
                        {art.title}
                      </Link>
                      <p className="text-[10px] font-medium text-gray-500 mt-0.5">
                        Published {new Date(art.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0 text-right">
                    <div>
                      <span className="text-xs font-black text-white block">
                        {art.views_count.toLocaleString()}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                        Views
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-black text-purple-400 block">
                        {art.likes_count}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                        Likes
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health Widget */}
          <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6 flex flex-col justify-between">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-white/5 pb-4 mb-6">
                System Engine Status
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs font-bold text-white">Gemini 2.0 Flash</p>
                      <p className="text-[9px] font-medium text-gray-500">Primary AI Engine</p>
                    </div>
                  </div>
                  {systemStatus.gemini_api ? (
                    <span className="flex items-center gap-1 text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                      <CheckCircle className="w-3 h-3" /> Ready
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[9px] font-black text-rose-400 uppercase tracking-widest bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                      <AlertCircle className="w-3 h-3" /> Key Missing
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-purple-400" />
                    <div>
                      <p className="text-xs font-bold text-white">OpenRouter</p>
                      <p className="text-[9px] font-medium text-gray-500">Fallback Provider</p>
                    </div>
                  </div>
                  {systemStatus.openrouter_fallback ? (
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                      Active
                    </span>
                  ) : (
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                      Disabled
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <Radar className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="text-xs font-bold text-white">Scout Pipeline</p>
                      <p className="text-[9px] font-medium text-gray-500">
                        {systemStatus.scout_pending} pending concepts
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/studio/scout"
                    className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline"
                  >
                    View Queue
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 text-[10px] font-mono text-gray-500 text-center uppercase tracking-widest">
              TechyNews Studio v2.0 • Laravel 13
            </div>
          </div>
        </div>
      </div>
    </StudioLayout>
  );
}
