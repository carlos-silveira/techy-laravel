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
* Detect if an image URL is a publisher logo, badge, avatar, ad, or broken asset.
*/
var isForbiddenImage = (url) => {
	if (!url || typeof url !== "string") return true;
	const lower = url.toLowerCase().trim();
	if (!lower || lower === "none" || lower === "null") return true;
	for (const hash of [
		"6ada3b21d1bc30ab6431b9be",
		"6aaa98648e983d8bad151ad7",
		"6aaa989bb9f3b2223fc0f627",
		"723b22a81ff6a760c4520b963b43451e"
	]) if (lower.includes(hash)) return true;
	if (lower.includes(".svg") || lower.includes(".gif") || lower.includes("format=svg") || lower.includes("format=gif")) return true;
	if (lower.includes("googleusercontent.com") && (lower.includes("=h60") || lower.includes("=s60") || lower.includes("=w100") || lower.includes("=w50"))) return true;
	if (lower.includes("githubassets.com")) return true;
	for (const domain of [
		"bat.bing.com",
		"trx-hub.com",
		"analytics.twitter.com",
		"sp.analytics.yahoo.com",
		"t.co",
		"doubleclick.net",
		"adnxs.com"
	]) if (lower.includes(domain)) return true;
	if (lower.endsWith("/undefined") || lower.endsWith("undefined")) return true;
	if (lower.includes("pass/download") || lower.includes("download%2520") || lower.includes("download%20") || lower.includes("/download.") || /download\s*\(\d+\)/i.test(lower)) return true;
	for (const kw of [
		"tc-logo",
		"techcrunch-logo",
		"techcrunch",
		"wired-logo",
		"theverge-logo",
		"verge-logo",
		"reuters-logo",
		"bloomberg-logo",
		"author",
		"avatar",
		"headshot",
		"profile",
		"contributor",
		"badge",
		"tracker",
		"pixel",
		"button",
		"favicon",
		"disrupt",
		"gettyimages",
		"reporter",
		"writer",
		"world-fair",
		"world fair",
		"worldfair",
		"sapphire",
		"sapphire reserve",
		"sponsor",
		"sponsored",
		"partner",
		"partnership",
		"promo",
		"promotion",
		"promotional",
		"acquisition",
		"rollover",
		"newsletter",
		"signup",
		"subscribe",
		"subscription",
		"conference",
		"summit",
		"festival",
		"tc-disrupt",
		"techcrunch-event",
		"techcrunch-summit",
		"wired-festival",
		"wired-event",
		"wired_app",
		"wired-world",
		"emoji",
		"banner",
		"header-ad",
		"footer-ad"
	]) if (lower.includes(kw)) return true;
	if (/[?&](?:w|width|h|height|resize)=(?:[1-9]|[1-9]\d|1\d\d|200)\b/i.test(lower)) {
		if (!lower.includes("substackcdn.com") && !lower.includes("media.wired.com") && !lower.includes("techcrunch.com")) return true;
	}
	if (/[_-](?:16|24|32|48|60|64|80|96|100|120|150|200)x\d+/i.test(lower) || /w_(?:16|24|32|48|60|64|80|96|100|120|150|200)\b/i.test(lower) || /h_(?:16|24|32|48|60|64|80|96|100|120|150|200)\b/i.test(lower)) return true;
	return false;
};
/**
* Upgrade CDN thumbnail URLs to full high-resolution versions.
*/
var upgradeImageUrl = (url) => {
	if (!url) return "";
	let upgraded = String(url);
	if (upgraded.includes("substackcdn.com/image/fetch/")) {
		const match = upgraded.match(/https%3A%2F%2F[^\s"\'<>]+/i);
		if (match) try {
			return decodeURIComponent(match[0]);
		} catch {}
		return upgraded.replace(/w_\d+,h_\d+,c_fill[^\/]*/i, "w_1456,c_limit,f_auto,q_auto:good");
	}
	if (upgraded.includes("media.wired.com/photos/")) return upgraded.replace(/w_\d+(?:%2Ch_\d+)?(?:%2Cc_limit|,c_limit)?/i, "w_1600,c_limit").replace(/1:1/i, "16:9");
	if (upgraded.includes("techcrunch.com/wp-content/uploads/")) {
		if (/[?&](?:w=\d+|resize=\d+,\d+)/i.test(upgraded)) return upgraded.replace(/[?&](?:w=\d+|resize=\d+,\d+)[^&]*/i, "?w=1200");
	}
	const wpMatch = upgraded.match(/^(.+)-\d{2,4}x\d{2,4}(\.(?:jpe?g|png|webp))$/i);
	if (wpMatch) return wpMatch[1] + wpMatch[2];
	if (upgraded.includes("wikimedia.org/wikipedia/commons/thumb/")) return upgraded.replace(/\/\d{2,4}px-([^/]+)$/i, "/1200px-$1");
	return upgraded;
};
/**
* Get the final image URL, falling back to content extraction or generic defaults.
*/
var getFinalImage = (article, width = 1200) => {
	let url = article.cover_image_path;
	if (isForbiddenImage(url)) url = null;
	if (!url) {
		const contentImg = findFirstImage(article.content);
		if (!isForbiddenImage(contentImg)) url = contentImg;
	}
	if (url) url = upgradeImageUrl(url);
	if (url && !url.startsWith("http") && !url.startsWith("/")) url = "/storage/" + url;
	if (!url) {
		const text = `${article.slug || ""} ${article.title || ""}`.toLowerCase();
		if (text.includes("space") || text.includes("mars") || text.includes("planet") || text.includes("orbit") || text.includes("nasa") || text.includes("astronomy") || text.includes("cloud on mars")) url = "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9";
		else if (text.includes("musk") || text.includes("election") || text.includes("campaign") || text.includes("republican") || text.includes("democrat") || text.includes("congress") || text.includes("senate") || text.includes("capitol") || text.includes("politics") || text.includes("pac") || text.includes("voter")) url = "https://images.unsplash.com/photo-1541872703-74c5e44368f9";
		else if (text.includes("virus") || text.includes("infection") || text.includes("pathogen") || text.includes("shamonda") || text.includes("disease") || text.includes("vaccine") || text.includes("cancer") || text.includes("biology") || text.includes("medical")) url = "https://images.unsplash.com/photo-1582719508461-905c673771fd";
		else if (text.includes("speaker") || text.includes("google home") || text.includes("wi-fi") || text.includes("smart home") || text.includes("gadget") || text.includes("wearable") || text.includes("headphone") || text.includes("smart ring") || text.includes("watch") || text.includes("audio")) url = "https://images.unsplash.com/photo-1558002038-1055907df827";
		else if (text.includes("disney") || text.includes("streaming") || text.includes("hulu") || text.includes("cinema") || text.includes("subscrip") || text.includes("movie")) url = "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37";
		else if (text.includes("fusion") || text.includes("reactor") || text.includes("plasma") || text.includes("quantum")) url = "https://images.unsplash.com/photo-1507413245164-6160d8298b31";
		else if (text.includes("iphone") || text.includes("apple") || text.includes("smartphone") || text.includes("mobile") || text.includes("android") || text.includes("dating") || text.includes("app ") || text.includes("apps")) url = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9";
		else if (text.includes("semiconductor") || text.includes("chip") || text.includes("gpu") || text.includes("hardware") || text.includes("silicon") || text.includes("cfs")) url = "https://images.unsplash.com/photo-1518770660439-4636190af475";
		else if (text.includes("security") || text.includes("exploit") || text.includes("hacker") || text.includes("vulnerab") || text.includes("patch") || text.includes("openssl") || text.includes("crypto") || text.includes("malware") || text.includes("breach")) url = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b";
		else if (text.includes("ai") || text.includes("model") || text.includes("llm") || text.includes("gpt") || text.includes("gemini") || text.includes("claude") || text.includes("chatgpt") || text.includes("anthropic") || text.includes("deepseek")) url = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485";
		else if (text.includes("cloud") || text.includes("aws") || text.includes("server") || text.includes("datacenter") || text.includes("meta") || text.includes("stock") || text.includes("zuckerberg")) url = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31";
		else url = "https://images.unsplash.com/photo-1451187580459-43490279c0fa";
	}
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
export { upgradeImageUrl as n, ArrowRight as r, getFinalImage as t };
