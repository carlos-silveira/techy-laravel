import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
//#region resources/js/Components/AdSlot.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* A responsive Google AdSense slot that automatically pushes ads when rendered.
* It remains invisible if no VITE_ADSENSE_ID is configured in the .env file.
*/
function AdSlot({ adClient = "ca-pub-6228787275246149", adSlot = null, format = "auto", responsive = "true", className = "" }) {
	const adRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!adClient) return;
		try {
			if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch (e) {
			console.error("AdSense Error: ", e);
		}
	}, [adClient, adSlot]);
	if (!adClient && true) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `ad-container overflow-hidden w-full ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ins", {
			className: "adsbygoogle",
			style: { display: "block" },
			"data-ad-client": adClient,
			...adSlot ? { "data-ad-slot": adSlot } : {},
			"data-ad-format": format,
			"data-full-width-responsive": responsive,
			ref: adRef
		})
	});
}
//#endregion
export { AdSlot as t };
