import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import TopNav from "./TopNav-BwTmCMc4.mjs";
import Footer from "./Footer-nKv9BgXK.mjs";
import "react-icons/fa/index.esm.js";
const Layout = ({ children }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsx(TopNav, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  Layout as default
};
