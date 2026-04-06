import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Skeleton from './Skeleton';

export default function AnalyticsChart({ analyticsData }) {
    if (!analyticsData) {
        return (
            <div className="w-full h-64 glass-morphism rounded-2xl border border-white/5 p-6 flex flex-col gap-4 bg-white/[0.02]">
                <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="flex-1 w-full" />
            </div>
        );
    }

    const { viewsPerDay, topArticles } = analyticsData;

    if (!viewsPerDay || viewsPerDay.length === 0) {
        return (
            <div className="w-full h-64 glass-morphism rounded-2xl border border-white/5 p-6 flex items-center justify-center text-gray-500 bg-white/[0.02]">
                Not enough data to display analytics yet. Publish articles and wait for traffic!
            </div>
        );
    }

    const totalViews = viewsPerDay.reduce((acc, day) => acc + parseInt(day.views), 0);

    return (
        <div className="w-full">
            {/* Top Articles List */}
            <div className="mb-8 p-6 glass-morphism rounded-2xl border border-white/5 bg-white/[0.02]">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-widest">Top Articles (7 Days)</h3>
                <div className="space-y-3">
                    {topArticles.length > 0 ? topArticles.map(article => (
                        <div key={article.id} className="flex justify-between items-center">
                            <a href={`/article/${article.slug}`} target="_blank" rel="noreferrer" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors truncate pr-4">
                                {article.title}
                            </a>
                            <span className="text-xs font-black text-primary px-2 py-1 bg-primary/10 rounded-md">
                                {article.views} views
                            </span>
                        </div>
                    )) : (
                        <p className="text-sm text-gray-500">No article views recorded yet.</p>
                    )}
                </div>
            </div>

            {/* Chart */}
            <div className="w-full h-72 glass-morphism rounded-2xl border border-white/5 p-6 relative overflow-hidden group hover:border-primary/20 transition-colors bg-white/[0.02]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex justify-between items-center mb-6 relative z-10">
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">Page Views (14 Days)</h3>
                    </div>
                    <div className="text-2xl font-black text-primary">
                        {totalViews} <span className="text-sm text-gray-400 font-medium">Views</span>
                    </div>
                </div>

                <div className="h-48 w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={viewsPerDay}
                            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.1)" vertical={false} />
                            <XAxis dataKey="date" stroke="rgba(139,92,246,0.5)" fontSize={10} tickMargin={10} />
                            <YAxis stroke="rgba(139,92,246,0.5)" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(2, 4, 10, 0.9)', borderColor: 'rgba(139,92,246,0.2)', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#8b5cf6' }}
                            />
                            <Area type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
