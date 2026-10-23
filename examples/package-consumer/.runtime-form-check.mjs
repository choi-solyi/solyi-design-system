import * as Vue from "vue";
import { Fragment, Teleport, Text, Transition, TransitionGroup, capitalize, cloneVNode, computed, createApp, createElementVNode, createVNode, defineComponent, effectScope, getCurrentInstance, getCurrentScope, h, h as h$1, hasInjectionContext, inject, isRef, markRaw, mergeProps, nextTick, nextTick as nextTick$1, normalizeClass, normalizeStyle, onBeforeMount, onBeforeUnmount, onMounted, onScopeDispose, onUpdated, provide, reactive, readonly, ref, ref as ref$1, resolveDynamicComponent, shallowReactive, shallowReadonly, shallowRef, toDisplayString, toRaw, toRef, toRefs, toValue, unref, useId, vShow, warn, watch, watchEffect, withDirectives } from "vue";
// examples/package-consumer/node_modules/vuetify/lib/util/console.js
function consoleWarn$1(message) {
	warn(`Vuetify: ${message}`);
}
function deprecate$1(original, replacement) {
	replacement = Array.isArray(replacement) ? replacement.slice(0, -1).map((s) => `'${s}'`).join(", ") + ` or '${replacement.at(-1)}'` : `'${replacement}'`;
	warn(`[Vuetify UPGRADE] '${original}' is deprecated, use ${replacement} instead.`);
}
// examples/package-consumer/node_modules/@vuetify/v0/dist/constants/globals.mjs
var IN_BROWSER$3 = typeof window !== "undefined";
IN_BROWSER$3 && ("ontouchstart" in window || window.navigator.maxTouchPoints);
IN_BROWSER$3 && "matchMedia" in window && window.matchMedia;
var SUPPORTS_OBSERVER$1 = IN_BROWSER$3 && "ResizeObserver" in window;
var SUPPORTS_INTERSECTION_OBSERVER$1 = IN_BROWSER$3 && "IntersectionObserver" in window;
IN_BROWSER$3 && "MutationObserver" in window;
typeof (process.env.NODE_ENV !== "production") !== "undefined" && process.env.NODE_ENV !== "production" || typeof process.env.VITE_LOGGER_ENABLED !== "undefined" && process.env.VITE_LOGGER_ENABLED;
// examples/package-consumer/node_modules/@vuetify/v0/dist/utilities/helpers.mjs
/**
* @module utilities/helpers
*
* @remarks
* Collection of utility functions for type checking, object manipulation,
* and common transformations. All exports are tree-shakeable.
*/
/**
* Checks if a value is a function
*
* @param item The value to check
* @returns True if the value is a function
*
* @example
* ```ts
* isFunction(() => {})  // true
* isFunction('string')  // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isFunction$1(item) {
	return typeof item === "function";
}
/**
* Checks if a value is a string
*
* @param item The value to check
* @returns True if the value is a string
*
* @example
* ```ts
* isString('hello')  // true
* isString(123)      // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isString$1(item) {
	return typeof item === "string";
}
/**
* Checks if a value is a number
*
* @param item The value to check
* @returns True if the value is a number (including NaN)
*
* @example
* ```ts
* isNumber(123)       // true
* isNumber(NaN)       // true
* isNumber('123')     // false
* ```
*
* @see {@link isNaN} to check for NaN specifically
*/
/* #__NO_SIDE_EFFECTS__ */
function isNumber$1(item) {
	return typeof item === "number";
}
/**
* Checks if a value is a plain object (excludes null and arrays)
*
* @param item The value to check
* @returns True if the value is a plain object
*
* @remarks
* Returns false for null and arrays, even though `typeof null === 'object'`
* and `typeof [] === 'object'` in JavaScript.
*
* `Record<string, any>` is load-bearing: TypeScript does not grant interfaces
* an implicit index signature, so `Record<string, unknown>` destroys known
* property types on interface-typed values and fails to subtract
* `Record<string, any>` members in the negative branch.
*
* @example
* ```ts
* isObject({})        // true
* isObject({ a: 1 })  // true
* isObject(null)      // false
* isObject([])        // false
* ```
*
* @see {@link isArray} to check for arrays
* @see {@link isNull} to check for null
*/
/* #__NO_SIDE_EFFECTS__ */
function isObject$1(item) {
	return typeof item === "object" && item !== null && !Array.isArray(item);
}
/**
* Checks if a value is an array
*
* @param item The value to check
* @returns True if the value is an array
*
* @example
* ```ts
* isArray([])        // true
* isArray([1, 2, 3]) // true
* isArray('string')  // false
* ```
*
* @remarks The guard keeps whichever array constituents the input already had —
* element types, tuple arity and `readonly` all survive, and the `else` branch
* drops exactly those constituents. Three branches, in order:
*
* 1. `0 extends (1 & T)` detects an `any` input and yields `T[]` (`any[]`),
*    matching `Array.isArray` so callback parameters stay contextually typed.
* 2. Nothing array-shaped to extract (an `unknown` value, say) falls back to
*    `unknown[]`, reproducing the previous narrowing so mutation and assignment
*    to `unknown[]` keep compiling.
* 3. Otherwise the array constituents of `T` pass through untouched.
*
* `NoInfer<T[]>` widens the parameter just enough for TypeScript to accept the
* first branch (a predicate must be assignable to its parameter's type) without
* letting an array argument capture the inference site.
*/
/* #__NO_SIDE_EFFECTS__ */
function isArray$1(item) {
	return Array.isArray(item);
}
/**
* Checks if a value is a DOM Element
*
* @param item The value to check
* @returns True if the value is a DOM Element
*
* @example
* ```ts
* isElement(document.body) // true
* isElement('string')      // false
* isElement(null)          // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isElement$1(item) {
	return typeof Element !== "undefined" && item instanceof Element;
}
/**
* Checks if a value is null
*
* @param item The value to check
* @returns True if the value is null
*
* @example
* ```ts
* isNull(null)      // true
* isNull(undefined) // false
* ```
*
* @see {@link isUndefined} to check for undefined
* @see {@link isNullOrUndefined} to check for either
*/
/* #__NO_SIDE_EFFECTS__ */
function isNull$1(item) {
	return item === null;
}
/**
* Checks if a value is null or undefined
*
* @param item The value to check
* @returns True if the value is null or undefined
*
* @remarks
* Uses loose equality (`== null`) which matches both null and undefined.
*
* @example
* ```ts
* isNullOrUndefined(null)      // true
* isNullOrUndefined(undefined) // true
* isNullOrUndefined(0)         // false
* isNullOrUndefined('')        // false
* ```
*
* @see {@link isNull} to check for null only
* @see {@link isUndefined} to check for undefined only
*/
/* #__NO_SIDE_EFFECTS__ */
function isNullOrUndefined$1(item) {
	return item == null;
}
/**
* Checks if a value is undefined
*
* @param item The value to check
* @returns True if the value is undefined
*
* @example
* ```ts
* isUndefined(undefined) // true
* isUndefined(null)      // false
* ```
*
* @see {@link isNull} to check for null
* @see {@link isNullOrUndefined} to check for either
*/
/* #__NO_SIDE_EFFECTS__ */
function isUndefined$1(item) {
	return item === void 0;
}
/**
* Checks if a value is a symbol
*
* @param item The value to check
* @returns True if the value is a symbol
*
* @example
* ```ts
* isSymbol(Symbol('test')) // true
* isSymbol('symbol')       // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isSymbol$1(item) {
	return typeof item === "symbol";
}
/**
* Checks if a value is NaN (Not a Number)
*
* @param item The value to check
* @returns True if the value is NaN
*
* @remarks
* Uses `Number.isNaN()` which only returns true for the actual NaN value,
* unlike the global `isNaN()` which coerces the argument to a number first.
*
* @example
* ```ts
* isNaN(NaN)         // true
* isNaN(123)         // false
* isNaN('hello')     // false (unlike global isNaN)
* isNaN(undefined)   // false (unlike global isNaN)
* ```
*
* @see {@link isNumber} to check if a value is a number type
*/
/* #__NO_SIDE_EFFECTS__ */
function isNaN$2(item) {
	return /* @__PURE__ */ isNumber$1(item) && Number.isNaN(item);
}
var UNSAFE_KEYS$1 = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
/**
* Parses a CSS pixel length into a number
*
* @param value The resolved CSS length, e.g. `getComputedStyle(el).marginLeft`
* @param fallback The value to return when `value` does not parse (default: 0)
* @returns The parsed number, or `fallback`
*
* @remarks
* Built for reading `getComputedStyle` output, where a length that does not
* apply resolves to `''` or `'auto'` rather than to a number. An unparseable
* length returns `fallback`; a length that legitimately parses to `0` returns
* `0`. That distinction is why this exists — `Number.parseFloat(v) || 0`
* collapses both cases onto `0`, which is only correct when the fallback is
* itself `0`.
*
* Only the leading number is read, matching `Number.parseFloat`, so any unit
* suffix is ignored. Values `getComputedStyle` never returns — percentages,
* `calc()` expressions, multi-value shorthands — are out of scope.
*
* @example
* ```ts
* pxToNumber('16px')          // 16
* pxToNumber('0px')           // 0
* pxToNumber('-4.5px')        // -4.5
* pxToNumber('auto')          // 0
* pxToNumber(undefined)       // 0
*
* // A non-zero fallback is the case `|| 0` cannot express
* pxToNumber('auto', 100)     // 100
* pxToNumber('0px', 100)      // 0
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function pxToNumber$1(value, fallback = 0) {
	if (!/* @__PURE__ */ isString$1(value)) return fallback;
	const parsed = Number.parseFloat(value);
	return /* @__PURE__ */ isNaN$2(parsed) ? fallback : parsed;
}
// examples/package-consumer/node_modules/@vuetify/v0/dist/utilities/errors.mjs
/**
* @module utilities/errors
*
* @remarks
* Structured error class thrown by v0 internals. Pattern modeled on
* tRPC's `TRPCError` and Node's built-in `Error` codes — `code` is a
* top-level discriminant field on the error, *not* a payload nested
* inside `Error.cause`. `cause` stays reserved for wrapping the
* genuine upstream error so error trackers (Sentry's `LinkedErrors`,
* Datadog RUM, Rollbar) render the chain correctly.
*
* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
* @see https://nodejs.org/api/errors.html#nodejs-error-codes
* @see https://trpc.io/docs/server/error-handling
* @see https://docs.sentry.io/platforms/javascript/configuration/integrations/linkederrors/
*/
/**
* Structured error thrown by v0 internals.
*
* @remarks
* Carries a stable {@link V0ErrorCode} discriminant on `code` so
* consumers, devtools panels, and error trackers can identify the
* error without parsing the message string. Domain context lives in
* top-level fields per code (`key` for `V0_CONTEXT_MISSING`, `plugin`
* for `V0_PLUGIN_MISSING`), populated from a {@link V0ErrorDetails}
* argument and merged onto the instance at construction time.
*
* `cause` is forwarded to `Error`'s standard `ErrorOptions.cause` slot
* and is intended to carry a wrapped upstream error, not metadata.
*
* Prefer {@link isV0Error} over manual `instanceof` checks at the
* narrowing site — the guard intersects the instance type with the
* matching {@link V0ErrorDetails} arm, so per-code fields are typed.
*
* @example Author site
* ```ts
* throw new V0Error('Context not found.', { code: 'V0_CONTEXT_MISSING', key })
* ```
*
* @example Author site with upstream wrap
* ```ts
* try {
*   JSON.parse(raw)
* } catch (err) {
*   throw new V0Error('Failed to hydrate registry.', {
*     code: 'V0_CONTEXT_MISSING',
*     key: 'v0:registry',
*     cause: err,
*   })
* }
* ```
*
* @example Consumer site
* ```ts
* try {
*   useContext(myKey)
* } catch (err) {
*   if (isV0Error(err, 'V0_CONTEXT_MISSING')) {
*     console.log(err.key)
*   }
* }
* ```
*/
var V0Error$1 = class extends Error {
	name = "V0Error";
	code;
	key;
	plugin;
	palette;
	seed;
	variant;
	adapter;
	prefix;
	constructor(message, details) {
		const { cause, ...rest } = details;
		super(message, /* @__PURE__ */ isUndefined$1(cause) ? void 0 : { cause });
		this.code = details.code;
		for (const [key, value] of Object.entries(rest)) {
			if (UNSAFE_KEYS$1.has(key)) continue;
			this[key] = value;
		}
	}
};
// examples/package-consumer/node_modules/@vuetify/v0/dist/composables/createContext/index.mjs
/**
* @module createContext
*
* @see https://0.vuetifyjs.com/composables/foundation/create-context
*
* @remarks
* Factory for creating type-safe Vue dependency injection contexts.
*
* Provides a wrapper around Vue's provide/inject that throws errors when context is not found,
* eliminating silent failures and improving developer experience. Supports both app-level and
* component-level provision.
*
* Supports two modes:
* - **Static key**: `createContext('my-key')` - key is fixed at creation time
* - **Dynamic key**: `createContext()` or `createContext({ suffix: 'item' })` - key provided at runtime
*
* @example
* ```ts
* import { createContext } from '@vuetify/v0'
*
* const [useTheme, provideTheme] = createContext<{ dark: boolean }>('theme')
*
* provideTheme({ dark: true })
* const theme = useTheme()
* ```
*/
/**
* Injects a context provided by an ancestor component.
*
* @param key The key of the context to inject.
* @param defaultValue Optional default value if context is not found.
* @template Z The type of the context.
* @returns The injected context.
* @throws An error if the context is not found and no default is provided.
*
* @see https://vuejs.org/api/composition-api-dependency-injection.html#inject
* @see https://0.vuetifyjs.com/composables/foundation/create-context
*
* @example
* ```ts
* // Without default value
* const context = useContext<MyContext>('my-context')
*
* // With default value
* const context = useContext<MyContext>('my-context', defaultContext)
* ```
*/
function useContext$1(key, defaultValue) {
	const context = inject(key, defaultValue);
	if (/* @__PURE__ */ isUndefined$1(context)) throw new V0Error$1(`Context "${String(key)}" not found. Ensure it's provided by an ancestor.`, {
		code: "V0_CONTEXT_MISSING",
		key
	});
	return context;
}
/**
* Provides a context to all descendant components.
*
* @param key The key of the context to provide.
* @param context The context to provide.
* @param app Optional Vue app instance to provide the context at app level instead of component level.
* @template Z The type of the context.
* @returns The provided context.
*
* @remarks
* When `app` parameter is provided, the context is made available to all components in the app.
* When omitted, the context is provided at the current component level and available to descendants only.
*
* @see https://vuejs.org/api/composition-api-dependency-injection.html#provide
* @see https://0.vuetifyjs.com/composables/foundation/create-context
*
* @example
* ```ts
* // Component-level provision
* provideContext<MyContext>('my-context', context)
*
* // App-level provision (typically used in plugins)
* const app = createApp()
* provideContext<MyContext>('my-context', context, app)
* ```
*/
function provideContext$1(key, context, app) {
	if (app) app.provide(key, context);
	else provide(key, context);
	return context;
}
function createContext$1(keyOrOptions, defaultValue) {
	if (/* @__PURE__ */ isString$1(keyOrOptions) || /* @__PURE__ */ isSymbol$1(keyOrOptions)) {
		if (process.env.NODE_ENV !== "production" && /* @__PURE__ */ isString$1(keyOrOptions) && !keyOrOptions.includes(":")) console.warn(`[v0:context] String key "${keyOrOptions}" has no namespace separator. Use "namespace:key" format (e.g. "v0:theme") to prevent collisions.`);
		const _key = keyOrOptions;
		function _provideContext(context, app) {
			return provideContext$1(_key, context, app);
		}
		function _useContext() {
			return useContext$1(_key, defaultValue);
		}
		return [_useContext, _provideContext];
	}
	const suffix = /* @__PURE__ */ isObject$1(keyOrOptions) ? keyOrOptions.suffix : void 0;
	function _provideContext(key, context, app) {
		return provideContext$1(suffix ? `${key}:${suffix}` : key, context, app);
	}
	function _useContext(key, defaultValue) {
		return useContext$1(suffix ? `${key}:${suffix}` : key, defaultValue);
	}
	return [_useContext, _provideContext];
}
// examples/package-consumer/node_modules/@vuetify/v0/dist/composables/createTrinity/index.mjs
/**
* @module createTrinity
*
* @see https://0.vuetifyjs.com/composables/foundation/create-trinity
*
* @remarks
* Factory for creating the trinity pattern tuple used throughout the codebase.
*
* The trinity pattern returns a readonly tuple of [useContext, provideContext, defaultContext],
* enabling flexible dependency injection with sensible defaults. This pattern is fundamental
* to all registry-based composables.
*
* @example
* ```ts
* import { createTrinity } from '@vuetify/v0'
*
* const [useMyContext, provideMyContext, defaultContext] =
*   createTrinity('my-context', { foo: 'bar' })
* ```
*/
function createTrinity$1(keyOrUseContext, provideContextOrContext, maybeContext) {
	if (/* @__PURE__ */ isString$1(keyOrUseContext)) {
		const [useContext, provideContext] = createContext$1(keyOrUseContext);
		const context = provideContextOrContext;
		return [
			useContext,
			(_context = context, app) => provideContext(_context, app),
			context
		];
	}
	const provideContext = provideContextOrContext;
	const context = maybeContext;
	return [
		keyOrUseContext,
		(_context = context, app) => provideContext(_context, app),
		context
	];
}
// examples/package-consumer/node_modules/@vuetify/v0/dist/composables/createPlugin/index.mjs
/**
* @module createPlugin
*
* @see https://vuejs.org/guide/reusability/plugins.html
* @see https://0.vuetifyjs.com/composables/foundation/create-plugin
*
* @remarks
* Factory for creating Vue plugins with proper context provision.
*
* Wraps the provide function in app.runWithContext() to ensure proper execution context,
* allowing plugins to safely provide dependency injection contexts at the application level.
*
* Also exports `createPluginContext` — a higher-level factory that generates the standard
* context/plugin/consumer triple for plugin composables, eliminating boilerplate.
* Supports `persist()` / `restore()` lifecycle hooks for saving and rehydrating plugin state.
*
* In development, plugins that pass `devtools: true` appear under a single "v0"
* inspector in Vue DevTools. Default is off — opt in per plugin.
*
* @example
* ```ts
* import { createPlugin } from '@vuetify/v0'
*
* const plugin = createPlugin({
*   namespace: 'v0:my-plugin',
*   provide: app => app.provide('my-key', { greet: () => 'hello' }),
* })
* // app.use(plugin)
* ```
*/
var INSTALLED$1 = Symbol.for("v0:installed-plugins");
function getInstalled$1(app) {
	const ctx = app._context;
	return ctx[INSTALLED$1] ??= /* @__PURE__ */ new Map();
}
/**
* Attach a plugin context to the DevTools inspector record for `namespace`.
*
* `createPluginContext` calls this after provide. Plugins that wrap
* `createPlugin` directly (stack, date) must call it from `provide`.
*
* @param app The Vue app the plugin was installed on.
* @param namespace The plugin namespace, e.g. `'v0:stack'`.
* @param context The live plugin context to show in the inspector.
*
* @example
* ```ts
* return createPlugin({
*   namespace,
*   provide: app => {
*     provideStackContext(context, app)
*     bindPluginContext(app, namespace, context)
*   },
* })
* ```
*/
function bindPluginContext$1(app, namespace, context) {
	const record = getInstalled$1(app).get(namespace);
	if (record) record.context = context;
}
function notifyDevtools$1(app) {
	/* v8 ignore next -- __DEV__ is a build-time constant; production short-circuits */
	if (/* @__PURE__ */ isUndefined$1(process.env.NODE_ENV !== "production") || !(process.env.NODE_ENV !== "production") || !IN_BROWSER$3) return;
	import("./assets/devtools-Bqq8_8zz.js").then((mod) => mod.sync(app, getInstalled$1(app)));
}
/**
* Creates a new Vue plugin.
*
* @param options The plugin options.
* @returns A new Vue plugin.
*
* @see https://0.vuetifyjs.com/composables/foundation/create-plugin
*
* @example
* ```ts
* export const [useContext, provideContext] = createContext<MyContext>('my-plugin')
*
* const context = {}
*
* export const MyPlugin = createPlugin({
*   namespace: 'my-plugin',
*   provide: (app) => {
*     provideContext(context, app)
*   },
*   setup: (app) => {
*     // Optional setup logic
*   },
* })
*/
function createPlugin$1(options) {
	return { install(app) {
		app.runWithContext(() => {
			const installed = getInstalled$1(app);
			if (installed.has(options.namespace)) return;
			installed.set(options.namespace, {
				namespace: options.namespace,
				devtools: options.devtools === true,
				inspect: options.inspect
			});
			options.provide(app);
			options.setup?.(app);
			if (options.devtools) notifyDevtools$1(app);
		});
	} };
}
function deriveKey$1(namespace) {
	return namespace.startsWith("v0:") ? namespace.slice(3) : namespace;
}
function getPersistedStorage$1() {
	return useContext$1("v0:storage");
}
function createPluginContext$1(defaultNamespace, factory, config) {
	function createXContext(_options = {}) {
		const { namespace = defaultNamespace, persist: _persist, devtools: _devtools, ...options } = _options;
		return createTrinity$1(namespace, factory(options));
	}
	function createXPlugin(_options = {}) {
		const { namespace = defaultNamespace, persist: shouldPersist, devtools, ...options } = _options;
		const enabled = devtools ?? config?.devtools ?? false;
		const inspect = config?.inspect;
		let context;
		return createPlugin$1({
			namespace,
			devtools: enabled,
			inspect: inspect ? (context) => inspect(context) : void 0,
			provide: (app) => {
				const [, provide, ctx] = createXContext({
					...options,
					namespace
				});
				context = ctx;
				provide(context, app);
				bindPluginContext$1(app, namespace, context);
				if (shouldPersist && config?.restore) {
					const storage = getPersistedStorage$1();
					const key = deriveKey$1(namespace);
					const saved = storage.get(key);
					if (!/* @__PURE__ */ isNullOrUndefined$1(saved.value)) config.restore(context, saved.value);
				}
			},
			setup: config?.setup || shouldPersist ? (app) => {
				const ctx = context;
				config?.setup?.(ctx, app, options);
				if (shouldPersist && config?.persist) {
					const storage = getPersistedStorage$1();
					const key = deriveKey$1(namespace);
					const stored = storage.get(key);
					const stop = watch(() => config.persist(ctx), (val) => {
						stored.value = val;
					});
					app.onUnmount(stop);
				}
			} : void 0
		});
	}
	function useX(namespace = defaultNamespace) {
		if (config?.fallback) {
			if (!hasInjectionContext()) return config.fallback(namespace);
			const provided = inject(namespace, void 0);
			if (!/* @__PURE__ */ isUndefined$1(provided)) return provided;
			return config.fallback(namespace);
		}
		return useContext$1(namespace);
	}
	return [
		createXContext,
		createXPlugin,
		useX
	];
}
// examples/package-consumer/node_modules/@vuetify/v0/dist/composables/toElement/index.mjs
/**
* @module toElement
*
* @see https://0.vuetifyjs.com/composables/transformers/to-element
*
* @remarks
* Resolves various element reference types to a DOM Element.
*
* Accepts refs, getters, raw DOM elements, or Vue component instances
* and normalizes them to a plain Element. Uses structural typing to
* avoid cross-version Vue Ref incompatibilities.
*
* @example
* ```ts
* import { shallowRef } from 'vue'
* import { toElement } from '@vuetify/v0'
*
* const el = shallowRef<HTMLElement | null>(null)
* const resolved = toElement(el) // HTMLElement | undefined
* ```
*/
/**
* Resolves a {@link MaybeElementRef} to a DOM Element or undefined.
*
* Handles:
* - `Ref<Element>`, `ShallowRef<HTMLElement>`, getter functions
* - Vue component instances (extracts `$el`)
* - Raw DOM elements (pass-through)
* - null/undefined (returns undefined)
*
* @param target The element ref, getter, or raw value to resolve
* @returns The resolved DOM Element, or undefined if not available
*
* @see https://0.vuetifyjs.com/composables/transformers/to-element
*
* @example
* ```ts
* import { toElement } from '@vuetify/v0'
*
* const el = shallowRef<HTMLElement | null>(null)
* toElement(el) // HTMLElement | undefined
*
* const component = ref<ComponentPublicInstance>()
* toElement(component) // Element | undefined (from $el)
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function toElement$1(target) {
	if (!target) return void 0;
	if (/* @__PURE__ */ isElement$1(target)) return target;
	const raw = /* @__PURE__ */ isFunction$1(target) ? target() : /* @__PURE__ */ isObject$1(target) && "value" in target ? target.value : target;
	if (!raw) return void 0;
	if (/* @__PURE__ */ isElement$1(raw)) return raw;
	if (/* @__PURE__ */ isObject$1(raw) && "$el" in raw) return raw.$el;
}
// examples/package-consumer/node_modules/@vuetify/v0/dist/composables/useHydration/index.mjs
/**
* @module useHydration
*
* @see https://0.vuetifyjs.com/composables/plugins/use-hydration
*
* @remarks
* SSR hydration state management composable.
*
* Key features:
* - Hydration state detection (browser vs SSR)
* - Root component detection
* - Readonly hydration state refs
* - Plugin installation support
* - Perfect for hydration-safe rendering
*
* Essential for composables that need to behave differently during SSR vs client-side.
*
* @example
* ```ts
* import { useHydration } from '@vuetify/v0'
*
* const { isHydrated } = useHydration()
* if (isHydrated.value) {
*   // safe for client-only logic
* }
* ```
*/
/**
* Creates a new hydration instance.
*
* @returns A new hydration instance.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-hydration
*
* @example
* ```ts
* import { createHydration } from '@vuetify/v0'
*
* const hydration = createHydration()
* console.log(hydration.isHydrated.value) // false
* hydration.hydrate()
* console.log(hydration.isHydrated.value) // true
* ```
*/
function createHydration$1() {
	const isHydrated = shallowRef(false);
	const isSettled = shallowRef(false);
	function hydrate() {
		isHydrated.value = true;
	}
	function settle() {
		isSettled.value = true;
	}
	return {
		isHydrated: shallowReadonly(isHydrated),
		isSettled: shallowReadonly(isSettled),
		hydrate,
		settle
	};
}
function createFallbackHydration$1() {
	return {
		isHydrated: shallowReadonly(shallowRef(true)),
		isSettled: shallowReadonly(shallowRef(true)),
		hydrate: () => {},
		settle: () => {}
	};
}
/**
* Creates a new hydration context trinity.
*
* @param options Options for creating the hydration context.
* @template E The type of the hydration context.
* @returns A new hydration context trinity.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-hydration
*
* @example
* ```ts
* import { createHydrationContext } from '@vuetify/v0'
*
* export const [useHydrationContext, provideHydrationContext, context] = createHydrationContext({
*   namespace: 'app:hydration',
* })
* ```
*/
var [createHydrationContext$1, createHydrationPlugin$1, useHydration$2] = /* @__PURE__ */ createPluginContext$1("v0:hydration", () => createHydration$1(), {
	fallback: () => createFallbackHydration$1(),
	setup: (context, app) => {
		const { mount } = app;
		app.mount = (...args) => {
			const vm = mount(...args);
			nextTick$1().then(() => {
				context.hydrate();
				nextTick$1().then(() => context.settle());
			});
			app.mount = mount;
			return vm;
		};
	}
});
// examples/package-consumer/node_modules/@vuetify/v0/dist/composables/createObserver/index.mjs
/**
* @module createObserver
*
* @remarks
* Internal factory for browser Observer API composables. Encapsulates the
* shared lifecycle, hydration, pause/resume/stop, and target-watch logic
* used by useResizeObserver, useIntersectionObserver, and useMutationObserver.
*
* The `observer` ref uses a three-state sentinel:
* - `undefined` — not yet created
* - `null` — permanently stopped (`stop()` was called; `setup()` is a no-op)
* - instance — active observer
*
* @example
* ```ts
* import { createObserver } from '#v0/composables/createObserver'
*
* const observer = createObserver(target, entries => {
*   console.log(entries)
* }, {
*   supports: true,
*   create: cb => new ResizeObserver(cb),
*   observe: (o, el) => o.observe(el),
* })
* ```
*/
function createObserver$1(target, userCallback, config) {
	const { isHydrated } = useHydration$2();
	const resolved = toRef(() => /* @__PURE__ */ toElement$1(target));
	const observer = shallowRef(void 0);
	const isPaused = shallowRef(false);
	const isActive = toRef(() => !!observer.value && !isPaused.value);
	function invoke(entries) {
		config.onEntry?.(entries);
		userCallback(entries);
		if (config.once) {
			if (config.shouldStop ? config.shouldStop(entries) : true) stop();
		}
	}
	function setup() {
		if (/* @__PURE__ */ isNull$1(observer.value)) return;
		const el = resolved.value;
		if (!isHydrated.value || !config.supports || !/* @__PURE__ */ isElement$1(el) || isPaused.value) return;
		observer.value = config.create(invoke);
		config.observe(observer.value, el);
		if (config.immediate) {
			const entries = config.immediate(el);
			if (config.onceIncludesImmediate) invoke(entries);
			else {
				config.onEntry?.(entries);
				userCallback(entries);
			}
		}
	}
	watch(resolved, (el, oldEl) => {
		if (oldEl || observer.value) cleanup();
		if (isHydrated.value && /* @__PURE__ */ isElement$1(el)) setup();
	}, { immediate: true });
	let stopHydrationWatch;
	if (!isHydrated.value) stopHydrationWatch = watch(() => isHydrated.value, (hydrated) => {
		if (hydrated && /* @__PURE__ */ isElement$1(resolved.value) && !observer.value) {
			setup();
			stopHydrationWatch?.();
			stopHydrationWatch = void 0;
		}
	});
	function cleanup() {
		if (observer.value) {
			observer.value.disconnect();
			observer.value = void 0;
		}
	}
	function pause() {
		isPaused.value = true;
		config.onPause?.();
		observer.value?.disconnect();
	}
	function resume() {
		isPaused.value = false;
		setup();
	}
	function stop() {
		stopHydrationWatch?.();
		stopHydrationWatch = void 0;
		cleanup();
		observer.value = null;
	}
	onScopeDispose(stop, true);
	return {
		isActive: shallowReadonly(isActive),
		isPaused: shallowReadonly(isPaused),
		pause,
		resume,
		stop
	};
}
// examples/package-consumer/node_modules/@vuetify/v0/dist/composables/useResizeObserver/index.mjs
/**
* @module useResizeObserver
*
* @see https://0.vuetifyjs.com/composables/system/use-resize-observer
*
* @remarks
* ResizeObserver composable with lifecycle management.
*
* Key features:
* - ResizeObserver API wrapper
* - `isActive` reactive flag
* - `once` option for single-fire observation
* - Pause/resume/stop functionality
* - Automatic cleanup on unmount
* - SSR-safe (checks SUPPORTS_OBSERVER)
* - Hydration-aware
* - Box model options (content-box/border-box)
* - Reports `borderBoxSize` and `contentBoxSize` alongside `contentRect`
*
* Perfect for responsive components and size-based rendering.
*
* @example
* ```ts
* import { useTemplateRef } from 'vue'
* import { useResizeObserver } from '@vuetify/v0'
*
* const target = useTemplateRef('target')
* useResizeObserver(target, entries => {
*   console.log(entries[0].contentRect.width)
* })
* ```
*/
/**
* Synthesize the entry the observer would report for `el`, for the `immediate`
* callback that fires before the observer's own first delivery.
*
* Every measurement comes from `getComputedStyle` rather than
* `getBoundingClientRect` because resolved lengths are layout values — like the
* observer, and unlike a client rect, they are not scaled by CSS transforms.
* `contentRect` mirrors the native entry: width/height are the content box and
* top/left are the padding offsets, so the immediate entry matches what the
* observer reports next. The client rect only remains as the fallback when a
* resolved length is not numeric (e.g. a detached element).
*
* Every read is written to tolerate a partial style declaration: an element
* with no layout box resolves its lengths to `''`, and this runs on whatever
* `getComputedStyle` returns.
*/
/* #__NO_SIDE_EFFECTS__ */
function measure$1(el) {
	const rect = el.getBoundingClientRect();
	const style = getComputedStyle(el);
	const padding = {
		top: /* @__PURE__ */ pxToNumber$1(style.paddingTop),
		left: /* @__PURE__ */ pxToNumber$1(style.paddingLeft),
		right: /* @__PURE__ */ pxToNumber$1(style.paddingRight),
		bottom: /* @__PURE__ */ pxToNumber$1(style.paddingBottom)
	};
	const paddingX = padding.left + padding.right;
	const paddingY = padding.top + padding.bottom;
	const borderX = /* @__PURE__ */ pxToNumber$1(style.borderLeftWidth) + /* @__PURE__ */ pxToNumber$1(style.borderRightWidth);
	const borderY = /* @__PURE__ */ pxToNumber$1(style.borderTopWidth) + /* @__PURE__ */ pxToNumber$1(style.borderBottomWidth);
	const outer = style.boxSizing === "border-box";
	const resolvedX = /* @__PURE__ */ pxToNumber$1(style.width, rect.width);
	const resolvedY = /* @__PURE__ */ pxToNumber$1(style.height, rect.height);
	const width = {
		border: outer ? resolvedX : resolvedX + paddingX + borderX,
		content: Math.max(0, outer ? resolvedX - paddingX - borderX : resolvedX)
	};
	const height = {
		border: outer ? resolvedY : resolvedY + paddingY + borderY,
		content: Math.max(0, outer ? resolvedY - paddingY - borderY : resolvedY)
	};
	const vertical = /* @__PURE__ */ isString$1(style.writingMode) && style.writingMode.startsWith("vertical");
	const inline = vertical ? height : width;
	const block = vertical ? width : height;
	return {
		contentRect: {
			width: width.content,
			height: height.content,
			top: padding.top,
			left: padding.left
		},
		borderBoxSize: [{
			inlineSize: inline.border,
			blockSize: block.border
		}],
		contentBoxSize: [{
			inlineSize: inline.content,
			blockSize: block.content
		}],
		target: el
	};
}
/**
* A composable that uses the Resize Observer API to detect when an element's
* size changes.
*
* @param target The element to observe.
* @param callback The callback to execute when the element's size changes.
* @param options The options for the Resize Observer.
* @returns An object with methods to control the observer.
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
* @see https://0.vuetifyjs.com/composables/system/use-resize-observer
*
* @example
* ```ts
* import { ref } from 'vue'
* import { useResizeObserver } from '@vuetify/v0'
*
* const el = ref<HTMLElement>()
* const width = ref(0)
* const height = ref(0)
*
* const { pause, resume, isPaused } = useResizeObserver(
*   el,
*   (entries) => {
*     const entry = entries[0]
*     if (entry) {
*       width.value = entry.contentRect.width
*       height.value = entry.contentRect.height
*       console.log('Size changed:', width.value, 'x', height.value)
*     }
*   },
*   { immediate: true }
* )
*
* // Pause observation
* pause()
*
* // Resume observation
* resume()
* ```
*
* @example
* Measuring the border box — padding and borders included:
*
* ```ts
* useResizeObserver(el, ([entry]) => {
*   height.value = entry.borderBoxSize[0].blockSize
* }, { box: 'border-box' })
* ```
*/
function useResizeObserver$1(target, callback, options = {}) {
	return createObserver$1(target, callback, {
		supports: SUPPORTS_OBSERVER$1,
		once: options.once,
		create: (cb) => new ResizeObserver((entries) => {
			cb(entries.map((e) => {
				const sizes = e.borderBoxSize && e.contentBoxSize ? e : /* @__PURE__ */ measure$1(e.target);
				return {
					contentRect: {
						width: e.contentRect.width,
						height: e.contentRect.height,
						top: e.contentRect.top,
						left: e.contentRect.left
					},
					borderBoxSize: sizes.borderBoxSize,
					contentBoxSize: sizes.contentBoxSize,
					target: e.target
				};
			}));
		}),
		observe: (obs, el) => obs.observe(el, { box: options.box ?? "content-box" }),
		immediate: options.immediate ? (el) => [/* @__PURE__ */ measure$1(el)] : void 0
	});
}
// examples/package-consumer/node_modules/@vuetify/v0/dist/composables/useIntersectionObserver/index.mjs
/**
* @module useIntersectionObserver
*
* @see https://0.vuetifyjs.com/composables/system/use-intersection-observer
*
* @remarks
* IntersectionObserver composable with lifecycle management.
*
* Key features:
* - IntersectionObserver API wrapper
* - `isActive` reactive flag
* - `once` option for single-fire observation
* - Pause/resume/stop functionality
* - Automatic cleanup on unmount
* - SSR-safe (checks SUPPORTS_INTERSECTION_OBSERVER)
* - Hydration-aware
* - Immediate callback option
*
* Perfect for lazy loading, infinite scroll, and visibility detection.
*
* @example
* ```ts
* import { useTemplateRef } from 'vue'
* import { useIntersectionObserver } from '@vuetify/v0'
*
* const target = useTemplateRef('target')
* useIntersectionObserver(target, entries => {
*   console.log(entries[0].isIntersecting)
* })
* ```
*/
/**
* A composable that uses the Intersection Observer API to detect when an element
* is visible in the viewport.
*
* @param target The element to observe.
* @param callback The callback to execute when the element's intersection changes.
* @param options The options for the Intersection Observer.
* @returns An object with methods to control the observer.
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
* @see https://0.vuetifyjs.com/composables/system/use-intersection-observer
*
* @example
* ```ts
* import { ref } from 'vue'
* import { useIntersectionObserver } from '@vuetify/v0'
*
* const target = ref<HTMLElement>()
* const isVisible = ref(false)
*
* const { isIntersecting, pause, resume } = useIntersectionObserver(
*   target,
*   (entries) => {
*     const entry = entries[0]
*     if (entry) {
*       isVisible.value = entry.isIntersecting
*       console.log('Element is visible:', entry.isIntersecting)
*     }
*   },
*   { threshold: 0.5 }
* )
*
* // Pause observation
* pause()
*
* // Resume observation
* resume()
* ```
*/
function useIntersectionObserver$1(target, callback, options = {}) {
	const isIntersecting = shallowRef(false);
	return {
		...createObserver$1(target, callback, {
			supports: SUPPORTS_INTERSECTION_OBSERVER$1,
			once: options.once,
			create: (cb) => new IntersectionObserver((entries) => {
				cb(entries.map((e) => ({
					boundingClientRect: e.boundingClientRect,
					intersectionRatio: e.intersectionRatio,
					intersectionRect: e.intersectionRect,
					isIntersecting: e.isIntersecting,
					rootBounds: e.rootBounds,
					target: e.target,
					time: e.time
				})));
			}, {
				root: options.root ?? null,
				rootMargin: options.rootMargin ?? "0px",
				threshold: options.threshold ?? 0
			}),
			observe: (obs, el) => obs.observe(el),
			onEntry: (entries) => {
				const latest = entries.at(-1);
				/* v8 ignore next -- defensive: IntersectionObserver always emits at least one entry */
				if (latest) isIntersecting.value = latest.isIntersecting;
			},
			onPause: () => {
				isIntersecting.value = false;
			},
			/* v8 ignore next -- defensive nullish coalesce: entries always populated when shouldStop fires */
			shouldStop: (entries) => entries.at(-1)?.isIntersecting ?? false,
			immediate: options.immediate ? (el) => {
				return [{
					boundingClientRect: el.getBoundingClientRect(),
					intersectionRatio: 0,
					intersectionRect: new DOMRect(0, 0, 0, 0),
					isIntersecting: false,
					rootBounds: null,
					target: el,
					time: performance.now()
				}];
			} : void 0
		}),
		isIntersecting: shallowReadonly(isIntersecting)
	};
}
/**
* A convenience composable that uses the Intersection Observer API to detect
* when an element is visible in the viewport.
*
* @param target The element to observe.
* @param options The options for the Intersection Observer.
* @returns An object with the intersection state.
*
* @see https://0.vuetifyjs.com/composables/system/use-intersection-observer
*
* @example
* ```ts
* import { ref } from 'vue'
* import { useElementIntersection } from '@vuetify/v0'
*
* const myElement = ref<HTMLElement>()
* const { isIntersecting, intersectionRatio } = useElementIntersection(myElement, {
*   threshold: 0.5
* })
*
* // Use in template to conditionally render or animate
* watchEffect(() => {
*   if (isIntersecting.value) {
*     console.log('Element is visible!', intersectionRatio.value)
*   }
* })
* ```
*/
function useElementIntersection$1(target, options = {}) {
	const isIntersecting = shallowRef(false);
	const intersectionRatio = shallowRef(0);
	const { pause: _pause, resume, stop, isActive, isPaused } = useIntersectionObserver$1(target, (entries) => {
		const entry = entries.at(-1);
		/* v8 ignore next 4 -- defensive: IntersectionObserver always emits at least one entry */
		if (entry) {
			isIntersecting.value = entry.isIntersecting;
			intersectionRatio.value = entry.intersectionRatio;
		}
	}, {
		immediate: true,
		...options
	});
	function pause() {
		isIntersecting.value = false;
		intersectionRatio.value = 0;
		_pause();
	}
	return {
		isIntersecting: shallowReadonly(isIntersecting),
		intersectionRatio: shallowReadonly(intersectionRatio),
		isActive,
		isPaused,
		pause,
		resume,
		stop
	};
}
// examples/package-consumer/node_modules/vuetify/lib/util/globals.js
var IN_BROWSER$2 = typeof window !== "undefined";
var SUPPORTS_INTERSECTION$1 = IN_BROWSER$2 && "IntersectionObserver" in window;
IN_BROWSER$2 && ("ontouchstart" in window || window.navigator.maxTouchPoints);
IN_BROWSER$2 && "EyeDropper" in window;
var SUPPORTS_MATCH_MEDIA$2 = IN_BROWSER$2 && "matchMedia" in window && /* @__PURE__ */ isFunction$1(window.matchMedia);
var PREFERS_REDUCED_MOTION$1 = () => SUPPORTS_MATCH_MEDIA$2 && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
IN_BROWSER$2 && CSS?.supports?.("-webkit-backdrop-filter", "none");
IN_BROWSER$2 && CSS?.supports?.("field-sizing", "content");
// examples/package-consumer/node_modules/vuetify/lib/util/helpers.js
function convertToUnit$1(str, unit = "px") {
	if (/* @__PURE__ */ isNullOrUndefined$1(str) || str === "") return;
	const num = Number(str);
	if (isNaN(num)) return String(str);
	else if (!isFinite(num)) return;
	else return `${num}${unit}`;
}
function isPlainObject$2(obj) {
	let proto;
	return !!obj && typeof obj === "object" && ((proto = Object.getPrototypeOf(obj)) === Object.prototype || !proto);
}
Object.freeze({
	enter: 13,
	tab: 9,
	delete: 46,
	esc: 27,
	space: 32,
	up: 38,
	down: 40,
	left: 37,
	right: 39,
	end: 35,
	home: 36,
	del: 46,
	backspace: 8,
	insert: 45,
	pageup: 33,
	pagedown: 34,
	shift: 16
});
Object.freeze({
	enter: "Enter",
	tab: "Tab",
	delete: "Delete",
	esc: "Escape",
	space: "Space",
	up: "ArrowUp",
	down: "ArrowDown",
	left: "ArrowLeft",
	right: "ArrowRight",
	end: "End",
	home: "Home",
	del: "Delete",
	backspace: "Backspace",
	insert: "Insert",
	pageup: "PageUp",
	pagedown: "PageDown",
	shift: "Shift"
});
function keys$1(o) {
	return Object.keys(o);
}
function has$1(obj, key) {
	return key.every((k) => obj.hasOwnProperty(k));
}
function pick$1(obj, paths) {
	const found = {};
	for (const key of paths) if (Object.prototype.hasOwnProperty.call(obj, key)) found[key] = obj[key];
	return found;
}
function pickWithRest$1(obj, paths, exclude) {
	const found = Object.create(null);
	const rest = Object.create(null);
	for (const key in obj) if (paths.some((path) => path instanceof RegExp ? path.test(key) : path === key) && !exclude?.some((path) => path === key)) found[key] = obj[key];
	else rest[key] = obj[key];
	return [found, rest];
}
function omit$1(obj, exclude) {
	const clone = { ...obj };
	exclude.forEach((prop) => delete clone[prop]);
	return clone;
}
var onRE$1 = /^on[^a-z]/;
var bubblingEvents$1 = [
	"onAfterscriptexecute",
	"onAnimationcancel",
	"onAnimationend",
	"onAnimationiteration",
	"onAnimationstart",
	"onAuxclick",
	"onBeforeinput",
	"onBeforescriptexecute",
	"onChange",
	"onClick",
	"onCompositionend",
	"onCompositionstart",
	"onCompositionupdate",
	"onContextmenu",
	"onCopy",
	"onCut",
	"onDblclick",
	"onFocusin",
	"onFocusout",
	"onFullscreenchange",
	"onFullscreenerror",
	"onGesturechange",
	"onGestureend",
	"onGesturestart",
	"onGotpointercapture",
	"onInput",
	"onKeydown",
	"onKeypress",
	"onKeyup",
	"onLostpointercapture",
	"onMousedown",
	"onMousemove",
	"onMouseout",
	"onMouseover",
	"onMouseup",
	"onMousewheel",
	"onPaste",
	"onPointercancel",
	"onPointerdown",
	"onPointerenter",
	"onPointerleave",
	"onPointermove",
	"onPointerout",
	"onPointerover",
	"onPointerup",
	"onReset",
	"onSelect",
	"onSubmit",
	"onTouchcancel",
	"onTouchend",
	"onTouchmove",
	"onTouchstart",
	"onTransitioncancel",
	"onTransitionend",
	"onTransitionrun",
	"onTransitionstart",
	"onWheel"
];
/**
* Filter attributes that should be applied to
* the root element of an input component. Remaining
* attributes should be passed to the <input> element inside.
*/
function filterInputAttrs$1(attrs) {
	const [events, props] = pickWithRest$1(attrs, [onRE$1]);
	const inputEvents = omit$1(events, bubblingEvents$1);
	const [rootAttrs, inputAttrs] = pickWithRest$1(props, [
		"class",
		"style",
		"id",
		"inert",
		/^data-/
	]);
	Object.assign(rootAttrs, events);
	Object.assign(inputAttrs, inputEvents);
	return [rootAttrs, inputAttrs];
}
function wrapInArray$1(v) {
	return /* @__PURE__ */ isNullOrUndefined$1(v) ? [] : Array.isArray(v) ? v : [v];
}
function clamp$2(value, min = 0, max = 1) {
	return Math.max(min, Math.min(max, value));
}
function padEnd$1(str, length, char = "0") {
	return str + char.repeat(Math.max(0, length - str.length));
}
function chunk$1(str, size = 1) {
	const chunked = [];
	let index = 0;
	while (index < str.length) {
		chunked.push(str.substr(index, size));
		index += size;
	}
	return chunked;
}
function mergeDeep$2(source = {}, target = {}, arrayFn, targetCondition) {
	const out = {};
	for (const key in source) out[key] = source[key];
	for (const key in target) {
		const targetProperty = target[key];
		if (targetCondition && !targetCondition(key, targetProperty)) continue;
		const sourceProperty = source[key];
		if (isPlainObject$2(sourceProperty) && isPlainObject$2(targetProperty)) {
			out[key] = mergeDeep$2(sourceProperty, targetProperty, arrayFn, targetCondition);
			continue;
		}
		if (arrayFn && Array.isArray(sourceProperty) && Array.isArray(targetProperty)) {
			out[key] = arrayFn(sourceProperty, targetProperty);
			continue;
		}
		out[key] = targetProperty;
	}
	return out;
}
function flattenFragments$1(nodes) {
	return nodes.map((node) => {
		if (node.type === Fragment) return flattenFragments$1(node.children);
		else return node;
	}).flat();
}
function toKebabCase$1(str = "") {
	if (toKebabCase$1.cache.has(str)) return toKebabCase$1.cache.get(str);
	const kebab = str.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
	toKebabCase$1.cache.set(str, kebab);
	return kebab;
}
toKebabCase$1.cache = /* @__PURE__ */ new Map();
/**
* Convert a computed ref to a record of refs.
* The getter function must always return an object with the same keys.
*/
function destructComputed$1(getter) {
	const base = computed(getter);
	const obj = {};
	for (const key in base.value) obj[key] = toRef(() => base.value[key]);
	return obj;
}
/** Array.includes but value can be any type */
function includes$1(arr, val) {
	return arr.includes(val);
}
var EventProp$1 = () => [Function, Array];
function callEvent$1(handler, ...args) {
	if (Array.isArray(handler)) for (const h of handler) h(...args);
	else if (/* @__PURE__ */ isFunction$1(handler)) handler(...args);
}
function getActiveElement$1() {
	let active = document.activeElement;
	while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
	return active;
}
function onlyDefinedProps$1(props) {
	const booleanAttributes = ["checked", "disabled"];
	return Object.fromEntries(Object.entries(props).filter(([key, v]) => booleanAttributes.includes(key) ? !!v : !/* @__PURE__ */ isUndefined$1(v)));
}
// examples/package-consumer/node_modules/vuetify/lib/util/anchor.js
var block$1 = ["top", "bottom"];
var inline$1 = [
	"start",
	"end",
	"left",
	"right"
];
/** Parse a raw anchor string into an object */
function parseAnchor$1(anchor, isRtl) {
	let [side, align] = anchor.split(" ");
	if (!align) align = includes$1(block$1, side) ? "start" : includes$1(inline$1, side) ? "top" : "center";
	return {
		side: toPhysical$1(side, isRtl),
		align: toPhysical$1(align, isRtl)
	};
}
function toPhysical$1(str, isRtl) {
	if (str === "start") return isRtl ? "right" : "left";
	if (str === "end") return isRtl ? "left" : "right";
	return str;
}
// examples/package-consumer/node_modules/vuetify/lib/util/box.js
var Box$1 = class {
	constructor(args) {
		if (/* @__PURE__ */ isElement$1(args)) {
			const pageScale = document.body.currentCSSZoom ?? 1;
			const factor = 1 + (1 - pageScale) / pageScale;
			const { x, y, width, height } = args.getBoundingClientRect();
			this.x = x * factor;
			this.y = y * factor;
			this.width = width * factor;
			this.height = height * factor;
		} else {
			this.x = args.x;
			this.y = args.y;
			this.width = args.width;
			this.height = args.height;
		}
	}
	get top() {
		return this.y;
	}
	get bottom() {
		return this.y + this.height;
	}
	get left() {
		return this.x;
	}
	get right() {
		return this.x + this.width;
	}
};
// examples/package-consumer/node_modules/vuetify/lib/util/animation.js
/** @see https://stackoverflow.com/a/57876601/2074736 */
function nullifyTransforms$1(el) {
	const rect = new Box$1(el);
	const style = getComputedStyle(el);
	const tx = style.transform;
	if (tx) {
		let ta, sx, sy, dx, dy;
		if (tx.startsWith("matrix3d(")) {
			ta = tx.slice(9, -1).split(/, /);
			sx = Number(ta[0]);
			sy = Number(ta[5]);
			dx = Number(ta[12]);
			dy = Number(ta[13]);
		} else if (tx.startsWith("matrix(")) {
			ta = tx.slice(7, -1).split(/, /);
			sx = Number(ta[0]);
			sy = Number(ta[3]);
			dx = Number(ta[4]);
			dy = Number(ta[5]);
		} else return new Box$1(rect);
		const to = style.transformOrigin;
		return new Box$1({
			x: rect.x - dx - (1 - sx) * parseFloat(to),
			y: rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(" ") + 1)),
			width: sx ? rect.width / sx : el.offsetWidth + 1,
			height: sy ? rect.height / sy : el.offsetHeight + 1
		});
	} else return new Box$1(rect);
}
function animate$1(el, keyframes, options) {
	if (typeof el.animate === "undefined") return { finished: Promise.resolve() };
	let animation;
	try {
		animation = el.animate(keyframes, options);
	} catch (err) {
		return { finished: Promise.resolve() };
	}
	if (typeof animation.finished === "undefined") animation.finished = new Promise((resolve) => {
		animation.onfinish = () => {
			resolve(animation);
		};
	});
	return animation;
}
// examples/package-consumer/node_modules/vuetify/lib/util/color/APCA.js
/**
* WCAG 3.0 APCA perceptual contrast algorithm from https://github.com/Myndex/SAPC-APCA
* @licence https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @see https://www.w3.org/WAI/GL/task-forces/silver/wiki/Visual_Contrast_of_Text_Subgroup
*/
var mainTRC$1 = 2.4;
var Rco$1 = .2126729;
var Gco$1 = .7151522;
var Bco$1 = .072175;
var normBG$1 = .55;
var normTXT$1 = .58;
var revTXT$1 = .57;
var revBG$1 = .62;
var blkThrs$1 = .03;
var blkClmp$1 = 1.45;
var deltaYmin$1 = 5e-4;
var scaleBoW$1 = 1.25;
var scaleWoB$1 = 1.25;
var loConThresh$1 = .078;
var loConFactor$1 = 12.82051282051282;
var loConOffset$1 = .06;
var loClip$1 = .001;
function APCAcontrast$1(text, background) {
	const Rtxt = (text.r / 255) ** mainTRC$1;
	const Gtxt = (text.g / 255) ** mainTRC$1;
	const Btxt = (text.b / 255) ** mainTRC$1;
	const Rbg = (background.r / 255) ** mainTRC$1;
	const Gbg = (background.g / 255) ** mainTRC$1;
	const Bbg = (background.b / 255) ** mainTRC$1;
	let Ytxt = Rtxt * Rco$1 + Gtxt * Gco$1 + Btxt * Bco$1;
	let Ybg = Rbg * Rco$1 + Gbg * Gco$1 + Bbg * Bco$1;
	if (Ytxt <= blkThrs$1) Ytxt += (blkThrs$1 - Ytxt) ** blkClmp$1;
	if (Ybg <= blkThrs$1) Ybg += (blkThrs$1 - Ybg) ** blkClmp$1;
	if (Math.abs(Ybg - Ytxt) < deltaYmin$1) return 0;
	let outputContrast;
	if (Ybg > Ytxt) {
		const SAPC = (Ybg ** normBG$1 - Ytxt ** normTXT$1) * scaleBoW$1;
		outputContrast = SAPC < loClip$1 ? 0 : SAPC < loConThresh$1 ? SAPC - SAPC * loConFactor$1 * loConOffset$1 : SAPC - loConOffset$1;
	} else {
		const SAPC = (Ybg ** revBG$1 - Ytxt ** revTXT$1) * scaleWoB$1;
		outputContrast = SAPC > -.001 ? 0 : SAPC > -.078 ? SAPC - SAPC * loConFactor$1 * loConOffset$1 : SAPC + loConOffset$1;
	}
	return outputContrast * 100;
}
// examples/package-consumer/node_modules/vuetify/lib/util/colorUtils.js
function isCssColor$1(color) {
	return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
}
function isParsableColor$1(color) {
	return isCssColor$1(color) && !/^((rgb|hsl)a?\()?var\(--/.test(color);
}
var cssColorRe$1 = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/;
var mappers$1 = {
	rgb: (r, g, b, a) => ({
		r,
		g,
		b,
		a
	}),
	rgba: (r, g, b, a) => ({
		r,
		g,
		b,
		a
	}),
	hsl: (h, s, l, a) => HSLtoRGB$1({
		h,
		s,
		l,
		a
	}),
	hsla: (h, s, l, a) => HSLtoRGB$1({
		h,
		s,
		l,
		a
	}),
	hsv: (h, s, v, a) => HSVtoRGB$1({
		h,
		s,
		v,
		a
	}),
	hsva: (h, s, v, a) => HSVtoRGB$1({
		h,
		s,
		v,
		a
	})
};
function parseColor$1(color) {
	if (/* @__PURE__ */ isNumber$1(color)) {
		if (isNaN(color) || color < 0 || color > 16777215) consoleWarn$1(`'${color}' is not a valid hex color`);
		return {
			r: (color & 16711680) >> 16,
			g: (color & 65280) >> 8,
			b: color & 255
		};
	} else if (/* @__PURE__ */ isString$1(color) && cssColorRe$1.test(color)) {
		const { groups } = color.match(cssColorRe$1);
		const { fn, values } = groups;
		const realValues = values.split(/,\s*|\s*\/\s*|\s+/).map((v, i) => {
			if (v.endsWith("%") || i > 0 && i < 3 && [
				"hsl",
				"hsla",
				"hsv",
				"hsva"
			].includes(fn)) return parseFloat(v) / 100;
			else return parseFloat(v);
		});
		return mappers$1[fn](...realValues);
	} else if (/* @__PURE__ */ isString$1(color)) {
		let hex = color.startsWith("#") ? color.slice(1) : color;
		if ([3, 4].includes(hex.length)) hex = hex.split("").map((char) => char + char).join("");
		else if (![6, 8].includes(hex.length)) consoleWarn$1(`'${color}' is not a valid hex(a) color`);
		const int = parseInt(hex, 16);
		if (isNaN(int) || int < 0 || int > 4294967295) consoleWarn$1(`'${color}' is not a valid hex(a) color`);
		return HexToRGB$1(hex);
	} else if (/* @__PURE__ */ isObject$1(color)) {
		if (has$1(color, [
			"r",
			"g",
			"b"
		])) return color;
		else if (has$1(color, [
			"h",
			"s",
			"l"
		])) return HSVtoRGB$1(HSLtoHSV$1(color));
		else if (has$1(color, [
			"h",
			"s",
			"v"
		])) return HSVtoRGB$1(color);
	}
	throw new TypeError(`Invalid color: ${/* @__PURE__ */ isNullOrUndefined$1(color) ? color : String(color) || color.constructor.name}\nExpected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
/** Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV */
function HSVtoRGB$1(hsva) {
	const { h, s, v, a } = hsva;
	const f = (n) => {
		const k = (n + h / 60) % 6;
		return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
	};
	const rgb = [
		f(5),
		f(3),
		f(1)
	].map((v) => Math.round(v * 255));
	return {
		r: rgb[0],
		g: rgb[1],
		b: rgb[2],
		a
	};
}
function HSLtoRGB$1(hsla) {
	return HSVtoRGB$1(HSLtoHSV$1(hsla));
}
function HSLtoHSV$1(hsl) {
	const { h, s, l, a } = hsl;
	const v = l + s * Math.min(l, 1 - l);
	return {
		h,
		s: v === 0 ? 0 : 2 - 2 * l / v,
		v,
		a
	};
}
function HexToRGB$1(hex) {
	hex = parseHex$1(hex);
	let [r, g, b, a] = chunk$1(hex, 2).map((c) => parseInt(c, 16));
	a = /* @__PURE__ */ isNumber$1(a) ? a / 255 : a;
	return {
		r,
		g,
		b,
		a
	};
}
function parseHex$1(hex) {
	if (hex.startsWith("#")) hex = hex.slice(1);
	hex = hex.replace(/([^0-9a-f])/gi, "F");
	if (hex.length === 3 || hex.length === 4) hex = hex.split("").map((x) => x + x).join("");
	if (hex.length !== 6) hex = padEnd$1(padEnd$1(hex, 6), 8, "F");
	return hex;
}
function hasLightForeground$1(color) {
	const blackContrast = Math.abs(APCAcontrast$1(parseColor$1(0), parseColor$1(color)));
	return Math.abs(APCAcontrast$1(parseColor$1(16777215), parseColor$1(color))) > Math.min(blackContrast, 50);
}
// examples/package-consumer/node_modules/vuetify/lib/util/propsFactory.js
/**
* Creates a factory function for props definitions.
* This is used to define props in a composable then override
* default values in an implementing component.
*
* @example Simplified signature
* (props: Props) => (defaults?: Record<keyof props, any>) => Props
*
* @example Usage
* const makeProps = propsFactory({
*   foo: String,
* })
*
* defineComponent({
*   props: {
*     ...makeProps({
*       foo: 'a',
*     }),
*   },
*   setup (props) {
*     // would be "string | undefined", now "string" because a default has been provided
*     props.foo
*   },
* }
*/
function propsFactory$1(props, source) {
	return (defaults) => {
		return Object.keys(props).reduce((obj, prop) => {
			const definition = /* @__PURE__ */ isObject$1(props[prop]) ? props[prop] : { type: props[prop] };
			if (defaults && prop in defaults) obj[prop] = {
				...definition,
				default: defaults[prop]
			};
			else obj[prop] = definition;
			if (source && !obj[prop].source) obj[prop].source = source;
			return obj;
		}, {});
	};
}
/**
* Like `Partial<T>` but doesn't care what the value is
*/
// examples/package-consumer/node_modules/vuetify/lib/composables/component.js
var makeComponentProps$1 = propsFactory$1({
	class: [
		String,
		Array,
		Object
	],
	style: {
		type: [
			String,
			Array,
			Object
		],
		default: null
	}
}, "component");
// examples/package-consumer/node_modules/vuetify/lib/util/getCurrentInstance.js
function getCurrentInstance$2(name, message) {
	const vm = getCurrentInstance();
	if (!vm) throw new Error(`[Vuetify] ${name} ${message || "must be called from inside a setup function"}`);
	return vm;
}
function getCurrentInstanceName$1(name = "composables") {
	const vm = getCurrentInstance$2(name).type;
	return toKebabCase$1(vm?.aliasName || vm?.name);
}
// examples/package-consumer/node_modules/vuetify/lib/util/injectSelf.js
function injectSelf$1(key, vm = getCurrentInstance$2("injectSelf")) {
	const { provides } = vm;
	if (provides && key in provides) return provides[key];
}
// examples/package-consumer/node_modules/vuetify/lib/composables/defaults.js
var DefaultsSymbol$1 = Symbol.for("vuetify:defaults");
var RootDefaultsSymbol$1 = Symbol.for("vuetify:defaults:root");
function injectDefaults$1() {
	const defaults = inject(DefaultsSymbol$1);
	if (!defaults) throw new Error("[Vuetify] Could not find defaults instance");
	return defaults;
}
function provideDefaults$1(defaults, options) {
	const injectedDefaults = injectDefaults$1();
	const injectedRoot = inject(RootDefaultsSymbol$1, null);
	const providedDefaults = ref$1(defaults);
	const newDefaults = computed(() => {
		if (unref(options?.disabled)) return injectedDefaults.value;
		const scoped = unref(options?.scoped);
		const reset = unref(options?.reset);
		const root = unref(options?.root);
		if (!providedDefaults.value && !(scoped || reset || root)) return injectedDefaults.value;
		let properties = mergeDeep$2(providedDefaults.value, { prev: injectedDefaults.value });
		if (scoped) return properties;
		if (reset || root) {
			const len = Number(reset || Infinity);
			const rootDefaults = /* @__PURE__ */ isString$1(root) ? properties.prev?.[root] : void 0;
			if (root && injectedRoot?.value) properties = injectedRoot.value;
			for (let i = 0; i <= len; i++) {
				if (!properties || !("prev" in properties)) break;
				properties = properties.prev;
			}
			if (properties && rootDefaults) properties = mergeDeep$2(mergeDeep$2(properties, { prev: properties }), rootDefaults);
			return properties;
		}
		return properties.prev ? mergeDeep$2(properties.prev, properties, void 0, (_, v) => v !== void 0) : properties;
	});
	provide(DefaultsSymbol$1, newDefaults);
	return newDefaults;
}
function propIsDefined$1(vnode, prop) {
	return vnode.props && (typeof vnode.props[prop] !== "undefined" || typeof vnode.props[toKebabCase$1(prop)] !== "undefined");
}
function internalUseDefaults$1(props = {}, name, defaults = injectDefaults$1()) {
	const vm = getCurrentInstance$2("useDefaults");
	name = name ?? vm.type.name ?? vm.type.__name;
	if (!name) throw new Error("[Vuetify] Could not determine component name");
	const componentDefaults = computed(() => defaults.value?.[props._as ?? name]);
	const _props = new Proxy(props, { get(target, prop) {
		const propValue = Reflect.get(target, prop);
		if (prop === "class" || prop === "style") return [componentDefaults.value?.[prop], propValue].filter((v) => v != null);
		if (propIsDefined$1(vm.vnode, prop)) return propValue;
		const _componentDefault = componentDefaults.value?.[prop];
		if (_componentDefault !== void 0) return _componentDefault;
		const _globalDefault = defaults.value?.global?.[prop];
		if (_globalDefault !== void 0) return _globalDefault;
		return propValue;
	} });
	const _subcomponentDefaults = shallowRef();
	watchEffect(() => {
		if (componentDefaults.value) {
			const subComponents = Object.entries(componentDefaults.value).filter(([key]) => key.startsWith(key[0].toUpperCase()));
			_subcomponentDefaults.value = subComponents.length ? Object.fromEntries(subComponents) : void 0;
		} else _subcomponentDefaults.value = void 0;
	});
	function provideSubDefaults() {
		const injected = injectSelf$1(DefaultsSymbol$1, vm);
		provide(DefaultsSymbol$1, computed(() => {
			return _subcomponentDefaults.value ? mergeDeep$2(injected?.value ?? {}, _subcomponentDefaults.value) : injected?.value;
		}));
	}
	return {
		props: _props,
		provideSubDefaults
	};
}
// examples/package-consumer/node_modules/vuetify/lib/util/defineComponent.js
function defineComponent$2(options) {
	options._setup = options._setup ?? options.setup;
	if (!options.name) {
		consoleWarn$1("The component is missing an explicit name, unable to generate default prop value");
		return options;
	}
	if (options._setup) {
		options.props = propsFactory$1(options.props ?? {}, options.name)();
		const propKeys = Object.keys(options.props).filter((key) => key !== "class" && key !== "style");
		options.filterProps = function filterProps(props) {
			return pick$1(props, propKeys);
		};
		options.props._as = String;
		options.setup = function setup(props, ctx) {
			const defaults = injectDefaults$1();
			if (!defaults.value) return options._setup(props, ctx);
			const { props: _props, provideSubDefaults } = internalUseDefaults$1(props, props._as ?? options.name, defaults);
			const setupBindings = options._setup(_props, ctx);
			provideSubDefaults();
			return setupBindings;
		};
	}
	return options;
}
function genericComponent$1(exposeDefaults = true) {
	return (options) => (exposeDefaults ? defineComponent$2 : defineComponent)(options);
}
// examples/package-consumer/node_modules/vuetify/lib/util/easing.js
var standardEasing$1 = "cubic-bezier(0.4, 0, 0.2, 1)";
// examples/package-consumer/node_modules/vuetify/lib/util/useRender.js
function useRender$1(render) {
	const vm = getCurrentInstance$2("useRender");
	vm.render = render;
}
// examples/package-consumer/node_modules/vuetify/lib/components/transitions/createTransition.js
var makeTransitionProps$3 = propsFactory$1({
	disabled: Boolean,
	group: Boolean,
	hideOnLeave: Boolean,
	leaveAbsolute: Boolean,
	mode: String,
	origin: String
}, "transition");
function createCssTransition$1(name, origin, mode) {
	return genericComponent$1()({
		name,
		props: makeTransitionProps$3({
			mode,
			origin
		}),
		setup(props, { slots }) {
			const functions = {
				onBeforeEnter(el) {
					if (props.origin) el.style.transformOrigin = props.origin;
				},
				onLeave(el) {
					if (props.leaveAbsolute) {
						const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = el;
						el._transitionInitialStyles = {
							position: el.style.position,
							top: el.style.top,
							left: el.style.left,
							width: el.style.width,
							height: el.style.height
						};
						el.style.position = "absolute";
						el.style.top = `${offsetTop}px`;
						el.style.left = `${offsetLeft}px`;
						el.style.width = `${offsetWidth}px`;
						el.style.height = `${offsetHeight}px`;
					}
					if (props.hideOnLeave) el.style.setProperty("display", "none", "important");
				},
				onAfterLeave(el) {
					if (props.leaveAbsolute && el?._transitionInitialStyles) {
						const { position, top, left, width, height } = el._transitionInitialStyles;
						delete el._transitionInitialStyles;
						el.style.position = position || "";
						el.style.top = top || "";
						el.style.left = left || "";
						el.style.width = width || "";
						el.style.height = height || "";
					}
				}
			};
			return () => {
				const tag = props.group ? TransitionGroup : Transition;
				return h$1(tag, {
					name: props.disabled ? "" : name,
					css: !props.disabled,
					...props.group ? void 0 : { mode: props.mode },
					...props.disabled ? {} : functions
				}, slots.default);
			};
		}
	});
}
function createJavascriptTransition$1(name, functions, mode = "in-out") {
	return genericComponent$1()({
		name,
		props: {
			mode: {
				type: String,
				default: mode
			},
			disabled: {
				type: Boolean,
				default: PREFERS_REDUCED_MOTION$1()
			},
			group: Boolean,
			hideOnLeave: Boolean
		},
		setup(props, { slots }) {
			const tag = props.group ? TransitionGroup : Transition;
			return () => {
				return h$1(tag, {
					name: props.disabled ? "" : name,
					css: !props.disabled,
					...props.disabled ? {} : {
						...functions,
						onLeave: (el) => {
							if (props.hideOnLeave) el.style.setProperty("display", "none", "important");
							else functions.onLeave?.(el);
						}
					}
				}, slots.default);
			};
		}
	});
}
// examples/package-consumer/node_modules/vuetify/lib/components/transitions/expand-transition.js
function expand_transition_default$1(expandedParentClass = "", type = "y") {
	return {
		onBeforeEnter(el) {
			el._parent = el.parentNode;
			el._initialStyle = {
				transition: el.style.transition,
				overflow: el.style.overflow,
				width: el.style.width,
				height: el.style.height
			};
		},
		onEnter(el) {
			const initialStyle = el._initialStyle;
			if (!initialStyle) return;
			el.style.setProperty("transition", "none", "important");
			el.style.overflow = "hidden";
			const offsetWidth = `${el.offsetWidth}px`;
			const offsetHeight = `${el.offsetHeight}px`;
			if (["x", "both"].includes(type)) el.style.width = "0";
			if (["y", "both"].includes(type)) el.style.height = "0";
			el.offsetHeight;
			el.style.transition = initialStyle.transition;
			if (expandedParentClass && el._parent) el._parent.classList.add(expandedParentClass);
			requestAnimationFrame(() => {
				if (["x", "both"].includes(type)) el.style.width = offsetWidth;
				if (["y", "both"].includes(type)) el.style.height = offsetHeight;
			});
		},
		onAfterEnter: resetStyles,
		onEnterCancelled: resetStyles,
		onLeave(el) {
			el._initialStyle = {
				transition: "",
				overflow: el.style.overflow,
				width: el.style.width,
				height: el.style.height
			};
			el.style.overflow = "hidden";
			if (["x", "both"].includes(type)) el.style.width = `${el.offsetWidth}px`;
			if (["y", "both"].includes(type)) el.style.height = `${el.offsetHeight}px`;
			el.offsetHeight;
			requestAnimationFrame(() => {
				if (["x", "both"].includes(type)) el.style.width = "0";
				if (["y", "both"].includes(type)) el.style.height = "0";
			});
		},
		onAfterLeave,
		onLeaveCancelled: onAfterLeave
	};
	function onAfterLeave(el) {
		if (expandedParentClass && el._parent) el._parent.classList.remove(expandedParentClass);
		resetStyles(el);
	}
	function resetStyles(el) {
		if (!el._initialStyle) return;
		const { width: w, height: h } = el._initialStyle;
		el.style.overflow = el._initialStyle.overflow;
		if (w != null && ["x", "both"].includes(type)) el.style.width = w;
		if (h != null && ["y", "both"].includes(type)) el.style.height = h;
		delete el._initialStyle;
	}
}
createCssTransition$1("fab-transition", "center center", "out-in");
createCssTransition$1("dialog-bottom-transition");
createCssTransition$1("dialog-top-transition");
createCssTransition$1("fade-transition");
createCssTransition$1("scale-transition");
createCssTransition$1("scroll-x-transition");
createCssTransition$1("scroll-x-reverse-transition");
createCssTransition$1("scroll-y-transition");
createCssTransition$1("scroll-y-reverse-transition");
createCssTransition$1("slide-x-transition");
createCssTransition$1("slide-x-reverse-transition");
var VSlideYTransition$1 = createCssTransition$1("slide-y-transition");
createCssTransition$1("slide-y-reverse-transition");
createJavascriptTransition$1("expand-transition", expand_transition_default$1());
var VExpandXTransition$1 = createJavascriptTransition$1("expand-x-transition", expand_transition_default$1("", "x"));
createJavascriptTransition$1("expand-both-transition", expand_transition_default$1("", "both"));
// examples/package-consumer/node_modules/vuetify/lib/composables/transition.js
var makeTransitionProps$2 = propsFactory$1({ transition: {
	type: null,
	default: "fade-transition",
	validator: (val) => val !== true
} }, "transition");
var MaybeTransition$1 = (props, { slots }) => {
	const { transition, disabled, group, target, ...rest } = props;
	const { component = group ? TransitionGroup : Transition, ...customProps } = /* @__PURE__ */ isObject$1(transition) ? transition : {};
	let transitionProps;
	if (/* @__PURE__ */ isObject$1(transition)) transitionProps = mergeProps(customProps, onlyDefinedProps$1({
		disabled,
		group,
		target
	}), rest);
	else transitionProps = mergeProps({ name: disabled || !transition ? "" : transition }, rest);
	return h$1(component, transitionProps, slots);
};
// examples/package-consumer/node_modules/vuetify/lib/components/VCounter/VCounter.js
var makeVCounterProps$1 = propsFactory$1({
	active: Boolean,
	disabled: Boolean,
	max: [Number, String],
	value: {
		type: [Number, String],
		default: 0
	},
	...makeComponentProps$1(),
	...makeTransitionProps$2({ transition: { component: VSlideYTransition$1 } })
}, "VCounter");
var VCounter$1 = genericComponent$1()({
	name: "VCounter",
	functional: true,
	props: makeVCounterProps$1(),
	setup(props, { slots }) {
		const lastMax = shallowRef(props.max);
		watch(() => props.max, (val) => val != null && (lastMax.value = val));
		const max = toRef(() => props.active ? props.max : lastMax.value);
		const counter = toRef(() => {
			return max.value ? `${props.value} / ${max.value}` : String(props.value);
		});
		useRender$1(() => createVNode(MaybeTransition$1, {
			"transition": props.transition,
			"appear": true
		}, { default: () => [withDirectives(createElementVNode("div", {
			"class": normalizeClass([
				"v-counter",
				{ "text-error": max.value && !props.disabled && parseFloat(props.value) > parseFloat(max.value) },
				props.class
			]),
			"style": normalizeStyle(props.style)
		}, [slots.default ? slots.default({
			counter: counter.value,
			max: max.value,
			value: props.value
		}) : counter.value]), [[vShow, props.active]])] }));
		return {};
	}
});
// examples/package-consumer/node_modules/vuetify/lib/composables/theme.js
var ThemeSymbol$1 = Symbol.for("vuetify:theme");
var makeThemeProps$1 = propsFactory$1({ theme: String }, "theme");
function provideTheme$1(props) {
	getCurrentInstance$2("provideTheme");
	const theme = inject(ThemeSymbol$1, null);
	if (!theme) throw new Error("Could not find Vuetify theme injection");
	const name = toRef(() => props.theme ?? theme.name.value);
	const current = toRef(() => theme.computedThemes.value[name.value]);
	const themeClasses = toRef(() => theme.isDisabled ? void 0 : `${theme.prefix}theme--${name.value}`);
	const newTheme = {
		...theme,
		name,
		current,
		themeClasses
	};
	provide(ThemeSymbol$1, newTheme);
	return newTheme;
}
// examples/package-consumer/node_modules/vuetify/lib/components/VLabel/VLabel.js
var makeVLabelProps$1 = propsFactory$1({
	text: String,
	onClick: EventProp$1(),
	...makeComponentProps$1(),
	...makeThemeProps$1()
}, "VLabel");
var VLabel$1 = genericComponent$1()({
	name: "VLabel",
	props: makeVLabelProps$1(),
	setup(props, { slots }) {
		useRender$1(() => createElementVNode("label", {
			"class": normalizeClass([
				"v-label",
				{ "v-label--clickable": !!props.onClick },
				props.class
			]),
			"style": normalizeStyle(props.style),
			"onClick": props.onClick
		}, [props.text, slots.default?.()]));
		return {};
	}
});
// examples/package-consumer/node_modules/vuetify/lib/components/VField/VFieldLabel.js
var makeVFieldLabelProps$1 = propsFactory$1({
	floating: Boolean,
	...makeComponentProps$1()
}, "VFieldLabel");
var VFieldLabel$1 = genericComponent$1()({
	name: "VFieldLabel",
	props: makeVFieldLabelProps$1(),
	setup(props, { slots }) {
		useRender$1(() => createVNode(VLabel$1, {
			"class": normalizeClass([
				"v-field-label",
				{ "v-field-label--floating": props.floating },
				props.class
			]),
			"style": normalizeStyle(props.style)
		}, slots));
		return {};
	}
});
// examples/package-consumer/node_modules/vuetify/lib/components/VDefaultsProvider/VDefaultsProvider.js
var makeVDefaultsProviderProps$1 = propsFactory$1({
	defaults: Object,
	disabled: Boolean,
	reset: [Number, String],
	root: [Boolean, String],
	scoped: Boolean
}, "VDefaultsProvider");
var VDefaultsProvider$1 = genericComponent$1(false)({
	name: "VDefaultsProvider",
	props: makeVDefaultsProviderProps$1(),
	setup(props, { slots }) {
		const { defaults, disabled, reset, root, scoped } = toRefs(props);
		provideDefaults$1(defaults, {
			reset,
			root,
			scoped,
			disabled
		});
		return () => slots.default?.();
	}
});
// examples/package-consumer/node_modules/vuetify/lib/composables/color.js
function useColor$1(colors) {
	return destructComputed$1(() => {
		const { class: colorClasses, style: colorStyles } = computeColor$1(colors);
		return {
			colorClasses,
			colorStyles
		};
	});
}
function useTextColor$1(color) {
	const { colorClasses: textColorClasses, colorStyles: textColorStyles } = useColor$1(() => ({ text: toValue(color) }));
	return {
		textColorClasses,
		textColorStyles
	};
}
function useBackgroundColor$1(color) {
	const { colorClasses: backgroundColorClasses, colorStyles: backgroundColorStyles } = useColor$1(() => ({ background: toValue(color) }));
	return {
		backgroundColorClasses,
		backgroundColorStyles
	};
}
function normalizeColors$1(colors) {
	return {
		text: /* @__PURE__ */ isString$1(colors.text) ? colors.text.replace(/^text-/, "") : colors.text,
		background: /* @__PURE__ */ isString$1(colors.background) ? colors.background.replace(/^bg-/, "") : colors.background
	};
}
function computeColor$1(colors) {
	const _colors = normalizeColors$1(toValue(colors));
	const classes = [];
	const styles = {};
	if (_colors.background) {
		if (isCssColor$1(_colors.background)) {
			styles.backgroundColor = _colors.background;
			if (!_colors.text && isParsableColor$1(_colors.background)) {
				const backgroundColor = parseColor$1(_colors.background);
				if (!/* @__PURE__ */ isNumber$1(backgroundColor.a) || backgroundColor.a === 1) classes.push(hasLightForeground$1(backgroundColor) ? "v-theme-on-dark" : "v-theme-on-light");
			}
		} else classes.push(`bg-${_colors.background}`);
	}
	if (_colors.text) {
		if (isCssColor$1(_colors.text)) {
			styles.color = _colors.text;
			styles.caretColor = _colors.text;
		} else classes.push(`text-${_colors.text}`);
	}
	return {
		class: classes,
		style: styles
	};
}
// examples/package-consumer/node_modules/vuetify/lib/composables/icons.js
var IconValue$1 = [
	String,
	Function,
	Object,
	Array
];
var IconSymbol$1 = Symbol.for("vuetify:icons");
var makeIconProps$1 = propsFactory$1({
	icon: { type: IconValue$1 },
	tag: {
		type: [
			String,
			Object,
			Function
		],
		required: true
	}
}, "icon");
var VComponentIcon$1 = genericComponent$1()({
	name: "VComponentIcon",
	props: makeIconProps$1(),
	setup(props, { slots }) {
		return () => {
			const Icon = props.icon;
			return createVNode(props.tag, null, { default: () => [props.icon ? createVNode(Icon, null, null) : slots.default?.()] });
		};
	}
});
var VSvgIcon$1 = defineComponent$2({
	name: "VSvgIcon",
	inheritAttrs: false,
	props: makeIconProps$1(),
	setup(props, { attrs }) {
		return () => {
			return createVNode(props.tag, mergeProps(attrs, { "style": null }), { default: () => [createElementVNode("svg", {
				"class": "v-icon__svg",
				"xmlns": "http://www.w3.org/2000/svg",
				"viewBox": "0 0 24 24",
				"role": "img",
				"aria-hidden": "true"
			}, [Array.isArray(props.icon) ? props.icon.map((path) => Array.isArray(path) ? createElementVNode("path", {
				"d": path[0],
				"fill-opacity": path[1]
			}, null) : createElementVNode("path", { "d": path }, null)) : createElementVNode("path", { "d": props.icon }, null)])] });
		};
	}
});
defineComponent$2({
	name: "VLigatureIcon",
	props: makeIconProps$1(),
	setup(props) {
		return () => {
			return createVNode(props.tag, null, { default: () => [props.icon] });
		};
	}
});
defineComponent$2({
	name: "VClassIcon",
	props: makeIconProps$1(),
	setup(props) {
		return () => {
			return createVNode(props.tag, { "class": normalizeClass(props.icon) }, null);
		};
	}
});
var useIcon$1 = (props) => {
	const icons = inject(IconSymbol$1);
	if (!icons) throw new Error("Missing Vuetify Icons provide!");
	return { iconData: computed(() => {
		const iconAlias = toValue(props);
		if (!iconAlias) return { component: VComponentIcon$1 };
		let icon = iconAlias;
		if (/* @__PURE__ */ isString$1(icon)) {
			icon = icon.trim();
			if (icon.startsWith("$")) icon = icons.aliases?.[icon.slice(1)];
		}
		if (!icon) consoleWarn$1(`Could not find aliased icon "${iconAlias}"`);
		if (Array.isArray(icon)) return {
			component: VSvgIcon$1,
			icon
		};
		else if (!/* @__PURE__ */ isString$1(icon)) return {
			component: VComponentIcon$1,
			icon
		};
		const iconSetName = Object.keys(icons.sets).find((setName) => /* @__PURE__ */ isString$1(icon) && icon.startsWith(`${setName}:`));
		const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
		return {
			component: icons.sets[iconSetName ?? icons.defaultSet].component,
			icon: iconName
		};
	}) };
};
// examples/package-consumer/node_modules/vuetify/lib/composables/size.js
var predefinedSizes$1 = [
	"x-small",
	"small",
	"default",
	"large",
	"x-large"
];
var makeSizeProps$1 = propsFactory$1({ size: {
	type: [String, Number],
	default: "default"
} }, "size");
function useSize$1(props, name = getCurrentInstanceName$1()) {
	return destructComputed$1(() => {
		const size = props.size;
		let sizeClasses;
		let sizeStyles;
		if (includes$1(predefinedSizes$1, size)) sizeClasses = `${name}--size-${size}`;
		else if (size) sizeStyles = {
			width: convertToUnit$1(size),
			height: convertToUnit$1(size)
		};
		return {
			sizeClasses,
			sizeStyles
		};
	});
}
// examples/package-consumer/node_modules/vuetify/lib/composables/tag.js
var makeTagProps$1 = propsFactory$1({ tag: {
	type: [
		String,
		Object,
		Function
	],
	default: "div"
} }, "tag");
// examples/package-consumer/node_modules/vuetify/lib/components/VIcon/VIcon.js
var makeVIconProps$1 = propsFactory$1({
	color: String,
	disabled: Boolean,
	start: Boolean,
	end: Boolean,
	icon: IconValue$1,
	opacity: [String, Number],
	...makeComponentProps$1(),
	...makeSizeProps$1(),
	...makeTagProps$1({ tag: "i" }),
	...makeThemeProps$1()
}, "VIcon");
var VIcon$1 = genericComponent$1()({
	name: "VIcon",
	props: makeVIconProps$1(),
	setup(props, { attrs, slots }) {
		const slotIcon = shallowRef();
		const { themeClasses } = provideTheme$1(props);
		const { iconData } = useIcon$1(() => slotIcon.value || props.icon);
		const { sizeClasses } = useSize$1(props);
		const { textColorClasses, textColorStyles } = useTextColor$1(() => props.color);
		useRender$1(() => {
			const slotValue = slots.default?.();
			if (slotValue) slotIcon.value = flattenFragments$1(slotValue).filter((node) => node.type === Text && node.children && /* @__PURE__ */ isString$1(node.children))[0]?.children;
			const hasClick = !!(attrs.onClick || attrs.onClickOnce);
			return createVNode(iconData.value.component, {
				"tag": props.tag,
				"icon": iconData.value.icon,
				"class": normalizeClass([
					"v-icon",
					"notranslate",
					themeClasses.value,
					sizeClasses.value,
					textColorClasses.value,
					{
						"v-icon--clickable": hasClick,
						"v-icon--disabled": props.disabled,
						"v-icon--start": props.start,
						"v-icon--end": props.end
					},
					props.class
				]),
				"style": normalizeStyle([
					{ "--v-icon-opacity": props.opacity },
					!sizeClasses.value ? {
						fontSize: convertToUnit$1(props.size),
						height: convertToUnit$1(props.size),
						width: convertToUnit$1(props.size)
					} : void 0,
					textColorStyles.value,
					props.style
				]),
				"role": hasClick ? "button" : void 0,
				"aria-hidden": !hasClick,
				"tabindex": hasClick ? props.disabled ? -1 : 0 : void 0
			}, { default: () => [slotValue] });
		});
		return {};
	}
});
// examples/package-consumer/node_modules/vuetify/lib/composables/toggleScope.js
function useToggleScope$1(source, fn) {
	let scope;
	function start() {
		scope = effectScope();
		scope.run(() => fn.length ? fn(() => {
			scope?.stop();
			start();
		}) : fn());
	}
	watch(source, (active) => {
		if (active && !scope) start();
		else if (!active) {
			scope?.stop();
			scope = void 0;
		}
	}, { immediate: true });
	onScopeDispose(() => {
		scope?.stop();
	});
}
// examples/package-consumer/node_modules/vuetify/lib/composables/proxiedModel.js
function useProxiedModel$1(props, prop, defaultValue, transformIn = (v) => v, transformOut = (v) => v) {
	const vm = getCurrentInstance$2("useProxiedModel");
	const internal = ref$1(!/* @__PURE__ */ isUndefined$1(props[prop]) ? props[prop] : defaultValue);
	const kebabProp = toKebabCase$1(prop);
	const isControlled = kebabProp !== prop ? computed(() => {
		props[prop];
		return !!((vm.vnode.props?.hasOwnProperty(prop) || vm.vnode.props?.hasOwnProperty(kebabProp)) && (vm.vnode.props?.hasOwnProperty(`onUpdate:${prop}`) || vm.vnode.props?.hasOwnProperty(`onUpdate:${kebabProp}`)));
	}) : computed(() => {
		props[prop];
		return !!(vm.vnode.props?.hasOwnProperty(prop) && vm.vnode.props?.hasOwnProperty(`onUpdate:${prop}`));
	});
	useToggleScope$1(() => !isControlled.value, () => {
		watch(() => props[prop], (val) => {
			internal.value = val;
		});
	});
	const model = computed({
		get() {
			const externalValue = props[prop];
			return transformIn(isControlled.value ? externalValue : internal.value);
		},
		set(internalValue) {
			const newValue = transformOut(internalValue);
			const value = toRaw(isControlled.value ? props[prop] : internal.value);
			if (value === newValue || transformIn(value) === internalValue) return;
			internal.value = newValue;
			vm?.emit(`update:${prop}`, newValue);
		}
	});
	Object.defineProperty(model, "externalValue", { get: () => isControlled.value ? props[prop] : internal.value });
	return model;
}
// examples/package-consumer/node_modules/vuetify/lib/composables/locale.js
var LocaleSymbol$1 = Symbol.for("vuetify:locale");
function useLocale$1() {
	const locale = inject(LocaleSymbol$1);
	if (!locale) throw new Error("[Vuetify] Could not find injected locale instance");
	return locale;
}
function useRtl$1() {
	const locale = inject(LocaleSymbol$1);
	if (!locale) throw new Error("[Vuetify] Could not find injected rtl instance");
	return {
		isRtl: locale.isRtl,
		rtlClasses: locale.rtlClasses
	};
}
// examples/package-consumer/node_modules/vuetify/lib/components/VInput/InputIcon.js
function useInputIcon$1(props) {
	const { t } = useLocale$1();
	function InputIcon({ name, color, ...attrs }) {
		const localeKey = {
			prepend: "prependAction",
			prependInner: "prependAction",
			append: "appendAction",
			appendInner: "appendAction",
			clear: "clear"
		}[name];
		const listener = props[`onClick:${name}`];
		function onKeydown(e) {
			if (e.key !== "Enter" && e.key !== " ") return;
			e.preventDefault();
			e.stopPropagation();
			callEvent$1(listener, new PointerEvent("click", e));
		}
		const label = listener && localeKey ? t(`$vuetify.input.${localeKey}`, props.label ?? "") : void 0;
		return createVNode(VIcon$1, mergeProps({
			"icon": props[`${name}Icon`],
			"aria-label": label,
			"onClick": listener,
			"onKeydown": onKeydown,
			"color": color
		}, attrs), null);
	}
	return { InputIcon };
}
// examples/package-consumer/node_modules/vuetify/lib/composables/focus.js
var makeFocusProps$1 = propsFactory$1({
	focused: Boolean,
	"onUpdate:focused": EventProp$1()
}, "focus");
function useFocus$1(props, name = getCurrentInstanceName$1()) {
	const isFocused = useProxiedModel$1(props, "focused");
	const focusClasses = toRef(() => {
		return { [`${name}--focused`]: isFocused.value };
	});
	function focus() {
		isFocused.value = true;
	}
	function blur() {
		isFocused.value = false;
	}
	return {
		focusClasses,
		isFocused,
		focus,
		blur
	};
}
// examples/package-consumer/node_modules/vuetify/lib/composables/location.js
var oppositeMap$1 = {
	center: "center",
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
};
var makeLocationProps$1 = propsFactory$1({ location: String }, "location");
function useLocation$1(props, opposite = false, offset) {
	const { isRtl } = useRtl$1();
	return { locationStyles: computed(() => {
		if (!props.location) return {};
		const { side, align } = parseAnchor$1(props.location.split(" ").length > 1 ? props.location : `${props.location} center`, isRtl.value);
		function getOffset(side) {
			return offset ? offset(side) : 0;
		}
		const styles = {};
		if (side !== "center") {
			if (opposite) styles[oppositeMap$1[side]] = `calc(100% - ${getOffset(side)}px)`;
			else styles[side] = 0;
		}
		if (align !== "center") {
			if (opposite) styles[oppositeMap$1[align]] = `calc(100% - ${getOffset(align)}px)`;
			else styles[align] = 0;
		} else {
			if (side === "center") styles.top = styles.left = "50%";
			else styles[{
				top: "left",
				bottom: "left",
				left: "top",
				right: "top"
			}[side]] = "50%";
			styles.transform = {
				top: "translateX(-50%)",
				bottom: "translateX(-50%)",
				left: "translateY(-50%)",
				right: "translateY(-50%)",
				center: "translate(-50%, -50%)"
			}[side];
		}
		return styles;
	}) };
}
// examples/package-consumer/node_modules/vuetify/lib/composables/reveal.js
var makeRevealProps$1 = propsFactory$1({ reveal: {
	type: [Boolean, Object],
	default: false
} }, "reveal");
function useReveal$1(props) {
	const defaultDuration = 900;
	const duration = toRef(() => /* @__PURE__ */ isObject$1(props.reveal) ? Math.max(0, Number(props.reveal.duration ?? defaultDuration)) : defaultDuration);
	const state = shallowRef(props.reveal ? "initial" : "disabled");
	onMounted(async () => {
		if (props.reveal) {
			state.value = "initial";
			await new Promise((resolve) => requestAnimationFrame(resolve));
			state.value = "pending";
			await new Promise((resolve) => setTimeout(resolve, duration.value));
			state.value = "done";
		}
	});
	return {
		duration,
		state
	};
}
// examples/package-consumer/node_modules/vuetify/lib/composables/rounded.js
var CSS_LENGTH$1 = /^-?\d*\.?\d+([a-z%]{0,4})$/i;
function splitTokens$1(v) {
	return String(v).trim().split(/\s+/);
}
function isCssLength$1(token) {
	return token.toLowerCase().match(CSS_LENGTH$1)?.at(1)?.startsWith("x") === false;
}
function isCssValue$1(v) {
	return typeof v === "string" && !!v && (v.includes("(") || splitTokens$1(v).every(isCssLength$1));
}
var makeRoundedProps$1 = propsFactory$1({
	rounded: {
		type: [
			Boolean,
			Number,
			String
		],
		default: void 0
	},
	tile: Boolean
}, "rounded");
function useRounded$1(props, name = getCurrentInstanceName$1()) {
	return {
		roundedClasses: computed(() => {
			const rounded = isRef(props) ? props.value : props.rounded;
			const tile = isRef(props) ? false : props.tile;
			const classes = [];
			if (tile || rounded === false || String(rounded) === "0") classes.push("rounded-0");
			else if (rounded === true || rounded === "") classes.push(`${name}--rounded`);
			else if (/* @__PURE__ */ isString$1(rounded) && !isCssValue$1(rounded)) for (const value of splitTokens$1(rounded)) classes.push(`rounded-${value}`);
			return classes;
		}),
		roundedStyles: computed(() => {
			const rounded = isRef(props) ? props.value : props.rounded;
			if ((!isCssValue$1(rounded) || String(rounded) === "0") && !(typeof rounded === "number" && rounded !== 0)) return {};
			return { borderRadius: convertToUnit$1(rounded) };
		})
	};
}
// examples/package-consumer/node_modules/vuetify/lib/components/VProgressLinear/chunks.js
var makeChunksProps$1 = propsFactory$1({
	chunkCount: {
		type: [Number, String],
		default: null
	},
	chunkWidth: {
		type: [Number, String],
		default: null
	},
	chunkGap: {
		type: [Number, String],
		default: 4
	},
	variant: {
		type: String,
		default: void 0,
		validator: (v) => ["split"].includes(v)
	}
}, "chunks");
function useChunks$1(props, containerWidth, value, bufferValue, reversed) {
	const isSplit = toRef(() => props.variant === "split");
	const chunkCount = toRef(() => isSplit.value ? 2 : Number(props.chunkCount) || 0);
	const hasChunks = toRef(() => !isSplit.value && (!!chunkCount.value || !!props.chunkWidth));
	const chunkWidth = computed(() => {
		const containerSize = toValue(containerWidth);
		if (!containerSize) return 0;
		if (chunkCount.value) return (containerSize - Number(props.chunkGap) * (chunkCount.value - 1)) / chunkCount.value;
		return Number(props.chunkWidth);
	});
	const chunkGap = toRef(() => Number(props.chunkGap));
	const chunksMaskStyles = computed(() => {
		if (!hasChunks.value) return {};
		const chunkGapPx = convertToUnit$1(chunkGap.value);
		const chunkWidthPx = convertToUnit$1(chunkWidth.value);
		return {
			maskRepeat: "repeat-x",
			maskImage: `linear-gradient(90deg, #000, #000 ${chunkWidthPx}, transparent ${chunkWidthPx}, transparent)`,
			maskSize: `calc(${chunkWidthPx} + ${chunkGapPx}) 100%`
		};
	});
	const splitStyles = computed(() => {
		if (!isSplit.value) return void 0;
		const halfGap = convertToUnit$1(chunkGap.value / 2);
		const position = toValue(reversed) ? "right" : "left";
		const val = toValue(value);
		if (val >= 100) return void 0;
		const buffer = toValue(bufferValue);
		const hasBar = val > 0;
		const hasBuffer = buffer > val && buffer < 100;
		if (!hasBar && !hasBuffer) return void 0;
		const split = convertToUnit$1(val, "%");
		const bufferSplit = convertToUnit$1(buffer, "%");
		const edge = hasBuffer ? bufferSplit : split;
		return {
			bar: hasBar ? { width: `calc(${split} - ${halfGap})` } : void 0,
			buffer: hasBuffer ? {
				[position]: hasBar ? `calc(${split} + ${halfGap})` : 0,
				width: hasBar ? `calc(${bufferSplit} - ${split} - ${convertToUnit$1(chunkGap.value)})` : `calc(${bufferSplit} - ${halfGap})`
			} : void 0,
			background: {
				[position]: `calc(${edge} + ${halfGap})`,
				width: `calc(100% - ${edge} - ${halfGap})`
			}
		};
	});
	function snapValueToChunk(val) {
		if (isSplit.value) return val;
		const containerSize = toValue(containerWidth);
		if (!containerSize) return val;
		const gapRelativeSize = 100 * chunkGap.value / containerSize;
		const chunkRelativeSize = 100 * (chunkWidth.value + chunkGap.value) / containerSize;
		return clamp$2(Math.floor((val + gapRelativeSize) / chunkRelativeSize + 1e-9) * chunkRelativeSize - gapRelativeSize / 2, 0, 100);
	}
	return {
		hasChunks: toRef(() => hasChunks.value || isSplit.value),
		isSplit,
		chunkCount,
		chunksMaskStyles,
		splitStyles,
		snapValueToChunk
	};
}
// examples/package-consumer/node_modules/vuetify/lib/components/VProgressLinear/waves.js
function round$1(value) {
	return Math.round(value * 1e3) / 1e3;
}
function hasWave$1(value) {
	return value > 10 && value < 95;
}
function linearWavePath$1(start, end, center, amplitude, wavelength, phase = start) {
	const waveNumber = 2 * Math.PI / wavelength;
	const y = (x) => center + amplitude * Math.sin(waveNumber * (x - phase));
	const slope = (x) => amplitude * waveNumber * Math.cos(waveNumber * (x - phase));
	let path = `M ${round$1(start)} ${round$1(y(start))}`;
	for (let x = start; x < end; x += wavelength / 4) {
		const next = Math.min(x + wavelength / 4, end);
		const third = (next - x) / 3;
		path += ` C ${round$1(x + third)} ${round$1(y(x) + slope(x) * third)} ${round$1(next - third)} ${round$1(y(next) - slope(next) * third)} ${round$1(next)} ${round$1(y(next))}`;
	}
	return path;
}
function useWavy$1(props, { containerWidth, value, isActive, duration }) {
	const isWavy = toRef(() => props.shape === "wavy");
	const geometry = computed(() => {
		const width = toValue(containerWidth);
		if (!isWavy.value || !width) return void 0;
		const stroke = parseFloat(props.height);
		const wavelength = props.indeterminate ? 20 : 40;
		const center = stroke / 2 + 3;
		const start = stroke / 2;
		const end = Math.max(width - start, start + 1);
		const range = end - start;
		return {
			width,
			stroke,
			wavelength,
			center,
			start,
			end,
			offset: wavelength / range * 100,
			gap: (parseFloat(props.chunkGap) + stroke) / range * 100,
			track: `M ${start} ${center} H ${end}`,
			wave: props.indeterminate ? linearWavePath$1(start - wavelength, end, center, 3, wavelength) : ""
		};
	});
	const svgEl = shallowRef();
	const waveEl = shallowRef();
	const isAnimating = toRef(() => isWavy.value && !props.indeterminate && toValue(isActive) && !!svgEl.value);
	let displayedValue = toValue(value);
	let velocity = 0;
	let amplitude = hasWave$1(displayedValue) ? 1 : 0;
	let phase = 0;
	let springDuration = 0;
	let lastFrameTime = 0;
	let frame = -1;
	function draw() {
		if (!geometry.value || !svgEl.value || !waveEl.value) return;
		const { start, end, center, wavelength } = geometry.value;
		const head = start + (end - start) * displayedValue / 100;
		const eased = amplitude * amplitude * (3 - 2 * amplitude);
		waveEl.value.setAttribute("d", linearWavePath$1(start, head, center, 3 * eased, wavelength, phase));
		svgEl.value.style.setProperty("--v-progress-linear-value", String(displayedValue));
	}
	function tick(now) {
		const elapsed = lastFrameTime ? Math.min(now - lastFrameTime, 100) / 1e3 : 0;
		lastFrameTime = now;
		const target = toValue(value);
		const omega = 4e3 / springDuration;
		if (!Number.isFinite(omega)) {
			displayedValue = target;
			velocity = 0;
		} else {
			const offset = displayedValue - target;
			const decay = Math.exp(-omega * elapsed);
			const coefficient = velocity + omega * offset;
			displayedValue = target + (offset + coefficient * elapsed) * decay;
			velocity = (velocity - omega * coefficient * elapsed) * decay;
			if (Math.abs(displayedValue - target) < .01 && Math.abs(velocity) < .01) {
				displayedValue = target;
				velocity = 0;
			}
		}
		const targetAmplitude = hasWave$1(displayedValue) ? 1 : 0;
		amplitude = targetAmplitude > amplitude ? Math.min(amplitude + elapsed * 2, 1) : Math.max(amplitude - elapsed * 2, 0);
		const reduceMotion = PREFERS_REDUCED_MOTION$1();
		const wavelength = geometry.value?.wavelength ?? 40;
		if (!reduceMotion) phase = (phase - elapsed * wavelength) % wavelength;
		draw();
		const settled = displayedValue === target && amplitude === targetAmplitude;
		frame = isAnimating.value && !(settled && (reduceMotion || !amplitude)) ? requestAnimationFrame(tick) : -1;
	}
	watch([isAnimating, () => toValue(value)], () => {
		if (!isAnimating.value) return;
		springDuration = duration();
		if (frame >= 0) return;
		lastFrameTime = 0;
		frame = requestAnimationFrame(tick);
	}, {
		immediate: true,
		flush: "post"
	});
	watch([svgEl, geometry], draw, { flush: "post" });
	onScopeDispose(() => cancelAnimationFrame(frame));
	return {
		geometry,
		svgEl,
		waveEl
	};
}
// examples/package-consumer/node_modules/vuetify/lib/components/VProgressLinear/VProgressLinear.js
var makeVProgressLinearProps$1 = propsFactory$1({
	absolute: Boolean,
	active: {
		type: Boolean,
		default: true
	},
	bgColor: String,
	bgOpacity: [Number, String],
	bufferValue: {
		type: [Number, String],
		default: 0
	},
	bufferColor: String,
	bufferOpacity: [Number, String],
	clickable: Boolean,
	color: String,
	height: {
		type: [Number, String],
		default: 4
	},
	indeterminate: Boolean,
	max: {
		type: [Number, String],
		default: 100
	},
	modelValue: {
		type: [Number, String],
		default: 0
	},
	opacity: [Number, String],
	reverse: Boolean,
	shape: {
		type: String,
		default: "flat",
		validator: (v) => ["flat", "wavy"].includes(v)
	},
	stopIndicator: {
		type: Boolean,
		default: void 0
	},
	stream: Boolean,
	striped: Boolean,
	roundedBar: Boolean,
	transition: {
		type: [Boolean, Object],
		default: void 0
	},
	...makeChunksProps$1(),
	...makeComponentProps$1(),
	...makeLocationProps$1({ location: "top" }),
	...makeRevealProps$1(),
	...makeRoundedProps$1(),
	...makeTagProps$1(),
	...makeThemeProps$1()
}, "VProgressLinear");
var VProgressLinear$1 = genericComponent$1()({
	name: "VProgressLinear",
	props: makeVProgressLinearProps$1(),
	emits: { "update:modelValue": (value) => true },
	setup(props, { slots }) {
		const root = shallowRef();
		const progress = useProxiedModel$1(props, "modelValue");
		const { isRtl, rtlClasses } = useRtl$1();
		const { themeClasses } = provideTheme$1(props);
		const { locationStyles } = useLocation$1(props);
		const { textColorClasses, textColorStyles } = useTextColor$1(() => props.color);
		const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor$1(() => props.bgColor || props.color);
		const { backgroundColorClasses: bufferColorClasses, backgroundColorStyles: bufferColorStyles } = useBackgroundColor$1(() => props.bufferColor || props.bgColor || props.color);
		const { backgroundColorClasses: barColorClasses, backgroundColorStyles: barColorStyles } = useBackgroundColor$1(() => props.color);
		const { textColorClasses: trackColorClasses, textColorStyles: trackColorStyles } = useTextColor$1(() => props.bgColor);
		const { roundedClasses, roundedStyles } = useRounded$1(props);
		const { isIntersecting } = useElementIntersection$1(root);
		const { state: revealState, duration: revealDuration } = useReveal$1(props);
		const max = computed(() => parseFloat(props.max));
		const height = computed(() => convertToUnit$1(props.height));
		const normalizedBuffer = computed(() => clamp$2(parseFloat(props.bufferValue) / max.value * 100, 0, 100));
		const normalizedValue = computed(() => revealState.value === "initial" ? 0 : clamp$2(parseFloat(progress.value) / max.value * 100, 0, 100));
		const isReversed = computed(() => isRtl.value !== props.reverse);
		const transitionDuration = computed(() => props.transition === false ? void 0 : convertToUnit$1(/* @__PURE__ */ isObject$1(props.transition) ? props.transition.duration : void 0, "ms"));
		const bgOpacity = toRef(() => /* @__PURE__ */ isNullOrUndefined$1(props.bgOpacity) ? void 0 : parseFloat(props.bgOpacity));
		const isWavy = toRef(() => props.shape === "wavy");
		const hasStopIndicator = toRef(() => !props.indeterminate && (isWavy.value ? props.stopIndicator !== false : props.variant === "split" && props.stopIndicator === true));
		const transitionName = computed(() => props.indeterminate ? "fade-transition" : "slide-x-transition");
		const containerWidth = shallowRef(0);
		const { hasChunks, splitStyles, chunksMaskStyles, snapValueToChunk } = useChunks$1(props, containerWidth, normalizedValue, normalizedBuffer, isReversed);
		useToggleScope$1(() => hasChunks.value || isWavy.value, () => {
			useResizeObserver$1(root, (entries) => {
				containerWidth.value = entries[0].contentRect.width;
			});
		});
		const bufferWidth = computed(() => {
			return hasChunks.value ? snapValueToChunk(normalizedBuffer.value) : normalizedBuffer.value;
		});
		const barWidth = computed(() => {
			return hasChunks.value ? snapValueToChunk(normalizedValue.value) : normalizedValue.value;
		});
		const { geometry, svgEl, waveEl } = useWavy$1(props, {
			containerWidth,
			value: normalizedValue,
			isActive: () => props.active && isIntersecting.value,
			duration: () => {
				if (revealState.value === "pending") return revealDuration.value;
				const duration = getComputedStyle(root.value).getPropertyValue("--v-progress-linear-transition-duration").trim();
				return parseFloat(duration) * (duration.endsWith("ms") ? 1 : 1e3);
			}
		});
		function handleClick(e) {
			if (!root.value) return;
			const { left, right, width } = root.value.getBoundingClientRect();
			const value = isReversed.value ? width - e.clientX + (right - width) : e.clientX - left;
			progress.value = Math.round(value / width * max.value);
		}
		function renderBackgroundBar() {
			return createElementVNode("div", {
				"class": normalizeClass(["v-progress-linear__background", backgroundColorClasses.value]),
				"style": normalizeStyle([
					backgroundColorStyles.value,
					{
						opacity: bgOpacity.value,
						width: props.stream ? 0 : void 0
					},
					props.indeterminate ? {} : splitStyles.value?.background
				])
			}, null);
		}
		function renderWavy() {
			if (!geometry.value) return null;
			const { width, stroke, wavelength, center, end, gap, track, wave, offset } = geometry.value;
			function renderTrack() {
				return createElementVNode("path", {
					"class": normalizeClass(["v-progress-linear__track", trackColorClasses.value]),
					"style": normalizeStyle([trackColorStyles.value, { opacity: bgOpacity.value }]),
					"d": track,
					"pathLength": "100"
				}, null);
			}
			function renderWave(bar) {
				return createElementVNode("path", {
					"class": normalizeClass(["v-progress-linear__wave", bar]),
					"d": wave,
					"pathLength": 100 + offset
				}, null);
			}
			return createElementVNode("svg", {
				"ref": svgEl,
				"class": normalizeClass([
					"v-progress-linear__wavy",
					{ "v-progress-linear__wavy--indeterminate": props.indeterminate },
					textColorClasses.value
				]),
				"style": normalizeStyle([textColorStyles.value, {
					"--v-progress-linear-stroke": convertToUnit$1(stroke),
					"--v-progress-linear-wavelength": convertToUnit$1(wavelength),
					"--v-progress-linear-wave-offset": offset,
					"--v-progress-linear-wave-gap": gap
				}]),
				"viewBox": `0 0 ${width} ${center * 2}`
			}, [props.indeterminate ? createElementVNode(Fragment, null, [
				renderTrack(),
				renderTrack(),
				renderTrack(),
				renderWave("long"),
				renderWave("short")
			]) : createElementVNode(Fragment, null, [
				renderTrack(),
				hasStopIndicator.value && createElementVNode("circle", {
					"class": "v-progress-linear__stop",
					"cx": end,
					"cy": center
				}, null),
				createElementVNode("path", {
					"ref": waveEl,
					"class": "v-progress-linear__wave"
				}, null)
			])]);
		}
		useRender$1(() => createVNode(props.tag, {
			"ref": root,
			"class": normalizeClass([
				"v-progress-linear",
				{
					"v-progress-linear--absolute": props.absolute,
					"v-progress-linear--active": props.active && isIntersecting.value,
					"v-progress-linear--reverse": isReversed.value,
					"v-progress-linear--rounded": props.rounded,
					"v-progress-linear--rounded-bar": props.roundedBar,
					"v-progress-linear--striped": props.striped,
					"v-progress-linear--clickable": props.clickable,
					"v-progress-linear--no-transition": props.transition === false,
					"v-progress-linear--revealing": ["initial", "pending"].includes(revealState.value),
					"v-progress-linear--variant-split": props.variant === "split",
					"v-progress-linear--shape-wavy": isWavy.value
				},
				roundedClasses.value,
				themeClasses.value,
				rtlClasses.value,
				props.class
			]),
			"style": normalizeStyle([
				{
					bottom: props.location === "bottom" ? 0 : void 0,
					top: props.location === "top" ? 0 : void 0,
					height: !props.active ? 0 : isWavy.value ? convertToUnit$1(parseFloat(props.height) + 6) : height.value,
					"--v-progress-linear-height": height.value,
					"--v-progress-linear-transition-duration": transitionDuration.value,
					"--v-progress-reveal-duration": `${revealDuration.value}ms`,
					"--v-progress-chunk-gap": convertToUnit$1(props.chunkGap),
					...props.absolute ? locationStyles.value : {}
				},
				isWavy.value ? void 0 : chunksMaskStyles.value,
				roundedStyles.value,
				props.style
			]),
			"role": "progressbar",
			"aria-hidden": props.active ? "false" : "true",
			"aria-valuemin": "0",
			"aria-valuemax": props.max,
			"aria-valuenow": props.indeterminate ? void 0 : Math.min(parseFloat(progress.value), max.value),
			"onClick": props.clickable && handleClick
		}, { default: () => [isWavy.value ? renderWavy() : createElementVNode(Fragment, null, [
			props.stream && createElementVNode("div", {
				"key": "stream",
				"class": normalizeClass(["v-progress-linear__stream", textColorClasses.value]),
				"style": {
					...textColorStyles.value,
					[isReversed.value ? "left" : "right"]: `calc(${height.value} * -1)`,
					borderTop: `calc(${height.value} / 2) dotted`,
					opacity: props.bufferOpacity != null ? parseFloat(props.bufferOpacity) : void 0,
					top: `calc(50% - ${height.value} / 4)`,
					width: convertToUnit$1(100 - normalizedBuffer.value, "%"),
					"--v-progress-linear-stream-to": `calc(${height.value} * ${isReversed.value ? 1 : -1})`
				}
			}, null),
			(props.variant !== "split" || !props.indeterminate) && renderBackgroundBar(),
			createElementVNode("div", {
				"class": normalizeClass(["v-progress-linear__buffer", bufferColorClasses.value]),
				"style": normalizeStyle([
					bufferColorStyles.value,
					{
						opacity: props.bufferOpacity != null ? parseFloat(props.bufferOpacity) : void 0,
						width: convertToUnit$1(bufferWidth.value, "%")
					},
					splitStyles.value?.buffer
				])
			}, null),
			hasStopIndicator.value && createElementVNode("div", {
				"class": normalizeClass(["v-progress-linear__stop", barColorClasses.value]),
				"style": normalizeStyle(barColorStyles.value)
			}, null),
			createVNode(Transition, { "name": transitionName.value }, { default: () => [!props.indeterminate ? createElementVNode("div", {
				"class": normalizeClass(["v-progress-linear__determinate", barColorClasses.value]),
				"style": normalizeStyle([
					barColorStyles.value,
					{ width: convertToUnit$1(barWidth.value, "%") },
					splitStyles.value?.bar
				])
			}, null) : createElementVNode("div", { "class": "v-progress-linear__indeterminate" }, [props.variant === "split" && createElementVNode(Fragment, null, [
				renderBackgroundBar(),
				renderBackgroundBar(),
				renderBackgroundBar()
			]), ["long", "short"].map((bar) => createElementVNode("div", {
				"key": bar,
				"class": normalizeClass([
					"v-progress-linear__indeterminate",
					bar,
					barColorClasses.value
				]),
				"style": normalizeStyle(barColorStyles.value)
			}, null))])] })
		]), slots.default && createElementVNode("div", { "class": "v-progress-linear__content" }, [slots.default({
			value: normalizedValue.value,
			buffer: normalizedBuffer.value
		})])] }));
		return {};
	}
});
// examples/package-consumer/node_modules/vuetify/lib/composables/loader.js
var makeLoaderProps$1 = propsFactory$1({ loading: [Boolean, String] }, "loader");
function useLoader$1(props, name = getCurrentInstanceName$1()) {
	return { loaderClasses: toRef(() => ({ [`${name}--loading`]: props.loading })) };
}
function LoaderSlot$1(props, { slots }) {
	return createElementVNode("div", { "class": normalizeClass(`${props.name}__loader`) }, [slots.default?.({
		color: props.color,
		isActive: props.active
	}) || createVNode(VProgressLinear$1, {
		"absolute": props.absolute,
		"active": props.active,
		"color": props.color,
		"height": "2",
		"indeterminate": true
	}, null)]);
}
// examples/package-consumer/node_modules/vuetify/lib/components/VField/VField.js
var allowedVariants$2 = [
	"underlined",
	"outlined",
	"filled",
	"solo",
	"solo-inverted",
	"solo-filled",
	"plain"
];
var makeVFieldProps$1 = propsFactory$1({
	appendInnerIcon: IconValue$1,
	bgColor: String,
	clearable: Boolean,
	clearIcon: {
		type: IconValue$1,
		default: "$clear"
	},
	active: Boolean,
	centerAffix: {
		type: Boolean,
		default: void 0
	},
	color: String,
	baseColor: String,
	dirty: Boolean,
	disabled: {
		type: Boolean,
		default: null
	},
	glow: Boolean,
	error: Boolean,
	flat: Boolean,
	iconColor: [Boolean, String],
	label: String,
	persistentClear: Boolean,
	prependInnerIcon: IconValue$1,
	reverse: Boolean,
	singleLine: Boolean,
	variant: {
		type: String,
		default: "filled",
		validator: (v) => allowedVariants$2.includes(v)
	},
	"onClick:clear": EventProp$1(),
	"onClick:appendInner": EventProp$1(),
	"onClick:prependInner": EventProp$1(),
	...makeComponentProps$1(),
	...makeLoaderProps$1(),
	...makeRoundedProps$1(),
	...makeThemeProps$1()
}, "VField");
var VField$1 = genericComponent$1()({
	name: "VField",
	inheritAttrs: false,
	props: {
		id: String,
		details: Boolean,
		labelId: String,
		...makeFocusProps$1(),
		...makeVFieldProps$1()
	},
	emits: {
		"update:focused": (focused) => true,
		"update:modelValue": (value) => true
	},
	setup(props, { attrs, emit, slots }) {
		const { themeClasses } = provideTheme$1(props);
		const { loaderClasses } = useLoader$1(props);
		const { focusClasses, isFocused, focus, blur } = useFocus$1(props);
		const { InputIcon } = useInputIcon$1(props);
		const { roundedClasses, roundedStyles } = useRounded$1(props);
		const { rtlClasses } = useRtl$1();
		const isActive = toRef(() => props.dirty || props.active);
		const hasLabel = toRef(() => !!(props.label || slots.label));
		const hasFloatingLabel = toRef(() => !props.singleLine && hasLabel.value);
		const uid = useId();
		const id = computed(() => props.id || `input-${uid}`);
		const messagesId = toRef(() => !props.details ? void 0 : `${id.value}-messages`);
		const labelRef = ref$1();
		const floatingLabelRef = ref$1();
		const controlRef = ref$1();
		const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
		const color = computed(() => {
			return props.error || props.disabled ? void 0 : isActive.value && isFocused.value ? props.color : props.baseColor;
		});
		const iconColor = computed(() => {
			if (props.iconColor === true || !props.iconColor && props.glow && isFocused.value) return color.value;
			if (!props.iconColor || props.glow && !isFocused.value) return void 0;
			return props.iconColor;
		});
		const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor$1(() => props.bgColor);
		const { textColorClasses, textColorStyles } = useTextColor$1(color);
		watch(isActive, (val) => {
			if (hasFloatingLabel.value && !PREFERS_REDUCED_MOTION$1()) {
				const el = labelRef.value.$el;
				const targetEl = floatingLabelRef.value.$el;
				requestAnimationFrame(() => {
					const rect = nullifyTransforms$1(el);
					const targetRect = new Box$1(targetEl);
					const x = targetRect.x - rect.x;
					const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);
					const targetWidth = targetRect.width / .75;
					const width = Math.abs(targetWidth - rect.width) > 1 ? { maxWidth: convertToUnit$1(targetWidth) } : void 0;
					const style = getComputedStyle(el);
					const targetStyle = getComputedStyle(targetEl);
					const duration = parseFloat(style.transitionDuration) * 1e3 || 150;
					const scale = parseFloat(targetStyle.getPropertyValue("--v-field-label-scale"));
					const color = targetStyle.getPropertyValue("color");
					el.style.visibility = "visible";
					targetEl.style.visibility = "hidden";
					animate$1(el, {
						transform: `translate(${x}px, ${y}px) scale(${scale})`,
						color,
						...width
					}, {
						duration,
						easing: standardEasing$1,
						direction: val ? "normal" : "reverse"
					}).finished.then(() => {
						el.style.removeProperty("visibility");
						targetEl.style.removeProperty("visibility");
					});
				});
			}
		}, { flush: "post" });
		const slotProps = computed(() => ({
			isActive,
			isFocused,
			controlRef,
			iconColor,
			blur,
			focus
		}));
		const floatingLabelProps = toRef(() => {
			const ariaHidden = !isActive.value;
			return {
				"aria-hidden": ariaHidden,
				for: ariaHidden ? void 0 : id.value
			};
		});
		const mainLabelProps = toRef(() => {
			const ariaHidden = hasFloatingLabel.value && isActive.value;
			return {
				"aria-hidden": ariaHidden,
				for: ariaHidden ? void 0 : id.value
			};
		});
		function onClick(e) {
			if (e.target !== getActiveElement$1()) e.preventDefault();
		}
		useRender$1(() => {
			const isOutlined = props.variant === "outlined";
			const hasPrepend = !!(slots["prepend-inner"] || props.prependInnerIcon);
			const hasClear = !!(props.clearable || slots.clear) && !props.disabled;
			const hasAppend = !!(slots["append-inner"] || props.appendInnerIcon || hasClear);
			const label = () => slots.label ? slots.label({
				...slotProps.value,
				label: props.label,
				props: { for: id.value }
			}) : props.label;
			return createElementVNode("div", mergeProps({
				"class": [
					"v-field",
					{
						"v-field--active": isActive.value,
						"v-field--appended": hasAppend,
						"v-field--center-affix": props.centerAffix ?? !isPlainOrUnderlined.value,
						"v-field--disabled": props.disabled,
						"v-field--dirty": props.dirty,
						"v-field--error": props.error,
						"v-field--glow": props.glow,
						"v-field--flat": props.flat,
						"v-field--has-background": !!props.bgColor,
						"v-field--persistent-clear": props.persistentClear,
						"v-field--prepended": hasPrepend,
						"v-field--reverse": props.reverse,
						"v-field--single-line": props.singleLine,
						"v-field--no-label": !label(),
						[`v-field--variant-${props.variant}`]: true
					},
					themeClasses.value,
					backgroundColorClasses.value,
					focusClasses.value,
					loaderClasses.value,
					roundedClasses.value,
					rtlClasses.value,
					props.class
				],
				"style": [
					backgroundColorStyles.value,
					roundedStyles.value,
					props.style
				],
				"onClick": onClick
			}, attrs), [
				createElementVNode("div", { "class": "v-field__overlay" }, null),
				createVNode(LoaderSlot$1, {
					"name": "v-field",
					"active": !!props.loading,
					"color": props.error ? "error" : /* @__PURE__ */ isString$1(props.loading) ? props.loading : props.color
				}, { default: slots.loader }),
				hasPrepend && createElementVNode("div", {
					"key": "prepend",
					"class": "v-field__prepend-inner"
				}, [slots["prepend-inner"] ? slots["prepend-inner"](slotProps.value) : props.prependInnerIcon && createVNode(InputIcon, {
					"key": "prepend-icon",
					"name": "prependInner",
					"color": iconColor.value
				}, null)]),
				createElementVNode("div", {
					"class": "v-field__field",
					"data-no-activator": ""
				}, [
					[
						"filled",
						"solo",
						"solo-inverted",
						"solo-filled"
					].includes(props.variant) && hasFloatingLabel.value && createVNode(VFieldLabel$1, mergeProps({
						"key": "floating-label",
						"ref": floatingLabelRef,
						"class": [textColorClasses.value],
						"floating": true
					}, floatingLabelProps.value, { "style": textColorStyles.value }), { default: () => [label()] }),
					hasLabel.value && createVNode(VFieldLabel$1, mergeProps({
						"key": "label",
						"ref": labelRef,
						"id": props.labelId
					}, mainLabelProps.value), { default: () => [label()] }),
					slots.default?.({
						...slotProps.value,
						props: {
							id: id.value,
							class: "v-field__input",
							"aria-describedby": messagesId.value
						},
						focus,
						blur
					}) ?? createElementVNode("div", {
						"id": id.value,
						"class": "v-field__input",
						"aria-describedby": messagesId.value
					}, null)
				]),
				hasClear && createVNode(VExpandXTransition$1, { "key": "clear" }, { default: () => [withDirectives(createElementVNode("div", {
					"class": "v-field__clearable",
					"onMousedown": (e) => {
						e.preventDefault();
						e.stopPropagation();
					}
				}, [createVNode(VDefaultsProvider$1, { "defaults": { VIcon: { icon: props.clearIcon } } }, { default: () => [slots.clear ? slots.clear({
					...slotProps.value,
					props: {
						onFocus: focus,
						onBlur: blur,
						onClick: props["onClick:clear"],
						tabindex: -1
					}
				}) : createVNode(InputIcon, {
					"name": "clear",
					"onFocus": focus,
					"onBlur": blur,
					"tabindex": -1
				}, null)] })]), [[vShow, props.dirty]])] }),
				hasAppend && createElementVNode("div", {
					"key": "append",
					"class": "v-field__append-inner"
				}, [slots["append-inner"] ? slots["append-inner"](slotProps.value) : props.appendInnerIcon && createVNode(InputIcon, {
					"key": "append-icon",
					"name": "appendInner",
					"color": iconColor.value
				}, null)]),
				createElementVNode("div", {
					"class": normalizeClass(["v-field__outline", textColorClasses.value]),
					"style": normalizeStyle(textColorStyles.value)
				}, [isOutlined && createElementVNode(Fragment, null, [
					createElementVNode("div", { "class": "v-field__outline__start" }, null),
					hasFloatingLabel.value && createElementVNode("div", { "class": "v-field__outline__notch" }, [createVNode(VFieldLabel$1, mergeProps({
						"ref": floatingLabelRef,
						"floating": true
					}, floatingLabelProps.value), { default: () => [label()] })]),
					createElementVNode("div", { "class": "v-field__outline__end" }, null)
				]), isPlainOrUnderlined.value && hasFloatingLabel.value && createVNode(VFieldLabel$1, mergeProps({
					"ref": floatingLabelRef,
					"floating": true
				}, floatingLabelProps.value), { default: () => [label()] })])
			]);
		});
		return {
			controlRef,
			fieldIconColor: iconColor
		};
	}
});
// examples/package-consumer/node_modules/vuetify/lib/components/VMessages/VMessages.js
var makeVMessagesProps$1 = propsFactory$1({
	active: Boolean,
	color: String,
	messages: {
		type: [Array, String],
		default: () => []
	},
	...makeComponentProps$1(),
	...makeTransitionProps$2({ transition: {
		component: VSlideYTransition$1,
		leaveAbsolute: true,
		group: true
	} })
}, "VMessages");
var VMessages$1 = genericComponent$1()({
	name: "VMessages",
	props: makeVMessagesProps$1(),
	setup(props, { slots }) {
		const messages = computed(() => wrapInArray$1(props.messages));
		const { textColorClasses, textColorStyles } = useTextColor$1(() => props.color);
		useRender$1(() => createVNode(MaybeTransition$1, {
			"transition": props.transition,
			"tag": "div",
			"class": normalizeClass([
				"v-messages",
				textColorClasses.value,
				props.class
			]),
			"style": normalizeStyle([textColorStyles.value, props.style])
		}, { default: () => [props.active && messages.value.map((message, i) => createElementVNode("div", {
			"class": "v-messages__message",
			"key": `${i}-${messages.value}`
		}, [slots.message ? slots.message({ message }) : message]))] }));
		return {};
	}
});
// examples/package-consumer/node_modules/vuetify/lib/composables/density.js
var allowedDensities$1 = [
	null,
	"default",
	"comfortable",
	"compact"
];
var makeDensityProps$1 = propsFactory$1({ density: {
	type: String,
	default: "default",
	validator: (v) => allowedDensities$1.includes(v)
} }, "density");
function useDensity$1(props, name = getCurrentInstanceName$1()) {
	return { densityClasses: toRef(() => {
		return `${name}--density-${props.density}`;
	}) };
}
// examples/package-consumer/node_modules/vuetify/lib/composables/dimensions.js
var makeDimensionProps$1 = propsFactory$1({
	height: [Number, String],
	maxHeight: [Number, String],
	maxWidth: [Number, String],
	minHeight: [Number, String],
	minWidth: [Number, String],
	width: [Number, String]
}, "dimension");
function useDimension$1(props) {
	return { dimensionStyles: computed(() => {
		const styles = {};
		const height = convertToUnit$1(props.height);
		const maxHeight = convertToUnit$1(props.maxHeight);
		const maxWidth = convertToUnit$1(props.maxWidth);
		const minHeight = convertToUnit$1(props.minHeight);
		const minWidth = convertToUnit$1(props.minWidth);
		const width = convertToUnit$1(props.width);
		if (height) styles.height = height;
		if (maxHeight) styles.maxHeight = maxHeight;
		if (maxWidth) styles.maxWidth = maxWidth;
		if (minHeight) styles.minHeight = minHeight;
		if (minWidth) styles.minWidth = minWidth;
		if (width) styles.width = width;
		return styles;
	}) };
}
// examples/package-consumer/node_modules/vuetify/lib/composables/form.js
var FormKey$1 = Symbol.for("vuetify:form");
function useForm$1(props) {
	const form = inject(FormKey$1, null);
	return {
		...form,
		isReadonly: computed(() => !!(props?.readonly ?? form?.isReadonly.value)),
		isDisabled: computed(() => !!(props?.disabled ?? form?.isDisabled.value))
	};
}
// examples/package-consumer/node_modules/vuetify/lib/composables/rules/rules.js
var RulesSymbol$1 = Symbol.for("vuetify:rules");
function useRules$1(fn) {
	const rules = inject(RulesSymbol$1, null);
	if (!fn) {
		if (!rules) throw new Error("Could not find Vuetify rules injection");
		return rules.aliases;
	}
	return rules?.resolve(fn) ?? toRef(fn);
}
// examples/package-consumer/node_modules/vuetify/lib/composables/validation.js
var makeValidationProps$1 = propsFactory$1({
	disabled: {
		type: Boolean,
		default: null
	},
	error: Boolean,
	errorMessages: {
		type: [Array, String],
		default: () => []
	},
	maxErrors: {
		type: [Number, String],
		default: 1
	},
	name: String,
	label: String,
	readonly: {
		type: Boolean,
		default: null
	},
	rules: {
		type: Array,
		default: () => []
	},
	modelValue: null,
	validateOn: String,
	validationValue: null,
	...makeFocusProps$1()
}, "validation");
function useValidation$1(props, name = getCurrentInstanceName$1(), id = useId()) {
	const model = useProxiedModel$1(props, "modelValue");
	const validationModel = computed(() => /* @__PURE__ */ isUndefined$1(props.validationValue) ? model.value : props.validationValue);
	const form = useForm$1(props);
	const rules = useRules$1(() => props.rules);
	const internalErrorMessages = ref$1([]);
	const isPristine = shallowRef(true);
	const isDirty = computed(() => !!(wrapInArray$1(model.value === "" ? null : model.value).length || wrapInArray$1(validationModel.value === "" ? null : validationModel.value).length));
	const errorMessages = computed(() => {
		return props.errorMessages?.length ? wrapInArray$1(props.errorMessages).concat(internalErrorMessages.value).slice(0, Math.max(0, Number(props.maxErrors))) : internalErrorMessages.value;
	});
	const validateOn = computed(() => {
		let value = (props.validateOn ?? form.validateOn?.value) || "input";
		if (value === "lazy") value = "input lazy";
		if (value === "eager") value = "input eager";
		const set = new Set(value?.split(" ") ?? []);
		return {
			input: set.has("input"),
			blur: set.has("blur") || set.has("input") || set.has("invalid-input"),
			invalidInput: set.has("invalid-input"),
			lazy: set.has("lazy"),
			eager: set.has("eager")
		};
	});
	const isValid = computed(() => {
		if (props.error || props.errorMessages?.length) return false;
		if (!props.rules.length) return true;
		if (isPristine.value) return internalErrorMessages.value.length || validateOn.value.lazy ? null : true;
		else return !internalErrorMessages.value.length;
	});
	const isValidating = shallowRef(false);
	let isResetting = false;
	const validationClasses = computed(() => {
		return {
			[`${name}--error`]: isValid.value === false,
			[`${name}--dirty`]: isDirty.value,
			[`${name}--disabled`]: form.isDisabled.value,
			[`${name}--readonly`]: form.isReadonly.value
		};
	});
	const vm = getCurrentInstance$2("validation");
	const uid = computed(() => props.name ?? unref(id));
	onBeforeMount(() => {
		form.register?.({
			id: uid.value,
			vm,
			validate,
			reset,
			resetValidation
		});
	});
	onBeforeUnmount(() => {
		form.unregister?.(uid.value);
	});
	onMounted(async () => {
		if (!validateOn.value.lazy) await validate(!validateOn.value.eager);
		form.update?.(uid.value, isValid.value, errorMessages.value);
	});
	useToggleScope$1(() => validateOn.value.input || validateOn.value.invalidInput && isValid.value === false, () => {
		watch(validationModel, () => {
			if (!isResetting) validate();
		});
	});
	useToggleScope$1(() => validateOn.value.blur, () => {
		watch(() => props.focused, (val) => {
			if (!val) validate();
		});
	});
	watch([isValid, errorMessages], () => {
		form.update?.(uid.value, isValid.value, errorMessages.value);
	});
	async function reset() {
		isResetting = true;
		model.value = null;
		await nextTick$1();
		isResetting = false;
		await resetValidation();
	}
	async function resetValidation() {
		isPristine.value = true;
		if (!validateOn.value.lazy) await validate(!validateOn.value.eager);
		else internalErrorMessages.value = [];
	}
	async function validate(silent = false) {
		const results = [];
		isValidating.value = true;
		for (const rule of rules.value) {
			if (results.length >= Number(props.maxErrors ?? 1)) break;
			const result = await (/* @__PURE__ */ isFunction$1(rule) ? rule : () => rule)(validationModel.value);
			if (result === true) continue;
			if (result !== false && !/* @__PURE__ */ isString$1(result)) {
				console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`);
				continue;
			}
			results.push(result || "");
		}
		internalErrorMessages.value = results;
		isValidating.value = false;
		isPristine.value = silent;
		return internalErrorMessages.value;
	}
	return {
		errorMessages,
		isDirty,
		isDisabled: form.isDisabled,
		isReadonly: form.isReadonly,
		isPristine,
		isValid,
		isValidating,
		reset,
		resetValidation,
		validate,
		validationClasses
	};
}
// examples/package-consumer/node_modules/vuetify/lib/components/VInput/VInput.js
var makeVInputProps$1 = propsFactory$1({
	id: String,
	appendIcon: IconValue$1,
	baseColor: String,
	centerAffix: {
		type: Boolean,
		default: true
	},
	color: String,
	glow: Boolean,
	iconColor: [Boolean, String],
	prependIcon: IconValue$1,
	detailsActive: {
		type: Boolean,
		default: null
	},
	hideDetails: [Boolean, String],
	hideSpinButtons: Boolean,
	hint: String,
	indentDetails: {
		type: Boolean,
		default: null
	},
	persistentHint: Boolean,
	messages: {
		type: [Array, String],
		default: () => []
	},
	direction: {
		type: String,
		default: "horizontal",
		validator: (v) => ["horizontal", "vertical"].includes(v)
	},
	"onClick:prepend": EventProp$1(),
	"onClick:append": EventProp$1(),
	...makeComponentProps$1(),
	...makeDensityProps$1(),
	...pick$1(makeDimensionProps$1(), [
		"maxWidth",
		"minWidth",
		"width"
	]),
	...makeThemeProps$1(),
	...makeValidationProps$1()
}, "VInput");
var VInput$1 = genericComponent$1()({
	name: "VInput",
	props: { ...makeVInputProps$1() },
	emits: { "update:modelValue": (value) => true },
	setup(props, { attrs, slots, emit }) {
		const { densityClasses } = useDensity$1(props);
		const { dimensionStyles } = useDimension$1(props);
		const { themeClasses } = provideTheme$1(props);
		const { rtlClasses } = useRtl$1();
		const { InputIcon } = useInputIcon$1(props);
		const uid = useId();
		const id = computed(() => props.id || `input-${uid}`);
		const { errorMessages, isDirty, isDisabled, isReadonly, isPristine, isValid, isValidating, reset, resetValidation, validate, validationClasses } = useValidation$1(props, "v-input", id);
		const messages = computed(() => {
			if (props.errorMessages?.length || !isPristine.value && errorMessages.value.length) return errorMessages.value;
			else if (props.hint && (props.persistentHint || props.focused)) return props.hint;
			else return props.messages;
		});
		const hasMessages = toRef(() => messages.value.length > 0);
		const hasDetails = toRef(() => !props.hideDetails || props.hideDetails === "auto" && (hasMessages.value || (props.detailsActive ?? !!slots.details)));
		const messagesId = computed(() => hasDetails.value ? `${id.value}-messages` : void 0);
		const slotProps = computed(() => ({
			id,
			messagesId,
			isDirty,
			isDisabled,
			isReadonly,
			isPristine,
			isValid,
			isValidating,
			hasDetails,
			reset,
			resetValidation,
			validate
		}));
		const color = toRef(() => {
			return props.error || props.disabled ? void 0 : props.focused ? props.color : props.baseColor;
		});
		const iconColor = toRef(() => {
			if (!props.iconColor) return void 0;
			return props.iconColor === true ? color.value : props.iconColor;
		});
		useRender$1(() => {
			const hasPrepend = !!(slots.prepend || props.prependIcon);
			const hasAppend = !!(slots.append || props.appendIcon);
			return createElementVNode("div", {
				"class": normalizeClass([
					"v-input",
					`v-input--${props.direction}`,
					{
						"v-input--center-affix": props.centerAffix,
						"v-input--focused": props.focused,
						"v-input--glow": props.glow,
						"v-input--hide-spin-buttons": props.hideSpinButtons,
						"v-input--indent-details": props.indentDetails
					},
					densityClasses.value,
					themeClasses.value,
					rtlClasses.value,
					validationClasses.value,
					props.class
				]),
				"style": normalizeStyle([dimensionStyles.value, props.style])
			}, [
				hasPrepend && createElementVNode("div", {
					"key": "prepend",
					"class": "v-input__prepend"
				}, [slots.prepend ? slots.prepend(slotProps.value) : props.prependIcon && createVNode(InputIcon, {
					"key": "prepend-icon",
					"name": "prepend",
					"color": iconColor.value
				}, null)]),
				slots.default && createElementVNode("div", { "class": "v-input__control" }, [slots.default?.(slotProps.value)]),
				hasAppend && createElementVNode("div", {
					"key": "append",
					"class": "v-input__append"
				}, [slots.append ? slots.append(slotProps.value) : props.appendIcon && createVNode(InputIcon, {
					"key": "append-icon",
					"name": "append",
					"color": iconColor.value
				}, null)]),
				props.hideDetails !== true && createElementVNode("div", {
					"id": messagesId.value,
					"class": normalizeClass(["v-input__details", { "v-input__details--hidden": !hasDetails.value }]),
					"role": "alert",
					"aria-live": "polite"
				}, [createVNode(VMessages$1, {
					"active": hasMessages.value,
					"messages": messages.value
				}, { message: slots.message }), slots.details?.(slotProps.value)])
			]);
		});
		return {
			reset,
			resetValidation,
			validate,
			isValid,
			errorMessages
		};
	}
});
// examples/package-consumer/node_modules/vuetify/lib/composables/autocomplete.js
var makeAutocompleteProps$1 = propsFactory$1({ autocomplete: String }, "autocomplete");
function useAutocomplete$1(props) {
	const uniqueId = useId();
	const reloadTrigger = shallowRef(0);
	const isSuppressing = toRef(() => props.autocomplete === "suppress");
	const fieldName = toRef(() => {
		if (!props.name) return void 0;
		return isSuppressing.value ? `${props.name}-${uniqueId}-${reloadTrigger.value}` : props.name;
	});
	return {
		isSuppressing,
		fieldAutocomplete: toRef(() => {
			return isSuppressing.value ? "off" : props.autocomplete;
		}),
		fieldName,
		update: () => reloadTrigger.value = (/* @__PURE__ */ new Date()).getTime()
	};
}
// examples/package-consumer/node_modules/vuetify/lib/composables/autofocus.js
function useAutofocus$1(props) {
	function onIntersect(isIntersecting, entries) {
		if (!props.autofocus || !isIntersecting) return;
		const el = entries[0].target;
		const target = el.matches("input,textarea") ? el : el.querySelector("input,textarea");
		setTimeout(() => target?.focus(), 50);
	}
	return { onIntersect };
}
// examples/package-consumer/node_modules/vuetify/lib/composables/forwardRefs.js
var Refs$1 = Symbol("Forwarded refs");
/** Omit properties starting with P */
/** Omit keyof $props from T */
function getDescriptor$1(obj, key) {
	let currentObj = obj;
	while (currentObj) {
		const descriptor = Reflect.getOwnPropertyDescriptor(currentObj, key);
		if (descriptor) return descriptor;
		currentObj = Object.getPrototypeOf(currentObj);
	}
}
function forwardRefs$1(target, ...refs) {
	target[Refs$1] = refs;
	return new Proxy(target, {
		get(target, key) {
			if (Reflect.has(target, key)) return Reflect.get(target, key);
			if (/* @__PURE__ */ isSymbol$1(key) || key.startsWith("$") || key.startsWith("__")) return;
			for (const ref of refs) if (ref.value && Reflect.has(ref.value, key)) {
				const val = Reflect.get(ref.value, key);
				return /* @__PURE__ */ isFunction$1(val) ? val.bind(ref.value) : val;
			}
		},
		has(target, key) {
			if (Reflect.has(target, key)) return true;
			if (/* @__PURE__ */ isSymbol$1(key) || key.startsWith("$") || key.startsWith("__")) return false;
			for (const ref of refs) if (ref.value && Reflect.has(ref.value, key)) return true;
			return false;
		},
		set(target, key, value) {
			if (Reflect.has(target, key)) return Reflect.set(target, key, value);
			if (/* @__PURE__ */ isSymbol$1(key) || key.startsWith("$") || key.startsWith("__")) return false;
			for (const ref of refs) if (ref.value && Reflect.has(ref.value, key)) return Reflect.set(ref.value, key, value);
			return false;
		},
		getOwnPropertyDescriptor(target, key) {
			const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
			if (descriptor) return descriptor;
			if (/* @__PURE__ */ isSymbol$1(key) || key.startsWith("$") || key.startsWith("__")) return;
			for (const ref of refs) {
				if (!ref.value) continue;
				const descriptor = getDescriptor$1(ref.value, key) ?? ("_" in ref.value ? getDescriptor$1(ref.value._?.setupState, key) : void 0);
				if (descriptor) return descriptor;
			}
			for (const ref of refs) {
				const childRefs = ref.value && ref.value[Refs$1];
				if (!childRefs) continue;
				const queue = childRefs.slice();
				while (queue.length) {
					const ref = queue.shift();
					const descriptor = getDescriptor$1(ref.value, key);
					if (descriptor) return descriptor;
					const childRefs = ref.value && ref.value[Refs$1];
					if (childRefs) queue.push(...childRefs);
				}
			}
		}
	});
}
// examples/package-consumer/node_modules/vuetify/lib/directives/intersect/index.js
function mounted$2(el, binding) {
	if (!SUPPORTS_INTERSECTION$1) return;
	const modifiers = binding.modifiers || {};
	const value = binding.value;
	const handler = /* @__PURE__ */ isFunction$1(value) || !/* @__PURE__ */ isObject$1(value) ? value : value.handler;
	const options = /* @__PURE__ */ isFunction$1(value) || !/* @__PURE__ */ isObject$1(value) ? {} : value.options;
	const observer = new IntersectionObserver((entries = [], observer) => {
		const _observe = el._observe?.[binding.instance.$.uid];
		if (!_observe) return;
		const isIntersecting = entries.some((entry) => entry.isIntersecting);
		if (handler && (!modifiers.quiet || _observe.init) && (!modifiers.once || isIntersecting || _observe.init)) handler(isIntersecting, entries, observer);
		if (isIntersecting && modifiers.once) unmounted$2(el, binding);
		else _observe.init = true;
	}, options);
	el._observe = Object(el._observe);
	el._observe[binding.instance.$.uid] = {
		init: false,
		observer
	};
	observer.observe(el);
}
function unmounted$2(el, binding) {
	const observe = el._observe?.[binding.instance.$.uid];
	if (!observe) return;
	observe.observer.unobserve(el);
	delete el._observe[binding.instance.$.uid];
}
var Intersect$1 = {
	mounted: mounted$2,
	unmounted: unmounted$2,
	updated: (el, binding) => {
		if (el._observe?.[binding.instance.$.uid]) {
			unmounted$2(el, binding);
			mounted$2(el, binding);
		}
	}
};
// examples/package-consumer/node_modules/vuetify/lib/components/VTextField/VTextField.js
var activeTypes$1 = [
	"color",
	"file",
	"time",
	"date",
	"datetime-local",
	"week",
	"month"
];
var makeVTextFieldProps$1 = propsFactory$1({
	autofocus: Boolean,
	counter: {
		type: [
			Boolean,
			Number,
			String
		],
		default: void 0
	},
	counterValue: [Number, Function],
	prefix: String,
	placeholder: String,
	persistentPlaceholder: Boolean,
	persistentCounter: Boolean,
	suffix: String,
	role: String,
	type: {
		type: String,
		default: "text"
	},
	modelModifiers: Object,
	...makeAutocompleteProps$1(),
	...omit$1(makeVInputProps$1(), ["direction"]),
	...makeVFieldProps$1()
}, "VTextField");
var VTextField = genericComponent$1()({
	name: "VTextField",
	directives: { vIntersect: Intersect$1 },
	inheritAttrs: false,
	props: makeVTextFieldProps$1(),
	emits: {
		"click:control": (e) => true,
		"mousedown:control": (e) => true,
		"update:focused": (focused) => true,
		"update:modelValue": (val) => true
	},
	setup(props, { attrs, emit, slots }) {
		const model = useProxiedModel$1(props, "modelValue", void 0, (v) => {
			if (Object.is(v, -0)) return "-0";
			return v;
		});
		const { isFocused, focus, blur } = useFocus$1(props);
		const { onIntersect } = useAutofocus$1(props);
		const counterValue = computed(() => {
			return /* @__PURE__ */ isFunction$1(props.counterValue) ? props.counterValue(model.value) : /* @__PURE__ */ isNumber$1(props.counterValue) ? props.counterValue : (model.value ?? "").toString().length;
		});
		const max = computed(() => {
			if (attrs.maxlength) return attrs.maxlength;
			if (!props.counter || !/* @__PURE__ */ isNumber$1(props.counter) && !/* @__PURE__ */ isString$1(props.counter)) return void 0;
			return props.counter;
		});
		const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
		const vInputRef = ref$1();
		const vFieldRef = ref$1();
		const inputRef = ref$1();
		watch(() => props.type, () => void inputRef.value?.offsetHeight, { flush: "post" });
		const autocomplete = useAutocomplete$1(props);
		const isActive = computed(() => activeTypes$1.includes(props.type) || props.persistentPlaceholder || isFocused.value || props.active);
		function onFocus() {
			if (autocomplete.isSuppressing.value) autocomplete.update();
			if (!isFocused.value) focus();
			nextTick$1(() => {
				if (inputRef.value !== getActiveElement$1()) inputRef.value?.focus();
			});
		}
		function onControlMousedown(e) {
			emit("mousedown:control", e);
			if (e.target === inputRef.value) return;
			onFocus();
			e.preventDefault();
		}
		function onControlClick(e) {
			emit("click:control", e);
		}
		function onClear(e, reset) {
			e.stopPropagation();
			onFocus();
			nextTick$1(() => {
				reset();
				callEvent$1(props["onClick:clear"], e);
			});
		}
		function onInput(e) {
			const el = e.target;
			if (!(props.modelModifiers?.trim && [
				"text",
				"search",
				"password",
				"tel",
				"url"
			].includes(props.type))) {
				model.value = el.value;
				return;
			}
			const value = el.value;
			const start = el.selectionStart;
			const end = el.selectionEnd;
			model.value = value;
			nextTick$1(() => {
				let offset = 0;
				if (value.trimStart().length === el.value.length) offset = value.length - el.value.length;
				if (start != null) el.selectionStart = start - offset;
				if (end != null) el.selectionEnd = end - offset;
			});
		}
		useRender$1(() => {
			const hasCounter = !!(slots.counter || props.counter !== void 0);
			const counterActive = props.counter !== false && props.counter !== null && (props.persistentCounter || isFocused.value);
			const hasDetails = props.hideDetails !== true && !!(slots.details || hasCounter);
			const detailsActive = !!(slots.details || hasCounter && counterActive);
			const [rootAttrs, inputAttrs] = filterInputAttrs$1(attrs);
			const { modelValue: _, ...inputProps } = VInput$1.filterProps(props);
			const fieldProps = VField$1.filterProps(props);
			return createVNode(VInput$1, mergeProps({
				"ref": vInputRef,
				"modelValue": model.value,
				"onUpdate:modelValue": ($event) => model.value = $event,
				"class": [
					"v-text-field",
					{
						"v-text-field--prefixed": props.prefix,
						"v-text-field--suffixed": props.suffix,
						"v-input--plain-underlined": isPlainOrUnderlined.value
					},
					props.class
				],
				"style": props.style
			}, rootAttrs, inputProps, {
				"centerAffix": !isPlainOrUnderlined.value,
				"focused": isFocused.value,
				"detailsActive": detailsActive,
				"indentDetails": props.indentDetails ?? !isPlainOrUnderlined.value
			}), {
				...slots,
				default: ({ id, isDisabled, isDirty, isReadonly, isValid, hasDetails, reset }) => createVNode(VField$1, mergeProps({
					"ref": vFieldRef,
					"onMousedown": onControlMousedown,
					"onClick": onControlClick,
					"onClick:clear": (e) => onClear(e, reset),
					"role": props.role
				}, omit$1(fieldProps, ["onClick:clear"]), {
					"id": id.value,
					"labelId": `${id.value}-label`,
					"active": isActive.value || isDirty.value,
					"dirty": isDirty.value || props.dirty,
					"disabled": isDisabled.value,
					"focused": isFocused.value,
					"details": hasDetails.value,
					"error": isValid.value === false
				}), {
					...slots,
					default: ({ props: { class: fieldClass, ...slotProps }, controlRef }) => {
						const inputNode = createElementVNode("input", mergeProps({
							"ref": (val) => inputRef.value = controlRef.value = val,
							"value": model.value,
							"onInput": onInput,
							"autofocus": props.autofocus,
							"readonly": isReadonly.value,
							"disabled": isDisabled.value,
							"name": autocomplete.fieldName.value,
							"autocomplete": autocomplete.fieldAutocomplete.value,
							"placeholder": props.placeholder,
							"size": 1,
							"role": props.role,
							"type": props.type,
							"onFocus": focus,
							"onBlur": blur,
							"aria-labelledby": `${id.value}-label`
						}, slotProps, inputAttrs), null);
						return createElementVNode(Fragment, null, [
							props.prefix && createElementVNode("span", { "class": "v-text-field__prefix" }, [createElementVNode("span", { "class": "v-text-field__prefix__text" }, [props.prefix])]),
							withDirectives(slots.default ? createElementVNode("div", {
								"class": normalizeClass(fieldClass),
								"data-no-activator": ""
							}, [slots.default({ id }), inputNode]) : cloneVNode(inputNode, { class: fieldClass }), [[
								Intersect$1,
								onIntersect,
								null,
								{ once: true }
							]]),
							props.suffix && createElementVNode("span", { "class": "v-text-field__suffix" }, [createElementVNode("span", { "class": "v-text-field__suffix__text" }, [props.suffix])])
						]);
					}
				}),
				details: hasDetails ? (slotProps) => createElementVNode(Fragment, null, [slots.details?.(slotProps), hasCounter && createElementVNode(Fragment, null, [createElementVNode("span", null, null), createVNode(VCounter$1, {
					"active": counterActive,
					"value": counterValue.value,
					"max": max.value,
					"disabled": props.disabled
				}, slots.counter)])]) : void 0
			});
		});
		return forwardRefs$1({}, vInputRef, vFieldRef, inputRef);
	}
});
// examples/package-consumer/node_modules/vuetify/lib/components/VGrid/VContainer.js
var makeVContainerProps$1 = propsFactory$1({
	fluid: {
		type: Boolean,
		default: false
	},
	...makeComponentProps$1(),
	...makeDimensionProps$1(),
	...makeTagProps$1()
}, "VContainer");
var VContainer$1 = genericComponent$1()({
	name: "VContainer",
	props: makeVContainerProps$1(),
	setup(props, { slots }) {
		const { rtlClasses } = useRtl$1();
		const { dimensionStyles } = useDimension$1(props);
		useRender$1(() => createVNode(props.tag, {
			"class": normalizeClass([
				"v-container",
				{ "v-container--fluid": props.fluid },
				rtlClasses.value,
				props.class
			]),
			"style": normalizeStyle([dimensionStyles.value, props.style])
		}, slots));
		return {};
	}
});
// examples/package-consumer/node_modules/vuetify/lib/composables/display.js
var breakpoints$1 = [
	"sm",
	"md",
	"lg",
	"xl",
	"xxl"
];
// examples/package-consumer/node_modules/vuetify/lib/components/VGrid/VCol.js
var breakpointProps$1 = (() => {
	return breakpoints$1.reduce((props, val) => {
		props[val] = {
			type: [
				Boolean,
				String,
				Number
			],
			default: false
		};
		return props;
	}, {});
})();
var offsetProps$1 = (() => {
	return breakpoints$1.reduce((props, val) => {
		const offsetKey = "offset" + capitalize(val);
		props[offsetKey] = {
			type: [String, Number],
			default: null
		};
		return props;
	}, {});
})();
var propMap$3 = {
	col: keys$1(breakpointProps$1),
	offset: keys$1(offsetProps$1),
	order: [
		"order",
		"orderSm",
		"orderMd",
		"orderLg",
		"orderXl",
		"orderXxl"
	]
};
function parseCols$1(val) {
	if (/* @__PURE__ */ isString$1(val) && val.includes("/")) {
		const [cols, size] = val.split("/");
		return {
			cols: Number(cols),
			size: Number(size)
		};
	}
	return { cols: val };
}
function parseBreakpoint$1(type, prop, val) {
	if (val == null || val === false) return {};
	const { cols, size } = parseCols$1(val);
	const breakpoint = prop.replace(type, "").toLowerCase();
	if (type === "offset") return {
		className: `v-col--offset-${breakpoint}-${cols}`,
		variables: [{ [`--v-col-offset-base-${breakpoint}`]: size }]
	};
	else if (type === "order") return { className: `order-${breakpoint}-${cols}` };
	return {
		className: cols === "" || cols === true ? `v-col--${breakpoint}` : `v-col--cols-${breakpoint}-${cols}`,
		variables: [{ [`--v-col-size-base-${breakpoint}`]: size }]
	};
}
var ALIGN_SELF_VALUES$1 = [
	"auto",
	"start",
	"end",
	"center",
	"baseline",
	"stretch"
];
var alignSelfValidator$1 = (str) => ALIGN_SELF_VALUES$1.includes(str);
var makeVColProps$1 = propsFactory$1({
	cols: {
		type: [
			Boolean,
			String,
			Number
		],
		default: false
	},
	...breakpointProps$1,
	offset: {
		type: [String, Number],
		default: null
	},
	...offsetProps$1,
	/** @deprecated use order-* class instead */
	order: {
		type: [String, Number],
		default: null
	},
	/** @deprecated use order-sm-* class instead */
	orderSm: {
		type: [String, Number],
		default: null
	},
	/** @deprecated use order-md-* class instead */
	orderMd: {
		type: [String, Number],
		default: null
	},
	/** @deprecated use order-lg-* class instead */
	orderLg: {
		type: [String, Number],
		default: null
	},
	/** @deprecated use order-xl-* class instead */
	orderXl: {
		type: [String, Number],
		default: null
	},
	/** @deprecated use order-xxl-* class instead */
	orderXxl: {
		type: [String, Number],
		default: null
	},
	/** @deprecated use align-self-* class instead */
	alignSelf: {
		type: String,
		default: null,
		validator: alignSelfValidator$1
	},
	...makeComponentProps$1(),
	...makeTagProps$1()
}, "VCol");
var VCol$1 = genericComponent$1()({
	name: "VCol",
	props: makeVColProps$1(),
	setup(props, { slots }) {
		const sizeBaseOverride = computed(() => parseCols$1(props.cols).size);
		const offsetBaseOverride = computed(() => parseCols$1(props.offset).size);
		const responsive = computed(() => {
			const classList = ["v-col"];
			const variablesList = [];
			let type;
			for (type in propMap$3) propMap$3[type].forEach((prop) => {
				const value = props[prop];
				const { className, variables } = parseBreakpoint$1(type, prop, value);
				if (className) classList.push(className);
				if (variables) variablesList.push(...variables);
			});
			const { cols } = parseCols$1(props.cols);
			const { cols: offset } = parseCols$1(props.offset);
			classList.push({
				[`v-col--cols-${cols}`]: cols,
				[`v-col--offset-${offset}`]: offset,
				[`order-${props.order}`]: props.order,
				[`align-self-${props.alignSelf}`]: props.alignSelf
			});
			return {
				classes: classList,
				variables: variablesList
			};
		});
		return () => h$1(props.tag, {
			class: [responsive.value.classes, props.class],
			style: [
				{ "--v-col-size-base": sizeBaseOverride.value },
				{ "--v-col-offset-base": offsetBaseOverride.value },
				responsive.value.variables,
				props.style
			]
		}, slots.default?.());
	}
});
// examples/package-consumer/node_modules/vuetify/lib/components/VGrid/VRow.js
var ALIGNMENT$1 = [
	"start",
	"end",
	"center"
];
var SPACE$1 = [
	"space-between",
	"space-around",
	"space-evenly"
];
var ALIGN_VALUES$1 = [
	...ALIGNMENT$1,
	"baseline",
	"stretch"
];
var alignValidator$1 = (str) => ALIGN_VALUES$1.includes(str);
var JUSTIFY_VALUES$1 = [...ALIGNMENT$1, ...SPACE$1];
var justifyValidator$1 = (str) => JUSTIFY_VALUES$1.includes(str);
var ALIGN_CONTENT_VALUES$1 = [
	...ALIGNMENT$1,
	...SPACE$1,
	"stretch"
];
var alignContentValidator$1 = (str) => ALIGN_CONTENT_VALUES$1.includes(str);
var propMap$2 = {
	align: [
		"align",
		"alignSm",
		"alignMd",
		"alignLg",
		"alignXl",
		"alignXxl"
	],
	justify: [
		"justify",
		"justifySm",
		"justifyMd",
		"justifyLg",
		"justifyXl",
		"justifyXxl"
	],
	alignContent: [
		"alignContent",
		"alignContentSm",
		"alignContentMd",
		"alignContentLg",
		"alignContentXl",
		"alignContentXxl"
	]
};
var gapProps$1 = [
	"gap",
	"gapSm",
	"gapMd",
	"gapLg",
	"gapXl",
	"gapXxl"
];
var classMap$1 = {
	align: "align",
	justify: "justify",
	alignContent: "align-content"
};
function breakpointClass$1(type, prop, val) {
	let className = classMap$1[type];
	if (val == null) return;
	if (prop) {
		const breakpoint = prop.replace(type, "");
		className += `-${breakpoint}`;
	}
	className += `-${val}`;
	return className.toLowerCase();
}
var makeVRowProps$1 = propsFactory$1({
	/** @deprecated use density="compact" instead */
	dense: Boolean,
	/** @deprecated use align-* class instead */
	align: {
		type: String,
		default: null,
		validator: alignValidator$1
	},
	/** @deprecated use align-sm-* class instead */
	alignSm: {
		type: String,
		default: null,
		validator: alignValidator$1
	},
	/** @deprecated use align-md-* class instead */
	alignMd: {
		type: String,
		default: null,
		validator: alignValidator$1
	},
	/** @deprecated use align-lg-* class instead */
	alignLg: {
		type: String,
		default: null,
		validator: alignValidator$1
	},
	/** @deprecated use align-xl-* class instead */
	alignXl: {
		type: String,
		default: null,
		validator: alignValidator$1
	},
	/** @deprecated use align-xxl-* class instead */
	alignXxl: {
		type: String,
		default: null,
		validator: alignValidator$1
	},
	/** @deprecated use justify-* class instead */
	justify: {
		type: String,
		default: null,
		validator: justifyValidator$1
	},
	/** @deprecated use justify-sm-* class instead */
	justifySm: {
		type: String,
		default: null,
		validator: justifyValidator$1
	},
	/** @deprecated use justify-md-* class instead */
	justifyMd: {
		type: String,
		default: null,
		validator: justifyValidator$1
	},
	/** @deprecated use justify-lg-* class instead */
	justifyLg: {
		type: String,
		default: null,
		validator: justifyValidator$1
	},
	/** @deprecated use justify-xl-* class instead */
	justifyXl: {
		type: String,
		default: null,
		validator: justifyValidator$1
	},
	/** @deprecated use justify-xxl-* class instead */
	justifyXxl: {
		type: String,
		default: null,
		validator: justifyValidator$1
	},
	/** @deprecated use align-content-* class instead */
	alignContent: {
		type: String,
		default: null,
		validator: alignContentValidator$1
	},
	/** @deprecated use align-content-sm-* class instead */
	alignContentSm: {
		type: String,
		default: null,
		validator: alignContentValidator$1
	},
	/** @deprecated use align-content-md-* class instead */
	alignContentMd: {
		type: String,
		default: null,
		validator: alignContentValidator$1
	},
	/** @deprecated use align-content-lg-* class instead */
	alignContentLg: {
		type: String,
		default: null,
		validator: alignContentValidator$1
	},
	/** @deprecated use align-content-xl-* class instead */
	alignContentXl: {
		type: String,
		default: null,
		validator: alignContentValidator$1
	},
	/** @deprecated use align-content-xxl-* class instead */
	alignContentXxl: {
		type: String,
		default: null,
		validator: alignContentValidator$1
	},
	noGutters: Boolean,
	gap: [
		Number,
		String,
		Array
	],
	gapSm: [
		Number,
		String,
		Array
	],
	gapMd: [
		Number,
		String,
		Array
	],
	gapLg: [
		Number,
		String,
		Array
	],
	gapXl: [
		Number,
		String,
		Array
	],
	gapXxl: [
		Number,
		String,
		Array
	],
	size: [Number, String],
	...makeComponentProps$1(),
	...makeDensityProps$1(),
	...makeTagProps$1()
}, "VRow");
var VRow$1 = genericComponent$1()({
	name: "VRow",
	props: makeVRowProps$1(),
	setup(props, { slots }) {
		if (props.dense) deprecate$1("dense", "density=\"compact\"");
		const classes = computed(() => {
			const classList = [];
			let type;
			for (type in propMap$2) propMap$2[type].forEach((prop) => {
				const value = props[prop];
				const className = breakpointClass$1(type, prop, value);
				if (className) classList.push(className);
			});
			classList.push({
				"v-row--no-gutters": props.noGutters,
				"v-row--density-default": props.density === "default" && !props.noGutters && !props.dense,
				"v-row--density-compact": props.density === "compact" || props.dense,
				"v-row--density-comfortable": props.density === "comfortable",
				[`align-${props.align}`]: props.align,
				[`justify-${props.justify}`]: props.justify,
				[`align-content-${props.alignContent}`]: props.alignContent
			});
			return classList;
		});
		const gaps = computed(() => gapProps$1.flatMap((prop, i) => {
			const value = props[prop];
			if (value == null) return [];
			const infix = i ? `-${breakpoints$1[i - 1]}` : "";
			const [x, y] = Array.isArray(value) ? [value[0] || 0, value[1] || 0] : [value, value];
			return [{
				class: `v-row--gap${infix}`,
				style: {
					[`--v-row-gap-x${infix}`]: convertToUnit$1(x),
					[`--v-row-gap-y${infix}`]: convertToUnit$1(y)
				}
			}];
		}));
		return () => h$1(props.tag, {
			class: [
				"v-row",
				classes.value,
				gaps.value.map((gap) => gap.class),
				props.class
			],
			style: [
				{ "--v-row-columns": props.size },
				gaps.value.map((gap) => gap.style),
				props.style
			]
		}, slots.default?.());
	}
});
// packages/vue-ui/src/surfaces.ts
var SCard = defineComponent({
	name: "SCard",
	inheritAttrs: false,
	props: {
		id: String,
		title: String,
		eyebrow: String,
		headingLevel: {
			type: Number,
			default: 3
		}
	},
	setup(p, { attrs, slots }) {
		const fallback = useId();
		return () => {
			const titleId = (p.id || "sol-card-" + fallback) + "-title";
			return h$1("article", {
				...attrs,
				id: p.id,
				class: ["sol-card sol-ui-card", attrs.class],
				"aria-labelledby": attrs["aria-labelledby"] || (p.title ? titleId : void 0)
			}, [
				p.title || p.eyebrow ? h$1("header", { class: "sol-surface-heading" }, [p.eyebrow ? h$1("span", { class: "eyebrow" }, p.eyebrow) : null, p.title ? h$1("h" + p.headingLevel, { id: titleId }, p.title) : null]) : null,
				slots.default?.(),
				slots.actions ? h$1("div", { class: "sol-ui-card-actions" }, slots.actions()) : null
			]);
		};
	}
});
var SAlert = defineComponent({
	name: "SAlert",
	inheritAttrs: false,
	props: {
		title: String,
		tone: {
			type: String,
			default: "info"
		},
		live: {
			type: String,
			default: "off"
		}
	},
	setup(p, { attrs, slots }) {
		return () => h$1("div", {
			...attrs,
			class: ["sol-notice sol-tone sol-tone-notice sol-ui-alert", attrs.class],
			"data-tone": p.tone,
			role: p.live === "assertive" ? "alert" : p.live === "polite" ? "status" : attrs.role,
			"aria-live": p.live === "off" ? void 0 : p.live,
			"aria-atomic": p.live === "off" ? void 0 : "true"
		}, [
			p.title ? h$1("strong", p.title) : null,
			slots.default?.(),
			slots.actions ? h$1("div", { class: "sol-notice-actions" }, slots.actions()) : null
		]);
	}
});
// packages/core/dist/icons.js
var solIconPaths = Object.freeze({
	check: "m5 12 4 4L19 6",
	close: "m6 6 12 12M18 6 6 18",
	copy: "M9 9h12v12H9V9ZM15 9V3H3v12h6",
	arrow: "M4 12h16m-6-6 6 6-6 6",
	external: "M14 4h6v6m0-6L10 14M10 4H4v16h16v-6",
	chevron: "m6 9 6 6 6-6",
	search: "M20 20l-5-5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
	menu: "M4 6h16M4 12h16M4 18h16",
	more: "M5 12h.01M12 12h.01M19 12h.01",
	info: "M12 11v6m0-10v.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
	edit: "m15 4 5 5M4 20l4-1L21 6l-4-4L4 15v5Z",
	trash: "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7",
	user: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 21v-2a8 8 0 0 1 16 0v2",
	folder: "M3 6V4h6l2 3h10v13H3V6Z",
	plus: "M12 4v16M4 12h16",
	minus: "M4 12h16",
	calendar: "M4 5h16v16H4V5ZM8 2v6m8-6v6M4 11h16",
	save: "M4 3h13l4 4v14H3V3h1ZM7 3v6h10V3M7 21v-7h10v7"
});
Object.freeze(Object.keys(solIconPaths));
// packages/vue-ui/src/tree.ts
var STree = defineComponent({
	name: "STree",
	inheritAttrs: false,
	props: {
		id: {
			type: String,
			required: true
		},
		label: {
			type: String,
			required: true
		},
		items: {
			type: Array,
			required: true
		},
		modelValue: {
			type: String,
			default: null
		},
		expanded: {
			type: Array,
			default: () => []
		},
		disabled: Boolean,
		readonly: Boolean
	},
	emits: {
		"update:modelValue": (_id) => true,
		"update:expanded": (_ids) => true,
		select: (_id) => true
	},
	setup(p, { attrs, emit }) {
		const host = ref$1(null), current = ref$1(""), nodes = /* @__PURE__ */ new Map();
		const entries = computed(() => {
			const out = [], seen = /* @__PURE__ */ new Set();
			const walk = (items, parent, level) => {
				for (const item of items) {
					if (!item.id || seen.has(item.id)) continue;
					seen.add(item.id);
					out.push({
						item,
						parent,
						level
					});
					if (item.children) walk(item.children, item.id, level + 1);
				}
			};
			walk(p.items, null, 1);
			return out;
		});
		const byId = computed(() => new Map(entries.value.map((e) => [e.item.id, e])));
		const visible = computed(() => entries.value.filter((e) => {
			let parent = e.parent;
			while (parent) {
				if (!p.expanded.includes(parent)) return false;
				parent = byId.value.get(parent)?.parent || null;
			}
			return true;
		}));
		const focus = async (id) => {
			if (p.disabled || !visible.value.some((e) => e.item.id === id)) return;
			current.value = id;
			await nextTick$1();
			nodes.get(id)?.focus();
		};
		const choose = (id) => {
			const item = byId.value.get(id)?.item;
			if (p.disabled || p.readonly || !item || item.disabled) return;
			emit("update:modelValue", id);
			emit("select", id);
		};
		const toggle = (id, open) => {
			if (p.disabled || byId.value.get(id)?.item.disabled || !byId.value.get(id)?.item.children?.length) return;
			emit("update:expanded", open ? [.../* @__PURE__ */ new Set([...p.expanded, id])] : p.expanded.filter((x) => x !== id));
		};
		watch(visible, async (list) => {
			if (list.some((e) => e.item.id === current.value)) return;
			let id = current.value;
			while (id && !list.some((e) => e.item.id === id)) id = byId.value.get(id)?.parent || "";
			const target = id || list[0]?.item.id || "";
			const hadFocus = typeof document !== "undefined" && !!host.value?.contains(document.activeElement);
			current.value = target;
			if (hadFocus && target) await focus(target);
		}, { immediate: true });
		function key(e) {
			if (e.isComposing || p.disabled) return;
			const el = e.target.closest("[data-tree-id]");
			if (!el) return;
			const id = el.dataset.treeId, entry = byId.value.get(id), list = visible.value, index = list.findIndex((x) => x.item.id === id);
			if (!entry) return;
			if ([
				"ArrowDown",
				"ArrowUp",
				"ArrowLeft",
				"ArrowRight",
				"Home",
				"End",
				"Enter",
				" "
			].includes(e.key)) {
				e.preventDefault();
				e.stopPropagation();
			}
			switch (e.key) {
				case "ArrowDown":
					focus(list[Math.min(index + 1, list.length - 1)].item.id);
					break;
				case "ArrowUp":
					focus(list[Math.max(0, index - 1)].item.id);
					break;
				case "Home":
					if (list[0]) focus(list[0].item.id);
					break;
				case "End":
					if (list.length) focus(list.at(-1).item.id);
					break;
				case "ArrowRight":
					if (entry.item.children?.length) {
						if (!p.expanded.includes(id)) toggle(id, true);
						else if (list[index + 1]?.parent === id) focus(list[index + 1].item.id);
					}
					break;
				case "ArrowLeft":
					if (p.expanded.includes(id)) toggle(id, false);
					else if (entry.parent) focus(entry.parent);
					break;
				case "Enter":
				case " ":
					choose(id);
					break;
				default: if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
					const q = e.key.normalize("NFKC").toLocaleLowerCase();
					const match = [...list.slice(index + 1), ...list.slice(0, index + 1)].find((x) => x.item.label.normalize("NFKC").toLocaleLowerCase().startsWith(q));
					if (match) focus(match.item.id);
				}
			}
		}
		function render(items, level = 1, drawn = /* @__PURE__ */ new Set()) {
			return items.filter((item) => {
				if (byId.value.get(item.id)?.level !== level || drawn.has(item.id)) return false;
				drawn.add(item.id);
				return true;
			}).map((item) => {
				const children = !!item.children?.length, open = p.expanded.includes(item.id);
				return h$1("li", {
					role: "treeitem",
					"data-tree-id": item.id,
					tabindex: !p.disabled && current.value === item.id ? 0 : -1,
					"aria-label": item.label,
					"aria-selected": String(p.modelValue === item.id),
					"aria-expanded": children ? String(open) : void 0,
					"aria-disabled": p.disabled || item.disabled ? "true" : void 0,
					"aria-level": level,
					ref: (el) => {
						if (el instanceof HTMLElement) nodes.set(item.id, el);
						else nodes.delete(item.id);
					},
					onFocus: (e) => {
						if (e.target === e.currentTarget) current.value = item.id;
					}
				}, [h$1("span", {
					class: "sol-tree-row",
					onClick: () => {
						focus(item.id);
						choose(item.id);
					}
				}, [h$1("span", item.label), h$1("span", {
					class: "sol-tree-disclosure",
					"aria-hidden": "true",
					onClick: (e) => {
						if (children) {
							e.stopPropagation();
							focus(item.id);
							toggle(item.id, !open);
						}
					}
				}, children ? h$1("svg", {
					width: 16,
					height: 16,
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": 1.6
				}, h$1("path", { d: solIconPaths.chevron })) : void 0)]), children ? h$1("ul", {
					role: "group",
					hidden: !open
				}, render(item.children, level + 1, drawn)) : null]);
			});
		}
		return () => h$1("ul", {
			...attrs,
			ref: host,
			id: p.id,
			class: ["sol-tree sol-ui-tree", attrs.class],
			role: "tree",
			"aria-label": p.label,
			"aria-disabled": p.disabled ? "true" : void 0,
			onKeydown: key
		}, render(p.items));
	}
});
// packages/vue-ui/src/floating.ts
/** A local native top-layer panel with a positioned fallback. No global IDs. */
function useFloatingPanel(open, anchor, panel, matchWidth = false) {
	const position = ref$1({
		left: "16px",
		top: "16px"
	});
	let revision = 0, disposed = false, observer;
	function locate() {
		if (!open.value || !anchor.value || !panel.value) return;
		const width = document.documentElement.clientWidth || window.innerWidth;
		const height = window.innerHeight, box = anchor.value.getBoundingClientRect();
		const size = panel.value.getBoundingClientRect();
		const actualWidth = Math.min(matchWidth ? Math.max(160, box.width) : size.width, width - 32);
		const below = box.bottom + 8, top = below + size.height <= height - 16 ? below : Math.max(16, box.top - size.height - 8);
		position.value = {
			left: Math.max(16, Math.min(box.left, width - actualWidth - 16)) + "px",
			top: top + "px",
			maxWidth: Math.max(0, width - 32) + "px",
			maxHeight: Math.max(48, height - top - 16) + "px",
			...matchWidth ? { width: actualWidth + "px" } : {}
		};
	}
	watch(open, async (value) => {
		const current = ++revision;
		if (!value) {
			try {
				panel.value?.hidePopover?.();
			} catch {}
			return;
		}
		await nextTick$1();
		if (disposed || current !== revision || !open.value || !panel.value?.isConnected) return;
		try {
			panel.value.showPopover?.();
		} catch {}
		locate();
	}, { immediate: true });
	onMounted(() => {
		window.addEventListener("resize", locate);
		window.addEventListener("scroll", locate, true);
		if (typeof ResizeObserver !== "undefined") {
			observer = new ResizeObserver(locate);
			if (panel.value) observer.observe(panel.value);
			if (anchor.value) observer.observe(anchor.value);
		}
	});
	onBeforeUnmount(() => {
		disposed = true;
		revision++;
		observer?.disconnect();
		window.removeEventListener("resize", locate);
		window.removeEventListener("scroll", locate, true);
		try {
			panel.value?.hidePopover?.();
		} catch {}
	});
	return {
		position,
		locate
	};
}
// packages/core/dist/date-only.js
var pad = (n) => String(n).padStart(2, "0");
var dateISO = ({ y, m, d }) => `${String(y).padStart(4, "0")}-${pad(m)}-${pad(d)}`;
var monthDays = (y, m) => [
	31,
	y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0) ? 29 : 28,
	31,
	30,
	31,
	30,
	31,
	31,
	30,
	31,
	30,
	31
][m - 1];
function parseDateOnly(value) {
	if (typeof value !== "string") return null;
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
	if (!match) return null;
	const [y, m, d] = match.slice(1).map(Number);
	return y >= 1 && y <= 9999 && m >= 1 && m <= 12 && d >= 1 && d <= monthDays(y, m) ? {
		y,
		m,
		d
	} : null;
}
var utcDate = (value) => {
	const date = /* @__PURE__ */ new Date(0);
	date.setUTCHours(0, 0, 0, 0);
	date.setUTCFullYear(value.y, value.m - 1, value.d);
	return date;
};
var weekday = (value) => utcDate(value).getUTCDay();
function shiftDay(value, delta) {
	const date = utcDate(value);
	date.setUTCDate(date.getUTCDate() + delta);
	const y = date.getUTCFullYear();
	return y < 1 ? {
		y: 1,
		m: 1,
		d: 1
	} : y > 9999 ? {
		y: 9999,
		m: 12,
		d: 31
	} : {
		y,
		m: date.getUTCMonth() + 1,
		d: date.getUTCDate()
	};
}
function shiftMonth(value, delta) {
	const index = Math.max(12, Math.min(119999, value.y * 12 + value.m - 1 + delta));
	const y = Math.floor(index / 12), m = index % 12 + 1;
	return {
		y,
		m,
		d: Math.min(value.d, monthDays(y, m))
	};
}
function parseTimeOnly(raw) {
	const m = String(raw).trim().match(/^(?:(\d{1,2}):(\d{2})|(\d{2})(\d{2}))$/);
	if (!m) return null;
	const h = Number(m[1] ?? m[3]), n = Number(m[2] ?? m[4]);
	if (h > 23 || n > 59) return null;
	return {
		value: String(h).padStart(2, "0") + ":" + String(n).padStart(2, "0"),
		minutes: h * 60 + n
	};
}
// packages/vue-ui/src/locale.ts
var koLocale = Object.freeze({
	validationRequired: "필수 항목을 입력하거나 선택해 주세요.",
	validationInvalid: "입력값을 확인해 주세요.",
	validationMinLength: (minimum) => `${minimum}자 이상 입력해 주세요.`,
	breadcrumb: "현재 위치",
	steps: "진행 단계",
	currentStep: "현재 단계",
	completeStep: "완료한 단계",
	chartInvalid: "유효한 0 이상의 값과 축 범위를 확인해 주세요.",
	chartCategory: "항목",
	chartValue: "값",
	toastAccent: "강조",
	fileRemove: "제거",
	fileType: (mime) => ({
		"text/plain": "텍스트",
		"image/png": "PNG 이미지",
		"image/jpeg": "JPEG 이미지",
		"application/pdf": "PDF 문서"
	})[mime] || mime,
	filesChoose: "파일 선택",
	filesClear: "모두 제거",
	dropFiles: "파일을 여기에 놓거나 선택해 주세요.",
	filesRejected: "선택하지 못한 파일",
	fileRequired: "파일을 하나 이상 선택해 주세요.",
	unknownFileType: "MIME 정보 없음",
	noFileExtension: "확장자 없음",
	duplicateFile: "이미 선택한 파일입니다.",
	unsupportedFile: "허용하지 않는 파일 형식입니다.",
	filesHelp: (accept, max, size) => `${accept || "모든 형식"} · 파일당 ${size} 이하 · 최대 ${num(max, "ko-KR")}개`,
	oversizedFile: (size) => `파일당 ${size}를 초과했습니다.`,
	tooManyFiles: (max) => `최대 ${num(max, "ko-KR")}개까지 선택할 수 있어요.`,
	selectedItems: "선택한 항목",
	loading: "목록을 불러오는 중이에요.",
	loadFailed: "목록을 불러오지 못했어요.",
	retry: "목록 다시 시도",
	noResults: "검색 결과가 없어요.",
	chooseAtLeastOne: "하나 이상 선택해 주세요.",
	unavailable: "선택 불가",
	moreActions: "더 많은 동작",
	contextKeys: "우클릭 또는 Shift+F10 · 모바일에서는 아래 동작 버튼",
	lower: "최솟값",
	upper: "최댓값",
	rangeKeys: "방향키: 한 간격 · Shift/Page: 10간격 · Home/End: 허용 경계 · 트랙을 눌러서도 조절할 수 있어요.",
	splitKeys: "방향키: 크기 조절 · Shift: 10간격 · Home/End: 최소/최대 · Enter: 최소/이전 크기",
	splitStacked: "좁은 화면에서는 두 영역을 세로 순서로 표시합니다. 크기 설정은 유지됩니다.",
	remove: (label) => label + " 제거",
	selectionLimit: (max) => "최대 " + num(max, "ko-KR") + "개까지 선택할 수 있어요.",
	selectionCount: (count, max) => num(count, "ko-KR") + "개 선택" + (max === void 0 ? "" : " · 최대 " + num(max, "ko-KR") + "개"),
	details: "상세",
	record: "자료",
	fullText: "전체 내용",
	viewFullText: (text) => text + " — 전체 내용 보기",
	selectRecord: (text) => text + " 선택",
	selectPage: "현재 페이지 모두 선택",
	selectRecords: "자료 선택",
	sortField: "정렬 항목",
	chooseSort: "정렬할 항목 선택",
	ascending: "오름차순",
	descending: "내림차순",
	sortDirection: (direction) => "정렬 방향 바꾸기, 현재 " + direction,
	tableLoading: "자료를 불러오는 중이에요.",
	tableRetry: "다시 시도",
	tableEmpty: "조건에 맞는 자료가 없어요.",
	previousPage: "이전 페이지",
	nextPage: "다음 페이지",
	pages: (caption) => caption + " 페이지",
	pageLabel: (page, count) => num(page, "ko-KR") + "페이지, 전체 " + num(count, "ko-KR") + "페이지",
	pageSummary: (page, count, selected) => num(page, "ko-KR") + " / " + num(count, "ko-KR") + "페이지 · 전체 선택 " + num(selected, "ko-KR") + "개",
	progressFailed: "! 오류 · 작업을 확인해 주세요.",
	progressPending: "처리 중",
	progressUnknown: "처리 중",
	progressInvalid: "! 진행 정보를 확인해 주세요.",
	progressComplete: "✓ 완료",
	progressRunning: (percent) => percent + " 진행",
	progressError: (percent) => "! 오류 · 마지막 확인 " + percent,
	code: "ko-KR",
	firstDay: 0,
	required: "필수",
	choose: "선택해 주세요",
	clear: "지우기",
	close: "닫기",
	done: "선택 완료",
	increase: "늘리기",
	decrease: "줄이기",
	invalidNumber: "유효한 숫자를 입력해 주세요.",
	numberRange: "허용 범위 안의 숫자를 입력해 주세요.",
	numberStep: "설정된 간격의 숫자를 입력해 주세요.",
	calendar: "달력 열기",
	singleDate: "날짜 선택",
	dateRange: "기간 선택",
	previousMonth: "이전 달",
	nextMonth: "다음 달",
	today: "오늘로 이동",
	chooseStart: "시작일을 선택하세요.",
	chooseEnd: "종료일을 선택하세요. 두 날짜를 고르면 반영합니다.",
	invalidDate: "YYYY-MM-DD 형식의 실제 날짜를 입력해 주세요.",
	invalidRange: "YYYY-MM-DD ~ YYYY-MM-DD 형식의 실제 날짜와 올바른 기간 순서를 입력해 주세요.",
	dateRequired: "날짜를 선택하거나 입력해 주세요.",
	calendarKeys: "방향키: 하루·한 주 · Home/End: 주 경계 · PageUp/Down: 월 이동(Shift: 연도) · Enter/Space: 선택 · Escape: 취소",
	selected: "선택일",
	start: "시작일",
	end: "종료일",
	time: "시각 선택",
	hour: "시",
	minute: "분",
	invalidTime: "허용 범위와 간격에 맞는 HH:mm 시각을 입력해 주세요.",
	timeRequired: "시각을 입력해 주세요.",
	toastInfo: "정보",
	toastSuccess: "완료",
	toastWarning: "확인",
	toastDanger: "오류",
	notification: "알림",
	count: (current, max) => max === void 0 ? num(current, "ko-KR") : `${num(current, "ko-KR")} / ${num(max, "ko-KR")}`,
	numberHelp: (min, max, step) => [
		min === void 0 ? "" : `최소 ${num(min, "ko-KR")}`,
		max === void 0 ? "" : `최대 ${num(max, "ko-KR")}`,
		`${num(step, "ko-KR")} 간격`
	].filter(Boolean).join(" · "),
	timeHelp: (min, max, step) => `HH:mm · ${min}–${max} · ${step}분 간격`
});
var enLocale = Object.freeze({
	validationRequired: "Enter or choose a required value.",
	validationInvalid: "Check this value.",
	validationMinLength: (minimum) => `Use at least ${minimum} characters.`,
	breadcrumb: "Breadcrumb",
	steps: "Progress steps",
	currentStep: "Current step",
	completeStep: "Completed step",
	chartInvalid: "Check nonnegative finite values and the axis range.",
	chartCategory: "Category",
	chartValue: "Value",
	toastAccent: "Accent",
	fileRemove: "Remove",
	fileType: (mime) => ({
		"text/plain": "Plain text",
		"image/png": "PNG image",
		"image/jpeg": "JPEG image",
		"application/pdf": "PDF document"
	})[mime] || mime,
	filesChoose: "Choose files",
	filesClear: "Remove all",
	dropFiles: "Drop files here or use the choose button.",
	filesRejected: "Files not selected",
	fileRequired: "Choose at least one file.",
	unknownFileType: "MIME type unavailable",
	noFileExtension: "No extension",
	duplicateFile: "This file is already selected.",
	unsupportedFile: "This file type is not allowed.",
	filesHelp: (accept, max, size) => `${accept || "All formats"} · Up to ${size} per file · Up to ${num(max, "en-US")} files`,
	oversizedFile: (size) => `Exceeds ${size} per file.`,
	tooManyFiles: (max) => `Choose at most ${num(max, "en-US")} files.`,
	selectedItems: "selected options",
	loading: "Loading options.",
	loadFailed: "Could not load options.",
	retry: "Retry options",
	noResults: "No results.",
	chooseAtLeastOne: "Choose at least one option.",
	unavailable: "Unavailable",
	moreActions: "More actions",
	contextKeys: "Right-click or Shift+F10; use the action button on touch.",
	lower: "Lower value",
	upper: "Upper value",
	rangeKeys: "Arrows: one step; Shift/Page: ten steps; Home/End: bounds. You can also click the track.",
	splitKeys: "Arrows: resize; Shift: ten steps; Home/End: bounds; Enter: minimum/previous size.",
	splitStacked: "Narrow layout: both panes are stacked. Your size setting is retained.",
	remove: (label) => "Remove " + label,
	selectionLimit: (max) => "Choose at most " + num(max, "en-US") + " options.",
	selectionCount: (count, max) => num(count, "en-US") + " selected" + (max === void 0 ? "" : " · maximum " + max),
	details: "Details",
	record: "Record",
	fullText: "Full content",
	viewFullText: (text) => "View full content: " + text,
	selectRecord: (text) => "Select " + text,
	selectPage: "Select all on this page",
	selectRecords: "Select record",
	sortField: "Sort by",
	chooseSort: "Choose a sort field",
	ascending: "Ascending",
	descending: "Descending",
	sortDirection: (direction) => "Change sort direction, currently " + direction,
	tableLoading: "Loading records.",
	tableRetry: "Retry",
	tableEmpty: "No matching records.",
	previousPage: "Previous page",
	nextPage: "Next page",
	pages: (caption) => caption + " pages",
	pageLabel: (page, count) => "Page " + num(page, "en-US") + " of " + num(count, "en-US"),
	pageSummary: (page, count, selected) => "Page " + num(page, "en-US") + " of " + num(count, "en-US") + " · " + num(selected, "en-US") + " selected",
	progressFailed: "! Error · check the task.",
	progressPending: "Working",
	progressUnknown: "Working",
	progressInvalid: "! Check the progress information.",
	progressComplete: "✓ Complete",
	progressRunning: (percent) => percent + " complete",
	progressError: (percent) => "! Error · last confirmed " + percent,
	code: "en-US",
	firstDay: 0,
	required: "required",
	choose: "Choose",
	clear: "Clear",
	close: "Close",
	done: "Done",
	increase: "Increase",
	decrease: "Decrease",
	invalidNumber: "Enter a valid number.",
	numberRange: "Enter a number within the allowed range.",
	numberStep: "Use the configured step.",
	calendar: "Open calendar",
	singleDate: "Choose a date",
	dateRange: "Choose a range",
	previousMonth: "Previous month",
	nextMonth: "Next month",
	today: "Go to today",
	chooseStart: "Choose the start date.",
	chooseEnd: "Choose the end date. Both dates are required to commit.",
	invalidDate: "Enter a real date as YYYY-MM-DD.",
	invalidRange: "Enter an ordered range as YYYY-MM-DD ~ YYYY-MM-DD.",
	dateRequired: "Choose or enter a date.",
	calendarKeys: "Arrows: day/week · Home/End: week boundaries · PageUp/Down: month (Shift: year) · Enter/Space: choose · Escape: cancel",
	selected: "Selected date",
	start: "Start",
	end: "End",
	time: "Choose time",
	hour: "Hour",
	minute: "Minute",
	invalidTime: "Enter HH:mm within the allowed range and step.",
	timeRequired: "Enter a time.",
	toastInfo: "Information",
	toastSuccess: "Complete",
	toastWarning: "Check",
	toastDanger: "Error",
	notification: "Notification",
	count: (current, max) => max === void 0 ? num(current, "en-US") : `${num(current, "en-US")} / ${num(max, "en-US")}`,
	numberHelp: (min, max, step) => [
		min === void 0 ? "" : `Min ${num(min, "en-US")}`,
		max === void 0 ? "" : `Max ${num(max, "en-US")}`,
		`Step ${num(step, "en-US")}`
	].filter(Boolean).join(" · "),
	timeHelp: (min, max, step) => `HH:mm · ${min}–${max} · ${step} min step`
});
var SolLocaleKey = Symbol("SolLocale");
var supported = (code) => typeof code === "string" && [
	"ko",
	"ko-kr",
	"en",
	"en-us"
].includes(code.toLowerCase()) ? {
	"ko": "ko-KR",
	"ko-kr": "ko-KR",
	"en": "en-US",
	"en-us": "en-US"
}[code.toLowerCase()] : void 0;
function resolveSolLocale(source = {}, overrides = {}) {
	const app = typeof source === "string" ? { code: source } : source || {}, appCode = supported(app.code) || "ko-KR", code = supported(overrides.code) || appCode, base = code === "en-US" ? enLocale : koLocale;
	const valid = (value) => Object.fromEntries(Object.entries(value).filter(([key, v]) => Object.hasOwn(base, key) && typeof v === typeof base[key] && key !== "code" && (key !== "firstDay" || Number.isInteger(v) && Number(v) >= 0 && Number(v) <= 6)));
	return {
		...base,
		...code === appCode ? valid(app) : {},
		...valid(overrides),
		code
	};
}
function provideSolLocale(app, locale = {}) {
	app.provide(SolLocaleKey, locale);
}
function useSolLocale(overrides = () => void 0) {
	const provided = inject(SolLocaleKey, {});
	return computed(() => resolveSolLocale(toValue(provided), overrides()));
}
function num(value, code) {
	return new Intl.NumberFormat(code, { maximumSignificantDigits: 21 }).format(value);
}
function formatSolNumber(value, locale = "ko-KR", options = {}) {
	return new Intl.NumberFormat(resolveSolLocale(locale).code, {
		maximumSignificantDigits: 21,
		...options
	}).format(value);
}
function parseSolNumber(text, locale = "ko-KR") {
	resolveSolLocale(locale);
	const value = text.trim();
	if (!/^[+-]?(?:(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d*)?|\.\d+)$/.test(value)) return null;
	const number = Number(value.replaceAll(",", ""));
	return Number.isFinite(number) ? number : null;
}
function formatSolDate(value, locale = "ko-KR", options = {}) {
	const parts = parseDateOnly(value);
	if (!parts) return "";
	const date = /* @__PURE__ */ new Date(0);
	date.setUTCHours(0, 0, 0, 0);
	date.setUTCFullYear(parts.y, parts.m - 1, parts.d);
	return new Intl.DateTimeFormat(resolveSolLocale(locale).code, {
		year: "numeric",
		month: "short",
		day: "numeric",
		...options,
		calendar: "gregory",
		timeZone: "UTC"
	}).format(date);
}
// packages/vue-ui/src/disclosures.ts
var disclosureProps = {
	id: {
		type: String,
		required: true
	},
	label: {
		type: String,
		required: true
	},
	modelValue: {
		type: Boolean,
		default: void 0
	},
	disabled: Boolean,
	readonly: Boolean,
	locale: Object
};
var disclosureEmits = {
	"update:modelValue": (_value) => true,
	open: () => true,
	close: (_reason) => true
};
var STooltip = defineComponent({
	name: "STooltip",
	inheritAttrs: false,
	props: {
		...disclosureProps,
		text: {
			type: String,
			required: true
		}
	},
	emits: disclosureEmits,
	setup(p, { attrs, slots, emit }) {
		const local = ref$1(false), root = ref$1(null), anchor = ref$1(null), panel = ref$1(null);
		const open = computed(() => !p.disabled && !p.readonly && (p.modelValue ?? local.value));
		const { position } = useFloatingPanel(open, anchor, panel);
		let hovered = false, focused = false, timer, reason = "programmatic";
		function request(value, why = "programmatic") {
			if (value && (p.disabled || p.readonly)) return;
			reason = why;
			if (p.modelValue === void 0) local.value = value;
			emit("update:modelValue", value);
		}
		function enter() {
			clearTimeout(timer);
			hovered = true;
			request(true);
		}
		function leave() {
			hovered = false;
			clearTimeout(timer);
			timer = setTimeout(() => {
				if (!hovered && !focused) request(false, "outside");
			}, 120);
		}
		function focus() {
			focused = true;
			clearTimeout(timer);
			request(true);
		}
		function blur() {
			focused = false;
			if (!hovered) request(false, "focus");
		}
		function escape(e) {
			if (e.key === "Escape" && open.value) {
				e.preventDefault();
				e.stopPropagation();
				request(false, "escape");
			}
		}
		const outside = (e) => {
			if (open.value && !root.value?.contains(e.target)) request(false, "outside");
		};
		watch(open, (value, old) => {
			if (value) emit("open");
			else if (old) emit("close", reason);
		});
		watch(() => [p.disabled, p.readonly], () => {
			if (p.disabled || p.readonly) request(false, "disabled");
		});
		onMounted(() => document.addEventListener("pointerdown", outside));
		onBeforeUnmount(() => {
			clearTimeout(timer);
			document.removeEventListener("pointerdown", outside);
		});
		return () => {
			const trigger = {
				id: p.id + "-trigger",
				disabled: p.disabled,
				"aria-disabled": p.readonly ? "true" : void 0,
				"aria-describedby": [attrs["aria-describedby"], open.value ? p.id : void 0].filter(Boolean).join(" ") || void 0,
				onPointerenter: enter,
				onPointerleave: leave,
				onFocus: focus,
				onBlur: blur,
				onClick: () => request(true),
				onKeydown: escape
			};
			return h$1("span", {
				...attrs,
				ref: root,
				class: ["sol-ui-disclosure", attrs.class],
				onKeydown: escape
			}, [h$1("span", {
				ref: anchor,
				class: "sol-ui-activator"
			}, slots.activator?.({ props: trigger }) || h$1(SBtn, trigger, () => p.label)), h$1("span", {
				id: p.id,
				ref: panel,
				popover: "manual",
				role: "tooltip",
				hidden: !open.value,
				class: "sol-tooltip sol-ui-floating",
				style: position.value,
				onPointerenter: enter,
				onPointerleave: leave
			}, p.text)]);
		};
	}
});
var SPopover = defineComponent({
	name: "SPopover",
	inheritAttrs: false,
	props: {
		...disclosureProps,
		title: {
			type: String,
			required: true
		}
	},
	emits: disclosureEmits,
	setup(p, { attrs, slots, emit }) {
		const l = useSolLocale(() => p.locale), local = ref$1(false), root = ref$1(null), anchor = ref$1(null), panel = ref$1(null), closeButton = ref$1(null);
		const open = computed(() => !p.disabled && !p.readonly && (p.modelValue ?? local.value));
		const { position } = useFloatingPanel(open, anchor, panel);
		let opener = null, reason = "programmatic", restore = true, disposed = false;
		function request(value, why = "programmatic", returnFocus = true) {
			if (value && (p.disabled || p.readonly)) return;
			if (value) opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
			reason = why;
			restore = returnFocus;
			if (p.modelValue === void 0) local.value = value;
			emit("update:modelValue", value);
		}
		function escape(e) {
			if (e.key === "Escape" && open.value) {
				e.preventDefault();
				e.stopPropagation();
				request(false, "escape");
			}
		}
		const outside = (e) => {
			if (open.value && !root.value?.contains(e.target)) request(false, "outside", false);
		};
		function focusout(e) {
			const next = e.relatedTarget;
			if (next && !root.value?.contains(next)) request(false, "focus", false);
		}
		watch(open, async (value, old) => {
			if (value) {
				if (!opener) opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
				await nextTick$1();
				if (disposed || !open.value) return;
				closeButton.value?.$el?.focus({ preventScroll: true });
				emit("open");
			} else if (old) {
				const prior = document.activeElement, inside = !!panel.value?.contains(prior);
				await nextTick$1();
				if (!disposed && restore && inside && (document.activeElement === prior || document.activeElement === document.body) && opener?.isConnected) opener.focus({ preventScroll: true });
				opener = null;
				emit("close", reason);
			}
		}, { immediate: true });
		watch(() => [p.disabled, p.readonly], () => {
			if (p.disabled || p.readonly) request(false, "disabled");
		});
		onMounted(() => document.addEventListener("pointerdown", outside));
		onBeforeUnmount(() => {
			disposed = true;
			document.removeEventListener("pointerdown", outside);
			if (open.value && panel.value?.contains(document.activeElement) && opener?.isConnected) opener.focus({ preventScroll: true });
		});
		return () => {
			const trigger = {
				id: p.id + "-trigger",
				disabled: p.disabled,
				"aria-disabled": p.readonly ? "true" : void 0,
				"aria-expanded": String(open.value),
				"aria-controls": p.id,
				"aria-haspopup": "dialog",
				onClick: () => request(!open.value, "trigger"),
				onKeydown: escape
			};
			return h$1("div", {
				...attrs,
				ref: root,
				class: ["sol-ui-disclosure", attrs.class],
				onKeydown: escape,
				onFocusout: focusout
			}, [h$1("span", {
				ref: anchor,
				class: "sol-ui-activator"
			}, slots.activator?.({ props: trigger }) || h$1(SBtn, trigger, () => p.label)), h$1("section", {
				id: p.id,
				ref: panel,
				popover: "manual",
				hidden: !open.value,
				role: "dialog",
				"aria-modal": "false",
				"aria-labelledby": p.id + "-title",
				class: "sol-ui-floating sol-ui-popover",
				style: position.value
			}, [
				h$1("header", { class: "sol-ui-popover-heading" }, [h$1("h3", { id: p.id + "-title" }, p.title), h$1(SBtn, {
					ref: closeButton,
					variant: "inline",
					onClick: () => request(false, "close")
				}, () => l.value.close)]),
				h$1("div", { class: "sol-ui-popover-body" }, slots.default?.()),
				slots.actions ? h$1("div", { class: "sol-actions" }, slots.actions()) : null
			])]);
		};
	}
});
var SAccordion = defineComponent({
	name: "SAccordion",
	inheritAttrs: false,
	props: disclosureProps,
	emits: {
		"update:modelValue": (_value) => true,
		change: (_value) => true
	},
	setup(p, { attrs, slots, emit }) {
		const local = ref$1(false), open = computed(() => p.modelValue ?? local.value);
		function toggle(e) {
			e.preventDefault();
			if (p.disabled || p.readonly) return;
			const value = !open.value;
			if (p.modelValue === void 0) local.value = value;
			emit("update:modelValue", value);
			emit("change", value);
		}
		return () => h$1("details", {
			...attrs,
			id: p.id,
			open: open.value,
			class: ["sol-accordion", attrs.class]
		}, [h$1("summary", {
			id: p.id + "-summary",
			"aria-controls": p.id + "-content",
			"aria-disabled": p.disabled || p.readonly ? "true" : void 0,
			tabindex: p.disabled ? -1 : 0,
			onClick: toggle
		}, p.label), h$1("div", {
			id: p.id + "-content",
			class: "sol-accordion-content"
		}, slots.default?.())]);
	}
});
// packages/vue-ui/node_modules/@vuetify/v0/dist/constants/globals.mjs
var IN_BROWSER$1 = typeof window !== "undefined";
IN_BROWSER$1 && ("ontouchstart" in window || window.navigator.maxTouchPoints);
var SUPPORTS_MATCH_MEDIA$1 = IN_BROWSER$1 && "matchMedia" in window && typeof window.matchMedia === "function";
var SUPPORTS_OBSERVER = IN_BROWSER$1 && "ResizeObserver" in window;
var SUPPORTS_INTERSECTION_OBSERVER = IN_BROWSER$1 && "IntersectionObserver" in window;
IN_BROWSER$1 && "MutationObserver" in window;
/* v8 ignore next -- build-time constant, __DEV__ short-circuits in tests */
var __LOGGER_ENABLED__ = typeof (process.env.NODE_ENV !== "production") !== "undefined" && process.env.NODE_ENV !== "production" || typeof process.env.VITE_LOGGER_ENABLED !== "undefined" && process.env.VITE_LOGGER_ENABLED === "true";
// packages/vue-ui/node_modules/@vuetify/v0/dist/utilities/instance.mjs
/**
* Vue 3.6+ exposes `currentInstance` for Vapor mode compatibility.
* `getCurrentInstance()` returns null in Vapor components by design,
* so we access `currentInstance` directly when available.
*
* Uses dynamic key to avoid bundler static analysis warnings.
*
* @see https://github.com/orgs/vuejs/discussions/13629
* @internal
*/
var INSTANCE_KEY = "currentInstance";
function getInstanceCompat() {
	const vueExports = Vue;
	if (INSTANCE_KEY in vueExports) return vueExports[INSTANCE_KEY];
	return Vue.getCurrentInstance();
}
/* #__NO_SIDE_EFFECTS__ */
function instanceExists() {
	return !/* @__PURE__ */ isNull(getInstanceCompat());
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/utilities/helpers.mjs
/**
* @module utilities/helpers
*
* @remarks
* Collection of utility functions for type checking, object manipulation,
* and common transformations. All exports are tree-shakeable.
*/
/**
* Checks if a value is a function
*
* @param item The value to check
* @returns True if the value is a function
*
* @example
* ```ts
* isFunction(() => {})  // true
* isFunction('string')  // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isFunction(item) {
	return typeof item === "function";
}
/**
* Checks if a value is a string
*
* @param item The value to check
* @returns True if the value is a string
*
* @example
* ```ts
* isString('hello')  // true
* isString(123)      // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isString(item) {
	return typeof item === "string";
}
/**
* Checks if a value is a number
*
* @param item The value to check
* @returns True if the value is a number (including NaN)
*
* @example
* ```ts
* isNumber(123)       // true
* isNumber(NaN)       // true
* isNumber('123')     // false
* ```
*
* @see {@link isNaN} to check for NaN specifically
*/
/* #__NO_SIDE_EFFECTS__ */
function isNumber(item) {
	return typeof item === "number";
}
/**
* Checks if a value is a boolean
*
* @param item The value to check
* @returns True if the value is a boolean
*
* @example
* ```ts
* isBoolean(true)   // true
* isBoolean(false)  // true
* isBoolean(0)      // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isBoolean(item) {
	return typeof item === "boolean";
}
/**
* Checks if a value is a plain object (excludes null and arrays)
*
* @param item The value to check
* @returns True if the value is a plain object
*
* @remarks
* Returns false for null and arrays, even though `typeof null === 'object'`
* and `typeof [] === 'object'` in JavaScript.
*
* `Record<string, any>` is load-bearing: TypeScript does not grant interfaces
* an implicit index signature, so `Record<string, unknown>` destroys known
* property types on interface-typed values and fails to subtract
* `Record<string, any>` members in the negative branch.
*
* @example
* ```ts
* isObject({})        // true
* isObject({ a: 1 })  // true
* isObject(null)      // false
* isObject([])        // false
* ```
*
* @see {@link isArray} to check for arrays
* @see {@link isNull} to check for null
*/
/* #__NO_SIDE_EFFECTS__ */
function isObject(item) {
	return typeof item === "object" && item !== null && !Array.isArray(item);
}
/**
* Checks if a value is an array
*
* @param item The value to check
* @returns True if the value is an array
*
* @example
* ```ts
* isArray([])        // true
* isArray([1, 2, 3]) // true
* isArray('string')  // false
* ```
*
* @remarks The guard keeps whichever array constituents the input already had —
* element types, tuple arity and `readonly` all survive, and the `else` branch
* drops exactly those constituents. Three branches, in order:
*
* 1. `0 extends (1 & T)` detects an `any` input and yields `T[]` (`any[]`),
*    matching `Array.isArray` so callback parameters stay contextually typed.
* 2. Nothing array-shaped to extract (an `unknown` value, say) falls back to
*    `unknown[]`, reproducing the previous narrowing so mutation and assignment
*    to `unknown[]` keep compiling.
* 3. Otherwise the array constituents of `T` pass through untouched.
*
* `NoInfer<T[]>` widens the parameter just enough for TypeScript to accept the
* first branch (a predicate must be assignable to its parameter's type) without
* letting an array argument capture the inference site.
*/
/* #__NO_SIDE_EFFECTS__ */
function isArray(item) {
	return Array.isArray(item);
}
/**
* Checks if a value is a DOM Element
*
* @param item The value to check
* @returns True if the value is a DOM Element
*
* @example
* ```ts
* isElement(document.body) // true
* isElement('string')      // false
* isElement(null)          // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isElement(item) {
	return typeof Element !== "undefined" && item instanceof Element;
}
/**
* Checks if a value is null
*
* @param item The value to check
* @returns True if the value is null
*
* @example
* ```ts
* isNull(null)      // true
* isNull(undefined) // false
* ```
*
* @see {@link isUndefined} to check for undefined
* @see {@link isNullOrUndefined} to check for either
*/
/* #__NO_SIDE_EFFECTS__ */
function isNull(item) {
	return item === null;
}
/**
* Checks if a value is null or undefined
*
* @param item The value to check
* @returns True if the value is null or undefined
*
* @remarks
* Uses loose equality (`== null`) which matches both null and undefined.
*
* @example
* ```ts
* isNullOrUndefined(null)      // true
* isNullOrUndefined(undefined) // true
* isNullOrUndefined(0)         // false
* isNullOrUndefined('')        // false
* ```
*
* @see {@link isNull} to check for null only
* @see {@link isUndefined} to check for undefined only
*/
/* #__NO_SIDE_EFFECTS__ */
function isNullOrUndefined(item) {
	return item == null;
}
/**
* Checks if a value is undefined
*
* @param item The value to check
* @returns True if the value is undefined
*
* @example
* ```ts
* isUndefined(undefined) // true
* isUndefined(null)      // false
* ```
*
* @see {@link isNull} to check for null
* @see {@link isNullOrUndefined} to check for either
*/
/* #__NO_SIDE_EFFECTS__ */
function isUndefined(item) {
	return item === void 0;
}
/**
* Checks if a value is a symbol
*
* @param item The value to check
* @returns True if the value is a symbol
*
* @example
* ```ts
* isSymbol(Symbol('test')) // true
* isSymbol('symbol')       // false
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function isSymbol(item) {
	return typeof item === "symbol";
}
/**
* Checks if a value is NaN (Not a Number)
*
* @param item The value to check
* @returns True if the value is NaN
*
* @remarks
* Uses `Number.isNaN()` which only returns true for the actual NaN value,
* unlike the global `isNaN()` which coerces the argument to a number first.
*
* @example
* ```ts
* isNaN(NaN)         // true
* isNaN(123)         // false
* isNaN('hello')     // false (unlike global isNaN)
* isNaN(undefined)   // false (unlike global isNaN)
* ```
*
* @see {@link isNumber} to check if a value is a number type
*/
/* #__NO_SIDE_EFFECTS__ */
function isNaN$1(item) {
	return /* @__PURE__ */ isNumber(item) && Number.isNaN(item);
}
var UNSAFE_KEYS = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
function isPlainObject$1(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	const proto = Object.getPrototypeOf(value);
	return proto === Object.prototype || proto === null;
}
/**
* Deeply merges source objects into a target object, returning a new object
*
* @param target The base object to merge into
* @param sources One or more source objects to merge from
* @returns A new merged object (inputs are not mutated)
*
* @remarks
* - Creates and returns a new object — inputs are never mutated
* - Nested objects are recursively merged
* - Arrays are replaced, not merged
* - Primitives from sources overwrite target values
*
* @example
* ```ts
* const target = { a: 1, b: { c: 2 } }
* const result = mergeDeep(target, { b: { d: 3 } })
* // result is { a: 1, b: { c: 2, d: 3 } }
* // target is unchanged
*
* // Multiple sources
* mergeDeep({}, { a: 1 }, { b: 2 }) // { a: 1, b: 2 }
*
* // Arrays are replaced
* mergeDeep({ arr: [1, 2] }, { arr: [3] }) // { arr: [3] }
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function mergeDeep$1(target, ...sources) {
	const out = {};
	for (const key in target) if (Object.hasOwn(target, key)) out[key] = target[key];
	for (const source of sources) {
		if (!/* @__PURE__ */ isObject(source)) continue;
		for (const key in source) {
			if (UNSAFE_KEYS.has(key)) continue;
			if (!Object.hasOwn(source, key)) continue;
			const sourceValue = source[key];
			if (/* @__PURE__ */ isUndefined(sourceValue)) continue;
			const targetValue = out[key];
			out[key] = isPlainObject$1(sourceValue) && isPlainObject$1(targetValue) ? /* @__PURE__ */ mergeDeep$1(targetValue, sourceValue) : sourceValue;
		}
	}
	return out;
}
var idCounter = 0;
/**
* Generates a unique ID, using Vue's useId when in component context
*
* @returns A unique string ID
*
* @remarks
* - In component setup/lifecycle: Uses Vue's `useId()` for SSR-safe hydration
* - Outside components: Falls back to sequential counter (`v0-0`, `v0-1`, ...)
* - Vapor mode compatible
* - IDs are sequential and predictable — intended for DOM `id`/ARIA wiring only.
*   Never use them as security tokens (CSRF tokens, session ids, capabilities).
*
* @example
* ```ts
* // In component setup - SSR safe
* const id = useId() // 'v:0', 'v:1', etc. (Vue's format)
*
* // Outside component - counter fallback
* const id = useId() // 'v0-0', 'v0-1', etc.
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function useId$1() {
	if (/* @__PURE__ */ instanceExists()) return useId();
	if (typeof (process.env.NODE_ENV !== "production") !== "undefined" && process.env.NODE_ENV !== "production" && !IN_BROWSER$1) console.warn("[v0 warn] useId() called outside component context during SSR. Provide explicit ID to avoid hydration mismatch.");
	return `v0-${idCounter++}`;
}
/**
* Clamps a value between a minimum and maximum
*
* @param value The value to clamp
* @param min The minimum value (default: 0)
* @param max The maximum value (default: 1)
* @returns The clamped value
*
* @example
* ```ts
* clamp(5, 0, 10)  // 5
* clamp(-5, 0, 10) // 0
* clamp(15, 0, 10) // 10
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function clamp$1(value, min = 0, max = 1) {
	if (!Number.isFinite(value)) return min;
	return Math.max(min, Math.min(max, value));
}
/**
* Creates an array of sequential numbers
*
* @param length The length of the array to create
* @param start The starting index (default: 0)
* @returns An array of sequential numbers
*
* @example
* ```ts
* range(3)     // [0, 1, 2]
* range(3, 1)  // [1, 2, 3]
* range(5, 10) // [10, 11, 12, 13, 14]
* range(0)     // []
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function range(length, start = 0) {
	return Array.from({ length }, (_, index) => start + index);
}
/**
* Parses a CSS pixel length into a number
*
* @param value The resolved CSS length, e.g. `getComputedStyle(el).marginLeft`
* @param fallback The value to return when `value` does not parse (default: 0)
* @returns The parsed number, or `fallback`
*
* @remarks
* Built for reading `getComputedStyle` output, where a length that does not
* apply resolves to `''` or `'auto'` rather than to a number. An unparseable
* length returns `fallback`; a length that legitimately parses to `0` returns
* `0`. That distinction is why this exists — `Number.parseFloat(v) || 0`
* collapses both cases onto `0`, which is only correct when the fallback is
* itself `0`.
*
* Only the leading number is read, matching `Number.parseFloat`, so any unit
* suffix is ignored. Values `getComputedStyle` never returns — percentages,
* `calc()` expressions, multi-value shorthands — are out of scope.
*
* @example
* ```ts
* pxToNumber('16px')          // 16
* pxToNumber('0px')           // 0
* pxToNumber('-4.5px')        // -4.5
* pxToNumber('auto')          // 0
* pxToNumber(undefined)       // 0
*
* // A non-zero fallback is the case `|| 0` cannot express
* pxToNumber('auto', 100)     // 100
* pxToNumber('0px', 100)      // 0
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function pxToNumber(value, fallback = 0) {
	if (!/* @__PURE__ */ isString(value)) return fallback;
	const parsed = Number.parseFloat(value);
	return /* @__PURE__ */ isNaN$1(parsed) ? fallback : parsed;
}
/**
* Resolves an iterable of IDs to their items via a getter,
* filtering out any that return undefined.
*
* @internal
*/
/* #__NO_SIDE_EFFECTS__ */
function resolveIds(ids, getter) {
	const result = [];
	for (const id of ids) {
		const item = getter(id);
		if (!/* @__PURE__ */ isUndefined(item)) result.push(item);
	}
	return result;
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/utilities/errors.mjs
/**
* @module utilities/errors
*
* @remarks
* Structured error class thrown by v0 internals. Pattern modeled on
* tRPC's `TRPCError` and Node's built-in `Error` codes — `code` is a
* top-level discriminant field on the error, *not* a payload nested
* inside `Error.cause`. `cause` stays reserved for wrapping the
* genuine upstream error so error trackers (Sentry's `LinkedErrors`,
* Datadog RUM, Rollbar) render the chain correctly.
*
* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
* @see https://nodejs.org/api/errors.html#nodejs-error-codes
* @see https://trpc.io/docs/server/error-handling
* @see https://docs.sentry.io/platforms/javascript/configuration/integrations/linkederrors/
*/
/**
* Structured error thrown by v0 internals.
*
* @remarks
* Carries a stable {@link V0ErrorCode} discriminant on `code` so
* consumers, devtools panels, and error trackers can identify the
* error without parsing the message string. Domain context lives in
* top-level fields per code (`key` for `V0_CONTEXT_MISSING`, `plugin`
* for `V0_PLUGIN_MISSING`), populated from a {@link V0ErrorDetails}
* argument and merged onto the instance at construction time.
*
* `cause` is forwarded to `Error`'s standard `ErrorOptions.cause` slot
* and is intended to carry a wrapped upstream error, not metadata.
*
* Prefer {@link isV0Error} over manual `instanceof` checks at the
* narrowing site — the guard intersects the instance type with the
* matching {@link V0ErrorDetails} arm, so per-code fields are typed.
*
* @example Author site
* ```ts
* throw new V0Error('Context not found.', { code: 'V0_CONTEXT_MISSING', key })
* ```
*
* @example Author site with upstream wrap
* ```ts
* try {
*   JSON.parse(raw)
* } catch (err) {
*   throw new V0Error('Failed to hydrate registry.', {
*     code: 'V0_CONTEXT_MISSING',
*     key: 'v0:registry',
*     cause: err,
*   })
* }
* ```
*
* @example Consumer site
* ```ts
* try {
*   useContext(myKey)
* } catch (err) {
*   if (isV0Error(err, 'V0_CONTEXT_MISSING')) {
*     console.log(err.key)
*   }
* }
* ```
*/
var V0Error = class extends Error {
	name = "V0Error";
	code;
	key;
	plugin;
	palette;
	seed;
	variant;
	adapter;
	prefix;
	constructor(message, details) {
		const { cause, ...rest } = details;
		super(message, /* @__PURE__ */ isUndefined(cause) ? void 0 : { cause });
		this.code = details.code;
		for (const [key, value] of Object.entries(rest)) {
			if (UNSAFE_KEYS.has(key)) continue;
			this[key] = value;
		}
	}
};
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/createContext/index.mjs
/**
* @module createContext
*
* @see https://0.vuetifyjs.com/composables/foundation/create-context
*
* @remarks
* Factory for creating type-safe Vue dependency injection contexts.
*
* Provides a wrapper around Vue's provide/inject that throws errors when context is not found,
* eliminating silent failures and improving developer experience. Supports both app-level and
* component-level provision.
*
* Supports two modes:
* - **Static key**: `createContext('my-key')` - key is fixed at creation time
* - **Dynamic key**: `createContext()` or `createContext({ suffix: 'item' })` - key provided at runtime
*
* @example
* ```ts
* import { createContext } from '@vuetify/v0'
*
* const [useTheme, provideTheme] = createContext<{ dark: boolean }>('theme')
*
* provideTheme({ dark: true })
* const theme = useTheme()
* ```
*/
/**
* Injects a context provided by an ancestor component.
*
* @param key The key of the context to inject.
* @param defaultValue Optional default value if context is not found.
* @template Z The type of the context.
* @returns The injected context.
* @throws An error if the context is not found and no default is provided.
*
* @see https://vuejs.org/api/composition-api-dependency-injection.html#inject
* @see https://0.vuetifyjs.com/composables/foundation/create-context
*
* @example
* ```ts
* // Without default value
* const context = useContext<MyContext>('my-context')
*
* // With default value
* const context = useContext<MyContext>('my-context', defaultContext)
* ```
*/
function useContext(key, defaultValue) {
	const context = inject(key, defaultValue);
	if (/* @__PURE__ */ isUndefined(context)) throw new V0Error(`Context "${String(key)}" not found. Ensure it's provided by an ancestor.`, {
		code: "V0_CONTEXT_MISSING",
		key
	});
	return context;
}
/**
* Provides a context to all descendant components.
*
* @param key The key of the context to provide.
* @param context The context to provide.
* @param app Optional Vue app instance to provide the context at app level instead of component level.
* @template Z The type of the context.
* @returns The provided context.
*
* @remarks
* When `app` parameter is provided, the context is made available to all components in the app.
* When omitted, the context is provided at the current component level and available to descendants only.
*
* @see https://vuejs.org/api/composition-api-dependency-injection.html#provide
* @see https://0.vuetifyjs.com/composables/foundation/create-context
*
* @example
* ```ts
* // Component-level provision
* provideContext<MyContext>('my-context', context)
*
* // App-level provision (typically used in plugins)
* const app = createApp()
* provideContext<MyContext>('my-context', context, app)
* ```
*/
function provideContext(key, context, app) {
	if (app) app.provide(key, context);
	else provide(key, context);
	return context;
}
function createContext(keyOrOptions, defaultValue) {
	if (/* @__PURE__ */ isString(keyOrOptions) || /* @__PURE__ */ isSymbol(keyOrOptions)) {
		if (process.env.NODE_ENV !== "production" && /* @__PURE__ */ isString(keyOrOptions) && !keyOrOptions.includes(":")) console.warn(`[v0:context] String key "${keyOrOptions}" has no namespace separator. Use "namespace:key" format (e.g. "v0:theme") to prevent collisions.`);
		const _key = keyOrOptions;
		function _provideContext(context, app) {
			return provideContext(_key, context, app);
		}
		function _useContext() {
			return useContext(_key, defaultValue);
		}
		return [_useContext, _provideContext];
	}
	const suffix = /* @__PURE__ */ isObject(keyOrOptions) ? keyOrOptions.suffix : void 0;
	function _provideContext(key, context, app) {
		return provideContext(suffix ? `${key}:${suffix}` : key, context, app);
	}
	function _useContext(key, defaultValue) {
		return useContext(suffix ? `${key}:${suffix}` : key, defaultValue);
	}
	return [_useContext, _provideContext];
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/createTrinity/index.mjs
/**
* @module createTrinity
*
* @see https://0.vuetifyjs.com/composables/foundation/create-trinity
*
* @remarks
* Factory for creating the trinity pattern tuple used throughout the codebase.
*
* The trinity pattern returns a readonly tuple of [useContext, provideContext, defaultContext],
* enabling flexible dependency injection with sensible defaults. This pattern is fundamental
* to all registry-based composables.
*
* @example
* ```ts
* import { createTrinity } from '@vuetify/v0'
*
* const [useMyContext, provideMyContext, defaultContext] =
*   createTrinity('my-context', { foo: 'bar' })
* ```
*/
function createTrinity(keyOrUseContext, provideContextOrContext, maybeContext) {
	if (/* @__PURE__ */ isString(keyOrUseContext)) {
		const [useContext, provideContext] = createContext(keyOrUseContext);
		const context = provideContextOrContext;
		return [
			useContext,
			(_context = context, app) => provideContext(_context, app),
			context
		];
	}
	const provideContext = provideContextOrContext;
	const context = maybeContext;
	return [
		keyOrUseContext,
		(_context = context, app) => provideContext(_context, app),
		context
	];
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/createPlugin/index.mjs
/**
* @module createPlugin
*
* @see https://vuejs.org/guide/reusability/plugins.html
* @see https://0.vuetifyjs.com/composables/foundation/create-plugin
*
* @remarks
* Factory for creating Vue plugins with proper context provision.
*
* Wraps the provide function in app.runWithContext() to ensure proper execution context,
* allowing plugins to safely provide dependency injection contexts at the application level.
*
* Also exports `createPluginContext` — a higher-level factory that generates the standard
* context/plugin/consumer triple for plugin composables, eliminating boilerplate.
* Supports `persist()` / `restore()` lifecycle hooks for saving and rehydrating plugin state.
*
* In development, plugins that pass `devtools: true` appear under a single "v0"
* inspector in Vue DevTools. Default is off — opt in per plugin.
*
* @example
* ```ts
* import { createPlugin } from '@vuetify/v0'
*
* const plugin = createPlugin({
*   namespace: 'v0:my-plugin',
*   provide: app => app.provide('my-key', { greet: () => 'hello' }),
* })
* // app.use(plugin)
* ```
*/
var INSTALLED = Symbol.for("v0:installed-plugins");
function getInstalled(app) {
	const ctx = app._context;
	return ctx[INSTALLED] ??= /* @__PURE__ */ new Map();
}
/**
* Attach a plugin context to the DevTools inspector record for `namespace`.
*
* `createPluginContext` calls this after provide. Plugins that wrap
* `createPlugin` directly (stack, date) must call it from `provide`.
*
* @param app The Vue app the plugin was installed on.
* @param namespace The plugin namespace, e.g. `'v0:stack'`.
* @param context The live plugin context to show in the inspector.
*
* @example
* ```ts
* return createPlugin({
*   namespace,
*   provide: app => {
*     provideStackContext(context, app)
*     bindPluginContext(app, namespace, context)
*   },
* })
* ```
*/
function bindPluginContext(app, namespace, context) {
	const record = getInstalled(app).get(namespace);
	if (record) record.context = context;
}
function notifyDevtools(app) {
	/* v8 ignore next -- __DEV__ is a build-time constant; production short-circuits */
	if (/* @__PURE__ */ isUndefined(process.env.NODE_ENV !== "production") || !(process.env.NODE_ENV !== "production") || !IN_BROWSER$1) return;
	import("./assets/devtools-C8wuqC42.js").then((mod) => mod.sync(app, getInstalled(app)));
}
/**
* Creates a new Vue plugin.
*
* @param options The plugin options.
* @returns A new Vue plugin.
*
* @see https://0.vuetifyjs.com/composables/foundation/create-plugin
*
* @example
* ```ts
* export const [useContext, provideContext] = createContext<MyContext>('my-plugin')
*
* const context = {}
*
* export const MyPlugin = createPlugin({
*   namespace: 'my-plugin',
*   provide: (app) => {
*     provideContext(context, app)
*   },
*   setup: (app) => {
*     // Optional setup logic
*   },
* })
*/
function createPlugin(options) {
	return { install(app) {
		app.runWithContext(() => {
			const installed = getInstalled(app);
			if (installed.has(options.namespace)) return;
			installed.set(options.namespace, {
				namespace: options.namespace,
				devtools: options.devtools === true,
				inspect: options.inspect
			});
			options.provide(app);
			options.setup?.(app);
			if (options.devtools) notifyDevtools(app);
		});
	} };
}
function deriveKey(namespace) {
	return namespace.startsWith("v0:") ? namespace.slice(3) : namespace;
}
function getPersistedStorage() {
	return useContext("v0:storage");
}
function createPluginContext(defaultNamespace, factory, config) {
	function createXContext(_options = {}) {
		const { namespace = defaultNamespace, persist: _persist, devtools: _devtools, ...options } = _options;
		return createTrinity(namespace, factory(options));
	}
	function createXPlugin(_options = {}) {
		const { namespace = defaultNamespace, persist: shouldPersist, devtools, ...options } = _options;
		const enabled = devtools ?? config?.devtools ?? false;
		const inspect = config?.inspect;
		let context;
		return createPlugin({
			namespace,
			devtools: enabled,
			inspect: inspect ? (context) => inspect(context) : void 0,
			provide: (app) => {
				const [, provide, ctx] = createXContext({
					...options,
					namespace
				});
				context = ctx;
				provide(context, app);
				bindPluginContext(app, namespace, context);
				if (shouldPersist && config?.restore) {
					const storage = getPersistedStorage();
					const key = deriveKey(namespace);
					const saved = storage.get(key);
					if (!/* @__PURE__ */ isNullOrUndefined(saved.value)) config.restore(context, saved.value);
				}
			},
			setup: config?.setup || shouldPersist ? (app) => {
				const ctx = context;
				config?.setup?.(ctx, app, options);
				if (shouldPersist && config?.persist) {
					const storage = getPersistedStorage();
					const key = deriveKey(namespace);
					const stored = storage.get(key);
					const stop = watch(() => config.persist(ctx), (val) => {
						stored.value = val;
					});
					app.onUnmount(stop);
				}
			} : void 0
		});
	}
	function useX(namespace = defaultNamespace) {
		if (config?.fallback) {
			if (!hasInjectionContext()) return config.fallback(namespace);
			const provided = inject(namespace, void 0);
			if (!/* @__PURE__ */ isUndefined(provided)) return provided;
			return config.fallback(namespace);
		}
		return useContext(namespace);
	}
	return [
		createXContext,
		createXPlugin,
		useX
	];
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/useLogger/adapters/adapter.mjs
var LoggerAdapter = class {};
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/useLogger/adapters/v0.mjs
/**
* V0 logger adapter implementation
*
* This adapter provides console-based logging with proper formatting,
* color coding, timestamps, and log level filtering for development
* and production environments.
*/
var V0LoggerAdapter = class extends LoggerAdapter {
	prefix;
	colors;
	timestamps;
	constructor(options = {}) {
		super();
		this.prefix = options.prefix || "v0";
		this.colors = options.colors !== false;
		this.timestamps = options.timestamps !== false;
	}
	debug(message, ...args) {
		this.log("debug", "debug", message, ...args);
	}
	info(message, ...args) {
		this.log("info", "info", message, ...args);
	}
	warn(message, ...args) {
		this.log("warn", "warn", message, ...args);
	}
	error(message, ...args) {
		this.log("error", "error", message, ...args);
	}
	trace(message, ...args) {
		this.log("trace", "trace", message, ...args);
	}
	fatal(message, ...args) {
		this.log("fatal", "error", message, ...args);
	}
	format(level, message, ...args) {
		return [[
			this.timestamps ? this.timestamp() : "",
			`[${this.prefix} ${level.toLowerCase()}]`,
			message
		].filter(Boolean).join(" "), ...args];
	}
	timestamp() {
		if (!IN_BROWSER$1) return (/* @__PURE__ */ new Date()).toISOString();
		/* v8 ignore next -- defensive fallback, toTimeString always returns valid format */
		return (/* @__PURE__ */ new Date()).toTimeString().split(" ")[0] ?? "";
	}
	style(level) {
		if (!this.colors || !IN_BROWSER$1) return "";
		/* v8 ignore next -- LogLevel union is exhaustive */
		return {
			trace: "color: #64748b",
			debug: "color: #3b82f6",
			info: "color: #10b981",
			warn: "color: #f59e0b",
			error: "color: #ef4444",
			fatal: "color: #dc2626; font-weight: bold",
			silent: ""
		}[level] || "";
	}
	log(level, method, message, ...args) {
		const [formattedMessage, ...restArgs] = this.format(level, message, ...args);
		const style = this.style(level);
		if (IN_BROWSER$1 && style && /* @__PURE__ */ isFunction(console[method])) console[method](`%c${formattedMessage}`, style, ...restArgs);
		else if (/* @__PURE__ */ isFunction(console[method])) console[method](formattedMessage, ...restArgs);
	}
};
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/useLogger/index.mjs
/**
* @module useLogger
*
* @see https://0.vuetifyjs.com/composables/plugins/use-logger
*
* @remarks
* Logging composable with adapter pattern supporting console, consola, and pino.
*
* Key features:
* - Multiple log levels (trace, debug, info, warn, error, fatal)
* - Adapter pattern for console/consola/pino integration
* - Enable/disable logging
* - Fallback logger for undefined loggers
* - Context logging support
*
* Uses adapter pattern to abstract logging implementation.
*
* @example
* ```ts
* import { useLogger } from '@vuetify/v0'
*
* const logger = useLogger()
* logger.info('hello')
* logger.warn('careful')
* ```
*/
/**
* Creates a new logger instance.
*
* @param options The options for the logger instance.
* @returns A new logger instance.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-logger
*
* @example
* ```ts
* import { createLogger } from '@vuetify/v0'
*
* const logger = createLogger({
*   level: 'debug',
*   prefix: '[MyApp]',
* })
*
* logger.info('This is an info message')
* logger.debug('This is a debug message')
* logger.error('This is an error message')
* logger.level('debug')
* logger.debug('This debug message will now be logged')
* ```
*/
function createLogger(options = {}) {
	const { adapter = new V0LoggerAdapter({ prefix: options.prefix }), level: initialLevel = "info", enabled: initialEnabled = __LOGGER_ENABLED__ } = options;
	let currentLevel = initialLevel;
	let isEnabled = initialEnabled;
	function value(level) {
		return {
			trace: 0,
			debug: 1,
			info: 2,
			warn: 3,
			error: 4,
			fatal: 5,
			silent: 6
		}[level] ?? 2;
	}
	function can(level) {
		if (!isEnabled) return false;
		return value(level) >= value(currentLevel);
	}
	function format(message) {
		return message;
	}
	function debug(message, ...args) {
		if (can("debug")) adapter.debug(format(message), ...args);
	}
	function info(message, ...args) {
		if (can("info")) adapter.info(format(message), ...args);
	}
	function warn(message, ...args) {
		if (can("warn")) adapter.warn(format(message), ...args);
	}
	function error(message, ...args) {
		if (can("error")) adapter.error(format(message), ...args);
	}
	function trace(message, ...args) {
		if (can("trace")) adapter.trace?.(format(message), ...args);
	}
	function fatal(message, ...args) {
		if (can("fatal")) adapter.fatal?.(format(message), ...args);
	}
	function level(newLevel) {
		currentLevel = newLevel;
	}
	function current() {
		return currentLevel;
	}
	function enabled() {
		return isEnabled;
	}
	function enable() {
		isEnabled = true;
	}
	function disable() {
		isEnabled = false;
	}
	return {
		debug,
		info,
		warn,
		error,
		trace,
		fatal,
		level,
		current,
		enabled,
		enable,
		disable,
		adapter
	};
}
var NAMESPACE = "v0:logger";
function createFallbackLogger(namespace = NAMESPACE) {
	function format(message, type) {
		return `[${namespace} ${type}] ${message}`;
	}
	return {
		debug: (message, ...args) => console.debug(format(message, "debug"), ...args),
		info: (message, ...args) => console.info(format(message, "info"), ...args),
		warn: (message, ...args) => console.warn(format(message, "warn"), ...args),
		error: (message, ...args) => console.error(format(message, "error"), ...args),
		trace: (message, ...args) => console.trace(format(message, "trace"), ...args),
		fatal: (message, ...args) => console.error(format(message, "fatal"), ...args),
		level: () => {},
		current: () => "info",
		enabled: () => true,
		enable: () => {},
		disable: () => {},
		adapter: new V0LoggerAdapter({ prefix: namespace })
	};
}
/**
* Creates a new logger context.
*
* @param options The options for the logger context.
* @template E The type of the logger context.
* @returns A new logger context.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-logger
*
* @example
* ```ts
* import { createLoggerContext } from '@vuetify/v0'
*
* export const [useAppLogger, provideAppLogger, appLogger] = createLoggerContext({
*   namespace: 'app:logger',
*   level: 'debug',
* })
* ```
*/
var [createLoggerContext, createLoggerPlugin, useLoggerContext] = /* @__PURE__ */ createPluginContext(NAMESPACE, (options) => createLogger(options), {
	fallback: (ns) => createFallbackLogger(ns),
	inspect: (ctx) => ({
		level: ctx.current(),
		enabled: ctx.enabled(),
		adapter: ctx.adapter.constructor.name
	}),
	setup: (context, _app, _options) => {
		if (typeof (process.env.NODE_ENV !== "production") !== "undefined" && process.env.NODE_ENV !== "production" && IN_BROWSER$1) window.__v0Logger__ = context;
	}
});
function createScopedLogger(logger, scope) {
	const tag = `[${scope}]`;
	function wrap(method) {
		return (message, ...args) => method(`${tag} ${message}`, ...args);
	}
	return {
		...logger,
		debug: wrap(logger.debug),
		info: wrap(logger.info),
		warn: wrap(logger.warn),
		error: wrap(logger.error),
		trace: wrap(logger.trace),
		fatal: wrap(logger.fatal)
	};
}
/**
* Consumes the application logger provided by `createLoggerPlugin`.
*
* Call with no argument to use the configured logger as-is. Pass a scope key to get a
* logger that prefixes every message with a `[scope]` segment after the plugin prefix —
* useful for telling apart output from composables that share the app-level logger. A
* scoped logger shares the underlying logger's level, enabled state, and adapter; only
* the message prefix differs. A blank scope is treated as no scope.
*
* @param scope Optional per-caller scope key prefixed onto every message.
* @returns The application logger, or a scoped wrapper around it.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-logger
*
* @example
* ```ts
* import { useLogger } from '@vuetify/v0'
*
* const logger = useLogger('createKanban')
*
* logger.warn('drop rejected')
* // → [v0 warn] [createKanban] drop rejected
* ```
*/
function useLogger(scope) {
	const logger = useLoggerContext();
	return /* @__PURE__ */ isUndefined(scope) || !scope.trim() ? logger : createScopedLogger(logger, scope);
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/createRegistry/index.mjs
/**
* @module createRegistry
*
* @see https://0.vuetifyjs.com/composables/registration/create-registry
*
* @remarks
* A foundational composable for managing collections of items (tickets) with:
* - Unique ID-based access
* - Index-based ordering and reordering via `move()`
* - Value-based reverse lookup
* - `unregister()` for individual item removal
* - Automatic reindexing
* - Batched event dispatch to prevent N cache invalidations
* - Performance-optimized caching
*
* The registry serves as the base for many other composables in the system,
* including createSelection, createForm, createTimeline, and more.
*
* @example
* ```ts
* import { createRegistry } from '@vuetify/v0'
*
* const registry = createRegistry()
* const ticket = registry.register({ value: 'item-1' })
* console.log(registry.size) // 1
* registry.unregister(ticket.id)
* ```
*/
/**
* Creates a new registry instance.
*
* @param options The options for the registry instance.
* @template Z The type of registry ticket that extends RegistryTicket. Use this to add custom properties to tickets.
* @template E The type of registry context that extends RegistryContext<Z>. Use this when extending the registry with additional methods.
* @returns A new registry instance.
*
* @see https://0.vuetifyjs.com/composables/registration/create-registry
*
* @example
* ```ts
* import { createRegistry } from '@vuetify/v0'
*
* const registry = createRegistry()
*
* const ticket1 = registry.register({ id: 'user-1', value: { name: 'John' } })
* const ticket2 = registry.register({ id: 'user-2', value: { name: 'Jane' } })
*
* console.log(registry.size) // 2
* console.log(registry.get('user-1')) // { id: 'user-1', index: 0, value: { name: 'John' }, ... }
* ```
*/
function createRegistry(options) {
	const logger = useLogger();
	const events = options?.events ?? false;
	const reactive = options?.reactive ?? false;
	const collection = reactive ? shallowReactive(/* @__PURE__ */ new Map()) : /* @__PURE__ */ new Map();
	const catalog = /* @__PURE__ */ new Map();
	const directory = /* @__PURE__ */ new Map();
	const cache = /* @__PURE__ */ new Map();
	const listeners = /* @__PURE__ */ new Map();
	const minted = /* @__PURE__ */ new WeakSet();
	const order = [];
	const version = shallowRef(0);
	let indexDependentCount = 0;
	let needsReindex = false;
	let minDirtyIndex = Infinity;
	let maxDirtyIndex = -Infinity;
	let isBatching = false;
	let structural = false;
	let batched = [];
	function dispatch(event, data) {
		const cbs = listeners.get(event);
		if (!cbs) return;
		for (const cb of cbs) cb(data);
	}
	function emit(event, data = void 0) {
		if (!events) return;
		if (isBatching) {
			batched.push({
				event,
				data
			});
			return;
		}
		dispatch(event, data);
	}
	function on(event, cb) {
		if (!events) {
			logger.warn(`Events are disabled. Initialize with \`createRegistry({ events: true })\` to enable.`);
			return;
		}
		if (!listeners.has(event)) listeners.set(event, /* @__PURE__ */ new Set());
		const cbs = listeners.get(event);
		cbs.add(cb);
		if (process.env.NODE_ENV !== "production" && cbs.size === 101) logger.warn(`Event "${event}" has ${cbs.size} listeners. Possible memory leak.`);
	}
	function off(event, cb) {
		if (!events) {
			logger.warn(`Events are disabled. Initialize with \`createRegistry({ events: true })\` to enable.`);
			return;
		}
		listeners.get(event)?.delete(cb);
	}
	function dispose() {
		listeners.clear();
		clear();
	}
	function get(id) {
		return collection.get(id);
	}
	function upsert(id, patch = {}, event) {
		if (needsReindex) reindex();
		const existing = get(id);
		if (!existing) return register({
			...patch,
			id
		});
		const hasValue = Object.hasOwn(patch, "value");
		let value = existing.value;
		let valueIsIndex = existing.valueIsIndex;
		if (hasValue) {
			if (/* @__PURE__ */ isUndefined(patch.value)) {
				value = existing.index;
				valueIsIndex = true;
			} else {
				value = patch.value;
				valueIsIndex = false;
			}
			if (valueIsIndex !== existing.valueIsIndex) {
				if (valueIsIndex) indexDependentCount++;
				else indexDependentCount--;
			}
			if (!Object.is(value, existing.value)) {
				unassign(existing.value, id);
				assign(value, id);
			}
		}
		Object.assign(existing, patch, {
			id,
			index: existing.index,
			value,
			valueIsIndex
		});
		collection.set(id, existing);
		cache.clear();
		emit("update:ticket", existing);
		if (event) emit(event, existing);
		return existing;
	}
	function browse(value) {
		if (needsReindex) reindex();
		const bucket = catalog.get(value);
		return bucket ? bucket.slice() : void 0;
	}
	function lookup(index) {
		if (needsReindex) reindex();
		return directory.get(index);
	}
	function has(id) {
		return collection.has(id);
	}
	function assign(value, id) {
		const bucket = catalog.get(value);
		if (bucket) {
			if (!bucket.includes(id)) bucket.push(id);
		} else catalog.set(value, [id]);
	}
	function unassign(value, id) {
		const bucket = catalog.get(value);
		if (!bucket) return;
		const next = bucket.filter((v) => v !== id);
		if (next.length === 0) catalog.delete(value);
		else catalog.set(value, next);
	}
	function keys() {
		if (reactive) version.value;
		const cached = cache.get("keys");
		if (!/* @__PURE__ */ isUndefined(cached)) return cached;
		const out = order.map((ticket) => ticket.id);
		cache.set("keys", out);
		return out;
	}
	function values() {
		if (reactive) version.value;
		const cached = cache.get("values");
		if (!/* @__PURE__ */ isUndefined(cached)) return cached;
		const out = order.slice();
		cache.set("values", out);
		return out;
	}
	function entries() {
		if (reactive) version.value;
		const cached = cache.get("entries");
		if (!/* @__PURE__ */ isUndefined(cached)) return cached;
		const out = order.map((ticket) => [ticket.id, ticket]);
		cache.set("entries", out);
		return out;
	}
	function clear() {
		order.length = 0;
		collection.clear();
		catalog.clear();
		directory.clear();
		invalidate();
		indexDependentCount = 0;
		needsReindex = false;
		minDirtyIndex = Infinity;
		maxDirtyIndex = -Infinity;
		emit("clear:registry");
	}
	function invalidate() {
		cache.clear();
		if (isBatching) {
			structural = true;
			return;
		}
		version.value++;
	}
	function batch(fn) {
		if (isBatching) return fn();
		isBatching = true;
		structural = false;
		batched = [];
		try {
			return fn();
		} finally {
			isBatching = false;
			const queue = batched;
			batched = [];
			cache.clear();
			try {
				for (const { event, data } of queue) dispatch(event, data);
			} finally {
				if (structural) version.value++;
			}
		}
	}
	function reindex() {
		const size = order.length;
		const start = minDirtyIndex === Infinity ? 0 : minDirtyIndex;
		const end = maxDirtyIndex === -Infinity ? size - 1 : Math.min(maxDirtyIndex, size - 1);
		const full = start === 0 && end === size - 1;
		invalidate();
		if (full) {
			catalog.clear();
			directory.clear();
		} else for (let i = start; i <= end; i++) {
			const ticket = order[i];
			directory.delete(ticket.index);
			if (ticket.valueIsIndex) unassign(ticket.value, ticket.id);
		}
		for (let i = start; i <= end; i++) {
			const ticket = order[i];
			if (ticket.valueIsIndex) {
				ticket.value = i;
				assign(ticket.value, ticket.id);
			} else if (full) assign(ticket.value, ticket.id);
			ticket.index = i;
			directory.set(i, ticket.id);
		}
		needsReindex = false;
		minDirtyIndex = Infinity;
		maxDirtyIndex = -Infinity;
		emit("reindex:registry");
	}
	function register(registration = {}) {
		if (needsReindex) reindex();
		const size = collection.size;
		const auto = /* @__PURE__ */ isNullOrUndefined(registration.id);
		const id = registration.id ?? /* @__PURE__ */ useId$1();
		if (has(id)) {
			logger.warn(`Ticket "${id}" already exists. Use \`upsert()\` to update or check \`has()\` before registering.`);
			return get(id);
		}
		const valueIsUndefined = /* @__PURE__ */ isUndefined(registration.value);
		const index = size;
		const value = valueIsUndefined ? index : registration.value;
		const valueIsIndex = registration.valueIsIndex ?? valueIsUndefined;
		if (valueIsIndex) indexDependentCount++;
		const input = {
			unregister: () => unregister(id),
			...registration,
			id,
			index,
			value,
			valueIsIndex
		};
		const ticket = reactive ? shallowReactive(input) : input;
		if (auto) minted.add(ticket);
		collection.set(ticket.id, ticket);
		order.push(ticket);
		directory.set(ticket.index, ticket.id);
		assign(ticket.value, ticket.id);
		invalidate();
		emit("register:ticket", ticket);
		return ticket;
	}
	function unregister(id) {
		const ticket = collection.get(id);
		if (!ticket) return;
		if (ticket.valueIsIndex) indexDependentCount--;
		let orderPos = ticket.index;
		if (order[orderPos] !== ticket) orderPos = order.indexOf(ticket);
		if (orderPos !== -1) order.splice(orderPos, 1);
		collection.delete(ticket.id);
		directory.delete(ticket.index);
		unassign(ticket.value, ticket.id);
		const willReindex = indexDependentCount > 0 && ticket.index < collection.size;
		if (!willReindex) invalidate();
		minDirtyIndex = Math.min(minDirtyIndex, ticket.index);
		if (willReindex) reindex();
		else needsReindex = true;
		emit("unregister:ticket", ticket);
	}
	function onboard(registrations) {
		return batch(() => registrations.map((registration) => register(registration)));
	}
	function toInput(ticket) {
		const input = { ...ticket };
		delete input.index;
		delete input.valueIsIndex;
		delete input.unregister;
		if (minted.has(ticket)) delete input.id;
		if (ticket.valueIsIndex) delete input.value;
		return input;
	}
	function offboard(ids) {
		const removed = [];
		const removedIds = /* @__PURE__ */ new Set();
		for (const id of ids) {
			if (removedIds.has(id)) continue;
			const ticket = collection.get(id);
			if (ticket) {
				removed.push(ticket);
				removedIds.add(id);
			}
		}
		if (removed.length === 0) return [];
		batch(() => {
			let w = 0;
			for (const ticket of order) if (!removedIds.has(ticket.id)) order[w++] = ticket;
			order.length = w;
			invalidate();
			for (const ticket of removed) {
				if (ticket.valueIsIndex) indexDependentCount--;
				minDirtyIndex = Math.min(minDirtyIndex, ticket.index);
				collection.delete(ticket.id);
				directory.delete(ticket.index);
				unassign(ticket.value, ticket.id);
			}
			for (const ticket of removed) emit("unregister:ticket", ticket);
			if (indexDependentCount > 0 && minDirtyIndex < collection.size) reindex();
			else needsReindex = true;
		});
		return removed.map((ticket) => toInput(ticket));
	}
	function move(id, toIndex) {
		if (needsReindex) reindex();
		const ticket = collection.get(id);
		if (!ticket) return void 0;
		const size = collection.size;
		const target = /* @__PURE__ */ clamp$1(toIndex, 0, size - 1);
		const from = ticket.index;
		if (from === target) return ticket;
		return batch(() => {
			order.splice(from, 1);
			order.splice(target, 0, ticket);
			minDirtyIndex = Math.min(from, target);
			maxDirtyIndex = Math.max(from, target);
			reindex();
			emit("update:ticket", ticket);
			return ticket;
		});
	}
	function reorder(ids) {
		if (needsReindex) reindex();
		if (ids.length !== collection.size) return;
		const seen = /* @__PURE__ */ new Set();
		const next = [];
		for (const id of ids) {
			if (seen.has(id)) return;
			const ticket = collection.get(id);
			if (!ticket) return;
			seen.add(id);
			next.push(ticket);
		}
		batch(() => {
			for (const [i, ticket] of next.entries()) order[i] = ticket;
			minDirtyIndex = 0;
			maxDirtyIndex = -Infinity;
			reindex();
		});
	}
	function seek(direction = "first", from, predicate) {
		if (collection.size === 0) return void 0;
		if (needsReindex) reindex();
		const n = order.length;
		if (!predicate && /* @__PURE__ */ isUndefined(from)) return direction === "first" ? order[0] : order.at(-1);
		const index = /* @__PURE__ */ isUndefined(from) ? void 0 : /* @__PURE__ */ clamp$1(from, 0, n - 1);
		if (direction === "last") {
			const start = /* @__PURE__ */ isUndefined(index) ? n - 1 : index;
			for (let i = start; i >= 0; i--) {
				const ticket = order[i];
				if (!predicate || predicate(ticket)) return ticket;
			}
		} else {
			const start = /* @__PURE__ */ isUndefined(index) ? 0 : index;
			for (let i = start; i < n; i++) {
				const ticket = order[i];
				if (!predicate || predicate(ticket)) return ticket;
			}
		}
	}
	return {
		collection,
		emit,
		on,
		off,
		dispose,
		has,
		keys,
		clear,
		browse,
		entries,
		values,
		lookup,
		get,
		upsert,
		register,
		unregister,
		reindex,
		move,
		reorder,
		seek,
		batch,
		onboard,
		offboard,
		get size() {
			return collection.size;
		}
	};
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/createModel/index.mjs
/**
* @module createModel
*
* @see https://0.vuetifyjs.com/composables/selection/create-model
*
* @remarks
* Value store layer that extends createRegistry with a reactive Set of
* selected IDs, disabled guards, and an `apply` bridge for useProxyModel sync.
*
* Think of it as a creative way to store a single value — more like
* `defineModel` than `createSelection`. Selection-specific concepts
* (mandatory) belong in createSelection. The `multiple` option here
* controls whether `select()` accumulates or replaces. The `enroll` option
* auto-selects items on register.
*
* Both Selection and Slider extend this layer:
* - createRegistry → createModel → createSelection → createSingle/createGroup/createStep
* - createRegistry → createModel → createSlider (values override)
*
* @example
* ```ts
* import { createModel } from '@vuetify/v0'
*
* const model = createModel({ multiple: false })
* model.register({ value: 'apple' })
* model.select(model.values()[0]!.id)
* ```
*/
/**
* Creates a new model instance for storing a single value.
*
* @param options The options for the model instance.
* @template Z The input ticket type. Extend {@link ModelTicketInput} to add custom properties.
* @template E The output ticket type. Automatically includes `disabled` and `isSelected`.
* @template R The context type. Defaults to {@link ModelContext}<Z, E>.
* @returns A new model instance with selection tracking and disabled guards.
*
* @remarks
* Extends createRegistry with value tracking via a reactive Set of selected IDs.
* Provides the shared model-value concept used by both Selection and Slider.
*
* **Enrollment**: Tickets are auto-selected on registration by default (`enroll: true`).
* With single-value semantics, only the most recently registered ticket is active.
* Pass `enroll: false` to opt out. `createSelection` overrides this to `false`.
*
* **Apply bridge**: `useProxyModel` calls `apply()` to sync a ref with the model.
* When the active ticket's value is a ref, `apply` writes to it directly. Otherwise,
* it resolves via `registry.browse()`.
*
* @see https://0.vuetifyjs.com/composables/selection/create-model
*
* @example
* ```ts
* import { shallowRef } from 'vue'
* import { createModel, useProxyModel } from '@vuetify/v0'
*
* const value = shallowRef('Apple')
* const model = createModel({ events: true })
*
* model.register({ id: 'fruit', value })
* useProxyModel(model, value)
*
* // value and model stay in sync bidirectionally
* ```
*
* @example
* ```ts
* // Disabled model — all selection operations are no-ops
* const model = createModel({ disabled: true })
* model.register({ id: 'a', value: shallowRef('Apple') })
* model.select('a') // no-op
* ```
*/
function createModel(_options = {}) {
	const { disabled = false, enroll = true, multiple = false, ...options } = _options;
	const registry = createRegistry(options);
	const selectedIds = shallowReactive(/* @__PURE__ */ new Set());
	const selectedItems = computed(() => new Set(/* @__PURE__ */ resolveIds(selectedIds, registry.get)));
	const selectedValues = computed(() => {
		const out = /* @__PURE__ */ new Set();
		for (const item of selectedItems.value) out.add(toValue(item.value));
		return out;
	});
	function select(id) {
		if (toValue(disabled)) return;
		const item = registry.get(id);
		if (!item || toValue(item.disabled)) return;
		if (!toValue(multiple)) selectedIds.clear();
		selectedIds.add(id);
	}
	function unselect(id) {
		if (toValue(disabled)) return;
		const item = registry.get(id);
		if (!item || toValue(item.disabled)) return;
		selectedIds.delete(id);
	}
	function toggle(id) {
		if (toValue(disabled)) return;
		if (selected(id)) unselect(id);
		else select(id);
	}
	function selected(id) {
		return selectedIds.has(id);
	}
	function apply(values, _options) {
		const value = values[0];
		let written = false;
		for (const id of selectedIds) {
			const item = registry.get(id);
			if (!item || !isRef(item.value)) continue;
			if (!/* @__PURE__ */ isUndefined(value)) item.value.value = value;
			written = true;
		}
		if (written) return;
		if (!toValue(multiple)) selectedIds.clear();
		if (/* @__PURE__ */ isUndefined(value)) return;
		const id = registry.browse(toRaw(value))?.values().next().value;
		if (!/* @__PURE__ */ isUndefined(id)) select(id);
	}
	function register(registration = {}) {
		const id = registration.id ?? /* @__PURE__ */ useId$1();
		const item = {
			disabled: false,
			unregister: () => unregister(id),
			...registration,
			isSelected: toRef(() => selected(id)),
			id
		};
		const ticket = registry.register(item);
		if (toValue(enroll) && !toValue(disabled) && !toValue(ticket.disabled)) select(id);
		return ticket;
	}
	function unregister(id) {
		selectedIds.delete(id);
		registry.unregister(id);
	}
	function onboard(registrations) {
		return registry.batch(() => registrations.map((r) => register(r)));
	}
	function offboard(ids) {
		for (const id of ids) selectedIds.delete(id);
		return registry.offboard(ids);
	}
	function reset() {
		selectedIds.clear();
	}
	function clear() {
		reset();
		registry.clear();
	}
	function dispose() {
		reset();
		registry.dispose();
	}
	return {
		...registry,
		disabled,
		selectedIds,
		selectedItems,
		selectedValues,
		register,
		onboard,
		unregister,
		offboard,
		clear,
		dispose,
		reset,
		select,
		unselect,
		toggle,
		selected,
		apply,
		get size() {
			return registry.size;
		}
	};
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/createSelection/index.mjs
/**
* @module createSelection
*
* @see https://0.vuetifyjs.com/composables/selection/create-selection
*
* @remarks
* Selection composable that extends createModel with multi-select,
* mandatory enforcement, auto-enrollment, and ticket self-methods.
*
* Key features:
* - Set-based selectedIds for O(1) selection checks
* - Single or multi-select mode
* - Mandatory selection mode (prevents deselecting last item)
* - Auto-enrollment option (selects non-disabled items on register)
* - `MaybeRefOrGetter` support for `mandatory`, `multiple`, and `enroll` options
* - Disabled item filtering
* - Computed selectedItems and selectedValues Sets
* - Ticket self-methods: select(), unselect(), toggle()
*
* Extends createModel and serves as the base for createSingle, createGroup, createStep, and useFeatures.
*
* @example
* ```ts
* import { createSelection } from '@vuetify/v0'
*
* const selection = createSelection({ multiple: true })
* const a = selection.register({ value: 'a' })
* const b = selection.register({ value: 'b' })
* selection.select([a.id, b.id])
* ```
*/
/**
* Creates a new selection instance for managing multiple selected items.
*
* Extends `createModel` with multi-select, mandatory enforcement,
* auto-enrollment, and ticket self-methods.
* Supports disabled items, mandatory selection enforcement, and auto-enrollment.
*
* @param options The options for the selection instance.
* @template Z The input ticket type - what users provide to register(). Extend SelectionTicketInput to add custom properties.
* @template E The output ticket type - what users receive from get(). Automatically includes selection methods.
* @template R The context type. Defaults to SelectionContext<Z, E>.
* @returns A new selection instance with selection management methods.
*
* @remarks
* **Key Features:**
* - Multi-selection support (unlike `createSingle` which enforces single selection)
* - Set-based `selectedIds` tracking for efficient lookups
* - Computed `selectedItems` and `selectedValues` for reactive access
* - Each ticket gets `isSelected`, `select()`, `unselect()`, and `toggle()` methods
* - Disabled items cannot be selected
* - Mandatory mode prevents deselecting the last item
* - Force mode auto-selects first non-disabled item on registration
* - Enroll option auto-selects all non-disabled items on registration
*
* **Inheritance Chain:**
* `createRegistry` → `createModel` → `createSelection` → `createSingle`/`createGroup` → `createStep`
*
* @see https://0.vuetifyjs.com/composables/selection/create-selection
*
* @example
* ```ts
* import { createSelection } from '@vuetify/v0'
*
* // Basic usage
* const selection = createSelection({ mandatory: true })
*
* selection.onboard([
*   { id: 'item-1', value: 'Item 1' },
*   { id: 'item-2', value: 'Item 2', disabled: true },
*   { id: 'item-3', value: 'Item 3' },
* ])
*
* selection.select('item-1')
* selection.select('item-3')
*
* console.log(selection.selectedIds) // Set { 'item-1', 'item-3' }
* console.log(Array.from(selection.selectedValues.value)) // ['Item 1', 'Item 3']
* ```
*
* @example
* ```ts
* // With custom ticket type
* interface MyTicket extends SelectionTicketInput {
*   label: string
*   icon?: string
* }
*
* const tabs = createSelection<MyTicket>()
*
* tabs.register({ label: 'Home', icon: 'mdi-home' })
* tabs.register({ label: 'Settings' })
*
* const ticket = tabs.get('...')
* // ticket has: label, icon, isSelected, select(), unselect(), toggle()
* ```
*/
function createSelection(_options = {}) {
	const { enroll = false, mandatory = false, multiple = false, ...options } = _options;
	const model = createModel({
		...options,
		multiple,
		enroll: false
	});
	function seek(direction = "first", from) {
		return model.seek(direction, from, (ticket) => !toValue(ticket.disabled));
	}
	function mandate() {
		if (!toValue(mandatory) || model.size === 0 || model.selectedIds.size > 0) return;
		const ticket = seek("first");
		if (ticket) model.select(ticket.id);
	}
	function drain(id) {
		if (toValue(model.disabled)) return;
		if (toValue(mandatory) && model.selectedIds.size === 1) return;
		model.selectedIds.delete(id);
	}
	function unselect(id) {
		if (toValue(model.disabled)) return;
		const item = model.get(id);
		if (!item || toValue(item.disabled)) return;
		drain(id);
	}
	function toggle(id) {
		if (toValue(model.disabled)) return;
		if (model.selectedIds.has(id)) unselect(id);
		else model.select(id);
	}
	function apply(values, options) {
		const isMultiple = options?.multiple ?? toValue(multiple);
		const currentIds = new Set(model.selectedIds);
		const targetIds = /* @__PURE__ */ new Set();
		if (isMultiple) {
			for (const value of values) {
				const ids = model.browse(toRaw(value));
				if (/* @__PURE__ */ isUndefined(ids)) continue;
				for (const id of ids) {
					const ticket = model.get(id);
					if (!ticket || toValue(ticket.disabled)) continue;
					targetIds.add(id);
				}
			}
			if (toValue(mandatory) && targetIds.size === 0) return;
			for (const id of currentIds) if (!targetIds.has(id)) model.selectedIds.delete(id);
			for (const id of targetIds) model.selectedIds.add(id);
		} else {
			for (const value of values) {
				const ids = model.browse(toRaw(value));
				if (/* @__PURE__ */ isUndefined(ids)) continue;
				for (const id of ids) targetIds.add(id);
			}
			const next = targetIds.values().next().value;
			const last = currentIds.values().next().value;
			if (!/* @__PURE__ */ isUndefined(last)) drain(last);
			if (!/* @__PURE__ */ isUndefined(next)) model.select(next);
		}
	}
	function register(registration = {}) {
		const id = registration.id ?? /* @__PURE__ */ useId$1();
		const decorated = {
			select: () => model.select(id),
			unselect: () => unselect(id),
			toggle: () => toggle(id),
			...registration,
			id
		};
		const ticket = model.register(decorated);
		if (toValue(enroll) && !toValue(model.disabled) && !toValue(ticket.disabled)) model.select(ticket.id);
		if (toValue(mandatory) === "force") mandate();
		return ticket;
	}
	function onboard(registrations) {
		const tickets = model.batch(() => registrations.map((registration) => register(registration)));
		if (toValue(mandatory) === "force") mandate();
		return tickets;
	}
	return {
		...model,
		multiple,
		register,
		onboard,
		unselect,
		toggle,
		apply,
		mandate,
		seek,
		get size() {
			return model.size;
		}
	};
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/createSingle/index.mjs
/**
* @module createSingle
*
* @see https://0.vuetifyjs.com/composables/selection/create-single
*
* @remarks
* Single-selection composable that extends createSelection to enforce only one selected item.
*
* Key features:
* - Auto-clears previous selection when selecting new item
* - Singular computed properties (selectedId, selectedItem, selectedIndex, selectedValue)
* - Perfect for tabs, radio buttons, theme selectors
*
* Inheritance chain: createRegistry → createSelection → createSingle
*
* @example
* ```ts
* import { createSingle } from '@vuetify/v0'
*
* const single = createSingle()
* const ticket = single.register({ value: 'tab-1' })
* single.select(ticket.id)
* console.log(single.selectedValue.value) // 'tab-1'
* ```
*/
/**
* Creates a new single selection instance that enforces only one selected item at a time.
*
* Extends `createSelection` by automatically clearing previous selections when a new item is selected.
* Adds computed singular properties: `selectedId`, `selectedItem`, `selectedIndex`, `selectedValue`.
*
* @param options The options for the single selection instance.
* @template Z The input ticket type - what users provide to register().
* @template E The output ticket type - what users receive from get().
* @template R The context type.
* @returns A new single selection instance with single-selection enforcement.
*
* @remarks
* **Key Differences from `createSelection`:**
* - Automatically clears `selectedIds` before selecting a new item (enforces single selection)
* - Provides singular computed properties instead of plural sets
* - Perfect for tabs, radio buttons, theme selectors, and other single-choice UI components
*
* **Computed Properties:**
* - `selectedId`: The ID of the selected item (undefined if none selected)
* - `selectedItem`: The selected ticket object (undefined if none selected)
* - `selectedIndex`: The index of the selected item (-1 if none selected)
* - `selectedValue`: The value of the selected item (undefined if none selected)
*
* **Inheritance Chain:**
* `createRegistry` → `createSelection` → `createSingle` → `createStep`
*
* @see https://0.vuetifyjs.com/composables/selection/create-single
*
* @example
* ```ts
* import { createSingle } from '@vuetify/v0'
*
* const tabs = createSingle({ mandatory: true })
*
* tabs.onboard([
*   { id: 'home', value: 'Home' },
*   { id: 'about', value: 'About' },
*   { id: 'contact', value: 'Contact' },
* ])
*
* tabs.first() // Select first tab
*
* console.log(tabs.selectedId.value) // 'home'
* console.log(tabs.selectedIndex.value) // 0
*
* tabs.select('about') // Switch to about tab
* console.log(tabs.selectedId.value) // 'about'
* console.log(tabs.selectedIds.size) // 1 (always enforces single selection)
* ```
*
* @example
* ```ts
* // With custom ticket type
* interface TabTicket extends SingleTicketInput {
*   label: string
*   icon?: string
* }
*
* const tabs = createSingle<TabTicket>()
* tabs.register({ label: 'Home', icon: 'mdi-home' })
* ```
*/
function createSingle(_options = {}) {
	const { mandatory = false, ...options } = _options;
	const registry = createSelection({
		...options,
		mandatory,
		multiple: false
	});
	const selectedId = toRef(() => registry.selectedIds.values().next().value);
	const selectedItem = toRef(() => registry.selectedItems.value.values().next().value);
	const selectedIndex = toRef(() => selectedItem.value?.index ?? -1);
	const selectedValue = toRef(() => selectedItem.value?.value);
	return {
		...registry,
		selectedId,
		selectedItem,
		selectedIndex,
		selectedValue,
		get size() {
			return registry.size;
		}
	};
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/createTokens/index.mjs
/**
* @module createTokens
*
* @see https://0.vuetifyjs.com/composables/registration/create-tokens
*
* @remarks
* Design token registry with alias resolution and W3C Design Tokens format support.
*
* Key features:
* - Alias resolution with circular reference detection
* - Nested token flattening with dot notation
* - W3C Design Tokens format ($value, $type, $description, $extensions)
* - Path-based resolution (e.g., {colors.blue.500} or colors.blue.500)
* - Resolution caching for performance
*
* Used by useTheme, useLocale, useFeatures, and usePermissions for token-based configuration.
*
* @example
* ```ts
* import { createTokens } from '@vuetify/v0'
*
* const tokens = createTokens({
*   colors: { primary: '#1976d2' },
* })
* console.log(tokens.resolve('{colors.primary}'))
* ```
*/
/**
* Creates a new token instance.
*
* @param tokens The tokens to use.
* @param options The options for the token instance.
* @template Z The type of the token ticket.
* @template E The type of the token context.
* @returns A new token instance.
*
* @see https://www.designtokens.org/tr/drafts/format/
* @see https://0.vuetifyjs.com/composables/registration/create-tokens
*
* @example
* ```ts
* import { createTokens } from '@vuetify/v0'
*
* const tokens = createTokens({
*   colors: {
*     primary: '#3b82f6',
*     secondary: '{colors.primary}', // Alias reference
*   },
* })
*
* console.log(tokens.resolve('{colors.primary}')) // '#3b82f6'
* console.log(tokens.resolve('{colors.secondary}')) // '#3b82f6'
* ```
*/
function createTokens(tokens = {}, options = {}) {
	const logger = useLogger();
	const registry = createRegistry({
		...options,
		events: true
	});
	const cache = /* @__PURE__ */ new Map();
	function invalidate() {
		cache.clear();
	}
	registry.on("register:ticket", invalidate);
	registry.on("unregister:ticket", invalidate);
	registry.on("update:ticket", invalidate);
	registry.on("reindex:registry", invalidate);
	registry.on("clear:registry", invalidate);
	registry.onboard(/* @__PURE__ */ flatten(tokens, options.prefix, !!options.flat));
	function isAlias(token) {
		return /* @__PURE__ */ isString(token) && token.length > 2 && token[0] === "{" && token.at(-1) === "}";
	}
	function isTokenAlias(value) {
		return /* @__PURE__ */ isObject(value) && "$value" in value;
	}
	function resolve(token, visited = /* @__PURE__ */ new Set()) {
		const cacheKey = /* @__PURE__ */ isString(token) ? token : JSON.stringify(token);
		if (cache.has(cacheKey)) return cache.get(cacheKey);
		const reference = isTokenAlias(token) ? token.$value : token;
		const isAliasReference = /* @__PURE__ */ isString(reference) && isAlias(reference);
		if (isTokenAlias(token) && !isAliasReference) {
			cache.set(cacheKey, reference);
			return reference;
		}
		const clean = isAliasReference ? reference.slice(1, -1) : String(reference);
		if (visited.has(clean)) {
			logger.warn(`Circular alias detected for "${clean}"`);
			cache.set(cacheKey, void 0);
			return;
		}
		visited.add(clean);
		let found = registry.get(clean);
		let segments = [];
		if (!found && clean.includes(".")) {
			const parts = clean.split(".");
			for (let i = parts.length - 1; i > 0; i--) {
				const prefix = parts.slice(0, i).join(".");
				const suffix = parts.slice(i);
				const candidate = registry.get(prefix);
				if (!/* @__PURE__ */ isUndefined(candidate?.value)) {
					found = candidate;
					segments = suffix;
					break;
				}
			}
		}
		if (/* @__PURE__ */ isUndefined(found?.value)) {
			if (isAliasReference) logger.warn(`Alias not found for "${String(reference)}"`);
			cache.set(cacheKey, void 0);
			return;
		}
		let current = found.value;
		if (segments.length > 0) {
			if (isTokenAlias(current)) current = current.$value;
			for (const segment of segments) {
				if (!/* @__PURE__ */ isObject(current) || UNSAFE_KEYS.has(segment) || !Object.prototype.hasOwnProperty.call(current, segment)) {
					current = void 0;
					break;
				}
				current = current[segment];
				if (isTokenAlias(current)) current = current.$value;
			}
			if (/* @__PURE__ */ isUndefined(current)) {
				logger.warn(`Path not found inside "${clean}": ${segments.join(".")}`);
				cache.set(cacheKey, void 0);
				return;
			}
		} else if (isTokenAlias(current)) current = current.$value;
		const result = /* @__PURE__ */ isString(current) && isAlias(current) ? resolve(current, visited) : current;
		cache.set(cacheKey, result);
		return result;
	}
	return {
		...registry,
		resolve,
		isAlias,
		get size() {
			return registry.size;
		}
	};
}
/**
* Flattens a nested collection of tokens into a flat array of tokens.
* Each token is represented by an object containing its ID & value.
* @param tokens The collection of tokens to flatten.
* @param prefix An optional prefix to prepend to each token ID.
* @returns An array of flattened tokens, each with an ID and value.
*/
/* #__NO_SIDE_EFFECTS__ */
function flatten(tokens, prefix = "", flat = false) {
	const flattened = [];
	const stack = [{
		tokens,
		prefix,
		flat
	}];
	while (stack.length > 0) {
		const { tokens: currentTokens, prefix: currentPrefix, flat } = stack.pop();
		const meta = {};
		for (const k in currentTokens) {
			if (!Object.hasOwn(currentTokens, k)) continue;
			if (k.startsWith("$")) meta[k] = currentTokens[k];
		}
		if (Object.keys(meta).length > 0 && currentPrefix) flattened.push({
			id: currentPrefix,
			value: meta
		});
		for (const key in currentTokens) {
			if (!Object.hasOwn(currentTokens, key)) continue;
			if (UNSAFE_KEYS.has(key)) continue;
			if (key.startsWith("$")) continue;
			const value = currentTokens[key];
			const id = currentPrefix ? `${currentPrefix}.${key}` : key;
			if (!/* @__PURE__ */ isObject(value)) {
				flattened.push({
					id,
					value
				});
				continue;
			}
			if ("$value" in value) {
				flattened.push({
					id,
					value
				});
				const inner = value.$value;
				if (/* @__PURE__ */ isObject(inner) && !flat) for (const innerKey in inner) {
					if (!Object.hasOwn(inner, innerKey)) continue;
					if (UNSAFE_KEYS.has(innerKey)) continue;
					if (innerKey.startsWith("$")) continue;
					const child = inner[innerKey];
					const childId = `${id}.${innerKey}`;
					if (!/* @__PURE__ */ isObject(child)) flattened.push({
						id: childId,
						value: child
					});
					else if ("$value" in child) flattened.push({
						id: childId,
						value: child
					});
					else stack.push({
						tokens: child,
						prefix: childId,
						flat
					});
				}
				continue;
			}
			if (flat) {
				flattened.push({
					id,
					value
				});
				continue;
			}
			stack.push({
				tokens: value,
				prefix: id,
				flat
			});
		}
	}
	return flattened;
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/useLocale/adapters/adapter.mjs
var LocaleAdapter = class {};
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/useLocale/adapters/v0.mjs
/**
* Default locale adapter for @vuetify/v0.
*
* Handles the full translation pipeline: key lookup via tokens,
* fallback chain, token reference resolution, and placeholder interpolation.
*/
var V0LocaleAdapter = class extends LocaleAdapter {
	context;
	constructor(context) {
		super();
		this.context = context;
	}
	t(key, ...params) {
		const found = this.lookup(key, params);
		return /* @__PURE__ */ isUndefined(found) ? this.interpolate(key, params) : found;
	}
	ti(key, ...params) {
		return this.lookup(key, params);
	}
	n(value) {
		const locale = this.context.selectedId.value;
		if (!IN_BROWSER$1 || !locale) return value.toString();
		return new Intl.NumberFormat(String(locale)).format(value);
	}
	lookup(key, params) {
		const locale = this.context.selectedId.value;
		if (!locale) return void 0;
		const message = this.context.tokens.get(`${locale}.${key}`)?.value;
		if (/* @__PURE__ */ isString(message)) return this.interpolate(this.resolve(locale, message), params);
		if (this.context.fallbackLocale) {
			const fb = this.context.tokens.get(`${this.context.fallbackLocale}.${key}`)?.value;
			if (/* @__PURE__ */ isString(fb)) return this.interpolate(this.resolve(this.context.fallbackLocale, fb), params);
		}
	}
	resolve(locale, str, visited = /* @__PURE__ */ new Set()) {
		return str.replace(/{([a-zA-Z0-9.\-_]+)}/g, (match, key) => {
			const [prefix, ...rest] = key.split(".");
			const target = this.context.has(prefix) ? prefix : locale;
			const path = `${target}.${this.context.has(prefix) ? rest.join(".") : key}`;
			if (visited.has(path)) return match;
			const resolved = this.context.tokens.get(path)?.value;
			if (/* @__PURE__ */ isString(resolved)) return this.resolve(target, resolved, new Set(visited).add(path));
			return match;
		});
	}
	interpolate(message, args) {
		let result = message;
		let rest = args;
		if (rest.length > 0 && /* @__PURE__ */ isObject(rest[0])) {
			const variables = rest[0];
			result = result.replace(/{([a-zA-Z][a-zA-Z0-9_]*)}/g, (match, name) => {
				return /* @__PURE__ */ isUndefined(variables[name]) ? match : String(variables[name]);
			});
			rest = rest.slice(1);
		}
		result = result.replace(/\{(\d+)\}/g, (match, index) => {
			const i = Number.parseInt(index, 10);
			if (!/* @__PURE__ */ isUndefined(rest[i])) return String(rest[i]);
			return match;
		});
		return result;
	}
};
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/useLocale/index.mjs
/**
* @module useLocale
*
* @see https://0.vuetifyjs.com/composables/plugins/use-locale
*
* @remarks
* Internationalization (i18n) composable with adapter pattern for message translation.
*
* Key features:
* - Locale selection with createSingle
* - Token-based message storage with createTokens
* - Numbered and named placeholder support ({0}, {name})
* - Number formatting with Intl.NumberFormat
* - Adapter pattern for integration with i18n providers (VueI18nLocaleAdapter included)
*
* Integrates with createSingle for locale selection and createTokens for message resolution.
*
* @example
* ```ts
* import { useLocale } from '@vuetify/v0'
*
* const { t, n } = useLocale()
* console.log(t('$v0.greeting', { name: 'World' }))
* console.log(n(1234.56))
* ```
*/
/**
* Creates a new locale instance.
*
* @param options The options for the locale instance.
* @returns A new locale instance.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-locale
*/
function createLocale$1(_options = {}) {
	const { adapter: externalAdapter, messages = {}, fallback: fallbackLocale, ...options } = _options;
	const tokens = createTokens(messages);
	const registry = createSingle({
		...options,
		reactive: true
	});
	for (const id in messages) {
		registry.register({ id });
		if (id === options.default && !registry.selectedId.value) registry.select(id);
	}
	const adapter = externalAdapter ?? new V0LocaleAdapter({
		tokens,
		selectedId: registry.selectedId,
		fallbackLocale,
		has: (id) => registry.has(id)
	});
	function t(key, ...params) {
		return adapter.t(key, ...params);
	}
	function ti(key, ...params) {
		return adapter.ti(key, ...params);
	}
	function n(value) {
		return adapter.n(value);
	}
	function register(registration = {}) {
		const { messages: msgs, ...rest } = registration;
		if (msgs && rest.id && !registry.has(rest.id)) tokens.onboard(/* @__PURE__ */ flatten({ [rest.id]: msgs }));
		return registry.register(rest);
	}
	return {
		...registry,
		t,
		ti,
		n,
		register,
		adapter,
		get size() {
			return registry.size;
		}
	};
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/toArray/index.mjs
/**
* @module toArray
*
* @see https://0.vuetifyjs.com/composables/transformers/to-array
*
* @remarks
* Utility function to normalize single values and arrays into arrays.
*
* Converts single values into single-element arrays, passes arrays through unchanged,
* and handles null/undefined by returning empty arrays. Perfect for functions that
* accept both single values and arrays as input (e.g., ID | ID[]).
*
* @example
* ```ts
* import { toArray } from '@vuetify/v0'
*
* toArray('hello') // ['hello']
* toArray(['a', 'b']) // ['a', 'b']
* toArray(null) // []
* ```
*/
/**
* Converts a value to an array.
*
* @param value The value to convert.
* @template Z The type of the value.
* @returns The converted array.
*
* @see https://0.vuetifyjs.com/composables/transformers/to-array
*
* @example
* ```ts
* import { toArray } from '@vuetify/v0'
*
* const value = 'Example Value'
* const valueAsArray = toArray(value)
*
* console.log(valueAsArray) // ['Example Value']
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function toArray(value) {
	return /* @__PURE__ */ isNullOrUndefined(value) ? [] : /* @__PURE__ */ isArray(value) ? value : [value];
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/useEventListener/index.mjs
/**
* @module useEventListener
*
* @see https://0.vuetifyjs.com/composables/system/use-event-listener
*
* @remarks
* Event listener composable with automatic cleanup on scope disposal.
*
* Key features:
* - Supports Window, Document, and HTMLElement targets
* - Reactive targets, events, and listeners
* - Event options support (capture, passive, once)
* - Automatic removeEventListener on unmount
* - Multiple overloads for type safety
*
* Perfect for safely managing event listeners in Vue components.
*
* @example
* ```ts
* import { useEventListener } from '@vuetify/v0'
*
* useEventListener(window, 'resize', () => {
*   console.log('window resized')
* })
* ```
*/
/**
* Attaches an event listener to a target.
*
* @param target The target to attach the event listener to.
* @param event The event to listen for.
* @param listener The event listener.
* @param options The event listener options.
* @returns A function to remove the event listener.
*
* @see https://0.vuetifyjs.com/composables/system/use-event-listener
*/
function useEventListener(target, event, listener, options) {
	const cleanups = [];
	function cleanup() {
		for (const fn of cleanups) fn();
		cleanups.length = 0;
	}
	function register(el, event, listener, options) {
		el.addEventListener(event, listener, options);
		return () => el.removeEventListener(event, listener, options);
	}
	const stopWatcher = watch(() => [
		toValue(target),
		toValue(event),
		unref(listener),
		toValue(options)
	], ([el, events, listeners, opts]) => {
		cleanup();
		if (!el) return;
		const eventList = /* @__PURE__ */ toArray(events);
		const listenerList = /* @__PURE__ */ toArray(listeners);
		for (const event of eventList) for (const listenerFn of listenerList) cleanups.push(register(el, event, listenerFn, opts));
	}, {
		immediate: true,
		flush: "post"
	});
	function stop() {
		stopWatcher();
		cleanup();
	}
	onScopeDispose(stop, true);
	return stop;
}
/**
* Attaches an event listener to the window.
*
* @param event The event to listen for.
* @param listener The event listener.
* @param options The event listener options.
* @template E The event type.
* @returns A function to remove the event listener.
*
* @see https://0.vuetifyjs.com/composables/system/use-event-listener
*/
function useWindowEventListener(event, listener, options) {
	return IN_BROWSER$1 ? useEventListener(window, event, listener, options) : () => {};
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/toElement/index.mjs
/**
* @module toElement
*
* @see https://0.vuetifyjs.com/composables/transformers/to-element
*
* @remarks
* Resolves various element reference types to a DOM Element.
*
* Accepts refs, getters, raw DOM elements, or Vue component instances
* and normalizes them to a plain Element. Uses structural typing to
* avoid cross-version Vue Ref incompatibilities.
*
* @example
* ```ts
* import { shallowRef } from 'vue'
* import { toElement } from '@vuetify/v0'
*
* const el = shallowRef<HTMLElement | null>(null)
* const resolved = toElement(el) // HTMLElement | undefined
* ```
*/
/**
* Resolves a {@link MaybeElementRef} to a DOM Element or undefined.
*
* Handles:
* - `Ref<Element>`, `ShallowRef<HTMLElement>`, getter functions
* - Vue component instances (extracts `$el`)
* - Raw DOM elements (pass-through)
* - null/undefined (returns undefined)
*
* @param target The element ref, getter, or raw value to resolve
* @returns The resolved DOM Element, or undefined if not available
*
* @see https://0.vuetifyjs.com/composables/transformers/to-element
*
* @example
* ```ts
* import { toElement } from '@vuetify/v0'
*
* const el = shallowRef<HTMLElement | null>(null)
* toElement(el) // HTMLElement | undefined
*
* const component = ref<ComponentPublicInstance>()
* toElement(component) // Element | undefined (from $el)
* ```
*/
/* #__NO_SIDE_EFFECTS__ */
function toElement(target) {
	if (!target) return void 0;
	if (/* @__PURE__ */ isElement(target)) return target;
	const raw = /* @__PURE__ */ isFunction(target) ? target() : /* @__PURE__ */ isObject(target) && "value" in target ? target.value : target;
	if (!raw) return void 0;
	if (/* @__PURE__ */ isElement(raw)) return raw;
	if (/* @__PURE__ */ isObject(raw) && "$el" in raw) return raw.$el;
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/useHydration/index.mjs
/**
* @module useHydration
*
* @see https://0.vuetifyjs.com/composables/plugins/use-hydration
*
* @remarks
* SSR hydration state management composable.
*
* Key features:
* - Hydration state detection (browser vs SSR)
* - Root component detection
* - Readonly hydration state refs
* - Plugin installation support
* - Perfect for hydration-safe rendering
*
* Essential for composables that need to behave differently during SSR vs client-side.
*
* @example
* ```ts
* import { useHydration } from '@vuetify/v0'
*
* const { isHydrated } = useHydration()
* if (isHydrated.value) {
*   // safe for client-only logic
* }
* ```
*/
/**
* Creates a new hydration instance.
*
* @returns A new hydration instance.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-hydration
*
* @example
* ```ts
* import { createHydration } from '@vuetify/v0'
*
* const hydration = createHydration()
* console.log(hydration.isHydrated.value) // false
* hydration.hydrate()
* console.log(hydration.isHydrated.value) // true
* ```
*/
function createHydration() {
	const isHydrated = shallowRef(false);
	const isSettled = shallowRef(false);
	function hydrate() {
		isHydrated.value = true;
	}
	function settle() {
		isSettled.value = true;
	}
	return {
		isHydrated: shallowReadonly(isHydrated),
		isSettled: shallowReadonly(isSettled),
		hydrate,
		settle
	};
}
function createFallbackHydration() {
	return {
		isHydrated: shallowReadonly(shallowRef(true)),
		isSettled: shallowReadonly(shallowRef(true)),
		hydrate: () => {},
		settle: () => {}
	};
}
/**
* Creates a new hydration context trinity.
*
* @param options Options for creating the hydration context.
* @template E The type of the hydration context.
* @returns A new hydration context trinity.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-hydration
*
* @example
* ```ts
* import { createHydrationContext } from '@vuetify/v0'
*
* export const [useHydrationContext, provideHydrationContext, context] = createHydrationContext({
*   namespace: 'app:hydration',
* })
* ```
*/
var [createHydrationContext, createHydrationPlugin, useHydration$1] = /* @__PURE__ */ createPluginContext("v0:hydration", () => createHydration(), {
	fallback: () => createFallbackHydration(),
	setup: (context, app) => {
		const { mount } = app;
		app.mount = (...args) => {
			const vm = mount(...args);
			nextTick$1().then(() => {
				context.hydrate();
				nextTick$1().then(() => context.settle());
			});
			app.mount = mount;
			return vm;
		};
	}
});
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/createObserver/index.mjs
/**
* @module createObserver
*
* @remarks
* Internal factory for browser Observer API composables. Encapsulates the
* shared lifecycle, hydration, pause/resume/stop, and target-watch logic
* used by useResizeObserver, useIntersectionObserver, and useMutationObserver.
*
* The `observer` ref uses a three-state sentinel:
* - `undefined` — not yet created
* - `null` — permanently stopped (`stop()` was called; `setup()` is a no-op)
* - instance — active observer
*
* @example
* ```ts
* import { createObserver } from '#v0/composables/createObserver'
*
* const observer = createObserver(target, entries => {
*   console.log(entries)
* }, {
*   supports: true,
*   create: cb => new ResizeObserver(cb),
*   observe: (o, el) => o.observe(el),
* })
* ```
*/
function createObserver(target, userCallback, config) {
	const { isHydrated } = useHydration$1();
	const resolved = toRef(() => /* @__PURE__ */ toElement(target));
	const observer = shallowRef(void 0);
	const isPaused = shallowRef(false);
	const isActive = toRef(() => !!observer.value && !isPaused.value);
	function invoke(entries) {
		config.onEntry?.(entries);
		userCallback(entries);
		if (config.once) {
			if (config.shouldStop ? config.shouldStop(entries) : true) stop();
		}
	}
	function setup() {
		if (/* @__PURE__ */ isNull(observer.value)) return;
		const el = resolved.value;
		if (!isHydrated.value || !config.supports || !/* @__PURE__ */ isElement(el) || isPaused.value) return;
		observer.value = config.create(invoke);
		config.observe(observer.value, el);
		if (config.immediate) {
			const entries = config.immediate(el);
			if (config.onceIncludesImmediate) invoke(entries);
			else {
				config.onEntry?.(entries);
				userCallback(entries);
			}
		}
	}
	watch(resolved, (el, oldEl) => {
		if (oldEl || observer.value) cleanup();
		if (isHydrated.value && /* @__PURE__ */ isElement(el)) setup();
	}, { immediate: true });
	let stopHydrationWatch;
	if (!isHydrated.value) stopHydrationWatch = watch(() => isHydrated.value, (hydrated) => {
		if (hydrated && /* @__PURE__ */ isElement(resolved.value) && !observer.value) {
			setup();
			stopHydrationWatch?.();
			stopHydrationWatch = void 0;
		}
	});
	function cleanup() {
		if (observer.value) {
			observer.value.disconnect();
			observer.value = void 0;
		}
	}
	function pause() {
		isPaused.value = true;
		config.onPause?.();
		observer.value?.disconnect();
	}
	function resume() {
		isPaused.value = false;
		setup();
	}
	function stop() {
		stopHydrationWatch?.();
		stopHydrationWatch = void 0;
		cleanup();
		observer.value = null;
	}
	onScopeDispose(stop, true);
	return {
		isActive: shallowReadonly(isActive),
		isPaused: shallowReadonly(isPaused),
		pause,
		resume,
		stop
	};
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/useResizeObserver/index.mjs
/**
* @module useResizeObserver
*
* @see https://0.vuetifyjs.com/composables/system/use-resize-observer
*
* @remarks
* ResizeObserver composable with lifecycle management.
*
* Key features:
* - ResizeObserver API wrapper
* - `isActive` reactive flag
* - `once` option for single-fire observation
* - Pause/resume/stop functionality
* - Automatic cleanup on unmount
* - SSR-safe (checks SUPPORTS_OBSERVER)
* - Hydration-aware
* - Box model options (content-box/border-box)
* - Reports `borderBoxSize` and `contentBoxSize` alongside `contentRect`
*
* Perfect for responsive components and size-based rendering.
*
* @example
* ```ts
* import { useTemplateRef } from 'vue'
* import { useResizeObserver } from '@vuetify/v0'
*
* const target = useTemplateRef('target')
* useResizeObserver(target, entries => {
*   console.log(entries[0].contentRect.width)
* })
* ```
*/
/**
* Synthesize the entry the observer would report for `el`, for the `immediate`
* callback that fires before the observer's own first delivery.
*
* Every measurement comes from `getComputedStyle` rather than
* `getBoundingClientRect` because resolved lengths are layout values — like the
* observer, and unlike a client rect, they are not scaled by CSS transforms.
* `contentRect` mirrors the native entry: width/height are the content box and
* top/left are the padding offsets, so the immediate entry matches what the
* observer reports next. The client rect only remains as the fallback when a
* resolved length is not numeric (e.g. a detached element).
*
* Every read is written to tolerate a partial style declaration: an element
* with no layout box resolves its lengths to `''`, and this runs on whatever
* `getComputedStyle` returns.
*/
/* #__NO_SIDE_EFFECTS__ */
function measure(el) {
	const rect = el.getBoundingClientRect();
	const style = getComputedStyle(el);
	const padding = {
		top: /* @__PURE__ */ pxToNumber(style.paddingTop),
		left: /* @__PURE__ */ pxToNumber(style.paddingLeft),
		right: /* @__PURE__ */ pxToNumber(style.paddingRight),
		bottom: /* @__PURE__ */ pxToNumber(style.paddingBottom)
	};
	const paddingX = padding.left + padding.right;
	const paddingY = padding.top + padding.bottom;
	const borderX = /* @__PURE__ */ pxToNumber(style.borderLeftWidth) + /* @__PURE__ */ pxToNumber(style.borderRightWidth);
	const borderY = /* @__PURE__ */ pxToNumber(style.borderTopWidth) + /* @__PURE__ */ pxToNumber(style.borderBottomWidth);
	const outer = style.boxSizing === "border-box";
	const resolvedX = /* @__PURE__ */ pxToNumber(style.width, rect.width);
	const resolvedY = /* @__PURE__ */ pxToNumber(style.height, rect.height);
	const width = {
		border: outer ? resolvedX : resolvedX + paddingX + borderX,
		content: Math.max(0, outer ? resolvedX - paddingX - borderX : resolvedX)
	};
	const height = {
		border: outer ? resolvedY : resolvedY + paddingY + borderY,
		content: Math.max(0, outer ? resolvedY - paddingY - borderY : resolvedY)
	};
	const vertical = /* @__PURE__ */ isString(style.writingMode) && style.writingMode.startsWith("vertical");
	const inline = vertical ? height : width;
	const block = vertical ? width : height;
	return {
		contentRect: {
			width: width.content,
			height: height.content,
			top: padding.top,
			left: padding.left
		},
		borderBoxSize: [{
			inlineSize: inline.border,
			blockSize: block.border
		}],
		contentBoxSize: [{
			inlineSize: inline.content,
			blockSize: block.content
		}],
		target: el
	};
}
/**
* A composable that uses the Resize Observer API to detect when an element's
* size changes.
*
* @param target The element to observe.
* @param callback The callback to execute when the element's size changes.
* @param options The options for the Resize Observer.
* @returns An object with methods to control the observer.
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
* @see https://0.vuetifyjs.com/composables/system/use-resize-observer
*
* @example
* ```ts
* import { ref } from 'vue'
* import { useResizeObserver } from '@vuetify/v0'
*
* const el = ref<HTMLElement>()
* const width = ref(0)
* const height = ref(0)
*
* const { pause, resume, isPaused } = useResizeObserver(
*   el,
*   (entries) => {
*     const entry = entries[0]
*     if (entry) {
*       width.value = entry.contentRect.width
*       height.value = entry.contentRect.height
*       console.log('Size changed:', width.value, 'x', height.value)
*     }
*   },
*   { immediate: true }
* )
*
* // Pause observation
* pause()
*
* // Resume observation
* resume()
* ```
*
* @example
* Measuring the border box — padding and borders included:
*
* ```ts
* useResizeObserver(el, ([entry]) => {
*   height.value = entry.borderBoxSize[0].blockSize
* }, { box: 'border-box' })
* ```
*/
function useResizeObserver(target, callback, options = {}) {
	return createObserver(target, callback, {
		supports: SUPPORTS_OBSERVER,
		once: options.once,
		create: (cb) => new ResizeObserver((entries) => {
			cb(entries.map((e) => {
				const sizes = e.borderBoxSize && e.contentBoxSize ? e : /* @__PURE__ */ measure(e.target);
				return {
					contentRect: {
						width: e.contentRect.width,
						height: e.contentRect.height,
						top: e.contentRect.top,
						left: e.contentRect.left
					},
					borderBoxSize: sizes.borderBoxSize,
					contentBoxSize: sizes.contentBoxSize,
					target: e.target
				};
			}));
		}),
		observe: (obs, el) => obs.observe(el, { box: options.box ?? "content-box" }),
		immediate: options.immediate ? (el) => [/* @__PURE__ */ measure(el)] : void 0
	});
}
/**
* A convenience composable that uses the Resize Observer API to track an
* element's size.
*
* @param target The element to observe.
* @returns An object with the element's width and height.
*
* @see https://0.vuetifyjs.com/composables/system/use-resize-observer
*
* @example
* ```ts
* import { ref, watchEffect } from 'vue'
* import { useElementSize } from '@vuetify/v0'
*
* const box = ref<HTMLElement>()
* const { width, height } = useElementSize(box)
*
* // Width and height are reactive refs
* watchEffect(() => {
*   console.log('Box size:', width.value, 'x', height.value)
* })
* ```
*/
function useElementSize(target) {
	const width = shallowRef(0);
	const height = shallowRef(0);
	const { pause: _pause, resume, stop, isActive, isPaused } = useResizeObserver(target, (entries) => {
		const entry = entries[0];
		/* v8 ignore next 4 -- defensive: ResizeObserver always passes an entry array with at least one entry */
		if (entry) {
			width.value = entry.contentRect.width;
			height.value = entry.contentRect.height;
		}
	}, { immediate: true });
	function pause() {
		width.value = 0;
		height.value = 0;
		_pause();
	}
	return {
		width: shallowReadonly(width),
		height: shallowReadonly(height),
		isActive: shallowReadonly(isActive),
		isPaused: shallowReadonly(isPaused),
		pause,
		resume,
		stop
	};
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/useIntersectionObserver/index.mjs
/**
* @module useIntersectionObserver
*
* @see https://0.vuetifyjs.com/composables/system/use-intersection-observer
*
* @remarks
* IntersectionObserver composable with lifecycle management.
*
* Key features:
* - IntersectionObserver API wrapper
* - `isActive` reactive flag
* - `once` option for single-fire observation
* - Pause/resume/stop functionality
* - Automatic cleanup on unmount
* - SSR-safe (checks SUPPORTS_INTERSECTION_OBSERVER)
* - Hydration-aware
* - Immediate callback option
*
* Perfect for lazy loading, infinite scroll, and visibility detection.
*
* @example
* ```ts
* import { useTemplateRef } from 'vue'
* import { useIntersectionObserver } from '@vuetify/v0'
*
* const target = useTemplateRef('target')
* useIntersectionObserver(target, entries => {
*   console.log(entries[0].isIntersecting)
* })
* ```
*/
/**
* A composable that uses the Intersection Observer API to detect when an element
* is visible in the viewport.
*
* @param target The element to observe.
* @param callback The callback to execute when the element's intersection changes.
* @param options The options for the Intersection Observer.
* @returns An object with methods to control the observer.
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
* @see https://0.vuetifyjs.com/composables/system/use-intersection-observer
*
* @example
* ```ts
* import { ref } from 'vue'
* import { useIntersectionObserver } from '@vuetify/v0'
*
* const target = ref<HTMLElement>()
* const isVisible = ref(false)
*
* const { isIntersecting, pause, resume } = useIntersectionObserver(
*   target,
*   (entries) => {
*     const entry = entries[0]
*     if (entry) {
*       isVisible.value = entry.isIntersecting
*       console.log('Element is visible:', entry.isIntersecting)
*     }
*   },
*   { threshold: 0.5 }
* )
*
* // Pause observation
* pause()
*
* // Resume observation
* resume()
* ```
*/
function useIntersectionObserver(target, callback, options = {}) {
	const isIntersecting = shallowRef(false);
	return {
		...createObserver(target, callback, {
			supports: SUPPORTS_INTERSECTION_OBSERVER,
			once: options.once,
			create: (cb) => new IntersectionObserver((entries) => {
				cb(entries.map((e) => ({
					boundingClientRect: e.boundingClientRect,
					intersectionRatio: e.intersectionRatio,
					intersectionRect: e.intersectionRect,
					isIntersecting: e.isIntersecting,
					rootBounds: e.rootBounds,
					target: e.target,
					time: e.time
				})));
			}, {
				root: options.root ?? null,
				rootMargin: options.rootMargin ?? "0px",
				threshold: options.threshold ?? 0
			}),
			observe: (obs, el) => obs.observe(el),
			onEntry: (entries) => {
				const latest = entries.at(-1);
				/* v8 ignore next -- defensive: IntersectionObserver always emits at least one entry */
				if (latest) isIntersecting.value = latest.isIntersecting;
			},
			onPause: () => {
				isIntersecting.value = false;
			},
			/* v8 ignore next -- defensive nullish coalesce: entries always populated when shouldStop fires */
			shouldStop: (entries) => entries.at(-1)?.isIntersecting ?? false,
			immediate: options.immediate ? (el) => {
				return [{
					boundingClientRect: el.getBoundingClientRect(),
					intersectionRatio: 0,
					intersectionRect: new DOMRect(0, 0, 0, 0),
					isIntersecting: false,
					rootBounds: null,
					target: el,
					time: performance.now()
				}];
			} : void 0
		}),
		isIntersecting: shallowReadonly(isIntersecting)
	};
}
/**
* A convenience composable that uses the Intersection Observer API to detect
* when an element is visible in the viewport.
*
* @param target The element to observe.
* @param options The options for the Intersection Observer.
* @returns An object with the intersection state.
*
* @see https://0.vuetifyjs.com/composables/system/use-intersection-observer
*
* @example
* ```ts
* import { ref } from 'vue'
* import { useElementIntersection } from '@vuetify/v0'
*
* const myElement = ref<HTMLElement>()
* const { isIntersecting, intersectionRatio } = useElementIntersection(myElement, {
*   threshold: 0.5
* })
*
* // Use in template to conditionally render or animate
* watchEffect(() => {
*   if (isIntersecting.value) {
*     console.log('Element is visible!', intersectionRatio.value)
*   }
* })
* ```
*/
function useElementIntersection(target, options = {}) {
	const isIntersecting = shallowRef(false);
	const intersectionRatio = shallowRef(0);
	const { pause: _pause, resume, stop, isActive, isPaused } = useIntersectionObserver(target, (entries) => {
		const entry = entries.at(-1);
		/* v8 ignore next 4 -- defensive: IntersectionObserver always emits at least one entry */
		if (entry) {
			isIntersecting.value = entry.isIntersecting;
			intersectionRatio.value = entry.intersectionRatio;
		}
	}, {
		immediate: true,
		...options
	});
	function pause() {
		isIntersecting.value = false;
		intersectionRatio.value = 0;
		_pause();
	}
	return {
		isIntersecting: shallowReadonly(isIntersecting),
		intersectionRatio: shallowReadonly(intersectionRatio),
		isActive,
		isPaused,
		pause,
		resume,
		stop
	};
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/useBreakpoints/index.mjs
/**
* @module useBreakpoints
*
* @see https://0.vuetifyjs.com/composables/plugins/use-breakpoints
*
* @remarks
* Responsive breakpoint detection composable with window resize handling.
*
* Key features:
* - matchMedia-based detection for zoom-accurate breakpoints
* - Six built-in breakpoints (xs, sm, md, lg, xl, xxl) with Vuetify 4 default widths
* - `isMobile` flag and configurable `mobileBreakpoint`
* - Automatic resize listener with cleanup
* - SSR-safe with hydration flush
* - Custom breakpoint configuration
*
* Perfect for responsive layouts and conditional rendering based on screen size.
*
* @example
* ```ts
* import { useBreakpoints } from '@vuetify/v0'
*
* const { current, isMobile, smAndUp } = useBreakpoints()
* console.log(current.value) // 'md'
* ```
*/
var BREAKPOINT_ORDER = [
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
	"xxl"
];
/**
* Creates default breakpoint configuration.
*
* @returns The default breakpoint configuration object.
*/
function createDefaultBreakpoints() {
	return {
		mobileBreakpoint: "lg",
		breakpoints: {
			xs: 0,
			sm: 600,
			md: 840,
			lg: 1145,
			xl: 1545,
			xxl: 2138
		}
	};
}
/**
* Creates a new breakpoints instance.
*
* @param options The options for the breakpoints instance.
* @returns A new breakpoints instance.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-breakpoints
*
* @example
* ```ts
* import { createBreakpoints } from '@vuetify/v0'
*
* const breakpoints = createBreakpoints({
*   namespace: 'v0:breakpoints',
*   mobileBreakpoint: 'md',
*   breakpoints: {
*     xs: 0,
*     sm: 600,
*     md: 840,
*     lg: 1145,
*     xl: 1545,
*     xxl: 2138,
*   },
* })
* ```
*/
function createBreakpoints(_options = {}) {
	const { ssr, ...options } = _options;
	const { mobileBreakpoint, breakpoints } = /* @__PURE__ */ mergeDeep$1(createDefaultBreakpoints(), options);
	const sorted = Object.entries(breakpoints).toSorted((a, b) => a[1] - b[1]);
	const names = sorted.map(([n]) => n);
	const mb = /* @__PURE__ */ isNumber(mobileBreakpoint) ? mobileBreakpoint : breakpoints[mobileBreakpoint] ?? breakpoints.md;
	const initialWidth = ssr ? ssr.clientWidth : IN_BROWSER$1 ? window.innerWidth : 0;
	const initialHeight = ssr ? ssr.clientHeight ?? 0 : IN_BROWSER$1 ? window.innerHeight : 0;
	const name = shallowRef("xs");
	const width = shallowRef(initialWidth);
	const height = shallowRef(initialHeight);
	const isMobile = shallowRef(false);
	const xs = shallowRef(false);
	const sm = shallowRef(false);
	const md = shallowRef(false);
	const lg = shallowRef(false);
	const xl = shallowRef(false);
	const xxl = shallowRef(false);
	const smAndUp = shallowRef(false);
	const mdAndUp = shallowRef(false);
	const lgAndUp = shallowRef(false);
	const xlAndUp = shallowRef(false);
	const smAndDown = shallowRef(false);
	const mdAndDown = shallowRef(false);
	const lgAndDown = shallowRef(false);
	const xlAndDown = shallowRef(false);
	function resolve(value, media) {
		let current = "xs";
		for (let i = sorted.length - 1; i >= 0; i--) {
			const px = sorted[i][1];
			if (media ? window.matchMedia(`(min-width: ${px}px)`).matches : value >= px) {
				current = sorted[i][0];
				break;
			}
		}
		const index = names.indexOf(current);
		/* v8 ignore next 3 -- alternate arm is defensive: mb always resolves to a number via `?? breakpoints.md` */
		const mobile = /* @__PURE__ */ isNumber(mb) ? media ? !window.matchMedia(`(min-width: ${mb}px)`).matches : value < mb : index < names.indexOf(mobileBreakpoint);
		return {
			current,
			index,
			mobile
		};
	}
	function apply({ current, mobile }) {
		const index = BREAKPOINT_ORDER.indexOf(current);
		name.value = current;
		isMobile.value = mobile;
		xs.value = current === "xs";
		sm.value = current === "sm";
		md.value = current === "md";
		lg.value = current === "lg";
		xl.value = current === "xl";
		xxl.value = current === "xxl";
		smAndUp.value = index >= 1;
		mdAndUp.value = index >= 2;
		lgAndUp.value = index >= 3;
		xlAndUp.value = index >= 4;
		smAndDown.value = index <= 1;
		mdAndDown.value = index <= 2;
		lgAndDown.value = index <= 3;
		xlAndDown.value = index <= 4;
	}
	apply(resolve(initialWidth, !ssr && IN_BROWSER$1 && SUPPORTS_MATCH_MEDIA$1));
	let listening = false;
	function listen() {
		if (listening || !IN_BROWSER$1) return;
		listening = true;
		useWindowEventListener("resize", () => {
			update();
		}, { passive: true });
	}
	function update() {
		if (!IN_BROWSER$1) return;
		listen();
		width.value = window.innerWidth;
		height.value = window.innerHeight;
		apply(resolve(width.value, SUPPORTS_MATCH_MEDIA$1));
	}
	if (!ssr) listen();
	return {
		breakpoints,
		mobileBreakpoint,
		name: readonly(name),
		width: readonly(width),
		height: readonly(height),
		isMobile: readonly(isMobile),
		xs: readonly(xs),
		sm: readonly(sm),
		md: readonly(md),
		lg: readonly(lg),
		xl: readonly(xl),
		xxl: readonly(xxl),
		smAndUp: readonly(smAndUp),
		mdAndUp: readonly(mdAndUp),
		lgAndUp: readonly(lgAndUp),
		xlAndUp: readonly(xlAndUp),
		smAndDown: readonly(smAndDown),
		mdAndDown: readonly(mdAndDown),
		lgAndDown: readonly(lgAndDown),
		xlAndDown: readonly(xlAndDown),
		ssr: !!ssr,
		update
	};
}
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/useRtl/adapters/adapter.mjs
var RtlAdapter = class {
	/**
	* Teardown registered by `setup`. Called once via `app.onUnmount` on the
	* plugin path and available as a reachable handle on standalone paths.
	*/
	dispose;
};
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/useRtl/adapters/v0.mjs
var V0RtlAdapter = class extends RtlAdapter {
	setup(app, context, target) {
		if (IN_BROWSER$1) {
			if (/* @__PURE__ */ isNull(target)) return;
			const targetEl = target instanceof HTMLElement ? target : /* @__PURE__ */ isString(target) ? document.querySelector(target) : document.documentElement;
			if (!targetEl) return;
			targetEl.dir = context.isRtl.value ? "rtl" : "ltr";
			this.dispose = watch(context.isRtl, (value) => {
				targetEl.dir = value ? "rtl" : "ltr";
			});
		} else {
			const head = app._context?.provides?.usehead ?? app._context?.provides?.head;
			if (head?.push) {
				const entry = head.push({ htmlAttrs: { dir: context.isRtl.value ? "rtl" : "ltr" } });
				const stop = watch(context.isRtl, (rtl) => entry.patch?.({ htmlAttrs: { dir: rtl ? "rtl" : "ltr" } }));
				this.dispose = () => {
					stop();
					entry.dispose?.();
				};
			}
		}
	}
};
// packages/vue-ui/node_modules/@vuetify/v0/dist/composables/useRtl/index.mjs
/**
* @module useRtl
*
* @see https://0.vuetifyjs.com/composables/plugins/use-rtl
*
* @remarks
* RTL (right-to-left) direction composable with adapter pattern.
*
* Key features:
* - Reactive boolean direction state
* - Plugin trinity pattern (createRtlContext, createRtlPlugin, useRtl)
* - Adapter pattern for DOM integration (dir attribute)
* - Subtree overrides via context provision
*
* Independent from useLocale — Vuetify connects them via adapter.
*
* @example
* ```ts
* import { useRtl } from '@vuetify/v0'
*
* const { isRtl, toggle } = useRtl()
* toggle() // flip direction
* ```
*/
/**
* Creates a new RTL direction instance.
*
* @param options The options for the RTL instance.
* @returns A new RTL context with reactive direction state.
*
* @see https://0.vuetifyjs.com/composables/plugins/use-rtl
*/
function createRtl$1(options = {}) {
	const adapter = options.adapter ?? new V0RtlAdapter();
	const isRtl = shallowRef(options.default ?? false);
	function toggle() {
		isRtl.value = !isRtl.value;
	}
	return {
		isRtl,
		toggle,
		adapter,
		dispose: () => adapter.dispose?.()
	};
}
// packages/vue-ui/node_modules/vuetify/lib/util/propsFactory.js
/**
* Creates a factory function for props definitions.
* This is used to define props in a composable then override
* default values in an implementing component.
*
* @example Simplified signature
* (props: Props) => (defaults?: Record<keyof props, any>) => Props
*
* @example Usage
* const makeProps = propsFactory({
*   foo: String,
* })
*
* defineComponent({
*   props: {
*     ...makeProps({
*       foo: 'a',
*     }),
*   },
*   setup (props) {
*     // would be "string | undefined", now "string" because a default has been provided
*     props.foo
*   },
* }
*/
function propsFactory(props, source) {
	return (defaults) => {
		return Object.keys(props).reduce((obj, prop) => {
			const definition = /* @__PURE__ */ isObject(props[prop]) ? props[prop] : { type: props[prop] };
			if (defaults && prop in defaults) obj[prop] = {
				...definition,
				default: defaults[prop]
			};
			else obj[prop] = definition;
			if (source && !obj[prop].source) obj[prop].source = source;
			return obj;
		}, {});
	};
}
/**
* Like `Partial<T>` but doesn't care what the value is
*/
// packages/vue-ui/node_modules/vuetify/lib/composables/component.js
var makeComponentProps = propsFactory({
	class: [
		String,
		Array,
		Object
	],
	style: {
		type: [
			String,
			Array,
			Object
		],
		default: null
	}
}, "component");
// packages/vue-ui/node_modules/vuetify/lib/composables/toggleScope.js
function useToggleScope(source, fn) {
	let scope;
	function start() {
		scope = effectScope();
		scope.run(() => fn.length ? fn(() => {
			scope?.stop();
			start();
		}) : fn());
	}
	watch(source, (active) => {
		if (active && !scope) start();
		else if (!active) {
			scope?.stop();
			scope = void 0;
		}
	}, { immediate: true });
	onScopeDispose(() => {
		scope?.stop();
	});
}
// packages/vue-ui/node_modules/vuetify/lib/util/console.js
function consoleWarn(message) {
	warn(`Vuetify: ${message}`);
}
function consoleError(message) {
	warn(`Vuetify error: ${message}`);
}
function deprecate(original, replacement) {
	replacement = Array.isArray(replacement) ? replacement.slice(0, -1).map((s) => `'${s}'`).join(", ") + ` or '${replacement.at(-1)}'` : `'${replacement}'`;
	warn(`[Vuetify UPGRADE] '${original}' is deprecated, use ${replacement} instead.`);
}
// packages/vue-ui/node_modules/vuetify/lib/util/globals.js
var IN_BROWSER = typeof window !== "undefined";
var SUPPORTS_INTERSECTION = IN_BROWSER && "IntersectionObserver" in window;
var SUPPORTS_TOUCH = IN_BROWSER && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0);
IN_BROWSER && "EyeDropper" in window;
var SUPPORTS_MATCH_MEDIA = IN_BROWSER && "matchMedia" in window && /* @__PURE__ */ isFunction(window.matchMedia);
var PREFERS_REDUCED_MOTION = () => SUPPORTS_MATCH_MEDIA && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var IS_WEBKIT = IN_BROWSER && CSS?.supports?.("-webkit-backdrop-filter", "none");
IN_BROWSER && CSS?.supports?.("field-sizing", "content");
// packages/vue-ui/node_modules/vuetify/lib/util/helpers.js
function convertToUnit(str, unit = "px") {
	if (/* @__PURE__ */ isNullOrUndefined(str) || str === "") return;
	const num = Number(str);
	if (isNaN(num)) return String(str);
	else if (!isFinite(num)) return;
	else return `${num}${unit}`;
}
function isPlainObject(obj) {
	let proto;
	return !!obj && typeof obj === "object" && ((proto = Object.getPrototypeOf(obj)) === Object.prototype || !proto);
}
function refElement(obj) {
	if (obj && "$el" in obj) {
		const el = obj.$el;
		if (el?.nodeType === Node.TEXT_NODE) return el.nextElementSibling;
		return el;
	}
	return obj;
}
Object.freeze({
	enter: 13,
	tab: 9,
	delete: 46,
	esc: 27,
	space: 32,
	up: 38,
	down: 40,
	left: 37,
	right: 39,
	end: 35,
	home: 36,
	del: 46,
	backspace: 8,
	insert: 45,
	pageup: 33,
	pagedown: 34,
	shift: 16
});
Object.freeze({
	enter: "Enter",
	tab: "Tab",
	delete: "Delete",
	esc: "Escape",
	space: "Space",
	up: "ArrowUp",
	down: "ArrowDown",
	left: "ArrowLeft",
	right: "ArrowRight",
	end: "End",
	home: "Home",
	del: "Delete",
	backspace: "Backspace",
	insert: "Insert",
	pageup: "PageUp",
	pagedown: "PageDown",
	shift: "Shift"
});
function keys(o) {
	return Object.keys(o);
}
function has(obj, key) {
	return key.every((k) => obj.hasOwnProperty(k));
}
function pick(obj, paths) {
	const found = {};
	for (const key of paths) if (Object.prototype.hasOwnProperty.call(obj, key)) found[key] = obj[key];
	return found;
}
function pickWithRest(obj, paths, exclude) {
	const found = Object.create(null);
	const rest = Object.create(null);
	for (const key in obj) if (paths.some((path) => path instanceof RegExp ? path.test(key) : path === key) && !exclude?.some((path) => path === key)) found[key] = obj[key];
	else rest[key] = obj[key];
	return [found, rest];
}
function omit(obj, exclude) {
	const clone = { ...obj };
	exclude.forEach((prop) => delete clone[prop]);
	return clone;
}
var onRE = /^on[^a-z]/;
var isOn = (key) => onRE.test(key);
var bubblingEvents = [
	"onAfterscriptexecute",
	"onAnimationcancel",
	"onAnimationend",
	"onAnimationiteration",
	"onAnimationstart",
	"onAuxclick",
	"onBeforeinput",
	"onBeforescriptexecute",
	"onChange",
	"onClick",
	"onCompositionend",
	"onCompositionstart",
	"onCompositionupdate",
	"onContextmenu",
	"onCopy",
	"onCut",
	"onDblclick",
	"onFocusin",
	"onFocusout",
	"onFullscreenchange",
	"onFullscreenerror",
	"onGesturechange",
	"onGestureend",
	"onGesturestart",
	"onGotpointercapture",
	"onInput",
	"onKeydown",
	"onKeypress",
	"onKeyup",
	"onLostpointercapture",
	"onMousedown",
	"onMousemove",
	"onMouseout",
	"onMouseover",
	"onMouseup",
	"onMousewheel",
	"onPaste",
	"onPointercancel",
	"onPointerdown",
	"onPointerenter",
	"onPointerleave",
	"onPointermove",
	"onPointerout",
	"onPointerover",
	"onPointerup",
	"onReset",
	"onSelect",
	"onSubmit",
	"onTouchcancel",
	"onTouchend",
	"onTouchmove",
	"onTouchstart",
	"onTransitioncancel",
	"onTransitionend",
	"onTransitionrun",
	"onTransitionstart",
	"onWheel"
];
/**
* Filter attributes that should be applied to
* the root element of an input component. Remaining
* attributes should be passed to the <input> element inside.
*/
function filterInputAttrs(attrs) {
	const [events, props] = pickWithRest(attrs, [onRE]);
	const inputEvents = omit(events, bubblingEvents);
	const [rootAttrs, inputAttrs] = pickWithRest(props, [
		"class",
		"style",
		"id",
		"inert",
		/^data-/
	]);
	Object.assign(rootAttrs, events);
	Object.assign(inputAttrs, inputEvents);
	return [rootAttrs, inputAttrs];
}
function wrapInArray(v) {
	return /* @__PURE__ */ isNullOrUndefined(v) ? [] : Array.isArray(v) ? v : [v];
}
function clamp(value, min = 0, max = 1) {
	return Math.max(min, Math.min(max, value));
}
function padEnd(str, length, char = "0") {
	return str + char.repeat(Math.max(0, length - str.length));
}
function padStart(str, length, char = "0") {
	return char.repeat(Math.max(0, length - str.length)) + str;
}
function chunk(str, size = 1) {
	const chunked = [];
	let index = 0;
	while (index < str.length) {
		chunked.push(str.substr(index, size));
		index += size;
	}
	return chunked;
}
function mergeDeep(source = {}, target = {}, arrayFn, targetCondition) {
	const out = {};
	for (const key in source) out[key] = source[key];
	for (const key in target) {
		const targetProperty = target[key];
		if (targetCondition && !targetCondition(key, targetProperty)) continue;
		const sourceProperty = source[key];
		if (isPlainObject(sourceProperty) && isPlainObject(targetProperty)) {
			out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn, targetCondition);
			continue;
		}
		if (arrayFn && Array.isArray(sourceProperty) && Array.isArray(targetProperty)) {
			out[key] = arrayFn(sourceProperty, targetProperty);
			continue;
		}
		out[key] = targetProperty;
	}
	return out;
}
function flattenFragments(nodes) {
	return nodes.map((node) => {
		if (node.type === Fragment) return flattenFragments(node.children);
		else return node;
	}).flat();
}
function toKebabCase(str = "") {
	if (toKebabCase.cache.has(str)) return toKebabCase.cache.get(str);
	const kebab = str.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
	toKebabCase.cache.set(str, kebab);
	return kebab;
}
toKebabCase.cache = /* @__PURE__ */ new Map();
function findChildrenWithProvide(key, vnode) {
	if (!vnode || typeof vnode !== "object") return [];
	if (Array.isArray(vnode)) return vnode.map((child) => findChildrenWithProvide(key, child)).flat(1);
	else if (vnode.suspense) return findChildrenWithProvide(key, vnode.ssContent);
	else if (Array.isArray(vnode.children)) return vnode.children.map((child) => findChildrenWithProvide(key, child)).flat(1);
	else if (vnode.component) {
		if (Object.getOwnPropertyDescriptor(vnode.component.provides, key)) return [vnode.component];
		else if (vnode.component.subTree) return findChildrenWithProvide(key, vnode.component.subTree).flat(1);
	}
	return [];
}
var CircularBuffer = class {
	#arr = [];
	#pointer = 0;
	constructor(size) {
		this.size = size;
	}
	get isFull() {
		return this.#arr.length === this.size;
	}
	push(val) {
		this.#arr[this.#pointer] = val;
		this.#pointer = (this.#pointer + 1) % this.size;
	}
	values() {
		return this.#arr.slice(this.#pointer).concat(this.#arr.slice(0, this.#pointer));
	}
	clear() {
		this.#arr.length = 0;
		this.#pointer = 0;
	}
};
/**
* Convert a computed ref to a record of refs.
* The getter function must always return an object with the same keys.
*/
function destructComputed(getter) {
	const base = computed(getter);
	const obj = {};
	for (const key in base.value) obj[key] = toRef(() => base.value[key]);
	return obj;
}
/** Array.includes but value can be any type */
function includes(arr, val) {
	return arr.includes(val);
}
function eventName(propName) {
	return propName[2].toLowerCase() + propName.slice(3);
}
var EventProp = () => [Function, Array];
function hasEvent(props, name) {
	name = "on" + capitalize(name);
	return !!(props[name] || props[`${name}Once`] || props[`${name}Capture`] || props[`${name}OnceCapture`] || props[`${name}CaptureOnce`]);
}
function callEvent(handler, ...args) {
	if (Array.isArray(handler)) for (const h of handler) h(...args);
	else if (/* @__PURE__ */ isFunction(handler)) handler(...args);
}
function focusableChildren(el, filterByTabIndex = true) {
	const targets = [
		"button",
		"[href]",
		"input:not([type=\"hidden\"])",
		"select",
		"textarea",
		"details:not(:has(> summary))",
		"details > summary",
		"[tabindex]",
		"[contenteditable]:not([contenteditable=\"false\"])",
		"audio[controls]",
		"video[controls]"
	].map((s) => `${s}${filterByTabIndex ? ":not([tabindex=\"-1\"])" : ""}:not([disabled], [inert])`).join(", ");
	let elements;
	try {
		elements = [...el.querySelectorAll(targets)];
	} catch (err) {
		consoleError(String(err));
		return [];
	}
	return elements.filter((x) => !x.closest("[inert]")).filter((x) => !!x.offsetParent || x.getClientRects().length > 0).filter((x) => !x.parentElement?.closest("details:not([open])") || x.tagName === "SUMMARY" && x.parentElement?.tagName === "DETAILS");
}
function getActiveElement() {
	let active = document.activeElement;
	while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
	return active;
}
function noop() {}
/** Returns null if the selector is not supported or we can't check */
function matchesSelector(el, selector) {
	if (!(IN_BROWSER && typeof CSS !== "undefined" && typeof CSS.supports !== "undefined" && CSS.supports(`selector(${selector})`))) return null;
	try {
		return !!el && el.matches(selector);
	} catch (err) {
		return null;
	}
}
function defer(timeout, cb) {
	if (!IN_BROWSER || timeout === 0) {
		cb();
		return () => {};
	}
	const timeoutId = window.setTimeout(cb, timeout);
	return () => window.clearTimeout(timeoutId);
}
function templateRef() {
	const el = shallowRef();
	const fn = (target) => {
		el.value = target;
	};
	Object.defineProperty(fn, "value", {
		enumerable: true,
		get: () => el.value,
		set: (val) => el.value = val
	});
	Object.defineProperty(fn, "el", {
		enumerable: true,
		get: () => refElement(el.value)
	});
	return fn;
}
function isPrimitive(value) {
	return /* @__PURE__ */ isString(value) || /* @__PURE__ */ isNumber(value) || /* @__PURE__ */ isBoolean(value) || typeof value === "bigint";
}
function onlyDefinedProps(props) {
	const booleanAttributes = ["checked", "disabled"];
	return Object.fromEntries(Object.entries(props).filter(([key, v]) => booleanAttributes.includes(key) ? !!v : !/* @__PURE__ */ isUndefined(v)));
}
// packages/vue-ui/node_modules/vuetify/lib/util/anchor.js
var block = ["top", "bottom"];
var inline = [
	"start",
	"end",
	"left",
	"right"
];
/** Parse a raw anchor string into an object */
function parseAnchor(anchor, isRtl) {
	let [side, align] = anchor.split(" ");
	if (!align) align = includes(block, side) ? "start" : includes(inline, side) ? "top" : "center";
	return {
		side: toPhysical(side, isRtl),
		align: toPhysical(align, isRtl)
	};
}
function toPhysical(str, isRtl) {
	if (str === "start") return isRtl ? "right" : "left";
	if (str === "end") return isRtl ? "left" : "right";
	return str;
}
function flipSide(anchor) {
	return {
		side: {
			center: "center",
			top: "bottom",
			bottom: "top",
			left: "right",
			right: "left"
		}[anchor.side],
		align: anchor.align
	};
}
function flipAlign(anchor) {
	return {
		side: anchor.side,
		align: {
			center: "center",
			top: "bottom",
			bottom: "top",
			left: "right",
			right: "left"
		}[anchor.align]
	};
}
function flipCorner(anchor) {
	return {
		side: anchor.align,
		align: anchor.side
	};
}
function getAxis(anchor) {
	return includes(block, anchor.side) ? "y" : "x";
}
// packages/vue-ui/node_modules/vuetify/lib/util/box.js
var Box = class {
	constructor(args) {
		if (/* @__PURE__ */ isElement(args)) {
			const pageScale = document.body.currentCSSZoom ?? 1;
			const factor = 1 + (1 - pageScale) / pageScale;
			const { x, y, width, height } = args.getBoundingClientRect();
			this.x = x * factor;
			this.y = y * factor;
			this.width = width * factor;
			this.height = height * factor;
		} else {
			this.x = args.x;
			this.y = args.y;
			this.width = args.width;
			this.height = args.height;
		}
	}
	get top() {
		return this.y;
	}
	get bottom() {
		return this.y + this.height;
	}
	get left() {
		return this.x;
	}
	get right() {
		return this.x + this.width;
	}
};
function getOverflow(a, b) {
	return {
		x: {
			before: Math.max(0, b.left - a.left),
			after: Math.max(0, a.right - b.right)
		},
		y: {
			before: Math.max(0, b.top - a.top),
			after: Math.max(0, a.bottom - b.bottom)
		}
	};
}
function getTargetBox(target) {
	if (Array.isArray(target)) {
		const pageScale = document.body.currentCSSZoom ?? 1;
		const factor = 1 + (1 - pageScale) / pageScale;
		return new Box({
			x: target[0] * factor,
			y: target[1] * factor,
			width: 0 * factor,
			height: 0 * factor
		});
	} else return new Box(target);
}
function getElementBox(el) {
	if (el === document.documentElement) {
		if (!visualViewport) return new Box({
			x: 0,
			y: 0,
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		});
		else {
			const localWidth = document.body.clientWidth;
			const pageScale = document.body.currentCSSZoom ?? (localWidth ? document.documentElement.clientWidth / localWidth : 1);
			return new Box({
				x: visualViewport.scale > 1 || IS_WEBKIT ? 0 : visualViewport.offsetLeft,
				y: visualViewport.scale > 1 || IS_WEBKIT ? 0 : visualViewport.offsetTop,
				width: document.documentElement.clientWidth / pageScale,
				height: document.documentElement.clientHeight / pageScale
			});
		}
	} else return new Box(el);
}
// packages/vue-ui/node_modules/vuetify/lib/util/animation.js
/** @see https://stackoverflow.com/a/57876601/2074736 */
function nullifyTransforms(el) {
	const rect = new Box(el);
	const style = getComputedStyle(el);
	const tx = style.transform;
	if (tx) {
		let ta, sx, sy, dx, dy;
		if (tx.startsWith("matrix3d(")) {
			ta = tx.slice(9, -1).split(/, /);
			sx = Number(ta[0]);
			sy = Number(ta[5]);
			dx = Number(ta[12]);
			dy = Number(ta[13]);
		} else if (tx.startsWith("matrix(")) {
			ta = tx.slice(7, -1).split(/, /);
			sx = Number(ta[0]);
			sy = Number(ta[3]);
			dx = Number(ta[4]);
			dy = Number(ta[5]);
		} else return new Box(rect);
		const to = style.transformOrigin;
		return new Box({
			x: rect.x - dx - (1 - sx) * parseFloat(to),
			y: rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(" ") + 1)),
			width: sx ? rect.width / sx : el.offsetWidth + 1,
			height: sy ? rect.height / sy : el.offsetHeight + 1
		});
	} else return new Box(rect);
}
function animate(el, keyframes, options) {
	if (typeof el.animate === "undefined") return { finished: Promise.resolve() };
	let animation;
	try {
		animation = el.animate(keyframes, options);
	} catch (err) {
		return { finished: Promise.resolve() };
	}
	if (typeof animation.finished === "undefined") animation.finished = new Promise((resolve) => {
		animation.onfinish = () => {
			resolve(animation);
		};
	});
	return animation;
}
// packages/vue-ui/node_modules/vuetify/lib/util/bindProps.js
var handlers = /* @__PURE__ */ new WeakMap();
function bindProps(el, props) {
	Object.keys(props).forEach((k) => {
		if (isOn(k)) {
			const name = eventName(k);
			const handler = handlers.get(el);
			if (/* @__PURE__ */ isNullOrUndefined(props[k])) handler?.forEach((v) => {
				const [n, fn] = v;
				if (n === name) {
					el.removeEventListener(name, fn);
					handler.delete(v);
				}
			});
			else if (!handler || ![...handler].some((v) => v[0] === name && v[1] === props[k])) {
				el.addEventListener(name, props[k]);
				const _handler = handler || /* @__PURE__ */ new Set();
				_handler.add([name, props[k]]);
				if (!handlers.has(el)) handlers.set(el, _handler);
			}
		} else if (/* @__PURE__ */ isNullOrUndefined(props[k])) el.removeAttribute(k);
		else el.setAttribute(k, props[k]);
	});
}
function unbindProps(el, props) {
	Object.keys(props).forEach((k) => {
		if (isOn(k)) {
			const name = eventName(k);
			const handler = handlers.get(el);
			handler?.forEach((v) => {
				const [n, fn] = v;
				if (n === name) {
					el.removeEventListener(name, fn);
					handler.delete(v);
				}
			});
		} else el.removeAttribute(k);
	});
}
// packages/vue-ui/node_modules/vuetify/lib/util/color/APCA.js
/**
* WCAG 3.0 APCA perceptual contrast algorithm from https://github.com/Myndex/SAPC-APCA
* @licence https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @see https://www.w3.org/WAI/GL/task-forces/silver/wiki/Visual_Contrast_of_Text_Subgroup
*/
var mainTRC = 2.4;
var Rco = .2126729;
var Gco = .7151522;
var Bco = .072175;
var normBG = .55;
var normTXT = .58;
var revTXT = .57;
var revBG = .62;
var blkThrs = .03;
var blkClmp = 1.45;
var deltaYmin = 5e-4;
var scaleBoW = 1.25;
var scaleWoB = 1.25;
var loConThresh = .078;
var loConFactor = 12.82051282051282;
var loConOffset = .06;
var loClip = .001;
function APCAcontrast(text, background) {
	const Rtxt = (text.r / 255) ** mainTRC;
	const Gtxt = (text.g / 255) ** mainTRC;
	const Btxt = (text.b / 255) ** mainTRC;
	const Rbg = (background.r / 255) ** mainTRC;
	const Gbg = (background.g / 255) ** mainTRC;
	const Bbg = (background.b / 255) ** mainTRC;
	let Ytxt = Rtxt * Rco + Gtxt * Gco + Btxt * Bco;
	let Ybg = Rbg * Rco + Gbg * Gco + Bbg * Bco;
	if (Ytxt <= blkThrs) Ytxt += (blkThrs - Ytxt) ** blkClmp;
	if (Ybg <= blkThrs) Ybg += (blkThrs - Ybg) ** blkClmp;
	if (Math.abs(Ybg - Ytxt) < deltaYmin) return 0;
	let outputContrast;
	if (Ybg > Ytxt) {
		const SAPC = (Ybg ** normBG - Ytxt ** normTXT) * scaleBoW;
		outputContrast = SAPC < loClip ? 0 : SAPC < loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC - loConOffset;
	} else {
		const SAPC = (Ybg ** revBG - Ytxt ** revTXT) * scaleWoB;
		outputContrast = SAPC > -.001 ? 0 : SAPC > -.078 ? SAPC - SAPC * loConFactor * loConOffset : SAPC + loConOffset;
	}
	return outputContrast * 100;
}
// packages/vue-ui/node_modules/vuetify/lib/util/color/transformCIELAB.js
var delta = .20689655172413793;
var cielabForwardTransform = (t) => t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;
var cielabReverseTransform = (t) => t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29);
function fromXYZ$1(xyz) {
	const transform = cielabForwardTransform;
	const transformedY = transform(xyz[1]);
	return [
		116 * transformedY - 16,
		500 * (transform(xyz[0] / .95047) - transformedY),
		200 * (transformedY - transform(xyz[2] / 1.08883))
	];
}
function toXYZ$1(lab) {
	const transform = cielabReverseTransform;
	const Ln = (lab[0] + 16) / 116;
	return [
		transform(Ln + lab[1] / 500) * .95047,
		transform(Ln),
		transform(Ln - lab[2] / 200) * 1.08883
	];
}
// packages/vue-ui/node_modules/vuetify/lib/util/color/transformSRGB.js
var srgbForwardMatrix = [
	[
		3.2406,
		-1.5372,
		-.4986
	],
	[
		-.9689,
		1.8758,
		.0415
	],
	[
		.0557,
		-.204,
		1.057
	]
];
var srgbForwardTransform = (C) => C <= .0031308 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - .055;
var srgbReverseMatrix = [
	[
		.4124,
		.3576,
		.1805
	],
	[
		.2126,
		.7152,
		.0722
	],
	[
		.0193,
		.1192,
		.9505
	]
];
var srgbReverseTransform = (C) => C <= .04045 ? C / 12.92 : ((C + .055) / 1.055) ** 2.4;
function fromXYZ(xyz) {
	const rgb = Array(3);
	const transform = srgbForwardTransform;
	const matrix = srgbForwardMatrix;
	for (let i = 0; i < 3; ++i) rgb[i] = Math.round(clamp(transform(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
	return {
		r: rgb[0],
		g: rgb[1],
		b: rgb[2]
	};
}
function toXYZ({ r, g, b }) {
	const xyz = [
		0,
		0,
		0
	];
	const transform = srgbReverseTransform;
	const matrix = srgbReverseMatrix;
	r = transform(r / 255);
	g = transform(g / 255);
	b = transform(b / 255);
	for (let i = 0; i < 3; ++i) xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
	return xyz;
}
// packages/vue-ui/node_modules/vuetify/lib/util/colorUtils.js
function isCssColor(color) {
	return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
}
function isParsableColor(color) {
	return isCssColor(color) && !/^((rgb|hsl)a?\()?var\(--/.test(color);
}
var cssColorRe = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/;
var mappers = {
	rgb: (r, g, b, a) => ({
		r,
		g,
		b,
		a
	}),
	rgba: (r, g, b, a) => ({
		r,
		g,
		b,
		a
	}),
	hsl: (h, s, l, a) => HSLtoRGB({
		h,
		s,
		l,
		a
	}),
	hsla: (h, s, l, a) => HSLtoRGB({
		h,
		s,
		l,
		a
	}),
	hsv: (h, s, v, a) => HSVtoRGB({
		h,
		s,
		v,
		a
	}),
	hsva: (h, s, v, a) => HSVtoRGB({
		h,
		s,
		v,
		a
	})
};
function parseColor(color) {
	if (/* @__PURE__ */ isNumber(color)) {
		if (isNaN(color) || color < 0 || color > 16777215) consoleWarn(`'${color}' is not a valid hex color`);
		return {
			r: (color & 16711680) >> 16,
			g: (color & 65280) >> 8,
			b: color & 255
		};
	} else if (/* @__PURE__ */ isString(color) && cssColorRe.test(color)) {
		const { groups } = color.match(cssColorRe);
		const { fn, values } = groups;
		const realValues = values.split(/,\s*|\s*\/\s*|\s+/).map((v, i) => {
			if (v.endsWith("%") || i > 0 && i < 3 && [
				"hsl",
				"hsla",
				"hsv",
				"hsva"
			].includes(fn)) return parseFloat(v) / 100;
			else return parseFloat(v);
		});
		return mappers[fn](...realValues);
	} else if (/* @__PURE__ */ isString(color)) {
		let hex = color.startsWith("#") ? color.slice(1) : color;
		if ([3, 4].includes(hex.length)) hex = hex.split("").map((char) => char + char).join("");
		else if (![6, 8].includes(hex.length)) consoleWarn(`'${color}' is not a valid hex(a) color`);
		const int = parseInt(hex, 16);
		if (isNaN(int) || int < 0 || int > 4294967295) consoleWarn(`'${color}' is not a valid hex(a) color`);
		return HexToRGB(hex);
	} else if (/* @__PURE__ */ isObject(color)) {
		if (has(color, [
			"r",
			"g",
			"b"
		])) return color;
		else if (has(color, [
			"h",
			"s",
			"l"
		])) return HSVtoRGB(HSLtoHSV(color));
		else if (has(color, [
			"h",
			"s",
			"v"
		])) return HSVtoRGB(color);
	}
	throw new TypeError(`Invalid color: ${/* @__PURE__ */ isNullOrUndefined(color) ? color : String(color) || color.constructor.name}\nExpected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
/** Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV */
function HSVtoRGB(hsva) {
	const { h, s, v, a } = hsva;
	const f = (n) => {
		const k = (n + h / 60) % 6;
		return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
	};
	const rgb = [
		f(5),
		f(3),
		f(1)
	].map((v) => Math.round(v * 255));
	return {
		r: rgb[0],
		g: rgb[1],
		b: rgb[2],
		a
	};
}
function HSLtoRGB(hsla) {
	return HSVtoRGB(HSLtoHSV(hsla));
}
function HSLtoHSV(hsl) {
	const { h, s, l, a } = hsl;
	const v = l + s * Math.min(l, 1 - l);
	return {
		h,
		s: v === 0 ? 0 : 2 - 2 * l / v,
		v,
		a
	};
}
function toHex(v) {
	const h = Math.round(v).toString(16);
	return ("00".substr(0, 2 - h.length) + h).toUpperCase();
}
function RGBtoHex({ r, g, b, a }) {
	return `#${[
		toHex(r),
		toHex(g),
		toHex(b),
		/* @__PURE__ */ isNumber(a) ? toHex(Math.round(a * 255)) : ""
	].join("")}`;
}
function HexToRGB(hex) {
	hex = parseHex(hex);
	let [r, g, b, a] = chunk(hex, 2).map((c) => parseInt(c, 16));
	a = /* @__PURE__ */ isNumber(a) ? a / 255 : a;
	return {
		r,
		g,
		b,
		a
	};
}
function parseHex(hex) {
	if (hex.startsWith("#")) hex = hex.slice(1);
	hex = hex.replace(/([^0-9a-f])/gi, "F");
	if (hex.length === 3 || hex.length === 4) hex = hex.split("").map((x) => x + x).join("");
	if (hex.length !== 6) hex = padEnd(padEnd(hex, 6), 8, "F");
	return hex;
}
function lighten(value, amount) {
	const lab = fromXYZ$1(toXYZ(value));
	lab[0] = lab[0] + amount * 10;
	return fromXYZ(toXYZ$1(lab));
}
function darken(value, amount) {
	const lab = fromXYZ$1(toXYZ(value));
	lab[0] = lab[0] - amount * 10;
	return fromXYZ(toXYZ$1(lab));
}
/**
* Calculate the relative luminance of a given color
* @see https://www.w3.org/TR/WCAG20/#relativeluminancedef
*/
function getLuma(color) {
	return toXYZ(parseColor(color))[1];
}
function hasLightForeground(color) {
	const blackContrast = Math.abs(APCAcontrast(parseColor(0), parseColor(color)));
	return Math.abs(APCAcontrast(parseColor(16777215), parseColor(color))) > Math.min(blackContrast, 50);
}
// packages/vue-ui/node_modules/vuetify/lib/util/getCurrentInstance.js
function getCurrentInstance$1(name, message) {
	const vm = getCurrentInstance();
	if (!vm) throw new Error(`[Vuetify] ${name} ${message || "must be called from inside a setup function"}`);
	return vm;
}
function getCurrentInstanceName(name = "composables") {
	const vm = getCurrentInstance$1(name).type;
	return toKebabCase(vm?.aliasName || vm?.name);
}
// packages/vue-ui/node_modules/vuetify/lib/util/injectSelf.js
function injectSelf(key, vm = getCurrentInstance$1("injectSelf")) {
	const { provides } = vm;
	if (provides && key in provides) return provides[key];
}
// packages/vue-ui/node_modules/vuetify/lib/composables/defaults.js
var DefaultsSymbol = Symbol.for("vuetify:defaults");
var RootDefaultsSymbol = Symbol.for("vuetify:defaults:root");
function createDefaults(options) {
	return ref$1(options);
}
function injectDefaults() {
	const defaults = inject(DefaultsSymbol);
	if (!defaults) throw new Error("[Vuetify] Could not find defaults instance");
	return defaults;
}
function provideDefaults(defaults, options) {
	const injectedDefaults = injectDefaults();
	const injectedRoot = inject(RootDefaultsSymbol, null);
	const providedDefaults = ref$1(defaults);
	const newDefaults = computed(() => {
		if (unref(options?.disabled)) return injectedDefaults.value;
		const scoped = unref(options?.scoped);
		const reset = unref(options?.reset);
		const root = unref(options?.root);
		if (!providedDefaults.value && !(scoped || reset || root)) return injectedDefaults.value;
		let properties = mergeDeep(providedDefaults.value, { prev: injectedDefaults.value });
		if (scoped) return properties;
		if (reset || root) {
			const len = Number(reset || Infinity);
			const rootDefaults = /* @__PURE__ */ isString(root) ? properties.prev?.[root] : void 0;
			if (root && injectedRoot?.value) properties = injectedRoot.value;
			for (let i = 0; i <= len; i++) {
				if (!properties || !("prev" in properties)) break;
				properties = properties.prev;
			}
			if (properties && rootDefaults) properties = mergeDeep(mergeDeep(properties, { prev: properties }), rootDefaults);
			return properties;
		}
		return properties.prev ? mergeDeep(properties.prev, properties, void 0, (_, v) => v !== void 0) : properties;
	});
	provide(DefaultsSymbol, newDefaults);
	return newDefaults;
}
function propIsDefined(vnode, prop) {
	return vnode.props && (typeof vnode.props[prop] !== "undefined" || typeof vnode.props[toKebabCase(prop)] !== "undefined");
}
function internalUseDefaults(props = {}, name, defaults = injectDefaults()) {
	const vm = getCurrentInstance$1("useDefaults");
	name = name ?? vm.type.name ?? vm.type.__name;
	if (!name) throw new Error("[Vuetify] Could not determine component name");
	const componentDefaults = computed(() => defaults.value?.[props._as ?? name]);
	const _props = new Proxy(props, { get(target, prop) {
		const propValue = Reflect.get(target, prop);
		if (prop === "class" || prop === "style") return [componentDefaults.value?.[prop], propValue].filter((v) => v != null);
		if (propIsDefined(vm.vnode, prop)) return propValue;
		const _componentDefault = componentDefaults.value?.[prop];
		if (_componentDefault !== void 0) return _componentDefault;
		const _globalDefault = defaults.value?.global?.[prop];
		if (_globalDefault !== void 0) return _globalDefault;
		return propValue;
	} });
	const _subcomponentDefaults = shallowRef();
	watchEffect(() => {
		if (componentDefaults.value) {
			const subComponents = Object.entries(componentDefaults.value).filter(([key]) => key.startsWith(key[0].toUpperCase()));
			_subcomponentDefaults.value = subComponents.length ? Object.fromEntries(subComponents) : void 0;
		} else _subcomponentDefaults.value = void 0;
	});
	function provideSubDefaults() {
		const injected = injectSelf(DefaultsSymbol, vm);
		provide(DefaultsSymbol, computed(() => {
			return _subcomponentDefaults.value ? mergeDeep(injected?.value ?? {}, _subcomponentDefaults.value) : injected?.value;
		}));
	}
	return {
		props: _props,
		provideSubDefaults
	};
}
// packages/vue-ui/node_modules/vuetify/lib/util/defineComponent.js
function defineComponent$1(options) {
	options._setup = options._setup ?? options.setup;
	if (!options.name) {
		consoleWarn("The component is missing an explicit name, unable to generate default prop value");
		return options;
	}
	if (options._setup) {
		options.props = propsFactory(options.props ?? {}, options.name)();
		const propKeys = Object.keys(options.props).filter((key) => key !== "class" && key !== "style");
		options.filterProps = function filterProps(props) {
			return pick(props, propKeys);
		};
		options.props._as = String;
		options.setup = function setup(props, ctx) {
			const defaults = injectDefaults();
			if (!defaults.value) return options._setup(props, ctx);
			const { props: _props, provideSubDefaults } = internalUseDefaults(props, props._as ?? options.name, defaults);
			const setupBindings = options._setup(_props, ctx);
			provideSubDefaults();
			return setupBindings;
		};
	}
	return options;
}
function genericComponent(exposeDefaults = true) {
	return (options) => (exposeDefaults ? defineComponent$1 : defineComponent)(options);
}
// packages/vue-ui/node_modules/vuetify/lib/util/deepEqual.js
function updateRecursionCache(a, b, cache, result) {
	if (!cache || isPrimitive(a) || isPrimitive(b)) return;
	const visitedObject = cache.get(a);
	if (visitedObject) visitedObject.set(b, result);
	else {
		const newCacheItem = /* @__PURE__ */ new WeakMap();
		newCacheItem.set(b, result);
		cache.set(a, newCacheItem);
	}
}
function findCachedComparison(a, b, cache) {
	if (!cache || isPrimitive(a) || isPrimitive(b)) return null;
	const r1 = cache.get(a)?.get(b);
	if (/* @__PURE__ */ isBoolean(r1)) return r1;
	const r2 = cache.get(b)?.get(a);
	if (/* @__PURE__ */ isBoolean(r2)) return r2;
	return null;
}
function deepEqual(a, b, recursionCache = /* @__PURE__ */ new WeakMap()) {
	if (a === b) return true;
	if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) return false;
	if (a !== Object(a) || b !== Object(b)) return false;
	const props = Object.keys(a);
	if (props.length !== Object.keys(b).length) return false;
	const cachedComparisonResult = findCachedComparison(a, b, recursionCache);
	if (cachedComparisonResult) return cachedComparisonResult;
	updateRecursionCache(a, b, recursionCache, true);
	return props.every((p) => deepEqual(a[p], b[p], recursionCache));
}
// packages/vue-ui/node_modules/vuetify/lib/util/dom.js
/**
* Returns:
*  - 'null' if the node is not attached to the DOM
*  - the root node (HTMLDocument | ShadowRoot) otherwise
*/
function attachedRoot(node) {
	/* istanbul ignore next */
	if (!/* @__PURE__ */ isFunction(node.getRootNode)) {
		while (node.parentNode) node = node.parentNode;
		if (node !== document) return null;
		return document;
	}
	const root = node.getRootNode();
	if (root !== document && root.getRootNode({ composed: true }) !== document) return null;
	return root;
}
// packages/vue-ui/node_modules/vuetify/lib/util/easing.js
var standardEasing = "cubic-bezier(0.4, 0, 0.2, 1)";
var deceleratedEasing = "cubic-bezier(0.0, 0, 0.2, 1)";
var acceleratedEasing = "cubic-bezier(0.4, 0, 1, 1)";
var easingPatterns = {
	linear: (t) => t,
	easeInQuad: (t) => t ** 2,
	easeOutQuad: (t) => t * (2 - t),
	easeInOutQuad: (t) => t < .5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t,
	easeInCubic: (t) => t ** 3,
	easeOutCubic: (t) => --t ** 3 + 1,
	easeInOutCubic: (t) => t < .5 ? 4 * t ** 3 : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
	easeInQuart: (t) => t ** 4,
	easeOutQuart: (t) => 1 - --t ** 4,
	easeInOutQuart: (t) => t < .5 ? 8 * t ** 4 : 1 - 8 * --t ** 4,
	easeInQuint: (t) => t ** 5,
	easeOutQuint: (t) => 1 + --t ** 5,
	easeInOutQuint: (t) => t < .5 ? 16 * t ** 5 : 1 + 16 * --t ** 5,
	instant: (t) => 1
};
// packages/vue-ui/node_modules/vuetify/lib/util/getScrollParent.js
function getScrollParent(el, includeHidden = false) {
	while (el) {
		if (includeHidden ? isPotentiallyScrollable(el) : hasScrollbar(el)) return el;
		el = el.parentElement;
	}
	return document.scrollingElement;
}
function getScrollParents(el, stopAt) {
	const elements = [];
	if (stopAt && el && !stopAt.contains(el)) return elements;
	while (el) {
		if (hasScrollbar(el)) elements.push(el);
		if (el === stopAt) break;
		el = el.parentElement;
	}
	return elements;
}
function hasScrollbar(el) {
	if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
	const style = window.getComputedStyle(el);
	const hasVerticalScrollbar = style.overflowY === "scroll" || style.overflowY === "auto" && el.scrollHeight > el.clientHeight;
	const hasHorizontalScrollbar = style.overflowX === "scroll" || style.overflowX === "auto" && el.scrollWidth > el.clientWidth;
	return hasVerticalScrollbar || hasHorizontalScrollbar;
}
function isPotentiallyScrollable(el) {
	if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
	const style = window.getComputedStyle(el);
	return ["scroll", "auto"].includes(style.overflowY);
}
// packages/vue-ui/node_modules/vuetify/lib/util/isFixedPosition.js
function isFixedPosition(el) {
	while (el) {
		if (window.getComputedStyle(el).position === "fixed") return true;
		el = el.offsetParent;
	}
	return false;
}
// packages/vue-ui/node_modules/vuetify/lib/util/useRender.js
function useRender(render) {
	const vm = getCurrentInstance$1("useRender");
	vm.render = render;
}
// packages/vue-ui/node_modules/vuetify/lib/composables/proxiedModel.js
function useProxiedModel(props, prop, defaultValue, transformIn = (v) => v, transformOut = (v) => v) {
	const vm = getCurrentInstance$1("useProxiedModel");
	const internal = ref$1(!/* @__PURE__ */ isUndefined(props[prop]) ? props[prop] : defaultValue);
	const kebabProp = toKebabCase(prop);
	const isControlled = kebabProp !== prop ? computed(() => {
		props[prop];
		return !!((vm.vnode.props?.hasOwnProperty(prop) || vm.vnode.props?.hasOwnProperty(kebabProp)) && (vm.vnode.props?.hasOwnProperty(`onUpdate:${prop}`) || vm.vnode.props?.hasOwnProperty(`onUpdate:${kebabProp}`)));
	}) : computed(() => {
		props[prop];
		return !!(vm.vnode.props?.hasOwnProperty(prop) && vm.vnode.props?.hasOwnProperty(`onUpdate:${prop}`));
	});
	useToggleScope(() => !isControlled.value, () => {
		watch(() => props[prop], (val) => {
			internal.value = val;
		});
	});
	const model = computed({
		get() {
			const externalValue = props[prop];
			return transformIn(isControlled.value ? externalValue : internal.value);
		},
		set(internalValue) {
			const newValue = transformOut(internalValue);
			const value = toRaw(isControlled.value ? props[prop] : internal.value);
			if (value === newValue || transformIn(value) === internalValue) return;
			internal.value = newValue;
			vm?.emit(`update:${prop}`, newValue);
		}
	});
	Object.defineProperty(model, "externalValue", { get: () => isControlled.value ? props[prop] : internal.value });
	return model;
}
// packages/vue-ui/node_modules/vuetify/lib/composables/form.js
var FormKey = Symbol.for("vuetify:form");
var makeFormProps = propsFactory({
	disabled: Boolean,
	fastFail: Boolean,
	readonly: Boolean,
	modelValue: {
		type: Boolean,
		default: null
	},
	validateOn: {
		type: String,
		default: "input"
	}
}, "form");
function createForm(props) {
	const model = useProxiedModel(props, "modelValue");
	const isDisabled = toRef(() => props.disabled);
	const isReadonly = toRef(() => props.readonly);
	const isValidating = shallowRef(false);
	const items = ref$1([]);
	const errors = ref$1([]);
	async function validate() {
		const results = [];
		let valid = true;
		errors.value = [];
		isValidating.value = true;
		for (const item of items.value) {
			const itemErrorMessages = await item.validate();
			if (itemErrorMessages.length > 0) {
				valid = false;
				results.push({
					id: item.id,
					errorMessages: itemErrorMessages
				});
			}
			if (!valid && props.fastFail) break;
		}
		errors.value = results;
		isValidating.value = false;
		return {
			valid,
			errors: errors.value
		};
	}
	function reset() {
		items.value.forEach((item) => item.reset());
	}
	function resetValidation() {
		items.value.forEach((item) => item.resetValidation());
	}
	watch(items, () => {
		let valid = 0;
		let invalid = 0;
		const results = [];
		for (const item of items.value) if (item.isValid === false) {
			invalid++;
			results.push({
				id: item.id,
				errorMessages: item.errorMessages
			});
		} else if (item.isValid === true) valid++;
		errors.value = results;
		model.value = invalid > 0 ? false : valid === items.value.length ? true : null;
	}, {
		deep: true,
		flush: "post"
	});
	provide(FormKey, {
		register: ({ id, vm, validate, reset, resetValidation }) => {
			if (items.value.some((item) => item.id === id)) consoleWarn(`Duplicate input name "${id}"`);
			items.value.push({
				id,
				validate,
				reset,
				resetValidation,
				vm: markRaw(vm),
				isValid: null,
				errorMessages: []
			});
		},
		unregister: (id) => {
			items.value = items.value.filter((item) => {
				return item.id !== id;
			});
		},
		update: (id, isValid, errorMessages) => {
			const found = items.value.find((item) => item.id === id);
			if (!found) return;
			found.isValid = isValid;
			found.errorMessages = errorMessages;
		},
		isDisabled,
		isReadonly,
		isValidating,
		isValid: model,
		items,
		validateOn: toRef(() => props.validateOn)
	});
	return {
		errors,
		isDisabled,
		isReadonly,
		isValidating,
		isValid: model,
		items,
		validate,
		reset,
		resetValidation
	};
}
function useForm(props) {
	const form = inject(FormKey, null);
	return {
		...form,
		isReadonly: computed(() => !!(props?.readonly ?? form?.isReadonly.value)),
		isDisabled: computed(() => !!(props?.disabled ?? form?.isDisabled.value))
	};
}
// packages/vue-ui/node_modules/vuetify/lib/composables/forwardRefs.js
var Refs = Symbol("Forwarded refs");
/** Omit properties starting with P */
/** Omit keyof $props from T */
function getDescriptor(obj, key) {
	let currentObj = obj;
	while (currentObj) {
		const descriptor = Reflect.getOwnPropertyDescriptor(currentObj, key);
		if (descriptor) return descriptor;
		currentObj = Object.getPrototypeOf(currentObj);
	}
}
function forwardRefs(target, ...refs) {
	target[Refs] = refs;
	return new Proxy(target, {
		get(target, key) {
			if (Reflect.has(target, key)) return Reflect.get(target, key);
			if (/* @__PURE__ */ isSymbol(key) || key.startsWith("$") || key.startsWith("__")) return;
			for (const ref of refs) if (ref.value && Reflect.has(ref.value, key)) {
				const val = Reflect.get(ref.value, key);
				return /* @__PURE__ */ isFunction(val) ? val.bind(ref.value) : val;
			}
		},
		has(target, key) {
			if (Reflect.has(target, key)) return true;
			if (/* @__PURE__ */ isSymbol(key) || key.startsWith("$") || key.startsWith("__")) return false;
			for (const ref of refs) if (ref.value && Reflect.has(ref.value, key)) return true;
			return false;
		},
		set(target, key, value) {
			if (Reflect.has(target, key)) return Reflect.set(target, key, value);
			if (/* @__PURE__ */ isSymbol(key) || key.startsWith("$") || key.startsWith("__")) return false;
			for (const ref of refs) if (ref.value && Reflect.has(ref.value, key)) return Reflect.set(ref.value, key, value);
			return false;
		},
		getOwnPropertyDescriptor(target, key) {
			const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
			if (descriptor) return descriptor;
			if (/* @__PURE__ */ isSymbol(key) || key.startsWith("$") || key.startsWith("__")) return;
			for (const ref of refs) {
				if (!ref.value) continue;
				const descriptor = getDescriptor(ref.value, key) ?? ("_" in ref.value ? getDescriptor(ref.value._?.setupState, key) : void 0);
				if (descriptor) return descriptor;
			}
			for (const ref of refs) {
				const childRefs = ref.value && ref.value[Refs];
				if (!childRefs) continue;
				const queue = childRefs.slice();
				while (queue.length) {
					const ref = queue.shift();
					const descriptor = getDescriptor(ref.value, key);
					if (descriptor) return descriptor;
					const childRefs = ref.value && ref.value[Refs];
					if (childRefs) queue.push(...childRefs);
				}
			}
		}
	});
}
// packages/vue-ui/node_modules/vuetify/lib/components/VForm/VForm.js
var makeVFormProps = propsFactory({
	...makeComponentProps(),
	...makeFormProps()
}, "VForm");
var VForm = genericComponent()({
	name: "VForm",
	props: makeVFormProps(),
	emits: {
		"update:modelValue": (val) => true,
		submit: (e) => true
	},
	setup(props, { slots, emit }) {
		const form = createForm(props);
		const formRef = ref$1();
		function onReset(e) {
			e.preventDefault();
			form.reset();
		}
		function onSubmit(_e) {
			const e = _e;
			const ready = form.validate();
			e.then = ready.then.bind(ready);
			e.catch = ready.catch.bind(ready);
			e.finally = ready.finally.bind(ready);
			emit("submit", e);
			if (!e.defaultPrevented) ready.then(({ valid }) => {
				if (valid) formRef.value?.submit();
			});
			e.preventDefault();
		}
		useRender(() => createElementVNode("form", {
			"ref": formRef,
			"class": normalizeClass(["v-form", props.class]),
			"style": normalizeStyle(props.style),
			"novalidate": true,
			"onReset": onReset,
			"onSubmit": onSubmit
		}, [slots.default?.({
			get errors() {
				return form.errors.value;
			},
			get isDisabled() {
				return form.isDisabled.value;
			},
			get isReadonly() {
				return form.isReadonly.value;
			},
			get isValidating() {
				return form.isValidating.value;
			},
			get isValid() {
				return form.isValid.value;
			},
			get items() {
				return form.items.value;
			},
			validate: form.validate,
			reset: form.reset,
			resetValidation: form.resetValidation
		})]));
		return forwardRefs(form, formRef);
	}
});
// packages/vue-ui/src/form.ts
/** 0 is filled; false, null/undefined, whitespace and an empty array are not. */
function isSFieldFilled(value) {
	return value !== null && value !== void 0 && value !== false && (typeof value !== "string" || value.trim().length > 0) && (!Array.isArray(value) || value.length > 0);
}
var sRules = Object.freeze({
	required: (message) => (value, locale) => isSFieldFilled(value) || message || locale.validationRequired,
	minLength: (minimum, message) => (value, locale) => {
		if (!Number.isInteger(minimum) || minimum < 0) return message || locale.validationInvalid;
		return (typeof value === "string" || Array.isArray(value)) && value.length >= minimum || message || locale.validationMinLength(minimum);
	}
});
var validationProps = {
	rules: {
		type: Array,
		default: () => []
	},
	errorMessages: {
		type: [String, Array],
		default: ""
	},
	serverError: {
		type: String,
		default: ""
	}
};
var SFormKey = Symbol("SForm");
var fieldStates = /* @__PURE__ */ new WeakMap();
function externalFieldError(p) {
	return p.serverError || p.error || (typeof p.errorMessages === "string" ? p.errorMessages : p.errorMessages?.filter(Boolean).join(" ")) || "";
}
function fieldError(p) {
	return fieldStates.get(p)?.error.value ?? externalFieldError(p);
}
function fieldDisabled(p) {
	return !!p.disabled || !!fieldStates.get(p)?.context?.disabled.value;
}
function fieldReadonly(p) {
	return !!p.readonly || !!fieldStates.get(p)?.context?.readonly.value;
}
/** Shared registration/validation for native S inputs and the VTextField wrapper. */
function useSFieldValidation(p, value, options) {
	const context = inject(SFormKey, void 0), locale = useSolLocale(() => p.locale);
	const message = ref$1(""), validated = ref$1(false);
	const error = computed(() => fieldDisabled(p) ? "" : externalFieldError(p) || options.intrinsicError?.() || message.value);
	fieldStates.set(p, {
		error,
		context
	});
	function checkRules() {
		if (fieldDisabled(p)) {
			message.value = "";
			return;
		}
		let result = "";
		for (const rule of p.rules || []) try {
			const outcome = rule(value(), locale.value);
			if (outcome !== true) {
				result = typeof outcome === "string" && outcome ? outcome : locale.value.validationInvalid;
				break;
			}
		} catch {
			result = locale.value.validationInvalid;
			break;
		}
		if (!result && p.required && !isSFieldFilled(value())) result = locale.value.validationRequired;
		message.value = result;
	}
	function validate() {
		if (fieldDisabled(p)) {
			message.value = "";
			return true;
		}
		validated.value = true;
		const intrinsic = options.validateIntrinsic?.() ?? true;
		checkRules();
		return intrinsic && !error.value;
	}
	function resetValidation() {
		validated.value = false;
		message.value = "";
		options.resetIntrinsic?.();
	}
	watch([
		value,
		() => p.rules,
		() => p.required,
		locale
	], () => {
		if (validated.value) checkRules();
	}, { deep: true });
	watch(() => fieldDisabled(p), (disabled) => {
		if (disabled) resetValidation();
	});
	const unregister = context?.register({
		id: p.id,
		label: () => p.label,
		disabled: () => fieldDisabled(p),
		error,
		validate,
		resetValidation,
		focus: options.focus
	});
	onBeforeUnmount(() => {
		unregister?.();
		fieldStates.delete(p);
	});
	return {
		focus: options.focus,
		validate,
		resetValidation
	};
}
var SForm = defineComponent({
	name: "SForm",
	inheritAttrs: false,
	props: {
		modelValue: {
			type: Boolean,
			default: null
		},
		disabled: Boolean,
		readonly: Boolean,
		fastFail: Boolean
	},
	emits: {
		"update:modelValue": (_value) => true,
		submit: (_event) => true
	},
	setup(p, { attrs, slots, emit, expose }) {
		const native = ref$1(null), fields = shallowReactive(/* @__PURE__ */ new Map());
		const errors = ref$1([]), nativeErrors = ref$1([]), submitted = ref$1(false), validating = ref$1(false), nativeValid = ref$1(null);
		const pending = /* @__PURE__ */ new Set();
		let revision = 0, resetPending = false;
		provide(SFormKey, {
			disabled: computed(() => p.disabled),
			readonly: computed(() => p.readonly),
			register(field) {
				if (fields.has(field.id)) throw new Error("SForm field id must be unique: " + field.id);
				fields.set(field.id, field);
				return () => fields.delete(field.id);
			}
		});
		const fieldErrors = () => [...fields.values()].filter((field) => !field.disabled() && field.error.value).map((field) => ({
			id: field.id,
			label: field.label(),
			errorMessages: [field.error.value]
		}));
		const combinedErrors = () => [...fieldErrors(), ...nativeErrors.value.filter((item) => !fields.has(item.id))];
		watch(() => native.value?.errors, (value) => {
			if (!resetPending) nativeErrors.value = (value || []).map((item) => ({
				id: String(item.id),
				label: String(item.id),
				errorMessages: item.errorMessages
			}));
		}, { deep: true });
		const valid = computed(() => fieldErrors().length || nativeValid.value === false ? false : submitted.value ? true : null);
		watchEffect(() => {
			if (submitted.value) errors.value = combinedErrors();
			emit("update:modelValue", valid.value);
		});
		function validate() {
			return performValidation();
		}
		async function performValidation(nativeReady) {
			const current = ++revision;
			pending.add(current);
			resetPending = false;
			validating.value = true;
			submitted.value = true;
			try {
				const nativeResult = await (nativeReady || native.value?.validate());
				if (current !== revision) return {
					valid: false,
					errors: [],
					cancelled: true
				};
				nativeValid.value = nativeResult?.valid ?? true;
				const ownErrors = [];
				for (const field of fields.values()) {
					if (field.disabled()) continue;
					if (!field.validate()) ownErrors.push({
						id: field.id,
						label: field.label(),
						errorMessages: [field.error.value || "입력값을 확인해 주세요."]
					});
					if (p.fastFail && ownErrors.length) break;
				}
				for (const item of nativeResult?.errors || []) if (!fields.has(String(item.id))) ownErrors.push({
					id: String(item.id),
					label: String(item.id),
					errorMessages: item.errorMessages
				});
				errors.value = ownErrors;
				nativeValid.value = !ownErrors.length;
				return {
					valid: !ownErrors.length,
					errors: ownErrors
				};
			} finally {
				pending.delete(current);
				validating.value = pending.size > 0;
				if (resetPending && !pending.size) {
					const resetRevision = revision;
					native.value?.resetValidation();
					nativeErrors.value = [];
					nativeValid.value = null;
					await nextTick$1();
					await nextTick$1();
					if (resetRevision === revision && !pending.size) resetPending = false;
				}
			}
		}
		function resetValidation() {
			revision++;
			resetPending = pending.size > 0;
			for (const field of fields.values()) field.resetValidation();
			native.value?.resetValidation();
			errors.value = [];
			nativeErrors.value = [];
			submitted.value = false;
			nativeValid.value = null;
		}
		function focus() {
			const list = [...fields.values()].filter((field) => !field.disabled());
			(list.find((field) => field.error.value) || list[0])?.focus();
		}
		expose({
			validate,
			resetValidation,
			focus
		});
		onBeforeUnmount(() => {
			revision++;
			resetPending = true;
		});
		return () => h$1(VForm, {
			...attrs,
			ref: native,
			modelValue: nativeValid.value,
			disabled: p.disabled,
			readonly: p.readonly,
			fastFail: p.fastFail,
			"onUpdate:modelValue": (value) => {
				if (!resetPending) nativeValid.value = value;
			},
			onSubmit: (event) => {
				event.preventDefault();
				const nativeSubmission = event;
				const ready = performValidation(typeof nativeSubmission.then === "function" ? new Promise((resolve, reject) => nativeSubmission.then(resolve, reject)) : void 0), submission = event;
				submission.then = ready.then.bind(ready);
				submission.catch = ready.catch.bind(ready);
				submission.finally = ready.finally.bind(ready);
				emit("submit", submission);
			},
			onReset: () => resetValidation()
		}, { default: () => slots.default?.({
			validate,
			resetValidation,
			focus,
			errors: errors.value,
			isValid: valid.value,
			isValidating: validating.value
		}) });
	}
});
// packages/vue-ui/src/controls.ts
var commonFieldProps = {
	...validationProps,
	id: {
		type: String,
		required: true
	},
	label: {
		type: String,
		required: true
	},
	help: {
		type: String,
		default: ""
	},
	error: {
		type: String,
		default: ""
	},
	disabled: Boolean,
	readonly: Boolean,
	required: Boolean,
	locale: Object
};
function fieldDescription(p, slots, error = fieldError(p), external) {
	return [
		p.help || slots.help ? p.id + "-help" : "",
		error ? p.id + "-error" : "",
		external
	].filter(Boolean).join(" ") || void 0;
}
function fieldMessages(p, slots, error = fieldError(p)) {
	return [p.help || slots.help ? h$1("div", {
		id: p.id + "-help",
		class: "sol-hint"
	}, slots.help?.() || p.help) : null, error ? h$1("p", {
		id: p.id + "-error",
		class: "sol-error",
		role: "alert"
	}, error) : null];
}
function fieldLabel(p, slots, required) {
	return h$1("label", {
		id: p.id + "-label",
		for: p.id,
		class: "sol-label"
	}, [slots.label?.() || p.label, p.required ? ` (${required})` : ""]);
}
var stopReadonly = (p, e) => {
	if (fieldReadonly(p)) e.preventDefault();
};
var readonlyKeys = (p, e) => {
	if (fieldReadonly(p) && ![
		"Tab",
		"Escape",
		"Shift",
		"Control",
		"Alt",
		"Meta"
	].includes(e.key)) e.preventDefault();
};
var SCheckbox = defineComponent({
	name: "SCheckbox",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: Boolean
	},
	emits: {
		"update:modelValue": (_v) => true,
		change: (_v) => true,
		blur: (_e) => true
	},
	setup(p, { attrs, slots, emit, expose }) {
		const l = useSolLocale(() => p.locale), input = ref$1(null);
		const validation = useSFieldValidation(p, () => p.modelValue, { focus: () => input.value?.focus() });
		expose(validation);
		return () => h$1("div", { class: ["sol-ui-native-field", attrs.class] }, [h$1("label", {
			class: "sol-choice",
			for: p.id
		}, [
			h$1("input", {
				...attrs,
				ref: input,
				class: "sol-ui-choice-input",
				id: p.id,
				type: "checkbox",
				checked: p.modelValue,
				disabled: fieldDisabled(p),
				required: p.required,
				"aria-readonly": fieldReadonly(p) ? "true" : void 0,
				"aria-invalid": fieldError(p) ? "true" : void 0,
				"aria-describedby": fieldDescription(p, slots, fieldError(p), attrs["aria-describedby"]),
				onClick: (e) => stopReadonly(p, e),
				onChange: (e) => {
					const input = e.target;
					if (fieldReadonly(p) || fieldDisabled(p)) {
						input.checked = p.modelValue;
						return;
					}
					emit("update:modelValue", input.checked);
					emit("change", input.checked);
				},
				onBlur: (e) => {
					validation.validate();
					emit("blur", e);
				}
			}),
			h$1("span", slots.label?.() || p.label),
			p.required ? h$1("span", { class: "sol-hint" }, ` (${l.value.required})`) : null
		]), ...fieldMessages(p, slots)]);
	}
});
var SRadioGroup = defineComponent({
	name: "SRadioGroup",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: {
			type: String,
			default: null
		},
		options: {
			type: Array,
			required: true
		},
		layout: {
			type: String,
			default: "list"
		},
		name: String
	},
	emits: {
		"update:modelValue": (_v) => true,
		change: (_v) => true
	},
	setup(p, { attrs, slots, emit, expose }) {
		const l = useSolLocale(() => p.locale), inputs = /* @__PURE__ */ new Map();
		expose(useSFieldValidation(p, () => p.modelValue, { focus: () => {
			const option = p.options.find((o) => !o.disabled && o.value === p.modelValue) || p.options.find((o) => !o.disabled);
			if (option) inputs.get(option.value)?.focus();
		} }));
		return () => h$1("fieldset", {
			...attrs,
			id: p.id,
			disabled: fieldDisabled(p),
			class: ["sol-ui-native-field sol-choice-fieldset", attrs.class],
			"aria-describedby": fieldDescription(p, slots, fieldError(p), attrs["aria-describedby"]),
			"aria-invalid": fieldError(p) ? "true" : void 0
		}, [
			h$1("legend", {
				id: p.id + "-label",
				class: "sol-label"
			}, [slots.label?.() || p.label, p.required ? ` (${l.value.required})` : ""]),
			...p.options.map((o, i) => h$1("label", {
				class: ["sol-choice", p.layout === "cards" ? "sol-ui-radio-card" : void 0],
				for: p.id + "-" + i
			}, [h$1("input", {
				id: p.id + "-" + i,
				type: "radio",
				ref: (el) => {
					if (el) inputs.set(o.value, el);
					else inputs.delete(o.value);
				},
				name: p.name || p.id,
				value: o.value,
				checked: p.modelValue === o.value,
				disabled: fieldDisabled(p) || o.disabled,
				required: p.required,
				"aria-disabled": fieldReadonly(p) ? "true" : void 0,
				onClick: (e) => stopReadonly(p, e),
				onKeydown: (e) => readonlyKeys(p, e),
				onChange: (e) => {
					if (fieldDisabled(p) || fieldReadonly(p)) {
						e.target.checked = p.modelValue === o.value;
						return;
					}
					emit("update:modelValue", o.value);
					emit("change", o.value);
				}
			}), h$1("span", [h$1("span", o.label), o.description ? h$1("span", { class: "sol-hint sol-ui-option-description" }, o.description) : null])])),
			...fieldMessages(p, slots)
		]);
	}
});
var SSwitch = defineComponent({
	name: "SSwitch",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: Boolean
	},
	emits: {
		"update:modelValue": (_v) => true,
		change: (_v) => true
	},
	setup(p, { attrs, slots, emit, expose }) {
		const l = useSolLocale(() => p.locale), input = ref$1(null);
		expose(useSFieldValidation(p, () => p.modelValue, { focus: () => input.value?.focus() }));
		return () => h$1("div", { class: "sol-ui-native-field" }, [h$1("label", {
			class: "sol-choice",
			for: p.id
		}, [
			h$1("input", {
				...attrs,
				ref: input,
				id: p.id,
				type: "checkbox",
				role: "switch",
				class: ["sol-ui-switch-input", attrs.class],
				checked: p.modelValue,
				disabled: fieldDisabled(p),
				required: p.required,
				"aria-checked": String(p.modelValue),
				"aria-readonly": fieldReadonly(p) ? "true" : void 0,
				"aria-describedby": fieldDescription(p, slots, fieldError(p), attrs["aria-describedby"]),
				"aria-invalid": fieldError(p) ? "true" : void 0,
				onClick: (e) => stopReadonly(p, e),
				onChange: (e) => {
					const input = e.target;
					if (fieldDisabled(p) || fieldReadonly(p)) {
						input.checked = p.modelValue;
						return;
					}
					emit("update:modelValue", input.checked);
					emit("change", input.checked);
				}
			}),
			h$1("span", slots.label?.() || p.label),
			p.required ? " (" + l.value.required + ")" : ""
		]), ...fieldMessages(p, slots)]);
	}
});
var SSelect = defineComponent({
	name: "SSelect",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: {
			type: String,
			default: null
		},
		options: {
			type: Array,
			required: true
		},
		placeholder: String
	},
	emits: {
		"update:modelValue": (_v) => true,
		change: (_v) => true,
		blur: (_e) => true
	},
	setup(p, { attrs, slots, emit, expose }) {
		const l = useSolLocale(() => p.locale), input = ref$1(null);
		const validation = useSFieldValidation(p, () => p.modelValue, { focus: () => input.value?.focus() });
		expose(validation);
		return () => h$1("div", { class: "sol-field sol-ui-native-field" }, [
			fieldLabel(p, slots, l.value.required),
			h$1("select", {
				...attrs,
				ref: input,
				id: p.id,
				value: p.modelValue ?? "",
				class: ["sol-select", attrs.class],
				disabled: fieldDisabled(p),
				required: p.required,
				"aria-readonly": fieldReadonly(p) ? "true" : void 0,
				"aria-invalid": fieldError(p) ? "true" : void 0,
				"aria-describedby": fieldDescription(p, slots, fieldError(p), attrs["aria-describedby"]),
				onPointerdown: (e) => stopReadonly(p, e),
				onKeydown: (e) => readonlyKeys(p, e),
				onChange: (e) => {
					let input = e.target;
					if (fieldDisabled(p) || fieldReadonly(p)) {
						input.value = p.modelValue ?? "";
						return;
					}
					const value = input.value || null;
					emit("update:modelValue", value);
					emit("change", value);
				},
				onBlur: (e) => {
					validation.validate();
					emit("blur", e);
				}
			}, [h$1("option", {
				value: "",
				disabled: p.required
			}, p.placeholder ?? l.value.choose), ...p.options.map((o) => h$1("option", {
				value: o.value,
				disabled: o.disabled
			}, o.label))]),
			...fieldMessages(p, slots)
		]);
	}
});
var STextarea = defineComponent({
	name: "STextarea",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: {
			type: String,
			default: ""
		},
		rows: {
			type: Number,
			default: 3
		},
		maxlength: Number,
		showCount: {
			type: Boolean,
			default: true
		}
	},
	emits: {
		"update:modelValue": (_v) => true,
		change: (_v) => true,
		blur: (_e) => true
	},
	setup(p, { attrs, slots, emit, expose }) {
		const l = useSolLocale(() => p.locale), input = ref$1(null);
		const validation = useSFieldValidation(p, () => p.modelValue, { focus: () => input.value?.focus() });
		expose(validation);
		return () => h$1("div", { class: "sol-field sol-ui-native-field" }, [
			fieldLabel(p, slots, l.value.required),
			h$1("textarea", {
				...attrs,
				ref: input,
				id: p.id,
				class: ["sol-input sol-textarea", attrs.class],
				value: p.modelValue,
				rows: Math.max(3, p.rows),
				maxlength: p.maxlength,
				disabled: fieldDisabled(p),
				readonly: fieldReadonly(p),
				required: p.required,
				"aria-invalid": fieldError(p) ? "true" : void 0,
				"aria-describedby": fieldDescription(p, slots, fieldError(p), attrs["aria-describedby"]),
				onInput: (e) => {
					if (!fieldDisabled(p) && !fieldReadonly(p)) emit("update:modelValue", e.target.value);
				},
				onChange: (e) => {
					if (!fieldDisabled(p) && !fieldReadonly(p)) emit("change", e.target.value);
				},
				onBlur: (e) => {
					validation.validate();
					emit("blur", e);
				}
			}),
			h$1("div", { class: "sol-ui-field-footer" }, [h$1("div", fieldMessages(p, slots)), p.showCount ? h$1("span", { class: "sol-hint sol-ui-counter" }, l.value.count(p.modelValue.length, p.maxlength)) : null])
		]);
	}
});
var SNumberInput = defineComponent({
	name: "SNumberInput",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: {
			type: Number,
			default: null
		},
		min: Number,
		max: Number,
		step: {
			type: Number,
			default: 1
		}
	},
	emits: {
		"update:modelValue": (_v) => true,
		change: (_v) => true,
		invalid: (_v) => true,
		blur: (_e) => true
	},
	setup(p, { attrs, slots, emit, expose }) {
		const l = useSolLocale(() => p.locale), draft = ref$1(p.modelValue === null ? "" : formatSolNumber(p.modelValue, l.value)), localError = ref$1(""), input = ref$1(null);
		const numeric = () => draft.value.trim() === "" ? null : parseSolNumber(draft.value, l.value) ?? NaN;
		function message() {
			const value = numeric();
			if (value === null) return p.required ? l.value.invalidNumber : "";
			if (!Number.isFinite(value) || !Number.isFinite(p.step) || p.step <= 0 || p.min !== void 0 && p.max !== void 0 && p.min > p.max) return l.value.invalidNumber;
			if (p.min !== void 0 && value < p.min || p.max !== void 0 && value > p.max) return l.value.numberRange;
			const steps = (value - (p.min ?? 0)) / p.step;
			return Math.abs(steps - Math.round(steps)) > 1e-7 ? l.value.numberStep : "";
		}
		function syncValidity() {
			input.value?.setCustomValidity(fieldError(p) || message());
		}
		function commit() {
			if (fieldReadonly(p) || fieldDisabled(p)) return !fieldError(p) && !message();
			const error = message();
			localError.value = error;
			if (error) {
				emit("invalid", error);
				syncValidity();
				return false;
			}
			const value = numeric();
			draft.value = value === null ? "" : formatSolNumber(value, l.value);
			if (value !== p.modelValue) {
				emit("update:modelValue", value);
				emit("change", value);
			}
			return !p.error && !p.serverError && !p.errorMessages.length;
		}
		function nudge(direction) {
			if (fieldDisabled(p) || fieldReadonly(p)) return;
			const base = p.modelValue ?? p.min ?? 0, next = Number((base + (p.modelValue === null ? 0 : direction * p.step)).toFixed(10));
			draft.value = String(next);
			commit();
			input.value?.focus();
		}
		const validation = useSFieldValidation(p, numeric, {
			focus: () => input.value?.focus(),
			validateIntrinsic: commit,
			intrinsicError: () => localError.value,
			resetIntrinsic: () => {
				localError.value = "";
			}
		});
		watch(() => p.modelValue, (v) => {
			draft.value = v === null ? "" : formatSolNumber(v, l.value);
			localError.value = "";
		});
		watch(() => [
			draft.value,
			fieldError(p),
			p.required,
			p.min,
			p.max,
			p.step
		], () => nextTick$1(syncValidity));
		watch(l, () => {
			if (localError.value) localError.value = message();
			if (document.activeElement !== input.value && !message()) draft.value = p.modelValue === null ? "" : formatSolNumber(p.modelValue, l.value);
			nextTick$1(syncValidity);
		});
		onMounted(syncValidity);
		expose(validation);
		return () => {
			const error = fieldError(p) || localError.value, value = numeric();
			return h$1("div", { class: "sol-field sol-ui-native-field" }, [
				fieldLabel(p, slots, l.value.required),
				h$1("div", { class: "sol-ui-number" }, [
					h$1("button", {
						type: "button",
						class: "sol-button",
						disabled: fieldDisabled(p) || fieldReadonly(p) || p.modelValue !== null && p.min !== void 0 && p.modelValue - p.step < p.min,
						"aria-label": p.label + " " + l.value.decrease,
						onClick: () => nudge(-1)
					}, "−"),
					h$1("input", {
						...attrs,
						ref: input,
						id: p.id,
						type: "text",
						inputmode: "decimal",
						class: ["sol-input", attrs.class],
						value: draft.value,
						disabled: fieldDisabled(p),
						readonly: fieldReadonly(p),
						required: p.required,
						role: "spinbutton",
						"aria-valuemin": p.min,
						"aria-valuemax": p.max,
						"aria-valuenow": value !== null && Number.isFinite(value) && !message() ? value : void 0,
						"aria-invalid": error ? "true" : void 0,
						"aria-describedby": fieldDescription(p, slots, error, [p.id + "-constraints", attrs["aria-describedby"]].filter(Boolean).join(" ")),
						onInput: (e) => {
							if (fieldReadonly(p) || fieldDisabled(p)) return;
							draft.value = e.target.value;
							if (localError.value) localError.value = message();
						},
						onBlur: (e) => {
							if (!fieldReadonly(p) && !fieldDisabled(p)) validation.validate();
							emit("blur", e);
						},
						onInvalid: (e) => {
							e.preventDefault();
							commit();
							input.value?.focus();
						},
						onKeydown: (e) => {
							if (e.isComposing || fieldReadonly(p) || fieldDisabled(p)) return;
							if (e.key === "Enter") {
								e.preventDefault();
								commit();
							} else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
								e.preventDefault();
								nudge(e.key === "ArrowUp" ? 1 : -1);
							}
						}
					}),
					h$1("button", {
						type: "button",
						class: "sol-button",
						disabled: fieldDisabled(p) || fieldReadonly(p) || p.modelValue !== null && p.max !== void 0 && p.modelValue + p.step > p.max,
						"aria-label": p.label + " " + l.value.increase,
						onClick: () => nudge(1)
					}, "+")
				]),
				h$1("span", {
					id: p.id + "-constraints",
					class: "sol-hint"
				}, l.value.numberHelp(p.min, p.max, p.step)),
				...fieldMessages(p, slots, error)
			]);
		};
	}
});
// packages/vue-ui/src/files.ts
var same = (a, b) => a.name === b.name && a.size === b.size && a.type === b.type && a.lastModified === b.lastModified;
function limits(p) {
	return {
		maxFiles: Number.isFinite(p.maxFiles) && Number(p.maxFiles) >= 1 ? Math.floor(p.maxFiles) : 3,
		maxFileSize: Number.isFinite(p.maxFileSize) && Number(p.maxFileSize) >= 0 ? p.maxFileSize : 2097152
	};
}
function bytes(size, l) {
	return size < 1024 ? formatSolNumber(size, l) + " B" : formatSolNumber(size / 1024, l, {
		maximumFractionDigits: 2,
		maximumSignificantDigits: void 0
	}) + " KiB";
}
function describeSFile(file, locale = "ko-KR") {
	const l = resolveSolLocale(locale), extension = file.name.includes(".") ? file.name.split(".").at(-1).toUpperCase() : l.noFileExtension;
	return {
		name: file.name,
		extension,
		mediaType: file.type ? l.fileType(file.type) : l.unknownFileType,
		size: bytes(file.size, l)
	};
}
function validateSFiles(incoming, existing, options = {}, locale = "ko-KR") {
	const l = resolveSolLocale(locale), cap = limits(options), rules = (options.accept || "").split(",").map((x) => x.trim().toLowerCase()).filter(Boolean), files = [...existing], rejected = [];
	for (const file of incoming) {
		let code, message = "";
		if (!(!rules.length || rules.some((rule) => rule.startsWith(".") ? file.name.toLowerCase().endsWith(rule) : rule.endsWith("/*") ? !!file.type && file.type.toLowerCase().startsWith(rule.slice(0, -1)) : file.type.toLowerCase() === rule))) {
			code = "type";
			message = l.unsupportedFile;
		} else if (file.size > cap.maxFileSize) {
			code = "size";
			message = l.oversizedFile(bytes(cap.maxFileSize, l));
		} else if (files.some((item) => same(item, file))) {
			code = "duplicate";
			message = l.duplicateFile;
		} else if (files.length >= cap.maxFiles) {
			code = "count";
			message = l.tooManyFiles(cap.maxFiles);
		}
		if (code) rejected.push({
			file,
			code,
			message
		});
		else files.push(file);
	}
	return {
		files,
		rejected
	};
}
var SFileInput = defineComponent({
	name: "SFileInput",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: {
			type: Array,
			default: () => []
		},
		accept: {
			type: String,
			default: ".txt,.png,.jpg,.jpeg,.pdf"
		},
		maxFiles: {
			type: Number,
			default: 3
		},
		maxFileSize: {
			type: Number,
			default: 2097152
		},
		drop: {
			type: Boolean,
			default: true
		}
	},
	emits: {
		"update:modelValue": (_files) => true,
		change: (_files) => true,
		reject: (_items) => true,
		remove: (_file) => true,
		invalid: (_message) => true
	},
	setup(p, { attrs, slots, emit, expose }) {
		const l = useSolLocale(() => p.locale), root = ref$1(null), input = ref$1(null), button = ref$1(null), dragging = ref$1(false), rejected = ref$1([]), localError = ref$1("");
		let depth = 0;
		const available = () => !fieldDisabled(p) && !fieldReadonly(p);
		const focus = () => button.value?.$el?.focus();
		function commit(files) {
			emit("update:modelValue", files);
			emit("change", files);
			localError.value = "";
		}
		function add(files) {
			if (!available()) return;
			const result = validateSFiles(files, p.modelValue, p, l.value);
			rejected.value = result.rejected;
			if (result.files.length !== p.modelValue.length) commit(result.files);
			if (result.rejected.length) emit("reject", result.rejected);
		}
		function choose(e) {
			add(Array.from(e.target.files || []));
			if (input.value) input.value.value = "";
		}
		function remove(file) {
			if (!available()) return;
			commit(p.modelValue.filter((item) => item !== file));
			rejected.value = [];
			emit("remove", file);
			nextTick$1(focus);
		}
		function clear() {
			if (!available()) return;
			commit([]);
			rejected.value = [];
			if (input.value) input.value.value = "";
			nextTick$1(focus);
		}
		function validateIntrinsic() {
			const message = p.required && !p.modelValue.length ? l.value.fileRequired : "";
			localError.value = message;
			if (message) emit("invalid", message);
			return !externalFieldError(p) && !message;
		}
		const isFiles = (e) => Array.from(e.dataTransfer?.types || []).includes("Files");
		function enter(e) {
			if (!isFiles(e)) return;
			e.preventDefault();
			if (p.drop && available()) {
				depth++;
				dragging.value = true;
			}
		}
		function leave() {
			depth = Math.max(0, depth - 1);
			if (!depth) dragging.value = false;
		}
		function over(e) {
			if (!isFiles(e)) return;
			e.preventDefault();
			if (e.dataTransfer) e.dataTransfer.dropEffect = p.drop && available() ? "copy" : "none";
		}
		function drop(e) {
			if (!isFiles(e)) return;
			e.preventDefault();
			e.stopPropagation();
			depth = 0;
			dragging.value = false;
			if (p.drop) add(Array.from(e.dataTransfer?.files || []));
		}
		function guard(e) {
			if (isFiles(e) && !root.value?.contains(e.target)) e.preventDefault();
		}
		onMounted(() => {
			document.addEventListener("dragover", guard);
			document.addEventListener("drop", guard);
		});
		onBeforeUnmount(() => {
			document.removeEventListener("dragover", guard);
			document.removeEventListener("drop", guard);
		});
		expose({
			...useSFieldValidation(p, () => p.modelValue, {
				focus,
				validateIntrinsic,
				intrinsicError: () => localError.value,
				resetIntrinsic: () => {
					localError.value = "";
				}
			}),
			clear
		});
		return () => {
			const cap = limits(p), error = fieldError(p) || localError.value;
			return h$1("div", {
				...attrs,
				ref: root,
				class: ["sol-field sol-ui-file", attrs.class],
				role: "group",
				"aria-labelledby": p.id + "-label",
				"aria-describedby": fieldDescription(p, slots, error, attrs["aria-describedby"]),
				"aria-invalid": error ? "true" : void 0
			}, [
				h$1("span", {
					id: p.id + "-label",
					class: "sol-label"
				}, [slots.label?.() || p.label, p.required ? " (" + l.value.required + ")" : ""]),
				h$1("div", {
					class: p.drop ? "sol-dropzone" : "sol-ui-file-chooser",
					"data-dragging": String(dragging.value),
					"aria-disabled": !available() ? "true" : void 0,
					onDragenter: enter,
					onDragover: over,
					onDragleave: leave,
					onDrop: drop
				}, [
					p.drop ? h$1("p", l.value.dropFiles) : null,
					h$1("p", {
						id: p.id + "-limits",
						class: "sol-hint"
					}, l.value.filesHelp(p.accept, cap.maxFiles, bytes(cap.maxFileSize, l.value))),
					h$1(SBtn, {
						ref: button,
						id: p.id + "-choose",
						disabled: !available(),
						"aria-label": p.label + ": " + l.value.filesChoose,
						"aria-describedby": [p.id + "-limits", fieldDescription(p, slots, error)].filter(Boolean).join(" "),
						onClick: () => {
							if (available()) input.value?.click();
						}
					}, () => l.value.filesChoose),
					h$1("input", {
						id: p.id,
						ref: input,
						type: "file",
						hidden: true,
						disabled: !available(),
						accept: p.accept,
						multiple: cap.maxFiles > 1,
						onChange: choose
					})
				]),
				...fieldMessages(p, slots, error),
				rejected.value.length ? h$1("div", {
					class: "sol-notice danger",
					role: "alert"
				}, [h$1("strong", l.value.filesRejected), h$1("ul", rejected.value.map((item, i) => h$1("li", { key: i }, item.file.name + ": " + item.message)))]) : null,
				h$1("ul", { class: "sol-ui-file-list" }, p.modelValue.map((file, i) => {
					const info = describeSFile(file, l.value);
					return h$1("li", { key: i }, [h$1("div", { class: "sol-ui-file-meta" }, [h$1("strong", file.name), h$1("span", { class: "sol-hint" }, [
						info.extension,
						info.mediaType,
						info.size
					].join(" · "))]), h$1(SBtn, {
						variant: "inline",
						disabled: !available(),
						"aria-label": l.value.remove(file.name),
						onClick: () => remove(file)
					}, () => l.value.fileRemove)]);
				})),
				h$1(SBtn, {
					variant: "inline",
					disabled: !available() || !p.modelValue.length,
					onClick: clear
				}, () => l.value.filesClear)
			]);
		};
	}
});
// packages/vue-ui/src/autocomplete.ts
var SAutocomplete = defineComponent({
	name: "SAutocomplete",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: {
			type: String,
			default: null
		},
		options: {
			type: Array,
			default: () => []
		},
		loadOptions: Function,
		debounce: {
			type: Number,
			default: 150
		},
		placeholder: String
	},
	emits: {
		"update:modelValue": (_value) => true,
		change: (_value) => true,
		search: (_query) => true,
		open: () => true,
		close: () => true,
		invalid: (_message) => true
	},
	setup(p, { attrs, slots, emit, expose }) {
		const l = useSolLocale(() => p.locale), host = ref$1(null), input = ref$1(null), panel = ref$1(null), opened = ref$1(false), query = ref$1(""), active = ref$1(-1), items = ref$1([]), busy = ref$1(false), loadError = ref$1(false), localError = ref$1("");
		const { position, locate } = useFloatingPanel(opened, input, panel, true), labels = /* @__PURE__ */ new Map();
		let composing = false, disposed = false, revision = 0, expectedValue, timer, abort;
		const available = () => !fieldDisabled(p) && !fieldReadonly(p);
		const clean = (list) => {
			const seen = /* @__PURE__ */ new Set();
			return list.filter((item) => item && typeof item.value === "string" && !!item.value && typeof item.label === "string" && !seen.has(item.value) && !!seen.add(item.value)).map((item) => {
				labels.set(item.value, item.label);
				return item;
			});
		};
		const normalized = (text) => text.normalize("NFKC").trim().toLocaleLowerCase(l.value.code);
		const visible = computed(() => p.loadOptions ? items.value : items.value.filter((item) => normalized(item.label).includes(normalized(query.value))));
		const enabled = () => visible.value.map((item, index) => ({
			item,
			index
		})).filter(({ item }) => !item.disabled);
		watch(() => p.options, (value) => {
			const list = clean(value);
			if (!p.loadOptions) items.value = list;
			if (!opened.value && p.modelValue !== null) query.value = labels.get(p.modelValue) || p.modelValue;
		}, {
			immediate: true,
			deep: true
		});
		watch(() => p.modelValue, (value) => {
			if (value !== expectedValue) query.value = value === null ? "" : labels.get(value) || value;
			expectedValue = void 0;
			localError.value = "";
		}, { immediate: true });
		function stop() {
			clearTimeout(timer);
			timer = void 0;
			abort?.abort();
			abort = void 0;
			revision++;
			busy.value = false;
		}
		function close() {
			if (!opened.value) return;
			opened.value = false;
			active.value = -1;
			stop();
			emit("close");
		}
		function first() {
			active.value = enabled()[0]?.index ?? -1;
		}
		async function load() {
			if (!p.loadOptions || !opened.value || !available() || composing) return;
			stop();
			const current = revision, controller = new AbortController();
			abort = controller;
			busy.value = true;
			loadError.value = false;
			items.value = [];
			active.value = -1;
			try {
				const result = await p.loadOptions(query.value, controller.signal);
				if (disposed || current !== revision || controller.signal.aborted) return;
				items.value = clean(result);
				first();
			} catch {
				if (!disposed && current === revision && !controller.signal.aborted) loadError.value = true;
			} finally {
				if (!disposed && current === revision) {
					busy.value = false;
					nextTick$1(locate);
				}
			}
		}
		function request() {
			if (!available() || composing) return;
			emit("search", query.value);
			if (p.loadOptions) {
				stop();
				loadError.value = false;
				items.value = [];
				active.value = -1;
				busy.value = true;
				timer = setTimeout(() => void load(), Math.max(0, p.debounce));
			} else first();
		}
		function open() {
			if (!available()) return;
			if (!opened.value) {
				opened.value = true;
				emit("open");
			}
			request();
		}
		function changeValue(value) {
			expectedValue = value;
			emit("update:modelValue", value);
			emit("change", value);
			localError.value = "";
		}
		function edit(e) {
			if (!available()) return;
			query.value = e.target.value;
			if (p.modelValue !== null) changeValue(null);
			if (!composing) open();
		}
		function choose(item) {
			if (!available() || item.disabled) return;
			changeValue(item.value);
			query.value = item.label;
			close();
			input.value?.focus({ preventScroll: true });
		}
		function clear() {
			if (!available()) return;
			changeValue(null);
			query.value = "";
			close();
			input.value?.focus({ preventScroll: true });
		}
		function retry() {
			if (!available()) return;
			input.value?.focus({ preventScroll: true });
			if (!opened.value) {
				opened.value = true;
				emit("open");
			}
			load();
		}
		function validateIntrinsic() {
			const message = p.required && p.modelValue === null ? l.value.chooseAtLeastOne : "";
			localError.value = message;
			if (message) emit("invalid", message);
			return !externalFieldError(p) && !message;
		}
		function key(e) {
			if (composing || e.isComposing || !available()) return;
			if (e.key === "Escape" && opened.value) {
				e.preventDefault();
				e.stopPropagation();
				close();
				input.value?.focus();
				return;
			}
			if (e.key === "Tab") {
				if (!loadError.value) close();
				return;
			}
			const list = enabled();
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				if (!opened.value) {
					open();
					if (!p.loadOptions) active.value = (e.key === "ArrowUp" ? enabled().at(-1) : enabled()[0])?.index ?? -1;
					return;
				}
				const at = list.findIndex(({ index }) => index === active.value), step = e.key === "ArrowDown" ? 1 : -1;
				active.value = (at < 0 ? step === 1 ? list[0] : list.at(-1) : list[(at + step + list.length) % list.length])?.index ?? -1;
			} else if (opened.value && active.value >= 0 && visible.value[active.value]) {
				if (e.key === "Home" || e.key === "End") {
					e.preventDefault();
					active.value = (e.key === "Home" ? list[0] : list.at(-1))?.index ?? -1;
				} else if (e.key === "Enter") {
					e.preventDefault();
					choose(visible.value[active.value]);
				}
			}
			if (e.defaultPrevented) nextTick$1(() => {
				const list = panel.value, item = list?.querySelector("[aria-selected=\"true\"]");
				if (!list || !item) return;
				const box = list.getBoundingClientRect(), row = item.getBoundingClientRect();
				if (row.top < box.top) list.scrollTop -= box.top - row.top;
				else if (row.bottom > box.bottom) list.scrollTop += row.bottom - box.bottom;
			});
		}
		function focusout(e) {
			const target = e.relatedTarget;
			if (target && !host.value?.contains(target)) close();
		}
		const outside = (e) => {
			if (opened.value && !host.value?.contains(e.target)) close();
		};
		watch(() => [
			fieldDisabled(p),
			fieldReadonly(p),
			p.loadOptions
		], () => {
			close();
			if (!p.loadOptions) items.value = clean(p.options);
		});
		onMounted(() => document.addEventListener("pointerdown", outside));
		onBeforeUnmount(() => {
			disposed = true;
			stop();
			document.removeEventListener("pointerdown", outside);
		});
		expose({
			...useSFieldValidation(p, () => p.modelValue, {
				focus: () => input.value?.focus(),
				validateIntrinsic,
				intrinsicError: () => localError.value,
				resetIntrinsic: () => {
					localError.value = "";
				}
			}),
			clear,
			retry
		});
		return () => {
			const error = fieldError(p) || localError.value, option = opened.value && !busy.value && !loadError.value && active.value >= 0 ? visible.value[active.value] : void 0;
			return h$1("div", {
				ref: host,
				class: ["sol-field sol-ui-autocomplete", attrs.class],
				onFocusout: focusout
			}, [
				fieldLabel(p, slots, l.value.required),
				h$1("input", {
					...attrs,
					id: p.id,
					ref: input,
					class: "sol-input",
					type: "text",
					value: query.value,
					placeholder: p.placeholder,
					disabled: fieldDisabled(p),
					readonly: fieldReadonly(p),
					required: p.required,
					role: "combobox",
					"aria-autocomplete": "list",
					"aria-haspopup": "listbox",
					"aria-expanded": String(opened.value),
					"aria-controls": p.id + "-options",
					"aria-activedescendant": option ? p.id + "-option-" + active.value : void 0,
					"aria-invalid": error ? "true" : void 0,
					"aria-describedby": [fieldDescription(p, slots, error, attrs["aria-describedby"]), p.id + "-status"].filter(Boolean).join(" "),
					autocomplete: "off",
					onClick: open,
					onInput: edit,
					onKeydown: key,
					onCompositionstart: () => {
						composing = true;
						stop();
					},
					onCompositionend: (e) => {
						composing = false;
						edit(e);
					}
				}),
				...fieldMessages(p, slots, error),
				h$1("div", {
					ref: panel,
					popover: "manual",
					hidden: !opened.value,
					class: "sol-ui-floating sol-ui-combo-panel",
					style: position.value,
					onKeydown: (e) => {
						if (e.key === "Escape" && opened.value) {
							e.preventDefault();
							e.stopPropagation();
							close();
							input.value?.focus();
						}
					}
				}, [h$1("ul", {
					id: p.id + "-options",
					role: "listbox",
					"aria-label": p.label,
					hidden: busy.value || loadError.value || !visible.value.length
				}, visible.value.map((item, index) => h$1("li", {
					id: p.id + "-option-" + index,
					key: item.value,
					role: "option",
					"aria-selected": String(active.value === index),
					"aria-disabled": item.disabled ? "true" : void 0,
					onMousedown: (e) => e.preventDefault(),
					onClick: () => choose(item)
				}, [h$1("span", item.label), item.description ? h$1("span", { class: "sol-hint" }, item.description) : null]))), busy.value ? h$1("p", { class: "sol-ui-combo-message" }, l.value.loading) : loadError.value ? h$1("div", { class: "sol-ui-combo-message" }, [h$1("p", l.value.loadFailed), h$1(SBtn, {
					variant: "inline",
					onClick: retry
				}, () => l.value.retry)]) : !visible.value.length ? h$1("p", { class: "sol-ui-combo-message" }, l.value.noResults) : null]),
				h$1("p", {
					id: p.id + "-status",
					class: "sol-ui-sr-only",
					role: "status"
				}, opened.value ? busy.value ? l.value.loading : loadError.value ? l.value.loadFailed : !visible.value.length ? l.value.noResults : "" : ""),
				h$1(SBtn, {
					variant: "inline",
					disabled: !available() || !query.value && !p.modelValue,
					onClick: clear
				}, () => l.value.clear)
			]);
		};
	}
});
// packages/vue-ui/src/presentation.ts
var SBreadcrumbs = defineComponent({
	name: "SBreadcrumbs",
	inheritAttrs: false,
	props: {
		items: {
			type: Array,
			required: true
		},
		current: String,
		label: String,
		locale: Object
	},
	emits: { navigate: (_item, _event) => true },
	setup(p, { attrs, emit }) {
		const l = useSolLocale(() => p.locale);
		return () => h$1("nav", {
			...attrs,
			class: ["sol-breadcrumbs sol-ui-breadcrumbs", attrs.class],
			"aria-label": p.label || l.value.breadcrumb
		}, h$1("ol", p.items.map((item, index) => {
			const current = p.current === void 0 ? index === p.items.length - 1 : item.id === p.current;
			return h$1("li", {
				key: item.id,
				"aria-current": current ? "page" : void 0
			}, current ? h$1("span", item.label) : item.disabled ? h$1("span", { "aria-disabled": "true" }, item.label) : item.href ? h$1("a", {
				href: item.href,
				onClick: (event) => emit("navigate", item, event)
			}, item.label) : h$1(SBtn, {
				variant: "inline",
				onClick: (event) => emit("navigate", item, event)
			}, () => item.label));
		})));
	}
});
var SAvatar = defineComponent({
	name: "SAvatar",
	inheritAttrs: false,
	props: {
		label: {
			type: String,
			required: true
		},
		src: String,
		initials: String,
		size: {
			type: Number,
			default: 40
		}
	},
	emits: { error: (_event) => true },
	setup(p, { attrs, slots, emit }) {
		const failed = ref$1(false);
		watch(() => p.src, () => failed.value = false);
		return () => h$1("span", {
			...attrs,
			class: ["sol-avatar sol-ui-avatar", attrs.class],
			role: "img",
			"aria-label": p.label,
			style: {
				width: p.size + "px",
				height: p.size + "px"
			}
		}, p.src && !failed.value ? h$1("img", {
			src: p.src,
			alt: "",
			"aria-hidden": "true",
			onError: (e) => {
				failed.value = true;
				emit("error", e);
			}
		}) : h$1("span", { "aria-hidden": "true" }, slots.default?.() || p.initials || Array.from(p.label.trim()).slice(0, 2).join("")));
	}
});
var SStepper = defineComponent({
	name: "SStepper",
	inheritAttrs: false,
	props: {
		id: {
			type: String,
			required: true
		},
		label: String,
		items: {
			type: Array,
			required: true
		},
		modelValue: {
			type: String,
			default: null
		},
		completed: {
			type: Array,
			default: () => []
		},
		interactive: Boolean,
		disabled: Boolean,
		readonly: Boolean,
		locale: Object
	},
	emits: {
		"update:modelValue": (_id) => true,
		change: (_id) => true
	},
	setup(p, { attrs, emit }) {
		const l = useSolLocale(() => p.locale);
		const choose = (item) => {
			if (p.interactive && !p.disabled && !p.readonly && !item.disabled && p.modelValue !== item.id) {
				emit("update:modelValue", item.id);
				emit("change", item.id);
			}
		};
		return () => h$1("nav", {
			...attrs,
			id: p.id,
			class: ["sol-ui-stepper", attrs.class],
			"aria-label": p.label || l.value.steps
		}, h$1("ol", p.items.map((item, index) => {
			const current = p.modelValue === item.id, done = p.completed.includes(item.id), content = () => [
				h$1("span", {
					class: "sol-ui-step-number",
					"aria-hidden": "true"
				}, done ? "✓" : formatSolNumber(index + 1, l.value)),
				h$1("span", { class: "sol-ui-step-copy" }, [h$1("span", item.label), item.description ? h$1("span", { class: "sol-hint" }, item.description) : null]),
				current || done ? h$1("span", { class: "sol-ui-sr-only" }, current ? l.value.currentStep : l.value.completeStep) : null
			];
			return h$1("li", {
				key: item.id,
				"aria-current": current ? "step" : void 0,
				"data-state": current ? "current" : done ? "complete" : "upcoming"
			}, p.interactive ? h$1(SBtn, {
				variant: "subtle",
				disabled: p.disabled || !!item.disabled,
				"aria-disabled": p.readonly ? "true" : void 0,
				onClick: () => choose(item)
			}, content) : h$1("div", {
				class: "sol-ui-step-content",
				"aria-disabled": item.disabled ? "true" : void 0
			}, content()));
		})));
	}
});
var SBarChart = defineComponent({
	name: "SBarChart",
	inheritAttrs: false,
	props: {
		id: {
			type: String,
			required: true
		},
		label: {
			type: String,
			required: true
		},
		items: {
			type: Array,
			required: true
		},
		max: Number,
		loading: Boolean,
		showTable: {
			type: Boolean,
			default: true
		},
		categoryLabel: String,
		valueLabel: String,
		locale: Object
	},
	setup(p, { attrs }) {
		const l = useSolLocale(() => p.locale), limit = computed(() => p.max ?? Math.max(1, ...p.items.map((item) => item.value))), valid = computed(() => Number.isFinite(limit.value) && limit.value > 0 && p.items.every((item) => Number.isFinite(item.value) && item.value >= 0 && item.value <= limit.value));
		return () => h$1("figure", {
			...attrs,
			id: p.id,
			class: ["sol-ui-bar-chart", attrs.class],
			"aria-labelledby": p.id + "-caption",
			"aria-busy": String(p.loading)
		}, [h$1("figcaption", { id: p.id + "-caption" }, p.label), p.loading ? h$1("p", { role: "status" }, l.value.tableLoading) : !valid.value ? h$1("p", { role: "alert" }, l.value.chartInvalid) : !p.items.length ? h$1("p", { role: "status" }, l.value.tableEmpty) : [h$1("svg", {
			viewBox: "0 0 480 200",
			role: "img",
			"aria-labelledby": p.id + "-svg-title",
			preserveAspectRatio: "xMidYMid meet"
		}, [
			h$1("title", { id: p.id + "-svg-title" }, p.label),
			h$1("line", {
				x1: 16,
				y1: 164,
				x2: 464,
				y2: 164,
				stroke: "var(--sol-color-control-border)"
			}),
			...p.items.map((item, index) => {
				const step = 448 / p.items.length, width = Math.min(48, step * .6), x = 16 + step * (index + .5), height = 140 * item.value / limit.value;
				return h$1("g", { key: item.id }, [
					h$1("rect", {
						x: x - width / 2,
						y: 164 - height,
						width,
						height,
						fill: "var(--sol-color-accent)"
					}),
					h$1("text", {
						x,
						y: Math.max(14, 156 - height),
						"text-anchor": "middle",
						class: "sol-ui-chart-value"
					}, formatSolNumber(item.value, l.value)),
					h$1("text", {
						x,
						y: 188,
						"text-anchor": "middle",
						class: "sol-ui-chart-label"
					}, Array.from(item.label).length > 8 ? Array.from(item.label).slice(0, 7).join("") + "…" : item.label)
				]);
			})
		]), h$1("table", { class: ["sol-ui-chart-table", p.showTable ? "" : "sol-ui-sr-only"] }, [
			h$1("caption", p.label),
			h$1("thead", h$1("tr", [h$1("th", { scope: "col" }, p.categoryLabel || l.value.chartCategory), h$1("th", { scope: "col" }, p.valueLabel || l.value.chartValue)])),
			h$1("tbody", p.items.map((item) => h$1("tr", { key: item.id }, [h$1("th", { scope: "row" }, item.label), h$1("td", formatSolNumber(item.value, l.value))])))
		])]]);
	}
});
// packages/vue-ui/node_modules/vuetify/lib/composables/border.js
var makeBorderProps = propsFactory({ border: [
	Boolean,
	Number,
	String
] }, "border");
function useBorder(props, name = getCurrentInstanceName()) {
	return { borderClasses: computed(() => {
		const border = props.border;
		if (border === true || border === "") return `${name}--border`;
		else if (/* @__PURE__ */ isString(border) || border === 0) return String(border).split(" ").map((v) => `border-${v}`);
		return [];
	}) };
}
// packages/vue-ui/node_modules/vuetify/lib/composables/density.js
var allowedDensities = [
	null,
	"default",
	"comfortable",
	"compact"
];
var makeDensityProps = propsFactory({ density: {
	type: String,
	default: "default",
	validator: (v) => allowedDensities.includes(v)
} }, "density");
function useDensity(props, name = getCurrentInstanceName()) {
	return { densityClasses: toRef(() => {
		return `${name}--density-${props.density}`;
	}) };
}
// packages/vue-ui/node_modules/vuetify/lib/composables/elevation.js
var makeElevationProps = propsFactory({
	elevation: {
		type: [Number, String],
		validator: (value) => parseInt(value) >= 0
	},
	hoverElevation: {
		type: [Number, String],
		validator: (value) => parseInt(value) >= 0
	}
}, "elevation");
function useElevation(props) {
	return { elevationClasses: toRef(() => {
		const elevation = isRef(props) ? props.value : props.elevation;
		const hoverElevation = isRef(props) ? null : props.hoverElevation;
		return [.../* @__PURE__ */ isNullOrUndefined(elevation) ? [] : [`elevation-${parseInt(elevation)}`], .../* @__PURE__ */ isNullOrUndefined(hoverElevation) ? [] : [`hover-elevation-${parseInt(hoverElevation)}`]];
	}) };
}
// packages/vue-ui/node_modules/vuetify/lib/composables/rounded.js
var CSS_LENGTH = /^-?\d*\.?\d+([a-z%]{0,4})$/i;
function splitTokens(v) {
	return String(v).trim().split(/\s+/);
}
function isCssLength(token) {
	return token.toLowerCase().match(CSS_LENGTH)?.at(1)?.startsWith("x") === false;
}
function isCssValue(v) {
	return typeof v === "string" && !!v && (v.includes("(") || splitTokens(v).every(isCssLength));
}
var makeRoundedProps = propsFactory({
	rounded: {
		type: [
			Boolean,
			Number,
			String
		],
		default: void 0
	},
	tile: Boolean
}, "rounded");
function useRounded(props, name = getCurrentInstanceName()) {
	return {
		roundedClasses: computed(() => {
			const rounded = isRef(props) ? props.value : props.rounded;
			const tile = isRef(props) ? false : props.tile;
			const classes = [];
			if (tile || rounded === false || String(rounded) === "0") classes.push("rounded-0");
			else if (rounded === true || rounded === "") classes.push(`${name}--rounded`);
			else if (/* @__PURE__ */ isString(rounded) && !isCssValue(rounded)) for (const value of splitTokens(rounded)) classes.push(`rounded-${value}`);
			return classes;
		}),
		roundedStyles: computed(() => {
			const rounded = isRef(props) ? props.value : props.rounded;
			if ((!isCssValue(rounded) || String(rounded) === "0") && !(typeof rounded === "number" && rounded !== 0)) return {};
			return { borderRadius: convertToUnit(rounded) };
		})
	};
}
// packages/vue-ui/node_modules/vuetify/lib/composables/size.js
var predefinedSizes = [
	"x-small",
	"small",
	"default",
	"large",
	"x-large"
];
var makeSizeProps = propsFactory({ size: {
	type: [String, Number],
	default: "default"
} }, "size");
function useSize(props, name = getCurrentInstanceName()) {
	return destructComputed(() => {
		const size = props.size;
		let sizeClasses;
		let sizeStyles;
		if (includes(predefinedSizes, size)) sizeClasses = `${name}--size-${size}`;
		else if (size) sizeStyles = {
			width: convertToUnit(size),
			height: convertToUnit(size)
		};
		return {
			sizeClasses,
			sizeStyles
		};
	});
}
// packages/vue-ui/node_modules/vuetify/lib/composables/tag.js
var makeTagProps = propsFactory({ tag: {
	type: [
		String,
		Object,
		Function
	],
	default: "div"
} }, "tag");
// packages/vue-ui/node_modules/vuetify/lib/composables/theme.js
var ThemeSymbol = Symbol.for("vuetify:theme");
var makeThemeProps = propsFactory({ theme: String }, "theme");
function genDefaults$3() {
	return {
		defaultTheme: "system",
		prefix: "v-",
		variations: {
			colors: [],
			lighten: 0,
			darken: 0
		},
		themes: {
			light: {
				dark: false,
				colors: {
					background: "#FFFFFF",
					surface: "#FFFFFF",
					"surface-bright": "#FFFFFF",
					"surface-light": "#EEEEEE",
					"surface-variant": "#424242",
					"on-surface-variant": "#EEEEEE",
					primary: "#1867C0",
					"primary-darken-1": "#1F5592",
					secondary: "#48A9A6",
					"secondary-darken-1": "#018786",
					error: "#B00020",
					info: "#2196F3",
					success: "#4CAF50",
					warning: "#FB8C00"
				},
				variables: {
					"border-color": "#000000",
					"border-opacity": .12,
					"shadow-color": "#000000",
					"high-emphasis-opacity": .87,
					"medium-emphasis-opacity": .6,
					"disabled-opacity": .38,
					"idle-opacity": .04,
					"hover-opacity": .04,
					"focus-opacity": .12,
					"selected-opacity": .08,
					"activated-opacity": .12,
					"pressed-opacity": .12,
					"dragged-opacity": .08,
					"theme-kbd": "#EEEEEE",
					"theme-on-kbd": "#000000",
					"theme-code": "#F5F5F5",
					"theme-on-code": "#000000",
					"theme-on-dark": "#FFF",
					"theme-on-light": "#000",
					"elevation-overlay-color": "black",
					"elevation-overlay-opacity-step": "2%",
					"highlight-opacity": "8%"
				}
			},
			dark: {
				dark: true,
				colors: {
					background: "#121212",
					surface: "#212121",
					"surface-bright": "#ccbfd6",
					"surface-light": "#424242",
					"surface-variant": "#c8c8c8",
					"on-surface-variant": "#000000",
					primary: "#2196F3",
					"primary-darken-1": "#277CC1",
					secondary: "#54B6B2",
					"secondary-darken-1": "#48A9A6",
					error: "#CF6679",
					info: "#2196F3",
					success: "#4CAF50",
					warning: "#FB8C00"
				},
				variables: {
					"border-color": "#FFFFFF",
					"border-opacity": .12,
					"shadow-color": "#000000",
					"high-emphasis-opacity": 1,
					"medium-emphasis-opacity": .7,
					"disabled-opacity": .5,
					"idle-opacity": .1,
					"hover-opacity": .04,
					"focus-opacity": .12,
					"selected-opacity": .08,
					"activated-opacity": .12,
					"pressed-opacity": .16,
					"dragged-opacity": .08,
					"theme-kbd": "#424242",
					"theme-on-kbd": "#FFFFFF",
					"theme-code": "#343434",
					"theme-on-code": "#CCCCCC",
					"theme-on-dark": "#FFF",
					"theme-on-light": "#000",
					"elevation-overlay-color": "white",
					"elevation-overlay-opacity-step": "2%",
					"highlight-opacity": "20%"
				}
			}
		},
		stylesheetId: "vuetify-theme-stylesheet",
		scoped: false,
		utilities: true,
		transition: false
	};
}
function parseThemeOptions(options = genDefaults$3()) {
	const defaults = genDefaults$3();
	if (!options) return {
		...defaults,
		isDisabled: true
	};
	return mergeDeep(defaults, options);
}
function createCssClass(lines, selector, content, scope) {
	lines.push(`${getScopedSelector(selector, scope)} {\n`, ...content.map((line) => `  ${line};\n`), "}\n");
}
function genCssVariables(theme, prefix) {
	const lightOverlay = theme.dark ? 2 : 1;
	const darkOverlay = theme.dark ? 1 : 2;
	const variables = [];
	for (const [key, value] of Object.entries(theme.colors)) {
		const rgb = parseColor(value);
		variables.push(`--${prefix}theme-${key}: ${rgb.r},${rgb.g},${rgb.b}` + (/* @__PURE__ */ isNumber(rgb.a) ? `,${rgb.a}` : ""));
		if (!key.startsWith("on-")) variables.push(`--${prefix}theme-${key}-overlay-multiplier: ${getLuma(value) > .18 ? lightOverlay : darkOverlay}`);
	}
	for (const [key, value] of Object.entries(theme.variables)) {
		const color = /* @__PURE__ */ isString(value) && value.startsWith("#") ? parseColor(value) : void 0;
		const rgb = color ? `${color.r}, ${color.g}, ${color.b}` + (/* @__PURE__ */ isNumber(color.a) ? `, ${color.a}` : "") : void 0;
		variables.push(`--${prefix}${key}: ${rgb ?? value}`);
	}
	return variables;
}
function genVariation(name, color, variations) {
	const object = {};
	if (variations) for (const variation of ["lighten", "darken"]) {
		const fn = variation === "lighten" ? lighten : darken;
		for (const amount of /* @__PURE__ */ range(variations[variation], 1)) object[`${name}-${variation}-${amount}`] = RGBtoHex(fn(parseColor(color), amount));
	}
	return object;
}
function genVariations(colors, variations) {
	if (!variations) return {};
	let variationColors = {};
	for (const name of variations.colors) {
		const color = colors[name];
		if (!color) continue;
		variationColors = {
			...variationColors,
			...genVariation(name, color, variations)
		};
	}
	return variationColors;
}
function genOnColors(colors, variables) {
	const onColors = {};
	for (const color of Object.keys(colors)) {
		if (color.startsWith("on-") || colors[`on-${color}`]) continue;
		const onColor = `on-${color}`;
		onColors[onColor] = hasLightForeground(parseColor(colors[color])) ? variables["theme-on-dark"] : variables["theme-on-light"];
	}
	return onColors;
}
function getScopedSelector(selector, scope) {
	if (!scope) return selector;
	const scopeSelector = `:where(${scope})`;
	return selector === ":root" ? scopeSelector : `${scopeSelector} ${selector}`;
}
function upsertStyles(id, cspNonce, styles) {
	const styleEl = getOrCreateStyleElement(id, cspNonce);
	if (!styleEl) return;
	styleEl.innerHTML = styles;
}
function getOrCreateStyleElement(id, cspNonce) {
	if (!IN_BROWSER) return null;
	let style = document.getElementById(id);
	if (!style) {
		style = document.createElement("style");
		style.id = id;
		style.type = "text/css";
		if (cspNonce) style.setAttribute("nonce", cspNonce);
		document.head.appendChild(style);
	}
	return style;
}
function createTheme(options) {
	const parsedOptions = parseThemeOptions(options);
	const _name = shallowRef(parsedOptions.defaultTheme);
	const themes = ref$1(parsedOptions.themes);
	const systemName = shallowRef("light");
	const name = computed({
		get() {
			return _name.value === "system" ? systemName.value : _name.value;
		},
		set(val) {
			_name.value = val;
		}
	});
	const computedThemes = computed(() => {
		const acc = {};
		for (const [name, original] of Object.entries(themes.value)) {
			const merged = mergeDeep(original.dark || name === "dark" ? themes.value.dark : themes.value.light, original);
			const colors = {
				...merged.colors,
				...genVariations(merged.colors, parsedOptions.variations)
			};
			acc[name] = {
				...merged,
				colors: {
					...colors,
					...genOnColors(colors, merged.variables)
				}
			};
		}
		return acc;
	});
	const current = toRef(() => computedThemes.value[name.value]);
	const isSystem = toRef(() => _name.value === "system");
	const styles = computed(() => {
		const lines = [];
		const scoped = parsedOptions.scoped ? parsedOptions.prefix : "";
		lines.push("@layer theme-base {\n");
		createCssClass(lines, ":root", [`color-scheme: ${current.value?.dark ? "dark" : "light"}`], parsedOptions.scope);
		createCssClass(lines, ":root", genCssVariables(current.value, parsedOptions.prefix), parsedOptions.scope);
		for (const [themeName, theme] of Object.entries(computedThemes.value)) createCssClass(lines, `.${parsedOptions.prefix}theme--${themeName}`, [`color-scheme: ${theme.dark ? "dark" : "light"}`, ...genCssVariables(theme, parsedOptions.prefix)], parsedOptions.scope);
		lines.push("}\n");
		if (parsedOptions.utilities) {
			const bgLines = [];
			const fgLines = [];
			const colors = new Set(Object.values(computedThemes.value).flatMap((theme) => Object.keys(theme.colors)));
			for (const key of colors) if (key.startsWith("on-")) createCssClass(fgLines, `.${key}`, [`color: rgb(var(--${parsedOptions.prefix}theme-${key}))`], parsedOptions.scope);
			else {
				createCssClass(bgLines, `.${scoped}bg-${key}`, [
					`--${parsedOptions.prefix}theme-overlay-multiplier: var(--${parsedOptions.prefix}theme-${key}-overlay-multiplier)`,
					`background-color: rgb(var(--${parsedOptions.prefix}theme-${key}))`,
					`color: rgb(var(--${parsedOptions.prefix}theme-on-${key}))`
				], parsedOptions.scope);
				createCssClass(fgLines, `.${scoped}text-${key}`, [`color: rgb(var(--${parsedOptions.prefix}theme-${key}))`], parsedOptions.scope);
				createCssClass(fgLines, `.${scoped}border-${key}`, [`--${parsedOptions.prefix}border-color: var(--${parsedOptions.prefix}theme-${key})`], parsedOptions.scope);
			}
			lines.push("@layer theme-background {\n", ...bgLines.map((v) => `  ${v}`), "}\n", "@layer theme-foreground {\n", ...fgLines.map((v) => `  ${v}`), "}\n");
		}
		return "@layer vuetify-utilities {\n" + lines.map((v) => `  ${v}`).join("") + "\n}";
	});
	const themeClasses = toRef(() => parsedOptions.isDisabled ? void 0 : `${parsedOptions.prefix}theme--${name.value}`);
	const themeNames = toRef(() => Object.keys(computedThemes.value));
	if (SUPPORTS_MATCH_MEDIA) {
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		function updateSystemName() {
			systemName.value = media.matches ? "dark" : "light";
		}
		updateSystemName();
		media.addEventListener("change", updateSystemName, { passive: true });
		if (getCurrentScope()) onScopeDispose(() => {
			media.removeEventListener("change", updateSystemName);
		});
	}
	function install(app) {
		if (parsedOptions.isDisabled) return;
		const head = app._context.provides.usehead;
		if (head) {
			function getHead() {
				return { style: [{
					textContent: styles.value,
					id: parsedOptions.stylesheetId,
					nonce: parsedOptions.cspNonce || false,
					tagPosition: "bodyOpen"
				}] };
			}
			if (head.push) {
				const entry = head.push(getHead);
				if (IN_BROWSER) watch(styles, () => {
					entry.patch(getHead);
				});
			} else if (IN_BROWSER) {
				head.addHeadObjs(toRef(getHead));
				watchEffect(() => head.updateDOM());
			} else head.addHeadObjs(getHead());
		} else {
			if (IN_BROWSER) watch(styles, updateStyles, { immediate: true });
			else updateStyles();
			function updateStyles() {
				upsertStyles(parsedOptions.stylesheetId, parsedOptions.cspNonce, styles.value);
			}
		}
	}
	let _transitionOrigin;
	function setTransitionOrigin(e) {
		if (!e) {
			_transitionOrigin = null;
			return;
		}
		let x;
		let y;
		if (/* @__PURE__ */ isElement(e)) {
			const box = new Box(e);
			x = box.left + box.width / 2;
			y = box.top + box.height / 2;
		} else {
			x = e.clientX;
			y = e.clientY;
		}
		const originX = Math.min(98.9, 100 * x / window.innerWidth);
		const originY = 100 * y / window.innerHeight;
		_transitionOrigin = `${originX.toFixed(2)}% ${originY.toFixed(2)}%`;
	}
	function resolveTransitionOptions(transition) {
		if (!(transition ?? parsedOptions.transition) && !_transitionOrigin) return false;
		const global = /* @__PURE__ */ isObject(parsedOptions.transition) ? parsedOptions.transition : {};
		const local = /* @__PURE__ */ isObject(transition) ? transition : {};
		return {
			origin: local.origin ?? _transitionOrigin ?? global.origin,
			duration: local.duration ?? global.duration
		};
	}
	function withPageTransition(callback, options) {
		if (!IN_BROWSER || !document.startViewTransition || PREFERS_REDUCED_MOTION()) {
			callback();
			return Promise.resolve();
		}
		const origin = options.origin ?? "50% 0%";
		const duration = options.duration ?? "500ms";
		const style = document.createElement("style");
		style.textContent = `html:active-view-transition-type(vuetify-theme)::view-transition-old(root) { animation: none; }html:active-view-transition-type(vuetify-theme)::view-transition-new(root) { animation: v-circle-in ${duration} ease-in-out; }@keyframes v-circle-in {  from { clip-path: circle(0% at ${origin}); }  to { clip-path: circle(150% at ${origin}); }}`;
		document.head.appendChild(style);
		const transition = document.startViewTransition({
			update: () => callback(),
			types: ["vuetify-theme"]
		});
		transition.finished.then(() => {
			_transitionOrigin = null;
			style.remove();
		});
		return transition.updateCallbackDone;
	}
	function change(themeName, transition) {
		if (themeName !== "system" && !themeNames.value.includes(themeName)) {
			consoleWarn(`Theme "${themeName}" not found on the Vuetify theme instance`);
			return Promise.resolve();
		}
		const apply = () => {
			name.value = themeName;
		};
		const transitionOptions = resolveTransitionOptions(transition);
		if (transitionOptions) return withPageTransition(apply, transitionOptions);
		apply();
		return Promise.resolve();
	}
	function cycle(themeArray = themeNames.value, transition) {
		const currentIndex = themeArray.indexOf(name.value);
		return change(themeArray[currentIndex === -1 ? 0 : (currentIndex + 1) % themeArray.length], transition);
	}
	function toggle(themeArray = ["light", "dark"], transition) {
		return cycle(themeArray, transition);
	}
	const globalName = new Proxy(name, {
		get(target, prop) {
			return Reflect.get(target, prop);
		},
		set(target, prop, val) {
			if (prop === "value") deprecate(`theme.global.name.value = ${val}`, `theme.change('${val}')`);
			return Reflect.set(target, prop, val);
		}
	});
	return {
		install,
		change,
		cycle,
		toggle,
		setTransitionOrigin,
		isDisabled: parsedOptions.isDisabled,
		isSystem,
		name,
		themes,
		current,
		computedThemes,
		prefix: parsedOptions.prefix,
		themeClasses,
		styles,
		global: {
			name: globalName,
			current
		}
	};
}
function provideTheme(props) {
	getCurrentInstance$1("provideTheme");
	const theme = inject(ThemeSymbol, null);
	if (!theme) throw new Error("Could not find Vuetify theme injection");
	const name = toRef(() => props.theme ?? theme.name.value);
	const current = toRef(() => theme.computedThemes.value[name.value]);
	const themeClasses = toRef(() => theme.isDisabled ? void 0 : `${theme.prefix}theme--${name.value}`);
	const newTheme = {
		...theme,
		name,
		current,
		themeClasses
	};
	provide(ThemeSymbol, newTheme);
	return newTheme;
}
// packages/vue-ui/node_modules/vuetify/lib/composables/color.js
function useColor(colors) {
	return destructComputed(() => {
		const { class: colorClasses, style: colorStyles } = computeColor(colors);
		return {
			colorClasses,
			colorStyles
		};
	});
}
function useTextColor(color) {
	const { colorClasses: textColorClasses, colorStyles: textColorStyles } = useColor(() => ({ text: toValue(color) }));
	return {
		textColorClasses,
		textColorStyles
	};
}
function useBackgroundColor(color) {
	const { colorClasses: backgroundColorClasses, colorStyles: backgroundColorStyles } = useColor(() => ({ background: toValue(color) }));
	return {
		backgroundColorClasses,
		backgroundColorStyles
	};
}
function normalizeColors(colors) {
	return {
		text: /* @__PURE__ */ isString(colors.text) ? colors.text.replace(/^text-/, "") : colors.text,
		background: /* @__PURE__ */ isString(colors.background) ? colors.background.replace(/^bg-/, "") : colors.background
	};
}
function computeColor(colors) {
	const _colors = normalizeColors(toValue(colors));
	const classes = [];
	const styles = {};
	if (_colors.background) {
		if (isCssColor(_colors.background)) {
			styles.backgroundColor = _colors.background;
			if (!_colors.text && isParsableColor(_colors.background)) {
				const backgroundColor = parseColor(_colors.background);
				if (!/* @__PURE__ */ isNumber(backgroundColor.a) || backgroundColor.a === 1) classes.push(hasLightForeground(backgroundColor) ? "v-theme-on-dark" : "v-theme-on-light");
			}
		} else classes.push(`bg-${_colors.background}`);
	}
	if (_colors.text) {
		if (isCssColor(_colors.text)) {
			styles.color = _colors.text;
			styles.caretColor = _colors.text;
		} else classes.push(`text-${_colors.text}`);
	}
	return {
		class: classes,
		style: styles
	};
}
// packages/vue-ui/node_modules/vuetify/lib/composables/variant.js
var allowedVariants$1 = [
	"elevated",
	"flat",
	"tonal",
	"outlined",
	"text",
	"plain"
];
function genOverlays(isClickable, name) {
	return createElementVNode(Fragment, null, [isClickable && createElementVNode("span", {
		"key": "overlay",
		"class": normalizeClass(`${name}__overlay`)
	}, null), createElementVNode("span", {
		"key": "underlay",
		"class": normalizeClass(`${name}__underlay`)
	}, null)]);
}
var makeVariantProps = propsFactory({
	color: String,
	variant: {
		type: String,
		default: "elevated",
		validator: (v) => allowedVariants$1.includes(v)
	}
}, "variant");
function useVariant(props, name = getCurrentInstanceName()) {
	const variantClasses = toRef(() => {
		const { variant } = toValue(props);
		return `${name}--variant-${variant}`;
	});
	const { colorClasses, colorStyles } = useColor(() => {
		const { variant, color } = toValue(props);
		return { [["elevated", "flat"].includes(variant) ? "background" : "text"]: color };
	});
	return {
		colorClasses,
		colorStyles,
		variantClasses
	};
}
// packages/vue-ui/node_modules/vuetify/lib/components/VBtnGroup/VBtnGroup.js
var makeVBtnGroupProps = propsFactory({
	baseColor: String,
	connected: Boolean,
	divided: Boolean,
	direction: {
		type: String,
		default: "horizontal"
	},
	...makeBorderProps(),
	...makeComponentProps(),
	...makeDensityProps(),
	...makeElevationProps(),
	...makeRoundedProps(),
	...makeSizeProps({ size: void 0 }),
	...makeTagProps(),
	...makeThemeProps(),
	...makeVariantProps()
}, "VBtnGroup");
var VBtnGroup = genericComponent()({
	name: "VBtnGroup",
	props: makeVBtnGroupProps(),
	setup(props, { slots }) {
		const { themeClasses } = provideTheme(props);
		const { densityClasses } = useDensity(props);
		const { borderClasses } = useBorder(props);
		const { elevationClasses } = useElevation(props);
		const { roundedClasses, roundedStyles } = useRounded(props);
		provideDefaults({ VBtn: {
			height: toRef(() => props.direction === "horizontal" && props.size == null ? "auto" : null),
			baseColor: toRef(() => props.baseColor),
			color: toRef(() => props.color),
			density: toRef(() => props.density),
			flat: true,
			size: toRef(() => props.size),
			variant: toRef(() => props.variant)
		} });
		useRender(() => {
			return createVNode(props.tag, {
				"class": normalizeClass([
					"v-btn-group",
					`v-btn-group--${props.direction}`,
					{
						"v-btn-group--connected": props.connected,
						"v-btn-group--divided": props.divided,
						"v-btn-group--has-size": props.size != null
					},
					`v-btn-group--size-${props.size ?? "default"}`,
					themeClasses.value,
					borderClasses.value,
					densityClasses.value,
					elevationClasses.value,
					roundedClasses.value,
					props.class
				]),
				"style": normalizeStyle([roundedStyles.value, props.style])
			}, slots);
		});
	}
});
// packages/vue-ui/node_modules/vuetify/lib/composables/group.js
var makeGroupProps = propsFactory({
	modelValue: {
		type: null,
		default: void 0
	},
	multiple: Boolean,
	mandatory: [Boolean, String],
	max: Number,
	selectedClass: String,
	disabled: Boolean
}, "group");
var makeGroupItemProps = propsFactory({
	value: null,
	disabled: Boolean,
	selectedClass: String
}, "group-item");
function useGroupItem(props, injectKey, required = true) {
	const vm = getCurrentInstance$1("useGroupItem");
	if (!vm) throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
	const id = useId();
	provide(Symbol.for(`${injectKey.description}:id`), id);
	const group = inject(injectKey, null);
	if (!group) {
		if (!required) return group;
		throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
	}
	const value = toRef(() => props.value);
	const disabled = computed(() => !!(group.disabled.value || props.disabled));
	function register() {
		group?.register({
			id,
			value,
			disabled
		}, vm);
	}
	function unregister() {
		group?.unregister(id);
	}
	register();
	onBeforeUnmount(() => unregister());
	const isSelected = computed(() => {
		return group.isSelected(id);
	});
	const isFirst = computed(() => {
		return group.items.value[0].id === id;
	});
	const isLast = computed(() => {
		return group.items.value[group.items.value.length - 1].id === id;
	});
	const selectedClass = computed(() => isSelected.value && [group.selectedClass.value, props.selectedClass]);
	watch(isSelected, (value) => {
		vm.emit("group:selected", { value });
	}, { flush: "sync" });
	return {
		id,
		isSelected,
		isFirst,
		isLast,
		toggle: () => group.select(id, !isSelected.value),
		select: (value) => group.select(id, value),
		selectedClass,
		value,
		disabled,
		group,
		register,
		unregister
	};
}
function useGroup(props, injectKey) {
	let isUnmounted = false;
	const items = reactive([]);
	const selected = useProxiedModel(props, "modelValue", [], (v) => {
		if (/* @__PURE__ */ isUndefined(v)) return [];
		return getIds(items, /* @__PURE__ */ isNull(v) ? [null] : wrapInArray(v));
	}, (v) => {
		const arr = getValues(items, v);
		return props.multiple ? arr : arr[0];
	});
	const groupVm = getCurrentInstance$1("useGroup");
	function register(item, vm) {
		const unwrapped = item;
		const index = findChildrenWithProvide(Symbol.for(`${injectKey.description}:id`), groupVm?.vnode).indexOf(vm);
		if (/* @__PURE__ */ isUndefined(unref(unwrapped.value))) {
			unwrapped.value = index;
			unwrapped.useIndexAsValue = true;
		}
		if (index > -1) items.splice(index, 0, unwrapped);
		else items.push(unwrapped);
	}
	function unregister(id) {
		if (isUnmounted) return;
		forceMandatoryValue();
		const index = items.findIndex((item) => item.id === id);
		items.splice(index, 1);
	}
	function forceMandatoryValue() {
		const item = items.find((item) => !item.disabled);
		if (item && props.mandatory === "force" && !selected.value.length) selected.value = [item.id];
	}
	onMounted(() => {
		forceMandatoryValue();
	});
	onBeforeUnmount(() => {
		isUnmounted = true;
	});
	onUpdated(() => {
		for (let i = 0; i < items.length; i++) if (items[i].useIndexAsValue) items[i].value = i;
	});
	function select(id, value) {
		const item = items.find((item) => item.id === id);
		if (value && item?.disabled) return;
		if (props.multiple) {
			const internalValue = selected.value.slice();
			const index = internalValue.findIndex((v) => v === id);
			const isSelected = ~index;
			value = value ?? !isSelected;
			if (isSelected && props.mandatory && internalValue.length <= 1) return;
			if (!isSelected && /* @__PURE__ */ isNumber(props.max) && internalValue.length + 1 > props.max) return;
			if (index < 0 && value) internalValue.push(id);
			else if (index >= 0 && !value) internalValue.splice(index, 1);
			selected.value = internalValue;
		} else {
			const isSelected = selected.value.includes(id);
			if (props.mandatory && isSelected) return;
			if (!isSelected && !value) return;
			selected.value = value ?? !isSelected ? [id] : [];
		}
	}
	function step(offset) {
		if (props.multiple) consoleWarn("This method is not supported when using \"multiple\" prop");
		if (!selected.value.length) {
			const item = items.find((item) => !item.disabled);
			item && (selected.value = [item.id]);
		} else {
			const currentId = selected.value[0];
			const currentIndex = items.findIndex((i) => i.id === currentId);
			let newIndex = (currentIndex + offset) % items.length;
			let newItem = items[newIndex];
			while (newItem.disabled && newIndex !== currentIndex) {
				newIndex = (newIndex + offset) % items.length;
				newItem = items[newIndex];
			}
			if (newItem.disabled) return;
			selected.value = [items[newIndex].id];
		}
	}
	const state = {
		register,
		unregister,
		selected,
		select,
		disabled: toRef(() => props.disabled),
		prev: () => step(items.length - 1),
		next: () => step(1),
		isSelected: (id) => selected.value.includes(id),
		selectedClass: toRef(() => props.selectedClass),
		items: toRef(() => items),
		getItemIndex: (value) => getItemIndex(items, value)
	};
	provide(injectKey, state);
	return state;
}
function getItemIndex(items, value) {
	const ids = getIds(items, [value]);
	if (!ids.length) return -1;
	return items.findIndex((item) => item.id === ids[0]);
}
function getIds(items, modelValue) {
	const ids = [];
	modelValue.forEach((value) => {
		const item = items.find((item) => deepEqual(value, item.value));
		const itemByIndex = items[value];
		if (!/* @__PURE__ */ isUndefined(item?.value)) ids.push(item.id);
		else if (itemByIndex?.useIndexAsValue) ids.push(itemByIndex.id);
	});
	return ids;
}
function getValues(items, ids) {
	const values = [];
	ids.forEach((id) => {
		const itemIndex = items.findIndex((item) => item.id === id);
		if (~itemIndex) {
			const item = items[itemIndex];
			values.push(!/* @__PURE__ */ isUndefined(item.value) ? item.value : itemIndex);
		}
	});
	return values;
}
// packages/vue-ui/node_modules/vuetify/lib/components/VBtnToggle/VBtnToggle.js
var VBtnToggleSymbol = Symbol.for("vuetify:v-btn-toggle");
var makeVBtnToggleProps = propsFactory({
	...makeVBtnGroupProps(),
	...makeGroupProps()
}, "VBtnToggle");
genericComponent()({
	name: "VBtnToggle",
	props: makeVBtnToggleProps(),
	emits: { "update:modelValue": (value) => true },
	setup(props, { slots }) {
		const { isSelected, next, prev, select, selected } = useGroup(props, VBtnToggleSymbol);
		useRender(() => {
			const btnGroupProps = VBtnGroup.filterProps(props);
			return createVNode(VBtnGroup, mergeProps({ "class": [
				"v-btn-toggle",
				{ "v-btn-toggle--has-color": !!props.color },
				props.class
			] }, btnGroupProps, { "style": props.style }), { default: () => [slots.default?.({
				isSelected,
				next,
				prev,
				select,
				selected
			})] });
		});
		return {
			next,
			prev,
			select
		};
	}
});
// packages/vue-ui/node_modules/vuetify/lib/components/VDefaultsProvider/VDefaultsProvider.js
var makeVDefaultsProviderProps = propsFactory({
	defaults: Object,
	disabled: Boolean,
	reset: [Number, String],
	root: [Boolean, String],
	scoped: Boolean
}, "VDefaultsProvider");
var VDefaultsProvider = genericComponent(false)({
	name: "VDefaultsProvider",
	props: makeVDefaultsProviderProps(),
	setup(props, { slots }) {
		const { defaults, disabled, reset, root, scoped } = toRefs(props);
		provideDefaults(defaults, {
			reset,
			root,
			scoped,
			disabled
		});
		return () => slots.default?.();
	}
});
// packages/vue-ui/node_modules/vuetify/lib/composables/icons.js
var IconValue = [
	String,
	Function,
	Object,
	Array
];
var IconSymbol = Symbol.for("vuetify:icons");
var makeIconProps = propsFactory({
	icon: { type: IconValue },
	tag: {
		type: [
			String,
			Object,
			Function
		],
		required: true
	}
}, "icon");
var VComponentIcon = genericComponent()({
	name: "VComponentIcon",
	props: makeIconProps(),
	setup(props, { slots }) {
		return () => {
			const Icon = props.icon;
			return createVNode(props.tag, null, { default: () => [props.icon ? createVNode(Icon, null, null) : slots.default?.()] });
		};
	}
});
var VSvgIcon = defineComponent$1({
	name: "VSvgIcon",
	inheritAttrs: false,
	props: makeIconProps(),
	setup(props, { attrs }) {
		return () => {
			return createVNode(props.tag, mergeProps(attrs, { "style": null }), { default: () => [createElementVNode("svg", {
				"class": "v-icon__svg",
				"xmlns": "http://www.w3.org/2000/svg",
				"viewBox": "0 0 24 24",
				"role": "img",
				"aria-hidden": "true"
			}, [Array.isArray(props.icon) ? props.icon.map((path) => Array.isArray(path) ? createElementVNode("path", {
				"d": path[0],
				"fill-opacity": path[1]
			}, null) : createElementVNode("path", { "d": path }, null)) : createElementVNode("path", { "d": props.icon }, null)])] });
		};
	}
});
defineComponent$1({
	name: "VLigatureIcon",
	props: makeIconProps(),
	setup(props) {
		return () => {
			return createVNode(props.tag, null, { default: () => [props.icon] });
		};
	}
});
var VClassIcon = defineComponent$1({
	name: "VClassIcon",
	props: makeIconProps(),
	setup(props) {
		return () => {
			return createVNode(props.tag, { "class": normalizeClass(props.icon) }, null);
		};
	}
});
var useIcon = (props) => {
	const icons = inject(IconSymbol);
	if (!icons) throw new Error("Missing Vuetify Icons provide!");
	return { iconData: computed(() => {
		const iconAlias = toValue(props);
		if (!iconAlias) return { component: VComponentIcon };
		let icon = iconAlias;
		if (/* @__PURE__ */ isString(icon)) {
			icon = icon.trim();
			if (icon.startsWith("$")) icon = icons.aliases?.[icon.slice(1)];
		}
		if (!icon) consoleWarn(`Could not find aliased icon "${iconAlias}"`);
		if (Array.isArray(icon)) return {
			component: VSvgIcon,
			icon
		};
		else if (!/* @__PURE__ */ isString(icon)) return {
			component: VComponentIcon,
			icon
		};
		const iconSetName = Object.keys(icons.sets).find((setName) => /* @__PURE__ */ isString(icon) && icon.startsWith(`${setName}:`));
		const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
		return {
			component: icons.sets[iconSetName ?? icons.defaultSet].component,
			icon: iconName
		};
	}) };
};
// packages/vue-ui/node_modules/vuetify/lib/components/VIcon/VIcon.js
var makeVIconProps = propsFactory({
	color: String,
	disabled: Boolean,
	start: Boolean,
	end: Boolean,
	icon: IconValue,
	opacity: [String, Number],
	...makeComponentProps(),
	...makeSizeProps(),
	...makeTagProps({ tag: "i" }),
	...makeThemeProps()
}, "VIcon");
var VIcon = genericComponent()({
	name: "VIcon",
	props: makeVIconProps(),
	setup(props, { attrs, slots }) {
		const slotIcon = shallowRef();
		const { themeClasses } = provideTheme(props);
		const { iconData } = useIcon(() => slotIcon.value || props.icon);
		const { sizeClasses } = useSize(props);
		const { textColorClasses, textColorStyles } = useTextColor(() => props.color);
		useRender(() => {
			const slotValue = slots.default?.();
			if (slotValue) slotIcon.value = flattenFragments(slotValue).filter((node) => node.type === Text && node.children && /* @__PURE__ */ isString(node.children))[0]?.children;
			const hasClick = !!(attrs.onClick || attrs.onClickOnce);
			return createVNode(iconData.value.component, {
				"tag": props.tag,
				"icon": iconData.value.icon,
				"class": normalizeClass([
					"v-icon",
					"notranslate",
					themeClasses.value,
					sizeClasses.value,
					textColorClasses.value,
					{
						"v-icon--clickable": hasClick,
						"v-icon--disabled": props.disabled,
						"v-icon--start": props.start,
						"v-icon--end": props.end
					},
					props.class
				]),
				"style": normalizeStyle([
					{ "--v-icon-opacity": props.opacity },
					!sizeClasses.value ? {
						fontSize: convertToUnit(props.size),
						height: convertToUnit(props.size),
						width: convertToUnit(props.size)
					} : void 0,
					textColorStyles.value,
					props.style
				]),
				"role": hasClick ? "button" : void 0,
				"aria-hidden": !hasClick,
				"tabindex": hasClick ? props.disabled ? -1 : 0 : void 0
			}, { default: () => [slotValue] });
		});
		return {};
	}
});
// packages/vue-ui/node_modules/vuetify/lib/components/VProgressLinear/waves.js
function round(value) {
	return Math.round(value * 1e3) / 1e3;
}
function hasWave(value) {
	return value > 10 && value < 95;
}
function linearWavePath(start, end, center, amplitude, wavelength, phase = start) {
	const waveNumber = 2 * Math.PI / wavelength;
	const y = (x) => center + amplitude * Math.sin(waveNumber * (x - phase));
	const slope = (x) => amplitude * waveNumber * Math.cos(waveNumber * (x - phase));
	let path = `M ${round(start)} ${round(y(start))}`;
	for (let x = start; x < end; x += wavelength / 4) {
		const next = Math.min(x + wavelength / 4, end);
		const third = (next - x) / 3;
		path += ` C ${round(x + third)} ${round(y(x) + slope(x) * third)} ${round(next - third)} ${round(y(next) - slope(next) * third)} ${round(next)} ${round(y(next))}`;
	}
	return path;
}
function circularWavePath(center, radius, amplitude, waves) {
	const count = waves * 4;
	const step = 2 * Math.PI / count;
	function point(index) {
		const angle = index * step;
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const distance = radius + amplitude * Math.sin(waves * angle);
		const slope = amplitude * waves * Math.cos(waves * angle);
		return {
			x: center + distance * cos,
			y: center + distance * sin,
			dx: (slope * cos - distance * sin) * step / 3,
			dy: (slope * sin + distance * cos) * step / 3
		};
	}
	const start = point(0);
	return `M ${round(start.x)} ${round(start.y)}` + (/* @__PURE__ */ range(count + 4)).map((index) => {
		const from = point(index);
		const to = point(index + 1);
		return ` C ${round(from.x + from.dx)} ${round(from.y + from.dy)} ${round(to.x - to.dx)} ${round(to.y - to.dy)} ${round(to.x)} ${round(to.y)}`;
	}).join("");
}
// packages/vue-ui/node_modules/vuetify/lib/composables/reveal.js
var makeRevealProps = propsFactory({ reveal: {
	type: [Boolean, Object],
	default: false
} }, "reveal");
function useReveal(props) {
	const defaultDuration = 900;
	const duration = toRef(() => /* @__PURE__ */ isObject(props.reveal) ? Math.max(0, Number(props.reveal.duration ?? defaultDuration)) : defaultDuration);
	const state = shallowRef(props.reveal ? "initial" : "disabled");
	onMounted(async () => {
		if (props.reveal) {
			state.value = "initial";
			await new Promise((resolve) => requestAnimationFrame(resolve));
			state.value = "pending";
			await new Promise((resolve) => setTimeout(resolve, duration.value));
			state.value = "done";
		}
	});
	return {
		duration,
		state
	};
}
// packages/vue-ui/node_modules/vuetify/lib/components/VProgressCircular/VProgressCircular.js
var WAVE_AMPLITUDE$1 = 1.6;
var WAVELENGTH = 15;
var WAVE_GAP = 4;
var makeVProgressCircularProps = propsFactory({
	bgColor: String,
	color: String,
	indeterminate: [Boolean, String],
	rounded: Boolean,
	modelValue: {
		type: [Number, String],
		default: 0
	},
	rotate: {
		type: [Number, String],
		default: 0
	},
	shape: {
		type: String,
		default: "flat",
		validator: (v) => ["flat", "wavy"].includes(v)
	},
	variant: {
		type: String,
		default: void 0,
		validator: (v) => ["split"].includes(v)
	},
	transition: {
		type: [Boolean, Object],
		default: void 0
	},
	width: {
		type: [Number, String],
		default: 4
	},
	...makeComponentProps(),
	...makeRevealProps(),
	...makeSizeProps(),
	...makeTagProps({ tag: "div" }),
	...makeThemeProps()
}, "VProgressCircular");
var VProgressCircular = genericComponent()({
	name: "VProgressCircular",
	props: makeVProgressCircularProps(),
	setup(props, { slots }) {
		const MAGIC_RADIUS_CONSTANT = 20;
		const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
		const root = shallowRef();
		const { themeClasses } = provideTheme(props);
		const { sizeClasses, sizeStyles } = useSize(props);
		const { textColorClasses, textColorStyles } = useTextColor(() => props.color);
		const { textColorClasses: underlayColorClasses, textColorStyles: underlayColorStyles } = useTextColor(() => props.bgColor);
		const { width: containerWidth } = useElementSize(root);
		const { isIntersecting } = useElementIntersection(root);
		const { state: revealState, duration: revealDuration } = useReveal(props);
		const normalizedValue = toRef(() => revealState.value === "initial" ? 0 : clamp(parseFloat(props.modelValue), 0, 100));
		const width = toRef(() => Number(props.width));
		const transitionDuration = toRef(() => props.transition === false ? void 0 : convertToUnit(/* @__PURE__ */ isObject(props.transition) ? props.transition.duration : void 0, "ms"));
		const size = toRef(() => {
			return sizeStyles.value ? Number(props.size) : containerWidth.value ? containerWidth.value : Math.max(width.value, 32);
		});
		const diameter = toRef(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
		const strokeWidth = toRef(() => width.value / size.value * diameter.value);
		const strokeDashOffset = toRef(() => {
			const baseLength = (100 - normalizedValue.value) / 100 * CIRCUMFERENCE;
			return props.rounded && normalizedValue.value > 0 && normalizedValue.value < 100 ? convertToUnit(Math.min(CIRCUMFERENCE - .01, baseLength + strokeWidth.value)) : convertToUnit(baseLength);
		});
		const startAngle = computed(() => {
			const baseAngle = Number(props.rotate);
			return props.rounded ? baseAngle + strokeWidth.value / 2 / CIRCUMFERENCE * 360 : baseAngle;
		});
		const isWavy = toRef(() => props.shape === "wavy");
		const geometry = computed(() => {
			if (props.variant !== "split" && !isWavy.value) return void 0;
			const scale = diameter.value / size.value;
			const radius = MAGIC_RADIUS_CONSTANT;
			const amplitude = isWavy.value && (props.indeterminate || hasWave(normalizedValue.value)) ? WAVE_AMPLITUDE$1 * scale : 0;
			const waves = Math.max(3, Math.floor(CIRCUMFERENCE / (WAVELENGTH * scale)));
			const center = diameter.value / 2;
			const arc = `A ${radius} ${radius} 0 1 1`;
			const roundCaps = props.rounded || isWavy.value;
			return {
				waves,
				linecap: roundCaps ? "round" : "butt",
				gap: (WAVE_GAP * scale + (roundCaps ? strokeWidth.value : 0)) / CIRCUMFERENCE * 100,
				track: `M ${center + radius} ${center}` + ` ${arc} ${center - radius} ${center} ${arc} ${center + radius} ${center}`.repeat(2),
				wave: circularWavePath(center, radius - amplitude, amplitude, waves)
			};
		});
		useRender(() => createVNode(props.tag, {
			"ref": root,
			"class": normalizeClass([
				"v-progress-circular",
				{
					"v-progress-circular--indeterminate": !!props.indeterminate,
					"v-progress-circular--visible": isIntersecting.value,
					"v-progress-circular--variant-split": props.variant === "split",
					"v-progress-circular--shape-wavy": isWavy.value,
					"v-progress-circular--disable-shrink": props.indeterminate && (props.indeterminate === "disable-shrink" || PREFERS_REDUCED_MOTION()),
					"v-progress-circular--revealing": ["initial", "pending"].includes(revealState.value),
					"v-progress-circular--no-transition": props.transition === false
				},
				themeClasses.value,
				sizeClasses.value,
				textColorClasses.value,
				props.class
			]),
			"style": normalizeStyle([
				sizeStyles.value,
				textColorStyles.value,
				{
					"--v-progress-reveal-duration": `${revealDuration.value}ms`,
					"--v-progress-circular-transition-duration": transitionDuration.value
				},
				props.style
			]),
			"role": "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": "100",
			"aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value
		}, { default: () => [createElementVNode("svg", {
			"style": { transform: `rotate(calc(-90deg + ${startAngle.value}deg))` },
			"xmlns": "http://www.w3.org/2000/svg",
			"viewBox": `0 0 ${diameter.value} ${diameter.value}`
		}, [geometry.value ? createElementVNode("g", {
			"class": "v-progress-circular__split",
			"style": {
				"--v-progress-circular-value": normalizedValue.value,
				"--v-progress-circular-stroke": convertToUnit(strokeWidth.value),
				"--v-progress-circular-waves": geometry.value.waves,
				"--v-progress-circular-gap": geometry.value.gap
			}
		}, [createElementVNode("path", {
			"class": normalizeClass([
				"v-progress-circular__underlay",
				"v-progress-circular__track",
				underlayColorClasses.value
			]),
			"style": normalizeStyle(underlayColorStyles.value),
			"d": geometry.value.track,
			"pathLength": "200",
			"stroke-linecap": geometry.value.linecap
		}, null), createElementVNode("path", {
			"class": "v-progress-circular__wave",
			"style": { d: `path("${geometry.value.wave}")` },
			"d": geometry.value.wave,
			"pathLength": 100 + 100 / geometry.value.waves,
			"stroke-linecap": geometry.value.linecap
		}, null)]) : createElementVNode(Fragment, null, [createElementVNode("circle", {
			"class": normalizeClass(["v-progress-circular__underlay", underlayColorClasses.value]),
			"style": normalizeStyle(underlayColorStyles.value),
			"fill": "transparent",
			"cx": "50%",
			"cy": "50%",
			"r": MAGIC_RADIUS_CONSTANT,
			"stroke-width": strokeWidth.value,
			"stroke-dasharray": CIRCUMFERENCE,
			"stroke-dashoffset": 0
		}, null), createElementVNode("circle", {
			"class": "v-progress-circular__overlay",
			"fill": "transparent",
			"cx": "50%",
			"cy": "50%",
			"r": MAGIC_RADIUS_CONSTANT,
			"stroke-width": strokeWidth.value,
			"stroke-dasharray": CIRCUMFERENCE,
			"stroke-dashoffset": strokeDashOffset.value,
			"stroke-linecap": props.rounded ? "round" : void 0
		}, null)])]), slots.default && createElementVNode("div", { "class": "v-progress-circular__content" }, [slots.default({ value: normalizedValue.value })])] }));
		return {};
	}
});
// packages/vue-ui/node_modules/vuetify/lib/composables/dimensions.js
var makeDimensionProps = propsFactory({
	height: [Number, String],
	maxHeight: [Number, String],
	maxWidth: [Number, String],
	minHeight: [Number, String],
	minWidth: [Number, String],
	width: [Number, String]
}, "dimension");
function useDimension(props) {
	return { dimensionStyles: computed(() => {
		const styles = {};
		const height = convertToUnit(props.height);
		const maxHeight = convertToUnit(props.maxHeight);
		const maxWidth = convertToUnit(props.maxWidth);
		const minHeight = convertToUnit(props.minHeight);
		const minWidth = convertToUnit(props.minWidth);
		const width = convertToUnit(props.width);
		if (height) styles.height = height;
		if (maxHeight) styles.maxHeight = maxHeight;
		if (maxWidth) styles.maxWidth = maxWidth;
		if (minHeight) styles.minHeight = minHeight;
		if (minWidth) styles.minWidth = minWidth;
		if (width) styles.width = width;
		return styles;
	}) };
}
// packages/vue-ui/node_modules/vuetify/lib/locale/en.js
var en_default = {
	badge: "Badge",
	open: "Open",
	close: "Close",
	dismiss: "Dismiss",
	confirmEdit: {
		ok: "OK",
		cancel: "Cancel"
	},
	dataIterator: {
		noResultsText: "No matching records found",
		loadingText: "Loading items..."
	},
	dataTable: {
		itemsPerPageText: "Rows per page:",
		ariaLabel: {
			sortDescending: "Sorted descending.",
			sortAscending: "Sorted ascending.",
			sortNone: "Not sorted.",
			activateNone: "Activate to remove sorting.",
			activateDescending: "Activate to sort descending.",
			activateAscending: "Activate to sort ascending.",
			selectRow: "Select row",
			selectAll: "Select all",
			selectGroup: "Select group"
		},
		sortBy: "Sort by"
	},
	dataFooter: {
		itemsPerPageText: "Items per page:",
		itemsPerPageAll: "All",
		nextPage: "Next page",
		prevPage: "Previous page",
		firstPage: "First page",
		lastPage: "Last page",
		pageText: "{0}-{1} of {2}"
	},
	dateRangeInput: { divider: "to" },
	monthPicker: {
		title: "Select month",
		itemsSelected: "{0} selected",
		header: "Enter month",
		range: { title: "Enter months" },
		ariaLabel: {
			previousYear: "Previous year",
			nextYear: "Next year",
			selectYear: "Select year",
			currentMonth: "Current month, {0}"
		}
	},
	datePicker: {
		itemsSelected: "{0} selected",
		range: {
			title: "Select dates",
			header: "Enter dates"
		},
		title: "Select date",
		header: "Enter date",
		input: { placeholder: "Enter date" },
		ariaLabel: {
			previousMonth: "Previous month",
			nextMonth: "Next month",
			selectYear: "Select year",
			previousYear: "Previous year",
			nextYear: "Next year",
			selectMonth: "Select month",
			selectDate: "{0}",
			currentDate: "Today, {0}"
		}
	},
	noDataText: "No data available",
	carousel: {
		prev: "Previous visual",
		next: "Next visual",
		ariaLabel: { delimiter: "Carousel slide {0} of {1}" }
	},
	calendar: {
		moreEvents: "{0} more",
		today: "Today"
	},
	heatmap: {
		less: "Less",
		more: "More"
	},
	input: {
		clear: "Clear {0}",
		prependAction: "{0} prepended action",
		appendAction: "{0} appended action",
		otp: "Enter verification code"
	},
	fileInput: {
		counter: "{0} files",
		counterSize: "{0} files ({1} in total)"
	},
	fileUpload: {
		title: "Drag and drop files here",
		divider: "or",
		browse: "Browse Files"
	},
	timePicker: {
		am: "AM",
		pm: "PM",
		title: "Select Time",
		hour: "Hour",
		minute: "Minute",
		second: "Second",
		notAllowed: "Value is not allowed"
	},
	pagination: { ariaLabel: {
		root: "Pagination Navigation",
		next: "Next page",
		previous: "Previous page",
		page: "Go to page {0}",
		currentPage: "Page {0}, Current page",
		first: "First page",
		last: "Last page"
	} },
	stepper: {
		next: "Next",
		prev: "Previous"
	},
	rating: { ariaLabel: { item: "Rating {0} of {1}" } },
	rangeSlider: { ariaLabel: {
		start: "Minimum",
		end: "Maximum"
	} },
	splitBtn: { menu: "More options" },
	loading: "Loading...",
	infiniteScroll: {
		loadMore: "Load more",
		empty: "No more"
	},
	rules: {
		required: "This field is required",
		email: "Please enter a valid email",
		number: "This field can only contain numbers",
		integer: "This field can only contain integer values",
		capital: "This field can only contain uppercase letters",
		maxLength: "You must enter a maximum of {0} characters",
		minLength: "You must enter a minimum of {0} characters",
		strictLength: "The length of the entered field is invalid",
		exclude: "The {0} character is not allowed",
		notEmpty: "Please choose at least one value",
		pattern: "Invalid format"
	},
	command: { search: "Type a command or search..." },
	hotkey: {
		then: "then",
		ctrl: "Ctrl",
		command: "Command",
		space: "Space",
		shift: "Shift",
		alt: "Alt",
		enter: "Enter",
		escape: "Escape",
		upArrow: "Up Arrow",
		downArrow: "Down Arrow",
		leftArrow: "Left Arrow",
		rightArrow: "Right Arrow",
		backspace: "Backspace",
		option: "Option",
		plus: "plus",
		shortcut: "Keyboard shortcut: {0}",
		or: "or"
	},
	media: {
		play: "Play",
		pause: "Pause",
		seek: "Seek",
		volume: "Volume",
		mute: "Mute",
		unmute: "Unmute",
		enterFullscreen: "Full screen",
		exitFullscreen: "Exit full screen"
	},
	colorPicker: { ariaLabel: {
		eyedropper: "Select color with eyedropper",
		hueSlider: "Hue",
		alphaSlider: "Alpha",
		redInput: "Red value",
		greenInput: "Green value",
		blueInput: "Blue value",
		alphaInput: "Alpha value",
		hueInput: "Hue value",
		saturationInput: "Saturation value",
		lightnessInput: "Lightness value",
		hexInput: "HEX value",
		hexaInput: "HEX with alpha value",
		changeFormat: "Change color format"
	} }
};
// packages/vue-ui/node_modules/vuetify/lib/locale/adapters/vuetify.js
var LANG_PREFIX = "$vuetify.";
var replace = (str, params) => {
	return str.replace(/\{(\d+)\}/g, (match, index) => {
		return String(params[Number(index)]);
	});
};
function selectLocale(bundle, locale) {
	if (!bundle.has(locale)) bundle.register({ id: locale });
	if (bundle.selectedId.value !== locale) bundle.select(locale);
}
function createBundle(locale, fallbackLocale, catalogs) {
	const bundle = createLocale$1({
		fallback: fallbackLocale,
		messages: catalogs
	});
	selectLocale(bundle, locale);
	return bundle;
}
var createTranslateFunction = (current, fallback, messages) => {
	const bundle = shallowRef(createBundle(current.value, fallback.value, messages.value));
	watch(current, (value) => selectLocale(bundle.value, value), { flush: "sync" });
	watch([fallback, messages], () => {
		bundle.value = createBundle(current.value, fallback.value, messages.value);
	}, {
		deep: true,
		flush: "sync"
	});
	return (key, ...params) => {
		if (!key.startsWith(LANG_PREFIX)) return replace(key, params);
		const found = bundle.value.ti(key.slice(9), ...params);
		if (!/* @__PURE__ */ isString(found)) {
			consoleError(`Translation key "${key}" not found in fallback`);
			return key;
		}
		return found;
	};
};
function createNumberFunction(current, fallback) {
	return (value, options) => {
		return new Intl.NumberFormat([current.value, fallback.value], options).format(value);
	};
}
function inferDecimalSeparator(current, fallback) {
	return createNumberFunction(current, fallback)(.1).includes(",") ? "," : ".";
}
function inferNumericGroupSeparator(current, fallback) {
	return new Intl.NumberFormat([current.value, fallback.value], { useGrouping: true }).formatToParts(1e4).find((p) => p.type === "group")?.value ?? "\xA0";
}
function useProvided(props, prop, provided) {
	const internal = useProxiedModel(props, prop, props[prop] ?? provided.value);
	internal.value = props[prop] ?? provided.value;
	watch(provided, (v) => {
		if (props[prop] == null) internal.value = provided.value;
	});
	return internal;
}
function createProvideFunction(state) {
	return (props) => {
		const current = useProvided(props, "locale", state.current);
		const fallback = useProvided(props, "fallback", state.fallback);
		const messages = useProvided(props, "messages", state.messages);
		return {
			name: "vuetify",
			current,
			fallback,
			messages,
			decimalSeparator: toRef(() => inferDecimalSeparator(current, fallback)),
			numericGroupSeparator: toRef(() => inferNumericGroupSeparator(current, fallback)),
			t: createTranslateFunction(current, fallback, messages),
			n: createNumberFunction(current, fallback),
			provide: createProvideFunction({
				current,
				fallback,
				messages
			})
		};
	};
}
function createVuetifyAdapter(options) {
	const current = shallowRef(options?.locale ?? "en");
	const fallback = shallowRef(options?.fallback ?? "en");
	const messages = ref$1({
		en: en_default,
		...options?.messages
	});
	return {
		name: "vuetify",
		current,
		fallback,
		messages,
		decimalSeparator: toRef(() => options?.decimalSeparator ?? inferDecimalSeparator(current, fallback)),
		numericGroupSeparator: toRef(() => options?.numericGroupSeparator ?? inferNumericGroupSeparator(current, fallback)),
		t: createTranslateFunction(current, fallback, messages),
		n: createNumberFunction(current, fallback),
		provide: createProvideFunction({
			current,
			fallback,
			messages
		})
	};
}
// packages/vue-ui/node_modules/vuetify/lib/composables/locale.js
var LocaleSymbol = Symbol.for("vuetify:locale");
function createLocale(options) {
	const i18n = options?.adapter?.name ? options.adapter : createVuetifyAdapter(options);
	const rtl = createRtl(i18n, options);
	return {
		...i18n,
		...rtl
	};
}
function useLocale() {
	const locale = inject(LocaleSymbol);
	if (!locale) throw new Error("[Vuetify] Could not find injected locale instance");
	return locale;
}
function genDefaults$2() {
	return {
		af: false,
		ar: true,
		bg: false,
		ca: false,
		ckb: true,
		cs: false,
		de: false,
		el: false,
		en: false,
		es: false,
		et: false,
		fa: true,
		fi: false,
		fr: false,
		hr: false,
		hu: false,
		he: true,
		id: false,
		it: false,
		ja: false,
		km: false,
		ko: false,
		lv: false,
		lt: false,
		nl: false,
		no: false,
		pl: false,
		pt: false,
		ro: false,
		ru: false,
		sk: false,
		sl: false,
		srCyrl: false,
		srLatn: false,
		sv: false,
		th: false,
		tr: false,
		az: false,
		uk: false,
		vi: false,
		zhHans: false,
		zhHant: false
	};
}
function createRtl(i18n, options) {
	const rtl = ref$1(options?.rtl ?? genDefaults$2());
	const direction = createRtl$1();
	watch(() => rtl.value[i18n.current.value] ?? false, (value) => {
		direction.isRtl.value = value;
	}, {
		flush: "sync",
		immediate: true
	});
	return {
		isRtl: readonly(direction.isRtl),
		rtl,
		rtlClasses: toRef(() => `v-locale--is-${direction.isRtl.value ? "rtl" : "ltr"}`)
	};
}
function useRtl() {
	const locale = inject(LocaleSymbol);
	if (!locale) throw new Error("[Vuetify] Could not find injected rtl instance");
	return {
		isRtl: locale.isRtl,
		rtlClasses: locale.rtlClasses
	};
}
// packages/vue-ui/node_modules/vuetify/lib/composables/location.js
var oppositeMap = {
	center: "center",
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
};
var makeLocationProps = propsFactory({ location: String }, "location");
function useLocation(props, opposite = false, offset) {
	const { isRtl } = useRtl();
	return { locationStyles: computed(() => {
		if (!props.location) return {};
		const { side, align } = parseAnchor(props.location.split(" ").length > 1 ? props.location : `${props.location} center`, isRtl.value);
		function getOffset(side) {
			return offset ? offset(side) : 0;
		}
		const styles = {};
		if (side !== "center") {
			if (opposite) styles[oppositeMap[side]] = `calc(100% - ${getOffset(side)}px)`;
			else styles[side] = 0;
		}
		if (align !== "center") {
			if (opposite) styles[oppositeMap[align]] = `calc(100% - ${getOffset(align)}px)`;
			else styles[align] = 0;
		} else {
			if (side === "center") styles.top = styles.left = "50%";
			else styles[{
				top: "left",
				bottom: "left",
				left: "top",
				right: "top"
			}[side]] = "50%";
			styles.transform = {
				top: "translateX(-50%)",
				bottom: "translateX(-50%)",
				left: "translateY(-50%)",
				right: "translateY(-50%)",
				center: "translate(-50%, -50%)"
			}[side];
		}
		return styles;
	}) };
}
// packages/vue-ui/node_modules/vuetify/lib/components/VProgressLinear/chunks.js
var makeChunksProps = propsFactory({
	chunkCount: {
		type: [Number, String],
		default: null
	},
	chunkWidth: {
		type: [Number, String],
		default: null
	},
	chunkGap: {
		type: [Number, String],
		default: 4
	},
	variant: {
		type: String,
		default: void 0,
		validator: (v) => ["split"].includes(v)
	}
}, "chunks");
function useChunks(props, containerWidth, value, bufferValue, reversed) {
	const isSplit = toRef(() => props.variant === "split");
	const chunkCount = toRef(() => isSplit.value ? 2 : Number(props.chunkCount) || 0);
	const hasChunks = toRef(() => !isSplit.value && (!!chunkCount.value || !!props.chunkWidth));
	const chunkWidth = computed(() => {
		const containerSize = toValue(containerWidth);
		if (!containerSize) return 0;
		if (chunkCount.value) return (containerSize - Number(props.chunkGap) * (chunkCount.value - 1)) / chunkCount.value;
		return Number(props.chunkWidth);
	});
	const chunkGap = toRef(() => Number(props.chunkGap));
	const chunksMaskStyles = computed(() => {
		if (!hasChunks.value) return {};
		const chunkGapPx = convertToUnit(chunkGap.value);
		const chunkWidthPx = convertToUnit(chunkWidth.value);
		return {
			maskRepeat: "repeat-x",
			maskImage: `linear-gradient(90deg, #000, #000 ${chunkWidthPx}, transparent ${chunkWidthPx}, transparent)`,
			maskSize: `calc(${chunkWidthPx} + ${chunkGapPx}) 100%`
		};
	});
	const splitStyles = computed(() => {
		if (!isSplit.value) return void 0;
		const halfGap = convertToUnit(chunkGap.value / 2);
		const position = toValue(reversed) ? "right" : "left";
		const val = toValue(value);
		if (val >= 100) return void 0;
		const buffer = toValue(bufferValue);
		const hasBar = val > 0;
		const hasBuffer = buffer > val && buffer < 100;
		if (!hasBar && !hasBuffer) return void 0;
		const split = convertToUnit(val, "%");
		const bufferSplit = convertToUnit(buffer, "%");
		const edge = hasBuffer ? bufferSplit : split;
		return {
			bar: hasBar ? { width: `calc(${split} - ${halfGap})` } : void 0,
			buffer: hasBuffer ? {
				[position]: hasBar ? `calc(${split} + ${halfGap})` : 0,
				width: hasBar ? `calc(${bufferSplit} - ${split} - ${convertToUnit(chunkGap.value)})` : `calc(${bufferSplit} - ${halfGap})`
			} : void 0,
			background: {
				[position]: `calc(${edge} + ${halfGap})`,
				width: `calc(100% - ${edge} - ${halfGap})`
			}
		};
	});
	function snapValueToChunk(val) {
		if (isSplit.value) return val;
		const containerSize = toValue(containerWidth);
		if (!containerSize) return val;
		const gapRelativeSize = 100 * chunkGap.value / containerSize;
		const chunkRelativeSize = 100 * (chunkWidth.value + chunkGap.value) / containerSize;
		return clamp(Math.floor((val + gapRelativeSize) / chunkRelativeSize + 1e-9) * chunkRelativeSize - gapRelativeSize / 2, 0, 100);
	}
	return {
		hasChunks: toRef(() => hasChunks.value || isSplit.value),
		isSplit,
		chunkCount,
		chunksMaskStyles,
		splitStyles,
		snapValueToChunk
	};
}
function useWavy(props, { containerWidth, value, isActive, duration }) {
	const isWavy = toRef(() => props.shape === "wavy");
	const geometry = computed(() => {
		const width = toValue(containerWidth);
		if (!isWavy.value || !width) return void 0;
		const stroke = parseFloat(props.height);
		const wavelength = props.indeterminate ? 20 : 40;
		const center = stroke / 2 + 3;
		const start = stroke / 2;
		const end = Math.max(width - start, start + 1);
		const range = end - start;
		return {
			width,
			stroke,
			wavelength,
			center,
			start,
			end,
			offset: wavelength / range * 100,
			gap: (parseFloat(props.chunkGap) + stroke) / range * 100,
			track: `M ${start} ${center} H ${end}`,
			wave: props.indeterminate ? linearWavePath(start - wavelength, end, center, 3, wavelength) : ""
		};
	});
	const svgEl = shallowRef();
	const waveEl = shallowRef();
	const isAnimating = toRef(() => isWavy.value && !props.indeterminate && toValue(isActive) && !!svgEl.value);
	let displayedValue = toValue(value);
	let velocity = 0;
	let amplitude = hasWave(displayedValue) ? 1 : 0;
	let phase = 0;
	let springDuration = 0;
	let lastFrameTime = 0;
	let frame = -1;
	function draw() {
		if (!geometry.value || !svgEl.value || !waveEl.value) return;
		const { start, end, center, wavelength } = geometry.value;
		const head = start + (end - start) * displayedValue / 100;
		const eased = amplitude * amplitude * (3 - 2 * amplitude);
		waveEl.value.setAttribute("d", linearWavePath(start, head, center, 3 * eased, wavelength, phase));
		svgEl.value.style.setProperty("--v-progress-linear-value", String(displayedValue));
	}
	function tick(now) {
		const elapsed = lastFrameTime ? Math.min(now - lastFrameTime, 100) / 1e3 : 0;
		lastFrameTime = now;
		const target = toValue(value);
		const omega = 4e3 / springDuration;
		if (!Number.isFinite(omega)) {
			displayedValue = target;
			velocity = 0;
		} else {
			const offset = displayedValue - target;
			const decay = Math.exp(-omega * elapsed);
			const coefficient = velocity + omega * offset;
			displayedValue = target + (offset + coefficient * elapsed) * decay;
			velocity = (velocity - omega * coefficient * elapsed) * decay;
			if (Math.abs(displayedValue - target) < .01 && Math.abs(velocity) < .01) {
				displayedValue = target;
				velocity = 0;
			}
		}
		const targetAmplitude = hasWave(displayedValue) ? 1 : 0;
		amplitude = targetAmplitude > amplitude ? Math.min(amplitude + elapsed * 2, 1) : Math.max(amplitude - elapsed * 2, 0);
		const reduceMotion = PREFERS_REDUCED_MOTION();
		const wavelength = geometry.value?.wavelength ?? 40;
		if (!reduceMotion) phase = (phase - elapsed * wavelength) % wavelength;
		draw();
		const settled = displayedValue === target && amplitude === targetAmplitude;
		frame = isAnimating.value && !(settled && (reduceMotion || !amplitude)) ? requestAnimationFrame(tick) : -1;
	}
	watch([isAnimating, () => toValue(value)], () => {
		if (!isAnimating.value) return;
		springDuration = duration();
		if (frame >= 0) return;
		lastFrameTime = 0;
		frame = requestAnimationFrame(tick);
	}, {
		immediate: true,
		flush: "post"
	});
	watch([svgEl, geometry], draw, { flush: "post" });
	onScopeDispose(() => cancelAnimationFrame(frame));
	return {
		geometry,
		svgEl,
		waveEl
	};
}
// packages/vue-ui/node_modules/vuetify/lib/components/VProgressLinear/VProgressLinear.js
var makeVProgressLinearProps = propsFactory({
	absolute: Boolean,
	active: {
		type: Boolean,
		default: true
	},
	bgColor: String,
	bgOpacity: [Number, String],
	bufferValue: {
		type: [Number, String],
		default: 0
	},
	bufferColor: String,
	bufferOpacity: [Number, String],
	clickable: Boolean,
	color: String,
	height: {
		type: [Number, String],
		default: 4
	},
	indeterminate: Boolean,
	max: {
		type: [Number, String],
		default: 100
	},
	modelValue: {
		type: [Number, String],
		default: 0
	},
	opacity: [Number, String],
	reverse: Boolean,
	shape: {
		type: String,
		default: "flat",
		validator: (v) => ["flat", "wavy"].includes(v)
	},
	stopIndicator: {
		type: Boolean,
		default: void 0
	},
	stream: Boolean,
	striped: Boolean,
	roundedBar: Boolean,
	transition: {
		type: [Boolean, Object],
		default: void 0
	},
	...makeChunksProps(),
	...makeComponentProps(),
	...makeLocationProps({ location: "top" }),
	...makeRevealProps(),
	...makeRoundedProps(),
	...makeTagProps(),
	...makeThemeProps()
}, "VProgressLinear");
var VProgressLinear = genericComponent()({
	name: "VProgressLinear",
	props: makeVProgressLinearProps(),
	emits: { "update:modelValue": (value) => true },
	setup(props, { slots }) {
		const root = shallowRef();
		const progress = useProxiedModel(props, "modelValue");
		const { isRtl, rtlClasses } = useRtl();
		const { themeClasses } = provideTheme(props);
		const { locationStyles } = useLocation(props);
		const { textColorClasses, textColorStyles } = useTextColor(() => props.color);
		const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.bgColor || props.color);
		const { backgroundColorClasses: bufferColorClasses, backgroundColorStyles: bufferColorStyles } = useBackgroundColor(() => props.bufferColor || props.bgColor || props.color);
		const { backgroundColorClasses: barColorClasses, backgroundColorStyles: barColorStyles } = useBackgroundColor(() => props.color);
		const { textColorClasses: trackColorClasses, textColorStyles: trackColorStyles } = useTextColor(() => props.bgColor);
		const { roundedClasses, roundedStyles } = useRounded(props);
		const { isIntersecting } = useElementIntersection(root);
		const { state: revealState, duration: revealDuration } = useReveal(props);
		const max = computed(() => parseFloat(props.max));
		const height = computed(() => convertToUnit(props.height));
		const normalizedBuffer = computed(() => clamp(parseFloat(props.bufferValue) / max.value * 100, 0, 100));
		const normalizedValue = computed(() => revealState.value === "initial" ? 0 : clamp(parseFloat(progress.value) / max.value * 100, 0, 100));
		const isReversed = computed(() => isRtl.value !== props.reverse);
		const transitionDuration = computed(() => props.transition === false ? void 0 : convertToUnit(/* @__PURE__ */ isObject(props.transition) ? props.transition.duration : void 0, "ms"));
		const bgOpacity = toRef(() => /* @__PURE__ */ isNullOrUndefined(props.bgOpacity) ? void 0 : parseFloat(props.bgOpacity));
		const isWavy = toRef(() => props.shape === "wavy");
		const hasStopIndicator = toRef(() => !props.indeterminate && (isWavy.value ? props.stopIndicator !== false : props.variant === "split" && props.stopIndicator === true));
		const transitionName = computed(() => props.indeterminate ? "fade-transition" : "slide-x-transition");
		const containerWidth = shallowRef(0);
		const { hasChunks, splitStyles, chunksMaskStyles, snapValueToChunk } = useChunks(props, containerWidth, normalizedValue, normalizedBuffer, isReversed);
		useToggleScope(() => hasChunks.value || isWavy.value, () => {
			useResizeObserver(root, (entries) => {
				containerWidth.value = entries[0].contentRect.width;
			});
		});
		const bufferWidth = computed(() => {
			return hasChunks.value ? snapValueToChunk(normalizedBuffer.value) : normalizedBuffer.value;
		});
		const barWidth = computed(() => {
			return hasChunks.value ? snapValueToChunk(normalizedValue.value) : normalizedValue.value;
		});
		const { geometry, svgEl, waveEl } = useWavy(props, {
			containerWidth,
			value: normalizedValue,
			isActive: () => props.active && isIntersecting.value,
			duration: () => {
				if (revealState.value === "pending") return revealDuration.value;
				const duration = getComputedStyle(root.value).getPropertyValue("--v-progress-linear-transition-duration").trim();
				return parseFloat(duration) * (duration.endsWith("ms") ? 1 : 1e3);
			}
		});
		function handleClick(e) {
			if (!root.value) return;
			const { left, right, width } = root.value.getBoundingClientRect();
			const value = isReversed.value ? width - e.clientX + (right - width) : e.clientX - left;
			progress.value = Math.round(value / width * max.value);
		}
		function renderBackgroundBar() {
			return createElementVNode("div", {
				"class": normalizeClass(["v-progress-linear__background", backgroundColorClasses.value]),
				"style": normalizeStyle([
					backgroundColorStyles.value,
					{
						opacity: bgOpacity.value,
						width: props.stream ? 0 : void 0
					},
					props.indeterminate ? {} : splitStyles.value?.background
				])
			}, null);
		}
		function renderWavy() {
			if (!geometry.value) return null;
			const { width, stroke, wavelength, center, end, gap, track, wave, offset } = geometry.value;
			function renderTrack() {
				return createElementVNode("path", {
					"class": normalizeClass(["v-progress-linear__track", trackColorClasses.value]),
					"style": normalizeStyle([trackColorStyles.value, { opacity: bgOpacity.value }]),
					"d": track,
					"pathLength": "100"
				}, null);
			}
			function renderWave(bar) {
				return createElementVNode("path", {
					"class": normalizeClass(["v-progress-linear__wave", bar]),
					"d": wave,
					"pathLength": 100 + offset
				}, null);
			}
			return createElementVNode("svg", {
				"ref": svgEl,
				"class": normalizeClass([
					"v-progress-linear__wavy",
					{ "v-progress-linear__wavy--indeterminate": props.indeterminate },
					textColorClasses.value
				]),
				"style": normalizeStyle([textColorStyles.value, {
					"--v-progress-linear-stroke": convertToUnit(stroke),
					"--v-progress-linear-wavelength": convertToUnit(wavelength),
					"--v-progress-linear-wave-offset": offset,
					"--v-progress-linear-wave-gap": gap
				}]),
				"viewBox": `0 0 ${width} ${center * 2}`
			}, [props.indeterminate ? createElementVNode(Fragment, null, [
				renderTrack(),
				renderTrack(),
				renderTrack(),
				renderWave("long"),
				renderWave("short")
			]) : createElementVNode(Fragment, null, [
				renderTrack(),
				hasStopIndicator.value && createElementVNode("circle", {
					"class": "v-progress-linear__stop",
					"cx": end,
					"cy": center
				}, null),
				createElementVNode("path", {
					"ref": waveEl,
					"class": "v-progress-linear__wave"
				}, null)
			])]);
		}
		useRender(() => createVNode(props.tag, {
			"ref": root,
			"class": normalizeClass([
				"v-progress-linear",
				{
					"v-progress-linear--absolute": props.absolute,
					"v-progress-linear--active": props.active && isIntersecting.value,
					"v-progress-linear--reverse": isReversed.value,
					"v-progress-linear--rounded": props.rounded,
					"v-progress-linear--rounded-bar": props.roundedBar,
					"v-progress-linear--striped": props.striped,
					"v-progress-linear--clickable": props.clickable,
					"v-progress-linear--no-transition": props.transition === false,
					"v-progress-linear--revealing": ["initial", "pending"].includes(revealState.value),
					"v-progress-linear--variant-split": props.variant === "split",
					"v-progress-linear--shape-wavy": isWavy.value
				},
				roundedClasses.value,
				themeClasses.value,
				rtlClasses.value,
				props.class
			]),
			"style": normalizeStyle([
				{
					bottom: props.location === "bottom" ? 0 : void 0,
					top: props.location === "top" ? 0 : void 0,
					height: !props.active ? 0 : isWavy.value ? convertToUnit(parseFloat(props.height) + 6) : height.value,
					"--v-progress-linear-height": height.value,
					"--v-progress-linear-transition-duration": transitionDuration.value,
					"--v-progress-reveal-duration": `${revealDuration.value}ms`,
					"--v-progress-chunk-gap": convertToUnit(props.chunkGap),
					...props.absolute ? locationStyles.value : {}
				},
				isWavy.value ? void 0 : chunksMaskStyles.value,
				roundedStyles.value,
				props.style
			]),
			"role": "progressbar",
			"aria-hidden": props.active ? "false" : "true",
			"aria-valuemin": "0",
			"aria-valuemax": props.max,
			"aria-valuenow": props.indeterminate ? void 0 : Math.min(parseFloat(progress.value), max.value),
			"onClick": props.clickable && handleClick
		}, { default: () => [isWavy.value ? renderWavy() : createElementVNode(Fragment, null, [
			props.stream && createElementVNode("div", {
				"key": "stream",
				"class": normalizeClass(["v-progress-linear__stream", textColorClasses.value]),
				"style": {
					...textColorStyles.value,
					[isReversed.value ? "left" : "right"]: `calc(${height.value} * -1)`,
					borderTop: `calc(${height.value} / 2) dotted`,
					opacity: props.bufferOpacity != null ? parseFloat(props.bufferOpacity) : void 0,
					top: `calc(50% - ${height.value} / 4)`,
					width: convertToUnit(100 - normalizedBuffer.value, "%"),
					"--v-progress-linear-stream-to": `calc(${height.value} * ${isReversed.value ? 1 : -1})`
				}
			}, null),
			(props.variant !== "split" || !props.indeterminate) && renderBackgroundBar(),
			createElementVNode("div", {
				"class": normalizeClass(["v-progress-linear__buffer", bufferColorClasses.value]),
				"style": normalizeStyle([
					bufferColorStyles.value,
					{
						opacity: props.bufferOpacity != null ? parseFloat(props.bufferOpacity) : void 0,
						width: convertToUnit(bufferWidth.value, "%")
					},
					splitStyles.value?.buffer
				])
			}, null),
			hasStopIndicator.value && createElementVNode("div", {
				"class": normalizeClass(["v-progress-linear__stop", barColorClasses.value]),
				"style": normalizeStyle(barColorStyles.value)
			}, null),
			createVNode(Transition, { "name": transitionName.value }, { default: () => [!props.indeterminate ? createElementVNode("div", {
				"class": normalizeClass(["v-progress-linear__determinate", barColorClasses.value]),
				"style": normalizeStyle([
					barColorStyles.value,
					{ width: convertToUnit(barWidth.value, "%") },
					splitStyles.value?.bar
				])
			}, null) : createElementVNode("div", { "class": "v-progress-linear__indeterminate" }, [props.variant === "split" && createElementVNode(Fragment, null, [
				renderBackgroundBar(),
				renderBackgroundBar(),
				renderBackgroundBar()
			]), ["long", "short"].map((bar) => createElementVNode("div", {
				"key": bar,
				"class": normalizeClass([
					"v-progress-linear__indeterminate",
					bar,
					barColorClasses.value
				]),
				"style": normalizeStyle(barColorStyles.value)
			}, null))])] })
		]), slots.default && createElementVNode("div", { "class": "v-progress-linear__content" }, [slots.default({
			value: normalizedValue.value,
			buffer: normalizedBuffer.value
		})])] }));
		return {};
	}
});
// packages/vue-ui/node_modules/vuetify/lib/composables/loader.js
var makeLoaderProps = propsFactory({ loading: [Boolean, String] }, "loader");
function useLoader(props, name = getCurrentInstanceName()) {
	return { loaderClasses: toRef(() => ({ [`${name}--loading`]: props.loading })) };
}
function LoaderSlot(props, { slots }) {
	return createElementVNode("div", { "class": normalizeClass(`${props.name}__loader`) }, [slots.default?.({
		color: props.color,
		isActive: props.active
	}) || createVNode(VProgressLinear, {
		"absolute": props.absolute,
		"active": props.active,
		"color": props.color,
		"height": "2",
		"indeterminate": true
	}, null)]);
}
// packages/vue-ui/node_modules/vuetify/lib/composables/position.js
var positionValues = [
	"static",
	"relative",
	"fixed",
	"absolute",
	"sticky"
];
var makePositionProps = propsFactory({ position: {
	type: String,
	validator: /* istanbul ignore next */ (v) => positionValues.includes(v)
} }, "position");
function usePosition(props, name = getCurrentInstanceName()) {
	return { positionClasses: toRef(() => {
		return props.position ? `${name}--${props.position}` : void 0;
	}) };
}
// packages/vue-ui/node_modules/vuetify/lib/composables/router.js
function useRoute() {
	const vm = getCurrentInstance$1("useRoute");
	return computed(() => vm?.proxy?.$route);
}
function useRouter() {
	return getCurrentInstance$1("useRouter")?.proxy?.$router;
}
function useLink(props, attrs) {
	const RouterLink = resolveDynamicComponent("RouterLink");
	const isLink = toRef(() => !!(props.href || props.to));
	const isClickable = computed(() => {
		return isLink?.value || hasEvent(attrs, "click") || hasEvent(props, "click");
	});
	if (/* @__PURE__ */ isString(RouterLink) || !("useLink" in RouterLink)) {
		const href = toRef(() => props.href);
		return {
			isLink,
			isRouterLink: toRef(() => false),
			isClickable,
			href,
			linkProps: reactive({ href }),
			route: toRef(() => void 0),
			navigate: toRef(() => void 0)
		};
	}
	const routerLink = RouterLink.useLink({
		to: toRef(() => props.to || ""),
		replace: toRef(() => props.replace)
	});
	const link = computed(() => props.to ? routerLink : void 0);
	const route = useRoute();
	const isActive = computed(() => {
		if (!link.value) return false;
		if (route.value && route.value.matched.length === 0 && route.value.name == null) return link.value.isExactActive?.value ?? false;
		if (!props.exact) return link.value.isActive?.value ?? false;
		if (!route.value) return link.value.isExactActive?.value ?? false;
		return link.value.isExactActive?.value && deepEqual(link.value.route.value.query, route.value.query);
	});
	const href = computed(() => props.to ? link.value?.route.value.href : props.href);
	return {
		isLink,
		isRouterLink: toRef(() => !!props.to),
		isClickable,
		isActive,
		route: toRef(() => link.value?.route.value),
		navigate: toRef(() => link.value?.navigate),
		href,
		linkProps: reactive({
			href,
			"aria-current": toRef(() => isActive.value ? "page" : void 0),
			"aria-disabled": toRef(() => props.disabled && isLink.value ? "true" : void 0),
			tabindex: toRef(() => props.disabled && isLink.value ? "-1" : void 0)
		})
	};
}
var makeRouterProps = propsFactory({
	href: String,
	replace: Boolean,
	to: [String, Object],
	exact: Boolean
}, "router");
var inTransition = false;
function useBackButton(router, cb) {
	let popped = false;
	let disposed = false;
	let removeBefore;
	let removeAfter;
	if (IN_BROWSER && router?.beforeEach) {
		nextTick$1(() => {
			if (disposed) return;
			window.addEventListener("popstate", onPopstate);
			removeBefore = router.beforeEach(() => {
				if (!inTransition) {
					inTransition = true;
					return new Promise((resolve) => {
						setTimeout(() => resolve(popped ? cb() : void 0));
					});
				}
				return popped ? cb() : void 0;
			});
			removeAfter = router?.afterEach(() => {
				inTransition = false;
			});
		});
		onScopeDispose(() => {
			disposed = true;
			window.removeEventListener("popstate", onPopstate);
			removeBefore?.();
			removeAfter?.();
		});
	}
	function onPopstate(e) {
		if (e.state?.replaced) return;
		popped = true;
		setTimeout(() => popped = false);
	}
}
// packages/vue-ui/node_modules/vuetify/lib/composables/selectLink.js
function useSelectLink(link, select) {
	watch(() => link.isActive?.value, (isActive) => {
		if (link.isLink.value && /* @__PURE__ */ isBoolean(isActive) && select) nextTick$1(() => {
			select(isActive);
		});
	}, { immediate: true });
}
// packages/vue-ui/node_modules/vuetify/lib/directives/ripple/index.js
var stopSymbol = Symbol("rippleStop");
var DELAY_RIPPLE = 80;
function transform(el, value) {
	el.style.transform = value;
	el.style.webkitTransform = value;
}
function isTouchEvent(e) {
	return e.constructor.name === "TouchEvent";
}
function isKeyboardEvent(e) {
	return e.constructor.name === "KeyboardEvent";
}
var calculate = (e, el, value = {}) => {
	let localX = 0;
	let localY = 0;
	if (!isKeyboardEvent(e)) {
		const offset = new Box(el);
		const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
		const point = getTargetBox([target.clientX, target.clientY]);
		localX = point.x - offset.left;
		localY = point.y - offset.top;
	}
	let radius = 0;
	let scale = .3;
	if (el._ripple?.circle) {
		scale = .15;
		radius = el.clientWidth / 2;
		radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
	} else radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
	const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
	const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
	const x = value.center ? centerX : `${localX - radius}px`;
	const y = value.center ? centerY : `${localY - radius}px`;
	return {
		radius,
		scale,
		x,
		y,
		centerX,
		centerY
	};
};
var ripples = {
	show(e, el, value = {}) {
		if (!el?._ripple?.enabled) return;
		const container = document.createElement("span");
		const animation = document.createElement("span");
		container.appendChild(animation);
		container.className = "v-ripple__container";
		if (value.class) container.className += ` ${value.class}`;
		const { radius, scale, x, y, centerX, centerY } = calculate(e, el, value);
		const size = `${radius * 2}px`;
		animation.className = "v-ripple__animation";
		animation.style.width = size;
		animation.style.height = size;
		el.appendChild(container);
		const computed = window.getComputedStyle(el);
		if (computed && computed.position === "static") {
			el.style.position = "relative";
			el.dataset.previousPosition = "static";
		}
		animation.classList.add("v-ripple__animation--enter");
		animation.classList.add("v-ripple__animation--visible");
		transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
		animation.dataset.activated = String(performance.now());
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				animation.classList.remove("v-ripple__animation--enter");
				animation.classList.add("v-ripple__animation--in");
				transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
			});
		});
	},
	hide(el) {
		if (!el?._ripple?.enabled) return;
		const ripples = el.getElementsByClassName("v-ripple__animation");
		if (ripples.length === 0) return;
		const animation = Array.from(ripples).findLast((ripple) => !ripple.dataset.isHiding);
		if (!animation) return;
		else animation.dataset.isHiding = "true";
		const diff = performance.now() - Number(animation.dataset.activated);
		const delay = Math.max(250 - diff, 0);
		setTimeout(() => {
			animation.classList.remove("v-ripple__animation--in");
			animation.classList.add("v-ripple__animation--out");
			setTimeout(() => {
				if (el.getElementsByClassName("v-ripple__animation").length === 1 && el.dataset.previousPosition) {
					el.style.position = el.dataset.previousPosition;
					delete el.dataset.previousPosition;
				}
				if (animation.parentNode?.parentNode === el) el.removeChild(animation.parentNode);
			}, 300);
		}, delay);
	}
};
function isRippleEnabled(value) {
	return typeof value === "undefined" || !!value;
}
function rippleShow(e) {
	const value = {};
	const element = e.currentTarget;
	if (!element?._ripple || element._ripple.touched || e[stopSymbol]) return;
	e[stopSymbol] = true;
	if (isTouchEvent(e)) {
		element._ripple.touched = true;
		element._ripple.isTouch = true;
	} else if (element._ripple.isTouch) return;
	value.center = element._ripple.centered || isKeyboardEvent(e);
	if (element._ripple.class) value.class = element._ripple.class;
	if (isTouchEvent(e)) {
		if (element._ripple.showTimerCommit) return;
		element._ripple.showTimerCommit = () => {
			ripples.show(e, element, value);
		};
		element._ripple.showTimer = window.setTimeout(() => {
			if (element?._ripple?.showTimerCommit) {
				element._ripple.showTimerCommit();
				element._ripple.showTimerCommit = null;
			}
		}, DELAY_RIPPLE);
	} else ripples.show(e, element, value);
}
function rippleStop(e) {
	e[stopSymbol] = true;
}
function rippleHide(e) {
	const element = e.currentTarget;
	if (!element?._ripple) return;
	window.clearTimeout(element._ripple.showTimer);
	if (e.type === "touchend" && element._ripple.showTimerCommit) {
		element._ripple.showTimerCommit();
		element._ripple.showTimerCommit = null;
		element._ripple.showTimer = window.setTimeout(() => {
			rippleHide(e);
		});
		return;
	}
	window.setTimeout(() => {
		if (element._ripple) element._ripple.touched = false;
	});
	ripples.hide(element);
}
function rippleCancelShow(e) {
	const element = e.currentTarget;
	if (!element?._ripple) return;
	if (element._ripple.showTimerCommit) element._ripple.showTimerCommit = null;
	window.clearTimeout(element._ripple.showTimer);
}
var keyboardRipple = false;
function keyboardRippleShow(e, keys) {
	if (!keyboardRipple && keys.includes(e.key)) {
		keyboardRipple = true;
		rippleShow(e);
	}
}
function keyboardRippleHide(e) {
	keyboardRipple = false;
	rippleHide(e);
}
function focusRippleHide(e) {
	if (keyboardRipple) {
		keyboardRipple = false;
		rippleHide(e);
	}
}
function updateRipple(el, binding, wasEnabled) {
	const { value, modifiers } = binding;
	const enabled = isRippleEnabled(value);
	if (!enabled) ripples.hide(el);
	el._ripple = el._ripple ?? {};
	el._ripple.enabled = enabled;
	el._ripple.centered = modifiers.center;
	el._ripple.circle = modifiers.circle;
	const bindingValue = /* @__PURE__ */ isObject(value) ? value : {};
	if (bindingValue.class) el._ripple.class = bindingValue.class;
	const allowedKeys = bindingValue.keys ?? ["Enter", "Space"];
	el._ripple.keyDownHandler = (e) => keyboardRippleShow(e, allowedKeys);
	if (enabled && !wasEnabled) {
		if (modifiers.stop) {
			el.addEventListener("touchstart", rippleStop, { passive: true });
			el.addEventListener("mousedown", rippleStop);
			return;
		}
		el.addEventListener("touchstart", rippleShow, { passive: true });
		el.addEventListener("touchend", rippleHide, { passive: true });
		el.addEventListener("touchmove", rippleCancelShow, { passive: true });
		el.addEventListener("touchcancel", rippleHide);
		el.addEventListener("mousedown", rippleShow);
		el.addEventListener("mouseup", rippleHide);
		el.addEventListener("mouseleave", rippleHide);
		el.addEventListener("keydown", el._ripple.keyDownHandler);
		el.addEventListener("keyup", keyboardRippleHide);
		el.addEventListener("blur", focusRippleHide);
		el.addEventListener("dragstart", rippleHide, { passive: true });
	} else if (!enabled && wasEnabled) removeListeners(el);
}
function removeListeners(el) {
	el.removeEventListener("touchstart", rippleStop);
	el.removeEventListener("mousedown", rippleStop);
	el.removeEventListener("touchstart", rippleShow);
	el.removeEventListener("touchend", rippleHide);
	el.removeEventListener("touchmove", rippleCancelShow);
	el.removeEventListener("touchcancel", rippleHide);
	el.removeEventListener("mousedown", rippleShow);
	el.removeEventListener("mouseup", rippleHide);
	el.removeEventListener("mouseleave", rippleHide);
	if (el._ripple?.keyDownHandler) el.removeEventListener("keydown", el._ripple.keyDownHandler);
	el.removeEventListener("keyup", keyboardRippleHide);
	el.removeEventListener("blur", focusRippleHide);
	el.removeEventListener("dragstart", rippleHide);
}
function mounted$1(el, binding) {
	updateRipple(el, binding, false);
}
function unmounted$1(el) {
	removeListeners(el);
	delete el._ripple;
}
function updated(el, binding) {
	if (binding.value === binding.oldValue) return;
	updateRipple(el, binding, isRippleEnabled(binding.oldValue));
}
var Ripple = {
	mounted: mounted$1,
	unmounted: unmounted$1,
	updated
};
// packages/vue-ui/node_modules/vuetify/lib/components/VBtn/VBtn.js
var makeVBtnProps = propsFactory({
	active: {
		type: Boolean,
		default: void 0
	},
	activeColor: String,
	baseColor: String,
	symbol: {
		type: null,
		default: VBtnToggleSymbol
	},
	flat: Boolean,
	icon: [
		Boolean,
		String,
		Function,
		Object
	],
	prependIcon: IconValue,
	appendIcon: IconValue,
	block: Boolean,
	readonly: Boolean,
	slim: Boolean,
	stacked: Boolean,
	spaced: String,
	ripple: {
		type: [Boolean, Object],
		default: true
	},
	text: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	...makeBorderProps(),
	...makeComponentProps(),
	...makeDensityProps(),
	...makeDimensionProps(),
	...makeElevationProps(),
	...makeGroupItemProps(),
	...makeLoaderProps(),
	...makeLocationProps(),
	...makePositionProps(),
	...makeRoundedProps(),
	...makeRouterProps(),
	...makeSizeProps(),
	...makeTagProps({ tag: "button" }),
	...makeThemeProps(),
	...makeVariantProps({ variant: "elevated" })
}, "VBtn");
var VBtn = genericComponent()({
	name: "VBtn",
	props: makeVBtnProps(),
	emits: { "group:selected": (val) => true },
	setup(props, { attrs, slots }) {
		const { themeClasses } = provideTheme(props);
		const { borderClasses } = useBorder(props);
		const { densityClasses } = useDensity(props);
		const { dimensionStyles } = useDimension(props);
		const { elevationClasses } = useElevation(props);
		const { loaderClasses } = useLoader(props);
		const { locationStyles } = useLocation(props);
		const { positionClasses } = usePosition(props);
		const { roundedClasses, roundedStyles } = useRounded(props);
		const { sizeClasses, sizeStyles } = useSize(props);
		const group = useGroupItem(props, props.symbol, false);
		const link = useLink(props, attrs);
		const isActive = computed(() => {
			if (props.active !== void 0) return props.active;
			if (link.isRouterLink.value) return link.isActive?.value;
			return group?.isSelected.value;
		});
		const color = toRef(() => isActive.value ? props.activeColor ?? props.color : props.color);
		const { colorClasses, colorStyles, variantClasses } = useVariant(computed(() => {
			return {
				color: group?.isSelected.value && (!link.isLink.value || link.isActive?.value) || !group || link.isActive?.value ? color.value ?? props.baseColor : props.baseColor,
				variant: props.variant
			};
		}));
		const isDisabled = computed(() => group?.disabled.value || props.disabled);
		const isElevated = toRef(() => {
			return props.variant === "elevated" && !(props.disabled || props.flat || props.border);
		});
		const valueAttr = computed(() => {
			if (props.value === void 0 || typeof props.value === "symbol") return void 0;
			return Object(props.value) === props.value ? JSON.stringify(props.value, null, 0) : props.value;
		});
		function onClick(e) {
			if (isDisabled.value || link.isLink.value && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || attrs.target === "_blank")) return;
			if (link.isRouterLink.value) link.navigate.value?.(e);
			else group?.toggle();
		}
		useSelectLink(link, group?.select);
		useRender(() => {
			const Tag = link.isLink.value ? "a" : props.tag;
			const hasPrepend = !!(props.prependIcon || slots.prepend);
			const hasAppend = !!(props.appendIcon || slots.append);
			const hasIcon = !!(props.icon && props.icon !== true);
			return withDirectives(createVNode(Tag, mergeProps(link.linkProps, {
				"type": Tag === "a" ? void 0 : "button",
				"class": [
					"v-btn",
					group?.selectedClass.value,
					{
						"v-btn--active": isActive.value,
						"v-btn--block": props.block,
						"v-btn--disabled": isDisabled.value,
						"v-btn--elevated": isElevated.value,
						"v-btn--flat": props.flat,
						"v-btn--icon": !!props.icon,
						"v-btn--loading": props.loading,
						"v-btn--readonly": props.readonly,
						"v-btn--slim": props.slim,
						"v-btn--stacked": props.stacked
					},
					props.spaced ? ["v-btn--spaced", `v-btn--spaced-${props.spaced}`] : [],
					themeClasses.value,
					borderClasses.value,
					colorClasses.value,
					densityClasses.value,
					elevationClasses.value,
					loaderClasses.value,
					positionClasses.value,
					roundedClasses.value,
					sizeClasses.value,
					variantClasses.value,
					props.class
				],
				"style": [
					colorStyles.value,
					dimensionStyles.value,
					locationStyles.value,
					sizeStyles.value,
					roundedStyles.value,
					props.style
				],
				"aria-busy": props.loading ? true : void 0,
				"disabled": isDisabled.value && Tag !== "a" || void 0,
				"tabindex": props.loading || props.readonly ? -1 : void 0,
				"onClick": onClick,
				"value": Tag !== "a" ? valueAttr.value : void 0
			}), { default: () => [
				genOverlays(true, "v-btn"),
				!props.icon && hasPrepend && createElementVNode("span", {
					"key": "prepend",
					"class": "v-btn__prepend"
				}, [!slots.prepend ? createVNode(VIcon, {
					"key": "prepend-icon",
					"icon": props.prependIcon
				}, null) : createVNode(VDefaultsProvider, {
					"key": "prepend-defaults",
					"disabled": !props.prependIcon,
					"defaults": { VIcon: { icon: props.prependIcon } }
				}, slots.prepend)]),
				createElementVNode("span", {
					"class": "v-btn__content",
					"data-no-activator": ""
				}, [!slots.default && hasIcon ? createVNode(VIcon, {
					"key": "content-icon",
					"icon": props.icon
				}, null) : createVNode(VDefaultsProvider, {
					"key": "content-defaults",
					"disabled": !hasIcon,
					"defaults": { VIcon: { icon: props.icon } }
				}, { default: () => [slots.default?.() ?? toDisplayString(props.text)] })]),
				!props.icon && hasAppend && createElementVNode("span", {
					"key": "append",
					"class": "v-btn__append"
				}, [!slots.append ? createVNode(VIcon, {
					"key": "append-icon",
					"icon": props.appendIcon
				}, null) : createVNode(VDefaultsProvider, {
					"key": "append-defaults",
					"disabled": !props.appendIcon,
					"defaults": { VIcon: { icon: props.appendIcon } }
				}, slots.append)]),
				!!props.loading && createElementVNode("span", {
					"key": "loader",
					"class": "v-btn__loader"
				}, [slots.loader?.() ?? createVNode(VProgressCircular, {
					"color": /* @__PURE__ */ isBoolean(props.loading) ? void 0 : props.loading,
					"indeterminate": true,
					"width": "2"
				}, null)])
			] }), [[
				Ripple,
				!isDisabled.value && props.ripple,
				"",
				{ center: !!props.icon }
			]]);
		});
		return { group };
	}
});
// packages/vue-ui/node_modules/vuetify/lib/components/transitions/createTransition.js
var makeTransitionProps$1 = propsFactory({
	disabled: Boolean,
	group: Boolean,
	hideOnLeave: Boolean,
	leaveAbsolute: Boolean,
	mode: String,
	origin: String
}, "transition");
function createCssTransition(name, origin, mode) {
	return genericComponent()({
		name,
		props: makeTransitionProps$1({
			mode,
			origin
		}),
		setup(props, { slots }) {
			const functions = {
				onBeforeEnter(el) {
					if (props.origin) el.style.transformOrigin = props.origin;
				},
				onLeave(el) {
					if (props.leaveAbsolute) {
						const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = el;
						el._transitionInitialStyles = {
							position: el.style.position,
							top: el.style.top,
							left: el.style.left,
							width: el.style.width,
							height: el.style.height
						};
						el.style.position = "absolute";
						el.style.top = `${offsetTop}px`;
						el.style.left = `${offsetLeft}px`;
						el.style.width = `${offsetWidth}px`;
						el.style.height = `${offsetHeight}px`;
					}
					if (props.hideOnLeave) el.style.setProperty("display", "none", "important");
				},
				onAfterLeave(el) {
					if (props.leaveAbsolute && el?._transitionInitialStyles) {
						const { position, top, left, width, height } = el._transitionInitialStyles;
						delete el._transitionInitialStyles;
						el.style.position = position || "";
						el.style.top = top || "";
						el.style.left = left || "";
						el.style.width = width || "";
						el.style.height = height || "";
					}
				}
			};
			return () => {
				const tag = props.group ? TransitionGroup : Transition;
				return h$1(tag, {
					name: props.disabled ? "" : name,
					css: !props.disabled,
					...props.group ? void 0 : { mode: props.mode },
					...props.disabled ? {} : functions
				}, slots.default);
			};
		}
	});
}
function createJavascriptTransition(name, functions, mode = "in-out") {
	return genericComponent()({
		name,
		props: {
			mode: {
				type: String,
				default: mode
			},
			disabled: {
				type: Boolean,
				default: PREFERS_REDUCED_MOTION()
			},
			group: Boolean,
			hideOnLeave: Boolean
		},
		setup(props, { slots }) {
			const tag = props.group ? TransitionGroup : Transition;
			return () => {
				return h$1(tag, {
					name: props.disabled ? "" : name,
					css: !props.disabled,
					...props.disabled ? {} : {
						...functions,
						onLeave: (el) => {
							if (props.hideOnLeave) el.style.setProperty("display", "none", "important");
							else functions.onLeave?.(el);
						}
					}
				}, slots.default);
			};
		}
	});
}
// packages/vue-ui/node_modules/vuetify/lib/components/transitions/expand-transition.js
function expand_transition_default(expandedParentClass = "", type = "y") {
	return {
		onBeforeEnter(el) {
			el._parent = el.parentNode;
			el._initialStyle = {
				transition: el.style.transition,
				overflow: el.style.overflow,
				width: el.style.width,
				height: el.style.height
			};
		},
		onEnter(el) {
			const initialStyle = el._initialStyle;
			if (!initialStyle) return;
			el.style.setProperty("transition", "none", "important");
			el.style.overflow = "hidden";
			const offsetWidth = `${el.offsetWidth}px`;
			const offsetHeight = `${el.offsetHeight}px`;
			if (["x", "both"].includes(type)) el.style.width = "0";
			if (["y", "both"].includes(type)) el.style.height = "0";
			el.offsetHeight;
			el.style.transition = initialStyle.transition;
			if (expandedParentClass && el._parent) el._parent.classList.add(expandedParentClass);
			requestAnimationFrame(() => {
				if (["x", "both"].includes(type)) el.style.width = offsetWidth;
				if (["y", "both"].includes(type)) el.style.height = offsetHeight;
			});
		},
		onAfterEnter: resetStyles,
		onEnterCancelled: resetStyles,
		onLeave(el) {
			el._initialStyle = {
				transition: "",
				overflow: el.style.overflow,
				width: el.style.width,
				height: el.style.height
			};
			el.style.overflow = "hidden";
			if (["x", "both"].includes(type)) el.style.width = `${el.offsetWidth}px`;
			if (["y", "both"].includes(type)) el.style.height = `${el.offsetHeight}px`;
			el.offsetHeight;
			requestAnimationFrame(() => {
				if (["x", "both"].includes(type)) el.style.width = "0";
				if (["y", "both"].includes(type)) el.style.height = "0";
			});
		},
		onAfterLeave,
		onLeaveCancelled: onAfterLeave
	};
	function onAfterLeave(el) {
		if (expandedParentClass && el._parent) el._parent.classList.remove(expandedParentClass);
		resetStyles(el);
	}
	function resetStyles(el) {
		if (!el._initialStyle) return;
		const { width: w, height: h } = el._initialStyle;
		el.style.overflow = el._initialStyle.overflow;
		if (w != null && ["x", "both"].includes(type)) el.style.width = w;
		if (h != null && ["y", "both"].includes(type)) el.style.height = h;
		delete el._initialStyle;
	}
}
// packages/vue-ui/node_modules/vuetify/lib/components/transitions/dialog-transition.js
var makeVDialogTransitionProps = propsFactory({ target: [Object, Array] }, "v-dialog-transition");
var saved = /* @__PURE__ */ new WeakMap();
var VDialogTransition = genericComponent()({
	name: "VDialogTransition",
	props: makeVDialogTransitionProps(),
	setup(props, { slots }) {
		const functions = {
			onBeforeEnter(el) {
				el.style.pointerEvents = "none";
				el.style.visibility = "hidden";
			},
			async onEnter(el, done) {
				await new Promise((resolve) => requestAnimationFrame(resolve));
				await new Promise((resolve) => requestAnimationFrame(resolve));
				el.style.visibility = "";
				const dimensions = getDimensions(props.target, el);
				const { x, y, sx, sy, speed } = dimensions;
				saved.set(el, dimensions);
				if (PREFERS_REDUCED_MOTION()) animate(el, [{ opacity: 0 }, {}], {
					duration: 125 * speed,
					easing: deceleratedEasing
				}).finished.then(() => done());
				else {
					const animation = animate(el, [{
						transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
						opacity: 0
					}, {}], {
						duration: 225 * speed,
						easing: deceleratedEasing
					});
					getChildren(el)?.forEach((el) => {
						animate(el, [
							{ opacity: 0 },
							{
								opacity: 0,
								offset: .33
							},
							{}
						], {
							duration: 450 * speed,
							easing: standardEasing
						});
					});
					animation.finished.then(() => done());
				}
			},
			onAfterEnter(el) {
				el.style.removeProperty("pointer-events");
			},
			onBeforeLeave(el) {
				el.style.pointerEvents = "none";
			},
			async onLeave(el, done) {
				await new Promise((resolve) => requestAnimationFrame(resolve));
				let dimensions;
				if (!saved.has(el) || Array.isArray(props.target) || props.target.offsetParent || props.target.getClientRects().length) dimensions = getDimensions(props.target, el);
				else dimensions = saved.get(el);
				const { x, y, sx, sy, speed } = dimensions;
				if (PREFERS_REDUCED_MOTION()) animate(el, [{}, { opacity: 0 }], {
					duration: 85 * speed,
					easing: acceleratedEasing
				}).finished.then(() => done());
				else {
					animate(el, [{}, {
						transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
						opacity: 0
					}], {
						duration: 125 * speed,
						easing: acceleratedEasing
					}).finished.then(() => done());
					getChildren(el)?.forEach((el) => {
						animate(el, [
							{},
							{
								opacity: 0,
								offset: .2
							},
							{ opacity: 0 }
						], {
							duration: 250 * speed,
							easing: standardEasing
						});
					});
				}
			},
			onAfterLeave(el) {
				el.style.removeProperty("pointer-events");
			}
		};
		return () => {
			return props.target ? createVNode(Transition, mergeProps({ "name": "dialog-transition" }, functions, { "css": false }), slots) : createVNode(Transition, { "name": "dialog-transition" }, slots);
		};
	}
});
/** Animatable children (card, sheet, list) */
function getChildren(el) {
	const els = el.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")?.children;
	return els && [...els];
}
function getDimensions(target, el) {
	const targetBox = getTargetBox(target);
	const elBox = nullifyTransforms(el);
	const [originX, originY] = getComputedStyle(el).transformOrigin.split(" ").map((v) => parseFloat(v));
	const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue("--v-overlay-anchor-origin").split(" ");
	let offsetX = targetBox.left + targetBox.width / 2;
	if (anchorSide === "left" || anchorOffset === "left") offsetX -= targetBox.width / 2;
	else if (anchorSide === "right" || anchorOffset === "right") offsetX += targetBox.width / 2;
	let offsetY = targetBox.top + targetBox.height / 2;
	if (anchorSide === "top" || anchorOffset === "top") offsetY -= targetBox.height / 2;
	else if (anchorSide === "bottom" || anchorOffset === "bottom") offsetY += targetBox.height / 2;
	const tsx = targetBox.width / elBox.width;
	const tsy = targetBox.height / elBox.height;
	const maxs = Math.max(1, tsx, tsy);
	const sx = tsx / maxs || 0;
	const sy = tsy / maxs || 0;
	const asa = elBox.width * elBox.height / (window.innerWidth * window.innerHeight);
	const speed = asa > .12 ? Math.min(1.5, (asa - .12) * 10 + 1) : 1;
	return {
		x: offsetX - (originX + elBox.left),
		y: offsetY - (originY + elBox.top),
		sx,
		sy,
		speed
	};
}
createCssTransition("fab-transition", "center center", "out-in");
createCssTransition("dialog-bottom-transition");
createCssTransition("dialog-top-transition");
createCssTransition("fade-transition");
createCssTransition("scale-transition");
createCssTransition("scroll-x-transition");
createCssTransition("scroll-x-reverse-transition");
createCssTransition("scroll-y-transition");
createCssTransition("scroll-y-reverse-transition");
createCssTransition("slide-x-transition");
createCssTransition("slide-x-reverse-transition");
var VSlideYTransition = createCssTransition("slide-y-transition");
createCssTransition("slide-y-reverse-transition");
createJavascriptTransition("expand-transition", expand_transition_default());
var VExpandXTransition = createJavascriptTransition("expand-x-transition", expand_transition_default("", "x"));
createJavascriptTransition("expand-both-transition", expand_transition_default("", "both"));
// packages/vue-ui/node_modules/vuetify/lib/composables/transition.js
var makeTransitionProps = propsFactory({ transition: {
	type: null,
	default: "fade-transition",
	validator: (val) => val !== true
} }, "transition");
var MaybeTransition = (props, { slots }) => {
	const { transition, disabled, group, target, ...rest } = props;
	const { component = group ? TransitionGroup : Transition, ...customProps } = /* @__PURE__ */ isObject(transition) ? transition : {};
	let transitionProps;
	if (/* @__PURE__ */ isObject(transition)) transitionProps = mergeProps(customProps, onlyDefinedProps({
		disabled,
		group,
		target
	}), rest);
	else transitionProps = mergeProps({ name: disabled || !transition ? "" : transition }, rest);
	return h$1(component, transitionProps, slots);
};
// packages/vue-ui/node_modules/vuetify/lib/components/VCounter/VCounter.js
var makeVCounterProps = propsFactory({
	active: Boolean,
	disabled: Boolean,
	max: [Number, String],
	value: {
		type: [Number, String],
		default: 0
	},
	...makeComponentProps(),
	...makeTransitionProps({ transition: { component: VSlideYTransition } })
}, "VCounter");
var VCounter = genericComponent()({
	name: "VCounter",
	functional: true,
	props: makeVCounterProps(),
	setup(props, { slots }) {
		const lastMax = shallowRef(props.max);
		watch(() => props.max, (val) => val != null && (lastMax.value = val));
		const max = toRef(() => props.active ? props.max : lastMax.value);
		const counter = toRef(() => {
			return max.value ? `${props.value} / ${max.value}` : String(props.value);
		});
		useRender(() => createVNode(MaybeTransition, {
			"transition": props.transition,
			"appear": true
		}, { default: () => [withDirectives(createElementVNode("div", {
			"class": normalizeClass([
				"v-counter",
				{ "text-error": max.value && !props.disabled && parseFloat(props.value) > parseFloat(max.value) },
				props.class
			]),
			"style": normalizeStyle(props.style)
		}, [slots.default ? slots.default({
			counter: counter.value,
			max: max.value,
			value: props.value
		}) : counter.value]), [[vShow, props.active]])] }));
		return {};
	}
});
// packages/vue-ui/node_modules/vuetify/lib/components/VLabel/VLabel.js
var makeVLabelProps = propsFactory({
	text: String,
	onClick: EventProp(),
	...makeComponentProps(),
	...makeThemeProps()
}, "VLabel");
var VLabel = genericComponent()({
	name: "VLabel",
	props: makeVLabelProps(),
	setup(props, { slots }) {
		useRender(() => createElementVNode("label", {
			"class": normalizeClass([
				"v-label",
				{ "v-label--clickable": !!props.onClick },
				props.class
			]),
			"style": normalizeStyle(props.style),
			"onClick": props.onClick
		}, [props.text, slots.default?.()]));
		return {};
	}
});
// packages/vue-ui/node_modules/vuetify/lib/components/VField/VFieldLabel.js
var makeVFieldLabelProps = propsFactory({
	floating: Boolean,
	...makeComponentProps()
}, "VFieldLabel");
var VFieldLabel = genericComponent()({
	name: "VFieldLabel",
	props: makeVFieldLabelProps(),
	setup(props, { slots }) {
		useRender(() => createVNode(VLabel, {
			"class": normalizeClass([
				"v-field-label",
				{ "v-field-label--floating": props.floating },
				props.class
			]),
			"style": normalizeStyle(props.style)
		}, slots));
		return {};
	}
});
// packages/vue-ui/node_modules/vuetify/lib/components/VInput/InputIcon.js
function useInputIcon(props) {
	const { t } = useLocale();
	function InputIcon({ name, color, ...attrs }) {
		const localeKey = {
			prepend: "prependAction",
			prependInner: "prependAction",
			append: "appendAction",
			appendInner: "appendAction",
			clear: "clear"
		}[name];
		const listener = props[`onClick:${name}`];
		function onKeydown(e) {
			if (e.key !== "Enter" && e.key !== " ") return;
			e.preventDefault();
			e.stopPropagation();
			callEvent(listener, new PointerEvent("click", e));
		}
		const label = listener && localeKey ? t(`$vuetify.input.${localeKey}`, props.label ?? "") : void 0;
		return createVNode(VIcon, mergeProps({
			"icon": props[`${name}Icon`],
			"aria-label": label,
			"onClick": listener,
			"onKeydown": onKeydown,
			"color": color
		}, attrs), null);
	}
	return { InputIcon };
}
// packages/vue-ui/node_modules/vuetify/lib/composables/focus.js
var makeFocusProps = propsFactory({
	focused: Boolean,
	"onUpdate:focused": EventProp()
}, "focus");
function useFocus(props, name = getCurrentInstanceName()) {
	const isFocused = useProxiedModel(props, "focused");
	const focusClasses = toRef(() => {
		return { [`${name}--focused`]: isFocused.value };
	});
	function focus() {
		isFocused.value = true;
	}
	function blur() {
		isFocused.value = false;
	}
	return {
		focusClasses,
		isFocused,
		focus,
		blur
	};
}
// packages/vue-ui/node_modules/vuetify/lib/components/VField/VField.js
var allowedVariants = [
	"underlined",
	"outlined",
	"filled",
	"solo",
	"solo-inverted",
	"solo-filled",
	"plain"
];
var makeVFieldProps = propsFactory({
	appendInnerIcon: IconValue,
	bgColor: String,
	clearable: Boolean,
	clearIcon: {
		type: IconValue,
		default: "$clear"
	},
	active: Boolean,
	centerAffix: {
		type: Boolean,
		default: void 0
	},
	color: String,
	baseColor: String,
	dirty: Boolean,
	disabled: {
		type: Boolean,
		default: null
	},
	glow: Boolean,
	error: Boolean,
	flat: Boolean,
	iconColor: [Boolean, String],
	label: String,
	persistentClear: Boolean,
	prependInnerIcon: IconValue,
	reverse: Boolean,
	singleLine: Boolean,
	variant: {
		type: String,
		default: "filled",
		validator: (v) => allowedVariants.includes(v)
	},
	"onClick:clear": EventProp(),
	"onClick:appendInner": EventProp(),
	"onClick:prependInner": EventProp(),
	...makeComponentProps(),
	...makeLoaderProps(),
	...makeRoundedProps(),
	...makeThemeProps()
}, "VField");
var VField = genericComponent()({
	name: "VField",
	inheritAttrs: false,
	props: {
		id: String,
		details: Boolean,
		labelId: String,
		...makeFocusProps(),
		...makeVFieldProps()
	},
	emits: {
		"update:focused": (focused) => true,
		"update:modelValue": (value) => true
	},
	setup(props, { attrs, emit, slots }) {
		const { themeClasses } = provideTheme(props);
		const { loaderClasses } = useLoader(props);
		const { focusClasses, isFocused, focus, blur } = useFocus(props);
		const { InputIcon } = useInputIcon(props);
		const { roundedClasses, roundedStyles } = useRounded(props);
		const { rtlClasses } = useRtl();
		const isActive = toRef(() => props.dirty || props.active);
		const hasLabel = toRef(() => !!(props.label || slots.label));
		const hasFloatingLabel = toRef(() => !props.singleLine && hasLabel.value);
		const uid = useId();
		const id = computed(() => props.id || `input-${uid}`);
		const messagesId = toRef(() => !props.details ? void 0 : `${id.value}-messages`);
		const labelRef = ref$1();
		const floatingLabelRef = ref$1();
		const controlRef = ref$1();
		const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
		const color = computed(() => {
			return props.error || props.disabled ? void 0 : isActive.value && isFocused.value ? props.color : props.baseColor;
		});
		const iconColor = computed(() => {
			if (props.iconColor === true || !props.iconColor && props.glow && isFocused.value) return color.value;
			if (!props.iconColor || props.glow && !isFocused.value) return void 0;
			return props.iconColor;
		});
		const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.bgColor);
		const { textColorClasses, textColorStyles } = useTextColor(color);
		watch(isActive, (val) => {
			if (hasFloatingLabel.value && !PREFERS_REDUCED_MOTION()) {
				const el = labelRef.value.$el;
				const targetEl = floatingLabelRef.value.$el;
				requestAnimationFrame(() => {
					const rect = nullifyTransforms(el);
					const targetRect = new Box(targetEl);
					const x = targetRect.x - rect.x;
					const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);
					const targetWidth = targetRect.width / .75;
					const width = Math.abs(targetWidth - rect.width) > 1 ? { maxWidth: convertToUnit(targetWidth) } : void 0;
					const style = getComputedStyle(el);
					const targetStyle = getComputedStyle(targetEl);
					const duration = parseFloat(style.transitionDuration) * 1e3 || 150;
					const scale = parseFloat(targetStyle.getPropertyValue("--v-field-label-scale"));
					const color = targetStyle.getPropertyValue("color");
					el.style.visibility = "visible";
					targetEl.style.visibility = "hidden";
					animate(el, {
						transform: `translate(${x}px, ${y}px) scale(${scale})`,
						color,
						...width
					}, {
						duration,
						easing: standardEasing,
						direction: val ? "normal" : "reverse"
					}).finished.then(() => {
						el.style.removeProperty("visibility");
						targetEl.style.removeProperty("visibility");
					});
				});
			}
		}, { flush: "post" });
		const slotProps = computed(() => ({
			isActive,
			isFocused,
			controlRef,
			iconColor,
			blur,
			focus
		}));
		const floatingLabelProps = toRef(() => {
			const ariaHidden = !isActive.value;
			return {
				"aria-hidden": ariaHidden,
				for: ariaHidden ? void 0 : id.value
			};
		});
		const mainLabelProps = toRef(() => {
			const ariaHidden = hasFloatingLabel.value && isActive.value;
			return {
				"aria-hidden": ariaHidden,
				for: ariaHidden ? void 0 : id.value
			};
		});
		function onClick(e) {
			if (e.target !== getActiveElement()) e.preventDefault();
		}
		useRender(() => {
			const isOutlined = props.variant === "outlined";
			const hasPrepend = !!(slots["prepend-inner"] || props.prependInnerIcon);
			const hasClear = !!(props.clearable || slots.clear) && !props.disabled;
			const hasAppend = !!(slots["append-inner"] || props.appendInnerIcon || hasClear);
			const label = () => slots.label ? slots.label({
				...slotProps.value,
				label: props.label,
				props: { for: id.value }
			}) : props.label;
			return createElementVNode("div", mergeProps({
				"class": [
					"v-field",
					{
						"v-field--active": isActive.value,
						"v-field--appended": hasAppend,
						"v-field--center-affix": props.centerAffix ?? !isPlainOrUnderlined.value,
						"v-field--disabled": props.disabled,
						"v-field--dirty": props.dirty,
						"v-field--error": props.error,
						"v-field--glow": props.glow,
						"v-field--flat": props.flat,
						"v-field--has-background": !!props.bgColor,
						"v-field--persistent-clear": props.persistentClear,
						"v-field--prepended": hasPrepend,
						"v-field--reverse": props.reverse,
						"v-field--single-line": props.singleLine,
						"v-field--no-label": !label(),
						[`v-field--variant-${props.variant}`]: true
					},
					themeClasses.value,
					backgroundColorClasses.value,
					focusClasses.value,
					loaderClasses.value,
					roundedClasses.value,
					rtlClasses.value,
					props.class
				],
				"style": [
					backgroundColorStyles.value,
					roundedStyles.value,
					props.style
				],
				"onClick": onClick
			}, attrs), [
				createElementVNode("div", { "class": "v-field__overlay" }, null),
				createVNode(LoaderSlot, {
					"name": "v-field",
					"active": !!props.loading,
					"color": props.error ? "error" : /* @__PURE__ */ isString(props.loading) ? props.loading : props.color
				}, { default: slots.loader }),
				hasPrepend && createElementVNode("div", {
					"key": "prepend",
					"class": "v-field__prepend-inner"
				}, [slots["prepend-inner"] ? slots["prepend-inner"](slotProps.value) : props.prependInnerIcon && createVNode(InputIcon, {
					"key": "prepend-icon",
					"name": "prependInner",
					"color": iconColor.value
				}, null)]),
				createElementVNode("div", {
					"class": "v-field__field",
					"data-no-activator": ""
				}, [
					[
						"filled",
						"solo",
						"solo-inverted",
						"solo-filled"
					].includes(props.variant) && hasFloatingLabel.value && createVNode(VFieldLabel, mergeProps({
						"key": "floating-label",
						"ref": floatingLabelRef,
						"class": [textColorClasses.value],
						"floating": true
					}, floatingLabelProps.value, { "style": textColorStyles.value }), { default: () => [label()] }),
					hasLabel.value && createVNode(VFieldLabel, mergeProps({
						"key": "label",
						"ref": labelRef,
						"id": props.labelId
					}, mainLabelProps.value), { default: () => [label()] }),
					slots.default?.({
						...slotProps.value,
						props: {
							id: id.value,
							class: "v-field__input",
							"aria-describedby": messagesId.value
						},
						focus,
						blur
					}) ?? createElementVNode("div", {
						"id": id.value,
						"class": "v-field__input",
						"aria-describedby": messagesId.value
					}, null)
				]),
				hasClear && createVNode(VExpandXTransition, { "key": "clear" }, { default: () => [withDirectives(createElementVNode("div", {
					"class": "v-field__clearable",
					"onMousedown": (e) => {
						e.preventDefault();
						e.stopPropagation();
					}
				}, [createVNode(VDefaultsProvider, { "defaults": { VIcon: { icon: props.clearIcon } } }, { default: () => [slots.clear ? slots.clear({
					...slotProps.value,
					props: {
						onFocus: focus,
						onBlur: blur,
						onClick: props["onClick:clear"],
						tabindex: -1
					}
				}) : createVNode(InputIcon, {
					"name": "clear",
					"onFocus": focus,
					"onBlur": blur,
					"tabindex": -1
				}, null)] })]), [[vShow, props.dirty]])] }),
				hasAppend && createElementVNode("div", {
					"key": "append",
					"class": "v-field__append-inner"
				}, [slots["append-inner"] ? slots["append-inner"](slotProps.value) : props.appendInnerIcon && createVNode(InputIcon, {
					"key": "append-icon",
					"name": "appendInner",
					"color": iconColor.value
				}, null)]),
				createElementVNode("div", {
					"class": normalizeClass(["v-field__outline", textColorClasses.value]),
					"style": normalizeStyle(textColorStyles.value)
				}, [isOutlined && createElementVNode(Fragment, null, [
					createElementVNode("div", { "class": "v-field__outline__start" }, null),
					hasFloatingLabel.value && createElementVNode("div", { "class": "v-field__outline__notch" }, [createVNode(VFieldLabel, mergeProps({
						"ref": floatingLabelRef,
						"floating": true
					}, floatingLabelProps.value), { default: () => [label()] })]),
					createElementVNode("div", { "class": "v-field__outline__end" }, null)
				]), isPlainOrUnderlined.value && hasFloatingLabel.value && createVNode(VFieldLabel, mergeProps({
					"ref": floatingLabelRef,
					"floating": true
				}, floatingLabelProps.value), { default: () => [label()] })])
			]);
		});
		return {
			controlRef,
			fieldIconColor: iconColor
		};
	}
});
// packages/vue-ui/node_modules/vuetify/lib/components/VMessages/VMessages.js
var makeVMessagesProps = propsFactory({
	active: Boolean,
	color: String,
	messages: {
		type: [Array, String],
		default: () => []
	},
	...makeComponentProps(),
	...makeTransitionProps({ transition: {
		component: VSlideYTransition,
		leaveAbsolute: true,
		group: true
	} })
}, "VMessages");
var VMessages = genericComponent()({
	name: "VMessages",
	props: makeVMessagesProps(),
	setup(props, { slots }) {
		const messages = computed(() => wrapInArray(props.messages));
		const { textColorClasses, textColorStyles } = useTextColor(() => props.color);
		useRender(() => createVNode(MaybeTransition, {
			"transition": props.transition,
			"tag": "div",
			"class": normalizeClass([
				"v-messages",
				textColorClasses.value,
				props.class
			]),
			"style": normalizeStyle([textColorStyles.value, props.style])
		}, { default: () => [props.active && messages.value.map((message, i) => createElementVNode("div", {
			"class": "v-messages__message",
			"key": `${i}-${messages.value}`
		}, [slots.message ? slots.message({ message }) : message]))] }));
		return {};
	}
});
// packages/vue-ui/node_modules/vuetify/lib/composables/rules/rules.js
var RulesSymbol = Symbol.for("vuetify:rules");
function useRules(fn) {
	const rules = inject(RulesSymbol, null);
	if (!fn) {
		if (!rules) throw new Error("Could not find Vuetify rules injection");
		return rules.aliases;
	}
	return rules?.resolve(fn) ?? toRef(fn);
}
// packages/vue-ui/node_modules/vuetify/lib/composables/validation.js
var makeValidationProps = propsFactory({
	disabled: {
		type: Boolean,
		default: null
	},
	error: Boolean,
	errorMessages: {
		type: [Array, String],
		default: () => []
	},
	maxErrors: {
		type: [Number, String],
		default: 1
	},
	name: String,
	label: String,
	readonly: {
		type: Boolean,
		default: null
	},
	rules: {
		type: Array,
		default: () => []
	},
	modelValue: null,
	validateOn: String,
	validationValue: null,
	...makeFocusProps()
}, "validation");
function useValidation(props, name = getCurrentInstanceName(), id = useId()) {
	const model = useProxiedModel(props, "modelValue");
	const validationModel = computed(() => /* @__PURE__ */ isUndefined(props.validationValue) ? model.value : props.validationValue);
	const form = useForm(props);
	const rules = useRules(() => props.rules);
	const internalErrorMessages = ref$1([]);
	const isPristine = shallowRef(true);
	const isDirty = computed(() => !!(wrapInArray(model.value === "" ? null : model.value).length || wrapInArray(validationModel.value === "" ? null : validationModel.value).length));
	const errorMessages = computed(() => {
		return props.errorMessages?.length ? wrapInArray(props.errorMessages).concat(internalErrorMessages.value).slice(0, Math.max(0, Number(props.maxErrors))) : internalErrorMessages.value;
	});
	const validateOn = computed(() => {
		let value = (props.validateOn ?? form.validateOn?.value) || "input";
		if (value === "lazy") value = "input lazy";
		if (value === "eager") value = "input eager";
		const set = new Set(value?.split(" ") ?? []);
		return {
			input: set.has("input"),
			blur: set.has("blur") || set.has("input") || set.has("invalid-input"),
			invalidInput: set.has("invalid-input"),
			lazy: set.has("lazy"),
			eager: set.has("eager")
		};
	});
	const isValid = computed(() => {
		if (props.error || props.errorMessages?.length) return false;
		if (!props.rules.length) return true;
		if (isPristine.value) return internalErrorMessages.value.length || validateOn.value.lazy ? null : true;
		else return !internalErrorMessages.value.length;
	});
	const isValidating = shallowRef(false);
	let isResetting = false;
	const validationClasses = computed(() => {
		return {
			[`${name}--error`]: isValid.value === false,
			[`${name}--dirty`]: isDirty.value,
			[`${name}--disabled`]: form.isDisabled.value,
			[`${name}--readonly`]: form.isReadonly.value
		};
	});
	const vm = getCurrentInstance$1("validation");
	const uid = computed(() => props.name ?? unref(id));
	onBeforeMount(() => {
		form.register?.({
			id: uid.value,
			vm,
			validate,
			reset,
			resetValidation
		});
	});
	onBeforeUnmount(() => {
		form.unregister?.(uid.value);
	});
	onMounted(async () => {
		if (!validateOn.value.lazy) await validate(!validateOn.value.eager);
		form.update?.(uid.value, isValid.value, errorMessages.value);
	});
	useToggleScope(() => validateOn.value.input || validateOn.value.invalidInput && isValid.value === false, () => {
		watch(validationModel, () => {
			if (!isResetting) validate();
		});
	});
	useToggleScope(() => validateOn.value.blur, () => {
		watch(() => props.focused, (val) => {
			if (!val) validate();
		});
	});
	watch([isValid, errorMessages], () => {
		form.update?.(uid.value, isValid.value, errorMessages.value);
	});
	async function reset() {
		isResetting = true;
		model.value = null;
		await nextTick$1();
		isResetting = false;
		await resetValidation();
	}
	async function resetValidation() {
		isPristine.value = true;
		if (!validateOn.value.lazy) await validate(!validateOn.value.eager);
		else internalErrorMessages.value = [];
	}
	async function validate(silent = false) {
		const results = [];
		isValidating.value = true;
		for (const rule of rules.value) {
			if (results.length >= Number(props.maxErrors ?? 1)) break;
			const result = await (/* @__PURE__ */ isFunction(rule) ? rule : () => rule)(validationModel.value);
			if (result === true) continue;
			if (result !== false && !/* @__PURE__ */ isString(result)) {
				console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`);
				continue;
			}
			results.push(result || "");
		}
		internalErrorMessages.value = results;
		isValidating.value = false;
		isPristine.value = silent;
		return internalErrorMessages.value;
	}
	return {
		errorMessages,
		isDirty,
		isDisabled: form.isDisabled,
		isReadonly: form.isReadonly,
		isPristine,
		isValid,
		isValidating,
		reset,
		resetValidation,
		validate,
		validationClasses
	};
}
// packages/vue-ui/node_modules/vuetify/lib/components/VInput/VInput.js
var makeVInputProps = propsFactory({
	id: String,
	appendIcon: IconValue,
	baseColor: String,
	centerAffix: {
		type: Boolean,
		default: true
	},
	color: String,
	glow: Boolean,
	iconColor: [Boolean, String],
	prependIcon: IconValue,
	detailsActive: {
		type: Boolean,
		default: null
	},
	hideDetails: [Boolean, String],
	hideSpinButtons: Boolean,
	hint: String,
	indentDetails: {
		type: Boolean,
		default: null
	},
	persistentHint: Boolean,
	messages: {
		type: [Array, String],
		default: () => []
	},
	direction: {
		type: String,
		default: "horizontal",
		validator: (v) => ["horizontal", "vertical"].includes(v)
	},
	"onClick:prepend": EventProp(),
	"onClick:append": EventProp(),
	...makeComponentProps(),
	...makeDensityProps(),
	...pick(makeDimensionProps(), [
		"maxWidth",
		"minWidth",
		"width"
	]),
	...makeThemeProps(),
	...makeValidationProps()
}, "VInput");
var VInput = genericComponent()({
	name: "VInput",
	props: { ...makeVInputProps() },
	emits: { "update:modelValue": (value) => true },
	setup(props, { attrs, slots, emit }) {
		const { densityClasses } = useDensity(props);
		const { dimensionStyles } = useDimension(props);
		const { themeClasses } = provideTheme(props);
		const { rtlClasses } = useRtl();
		const { InputIcon } = useInputIcon(props);
		const uid = useId();
		const id = computed(() => props.id || `input-${uid}`);
		const { errorMessages, isDirty, isDisabled, isReadonly, isPristine, isValid, isValidating, reset, resetValidation, validate, validationClasses } = useValidation(props, "v-input", id);
		const messages = computed(() => {
			if (props.errorMessages?.length || !isPristine.value && errorMessages.value.length) return errorMessages.value;
			else if (props.hint && (props.persistentHint || props.focused)) return props.hint;
			else return props.messages;
		});
		const hasMessages = toRef(() => messages.value.length > 0);
		const hasDetails = toRef(() => !props.hideDetails || props.hideDetails === "auto" && (hasMessages.value || (props.detailsActive ?? !!slots.details)));
		const messagesId = computed(() => hasDetails.value ? `${id.value}-messages` : void 0);
		const slotProps = computed(() => ({
			id,
			messagesId,
			isDirty,
			isDisabled,
			isReadonly,
			isPristine,
			isValid,
			isValidating,
			hasDetails,
			reset,
			resetValidation,
			validate
		}));
		const color = toRef(() => {
			return props.error || props.disabled ? void 0 : props.focused ? props.color : props.baseColor;
		});
		const iconColor = toRef(() => {
			if (!props.iconColor) return void 0;
			return props.iconColor === true ? color.value : props.iconColor;
		});
		useRender(() => {
			const hasPrepend = !!(slots.prepend || props.prependIcon);
			const hasAppend = !!(slots.append || props.appendIcon);
			return createElementVNode("div", {
				"class": normalizeClass([
					"v-input",
					`v-input--${props.direction}`,
					{
						"v-input--center-affix": props.centerAffix,
						"v-input--focused": props.focused,
						"v-input--glow": props.glow,
						"v-input--hide-spin-buttons": props.hideSpinButtons,
						"v-input--indent-details": props.indentDetails
					},
					densityClasses.value,
					themeClasses.value,
					rtlClasses.value,
					validationClasses.value,
					props.class
				]),
				"style": normalizeStyle([dimensionStyles.value, props.style])
			}, [
				hasPrepend && createElementVNode("div", {
					"key": "prepend",
					"class": "v-input__prepend"
				}, [slots.prepend ? slots.prepend(slotProps.value) : props.prependIcon && createVNode(InputIcon, {
					"key": "prepend-icon",
					"name": "prepend",
					"color": iconColor.value
				}, null)]),
				slots.default && createElementVNode("div", { "class": "v-input__control" }, [slots.default?.(slotProps.value)]),
				hasAppend && createElementVNode("div", {
					"key": "append",
					"class": "v-input__append"
				}, [slots.append ? slots.append(slotProps.value) : props.appendIcon && createVNode(InputIcon, {
					"key": "append-icon",
					"name": "append",
					"color": iconColor.value
				}, null)]),
				props.hideDetails !== true && createElementVNode("div", {
					"id": messagesId.value,
					"class": normalizeClass(["v-input__details", { "v-input__details--hidden": !hasDetails.value }]),
					"role": "alert",
					"aria-live": "polite"
				}, [createVNode(VMessages, {
					"active": hasMessages.value,
					"messages": messages.value
				}, { message: slots.message }), slots.details?.(slotProps.value)])
			]);
		});
		return {
			reset,
			resetValidation,
			validate,
			isValid,
			errorMessages
		};
	}
});
// packages/vue-ui/node_modules/vuetify/lib/composables/autocomplete.js
var makeAutocompleteProps = propsFactory({ autocomplete: String }, "autocomplete");
function useAutocomplete(props) {
	const uniqueId = useId();
	const reloadTrigger = shallowRef(0);
	const isSuppressing = toRef(() => props.autocomplete === "suppress");
	const fieldName = toRef(() => {
		if (!props.name) return void 0;
		return isSuppressing.value ? `${props.name}-${uniqueId}-${reloadTrigger.value}` : props.name;
	});
	return {
		isSuppressing,
		fieldAutocomplete: toRef(() => {
			return isSuppressing.value ? "off" : props.autocomplete;
		}),
		fieldName,
		update: () => reloadTrigger.value = (/* @__PURE__ */ new Date()).getTime()
	};
}
// packages/vue-ui/node_modules/vuetify/lib/composables/autofocus.js
function useAutofocus(props) {
	function onIntersect(isIntersecting, entries) {
		if (!props.autofocus || !isIntersecting) return;
		const el = entries[0].target;
		const target = el.matches("input,textarea") ? el : el.querySelector("input,textarea");
		setTimeout(() => target?.focus(), 50);
	}
	return { onIntersect };
}
// packages/vue-ui/node_modules/vuetify/lib/directives/intersect/index.js
function mounted(el, binding) {
	if (!SUPPORTS_INTERSECTION) return;
	const modifiers = binding.modifiers || {};
	const value = binding.value;
	const handler = /* @__PURE__ */ isFunction(value) || !/* @__PURE__ */ isObject(value) ? value : value.handler;
	const options = /* @__PURE__ */ isFunction(value) || !/* @__PURE__ */ isObject(value) ? {} : value.options;
	const observer = new IntersectionObserver((entries = [], observer) => {
		const _observe = el._observe?.[binding.instance.$.uid];
		if (!_observe) return;
		const isIntersecting = entries.some((entry) => entry.isIntersecting);
		if (handler && (!modifiers.quiet || _observe.init) && (!modifiers.once || isIntersecting || _observe.init)) handler(isIntersecting, entries, observer);
		if (isIntersecting && modifiers.once) unmounted(el, binding);
		else _observe.init = true;
	}, options);
	el._observe = Object(el._observe);
	el._observe[binding.instance.$.uid] = {
		init: false,
		observer
	};
	observer.observe(el);
}
function unmounted(el, binding) {
	const observe = el._observe?.[binding.instance.$.uid];
	if (!observe) return;
	observe.observer.unobserve(el);
	delete el._observe[binding.instance.$.uid];
}
var Intersect = {
	mounted,
	unmounted,
	updated: (el, binding) => {
		if (el._observe?.[binding.instance.$.uid]) {
			unmounted(el, binding);
			mounted(el, binding);
		}
	}
};
// packages/vue-ui/node_modules/vuetify/lib/components/VTextField/VTextField.js
var activeTypes = [
	"color",
	"file",
	"time",
	"date",
	"datetime-local",
	"week",
	"month"
];
var makeVTextFieldProps = propsFactory({
	autofocus: Boolean,
	counter: {
		type: [
			Boolean,
			Number,
			String
		],
		default: void 0
	},
	counterValue: [Number, Function],
	prefix: String,
	placeholder: String,
	persistentPlaceholder: Boolean,
	persistentCounter: Boolean,
	suffix: String,
	role: String,
	type: {
		type: String,
		default: "text"
	},
	modelModifiers: Object,
	...makeAutocompleteProps(),
	...omit(makeVInputProps(), ["direction"]),
	...makeVFieldProps()
}, "VTextField");
var VTextField$1 = genericComponent()({
	name: "VTextField",
	directives: { vIntersect: Intersect },
	inheritAttrs: false,
	props: makeVTextFieldProps(),
	emits: {
		"click:control": (e) => true,
		"mousedown:control": (e) => true,
		"update:focused": (focused) => true,
		"update:modelValue": (val) => true
	},
	setup(props, { attrs, emit, slots }) {
		const model = useProxiedModel(props, "modelValue", void 0, (v) => {
			if (Object.is(v, -0)) return "-0";
			return v;
		});
		const { isFocused, focus, blur } = useFocus(props);
		const { onIntersect } = useAutofocus(props);
		const counterValue = computed(() => {
			return /* @__PURE__ */ isFunction(props.counterValue) ? props.counterValue(model.value) : /* @__PURE__ */ isNumber(props.counterValue) ? props.counterValue : (model.value ?? "").toString().length;
		});
		const max = computed(() => {
			if (attrs.maxlength) return attrs.maxlength;
			if (!props.counter || !/* @__PURE__ */ isNumber(props.counter) && !/* @__PURE__ */ isString(props.counter)) return void 0;
			return props.counter;
		});
		const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
		const vInputRef = ref$1();
		const vFieldRef = ref$1();
		const inputRef = ref$1();
		watch(() => props.type, () => void inputRef.value?.offsetHeight, { flush: "post" });
		const autocomplete = useAutocomplete(props);
		const isActive = computed(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value || props.active);
		function onFocus() {
			if (autocomplete.isSuppressing.value) autocomplete.update();
			if (!isFocused.value) focus();
			nextTick$1(() => {
				if (inputRef.value !== getActiveElement()) inputRef.value?.focus();
			});
		}
		function onControlMousedown(e) {
			emit("mousedown:control", e);
			if (e.target === inputRef.value) return;
			onFocus();
			e.preventDefault();
		}
		function onControlClick(e) {
			emit("click:control", e);
		}
		function onClear(e, reset) {
			e.stopPropagation();
			onFocus();
			nextTick$1(() => {
				reset();
				callEvent(props["onClick:clear"], e);
			});
		}
		function onInput(e) {
			const el = e.target;
			if (!(props.modelModifiers?.trim && [
				"text",
				"search",
				"password",
				"tel",
				"url"
			].includes(props.type))) {
				model.value = el.value;
				return;
			}
			const value = el.value;
			const start = el.selectionStart;
			const end = el.selectionEnd;
			model.value = value;
			nextTick$1(() => {
				let offset = 0;
				if (value.trimStart().length === el.value.length) offset = value.length - el.value.length;
				if (start != null) el.selectionStart = start - offset;
				if (end != null) el.selectionEnd = end - offset;
			});
		}
		useRender(() => {
			const hasCounter = !!(slots.counter || props.counter !== void 0);
			const counterActive = props.counter !== false && props.counter !== null && (props.persistentCounter || isFocused.value);
			const hasDetails = props.hideDetails !== true && !!(slots.details || hasCounter);
			const detailsActive = !!(slots.details || hasCounter && counterActive);
			const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
			const { modelValue: _, ...inputProps } = VInput.filterProps(props);
			const fieldProps = VField.filterProps(props);
			return createVNode(VInput, mergeProps({
				"ref": vInputRef,
				"modelValue": model.value,
				"onUpdate:modelValue": ($event) => model.value = $event,
				"class": [
					"v-text-field",
					{
						"v-text-field--prefixed": props.prefix,
						"v-text-field--suffixed": props.suffix,
						"v-input--plain-underlined": isPlainOrUnderlined.value
					},
					props.class
				],
				"style": props.style
			}, rootAttrs, inputProps, {
				"centerAffix": !isPlainOrUnderlined.value,
				"focused": isFocused.value,
				"detailsActive": detailsActive,
				"indentDetails": props.indentDetails ?? !isPlainOrUnderlined.value
			}), {
				...slots,
				default: ({ id, isDisabled, isDirty, isReadonly, isValid, hasDetails, reset }) => createVNode(VField, mergeProps({
					"ref": vFieldRef,
					"onMousedown": onControlMousedown,
					"onClick": onControlClick,
					"onClick:clear": (e) => onClear(e, reset),
					"role": props.role
				}, omit(fieldProps, ["onClick:clear"]), {
					"id": id.value,
					"labelId": `${id.value}-label`,
					"active": isActive.value || isDirty.value,
					"dirty": isDirty.value || props.dirty,
					"disabled": isDisabled.value,
					"focused": isFocused.value,
					"details": hasDetails.value,
					"error": isValid.value === false
				}), {
					...slots,
					default: ({ props: { class: fieldClass, ...slotProps }, controlRef }) => {
						const inputNode = createElementVNode("input", mergeProps({
							"ref": (val) => inputRef.value = controlRef.value = val,
							"value": model.value,
							"onInput": onInput,
							"autofocus": props.autofocus,
							"readonly": isReadonly.value,
							"disabled": isDisabled.value,
							"name": autocomplete.fieldName.value,
							"autocomplete": autocomplete.fieldAutocomplete.value,
							"placeholder": props.placeholder,
							"size": 1,
							"role": props.role,
							"type": props.type,
							"onFocus": focus,
							"onBlur": blur,
							"aria-labelledby": `${id.value}-label`
						}, slotProps, inputAttrs), null);
						return createElementVNode(Fragment, null, [
							props.prefix && createElementVNode("span", { "class": "v-text-field__prefix" }, [createElementVNode("span", { "class": "v-text-field__prefix__text" }, [props.prefix])]),
							withDirectives(slots.default ? createElementVNode("div", {
								"class": normalizeClass(fieldClass),
								"data-no-activator": ""
							}, [slots.default({ id }), inputNode]) : cloneVNode(inputNode, { class: fieldClass }), [[
								Intersect,
								onIntersect,
								null,
								{ once: true }
							]]),
							props.suffix && createElementVNode("span", { "class": "v-text-field__suffix" }, [createElementVNode("span", { "class": "v-text-field__suffix__text" }, [props.suffix])])
						]);
					}
				}),
				details: hasDetails ? (slotProps) => createElementVNode(Fragment, null, [slots.details?.(slotProps), hasCounter && createElementVNode(Fragment, null, [createElementVNode("span", null, null), createVNode(VCounter, {
					"active": counterActive,
					"value": counterValue.value,
					"max": max.value,
					"disabled": props.disabled
				}, slots.counter)])]) : void 0
			});
		});
		return forwardRefs({}, vInputRef, vFieldRef, inputRef);
	}
});
// packages/vue-ui/node_modules/vuetify/lib/components/VMenu/shared.js
var VMenuSymbol = Symbol.for("vuetify:v-menu");
// packages/vue-ui/node_modules/vuetify/lib/components/VOverlay/util/point.js
/** Convert a point in local space to viewport space */
function elementToViewport(point, offset) {
	return {
		x: point.x + offset.x,
		y: point.y + offset.y
	};
}
/** Get the difference between two points */
function getOffset(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y
	};
}
/** Convert an anchor object to a point in local space */
function anchorToPoint(anchor, box) {
	if (anchor.side === "top" || anchor.side === "bottom") {
		const { side, align } = anchor;
		return elementToViewport({
			x: align === "left" ? 0 : align === "center" ? box.width / 2 : align === "right" ? box.width : align,
			y: side === "top" ? 0 : side === "bottom" ? box.height : side
		}, box);
	} else if (anchor.side === "left" || anchor.side === "right") {
		const { side, align } = anchor;
		return elementToViewport({
			x: side === "left" ? 0 : side === "right" ? box.width : side,
			y: align === "top" ? 0 : align === "center" ? box.height / 2 : align === "bottom" ? box.height : align
		}, box);
	}
	return elementToViewport({
		x: box.width / 2,
		y: box.height / 2
	}, box);
}
// packages/vue-ui/node_modules/vuetify/lib/components/VOverlay/locationStrategies.js
var locationStrategies = {
	static: staticLocationStrategy,
	connected: connectedLocationStrategy
};
var makeLocationStrategyProps = propsFactory({
	locationStrategy: {
		type: [String, Function],
		default: "static",
		validator: (val) => /* @__PURE__ */ isFunction(val) || val in locationStrategies
	},
	location: String,
	origin: {
		type: String,
		default: "auto"
	},
	offset: [
		Number,
		String,
		Array
	],
	stickToTarget: Boolean,
	viewportMargin: {
		type: [Number, String],
		default: 12
	}
}, "VOverlay-location-strategies");
function useLocationStrategies(props, data) {
	const contentStyles = ref$1({});
	const updateLocation = ref$1();
	if (IN_BROWSER) useToggleScope(() => !!(data.isActive.value && props.locationStrategy), (reset) => {
		watch(() => props.locationStrategy, reset);
		onScopeDispose(() => {
			window.removeEventListener("resize", onResize);
			visualViewport?.removeEventListener("resize", onVisualResize);
			visualViewport?.removeEventListener("scroll", onVisualScroll);
			updateLocation.value = void 0;
			if (data.isActive.value) contentStyles.value = {};
		});
		window.addEventListener("resize", onResize, { passive: true });
		visualViewport?.addEventListener("resize", onVisualResize, { passive: true });
		visualViewport?.addEventListener("scroll", onVisualScroll, { passive: true });
		if (/* @__PURE__ */ isFunction(props.locationStrategy)) updateLocation.value = props.locationStrategy(data, props, contentStyles)?.updateLocation;
		else updateLocation.value = locationStrategies[props.locationStrategy](data, props, contentStyles)?.updateLocation;
	});
	function onResize(e) {
		updateLocation.value?.(e);
	}
	function onVisualResize(e) {
		updateLocation.value?.(e);
	}
	function onVisualScroll(e) {
		updateLocation.value?.(e);
	}
	return {
		contentStyles,
		updateLocation
	};
}
function getStaticLocationClasses(location) {
	if (!location) return void 0;
	const normalized = location.includes(" ") ? location : `${location} center`;
	let justify = "center";
	let align = "center";
	const inline = {
		left: "start",
		start: "start",
		right: "end",
		end: "end"
	};
	const block = {
		top: "start",
		bottom: "end"
	};
	for (const token of normalized.split(" ")) if (token in inline) justify = inline[token];
	else if (token in block) align = block[token];
	return {
		[`v-overlay--justify-${justify}`]: true,
		[`v-overlay--align-${align}`]: true
	};
}
function staticLocationStrategy(data, props, contentStyles) {
	function updateStyles() {
		if (props.origin !== "auto" && props.origin !== "overlap") {
			const { side, align } = parseAnchor(props.origin, data.isRtl.value);
			contentStyles.value = { transformOrigin: `${side} ${align}` };
		} else contentStyles.value = {};
	}
	watch([() => props.origin, data.isRtl], updateStyles, { immediate: true });
	return { updateLocation: () => {} };
}
/** Resolve a CSS length the browser understands (calc(), min(), vw, …) to pixels */
function resolveCssLength(value, container, isWidth) {
	const probe = document.createElement("div");
	probe.style.position = "absolute";
	probe.style.visibility = "hidden";
	probe.style[isWidth ? "width" : "height"] = value;
	container.appendChild(probe);
	const size = isWidth ? probe.offsetWidth : probe.offsetHeight;
	container.removeChild(probe);
	return size > 0 ? size : Infinity;
}
/** Get size of element ignoring max-width/max-height */
function getIntrinsicSize(el, isRtl) {
	const contentBox = nullifyTransforms(el);
	const computed = getComputedStyle(el);
	function offset(side) {
		return el.style[side] ? parseFloat(computed[side]) || 0 : 0;
	}
	if (isRtl) contentBox.x += offset("right");
	else contentBox.x -= offset("left");
	contentBox.y -= offset("top");
	return contentBox;
}
function connectedLocationStrategy(data, props, contentStyles) {
	if (Array.isArray(data.target.value) || isFixedPosition(data.target.value)) Object.assign(contentStyles.value, {
		position: "fixed",
		top: 0,
		[data.isRtl.value ? "right" : "left"]: 0
	});
	const { preferredAnchor, preferredOrigin } = destructComputed(() => {
		const parsedAnchor = parseAnchor(props.location ?? "bottom", data.isRtl.value);
		const parsedOrigin = props.origin === "overlap" ? parsedAnchor : props.origin === "auto" ? flipSide(parsedAnchor) : parseAnchor(props.origin, data.isRtl.value);
		if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) return {
			preferredAnchor: flipCorner(parsedAnchor),
			preferredOrigin: flipCorner(parsedOrigin)
		};
		else return {
			preferredAnchor: parsedAnchor,
			preferredOrigin: parsedOrigin
		};
	});
	const [getMinWidth, getMinHeight, getMaxWidth, getMaxHeight] = [
		"minWidth",
		"minHeight",
		"maxWidth",
		"maxHeight"
	].map((key) => {
		const isWidth = key.endsWith("Width");
		return () => {
			const raw = props[key];
			if (raw == null) return Infinity;
			const container = data.contentEl.value?.parentElement ?? document.documentElement;
			if (/* @__PURE__ */ isNumber(raw) || /^-?[\d.]+(?:px)?$/.test(raw.trim())) return parseFloat(raw);
			if (raw.endsWith("%")) {
				const box = getElementBox(container);
				return parseFloat(raw) * (isWidth ? box.width : box.height) / 100;
			}
			return resolveCssLength(raw, container, isWidth);
		};
	});
	const offset = computed(() => {
		if (Array.isArray(props.offset)) return props.offset;
		if (/* @__PURE__ */ isString(props.offset)) {
			const offset = props.offset.split(" ").map(parseFloat);
			if (offset.length < 2) offset.push(0);
			return offset;
		}
		return /* @__PURE__ */ isNumber(props.offset) ? [props.offset, 0] : [0, 0];
	});
	let observe = false;
	let lastFrame = -1;
	const flipped = new CircularBuffer(4);
	const observer = new ResizeObserver(() => {
		if (!observe) return;
		requestAnimationFrame((newTime) => {
			if (newTime !== lastFrame) flipped.clear();
			requestAnimationFrame((newNewTime) => {
				lastFrame = newNewTime;
			});
		});
		if (flipped.isFull) {
			const values = flipped.values();
			if (deepEqual(values.at(-1), values.at(-3)) && !deepEqual(values.at(-1), values.at(-2))) return;
		}
		const result = updateLocation();
		if (result) flipped.push(result.flipped);
	});
	let targetBox = new Box({
		x: 0,
		y: 0,
		width: 0,
		height: 0
	});
	watch(data.target, (newTarget, oldTarget) => {
		if (oldTarget && !Array.isArray(oldTarget)) observer.unobserve(oldTarget);
		if (!Array.isArray(newTarget)) {
			if (newTarget) observer.observe(newTarget);
		} else if (!deepEqual(newTarget, oldTarget)) updateLocation();
	}, { immediate: true });
	watch(data.contentEl, (newContentEl, oldContentEl) => {
		if (oldContentEl) observer.unobserve(oldContentEl);
		if (newContentEl) observer.observe(newContentEl);
	}, { immediate: true });
	onScopeDispose(() => {
		observer.disconnect();
	});
	function updateLocation() {
		observe = false;
		requestAnimationFrame(() => observe = true);
		if (!data.target.value || !data.contentEl.value) return;
		if (Array.isArray(data.target.value) || data.target.value.offsetParent || data.target.value.getClientRects().length) targetBox = getTargetBox(data.target.value);
		const contentBox = getIntrinsicSize(data.contentEl.value, data.isRtl.value);
		const scrollParents = getScrollParents(data.contentEl.value);
		const viewportMargin = Number(props.viewportMargin);
		const minWidth = getMinWidth();
		const minHeight = getMinHeight();
		const maxWidth = getMaxWidth();
		const maxHeight = getMaxHeight();
		if (!scrollParents.length) {
			scrollParents.push(document.documentElement);
			if (!(data.contentEl.value.style.top && data.contentEl.value.style[data.isRtl.value ? "right" : "left"])) {
				contentBox.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0);
				contentBox.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0);
			}
		}
		const viewport = scrollParents.reduce((box, el) => {
			const scrollBox = getElementBox(el);
			if (box) return new Box({
				x: Math.max(box.left, scrollBox.left),
				y: Math.max(box.top, scrollBox.top),
				width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
				height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top)
			});
			return scrollBox;
		}, void 0);
		if (props.stickToTarget) {
			viewport.x += Math.min(viewportMargin, targetBox.x);
			viewport.y += Math.min(viewportMargin, targetBox.y);
			viewport.width = Math.max(viewport.width - viewportMargin * 2, targetBox.x + targetBox.width - viewportMargin);
			viewport.height = Math.max(viewport.height - viewportMargin * 2, targetBox.y + targetBox.height - viewportMargin);
		} else {
			viewport.x += viewportMargin;
			viewport.y += viewportMargin;
			viewport.width -= viewportMargin * 2;
			viewport.height -= viewportMargin * 2;
		}
		let placement = {
			anchor: preferredAnchor.value,
			origin: preferredOrigin.value
		};
		function checkOverflow(_placement) {
			const box = new Box(contentBox);
			let { x, y } = getOffset(anchorToPoint(_placement.anchor, targetBox), anchorToPoint(_placement.origin, box));
			switch (_placement.anchor.side) {
				case "top":
					y -= offset.value[0];
					break;
				case "bottom":
					y += offset.value[0];
					break;
				case "left":
					x -= offset.value[0];
					break;
				case "right": x += offset.value[0];
			}
			switch (_placement.anchor.align) {
				case "top":
					y -= offset.value[1];
					break;
				case "bottom":
					y += offset.value[1];
					break;
				case "left":
					x -= offset.value[1];
					break;
				case "right": x += offset.value[1];
			}
			box.x += x;
			box.y += y;
			box.width = Math.min(box.width, maxWidth);
			box.height = Math.min(box.height, maxHeight);
			return {
				overflows: getOverflow(box, viewport),
				x,
				y
			};
		}
		let x = 0;
		let y = 0;
		const available = {
			x: 0,
			y: 0
		};
		const flipped = {
			x: false,
			y: false
		};
		let resets = -1;
		while (true) {
			if (resets++ > 10) {
				consoleError("Infinite loop detected in connectedLocationStrategy");
				break;
			}
			const { x: _x, y: _y, overflows } = checkOverflow(placement);
			x += _x;
			y += _y;
			contentBox.x += _x;
			contentBox.y += _y;
			{
				const axis = getAxis(placement.anchor);
				const hasOverflowX = overflows.x.before || overflows.x.after;
				const hasOverflowY = overflows.y.before || overflows.y.after;
				let reset = false;
				["x", "y"].forEach((key) => {
					if (key === "x" && hasOverflowX && !flipped.x || key === "y" && hasOverflowY && !flipped.y) {
						const newPlacement = {
							anchor: { ...placement.anchor },
							origin: { ...placement.origin }
						};
						const flip = key === "x" ? axis === "y" ? flipAlign : flipSide : axis === "y" ? flipSide : flipAlign;
						newPlacement.anchor = flip(newPlacement.anchor);
						newPlacement.origin = flip(newPlacement.origin);
						const { overflows: newOverflows } = checkOverflow(newPlacement);
						if (newOverflows[key].before <= overflows[key].before && newOverflows[key].after <= overflows[key].after || newOverflows[key].before + newOverflows[key].after < (overflows[key].before + overflows[key].after) / 2) {
							placement = newPlacement;
							reset = flipped[key] = true;
						}
					}
				});
				if (reset) continue;
			}
			if (overflows.x.before) {
				x += overflows.x.before;
				contentBox.x += overflows.x.before;
			}
			if (overflows.x.after) {
				x -= overflows.x.after;
				contentBox.x -= overflows.x.after;
			}
			if (overflows.y.before) {
				y += overflows.y.before;
				contentBox.y += overflows.y.before;
			}
			if (overflows.y.after) {
				y -= overflows.y.after;
				contentBox.y -= overflows.y.after;
			}
			{
				const overflows = getOverflow(contentBox, viewport);
				available.x = viewport.width - overflows.x.before - overflows.x.after;
				available.y = viewport.height - overflows.y.before - overflows.y.after;
				x += overflows.x.before;
				contentBox.x += overflows.x.before;
				y += overflows.y.before;
				contentBox.y += overflows.y.before;
			}
			break;
		}
		const axis = getAxis(placement.anchor);
		const transformOrigin = props.origin !== "auto" && props.origin !== "overlap" ? parseAnchor(props.origin, data.isRtl.value) : placement.origin;
		Object.assign(contentStyles.value, {
			"--v-overlay-anchor-origin": `${placement.anchor.side} ${placement.anchor.align}`,
			transformOrigin: `${transformOrigin.side} ${transformOrigin.align}`,
			top: convertToUnit(pixelRound(y)),
			left: data.isRtl.value ? void 0 : convertToUnit(pixelRound(x)),
			right: data.isRtl.value ? convertToUnit(pixelRound(-x)) : void 0,
			minWidth: convertToUnit(axis === "y" ? Math.min(minWidth, targetBox.width) : minWidth),
			maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth === Infinity ? 0 : minWidth, maxWidth))),
			maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight === Infinity ? 0 : minHeight, maxHeight)))
		});
		return {
			available,
			contentBox,
			flipped
		};
	}
	watch(() => [
		preferredAnchor.value,
		preferredOrigin.value,
		props.origin,
		props.offset,
		props.minWidth,
		props.minHeight,
		props.maxWidth,
		props.maxHeight
	], () => updateLocation());
	nextTick$1(() => {
		const result = updateLocation();
		if (!result) return;
		const { available, contentBox } = result;
		if (contentBox.height > available.y) requestAnimationFrame(() => {
			updateLocation();
			requestAnimationFrame(() => {
				updateLocation();
			});
		});
	});
	return { updateLocation };
}
function pixelRound(val) {
	return Math.round(val * devicePixelRatio) / devicePixelRatio;
}
function pixelCeil(val) {
	return Math.ceil(val * devicePixelRatio) / devicePixelRatio;
}
// packages/vue-ui/node_modules/vuetify/lib/components/VOverlay/requestNewFrame.js
var clean = true;
var frames = [];
/**
* Schedule a task to run in an animation frame on its own
* This is useful for heavy tasks that may cause jank if all ran together
*/
function requestNewFrame(cb) {
	if (!clean || frames.length) {
		frames.push(cb);
		run();
	} else {
		clean = false;
		cb();
		run();
	}
}
var raf = -1;
function run() {
	cancelAnimationFrame(raf);
	raf = requestAnimationFrame(() => {
		const frame = frames.shift();
		if (frame) frame();
		if (frames.length) run();
		else clean = true;
	});
}
// packages/vue-ui/node_modules/vuetify/lib/components/VOverlay/scrollStrategies.js
var scrollStrategies = {
	none: null,
	close: closeScrollStrategy,
	block: blockScrollStrategy,
	reposition: repositionScrollStrategy
};
var makeScrollStrategyProps = propsFactory({ scrollStrategy: {
	type: [String, Function],
	default: "block",
	validator: (val) => /* @__PURE__ */ isFunction(val) || val in scrollStrategies
} }, "VOverlay-scroll-strategies");
function useScrollStrategies(props, data) {
	if (!IN_BROWSER) return;
	let scope;
	watchEffect(async () => {
		scope?.stop();
		if (!(data.isActive.value && props.scrollStrategy)) return;
		scope = effectScope();
		await new Promise((resolve) => setTimeout(resolve));
		scope.active && scope.run(() => {
			if (/* @__PURE__ */ isFunction(props.scrollStrategy)) props.scrollStrategy(data, props, scope);
			else scrollStrategies[props.scrollStrategy]?.(data, props, scope);
		});
	});
	onScopeDispose(() => {
		scope?.stop();
	});
}
function closeScrollStrategy(data) {
	function onScroll(e) {
		data.isActive.value = false;
	}
	bindScroll(getTargetEl(data.target.value, data.contentEl.value), onScroll);
}
function blockScrollStrategy(data, props) {
	const offsetParent = data.root.value?.offsetParent;
	const target = getTargetEl(data.target.value, data.contentEl.value);
	const scrollElements = [.../* @__PURE__ */ new Set([...getScrollParents(target, props.contained ? offsetParent : void 0), ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : void 0)])].filter((el) => !el.classList.contains("v-overlay-scroll-blocked"));
	const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
	const scrollableParent = ((el) => hasScrollbar(el) && el)(offsetParent || document.documentElement);
	if (scrollableParent) data.root.value.classList.add("v-overlay--scroll-blocked");
	scrollElements.forEach((el, i) => {
		el.style.setProperty("--v-body-scroll-x", convertToUnit(-el.scrollLeft));
		el.style.setProperty("--v-body-scroll-y", convertToUnit(-el.scrollTop));
		if (el !== document.documentElement || getComputedStyle(el).overflowY !== "scroll") el.style.setProperty("--v-scrollbar-offset", convertToUnit(scrollbarWidth));
		el.classList.add("v-overlay-scroll-blocked");
	});
	onScopeDispose(() => {
		scrollElements.forEach((el, i) => {
			const x = parseFloat(el.style.getPropertyValue("--v-body-scroll-x"));
			const y = parseFloat(el.style.getPropertyValue("--v-body-scroll-y"));
			const scrollBehavior = el.style.scrollBehavior;
			el.style.scrollBehavior = "auto";
			el.style.removeProperty("--v-body-scroll-x");
			el.style.removeProperty("--v-body-scroll-y");
			el.style.removeProperty("--v-scrollbar-offset");
			el.classList.remove("v-overlay-scroll-blocked");
			el.scrollLeft = -x;
			el.scrollTop = -y;
			el.style.scrollBehavior = scrollBehavior;
		});
		if (scrollableParent) data.root.value.classList.remove("v-overlay--scroll-blocked");
	});
}
function repositionScrollStrategy(data, props, scope) {
	let slow = false;
	let raf = -1;
	let ric = -1;
	function update(e) {
		requestNewFrame(() => {
			const start = performance.now();
			data.updateLocation.value?.(e);
			slow = (performance.now() - start) / (1e3 / 60) > 2;
		});
	}
	ric = (typeof requestIdleCallback === "undefined" ? (cb) => cb() : requestIdleCallback)(() => {
		scope.run(() => {
			bindScroll(getTargetEl(data.target.value, data.contentEl.value), (e) => {
				if (slow) {
					cancelAnimationFrame(raf);
					raf = requestAnimationFrame(() => {
						raf = requestAnimationFrame(() => {
							update(e);
						});
					});
				} else update(e);
			});
		});
	});
	onScopeDispose(() => {
		typeof cancelIdleCallback !== "undefined" && cancelIdleCallback(ric);
		cancelAnimationFrame(raf);
	});
}
function getTargetEl(target, contentEl) {
	return Array.isArray(target) ? document.elementsFromPoint(...target).find((el) => !contentEl?.contains(el)) : target ?? contentEl;
}
function bindScroll(el, onScroll) {
	const scrollElements = [document, ...getScrollParents(el)];
	scrollElements.forEach((el) => {
		el.addEventListener("scroll", onScroll, { passive: true });
	});
	onScopeDispose(() => {
		scrollElements.forEach((el) => {
			el.removeEventListener("scroll", onScroll);
		});
	});
}
// packages/vue-ui/node_modules/vuetify/lib/composables/delay.js
var makeDelayProps = propsFactory({
	closeDelay: [Number, String],
	openDelay: [Number, String]
}, "delay");
function useDelay(props, cb) {
	let clearDelay = () => {};
	function runDelay(isOpening, options) {
		clearDelay?.();
		const delay = isOpening ? props.openDelay : props.closeDelay;
		const normalizedDelay = Math.max(options?.minDelay ?? 0, Number(delay ?? 0));
		return new Promise((resolve) => {
			clearDelay = defer(normalizedDelay, () => {
				cb?.(isOpening);
				resolve(isOpening);
			});
		});
	}
	function runOpenDelay() {
		return runDelay(true);
	}
	function runCloseDelay(options) {
		return runDelay(false, options);
	}
	return {
		clearDelay,
		runOpenDelay,
		runCloseDelay
	};
}
// packages/vue-ui/node_modules/vuetify/lib/directives/touch-hold/index.js
function preventCallout(el) {
	el.style.setProperty("-webkit-touch-callout", "none");
}
var lockedStyles = ["-webkit-user-select", "user-select"];
function lockStyles(el) {
	const previous = lockedStyles.map((p) => el.style.getPropertyValue(p));
	lockedStyles.forEach((p) => el.style.setProperty(p, "none"));
	return () => lockedStyles.forEach((p, i) => previous[i] ? el.style.setProperty(p, previous[i]) : el.style.removeProperty(p));
}
var claimed = /* @__PURE__ */ new WeakSet();
function createTouchHold(options) {
	let timer = -1;
	let held = false;
	let handling = false;
	let press;
	const state = {
		options,
		onTouchstart,
		onMousedown,
		cancel: end
	};
	function onTouchstart(e) {
		end();
		held = false;
		if (e.touches.length > 1 || claimed.has(e)) return;
		claimed.add(e);
		const el = e.currentTarget;
		const { clientX, clientY } = e.touches[0];
		const target = e.target;
		press = {
			el,
			x: clientX,
			y: clientY,
			unlock: lockStyles(el),
			detach: () => {
				target.removeEventListener("touchmove", onTouchmove);
				target.removeEventListener("touchend", onTouchend);
				target.removeEventListener("touchcancel", onTouchend);
				window.removeEventListener("contextmenu", onContextmenu, { capture: true });
			}
		};
		target.addEventListener("touchmove", onTouchmove, { passive: true });
		target.addEventListener("touchend", onTouchend, { passive: false });
		target.addEventListener("touchcancel", onTouchend);
		window.addEventListener("contextmenu", onContextmenu, { capture: true });
		timer = window.setTimeout(() => trigger(e, true), state.options.duration ?? 500);
	}
	function onMousedown(e) {
		end();
		held = false;
		if (e.button !== 0 || claimed.has(e)) return;
		claimed.add(e);
		press = {
			el: e.currentTarget,
			x: e.clientX,
			y: e.clientY,
			detach: () => {
				window.removeEventListener("mousemove", onMousemove);
				window.removeEventListener("click", onClick, { capture: true });
			}
		};
		window.addEventListener("mousemove", onMousemove, { passive: true });
		window.addEventListener("click", onClick, { capture: true });
		timer = window.setTimeout(() => trigger(e, false), state.options.duration ?? 500);
	}
	function trigger(originalEvent, touch) {
		clearTimeout(timer);
		held = true;
		getSelection()?.removeAllRanges();
		handling = true;
		try {
			state.options.handler({
				originalEvent,
				touch,
				target: press.el,
				clientX: press.x,
				clientY: press.y
			});
		} finally {
			handling = false;
		}
	}
	function onTouchmove(e) {
		if (!press || held) return;
		const { clientX, clientY } = e.touches[0];
		if (e.touches.length > 1 || Math.hypot(clientX - press.x, clientY - press.y) > 10) end();
	}
	function onTouchend(e) {
		if (held && e.cancelable) e.preventDefault();
		end();
	}
	function onMousemove(e) {
		if (!press || held) return;
		if (Math.hypot(e.clientX - press.x, e.clientY - press.y) > 10) end();
	}
	function onClick(e) {
		if (held) {
			e.preventDefault();
			e.stopImmediatePropagation();
		}
		end();
	}
	function onContextmenu(e) {
		if (handling || !press?.el.contains(e.target)) return;
		e.preventDefault();
		e.stopImmediatePropagation();
		if (!held) trigger(e, true);
	}
	function end() {
		clearTimeout(timer);
		if (!press) return;
		const { detach, unlock } = press;
		press = void 0;
		detach();
		if (!unlock) return;
		if (held) setTimeout(unlock, 10);
		else unlock();
	}
	return state;
}
// packages/vue-ui/node_modules/vuetify/lib/components/VOverlay/useActivator.js
var makeActivatorProps = propsFactory({
	target: [String, Object],
	activator: [String, Object],
	activatorProps: {
		type: Object,
		default: () => ({})
	},
	openOnClick: {
		type: Boolean,
		default: void 0
	},
	openOnHover: Boolean,
	openOnFocus: {
		type: Boolean,
		default: void 0
	},
	contextMenu: Boolean,
	closeOnContentClick: Boolean,
	...makeDelayProps()
}, "VOverlay-activator");
function useActivator(props, { isActive, isTop, contentEl, isSubmenu = false }) {
	const vm = getCurrentInstance$1("useActivator");
	const activatorEl = ref$1();
	const parentMenu = inject(VMenuSymbol, null);
	let isHovered = false;
	let isFocused = false;
	let firstEnter = true;
	const openedByHover = ref$1(false);
	let delayCallbackFiredOpen = false;
	const shouldCloseOnLeave = () => !isSubmenu || (parentMenu?.rootOpenedByHover?.() ?? openedByHover.value);
	const openOnFocus = computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
	const openOnClick = computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value && !props.contextMenu);
	const { runOpenDelay, runCloseDelay } = useDelay(props, (value) => {
		if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused) && !(props.openOnHover && isActive.value && !isTop.value)) {
			if (isActive.value !== value) {
				firstEnter = true;
				if (value) {
					delayCallbackFiredOpen = true;
					openedByHover.value = isHovered && props.openOnHover;
				}
			}
			isActive.value = value;
		}
	});
	let reopenLock = false;
	watch(isActive, (v) => {
		if (!v) {
			reopenLock = true;
			setTimeout(() => reopenLock = false, 50);
			openedByHover.value = false;
			delayCallbackFiredOpen = false;
			return;
		}
		if (!delayCallbackFiredOpen) openedByHover.value = false;
		delayCallbackFiredOpen = false;
	});
	const cursorTarget = ref$1();
	let cursorOffset;
	function setCursorTarget(point) {
		cursorTarget.value = point;
		const rect = activatorEl.value?.getBoundingClientRect();
		cursorOffset = point && rect && [point[0] - rect.left, point[1] - rect.top];
	}
	const touchHold = createTouchHold({ handler: ({ originalEvent, clientX, clientY }) => {
		originalEvent.target.dispatchEvent(new MouseEvent("contextmenu", {
			bubbles: true,
			cancelable: true,
			clientX,
			clientY
		}));
	} });
	const availableEvents = {
		onClick: (e) => {
			if (reopenLock && !isActive.value) return;
			e.stopPropagation();
			activatorEl.value = e.currentTarget || e.target;
			if (!isActive.value) setCursorTarget([e.clientX, e.clientY]);
			isActive.value = !isActive.value;
		},
		onMouseenter: (e) => {
			isHovered = true;
			activatorEl.value = e.currentTarget || e.target;
			if (props.target === "cursor") setCursorTarget([e.clientX, e.clientY]);
			runOpenDelay();
		},
		onMousemove: (e) => {
			setCursorTarget([e.clientX, e.clientY]);
		},
		onMouseleave: (e) => {
			isHovered = false;
			if (props.target === "cursor") isFocused = false;
			if (shouldCloseOnLeave()) runCloseDelay();
		},
		onFocus: (e) => {
			if (reopenLock) return;
			if (matchesSelector(e.target, ":focus-visible") === false) return;
			isFocused = true;
			e.stopPropagation();
			activatorEl.value = e.currentTarget || e.target;
			runOpenDelay();
		},
		onContextmenu: (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (isActive.value) {
				isActive.value = false;
				return;
			}
			activatorEl.value = e.currentTarget || e.target;
			setCursorTarget(e.clientX || e.clientY ? [e.clientX, e.clientY] : void 0);
			isActive.value = true;
		},
		onTouchstart: touchHold.onTouchstart,
		onBlur: (e) => {
			const next = e.relatedTarget;
			if (!next || contentEl.value?.contains(next)) return;
			isFocused = false;
			e.stopPropagation();
			runCloseDelay({ minDelay: 1 });
		}
	};
	const activatorEvents = computed(() => {
		const events = {};
		if (openOnClick.value) events.onClick = availableEvents.onClick;
		if (props.openOnHover) {
			events.onMouseenter = availableEvents.onMouseenter;
			events.onMouseleave = availableEvents.onMouseleave;
			if (props.target === "cursor" && !openOnClick.value) events.onMousemove = availableEvents.onMousemove;
		}
		if (props.contextMenu) {
			events.onContextmenu = availableEvents.onContextmenu;
			events.onTouchstart = availableEvents.onTouchstart;
		}
		if (openOnFocus.value) {
			events.onFocus = availableEvents.onFocus;
			events.onBlur = availableEvents.onBlur;
		}
		return events;
	});
	const contentEvents = computed(() => {
		const events = {};
		if (props.openOnHover) {
			events.onMouseenter = () => {
				isHovered = true;
				runOpenDelay();
			};
			events.onMouseleave = () => {
				isHovered = false;
				if (shouldCloseOnLeave()) runCloseDelay();
			};
		}
		if (openOnFocus.value) {
			events.onFocusin = (e) => {
				if (!e.target.matches(":focus-visible")) return;
				isFocused = true;
				runOpenDelay();
			};
			events.onFocusout = (e) => {
				const next = e.relatedTarget;
				if (!next || contentEl.value?.contains(next)) return;
				isFocused = false;
				runCloseDelay({ minDelay: 1 });
			};
		}
		if (props.closeOnContentClick) {
			const menu = inject(VMenuSymbol, null);
			events.onClick = () => {
				isActive.value = false;
				menu?.closeParents();
			};
		}
		return events;
	});
	const scrimEvents = computed(() => {
		const events = {};
		if (props.openOnHover) {
			events.onMouseenter = () => {
				if (firstEnter) {
					isHovered = true;
					firstEnter = false;
					runOpenDelay();
				}
			};
			events.onMouseleave = () => {
				isHovered = false;
				if (shouldCloseOnLeave()) runCloseDelay();
			};
		}
		return events;
	});
	watch(isTop, (val) => {
		if (val && shouldCloseOnLeave() && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered)) && !contentEl.value?.contains(getActiveElement())) runCloseDelay();
	});
	function onScroll() {
		const rect = activatorEl.value?.getBoundingClientRect();
		if (!cursorOffset || !rect) return;
		cursorTarget.value = [rect.left + cursorOffset[0], rect.top + cursorOffset[1]];
	}
	watch(isActive, (val, _, onCleanup) => {
		if (!val || !props.contextMenu || props.target) return;
		document.addEventListener("scroll", onScroll, {
			capture: true,
			passive: true
		});
		onCleanup(() => document.removeEventListener("scroll", onScroll, { capture: true }));
	});
	watchEffect(() => {
		if (activatorEl.value && props.contextMenu) preventCallout(activatorEl.value);
	});
	function onAfterLeave() {
		if (!isActive.value) setCursorTarget(void 0);
	}
	const activatorRef = templateRef();
	watchEffect(() => {
		if (!activatorRef.value) return;
		nextTick$1(() => {
			activatorEl.value = activatorRef.el;
		});
	});
	const targetRef = templateRef();
	const target = computed(() => {
		if ((props.target === "cursor" || props.contextMenu && !props.target) && cursorTarget.value) return cursorTarget.value;
		if (targetRef.value) return targetRef.el;
		return getTarget(props.target, vm) || activatorEl.value;
	});
	const targetEl = computed(() => {
		return Array.isArray(target.value) ? void 0 : target.value;
	});
	let scope;
	watch(() => !!props.activator, (val) => {
		if (val && IN_BROWSER) {
			scope = effectScope();
			scope.run(() => {
				_useActivator(props, vm, {
					activatorEl,
					activatorEvents
				});
			});
		} else if (scope) scope.stop();
	}, {
		flush: "post",
		immediate: true
	});
	onScopeDispose(() => {
		touchHold.cancel();
		scope?.stop();
	});
	return {
		activatorEl,
		activatorRef,
		target,
		targetEl,
		targetRef,
		activatorEvents,
		contentEvents,
		scrimEvents,
		openedByHover,
		onAfterLeave
	};
}
function _useActivator(props, vm, { activatorEl, activatorEvents }) {
	watch(() => props.activator, (val, oldVal) => {
		if (oldVal && val !== oldVal) {
			const activator = getActivator(oldVal);
			activator && unbindActivatorProps(activator);
		}
		if (val) nextTick$1(() => bindActivatorProps());
	}, { immediate: true });
	watch(() => props.activatorProps, () => {
		bindActivatorProps();
	});
	onScopeDispose(() => {
		unbindActivatorProps();
	});
	function bindActivatorProps(el = getActivator(), _props = props.activatorProps) {
		if (!el) return;
		bindProps(el, mergeProps(activatorEvents.value, _props));
	}
	function unbindActivatorProps(el = getActivator(), _props = props.activatorProps) {
		if (!el) return;
		unbindProps(el, mergeProps(activatorEvents.value, _props));
	}
	function getActivator(selector = props.activator) {
		const activator = getTarget(selector, vm);
		activatorEl.value = activator?.nodeType === Node.ELEMENT_NODE ? activator : void 0;
		return activatorEl.value;
	}
}
function getTarget(selector, vm) {
	if (!selector) return;
	let target;
	if (selector === "parent") {
		let el = vm?.proxy?.$el?.parentNode;
		while (el?.hasAttribute("data-no-activator")) el = el.parentNode;
		target = el;
	} else if (/* @__PURE__ */ isString(selector)) target = document.querySelector(selector);
	else if ("$el" in selector) target = selector.$el;
	else target = selector;
	return target;
}
// packages/vue-ui/node_modules/vuetify/lib/composables/focusTrap.js
var makeFocusTrapProps = propsFactory({
	retainFocus: Boolean,
	captureFocus: Boolean,
	/** @deprecated */
	disableInitialFocus: Boolean
}, "focusTrap");
var registry = /* @__PURE__ */ new Map();
var subscribers = 0;
function lastActiveTrap() {
	let el;
	for (const { isActive, contentEl } of registry.values()) if (isActive.value && contentEl.value) el = contentEl.value;
	return el;
}
function onKeydown(e) {
	const activeElement = getActiveElement();
	if (e.key !== "Tab" || !activeElement) return;
	const parentTraps = Array.from(registry.values()).filter(({ isActive, contentEl }) => isActive.value && contentEl.value?.contains(activeElement)).map((x) => x.contentEl.value);
	let closestTrap;
	let currentNode = activeElement;
	while (currentNode) {
		if (parentTraps.includes(currentNode)) {
			closestTrap = currentNode;
			break;
		}
		currentNode = currentNode.parentElement;
	}
	if (!closestTrap) {
		const trapEl = lastActiveTrap();
		if (!trapEl) return;
		const focusable = focusableChildren(trapEl).filter((x) => x.tabIndex >= 0);
		e.preventDefault();
		if (!focusable.length) trapEl.focus({ preventScroll: true });
		else if (e.shiftKey) focusable[focusable.length - 1].focus();
		else focusable[0].focus();
		return;
	}
	const focusable = focusableChildren(closestTrap).filter((x) => x.tabIndex >= 0);
	if (!focusable.length) return;
	if (focusable.length === 1 && focusable[0].classList.contains("v-list") && focusable[0].contains(activeElement)) {
		e.preventDefault();
		return;
	}
	const firstElement = focusable[0];
	const lastElement = focusable[focusable.length - 1];
	const atFirst = activeElement === firstElement || activeElement === closestTrap || firstElement.classList.contains("v-list") && firstElement.contains(activeElement);
	const atLast = activeElement === lastElement || lastElement.classList.contains("v-list") && lastElement.contains(activeElement);
	if (e.shiftKey && atFirst) {
		e.preventDefault();
		lastElement.focus();
	}
	if (!e.shiftKey && atLast) {
		e.preventDefault();
		firstElement.focus();
	}
}
function useFocusTrap(props, { isActive, localTop, contentEl }) {
	const trapId = Symbol("trap");
	let focusTrapSuppressed = false;
	let focusTrapSuppressionTimeout = -1;
	async function onPointerdown() {
		focusTrapSuppressed = true;
		focusTrapSuppressionTimeout = window.setTimeout(() => {
			focusTrapSuppressed = false;
		}, 100);
	}
	async function captureOnFocus(e) {
		const before = e.relatedTarget;
		const after = e.target;
		document.removeEventListener("pointerdown", onPointerdown);
		document.removeEventListener("keydown", captureOnKeydown);
		await new Promise((resolve) => requestAnimationFrame(resolve));
		if (isActive.value && !focusTrapSuppressed && before !== after && contentEl.value && toValue(localTop) && ![document, contentEl.value].includes(after) && !contentEl.value.contains(after)) focusableChildren(contentEl.value)[0]?.focus();
	}
	function captureOnKeydown(e) {
		if (e.key !== "Tab") return;
		document.removeEventListener("keydown", captureOnKeydown);
		if (isActive.value && contentEl.value && e.target && !contentEl.value.contains(e.target)) {
			const allFocusableElements = focusableChildren(document.documentElement);
			if (e.shiftKey && e.target === allFocusableElements.at(0) || !e.shiftKey && e.target === allFocusableElements.at(-1)) {
				const focusable = focusableChildren(contentEl.value);
				if (focusable.length > 0) {
					e.preventDefault();
					focusable[0].focus();
				}
			}
		}
	}
	const shouldCapture = toRef(() => isActive.value && props.captureFocus && !props.disableInitialFocus);
	if (IN_BROWSER) {
		watch(() => props.retainFocus, (val) => {
			if (val) registry.set(trapId, {
				isActive,
				contentEl
			});
			else registry.delete(trapId);
		}, { immediate: true });
		watch(shouldCapture, (val) => {
			if (val) {
				document.addEventListener("pointerdown", onPointerdown);
				document.addEventListener("focusin", captureOnFocus, { once: true });
				document.addEventListener("keydown", captureOnKeydown);
			} else {
				document.removeEventListener("pointerdown", onPointerdown);
				document.removeEventListener("focusin", captureOnFocus);
				document.removeEventListener("keydown", captureOnKeydown);
			}
		}, { immediate: true });
		if (subscribers++ < 1) document.addEventListener("keydown", onKeydown);
	}
	onScopeDispose(() => {
		registry.delete(trapId);
		if (!IN_BROWSER) return;
		clearTimeout(focusTrapSuppressionTimeout);
		document.removeEventListener("pointerdown", onPointerdown);
		document.removeEventListener("focusin", captureOnFocus);
		document.removeEventListener("keydown", captureOnKeydown);
		if (--subscribers < 1) document.removeEventListener("keydown", onKeydown);
	});
}
// packages/vue-ui/node_modules/vuetify/lib/composables/display.js
var breakpoints = [
	"sm",
	"md",
	"lg",
	"xl",
	"xxl"
];
var DisplaySymbol = Symbol.for("vuetify:display");
var defaultDisplayOptions = {
	mobileBreakpoint: "lg",
	thresholds: {
		xs: 0,
		sm: 600,
		md: 840,
		lg: 1145,
		xl: 1545,
		xxl: 2138
	}
};
var parseDisplayOptions = (options = defaultDisplayOptions) => {
	return mergeDeep(defaultDisplayOptions, options);
};
function getPlatform(ssr) {
	const userAgent = IN_BROWSER && !ssr ? window.navigator.userAgent : "ssr";
	function match(regexp) {
		return Boolean(userAgent.match(regexp));
	}
	return {
		android: match(/android/i),
		ios: match(/iphone|ipad|ipod/i),
		cordova: match(/cordova/i),
		electron: match(/electron/i),
		chrome: match(/chrome/i),
		edge: match(/edge/i),
		firefox: match(/firefox/i),
		opera: match(/opera/i),
		win: match(/win/i),
		mac: match(/mac/i),
		linux: match(/linux/i),
		touch: SUPPORTS_TOUCH,
		ssr: userAgent === "ssr"
	};
}
function createDisplay(options, ssr) {
	const { thresholds, mobileBreakpoint } = parseDisplayOptions(options);
	const ssrSize = /* @__PURE__ */ isObject(ssr) ? ssr : ssr ? {
		clientWidth: 0,
		clientHeight: 0
	} : void 0;
	const screen = createBreakpoints({
		breakpoints: thresholds,
		mobileBreakpoint,
		ssr: ssrSize
	});
	const platform = shallowRef(getPlatform(ssr));
	const resizeScope = ssrSize ? effectScope() : void 0;
	function update() {
		if (resizeScope) resizeScope.run(() => screen.update());
		else screen.update();
		platform.value = getPlatform();
	}
	return {
		xs: screen.xs,
		sm: screen.sm,
		md: screen.md,
		lg: screen.lg,
		xl: screen.xl,
		xxl: screen.xxl,
		smAndUp: screen.smAndUp,
		mdAndUp: screen.mdAndUp,
		lgAndUp: screen.lgAndUp,
		xlAndUp: screen.xlAndUp,
		smAndDown: screen.smAndDown,
		mdAndDown: screen.mdAndDown,
		lgAndDown: screen.lgAndDown,
		xlAndDown: screen.xlAndDown,
		name: screen.name,
		height: screen.height,
		width: screen.width,
		mobile: screen.isMobile,
		mobileBreakpoint: shallowRef(mobileBreakpoint),
		platform,
		thresholds: shallowRef(thresholds),
		ssr: !!ssr,
		update
	};
}
function useDisplay(props = { mobile: null }, name = getCurrentInstanceName()) {
	const display = inject(DisplaySymbol);
	if (!display) throw new Error("Could not find Vuetify display injection");
	function isBelow(px, width, matchWithMediaQuery) {
		return matchWithMediaQuery ? !window.matchMedia(`(min-width: ${px}px)`).matches : width < px;
	}
	const mobile = computed(() => {
		const width = display.width.value;
		const matchWithMediaQuery = SUPPORTS_MATCH_MEDIA && !display.platform.value.ssr;
		if (props.mobile) return true;
		else if (/* @__PURE__ */ isNumber(props.mobileBreakpoint)) return isBelow(props.mobileBreakpoint, width, matchWithMediaQuery);
		else if (props.mobileBreakpoint) return isBelow(display.thresholds.value[props.mobileBreakpoint], width, matchWithMediaQuery);
		else if (/* @__PURE__ */ isNull(props.mobile)) return display.mobile.value;
		else return false;
	});
	const displayClasses = toRef(() => {
		if (!name) return {};
		return { [`${name}--mobile`]: mobile.value };
	});
	return {
		...display,
		displayClasses,
		mobile
	};
}
// packages/vue-ui/node_modules/vuetify/lib/composables/hydration.js
function useHydration() {
	if (!IN_BROWSER) return shallowRef(false);
	const { ssr } = useDisplay();
	if (ssr) {
		const isMounted = shallowRef(false);
		onMounted(() => {
			isMounted.value = true;
		});
		return isMounted;
	} else return shallowRef(true);
}
// packages/vue-ui/node_modules/vuetify/lib/composables/lazy.js
var makeLazyProps = propsFactory({ eager: Boolean }, "lazy");
function useLazy(props, active) {
	const isBooted = shallowRef(false);
	const hasContent = toRef(() => isBooted.value || props.eager || active.value);
	watch(active, () => isBooted.value = true);
	function onAfterLeave() {
		if (!props.eager) isBooted.value = false;
	}
	return {
		isBooted,
		hasContent,
		onAfterLeave
	};
}
// packages/vue-ui/node_modules/vuetify/lib/composables/scopeId.js
function useScopeId() {
	const scopeId = getCurrentInstance$1("useScopeId").vnode.scopeId;
	return { scopeId: scopeId ? { [scopeId]: "" } : void 0 };
}
// packages/vue-ui/node_modules/vuetify/lib/composables/stack.js
var StackSymbol = Symbol.for("vuetify:stack");
var globalStack = reactive([]);
function useStack(isActive, zIndex, disableGlobalStack) {
	const vm = getCurrentInstance$1("useStack");
	const createStackEntry = !disableGlobalStack;
	const parent = inject(StackSymbol, void 0);
	const stack = reactive({ activeChildren: /* @__PURE__ */ new Set() });
	provide(StackSymbol, stack);
	const _zIndex = shallowRef(Number(toValue(zIndex)));
	useToggleScope(isActive, () => {
		const lastZIndex = globalStack.at(-1)?.[1];
		_zIndex.value = lastZIndex ? lastZIndex + 10 : Number(toValue(zIndex));
		if (createStackEntry) globalStack.push([vm.uid, _zIndex.value]);
		parent?.activeChildren.add(vm.uid);
		onScopeDispose(() => {
			if (createStackEntry) {
				const idx = toRaw(globalStack).findIndex((v) => v[0] === vm.uid);
				globalStack.splice(idx, 1);
			}
			parent?.activeChildren.delete(vm.uid);
		});
	});
	const globalTop = shallowRef(true);
	if (createStackEntry) watchEffect(() => {
		const _isTop = globalStack.at(-1)?.[0] === vm.uid;
		setTimeout(() => globalTop.value = _isTop);
	});
	const localTop = toRef(() => !stack.activeChildren.size);
	return {
		globalTop: readonly(globalTop),
		localTop,
		stackStyles: toRef(() => ({ zIndex: _zIndex.value }))
	};
}
// packages/vue-ui/node_modules/vuetify/lib/composables/teleport.js
function useTeleport(target) {
	return { teleportTarget: computed(() => {
		const _target = target();
		if (_target === true || !IN_BROWSER) return void 0;
		const targetElement = _target === false ? document.body : /* @__PURE__ */ isString(_target) ? document.querySelector(_target) : _target;
		if (!targetElement) {
			warn(`Unable to locate target ${_target}`);
			return;
		}
		let container = [...targetElement.children].find((el) => el.matches(".v-overlay-container"));
		if (!container) {
			container = document.createElement("div");
			container.className = "v-overlay-container";
			targetElement.appendChild(container);
		}
		return container;
	}) };
}
// packages/vue-ui/node_modules/vuetify/lib/directives/click-outside/index.js
function defaultConditional() {
	return true;
}
function checkEvent(e, el, binding, ignoreActive = false) {
	if (!e || !ignoreActive && checkIsActive(e, binding) === false) return false;
	const root = attachedRoot(el);
	if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot && root.host === e.target) return false;
	const value = binding.value;
	const elements = ((/* @__PURE__ */ isFunction(value) ? void 0 : value.include) || (() => []))();
	elements.push(el);
	return !elements.some((el) => el?.contains(e.target));
}
function checkIsActive(e, binding) {
	const value = binding.value;
	return ((/* @__PURE__ */ isFunction(value) ? void 0 : value.closeConditional) || defaultConditional)(e);
}
function directive(e, el, binding, pressedOutside = el._clickOutside.lastMousedownWasOutside) {
	const handler = /* @__PURE__ */ isFunction(binding.value) ? binding.value : binding.value.handler;
	e.shadowTarget = e.target;
	pressedOutside && checkEvent(e, el, binding) && setTimeout(() => {
		checkIsActive(e, binding) && handler && handler(e);
	}, 0);
}
function handleShadow(el, callback) {
	const root = attachedRoot(el);
	callback(document);
	if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot) callback(root);
}
var ClickOutside = {
	mounted(el, binding) {
		const onClick = (e) => directive(e, el, binding);
		const onContextmenu = (e) => directive(e, el, binding, true);
		const onAuxclick = (e) => e.button !== 2 && onClick(e);
		const onMousedown = (e) => {
			el._clickOutside.lastMousedownWasOutside = checkEvent(e, el, binding, true);
		};
		handleShadow(el, (app) => {
			app.addEventListener("click", onClick, true);
			app.addEventListener("auxclick", onAuxclick, true);
			app.addEventListener("contextmenu", onContextmenu, true);
			app.addEventListener("mousedown", onMousedown, true);
		});
		if (!el._clickOutside) el._clickOutside = { lastMousedownWasOutside: false };
		el._clickOutside[binding.instance.$.uid] = {
			onClick,
			onAuxclick,
			onContextmenu,
			onMousedown
		};
	},
	beforeUnmount(el, binding) {
		if (!el._clickOutside) return;
		handleShadow(el, (app) => {
			if (!app || !el._clickOutside?.[binding.instance.$.uid]) return;
			const { onClick, onAuxclick, onContextmenu, onMousedown } = el._clickOutside[binding.instance.$.uid];
			app.removeEventListener("click", onClick, true);
			app.removeEventListener("auxclick", onAuxclick, true);
			app.removeEventListener("contextmenu", onContextmenu, true);
			app.removeEventListener("mousedown", onMousedown, true);
		});
		delete el._clickOutside[binding.instance.$.uid];
	}
};
// packages/vue-ui/node_modules/vuetify/lib/components/VOverlay/VOverlay.js
var overlayActivators = /* @__PURE__ */ new WeakMap();
function Scrim(props) {
	const { modelValue, color, ...rest } = props;
	return createVNode(Transition, {
		"name": "fade-transition",
		"appear": true
	}, { default: () => [props.modelValue && createElementVNode("div", mergeProps({
		"class": ["v-overlay__scrim", props.color.backgroundColorClasses.value],
		"style": props.color.backgroundColorStyles.value
	}, rest), null)] });
}
var makeVOverlayProps = propsFactory({
	absolute: Boolean,
	attach: [
		Boolean,
		String,
		Object
	],
	closeOnBack: {
		type: Boolean,
		default: true
	},
	contained: Boolean,
	contentClass: null,
	contentProps: null,
	disabled: Boolean,
	opacity: [Number, String],
	noClickAnimation: Boolean,
	modelValue: Boolean,
	persistent: Boolean,
	scrim: {
		type: [Boolean, String],
		default: true
	},
	zIndex: {
		type: [Number, String],
		default: 2e3
	},
	...makeActivatorProps(),
	...makeComponentProps(),
	...makeDimensionProps(),
	...makeLazyProps(),
	...makeLocationStrategyProps(),
	...makeScrollStrategyProps(),
	...makeFocusTrapProps(),
	...makeThemeProps(),
	...makeTransitionProps()
}, "VOverlay");
var VOverlay = genericComponent()({
	name: "VOverlay",
	directives: { vClickOutside: ClickOutside },
	inheritAttrs: false,
	props: {
		_disableGlobalStack: Boolean,
		_submenu: Boolean,
		...omit(makeVOverlayProps(), ["disableInitialFocus"])
	},
	emits: {
		"click:outside": (e) => true,
		"update:modelValue": (value) => true,
		keydown: (e) => true,
		afterEnter: () => true,
		afterLeave: () => true
	},
	setup(props, { slots, attrs, emit }) {
		const vm = getCurrentInstance$1("VOverlay");
		const root = ref$1();
		const scrimEl = ref$1();
		const contentEl = ref$1();
		const model = useProxiedModel(props, "modelValue");
		const isActive = computed({
			get: () => model.value,
			set: (v) => {
				if (!(v && props.disabled)) model.value = v;
			}
		});
		const { themeClasses } = provideTheme(props);
		const { rtlClasses, isRtl } = useRtl();
		const { hasContent, onAfterLeave: _onAfterLeave } = useLazy(props, isActive);
		const scrimColor = useBackgroundColor(() => {
			return /* @__PURE__ */ isString(props.scrim) ? props.scrim : null;
		});
		const { globalTop, localTop, stackStyles } = useStack(isActive, () => props.zIndex, props._disableGlobalStack);
		const { activatorEl, activatorRef, target, targetEl, targetRef, activatorEvents, onAfterLeave: _onActivatorAfterLeave, contentEvents, scrimEvents, openedByHover } = useActivator(props, {
			isActive,
			isTop: localTop,
			contentEl,
			isSubmenu: props._submenu
		});
		const { teleportTarget } = useTeleport(() => {
			const target = props.attach || props.contained;
			if (target) return target;
			const rootNode = activatorEl?.value?.getRootNode() || vm.proxy?.$el?.getRootNode();
			if (rootNode instanceof ShadowRoot) return rootNode;
			return false;
		});
		const { dimensionStyles } = useDimension(props);
		const isMounted = useHydration();
		const staticLocationClasses = computed(() => {
			return props.locationStrategy === "static" ? getStaticLocationClasses(props.location) : void 0;
		});
		const { scopeId } = useScopeId();
		watch(() => props.disabled, (v) => {
			if (v) isActive.value = false;
		});
		const { contentStyles, updateLocation } = useLocationStrategies(props, {
			isRtl,
			contentEl,
			target,
			isActive
		});
		useScrollStrategies(props, {
			root,
			contentEl,
			targetEl,
			target,
			isActive,
			updateLocation
		});
		const menu = inject(VMenuSymbol, null);
		if (vm.parent?.type?.name !== "VMenu") provide(VMenuSymbol, null);
		function onClickOutside(e) {
			emit("click:outside", e);
			if (!props.persistent) isActive.value = false;
			else animateClick();
			if (!props.scrim) menu?.closeParents(e);
		}
		function closeConditional(e) {
			return isActive.value && localTop.value && (!props.scrim || e.target === scrimEl.value || e instanceof MouseEvent && e.shadowTarget === scrimEl.value);
		}
		useFocusTrap(props, {
			isActive,
			localTop,
			contentEl
		});
		let openedWithActivatorFocus = false;
		watchEffect(() => {
			if (!contentEl.value) return;
			if (activatorEl.value) overlayActivators.set(contentEl.value, activatorEl.value);
			else overlayActivators.delete(contentEl.value);
		});
		function ownsFocus(activeElement) {
			let current = activeElement;
			const visited = /* @__PURE__ */ new Set();
			while (current) {
				const el = current.closest(".v-overlay__content");
				if (!el || visited.has(el)) return false;
				if (el === contentEl.value) return true;
				visited.add(el);
				current = overlayActivators.get(el) ?? null;
			}
			return false;
		}
		function returnFocusToActivator() {
			const el = activatorEl.value;
			if (!el || !el.isConnected) return;
			if (el.closest(".v-overlay__content")) return;
			if (contentEl.value?._clickOutside?.lastMousedownWasOutside) return;
			const activeEl = getActiveElement();
			if (!((!activeEl || activeEl === document.body) && openedWithActivatorFocus || activeEl === el || el.contains(activeEl) || ownsFocus(activeEl))) return;
			const parent = el.parentElement;
			const focusableInParent = parent ? focusableChildren(parent) : [];
			let target;
			if (focusableInParent.includes(el)) target = el;
			else {
				const focusableWithin = focusableChildren(el);
				target = focusableWithin.find((x) => x.tagName === "INPUT" || x.tagName === "TEXTAREA") ?? focusableWithin[0];
			}
			target?.focus({ preventScroll: true });
		}
		watch(isActive, (val) => {
			if (val) {
				const activeEl = getActiveElement();
				const el = activatorEl.value;
				openedWithActivatorFocus = !!el && (activeEl === el || el.contains(activeEl));
				if (contentEl.value) contentEl.value.inert = false;
				if (contentEl.value?._clickOutside) contentEl.value._clickOutside.lastMousedownWasOutside = false;
			} else {
				if (contentEl.value) contentEl.value.inert = true;
				returnFocusToActivator();
			}
		}, { flush: "post" });
		IN_BROWSER && watch(isActive, (val) => {
			if (val) window.addEventListener("keydown", onKeydown);
			else window.removeEventListener("keydown", onKeydown);
		}, { immediate: true });
		onBeforeUnmount(() => {
			if (!IN_BROWSER) return;
			window.removeEventListener("keydown", onKeydown);
		});
		function onKeydown(e) {
			if (e.key === "Escape" && globalTop.value) {
				if (!contentEl.value?.contains(getActiveElement())) emit("keydown", e);
				if (!props.persistent) {
					isActive.value = false;
					if (contentEl.value?.contains(getActiveElement())) activatorEl.value?.focus();
				} else animateClick();
			}
		}
		function onKeydownSelf(e) {
			if (e.key === "Escape" && !globalTop.value) return;
			emit("keydown", e);
		}
		const router = useRouter();
		useToggleScope(() => props.closeOnBack, () => {
			useBackButton(router, () => {
				if (globalTop.value && isActive.value) {
					if (!props.persistent) isActive.value = false;
					else animateClick();
					return false;
				}
			});
		});
		const top = ref$1();
		watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, (val) => {
			if (val) {
				const scrollParent = getScrollParent(root.value);
				if (scrollParent && scrollParent !== document.scrollingElement) top.value = scrollParent.scrollTop;
			}
		});
		function animateClick() {
			if (props.noClickAnimation) return;
			contentEl.value && animate(contentEl.value, [
				{ transformOrigin: "center" },
				{ transform: "scale(1.03)" },
				{ transformOrigin: "center" }
			], {
				duration: 150,
				easing: "cubic-bezier(0.4, 0, 0.2, 1)"
			});
		}
		function onAfterEnter() {
			emit("afterEnter");
		}
		function onAfterLeave() {
			_onAfterLeave();
			_onActivatorAfterLeave();
			emit("afterLeave");
		}
		useRender(() => createElementVNode(Fragment, null, [slots.activator?.({
			isActive: isActive.value,
			targetRef,
			props: mergeProps({ ref: activatorRef }, activatorEvents.value, props.activatorProps)
		}), isMounted.value && hasContent.value && createVNode(Teleport, {
			"disabled": !teleportTarget.value,
			"to": teleportTarget.value
		}, { default: () => [createElementVNode("div", mergeProps({
			"class": [
				"v-overlay",
				{
					"v-overlay--absolute": props.absolute || props.contained,
					"v-overlay--active": isActive.value,
					"v-overlay--contained": props.contained
				},
				staticLocationClasses.value,
				themeClasses.value,
				rtlClasses.value,
				props.class
			],
			"style": [
				stackStyles.value,
				{
					"--v-overlay-opacity": props.opacity,
					top: convertToUnit(top.value)
				},
				props.style
			],
			"ref": root,
			"onKeydown": onKeydownSelf
		}, scopeId, attrs), [createVNode(Scrim, mergeProps({
			"color": scrimColor,
			"modelValue": isActive.value && !!props.scrim,
			"ref": scrimEl
		}, scrimEvents.value), null), createVNode(MaybeTransition, {
			"appear": true,
			"persisted": true,
			"transition": props.transition,
			"target": target.value,
			"onAfterEnter": onAfterEnter,
			"onAfterLeave": onAfterLeave
		}, { default: () => [withDirectives(createElementVNode("div", mergeProps({
			"ref": contentEl,
			"class": ["v-overlay__content", props.contentClass],
			"style": [dimensionStyles.value, contentStyles.value]
		}, contentEvents.value, props.contentProps), [slots.default?.({ isActive })]), [[vShow, isActive.value], [ClickOutside, {
			handler: onClickOutside,
			closeConditional,
			include: () => {
				if (!isActive.value) return [];
				return [props.contextMenu && !props.openOnClick ? void 0 : activatorEl.value, ...Array.from(document.querySelectorAll(".v-overlay__content")).filter(ownsFocus)];
			}
		}]])] })])] })]));
		return {
			activatorEl,
			scrimEl,
			target,
			animateClick,
			contentEl,
			rootEl: root,
			globalTop,
			localTop,
			updateLocation,
			openedByHover
		};
	}
});
// packages/vue-ui/node_modules/vuetify/lib/components/VDialog/VDialog.js
var makeVDialogProps = propsFactory({
	fullscreen: Boolean,
	scrollable: Boolean,
	...omit(makeVOverlayProps({
		captureFocus: true,
		location: "center center",
		origin: "center center",
		scrollStrategy: "block",
		transition: { component: VDialogTransition },
		zIndex: 2400,
		retainFocus: true
	}), ["disableInitialFocus"])
}, "VDialog");
var VDialog = genericComponent()({
	name: "VDialog",
	props: makeVDialogProps(),
	emits: {
		"update:modelValue": (value) => true,
		"click:outside": (e) => true,
		afterEnter: () => true,
		afterLeave: () => true
	},
	setup(props, { emit, slots }) {
		const isActive = useProxiedModel(props, "modelValue");
		const { scopeId } = useScopeId();
		const overlay = ref$1();
		function onAfterEnter() {
			emit("afterEnter");
			if ((props.scrim || props.retainFocus) && overlay.value?.contentEl && !overlay.value.contentEl.contains(getActiveElement())) overlay.value.contentEl.focus({ preventScroll: true });
		}
		function onAfterLeave() {
			emit("afterLeave");
		}
		watch(isActive, async (val) => {
			if (!val) {
				await nextTick$1();
				overlay.value?.activatorEl?.focus({ preventScroll: true });
			}
		});
		useRender(() => {
			const overlayProps = VOverlay.filterProps(props);
			const activatorProps = mergeProps({ "aria-haspopup": "dialog" }, props.activatorProps);
			const contentProps = mergeProps({ tabindex: -1 }, props.contentProps);
			const locationStrategy = props.fullscreen ? noop : props.locationStrategy;
			return createVNode(VOverlay, mergeProps({
				"ref": overlay,
				"class": [
					"v-dialog",
					{
						"v-dialog--fullscreen": props.fullscreen,
						"v-dialog--scrollable": props.scrollable
					},
					props.class
				],
				"style": props.style
			}, overlayProps, {
				"modelValue": isActive.value,
				"onUpdate:modelValue": ($event) => isActive.value = $event,
				"aria-modal": "true",
				"activatorProps": activatorProps,
				"contentProps": contentProps,
				"height": !props.fullscreen ? props.height : void 0,
				"width": !props.fullscreen ? props.width : void 0,
				"maxHeight": !props.fullscreen ? props.maxHeight : void 0,
				"maxWidth": !props.fullscreen ? props.maxWidth : void 0,
				"locationStrategy": locationStrategy,
				"role": "dialog",
				"onAfterEnter": onAfterEnter,
				"onAfterLeave": onAfterLeave,
				"onClick:outside": (e) => emit("click:outside", e)
			}, scopeId), {
				activator: slots.activator,
				default: (...args) => createVNode(VDefaultsProvider, { "root": "VDialog" }, { default: () => [slots.default?.(...args)] })
			});
		});
		return forwardRefs({}, overlay);
	}
});
// packages/core/dist/overflow.js
var overflowInstance = 0;
function mountOverflowText(root, options = {}) {
	const labels = () => ({
		fullText: "전체 내용",
		close: "닫기",
		viewFullText: (text) => text + " — 전체 내용 보기",
		...typeof options === "function" ? options() : options
	});
	const id = "sol-full-text-" + ++overflowInstance, ctl = new AbortController(), signal = ctl.signal, entries = /* @__PURE__ */ new Map();
	let frame = 0, timer = 0, active = null, hot = null, hoveringTip = false, suppressed = null, opener = null, destroyed = false;
	const tip = document.createElement("div");
	tip.id = id + "-hint";
	tip.className = "sol-tooltip sol-overflow-tooltip";
	tip.role = "tooltip";
	tip.hidden = true;
	const panel = document.createElement("dialog");
	panel.className = "sol-dialog sol-full-text-dialog";
	panel.setAttribute("aria-labelledby", id + "-title");
	panel.innerHTML = "<div class=\"row-between\"><h2 id=\"" + id + "-title\">전체 제목</h2><button type=\"button\" class=\"sol-button inline-action\" autofocus>닫기 ×</button></div><p class=\"sol-full-text-content\"></p>";
	document.body.append(tip, panel);
	const close = panel.querySelector("button");
	const on = (node, type, fn, options = {}) => node.addEventListener(type, fn, {
		...options,
		signal
	});
	function dismiss() {
		clearTimeout(timer);
		if (active) {
			const ids = (active.getAttribute("aria-describedby") || "").split(" ").filter((x) => x && x !== tip.id);
			if (ids.length) active.setAttribute("aria-describedby", ids.join(" "));
			else active.removeAttribute("aria-describedby");
		}
		tip.hidden = true;
		active = null;
	}
	function show(entry) {
		if (suppressed === entry.trigger || panel.open) return;
		dismiss();
		active = entry.trigger;
		tip.textContent = entry.node.textContent;
		tip.hidden = false;
		const ids = new Set((active.getAttribute("aria-describedby") || "").split(" ").filter(Boolean));
		ids.add(tip.id);
		active.setAttribute("aria-describedby", [...ids].join(" "));
		const r = active.getBoundingClientRect(), b = tip.getBoundingClientRect();
		tip.style.left = Math.max(8, Math.min(r.left, innerWidth - b.width - 8)) + "px";
		tip.style.top = Math.max(8, r.bottom + b.height + 8 < innerHeight ? r.bottom + 6 : r.top - b.height - 6) + "px";
	}
	function laterDismiss() {
		clearTimeout(timer);
		timer = setTimeout(() => {
			if (active && hot !== active && !hoveringTip && !active.contains(document.activeElement)) dismiss();
		}, 100);
	}
	function refresh() {
		frame = 0;
		panel.querySelector("h2").textContent = labels().fullText;
		close.textContent = labels().close + " ×";
		const focused = entryFor(document.activeElement);
		for (const [node, entry] of entries) if (!root.contains(node)) {
			if (active === entry.trigger) dismiss();
			entries.delete(node);
		} else {
			entry.key = node.closest("[data-row-id]")?.dataset.rowId || node.textContent;
			if (entry.created) entry.trigger.setAttribute("aria-label", labels().viewFullText(node.textContent));
			if (active === entry.trigger && tip.textContent !== node.textContent) show(entry);
		}
		for (const node of root.querySelectorAll(".sol-record-title,.sol-ellipsis")) {
			if (entries.has(node) || node.scrollWidth <= node.clientWidth + 1 || !node.getClientRects().length) continue;
			let trigger = node.closest("a,button"), created = false;
			if (!trigger) {
				trigger = document.createElement("button");
				trigger.type = "button";
				trigger.className = "sol-title-preview";
				trigger.setAttribute("aria-haspopup", "dialog");
				trigger.setAttribute("aria-label", labels().viewFullText(node.textContent));
				node.before(trigger);
				trigger.append(node);
				created = true;
			}
			entries.set(node, {
				node,
				trigger,
				created,
				key: node.closest("[data-row-id]")?.dataset.rowId || node.textContent
			});
		}
		if (!panel.open && focused && !focused.trigger.getClientRects().length) {
			const next = [...entries.values()].find((e) => e.key === focused.key && e.trigger.getClientRects().length);
			if (next) {
				suppressed = next.trigger;
				next.trigger.focus({ preventScroll: true });
			}
		}
	}
	function schedule() {
		if (!frame) frame = requestAnimationFrame(refresh);
	}
	function entryFor(target) {
		for (const entry of entries.values()) if (entry.trigger === target || entry.trigger.contains(target)) return entry;
		return null;
	}
	on(root, "pointerover", (e) => {
		const entry = entryFor(e.target);
		if (entry && !entry.trigger.contains(e.relatedTarget)) {
			hot = entry.trigger;
			show(entry);
		}
	});
	on(root, "pointerout", (e) => {
		const entry = entryFor(e.target);
		if (entry && !entry.trigger.contains(e.relatedTarget)) {
			hot = null;
			if (suppressed === entry.trigger) suppressed = null;
			laterDismiss();
		}
	});
	on(root, "focusin", (e) => {
		const entry = entryFor(e.target);
		if (entry) show(entry);
	});
	on(root, "focusout", (e) => {
		const entry = entryFor(e.target);
		if (entry) {
			if (suppressed === entry.trigger) suppressed = null;
			laterDismiss();
		}
	});
	on(tip, "pointerenter", () => {
		hoveringTip = true;
		clearTimeout(timer);
	});
	on(tip, "pointerleave", () => {
		hoveringTip = false;
		laterDismiss();
	});
	on(root, "click", (e) => {
		const entry = entryFor(e.target);
		if (!entry?.created) return;
		opener = entry.trigger;
		suppressed = opener;
		dismiss();
		panel.querySelector("p").textContent = entry.node.textContent;
		panel.showModal();
		close.focus();
	});
	on(close, "click", () => panel.close());
	on(panel, "close", () => {
		if (!destroyed) {
			refresh();
			const old = [...entries.values()].find((e) => e.trigger === opener);
			const target = opener?.isConnected && opener.getClientRects().length ? opener : [...entries.values()].find((e) => e.key === old?.key && e.trigger.getClientRects().length)?.trigger || root.querySelector("h1,button,a,[tabindex]");
			if (target) {
				suppressed = target;
				target.focus({ preventScroll: true });
			}
		}
	});
	on(document, "keydown", (e) => {
		if (e.key === "Escape" && !e.isComposing && !tip.hidden) {
			suppressed = active;
			dismiss();
		}
	});
	on(document, "scroll", (e) => {
		if (e.target === tip) return;
		const entry = active && entryFor(active);
		if (entry && active.contains(document.activeElement)) show(entry);
		else dismiss();
	}, { capture: true });
	on(window, "resize", () => {
		dismiss();
		schedule();
	});
	const observer = new MutationObserver(schedule);
	observer.observe(root, {
		childList: true,
		subtree: true,
		characterData: true
	});
	refresh();
	const cleanup = () => {
		destroyed = true;
		ctl.abort();
		observer.disconnect();
		clearTimeout(timer);
		if (frame) cancelAnimationFrame(frame);
		dismiss();
		if (panel.open) panel.close();
		panel.remove();
		tip.remove();
		for (const entry of entries.values()) if (entry.created && entry.trigger.isConnected) entry.trigger.replaceWith(entry.node);
		entries.clear();
	};
	cleanup.refresh = refresh;
	return cleanup;
}
// packages/vue-ui/node_modules/vuetify/lib/components/VGrid/VContainer.js
var makeVContainerProps = propsFactory({
	fluid: {
		type: Boolean,
		default: false
	},
	...makeComponentProps(),
	...makeDimensionProps(),
	...makeTagProps()
}, "VContainer");
var VContainer = genericComponent()({
	name: "VContainer",
	props: makeVContainerProps(),
	setup(props, { slots }) {
		const { rtlClasses } = useRtl();
		const { dimensionStyles } = useDimension(props);
		useRender(() => createVNode(props.tag, {
			"class": normalizeClass([
				"v-container",
				{ "v-container--fluid": props.fluid },
				rtlClasses.value,
				props.class
			]),
			"style": normalizeStyle([dimensionStyles.value, props.style])
		}, slots));
		return {};
	}
});
// packages/vue-ui/node_modules/vuetify/lib/components/VGrid/VCol.js
var breakpointProps = (() => {
	return breakpoints.reduce((props, val) => {
		props[val] = {
			type: [
				Boolean,
				String,
				Number
			],
			default: false
		};
		return props;
	}, {});
})();
var offsetProps = (() => {
	return breakpoints.reduce((props, val) => {
		const offsetKey = "offset" + capitalize(val);
		props[offsetKey] = {
			type: [String, Number],
			default: null
		};
		return props;
	}, {});
})();
var propMap$1 = {
	col: keys(breakpointProps),
	offset: keys(offsetProps),
	order: [
		"order",
		"orderSm",
		"orderMd",
		"orderLg",
		"orderXl",
		"orderXxl"
	]
};
function parseCols(val) {
	if (/* @__PURE__ */ isString(val) && val.includes("/")) {
		const [cols, size] = val.split("/");
		return {
			cols: Number(cols),
			size: Number(size)
		};
	}
	return { cols: val };
}
function parseBreakpoint(type, prop, val) {
	if (val == null || val === false) return {};
	const { cols, size } = parseCols(val);
	const breakpoint = prop.replace(type, "").toLowerCase();
	if (type === "offset") return {
		className: `v-col--offset-${breakpoint}-${cols}`,
		variables: [{ [`--v-col-offset-base-${breakpoint}`]: size }]
	};
	else if (type === "order") return { className: `order-${breakpoint}-${cols}` };
	return {
		className: cols === "" || cols === true ? `v-col--${breakpoint}` : `v-col--cols-${breakpoint}-${cols}`,
		variables: [{ [`--v-col-size-base-${breakpoint}`]: size }]
	};
}
var ALIGN_SELF_VALUES = [
	"auto",
	"start",
	"end",
	"center",
	"baseline",
	"stretch"
];
var alignSelfValidator = (str) => ALIGN_SELF_VALUES.includes(str);
var makeVColProps = propsFactory({
	cols: {
		type: [
			Boolean,
			String,
			Number
		],
		default: false
	},
	...breakpointProps,
	offset: {
		type: [String, Number],
		default: null
	},
	...offsetProps,
	/** @deprecated use order-* class instead */
	order: {
		type: [String, Number],
		default: null
	},
	/** @deprecated use order-sm-* class instead */
	orderSm: {
		type: [String, Number],
		default: null
	},
	/** @deprecated use order-md-* class instead */
	orderMd: {
		type: [String, Number],
		default: null
	},
	/** @deprecated use order-lg-* class instead */
	orderLg: {
		type: [String, Number],
		default: null
	},
	/** @deprecated use order-xl-* class instead */
	orderXl: {
		type: [String, Number],
		default: null
	},
	/** @deprecated use order-xxl-* class instead */
	orderXxl: {
		type: [String, Number],
		default: null
	},
	/** @deprecated use align-self-* class instead */
	alignSelf: {
		type: String,
		default: null,
		validator: alignSelfValidator
	},
	...makeComponentProps(),
	...makeTagProps()
}, "VCol");
var VCol = genericComponent()({
	name: "VCol",
	props: makeVColProps(),
	setup(props, { slots }) {
		const sizeBaseOverride = computed(() => parseCols(props.cols).size);
		const offsetBaseOverride = computed(() => parseCols(props.offset).size);
		const responsive = computed(() => {
			const classList = ["v-col"];
			const variablesList = [];
			let type;
			for (type in propMap$1) propMap$1[type].forEach((prop) => {
				const value = props[prop];
				const { className, variables } = parseBreakpoint(type, prop, value);
				if (className) classList.push(className);
				if (variables) variablesList.push(...variables);
			});
			const { cols } = parseCols(props.cols);
			const { cols: offset } = parseCols(props.offset);
			classList.push({
				[`v-col--cols-${cols}`]: cols,
				[`v-col--offset-${offset}`]: offset,
				[`order-${props.order}`]: props.order,
				[`align-self-${props.alignSelf}`]: props.alignSelf
			});
			return {
				classes: classList,
				variables: variablesList
			};
		});
		return () => h$1(props.tag, {
			class: [responsive.value.classes, props.class],
			style: [
				{ "--v-col-size-base": sizeBaseOverride.value },
				{ "--v-col-offset-base": offsetBaseOverride.value },
				responsive.value.variables,
				props.style
			]
		}, slots.default?.());
	}
});
// packages/vue-ui/node_modules/vuetify/lib/components/VGrid/VRow.js
var ALIGNMENT = [
	"start",
	"end",
	"center"
];
var SPACE = [
	"space-between",
	"space-around",
	"space-evenly"
];
var ALIGN_VALUES = [
	...ALIGNMENT,
	"baseline",
	"stretch"
];
var alignValidator = (str) => ALIGN_VALUES.includes(str);
var JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
var justifyValidator = (str) => JUSTIFY_VALUES.includes(str);
var ALIGN_CONTENT_VALUES = [
	...ALIGNMENT,
	...SPACE,
	"stretch"
];
var alignContentValidator = (str) => ALIGN_CONTENT_VALUES.includes(str);
var propMap = {
	align: [
		"align",
		"alignSm",
		"alignMd",
		"alignLg",
		"alignXl",
		"alignXxl"
	],
	justify: [
		"justify",
		"justifySm",
		"justifyMd",
		"justifyLg",
		"justifyXl",
		"justifyXxl"
	],
	alignContent: [
		"alignContent",
		"alignContentSm",
		"alignContentMd",
		"alignContentLg",
		"alignContentXl",
		"alignContentXxl"
	]
};
var gapProps = [
	"gap",
	"gapSm",
	"gapMd",
	"gapLg",
	"gapXl",
	"gapXxl"
];
var classMap = {
	align: "align",
	justify: "justify",
	alignContent: "align-content"
};
function breakpointClass(type, prop, val) {
	let className = classMap[type];
	if (val == null) return;
	if (prop) {
		const breakpoint = prop.replace(type, "");
		className += `-${breakpoint}`;
	}
	className += `-${val}`;
	return className.toLowerCase();
}
var makeVRowProps = propsFactory({
	/** @deprecated use density="compact" instead */
	dense: Boolean,
	/** @deprecated use align-* class instead */
	align: {
		type: String,
		default: null,
		validator: alignValidator
	},
	/** @deprecated use align-sm-* class instead */
	alignSm: {
		type: String,
		default: null,
		validator: alignValidator
	},
	/** @deprecated use align-md-* class instead */
	alignMd: {
		type: String,
		default: null,
		validator: alignValidator
	},
	/** @deprecated use align-lg-* class instead */
	alignLg: {
		type: String,
		default: null,
		validator: alignValidator
	},
	/** @deprecated use align-xl-* class instead */
	alignXl: {
		type: String,
		default: null,
		validator: alignValidator
	},
	/** @deprecated use align-xxl-* class instead */
	alignXxl: {
		type: String,
		default: null,
		validator: alignValidator
	},
	/** @deprecated use justify-* class instead */
	justify: {
		type: String,
		default: null,
		validator: justifyValidator
	},
	/** @deprecated use justify-sm-* class instead */
	justifySm: {
		type: String,
		default: null,
		validator: justifyValidator
	},
	/** @deprecated use justify-md-* class instead */
	justifyMd: {
		type: String,
		default: null,
		validator: justifyValidator
	},
	/** @deprecated use justify-lg-* class instead */
	justifyLg: {
		type: String,
		default: null,
		validator: justifyValidator
	},
	/** @deprecated use justify-xl-* class instead */
	justifyXl: {
		type: String,
		default: null,
		validator: justifyValidator
	},
	/** @deprecated use justify-xxl-* class instead */
	justifyXxl: {
		type: String,
		default: null,
		validator: justifyValidator
	},
	/** @deprecated use align-content-* class instead */
	alignContent: {
		type: String,
		default: null,
		validator: alignContentValidator
	},
	/** @deprecated use align-content-sm-* class instead */
	alignContentSm: {
		type: String,
		default: null,
		validator: alignContentValidator
	},
	/** @deprecated use align-content-md-* class instead */
	alignContentMd: {
		type: String,
		default: null,
		validator: alignContentValidator
	},
	/** @deprecated use align-content-lg-* class instead */
	alignContentLg: {
		type: String,
		default: null,
		validator: alignContentValidator
	},
	/** @deprecated use align-content-xl-* class instead */
	alignContentXl: {
		type: String,
		default: null,
		validator: alignContentValidator
	},
	/** @deprecated use align-content-xxl-* class instead */
	alignContentXxl: {
		type: String,
		default: null,
		validator: alignContentValidator
	},
	noGutters: Boolean,
	gap: [
		Number,
		String,
		Array
	],
	gapSm: [
		Number,
		String,
		Array
	],
	gapMd: [
		Number,
		String,
		Array
	],
	gapLg: [
		Number,
		String,
		Array
	],
	gapXl: [
		Number,
		String,
		Array
	],
	gapXxl: [
		Number,
		String,
		Array
	],
	size: [Number, String],
	...makeComponentProps(),
	...makeDensityProps(),
	...makeTagProps()
}, "VRow");
var VRow = genericComponent()({
	name: "VRow",
	props: makeVRowProps(),
	setup(props, { slots }) {
		if (props.dense) deprecate("dense", "density=\"compact\"");
		const classes = computed(() => {
			const classList = [];
			let type;
			for (type in propMap) propMap[type].forEach((prop) => {
				const value = props[prop];
				const className = breakpointClass(type, prop, value);
				if (className) classList.push(className);
			});
			classList.push({
				"v-row--no-gutters": props.noGutters,
				"v-row--density-default": props.density === "default" && !props.noGutters && !props.dense,
				"v-row--density-compact": props.density === "compact" || props.dense,
				"v-row--density-comfortable": props.density === "comfortable",
				[`align-${props.align}`]: props.align,
				[`justify-${props.justify}`]: props.justify,
				[`align-content-${props.alignContent}`]: props.alignContent
			});
			return classList;
		});
		const gaps = computed(() => gapProps.flatMap((prop, i) => {
			const value = props[prop];
			if (value == null) return [];
			const infix = i ? `-${breakpoints[i - 1]}` : "";
			const [x, y] = Array.isArray(value) ? [value[0] || 0, value[1] || 0] : [value, value];
			return [{
				class: `v-row--gap${infix}`,
				style: {
					[`--v-row-gap-x${infix}`]: convertToUnit(x),
					[`--v-row-gap-y${infix}`]: convertToUnit(y)
				}
			}];
		}));
		return () => h$1(props.tag, {
			class: [
				"v-row",
				classes.value,
				gaps.value.map((gap) => gap.class),
				props.class
			],
			style: [
				{ "--v-row-columns": props.size },
				gaps.value.map((gap) => gap.style),
				props.style
			]
		}, slots.default?.());
	}
});
// packages/vue-ui/src/navigation.ts
var STabs = defineComponent({
	name: "STabs",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: {
			type: String,
			required: true
		},
		items: {
			type: Array,
			required: true
		},
		orientation: {
			type: String,
			default: "horizontal"
		},
		activation: {
			type: String,
			default: "automatic"
		}
	},
	emits: {
		"update:modelValue": (_v) => true,
		change: (_v) => true
	},
	setup(p, { attrs, slots, emit }) {
		const tablist = ref$1(null), buttons = /* @__PURE__ */ new Map(), roving = ref$1(p.modelValue);
		const enabled = () => p.items.filter((x) => !x.disabled), selected = () => p.items.find((x) => x.value === p.modelValue && !x.disabled) || enabled()[0];
		function choose(value) {
			if (p.disabled || p.readonly || !enabled().some((x) => x.value === value)) return;
			if (p.modelValue !== value) {
				emit("update:modelValue", value);
				emit("change", value);
			}
		}
		watch(() => [p.modelValue, ...p.items.flatMap((x) => [x.value, x.disabled])], async () => {
			const active = typeof document === "undefined" ? null : document.activeElement, inside = !!active && !!tablist.value?.contains(active);
			if (!enabled().some((x) => x.value === roving.value) || !inside) roving.value = selected()?.value || "";
			const next = selected();
			if (next && next.value !== p.modelValue && !p.readonly && !p.disabled) emit("update:modelValue", next.value);
			await nextTick$1();
			if (inside && active && (!active.isConnected || active.disabled)) buttons.get(roving.value)?.focus();
		}, { immediate: true });
		function key(e, value) {
			if (e.isComposing || p.disabled) return;
			const options = enabled(), index = options.findIndex((x) => x.value === value);
			let target;
			if (e.key === "Home") target = 0;
			else if (e.key === "End") target = options.length - 1;
			else if (e.key === (p.orientation === "horizontal" ? "ArrowRight" : "ArrowDown")) target = (index + 1) % options.length;
			else if (e.key === (p.orientation === "horizontal" ? "ArrowLeft" : "ArrowUp")) target = (index - 1 + options.length) % options.length;
			else if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				choose(value);
				return;
			}
			if (target === void 0 || !options.length) return;
			e.preventDefault();
			roving.value = options[target].value;
			buttons.get(roving.value)?.focus();
			if (p.activation === "automatic") choose(roving.value);
		}
		return () => h$1("div", {
			...attrs,
			class: ["sol-ui-tabs", attrs.class]
		}, [
			h$1("div", {
				class: "sol-label",
				id: p.id + "-label"
			}, slots.label?.() || p.label),
			h$1("div", {
				ref: tablist,
				role: "tablist",
				"aria-labelledby": p.id + "-label",
				"aria-orientation": p.orientation,
				"aria-describedby": fieldDescription(p, slots),
				class: "sol-ui-tablist"
			}, p.items.map((item, i) => h$1("button", {
				ref: (el) => {
					if (el) buttons.set(item.value, el);
					else buttons.delete(item.value);
				},
				type: "button",
				class: "sol-button subtle",
				id: p.id + "-tab-" + i,
				role: "tab",
				"aria-selected": String(selected()?.value === item.value),
				"aria-controls": p.id + "-panel-" + i,
				"aria-disabled": p.readonly ? "true" : void 0,
				disabled: p.disabled || item.disabled,
				tabindex: !p.disabled && !item.disabled && roving.value === item.value ? 0 : -1,
				onFocus: () => roving.value = item.value,
				onClick: () => choose(item.value),
				onKeydown: (e) => key(e, item.value)
			}, item.label))),
			...p.items.map((item, i) => h$1("section", {
				id: p.id + "-panel-" + i,
				role: "tabpanel",
				"aria-labelledby": p.id + "-tab-" + i,
				hidden: selected()?.value !== item.value,
				tabindex: 0,
				class: "sol-ui-tabpanel"
			}, slots["panel-" + item.value]?.({ item }) || slots.default?.({ item }) || [])),
			...fieldMessages(p, slots)
		]);
	}
});
var SSnackbar = defineComponent({
	name: "SSnackbar",
	inheritAttrs: false,
	props: {
		id: {
			type: String,
			required: true
		},
		modelValue: Boolean,
		message: {
			type: String,
			required: true
		},
		label: String,
		tone: {
			type: String,
			default: "info"
		},
		duration: {
			type: Number,
			default: 0
		},
		live: {
			type: String,
			default: "polite"
		},
		dismissible: {
			type: Boolean,
			default: true
		},
		returnFocus: Object,
		locale: Object
	},
	emits: {
		"update:modelValue": (_v) => true,
		close: (_reason) => true
	},
	setup(p, { attrs, slots, emit }) {
		const l = useSolLocale(() => p.locale), host = ref$1(null), announcement = ref$1("");
		let timer, remaining = 0, started = 0, hovered = false, focused = false, opener = null, reason = "programmatic", mounted = false;
		const clear = () => {
			if (timer !== void 0) {
				clearTimeout(timer);
				timer = void 0;
				remaining = Math.max(0, remaining - (Date.now() - started));
			}
		};
		const requestClose = (why) => {
			clear();
			reason = why;
			emit("update:modelValue", false);
		};
		function arm() {
			if (timer !== void 0 || !mounted || !p.modelValue || p.duration <= 0 || !Number.isFinite(p.duration) || hovered || focused || document.hidden) return;
			started = Date.now();
			timer = setTimeout(() => {
				timer = void 0;
				remaining = 0;
				requestClose("timeout");
			}, remaining);
		}
		const restore = (inside) => {
			const target = p.returnFocus || opener;
			if (inside && target?.isConnected && target !== document.body && document.activeElement === document.body) target.focus();
		};
		const toneLabel = () => ({
			accent: l.value.toastAccent,
			info: l.value.toastInfo,
			success: l.value.toastSuccess,
			warning: l.value.toastWarning,
			danger: l.value.toastDanger
		})[p.tone] || l.value.notification;
		async function announce() {
			announcement.value = "";
			await nextTick$1();
			if (p.modelValue) announcement.value = toneLabel() + ": " + p.message;
		}
		watch(() => [
			p.modelValue,
			p.message,
			p.duration,
			p.tone
		], async ([visible], old) => {
			if (!mounted) return;
			const inside = !!host.value?.contains(document.activeElement);
			clear();
			if (!visible) {
				announcement.value = "";
				await nextTick$1();
				restore(inside);
				if (old?.[0]) {
					emit("close", reason);
					reason = "programmatic";
				}
				return;
			}
			if (!old?.[0]) {
				opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
				hovered = false;
				focused = false;
			}
			remaining = Math.max(0, p.duration);
			await announce();
			arm();
		});
		const visibility = () => document.hidden ? clear() : arm();
		onMounted(() => {
			mounted = true;
			document.addEventListener("visibilitychange", visibility);
			if (p.modelValue) {
				opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
				remaining = Math.max(0, p.duration);
				announce();
				arm();
			}
		});
		onBeforeUnmount(() => {
			clear();
			document.removeEventListener("visibilitychange", visibility);
			const target = p.returnFocus || opener;
			if (host.value?.contains(document.activeElement) && target?.isConnected) target.focus();
			mounted = false;
		});
		return () => h$1(Teleport, { to: "body" }, [h$1("p", {
			id: p.id + "-live",
			class: "sol-ui-sr-only",
			role: p.live === "off" ? void 0 : p.live === "assertive" ? "alert" : "status",
			"aria-live": p.live,
			"aria-atomic": "true"
		}, announcement.value), p.modelValue ? h$1("section", {
			...attrs,
			ref: host,
			id: p.id,
			class: ["sol-toast sol-tone sol-ui-toast", attrs.class],
			"data-tone": p.tone,
			role: "region",
			"aria-label": p.label || l.value.notification,
			onMouseenter: () => {
				hovered = true;
				clear();
			},
			onMouseleave: () => {
				hovered = false;
				arm();
			},
			onFocusin: () => {
				focused = true;
				clear();
			},
			onFocusout: () => {
				nextTick$1(() => {
					focused = !!host.value?.contains(document.activeElement);
					arm();
				});
			}
		}, [
			h$1("svg", {
				class: "sol-ui-toast-icon",
				viewBox: "0 0 24 24",
				width: 20,
				height: 20,
				fill: "none",
				stroke: "currentColor",
				"stroke-width": 1.6,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"aria-hidden": "true",
				focusable: "false"
			}, h$1("path", { d: solIconPaths[p.tone === "success" ? "check" : p.tone === "danger" ? "close" : "info"] })),
			h$1("div", { class: "sol-ui-toast-message" }, [h$1("strong", { class: "sol-ui-toast-tone" }, toneLabel()), slots.default?.() || p.message]),
			slots.action?.(),
			p.dismissible ? h$1("button", {
				type: "button",
				class: "sol-button inline-action",
				"aria-label": l.value.close,
				onClick: () => requestClose("close")
			}, l.value.close) : null
		]) : null]);
	}
});
// packages/vue-ui/src/date-time.ts
var clone = (v) => v && typeof v === "object" ? { ...v } : v;
var today = () => {
	const d = /* @__PURE__ */ new Date();
	return {
		y: d.getFullYear(),
		m: d.getMonth() + 1,
		d: d.getDate()
	};
};
var format$1 = (mode, v) => v === null ? "" : mode === "single" && typeof v === "string" ? v : mode === "range" && typeof v === "object" ? v.start + " ~ " + v.end : "";
function isDateValue(mode, value) {
	return value === null || (mode === "single" ? typeof value === "string" && !!parseDateOnly(value) : typeof value === "object" && !!value && "start" in value && "end" in value && typeof value.start === "string" && typeof value.end === "string" && !!parseDateOnly(value.start) && !!parseDateOnly(value.end) && value.start <= value.end);
}
function utc(v) {
	const d = /* @__PURE__ */ new Date(0);
	d.setUTCHours(0, 0, 0, 0);
	d.setUTCFullYear(v.y, v.m - 1, v.d);
	return d;
}
function dateFormatter(code, options) {
	try {
		return new Intl.DateTimeFormat(code, {
			...options,
			calendar: "gregory",
			timeZone: "UTC"
		});
	} catch {
		return new Intl.DateTimeFormat("ko-KR", {
			...options,
			calendar: "gregory",
			timeZone: "UTC"
		});
	}
}
function icon(name, direction) {
	return h$1("svg", {
		class: [
			"sol-icon",
			"sol-ui-picker-icon",
			direction ? "sol-ui-picker-icon--" + direction : void 0
		],
		width: 20,
		height: 20,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		"stroke-width": 1.6,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"aria-hidden": "true",
		focusable: "false"
	}, h$1("path", { d: solIconPaths[name] }));
}
var SDatePicker = defineComponent({
	name: "SDatePicker",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		mode: {
			type: String,
			default: "single"
		},
		modelValue: {
			type: [String, Object],
			default: null
		}
	},
	emits: {
		"update:modelValue": (_v) => true,
		change: (_v) => true,
		invalid: (_v) => true,
		open: () => true,
		close: (_why) => true
	},
	setup(p, { attrs, slots, emit, expose }) {
		const l = useSolLocale(() => p.locale), draft = ref$1(format$1(p.mode, p.modelValue)), localError = ref$1(""), opened = ref$1(false), active = ref$1(today()), view = ref$1(today()), draftStart = ref$1(null), input = ref$1(null), dialog = ref$1(null), trigger = ref$1(null), dayButtons = /* @__PURE__ */ new Map();
		let opener = null, reason = "close", visibilityRevision = 0, disposed = false;
		const weekStart = () => Number.isInteger(l.value.firstDay) && l.value.firstDay >= 0 && l.value.firstDay <= 6 ? l.value.firstDay : 0;
		const selected = () => !isDateValue(p.mode, p.modelValue) || p.modelValue === null ? null : typeof p.modelValue === "string" ? {
			start: p.modelValue,
			end: p.modelValue
		} : p.modelValue;
		function parse() {
			const text = draft.value.trim();
			if (!text) return {
				value: null,
				error: p.required ? l.value.dateRequired : ""
			};
			if (p.mode === "single") return {
				value: text,
				error: parseDateOnly(text) ? "" : l.value.invalidDate
			};
			const m = /^(\d{4}-\d{2}-\d{2})\s*~\s*(\d{4}-\d{2}-\d{2})$/.exec(text);
			return m && parseDateOnly(m[1]) && parseDateOnly(m[2]) && m[1] <= m[2] ? {
				value: {
					start: m[1],
					end: m[2]
				},
				error: ""
			} : {
				value: null,
				error: l.value.invalidRange
			};
		}
		function validity() {
			input.value?.setCustomValidity(fieldError(p) || parse().error || (!isDateValue(p.mode, p.modelValue) ? l.value.invalidDate : ""));
		}
		function commit(value, why) {
			if (fieldDisabled(p) || fieldReadonly(p)) return;
			draft.value = format$1(p.mode, value);
			localError.value = "";
			if (JSON.stringify(value) !== JSON.stringify(p.modelValue)) {
				emit("update:modelValue", clone(value));
				emit("change", {
					mode: p.mode,
					value: clone(value),
					reason: why
				});
			}
			nextTick$1(validity);
		}
		function validateIntrinsic() {
			const result = parse();
			localError.value = result.error;
			if (result.error) {
				emit("invalid", result.error);
				validity();
				return false;
			}
			if (!fieldDisabled(p) && !fieldReadonly(p)) commit(result.value, "input");
			return !externalFieldError(p);
		}
		function close(why = "close") {
			reason = why;
			opened.value = false;
			draftStart.value = null;
		}
		function open(from) {
			if (fieldDisabled(p) || fieldReadonly(p)) return;
			opener = from;
			const parsed = parse(), value = parsed.error ? selected()?.start : typeof parsed.value === "string" ? parsed.value : parsed.value?.start;
			active.value = parseDateOnly(value) || today();
			view.value = active.value;
			draftStart.value = null;
			opened.value = true;
		}
		async function focusDay() {
			await nextTick$1();
			if (!disposed && opened.value && dialog.value?.open) dayButtons.get(dateISO(active.value))?.focus();
		}
		function choose(day) {
			if (fieldDisabled(p) || fieldReadonly(p)) return;
			active.value = day;
			view.value = day;
			const iso = dateISO(day);
			if (p.mode === "single") {
				commit(iso, "calendar");
				close("select");
				return;
			}
			if (!draftStart.value) {
				draftStart.value = iso;
				focusDay();
				return;
			}
			const [start, end] = [draftStart.value, iso].sort();
			commit({
				start,
				end
			}, "calendar");
			close("select");
		}
		function key(e) {
			if (e.isComposing) return;
			if (e.key === "Escape") {
				e.preventDefault();
				e.stopPropagation();
				close("escape");
				return;
			}
			if (!e.target.hasAttribute("data-calendar-day")) return;
			let next;
			if (e.key === "ArrowLeft") next = shiftDay(active.value, -1);
			else if (e.key === "ArrowRight") next = shiftDay(active.value, 1);
			else if (e.key === "ArrowUp") next = shiftDay(active.value, -7);
			else if (e.key === "ArrowDown") next = shiftDay(active.value, 7);
			else if (e.key === "Home") next = shiftDay(active.value, -((weekday(active.value) - weekStart() + 7) % 7));
			else if (e.key === "End") next = shiftDay(active.value, 6 - (weekday(active.value) - weekStart() + 7) % 7);
			else if (e.key === "PageUp" || e.key === "PageDown") next = shiftMonth(active.value, (e.key === "PageUp" ? -1 : 1) * (e.shiftKey ? 12 : 1));
			else if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				choose(active.value);
				return;
			}
			if (next) {
				e.preventDefault();
				active.value = next;
				view.value = next;
				focusDay();
			}
		}
		watch(opened, async (v, old) => {
			const revision = ++visibilityRevision;
			await nextTick$1();
			if (disposed || revision !== visibilityRevision || v !== opened.value) return;
			if (v) {
				if (!dialog.value?.open) dialog.value?.showModal();
				await focusDay();
				if (!disposed && opened.value && revision === visibilityRevision) emit("open");
			} else if (old) {
				if (dialog.value?.open) dialog.value.close();
				const target = opener && !opener.disabled ? opener : input.value;
				if (target?.isConnected && !fieldDisabled(p)) target.focus();
				emit("close", reason);
			}
		});
		watch(l, () => {
			if (localError.value) localError.value = parse().error;
			nextTick$1(validity);
		});
		watch(() => p.modelValue, (v) => {
			draft.value = format$1(p.mode, v);
			localError.value = "";
			draftStart.value = null;
			nextTick$1(validity);
		});
		watch(() => p.mode, () => {
			close("mode");
			draft.value = "";
			localError.value = "";
			emit("update:modelValue", null);
			emit("change", {
				mode: p.mode,
				value: null,
				reason: "mode"
			});
			nextTick$1(validity);
		});
		watch(() => [fieldDisabled(p), fieldReadonly(p)], () => {
			if (fieldDisabled(p) || fieldReadonly(p)) close("disabled");
		});
		watch(() => [
			fieldError(p),
			p.required,
			draft.value
		], () => nextTick$1(validity));
		onMounted(validity);
		onBeforeUnmount(() => {
			disposed = true;
			visibilityRevision++;
			if (dialog.value?.open) {
				dialog.value.close();
				if (opener?.isConnected) opener.focus();
			}
		});
		const validation = useSFieldValidation(p, () => parse().value, {
			focus: () => input.value?.focus(),
			validateIntrinsic,
			intrinsicError: () => localError.value,
			resetIntrinsic: () => {
				localError.value = "";
			}
		}), validate = validation.validate;
		expose({
			...validation,
			clear: () => commit(null, "clear")
		});
		return () => {
			const range = draftStart.value ? {
				start: draftStart.value,
				end: draftStart.value
			} : selected(), candidate = dateISO(active.value), preview = draftStart.value ? [draftStart.value, candidate].sort() : null, error = fieldError(p) || localError.value || (!isDateValue(p.mode, p.modelValue) ? l.value.invalidDate : "");
			const first = {
				...view.value,
				d: 1
			}, firstISO = dateISO(first), cells = Array.from({ length: 42 }, (_, i) => {
				const offset = i - (weekday(first) - weekStart() + 7) % 7, day = shiftDay(first, offset);
				return dateISO(shiftDay(day, -offset)) === firstISO ? day : null;
			});
			const long = dateFormatter(l.value.code, {
				year: "numeric",
				month: "long",
				day: "numeric",
				weekday: "long"
			}), short = dateFormatter(l.value.code, { weekday: "short" }), month = dateFormatter(l.value.code, {
				year: "numeric",
				month: "long"
			}), todayISO = dateISO(today());
			return h$1("div", { class: "sol-field sol-ui-native-field sol-ui-date" }, [
				fieldLabel(p, slots, l.value.required),
				h$1("div", { class: "sol-date-field" }, [h$1("input", {
					...attrs,
					ref: input,
					id: p.id,
					type: "text",
					class: ["sol-input", attrs.class],
					value: draft.value,
					disabled: fieldDisabled(p),
					readonly: fieldReadonly(p),
					required: p.required,
					maxlength: p.mode === "single" ? 10 : 25,
					autocomplete: "off",
					spellcheck: false,
					placeholder: p.mode === "single" ? "YYYY-MM-DD" : "YYYY-MM-DD ~ YYYY-MM-DD",
					"aria-haspopup": "dialog",
					"aria-controls": p.id + "-calendar",
					"aria-invalid": error ? "true" : void 0,
					"aria-describedby": fieldDescription(p, slots, error, [p.id + "-format", attrs["aria-describedby"]].filter(Boolean).join(" ")),
					onInput: (e) => {
						if (fieldDisabled(p) || fieldReadonly(p)) return;
						draft.value = e.target.value;
						if (localError.value) localError.value = parse().error;
					},
					onBlur: () => {
						if (!fieldDisabled(p) && !fieldReadonly(p)) validate();
					},
					onInvalid: (e) => {
						e.preventDefault();
						validate();
						input.value?.focus();
					},
					onKeydown: (e) => {
						if (e.isComposing) return;
						if (e.key === "ArrowDown" && e.altKey) {
							e.preventDefault();
							open(input.value);
						} else if (e.key === "Enter") {
							e.preventDefault();
							validate();
						}
					}
				}), h$1("button", {
					ref: trigger,
					type: "button",
					class: "sol-button sol-date-open",
					disabled: fieldDisabled(p) || fieldReadonly(p),
					"aria-label": p.label + " " + l.value.calendar,
					"aria-haspopup": "dialog",
					"aria-controls": p.id + "-calendar",
					"aria-expanded": String(opened.value),
					onClick: () => open(trigger.value)
				}, icon("calendar"))]),
				h$1("span", {
					id: p.id + "-format",
					class: "sol-hint"
				}, p.mode === "single" ? "YYYY-MM-DD" : "YYYY-MM-DD ~ YYYY-MM-DD"),
				...fieldMessages(p, slots, error),
				h$1("button", {
					type: "button",
					class: "sol-button inline-action sol-ui-picker-clear",
					disabled: fieldDisabled(p) || fieldReadonly(p),
					onClick: () => {
						commit(null, "clear");
						input.value?.focus();
					}
				}, l.value.clear),
				h$1("dialog", {
					ref: dialog,
					id: p.id + "-calendar",
					class: "sol-calendar-dialog sol-ui-calendar",
					"aria-labelledby": p.id + "-title",
					"aria-describedby": p.id + "-keys",
					onKeydown: key,
					onCancel: (e) => {
						e.preventDefault();
						close("escape");
					},
					onClose: () => {
						if (opened.value) close();
					},
					onClick: (e) => {
						const el = dialog.value;
						if (!el || e.target !== el) return;
						const r = el.getBoundingClientRect();
						if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close("outside");
					}
				}, [
					h$1("div", { class: "sol-calendar-top" }, [h$1("strong", { id: p.id + "-title" }, p.mode === "single" ? l.value.singleDate : l.value.dateRange), h$1("button", {
						type: "button",
						class: "sol-button inline-action",
						onClick: () => close()
					}, l.value.close)]),
					h$1("p", {
						class: "sol-hint sol-calendar-status",
						role: "status",
						"aria-live": "polite"
					}, p.mode === "range" ? draftStart.value ? l.value.chooseEnd : l.value.chooseStart : l.value.singleDate),
					h$1("div", { class: "sol-calendar-heading" }, [
						h$1("button", {
							type: "button",
							class: "sol-button subtle",
							"aria-label": l.value.previousMonth,
							onClick: () => {
								active.value = shiftMonth(view.value, -1);
								view.value = active.value;
							}
						}, icon("chevron", "previous")),
						h$1("p", {
							id: p.id + "-month",
							class: "sol-ui-calendar-month",
							"aria-live": "polite"
						}, month.format(utc(view.value))),
						h$1("button", {
							type: "button",
							class: "sol-button subtle",
							"aria-label": l.value.nextMonth,
							onClick: () => {
								active.value = shiftMonth(view.value, 1);
								view.value = active.value;
							}
						}, icon("chevron", "next"))
					]),
					h$1("table", {
						class: "sol-calendar-grid",
						role: "grid",
						"aria-labelledby": p.id + "-month"
					}, [h$1("thead", h$1("tr", Array.from({ length: 7 }, (_, i) => h$1("th", { scope: "col" }, short.format(utc(shiftDay({
						y: 2026,
						m: 10,
						d: 18
					}, i + weekStart()))))))), h$1("tbody", Array.from({ length: 6 }, (_, row) => h$1("tr", cells.slice(row * 7, row * 7 + 7).map((day) => {
						if (!day) return h$1("td", { role: "gridcell" });
						const iso = dateISO(day), inside = !!range && range.start <= iso && iso <= range.end, endpoint = !!range && (iso === range.start || iso === range.end), label = [
							long.format(utc(day)),
							p.mode === "single" && inside ? l.value.selected : range?.start === iso ? l.value.start : "",
							p.mode === "range" && !draftStart.value && range?.end === iso ? l.value.end : ""
						].filter(Boolean).join(", ");
						return h$1("td", {
							role: "gridcell",
							"aria-selected": String(inside)
						}, h$1("button", {
							ref: (el) => {
								if (el) dayButtons.set(iso, el);
								else dayButtons.delete(iso);
							},
							type: "button",
							class: "sol-calendar-day",
							"data-calendar-day": iso,
							"data-outside": String(day.m !== view.value.m),
							"data-range": String(inside),
							"data-endpoint": String(endpoint),
							"data-preview": String(!!preview && preview[0] <= iso && iso <= preview[1]),
							"aria-label": label,
							"aria-current": iso === todayISO ? "date" : void 0,
							tabindex: iso === candidate ? 0 : -1,
							onClick: () => choose(day),
							onFocus: () => {
								active.value = day;
							}
						}, [day.d, iso === todayISO ? h$1("span", {
							class: "sol-calendar-dot",
							"aria-hidden": "true"
						}) : null]));
					}))))]),
					h$1("div", { class: "sol-calendar-footer" }, [h$1("button", {
						type: "button",
						class: "sol-button inline-action",
						onClick: () => {
							active.value = today();
							view.value = active.value;
							focusDay();
						}
					}, l.value.today), h$1("button", {
						type: "button",
						class: "sol-button inline-action",
						onClick: () => {
							commit(null, "clear");
							close("select");
						}
					}, l.value.clear)]),
					h$1("p", {
						id: p.id + "-keys",
						class: "sol-hint sol-calendar-keys"
					}, l.value.calendarKeys)
				])
			]);
		};
	}
});
var STimePicker = defineComponent({
	name: "STimePicker",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: {
			type: String,
			default: null
		},
		min: {
			type: String,
			default: "00:00"
		},
		max: {
			type: String,
			default: "23:59"
		},
		step: {
			type: Number,
			default: 15
		}
	},
	emits: {
		"update:modelValue": (_v) => true,
		change: (_v) => true,
		invalid: (_v) => true,
		open: () => true,
		close: (_why) => true
	},
	setup(p, { attrs, slots, emit, expose }) {
		const l = useSolLocale(() => p.locale), draft = ref$1(p.modelValue ?? ""), localError = ref$1(""), opened = ref$1(false), hour = ref$1(""), minute = ref$1(""), input = ref$1(null), trigger = ref$1(null), panel = ref$1(null), hourSelect = ref$1(null), minuteSelect = ref$1(null), position = ref$1({
			left: "8px",
			top: "8px"
		});
		let opener = null, reason = "close";
		const bounds = () => ({
			min: parseTimeOnly(p.min)?.minutes ?? NaN,
			max: parseTimeOnly(p.max)?.minutes ?? NaN
		});
		const allowed = (n) => {
			const b = bounds();
			return Number.isFinite(b.min) && Number.isFinite(b.max) && b.min <= b.max && Number.isInteger(p.step) && p.step > 0 && n >= b.min && n <= b.max && (n - b.min) % p.step === 0;
		};
		function parse() {
			if (!draft.value.trim()) return {
				value: null,
				error: p.required ? l.value.timeRequired : ""
			};
			const t = parseTimeOnly(draft.value);
			return t && allowed(t.minutes) ? {
				value: t.value,
				error: ""
			} : {
				value: null,
				error: l.value.invalidTime
			};
		}
		function syncOptions() {
			const t = parseTimeOnly(draft.value);
			hour.value = t && Array.from({ length: 60 }, (_, i) => i).some((n) => allowed(Math.floor(t.minutes / 60) * 60 + n)) ? t.value.slice(0, 2) : "";
			minute.value = t && allowed(t.minutes) ? t.value.slice(3) : "";
		}
		function validity() {
			input.value?.setCustomValidity(fieldError(p) || parse().error);
		}
		function commit(value) {
			if (fieldDisabled(p) || fieldReadonly(p)) return;
			draft.value = value ?? "";
			localError.value = "";
			syncOptions();
			if (value !== p.modelValue) {
				emit("update:modelValue", value);
				emit("change", value);
			}
			nextTick$1(validity);
		}
		function validateIntrinsic() {
			const result = parse();
			localError.value = result.error;
			if (result.error) {
				emit("invalid", result.error);
				validity();
				return false;
			}
			if (!fieldDisabled(p) && !fieldReadonly(p)) commit(result.value);
			return !externalFieldError(p);
		}
		function locate() {
			if (!opened.value || !input.value || !panel.value) return;
			const r = input.value.getBoundingClientRect(), b = panel.value.getBoundingClientRect(), width = document.documentElement.clientWidth || window.innerWidth;
			position.value = {
				left: Math.max(8, Math.min(r.left, width - b.width - 8)) + "px",
				top: Math.max(8, Math.min(r.bottom + 6, window.innerHeight - b.height - 8)) + "px"
			};
		}
		function close(why = "close", restore = true) {
			if (!opened.value) return;
			reason = why;
			opened.value = false;
			if (restore) nextTick$1(() => {
				const target = opener && !opener.disabled ? opener : input.value;
				if (target?.isConnected && !fieldDisabled(p)) target.focus();
			});
		}
		async function open(keyboard, from) {
			if (fieldDisabled(p) || fieldReadonly(p)) return;
			opener = from;
			const was = opened.value;
			opened.value = true;
			await nextTick$1();
			if (!opened.value || !input.value) return;
			locate();
			if (keyboard) hourSelect.value?.focus();
			if (!was) emit("open");
		}
		function select() {
			if (fieldDisabled(p) || fieldReadonly(p)) return;
			if (!hour.value || !minute.value) return;
			const t = parseTimeOnly(hour.value + ":" + minute.value);
			if (t && allowed(t.minutes)) commit(t.value);
			else {
				minute.value = "";
				localError.value = "";
			}
		}
		const outside = (e) => {
			const t = e.target;
			if (opened.value && !panel.value?.contains(t) && t !== input.value && !trigger.value?.contains(t)) close("outside", false);
		};
		watch(l, () => {
			if (localError.value) localError.value = parse().error;
			nextTick$1(validity);
		});
		watch(() => p.modelValue, (v) => {
			draft.value = v ?? "";
			localError.value = "";
			syncOptions();
			nextTick$1(validity);
		});
		watch(() => [fieldDisabled(p), fieldReadonly(p)], () => {
			if (fieldDisabled(p) || fieldReadonly(p)) close("disabled", !fieldDisabled(p));
		});
		watch(() => [
			p.min,
			p.max,
			p.step,
			fieldError(p),
			p.required
		], () => {
			syncOptions();
			nextTick$1(validity);
		});
		watch(opened, (v, old) => {
			if (!v && old) emit("close", reason);
		});
		onMounted(() => {
			syncOptions();
			validity();
			document.addEventListener("pointerdown", outside);
			document.addEventListener("focusin", outside);
			window.addEventListener("resize", locate);
			document.addEventListener("scroll", locate, true);
		});
		onBeforeUnmount(() => {
			document.removeEventListener("pointerdown", outside);
			document.removeEventListener("focusin", outside);
			window.removeEventListener("resize", locate);
			document.removeEventListener("scroll", locate, true);
			if (panel.value?.contains(document.activeElement) && opener?.isConnected) opener.focus();
		});
		const validation = useSFieldValidation(p, () => parse().value, {
			focus: () => input.value?.focus(),
			validateIntrinsic,
			intrinsicError: () => localError.value,
			resetIntrinsic: () => {
				localError.value = "";
			}
		}), validate = validation.validate;
		expose({
			...validation,
			clear: () => commit(null)
		});
		return () => {
			const error = fieldError(p) || localError.value, hours = Array.from({ length: 24 }, (_, i) => i).filter((v) => Array.from({ length: 60 }, (_, n) => n).some((n) => allowed(v * 60 + n))), minutes = Array.from({ length: 60 }, (_, i) => i).filter((n) => hour.value !== "" && allowed(Number(hour.value) * 60 + n));
			const pad = (v) => String(v).padStart(2, "0");
			return h$1("div", { class: "sol-field sol-ui-native-field" }, [
				fieldLabel(p, slots, l.value.required),
				h$1("div", { class: "sol-time-entry" }, [h$1("input", {
					...attrs,
					ref: input,
					id: p.id,
					type: "text",
					class: ["sol-input", attrs.class],
					inputmode: "numeric",
					maxlength: 5,
					autocomplete: "off",
					value: draft.value,
					disabled: fieldDisabled(p),
					readonly: fieldReadonly(p),
					required: p.required,
					placeholder: "HH:mm",
					"aria-haspopup": "dialog",
					"aria-controls": opened.value ? p.id + "-panel" : void 0,
					"aria-invalid": error ? "true" : void 0,
					"aria-describedby": fieldDescription(p, slots, error, [p.id + "-format", attrs["aria-describedby"]].filter(Boolean).join(" ")),
					onInput: (e) => {
						if (fieldDisabled(p) || fieldReadonly(p)) return;
						draft.value = e.target.value;
						syncOptions();
						if (localError.value) localError.value = parse().error;
						validity();
					},
					onClick: () => void open(false, input.value),
					onBlur: () => {
						if (!fieldReadonly(p) && !fieldDisabled(p)) validate();
					},
					onInvalid: (e) => {
						e.preventDefault();
						validate();
						input.value?.focus();
					},
					onKeydown: (e) => {
						if (e.isComposing) return;
						if (e.key === "ArrowDown" && e.altKey) {
							e.preventDefault();
							open(true, input.value);
						} else if (e.key === "Escape") {
							e.preventDefault();
							close("escape");
						} else if (e.key === "Enter") {
							e.preventDefault();
							validate();
						}
					}
				}), h$1("button", {
					ref: trigger,
					type: "button",
					class: "sol-button",
					disabled: fieldDisabled(p) || fieldReadonly(p),
					"aria-haspopup": "dialog",
					"aria-controls": opened.value ? p.id + "-panel" : void 0,
					"aria-expanded": String(opened.value),
					"aria-label": p.label + " " + l.value.time,
					onClick: () => opened.value ? close() : void open(true, trigger.value)
				}, l.value.time)]),
				h$1("span", {
					id: p.id + "-format",
					class: "sol-hint"
				}, l.value.timeHelp(p.min, p.max, p.step)),
				...fieldMessages(p, slots, error),
				h$1("button", {
					type: "button",
					class: "sol-button inline-action sol-ui-picker-clear",
					disabled: fieldDisabled(p) || fieldReadonly(p),
					onClick: () => {
						close("close", false);
						commit(null);
						input.value?.focus();
					}
				}, l.value.clear),
				h$1(Teleport, { to: "body" }, [opened.value ? h$1("div", {
					ref: panel,
					id: p.id + "-panel",
					class: "sol-time-panel sol-ui-time-panel",
					role: "dialog",
					"aria-labelledby": p.id + "-title",
					style: position.value,
					onKeydown: (e) => {
						if (e.key === "Escape" && !e.isComposing) {
							e.preventDefault();
							e.stopPropagation();
							close("escape");
						}
					}
				}, [
					h$1("div", { class: "sol-ui-picker-top" }, [h$1("strong", { id: p.id + "-title" }, l.value.time), h$1("button", {
						type: "button",
						class: "sol-button inline-action",
						onClick: () => close()
					}, l.value.close)]),
					h$1("div", { class: "sol-time-options" }, [h$1("label", { class: "sol-field" }, [h$1("span", { class: "sol-label" }, l.value.hour), h$1("select", {
						ref: hourSelect,
						class: "sol-select",
						value: hour.value,
						onChange: (e) => {
							hour.value = e.target.value;
							select();
						}
					}, [h$1("option", { value: "" }, l.value.choose), ...hours.map((n) => h$1("option", { value: pad(n) }, pad(n)))])]), h$1("label", { class: "sol-field" }, [h$1("span", { class: "sol-label" }, l.value.minute), h$1("select", {
						ref: minuteSelect,
						class: "sol-select",
						value: minute.value,
						onChange: (e) => {
							minute.value = e.target.value;
							select();
						}
					}, [h$1("option", { value: "" }, l.value.choose), ...minutes.map((n) => h$1("option", { value: pad(n) }, pad(n)))])])]),
					h$1("button", {
						type: "button",
						class: "sol-button",
						onClick: () => {
							if (!hour.value) {
								hourSelect.value?.focus();
								return;
							}
							if (!minute.value) {
								minuteSelect.value?.focus();
								return;
							}
							if (validate()) close("select");
						}
					}, l.value.done)
				]) : null])
			]);
		};
	}
});
// packages/vue-ui/src/selection.ts
var SSegmentedControl = defineComponent({
	name: "SSegmentedControl",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: {
			type: String,
			default: null
		},
		options: {
			type: Array,
			required: true
		},
		name: String
	},
	emits: {
		"update:modelValue": (_v) => true,
		change: (_v) => true
	},
	setup(p, { attrs, slots, emit, expose }) {
		const l = useSolLocale(() => p.locale), inputs = /* @__PURE__ */ new Map();
		const enabled = () => p.options.filter((o) => !o.disabled), chosen = () => enabled().find((o) => o.value === p.modelValue) || enabled()[0];
		function choose(value) {
			if (fieldDisabled(p) || fieldReadonly(p) || !enabled().some((o) => o.value === value)) return;
			if (value !== p.modelValue) {
				emit("update:modelValue", value);
				emit("change", value);
			}
		}
		function key(e, value) {
			if (e.isComposing || fieldDisabled(p)) return;
			const list = enabled(), i = list.findIndex((o) => o.value === value);
			let n;
			if (e.key === "Home") n = 0;
			else if (e.key === "End") n = list.length - 1;
			else if (["ArrowRight", "ArrowDown"].includes(e.key)) n = (i + 1) % list.length;
			else if (["ArrowLeft", "ArrowUp"].includes(e.key)) n = (i - 1 + list.length) % list.length;
			else if (e.key === " " && fieldReadonly(p)) e.preventDefault();
			if (n === void 0 || !list[n]) return;
			e.preventDefault();
			inputs.get(list[n].value)?.focus();
			choose(list[n].value);
		}
		expose(useSFieldValidation(p, () => p.modelValue, { focus: () => inputs.get(chosen()?.value || "")?.focus() }));
		return () => h$1("fieldset", {
			...attrs,
			id: p.id,
			disabled: fieldDisabled(p),
			class: ["sol-ui-native-field sol-ui-segments", attrs.class],
			"aria-describedby": fieldDescription(p, slots)
		}, [
			h$1("legend", {
				class: "sol-label",
				id: p.id + "-label"
			}, [slots.label?.() || p.label, p.required ? " (" + l.value.required + ")" : ""]),
			h$1("div", { class: "sol-ui-segment-options" }, p.options.map((o, i) => h$1("label", {
				class: "sol-ui-segment",
				for: p.id + "-" + i
			}, [h$1("input", {
				ref: (e) => {
					if (e) inputs.set(o.value, e);
					else inputs.delete(o.value);
				},
				id: p.id + "-" + i,
				name: p.name || p.id,
				type: "radio",
				value: o.value,
				checked: p.modelValue === o.value,
				disabled: fieldDisabled(p) || o.disabled,
				required: p.required,
				"aria-invalid": fieldError(p) ? "true" : void 0,
				"aria-describedby": fieldDescription(p, slots),
				tabindex: !fieldDisabled(p) && !o.disabled && chosen()?.value === o.value ? 0 : -1,
				"aria-disabled": fieldReadonly(p) ? "true" : void 0,
				onClick: (e) => {
					if (fieldReadonly(p)) e.preventDefault();
				},
				onChange: (e) => {
					if (fieldDisabled(p) || fieldReadonly(p)) e.target.checked = p.modelValue === o.value;
					else choose(o.value);
				},
				onKeydown: (e) => key(e, o.value)
			}), h$1("span", o.label)]))),
			...fieldMessages(p, slots)
		]);
	}
});
var SMultiSelect = defineComponent({
	name: "SMultiSelect",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: {
			type: Array,
			default: () => []
		},
		options: {
			type: Array,
			default: () => []
		},
		loadOptions: Function,
		maxSelected: Number,
		placeholder: String,
		debounce: {
			type: Number,
			default: 150
		}
	},
	emits: {
		"update:modelValue": (_v) => true,
		change: (_v) => true,
		search: (_q) => true,
		open: () => true,
		close: () => true,
		invalid: (_m) => true
	},
	setup(p, { attrs, slots, emit, expose }) {
		const l = useSolLocale(() => p.locale), host = ref$1(null), input = ref$1(null), query = ref$1(""), opened = ref$1(false), active = ref$1(""), items = ref$1([]), busy = ref$1(false), loadError = ref$1(""), localError = ref$1("");
		const labels = /* @__PURE__ */ new Map();
		let composing = false, request = 0, abort, timer, disposed = false;
		const remember = (list) => {
			const seen = /* @__PURE__ */ new Set();
			return list.filter((o) => !!o.value && !seen.has(o.value) && !!seen.add(o.value)).map((o) => {
				labels.set(o.value, o.label);
				return o;
			});
		};
		watch(() => p.options, (value) => {
			const list = remember(value);
			if (!p.loadOptions) items.value = list;
		}, {
			immediate: true,
			deep: true
		});
		const visible = () => p.loadOptions ? items.value : items.value.filter((o) => o.label.toLowerCase().includes(query.value.trim().toLowerCase()));
		const available = () => visible().filter((o) => !o.disabled), selected = () => [...new Set(p.modelValue)], canAdd = (o) => selected().includes(o.value) || p.maxSelected === void 0 || selected().length < p.maxSelected;
		function stop() {
			clearTimeout(timer);
			timer = void 0;
			abort?.abort();
			abort = void 0;
			request++;
			busy.value = false;
		}
		async function load() {
			if (!p.loadOptions || composing || !opened.value || fieldDisabled(p) || fieldReadonly(p)) return;
			stop();
			const revision = request, controller = new AbortController();
			abort = controller;
			busy.value = true;
			loadError.value = "";
			items.value = [];
			active.value = "";
			try {
				const result = await p.loadOptions(query.value, controller.signal);
				if (disposed || revision !== request || controller.signal.aborted) return;
				items.value = remember(result);
				active.value = available()[0]?.value || "";
			} catch (e) {
				if (disposed || revision !== request || controller.signal.aborted) return;
				loadError.value = l.value.loadFailed;
			} finally {
				if (!disposed && revision === request) busy.value = false;
			}
		}
		function search() {
			emit("search", query.value);
			if (p.loadOptions) {
				stop();
				loadError.value = "";
				items.value = [];
				timer = setTimeout(() => void load(), Math.max(0, p.debounce));
			} else active.value = available()[0]?.value || "";
		}
		function open() {
			if (fieldDisabled(p) || fieldReadonly(p)) return;
			const was = opened.value;
			opened.value = true;
			if (!was) {
				if (p.loadOptions) load();
				else active.value = available()[0]?.value || "";
			}
		}
		function close() {
			if (!opened.value) return;
			opened.value = false;
			active.value = "";
			stop();
		}
		function validity() {
			input.value?.setCustomValidity(fieldError(p) || (p.required && !selected().length ? l.value.chooseAtLeastOne : ""));
		}
		function validateIntrinsic() {
			localError.value = p.required && !selected().length ? l.value.chooseAtLeastOne : "";
			validity();
			if (localError.value) emit("invalid", localError.value);
			return !externalFieldError(p) && !localError.value;
		}
		function commit(values) {
			if (fieldDisabled(p) || fieldReadonly(p)) return;
			emit("update:modelValue", values);
			emit("change", values);
		}
		function toggle(o) {
			if (fieldDisabled(p) || fieldReadonly(p) || o.disabled || busy.value || loadError.value) return;
			const values = selected();
			if (values.includes(o.value)) commit(values.filter((v) => v !== o.value));
			else if (canAdd(o)) commit([...values, o.value]);
			else {
				localError.value = l.value.selectionLimit(p.maxSelected);
				emit("invalid", localError.value);
			}
			input.value?.focus();
		}
		function remove(value) {
			if (fieldDisabled(p) || fieldReadonly(p)) return;
			commit(selected().filter((v) => v !== value));
			input.value?.focus();
		}
		function key(e) {
			if (e.isComposing || composing || fieldDisabled(p)) return;
			if (e.key === "Escape" && opened.value) {
				e.preventDefault();
				close();
				return;
			}
			if (fieldReadonly(p)) return;
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				if (!opened.value) {
					open();
					return;
				}
				const list = available(), index = list.findIndex((o) => o.value === active.value);
				active.value = list[(index + (e.key === "ArrowDown" ? 1 : -1) + list.length) % list.length]?.value || "";
				nextTick$1(() => host.value?.querySelector("[data-active=\"true\"]")?.scrollIntoView?.({ block: "nearest" }));
			} else if (e.key === "Enter" && opened.value) {
				e.preventDefault();
				const item = available().find((o) => o.value === active.value);
				if (item) toggle(item);
			} else if (e.key === "Backspace" && !query.value && selected().length) {
				e.preventDefault();
				remove(selected().at(-1));
			}
		}
		const outside = (e) => {
			if (!host.value?.contains(e.target)) close();
		};
		watch(opened, (value) => {
			if (value) emit("open");
			else emit("close");
		});
		watch(l, () => {
			if (loadError.value) loadError.value = l.value.loadFailed;
			if (localError.value) localError.value = p.required && !selected().length ? l.value.chooseAtLeastOne : l.value.selectionLimit(p.maxSelected);
			nextTick$1(validity);
		});
		watch(() => [...p.modelValue], () => {
			localError.value = "";
			nextTick$1(validity);
		});
		watch(() => [fieldDisabled(p), fieldReadonly(p)], () => {
			if (fieldDisabled(p) || fieldReadonly(p)) close();
		});
		watch(() => [p.required, fieldError(p)], () => nextTick$1(validity));
		watch(() => p.loadOptions, () => {
			stop();
			items.value = p.loadOptions ? [] : remember(p.options);
			if (opened.value && p.loadOptions) load();
		});
		onMounted(() => {
			document.addEventListener("pointerdown", outside);
			document.addEventListener("focusin", outside);
			validity();
		});
		onBeforeUnmount(() => {
			disposed = true;
			stop();
			document.removeEventListener("pointerdown", outside);
			document.removeEventListener("focusin", outside);
		});
		const validation = useSFieldValidation(p, () => p.modelValue, {
			focus: () => input.value?.focus(),
			validateIntrinsic,
			intrinsicError: () => localError.value,
			resetIntrinsic: () => {
				localError.value = "";
			}
		}), validate = validation.validate;
		expose({
			...validation,
			clear: () => commit([])
		});
		return () => {
			const error = fieldError(p) || localError.value, list = visible();
			return h$1("div", {
				ref: host,
				class: "sol-field sol-ui-native-field sol-ui-multiselect"
			}, [
				fieldLabel(p, slots, l.value.required),
				selected().length ? h$1("ul", {
					class: "sol-ui-tags",
					"aria-label": p.label + " " + l.value.selectedItems
				}, selected().map((value) => h$1("li", { key: value }, [h$1("span", labels.get(value) || value), h$1("button", {
					type: "button",
					class: "sol-button inline-action",
					disabled: fieldDisabled(p) || fieldReadonly(p),
					"aria-label": l.value.remove(labels.get(value) || value),
					onClick: () => remove(value)
				}, "×")]))) : null,
				h$1("input", {
					...attrs,
					ref: input,
					id: p.id,
					type: "text",
					class: ["sol-input", attrs.class],
					role: "combobox",
					value: query.value,
					placeholder: p.placeholder,
					disabled: fieldDisabled(p),
					readonly: fieldReadonly(p),
					autocomplete: "off",
					"aria-autocomplete": "list",
					"aria-expanded": String(opened.value),
					"aria-controls": opened.value ? p.id + "-list" : void 0,
					"aria-activedescendant": opened.value && !busy.value && !loadError.value && list.some((o) => o.value === active.value) ? p.id + "-option-" + list.findIndex((o) => o.value === active.value) : void 0,
					"aria-required": p.required ? "true" : void 0,
					"aria-invalid": error ? "true" : void 0,
					"aria-describedby": fieldDescription(p, slots, error, [p.id + "-count", attrs["aria-describedby"]].filter(Boolean).join(" ")),
					onClick: open,
					onInput: (e) => {
						if (fieldDisabled(p) || fieldReadonly(p)) return;
						query.value = e.target.value;
						if (!composing) {
							if (!opened.value) opened.value = true;
							search();
						}
					},
					onCompositionstart: () => {
						composing = true;
						stop();
					},
					onCompositionend: (e) => {
						composing = false;
						query.value = e.target.value;
						if (!fieldDisabled(p) && !fieldReadonly(p)) {
							opened.value = true;
							search();
						}
					},
					onKeydown: key,
					onInvalid: (e) => {
						e.preventDefault();
						validate();
						input.value?.focus();
					}
				}),
				opened.value ? h$1("div", { class: "sol-ui-multi-popup" }, [h$1("ul", {
					id: p.id + "-list",
					role: "listbox",
					"aria-label": p.label,
					"aria-multiselectable": "true",
					"aria-busy": String(busy.value),
					class: "sol-ui-multi-options"
				}, !busy.value && !loadError.value ? list.map((o, i) => h$1("li", {
					key: o.value,
					id: p.id + "-option-" + i,
					role: "option",
					"aria-selected": String(selected().includes(o.value)),
					"aria-disabled": o.disabled ? "true" : void 0,
					"data-active": String(active.value === o.value),
					onPointerdown: (e) => e.preventDefault(),
					onClick: () => toggle(o)
				}, [
					h$1("span", { "aria-hidden": "true" }, selected().includes(o.value) ? "✓" : "○"),
					h$1("span", o.label),
					o.disabled ? h$1("small", l.value.unavailable) : null
				])) : []), busy.value ? h$1("p", {
					role: "status",
					class: "sol-hint"
				}, l.value.loading) : loadError.value ? h$1("div", { role: "alert" }, [h$1("p", { class: "sol-error" }, loadError.value), h$1("button", {
					type: "button",
					class: "sol-button inline-action",
					onClick: () => {
						input.value?.focus();
						load();
					},
					onKeydown: (e) => {
						if (e.key === "Escape") {
							e.preventDefault();
							close();
							input.value?.focus();
						}
					}
				}, l.value.retry)]) : !list.length ? h$1("p", {
					role: "status",
					class: "sol-hint"
				}, l.value.noResults) : null]) : null,
				h$1("span", {
					id: p.id + "-count",
					class: "sol-hint",
					role: "status"
				}, l.value.selectionCount(selected().length, p.maxSelected)),
				...fieldMessages(p, slots, error)
			]);
		};
	}
});
var SRangeSlider = defineComponent({
	name: "SRangeSlider",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: {
			type: Array,
			required: true
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
		step: {
			type: Number,
			default: 1
		},
		lowerLabel: String,
		upperLabel: String,
		formatValue: Function
	},
	emits: {
		"update:modelValue": (_v) => true,
		change: (_v) => true
	},
	setup(p, { attrs, slots, emit, expose }) {
		const l = useSolLocale(() => p.locale), track = ref$1(null), handles = [];
		let drag = null;
		const valid = () => Number.isFinite(p.min) && Number.isFinite(p.max) && p.min < p.max && Number.isFinite(p.step) && p.step > 0;
		const top = () => valid() ? Number((p.min + Math.floor((p.max - p.min) / p.step + 1e-9) * p.step).toFixed(10)) : 1;
		const snap = (n) => valid() ? Number(Math.max(p.min, Math.min(top(), p.min + Math.round((n - p.min) / p.step) * p.step)).toFixed(10)) : 0;
		const values = () => {
			const a = snap(Number.isFinite(p.modelValue[0]) ? p.modelValue[0] : p.min), b = snap(Number.isFinite(p.modelValue[1]) ? p.modelValue[1] : top());
			return [Math.min(a, b), Math.max(a, b)];
		};
		function adjust(index, value, complete = true) {
			if (fieldDisabled(p) || fieldReadonly(p) || !valid()) return;
			const next = values();
			next[index] = index === 0 ? Math.min(snap(value), next[1]) : Math.max(snap(value), next[0]);
			if (next[0] !== p.modelValue[0] || next[1] !== p.modelValue[1]) {
				emit("update:modelValue", next);
				if (drag) drag.last = next;
				if (complete) emit("change", next);
			}
		}
		function key(e, index) {
			if (e.isComposing || fieldDisabled(p) || fieldReadonly(p)) return;
			const v = values(), step = p.step * (e.shiftKey ? 10 : 1);
			let n;
			if (["ArrowRight", "ArrowUp"].includes(e.key)) n = v[index] + step;
			else if (["ArrowLeft", "ArrowDown"].includes(e.key)) n = v[index] - step;
			else if (e.key === "Home") n = index === 0 ? p.min : v[0];
			else if (e.key === "End") n = index === 0 ? v[1] : top();
			else if (e.key === "PageUp") n = v[index] + p.step * 10;
			else if (e.key === "PageDown") n = v[index] - p.step * 10;
			if (n !== void 0) {
				e.preventDefault();
				adjust(index, n);
			}
		}
		function at(clientX) {
			const r = track.value.getBoundingClientRect();
			return r.width ? p.min + (clientX - r.left) / r.width * (top() - p.min) : p.min;
		}
		function end(e, complete = true) {
			if (!drag || e && e.pointerId !== drag.id) return;
			const old = drag;
			drag = null;
			try {
				old.target.releasePointerCapture?.(old.id);
			} catch {}
			if (complete && (old.last[0] !== old.start[0] || old.last[1] !== old.start[1])) emit("change", [...old.last]);
		}
		watch(() => [
			fieldDisabled(p),
			fieldReadonly(p),
			p.min,
			p.max,
			p.step
		], () => end(void 0, false));
		onBeforeUnmount(() => {
			drag = null;
		});
		expose(useSFieldValidation(p, () => p.modelValue, {
			focus: () => handles[0]?.focus(),
			validateIntrinsic: valid,
			intrinsicError: () => valid() ? "" : l.value.invalidNumber
		}));
		return () => {
			const v = values(), range = top() - p.min, pct = (n) => range > 0 ? 100 * (n - p.min) / range : 0, display = (n) => p.formatValue?.(n) ?? formatSolNumber(n, l.value);
			return h$1("div", {
				...attrs,
				class: ["sol-field sol-ui-range", attrs.class],
				role: "group",
				"aria-labelledby": p.id + "-label",
				"aria-describedby": fieldDescription(p, slots)
			}, [
				h$1("div", {
					id: p.id + "-label",
					class: "sol-label"
				}, slots.label?.() || p.label),
				h$1("div", { class: "sol-ui-range-values" }, [h$1("span", { id: p.id + "-lower" }, (p.lowerLabel || l.value.lower) + ": " + display(v[0])), h$1("span", { id: p.id + "-upper" }, (p.upperLabel || l.value.upper) + ": " + display(v[1]))]),
				h$1("div", {
					class: "sol-ui-range-target",
					onPointerdown: (e) => {
						if (e.target.closest("[role=slider]") || e.button !== 0 || fieldDisabled(p) || fieldReadonly(p) || !valid()) return;
						e.preventDefault();
						const n = at(e.clientX), index = n > v[1] ? 1 : n < v[0] ? 0 : Math.abs(n - v[0]) <= Math.abs(n - v[1]) ? 0 : 1;
						adjust(index, n);
						handles[index]?.focus();
					}
				}, [h$1("div", {
					ref: track,
					class: "sol-ui-range-rail"
				}, h$1("div", {
					class: "sol-ui-range-fill",
					style: {
						left: pct(v[0]) + "%",
						width: pct(v[1]) - pct(v[0]) + "%"
					}
				})), ...[0, 1].map((index) => h$1("div", {
					ref: (e) => {
						handles[index] = e;
					},
					id: p.id + (index === 0 ? "-lower-thumb" : "-upper-thumb"),
					role: "slider",
					tabindex: fieldDisabled(p) || !valid() ? -1 : 0,
					class: "sol-ui-range-thumb",
					style: { left: pct(v[index]) + "%" },
					"aria-labelledby": p.id + "-label " + p.id + (index === 0 ? "-lower" : "-upper"),
					"aria-valuemin": index === 0 ? p.min : v[0],
					"aria-valuemax": index === 0 ? v[1] : top(),
					"aria-valuenow": v[index],
					"aria-valuetext": display(v[index]),
					"aria-disabled": fieldDisabled(p) || !valid() ? "true" : void 0,
					"aria-readonly": fieldReadonly(p) ? "true" : void 0,
					"aria-invalid": fieldError(p) ? "true" : void 0,
					"aria-describedby": fieldDescription(p, slots, fieldError(p), p.id + "-keys"),
					onKeydown: (e) => key(e, index),
					onPointerdown: (e) => {
						if (drag || e.button !== 0 || fieldDisabled(p) || fieldReadonly(p) || !valid()) return;
						e.preventDefault();
						handles[index]?.focus();
						drag = {
							id: e.pointerId,
							index,
							start: v,
							last: v,
							target: e.currentTarget
						};
						drag.target.setPointerCapture?.(e.pointerId);
					},
					onPointermove: (e) => {
						if (drag?.id === e.pointerId) adjust(index, at(e.clientX), false);
					},
					onPointerup: end,
					onPointercancel: end,
					onLostpointercapture: () => end()
				}))]),
				h$1("p", {
					id: p.id + "-keys",
					class: "sol-hint"
				}, l.value.rangeKeys),
				...fieldMessages(p, slots, fieldError(p) || (!valid() ? l.value.invalidNumber : ""))
			]);
		};
	}
});
// packages/vue-ui/src/actions.ts
var actionProps = {
	id: {
		type: String,
		required: true
	},
	label: {
		type: String,
		required: true
	},
	items: {
		type: Array,
		required: true
	},
	disabled: Boolean,
	readonly: Boolean,
	open: {
		type: Boolean,
		default: void 0
	},
	locale: Object
};
var actionEmits = {
	"update:open": (_v) => true,
	select: (_id) => true,
	open: () => true,
	close: (_why) => true
};
function menu(p, emit, root) {
	const local = ref$1(false), expanded = computed(() => !p.disabled && !p.readonly && p.items.some((item) => !item.disabled) && (p.open ?? local.value)), panel = ref$1(null), active = ref$1(""), position = ref$1({
		left: "8px",
		top: "8px"
	}), buttons = /* @__PURE__ */ new Map();
	let opener = null, anchor = null, point = null, reason = "programmatic", restore = true, requestedOpen = false, buffer = "", bufferTimer, disposed = false;
	const enabled = () => p.items.filter((i) => !i.disabled);
	function request(value) {
		if (p.open === void 0) local.value = value;
		emit("update:open", value);
	}
	function locate() {
		if (!expanded.value || !panel.value) return;
		const b = panel.value.getBoundingClientRect(), r = anchor?.getBoundingClientRect(), x = point?.x ?? r?.left ?? 8, y = point?.y ?? r?.bottom ?? 8;
		position.value = {
			left: Math.max(8, Math.min(x, window.innerWidth - b.width - 8)) + "px",
			top: Math.max(8, Math.min(y + 4, window.innerHeight - b.height - 8)) + "px"
		};
	}
	function open(from, coordinates, last = false) {
		if (p.disabled || p.readonly || !enabled().length) return;
		requestedOpen = true;
		opener = from;
		anchor = from;
		point = coordinates || null;
		active.value = (last ? enabled().at(-1) : enabled()[0])?.id || "";
		if (expanded.value) {
			requestedOpen = false;
			locate();
			nextTick$1(() => buttons.get(active.value)?.focus());
			return;
		}
		request(true);
	}
	function close(why = "programmatic", returnFocus = true) {
		if (!expanded.value) return;
		reason = why;
		restore = returnFocus;
		request(false);
	}
	function choose(item) {
		if (p.disabled || p.readonly || item.disabled) return;
		emit("select", item.id);
		close("select");
	}
	function key(e) {
		if (e.isComposing) return;
		const list = enabled(), i = list.findIndex((x) => x.id === active.value);
		let n;
		if (e.key === "Escape") {
			e.preventDefault();
			e.stopPropagation();
			close("escape");
			return;
		}
		if (e.key === "Tab") {
			close("tab", false);
			return;
		}
		if (e.key === "Home") n = 0;
		else if (e.key === "End") n = list.length - 1;
		else if (e.key === "ArrowDown") n = (i + 1) % list.length;
		else if (e.key === "ArrowUp") n = (i - 1 + list.length) % list.length;
		else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && e.key !== " ") {
			clearTimeout(bufferTimer);
			buffer += e.key.toLowerCase();
			bufferTimer = setTimeout(() => buffer = "", 600);
			const start = (i + 1 + list.length) % list.length;
			for (let j = 0; j < list.length; j++) {
				const k = (start + j) % list.length;
				if (list[k].label.toLowerCase().startsWith(buffer)) {
					n = k;
					break;
				}
			}
		}
		if (n !== void 0 && list[n]) {
			e.preventDefault();
			active.value = list[n].id;
			buttons.get(active.value)?.focus();
		}
	}
	const outside = (e) => {
		if (expanded.value && !root.value?.contains(e.target) && !panel.value?.contains(e.target)) close("outside", false);
	};
	watch(expanded, async (value, old) => {
		if (value) {
			if (p.disabled || p.readonly) {
				request(false);
				return;
			}
			if (!requestedOpen && typeof document !== "undefined") {
				opener = document.activeElement;
				anchor = opener;
				point = null;
			}
			requestedOpen = false;
			if (!enabled().some((i) => i.id === active.value)) active.value = enabled()[0]?.id || "";
			await nextTick$1();
			if (disposed || !expanded.value) return;
			try {
				panel.value?.showPopover?.();
			} catch {}
			locate();
			buttons.get(active.value)?.focus();
			emit("open");
		} else if (old) {
			const hadFocus = !!panel.value?.contains(document.activeElement);
			try {
				panel.value?.hidePopover?.();
			} catch {}
			clearTimeout(bufferTimer);
			buffer = "";
			await nextTick$1();
			if (restore && hadFocus && document.activeElement === document.body && opener?.isConnected && !opener.disabled) opener.focus();
			emit("close", reason);
			reason = "programmatic";
			restore = true;
			requestedOpen = false;
		}
	});
	watch(() => [p.disabled, p.readonly], () => {
		if (p.disabled || p.readonly) {
			reason = "disabled";
			restore = true;
			request(false);
		}
	});
	watch(() => p.items, async () => {
		if (!expanded.value) return;
		if (!enabled().length) {
			close();
			return;
		}
		if (!enabled().some((i) => i.id === active.value)) {
			active.value = enabled()[0].id;
			await nextTick$1();
			buttons.get(active.value)?.focus();
		}
	}, { deep: true });
	onMounted(() => {
		document.addEventListener("pointerdown", outside);
		document.addEventListener("focusin", outside);
		window.addEventListener("resize", locate);
		document.addEventListener("scroll", locate, true);
		if (expanded.value) {
			opener = document.activeElement;
			active.value = enabled()[0]?.id || "";
			nextTick$1(() => {
				try {
					panel.value?.showPopover?.();
				} catch {}
				locate();
				buttons.get(active.value)?.focus();
			});
		}
	});
	onBeforeUnmount(() => {
		disposed = true;
		clearTimeout(bufferTimer);
		document.removeEventListener("pointerdown", outside);
		document.removeEventListener("focusin", outside);
		window.removeEventListener("resize", locate);
		document.removeEventListener("scroll", locate, true);
		if (panel.value?.contains(document.activeElement) && opener?.isConnected) opener.focus();
		try {
			panel.value?.hidePopover?.();
		} catch {}
	});
	const render = () => expanded.value ? h$1("div", {
		ref: panel,
		id: p.id + "-menu",
		popover: "manual",
		role: "menu",
		"aria-label": p.label,
		class: "sol-ui-action-menu",
		style: position.value,
		onKeydown: key
	}, p.items.map((item) => h$1("button", {
		ref: (el) => {
			if (el) buttons.set(item.id, el);
			else buttons.delete(item.id);
		},
		id: p.id + "-item-" + item.id,
		type: "button",
		role: "menuitem",
		class: ["sol-button subtle", item.danger ? "sol-ui-menu-danger" : ""],
		"aria-disabled": item.disabled ? "true" : void 0,
		tabindex: !item.disabled && active.value === item.id ? 0 : -1,
		onFocus: () => {
			if (!item.disabled) active.value = item.id;
		},
		onClick: () => choose(item)
	}, item.label))) : null;
	return {
		expanded,
		open,
		close,
		render
	};
}
function chevron() {
	return h$1("svg", {
		viewBox: "0 0 24 24",
		width: 20,
		height: 20,
		fill: "none",
		stroke: "currentColor",
		"stroke-width": 1.6,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"aria-hidden": "true",
		class: "sol-ui-icon"
	}, h$1("path", { d: solIconPaths.chevron }));
}
var SSplitBtn = defineComponent({
	name: "SSplitBtn",
	inheritAttrs: false,
	props: {
		...actionProps,
		menuLabel: String
	},
	emits: {
		...actionEmits,
		primary: (_e) => true
	},
	setup(p, { attrs, slots, emit }) {
		const l = useSolLocale(() => p.locale), root = ref$1(null), trigger = ref$1(null), m = menu(p, emit, root);
		return () => h$1("div", {
			...attrs,
			ref: root,
			id: p.id,
			class: ["sol-ui-split-button", attrs.class],
			role: "group",
			"aria-label": p.label
		}, [
			h$1("button", {
				type: "button",
				class: "sol-button primary",
				disabled: p.disabled,
				"aria-disabled": p.readonly ? "true" : void 0,
				onClick: (e) => {
					if (!p.disabled && !p.readonly) emit("primary", e);
				}
			}, slots.default?.() || p.label),
			h$1("button", {
				ref: trigger,
				type: "button",
				class: "sol-button primary sol-ui-split-toggle",
				disabled: p.disabled,
				"aria-disabled": p.readonly ? "true" : void 0,
				"aria-label": p.menuLabel || p.label + " " + l.value.moreActions,
				"aria-haspopup": "menu",
				"aria-expanded": String(m.expanded.value),
				"aria-controls": m.expanded.value ? p.id + "-menu" : void 0,
				onClick: () => m.expanded.value ? m.close() : m.open(trigger.value),
				onKeydown: (e) => {
					if (e.key === "ArrowDown" || e.key === "ArrowUp") {
						e.preventDefault();
						m.open(trigger.value, void 0, e.key === "ArrowUp");
					}
				}
			}, chevron()),
			m.render()
		]);
	}
});
var SContextMenu = defineComponent({
	name: "SContextMenu",
	inheritAttrs: false,
	props: {
		...actionProps,
		triggerLabel: String
	},
	emits: actionEmits,
	setup(p, { attrs, slots, emit }) {
		const l = useSolLocale(() => p.locale), root = ref$1(null), trigger = ref$1(null), m = menu(p, emit, root);
		function context(e) {
			if (p.disabled || p.readonly || e.target.isContentEditable || e.target.closest("input,textarea,select")) return;
			e.preventDefault();
			const target = e.target;
			target.closest("button,a,[tabindex]") ? target.closest("button,a,[tabindex]").focus() : root.value?.focus();
			m.open(document.activeElement, {
				x: e.clientX,
				y: e.clientY
			});
		}
		return () => h$1("div", {
			...attrs,
			ref: root,
			id: p.id,
			class: ["sol-ui-context", attrs.class]
		}, [
			h$1("div", {
				class: "sol-ui-context-target",
				tabindex: p.disabled ? -1 : 0,
				role: "group",
				"aria-label": p.label,
				"aria-disabled": p.disabled || p.readonly ? "true" : void 0,
				"aria-haspopup": "menu",
				"aria-controls": m.expanded.value ? p.id + "-menu" : void 0,
				onContextmenu: context,
				onKeydown: (e) => {
					if (e.key === "ContextMenu" || e.key === "F10" && e.shiftKey) {
						if (p.disabled || p.readonly) return;
						e.preventDefault();
						m.open(document.activeElement);
					}
				}
			}, [slots.default?.(), h$1("p", { class: "sol-hint" }, l.value.contextKeys)]),
			h$1("button", {
				ref: trigger,
				type: "button",
				class: "sol-button",
				disabled: p.disabled,
				"aria-disabled": p.readonly ? "true" : void 0,
				"aria-haspopup": "menu",
				"aria-expanded": String(m.expanded.value),
				"aria-controls": m.expanded.value ? p.id + "-menu" : void 0,
				onClick: () => m.expanded.value ? m.close() : m.open(trigger.value)
			}, p.triggerLabel || l.value.moreActions),
			m.render()
		]);
	}
});
// packages/vue-ui/src/progress.ts
/** Display-only normalization. Never emits or changes the consuming app's model. */
function resolveSProgress({ modelValue = 0, min = 0, max = 100, state = "determinate" } = {}) {
	const valid = Number.isFinite(min) && Number.isFinite(max) && max > min && [
		"determinate",
		"indeterminate",
		"complete",
		"error"
	].includes(state) && (state === "indeterminate" || state === "complete" || Number.isFinite(modelValue));
	const known = valid && state !== "indeterminate", value = known ? state === "complete" ? max : Math.max(min, Math.min(max, modelValue)) : void 0;
	return {
		valid,
		known,
		value,
		min: valid ? min : 0,
		max: valid ? max : 100,
		ratio: known ? (value - min) / (max - min) : void 0,
		state
	};
}
var props = {
	id: {
		type: String,
		required: true
	},
	label: {
		type: String,
		required: true
	},
	modelValue: {
		type: Number,
		default: 0
	},
	min: {
		type: Number,
		default: 0
	},
	max: {
		type: Number,
		default: 100
	},
	state: {
		type: String,
		default: "determinate"
	},
	message: {
		type: String,
		default: ""
	},
	animated: {
		type: Boolean,
		default: true
	},
	showLabel: {
		type: Boolean,
		default: true
	},
	showValue: {
		type: Boolean,
		default: true
	},
	showMessage: {
		type: Boolean,
		default: true
	},
	announce: {
		type: Boolean,
		default: false
	},
	locale: Object,
	size: {
		type: Number,
		default: 96
	}
};
function progress(name, circular) {
	return defineComponent({
		name,
		inheritAttrs: false,
		props,
		setup(p, { attrs, slots }) {
			const l = useSolLocale(() => p.locale);
			return () => {
				const info = resolveSProgress(p), percent = info.known ? formatSolNumber(info.ratio, l.value, {
					style: "percent",
					maximumSignificantDigits: 3
				}) : "", text = p.message || (!info.valid ? l.value.progressInvalid : p.state === "indeterminate" ? l.value.progressUnknown : p.state === "complete" ? l.value.progressComplete + " · " + percent : p.state === "error" ? l.value.progressError(percent) : l.value.progressRunning(percent));
				const visibleText = p.message || (!info.valid ? l.value.progressInvalid : p.state === "indeterminate" ? l.value.progressUnknown : p.showValue ? text : p.state === "complete" ? l.value.progressComplete : p.state === "error" ? l.value.progressFailed : l.value.progressPending);
				const size = Number.isFinite(p.size) ? Math.max(48, Math.min(256, p.size)) : 96;
				const meter = {
					...attrs,
					id: p.id,
					role: "progressbar",
					"aria-labelledby": p.id + "-label",
					"aria-describedby": [p.id + "-status", attrs["aria-describedby"]].filter(Boolean).join(" "),
					"aria-valuemin": info.min,
					"aria-valuemax": info.max,
					"aria-valuenow": info.value,
					"aria-valuetext": text
				};
				return h$1("div", {
					class: "sol-ui-progress sol-progress-demo",
					"data-state": p.state,
					"data-shape": circular ? "circular" : "linear",
					"data-animation": p.animated && info.valid && p.state === "indeterminate" ? "on" : "off"
				}, [
					h$1("span", {
						id: p.id + "-label",
						class: p.showLabel ? "sol-label" : "sol-ui-sr-only"
					}, slots.label?.() || p.label),
					circular ? h$1("div", {
						...meter,
						class: ["sol-progress-circle sol-ui-progress-circle", attrs.class],
						style: [{ width: size + "px" }, attrs.style]
					}, [h$1("svg", {
						viewBox: "0 0 100 100",
						"aria-hidden": "true",
						focusable: "false"
					}, [h$1("circle", {
						class: "sol-progress-track",
						cx: 50,
						cy: 50,
						r: 40
					}), h$1("circle", {
						class: "sol-progress-arc",
						cx: 50,
						cy: 50,
						r: 40,
						pathLength: 100,
						style: {
							strokeDasharray: info.known ? "100" : "24 76",
							strokeDashoffset: info.known ? String(100 - info.ratio * 100) : "0",
							visibility: info.known && info.ratio === 0 ? "hidden" : void 0
						}
					})]), p.showValue ? h$1("span", {
						class: "sol-progress-circle-text",
						"aria-hidden": "true"
					}, !info.valid ? "!" : p.state === "error" ? "! " + percent : p.state === "complete" ? "✓ " + percent : info.known ? percent : l.value.progressPending) : null]) : h$1("div", {
						...meter,
						class: ["sol-progress sol-ui-progress-linear", attrs.class],
						style: attrs.style
					}, h$1("span", {
						"aria-hidden": "true",
						class: "sol-ui-progress-fill",
						style: { width: info.known ? String(info.ratio * 100) + "%" : "35%" }
					})),
					!circular && p.showValue && !p.showMessage ? h$1("span", {
						class: "sol-ui-progress-value",
						"aria-hidden": "true"
					}, percent) : null,
					h$1("p", {
						id: p.id + "-status",
						class: p.showMessage ? "sol-ui-progress-status" : "sol-ui-sr-only",
						role: p.announce ? "status" : void 0,
						"aria-live": p.announce ? "polite" : void 0,
						"aria-atomic": p.announce ? "true" : void 0
					}, p.showMessage ? visibleText : text)
				]);
			};
		}
	});
}
var SProgressLinear = progress("SProgressLinear", false);
var SProgressCircular = progress("SProgressCircular", true);
// packages/vue-ui/src/split-pane.ts
var SResizableSplitPane = defineComponent({
	name: "SResizableSplitPane",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: {
			type: Number,
			default: 50
		},
		min: {
			type: Number,
			default: 20
		},
		max: {
			type: Number,
			default: 80
		},
		step: {
			type: Number,
			default: 1
		},
		orientation: {
			type: String,
			default: "horizontal"
		},
		collapseBelow: {
			type: Number,
			default: 560
		},
		primaryLabel: {
			type: String,
			required: true
		},
		secondaryLabel: {
			type: String,
			required: true
		}
	},
	emits: {
		"update:modelValue": (_v) => true,
		change: (_v) => true,
		reflow: (_stacked) => true
	},
	setup(p, { attrs, slots, emit }) {
		const l = useSolLocale(() => p.locale), host = ref$1(null), layout = ref$1(null), separator = ref$1(null), primary = ref$1(null), secondary = ref$1(null), stacked = ref$1(false);
		let observer, previous = 50, drag = null;
		const valid = () => Number.isFinite(p.min) && Number.isFinite(p.max) && p.min >= 0 && p.max <= 100 && p.min < p.max && Number.isFinite(p.step) && p.step > 0;
		const low = () => valid() ? p.min : 0, high = () => valid() ? Number((p.min + Math.floor((p.max - p.min) / p.step + 1e-9) * p.step).toFixed(6)) : 100;
		const snap = (n) => valid() ? Number(Math.max(low(), Math.min(high(), p.min + Math.round((n - p.min) / p.step) * p.step)).toFixed(6)) : 50;
		const value = () => snap(Number.isFinite(p.modelValue) ? p.modelValue : 50);
		function adjust(n, complete = true) {
			if (p.disabled || p.readonly || stacked.value || !valid()) return;
			const next = snap(n);
			if (next !== p.modelValue) {
				emit("update:modelValue", next);
				if (drag) drag.last = next;
				if (complete) emit("change", next);
			}
		}
		function finish(e, complete = true) {
			if (!drag || e && drag.id !== e.pointerId) return;
			const old = drag;
			drag = null;
			try {
				old.target.releasePointerCapture?.(old.id);
			} catch {}
			if (complete && old.last !== old.start) emit("change", old.last);
		}
		function measure() {
			const width = host.value?.getBoundingClientRect().width || 0, next = p.collapseBelow > 0 && width > 0 && width < p.collapseBelow;
			if (next !== stacked.value) {
				const hadFocus = document.activeElement === separator.value;
				finish();
				stacked.value = next;
				emit("reflow", next);
				if (next && hadFocus) nextTick$1(() => primary.value?.focus());
			}
		}
		function key(e) {
			if (e.isComposing || p.disabled || p.readonly || stacked.value) return;
			const v = value(), forward = p.orientation === "horizontal" ? "ArrowRight" : "ArrowDown", back = p.orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
			let next;
			if (e.key === forward) next = v + p.step * (e.shiftKey ? 10 : 1);
			else if (e.key === back) next = v - p.step * (e.shiftKey ? 10 : 1);
			else if (e.key === "Home") next = low();
			else if (e.key === "End") next = high();
			else if (e.key === "Enter") {
				if (v > low()) {
					previous = v;
					next = low();
				} else next = previous > low() ? previous : high();
			}
			if (next !== void 0) {
				e.preventDefault();
				adjust(next);
			}
		}
		watch(() => [
			p.disabled,
			p.readonly,
			p.orientation,
			p.min,
			p.max,
			p.step
		], () => finish(void 0, false));
		watch(() => p.collapseBelow, () => nextTick$1(measure));
		watch(() => p.modelValue, async () => {
			const active = document.activeElement;
			if (value() === 0 && primary.value?.contains(active) || value() === 100 && secondary.value?.contains(active)) {
				await nextTick$1();
				separator.value?.focus();
			}
		});
		onMounted(() => {
			previous = value();
			measure();
			if (typeof ResizeObserver !== "undefined") {
				observer = new ResizeObserver(measure);
				if (host.value) observer.observe(host.value);
			}
			window.addEventListener("resize", measure);
		});
		onBeforeUnmount(() => {
			observer?.disconnect();
			window.removeEventListener("resize", measure);
			drag = null;
		});
		return () => {
			const v = value(), horizontal = p.orientation === "horizontal", grid = stacked.value ? void 0 : horizontal ? { gridTemplateColumns: `minmax(0,${v}fr) var(--sol-split-handle-size) minmax(0,${100 - v}fr)` } : { gridTemplateRows: `minmax(0,${v}fr) var(--sol-split-handle-size) minmax(0,${100 - v}fr)` };
			return h$1("div", {
				...attrs,
				ref: host,
				id: p.id,
				class: ["sol-field sol-ui-split-pane", attrs.class],
				role: "group",
				"aria-labelledby": p.id + "-label",
				"aria-describedby": fieldDescription(p, slots)
			}, [
				h$1("div", {
					id: p.id + "-label",
					class: "sol-label"
				}, slots.label?.() || p.label),
				h$1("div", {
					ref: layout,
					class: ["sol-ui-pane-layout", stacked.value ? "is-stacked" : ""],
					"data-orientation": p.orientation,
					style: grid
				}, [
					h$1("section", {
						ref: primary,
						id: p.id + "-primary",
						class: "sol-ui-pane",
						role: "region",
						"aria-labelledby": p.id + "-primary-label",
						tabindex: -1,
						inert: !stacked.value && v === 0 ? "" : void 0,
						"aria-hidden": !stacked.value && v === 0 ? "true" : void 0
					}, [h$1("div", {
						id: p.id + "-primary-label",
						class: "sol-label"
					}, p.primaryLabel), slots.primary?.({
						size: v,
						stacked: stacked.value
					})]),
					!stacked.value ? h$1("div", {
						ref: separator,
						role: "separator",
						tabindex: p.disabled || !valid() ? -1 : 0,
						class: "sol-ui-separator",
						"aria-labelledby": p.id + "-primary-label",
						"aria-controls": p.id + "-primary " + p.id + "-secondary",
						"aria-orientation": horizontal ? "vertical" : "horizontal",
						"aria-valuemin": low(),
						"aria-valuemax": high(),
						"aria-valuenow": v,
						"aria-valuetext": formatSolNumber(v / 100, l.value, { style: "percent" }),
						"aria-disabled": p.disabled || p.readonly || !valid() ? "true" : void 0,
						"aria-describedby": p.id + "-keys",
						onKeydown: key,
						onPointerdown: (e) => {
							if (drag || e.button !== 0 || p.disabled || p.readonly || !valid()) return;
							e.preventDefault();
							const rect = layout.value.getBoundingClientRect(), bar = separator.value.getBoundingClientRect(), space = horizontal ? rect.width - bar.width : rect.height - bar.height;
							if (space <= 0) return;
							separator.value?.focus();
							drag = {
								id: e.pointerId,
								start: v,
								last: v,
								coordinate: horizontal ? e.clientX : e.clientY,
								space,
								target: e.currentTarget
							};
							drag.target.setPointerCapture?.(e.pointerId);
						},
						onPointermove: (e) => {
							if (drag?.id !== e.pointerId) return;
							adjust(drag.start + ((horizontal ? e.clientX : e.clientY) - drag.coordinate) / drag.space * 100, false);
						},
						onPointerup: finish,
						onPointercancel: finish,
						onLostpointercapture: () => finish()
					}, h$1("span", { "aria-hidden": "true" })) : null,
					h$1("section", {
						ref: secondary,
						id: p.id + "-secondary",
						class: "sol-ui-pane",
						role: "region",
						"aria-labelledby": p.id + "-secondary-label",
						tabindex: -1,
						inert: !stacked.value && v === 100 ? "" : void 0,
						"aria-hidden": !stacked.value && v === 100 ? "true" : void 0
					}, [h$1("div", {
						id: p.id + "-secondary-label",
						class: "sol-label"
					}, p.secondaryLabel), slots.secondary?.({
						size: 100 - v,
						stacked: stacked.value
					})])
				]),
				h$1("p", {
					id: p.id + "-keys",
					class: "sol-hint"
				}, stacked.value ? l.value.splitStacked : l.value.splitKeys),
				...fieldMessages(p, slots, p.error || (!valid() ? l.value.invalidNumber : ""))
			]);
		};
	}
});
// packages/vue-ui/node_modules/vuetify/lib/iconsets/mdi.js
var aliases = {
	collapse: "mdi-chevron-up",
	complete: "mdi-check",
	cancel: "mdi-close-circle",
	close: "mdi-close",
	delete: "mdi-close-circle",
	clear: "mdi-close-circle",
	success: "mdi-check-circle",
	info: "mdi-information",
	warning: "mdi-alert-circle",
	error: "mdi-close-circle",
	prev: "mdi-chevron-left",
	next: "mdi-chevron-right",
	checkboxOn: "mdi-checkbox-marked",
	checkboxOff: "mdi-checkbox-blank-outline",
	checkboxIndeterminate: "mdi-minus-box",
	delimiter: "mdi-circle",
	sortAsc: "mdi-arrow-up",
	sortDesc: "mdi-arrow-down",
	expand: "mdi-chevron-down",
	menu: "mdi-menu",
	subgroup: "mdi-menu-down",
	dropdown: "mdi-menu-down",
	radioOn: "mdi-radiobox-marked",
	radioOff: "mdi-radiobox-blank",
	edit: "mdi-pencil",
	ratingEmpty: "mdi-star-outline",
	ratingFull: "mdi-star",
	ratingHalf: "mdi-star-half-full",
	loading: "mdi-cached",
	first: "mdi-page-first",
	last: "mdi-page-last",
	unfold: "mdi-unfold-more-horizontal",
	file: "mdi-paperclip",
	plus: "mdi-plus",
	minus: "mdi-minus",
	calendar: "mdi-calendar",
	clock: "mdi-clock-outline",
	treeviewCollapse: "mdi-menu-down",
	treeviewExpand: "mdi-menu-right",
	tableGroupCollapse: "mdi-chevron-down",
	tableGroupExpand: "mdi-chevron-right",
	eyeDropper: "mdi-eyedropper",
	upload: "mdi-cloud-upload",
	color: "mdi-palette",
	command: "mdi-apple-keyboard-command",
	ctrl: "mdi-apple-keyboard-control",
	space: "mdi-keyboard-space",
	shift: "mdi-apple-keyboard-shift",
	alt: "mdi-apple-keyboard-option",
	enter: "mdi-keyboard-return",
	arrowup: "mdi-arrow-up",
	arrowdown: "mdi-arrow-down",
	arrowleft: "mdi-arrow-left",
	arrowright: "mdi-arrow-right",
	backspace: "mdi-backspace",
	play: "mdi-play",
	pause: "mdi-pause",
	fullscreen: "mdi-fullscreen",
	fullscreenExit: "mdi-fullscreen-exit",
	volumeHigh: "mdi-volume-high",
	volumeMedium: "mdi-volume-medium",
	volumeLow: "mdi-volume-low",
	volumeOff: "mdi-volume-variant-off",
	search: "mdi-magnify"
};
var mdi = { component: (props) => h$1(VClassIcon, {
	...props,
	class: "mdi"
}) };
// packages/vue-ui/node_modules/vuetify/lib/icons.js
function genDefaults$1() {
	return {
		svg: { component: VSvgIcon },
		class: { component: VClassIcon }
	};
}
function createIcons(options) {
	const sets = genDefaults$1();
	const defaultSet = options?.defaultSet ?? "mdi";
	if (defaultSet === "mdi" && !sets.mdi) sets.mdi = mdi;
	return mergeDeep({
		defaultSet,
		sets,
		aliases: {
			...aliases,
			vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", .6]],
			"vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z",
			"vuetify-play": ["m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z", ["M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z", .6]]
		}
	}, options);
}
// packages/vue-ui/node_modules/vuetify/lib/composables/date/adapters/vuetify.js
function weekInfo(locale) {
	const code = locale.slice(-2).toUpperCase();
	switch (true) {
		case locale === "GB-alt-variant": return {
			firstDay: 0,
			firstWeekSize: 4
		};
		case locale === "001": return {
			firstDay: 1,
			firstWeekSize: 1
		};
		case `AG AS BD BR BS BT BW BZ CA CO DM DO ET GT GU HK HN ID IL IN JM JP KE
    KH KR LA MH MM MO MT MX MZ NI NP PA PE PH PK PR PY SA SG SV TH TT TW UM US
    VE VI WS YE ZA ZW`.includes(code): return {
			firstDay: 0,
			firstWeekSize: 1
		};
		case `AI AL AM AR AU AZ BA BM BN BY CL CM CN CR CY EC GE HR KG KZ LB LK LV
    MD ME MK MN MY NZ RO RS SI TJ TM TR UA UY UZ VN XK`.includes(code): return {
			firstDay: 1,
			firstWeekSize: 1
		};
		case `AD AN AT AX BE BG CH CZ DE DK EE ES FI FJ FO FR GB GF GP GR HU IE IS
    IT LI LT LU MC MQ NL NO PL RE RU SE SK SM VA`.includes(code): return {
			firstDay: 1,
			firstWeekSize: 4
		};
		case `AE AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY`.includes(code): return {
			firstDay: 6,
			firstWeekSize: 1
		};
		case code === "MV": return {
			firstDay: 5,
			firstWeekSize: 1
		};
		case code === "PT": return {
			firstDay: 0,
			firstWeekSize: 4
		};
		default: return null;
	}
}
function getWeekArray(date, locale, firstDayOfWeek) {
	const weeks = [];
	let currentWeek = [];
	const firstDayOfMonth = startOfMonth(date);
	const lastDayOfMonth = endOfMonth(date);
	const first = firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 0;
	const firstDayWeekIndex = (firstDayOfMonth.getDay() - first + 7) % 7;
	const lastDayWeekIndex = (lastDayOfMonth.getDay() - first + 7) % 7;
	for (let i = 0; i < firstDayWeekIndex; i++) {
		const adjacentDay = new Date(firstDayOfMonth);
		adjacentDay.setDate(adjacentDay.getDate() - (firstDayWeekIndex - i));
		currentWeek.push(adjacentDay);
	}
	for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
		const day = new Date(date.getFullYear(), date.getMonth(), i);
		currentWeek.push(day);
		if (currentWeek.length === 7) {
			weeks.push(currentWeek);
			currentWeek = [];
		}
	}
	for (let i = 1; i < 7 - lastDayWeekIndex; i++) {
		const adjacentDay = new Date(lastDayOfMonth);
		adjacentDay.setDate(adjacentDay.getDate() + i);
		currentWeek.push(adjacentDay);
	}
	if (currentWeek.length > 0) weeks.push(currentWeek);
	return weeks;
}
function startOfWeek(date, locale, firstDayOfWeek) {
	let day = (firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 0) % 7;
	if (![
		0,
		1,
		2,
		3,
		4,
		5,
		6
	].includes(day)) {
		consoleWarn("Invalid firstDayOfWeek, expected discrete number in range [0-6]");
		day = 0;
	}
	const d = new Date(date);
	while (d.getDay() !== day) d.setDate(d.getDate() - 1);
	return d;
}
function endOfWeek(date, locale) {
	const d = new Date(date);
	const lastDay = ((weekInfo(locale)?.firstDay ?? 0) + 6) % 7;
	while (d.getDay() !== lastDay) d.setDate(d.getDate() + 1);
	return d;
}
function startOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function parseLocalDate(value) {
	const parts = value.split("-").map(Number);
	return new Date(parts[0], parts[1] - 1, parts[2]);
}
var _YYYMMDD = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function date(value) {
	if (value == null) return /* @__PURE__ */ new Date();
	if (value instanceof Date) return value;
	if (typeof value === "string") {
		let parsed;
		if (_YYYMMDD.test(value)) return parseLocalDate(value);
		else parsed = Date.parse(value);
		if (!isNaN(parsed)) return new Date(parsed);
	}
	return null;
}
var sundayJanuarySecond2000 = new Date(2e3, 0, 2);
function getWeekdays(locale, firstDayOfWeek, weekdayFormat) {
	const daysFromSunday = firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 0;
	return (/* @__PURE__ */ range(7)).map((i) => {
		const weekday = new Date(sundayJanuarySecond2000);
		weekday.setDate(sundayJanuarySecond2000.getDate() + daysFromSunday + i);
		return new Intl.DateTimeFormat(locale, { weekday: weekdayFormat ?? "narrow" }).format(weekday);
	});
}
function format(value, formatString, locale, formats) {
	const newDate = date(value) ?? /* @__PURE__ */ new Date();
	const customFormat = formats?.[formatString];
	if (typeof customFormat === "function") return customFormat(newDate, formatString, locale);
	let options = {};
	switch (formatString) {
		case "fullDate":
			options = {
				year: "numeric",
				month: "short",
				day: "numeric"
			};
			break;
		case "fullDateWithWeekday":
			options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric"
			};
			break;
		case "normalDate": return `${newDate.getDate()} ${new Intl.DateTimeFormat(locale, { month: "long" }).format(newDate)}`;
		case "normalDateWithWeekday":
			options = {
				weekday: "short",
				day: "numeric",
				month: "short"
			};
			break;
		case "shortDate":
			options = {
				month: "short",
				day: "numeric"
			};
			break;
		case "year":
			options = { year: "numeric" };
			break;
		case "month":
			options = { month: "long" };
			break;
		case "monthShort":
			options = { month: "short" };
			break;
		case "monthAndYear":
			options = {
				month: "long",
				year: "numeric"
			};
			break;
		case "monthAndDate":
			options = {
				month: "long",
				day: "numeric"
			};
			break;
		case "weekday":
			options = { weekday: "long" };
			break;
		case "weekdayShort":
			options = { weekday: "short" };
			break;
		case "dayOfMonth": return new Intl.NumberFormat(locale).format(newDate.getDate());
		case "hours12h":
			options = {
				hour: "numeric",
				hour12: true
			};
			break;
		case "hours24h":
			options = {
				hour: "numeric",
				hour12: false
			};
			break;
		case "minutes":
			options = { minute: "numeric" };
			break;
		case "seconds":
			options = { second: "numeric" };
			break;
		case "fullTime":
			options = {
				hour: "numeric",
				minute: "numeric"
			};
			break;
		case "fullTime12h":
			options = {
				hour: "numeric",
				minute: "numeric",
				hour12: true
			};
			break;
		case "fullTime24h":
			options = {
				hour: "numeric",
				minute: "numeric",
				hour12: false
			};
			break;
		case "fullDateTime":
			options = {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "numeric"
			};
			break;
		case "fullDateTime12h":
			options = {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
				hour12: true
			};
			break;
		case "fullDateTime24h":
			options = {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
				hour12: false
			};
			break;
		case "keyboardDate":
			options = {
				year: "numeric",
				month: "2-digit",
				day: "2-digit"
			};
			break;
		case "keyboardDateTime":
			options = {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "numeric",
				minute: "numeric"
			};
			return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, " ");
		case "keyboardDateTime12h":
			options = {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "numeric",
				minute: "numeric",
				hour12: true
			};
			return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, " ");
		case "keyboardDateTime24h":
			options = {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "numeric",
				minute: "numeric",
				hour12: false
			};
			return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, " ");
		default: options = customFormat ?? {
			timeZone: "UTC",
			timeZoneName: "short"
		};
	}
	return new Intl.DateTimeFormat(locale, options).format(newDate);
}
function toISO(adapter, value) {
	const date = adapter.toJsDate(value);
	return `${date.getFullYear()}-${padStart(String(date.getMonth() + 1), 2, "0")}-${padStart(String(date.getDate()), 2, "0")}`;
}
function parseISO(value) {
	const [year, month, day] = value.split("-").map(Number);
	return new Date(year, month - 1, day);
}
function addMinutes(date, amount) {
	const d = new Date(date);
	d.setMinutes(d.getMinutes() + amount);
	return d;
}
function addHours(date, amount) {
	const d = new Date(date);
	d.setHours(d.getHours() + amount);
	return d;
}
function addDays(date, amount) {
	const d = new Date(date);
	d.setDate(d.getDate() + amount);
	return d;
}
function addWeeks(date, amount) {
	const d = new Date(date);
	d.setDate(d.getDate() + amount * 7);
	return d;
}
function addMonths(date, amount) {
	const d = new Date(date);
	d.setDate(1);
	d.setMonth(d.getMonth() + amount);
	return d;
}
function getYear(date) {
	return date.getFullYear();
}
function getMonth(date) {
	return date.getMonth();
}
function getWeek(date, locale, firstDayOfWeek, firstDayOfYear) {
	const weekInfoFromLocale = weekInfo(locale);
	const weekStart = firstDayOfWeek ?? weekInfoFromLocale?.firstDay ?? 0;
	const minWeekSize = weekInfoFromLocale?.firstWeekSize ?? 1;
	return firstDayOfYear !== void 0 ? calculateWeekWithFirstDayOfYear(date, locale, weekStart, firstDayOfYear) : calculateWeekWithMinWeekSize(date, locale, weekStart, minWeekSize);
}
function calculateWeekWithFirstDayOfYear(date, locale, weekStart, firstDayOfYear) {
	const firstDayOfYearOffset = (7 + firstDayOfYear - weekStart) % 7;
	const currentWeekStart = startOfWeek(date, locale, weekStart);
	const currentWeekEnd = addDays(currentWeekStart, 6);
	function yearStartWeekdayOffset(year) {
		return (7 + new Date(year, 0, 1).getDay() - weekStart) % 7;
	}
	let year = getYear(currentWeekStart);
	if (year < getYear(currentWeekEnd) && yearStartWeekdayOffset(year + 1) <= firstDayOfYearOffset) year++;
	const yearStart = new Date(year, 0, 1);
	const offset = yearStartWeekdayOffset(year);
	const d1w1 = offset <= firstDayOfYearOffset ? addDays(yearStart, -offset) : addDays(yearStart, 7 - offset);
	return 1 + getDiff(endOfDay(currentWeekStart), startOfDay(d1w1), "weeks");
}
function calculateWeekWithMinWeekSize(date, locale, weekStart, minWeekSize) {
	const currentWeekStart = startOfWeek(date, locale, weekStart);
	const currentWeekEnd = addDays(startOfWeek(date, locale, weekStart), 6);
	function firstWeekSize(year) {
		const yearStart = new Date(year, 0, 1);
		return 7 - getDiff(yearStart, startOfWeek(yearStart, locale, weekStart), "days");
	}
	let year = getYear(currentWeekStart);
	if (year < getYear(currentWeekEnd) && firstWeekSize(year + 1) >= minWeekSize) year++;
	const yearStart = new Date(year, 0, 1);
	const size = firstWeekSize(year);
	const d1w1 = size >= minWeekSize ? addDays(yearStart, size - 7) : addDays(yearStart, size);
	return 1 + getDiff(endOfDay(currentWeekStart), startOfDay(d1w1), "weeks");
}
function getDate(date) {
	return date.getDate();
}
function getNextMonth(date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}
function getPreviousMonth(date) {
	return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}
function getHours(date) {
	return date.getHours();
}
function getMinutes(date) {
	return date.getMinutes();
}
function startOfYear(date) {
	return new Date(date.getFullYear(), 0, 1);
}
function endOfYear(date) {
	return new Date(date.getFullYear(), 11, 31);
}
function isWithinRange(date, range) {
	return isEqual(date, range[0]) || isEqual(date, range[1]) || isAfter(date, range[0]) && isBefore(date, range[1]);
}
function isValid(date) {
	const d = new Date(date);
	return d instanceof Date && !isNaN(d.getTime());
}
function isAfter(date, comparing) {
	return date.getTime() > comparing.getTime();
}
function isAfterDay(date, comparing) {
	return isAfter(startOfDay(date), startOfDay(comparing));
}
function isBefore(date, comparing) {
	return date.getTime() < comparing.getTime();
}
function isEqual(date, comparing) {
	return date.getTime() === comparing.getTime();
}
function isSameDay(date, comparing) {
	return date.getDate() === comparing.getDate() && date.getMonth() === comparing.getMonth() && date.getFullYear() === comparing.getFullYear();
}
function isSameMonth(date, comparing) {
	return date.getMonth() === comparing.getMonth() && date.getFullYear() === comparing.getFullYear();
}
function isSameYear(date, comparing) {
	return date.getFullYear() === comparing.getFullYear();
}
function getDiff(date, comparing, unit) {
	const d = new Date(date);
	const c = new Date(comparing);
	switch (unit) {
		case "years": return d.getFullYear() - c.getFullYear();
		case "quarters": return Math.floor((d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12) / 4);
		case "months": return d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12;
		case "weeks": return Math.floor((d.getTime() - c.getTime()) / 6048e5);
		case "days": return Math.floor((d.getTime() - c.getTime()) / 864e5);
		case "hours": return Math.floor((d.getTime() - c.getTime()) / 36e5);
		case "minutes": return Math.floor((d.getTime() - c.getTime()) / 6e4);
		case "seconds": return Math.floor((d.getTime() - c.getTime()) / 1e3);
		default: return d.getTime() - c.getTime();
	}
}
function setHours(date, count) {
	const d = new Date(date);
	d.setHours(count);
	return d;
}
function setMinutes(date, count) {
	const d = new Date(date);
	d.setMinutes(count);
	return d;
}
function setMonth(date, count) {
	const d = new Date(date);
	d.setMonth(count);
	return d;
}
function setDate(date, day) {
	const d = new Date(date);
	d.setDate(day);
	return d;
}
function setYear(date, year) {
	const d = new Date(date);
	d.setFullYear(year);
	return d;
}
function startOfDay(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}
function endOfDay(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}
var VuetifyDateAdapter = class {
	constructor(options) {
		this.locale = options.locale;
		this.formats = options.formats;
	}
	date(value) {
		return date(value);
	}
	toJsDate(date) {
		return date;
	}
	toISO(date) {
		return toISO(this, date);
	}
	parseISO(date) {
		return parseISO(date);
	}
	addMinutes(date, amount) {
		return addMinutes(date, amount);
	}
	addHours(date, amount) {
		return addHours(date, amount);
	}
	addDays(date, amount) {
		return addDays(date, amount);
	}
	addWeeks(date, amount) {
		return addWeeks(date, amount);
	}
	addMonths(date, amount) {
		return addMonths(date, amount);
	}
	getWeekArray(date, firstDayOfWeek) {
		const firstDay = firstDayOfWeek !== void 0 ? Number(firstDayOfWeek) : void 0;
		return getWeekArray(date, this.locale, firstDay);
	}
	startOfWeek(date, firstDayOfWeek) {
		const firstDay = firstDayOfWeek !== void 0 ? Number(firstDayOfWeek) : void 0;
		return startOfWeek(date, this.locale, firstDay);
	}
	endOfWeek(date) {
		return endOfWeek(date, this.locale);
	}
	startOfMonth(date) {
		return startOfMonth(date);
	}
	endOfMonth(date) {
		return endOfMonth(date);
	}
	format(date, formatString) {
		return format(date, formatString, this.locale, this.formats);
	}
	isEqual(date, comparing) {
		return isEqual(date, comparing);
	}
	isValid(date) {
		return isValid(date);
	}
	isWithinRange(date, range) {
		return isWithinRange(date, range);
	}
	isAfter(date, comparing) {
		return isAfter(date, comparing);
	}
	isAfterDay(date, comparing) {
		return isAfterDay(date, comparing);
	}
	isBefore(date, comparing) {
		return !isAfter(date, comparing) && !isEqual(date, comparing);
	}
	isSameDay(date, comparing) {
		return isSameDay(date, comparing);
	}
	isSameMonth(date, comparing) {
		return isSameMonth(date, comparing);
	}
	isSameYear(date, comparing) {
		return isSameYear(date, comparing);
	}
	setMinutes(date, count) {
		return setMinutes(date, count);
	}
	setHours(date, count) {
		return setHours(date, count);
	}
	setMonth(date, count) {
		return setMonth(date, count);
	}
	setDate(date, day) {
		return setDate(date, day);
	}
	setYear(date, year) {
		return setYear(date, year);
	}
	getDiff(date, comparing, unit) {
		return getDiff(date, comparing, unit);
	}
	getWeekdays(firstDayOfWeek, weekdayFormat) {
		const firstDay = firstDayOfWeek !== void 0 ? Number(firstDayOfWeek) : void 0;
		return getWeekdays(this.locale, firstDay, weekdayFormat);
	}
	getYear(date) {
		return getYear(date);
	}
	getMonth(date) {
		return getMonth(date);
	}
	getWeek(date, firstDayOfWeek, firstDayOfYear) {
		const firstDay = firstDayOfWeek !== void 0 ? Number(firstDayOfWeek) : void 0;
		const firstWeekStart = firstDayOfYear !== void 0 ? Number(firstDayOfYear) : void 0;
		return getWeek(date, this.locale, firstDay, firstWeekStart);
	}
	getDate(date) {
		return getDate(date);
	}
	getNextMonth(date) {
		return getNextMonth(date);
	}
	getPreviousMonth(date) {
		return getPreviousMonth(date);
	}
	getHours(date) {
		return getHours(date);
	}
	getMinutes(date) {
		return getMinutes(date);
	}
	startOfDay(date) {
		return startOfDay(date);
	}
	endOfDay(date) {
		return endOfDay(date);
	}
	startOfYear(date) {
		return startOfYear(date);
	}
	endOfYear(date) {
		return endOfYear(date);
	}
};
// packages/vue-ui/node_modules/vuetify/lib/composables/date/date.js
var DateOptionsSymbol = Symbol.for("vuetify:date-options");
var DateAdapterSymbol = Symbol.for("vuetify:date-adapter");
function createDate(options, locale) {
	const _options = mergeDeep({
		adapter: VuetifyDateAdapter,
		locale: {
			af: "af-ZA",
			ar: "ar-DZ",
			bg: "bg-BG",
			ca: "ca-ES",
			ckb: "ckb-IQ",
			cs: "cs-CZ",
			da: "da-DK",
			de: "de-DE",
			el: "el-GR",
			en: "en-US",
			et: "et-EE",
			fa: "fa-IR",
			fi: "fi-FI",
			hr: "hr-HR",
			hu: "hu-HU",
			he: "he-IL",
			id: "id-ID",
			it: "it-IT",
			ja: "ja-JP",
			km: "km-KH",
			ko: "ko-KR",
			lv: "lv-LV",
			lt: "lt-LT",
			nl: "nl-NL",
			no: "no-NO",
			pl: "pl-PL",
			pt: "pt-PT",
			ro: "ro-RO",
			ru: "ru-RU",
			sk: "sk-SK",
			sl: "sl-SI",
			srCyrl: "sr-Cyrl-RS",
			srLatn: "sr-Latn-RS",
			sv: "sv-SE",
			th: "th-TH",
			tr: "tr-TR",
			az: "az-AZ",
			uk: "uk-UA",
			vi: "vi-VN",
			zhHans: "zh-CN",
			zhHant: "zh-TW"
		}
	}, options);
	return {
		options: _options,
		instance: createInstance(_options, locale)
	};
}
function createInstance(options, locale) {
	const instance = reactive(/* @__PURE__ */ isFunction(options.adapter) ? new options.adapter({
		locale: options.locale[locale.current.value] ?? locale.current.value,
		formats: options.formats
	}) : options.adapter);
	watch(locale.current, (value) => {
		instance.locale = options.locale[value] ?? value ?? instance.locale;
	});
	return instance;
}
// packages/vue-ui/node_modules/vuetify/lib/composables/goto.js
var GoToSymbol = Symbol.for("vuetify:goto");
function genDefaults() {
	return {
		container: void 0,
		duration: 300,
		layout: false,
		offset: 0,
		easing: "easeInOutCubic",
		patterns: easingPatterns
	};
}
function createGoTo(options, locale) {
	return {
		rtl: locale.isRtl,
		options: mergeDeep(genDefaults(), options)
	};
}
// packages/vue-ui/node_modules/vuetify/lib/framework.js
function createVuetify(vuetify = {}) {
	const { blueprint, ...rest } = vuetify;
	const options = mergeDeep(blueprint, rest);
	const { aliases = {}, components = {}, directives = {} } = options;
	const scope = effectScope();
	return scope.run(() => {
		const defaults = createDefaults(options.defaults);
		const display = createDisplay(options.display, options.ssr);
		const theme = createTheme(options.theme);
		const icons = createIcons(options.icons);
		const locale = createLocale(options.locale);
		const date = createDate(options.date, locale);
		const goTo = createGoTo(options.goTo, locale);
		function install(app) {
			for (const key in directives) app.directive(key, directives[key]);
			for (const key in components) app.component(key, components[key]);
			for (const key in aliases) app.component(key, defineComponent$1({
				...aliases[key],
				name: key,
				aliasName: aliases[key].name
			}));
			const appScope = effectScope();
			appScope.run(() => {
				theme.install(app);
			});
			app.onUnmount(() => appScope.stop());
			app.provide(DefaultsSymbol, defaults);
			app.provide(RootDefaultsSymbol, defaults);
			app.provide(DisplaySymbol, display);
			app.provide(ThemeSymbol, theme);
			app.provide(IconSymbol, icons);
			app.provide(LocaleSymbol, locale);
			app.provide(DateOptionsSymbol, date.options);
			app.provide(DateAdapterSymbol, date.instance);
			app.provide(GoToSymbol, goTo);
			if (IN_BROWSER && options.ssr) {
				if (app.$nuxt) app.$nuxt.hook("app:suspense:resolve", () => {
					display.update();
				});
				else {
					const { mount } = app;
					app.mount = (...args) => {
						const vm = mount(...args);
						nextTick$1(() => display.update());
						app.mount = mount;
						return vm;
					};
				}
			}
			if (typeof __VUE_OPTIONS_API__ !== "boolean" || __VUE_OPTIONS_API__) app.mixin({ computed: { $vuetify() {
				return reactive({
					defaults: inject$1.call(this, DefaultsSymbol),
					display: inject$1.call(this, DisplaySymbol),
					theme: inject$1.call(this, ThemeSymbol),
					icons: inject$1.call(this, IconSymbol),
					locale: inject$1.call(this, LocaleSymbol),
					date: inject$1.call(this, DateAdapterSymbol)
				});
			} } });
		}
		function unmount() {
			scope.stop();
		}
		return {
			install,
			unmount,
			defaults,
			display,
			theme,
			icons,
			locale,
			date,
			goTo
		};
	});
}
createVuetify.version = "4.3.0";
function inject$1(key) {
	const vm = this.$;
	const provides = vm.parent?.provides ?? vm.vnode.appContext?.provides;
	if (provides && key in provides) return provides[key];
}
// packages/core/dist/index.js
var tokens = {
	"version": "0.10.0",
	"format": "Solyi plain JSON export (not a DTCG interchange format)",
	"description": "CSS role tokens shared by the documentation and its examples. Violet is a starting theme, not a permanent brand requirement.",
	"base": {
		"font-sans": "\"Wanted Sans Variable\", \"Wanted Sans\", -apple-system, BlinkMacSystemFont, system-ui, \"Segoe UI\", \"Apple SD Gothic Neo\", \"Noto Sans KR\", \"Malgun Gothic\", \"Apple Color Emoji\", \"Segoe UI Emoji\", sans-serif",
		"font-mono": "\"JetBrains Mono\", \"Nanum Gothic Coding\", monospace",
		"text-xs": "0.8125rem",
		"text-sm": "0.875rem",
		"text-md": "1rem",
		"text-lg": "1.25rem",
		"text-xl": "1.75rem",
		"text-display": "3rem",
		"line-body": "1.65",
		"line-heading": "1.25",
		"space-1": "0.25rem",
		"space-2": "0.5rem",
		"space-3": "0.75rem",
		"space-4": "1rem",
		"space-6": "1.5rem",
		"space-8": "2rem",
		"space-12": "3rem",
		"radius-sm": "0.375rem",
		"radius-md": "0.625rem",
		"radius-lg": "0.75rem",
		"control-height": "2.5rem",
		"button-height": "2.25rem",
		"touch-target-min": "2.75rem",
		"focus-width": "3px",
		"focus-offset": "3px",
		"motion-fast": "140ms",
		"motion-duration-state": "160ms",
		"motion-duration-enter": "220ms",
		"motion-duration-loading": "600ms",
		"motion-easing-standard": "cubic-bezier(0.2, 0, 0, 1)",
		"motion-easing-linear": "linear",
		"motion-distance-small": "4px",
		"icon-sm": "16px",
		"icon-md": "20px",
		"icon-lg": "24px",
		"layer-base": "0",
		"layer-sticky": "20",
		"layer-floating": "60",
		"layer-toast": "80",
		"layer-announcement": "100",
		"elevation-flat": "none",
		"elevation-floating": "0 8px 28px #0002",
		"backdrop-color": "#10121c88",
		"content-max": "72rem",
		"reading-max": "44rem",
		"radius-xl": "1rem",
		"radius-small": "var(--sol-radius-sm)",
		"radius-control": "var(--sol-radius-md)",
		"radius-card": "var(--sol-radius-lg)",
		"radius-panel": "var(--sol-radius-xl)",
		"radius-inset": "var(--sol-radius-md)",
		"table-cell-padding-y": "0.375rem",
		"list-item-padding-y": "0.75rem",
		"table-selection-width": "3rem",
		"table-status-width": "6rem",
		"table-date-width": "8rem",
		"table-action-width": "5.5rem",
		"radius-button": "var(--sol-radius-sm)",
		"radius-floating": "var(--sol-radius-card)",
		"motion-duration-indeterminate": "1400ms"
	},
	"reference": {
		"brand-purple": "#6666AA",
		"brand-sage": "#91A99A",
		"brand-light": "#EBECE7",
		"brand-paper": "#F9FAF7",
		"brand-ink": "#2F3040"
	},
	"themes": {
		"violet": {
			"label": "Cool violet",
			"description": "차분한 쿨 바이올렛. v0.1의 기본 출발점.",
			"light": {
				"canvas": "#F5F6FA",
				"surface": "#FFFFFF",
				"surface-alt": "#ECEEF5",
				"text": "#202330",
				"muted": "#5F6375",
				"border": "#D9DCE6",
				"control-border": "#818596",
				"accent": "#7560B5",
				"accent-hover": "#604B9C",
				"accent-soft": "#F4F0FA",
				"on-accent": "#FFFFFF",
				"focus": "#7560B5",
				"success": "#256448",
				"success-soft": "#E6F2EA",
				"warning": "#885019",
				"warning-soft": "#FFF2DB",
				"danger": "#B33750",
				"danger-soft": "#FBEAF0",
				"info": "#315D96",
				"info-soft": "#EAF0FA"
			},
			"dark": {
				"canvas": "#171821",
				"surface": "#20222E",
				"surface-alt": "#292C3B",
				"text": "#F0F0F7",
				"muted": "#B7B9C9",
				"border": "#424658",
				"control-border": "#85899D",
				"accent": "#B8A3F1",
				"accent-hover": "#CAB8F9",
				"accent-soft": "#342C49",
				"on-accent": "#211A30",
				"focus": "#C6B2FF",
				"success": "#8DD3AD",
				"success-soft": "#213C31",
				"warning": "#F2C27B",
				"warning-soft": "#403321",
				"danger": "#FFA9B8",
				"danger-soft": "#452A35",
				"info": "#AACCF6",
				"info-soft": "#26364C"
			}
		},
		"sage": {
			"label": "Quiet sage",
			"description": "공개 브랜드의 세이지에서 확장한 선택 테마. 액션 색은 대비를 위해 더 짙게 조정.",
			"light": {
				"canvas": "#F4F6F2",
				"surface": "#FFFFFF",
				"surface-alt": "#E9EEE8",
				"text": "#28372F",
				"muted": "#58685E",
				"border": "#D5DED5",
				"control-border": "#7B8B7F",
				"accent": "#476A56",
				"accent-hover": "#355443",
				"accent-soft": "#E6EEE7",
				"on-accent": "#FFFFFF",
				"focus": "#476A56",
				"success": "#256448",
				"success-soft": "#E6F2EA",
				"warning": "#885019",
				"warning-soft": "#FFF2DB",
				"danger": "#B33750",
				"danger-soft": "#FBEAF0",
				"info": "#315D96",
				"info-soft": "#EAF0FA"
			},
			"dark": {
				"canvas": "#17201B",
				"surface": "#202C25",
				"surface-alt": "#2B3930",
				"text": "#EEF4EF",
				"muted": "#B5C6B9",
				"border": "#42594A",
				"control-border": "#829C8A",
				"accent": "#A1CBB0",
				"accent-hover": "#BBDEC6",
				"accent-soft": "#2E4536",
				"on-accent": "#182E20",
				"focus": "#BBDEC6",
				"success": "#8DD3AD",
				"success-soft": "#213C31",
				"warning": "#F2C27B",
				"warning-soft": "#403321",
				"danger": "#FFA9B8",
				"danger-soft": "#452A35",
				"info": "#AACCF6",
				"info-soft": "#26364C"
			}
		},
		"sand": {
			"label": "Warm sand",
			"description": "공개 브랜드의 종이·베이지에서 확장한 읽기 중심 선택 테마.",
			"light": {
				"canvas": "#F8F4EE",
				"surface": "#FFFDFA",
				"surface-alt": "#EFE8DF",
				"text": "#352E2C",
				"muted": "#6E625B",
				"border": "#E0D5C9",
				"control-border": "#968374",
				"accent": "#85614D",
				"accent-hover": "#6B4938",
				"accent-soft": "#F5ECE3",
				"on-accent": "#FFFFFF",
				"focus": "#85614D",
				"success": "#256448",
				"success-soft": "#E6F2EA",
				"warning": "#885019",
				"warning-soft": "#FFF2DB",
				"danger": "#B33750",
				"danger-soft": "#FBEAF0",
				"info": "#315D96",
				"info-soft": "#EAF0FA"
			},
			"dark": {
				"canvas": "#231D19",
				"surface": "#2E2721",
				"surface-alt": "#3A3129",
				"text": "#F6EEE5",
				"muted": "#CEBEB0",
				"border": "#5B4A3E",
				"control-border": "#A28A77",
				"accent": "#D9B394",
				"accent-hover": "#E8C8AB",
				"accent-soft": "#483629",
				"on-accent": "#302116",
				"focus": "#E8C8AB",
				"success": "#8DD3AD",
				"success-soft": "#213C31",
				"warning": "#F2C27B",
				"warning-soft": "#403321",
				"danger": "#FFA9B8",
				"danger-soft": "#452A35",
				"info": "#AACCF6",
				"info-soft": "#26364C"
			}
		}
	},
	"density": {
		"comfortable": {
			"content-gap": "1rem",
			"row-padding": "1rem",
			"table-cell-padding-y": "0.375rem",
			"list-item-padding-y": "0.75rem"
		},
		"compact": {
			"content-gap": "0.75rem",
			"row-padding": "0.75rem",
			"table-cell-padding-y": "0.25rem",
			"list-item-padding-y": "0.5rem"
		}
	}
};
// packages/vue-ui/src/vuetify.ts
/** Six token-derived themes. Consumers can add themes/defaults using Vuetify's own options. */
function createSolyiVuetify(options = {}) {
	const themes = {};
	for (const [name, data] of Object.entries(tokens.themes)) for (const mode of ["light", "dark"]) {
		const c = data[mode];
		themes[name + "-" + mode] = {
			dark: mode === "dark",
			colors: {
				background: c.canvas,
				surface: c.surface,
				"surface-variant": c["surface-alt"],
				"on-background": c.text,
				"on-surface": c.text,
				primary: c.accent,
				"on-primary": c["on-accent"],
				secondary: c.accent,
				"on-secondary": c["on-accent"],
				error: c.danger,
				"on-error": c.surface,
				success: c.success,
				"on-success": c.surface,
				warning: c.warning,
				"on-warning": c.surface,
				info: c.info,
				"on-info": c.surface
			},
			variables: {
				"border-color": c["control-border"],
				"border-opacity": 1
			}
		};
	}
	const defaults = {
		VApp: { class: "sol-vuetify" },
		VBtn: {
			ripple: false,
			variant: "outlined",
			class: "sol-vuetify-btn"
		},
		VTextField: {
			variant: "outlined",
			density: "compact",
			class: "sol-vuetify-field"
		},
		VSelect: {
			variant: "outlined",
			density: "compact",
			class: "sol-vuetify-field"
		},
		VTextarea: {
			variant: "outlined",
			density: "compact",
			rows: 3,
			class: "sol-vuetify-field"
		},
		VCard: { class: "sol-vuetify-card" },
		VDialog: { class: "sol-vuetify-dialog" }
	};
	const merged = {
		...defaults,
		...options.defaults
	};
	for (const key of Object.keys(defaults)) if (options.defaults?.[key]) merged[key] = {
		...defaults[key],
		...options.defaults[key]
	};
	return createVuetify({
		...options,
		defaults: merged,
		theme: options.theme === false ? false : {
			...options.theme,
			defaultTheme: options.theme?.defaultTheme ?? "violet-light",
			themes: {
				...themes,
				...options.theme?.themes
			}
		}
	});
}
/** Client-side bridge: update Core CSS and Vuetify from the same app-owned state. No persistence. */
function applySolyiAppearance(themeHost, next, target) {
	const name = next.theme + "-" + next.mode;
	if (!Object.hasOwn(tokens.themes, next.theme) || !["light", "dark"].includes(next.mode) || next.density !== void 0 && !["comfortable", "compact"].includes(next.density) || !themeHost.themes.value[name]) return false;
	const host = target ?? (typeof document === "undefined" ? void 0 : document.documentElement);
	if (!host) throw new Error("applySolyiAppearance requires a DOM target. Use defaultTheme for SSR.");
	host.dataset.theme = next.theme;
	host.dataset.mode = next.mode;
	if (next.density) host.dataset.density = next.density;
	themeHost.change(name, false);
	return true;
}
// packages/vue-ui/src/index.ts
var uiVersion = "0.9.0";
function uiIcon(name, direction) {
	const size = name === "close" ? 16 : 20;
	return h$1("svg", {
		class: [
			"sol-icon",
			"sol-ui-icon",
			size === 16 ? "sol-ui-icon--small" : void 0,
			direction ? "sol-ui-icon--" + direction : void 0
		],
		viewBox: "0 0 24 24",
		width: size,
		height: size,
		fill: "none",
		stroke: "currentColor",
		"stroke-width": 1.6,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"aria-hidden": "true",
		focusable: "false"
	}, h$1("path", { d: solIconPaths[name] }));
}
var SBtn = defineComponent({
	name: "SBtn",
	inheritAttrs: false,
	props: {
		variant: {
			type: String,
			default: "secondary"
		},
		tone: String,
		disabled: Boolean,
		loading: Boolean,
		type: {
			type: String,
			default: "button"
		}
	},
	emits: { click: (_event) => true },
	setup(props, { attrs, slots, emit }) {
		return () => {
			const unavailable = props.disabled || props.loading || attrs["aria-disabled"] === true || attrs["aria-disabled"] === "true";
			return h$1(VBtn, {
				...attrs,
				"data-tone": props.tone || attrs["data-tone"],
				class: [
					"sol-ui-button",
					"sol-ui-button--" + props.variant,
					props.tone ? "sol-tone" : void 0,
					attrs.class
				],
				type: props.type,
				disabled: props.disabled,
				"aria-disabled": unavailable ? "true" : attrs["aria-disabled"],
				"aria-busy": props.loading ? "true" : attrs["aria-busy"],
				ripple: false,
				variant: "flat",
				onClick: (e) => {
					if (unavailable) {
						e.preventDefault();
						return;
					}
					emit("click", e);
				}
			}, () => [props.loading ? h$1("span", {
				class: "sol-ui-busy",
				"aria-hidden": "true"
			}, "◷") : null, slots.default?.()]);
		};
	}
});
var STextField = defineComponent({
	name: "STextField",
	inheritAttrs: false,
	props: {
		...commonFieldProps,
		modelValue: {
			type: String,
			default: ""
		},
		type: {
			type: String,
			default: "text"
		}
	},
	emits: {
		"update:modelValue": (_value) => true,
		blur: (_event) => true,
		focus: (_event) => true
	},
	setup(props, { attrs, slots, emit, expose }) {
		const l = useSolLocale(() => props.locale), field = ref$1(null);
		const validation = useSFieldValidation(props, () => props.modelValue, { focus: () => field.value?.focus?.() });
		expose(validation);
		return () => {
			const error = fieldError(props);
			return h$1("div", { class: "sol-ui-field" }, [
				fieldLabel(props, slots, l.value.required),
				h$1(VTextField$1, {
					...attrs,
					ref: field,
					id: props.id,
					modelValue: props.modelValue,
					"onUpdate:modelValue": (value) => emit("update:modelValue", String(value ?? "")),
					type: props.type,
					disabled: fieldDisabled(props),
					readonly: fieldReadonly(props),
					required: props.required,
					error: !!error,
					"aria-invalid": String(!!error),
					"aria-describedby": fieldDescription(props, slots, error, attrs["aria-describedby"]),
					hideDetails: true,
					variant: "outlined",
					density: "compact",
					class: ["sol-ui-input", attrs.class],
					onBlur: (event) => {
						validation.validate();
						emit("blur", event);
					},
					onFocus: (event) => emit("focus", event)
				}),
				...fieldMessages(props, slots, error)
			]);
		};
	}
});
var SDialog = defineComponent({
	name: "SDialog",
	inheritAttrs: false,
	props: {
		locale: Object,
		id: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		eyebrow: String,
		presentation: {
			type: String,
			default: "dialog"
		},
		modelValue: Boolean,
		maxWidth: {
			type: [Number, String],
			default: 480
		},
		closeLabel: String,
		returnFocus: {
			type: Object,
			default: null
		}
	},
	emits: {
		"update:modelValue": (_value) => true,
		close: () => true
	},
	setup(props, { attrs, slots, emit }) {
		const l = useSolLocale(() => props.locale);
		const close = ref$1(null);
		let opener = null;
		const restore = () => {
			const target = props.returnFocus || opener;
			if (target?.isConnected) target.focus({ preventScroll: true });
		};
		watch(() => props.modelValue, async (value, old) => {
			if (value) {
				opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
				await nextTick$1();
				close.value?.$el?.focus();
			} else if (old) {
				await nextTick$1();
				restore();
				emit("close");
			}
		}, { immediate: true });
		onBeforeUnmount(() => {
			if (props.modelValue) restore();
		});
		return () => h$1(VDialog, {
			...attrs,
			modelValue: props.modelValue,
			"onUpdate:modelValue": (value) => emit("update:modelValue", value),
			maxWidth: props.presentation === "drawer" ? 440 : props.maxWidth,
			transition: false,
			"aria-labelledby": props.id + "-title",
			class: [
				"sol-ui-overlay",
				props.presentation === "drawer" ? "sol-ui-drawer-overlay" : void 0,
				attrs.class
			]
		}, () => h$1("section", {
			class: "sol-ui-dialog",
			id: props.id
		}, [
			h$1("div", { class: "sol-ui-dialog-heading" }, [h$1("div", { class: "sol-surface-heading" }, [props.eyebrow ? h$1("span", { class: "eyebrow" }, props.eyebrow) : null, h$1("h2", { id: props.id + "-title" }, props.title)]), h$1(SBtn, {
				id: props.id + "-close",
				ref: close,
				variant: "inline",
				autofocus: true,
				"aria-label": props.closeLabel ?? l.value.close,
				onClick: () => emit("update:modelValue", false)
			}, () => [props.closeLabel ?? l.value.close, uiIcon("close")])]),
			h$1("div", { class: "sol-ui-dialog-body" }, slots.default?.()),
			slots.actions ? h$1("div", { class: "sol-ui-dialog-actions" }, slots.actions()) : null
		]));
	}
});
var SDataTable = defineComponent({
	name: "SDataTable",
	inheritAttrs: false,
	props: {
		locale: Object,
		columns: {
			type: Array,
			required: true
		},
		rows: {
			type: Array,
			required: true
		},
		caption: {
			type: String,
			required: true
		},
		selected: {
			type: Array,
			default: () => []
		},
		selectable: Boolean,
		sort: {
			type: Object,
			default: null
		},
		page: {
			type: Number,
			default: 1
		},
		pageCount: {
			type: Number,
			default: 1
		},
		loading: Boolean,
		error: {
			type: String,
			default: ""
		},
		emptyText: String
	},
	emits: {
		"update:selected": (_ids) => true,
		"update:sort": (_sort) => true,
		"update:page": (_page) => true,
		retry: () => true,
		rowAction: (_row) => true
	},
	setup(props, { attrs, slots, emit }) {
		const l = useSolLocale(() => props.locale);
		const host = ref$1(null), summary = ref$1(null), all = ref$1(null), allMobile = ref$1(null), preview = ref$1(null), previewOpener = ref$1(null), previewId = "sol-table-" + useId();
		let cleanup = () => {};
		onMounted(() => {
			if (host.value) cleanup = mountOverflowText(host.value, () => l.value);
		});
		watch(l, () => nextTick$1(() => cleanup.refresh?.()));
		const display = (row, c) => {
			const value = row[c.key];
			return c.format === "date" && typeof value === "string" ? formatSolDate(value, l.value) : c.format === "number" || !c.format && typeof value === "number" ? typeof value === "number" ? formatSolNumber(value, l.value) : String(value ?? "—") : String(value ?? "—");
		};
		watch(() => [props.loading, props.error], async () => {
			const previous = document.activeElement, retry = host.value?.querySelector(".sol-ui-table-retry");
			if (!previous || !retry?.contains(previous)) return;
			await nextTick$1();
			if (!previous.isConnected && document.activeElement === document.body) summary.value?.focus();
		});
		function choose(id, checked) {
			const ids = new Set(props.selected);
			checked ? ids.add(id) : ids.delete(id);
			emit("update:selected", [...ids]);
		}
		function selectPage(checked) {
			const ids = new Set(props.selected);
			for (const row of props.rows) checked ? ids.add(row.id) : ids.delete(row.id);
			emit("update:selected", [...ids]);
		}
		async function move(page) {
			emit("update:page", page);
			await nextTick$1();
			host.value?.querySelector(".sol-pagination [aria-current=\"page\"]")?.focus();
		}
		watch(() => [props.selectable, props.rows.map((row) => [row.id, props.selected.includes(row.id)])], async () => {
			await nextTick$1();
			for (const input of [all.value, allMobile.value]) if (input) input.indeterminate = props.rows.some((r) => props.selected.includes(r.id)) && !props.rows.every((r) => props.selected.includes(r.id));
		}, { immediate: true });
		onBeforeUnmount(() => cleanup());
		const cell = (row, c) => h$1("span", { class: c.ellipsis === false ? "" : "sol-ellipsis sol-ui-cell-clip" }, slots["cell-" + c.key]?.({
			row,
			value: row[c.key]
		}) || display(row, c));
		const action = (row) => h$1(SBtn, {
			variant: "inline",
			"aria-label": l.value.viewFullText(String(row[props.columns[0]?.key] ?? l.value.record)),
			onClick: (e) => {
				previewOpener.value = e.currentTarget;
				preview.value = row;
				emit("rowAction", row);
			}
		}, () => l.value.details);
		const busy = () => props.loading || !!props.error;
		return () => {
			const safePage = Math.max(1, Math.min(props.page, Math.max(1, props.pageCount))), count = Math.max(1, props.pageCount);
			const pageNumbers = [.../* @__PURE__ */ new Set([
				1,
				safePage - 1,
				safePage,
				safePage + 1,
				count
			])].filter((n) => n > 0 && n <= count).sort((a, b) => a - b);
			return h$1("div", {
				...attrs,
				ref: host,
				class: ["sol-ui-table", attrs.class],
				"aria-busy": String(props.loading)
			}, [
				h$1("div", { class: "sol-ui-table-desktop" }, h$1("table", { class: "sol-data-table" }, [
					h$1("caption", props.caption),
					h$1("colgroup", [
						props.selectable ? h$1("col", { style: { width: "48px" } }) : null,
						...props.columns.map((c) => h$1("col", { style: { width: c.width } })),
						h$1("col", { style: { width: "72px" } })
					]),
					h$1("thead", h$1("tr", [
						props.selectable ? h$1("th", { scope: "col" }, h$1("input", {
							ref: all,
							type: "checkbox",
							"aria-label": l.value.selectPage,
							checked: !!props.rows.length && props.rows.every((r) => props.selected.includes(r.id)),
							disabled: busy() || !props.rows.length,
							onChange: (e) => selectPage(e.target.checked)
						})) : null,
						...props.columns.map((c) => h$1("th", {
							scope: "col",
							style: { textAlign: c.align },
							"aria-sort": c.sortable ? props.sort?.key === c.key ? props.sort.direction : "none" : void 0
						}, c.sortable ? h$1(SBtn, {
							variant: "subtle",
							class: "sol-sort-button",
							disabled: busy(),
							onClick: () => emit("update:sort", {
								key: c.key,
								direction: props.sort?.key === c.key && props.sort.direction === "ascending" ? "descending" : "ascending"
							})
						}, () => [c.label, h$1("span", {
							"aria-hidden": "true",
							class: "sol-sort-symbol"
						}, props.sort?.key === c.key ? props.sort.direction === "ascending" ? "↑" : "↓" : "↕")]) : c.label)),
						h$1("th", { scope: "col" }, l.value.details)
					])),
					h$1("tbody", !busy() ? props.rows.map((row) => h$1("tr", {
						key: row.id,
						"data-row-id": row.id,
						"data-selected": props.selected.includes(row.id)
					}, [
						props.selectable ? h$1("td", h$1("input", {
							type: "checkbox",
							"aria-label": l.value.selectRecord(String(row[props.columns[0]?.key] ?? l.value.record)),
							checked: props.selected.includes(row.id),
							onChange: (e) => choose(row.id, e.target.checked)
						})) : null,
						...props.columns.map((c) => h$1("td", { style: { textAlign: c.align } }, cell(row, c))),
						h$1("td", action(row))
					])) : [])
				])),
				h$1("p", { class: "sol-ui-table-mobile-caption" }, props.caption),
				props.columns.some((c) => c.sortable) ? h$1("div", { class: "sol-ui-table-mobile-sort" }, [h$1("label", { class: "sol-field" }, [h$1("span", { class: "sol-label" }, l.value.sortField), h$1("select", {
					class: "sol-select",
					value: props.columns.some((c) => c.sortable && c.key === props.sort?.key) ? props.sort?.key : "",
					disabled: busy(),
					onChange: (e) => emit("update:sort", {
						key: e.target.value,
						direction: "ascending"
					})
				}, [h$1("option", {
					value: "",
					disabled: true
				}, l.value.chooseSort), ...props.columns.filter((c) => c.sortable).map((c) => h$1("option", { value: c.key }, c.label))])]), h$1(SBtn, {
					disabled: busy() || !props.columns.some((c) => c.sortable && c.key === props.sort?.key),
					"aria-label": l.value.sortDirection(props.sort?.direction === "descending" ? l.value.descending : l.value.ascending),
					onClick: () => {
						if (props.sort) emit("update:sort", {
							key: props.sort.key,
							direction: props.sort.direction === "ascending" ? "descending" : "ascending"
						});
					}
				}, () => props.sort?.direction === "descending" ? l.value.descending : l.value.ascending)]) : null,
				props.selectable ? h$1("label", { class: "sol-choice sol-ui-table-mobile-select" }, [h$1("input", {
					ref: allMobile,
					type: "checkbox",
					checked: !!props.rows.length && props.rows.every((r) => props.selected.includes(r.id)),
					disabled: busy() || !props.rows.length,
					onChange: (e) => selectPage(e.target.checked)
				}), l.value.selectPage]) : null,
				h$1("ul", {
					class: "sol-ui-table-mobile",
					"aria-label": props.caption
				}, !busy() ? props.rows.map((row) => h$1("li", {
					key: row.id,
					"data-row-id": row.id,
					"data-selected": props.selected.includes(row.id)
				}, [
					props.selectable ? h$1("label", { class: "sol-choice" }, [h$1("input", {
						type: "checkbox",
						"aria-label": l.value.selectRecord(String(row[props.columns[0]?.key] ?? l.value.record)),
						checked: props.selected.includes(row.id),
						onChange: (e) => choose(row.id, e.target.checked)
					}), l.value.selectRecords]) : null,
					h$1("dl", props.columns.flatMap((c) => [h$1("dt", c.label), h$1("dd", cell(row, c))])),
					h$1("div", { class: "sol-ui-table-mobile-actions" }, action(row))
				])) : []),
				props.loading ? h$1("p", {
					role: "status",
					class: "sol-ui-hint"
				}, l.value.tableLoading) : props.error ? h$1("div", {
					role: "alert",
					class: "sol-notice danger"
				}, [h$1("p", props.error), h$1(SBtn, {
					class: "sol-ui-table-retry",
					variant: "inline",
					onClick: () => emit("retry")
				}, () => l.value.tableRetry)]) : !props.rows.length ? h$1("p", {
					role: "status",
					class: "sol-ui-hint"
				}, props.emptyText ?? l.value.tableEmpty) : null,
				h$1("div", { class: "sol-ui-table-footer" }, [h$1("nav", {
					"aria-label": l.value.pages(props.caption),
					class: "sol-pagination"
				}, [
					h$1(SBtn, {
						class: "sol-ui-page-icon",
						disabled: busy() || safePage === 1,
						"aria-label": l.value.previousPage,
						onClick: () => move(safePage - 1)
					}, () => uiIcon("chevron", "previous")),
					...pageNumbers.flatMap((n, i) => [i && n - pageNumbers[i - 1] > 1 ? h$1("span", {
						"aria-hidden": "true",
						class: "sol-ui-page-gap"
					}, "…") : null, h$1(SBtn, {
						"aria-label": l.value.pageLabel(n, count),
						"aria-current": n === safePage ? "page" : void 0,
						disabled: busy(),
						class: ["sol-page-button", Math.abs(n - safePage) > 1 ? "sol-ui-page-edge" : ""],
						onClick: () => move(n)
					}, () => formatSolNumber(n, l.value))]),
					h$1(SBtn, {
						class: "sol-ui-page-icon",
						disabled: busy() || safePage === count,
						"aria-label": l.value.nextPage,
						onClick: () => move(safePage + 1)
					}, () => uiIcon("chevron", "next"))
				]), h$1("p", {
					ref: summary,
					role: "status",
					tabindex: -1,
					class: "sol-ui-hint sol-ui-table-summary"
				}, l.value.pageSummary(safePage, count, props.selected.length))]),
				h$1(SDialog, {
					locale: l.value,
					id: previewId,
					title: l.value.fullText,
					modelValue: !!preview.value,
					returnFocus: previewOpener.value,
					"onUpdate:modelValue": (value) => {
						if (!value) preview.value = null;
					}
				}, () => preview.value ? h$1("dl", { class: "sol-ui-detail" }, props.columns.flatMap((c) => [h$1("dt", c.label), h$1("dd", display(preview.value, c))])) : null)
			]);
		};
	}
});
var sComponents = {
	SForm,
	SContainer: VContainer,
	SRow: VRow,
	SCol: VCol,
	SCard,
	SAlert,
	STree,
	SProgressLinear,
	SProgressCircular,
	SBtn,
	STextField,
	SDialog,
	SDataTable,
	SCheckbox,
	SRadioGroup,
	SSwitch,
	SSelect,
	STextarea,
	SNumberInput,
	STabs,
	SSnackbar,
	SDatePicker,
	STimePicker,
	SSegmentedControl,
	SMultiSelect,
	SRangeSlider,
	SSplitBtn,
	SContextMenu,
	SResizableSplitPane,
	STooltip,
	SPopover,
	SAccordion,
	SFileInput,
	SAutocomplete,
	SBreadcrumbs,
	SAvatar,
	SStepper,
	SBarChart
};
function install(app, options = {}) {
	if (options.locale) provideSolLocale(app, options.locale);
	for (const [name, component] of Object.entries(sComponents)) app.component(name, component);
}
export { SAccordion, SAlert, SAutocomplete, SAvatar, SBarChart, SBreadcrumbs, SBtn, SCard, SCheckbox, VCol as SCol, VContainer as SContainer, SContextMenu, SDataTable, SDatePicker, SDialog, SFileInput, SForm, SMultiSelect, SNumberInput, SPopover, SProgressCircular, SProgressLinear, SRadioGroup, SRangeSlider, SResizableSplitPane, VRow as SRow, SSegmentedControl, SSelect, SSnackbar, SSplitBtn, SStepper, SSwitch, STabs, STextField, STextarea, STimePicker, STooltip, STree, SolLocaleKey, VCol$1 as VCol, VContainer$1 as VContainer, VRow$1 as VRow, VTextField, isObject as a, applySolyiAppearance, isFunction$1 as c, createApp, createSolyiVuetify, isObject$1 as d, describeSFile, enLocale, isUndefined$1 as f, formatSolDate, formatSolNumber, h, isNullOrUndefined as i, install, isSFieldFilled, koLocale, isNull$1 as l, isFunction as n, nextTick, isUndefined as o, parseSolNumber, provideSolLocale, isNull as r, ref, resolveSProgress, resolveSolLocale, isArray$1 as s, sComponents, sRules, isArray as t, isNullOrUndefined$1 as u, uiVersion, useSolLocale, validateSFiles };
