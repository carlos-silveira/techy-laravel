import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import PublicFooter from '@/Components/PublicFooter';
import useLanguage from '@/Hooks/useLanguage';
import { ArrowRight, Mail } from 'lucide-react';
import { getFinalImage } from '@/utils';

export default function NewsletterArchive({ newsletters, dailyBrief }) {
    const { __ } = useLanguage();

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <div className="min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-gray-900 dark:text-white font-sans overflow-x-hidden relative transition-colors duration-500">
            <Head title={`${__('Intelligence Briefs Archive')} | TechyNews`} />

            {/* Glowing Background & Noise */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay z-0"></div>
            <div className="fixed top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0"></div>
            
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-32 relative z-10">
                <motion.div {...fadeIn} className="text-center mb-16">
                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">{__('Weekly Rollups')}</div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                        {__('The Intelligence')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">{__('Archive')}</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
                        {__('Catch up on past editions of our weekly intelligence briefings. The most important tech signals, curated and summarized.')}
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {newsletters.map((newsletter, idx) => (
                        <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/70 dark:bg-[#0c0f1a]/70 backdrop-blur-3xl border border-gray-200/50 dark:border-white/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:border-gray-300/50 dark:hover:border-white/[0.1]"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight">{newsletter.week}</h2>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{__('Weekly Edition')}</div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {newsletter.articles.map((article, i) => (
                                    <Link key={i} href={`/article/${article.slug}`} className="block group">
                                        <div className="flex flex-col md:flex-row gap-6 p-4 -mx-4 rounded-2xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                                            <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden border border-black/5 dark:border-white/5 relative bg-gray-100 dark:bg-gray-800">
                                                <img 
                                                    src={getFinalImage(article, 800)} 
                                                    fetchpriority={idx === 0 && i === 0 ? "high" : "auto"}
                                                    decoding="async"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                                    alt={article.title} 
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <h3 className="text-lg md:text-xl font-black mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-tight">
                                                    {article.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                                                    {article.ai_summary}
                                                </p>
                                                <div className="mt-3 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                                    {__('Read Brief')} <ArrowRight className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
