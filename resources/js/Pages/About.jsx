import React, { useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, X, Briefcase, Calendar, MapPin } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import PublicFooter from '@/Components/PublicFooter';
import useLanguage from '@/Hooks/useLanguage';

// ─── Real SVG Tech Logos ──────────────────────────────────────────────────
const LaravelLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.642 5.43a.364.364 0 0 1 .014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 0 1-.188.326L9.93 23.949a.316.316 0 0 1-.066.027.299.299 0 0 1-.098.024.348.348 0 0 1-.098-.024.316.316 0 0 1-.066-.027L.534 18.755a.377.377 0 0 1-.189-.326V2.974c0-.033.005-.066.014-.098a.367.367 0 0 1 .033-.092c.005-.008.01-.016.015-.023a.303.303 0 0 1 .077-.076l4.514-2.6a.374.374 0 0 1 .377 0l4.514 2.6.024.017a.303.303 0 0 1 .053.059c.006.008.01.016.015.023a.367.367 0 0 1 .033.092c.009.032.014.065.014.098v9.652l3.762-2.166V5.523c0-.033.004-.066.013-.098a.367.367 0 0 1 .034-.092l.014-.023a.261.261 0 0 1 .077-.076l4.514-2.6a.374.374 0 0 1 .377 0l4.515 2.6a.375.375 0 0 1 .091.076c.006.008.011.015.015.024z" fill="#FF2D20" />
    </svg>
);

const ReactLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.104-2.295zm-9.77.004c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.133.563-.133zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-1.73-1.604-2.736-2.852-2.476-.43.09-.89.252-1.375.498z" />
    </svg>
);

const TailwindLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#38BDF8" />
    </svg>
);

const DockerLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.186v1.887c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" fill="#2496ED" />
    </svg>
);

const MySQLLogo = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12.11 18.55c-.17.02-.34.04-.51.05-1.3.08-2.56-.1-3.7-.52-.4-.15-.78-.34-1.14-.56-.36-.23-.69-.49-.98-.78-.29-.3-.54-.63-.74-.99-.21-.36-.36-.75-.46-1.16-.1-.41-.15-.84-.15-1.29 0-.45.05-.88.15-1.29.1-.41.25-.8.46-1.16.2-.36.45-.69.74-.99.29-.3.62-.56.98-.78.36-.22.74-.41 1.14-.56 1.14-.42 2.4-.6 3.7-.52.17.01.34.03.51.05V18.55z" fill="#00758F"/>
        <path d="M12.11 5.01c.17-.02.34-.04.51-.05 1.3-.08 2.56.1 3.7.52.4.15.78.34 1.14.56.36.23.69.49.98.78.29.3.54.63.74.99.21.36.36.75.46 1.16.1.41.15.84.15 1.29 0 .45-.05.88-.15 1.29-.1.41-.25.8-.46 1.16-.2.36-.45.69-.74.99-.29.3-.62.56-.98.78-.36.22-.74.41-1.14.56-1.14.42-2.4.6-3.7.52-.17-.01-.34-.03-.51-.05V5.01z" fill="#F29111"/>
    </svg>
);

const GitLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.604-.404-.541-.534-.677-1.326-.404-1.996L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" fill="#F05032" />
    </svg>
);

const FramerLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF" />
    </svg>
);

const GeminiLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#4285F4" />
    </svg>
);

