import { at as Color, ot as Utils } from "./chunk-CSCIHK7Q-hwKU8CoH.mjs";
//#region node_modules/khroma/dist/methods/channel.js
var channel = (color, channel) => {
	return Utils.lang.round(Color.parse(color)[channel]);
};
//#endregion
export { channel as t };
