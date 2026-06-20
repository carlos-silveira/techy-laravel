import { useEffect, useRef } from "react";
import { jsx } from "react/jsx-runtime";
//#region resources/js/Components/AdSlot.jsx
/**
* A responsive Google AdSense slot that automatically pushes ads when rendered.
* It remains invisible if no VITE_ADSENSE_ID is configured in the .env file.
*/
function AdSlot({ adClient = "ca-pub-6228787275246149", adSlot = null, format = "auto", responsive = "true", className = "" }) {
	const adRef = useRef(null);
	useEffect(() => {
		if (!adClient) return;
		try {
			if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch (e) {
			console.error("AdSense Error: ", e);
		}
	}, [adClient, adSlot]);
	if (!adClient && true) return null;
	return /* @__PURE__ */ jsx("div", {
		className: `ad-container overflow-hidden w-full ${className}`,
		children: /* @__PURE__ */ jsx("ins", {
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
