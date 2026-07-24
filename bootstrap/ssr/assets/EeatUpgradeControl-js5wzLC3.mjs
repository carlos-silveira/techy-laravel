import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { l as axios, n as toast } from "../ssr.mjs";
import { n as Terminal, r as ShieldCheck, s as CircleCheck } from "./users-ClvImKtF.mjs";
import { n as LoaderCircle } from "./search-Dmdq9eFk.mjs";
import { t as Play } from "./play-CgCJD6DK.mjs";
import { t as RefreshCw } from "./refresh-cw-e7IaOw7l.mjs";
import { t as TriangleAlert } from "./triangle-alert-CsrorP-C.mjs";
//#region resources/js/Components/EeatUpgradeControl.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EeatUpgradeControl() {
	const [status, setStatus] = (0, import_react.useState)({
		upgraded: 0,
		pending: 0,
		total: 0,
		percentage: 0
	});
	const [isLoadingStatus, setIsLoadingStatus] = (0, import_react.useState)(true);
	const [isTriggering, setIsTriggering] = (0, import_react.useState)(false);
	const [limit, setLimit] = (0, import_react.useState)(1);
	const [logs, setLogs] = (0, import_react.useState)("");
	const [isPolling, setIsPolling] = (0, import_react.useState)(false);
	const logsEndRef = (0, import_react.useRef)(null);
	const fetchStatus = async () => {
		try {
			setStatus((await axios.get("/api/eeat-upgrade/status")).data);
		} catch (error) {
			console.error("Failed to fetch EEAT status", error);
		} finally {
			setIsLoadingStatus(false);
		}
	};
	const fetchLogs = async () => {
		try {
			setLogs((await axios.get("/api/eeat-upgrade/logs")).data.logs);
		} catch (error) {}
	};
	(0, import_react.useEffect)(() => {
		fetchStatus();
	}, []);
	(0, import_react.useEffect)(() => {
		let interval;
		if (isPolling) {
			fetchLogs();
			interval = setInterval(() => {
				fetchLogs();
				fetchStatus();
			}, 3e3);
		}
		return () => clearInterval(interval);
	}, [isPolling]);
	(0, import_react.useEffect)(() => {
		logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [logs]);
	const handleTrigger = async () => {
		if (!confirm(`Are you sure you want to trigger the E-E-A-T upgrade for ${limit} article(s)? This will consume Gemini API tokens.`)) return;
		setIsTriggering(true);
		try {
			const res = await axios.post("/api/eeat-upgrade/trigger", { limit });
			toast.success(res.data.message);
			setIsPolling(true);
			setLogs("Starting process...");
			setTimeout(() => setIsPolling(false), 3e5);
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to trigger upgrade");
			setIsPolling(false);
		} finally {
			setIsTriggering(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1 overflow-y-auto bg-gray-50 dark:bg-[#02040a]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-0 z-40 bg-white/80 dark:bg-[#02040a]/90 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 px-4 sm:px-10 py-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-primary mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-black uppercase tracking-[0.3em]",
							children: "AdSense Recovery"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-black tracking-tighter text-gray-900 dark:text-white",
						children: "E-E-A-T Upgrades"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-gray-500 text-sm mt-1",
						children: "Transform legacy low-value content into high-quality journalism."
					})
				] })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-4xl mx-auto px-4 sm:px-10 py-10 space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl p-6 flex items-center justify-between shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1",
							children: "Upgraded (E-E-A-T)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-3xl font-black text-emerald-500",
							children: isLoadingStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-6 h-6 animate-spin" }) : status.upgraded
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-6 h-6 text-emerald-500" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl p-6 flex items-center justify-between shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1",
							children: "Pending Legacy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-3xl font-black text-orange-500",
							children: isLoadingStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-6 h-6 animate-spin" }) : status.pending
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-6 h-6 text-orange-500" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl p-6 flex items-center justify-between shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[10px] font-black uppercase tracking-widest text-gray-500",
									children: "Progress"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-bold text-gray-900 dark:text-white",
									children: [status.percentage, "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full h-3 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-emerald-500 rounded-full transition-all duration-1000",
									style: { width: `${status.percentage}%` }
								})
							})]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 border-b border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 dark:bg-transparent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 w-full sm:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-5 h-5 text-primary ml-1" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-black text-gray-900 dark:text-white",
							children: "Batch Upgrade Worker"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-500",
							children: "Triggers 'artisan news:upgrade-legacy' in background"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 w-full sm:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: limit,
							onChange: (e) => setLimit(Number(e.target.value)),
							className: "bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-primary/50",
							disabled: isTriggering || isPolling,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 1,
									children: "Batch of 1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 5,
									children: "Batch of 5"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 10,
									children: "Batch of 10"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 20,
									children: "Batch of 20"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleTrigger,
							disabled: isTriggering || isPolling,
							className: "flex-1 sm:flex-none px-6 py-3 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed",
							children: [isTriggering ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-4 h-4" }), "Run Batch"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 bg-[#0a0a0a] text-emerald-400 font-mono text-sm leading-relaxed overflow-x-auto relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-4 right-4 flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsPolling(!isPolling),
								className: `px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors ${isPolling ? "bg-red-500/20 text-red-400" : "bg-white/10 text-gray-400 hover:text-white"}`,
								children: isPolling ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3 h-3 animate-spin" }), " Stop Polling"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-3 h-3" }), " Live Tail"] })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-4 text-gray-500 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "w-4 h-4" }), " root@techynews:~# tail -f storage/logs/eeat_upgrade.log"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-h-[300px] max-h-[500px] overflow-y-auto whitespace-pre-wrap pl-2 border-l-2 border-white/5",
							children: [logs || "Waiting for process to start...", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: logsEndRef })]
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
export { EeatUpgradeControl as t };
