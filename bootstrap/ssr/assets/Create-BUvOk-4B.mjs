import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { a as router3, l as axios, n as toast, r as Head_default } from "../ssr.mjs";
import { n as motion } from "./createLucideIcon-DvhrQ9-F.mjs";
import { i as AnimatePresence, r as ArrowRight } from "./x-DGRKKDf6.mjs";
import { t as StudioLayout } from "./StudioLayout-DGC9Ia7K.mjs";
import { t as Check } from "./check-COS9DQOn.mjs";
import { n as LoaderCircle } from "./search-Dmdq9eFk.mjs";
import { t as Newspaper } from "./newspaper-Cl_GP806.mjs";
import { t as RefreshCw } from "./refresh-cw-e7IaOw7l.mjs";
import { t as Sparkles } from "./sparkles-CccfAaSL.mjs";
//#region resources/js/Pages/Studio/Articles/Create.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WIZARD_STEPS = [
	"Discover",
	"Generate",
	"Review",
	"Publish"
];
function ArticlesCreate() {
	const [step, setStep] = (0, import_react.useState)(0);
	const [ideas, setIdeas] = (0, import_react.useState)([]);
	const [selectedIdea, setSelectedIdea] = (0, import_react.useState)(null);
	const [customTitle, setCustomTitle] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [meta, setMeta] = (0, import_react.useState)({
		meta_description: "",
		seo_keywords: "",
		summary: "",
		tags: []
	});
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [feedback, setFeedback] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		fetchIdeas();
	}, []);
	const fetchIdeas = async () => {
		setIsLoading(true);
		try {
			setIdeas((await axios.get("/api/generate-ideas")).data);
		} catch (err) {
			toast.error("Failed to fetch trending topics");
		} finally {
			setIsLoading(false);
		}
	};
	const handleSelectIdea = (idea) => {
		setSelectedIdea(idea);
		generateDraft(idea.prompt || idea.title);
	};
	const handleUseCustomTitle = () => {
		if (!customTitle.trim()) return;
		setSelectedIdea({
			title: customTitle,
			prompt: customTitle,
			source: "Custom"
		});
		generateDraft(customTitle);
	};
	const generateDraft = async (prompt) => {
		setStep(1);
		setIsLoading(true);
		try {
			const res = await axios.post("/api/generate-draft", { topic: prompt });
			setDraft(res.data.draft);
			setStep(2);
			generateMeta(res.data.draft);
		} catch (err) {
			toast.error("Failed to generate draft.");
			setStep(0);
		} finally {
			setIsLoading(false);
		}
	};
	const generateMeta = async (draftContent) => {
		try {
			setMeta((await axios.post("/api/generate-article-meta", {
				title: selectedIdea?.title || customTitle,
				content: draftContent
			})).data);
		} catch (err) {
			console.error("Meta generation failed");
		}
	};
	const regenerateDraft = async () => {
		setIsLoading(true);
		try {
			setDraft((await axios.post("/api/regenerate-draft", {
				currentDraft: draft,
				feedback: feedback || "Make it more detailed, insightful, and technical."
			})).data.draft);
			toast.success("Draft updated with your feedback!");
			setFeedback("");
		} catch (err) {
			toast.error("Regeneration failed.");
		} finally {
			setIsLoading(false);
		}
	};
	const handlePublish = async () => {
		setIsLoading(true);
		try {
			const res = await axios.post("/articles", {
				title: selectedIdea?.title || customTitle,
				content: draft,
				is_published: true,
				is_editors_choice: true,
				meta_description: meta.meta_description,
				seo_keywords: meta.seo_keywords,
				ai_summary: meta.summary,
				tags: meta.tags || []
			});
			toast.success("🚀 Published! Article is live.");
			router3.visit(`/studio/articles/${res.data.article.id}/edit`);
		} catch (err) {
			toast.error("Publishing failed.");
		} finally {
			setIsLoading(false);
		}
	};
	const sanitizeForPreview = (html) => {
		if (!html) return "";
		let content = html;
		try {
			const parsed = JSON.parse(content);
			if (typeof parsed === "string") content = parsed;
		} catch {}
		return content.replace(/\\\//g, "/").replace(/^"|"$/g, "");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StudioLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: "AI Article Writer — Studio" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-16 z-20 bg-[#02040a]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-3xl mx-auto flex items-center justify-between gap-3",
				children: WIZARD_STEPS.map((name, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center gap-2 transition-all ${i < step ? "text-emerald-400" : i === step ? "text-primary" : "text-gray-600"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${i < step ? "bg-emerald-500/20 border border-emerald-500/30" : i === step ? "bg-primary/20 border border-primary/30 shadow-lg shadow-primary/20 text-white" : "bg-white/5 border border-white/10"}`,
						children: i < step ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5" }) : i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-black uppercase tracking-widest hidden sm:block",
						children: name
					})]
				}), i < WIZARD_STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `flex-1 h-[2px] rounded-full transition-all ${i < step ? "bg-emerald-500/30" : "bg-white/5"}` })] }, name))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-3xl mx-auto px-6 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
				mode: "wait",
				children: [
					step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -20
						},
						className: "space-y-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-primary mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newspaper, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-black uppercase tracking-[0.3em]",
										children: "Step 1 of 4"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-4xl md:text-5xl font-black tracking-tighter text-white mb-2",
									children: "What's the story?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-gray-400 font-light text-base",
									children: "Pick a trending tech topic or write your own custom concept."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: customTitle,
									onChange: (e) => setCustomTitle(e.target.value),
									onKeyDown: (e) => e.key === "Enter" && handleUseCustomTitle(),
									placeholder: "Type your own topic or headline...",
									className: "flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white placeholder-gray-600 focus:border-primary/50 outline-none transition-all"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleUseCustomTitle,
									className: "px-6 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 shrink-0",
									children: "Generate Draft"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 text-gray-600",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-white/5" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-black uppercase tracking-widest text-gray-500",
										children: "OR PICK A TRENDING CONCEPT"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-white/5" })
								]
							}),
							isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center py-16",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: ideas.map((idea, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
									onClick: () => handleSelectIdea(idea),
									whileHover: {
										scale: 1.01,
										x: 4
									},
									className: "w-full text-left p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all group flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20",
										children: idea.source || "Trending"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-black text-white group-hover:text-primary transition-colors mt-2",
										children: idea.title
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-4" })]
								}, i))
							})
						]
					}, "discover"),
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: .95
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: { opacity: 0 },
						className: "py-24 text-center space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary animate-bounce",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-8 h-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl font-black tracking-tighter text-white",
								children: "Drafting your narrative..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-light text-gray-400 max-w-md mx-auto",
								children: "Gemini 2.0 AI is researching facts, structuring sections, and synthesizing deep technical analysis."
							})
						]
					}, "generating"),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -20
						},
						className: "space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-black uppercase tracking-[0.3em] text-primary block mb-2",
									children: "Step 3 of 4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-4xl font-black tracking-tighter text-white",
									children: "Review & Refine Draft."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-light text-gray-400 mt-1",
									children: "Inspect the AI generated draft, request adjustments, or proceed to publishing metadata."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: feedback,
									onChange: (e) => setFeedback(e.target.value),
									placeholder: "Ask AI to change style, add details, or fix tone...",
									className: "flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-white placeholder-gray-600 focus:border-primary/50 outline-none"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: regenerateDraft,
									disabled: isLoading,
									className: "px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 shrink-0",
									children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-4 h-4" }), "Refine"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-white/[0.02] border border-white/5 rounded-3xl p-8 max-h-[50vh] overflow-y-auto prose prose-invert max-w-none text-gray-300",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: sanitizeForPreview(draft) } })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setStep(0),
									className: "px-6 py-3 rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all",
									children: "Start Over"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setStep(3),
									className: "px-8 py-3 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Next: SEO & Publish" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
								})]
							})
						]
					}, "review"),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -20
						},
						className: "space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 block mb-2",
									children: "Step 4 of 4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-4xl font-black tracking-tighter text-white",
									children: "Metadata & Launch."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-light text-gray-400 mt-1",
									children: "Review the auto-generated SEO metadata before broadcasting live."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
										children: "Title"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: selectedIdea?.title || customTitle,
										readOnly: true,
										className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
										children: "Meta Description"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										value: meta.meta_description,
										onChange: (e) => setMeta({
											...meta,
											meta_description: e.target.value
										}),
										className: "w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-medium text-white focus:border-primary/50 outline-none"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
										children: "SEO Keywords"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: meta.seo_keywords,
										onChange: (e) => setMeta({
											...meta,
											seo_keywords: e.target.value
										}),
										className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white focus:border-primary/50 outline-none"
									})] }),
									meta.tags && meta.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
										children: "Generated Tags"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: meta.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20",
											children: ["#", t]
										}, t))
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setStep(2),
									className: "px-6 py-3 rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all",
									children: "Back to Review"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handlePublish,
									disabled: isLoading,
									className: "px-8 py-4 rounded-xl bg-emerald-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2",
									children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4" }), "Broadcast Live Now"]
								})]
							})
						]
					}, "publish")
				]
			})
		})
	] });
}
//#endregion
export { ArticlesCreate as default };
