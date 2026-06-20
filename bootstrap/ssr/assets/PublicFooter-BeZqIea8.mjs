import { n as useLanguage, t as ThemeToggle } from "./ThemeToggle-z5uN9EoT.mjs";
import { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";
import { toast } from "sonner";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Globe, Menu, X } from "lucide-react";
import "axios";
//#region resources/js/Components/LanguageSwitcher.jsx
var languages = [
	{
		code: "en",
		name: "English",
		flag: "🇺🇸"
	},
	{
		code: "es",
		name: "Español",
		flag: "🇪🇸"
	},
	{
		code: "pt",
		name: "Português",
		flag: "🇧🇷"
	}
];
function LanguageSwitcher() {
	const { locale, __ } = useLanguage();
	const activeLocale = (typeof document !== "undefined" ? document.documentElement.lang : locale) || "en";
	const [isOpen, setIsOpen] = useState(false);
	const currentLanguage = languages.find((l) => l.code.toLowerCase() === activeLocale?.toLowerCase()) || languages[0];
	const changeLanguage = (langCode) => {
		setIsOpen(false);
		router.post("/set-locale", { locale: langCode }, {
			preserveScroll: true,
			onSuccess: () => {
				window.location.reload();
			},
			onError: () => {
				toast.error("Failed to change language.");
			}
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		"data-testid": "language-switcher",
		children: [/* @__PURE__ */ jsxs("button", {
			onClick: () => setIsOpen(!isOpen),
			className: "flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest group",
			children: [
				/* @__PURE__ */ jsx(Globe, { className: "w-3.5 h-3.5 group-hover:text-primary transition-colors" }),
				/* @__PURE__ */ jsx("span", {
					className: "hidden md:inline",
					children: currentLanguage.name
				}),
				/* @__PURE__ */ jsx("span", {
					className: "md:hidden",
					children: currentLanguage.code
				}),
				/* @__PURE__ */ jsx(ChevronDown, { className: `w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}` })
			]
		}), isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-[60]",
			onClick: () => setIsOpen(false)
		}), /* @__PURE__ */ jsxs("div", {
			className: "absolute right-0 mt-2 w-48 bg-[#0a0f1c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[70] animate-in fade-in zoom-in duration-200",
			children: [/* @__PURE__ */ jsx("div", {
				className: "p-2 border-b border-white/5 bg-white/[0.02]",
				children: /* @__PURE__ */ jsx("span", {
					className: "text-[9px] font-black uppercase tracking-widest text-gray-500 px-2",
					children: __("Language")
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "p-1.5 flex flex-col",
				children: languages.map((lang) => /* @__PURE__ */ jsxs("button", {
					onClick: () => changeLanguage(lang.code),
					className: `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeLocale === lang.code ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-white hover:bg-white/5"}`,
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-lg",
							children: lang.flag
						}), /* @__PURE__ */ jsx("span", { children: lang.name })]
					}), activeLocale === lang.code && /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" })]
				}, lang.code))
			})]
		})] })]
	});
}
//#endregion
//#region resources/js/Components/Navbar.jsx
function Navbar() {
	const { __ } = useLanguage();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) setIsMenuOpen(false);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	useEffect(() => {
		if (isMenuOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [isMenuOpen]);
	const navLinks = [
		{
			href: "/archive",
			label: __("Archive")
		},
		{
			href: "/newsletter",
			label: __("Newsletter")
		},
		{
			href: "/about",
			label: __("About")
		}
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("nav", {
		className: "fixed w-full border-b border-black/5 dark:border-white/5 bg-white/95 dark:bg-[#02040a]/90 backdrop-blur-xl z-[100] transition-colors duration-500",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-6 h-20 flex items-center justify-between",
			children: [
				/* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						x: -20
					},
					animate: {
						opacity: 1,
						x: 0
					},
					className: "flex items-center",
					children: /* @__PURE__ */ jsx(Link, {
						href: "/",
						className: "relative z-[110]",
						children: /* @__PURE__ */ jsx("img", {
							src: "/img/logo_wbc.png",
							alt: "Techy News",
							className: "h-8 w-auto object-contain transition-all duration-500 dark:brightness-100 brightness-0"
						})
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "hidden md:flex items-center",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex items-center space-x-8 mr-8 border-r border-black/5 dark:border-white/10 pr-8 h-8",
						children: navLinks.map((link) => /* @__PURE__ */ jsx(Link, {
							href: link.href,
							className: "text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors",
							children: link.label
						}, link.href))
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4",
						children: [
							/* @__PURE__ */ jsx(ThemeToggle, {}),
							/* @__PURE__ */ jsx(LanguageSwitcher, {}),
							/* @__PURE__ */ jsx(Link, {
								href: "/dashboard",
								className: "text-sm font-bold bg-black dark:bg-white text-white dark:text-black hover:opacity-90 px-5 py-2.5 rounded-xl transition-all hover:scale-105 shadow-xl",
								children: __("Studio")
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex md:hidden items-center gap-3 relative z-[110]",
					children: [
						/* @__PURE__ */ jsx(ThemeToggle, {}),
						/* @__PURE__ */ jsx(LanguageSwitcher, {}),
						/* @__PURE__ */ jsx("button", {
							onClick: () => setIsMenuOpen(!isMenuOpen),
							className: "p-2 rounded-xl bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400",
							children: isMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
						})
					]
				})
			]
		})
	}), /* @__PURE__ */ jsx(AnimatePresence, { children: isMenuOpen && /* @__PURE__ */ jsxs(motion.div, {
		initial: {
			opacity: 0,
			y: -20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: -20
		},
		transition: {
			duration: .3,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		className: "fixed inset-0 bg-white dark:bg-[#02040a] z-[90] pt-32 px-10 flex flex-col",
		children: [/* @__PURE__ */ jsx("div", {
			className: "space-y-8",
			children: navLinks.map((link, i) => /* @__PURE__ */ jsx(motion.div, {
				initial: {
					opacity: 0,
					x: -20
				},
				animate: {
					opacity: 1,
					x: 0
				},
				transition: { delay: .1 + i * .1 },
				children: /* @__PURE__ */ jsxs(Link, {
					href: link.href,
					onClick: () => setIsMenuOpen(false),
					className: "text-5xl font-black tracking-tighter text-black dark:text-white block hover:text-primary transition-colors",
					children: [link.label, "."]
				})
			}, link.href))
		}), /* @__PURE__ */ jsxs(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			transition: { delay: .4 },
			className: "mt-auto mb-20 space-y-6",
			children: [/* @__PURE__ */ jsx("div", { className: "h-px w-full bg-black/5 dark:bg-white/5" }), /* @__PURE__ */ jsxs(Link, {
				href: "/dashboard",
				onClick: () => setIsMenuOpen(false),
				className: "flex items-center justify-between w-full p-6 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-sm",
				children: [__("Access Studio"), /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })]
			})]
		})]
	}) })] });
}
//#endregion
//#region resources/js/Components/PublicFooter.jsx
function PublicFooter({ className = "" }) {
	const { __ } = useLanguage();
	return /* @__PURE__ */ jsx("footer", {
		className: `border-t border-black/5 dark:border-white/5 py-12 pb-32 md:pb-12 relative z-10 transition-colors duration-500 ${className}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: "/img/logo_wbc.png",
					alt: "Techy News",
					className: "h-7 w-auto opacity-50 hover:opacity-100 transition-opacity dark:brightness-100 brightness-0"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-[10px] font-black uppercase tracking-[0.15em] text-gray-700",
					children: "© 2026 Carlos Silveira"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap justify-center gap-x-8 gap-y-4",
					children: [
						/* @__PURE__ */ jsx(Link, {
							href: "/",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors",
							children: __("Home")
						}),
						/* @__PURE__ */ jsx(Link, {
							href: "/archive",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors",
							children: __("Archive")
						}),
						/* @__PURE__ */ jsx("a", {
							href: "https://github.com/carlos-silveira",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors",
							children: "GitHub"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "https://x.com/TechyNewsLat",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors",
							children: "𝕏 Twitter"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "https://www.facebook.com/techynews",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors",
							children: "Facebook"
						}),
						/* @__PURE__ */ jsx(Link, {
							href: "/terms",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors",
							children: __("Terms of Use")
						}),
						/* @__PURE__ */ jsx(Link, {
							href: "/privacy",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black dark:hover:text-white transition-colors",
							children: __("Privacy Policy")
						})
					]
				})
			]
		})
	});
}
//#endregion
export { Navbar as n, PublicFooter as t };
