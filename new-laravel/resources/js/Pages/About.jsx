import React, { useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, X, Briefcase, Calendar, MapPin } from 'lucide-react';

// ─── Real SVG Tech Logos ──────────────────────────────────────────────────
const LaravelLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.642 5.43a.364.364 0 0 1 .014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 0 1-.188.326L9.93 23.949a.316.316 0 0 1-.066.027.299.299 0 0 1-.098.024.348.348 0 0 1-.098-.024.316.316 0 0 1-.066-.027L.534 18.755a.377.377 0 0 1-.189-.326V2.974c0-.033.005-.066.014-.098a.367.367 0 0 1 .033-.092c.005-.008.01-.016.015-.023a.303.303 0 0 1 .077-.076l4.514-2.6a.374.374 0 0 1 .377 0l4.514 2.6.024.017a.303.303 0 0 1 .053.059c.006.008.01.016.015.023a.367.367 0 0 1 .033.092c.009.032.014.065.014.098v9.652l3.762-2.166V5.523c0-.033.004-.066.013-.098a.367.367 0 0 1 .034-.092l.014-.023a.261.261 0 0 1 .077-.076l4.514-2.6a.374.374 0 0 1 .377 0l4.515 2.6a.375.375 0 0 1 .091.076c.006.008.011.015.015.024z" fill="#FF2D20" />
    </svg>
);

const ReactLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.104-2.295zm-9.77.004c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.133.563-.133zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" fill="#61DAFB" />
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
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.151h-.002zm-5.71 3.03c-.024 0-.049 0-.067.013.048.143.135.28.21.41.168-.013.34-.038.508-.051v-.01c-.129-.18-.268-.36-.413-.53-.08.04-.157.083-.237.134v.034zm16.05 1.638c-.22-.63-.584-1.185-1.055-1.633a4.8 4.8 0 0 0-1.588-.958 5.6 5.6 0 0 0-1.79-.327c-.52-.012-1.042.003-1.562.007V7.25c-.01-.032-.016-.064-.026-.097a5.53 5.53 0 0 0-.69-1.525A5.607 5.607 0 0 0 19.55 4.5a5.474 5.474 0 0 0-1.75-.5c-.616-.028-1.234-.014-1.85.02-.49.026-.972.088-1.446.183a14.6 14.6 0 0 0-1.4.37c-.256.088-.503.191-.753.293-.065.026-.13.055-.195.083l-.09.04c-.213.095-.42.199-.625.312l-.3.18c-.166.107-.325.22-.476.34-.228.18-.443.372-.632.575-.072.08-.138.164-.198.252l.054.065c.1.087.196.177.287.27.18.18.35.374.518.568.16.184.316.37.469.557-.01-.03-.024-.058-.038-.087a4.68 4.68 0 0 0-1.51-2.01A5.09 5.09 0 0 0 8.1 4.87c-.3-.013-.605.01-.903.065-.158.032-.312.073-.462.12.008.005.019.007.027.012.077.045.152.094.227.14.135.087.265.18.389.276.33.255.638.535.92.835.276.293.53.604.754.932.185.27.354.55.506.844.18.348.336.706.466 1.073-.093-.085-.186-.17-.283-.25a5.22 5.22 0 0 0-.94-.605A4.697 4.697 0 0 0 7.2 7.73a5.15 5.15 0 0 0-.983-.075c.03.066.063.13.098.194.085.162.177.319.278.47.108.16.226.312.35.46l.017.02.03.034c.148.163.312.312.488.446.064.048.13.092.197.135.122.078.248.15.378.213.032.015.064.03.098.044a5.35 5.35 0 0 0 .452.158c.12.036.242.068.366.094.092.02.185.038.278.05l.024.003c.059.007.117.012.177.015.19.01.382.008.567-.01.025-.003.05-.007.073-.012.136-.026.268-.062.4-.106.062-.02.124-.042.185-.066.085-.034.167-.073.248-.115.065-.033.131-.067.194-.104A4.75 4.75 0 0 0 11.17 9a4.84 4.84 0 0 0 .405-.435c.087-.108.17-.22.247-.336.092-.14.175-.288.252-.44.062-.127.12-.257.173-.39.02-.052.04-.105.057-.159.14-.417.212-.85.215-1.285a4.08 4.08 0 0 0-.014-.327 7.54 7.54 0 0 0-.115-.64 7.59 7.59 0 0 0-.266-.86c-.06-.162-.13-.32-.204-.476a4.74 4.74 0 0 0-.26-.45zM1.545 11.26c.035.048.067.097.1.146.038.058.077.117.112.177.028.047.052.096.077.145.032.065.06.132.086.2.38.956.437 2.007.23 3.008a6.017 6.017 0 0 1-.72 1.797A5.88 5.88 0 0 1 0 18.234v.112c.06.002.12.005.18.01a4.26 4.26 0 0 0 1.156-.11 4.54 4.54 0 0 0 1.024-.406A4.68 4.68 0 0 0 3.75 17a5.03 5.03 0 0 0 .826-1.165 5.1 5.1 0 0 0 .543-2.193v-.075c0-.048-.002-.096-.005-.143a5.14 5.14 0 0 0-.088-.734 5.1 5.1 0 0 0-.26-.858 5.35 5.35 0 0 0-.484-.886 5.24 5.24 0 0 0-.737-.84zM22.33 8.09a3.78 3.78 0 0 1 .386.386c.11.127.207.262.296.403.093.147.175.302.245.463.047.11.088.223.12.338.025.086.044.174.059.263.015.09.025.18.03.27.003.044.004.089.004.134a5.62 5.62 0 0 1-.053.78c-.039.24-.1.474-.183.7a5.4 5.4 0 0 1-.317.699l-.07.126a5.37 5.37 0 0 1-.44.59 5.44 5.44 0 0 1-.695.647c-.1.075-.2.145-.302.21a5.37 5.37 0 0 1-.51.26 5.42 5.42 0 0 1-.694.23 5.44 5.44 0 0 1-.75.118c-.126.012-.253.018-.38.018h-.07c-.46 0-.92-.062-1.362-.186a5.41 5.41 0 0 1-.67-.24 5.42 5.42 0 0 1-.62-.344 5.61 5.61 0 0 1-.826-.736c-.08-.085-.154-.173-.223-.264a5.41 5.41 0 0 1-.66-1.354v-.01c-.02-.072-.038-.145-.054-.22a5.64 5.64 0 0 1-.079-.672 4.95 4.95 0 0 1-.003-.265c0-.079.002-.158.006-.237.004-.079.01-.158.02-.237.008-.079.02-.157.034-.234.014-.078.03-.155.05-.231.02-.075.043-.15.068-.224.026-.074.054-.147.085-.22.03-.07.064-.14.1-.208.037-.07.077-.137.12-.203a5.5 5.5 0 0 1 .264-.36c.05-.058.1-.114.155-.168.053-.054.11-.107.168-.157a5.31 5.31 0 0 1 .362-.27 5.4 5.4 0 0 1 .388-.22 5.38 5.38 0 0 1 .413-.17 5.35 5.35 0 0 1 .435-.12 5.32 5.32 0 0 1 .455-.07c.075-.009.152-.016.23-.02a5.64 5.64 0 0 1 .47-.013c.079.002.157.006.234.012.078.006.155.014.232.024.077.01.153.022.228.036a5.43 5.43 0 0 1 .448.117c.07.023.14.05.208.078a5.32 5.32 0 0 1 .396.2 5.37 5.37 0 0 1 .354.24c.055.04.108.084.16.13z" fill="#4479A1" />
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