// ─── Experience Data ─────────────────────────────────────────────────────
const getExperiences = (__) => [
    {
        role: __('Senior Software Engineer'),
        company: 'Tendencys Innovations',
        companyUrl: 'https://www.linkedin.com/company/tendencys-innovation',
        period: 'Sep 2024 – Present',
        location: 'Monterrey, Mexico',
        description: __('Architected and scaled a global shipping API (Laravel Lumen) for Envia.com, integrating international logistics providers via RESTful APIs. Optimized core backend performance and deployed features to streamline global logistics workflows.'),
        tech: ['Laravel', 'Lumen', 'RESTful APIs', 'PHP', 'MySQL'],
        highlights: [__('Architected global shipping API for Envia.com'), __('Integrated international logistics providers'), __('Optimized core backend performance at scale')]
    },
    {
        role: __('Tech Lead & Senior Software Engineer'),
        company: 'Buscabot',
        companyUrl: 'https://www.linkedin.com/company/buscabot/',
        period: 'Jan 2022 – Jul 2024',
        location: 'Remote',
        description: __('Engineered features for a B2B WhatsApp chatbot platform using Laravel, React, Tailwind CSS, MySQL, and GCP, integrated with Twilio. Built internal APIs for car service endpoints and integrated platforms like Parts Tech, Stripe, and Facturapi. Translated automotive industry requirements into technical specifications and implemented TDD and SCRUM methodologies.'),
        tech: ['Laravel', 'React', 'Tailwind CSS', 'MySQL', 'GCP', 'Twilio', 'Stripe', 'PHPUnit'],
        highlights: [__('Led technical direction of B2B WhatsApp chatbot'), __('Integrated Stripe, Twilio, Parts Tech & Facturapi'), __('Implemented TDD (PHPUnit) and SCRUM workflows')]
    },
    {
        role: __('Associate Software Engineer'),
        company: 'Justia',
        companyUrl: 'https://www.linkedin.com/company/justia/',
        period: 'Jun 2019 – Jan 2022',
        location: 'Remote',
        description: __('Built Laravel data parsers to process US government website information for high-traffic platforms including Justia.com and Oyez.org via AWS. Managed technical execution of large-scale email marketing campaigns (Mailchimp, Mandrill, Mailgun). Conducted peer code reviews and resolved complex backend issues for Jurispro.com.'),
        tech: ['Laravel', 'PHP', 'AWS', 'Mailchimp', 'Mandrill', 'Mailgun', 'MySQL'],
        highlights: [__('Built data parsers for Justia.com & Oyez.org on AWS'), __('Managed large-scale email marketing infrastructure'), __('Peer code reviews for Jurispro.com backend')]
    }
];


// ─── Tech Stack ─────────────────────────────────────────────────────────
const techStack = [
    { name: 'Laravel', logo: <LaravelLogo />, color: 'from-red-500/20 to-red-900/0' },
    { name: 'React', logo: <ReactLogo />, color: 'from-blue-400/20 to-blue-900/0' },
    { name: 'Tailwind CSS', logo: <TailwindLogo />, color: 'from-teal-400/20 to-teal-900/0' },
    { name: 'Gemini AI', logo: <GeminiLogo />, color: 'from-blue-500/20 to-blue-900/0' },
    { name: 'Docker', logo: <DockerLogo />, color: 'from-blue-500/20 to-blue-900/0' },
    { name: 'MySQL', logo: <MySQLLogo />, color: 'from-orange-500/20 to-orange-900/0' },
    { name: 'Framer Motion', logo: <FramerLogo />, color: 'from-blue-700/20 to-blue-900/0' },
    { name: 'Git', logo: <GitLogo />, color: 'from-orange-600/20 to-orange-900/0' },
];

