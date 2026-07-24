import { r as __name } from "./src-Bqlj18LF.mjs";
import "./chunk-CSCIHK7Q-nIlf7H9D.mjs";
import "./chunk-5ZQYHXKU-DxqPicp-.mjs";
import "./chunk-O5CBEL6O-BIhXkq4I.mjs";
import "./chunk-BSJP7CBP-B2esSOvw.mjs";
import "./chunk-L5ZTLDWV-D2AaIoLd.mjs";
import "./chunk-55IACEB6-CGeydomV.mjs";
import "./chunk-2J33WTMH-B6vcNV7P.mjs";
import "./chunk-NZK2D7GU-ByOgkFuB.mjs";
import "./chunk-3OPIFGDE-DiW0CTCC.mjs";
import "./chunk-KSCS5N6A-Wq4T1yvn.mjs";
import "./chunk-LZXEDZCA-BbA5d5AP.mjs";
import { i as styles_default, n as stateDiagram_default, r as stateRenderer_v3_unified_default, t as StateDB } from "./chunk-AQP2D5EJ-DvVAIHqd.mjs";
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
