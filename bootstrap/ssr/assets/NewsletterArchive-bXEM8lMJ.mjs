import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-BEFDdCF_.mjs";
import { i as Link_default, r as Head_default } from "../ssr.mjs";
import { t as require_dayjs_min } from "./dayjs.min-SSZgMhAK.mjs";
import { n as motion } from "./createLucideIcon-Bszla4zf.mjs";
import { i as ArrowRight } from "./x-Dbgsofub.mjs";
import { t as Mail } from "./mail-CvzdMFlX.mjs";
import { t as Zap } from "./zap-DEWz82vv.mjs";
import { t as useLanguage } from "./useLanguage--u2fgJ4Y.mjs";
import { n as Navbar, t as PublicFooter } from "./PublicFooter-Bv7aahrt.mjs";
import { t as getFinalImage } from "./utils-CvS3ysxz.mjs";
import { t as NewsletterBlock } from "./NewsletterBlock-CtO_gvE8.mjs";
require_react();
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
var import_jsx_runtime = require_jsx_runtime();
function NewsletterArchive({ newsletters, dailyBrief }) {
	const { __ } = useLanguage();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-gray-900 dark:text-white font-sans overflow-x-hidden relative transition-colors duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: `${__("Intelligence Briefs Archive")} | TechyNews` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay z-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "max-w-4xl mx-auto px-6 py-32 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
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
						className: "text-center mb-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4",
								children: __("Weekly Rollups")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-4xl md:text-6xl font-black tracking-tighter mb-4",
								children: [
									__("The Intelligence"),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400",
										children: __("Archive")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto",
								children: __("Catch up on past editions of our weekly intelligence briefings. The most important tech signals, curated and summarized.")
							})
						]
					}),
					dailyBrief && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
						className: "relative group mb-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative bg-white/70 dark:bg-[#0a0f1c]/80 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-8 border-b border-black/5 dark:border-white/10 pb-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-12 h-12 rounded-xl bg-black dark:bg-white/5 flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-6 h-6 text-primary" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#0a0f1c] animate-pulse" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "text-xs font-black uppercase tracking-[0.3em] text-gray-600 dark:text-gray-400",
												children: __("Intelligence Feed")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 mt-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-black text-black dark:text-white tracking-tighter uppercase",
													children: __("Daily Briefing")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-1.5 h-4 bg-primary/40 animate-[blink_1s_infinite]" })]
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "hidden sm:flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] font-black uppercase tracking-widest text-gray-500",
												children: "Live AI Output"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "prose prose-sm dark:prose-invert max-w-none \n                          prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:font-light prose-p:leading-relaxed\n                          prose-strong:text-black dark:prose-strong:text-white prose-strong:font-black prose-strong:uppercase prose-strong:tracking-widest prose-strong:text-[10px]\n                          prose-ul:list-none prose-ul:p-0 prose-li:p-0 prose-li:mb-4\n                          prose-a:no-underline prose-a:text-primary prose-a:font-bold hover:prose-a:text-primary/80 transition-colors\n                          [&_li]:relative [&_li]:pl-6 [&_li]:before:content-['>'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-primary/60 [&_li]:before:font-black [&_li]:before:text-[10px]\n                        ",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: dailyBrief } })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest italic font-mono",
											children: ["ST-ID: ", Math.random().toString(36).substring(7).toUpperCase()]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] font-black text-primary/60 uppercase tracking-widest",
											children: [(0, import_dayjs_min.default)().format("HH:mm:ss"), " UTC"]
										})]
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-12",
						children: newsletters.map((newsletter, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: true,
								margin: "-100px"
							},
							transition: { duration: .6 },
							className: "bg-white/70 dark:bg-[#0c0f1a]/70 backdrop-blur-3xl border border-gray-200/50 dark:border-white/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:border-gray-300/50 dark:hover:border-white/[0.1]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mb-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-5 h-5 text-primary" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-black tracking-tight",
									children: newsletter.week
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-black text-gray-500 uppercase tracking-widest",
									children: __("Weekly Edition")
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-6",
								children: newsletter.articles.map((article, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
									href: `/article/${article.slug}`,
									className: "block group",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col md:flex-row gap-6 p-4 -mx-4 rounded-2xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-full md:w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden border border-black/5 dark:border-white/5 relative bg-gray-100 dark:bg-gray-800",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: getFinalImage(article, 800),
												fetchpriority: idx === 0 && i === 0 ? "high" : "auto",
												decoding: "async",
												loading: idx === 0 && i === 0 ? "eager" : "lazy",
												className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700",
												alt: article.title
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 flex flex-col justify-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-lg md:text-xl font-black mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-tight",
													children: article.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2",
													children: article.ai_summary
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-3 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300",
													children: [
														__("Read Brief"),
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3 h-3" })
													]
												})
											]
										})]
									})
								}, i))
							})]
						}, idx))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsletterBlock, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicFooter, {})
		]
	});
}
//#endregion
export { NewsletterArchive as default };
