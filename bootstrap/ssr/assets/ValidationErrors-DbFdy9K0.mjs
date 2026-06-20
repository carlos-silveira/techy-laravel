import { useEffect, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Components/Input.jsx
function Input({ type = "text", name, value, className, autoComplete, required, isFocused, handleChange }) {
	const input = useRef();
	useEffect(() => {
		if (isFocused) input.current.focus();
	}, []);
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col items-start",
		children: /* @__PURE__ */ jsx("input", {
			type,
			name,
			value,
			className: `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` + className,
			ref: input,
			autoComplete,
			required,
			onChange: (e) => handleChange(e)
		})
	});
}
//#endregion
//#region resources/js/Components/Label.jsx
function Label({ forInput, value, className, children }) {
	return /* @__PURE__ */ jsx("label", {
		htmlFor: forInput,
		className: `block font-medium text-sm text-gray-700 ` + className,
		children: value ? value : children
	});
}
//#endregion
//#region resources/js/Components/ValidationErrors.jsx
function ValidationErrors({ errors }) {
	return Object.keys(errors).length > 0 && /* @__PURE__ */ jsxs("div", {
		className: "mb-4",
		children: [/* @__PURE__ */ jsx("div", {
			className: "font-medium text-red-600",
			children: "Whoops! Something went wrong."
		}), /* @__PURE__ */ jsx("ul", {
			className: "mt-3 list-disc list-inside text-sm text-red-600",
			children: Object.keys(errors).map(function(key, index) {
				return /* @__PURE__ */ jsx("li", { children: errors[key] }, index);
			})
		})]
	});
}
//#endregion
export { Label as n, Input as r, ValidationErrors as t };
