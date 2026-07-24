import "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { i as Link_default, r as Head_default } from "../ssr.mjs";
import { n as motion, t as createLucideIcon } from "./createLucideIcon-DvhrQ9-F.mjs";
import { n as Globe, r as ArrowRight } from "./x-DGRKKDf6.mjs";
import { i as Radar, o as FileText, r as ShieldCheck, s as CircleCheck } from "./users-ClvImKtF.mjs";
import { n as ArrowUpRight, t as TrendingDown } from "./trending-down-8EgYda9T.mjs";
import { i as ChartColumn, t as StudioLayout } from "./StudioLayout-DGC9Ia7K.mjs";
import { t as CircleCheckBig } from "./circle-check-big-C5raxy2I.mjs";
import { t as Clock } from "./clock-sIiChPLd.mjs";
import { t as Eye } from "./eye-CM_jrNRo.mjs";
import { t as Heart } from "./heart-H89RX9xL.mjs";
import { t as Sparkles } from "./sparkles-CccfAaSL.mjs";
import { t as TrendingUp } from "./trending-up-ChlcGh_K.mjs";
import { t as Zap } from "./zap-Cm9uq65z.mjs";
//#region node_modules/lucide-react/dist/esm/icons/circle-alert.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleAlert = createLucideIcon("CircleAlert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]);
require_react();
var import_jsx_runtime = require_jsx_runtime();
function StudioIndex({ stats, activities, topArticles, systemStatus }) {
	const statCards = [
		{
			label: "PUBLISHED ARTICLES",
			value: stats.published_count,
			subValue: `${stats.draft_count} drafts pending`,
			icon: FileText,
			color: "primary"
		},
		{
			label: "PAGEVIEWS (7 DAYS)",
			value: stats.total_views_7d.toLocaleString(),
			trend: stats.views_growth,
			icon: Eye,
			color: "emerald"
		},
		{
			label: "ENGAGEMENT RATE",
			value: `${stats.engagement_rate}%`,
			subValue: "Likes per view",
			icon: Heart,
			color: "purple"
		},
		{
			label: "GEMINI AI COST (7D)",
			value: `$${stats.gemini_cost_7d}`,
			subValue: `${(stats.gemini_tokens_7d / 1e3).toFixed(1)}k tokens used`,
			icon: Zap,
			color: "amber"
		}
	];
	const quickActions = [
		{
			title: "New AI Draft",
			desc: "Generate or write a new piece",
			href: "/studio/articles/create",
			icon: Sparkles,
			color: "text-primary bg-primary/10 border-primary/20"
		},
		{
			title: "Scout Ideas",
			desc: "Scan web for breaking topics",
			href: "/studio/scout",
			icon: Radar,
			color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
		},
		{
			title: "Fact-Check Engine",
			desc: "Verify claims & auto-fix",
			href: "/studio/factcheck",
			icon: CircleCheck,
			color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
		},
		{
			title: "E-E-A-T Quality",
			desc: "Upgrade legacy content",
			href: "/studio/eeat",
			icon: ShieldCheck,
			color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
		},
		{
			title: "View Analytics",
			desc: "Detailed traffic & audience",
			href: "/studio/analytics",
			icon: ChartColumn,
			color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
		},
		{
			title: "Visit Live Site",
			desc: "Open techynews.lat",
			href: "/",
			external: true,
			icon: Globe,
			color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StudioLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: "Studio Dashboard" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 md:p-16 max-w-7xl mx-auto space-y-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }), "Central Command"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-5xl md:text-6xl font-black tracking-tighter text-white",
				children: "Dashboard."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
				children: statCards.map((card, i) => {
					const Icon = card.icon;
					const isPositive = card.trend && card.trend >= 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .4,
							delay: i * .08
						},
						className: "bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all backdrop-blur-md relative overflow-hidden group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" })
								}), card.trend !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${isPositive ? "text-emerald-400" : "text-rose-400"}`,
									children: [
										isPositive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-3 h-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "w-3 h-3" }),
										Math.abs(card.trend),
										"%"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-3xl font-black text-white tracking-tight mb-1",
								children: card.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
								children: card.label
							}),
							card.subValue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-medium text-gray-500 mt-1",
								children: card.subValue
							})
						]
					}, card.label);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-white/5 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5 text-primary" }), "Recent Activity"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link_default, {
							href: "/studio/articles",
							className: "text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1",
							children: ["All Articles ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3 h-3" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: activities.length > 0 ? activities.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4 p-3.5 rounded-2xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 mt-0.5",
								children: item.type === "article" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "w-4 h-4 text-emerald-400" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-bold text-white truncate",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 mt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${item.status === "published" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : item.status === "approved" ? "bg-primary/10 text-primary border border-primary/20" : "bg-white/5 text-gray-400 border border-white/5"}`,
											children: item.status
										}),
										item.fact_check_score && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[9px] font-bold text-amber-400",
											children: [
												"Score: ",
												item.fact_check_score,
												"%"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-medium text-gray-500",
											children: item.time
										})
									]
								})]
							})]
						}, `${item.type}-${item.id}-${idx}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-500 italic py-6 text-center",
							children: "No activity recorded yet."
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5 bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-white/5 pb-4",
						children: "Quick Actions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
						children: quickActions.map((action) => {
							const Icon = action.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(action.external ? "a" : Link_default, {
								href: action.href,
								target: action.external ? "_blank" : void 0,
								className: "p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all hover:-translate-y-0.5 group block",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `w-9 h-9 rounded-xl border flex items-center justify-center mb-3 ${action.color}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4.5 h-4.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "text-xs font-black uppercase tracking-wider text-white group-hover:text-primary transition-colors flex items-center gap-1",
										children: [action.title, action.external && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3 h-3 text-gray-500" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-medium text-gray-500 mt-1 line-clamp-1",
										children: action.desc
									})
								]
							}, action.title);
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-white/5 pb-4",
						children: "Top Performing Articles"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: topArticles.map((art, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-lg font-black text-gray-600 font-mono w-6",
									children: ["0", idx + 1]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
										href: `/article/${art.slug}`,
										target: "_blank",
										className: "text-xs font-bold text-white hover:text-primary transition-colors truncate block",
										children: art.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] font-medium text-gray-500 mt-0.5",
										children: ["Published ", new Date(art.updated_at).toLocaleDateString()]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-6 shrink-0 text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-black text-white block",
									children: art.views_count.toLocaleString()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-black uppercase tracking-widest text-gray-500",
									children: "Views"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-black text-purple-400 block",
									children: art.likes_count
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-black uppercase tracking-widest text-gray-500",
									children: "Likes"
								})] })]
							})]
						}, art.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6 flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-white/5 pb-4 mb-6",
						children: "System Engine Status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-4 h-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-white",
										children: "Gemini 2.0 Flash"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] font-medium text-gray-500",
										children: "Primary AI Engine"
									})] })]
								}), systemStatus.gemini_api ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-3 h-3" }), " Ready"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-[9px] font-black text-rose-400 uppercase tracking-widest bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-3 h-3" }), " Key Missing"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-4 h-4 text-purple-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-white",
										children: "OpenRouter"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] font-medium text-gray-500",
										children: "Fallback Provider"
									})] })]
								}), systemStatus.openrouter_fallback ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20",
									children: "Active"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded",
									children: "Disabled"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-white",
										children: "Scout Pipeline"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[9px] font-medium text-gray-500",
										children: [systemStatus.scout_pending, " pending concepts"]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
									href: "/studio/scout",
									className: "text-[9px] font-black text-primary uppercase tracking-widest hover:underline",
									children: "View Queue"
								})]
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-6 border-t border-white/5 text-[10px] font-mono text-gray-500 text-center uppercase tracking-widest",
						children: "TechyNews Studio v2.0 • Laravel 13"
					})]
				})]
			})
		]
	})] });
}
//#endregion
export { StudioIndex as default };
