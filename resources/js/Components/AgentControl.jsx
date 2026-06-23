import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Play, Square, Activity, Clock, Server, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

export default function AgentControl() {
    const [status, setStatus] = useState({ logs: '', last_run: null });
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('scout'); // scout or autonomous
    const logsEndRef = useRef(null);

    const fetchStatus = async () => {
        try {
            const res = await axios.get('/api/agent/status');
            setStatus(res.data);
            
            // Auto scroll to bottom of logs
            if (logsEndRef.current) {
                logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchStatus();
        let interval;
        if (isRunning) {
            interval = setInterval(fetchStatus, 2000);
        } else {
            interval = setInterval(fetchStatus, 10000); // Poll slower when not running
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const runAgent = async () => {
        setIsRunning(true);
        toast.success(`Starting agent in ${mode} mode...`);
        try {
            await axios.post('/api/agent/run', { mode, limit: 10 });
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Failed to start agent.');
            setIsRunning(false);
        }
    };

    const stopPolling = () => {
        setIsRunning(false);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto space-y-6"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white flex items-center gap-2">
                        <Terminal className="w-6 h-6 text-emerald-500" />
                        AGENT CONTROL PANEL
                    </h2>
                    <p className="text-gray-500 text-sm font-medium mt-1">
                        Monitor and manually trigger the autonomous news agent.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select 
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-primary/50 transition-colors"
                    >
                        <option value="scout">Scout Mode (Find & Queue)</option>
                        <option value="autonomous">Autonomous Mode (Draft & Publish)</option>
                    </select>
                    <button 
                        onClick={runAgent}
                        disabled={isRunning}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                            isRunning 
                            ? 'bg-emerald-500/20 text-emerald-500 cursor-not-allowed'
                            : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-emerald-500/25 hover:-translate-y-0.5'
                        }`}
                    >
                        {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                        {isRunning ? 'RUNNING...' : 'EXECUTE NOW'}
                    </button>
                    {isRunning && (
                        <button 
                            onClick={stopPolling}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-all border border-rose-500/20"
                        >
                            <Square className="w-4 h-4" />
                            STOP
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/5 dark:bg-white/5 rounded-3xl p-6 border border-black/5 dark:border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full -mr-10 -mt-10" />
                    <Activity className="w-6 h-6 text-emerald-500 mb-4 relative z-10" />
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 relative z-10">Agent Status</div>
                    <div className="text-xl font-black text-gray-900 dark:text-white relative z-10">
                        {isRunning ? 'Executing Cycle' : 'Standby'}
                    </div>
                </div>
                
                <div className="bg-black/5 dark:bg-white/5 rounded-3xl p-6 border border-black/5 dark:border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full -mr-10 -mt-10" />
                    <Clock className="w-6 h-6 text-blue-500 mb-4 relative z-10" />
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 relative z-10">Last Run</div>
                    <div className="text-xl font-black text-gray-900 dark:text-white relative z-10">
                        {status.last_run ? new Date(status.last_run).toLocaleString() : 'Unknown'}
                    </div>
                </div>

                <div className="bg-black/5 dark:bg-white/5 rounded-3xl p-6 border border-black/5 dark:border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full -mr-10 -mt-10" />
                    <Server className="w-6 h-6 text-purple-500 mb-4 relative z-10" />
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 relative z-10">Cron Schedule</div>
                    <div className="text-xl font-black text-gray-900 dark:text-white relative z-10">Every 4 Hours</div>
                </div>
            </div>

            <div className="bg-[#0D1117] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="bg-[#161B22] px-4 py-3 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-black tracking-widest uppercase text-gray-400">Live Terminal Log</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    </div>
                </div>
                <div className="p-6 h-[400px] overflow-y-auto font-mono text-xs text-gray-300 leading-relaxed custom-scrollbar">
                    {status.logs ? (
                        <pre className="whitespace-pre-wrap">{status.logs}</pre>
                    ) : (
                        <div className="text-gray-500 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Awaiting agent logs...
                        </div>
                    )}
                    <div ref={logsEndRef} />
                </div>
            </div>
        </motion.div>
    );
}
