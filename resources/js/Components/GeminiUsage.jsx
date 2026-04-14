import React from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Cpu, Zap, Activity, Clock, DollarSign, Hash, Layers } from 'lucide-react';

const OP_LABELS = {
    'generate_draft': 'Draft Gen',
    'generate_ideas': 'Idea Scan',
    'generate_daily_brief': 'Daily Brief',
    'generate_category_draft': 'Category Draft',
    'generate_article_meta': 'SEO Meta',
    'generate_seo': 'SEO Gen',
    'generate_image_prompt': 'Image Prompt',
    'regenerate_draft': 'Re-Draft',
    'improve_content': 'Content Polish',
    'studio_chat': 'Studio Chat',
    'translate': 'Translation',
    'unknown': 'API Call',
};

const OP_COLORS = {
    'generate_draft': '#f97316',
    'generate_ideas': '#8b5cf6',
    'generate_daily_brief': '#06b6d4',
    'generate_category_draft': '#22c55e',
    'generate_article_meta': '#eab308',
    'studio_chat': '#ec4899',
    'translate': '#3b82f6',
};

export default function GeminiUsage({ usageData, modelDistribution }) {
    if (!usageData || usageData.length === 0) {
        return (
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 text-center">
                <Cpu className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-black text-white">No API Logs Yet</h3>
                <p className="text-sm text-gray-500 mt-2">Gemini usage metrics will appear here once stories are generated.</p>
            </div>
        );
    }

    const chartData = (modelDistribution || []).sort((a, b) => b.tokens - a.tokens);
    const totalTokens = chartData.reduce((s, d) => s + d.tokens, 0);
    const totalCost = chartData.reduce((s, d) => s + (d.cost || 0), 0);
    const totalRequests = chartData.reduce((s, d) => s + (d.requests || 0), 0);

    return (
        <div className="space-y-6 mt-12">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-[10px] font-black text-orange-400 uppercase tracking-[0.3em] mb-2">Compute Consumption</h3>
                    <h2 className="text-3xl font-black tracking-tighter text-white">Gemini Engine.</h2>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                        <div className="text-[9px] font-bold text-gray-500 uppercase">Requests</div>
                        <div className="text-sm font-black text-white">{totalRequests.toLocaleString()}</div>
                    </div>
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                        <div className="text-[9px] font-bold text-gray-500 uppercase">Tokens</div>
                        <div className="text-sm font-black text-orange-400">{totalTokens.toLocaleString()}</div>
                    </div>
                    <div className="px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                        <div className="text-[9px] font-bold text-orange-400/60 uppercase">Est. Cost</div>
                        <div className="text-sm font-black text-orange-400">${totalCost.toFixed(4)}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Model Distribution Chart */}
                <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500/20 transition-colors">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none opacity-20" />
                    <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-8">Token Distribution by Model</h4>
                    {chartData.length > 0 ? (
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} layout="vertical" margin={{ left: 80, right: 40 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="model"
                                        type="category"
                                        stroke="rgba(255,255,255,0.4)"
                                        fontSize={10}
                                        axisLine={false}
                                        tickLine={false}
                                        width={80}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                        contentStyle={{ backgroundColor: 'rgba(2, 4, 10, 0.95)', borderColor: 'rgba(249,115,22,0.2)', borderRadius: '12px', color: '#fff', fontSize: 11 }}
                                        formatter={(value, name) => [value.toLocaleString(), name === 'tokens' ? 'Tokens' : name]}
                                    />
                                    <Bar dataKey="tokens" radius={[0, 6, 6, 0]} barSize={30}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#f97316' : index === 1 ? '#fdba74' : '#fed7aa'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-gray-600 text-sm">No model data</div>
                    )}
                    {/* Model legend with requests + cost */}
                    {chartData.length > 0 && (
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {chartData.map((m, i) => (
                                <div key={i} className="flex items-center justify-between bg-white/[0.02] rounded-xl px-4 py-2 border border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: i === 0 ? '#f97316' : '#fdba74' }} />
                                        <span className="text-[10px] font-bold text-gray-400 truncate">{m.model}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[9px] font-black">
                                        <span className="text-gray-500">{m.requests} req</span>
                                        <span className="text-orange-400">{m.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Operations — shows real action labels and model names */}
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                    <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Recent Operations</h4>
                    <div className="space-y-3">
                        {usageData.slice(0, 8).map((log, i) => {
                            const opType = log.operation_type || 'unknown';
                            const label = OP_LABELS[opType] || opType.replace(/_/g, ' ');
                            const color = OP_COLORS[opType] || '#f97316';
                            return (
                                <div key={i} className="flex items-center justify-between group hover:bg-white/[0.02] -mx-2 px-2 py-1.5 rounded-xl transition-all">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: `${color}15`}}>
                                            <Layers className="w-3 h-3" style={{color}} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[11px] font-bold text-gray-300 capitalize truncate">{label}</div>
                                            <div className="text-[8px] text-gray-600 font-bold uppercase tracking-wider truncate">{log.model_name || 'unknown'}</div>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0 ml-2">
                                        <div className="text-[10px] font-black text-orange-400">{(log.total_tokens || 0).toLocaleString()} tkn</div>
                                        <div className="flex items-center gap-1 justify-end">
                                            {log.cost_estimate > 0 && (
                                                <span className="text-[8px] text-gray-600 font-bold">${log.cost_estimate.toFixed(5)}</span>
                                            )}
                                            <span className="text-[8px] text-gray-700 font-bold">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
