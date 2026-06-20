import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react } from "./jsx-runtime-Cafemv7i.mjs";
import { S as MotionConfigContext, s as motionValue, w as useConstant } from "./createLucideIcon-DvhrQ9-F.mjs";
//#region node_modules/framer-motion/dist/es/value/use-motion-value.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Creates a `MotionValue` to track the state and velocity of a value.
*
* Usually, these are created automatically. For advanced use-cases, like use with `useTransform`, you can create `MotionValue`s externally and pass them into the animated component via the `style` prop.
*
* ```jsx
* export const MyComponent = () => {
*   const scale = useMotionValue(1)
*
*   return <motion.div style={{ scale }} />
* }
* ```
*
* @param initial - The initial state.
*
* @public
*/
function useMotionValue(initial) {
	const value = useConstant(() => motionValue(initial));
	/**
	* If this motion value is being used in static mode, like on
	* the Framer canvas, force components to rerender when the motion
	* value is updated.
	*/
	const { isStatic } = (0, import_react.useContext)(MotionConfigContext);
	if (isStatic) {
		const [, setLatest] = (0, import_react.useState)(initial);
		(0, import_react.useEffect)(() => value.on("change", setLatest), []);
	}
	return value;
}
//#endregion
export { useMotionValue as t };
