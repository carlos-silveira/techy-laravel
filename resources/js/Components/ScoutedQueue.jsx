import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Globe, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function ScoutedQueue() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchQueue = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/api/scouted-queue?status=all');
            setItems(res.data.data);
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

    if (isLoading && items.length === 0) {
        return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    }

    return (
        <div className="flex-1 overflow-y-auto p-10 md:p-24 max-w-6xl mx-auto w-full">
            <div className="mb-20">
                <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">Editorial Desk</h3>
                <h2 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-4">Scout Action Queue.</h2>
                <p className="text-gray-500">Review AI-scouted news concepts. Approve them to send to the generator pipeline.</p>
                
                {/* Trigger manual scout button */}
                <div className="mt-8">
                    <p className="text-sm text-gray-400 mb-2">Want new ideas right now?</p>
                    <button 
                        onClick={async () => {
                            toast.loading('Scouting running... (Requires SSH/CLI but simulated here)');
                        }}
                        className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-gray-300 pointer-events-none opacity-50"
                    >
                        Scouting happens automatically in background. 
                    </button>
                    <p className="text-xs text-gray-600 mt-2">To trigger manually: <code>php artisan yolo:agent --scout</code> on server.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {items.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 border border-dashed border-gray-200 dark:border-white/10 rounded-3xl">
                        No ideas currently pending. Wait for the agent to find some news.
                    </div>
                ) : items.map((item) => (
                    <div key={item.id} className="p-6 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl transition-all group relative overflow-hidden">
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                            <div className="flex-1">
                                <h3 className="font-black text-xl text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.prompt}</p>
                                
                                <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase">
                                    <span className={`px-2 py-1 rounded border inline-block ${
                                        item.status === 'pending' ? 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5' : 
                                        item.status === 'generating' ? 'text-primary border-primary/20 bg-primary/5 animate-pulse' :
                                        item.status === 'published' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' :
                                        'text-red-500 border-red-500/20 bg-red-500/5'
                                    }`}>
                                        {item.status}
                                    </span>
                                    <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> {item.source}</span>
                                    {item.url && <a href={item.url} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:underline">Link</a>}
                                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {new Date(item.created_at).toLocaleDateString()}</span>
                                </div>

                                {item.status === 'failed' && item.error_log && (
                                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-mono text-red-400 overflow-x-auto">
                                        {item.error_log}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {item.status === 'pending' && (
                                    <>
                                        <button 
                                            onClick={() => handleDismiss(item.id)}
                                            className="px-6 py-4 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 border border-white/5 hover:border-red-500/20 rounded-2xl transition-all flex flex-col items-center gap-2 group/btn"
                                        >
                                            <Trash2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Dismiss</span>
                                        </button>
                                        <button 
                                            onClick={() => handleApprove(item.id)}
                                            className="px-6 py-4 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/30 rounded-2xl transition-all flex flex-col items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] group/btn"
                                        >
                                            <CheckCircle2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Approve</span>
                                        </button>
                                    </>
                                )}
                                
                                {item.status === 'generating' && (
                                    <div className="px-6 py-4 border border-primary/20 bg-primary/5 rounded-2xl flex flex-col items-center gap-2 text-primary">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Wait...</span>
                                    </div>
                                )}

                                {item.status === 'published' && (
                                    <div className="px-6 py-4 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl flex flex-col items-center gap-2 text-emerald-500">
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Done</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
