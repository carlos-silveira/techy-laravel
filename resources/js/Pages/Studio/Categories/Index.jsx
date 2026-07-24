import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import StudioLayout from '@/Layouts/StudioLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderTree,
  Plus,
  Edit3,
  Trash2,
  FileText,
  X,
  Check,
  Palette,
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

export default function CategoriesIndex({ categories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#00b4ff');
  const [isSaving, setIsSaving] = useState(false);

  const presetColors = ['#00b4ff', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#3b82f6', '#64748b'];

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setColor('#00b4ff');
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description || '');
    setColor(cat.color || '#00b4ff');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSaving(true);
    try {
      if (editingCategory) {
        await axios.put(`/studio/categories/${editingCategory.id}`, { name, description, color });
        toast.success('Category updated!');
      } else {
        await axios.post('/studio/categories', { name, description, color });
        toast.success('Category created!');
      }
      setIsModalOpen(false);
      router.reload({ only: ['categories'] });
    } catch (err) {
      toast.error('Failed to save category');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`Delete category "${cat.name}"?`)) return;

    try {
      await axios.delete(`/studio/categories/${cat.id}`);
      toast.success('Category deleted');
      router.reload({ only: ['categories'] });
    } catch (err) {
      toast.error('Failed to delete category');
    }
  };

  return (
    <StudioLayout>
      <Head title="Categories — Studio" />

      <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Taxonomy
            </h3>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
              Categories.
            </h1>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-primary text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 hover:border-primary/30 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full border border-white/10 shrink-0"
                        style={{ backgroundColor: cat.color || '#00b4ff' }}
                      />
                      <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                        /{cat.slug}
                      </span>
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-white/5 border border-white/5 text-gray-400">
                      {cat.articles_count} Articles
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs font-light text-gray-400 mt-2 line-clamp-2">
                      {cat.description || 'No description provided.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-6 mt-4 border-t border-white/5">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(cat)}
                    className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white/[0.01] border border-white/5 rounded-3xl space-y-3">
              <FolderTree className="w-10 h-10 text-gray-700 mx-auto opacity-30" />
              <p className="text-xs font-black uppercase tracking-widest text-gray-500">
                No categories created yet. Click "Add Category" to get started.
              </p>
            </div>
          )}
        </div>

        {/* Modal Dialog */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#02040a] border border-white/10 rounded-3xl p-8 z-50 space-y-6 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="text-xl font-black text-white tracking-tight">
                    {editingCategory ? 'Edit Category' : 'Create New Category'}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                      Category Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Artificial Intelligence"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-primary/50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief overview of content in this category..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-medium text-white focus:border-primary/50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2">
                      Accent Color
                    </label>
                    <div className="flex items-center gap-3">
                      {presetColors.map((c) => (
                        <button
                          type="button"
                          key={c}
                          onClick={() => setColor(c)}
                          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                            color === c ? 'border-white scale-110' : 'border-transparent opacity-60'
                          }`}
                          style={{ backgroundColor: c }}
                        >
                          {color === c && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-2.5 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90"
                    >
                      {isSaving ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </StudioLayout>
  );
}
