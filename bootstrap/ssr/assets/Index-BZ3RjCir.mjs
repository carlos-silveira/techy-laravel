import "./rolldown-runtime-BMI-E3GI.mjs";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-BEFDdCF_.mjs";
import { r as Head_default } from "../ssr.mjs";
import { t as StudioLayout } from "./StudioLayout-qPcfnwTa.mjs";
import { t as AgentControl } from "./AgentControl-DG9DgdgF.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function AgentIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StudioLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { title: "Agent Terminal — Studio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 md:p-16 max-w-7xl mx-auto space-y-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentControl, {})
	})] });
}
//#endregion
export { AgentIndex as default };
