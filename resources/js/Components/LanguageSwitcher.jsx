import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import useLanguage from '@/Hooks/useLanguage';

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

export default function LanguageSwitcher() {
    const { locale, __ } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const currentLanguage = languages.find(l => l.code === locale) || languages[0];

    const changeLanguage = async (langCode) => {
        setIsOpen(false);
        try {
            await axios.post('/api/set-locale', { locale: langCode });
            toast.success(`Language changed to ${languages.find(l => l.code === langCode).name}`);
            
            // Reload the page to apply changes and fetch translated content
            router.reload();
        } catch (error) {
            toast.error('Failed to change language.');
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest group"
            >
                <Globe className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                <span className="hidden md:inline">{currentLanguage.name}</span>
                <span className="md:hidden">{currentLanguage.code}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-[#0a0f1c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[70] animate-in fade-in zoom-in duration-200">
                        <div className="p-2 border-b border-white/5 bg-white/[0.02]">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 px-2">{__('Language')}</span>
                        </div>
                        <div className="p-1.5 flex flex-col">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                        locale === lang.code 
                                        ? 'bg-primary/10 text-primary' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </div>
                                    {locale === lang.code && <Check className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
