import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { a as router3, i as Link_default, l as axios, n as toast, r as Head_default } from "../ssr.mjs";
import { t as require_dayjs_min } from "./dayjs.min-DAMeu7No.mjs";
import { t as createLucideIcon } from "./createLucideIcon-DvhrQ9-F.mjs";
import { t as Users } from "./users-ClvImKtF.mjs";
import { t as StudioLayout } from "./StudioLayout-DGC9Ia7K.mjs";
import { t as Search } from "./search-Dmdq9eFk.mjs";
import { t as Mail } from "./mail-Cuuk0PwL.mjs";
import { t as Trash2 } from "./trash-2-B0-Sil0q.mjs";
import { t as TrendingUp } from "./trending-up-ChlcGh_K.mjs";
import { t as require_relativeTime } from "./relativeTime-CsFwCNQi.mjs";
//#region node_modules/lucide-react/dist/esm/icons/calendar.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Calendar = createLucideIcon("Calendar", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/download.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Download = createLucideIcon("Download", [
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["polyline", {
		points: "7 10 12 15 17 10",
		key: "2ggqvy"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "15",
		y2: "3",
		key: "1vk2je"
	}]
]);
//#endregion
//#region resources/js/Pages/Studio/Subscribers/Index.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
var import_relativeTime = /* @__PURE__ */ __toESM(require_relativeTime());
var import_jsx_runtime = require_jsx_runtime();
import_dayjs_min.default.extend(import_relativeTime.default);
function SubscribersIndex({ subscribers, filters, stats }) {
	const [search, setSearch] = (0, import_react.useState)(filters.search || "");
	const [isDeleting, setIsDeleting] = (0, import_react.useState)(null);
	const handleSearch = (e) => {
		e.preventDefault();
		router3.get("/studio/subscribers", { search }, {
			preserveState: true,
			replace: true
		});
	};
	const handleDelete = async (id, email) => {
		if (!window.confirm(`Remove subscriber ${email}?`)) return;
		setIsDeleting(id);
		try {
			await axios.delete(`/studio/subscribers/${id}`);
			toast.success("Subscriber removed");
			router3.reload({ only: ["subscribers", "stats"] });
		} catch (err) {
			toast.error("Failed to remove subscriber");
		} finally {
			setIsDeleting(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StudioLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: "Subscribers — Studio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 md:p-16 max-w-7xl mx-auto space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-2 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }), "Audience"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-5xl md:text-6xl font-black tracking-tighter text-white",
					children: "Subscribers."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/studio/subscribers/export",
					download: true,
					className: "inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-white/10 transition-all hover:scale-105",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Export CSV" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white/[0.02] border border-white/5 rounded-2xl p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-3xl font-black text-white tracking-tight mb-1",
							children: stats.total.toLocaleString()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
							children: "TOTAL SUBSCRIBERS"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white/[0.02] border border-white/5 rounded-2xl p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-3xl font-black text-emerald-400 tracking-tight mb-1 flex items-center gap-2",
							children: ["+", stats.new_this_week]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
							children: "NEW THIS WEEK"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white/[0.02] border border-white/5 rounded-2xl p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-3xl font-black text-purple-400 tracking-tight mb-1 flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-5 h-5 text-purple-400" }),
								stats.growth_rate,
								"%"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
							children: "WEEKLY GROWTH RATE"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/[0.02] border border-white/5 p-4 rounded-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSearch,
					className: "relative flex-1 w-full sm:w-80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search subscribers by email...",
						className: "w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-white placeholder-gray-600 focus:border-primary/50 outline-none transition-all"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden",
				children: subscribers.data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-white/5",
					children: subscribers.data.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 hover:bg-white/[0.02] transition-colors flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-emerald-400 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-5 h-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-bold text-white truncate",
									children: sub.email
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] font-medium text-gray-500 flex items-center gap-1.5 mt-0.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-3 h-3 text-gray-600" }),
										"Subscribed ",
										(0, import_dayjs_min.default)(sub.created_at).fromNow()
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:block",
								children: "Active"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleDelete(sub.id, sub.email),
								disabled: isDeleting === sub.id,
								className: "p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all",
								title: "Remove Subscriber",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
							})]
						})]
					}, sub.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-20 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-10 h-10 text-gray-700 mx-auto opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-black uppercase tracking-widest text-gray-500",
						children: "No subscribers found."
					})]
				})
			}),
			subscribers.links && subscribers.links.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center items-center gap-2 pt-4",
				children: subscribers.links.map((link, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
					href: link.url || "#",
					dangerouslySetInnerHTML: { __html: link.label },
					className: `px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${link.active ? "bg-primary text-white shadow-lg shadow-primary/20" : link.url ? "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-700 cursor-not-allowed opacity-50"}`
				}, i))
			})
		]
	})] });
}
//#endregion
export { SubscribersIndex as default };
