import { n as __name } from "./chunk-Y2CYZVJY-vpaMb4RE.mjs";
import { n as log } from "./src-B_3PTlnY.mjs";
import { c as configureSvgSize } from "./chunk-DU6HZSFF-DgfoI2E2.mjs";
import { p as selectSvgElement } from "./ArticleShow-9YL6fMcQ.mjs";
import { n as parse } from "./mermaid-parser.core-D2K5OIsb.mjs";
//#region ../techy-laravel/node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-RXCK75RN.mjs
var parser = { parse: /* @__PURE__ */ __name(async (input) => {
	const ast = await parse("info", input);
	log.debug(ast);
}, "parse") };
var DEFAULT_INFO_DB = { version: "11.17.0" };
var diagram = {
	parser,
	db: { getVersion: /* @__PURE__ */ __name(() => DEFAULT_INFO_DB.version, "getVersion") },
	renderer: { draw: /* @__PURE__ */ __name((text, id, version) => {
		log.debug("rendering info diagram\n" + text);
		const svg = selectSvgElement(id);
		configureSvgSize(svg, 100, 400, true);
		svg.append("g").append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
	}, "draw") }
};
//#endregion
export { diagram };
