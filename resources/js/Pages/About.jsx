import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import PublicFooter from '@/Components/PublicFooter';
import useLanguage from '@/Hooks/useLanguage';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// ─── Experience Data ─────────────────────────────────────────────────────
const getExperiences = (__) => [
    {
        role: __('Senior Software Engineer'),
        company: 'Tendencys Innovations',
        companyUrl: 'https://www.linkedin.com/company/tendencys-innovation',
        period: 'Sep 2024 – Present',
        description: __('Architected and scaled a global shipping API (Laravel Lumen) for Envia.com, integrating international logistics providers via RESTful APIs. Optimized core backend performance at scale.'),
    },
    {
        role: __('Tech Lead & Senior Software Engineer'),
        company: 'Buscabot',
        companyUrl: 'https://www.linkedin.com/company/buscabot/',
        period: 'Jan 2022 – Jul 2024',
        description: __('Engineered features for a B2B WhatsApp chatbot platform using Laravel, React, Tailwind CSS, MySQL, and GCP, integrated with Twilio. Built internal APIs and integrated platforms like Stripe and Facturapi.'),
    },
    {
        role: __('Associate Software Engineer'),
        company: 'Justia',
        companyUrl: 'https://www.linkedin.com/company/justia/',
        period: 'Jun 2019 – Jan 2022',
        description: __('Built Laravel data parsers to process US government website information for high-traffic platforms including Justia.com. Managed technical execution of large-scale email marketing campaigns.'),
    }
];

export default function About() {
    const { __ } = useLanguage();
    const experiences = getExperiences(__);

    const fadeUp = {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <div className="min-h-screen bg-[#f2f2f2] dark:bg-[#000000] text-gray-900 dark:text-white font-sans overflow-x-hidden selection:bg-primary selection:text-white transition-colors duration-500">
            <Head title={`${__('About')} | Carlos Silveira`} />
            
            <Navbar />

            {/* Radical Hero Section: Oversized Typography, Tight Tracking, No Gradients, No Shadows */}
            <main className="px-6 md:px-12 pt-32 md:pt-48 pb-32">
                <motion.div initial="initial" animate="animate" variants={{
                    animate: { transition: { staggerChildren: 0.1 } }
                }}>
                    <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-8">
                        <div className="bg-primary text-white text-xs md:text-sm font-black uppercase tracking-widest px-5 py-2.5 rounded-full">
                            {__('Software Engineer')}
                        </div>
                        <div className="border border-gray-900 dark:border-white text-gray-900 dark:text-white text-xs md:text-sm font-black uppercase tracking-widest px-5 py-2.5 rounded-full">
                            {__('AI Innovator')}
                        </div>
                        <div className="bg-black text-white dark:bg-white dark:text-black text-xs md:text-sm font-black uppercase tracking-widest px-5 py-2.5 rounded-full">
                            Monterrey, MX
                        </div>
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="text-[12vw] md:text-[10rem] leading-[0.85] font-black tracking-[-0.04em] uppercase break-words hyphens-auto">
                        Carlos
                        <br />
                        Silveira.
                    </motion.h1>

                    <motion.div variants={fadeUp} className="mt-16 md:mt-32 max-w-3xl">
                        <p className="text-2xl md:text-4xl font-light tracking-tight leading-snug">
                            {__('I architect backend systems, forge AI agents, and build high-performance products. No fluff. Just clean code and scalable architecture.')}
                        </p>
                    </motion.div>
                </motion.div>

                {/* Experience Section: Museum Placard Style */}
                <div className="mt-40">
                    <div className="border-t-2 border-black dark:border-white py-8 mb-16 flex justify-between items-end">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">{__('Experience')}</h2>
                        <span className="text-sm font-black uppercase tracking-widest text-primary hidden md:block">[{__('01')}]</span>
                    </div>

                    <div className="flex flex-col">
                        {experiences.map((exp, idx) => (
                            <div key={idx} className="group border-t border-gray-300 dark:border-[#333] py-12 md:py-16 hover:bg-black/5 dark:hover:bg-white/5 transition-colors -mx-6 px-6 md:-mx-12 md:px-12 flex flex-col md:flex-row md:items-start gap-8 md:gap-24 relative">
                                <div className="w-full md:w-1/3 flex-shrink-0">
                                    <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">{exp.period}</div>
                                    <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-none mb-2">{exp.role}</h3>
                                    <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors">
                                        {exp.company} <ArrowRight className="w-4 h-4 -rotate-45" />
                                    </a>
                                </div>
                                <div className="flex-1">
                                    <p className="text-lg md:text-xl font-light leading-relaxed text-gray-600 dark:text-gray-400">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-gray-300 dark:border-[#333]"></div>
                    </div>
                </div>

                {/* Tech Arsenal Section */}
                <div className="mt-40">
                    <div className="border-t-2 border-black dark:border-white py-8 mb-16 flex justify-between items-end">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">{__('Tech Arsenal')}</h2>
                        <span className="text-sm font-black uppercase tracking-widest text-primary hidden md:block">[{__('02')}]</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-300 dark:bg-[#333] border border-gray-300 dark:border-[#333]">
                        {['Laravel & PHP', 'React & Tailwind', 'MySQL & GCP', 'Gemini & AI Agents', 'Docker', 'AWS & Cloud'].map((tech, idx) => (
                            <div key={idx} className="bg-[#f2f2f2] dark:bg-[#000000] p-12 md:p-16 flex items-center justify-center group">
                                <span className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-gray-400 dark:text-gray-600 group-hover:text-primary transition-colors duration-500">
                                    {tech}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-40 mb-20">
                    <div className="border-t-2 border-black dark:border-white py-24 flex flex-col md:flex-row justify-between items-start gap-12">
                        <h2 className="text-[8vw] md:text-[6rem] leading-[0.85] font-black tracking-[-0.04em] uppercase">
                            {__('Let\'s Build')}
                            <br />
                            <span className="text-primary">{__('Together')}</span>
                        </h2>
                        
                        <div className="flex flex-col gap-6">
                            <a href="mailto:contact@techynews.lat" className="group flex items-center justify-between gap-12 border border-black dark:border-white rounded-full px-8 py-6 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300">
                                <span className="text-xl font-black uppercase tracking-tight">contact@techynews.lat</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </a>
                            <a href="https://www.linkedin.com/in/carlos-silveira" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-12 border border-black dark:border-white rounded-full px-8 py-6 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-colors duration-300">
                                <span className="text-xl font-black uppercase tracking-tight">LinkedIn</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </a>
                            <a href="https://github.com/carlossilveira" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-12 border border-black dark:border-white rounded-full px-8 py-6 hover:bg-black hover:text-white hover:border-black transition-colors duration-300">
                                <span className="text-xl font-black uppercase tracking-tight">GitHub</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
