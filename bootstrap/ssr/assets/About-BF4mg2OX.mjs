import { n as useLanguage } from "./ThemeToggle-z5uN9EoT.mjs";
import { n as Navbar, t as PublicFooter } from "./PublicFooter-BeZqIea8.mjs";
import { t as CommandPalette } from "./CommandPalette-C0WOoolx.mjs";
import { t as RagCopilot } from "./RagCopilot-CsH8uUGU.mjs";
import { useEffect, useRef, useState } from "react";
import { Head } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Cpu, Github, Linkedin, Mail } from "lucide-react";
import { SiDocker, SiFramer, SiGit, SiGoogle, SiLaravel, SiMysql, SiReact, SiTailwindcss } from "react-icons/si/index.esm.js";
//#region resources/js/Pages/About.jsx
var FloatingShapes = () => {
	const { scrollYProgress } = useScroll();
	const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
	const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
	const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
	const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
	const rotate2 = useTransform(scrollYProgress, [0, 1], [45, 225]);
	return /* @__PURE__ */ jsxs("div", {
		className: "absolute inset-0 overflow-hidden pointer-events-none z-0",
		children: [
			/* @__PURE__ */ jsx("div", { className: "fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[#00b4ff]/5 rounded-full blur-[150px] mix-blend-screen dark:mix-blend-lighten" }),
			/* @__PURE__ */ jsx("div", { className: "fixed bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/5 rounded-full blur-[120px] mix-blend-screen dark:mix-blend-lighten" }),
			/* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_10%,transparent_100%)] z-0" }),
			/* @__PURE__ */ jsx(motion.div, {
				style: {
					y: y1,
					rotate: rotate1
				},
				className: "absolute top-[20%] left-[10%] opacity-20 dark:opacity-40",
				children: /* @__PURE__ */ jsx("div", {
					className: "w-32 h-32 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center",
					children: /* @__PURE__ */ jsx("div", { className: "w-24 h-24 border border-black/10 dark:border-white/10 rounded-full" })
				})
			}),
			/* @__PURE__ */ jsx(motion.div, {
				style: {
					y: y2,
					rotate: rotate2
				},
				className: "absolute top-[60%] right-[15%] opacity-20 dark:opacity-40",
				children: /* @__PURE__ */ jsx("div", {
					className: "w-40 h-40 border border-black/10 dark:border-white/10 flex items-center justify-center",
					children: /* @__PURE__ */ jsx("div", { className: "w-20 h-20 border border-[#00b4ff]/20" })
				})
			}),
			/* @__PURE__ */ jsx(motion.div, {
				style: { y: y3 },
				className: "absolute top-[80%] left-[20%] opacity-30",
				children: /* @__PURE__ */ jsx(Cpu, { className: "w-16 h-16 text-black/5 dark:text-white/5 stroke-[0.5px]" })
			})
		]
	});
};
function About() {
	const { __ } = useLanguage();
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"]
	});
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
	const backgroundGlow = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(0, 180, 255, 0.08), transparent 80%)`;
	const heroOpacity = useTransform(scrollYProgress, [0, .2], [1, 0]);
	const heroScale = useTransform(scrollYProgress, [0, .2], [1, .9]);
	const heroY = useTransform(scrollYProgress, [0, .2], [0, 50]);
	const tools = [
		{
			name: "Laravel",
			icon: SiLaravel,
			url: "https://laravel.com"
		},
		{
			name: "React",
			icon: SiReact,
			url: "https://react.dev"
		},
		{
			name: "Tailwind CSS",
			icon: SiTailwindcss,
			url: "https://tailwindcss.com"
		},
		{
			name: "Gemini AI",
			icon: SiGoogle,
			url: "https://deepmind.google/technologies/gemini/"
		},
		{
			name: "Docker",
			icon: SiDocker,
			url: "https://www.docker.com"
		},
		{
			name: "MySQL",
			icon: SiMysql,
			url: "https://www.mysql.com"
		},
		{
			name: "Framer Motion",
			icon: SiFramer,
			url: "https://www.framer.com/motion/"
		},
		{
			name: "Git",
			icon: SiGit,
			url: "https://git-scm.com"
		}
	];
	const experiences = [
		{
			title: __("Senior Software Engineer"),
			company: "Tendencys Innovations",
			url: "https://tendencys.com/",
			date: __("Sep 2024 – Present"),
			description: __("Architected and scaled a global shipping API (Laravel Lumen) for Envia.com, integrating international logistics providers via RESTful APIs. Optimized core backend performance and deployed features to streamline global logistics workflows.")
		},
		{
			title: __("Tech Lead & Senior Software Engineer"),
			company: "BuscaBot",
			date: __("Jan 2022 – Jul 2024"),
			description: __("Engineered features for a B2B WhatsApp chatbot platform using Laravel, React, Tailwind CSS, MySQL, and GCP, integrated with Twilio. Built internal APIs for car service endpoints and integrated platforms like Parts Tech, Stripe, and Facturapi. Translated automotive industry requirements into technical specifications and implemented TDD and SCRUM methodologies.")
		},
		{
			title: __("Associate Software Engineer"),
			company: "Justia",
			url: "https://justia.com/",
			date: __("Jun 2019 – Jan 2022"),
			description: __("Built Laravel data parsers to process US government website information for high-traffic platforms including Justia.com and Oyez.org via AWS. Managed technical execution of large-scale email marketing campaigns (Mailchimp, Mandrill, Mailgun). Conducted peer code reviews and resolved complex backend issues for Jurispro.com.")
		}
	];
	const [expandedExp, setExpandedExp] = useState(null);
	return /* @__PURE__ */ jsxs("div", {
		ref: containerRef,
		className: "min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-black dark:text-white font-sans selection:bg-[#00b4ff]/30 selection:text-black dark:selection:text-white transition-colors duration-500 overflow-x-hidden relative",
		children: [
			/* @__PURE__ */ jsx(Head, { title: `${__("About")} | Carlos Silveira` }),
			/* @__PURE__ */ jsx(CommandPalette, {}),
			/* @__PURE__ */ jsx(motion.div, {
				className: "pointer-events-none fixed inset-0 z-10 transition-opacity duration-300",
				style: { background: backgroundGlow }
			}),
			/* @__PURE__ */ jsx(FloatingShapes, {}),
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsx("div", {
				className: "relative z-10 pt-32 md:pt-40 pb-24 px-6 md:px-12 max-w-[1300px] mx-auto min-h-[70vh]",
				children: /* @__PURE__ */ jsxs(motion.section, {
					style: {
						opacity: heroOpacity,
						scale: heroScale,
						y: heroY
					},
					className: "flex flex-col md:flex-row items-start justify-between gap-[60px] sticky top-40",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "max-w-[700px] relative",
						children: [
							/* @__PURE__ */ jsxs(motion.div, {
								initial: {
									opacity: 0,
									y: 10
								},
								animate: {
									opacity: 1,
									y: 0
								},
								className: "inline-flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md",
								children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#00b4ff] animate-pulse" }), /* @__PURE__ */ jsx("span", {
									className: "text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600 dark:text-gray-400",
									children: __("Developer Portfolio")
								})]
							}),
							/* @__PURE__ */ jsx(motion.h1, {
								initial: {
									opacity: 0,
									y: 20
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									delay: .1,
									duration: .8
								},
								className: "text-[64px] sm:text-[84px] md:text-[113px] leading-[0.85] tracking-[-0.04em] font-extralight text-black dark:text-white mb-[40px] drop-shadow-sm",
								children: "Carlos Silveira."
							}),
							/* @__PURE__ */ jsx(motion.p, {
								initial: {
									opacity: 0,
									y: 20
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									delay: .2,
									duration: .8
								},
								className: "text-[16px] md:text-[20px] leading-[1.6] tracking-[0.02em] text-gray-700 dark:text-gray-300 mb-[48px] font-light max-w-[600px]",
								children: __("Senior Software Engineer with 6+ years of experience building scalable systems and interactive interfaces. I specialize in Laravel, React, and integrating advanced AI pipelines to solve complex problems.")
							}),
							/* @__PURE__ */ jsxs(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								transition: {
									delay: .3,
									duration: .8
								},
								className: "flex items-center gap-4",
								children: [
									/* @__PURE__ */ jsx("a", {
										href: "https://github.com/carlossilveira",
										target: "_blank",
										rel: "noreferrer",
										className: "flex items-center justify-center w-12 h-12 rounded-full border border-black/10 dark:border-white/10 hover:border-[#00b4ff] hover:bg-[#00b4ff]/5 transition-all text-gray-600 dark:text-gray-400 hover:text-[#00b4ff]",
										children: /* @__PURE__ */ jsx(Github, { className: "w-5 h-5 stroke-[1.5px]" })
									}),
									/* @__PURE__ */ jsx("a", {
										href: "https://linkedin.com/in/carlossilveira",
										target: "_blank",
										rel: "noreferrer",
										className: "flex items-center justify-center w-12 h-12 rounded-full border border-black/10 dark:border-white/10 hover:border-[#00b4ff] hover:bg-[#00b4ff]/5 transition-all text-gray-600 dark:text-gray-400 hover:text-[#00b4ff]",
										children: /* @__PURE__ */ jsx(Linkedin, { className: "w-5 h-5 stroke-[1.5px]" })
									}),
									/* @__PURE__ */ jsx("a", {
										href: "mailto:silveira.alberto24@gmail.com",
										className: "flex items-center justify-center w-12 h-12 rounded-full border border-black/10 dark:border-white/10 hover:border-[#00b4ff] hover:bg-[#00b4ff]/5 transition-all text-gray-600 dark:text-gray-400 hover:text-[#00b4ff]",
										children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 stroke-[1.5px]" })
									})
								]
							})
						]
					}), /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							x: 20
						},
						animate: {
							opacity: 1,
							x: 0
						},
						transition: {
							delay: .4,
							duration: .8
						},
						className: "hidden lg:grid grid-cols-2 gap-4 w-full max-w-[480px] mt-12 md:mt-0",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] p-6 flex flex-col justify-between backdrop-blur-md hover:border-[#00b4ff]/40 hover:bg-[#00b4ff]/5 transition-all duration-300 group shadow-sm dark:shadow-none",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black mb-8",
									children: __("Experience")
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
									className: "text-[54px] font-extralight text-black dark:text-white mb-1 group-hover:text-[#00b4ff] transition-colors leading-none tracking-tighter",
									children: [Math.floor((/* @__PURE__ */ new Date() - new Date(2019, 5, 1)) / (1e3 * 60 * 60 * 24 * 365.25)), "+"]
								}), /* @__PURE__ */ jsx("div", {
									className: "text-[13px] font-medium text-gray-600 dark:text-gray-400 leading-snug",
									children: __("Years building scalable systems")
								})] })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] p-6 flex flex-col justify-between backdrop-blur-md hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-300 group shadow-sm dark:shadow-none",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black mb-8",
									children: __("Language")
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: "text-[42px] font-extralight text-black dark:text-white mb-2 group-hover:text-purple-500 transition-colors leading-none tracking-tighter",
									children: "C1"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-[13px] font-medium text-gray-600 dark:text-gray-400 leading-snug",
									children: __("Advanced English")
								})] })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "col-span-2 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 dark:to-transparent border border-black/10 dark:border-white/10 rounded-[2rem] p-8 flex items-center justify-between backdrop-blur-md hover:border-[#00b4ff]/40 transition-all duration-300 group overflow-hidden relative shadow-sm dark:shadow-none",
								children: [/* @__PURE__ */ jsx("div", { className: "absolute -right-10 -bottom-10 w-40 h-40 bg-[#00b4ff]/10 rounded-full blur-[50px] group-hover:bg-[#00b4ff]/20 transition-colors" }), /* @__PURE__ */ jsxs("div", {
									className: "relative z-10 flex flex-col gap-3",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black",
											children: __("Base of Operations")
										}),
										/* @__PURE__ */ jsx("div", {
											className: "text-[28px] font-extralight text-black dark:text-white tracking-tight",
											children: "Saltillo, Mexico"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "text-[14px] font-light text-gray-600 dark:text-gray-400",
											children: __("Computer Systems Engineering (2015-2020)")
										})
									]
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-20 bg-[#f8f6f6] dark:bg-[#02040a] rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-20px_40px_rgba(0,0,0,0.5)] w-full",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "max-w-[1300px] mx-auto pt-24 pb-24 px-6 md:px-12",
					children: [
						/* @__PURE__ */ jsxs("section", {
							className: "grid grid-cols-1 lg:grid-cols-2 gap-[60px] mb-[120px]",
							children: [/* @__PURE__ */ jsxs(motion.div, {
								initial: {
									opacity: 0,
									y: 40
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: {
									once: true,
									margin: "-100px"
								},
								transition: { duration: .8 },
								className: "flex flex-col gap-[40px]",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx("div", { className: "w-1 h-6 bg-[#00b4ff] rounded-full" }), /* @__PURE__ */ jsx("h2", {
										className: "text-[32px] md:text-[42px] font-extralight tracking-[-0.02em] text-black dark:text-white leading-none",
										children: __("Tech Stack")
									})]
								}), /* @__PURE__ */ jsx("div", {
									className: "grid grid-cols-2 sm:grid-cols-4 gap-[16px]",
									children: tools.map((tool, index) => /* @__PURE__ */ jsxs(motion.a, {
										href: tool.url,
										target: "_blank",
										rel: "noreferrer",
										whileHover: {
											y: -5,
											scale: 1.02
										},
										className: "flex flex-col items-center justify-center gap-3 p-[24px] rounded-[24px] border border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-md hover:border-[#00b4ff]/40 hover:shadow-lg transition-all duration-300 group relative overflow-hidden cursor-pointer",
										children: [
											/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#00b4ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
											/* @__PURE__ */ jsx(tool.icon, { className: "w-7 h-7 text-gray-500 dark:text-gray-500 group-hover:text-[#00b4ff] transition-colors stroke-[1px] relative z-10" }),
											/* @__PURE__ */ jsx("span", {
												className: "text-[10px] uppercase tracking-[0.1em] font-black text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors relative z-10 text-center",
												children: tool.name
											})
										]
									}, tool.name))
								})]
							}), /* @__PURE__ */ jsxs(motion.div, {
								initial: {
									opacity: 0,
									y: 40
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: {
									once: true,
									margin: "-100px"
								},
								transition: {
									duration: .8,
									delay: .2
								},
								className: "flex flex-col gap-[40px]",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx("div", { className: "w-1 h-6 bg-[#00b4ff] rounded-full opacity-0" }), /* @__PURE__ */ jsx("h2", {
										className: "text-[32px] md:text-[42px] font-extralight tracking-[-0.02em] text-black dark:text-white leading-none",
										children: __("Featured Project")
									})]
								}), /* @__PURE__ */ jsxs("a", {
									href: "https://github.com/carlos-silveira/techy-laravel",
									target: "_blank",
									rel: "noreferrer",
									className: "block mt-12 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-[2rem] p-8 md:p-12 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden shadow-sm dark:shadow-none transition-transform duration-500 hover:scale-[1.02] cursor-pointer",
									children: [
										/* @__PURE__ */ jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-[#00b4ff]/10 to-purple-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" }),
										/* @__PURE__ */ jsx("div", {
											className: "absolute -right-10 -top-10 opacity-[0.03] dark:opacity-5 group-hover:rotate-12 transition-transform duration-1000 pointer-events-none",
											children: /* @__PURE__ */ jsx(Cpu, { className: "w-64 h-64 stroke-[0.5px]" })
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "relative z-10",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "text-[10px] uppercase tracking-[0.3em] text-[#00b4ff] font-black block mb-4",
													children: __("TechyNews Platform")
												}),
												/* @__PURE__ */ jsx("h3", {
													className: "text-[36px] font-extralight tracking-[-0.02em] leading-[1.1] text-black dark:text-white mb-6",
													children: __("AI-powered journalism.")
												}),
												/* @__PURE__ */ jsx("p", {
													className: "text-gray-600 dark:text-gray-400 text-[16px] leading-[1.6] tracking-[0.02em] max-w-[400px] font-light",
													children: __("A fully functional platform delivering automated synthesis of global tech news. Features automated summarization, RAG keyword search, and autonomous RSS broadcast pipelines.")
												})
											]
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs(motion.section, {
							initial: {
								opacity: 0,
								y: 40
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: true,
								margin: "-100px"
							},
							transition: { duration: .8 },
							className: "flex flex-col gap-[40px] mb-[120px]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ jsx("div", { className: "w-1 h-6 bg-[#00b4ff] rounded-full" }), /* @__PURE__ */ jsx("h2", {
									className: "text-[32px] md:text-[42px] font-extralight tracking-[-0.02em] text-black dark:text-white leading-none",
									children: __("Experience")
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-col",
								children: experiences.map((exp, index) => {
									const isExpanded = expandedExp === index;
									return /* @__PURE__ */ jsxs(motion.div, {
										layout: true,
										onClick: () => setExpandedExp(isExpanded ? null : index),
										className: `flex flex-col border-b border-black/5 dark:border-white/5 cursor-pointer group transition-colors overflow-hidden py-[32px] ${isExpanded ? "bg-black/5 dark:bg-white/5 px-6 rounded-[24px]" : "hover:bg-black/[0.02] dark:hover:bg-white/[0.02] px-6 rounded-[24px]"}`,
										children: [/* @__PURE__ */ jsxs(motion.div, {
											layout: true,
											className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex flex-col gap-2",
												children: [/* @__PURE__ */ jsx("h3", {
													className: `text-[22px] font-extralight tracking-tight transition-colors ${isExpanded ? "text-[#00b4ff]" : "text-black dark:text-white group-hover:text-[#00b4ff]"}`,
													children: exp.title
												}), /* @__PURE__ */ jsx("div", {
													className: "flex items-center gap-3",
													children: exp.url ? /* @__PURE__ */ jsx("a", {
														href: exp.url,
														target: "_blank",
														rel: "noreferrer",
														onClick: (e) => e.stopPropagation(),
														className: "text-[12px] text-gray-500 dark:text-gray-400 tracking-[0.1em] uppercase font-black hover:text-[#00b4ff] hover:underline transition-colors",
														children: exp.company
													}) : /* @__PURE__ */ jsx("span", {
														className: "text-[12px] text-gray-500 dark:text-gray-400 tracking-[0.1em] uppercase font-black",
														children: exp.company
													})
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-4",
												children: [/* @__PURE__ */ jsx("div", {
													className: "text-[10px] text-gray-500 dark:text-gray-400 font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/30 backdrop-blur-sm",
													children: exp.date
												}), /* @__PURE__ */ jsx(motion.div, {
													animate: { rotate: isExpanded ? 180 : 0 },
													className: "w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-400 group-hover:text-[#00b4ff] group-hover:border-[#00b4ff]/40 transition-colors",
													children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4" })
												})]
											})]
										}), /* @__PURE__ */ jsx(AnimatePresence, { children: isExpanded && /* @__PURE__ */ jsx(motion.div, {
											initial: {
												opacity: 0,
												height: 0,
												marginTop: 0
											},
											animate: {
												opacity: 1,
												height: "auto",
												marginTop: 24
											},
											exit: {
												opacity: 0,
												height: 0,
												marginTop: 0
											},
											className: "overflow-hidden",
											children: /* @__PURE__ */ jsx("p", {
												className: "text-[15px] text-gray-600 dark:text-gray-300 font-light leading-[1.6] max-w-[800px] pl-4 border-l-2 border-[#00b4ff]/30",
												children: exp.description
											})
										}) })]
									}, index);
								})
							})]
						}),
						/* @__PURE__ */ jsx(motion.section, {
							initial: {
								opacity: 0,
								scale: .95
							},
							whileInView: {
								opacity: 1,
								scale: 1
							},
							viewport: {
								once: true,
								margin: "-100px"
							},
							transition: { duration: .8 },
							className: "mb-[60px]",
							children: /* @__PURE__ */ jsxs("div", {
								className: "bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-[3rem] p-12 md:p-24 relative overflow-hidden group shadow-sm dark:shadow-none text-center flex flex-col items-center justify-center",
								children: [
									/* @__PURE__ */ jsx("div", { className: "absolute -top-40 -right-40 w-96 h-96 bg-[#00b4ff]/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-1000 group-hover:scale-125" }),
									/* @__PURE__ */ jsx("div", { className: "absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" }),
									/* @__PURE__ */ jsx("h2", {
										className: "text-[48px] md:text-[84px] font-extralight tracking-[-0.04em] text-black dark:text-white leading-[0.9] mb-8 relative z-10",
										children: __("Let's build something great.")
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-gray-600 dark:text-gray-400 text-[18px] tracking-[0.02em] max-w-[500px] mb-12 font-light relative z-10",
										children: __("I'm always open to discussing technical challenges and new opportunities.")
									}),
									/* @__PURE__ */ jsxs("a", {
										href: "mailto:silveira.alberto24@gmail.com",
										className: "relative z-10 bg-[#00b4ff] text-white px-8 py-4 rounded-full text-[12px] font-black uppercase tracking-[0.2em] hover:bg-[#00b4ff]/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,180,255,0.3)] flex items-center gap-3",
										children: [
											__("Initiate Contact"),
											" ",
											/* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
										]
									})
								]
							})
						})
					]
				}), /* @__PURE__ */ jsx(PublicFooter, {})]
			}),
			/* @__PURE__ */ jsx(RagCopilot, {})
		]
	});
}
//#endregion
export { About as default };
