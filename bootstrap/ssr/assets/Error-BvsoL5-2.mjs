import "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { n as Head_default, r as Link_default } from "../ssr.mjs";
import { t as createLucideIcon } from "./createLucideIcon-DvhrQ9-F.mjs";
import { t as ArrowLeft } from "./arrow-left-a0_4ySVD.mjs";
import { n as House, t as ShieldAlert } from "./shield-alert-BFSRNw-R.mjs";
import { n as Navbar, t as PublicFooter } from "./PublicFooter-jmfcGQfK.mjs";
import { t as useLanguage } from "./useLanguage-BqZCgGwa.mjs";
import { t as CommandPalette } from "./CommandPalette-D-OMEt-P.mjs";
//#region node_modules/lucide-react/dist/esm/icons/bug.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Bug = createLucideIcon("Bug", [
	["path", {
		d: "m8 2 1.88 1.88",
		key: "fmnt4t"
	}],
	["path", {
		d: "M14.12 3.88 16 2",
		key: "qol33r"
	}],
	["path", {
		d: "M9 7.13v-1a3.003 3.003 0 1 1 6 0v1",
		key: "d7y7pr"
	}],
	["path", {
		d: "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",
		key: "xs1cw7"
	}],
	["path", {
		d: "M12 20v-9",
		key: "1qisl0"
	}],
	["path", {
		d: "M6.53 9C4.6 8.8 3 7.1 3 5",
		key: "32zzws"
	}],
	["path", {
		d: "M6 13H2",
		key: "82j7cp"
	}],
	["path", {
		d: "M3 21c0-2.1 1.7-3.9 3.8-4",
		key: "4p0ekp"
	}],
	["path", {
		d: "M20.97 5c0 2.1-1.6 3.8-3.5 4",
		key: "18gb23"
	}],
	["path", {
		d: "M22 13h-4",
		key: "1jl80f"
	}],
	["path", {
		d: "M17.2 17c2.1.1 3.8 1.9 3.8 4",
		key: "k3fwyw"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/ghost.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Ghost = createLucideIcon("Ghost", [
	["path", {
		d: "M9 10h.01",
		key: "qbtxuw"
	}],
	["path", {
		d: "M15 10h.01",
		key: "1qmjsl"
	}],
	["path", {
		d: "M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z",
		key: "uwwb07"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/triangle-alert.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TriangleAlert = createLucideIcon("TriangleAlert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
require_react();
var import_jsx_runtime = require_jsx_runtime();
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
				icon: TriangleAlert,
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
				icon: TriangleAlert,
				color: "text-gray-500"
			};
		}
	};
	const content = getErrorContent();
	const Icon = content.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-black dark:text-white font-sans selection:bg-primary/30 flex flex-col transition-colors duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: `${content.title} — ${content.subtitle}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 flex items-center justify-center relative overflow-hidden px-6 pt-32 pb-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mb-8 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-600/30 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-32 h-32 sm:w-48 sm:h-48 bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-full flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 shadow-2xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: `w-16 h-16 sm:w-24 sm:h-24 ${content.color} drop-shadow-lg`,
									strokeWidth: 1.5
								}), status === 404 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -top-4 -right-4 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg rotate-12 animate-pulse",
									children: "Lost in Space"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-[6rem] sm:text-[9rem] font-black tracking-tighter leading-none mb-4 text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-500 dark:from-white dark:to-gray-600 drop-shadow-sm select-none",
							children: content.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl sm:text-3xl font-black tracking-tight mb-6 text-gray-900 dark:text-gray-100",
							children: content.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg text-gray-600 dark:text-gray-400 font-light mb-12 max-w-md mx-auto leading-relaxed",
							children: content.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row gap-4 items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link_default, {
								href: "/",
								className: "inline-flex items-center justify-center gap-3 bg-primary text-white font-black px-8 py-4 rounded-full hover:scale-105 hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(43,124,238,0.4)] uppercase tracking-wider text-sm group min-w-[200px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "w-4 h-4" }), __("Go Home")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => window.history.back(),
								className: "inline-flex items-center justify-center gap-3 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-black/10 dark:border-white/10 font-black px-8 py-4 rounded-full hover:bg-gray-50 dark:hover:bg-white/10 transition-all uppercase tracking-wider text-sm group min-w-[200px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }), __("Go Back")]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicFooter, {})
		]
	});
}
//#endregion
export { Error as default };
