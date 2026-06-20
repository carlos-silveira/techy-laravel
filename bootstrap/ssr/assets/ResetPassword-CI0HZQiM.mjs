import { n as Button, t as Guest } from "./Guest-BiagxEC5.mjs";
import { n as Label, r as Input, t as ValidationErrors } from "./ValidationErrors-DbFdy9K0.mjs";
import { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Auth/ResetPassword.jsx
function ResetPassword({ token, email }) {
	const { data, setData, post, processing, errors, reset } = useForm({
		token,
		email,
		password: "",
		password_confirmation: ""
	});
	useEffect(() => {
		return () => {
			reset("password", "password_confirmation");
		};
	}, []);
	const onHandleChange = (event) => {
		setData(event.target.name, event.target.value);
	};
	const submit = (e) => {
		e.preventDefault();
		post(route("password.update"));
	};
	return /* @__PURE__ */ jsxs(Guest, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Reset Password" }),
		/* @__PURE__ */ jsx(ValidationErrors, { errors }),
		/* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
					forInput: "email",
					value: "Email"
				}), /* @__PURE__ */ jsx(Input, {
					type: "email",
					name: "email",
					value: data.email,
					className: "mt-1 block w-full",
					autoComplete: "username",
					handleChange: onHandleChange
				})] }),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ jsx(Label, {
						forInput: "password",
						value: "Password"
					}), /* @__PURE__ */ jsx(Input, {
						type: "password",
						name: "password",
						value: data.password,
						className: "mt-1 block w-full",
						autoComplete: "new-password",
						isFocused: true,
						handleChange: onHandleChange
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ jsx(Label, {
						forInput: "password_confirmation",
						value: "Confirm Password"
					}), /* @__PURE__ */ jsx(Input, {
						type: "password",
						name: "password_confirmation",
						value: data.password_confirmation,
						className: "mt-1 block w-full",
						autoComplete: "new-password",
						handleChange: onHandleChange
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex items-center justify-end mt-4",
					children: /* @__PURE__ */ jsx(Button, {
						className: "ml-4",
						processing,
						children: "Reset Password"
					})
				})
			]
		})
	] });
}
//#endregion
export { ResetPassword as default };
