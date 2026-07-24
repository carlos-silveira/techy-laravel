import "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { a as router3, r as Head_default } from "../ssr.mjs";
import { n as AnalyticsChart, t as GeminiUsage } from "./GeminiUsage-CYGpB9f5.mjs";
import { t as StudioLayout } from "./StudioLayout-DGC9Ia7K.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function AnalyticsIndex(props) {
	const currentPeriod = new URLSearchParams(window.location.search).get("period") || "7d";
	const handlePeriodChange = (period) => {
		router3.get("/studio/analytics", { period }, {
			preserveState: true,
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StudioLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: "Analytics — Studio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 md:p-16 max-w-7xl mx-auto space-y-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }), "Live Metrics"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-5xl md:text-6xl font-black tracking-tighter text-white",
					children: "Analytics."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1 bg-white/5 border border-white/5 p-1 rounded-2xl",
					children: [
						{
							id: "today",
							label: "24h"
						},
						{
							id: "7d",
							label: "7d"
						},
						{
							id: "30d",
							label: "30d"
						},
						{
							id: "all",
							label: "All"
						}
					].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => handlePeriodChange(p.id),
						className: `px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentPeriod === p.id ? "bg-white/10 text-white shadow-sm border border-white/10" : "text-gray-400 hover:text-white"}`,
						children: p.label
					}, p.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsChart, { ...props })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[10px] font-black uppercase tracking-[0.3em] text-primary",
					children: "AI Token Consumption Logs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GeminiUsage, {
					logs: props.geminiLogs || props.analytics?.rawGeminiLogs,
					totalCost: props.stats?.gemini_cost_7d || props.analytics?.summary?.totalGeminiCost
				})]
			})
		]
	})] });
}
//#endregion
export { AnalyticsIndex as default };
