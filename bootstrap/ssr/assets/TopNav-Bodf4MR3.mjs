import { o as __toESM, r as __exportAll } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
//#region resources/js/Pages/TopNav.jsx
var TopNav_exports = /* @__PURE__ */ __exportAll({ default: () => TopNav });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TopNav() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, import_react.useState)(false);
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "bg-logo-color shadow",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between h-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/",
						className: "flex-shrink-0 flex items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "block lg:hidden h-8 w-auto",
							src: "/img/logo_wbc.webp",
							alt: "Logo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "hidden lg:block h-8 w-auto",
							src: "/img/logo_wbc.webp",
							alt: "Logo"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "block text-gray-500 hover:text-white focus:text-white focus:outline-none",
							onClick: toggleMobileMenu,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "h-6 w-6 fill-current",
								viewBox: "0 0 24 24",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									fillRule: "evenodd",
									clipRule: "evenodd",
									d: "M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
								})
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-10 flex items-baseline space-x-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/",
									className: "px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-50",
									children: "Inicio"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/about-us",
									className: "px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-50",
									children: "Acerca de"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/contact",
									className: "px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-50",
									children: "Contacto"
								})
							]
						})
					})]
				})]
			})
		}), isMobileMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-2 pt-2 pb-3 space-y-1 sm:px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-900 hover:bg-gray-50",
						children: "Inicio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/about-us",
						className: "block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-900 hover:bg-gray-50",
						children: "Acerca de"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/contact",
						className: "block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-900 hover:bg-gray-50",
						children: "Contacto"
					})
				]
			})
		})]
	});
}
//#endregion
export { TopNav_exports as n, TopNav as t };
