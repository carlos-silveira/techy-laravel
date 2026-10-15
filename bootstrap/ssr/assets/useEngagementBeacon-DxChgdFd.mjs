import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Ca5yncsy.mjs";
import { l as axios } from "../ssr.mjs";
//#region resources/js/Components/AdsterraAd.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AdsterraAd = ({ type, className = "" }) => {
	let width = 300;
	let height = 250;
	let src = "/sponsors/300x250.html";
	if (type === "728x90") {
		width = 728;
		height = 90;
		src = "/sponsors/728x90.html";
	} else if (type === "320x50") {
		width = 320;
		height = 50;
		src = "/sponsors/320x50.html";
	} else if (type === "native") {
		width = "100%";
		height = 500;
		src = "/sponsors/native.html";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `flex justify-center items-center overflow-hidden my-6 ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			src,
			width,
			height,
			frameBorder: "0",
			scrolling: "no",
			sandbox: "allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-forms allow-top-navigation-by-user-activation",
			className: "max-w-full",
			title: `Adsterra Ad ${type}`
		})
	});
};
//#endregion
//#region resources/js/Hooks/useEngagementBeacon.js
/**
* Sends a beacon to mark the page visit as "engaged" (verified human reader)
* once the user has spent at least minTimeMs on the page AND performed some interaction
* (scroll, click, touch, or keypress).
*/
function useEngagementBeacon({ minTimeMs = 4e3 } = {}) {
	const hasSent = (0, import_react.useRef)(false);
	const hasInteracted = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		hasSent.current = false;
		hasInteracted.current = false;
		const onInteract = () => {
			hasInteracted.current = true;
		};
		window.addEventListener("scroll", onInteract, { passive: true });
		window.addEventListener("click", onInteract, { passive: true });
		window.addEventListener("touchstart", onInteract, { passive: true });
		window.addEventListener("keydown", onInteract, { passive: true });
		const timer = setTimeout(() => {
			if (!hasSent.current && document.visibilityState === "visible") {
				hasSent.current = true;
				axios.post("/api/pv/engaged", { path: window.location.pathname + window.location.search }).catch(() => {});
			}
		}, minTimeMs);
		return () => {
			clearTimeout(timer);
			window.removeEventListener("scroll", onInteract);
			window.removeEventListener("click", onInteract);
			window.removeEventListener("touchstart", onInteract);
			window.removeEventListener("keydown", onInteract);
		};
	}, []);
}
//#endregion
export { AdsterraAd as n, useEngagementBeacon as t };
