import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import PublicFooter from '@/Components/PublicFooter';
import useLanguage from '@/Hooks/useLanguage';

export default function Terms() {
    const { __ } = useLanguage();

    return (
        <div className="min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-gray-900 dark:text-white font-sans selection:bg-primary/30 overflow-x-hidden relative transition-colors duration-500">
            <Head title={`${__('Terms of Use')} | Techy News`} />

            {/* Glowing Background */}
            <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/8 rounded-full blur-[120px] pointer-events-none mix-blend-screen overflow-hidden"></div>

            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-32 relative z-10">
                <div className="bg-white/[0.6] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 shadow-sm dark:shadow-none transition-all duration-500 relative overflow-hidden group">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">Terms of Use</h1>
                    
                    <div className="prose prose-lg dark:prose-invert prose-p:font-light prose-h2:font-black prose-a:text-primary max-w-none text-gray-700 dark:text-gray-300">
                        <p><strong>Last Updated: April 5, 2026</strong></p>
                        
                        <p>Welcome to Techy News (techynews.lat). By accessing or using our website, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree with any part of these terms, please do not use our platform.</p>

                        <h2>1. Use of Content</h2>
                        <p>All news articles, graphics, and text compiled on this site are for informational purposes only. The synthesized content provided by our AI systems is intended to summarize current events based on publicly available data. You may not reproduce, distribute, or commercially exploit our materials without express written permission.</p>

                        <h2>2. Artificial Intelligence Disclaimer</h2>
                        <p>Techy News utilizes artificial intelligence to synthesize, generate, and draft news articles rapidly from various data feeds. While we strive for accuracy and neutrality, AI-generated content may occasionally contain inaccuracies. Users are encouraged to cross-reference critical information. We assume no liability for errors or omissions in synthesized articles.</p>

                        <h2>3. User Conduct</h2>
                        <p>When accessing our platform, you agree not to engage in any activity that disrupts the website's infrastructure, such as automated scraping, denial of service attacks, or probing vulnerabilities in our systems.</p>

                        <h2>4. Third-Party Links</h2>
                        <p>Our articles may occasionally contain outbound links to third-party sources or external research. We have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies or terms.</p>

                        <h2>5. Changes to Terms</h2>
                        <p>Techy News reserves the right to modify these Terms at any time. We will indicate modifications by updating the "Last Updated" date at the top of this document. Continued use of the platform after changes have been posted constitutes your acceptance of the revised Terms.</p>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
