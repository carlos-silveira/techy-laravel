import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import "react";
import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { route } from "ziggy-js";
import { Toaster } from "sonner";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "Techy News";
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/About.jsx": () => import("./assets/About-DkL9d6eW.mjs"), "./Pages/AboutUs.jsx": () => import("./assets/AboutUs-DkITluav.mjs"), "./Pages/Archive.jsx": () => import("./assets/Archive-BdK1NViZ.mjs"), "./Pages/ArticleShow.jsx": () => import("./assets/ArticleShow-kb555Nqf.mjs"), "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-ko4__P8y.mjs"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-BqWPSbhp.mjs"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-ofqz6YVs.mjs"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-S2ph0NJM.mjs"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-BVzaCn3-.mjs"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-krbWSU1O.mjs"), "./Pages/Contact.jsx": () => import("./assets/Contact-DfZRL6co.mjs"), "./Pages/Dashboard.jsx": () => import("./assets/Dashboard-Ly9z7yYu.mjs"), "./Pages/Footer.jsx": () => import("./assets/Footer-nKv9BgXK.mjs"), "./Pages/Layout.jsx": () => import("./assets/Layout-J9PEkCSD.mjs"), "./Pages/Post.jsx": () => import("./assets/Post-5Glb9Sne.mjs"), "./Pages/Privacy.jsx": () => import("./assets/Privacy-BvyQkvGW.mjs"), "./Pages/Terms.jsx": () => import("./assets/Terms-CiJJNBJn.mjs"), "./Pages/TopNav.jsx": () => import("./assets/TopNav-BwTmCMc4.mjs"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-96olZzJv.mjs") })),
    setup({ App, props }) {
      global.route = (name, params, absolute) => route(name, params, absolute, {
        ...page.props.ziggy,
        location: new URL(page.props.ziggy.location)
      });
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(App, { ...props }),
        /* @__PURE__ */ jsx(Toaster, { theme: "dark", position: "bottom-right" })
      ] });
    }
  })
);
