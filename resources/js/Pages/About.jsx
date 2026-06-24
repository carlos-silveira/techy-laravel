import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowRight, Cpu, ChevronDown } from 'lucide-react';
import { SiLaravel, SiReact, SiTailwindcss, SiDocker, SiMysql, SiFramer, SiGit, SiGoogle } from 'react-icons/si';
import Navbar from '@/Components/Navbar';
import PublicFooter from '@/Components/PublicFooter';
import CommandPalette from '@/Components/CommandPalette';
const RagCopilot = React.lazy(() => import('@/Components/RagCopilot'));
import useLanguage from '@/Hooks/useLanguage';

// Apple-like Parallax Floating Shapes
const FloatingShapes = () => {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [45, 225]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Ambient Glows */}
            <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[#00b4ff]/5 rounded-full blur-[150px] mix-blend-screen dark:mix-blend-lighten" />
            <div className="fixed bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/5 rounded-full blur-[120px] mix-blend-screen dark:mix-blend-lighten" />

            {/* Grid Pattern */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_10%,transparent_100%)] z-0" />

            {/* Floating Elements */}
            <motion.div style={{ y: y1, rotate: rotate1 }} className="absolute top-[20%] left-[10%] opacity-20 dark:opacity-40">
                <div className="w-32 h-32 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 border border-black/10 dark:border-white/10 rounded-full" />
                </div>
            </motion.div>
            
            <motion.div style={{ y: y2, rotate: rotate2 }} className="absolute top-[60%] right-[15%] opacity-20 dark:opacity-40">
                <div className="w-40 h-40 border border-black/10 dark:border-white/10 flex items-center justify-center">
                    <div className="w-20 h-20 border border-[#00b4ff]/20" />
                </div>
            </motion.div>

            <motion.div style={{ y: y3 }} className="absolute top-[80%] left-[20%] opacity-30">
                <Cpu className="w-16 h-16 text-black/5 dark:text-white/5 stroke-[0.5px]" />
            </motion.div>
        </div>
    );
};

