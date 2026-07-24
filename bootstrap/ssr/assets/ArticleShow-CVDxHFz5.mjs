import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-Cafemv7i.mjs";
import { i as Link_default, l as axios, n as toast, r as Head_default } from "../ssr.mjs";
import { t as require_dayjs_min } from "./dayjs.min-DAMeu7No.mjs";
import { a as setLogLevel, i as log, r as __name, t as select_default } from "./src-Bqlj18LF.mjs";
import { $ as purify, C as getDiagramLoader, E as getSiteConfig, I as reset, L as sanitizeCss, N as registerDiagram, P as registerLazyLoadedDiagrams, Q as updateSiteConfig, S as getDiagram, T as getEffectiveHtmlLabels, V as saveConfigFromInitialize, W as setConfig, X as styles_default, Z as themes_default, _ as frontMatterRegex, b as getConfig, c as configureSvgSize, g as evaluate, l as cssStyleSheetToString, m as detectors, n as addDirective, p as detectType, q as setSiteConfig, r as assignWithDepth_default, t as UnknownDiagramError, u as defaultConfig } from "./chunk-CSCIHK7Q-nIlf7H9D.mjs";
import { S as isBuffer, a as decodeEntities, f as isDetailedError, g as utils_default, h as removeDirectives, i as cleanAndMerge, o as encodeEntities, v as isTypedArray, x as isArrayLike, y as isArguments } from "./chunk-5ZQYHXKU-DxqPicp-.mjs";
import { t as selectSvgElement } from "./chunk-WU5MYG2G-Dk2lBau1.mjs";
import { i as registerIconPacks, o as dedent } from "./chunk-O5CBEL6O-BIhXkq4I.mjs";
import "./chunk-BSJP7CBP-B2esSOvw.mjs";
import "./chunk-L5ZTLDWV-D2AaIoLd.mjs";
import "./chunk-NZK2D7GU-ByOgkFuB.mjs";
import "./chunk-3OPIFGDE-DiW0CTCC.mjs";
import "./chunk-KSCS5N6A-Wq4T1yvn.mjs";
import { n as registerLayoutLoaders } from "./chunk-LZXEDZCA-BbA5d5AP.mjs";
import { n as load, t as JSON_SCHEMA } from "./chunk-XPW4576I-Bz89cptk.mjs";
import { n as motion, t as createLucideIcon } from "./createLucideIcon-DvhrQ9-F.mjs";
import { r as ArrowRight } from "./x-DGRKKDf6.mjs";
import { t as useMotionValue } from "./use-motion-value-B5SU4CfM.mjs";
import { t as Heart } from "./heart-H89RX9xL.mjs";
import { t as Linkedin } from "./linkedin-kPujlZY8.mjs";
import { t as useLanguage } from "./useLanguage--u2fgJ4Y.mjs";
import { n as Navbar, t as PublicFooter } from "./PublicFooter-sRrbc8Mn.mjs";
import { t as getFinalImage } from "./utils-CvS3ysxz.mjs";
import { t as CommandPalette } from "./CommandPalette-ed7o9K_g.mjs";
import { t as AdSlot } from "./AdSlot-DEgQsep5.mjs";
//#region node_modules/es-toolkit/dist/compat/_internal/isPrototype.mjs
function isPrototype(value) {
	const constructor = value?.constructor;
	return value === (typeof constructor === "function" ? constructor.prototype : Object.prototype);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/isEmpty.mjs
/**
* Checks if a given value is empty.
*
* - If the given value is a string, checks if it is an empty string.
* - If the given value is an array, `Map`, or `Set`, checks if its size is 0.
* - If the given value is an [array-like object](../predicate/isArrayLike.md), checks if its length is 0.
* - If the given value is an object, checks if it is an empty object with no properties.
* - Primitive values (booleans, numbers, or bigints) are considered empty.
*
* @param [value] - The value to check.
* @returns `true` if the value is empty, `false` otherwise.
*
* @example
* isEmpty(); // true
* isEmpty(null); // true
* isEmpty(""); // true
* isEmpty([]); // true
* isEmpty({}); // true
* isEmpty(new Map()); // true
* isEmpty(new Set()); // true
* isEmpty("hello"); // false
* isEmpty([1, 2, 3]); // false
* isEmpty({ a: 1 }); // false
* isEmpty(new Map([["key", "value"]])); // false
* isEmpty(new Set([1, 2, 3])); // false
*/
function isEmpty(value) {
	if (value == null) return true;
	if (isArrayLike(value)) {
		if (typeof value.splice !== "function" && typeof value !== "string" && !isBuffer(value) && !isTypedArray(value) && !isArguments(value)) return false;
		return value.length === 0;
	}
	if (typeof value === "object" || typeof value === "function") {
		if (value instanceof Map || value instanceof Set) return value.size === 0;
		const keys = Object.keys(value);
		if (isPrototype(value)) return keys.filter((x) => x !== "constructor").length === 0;
		return keys.length === 0;
	}
	return true;
}
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/book-open.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var BookOpen = createLucideIcon("BookOpen", [["path", {
	d: "M12 7v14",
	key: "1akyts"
}], ["path", {
	d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
	key: "ruj8y"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/link.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Link = createLucideIcon("Link", [["path", {
	d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
	key: "1cjeqo"
}], ["path", {
	d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
	key: "19qd67"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/twitter.js
/**
* @license lucide-react v0.460.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Twitter = createLucideIcon("Twitter", [["path", {
	d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
	key: "pff0z6"
}]]);
//#endregion
//#region node_modules/stylis/src/Enum.js
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var NAMESPACE = "@namespace";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
//#endregion
//#region node_modules/stylis/src/Utility.js
/**
* @param {number}
* @return {number}
*/
var abs = Math.abs;
/**
* @param {number}
* @return {string}
*/
var from = String.fromCharCode;
/**
* @param {string} value
* @return {string}
*/
function trim(value) {
	return value.trim();
}
/**
* @param {string} value
* @param {(string|RegExp)} pattern
* @param {string} replacement
* @return {string}
*/
function replace(value, pattern, replacement) {
	return value.replace(pattern, replacement);
}
/**
* @param {string} value
* @param {string} search
* @param {number} position
* @return {number}
*/
function indexof(value, search, position) {
	return value.indexOf(search, position);
}
/**
* @param {string} value
* @param {number} index
* @return {number}
*/
function charat(value, index) {
	return value.charCodeAt(index) | 0;
}
/**
* @param {string} value
* @param {number} begin
* @param {number} end
* @return {string}
*/
function substr(value, begin, end) {
	return value.slice(begin, end);
}
/**
* @param {string} value
* @return {number}
*/
function strlen(value) {
	return value.length;
}
/**
* @param {any[]} value
* @return {number}
*/
function sizeof(value) {
	return value.length;
}
/**
* @param {any} value
* @param {any[]} array
* @return {any}
*/
function append(value, array) {
	return array.push(value), value;
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
/**
* @param {string} value
* @param {object | null} root
* @param {object | null} parent
* @param {string} type
* @param {string[] | string} props
* @param {object[] | string} children
* @param {object[]} siblings
* @param {number} length
*/
function node(value, root, parent, type, props, children, length, siblings) {
	return {
		value,
		root,
		parent,
		type,
		props,
		children,
		line,
		column,
		length,
		return: "",
		siblings
	};
}
/**
* @return {number}
*/
function char() {
	return character;
}
/**
* @return {number}
*/
function prev() {
	character = position > 0 ? charat(characters, --position) : 0;
	if (column--, character === 10) column = 1, line--;
	return character;
}
/**
* @return {number}
*/
function next() {
	character = position < length ? charat(characters, position++) : 0;
	if (column++, character === 10) column = 1, line++;
	return character;
}
/**
* @return {number}
*/
function peek() {
	return charat(characters, position);
}
/**
* @return {number}
*/
function caret() {
	return position;
}
/**
* @param {number} begin
* @param {number} end
* @return {string}
*/
function slice(begin, end) {
	return substr(characters, begin, end);
}
/**
* @param {number} type
* @return {number}
*/
function token(type) {
	switch (type) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
/**
* @param {string} value
* @return {any[]}
*/
function alloc(value) {
	return line = column = 1, length = strlen(characters = value), position = 0, [];
}
/**
* @param {any} value
* @return {any}
*/
function dealloc(value) {
	return characters = "", value;
}
/**
* @param {number} type
* @return {string}
*/
function delimit(type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
/**
* @param {number} type
* @return {string}
*/
function whitespace(type) {
	while (character = peek()) if (character < 33) next();
	else break;
	return token(type) > 2 || token(character) > 3 ? "" : " ";
}
/**
* @param {number} index
* @param {number} count
* @return {string}
*/
function escaping(index, count) {
	while (--count && next()) if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;
	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
/**
* @param {number} type
* @return {number}
*/
function delimiter(type) {
	while (next()) switch (character) {
		case type: return position;
		case 34:
		case 39:
			if (type !== 34 && type !== 39) delimiter(character);
			break;
		case 40:
			if (type === 41) delimiter(type);
			break;
		case 92:
			next();
			break;
	}
	return position;
}
/**
* @param {number} type
* @param {number} index
* @return {number}
*/
function commenter(type, index) {
	while (next()) if (type + character === 57) break;
	else if (type + character === 84 && peek() === 47) break;
	return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
/**
* @param {number} index
* @return {string}
*/
function identifier(index) {
	while (!token(peek())) next();
	return slice(index, position);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
/**
* @param {string} value
* @return {object[]}
*/
function compile(value) {
	return dealloc(parse$1("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {string[]} rule
* @param {string[]} rules
* @param {string[]} rulesets
* @param {number[]} pseudo
* @param {number[]} points
* @param {string[]} declarations
* @return {object}
*/
function parse$1(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character = 0;
	var type = "";
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters = type;
	while (scanning) switch (previous = character, character = next()) {
		case 40: if (previous != 108 && charat(characters, length - 1) == 58) {
			if (indexof(characters += replace(delimit(character), "&", "&\f"), "&\f", abs(index ? points[index - 1] : 0)) != -1) ampersand = -1;
			break;
		}
		case 34:
		case 39:
		case 91:
			characters += delimit(character);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			characters += whitespace(previous);
			break;
		case 92:
			characters += escaping(caret() - 1, 7);
			continue;
		case 47:
			switch (peek()) {
				case 42:
				case 47:
					append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
					if ((token(previous || 1) == 5 || token(peek() || 1) == 5) && strlen(characters) && substr(characters, -1, void 0) !== " ") characters += " ";
					break;
				default: characters += "/";
			}
			break;
		case 123 * variable: points[index++] = strlen(characters) * ampersand;
		case 125 * variable:
		case 59:
		case 0:
			switch (character) {
				case 0:
				case 125: scanning = 0;
				case 59 + offset:
					if (ampersand == -1) characters = replace(characters, /\f/g, "");
					if (property > 0 && (strlen(characters) - length || variable === 0 && previous === 47)) append(property > 32 ? declaration(characters + ";", rule, parent, length - 1, declarations) : declaration(replace(characters, " ", "") + ";", rule, parent, length - 2, declarations), declarations);
					break;
				case 59: characters += ";";
				default:
					append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length, rulesets), rulesets);
					if (character === 123) if (offset === 0) parse$1(characters, root, reference, reference, props, rulesets, length, points, children);
					else {
						switch (atrule) {
							case 99: if (charat(characters, 3) === 110) break;
							case 108: if (charat(characters, 2) === 97) break;
							default: offset = 0;
							case 100:
							case 109:
							case 115:
						}
						if (offset) parse$1(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length, children), children), rules, children, length, points, rule ? props : children);
						else parse$1(characters, reference, reference, reference, [""], children, 0, points, children);
					}
			}
			index = offset = property = 0, variable = ampersand = 1, type = characters = "", length = pseudo;
			break;
		case 58: length = 1 + strlen(characters), property = previous;
		default:
			if (variable < 1) {
				if (character == 123) --variable;
				else if (character == 125 && variable++ == 0 && prev() == 125) continue;
			}
			switch (characters += from(character), character * variable) {
				case 38:
					ampersand = offset > 0 ? 1 : (characters += "\f", -1);
					break;
				case 44:
					points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
					break;
				case 64:
					if (peek() === 45) characters += delimit(next());
					atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
					break;
				case 45: if (previous === 45 && strlen(characters) == 2) variable = 0;
			}
	}
	return rulesets;
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {number} index
* @param {number} offset
* @param {string[]} rules
* @param {number[]} points
* @param {string} type
* @param {string[]} props
* @param {string[]} children
* @param {number} length
* @param {object[]} siblings
* @return {object}
*/
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length, siblings) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [""];
	var size = sizeof(rule);
	for (var i = 0, j = 0, k = 0; i < index; ++i) for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x) if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x]))) props[k++] = z;
	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length, siblings);
}
/**
* @param {number} value
* @param {object} root
* @param {object?} parent
* @param {object[]} siblings
* @return {object}
*/
function comment(value, root, parent, siblings) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {number} length
* @param {object[]} siblings
* @return {object}
*/
function declaration(value, root, parent, length, siblings) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length, siblings);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
/**
* @param {object[]} children
* @param {function} callback
* @return {string}
*/
function serialize(children, callback) {
	var output = "";
	for (var i = 0; i < children.length; i++) output += callback(children[i], i, children, callback) || "";
	return output;
}
/**
* @param {object} element
* @param {number} index
* @param {object[]} children
* @param {function} callback
* @return {string}
*/
function stringify(element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break;
		case IMPORT:
		case NAMESPACE:
		case DECLARATION: return element.return = element.return || element.value;
		case COMMENT: return "";
		case KEYFRAMES: return element.return = element.value + "{" + serialize(element.children, callback) + "}";
		case RULESET: if (!strlen(element.value = element.props.join(","))) return "";
	}
	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
/**
* @param {function[]} collection
* @return {function}
*/
function middleware(collection) {
	var length = sizeof(collection);
	return function(element, index, children, callback) {
		var output = "";
		for (var i = 0; i < length; i++) output += collection[i](element, index, children, callback) || "";
		return output;
	};
}
//#endregion
//#region node_modules/mermaid/dist/mermaid.core.mjs
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
var id = "c4";
var c4Detector_default = {
	id,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./c4Diagram-AAUBKEIU-BhX0cIpL.mjs");
		return {
			id,
			diagram: diagram2
		};
	}, "loader")
};
var id2 = "flowchart";
var flowDetector_default = {
	id: id2,
	detector: /* @__PURE__ */ __name((txt, config) => {
		if (config?.flowchart?.defaultRenderer === "dagre-wrapper" || config?.flowchart?.defaultRenderer === "elk") return false;
		return /^\s*graph/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./flowDiagram-I6XJVG4X-DQCCaizq.mjs");
		return {
			id: id2,
			diagram: diagram2
		};
	}, "loader")
};
var id3 = "flowchart-v2";
var flowDetector_v2_default = {
	id: id3,
	detector: /* @__PURE__ */ __name((txt, config) => {
		if (config?.flowchart?.defaultRenderer === "dagre-d3") return false;
		if (config?.flowchart?.defaultRenderer === "elk") config.layout = "elk";
		if (/^\s*graph/.test(txt) && config?.flowchart?.defaultRenderer === "dagre-wrapper") return true;
		return /^\s*flowchart/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./flowDiagram-I6XJVG4X-DQCCaizq.mjs");
		return {
			id: id3,
			diagram: diagram2
		};
	}, "loader")
};
var id4 = "er";
var erDetector_default = {
	id: id4,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*erDiagram/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./erDiagram-TEJ5UH35-DxYyzE_h.mjs");
		return {
			id: id4,
			diagram: diagram2
		};
	}, "loader")
};
var id5 = "gitGraph";
var gitGraphDetector_default = {
	id: id5,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*gitGraph/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./gitGraphDiagram-PVQCEYII-BIOfxtzh.mjs");
		return {
			id: id5,
			diagram: diagram2
		};
	}, "loader")
};
var id6 = "gantt";
var ganttDetector_default = {
	id: id6,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*gantt/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./ganttDiagram-6RSMTGT7-17zViiG-.mjs");
		return {
			id: id6,
			diagram: diagram2
		};
	}, "loader")
};
var id7 = "info";
var info = {
	id: id7,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*info/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./infoDiagram-5YYISTIA-DdkOX0Lc.mjs");
		return {
			id: id7,
			diagram: diagram2
		};
	}, "loader")
};
var id8 = "pie";
var pie = {
	id: id8,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*pie/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./pieDiagram-4H26LBE5-D3KRKb9c.mjs");
		return {
			id: id8,
			diagram: diagram2
		};
	}, "loader")
};
var id9 = "quadrantChart";
var quadrantDetector_default = {
	id: id9,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*quadrantChart/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./quadrantDiagram-W4KKPZXB-CNpYS-jU.mjs");
		return {
			id: id9,
			diagram: diagram2
		};
	}, "loader")
};
var id10 = "xychart";
var xychartDetector_default = {
	id: id10,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*xychart(-beta)?/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./xychartDiagram-2RQKCTM6-C1a5MdwX.mjs");
		return {
			id: id10,
			diagram: diagram2
		};
	}, "loader")
};
var id11 = "requirement";
var requirementDetector_default = {
	id: id11,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*requirement(Diagram)?/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./requirementDiagram-4Y6WPE33-N1OxYxot.mjs");
		return {
			id: id11,
			diagram: diagram2
		};
	}, "loader")
};
var id12 = "sequence";
var sequenceDetector_default = {
	id: id12,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*sequenceDiagram/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./sequenceDiagram-3UESZ5HK-8Mo16Mzv.mjs");
		return {
			id: id12,
			diagram: diagram2
		};
	}, "loader")
};
var id13 = "class";
var classDetector_default = {
	id: id13,
	detector: /* @__PURE__ */ __name((txt, config) => {
		if (config?.class?.defaultRenderer === "dagre-wrapper") return false;
		return /^\s*classDiagram/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./classDiagram-4FO5ZUOK-CnoUsFKP.mjs");
		return {
			id: id13,
			diagram: diagram2
		};
	}, "loader")
};
var id14 = "classDiagram";
var classDetector_V2_default = {
	id: id14,
	detector: /* @__PURE__ */ __name((txt, config) => {
		if (/^\s*classDiagram/.test(txt) && config?.class?.defaultRenderer === "dagre-wrapper") return true;
		return /^\s*classDiagram-v2/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./classDiagram-v2-Q7XG4LA2-zIt32VKe.mjs");
		return {
			id: id14,
			diagram: diagram2
		};
	}, "loader")
};
var id15 = "state";
var stateDetector_default = {
	id: id15,
	detector: /* @__PURE__ */ __name((txt, config) => {
		if (config?.state?.defaultRenderer === "dagre-wrapper") return false;
		return /^\s*stateDiagram/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./stateDiagram-AJRCARHV-CJZ1EKX4.mjs");
		return {
			id: id15,
			diagram: diagram2
		};
	}, "loader")
};
var id16 = "stateDiagram";
var stateDetector_V2_default = {
	id: id16,
	detector: /* @__PURE__ */ __name((txt, config) => {
		if (/^\s*stateDiagram-v2/.test(txt)) return true;
		if (/^\s*stateDiagram/.test(txt) && config?.state?.defaultRenderer === "dagre-wrapper") return true;
		return false;
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./stateDiagram-v2-BHNVJYJU-DwRCZ92D.mjs");
		return {
			id: id16,
			diagram: diagram2
		};
	}, "loader")
};
var id17 = "journey";
var journeyDetector_default = {
	id: id17,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*journey/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./journeyDiagram-JHISSGLW-BHq-DHOo.mjs");
		return {
			id: id17,
			diagram: diagram2
		};
	}, "loader")
};
var renderer = { draw: /* @__PURE__ */ __name((_text, id33, version) => {
	log.debug("rendering svg for syntax error\n");
	const svg = selectSvgElement(id33);
	const g = svg.append("g");
	svg.attr("viewBox", "0 0 2412 512");
	configureSvgSize(svg, 100, 512, true);
	g.append("path").attr("class", "error-icon").attr("d", "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z");
	g.append("path").attr("class", "error-icon").attr("d", "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z");
	g.append("path").attr("class", "error-icon").attr("d", "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z");
	g.append("path").attr("class", "error-icon").attr("d", "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z");
	g.append("path").attr("class", "error-icon").attr("d", "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z");
	g.append("path").attr("class", "error-icon").attr("d", "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z");
	g.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text");
	g.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text(`mermaid version ${version}`);
}, "draw") };
var errorRenderer_default = renderer;
var errorDiagram_default = {
	db: {},
	renderer,
	parser: { parse: /* @__PURE__ */ __name(() => {}, "parse") }
};
var id18 = "flowchart-elk";
var detector_default = {
	id: id18,
	detector: /* @__PURE__ */ __name((txt, config = {}) => {
		if (/^\s*flowchart-elk/.test(txt) || /^\s*(flowchart|graph)/.test(txt) && config?.flowchart?.defaultRenderer === "elk") {
			config.layout = "elk";
			return true;
		}
		return false;
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./flowDiagram-I6XJVG4X-DQCCaizq.mjs");
		return {
			id: id18,
			diagram: diagram2
		};
	}, "loader")
};
var id19 = "timeline";
var detector_default2 = {
	id: id19,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*timeline/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./timeline-definition-PNZ67QCA-CUQcjp6T.mjs");
		return {
			id: id19,
			diagram: diagram2
		};
	}, "loader")
};
var id20 = "mindmap";
var detector_default3 = {
	id: id20,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*mindmap/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./mindmap-definition-RKZ34NQL-BTyfTMLI.mjs");
		return {
			id: id20,
			diagram: diagram2
		};
	}, "loader")
};
var id21 = "kanban";
var detector_default4 = {
	id: id21,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*kanban/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./kanban-definition-UN3LZRKU-BaCVCBxw.mjs");
		return {
			id: id21,
			diagram: diagram2
		};
	}, "loader")
};
var id22 = "sankey";
var sankeyDetector_default = {
	id: id22,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*sankey(-beta)?/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./sankeyDiagram-5OEKKPKP--rko6LD4.mjs");
		return {
			id: id22,
			diagram: diagram2
		};
	}, "loader")
};
var id23 = "packet";
var packet = {
	id: id23,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*packet(-beta)?/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./diagram-LMA3HP47-8Mb2igZa.mjs");
		return {
			id: id23,
			diagram: diagram2
		};
	}, "loader")
};
var id24 = "radar";
var radar = {
	id: id24,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*radar-beta/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./diagram-2AECGRRQ-DGgL9HhI.mjs");
		return {
			id: id24,
			diagram: diagram2
		};
	}, "loader")
};
var id25 = "block";
var blockDetector_default = {
	id: id25,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*block(-beta)?/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./blockDiagram-GPEHLZMM-BlflwJ7t.mjs");
		return {
			id: id25,
			diagram: diagram2
		};
	}, "loader")
};
var id26 = "treeView";
var detector_default5 = {
	id: id26,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*treeView-beta/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./diagram-5GNKFQAL-6opOXcFl.mjs");
		return {
			id: id26,
			diagram: diagram2
		};
	}, "loader")
};
var id27 = "architecture";
var architectureDetector_default = {
	id: id27,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*architecture/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./architectureDiagram-3BPJPVTR-rD7vczzk.mjs");
		return {
			id: id27,
			diagram: diagram2
		};
	}, "loader")
};
var id28 = "eventmodeling";
var detector_default6 = {
	id: id28,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*eventmodeling/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./diagram-KO2AKTUF-MQhklO30.mjs");
		return {
			id: id28,
			diagram: diagram2
		};
	}, "loader")
};
var id29 = "ishikawa";
var ishikawa = {
	id: id29,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*ishikawa(-beta)?\b/i.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./ishikawaDiagram-YF4QCWOH-EF29SXGj.mjs");
		return {
			id: id29,
			diagram: diagram2
		};
	}, "loader")
};
var id30 = "venn";
var vennDetector_default = {
	id: id30,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*venn-beta/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./vennDiagram-CIIHVFJN-V5cUw9zA.mjs");
		return {
			id: id30,
			diagram: diagram2
		};
	}, "loader")
};
var id31 = "treemap";
var treemap = {
	id: id31,
	detector: /* @__PURE__ */ __name((txt) => {
		return /^\s*treemap/.test(txt);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./diagram-OG6HWLK6-BeLkIQfo.mjs");
		return {
			id: id31,
			diagram: diagram2
		};
	}, "loader")
};
var id32 = "wardley-beta";
var wardleyDetector_default = {
	id: id32,
	detector: /* @__PURE__ */ __name((text) => {
		return /^\s*wardley-beta/i.test(text);
	}, "detector"),
	loader: /* @__PURE__ */ __name(async () => {
		const { diagram: diagram2 } = await import("./wardleyDiagram-YWT4CUSO-DbNgkBjC.mjs");
		return {
			id: id32,
			diagram: diagram2
		};
	}, "loader")
};
var hasLoadedDiagrams = false;
var addDiagrams = /* @__PURE__ */ __name(() => {
	if (hasLoadedDiagrams) return;
	hasLoadedDiagrams = true;
	registerDiagram("error", errorDiagram_default, (text) => {
		return text.toLowerCase().trim() === "error";
	});
	registerDiagram("---", {
		db: { clear: /* @__PURE__ */ __name(() => {}, "clear") },
		styles: {},
		renderer: { draw: /* @__PURE__ */ __name(() => {}, "draw") },
		parser: { parse: /* @__PURE__ */ __name(() => {
			throw new Error("Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks");
		}, "parse") },
		init: /* @__PURE__ */ __name(() => null, "init")
	}, (text) => {
		return text.toLowerCase().trimStart().startsWith("---");
	});
	registerLazyLoadedDiagrams(detector_default, detector_default3, architectureDetector_default);
	registerLazyLoadedDiagrams(c4Detector_default, detector_default4, classDetector_V2_default, classDetector_default, erDetector_default, ganttDetector_default, info, pie, requirementDetector_default, sequenceDetector_default, flowDetector_v2_default, flowDetector_default, detector_default2, gitGraphDetector_default, stateDetector_V2_default, stateDetector_default, journeyDetector_default, quadrantDetector_default, sankeyDetector_default, packet, xychartDetector_default, blockDetector_default, detector_default6, detector_default5, radar, ishikawa, treemap, vennDetector_default, wardleyDetector_default);
}, "addDiagrams");
var loadRegisteredDiagrams = /* @__PURE__ */ __name(async () => {
	log.debug(`Loading registered diagrams`);
	const failed = (await Promise.allSettled(Object.entries(detectors).map(async ([key, { detector: detector33, loader: loader33 }]) => {
		if (!loader33) return;
		try {
			getDiagram(key);
		} catch {
			try {
				const { diagram: diagram2, id: id33 } = await loader33();
				registerDiagram(id33, diagram2, detector33);
			} catch (err) {
				log.error(`Failed to load external diagram with key ${key}. Removing from detectors.`);
				delete detectors[key];
				throw err;
			}
		}
	}))).filter((result) => result.status === "rejected");
	if (failed.length > 0) {
		log.error(`Failed to load ${failed.length} external diagrams`);
		for (const res of failed) log.error(res);
		throw new Error(`Failed to load ${failed.length} external diagrams`);
	}
}, "loadRegisteredDiagrams");
var SVG_ROLE = "graphics-document document";
function setA11yDiagramInfo(svg, diagramType) {
	svg.attr("role", SVG_ROLE);
	if (diagramType !== "") svg.attr("aria-roledescription", diagramType);
}
__name(setA11yDiagramInfo, "setA11yDiagramInfo");
function addSVGa11yTitleDescription(svg, a11yTitle, a11yDesc, baseId) {
	if (svg.insert === void 0) return;
	if (a11yDesc) {
		const descId = `chart-desc-${baseId}`;
		svg.attr("aria-describedby", descId);
		svg.insert("desc", ":first-child").attr("id", descId).text(a11yDesc);
	}
	if (a11yTitle) {
		const titleId = `chart-title-${baseId}`;
		svg.attr("aria-labelledby", titleId);
		svg.insert("title", ":first-child").attr("id", titleId).text(a11yTitle);
	}
}
__name(addSVGa11yTitleDescription, "addSVGa11yTitleDescription");
var Diagram = class _Diagram {
	constructor(type, text, db, parser, renderer2) {
		this.type = type;
		this.text = text;
		this.db = db;
		this.parser = parser;
		this.renderer = renderer2;
	}
	static {
		__name(this, "Diagram");
	}
	static async fromText(text, metadata = {}) {
		const config = getConfig();
		const type = detectType(text, config);
		text = encodeEntities(text) + "\n";
		try {
			getDiagram(type);
		} catch {
			const loader33 = getDiagramLoader(type);
			if (!loader33) throw new UnknownDiagramError(`Diagram ${type} not found.`);
			const { id: id33, diagram: diagram2 } = await loader33();
			registerDiagram(id33, diagram2);
		}
		const { db, parser, renderer: renderer2, init: init2 } = getDiagram(type);
		if (parser.parser) parser.parser.yy = db;
		db.clear?.();
		init2?.(config);
		if (metadata.title) db.setDiagramTitle?.(metadata.title);
		await parser.parse(text);
		return new _Diagram(type, text, db, parser, renderer2);
	}
	async render(id33, version) {
		await this.renderer.draw(this.text, id33, version, this);
	}
	getParser() {
		return this.parser;
	}
	getType() {
		return this.type;
	}
};
var interactionFunctions = [];
var attachFunctions = /* @__PURE__ */ __name(() => {
	interactionFunctions.forEach((f) => {
		f();
	});
	interactionFunctions = [];
}, "attachFunctions");
var cleanupComments = /* @__PURE__ */ __name((text) => {
	return text.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart();
}, "cleanupComments");
function extractFrontMatter(text) {
	const matches = text.match(frontMatterRegex);
	if (!matches) return {
		text,
		metadata: {}
	};
	let parsed = load(matches[1], { schema: JSON_SCHEMA }) ?? {};
	parsed = typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
	const metadata = {};
	if (parsed.displayMode) metadata.displayMode = parsed.displayMode.toString();
	if (parsed.title) metadata.title = parsed.title.toString();
	if (parsed.config) metadata.config = parsed.config;
	return {
		text: text.slice(matches[0].length),
		metadata
	};
}
__name(extractFrontMatter, "extractFrontMatter");
var cleanupText = /* @__PURE__ */ __name((code) => {
	return code.replace(/\r\n?/g, "\n").replace(/<(\w+)([^>]*)>/g, (match, tag, attributes) => "<" + tag + attributes.replace(/="([^"]*)"/g, "='$1'") + ">");
}, "cleanupText");
var processFrontmatter = /* @__PURE__ */ __name((code) => {
	const { text, metadata } = extractFrontMatter(code);
	const { displayMode, title, config = {} } = metadata;
	if (displayMode) {
		if (!config.gantt) config.gantt = {};
		config.gantt.displayMode = displayMode;
	}
	return {
		title,
		config,
		text
	};
}, "processFrontmatter");
var processDirectives = /* @__PURE__ */ __name((code) => {
	const initDirective = utils_default.detectInit(code) ?? {};
	const wrapDirectives = utils_default.detectDirective(code, "wrap");
	if (Array.isArray(wrapDirectives)) initDirective.wrap = wrapDirectives.some(({ type }) => type === "wrap");
	else if (wrapDirectives?.type === "wrap") initDirective.wrap = true;
	return {
		text: removeDirectives(code),
		directive: initDirective
	};
}, "processDirectives");
function preprocessDiagram(code) {
	const frontMatterResult = processFrontmatter(cleanupText(code));
	const directiveResult = processDirectives(frontMatterResult.text);
	const config = cleanAndMerge(frontMatterResult.config, directiveResult.directive);
	code = cleanupComments(directiveResult.text);
	return {
		code,
		title: frontMatterResult.title,
		config
	};
}
__name(preprocessDiagram, "preprocessDiagram");
function toBase64(str) {
	const utf8Bytes = new TextEncoder().encode(str);
	const utf8Str = Array.from(utf8Bytes, (byte) => String.fromCodePoint(byte)).join("");
	return btoa(utf8Str);
}
__name(toBase64, "toBase64");
var MAX_TEXTLENGTH = 5e4;
var MAX_TEXTLENGTH_EXCEEDED_MSG = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa";
var SECURITY_LVL_SANDBOX = "sandbox";
var SECURITY_LVL_LOOSE = "loose";
var XMLNS_SVG_STD = "http://www.w3.org/2000/svg";
var XMLNS_XLINK_STD = "http://www.w3.org/1999/xlink";
var XMLNS_XHTML_STD = "http://www.w3.org/1999/xhtml";
var IFRAME_WIDTH = "100%";
var IFRAME_HEIGHT = "100%";
var IFRAME_STYLES = "border:0;margin:0;";
var IFRAME_BODY_STYLE = "margin:0";
var IFRAME_SANDBOX_OPTS = "allow-top-navigation-by-user-activation allow-popups";
var IFRAME_NOT_SUPPORTED_MSG = "The \"iframe\" tag is not supported by your browser.";
var DOMPURIFY_TAGS = ["foreignobject"];
var DOMPURIFY_ATTR = ["dominant-baseline"];
function processAndSetConfigs(text) {
	const processed = preprocessDiagram(text);
	reset();
	addDirective(processed.config ?? {});
	return processed;
}
__name(processAndSetConfigs, "processAndSetConfigs");
async function parse(text, parseOptions) {
	addDiagrams();
	try {
		const { code, config } = processAndSetConfigs(text);
		return {
			diagramType: (await getDiagramFromText(code)).type,
			config
		};
	} catch (error) {
		if (parseOptions?.suppressErrors) return false;
		throw error;
	}
}
__name(parse, "parse");
var cssImportantStyles = /* @__PURE__ */ __name((cssClass, element, cssClasses = []) => {
	return `.${cssClass} ${element} ${sanitizeCss(`{ ${cssClasses.join(" !important; ")} !important; }`)}`;
}, "cssImportantStyles");
var createCssStyles = /* @__PURE__ */ __name((config, classDefs = /* @__PURE__ */ new Map()) => {
	const cssStyles = new CSSStyleSheet();
	if (config.fontFamily !== void 0) cssStyles.insertRule(`:root { --mermaid-font-family: ${config.fontFamily}}`, cssStyles.cssRules.length);
	if (config.altFontFamily !== void 0) cssStyles.insertRule(`:root { --mermaid-alt-font-family: ${config.altFontFamily}}`, cssStyles.cssRules.length);
	if (classDefs instanceof Map) {
		const cssElements = getEffectiveHtmlLabels(config) ? ["> *", "span"] : [
			"rect",
			"polygon",
			"ellipse",
			"circle",
			"path"
		];
		classDefs.forEach((styleClassDef) => {
			if (!isEmpty(styleClassDef.styles)) cssElements.forEach((cssElement) => {
				cssStyles.insertRule(cssImportantStyles(styleClassDef.id, cssElement, styleClassDef.styles), cssStyles.cssRules.length);
			});
			if (!isEmpty(styleClassDef.textStyles)) cssStyles.insertRule(cssImportantStyles(styleClassDef.id, "tspan", (styleClassDef?.textStyles || []).map((s) => s.replace("color", "fill"))), cssStyles.cssRules.length);
		});
	}
	let cssString = "";
	if (config.themeCSS !== void 0) if (typeof cssStyles.replaceSync === "function") {
		const themeCssStyleSheet = new CSSStyleSheet();
		themeCssStyleSheet.replaceSync(config.themeCSS);
		cssString = cssStyleSheetToString(themeCssStyleSheet) + "\n";
	} else cssString += `${config.themeCSS}
`;
	return cssString + cssStyleSheetToString(cssStyles);
}, "createCssStyles");
var compileCSS = /* @__PURE__ */ __name((namespace, css) => {
	return serialize(compile(`${namespace}{${css}}`), middleware([/* @__PURE__ */ __name(function addNamespace(element, _index, _children, _callback) {
		if (element.type === "rule" && Array.isArray(element.props)) {
			if (element.parent && element.parent.type === "@keyframes") return;
			element.props = element.props.map((prop) => {
				if (!prop.startsWith(namespace)) return `${namespace} ${prop}`;
				return prop;
			});
		} else if (element.type.startsWith("@")) {
			if (![...[
				"@media",
				"@supports",
				"@layer",
				"@scope",
				"@container",
				"@starting-style"
			], "@keyframes"].includes(element.type)) {
				log.warn(`Removing unsupported at-rule ${element.type} from CSS`);
				element.type = COMMENT;
			}
		}
	}, "addNamespace"), stringify]));
}, "compileCSS");
var createUserStyles = /* @__PURE__ */ __name((config, graphType, classDefs, svgId) => {
	return compileCSS(svgId, styles_default(graphType, createCssStyles(config, classDefs), {
		...config.themeVariables,
		theme: config.theme,
		look: config.look
	}, svgId));
}, "createUserStyles");
var cleanUpSvgCode = /* @__PURE__ */ __name((svgCode = "", inSandboxMode, useArrowMarkerUrls) => {
	let cleanedUpSvg = svgCode;
	if (!useArrowMarkerUrls && !inSandboxMode) cleanedUpSvg = cleanedUpSvg.replace(/marker-end="url\([\d+./:=?A-Za-z-]*?#/g, "marker-end=\"url(#");
	cleanedUpSvg = decodeEntities(cleanedUpSvg);
	cleanedUpSvg = cleanedUpSvg.replace(/<br>/g, "<br/>");
	return cleanedUpSvg;
}, "cleanUpSvgCode");
var putIntoIFrame = /* @__PURE__ */ __name((svgCode = "", svgElement) => {
	return `<iframe style="width:${IFRAME_WIDTH};height:${svgElement?.viewBox?.baseVal?.height ? svgElement.viewBox.baseVal.height + "px" : IFRAME_HEIGHT};${IFRAME_STYLES}" src="data:text/html;charset=UTF-8;base64,${toBase64(`<body style="${IFRAME_BODY_STYLE}">${svgCode}</body>`)}" sandbox="${IFRAME_SANDBOX_OPTS}">
  ${IFRAME_NOT_SUPPORTED_MSG}
</iframe>`;
}, "putIntoIFrame");
var appendDivSvgG = /* @__PURE__ */ __name((parentRoot, id33, enclosingDivId, divStyle, svgXlink) => {
	const enclosingDiv = parentRoot.append("div");
	enclosingDiv.attr("id", enclosingDivId);
	if (divStyle) enclosingDiv.attr("style", divStyle);
	const svgNode = enclosingDiv.append("svg").attr("id", id33).attr("width", "100%").attr("xmlns", XMLNS_SVG_STD);
	if (svgXlink) svgNode.attr("xmlns:xlink", svgXlink);
	svgNode.append("g");
	return parentRoot;
}, "appendDivSvgG");
function sandboxedIframe(parentNode, iFrameId) {
	return parentNode.append("iframe").attr("id", iFrameId).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
__name(sandboxedIframe, "sandboxedIframe");
var removeExistingElements = /* @__PURE__ */ __name((doc, id33, divId, iFrameId) => {
	doc.getElementById(id33)?.remove();
	doc.getElementById(divId)?.remove();
	doc.getElementById(iFrameId)?.remove();
}, "removeExistingElements");
var render = /* @__PURE__ */ __name(async function(id33, text, svgContainingElement) {
	addDiagrams();
	const processed = processAndSetConfigs(text);
	text = processed.code;
	const config = getConfig();
	log.debug(config);
	if (text.length > (config?.maxTextSize ?? MAX_TEXTLENGTH)) text = MAX_TEXTLENGTH_EXCEEDED_MSG;
	const idSelector = `#${id33}`;
	const iFrameID = "i" + id33;
	const iFrameID_selector = "#" + iFrameID;
	const enclosingDivID = "d" + id33;
	const enclosingDivID_selector = "#" + enclosingDivID;
	const removeTempElements = /* @__PURE__ */ __name(() => {
		const node = select_default(isSandboxed ? iFrameID_selector : enclosingDivID_selector).node();
		if (node && "remove" in node) node.remove();
	}, "removeTempElements");
	let root = select_default(document.body);
	const isSandboxed = config.securityLevel === SECURITY_LVL_SANDBOX;
	const isLooseSecurityLevel = config.securityLevel === SECURITY_LVL_LOOSE;
	const fontFamily = config.fontFamily;
	if (svgContainingElement !== void 0) {
		if (svgContainingElement) svgContainingElement.innerHTML = "";
		if (isSandboxed) {
			root = select_default(sandboxedIframe(select_default(svgContainingElement), iFrameID).nodes()[0].contentDocument.body);
			root.node().style.margin = "0";
		} else root = select_default(svgContainingElement);
		appendDivSvgG(root, id33, enclosingDivID, `font-family: ${fontFamily}`, XMLNS_XLINK_STD);
	} else {
		removeExistingElements(document, id33, enclosingDivID, iFrameID);
		if (isSandboxed) {
			root = select_default(sandboxedIframe(select_default(document.body), iFrameID).nodes()[0].contentDocument.body);
			root.node().style.margin = "0";
		} else root = select_default("body");
		appendDivSvgG(root, id33, enclosingDivID);
	}
	let diag;
	let parseEncounteredException;
	try {
		diag = await Diagram.fromText(text, { title: processed.title });
	} catch (error) {
		if (config.suppressErrorRendering) {
			removeTempElements();
			throw error;
		}
		diag = await Diagram.fromText("error");
		parseEncounteredException = error;
	}
	const element = root.select(enclosingDivID_selector).node();
	const diagramType = diag.type;
	const svg = element.firstChild;
	const firstChild = svg.firstChild;
	const diagramClassDefs = diag.renderer.getClasses?.(text, diag);
	const rules = createUserStyles(config, diagramType, diagramClassDefs, idSelector);
	const style1 = document.createElement("style");
	style1.innerHTML = rules;
	svg.insertBefore(style1, firstChild);
	try {
		await diag.renderer.draw(text, id33, "11.15.0", diag);
	} catch (e) {
		if (config.suppressErrorRendering) removeTempElements();
		else errorRenderer_default.draw(text, id33, "11.15.0");
		throw e;
	}
	const svgNode = root.select(`${enclosingDivID_selector} svg`);
	const a11yTitle = diag.db.getAccTitle?.();
	const a11yDescr = diag.db.getAccDescription?.();
	addA11yInfo(diagramType, svgNode, a11yTitle, a11yDescr);
	root.select(`[id="${id33}"]`).selectAll("foreignobject > *").attr("xmlns", XMLNS_XHTML_STD);
	let svgCode = root.select(enclosingDivID_selector).node().innerHTML;
	log.debug("config.arrowMarkerAbsolute", config.arrowMarkerAbsolute);
	svgCode = cleanUpSvgCode(svgCode, isSandboxed, evaluate(config.arrowMarkerAbsolute));
	if (isSandboxed) {
		const svgEl = root.select(enclosingDivID_selector + " svg").node();
		svgCode = putIntoIFrame(svgCode, svgEl);
	} else if (!isLooseSecurityLevel) svgCode = purify.sanitize(svgCode, {
		ADD_TAGS: DOMPURIFY_TAGS,
		ADD_ATTR: DOMPURIFY_ATTR,
		HTML_INTEGRATION_POINTS: { foreignobject: true }
	});
	attachFunctions();
	if (parseEncounteredException) throw parseEncounteredException;
	removeTempElements();
	return {
		diagramType,
		svg: svgCode,
		bindFunctions: diag.db.bindFunctions
	};
}, "render");
function initialize(userOptions = {}) {
	const options = assignWithDepth_default({}, userOptions);
	if (options?.fontFamily && !options.themeVariables?.fontFamily) {
		if (!options.themeVariables) options.themeVariables = {};
		options.themeVariables.fontFamily = options.fontFamily;
	}
	saveConfigFromInitialize(options);
	if (options?.theme && options.theme in themes_default) options.themeVariables = themes_default[options.theme].getThemeVariables(options.themeVariables);
	else if (options) options.themeVariables = themes_default.default.getThemeVariables(options.themeVariables);
	setLogLevel((typeof options === "object" ? setSiteConfig(options) : getSiteConfig()).logLevel);
	addDiagrams();
}
__name(initialize, "initialize");
var getDiagramFromText = /* @__PURE__ */ __name((text, metadata = {}) => {
	const { code } = preprocessDiagram(text);
	return Diagram.fromText(code, metadata);
}, "getDiagramFromText");
function addA11yInfo(diagramType, svgNode, a11yTitle, a11yDescr) {
	setA11yDiagramInfo(svgNode, diagramType);
	addSVGa11yTitleDescription(svgNode, a11yTitle, a11yDescr, svgNode.attr("id"));
}
__name(addA11yInfo, "addA11yInfo");
var mermaidAPI = Object.freeze({
	render,
	parse,
	getDiagramFromText,
	initialize,
	getConfig,
	setConfig,
	getSiteConfig,
	updateSiteConfig,
	reset: /* @__PURE__ */ __name(() => {
		reset();
	}, "reset"),
	globalReset: /* @__PURE__ */ __name(() => {
		reset(defaultConfig);
	}, "globalReset"),
	defaultConfig
});
setLogLevel(getConfig().logLevel);
reset(getConfig());
var handleError = /* @__PURE__ */ __name((error, errors, parseError) => {
	log.warn(error);
	if (isDetailedError(error)) {
		if (parseError) parseError(error.str, error.hash);
		errors.push({
			...error,
			message: error.str,
			error
		});
	} else {
		if (parseError) parseError(error);
		if (error instanceof Error) errors.push({
			str: error.message,
			message: error.message,
			hash: error.name,
			error
		});
	}
}, "handleError");
var run = /* @__PURE__ */ __name(async function(options = { querySelector: ".mermaid" }) {
	try {
		await runThrowsErrors(options);
	} catch (e) {
		if (isDetailedError(e)) log.error(e.str);
		if (mermaid.parseError) mermaid.parseError(e);
		if (!options.suppressErrors) {
			log.error("Use the suppressErrors option to suppress these errors");
			throw e;
		}
	}
}, "run");
var runThrowsErrors = /* @__PURE__ */ __name(async function({ postRenderCallback, querySelector, nodes } = { querySelector: ".mermaid" }) {
	const conf = mermaidAPI.getConfig();
	log.debug(`${!postRenderCallback ? "No " : ""}Callback function found`);
	let nodesToProcess;
	if (nodes) nodesToProcess = nodes;
	else if (querySelector) nodesToProcess = document.querySelectorAll(querySelector);
	else throw new Error("Nodes and querySelector are both undefined");
	log.debug(`Found ${nodesToProcess.length} diagrams`);
	if (conf?.startOnLoad !== void 0) {
		log.debug("Start On Load: " + conf?.startOnLoad);
		mermaidAPI.updateSiteConfig({ startOnLoad: conf?.startOnLoad });
	}
	const idGenerator = new utils_default.InitIDGenerator(conf.deterministicIds, conf.deterministicIDSeed);
	let txt;
	const errors = [];
	for (const element of Array.from(nodesToProcess)) {
		log.info("Rendering diagram: " + element.id);
		if (element.getAttribute("data-processed")) continue;
		element.setAttribute("data-processed", "true");
		const id33 = `mermaid-${idGenerator.next()}`;
		txt = element.innerHTML;
		txt = dedent(utils_default.entityDecode(txt)).trim().replace(/<br\s*\/?>/gi, "<br/>");
		const init2 = utils_default.detectInit(txt);
		if (init2) log.debug("Detected early reinit: ", init2);
		try {
			const { svg, bindFunctions } = await render2(id33, txt, element);
			element.innerHTML = svg;
			if (postRenderCallback) await postRenderCallback(id33);
			if (bindFunctions) bindFunctions(element);
		} catch (error) {
			handleError(error, errors, mermaid.parseError);
		}
	}
	if (errors.length > 0) throw errors[0];
}, "runThrowsErrors");
var initialize2 = /* @__PURE__ */ __name(function(config) {
	mermaidAPI.initialize(config);
}, "initialize");
var init = /* @__PURE__ */ __name(async function(config, nodes, callback) {
	log.warn("mermaid.init is deprecated. Please use run instead.");
	if (config) initialize2(config);
	const runOptions = {
		postRenderCallback: callback,
		querySelector: ".mermaid"
	};
	if (typeof nodes === "string") runOptions.querySelector = nodes;
	else if (nodes) if (nodes instanceof HTMLElement) runOptions.nodes = [nodes];
	else runOptions.nodes = nodes;
	await run(runOptions);
}, "init");
var registerExternalDiagrams = /* @__PURE__ */ __name(async (diagrams, { lazyLoad = true } = {}) => {
	addDiagrams();
	registerLazyLoadedDiagrams(...diagrams);
	if (lazyLoad === false) await loadRegisteredDiagrams();
}, "registerExternalDiagrams");
var contentLoaded = /* @__PURE__ */ __name(function() {
	if (mermaid.startOnLoad) {
		const { startOnLoad } = mermaidAPI.getConfig();
		if (startOnLoad) mermaid.run().catch((err) => log.error("Mermaid failed to initialize", err));
	}
}, "contentLoaded");
if (typeof document !== "undefined") window.addEventListener("load", contentLoaded, false);
var setParseErrorHandler = /* @__PURE__ */ __name(function(parseErrorHandler) {
	mermaid.parseError = parseErrorHandler;
}, "setParseErrorHandler");
var executionQueue = [];
var executionQueueRunning = false;
var executeQueue = /* @__PURE__ */ __name(async () => {
	if (executionQueueRunning) return;
	executionQueueRunning = true;
	while (executionQueue.length > 0) {
		const f = executionQueue.shift();
		if (f) try {
			await f();
		} catch (e) {
			log.error("Error executing queue", e);
		}
	}
	executionQueueRunning = false;
}, "executeQueue");
var parse2 = /* @__PURE__ */ __name(async (text, parseOptions) => {
	return new Promise((resolve, reject) => {
		const performCall = /* @__PURE__ */ __name(() => new Promise((res, rej) => {
			mermaidAPI.parse(text, parseOptions).then((r) => {
				res(r);
				resolve(r);
			}, (e) => {
				log.error("Error parsing", e);
				mermaid.parseError?.(e);
				rej(e);
				reject(e);
			});
		}), "performCall");
		executionQueue.push(performCall);
		executeQueue().catch(reject);
	});
}, "parse");
var render2 = /* @__PURE__ */ __name((id33, text, container) => {
	return new Promise((resolve, reject) => {
		const performCall = /* @__PURE__ */ __name(() => new Promise((res, rej) => {
			mermaidAPI.render(id33, text, container).then((r) => {
				res(r);
				resolve(r);
			}, (e) => {
				log.error("Error parsing", e);
				mermaid.parseError?.(e);
				rej(e);
				reject(e);
			});
		}), "performCall");
		executionQueue.push(performCall);
		executeQueue().catch(reject);
	});
}, "render");
var mermaid = {
	startOnLoad: true,
	mermaidAPI,
	parse: parse2,
	render: render2,
	init,
	run,
	registerExternalDiagrams,
	registerLayoutLoaders,
	initialize: initialize2,
	parseError: void 0,
	contentLoaded,
	setParseErrorHandler,
	detectType,
	registerIconPacks,
	getRegisteredDiagramsMetadata: /* @__PURE__ */ __name(() => {
		return Object.keys(detectors).map((id33) => ({ id: id33 }));
	}, "getRegisteredDiagramsMetadata")
};
var mermaid_default = mermaid;
/*! Check if previously processed */
/*!
* Wait for document loaded before starting the execution
*/
//#endregion
//#region resources/js/Pages/ArticleShow.jsx
var RagCopilot = import_react.lazy(() => import("./RagCopilot-CHzbDJvc.mjs"));
function ArticleShow({ article, relatedArticles, auth }) {
	const { __ } = useLanguage();
	const [scrollProgress, setScrollProgress] = (0, import_react.useState)(0);
	const [likes, setLikes] = (0, import_react.useState)(article.likes_count || 0);
	const [isLiking, setIsLiking] = (0, import_react.useState)(false);
	const isAuthorized = !!auth?.user;
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const handleMouseMove = (e) => {
		mouseX.set(e.clientX);
		mouseY.set(e.clientY);
	};
	(0, import_react.useEffect)(() => {
		const handleScroll = () => {
			const totalScroll = document.documentElement.scrollTop;
			const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			setScrollProgress((windowHeight === 0 ? 0 : totalScroll / windowHeight) * 100);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const handleLike = async () => {
		if (isLiking) return;
		setIsLiking(true);
		try {
			setLikes((await axios.post(`/api/articles/${article.id}/like`)).data.likes_count);
			toast.success(__("Thanks for the applause!"));
		} catch {
			toast.error(__("Failed to register like."));
		} finally {
			setIsLiking(false);
		}
	};
	const handleShare = (platform) => {
		const url = window.location.href;
		const text = `${__("Read this incredible piece")}: ${article.title}`;
		if (platform === "twitter") window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
		else if (platform === "linkedin") window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
		else {
			navigator.clipboard.writeText(url);
			toast.success(__("Link copied to clipboard!"));
		}
	};
	/**
	* Recursively decode JSON-encoded strings and unescape slashes.
	*/
	const sanitizeContent = (raw) => {
		if (!raw) return "";
		let content = String(raw);
		if (content.trim().startsWith("\"") || content.trim().startsWith("{") || content.trim().startsWith("[")) try {
			let temp = content.trim();
			if (temp.startsWith("\"") && temp.endsWith("\"")) temp = temp.substring(1, temp.length - 1);
			const parsed = JSON.parse(content);
			if (typeof parsed === "string") return sanitizeContent(parsed);
			if (parsed && typeof parsed === "object" && parsed.type === "doc") return null;
			if (typeof parsed === "string") content = parsed;
		} catch {}
		content = content.replace(/\\\\\//g, "/").replace(/\\/g, "");
		if (content.startsWith("\"") && content.endsWith("\"")) content = content.substring(1, content.length - 1);
		content = content.replace(/\\n/g, "").replace(/\\r/g, "");
		return content;
	};
	const finalCoverImage = getFinalImage(article);
	const cleanHtml = typeof article.content === "string" ? sanitizeContent(article.content) : null;
	const parsedContent = typeof article.content === "string" && !cleanHtml ? (() => {
		try {
			return JSON.parse(article.content);
		} catch {
			return {
				type: "doc",
				content: []
			};
		}
	})() : article.content || {
		type: "doc",
		content: []
	};
	const contentString = typeof article.content === "string" ? article.content : JSON.stringify(article.content);
	const estimatedReadTime = article.reading_time_minutes || Math.max(1, Math.ceil(contentString.split(" ").length / 200));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		onMouseMove: handleMouseMove,
		className: "min-h-screen bg-[#f8f6f6] dark:bg-[#02040a] text-black dark:text-white font-sans selection:bg-primary/30 relative overflow-hidden transition-colors duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed top-0 left-0 w-full h-[3px] z-[100] bg-black/5 dark:bg-white/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "h-full bg-gradient-to-r from-primary via-purple-500 to-primary",
					style: {
						width: `${scrollProgress}%`,
						boxShadow: scrollProgress > 0 ? "0 0 10px rgba(43,124,238,0.5)" : "none"
					},
					transition: {
						type: "spring",
						stiffness: 100,
						damping: 30
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${article.title} | TechyNews` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					name: "description",
					content: article.meta_description || article.ai_summary || `${__("Read")} ${article.title} ${__("on Techy News")}.`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
					rel: "canonical",
					href: `https://techynews.lat/article/${article.slug}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					property: "og:title",
					content: article.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					property: "og:type",
					content: "article"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					property: "og:image",
					content: finalCoverImage
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					property: "og:url",
					content: `https://techynews.lat/article/${article.slug}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					property: "og:description",
					content: article.ai_summary || article.meta_description || ""
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					property: "og:site_name",
					content: "TechyNews"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					name: "twitter:card",
					content: "summary_large_image"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					name: "twitter:title",
					content: article.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					name: "twitter:description",
					content: article.ai_summary || article.meta_description || ""
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					name: "twitter:image",
					content: finalCoverImage
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
					name: "twitter:site",
					content: "@TechyNewsLat"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
					type: "application/ld+json",
					dangerouslySetInnerHTML: { __html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "NewsArticle",
						"headline": article.title,
						"image": [finalCoverImage],
						"datePublished": article.created_at,
						"dateModified": article.updated_at || article.created_at,
						"author": [{
							"@type": "Organization",
							"name": "TechyNews",
							"url": "https://techynews.lat"
						}],
						"publisher": {
							"@type": "Organization",
							"name": "TechyNews",
							"logo": {
								"@type": "ImageObject",
								"url": "https://techynews.lat/img/logo_wbc.webp"
							}
						},
						"description": article.ai_summary || article.meta_description || "",
						"mainEntityOfPage": {
							"@type": "WebPage",
							"@id": `https://techynews.lat/article/${article.slug}`
						}
					}) }
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-purple-600 z-[100] transition-all duration-150 ease-out",
				style: { width: `${scrollProgress}%` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "max-w-4xl mx-auto px-6 py-20 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
						initial: {
							opacity: 0,
							y: 30
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
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "mb-16",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-8",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-4 h-4" }),
											" ",
											__("Synthesized Discovery")
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "w-full aspect-[21/9] md:aspect-[2.5/1] rounded-3xl overflow-hidden mb-12 shadow-2xl relative group bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 z-10 transition-colors duration-500 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: finalCoverImage,
											alt: article.title,
											fetchpriority: "high",
											loading: "eager",
											className: "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-8 leading-[1.1] text-gray-900 dark:text-white transition-colors",
										children: article.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-4 md:gap-6 text-xs font-black uppercase tracking-widest text-gray-600 dark:text-gray-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: (0, import_dayjs_min.default)(article.updated_at).format("MMMM D, YYYY") }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hidden md:inline-block w-1 h-1 bg-gray-300 dark:bg-gray-800 rounded-full" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												estimatedReadTime,
												" ",
												__("min read")
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hidden md:inline-block w-1 h-1 bg-gray-300 dark:bg-gray-800 rounded-full" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary/70 uppercase",
												children: __("Intelligent Draft")
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-12 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-[60] flex md:flex-col items-center gap-6 bg-white/90 dark:bg-white/[0.05] backdrop-blur-2xl border border-black/5 dark:border-white/10 py-3 px-6 md:py-8 md:px-4 rounded-full shadow-2xl transition-all duration-300",
								children: [
									isAuthorized && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
										href: "/dashboard",
										className: "p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all",
										title: __("Edit Article"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "w-5 h-5",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 012.828 0L21 8.586a2 2 0 010 2.828l-10.586 10.586a2 2 0 01-0.707.293l-3.992.399 0.399-3.992a2 2 0 010.293-0.707L17.586 3.414z"
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[1px] h-6 md:w-6 md:h-[1px] bg-black/5 dark:bg-white/10" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleLike,
										className: "group flex flex-col items-center gap-1 transition-transform active:scale-95",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `w-6 h-6 transition-colors ${likes > 0 ? "fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "text-gray-500 group-hover:text-black dark:group-hover:text-white"}` }), likes > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-black text-gray-500 dark:text-gray-400",
											children: likes
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[1px] h-6 md:w-6 md:h-[1px] bg-black/5 dark:bg-white/10" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleShare("twitter"),
										className: "text-gray-500 hover:text-primary transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Twitter, { className: "w-5 h-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleShare("linkedin"),
										className: "text-gray-500 hover:text-primary transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "w-5 h-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleShare("copy"),
										className: "text-gray-500 hover:text-black dark:hover:text-white transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { className: "w-5 h-5" })
									})
								]
							}),
							article.ai_summary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-16 p-10 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] relative overflow-hidden group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-primary font-black text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2 relative z-10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "w-4 h-4",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2.5,
												d: "M13 10V3L4 14h7v7l9-11h-7z"
											})
										}), __("Executive Summary")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xl text-gray-700 dark:text-gray-300 font-light leading-relaxed relative z-10 italic",
										children: [
											"\"",
											article.ai_summary,
											"\""
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "prose dark:prose-invert prose-primary max-w-none prose-lg prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-black dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:font-light prose-p:leading-relaxed prose-strong:text-black dark:prose-strong:text-white prose-a:text-primary hover:prose-a:text-black dark:hover:prose-a:text-white prose-code:text-emerald-600 dark:prose-code:text-emerald-400 prose-pre:bg-gray-100 dark:prose-pre:bg-white/[0.03] prose-pre:border prose-pre:border-black/10 dark:prose-pre:border-white/10 prose-pre:rounded-2xl transition-colors",
								children: cleanHtml ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: cleanHtml } }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TipTapRenderer, { content: parsedContent })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-16 p-8 bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-3xl flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-20 h-20 shrink-0 rounded-full bg-gradient-to-br from-primary to-purple-600 p-[2px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/img/carlos-silveira-avatar.jpg",
								alt: "Carlos Silveira",
								className: "w-full h-full rounded-full object-cover bg-white dark:bg-black",
								onError: (e) => {
									e.target.src = "https://ui-avatars.com/api/?name=Techy+News&background=0D8ABC&color=fff";
								}
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xl font-black text-gray-900 dark:text-white mb-2",
								children: __("TechyNews Editorial Board")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4",
								children: __("This article was drafted using AI and rigorously fact-checked, edited, and analyzed by the TechyNews human editorial team. We strive to provide contextual depth and market analysis to help you understand the tech landscape.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link_default, {
								href: "/about",
								className: "text-xs font-bold text-primary hover:text-purple-500 transition-colors uppercase tracking-widest",
								children: [__("Read our Editorial Policy"), " →"]
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { className: "mt-20 mb-8" }),
					relatedArticles && relatedArticles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-40 pt-20 border-t border-black/5 dark:border-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-4xl font-black tracking-tighter text-gray-900 dark:text-white",
								children: __("Read Next.")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link_default, {
								href: "/archive",
								className: "text-xs font-black uppercase tracking-widest text-primary hover:text-black dark:hover:text-white transition-colors flex items-center gap-2",
								children: [
									__("Explorer Library"),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-8",
							children: relatedArticles.map((related) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link_default, {
								href: `/article/${related.slug}`,
								className: "group block h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white dark:bg-white/[0.03] rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/10 group-hover:border-primary/30 transition-all p-6 h-full flex flex-col shadow-sm dark:shadow-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-40 rounded-2xl bg-cover bg-center mb-6 shadow-xl",
										style: { backgroundImage: `url(${getFinalImage(related, 800)})` }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] font-black text-primary uppercase tracking-widest mb-3",
												children: (0, import_dayjs_min.default)(related.updated_at).format("MMM D, YYYY")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-xl font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 mb-3 leading-tight tracking-tight",
												children: related.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-gray-600 dark:text-gray-500 font-light line-clamp-2 leading-relaxed",
												children: related.ai_summary
											})
										]
									})]
								})
							}, related.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicFooter, { className: "mt-20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagCopilot, {})
			})
		]
	});
}
var TipTapRenderer = ({ content }) => {
	import_react.useEffect(() => {
		mermaid_default.initialize({
			startOnLoad: true,
			theme: document.documentElement.classList.contains("dark") ? "dark" : "default"
		});
		mermaid_default.contentLoaded();
	}, [content]);
	import_react.useEffect(() => {
		const loadPrism = async () => {
			if (!window.Prism) {
				await new Promise((resolve) => {
					const script = document.createElement("script");
					script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js";
					script.async = true;
					script.onload = resolve;
					document.body.appendChild(script);
				});
				for (const dep of ["markup-templating"]) await new Promise((resolve) => {
					const script = document.createElement("script");
					script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${dep}.min.js`;
					script.async = true;
					script.onload = resolve;
					script.onerror = resolve;
					document.body.appendChild(script);
				});
				for (const lang of [
					"javascript",
					"php",
					"css",
					"markup",
					"bash",
					"python",
					"json"
				]) await new Promise((resolve) => {
					const langScript = document.createElement("script");
					langScript.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`;
					langScript.async = true;
					langScript.onload = resolve;
					document.body.appendChild(langScript);
				});
				const style = document.createElement("link");
				style.rel = "stylesheet";
				style.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css";
				document.head.appendChild(style);
			}
			window.Prism?.highlightAll();
		};
		loadPrism();
	}, [content]);
	if (!content) return null;
	if (typeof content === "string") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "whitespace-pre-wrap",
		children: content
	});
	if (!content.content) return null;
	const renderNode = (node, index) => {
		if (node.type === "text") {
			let element = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: node.text }, index);
			if (node.marks) node.marks.forEach((mark) => {
				if (mark.type === "bold") element = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: element }, `bold-${index}`);
				if (mark.type === "italic") element = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: element }, `italic-${index}`);
				if (mark.type === "strike") element = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("del", { children: element }, `strike-${index}`);
				if (mark.type === "code") element = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-primary font-bold",
					children: element
				}, `code-${index}`);
			});
			return element;
		}
		switch (node.type) {
			case "paragraph": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-8",
				children: node.content?.map((n, i) => renderNode(n, i))
			}, index);
			case "heading": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(`h${node.attrs?.level || 2}`, {
				className: `font-black mt-16 mb-6 tracking-tighter leading-tight text-black dark:text-white ${node.attrs?.level === 1 ? "text-4xl" : node.attrs?.level === 2 ? "text-3xl" : "text-2xl"}`,
				children: node.content?.map((n, i) => renderNode(n, i))
			}, index);
			case "bulletList": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "list-disc pl-8 mb-8 space-y-4",
				children: node.content?.map((n, i) => renderNode(n, i))
			}, index);
			case "listItem": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "pl-2",
				children: node.content?.map((n, i) => renderNode(n, i))
			}, index);
			case "codeBlock":
				if (node.attrs?.language === "mermaid") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mermaid bg-white dark:bg-[#0d1117] p-6 rounded-2xl border border-black/5 dark:border-white/10 mb-8 my-10 overflow-auto",
					children: node.content?.[0]?.text
				}, index);
				const codeContent = node.content?.map((n) => n.text).join("") || "";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative my-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -top-3 left-6 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg z-10 shadow-lg shadow-primary/20",
						children: node.attrs?.language || "code"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "bg-gray-100 dark:bg-white/[0.03] p-8 pt-10 rounded-[1.5rem] border border-black/10 dark:border-white/10 mb-8 overflow-auto group-hover:border-primary/30 transition-all duration-500 scrollbar-thin scrollbar-thumb-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: `language-${node.attrs?.language} text-sm text-gray-900 dark:text-gray-300 leading-relaxed block whitespace-pre`,
							children: codeContent
						})
					})]
				}, index);
			case "blockquote": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "border-l-4 border-primary pl-6 py-2 my-8 italic text-gray-700 dark:text-gray-300 bg-primary/5 rounded-r-xl",
				children: node.content?.map((n, i) => renderNode(n, i))
			}, index);
			case "image": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-10 relative group overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/10 shadow-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: node.attrs?.src ? node.attrs.src.startsWith("http") || node.attrs.src.startsWith("/") ? node.attrs.src : "/storage/" + node.attrs.src : null,
					alt: node.attrs?.alt || "Article image",
					title: node.attrs?.title,
					className: "w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
				}), (node.attrs?.title || node.attrs?.alt) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-white text-sm font-medium",
						children: node.attrs?.title || node.attrs?.alt
					})
				})]
			}, index);
			default: return null;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "tiptap-content",
		children: content.content.map((node, i) => renderNode(node, i))
	});
};
//#endregion
export { ArticleShow as default };
