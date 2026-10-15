import { t as createLucideIcon } from "./createLucideIcon-Bszla4zf.mjs";
//#region node_modules/lucide-react/dist/esm/icons/arrow-right.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowRight = createLucideIcon("ArrowRight", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]);
//#endregion
//#region resources/js/utils.js
/**
* Extract the first image from a ProseMirror JSON content structure.
*/
var findFirstImage = (content) => {
	if (!content) return null;
	if (typeof content === "string") {
		const match = content.match(/<img[^>]+src="([^">]+)"/);
		if (match) return match[1];
		try {
			return findFirstImage(JSON.parse(content));
		} catch {
			return null;
		}
	}
	if (typeof content === "object") {
		if (content.type === "image" && content.attrs?.src) return content.attrs.src;
		if (content.content && Array.isArray(content.content)) for (const node of content.content) {
			const found = findFirstImage(node);
			if (found) return found;
		}
	}
	return null;
};
/**
* Get the final image URL, falling back to content extraction or generic defaults.
*/
var getFinalImage = (article, width = 1200) => {
	let url = article.cover_image_path;
	if (!url) url = findFirstImage(article.content);
	if (url && !url.startsWith("http") && !url.startsWith("/")) url = "/storage/" + url;
	if (!url) url = article.slug && article.slug.includes("not-paid-to-write-code") ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085" : "https://images.unsplash.com/photo-1451187580459-43490279c0fa";
	if (url.includes("unsplash.com")) {
		const separator = url.includes("?") ? "&" : "?";
		return `${url}${separator}auto=format&fit=crop&q=80&w=${width}`;
	}
	if (url && !url.startsWith("http")) {
		if (url.startsWith("/storage/")) return url;
		return `/storage/${url}`;
	}
	return url;
};
//#endregion
export { ArrowRight as n, getFinalImage as t };
