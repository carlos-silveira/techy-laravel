import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { a as G, c as xe, o as Se, t as require_jsx_runtime, u as require_react } from "../ssr.mjs";
import { n as motion, t as createLucideIcon } from "./createLucideIcon-DugaG8X6.mjs";
import { t as Eye } from "./eye-BqUgxAxt.mjs";
import { t as Mail } from "./mail-BMPwKDE_.mjs";
import { t as Zap } from "./zap-D2sGHD7m.mjs";
//#region node_modules/lucide-react/dist/esm/icons/eye-off.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var EyeOff = createLucideIcon("EyeOff", [
	["path", {
		d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
		key: "ct8e1f"
	}],
	["path", {
		d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
		key: "151rxh"
	}],
	["path", {
		d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
		key: "13bj9a"
	}],
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/lock.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Lock = createLucideIcon("Lock", [["rect", {
	width: "18",
	height: "11",
	x: "3",
	y: "11",
	rx: "2",
	ry: "2",
	key: "1w4ew1"
}], ["path", {
	d: "M7 11V7a5 5 0 0 1 10 0v4",
	key: "fwvmzm"
}]]);
//#endregion
//#region resources/js/Pages/Auth/Login.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login({ status, canResetPassword }) {
	const [showPassword, setShowPassword] = import_react.useState(false);
	const { data, setData, post, processing, errors, reset } = G({
		email: "",
		password: "",
		remember: false
	});
	(0, import_react.useEffect)(() => {
		return () => {
			reset("password");
		};
	}, []);
	const submit = (e) => {
		e.preventDefault();
		post("/login");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#02040a] text-white font-sans flex items-center justify-center relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Se, { title: "Studio Login" }),
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
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 text-primary" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-black uppercase tracking-[0.3em] text-primary",
											children: "Studio Access"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-3xl font-black tracking-tighter",
										children: "Welcome back."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-gray-500 font-light mt-2 text-sm",
										children: "Sign in to access the AI Studio."
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
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											name: "email",
											value: data.email,
											onChange: (e) => setData("email", e.target.value),
											autoComplete: "email",
											autoFocus: true,
											placeholder: "your@email.com",
											className: "w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-4 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-2",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: showPassword ? "text" : "password",
												name: "password",
												value: data.password,
												onChange: (e) => setData("password", e.target.value),
												autoComplete: "current-password",
												placeholder: "••••••••",
												className: "w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-12 py-4 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setShowPassword(!showPassword),
												className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors",
												children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-4 h-4" })
											})
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												name: "remember",
												checked: data.remember,
												onChange: (e) => setData("remember", e.target.checked),
												className: "w-4 h-4 rounded bg-white/5 border border-white/10 text-primary focus:ring-primary/30 accent-primary"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-gray-500 font-medium",
												children: "Remember me"
											})]
										}), canResetPassword && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(xe, {
											href: "/forgot-password",
											className: "text-xs text-gray-500 hover:text-primary transition-colors font-medium",
											children: "Forgot password?"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										disabled: processing,
										className: "w-full bg-white text-black font-black py-4 rounded-xl hover:scale-105 hover:bg-gray-100 transition-all text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2",
										children: [processing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-4 h-4" }), processing ? "Signing in..." : "Enter Studio"]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-[10px] font-black uppercase tracking-widest text-gray-700 mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(xe, {
							href: "/",
							className: "hover:text-gray-500 transition-colors",
							children: "← Back to Techy News"
						})
					})
				]
			})
		]
	});
}
//#endregion
export { Login as default };