const OllamaLogo = () => (
    <svg viewBox="0 0 40 40" fill="currentColor" className="w-6 h-6">
        <circle cx="20" cy="20" r="20" fill="#1a1a2e" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="13" fontWeight="900" fill="white" fontFamily="monospace">AI</text>
    </svg>
);

// ─── Experience Data ─────────────────────────────────────────────────────
const experiences = [
    {
        role: 'Senior Software Engineer',
        company: 'Tendencys Innovations',
        companyUrl: 'https://www.linkedin.com/company/tendencys-innovation',
        period: 'Sep 2024 – Present',
        location: 'Monterrey, Mexico',
        description: 'Architected and scaled a global shipping API (Laravel Lumen) for Envia.com, integrating international logistics providers via RESTful APIs. Optimized core backend performance and deployed features to streamline global logistics workflows.',
        tech: ['Laravel', 'Lumen', 'RESTful APIs', 'PHP', 'MySQL'],
        highlights: ['Architected global shipping API for Envia.com', 'Integrated international logistics providers', 'Optimized core backend performance at scale']
    },
    {
        role: 'Tech Lead & Senior Software Engineer',
        company: 'Buscabot',
        companyUrl: 'https://www.linkedin.com/company/buscabot/',
        period: 'Jan 2022 – Jul 2024',
        location: 'Remote',
        description: 'Engineered features for a B2B WhatsApp chatbot platform using Laravel, React, Tailwind CSS, MySQL, and GCP, integrated with Twilio. Built internal APIs for car service endpoints and integrated platforms like Parts Tech, Stripe, and Facturapi. Translated automotive industry requirements into technical specifications and implemented TDD and SCRUM methodologies.',
        tech: ['Laravel', 'React', 'Tailwind CSS', 'MySQL', 'GCP', 'Twilio', 'Stripe', 'PHPUnit'],
        highlights: ['Led technical direction of B2B WhatsApp chatbot', 'Integrated Stripe, Twilio, Parts Tech & Facturapi', 'Implemented TDD (PHPUnit) and SCRUM workflows']
    },
    {
        role: 'Associate Software Engineer',
        company: 'Justia',
        companyUrl: 'https://www.linkedin.com/company/justia/',
        period: 'Jun 2019 – Jan 2022',
        location: 'Remote',
        description: 'Built Laravel data parsers to process US government website information for high-traffic platforms including Justia.com and Oyez.org via AWS. Managed technical execution of large-scale email marketing campaigns (Mailchimp, Mandrill, Mailgun). Conducted peer code reviews and resolved complex backend issues for Jurispro.com.',
        tech: ['Laravel', 'PHP', 'AWS', 'Mailchimp', 'Mandrill', 'Mailgun', 'MySQL'],
        highlights: ['Built data parsers for Justia.com & Oyez.org on AWS', 'Managed large-scale email marketing infrastructure', 'Peer code reviews for Jurispro.com backend']
    }
];


