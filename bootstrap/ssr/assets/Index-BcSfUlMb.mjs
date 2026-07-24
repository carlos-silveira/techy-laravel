import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { a as router3, l as axios, n as toast, r as Head_default } from "../ssr.mjs";
import { n as motion, t as createLucideIcon } from "./createLucideIcon-DvhrQ9-F.mjs";
import { i as AnimatePresence, t as X } from "./x-DGRKKDf6.mjs";
import { r as FolderTree, t as StudioLayout } from "./StudioLayout-DGC9Ia7K.mjs";
import { t as Check } from "./check-COS9DQOn.mjs";
import { t as PenLine } from "./pen-line-D1i8XjAI.mjs";
import { t as Trash2 } from "./trash-2-B0-Sil0q.mjs";
//#region node_modules/lucide-react/dist/esm/icons/plus.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Plus = createLucideIcon("Plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]);
//#endregion
//#region resources/js/Pages/Studio/Categories/Index.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoriesIndex({ categories }) {
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [editingCategory, setEditingCategory] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [color, setColor] = (0, import_react.useState)("#00b4ff");
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const presetColors = [
		"#00b4ff",
		"#10b981",
		"#f59e0b",
		"#8b5cf6",
		"#ec4899",
		"#3b82f6",
		"#64748b"
	];
	const openCreateModal = () => {
		setEditingCategory(null);
		setName("");
		setDescription("");
		setColor("#00b4ff");
		setIsModalOpen(true);
	};
	const openEditModal = (cat) => {
		setEditingCategory(cat);
		setName(cat.name);
		setDescription(cat.description || "");
		setColor(cat.color || "#00b4ff");
		setIsModalOpen(true);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name.trim()) return;
		setIsSaving(true);
		try {
			if (editingCategory) {
				await axios.put(`/studio/categories/${editingCategory.id}`, {
					name,
					description,
					color
				});
				toast.success("Category updated!");
			} else {
				await axios.post("/studio/categories", {
					name,
					description,
					color
				});
				toast.success("Category created!");
			}
			setIsModalOpen(false);
			router3.reload({ only: ["categories"] });
		} catch (err) {
			toast.error("Failed to save category");
		} finally {
			setIsSaving(false);
		}
	};
	const handleDelete = async (cat) => {
		if (!window.confirm(`Delete category "${cat.name}"?`)) return;
		try {
			await axios.delete(`/studio/categories/${cat.id}`);
			toast.success("Category deleted");
			router3.reload({ only: ["categories"] });
		} catch (err) {
			toast.error("Failed to delete category");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StudioLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: "Categories — Studio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 md:p-16 max-w-7xl mx-auto space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }), "Taxonomy"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-5xl md:text-6xl font-black tracking-tighter text-white",
					children: "Categories."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: openCreateModal,
					className: "inline-flex items-center gap-2 bg-primary text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add Category" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: categories.length > 0 ? categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 15
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "bg-white/[0.02] border border-white/5 rounded-3xl p-6 hover:border-primary/30 transition-all group flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-4 h-4 rounded-full border border-white/10 shrink-0",
									style: { backgroundColor: cat.color || "#00b4ff" }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest",
									children: ["/", cat.slug]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-white/5 border border-white/5 text-gray-400",
								children: [cat.articles_count, " Articles"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-black text-white group-hover:text-primary transition-colors",
							children: cat.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-light text-gray-400 mt-2 line-clamp-2",
							children: cat.description || "No description provided."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-end gap-2 pt-6 mt-4 border-t border-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => openEditModal(cat),
							className: "p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "w-4 h-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleDelete(cat),
							className: "p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
						})]
					})]
				}, cat.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-full text-center py-20 bg-white/[0.01] border border-white/5 rounded-3xl space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderTree, { className: "w-10 h-10 text-gray-700 mx-auto opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-black uppercase tracking-widest text-gray-500",
						children: "No categories created yet. Click \"Add Category\" to get started."
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				onClick: () => setIsModalOpen(false),
				className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .95,
					y: 20
				},
				animate: {
					opacity: 1,
					scale: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					scale: .95,
					y: 20
				},
				className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#02040a] border border-white/10 rounded-3xl p-8 z-50 space-y-6 shadow-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-white/5 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-black text-white tracking-tight",
						children: editingCategory ? "Edit Category" : "Create New Category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setIsModalOpen(false),
						className: "text-gray-500 hover:text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
							children: "Category Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							required: true,
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "e.g. Artificial Intelligence",
							className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-primary/50 outline-none"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: description,
							onChange: (e) => setDescription(e.target.value),
							placeholder: "Brief overview of content in this category...",
							className: "w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-medium text-white focus:border-primary/50 outline-none"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
							children: "Accent Color"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-3",
							children: presetColors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setColor(c),
								className: `w-7 h-7 rounded-full border flex items-center justify-center transition-all ${color === c ? "border-white scale-110" : "border-transparent opacity-60"}`,
								style: { backgroundColor: c },
								children: color === c && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 text-white" })
							}, c))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-3 pt-4 border-t border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setIsModalOpen(false),
								className: "px-5 py-2.5 rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: isSaving,
								className: "px-6 py-2.5 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90",
								children: isSaving ? "Saving..." : editingCategory ? "Update" : "Create"
							})]
						})
					]
				})]
			})] }) })
		]
	})] });
}
//#endregion
export { CategoriesIndex as default };