export default function About() {
    const [selectedExp, setSelectedExp] = useState(null);
    const { __ } = useLanguage();
    const experiences = getExperiences(__);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <div className="min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-gray-900 dark:text-white font-sans selection:bg-primary/30 overflow-x-hidden relative transition-colors duration-500">
            <Head title={`${__('Carlos Silveira')} | ${__('Full-Stack & AI Engineer')}`} />

            {/* Glowing Background */}
            <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/8 rounded-full blur-[120px] pointer-events-none mix-blend-screen overflow-hidden"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/8 rounded-full blur-[100px] pointer-events-none mix-blend-screen overflow-hidden"></div>

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-32 relative z-10">
                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">

                    {/* Intro Block */}
                    <motion.div
                        {...fadeIn}
                        className="md:col-span-3 bg-white/[0.6] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden group shadow-sm dark:shadow-none transition-all duration-500"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">{__('Portfolio')}</div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                            {__("Hi, I'm")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">{__('Carlos Silveira.')}</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl">
                            {__('Senior Software Engineer with 6+ years shipping Laravel and React products. I write clean backends, build real-time UIs, and integrate AI where it actually makes a difference.')}
                        </p>
                    </motion.div>

                    {/* Social/Links Block */}
                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-1 bg-white/[0.6] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm dark:shadow-none transition-all duration-500"
                    >
                        <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.25em] mb-6">{__('Connect')}</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: 'https://github.com/carlos-silveira' },
                                { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: 'https://linkedin.com/in/carlos-silveira-hinojos' },
                                { icon: <Mail className="w-5 h-5" />, label: 'Email', href: 'mailto:silveira.alberto24@gmail.com' }
                            ].map((social, i) => (
                                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 bg-black/[0.02] dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl hover:bg-primary/20 hover:border-primary/30 transition-all group">
                                    <span className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors flex-shrink-0">{social.icon}</span>
                                    <span className="text-xs font-black text-gray-500 group-hover:text-primary dark:group-hover:text-white uppercase tracking-widest">{social.label}</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tech Stack Block (The Arsenal) */}
                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-2 bg-white/[0.6] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-sm dark:shadow-none transition-all duration-500"
                    >
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
                        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-8 flex items-center gap-2 relative z-10">
                            {__('The Arsenal')}
                        </h3>
                        <div className="grid grid-cols-2 gap-3 relative z-10">
                            {techStack.map((tech, i) => (
                                <InteractiveCard key={i} tech={tech} />
                            ))}
                        </div>
                    </motion.div>

                    {/* What is Techy? Block */}
                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.25 }}
                        className="md:col-span-2 bg-white/[0.6] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group flex flex-col justify-center shadow-sm dark:shadow-none transition-all duration-500"
                    >
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
                        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-6">{__('The Concept')}</h3>
                        <h2 className="text-3xl font-black mb-4 tracking-tight text-gray-900 dark:text-white">{__('What is Techy?')}</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-light transition-colors text-pretty text-balance">
                            {__('Techy is an')} <span className="text-gray-900 dark:text-white font-black transition-colors">{__('AI-powered news ecosystem')}</span> {__('designed to redefine information consumption. It merges high-performance web architecture with advanced language models to deliver a personalized, lightning-fast, and deeply immersive experience for the next generation of tech enthusiasts.')}
                        </p>
                    </motion.div>

                    {/* Experience Block */}
                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 bg-white/[0.6] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-sm dark:shadow-none transition-all duration-500"
                    >
                        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-8">{__('Experience')}</h3>
                        <div className="space-y-4">
                            {experiences.map((exp, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedExp(exp)}
                                    className="w-full text-left flex items-center justify-between p-5 rounded-2xl bg-black/[0.01] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-primary/30 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-all group/exp"
                                >
                                    <div className="min-w-0 flex-1 pr-4">
                                        <div className="font-black text-gray-900 dark:text-white text-sm tracking-tight group-hover/exp:text-primary transition-colors truncate">{exp.role}</div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 flex items-center gap-2 truncate">
                                            <Briefcase className="w-3 h-3 flex-shrink-0" />{exp.company}
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0 flex flex-col items-end">
                                        <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-1 whitespace-nowrap">
                                            <Calendar className="w-3 h-3" />{exp.period}
                                        </div>
                                        <div className="mt-1.5 text-[10px] font-black text-primary opacity-0 group-hover/exp:opacity-100 transition-opacity uppercase tracking-widest">
                                            {__('View Details')} →
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Techy News Feature Block */}
                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.35 }}
                        className="md:col-span-2 bg-white/[0.6] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 flex items-center gap-8 group shadow-sm dark:shadow-none transition-all duration-500"
                    >
                        <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform duration-500">
                            <img src="/img/logo_wbc.png" alt="Techy News" className="w-14 h-14 object-contain dark:brightness-100 brightness-0" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-2xl font-black mb-2 tracking-tight text-gray-900 dark:text-white truncate">{__('Techy News CMS')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                                {__('A fully functional AI-powered journalism platform prototype. Features on-device summarization, command palette search, and infinite scroll discovery.')}
                            </p>
                            <Link href="/archive" className="inline-flex items-center mt-4 text-primary text-[10px] font-black uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors gap-2">
                                {__('Explore the Platform')} <ExternalLink className="w-3 h-3" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* CTA Block */}
                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-4 bg-black dark:bg-white text-white dark:text-black rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center group cursor-pointer hover:scale-[1.01] transition-all duration-500"
                    >
                        <h2 className="text-4xl font-black tracking-tight mb-2">{__('Have a radical idea?')}</h2>
                        <p className="text-xl text-gray-400 dark:text-gray-600 mb-8 font-medium max-w-xl text-pretty">{__("Let's build the next era of digital intelligence together. I'm always open to discussing technical challenges and ambitious products.")}</p>
                        <a href="mailto:silveira.alberto24@gmail.com" className="px-10 py-4 bg-white dark:bg-black text-black dark:text-white rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-transform text-base shadow-2xl">
                            {__('Get in Touch')} <Mail className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>
            </main>

            <PublicFooter />

            {/* ─── Experience Modal ─── */}
            <AnimatePresence>
                {selectedExp && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedExp(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-2xl bg-white dark:bg-[#02040a] border border-black/10 dark:border-white/10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[85vh] md:max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="flex items-start justify-between p-8 md:p-10 border-b border-black/5 dark:border-white/5 flex-shrink-0 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm">
                                <div className="min-w-0 pr-6">
                                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-2">{__('Experience')}</div>
                                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white truncate">{selectedExp.role}</h2>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                                        <a href={selectedExp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 font-bold flex items-center gap-1.5 hover:text-primary transition-colors group">
                                            <Briefcase className="w-4 h-4" />
                                            {selectedExp.company}
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap">
                                            <Calendar className="w-3.5 h-3.5" />{selectedExp.period}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap">
                                            <MapPin className="w-3.5 h-3.5" />{selectedExp.location}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedExp(null)}
                                    className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition-all group flex-shrink-0"
                                >
                                    <X className="w-6 h-6 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 md:p-10 space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40 scrollbar-track-transparent">
                                <div>
                                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed text-pretty">{selectedExp.description}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.25em]">{__('Key Highlights')}</div>
                                    <ul className="space-y-3">
                                        {selectedExp.highlights.map((h, i) => (
                                            <li key={i} className="flex items-start gap-4 text-base md:text-lg text-gray-700 dark:text-gray-300 font-light leading-snug">
                                                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 shadow-[0_0_10px_rgba(43,124,238,0.5)]"></span>
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-4 pt-2 pb-4">
                                    <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.25em]">{__('Tech Stack')}</div>
                                    <div className="flex flex-wrap gap-2.5">
                                        {selectedExp.tech.map((t, i) => (
                                            <span key={i} className="text-[10px] font-black uppercase tracking-widest bg-primary/5 dark:bg-primary/10 border border-primary/10 text-primary px-4 py-2 rounded-xl">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function InteractiveCard({ tech }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className="flex items-center gap-3 p-4 bg-white/[0.6] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-2xl hover:border-black/10 dark:hover:border-white/15 transition-all cursor-default shadow-sm dark:shadow-none"
        >
            <div
                style={{ transform: "translateZ(30px)" }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xl bg-gradient-to-br ${tech.color} to-transparent flex-shrink-0 overflow-hidden`}
            >
                {tech.logo}
            </div>
            <span
                style={{ transform: "translateZ(20px)" }}
                className="font-black text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors tracking-tight truncate"
            >
                {tech.name}
            </span>
        </motion.div>
    );
}
