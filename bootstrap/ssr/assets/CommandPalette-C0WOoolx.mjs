import { useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, Search, X, Zap } from "lucide-react";
import axios from "axios";
//#region resources/js/Components/CommandPalette.jsx
function CommandPalette() {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const inputRef = useRef(null);
	useEffect(() => {
		const handleKeyDown = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setIsOpen((prev) => !prev);
			}
			if (e.key === "Escape") setIsOpen(false);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);
	useEffect(() => {
		if (isOpen && inputRef.current) {
			setTimeout(() => inputRef.current.focus(), 100);
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
			setQuery("");
			setResults([]);
			setActiveIndex(-1);
		}
	}, [isOpen]);
	useEffect(() => {
		if (!query || query.length < 2) {
			setResults([]);
			setIsLoading(false);
			return;
		}
		setIsLoading(true);
		const timer = setTimeout(async () => {
			try {
				setResults((await axios.get(`/api/search?q=${encodeURIComponent(query)}`)).data);
			} catch (error) {
				console.error("Search failed", error);
			} finally {
				setIsLoading(false);
			}
		}, 300);
		return () => clearTimeout(timer);
	}, [query]);
	return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: () => setIsOpen(false),
		className: "fixed inset-0 bg-black/70 backdrop-blur-md z-[9999]"
	}), /* @__PURE__ */ jsxs(motion.div, {
		initial: {
			opacity: 0,
			scale: .97,
			y: -20
		},
		animate: {
			opacity: 1,
			scale: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			scale: .97,
			y: -20
		},
		transition: {
			duration: .2,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		className: "fixed top-[8%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-[#02040a] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] rounded-3xl overflow-hidden z-[10000] flex flex-col",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center px-6 py-5 border-b border-white/5 gap-4",
				children: [
					isLoading ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin text-primary shrink-0" }) : /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 text-gray-600 shrink-0" }),
					/* @__PURE__ */ jsx("input", {
						ref: inputRef,
						type: "text",
						placeholder: "Search articles, topics, or AI summaries...",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						className: "flex-1 bg-transparent border-none text-lg text-white placeholder-gray-700 focus:outline-none focus:ring-0 font-light"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("kbd", {
							className: "text-[10px] font-black text-gray-600 bg-white/5 border border-white/5 px-2 py-1 rounded-lg font-mono",
							children: "ESC"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setIsOpen(false),
							className: "text-gray-600 hover:text-white transition-colors p-1",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "max-h-[55vh] overflow-y-auto p-3",
				children: [
					results.length === 0 && query.length >= 2 && !isLoading && /* @__PURE__ */ jsxs("div", {
						className: "text-center py-16 text-gray-600 flex flex-col items-center gap-3",
						children: [/* @__PURE__ */ jsx(Search, { className: "w-10 h-10 opacity-20" }), /* @__PURE__ */ jsxs("p", {
							className: "font-black text-xs uppercase tracking-widest",
							children: [
								"No results for \"",
								query,
								"\""
							]
						})]
					}),
					results.length === 0 && (!query || query.length < 2) && /* @__PURE__ */ jsxs("div", {
						className: "text-center py-16 text-gray-700 flex flex-col items-center gap-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center",
							children: /* @__PURE__ */ jsx(Zap, { className: "w-7 h-7 opacity-30 text-primary" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "font-black text-xs uppercase tracking-widest text-gray-600",
							children: "Start typing to search"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-[10px] text-gray-800 mt-1",
							children: "Articles, topics, AI summaries"
						})] })]
					}),
					results.map((article, index) => /* @__PURE__ */ jsxs(Link, {
						href: `/article/${article.slug}`,
						onClick: () => setIsOpen(false),
						className: `flex items-start p-4 rounded-2xl transition-all group mb-1 ${activeIndex === index ? "bg-white/10" : "hover:bg-white/[0.05]"}`,
						children: [
							article.cover_image_path ? /* @__PURE__ */ jsx("div", {
								className: "w-14 h-14 rounded-xl bg-cover bg-center shrink-0 mr-4 border border-white/5 shadow-xl",
								style: { backgroundImage: `url(${article.cover_image_path})` }
							}) : /* @__PURE__ */ jsx("div", {
								className: "w-14 h-14 rounded-xl bg-white/[0.03] border border-white/5 shrink-0 mr-4 flex items-center justify-center",
								children: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 text-gray-700" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "text-white font-black tracking-tight truncate group-hover:text-primary transition-colors text-base",
									children: article.title
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-gray-600 truncate mt-1 font-light",
									children: article.ai_summary || "Explore article"
								})]
							}),
							/* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-gray-800 group-hover:text-primary group-hover:translate-x-1 transition-all ml-3 shrink-0 self-center" })
						]
					}, article.id))
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white/[0.02] px-6 py-4 border-t border-white/5 flex justify-between items-center",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4 text-[10px] font-black text-gray-700 uppercase tracking-widest",
					children: [
						/* @__PURE__ */ jsx("span", { children: "↑↓ Navigate" }),
						/* @__PURE__ */ jsx("span", { children: "↵ Open" }),
						/* @__PURE__ */ jsx("span", { children: "ESC Close" })
					]
				}), /* @__PURE__ */ jsx("span", {
					className: "text-[10px] font-black text-gray-700 uppercase tracking-widest",
					children: "⌘K to toggle"
				})]
			})
		]
	})] }) });
}
//#endregion
export { CommandPalette as t };
