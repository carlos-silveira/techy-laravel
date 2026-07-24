import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { l as axios, n as toast } from "../ssr.mjs";
import { n as motion, t as createLucideIcon } from "./createLucideIcon-DvhrQ9-F.mjs";
import { i as AnimatePresence, n as Globe } from "./x-DGRKKDf6.mjs";
import { i as Radar, s as CircleCheck } from "./users-ClvImKtF.mjs";
import { t as Clock } from "./clock-sIiChPLd.mjs";
import { n as LoaderCircle } from "./search-Dmdq9eFk.mjs";
import { t as Trash2 } from "./trash-2-B0-Sil0q.mjs";
//#region node_modules/lucide-react/dist/esm/icons/refresh-ccw.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var RefreshCcw = createLucideIcon("RefreshCcw", [
	["path", {
		d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "14sxne"
	}],
	["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}],
	["path", {
		d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",
		key: "1hlbsb"
	}],
	["path", {
		d: "M16 16h5v5",
		key: "ccwih5"
	}]
]);
//#endregion
//#region resources/js/Components/ScoutedQueue.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ScoutedQueue() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [isTriggering, setIsTriggering] = (0, import_react.useState)(false);
	const [observability, setObservability] = (0, import_react.useState)(null);
	const [logOutput, setLogOutput] = (0, import_react.useState)(null);
	const fetchQueue = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get("/api/scouted-queue?status=all");
			setItems(res.data.data);
			if (res.data.observability) setObservability(res.data.observability);
		} catch (error) {
			toast.error("Failed to load queue");
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
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
		setLogOutput(null);
		const loadingToast = toast.loading("Running Scout Agent... This might take 30-60 seconds.");
		try {
			const res = await axios.post("/api/scouted-queue/trigger");
			toast.success(res.data.message || "Scout scan completed!", { id: loadingToast });
			if (res.data.log) setLogOutput(res.data.log);
			fetchQueue();
		} catch (err) {
			toast.error("Failed to trigger scout agent", { id: loadingToast });
		} finally {
			setIsTriggering(false);
		}
	};
	if (isLoading && items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center p-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4",
					children: "Editorial Desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-4",
					children: "Scout Action Queue."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-gray-500 max-w-2xl",
					children: "Review AI-scouted news concepts. Approve them to send to the generator pipeline."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 p-8 rounded-3xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-xl relative overflow-hidden group",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: `w-5 h-5 text-primary ${isTriggering ? "animate-spin" : ""}` }), "Want new ideas right now?"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-gray-500 mb-4",
									children: "Deploy the Scout Agent to scan the web for the latest breaking tech news."
								}),
								observability && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										title: "Last run time",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-500" }),
											"Last: ",
											observability.last_run ? new Date(observability.last_run).toLocaleString() : "Never"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										title: "Next scheduled run",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5 text-blue-500" }),
											"Next: ",
											observability.next_run ? new Date(observability.next_run).toLocaleString() : "N/A"
										]
									})]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleTriggerScout,
								disabled: isTriggering,
								className: "px-8 py-4 bg-primary hover:bg-primary/90 text-black font-bold rounded-2xl shadow-[0_0_20px_rgba(var(--color-primary),0.2)] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.4)] transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap",
								children: [isTriggering ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "w-5 h-5" }), isTriggering ? "SCANNING WEB..." : "SCAN THE WEB NOW"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: logOutput && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								height: 0
							},
							animate: {
								opacity: 1,
								height: "auto"
							},
							exit: {
								opacity: 0,
								height: 0
							},
							className: "mt-6 pt-6 border-t border-black/5 dark:border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2",
								children: "Agent Execution Logs"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "bg-black dark:bg-[#02040a] text-green-400 p-4 rounded-xl text-[10px] overflow-x-auto max-h-64 whitespace-pre-wrap border border-white/5 font-mono",
								children: logOutput
							})]
						}) })
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "popLayout",
				children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--color-primary),0.05)_0%,transparent_70%)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "w-16 h-16 mx-auto text-primary/40 mb-6 animate-[pulse_3s_ease-in-out_infinite]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-2xl font-bold text-gray-900 dark:text-white mb-2",
							children: "Radar is Clear"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-gray-500",
							children: "No ideas currently pending. Wait for the agent or trigger a manual scan."
						})
					]
				}) : items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col xl:flex-row xl:items-center justify-between gap-8 relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-black text-2xl tracking-tight text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base text-gray-500 dark:text-gray-400 mb-6 leading-relaxed line-clamp-2",
									children: item.prompt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3 text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${item.status === "pending" ? "text-yellow-500 border-yellow-500/20 bg-yellow-500/5" : item.status === "generating" ? "text-primary border-primary/20 bg-primary/5 animate-pulse" : item.status === "published" ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" : "text-red-500 border-red-500/20 bg-red-500/5"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-current" }), item.status]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3.5 h-3.5" }),
												" ",
												item.source
											]
										}),
										item.url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: item.url,
											target: "_blank",
											rel: "noreferrer",
											className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer",
											children: "Link"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }),
												" ",
												new Date(item.created_at).toLocaleDateString()
											]
										})
									]
								}),
								item.status === "failed" && item.error_log && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs font-mono text-red-400 overflow-x-auto",
									children: item.error_log
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 w-full xl:w-auto shrink-0",
							children: [
								(item.status === "pending" || item.status === "failed") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleDismiss(item.id),
									className: "flex-1 xl:flex-none px-6 py-5 bg-black/5 dark:bg-white/5 hover:bg-red-500/10 text-gray-500 hover:text-red-500 border border-transparent hover:border-red-500/20 rounded-2xl transition-all flex flex-col items-center justify-center gap-2 group/btn",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-5 h-5 group-hover/btn:scale-110 transition-transform" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-black uppercase tracking-widest hidden sm:block",
										children: "Dismiss"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleApprove(item.id),
									className: "flex-1 xl:flex-none px-8 py-5 bg-primary/10 hover:bg-primary text-primary hover:text-black border border-primary/20 hover:border-primary rounded-2xl transition-all flex flex-col items-center justify-center gap-2 shadow-[0_0_20px_rgba(var(--color-primary),0.1)] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.3)] group/btn",
									children: [item.status === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { className: "w-5 h-5 group-hover/btn:scale-110 transition-transform" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5 group-hover/btn:scale-110 transition-transform" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-black uppercase tracking-widest hidden sm:block",
										children: item.status === "failed" ? "Retry" : "Approve"
									})]
								})] }),
								item.status === "generating" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 xl:flex-none px-8 py-5 border border-primary/20 bg-primary/5 rounded-2xl flex flex-col items-center justify-center gap-2 text-primary w-full xl:w-32",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-6 h-6 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-black uppercase tracking-widest",
										children: "Wait..."
									})]
								}),
								item.status === "published" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 xl:flex-none px-8 py-5 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl flex flex-col items-center justify-center gap-2 text-emerald-500 w-full xl:w-32",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-6 h-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
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
export { ScoutedQueue as t };
