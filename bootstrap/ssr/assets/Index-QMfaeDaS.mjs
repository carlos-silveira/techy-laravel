import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { a as router3, i as Link_default, l as axios, n as toast, r as Head_default } from "../ssr.mjs";
import { t as require_dayjs_min } from "./dayjs.min-DAMeu7No.mjs";
import { n as motion } from "./createLucideIcon-DvhrQ9-F.mjs";
import { o as FileText } from "./users-ClvImKtF.mjs";
import { t as StudioLayout } from "./StudioLayout-DGC9Ia7K.mjs";
import { t as Clock } from "./clock-sIiChPLd.mjs";
import { t as ExternalLink } from "./external-link-ByvT68QL.mjs";
import { t as Search } from "./search-Dmdq9eFk.mjs";
import { t as PenLine } from "./pen-line-D1i8XjAI.mjs";
import { t as Sparkles } from "./sparkles-CccfAaSL.mjs";
import { t as Trash2 } from "./trash-2-B0-Sil0q.mjs";
import { t as getFinalImage } from "./utils-CvS3ysxz.mjs";
import { t as require_relativeTime } from "./relativeTime-CsFwCNQi.mjs";
//#region resources/js/Pages/Studio/Articles/Index.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
var import_relativeTime = /* @__PURE__ */ __toESM(require_relativeTime());
var import_jsx_runtime = require_jsx_runtime();
import_dayjs_min.default.extend(import_relativeTime.default);
function ArticlesIndex({ articles, filters, counts }) {
	const [search, setSearch] = (0, import_react.useState)(filters.search || "");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)(filters.status || "");
	const [sortFilter, setSortFilter] = (0, import_react.useState)(filters.sort || "latest");
	const [isDeleting, setIsDeleting] = (0, import_react.useState)(null);
	const handleSearch = (e) => {
		e.preventDefault();
		router3.get("/studio/articles", {
			search,
			status: statusFilter,
			sort: sortFilter
		}, {
			preserveState: true,
			replace: true
		});
	};
	const handleFilterChange = (newStatus) => {
		setStatusFilter(newStatus);
		router3.get("/studio/articles", {
			search,
			status: newStatus,
			sort: sortFilter
		}, {
			preserveState: true,
			replace: true
		});
	};
	const handleSortChange = (newSort) => {
		setSortFilter(newSort);
		router3.get("/studio/articles", {
			search,
			status: statusFilter,
			sort: newSort
		}, {
			preserveState: true,
			replace: true
		});
	};
	const handlePublishToggle = async (article) => {
		try {
			if (article.status === "published") {
				await axios.put(`/articles/${article.id}`, {
					...article,
					status: "draft"
				});
				toast.success("Article reverted to draft");
			} else {
				await axios.post(`/articles/${article.id}/publish`);
				toast.success("Article published!");
			}
			router3.reload({ only: ["articles", "counts"] });
		} catch (err) {
			toast.error("Failed to update status");
		}
	};
	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this article?")) return;
		setIsDeleting(id);
		try {
			await axios.delete(`/articles/${id}`);
			toast.success("Article deleted");
			router3.reload({ only: ["articles", "counts"] });
		} catch (err) {
			toast.error("Failed to delete article");
		} finally {
			setIsDeleting(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StudioLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: "Articles — Studio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 md:p-16 max-w-7xl mx-auto space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-end justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }), "Editorial Desk"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-5xl md:text-6xl font-black tracking-tighter text-white",
					children: "Narrative Repository."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link_default, {
					href: "/studio/articles/create",
					className: "inline-flex items-center gap-2 bg-primary text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "New AI Article" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/[0.02] border border-white/5 p-4 rounded-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 w-full sm:w-auto overflow-x-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleFilterChange(""),
							className: `px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === "" ? "bg-primary/10 text-primary border border-primary/20" : "bg-white/5 text-gray-400 hover:text-white border border-transparent"}`,
							children: [
								"All (",
								counts.all,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleFilterChange("published"),
							className: `px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === "published" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-gray-400 hover:text-white border border-transparent"}`,
							children: [
								"Published (",
								counts.published,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleFilterChange("draft"),
							className: `px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === "draft" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-white/5 text-gray-400 hover:text-white border border-transparent"}`,
							children: [
								"Drafts (",
								counts.draft,
								")"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSearch,
						className: "relative flex-1 sm:w-64",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Filter narratives...",
							className: "w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-white placeholder-gray-600 focus:border-primary/50 outline-none transition-all"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sortFilter,
						onChange: (e) => handleSortChange(e.target.value),
						className: "bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-gray-300 outline-none focus:border-primary/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "latest",
								className: "bg-[#02040a]",
								children: "Latest First"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "oldest",
								className: "bg-[#02040a]",
								children: "Oldest First"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "views",
								className: "bg-[#02040a]",
								children: "Most Views"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "fact_check",
								className: "bg-[#02040a]",
								children: "Lowest Fact-Check"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: articles.data.length > 0 ? articles.data.map((article) => {
					const coverImg = getFinalImage(article, 200);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 15
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "bg-white/[0.02] border border-white/5 rounded-3xl p-5 hover:border-primary/30 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-5 min-w-0",
							children: [coverImg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: coverImg,
								alt: article.title,
								className: "w-20 h-20 rounded-2xl object-cover border border-white/5 shrink-0 bg-gray-900"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-20 h-20 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-8 h-8 text-gray-600" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handlePublishToggle(article),
												className: `text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded cursor-pointer transition-all ${article.status === "published" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20" : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10"}`,
												children: article.status
											}),
											article.fact_check_score && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded ${article.fact_check_score >= 80 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : article.fact_check_score >= 60 ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`,
												children: [
													"Score: ",
													article.fact_check_score,
													"%"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] font-medium text-gray-500 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3 text-gray-600" }), (0, import_dayjs_min.default)(article.created_at).fromNow()]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
										href: `/studio/articles/${article.id}/edit`,
										className: "text-base md:text-lg font-black text-white group-hover:text-primary transition-colors leading-snug line-clamp-2 block",
										children: article.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-400 font-light line-clamp-1",
										children: article.ai_summary || "No summary generated."
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 shrink-0 justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right px-4 border-r border-white/5 hidden sm:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-black text-white block",
									children: (article.views_count || 0).toLocaleString()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-black uppercase tracking-widest text-gray-500",
									children: "Views"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
										href: `/article/${article.slug}`,
										target: "_blank",
										className: "p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all",
										title: "View Public Article",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-4 h-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link_default, {
										href: `/studio/articles/${article.id}/edit`,
										className: "p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-all font-bold text-xs uppercase tracking-widest flex items-center gap-2 px-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Edit" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleDelete(article.id),
										disabled: isDeleting === article.id,
										className: "p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all",
										title: "Delete Article",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
									})
								]
							})]
						})]
					}, article.id);
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-20 bg-white/[0.01] border border-white/5 rounded-3xl space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-12 h-12 text-gray-700 mx-auto opacity-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-black uppercase tracking-widest text-gray-500",
						children: "No narratives found matching your search."
					})]
				})
			}),
			articles.links && articles.links.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center items-center gap-2 pt-6",
				children: articles.links.map((link, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
					href: link.url || "#",
					dangerouslySetInnerHTML: { __html: link.label },
					className: `px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${link.active ? "bg-primary text-white shadow-lg shadow-primary/20" : link.url ? "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-700 cursor-not-allowed opacity-50"}`
				}, i))
			})
		]
	})] });
}
//#endregion
export { ArticlesIndex as default };
