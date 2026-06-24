import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Database, Activity, RefreshCw, Terminal, Users, FileText, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Observability() {
    const [data, setData] = useState({ stats: null, logs: [] });
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/api/observability');
            setData(res.data);
        } catch (error) {
            toast.error('Failed to load observability data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Optional: auto-refresh every 30s
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const getLogColor = (level) => {
        switch (level) {
            case 'ERROR': return 'text-red-500';
            case 'WARNING': return 'text-yellow-500';
            case 'DEBUG': return 'text-blue-500';
            default: return 'text-green-400';
        }
    };

    return (
        <div className="flex flex-col gap-8 h-full">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                        Observability Hub
                    </h2>
                    <p className="text-sm text-gray-500 font-medium">Real-time database and system execution logs.</p>
                </div>
                <button 
                    onClick={fetchData}
                    disabled={isLoading}
                    className="p-3 bg-white dark:bg-[#0a0f1c] border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 transition-colors shadow-sm"
                >
                    <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin text-primary' : 'text-gray-600 dark:text-gray-400'}`} />
                </button>
            </div>

            {/* DB Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard 
                    title="Articles DB" 
                    icon={<FileText className="w-5 h-5 text-blue-500" />}
                    stats={[
                        { label: 'Total', value: data.stats?.articles_total || 0 },
                        { label: 'Published', value: data.stats?.articles_published || 0, color: 'text-green-500' },
                        { label: 'Drafts', value: data.stats?.articles_drafts || 0 }
                    ]}
                    isLoading={isLoading}
                />
                <StatCard 
                    title="Scout Queue" 
                    icon={<Target className="w-5 h-5 text-purple-500" />}
                    stats={[
                        { label: 'Total Scraped', value: data.stats?.scout_total || 0 },
                        { label: 'Pending', value: data.stats?.scout_pending || 0, color: 'text-yellow-500' },
                        { label: 'Generating', value: data.stats?.scout_generating || 0, color: 'text-blue-500' }
                    ]}
                    isLoading={isLoading}
                />
                <StatCard 
                    title="Queue Health" 
                    icon={<Activity className="w-5 h-5 text-emerald-500" />}
                    stats={[
                        { label: 'Completed', value: data.stats?.scout_completed || 0, color: 'text-emerald-500' },
                        { label: 'Failed', value: data.stats?.scout_failed || 0, color: 'text-red-500' }
                    ]}
                    isLoading={isLoading}
                />
                <StatCard 
                    title="Users" 
                    icon={<Users className="w-5 h-5 text-orange-500" />}
                    stats={[
                        { label: 'Registered', value: data.stats?.users_total || 0 }
                    ]}
                    isLoading={isLoading}
                />
            </div>

            {/* Laravel Logs Terminal */}
            <div className="flex-1 min-h-[400px] flex flex-col bg-[#0a0f1c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-black/40">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-black uppercase tracking-widest text-gray-400">laravel.log</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Tailing</span>
                    </div>
                </div>
                
                <div className="flex-1 overflow-x-auto overflow-y-auto p-4 custom-scrollbar">
                    {isLoading && data.logs.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="flex items-center gap-2 text-gray-500">
                                <Terminal className="w-4 h-4 animate-pulse" />
                                <span className="text-xs font-mono">Connecting to stream...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="font-mono text-[11px] leading-relaxed w-max min-w-full">
                            <AnimatePresence>
                                {data.logs.map((log, index) => (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={index} 
                                        className="mb-1.5 flex gap-3 hover:bg-white/5 px-2 py-1 -mx-2 rounded transition-colors"
                                    >
                                        <span className="text-gray-600 shrink-0 select-none">
                                            {log.timestamp ? log.timestamp.split(' ')[1] : '----:--:--'}
                                        </span>
                                        <span className={`shrink-0 w-16 font-bold ${getLogColor(log.level)}`}>
                                            [{log.level}]
                                        </span>
                                        <span className="text-gray-300 break-all whitespace-pre-wrap max-w-full">
                                            {log.message}
                                        </span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {data.logs.length === 0 && (
                                <div className="text-gray-600 italic">No logs found in laravel.log</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, icon, stats, isLoading }) {
    return (
        <div className="bg-white dark:bg-[#0a0f1c] border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5">
                    {icon}
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">{title}</h3>
            </div>
            <div className="space-y-3 relative z-10">
                {stats.map((s, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{s.label}</span>
                        {isLoading ? (
                            <div className="w-8 h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
                        ) : (
                            <span className={`text-base font-black ${s.color || 'text-gray-900 dark:text-white'}`}>
                                {s.value.toLocaleString()}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
