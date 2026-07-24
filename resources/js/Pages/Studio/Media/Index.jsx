import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import StudioLayout from '@/Layouts/StudioLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  Search,
  Loader2,
  ExternalLink,
  X,
  FileText,
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

export default function MediaIndex({ media }) {
  const [selectedAsset, setSelectedAsset] = useState(media[0] || null);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [search, setSearch] = useState('');

  const filteredMedia = media.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('image', files[i]);
      try {
        await axios.post('/upload-image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        successCount++;
      } catch (err) {
        toast.error(`Failed to upload ${files[i].name}`);
      }
    }

    setIsUploading(false);
    if (successCount > 0) {
      toast.success(`Uploaded ${successCount} asset(s)!`);
      router.reload({ only: ['media'] });
    }
  };

  const handleCopyUrl = (asset) => {
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset.id);
    toast.success('Asset URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (asset) => {
    if (!window.confirm(`Delete ${asset.name}?`)) return;

    try {
      await axios.delete('/studio/media', { data: { path: asset.path } });
      toast.success('Asset deleted');
      if (selectedAsset?.id === asset.id) {
        setSelectedAsset(null);
      }
      router.reload({ only: ['media'] });
    } catch (err) {
      toast.error('Failed to delete asset');
    }
  };

  return (
    <StudioLayout>
      <Head title="Media Library — Studio" />

      <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Asset Vault
            </h3>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
              Media Library.
            </h1>
          </div>

          <label className="inline-flex items-center gap-2 bg-primary text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105 cursor-pointer">
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>{isUploading ? 'Uploading...' : 'Upload Assets'}</span>
            <input type="file" onChange={handleUpload} multiple accept="image/*" className="hidden" />
          </label>
        </div>

        {/* Drag and Drop Zone */}
        <label className="flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-white/5 hover:border-primary/40 bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer group text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors mb-3">
            <Upload className="w-6 h-6" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors">
            Drop assets here or click to browse
          </span>
          <span className="text-[10px] font-medium text-gray-500 mt-1">
            Supports PNG, JPG, WEBP, SVG (Max 10MB per file)
          </span>
          <input type="file" onChange={handleUpload} multiple accept="image/*" className="hidden" />
        </label>

        {/* Main Grid + Side Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Grid: Media Thumbnails */}
          <div className="lg:col-span-8 space-y-6">
            {/* Search filter */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assets by filename..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-white placeholder-gray-600 focus:border-primary/50 outline-none transition-all"
              />
            </div>

            {filteredMedia.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredMedia.map((asset) => {
                  const isSelected = selectedAsset?.id === asset.id;
                  return (
                    <motion.div
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      whileHover={{ scale: 1.02 }}
                      className={`relative aspect-square rounded-2xl overflow-hidden border cursor-pointer transition-all bg-gray-900 group ${
                        isSelected
                          ? 'border-primary ring-2 ring-primary/30 shadow-lg shadow-primary/20'
                          : 'border-white/5 hover:border-white/20'
                      }`}
                    >
                      <img
                        src={asset.url}
                        alt={asset.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                        <p className="text-[10px] font-bold text-white truncate">{asset.name}</p>
                        <p className="text-[9px] font-mono text-gray-400">{asset.formatted_size}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-3xl space-y-3">
                <ImageIcon className="w-10 h-10 text-gray-700 mx-auto opacity-40" />
                <p className="text-xs font-black uppercase tracking-widest text-gray-500">
                  No assets found in Media Library.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Asset Details Inspector */}
          <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-3xl p-6 space-y-6 h-fit sticky top-24">
            {selectedAsset ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                    Asset Details
                  </h4>
                  <button
                    onClick={() => setSelectedAsset(null)}
                    className="text-gray-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Big Preview */}
                <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video bg-gray-900">
                  <img
                    src={selectedAsset.url}
                    alt={selectedAsset.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Metadata List */}
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1">
                      Filename
                    </span>
                    <p className="font-mono font-bold text-white break-all">{selectedAsset.name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1">
                        File Size
                      </span>
                      <p className="font-mono text-gray-300">{selectedAsset.formatted_size}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1">
                        Uploaded
                      </span>
                      <p className="text-gray-300">{selectedAsset.updated_at}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <button
                    onClick={() => handleCopyUrl(selectedAsset)}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-xs uppercase tracking-widest transition-all"
                  >
                    {copiedId === selectedAsset.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-primary" />
                    )}
                    {copiedId === selectedAsset.id ? 'Copied Link!' : 'Copy Asset URL'}
                  </button>

                  <a
                    href={selectedAsset.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                    Open Original
                  </a>

                  <button
                    onClick={() => handleDelete(selectedAsset)}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 font-black text-xs uppercase tracking-widest transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Asset
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center space-y-3">
                <ImageIcon className="w-10 h-10 text-gray-700 mx-auto opacity-30" />
                <p className="text-xs font-black uppercase tracking-widest text-gray-500">
                  Select an asset to view details.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StudioLayout>
  );
}
