import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { a as router3, l as axios, n as toast, r as Head_default } from "../ssr.mjs";
import { n as motion } from "./createLucideIcon-DvhrQ9-F.mjs";
import { t as X } from "./x-DGRKKDf6.mjs";
import { a as Image } from "./users-ClvImKtF.mjs";
import { t as StudioLayout } from "./StudioLayout-DGC9Ia7K.mjs";
import { t as Check } from "./check-COS9DQOn.mjs";
import { t as Copy } from "./copy-CPRj11XO.mjs";
import { t as ExternalLink } from "./external-link-ByvT68QL.mjs";
import { n as LoaderCircle, t as Search } from "./search-Dmdq9eFk.mjs";
import { t as Trash2 } from "./trash-2-B0-Sil0q.mjs";
import { t as Upload } from "./upload-Bs-5dQMP.mjs";
//#region resources/js/Pages/Studio/Media/Index.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MediaIndex({ media }) {
	const [selectedAsset, setSelectedAsset] = (0, import_react.useState)(media[0] || null);
	const [isUploading, setIsUploading] = (0, import_react.useState)(false);
	const [copiedId, setCopiedId] = (0, import_react.useState)(null);
	const [search, setSearch] = (0, import_react.useState)("");
	const filteredMedia = media.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
	const handleUpload = async (e) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		setIsUploading(true);
		let successCount = 0;
		for (let i = 0; i < files.length; i++) {
			const formData = new FormData();
			formData.append("image", files[i]);
			try {
				await axios.post("/upload-image", formData, { headers: { "Content-Type": "multipart/form-data" } });
				successCount++;
			} catch (err) {
				toast.error(`Failed to upload ${files[i].name}`);
			}
		}
		setIsUploading(false);
		if (successCount > 0) {
			toast.success(`Uploaded ${successCount} asset(s)!`);
			router3.reload({ only: ["media"] });
		}
	};
	const handleCopyUrl = (asset) => {
		navigator.clipboard.writeText(asset.url);
		setCopiedId(asset.id);
		toast.success("Asset URL copied to clipboard!");
		setTimeout(() => setCopiedId(null), 2e3);
	};
	const handleDelete = async (asset) => {
		if (!window.confirm(`Delete ${asset.name}?`)) return;
		try {
			await axios.delete("/studio/media", { data: { path: asset.path } });
			toast.success("Asset deleted");
			if (selectedAsset?.id === asset.id) setSelectedAsset(null);
			router3.reload({ only: ["media"] });
		} catch (err) {
			toast.error("Failed to delete asset");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StudioLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: "Media Library — Studio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 md:p-16 max-w-7xl mx-auto space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }), "Asset Vault"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-5xl md:text-6xl font-black tracking-tighter text-white",
					children: "Media Library."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "inline-flex items-center gap-2 bg-primary text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105 cursor-pointer",
					children: [
						isUploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-4 h-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isUploading ? "Uploading..." : "Upload Assets" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							onChange: handleUpload,
							multiple: true,
							accept: "image/*",
							className: "hidden"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-white/5 hover:border-primary/40 bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer group text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors mb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-6 h-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-black uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors",
						children: "Drop assets here or click to browse"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-medium text-gray-500 mt-1",
						children: "Supports PNG, JPG, WEBP, SVG (Max 10MB per file)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						onChange: handleUpload,
						multiple: true,
						accept: "image/*",
						className: "hidden"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-8 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search assets by filename...",
							className: "w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-white placeholder-gray-600 focus:border-primary/50 outline-none transition-all"
						})]
					}), filteredMedia.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4",
						children: filteredMedia.map((asset) => {
							const isSelected = selectedAsset?.id === asset.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								onClick: () => setSelectedAsset(asset),
								whileHover: { scale: 1.02 },
								className: `relative aspect-square rounded-2xl overflow-hidden border cursor-pointer transition-all bg-gray-900 group ${isSelected ? "border-primary ring-2 ring-primary/30 shadow-lg shadow-primary/20" : "border-white/5 hover:border-white/20"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: asset.url,
									alt: asset.name,
									className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold text-white truncate",
										children: asset.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] font-mono text-gray-400",
										children: asset.formatted_size
									})]
								})]
							}, asset.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-20 bg-white/[0.01] border border-white/5 rounded-3xl space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "w-10 h-10 text-gray-700 mx-auto opacity-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-black uppercase tracking-widest text-gray-500",
							children: "No assets found in Media Library."
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-3xl p-6 space-y-6 h-fit sticky top-24",
					children: selectedAsset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-white/5 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-[10px] font-black uppercase tracking-[0.3em] text-gray-400",
									children: "Asset Details"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedAsset(null),
									className: "text-gray-500 hover:text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl overflow-hidden border border-white/10 aspect-video bg-gray-900",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: selectedAsset.url,
									alt: selectedAsset.name,
									className: "w-full h-full object-contain"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1",
									children: "Filename"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono font-bold text-white break-all",
									children: selectedAsset.name
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1",
										children: "File Size"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-gray-300",
										children: selectedAsset.formatted_size
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1",
										children: "Uploaded"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-gray-300",
										children: selectedAsset.updated_at
									})] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 pt-4 border-t border-white/5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleCopyUrl(selectedAsset),
										className: "w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-xs uppercase tracking-widest transition-all",
										children: [copiedId === selectedAsset.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4 text-primary" }), copiedId === selectedAsset.id ? "Copied Link!" : "Copy Asset URL"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: selectedAsset.url,
										target: "_blank",
										rel: "noreferrer",
										className: "w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 font-bold text-xs uppercase tracking-widest transition-all",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-4 h-4 text-gray-400" }), "Open Original"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleDelete(selectedAsset),
										className: "w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 font-black text-xs uppercase tracking-widest transition-all",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" }), "Delete Asset"]
									})
								]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-16 text-center space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "w-10 h-10 text-gray-700 mx-auto opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-black uppercase tracking-widest text-gray-500",
							children: "Select an asset to view details."
						})]
					})
				})]
			})
		]
	})] });
}
//#endregion
export { MediaIndex as default };
