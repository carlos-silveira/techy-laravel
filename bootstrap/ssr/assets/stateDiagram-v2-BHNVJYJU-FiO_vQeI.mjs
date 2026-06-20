import { r as __name } from "./src-BAXAkbHX.mjs";
import "./chunk-CSCIHK7Q-R3DnWyyv.mjs";
import "./chunk-5ZQYHXKU-DYNWrQ9x.mjs";
import "./chunk-O5CBEL6O-YapUNE8h.mjs";
import "./chunk-BSJP7CBP-Ca4avuVH.mjs";
import "./chunk-L5ZTLDWV-nsqIdwC1.mjs";
import "./chunk-55IACEB6-BThinwNa.mjs";
import "./chunk-2J33WTMH-An1mLQNO.mjs";
import "./chunk-NZK2D7GU-CgThXEax.mjs";
import "./chunk-3OPIFGDE-CBIi0WiP.mjs";
import "./chunk-KSCS5N6A-lGHSO2qc.mjs";
import "./chunk-LZXEDZCA-jepyszoA.mjs";
import { i as styles_default, n as stateDiagram_default, r as stateRenderer_v3_unified_default, t as StateDB } from "./chunk-AQP2D5EJ-D-iGEYtY.mjs";
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
