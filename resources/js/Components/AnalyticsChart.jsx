import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Skeleton from './Skeleton';

export default function AnalyticsChart() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/analytics/dashboard')
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load analytics", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="w-full h-64 glass-morphism rounded-2xl border border-white/5 p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="flex-1 w-full" />
            </div>
        );
    }

    if (!data || data.chart_data.length === 0) {
        return (
            <div className="w-full h-64 glass-morphism rounded-2xl border border-white/5 p-6 flex items-center justify-center text-gray-500">
                Not enough data to display analytics. Publish articles to start tracking!
            </div>
        );
    }

    return (
        <div className="w-full h-64 glass-morphism rounded-2xl border border-white/5 p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex justify-between items-center mb-6 relative z-10">
                <div>
                    <h3 className="text-sm font-bold text-white tracking-widest uppercase">Performance</h3>
                    <p className="text-xs text-gray-400 mt-1">Total Views: {data.total_views}</p>
                </div>
                <div className="text-2xl font-black text-primary">
                    +{data.total_articles} <span className="text-sm text-gray-400 font-medium">Articles</span>
                </div>
            </div>

            <div className="h-40 w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data.chart_data}
                        margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00b4ff" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#00b4ff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} tickMargin={10} />
                        <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(2, 3, 8, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#00b4ff' }}
                        />
                        <Area type="monotone" dataKey="views" stroke="#00b4ff" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
