import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, ShieldX, Play, Square, Loader2, Edit3, Activity } from 'lucide-react';
import { toast } from 'sonner';

export default function FactCheckDashboard({ setView, handleEdit }) {
    const [progress, setProgress] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    
    // In a real app we might fetch global stats, for now we focus on backfill
    useEffect(() => {
        fetchProgress();
        const interval = setInterval(fetchProgress, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    const fetchProgress = async () => {
        try {
            const res = await axios.get('/api/fact-check/backfill-progress');
            setProgress(res.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to fetch progress", error);
        }
    };

    const toggleBackfill = async (action) => {
        setIsActionLoading(true);
        try {
            const res = await axios.post('/api/fact-check/start-backfill', { action });
            toast.success(res.data.message);
            fetchProgress();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Action failed');
        } finally {
            setIsActionLoading(false);
        }
    };

    const isRunning = progress?.status === 'running';
    const percent = progress?.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Fact-Check Engine</h1>
                    <p className="text-gray-500">Monitor automated article verification and backfill progress.</p>
                </div>
            </div>

            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Activity className="w-5 h-5 text-primary" />
                            Retroactive Backfill
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Systematically verify all existing published articles against trusted sources.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {isRunning ? (
                            <button
                                onClick={() => toggleBackfill('stop')}
                                disabled={isActionLoading}
                                className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Square className="w-4 h-4" />}
                                Stop Engine
                            </button>
                        ) : (
                            <button
                                onClick={() => toggleBackfill('start')}
                                disabled={isActionLoading}
                                className="bg-primary text-white hover:bg-primary/90 px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                                Start Backfill
                            </button>
                        )}
                    </div>
                </div>

                {isLoading ? (
                    <div className="h-32 flex items-center justify-center text-gray-500">
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between text-sm font-bold">
                            <span className="uppercase tracking-widest text-gray-500">Status: <span className={isRunning ? 'text-emerald-500' : 'text-gray-400'}>{progress?.status || 'Idle'}</span></span>
                            <span>{percent}% Completed</span>
                        </div>
                        
                        <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-4 overflow-hidden">
                            <motion.div 
                                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full relative"
                                initial={{ width: 0 }}
                                animate={{ width: `${percent}%` }}
                                transition={{ duration: 0.5 }}
                            >
                                {isRunning && (
                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                )}
                            </motion.div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Total Target</div>
                                <div className="text-2xl font-bold">{progress?.total || 0}</div>
                            </div>
                            <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                                <div className="text-xs text-emerald-500 uppercase tracking-widest font-bold mb-1">Checked</div>
                                <div className="text-2xl font-bold text-emerald-400">{progress?.completed || 0}</div>
                            </div>
                            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                                <div className="text-xs text-red-500 uppercase tracking-widest font-bold mb-1">Failed / Errors</div>
                                <div className="text-2xl font-bold text-red-400">{progress?.failed || 0}</div>
                            </div>
                        </div>

                        {progress?.current_article && isRunning && (
                            <div className="mt-6 text-sm text-gray-400 flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                <span>Currently checking: <strong className="text-white">"{progress.current_article}"</strong></span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-amber-500" />
                        Needs Review Queue
                    </h3>
                    <p className="text-sm text-gray-500 italic">
                        Articles scoring between 40-59 will appear here for manual editorial review.
                    </p>
                </div>
                
                <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <ShieldX className="w-5 h-5 text-red-500" />
                        Blocked/Failed Content
                    </h3>
                    <p className="text-sm text-gray-500 italic">
                        Articles scoring below 40 that have been automatically pulled from production.
                    </p>
                </div>
            </div>
        </div>
    );
}
