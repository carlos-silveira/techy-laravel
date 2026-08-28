import "./rolldown-runtime-BMI-E3GI.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-BEFDdCF_.mjs";
import { t as createLucideIcon } from "./createLucideIcon-Bszla4zf.mjs";
//#region node_modules/lucide-react/dist/esm/icons/book-open.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var BookOpen = createLucideIcon("BookOpen", [["path", {
	d: "M12 7v14",
	key: "1akyts"
}], ["path", {
	d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
	key: "ruj8y"
}]]);
require_react();
var import_jsx_runtime = require_jsx_runtime();
var AdsterraAd = ({ type, className = "" }) => {
	let width = 300;
	let height = 250;
	let src = "/ads/300x250.html";
	if (type === "728x90") {
		width = 728;
		height = 90;
		src = "/ads/728x90.html";
	} else if (type === "320x50") {
		width = 320;
		height = 50;
		src = "/ads/320x50.html";
	} else if (type === "native") {
		width = "100%";
		height = 500;
		src = "/ads/native.html";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `flex justify-center items-center overflow-hidden my-6 ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			src,
			width,
			height,
			frameBorder: "0",
			scrolling: "no",
			sandbox: "allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin",
			className: "max-w-full",
			title: `Adsterra Ad ${type}`
		})
	});
};
//#endregion
export { BookOpen as n, AdsterraAd as t };
