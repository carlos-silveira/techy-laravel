import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { l as axios, n as toast } from "../ssr.mjs";
import { n as motion } from "./createLucideIcon-DvhrQ9-F.mjs";
import { c as Activity, r as ShieldCheck } from "./users-ClvImKtF.mjs";
import { n as LoaderCircle } from "./search-Dmdq9eFk.mjs";
import { t as PenLine } from "./pen-line-D1i8XjAI.mjs";
import { t as Play } from "./play-CgCJD6DK.mjs";
import { t as ShieldAlert } from "./shield-alert-CMkkVeGl.mjs";
import { n as ShieldX, t as WandSparkles } from "./wand-sparkles-COn9eH9D.mjs";
import { t as Square } from "./square-BCv9jtHg.mjs";
//#region resources/js/Components/FactCheckDashboard.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FactCheckDashboard({ setView, handleEdit }) {
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [queues, setQueues] = (0, import_react.useState)({
		needs_review: [],
		failed: []
	});
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [isActionLoading, setIsActionLoading] = (0, import_react.useState)(false);
	const [fixingIds, setFixingIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		fetchProgress();
		fetchQueues();
		const interval = setInterval(() => {
			fetchProgress();
			fetchQueues();
		}, 5e3);
		return () => clearInterval(interval);
	}, []);
	const fetchProgress = async () => {
		try {
			setProgress((await axios.get("/api/fact-check/backfill-progress")).data);
			setIsLoading(false);
		} catch (error) {
			console.error("Failed to fetch progress", error);
		}
	};
	const fetchQueues = async () => {
		try {
			setQueues((await axios.get("/api/fact-check/queues")).data);
		} catch (error) {
			console.error("Failed to fetch queues", error);
		}
	};
	const toggleBackfill = async (action) => {
		setIsActionLoading(true);
		try {
			const res = await axios.post("/api/fact-check/start-backfill", { action });
			toast.success(res.data.message);
			fetchProgress();
		} catch (error) {
			toast.error(error.response?.data?.message || "Action failed");
		} finally {
			setIsActionLoading(false);
		}
	};
	const handleMagicFix = async (id) => {
		setFixingIds((prev) => new Set(prev).add(id));
		try {
			const res = await axios.post(`/api/fact-check/fix/${id}`);
			toast.success(res.data.message);
			fetchQueues();
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to fix article.");
		} finally {
			setFixingIds((prev) => {
				const next = new Set(prev);
				next.delete(id);
				return next;
			});
		}
	};
	const handleBatchFix = async () => {
		setIsActionLoading(true);
		try {
			const res = await axios.post("/api/fact-check/fix-batch");
			toast.success(res.data.message);
			fetchQueues();
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to start batch fix.");
		} finally {
			setIsActionLoading(false);
		}
	};
	const isRunning = progress?.status === "running";
	const percent = progress?.total > 0 ? Math.round(progress.completed / progress.total * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto space-y-8 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-6 h-6 text-white" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-black tracking-tight",
					children: "Fact-Check Engine"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-gray-500",
					children: "Monitor automated article verification and backfill progress."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-xl font-bold flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-5 h-5 text-primary" }), "Retroactive Backfill"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-gray-500 mt-1",
						children: "Systematically verify all existing published articles against trusted sources."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-3",
						children: isRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => toggleBackfill("stop"),
							disabled: isActionLoading,
							className: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50",
							children: [isActionLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "w-4 h-4" }), "Stop Engine"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => toggleBackfill("start"),
							disabled: isActionLoading,
							className: "bg-primary text-white hover:bg-primary/90 px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50",
							children: [isActionLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-4 h-4" }), "Start Backfill"]
						})
					})]
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-32 flex items-center justify-center text-gray-500",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-6 h-6 animate-spin" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-sm font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "uppercase tracking-widest text-gray-500",
								children: ["Status: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: isRunning ? "text-emerald-500" : "text-gray-400",
									children: progress?.status || "Idle"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [percent, "% Completed"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full bg-black/10 dark:bg-white/10 rounded-full h-4 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								className: "bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full relative",
								initial: { width: 0 },
								animate: { width: `${percent}%` },
								transition: { duration: .5 },
								children: isRunning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-white/20 animate-pulse" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-black/20 rounded-xl p-4 border border-white/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-gray-500 uppercase tracking-widest font-bold mb-1",
										children: "Total Target"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl font-bold",
										children: progress?.total || 0
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-emerald-500 uppercase tracking-widest font-bold mb-1",
										children: "Checked"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl font-bold text-emerald-400",
										children: progress?.completed || 0
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-red-500/10 rounded-xl p-4 border border-red-500/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-red-500 uppercase tracking-widest font-bold mb-1",
										children: "Failed / Errors"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl font-bold text-red-400",
										children: progress?.failed || 0
									})]
								})
							]
						}),
						progress?.current_article && isRunning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 text-sm text-gray-400 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Currently checking: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-white",
								children: [
									"\"",
									progress.current_article,
									"\""
								]
							})] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl flex flex-col h-[500px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-bold flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-5 h-5 text-amber-500" }),
								"Needs Review Queue",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 bg-amber-500/20 text-amber-600 px-2 py-1 rounded-md text-xs",
									children: queues.needs_review.length
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-500 mt-1",
							children: "Articles scoring between 40-59 (Possible Hallucinations)"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleBatchFix,
							disabled: isActionLoading || queues.needs_review.length === 0,
							className: "text-xs font-bold bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50",
							children: [isActionLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "w-3 h-3" }), " Fix All"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto p-4 space-y-2",
						children: queues.needs_review.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full flex items-center justify-center text-sm text-gray-500",
							children: "Queue is empty"
						}) : queues.needs_review.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-4 flex items-center justify-between group hover:border-amber-500/50 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden pr-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-bold text-sm truncate",
									children: article.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mt-1 text-xs font-mono text-amber-500",
									children: ["Score: ", article.fact_check_score]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleMagicFix(article.id),
									disabled: fixingIds.has(article.id),
									className: "w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-50",
									title: "Auto-Fix Hallucinations",
									children: fixingIds.has(article.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "w-4 h-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleEdit(article),
									className: "w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center flex-shrink-0 hover:bg-primary hover:text-white transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-4 h-4" })
								})]
							})]
						}, article.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl flex flex-col h-[500px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-bold flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldX, { className: "w-5 h-5 text-red-500" }),
								"Failed / Blocked Content",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 bg-red-500/20 text-red-600 px-2 py-1 rounded-md text-xs",
									children: queues.failed.length
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-500 mt-1",
							children: "Articles scoring below 40. Pulled from production."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleBatchFix,
							disabled: isActionLoading || queues.failed.length === 0,
							className: "text-xs font-bold bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50",
							children: [isActionLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "w-3 h-3" }), " Fix All"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto p-4 space-y-2",
						children: queues.failed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full flex items-center justify-center text-sm text-gray-500",
							children: "Queue is empty"
						}) : queues.failed.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-4 flex items-center justify-between group hover:border-red-500/50 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden pr-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-bold text-sm truncate",
									children: article.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mt-1 text-xs font-mono text-red-500",
									children: ["Score: ", article.fact_check_score]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleMagicFix(article.id),
									disabled: fixingIds.has(article.id),
									className: "w-8 h-8 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-50",
									title: "Auto-Fix Hallucinations",
									children: fixingIds.has(article.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "w-4 h-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleEdit(article),
									className: "w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center flex-shrink-0 hover:bg-primary hover:text-white transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-4 h-4" })
								})]
							})]
						}, article.id))
					})]
				})]
			})
		]
	});
}
//#endregion
export { FactCheckDashboard as t };
