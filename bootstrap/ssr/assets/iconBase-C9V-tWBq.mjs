import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { u as require_react } from "../ssr.mjs";
//#region node_modules/react-icons/lib/esm/iconContext.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var DefaultContext = {
	color: void 0,
	size: void 0,
	className: void 0,
	style: void 0,
	attr: void 0
};
var IconContext = import_react.createContext && import_react.createContext(DefaultContext);
//#endregion
//#region node_modules/react-icons/lib/esm/iconBase.js
var __assign = function() {
	__assign = Object.assign || function(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
};
function Tree2Element(tree) {
	return tree && tree.map(function(node, i) {
		return import_react.createElement(node.tag, __assign({ key: i }, node.attr), Tree2Element(node.child));
	});
}
function GenIcon(data) {
	return function(props) {
		return import_react.createElement(IconBase, __assign({ attr: __assign({}, data.attr) }, props), Tree2Element(data.child));
	};
}
function IconBase(props) {
	var elem = function(conf) {
		var attr = props.attr, size = props.size, title = props.title, svgProps = __rest(props, [
			"attr",
			"size",
			"title"
		]);
		var computedSize = size || conf.size || "1em";
		var className;
		if (conf.className) className = conf.className;
		if (props.className) className = (className ? className + " " : "") + props.className;
		return import_react.createElement("svg", __assign({
			stroke: "currentColor",
			fill: "currentColor",
			strokeWidth: "0"
		}, conf.attr, attr, svgProps, {
			className,
			style: __assign(__assign({ color: props.color || conf.color }, conf.style), props.style),
			height: computedSize,
			width: computedSize,
			xmlns: "http://www.w3.org/2000/svg"
		}), title && import_react.createElement("title", null, title), props.children);
	};
	return IconContext !== void 0 ? import_react.createElement(IconContext.Consumer, null, function(conf) {
		return elem(conf);
	}) : elem(DefaultContext);
}
//#endregion
export { GenIcon as t };
