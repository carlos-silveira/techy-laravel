import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { a as useForm, n as Head_default } from "../ssr.mjs";
import { n as Button, t as Guest } from "./Guest-CZRzPASu.mjs";
import { n as Label, r as Input, t as ValidationErrors } from "./ValidationErrors-DaNoGbPv.mjs";
//#region resources/js/Pages/Auth/ConfirmPassword.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ConfirmPassword() {
	const { data, setData, post, processing, errors, reset } = useForm({ password: "" });
	(0, import_react.useEffect)(() => {
		return () => {
			reset("password");
		};
	}, []);
	const onHandleChange = (event) => {
		setData(event.target.name, event.target.value);
	};
	const submit = (e) => {
		e.preventDefault();
		post(route("password.confirm"));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Guest, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: "Confirm Password" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 text-sm text-gray-600",
			children: "This is a secure area of the application. Please confirm your password before continuing."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValidationErrors, { errors }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					forInput: "password",
					value: "Password"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "password",
					name: "password",
					value: data.password,
					className: "mt-1 block w-full",
					isFocused: true,
					handleChange: onHandleChange
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-end mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "ml-4",
					processing,
					children: "Confirm"
				})
			})]
		})
	] });
}
//#endregion
export { ConfirmPassword as default };
