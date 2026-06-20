import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { a as G, c as xe, o as Se, t as require_jsx_runtime, u as require_react } from "../ssr.mjs";
import { n as Button, t as Guest } from "./Guest-DN5A6Df-.mjs";
import { n as Label, r as Input, t as ValidationErrors } from "./ValidationErrors-CAwgQBOl.mjs";
//#region resources/js/Pages/Auth/Register.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Register() {
	const { data, setData, post, processing, errors, reset } = G({
		name: "",
		email: "",
		password: "",
		password_confirmation: ""
	});
	(0, import_react.useEffect)(() => {
		return () => {
			reset("password", "password_confirmation");
		};
	}, []);
	const onHandleChange = (event) => {
		setData(event.target.name, event.target.type === "checkbox" ? event.target.checked : event.target.value);
	};
	const submit = (e) => {
		e.preventDefault();
		post(route("register"));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guest, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Se, { title: "Register" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValidationErrors, { errors }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					forInput: "name",
					value: "Name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "text",
					name: "name",
					value: data.name,
					className: "mt-1 block w-full",
					autoComplete: "name",
					isFocused: true,
					handleChange: onHandleChange,
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						forInput: "email",
						value: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "email",
						name: "email",
						value: data.email,
						className: "mt-1 block w-full",
						autoComplete: "username",
						handleChange: onHandleChange,
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						forInput: "password",
						value: "Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						name: "password",
						value: data.password,
						className: "mt-1 block w-full",
						autoComplete: "new-password",
						handleChange: onHandleChange,
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						forInput: "password_confirmation",
						value: "Confirm Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						name: "password_confirmation",
						value: data.password_confirmation,
						className: "mt-1 block w-full",
						handleChange: onHandleChange,
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-end mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(xe, {
						href: route("login"),
						className: "underline text-sm text-gray-600 hover:text-gray-900",
						children: "Already registered?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "ml-4",
						processing,
						children: "Register"
					})]
				})
			]
		})
	] });
}
//#endregion
export { Register as default };
