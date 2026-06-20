import { n as Button, t as Guest } from "./Guest-BiagxEC5.mjs";
import { n as Label, r as Input, t as ValidationErrors } from "./ValidationErrors-DbFdy9K0.mjs";
import { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Auth/ConfirmPassword.jsx
function ConfirmPassword() {
	const { data, setData, post, processing, errors, reset } = useForm({ password: "" });
	useEffect(() => {
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
	return /* @__PURE__ */ jsxs(Guest, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Confirm Password" }),
		/* @__PURE__ */ jsx("div", {
			className: "mb-4 text-sm text-gray-600",
			children: "This is a secure area of the application. Please confirm your password before continuing."
		}),
		/* @__PURE__ */ jsx(ValidationErrors, { errors }),
		/* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ jsx(Label, {
					forInput: "password",
					value: "Password"
				}), /* @__PURE__ */ jsx(Input, {
					type: "password",
					name: "password",
					value: data.password,
					className: "mt-1 block w-full",
					isFocused: true,
					handleChange: onHandleChange
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "flex items-center justify-end mt-4",
				children: /* @__PURE__ */ jsx(Button, {
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
