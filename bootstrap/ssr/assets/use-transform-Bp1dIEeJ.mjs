import { o as __toESM } from "./chunk-CNf5ZN-e.mjs";
import { u as require_react } from "../ssr.mjs";
import { _ as progress, a as interpolate, b as useIsomorphicLayoutEffect, c as velocityPerSecond, d as clamp, f as isMotionValue, g as frameData, h as frame, i as defaultOffset$1, l as resolveElements, m as cancelFrame, o as collectMotionValues, p as warnOnce, s as motionValue, u as supportsScrollTimeline, v as warning, w as useConstant, y as noop } from "./createLucideIcon-DugaG8X6.mjs";
import { t as useMotionValue } from "./use-motion-value-WjLSuSSR.mjs";
//#region node_modules/framer-motion/dist/es/render/dom/scroll/observe.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function observeTimeline(update, timeline) {
	let prevProgress;
	const onFrame = () => {
		const { currentTime } = timeline;
		const progress = (currentTime === null ? 0 : currentTime.value) / 100;
		if (prevProgress !== progress) update(progress);
		prevProgress = progress;
	};
	frame.update(onFrame, true);
	return () => cancelFrame(onFrame);
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/resize/handle-element.mjs
var resizeHandlers = /* @__PURE__ */ new WeakMap();
var observer;
function getElementSize(target, borderBoxSize) {
	if (borderBoxSize) {
		const { inlineSize, blockSize } = borderBoxSize[0];
		return {
			width: inlineSize,
			height: blockSize
		};
	} else if (target instanceof SVGElement && "getBBox" in target) return target.getBBox();
	else return {
		width: target.offsetWidth,
		height: target.offsetHeight
	};
}
function notifyTarget({ target, contentRect, borderBoxSize }) {
	var _a;
	(_a = resizeHandlers.get(target)) === null || _a === void 0 || _a.forEach((handler) => {
		handler({
			target,
			contentSize: contentRect,
			get size() {
				return getElementSize(target, borderBoxSize);
			}
		});
	});
}
function notifyAll(entries) {
	entries.forEach(notifyTarget);
}
function createResizeObserver() {
	if (typeof ResizeObserver === "undefined") return;
	observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
	if (!observer) createResizeObserver();
	const elements = resolveElements(target);
	elements.forEach((element) => {
		let elementHandlers = resizeHandlers.get(element);
		if (!elementHandlers) {
			elementHandlers = /* @__PURE__ */ new Set();
			resizeHandlers.set(element, elementHandlers);
		}
		elementHandlers.add(handler);
		observer === null || observer === void 0 || observer.observe(element);
	});
	return () => {
		elements.forEach((element) => {
			const elementHandlers = resizeHandlers.get(element);
			elementHandlers === null || elementHandlers === void 0 || elementHandlers.delete(handler);
			if (!(elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.size)) observer === null || observer === void 0 || observer.unobserve(element);
		});
	};
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/resize/handle-window.mjs
var windowCallbacks = /* @__PURE__ */ new Set();
var windowResizeHandler;
function createWindowResizeHandler() {
	windowResizeHandler = () => {
		const size = {
			width: window.innerWidth,
			height: window.innerHeight
		};
		const info = {
			target: window,
			size,
			contentSize: size
		};
		windowCallbacks.forEach((callback) => callback(info));
	};
	window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
	windowCallbacks.add(callback);
	if (!windowResizeHandler) createWindowResizeHandler();
	return () => {
		windowCallbacks.delete(callback);
		if (!windowCallbacks.size && windowResizeHandler) windowResizeHandler = void 0;
	};
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/resize/index.mjs
function resize(a, b) {
	return typeof a === "function" ? resizeWindow(a) : resizeElement(a, b);
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/info.mjs
/**
* A time in milliseconds, beyond which we consider the scroll velocity to be 0.
*/
var maxElapsed = 50;
var createAxisInfo = () => ({
	current: 0,
	offset: [],
	progress: 0,
	scrollLength: 0,
	targetOffset: 0,
	targetLength: 0,
	containerLength: 0,
	velocity: 0
});
var createScrollInfo = () => ({
	time: 0,
	x: createAxisInfo(),
	y: createAxisInfo()
});
var keys = {
	x: {
		length: "Width",
		position: "Left"
	},
	y: {
		length: "Height",
		position: "Top"
	}
};
function updateAxisInfo(element, axisName, info, time) {
	const axis = info[axisName];
	const { length, position } = keys[axisName];
	const prev = axis.current;
	const prevTime = info.time;
	axis.current = element[`scroll${position}`];
	axis.scrollLength = element[`scroll${length}`] - element[`client${length}`];
	axis.offset.length = 0;
	axis.offset[0] = 0;
	axis.offset[1] = axis.scrollLength;
	axis.progress = progress(0, axis.scrollLength, axis.current);
	const elapsed = time - prevTime;
	axis.velocity = elapsed > maxElapsed ? 0 : velocityPerSecond(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time) {
	updateAxisInfo(element, "x", info, time);
	updateAxisInfo(element, "y", info, time);
	info.time = time;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/offsets/inset.mjs
function calcInset(element, container) {
	const inset = {
		x: 0,
		y: 0
	};
	let current = element;
	while (current && current !== container) if (current instanceof HTMLElement) {
		inset.x += current.offsetLeft;
		inset.y += current.offsetTop;
		current = current.offsetParent;
	} else if (current.tagName === "svg") {
		/**
		* This isn't an ideal approach to measuring the offset of <svg /> tags.
		* It would be preferable, given they behave like HTMLElements in most ways
		* to use offsetLeft/Top. But these don't exist on <svg />. Likewise we
		* can't use .getBBox() like most SVG elements as these provide the offset
		* relative to the SVG itself, which for <svg /> is usually 0x0.
		*/
		const svgBoundingBox = current.getBoundingClientRect();
		current = current.parentElement;
		const parentBoundingBox = current.getBoundingClientRect();
		inset.x += svgBoundingBox.left - parentBoundingBox.left;
		inset.y += svgBoundingBox.top - parentBoundingBox.top;
	} else if (current instanceof SVGGraphicsElement) {
		const { x, y } = current.getBBox();
		inset.x += x;
		inset.y += y;
		let svg = null;
		let parent = current.parentNode;
		while (!svg) {
			if (parent.tagName === "svg") svg = parent;
			parent = current.parentNode;
		}
		current = svg;
	} else break;
	return inset;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/offsets/edge.mjs
var namedEdges = {
	start: 0,
	center: .5,
	end: 1
};
function resolveEdge(edge, length, inset = 0) {
	let delta = 0;
	/**
	* If we have this edge defined as a preset, replace the definition
	* with the numerical value.
	*/
	if (edge in namedEdges) edge = namedEdges[edge];
	/**
	* Handle unit values
	*/
	if (typeof edge === "string") {
		const asNumber = parseFloat(edge);
		if (edge.endsWith("px")) delta = asNumber;
		else if (edge.endsWith("%")) edge = asNumber / 100;
		else if (edge.endsWith("vw")) delta = asNumber / 100 * document.documentElement.clientWidth;
		else if (edge.endsWith("vh")) delta = asNumber / 100 * document.documentElement.clientHeight;
		else edge = asNumber;
	}
	/**
	* If the edge is defined as a number, handle as a progress value.
	*/
	if (typeof edge === "number") delta = length * edge;
	return inset + delta;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/offsets/offset.mjs
var defaultOffset = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
	let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
	let targetPoint = 0;
	let containerPoint = 0;
	if (typeof offset === "number")
 /**
	* If we're provided offset: [0, 0.5, 1] then each number x should become
	* [x, x], so we default to the behaviour of mapping 0 => 0 of both target
	* and container etc.
	*/
	offsetDefinition = [offset, offset];
	else if (typeof offset === "string") {
		offset = offset.trim();
		if (offset.includes(" ")) offsetDefinition = offset.split(" ");
		else
 /**
		* If we're provided a definition like "100px" then we want to apply
		* that only to the top of the target point, leaving the container at 0.
		* Whereas a named offset like "end" should be applied to both.
		*/
		offsetDefinition = [offset, namedEdges[offset] ? offset : `0`];
	}
	targetPoint = resolveEdge(offsetDefinition[0], targetLength, targetInset);
	containerPoint = resolveEdge(offsetDefinition[1], containerLength);
	return targetPoint - containerPoint;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/offsets/presets.mjs
var ScrollOffset = {
	Enter: [[0, 1], [1, 1]],
	Exit: [[0, 0], [1, 0]],
	Any: [[1, 0], [0, 1]],
	All: [[0, 0], [1, 1]]
};
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/offsets/index.mjs
var point = {
	x: 0,
	y: 0
};
function getTargetSize(target) {
	return "getBBox" in target && target.tagName !== "svg" ? target.getBBox() : {
		width: target.clientWidth,
		height: target.clientHeight
	};
}
function resolveOffsets(container, info, options) {
	const { offset: offsetDefinition = ScrollOffset.All } = options;
	const { target = container, axis = "y" } = options;
	const lengthLabel = axis === "y" ? "height" : "width";
	const inset = target !== container ? calcInset(target, container) : point;
	/**
	* Measure the target and container. If they're the same thing then we
	* use the container's scrollWidth/Height as the target, from there
	* all other calculations can remain the same.
	*/
	const targetSize = target === container ? {
		width: container.scrollWidth,
		height: container.scrollHeight
	} : getTargetSize(target);
	const containerSize = {
		width: container.clientWidth,
		height: container.clientHeight
	};
	/**
	* Reset the length of the resolved offset array rather than creating a new one.
	* TODO: More reusable data structures for targetSize/containerSize would also be good.
	*/
	info[axis].offset.length = 0;
	/**
	* Populate the offset array by resolving the user's offset definition into
	* a list of pixel scroll offets.
	*/
	let hasChanged = !info[axis].interpolate;
	const numOffsets = offsetDefinition.length;
	for (let i = 0; i < numOffsets; i++) {
		const offset = resolveOffset(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
		if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) hasChanged = true;
		info[axis].offset[i] = offset;
	}
	/**
	* If the pixel scroll offsets have changed, create a new interpolator function
	* to map scroll value into a progress.
	*/
	if (hasChanged) {
		info[axis].interpolate = interpolate(info[axis].offset, defaultOffset$1(offsetDefinition), { clamp: false });
		info[axis].interpolatorOffsets = [...info[axis].offset];
	}
	info[axis].progress = clamp(0, 1, info[axis].interpolate(info[axis].current));
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/on-scroll-handler.mjs
function measure(container, target = container, info) {
	/**
	* Find inset of target within scrollable container
	*/
	info.x.targetOffset = 0;
	info.y.targetOffset = 0;
	if (target !== container) {
		let node = target;
		while (node && node !== container) {
			info.x.targetOffset += node.offsetLeft;
			info.y.targetOffset += node.offsetTop;
			node = node.offsetParent;
		}
	}
	info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
	info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
	info.x.containerLength = container.clientWidth;
	info.y.containerLength = container.clientHeight;
	/**
	* In development mode ensure scroll containers aren't position: static as this makes
	* it difficult to measure their relative positions.
	*/
	if (process.env.NODE_ENV !== "production") {
		if (container && target && target !== container) warnOnce(getComputedStyle(container).position !== "static", "Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.");
	}
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
	return {
		measure: () => measure(element, options.target, info),
		update: (time) => {
			updateScrollInfo(element, info, time);
			if (options.offset || options.target) resolveOffsets(element, info, options);
		},
		notify: () => onScroll(info)
	};
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/track.mjs
var scrollListeners = /* @__PURE__ */ new WeakMap();
var resizeListeners = /* @__PURE__ */ new WeakMap();
var onScrollHandlers = /* @__PURE__ */ new WeakMap();
var getEventTarget = (element) => element === document.documentElement ? window : element;
function scrollInfo(onScroll, { container = document.documentElement, ...options } = {}) {
	let containerHandlers = onScrollHandlers.get(container);
	/**
	* Get the onScroll handlers for this container.
	* If one isn't found, create a new one.
	*/
	if (!containerHandlers) {
		containerHandlers = /* @__PURE__ */ new Set();
		onScrollHandlers.set(container, containerHandlers);
	}
	const containerHandler = createOnScrollHandler(container, onScroll, createScrollInfo(), options);
	containerHandlers.add(containerHandler);
	/**
	* Check if there's a scroll event listener for this container.
	* If not, create one.
	*/
	if (!scrollListeners.has(container)) {
		const measureAll = () => {
			for (const handler of containerHandlers) handler.measure();
		};
		const updateAll = () => {
			for (const handler of containerHandlers) handler.update(frameData.timestamp);
		};
		const notifyAll = () => {
			for (const handler of containerHandlers) handler.notify();
		};
		const listener = () => {
			frame.read(measureAll, false, true);
			frame.read(updateAll, false, true);
			frame.update(notifyAll, false, true);
		};
		scrollListeners.set(container, listener);
		const target = getEventTarget(container);
		window.addEventListener("resize", listener, { passive: true });
		if (container !== document.documentElement) resizeListeners.set(container, resize(container, listener));
		target.addEventListener("scroll", listener, { passive: true });
	}
	const listener = scrollListeners.get(container);
	frame.read(listener, false, true);
	return () => {
		var _a;
		cancelFrame(listener);
		/**
		* Check if we even have any handlers for this container.
		*/
		const currentHandlers = onScrollHandlers.get(container);
		if (!currentHandlers) return;
		currentHandlers.delete(containerHandler);
		if (currentHandlers.size) return;
		/**
		* If no more handlers, remove the scroll listener too.
		*/
		const scrollListener = scrollListeners.get(container);
		scrollListeners.delete(container);
		if (scrollListener) {
			getEventTarget(container).removeEventListener("scroll", scrollListener);
			(_a = resizeListeners.get(container)) === null || _a === void 0 || _a();
			window.removeEventListener("resize", scrollListener);
		}
	};
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/index.mjs
function scrollTimelineFallback({ source, container, axis = "y" }) {
	if (source) container = source;
	const currentTime = { value: 0 };
	return {
		currentTime,
		cancel: scrollInfo((info) => {
			currentTime.value = info[axis].progress * 100;
		}, {
			container,
			axis
		})
	};
}
var timelineCache = /* @__PURE__ */ new Map();
function getTimeline({ source, container = document.documentElement, axis = "y" } = {}) {
	if (source) container = source;
	if (!timelineCache.has(container)) timelineCache.set(container, {});
	const elementCache = timelineCache.get(container);
	if (!elementCache[axis]) elementCache[axis] = supportsScrollTimeline() ? new ScrollTimeline({
		source: container,
		axis
	}) : scrollTimelineFallback({
		source: container,
		axis
	});
	return elementCache[axis];
}
/**
* If the onScroll function has two arguments, it's expecting
* more specific information about the scroll from scrollInfo.
*/
function isOnScrollWithInfo(onScroll) {
	return onScroll.length === 2;
}
/**
* Currently, we only support element tracking with `scrollInfo`, though in
* the future we can also offer ViewTimeline support.
*/
function needsElementTracking(options) {
	return options && (options.target || options.offset);
}
function scrollFunction(onScroll, options) {
	if (isOnScrollWithInfo(onScroll) || needsElementTracking(options)) return scrollInfo((info) => {
		onScroll(info[options.axis].progress, info);
	}, options);
	else return observeTimeline(onScroll, getTimeline(options));
}
function scrollAnimation(animation, options) {
	animation.flatten();
	if (needsElementTracking(options)) {
		animation.pause();
		return scrollInfo((info) => {
			animation.time = animation.duration * info[options.axis].progress;
		}, options);
	} else {
		const timeline = getTimeline(options);
		if (animation.attachTimeline) return animation.attachTimeline(timeline, (valueAnimation) => {
			valueAnimation.pause();
			return observeTimeline((progress) => {
				valueAnimation.time = valueAnimation.duration * progress;
			}, timeline);
		});
		else return noop;
	}
}
function scroll(onScroll, { axis = "y", ...options } = {}) {
	const optionsWithDefaults = {
		axis,
		...options
	};
	return typeof onScroll === "function" ? scrollFunction(onScroll, optionsWithDefaults) : scrollAnimation(onScroll, optionsWithDefaults);
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-scroll.mjs
function refWarning(name, ref) {
	warning(Boolean(!ref || ref.current), `You have defined a ${name} options but the provided ref is not yet hydrated, probably because it's defined higher up the tree. Try calling useScroll() in the same component as the ref, or setting its \`layoutEffect: false\` option.`);
}
var createScrollMotionValues = () => ({
	scrollX: motionValue(0),
	scrollY: motionValue(0),
	scrollXProgress: motionValue(0),
	scrollYProgress: motionValue(0)
});
function useScroll({ container, target, layoutEffect = true, ...options } = {}) {
	const values = useConstant(createScrollMotionValues);
	(layoutEffect ? useIsomorphicLayoutEffect : import_react.useEffect)(() => {
		refWarning("target", target);
		refWarning("container", container);
		return scroll((_progress, { x, y }) => {
			values.scrollX.set(x.current);
			values.scrollXProgress.set(x.progress);
			values.scrollY.set(y.current);
			values.scrollYProgress.set(y.progress);
		}, {
			...options,
			container: (container === null || container === void 0 ? void 0 : container.current) || void 0,
			target: (target === null || target === void 0 ? void 0 : target.current) || void 0
		});
	}, [
		container,
		target,
		JSON.stringify(options.offset)
	]);
	return values;
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-combine-values.mjs
function useCombineMotionValues(values, combineValues) {
	/**
	* Initialise the returned motion value. This remains the same between renders.
	*/
	const value = useMotionValue(combineValues());
	/**
	* Create a function that will update the template motion value with the latest values.
	* This is pre-bound so whenever a motion value updates it can schedule its
	* execution in Framesync. If it's already been scheduled it won't be fired twice
	* in a single frame.
	*/
	const updateValue = () => value.set(combineValues());
	/**
	* Synchronously update the motion value with the latest values during the render.
	* This ensures that within a React render, the styles applied to the DOM are up-to-date.
	*/
	updateValue();
	/**
	* Subscribe to all motion values found within the template. Whenever any of them change,
	* schedule an update.
	*/
	useIsomorphicLayoutEffect(() => {
		const scheduleUpdate = () => frame.preRender(updateValue, false, true);
		const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
		return () => {
			subscriptions.forEach((unsubscribe) => unsubscribe());
			cancelFrame(updateValue);
		};
	});
	return value;
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-motion-template.mjs
/**
* Combine multiple motion values into a new one using a string template literal.
*
* ```jsx
* import {
*   motion,
*   useSpring,
*   useMotionValue,
*   useMotionTemplate
* } from "framer-motion"
*
* function Component() {
*   const shadowX = useSpring(0)
*   const shadowY = useMotionValue(0)
*   const shadow = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.3))`
*
*   return <motion.div style={{ filter: shadow }} />
* }
* ```
*
* @public
*/
function useMotionTemplate(fragments, ...values) {
	/**
	* Create a function that will build a string from the latest motion values.
	*/
	const numFragments = fragments.length;
	function buildValue() {
		let output = ``;
		for (let i = 0; i < numFragments; i++) {
			output += fragments[i];
			const value = values[i];
			if (value) output += isMotionValue(value) ? value.get() : value;
		}
		return output;
	}
	return useCombineMotionValues(values.filter(isMotionValue), buildValue);
}
//#endregion
//#region node_modules/framer-motion/dist/es/utils/transform.mjs
var isCustomValueType = (v) => {
	return v && typeof v === "object" && v.mix;
};
var getMixer = (v) => isCustomValueType(v) ? v.mix : void 0;
function transform(...args) {
	const useImmediate = !Array.isArray(args[0]);
	const argOffset = useImmediate ? 0 : -1;
	const inputValue = args[0 + argOffset];
	const inputRange = args[1 + argOffset];
	const outputRange = args[2 + argOffset];
	const options = args[3 + argOffset];
	const interpolator = interpolate(inputRange, outputRange, {
		mixer: getMixer(outputRange[0]),
		...options
	});
	return useImmediate ? interpolator(inputValue) : interpolator;
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-computed.mjs
function useComputed(compute) {
	/**
	* Open session of collectMotionValues. Any MotionValue that calls get()
	* will be saved into this array.
	*/
	collectMotionValues.current = [];
	compute();
	const value = useCombineMotionValues(collectMotionValues.current, compute);
	/**
	* Synchronously close session of collectMotionValues.
	*/
	collectMotionValues.current = void 0;
	return value;
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-transform.mjs
function useTransform(input, inputRangeOrTransformer, outputRange, options) {
	if (typeof input === "function") return useComputed(input);
	const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
	return Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
}
function useListTransform(values, transformer) {
	const latest = useConstant(() => []);
	return useCombineMotionValues(values, () => {
		latest.length = 0;
		const numValues = values.length;
		for (let i = 0; i < numValues; i++) latest[i] = values[i].get();
		return transformer(latest);
	});
}
//#endregion
export { useMotionTemplate as n, useScroll as r, useTransform as t };
