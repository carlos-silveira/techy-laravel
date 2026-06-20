import "./chunk-CNf5ZN-e.mjs";
import { t as require_jsx_runtime, u as require_react } from "../ssr.mjs";
import { t as TopNav } from "./TopNav-B3rI2vpu.mjs";
import { t as Footer } from "./Footer-BTZfnQVl.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var Layout = ({ children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-grow",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
};
//#endregion
export { Layout as default };
