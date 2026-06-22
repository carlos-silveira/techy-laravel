import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Globe, Clock, CheckCircle2, XCircle, Radar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScoutedQueue() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isTriggering, setIsTriggering] = useState(false);
    const [observability, setObservability] = useState(null);
    const [logOutput, setLogOutput] = useState(null);

    const fetchQueue = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/api/scouted-queue?status=all');
            setItems(res.data.data);
            if (res.data.observability) {
                setObservability(res.data.observability);
            }
        } catch (error) {
            toast.error('Failed to load queue');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQueue();
    }, []);

    const handleApprove = async (id) => {
        try {
            // Optimistic update
            setItems(items.map(item => item.id === id ? { ...item, status: 'generating' } : item));
            
            await axios.post(`/api/scouted-queue/${id}/approve`);
            toast.success('Idea approved! Generating article in background.');
            fetchQueue(); // Refresh to ensure accuracy
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Failed to approve');
            fetchQueue();
        }
    };

    const handleDismiss = async (id) => {
        try {
            await axios.delete(`/api/scouted-queue/${id}`);
            toast.success('Idea dismissed');
            setItems(items.filter(item => item.id !== id));
        } catch (err) {
            toast.error('Failed to dismiss');
        }
    };

    const handleTriggerScout = async () => {
        setIsTriggering(true);
        setLogOutput(null);
        const loadingToast = toast.loading('Running Scout Agent... This might take 30-60 seconds.');
        try {
            const res = await axios.post('/api/scouted-queue/trigger');
            toast.success(res.data.message || 'Scout scan completed!', { id: loadingToast });
            if (res.data.log) {
                setLogOutput(res.data.log);
            }
            fetchQueue();
        } catch (err) {
            toast.error('Failed to trigger scout agent', { id: loadingToast });
        } finally {
            setIsTriggering(false);
        }
    };

    if (isLoading && items.length === 0) {
        return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 overflow-y-auto p-10 md:p-24 max-w-6xl mx-auto w-full"
        >
            <div className="mb-20">
                <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">Editorial Desk</h3>
                <h2 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-4">Scout Action Queue.</h2>
                <p className="text-gray-500 max-w-2xl">Review AI-scouted news concepts. Approve them to send to the generator pipeline.</p>
                
                {/* Trigger manual scout button */}
                <div className="mt-10 p-8 rounded-3xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                                <Radar className={`w-5 h-5 text-primary ${isTriggering ? 'animate-spin' : ''}`} /> 
                                Want new ideas right now?
                            </h4>
                            <p className="text-sm text-gray-500 mb-4">Deploy the Scout Agent to scan the web for the latest breaking tech news.</p>
                            
                            {observability && (
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <span className="flex items-center gap-1.5" title="Last run time">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        Last: {observability.last_run ? new Date(observability.last_run).toLocaleString() : 'Never'}
                                    </span>
                                    <span className="flex items-center gap-1.5" title="Next scheduled run">
                                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                                        Next: {observability.next_run ? new Date(observability.next_run).toLocaleString() : 'N/A'}
                                    </span>
                                </div>
                            )}
                        </div>
                        <button 
                            onClick={handleTriggerScout}
                            disabled={isTriggering}
                            className="px-8 py-4 bg-primary hover:bg-primary/90 text-black font-bold rounded-2xl shadow-[0_0_20px_rgba(var(--color-primary),0.2)] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.4)] transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                        >
                            {isTriggering ? <Loader2 className="w-5 h-5 animate-spin" /> : <Radar className="w-5 h-5" />}
                            {isTriggering ? 'SCANNING WEB...' : 'SCAN THE WEB NOW'}
                        </button>
                    </div>

                    {/* Execution Logs */}
                    <AnimatePresence>
                        {logOutput && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }} 
                                animate={{ opacity: 1, height: 'auto' }} 
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 pt-6 border-t border-black/5 dark:border-white/5"
                            >
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Agent Execution Logs</h5>
                                <pre className="bg-black dark:bg-[#02040a] text-green-400 p-4 rounded-xl text-[10px] overflow-x-auto max-h-64 whitespace-pre-wrap border border-white/5 font-mono">
                                    {logOutput}
                                </pre>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence mode="popLayout">
                    {items.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="text-center py-32 border border-dashed border-gray-200 dark:border-white/10 rounded-[3rem] relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--color-primary),0.05)_0%,transparent_70%)]"></div>
                            <Radar className="w-16 h-16 mx-auto text-primary/40 mb-6 animate-[pulse_3s_ease-in-out_infinite]" />
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Radar is Clear</h3>
                            <p className="text-gray-500">No ideas currently pending. Wait for the agent or trigger a manual scan.</p>
                        </motion.div>
                    ) : items.map((item, index) => (
                        <motion.div 
                            key={item.id} 
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className="p-6 md:p-8 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] border border-black/5 dark:border-white/5 rounded-3xl transition-all group relative overflow-hidden backdrop-blur-md"
                        >
                            
                            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 relative z-10">
                                <div className="flex-1">
                                    <h3 className="font-black text-2xl tracking-tight text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-base text-gray-500 dark:text-gray-400 mb-6 leading-relaxed line-clamp-2">{item.prompt}</p>
                                    
                                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                                        <span className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${
                                            item.status === 'pending' ? 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5' : 
                                            item.status === 'generating' ? 'text-primary border-primary/20 bg-primary/5 animate-pulse' :
                                            item.status === 'published' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' :
                                            'text-red-500 border-red-500/20 bg-red-500/5'
                                        }`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                            {item.status}
                                        </span>
                                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5"><Globe className="w-3.5 h-3.5" /> {item.source}</span>
                                        {item.url && <a href={item.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">Link</a>}
                                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5"><Clock className="w-3.5 h-3.5" /> {new Date(item.created_at).toLocaleDateString()}</span>
                                    </div>

                                    {item.status === 'failed' && item.error_log && (
                                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs font-mono text-red-400 overflow-x-auto">
                                            {item.error_log}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 w-full xl:w-auto shrink-0">
                                    {item.status === 'pending' && (
                                        <>
                                            <button 
                                                onClick={() => handleDismiss(item.id)}
                                                className="flex-1 xl:flex-none px-6 py-5 bg-black/5 dark:bg-white/5 hover:bg-red-500/10 text-gray-500 hover:text-red-500 border border-transparent hover:border-red-500/20 rounded-2xl transition-all flex flex-col items-center justify-center gap-2 group/btn"
                                            >
                                                <Trash2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Dismiss</span>
                                            </button>
                                            <button 
                                                onClick={() => handleApprove(item.id)}
                                                className="flex-1 xl:flex-none px-8 py-5 bg-primary/10 hover:bg-primary text-primary hover:text-black border border-primary/20 hover:border-primary rounded-2xl transition-all flex flex-col items-center justify-center gap-2 shadow-[0_0_20px_rgba(var(--color-primary),0.1)] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.3)] group/btn"
                                            >
                                                <CheckCircle2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Approve</span>
                                            </button>
                                        </>
                                    )}
                                    
                                    {item.status === 'generating' && (
                                        <div className="flex-1 xl:flex-none px-8 py-5 border border-primary/20 bg-primary/5 rounded-2xl flex flex-col items-center justify-center gap-2 text-primary w-full xl:w-32">
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Wait...</span>
                                        </div>
                                    )}

                                    {item.status === 'published' && (
                                        <div className="flex-1 xl:flex-none px-8 py-5 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl flex flex-col items-center justify-center gap-2 text-emerald-500 w-full xl:w-32">
                                            <CheckCircle2 className="w-6 h-6" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Done</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
