import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { n as require_react } from "./jsx-runtime-Cafemv7i.mjs";
import { S as MotionConfigContext, b as useIsomorphicLayoutEffect, f as isMotionValue, g as frameData, h as frame, r as animateValue } from "./createLucideIcon-DvhrQ9-F.mjs";
import { t as useMotionValue } from "./use-motion-value-B5SU4CfM.mjs";
//#region node_modules/framer-motion/dist/es/value/use-spring.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function toNumber(v) {
	if (typeof v === "number") return v;
	return parseFloat(v);
}
/**
* Creates a `MotionValue` that, when `set`, will use a spring animation to animate to its new state.
*
* It can either work as a stand-alone `MotionValue` by initialising it with a value, or as a subscriber
* to another `MotionValue`.
*
* @remarks
*
* ```jsx
* const x = useSpring(0, { stiffness: 300 })
* const y = useSpring(x, { damping: 10 })
* ```
*
* @param inputValue - `MotionValue` or number. If provided a `MotionValue`, when the input `MotionValue` changes, the created `MotionValue` will spring towards that value.
* @param springConfig - Configuration options for the spring.
* @returns `MotionValue`
*
* @public
*/
function useSpring(source, config = {}) {
	const { isStatic } = (0, import_react.useContext)(MotionConfigContext);
	const activeSpringAnimation = (0, import_react.useRef)(null);
	const value = useMotionValue(isMotionValue(source) ? toNumber(source.get()) : source);
	const latestValue = (0, import_react.useRef)(value.get());
	const latestSetter = (0, import_react.useRef)(() => {});
	const startAnimation = () => {
		/**
		* If the previous animation hasn't had the chance to even render a frame, render it now.
		*/
		const animation = activeSpringAnimation.current;
		if (animation && animation.time === 0) animation.sample(frameData.delta);
		stopAnimation();
		activeSpringAnimation.current = animateValue({
			keyframes: [value.get(), latestValue.current],
			velocity: value.getVelocity(),
			type: "spring",
			restDelta: .001,
			restSpeed: .01,
			...config,
			onUpdate: latestSetter.current
		});
	};
	const stopAnimation = () => {
		if (activeSpringAnimation.current) activeSpringAnimation.current.stop();
	};
	(0, import_react.useInsertionEffect)(() => {
		return value.attach((v, set) => {
			/**
			* A more hollistic approach to this might be to use isStatic to fix VisualElement animations
			* at that level, but this will work for now
			*/
			if (isStatic) return set(v);
			latestValue.current = v;
			latestSetter.current = set;
			frame.update(startAnimation);
			return value.get();
		}, stopAnimation);
	}, [JSON.stringify(config)]);
	useIsomorphicLayoutEffect(() => {
		if (isMotionValue(source)) return source.on("change", (v) => value.set(toNumber(v)));
	}, [value]);
	return value;
}
//#endregion
export { useSpring as t };
