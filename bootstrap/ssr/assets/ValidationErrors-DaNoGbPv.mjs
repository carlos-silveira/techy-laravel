import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
//#region resources/js/Components/Input.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Input({ type = "text", name, value, className, autoComplete, required, isFocused, handleChange }) {
	const input = (0, import_react.useRef)();
	(0, import_react.useEffect)(() => {
		if (isFocused) input.current.focus();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col items-start",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		htmlFor: forInput,
		className: `block font-medium text-sm text-gray-700 ` + className,
		children: value ? value : children
	});
}
//#endregion
//#region resources/js/Components/ValidationErrors.jsx
function ValidationErrors({ errors }) {
	return Object.keys(errors).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-medium text-red-600",
			children: "Whoops! Something went wrong."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 list-disc list-inside text-sm text-red-600",
			children: Object.keys(errors).map(function(key, index) {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: errors[key] }, index);
			})
		})]
	});
}
//#endregion
export { Label as n, Input as r, ValidationErrors as t };
