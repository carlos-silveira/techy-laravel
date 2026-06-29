import "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { t as TopNav } from "./TopNav-Bodf4MR3.mjs";
import { t as Footer } from "./Footer-CGhUuaZS.mjs";
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
