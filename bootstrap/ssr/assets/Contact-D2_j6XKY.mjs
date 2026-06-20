import "./chunk-CNf5ZN-e.mjs";
import { s as X, t as require_jsx_runtime, u as require_react } from "../ssr.mjs";
import "./TopNav-B3rI2vpu.mjs";
import "./Footer-BTZfnQVl.mjs";
import Layout from "./Layout-DLbV3_Dz.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Post() {
	const { post } = X().props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold mb-4 px-2",
					children: "Contáctame"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-gray-800 px-2",
					children: "Si tienes alguna pregunta o te gustaría trabajar conmigo, no dudes en contactarme utilizando el formulario a continuación."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						src: "https://docs.google.com/forms/d/e/1FAIpQLSfbcFyLtqiu13ohGUd-2OF2SG4vG3C5S8FtrPr4wfpsy1VWZA/viewform?embedded=true",
						width: "100%",
						height: "600px",
						frameborder: "0",
						marginheight: "0",
						marginwidth: "0",
						children: "Cargando…"
					})
				})
			]
		})
	}) }) });
}
//#endregion
export { Post as default };
