import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-BEFDdCF_.mjs";
import { l as axios, n as toast } from "../ssr.mjs";
import { n as motion } from "./createLucideIcon-Bszla4zf.mjs";
import { r as useLanguage } from "./RagCopilot-BGmdJSAn.mjs";
//#region resources/js/Components/NewsletterBlock.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewsletterBlock() {
	const { __ } = useLanguage();
	const [email, setEmail] = (0, import_react.useState)("");
	const [isSubscribing, setIsSubscribing] = (0, import_react.useState)(false);
	const handleSubscribe = async (e) => {
		e.preventDefault();
		if (!email) return;
		setIsSubscribing(true);
		try {
			await axios.post("/api/subscribe", { email });
			toast.success(__("You're on the list!"));
			setEmail("");
		} catch (error) {
			toast.error(__("Subscription failed. Please try again."));
		} finally {
			setIsSubscribing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-24 px-6 border-t border-black/5 dark:border-white/5 relative z-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-4xl mx-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 40
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: {
					duration: .9,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				className: "bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[3rem] p-8 sm:p-14 md:p-20 relative overflow-hidden group shadow-sm dark:shadow-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-700 group-hover:scale-125" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-black text-primary uppercase tracking-[0.3em] block mb-6",
								children: __("AI Weekly Digest")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-[1] text-black dark:text-white transition-colors",
								children: [
									__("Intelligence,"),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									__("delivered weekly.")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-gray-500 mb-12 font-light text-base sm:text-lg max-w-lg mx-auto leading-relaxed",
								children: __("Every Friday: AI research breakthroughs, engineering insights, and curated tools — synthesized and curated entirely by our AI engine.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubscribe,
								className: "flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: __("your@email.com"),
									className: "flex-1 w-full px-6 py-4 rounded-xl bg-gray-100 dark:bg-black/60 border border-black/5 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: isSubscribing,
									className: "w-full sm:w-auto px-8 py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-black tracking-wider uppercase text-sm hover:scale-105 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg dark:shadow-none",
									children: isSubscribing ? __("Joining...") : __("Subscribe")
								})]
							})
						]
					})
				]
			})
		})
	});
}
//#endregion
export { NewsletterBlock as t };
