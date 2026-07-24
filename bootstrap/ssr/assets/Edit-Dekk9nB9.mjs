import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { i as Link_default, l as axios, n as toast, r as Head_default } from "../ssr.mjs";
import { t as createLucideIcon } from "./createLucideIcon-DvhrQ9-F.mjs";
import { s as CircleCheck } from "./users-ClvImKtF.mjs";
import { n as RichEditor, t as FactCheckPanel } from "./FactCheckPanel-DtFmugdE.mjs";
import { t as ArrowLeft } from "./arrow-left-a0_4ySVD.mjs";
import { t as Bot } from "./bot-DGiQ4K63.mjs";
import { t as StudioLayout } from "./StudioLayout-DGC9Ia7K.mjs";
import { t as ExternalLink } from "./external-link-ByvT68QL.mjs";
import { n as LoaderCircle } from "./search-Dmdq9eFk.mjs";
import { t as Save } from "./save-y6W-lrZY.mjs";
import { t as Send } from "./send-CfTfXCTa.mjs";
import { t as Sparkles } from "./sparkles-CccfAaSL.mjs";
import { t as Trash2 } from "./trash-2-B0-Sil0q.mjs";
import { t as Upload } from "./upload-Bs-5dQMP.mjs";
//#region node_modules/lucide-react/dist/esm/icons/tag.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Tag = createLucideIcon("Tag", [["path", {
	d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
	key: "vktsd0"
}], ["circle", {
	cx: "7.5",
	cy: "7.5",
	r: ".5",
	fill: "currentColor",
	key: "kqv944"
}]]);
//#endregion
//#region resources/js/Pages/Studio/Articles/Edit.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ArticlesEdit({ article }) {
	const [title, setTitle] = (0, import_react.useState)(article.title || "");
	const [content, setContent] = (0, import_react.useState)(article.content || "");
	const [status, setStatus] = (0, import_react.useState)(article.status || "draft");
	const [coverImagePath, setCoverImagePath] = (0, import_react.useState)(article.cover_image_path || "");
	const [metaDescription, setMetaDescription] = (0, import_react.useState)(article.meta_description || "");
	const [seoKeywords, setSeoKeywords] = (0, import_react.useState)(article.seo_keywords || "");
	const [aiSummary, setAiSummary] = (0, import_react.useState)(article.ai_summary || "");
	const [tags, setTags] = (0, import_react.useState)(Array.isArray(article.tags) ? article.tags.join(", ") : "");
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [isUploadingImage, setIsUploadingImage] = (0, import_react.useState)(false);
	const [activeRightTab, setActiveRightTab] = (0, import_react.useState)("assistant");
	const [chatMessages, setChatMessages] = (0, import_react.useState)([{
		role: "assistant",
		text: `Hello! I am your Studio Assistant. You can ask me to rewrite sections, generate SEO tags, change tone, or suggest titles for "${article.title}".`
	}]);
	const [chatInput, setChatInput] = (0, import_react.useState)("");
	const [isSendingChat, setIsSendingChat] = (0, import_react.useState)(false);
	const sanitizeContent = (raw) => {
		if (!raw) return "";
		let c = String(raw);
		try {
			const parsed = JSON.parse(c);
			if (typeof parsed === "string") c = parsed;
		} catch {}
		return c.replace(/\\\//g, "/").replace(/^"|"$/g, "");
	};
	const handleSave = async (targetStatus = status) => {
		setIsSaving(true);
		const parsedTags = tags.split(",").map((t) => t.trim()).filter(Boolean);
		try {
			await axios.put(`/articles/${article.id}`, {
				title,
				content,
				status: targetStatus,
				cover_image_path: coverImagePath,
				meta_description: metaDescription,
				seo_keywords: seoKeywords,
				ai_summary: aiSummary,
				tags: parsedTags
			});
			setStatus(targetStatus);
			toast.success(targetStatus === "published" ? "🚀 Article published live!" : "Draft saved successfully");
		} catch (err) {
			toast.error("Failed to save article.");
		} finally {
			setIsSaving(false);
		}
	};
	const handleImageUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setIsUploadingImage(true);
		const formData = new FormData();
		formData.append("image", file);
		try {
			setCoverImagePath((await axios.post("/upload-image", formData, { headers: { "Content-Type": "multipart/form-data" } })).data.url);
			toast.success("Cover image uploaded!");
		} catch (err) {
			toast.error("Image upload failed.");
		} finally {
			setIsUploadingImage(false);
		}
	};
	const handleSendChat = async (e) => {
		e.preventDefault();
		if (!chatInput.trim() || isSendingChat) return;
		const userMessage = chatInput;
		setChatInput("");
		setChatMessages((prev) => [...prev, {
			role: "user",
			text: userMessage
		}]);
		setIsSendingChat(true);
		try {
			const reply = (await axios.post("/api/studio-chat", {
				message: userMessage,
				article: {
					title,
					content,
					metaDescription,
					tags
				}
			})).data;
			if (reply.action === "update_title" && reply.new_title) {
				setTitle(reply.new_title);
				toast.info("Title updated by Assistant");
			} else if (reply.action === "update_content" && reply.new_content) {
				setContent(reply.new_content);
				toast.info("Content updated by Assistant");
			}
			setChatMessages((prev) => [...prev, {
				role: "assistant",
				text: reply.message || "Done! Check the editor."
			}]);
		} catch (err) {
			setChatMessages((prev) => [...prev, {
				role: "assistant",
				text: "Sorry, I hit an issue processing that instruction."
			}]);
		} finally {
			setIsSendingChat(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StudioLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: `Edit: ${article.title}` }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-16 z-30 bg-[#02040a]/90 backdrop-blur-xl border-b border-white/5 px-6 py-3 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link_default, {
						href: "/studio/articles",
						className: "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-3.5 h-3.5" }), "Archives"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gray-700",
						children: "|"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-black uppercase tracking-[0.25em] text-primary",
						children: "Advanced Editor"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
						href: `/article/${article.slug}`,
						target: "_blank",
						className: "p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all text-xs",
						title: "Preview Public Page",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-4 h-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleSave(status),
						disabled: isSaving,
						className: "px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2",
						children: [isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-3.5 h-3.5" }), "Save Draft"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleSave("published"),
						disabled: isSaving,
						className: "px-5 py-2 rounded-xl bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2",
						children: [isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), "Broadcast Live"]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col lg:flex-row min-h-[calc(100vh-8rem)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 p-8 md:p-12 space-y-8 max-w-4xl mx-auto w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "Article Title...",
						className: "w-full bg-transparent border-none text-4xl md:text-5xl font-black tracking-tighter text-white placeholder-gray-700 focus:outline-none focus:ring-0 leading-tight"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative",
						children: coverImagePath ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative rounded-3xl overflow-hidden border border-white/10 group h-64 bg-gray-900",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: coverImagePath,
								alt: "Cover Preview",
								className: "w-full h-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-black text-[10px] uppercase tracking-widest rounded-xl cursor-pointer transition-all",
									children: ["Change Image", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										onChange: handleImageUpload,
										accept: "image/*",
										className: "hidden"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCoverImagePath(""),
									className: "p-2 bg-rose-500/20 text-rose-400 rounded-xl hover:bg-rose-500/30 border border-rose-500/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col items-center justify-center h-44 rounded-3xl border-2 border-dashed border-white/10 hover:border-primary/40 bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors mb-2",
									children: isUploadingImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-5 h-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors",
									children: isUploadingImage ? "Uploading..." : "Drop or select cover image"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									onChange: handleImageUpload,
									accept: "image/*",
									className: "hidden"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white/[0.01] border border-white/5 rounded-3xl p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichEditor, {
							content: sanitizeContent(content),
							onChange: (newHtml) => setContent(newHtml)
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full lg:w-[380px] border-l border-white/5 bg-[#02040a] flex flex-col flex-shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex border-b border-white/5 bg-white/[0.01]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveRightTab("assistant"),
								className: `flex-1 py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeRightTab === "assistant" ? "text-primary border-b-2 border-primary bg-primary/5" : "text-gray-500 hover:text-white"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "w-3.5 h-3.5" }), "Assistant"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveRightTab("factcheck"),
								className: `flex-1 py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeRightTab === "factcheck" ? "text-amber-400 border-b-2 border-amber-400 bg-amber-400/5" : "text-gray-500 hover:text-white"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }), "Fact-Check"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveRightTab("seo"),
								className: `flex-1 py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeRightTab === "seo" ? "text-indigo-400 border-b-2 border-indigo-400 bg-indigo-400/5" : "text-gray-500 hover:text-white"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "w-3.5 h-3.5" }), "SEO & Meta"]
							})
						]
					}),
					activeRightTab === "assistant" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex flex-col justify-between p-4 space-y-4 overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide",
							children: [chatMessages.map((msg, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed font-light ${msg.role === "user" ? "bg-primary text-white font-bold" : "bg-white/[0.03] border border-white/5 text-gray-300"}`,
									children: msg.text
								})
							}, idx)), isSendingChat && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-primary font-bold p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }), "Assistant thinking..."]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSendChat,
							className: "flex gap-2 pt-2 border-t border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: chatInput,
								onChange: (e) => setChatInput(e.target.value),
								placeholder: "Command assistant...",
								className: "flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white placeholder-gray-600 focus:border-primary/50 outline-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: isSendingChat,
								className: "p-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" })
							})]
						})]
					}),
					activeRightTab === "factcheck" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 p-4 overflow-y-auto scrollbar-hide",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactCheckPanel, { articleId: article.id })
					}),
					activeRightTab === "seo" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 p-4 space-y-6 overflow-y-auto scrollbar-hide",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
								children: "AI Summary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: aiSummary,
								onChange: (e) => setAiSummary(e.target.value),
								className: "w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-medium text-white focus:border-primary/50 outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
								children: "Meta Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: metaDescription,
								onChange: (e) => setMetaDescription(e.target.value),
								className: "w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-medium text-white focus:border-primary/50 outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
								children: "SEO Keywords"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: seoKeywords,
								onChange: (e) => setSeoKeywords(e.target.value),
								className: "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-primary/50 outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
								children: "Tags (comma separated)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: tags,
								onChange: (e) => setTags(e.target.value),
								className: "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-primary/50 outline-none"
							})] })
						]
					})
				]
			})]
		})
	] });
}
//#endregion
export { ArticlesEdit as default };
