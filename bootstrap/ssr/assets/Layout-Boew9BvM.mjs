import { t as TopNav } from "./TopNav-X8GB84N3.mjs";
import { t as Footer } from "./Footer-BNnC3ML4.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Layout.jsx
var Layout = ({ children }) => {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col min-h-screen",
		children: [
			/* @__PURE__ */ jsx(TopNav, {}),
			/* @__PURE__ */ jsx("main", {
				className: "flex-grow",
				children
			}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
};
//#endregion
export { Layout as default };
