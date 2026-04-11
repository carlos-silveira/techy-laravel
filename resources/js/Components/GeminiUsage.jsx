import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Cpu, Zap, Activity, Clock, ShieldCheck } from 'lucide-react';

export default function GeminiUsage({ usageData }) {
    if (!usageData || usageData.length === 0) {
        return (
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 text-center">
                <Cpu className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-black text-white">No API Logs Yet</h3>
                <p className="text-sm text-gray-500 mt-2">Gemini usage metrics will appear here once stories are generated.</p>
            </div>
        );
    }

    // Process data for the chart: group by model
    const modelUsage = usageData.reduce((acc, log) => {
        const model = log.model || 'Unknown';
        if (!acc[model]) acc[model] = { name: model, tokens: 0, count: 0 };
        acc[model].tokens += (log.total_tokens || 0);
        acc[model].count += 1;
        return acc;
    }, {});

    const chartData = Object.values(modelUsage).sort((a, b) => b.tokens - a.tokens);

    return (
        <div className="space-y-6 mt-12">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-[10px] font-black text-orange-400 uppercase tracking-[0.3em] mb-2">Compute Consumption</h3>
                    <h2 className="text-3xl font-black tracking-tighter text-white">Gemini Engine.</h2>
                </div>
                <div className="px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center gap-3">
                    <Activity className="w-4 h-4 text-orange-400" />
                    <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Live API Feed</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Column */}
                <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500/20 transition-colors">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none opacity-20" />
                    <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-8">Token Distribution by Model</h4>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical" margin={{ left: 40, right: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis 
                                    dataKey="name" 
                                    type="category" 
                                    stroke="rgba(255,255,255,0.4)" 
                                    fontSize={10} 
                                    axisLine={false} 
                                    tickLine={false} 
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                    contentStyle={{ backgroundColor: 'rgba(2, 4, 10, 0.95)', borderColor: 'rgba(249,115,22,0.2)', borderRadius: '12px', color: '#fff', fontSize: 11 }}
                                />
                                <Bar dataKey="tokens" radius={[0, 6, 6, 0]} barSize={30}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#f97316' : '#fdba74'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* List Column */}
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                    <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Recent Operations</h4>
                    <div className="space-y-4">
                        {usageData.slice(0, 6).map((log, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <Clock className="w-3.5 h-3.5 text-gray-600" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold text-gray-300 capitalize">{log.action?.replace(/_/g, ' ') || 'Operation'}</div>
                                        <div className="text-[9px] text-gray-600 uppercase tracking-tighter">{log.model}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-orange-400">{log.total_tokens || 0} tkn</div>
                                    <div className="text-[8px] text-gray-700 font-bold">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
