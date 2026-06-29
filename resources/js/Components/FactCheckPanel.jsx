import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, ShieldX, Loader2, ChevronDown, ChevronUp, ExternalLink, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function FactCheckPanel({ articleId }) {
    const [factCheck, setFactCheck] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isTriggering, setIsTriggering] = useState(false);
    const [expandedClaims, setExpandedClaims] = useState({});

    useEffect(() => {
        if (articleId) {
            fetchFactCheck();
        } else {
            setFactCheck(null);
            setIsLoading(false);
        }
    }, [articleId]);

    const fetchFactCheck = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/articles/${articleId}/fact-check`);
            setFactCheck(res.data);
        } catch (error) {
            if (error.response?.status !== 404) {
                toast.error('Failed to load fact check data.');
            }
            setFactCheck(null);
        } finally {
            setIsLoading(false);
        }
    };

    const triggerFactCheck = async () => {
        setIsTriggering(true);
        try {
            const res = await axios.post(`/api/articles/${articleId}/fact-check`);
            setFactCheck(res.data.fact_check);
            toast.success('Fact check completed!');
        } catch (error) {
            toast.error('Fact check failed to complete.');
        } finally {
            setIsTriggering(false);
        }
    };

    const toggleClaim = (index) => {
        setExpandedClaims(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    if (isLoading) {
        return (
            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 flex items-center justify-center animate-pulse">
                <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading fact-check data...</span>
                </div>
            </div>
        );
    }

    if (!factCheck) {
        return (
            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                        <ShieldCheck className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">No Fact-Check Data</h3>
                        <p className="text-gray-500 text-sm max-w-md mx-auto mt-1">
                            This article hasn't been verified against our trusted sources database yet.
                        </p>
                    </div>
                    <button 
                        onClick={triggerFactCheck}
                        disabled={isTriggering}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {isTriggering ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                        {isTriggering ? 'Verifying...' : 'Run Fact-Check'}
                    </button>
                </div>
            </div>
        );
    }

    const getScoreColor = (score) => {
        if (score >= 60) return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10';
        if (score >= 40) return 'text-amber-500 border-amber-500/20 bg-amber-500/10';
        return 'text-red-500 border-red-500/20 bg-red-500/10';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'passed': return <ShieldCheck className="w-10 h-10 text-emerald-500" />;
            case 'needs_review': return <ShieldAlert className="w-10 h-10 text-amber-500" />;
            case 'failed': return <ShieldX className="w-10 h-10 text-red-500" />;
            default: return <Loader2 className="w-10 h-10 text-primary animate-spin" />;
        }
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    {getStatusIcon(factCheck.status)}
                    <div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">
                            Fact-Check Status
                        </div>
                        <h3 className="font-bold text-xl capitalize">{factCheck.status.replace('_', ' ')}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                            Checked {new Date(factCheck.checked_at).toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center font-black text-2xl ${getScoreColor(factCheck.overall_score)}`}>
                        {factCheck.overall_score}
                    </div>
                    
                    <button 
                        onClick={triggerFactCheck}
                        disabled={isTriggering}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all disabled:opacity-50"
                        title="Re-run fact check"
                    >
                        <RefreshCw className={`w-5 h-5 ${isTriggering ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5 bg-black/20">
                <div className="p-4 text-center">
                    <div className="text-2xl font-bold">{factCheck.claims_count}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Claims Extracted</div>
                </div>
                <div className="p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-500">{factCheck.verified_count}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Verified</div>
                </div>
                <div className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-500">{factCheck.failed_count}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Failed</div>
                </div>
            </div>

            {/* Claims List */}
            <div className="p-6">
                <h4 className="font-bold mb-4">Detailed Audit Trail</h4>
                
                {(!factCheck.claims || factCheck.claims.length === 0) ? (
                    <p className="text-gray-500 italic">No specific verifiable claims were extracted from this article.</p>
                ) : (
                    <div className="space-y-3">
                        {factCheck.claims.map((claim, idx) => {
                            const isExpanded = !!expandedClaims[idx];
                            
                            let verdictColor = 'text-gray-400 border-gray-400/20';
                            if (claim.verdict === 'verified') verdictColor = 'text-emerald-500 border-emerald-500/20';
                            if (claim.verdict === 'partially_true') verdictColor = 'text-amber-500 border-amber-500/20';
                            if (claim.verdict === 'false') verdictColor = 'text-red-500 border-red-500/20';
                            
                            return (
                                <div key={idx} className="border border-white/5 rounded-xl overflow-hidden bg-black/10">
                                    <button 
                                        onClick={() => toggleClaim(idx)}
                                        className="w-full text-left p-4 flex items-start gap-4 hover:bg-white/5 transition-colors"
                                    >
                                        <div className={`px-2 py-1 rounded text-xs font-bold uppercase border ${verdictColor} shrink-0 mt-0.5`}>
                                            {claim.verdict.replace('_', ' ')}
                                        </div>
                                        <div className="flex-1 text-sm font-medium pr-4">
                                            "{claim.claim_text}"
                                        </div>
                                        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />}
                                    </button>
                                    
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden border-t border-white/5 bg-black/20"
                                            >
                                                <div className="p-4 space-y-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-500 uppercase text-xs font-bold block mb-1">AI Explanation</span>
                                                        <p className="text-gray-300">{claim.ai_explanation || 'No explanation provided.'}</p>
                                                    </div>
                                                    
                                                    {claim.supporting_sources && claim.supporting_sources.length > 0 && (
                                                        <div>
                                                            <span className="text-gray-500 uppercase text-xs font-bold block mb-2">Supporting Sources</span>
                                                            <div className="space-y-2">
                                                                {claim.supporting_sources.map((src, sIdx) => (
                                                                    <a key={sIdx} href={src.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:underline bg-primary/5 p-2 rounded-lg border border-primary/10">
                                                                        <ExternalLink className="w-4 h-4 shrink-0" />
                                                                        <span className="truncate flex-1">{src.domain}</span>
                                                                        {src.tier && (
                                                                            <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full shrink-0">Tier {src.tier}</span>
                                                                        )}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    {claim.contradicting_sources && claim.contradicting_sources.length > 0 && (
                                                        <div>
                                                            <span className="text-gray-500 uppercase text-xs font-bold block mb-2">Contradicting Sources</span>
                                                            <div className="space-y-2">
                                                                {claim.contradicting_sources.map((src, sIdx) => (
                                                                    <a key={sIdx} href={src.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-red-400 hover:underline bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                                                                        <ExternalLink className="w-4 h-4 shrink-0" />
                                                                        <span className="truncate flex-1">{src.domain}</span>
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
