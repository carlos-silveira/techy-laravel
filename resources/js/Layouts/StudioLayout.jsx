import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Radar,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Activity,
  BarChart3,
  Image,
  Users,
  FolderTree,
  Settings,
  LogOut,
  Globe,
  Command,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import CommandPalette from '@/Components/CommandPalette';
import { Toaster } from 'sonner';

export default function StudioLayout({ children }) {
  const { auth } = usePage().props;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/studio';

  // Active check helper
  const isActive = (path) => {
    if (path === '/studio') {
      return currentPath === '/studio' || currentPath === '/studio/';
    }
    return currentPath.startsWith(path);
  };

  const navGroups = [
    {
      label: 'EDITORIAL DESK',
      items: [
        { href: '/studio', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/studio/articles', label: 'Archives', icon: FileText },
        { href: '/studio/articles/create', label: 'AI Writer', icon: Sparkles },
        { href: '/studio/scout', label: 'Scout Queue', icon: Radar },
      ],
    },
    {
      label: 'AUTOMATION',
      items: [
        { href: '/studio/eeat', label: 'E-E-A-T Upgrades', icon: ShieldCheck },
        { href: '/studio/factcheck', label: 'Fact-Check Engine', icon: CheckCircle2 },
        { href: '/studio/agent', label: 'Agent Terminal', icon: Terminal },
      ],
    },
    {
      label: 'SYSTEM HUB',
      items: [
        { href: '/studio/analytics', label: 'Analytics', icon: BarChart3 },
        { href: '/studio/media', label: 'Media Library', icon: Image },
        { href: '/studio/subscribers', label: 'Subscribers', icon: Users },
        { href: '/studio/categories', label: 'Categories', icon: FolderTree },
        { href: '/studio/observability', label: 'Observability', icon: Activity },
      ],
    },
    {
      label: 'CONFIG',
      items: [
        { href: '/studio/settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  // Derive breadcrumbs
  const getBreadcrumbs = () => {
    const parts = currentPath.replace(/\/$/, '').split('/').filter(Boolean);
    if (parts.length <= 1) return [{ label: 'Studio', href: '/studio' }, { label: 'Dashboard' }];

    const breadcrumbs = [{ label: 'Studio', href: '/studio' }];
    let accumulated = '/studio';

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part === 'studio') continue;
      accumulated += `/${part}`;
      const formatted = part.charAt(0).toUpperCase() + part.slice(1);
      breadcrumbs.push({
        label: formatted,
        href: i < parts.length - 1 ? accumulated : null,
      });
    }
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans selection:bg-primary/30 flex overflow-hidden">
      <Toaster position="top-right" theme="dark" richColors />
      <CommandPalette />

      {/* ===== SIDEBAR ===== */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-[#02040a] border-r border-white/5 flex-shrink-0 z-40 select-none">
        {/* Logo & Live Status Header */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between gap-2">
          <Link href="/studio" className="flex items-center gap-2 min-w-0 shrink-0">
            <img src="/img/logo_wbc.webp" alt="TechyNews Studio" className="h-6 w-auto shrink-0" />
            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded shrink-0">
              Studio
            </span>
          </Link>
          <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400">LIVE</span>
          </div>
        </div>

        {/* User Profile Info */}
        {auth?.user && (
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3 bg-white/[0.01]">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black text-xs uppercase shrink-0">
              {auth.user.name ? auth.user.name.substring(0, 2) : 'AD'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{auth.user.name}</p>
              <p className="text-[10px] font-medium text-gray-500 truncate">{auth.user.email}</p>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
          {navGroups.map((group) => (
            <div key={group.label}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-3 px-3">
                {group.label}
              </h4>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                        active
                          ? 'bg-primary/10 text-primary border-l-2 border-primary shadow-sm'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-primary' : 'text-gray-500'}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              View Site
            </span>
            <ChevronRight className="w-3 h-3 text-gray-600" />
          </Link>

          <Link
            href="/logout"
            method="post"
            as="button"
            className="flex items-center gap-2 w-full px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all text-left"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Link>
        </div>
      </aside>

      {/* ===== MOBILE DRAWER SIDEBAR ===== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#02040a] border-r border-white/10 z-50 flex flex-col lg:hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <Link href="/studio" className="flex items-center gap-2">
                  <img src="/img/logo_wbc.webp" alt="TechyNews Studio" className="h-6 w-auto" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Studio</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {navGroups.map((group) => (
                  <div key={group.label}>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2 px-3">
                      {group.label}
                    </h4>
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest ${
                              active
                                ? 'bg-primary/10 text-primary border-l-2 border-primary'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-white/5 bg-[#02040a]/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight className="w-3 h-3 text-gray-600" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-primary transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Quick Actions & Search */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
                window.dispatchEvent(event);
              }}
              className="hidden sm:flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 px-3.5 py-1.5 rounded-xl text-xs text-gray-400 transition-all cursor-pointer"
            >
              <Command className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest">Search (⌘K)</span>
            </button>

            <Link
              href="/studio/articles/create"
              className="flex items-center gap-2 bg-primary text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Draft</span>
            </Link>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
