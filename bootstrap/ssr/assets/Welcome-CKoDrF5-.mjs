import { n as useLanguage } from "./ThemeToggle-z5uN9EoT.mjs";
import { n as Navbar, t as PublicFooter } from "./PublicFooter-sNtPJ36C.mjs";
import { t as CommandPalette } from "./CommandPalette-C0WOoolx.mjs";
import { t as RagCopilot } from "./RagCopilot-CsH8uUGU.mjs";
import { t as AdSlot } from "./AdSlot-y4X_2aTT.mjs";
import { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { toast } from "sonner";
import { jsx, jsxs } from "react/jsx-runtime";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Clock, Zap } from "lucide-react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
//#region resources/js/Pages/Welcome.jsx
dayjs.extend(relativeTime);
/**
* Helper to find the first image in the content (HTML string or JSON object).
*/
var findFirstImage = (content) => {
	if (!content) return null;
	if (typeof content === "string") {
		const match = content.match(/<img[^>]+src="([^">]+)"/);
		if (match) return match[1];
		try {
			return findFirstImage(JSON.parse(content));
		} catch {
			return null;
		}
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
var getFinalImage = (article, width = 1200) => {
	let url = article.cover_image_path;
	if (!url) url = findFirstImage(article.content);
	if (!url) url = article.slug.includes("not-paid-to-write-code") ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085" : "https://images.unsplash.com/photo-1451187580459-43490279c0fa";
	if (url.includes("unsplash.com")) {
		const separator = url.includes("?") ? "&" : "?";
		return `${url}${separator}auto=format&fit=crop&q=80&w=${width}`;
	}
	return url;
};
function Welcome({ articles, editorsChoice, dailyBrief, trendingArticles }) {
	const { __ } = useLanguage();
	const { scrollYProgress } = useScroll();
	const [isScrolled, setIsScrolled] = useState(false);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const smoothX = useSpring(mouseX, {
		damping: 50,
		stiffness: 400
	});
	const smoothY = useSpring(mouseY, {
		damping: 50,
		stiffness: 400
	});
	useEffect(() => {
		const handleMouseMove = (e) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [mouseX, mouseY]);
	const backgroundGlow = useMotionTemplate`radial-gradient(900px circle at ${smoothX}px ${smoothY}px, rgba(43, 124, 238, 0.06), transparent 80%)`;
	const [email, setEmail] = useState("");
	const [isSubscribing, setIsSubscribing] = useState(false);
	const handleSubscribe = async (e) => {
		e.preventDefault();
		if (!email) return;
		setIsSubscribing(true);
		try {
			await axios.post("/api/subscribe", { email });
			toast.success(__("You're on the list!"));
			setEmail("");
		} catch (error) {
			toast.error(__("Subscription failed. Please try again."));
		} finally {
			setIsSubscribing(false);
		}
	};
	const featured = articles?.[0];
	const gridArticles = articles?.slice(1).filter((a) => !editorsChoice?.some((ec) => ec.id === a.id)).slice(0, 6) || [];
	articles?.slice(0, 8);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-black dark:text-white font-sans selection:bg-primary/30 overflow-x-hidden transition-colors duration-500",
		children: [
			/* @__PURE__ */ jsxs(Head, {
				title: `${__("Home")} — Techy News — AI-Powered Tech Intelligence`,
				children: [
					/* @__PURE__ */ jsx("meta", {
						name: "description",
						content: "A cutting-edge, AI-powered journalism platform delivering deep technical research and automated synthesis of global tech news."
					}),
					/* @__PURE__ */ jsx("meta", {
						property: "og:title",
						content: "Techy News — AI-Powered Tech Intelligence"
					}),
					/* @__PURE__ */ jsx("meta", {
						property: "og:description",
						content: "A cutting-edge, AI-powered journalism platform delivering deep technical research and automated synthesis of global tech news."
					}),
					/* @__PURE__ */ jsx("meta", {
						property: "og:type",
						content: "website"
					}),
					/* @__PURE__ */ jsx("meta", {
						property: "og:url",
						content: "https://techynews.lat"
					}),
					/* @__PURE__ */ jsx("meta", {
						property: "og:image",
						content: "https://techynews.lat/img/logo_wbc.png"
					}),
					/* @__PURE__ */ jsx("meta", {
						property: "og:site_name",
						content: "Techy News"
					}),
					/* @__PURE__ */ jsx("meta", {
						name: "twitter:card",
						content: "summary"
					}),
					/* @__PURE__ */ jsx("meta", {
						name: "twitter:site",
						content: "@TechyNewsLat"
					}),
					/* @__PURE__ */ jsx("meta", {
						name: "twitter:title",
						content: "Techy News — AI-Powered Tech Intelligence"
					}),
					/* @__PURE__ */ jsx("meta", {
						name: "twitter:description",
						content: "AI-powered journalism platform delivering deep technical research and automated synthesis of global tech news."
					})
				]
			}),
			/* @__PURE__ */ jsx(CommandPalette, {}),
			/* @__PURE__ */ jsx(motion.div, {
				className: "pointer-events-none fixed inset-0 z-0 transition-opacity duration-300",
				style: { background: backgroundGlow }
			}),
			/* @__PURE__ */ jsx("div", { className: "fixed top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-primary/8 rounded-full blur-[200px] pointer-events-none mix-blend-screen z-0" }),
			/* @__PURE__ */ jsx("div", { className: "fixed bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/8 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0" }),
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsxs("main", {
				className: "relative z-10",
				children: [
					/* @__PURE__ */ jsxs("section", {
						className: "relative flex flex-col justify-center overflow-hidden mb-12 z-20 min-h-[90vh]",
						children: [featured && /* @__PURE__ */ jsxs(motion.div, {
							className: "absolute inset-0",
							style: { scale: useTransform(scrollYProgress, [0, .3], [1.05, 1]) },
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110",
									style: { backgroundImage: `url(${getFinalImage(featured, 1600)})` }
								}),
								/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#f8f6f6] dark:from-[#02040a] via-[#f8f6f6]/80 dark:via-[#02040a]/80 to-transparent" }),
								/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#f8f6f6]/95 dark:from-[#02040a]/95 via-[#f8f6f6]/70 dark:via-[#02040a]/70 to-transparent" })
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "relative z-30 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full flex flex-col min-h-[85vh] justify-center",
							children: /* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center",
								children: [/* @__PURE__ */ jsx("div", {
									className: "lg:col-span-7 order-2 lg:order-1",
									children: featured && /* @__PURE__ */ jsxs(motion.div, {
										initial: {
											opacity: 0,
											x: -40
										},
										animate: {
											opacity: 1,
											x: 0
										},
										transition: {
											duration: 1,
											ease: [
												.16,
												1,
												.3,
												1
											],
											delay: .2
										},
										children: [
											/* @__PURE__ */ jsxs(motion.div, {
												initial: {
													opacity: 0,
													scale: .9
												},
												animate: {
													opacity: 1,
													scale: 1
												},
												transition: {
													duration: .8,
													delay: .1
												},
												className: "inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-8 backdrop-blur-md",
												children: [/* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(43,124,238,0.8)]" }), /* @__PURE__ */ jsx("span", {
													className: "text-[10px] font-black uppercase tracking-[0.3em] text-primary",
													children: __("Featured Story")
												})]
											}),
											/* @__PURE__ */ jsx(Link, {
												href: `/article/${featured.slug}`,
												children: /* @__PURE__ */ jsx("h1", {
													className: "text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] mb-6 text-black dark:text-white hover:text-primary transition-colors duration-500 cursor-pointer drop-shadow-md",
													children: featured.title
												})
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-lg md:text-xl lg:text-2xl text-gray-800 dark:text-gray-200 font-light leading-relaxed mb-10 max-w-2xl drop-shadow-sm",
												children: featured.ai_summary
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8",
												children: [/* @__PURE__ */ jsxs(Link, {
													href: `/article/${featured.slug}`,
													className: "inline-flex items-center justify-center gap-3 bg-primary text-white font-black px-8 py-4 rounded-full hover:scale-105 hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(43,124,238,0.4)] uppercase tracking-wider text-sm group",
													children: [__("Read Story"), /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })]
												}), /* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-3 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-widest bg-white/40 dark:bg-black/40 backdrop-blur-md px-5 py-3.5 rounded-full border border-black/5 dark:border-white/10 shadow-sm",
													children: [
														/* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-primary" }),
														featured.reading_time_minutes || "5",
														" ",
														__("min read"),
														/* @__PURE__ */ jsx("span", {
															className: "mx-1 opacity-50",
															children: "|"
														}),
														dayjs(featured.updated_at).fromNow()
													]
												})]
											})
										]
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "lg:col-span-5 order-1 lg:order-2",
									children: [dailyBrief && /* @__PURE__ */ jsxs(motion.div, {
										initial: {
											opacity: 0,
											scale: .95
										},
										animate: {
											opacity: 1,
											scale: 1
										},
										transition: {
											duration: .8,
											delay: .3
										},
										className: "relative group h-full",
										children: [/* @__PURE__ */ jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" }), /* @__PURE__ */ jsxs("div", {
											className: "relative bg-white/70 dark:bg-[#0a0f1c]/80 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden h-full",
											children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" }), /* @__PURE__ */ jsxs("div", {
												className: "relative z-10",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between mb-8 border-b border-black/5 dark:border-white/10 pb-6",
														children: [/* @__PURE__ */ jsxs("div", {
															className: "flex items-center gap-4",
															children: [/* @__PURE__ */ jsxs("div", {
																className: "relative",
																children: [/* @__PURE__ */ jsx("div", {
																	className: "w-12 h-12 rounded-xl bg-black dark:bg-white/5 flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500",
																	children: /* @__PURE__ */ jsx(Zap, { className: "w-6 h-6 text-primary" })
																}), /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#0a0f1c] animate-pulse" })]
															}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
																className: "text-xs font-black uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400",
																children: __("Intelligence Feed")
															}), /* @__PURE__ */ jsxs("div", {
																className: "flex items-center gap-2 mt-1",
																children: [/* @__PURE__ */ jsx("span", {
																	className: "text-sm font-black text-black dark:text-white tracking-tighter uppercase",
																	children: __("Daily Briefing")
																}), /* @__PURE__ */ jsx("span", { className: "inline-block w-1.5 h-4 bg-primary/40 animate-[blink_1s_infinite]" })]
															})] })]
														}), /* @__PURE__ */ jsxs("div", {
															className: "hidden sm:flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5",
															children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" }), /* @__PURE__ */ jsx("span", {
																className: "text-[9px] font-black uppercase tracking-widest text-gray-500",
																children: "Live AI Output"
															})]
														})]
													}),
													/* @__PURE__ */ jsx("div", {
														className: "prose prose-sm dark:prose-invert max-w-none \n                          prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:font-light prose-p:leading-relaxed\n                          prose-strong:text-black dark:prose-strong:text-white prose-strong:font-black prose-strong:uppercase prose-strong:tracking-widest prose-strong:text-[10px]\n                          prose-ul:list-none prose-ul:p-0 prose-li:p-0 prose-li:mb-4\n                          prose-a:no-underline prose-a:text-primary prose-a:font-bold hover:prose-a:text-primary/80 transition-colors\n                          [&_li]:relative [&_li]:pl-6 [&_li]:before:content-['>'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-primary/60 [&_li]:before:font-black [&_li]:before:text-[10px]\n                        ",
														children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: dailyBrief } })
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between",
														children: [/* @__PURE__ */ jsxs("div", {
															className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest italic font-mono",
															children: ["ST-ID: ", Math.random().toString(36).substring(7).toUpperCase()]
														}), /* @__PURE__ */ jsxs("div", {
															className: "text-[10px] font-black text-primary/60 uppercase tracking-widest",
															children: [dayjs().format("HH:mm:ss"), " UTC"]
														})]
													})
												]
											})]
										})]
									}), trendingArticles?.length > 0 && /* @__PURE__ */ jsxs(motion.div, {
										initial: {
											opacity: 0,
											y: 20
										},
										whileInView: {
											opacity: 1,
											y: 0
										},
										viewport: { once: true },
										transition: {
											duration: .8,
											delay: .2
										},
										className: "mt-8 pt-8 border-t border-black/5 dark:border-white/5",
										children: [/* @__PURE__ */ jsxs("h3", {
											className: "text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-2",
											children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-primary rounded-full animate-pulse" }), __("Trending Now")]
										}), /* @__PURE__ */ jsx("div", {
											className: "space-y-6",
											children: trendingArticles.map((article, index) => /* @__PURE__ */ jsxs(Link, {
												href: `/article/${article.slug}`,
												className: "flex gap-4 group/item",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "text-2xl font-black text-black/10 dark:text-white/10 group-hover/item:text-primary/40 transition-colors leading-none font-mono",
													children: ["0", index + 1]
												}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
													className: "text-sm font-bold text-gray-900 dark:text-gray-100 group-hover/item:text-primary transition-colors line-clamp-2 leading-snug",
													children: article.title
												}), /* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-2 mt-1 text-[9px] font-black uppercase tracking-widest text-gray-500",
													children: [article.reading_time_minutes || 5, " MIN READ"]
												})] })]
											}, article.id))
										})]
									})]
								})]
							})
						})]
					}),
					editorsChoice && editorsChoice.length > 0 && /* @__PURE__ */ jsx("section", {
						className: "py-24 px-6 max-w-7xl mx-auto",
						children: /* @__PURE__ */ jsx(motion.div, {
							initial: {
								opacity: 0,
								y: 40
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							className: "grid grid-cols-1 md:grid-cols-3 gap-8",
							children: editorsChoice.map((article, index) => /* @__PURE__ */ jsx(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: { delay: index * .1 },
								children: /* @__PURE__ */ jsx(Link, {
									href: `/article/${article.slug}`,
									className: "group block",
									children: /* @__PURE__ */ jsxs("div", {
										className: "relative rounded-[2rem] overflow-hidden bg-white/[0.6] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 group-hover:border-amber-400/30 transition-all duration-500 shadow-sm dark:shadow-none",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "h-52 bg-gradient-to-br from-white/10 to-black/50 bg-cover bg-center relative overflow-hidden",
											style: { backgroundImage: `url(${getFinalImage(article, 600)})` },
											children: [
												/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#02040a] to-transparent opacity-60" }),
												/* @__PURE__ */ jsx("div", { className: "absolute inset-0 group-hover:bg-amber-400/5 transition-colors duration-500" }),
												/* @__PURE__ */ jsxs("span", {
													className: "absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1.5 rounded-full backdrop-blur-md",
													children: ["★ ", __("Editors Pick")]
												})
											]
										}), /* @__PURE__ */ jsxs("div", {
											className: "p-8",
											children: [/* @__PURE__ */ jsx("h3", {
												className: "text-xl font-black tracking-tight mb-3 text-black dark:text-white group-hover:text-amber-400 transition-colors leading-tight line-clamp-2",
												children: article.title
											}), /* @__PURE__ */ jsx("p", {
												className: "text-sm text-gray-600 dark:text-gray-500 font-light line-clamp-2 leading-relaxed",
												children: article.ai_summary
											})]
										})]
									})
								})
							}, article.id))
						})
					}),
					articles?.length > 0 && gridArticles.length > 0 ? /* @__PURE__ */ jsxs("section", {
						className: "py-20 px-6 max-w-7xl mx-auto border-t border-black/5 dark:border-white/5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-4",
										children: [/* @__PURE__ */ jsx("div", { className: "w-1 h-8 bg-primary rounded-full" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
											className: "text-[10px] font-black text-primary uppercase tracking-[0.25em] block mb-1",
											children: __("Latest Discoveries")
										}), /* @__PURE__ */ jsx("h2", {
											className: "text-4xl font-black tracking-tighter text-black dark:text-white",
											children: __("Now Reading")
										})] })]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "flex overflow-x-auto gap-2 pb-2 w-full md:w-auto scrollbar-hide",
										children: [
											"Artificial Intelligence",
											"Gadgets & Hardware",
											"Software & Apps",
											"Business Tech",
											"Gaming",
											"Cybersecurity & Privacy"
										].map((cat) => /* @__PURE__ */ jsx(Link, {
											href: `/archive?tag=${encodeURIComponent(cat)}`,
											className: "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20",
											children: __(cat)
										}, cat))
									}),
									/* @__PURE__ */ jsxs(Link, {
										href: "/archive",
										className: "hidden md:flex text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors items-center gap-2 group flex-shrink-0",
										children: [
											__("Full Archive"),
											" ",
											/* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3 group-hover:translate-x-1 transition-transform" })
										]
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
								children: gridArticles.map((article, index) => {
									const isLarge = index === 0;
									return /* @__PURE__ */ jsx(motion.div, {
										initial: {
											opacity: 0,
											y: 30
										},
										whileInView: {
											opacity: 1,
											y: 0
										},
										viewport: {
											once: true,
											margin: "-60px"
										},
										transition: {
											duration: .7,
											delay: index * .08,
											ease: [
												.16,
												1,
												.3,
												1
											]
										},
										className: isLarge ? "lg:col-span-2 lg:row-span-2" : "",
										children: /* @__PURE__ */ jsx(Link, {
											href: `/article/${article.slug}`,
											className: "group block h-full",
											children: /* @__PURE__ */ jsxs("div", {
												className: `h-full bg-white/[0.6] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 group-hover:border-primary/30 rounded-[2rem] overflow-hidden transition-all duration-500 flex flex-col shadow-sm dark:shadow-none ${isLarge ? "min-h-[500px]" : "min-h-[280px]"}`,
												children: [/* @__PURE__ */ jsxs("div", {
													className: `w-full bg-cover bg-center flex-shrink-0 relative overflow-hidden ${isLarge ? "h-72" : "h-40"}`,
													style: { backgroundImage: `url(${getFinalImage(article, isLarge ? 1200 : 600)})` },
													children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent" }), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-700 mix-blend-overlay" })]
												}), /* @__PURE__ */ jsxs("div", {
													className: "p-7 flex flex-col flex-1 justify-between",
													children: [
														/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
															className: "flex items-center justify-between mb-4",
															children: [/* @__PURE__ */ jsx("span", {
																className: "text-[10px] font-black text-primary uppercase tracking-[0.2em]",
																children: dayjs(article.updated_at).fromNow()
															}), article.tags?.[0] && /* @__PURE__ */ jsxs("span", {
																className: "text-[10px] font-black bg-white/5 text-gray-500 px-2.5 py-1 rounded-full",
																children: ["#", article.tags[0]]
															})]
														}), /* @__PURE__ */ jsx("h3", {
															className: `font-black tracking-tight text-black dark:text-white group-hover:text-primary transition-colors duration-300 leading-tight line-clamp-3 ${isLarge ? "text-3xl md:text-4xl" : "text-xl"}`,
															children: article.title
														})] }),
														isLarge && /* @__PURE__ */ jsx("p", {
															className: "text-sm text-gray-600 font-light line-clamp-2 leading-relaxed mt-4",
															children: article.ai_summary
														}),
														/* @__PURE__ */ jsxs("div", {
															className: "mt-5 flex items-center gap-2 text-gray-700 text-[10px] font-black uppercase tracking-widest",
															children: [
																/* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
																article.reading_time_minutes || "5",
																" min"
															]
														})
													]
												})]
											})
										})
									}, article.id);
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-10 text-center",
								children: /* @__PURE__ */ jsxs(Link, {
									href: "/archive",
									className: "inline-flex items-center gap-3 border border-black/10 dark:border-white/10 text-gray-400 hover:text-black dark:hover:text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:bg-black/5 dark:hover:bg-white/5 group",
									children: [__("Load All Articles"), /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })]
								})
							})
						]
					}) : articles?.length === 0 && /* @__PURE__ */ jsx("section", {
						className: "py-20 px-6 max-w-7xl mx-auto border-t border-black/5 dark:border-white/5",
						children: /* @__PURE__ */ jsx("div", {
							className: "py-32 text-center text-gray-500 dark:text-gray-700 font-light text-xl border border-black/5 dark:border-white/5 rounded-[2rem] transition-colors duration-500",
							children: __("The intelligence pipeline is warming up. Check back shortly.")
						})
					}),
					/* @__PURE__ */ jsx("section", {
						className: "px-6 max-w-7xl mx-auto py-12",
						children: /* @__PURE__ */ jsx(AdSlot, { className: "my-8" })
					}),
					/* @__PURE__ */ jsx("section", {
						className: "py-24 px-6 border-t border-black/5 dark:border-white/5",
						children: /* @__PURE__ */ jsx("div", {
							className: "max-w-4xl mx-auto",
							children: /* @__PURE__ */ jsxs(motion.div, {
								initial: {
									opacity: 0,
									y: 40
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: {
									duration: .9,
									ease: [
										.16,
										1,
										.3,
										1
									]
								},
								className: "bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[3rem] p-8 sm:p-14 md:p-20 relative overflow-hidden group shadow-sm dark:shadow-none",
								children: [
									/* @__PURE__ */ jsx("div", { className: "absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-700 group-hover:scale-125" }),
									/* @__PURE__ */ jsx("div", { className: "absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" }),
									/* @__PURE__ */ jsxs("div", {
										className: "relative z-10 text-center",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "text-[10px] font-black text-primary uppercase tracking-[0.3em] block mb-6",
												children: __("AI Weekly Digest")
											}),
											/* @__PURE__ */ jsxs("h2", {
												className: "text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-[1] text-black dark:text-white transition-colors",
												children: [
													__("Intelligence,"),
													/* @__PURE__ */ jsx("br", {}),
													__("delivered weekly.")
												]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-gray-500 mb-12 font-light text-base sm:text-lg max-w-lg mx-auto leading-relaxed",
												children: __("Every Friday: AI research breakthroughs, engineering insights, and curated tools — synthesized by machine, filtered by humans.")
											}),
											/* @__PURE__ */ jsxs("form", {
												onSubmit: handleSubscribe,
												className: "flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto",
												children: [/* @__PURE__ */ jsx("input", {
													type: "email",
													required: true,
													value: email,
													onChange: (e) => setEmail(e.target.value),
													placeholder: __("your@email.com"),
													className: "flex-1 w-full px-6 py-4 rounded-xl bg-gray-100 dark:bg-black/60 border border-black/5 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
												}), /* @__PURE__ */ jsx("button", {
													type: "submit",
													disabled: isSubscribing,
													className: "w-full sm:w-auto px-8 py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-black tracking-wider uppercase text-sm hover:scale-105 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg dark:shadow-none",
													children: isSubscribing ? __("Joining...") : __("Subscribe")
												})]
											})
										]
									})
								]
							})
						})
					}),
					/* @__PURE__ */ jsx(PublicFooter, {}),
					/* @__PURE__ */ jsx(RagCopilot, {})
				]
			})
		]
	});
}
//#endregion
export { Welcome as default };
