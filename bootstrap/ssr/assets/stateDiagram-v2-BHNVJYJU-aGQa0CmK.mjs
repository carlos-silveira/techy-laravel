import { r as __name } from "./src-zOi_kTzp.mjs";
import "./chunk-CSCIHK7Q-hwKU8CoH.mjs";
import "./chunk-5ZQYHXKU-BwrT50J3.mjs";
import "./chunk-O5CBEL6O-4FruxiGI.mjs";
import "./chunk-BSJP7CBP-2H3saa6F.mjs";
import "./chunk-L5ZTLDWV-BV4Zfg_n.mjs";
import "./chunk-55IACEB6-Co4Eex7s.mjs";
import "./chunk-2J33WTMH-AqXS0ouK.mjs";
import "./chunk-NZK2D7GU-COXoBHqN.mjs";
import "./chunk-3OPIFGDE-B9gAYYFm.mjs";
import "./chunk-KSCS5N6A-CaTY9faH.mjs";
import "./chunk-LZXEDZCA-L84VCvVt.mjs";
import { i as styles_default, n as stateDiagram_default, r as stateRenderer_v3_unified_default, t as StateDB } from "./chunk-AQP2D5EJ-B-rCpE3O.mjs";
//#region node_modules/mermaid/dist/chunks/mermaid.core/stateDiagram-v2-BHNVJYJU.mjs
var diagram = {
	parser: stateDiagram_default,
	get db() {
		return new StateDB(2);
	},
	renderer: stateRenderer_v3_unified_default,
	styles: styles_default,
	init: /* @__PURE__ */ __name((cnf) => {
		if (!cnf.state) cnf.state = {};
		cnf.state.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
	}, "init")
};
//#endregion
export { diagram };
