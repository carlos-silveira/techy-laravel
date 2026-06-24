import "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { n as Head_default } from "../ssr.mjs";
import { n as Navbar, t as PublicFooter } from "./PublicFooter-BkQa8X3q.mjs";
import { t as useLanguage } from "./useLanguage-BqZCgGwa.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Terms() {
	const { __ } = useLanguage();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-gray-900 dark:text-white font-sans selection:bg-primary/30 overflow-x-hidden relative transition-colors duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: `${__("Terms of Use")} | Techy News` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/8 rounded-full blur-[120px] pointer-events-none mix-blend-screen overflow-hidden" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "max-w-4xl mx-auto px-6 py-32 relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white/[0.6] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 shadow-sm dark:shadow-none transition-all duration-500 relative overflow-hidden group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl md:text-5xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400",
						children: __("Terms of Use")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "prose prose-lg dark:prose-invert prose-p:font-light prose-h2:font-black prose-a:text-primary max-w-none text-gray-700 dark:text-gray-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: __("Last Updated: April 5, 2026") }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: __("Welcome to Techy News (techynews.lat). By accessing or using our website, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree with any part of these terms, please do not use our platform.") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["1. ", __("Use of Content")] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: __("All news articles, graphics, and text compiled on this site are for informational purposes only. The synthesized content provided by our AI systems is intended to summarize current events based on publicly available data. You may not reproduce, distribute, or commercially exploit our materials without express written permission.") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["2. ", __("Artificial Intelligence Disclaimer")] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: __("Techy News utilizes artificial intelligence to synthesize, generate, and draft news articles rapidly from various data feeds. While we strive for accuracy and neutrality, AI-generated content may occasionally contain inaccuracies. Users are encouraged to cross-reference critical information. We assume no liability for errors or omissions in synthesized articles.") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["3. ", __("User Conduct")] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: __("When accessing our platform, you agree not to engage in any activity that disrupts the website's infrastructure, such as automated scraping, denial of service attacks, or probing vulnerabilities in our systems.") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["4. ", __("Third-Party Links")] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: __("Our articles may occasionally contain outbound links to third-party sources or external research. We have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies or terms.") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["5. ", __("Changes to Terms")] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: __("Techy News reserves the right to modify these Terms at any time. We will indicate modifications by updating the \"Last Updated\" date at the top of this document. Continued use of the platform after changes have been posted constitutes your acceptance of the revised Terms.") })
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicFooter, {})
		]
	});
}
//#endregion
export { Terms as default };
