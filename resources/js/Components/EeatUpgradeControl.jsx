import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Terminal as TerminalIcon, Play, Loader2, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export default function EeatUpgradeControl() {
    const [status, setStatus] = useState({ upgraded: 0, pending: 0, total: 0, percentage: 0 });
    const [isLoadingStatus, setIsLoadingStatus] = useState(true);
    const [isTriggering, setIsTriggering] = useState(false);
    const [limit, setLimit] = useState(1);
    
    // Logs State
    const [logs, setLogs] = useState('');
    const [isPolling, setIsPolling] = useState(false);
    const logsEndRef = useRef(null);

    const fetchStatus = async () => {
        try {
            const res = await axios.get('/api/eeat-upgrade/status');
            setStatus(res.data);
        } catch (error) {
            console.error('Failed to fetch EEAT status', error);
        } finally {
            setIsLoadingStatus(false);
        }
    };

    const fetchLogs = async () => {
        try {
            const res = await axios.get('/api/eeat-upgrade/logs');
            setLogs(res.data.logs);
        } catch (error) {
            // Ignore small log fetch errors
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    // Polling effect for logs
    useEffect(() => {
        let interval;
        if (isPolling) {
            fetchLogs(); // initial fetch
            interval = setInterval(() => {
                fetchLogs();
                fetchStatus();
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isPolling]);

    // Auto scroll logs
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const handleTrigger = async () => {
        if (!confirm(`Are you sure you want to trigger the E-E-A-T upgrade for ${limit} article(s)? This will consume Gemini API tokens.`)) return;
        
        setIsTriggering(true);
        try {
            const res = await axios.post('/api/eeat-upgrade/trigger', { limit });
            toast.success(res.data.message);
            setIsPolling(true);
            setLogs("Starting process...");
            
            // Auto stop polling after 5 minutes just in case
            setTimeout(() => setIsPolling(false), 300000);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to trigger upgrade');
            setIsPolling(false);
        } finally {
            setIsTriggering(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#02040a]">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#02040a]/90 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 px-4 sm:px-10 py-6">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 text-primary mb-2">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">AdSense Recovery</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white">E-E-A-T Upgrades</h1>
                        <p className="text-gray-500 text-sm mt-1">Transform legacy low-value content into high-quality journalism.</p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-10 py-10 space-y-8">
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl p-6 flex items-center justify-between shadow-sm">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Upgraded (E-E-A-T)</h3>
                            <div className="text-3xl font-black text-emerald-500">{isLoadingStatus ? <Loader2 className="w-6 h-6 animate-spin" /> : status.upgraded}</div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl p-6 flex items-center justify-between shadow-sm">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Pending Legacy</h3>
                            <div className="text-3xl font-black text-orange-500">{isLoadingStatus ? <Loader2 className="w-6 h-6 animate-spin" /> : status.pending}</div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-orange-500" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl p-6 flex items-center justify-between shadow-sm">
                        <div className="w-full">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Progress</h3>
                                <span className="text-xs font-bold text-gray-900 dark:text-white">{status.percentage}%</span>
                            </div>
                            <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${status.percentage}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 dark:bg-transparent">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Play className="w-5 h-5 text-primary ml-1" />
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-gray-900 dark:text-white">Batch Upgrade Worker</h2>
                                <p className="text-xs text-gray-500">Triggers 'artisan news:upgrade-legacy' in background</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <select 
                                value={limit}
                                onChange={(e) => setLimit(Number(e.target.value))}
                                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-primary/50"
                                disabled={isTriggering || isPolling}
                            >
                                <option value={1}>Batch of 1</option>
                                <option value={5}>Batch of 5</option>
                                <option value={10}>Batch of 10</option>
                                <option value={20}>Batch of 20</option>
                            </select>

                            <button 
                                onClick={handleTrigger}
                                disabled={isTriggering || isPolling}
                                className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isTriggering ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                                Run Batch
                            </button>
                        </div>
                    </div>

                    {/* Console View */}
                    <div className="p-4 bg-[#0a0a0a] text-emerald-400 font-mono text-sm leading-relaxed overflow-x-auto relative">
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            <button onClick={() => setIsPolling(!isPolling)} className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors ${isPolling ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-gray-400 hover:text-white'}`}>
                                {isPolling ? (
                                    <><Loader2 className="w-3 h-3 animate-spin" /> Stop Polling</>
                                ) : (
                                    <><RefreshCw className="w-3 h-3" /> Live Tail</>
                                )}
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4 text-gray-500 text-xs">
                            <TerminalIcon className="w-4 h-4" /> root@techynews:~# tail -f storage/logs/eeat_upgrade.log
                        </div>
                        
                        <div className="min-h-[300px] max-h-[500px] overflow-y-auto whitespace-pre-wrap pl-2 border-l-2 border-white/5">
                            {logs || 'Waiting for process to start...'}
                            <div ref={logsEndRef} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
