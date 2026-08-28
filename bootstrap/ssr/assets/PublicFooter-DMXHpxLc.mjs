import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-BEFDdCF_.mjs";
import { a as router3, i as Link_default, l as axios, n as toast, s as usePage } from "../ssr.mjs";
import { n as motion } from "./createLucideIcon-Bszla4zf.mjs";
import { a as Globe, o as AnimatePresence, r as Search, t as X } from "./x-DJSOnP0J.mjs";
import { t as Check } from "./check-waY5JUIM.mjs";
import { n as ChevronDown } from "./send-BkLYY7uF.mjs";
import { r as useLanguage, t as RagCopilot } from "./RagCopilot-BGmdJSAn.mjs";
import { t as Menu } from "./menu-CoePYF51.mjs";
import { t as ThemeToggle } from "./ThemeToggle-C9WSUpbk.mjs";
//#region resources/js/Components/LanguageSwitcher.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const currentLanguage = languages.find((l) => l.code.toLowerCase() === activeLocale?.toLowerCase()) || languages[0];
	const changeLanguage = (langCode) => {
		setIsOpen(false);
		router3.post("/set-locale", { locale: langCode }, {
			preserveScroll: true,
			onSuccess: () => {
				window.location.reload();
			},
			onError: () => {
				toast.error("Failed to change language.");
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		"data-testid": "language-switcher",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setIsOpen(!isOpen),
			className: "flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest group",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3.5 h-3.5 group-hover:text-primary transition-colors" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden md:inline",
					children: currentLanguage.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "md:hidden",
					children: currentLanguage.code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}` })
			]
		}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-[60]",
			onClick: () => setIsOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute left-0 md:left-auto md:right-0 mt-2 w-48 bg-[#0a0f1c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[70] animate-in fade-in zoom-in duration-200",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-2 border-b border-white/5 bg-white/[0.02]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[9px] font-black uppercase tracking-widest text-gray-500 px-2",
					children: __("Language")
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-1.5 flex flex-col",
				children: languages.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => changeLanguage(lang.code),
					className: `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeLocale === lang.code ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-white hover:bg-white/5"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg",
							children: lang.flag
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lang.name })]
					}), activeLocale === lang.code && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" })]
				}, lang.code))
			})]
		})] })]
	});
}
//#endregion
//#region resources/js/Components/PushSubscribe.jsx
function PushSubscribe() {
	const { vapidPublicKey } = usePage().props;
	const [isSubscribed, setIsSubscribed] = (0, import_react.useState)(false);
	const [isSupported, setIsSupported] = (0, import_react.useState)(false);
	function urlBase64ToUint8Array(base64String) {
		const base64 = (base64String + "=".repeat((4 - base64String.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/");
		const rawData = window.atob(base64);
		const outputArray = new Uint8Array(rawData.length);
		for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
		return outputArray;
	}
	(0, import_react.useEffect)(() => {
		if ("serviceWorker" in navigator && "PushManager" in window) {
			setIsSupported(true);
			checkSubscription();
		}
	}, []);
	const checkSubscription = async () => {
		try {
			const subscription = await (await navigator.serviceWorker.register("/sw.js")).pushManager.getSubscription();
			setIsSubscribed(!!subscription);
		} catch (e) {
			console.error("Service worker error:", e);
		}
	};
	const subscribe = async () => {
		try {
			const registration = await navigator.serviceWorker.ready;
			if (Notification.permission !== "granted") {
				if (await Notification.requestPermission() !== "granted") {
					toast.error("Notification permission denied.");
					return;
				}
			}
			if (!vapidPublicKey) {
				console.error("VAPID public key not found in Inertia props");
				toast.error("Push notifications are not configured properly.");
				return;
			}
			const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
			const subscriptionData = (await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: convertedVapidKey
			})).toJSON();
			subscriptionData.locale = navigator.language ? navigator.language.split("-")[0] : "en";
			await axios.post("/push/subscribe", subscriptionData);
			setIsSubscribed(true);
			toast.success("Successfully subscribed to notifications!");
		} catch (err) {
			console.error("Failed to subscribe to push notifications:", err);
			toast.error("Failed to subscribe. Please try again.");
		}
	};
	const unsubscribe = async () => {
		try {
			const subscription = await (await navigator.serviceWorker.ready).pushManager.getSubscription();
			if (subscription) {
				await axios.post("/push/unsubscribe", { endpoint: subscription.endpoint });
				await subscription.unsubscribe();
				setIsSubscribed(false);
				toast.success("Unsubscribed from notifications.");
			}
		} catch (err) {
			console.error("Failed to unsubscribe:", err);
			toast.error("Failed to unsubscribe.");
		}
	};
	if (!isSupported) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: isSubscribed ? unsubscribe : subscribe,
		className: "flex items-center justify-center p-2 rounded-full transition-colors hover:bg-gray-800 text-gray-400 hover:text-white",
		title: isSubscribed ? "Unsubscribe from notifications" : "Subscribe to notifications",
		children: isSubscribed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: "w-5 h-5 text-blue-400",
			fill: "currentColor",
			viewBox: "0 0 20 20",
			xmlns: "http://www.w3.org/2000/svg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: "w-5 h-5",
			fill: "none",
			stroke: "currentColor",
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeWidth: 2,
				d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
			})
		})
	});
}
//#endregion
//#region resources/js/Components/Navbar.jsx
function Navbar({ transparent = false }) {
	const { __ } = useLanguage();
	const [isSidebarOpen, setIsSidebarOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const handleResize = () => {};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	(0, import_react.useEffect)(() => {
		if (isSidebarOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [isSidebarOpen]);
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
	const openSearch = () => {
		window.dispatchEvent(new CustomEvent("open-command-palette"));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: `fixed w-full z-[100] transition-colors duration-500 ${transparent ? "bg-gradient-to-b from-black/80 to-transparent" : "border-b border-black/5 dark:border-white/5 bg-white/95 dark:bg-[#02040a]/90 backdrop-blur-xl"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-6 h-20 flex items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: -20
					},
					animate: {
						opacity: 1,
						x: 0
					},
					className: "flex items-center gap-4 cursor-pointer",
					onClick: () => setIsSidebarOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-2 rounded-xl bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hidden md:block hover:bg-black/10 dark:hover:bg-white/10 transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
						href: "/",
						className: "relative z-[110]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/img/logo_wbc.webp",
							alt: "Techy News",
							width: "170",
							height: "32",
							className: `h-8 w-auto object-contain transition-all duration-500 ${transparent ? "brightness-100" : "dark:brightness-100 brightness-0"}`
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden md:flex items-center flex-1 justify-between ml-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex items-center space-x-8 mr-8 h-8 ${transparent ? "hidden" : "border-r border-black/5 dark:border-white/10 pr-8"}`,
						children: navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
							href: link.href,
							className: "text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors",
							children: link.label
						}, link.href))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 ml-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: openSearch,
								className: "p-2 rounded-xl bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center gap-2 group",
								"aria-label": "Search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-5 h-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PushSubscribe, {}),
							!transparent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagCopilot, { variant: "navbar" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
								href: "/dashboard",
								className: "text-sm font-bold bg-black dark:bg-white text-white dark:text-black hover:opacity-90 px-5 py-2.5 rounded-xl transition-all hover:scale-105 shadow-xl",
								children: __("Studio")
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex md:hidden items-center gap-2 relative z-[110]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: openSearch,
							className: `p-2 rounded-xl ${transparent ? "bg-white/10 text-white" : "bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400"}`,
							"aria-label": "Search",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagCopilot, { variant: "navbar" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsSidebarOpen(true),
							className: `p-2 rounded-xl ${transparent ? "bg-white/10 text-white" : "bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400"}`,
							"aria-label": "Open menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "w-6 h-6" })
						})
					]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isSidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-[120]",
		onClick: () => setIsSidebarOpen(false)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { x: "-100%" },
		animate: { x: 0 },
		exit: { x: "-100%" },
		transition: {
			type: "spring",
			damping: 25,
			stiffness: 200
		},
		className: "fixed top-0 left-0 h-screen w-[80vw] max-w-sm bg-white dark:bg-[#0a0f1c] z-[130] shadow-2xl p-6 md:p-8 flex flex-col border-r border-black/10 dark:border-white/10",
		onMouseLeave: () => setIsSidebarOpen(false),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center mb-12 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setIsSidebarOpen(false),
					className: "p-2 rounded-xl bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10 transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/img/logo_wbc.webp",
					alt: "Techy News",
					className: "h-8 w-auto dark:brightness-100 brightness-0"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto pr-4 space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4",
								children: __("Menu")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
								href: "/classic",
								className: "block text-xl font-black tracking-tighter text-black dark:text-white hover:text-primary transition-colors py-2",
								children: __("Formato Clásico")
							}),
							navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
								href: link.href,
								className: "block text-xl font-black tracking-tighter text-black dark:text-white hover:text-primary transition-colors py-2",
								children: link.label
							}, link.href)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
								href: "/dashboard",
								className: "block text-xl font-black tracking-tighter text-primary transition-colors py-2",
								children: __("Studio")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full bg-black/10 dark:bg-white/10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2",
							children: __("Legal & Social")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
									href: "/terms",
									className: "text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors",
									children: __("Terms of Use")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
									href: "/privacy",
									className: "text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors",
									children: __("Privacy Policy")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://github.com/carlos-silveira",
									target: "_blank",
									className: "text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors",
									children: "GitHub"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://x.com/TechyNewsLat",
									target: "_blank",
									className: "text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors",
									children: "𝕏 Twitter"
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:hidden flex flex-wrap items-center gap-4 py-4 mt-4 border-t border-black/10 dark:border-white/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PushSubscribe, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto pt-8 md:border-t border-black/10 dark:border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-black uppercase tracking-[0.15em] text-gray-500",
					children: "© 2026 Carlos Silveira"
				})
			})
		]
	})] }) })] });
}
//#endregion
//#region resources/js/Components/PublicFooter.jsx
function PublicFooter({ className = "" }) {
	const { __ } = useLanguage();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: `border-t border-black/5 dark:border-white/5 py-12 pb-32 md:pb-12 relative z-10 transition-colors duration-500 ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/img/logo_wbc.webp",
					alt: "Techy News",
					width: "150",
					height: "28",
					className: "h-7 w-auto opacity-50 hover:opacity-100 transition-opacity dark:brightness-100 brightness-0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-black uppercase tracking-[0.15em] text-gray-700 dark:text-gray-400",
					children: "© 2026 Carlos Silveira"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-center gap-x-8 gap-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
							href: "/",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors",
							children: __("Home")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
							href: "/archive",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors",
							children: __("Archive")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://github.com/carlos-silveira",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors",
							children: "GitHub"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://x.com/TechyNewsLat",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors",
							children: "𝕏 Twitter"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://www.facebook.com/techynews",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors",
							children: "Facebook"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
							href: "/about",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors",
							children: __("Contact & About")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
							href: "/terms",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors",
							children: __("Terms of Use")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
							href: "/privacy",
							className: "text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors",
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
