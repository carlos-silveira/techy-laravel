import { o as __toESM, t as __commonJSMin } from "./rolldown-runtime-BMI-E3GI.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-BEFDdCF_.mjs";
import { i as Link_default, l as axios, n as toast, o as useForm, r as Head_default } from "../ssr.mjs";
import { t as require_dayjs_min } from "./dayjs.min-SSZgMhAK.mjs";
import { n as motion, t as createLucideIcon } from "./createLucideIcon-Bszla4zf.mjs";
import { o as AnimatePresence, t as X } from "./x-DJSOnP0J.mjs";
import { t as getFinalImage } from "./utils-DGFN37UI.mjs";
import { n as BookOpen, t as AdsterraAd } from "./AdsterraAd-DGikf7sb.mjs";
import { n as ChevronDown, t as Send } from "./send-BkLYY7uF.mjs";
import { r as useLanguage } from "./RagCopilot-BGmdJSAn.mjs";
import { t as Clock } from "./clock-Cy9ZDtQ7.mjs";
import { t as Heart } from "./heart-BS0S4219.mjs";
import { t as Share2 } from "./share-2-B8DtyZm3.mjs";
import { n as Navbar } from "./PublicFooter-CccQpKzt.mjs";
import { t as CommandPalette } from "./CommandPalette-WzgbSQ9n.mjs";
import { t as require_relativeTime } from "./relativeTime-BPIBBbD4.mjs";
//#region node_modules/lucide-react/dist/esm/icons/message-circle.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MessageCircle = createLucideIcon("MessageCircle", [["path", {
	d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
	key: "vv11sd"
}]]);
//#endregion
//#region node_modules/dayjs/locale/es.js
var require_es = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, o) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = o(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], o) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_locale_es = o(e.dayjs);
	})(exports, (function(e) {
		"use strict";
		function o(e) {
			return e && "object" == typeof e && "default" in e ? e : { default: e };
		}
		var s = o(e), d = {
			name: "es",
			monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
			weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
			weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
			weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
			months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
			weekStart: 1,
			formats: {
				LT: "H:mm",
				LTS: "H:mm:ss",
				L: "DD/MM/YYYY",
				LL: "D [de] MMMM [de] YYYY",
				LLL: "D [de] MMMM [de] YYYY H:mm",
				LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
			},
			relativeTime: {
				future: "en %s",
				past: "hace %s",
				s: "unos segundos",
				m: "un minuto",
				mm: "%d minutos",
				h: "una hora",
				hh: "%d horas",
				d: "un día",
				dd: "%d días",
				M: "un mes",
				MM: "%d meses",
				y: "un año",
				yy: "%d años"
			},
			ordinal: function(e) {
				return e + "º";
			}
		};
		return s.default.locale(d, null, !0), d;
	}));
}));
//#endregion
//#region node_modules/dayjs/locale/en.js
var require_en = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, n) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_locale_en = n();
	})(exports, (function() {
		"use strict";
		return {
			name: "en",
			weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
			months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
			ordinal: function(e) {
				var n = [
					"th",
					"st",
					"nd",
					"rd"
				], t = e % 100;
				return "[" + e + (n[(t - 20) % 10] || n[t] || n[0]) + "]";
			}
		};
	}));
}));
//#endregion
//#region resources/js/Pages/Welcome.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
var import_relativeTime = /* @__PURE__ */ __toESM(require_relativeTime());
require_es();
require_en();
var import_jsx_runtime = require_jsx_runtime();
import_dayjs_min.default.extend(import_relativeTime.default);
var generateRandomName = () => `CyberUser${Math.floor(Math.random() * 9e3) + 1e3}`;
function ReelsDemo({ articles: initialArticlesData }) {
	const [articles, setArticles] = (0, import_react.useState)(initialArticlesData.data || []);
	const [nextPageUrl, setNextPageUrl] = (0, import_react.useState)(initialArticlesData.next_page_url);
	const [isLoadingMore, setIsLoadingMore] = (0, import_react.useState)(false);
	const loadMore = async () => {
		if (!nextPageUrl || isLoadingMore) return;
		setIsLoadingMore(true);
		try {
			const response = await axios.get(nextPageUrl, { headers: { "Accept": "application/json" } });
			setArticles((prev) => [...prev, ...response.data.data]);
			setNextPageUrl(response.data.next_page_url);
		} catch (error) {
			console.error("Failed to load more articles", error);
		} finally {
			setIsLoadingMore(false);
		}
	};
	const { __, locale } = useLanguage();
	import_dayjs_min.default.locale(locale);
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	const [activeCommentArticleId, setActiveCommentArticleId] = (0, import_react.useState)(null);
	const [likedArticles, setLikedArticles] = (0, import_react.useState)([]);
	const containerRef = (0, import_react.useRef)(null);
	const handleLike = async (articleId) => {
		const isLiked = likedArticles.includes(articleId);
		if (isLiked) setLikedArticles((prev) => prev.filter((id) => id !== articleId));
		else setLikedArticles((prev) => [...prev, articleId]);
		try {
			await axios.post(`/api/articles/${articleId}/like`);
		} catch (error) {
			toast.error("Failed to update like status");
			if (isLiked) setLikedArticles((prev) => [...prev, articleId]);
			else setLikedArticles((prev) => prev.filter((id) => id !== articleId));
		}
	};
	const handleScroll = (e) => {
		const container = e.target;
		const itemHeight = container.clientHeight;
		const newIndex = Math.round(container.scrollTop / itemHeight);
		if (newIndex !== activeIndex) setActiveIndex(newIndex);
		if (container.scrollHeight - container.scrollTop <= container.clientHeight * 3 && nextPageUrl && !isLoadingMore) loadMore();
	};
	const currentArticle = articles.find((a) => a.id === activeCommentArticleId) || null;
	const feedItems = [];
	let adCounter = 0;
	articles.forEach((article, idx) => {
		feedItems.push({
			type: "article",
			data: article
		});
		if ((idx + 1) % 3 === 0) feedItems.push({
			type: "ad",
			id: `ad-${adCounter++}`
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-black text-white h-screen w-screen overflow-hidden font-sans selection:bg-primary/30 relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: "TechyNews" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed top-0 left-0 w-full z-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, { transparent: true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: containerRef,
				className: "h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide scroll-smooth",
				onScroll: handleScroll,
				children: feedItems.map((item, index) => {
					const isActive = index === activeIndex;
					if (item.type === "ad") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-screen w-full snap-start snap-always relative flex flex-col items-center justify-center bg-[#02040a] border-y border-white/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-gray-500 uppercase tracking-widest mb-4",
								children: __("Advertisement")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-2 md:p-6 min-h-[400px] flex items-center justify-center mx-auto shadow-2xl overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdsterraAd, { type: "native" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-12 flex flex-col items-center justify-center animate-bounce opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-gray-400 font-bold tracking-widest uppercase mb-2",
									children: __("Keep Scrolling")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-6 h-6 text-gray-400" })]
							})
						]
					}, item.id);
					const article = item.data;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-screen w-full snap-start snap-always relative flex items-center justify-center bg-[#02040a]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 z-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: getFinalImage(article, 1200),
										alt: article.title,
										fetchpriority: index === 0 ? "high" : "auto",
										loading: index === 0 ? "eager" : "lazy",
										className: `w-full h-full object-cover transition-transform duration-[10s] ease-out ${isActive ? "scale-110" : "scale-100"}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/95" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/40" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 z-10 flex flex-col justify-end p-5 md:p-12 lg:p-24 pb-10 md:pb-16 pt-28 md:pt-32 w-full max-w-5xl mx-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 20
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: {
										once: false,
										amount: .5
									},
									transition: {
										duration: .5,
										delay: .2
									},
									className: "max-w-3xl pr-16 md:pr-20",
									children: [
										article.tags?.[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-2 px-3 py-1.5 mb-3 md:px-4 md:py-2 md:mb-4 text-[10px] font-black uppercase tracking-widest bg-primary/80 backdrop-blur-md rounded-full text-white shadow-lg border border-white/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 bg-white rounded-full animate-pulse" }), article.tags[0]]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "text-2xl md:text-5xl font-black tracking-tighter leading-tight md:leading-[1.1] mb-4 md:mb-6 text-white drop-shadow-lg",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
												href: `/article/${article.slug}`,
												className: "hover:text-primary transition-colors block",
												children: article.title
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-4 md:mb-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 md:p-5 rounded-2xl shadow-xl",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 mb-2 md:mb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 bg-amber-400 rounded-full animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-amber-400",
													children: __("TL;DR Summary")
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "space-y-2 md:space-y-3",
												children: (article.ai_summary || "").split(". ").slice(0, 3).map((sentence, i) => sentence && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "text-white text-lg md:text-xl font-medium leading-relaxed md:leading-loose flex items-start gap-3",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-primary mt-1 md:mt-1.5 text-xl md:text-2xl",
															children: "•"
														}),
														sentence,
														!sentence.endsWith(".") ? "." : ""
													]
												}, i))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-300",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-4 h-4 text-primary" }),
													article.reading_time_minutes || 5,
													" ",
													__("min read")
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "opacity-70 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5",
												children: (0, import_dayjs_min.default)(article.updated_at).fromNow()
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-5 md:mt-8",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link_default, {
												href: `/article/${article.slug}`,
												className: "inline-flex items-center gap-3 bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-black uppercase tracking-widest text-xs md:text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-5 h-5" }), __("Read Full Story")]
											})
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute right-3 bottom-16 md:right-12 md:bottom-24 z-20 flex flex-col gap-4 md:gap-6 items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
										icon: Heart,
										label: __("Like"),
										delay: .3,
										active: likedArticles.includes(article.id),
										onClick: () => handleLike(article.id)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
										icon: MessageCircle,
										label: article.comments?.length || "0",
										ariaLabel: __("Comments"),
										delay: .4,
										onClick: () => setActiveCommentArticleId(article.id)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
										icon: Share2,
										label: __("Share"),
										delay: .5,
										onClick: () => {
											if (navigator.share) navigator.share({
												title: article.title,
												url: window.location.origin + "/article/" + article.slug
											}).catch(console.error);
											else {
												navigator.clipboard.writeText(window.location.origin + "/article/" + article.slug);
												toast.success("Link copied to clipboard!");
											}
										}
									})
								]
							}),
							index === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: { opacity: 0 },
								animate: {
									opacity: 1,
									y: [
										0,
										8,
										0
									]
								},
								transition: {
									delay: 2,
									duration: 2,
									repeat: Infinity,
									ease: "easeInOut"
								},
								className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-50 pointer-events-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-black uppercase tracking-[0.2em] text-white drop-shadow-lg",
									children: __("Swipe")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-5 h-5 text-white drop-shadow-lg" })]
							})
						]
					}, article.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: activeCommentArticleId && currentArticle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					x: "100%"
				},
				animate: {
					opacity: 1,
					x: 0
				},
				exit: {
					opacity: 0,
					x: "100%"
				},
				transition: {
					type: "spring",
					damping: 25,
					stiffness: 200
				},
				className: "fixed inset-y-0 right-0 w-full md:w-96 bg-white dark:bg-[#0a0f1c] z-[120] shadow-2xl flex flex-col border-l border-black/10 dark:border-white/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-black uppercase tracking-widest text-sm text-black dark:text-white",
							children: [
								__("Comments"),
								" (",
								currentArticle.comments?.length || 0,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveCommentArticleId(null),
							className: "p-2 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5 text-black dark:text-white" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto p-6 space-y-6",
						children: currentArticle.comments && currentArticle.comments.length > 0 ? currentArticle.comments.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-black text-primary text-xs uppercase",
									children: c.username.substring(0, 2)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-xs text-black dark:text-white",
									children: c.username
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-gray-500",
									children: (0, import_dayjs_min.default)(c.created_at).fromNow()
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-700 dark:text-gray-300 font-light",
								children: c.body
							})] })]
						}, c.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center text-gray-500 text-sm mt-10 font-light",
							children: __("No comments yet. Be the first!")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-6 border-t border-black/10 dark:border-white/10 bg-gray-50 dark:bg-black",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommentForm, { articleId: currentArticle.id })
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: activeCommentArticleId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				onClick: () => setActiveCommentArticleId(null),
				className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-[110]"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {})
		]
	});
}
function CommentForm({ articleId }) {
	const { __ } = useLanguage();
	const { data, setData, post, processing, reset } = useForm({
		username: generateRandomName(),
		body: ""
	});
	const submit = (e) => {
		e.preventDefault();
		post(`/article/${articleId}/comment`, {
			preserveScroll: true,
			onSuccess: () => reset("body")
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "flex items-end gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 bg-white dark:bg-[#1a1f2e] rounded-xl border border-black/10 dark:border-white/10 overflow-hidden focus-within:border-primary transition-colors",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 py-2 border-b border-black/5 dark:border-white/5 bg-gray-50 dark:bg-white/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10px] font-black uppercase text-gray-500",
					children: [
						__("Posting as:"),
						" ",
						data.username
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: data.body,
				onChange: (e) => setData("body", e.target.value),
				placeholder: __("Add a comment..."),
				className: "w-full bg-transparent border-none focus:ring-0 text-sm p-3 resize-none text-black dark:text-white placeholder:text-gray-400",
				rows: "2",
				required: true
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "submit",
			disabled: processing || !data.body.trim(),
			className: "p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 flex-shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-5 h-5" })
		})]
	});
}
function ActionIcon({ icon: Icon, label, ariaLabel, delay, onClick, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
		type: "button",
		"aria-label": ariaLabel || String(label),
		initial: {
			opacity: 0,
			x: 20
		},
		whileInView: {
			opacity: 1,
			x: 0
		},
		viewport: {
			once: false,
			amount: .5
		},
		transition: {
			duration: .4,
			delay
		},
		className: "flex flex-col items-center gap-2 group cursor-pointer",
		onClick,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `w-10 h-10 md:w-14 md:h-14 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 md:group-hover:bg-primary/80 md:group-hover:border-primary transition-colors shadow-lg ${active ? "bg-primary/90 border-primary" : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `w-5 h-5 md:w-7 md:h-7 ${active ? "text-white fill-white" : "text-white"}` })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[8px] md:text-[10px] font-black text-white drop-shadow-md uppercase tracking-widest",
			children: label
		})]
	});
}
//#endregion
export { ReelsDemo as default };