// ─── Tech Stack ─────────────────────────────────────────────────────────
const techStack = [
    { name: 'Laravel', logo: <LaravelLogo />, color: 'from-red-500/20 to-red-900/0' },
    { name: 'React', logo: <ReactLogo />, color: 'from-blue-400/20 to-blue-900/0' },
    { name: 'Tailwind CSS', logo: <TailwindLogo />, color: 'from-teal-400/20 to-teal-900/0' },
    { name: 'Ollama AI', logo: <OllamaLogo />, color: 'from-purple-500/20 to-purple-900/0' },
    { name: 'Docker', logo: <DockerLogo />, color: 'from-blue-500/20 to-blue-900/0' },
    { name: 'MySQL', logo: <MySQLLogo />, color: 'from-orange-500/20 to-orange-900/0' },
    { name: 'Framer Motion', logo: <FramerLogo />, color: 'from-blue-700/20 to-blue-900/0' },
    { name: 'Git', logo: <GitLogo />, color: 'from-orange-600/20 to-orange-900/0' },
];

export default function About() {
    const [selectedExp, setSelectedExp] = useState(null);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <div className="min-h-screen bg-[#02040a] text-white font-sans selection:bg-primary/30 overflow-x-hidden relative">
            <Head title="Carlos Silveira | Full-Stack & AI Engineer" />

            {/* Glowing Background */}
            <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/8 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/8 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

            {/* Navbar */}
            <nav className="border-b border-white/5 bg-[#02040a]/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <img src="/img/logo_wbc.png" alt="Techy News" className="h-8 w-auto" />
                    </Link>
                    <div className="space-x-8 flex items-center">
                        <Link href="/archive" className="text-sm font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Archive</Link>
                        <Link href="/about" className="text-sm font-black uppercase tracking-widest text-white transition-colors">About</Link>
                        <Link href="/dashboard" className="px-5 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all shadow-lg text-sm">
                            Studio
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">

                    {/* Intro Block */}
                    <motion.div
                        {...fadeIn}
                        className="md:col-span-3 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Portfolio</div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Carlos Silveira.</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                            Senior Software Engineer with 6+ years shipping Laravel and React products. I write clean backends, build real-time UIs, and integrate AI where it actually makes a difference.
                        </p>
                    </motion.div>

                    {/* Social/Links Block */}
                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-1 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between"
                    >
                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] mb-6">Connect</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: 'https://github.com/carlos-silveira' },
                                { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: 'https://linkedin.com/in/carlos-silveira-hinojos' },
                                { icon: <Mail className="w-5 h-5" />, label: 'Email', href: 'mailto:silveira.alberto24@gmail.com' }
                            ].map((social, i) => (
                                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-primary/20 hover:border-primary/30 transition-all group">
                                    <span className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors flex-shrink-0">{social.icon}</span>
                                    <span className="text-xs font-black text-gray-500 group-hover:text-primary uppercase tracking-widest">{social.label}</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tech Stack Block (The Arsenal) */}
                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
                        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-8 flex items-center gap-2 relative z-10">
                            The Arsenal
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
                        className="md:col-span-2 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group flex flex-col justify-center"
                    >
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
                        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-6">The Concept</h3>
                        <h2 className="text-3xl font-black mb-4 tracking-tight text-white">What is Techy?</h2>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                            Techy is an <span className="text-white font-bold">AI-powered news ecosystem</span> designed to redefine information consumption. It merges high-performance web architecture with advanced language models to deliver a personalized, lightning-fast, and deeply immersive experience for the next generation of tech enthusiasts.
                        </p>
                    </motion.div>

                    {/* Experience Block */}
                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group"
                    >
                        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-8">Experience</h3>
                        <div className="space-y-4">
                            {experiences.map((exp, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedExp(exp)}
                                    className="w-full text-left flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 hover:bg-white/[0.04] transition-all group/exp"
                                >
                                    <div>
                                        <div className="font-black text-white text-sm tracking-tight group-hover/exp:text-primary transition-colors">{exp.role}</div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                                            <Briefcase className="w-3 h-3" />{exp.company}
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0 ml-4">
                                        <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />{exp.period}
                                        </div>
                                        <div className="mt-1.5 text-[10px] font-black text-primary opacity-0 group-hover/exp:opacity-100 transition-opacity uppercase tracking-widest">
                                            View Details →
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
                        className="md:col-span-2 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 flex items-center gap-8 group"
                    >
                        <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform duration-500">
                            <img src="/img/logo_wbc.png" alt="Techy News" className="w-14 h-14 object-contain" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black mb-2 tracking-tight">Techy News CMS</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                A fully functional AI-powered journalism platform prototype. Features on-device summarization, command palette search, and infinite scroll discovery.
                            </p>
                            <Link href="/archive" className="inline-flex items-center mt-4 text-primary text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors gap-2">
                                Explore the Platform <ExternalLink className="w-3 h-3" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* CTA Block */}
                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-4 bg-white text-black rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                        <h2 className="text-4xl font-black tracking-tight mb-2">Have a radical idea?</h2>
                        <p className="text-xl text-gray-600 mb-8 font-medium max-w-xl">Let's build the next era of digital intelligence together. I'm always open to discussing technical challenges and ambitious products.</p>
                        <a href="mailto:hello@carlossilveira.com" className="px-10 py-4 bg-black text-white rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-transform text-base shadow-2xl">
                            Get in Touch <Mail className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <img src="/img/logo_wbc.png" alt="Techy News" className="h-7 w-auto opacity-50 hover:opacity-100 transition-opacity" />
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-700">© 2026 Carlos Silveira</p>
                    <div className="flex space-x-8">
                        <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">Home</Link>
                        <Link href="/archive" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">Archive</Link>
                        <a href="https://github.com/carlos-silveira" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">GitHub</a>
                    </div>
                </div>
            </footer>

            {/* ─── Experience Modal ─────────────────────────────────── */}
            <AnimatePresence>
                {selectedExp && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedExp(null)}
                            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-2xl bg-[#02040a] border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] z-[10000] overflow-y-auto max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="flex items-start justify-between p-8 border-b border-white/5">
                                <div>
                                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-2">Experience</div>
                                    <h2 className="text-2xl font-black tracking-tight text-white">{selectedExp.role}</h2>
                                    <div className="flex flex-wrap items-center gap-3 mt-2">
                                        <a href={selectedExp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 font-bold flex items-center gap-1.5 hover:text-primary transition-colors group">
                                            <Briefcase className="w-4 h-4" />
                                            {selectedExp.company}
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                        <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />{selectedExp.period}
                                        </span>
                                        <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />{selectedExp.location}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedExp(null)}
                                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 space-y-6">
                                <p className="text-gray-400 font-light leading-relaxed">{selectedExp.description}</p>

                                <div>
                                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.25em] mb-3">Key Highlights</div>
                                    <ul className="space-y-2">
                                        {selectedExp.highlights.map((h, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-light">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.25em] mb-3">Tech Stack</div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedExp.tech.map((t, i) => (
                                            <span key={i} className="text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/5 text-gray-400 px-3 py-1.5 rounded-lg">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
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
            className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-white/15 transition-colors cursor-default"
        >
            <div
                style={{ transform: "translateZ(30px)" }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xl bg-gradient-to-br ${tech.color} to-transparent flex-shrink-0`}
            >
                {tech.logo}
            </div>
            <span
                style={{ transform: "translateZ(20px)" }}
                className="font-black text-sm text-gray-400 hover:text-white transition-colors tracking-tight"
            >
                {tech.name}
            </span>
        </motion.div>
    );
}
