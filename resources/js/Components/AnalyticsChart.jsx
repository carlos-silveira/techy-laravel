import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Skeleton from './Skeleton';
import { Eye, Users, Newspaper, Heart, TrendingUp, TrendingDown, Monitor, Smartphone, Tablet, Bot, Zap } from 'lucide-react';

const DEVICE_COLORS = { Desktop: '#2b7cee', Mobile: '#8b5cf6', Tablet: '#06b6d4', Bot: '#6b7280' };
const DEVICE_ICONS = { Desktop: Monitor, Mobile: Smartphone, Tablet: Tablet, Bot: Bot };

function StatCard({ icon: Icon, label, value, subValue, trend, color = 'blue' }) {
    const isPositive = trend > 0;
    const colorMap = {
        primary: 'text-primary bg-primary',
        blue: 'text-blue-500 bg-blue-500',
        purple: 'text-purple-500 bg-purple-500',
        emerald: 'text-emerald-500 bg-emerald-500',
        pink: 'text-pink-500 bg-pink-500',
        orange: 'text-orange-500 bg-orange-500',
        amber: 'text-amber-500 bg-amber-500',
    };
    
    const colorClasses = colorMap[color] || colorMap.primary;

    return (
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 blur-[40px] rounded-full -mr-10 -mt-10 opacity-10 group-hover:opacity-20 transition-all ${colorClasses.split(' ')[1]}`} />
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <Icon className={`w-4 h-4 ${colorClasses.split(' ')[0]}`} />
                    </div>
                    {trend !== undefined && trend !== null && (
                        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {Math.abs(trend)}%
                        </div>
                    )}
                </div>
                <div className="text-2xl font-black text-white tracking-tight">
                    {value}
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{label}</div>
                {subValue && <div className="text-[9px] text-gray-500 mt-1 font-medium">{subValue}</div>}
            </div>
        </div>
    );
}


export default function AnalyticsChart({ analyticsData }) {
    if (!analyticsData) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
                </div>
                <Skeleton className="h-72 rounded-2xl" />
            </div>
        );
    }

    const { viewsPerDay, topArticles, deviceBreakdown, topPages, topReferrers, hourlyTraffic, summary, geminiUsage } = analyticsData;
    const stats = summary || {};

    const deviceData = (deviceBreakdown || []).map(d => ({ name: d.device, value: d.count }));
    const totalDeviceViews = deviceData.reduce((s, d) => s + d.value, 0);

    return (
        <div className="space-y-6">
            {/* ═══ STAT CARDS ═══ */}
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                <StatCard icon={Zap} label="LLM Tokens" value={stats.totalGeminiTokens7d?.toLocaleString() || 0} subValue="Last 7 Days" color="orange" />
                <StatCard icon={Eye} label="Views (7d)" value={stats.totalViews7d || 0} trend={stats.viewsGrowth} color="primary" />
                <StatCard icon={Users} label="Unique" value={stats.uniqueVisitors7d || 0} color="purple" />
                <StatCard icon={Newspaper} label="Articles" value={stats.totalArticles || 0} color="emerald" />
                <StatCard icon={Heart} label="Likes" value={stats.totalLikes || 0} color="pink" />
                <StatCard icon={TrendingUp} label="Engagement" value={`${stats.engagementRate || 0}%`} color="amber" />
                <StatCard icon={Eye} label="Lifetime" value={stats.totalViewsAllTime || 0} color="blue" />
            </div>


            {/* ═══ MAIN CHART: VIEWS + VISITORS ═══ */}
            {viewsPerDay && viewsPerDay.length > 0 && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-primary/20 transition-colors">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity" />
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h3 className="text-xs font-black text-white uppercase tracking-widest">Traffic Overview (14 Days)</h3>
                        <div className="flex items-center gap-4 text-[10px] font-bold">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Views</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> Unique</span>
                        </div>
                    </div>
                    <div className="h-56 w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={viewsPerDay} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2b7cee" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#2b7cee" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                <XAxis dataKey="date" stroke="rgba(255,255,255,0.2)" fontSize={10} tickMargin={10} />
                                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(2, 4, 10, 0.95)', borderColor: 'rgba(43,124,238,0.2)', borderRadius: '12px', color: '#fff', fontSize: 12 }}
                                    itemStyle={{ color: '#8b5cf6' }}
                                />
                                <Area type="monotone" dataKey="views" stroke="#2b7cee" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                                <Area type="monotone" dataKey="visitors" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* ═══ SECOND ROW: DEVICES + HOURLY ═══ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Device Breakdown */}
                {deviceData.length > 0 && (
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Device Breakdown</h3>
                        <div className="flex items-center gap-6">
                            <div className="w-32 h-32 flex-shrink-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={deviceData} cx="50%" cy="50%" innerRadius={30} outerRadius={55} paddingAngle={3} dataKey="value">
                                            {deviceData.map((entry) => (
                                                <Cell key={entry.name} fill={DEVICE_COLORS[entry.name] || '#6b7280'} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex-1 space-y-3">
                                {deviceData.map(d => {
                                    const Icon = DEVICE_ICONS[d.name] || Monitor;
                                    const pct = totalDeviceViews > 0 ? ((d.value / totalDeviceViews) * 100).toFixed(1) : 0;
                                    return (
                                        <div key={d.name} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Icon className="w-3.5 h-3.5" style={{ color: DEVICE_COLORS[d.name] || '#6b7280' }} />
                                                <span className="text-xs text-gray-400 font-medium">{d.name}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: DEVICE_COLORS[d.name] || '#6b7280' }} />
                                                </div>
                                                <span className="text-[10px] font-black text-gray-500 w-10 text-right">{pct}%</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Hourly Traffic */}
                {hourlyTraffic && hourlyTraffic.length > 0 && (
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Traffic by Hour (24h)</h3>
                        <div className="h-36">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={hourlyTraffic} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                    <XAxis dataKey="hour" stroke="rgba(255,255,255,0.2)" fontSize={9} tickMargin={5} interval={2} />
                                    <YAxis stroke="rgba(255,255,255,0.15)" fontSize={9} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(2, 4, 10, 0.95)', borderColor: 'rgba(43,124,238,0.2)', borderRadius: '12px', color: '#fff', fontSize: 11 }}
                                    />
                                    <Bar dataKey="views" fill="#2b7cee" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>

            {/* ═══ TOP ARTICLES ═══ */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Viral Content</h3>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Efficiency Ranking</div>
                </div>
                <div className="space-y-4">
                    {topArticles && topArticles.length > 0 ? topArticles.map((article, i) => (
                        <div key={article.id} className="flex items-center gap-6 group/row hover:bg-white/[0.01] -mx-4 px-4 py-3 rounded-2xl transition-all">
                            <span className="text-xl font-black text-white/5 w-8 text-center font-mono group-hover/row:text-primary/20 transition-colors">{String(i + 1).padStart(2, '0')}</span>
                            <div className="flex-1 min-w-0">
                                <a href={`/article/${article.slug}`} target="_blank" rel="noreferrer" className="block text-[13px] font-black text-gray-200 group-hover/row:text-primary transition-colors truncate tracking-tight mb-1">
                                    {article.title}
                                </a>
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-1 grayscale group-hover/row:grayscale-0 transition-all opacity-30 group-hover/row:opacity-100">
                                        {[...Array(3)].map((_, j) => <div key={j} className="w-3 h-3 rounded-full border border-black bg-gray-500" />)}
                                    </div>
                                    <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Active Engagement</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                                <div className="text-right">
                                    <div className="text-xs font-black text-white">{article.views?.toLocaleString()}</div>
                                    <div className="text-[9px] font-black text-gray-700 uppercase">Hits</div>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/row:border-primary/20 transition-colors">
                                    <TrendingUp className="w-4 h-4 text-gray-600 group-hover/row:text-primary transition-colors" />
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="py-10 text-center">
                            <Newspaper className="w-8 h-8 text-gray-800 mx-auto mb-2 opacity-20" />
                            <p className="text-[11px] font-black text-gray-700 uppercase tracking-widest">No signals detected yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ═══ TOP PAGES & REFERRERS ═══ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                {topPages && topPages.length > 0 && (
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                        <h3 className="text-[10px] font-black text-white mb-8 uppercase tracking-[0.3em]">Entry Points</h3>
                        <div className="space-y-3">
                            {topPages.map((page, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0 group/page">
                                    <span className="text-[11px] text-gray-500 font-mono truncate max-w-[70%] group-hover/page:text-gray-300 transition-colors">{page.path}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500/30" style={{ width: `${Math.min(100, (page.views / (topPages[0].views || 1)) * 100)}%` }} />
                                        </div>
                                        <span className="text-[11px] font-black text-gray-400 w-8 text-right">{page.views}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {topReferrers && topReferrers.length > 0 && (
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[60px] rounded-full" />
                        <h3 className="text-[10px] font-black text-emerald-400 mb-8 uppercase tracking-[0.3em]">Inbound Traffic</h3>
                        <div className="space-y-3">
                            {topReferrers.map((ref, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0 group/ref">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500/40 group-hover/ref:bg-emerald-400 group-hover/ref:scale-125 transition-all" />
                                        <span className="text-[11px] text-gray-300 font-bold tracking-tight capitalize">
                                            {ref.source === 'Direct' ? <span className="text-gray-600 italic">Direct / Private</span> : ref.source}
                                        </span>
                                    </div>
                                    <span className="text-[11px] font-black text-emerald-500 tabular-nums">{ref.views}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
