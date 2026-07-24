import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Skeleton from './Skeleton';
import { Eye, Users, Newspaper, Heart, TrendingUp, TrendingDown, Monitor, Smartphone, Tablet, Bot, Zap, Globe, Search, Share2, Link2, ArrowUpRight, Shield, DollarSign, Activity, Map, Clock, MousePointerClick } from 'lucide-react';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const DEVICE_COLORS = { Desktop: '#2b7cee', Mobile: '#8b5cf6', Tablet: '#06b6d4', 'Bot / Crawler': '#f97316' };
const DEVICE_ICONS = { Desktop: Monitor, Mobile: Smartphone, Tablet: Tablet, 'Bot / Crawler': Bot };

const REFERRER_ICONS = { search: Search, social: Share2, direct: Globe, internal: ArrowUpRight, referral: Link2 };
const REFERRER_COLORS = { search: '#22c55e', social: '#8b5cf6', direct: '#6b7280', internal: '#3b82f6', referral: '#f59e0b' };

function StatCard({ icon: Icon, label, value, subValue, trend, color = 'blue', tooltipContent }) {
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
        <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-2xl p-5 hover:border-black/10 dark:hover:border-white/10 transition-colors group relative overflow-hidden backdrop-blur-md"
        >
            <div className={`absolute top-0 right-0 w-24 h-24 blur-[40px] rounded-full -mr-10 -mt-10 opacity-10 group-hover:opacity-30 transition-all duration-500 ${colorClasses.split(' ')[1]}`} />
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className={`w-4 h-4 ${colorClasses.split(' ')[0]}`} />
                    </div>
                    {trend !== undefined && trend !== null && (
                        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {isPositive ? <TrendingUp className="w-3 h-3 group-hover:animate-bounce" /> : <TrendingDown className="w-3 h-3" />}
                            {Math.abs(trend)}%
                        </div>
                    )}
                </div>
                <div className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{value}</div>
                <div className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">{label}</div>
                {subValue && <div className="text-[9px] text-gray-400 dark:text-gray-500 mt-1 font-medium">{subValue}</div>}
            </div>

            {/* Custom Tooltip */}
            {tooltipContent && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <div className="bg-black/90 dark:bg-white/90 text-white dark:text-black text-xs p-3 rounded-xl shadow-xl backdrop-blur-md border border-white/10 dark:border-black/10">
                        {tooltipContent}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 dark:bg-black/90 border border-gray-200 dark:border-white/10 p-4 rounded-2xl shadow-xl backdrop-blur-xl">
                <p className="text-xs font-black text-gray-900 dark:text-white mb-2 tracking-widest uppercase">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-3 mt-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-bold uppercase">{entry.name}:</span>
                        <span className="text-xs font-black text-gray-900 dark:text-white tabular-nums">{entry.value.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};


export default function AnalyticsChart({ analyticsData, analytics, period }) {
    const data = analyticsData || analytics;
    if (!data) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-28 rounded-2xl bg-gray-200 dark:bg-white/5 animate-pulse relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                        </div>
                    ))}
                </div>
                <div className="h-72 rounded-2xl bg-gray-200 dark:bg-white/5 animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--color-primary),0.05)_0%,transparent_70%)]"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                </div>
            </motion.div>
        );
    }

    const { viewsPerDay, topArticles, deviceBreakdown, crawlerDetails, topPages, topReferrers, hourlyTraffic, summary, countriesData } = data;
    const stats = summary || {};

    const deviceData = (deviceBreakdown || []).map(d => ({ name: d.device, value: d.count }));
    const totalDeviceViews = deviceData.reduce((s, d) => s + d.value, 0);
    const botViews = deviceData.filter(d => d.name === 'Bot / Crawler').reduce((s, d) => s + d.value, 0);

    const maxCountryViews = countriesData && countriesData.length > 0 ? Math.max(...countriesData.map(d => d.value), 1) : 1;
    const colorScale = scaleLinear()
        .domain([0, maxCountryViews])
        .range(["#eff6ff", "#3b82f6"]);

    const referrerTypeData = Object.entries(
        (topReferrers || []).reduce((acc, ref) => {
            acc[ref.type] = (acc[ref.type] || 0) + ref.views;
            return acc;
        }, {})
    ).map(([name, value]) => ({ name, value }));

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
            {/* ═══ STAT CARDS ═══ */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-9 gap-4">
                {[
                    { icon: Zap, label: "LLM Tokens", value: stats.totalGeminiTokens?.toLocaleString() || 0, subValue: `$${stats.totalGeminiCost || '0.00'} est.`, color: "orange" },
                    { icon: Eye, label: "Views", value: stats.totalViews || 0, trend: stats.viewsGrowth, color: "primary" },
                    { icon: Users, label: "Unique", value: stats.uniqueVisitors || 0, color: "purple" },
                    { icon: Clock, label: "Avg Time", value: stats.avgSessionDuration || '00:00', color: "blue" },
                    { icon: MousePointerClick, label: "Bounce Rate", value: `${stats.bounceRate || 0}%`, color: "emerald" },
                    { icon: Newspaper, label: "Articles", value: stats.totalArticles || 0, color: "emerald" },
                    { 
                        icon: Heart, 
                        label: "Likes", 
                        value: stats.totalLikes || 0, 
                        color: "pink",
                        tooltipContent: stats.topLikedArticles?.length > 0 ? (
                            <div>
                                <div className="font-black uppercase tracking-widest text-[9px] text-pink-400 dark:text-pink-600 mb-2">Most Liked</div>
                                <div className="space-y-2">
                                    {stats.topLikedArticles.map((art, idx) => (
                                        <div key={idx} className="flex justify-between items-start gap-2">
                                            <span className="truncate flex-1">{art.title}</span>
                                            <span className="font-bold text-pink-400 dark:text-pink-600">{art.likes}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : "No likes yet"
                    },
                    { icon: TrendingUp, label: "Engagement", value: `${stats.engagementRate || 0}%`, color: "amber" },
                    { icon: Eye, label: "Lifetime", value: stats.totalViewsAllTime || 0, color: "blue" },
                ].map((stat, i) => (
                    <motion.div key={i} variants={itemVariants}>
                        <StatCard {...stat} />
                    </motion.div>
                ))}
            </div>

            {/* ═══ MAIN CHART: VIEWS + VISITORS ═══ */}
            {viewsPerDay && viewsPerDay.length > 0 && (
                <motion.div variants={itemVariants} className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-primary/20 transition-colors backdrop-blur-md">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Traffic Overview</h3>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500">
                            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" /> Views</span>
                            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Unique</span>
                        </div>
                    </div>
                    <div className="h-64 w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={viewsPerDay} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="rgb(var(--color-primary))" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="rgb(var(--color-primary))" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" vertical={false} />
                                <XAxis dataKey="date" stroke="rgba(128,128,128,0.5)" fontSize={10} tickMargin={10} />
                                <YAxis stroke="rgba(128,128,128,0.5)" fontSize={10} axisLine={false} tickLine={false} domain={[0, dataMax => Math.ceil(dataMax * 1.2)]} padding={{ top: 20 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="views" stroke="rgb(var(--color-primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" animationDuration={1500} />
                                <Area type="monotone" dataKey="visitors" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" animationDuration={1500} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}

            {/* ═══ SECOND ROW: DEVICES + HOURLY ═══ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deviceData.length > 0 && (
                    <motion.div variants={itemVariants} className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 backdrop-blur-md">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Device Breakdown</h3>
                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">
                                {totalDeviceViews.toLocaleString()} hits
                            </span>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="w-32 h-32 flex-shrink-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={deviceData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={4} dataKey="value" animationDuration={1000}>
                                            {deviceData.map((entry) => (
                                                <Cell key={entry.name} fill={DEVICE_COLORS[entry.name] || '#6b7280'} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex-1 space-y-4">
                                {deviceData.map(d => {
                                    const Icon = DEVICE_ICONS[d.name] || Monitor;
                                    const pct = totalDeviceViews > 0 ? ((d.value / totalDeviceViews) * 100).toFixed(1) : 0;
                                    return (
                                        <div key={d.name} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 group-hover:scale-110 transition-transform" style={{ color: DEVICE_COLORS[d.name] || '#6b7280' }}>
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <span className="text-xs text-gray-600 dark:text-gray-400 font-bold">{d.name}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.max(pct, 2)}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full rounded-full" style={{ backgroundColor: DEVICE_COLORS[d.name] || '#6b7280' }} />
                                                </div>
                                                <span className="text-[10px] font-black text-gray-500 w-8 text-right">{pct}%</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}

                {hourlyTraffic && hourlyTraffic.length > 0 && (
                    <motion.div variants={itemVariants} className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 backdrop-blur-md">
                        <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6">Traffic by Hour (24h)</h3>
                        <div className="h-44">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={hourlyTraffic} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.05)" vertical={false} />
                                    <XAxis dataKey="hour" stroke="rgba(128,128,128,0.4)" fontSize={9} tickMargin={8} interval={2} />
                                    <YAxis stroke="rgba(128,128,128,0.4)" fontSize={9} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(128,128,128,0.1)' }} />
                                    <Bar dataKey="views" fill="rgb(var(--color-primary))" radius={[4, 4, 0, 0]} animationDuration={1000} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* ═══ CRAWLER INTEL ═══ */}
            {crawlerDetails && crawlerDetails.length > 0 && (
                <motion.div variants={itemVariants} className="bg-orange-500/5 border border-orange-500/20 rounded-3xl p-8 relative overflow-hidden backdrop-blur-md">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-[80px] rounded-full animate-pulse" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-orange-500" />
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-orange-500 uppercase tracking-[0.2em]">Crawler Intelligence</h3>
                                <p className="text-[10px] text-orange-500/70 font-bold mt-1">Who's indexing your content</p>
                            </div>
                        </div>
                        <div className="text-left md:text-right">
                            <div className="text-2xl font-black text-orange-500">{botViews.toLocaleString()}</div>
                            <div className="text-[9px] font-bold text-orange-500/70 uppercase tracking-widest mt-1">Bot Hits</div>
                        </div>
                    </div>
                    <div className="overflow-x-auto pb-4 custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-4 min-w-max sm:min-w-0">
                            {crawlerDetails.map((c, i) => (
                                <motion.div whileHover={{ scale: 1.05 }} key={i} className="bg-orange-500/10 border border-orange-500/20 rounded-2xl px-5 py-4 hover:border-orange-500/40 transition-colors flex-shrink-0 w-32 sm:w-auto">
                                    <div className="text-[11px] font-bold text-orange-500/80 truncate">{c.crawler}</div>
                                    <div className="text-xl font-black text-orange-500 mt-2">{c.hits}</div>
                                    <div className="text-[8px] text-orange-500/60 font-bold uppercase tracking-widest mt-1">hits</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* ═══ GEOGRAPHIC DATA (MAP) ═══ */}
            {countriesData && countriesData.length > 0 && (
                <motion.div variants={itemVariants} className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                            <Map className="w-4 h-4 text-primary" /> Global Audience
                        </h3>
                    </div>
                    <div className="w-full h-96 bg-transparent rounded-2xl overflow-hidden relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }}>
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => {
                                            const d = countriesData.find((s) => s.id === geo.properties.iso_a2);
                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    fill={d ? colorScale(d.value) : "rgba(128,128,128,0.1)"}
                                                    stroke="rgba(128,128,128,0.2)"
                                                    strokeWidth={0.5}
                                                    style={{
                                                        default: { outline: "none" },
                                                        hover: { fill: "rgb(var(--color-primary))", outline: "none", cursor: "pointer" },
                                                        pressed: { outline: "none" },
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </Geographies>
                            </ComposableMap>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}

            {/* ═══ TOP SOURCES & TOP PAGES ═══ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {topReferrers && topReferrers.length > 0 && (
                    <motion.div variants={itemVariants} className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-8 backdrop-blur-md">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
                            <h3 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.3em]">Traffic Sources</h3>
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg w-fit">Selected Period</div>
                        </div>
                        <div className="flex flex-col xl:flex-row gap-8">
                            <div className="w-full xl:w-1/3 h-48 flex-shrink-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={referrerTypeData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value" animationDuration={1000}>
                                            {referrerTypeData.map((entry) => (
                                                <Cell key={entry.name} fill={REFERRER_COLORS[entry.name] || '#6b7280'} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-4 flex-1">
                                {topReferrers.map((ref, i) => {
                                    const Icon = REFERRER_ICONS[ref.type] || Globe;
                                    const color = REFERRER_COLORS[ref.type] || '#6b7280';
                                    return (
                                        <div key={i} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors" style={{ backgroundColor: `${color}15` }}>
                                                    <Icon className="w-4 h-4" style={{ color }} />
                                                </div>
                                                <span className="text-sm font-bold text-gray-800 dark:text-gray-200 capitalize">{ref.source}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs font-black text-gray-500 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">{ref.type}</span>
                                                <div className="w-12 text-right text-sm font-black text-gray-900 dark:text-white">{ref.views.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}

                {topPages && topPages.length > 0 && (
                    <motion.div variants={itemVariants} className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-8 backdrop-blur-md overflow-hidden">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
                            <h3 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.3em]">Top Entry Pages</h3>
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg w-fit">Selected Period</div>
                        </div>
                        <div className="space-y-4">
                            {topPages.map((page, i) => (
                                <div key={i} className="flex items-center justify-between group hover:bg-black/5 dark:hover:bg-white/5 -mx-4 px-4 py-2 rounded-xl transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <span className="text-xs font-black text-gray-300 dark:text-white/20 w-4 font-mono">{i + 1}</span>
                                        <a href={page.path} target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-600 dark:text-gray-300 truncate hover:text-primary transition-colors">
                                            {page.path === '/' ? '/ (Home)' : page.path}
                                        </a>
                                    </div>
                                    <div className="text-sm font-black text-gray-900 dark:text-white flex-shrink-0 ml-4">{page.views.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* ═══ TOP ARTICLES ═══ */}
            <motion.div variants={itemVariants} className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-8 backdrop-blur-md overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
                    <h3 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.3em]">Viral Content</h3>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg w-fit">By Total Hits</div>
                </div>
                <div className="space-y-2">
                    {topArticles && topArticles.length > 0 ? topArticles.map((article, i) => (
                        <motion.div whileHover={{ scale: 1.01, x: 5 }} key={article.id} className="flex items-center gap-6 group/row hover:bg-black/5 dark:hover:bg-white/5 -mx-4 px-4 py-4 rounded-2xl transition-all cursor-pointer">
                            <span className="text-xl font-black text-gray-300 dark:text-white/10 w-8 text-center font-mono group-hover/row:text-primary transition-colors">{String(i + 1).padStart(2, '0')}</span>
                            <div className="flex-1 min-w-0">
                                <a href={`/article/${article.slug}`} target="_blank" rel="noreferrer" className="block text-sm font-black text-gray-900 dark:text-white group-hover/row:text-primary transition-colors truncate tracking-tight mb-1">
                                    {article.title}
                                </a>
                                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{article.unique_views} unique views</span>
                            </div>
                            <div className="flex items-center gap-5 flex-shrink-0">
                                <div className="text-right">
                                    <div className="text-sm font-black text-gray-900 dark:text-white">{article.views?.toLocaleString()}</div>
                                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Hits</div>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-transparent group-hover/row:border-primary/20 group-hover/row:bg-primary/10 transition-colors">
                                    <TrendingUp className="w-4 h-4 text-gray-400 group-hover/row:text-primary transition-colors" />
                                </div>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="py-16 text-center">
                            <Newspaper className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">No signals detected yet</p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* ═══ MOST LIKED CONTENT ═══ */}
            {stats.topLikedArticles && stats.topLikedArticles.length > 0 && (
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-pink-500/5 to-rose-500/5 border border-pink-500/20 dark:border-pink-500/30 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(236,72,153,0.15),transparent_50%)] pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-50" />
                    
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                                <Heart className="w-6 h-6 text-white drop-shadow-md" />
                            </div>
                            <div>
                                <h3 className="text-[13px] font-black text-pink-500 uppercase tracking-[0.25em]">Reader Favorites</h3>
                                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">All-time highest engagement</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 relative z-10">
                        {stats.topLikedArticles.map((article, i) => (
                            <motion.div whileHover={{ scale: 1.02, x: 5 }} key={i} className="flex items-center gap-5 group/row hover:bg-white/60 dark:hover:bg-pink-500/10 p-4 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-pink-500/20 shadow-sm hover:shadow-md">
                                <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 font-black text-xs font-mono group-hover/row:bg-pink-500 group-hover/row:text-white transition-colors">
                                    {i + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <a href={`/article/${article.slug}`} target="_blank" rel="noreferrer" className="block text-sm font-bold text-gray-800 dark:text-white group-hover/row:text-pink-600 dark:group-hover/row:text-pink-400 transition-colors truncate">
                                        {article.title}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 bg-pink-500/5 px-3 py-1.5 rounded-lg border border-pink-500/10">
                                    <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                                    <span className="text-sm font-black text-pink-600 dark:text-pink-400">{article.likes?.toLocaleString()}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ═══ MONETIZATION PROJECTIONS ═══ */}
            {stats.adsenseProjection && (
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/20 dark:border-emerald-500/30 rounded-3xl p-8 backdrop-blur-xl mt-6 relative overflow-hidden group/monetization">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none transition-opacity duration-700 group-hover/monetization:opacity-100 opacity-50" />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                                <DollarSign className="w-6 h-6 text-white drop-shadow-md" />
                            </div>
                            <div>
                                <h3 className="text-[13px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em]">Revenue Forecast</h3>
                                <p className="text-[10px] font-bold text-emerald-500/70 uppercase tracking-widest mt-1">Google AdSense (30 Days)</p>
                            </div>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                            <Activity className="w-3.5 h-3.5" />
                            Volume: {stats.adsenseProjection.views.toLocaleString()}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        <div className="bg-white/60 dark:bg-black/40 border border-emerald-500/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-gray-400" />
                                <div className="text-[10px] font-black text-emerald-600/70 dark:text-emerald-500/60 uppercase tracking-widest">Pessimistic</div>
                            </div>
                            <div className="text-3xl font-black text-gray-800 dark:text-gray-200">${stats.adsenseProjection.low.toFixed(2)}</div>
                            <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-2">RPM $1.50</div>
                        </div>

                        <div className="bg-gradient-to-b from-emerald-500/10 to-teal-500/5 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden shadow-[0_8px_30px_rgba(16,185,129,0.1)] transform md:-translate-y-2 hover:-translate-y-3 transition-transform duration-300">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 blur-[50px] rounded-full pointer-events-none -mr-16 -mt-16" />
                            <div className="flex items-center justify-between mb-3 relative z-10">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Expected</div>
                                </div>
                                <Zap className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div className="text-4xl font-black text-emerald-700 dark:text-emerald-300 relative z-10">${((stats.adsenseProjection.low + stats.adsenseProjection.high) / 2).toFixed(2)}</div>
                            <div className="text-[9px] font-bold text-emerald-600/60 dark:text-emerald-400/60 uppercase tracking-widest mt-2 relative z-10">Avg RPM $2.75</div>
                        </div>

                        <div className="bg-white/60 dark:bg-black/40 border border-emerald-500/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-teal-400" />
                                <div className="text-[10px] font-black text-emerald-600/70 dark:text-emerald-500/60 uppercase tracking-widest">Optimistic</div>
                            </div>
                            <div className="text-3xl font-black text-gray-800 dark:text-gray-200">${stats.adsenseProjection.high.toFixed(2)}</div>
                            <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-2">RPM $4.00</div>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
