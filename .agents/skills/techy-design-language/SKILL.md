---
name: techy-design-language
description: TechyNews Design Language System — the exact colors, typography, spacing, component primitives, animation signatures, and visual identity used across the TechyNews platform. Activate this skill whenever building or modifying any UI component, page, or layout in the TechyNews project. This ensures visual consistency with the editorial-terminal aesthetic.
---

# TechyNews Design Language System

> **MANDATORY**: Read this before writing ANY JSX, CSS, or Tailwind class. Every pattern here is extracted from the live codebase.

## Identity

TechyNews is **NOT** a generic dashboard. It's an **editorial command center** with a signature aesthetic:

**"Bloomberg Terminal meets The New York Times editorial room."**

- **Editorial Brutalism**: Heavy `font-black`, aggressive `tracking-tighter` headlines
- **Terminal Aesthetic**: Monospace accents, pulsing status dots, signal IDs, UTC timestamps
- **Ink on dark paper**: Near-black `#02040a` backgrounds with paper-thin white overlays
- **Deliberate restraint**: Large whitespace, minimal decoration, content speaks

---

## Color System

### Brand Colors (tailwind.config.js)

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#00b4ff` | Accent, links, interactive, glows |
| `background-light` | `#f8f6f6` | Light mode page bg |
| `#02040a` | — | **Primary dark background** (hardcoded everywhere) |
| `#0a0f1c` | — | Secondary dark surface (cards, panels) |

### Dark Mode Surface Hierarchy

```
bg-[#02040a]           → Page canvas
bg-white/[0.02]        → Surface level 1 (subtle cards)
bg-white/[0.03]        → Surface level 2 (elevated cards, code blocks)
bg-white/[0.05] / bg-white/5  → Surface level 3 (hover, inputs)
bg-white/10            → Emphasized surface (active states)
```

### Light Mode Surfaces

```
bg-[#f8f6f6]           → Page canvas
bg-white/[0.6]         → Cards
bg-white/70            → Glassmorphism panels
bg-black/5             → Interactive surfaces
bg-black/[0.02]        → Subtle cards
```

### Semantic Colors

| Purpose | Color | Pattern |
|---------|-------|---------|
| Success | `emerald-500` | `bg-emerald-500/10 text-emerald-500 border-emerald-500/20` |
| Warning | `amber-500` | `bg-amber-500/10 text-amber-500 border-amber-500/20` |
| Error | `red-500` / `rose-500` | `bg-red-500/10 text-red-500 border-red-500/20` |
| Info | `blue-500` | `bg-blue-500/10 text-blue-500 border-blue-500/20` |
| AI/Magic | `purple-600` | Ambient glows, secondary gradients |

### Ambient Glows

```jsx
// Primary glow (fixed, behind content)
<div className="fixed top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-primary/8 rounded-full blur-[200px] pointer-events-none mix-blend-screen z-0" />

// Secondary glow
<div className="fixed bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/8 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0" />
```

### Key RGB: `rgba(43, 124, 238)` = `#2b7cee`

Used in: selection, cursor spotlight, scrollbar hover, CTA shadows, chart colors.

---

## Typography

### Font Stack

- Body: `font-sans` (system)
- Display: `Public Sans` (`font-display`)
- Code: `JetBrains Mono`, `Fira Code`, `Roboto Mono`

### Hierarchy

```
HERO HEADLINE:     text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.95]
SECTION TITLE:     text-4xl sm:text-5xl font-black tracking-tighter text-gray-900 dark:text-white
COMPONENT TITLE:   text-2xl font-black tracking-tighter
CARD TITLE:        text-xl font-black tracking-tight
BODY:              text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed
LARGE BODY:        text-lg text-gray-800 dark:text-gray-200 font-light leading-relaxed
```

### THE Label Pattern (50+ occurrences — the signature)

```
text-[10px] font-black uppercase tracking-[0.3em] text-primary     → Primary labels
text-[10px] font-black uppercase tracking-widest text-gray-500     → Neutral labels
text-[9px] font-black uppercase tracking-widest                    → Micro labels
text-[8px] font-black uppercase tracking-widest                    → Engine info
```

### Nav Links

```
text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400
hover:text-black dark:hover:text-white
```

### Weight Rules

- Headlines: ALWAYS `font-black` (900)
- Labels/Buttons: ALWAYS `font-black` (900) 
- Body text: ALWAYS `font-light` (300)
- Intermediate: `font-bold` (700) for emphasis within body
- **NEVER** use `font-semibold` (600) — it doesn't exist in this design

---

## Spacing

### Containers

```
max-w-7xl mx-auto px-6     → Public pages
max-w-6xl mx-auto           → Studio content
max-w-4xl mx-auto           → Editor, newsletter
max-w-3xl mx-auto           → Wizard flow
```

### Page Padding

```
p-10 md:p-24                → Studio views (generous)
py-24 px-6                  → Public sections
p-8 md:p-10                 → Card interiors
```

### Section Headers

