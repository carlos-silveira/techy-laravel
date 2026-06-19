import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Ghost, Home, ArrowLeft, Bug, AlertTriangle, ShieldAlert } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import PublicFooter from '@/Components/PublicFooter';
import CommandPalette from '@/Components/CommandPalette';
import useLanguage from '@/Hooks/useLanguage';

export default function Error({ status }) {
    const { __ } = useLanguage();

    const getErrorContent = () => {
        switch (status) {
            case 404:
                return {
                    title: '404',
                    subtitle: __('Houston, we have a problem'),
                    description: __('The page you are looking for has been abducted by aliens, or it never existed in the first place.'),
                    icon: Ghost,
                    color: 'text-primary'
                };
            case 500:
                return {
                    title: '500',
                    subtitle: __('Server Meltdown'),
                    description: __('Our servers are currently experiencing a minor existential crisis. Our engineers have been dispatched.'),
                    icon: Bug,
                    color: 'text-red-500'
                };
            case 503:
                return {
                    title: '503',
                    subtitle: __('Scheduled Maintenance'),
                    description: __('We are currently upgrading our AI systems. We will be back online shortly.'),
                    icon: AlertTriangle,
                    color: 'text-amber-500'
                };
            case 403:
                return {
                    title: '403',
                    subtitle: __('Access Denied'),
                    description: __('You do not have the required security clearance to view this classified document.'),
                    icon: ShieldAlert,
                    color: 'text-purple-500'
                };
            default:
                return {
                    title: status,
                    subtitle: __('An Error Occurred'),
                    description: __('Something went wrong. Please try again later.'),
                    icon: AlertTriangle,
                    color: 'text-gray-500'
                };
        }
    };

    const content = getErrorContent();
    const Icon = content.icon;

    return (
        <div className="min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-black dark:text-white font-sans selection:bg-primary/30 flex flex-col transition-colors duration-500">
            <Head title={`${content.title} — ${content.subtitle}`} />
            <CommandPalette />
            <Navbar />

            <main className="flex-1 flex items-center justify-center relative overflow-hidden px-6 pt-32 pb-20">
                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0"></div>

                <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
                    <div className="relative mb-8 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-600/30 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative w-32 h-32 sm:w-48 sm:h-48 bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-full flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                            <Icon className={`w-16 h-16 sm:w-24 sm:h-24 ${content.color} drop-shadow-lg`} strokeWidth={1.5} />
                            
                            {/* Funny subtle elements based on status */}
                            {status === 404 && (
                                <div className="absolute -top-4 -right-4 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg rotate-12 animate-pulse">
                                    Lost in Space
                                </div>
                            )}
                        </div>
                    </div>

                    <h1 className="text-[6rem] sm:text-[9rem] font-black tracking-tighter leading-none mb-4 text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-500 dark:from-white dark:to-gray-600 drop-shadow-sm select-none">
                        {content.title}
                    </h1>
                    
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6 text-gray-900 dark:text-gray-100">
                        {content.subtitle}
                    </h2>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-light mb-12 max-w-md mx-auto leading-relaxed">
                        {content.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <Link 
                            href="/" 
                            className="inline-flex items-center justify-center gap-3 bg-primary text-white font-black px-8 py-4 rounded-full hover:scale-105 hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(43,124,238,0.4)] uppercase tracking-wider text-sm group min-w-[200px]"
                        >
                            <Home className="w-4 h-4" />
                            {__('Go Home')}
                        </Link>
                        
                        <button 
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center gap-3 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-black/10 dark:border-white/10 font-black px-8 py-4 rounded-full hover:bg-gray-50 dark:hover:bg-white/10 transition-all uppercase tracking-wider text-sm group min-w-[200px]"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            {__('Go Back')}
                        </button>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
