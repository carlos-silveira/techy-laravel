import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import StudioLayout from '@/Layouts/StudioLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Filter,
  ArrowUpDown,
  MoreVertical,
} from 'lucide-react';
import { getFinalImage } from '@/utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';
import { toast } from 'sonner';

dayjs.extend(relativeTime);

export default function ArticlesIndex({ articles, filters, counts }) {
  const [search, setSearch] = useState(filters.search || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || '');
  const [sortFilter, setSortFilter] = useState(filters.sort || 'latest');
  const [isDeleting, setIsDeleting] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(
      '/studio/articles',
      { search, status: statusFilter, sort: sortFilter },
      { preserveState: true, replace: true }
    );
  };

  const handleFilterChange = (newStatus) => {
    setStatusFilter(newStatus);
    router.get(
      '/studio/articles',
      { search, status: newStatus, sort: sortFilter },
      { preserveState: true, replace: true }
    );
  };

  const handleSortChange = (newSort) => {
    setSortFilter(newSort);
    router.get(
      '/studio/articles',
      { search, status: statusFilter, sort: newSort },
      { preserveState: true, replace: true }
    );
  };

  const handlePublishToggle = async (article) => {
    try {
      if (article.status === 'published') {
        await axios.put(`/articles/${article.id}`, { ...article, status: 'draft' });
        toast.success('Article reverted to draft');
      } else {
        await axios.post(`/articles/${article.id}/publish`);
        toast.success('Article published!');
      }
      router.reload({ only: ['articles', 'counts'] });
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    setIsDeleting(id);
    try {
      await axios.delete(`/articles/${id}`);
      toast.success('Article deleted');
      router.reload({ only: ['articles', 'counts'] });
    } catch (err) {
      toast.error('Failed to delete article');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <StudioLayout>
      <Head title="Articles — Studio" />

      <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Editorial Desk
            </h3>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
              Narrative Repository.
            </h1>
          </div>

          <Link
            href="/studio/articles/create"
            className="inline-flex items-center gap-2 bg-primary text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>New AI Article</span>
          </Link>
        </div>

        {/* Toolbar: Search, Status Filters, Sort */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => handleFilterChange('')}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                statusFilter === ''
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              All ({counts.all})
            </button>
            <button
              onClick={() => handleFilterChange('published')}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                statusFilter === 'published'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              Published ({counts.published})
            </button>
            <button
              onClick={() => handleFilterChange('draft')}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                statusFilter === 'draft'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              Drafts ({counts.draft})
            </button>
          </div>

          {/* Search + Sort */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <form onSubmit={handleSearch} className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter narratives..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-white placeholder-gray-600 focus:border-primary/50 outline-none transition-all"
              />
            </form>

            <select
              value={sortFilter}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-gray-300 outline-none focus:border-primary/50"
            >
              <option value="latest" className="bg-[#02040a]">Latest First</option>
              <option value="oldest" className="bg-[#02040a]">Oldest First</option>
              <option value="views" className="bg-[#02040a]">Most Views</option>
              <option value="fact_check" className="bg-[#02040a]">Lowest Fact-Check</option>
            </select>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="space-y-4">
          {articles.data.length > 0 ? (
            articles.data.map((article) => {
              const coverImg = getFinalImage(article, 200);
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 hover:border-primary/30 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-5 min-w-0">
                    {/* Thumbnail */}
                    {coverImg ? (
                      <img
                        src={coverImg}
                        alt={article.title}
                        className="w-20 h-20 rounded-2xl object-cover border border-white/5 shrink-0 bg-gray-900"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                        <FileText className="w-8 h-8 text-gray-600" />
                      </div>
                    )}

                    {/* Meta & Title */}
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          onClick={() => handlePublishToggle(article)}
                          className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded cursor-pointer transition-all ${
                            article.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                              : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10'
                          }`}
                        >
                          {article.status}
                        </button>

                        {article.fact_check_score && (
                          <span
                            className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded ${
                              article.fact_check_score >= 80
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : article.fact_check_score >= 60
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            Score: {article.fact_check_score}%
                          </span>
                        )}

                        <span className="text-[10px] font-medium text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-600" />
                          {dayjs(article.created_at).fromNow()}
                        </span>
                      </div>

                      <Link
                        href={`/studio/articles/${article.id}/edit`}
                        className="text-base md:text-lg font-black text-white group-hover:text-primary transition-colors leading-snug line-clamp-2 block"
                      >
                        {article.title}
                      </Link>

                      <p className="text-xs text-gray-400 font-light line-clamp-1">
                        {article.ai_summary || 'No summary generated.'}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Metrics */}
                  <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-white/5">
                    <div className="text-right px-4 border-r border-white/5 hidden sm:block">
                      <span className="text-xs font-black text-white block">
                        {(article.views_count || 0).toLocaleString()}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                        Views
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/article/${article.slug}`}
                        target="_blank"
                        className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        title="View Public Article"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/studio/articles/${article.id}/edit`}
                        className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-all font-bold text-xs uppercase tracking-widest flex items-center gap-2 px-4"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </Link>

                      <button
                        onClick={() => handleDelete(article.id)}
                        disabled={isDeleting === article.id}
                        className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-3xl space-y-4">
              <FileText className="w-12 h-12 text-gray-700 mx-auto opacity-40" />
              <p className="text-xs font-black uppercase tracking-widest text-gray-500">
                No narratives found matching your search.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {articles.links && articles.links.length > 3 && (
          <div className="flex justify-center items-center gap-2 pt-6">
            {articles.links.map((link, i) => (
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
