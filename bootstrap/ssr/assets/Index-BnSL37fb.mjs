import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { l as axios, n as toast, r as Head_default } from "../ssr.mjs";
import { n as Globe } from "./x-DGRKKDf6.mjs";
import { n as Settings, t as StudioLayout } from "./StudioLayout-DGC9Ia7K.mjs";
import { t as Save } from "./save-y6W-lrZY.mjs";
import { t as Server } from "./server-C9y-GaMK.mjs";
import { t as ShieldAlert } from "./shield-alert-CMkkVeGl.mjs";
import { t as TriangleAlert } from "./triangle-alert-CsrorP-C.mjs";
import { t as Zap } from "./zap-Cm9uq65z.mjs";
//#region resources/js/Pages/Studio/Settings/Index.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsIndex({ settings }) {
	const [activeTab, setActiveTab] = (0, import_react.useState)("general");
	const [siteName, setSiteName] = (0, import_react.useState)(settings.site_name || "TechyNews");
	const [siteUrl, setSiteUrl] = (0, import_react.useState)(settings.site_url || "https://techynews.lat");
	const [locale, setLocale] = (0, import_react.useState)(settings.default_locale || "es");
	const [aiModel, setAiModel] = (0, import_react.useState)(settings.ai_primary_model || "gemini-2.0-flash");
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const tabs = [
		{
			id: "general",
			label: "General",
			icon: Globe
		},
		{
			id: "ai",
			label: "AI Engine",
			icon: Zap
		},
		{
			id: "seo",
			label: "SEO Defaults",
			icon: Settings
		},
		{
			id: "deployment",
			label: "Deployment",
			icon: Server
		},
		{
			id: "danger",
			label: "Danger Zone",
			icon: ShieldAlert,
			danger: true
		}
	];
	const handleSave = async (e) => {
		e.preventDefault();
		setIsSaving(true);
		try {
			await axios.post("/studio/settings", {
				siteName,
				siteUrl,
				locale,
				aiModel
			});
			toast.success("Configuration saved!");
		} catch (err) {
			toast.error("Failed to save settings.");
		} finally {
			setIsSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StudioLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: "Settings — Studio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 md:p-16 max-w-7xl mx-auto space-y-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }), "Configuration"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-5xl md:text-6xl font-black tracking-tighter text-white",
			children: "Settings."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-3 bg-white/[0.02] border border-white/5 rounded-3xl p-3 space-y-1",
				children: tabs.map((tab) => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab(tab.id),
						className: `w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-left ${tab.danger ? isActive ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "text-rose-400/70 hover:text-rose-400 hover:bg-rose-500/10" : isActive ? "bg-primary/10 text-primary border-l-2 border-primary shadow-sm" : "text-gray-400 hover:text-white hover:bg-white/5"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label })]
					}, tab.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-9 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 space-y-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSave,
					className: "space-y-8",
					children: [
						activeTab === "general" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-white/5 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-black text-white tracking-tight",
									children: "General Settings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500 font-light mt-1",
									children: "Configure basic site details, branding name, and default language."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
										children: "Site Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: siteName,
										onChange: (e) => setSiteName(e.target.value),
										className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-primary/50 outline-none"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
										children: "Site URL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: siteUrl,
										onChange: (e) => setSiteUrl(e.target.value),
										className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-primary/50 outline-none"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
										children: "Default Language"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: locale,
										onChange: (e) => setLocale(e.target.value),
										className: "w-full bg-[#02040a] border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-primary/50 outline-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "es",
											children: "Spanish (ES) — Primary"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "en",
											children: "English (EN)"
										})]
									})] })
								]
							})]
						}),
						activeTab === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-white/5 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-black text-white tracking-tight",
									children: "AI Generation Engine"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500 font-light mt-1",
									children: "Configure primary Gemini model and OpenRouter fallback options."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
									children: "Primary AI Model"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: aiModel,
									onChange: (e) => setAiModel(e.target.value),
									className: "w-full bg-[#02040a] border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-primary/50 outline-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "gemini-2.0-flash",
										children: "Google Gemini 2.0 Flash (Fastest / Low Cost)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "gemini-2.0-pro-exp-02-05",
										children: "Google Gemini 2.0 Pro (High Intelligence)"
									})]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold text-white",
												children: "Gemini API Status"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] font-medium text-gray-500",
												children: "Configured via .env"
											})] })]
										}), settings.gemini_api_configured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded uppercase tracking-widest",
											children: "Ready"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] font-black text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded uppercase tracking-widest",
											children: "Key Missing"
										})]
									})
								})]
							})]
						}),
						activeTab === "seo" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-white/5 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-black text-white tracking-tight",
									children: "SEO & Indexing"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500 font-light mt-1",
									children: "Sitemap configuration and automated SEO generation rules."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-white",
										children: "Dynamic XML Sitemap"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-mono text-gray-500 mt-0.5",
										children: "https://techynews.lat/sitemap.xml"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "/sitemap.xml",
										target: "_blank",
										className: "px-3 py-1.5 rounded-xl bg-white/5 text-xs font-black text-primary uppercase tracking-widest hover:bg-white/10",
										children: "View Sitemap"
									})]
								})
							})]
						}),
						activeTab === "deployment" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-white/5 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-black text-white tracking-tight",
									children: "Deployment & Environment"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-500 font-light mt-1",
									children: "Server environment status and deployment pipeline logs."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-white",
										children: "Environment"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-mono text-gray-500 mt-0.5",
										children: settings.environment
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded uppercase tracking-widest",
										children: "Production Ready"
									})]
								})
							})]
						}),
						activeTab === "danger" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-rose-500/20 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-xl font-black text-rose-400 tracking-tight flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-5 h-5" }), " Danger Zone"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-rose-300/70 font-light mt-1",
									children: "Destructive system maintenance actions. Proceed with caution."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-rose-300",
									children: "Cache Flush & Re-optimize"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-light text-rose-200/70",
									children: "Clears route, view, and application cache."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-6 border-t border-white/5 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: isSaving,
								className: "px-8 py-3 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), isSaving ? "Saving..." : "Save Configuration"]
							})
						})
					]
				})
			})]
		})]
	})] });
}
//#endregion
export { SettingsIndex as default };
