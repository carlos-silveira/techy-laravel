import { at as Color, ot as Utils } from "./chunk-DU6HZSFF-DgfoI2E2.mjs";
//#region ../techy-laravel/node_modules/khroma/dist/methods/channel.js
var channel = (color, channel) => {
	return Utils.lang.round(Color.parse(color)[channel]);
};
//#endregion
export { channel as t };
