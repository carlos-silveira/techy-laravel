import { n as useLanguage } from "./ThemeToggle-z5uN9EoT.mjs";
import { n as Navbar, t as PublicFooter } from "./PublicFooter-BeZqIea8.mjs";
import { t as CommandPalette } from "./CommandPalette-C0WOoolx.mjs";
import { t as RagCopilot } from "./RagCopilot-CsH8uUGU.mjs";
import { t as AdSlot } from "./AdSlot-y4X_2aTT.mjs";
import React, { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { toast } from "sonner";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { motion, useMotionValue } from "framer-motion";
import { ArrowRight, BookOpen, Heart, Link as Link$1, Linkedin, Twitter } from "lucide-react";
import axios from "axios";
import dayjs from "dayjs";
import mermaid from "mermaid";
//#region resources/js/Pages/ArticleShow.jsx
function ArticleShow({ article, relatedArticles, auth }) {
	const { __ } = useLanguage();
	const [scrollProgress, setScrollProgress] = useState(0);
	const [likes, setLikes] = useState(article.likes_count || 0);
	const [isLiking, setIsLiking] = useState(false);
	const isAuthorized = !!auth?.user;
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const handleMouseMove = (e) => {
		mouseX.set(e.clientX);
		mouseY.set(e.clientY);
	};
	useEffect(() => {
		const handleScroll = () => {
			const totalScroll = document.documentElement.scrollTop;
			const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			setScrollProgress((windowHeight === 0 ? 0 : totalScroll / windowHeight) * 100);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const handleLike = async () => {
		if (isLiking) return;
		setIsLiking(true);
		try {
			setLikes((await axios.post(`/api/articles/${article.id}/like`)).data.likes_count);
			toast.success(__("Thanks for the applause!"));
		} catch {
			toast.error(__("Failed to register like."));
		} finally {
			setIsLiking(false);
		}
	};
	const handleShare = (platform) => {
		const url = window.location.href;
		const text = `${__("Read this incredible piece")}: ${article.title}`;
		if (platform === "twitter") window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
		else if (platform === "linkedin") window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
		else {
			navigator.clipboard.writeText(url);
			toast.success(__("Link copied to clipboard!"));
		}
	};
	/**
	* Recursively decode JSON-encoded strings and unescape slashes.
	*/
	const sanitizeContent = (raw) => {
		if (!raw) return "";
		let content = String(raw);
		if (content.trim().startsWith("\"") || content.trim().startsWith("{") || content.trim().startsWith("[")) try {
			let temp = content.trim();
			if (temp.startsWith("\"") && temp.endsWith("\"")) temp = temp.substring(1, temp.length - 1);
			const parsed = JSON.parse(content);
			if (typeof parsed === "string") return sanitizeContent(parsed);
			if (parsed && typeof parsed === "object" && parsed.type === "doc") return null;
			if (typeof parsed === "string") content = parsed;
		} catch {}
		content = content.replace(/\\\\\//g, "/").replace(/\\/g, "");
		if (content.startsWith("\"") && content.endsWith("\"")) content = content.substring(1, content.length - 1);
		content = content.replace(/\\n/g, "").replace(/\\r/g, "");
		return content;
	};
	/**
	* Helper to find the first image in the content (HTML string or JSON object).
	*/
	const findFirstImage = (content) => {
		if (!content) return null;
		if (typeof content === "string") {
			const match = content.match(/<img[^>]+src="([^">]+)"/);
			if (match) return match[1];
			return null;
		}
		if (typeof content === "object") {
			if (content.type === "image" && content.attrs?.src) return content.attrs.src;
			if (content.content && Array.isArray(content.content)) for (const node of content.content) {
				const found = findFirstImage(node);
				if (found) return found;
			}
		}
		return null;
	};
	const getFinalImage = (article, width = 1600) => {
		let url = article.cover_image_path;
		if (!url) url = findFirstImage(article.content);
		if (!url) url = article.slug.includes("not-paid-to-write-code") ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085" : "https://images.unsplash.com/photo-1451187580459-43490279c0fa";
		if (url && url.includes("unsplash.com")) {
			const separator = url.includes("?") ? "&" : "?";
			return `${url}${separator}auto=format&fit=crop&q=80&w=${width}`;
		}
		return url;
	};
	const finalCoverImage = getFinalImage(article);
	const cleanHtml = typeof article.content === "string" ? sanitizeContent(article.content) : null;
	const parsedContent = typeof article.content === "string" && !cleanHtml ? (() => {
		try {
			return JSON.parse(article.content);
		} catch {
			return {
				type: "doc",
				content: []
			};
		}
	})() : article.content || {
		type: "doc",
		content: []
	};
	const contentString = typeof article.content === "string" ? article.content : JSON.stringify(article.content);
	const estimatedReadTime = article.reading_time_minutes || Math.max(1, Math.ceil(contentString.split(" ").length / 200));
	return /* @__PURE__ */ jsxs("div", {
		onMouseMove: handleMouseMove,
		className: "min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-black dark:text-white font-sans selection:bg-primary/30 relative overflow-hidden transition-colors duration-500",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "fixed top-0 left-0 w-full h-[3px] z-[100] bg-black/5 dark:bg-white/5",
				children: /* @__PURE__ */ jsx(motion.div, {
					className: "h-full bg-gradient-to-r from-primary via-purple-500 to-primary",
					style: {
						width: `${scrollProgress}%`,
						boxShadow: scrollProgress > 0 ? "0 0 10px rgba(43,124,238,0.5)" : "none"
					},
					transition: {
						type: "spring",
						stiffness: 100,
						damping: 30
					}
				})
			}),
			/* @__PURE__ */ jsxs(Head, { children: [
				/* @__PURE__ */ jsx("title", { children: `${article.title} | TechyNews` }),
				/* @__PURE__ */ jsx("meta", {
					name: "description",
					content: article.meta_description || article.ai_summary || `${__("Read")} ${article.title} ${__("on Techy News")}.`
				}),
				/* @__PURE__ */ jsx("link", {
					rel: "canonical",
					href: `https://techynews.lat/article/${article.slug}`
				}),
				/* @__PURE__ */ jsx("meta", {
					property: "og:title",
					content: article.title
				}),
				/* @__PURE__ */ jsx("meta", {
					property: "og:type",
					content: "article"
				}),
				/* @__PURE__ */ jsx("meta", {
					property: "og:image",
					content: finalCoverImage
				}),
				/* @__PURE__ */ jsx("meta", {
					property: "og:url",
					content: `https://techynews.lat/article/${article.slug}`
				}),
				/* @__PURE__ */ jsx("meta", {
					property: "og:description",
					content: article.ai_summary || article.meta_description || ""
				}),
				/* @__PURE__ */ jsx("meta", {
					property: "og:site_name",
					content: "TechyNews"
				}),
				/* @__PURE__ */ jsx("meta", {
					name: "twitter:card",
					content: "summary_large_image"
				}),
				/* @__PURE__ */ jsx("meta", {
					name: "twitter:title",
					content: article.title
				}),
				/* @__PURE__ */ jsx("meta", {
					name: "twitter:description",
					content: article.ai_summary || article.meta_description || ""
				}),
				/* @__PURE__ */ jsx("meta", {
					name: "twitter:image",
					content: finalCoverImage
				}),
				/* @__PURE__ */ jsx("meta", {
					name: "twitter:site",
					content: "@TechyNewsLat"
				}),
				/* @__PURE__ */ jsx("script", {
					type: "application/ld+json",
					children: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "NewsArticle",
						"headline": article.title,
						"image": [finalCoverImage],
						"datePublished": article.created_at,
						"dateModified": article.updated_at || article.created_at,
						"author": [{
							"@type": "Organization",
							"name": "TechyNews",
							"url": "https://techynews.lat"
						}],
						"publisher": {
							"@type": "Organization",
							"name": "TechyNews",
							"logo": {
								"@type": "ImageObject",
								"url": "https://techynews.lat/img/logo_wbc.png"
							}
						},
						"description": article.ai_summary || article.meta_description || "",
						"mainEntityOfPage": {
							"@type": "WebPage",
							"@id": `https://techynews.lat/article/${article.slug}`
						}
					})
				})
			] }),
			/* @__PURE__ */ jsx(CommandPalette, {}),
			/* @__PURE__ */ jsx("div", {
				className: "fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-purple-600 z-[100] transition-all duration-150 ease-out",
				style: { width: `${scrollProgress}%` }
			}),
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsxs("main", {
				className: "max-w-4xl mx-auto px-6 py-20 relative z-10",
				children: [
					/* @__PURE__ */ jsxs(motion.article, {
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .8,
							ease: [
								.16,
								1,
								.3,
								1
							]
						},
						children: [
							/* @__PURE__ */ jsxs("header", {
								className: "mb-16",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-8",
										children: [
											/* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4" }),
											" ",
											__("Synthesized Discovery")
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "w-full aspect-[21/9] md:aspect-[2.5/1] rounded-3xl overflow-hidden mb-12 shadow-2xl relative group bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10",
										children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 z-10 transition-colors duration-500 pointer-events-none" }), /* @__PURE__ */ jsx("img", {
											src: finalCoverImage,
											alt: article.title,
											className: "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
										})]
									}),
									/* @__PURE__ */ jsx("h1", {
										className: "text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-8 leading-[1.1] text-gray-900 dark:text-white transition-colors",
										children: article.title
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap items-center gap-4 md:gap-6 text-xs font-black uppercase tracking-widest text-gray-600 dark:text-gray-500",
										children: [
											/* @__PURE__ */ jsx("span", { children: dayjs(article.updated_at).format("MMMM D, YYYY") }),
											/* @__PURE__ */ jsx("span", { className: "hidden md:inline-block w-1 h-1 bg-gray-300 dark:bg-gray-800 rounded-full" }),
											/* @__PURE__ */ jsxs("span", { children: [
												estimatedReadTime,
												" ",
												__("min read")
											] }),
											/* @__PURE__ */ jsx("span", { className: "hidden md:inline-block w-1 h-1 bg-gray-300 dark:bg-gray-800 rounded-full" }),
											/* @__PURE__ */ jsx("span", {
												className: "text-primary/70 uppercase",
												children: __("Intelligent Draft")
											})
										]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-12 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-[60] flex md:flex-col items-center gap-6 bg-white/90 dark:bg-white/[0.05] backdrop-blur-2xl border border-black/5 dark:border-white/10 py-3 px-6 md:py-8 md:px-4 rounded-full shadow-2xl transition-all duration-300",
								children: [
									isAuthorized && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Link, {
										href: "/dashboard",
										className: "p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all",
										title: __("Edit Article"),
										children: /* @__PURE__ */ jsx("svg", {
											className: "w-5 h-5",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ jsx("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 012.828 0L21 8.586a2 2 0 010 2.828l-10.586 10.586a2 2 0 01-0.707.293l-3.992.399 0.399-3.992a2 2 0 010.293-0.707L17.586 3.414z"
											})
										})
									}), /* @__PURE__ */ jsx("div", { className: "w-[1px] h-6 md:w-6 md:h-[1px] bg-black/5 dark:bg-white/10" })] }),
									/* @__PURE__ */ jsxs("button", {
										onClick: handleLike,
										className: "group flex flex-col items-center gap-1 transition-transform active:scale-95",
										children: [/* @__PURE__ */ jsx(Heart, { className: `w-6 h-6 transition-colors ${likes > 0 ? "fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "text-gray-500 group-hover:text-black dark:group-hover:text-white"}` }), likes > 0 && /* @__PURE__ */ jsx("span", {
											className: "text-[10px] font-black text-gray-500 dark:text-gray-400",
											children: likes
										})]
									}),
									/* @__PURE__ */ jsx("div", { className: "w-[1px] h-6 md:w-6 md:h-[1px] bg-black/5 dark:bg-white/10" }),
									/* @__PURE__ */ jsx("button", {
										onClick: () => handleShare("twitter"),
										className: "text-gray-500 hover:text-primary transition-colors",
										children: /* @__PURE__ */ jsx(Twitter, { className: "w-5 h-5" })
									}),
									/* @__PURE__ */ jsx("button", {
										onClick: () => handleShare("linkedin"),
										className: "text-gray-500 hover:text-primary transition-colors",
										children: /* @__PURE__ */ jsx(Linkedin, { className: "w-5 h-5" })
									}),
									/* @__PURE__ */ jsx("button", {
										onClick: () => handleShare("copy"),
										className: "text-gray-500 hover:text-black dark:hover:text-white transition-colors",
										children: /* @__PURE__ */ jsx(Link$1, { className: "w-5 h-5" })
									})
								]
							}),
							article.ai_summary && /* @__PURE__ */ jsxs("div", {
								className: "mb-16 p-10 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] relative overflow-hidden group",
								children: [
									/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110" }),
									/* @__PURE__ */ jsxs("h3", {
										className: "text-primary font-black text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2 relative z-10",
										children: [/* @__PURE__ */ jsx("svg", {
											className: "w-4 h-4",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ jsx("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2.5,
												d: "M13 10V3L4 14h7v7l9-11h-7z"
											})
										}), __("Executive Summary")]
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "text-xl text-gray-700 dark:text-gray-300 font-light leading-relaxed relative z-10 italic",
										children: [
											"\"",
											article.ai_summary,
											"\""
										]
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "prose dark:prose-invert prose-primary max-w-none prose-lg prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-black dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:font-light prose-p:leading-relaxed prose-strong:text-black dark:prose-strong:text-white prose-a:text-primary hover:prose-a:text-black dark:hover:prose-a:text-white prose-code:text-emerald-600 dark:prose-code:text-emerald-400 prose-pre:bg-gray-100 dark:prose-pre:bg-white/[0.03] prose-pre:border prose-pre:border-black/10 dark:prose-pre:border-white/10 prose-pre:rounded-2xl transition-colors",
								children: cleanHtml ? /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: cleanHtml } }) : /* @__PURE__ */ jsx(TipTapRenderer, { content: parsedContent })
							})
						]
					}),
					/* @__PURE__ */ jsx(AdSlot, { className: "mt-20 mb-8" }),
					relatedArticles && relatedArticles.length > 0 && /* @__PURE__ */ jsxs("section", {
						className: "mt-40 pt-20 border-t border-black/5 dark:border-white/5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between mb-12",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-4xl font-black tracking-tighter text-gray-900 dark:text-white",
								children: __("Read Next.")
							}), /* @__PURE__ */ jsxs(Link, {
								href: "/archive",
								className: "text-xs font-black uppercase tracking-widest text-primary hover:text-black dark:hover:text-white transition-colors flex items-center gap-2",
								children: [
									__("Explorer Library"),
									" ",
									/* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
								]
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-8",
							children: relatedArticles.map((related) => /* @__PURE__ */ jsx(Link, {
								href: `/article/${related.slug}`,
								className: "group block h-full",
								children: /* @__PURE__ */ jsxs("div", {
									className: "bg-white dark:bg-white/[0.03] rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/10 group-hover:border-primary/30 transition-all p-6 h-full flex flex-col shadow-sm dark:shadow-none",
									children: [/* @__PURE__ */ jsx("div", {
										className: "h-40 rounded-2xl bg-cover bg-center mb-6 shadow-xl",
										style: { backgroundImage: `url(${related.cover_image_path || findFirstImage(related.content) || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072"})` }
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col flex-1",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "text-[10px] font-black text-primary uppercase tracking-widest mb-3",
												children: dayjs(related.updated_at).format("MMM D, YYYY")
											}),
											/* @__PURE__ */ jsx("h3", {
												className: "text-xl font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 mb-3 leading-tight tracking-tight",
												children: related.title
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-sm text-gray-600 dark:text-gray-500 font-light line-clamp-2 leading-relaxed",
												children: related.ai_summary
											})
										]
									})]
								})
							}, related.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx(PublicFooter, { className: "mt-20" }),
			/* @__PURE__ */ jsx(RagCopilot, {})
		]
	});
}
var TipTapRenderer = ({ content }) => {
	React.useEffect(() => {
		mermaid.initialize({
			startOnLoad: true,
			theme: document.documentElement.classList.contains("dark") ? "dark" : "default"
		});
		mermaid.contentLoaded();
	}, [content]);
	React.useEffect(() => {
		const loadPrism = async () => {
			if (!window.Prism) {
				await new Promise((resolve) => {
					const script = document.createElement("script");
					script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js";
					script.async = true;
					script.onload = resolve;
					document.body.appendChild(script);
				});
				for (const dep of ["markup-templating"]) await new Promise((resolve) => {
					const script = document.createElement("script");
					script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${dep}.min.js`;
					script.async = true;
					script.onload = resolve;
					script.onerror = resolve;
					document.body.appendChild(script);
				});
				for (const lang of [
					"javascript",
					"php",
					"css",
					"markup",
					"bash",
					"python",
					"json"
				]) await new Promise((resolve) => {
					const langScript = document.createElement("script");
					langScript.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`;
					langScript.async = true;
					langScript.onload = resolve;
					document.body.appendChild(langScript);
				});
				const style = document.createElement("link");
				style.rel = "stylesheet";
				style.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css";
				document.head.appendChild(style);
			}
			window.Prism?.highlightAll();
		};
		loadPrism();
	}, [content]);
	if (!content) return null;
	if (typeof content === "string") return /* @__PURE__ */ jsx("div", {
		className: "whitespace-pre-wrap",
		children: content
	});
	if (!content.content) return null;
	const renderNode = (node, index) => {
		if (node.type === "text") {
			let element = /* @__PURE__ */ jsx(React.Fragment, { children: node.text }, index);
			if (node.marks) node.marks.forEach((mark) => {
				if (mark.type === "bold") element = /* @__PURE__ */ jsx("strong", { children: element }, `bold-${index}`);
				if (mark.type === "italic") element = /* @__PURE__ */ jsx("em", { children: element }, `italic-${index}`);
				if (mark.type === "strike") element = /* @__PURE__ */ jsx("del", { children: element }, `strike-${index}`);
				if (mark.type === "code") element = /* @__PURE__ */ jsx("code", {
					className: "bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-primary font-bold",
					children: element
				}, `code-${index}`);
			});
			return element;
		}
		switch (node.type) {
			case "paragraph": return /* @__PURE__ */ jsx("p", {
				className: "mb-8",
				children: node.content?.map((n, i) => renderNode(n, i))
			}, index);
			case "heading": return /* @__PURE__ */ jsx(`h${node.attrs?.level || 2}`, {
				className: `font-black mt-16 mb-6 tracking-tighter leading-tight text-black dark:text-white ${node.attrs?.level === 1 ? "text-4xl" : node.attrs?.level === 2 ? "text-3xl" : "text-2xl"}`,
				children: node.content?.map((n, i) => renderNode(n, i))
			}, index);
			case "bulletList": return /* @__PURE__ */ jsx("ul", {
				className: "list-disc pl-8 mb-8 space-y-4",
				children: node.content?.map((n, i) => renderNode(n, i))
			}, index);
			case "listItem": return /* @__PURE__ */ jsx("li", {
				className: "pl-2",
				children: node.content?.map((n, i) => renderNode(n, i))
			}, index);
			case "codeBlock":
				if (node.attrs?.language === "mermaid") return /* @__PURE__ */ jsx("div", {
					className: "mermaid bg-white dark:bg-[#0d1117] p-6 rounded-2xl border border-black/5 dark:border-white/10 mb-8 my-10 overflow-auto",
					children: node.content?.[0]?.text
				}, index);
				const codeContent = node.content?.map((n) => n.text).join("") || "";
				return /* @__PURE__ */ jsxs("div", {
					className: "group relative my-10",
					children: [/* @__PURE__ */ jsx("div", {
						className: "absolute -top-3 left-6 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg z-10 shadow-lg shadow-primary/20",
						children: node.attrs?.language || "code"
					}), /* @__PURE__ */ jsx("pre", {
						className: "bg-gray-100 dark:bg-white/[0.03] p-8 pt-10 rounded-[1.5rem] border border-black/10 dark:border-white/10 mb-8 overflow-auto group-hover:border-primary/30 transition-all duration-500 scrollbar-thin scrollbar-thumb-primary/20",
						children: /* @__PURE__ */ jsx("code", {
							className: `language-${node.attrs?.language} text-sm text-gray-900 dark:text-gray-300 leading-relaxed block whitespace-pre`,
							children: codeContent
						})
					})]
				}, index);
			case "blockquote": return /* @__PURE__ */ jsx("blockquote", {
				className: "border-l-4 border-primary pl-6 py-2 my-8 italic text-gray-700 dark:text-gray-300 bg-primary/5 rounded-r-xl",
				children: node.content?.map((n, i) => renderNode(n, i))
			}, index);
			default: return null;
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "tiptap-content",
		children: content.content.map((node, i) => renderNode(node, i))
	});
};
//#endregion
export { ArticleShow as default };