```
mb-20                       → Section title to content (Studio)
mb-12                       → Section title to content (Public)
```

---

## Component Primitives

### Cards

```jsx
// Standard Studio Card
className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl hover:border-primary/30 transition-all"

// Public Article Card
className="bg-white/[0.6] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-[2rem] shadow-sm dark:shadow-none"

// Glassmorphism Card
className="bg-white/70 dark:bg-[#0a0f1c]/80 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[2.5rem] shadow-2xl"

// Stat Card
className="bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-2xl p-5 backdrop-blur-md"
```

### Buttons

```jsx
// Primary CTA
className="bg-primary text-white font-black px-8 py-4 rounded-full hover:scale-105 shadow-[0_0_30px_rgba(43,124,238,0.4)] uppercase tracking-wider text-sm"

// Studio Primary
className="bg-primary text-white font-black text-[10px] uppercase tracking-widest px-6 py-2 rounded-xl shadow-xl shadow-primary/20"

// Ghost/Secondary
className="border border-black/10 dark:border-white/10 text-gray-400 hover:text-black dark:hover:text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black/5 dark:hover:bg-white/5"

// Inverted (Login)
className="bg-white text-black font-black py-4 rounded-xl hover:scale-105 text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.1)]"

// Danger
className="bg-red-500/10 text-red-500 font-black text-[10px] uppercase tracking-widest rounded-xl"

// Success Action
className="bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-emerald-600 hover:shadow-emerald-500/25 hover:-translate-y-0.5 shadow-lg"
```

### Sidebar Nav Items

```jsx
// Active
className="bg-primary/10 text-primary border border-primary/20 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest"

// Inactive
className="text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest"
```

### Inputs

```jsx
// Studio Input
className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-primary/50 outline-none placeholder-gray-700"

// Form Input
className="bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-4 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
```

### Form Labels

```
text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2
```

### Status Badges

```jsx
// Published
className="text-primary border-primary/20 bg-primary/5 px-2 py-0.5 rounded text-[10px] font-black"

// Draft
className="text-gray-400 border-black/5 dark:border-white/5 px-2 py-0.5 rounded text-[10px] font-black"
```

### Category Pills

```
px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest
bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400
hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20
```

---

## Borders

```
border-black/5 dark:border-white/5       → Default subtle
border-black/10 dark:border-white/10     → Stronger
hover:border-primary/30                   → Interactive hover
```

## Border Radius Scale

```
rounded-[3rem]    → Newsletter cards (largest)
rounded-[2.5rem]  → Login, glassmorphism
rounded-[2rem]    → Public article cards
rounded-3xl       → Studio cards
rounded-2xl       → Stat cards, code blocks
rounded-xl        → Buttons, inputs
rounded-lg        → Icon containers
rounded-full      → Badges, pills, CTAs
```

## Animations

### Framer Motion Entry

```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}

// Staggered (the easing curve [0.16, 1, 0.3, 1] is THE signature)
transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
```

### Hover

```
hover:scale-105                          → CTAs, buttons
group-hover:scale-105                    → Image zoom
group-hover:translate-x-1               → Arrow icons
hover:-translate-y-0.5                   → Lift effect
```

### Status Indicators

```jsx
// Pulsing dot
<span className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75" />
<span className="relative rounded-full h-2 w-2 bg-blue-500" />
```

---

## Iconography

**Library**: `lucide-react` exclusively

| Size | Usage |
|------|-------|
| `w-3 h-3` | Micro icons |
| `w-4 h-4` | Standard button/label icons |
| `w-5 h-5` | Sidebar nav, section icons |
| `w-6 h-6` | Header icons |
| `w-8 h-8` | Empty state icons |

---

## Page Templates

### Studio Page

```jsx
<div className="flex-1 overflow-y-auto p-10 md:p-24 max-w-6xl mx-auto w-full">
    <div className="mb-20">
        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Section Label</h3>
        <h2 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white">Page Title.</h2>
    </div>
    {/* Content */}
</div>
```

### Public Page

```jsx
<div className="min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-black dark:text-white font-sans selection:bg-primary/30 overflow-x-hidden transition-colors duration-500">
    {/* Ambient Glows */}
    <Navbar />
    <main className="relative z-10">
        <section className="py-24 px-6 max-w-7xl mx-auto">...</section>
    </main>
    <PublicFooter />
</div>
```

---

## Anti-Patterns

❌ No `font-semibold` — only `font-black`, `font-bold`, `font-light`  
❌ No full-opacity dark backgrounds — use `bg-white/[0.02]` overlays  
❌ No `text-base` — use `text-sm` or jump to `text-xl`+  
❌ No normal letter-spacing — labels use `tracking-widest`, headlines use `tracking-tighter`  
❌ No generic dashboard colors — no plain `bg-blue-500` backgrounds  
❌ No default rounded corners — minimum `rounded-xl`  
❌ No TailwindUI components as-is  
❌ No shadows in dark mode on cards — use `dark:shadow-none`
