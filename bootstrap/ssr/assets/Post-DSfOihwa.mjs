import "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { s as usePage } from "../ssr.mjs";
import Layout from "./Layout-DUmNuscV.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Post() {
	const { post } = usePage().props;
	console.log(post);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-extrabold text-gray-900",
				children: post.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-w-3 mt-5 bg-gray-200 rounded-lg overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: post.image,
					alt: post.title,
					className: "object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 prose prose-indigo prose-lg text-gray-500",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: post.content } })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "h-10 w-10 rounded-full",
						src: "/img/avatars/1.jpg",
						alt: "Author name"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium text-gray-900",
						children: post.author
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-gray-500",
						children: post.date
					})]
				})]
			})
		]
	}) });
}
//#endregion
export { Post as default };
