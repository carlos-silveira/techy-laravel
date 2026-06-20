import { r as __name } from "./src-zOi_kTzp.mjs";
//#region node_modules/mermaid/dist/chunks/mermaid.core/chunk-4BX2VUAB.mjs
function populateCommonDb(ast, db) {
	if (ast.accDescr) db.setAccDescription?.(ast.accDescr);
	if (ast.accTitle) db.setAccTitle?.(ast.accTitle);
	if (ast.title) db.setDiagramTitle?.(ast.title);
}
__name(populateCommonDb, "populateCommonDb");
//#endregion
export { populateCommonDb as t };
