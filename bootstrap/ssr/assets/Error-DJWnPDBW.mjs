import { n as useLanguage } from "./ThemeToggle-z5uN9EoT.mjs";
import { n as Navbar, t as PublicFooter } from "./PublicFooter-N9CdGiZK.mjs";
import { t as CommandPalette } from "./CommandPalette-C0WOoolx.mjs";
import "react";
import { Head, Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, ArrowLeft, Bug, Ghost, Home, ShieldAlert } from "lucide-react";
//#region resources/js/Pages/Error.jsx
function Error({ status }) {
	const { __ } = useLanguage();
	const getErrorContent = () => {
		switch (status) {
			case 404: return {
				title: "404",
				subtitle: __("Houston, we have a problem"),
				description: __("The page you are looking for has been abducted by aliens, or it never existed in the first place."),
				icon: Ghost,
				color: "text-primary"
			};
			case 500: return {
				title: "500",
				subtitle: __("Server Meltdown"),
				description: __("Our servers are currently experiencing a minor existential crisis. Our engineers have been dispatched."),
				icon: Bug,
				color: "text-red-500"
			};
			case 503: return {
				title: "503",
				subtitle: __("Scheduled Maintenance"),
				description: __("We are currently upgrading our AI systems. We will be back online shortly."),
				icon: AlertTriangle,
				color: "text-amber-500"
			};
			case 403: return {
				title: "403",
				subtitle: __("Access Denied"),
				description: __("You do not have the required security clearance to view this classified document."),
				icon: ShieldAlert,
				color: "text-purple-500"
			};
			default: return {
				title: status,
				subtitle: __("An Error Occurred"),
				description: __("Something went wrong. Please try again later."),
				icon: AlertTriangle,
				color: "text-gray-500"
			};
		}
	};
	const content = getErrorContent();
	const Icon = content.icon;
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-black dark:text-white font-sans selection:bg-primary/30 flex flex-col transition-colors duration-500",
		children: [
			/* @__PURE__ */ jsx(Head, { title: `${content.title} — ${content.subtitle}` }),
			/* @__PURE__ */ jsx(CommandPalette, {}),
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsxs("main", {
				className: "flex-1 flex items-center justify-center relative overflow-hidden px-6 pt-32 pb-20",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" }), /* @__PURE__ */ jsxs("div", {
					className: "relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "relative mb-8 group",
							children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-600/30 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" }), /* @__PURE__ */ jsxs("div", {
								className: "relative w-32 h-32 sm:w-48 sm:h-48 bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-full flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 shadow-2xl",
								children: [/* @__PURE__ */ jsx(Icon, {
									className: `w-16 h-16 sm:w-24 sm:h-24 ${content.color} drop-shadow-lg`,
									strokeWidth: 1.5
								}), status === 404 && /* @__PURE__ */ jsx("div", {
									className: "absolute -top-4 -right-4 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg rotate-12 animate-pulse",
									children: "Lost in Space"
								})]
							})]
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "text-[6rem] sm:text-[9rem] font-black tracking-tighter leading-none mb-4 text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-500 dark:from-white dark:to-gray-600 drop-shadow-sm select-none",
							children: content.title
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-2xl sm:text-3xl font-black tracking-tight mb-6 text-gray-900 dark:text-gray-100",
							children: content.subtitle
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-lg text-gray-600 dark:text-gray-400 font-light mb-12 max-w-md mx-auto leading-relaxed",
							children: content.description
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row gap-4 items-center justify-center",
							children: [/* @__PURE__ */ jsxs(Link, {
								href: "/",
								className: "inline-flex items-center justify-center gap-3 bg-primary text-white font-black px-8 py-4 rounded-full hover:scale-105 hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(43,124,238,0.4)] uppercase tracking-wider text-sm group min-w-[200px]",
								children: [/* @__PURE__ */ jsx(Home, { className: "w-4 h-4" }), __("Go Home")]
							}), /* @__PURE__ */ jsxs("button", {
								onClick: () => window.history.back(),
								className: "inline-flex items-center justify-center gap-3 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-black/10 dark:border-white/10 font-black px-8 py-4 rounded-full hover:bg-gray-50 dark:hover:bg-white/10 transition-all uppercase tracking-wider text-sm group min-w-[200px]",
								children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }), __("Go Back")]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx(PublicFooter, {})
		]
	});
}
//#endregion
export { Error as default };