export default function About() {
    const { __ } = useLanguage();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });
    
    // Interactive Cursor Spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const backgroundGlow = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(0, 180, 255, 0.08), transparent 80%)`;

    // Apple-like scroll transforms for Hero
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

    const tools = [
        { name: 'Laravel', icon: SiLaravel, url: 'https://laravel.com' },
        { name: 'React', icon: SiReact, url: 'https://react.dev' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, url: 'https://tailwindcss.com' },
        { name: 'Gemini AI', icon: SiGoogle, url: 'https://deepmind.google/technologies/gemini/' },
        { name: 'Docker', icon: SiDocker, url: 'https://www.docker.com' },
        { name: 'MySQL', icon: SiMysql, url: 'https://www.mysql.com' },
        { name: 'Framer Motion', icon: SiFramer, url: 'https://www.framer.com/motion/' },
        { name: 'Git', icon: SiGit, url: 'https://git-scm.com' },
    ];

    const experiences = [
        {
            title: __('Senior Software Engineer'),
            company: "Tendencys Innovations",
            url: "https://tendencys.com/",
            date: __('Sep 2024 – Present'),
            description: __('Architected and scaled a global shipping API (Laravel Lumen) for Envia.com, integrating international logistics providers via RESTful APIs. Optimized core backend performance and deployed features to streamline global logistics workflows.')
        },
        {
            title: __('Tech Lead & Senior Software Engineer'),
            company: "BuscaBot",
            date: __('Jan 2022 – Jul 2024'),
            description: __('Engineered features for a B2B WhatsApp chatbot platform using Laravel, React, Tailwind CSS, MySQL, and GCP, integrated with Twilio. Built internal APIs for car service endpoints and integrated platforms like Parts Tech, Stripe, and Facturapi. Translated automotive industry requirements into technical specifications and implemented TDD and SCRUM methodologies.')
        },
        {
            title: __('Associate Software Engineer'),
            company: "Justia",
            url: "https://justia.com/",
            date: __('Jun 2019 – Jan 2022'),
            description: __('Built Laravel data parsers to process US government website information for high-traffic platforms including Justia.com and Oyez.org via AWS. Managed technical execution of large-scale email marketing campaigns (Mailchimp, Mandrill, Mailgun). Conducted peer code reviews and resolved complex backend issues for Jurispro.com.')
        }
    ];

    const [expandedExp, setExpandedExp] = useState(null);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-black dark:text-white font-sans selection:bg-[#00b4ff]/30 selection:text-black dark:selection:text-white transition-colors duration-500 overflow-x-hidden relative">
            <Head title={`${__('About')} | Carlos Silveira`} />
            
            <CommandPalette />
            
            {/* Interactive Cursor Spotlight */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300"
                style={{ background: backgroundGlow }}
            />

            <FloatingShapes />
            
            <Navbar />

            {/* Hero Section Container */}
            <div className="relative z-10 pt-32 md:pt-40 pb-24 px-6 md:px-12 max-w-[1300px] mx-auto min-h-[70vh]">
                <motion.section 
                    style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                    className="flex flex-col md:flex-row items-start justify-between gap-[60px] sticky top-40"
                >
                    <div className="max-w-[700px] relative">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00b4ff] animate-pulse"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600 dark:text-gray-400">
                                {__('Developer Portfolio')}
                            </span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="text-[64px] sm:text-[84px] md:text-[113px] leading-[0.85] tracking-[-0.04em] font-extralight text-black dark:text-white mb-[40px] drop-shadow-sm"
                        >
                            Carlos Silveira.
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-[16px] md:text-[20px] leading-[1.6] tracking-[0.02em] text-gray-700 dark:text-gray-300 mb-[48px] font-light max-w-[600px]"
                        >
                            {__('Senior Software Engineer with 6+ years of experience building scalable systems and interactive interfaces. I specialize in Laravel, React, and integrating advanced AI pipelines to solve complex problems.')}
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="flex items-center gap-4"
                        >
                            <a href="https://github.com/carlossilveira" target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-black/10 dark:border-white/10 hover:border-[#00b4ff] hover:bg-[#00b4ff]/5 transition-all text-gray-600 dark:text-gray-400 hover:text-[#00b4ff]">
                                <Github className="w-5 h-5 stroke-[1.5px]" />
                            </a>
                            <a href="https://linkedin.com/in/carlossilveira" target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-black/10 dark:border-white/10 hover:border-[#00b4ff] hover:bg-[#00b4ff]/5 transition-all text-gray-600 dark:text-gray-400 hover:text-[#00b4ff]">
                                <Linkedin className="w-5 h-5 stroke-[1.5px]" />
                            </a>
                            <a href="mailto:silveira.alberto24@gmail.com" className="flex items-center justify-center w-12 h-12 rounded-full border border-black/10 dark:border-white/10 hover:border-[#00b4ff] hover:bg-[#00b4ff]/5 transition-all text-gray-600 dark:text-gray-400 hover:text-[#00b4ff]">
                                <Mail className="w-5 h-5 stroke-[1.5px]" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Premium CV Bento Box Grid */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="hidden lg:grid grid-cols-2 gap-4 w-full max-w-[480px] mt-12 md:mt-0"
                    >
                        {/* Experience Box */}
                        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] p-6 flex flex-col justify-between backdrop-blur-md hover:border-[#00b4ff]/40 hover:bg-[#00b4ff]/5 transition-all duration-300 group shadow-sm dark:shadow-none">
                            <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black mb-8">{__('Experience')}</span>
                            <div>
                                <div className="text-[54px] font-extralight text-black dark:text-white mb-1 group-hover:text-[#00b4ff] transition-colors leading-none tracking-tighter">{Math.floor((new Date() - new Date(2019, 5, 1)) / (1000 * 60 * 60 * 24 * 365.25))}+</div>
                                <div className="text-[13px] font-medium text-gray-600 dark:text-gray-400 leading-snug">{__('Years building scalable systems')}</div>
                            </div>
                        </div>

                        {/* Languages Box */}
                        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] p-6 flex flex-col justify-between backdrop-blur-md hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-300 group shadow-sm dark:shadow-none">
                            <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black mb-8">{__('Language')}</span>
                            <div>
                                <div className="text-[42px] font-extralight text-black dark:text-white mb-2 group-hover:text-purple-500 transition-colors leading-none tracking-tighter">C1</div>
                                <div className="text-[13px] font-medium text-gray-600 dark:text-gray-400 leading-snug">{__('Advanced English')}</div>
                            </div>
                        </div>

                        {/* Education/Location Box - Full Width */}
                        <div className="col-span-2 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 dark:to-transparent border border-black/10 dark:border-white/10 rounded-[2rem] p-8 flex items-center justify-between backdrop-blur-md hover:border-[#00b4ff]/40 transition-all duration-300 group overflow-hidden relative shadow-sm dark:shadow-none">
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#00b4ff]/10 rounded-full blur-[50px] group-hover:bg-[#00b4ff]/20 transition-colors"></div>
                            <div className="relative z-10 flex flex-col gap-3">
                                <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">{__('Base of Operations')}</span>
                                <div className="text-[28px] font-extralight text-black dark:text-white tracking-tight">Saltillo, Mexico</div>
                                <div className="text-[14px] font-light text-gray-600 dark:text-gray-400">{__('Computer Systems Engineering (2015-2020)')}</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>
            </div>

            {/* The Solid Sheet that slides up over the background */}
            <div className="relative z-20 bg-[#f8f6f6] dark:bg-[#02040a] rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-20px_40px_rgba(0,0,0,0.5)] w-full">
                
                {/* Inner Constrained Content */}
                <div className="max-w-[1300px] mx-auto pt-24 pb-24 px-6 md:px-12">
                    
                    {/* Split Content: Arsenal & System Concept */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] mb-[120px]">
                        
                        {/* Tech Stack */}
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col gap-[40px]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-1 h-6 bg-[#00b4ff] rounded-full"></div>
                                <h2 className="text-[32px] md:text-[42px] font-extralight tracking-[-0.02em] text-black dark:text-white leading-none">
                                    {__('Tech Stack')}
                                </h2>
                            </div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[16px]">
                                {tools.map((tool, index) => (
                                    <motion.a 
                                        href={tool.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        key={tool.name}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="flex flex-col items-center justify-center gap-3 p-[24px] rounded-[24px] border border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-md hover:border-[#00b4ff]/40 hover:shadow-lg transition-all duration-300 group relative overflow-hidden cursor-pointer"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#00b4ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <tool.icon className="w-7 h-7 text-gray-500 dark:text-gray-500 group-hover:text-[#00b4ff] transition-colors stroke-[1px] relative z-10" />
                                        <span className="text-[10px] uppercase tracking-[0.1em] font-black text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors relative z-10 text-center">{tool.name}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Featured Project */}
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col gap-[40px]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-1 h-6 bg-[#00b4ff] rounded-full opacity-0"></div>
                                <h2 className="text-[32px] md:text-[42px] font-extralight tracking-[-0.02em] text-black dark:text-white leading-none">
                                    {__('Featured Project')}
                                </h2>
                            </div>

                            <a href="https://github.com/carlos-silveira/techy-laravel" target="_blank" rel="noreferrer" className="block mt-12 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-[2rem] p-8 md:p-12 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden shadow-sm dark:shadow-none transition-transform duration-500 hover:scale-[1.02] cursor-pointer">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#00b4ff]/10 to-purple-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                
                                <div className="absolute -right-10 -top-10 opacity-[0.03] dark:opacity-5 group-hover:rotate-12 transition-transform duration-1000 pointer-events-none">
                                    <Cpu className="w-64 h-64 stroke-[0.5px]" />
                                </div>

                                <div className="relative z-10">
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#00b4ff] font-black block mb-4">{__('TechyNews Platform')}</span>
                                    <h3 className="text-[36px] font-extralight tracking-[-0.02em] leading-[1.1] text-black dark:text-white mb-6">
                                        {__('AI-powered journalism.')}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-[16px] leading-[1.6] tracking-[0.02em] max-w-[400px] font-light">
                                        {__('A fully functional platform delivering automated synthesis of global tech news. Features automated summarization, RAG keyword search, and autonomous RSS broadcast pipelines.')}
                                    </p>
                                </div>
                            </a>
                        </motion.div>

                    </section>

                    {/* Interactive Experience List */}
                    <motion.section 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-[40px] mb-[120px]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-1 h-6 bg-[#00b4ff] rounded-full"></div>
                            <h2 className="text-[32px] md:text-[42px] font-extralight tracking-[-0.02em] text-black dark:text-white leading-none">
                                {__('Experience')}
                            </h2>
                        </div>

                        <div className="flex flex-col">
                            {experiences.map((exp, index) => {
                                const isExpanded = expandedExp === index;
                                return (
                                    <motion.div 
                                        key={index}
                                        layout
                                        onClick={() => setExpandedExp(isExpanded ? null : index)}
                                        className={`flex flex-col border-b border-black/5 dark:border-white/5 cursor-pointer group transition-colors overflow-hidden py-[32px] ${isExpanded ? 'bg-black/5 dark:bg-white/5 px-6 rounded-[24px]' : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02] px-6 rounded-[24px]'}`}
                                    >
                                        <motion.div layout className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex flex-col gap-2">
                                                <h3 className={`text-[22px] font-extralight tracking-tight transition-colors ${isExpanded ? 'text-[#00b4ff]' : 'text-black dark:text-white group-hover:text-[#00b4ff]'}`}>
                                                    {exp.title}
                                                </h3>
                                                <div className="flex items-center gap-3">
                                                    {exp.url ? (
                                                        <a href={exp.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-[12px] text-gray-500 dark:text-gray-400 tracking-[0.1em] uppercase font-black hover:text-[#00b4ff] hover:underline transition-colors">{exp.company}</a>
                                                    ) : (
                                                        <span className="text-[12px] text-gray-500 dark:text-gray-400 tracking-[0.1em] uppercase font-black">{exp.company}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/30 backdrop-blur-sm">
                                                    {exp.date}
                                                </div>
                                                <motion.div 
                                                    animate={{ rotate: isExpanded ? 180 : 0 }} 
                                                    className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-400 group-hover:text-[#00b4ff] group-hover:border-[#00b4ff]/40 transition-colors"
                                                >
                                                    <ChevronDown className="w-4 h-4" />
                                                </motion.div>
                                            </div>
                                        </motion.div>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div 
                                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                    animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-[15px] text-gray-600 dark:text-gray-300 font-light leading-[1.6] max-w-[800px] pl-4 border-l-2 border-[#00b4ff]/30">
                                                        {exp.description}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.section>

                    {/* Footer CTA */}
                    <motion.section 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="mb-[60px]"
                    >
                        <div className="bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-[3rem] p-12 md:p-24 relative overflow-hidden group shadow-sm dark:shadow-none text-center flex flex-col items-center justify-center">
                            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00b4ff]/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-1000 group-hover:scale-125"></div>
                            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
                            
                            <h2 className="text-[48px] md:text-[84px] font-extralight tracking-[-0.04em] text-black dark:text-white leading-[0.9] mb-8 relative z-10">
                                {__('Let\'s build something great.')}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-[18px] tracking-[0.02em] max-w-[500px] mb-12 font-light relative z-10">
                                {__('I\'m always open to discussing technical challenges and new opportunities.')}
                            </p>
                            <a href="mailto:silveira.alberto24@gmail.com" className="relative z-10 bg-[#00b4ff] text-white px-8 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.2em] hover:bg-[#00b4ff]/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,180,255,0.3)] flex items-center gap-3">
                                {__('Initiate Contact')} <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.section>

                </div>

                <PublicFooter />
            </div>
            
            <React.Suspense fallback={null}>
                <RagCopilot />
            </React.Suspense>
        </div>
    );
}
