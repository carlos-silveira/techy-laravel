import { t as ThemeToggle } from "./ThemeToggle-z5uN9EoT.mjs";
import { t as RagCopilot } from "./RagCopilot-CsH8uUGU.mjs";
import React, { useEffect, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { toast } from "sonner";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, AlignLeft, ArrowLeft, ArrowRight, ArrowUpRight, BarChart2, Bold, Bot, Check, CheckCircle, CheckCircle2, ChevronDown, ChevronLeft, Clock, Code, Copy, Cpu, DollarSign, Edit3, Eye, FileEdit, Globe, Heading2, Heading3, Heart, Home, Image, Italic, Layers, Layout, Link2, List, ListOrdered, Loader2, MessageSquare, Monitor, Newspaper, Quote, Radar, Redo, RefreshCw, Rocket, RotateCcw, Search, Send, Share2, Shield, Smartphone, Sparkles, Strikethrough, Tablet, ThumbsUp, Trash2, TrendingDown, TrendingUp, Undo, Users, Wand2, X, Zap } from "lucide-react";
import axios from "axios";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
//#region resources/js/Components/AnalyticsChart.jsx
var DEVICE_COLORS = {
	Desktop: "#2b7cee",
	Mobile: "#8b5cf6",
	Tablet: "#06b6d4",
	"Bot / Crawler": "#f97316"
};
var DEVICE_ICONS = {
	Desktop: Monitor,
	Mobile: Smartphone,
	Tablet,
	"Bot / Crawler": Bot
};
var REFERRER_ICONS = {
	search: Search,
	social: Share2,
	direct: Globe,
	internal: ArrowUpRight,
	referral: Link2
};
var REFERRER_COLORS = {
	search: "#22c55e",
	social: "#8b5cf6",
	direct: "#6b7280",
	internal: "#3b82f6",
	referral: "#f59e0b"
};
function StatCard({ icon: Icon, label, value, subValue, trend, color = "blue", tooltipContent }) {
	const isPositive = trend > 0;
	const colorMap = {
		primary: "text-primary bg-primary",
		blue: "text-blue-500 bg-blue-500",
		purple: "text-purple-500 bg-purple-500",
		emerald: "text-emerald-500 bg-emerald-500",
		pink: "text-pink-500 bg-pink-500",
		orange: "text-orange-500 bg-orange-500",
		amber: "text-amber-500 bg-amber-500"
	};
	const colorClasses = colorMap[color] || colorMap.primary;
	return /* @__PURE__ */ jsxs(motion.div, {
		whileHover: {
			scale: 1.05,
			y: -5
		},
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 10
		},
		className: "bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-2xl p-5 hover:border-black/10 dark:hover:border-white/10 transition-colors group relative overflow-hidden backdrop-blur-md",
		children: [
			/* @__PURE__ */ jsx("div", { className: `absolute top-0 right-0 w-24 h-24 blur-[40px] rounded-full -mr-10 -mt-10 opacity-10 group-hover:opacity-30 transition-all duration-500 ${colorClasses.split(" ")[1]}` }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-10",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform",
							children: /* @__PURE__ */ jsx(Icon, { className: `w-4 h-4 ${colorClasses.split(" ")[0]}` })
						}), trend !== void 0 && trend !== null && /* @__PURE__ */ jsxs("div", {
							className: `flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${isPositive ? "text-emerald-500" : "text-rose-500"}`,
							children: [
								isPositive ? /* @__PURE__ */ jsx(TrendingUp, { className: "w-3 h-3 group-hover:animate-bounce" }) : /* @__PURE__ */ jsx(TrendingDown, { className: "w-3 h-3" }),
								Math.abs(trend),
								"%"
							]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-2xl font-black text-gray-900 dark:text-white tracking-tight",
						children: value
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1",
						children: label
					}),
					subValue && /* @__PURE__ */ jsx("div", {
						className: "text-[9px] text-gray-400 dark:text-gray-500 mt-1 font-medium",
						children: subValue
					})
				]
			}),
			tooltipContent && /* @__PURE__ */ jsx("div", {
				className: "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50",
				children: /* @__PURE__ */ jsx("div", {
					className: "bg-black/90 dark:bg-white/90 text-white dark:text-black text-xs p-3 rounded-xl shadow-xl backdrop-blur-md border border-white/10 dark:border-black/10",
					children: tooltipContent
				})
			})
		]
	});
}
var CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) return /* @__PURE__ */ jsxs("div", {
		className: "bg-white/90 dark:bg-black/90 border border-gray-200 dark:border-white/10 p-4 rounded-2xl shadow-xl backdrop-blur-xl",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs font-black text-gray-900 dark:text-white mb-2 tracking-widest uppercase",
			children: label
		}), payload.map((entry, index) => /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3 mt-1",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "w-2 h-2 rounded-full",
					style: { backgroundColor: entry.color }
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "text-xs text-gray-600 dark:text-gray-400 font-bold uppercase",
					children: [entry.name, ":"]
				}),
				/* @__PURE__ */ jsx("span", {
					className: "text-xs font-black text-gray-900 dark:text-white tabular-nums",
					children: entry.value.toLocaleString()
				})
			]
		}, index))]
	});
	return null;
};
function AnalyticsChart({ analyticsData }) {
	if (!analyticsData) return /* @__PURE__ */ jsxs(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		className: "space-y-6",
		children: [/* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-2 md:grid-cols-4 gap-4",
			children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx("div", {
				className: "h-28 rounded-2xl bg-gray-200 dark:bg-white/5 animate-pulse relative overflow-hidden",
				children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" })
			}, i))
		}), /* @__PURE__ */ jsxs("div", {
			className: "h-72 rounded-2xl bg-gray-200 dark:bg-white/5 animate-pulse relative overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--color-primary),0.05)_0%,transparent_70%)]" }), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" })]
		})]
	});
	const { viewsPerDay, topArticles, deviceBreakdown, crawlerDetails, topPages, topReferrers, hourlyTraffic, summary } = analyticsData;
	const stats = summary || {};
	const deviceData = (deviceBreakdown || []).map((d) => ({
		name: d.device,
		value: d.count
	}));
	const totalDeviceViews = deviceData.reduce((s, d) => s + d.value, 0);
	const botViews = deviceData.filter((d) => d.name === "Bot / Crawler").reduce((s, d) => s + d.value, 0);
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: { staggerChildren: .05 }
		}
	};
	const itemVariants = {
		hidden: {
			opacity: 0,
			y: 20
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 24
			}
		}
	};
	return /* @__PURE__ */ jsxs(motion.div, {
		variants: containerVariants,
		initial: "hidden",
		animate: "show",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4",
				children: [
					{
						icon: Zap,
						label: "LLM Tokens",
						value: stats.totalGeminiTokens7d?.toLocaleString() || 0,
						subValue: `$${stats.totalGeminiCost7d || "0.00"} est.`,
						color: "orange"
					},
					{
						icon: Eye,
						label: "Views (7d)",
						value: stats.totalViews7d || 0,
						trend: stats.viewsGrowth,
						color: "primary"
					},
					{
						icon: Users,
						label: "Unique",
						value: stats.uniqueVisitors7d || 0,
						color: "purple"
					},
					{
						icon: Newspaper,
						label: "Articles",
						value: stats.totalArticles || 0,
						color: "emerald"
					},
					{
						icon: Heart,
						label: "Likes (All Time)",
						value: stats.totalLikes || 0,
						color: "pink",
						tooltipContent: stats.topLikedArticles?.length > 0 ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "font-black uppercase tracking-widest text-[9px] text-pink-400 dark:text-pink-600 mb-2",
							children: "Most Liked"
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-2",
							children: stats.topLikedArticles.map((art, idx) => /* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-start gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "truncate flex-1",
									children: art.title
								}), /* @__PURE__ */ jsx("span", {
									className: "font-bold text-pink-400 dark:text-pink-600",
									children: art.likes
								})]
							}, idx))
						})] }) : "No likes yet"
					},
					{
						icon: TrendingUp,
						label: "Engagement",
						value: `${stats.engagementRate || 0}%`,
						color: "amber"
					},
					{
						icon: Eye,
						label: "Lifetime",
						value: stats.totalViewsAllTime || 0,
						color: "blue"
					}
				].map((stat, i) => /* @__PURE__ */ jsx(motion.div, {
					variants: itemVariants,
					children: /* @__PURE__ */ jsx(StatCard, { ...stat })
				}, i))
			}),
			viewsPerDay && viewsPerDay.length > 0 && /* @__PURE__ */ jsxs(motion.div, {
				variants: itemVariants,
				className: "bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-primary/20 transition-colors backdrop-blur-md",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-1000" }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-center mb-6 relative z-10",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest",
							children: "Traffic Overview (14 Days)"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4 text-[10px] font-bold text-gray-500",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-primary" }), " Views"]
							}), /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-purple-500" }), " Unique"]
							})]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "h-64 w-full relative z-10",
						children: /* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ jsxs(AreaChart, {
								data: viewsPerDay,
								margin: {
									top: 0,
									right: 0,
									left: -20,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ jsxs("defs", { children: [/* @__PURE__ */ jsxs("linearGradient", {
										id: "colorViews",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ jsx("stop", {
											offset: "5%",
											stopColor: "rgb(var(--color-primary))",
											stopOpacity: .6
										}), /* @__PURE__ */ jsx("stop", {
											offset: "95%",
											stopColor: "rgb(var(--color-primary))",
											stopOpacity: 0
										})]
									}), /* @__PURE__ */ jsxs("linearGradient", {
										id: "colorVisitors",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ jsx("stop", {
											offset: "5%",
											stopColor: "#8b5cf6",
											stopOpacity: .5
										}), /* @__PURE__ */ jsx("stop", {
											offset: "95%",
											stopColor: "#8b5cf6",
											stopOpacity: 0
										})]
									})] }),
									/* @__PURE__ */ jsx(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "rgba(128,128,128,0.1)",
										vertical: false
									}),
									/* @__PURE__ */ jsx(XAxis, {
										dataKey: "date",
										stroke: "rgba(128,128,128,0.5)",
										fontSize: 10,
										tickMargin: 10
									}),
									/* @__PURE__ */ jsx(YAxis, {
										stroke: "rgba(128,128,128,0.5)",
										fontSize: 10,
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}) }),
									/* @__PURE__ */ jsx(Area, {
										type: "monotone",
										dataKey: "views",
										stroke: "rgb(var(--color-primary))",
										strokeWidth: 3,
										fillOpacity: 1,
										fill: "url(#colorViews)",
										animationDuration: 1500
									}),
									/* @__PURE__ */ jsx(Area, {
										type: "monotone",
										dataKey: "visitors",
										stroke: "#8b5cf6",
										strokeWidth: 3,
										fillOpacity: 1,
										fill: "url(#colorVisitors)",
										animationDuration: 1500
									})
								]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: [deviceData.length > 0 && /* @__PURE__ */ jsxs(motion.div, {
					variants: itemVariants,
					className: "bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 backdrop-blur-md",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-8",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest",
							children: "Device Breakdown"
						}), /* @__PURE__ */ jsxs("span", {
							className: "text-[9px] font-bold text-gray-500 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md",
							children: [totalDeviceViews.toLocaleString(), " hits"]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-8",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-32 h-32 flex-shrink-0",
							children: /* @__PURE__ */ jsx(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ jsx(PieChart, { children: /* @__PURE__ */ jsx(Pie, {
									data: deviceData,
									cx: "50%",
									cy: "50%",
									innerRadius: 35,
									outerRadius: 60,
									paddingAngle: 4,
									dataKey: "value",
									animationDuration: 1e3,
									children: deviceData.map((entry) => /* @__PURE__ */ jsx(Cell, { fill: DEVICE_COLORS[entry.name] || "#6b7280" }, entry.name))
								}) })
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "flex-1 space-y-4",
							children: deviceData.map((d) => {
								const Icon = DEVICE_ICONS[d.name] || Monitor;
								const pct = totalDeviceViews > 0 ? (d.value / totalDeviceViews * 100).toFixed(1) : 0;
								return /* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between group",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("div", {
											className: "p-1.5 rounded-lg bg-black/5 dark:bg-white/5 group-hover:scale-110 transition-transform",
											style: { color: DEVICE_COLORS[d.name] || "#6b7280" },
											children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" })
										}), /* @__PURE__ */ jsx("span", {
											className: "text-xs text-gray-600 dark:text-gray-400 font-bold",
											children: d.name
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-16 h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden",
											children: /* @__PURE__ */ jsx(motion.div, {
												initial: { width: 0 },
												animate: { width: `${Math.max(pct, 2)}%` },
												transition: {
													duration: 1,
													delay: .5
												},
												className: "h-full rounded-full",
												style: { backgroundColor: DEVICE_COLORS[d.name] || "#6b7280" }
											})
										}), /* @__PURE__ */ jsxs("span", {
											className: "text-[10px] font-black text-gray-500 w-8 text-right",
											children: [pct, "%"]
										})]
									})]
								}, d.name);
							})
						})]
					})]
				}), hourlyTraffic && hourlyTraffic.length > 0 && /* @__PURE__ */ jsxs(motion.div, {
					variants: itemVariants,
					className: "bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 backdrop-blur-md",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6",
						children: "Traffic by Hour (24h)"
					}), /* @__PURE__ */ jsx("div", {
						className: "h-44",
						children: /* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ jsxs(BarChart, {
								data: hourlyTraffic,
								margin: {
									top: 0,
									right: 0,
									left: -20,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ jsx(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "rgba(128,128,128,0.05)",
										vertical: false
									}),
									/* @__PURE__ */ jsx(XAxis, {
										dataKey: "hour",
										stroke: "rgba(128,128,128,0.4)",
										fontSize: 9,
										tickMargin: 8,
										interval: 2
									}),
									/* @__PURE__ */ jsx(YAxis, {
										stroke: "rgba(128,128,128,0.4)",
										fontSize: 9,
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ jsx(Tooltip, {
										content: /* @__PURE__ */ jsx(CustomTooltip, {}),
										cursor: { fill: "rgba(128,128,128,0.1)" }
									}),
									/* @__PURE__ */ jsx(Bar, {
										dataKey: "views",
										fill: "rgb(var(--color-primary))",
										radius: [
											4,
											4,
											0,
											0
										],
										animationDuration: 1e3
									})
								]
							})
						})
					})]
				})]
			}),
			crawlerDetails && crawlerDetails.length > 0 && /* @__PURE__ */ jsxs(motion.div, {
				variants: itemVariants,
				className: "bg-orange-500/5 border border-orange-500/20 rounded-3xl p-8 relative overflow-hidden backdrop-blur-md",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-[80px] rounded-full animate-pulse" }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-8",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center",
								children: /* @__PURE__ */ jsx(Shield, { className: "w-5 h-5 text-orange-500" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "text-xs font-black text-orange-500 uppercase tracking-[0.2em]",
								children: "Crawler Intelligence"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-[10px] text-orange-500/70 font-bold mt-1",
								children: "Who's indexing your content (7d)"
							})] })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "text-right",
							children: [/* @__PURE__ */ jsx("div", {
								className: "text-2xl font-black text-orange-500",
								children: botViews.toLocaleString()
							}), /* @__PURE__ */ jsx("div", {
								className: "text-[9px] font-bold text-orange-500/70 uppercase tracking-widest mt-1",
								children: "Bot Hits"
							})]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4",
						children: crawlerDetails.map((c, i) => /* @__PURE__ */ jsxs(motion.div, {
							whileHover: { scale: 1.05 },
							className: "bg-orange-500/10 border border-orange-500/20 rounded-2xl px-5 py-4 hover:border-orange-500/40 transition-colors",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "text-[11px] font-bold text-orange-500/80 truncate",
									children: c.crawler
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-xl font-black text-orange-500 mt-2",
									children: c.hits
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-[8px] text-orange-500/60 font-bold uppercase tracking-widest mt-1",
									children: "hits"
								})
							]
						}, i))
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [topReferrers && topReferrers.length > 0 && /* @__PURE__ */ jsxs(motion.div, {
					variants: itemVariants,
					className: "bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-8 backdrop-blur-md",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-8",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.3em]",
							children: "Traffic Sources"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg",
							children: "Last 7 Days"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-4",
						children: topReferrers.map((ref, i) => {
							const Icon = REFERRER_ICONS[ref.type] || Globe;
							const color = REFERRER_COLORS[ref.type] || "#6b7280";
							return /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between group",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
										style: { backgroundColor: `${color}15` },
										children: /* @__PURE__ */ jsx(Icon, {
											className: "w-4 h-4",
											style: { color }
										})
									}), /* @__PURE__ */ jsx("span", {
										className: "text-sm font-bold text-gray-800 dark:text-gray-200 capitalize",
										children: ref.source
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-xs font-black text-gray-500 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md",
										children: ref.type
									}), /* @__PURE__ */ jsx("div", {
										className: "w-12 text-right text-sm font-black text-gray-900 dark:text-white",
										children: ref.views.toLocaleString()
									})]
								})]
							}, i);
						})
					})]
				}), topPages && topPages.length > 0 && /* @__PURE__ */ jsxs(motion.div, {
					variants: itemVariants,
					className: "bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-8 backdrop-blur-md",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-8",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.3em]",
							children: "Top Entry Pages"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg",
							children: "Last 7 Days"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-4",
						children: topPages.map((page, i) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between group hover:bg-black/5 dark:hover:bg-white/5 -mx-4 px-4 py-2 rounded-xl transition-colors cursor-pointer",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4 min-w-0",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs font-black text-gray-300 dark:text-white/20 w-4 font-mono",
									children: i + 1
								}), /* @__PURE__ */ jsx("a", {
									href: page.path,
									target: "_blank",
									rel: "noreferrer",
									className: "text-sm font-bold text-gray-600 dark:text-gray-300 truncate hover:text-primary transition-colors",
									children: page.path === "/" ? "/ (Home)" : page.path
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "text-sm font-black text-gray-900 dark:text-white flex-shrink-0 ml-4",
								children: page.views.toLocaleString()
							})]
						}, i))
					})]
				})]
			}),
			/* @__PURE__ */ jsxs(motion.div, {
				variants: itemVariants,
				className: "bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-8 backdrop-blur-md",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between mb-8",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.3em]",
						children: "Viral Content (Last 7 Days)"
					}), /* @__PURE__ */ jsx("div", {
						className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg",
						children: "By Total Hits"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-2",
					children: topArticles && topArticles.length > 0 ? topArticles.map((article, i) => /* @__PURE__ */ jsxs(motion.div, {
						whileHover: {
							scale: 1.01,
							x: 5
						},
						className: "flex items-center gap-6 group/row hover:bg-black/5 dark:hover:bg-white/5 -mx-4 px-4 py-4 rounded-2xl transition-all cursor-pointer",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-xl font-black text-gray-300 dark:text-white/10 w-8 text-center font-mono group-hover/row:text-primary transition-colors",
								children: String(i + 1).padStart(2, "0")
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ jsx("a", {
									href: `/article/${article.slug}`,
									target: "_blank",
									rel: "noreferrer",
									className: "block text-sm font-black text-gray-900 dark:text-white group-hover/row:text-primary transition-colors truncate tracking-tight mb-1",
									children: article.title
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-[9px] font-bold text-gray-500 uppercase tracking-widest",
									children: [article.unique_views, " unique views"]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-5 flex-shrink-0",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "text-right",
									children: [/* @__PURE__ */ jsx("div", {
										className: "text-sm font-black text-gray-900 dark:text-white",
										children: article.views?.toLocaleString()
									}), /* @__PURE__ */ jsx("div", {
										className: "text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5",
										children: "Hits"
									})]
								}), /* @__PURE__ */ jsx("div", {
									className: "w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-transparent group-hover/row:border-primary/20 group-hover/row:bg-primary/10 transition-colors",
									children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-gray-400 group-hover/row:text-primary transition-colors" })
								})]
							})
						]
					}, article.id)) : /* @__PURE__ */ jsxs("div", {
						className: "py-16 text-center",
						children: [/* @__PURE__ */ jsx(Newspaper, { className: "w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-4" }), /* @__PURE__ */ jsx("p", {
							className: "text-[11px] font-black text-gray-500 uppercase tracking-widest",
							children: "No signals detected yet"
						})]
					})
				})]
			}),
			stats.topLikedArticles && stats.topLikedArticles.length > 0 && /* @__PURE__ */ jsxs(motion.div, {
				variants: itemVariants,
				className: "bg-gradient-to-br from-pink-500/5 to-rose-500/5 border border-pink-500/20 dark:border-pink-500/30 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(236,72,153,0.15),transparent_50%)] pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-50" }),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-between mb-8 relative z-10",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.4)]",
								children: /* @__PURE__ */ jsx(Heart, { className: "w-6 h-6 text-white drop-shadow-md" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "text-[13px] font-black text-pink-500 uppercase tracking-[0.25em]",
								children: "Reader Favorites"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1",
								children: "All-time highest engagement"
							})] })]
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "space-y-3 relative z-10",
						children: stats.topLikedArticles.map((article, i) => /* @__PURE__ */ jsxs(motion.div, {
							whileHover: {
								scale: 1.02,
								x: 5
							},
							className: "flex items-center gap-5 group/row hover:bg-white/60 dark:hover:bg-pink-500/10 p-4 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-pink-500/20 shadow-sm hover:shadow-md",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 font-black text-xs font-mono group-hover/row:bg-pink-500 group-hover/row:text-white transition-colors",
									children: i + 1
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex-1 min-w-0",
									children: /* @__PURE__ */ jsx("a", {
										href: `/article/${article.slug}`,
										target: "_blank",
										rel: "noreferrer",
										className: "block text-sm font-bold text-gray-800 dark:text-white group-hover/row:text-pink-600 dark:group-hover/row:text-pink-400 transition-colors truncate",
										children: article.title
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 bg-pink-500/5 px-3 py-1.5 rounded-lg border border-pink-500/10",
									children: [/* @__PURE__ */ jsx(Heart, { className: "w-3.5 h-3.5 text-pink-500 fill-pink-500" }), /* @__PURE__ */ jsx("span", {
										className: "text-sm font-black text-pink-600 dark:text-pink-400",
										children: article.likes?.toLocaleString()
									})]
								})
							]
						}, i))
					})
				]
			}),
			stats.adsenseProjection && /* @__PURE__ */ jsxs(motion.div, {
				variants: itemVariants,
				className: "bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/20 dark:border-emerald-500/30 rounded-3xl p-8 backdrop-blur-xl mt-6 relative overflow-hidden group/monetization",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none transition-opacity duration-700 group-hover/monetization:opacity-100 opacity-50" }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]",
								children: /* @__PURE__ */ jsx(DollarSign, { className: "w-6 h-6 text-white drop-shadow-md" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "text-[13px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em]",
								children: "Revenue Forecast"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-[10px] font-bold text-emerald-500/70 uppercase tracking-widest mt-1",
								children: "Google AdSense (30 Days)"
							})] })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest",
							children: [
								/* @__PURE__ */ jsx(Activity, { className: "w-3.5 h-3.5" }),
								"Volume: ",
								stats.adsenseProjection.views30d.toLocaleString()
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white/60 dark:bg-black/40 border border-emerald-500/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 mb-3",
										children: [/* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-gray-400" }), /* @__PURE__ */ jsx("div", {
											className: "text-[10px] font-black text-emerald-600/70 dark:text-emerald-500/60 uppercase tracking-widest",
											children: "Pessimistic"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "text-3xl font-black text-gray-800 dark:text-gray-200",
										children: ["$", stats.adsenseProjection.low.toFixed(2)]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-2",
										children: "RPM $1.50"
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-gradient-to-b from-emerald-500/10 to-teal-500/5 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden shadow-[0_8px_30px_rgba(16,185,129,0.1)] transform md:-translate-y-2 hover:-translate-y-3 transition-transform duration-300",
								children: [
									/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 blur-[50px] rounded-full pointer-events-none -mr-16 -mt-16" }),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between mb-3 relative z-10",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), /* @__PURE__ */ jsx("div", {
												className: "text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest",
												children: "Expected"
											})]
										}), /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-emerald-500" })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "text-4xl font-black text-emerald-700 dark:text-emerald-300 relative z-10",
										children: ["$", ((stats.adsenseProjection.low + stats.adsenseProjection.high) / 2).toFixed(2)]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "text-[9px] font-bold text-emerald-600/60 dark:text-emerald-400/60 uppercase tracking-widest mt-2 relative z-10",
										children: "Avg RPM $2.75"
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-white/60 dark:bg-black/40 border border-emerald-500/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 mb-3",
										children: [/* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-teal-400" }), /* @__PURE__ */ jsx("div", {
											className: "text-[10px] font-black text-emerald-600/70 dark:text-emerald-500/60 uppercase tracking-widest",
											children: "Optimistic"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "text-3xl font-black text-gray-800 dark:text-gray-200",
										children: ["$", stats.adsenseProjection.high.toFixed(2)]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-2",
										children: "RPM $4.00"
									})
								]
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
//#region resources/js/Components/RichEditor.jsx
var AIMenu = ({ editor }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);
	const [currentAction, setCurrentAction] = useState("");
	const menuRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) setIsOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside, true);
		return () => document.removeEventListener("mousedown", handleClickOutside, true);
	}, []);
	if (!editor) return null;
	const handleAction = async (actionId, label) => {
		setIsOpen(false);
		const { state } = editor;
		const { from, to } = state.selection;
		let selectedText = state.doc.textBetween(from, to, " ");
		if (!selectedText) {
			alert("Please highlight some text to use the AI tools.");
			return;
		}
		setIsGenerating(true);
		setCurrentAction(label);
		try {
			const resultHtml = (await axios.post("/api/editor-action", {
				action: actionId,
				text: selectedText
			})).data.result;
			if (actionId === "continue") editor.chain().focus().insertContentAt(to, `<p>${resultHtml}</p>`).run();
			else editor.chain().focus().deleteRange({
				from,
				to
			}).insertContentAt(from, resultHtml).run();
		} catch (error) {
			console.error("Error with AI Action", error);
			alert("AI action failed. Please try again.");
		} finally {
			setIsGenerating(false);
			setCurrentAction("");
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "relative z-[100]",
		ref: menuRef,
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: (e) => {
				e.preventDefault();
				e.stopPropagation();
				setIsOpen(!isOpen);
			},
			disabled: isGenerating,
			className: "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all flex items-center gap-2 disabled:opacity-50 pointer-events-auto",
			children: [
				isGenerating ? /* @__PURE__ */ jsx(Loader2, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsx(Sparkles, { className: "w-3 h-3" }),
				isGenerating ? currentAction : "AI Tools",
				!isGenerating && /* @__PURE__ */ jsx(ChevronDown, { className: "w-3 h-3 ml-1" })
			]
		}), isOpen && /* @__PURE__ */ jsxs("div", {
			className: "absolute top-full right-0 mt-2 w-56 bg-[#0a0f1c] border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-[110]",
			children: [/* @__PURE__ */ jsx("div", {
				className: "p-2 border-b border-gray-800 bg-gray-900/50",
				children: /* @__PURE__ */ jsx("span", {
					className: "text-[9px] font-black uppercase tracking-widest text-gray-500 px-2",
					children: "Highlight text first"
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col p-1",
				children: [
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => handleAction("continue", "Writing..."),
						className: "flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors text-left w-full pointer-events-auto",
						children: [/* @__PURE__ */ jsx(AlignLeft, { className: "w-4 h-4 text-primary" }), " Auto-Complete"]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => handleAction("summarize", "Summarizing..."),
						className: "flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors text-left w-full pointer-events-auto",
						children: [/* @__PURE__ */ jsx(FileEdit, { className: "w-4 h-4 text-purple-400" }), " Summarize Section"]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => handleAction("professional", "Refining..."),
						className: "flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors text-left w-full pointer-events-auto",
						children: [/* @__PURE__ */ jsx(Wand2, { className: "w-4 h-4 text-blue-400" }), " Make Professional"]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => handleAction("fix_grammar", "Correcting..."),
						className: "flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors text-left w-full pointer-events-auto",
						children: [/* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-400" }), " Fix Grammar"]
					})
				]
			})]
		})]
	});
};
var MenuBar = ({ editor }) => {
	if (!editor) return null;
	const btnClass = (active) => `p-2.5 rounded-xl transition-all pointer-events-auto ${active ? "bg-primary text-white shadow-[0_0_15px_rgba(43,124,238,0.3)]" : "text-gray-500 hover:text-white hover:bg-white/5"}`;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap gap-2 mb-6 p-2 bg-white/[0.03] rounded-2xl border border-white/5 backdrop-blur-xl items-center relative z-50",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-1 border-r border-white/10 pr-2",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => editor.chain().focus().undo().run(),
					disabled: !editor.can().undo(),
					className: "p-2 rounded-xl text-gray-500 hover:text-white disabled:opacity-30 pointer-events-auto",
					children: /* @__PURE__ */ jsx(Undo, { className: "w-4 h-4" })
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => editor.chain().focus().redo().run(),
					disabled: !editor.can().redo(),
					className: "p-2 rounded-xl text-gray-500 hover:text-white disabled:opacity-30 pointer-events-auto",
					children: /* @__PURE__ */ jsx(Redo, { className: "w-4 h-4" })
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-1 border-r border-white/10 pr-2",
				children: [
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => editor.chain().focus().toggleBold().run(),
						className: btnClass(editor.isActive("bold")),
						children: /* @__PURE__ */ jsx(Bold, { className: "w-4 h-4" })
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => editor.chain().focus().toggleItalic().run(),
						className: btnClass(editor.isActive("italic")),
						children: /* @__PURE__ */ jsx(Italic, { className: "w-4 h-4" })
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => editor.chain().focus().toggleStrike().run(),
						className: btnClass(editor.isActive("strike")),
						children: /* @__PURE__ */ jsx(Strikethrough, { className: "w-4 h-4" })
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-1 border-r border-white/10 pr-2",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
					className: btnClass(editor.isActive("heading", { level: 2 })),
					children: /* @__PURE__ */ jsx(Heading2, { className: "w-4 h-4" })
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
					className: btnClass(editor.isActive("heading", { level: 3 })),
					children: /* @__PURE__ */ jsx(Heading3, { className: "w-4 h-4" })
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-1 border-r border-white/10 pr-2",
				children: [
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => editor.chain().focus().toggleBulletList().run(),
						className: btnClass(editor.isActive("bulletList")),
						children: /* @__PURE__ */ jsx(List, { className: "w-4 h-4" })
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => editor.chain().focus().toggleOrderedList().run(),
						className: btnClass(editor.isActive("orderedList")),
						children: /* @__PURE__ */ jsx(ListOrdered, { className: "w-4 h-4" })
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => editor.chain().focus().toggleBlockquote().run(),
						className: btnClass(editor.isActive("blockquote")),
						children: /* @__PURE__ */ jsx(Quote, { className: "w-4 h-4" })
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => editor.chain().focus().toggleCodeBlock().run(),
						className: btnClass(editor.isActive("codeBlock")),
						children: /* @__PURE__ */ jsx(Code, { className: "w-4 h-4" })
					})
				]
			}),
			/* @__PURE__ */ jsx("div", { className: "flex-grow" }),
			/* @__PURE__ */ jsx(AIMenu, { editor })
		]
	});
};
function RichEditor({ initialContent, onChange, keyTrigger }) {
	const editor = useEditor({
		extensions: [StarterKit],
		editorProps: { attributes: { class: "prose prose-invert prose-p:text-gray-400 prose-headings:text-white prose-a:text-primary max-w-none focus:outline-none min-h-[400px] text-lg font-light leading-relaxed relative z-10" } },
		onUpdate: ({ editor }) => {
			onChange(editor.getJSON());
		}
	});
	useEffect(() => {
		if (editor && initialContent !== void 0) {
			let parsed;
			try {
				parsed = typeof initialContent === "string" && initialContent.startsWith("{") ? JSON.parse(initialContent) : initialContent;
			} catch (e) {
				parsed = initialContent;
			}
			editor.commands.setContent(parsed || "");
		}
	}, [editor, keyTrigger]);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative w-full",
		children: [/* @__PURE__ */ jsx(MenuBar, { editor }), /* @__PURE__ */ jsx("div", {
			className: "min-h-[500px] relative pointer-events-auto",
			children: /* @__PURE__ */ jsx(EditorContent, { editor })
		})]
	});
}
//#endregion
//#region resources/js/Components/GeminiUsage.jsx
var OP_LABELS = {
	"generate_draft": "Draft Gen",
	"generate_ideas": "Idea Scan",
	"generate_daily_brief": "Daily Brief",
	"generate_category_draft": "Category Draft",
	"generate_article_meta": "SEO Meta",
	"generate_seo": "SEO Gen",
	"generate_image_prompt": "Image Prompt",
	"regenerate_draft": "Re-Draft",
	"improve_content": "Content Polish",
	"studio_chat": "Studio Chat",
	"translate": "Translation",
	"openrouter_fallback": "OpenRouter Fallback",
	"unknown": "API Call"
};
var OP_COLORS = {
	"generate_draft": "#f97316",
	"generate_ideas": "#8b5cf6",
	"generate_daily_brief": "#06b6d4",
	"generate_category_draft": "#22c55e",
	"generate_article_meta": "#eab308",
	"studio_chat": "#ec4899",
	"translate": "#3b82f6",
	"openrouter_fallback": "#f43f5e"
};
function GeminiUsage({ usageData, modelDistribution }) {
	if (!usageData || usageData.length === 0) return /* @__PURE__ */ jsxs("div", {
		className: "bg-white/[0.02] border border-white/5 rounded-3xl p-10 text-center",
		children: [
			/* @__PURE__ */ jsx(Cpu, { className: "w-12 h-12 text-gray-700 mx-auto mb-4" }),
			/* @__PURE__ */ jsx("h3", {
				className: "text-xl font-black text-white",
				children: "No API Logs Yet"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-gray-500 mt-2",
				children: "AI usage metrics will appear here once stories are generated."
			})
		]
	});
	const chartData = (modelDistribution || []).sort((a, b) => b.tokens - a.tokens);
	const totalTokens = chartData.reduce((s, d) => s + d.tokens, 0);
	const totalCost = chartData.reduce((s, d) => s + (d.cost || 0), 0);
	const totalRequests = chartData.reduce((s, d) => s + (d.requests || 0), 0);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 mt-12",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
				className: "text-[10px] font-black text-orange-400 uppercase tracking-[0.3em] mb-2",
				children: "Compute Consumption"
			}), /* @__PURE__ */ jsx("h2", {
				className: "text-3xl font-black tracking-tighter text-white",
				children: "AI Engine."
			})] }), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "px-4 py-2 bg-white/5 border border-white/10 rounded-xl",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-[9px] font-bold text-gray-500 uppercase",
							children: "Requests"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-sm font-black text-white",
							children: totalRequests.toLocaleString()
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "px-4 py-2 bg-white/5 border border-white/10 rounded-xl",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-[9px] font-bold text-gray-500 uppercase",
							children: "Tokens"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-sm font-black text-orange-400",
							children: totalTokens.toLocaleString()
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-xl",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-[9px] font-bold text-orange-400/60 uppercase",
							children: "Est. Cost"
						}), /* @__PURE__ */ jsxs("div", {
							className: "text-sm font-black text-orange-400",
							children: ["$", totalCost.toFixed(4)]
						})]
					})
				]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500/20 transition-colors",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none opacity-20" }),
					/* @__PURE__ */ jsx("h4", {
						className: "text-xs font-black text-gray-500 uppercase tracking-widest mb-8",
						children: "Token Distribution by Model"
					}),
					chartData.length > 0 ? /* @__PURE__ */ jsx("div", {
						className: "h-64 w-full",
						children: /* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ jsxs(BarChart, {
								data: chartData,
								layout: "vertical",
								margin: {
									left: 80,
									right: 40
								},
								children: [
									/* @__PURE__ */ jsx(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "rgba(255,255,255,0.03)",
										horizontal: false
									}),
									/* @__PURE__ */ jsx(XAxis, {
										type: "number",
										hide: true
									}),
									/* @__PURE__ */ jsx(YAxis, {
										dataKey: "model",
										type: "category",
										stroke: "rgba(255,255,255,0.4)",
										fontSize: 10,
										axisLine: false,
										tickLine: false,
										width: 80
									}),
									/* @__PURE__ */ jsx(Tooltip, {
										cursor: { fill: "rgba(255,255,255,0.02)" },
										contentStyle: {
											backgroundColor: "rgba(2, 4, 10, 0.95)",
											borderColor: "rgba(249,115,22,0.2)",
											borderRadius: "12px",
											color: "#fff",
											fontSize: 11
										},
										formatter: (value, name) => [value.toLocaleString(), name === "tokens" ? "Tokens" : name]
									}),
									/* @__PURE__ */ jsx(Bar, {
										dataKey: "tokens",
										radius: [
											0,
											6,
											6,
											0
										],
										barSize: 30,
										children: chartData.map((entry, index) => {
											const colors = [
												"#f97316",
												"#8b5cf6",
												"#06b6d4",
												"#ec4899",
												"#22c55e",
												"#eab308"
											];
											return /* @__PURE__ */ jsx(Cell, { fill: colors[index % colors.length] }, `cell-${index}`);
										})
									})
								]
							})
						})
					}) : /* @__PURE__ */ jsx("div", {
						className: "h-64 flex items-center justify-center text-gray-600 text-sm",
						children: "No model data"
					}),
					chartData.length > 0 && /* @__PURE__ */ jsx("div", {
						className: "mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3",
						children: chartData.map((m, i) => {
							const colors = [
								"#f97316",
								"#8b5cf6",
								"#06b6d4",
								"#ec4899",
								"#22c55e",
								"#eab308"
							];
							return /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between bg-white/[0.02] rounded-xl px-4 py-2 border border-white/5",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-2 h-2 rounded-full",
										style: { backgroundColor: colors[i % colors.length] }
									}), /* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-bold text-gray-400 truncate",
										children: m.model
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 text-[9px] font-black",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "text-gray-500",
										children: [m.requests, " req"]
									}), /* @__PURE__ */ jsxs("span", {
										className: "text-orange-400",
										children: [m.percentage, "%"]
									})]
								})]
							}, i);
						})
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "bg-white/[0.02] border border-white/5 rounded-3xl p-8",
				children: [/* @__PURE__ */ jsx("h4", {
					className: "text-xs font-black text-gray-500 uppercase tracking-widest mb-6",
					children: "Recent Operations"
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-3",
					children: usageData.slice(0, 8).map((log, i) => {
						const opType = log.operation_type || "unknown";
						const label = OP_LABELS[opType] || opType.replace(/_/g, " ");
						const color = OP_COLORS[opType] || "#f97316";
						return /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between group hover:bg-white/[0.02] -mx-2 px-2 py-1.5 rounded-xl transition-all",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
									style: { backgroundColor: `${color}15` },
									children: /* @__PURE__ */ jsx(Layers, {
										className: "w-3 h-3",
										style: { color }
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx("div", {
										className: "text-[11px] font-bold text-gray-300 capitalize truncate",
										children: label
									}), /* @__PURE__ */ jsx("div", {
										className: "text-[8px] text-gray-600 font-bold uppercase tracking-wider truncate",
										children: log.model_name || "unknown"
									})]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-right flex-shrink-0 ml-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "text-[10px] font-black text-orange-400",
									children: [(log.total_tokens || 0).toLocaleString(), " tkn"]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1 justify-end",
									children: [log.cost_estimate > 0 && /* @__PURE__ */ jsxs("span", {
										className: "text-[8px] text-gray-600 font-bold",
										children: ["$", log.cost_estimate.toFixed(5)]
									}), /* @__PURE__ */ jsx("span", {
										className: "text-[8px] text-gray-700 font-bold",
										children: new Date(log.created_at).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit"
										})
									})]
								})]
							})]
						}, i);
					})
				})]
			})]
		})]
	});
}
//#endregion
//#region resources/js/Components/ScoutedQueue.jsx
function ScoutedQueue() {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isTriggering, setIsTriggering] = useState(false);
	const fetchQueue = async () => {
		setIsLoading(true);
		try {
			setItems((await axios.get("/api/scouted-queue?status=all")).data.data);
		} catch (error) {
			toast.error("Failed to load queue");
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchQueue();
	}, []);
	const handleApprove = async (id) => {
		try {
			setItems(items.map((item) => item.id === id ? {
				...item,
				status: "generating"
			} : item));
			await axios.post(`/api/scouted-queue/${id}/approve`);
			toast.success("Idea approved! Generating article in background.");
			fetchQueue();
		} catch (err) {
			toast.error(err?.response?.data?.error || "Failed to approve");
			fetchQueue();
		}
	};
	const handleDismiss = async (id) => {
		try {
			await axios.delete(`/api/scouted-queue/${id}`);
			toast.success("Idea dismissed");
			setItems(items.filter((item) => item.id !== id));
		} catch (err) {
			toast.error("Failed to dismiss");
		}
	};
	const handleTriggerScout = async () => {
		setIsTriggering(true);
		const loadingToast = toast.loading("Initializing Scout Agent radar...");
		try {
			const res = await axios.post("/api/scouted-queue/trigger");
			toast.success(res.data.message || "Scout triggered!", { id: loadingToast });
			setTimeout(fetchQueue, 5e3);
		} catch (err) {
			toast.error("Failed to trigger scout agent", { id: loadingToast });
		} finally {
			setIsTriggering(false);
		}
	};
	if (isLoading && items.length === 0) return /* @__PURE__ */ jsx("div", {
		className: "flex justify-center p-20",
		children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin text-primary" })
	});
	return /* @__PURE__ */ jsxs(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { duration: .5 },
		className: "flex-1 overflow-y-auto p-10 md:p-24 max-w-6xl mx-auto w-full",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-20",
			children: [
				/* @__PURE__ */ jsx("h3", {
					className: "text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4",
					children: "Editorial Desk"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-4",
					children: "Scout Action Queue."
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-gray-500 max-w-2xl",
					children: "Review AI-scouted news concepts. Approve them to send to the generator pipeline."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-10 p-8 rounded-3xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-xl relative overflow-hidden group",
					children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }), /* @__PURE__ */ jsxs("div", {
						className: "relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h4", {
							className: "text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(Radar, { className: `w-5 h-5 text-primary ${isTriggering ? "animate-spin" : ""}` }), "Want new ideas right now?"]
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-500",
							children: "Deploy the Scout Agent to scan the web for the latest breaking tech news."
						})] }), /* @__PURE__ */ jsxs("button", {
							onClick: handleTriggerScout,
							disabled: isTriggering,
							className: "px-8 py-4 bg-primary hover:bg-primary/90 text-black font-bold rounded-2xl shadow-[0_0_20px_rgba(var(--color-primary),0.2)] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.4)] transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap",
							children: [isTriggering ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsx(Radar, { className: "w-5 h-5" }), isTriggering ? "SCANNING WEB..." : "SCAN THE WEB NOW"]
						})]
					})]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 gap-6",
			children: /* @__PURE__ */ jsx(AnimatePresence, {
				mode: "popLayout",
				children: items.length === 0 ? /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						scale: .95
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: .95
					},
					className: "text-center py-32 border border-dashed border-gray-200 dark:border-white/10 rounded-[3rem] relative overflow-hidden",
					children: [
						/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--color-primary),0.05)_0%,transparent_70%)]" }),
						/* @__PURE__ */ jsx(Radar, { className: "w-16 h-16 mx-auto text-primary/40 mb-6 animate-[pulse_3s_ease-in-out_infinite]" }),
						/* @__PURE__ */ jsx("h3", {
							className: "text-2xl font-bold text-gray-900 dark:text-white mb-2",
							children: "Radar is Clear"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-gray-500",
							children: "No ideas currently pending. Wait for the agent or trigger a manual scan."
						})
					]
				}) : items.map((item, index) => /* @__PURE__ */ jsx(motion.div, {
					layout: true,
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0,
						transition: { delay: index * .05 }
					},
					exit: {
						opacity: 0,
						scale: .9,
						transition: { duration: .2 }
					},
					className: "p-6 md:p-8 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] border border-black/5 dark:border-white/5 rounded-3xl transition-all group relative overflow-hidden backdrop-blur-md",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col xl:flex-row xl:items-center justify-between gap-8 relative z-10",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "font-black text-2xl tracking-tight text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors",
									children: item.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-base text-gray-500 dark:text-gray-400 mb-6 leading-relaxed line-clamp-2",
									children: item.prompt
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-3 text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest",
									children: [
										/* @__PURE__ */ jsxs("span", {
											className: `px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${item.status === "pending" ? "text-yellow-500 border-yellow-500/20 bg-yellow-500/5" : item.status === "generating" ? "text-primary border-primary/20 bg-primary/5 animate-pulse" : item.status === "published" ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" : "text-red-500 border-red-500/20 bg-red-500/5"}`,
											children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current" }), item.status]
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5",
											children: [
												/* @__PURE__ */ jsx(Globe, { className: "w-3.5 h-3.5" }),
												" ",
												item.source
											]
										}),
										item.url && /* @__PURE__ */ jsx("a", {
											href: item.url,
											target: "_blank",
											rel: "noreferrer",
											className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer",
											children: "Link"
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5",
											children: [
												/* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
												" ",
												new Date(item.created_at).toLocaleDateString()
											]
										})
									]
								}),
								item.status === "failed" && item.error_log && /* @__PURE__ */ jsx("div", {
									className: "mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs font-mono text-red-400 overflow-x-auto",
									children: item.error_log
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 w-full xl:w-auto shrink-0",
							children: [
								item.status === "pending" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("button", {
									onClick: () => handleDismiss(item.id),
									className: "flex-1 xl:flex-none px-6 py-5 bg-black/5 dark:bg-white/5 hover:bg-red-500/10 text-gray-500 hover:text-red-500 border border-transparent hover:border-red-500/20 rounded-2xl transition-all flex flex-col items-center justify-center gap-2 group/btn",
									children: [/* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5 group-hover/btn:scale-110 transition-transform" }), /* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-black uppercase tracking-widest hidden sm:block",
										children: "Dismiss"
									})]
								}), /* @__PURE__ */ jsxs("button", {
									onClick: () => handleApprove(item.id),
									className: "flex-1 xl:flex-none px-8 py-5 bg-primary/10 hover:bg-primary text-primary hover:text-black border border-primary/20 hover:border-primary rounded-2xl transition-all flex flex-col items-center justify-center gap-2 shadow-[0_0_20px_rgba(var(--color-primary),0.1)] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.3)] group/btn",
									children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 group-hover/btn:scale-110 transition-transform" }), /* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-black uppercase tracking-widest hidden sm:block",
										children: "Approve"
									})]
								})] }),
								item.status === "generating" && /* @__PURE__ */ jsxs("div", {
									className: "flex-1 xl:flex-none px-8 py-5 border border-primary/20 bg-primary/5 rounded-2xl flex flex-col items-center justify-center gap-2 text-primary w-full xl:w-32",
									children: [/* @__PURE__ */ jsx(Loader2, { className: "w-6 h-6 animate-spin" }), /* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-black uppercase tracking-widest",
										children: "Wait..."
									})]
								}),
								item.status === "published" && /* @__PURE__ */ jsxs("div", {
									className: "flex-1 xl:flex-none px-8 py-5 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl flex flex-col items-center justify-center gap-2 text-emerald-500 w-full xl:w-32",
									children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6" }), /* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-black uppercase tracking-widest",
										children: "Done"
									})]
								})
							]
						})]
					})
				}, item.id))
			})
		})]
	});
}
//#endregion
//#region resources/js/Pages/Dashboard.jsx
var WIZARD_STEPS = [
	"Discover",
	"Generate",
	"Review",
	"Publish"
];
function WizardView({ onComplete, onSwitchToEditor }) {
	const [step, setStep] = useState(0);
	const [ideas, setIdeas] = useState([]);
	const [selectedIdea, setSelectedIdea] = useState(null);
	const [customTitle, setCustomTitle] = useState("");
	const [draft, setDraft] = useState("");
	const [meta, setMeta] = useState({
		summary: "",
		meta_description: "",
		seo_keywords: "",
		tags: []
	});
	const [isLoading, setIsLoading] = useState(false);
	const [feedback, setFeedback] = useState("");
	const [showFeedback, setShowFeedback] = useState(false);
	const fetchIdeas = async () => {
		setIsLoading(true);
		try {
			setIdeas((await axios.get("/api/generate-ideas")).data.ideas || []);
			toast.success("Found trending stories!");
		} catch (err) {
			const msg = err?.response?.data?.error || "Could not fetch trending stories.";
			toast.error(msg);
		} finally {
			setIsLoading(false);
		}
	};
	const pickIdea = (idea) => {
		setSelectedIdea(idea);
		setStep(1);
		generateDraft(idea.title, idea.prompt);
	};
	const useCustomTitle = () => {
		if (!customTitle.trim()) return toast.error("Please type a topic first.");
		const idea = {
			title: customTitle,
			prompt: `Write an in-depth article about: ${customTitle}`
		};
		setSelectedIdea(idea);
		setStep(1);
		generateDraft(idea.title, idea.prompt);
	};
	const generateDraft = async (title, prompt) => {
		setIsLoading(true);
		setDraft("");
		try {
			const res = await axios.post("/api/generate-draft", {
				title,
				prompt
			});
			setDraft(res.data.draft || "");
			if (res.data.title) setSelectedIdea((prev) => ({
				...prev,
				title: res.data.title
			}));
			if (res.data.summary) setMeta((prev) => ({
				...prev,
				summary: res.data.summary,
				meta_description: res.data.summary.substring(0, 155),
				image_prompt: res.data.image_prompt || "",
				tags: res.data.category ? [res.data.category] : []
			}));
			setStep(2);
			toast.success("Article ready for review!");
		} catch (err) {
			const msg = err?.response?.data?.error || "Generation failed. Try again.";
			toast.error(msg);
			setStep(0);
		} finally {
			setIsLoading(false);
		}
	};
	const regenerate = async () => {
		setIsLoading(true);
		setShowFeedback(false);
		try {
			setDraft((await axios.post("/api/regenerate-draft", {
				title: selectedIdea.title,
				prompt: selectedIdea.prompt,
				feedback: feedback || "Make it better, more engaging.",
				previous_draft: draft
			})).data.draft || "");
			setFeedback("");
			toast.success("Regenerated!");
		} catch (err) {
			const msg = err?.response?.data?.error || "Regeneration failed.";
			toast.error(msg);
		} finally {
			setIsLoading(false);
		}
	};
	const approve = async () => {
		setIsLoading(true);
		try {
			const res = await axios.post("/api/generate-article-meta", {
				title: selectedIdea.title,
				content: draft
			});
			setMeta((prev) => ({
				...prev,
				...res.data.meta,
				summary: prev.summary || res.data.meta.summary
			}));
			setStep(3);
		} catch {
			setMeta((prev) => ({
				...prev,
				summary: prev.summary || draft.replace(/<[^>]*>/g, "").substring(0, 200),
				meta_description: prev.meta_description || draft.replace(/<[^>]*>/g, "").substring(0, 155),
				seo_keywords: "",
				tags: []
			}));
			setStep(3);
		} finally {
			setIsLoading(false);
		}
	};
	const publish = async () => {
		setIsLoading(true);
		try {
			const res = await axios.post("/articles", {
				title: selectedIdea.title,
				content: draft,
				is_published: true,
				is_editors_choice: true,
				meta_description: meta.meta_description,
				seo_keywords: meta.seo_keywords,
				ai_summary: meta.summary,
				tags: meta.tags || []
			});
			toast.success("🚀 Published! Your article is now live.");
			onComplete(res.data.article);
		} catch {
			toast.error("Publishing failed.");
		} finally {
			setIsLoading(false);
		}
	};
	const sanitizeForPreview = (html) => {
		if (!html) return "";
		let content = html;
		try {
			const parsed = JSON.parse(content);
			if (typeof parsed === "string") content = parsed;
		} catch {}
		content = content.replace(/\\\//g, "/").replace(/^"|"$/g, "");
		return content;
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 overflow-y-auto",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "sticky top-0 z-40 bg-white/80 dark:bg-[#02040a]/90 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 px-4 sm:px-10 py-6 transition-colors duration-500",
			children: [/* @__PURE__ */ jsx("div", {
				className: "max-w-3xl mx-auto flex items-center gap-2 sm:gap-3",
				children: WIZARD_STEPS.map((name, i) => /* @__PURE__ */ jsxs(React.Fragment, { children: [/* @__PURE__ */ jsxs("div", {
					className: `flex items-center gap-2 transition-all ${i < step ? "text-emerald-400" : i === step ? "text-primary" : "text-gray-700"}`,
					children: [/* @__PURE__ */ jsx("div", {
						className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${i < step ? "bg-emerald-500/20 border border-emerald-500/30" : i === step ? "bg-primary/20 border border-primary/30 shadow-lg shadow-primary/10" : "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"}`,
						children: i < step ? /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }) : i + 1
					}), /* @__PURE__ */ jsx("span", {
						className: "text-[10px] font-black uppercase tracking-widest hidden sm:block",
						children: name
					})]
				}), i < WIZARD_STEPS.length - 1 && /* @__PURE__ */ jsx("div", { className: `flex-1 h-[2px] rounded-full transition-all ${i < step ? "bg-emerald-500/30" : "bg-black/5 dark:bg-white/5"}` })] }, name))
			}), /* @__PURE__ */ jsx("div", {
				className: "absolute right-10 top-1/2 -translate-y-1/2",
				children: /* @__PURE__ */ jsx(ThemeToggle, {})
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "max-w-3xl mx-auto px-4 sm:px-10 py-10 sm:py-16",
			children: /* @__PURE__ */ jsxs(AnimatePresence, {
				mode: "wait",
				children: [
					step === 0 && /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -20
						},
						className: "space-y-10",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 text-primary mb-4",
									children: [/* @__PURE__ */ jsx(Newspaper, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-black uppercase tracking-[0.3em]",
										children: "Step 1 of 4"
									})]
								}),
								/* @__PURE__ */ jsx("h1", {
									className: "text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-3",
									children: "What's the story?"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-gray-500 text-lg",
									children: "Pick a trending topic or type your own idea."
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ jsx("input", {
									type: "text",
									value: customTitle,
									onChange: (e) => setCustomTitle(e.target.value),
									onKeyDown: (e) => e.key === "Enter" && useCustomTitle(),
									placeholder: "Type your own topic...",
									className: "flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-primary/50 outline-none transition-all placeholder-gray-700"
								}), /* @__PURE__ */ jsx("button", {
									onClick: useCustomTitle,
									className: "px-6 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-primary/80 transition-all shadow-lg shadow-primary/20",
									children: "Use This"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4 text-gray-600",
								children: [
									/* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-white/5" }),
									/* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-black uppercase tracking-widest",
										children: "or pick a trending story"
									}),
									/* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-white/5" })
								]
							}),
							ideas.length === 0 ? /* @__PURE__ */ jsx("button", {
								onClick: fetchIdeas,
								disabled: isLoading,
								className: "w-full py-8 rounded-3xl border-2 border-dashed border-white/10 hover:border-primary/30 transition-all flex flex-col items-center gap-4 group",
								children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-primary animate-spin" }), /* @__PURE__ */ jsx("span", {
									className: "text-sm font-bold text-gray-500",
									children: "Scanning TechCrunch, The Verge, Ars Technica, Hacker News..."
								})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
									/* @__PURE__ */ jsx("div", {
										className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform",
										children: /* @__PURE__ */ jsx(Search, { className: "w-8 h-8 text-primary" })
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-sm font-bold text-gray-400 group-hover:text-white transition-colors",
										children: "🔍 Find Trending Stories"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[10px] text-gray-700 font-bold uppercase tracking-widest",
										children: "Click to scan 4 news sources"
									})
								] })
							}) : /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "text-[10px] font-black text-gray-600 uppercase tracking-widest",
										children: [ideas.length, " angles found"]
									}), /* @__PURE__ */ jsxs("button", {
										onClick: fetchIdeas,
										disabled: isLoading,
										className: "text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors",
										children: [/* @__PURE__ */ jsx(RefreshCw, { className: `w-3 h-3 ${isLoading ? "animate-spin" : ""}` }), " Refresh"]
									})]
								}), ideas.map((idea, idx) => /* @__PURE__ */ jsxs("button", {
									onClick: () => pickIdea(idea),
									className: "w-full text-left p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-white/[0.05] transition-all group",
									children: [
										/* @__PURE__ */ jsx("h3", {
											className: "text-lg font-black text-white group-hover:text-primary transition-colors mb-2",
											children: idea.title
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm text-gray-500 leading-relaxed",
											children: idea.prompt
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "mt-4 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity",
											children: [
												/* @__PURE__ */ jsx(Wand2, { className: "w-3 h-3" }),
												" Click to generate article ",
												/* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
											]
										})
									]
								}, idx))]
							})
						]
					}, "discover"),
					step === 1 && /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -20
						},
						className: "flex flex-col items-center justify-center py-32 space-y-8",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center animate-pulse",
									children: /* @__PURE__ */ jsx(Wand2, { className: "w-12 h-12 text-primary" })
								}), /* @__PURE__ */ jsx("div", {
									className: "absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center animate-bounce",
									children: /* @__PURE__ */ jsx(Sparkles, { className: "w-3 h-3 text-white" })
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-center",
								children: [
									/* @__PURE__ */ jsx("h2", {
										className: "text-3xl font-black text-white mb-3",
										children: "Techy AI is writing..."
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-gray-500 text-sm",
										children: "Crafting a daily.dev-quality article on"
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "text-primary font-bold mt-1",
										children: [
											"\"",
											selectedIdea?.title,
											"\""
										]
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex gap-2",
								children: [
									0,
									1,
									2
								].map((i) => /* @__PURE__ */ jsx("div", {
									className: "w-3 h-3 rounded-full bg-primary/30 animate-bounce",
									style: { animationDelay: `${i * 150}ms` }
								}, i))
							})
						]
					}, "generating"),
					step === 2 && /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -20
						},
						className: "space-y-8",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 text-primary mb-4",
									children: [/* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-black uppercase tracking-[0.3em]",
										children: "Step 3 of 4"
									})]
								}),
								/* @__PURE__ */ jsx("h1", {
									className: "text-4xl md:text-5xl font-black tracking-tighter text-white mb-3",
									children: "Review your article"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-gray-500 text-lg",
									children: "Read through it. Approve to publish, or regenerate with feedback."
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ jsxs("button", {
									onClick: approve,
									disabled: isLoading,
									className: "flex-1 py-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black text-sm uppercase tracking-widest hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-3",
									children: [isLoading ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsx(ThumbsUp, { className: "w-5 h-5" }), "Approve & Continue"]
								}), /* @__PURE__ */ jsxs("button", {
									onClick: () => setShowFeedback(!showFeedback),
									className: "flex-1 py-5 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-black text-sm uppercase tracking-widest hover:bg-orange-500/20 transition-all flex items-center justify-center gap-3",
									children: [/* @__PURE__ */ jsx(RotateCcw, { className: "w-5 h-5" }), " Regenerate"]
								})]
							}),
							/* @__PURE__ */ jsx(AnimatePresence, { children: showFeedback && /* @__PURE__ */ jsx(motion.div, {
								initial: {
									height: 0,
									opacity: 0
								},
								animate: {
									height: "auto",
									opacity: 1
								},
								exit: {
									height: 0,
									opacity: 0
								},
								className: "overflow-hidden",
								children: /* @__PURE__ */ jsxs("div", {
									className: "p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10 space-y-4",
									children: [
										/* @__PURE__ */ jsx("h4", {
											className: "text-sm font-black text-orange-400 uppercase tracking-widest",
											children: "What should change?"
										}),
										/* @__PURE__ */ jsx("textarea", {
											value: feedback,
											onChange: (e) => setFeedback(e.target.value),
											placeholder: "e.g. 'Make it shorter', 'Focus more on React', 'Use a funnier tone'...",
											className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:border-orange-500/30 outline-none transition-all resize-none h-24"
										}),
										/* @__PURE__ */ jsxs("button", {
											onClick: regenerate,
											disabled: isLoading,
											className: "w-full py-3 rounded-xl bg-orange-500 text-white font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-2",
											children: [isLoading ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsx(Wand2, { className: "w-4 h-4" }), "Regenerate Now"]
										})
									]
								})
							}) }),
							/* @__PURE__ */ jsxs("div", {
								className: "rounded-3xl border border-white/10 overflow-hidden bg-white/[0.02]",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "px-8 py-6 border-b border-white/5 bg-white/[0.02]",
									children: [/* @__PURE__ */ jsx("h2", {
										className: "text-2xl font-black text-white tracking-tight",
										children: selectedIdea?.title
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-4 mt-2 text-[10px] font-black text-gray-600 uppercase tracking-widest",
										children: [
											/* @__PURE__ */ jsx("span", { children: "Preview" }),
											/* @__PURE__ */ jsx("span", { className: "w-1 h-1 bg-gray-800 rounded-full" }),
											/* @__PURE__ */ jsxs("span", { children: [Math.ceil((draft || "").split(" ").length / 200), " min read"] })
										]
									})]
								}), /* @__PURE__ */ jsx("div", {
									className: "px-8 py-8 prose prose-invert prose-primary max-w-none prose-p:text-gray-400 prose-p:font-light prose-p:leading-relaxed prose-headings:font-black prose-headings:text-white prose-strong:text-white prose-code:text-emerald-400 prose-pre:bg-white/[0.03] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl",
									children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: sanitizeForPreview(draft) } })
								})]
							}),
							/* @__PURE__ */ jsxs("button", {
								onClick: () => onSwitchToEditor(selectedIdea?.title || "", draft),
								className: "w-full py-3 rounded-xl text-gray-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ jsx(Edit3, { className: "w-3 h-3" }), " Open in Advanced Editor instead"]
							})
						]
					}, "review"),
					step === 3 && /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -20
						},
						className: "space-y-8",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 text-emerald-400 mb-4",
									children: [/* @__PURE__ */ jsx(Rocket, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-black uppercase tracking-[0.3em]",
										children: "Step 4 of 4"
									})]
								}),
								/* @__PURE__ */ jsx("h1", {
									className: "text-4xl md:text-5xl font-black tracking-tighter text-white mb-3",
									children: "Ready to publish!"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-gray-500 text-lg",
									children: "Review the details below and hit publish to go live."
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-6 p-8 rounded-3xl bg-white/[0.03] border border-white/10",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-2",
										children: "Title"
									}), /* @__PURE__ */ jsx("h2", {
										className: "text-2xl font-black text-white",
										children: selectedIdea?.title
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-2",
										children: "Summary"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-sm text-gray-400 leading-relaxed",
										children: meta.summary || "Auto-generated summary"
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-2",
										children: "SEO Description"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-gray-500",
										children: meta.meta_description || "Auto-generated"
									})] }),
									meta.tags && meta.tags.length > 0 && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-3",
										children: "Tags"
									}), /* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-2",
										children: meta.tags.map((tag, i) => /* @__PURE__ */ jsx("span", {
											className: "px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold",
											children: tag
										}, i))
									})] })
								]
							}),
							/* @__PURE__ */ jsxs("button", {
								onClick: publish,
								disabled: isLoading,
								className: "w-full py-6 rounded-2xl bg-gradient-to-r from-primary to-purple-600 text-white font-black text-lg uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3",
								children: [isLoading ? /* @__PURE__ */ jsx(Loader2, { className: "w-6 h-6 animate-spin" }) : /* @__PURE__ */ jsx(Rocket, { className: "w-6 h-6" }), "Publish to techynews.lat"]
							}),
							/* @__PURE__ */ jsxs("button", {
								onClick: () => setStep(2),
								className: "w-full py-3 rounded-xl text-gray-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "w-3 h-3" }), " Back to review"]
							})
						]
					}, "publish")
				]
			})
		})]
	});
}
function Dashboard({ auth, articles: initialArticles, analytics }) {
	const [articles, setArticles] = useState(initialArticles || []);
	const [title, setTitle] = useState("");
	const [richContent, setRichContent] = useState(null);
	const [isGenerating, setIsGenerating] = useState(false);
	const [currentArticleId, setCurrentArticleId] = useState(null);
	const [showMobileSidebar, setShowMobileSidebar] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [isPublished, setIsPublished] = useState(false);
	const [isEditorsChoice, setIsEditorsChoice] = useState(false);
	const [coverImage, setCoverImage] = useState("");
	const [imagePrompt, setImagePrompt] = useState("");
	const [metaDescription, setMetaDescription] = useState("");
	const [seoKeywords, setSeoKeywords] = useState("");
	const [aiSummary, setAiSummary] = useState("");
	const [tags, setTags] = useState([]);
	const [tagInput, setTagInput] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
	const [view, setView] = useState("wizard");
	const [editorResetKey, setEditorResetKey] = useState(0);
	const [chatMessages, setChatMessages] = useState([{
		role: "assistant",
		content: "Hello! I'm your Studio Assistant. How can I help you shape your narrative today? I can research trends, draft sections, or refine your copy."
	}]);
	const [chatInput, setChatInput] = useState("");
	const [isChatLoading, setIsChatLoading] = useState(false);
	const chatEndRef = useRef(null);
	useEffect(() => {
		if (!title && !richContent) return;
		const delayBounceFn = setTimeout(() => {
			handleSave(true);
		}, 5e3);
		return () => clearTimeout(delayBounceFn);
	}, [
		title,
		richContent,
		isPublished,
		isEditorsChoice,
		coverImage,
		imagePrompt,
		tags,
		metaDescription,
		seoKeywords
	]);
	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chatMessages]);
	const handleSave = async (silent = false, overridePublished = null) => {
		if (!title && !richContent) return;
		setIsSaving(true);
		try {
			const payload = {
				title: title || "Untitled Story",
				content: typeof richContent === "string" ? richContent : JSON.stringify(richContent),
				is_published: overridePublished !== null ? overridePublished : isPublished,
				is_editors_choice: isEditorsChoice,
				cover_image_path: coverImage,
				image_prompt: imagePrompt,
				meta_description: metaDescription,
				seo_keywords: seoKeywords,
				ai_summary: aiSummary,
				tags
			};
			let res;
			if (currentArticleId) {
				res = await axios.put(`/articles/${currentArticleId}`, payload);
				setArticles((prev) => prev.map((a) => a.id === currentArticleId ? res.data.article : a));
			} else {
				res = await axios.post("/articles", payload);
				if (res.data.article && res.data.article.id) {
					setCurrentArticleId(res.data.article.id);
					setArticles((prev) => [res.data.article, ...prev]);
				}
			}
			if (!silent) toast.success("Narrative synced.");
		} catch (error) {
			if (!silent) toast.error("Sync failed.");
		} finally {
			setIsSaving(false);
		}
	};
	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!chatInput.trim() || isChatLoading) return;
		const userMessage = chatInput;
		setChatInput("");
		setChatMessages((prev) => [...prev, {
			role: "user",
			content: userMessage
		}]);
		setIsChatLoading(true);
		try {
			const history = chatMessages.map((m) => ({
				role: m.role,
				content: m.content
			}));
			const rawResponse = (await axios.post("/api/studio-chat", {
				message: userMessage,
				history,
				editor_context: {
					title,
					content: typeof richContent === "string" ? richContent : JSON.stringify(richContent)
				}
			})).data.response;
			let cleanMessage = rawResponse;
			try {
				const start = rawResponse.indexOf("{");
				const end = rawResponse.lastIndexOf("}");
				if (start !== -1 && end !== -1) {
					const jsonStr = rawResponse.substring(start, end + 1);
					const cmd = JSON.parse(jsonStr);
					if (cmd.update_editor) {
						applyEditorUpdate(cmd.update_editor);
						cleanMessage = cmd.message || "I've updated the editor for you.";
					}
				}
			} catch (e) {}
			setChatMessages((prev) => [...prev, {
				role: "assistant",
				content: cleanMessage
			}]);
		} catch (error) {
			toast.error("Assistant is currently unavailable.");
		} finally {
			setIsChatLoading(false);
		}
	};
	const applyEditorUpdate = (update) => {
		if (update.title) setTitle(update.title);
		if (update.content) {
			setRichContent(update.content);
			setEditorResetKey((prev) => prev + 1);
		}
		if (update.seo_description) setMetaDescription(update.seo_description);
		if (update.seo_keywords) setSeoKeywords(update.seo_keywords);
		toast.info("AI updated your draft.");
	};
	const pushToEditor = (content) => {
		if (confirm("Inject this into the editor?")) {
			setRichContent(content);
			setEditorResetKey((prev) => prev + 1);
			toast.success("Injected.");
		}
	};
	const handleEdit = (article) => {
		setCurrentArticleId(article.id);
		setTitle(article.title);
		let contentToSet;
		try {
			contentToSet = JSON.parse(article.content);
		} catch (e) {
			contentToSet = article.content;
		}
		setRichContent(contentToSet);
		setIsPublished(article.status === "published");
		setIsEditorsChoice(!!article.is_editors_choice);
		setCoverImage(article.cover_image_path || "");
		setImagePrompt(article.image_prompt || "");
		setMetaDescription(article.meta_description || "");
		setSeoKeywords(article.seo_keywords || "");
		setAiSummary(article.ai_summary || "");
		setTags(article.tags || []);
		setEditorResetKey((prev) => prev + 1);
		setView("editor");
	};
	const handleDelete = async (id) => {
		if (!confirm("Purge this narrative?")) return;
		try {
			await axios.delete(`/articles/${id}`);
			setArticles((prev) => prev.filter((a) => a.id !== id));
			if (currentArticleId === id) resetEditor();
			toast.success("Purged.");
		} catch (error) {
			toast.error("Purge failed.");
		}
	};
	const resetEditor = () => {
		setCurrentArticleId(null);
		setTitle("");
		setRichContent(null);
		setCoverImage("");
		setImagePrompt("");
		setTags([]);
		setIsPublished(false);
		setIsEditorsChoice(false);
		setMetaDescription("");
		setSeoKeywords("");
		setAiSummary("");
		setEditorResetKey((prev) => prev + 1);
	};
	const handleGenerateSEO = async () => {
		if (!richContent) return toast.error("No content.");
		setIsGenerating(true);
		try {
			const res = await axios.post("/api/generate-seo", { content: JSON.stringify(richContent) });
			setMetaDescription(res.data.description);
			setSeoKeywords(res.data.keywords);
			toast.success("SEO Optimized.");
		} catch (error) {
			toast.error("Failed.");
		} finally {
			setIsGenerating(false);
		}
	};
	const [isDragging, setIsDragging] = useState(false);
	const handleImageUpload = async (e) => {
		let file;
		if (e.type === "drop") {
			e.preventDefault();
			setIsDragging(false);
			file = e.dataTransfer.files?.[0];
		} else file = e.target.files?.[0];
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			toast.error("Please upload an image file.");
			return;
		}
		setIsUploading(true);
		const formData = new FormData();
		formData.append("image", file);
		try {
			setCoverImage((await axios.post("/upload-image", formData)).data.url);
			toast.success("Visual added.");
		} catch (error) {
			toast.error("Upload failed.");
		} finally {
			setIsUploading(false);
		}
	};
	const handleDragOver = (e) => {
		e.preventDefault();
		setIsDragging(true);
	};
	const handleDragLeave = () => {
		setIsDragging(false);
	};
	const handleWizardComplete = (article) => {
		if (article) setArticles((prev) => [article, ...prev]);
		setView("list");
	};
	const handleWizardToEditor = (wizardTitle, wizardDraft) => {
		resetEditor();
		setTitle(wizardTitle);
		setRichContent(wizardDraft);
		setEditorResetKey((prev) => prev + 1);
		setView("editor");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-white dark:bg-[#02040a] text-gray-900 dark:text-white flex overflow-hidden font-sans selection:bg-primary/30 transition-colors duration-500 relative",
		children: [
			/* @__PURE__ */ jsx(Head, { title: "AI Studio" }),
			/* @__PURE__ */ jsx(AnimatePresence, { children: showMobileSidebar && /* @__PURE__ */ jsx(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				onClick: () => setShowMobileSidebar(false),
				className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
			}) }),
			/* @__PURE__ */ jsxs("aside", {
				className: `fixed inset-y-0 left-0 transform ${showMobileSidebar ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 w-64 border-r border-black/5 dark:border-white/5 bg-white dark:bg-[#02040a] flex flex-col py-10 px-4 justify-between h-screen z-[70] transition-all duration-300 ease-in-out`,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "w-full flex-1 overflow-y-auto no-scrollbar",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-12 px-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0 shadow-2xl",
								children: /* @__PURE__ */ jsx(Zap, { className: "w-6 h-6 text-white" })
							}), /* @__PURE__ */ jsx("span", {
								className: "font-black text-lg tracking-tighter text-gray-900 dark:text-white uppercase",
								children: "STUDIO"
							})]
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setShowMobileSidebar(false),
							className: "md:hidden p-2 text-gray-400",
							children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
						})]
					}), /* @__PURE__ */ jsxs("nav", {
						className: "space-y-2 w-full mb-10",
						children: [
							/* @__PURE__ */ jsxs(Link, {
								href: "/",
								className: "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all group",
								children: [/* @__PURE__ */ jsx(Home, { className: "w-5 h-5 group-hover:text-primary" }), /* @__PURE__ */ jsx("span", {
									className: "hidden md:block font-bold text-xs uppercase tracking-widest",
									children: "Live View"
								})]
							}),
							/* @__PURE__ */ jsxs("button", {
								onClick: () => setView("wizard"),
								className: `flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full group text-left ${view === "wizard" ? "bg-primary/10 text-primary border border-primary/20" : "text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white"}`,
								children: [/* @__PURE__ */ jsx(Wand2, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
									className: "hidden md:block font-bold text-xs uppercase tracking-widest",
									children: "Quick Create"
								})]
							}),
							/* @__PURE__ */ jsxs("button", {
								onClick: () => setView("scout"),
								className: `flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full group text-left ${view === "scout" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white"}`,
								children: [/* @__PURE__ */ jsx(Globe, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
									className: "hidden md:block font-bold text-xs uppercase tracking-widest",
									children: "Scout Queue"
								})]
							}),
							/* @__PURE__ */ jsxs("button", {
								onClick: () => setView("list"),
								className: `flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full group text-left ${view === "list" ? "bg-primary/10 text-primary border border-primary/20" : "text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white"}`,
								children: [/* @__PURE__ */ jsx(Layout, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
									className: "hidden md:block font-bold text-xs uppercase tracking-widest",
									children: "Archives"
								})]
							}),
							/* @__PURE__ */ jsxs("button", {
								onClick: () => setView("analytics"),
								className: `flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full group text-left ${view === "analytics" ? "bg-primary/10 text-primary border border-primary/20" : "text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white"}`,
								children: [/* @__PURE__ */ jsx(BarChart2, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
									className: "hidden md:block font-bold text-xs uppercase tracking-widest",
									children: "Analytics"
								})]
							}),
							/* @__PURE__ */ jsxs("button", {
								onClick: () => {
									resetEditor();
									setView("editor");
								},
								className: `flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full group text-left ${view === "editor" && !currentArticleId ? "bg-primary/10 text-primary border border-primary/20" : "bg-black/5 dark:bg-white/5 text-black dark:text-white"}`,
								children: [/* @__PURE__ */ jsx(Edit3, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ jsx("span", {
									className: "hidden md:block font-bold text-xs uppercase tracking-widest",
									children: "Advanced Editor"
								})]
							})
						]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "px-4 py-6 border-t border-black/5 dark:border-white/5",
					children: /* @__PURE__ */ jsxs("div", {
						className: "bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border border-blue-500/10 dark:border-blue-500/20 rounded-2xl p-4 relative overflow-hidden group cursor-default",
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-[20px] -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-all duration-500" }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between mb-3 relative z-10",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "relative flex h-2 w-2",
										children: [/* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" }), /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-blue-500" })]
									}), /* @__PURE__ */ jsx("span", {
										className: "text-[8px] font-black text-blue-500 uppercase tracking-[0.2em]",
										children: "Engine Online"
									})]
								}), /* @__PURE__ */ jsx(Cpu, { className: "w-3.5 h-3.5 text-blue-500/50" })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative z-10",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-[8px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5",
									children: "Primary Inference Model"
								}), /* @__PURE__ */ jsx("h4", {
									className: "text-[11px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 truncate tracking-widest uppercase",
									children: "Gemini 2.0 Flash"
								})]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ jsxs("main", {
				id: "cascade",
				className: "flex-1 flex flex-col overflow-hidden relative",
				children: [/* @__PURE__ */ jsxs("header", {
					className: "md:hidden flex items-center justify-between px-6 h-16 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#02040a] z-40 shrink-0",
					children: [
						/* @__PURE__ */ jsx("button", {
							onClick: () => setShowMobileSidebar(true),
							className: "p-2 -ml-2 text-gray-600 dark:text-gray-400",
							children: /* @__PURE__ */ jsx(Home, { className: "w-6 h-6" })
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-[10px] font-black uppercase tracking-[0.2em]",
							children: view
						}),
						/* @__PURE__ */ jsx("div", { className: "w-10" }),
						" "
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex-1 flex flex-row overflow-hidden relative",
					children: [
						view === "scout" && /* @__PURE__ */ jsx(ScoutedQueue, {}),
						view === "wizard" && /* @__PURE__ */ jsx(WizardView, {
							onComplete: handleWizardComplete,
							onSwitchToEditor: handleWizardToEditor
						}),
						view === "list" && /* @__PURE__ */ jsxs("div", {
							className: "flex-1 overflow-y-auto p-10 md:p-24 max-w-6xl mx-auto w-full",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "mb-20",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4",
									children: "Central Archives"
								}), /* @__PURE__ */ jsx("h2", {
									className: "text-5xl font-black tracking-tighter text-gray-900 dark:text-white",
									children: "Narrative Repository."
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-1 gap-4",
								children: articles.map((article, i) => /* @__PURE__ */ jsxs("div", {
									onClick: () => handleEdit(article),
									className: "p-6 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl hover:border-primary/30 transition-all flex items-center justify-between group cursor-pointer",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-6",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-20 h-20 rounded-2xl bg-black overflow-hidden flex-shrink-0 border border-black/5 dark:border-white/10",
											children: article.cover_image_path && /* @__PURE__ */ jsx("img", {
												src: article.cover_image_path,
												className: "w-full h-full object-cover",
												alt: ""
											})
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
											className: "font-black text-xl text-gray-900 dark:text-white group-hover:text-primary transition-colors",
											children: article.title
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-5 text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase mt-1.5",
											children: [/* @__PURE__ */ jsx("span", {
												className: `px-2 py-0.5 rounded border ${article.status === "published" ? "text-primary border-primary/20 bg-primary/5" : "text-gray-400 border-black/5 dark:border-white/5"}`,
												children: article.status
											}), /* @__PURE__ */ jsxs("span", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
													" ",
													new Date(article.created_at).toLocaleDateString()
												]
											})]
										})] })]
									}), /* @__PURE__ */ jsx("button", {
										onClick: (e) => {
											e.stopPropagation();
											handleDelete(article.id);
										},
										className: "opacity-0 group-hover:opacity-100 p-4 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all",
										children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5" })
									})]
								}, article.id))
							})]
						}),
						view === "analytics" && /* @__PURE__ */ jsxs("div", {
							className: "flex-1 overflow-y-auto p-4 sm:p-10 md:p-24 max-w-6xl mx-auto w-full",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "mb-10 sm:mb-20",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4",
										children: "Live Metrics"
									}), /* @__PURE__ */ jsx("h2", {
										className: "text-4xl sm:text-5xl font-black tracking-tighter text-gray-900 dark:text-white",
										children: "Analytics."
									})]
								}),
								/* @__PURE__ */ jsx(AnalyticsChart, { analyticsData: analytics }),
								/* @__PURE__ */ jsx(GeminiUsage, {
									usageData: analytics.rawGeminiLogs,
									modelDistribution: analytics.geminiModelDistribution
								})
							]
						}),
						view === "editor" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
							className: "flex-1 flex flex-col border-r border-black/5 dark:border-white/5 overflow-y-auto no-scrollbar",
							children: [/* @__PURE__ */ jsxs("header", {
								className: "sticky top-0 z-40 bg-white/80 dark:bg-[#02040a]/80 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 px-10 h-20 flex items-center justify-between transition-colors duration-500",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-6",
									children: [/* @__PURE__ */ jsx("button", {
										onClick: () => setView("list"),
										className: "p-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl transition-all",
										children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5 text-gray-600 dark:text-gray-400" })
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col",
										children: [/* @__PURE__ */ jsx("h4", {
											className: "text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest",
											children: "Advanced Editor"
										}), /* @__PURE__ */ jsx("h2", {
											className: "text-sm font-black text-gray-900 dark:text-white truncate max-w-[200px]",
											children: title || "Untitled"
										})]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [
										/* @__PURE__ */ jsx(ThemeToggle, {}),
										/* @__PURE__ */ jsx("button", {
											onClick: handleGenerateSEO,
											className: "p-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl transition-all",
											title: "Optimize SEO",
											children: /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-purple-400" })
										}),
										/* @__PURE__ */ jsx("button", {
											onClick: () => {
												const next = !isPublished;
												setIsPublished(next);
												handleSave(false, next);
											},
											className: `px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isPublished ? "bg-red-500/10 text-red-500" : "bg-primary text-white shadow-xl shadow-primary/20"}`,
											children: isPublished ? "Retract" : "Broadcast"
										})
									]
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "p-10 md:p-16 max-w-4xl mx-auto w-full flex flex-col gap-10",
								children: /* @__PURE__ */ jsxs("div", {
									className: "space-y-6",
									children: [
										/* @__PURE__ */ jsx("input", {
											type: "text",
											placeholder: "Narrative Title.",
											className: "w-full bg-transparent border-none text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white placeholder-black/10 dark:placeholder-white/[0.03] focus:ring-0 p-0",
											value: title,
											onChange: (e) => setTitle(e.target.value)
										}),
										/* @__PURE__ */ jsxs("div", {
											className: `relative w-full rounded-3xl border-2 border-dashed overflow-hidden group transition-all duration-300 ${coverImage ? "border-transparent aspect-video" : isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] h-48 flex items-center justify-center cursor-pointer hover:border-black/20 dark:hover:border-white/20"}`,
											onClick: () => !coverImage && document.getElementById("cover-image-upload").click(),
											onDragOver: handleDragOver,
											onDragLeave: handleDragLeave,
											onDrop: handleImageUpload,
											children: [coverImage ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("img", {
												src: coverImage,
												className: "w-full h-full object-cover"
											}), /* @__PURE__ */ jsx("div", {
												className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
												children: /* @__PURE__ */ jsx("button", {
													onClick: (e) => {
														e.stopPropagation();
														setCoverImage("");
													},
													className: "p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform",
													children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5" })
												})
											})] }) : /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col items-center gap-2 pointer-events-none",
												children: [isUploading ? /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-primary animate-spin" }) : /* @__PURE__ */ jsx(Image, { className: `w-8 h-8 ${isDragging ? "text-primary" : "text-gray-800"}` }), /* @__PURE__ */ jsx("span", {
													className: `text-[10px] font-black uppercase ${isDragging ? "text-primary" : "text-gray-700"}`,
													children: isDragging ? "Drop to Upload" : "Cover Asset"
												})]
											}), /* @__PURE__ */ jsx("input", {
												type: "file",
												id: "cover-image-upload",
												className: "hidden",
												accept: "image/*",
												onChange: handleImageUpload
											})]
										}),
										/* @__PURE__ */ jsx(RichEditor, {
											initialContent: richContent,
											onChange: (val) => setRichContent(val),
											keyTrigger: editorResetKey
										})
									]
								})
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "w-[450px] flex flex-col bg-black/[0.01] dark:bg-white/[0.01] relative",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-white dark:bg-[#02040a]/50",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx(MessageSquare, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ jsx("h3", {
											className: "font-black text-xs uppercase tracking-widest",
											children: "Studio Assistant"
										})]
									}), /* @__PURE__ */ jsx(Cpu, {
										className: "w-4 h-4 text-gray-700",
										title: "Gemini Session"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar",
									children: [
										chatMessages.map((msg, idx) => /* @__PURE__ */ jsxs("div", {
											className: `flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`,
											children: [/* @__PURE__ */ jsx("div", {
												className: `max-w-[95%] p-4 rounded-2xl text-xs leading-relaxed transition-all duration-300 ${msg.role === "user" ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-black/5 dark:bg-white/5 text-gray-900 dark:text-gray-300 border border-black/5 dark:border-white/5"}`,
												children: msg.role === "assistant" ? /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: msg.content.replace(/\n/g, "<br/>") } }) : /* @__PURE__ */ jsx("p", { children: msg.content })
											}), msg.role === "assistant" && msg.content.length > 100 && /* @__PURE__ */ jsxs("button", {
												onClick: () => pushToEditor(msg.content),
												className: "mt-2 flex items-center gap-2 text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors px-2",
												children: [/* @__PURE__ */ jsx(Copy, { className: "w-3 h-3" }), " Push result to editor"]
											})]
										}, idx)),
										isChatLoading && /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3 text-gray-600 animate-pulse",
											children: [/* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }), /* @__PURE__ */ jsx("span", {
												className: "text-[10px] font-black uppercase tracking-widest",
												children: "Analyzing context..."
											})]
										}),
										/* @__PURE__ */ jsx("div", { ref: chatEndRef })
									]
								}),
								/* @__PURE__ */ jsxs("form", {
									onSubmit: handleSendMessage,
									className: "p-6 bg-white dark:bg-[#02040a] border-t border-black/5 dark:border-white/5 transition-colors duration-500",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "relative group",
										children: [/* @__PURE__ */ jsx("input", {
											type: "text",
											value: chatInput,
											onChange: (e) => setChatInput(e.target.value),
											placeholder: "Command your assistant...",
											className: "w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl pl-6 pr-14 py-4 text-xs font-bold text-gray-900 dark:text-white focus:border-primary/50 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-700"
										}), /* @__PURE__ */ jsx("button", {
											type: "submit",
											disabled: isChatLoading,
											className: "absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-50",
											children: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" })
										})]
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[8px] text-gray-400 dark:text-gray-700 font-bold uppercase mt-3 text-center tracking-widest",
										children: "Multi-turn journalistic session active"
									})]
								})
							]
						})] })
					]
				})]
			}),
			/* @__PURE__ */ jsx(RagCopilot, {})
		]
	});
}
//#endregion
export { Dashboard as default };
