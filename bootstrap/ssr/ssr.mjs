import "react";
import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { route } from "ziggy-js";
import { Toaster } from "sonner";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region node_modules/laravel-vite-plugin/inertia-helpers/index.js
async function resolvePageComponent(path, pages) {
	for (const p of Array.isArray(path) ? path : [path]) {
		const page = pages[p];
		if (typeof page === "undefined") continue;
		return typeof page === "function" ? page() : page;
	}
	throw new Error(`Page not found: ${path}`);
}
//#endregion
//#region resources/js/ssr.jsx
var appName = "TechyNews";
createServer((page) => createInertiaApp({
	page,
	render: ReactDOMServer.renderToString,
	title: (title) => title ? title.includes(appName) ? title : `${title} | ${appName}` : appName,
	resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* #__PURE__ */ Object.assign({
		"./Pages/About.jsx": () => import("./assets/About-BF4mg2OX.mjs"),
		"./Pages/AboutUs.jsx": () => import("./assets/AboutUs-dttcHBnJ.mjs"),
		"./Pages/Archive.jsx": () => import("./assets/Archive-DjWIWHMH.mjs"),
		"./Pages/ArticleShow.jsx": () => import("./assets/ArticleShow-CBRoB0Lq.mjs"),
		"./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-rhVogesD.mjs"),
		"./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-C6p1OChC.mjs"),
		"./Pages/Auth/Login.jsx": () => import("./assets/Login-B4hr0W_3.mjs"),
		"./Pages/Auth/Register.jsx": () => import("./assets/Register-B5NvIcBj.mjs"),
		"./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-CI0HZQiM.mjs"),
		"./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-zOrUgP5E.mjs"),
		"./Pages/Contact.jsx": () => import("./assets/Contact-DTHBIfAR.mjs"),
		"./Pages/Dashboard.jsx": () => import("./assets/Dashboard-Jh_YQ7m7.mjs"),
		"./Pages/Error.jsx": () => import("./assets/Error-DbAotE8A.mjs"),
		"./Pages/Footer.jsx": () => import("./assets/Footer-BNnC3ML4.mjs").then((n) => n.n),
		"./Pages/Layout.jsx": () => import("./assets/Layout-Boew9BvM.mjs"),
		"./Pages/NewsletterArchive.jsx": () => import("./assets/NewsletterArchive-CN-dgnvI.mjs"),
		"./Pages/Post.jsx": () => import("./assets/Post-Dx0Qsqq-.mjs"),
		"./Pages/Privacy.jsx": () => import("./assets/Privacy-BCScX6Jb.mjs"),
		"./Pages/Terms.jsx": () => import("./assets/Terms-CSpP4RQ2.mjs"),
		"./Pages/TopNav.jsx": () => import("./assets/TopNav-X8GB84N3.mjs").then((n) => n.n),
		"./Pages/Welcome.jsx": () => import("./assets/Welcome-CfVZCSsm.mjs")
	})),
	setup({ App, props }) {
		global.route = (name, params, absolute) => route(name, params, absolute, {
			...page.props.ziggy,
			location: new URL(page.props.ziggy.location)
		});
		return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(App, { ...props }), /* @__PURE__ */ jsx(Toaster, {
			theme: "dark",
			position: "bottom-right"
		})] });
	}
}));
//#endregion
export {};
