import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import StudioLayout from '@/Layouts/StudioLayout';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Download,
  Trash2,
  TrendingUp,
  Mail,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';
import { toast } from 'sonner';

dayjs.extend(relativeTime);

export default function SubscribersIndex({ subscribers, filters, stats }) {
  const [search, setSearch] = useState(filters.search || '');
  const [isDeleting, setIsDeleting] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    router.get('/studio/subscribers', { search }, { preserveState: true, replace: true });
  };

  const handleDelete = async (id, email) => {
    if (!window.confirm(`Remove subscriber ${email}?`)) return;
    setIsDeleting(id);
    try {
      await axios.delete(`/studio/subscribers/${id}`);
      toast.success('Subscriber removed');
      router.reload({ only: ['subscribers', 'stats'] });
    } catch (err) {
      toast.error('Failed to remove subscriber');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <StudioLayout>
      <Head title="Subscribers — Studio" />

      <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Audience
            </h3>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
              Subscribers.
            </h1>
          </div>

          <a
            href="/studio/subscribers/export"
            download
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-white/10 transition-all hover:scale-105"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </a>
        </div>

        {/* Audience Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <div className="text-3xl font-black text-white tracking-tight mb-1">
              {stats.total.toLocaleString()}
            </div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              TOTAL SUBSCRIBERS
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <div className="text-3xl font-black text-emerald-400 tracking-tight mb-1 flex items-center gap-2">
              +{stats.new_this_week}
            </div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              NEW THIS WEEK
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <div className="text-3xl font-black text-purple-400 tracking-tight mb-1 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              {stats.growth_rate}%
            </div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              WEEKLY GROWTH RATE
            </div>
          </div>
        </div>

        {/* Toolbar & Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
          <form onSubmit={handleSearch} className="relative flex-1 w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search subscribers by email..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-white placeholder-gray-600 focus:border-primary/50 outline-none transition-all"
            />
          </form>
        </div>

        {/* Subscribers Table */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
          {subscribers.data.length > 0 ? (
            <div className="divide-y divide-white/5">
              {subscribers.data.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 hover:bg-white/[0.02] transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-emerald-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate">{sub.email}</p>
                      <p className="text-[10px] font-medium text-gray-500 flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3 h-3 text-gray-600" />
                        Subscribed {dayjs(sub.created_at).fromNow()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:block">
                      Active
                    </span>

                    <button
                      onClick={() => handleDelete(sub.id, sub.email)}
                      disabled={isDeleting === sub.id}
                      className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
                      title="Remove Subscriber"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 space-y-3">
              <Users className="w-10 h-10 text-gray-700 mx-auto opacity-30" />
              <p className="text-xs font-black uppercase tracking-widest text-gray-500">
                No subscribers found.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {subscribers.links && subscribers.links.length > 3 && (
          <div className="flex justify-center items-center gap-2 pt-4">
            {subscribers.links.map((link, i) => (
              <Link
                key={i}
                href={link.url || '#'}
                dangerouslySetInnerHTML={{ __html: link.label }}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  link.active
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : link.url
                    ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    : 'text-gray-700 cursor-not-allowed opacity-50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </StudioLayout>
  );
}
