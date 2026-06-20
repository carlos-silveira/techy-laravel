import "./chunk-CNf5ZN-e.mjs";
import { a as G, c as xe, o as Se, t as require_jsx_runtime, u as require_react } from "../ssr.mjs";
import { n as motion } from "./createLucideIcon-DugaG8X6.mjs";
import { t as ArrowLeft } from "./arrow-left-Dr_AQ-JE.mjs";
import { t as Mail } from "./mail-BMPwKDE_.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function ForgotPassword({ status }) {
	const { data, setData, post, processing, errors } = G({ email: "" });
	const submit = (e) => {
		e.preventDefault();
		post("/forgot-password");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#02040a] text-white font-sans flex items-center justify-center relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Se, { title: "Forgot Password" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-primary/8 rounded-full blur-[200px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/8 rounded-full blur-[150px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 40
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .8,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				className: "relative z-10 w-full max-w-md px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center mb-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(xe, {
							href: "/",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/img/logo_wbc.png",
								alt: "Techy News",
								className: "h-10 w-auto"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-4 h-4 text-primary" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-black uppercase tracking-[0.3em] text-primary",
											children: "Password Reset"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-3xl font-black tracking-tighter",
										children: "Forgot password?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-gray-500 font-light mt-2 text-sm leading-relaxed",
										children: "No worries. Enter your email and we'll send you a reset link."
									})
								]
							}),
							status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-sm text-green-400 font-medium",
								children: status
							}),
							Object.keys(errors).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl",
								children: Object.values(errors).map((err, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-red-400 font-medium",
									children: err
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: submit,
								className: "space-y-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										name: "email",
										value: data.email,
										onChange: (e) => setData("email", e.target.value),
										autoFocus: true,
										placeholder: "your@email.com",
										className: "w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-4 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
									})]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: processing,
									className: "w-full bg-white text-black font-black py-4 rounded-xl hover:scale-105 hover:bg-gray-100 transition-all text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2",
									children: [processing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-4 h-4" }), processing ? "Sending..." : "Send Reset Link"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-[10px] font-black uppercase tracking-widest text-gray-700 mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(xe, {
							href: "/login",
							className: "hover:text-gray-500 transition-colors flex items-center justify-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-3 h-3" }), " Back to Login"]
						})
					})
				]
			})
		]
	});
}
//#endregion
export { ForgotPassword as default };
