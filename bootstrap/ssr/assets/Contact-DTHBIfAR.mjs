import "./TopNav-X8GB84N3.mjs";
import "./Footer-BNnC3ML4.mjs";
import Layout from "./Layout-Boew9BvM.mjs";
import "react";
import { usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Contact.jsx
function Post() {
	const { post } = usePage().props;
	return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("section", {
		id: "contact",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto py-8",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "text-3xl font-bold mb-4 px-2",
					children: "Contáctame"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-gray-800 px-2",
					children: "Si tienes alguna pregunta o te gustaría trabajar conmigo, no dudes en contactarme utilizando el formulario a continuación."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx("iframe", {
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
