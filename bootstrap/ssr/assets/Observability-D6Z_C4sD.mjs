import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { l as axios, n as toast } from "../ssr.mjs";
import { n as motion, t as createLucideIcon } from "./createLucideIcon-DvhrQ9-F.mjs";
import { i as AnimatePresence } from "./x-DGRKKDf6.mjs";
import { c as Activity, n as Terminal, o as FileText, t as Users } from "./users-ClvImKtF.mjs";
import { t as RefreshCw } from "./refresh-cw-e7IaOw7l.mjs";
//#region node_modules/lucide-react/dist/esm/icons/target.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Target = createLucideIcon("Target", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "6",
		key: "1vlfrh"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}]
]);
//#endregion
//#region resources/js/Components/Observability.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Observability() {
	const [data, setData] = (0, import_react.useState)({
		stats: null,
		logs: []
	});
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const fetchData = async () => {
		setIsLoading(true);
		try {
			setData((await axios.get("/api/observability")).data);
		} catch (error) {
			toast.error("Failed to load observability data");
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchData();
		const interval = setInterval(fetchData, 3e4);
		return () => clearInterval(interval);
	}, []);
	const getLogColor = (level) => {
		switch (level) {
			case "ERROR": return "text-red-500";
			case "WARNING": return "text-yellow-500";
			case "DEBUG": return "text-blue-500";
			default: return "text-green-400";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8 h-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter",
					children: "Observability Hub"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gray-500 font-medium",
					children: "Real-time database and system execution logs."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: fetchData,
					disabled: isLoading,
					className: "p-3 bg-white dark:bg-[#0a0f1c] border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 transition-colors shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-5 h-5 ${isLoading ? "animate-spin text-primary" : "text-gray-600 dark:text-gray-400"}` })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						title: "Articles DB",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-5 h-5 text-blue-500" }),
						stats: [
							{
								label: "Total",
								value: data.stats?.articles_total || 0
							},
							{
								label: "Published",
								value: data.stats?.articles_published || 0,
								color: "text-green-500"
							},
							{
								label: "Drafts",
								value: data.stats?.articles_drafts || 0
							}
						],
						isLoading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						title: "Scout Queue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-5 h-5 text-purple-500" }),
						stats: [
							{
								label: "Total Scraped",
								value: data.stats?.scout_total || 0
							},
							{
								label: "Pending",
								value: data.stats?.scout_pending || 0,
								color: "text-yellow-500"
							},
							{
								label: "Generating",
								value: data.stats?.scout_generating || 0,
								color: "text-blue-500"
							}
						],
						isLoading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						title: "Queue Health",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-5 h-5 text-emerald-500" }),
						stats: [{
							label: "Completed",
							value: data.stats?.scout_completed || 0,
							color: "text-emerald-500"
						}, {
							label: "Failed",
							value: data.stats?.scout_failed || 0,
							color: "text-red-500"
						}],
						isLoading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						title: "Users",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-5 h-5 text-orange-500" }),
						stats: [{
							label: "Registered",
							value: data.stats?.users_total || 0
						}],
						isLoading
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-h-[400px] flex flex-col bg-[#0a0f1c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-12 border-b border-white/5 flex items-center px-4 justify-between bg-black/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "w-4 h-4 text-gray-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-black uppercase tracking-widest text-gray-400",
							children: "laravel.log"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex h-2 w-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] font-black uppercase tracking-widest text-emerald-500",
							children: "Tailing"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-x-auto overflow-y-auto p-4 custom-scrollbar",
					children: isLoading && data.logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-gray-500",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "w-4 h-4 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-mono",
								children: "Connecting to stream..."
							})]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-mono text-[11px] leading-relaxed w-max min-w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: data.logs.map((log, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: -10
							},
							animate: {
								opacity: 1,
								x: 0
							},
							className: "mb-1.5 flex gap-3 hover:bg-white/5 px-2 py-1 -mx-2 rounded transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gray-600 shrink-0 select-none",
									children: log.timestamp ? log.timestamp.split(" ")[1] : "----:--:--"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `shrink-0 w-16 font-bold ${getLogColor(log.level)}`,
									children: [
										"[",
										log.level,
										"]"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gray-300 break-all whitespace-pre-wrap max-w-full",
									children: log.message
								})
							]
						}, index)) }), data.logs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-gray-600 italic",
							children: "No logs found in laravel.log"
						})]
					})
				})]
			})
		]
	});
}
function StatCard({ title, icon, stats, isLoading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white dark:bg-[#0a0f1c] border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm relative overflow-hidden group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-6 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-2 bg-gray-100 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5",
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-black uppercase tracking-widest text-gray-500",
					children: title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3 relative z-10",
				children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium text-gray-600 dark:text-gray-400",
						children: s.label
					}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-8 h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-base font-black ${s.color || "text-gray-900 dark:text-white"}`,
						children: s.value.toLocaleString()
					})]
				}, i))
			})
		]
	});
}
//#endregion
export { Observability as t };
