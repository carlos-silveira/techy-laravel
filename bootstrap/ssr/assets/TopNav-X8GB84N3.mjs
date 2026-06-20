import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/TopNav.jsx
var TopNav_exports = /* @__PURE__ */ __exportAll({ default: () => TopNav });
function TopNav() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};
	return /* @__PURE__ */ jsxs("nav", {
		className: "bg-logo-color shadow",
		children: [/* @__PURE__ */ jsx("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex justify-between h-16",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex",
					children: /* @__PURE__ */ jsxs("a", {
						href: "/",
						className: "flex-shrink-0 flex items-center",
						children: [/* @__PURE__ */ jsx("img", {
							className: "block lg:hidden h-8 w-auto",
							src: "/img/logo_wbc.png",
							alt: "Logo"
						}), /* @__PURE__ */ jsx("img", {
							className: "hidden lg:block h-8 w-auto",
							src: "/img/logo_wbc.png",
							alt: "Logo"
						})]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center",
					children: [/* @__PURE__ */ jsx("div", {
						className: "md:hidden",
						children: /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "block text-gray-500 hover:text-white focus:text-white focus:outline-none",
							onClick: toggleMobileMenu,
							children: /* @__PURE__ */ jsx("svg", {
								className: "h-6 w-6 fill-current",
								viewBox: "0 0 24 24",
								children: /* @__PURE__ */ jsx("path", {
									fillRule: "evenodd",
									clipRule: "evenodd",
									d: "M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
								})
							})
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "hidden md:block",
						children: /* @__PURE__ */ jsxs("div", {
							className: "ml-10 flex items-baseline space-x-4",
							children: [
								/* @__PURE__ */ jsx("a", {
									href: "/",
									className: "px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-50",
									children: "Inicio"
								}),
								/* @__PURE__ */ jsx("a", {
									href: "/about-us",
									className: "px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-50",
									children: "Acerca de"
								}),
								/* @__PURE__ */ jsx("a", {
									href: "/contact",
									className: "px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-50",
									children: "Contacto"
								})
							]
						})
					})]
				})]
			})
		}), isMobileMenuOpen && /* @__PURE__ */ jsx("div", {
			className: "md:hidden",
			children: /* @__PURE__ */ jsxs("div", {
				className: "px-2 pt-2 pb-3 space-y-1 sm:px-3",
				children: [
					/* @__PURE__ */ jsx("a", {
						href: "/",
						className: "block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-900 hover:bg-gray-50",
						children: "Inicio"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "/about-us",
						className: "block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-900 hover:bg-gray-50",
						children: "Acerca de"
					}),
					/* @__PURE__ */ jsx("a", {
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
