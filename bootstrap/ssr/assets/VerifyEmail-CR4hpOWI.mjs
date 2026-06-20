import "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { a as useForm, n as Head_default, r as Link_default } from "../ssr.mjs";
import { n as Button, t as Guest } from "./Guest-CZRzPASu.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function VerifyEmail({ status }) {
	const { post, processing } = useForm();
	const submit = (e) => {
		e.preventDefault();
		post(route("verification.send"));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guest, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: "Email Verification" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 text-sm text-gray-600",
			children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."
		}),
		status === "verification-link-sent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 font-medium text-sm text-green-600",
			children: "A new verification link has been sent to the email address you provided during registration."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			onSubmit: submit,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					processing,
					children: "Resend Verification Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
					href: route("logout"),
					method: "post",
					as: "button",
					className: "underline text-sm text-gray-600 hover:text-gray-900",
					children: "Log Out"
				})]
			})
		})
	] });
}
//#endregion
export { VerifyEmail as default };
