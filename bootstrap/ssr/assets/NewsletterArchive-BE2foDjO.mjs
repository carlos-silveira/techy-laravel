import { n as useLanguage } from "./ThemeToggle-z5uN9EoT.mjs";
import { n as Navbar, t as PublicFooter } from "./PublicFooter-sNtPJ36C.mjs";
import "react";
import { Head, Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
//#region resources/js/Pages/NewsletterArchive.jsx
function NewsletterArchive({ newsletters, dailyBrief }) {
	const { __ } = useLanguage();
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-gray-900 dark:text-white font-sans overflow-x-hidden relative transition-colors duration-500",
		children: [
			/* @__PURE__ */ jsx(Head, { title: `${__("Intelligence Briefs Archive")} | TechyNews` }),
			/* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay z-0" }),
			/* @__PURE__ */ jsx("div", { className: "fixed top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0" }),
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsxs("main", {
				className: "max-w-4xl mx-auto px-6 py-32 relative z-10",
				children: [/* @__PURE__ */ jsxs(motion.div, {
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
						/* @__PURE__ */ jsx("div", {
							className: "text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4",
							children: __("Weekly Rollups")
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "text-4xl md:text-6xl font-black tracking-tighter mb-4",
							children: [
								__("The Intelligence"),
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400",
									children: __("Archive")
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto",
							children: __("Catch up on past editions of our weekly intelligence briefings. The most important tech signals, curated and summarized.")
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-12",
					children: newsletters.map((newsletter, idx) => /* @__PURE__ */ jsxs(motion.div, {
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
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 mb-8",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center",
								children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-primary" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "text-2xl font-black tracking-tight",
								children: newsletter.week
							}), /* @__PURE__ */ jsx("div", {
								className: "text-[10px] font-black text-gray-500 uppercase tracking-widest",
								children: __("Weekly Edition")
							})] })]
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-6",
							children: newsletter.articles.map((article, i) => /* @__PURE__ */ jsx(Link, {
								href: `/article/${article.slug}`,
								className: "block group",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col md:flex-row gap-6 p-4 -mx-4 rounded-2xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors",
									children: [article.cover_image_path && /* @__PURE__ */ jsx("div", {
										className: "w-full md:w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden border border-black/5 dark:border-white/5 relative",
										children: /* @__PURE__ */ jsx("img", {
											src: article.cover_image_path.startsWith("http") ? article.cover_image_path : `/storage/${article.cover_image_path}`,
											className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700",
											alt: article.title
										})
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex-1 flex flex-col justify-center",
										children: [
											/* @__PURE__ */ jsx("h3", {
												className: "text-lg md:text-xl font-black mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-tight",
												children: article.title
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2",
												children: article.ai_summary
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "mt-3 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300",
												children: [
													__("Read Brief"),
													" ",
													/* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
												]
											})
										]
									})]
								})
							}, i))
						})]
					}, idx))
				})]
			}),
			/* @__PURE__ */ jsx(PublicFooter, {})
		]
	});
}
//#endregion
export { NewsletterArchive as default };
