import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import PublicFooter from '@/Components/PublicFooter';
import useLanguage from '@/Hooks/useLanguage';

export default function Privacy() {
    const { __ } = useLanguage();

    return (
        <div className="min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-gray-900 dark:text-white font-sans selection:bg-primary/30 overflow-x-hidden relative transition-colors duration-500">
            <Head title={`${__('Privacy Policy')} | Techy News`} />

            {/* Glowing Background */}
            <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/8 rounded-full blur-[120px] pointer-events-none mix-blend-screen overflow-hidden"></div>

            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-32 relative z-10">
                <div className="bg-white/[0.6] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 shadow-sm dark:shadow-none transition-all duration-500 relative overflow-hidden group">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">Privacy Policy</h1>
                    
                    <div className="prose prose-lg dark:prose-invert prose-p:font-light prose-h2:font-black prose-a:text-primary max-w-none text-gray-700 dark:text-gray-300">
                        <p><strong>Last Updated: April 5, 2026</strong></p>
                        
                        <p>At Techy News (techynews.lat), we take your privacy very seriously. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.</p>

                        <h2>1. Information We Collect</h2>
                        <p>We believe in minimal data collection. We actively track strictly necessary metrics for operational integrity and audience insights using fully private, in-house software isolated physically to our infrastructure. The data we collect includes:</p>
                        <ul>
                            <li><strong>Anonymous Log Data:</strong> Pages visited, aggregated time spent, and general browser type strings.</li>
                            <li><strong>IP Addresses:</strong> All IP addresses are irreversibly hashed and anonymized prior to storage. We do not store raw IP addresses on our server.</li>
                        </ul>

                        <h2>2. Cookies & Third-Party Trackers</h2>
                        <p>We pride ourselves on providing a clean reading experience. <strong>We do not use tracking cookies.</strong> Furthermore, we do not integrate third-party data conglomerates (such as Facebook Pixel or cross-site programmatic Ads trackers) that might compromise your browsing behavior patterns.</p>

                        <h2>3. Use of Information</h2>
                        <p>The statistical data we collect is used strictly for internal traffic analysis, optimizing server performance, and determining which news categories are most engaging for our readership.</p>

                        <h2>4. Information Security</h2>
                        <p>Your connection to Techy News is secured utilizing standard SSL encryption. Information stored internally is safeguarded against unauthorized access. Given the extremely limited scope of our data collection (no names, account systems, or credit cards exist on the public domain interface), potential risk vectors are inherently low.</p>

                        <h2>5. Changes to This Policy</h2>
                        <p>We reserve the right to revise this Privacy Policy at our discretion. Significant modifications will be recorded within this document and the effective date will be formally updated.</p>

                        <p>If you have any questions or require administrative data remediation regarding this privacy policy, please contact our administrative team via email.</p>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
