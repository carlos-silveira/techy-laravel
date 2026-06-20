import Layout from "./Layout-Boew9BvM.mjs";
import "react";
import { usePage } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Post.jsx
function Post() {
	const { post } = usePage().props;
	console.log(post);
	return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", {
		className: "max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-extrabold text-gray-900",
				children: post.title
			}),
			/* @__PURE__ */ jsx("div", {
				className: "aspect-w-3 mt-5 bg-gray-200 rounded-lg overflow-hidden",
				children: /* @__PURE__ */ jsx("img", {
					src: post.image,
					alt: post.title,
					className: "object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-6 prose prose-indigo prose-lg text-gray-500",
				children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: post.content } })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-4 flex items-center",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex-shrink-0",
					children: /* @__PURE__ */ jsx("img", {
						className: "h-10 w-10 rounded-full",
						src: "/img/avatars/1.jpg",
						alt: "Author name"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "ml-3",
					children: [/* @__PURE__ */ jsx("div", {
						className: "text-sm font-medium text-gray-900",
						children: post.author
					}), /* @__PURE__ */ jsx("div", {
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
