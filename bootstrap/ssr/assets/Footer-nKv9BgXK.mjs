import { jsx, jsxs } from "react/jsx-runtime";
import "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa/index.esm.js";
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-logo-color text-gray-400 py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("img", { src: "/img/logo_wbc.png", alt: "Logo", className: "h-10" }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "flex space-x-4", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-gray-400 hover:text-gray-200", children: /* @__PURE__ */ jsx(FaFacebook, { className: "h-6 w-6" }) }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-gray-400 hover:text-gray-200", children: /* @__PURE__ */ jsx(FaTwitter, { className: "h-6 w-6" }) }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-gray-400 hover:text-gray-200", children: /* @__PURE__ */ jsx(FaYoutube, { className: "h-6 w-6" }) }) })
    ] }) })
  ] }) });
}
export {
  Footer as default
};
