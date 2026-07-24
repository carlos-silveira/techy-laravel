import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { l as axios, n as toast } from "../ssr.mjs";
import { n as motion } from "./createLucideIcon-DvhrQ9-F.mjs";
import { c as Activity, n as Terminal } from "./users-ClvImKtF.mjs";
import { t as Clock } from "./clock-sIiChPLd.mjs";
import { t as Play } from "./play-CgCJD6DK.mjs";
import { t as RefreshCw } from "./refresh-cw-e7IaOw7l.mjs";
import { t as Server } from "./server-C9y-GaMK.mjs";
import { t as Square } from "./square-BCv9jtHg.mjs";
//#region resources/js/Components/AgentControl.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AgentControl() {
	const [status, setStatus] = (0, import_react.useState)({
		logs: "",
		last_run: null
	});
	const [isRunning, setIsRunning] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("scout");
	const logsEndRef = (0, import_react.useRef)(null);
	const fetchStatus = async () => {
		try {
			setStatus((await axios.get("/api/agent/status")).data);
			if (logsEndRef.current) logsEndRef.current.scrollIntoView({ behavior: "smooth" });
		} catch (err) {
			console.error(err);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchStatus();
		let interval;
		if (isRunning) interval = setInterval(fetchStatus, 2e3);
		else interval = setInterval(fetchStatus, 1e4);
		return () => clearInterval(interval);
	}, [isRunning]);
	const runAgent = async () => {
		setIsRunning(true);
		toast.success(`Starting agent in ${mode} mode...`);
		try {
			await axios.post("/api/agent/run", {
				mode,
				limit: 10
			});
		} catch (err) {
			toast.error(err?.response?.data?.error || "Failed to start agent.");
			setIsRunning(false);
		}
	};
	const stopPolling = () => {
		setIsRunning(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "max-w-6xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-2xl font-black tracking-tighter text-gray-900 dark:text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "w-6 h-6 text-emerald-500" }), "AGENT CONTROL PANEL"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-gray-500 text-sm font-medium mt-1",
					children: "Monitor and manually trigger the autonomous news agent."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: mode,
							onChange: (e) => setMode(e.target.value),
							className: "bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-primary/50 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "scout",
								children: "Scout Mode (Find & Queue)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "autonomous",
								children: "Autonomous Mode (Draft & Publish)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: runAgent,
							disabled: isRunning,
							className: `flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg ${isRunning ? "bg-emerald-500/20 text-emerald-500 cursor-not-allowed" : "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-emerald-500/25 hover:-translate-y-0.5"}`,
							children: [isRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-4 h-4" }), isRunning ? "RUNNING..." : "EXECUTE NOW"]
						}),
						isRunning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: stopPolling,
							className: "flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-all border border-rose-500/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "w-4 h-4" }), "STOP"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-black/5 dark:bg-white/5 rounded-3xl p-6 border border-black/5 dark:border-white/5 relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full -mr-10 -mt-10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-6 h-6 text-emerald-500 mb-4 relative z-10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 relative z-10",
								children: "Agent Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-black text-gray-900 dark:text-white relative z-10",
								children: isRunning ? "Executing Cycle" : "Standby"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-black/5 dark:bg-white/5 rounded-3xl p-6 border border-black/5 dark:border-white/5 relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full -mr-10 -mt-10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-6 h-6 text-blue-500 mb-4 relative z-10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 relative z-10",
								children: "Last Run"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-black text-gray-900 dark:text-white relative z-10",
								children: status.last_run ? new Date(status.last_run).toLocaleString() : "Unknown"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-black/5 dark:bg-white/5 rounded-3xl p-6 border border-black/5 dark:border-white/5 relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full -mr-10 -mt-10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "w-6 h-6 text-purple-500 mb-4 relative z-10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 relative z-10",
								children: "Cron Schedule"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-black text-gray-900 dark:text-white relative z-10",
								children: "Every 4 Hours"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0D1117] border border-white/10 rounded-3xl overflow-hidden shadow-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#161B22] px-4 py-3 flex items-center justify-between border-b border-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "w-4 h-4 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-black tracking-widest uppercase text-gray-400",
							children: "Live Terminal Log"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-rose-500/80" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-amber-500/80" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-emerald-500/80" })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 h-[400px] overflow-y-auto overflow-x-auto font-mono text-xs text-gray-300 leading-relaxed custom-scrollbar",
					children: [status.logs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-max",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "whitespace-pre-wrap",
							children: status.logs
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-gray-500 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), "Awaiting agent logs..."]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: logsEndRef })]
				})]
			})
		]
	});
}
//#endregion
export { AgentControl as t };
