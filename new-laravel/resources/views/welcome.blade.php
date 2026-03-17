<!DOCTYPE html>

<html class="dark" lang="en">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&amp;display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <script src="{{ mix('js/app.js') }}" defer></script>
    <script src="{{ mix('js/app.js') }}" defer></script>
    <style>
        .glass-morphism {
            background: rgba(0, 26, 44, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 180, 255, 0.1);
        }

        .hero-gradient {
            background: radial-gradient(circle at 50% 50%, rgba(0, 180, 255, 0.1) 0%, rgba(0, 26, 44, 1) 100%);
        }

        .text-glow {
            text-shadow: 0 0 30px rgba(0, 180, 255, 0.3);
        }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
</head>

<body class="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white">
    <!-- Top Navigation Bar -->
    <nav class="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-12">
                <a class="flex items-center gap-2 group" href="#">
                    <div class="text-primary">
                        <svg class="w-8 h-8" fill="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 10h3v4H2v-4zm5-4h3v12H7V6zm5 2h3v8h-3V8zm5-4h3v16h-3V4z"></path>
                        </svg>
                    </div>
                    <span class="text-2xl font-black tracking-tighter uppercase italic group-hover:text-primary transition-colors text-white">techy</span>
                </a>
                <div class="hidden lg:flex items-center gap-8">
                    <a class="text-sm font-semibold uppercase tracking-widest hover:text-primary transition-colors" href="#">Reports</a>
                    <a class="text-sm font-semibold uppercase tracking-widest hover:text-primary transition-colors" href="#">Engineers</a>
                    <a class="text-sm font-semibold uppercase tracking-widest hover:text-primary transition-colors" href="#">Narratives</a>
                    <a class="text-sm font-semibold uppercase tracking-widest hover:text-primary transition-colors" href="#">Archive</a>
                </div>
            </div>
            <div class="flex items-center gap-6">
                <div class="relative hidden md:block">
                    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                    <input class="bg-slate-200/50 dark:bg-primary/5 border-none rounded-full py-2 pl-10 pr-6 text-sm w-64 focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-500" placeholder="Explore the future..." type="text" />
                </div>
                <button class="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full text-sm font-bold tracking-tight transition-transform active:scale-95">
                    SUBSCRIBE
                </button>
                <div class="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
                    <img class="w-full h-full object-cover" data-alt="User profile minimalist avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBXiW1o3cpM9C2Ryu2R8393cFe1hjDUooObwBKGq6b3Gcw9K_J5GCzzV2ZTe6jKEKmqlW_pD62z6QXL53riQ1llgsXBoyTiGg6FX5HM2maAfaIxR-4CvQFncfAnmb8V7EYmCYLVGw6FqXT7hdExvKMsHHdQpDBOdPu7ZjsNBbmOQrhy7ZGOWxemS0Z-wLyulecZsVaMWyWWnOWnTgZLWAf28JeWqoUASZKv5u3OBRXO_CISP1JW6fVvbGXMqR8ncaxOUeJo3BVwGi8" />
                </div>
            </div>
        </div>
    </nav>
    <main class="relative overflow-x-hidden">
        <!-- Hero Section -->
        <section class="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 px-6">
            <div class="parallax-element absolute top-20 right-[10%] w-64 h-64 border border-primary/20 rounded-full blur-sm -z-10" data-speed="0.2"></div>
            <div class="parallax-element absolute bottom-40 left-[5%] w-96 h-96 border-2 border-primary/10 rounded-3xl rotate-45 -z-10" data-speed="0.5"></div>
            <div class="parallax-element absolute top-1/2 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl -z-10" data-speed="0.8"></div>
            <div class="absolute inset-0 hero-gradient -z-10"></div>
            <!-- Decorative background elements -->
            <div class="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
            <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
            <div class="max-w-5xl w-full text-center space-y-12 hero-content-animate">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-[0.2em] uppercase">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    New Issue: Quantum Supremacy
                </div>
                <h1 class="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] dark:text-white uppercase italic text-glow">
                    Engineering<br />the Next<br /><span class="text-primary not-italic">Narrative</span>
                </h1>
                <p class="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    Exploring the intersection of deep tech, software architecture, and the future of digital society through high-fidelity journalism.
                </p>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                    <button class="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black rounded-xl hover:scale-105 transition-all shadow-xl shadow-primary/20">
                        READ THE MANIFESTO
                    </button>
                    <button class="w-full sm:w-auto px-10 py-5 border-2 border-primary/30 text-primary font-black rounded-xl hover:bg-primary/5 transition-all">
                        BROWSE THE ARCHIVE
                    </button>
                </div>
            </div>
        </section>
        <!-- Featured Stories Grid -->
        <section class="max-w-7xl mx-auto px-6 py-24">
            <div class="flex items-end justify-between mb-12">
                <div>
                    <h2 class="text-xs font-bold tracking-[0.4em] text-primary uppercase mb-2">Editor's Choice</h2>
                    <h3 class="text-4xl font-black italic dark:text-white">The Lead Stories</h3>
                </div>
                <div class="flex gap-4">
                    <button class="p-3 border border-primary/20 rounded-full hover:bg-primary/10 transition-colors">
                        <span class="material-symbols-outlined">west</span>
                    </button>
                    <button class="p-3 border border-primary/20 rounded-full hover:bg-primary/10 transition-colors text-primary">
                        <span class="material-symbols-outlined">east</span>
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Card 1 -->
                <div class="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer">
                    <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Abstract quantum computing visualization with glowing particles" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuABAUWlUJxE7wd79zJoK1xFI7prA12QxfLdAiqaRN-ofcD59yFiNMQlmXR2jQyFeiLIHPp2gFF0UFcpFlqrPxQFdVxcRC9xYIFSsJAGFe2jg9RuzutnuDTOB6bhvcPpNT0TwvL1z_bv6F1ZO0FJ3FKiBKq0zkiWgBdp1waD6gMU0SvpsjdGW4_hCob0CwXKgLr9yXbFM8T1G5_5W1UYvVnVK5TN5Z__3I65xBKiBOc435L3uAHTBLP3NUmZkcUZfJGhYaegYvl00ZQ4')"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 p-8 space-y-4">
                        <span class="text-xs font-bold uppercase tracking-widest text-primary">Deep Tech</span>
                        <h4 class="text-2xl font-bold text-white group-hover:text-primary transition-colors">The Quantum Supremacy Fallacy</h4>
                        <p class="text-slate-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">How the current benchmark tests miss the reality of industrial-scale quantum computing needs.</p>
                    </div>
                </div>
                <!-- Card 2 -->
                <div class="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer">
                    <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Cyberpunk network architecture nodes connected by neon orange lines" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDoLJVsT_l98ySpNcFCxIX2vDf12BFzZXSmKyotnVsXoJ-rBGQnDJA_nWQ692aFqKh1PJN1o6RJTJqH8ejddO1D_3-AzVxBF_vYpYPw4PLkNBO_KOKh-GPDG69cJTCeH1W6-rkevkKMEQhdclb9pmQiaXDuBl443zKbJsrUao0W27tYu_h8z8uruQt0TqYUCM_3YRDp682hNEw2Nu5eFksHu7BApD_U2cnmnvT2sGIhtY0RkP0Whl-jZsMg4JCvUtG9LyKVFqlw0jLs')"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 p-8 space-y-4">
                        <span class="text-xs font-bold uppercase tracking-widest text-primary">Architecture</span>
                        <h4 class="text-2xl font-bold text-white group-hover:text-primary transition-colors">Decentralized Compute at Scale</h4>
                        <p class="text-slate-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Scaling the unscalable: How Web3 infrastructure is finally meeting enterprise demand.</p>
                    </div>
                </div>
                <!-- Card 3 -->
                <div class="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer">
                    <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Rust programming language logo on dark metallic texture" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfQwXQI0Ar1pK0DncnkX2_xAejMVUM1pr09BGgXkvWg6QIoMn6r20iDXqY2mmXj5ZP01TjeZYSTCADO4wjHCyA2VPgWnz9f1vdR2JnHhvbuSRyucnZt_7dhDGVs-d42uvHtZ7LZao9nLkd3dKXK4xCCk98kOI54pCAEz2ssd5zqFmGMzCAJ9xyFVtxESjLFNpJp197eDN9X42wwY8ERAY-Kd_DoOAeg2iXGecRGe1aPDOmcvfSXL_yzIVCtTWywh6cOMd-_Lk1S0UX')"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 p-8 space-y-4">
                        <span class="text-xs font-bold uppercase tracking-widest text-primary">Development</span>
                        <h4 class="text-2xl font-bold text-white group-hover:text-primary transition-colors">Rust: The New Standard</h4>
                        <p class="text-slate-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Why system-level safety is no longer optional for modern cloud-native organizations.</p>
                    </div>
                </div>
            </div>
        </section>
        <!-- Category Tabs -->
        <section class="max-w-7xl mx-auto px-6 pb-24">
            <div class="border-b border-primary/20 flex flex-wrap gap-10">
                <a class="relative py-4 text-primary font-black uppercase tracking-widest text-sm after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[3px] after:bg-primary" href="#">Latest</a>
                <a class="py-4 text-slate-500 hover:text-primary font-bold uppercase tracking-widest text-sm transition-colors" href="#">Trending</a>
                <a class="py-4 text-slate-500 hover:text-primary font-bold uppercase tracking-widest text-sm transition-colors" href="#">Opinion</a>
                <a class="py-4 text-slate-500 hover:text-primary font-bold uppercase tracking-widest text-sm transition-colors" href="#">Deep Dives</a>
                <a class="py-4 text-slate-500 hover:text-primary font-bold uppercase tracking-widest text-sm transition-colors" href="#">Open Source</a>
            </div>
            <!-- List of Articles -->
            <div class="mt-12 space-y-12">
                <article class="flex flex-col md:flex-row gap-8 items-center group">
                    <div class="w-full md:w-1/3 aspect-video rounded-xl overflow-hidden bg-primary/10">
                        <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Futuristic data center cooling system with orange light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9JFDFvzdSRtE1vtQUG8k7ZiAZ9Q0_2ivVSRf7LIpUaaqXT3wrv59WNvWxotyC-9WUNk1p4xRzUG7t7bbPBDIbqWOwS8rZVuaehOCuzVxlAORRGfbti8SKLchxasWh7amqZyVxSkTA9G7gAnlzGTj-Ymew0Y7o5Mevjsd-6m1t6DKsy9CEvSw3bqdKGVw-uRpPGPSx6JfneqoC84sbXvugeDUG54ujYiMSxrVz6r_dqtft6Klx6JFxulEg2f6b0_jYU4fMbjrluVIo" />
                    </div>
                    <div class="flex-1 space-y-4">
                        <div class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                            <span>April 24, 2024</span>
                            <span class="w-1 h-1 rounded-full bg-primary/40"></span>
                            <span>12 Min Read</span>
                        </div>
                        <h3 class="text-3xl font-black group-hover:text-primary transition-colors cursor-pointer">The Silent Shift in Edge Computing Infrastructure</h3>
                        <p class="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">As latency becomes the primary bottleneck for AI real-time reasoning, a new breed of edge-first infrastructure providers are quietly rebuilding the internet backbone.</p>
                        <div class="flex items-center gap-3 pt-2">
                            <div class="w-8 h-8 rounded-full bg-primary/20" data-alt="Author headshot circular thumbnail" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIq9IRCCYx5rwhUPqZUbSbs9QT1jP3rWEIBy2PWW3GnfGI4-5_oNgXuHpFR_m-O6RiPhsfukvZwWXvH1clM1na3OYh4AjAySqSOrBOM-K_InsAzzVVH6q8U-hCxdBaQaDjuH1AmfgYzEavh9gSZ9obH334gVWgyx6eh5wqIW9yAnAhVzQt3_2H-0hxcn6dBhOGQGJKr96Ue1jciMofeNquJ2Cyb3ACZCxvhSHBSca9fQyDX2K2MfWlYXGzt27cSTyUuaBiSvWDiA1z')"></div>
                            <span class="text-sm font-bold">Sarah Chen</span>
                        </div>
                    </div>
                </article>
                <article class="flex flex-col md:flex-row gap-8 items-center group">
                    <div class="w-full md:w-1/3 aspect-video rounded-xl overflow-hidden bg-primary/10">
                        <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Neural network visualization with bright orange synapses" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV8f7NTz04qJ-CUDhM9St-6Z4RRdf4JuX9qdPghPjCyrKEKMrmoJSsU54FTvNA1L1tl7gp0A2qed_Nmj4VGg4iJ3Og75_GBT4s_vpRnti8xbSSpGBpT8L7Em0jpcqpBq7ZKhIqZ575PN1G5q4l6TWYZ3o_0tbIyvHagwea1JgMBrjdLELrG1pBWwS1EXBWeRqx5lUwzNGVkINiYTPIoPafemzQhyK136JOGzGnl0vz4Tne3hjfpFq-m63JBDbPOqC39wkulkOO_itp" />
                    </div>
                    <div class="flex-1 space-y-4">
                        <div class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                            <span>April 22, 2024</span>
                            <span class="w-1 h-1 rounded-full bg-primary/40"></span>
                            <span>8 Min Read</span>
                        </div>
                        <h3 class="text-3xl font-black group-hover:text-primary transition-colors cursor-pointer">Post-LLM Architecture: What Comes After Transformers?</h3>
                        <p class="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">While the world is obsessed with GPT, researchers are already moving toward State Space Models and more efficient recursive architectures.</p>
                        <div class="flex items-center gap-3 pt-2">
                            <div class="w-8 h-8 rounded-full bg-primary/20" data-alt="Author headshot circular thumbnail" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAon-Yedk2MBDpH5y_yBFK7RtsA71VzsRd5D6QaSSYwyLpxx3uOypzjhJVRZQlfuDDA1fx8TkYLxLIHtG_DKayde1LaOudLCM27YqT0mz_WVNXGJNsEPCJXwE2Wp_HFwKSK8KuufaP9fixdTK0mP1p8eTU9eYb2i4DxD4yeylAwjjnAPbgvU_IFdlEswy_IMJkdNXKWHtPzQa3OMynzD8uqKb6a8At1JDkjD547ZZdiuWV1KS_1VZVu6QTN56VDiefFcyhOduM5sWh-')"></div>
                            <span class="text-sm font-bold">Dr. Marcus Thorne</span>
                        </div>
                    </div>
                </article>
            </div>
            <div class="mt-20 flex justify-center">
                <button class="px-12 py-4 border-2 border-primary text-primary font-black rounded-xl hover:bg-primary hover:text-white transition-all tracking-widest uppercase">
                    Load More Stories
                </button>
            </div>
        </section>
        <!-- Newsletter Section -->
        <section class="max-w-7xl mx-auto px-6 py-20">
            <div class="glass-morphism rounded-[2rem] p-12 md:p-20 relative overflow-hidden flex flex-col items-center text-center">
                <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
                <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
                <h2 class="text-4xl md:text-5xl font-black italic mb-6">Stay ahead of the curve</h2>
                <p class="text-slate-400 max-w-xl text-lg mb-10 leading-relaxed">Join 45,000+ senior engineers and tech leaders who receive our weekly deep-dive into the future of computing.</p>
                <form class="w-full max-w-lg flex flex-col md:flex-row gap-4">
                    <input class="flex-1 bg-white/5 border border-primary/20 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none text-white" placeholder="Enter your email" type="email" />
                    <button class="bg-primary text-white font-black px-10 py-4 rounded-xl hover:scale-105 transition-all uppercase tracking-widest">
                        Join
                    </button>
                </form>
                <p class="mt-6 text-xs text-slate-500 font-medium">No spam. Only high-fidelity engineering narratives. Unsubscribe anytime.</p>
            </div>
        </section>
    </main>
    <footer class="border-t border-primary/10 py-20 bg-background-light dark:bg-background-dark/50">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div class="space-y-6">
                <div class="flex items-center gap-2">
                    <div class="text-primary">
                        <svg class="w-6 h-6" fill="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 10h3v4H2v-4zm5-4h3v12H7V6zm5 2h3v8h-3V8zm5-4h3v16h-3V4z"></path>
                        </svg>
                    </div>
                    <span class="text-xl font-black tracking-tighter uppercase italic text-white">techy</span>
                </div>
                <p class="text-slate-500 text-sm leading-relaxed">The premier destination for deep technical reporting and architecture analysis. Built for the modern engineering leader.</p>
            </div>
            <div class="space-y-6">
                <h4 class="font-black uppercase tracking-widest text-xs text-primary">Sections</h4>
                <ul class="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-400">
                    <li><a class="hover:text-primary transition-colors" href="#">Hardware Architecture</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Distributed Systems</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">AI &amp; ML Research</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Security Vectors</a></li>
                </ul>
            </div>
            <div class="space-y-6">
                <h4 class="font-black uppercase tracking-widest text-xs text-primary">Network</h4>
                <ul class="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-400">
                    <li><a class="hover:text-primary transition-colors" href="#">Podcast</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Job Board</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Engineering Events</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Member Community</a></li>
                </ul>
            </div>
            <div class="space-y-6">
                <h4 class="font-black uppercase tracking-widest text-xs text-primary">Follow</h4>
                <div class="flex gap-4">
                    <a class="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-colors" href="#">
                        <span class="material-symbols-outlined text-xl">share</span>
                    </a>
                    <a class="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-colors" href="#">
                        <span class="material-symbols-outlined text-xl">public</span>
                    </a>
                    <a class="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-colors" href="#">
                        <span class="material-symbols-outlined text-xl">rss_feed</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <p>© 2024 techy.news / Engineered for the future.</p>
            <div class="flex gap-8">
                <a class="hover:text-primary" href="#">Privacy Policy</a>
                <a class="hover:text-primary" href="#">Terms of Service</a>
                <a class="hover:text-primary" href="#">Cookie Settings</a>
            </div>
        </div>
    </footer>
    <script>
        gsap.registerPlugin(ScrollTrigger);

        // Hero Headline Animation
        gsap.to(".hero-content-animate", {
            scrollTrigger: {
                trigger: "section.relative.min-h-\[85vh\]",
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            scale: 0.9,
            opacity: 0,
            y: 100
        });

        // Parallax Background Elements
        gsap.utils.toArray(".parallax-element").forEach(el => {
            const speed = el.getAttribute('data-speed');
            gsap.to(el, {
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                },
                y: (i, target) => -ScrollTrigger.maxScroll(window) * speed * 0.2
            });
        });

        // Reveal Lead Stories
        gsap.from(".grid-cols-1.md\\:grid-cols-3 > div", {
            scrollTrigger: {
                trigger: ".grid-cols-1.md\\:grid-cols-3",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out"
        });

        // Smooth Reveal for Articles
        gsap.utils.toArray("article").forEach(article => {
            gsap.from(article, {
                scrollTrigger: {
                    trigger: article,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                },
                x: -30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    </script>
</body>

</html>