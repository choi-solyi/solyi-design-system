// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
};
// node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function n(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var r = {}, i = [], a = () => {}, o = () => !1, s = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), c = (e) => e.startsWith("onUpdate:"), l = Object.assign, u = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, d = Object.prototype.hasOwnProperty, f = (e, t) => d.call(e, t), p = Array.isArray, m = (e) => w(e) === "[object Map]", h = (e) => w(e) === "[object Set]", g = (e) => w(e) === "[object Date]", _ = (e) => w(e) === "[object RegExp]", v = (e) => typeof e == "function", y = (e) => typeof e == "string", b = (e) => typeof e == "symbol", x = (e) => typeof e == "object" && !!e, S = (e) => (x(e) || v(e)) && v(e.then) && v(e.catch), C = Object.prototype.toString, w = (e) => C.call(e), T = (e) => w(e).slice(8, -1), E = (e) => w(e) === "[object Object]", D = (e) => y(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, O = /* @__PURE__ */ n(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), k = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, A = /-\w/g, j = k((e) => e.replace(A, (e) => e.slice(1).toUpperCase())), ee = /\B([A-Z])/g, M = k((e) => e.replace(ee, "-$1").toLowerCase()), te = k((e) => e.charAt(0).toUpperCase() + e.slice(1)), ne = k((e) => e ? `on${te(e)}` : ""), re = (e, t) => !Object.is(e, t), ie = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, ae = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, oe = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, se = (e) => {
	let t = y(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, ce, le = () => ce ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}, ue = /* @__PURE__ */ n("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");
function de(e) {
	if (p(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = y(r) ? he(r) : de(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (y(e) || x(e)) return e;
}
var fe = /;(?![^(]*\))/g, pe = /:([^]+)/, me = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function he(e) {
	let t = {};
	return e.replace(me, (e) => e.startsWith("/*") ? "" : e).split(fe).forEach((e) => {
		if (e) {
			let n = e.split(pe);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function ge(e) {
	let t = "";
	if (y(e)) t = e;
	else if (p(e)) for (let n = 0; n < e.length; n++) {
		let r = ge(e[n]);
		r && (t += r + " ");
	}
	else if (x(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
function _e(e) {
	if (!e) return null;
	let { class: t, style: n } = e;
	return t && !y(t) && (e.class = ge(t)), n && (e.style = de(n)), e;
}
var ve = /* @__PURE__ */ n("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly");
function ye(e) {
	return !!e || e === "";
}
function be(e, t, n) {
	if (e.length !== t.length) return !1;
	let r = !0;
	for (let i = 0; r && i < e.length; i++) r = we(e[i], t[i], n);
	return r;
}
function xe(e, t, n) {
	if (e.size !== t.size) return !1;
	let r = Array.from(t), i = new Uint8Array(r.length);
	for (let t of e) {
		let e = -1;
		for (let a = 0; a < r.length; a++) if (!i[a] && we(t, r[a], n)) {
			e = a;
			break;
		}
		if (e < 0) return !1;
		i[e] = 1;
	}
	return !0;
}
function Se(e, t, n) {
	let r = m(e), i = m(t);
	if (r || i || (r = h(e), i = h(t), r || i)) return r && i ? xe(e, t, n) : !1;
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let r in e) {
		let i = e.hasOwnProperty(r), a = t.hasOwnProperty(r);
		if (i && !a || !i && a || !we(e[r], t[r], n)) return !1;
	}
	return String(e) === String(t);
}
function Ce(e, t, n, r) {
	n ||= [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
	let [i, a] = n;
	if (i.has(e) || a.has(t)) return i.get(e) === t && a.get(t) === e;
	i.set(e, t), a.set(t, e);
	let o = r(e, t, n);
	return i.delete(e), a.delete(t), o;
}
function we(e, t, n) {
	if (e === t) return !0;
	let r = g(e), i = g(t);
	return r || i ? r && i ? e.getTime() === t.getTime() : !1 : (r = b(e), i = b(t), r || i ? e === t : (r = p(e), i = p(t), r || i ? r && i ? Ce(e, t, n, be) : !1 : (r = x(e), i = x(t), r || i ? !r || !i ? !1 : Ce(e, t, n, Se) : String(e) === String(t))));
}
function Te(e, t) {
	return e.findIndex((e) => we(e, t));
}
var Ee = (e) => !!(e && e.__v_isRef === !0), N = (e) => y(e) ? e : e == null ? "" : p(e) || x(e) && (e.toString === C || !v(e.toString)) ? Ee(e) ? N(e.value) : JSON.stringify(e, De, 2) : String(e), De = (e, t) => Ee(t) ? De(e, t.value) : m(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Oe(t, r) + " =>"] = n, e), {}) } : h(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Oe(e)) } : b(t) ? Oe(t) : x(t) && !p(t) && !E(t) ? String(t) : t, Oe = (e, t = "") => b(e) ? `Symbol(${e.description ?? t})` : e;
function ke(e) {
	return e == null ? "initial" : typeof e == "string" ? e === "" ? " " : e : String(e);
}
// node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var Ae, je = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && Ae && (Ae.active ? (this.parent = Ae, this.index = (Ae.scopes || (Ae.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].pause();
			}
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].resume();
			}
			let n = this.effects.slice();
			for (e = 0, t = n.length; e < t; e++) n[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = Ae;
			try {
				return Ae = this, e();
			} finally {
				Ae = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = Ae, Ae = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (Ae === this) Ae = this.prevScope;
			else {
				let e = Ae;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				let e = this.scopes.slice();
				for (t = 0, n = e.length; t < n; t++) e[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function Me(e) {
	return new je(e);
}
function Ne() {
	return Ae;
}
function Pe(e, t = !1) {
	Ae && Ae.cleanups.push(e);
}
var Fe, Ie = /* @__PURE__ */ new WeakSet(), Le = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ae && (Ae.active ? Ae.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Ie.has(this) && (Ie.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ve(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, nt(this), We(this);
		let e = Fe, t = Qe;
		Fe = this, Qe = !0;
		try {
			return this.fn();
		} finally {
			Ge(this), Fe = e, Qe = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Je(e);
			this.deps = this.depsTail = void 0, nt(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Ie.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Ke(this) && this.run();
	}
	get dirty() {
		return Ke(this);
	}
}, Re = 0, ze, Be;
function Ve(e, t = !1) {
	e.flags |= 8, t ? (e.next = Be, Be = e) : (e.next = ze, ze = e);
}
function He() {
	Re++;
}
function Ue() {
	if (--Re > 0) return;
	if (Be) {
		let e = Be;
		for (Be = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; ze;) {
		let t = ze;
		for (ze = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function We(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ge(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Je(r), Ye(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Ke(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (qe(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function qe(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === rt) || (e.globalVersion = rt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ke(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = Fe, r = Qe;
	Fe = e, Qe = !0;
	try {
		We(e);
		let n = e.fn(e._value);
		(t.version === 0 || re(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		Fe = n, Qe = r, Ge(e), e.flags &= -3;
	}
}
function Je(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Je(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ye(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
function Xe(e, t) {
	e.effect instanceof Le && (e = e.effect.fn);
	let n = new Le(e);
	t && l(n, t);
	try {
		n.run();
	} catch (e) {
		throw n.stop(), e;
	}
	let r = n.run.bind(n);
	return r.effect = n, r;
}
function Ze(e) {
	e.effect.stop();
}
var Qe = !0, $e = [];
function et() {
	$e.push(Qe), Qe = !1;
}
function tt() {
	let e = $e.pop();
	Qe = e === void 0 || e;
}
function nt(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = Fe;
		Fe = void 0;
		try {
			t();
		} finally {
			Fe = e;
		}
	}
}
var rt = 0, it = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, at = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!Fe || !Qe || Fe === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== Fe) t = this.activeLink = new it(Fe, this), Fe.deps ? (t.prevDep = Fe.depsTail, Fe.depsTail.nextDep = t, Fe.depsTail = t) : Fe.deps = Fe.depsTail = t, ot(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = Fe.depsTail, t.nextDep = void 0, Fe.depsTail.nextDep = t, Fe.depsTail = t, Fe.deps === t && (Fe.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, rt++, this.notify(e);
	}
	notify(e) {
		He();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Ue();
		}
	}
};
function ot(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) ot(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var st = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ Symbol(""), lt = /* @__PURE__ */ Symbol(""), ut = /* @__PURE__ */ Symbol("");
function dt(e, t, n) {
	if (Qe && Fe) {
		let t = st.get(e);
		t || st.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new at()), r.map = t, r.key = n), r.track();
	}
}
function ft(e, t, n, r, i, a) {
	let o = st.get(e);
	if (!o) {
		rt++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (He(), t === "clear") o.forEach(s);
	else {
		let i = p(e), a = i && D(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === ut || !b(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(ut)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(ct)), m(e) && s(o.get(lt)));
				break;
			case "delete":
				i || (s(o.get(ct)), m(e) && s(o.get(lt)));
				break;
			case "set": m(e) && s(o.get(ct));
		}
	}
	Ue();
}
function pt(e, t) {
	let n = st.get(e);
	return n && n.get(t);
}
function mt(e) {
	let t = /* @__PURE__ */ on(e);
	return t === e || (dt(t, "iterate", ut), /* @__PURE__ */ rn(e)) ? t : /* @__PURE__ */ nn(e) ? /* @__PURE__ */ tn(e) ? t.map((e) => ln(cn(e))) : t.map(ln) : t.map(cn);
}
function ht(e) {
	return dt(e = /* @__PURE__ */ on(e), "iterate", ut), e;
}
function gt(e, t) {
	return /* @__PURE__ */ nn(e) ? ln(/* @__PURE__ */ tn(e) ? cn(t) : t) : cn(t);
}
var _t = {
	__proto__: null,
	[Symbol.iterator]() {
		return vt(this, Symbol.iterator, (e) => gt(this, e));
	},
	concat(...e) {
		return mt(this).concat(...e.map((e) => p(e) ? mt(e) : e));
	},
	entries() {
		return vt(this, "entries", (e) => (e[1] = gt(this, e[1]), e));
	},
	every(e, t) {
		return xt(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return xt(this, "filter", e, t, (e) => e.map((e) => gt(this, e)), arguments);
	},
	find(e, t) {
		return xt(this, "find", e, t, (e) => gt(this, e), arguments);
	},
	findIndex(e, t) {
		return xt(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return xt(this, "findLast", e, t, (e) => gt(this, e), arguments);
	},
	findLastIndex(e, t) {
		return xt(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return xt(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return Ct(this, "includes", e);
	},
	indexOf(...e) {
		return Ct(this, "indexOf", e);
	},
	join(e) {
		return mt(this).join(e);
	},
	lastIndexOf(...e) {
		return Ct(this, "lastIndexOf", e);
	},
	map(e, t) {
		return xt(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return wt(this, "pop");
	},
	push(...e) {
		return wt(this, "push", e);
	},
	reduce(e, ...t) {
		return St(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return St(this, "reduceRight", e, t);
	},
	shift() {
		return wt(this, "shift");
	},
	some(e, t) {
		return xt(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return wt(this, "splice", e);
	},
	toReversed() {
		return mt(this).toReversed();
	},
	toSorted(e) {
		return mt(this).toSorted(e);
	},
	toSpliced(...e) {
		return mt(this).toSpliced(...e);
	},
	unshift(...e) {
		return wt(this, "unshift", e);
	},
	values() {
		return vt(this, "values", (e) => gt(this, e));
	}
};
function vt(e, t, n) {
	let r = ht(e), i = r[t], a = i.call(r);
	if (r !== e && !/* @__PURE__ */ rn(e)) {
		if (a[Symbol.toStringTag] === "Array Iterator") {
			let e = Object.create(Object.getPrototypeOf(a));
			return e.next = () => yt(a.next(), n), i !== bt[t] && Object.defineProperties(e, {
				return: { get() {
					let e = a.return;
					return typeof e == "function" ? e.bind(a) : e;
				} },
				throw: { get() {
					let e = a.throw;
					return typeof e == "function" ? e.bind(a) : e;
				} }
			}), e;
		}
		a._next = a.next, a.next = () => yt(a._next(), n);
	}
	return a;
}
function yt(e, t) {
	return e.done || (e.value = t(e.value)), e;
}
var bt = Array.prototype;
function xt(e, t, n, r, i, a) {
	let o = ht(e), s = o !== e && !/* @__PURE__ */ rn(e), c = o[t];
	if (c !== bt[t]) {
		let t = c.apply(e, a);
		return s ? cn(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, gt(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function St(e, t, n, r) {
	let i = ht(e), a = i !== e && !/* @__PURE__ */ rn(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = gt(e, t)), n.call(this, t, gt(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? gt(e, c) : c;
}
function Ct(e, t, n) {
	let r = /* @__PURE__ */ on(e);
	dt(r, "iterate", ut);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ an(n[0]) ? (n[0] = /* @__PURE__ */ on(n[0]), r[t](...n)) : i;
}
function wt(e, t, n = []) {
	et(), He();
	let r = (/* @__PURE__ */ on(e))[t].apply(e, n);
	return Ue(), tt(), r;
}
var Tt = /* @__PURE__ */ n("__proto__,__v_isRef,__isVue"), Et = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(b));
function Dt(e) {
	b(e) || (e = String(e));
	let t = /* @__PURE__ */ on(this);
	return dt(t, "has", e), t.hasOwnProperty(e);
}
var Ot = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Jt : qt : i ? Kt : Gt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = p(e);
		if (!r) {
			let e;
			if (a && (e = _t[t])) return e;
			if (t === "hasOwnProperty") return Dt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ P(e) ? e : n);
		if ((b(t) ? Et.has(t) : Tt(t)) || (r || dt(e, "get", t), i)) return o;
		if (/* @__PURE__ */ P(o)) {
			let e = a && D(t) ? o : o.value;
			return r && x(e) ? /* @__PURE__ */ Qt(e) : e;
		}
		return x(o) ? r ? /* @__PURE__ */ Qt(o) : /* @__PURE__ */ Xt(o) : o;
	}
}, kt = class extends Ot {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = p(e) && D(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ nn(i);
			if (!/* @__PURE__ */ rn(n) && !/* @__PURE__ */ nn(n) && (i = /* @__PURE__ */ on(i), n = /* @__PURE__ */ on(n)), !a && /* @__PURE__ */ P(i) && !/* @__PURE__ */ P(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : f(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ P(e) ? e : r);
		return e === /* @__PURE__ */ on(r) && s && (o ? re(n, i) && ft(e, "set", t, n, i) : ft(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = f(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && ft(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return b(t) && Et.has(t) || dt(e, "has", t), n;
	}
	ownKeys(e) {
		return dt(e, "iterate", p(e) ? "length" : ct), Reflect.ownKeys(e);
	}
}, At = class extends Ot {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, jt = /* @__PURE__ */ new kt(), Mt = /* @__PURE__ */ new At(), Nt = /* @__PURE__ */ new kt(!0), Pt = /* @__PURE__ */ new At(!0), Ft = (e) => e, It = (e) => Reflect.getPrototypeOf(e);
function Lt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ on(i), o = m(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, u = i[e](...r), d = n ? Ft : t ? ln : cn;
		return !t && dt(a, "iterate", c ? lt : ct), l(Object.create(u), { next() {
			let { value: e, done: t } = u.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: s ? [d(e[0]), d(e[1])] : d(e),
				done: t
			};
		} });
	};
}
function Rt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function zt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ on(r), a = /* @__PURE__ */ on(n);
			e || (re(n, a) && dt(i, "get", n), dt(i, "get", a));
			let { has: o } = It(i), s = t ? Ft : e ? ln : cn;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && dt(/* @__PURE__ */ on(t), "iterate", ct), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ on(n), i = /* @__PURE__ */ on(t);
			return e || (re(t, i) && dt(r, "has", t), dt(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ on(a), s = t ? Ft : e ? ln : cn;
			return !e && dt(o, "iterate", ct), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return l(n, e ? {
		add: Rt("add"),
		set: Rt("set"),
		delete: Rt("delete"),
		clear: Rt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ on(this), r = It(n), i = /* @__PURE__ */ on(e), a = !t && !/* @__PURE__ */ rn(e) && !/* @__PURE__ */ nn(e) ? i : e;
			return r.has.call(n, a) || re(e, a) && r.has.call(n, e) || re(i, a) && r.has.call(n, i) || (n.add(a), ft(n, "add", a, a)), this;
		},
		set(e, n) {
			t || /* @__PURE__ */ rn(n) || /* @__PURE__ */ nn(n) || (n = /* @__PURE__ */ on(n));
			let r = /* @__PURE__ */ on(this), { has: i, get: a } = It(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ on(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? re(n, s) && ft(r, "set", e, n, s) : ft(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ on(this), { has: n, get: r } = It(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ on(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && ft(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ on(this), t = e.size !== 0, n = e.clear();
			return t && ft(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = Lt(r, e, t);
	}), n;
}
function Bt(e, t) {
	let n = zt(e, t);
	return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? r : Reflect.get(f(n, i) && i in r ? n : r, i, a);
}
var Vt = { get: /* @__PURE__ */ Bt(!1, !1) }, Ht = { get: /* @__PURE__ */ Bt(!1, !0) }, Ut = { get: /* @__PURE__ */ Bt(!0, !1) }, Wt = { get: /* @__PURE__ */ Bt(!0, !0) }, Gt = /* @__PURE__ */ new WeakMap(), Kt = /* @__PURE__ */ new WeakMap(), qt = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap();
function Yt(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function Xt(e) {
	return /* @__PURE__ */ nn(e) ? e : en(e, !1, jt, Vt, Gt);
}
// @__NO_SIDE_EFFECTS__
function Zt(e) {
	return en(e, !1, Nt, Ht, Kt);
}
// @__NO_SIDE_EFFECTS__
function Qt(e) {
	return en(e, !0, Mt, Ut, qt);
}
// @__NO_SIDE_EFFECTS__
function $t(e) {
	return en(e, !0, Pt, Wt, Jt);
}
function en(e, t, n, r, i) {
	if (!x(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Yt(T(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function tn(e) {
	return /* @__PURE__ */ nn(e) ? /* @__PURE__ */ tn(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function nn(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function rn(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function an(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function on(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ on(t) : e;
}
function sn(e) {
	return !f(e, "__v_skip") && Object.isExtensible(e) && ae(e, "__v_skip", !0), e;
}
var cn = (e) => x(e) ? /* @__PURE__ */ Xt(e) : e, ln = (e) => x(e) ? /* @__PURE__ */ Qt(e) : e;
// @__NO_SIDE_EFFECTS__
function P(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function F(e) {
	return un(e, !1);
}
// @__NO_SIDE_EFFECTS__
function I(e) {
	return un(e, !0);
}
function un(e, t) {
	return /* @__PURE__ */ P(e) ? e : new dn(e, t);
}
var dn = class {
	constructor(e, t) {
		this.dep = new at(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ on(e), this._value = t ? e : cn(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ rn(e) || /* @__PURE__ */ nn(e);
		e = n ? e : /* @__PURE__ */ on(e), re(e, t) && (this._rawValue = e, this._value = n ? e : cn(e), this.dep.trigger());
	}
};
function fn(e) {
	e.dep && e.dep.trigger();
}
function L(e) {
	return /* @__PURE__ */ P(e) ? e.value : e;
}
function pn(e) {
	return v(e) ? e() : L(e);
}
var mn = {
	get: (e, t, n) => t === "__v_raw" ? e : L(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ P(i) && !/* @__PURE__ */ P(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function hn(e) {
	return /* @__PURE__ */ tn(e) ? e : new Proxy(e, mn);
}
var gn = class {
	constructor(e) {
		this.__v_isRef = !0, this._value = void 0;
		let t = this.dep = new at(), { get: n, set: r } = e(t.track.bind(t), t.trigger.bind(t));
		this._get = n, this._set = r;
	}
	get value() {
		return this._value = this._get();
	}
	set value(e) {
		this._set(e);
	}
};
function _n(e) {
	return new gn(e);
}
// @__NO_SIDE_EFFECTS__
function vn(e) {
	let t = p(e) ? Array(e.length) : {};
	for (let n in e) t[n] = xn(e, n);
	return t;
}
var yn = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = b(t) ? t : String(t), this._raw = /* @__PURE__ */ on(e);
		let r = !0, i = e;
		if (!p(e) || b(this._key) || !D(this._key)) do
			r = !/* @__PURE__ */ an(i) || /* @__PURE__ */ rn(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = L(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ P(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ P(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return pt(this._raw, this._key);
	}
}, bn = class {
	constructor(e) {
		this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
// @__NO_SIDE_EFFECTS__
function R(e, t, n) {
	return /* @__PURE__ */ P(e) ? e : v(e) ? new bn(e) : x(e) && arguments.length > 1 ? xn(e, t, n) : /* @__PURE__ */ F(e);
}
function xn(e, t, n) {
	return new yn(e, t, n);
}
var Sn = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new at(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = rt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && Fe !== this) return Ve(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return qe(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function Cn(e, t, n = !1) {
	let r, i;
	return v(e) ? r = e : (r = e.get, i = e.set), new Sn(r, i, n);
}
var wn = {
	GET: "get",
	HAS: "has",
	ITERATE: "iterate"
}, Tn = {
	SET: "set",
	ADD: "add",
	DELETE: "delete",
	CLEAR: "clear"
}, En = {}, Dn = /* @__PURE__ */ new WeakMap(), On = void 0;
function kn() {
	return On;
}
function An(e, t = !1, n = On) {
	if (n) {
		let t = Dn.get(n);
		t || Dn.set(n, t = []), t.push(e);
	}
}
function jn(e, t, n = r) {
	let { immediate: i, deep: o, once: s, scheduler: c, augmentJob: l, call: d } = n, f = (e) => o ? e : /* @__PURE__ */ rn(e) || o === !1 || o === 0 ? Mn(e, 1) : Mn(e), m, h, g, _, y = !1, b = !1;
	if (/* @__PURE__ */ P(e) ? (h = () => e.value, y = /* @__PURE__ */ rn(e)) : /* @__PURE__ */ tn(e) ? (h = () => f(e), y = !0) : p(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ tn(e) || /* @__PURE__ */ rn(e)), h = () => e.map((e) => {
		if (/* @__PURE__ */ P(e)) return e.value;
		if (/* @__PURE__ */ tn(e)) return f(e);
		if (v(e)) return d ? d(e, 2) : e();
	})) : h = v(e) ? t ? d ? () => d(e, 2) : e : () => {
		if (g) {
			et();
			try {
				g();
			} finally {
				tt();
			}
		}
		let t = On;
		On = m;
		try {
			return d ? d(e, 3, [_]) : e(_);
		} finally {
			On = t;
		}
	} : a, t && o) {
		let e = h, t = o === !0 ? Infinity : o;
		h = () => Mn(e(), t);
	}
	let x = Ne(), S = () => {
		m.stop(), x && x.active && u(x.effects, m);
	};
	if (s && t) {
		let e = t;
		t = (...t) => {
			try {
				return e(...t);
			} finally {
				S();
			}
		};
	}
	let C = b ? Array(e.length).fill(En) : En, w = (e) => {
		if (m.flags & 1 && (m.dirty || e)) {
			if (t) {
				let n = m.run();
				if (e || o || y || (b ? n.some((e, t) => re(e, C[t])) : re(n, C))) {
					let e = On;
					et();
					try {
						g && g(), On = m;
						let e = [
							n,
							C === En ? void 0 : b && C[0] === En ? [] : C,
							_
						];
						C = n, d ? d(t, 3, e) : t(...e);
					} finally {
						On = e, tt();
					}
				}
			} else m.run();
		}
	};
	return l && l(w), m = new Le(h), m.scheduler = c ? () => c(w, !1) : w, _ = (e) => An(e, !1, m), g = m.onStop = () => {
		let e = Dn.get(m);
		if (e) {
			if (d) d(e, 4);
			else for (let t of e) t();
			Dn.delete(m);
		}
	}, t ? i ? w(!0) : C = m.run() : c ? c(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function Mn(e, t = Infinity, n) {
	if (t <= 0 || !x(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ P(e)) Mn(e.value, t, n);
	else if (p(e)) for (let r = 0; r < e.length; r++) Mn(e[r], t, n);
	else if (h(e) || m(e)) e.forEach((e) => {
		Mn(e, t, n);
	});
	else if (E(e)) {
		for (let r in e) Mn(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Mn(e[r], t, n);
	}
	return e;
}
// node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var Nn = [];
function Pn(e) {
	Nn.push(e);
}
function Fn() {
	Nn.pop();
}
function In(e, t) {}
var Ln = {
	SETUP_FUNCTION: 0,
	0: "SETUP_FUNCTION",
	RENDER_FUNCTION: 1,
	1: "RENDER_FUNCTION",
	NATIVE_EVENT_HANDLER: 5,
	5: "NATIVE_EVENT_HANDLER",
	COMPONENT_EVENT_HANDLER: 6,
	6: "COMPONENT_EVENT_HANDLER",
	VNODE_HOOK: 7,
	7: "VNODE_HOOK",
	DIRECTIVE_HOOK: 8,
	8: "DIRECTIVE_HOOK",
	TRANSITION_HOOK: 9,
	9: "TRANSITION_HOOK",
	APP_ERROR_HANDLER: 10,
	10: "APP_ERROR_HANDLER",
	APP_WARN_HANDLER: 11,
	11: "APP_WARN_HANDLER",
	FUNCTION_REF: 12,
	12: "FUNCTION_REF",
	ASYNC_COMPONENT_LOADER: 13,
	13: "ASYNC_COMPONENT_LOADER",
	SCHEDULER: 14,
	14: "SCHEDULER",
	COMPONENT_UPDATE: 15,
	15: "COMPONENT_UPDATE",
	APP_UNMOUNT_CLEANUP: 16,
	16: "APP_UNMOUNT_CLEANUP"
}, Rn = {
	sp: "serverPrefetch hook",
	bc: "beforeCreate hook",
	c: "created hook",
	bm: "beforeMount hook",
	m: "mounted hook",
	bu: "beforeUpdate hook",
	u: "updated",
	bum: "beforeUnmount hook",
	um: "unmounted hook",
	a: "activated hook",
	da: "deactivated hook",
	ec: "errorCaptured hook",
	rtc: "renderTracked hook",
	rtg: "renderTriggered hook",
	0: "setup function",
	1: "render function",
	2: "watcher getter",
	3: "watcher callback",
	4: "watcher cleanup function",
	5: "native event handler",
	6: "component event handler",
	7: "vnode hook",
	8: "directive hook",
	9: "transition hook",
	10: "app errorHandler",
	11: "app warnHandler",
	12: "ref function",
	13: "async component loader",
	14: "scheduler flush",
	15: "component update",
	16: "app unmount cleanup function"
};
function zn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		Vn(e, t, n);
	}
}
function Bn(e, t, n, r) {
	if (v(e)) {
		let i = zn(e, t, n, r);
		return i && S(i) && i.catch((e) => {
			Vn(e, t, n);
		}), i;
	}
	if (p(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Bn(e[a], t, n, r));
		return i;
	}
}
function Vn(e, t, n, i = !0) {
	let a = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = t && t.appContext.config || r;
	if (t) {
		let r = t.parent, i = t.proxy, a = `https://vuejs.org/error-reference/#runtime-${n}`;
		for (; r;) {
			let t = r.ec;
			if (t) {
				for (let n = 0; n < t.length; n++) if (t[n](e, i, a) === !1) return;
			}
			r = r.parent;
		}
		if (o) {
			et(), zn(o, null, 10, [
				e,
				i,
				a
			]), tt();
			return;
		}
	}
	Hn(e, n, a, i, s);
}
function Hn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var Un = [], Wn = -1, Gn = [], Kn = null, qn = 0, Jn = /* @__PURE__ */ Promise.resolve(), Yn = null;
function z(e) {
	let t = Yn || Jn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Xn(e) {
	let t = Wn + 1, n = Un.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = Un[r], a = ir(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Zn(e) {
	if (!(e.flags & 1)) {
		let t = ir(e), n = Un[Un.length - 1];
		!n || !(e.flags & 2) && t >= ir(n) ? Un.push(e) : Un.splice(Xn(t), 0, e), e.flags |= 1, Qn();
	}
}
function Qn() {
	Yn ||= Jn.then(ar);
}
function $n(e) {
	if (!p(e)) Kn && e.id === -1 ? Kn.splice(qn + 1, 0, e) : e.flags & 1 || (Gn.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) Gn.push(e[t]);
	Qn();
}
function er(e, t, n, r = Wn + 1) {
	for (; r < Un.length; r++) {
		let n = Un[r];
		if (n && n.flags & 2) {
			if (e && n.id !== e.uid || t !== void 0 && !(n.id >= t)) continue;
			Un.splice(r, 1), r = e ? r - 1 : Wn, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
		}
	}
}
function tr(e, t, n = 0) {
	if (Gn.length) {
		let e = Gn, r = 0;
		if (t) {
			e = [];
			for (let i = 0; i < Gn.length; i++) {
				let a = Gn[i];
				(a.i === void 0 ? t.has(a) : !a.i || a.i.uid < n) ? Gn[r++] = a : e.push(a);
			}
		}
		let i = [...new Set(e)].sort((e, t) => ir(e) - ir(t));
		if (Gn.length = r, Kn) {
			for (let e = 0; e < i.length; e++) Kn.push(i[e]);
			return;
		}
		for (Kn = i, qn = 0; qn < Kn.length; qn++) {
			let e = Kn[qn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		Kn = null, qn = 0;
	}
}
var nr = !1;
function rr(e, t) {
	if (nr) {
		e();
		return;
	}
	let n = t === void 0 ? void 0 : new Set(Gn);
	e(), nr = !0;
	try {
		er(void 0, t), tr(void 0, n, t);
	} finally {
		nr = !1;
	}
}
var ir = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function ar(e) {
	try {
		for (Wn = 0; Wn < Un.length; Wn++) {
			let e = Un[Wn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), zn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; Wn < Un.length; Wn++) {
			let e = Un[Wn];
			e && (e.flags &= -2);
		}
		Wn = -1, Un.length = 0, tr(e), Yn = null, (Un.length || Gn.length) && ar(e);
	}
}
var or, sr = [];
function cr(e, t) {
	or = e, or ? (or.enabled = !0, sr.forEach(({ event: e, args: t }) => or.emit(e, ...t)), sr = []) : typeof window < "u" && window.HTMLElement && !(window.navigator?.userAgent)?.includes("jsdom") ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((e) => {
		cr(e, t);
	}), setTimeout(() => {
		or || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, sr = []);
	}, 3e3)) : sr = [];
}
var lr = null, ur = null;
function dr(e) {
	let t = lr;
	return lr = e, ur = e && e.type.__scopeId || null, t;
}
function fr(e) {
	ur = e;
}
function pr() {
	ur = null;
}
var mr = (e) => B;
function B(e, t = lr, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && ps(-1);
		let i = dr(t), a = ls.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = ls.length; e > a; e--) ds();
			dr(i), r._d && ps(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function hr(e, t) {
	if (lr === null) return e;
	let n = $s(lr), i = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [a, o, s, c = r] = t[e];
		a && (v(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && Mn(o), i.push({
			dir: a,
			instance: n,
			value: o,
			oldValue: void 0,
			arg: s,
			modifiers: c
		}));
	}
	return e;
}
function gr(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (et(), Bn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), tt());
	}
}
function _r(e, t) {
	if (Fs) {
		let n = Fs.provides, r = Fs.parent && Fs.parent.provides;
		r === n && (n = Fs.provides = Object.create(r)), n[e] = t;
	}
}
function vr(e, t, n = !1) {
	let r = Is();
	if (r || eo) {
		let i = eo ? eo._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && v(t) ? t.call(r && r.proxy) : t;
	}
}
function yr() {
	return !!(Is() || eo);
}
var br = /* @__PURE__ */ Symbol.for("v-scx"), xr = () => vr(br);
function Sr(e, t) {
	return Tr(e, null, t);
}
function Cr(e, t) {
	return Tr(e, null, { flush: "post" });
}
function wr(e, t) {
	return Tr(e, null, { flush: "sync" });
}
function V(e, t, n) {
	return Tr(e, t, n);
}
function Tr(e, t, n = r) {
	let { immediate: i, deep: o, flush: s, once: c } = n, u = l({}, n), d = t && i || !t && s !== "post", f;
	if (Hs) {
		if (s === "sync") {
			let e = xr();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = a, e.resume = a, e.pause = a, e;
		}
	}
	let p = Fs;
	u.call = (e, t, n) => Bn(e, p, t, n);
	let m = !1;
	s === "post" ? u.scheduler = (e) => {
		e.i = p, Po(e, p && p.suspense);
	} : s !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : Zn(e);
	}), u.augmentJob = (e) => {
		t && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = jn(e, t, u);
	return Hs && (f ? f.push(h) : d && h()), h;
}
function Er(e, t, n) {
	let r = this.proxy, i = y(e) ? e.includes(".") ? Dr(r, e) : () => r[e] : e.bind(r, r), a;
	v(t) ? a = t : (a = t.handler, n = t);
	let o = zs(this), s = Tr(i, a.bind(r), n);
	return o(), s;
}
function Dr(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Or = /* @__PURE__ */ new WeakMap(), kr = /* @__PURE__ */ Symbol("_vte"), Ar = (e) => e.__isTeleport, jr = (e) => e && (e.disabled || e.disabled === ""), Mr = (e) => e && (e.defer || e.defer === ""), Nr = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Pr = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Fr = (e, t) => {
	let n = e && e.to;
	return y(n) ? t ? t(n) : null : n;
}, Ir = {
	name: "Teleport",
	__isTeleport: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		let { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: m, createText: h, createComment: g, parentNode: _ } } = l, v = jr(t.props), { dynamicChildren: y } = t, b = (e, t, n) => {
			e.shapeFlag & 16 && u(e.children, t, n, i, a, o, s, c);
		}, x = (e = t) => {
			let n = jr(e.props), r = e.target = Fr(e.props, m), a = Vr(r, e, h, p);
			r && (o !== "svg" && Nr(r) ? o = "svg" : o !== "mathml" && Pr(r) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r), n || (b(e, r, a), Br(e, !1)));
		}, S = (e) => {
			let t = () => {
				if (Or.get(e) === t) {
					if (Or.delete(e), jr(e.props)) {
						let t = _(e.el) || n;
						b(e, t, e.anchor), Br(e, !0);
					}
					x(e);
				}
			};
			Or.set(e, t), Po(t, a);
		};
		if (e == null) {
			let e = t.el = h(""), i = t.anchor = h("");
			if (p(e, n, r), p(i, n, r), Mr(t.props) || a && a.pendingBranch) {
				S(t);
				return;
			}
			v && (b(t, n, i), Br(t, !0)), x();
		} else {
			t.el = e.el;
			let r = t.anchor = e.anchor, u = Or.get(e);
			if (u) {
				u.flags |= 8, Or.delete(e), S(t);
				return;
			}
			t.targetStart = e.targetStart;
			let p = t.target = e.target, h = t.targetAnchor = e.targetAnchor, g = jr(e.props), _ = g ? n : p, b = g ? r : h;
			if (o === "svg" || Nr(p) ? o = "svg" : (o === "mathml" || Pr(p)) && (o = "mathml"), y ? (f(e.dynamicChildren, y, _, i, a, o, s), Vo(e, t, !0)) : c || d(e, t, _, b, i, a, o, s, !1), v) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Lr(t, n, r, l, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				let e = Fr(t.props, m);
				e && (t.target = e, Lr(t, e, null, l, 0));
			} else g && Lr(t, p, h, l, 1);
			Br(t, v);
		}
	},
	remove(e, t, n, { um: r, o: { remove: i } }, a) {
		let { shapeFlag: o, children: s, anchor: c, targetStart: l, targetAnchor: u, target: d, props: f } = e, p = jr(f), m = a || !p, h = Or.get(e);
		if (h && (h.flags |= 8, Or.delete(e)), d && (i(l), i(u)), a && i(c), !h && (p || d) && o & 16) for (let e = 0; e < s.length; e++) {
			let i = s[e];
			r(i, t, n, m, !!i.dynamicChildren);
		}
	},
	move: Lr,
	hydrate: Rr
};
function Lr(e, t, n, { o: { insert: r }, m: i }, a = 2) {
	a === 0 && (e.targetStart && r(e.targetStart, t, n), r(e.targetAnchor, t, n), n = e.targetAnchor);
	let { el: o, anchor: s, shapeFlag: c, children: l, props: u } = e, d = a === 2;
	if (d && r(o, t, n), !Or.has(e) && (!d || jr(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
	d && r(s, t, n);
}
function Rr(e, t, n, r, i, a, { o: { nextSibling: o, parentNode: s, querySelector: c, insert: l, createText: u } }, d) {
	function f(e, n) {
		let r = n;
		for (; r;) {
			if (r && r.nodeType === 8) {
				if (r.data === "teleport start anchor") t.targetStart = r;
				else if (r.data === "teleport anchor") {
					t.targetAnchor = r, e._lpa = t.targetAnchor && o(t.targetAnchor);
					break;
				}
			}
			r = o(r);
		}
	}
	function p(e, t) {
		t.anchor = d(o(e), t, s(e), n, r, i, a);
	}
	let m = t.target = Fr(t.props, c), h = jr(t.props);
	if (m) {
		let c = m._lpa || m.firstChild;
		t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || Vr(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || Vr(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), Br(t, h);
	} else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
	return t.anchor && o(t.anchor);
}
var zr = Ir;
function Br(e, t) {
	let n = e.ctx;
	if (n && n.ut) {
		let r, i;
		for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
		n.ut();
	}
}
function Vr(e, t, n, r, i = null) {
	let a = t.targetStart = n(""), o = t.targetAnchor = n("");
	return a[kr] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var Hr = /* @__PURE__ */ Symbol("_leaveCb"), Ur = /* @__PURE__ */ Symbol("_enterCb");
function Wr() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return Yi(() => {
		e.isMounted = !0;
	}), Qi(() => {
		e.isUnmounting = !0;
	}), e;
}
var Gr = [Function, Array], Kr = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: Gr,
	onEnter: Gr,
	onAfterEnter: Gr,
	onEnterCancelled: Gr,
	onBeforeLeave: Gr,
	onLeave: Gr,
	onAfterLeave: Gr,
	onLeaveCancelled: Gr,
	onBeforeAppear: Gr,
	onAppear: Gr,
	onAfterAppear: Gr,
	onAppearCancelled: Gr
}, qr = {
	name: "BaseTransition",
	props: Kr,
	setup(e, { slots: t }) {
		let n = Is(), r = Wr();
		return () => {
			let i = t.default && ti(t.default(), !0), a = i && i.length ? Jr(i) : n.subTree ? Ts() : void 0;
			if (!a) return;
			let o = /* @__PURE__ */ on(e), { mode: s } = o;
			if (r.isLeaving) return Qr(a);
			let c = $r(a);
			if (!c) return Qr(a);
			let l = Zr(c, o, r, n, (e) => l = e);
			c.type !== ss && ei(c, l);
			let u = n.subTree && $r(n.subTree);
			if (u && u.type !== ss && !_s(u, c) && ni(n.subTree)) {
				let e = Zr(u, o, r, n);
				if (ei(u, e), s === "out-in" && c.type !== ss) return r.isLeaving = !0, e.afterLeave = () => {
					r.isLeaving = !1, n.job.flags & 8 || n.update(), delete e.afterLeave, u = void 0;
				}, Qr(a);
				s === "in-out" && c.type !== ss ? e.delayLeave = (e, t, n) => {
					let i = Xr(r, u);
					i[String(u.key)] = u, e[Hr] = () => {
						t(), e[Hr] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function Jr(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== ss) {
			t = n;
			break;
		}
	}
	return t;
}
var Yr = qr;
function Xr(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Zr(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: d, onBeforeLeave: f, onLeave: m, onAfterLeave: h, onLeaveCancelled: g, onBeforeAppear: _, onAppear: v, onAfterAppear: y, onAppearCancelled: b } = t, x = String(e.key), S = Xr(n, e), C = (e, t) => {
		e && Bn(e, r, 9, t);
	}, w = (e, t) => {
		let n = t[1];
		C(e, t), p(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n();
	}, T = {
		mode: o,
		persisted: s,
		beforeEnter(t) {
			let r = c;
			if (!n.isMounted) {
				if (a) r = _ || c;
				else return;
			}
			t[Hr] && t[Hr](!0);
			let i = S[x];
			if (i && _s(e, i)) {
				let e = i.el[Hr];
				if (!e) {
					let t = ni(i);
					e = t && t.el[Hr];
				}
				e && e();
			}
			C(r, [t]);
		},
		enter(t) {
			if (S[x] === e) return;
			let r = l, i = u, o = d;
			if (!n.isMounted) {
				if (a) r = v || l, i = y || u, o = b || d;
				else return;
			}
			let s = !1;
			t[Ur] = (e) => {
				s || (s = !0, C(e ? o : i, [t]), T.delayedLeave && T.delayedLeave(), t[Ur] = void 0);
			};
			let c = t[Ur].bind(null, !1);
			r ? w(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[Ur] && t[Ur](!0), n.isUnmounting) return r();
			C(f, [t]);
			let a = !1;
			t[Hr] = (n) => {
				a || (a = !0, r(), C(n ? g : h, [t]), t[Hr] = void 0, S[i] === e && delete S[i]);
			};
			let o = t[Hr].bind(null, !1);
			S[i] = e, m ? w(m, [t, o]) : o();
		},
		clone(e) {
			let a = Zr(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return T;
}
function Qr(e) {
	if (Li(e)) return e = Cs(e), e.children = null, e;
}
function $r(e) {
	if (!Li(e)) return Ar(e.type) && e.children ? Jr(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && v(n.default)) return n.default();
	}
}
function ei(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		ei(Ar(n.type) && $r(n) || n, t);
	} else if (e.shapeFlag & 128) e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
	else if (e.transition = t, e.type === as && p(e.children)) {
		let n = co(e.children, !1);
		n && ei(n, t);
	}
}
function ti(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === as ? (o.patchFlag & 128 && i++, r = r.concat(ti(o.children, t, s))) : (t || o.type !== ss) && r.push(s == null ? o : Cs(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
function ni(e) {
	if (e.component) return ni(e.component.subTree);
	if (e.type === as) {
		let t = p(e.children) && co(e.children, !1);
		return t ? ni(t) : void 0;
	}
	if (e.type !== ss) return e;
}
// @__NO_SIDE_EFFECTS__
function H(e, t) {
	return v(e) ? /* @__PURE__ */ l({ name: e.name }, t, { setup: e }) : e;
}
function ri() {
	let e = Is();
	return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function ii(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function ai(e) {
	let t = Is(), n = /* @__PURE__ */ I(null);
	if (t) {
		let i = t.refs === r ? t.refs = {} : t.refs;
		Object.defineProperty(i, e, {
			enumerable: !0,
			get: () => n.value,
			set: (e) => n.value = e
		});
	}
	return n;
}
function oi(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var si = /* @__PURE__ */ new WeakMap();
function ci(e, t, n, i, a = !1) {
	if (p(e)) {
		e.forEach((e, r) => ci(e, t && (p(t) ? t[r] : t), n, i, a));
		return;
	}
	if (Pi(i) && !a) {
		i.shapeFlag & 512 && i.type.__asyncResolved && i.component.subTree.component && ci(e, t, n, i.component.subTree);
		return;
	}
	let s = i.shapeFlag & 4 ? $s(i.component) : i.el, c = a ? null : s, { i: l, r: d } = e, m = t && t.r, h = l.refs === r ? l.refs = {} : l.refs, g = l.setupState, _ = /* @__PURE__ */ on(g), b = g === r ? o : (e) => !oi(h, e) && f(_, e), x = (e, t) => !(t && oi(h, t));
	if (m != null && m !== d) {
		if (li(t), y(m)) h[m] = null, b(m) && (g[m] = null);
		else if (/* @__PURE__ */ P(m)) {
			let e = t;
			x(m, e.k) && (m.value = null), e.k && (h[e.k] = null);
		}
	}
	if (v(d)) zn(d, l, 12, [c, h]);
	else {
		let t = y(d), r = /* @__PURE__ */ P(d);
		if (t || r) {
			let i = () => {
				if (e.f) {
					let n = t ? b(d) ? g[d] : h[d] : x(d) || !e.k ? d.value : h[e.k];
					if (a) p(n) && u(n, s);
					else if (p(n)) n.includes(s) || n.push(s);
					else if (t) h[d] = [s], b(d) && (g[d] = h[d]);
					else {
						let t = [s];
						x(d, e.k) && (d.value = t), e.k && (h[e.k] = t);
					}
				} else t ? (h[d] = c, b(d) && (g[d] = c)) : r && (x(d, e.k) && (d.value = c), e.k && (h[e.k] = c));
			};
			if (c) {
				let t = () => {
					i(), si.delete(e);
				};
				t.id = -1, si.set(e, t), Po(t, n);
			} else li(e), i();
		}
	}
}
function li(e) {
	let t = si.get(e);
	t && (t.flags |= 8, si.delete(e));
}
var ui = !1, di = () => {
	ui ||= (console.error("Hydration completed but contains mismatches."), !0);
}, fi = (e) => e.namespaceURI.includes("svg") && e.tagName !== "foreignObject", pi = (e) => e.namespaceURI.includes("MathML"), mi = (e) => {
	if (e.nodeType === 1) {
		if (fi(e)) return "svg";
		if (pi(e)) return "mathml";
	}
}, hi = (e) => e.nodeType === 8;
function gi(e) {
	let { mt: t, p: n, o: { patchProp: r, createText: i, nextSibling: a, parentNode: o, remove: c, insert: l, createComment: u } } = e, d = (e, t) => {
		t.hasChildNodes() ? (f(t.firstChild, e, null, null, null), tr(), t._vnode = e) : (n(null, e, t), tr(), t._vnode = e);
	}, f = (n, r, s, c, u, d = !1) => {
		d ||= !!r.dynamicChildren;
		let b = hi(n) && n.data === "[", x = () => g(n, r, s, c, u, b), { type: S, ref: C, shapeFlag: w, patchFlag: T } = r, E = n.nodeType;
		r.el = n, T === -2 && (d = !1, r.dynamicChildren = null);
		let D = null;
		switch (S) {
			case os:
				E === 3 ? (n.data !== r.children && (di(), n.data = r.children), D = a(n)) : r.children === "" ? (l(r.el = i(""), o(n), n), D = n) : D = x();
				break;
			case ss:
				y(n) ? (D = a(n), v(r.el = n.content.firstChild, n, s)) : D = E !== 8 || b ? x() : a(n);
				break;
			case cs:
				if (b && (n = a(n), E = n.nodeType), E === 1 || E === 3) {
					D = n;
					let e = !r.children.length;
					for (let t = 0; t < r.staticCount; t++) e && (r.children += D.nodeType === 1 ? D.outerHTML : D.data), t === r.staticCount - 1 && (r.anchor = D), D = a(D);
					return b ? a(D) : D;
				}
				x();
				break;
			case as:
				D = b ? h(n, r, s, c, u, d) : x();
				break;
			default: if (w & 1) D = (E !== 1 || r.type.toLowerCase() !== n.tagName.toLowerCase()) && !y(n) ? x() : p(n, r, s, c, u, d);
			else if (w & 6) {
				r.slotScopeIds = u;
				let e = o(n);
				if (D = b ? _(n) : hi(n) && n.data === "teleport start" ? _(n, n.data, "teleport end") : a(n), t(r, e, null, s, c, mi(e), d), (Pi(r) || r.component.asyncDep) && !r.component.subTree) {
					let t;
					b ? (t = q(cs), t.anchor = D ? D.previousSibling : e.lastChild) : t = n.nodeType === 3 ? J("") : q(n.nodeType === 8 ? ss : "div"), t.el = n, r.component.subTree = t;
				}
			} else w & 64 ? D = E === 8 ? r.type.hydrate(n, r, s, c, u, d, e, m) : x() : w & 128 && (D = r.type.hydrate(n, r, s, c, mi(o(n)), u, d, e, f));
		}
		return C != null && ci(C, null, c, r), D;
	}, p = (e, t, n, i, a, o) => {
		o ||= !!t.dynamicChildren;
		let { type: l, dynamicProps: u, props: d, patchFlag: f, shapeFlag: p, dirs: h, transition: g } = t, _ = l === "input" || l === "option", b = !!u;
		if (_ || b || f !== -1) {
			h && gr(t, null, n, "created");
			let l = !1;
			if (y(e)) {
				l = Bo(null, g) && n && n.vnode.props && n.vnode.props.appear;
				let r = e.content.firstChild;
				if (l) {
					let e = r.getAttribute("class");
					e && (r.$cls = e), g.beforeEnter(r);
				}
				v(r, e, n), t.el = e = r;
			}
			if (p & 16 && !(d && (d.innerHTML || d.textContent))) {
				let r = m(e.firstChild, t, e, n, i, a, o);
				for (r && !xi(e, 1) && di(); r;) {
					let e = r;
					r = r.nextSibling, c(e);
				}
			} else if (p & 8) {
				let n = t.children;
				n[0] === "\n" && (e.tagName === "PRE" || e.tagName === "TEXTAREA") && (n = n.slice(1));
				let { textContent: r } = e;
				r !== n && r !== n.replace(/\r\n|\r/g, "\n") && (xi(e, 0) || di(), e.textContent = t.children);
			}
			if (d) {
				if (_ || b || !o || f & 48) {
					let t = e.tagName.includes("-"), i = e.namespaceURI.includes("svg") ? "svg" : e.namespaceURI.includes("MathML") ? "mathml" : void 0;
					for (let a in d) if (_ && (a.endsWith("value") || a === "indeterminate") || s(a) && !O(a) || a[0] === "." || t && !O(a) || u && u.includes(a)) {
						if (vi(e, a, d[a])) continue;
						r(e, a, null, d[a], i, n);
					}
				} else if (d.onClick) r(e, "onClick", null, d.onClick, void 0, n);
				else if (f & 4 && /* @__PURE__ */ tn(d.style)) for (let e in d.style) d.style[e];
			}
			let x;
			(x = d && d.onVnodeBeforeMount) && As(x, n, t), h && gr(t, null, n, "beforeMount"), ((x = d && d.onVnodeMounted) || h || l) && ns(() => {
				x && As(x, n, t), l && g.enter(e), h && gr(t, null, n, "mounted");
			}, i);
		}
		return e.nextSibling;
	}, m = (e, t, r, o, s, c, u) => {
		u ||= !!t.dynamicChildren;
		let d = t.children, p = d.length, m = !1;
		for (let t = 0; t < p; t++) {
			let h = u ? d[t] : d[t] = Es(d[t]), g = h.type === os;
			e ? (g && !u && t + 1 < p && Es(d[t + 1]).type === os && (l(i(e.data.slice(h.children.length)), r, a(e)), e.data = h.children), e = f(e, h, o, s, c, u)) : g && !h.children ? l(h.el = i(""), r) : (m || (m = !0, xi(r, 1) || di()), n(null, h, r, null, o, s, mi(r), c));
		}
		return e;
	}, h = (e, t, n, r, i, s) => {
		let { slotScopeIds: c } = t;
		c && (i = i ? i.concat(c) : c);
		let d = o(e), f = m(a(e), t, d, n, r, i, s);
		return f && hi(f) && f.data === "]" ? a(t.anchor = f) : (di(), l(t.anchor = u("]"), d, f), f);
	}, g = (e, t, r, i, s, l) => {
		if (Ci(e, t) || di(), t.el = null, l) {
			let t = _(e);
			for (;;) {
				let n = a(e);
				if (n && n !== t) c(n);
				else break;
			}
		}
		let u = a(e), d = o(e);
		return c(e), n(null, t, d, u, r, i, mi(d), s), r && (r.vnode.el = t.el, ho(r, t.el)), u;
	}, _ = (e, t = "[", n = "]") => {
		let r = 0;
		for (; e;) if (e = a(e), e && hi(e) && (e.data === t && r++, e.data === n)) {
			if (r === 0) return a(e);
			r--;
		}
		return e;
	}, v = (e, t, n) => {
		let r = t.parentNode;
		r && r.replaceChild(e, t);
		let i = n;
		for (; i;) i.vnode.el === t && (i.vnode.el = i.subTree.el = e), i = i.parent;
	}, y = (e) => e.nodeType === 1 && e.tagName === "TEMPLATE";
	return [d, f];
}
var _i = /* @__PURE__ */ new Set([
	"src",
	"srcset",
	"href",
	"poster"
]);
function vi(e, t, n) {
	return _i.has(t) ? e.getAttribute(t) === (n == null ? null : `${n}`) : !1;
}
var yi = "data-allow-mismatch", bi = {
	0: "text",
	1: "children",
	2: "class",
	3: "style",
	4: "attribute"
};
function xi(e, t) {
	if (t === 0 || t === 1) for (; e && !e.hasAttribute(yi);) e = e.parentElement;
	return Si(e && e.getAttribute(yi), t);
}
function Si(e, t) {
	if (e == null) return !1;
	if (e === "") return !0;
	{
		let n = e.split(",");
		return t === 0 && n.includes("children") ? !0 : n.includes(bi[t]);
	}
}
function Ci(e, t) {
	return xi(e.parentElement, 1) || wi(e) || Ti(t);
}
function wi(e) {
	return e.nodeType === 1 && Si(e.getAttribute(yi), 1);
}
function Ti({ props: e }) {
	let t = e && e[yi];
	return typeof t == "string" && Si(t, 1);
}
var Ei = le().requestIdleCallback || ((e) => setTimeout(e, 1)), Di = le().cancelIdleCallback || ((e) => clearTimeout(e)), Oi = (e = 1e4) => (t) => {
	let n = Ei(t, { timeout: e });
	return () => Di(n);
};
function ki(e) {
	let { top: t, left: n, bottom: r, right: i } = e.getBoundingClientRect(), { innerHeight: a, innerWidth: o } = window;
	return (t > 0 && t < a || r > 0 && r < a) && (n > 0 && n < o || i > 0 && i < o);
}
var Ai = (e) => (t, n) => {
	let r = new IntersectionObserver((e) => {
		for (let n of e) if (n.isIntersecting) {
			r.disconnect(), t();
			break;
		}
	}, e), i = (e) => {
		if (ki(e)) return t(), r.disconnect(), !1;
		if (getComputedStyle(e).display === "contents") {
			for (let t = 0; t < e.children.length; t++) if (i(e.children[t]) === !1) return !1;
		}
		r.observe(e);
	};
	return n((e) => {
		if (e instanceof Element) return i(e);
	}), () => r.disconnect();
}, ji = (e) => (t) => {
	if (e) {
		let n = matchMedia(e);
		if (n.matches) t();
		else return n.addEventListener("change", t, { once: !0 }), () => n.removeEventListener("change", t);
	}
}, Mi = (e = []) => (t, n) => {
	y(e) && (e = [e]);
	let r = !1, i = (e) => {
		r || (r = !0, a(), t(), e.target.dispatchEvent(new e.constructor(e.type, e)));
	}, a = () => {
		n((t) => {
			for (let n of e) t.removeEventListener(n, i);
		});
	};
	return n((t) => {
		for (let n of e) t.addEventListener(n, i, { once: !0 });
	}), a;
};
function Ni(e, t) {
	if (hi(e) && e.data === "[") {
		let n = 1, r = e.nextSibling;
		for (; r;) {
			if (r.nodeType === 1) {
				if (t(r) === !1) break;
			} else if (hi(r)) {
				if (r.data === "]") {
					if (--n === 0) break;
				} else r.data === "[" && n++;
			}
			r = r.nextSibling;
		}
	} else t(e);
}
var Pi = (e) => !!e.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function Fi(e) {
	v(e) && (e = { loader: e });
	let { loader: t, loadingComponent: n, errorComponent: r, delay: i = 200, hydrate: a, timeout: o, suspensible: s = !0, onError: c } = e, l = null, u, d = 0, f = () => (d++, l = null, p()), p = () => {
		let e;
		return l || (e = l = t().catch((e) => {
			if (e = e instanceof Error ? e : Error(String(e)), c) return new Promise((t, n) => {
				c(e, () => t(f()), () => n(e), d + 1);
			});
			throw e;
		}).then((t) => e !== l && l ? l : (t && (t.__esModule || t[Symbol.toStringTag] === "Module") && (t = t.default), u = t, t)));
	};
	return /* @__PURE__ */ H({
		name: "AsyncComponentWrapper",
		__asyncLoader: p,
		__asyncHydrate(e, t, n) {
			let r = e.isConnected, i = !1;
			(t.bu ||= []).push(() => i = !0);
			let o = () => {
				i || !e.parentNode || r && !e.isConnected || n();
			}, s = a ? () => {
				let n = a(o, (t) => Ni(e, t));
				n && (t.bum ||= []).push(n);
			} : o;
			u ? s() : p().then(() => !t.isUnmounted && s());
		},
		get __asyncResolved() {
			return u;
		},
		setup() {
			let e = Fs;
			if (ii(e), u) return () => Ii(u, e);
			let t = (t) => {
				l = null, Vn(t, e, 13, !r);
			};
			if (s && e.suspense || Hs) return p().then((t) => () => Ii(t, e)).catch((e) => (t(e), () => r ? q(r, { error: e }) : null));
			let a = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(), d = /* @__PURE__ */ F(!!i), f, m;
			return $i(() => {
				f != null && clearTimeout(f), m != null && clearTimeout(m);
			}), i && (m = setTimeout(() => {
				e.isUnmounted || (d.value = !1);
			}, i)), o != null && (f = setTimeout(() => {
				if (!e.isUnmounted && !a.value && !c.value) {
					let e = /* @__PURE__ */ Error(`Async component timed out after ${o}ms.`);
					t(e), c.value = e;
				}
			}, o)), p().then(() => {
				e.isUnmounted || (a.value = !0, e.parent && Li(e.parent.vnode) && e.parent.update());
			}).catch((n) => {
				e.isUnmounted ? l = null : (t(n), c.value = n);
			}), () => {
				if (a.value && u) return Ii(u, e);
				if (c.value && r) return q(r, { error: c.value });
				if (n && !d.value) return Ii(n, e);
			};
		}
	});
}
function Ii(e, t) {
	let { ref: n, props: r, children: i, ce: a } = t.vnode, o = q(e, r, i);
	return o.ref = n, o.ce = a, delete t.vnode.ce, o;
}
var Li = (e) => e.type.__isKeepAlive, Ri = {
	name: "KeepAlive",
	__isKeepAlive: !0,
	props: {
		include: [
			String,
			RegExp,
			Array
		],
		exclude: [
			String,
			RegExp,
			Array
		],
		max: [String, Number]
	},
	setup(e, { slots: t }) {
		let n = Is(), r = n.ctx;
		if (!r.renderer) return () => {
			let e = t.default && t.default();
			return e && e.length === 1 ? e[0] : e;
		};
		let i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set(), o = null, s = n.suspense, { renderer: { p: c, m: l, um: u, o: { createElement: d } } } = r, f = d("div");
		r.activate = (e, t, n, r, i) => {
			let a = e.component;
			l(e, t, n, 0, s), c(a.vnode, e, t, n, a, s, r, e.slotScopeIds, i), Po(() => {
				a.isDeactivated = !1, a.a && ie(a.a);
				let t = e.props && e.props.onVnodeMounted;
				t && As(t, a.parent, e);
			}, s);
		}, r.deactivate = (e) => {
			let t = e.component;
			Wo(t.m), Wo(t.a), l(e, f, null, 1, s), Po(() => {
				t.da && ie(t.da);
				let n = e.props && e.props.onVnodeUnmounted;
				n && As(n, t.parent, e), t.isDeactivated = !0;
			}, s);
		};
		function p(e) {
			Wi(e), u(e, n, s, !0);
		}
		function m(e) {
			i.forEach((t, n) => {
				let r = ec(Pi(t) ? t.type.__asyncResolved || {} : t.type);
				r && !e(r) && h(n);
			});
		}
		function h(e) {
			let t = i.get(e);
			t && (!o || !_s(t, o)) ? p(t) : o && (Wi(o), t && Wi(t)), i.delete(e), a.delete(e);
		}
		V(() => [e.include, e.exclude], ([e, t]) => {
			e && m((t) => zi(e, t)), t && m((e) => !zi(t, e));
		}, {
			flush: "post",
			deep: !0
		});
		let g = null, _ = () => {
			g != null && (Ko(n.subTree.type) ? Po(() => {
				let e = Gi(n.subTree);
				e.component && i.set(g, e);
			}, n.subTree.suspense) : i.set(g, Gi(n.subTree)));
		};
		return Yi(_), Zi(_), Qi(() => {
			i.forEach((e) => {
				let { subTree: t, suspense: r } = n, i = Gi(t);
				if (e.type === i.type && e.key === i.key) {
					Wi(i);
					let e = i.component.da;
					e && Po(e, r);
				} else p(e);
			});
		}), () => {
			if (g = null, !t.default) return o = null;
			let n = t.default(), r = n[0];
			if (n.length > 1) return o = null, n;
			if (!gs(r) || !(r.shapeFlag & 4) && !(r.shapeFlag & 128)) return o = null, r;
			let s = Gi(r);
			if (s.type === ss) return o = null, s;
			let c = s.type, l = ec(Pi(s) ? s.type.__asyncResolved || {} : c), { include: u, exclude: d, max: f } = e;
			if (u && (!l || !zi(u, l)) || d && l && zi(d, l)) return s.shapeFlag &= -257, o = s, r;
			let p = s.key == null ? c : s.key, m = i.get(p);
			return s.el && (s = Cs(s), r.shapeFlag & 128 && (r.ssContent = s)), g = p, m ? (s.el = m.el, s.component = m.component, s.transition && ei(s, s.transition), s.shapeFlag |= 512, a.delete(p), a.add(p)) : (a.add(p), f && a.size > parseInt(f, 10) && h(a.values().next().value)), s.shapeFlag |= 256, o = s, Ko(r.type) ? r : s;
		};
	}
};
function zi(e, t) {
	return p(e) ? e.some((e) => zi(e, t)) : y(e) ? e.split(",").includes(t) : _(e) ? (e.lastIndex = 0, e.test(t)) : !1;
}
function Bi(e, t) {
	Hi(e, "a", t);
}
function Vi(e, t) {
	Hi(e, "da", t);
}
function Hi(e, t, n = Fs) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (Ki(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) Li(e.parent.vnode) && Ui(r, t, n, e), e = e.parent;
	}
}
function Ui(e, t, n, r) {
	let i = Ki(t, e, r, !0);
	$i(() => {
		u(r[t], i);
	}, n);
}
function Wi(e) {
	e.shapeFlag &= -257, e.shapeFlag &= -513;
}
function Gi(e) {
	return e.shapeFlag & 128 ? e.ssContent : e;
}
function Ki(e, t, n = Fs, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			et();
			let i = zs(n), a = Bn(t, n, e, r);
			return i(), tt(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var qi = (e) => (t, n = Fs) => {
	Hs && e !== "sp" || Ki(e, (...e) => t(...e), n);
}, Ji = qi("bm"), Yi = qi("m"), Xi = qi("bu"), Zi = qi("u"), Qi = qi("bum"), $i = qi("um"), ea = qi("sp"), ta = qi("rtg"), na = qi("rtc");
function ra(e, t = Fs) {
	Ki("ec", e, t);
}
var ia = "components", aa = "directives";
function U(e, t) {
	return la(ia, e, !0, t) || e;
}
var oa = /* @__PURE__ */ Symbol.for("v-ndc");
function sa(e) {
	return y(e) ? la(ia, e, !1) || e : e || oa;
}
function ca(e) {
	return la(aa, e);
}
function la(e, t, n = !0, r = !1) {
	let i = lr || Fs;
	if (i) {
		let n = i.type;
		if (e === ia) {
			let e = ec(n, !1);
			if (e && (e === t || e === j(t) || e === te(j(t)))) return n;
		}
		let a = ua(i[e] || n[e], t) || ua(i.appContext[e], t);
		return !a && r ? n : a;
	}
}
function ua(e, t) {
	return e && (e[t] || e[j(t)] || e[te(j(t))]);
}
function da(e, t, n, r) {
	let i, a = n && n[r], o = p(e);
	if (o || y(e)) {
		let n = o && /* @__PURE__ */ tn(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ rn(e), s = /* @__PURE__ */ nn(e), e = ht(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? ln(cn(e[n])) : cn(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		if (!Number.isInteger(e) || e < 0) i = [];
		else {
			i = Array(e);
			for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
		}
	} else if (x(e)) {
		if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
		else {
			let n = Object.keys(e);
			i = Array(n.length);
			for (let r = 0, o = n.length; r < o; r++) {
				let o = n[r];
				i[r] = t(e[o], o, r, a && a[r]);
			}
		}
	} else i = [];
	return n && (n[r] = i), i;
}
function fa(e, t) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (p(r)) for (let t = 0; t < r.length; t++) e[r[t].name] = r[t].fn;
		else r && (e[r.name] = r.key ? (...e) => {
			let t = r.fn(...e);
			return t && (t.key = r.key), t;
		} : r.fn);
	}
	return e;
}
function pa(e, t, n, r, i, a) {
	if (n ??= {}, lr.ce || lr.parent && Pi(lr.parent) && lr.parent.ce) {
		let e = a != null && n.key == null ? l({}, n, { key: a }) : n, i = Object.keys(e).length > 0;
		return t !== "default" && (e.name = t), W(), G(as, null, [q("slot", e, r && r())], i ? -2 : 64);
	}
	let o = e[t];
	o && o._c && (o._d = !1);
	let s = ls.length;
	W();
	let c;
	try {
		let i = o && ma(o(n)), s = n.key || a || i && i.key;
		c = G(as, { key: (s && !b(s) ? s : `_${t}`) + (!i && r ? "_fb" : "") }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
	} catch (e) {
		for (let e = ls.length; e > s; e--) ds();
		throw e;
	} finally {
		o && o._c && (o._d = !0);
	}
	return !i && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), c;
}
function ma(e) {
	return e.some((e) => !gs(e) || !(e.type === ss || e.type === as && !ma(e.children))) ? e : null;
}
function ha(e, t) {
	let n = {};
	for (let r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : ne(r)] = e[r];
	return n;
}
var ga = (e) => e ? Vs(e) ? $s(e) : ga(e.parent) : null, _a = /* @__PURE__ */ l(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => ga(e.parent),
	$root: (e) => ga(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Va(e),
	$forceUpdate: (e) => e.f ||= () => {
		Zn(e.update);
	},
	$nextTick: (e) => e.n ||= z.bind(e.proxy),
	$watch: (e) => Er.bind(e)
}), va = (e, t) => e !== r && !e.__isScriptSetup && f(e, t), ya = {
	get({ _: e }, t) {
		if (t === "__v_skip") return !0;
		let { ctx: n, setupState: i, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (t[0] !== "$") {
			let e = s[t];
			if (e !== void 0) switch (e) {
				case 1: return i[t];
				case 2: return a[t];
				case 4: return n[t];
				case 3: return o[t];
			}
			else if (va(i, t)) return s[t] = 1, i[t];
			else if (a !== r && f(a, t)) return s[t] = 2, a[t];
			else if (f(o, t)) return s[t] = 3, o[t];
			else if (n !== r && f(n, t)) return s[t] = 4, n[t];
			else Ia && (s[t] = 0);
		}
		let u = _a[t], d, p;
		if (u) return t === "$attrs" && dt(e.attrs, "get", ""), u(e);
		if ((d = c.__cssModules) && (d = d[t])) return d;
		if (n !== r && f(n, t)) return s[t] = 4, n[t];
		if (p = l.config.globalProperties, f(p, t)) return p[t];
	},
	set({ _: e }, t, n) {
		let { data: i, setupState: a, ctx: o } = e;
		return va(a, t) ? (a[t] = n, !0) : i !== r && f(i, t) ? (i[t] = n, !0) : f(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(n[c] || e !== r && c[0] !== "$" && f(e, c) || va(t, c) || f(o, c) || f(i, c) || f(_a, c) || f(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? f(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
}, ba = /* @__PURE__ */ l({}, ya, {
	get(e, t) {
		if (t !== Symbol.unscopables) return ya.get(e, t, e);
	},
	has(e, t) {
		return t[0] !== "_" && !ue(t);
	}
});
function xa() {
	return null;
}
function Sa() {
	return null;
}
function Ca(e) {}
function wa(e) {}
function Ta() {
	return null;
}
function Ea() {}
function Da(e, t) {
	return null;
}
function Oa() {
	return Aa("useSlots").slots;
}
function ka() {
	return Aa("useAttrs").attrs;
}
function Aa(e) {
	let t = Is();
	return t.setupContext ||= Qs(t);
}
function ja(e) {
	return p(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
function Ma(e, t) {
	let n = ja(e);
	for (let e in t) {
		if (e.startsWith("__skip")) continue;
		let r = n[e];
		r ? p(r) || v(r) ? r = n[e] = {
			type: r,
			default: t[e]
		} : r.default = t[e] : r === null && (r = n[e] = { default: t[e] }), r && t[`__skip_${e}`] && (r.skipFactory = !0);
	}
	return n;
}
function Na(e, t) {
	return !e || !t ? e || t : p(e) && p(t) ? e.concat(t) : l({}, ja(e), ja(t));
}
function Pa(e, t) {
	let n = {};
	for (let r in e) t.includes(r) || Object.defineProperty(n, r, {
		enumerable: !0,
		get: () => e[r]
	});
	return n;
}
function Fa(e) {
	let t = Is(), n = Hs, r = e();
	Bs(), n && Rs(!1);
	let i = () => {
		zs(t), n && Rs(!0);
	}, a = () => {
		Is() !== t && t.scope.off(), Bs(), n && Rs(!1);
	};
	return S(r) && (r = r.catch((e) => {
		throw i(), Promise.resolve().then(() => Promise.resolve().then(a)), e;
	})), [r, () => {
		i(), Promise.resolve().then(a);
	}];
}
var Ia = !0;
function La(e) {
	let t = Va(e), n = e.proxy, r = e.ctx;
	Ia = !1, t.beforeCreate && za(t.beforeCreate, e, "bc");
	let { data: i, computed: o, methods: s, watch: c, provide: l, inject: u, created: d, beforeMount: f, mounted: m, beforeUpdate: h, updated: g, activated: _, deactivated: y, beforeDestroy: b, beforeUnmount: S, destroyed: C, unmounted: w, render: T, renderTracked: E, renderTriggered: D, errorCaptured: O, serverPrefetch: k, expose: A, inheritAttrs: j, components: ee, directives: M, filters: te } = t;
	if (u && Ra(u, r, null), s) for (let e in s) {
		let t = s[e];
		v(t) && (r[e] = t.bind(n));
	}
	if (i) {
		let t = i.call(n, n);
		x(t) && (e.data = /* @__PURE__ */ Xt(t));
	}
	if (Ia = !0, o) for (let e in o) {
		let t = o[e], i = Y({
			get: v(t) ? t.bind(n, n) : v(t.get) ? t.get.bind(n, n) : a,
			set: !v(t) && v(t.set) ? t.set.bind(n) : a
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		});
	}
	if (c) for (let e in c) Ba(c[e], r, n, e);
	if (l) {
		let e = v(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			_r(t, e[t]);
		});
	}
	d && za(d, e, "c");
	function ne(e, t) {
		p(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (ne(Ji, f), ne(Yi, m), ne(Xi, h), ne(Zi, g), ne(Bi, _), ne(Vi, y), ne(ra, O), ne(na, E), ne(ta, D), ne(Qi, S), ne($i, w), ne(ea, k), p(A)) {
		if (A.length) {
			let t = e.exposed ||= {};
			A.forEach((e) => {
				Object.defineProperty(t, e, {
					get: () => n[e],
					set: (t) => n[e] = t,
					enumerable: !0
				});
			});
		} else e.exposed ||= {};
	}
	T && e.render === a && (e.render = T), j != null && (e.inheritAttrs = j), ee && (e.components = ee), M && (e.directives = M), k && ii(e);
}
function Ra(e, t, n = a) {
	p(e) && (e = Ka(e));
	for (let n in e) {
		let r = e[n], i;
		i = x(r) ? "default" in r ? vr(r.from || n, r.default, !0) : vr(r.from || n) : vr(r), /* @__PURE__ */ P(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function za(e, t, n) {
	Bn(p(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Ba(e, t, n, r) {
	let i = r.includes(".") ? Dr(n, r) : () => n[r];
	if (y(e)) {
		let n = t[e];
		v(n) && V(i, n);
	} else if (v(e)) V(i, e.bind(n));
	else if (x(e)) {
		if (p(e)) e.forEach((e) => Ba(e, t, n, r));
		else {
			let r = v(e.handler) ? e.handler.bind(n) : t[e.handler];
			v(r) && V(i, r, e);
		}
	}
}
function Va(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Ha(c, e, o, !0)), Ha(c, t, o)), x(t) && a.set(t, c), c;
}
function Ha(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Ha(e, a, n, !0), i && i.forEach((t) => Ha(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Ua[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Ua = {
	data: Wa,
	props: Ya,
	emits: Ya,
	methods: Ja,
	computed: Ja,
	beforeCreate: qa,
	created: qa,
	beforeMount: qa,
	mounted: qa,
	beforeUpdate: qa,
	updated: qa,
	beforeDestroy: qa,
	beforeUnmount: qa,
	destroyed: qa,
	unmounted: qa,
	activated: qa,
	deactivated: qa,
	errorCaptured: qa,
	serverPrefetch: qa,
	components: Ja,
	directives: Ja,
	watch: Xa,
	provide: Wa,
	inject: Ga
};
function Wa(e, t) {
	return t ? e ? function() {
		return l(v(e) ? e.call(this, this) : e, v(t) ? t.call(this, this) : t);
	} : t : e;
}
function Ga(e, t) {
	return Ja(Ka(e), Ka(t));
}
function Ka(e) {
	if (p(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function qa(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Ja(e, t) {
	return e ? l(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ya(e, t) {
	return e ? p(e) && p(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : l(/* @__PURE__ */ Object.create(null), ja(e), ja(t ?? {})) : t;
}
function Xa(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = l(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = qa(e[r], t[r]);
	return n;
}
function Za() {
	return {
		app: null,
		config: {
			isNativeTag: o,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var Qa = 0;
function $a(e, t) {
	return function(n, r = null) {
		v(n) || (n = l({}, n)), r != null && !x(r) && (r = null);
		let i = Za(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: Qa++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: ac,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && v(e.install) ? (a.add(e), e.install(c, ...t)) : v(e) && (a.add(e), e(c, ...t))), c;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), c;
			},
			component(e, t) {
				return t ? (i.components[e] = t, c) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, c) : i.directives[e];
			},
			mount(a, o, l) {
				if (!s) {
					let u = c._ceVNode || q(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, $s(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (Bn(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = eo;
				eo = c;
				try {
					return e();
				} finally {
					eo = t;
				}
			}
		};
		return c;
	};
}
var eo = null;
function to(e, t, n = r) {
	let i = Is(), a = j(t), o = M(t), s = no(e, a), c = _n((s, c) => {
		let l, u = r, d;
		return wr(() => {
			let t = e[a];
			re(l, t) && (l = t, c());
		}), {
			get() {
				return s(), n.get ? n.get(l) : l;
			},
			set(e) {
				let s = n.set ? n.set(e) : e;
				if (!re(s, l) && !(u !== r && re(e, u))) return;
				let f = i.vnode.props, p = !!(f && (t in f || a in f || o in f) && (`onUpdate:${t}` in f || `onUpdate:${a}` in f || `onUpdate:${o}` in f));
				p || (l = e, c()), i.emit(`update:${t}`, s), re(e, u) && (re(e, s) && !re(s, d) || p && u !== r && !re(s, l)) && c(), u = e, d = s;
			}
		};
	});
	return c[Symbol.iterator] = () => {
		let e = 0;
		return { next() {
			return e < 2 ? {
				value: e++ ? s || r : c,
				done: !1
			} : { done: !0 };
		} };
	}, c;
}
var no = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${j(t)}Modifiers`] || e[`${M(t)}Modifiers`];
function ro(e, t, ...n) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || r, a = n, o = t.startsWith("update:"), s = o && no(i, t.slice(7));
	s && (s.trim && (a = n.map((e) => y(e) ? e.trim() : e)), s.number && (a = a.map(oe)));
	let c, l = i[c = ne(t)] || i[c = ne(j(t))];
	!l && o && (l = i[c = ne(M(t))]), l && Bn(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, Bn(u, e, 6, a);
	}
}
var io = /* @__PURE__ */ new WeakMap();
function ao(e, t, n = !1) {
	let r = n ? io : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!v(e)) {
		let r = (e) => {
			let n = ao(e, t, !0);
			n && (s = !0, l(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (x(e) && r.set(e, null), null) : (p(a) ? a.forEach((e) => o[e] = null) : l(o, a), x(e) && r.set(e, o), o);
}
function oo(e, t) {
	return !e || !s(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), f(e, t[0].toLowerCase() + t.slice(1)) || f(e, M(t)) || f(e, t));
}
function so(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = dr(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = Es(u.call(t, e, d, f, m, p, h)), y = s;
		} else {
			let e = t;
			v = Es(e.length > 1 ? e(f, {
				attrs: s,
				slots: o,
				emit: l
			}) : e(f, null)), y = t.props ? s : lo(s);
		}
	} catch (t) {
		ls.length = 0, Vn(t, e, 1), v = q(ss);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(c) && (y = uo(y, a)), b = Cs(b, y, !1, !0));
	}
	return n.dirs && (b = Cs(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ei(Ar(b.type) && $r(b) || b, n.transition), v = b, dr(_), v;
}
function co(e, t = !0) {
	let n;
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		if (gs(r)) {
			if (r.type !== ss || r.children === "v-if") {
				if (n) return;
				n = r;
			}
		} else return;
	}
	return n;
}
var lo = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || s(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, uo = (e, t) => {
	let n = {};
	for (let r in e) c(r) && r.slice(9) in t || (n[r] = e[r]);
	return n;
};
function fo(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? po(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (mo(o, r, n) && !oo(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || po(r, o, l) : !!o;
	return !1;
}
function po(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (!f(e, a) || mo(t, e, a) && !oo(n, a)) return !0;
	}
	return !1;
}
function mo(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && x(r) && x(i) ? !we(r, i) : r !== i;
}
function ho({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var go = {}, _o = () => Object.create(go), vo = (e) => Object.getPrototypeOf(e) === go;
function yo(e, t, n, r = !1) {
	let i = {}, a = _o();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), xo(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ Zt(i) : e.type.props ? i : a, e.attrs = a;
}
function bo(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ on(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (oo(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) {
					if (f(a, o)) u !== a[o] && (a[o] = u, l = !0);
					else {
						let t = j(o);
						i[t] = So(c, s, t, u, e, !1);
					}
				} else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		xo(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) t && (f(t, a) || (r = M(a)) !== a && f(t, r)) || (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = So(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) t && f(t, e) || (delete a[e], l = !0);
	}
	l && ft(e.attrs, "set", "");
}
function xo(e, t, n, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (t) for (let r in t) {
		if (O(r)) continue;
		let l = t[r], u;
		a && f(a, u = j(r)) ? !o || !o.includes(u) ? n[u] = l : (c ||= {})[u] = l : oo(e.emitsOptions, r) || r in i && l === i[r] || (i[r] = l, s = !0);
	}
	if (o) {
		let t = /* @__PURE__ */ on(n), i = c || r;
		for (let r = 0; r < o.length; r++) {
			let s = o[r];
			n[s] = So(a, t, s, i[s], e, !f(i, s));
		}
	}
	return s;
}
function So(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = f(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && v(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = zs(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === M(n)) && (r = !0));
	}
	return r;
}
var Co = /* @__PURE__ */ new WeakMap();
function wo(e, t, n = !1) {
	let a = n ? Co : t.propsCache, o = a.get(e);
	if (o) return o;
	let s = e.props, c = {}, u = [], d = !1;
	if (!v(e)) {
		let r = (e) => {
			d = !0;
			let [n, r] = wo(e, t, !0);
			l(c, n), r && u.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!s && !d) return x(e) && a.set(e, i), i;
	if (p(s)) for (let e = 0; e < s.length; e++) {
		let t = j(s[e]);
		To(t) && (c[t] = r);
	}
	else if (s) for (let e in s) {
		let t = j(e);
		if (To(t)) {
			let n = s[e], r = c[t] = p(n) || v(n) ? { type: n } : l({}, n), i = r.type, a = !1, o = !0;
			if (p(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = v(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				}
				n === "String" && (o = !1);
			}
			else a = v(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || f(r, "default")) && u.push(t);
		}
	}
	let m = [c, u];
	return x(e) && a.set(e, m), m;
}
function To(e) {
	return e[0] !== "$" && !O(e);
}
var Eo = (e) => e === "_" || e === "_ctx" || e === "$stable", Do = (e) => p(e) ? e.map(Es) : [Es(e)], Oo = (e, t, n) => {
	if (t._n) return t;
	let r = B((...e) => Do(t(...e)), n);
	return r._c = !1, r;
}, ko = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Eo(n)) continue;
		let i = e[n];
		if (v(i)) t[n] = Oo(n, i, r);
		else if (i != null) {
			let e = Do(i);
			t[n] = () => e;
		}
	}
}, Ao = (e, t) => {
	let n = Do(t);
	e.slots.default = () => n;
}, jo = (e, t, n) => {
	for (let r in t) (n || !Eo(r)) && (e[r] = t[r]);
}, Mo = (e, t, n) => {
	let r = e.slots = _o();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (jo(r, t, n), n && ae(r, "_", e, !0)) : ko(t, r);
	} else t && Ao(e, t);
}, No = (e, t, n) => {
	let { vnode: i, slots: a } = e, o = !0, s = r;
	if (i.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? o = !1 : jo(a, t, n) : (o = !t.$stable, ko(t, a)), s = t;
	} else t && (Ao(e, t), s = { default: 1 });
	if (o) for (let e in a) !Eo(e) && s[e] == null && delete a[e];
}, Po = ns;
function Fo(e) {
	return Lo(e);
}
function Io(e) {
	return Lo(e, gi);
}
function Lo(e, t) {
	let n = le();
	n.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = a, insertStaticContent: _ } = e, v = (e, t, n, r = null, a = null, o = null, s = void 0, c = null, l = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !_s(e, t) && (r = ge(e), de(e, a, o, !0), e = null), t.patchFlag === -2 && (l = !1, t.dynamicChildren = null), t.dynamicChildren && e && e.dynamicChildren && e.dynamicChildren.hasOnce && (t.dynamicChildren === i && (t.dynamicChildren = []), t.dynamicChildren.hasOnce = !0);
		let { type: u, ref: d, shapeFlag: f } = t;
		switch (u) {
			case os:
				y(e, t, n, r);
				break;
			case ss:
				b(e, t, n, r);
				break;
			case cs:
				e ?? x(t, n, r, s);
				break;
			case as:
				ee(e, t, n, r, a, o, s, c, l);
				break;
			default: f & 1 ? w(e, t, n, r, a, o, s, c, l) : f & 6 ? M(e, t, n, r, a, o, s, c, l) : (f & 64 || f & 128) && u.process(e, t, n, r, a, o, s, c, l, ve);
		}
		d != null && a ? ci(d, e && e.ref, o, t || e, !t) : d == null && e && e.ref != null && ci(e.ref, null, o, e, !0);
	}, y = (e, t, n, r) => {
		if (e == null) o(t.el = u(t.children), n, r);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, r) => {
		e == null ? o(t.el = d(t.children || ""), n, r) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, r) => {
		let i;
		for (; e && e !== t;) i = h(e), o(e, n, r), e = i;
		o(t, n, r);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) T(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), k(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, T = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && D(e.children, d, null, r, i, Ro(e, a), s, u), _ && gr(e, null, r, "created"), E(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !O(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && As(f, r, e);
		}
		_ && gr(e, null, r, "beforeMount");
		let v = Bo(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && Po(() => {
			try {
				f && As(f, r, e), v && g.enter(d), _ && gr(e, null, r, "mounted");
			} finally {}
		}, i);
	}, E = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Ko(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				E(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, D = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? Ds(e[l]) : Es(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, k = (e, t, n, i, a, o, s) => {
		let l = t.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = t;
		u |= e.patchFlag & 16;
		let m = e.props || r, h = t.props || r, g;
		if (n && zo(n, !1), (g = h.onVnodeBeforeUpdate) && As(g, n, t, e), f && gr(t, e, n, "beforeUpdate"), n && zo(n, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (u = 0, s = !1, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? A(e.dynamicChildren, d, l, n, i, Ro(t, a), o) : s || oe(e, t, l, null, n, i, Ro(t, a), o, !1), u > 0) {
			if (u & 16) j(l, m, h, n, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], i = m[r], o = h[r];
					(o !== i || r === "value") && c(l, r, i, o, a, n);
				}
			}
			u & 1 && e.children !== t.children && p(l, t.children);
		} else !s && d == null && j(l, m, h, n, a);
		((g = h.onVnodeUpdated) || f) && Po(() => {
			g && As(g, n, t, e), f && gr(t, e, n, "updated");
		}, i);
	}, A = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el || Go(c), d = u && (c.type === as || !_s(c, l) || c.shapeFlag & 198) ? m(u) : n;
			v(c, l, d, null, r, i, a, o, !0);
		}
	}, j = (e, t, n, i, a) => {
		if (t !== n) {
			if (t !== r) for (let r in t) !O(r) && !(r in n) && c(e, r, t[r], null, a, i);
			for (let r in n) {
				if (O(r)) continue;
				let o = n[r], s = t[r];
				o !== s && r !== "value" && c(e, r, s, o, a, i);
			}
			"value" in n && c(e, "value", t.value, n.value, a);
		}
	}, ee = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), D(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (A(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Vo(e, t, !0)) : oe(e, t, n, f, i, a, s, c, l);
	}, M = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : te(t, n, r, i, a, o, c) : ne(e, t, c);
	}, te = (e, t, n, r, i, a, o) => {
		let s = e.component = Ps(e, r, i);
		if (Li(e) && (s.ctx.renderer = ve), Us(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, re, o, a), !e.el) {
				let r = s.subTree = q(ss);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else re(s, e, t, n, i, a, o);
	}, ne = (e, t, n) => {
		let r = t.component = e.component;
		if (fo(e, t, n)) {
			if (r.asyncDep && !r.asyncResolved) {
				t.el = e.el, t.placeholder = e.placeholder, ae(r, t, n);
				return;
			}
			r.next = t, r.update();
		} else t.el = e.el, t.placeholder = e.placeholder, r.vnode = t;
	}, re = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Uo(e);
					if (n) {
						t && (t.el = c.el, ae(e, t, o)), n.asyncDep.then(() => {
							Po(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				zo(e, !1), t ? (t.el = c.el, ae(e, t, o)) : t = c, n && ie(n), (d = t.props && t.props.onVnodeBeforeUpdate) && As(d, s, t, c), zo(e, !0);
				let f = so(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), ge(p), e, i, a), t.el = f.el, u === null && ho(e, f.el), r && Po(r, i), (d = t.props && t.props.onVnodeUpdated) && Po(() => As(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = Pi(t);
				if (zo(e, !1), l && ie(l), !m && (o = c && c.onVnodeBeforeMount) && As(o, d, t), zo(e, !0), s && be) {
					let t = () => {
						e.subTree = so(e), be(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = so(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && Po(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					Po(() => As(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && Pi(d.vnode) && d.vnode.shapeFlag & 256) && e.a && Po(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Le(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Zn(u), zo(e, !0), l();
	}, ae = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, bo(e, t.props, r, n), No(e, t.children, n), et(), er(e), tt();
	}, oe = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				ce(l, d, n, r, i, a, o, s, c);
				return;
			}
			if (f & 256) {
				se(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && he(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? ce(l, d, n, r, i, a, o, s, c) : he(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && D(d, n, r, i, a, o, s, c));
	}, se = (e, t, n, r, a, o, s, c, l) => {
		e ||= i, t ||= i;
		let u = e.length, d = t.length, f = Math.min(u, d), p = 0;
		for (; p < f; p++) {
			let r = t[p] = l ? Ds(t[p]) : Es(t[p]);
			v(e[p], r, n, null, a, o, s, c, l);
		}
		u > d ? he(e, a, o, !0, !1, f) : D(t, n, r, a, o, s, c, l, f);
	}, ce = (e, t, n, r, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let r = e[u], i = t[u] = l ? Ds(t[u]) : Es(t[u]);
			if (_s(r, i)) v(r, i, n, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let r = e[f], i = t[p] = l ? Ds(t[p]) : Es(t[p]);
			if (_s(r, i)) v(r, i, n, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, i = e < d ? t[e].el : r;
				for (; u <= p;) v(null, t[u] = l ? Ds(t[u]) : Es(t[u]), n, i, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) de(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? Ds(t[u]) : Es(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let r = e[u];
				if (y >= b) {
					de(r, a, o, !0);
					continue;
				}
				let i;
				if (r.key != null) i = g.get(r.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && _s(r, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? de(r, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(r, t[i], n, null, a, o, s, c, l), y++);
			}
			let w = x ? Ho(C) : i;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, i = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Go(f) : r;
				C[u] === 0 ? v(null, i, n, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? ue(i, n, p, 2) : _--);
			}
		}
	}, ue = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) ue(e.component.subTree, t, n, r);
		else if (d & 128) e.suspense.move(t, n, r);
		else if (d & 64) c.move(e, t, n, ve);
		else if (c === as) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) ue(u[e], t, n, r);
			o(e.anchor, t, n);
		} else if (c === cs) S(e, t, n);
		else if (r !== 2 && d & 1 && l) {
			if (r === 0) l.persisted && !a[Hr] ? o(a, t, n) : (l.beforeEnter(a), o(a, t, n), Po(() => l.enter(a), i));
			else {
				let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
					e.ctx.isUnmounted ? s(a) : o(a, t, n);
				}, d = () => {
					let e = a._isLeaving || !!a[Hr];
					a._isLeaving && a[Hr](!0), l.persisted && !e ? u() : r(a, () => {
						u(), c && c();
					});
				};
				i ? i(a, u, d) : d();
			}
		} else o(a, t, n);
	}, de = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if ((d === -2 || l && l.hasOnce) && (i = !1), s != null && (et(), ci(s, null, n, e, !0), tt()), p == null || e.ctx && e.ctx !== t || (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !Pi(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && As(_, t, e), u & 6) me(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && gr(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, ve, r) : l && !l.hasOnce && (a !== as || d > 0 && d & 64) ? he(l, t, n, !1, !0) : (a === as && d & 384 || !i && u & 16) && he(c, t, n), r && fe(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && Po(() => {
			_ && As(_, t, e), h && gr(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, fe = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e, a = t === as;
		if (a && !i) {
			pe(n, r);
			return;
		}
		if (t === cs) {
			C(e), i && !i.persisted && i.afterLeave && i.afterLeave();
			return;
		}
		let o = a ? ni(e) : e, c = () => {
			a ? m(n) && pe(n, r) : s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
		};
		if (o && o.shapeFlag & 1 && i && !i.persisted) {
			let { leave: e, delayLeave: t } = i, n = o.el, r = () => e(n, c);
			t ? t(n, c, r) : r();
		} else c();
	}, pe = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, me = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Wo(c), Wo(l), r && ie(r), i.stop(), a ? (a.flags |= 8, de(o, e, t, n)) : e.vnode.el && o && (o.transition = e.vnode.transition, de(o, e, t, n)), s && Po(s, t), Po(() => {
			e.isUnmounted = !0;
		}, t);
	}, he = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) de(e[o], t, n, r, i);
	}, ge = (e) => {
		if (e.shapeFlag & 6) return ge(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[kr];
		return n ? h(n) : t;
	}, _e = (e, t, n) => {
		rr(() => {
			e == null ? t._vnode && de(t._vnode, null, null, !0) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e;
		}, e && t._vnode ? void 0 : e && e.component ? e.component.uid : Ns());
	}, ve = {
		p: v,
		um: de,
		m: ue,
		r: fe,
		mt: te,
		mc: D,
		pc: oe,
		pbc: A,
		n: ge,
		o: e
	}, ye, be;
	return t && ([ye, be] = t(ve)), {
		render: _e,
		hydrate: ye,
		createApp: $a(_e, ye)
	};
}
function Ro({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function zo({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Bo(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Vo(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (p(r) && p(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = Ds(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Vo(t, a)), a.type === os && (a.patchFlag === -1 && (a = i[e] = Ds(a)), a.el = t.el), a.type === ss && !a.el && (a.el = t.el);
	}
}
function Ho(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function Uo(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Uo(t);
}
function Wo(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Go(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Go(t.subTree) : null;
}
var Ko = (e) => e.__isSuspense, qo = 0, Jo = {
	name: "Suspense",
	__isSuspense: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		if (e == null) Xo(t, n, r, i, a, o, s, c, l);
		else {
			if (a && a.deps > 0 && !e.suspense.isInFallback && !a.isHydrating) {
				t.suspense = e.suspense, t.suspense.vnode = t, t.el = e.el;
				return;
			}
			Zo(e, t, n, r, i, o, s, c, l);
		}
	},
	hydrate: $o,
	normalize: es
};
function Yo(e, t) {
	let n = e.props && e.props[t];
	v(n) && n();
}
function Xo(e, t, n, r, i, a, o, s, c) {
	let { p: l, o: { createElement: u } } = c, d = u("div"), f = e.suspense = Qo(e, i, r, t, d, n, a, o, s, c);
	l(null, f.pendingBranch = e.ssContent, d, null, r, f, a, o), f.deps > 0 ? (Yo(e, "onPending"), Yo(e, "onFallback"), l(null, e.ssFallback, t, n, r, null, a, o), rs(f, e.ssFallback)) : f.resolve(!1, !0);
}
function Zo(e, t, n, r, i, a, o, s, { p: c, um: l, o: { createElement: u } }) {
	let d = t.suspense = e.suspense;
	d.vnode = t, t.el = e.el;
	let f = t.ssContent, p = t.ssFallback, { activeBranch: m, pendingBranch: h, isInFallback: g, isHydrating: _ } = d;
	if (h) d.pendingBranch = f, _s(h, f) ? (d.deps++, c(h, f, _ ? n : d.hiddenContainer, null, i, d, a, o, s), d.deps--, d.deps <= 0 ? d.resolve() : g && !_ && !d.isFallbackMountPending && (c(m, p, n, r, i, null, a, o, s), rs(d, p))) : (d.pendingId = qo++, _ ? (d.isHydrating = !1, d.activeBranch = h) : l(h, i, d), d.deps = 0, d.effects.length = 0, d.hiddenContainer = u("div"), g ? (c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 ? d.resolve() : d.isFallbackMountPending || (c(m, p, n, r, i, null, a, o, s), rs(d, p))) : m && _s(m, f) ? (c(m, f, n, r, i, d, a, o, s), d.resolve(!0)) : (c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 && d.resolve()));
	else if (m && _s(m, f)) c(m, f, n, r, i, d, a, o, s), rs(d, f);
	else if (Yo(t, "onPending"), d.pendingBranch = f, d.pendingId = f.shapeFlag & 512 ? f.component.suspenseId : qo++, c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0) d.resolve();
	else {
		let { timeout: e, pendingId: t } = d;
		e > 0 ? setTimeout(() => {
			d.pendingId === t && d.fallback(p);
		}, e) : e === 0 && d.fallback(p);
	}
}
function Qo(e, t, n, r, i, a, o, s, c, l, u = !1) {
	let { p: d, m: f, um: p, n: m, o: { parentNode: h, remove: g } } = l, _, v = is(e);
	v && t && t.pendingBranch && (_ = t.pendingId, t.deps++);
	let y = e.props ? se(e.props.timeout) : void 0, b = a, x = {
		vnode: e,
		parent: t,
		parentComponent: n,
		namespace: o,
		container: r,
		hiddenContainer: i,
		deps: 0,
		pendingId: qo++,
		timeout: typeof y == "number" ? y : -1,
		activeBranch: null,
		isFallbackMountPending: !1,
		pendingBranch: null,
		isInFallback: !u,
		isHydrating: u,
		isUnmounted: !1,
		effects: [],
		resolve(e = !1, n = !1) {
			let { vnode: r, activeBranch: i, pendingBranch: o, pendingId: s, effects: c, parentComponent: l, container: u, isInFallback: d } = x, g = !1;
			if (x.isHydrating) x.isHydrating = !1;
			else if (!e) {
				g = i && o.transition && o.transition.mode === "out-in";
				let e = !1;
				g && (i.transition.afterLeave = () => {
					s === x.pendingId && (f(o, u, a === b && !e ? m(i) : a, 0), $n(c), d && r.ssFallback && (r.ssFallback.el = null));
				}), i && !x.isFallbackMountPending && (h(i.el) === u && (a = m(i), e = !0), p(i, l, x, !0), !g && d && r.ssFallback && Po(() => r.ssFallback.el = null, x)), g || f(o, u, a, 0);
			}
			x.isFallbackMountPending = !1, rs(x, o), x.pendingBranch = null, x.isInFallback = !1;
			let y = x.parent, S = !1;
			for (; y;) {
				if (y.pendingBranch) {
					for (let e = 0; e < c.length; e++) y.effects.push(c[e]);
					S = !0;
					break;
				}
				y = y.parent;
			}
			!S && !g && $n(c), x.effects = [], v && t && t.pendingBranch && _ === t.pendingId && (_ = void 0, t.deps--, t.deps === 0 && !n && t.resolve()), Yo(r, "onResolve");
		},
		fallback(e) {
			if (!x.pendingBranch) return;
			let { vnode: t, activeBranch: n, parentComponent: r, container: i, namespace: a } = x;
			Yo(t, "onFallback");
			let o = m(n), l = () => {
				if (x.isFallbackMountPending = !1, !x.isInFallback) return;
				let e = x.vnode.ssFallback;
				d(null, e, i, o, r, null, a, s, c), rs(x, e);
			}, u = e.transition && e.transition.mode === "out-in";
			u && (x.isFallbackMountPending = !0, n.transition.afterLeave = l), x.isInFallback = !0, p(n, r, null, !0), u || l();
		},
		move(e, t, n) {
			x.activeBranch && f(x.activeBranch, e, t, n), x.container = e;
		},
		next() {
			return x.activeBranch && m(x.activeBranch);
		},
		registerDep(e, t, n, r) {
			let i = !!x.pendingBranch;
			i && x.deps++;
			let a = e.vnode.el;
			e.asyncDep.catch((t) => {
				Vn(t, e, 0);
			}).then((o) => {
				if (e.isUnmounted || x.isUnmounted || x.pendingId !== e.suspenseId) return;
				if (Bs(), !e.scope.active) {
					i && --x.deps === 0 && x.resolve();
					return;
				}
				e.asyncResolved = !0;
				let { vnode: s } = e;
				Gs(e, o, !1), a && (s.el = a);
				let c = !a && e.subTree.el;
				t(e, s, h(a || e.subTree.el), a ? null : m(e.subTree), x, r, n), c && (s.placeholder = null, g(c)), ho(e, s.el), i && --x.deps === 0 && x.resolve();
			});
		},
		unmount(e, t) {
			x.isUnmounted = !0, x.activeBranch && p(x.activeBranch, n, e, t), x.pendingBranch && p(x.pendingBranch, n, e, t);
		}
	};
	return x;
}
function $o(e, t, n, r, i, a, o, s, c) {
	let l = t.suspense = Qo(t, r, n, e.parentNode, document.createElement("div"), null, i, a, o, s, !0), u = c(e, l.pendingBranch = t.ssContent, n, l, a, o);
	return l.deps === 0 && l.resolve(!1, !0), u;
}
function es(e) {
	let { shapeFlag: t, children: n } = e, r = t & 32;
	e.ssContent = ts(r ? n.default : n), e.ssFallback = r ? ts(n.fallback) : q(ss);
}
function ts(e) {
	let t;
	if (v(e)) {
		let n = fs && e._c;
		n && (e._d = !1, W()), e = e(), n && (e._d = !0, t = us, ds());
	}
	return p(e) && (e = co(e)), e = Es(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((t) => t !== e)), e;
}
function ns(e, t) {
	t && t.pendingBranch ? p(e) ? t.effects.push(...e) : t.effects.push(e) : $n(e);
}
function rs(e, t) {
	e.activeBranch = t;
	let { vnode: n, parentComponent: r } = e, i = t.el;
	for (; !i && t.component;) t = t.component.subTree, i = t.el;
	n.el = i, r && r.subTree === n && (r.vnode.el = i, ho(r, i));
}
function is(e) {
	let t = e.props && e.props.suspensible;
	return t != null && t !== !1;
}
var as = /* @__PURE__ */ Symbol.for("v-fgt"), os = /* @__PURE__ */ Symbol.for("v-txt"), ss = /* @__PURE__ */ Symbol.for("v-cmt"), cs = /* @__PURE__ */ Symbol.for("v-stc"), ls = [], us = null;
function W(e = !1) {
	ls.push(us = e ? null : []);
}
function ds() {
	ls.pop(), us = ls[ls.length - 1] || null;
}
var fs = 1;
function ps(e, t = !1) {
	fs += e, e < 0 && us && t && (us.hasOnce = !0);
}
function ms(e) {
	return e.dynamicChildren = fs > 0 ? us || i : null, ds(), fs > 0 && us && us.push(e), e;
}
function hs(e, t, n, r, i, a) {
	return ms(K(e, t, n, r, i, a, !0));
}
function G(e, t, n, r, i) {
	return ms(q(e, t, n, r, i, !0));
}
function gs(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function _s(e, t) {
	return e.type === t.type && e.key === t.key;
}
function vs(e) {}
var ys = ({ key: e }) => e ?? null, bs = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : y(e) || /* @__PURE__ */ P(e) || v(e) ? {
	i: lr,
	r: e,
	k: t,
	f: !!n
} : e);
function K(e, t = null, n = null, r = 0, i = null, a = e === as ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && ys(t),
		ref: t && bs(t),
		scopeId: ur,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: lr
	};
	return s ? (Os(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= y(n) ? 8 : 16), fs > 0 && !o && us && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && us.push(c), c;
}
var q = xs;
function xs(e, t = null, n = null, r = 0, i = null, a = !1) {
	if (e && e !== oa || (e = ss), gs(e)) {
		let r = Cs(e, t, !0);
		return n && Os(r, n), fs > 0 && !a && us && (r.shapeFlag & 6 ? us[us.indexOf(e)] = r : us.push(r)), r.patchFlag = -2, r;
	}
	if (tc(e) && (e = e.__vccOpts), t) {
		t = Ss(t);
		let { class: e, style: n } = t;
		e && !y(e) && (t.class = ge(e)), x(n) && (/* @__PURE__ */ an(n) && !p(n) && (n = l({}, n)), t.style = de(n));
	}
	let o = y(e) ? 1 : Ko(e) ? 128 : Ar(e) ? 64 : x(e) ? 4 : v(e) ? 2 : 0;
	return K(e, t, n, r, i, o, a, !0);
}
function Ss(e) {
	return e ? /* @__PURE__ */ an(e) || vo(e) ? l({}, e) : e : null;
}
function Cs(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? ks(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && ys(l),
		ref: t && t.ref ? n && a ? p(a) ? a.concat(bs(t)) : [a, bs(t)] : bs(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== as ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Cs(e.ssContent),
		ssFallback: e.ssFallback && Cs(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
		cacheIndex: e.cacheIndex
	};
	return c && r && ei(u, c.clone(u)), u;
}
function J(e = " ", t = 0) {
	return q(os, null, e, t);
}
function ws(e, t) {
	let n = q(cs, null, e);
	return n.staticCount = t, n;
}
function Ts(e = "", t = !1) {
	return t ? (W(), G(ss, null, e)) : q(ss, null, e);
}
function Es(e) {
	return e == null || typeof e == "boolean" ? q(ss) : p(e) ? q(as, null, e.slice()) : gs(e) ? Ds(e) : q(os, null, String(e));
}
function Ds(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : Cs(e);
}
function Os(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (p(t)) n = 16;
	else if (typeof t == "object") {
		if (r & 65) {
			let n = t.default;
			n && (n._c && (n._d = !1), Os(e, n()), n._c && (n._d = !0));
			return;
		}
		{
			n = 32;
			let r = t._;
			!r && !vo(t) ? t._ctx = lr : r === 3 && lr && (lr.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
		}
	} else if (v(t)) {
		if (r & 65) {
			Os(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: lr
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [J(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function ks(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = ge([t.class, r.class]));
		else if (e === "style") t.style = de([t.style, r.style]);
		else if (s(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(p(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !c(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function As(e, t, n, r = null) {
	Bn(e, t, 7, [n, r]);
}
var js = Za(), Ms = 0;
function Ns() {
	return Ms;
}
function Ps(e, t, n) {
	let i = e.type, a = (t ? t.appContext : e.appContext) || js, o = {
		uid: Ms++,
		vnode: e,
		type: i,
		parent: t,
		appContext: a,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new je(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: t ? t.provides : Object.create(a.provides),
		ids: t ? t.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: wo(i, a),
		emitsOptions: ao(i, a),
		emit: null,
		emitted: null,
		propsDefaults: r,
		inheritAttrs: i.inheritAttrs,
		ctx: r,
		data: r,
		props: r,
		attrs: r,
		slots: r,
		refs: r,
		setupState: r,
		setupContext: null,
		suspense: n,
		suspenseId: n ? n.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = ro.bind(null, o), e.ce && e.ce(o), o;
}
var Fs = null, Is = () => Fs || lr, Ls, Rs;
{
	let e = le(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Ls = t("__VUE_INSTANCE_SETTERS__", (e) => Fs = e), Rs = t("__VUE_SSR_SETTERS__", (e) => Hs = e);
}
var zs = (e) => {
	let t = Fs;
	return Ls(e), e.scope.on(), () => {
		e.scope.off(), Ls(t);
	};
}, Bs = () => {
	Fs && Fs.scope.off(), Ls(null);
};
function Vs(e) {
	return e.vnode.shapeFlag & 4;
}
var Hs = !1;
function Us(e, t = !1, n = !1) {
	t && Rs(t);
	let { props: r, children: i } = e.vnode, a = Vs(e);
	yo(e, r, a, t), Mo(e, i, n || t);
	let o = a ? Ws(e, t) : void 0;
	return t && Rs(!1), o;
}
function Ws(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ya);
	let { setup: r } = n;
	if (r) {
		et();
		let n = e.setupContext = r.length > 1 ? Qs(e) : null, i = zs(e), a = zn(r, e, 0, [e.props, n]), o = S(a);
		if (tt(), i(), (o || e.sp) && !Pi(e) && ii(e), o) {
			if (a.then(Bs, Bs), t) return a.then((n) => {
				Rs(!0);
				try {
					Gs(e, n, t);
				} finally {
					Rs(!1);
				}
			}).catch((t) => {
				Vn(t, e, 0);
			});
			e.asyncDep = a;
		} else Gs(e, a, t);
	} else Xs(e, t);
}
function Gs(e, t, n) {
	v(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : x(t) && (e.setupState = hn(t)), Xs(e, n);
}
var Ks, qs;
function Js(e) {
	Ks = e, qs = (e) => {
		e.render._rc && (e.withProxy = new Proxy(e.ctx, ba));
	};
}
var Ys = () => !Ks;
function Xs(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && Ks && !r.render) {
			let t = r.template || Va(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r, s = l(l({
					isCustomElement: n,
					delimiters: a
				}, i), o);
				r.render = Ks(t, s);
			}
		}
		e.render = r.render || a, qs && qs(e);
	}
	{
		let t = zs(e);
		et();
		try {
			La(e);
		} finally {
			tt(), t();
		}
	}
}
var Zs = { get(e, t) {
	return dt(e, "get", ""), e[t];
} };
function Qs(e) {
	return {
		attrs: new Proxy(e.attrs, Zs),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function $s(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(hn(sn(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in _a) return _a[n](e);
		},
		has(e, t) {
			return t in e || t in _a;
		}
	}) : e.proxy;
}
function ec(e, t = !0) {
	return v(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function tc(e) {
	return v(e) && "__vccOpts" in e;
}
var Y = (e, t) => /* @__PURE__ */ Cn(e, t, Hs);
function X(e, t, n) {
	try {
		ps(-1);
		let r = arguments.length;
		return r === 2 ? x(t) && !p(t) ? gs(t) ? q(e, null, [t]) : q(e, t) : q(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && gs(n) && (n = [n]), q(e, t, n));
	} finally {
		ps(1);
	}
}
function nc() {}
function rc(e, t, n, r) {
	let i = n[r];
	if (i && ic(i, e)) return i;
	let a = t();
	return a.memo = e.slice(), a.cacheIndex = r, n[r] = a;
}
function ic(e, t) {
	let n = e.memo;
	if (n.length != t.length) return !1;
	for (let e = 0; e < n.length; e++) if (re(n[e], t[e])) return !1;
	return fs > 0 && us && us.push(e), !0;
}
var ac = "3.5.44", oc = a, sc = Rn, cc = or, lc = cr, uc = {
	createComponentInstance: Ps,
	setupComponent: Us,
	renderComponentRoot: so,
	setCurrentRenderingInstance: dr,
	isVNode: gs,
	normalizeVNode: Es,
	getComponentPublicInstance: $s,
	ensureValidVNode: ma,
	pushWarningContext: Pn,
	popWarningContext: Fn
}, dc = void 0, fc = typeof window < "u" && window.trustedTypes;
if (fc) try {
	dc = /* @__PURE__ */ fc.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var pc = dc ? (e) => dc.createHTML(e) : (e) => e, mc = "http://www.w3.org/2000/svg", hc = "http://www.w3.org/1998/Math/MathML", gc = typeof document < "u" ? document : null, _c = gc && /* @__PURE__ */ gc.createElement("template"), vc = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? gc.createElementNS(mc, e) : t === "mathml" ? gc.createElementNS(hc, e) : n ? gc.createElement(e, { is: n }) : gc.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => gc.createTextNode(e),
	createComment: (e) => gc.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => gc.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling););
		else {
			_c.innerHTML = pc(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = _c.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, yc = "transition", bc = "animation", xc = /* @__PURE__ */ Symbol("_vtc"), Sc = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: !0
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
}, Cc = /* @__PURE__ */ l({}, Kr, Sc), wc = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = Cc, e))((e, { slots: t }) => X(Yr, Dc(e), t)), Tc = (e, t = []) => {
	p(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, Ec = (e) => e ? p(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function Dc(e) {
	let t = {};
	for (let n in e) n in Sc || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: s = `${n}-enter-to`, appearFromClass: c = a, appearActiveClass: u = o, appearToClass: d = s, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: m = `${n}-leave-to` } = e, h = Oc(i), g = h && h[0], _ = h && h[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: T = b } = t, E = (e, t, n, r) => {
		e._enterCancelled = r, jc(e, t ? d : s), jc(e, t ? u : o), n && n();
	}, D = (e, t) => {
		e._isLeaving = !1, jc(e, f), jc(e, m), jc(e, p), t && t();
	}, O = (e) => (t, n) => {
		let i = e ? w : y, o = () => E(t, e, n);
		Tc(i, [t, o]), Mc(() => {
			jc(t, e ? c : a), Ac(t, e ? d : s), Ec(i) || Pc(t, r, g, o);
		});
	};
	return l(t, {
		onBeforeEnter(e) {
			Tc(v, [e]), Ac(e, a), Ac(e, o);
		},
		onBeforeAppear(e) {
			Tc(C, [e]), Ac(e, c), Ac(e, u);
		},
		onEnter: O(!1),
		onAppear: O(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => D(e, t);
			Ac(e, f), e._enterCancelled ? (Ac(e, p), Rc(e)) : (Rc(e), Ac(e, p)), Mc(() => {
				e._isLeaving && (jc(e, f), Ac(e, m), Ec(x) || Pc(e, r, _, n));
			}), Tc(x, [e, n]);
		},
		onEnterCancelled(e) {
			E(e, !1, void 0, !0), Tc(b, [e]);
		},
		onAppearCancelled(e) {
			E(e, !0, void 0, !0), Tc(T, [e]);
		},
		onLeaveCancelled(e) {
			D(e), Tc(S, [e]);
		}
	});
}
function Oc(e) {
	if (e == null) return null;
	if (x(e)) return [kc(e.enter), kc(e.leave)];
	{
		let t = kc(e);
		return [t, t];
	}
}
function kc(e) {
	return se(e);
}
function Ac(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[xc] || (e[xc] = /* @__PURE__ */ new Set())).add(t);
}
function jc(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[xc];
	n && (n.delete(t), n.size || (e[xc] = void 0));
}
function Mc(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var Nc = 0;
function Pc(e, t, n, r) {
	let i = e._endId = ++Nc, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = Fc(e, t);
	if (!o) return r();
	let l = o + "end", u = 0, d = () => {
		e.removeEventListener(l, f), a();
	}, f = (t) => {
		t.target === e && ++u >= c && d();
	};
	setTimeout(() => {
		u < c && d();
	}, s + 1), e.addEventListener(l, f);
}
function Fc(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${yc}Delay`), a = r(`${yc}Duration`), o = Ic(i, a), s = r(`${bc}Delay`), c = r(`${bc}Duration`), l = Ic(s, c), u = null, d = 0, f = 0;
	t === yc ? o > 0 && (u = yc, d = o, f = a.length) : t === bc ? l > 0 && (u = bc, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? yc : bc : null, f = u ? u === yc ? a.length : c.length : 0);
	let p = u === yc && /\b(?:transform|all)(?:,|$)/.test(r(`${yc}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function Ic(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => Lc(t) + Lc(e[n])));
}
function Lc(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Rc(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function zc(e, t, n) {
	let r = e[xc];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Bc = /* @__PURE__ */ Symbol("_vod"), Vc = /* @__PURE__ */ Symbol("_vsh"), Hc = {
	name: "show",
	beforeMount(e, { value: t }, { transition: n }) {
		e[Bc] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Uc(e, t);
	},
	mounted(e, { value: t }, { transition: n }) {
		n && t && n.enter(e);
	},
	updated(e, { value: t, oldValue: n }, { transition: r }) {
		!t != !n && (r ? t ? (r.beforeEnter(e), Uc(e, !0), r.enter(e)) : r.leave(e, () => {
			Uc(e, !1);
		}) : Uc(e, t));
	},
	beforeUnmount(e, { value: t }) {
		Uc(e, t);
	}
};
function Uc(e, t) {
	e.style.display = t ? e[Bc] : "none", e[Vc] = !t;
}
function Wc() {
	Hc.getSSRProps = ({ value: e }) => {
		if (!e) return { style: { display: "none" } };
	};
}
var Gc = /* @__PURE__ */ Symbol("");
function Kc(e) {
	let t = Is();
	if (!t) return;
	let n = t.ut = (n = e(t.proxy)) => {
		Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((e) => Jc(e, n));
	}, r = () => {
		let r = e(t.proxy);
		t.ce ? Jc(t.ce, r) : qc(t.subTree, r), n(r);
	};
	Xi(() => {
		$n(r);
	}), Yi(() => {
		V(r, a, { flush: "post" });
		let e = new MutationObserver(r);
		e.observe(t.subTree.el.parentNode, { childList: !0 }), $i(() => e.disconnect());
	});
}
function qc(e, t) {
	if (e.shapeFlag & 128) {
		let n = e.suspense;
		e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
			qc(n.activeBranch, t);
		});
	}
	for (; e.component;) e = e.component.subTree;
	if (e.shapeFlag & 1 && e.el) Jc(e.el, t);
	else if (e.type === as) e.children.forEach((e) => qc(e, t));
	else if (e.type === cs) {
		let { el: n, anchor: r } = e;
		for (; n && (Jc(n, t), n !== r);) n = n.nextSibling;
	}
}
function Jc(e, t) {
	if (e.nodeType === 1) {
		let n = e.style, r = "";
		for (let e in t) {
			let i = ke(t[e]);
			n.setProperty(`--${e}`, i), r += `--${e}: ${i};`;
		}
		n[Gc] = r;
	}
}
var Yc = /(?:^|;)\s*display\s*:/;
function Xc(e, t, n) {
	let r = e.style, i = y(n), a = !1;
	if (n && !i) {
		if (t) {
			if (y(t)) for (let e of t.split(";")) {
				let t = e.slice(0, e.indexOf(":")).trim();
				n[t] ?? Qc(r, t, "");
			}
			else for (let e in t) n[e] ?? Qc(r, e, "");
		}
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? Qc(r, i, "") : nl(e, i, !y(t) && t ? t[i] : void 0, o) || Qc(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[Gc];
			e && (n += ";" + e), r.cssText = n, a = Yc.test(n);
		}
	} else t && e.removeAttribute("style");
	Bc in e && (i && t === n || (e[Bc] = a ? r.display : ""), e[Vc] && (r.display = "none"));
}
var Zc = /\s*!important$/;
function Qc(e, t, n) {
	if (p(n)) n.forEach((n) => Qc(e, t, n));
	else if (n ??= "", t.startsWith("--")) Zc.test(n) ? e.setProperty(t, n.replace(Zc, ""), "important") : e.setProperty(t, n);
	else {
		let r = tl(e, t);
		Zc.test(n) ? e.setProperty(M(r), n.replace(Zc, ""), "important") : e[r] = n;
	}
}
var $c = [
	"Webkit",
	"Moz",
	"ms"
], el = {};
function tl(e, t) {
	let n = el[t];
	if (n) return n;
	let r = j(t);
	if (r !== "filter" && r in e) return el[t] = r;
	r = te(r);
	for (let n = 0; n < $c.length; n++) {
		let i = $c[n] + r;
		if (i in e) return el[t] = i;
	}
	return t;
}
function nl(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && y(r) && n === r;
}
var rl = "http://www.w3.org/1999/xlink";
function il(e, t, n, r, i, a = ve(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(rl, t.slice(6, t.length)) : e.setAttributeNS(rl, t, n) : n == null || a && !ye(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : b(n) ? String(n) : n);
}
function al(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? pc(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		r === i && "_value" in e || (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = ye(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function ol(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function sl(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var cl = /* @__PURE__ */ Symbol("_vei");
function ll(e, t, n, r, i = null) {
	let a = e[cl] || (e[cl] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = fl(t);
		r ? ol(e, n, a[t] = gl(r, i), s) : o && (sl(e, n, o, s), a[t] = void 0);
	}
}
var ul = /(Once|Passive|Capture)$/, dl = /^on:?(?:Once|Passive|Capture)$/;
function fl(e) {
	let t, n;
	for (; (n = e.match(ul)) && !dl.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : M(e.slice(2)), t];
}
var pl = 0, ml = /* @__PURE__ */ Promise.resolve(), hl = () => pl ||= (ml.then(() => pl = 0), Date.now());
function gl(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (p(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && Bn(e, t, 5, a);
			}
		} else Bn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = hl(), n;
}
var _l = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, vl = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? zc(e, r, o) : t === "style" ? Xc(e, n, r) : s(t) ? c(t) || ll(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), 1) : t[0] === "^" ? (t = t.slice(1), 0) : yl(e, t, r, o)) ? (al(e, t, r), e.tagName.includes("-") || t !== "value" && t !== "checked" && t !== "selected" || il(e, t, r, o, a, t !== "value")) : e._isVueCE && (bl(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !y(r))) ? al(e, j(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), il(e, t, r, o));
};
function yl(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && _l(t) && v(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return _l(t) && y(n) ? !1 : t in e;
}
function bl(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = j(t);
	return Array.isArray(n) ? n.some((e) => j(e) === r) : Object.keys(n).some((e) => j(e) === r);
}
var xl = {};
// @__NO_SIDE_EFFECTS__
function Sl(e, t, n) {
	let r = /* @__PURE__ */ H(e, t);
	E(r) && (r = l({}, r, t));
	class i extends Tl {
		constructor(e) {
			super(r, e, n);
		}
	}
	return i.def = r, i;
}
var Cl = /* @__NO_SIDE_EFFECTS__ */ ((e, t) => /* @__PURE__ */ Sl(e, t, Su)), wl = typeof HTMLElement < "u" ? HTMLElement : class {}, Tl = class e extends wl {
	constructor(e, t = {}, n = xu) {
		super(), this._def = e, this._props = t, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== xu ? this._root = this.shadowRoot : e.shadowRoot === !1 ? this._root = this : (this.attachShadow(l({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot);
	}
	connectedCallback() {
		if (!this.isConnected) return;
		!this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
		let t = this;
		for (; t &&= t.assignedSlot || t.parentNode || t.host;) if (t instanceof e) {
			this._parent = t;
			break;
		}
		this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
			if (this._pendingResolve = void 0, this.isConnected) return this._resolveDef();
		}) : this._resolveDef());
	}
	_setParent(e = this._parent) {
		e && (this._instance.parent = e._instance, this._inheritParentContext(e));
	}
	_inheritParentContext(e = this._parent) {
		e && this._app && Object.setPrototypeOf(this._app._context.provides, e._instance.provides);
	}
	disconnectedCallback() {
		this._connected = !1, z(() => {
			this._connected || (this._ob &&= (this._ob.disconnect(), null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets &&= (this._teleportTargets.clear(), void 0));
		});
	}
	_processMutations(e) {
		for (let t of e) this._setAttr(t.attributeName);
	}
	_resolveDef() {
		if (this._pendingResolve) return this._pendingResolve;
		for (let e = 0; e < this.attributes.length; e++) this._setAttr(this.attributes[e].name);
		this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
		let e = (e, t = !1) => {
			this._resolved = !0, this._pendingResolve = void 0;
			let { props: n, styles: r } = e, i;
			if (n && !p(n)) for (let e in n) {
				let t = n[e];
				(t === Number || t && t.type === Number) && (e in this._props && (this._props[e] = se(this._props[e])), (i ||= /* @__PURE__ */ Object.create(null))[j(e)] = !0);
			}
			this._numberProps = i, this._resolveProps(e), this.shadowRoot && this._applyStyles(r), this._connected && this._mount(e);
		}, t = this._def.__asyncLoader;
		if (t) return this._pendingResolve = t().then((t) => {
			t.configureApp = this._def.configureApp, e(this._def = t, !0);
		}), this._pendingResolve;
		e(this._def);
	}
	_mount(e) {
		this._app = this._createApp(e), this._inheritParentContext(), e.configureApp && e.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
		let t = this._instance && this._instance.exposed;
		if (t) for (let e in t) f(this, e) || Object.defineProperty(this, e, { get: () => L(t[e]) });
	}
	_resolveProps(e) {
		let { props: t } = e, n = p(t) ? t : Object.keys(t || {});
		for (let e of Object.keys(this)) e[0] !== "_" && n.includes(e) && this._setProp(e, this[e]);
		for (let e of n.map(j)) Object.defineProperty(this, e, {
			get() {
				return this._getProp(e);
			},
			set(t) {
				this._setProp(e, t, !0, !this._patching);
			}
		});
	}
	_setAttr(e) {
		if (e.startsWith("data-v-")) return;
		let t = this.hasAttribute(e), n = t ? this.getAttribute(e) : xl, r = j(e);
		t && this._numberProps && this._numberProps[r] && (n = se(n)), this._setProp(r, n, !1, !0);
	}
	_getProp(e) {
		return this._props[e];
	}
	_setProp(e, t, n = !0, r = !1) {
		if (t !== this._props[e] && (this._dirty = !0, t === xl ? delete this._props[e] : (this._props[e] = t, e === "key" && this._app && (this._app._ceVNode.key = t)), r && this._instance && this._update(), n)) {
			let n = this._ob;
			n && (this._processMutations(n.takeRecords()), n.disconnect()), t === !0 ? this.setAttribute(M(e), "") : typeof t == "string" || typeof t == "number" ? this.setAttribute(M(e), t + "") : t || this.removeAttribute(M(e)), n && n.observe(this, { attributes: !0 });
		}
	}
	_update() {
		let e = this._createVNode();
		this._app && (e.appContext = this._app._context), yu(e, this._root);
	}
	_createVNode() {
		let e = {};
		this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
		let t = q(this._def, l(e, this._props));
		return this._instance || (t.ce = (e) => {
			this._instance = e, e.ce = this, e.isCE = !0;
			let t = (e, t) => {
				this.dispatchEvent(new CustomEvent(e, E(t[0]) ? l({ detail: t }, t[0]) : { detail: t }));
			};
			e.emit = (e, ...n) => {
				t(e, n), M(e) !== e && t(M(e), n);
			}, this._setParent();
		}), t;
	}
	_applyStyles(e, t, n) {
		if (!e) return;
		if (t) {
			if (t === this._def || this._styleChildren.has(t)) return;
			this._styleChildren.add(t);
		}
		let r = this._nonce, i = this.shadowRoot, a = n ? this._getStyleAnchor(n) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(i), o = null;
		for (let s = e.length - 1; s >= 0; s--) {
			let c = document.createElement("style");
			r && c.setAttribute("nonce", r), c.textContent = e[s], i.insertBefore(c, o || a), o = c, s === 0 && (n || this._styleAnchors.set(this._def, c), t && this._styleAnchors.set(t, c));
		}
	}
	_getStyleAnchor(e) {
		if (!e) return null;
		let t = this._styleAnchors.get(e);
		return t && t.parentNode === this.shadowRoot ? t : (t && this._styleAnchors.delete(e), null);
	}
	_getRootStyleInsertionAnchor(e) {
		for (let t = 0; t < e.childNodes.length; t++) {
			let n = e.childNodes[t];
			if (!(n instanceof HTMLStyleElement)) return n;
		}
		return null;
	}
	_parseSlots() {
		let e = this._slots = {}, t;
		for (; t = this.firstChild;) {
			let n = t.nodeType === 1 && t.getAttribute("slot") || "default";
			(e[n] || (e[n] = [])).push(t), this.removeChild(t);
		}
	}
	_renderSlots() {
		let e = this._getSlots(), t = this._instance.type.__scopeId;
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = r.getAttribute("name") || "default", a = this._slots[i], o = r.parentNode;
			if (a) for (let e of a) {
				if (t && e.nodeType === 1) {
					let n = t + "-s", r = document.createTreeWalker(e, 1);
					e.setAttribute(n, "");
					let i;
					for (; i = r.nextNode();) i.setAttribute(n, "");
				}
				o.insertBefore(e, r);
			}
			else for (; r.firstChild;) o.insertBefore(r.firstChild, r);
			o.removeChild(r);
		}
	}
	_getSlots() {
		let e = [this];
		this._teleportTargets && e.push(...this._teleportTargets);
		let t = /* @__PURE__ */ new Set();
		for (let n of e) {
			let e = n.querySelectorAll("slot");
			for (let n = 0; n < e.length; n++) t.add(e[n]);
		}
		return Array.from(t);
	}
	_injectChildStyle(e, t) {
		this._applyStyles(e.styles, e, t);
	}
	_beginPatch() {
		this._patching = !0, this._dirty = !1;
	}
	_endPatch() {
		this._patching = !1, this._dirty && this._instance && this._update();
	}
	_hasShadowRoot() {
		return this._def.shadowRoot !== !1;
	}
	_removeChildStyle(e) {}
};
function El(e) {
	let t = Is();
	return t && t.ce || null;
}
function Dl() {
	let e = El();
	return e && e.shadowRoot;
}
function Ol(e = "$style") {
	{
		let t = Is();
		if (!t) return r;
		let n = t.type.__cssModules;
		return n && n[e] || r;
	}
}
var kl = /* @__PURE__ */ new WeakMap(), Al = /* @__PURE__ */ new WeakMap(), jl = /* @__PURE__ */ Symbol("_moveCb"), Ml = /* @__PURE__ */ Symbol("_enterCb"), Nl = /* @__PURE__ */ new WeakMap(), Pl = /* @__PURE__ */ ((e) => (delete e.props.mode, e))({
	name: "TransitionGroup",
	props: /* @__PURE__ */ l({}, Cc, {
		tag: String,
		moveClass: String
	}),
	setup(e, { slots: t }) {
		let n = Is(), r = Wr(), i, a, o, s, c = () => (s === void 0 && (s = i.length > 0 && Ul(i[0].el, n.vnode.el, Il(e))), s);
		return Zi(() => {
			if (Nl.delete(n), !c()) {
				i = [], o = void 0;
				return;
			}
			let t = Il(e);
			i.forEach(Fl);
			let r = o && Hl(o, n.vnode.el);
			o = void 0, i.forEach((e) => Ll(e, r));
			let a = i.filter(Rl);
			Rc(n.vnode.el), a.forEach((e) => {
				let n = e.el, r = n.style;
				Ac(n, t), r.transform = r.webkitTransform = r.transitionDuration = "";
				let i = n[jl] = (e) => {
					e && e.target !== n || (!e || e.propertyName.endsWith("transform")) && (n.removeEventListener("transitionend", i), n[jl] = null, jc(n, t));
				};
				n.addEventListener("transitionend", i);
			}), i = [];
		}), () => {
			let l = /* @__PURE__ */ on(e), u = Dc(l), d = l.tag || as;
			if (i = [], s = void 0, a) for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.el && t.el instanceof Element && !t.el[Vc] && (i.push(t), ei(t, Zr(t, u, r, n)), kl.set(t, zl(t.el)));
			}
			a = t.default ? ti(t.default()) : [];
			for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.key != null && ei(t, Zr(t, u, r, n));
			}
			return i.length && (o = Bl(n), Nl.set(n, c)), q(d, null, a);
		};
	}
});
function Fl(e) {
	let t = e.el;
	t[jl] && t[jl](), t[Ml] && t[Ml]();
}
function Il(e) {
	return e.moveClass || `${e.name || "v"}-move`;
}
function Ll(e, t) {
	Al.set(e, zl(e.el, t));
}
function Rl(e) {
	let t = kl.get(e), n = Al.get(e), r = t.left - n.left, i = t.top - n.top;
	if (r || i) {
		let t = e.el, n = t.style, a = t.getBoundingClientRect(), o = 1, s = 1;
		return t.offsetWidth && (o = a.width / t.offsetWidth), t.offsetHeight && (s = a.height / t.offsetHeight), Number.isFinite(o) && o !== 0 || (o = 1), Number.isFinite(s) && s !== 0 || (s = 1), Math.abs(o - 1) < .01 && (o = 1), Math.abs(s - 1) < .01 && (s = 1), n.transform = n.webkitTransform = `translate(${r / o}px,${i / s}px)`, n.transitionDuration = "0s", e;
	}
}
function zl(e, t) {
	let n = e.getBoundingClientRect();
	return {
		left: n.left - (t ? t.left : 0),
		top: n.top - (t ? t.top : 0)
	};
}
function Bl(e) {
	let t;
	for (let n = e.parent; n; n = n.parent) {
		let r = Nl.get(n);
		if (r) {
			let i = Vl(n.vnode.el, e.vnode.el);
			i && (t ||= []).push(l(zl(i), {
				item: i,
				willMove: r
			}));
		}
	}
	return t;
}
function Vl(e, t) {
	let n = e.nodeType === 1 ? e : e.parentNode;
	for (; t && t.parentNode !== n;) t = t.parentNode;
	if (t && t.nodeType === 1) return t;
}
function Hl(e, t) {
	let n = e.find((e) => e.willMove() && e.item.contains(t));
	return n && zl(n.item, n);
}
function Ul(e, t, n) {
	let r = e.cloneNode(), i = e[xc];
	i && i.forEach((e) => {
		e.split(/\s+/).forEach((e) => e && r.classList.remove(e));
	}), n.split(/\s+/).forEach((e) => e && r.classList.add(e)), r.style.display = "none";
	let a = t.nodeType === 1 ? t : t.parentNode;
	a.appendChild(r);
	let { hasTransform: o } = Fc(r);
	return a.removeChild(r), o;
}
var Wl = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return p(t) ? (e) => ie(t, e) : t;
};
function Gl(e) {
	e.target.composing = !0;
}
function Kl(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var ql = /* @__PURE__ */ Symbol("_assign"), Jl = /* @__PURE__ */ Symbol("_initialValue");
function Yl(e, t, n) {
	return t && (e = e.trim()), n && (e = oe(e)), e;
}
var Xl = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e.parentNode && (e.type === "text" ? e[Jl] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[Jl] = e.defaultValue.replace(/\r\n?/g, "\n"))), e[ql] = Wl(i);
		let a = r || i.props && i.props.type === "number";
		ol(e, t ? "change" : "input", (t) => {
			t.target.composing || e[ql](Yl(e.value, n, a));
		}), (n || a) && ol(e, "change", () => {
			e.value = Yl(e.value, n, a);
		}), t || (ol(e, "compositionstart", Gl), ol(e, "compositionend", Kl), ol(e, "change", Kl));
	},
	mounted(e, { value: t, modifiers: { trim: n, number: r } }) {
		let i = t ?? "", a = e[Jl];
		delete e[Jl], a !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== a ? e[ql](Yl(e.value, n, r)) : e.value = i;
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[ql] = Wl(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? oe(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Zl = {
	deep: !0,
	created(e, t, n) {
		e[ql] = Wl(n), ol(e, "change", () => {
			let t = e._modelValue, n = ru(e), r = e.checked, i = e[ql];
			if (p(t)) {
				let e = Te(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (h(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(iu(e, r));
		});
	},
	mounted: Ql,
	beforeUpdate(e, t, n) {
		e[ql] = Wl(n), Ql(e, t, n);
	}
};
function Ql(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (p(t)) i = Te(t, r.props.value) > -1;
	else if (h(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = we(t, iu(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var $l = {
	created(e, { value: t }, n) {
		e.checked = we(t, n.props.value), e[ql] = Wl(n), ol(e, "change", () => {
			e[ql](ru(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[ql] = Wl(r), t !== n && (e.checked = we(t, r.props.value));
	}
}, eu = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, ol(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? oe(ru(e)) : ru(e)), r = e.multiple, i = r ? h(e._modelValue) ? new Set(t) : t : t[0], a = e._pendingValue = [r, r ? p(i) ? t.slice() : t : i];
			try {
				e[ql](i);
			} finally {
				z(() => {
					e._pendingValue === a && (e._pendingValue = void 0);
				});
			}
		}), e[ql] = Wl(r);
	},
	mounted(e, { value: t }) {
		nu(e, t);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[ql] = Wl(n);
	},
	updated(e, { value: t }) {
		let n = e._pendingValue;
		e._pendingValue = void 0, n && n[0] === e.multiple && tu(t, n[1], n[0]) || nu(e, t);
	}
};
function tu(e, t, n) {
	if (!n || p(e)) return we(e, t);
	if (h(e)) {
		if (e.size !== t.length) return !1;
		for (let n of t) if (!e.has(n)) return !1;
		return !0;
	}
	return !1;
}
function nu(e, t) {
	let n = e.multiple, r = p(t);
	if (!n || r || h(t)) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = ru(a);
			if (n) {
				if (r) {
					let e = typeof o;
					a.selected = e === "string" || e === "number" ? t.some((e) => String(e) === String(o)) : Te(t, o) > -1;
				} else a.selected = t.has(o);
			} else if (we(ru(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function ru(e) {
	return "_value" in e ? e._value : e.value;
}
function iu(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var au = {
	created(e, t, n) {
		su(e, t, n, null, "created");
	},
	mounted(e, t, n) {
		su(e, t, n, null, "mounted");
	},
	beforeUpdate(e, t, n, r) {
		su(e, t, n, r, "beforeUpdate");
	},
	updated(e, t, n, r) {
		su(e, t, n, r, "updated");
	}
};
function ou(e, t) {
	switch (e) {
		case "SELECT": return eu;
		case "TEXTAREA": return Xl;
		default: switch (t) {
			case "checkbox": return Zl;
			case "radio": return $l;
			default: return Xl;
		}
	}
}
function su(e, t, n, r, i) {
	let a = ou(e.tagName, n.props && n.props.type)[i];
	a && a(e, t, n, r);
}
function cu() {
	Xl.getSSRProps = ({ value: e }) => ({ value: e }), $l.getSSRProps = ({ value: e }, t) => {
		if (t.props && we(t.props.value, e)) return { checked: !0 };
	}, Zl.getSSRProps = ({ value: e }, t) => {
		if (p(e)) {
			if (t.props && Te(e, t.props.value) > -1) return { checked: !0 };
		} else if (h(e)) {
			if (t.props && e.has(t.props.value)) return { checked: !0 };
		} else if (e) return { checked: !0 };
	}, au.getSSRProps = (e, t) => {
		if (typeof t.type != "string") return;
		let n = ou(t.type.toUpperCase(), t.props && t.props.type);
		if (n.getSSRProps) return n.getSSRProps(e, t);
	};
}
var lu = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], uu = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => lu.some((n) => e[`${n}Key`] && !t.includes(n))
}, du = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = uu[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, fu = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
}, pu = (e, t) => {
	let n = e._withKeys ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n) => {
		if (!("key" in n)) return;
		let r = M(n.key);
		if (t.some((e) => e === r || fu[e] === r)) return e(n);
	}));
}, mu = /* @__PURE__ */ l({ patchProp: vl }, vc), hu, gu = !1;
function _u() {
	return hu ||= Fo(mu);
}
function vu() {
	return hu = gu ? hu : Io(mu), gu = !0, hu;
}
var yu = ((...e) => {
	_u().render(...e);
}), bu = ((...e) => {
	vu().hydrate(...e);
}), xu = ((...e) => {
	let t = _u().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = wu(e);
		if (!r) return;
		let i = t._component;
		v(i) || i.render || i.template || (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, Cu(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
}), Su = ((...e) => {
	let t = vu().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let t = wu(e);
		if (t) return n(t, !0, Cu(t));
	}, t;
});
function Cu(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function wu(e) {
	return y(e) ? document.querySelector(e) : e;
}
var Tu = !1, Eu = () => {
	Tu || (Tu = !0, cu(), Wc());
}, Du = /* @__PURE__ */ t({
	BaseTransition: () => Yr,
	BaseTransitionPropsValidators: () => Kr,
	Comment: () => ss,
	DeprecationTypes: () => null,
	EffectScope: () => je,
	ErrorCodes: () => Ln,
	ErrorTypeStrings: () => sc,
	Fragment: () => as,
	KeepAlive: () => Ri,
	ReactiveEffect: () => Le,
	Static: () => cs,
	Suspense: () => Jo,
	Teleport: () => zr,
	Text: () => os,
	TrackOpTypes: () => wn,
	Transition: () => wc,
	TransitionGroup: () => Pl,
	TriggerOpTypes: () => Tn,
	VueElement: () => Tl,
	assertNumber: () => In,
	callWithAsyncErrorHandling: () => Bn,
	callWithErrorHandling: () => zn,
	camelize: () => j,
	capitalize: () => te,
	cloneVNode: () => Cs,
	compatUtils: () => null,
	compile: () => Ou,
	computed: () => Y,
	createApp: () => xu,
	createBlock: () => G,
	createCommentVNode: () => Ts,
	createElementBlock: () => hs,
	createElementVNode: () => K,
	createHydrationRenderer: () => Io,
	createPropsRestProxy: () => Pa,
	createRenderer: () => Fo,
	createSSRApp: () => Su,
	createSlots: () => fa,
	createStaticVNode: () => ws,
	createTextVNode: () => J,
	createVNode: () => q,
	customRef: () => _n,
	defineAsyncComponent: () => Fi,
	defineComponent: () => H,
	defineCustomElement: () => Sl,
	defineEmits: () => Sa,
	defineExpose: () => Ca,
	defineModel: () => Ea,
	defineOptions: () => wa,
	defineProps: () => xa,
	defineSSRCustomElement: () => Cl,
	defineSlots: () => Ta,
	devtools: () => cc,
	effect: () => Xe,
	effectScope: () => Me,
	getCurrentInstance: () => Is,
	getCurrentScope: () => Ne,
	getCurrentWatcher: () => kn,
	getTransitionRawChildren: () => ti,
	guardReactiveProps: () => Ss,
	h: () => X,
	handleError: () => Vn,
	hasInjectionContext: () => yr,
	hydrate: () => bu,
	hydrateOnIdle: () => Oi,
	hydrateOnInteraction: () => Mi,
	hydrateOnMediaQuery: () => ji,
	hydrateOnVisible: () => Ai,
	initCustomFormatter: () => nc,
	initDirectivesForSSR: () => Eu,
	inject: () => vr,
	isMemoSame: () => ic,
	isProxy: () => an,
	isReactive: () => tn,
	isReadonly: () => nn,
	isRef: () => P,
	isRuntimeOnly: () => Ys,
	isShallow: () => rn,
	isVNode: () => gs,
	markRaw: () => sn,
	mergeDefaults: () => Ma,
	mergeModels: () => Na,
	mergeProps: () => ks,
	nextTick: () => z,
	nodeOps: () => vc,
	normalizeClass: () => ge,
	normalizeProps: () => _e,
	normalizeStyle: () => de,
	onActivated: () => Bi,
	onBeforeMount: () => Ji,
	onBeforeUnmount: () => Qi,
	onBeforeUpdate: () => Xi,
	onDeactivated: () => Vi,
	onErrorCaptured: () => ra,
	onMounted: () => Yi,
	onRenderTracked: () => na,
	onRenderTriggered: () => ta,
	onScopeDispose: () => Pe,
	onServerPrefetch: () => ea,
	onUnmounted: () => $i,
	onUpdated: () => Zi,
	onWatcherCleanup: () => An,
	openBlock: () => W,
	patchProp: () => vl,
	popScopeId: () => pr,
	provide: () => _r,
	proxyRefs: () => hn,
	pushScopeId: () => fr,
	queuePostFlushCb: () => $n,
	reactive: () => Xt,
	readonly: () => Qt,
	ref: () => F,
	registerRuntimeCompiler: () => Js,
	render: () => yu,
	renderList: () => da,
	renderSlot: () => pa,
	resolveComponent: () => U,
	resolveDirective: () => ca,
	resolveDynamicComponent: () => sa,
	resolveFilter: () => null,
	resolveTransitionHooks: () => Zr,
	setBlockTracking: () => ps,
	setDevtoolsHook: () => lc,
	setTransitionHooks: () => ei,
	shallowReactive: () => Zt,
	shallowReadonly: () => $t,
	shallowRef: () => I,
	ssrContextKey: () => br,
	ssrUtils: () => uc,
	stop: () => Ze,
	toDisplayString: () => N,
	toHandlerKey: () => ne,
	toHandlers: () => ha,
	toRaw: () => on,
	toRef: () => R,
	toRefs: () => vn,
	toValue: () => pn,
	transformVNodeArgs: () => vs,
	triggerRef: () => fn,
	unref: () => L,
	useAttrs: () => ka,
	useCssModule: () => Ol,
	useCssVars: () => Kc,
	useHost: () => El,
	useId: () => ri,
	useModel: () => to,
	useSSRContext: () => xr,
	useShadowRoot: () => Dl,
	useSlots: () => Oa,
	useTemplateRef: () => ai,
	useTransitionState: () => Wr,
	vModelCheckbox: () => Zl,
	vModelDynamic: () => au,
	vModelRadio: () => $l,
	vModelSelect: () => eu,
	vModelText: () => Xl,
	vShow: () => Hc,
	version: () => ac,
	warn: () => oc,
	watch: () => V,
	watchEffect: () => Sr,
	watchPostEffect: () => Cr,
	watchSyncEffect: () => wr,
	withAsyncContext: () => Fa,
	withCtx: () => B,
	withDefaults: () => Da,
	withDirectives: () => hr,
	withKeys: () => pu,
	withMemo: () => rc,
	withModifiers: () => du,
	withScopeId: () => mr
}), Ou = () => {}, ku = typeof window < "u";
ku && ("ontouchstart" in window || window.navigator.maxTouchPoints);
var Au = ku && "matchMedia" in window && typeof window.matchMedia == "function", ju = ku && "ResizeObserver" in window, Mu = ku && "IntersectionObserver" in window;
ku && "MutationObserver" in window;
// node_modules/@vuetify/v0/dist/utilities/instance.mjs
var Nu = "currentInstance";
function Pu() {
	let e = Du;
	return Nu in e ? e[Nu] : Is();
}
/* #__NO_SIDE_EFFECTS__ */
function Fu() {
	return !/* @__PURE__ */ Uu(Pu());
}
// node_modules/@vuetify/v0/dist/utilities/helpers.mjs
/* #__NO_SIDE_EFFECTS__ */
function Iu(e) {
	return typeof e == "function";
}
/* #__NO_SIDE_EFFECTS__ */
function Lu(e) {
	return typeof e == "string";
}
/* #__NO_SIDE_EFFECTS__ */
function Ru(e) {
	return typeof e == "number";
}
/* #__NO_SIDE_EFFECTS__ */
function zu(e) {
	return typeof e == "boolean";
}
/* #__NO_SIDE_EFFECTS__ */
function Bu(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
/* #__NO_SIDE_EFFECTS__ */
function Vu(e) {
	return Array.isArray(e);
}
/* #__NO_SIDE_EFFECTS__ */
function Hu(e) {
	return typeof Element < "u" && e instanceof Element;
}
/* #__NO_SIDE_EFFECTS__ */
function Uu(e) {
	return e === null;
}
/* #__NO_SIDE_EFFECTS__ */
function Wu(e) {
	return e == null;
}
/* #__NO_SIDE_EFFECTS__ */
function Gu(e) {
	return e === void 0;
}
/* #__NO_SIDE_EFFECTS__ */
function Ku(e) {
	return typeof e == "symbol";
}
/* #__NO_SIDE_EFFECTS__ */
function qu(e) {
	return /* @__PURE__ */ Ru(e) && Number.isNaN(e);
}
var Ju = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
function Yu(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
/* #__NO_SIDE_EFFECTS__ */
function Xu(e, ...t) {
	let n = {};
	for (let t in e) Object.hasOwn(e, t) && (n[t] = e[t]);
	for (let e of t) if (/* @__PURE__ */ Bu(e)) for (let t in e) {
		if (Ju.has(t) || !Object.hasOwn(e, t)) continue;
		let r = e[t];
		if (/* @__PURE__ */ Gu(r)) continue;
		let i = n[t];
		n[t] = Yu(r) && Yu(i) ? /* @__PURE__ */ Xu(i, r) : r;
	}
	return n;
}
var Zu = 0;
/* #__NO_SIDE_EFFECTS__ */
function Qu() {
	return /* @__PURE__ */ Fu() ? ri() : `v0-${Zu++}`;
}
/* #__NO_SIDE_EFFECTS__ */
function $u(e, t = 0, n = 1) {
	return Number.isFinite(e) ? Math.max(t, Math.min(n, e)) : t;
}
/* #__NO_SIDE_EFFECTS__ */
function ed(e, t = 0) {
	return Array.from({ length: e }, (e, n) => t + n);
}
/* #__NO_SIDE_EFFECTS__ */
function td(e, t = 0) {
	if (!/* @__PURE__ */ Lu(e)) return t;
	let n = Number.parseFloat(e);
	return /* @__PURE__ */ qu(n) ? t : n;
}
/* #__NO_SIDE_EFFECTS__ */
function nd(e, t) {
	let n = [];
	for (let r of e) {
		let e = t(r);
		/* @__PURE__ */ Gu(e) || n.push(e);
	}
	return n;
}
// node_modules/@vuetify/v0/dist/utilities/errors.mjs
var rd = class extends Error {
	name = "V0Error";
	code;
	key;
	plugin;
	palette;
	seed;
	variant;
	adapter;
	prefix;
	constructor(e, t) {
		let { cause: n, ...r } = t;
		super(e, /* @__PURE__ */ Gu(n) ? void 0 : { cause: n }), this.code = t.code;
		for (let [e, t] of Object.entries(r)) Ju.has(e) || (this[e] = t);
	}
};
// node_modules/@vuetify/v0/dist/composables/createContext/index.mjs
function id(e, t) {
	let n = vr(e, t);
	if (/* @__PURE__ */ Gu(n)) throw new rd(`Context "${String(e)}" not found. Ensure it's provided by an ancestor.`, {
		code: "V0_CONTEXT_MISSING",
		key: e
	});
	return n;
}
function ad(e, t, n) {
	return n ? n.provide(e, t) : _r(e, t), t;
}
function od(e, t) {
	if (/* @__PURE__ */ Lu(e) || /* @__PURE__ */ Ku(e)) {
		let n = e;
		function r(e, t) {
			return ad(n, e, t);
		}
		function i() {
			return id(n, t);
		}
		return [i, r];
	}
	let n = /* @__PURE__ */ Bu(e) ? e.suffix : void 0;
	function r(e, t, r) {
		return ad(n ? `${e}:${n}` : e, t, r);
	}
	function i(e, t) {
		return id(n ? `${e}:${n}` : e, t);
	}
	return [i, r];
}
// node_modules/@vuetify/v0/dist/composables/createTrinity/index.mjs
function sd(e, t, n) {
	if (/* @__PURE__ */ Lu(e)) {
		let [n, r] = od(e), i = t;
		return [
			n,
			(e = i, t) => r(e, t),
			i
		];
	}
	let r = t, i = n;
	return [
		e,
		(e = i, t) => r(e, t),
		i
	];
}
// node_modules/@vuetify/v0/dist/composables/createPlugin/index.mjs
var cd = Symbol.for("v0:installed-plugins");
function ld(e) {
	let t = e._context;
	return t[cd] ??= /* @__PURE__ */ new Map();
}
function ud(e, t, n) {
	let r = ld(e).get(t);
	r && (r.context = n);
}
function dd(e) {
	return { install(t) {
		t.runWithContext(() => {
			let n = ld(t);
			n.has(e.namespace) || (n.set(e.namespace, {
				namespace: e.namespace,
				devtools: e.devtools === !0,
				inspect: e.inspect
			}), e.provide(t), e.setup?.(t), e.devtools);
		});
	} };
}
function fd(e) {
	return e.startsWith("v0:") ? e.slice(3) : e;
}
function pd() {
	return id("v0:storage");
}
function md(e, t, n) {
	function r(n = {}) {
		let { namespace: r = e, persist: i, devtools: a, ...o } = n;
		return sd(r, t(o));
	}
	function i(t = {}) {
		let { namespace: i = e, persist: a, devtools: o, ...s } = t, c = o ?? n?.devtools ?? !1, l = n?.inspect, u;
		return dd({
			namespace: i,
			devtools: c,
			inspect: l ? (e) => l(e) : void 0,
			provide: (e) => {
				let [, t, o] = r({
					...s,
					namespace: i
				});
				if (u = o, t(u, e), ud(e, i, u), a && n?.restore) {
					let e = pd(), t = fd(i), r = e.get(t);
					/* @__PURE__ */ Wu(r.value) || n.restore(u, r.value);
				}
			},
			setup: n?.setup || a ? (e) => {
				let t = u;
				if (n?.setup?.(t, e, s), a && n?.persist) {
					let r = pd(), a = fd(i), o = r.get(a), s = V(() => n.persist(t), (e) => {
						o.value = e;
					});
					e.onUnmount(s);
				}
			} : void 0
		});
	}
	function a(t = e) {
		if (n?.fallback) {
			if (!yr()) return n.fallback(t);
			let e = vr(t, void 0);
			return /* @__PURE__ */ Gu(e) ? n.fallback(t) : e;
		}
		return id(t);
	}
	return [
		r,
		i,
		a
	];
}
// node_modules/@vuetify/v0/dist/composables/useLogger/adapters/adapter.mjs
var hd = class {}, gd = class extends hd {
	prefix;
	colors;
	timestamps;
	constructor(e = {}) {
		super(), this.prefix = e.prefix || "v0", this.colors = e.colors !== !1, this.timestamps = e.timestamps !== !1;
	}
	debug(e, ...t) {
		this.log("debug", "debug", e, ...t);
	}
	info(e, ...t) {
		this.log("info", "info", e, ...t);
	}
	warn(e, ...t) {
		this.log("warn", "warn", e, ...t);
	}
	error(e, ...t) {
		this.log("error", "error", e, ...t);
	}
	trace(e, ...t) {
		this.log("trace", "trace", e, ...t);
	}
	fatal(e, ...t) {
		this.log("fatal", "error", e, ...t);
	}
	format(e, t, ...n) {
		return [[
			this.timestamps ? this.timestamp() : "",
			`[${this.prefix} ${e.toLowerCase()}]`,
			t
		].filter(Boolean).join(" "), ...n];
	}
	timestamp() {
		/* v8 ignore next -- defensive fallback, toTimeString always returns valid format */
		return ku ? (/* @__PURE__ */ new Date()).toTimeString().split(" ")[0] ?? "" : (/* @__PURE__ */ new Date()).toISOString();
	}
	style(e) {
		/* v8 ignore next -- LogLevel union is exhaustive */
		return !this.colors || !ku ? "" : {
			trace: "color: #64748b",
			debug: "color: #3b82f6",
			info: "color: #10b981",
			warn: "color: #f59e0b",
			error: "color: #ef4444",
			fatal: "color: #dc2626; font-weight: bold",
			silent: ""
		}[e] || "";
	}
	log(e, t, n, ...r) {
		let [i, ...a] = this.format(e, n, ...r), o = this.style(e);
		ku && o && /* @__PURE__ */ Iu(console[t]) ? console[t](`%c${i}`, o, ...a) : /* @__PURE__ */ Iu(console[t]) && console[t](i, ...a);
	}
};
// node_modules/@vuetify/v0/dist/composables/useLogger/index.mjs
function _d(e = {}) {
	let { adapter: t = new gd({ prefix: e.prefix }), level: n = "info", enabled: r = !1 } = e, i = n, a = r;
	function o(e) {
		return {
			trace: 0,
			debug: 1,
			info: 2,
			warn: 3,
			error: 4,
			fatal: 5,
			silent: 6
		}[e] ?? 2;
	}
	function s(e) {
		return a ? o(e) >= o(i) : !1;
	}
	function c(e) {
		return e;
	}
	function l(e, ...n) {
		s("debug") && t.debug(c(e), ...n);
	}
	function u(e, ...n) {
		s("info") && t.info(c(e), ...n);
	}
	function d(e, ...n) {
		s("warn") && t.warn(c(e), ...n);
	}
	function f(e, ...n) {
		s("error") && t.error(c(e), ...n);
	}
	function p(e, ...n) {
		s("trace") && t.trace?.(c(e), ...n);
	}
	function m(e, ...n) {
		s("fatal") && t.fatal?.(c(e), ...n);
	}
	function h(e) {
		i = e;
	}
	function g() {
		return i;
	}
	function _() {
		return a;
	}
	function v() {
		a = !0;
	}
	function y() {
		a = !1;
	}
	return {
		debug: l,
		info: u,
		warn: d,
		error: f,
		trace: p,
		fatal: m,
		level: h,
		current: g,
		enabled: _,
		enable: v,
		disable: y,
		adapter: t
	};
}
var vd = "v0:logger";
function yd(e = vd) {
	function t(t, n) {
		return `[${e} ${n}] ${t}`;
	}
	return {
		debug: (e, ...n) => console.debug(t(e, "debug"), ...n),
		info: (e, ...n) => console.info(t(e, "info"), ...n),
		warn: (e, ...n) => console.warn(t(e, "warn"), ...n),
		error: (e, ...n) => console.error(t(e, "error"), ...n),
		trace: (e, ...n) => console.trace(t(e, "trace"), ...n),
		fatal: (e, ...n) => console.error(t(e, "fatal"), ...n),
		level: () => {},
		current: () => "info",
		enabled: () => !0,
		enable: () => {},
		disable: () => {},
		adapter: new gd({ prefix: e })
	};
}
var [bd, xd, Sd] = /* @__PURE__ */ md(vd, (e) => _d(e), {
	fallback: (e) => yd(e),
	inspect: (e) => ({
		level: e.current(),
		enabled: e.enabled(),
		adapter: e.adapter.constructor.name
	}),
	setup: (e, t, n) => {}
});
function Cd(e, t) {
	let n = `[${t}]`;
	function r(e) {
		return (t, ...r) => e(`${n} ${t}`, ...r);
	}
	return {
		...e,
		debug: r(e.debug),
		info: r(e.info),
		warn: r(e.warn),
		error: r(e.error),
		trace: r(e.trace),
		fatal: r(e.fatal)
	};
}
function wd(e) {
	let t = Sd();
	return /* @__PURE__ */ Gu(e) || !e.trim() ? t : Cd(t, e);
}
// node_modules/@vuetify/v0/dist/composables/createRegistry/index.mjs
function Td(e) {
	let t = wd(), n = e?.events ?? !1, r = e?.reactive ?? !1, i = r ? /* @__PURE__ */ Zt(/* @__PURE__ */ new Map()) : /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new WeakSet(), u = [], d = /* @__PURE__ */ I(0), f = 0, p = !1, m = Infinity, h = -Infinity, g = !1, _ = !1, v = [];
	function y(e, t) {
		let n = c.get(e);
		if (n) for (let e of n) e(t);
	}
	function b(e, t = void 0) {
		n && (g ? v.push({
			event: e,
			data: t
		}) : y(e, t));
	}
	function x(e, r) {
		n ? (c.has(e) || c.set(e, /* @__PURE__ */ new Set()), c.get(e).add(r)) : t.warn("Events are disabled. Initialize with `createRegistry({ events: true })` to enable.");
	}
	function S(e, r) {
		n ? c.get(e)?.delete(r) : t.warn("Events are disabled. Initialize with `createRegistry({ events: true })` to enable.");
	}
	function C() {
		c.clear(), te();
	}
	function w(e) {
		return i.get(e);
	}
	function T(e, t = {}, n) {
		p && ie();
		let r = w(e);
		if (!r) return ae({
			...t,
			id: e
		});
		let a = Object.hasOwn(t, "value"), o = r.value, c = r.valueIsIndex;
		return a && (/* @__PURE__ */ Gu(t.value) ? (o = r.index, c = !0) : (o = t.value, c = !1), c !== r.valueIsIndex && (c ? f++ : f--), Object.is(o, r.value) || (A(r.value, e), k(o, e))), Object.assign(r, t, {
			id: e,
			index: r.index,
			value: o,
			valueIsIndex: c
		}), i.set(e, r), s.clear(), b("update:ticket", r), n && b(n, r), r;
	}
	function E(e) {
		p && ie();
		let t = a.get(e);
		return t ? t.slice() : void 0;
	}
	function D(e) {
		return p && ie(), o.get(e);
	}
	function O(e) {
		return i.has(e);
	}
	function k(e, t) {
		let n = a.get(e);
		n ? n.includes(t) || n.push(t) : a.set(e, [t]);
	}
	function A(e, t) {
		let n = a.get(e);
		if (!n) return;
		let r = n.filter((e) => e !== t);
		r.length === 0 ? a.delete(e) : a.set(e, r);
	}
	function j() {
		r && d.value;
		let e = s.get("keys");
		if (!/* @__PURE__ */ Gu(e)) return e;
		let t = u.map((e) => e.id);
		return s.set("keys", t), t;
	}
	function ee() {
		r && d.value;
		let e = s.get("values");
		if (!/* @__PURE__ */ Gu(e)) return e;
		let t = u.slice();
		return s.set("values", t), t;
	}
	function M() {
		r && d.value;
		let e = s.get("entries");
		if (!/* @__PURE__ */ Gu(e)) return e;
		let t = u.map((e) => [e.id, e]);
		return s.set("entries", t), t;
	}
	function te() {
		u.length = 0, i.clear(), a.clear(), o.clear(), ne(), f = 0, p = !1, m = Infinity, h = -Infinity, b("clear:registry");
	}
	function ne() {
		s.clear(), g ? _ = !0 : d.value++;
	}
	function re(e) {
		if (g) return e();
		g = !0, _ = !1, v = [];
		try {
			return e();
		} finally {
			g = !1;
			let e = v;
			v = [], s.clear();
			try {
				for (let { event: t, data: n } of e) y(t, n);
			} finally {
				_ && d.value++;
			}
		}
	}
	function ie() {
		let e = u.length, t = m === Infinity ? 0 : m, n = h === -Infinity ? e - 1 : Math.min(h, e - 1), r = t === 0 && n === e - 1;
		if (ne(), r) a.clear(), o.clear();
		else for (let e = t; e <= n; e++) {
			let t = u[e];
			o.delete(t.index), t.valueIsIndex && A(t.value, t.id);
		}
		for (let e = t; e <= n; e++) {
			let t = u[e];
			t.valueIsIndex ? (t.value = e, k(t.value, t.id)) : r && k(t.value, t.id), t.index = e, o.set(e, t.id);
		}
		p = !1, m = Infinity, h = -Infinity, b("reindex:registry");
	}
	function ae(e = {}) {
		p && ie();
		let n = i.size, a = /* @__PURE__ */ Wu(e.id), s = e.id ?? /* @__PURE__ */ Qu();
		if (O(s)) return t.warn(`Ticket "${s}" already exists. Use \`upsert()\` to update or check \`has()\` before registering.`), w(s);
		let c = /* @__PURE__ */ Gu(e.value), d = n, m = c ? d : e.value, h = e.valueIsIndex ?? c;
		h && f++;
		let g = {
			unregister: () => oe(s),
			...e,
			id: s,
			index: d,
			value: m,
			valueIsIndex: h
		}, _ = r ? /* @__PURE__ */ Zt(g) : g;
		return a && l.add(_), i.set(_.id, _), u.push(_), o.set(_.index, _.id), k(_.value, _.id), ne(), b("register:ticket", _), _;
	}
	function oe(e) {
		let t = i.get(e);
		if (!t) return;
		t.valueIsIndex && f--;
		let n = t.index;
		u[n] !== t && (n = u.indexOf(t)), n !== -1 && u.splice(n, 1), i.delete(t.id), o.delete(t.index), A(t.value, t.id);
		let r = f > 0 && t.index < i.size;
		r || ne(), m = Math.min(m, t.index), r ? ie() : p = !0, b("unregister:ticket", t);
	}
	function se(e) {
		return re(() => e.map((e) => ae(e)));
	}
	function ce(e) {
		let t = { ...e };
		return delete t.index, delete t.valueIsIndex, delete t.unregister, l.has(e) && delete t.id, e.valueIsIndex && delete t.value, t;
	}
	function le(e) {
		let t = [], n = /* @__PURE__ */ new Set();
		for (let r of e) {
			if (n.has(r)) continue;
			let e = i.get(r);
			e && (t.push(e), n.add(r));
		}
		return t.length === 0 ? [] : (re(() => {
			let e = 0;
			for (let t of u) n.has(t.id) || (u[e++] = t);
			u.length = e, ne();
			for (let e of t) e.valueIsIndex && f--, m = Math.min(m, e.index), i.delete(e.id), o.delete(e.index), A(e.value, e.id);
			for (let e of t) b("unregister:ticket", e);
			f > 0 && m < i.size ? ie() : p = !0;
		}), t.map((e) => ce(e)));
	}
	function ue(e, t) {
		p && ie();
		let n = i.get(e);
		if (!n) return;
		let r = i.size, a = /* @__PURE__ */ $u(t, 0, r - 1), o = n.index;
		return o === a ? n : re(() => (u.splice(o, 1), u.splice(a, 0, n), m = Math.min(o, a), h = Math.max(o, a), ie(), b("update:ticket", n), n));
	}
	function de(e) {
		if (p && ie(), e.length !== i.size) return;
		let t = /* @__PURE__ */ new Set(), n = [];
		for (let r of e) {
			if (t.has(r)) return;
			let e = i.get(r);
			if (!e) return;
			t.add(r), n.push(e);
		}
		re(() => {
			for (let [e, t] of n.entries()) u[e] = t;
			m = 0, h = -Infinity, ie();
		});
	}
	function fe(e = "first", t, n) {
		if (i.size === 0) return;
		p && ie();
		let r = u.length;
		if (!n && /* @__PURE__ */ Gu(t)) return e === "first" ? u[0] : u.at(-1);
		let a = /* @__PURE__ */ Gu(t) ? void 0 : /* @__PURE__ */ $u(t, 0, r - 1);
		if (e === "last") {
			let e = /* @__PURE__ */ Gu(a) ? r - 1 : a;
			for (let t = e; t >= 0; t--) {
				let e = u[t];
				if (!n || n(e)) return e;
			}
		} else {
			let e = /* @__PURE__ */ Gu(a) ? 0 : a;
			for (let t = e; t < r; t++) {
				let e = u[t];
				if (!n || n(e)) return e;
			}
		}
	}
	return {
		collection: i,
		emit: b,
		on: x,
		off: S,
		dispose: C,
		has: O,
		keys: j,
		clear: te,
		browse: E,
		entries: M,
		values: ee,
		lookup: D,
		get: w,
		upsert: T,
		register: ae,
		unregister: oe,
		reindex: ie,
		move: ue,
		reorder: de,
		seek: fe,
		batch: re,
		onboard: se,
		offboard: le,
		get size() {
			return i.size;
		}
	};
}
// node_modules/@vuetify/v0/dist/composables/createModel/index.mjs
function Ed(e = {}) {
	let { disabled: t = !1, enroll: n = !0, multiple: r = !1, ...i } = e, a = Td(i), o = /* @__PURE__ */ Zt(/* @__PURE__ */ new Set()), s = Y(() => new Set(/* @__PURE__ */ nd(o, a.get))), c = Y(() => {
		let e = /* @__PURE__ */ new Set();
		for (let t of s.value) e.add(pn(t.value));
		return e;
	});
	function l(e) {
		if (pn(t)) return;
		let n = a.get(e);
		n && !pn(n.disabled) && (pn(r) || o.clear(), o.add(e));
	}
	function u(e) {
		if (pn(t)) return;
		let n = a.get(e);
		n && !pn(n.disabled) && o.delete(e);
	}
	function d(e) {
		pn(t) || (f(e) ? u(e) : l(e));
	}
	function f(e) {
		return o.has(e);
	}
	function p(e, t) {
		let n = e[0], i = !1;
		for (let e of o) {
			let t = a.get(e);
			t && /* @__PURE__ */ P(t.value) && (/* @__PURE__ */ Gu(n) || (t.value.value = n), i = !0);
		}
		if (i || (pn(r) || o.clear(), /* @__PURE__ */ Gu(n))) return;
		let s = a.browse(/* @__PURE__ */ on(n))?.values().next().value;
		/* @__PURE__ */ Gu(s) || l(s);
	}
	function m(e = {}) {
		let r = e.id ?? /* @__PURE__ */ Qu(), i = {
			disabled: !1,
			unregister: () => h(r),
			...e,
			isSelected: /* @__PURE__ */ R(() => f(r)),
			id: r
		}, o = a.register(i);
		return pn(n) && !pn(t) && !pn(o.disabled) && l(r), o;
	}
	function h(e) {
		o.delete(e), a.unregister(e);
	}
	function g(e) {
		return a.batch(() => e.map((e) => m(e)));
	}
	function _(e) {
		for (let t of e) o.delete(t);
		return a.offboard(e);
	}
	function v() {
		o.clear();
	}
	function y() {
		v(), a.clear();
	}
	function b() {
		v(), a.dispose();
	}
	return {
		...a,
		disabled: t,
		selectedIds: o,
		selectedItems: s,
		selectedValues: c,
		register: m,
		onboard: g,
		unregister: h,
		offboard: _,
		clear: y,
		dispose: b,
		reset: v,
		select: l,
		unselect: u,
		toggle: d,
		selected: f,
		apply: p,
		get size() {
			return a.size;
		}
	};
}
// node_modules/@vuetify/v0/dist/composables/createSelection/index.mjs
function Dd(e = {}) {
	let { enroll: t = !1, mandatory: n = !1, multiple: r = !1, ...i } = e, a = Ed({
		...i,
		multiple: r,
		enroll: !1
	});
	function o(e = "first", t) {
		return a.seek(e, t, (e) => !pn(e.disabled));
	}
	function s() {
		if (!pn(n) || a.size === 0 || a.selectedIds.size > 0) return;
		let e = o("first");
		e && a.select(e.id);
	}
	function c(e) {
		pn(a.disabled) || pn(n) && a.selectedIds.size === 1 || a.selectedIds.delete(e);
	}
	function l(e) {
		if (pn(a.disabled)) return;
		let t = a.get(e);
		t && !pn(t.disabled) && c(e);
	}
	function u(e) {
		pn(a.disabled) || (a.selectedIds.has(e) ? l(e) : a.select(e));
	}
	function d(e, t) {
		let i = t?.multiple ?? pn(r), o = new Set(a.selectedIds), s = /* @__PURE__ */ new Set();
		if (i) {
			for (let t of e) {
				let e = a.browse(/* @__PURE__ */ on(t));
				if (!/* @__PURE__ */ Gu(e)) for (let t of e) {
					let e = a.get(t);
					e && !pn(e.disabled) && s.add(t);
				}
			}
			if (pn(n) && s.size === 0) return;
			for (let e of o) s.has(e) || a.selectedIds.delete(e);
			for (let e of s) a.selectedIds.add(e);
		} else {
			for (let t of e) {
				let e = a.browse(/* @__PURE__ */ on(t));
				if (!/* @__PURE__ */ Gu(e)) for (let t of e) s.add(t);
			}
			let t = s.values().next().value, n = o.values().next().value;
			/* @__PURE__ */ Gu(n) || c(n), /* @__PURE__ */ Gu(t) || a.select(t);
		}
	}
	function f(e = {}) {
		let r = e.id ?? /* @__PURE__ */ Qu(), i = {
			select: () => a.select(r),
			unselect: () => l(r),
			toggle: () => u(r),
			...e,
			id: r
		}, o = a.register(i);
		return pn(t) && !pn(a.disabled) && !pn(o.disabled) && a.select(o.id), pn(n) === "force" && s(), o;
	}
	function p(e) {
		let t = a.batch(() => e.map((e) => f(e)));
		return pn(n) === "force" && s(), t;
	}
	return {
		...a,
		multiple: r,
		register: f,
		onboard: p,
		unselect: l,
		toggle: u,
		apply: d,
		mandate: s,
		seek: o,
		get size() {
			return a.size;
		}
	};
}
// node_modules/@vuetify/v0/dist/composables/createSingle/index.mjs
function Od(e = {}) {
	let { mandatory: t = !1, ...n } = e, r = Dd({
		...n,
		mandatory: t,
		multiple: !1
	}), i = /* @__PURE__ */ R(() => r.selectedIds.values().next().value), a = /* @__PURE__ */ R(() => r.selectedItems.value.values().next().value), o = /* @__PURE__ */ R(() => a.value?.index ?? -1), s = /* @__PURE__ */ R(() => a.value?.value);
	return {
		...r,
		selectedId: i,
		selectedItem: a,
		selectedIndex: o,
		selectedValue: s,
		get size() {
			return r.size;
		}
	};
}
// node_modules/@vuetify/v0/dist/composables/createTokens/index.mjs
function kd(e = {}, t = {}) {
	let n = wd(), r = Td({
		...t,
		events: !0
	}), i = /* @__PURE__ */ new Map();
	function a() {
		i.clear();
	}
	r.on("register:ticket", a), r.on("unregister:ticket", a), r.on("update:ticket", a), r.on("reindex:registry", a), r.on("clear:registry", a), r.onboard(/* @__PURE__ */ Ad(e, t.prefix, !!t.flat));
	function o(e) {
		return /* @__PURE__ */ Lu(e) && e.length > 2 && e[0] === "{" && e.at(-1) === "}";
	}
	function s(e) {
		return /* @__PURE__ */ Bu(e) && "$value" in e;
	}
	function c(e, t = /* @__PURE__ */ new Set()) {
		let a = /* @__PURE__ */ Lu(e) ? e : JSON.stringify(e);
		if (i.has(a)) return i.get(a);
		let l = s(e) ? e.$value : e, u = /* @__PURE__ */ Lu(l) && o(l);
		if (s(e) && !u) return i.set(a, l), l;
		let d = u ? l.slice(1, -1) : String(l);
		if (t.has(d)) {
			n.warn(`Circular alias detected for "${d}"`), i.set(a, void 0);
			return;
		}
		t.add(d);
		let f = r.get(d), p = [];
		if (!f && d.includes(".")) {
			let e = d.split(".");
			for (let t = e.length - 1; t > 0; t--) {
				let n = e.slice(0, t).join("."), i = e.slice(t), a = r.get(n);
				if (!/* @__PURE__ */ Gu(a?.value)) {
					f = a, p = i;
					break;
				}
			}
		}
		if (/* @__PURE__ */ Gu(f?.value)) {
			u && n.warn(`Alias not found for "${String(l)}"`), i.set(a, void 0);
			return;
		}
		let m = f.value;
		if (p.length > 0) {
			s(m) && (m = m.$value);
			for (let e of p) {
				if (!/* @__PURE__ */ Bu(m) || Ju.has(e) || !Object.prototype.hasOwnProperty.call(m, e)) {
					m = void 0;
					break;
				}
				m = m[e], s(m) && (m = m.$value);
			}
			if (/* @__PURE__ */ Gu(m)) {
				n.warn(`Path not found inside "${d}": ${p.join(".")}`), i.set(a, void 0);
				return;
			}
		} else s(m) && (m = m.$value);
		let h = /* @__PURE__ */ Lu(m) && o(m) ? c(m, t) : m;
		return i.set(a, h), h;
	}
	return {
		...r,
		resolve: c,
		isAlias: o,
		get size() {
			return r.size;
		}
	};
}
/* #__NO_SIDE_EFFECTS__ */
function Ad(e, t = "", n = !1) {
	let r = [], i = [{
		tokens: e,
		prefix: t,
		flat: n
	}];
	for (; i.length > 0;) {
		let { tokens: e, prefix: t, flat: n } = i.pop(), a = {};
		for (let t in e) Object.hasOwn(e, t) && t.startsWith("$") && (a[t] = e[t]);
		Object.keys(a).length > 0 && t && r.push({
			id: t,
			value: a
		});
		for (let a in e) {
			if (!Object.hasOwn(e, a) || Ju.has(a) || a.startsWith("$")) continue;
			let o = e[a], s = t ? `${t}.${a}` : a;
			if (!/* @__PURE__ */ Bu(o)) r.push({
				id: s,
				value: o
			});
			else if ("$value" in o) {
				r.push({
					id: s,
					value: o
				});
				let e = o.$value;
				if (/* @__PURE__ */ Bu(e) && !n) for (let t in e) {
					if (!Object.hasOwn(e, t) || Ju.has(t) || t.startsWith("$")) continue;
					let a = e[t], o = `${s}.${t}`;
					/* @__PURE__ */ Bu(a) ? "$value" in a ? r.push({
						id: o,
						value: a
					}) : i.push({
						tokens: a,
						prefix: o,
						flat: n
					}) : r.push({
						id: o,
						value: a
					});
				}
			} else n ? r.push({
				id: s,
				value: o
			}) : i.push({
				tokens: o,
				prefix: s,
				flat: n
			});
		}
	}
	return r;
}
// node_modules/@vuetify/v0/dist/composables/useLocale/adapters/adapter.mjs
var jd = class {}, Md = class extends jd {
	context;
	constructor(e) {
		super(), this.context = e;
	}
	t(e, ...t) {
		let n = this.lookup(e, t);
		return /* @__PURE__ */ Gu(n) ? this.interpolate(e, t) : n;
	}
	ti(e, ...t) {
		return this.lookup(e, t);
	}
	n(e) {
		let t = this.context.selectedId.value;
		return !ku || !t ? e.toString() : new Intl.NumberFormat(String(t)).format(e);
	}
	lookup(e, t) {
		let n = this.context.selectedId.value;
		if (!n) return;
		let r = this.context.tokens.get(`${n}.${e}`)?.value;
		if (/* @__PURE__ */ Lu(r)) return this.interpolate(this.resolve(n, r), t);
		if (this.context.fallbackLocale) {
			let n = this.context.tokens.get(`${this.context.fallbackLocale}.${e}`)?.value;
			if (/* @__PURE__ */ Lu(n)) return this.interpolate(this.resolve(this.context.fallbackLocale, n), t);
		}
	}
	resolve(e, t, n = /* @__PURE__ */ new Set()) {
		return t.replace(/{([a-zA-Z0-9.\-_]+)}/g, (t, r) => {
			let [i, ...a] = r.split("."), o = this.context.has(i) ? i : e, s = `${o}.${this.context.has(i) ? a.join(".") : r}`;
			if (n.has(s)) return t;
			let c = this.context.tokens.get(s)?.value;
			return /* @__PURE__ */ Lu(c) ? this.resolve(o, c, new Set(n).add(s)) : t;
		});
	}
	interpolate(e, t) {
		let n = e, r = t;
		if (r.length > 0 && /* @__PURE__ */ Bu(r[0])) {
			let e = r[0];
			n = n.replace(/{([a-zA-Z][a-zA-Z0-9_]*)}/g, (t, n) => /* @__PURE__ */ Gu(e[n]) ? t : String(e[n])), r = r.slice(1);
		}
		return n = n.replace(/\{(\d+)\}/g, (e, t) => {
			let n = Number.parseInt(t, 10);
			return /* @__PURE__ */ Gu(r[n]) ? e : String(r[n]);
		}), n;
	}
};
// node_modules/@vuetify/v0/dist/composables/useLocale/index.mjs
function Nd(e = {}) {
	let { adapter: t, messages: n = {}, fallback: r, ...i } = e, a = kd(n), o = Od({
		...i,
		reactive: !0
	});
	for (let e in n) o.register({ id: e }), e === i.default && !o.selectedId.value && o.select(e);
	let s = t ?? new Md({
		tokens: a,
		selectedId: o.selectedId,
		fallbackLocale: r,
		has: (e) => o.has(e)
	});
	function c(e, ...t) {
		return s.t(e, ...t);
	}
	function l(e, ...t) {
		return s.ti(e, ...t);
	}
	function u(e) {
		return s.n(e);
	}
	function d(e = {}) {
		let { messages: t, ...n } = e;
		return t && n.id && !o.has(n.id) && a.onboard(/* @__PURE__ */ Ad({ [n.id]: t })), o.register(n);
	}
	return {
		...o,
		t: c,
		ti: l,
		n: u,
		register: d,
		adapter: s,
		get size() {
			return o.size;
		}
	};
}
// node_modules/@vuetify/v0/dist/composables/toArray/index.mjs
/* #__NO_SIDE_EFFECTS__ */
function Pd(e) {
	return /* @__PURE__ */ Wu(e) ? [] : /* @__PURE__ */ Vu(e) ? e : [e];
}
// node_modules/@vuetify/v0/dist/composables/useEventListener/index.mjs
function Fd(e, t, n, r) {
	let i = [];
	function a() {
		for (let e of i) e();
		i.length = 0;
	}
	function o(e, t, n, r) {
		return e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r);
	}
	let s = V(() => [
		pn(e),
		pn(t),
		L(n),
		pn(r)
	], ([e, t, n, r]) => {
		if (a(), !e) return;
		let s = /* @__PURE__ */ Pd(t), c = /* @__PURE__ */ Pd(n);
		for (let t of s) for (let n of c) i.push(o(e, t, n, r));
	}, {
		immediate: !0,
		flush: "post"
	});
	function c() {
		s(), a();
	}
	return Pe(c, !0), c;
}
function Id(e, t, n) {
	return ku ? Fd(window, e, t, n) : () => {};
}
// node_modules/@vuetify/v0/dist/composables/toElement/index.mjs
/* #__NO_SIDE_EFFECTS__ */
function Ld(e) {
	if (!e) return;
	if (/* @__PURE__ */ Hu(e)) return e;
	let t = /* @__PURE__ */ Iu(e) ? e() : /* @__PURE__ */ Bu(e) && "value" in e ? e.value : e;
	if (t) {
		if (/* @__PURE__ */ Hu(t)) return t;
		if (/* @__PURE__ */ Bu(t) && "$el" in t) return t.$el;
	}
}
// node_modules/@vuetify/v0/dist/composables/useHydration/index.mjs
function Rd() {
	let e = /* @__PURE__ */ I(!1), t = /* @__PURE__ */ I(!1);
	function n() {
		e.value = !0;
	}
	function r() {
		t.value = !0;
	}
	return {
		isHydrated: /* @__PURE__ */ $t(e),
		isSettled: /* @__PURE__ */ $t(t),
		hydrate: n,
		settle: r
	};
}
function zd() {
	return {
		isHydrated: /* @__PURE__ */ $t(/* @__PURE__ */ I(!0)),
		isSettled: /* @__PURE__ */ $t(/* @__PURE__ */ I(!0)),
		hydrate: () => {},
		settle: () => {}
	};
}
var [Bd, Vd, Hd] = /* @__PURE__ */ md("v0:hydration", () => Rd(), {
	fallback: () => zd(),
	setup: (e, t) => {
		let { mount: n } = t;
		t.mount = (...r) => {
			let i = n(...r);
			return z().then(() => {
				e.hydrate(), z().then(() => e.settle());
			}), t.mount = n, i;
		};
	}
});
// node_modules/@vuetify/v0/dist/composables/createObserver/index.mjs
function Ud(e, t, n) {
	let { isHydrated: r } = Hd(), i = /* @__PURE__ */ R(() => /* @__PURE__ */ Ld(e)), a = /* @__PURE__ */ I(void 0), o = /* @__PURE__ */ I(!1), s = /* @__PURE__ */ R(() => !!a.value && !o.value);
	function c(e) {
		n.onEntry?.(e), t(e), n.once && (!n.shouldStop || n.shouldStop(e)) && m();
	}
	function l() {
		if (/* @__PURE__ */ Uu(a.value)) return;
		let e = i.value;
		if (r.value && n.supports && /* @__PURE__ */ Hu(e) && !o.value && (a.value = n.create(c), n.observe(a.value, e), n.immediate)) {
			let r = n.immediate(e);
			n.onceIncludesImmediate ? c(r) : (n.onEntry?.(r), t(r));
		}
	}
	V(i, (e, t) => {
		(t || a.value) && d(), r.value && /* @__PURE__ */ Hu(e) && l();
	}, { immediate: !0 });
	let u;
	r.value || (u = V(() => r.value, (e) => {
		e && /* @__PURE__ */ Hu(i.value) && !a.value && (l(), u?.(), u = void 0);
	}));
	function d() {
		a.value &&= (a.value.disconnect(), void 0);
	}
	function f() {
		o.value = !0, n.onPause?.(), a.value?.disconnect();
	}
	function p() {
		o.value = !1, l();
	}
	function m() {
		u?.(), u = void 0, d(), a.value = null;
	}
	return Pe(m, !0), {
		isActive: /* @__PURE__ */ $t(s),
		isPaused: /* @__PURE__ */ $t(o),
		pause: f,
		resume: p,
		stop: m
	};
}
// node_modules/@vuetify/v0/dist/composables/useResizeObserver/index.mjs
/* #__NO_SIDE_EFFECTS__ */
function Wd(e) {
	let t = e.getBoundingClientRect(), n = getComputedStyle(e), r = {
		top: /* @__PURE__ */ td(n.paddingTop),
		left: /* @__PURE__ */ td(n.paddingLeft),
		right: /* @__PURE__ */ td(n.paddingRight),
		bottom: /* @__PURE__ */ td(n.paddingBottom)
	}, i = r.left + r.right, a = r.top + r.bottom, o = /* @__PURE__ */ td(n.borderLeftWidth) + /* @__PURE__ */ td(n.borderRightWidth), s = /* @__PURE__ */ td(n.borderTopWidth) + /* @__PURE__ */ td(n.borderBottomWidth), c = n.boxSizing === "border-box", l = /* @__PURE__ */ td(n.width, t.width), u = /* @__PURE__ */ td(n.height, t.height), d = {
		border: c ? l : l + i + o,
		content: Math.max(0, c ? l - i - o : l)
	}, f = {
		border: c ? u : u + a + s,
		content: Math.max(0, c ? u - a - s : u)
	}, p = /* @__PURE__ */ Lu(n.writingMode) && n.writingMode.startsWith("vertical"), m = p ? f : d, h = p ? d : f;
	return {
		contentRect: {
			width: d.content,
			height: f.content,
			top: r.top,
			left: r.left
		},
		borderBoxSize: [{
			inlineSize: m.border,
			blockSize: h.border
		}],
		contentBoxSize: [{
			inlineSize: m.content,
			blockSize: h.content
		}],
		target: e
	};
}
function Gd(e, t, n = {}) {
	return Ud(e, t, {
		supports: ju,
		once: n.once,
		create: (e) => new ResizeObserver((t) => {
			e(t.map((e) => {
				let t = e.borderBoxSize && e.contentBoxSize ? e : /* @__PURE__ */ Wd(e.target);
				return {
					contentRect: {
						width: e.contentRect.width,
						height: e.contentRect.height,
						top: e.contentRect.top,
						left: e.contentRect.left
					},
					borderBoxSize: t.borderBoxSize,
					contentBoxSize: t.contentBoxSize,
					target: e.target
				};
			}));
		}),
		observe: (e, t) => e.observe(t, { box: n.box ?? "content-box" }),
		immediate: n.immediate ? (e) => [/* @__PURE__ */ Wd(e)] : void 0
	});
}
function Kd(e) {
	let t = /* @__PURE__ */ I(0), n = /* @__PURE__ */ I(0), { pause: r, resume: i, stop: a, isActive: o, isPaused: s } = Gd(e, (e) => {
		let r = e[0];
		/* v8 ignore next 4 -- defensive: ResizeObserver always passes an entry array with at least one entry */
		r && (t.value = r.contentRect.width, n.value = r.contentRect.height);
	}, { immediate: !0 });
	function c() {
		t.value = 0, n.value = 0, r();
	}
	return {
		width: /* @__PURE__ */ $t(t),
		height: /* @__PURE__ */ $t(n),
		isActive: /* @__PURE__ */ $t(o),
		isPaused: /* @__PURE__ */ $t(s),
		pause: c,
		resume: i,
		stop: a
	};
}
// node_modules/@vuetify/v0/dist/composables/useIntersectionObserver/index.mjs
function qd(e, t, n = {}) {
	let r = /* @__PURE__ */ I(!1);
	return {
		...Ud(e, t, {
			supports: Mu,
			once: n.once,
			create: (e) => new IntersectionObserver((t) => {
				e(t.map((e) => ({
					boundingClientRect: e.boundingClientRect,
					intersectionRatio: e.intersectionRatio,
					intersectionRect: e.intersectionRect,
					isIntersecting: e.isIntersecting,
					rootBounds: e.rootBounds,
					target: e.target,
					time: e.time
				})));
			}, {
				root: n.root ?? null,
				rootMargin: n.rootMargin ?? "0px",
				threshold: n.threshold ?? 0
			}),
			observe: (e, t) => e.observe(t),
			onEntry: (e) => {
				let t = e.at(-1);
				/* v8 ignore next -- defensive: IntersectionObserver always emits at least one entry */
				t && (r.value = t.isIntersecting);
			},
			onPause: () => {
				r.value = !1;
			},
			/* v8 ignore next -- defensive nullish coalesce: entries always populated when shouldStop fires */
			shouldStop: (e) => e.at(-1)?.isIntersecting ?? !1,
			immediate: n.immediate ? (e) => [{
				boundingClientRect: e.getBoundingClientRect(),
				intersectionRatio: 0,
				intersectionRect: new DOMRect(0, 0, 0, 0),
				isIntersecting: !1,
				rootBounds: null,
				target: e,
				time: performance.now()
			}] : void 0
		}),
		isIntersecting: /* @__PURE__ */ $t(r)
	};
}
function Jd(e, t = {}) {
	let n = /* @__PURE__ */ I(!1), r = /* @__PURE__ */ I(0), { pause: i, resume: a, stop: o, isActive: s, isPaused: c } = qd(e, (e) => {
		let t = e.at(-1);
		/* v8 ignore next 4 -- defensive: IntersectionObserver always emits at least one entry */
		t && (n.value = t.isIntersecting, r.value = t.intersectionRatio);
	}, {
		immediate: !0,
		...t
	});
	function l() {
		n.value = !1, r.value = 0, i();
	}
	return {
		isIntersecting: /* @__PURE__ */ $t(n),
		intersectionRatio: /* @__PURE__ */ $t(r),
		isActive: s,
		isPaused: c,
		pause: l,
		resume: a,
		stop: o
	};
}
// node_modules/@vuetify/v0/dist/composables/useBreakpoints/index.mjs
var Yd = [
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
	"xxl"
];
function Xd() {
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
function Zd(e = {}) {
	let { ssr: t, ...n } = e, { mobileBreakpoint: r, breakpoints: i } = /* @__PURE__ */ Xu(Xd(), n), a = Object.entries(i).toSorted((e, t) => e[1] - t[1]), o = a.map(([e]) => e), s = /* @__PURE__ */ Ru(r) ? r : i[r] ?? i.md, c = t ? t.clientWidth : ku ? window.innerWidth : 0, l = t ? t.clientHeight ?? 0 : ku ? window.innerHeight : 0, u = /* @__PURE__ */ I("xs"), d = /* @__PURE__ */ I(c), f = /* @__PURE__ */ I(l), p = /* @__PURE__ */ I(!1), m = /* @__PURE__ */ I(!1), h = /* @__PURE__ */ I(!1), g = /* @__PURE__ */ I(!1), _ = /* @__PURE__ */ I(!1), v = /* @__PURE__ */ I(!1), y = /* @__PURE__ */ I(!1), b = /* @__PURE__ */ I(!1), x = /* @__PURE__ */ I(!1), S = /* @__PURE__ */ I(!1), C = /* @__PURE__ */ I(!1), w = /* @__PURE__ */ I(!1), T = /* @__PURE__ */ I(!1), E = /* @__PURE__ */ I(!1), D = /* @__PURE__ */ I(!1);
	function O(e, t) {
		let n = "xs";
		for (let r = a.length - 1; r >= 0; r--) {
			let i = a[r][1];
			if (t ? window.matchMedia(`(min-width: ${i}px)`).matches : e >= i) {
				n = a[r][0];
				break;
			}
		}
		let i = o.indexOf(n), c = /* @__PURE__ */ Ru(s) ? t ? !window.matchMedia(`(min-width: ${s}px)`).matches : e < s : i < o.indexOf(r);
		return {
			current: n,
			index: i,
			mobile: c
		};
	}
	function k({ current: e, mobile: t }) {
		let n = Yd.indexOf(e);
		u.value = e, p.value = t, m.value = e === "xs", h.value = e === "sm", g.value = e === "md", _.value = e === "lg", v.value = e === "xl", y.value = e === "xxl", b.value = n >= 1, x.value = n >= 2, S.value = n >= 3, C.value = n >= 4, w.value = n <= 1, T.value = n <= 2, E.value = n <= 3, D.value = n <= 4;
	}
	k(O(c, !t && ku && Au));
	let A = !1;
	function j() {
		!A && ku && (A = !0, Id("resize", () => {
			ee();
		}, { passive: !0 }));
	}
	function ee() {
		ku && (j(), d.value = window.innerWidth, f.value = window.innerHeight, k(O(d.value, Au)));
	}
	return t || j(), {
		breakpoints: i,
		mobileBreakpoint: r,
		name: /* @__PURE__ */ Qt(u),
		width: /* @__PURE__ */ Qt(d),
		height: /* @__PURE__ */ Qt(f),
		isMobile: /* @__PURE__ */ Qt(p),
		xs: /* @__PURE__ */ Qt(m),
		sm: /* @__PURE__ */ Qt(h),
		md: /* @__PURE__ */ Qt(g),
		lg: /* @__PURE__ */ Qt(_),
		xl: /* @__PURE__ */ Qt(v),
		xxl: /* @__PURE__ */ Qt(y),
		smAndUp: /* @__PURE__ */ Qt(b),
		mdAndUp: /* @__PURE__ */ Qt(x),
		lgAndUp: /* @__PURE__ */ Qt(S),
		xlAndUp: /* @__PURE__ */ Qt(C),
		smAndDown: /* @__PURE__ */ Qt(w),
		mdAndDown: /* @__PURE__ */ Qt(T),
		lgAndDown: /* @__PURE__ */ Qt(E),
		xlAndDown: /* @__PURE__ */ Qt(D),
		ssr: !!t,
		update: ee
	};
}
// node_modules/@vuetify/v0/dist/composables/useRtl/adapters/adapter.mjs
var Qd = class {
	dispose;
}, $d = class extends Qd {
	setup(e, t, n) {
		if (ku) {
			if (/* @__PURE__ */ Uu(n)) return;
			let e = n instanceof HTMLElement ? n : /* @__PURE__ */ Lu(n) ? document.querySelector(n) : document.documentElement;
			if (!e) return;
			e.dir = t.isRtl.value ? "rtl" : "ltr", this.dispose = V(t.isRtl, (t) => {
				e.dir = t ? "rtl" : "ltr";
			});
		} else {
			let n = e._context?.provides?.usehead ?? e._context?.provides?.head;
			if (n?.push) {
				let e = n.push({ htmlAttrs: { dir: t.isRtl.value ? "rtl" : "ltr" } }), r = V(t.isRtl, (t) => e.patch?.({ htmlAttrs: { dir: t ? "rtl" : "ltr" } }));
				this.dispose = () => {
					r(), e.dispose?.();
				};
			}
		}
	}
};
// node_modules/@vuetify/v0/dist/composables/useRtl/index.mjs
function ef(e = {}) {
	let t = e.adapter ?? new $d(), n = /* @__PURE__ */ I(e.default ?? !1);
	function r() {
		n.value = !n.value;
	}
	return {
		isRtl: n,
		toggle: r,
		adapter: t,
		dispose: () => t.dispose?.()
	};
}
// node_modules/vuetify/lib/util/propsFactory.js
function Z(e, t) {
	return (n) => Object.keys(e).reduce((r, i) => {
		let a = /* @__PURE__ */ Bu(e[i]) ? e[i] : { type: e[i] };
		return r[i] = n && i in n ? {
			...a,
			default: n[i]
		} : a, t && !r[i].source && (r[i].source = t), r;
	}, {});
}
// node_modules/vuetify/lib/composables/component.js
var tf = Z({
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
// node_modules/vuetify/lib/util/console.js
function nf(e) {
	oc(`Vuetify: ${e}`);
}
function rf(e) {
	oc(`Vuetify error: ${e}`);
}
function af(e, t) {
	t = Array.isArray(t) ? t.slice(0, -1).map((e) => `'${e}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`, oc(`[Vuetify UPGRADE] '${e}' is deprecated, use ${t} instead.`);
}
// node_modules/vuetify/lib/util/globals.js
var of = typeof window < "u", sf = of && "IntersectionObserver" in window, cf = of && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0);
of && "EyeDropper" in window;
var lf = of && "matchMedia" in window && /* @__PURE__ */ Iu(window.matchMedia), uf = () => lf && window.matchMedia("(prefers-reduced-motion: reduce)").matches, df = of && CSS?.supports?.("-webkit-backdrop-filter", "none");
of && CSS?.supports?.("field-sizing", "content");
// node_modules/vuetify/lib/util/helpers.js
function ff(e) {
	return /* @__PURE__ */ Lu(e) && e.endsWith("%");
}
function pf(e, t = 0) {
	return ff(e) ? parseFloat(e) / 100 * t : parseFloat(String(e)) || 0;
}
function mf(e, t = "px") {
	if (/* @__PURE__ */ Wu(e) || e === "") return;
	let n = Number(e);
	if (isNaN(n)) return String(e);
	if (isFinite(n)) return `${n}${t}`;
}
function hf(e) {
	let t;
	return !!e && typeof e == "object" && ((t = Object.getPrototypeOf(e)) === Object.prototype || !t);
}
function gf(e) {
	if (e && "$el" in e) {
		let t = e.$el;
		return t?.nodeType === Node.TEXT_NODE ? t.nextElementSibling : t;
	}
	return e;
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
}), Object.freeze({
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
function _f(e) {
	return Object.keys(e);
}
function vf(e, t) {
	return t.every((t) => e.hasOwnProperty(t));
}
function yf(e, t) {
	let n = {};
	for (let r of t) Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
	return n;
}
function bf(e, t, n) {
	let r = Object.create(null), i = Object.create(null);
	for (let a in e) t.some((e) => e instanceof RegExp ? e.test(a) : e === a) && !n?.some((e) => e === a) ? r[a] = e[a] : i[a] = e[a];
	return [r, i];
}
function xf(e, t) {
	let n = { ...e };
	return t.forEach((e) => delete n[e]), n;
}
var Sf = /^on[^a-z]/, Cf = (e) => Sf.test(e), wf = /* @__PURE__ */ "onAfterscriptexecute.onAnimationcancel.onAnimationend.onAnimationiteration.onAnimationstart.onAuxclick.onBeforeinput.onBeforescriptexecute.onChange.onClick.onCompositionend.onCompositionstart.onCompositionupdate.onContextmenu.onCopy.onCut.onDblclick.onFocusin.onFocusout.onFullscreenchange.onFullscreenerror.onGesturechange.onGestureend.onGesturestart.onGotpointercapture.onInput.onKeydown.onKeypress.onKeyup.onLostpointercapture.onMousedown.onMousemove.onMouseout.onMouseover.onMouseup.onMousewheel.onPaste.onPointercancel.onPointerdown.onPointerenter.onPointerleave.onPointermove.onPointerout.onPointerover.onPointerup.onReset.onSelect.onSubmit.onTouchcancel.onTouchend.onTouchmove.onTouchstart.onTransitioncancel.onTransitionend.onTransitionrun.onTransitionstart.onWheel".split(".");
function Tf(e) {
	let [t, n] = bf(e, [Sf]), r = xf(t, wf), [i, a] = bf(n, [
		"class",
		"style",
		"id",
		"inert",
		/^data-/
	]);
	return Object.assign(i, t), Object.assign(a, r), [i, a];
}
function Ef(e) {
	return /* @__PURE__ */ Wu(e) ? [] : Array.isArray(e) ? e : [e];
}
function Df(e, t = 0, n = 1) {
	return Math.max(t, Math.min(n, e));
}
function Of(e, t, n = "0") {
	return e + n.repeat(Math.max(0, t - e.length));
}
function kf(e, t, n = "0") {
	return n.repeat(Math.max(0, t - e.length)) + e;
}
function Af(e, t = 1) {
	let n = [], r = 0;
	for (; r < e.length;) n.push(e.substr(r, t)), r += t;
	return n;
}
function jf(e = {}, t = {}, n, r) {
	let i = {};
	for (let t in e) i[t] = e[t];
	for (let a in t) {
		let o = t[a];
		if (r && !r(a, o)) continue;
		let s = e[a];
		i[a] = hf(s) && hf(o) ? jf(s, o, n, r) : n && Array.isArray(s) && Array.isArray(o) ? n(s, o) : o;
	}
	return i;
}
function Mf(e) {
	return e.map((e) => e.type === as ? Mf(e.children) : e).flat();
}
function Nf(e = "") {
	if (Nf.cache.has(e)) return Nf.cache.get(e);
	let t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
	return Nf.cache.set(e, t), t;
}
Nf.cache = /* @__PURE__ */ new Map();
function Pf(e, t) {
	if (!t || typeof t != "object") return [];
	if (Array.isArray(t)) return t.map((t) => Pf(e, t)).flat(1);
	if (t.suspense) return Pf(e, t.ssContent);
	if (Array.isArray(t.children)) return t.children.map((t) => Pf(e, t)).flat(1);
	if (t.component) {
		if (Object.getOwnPropertyDescriptor(t.component.provides, e)) return [t.component];
		if (t.component.subTree) return Pf(e, t.component.subTree).flat(1);
	}
	return [];
}
var Ff = class {
	#e = [];
	#t = 0;
	constructor(e) {
		this.size = e;
	}
	get isFull() {
		return this.#e.length === this.size;
	}
	push(e) {
		this.#e[this.#t] = e, this.#t = (this.#t + 1) % this.size;
	}
	values() {
		return this.#e.slice(this.#t).concat(this.#e.slice(0, this.#t));
	}
	clear() {
		this.#e.length = 0, this.#t = 0;
	}
};
function If(e) {
	let t = Y(e), n = {};
	for (let e in t.value) n[e] = /* @__PURE__ */ R(() => t.value[e]);
	return n;
}
function Lf(e, t) {
	return e.includes(t);
}
function Rf(e) {
	return e[2].toLowerCase() + e.slice(3);
}
var zf = () => [Function, Array];
function Bf(e, t) {
	return t = "on" + te(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function Vf(e, ...t) {
	if (Array.isArray(e)) for (let n of e) n(...t);
	else /* @__PURE__ */ Iu(e) && e(...t);
}
function Hf(e, t = !0) {
	let n = [
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
	].map((e) => `${e}${t ? ":not([tabindex=\"-1\"])" : ""}:not([disabled], [inert])`).join(", "), r;
	try {
		r = [...e.querySelectorAll(n)];
	} catch (e) {
		return rf(String(e)), [];
	}
	return r.filter((e) => !e.closest("[inert]")).filter((e) => !!e.offsetParent || e.getClientRects().length > 0).filter((e) => !e.parentElement?.closest("details:not([open])") || e.tagName === "SUMMARY" && e.parentElement?.tagName === "DETAILS");
}
function Uf() {
	let e = document.activeElement;
	for (; e?.shadowRoot?.activeElement;) e = e.shadowRoot.activeElement;
	return e;
}
function Wf() {}
function Gf(e, t) {
	if (!(of && typeof CSS < "u" && CSS.supports !== void 0 && CSS.supports(`selector(${t})`))) return null;
	try {
		return !!e && e.matches(t);
	} catch {
		return null;
	}
}
function Kf(e, t) {
	if (!of || e === 0) return t(), () => {};
	let n = window.setTimeout(t, e);
	return () => window.clearTimeout(n);
}
function qf() {
	let e = /* @__PURE__ */ I(), t = (t) => {
		e.value = t;
	};
	return Object.defineProperty(t, "value", {
		enumerable: !0,
		get: () => e.value,
		set: (t) => e.value = t
	}), Object.defineProperty(t, "el", {
		enumerable: !0,
		get: () => gf(e.value)
	}), t;
}
function Jf(e) {
	return /* @__PURE__ */ Lu(e) || /* @__PURE__ */ Ru(e) || /* @__PURE__ */ zu(e) || typeof e == "bigint";
}
function Yf(e) {
	let t = ["checked", "disabled"];
	return Object.fromEntries(Object.entries(e).filter(([e, n]) => t.includes(e) ? !!n : !/* @__PURE__ */ Gu(n)));
}
// node_modules/vuetify/lib/util/anchor.js
var Xf = ["top", "bottom"], Zf = [
	"start",
	"end",
	"left",
	"right"
];
function Qf(e, t) {
	let [n, r] = e.split(" ");
	return r ||= Lf(Xf, n) ? "start" : Lf(Zf, n) ? "top" : "center", {
		side: $f(n, t),
		align: $f(r, t)
	};
}
function $f(e, t) {
	return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function ep(e) {
	return {
		side: {
			center: "center",
			top: "bottom",
			bottom: "top",
			left: "right",
			right: "left"
		}[e.side],
		align: e.align
	};
}
function tp(e) {
	return {
		side: e.side,
		align: {
			center: "center",
			top: "bottom",
			bottom: "top",
			left: "right",
			right: "left"
		}[e.align]
	};
}
function np(e) {
	return {
		side: e.align,
		align: e.side
	};
}
function rp(e) {
	return Lf(Xf, e.side) ? "y" : "x";
}
// node_modules/vuetify/lib/util/box.js
var ip = class {
	constructor(e) {
		if (/* @__PURE__ */ Hu(e)) {
			let t = document.body.currentCSSZoom ?? 1, n = 1 + (1 - t) / t, { x: r, y: i, width: a, height: o } = e.getBoundingClientRect();
			this.x = r * n, this.y = i * n, this.width = a * n, this.height = o * n;
		} else this.x = e.x, this.y = e.y, this.width = e.width, this.height = e.height;
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
function ap(e, t) {
	return {
		x: {
			before: Math.max(0, t.left - e.left),
			after: Math.max(0, e.right - t.right)
		},
		y: {
			before: Math.max(0, t.top - e.top),
			after: Math.max(0, e.bottom - t.bottom)
		}
	};
}
function op(e) {
	if (Array.isArray(e)) {
		let t = document.body.currentCSSZoom ?? 1, n = 1 + (1 - t) / t;
		return new ip({
			x: e[0] * n,
			y: e[1] * n,
			width: 0 * n,
			height: 0 * n
		});
	}
	return new ip(e);
}
function sp(e) {
	if (e === document.documentElement) {
		if (visualViewport) {
			let e = document.body.clientWidth, t = document.body.currentCSSZoom ?? (e ? document.documentElement.clientWidth / e : 1);
			return new ip({
				x: visualViewport.scale > 1 || df ? 0 : visualViewport.offsetLeft,
				y: visualViewport.scale > 1 || df ? 0 : visualViewport.offsetTop,
				width: document.documentElement.clientWidth / t,
				height: document.documentElement.clientHeight / t
			});
		}
		return new ip({
			x: 0,
			y: 0,
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		});
	}
	return new ip(e);
}
// node_modules/vuetify/lib/util/animation.js
function cp(e) {
	let t = new ip(e), n = getComputedStyle(e), r = n.transform;
	if (r) {
		let i, a, o, s, c;
		if (r.startsWith("matrix3d(")) i = r.slice(9, -1).split(/, /), a = Number(i[0]), o = Number(i[5]), s = Number(i[12]), c = Number(i[13]);
		else if (r.startsWith("matrix(")) i = r.slice(7, -1).split(/, /), a = Number(i[0]), o = Number(i[3]), s = Number(i[4]), c = Number(i[5]);
		else return new ip(t);
		let l = n.transformOrigin;
		return new ip({
			x: t.x - s - (1 - a) * parseFloat(l),
			y: t.y - c - (1 - o) * parseFloat(l.slice(l.indexOf(" ") + 1)),
			width: a ? t.width / a : e.offsetWidth + 1,
			height: o ? t.height / o : e.offsetHeight + 1
		});
	}
	return new ip(t);
}
function lp(e, t, n) {
	if (e.animate === void 0) return { finished: Promise.resolve() };
	let r;
	try {
		r = e.animate(t, n);
	} catch {
		return { finished: Promise.resolve() };
	}
	return r.finished === void 0 && (r.finished = new Promise((e) => {
		r.onfinish = () => {
			e(r);
		};
	})), r;
}
// node_modules/vuetify/lib/util/bindProps.js
var up = /* @__PURE__ */ new WeakMap();
function dp(e, t) {
	Object.keys(t).forEach((n) => {
		if (Cf(n)) {
			let r = Rf(n), i = up.get(e);
			if (/* @__PURE__ */ Wu(t[n])) i?.forEach((t) => {
				let [n, a] = t;
				n === r && (e.removeEventListener(r, a), i.delete(t));
			});
			else if (!i || ![...i].some((e) => e[0] === r && e[1] === t[n])) {
				e.addEventListener(r, t[n]);
				let a = i || /* @__PURE__ */ new Set();
				a.add([r, t[n]]), up.has(e) || up.set(e, a);
			}
		} else /* @__PURE__ */ Wu(t[n]) ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
	});
}
function fp(e, t) {
	Object.keys(t).forEach((t) => {
		if (Cf(t)) {
			let n = Rf(t), r = up.get(e);
			r?.forEach((t) => {
				let [i, a] = t;
				i === n && (e.removeEventListener(n, a), r.delete(t));
			});
		} else e.removeAttribute(t);
	});
}
// node_modules/vuetify/lib/util/color/APCA.js
var pp = 2.4, mp = .2126729, hp = .7151522, gp = .072175, _p = .55, vp = .58, yp = .57, bp = .62, xp = .03, Sp = 1.45, Cp = 5e-4, wp = 1.25, Tp = 1.25, Ep = .078, Dp = 12.82051282051282, Op = .06, kp = .001;
function Ap(e, t) {
	let n = (e.r / 255) ** pp, r = (e.g / 255) ** pp, i = (e.b / 255) ** pp, a = (t.r / 255) ** pp, o = (t.g / 255) ** pp, s = (t.b / 255) ** pp, c = n * mp + r * hp + i * gp, l = a * mp + o * hp + s * gp;
	if (c <= xp && (c += (xp - c) ** Sp), l <= xp && (l += (xp - l) ** Sp), Math.abs(l - c) < Cp) return 0;
	let u;
	if (l > c) {
		let e = (l ** _p - c ** vp) * wp;
		u = e < kp ? 0 : e < Ep ? e - e * Dp * Op : e - Op;
	} else {
		let e = (l ** bp - c ** yp) * Tp;
		u = e > -.001 ? 0 : e > -.078 ? e - e * Dp * Op : e + Op;
	}
	return u * 100;
}
// node_modules/vuetify/lib/util/color/transformCIELAB.js
var jp = .20689655172413793, Mp = (e) => e > jp ** 3 ? Math.cbrt(e) : e / (3 * jp ** 2) + 4 / 29, Np = (e) => e > jp ? e ** 3 : 3 * jp ** 2 * (e - 4 / 29);
function Pp(e) {
	let t = Mp, n = t(e[1]);
	return [
		116 * n - 16,
		500 * (t(e[0] / .95047) - n),
		200 * (n - t(e[2] / 1.08883))
	];
}
function Fp(e) {
	let t = Np, n = (e[0] + 16) / 116;
	return [
		t(n + e[1] / 500) * .95047,
		t(n),
		t(n - e[2] / 200) * 1.08883
	];
}
// node_modules/vuetify/lib/util/color/transformSRGB.js
var Ip = [
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
], Lp = (e) => e <= .0031308 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - .055, Rp = [
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
], zp = (e) => e <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4;
function Bp(e) {
	let t = [
		,
		,
		,
	], n = Lp, r = Ip;
	for (let i = 0; i < 3; ++i) t[i] = Math.round(Df(n(r[i][0] * e[0] + r[i][1] * e[1] + r[i][2] * e[2])) * 255);
	return {
		r: t[0],
		g: t[1],
		b: t[2]
	};
}
function Vp({ r: e, g: t, b: n }) {
	let r = [
		0,
		0,
		0
	], i = zp, a = Rp;
	e = i(e / 255), t = i(t / 255), n = i(n / 255);
	for (let i = 0; i < 3; ++i) r[i] = a[i][0] * e + a[i][1] * t + a[i][2] * n;
	return r;
}
// node_modules/vuetify/lib/util/colorUtils.js
function Hp(e) {
	return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function Up(e) {
	return Hp(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
var Wp = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, Gp = {
	rgb: (e, t, n, r) => ({
		r: e,
		g: t,
		b: n,
		a: r
	}),
	rgba: (e, t, n, r) => ({
		r: e,
		g: t,
		b: n,
		a: r
	}),
	hsl: (e, t, n, r) => Jp({
		h: e,
		s: t,
		l: n,
		a: r
	}),
	hsla: (e, t, n, r) => Jp({
		h: e,
		s: t,
		l: n,
		a: r
	}),
	hsv: (e, t, n, r) => qp({
		h: e,
		s: t,
		v: n,
		a: r
	}),
	hsva: (e, t, n, r) => qp({
		h: e,
		s: t,
		v: n,
		a: r
	})
};
function Kp(e) {
	if (/* @__PURE__ */ Ru(e)) return (isNaN(e) || e < 0 || e > 16777215) && nf(`'${e}' is not a valid hex color`), {
		r: (e & 16711680) >> 16,
		g: (e & 65280) >> 8,
		b: e & 255
	};
	if (/* @__PURE__ */ Lu(e) && Wp.test(e)) {
		let { groups: t } = e.match(Wp), { fn: n, values: r } = t, i = r.split(/,\s*|\s*\/\s*|\s+/).map((e, t) => e.endsWith("%") || t > 0 && t < 3 && [
			"hsl",
			"hsla",
			"hsv",
			"hsva"
		].includes(n) ? parseFloat(e) / 100 : parseFloat(e));
		return Gp[n](...i);
	}
	if (/* @__PURE__ */ Lu(e)) {
		let t = e.startsWith("#") ? e.slice(1) : e;
		[3, 4].includes(t.length) ? t = t.split("").map((e) => e + e).join("") : [6, 8].includes(t.length) || nf(`'${e}' is not a valid hex(a) color`);
		let n = parseInt(t, 16);
		return (isNaN(n) || n < 0 || n > 4294967295) && nf(`'${e}' is not a valid hex(a) color`), Qp(t);
	}
	if (/* @__PURE__ */ Bu(e)) {
		if (vf(e, [
			"r",
			"g",
			"b"
		])) return e;
		if (vf(e, [
			"h",
			"s",
			"l"
		])) return qp(Yp(e));
		if (vf(e, [
			"h",
			"s",
			"v"
		])) return qp(e);
	}
	throw TypeError(`Invalid color: ${/* @__PURE__ */ Wu(e) ? e : String(e) || e.constructor.name}\nExpected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function qp(e) {
	let { h: t, s: n, v: r, a: i } = e, a = (e) => {
		let i = (e + t / 60) % 6;
		return r - r * n * Math.max(Math.min(i, 4 - i, 1), 0);
	}, o = [
		a(5),
		a(3),
		a(1)
	].map((e) => Math.round(e * 255));
	return {
		r: o[0],
		g: o[1],
		b: o[2],
		a: i
	};
}
function Jp(e) {
	return qp(Yp(e));
}
function Yp(e) {
	let { h: t, s: n, l: r, a: i } = e, a = r + n * Math.min(r, 1 - r);
	return {
		h: t,
		s: a === 0 ? 0 : 2 - 2 * r / a,
		v: a,
		a: i
	};
}
function Xp(e) {
	let t = Math.round(e).toString(16);
	return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function Zp({ r: e, g: t, b: n, a: r }) {
	return `#${[
		Xp(e),
		Xp(t),
		Xp(n),
		/* @__PURE__ */ Ru(r) ? Xp(Math.round(r * 255)) : ""
	].join("")}`;
}
function Qp(e) {
	e = $p(e);
	let [t, n, r, i] = Af(e, 2).map((e) => parseInt(e, 16));
	return i = /* @__PURE__ */ Ru(i) ? i / 255 : i, {
		r: t,
		g: n,
		b: r,
		a: i
	};
}
function $p(e) {
	return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((e) => e + e).join("")), e.length !== 6 && (e = Of(Of(e, 6), 8, "F")), e;
}
function em(e, t) {
	let n = Pp(Vp(e));
	return n[0] += t * 10, Bp(Fp(n));
}
function tm(e, t) {
	let n = Pp(Vp(e));
	return n[0] -= t * 10, Bp(Fp(n));
}
function nm(e) {
	return Vp(Kp(e))[1];
}
function rm(e) {
	let t = Math.abs(Ap(Kp(0), Kp(e)));
	return Math.abs(Ap(Kp(16777215), Kp(e))) > Math.min(t, 50);
}
// node_modules/vuetify/lib/util/getCurrentInstance.js
function im(e, t) {
	let n = Is();
	if (!n) throw Error(`[Vuetify] ${e} ${t || "must be called from inside a setup function"}`);
	return n;
}
function am(e = "composables") {
	let t = im(e).type;
	return Nf(t?.aliasName || t?.name);
}
// node_modules/vuetify/lib/util/injectSelf.js
function om(e, t = im("injectSelf")) {
	let { provides: n } = t;
	if (n && e in n) return n[e];
}
// node_modules/vuetify/lib/composables/defaults.js
var sm = Symbol.for("vuetify:defaults"), cm = Symbol.for("vuetify:defaults:root");
function lm(e) {
	return /* @__PURE__ */ F(e);
}
function um() {
	let e = vr(sm);
	if (!e) throw Error("[Vuetify] Could not find defaults instance");
	return e;
}
function dm(e, t) {
	let n = um(), r = vr(cm, null), i = /* @__PURE__ */ F(e), a = Y(() => {
		if (L(t?.disabled)) return n.value;
		let e = L(t?.scoped), a = L(t?.reset), o = L(t?.root);
		if (!i.value && !(e || a || o)) return n.value;
		let s = jf(i.value, { prev: n.value });
		if (e) return s;
		if (a || o) {
			let e = Number(a || Infinity), t = /* @__PURE__ */ Lu(o) ? s.prev?.[o] : void 0;
			o && r?.value && (s = r.value);
			for (let t = 0; t <= e && s && "prev" in s; t++) s = s.prev;
			return s && t && (s = jf(jf(s, { prev: s }), t)), s;
		}
		return s.prev ? jf(s.prev, s, void 0, (e, t) => t !== void 0) : s;
	});
	return _r(sm, a), a;
}
function fm(e, t) {
	return e.props && (e.props[t] !== void 0 || e.props[Nf(t)] !== void 0);
}
function pm(e = {}, t, n = um()) {
	let r = im("useDefaults");
	if (t = t ?? r.type.name ?? r.type.__name, !t) throw Error("[Vuetify] Could not determine component name");
	let i = Y(() => n.value?.[e._as ?? t]), a = new Proxy(e, { get(e, t) {
		let a = Reflect.get(e, t);
		if (t === "class" || t === "style") return [i.value?.[t], a].filter((e) => e != null);
		if (fm(r.vnode, t)) return a;
		let o = i.value?.[t];
		if (o !== void 0) return o;
		let s = n.value?.global?.[t];
		return s === void 0 ? a : s;
	} }), o = /* @__PURE__ */ I();
	Sr(() => {
		if (i.value) {
			let e = Object.entries(i.value).filter(([e]) => e.startsWith(e[0].toUpperCase()));
			o.value = e.length ? Object.fromEntries(e) : void 0;
		} else o.value = void 0;
	});
	function s() {
		let e = om(sm, r);
		_r(sm, Y(() => o.value ? jf(e?.value ?? {}, o.value) : e?.value));
	}
	return {
		props: a,
		provideSubDefaults: s
	};
}
// node_modules/vuetify/lib/util/defineComponent.js
function mm(e) {
	if (e._setup = e._setup ?? e.setup, !e.name) return nf("The component is missing an explicit name, unable to generate default prop value"), e;
	if (e._setup) {
		e.props = Z(e.props ?? {}, e.name)();
		let t = Object.keys(e.props).filter((e) => e !== "class" && e !== "style");
		e.filterProps = function(e) {
			return yf(e, t);
		}, e.props._as = String, e.setup = function(t, n) {
			let r = um();
			if (!r.value) return e._setup(t, n);
			let { props: i, provideSubDefaults: a } = pm(t, t._as ?? e.name, r), o = e._setup(i, n);
			return a(), o;
		};
	}
	return e;
}
function hm(e = !0) {
	return (t) => (e ? mm : H)(t);
}
// node_modules/vuetify/lib/util/deepEqual.js
function gm(e, t, n, r) {
	if (!n || Jf(e) || Jf(t)) return;
	let i = n.get(e);
	if (i) i.set(t, r);
	else {
		let i = /* @__PURE__ */ new WeakMap();
		i.set(t, r), n.set(e, i);
	}
}
function _m(e, t, n) {
	if (!n || Jf(e) || Jf(t)) return null;
	let r = n.get(e)?.get(t);
	if (/* @__PURE__ */ zu(r)) return r;
	let i = n.get(t)?.get(e);
	return /* @__PURE__ */ zu(i) ? i : null;
}
function vm(e, t, n = /* @__PURE__ */ new WeakMap()) {
	if (e === t) return !0;
	if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t)) return !1;
	let r = Object.keys(e);
	return r.length === Object.keys(t).length ? _m(e, t, n) || (gm(e, t, n, !0), r.every((r) => vm(e[r], t[r], n))) : !1;
}
// node_modules/vuetify/lib/util/dom.js
function ym(e) {
	/* istanbul ignore next */
	if (!/* @__PURE__ */ Iu(e.getRootNode)) {
		for (; e.parentNode;) e = e.parentNode;
		return e === document ? document : null;
	}
	let t = e.getRootNode();
	return t !== document && t.getRootNode({ composed: !0 }) !== document ? null : t;
}
// node_modules/vuetify/lib/util/easing.js
var bm = "cubic-bezier(0.4, 0, 0.2, 1)", xm = "cubic-bezier(0.0, 0, 0.2, 1)", Sm = "cubic-bezier(0.4, 0, 1, 1)", Cm = {
	linear: (e) => e,
	easeInQuad: (e) => e ** 2,
	easeOutQuad: (e) => e * (2 - e),
	easeInOutQuad: (e) => e < .5 ? 2 * e ** 2 : -1 + (4 - 2 * e) * e,
	easeInCubic: (e) => e ** 3,
	easeOutCubic: (e) => --e ** 3 + 1,
	easeInOutCubic: (e) => e < .5 ? 4 * e ** 3 : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
	easeInQuart: (e) => e ** 4,
	easeOutQuart: (e) => 1 - --e ** 4,
	easeInOutQuart: (e) => e < .5 ? 8 * e ** 4 : 1 - 8 * --e ** 4,
	easeInQuint: (e) => e ** 5,
	easeOutQuint: (e) => 1 + --e ** 5,
	easeInOutQuint: (e) => e < .5 ? 16 * e ** 5 : 1 + 16 * --e ** 5,
	instant: (e) => 1
};
// node_modules/vuetify/lib/util/getScrollParent.js
function wm(e, t = !1) {
	for (; e;) {
		if (t ? Dm(e) : Em(e)) return e;
		e = e.parentElement;
	}
	return document.scrollingElement;
}
function Tm(e, t) {
	let n = [];
	if (t && e && !t.contains(e)) return n;
	for (; e && (Em(e) && n.push(e), e !== t);) e = e.parentElement;
	return n;
}
function Em(e) {
	if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
	let t = window.getComputedStyle(e), n = t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight, r = t.overflowX === "scroll" || t.overflowX === "auto" && e.scrollWidth > e.clientWidth;
	return n || r;
}
function Dm(e) {
	if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
	let t = window.getComputedStyle(e);
	return ["scroll", "auto"].includes(t.overflowY);
}
// node_modules/vuetify/lib/util/isFixedPosition.js
function Om(e) {
	for (; e;) {
		if (window.getComputedStyle(e).position === "fixed") return !0;
		e = e.offsetParent;
	}
	return !1;
}
// node_modules/vuetify/lib/util/useRender.js
function km(e) {
	let t = im("useRender");
	t.render = e;
}
// node_modules/vuetify/lib/composables/layout.js
var Am = Symbol.for("vuetify:layout"), jm = Symbol.for("vuetify:layout-item"), Mm = 1e3, Nm = Z({
	overlaps: {
		type: Array,
		default: () => []
	},
	fullHeight: Boolean
}, "layout"), Pm = (e, t, n, r, i, a) => {
	let o = {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}, s = { ...o }, c = [{
		id: "",
		layer: { ...o },
		percent: { ...s }
	}];
	for (let l of e) {
		let e = t.get(l), u = n.get(l), d = r.get(l);
		if (!e || !u || !d) continue;
		let f = {
			...o,
			[e.value]: o[e.value] + (d.value ? i(u.value, e.value) : 0)
		}, p = {
			...s,
			[e.value]: s[e.value] + (d.value ? a(u.value) : 0)
		};
		c.push({
			id: l,
			layer: f,
			percent: p
		}), o = f, s = p;
	}
	return c;
};
function Fm(e) {
	let t = vr(Am, null), n = Y(() => t ? t.rootZIndex.value - 100 : Mm), r = /* @__PURE__ */ F([]), i = /* @__PURE__ */ Xt(/* @__PURE__ */ new Map()), a = /* @__PURE__ */ Xt(/* @__PURE__ */ new Map()), o = /* @__PURE__ */ Xt(/* @__PURE__ */ new Map()), s = /* @__PURE__ */ Xt(/* @__PURE__ */ new Map()), c = /* @__PURE__ */ Xt(/* @__PURE__ */ new Map()), l = qf(), u = /* @__PURE__ */ I();
	Gd(() => l.el, (e) => {
		let { left: t, top: n, width: r, height: i } = e[0].contentRect;
		u.value = new ip({
			x: t,
			y: n,
			width: r,
			height: i
		});
	});
	function d(e, t) {
		return pf(e, (t === "left" || t === "right" ? u.value?.width : u.value?.height) ?? 0);
	}
	function f(e) {
		return !u.value && ff(e) ? parseFloat(e) : 0;
	}
	function p(e, t) {
		return t ? `calc(${t}% + ${e}px)` : `${e}px`;
	}
	let m = /* @__PURE__ */ I(!1), h = -1;
	V(() => [u.value?.width, u.value?.height], () => {
		m.value = !0, window.clearTimeout(h), h = window.setTimeout(() => m.value = !1, 100);
	}), Pe(() => window.clearTimeout(h));
	let g = Y(() => {
		let t = /* @__PURE__ */ new Map(), n = e.overlaps ?? [];
		for (let e of n.filter((e) => e.includes(":"))) {
			let [n, o] = e.split(":");
			if (!r.value.includes(n) || !r.value.includes(o)) continue;
			let s = i.get(n), c = i.get(o), l = a.get(n), u = a.get(o);
			s && c && l && u && (t.set(o, {
				position: s.value,
				amount: d(l.value, s.value)
			}), t.set(n, {
				position: c.value,
				amount: -d(u.value, c.value)
			}));
		}
		return t;
	}), _ = Y(() => {
		let e = [...new Set([...o.values()].map((e) => e.value))].sort((e, t) => e - t), t = [];
		for (let n of e) {
			let e = r.value.filter((e) => o.get(e)?.value === n);
			t.push(...e);
		}
		return Pm(t, i, a, s, d, f);
	}), v = Y(() => !m.value && !Array.from(c.values()).some((e) => e.value)), y = Y(() => _.value[_.value.length - 1].layer), b = /* @__PURE__ */ R(() => {
		let { percent: e } = _.value[_.value.length - 1];
		return {
			"--v-layout-left": p(y.value.left, e.left),
			"--v-layout-right": p(y.value.right, e.right),
			"--v-layout-top": p(y.value.top, 0),
			"--v-layout-bottom": p(y.value.bottom, 0),
			...v.value ? void 0 : { transition: "none" }
		};
	}), x = Y(() => _.value.slice(1).map(({ id: e }, t) => {
		let { layer: n } = _.value[t], r = a.get(e), o = i.get(e);
		return {
			id: e,
			...n,
			size: d(r.value, o.value),
			position: o.value
		};
	})), S = (e) => x.value.find((t) => t.id === e), C = im("createLayout"), w = /* @__PURE__ */ I(!1);
	return Yi(() => {
		w.value = !0;
	}), _r(Am, {
		register: (e, { id: t, order: l, position: f, layoutSize: m, elementSize: h, active: y, disableTransitions: b, absolute: S }) => {
			o.set(t, l), i.set(t, f), a.set(t, m), s.set(t, y), b && c.set(t, b);
			let T = Pf(jm, C?.vnode).indexOf(e);
			T > -1 ? r.value.splice(T, 0, t) : r.value.push(t);
			let E = Y(() => x.value.findIndex((e) => e.id === t)), D = Y(() => n.value + (w.value ? _.value.length * 2 : 0) - E.value * 2);
			return {
				layoutItemStyles: Y(() => {
					let e = f.value === "left" || f.value === "right", r = f.value === "right", i = f.value === "bottom", a = r || i ? 1 : -1, o = `calc(${100 * a}% + ${a}px)`, s = `translate${e ? "X" : "Y"}`, c = {
						[f.value]: 0,
						zIndex: D.value,
						transform: `${s}(${y.value ? "0px" : o})`,
						position: S.value || n.value !== Mm ? "absolute" : "fixed",
						...v.value ? void 0 : { transition: "none" }
					}, l = ff(h.value) && u.value ? d(h.value, f.value) : h.value, m = { ...x.value[E.value] };
					x.value[E.value] || nf(`[Vuetify] Could not find layout item "${t}"`);
					let b = g.value.get(t);
					b && (m[b.position] += b.amount);
					let { percent: C } = _.value[E.value], w = p(m.left, C.left), T = p(m.right, C.right), O = p(m.top, C.top), k = p(m.bottom, C.bottom);
					return {
						...c,
						height: e ? `calc(100% - ${O} - ${k})` : l ? mf(l) : void 0,
						left: r ? void 0 : w,
						right: r ? T : void 0,
						top: f.value === "bottom" ? void 0 : O,
						bottom: f.value === "top" ? void 0 : k,
						width: e ? l ? mf(l) : void 0 : `calc(100% - ${w} - ${T})`
					};
				}),
				layoutItemScrimStyles: Y(() => ({ zIndex: D.value - 1 })),
				zIndex: D
			};
		},
		unregister: (e) => {
			o.delete(e), i.delete(e), a.delete(e), s.delete(e), c.delete(e), r.value = r.value.filter((t) => t !== e);
		},
		mainRect: y,
		mainStyles: b,
		getLayoutItem: S,
		items: x,
		layoutRect: u,
		rootZIndex: n
	}), {
		layoutClasses: /* @__PURE__ */ R(() => ["v-layout", { "v-layout--full-height": e.fullHeight }]),
		layoutStyles: /* @__PURE__ */ R(() => ({
			zIndex: t ? n.value : void 0,
			position: t ? "relative" : void 0,
			overflow: t ? "hidden" : void 0
		})),
		getLayoutItem: S,
		items: x,
		layoutRect: u,
		layoutRef: l
	};
}
// node_modules/vuetify/lib/composables/toggleScope.js
function Im(e, t) {
	let n;
	function r() {
		n = Me(), n.run(() => t.length ? t(() => {
			n?.stop(), r();
		}) : t());
	}
	V(e, (e) => {
		e && !n ? r() : e || (n?.stop(), n = void 0);
	}, { immediate: !0 }), Pe(() => {
		n?.stop();
	});
}
// node_modules/vuetify/lib/composables/proxiedModel.js
function Lm(e, t, n, r = (e) => e, i = (e) => e) {
	let a = im("useProxiedModel"), o = /* @__PURE__ */ F(/* @__PURE__ */ Gu(e[t]) ? n : e[t]), s = Nf(t), c = Y(s === t ? () => (e[t], !!(a.vnode.props?.hasOwnProperty(t) && a.vnode.props?.hasOwnProperty(`onUpdate:${t}`))) : () => (e[t], !(!a.vnode.props?.hasOwnProperty(t) && !a.vnode.props?.hasOwnProperty(s) || !a.vnode.props?.hasOwnProperty(`onUpdate:${t}`) && !a.vnode.props?.hasOwnProperty(`onUpdate:${s}`))));
	Im(() => !c.value, () => {
		V(() => e[t], (e) => {
			o.value = e;
		});
	});
	let l = Y({
		get() {
			let n = e[t];
			return r(c.value ? n : o.value);
		},
		set(n) {
			let s = i(n), l = /* @__PURE__ */ on(c.value ? e[t] : o.value);
			l !== s && r(l) !== n && (o.value = s, a?.emit(`update:${t}`, s));
		}
	});
	return Object.defineProperty(l, "externalValue", { get: () => c.value ? e[t] : o.value }), l;
}
// node_modules/vuetify/lib/locale/en.js
var Rm = {
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
}, zm = "$vuetify.", Bm = (e, t) => e.replace(/\{(\d+)\}/g, (e, n) => String(t[Number(n)]));
function Vm(e, t) {
	e.has(t) || e.register({ id: t }), e.selectedId.value !== t && e.select(t);
}
function Hm(e, t, n) {
	let r = Nd({
		fallback: t,
		messages: n
	});
	return Vm(r, e), r;
}
var Um = (e, t, n) => {
	let r = /* @__PURE__ */ I(Hm(e.value, t.value, n.value));
	return V(e, (e) => Vm(r.value, e), { flush: "sync" }), V([t, n], () => {
		r.value = Hm(e.value, t.value, n.value);
	}, {
		deep: !0,
		flush: "sync"
	}), (e, ...t) => {
		if (!e.startsWith(zm)) return Bm(e, t);
		let n = r.value.ti(e.slice(9), ...t);
		return /* @__PURE__ */ Lu(n) ? n : (rf(`Translation key "${e}" not found in fallback`), e);
	};
};
function Wm(e, t) {
	return (n, r) => new Intl.NumberFormat([e.value, t.value], r).format(n);
}
function Gm(e, t) {
	return Wm(e, t)(.1).includes(",") ? "," : ".";
}
function Km(e, t) {
	return new Intl.NumberFormat([e.value, t.value], { useGrouping: !0 }).formatToParts(1e4).find((e) => e.type === "group")?.value ?? "\xA0";
}
function qm(e, t, n) {
	let r = Lm(e, t, e[t] ?? n.value);
	return r.value = e[t] ?? n.value, V(n, (i) => {
		e[t] ?? (r.value = n.value);
	}), r;
}
function Jm(e) {
	return (t) => {
		let n = qm(t, "locale", e.current), r = qm(t, "fallback", e.fallback), i = qm(t, "messages", e.messages);
		return {
			name: "vuetify",
			current: n,
			fallback: r,
			messages: i,
			decimalSeparator: /* @__PURE__ */ R(() => Gm(n, r)),
			numericGroupSeparator: /* @__PURE__ */ R(() => Km(n, r)),
			t: Um(n, r, i),
			n: Wm(n, r),
			provide: Jm({
				current: n,
				fallback: r,
				messages: i
			})
		};
	};
}
function Ym(e) {
	let t = /* @__PURE__ */ I(e?.locale ?? "en"), n = /* @__PURE__ */ I(e?.fallback ?? "en"), r = /* @__PURE__ */ F({
		en: Rm,
		...e?.messages
	});
	return {
		name: "vuetify",
		current: t,
		fallback: n,
		messages: r,
		decimalSeparator: /* @__PURE__ */ R(() => e?.decimalSeparator ?? Gm(t, n)),
		numericGroupSeparator: /* @__PURE__ */ R(() => e?.numericGroupSeparator ?? Km(t, n)),
		t: Um(t, n, r),
		n: Wm(t, n),
		provide: Jm({
			current: t,
			fallback: n,
			messages: r
		})
	};
}
// node_modules/vuetify/lib/composables/locale.js
var Xm = Symbol.for("vuetify:locale");
function Zm(e) {
	let t = e?.adapter?.name ? e.adapter : Ym(e), n = eh(t, e);
	return {
		...t,
		...n
	};
}
function Qm() {
	let e = vr(Xm);
	if (!e) throw Error("[Vuetify] Could not find injected locale instance");
	return e;
}
function $m() {
	return {
		af: !1,
		ar: !0,
		bg: !1,
		ca: !1,
		ckb: !0,
		cs: !1,
		de: !1,
		el: !1,
		en: !1,
		es: !1,
		et: !1,
		fa: !0,
		fi: !1,
		fr: !1,
		hr: !1,
		hu: !1,
		he: !0,
		id: !1,
		it: !1,
		ja: !1,
		km: !1,
		ko: !1,
		lv: !1,
		lt: !1,
		nl: !1,
		no: !1,
		pl: !1,
		pt: !1,
		ro: !1,
		ru: !1,
		sk: !1,
		sl: !1,
		srCyrl: !1,
		srLatn: !1,
		sv: !1,
		th: !1,
		tr: !1,
		az: !1,
		uk: !1,
		vi: !1,
		zhHans: !1,
		zhHant: !1
	};
}
function eh(e, t) {
	let n = /* @__PURE__ */ F(t?.rtl ?? $m()), r = ef();
	return V(() => n.value[e.current.value] ?? !1, (e) => {
		r.isRtl.value = e;
	}, {
		flush: "sync",
		immediate: !0
	}), {
		isRtl: /* @__PURE__ */ Qt(r.isRtl),
		rtl: n,
		rtlClasses: /* @__PURE__ */ R(() => `v-locale--is-${r.isRtl.value ? "rtl" : "ltr"}`)
	};
}
function th() {
	let e = vr(Xm);
	if (!e) throw Error("[Vuetify] Could not find injected rtl instance");
	return {
		isRtl: e.isRtl,
		rtlClasses: e.rtlClasses
	};
}
// node_modules/vuetify/lib/composables/theme.js
var nh = Symbol.for("vuetify:theme"), rh = Z({ theme: String }, "theme");
function ih() {
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
				dark: !1,
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
				dark: !0,
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
		scoped: !1,
		utilities: !0,
		transition: !1
	};
}
function ah(e = ih()) {
	let t = ih();
	return e ? jf(t, e) : {
		...t,
		isDisabled: !0
	};
}
function oh(e, t, n, r) {
	e.push(`${dh(t, r)} {\n`, ...n.map((e) => `  ${e};\n`), "}\n");
}
function sh(e, t) {
	let n = e.dark ? 2 : 1, r = e.dark ? 1 : 2, i = [];
	for (let [a, o] of Object.entries(e.colors)) {
		let e = Kp(o);
		i.push(`--${t}theme-${a}: ${e.r},${e.g},${e.b}` + (/* @__PURE__ */ Ru(e.a) ? `,${e.a}` : "")), a.startsWith("on-") || i.push(`--${t}theme-${a}-overlay-multiplier: ${nm(o) > .18 ? n : r}`);
	}
	for (let [n, r] of Object.entries(e.variables)) {
		let e = /* @__PURE__ */ Lu(r) && r.startsWith("#") ? Kp(r) : void 0, a = e ? `${e.r}, ${e.g}, ${e.b}` + (/* @__PURE__ */ Ru(e.a) ? `, ${e.a}` : "") : void 0;
		i.push(`--${t}${n}: ${a ?? r}`);
	}
	return i;
}
function ch(e, t, n) {
	let r = {};
	if (n) for (let i of ["lighten", "darken"]) {
		let a = i === "lighten" ? em : tm;
		for (let o of /* @__PURE__ */ ed(n[i], 1)) r[`${e}-${i}-${o}`] = Zp(a(Kp(t), o));
	}
	return r;
}
function lh(e, t) {
	if (!t) return {};
	let n = {};
	for (let r of t.colors) {
		let i = e[r];
		i && (n = {
			...n,
			...ch(r, i, t)
		});
	}
	return n;
}
function uh(e, t) {
	let n = {};
	for (let r of Object.keys(e)) {
		if (r.startsWith("on-") || e[`on-${r}`]) continue;
		let i = `on-${r}`;
		n[i] = rm(Kp(e[r])) ? t["theme-on-dark"] : t["theme-on-light"];
	}
	return n;
}
function dh(e, t) {
	if (!t) return e;
	let n = `:where(${t})`;
	return e === ":root" ? n : `${n} ${e}`;
}
function fh(e, t, n) {
	let r = ph(e, t);
	r && (r.innerHTML = n);
}
function ph(e, t) {
	if (!of) return null;
	let n = document.getElementById(e);
	return n || (n = document.createElement("style"), n.id = e, n.type = "text/css", t && n.setAttribute("nonce", t), document.head.appendChild(n)), n;
}
function mh(e) {
	let t = ah(e), n = /* @__PURE__ */ I(t.defaultTheme), r = /* @__PURE__ */ F(t.themes), i = /* @__PURE__ */ I("light"), a = Y({
		get() {
			return n.value === "system" ? i.value : n.value;
		},
		set(e) {
			n.value = e;
		}
	}), o = Y(() => {
		let e = {};
		for (let [n, i] of Object.entries(r.value)) {
			let a = jf(i.dark || n === "dark" ? r.value.dark : r.value.light, i), o = {
				...a.colors,
				...lh(a.colors, t.variations)
			};
			e[n] = {
				...a,
				colors: {
					...o,
					...uh(o, a.variables)
				}
			};
		}
		return e;
	}), s = /* @__PURE__ */ R(() => o.value[a.value]), c = /* @__PURE__ */ R(() => n.value === "system"), l = Y(() => {
		let e = [], n = t.scoped ? t.prefix : "";
		e.push("@layer theme-base {\n"), oh(e, ":root", [`color-scheme: ${s.value?.dark ? "dark" : "light"}`], t.scope), oh(e, ":root", sh(s.value, t.prefix), t.scope);
		for (let [n, r] of Object.entries(o.value)) oh(e, `.${t.prefix}theme--${n}`, [`color-scheme: ${r.dark ? "dark" : "light"}`, ...sh(r, t.prefix)], t.scope);
		if (e.push("}\n"), t.utilities) {
			let r = [], i = [], a = new Set(Object.values(o.value).flatMap((e) => Object.keys(e.colors)));
			for (let e of a) e.startsWith("on-") ? oh(i, `.${e}`, [`color: rgb(var(--${t.prefix}theme-${e}))`], t.scope) : (oh(r, `.${n}bg-${e}`, [
				`--${t.prefix}theme-overlay-multiplier: var(--${t.prefix}theme-${e}-overlay-multiplier)`,
				`background-color: rgb(var(--${t.prefix}theme-${e}))`,
				`color: rgb(var(--${t.prefix}theme-on-${e}))`
			], t.scope), oh(i, `.${n}text-${e}`, [`color: rgb(var(--${t.prefix}theme-${e}))`], t.scope), oh(i, `.${n}border-${e}`, [`--${t.prefix}border-color: var(--${t.prefix}theme-${e})`], t.scope));
			e.push("@layer theme-background {\n", ...r.map((e) => `  ${e}`), "}\n", "@layer theme-foreground {\n", ...i.map((e) => `  ${e}`), "}\n");
		}
		return "@layer vuetify-utilities {\n" + e.map((e) => `  ${e}`).join("") + "\n}";
	}), u = /* @__PURE__ */ R(() => t.isDisabled ? void 0 : `${t.prefix}theme--${a.value}`), d = /* @__PURE__ */ R(() => Object.keys(o.value));
	if (lf) {
		let e = window.matchMedia("(prefers-color-scheme: dark)");
		function t() {
			i.value = e.matches ? "dark" : "light";
		}
		t(), e.addEventListener("change", t, { passive: !0 }), Ne() && Pe(() => {
			e.removeEventListener("change", t);
		});
	}
	function f(e) {
		if (t.isDisabled) return;
		let n = e._context.provides.usehead;
		if (n) {
			function e() {
				return { style: [{
					textContent: l.value,
					id: t.stylesheetId,
					nonce: t.cspNonce || !1,
					tagPosition: "bodyOpen"
				}] };
			}
			if (n.push) {
				let t = n.push(e);
				of && V(l, () => {
					t.patch(e);
				});
			} else of ? (n.addHeadObjs(/* @__PURE__ */ R(e)), Sr(() => n.updateDOM())) : n.addHeadObjs(e());
		} else {
			of ? V(l, e, { immediate: !0 }) : e();
			function e() {
				fh(t.stylesheetId, t.cspNonce, l.value);
			}
		}
	}
	let p;
	function m(e) {
		if (!e) {
			p = null;
			return;
		}
		let t, n;
		if (/* @__PURE__ */ Hu(e)) {
			let r = new ip(e);
			t = r.left + r.width / 2, n = r.top + r.height / 2;
		} else t = e.clientX, n = e.clientY;
		let r = Math.min(98.9, 100 * t / window.innerWidth), i = 100 * n / window.innerHeight;
		p = `${r.toFixed(2)}% ${i.toFixed(2)}%`;
	}
	function h(e) {
		if (!(e ?? t.transition) && !p) return !1;
		let n = /* @__PURE__ */ Bu(t.transition) ? t.transition : {}, r = /* @__PURE__ */ Bu(e) ? e : {};
		return {
			origin: r.origin ?? p ?? n.origin,
			duration: r.duration ?? n.duration
		};
	}
	function g(e, t) {
		if (!of || !document.startViewTransition || uf()) return e(), Promise.resolve();
		let n = t.origin ?? "50% 0%", r = t.duration ?? "500ms", i = document.createElement("style");
		i.textContent = `html:active-view-transition-type(vuetify-theme)::view-transition-old(root) { animation: none; }html:active-view-transition-type(vuetify-theme)::view-transition-new(root) { animation: v-circle-in ${r} ease-in-out; }@keyframes v-circle-in {  from { clip-path: circle(0% at ${n}); }  to { clip-path: circle(150% at ${n}); }}`, document.head.appendChild(i);
		let a = document.startViewTransition({
			update: () => e(),
			types: ["vuetify-theme"]
		});
		return a.finished.then(() => {
			p = null, i.remove();
		}), a.updateCallbackDone;
	}
	function _(e, t) {
		if (e !== "system" && !d.value.includes(e)) return nf(`Theme "${e}" not found on the Vuetify theme instance`), Promise.resolve();
		let n = () => {
			a.value = e;
		}, r = h(t);
		return r ? g(n, r) : (n(), Promise.resolve());
	}
	function v(e = d.value, t) {
		let n = e.indexOf(a.value);
		return _(e[n === -1 ? 0 : (n + 1) % e.length], t);
	}
	function y(e = ["light", "dark"], t) {
		return v(e, t);
	}
	let b = new Proxy(a, {
		get(e, t) {
			return Reflect.get(e, t);
		},
		set(e, t, n) {
			return t === "value" && af(`theme.global.name.value = ${n}`, `theme.change('${n}')`), Reflect.set(e, t, n);
		}
	});
	return {
		install: f,
		change: _,
		cycle: v,
		toggle: y,
		setTransitionOrigin: m,
		isDisabled: t.isDisabled,
		isSystem: c,
		name: a,
		themes: r,
		current: s,
		computedThemes: o,
		prefix: t.prefix,
		themeClasses: u,
		styles: l,
		global: {
			name: b,
			current: s
		}
	};
}
function hh(e) {
	im("provideTheme");
	let t = vr(nh, null);
	if (!t) throw Error("Could not find Vuetify theme injection");
	let n = /* @__PURE__ */ R(() => e.theme ?? t.name.value), r = /* @__PURE__ */ R(() => t.computedThemes.value[n.value]), i = /* @__PURE__ */ R(() => t.isDisabled ? void 0 : `${t.prefix}theme--${n.value}`), a = {
		...t,
		name: n,
		current: r,
		themeClasses: i
	};
	return _r(nh, a), a;
}
// node_modules/vuetify/lib/components/VApp/VApp.js
var gh = Z({
	...tf(),
	...xf(Nm(), ["fullHeight"]),
	...rh()
}, "VApp"), _h = hm()({
	name: "VApp",
	props: gh(),
	setup(e, { slots: t }) {
		let n = hh(e), { layoutClasses: r, getLayoutItem: i, items: a, layoutRef: o } = Fm({
			...e,
			fullHeight: !0
		}), { rtlClasses: s } = th();
		return km(() => K("div", {
			ref: o,
			class: ge([
				"v-application",
				n.themeClasses.value,
				r.value,
				s.value,
				e.class
			]),
			style: de([e.style])
		}, [K("div", { class: "v-application__wrap" }, [t.default?.()])])), {
			getLayoutItem: i,
			items: a,
			theme: n
		};
	}
}), vh = Z({ tag: {
	type: [
		String,
		Object,
		Function
	],
	default: "div"
} }, "tag"), yh = Z({
	withBackground: Boolean,
	...tf(),
	...rh(),
	...vh()
}, "VThemeProvider"), bh = hm()({
	name: "VThemeProvider",
	props: yh(),
	setup(e, { slots: t }) {
		let { themeClasses: n } = hh(e);
		return () => e.withBackground ? q(e.tag, {
			class: ge([
				"v-theme-provider",
				n.value,
				e.class
			]),
			style: de(e.style)
		}, { default: () => [t.default?.()] }) : t.default?.();
	}
}), xh = (e) => String(e).padStart(2, "0"), Sh = ({ y: e, m: t, d: n }) => `${String(e).padStart(4, "0")}-${xh(t)}-${xh(n)}`, Ch = (e, t) => [
	31,
	e % 4 == 0 && (e % 100 != 0 || e % 400 == 0) ? 29 : 28,
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
][t - 1];
function wh(e) {
	if (typeof e != "string") return null;
	let t = /^(\d{4})-(\d{2})-(\d{2})$/.exec(e);
	if (!t) return null;
	let [n, r, i] = t.slice(1).map(Number);
	return n >= 1 && n <= 9999 && r >= 1 && r <= 12 && i >= 1 && i <= Ch(n, r) ? {
		y: n,
		m: r,
		d: i
	} : null;
}
var Th = (e) => {
	let t = /* @__PURE__ */ new Date(0);
	return t.setUTCHours(0, 0, 0, 0), t.setUTCFullYear(e.y, e.m - 1, e.d), t;
}, Eh = (e) => Th(e).getUTCDay();
function Dh(e, t) {
	let n = Th(e);
	n.setUTCDate(n.getUTCDate() + t);
	let r = n.getUTCFullYear();
	return r < 1 ? {
		y: 1,
		m: 1,
		d: 1
	} : r > 9999 ? {
		y: 9999,
		m: 12,
		d: 31
	} : {
		y: r,
		m: n.getUTCMonth() + 1,
		d: n.getUTCDate()
	};
}
function Oh(e, t) {
	let n = Math.max(12, Math.min(119999, e.y * 12 + e.m - 1 + t)), r = Math.floor(n / 12), i = n % 12 + 1;
	return {
		y: r,
		m: i,
		d: Math.min(e.d, Ch(r, i))
	};
}
function kh(e) {
	let t = String(e).trim().match(/^(?:(\d{1,2}):(\d{2})|(\d{2})(\d{2}))$/);
	if (!t) return null;
	let n = Number(t[1] ?? t[3]), r = Number(t[2] ?? t[4]);
	return n > 23 || r > 59 ? null : {
		value: String(n).padStart(2, "0") + ":" + String(r).padStart(2, "0"),
		minutes: n * 60 + r
	};
}
// node_modules/solyi-ui/dist/core/icons.js
var Ah = Object.freeze({
	check: "m5 12 4 4L19 6",
	close: "m6 6 12 12M18 6 6 18",
	copy: "M9 9h12v12H9V9ZM15 9V3H3v12h6",
	arrow: "M4 12h16m-6-6 6 6-6 6",
	external: "M14 4h6v6m0-6L10 14M10 4H4v16h16v-6",
	chevron: "m6 9 6 6 6-6",
	chevrons: "m6 5 6 6 6-6M6 13l6 6 6-6",
	search: "M20 20l-5-5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
	menu: "M4 6h16M4 12h16M4 18h16",
	more: "M5 12h.01M12 12h.01M19 12h.01",
	grip: "M8 5h.01M16 5h.01M8 12h.01M16 12h.01M8 19h.01M16 19h.01",
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
Object.freeze(Object.keys(Ah));
// node_modules/vuetify/lib/composables/border.js
var jh = Z({ border: [
	Boolean,
	Number,
	String
] }, "border");
function Mh(e, t = am()) {
	return { borderClasses: Y(() => {
		let n = e.border;
		return n === !0 || n === "" ? `${t}--border` : /* @__PURE__ */ Lu(n) || n === 0 ? String(n).split(" ").map((e) => `border-${e}`) : [];
	}) };
}
// node_modules/vuetify/lib/composables/density.js
var Nh = [
	null,
	"default",
	"comfortable",
	"compact"
], Ph = Z({ density: {
	type: String,
	default: "default",
	validator: (e) => Nh.includes(e)
} }, "density");
function Fh(e, t = am()) {
	return { densityClasses: /* @__PURE__ */ R(() => `${t}--density-${e.density}`) };
}
// node_modules/vuetify/lib/composables/elevation.js
var Ih = Z({
	elevation: {
		type: [Number, String],
		validator: (e) => parseInt(e) >= 0
	},
	hoverElevation: {
		type: [Number, String],
		validator: (e) => parseInt(e) >= 0
	}
}, "elevation");
function Lh(e) {
	return { elevationClasses: /* @__PURE__ */ R(() => {
		let t = /* @__PURE__ */ P(e) ? e.value : e.elevation, n = /* @__PURE__ */ P(e) ? null : e.hoverElevation;
		return [.../* @__PURE__ */ Wu(t) ? [] : [`elevation-${parseInt(t)}`], .../* @__PURE__ */ Wu(n) ? [] : [`hover-elevation-${parseInt(n)}`]];
	}) };
}
// node_modules/vuetify/lib/composables/rounded.js
var Rh = /^-?\d*\.?\d+([a-z%]{0,4})$/i;
function zh(e) {
	return String(e).trim().split(/\s+/);
}
function Bh(e) {
	return e.toLowerCase().match(Rh)?.at(1)?.startsWith("x") === !1;
}
function Vh(e) {
	return typeof e == "string" && !!e && (e.includes("(") || zh(e).every(Bh));
}
var Hh = Z({
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
function Uh(e, t = am()) {
	return {
		roundedClasses: Y(() => {
			let n = /* @__PURE__ */ P(e) ? e.value : e.rounded, r = !/* @__PURE__ */ P(e) && e.tile, i = [];
			if (r || n === !1 || String(n) === "0") i.push("rounded-0");
			else if (n === !0 || n === "") i.push(`${t}--rounded`);
			else if (/* @__PURE__ */ Lu(n) && !Vh(n)) for (let e of zh(n)) i.push(`rounded-${e}`);
			return i;
		}),
		roundedStyles: Y(() => {
			let t = /* @__PURE__ */ P(e) ? e.value : e.rounded;
			return (!Vh(t) || String(t) === "0") && (typeof t != "number" || t === 0) ? {} : { borderRadius: mf(t) };
		})
	};
}
// node_modules/vuetify/lib/composables/size.js
var Wh = [
	"x-small",
	"small",
	"default",
	"large",
	"x-large"
], Gh = Z({ size: {
	type: [String, Number],
	default: "default"
} }, "size");
function Kh(e, t = am()) {
	return If(() => {
		let n = e.size, r, i;
		return Lf(Wh, n) ? r = `${t}--size-${n}` : n && (i = {
			width: mf(n),
			height: mf(n)
		}), {
			sizeClasses: r,
			sizeStyles: i
		};
	});
}
// node_modules/vuetify/lib/composables/color.js
function qh(e) {
	return If(() => {
		let { class: t, style: n } = Zh(e);
		return {
			colorClasses: t,
			colorStyles: n
		};
	});
}
function Jh(e) {
	let { colorClasses: t, colorStyles: n } = qh(() => ({ text: pn(e) }));
	return {
		textColorClasses: t,
		textColorStyles: n
	};
}
function Yh(e) {
	let { colorClasses: t, colorStyles: n } = qh(() => ({ background: pn(e) }));
	return {
		backgroundColorClasses: t,
		backgroundColorStyles: n
	};
}
function Xh(e) {
	return {
		text: /* @__PURE__ */ Lu(e.text) ? e.text.replace(/^text-/, "") : e.text,
		background: /* @__PURE__ */ Lu(e.background) ? e.background.replace(/^bg-/, "") : e.background
	};
}
function Zh(e) {
	let t = Xh(pn(e)), n = [], r = {};
	if (t.background) {
		if (Hp(t.background)) {
			if (r.backgroundColor = t.background, !t.text && Up(t.background)) {
				let e = Kp(t.background);
				/* @__PURE__ */ Ru(e.a) && e.a !== 1 || n.push(rm(e) ? "v-theme-on-dark" : "v-theme-on-light");
			}
		} else n.push(`bg-${t.background}`);
	}
	return t.text && (Hp(t.text) ? (r.color = t.text, r.caretColor = t.text) : n.push(`text-${t.text}`)), {
		class: n,
		style: r
	};
}
// node_modules/vuetify/lib/composables/variant.js
var Qh = [
	"elevated",
	"flat",
	"tonal",
	"outlined",
	"text",
	"plain"
];
function $h(e, t) {
	return K(as, null, [e && K("span", {
		key: "overlay",
		class: ge(`${t}__overlay`)
	}, null), K("span", {
		key: "underlay",
		class: ge(`${t}__underlay`)
	}, null)]);
}
var eg = Z({
	color: String,
	variant: {
		type: String,
		default: "elevated",
		validator: (e) => Qh.includes(e)
	}
}, "variant");
function tg(e, t = am()) {
	let n = /* @__PURE__ */ R(() => {
		let { variant: n } = pn(e);
		return `${t}--variant-${n}`;
	}), { colorClasses: r, colorStyles: i } = qh(() => {
		let { variant: t, color: n } = pn(e);
		return { [["elevated", "flat"].includes(t) ? "background" : "text"]: n };
	});
	return {
		colorClasses: r,
		colorStyles: i,
		variantClasses: n
	};
}
// node_modules/vuetify/lib/components/VBtnGroup/VBtnGroup.js
var ng = Z({
	baseColor: String,
	connected: Boolean,
	divided: Boolean,
	direction: {
		type: String,
		default: "horizontal"
	},
	...jh(),
	...tf(),
	...Ph(),
	...Ih(),
	...Hh(),
	...Gh({ size: void 0 }),
	...vh(),
	...rh(),
	...eg()
}, "VBtnGroup"), rg = hm()({
	name: "VBtnGroup",
	props: ng(),
	setup(e, { slots: t }) {
		let { themeClasses: n } = hh(e), { densityClasses: r } = Fh(e), { borderClasses: i } = Mh(e), { elevationClasses: a } = Lh(e), { roundedClasses: o, roundedStyles: s } = Uh(e);
		dm({ VBtn: {
			height: /* @__PURE__ */ R(() => e.direction === "horizontal" && e.size == null ? "auto" : null),
			baseColor: /* @__PURE__ */ R(() => e.baseColor),
			color: /* @__PURE__ */ R(() => e.color),
			density: /* @__PURE__ */ R(() => e.density),
			flat: !0,
			size: /* @__PURE__ */ R(() => e.size),
			variant: /* @__PURE__ */ R(() => e.variant)
		} }), km(() => q(e.tag, {
			class: ge([
				"v-btn-group",
				`v-btn-group--${e.direction}`,
				{
					"v-btn-group--connected": e.connected,
					"v-btn-group--divided": e.divided,
					"v-btn-group--has-size": e.size != null
				},
				`v-btn-group--size-${e.size ?? "default"}`,
				n.value,
				i.value,
				r.value,
				a.value,
				o.value,
				e.class
			]),
			style: de([s.value, e.style])
		}, t));
	}
}), ig = Z({
	modelValue: {
		type: null,
		default: void 0
	},
	multiple: Boolean,
	mandatory: [Boolean, String],
	max: Number,
	selectedClass: String,
	disabled: Boolean
}, "group"), ag = Z({
	value: null,
	disabled: Boolean,
	selectedClass: String
}, "group-item");
function og(e, t, n = !0) {
	let r = im("useGroupItem");
	if (!r) throw Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
	let i = ri();
	_r(Symbol.for(`${t.description}:id`), i);
	let a = vr(t, null);
	if (!a) {
		if (!n) return a;
		throw Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
	}
	let o = /* @__PURE__ */ R(() => e.value), s = Y(() => !!(a.disabled.value || e.disabled));
	function c() {
		a?.register({
			id: i,
			value: o,
			disabled: s
		}, r);
	}
	function l() {
		a?.unregister(i);
	}
	c(), Qi(() => l());
	let u = Y(() => a.isSelected(i)), d = Y(() => a.items.value[0].id === i), f = Y(() => a.items.value[a.items.value.length - 1].id === i), p = Y(() => u.value && [a.selectedClass.value, e.selectedClass]);
	return V(u, (e) => {
		r.emit("group:selected", { value: e });
	}, { flush: "sync" }), {
		id: i,
		isSelected: u,
		isFirst: d,
		isLast: f,
		toggle: () => a.select(i, !u.value),
		select: (e) => a.select(i, e),
		selectedClass: p,
		value: o,
		disabled: s,
		group: a,
		register: c,
		unregister: l
	};
}
function sg(e, t) {
	let n = !1, r = /* @__PURE__ */ Xt([]), i = Lm(e, "modelValue", [], (e) => /* @__PURE__ */ Gu(e) ? [] : lg(r, /* @__PURE__ */ Uu(e) ? [null] : Ef(e)), (t) => {
		let n = ug(r, t);
		return e.multiple ? n : n[0];
	}), a = im("useGroup");
	function o(e, n) {
		let i = e, o = Pf(Symbol.for(`${t.description}:id`), a?.vnode).indexOf(n);
		/* @__PURE__ */ Gu(L(i.value)) && (i.value = o, i.useIndexAsValue = !0), o > -1 ? r.splice(o, 0, i) : r.push(i);
	}
	function s(e) {
		if (n) return;
		c();
		let t = r.findIndex((t) => t.id === e);
		r.splice(t, 1);
	}
	function c() {
		let t = r.find((e) => !e.disabled);
		t && e.mandatory === "force" && !i.value.length && (i.value = [t.id]);
	}
	Yi(() => {
		c();
	}), Qi(() => {
		n = !0;
	}), Zi(() => {
		for (let e = 0; e < r.length; e++) r[e].useIndexAsValue && (r[e].value = e);
	});
	function l(t, n) {
		let a = r.find((e) => e.id === t);
		if (!(n && a?.disabled)) {
			if (e.multiple) {
				let r = i.value.slice(), a = r.findIndex((e) => e === t), o = ~a;
				if (n ??= !o, o && e.mandatory && r.length <= 1 || !o && /* @__PURE__ */ Ru(e.max) && r.length + 1 > e.max) return;
				a < 0 && n ? r.push(t) : a >= 0 && !n && r.splice(a, 1), i.value = r;
			} else {
				let r = i.value.includes(t);
				if (e.mandatory && r || !r && !n) return;
				i.value = n ?? !r ? [t] : [];
			}
		}
	}
	function u(t) {
		if (e.multiple && nf("This method is not supported when using \"multiple\" prop"), i.value.length) {
			let e = i.value[0], n = r.findIndex((t) => t.id === e), a = (n + t) % r.length, o = r[a];
			for (; o.disabled && a !== n;) a = (a + t) % r.length, o = r[a];
			if (o.disabled) return;
			i.value = [r[a].id];
		} else {
			let e = r.find((e) => !e.disabled);
			e && (i.value = [e.id]);
		}
	}
	let d = {
		register: o,
		unregister: s,
		selected: i,
		select: l,
		disabled: /* @__PURE__ */ R(() => e.disabled),
		prev: () => u(r.length - 1),
		next: () => u(1),
		isSelected: (e) => i.value.includes(e),
		selectedClass: /* @__PURE__ */ R(() => e.selectedClass),
		items: /* @__PURE__ */ R(() => r),
		getItemIndex: (e) => cg(r, e)
	};
	return _r(t, d), d;
}
function cg(e, t) {
	let n = lg(e, [t]);
	return n.length ? e.findIndex((e) => e.id === n[0]) : -1;
}
function lg(e, t) {
	let n = [];
	return t.forEach((t) => {
		let r = e.find((e) => vm(t, e.value)), i = e[t];
		/* @__PURE__ */ Gu(r?.value) ? i?.useIndexAsValue && n.push(i.id) : n.push(r.id);
	}), n;
}
function ug(e, t) {
	let n = [];
	return t.forEach((t) => {
		let r = e.findIndex((e) => e.id === t);
		if (~r) {
			let t = e[r];
			n.push(/* @__PURE__ */ Gu(t.value) ? r : t.value);
		}
	}), n;
}
// node_modules/vuetify/lib/components/VBtnToggle/VBtnToggle.js
var dg = Symbol.for("vuetify:v-btn-toggle"), fg = Z({
	...ng(),
	...ig()
}, "VBtnToggle");
hm()({
	name: "VBtnToggle",
	props: fg(),
	emits: { "update:modelValue": (e) => !0 },
	setup(e, { slots: t }) {
		let { isSelected: n, next: r, prev: i, select: a, selected: o } = sg(e, dg);
		return km(() => {
			let s = rg.filterProps(e);
			return q(rg, ks({ class: [
				"v-btn-toggle",
				{ "v-btn-toggle--has-color": !!e.color },
				e.class
			] }, s, { style: e.style }), { default: () => [t.default?.({
				isSelected: n,
				next: r,
				prev: i,
				select: a,
				selected: o
			})] });
		}), {
			next: r,
			prev: i,
			select: a
		};
	}
});
// node_modules/vuetify/lib/components/VDefaultsProvider/VDefaultsProvider.js
var pg = Z({
	defaults: Object,
	disabled: Boolean,
	reset: [Number, String],
	root: [Boolean, String],
	scoped: Boolean
}, "VDefaultsProvider"), mg = hm(!1)({
	name: "VDefaultsProvider",
	props: pg(),
	setup(e, { slots: t }) {
		let { defaults: n, disabled: r, reset: i, root: a, scoped: o } = /* @__PURE__ */ vn(e);
		return dm(n, {
			reset: i,
			root: a,
			scoped: o,
			disabled: r
		}), () => t.default?.();
	}
}), hg = [
	String,
	Function,
	Object,
	Array
], gg = Symbol.for("vuetify:icons"), _g = Z({
	icon: { type: hg },
	tag: {
		type: [
			String,
			Object,
			Function
		],
		required: !0
	}
}, "icon"), vg = hm()({
	name: "VComponentIcon",
	props: _g(),
	setup(e, { slots: t }) {
		return () => {
			let n = e.icon;
			return q(e.tag, null, { default: () => [e.icon ? q(n, null, null) : t.default?.()] });
		};
	}
}), yg = mm({
	name: "VSvgIcon",
	inheritAttrs: !1,
	props: _g(),
	setup(e, { attrs: t }) {
		return () => q(e.tag, ks(t, { style: null }), { default: () => [K("svg", {
			class: "v-icon__svg",
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 24 24",
			role: "img",
			"aria-hidden": "true"
		}, [Array.isArray(e.icon) ? e.icon.map((e) => Array.isArray(e) ? K("path", {
			d: e[0],
			"fill-opacity": e[1]
		}, null) : K("path", { d: e }, null)) : K("path", { d: e.icon }, null)])] });
	}
});
mm({
	name: "VLigatureIcon",
	props: _g(),
	setup(e) {
		return () => q(e.tag, null, { default: () => [e.icon] });
	}
});
var bg = mm({
	name: "VClassIcon",
	props: _g(),
	setup(e) {
		return () => q(e.tag, { class: ge(e.icon) }, null);
	}
}), xg = (e) => {
	let t = vr(gg);
	if (!t) throw Error("Missing Vuetify Icons provide!");
	return { iconData: Y(() => {
		let n = pn(e);
		if (!n) return { component: vg };
		let r = n;
		if (/* @__PURE__ */ Lu(r) && (r = r.trim(), r.startsWith("$") && (r = t.aliases?.[r.slice(1)])), r || nf(`Could not find aliased icon "${n}"`), Array.isArray(r)) return {
			component: yg,
			icon: r
		};
		if (!/* @__PURE__ */ Lu(r)) return {
			component: vg,
			icon: r
		};
		let i = Object.keys(t.sets).find((e) => /* @__PURE__ */ Lu(r) && r.startsWith(`${e}:`)), a = i ? r.slice(i.length + 1) : r;
		return {
			component: t.sets[i ?? t.defaultSet].component,
			icon: a
		};
	}) };
}, Sg = Z({
	color: String,
	disabled: Boolean,
	start: Boolean,
	end: Boolean,
	icon: hg,
	opacity: [String, Number],
	...tf(),
	...Gh(),
	...vh({ tag: "i" }),
	...rh()
}, "VIcon"), Cg = hm()({
	name: "VIcon",
	props: Sg(),
	setup(e, { attrs: t, slots: n }) {
		let r = /* @__PURE__ */ I(), { themeClasses: i } = hh(e), { iconData: a } = xg(() => r.value || e.icon), { sizeClasses: o } = Kh(e), { textColorClasses: s, textColorStyles: c } = Jh(() => e.color);
		return km(() => {
			let l = n.default?.();
			l && (r.value = Mf(l).filter((e) => e.type === os && e.children && /* @__PURE__ */ Lu(e.children))[0]?.children);
			let u = !!(t.onClick || t.onClickOnce);
			return q(a.value.component, {
				tag: e.tag,
				icon: a.value.icon,
				class: ge([
					"v-icon",
					"notranslate",
					i.value,
					o.value,
					s.value,
					{
						"v-icon--clickable": u,
						"v-icon--disabled": e.disabled,
						"v-icon--start": e.start,
						"v-icon--end": e.end
					},
					e.class
				]),
				style: de([
					{ "--v-icon-opacity": e.opacity },
					o.value ? void 0 : {
						fontSize: mf(e.size),
						height: mf(e.size),
						width: mf(e.size)
					},
					c.value,
					e.style
				]),
				role: u ? "button" : void 0,
				"aria-hidden": !u,
				tabindex: u ? e.disabled ? -1 : 0 : void 0
			}, { default: () => [l] });
		}), {};
	}
});
// node_modules/vuetify/lib/components/VProgressLinear/waves.js
function wg(e) {
	return Math.round(e * 1e3) / 1e3;
}
function Tg(e) {
	return e > 10 && e < 95;
}
function Eg(e, t, n, r, i, a = e) {
	let o = 2 * Math.PI / i, s = (e) => n + r * Math.sin(o * (e - a)), c = (e) => r * o * Math.cos(o * (e - a)), l = `M ${wg(e)} ${wg(s(e))}`;
	for (let n = e; n < t; n += i / 4) {
		let e = Math.min(n + i / 4, t), r = (e - n) / 3;
		l += ` C ${wg(n + r)} ${wg(s(n) + c(n) * r)} ${wg(e - r)} ${wg(s(e) - c(e) * r)} ${wg(e)} ${wg(s(e))}`;
	}
	return l;
}
function Dg(e, t, n, r) {
	let i = r * 4, a = 2 * Math.PI / i;
	function o(i) {
		let o = i * a, s = Math.cos(o), c = Math.sin(o), l = t + n * Math.sin(r * o), u = n * r * Math.cos(r * o);
		return {
			x: e + l * s,
			y: e + l * c,
			dx: (u * s - l * c) * a / 3,
			dy: (u * c + l * s) * a / 3
		};
	}
	let s = o(0);
	return `M ${wg(s.x)} ${wg(s.y)}` + (/* @__PURE__ */ ed(i + 4)).map((e) => {
		let t = o(e), n = o(e + 1);
		return ` C ${wg(t.x + t.dx)} ${wg(t.y + t.dy)} ${wg(n.x - n.dx)} ${wg(n.y - n.dy)} ${wg(n.x)} ${wg(n.y)}`;
	}).join("");
}
// node_modules/vuetify/lib/composables/reveal.js
var Og = Z({ reveal: {
	type: [Boolean, Object],
	default: !1
} }, "reveal");
function kg(e) {
	let t = /* @__PURE__ */ R(() => /* @__PURE__ */ Bu(e.reveal) ? Math.max(0, Number(e.reveal.duration ?? 900)) : 900), n = /* @__PURE__ */ I(e.reveal ? "initial" : "disabled");
	return Yi(async () => {
		e.reveal && (n.value = "initial", await new Promise((e) => requestAnimationFrame(e)), n.value = "pending", await new Promise((e) => setTimeout(e, t.value)), n.value = "done");
	}), {
		duration: t,
		state: n
	};
}
// node_modules/vuetify/lib/components/VProgressCircular/VProgressCircular.js
var Ag = 1.6, jg = 15, Mg = 4, Ng = Z({
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
		validator: (e) => ["flat", "wavy"].includes(e)
	},
	variant: {
		type: String,
		default: void 0,
		validator: (e) => ["split"].includes(e)
	},
	transition: {
		type: [Boolean, Object],
		default: void 0
	},
	width: {
		type: [Number, String],
		default: 4
	},
	...tf(),
	...Og(),
	...Gh(),
	...vh({ tag: "div" }),
	...rh()
}, "VProgressCircular"), Pg = hm()({
	name: "VProgressCircular",
	props: Ng(),
	setup(e, { slots: t }) {
		let n = 2 * Math.PI * 20, r = /* @__PURE__ */ I(), { themeClasses: i } = hh(e), { sizeClasses: a, sizeStyles: o } = Kh(e), { textColorClasses: s, textColorStyles: c } = Jh(() => e.color), { textColorClasses: l, textColorStyles: u } = Jh(() => e.bgColor), { width: d } = Kd(r), { isIntersecting: f } = Jd(r), { state: p, duration: m } = kg(e), h = /* @__PURE__ */ R(() => p.value === "initial" ? 0 : Df(parseFloat(e.modelValue), 0, 100)), g = /* @__PURE__ */ R(() => Number(e.width)), _ = /* @__PURE__ */ R(() => e.transition === !1 ? void 0 : mf(/* @__PURE__ */ Bu(e.transition) ? e.transition.duration : void 0, "ms")), v = /* @__PURE__ */ R(() => o.value ? Number(e.size) : d.value ? d.value : Math.max(g.value, 32)), y = /* @__PURE__ */ R(() => 20 / (1 - g.value / v.value) * 2), b = /* @__PURE__ */ R(() => g.value / v.value * y.value), x = /* @__PURE__ */ R(() => {
			let t = (100 - h.value) / 100 * n;
			return e.rounded && h.value > 0 && h.value < 100 ? mf(Math.min(n - .01, t + b.value)) : mf(t);
		}), S = Y(() => {
			let t = Number(e.rotate);
			return e.rounded ? t + b.value / 2 / n * 360 : t;
		}), C = /* @__PURE__ */ R(() => e.shape === "wavy"), w = Y(() => {
			if (e.variant !== "split" && !C.value) return;
			let t = y.value / v.value, r = C.value && (e.indeterminate || Tg(h.value)) ? Ag * t : 0, i = Math.max(3, Math.floor(n / (jg * t))), a = y.value / 2, o = "A 20 20 0 1 1", s = e.rounded || C.value;
			return {
				waves: i,
				linecap: s ? "round" : "butt",
				gap: (Mg * t + (s ? b.value : 0)) / n * 100,
				track: `M ${a + 20} ${a}` + ` ${o} ${a - 20} ${a} ${o} ${a + 20} ${a}`.repeat(2),
				wave: Dg(a, 20 - r, r, i)
			};
		});
		return km(() => q(e.tag, {
			ref: r,
			class: ge([
				"v-progress-circular",
				{
					"v-progress-circular--indeterminate": !!e.indeterminate,
					"v-progress-circular--visible": f.value,
					"v-progress-circular--variant-split": e.variant === "split",
					"v-progress-circular--shape-wavy": C.value,
					"v-progress-circular--disable-shrink": e.indeterminate && (e.indeterminate === "disable-shrink" || uf()),
					"v-progress-circular--revealing": ["initial", "pending"].includes(p.value),
					"v-progress-circular--no-transition": e.transition === !1
				},
				i.value,
				a.value,
				s.value,
				e.class
			]),
			style: de([
				o.value,
				c.value,
				{
					"--v-progress-reveal-duration": `${m.value}ms`,
					"--v-progress-circular-transition-duration": _.value
				},
				e.style
			]),
			role: "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": "100",
			"aria-valuenow": e.indeterminate ? void 0 : h.value
		}, { default: () => [K("svg", {
			style: { transform: `rotate(calc(-90deg + ${S.value}deg))` },
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: `0 0 ${y.value} ${y.value}`
		}, [w.value ? K("g", {
			class: "v-progress-circular__split",
			style: {
				"--v-progress-circular-value": h.value,
				"--v-progress-circular-stroke": mf(b.value),
				"--v-progress-circular-waves": w.value.waves,
				"--v-progress-circular-gap": w.value.gap
			}
		}, [K("path", {
			class: ge([
				"v-progress-circular__underlay",
				"v-progress-circular__track",
				l.value
			]),
			style: de(u.value),
			d: w.value.track,
			pathLength: "200",
			"stroke-linecap": w.value.linecap
		}, null), K("path", {
			class: "v-progress-circular__wave",
			style: { d: `path("${w.value.wave}")` },
			d: w.value.wave,
			pathLength: 100 + 100 / w.value.waves,
			"stroke-linecap": w.value.linecap
		}, null)]) : K(as, null, [K("circle", {
			class: ge(["v-progress-circular__underlay", l.value]),
			style: de(u.value),
			fill: "transparent",
			cx: "50%",
			cy: "50%",
			r: 20,
			"stroke-width": b.value,
			"stroke-dasharray": n,
			"stroke-dashoffset": 0
		}, null), K("circle", {
			class: "v-progress-circular__overlay",
			fill: "transparent",
			cx: "50%",
			cy: "50%",
			r: 20,
			"stroke-width": b.value,
			"stroke-dasharray": n,
			"stroke-dashoffset": x.value,
			"stroke-linecap": e.rounded ? "round" : void 0
		}, null)])]), t.default && K("div", { class: "v-progress-circular__content" }, [t.default({ value: h.value })])] })), {};
	}
}), Fg = Z({
	height: [Number, String],
	maxHeight: [Number, String],
	maxWidth: [Number, String],
	minHeight: [Number, String],
	minWidth: [Number, String],
	width: [Number, String]
}, "dimension");
function Ig(e) {
	return { dimensionStyles: Y(() => {
		let t = {}, n = mf(e.height), r = mf(e.maxHeight), i = mf(e.maxWidth), a = mf(e.minHeight), o = mf(e.minWidth), s = mf(e.width);
		return n && (t.height = n), r && (t.maxHeight = r), i && (t.maxWidth = i), a && (t.minHeight = a), o && (t.minWidth = o), s && (t.width = s), t;
	}) };
}
// node_modules/vuetify/lib/composables/location.js
var Lg = {
	center: "center",
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
}, Rg = Z({ location: String }, "location");
function zg(e, t = !1, n) {
	let { isRtl: r } = th();
	return { locationStyles: Y(() => {
		if (!e.location) return {};
		let { side: i, align: a } = Qf(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, r.value);
		function o(e) {
			return n ? n(e) : 0;
		}
		let s = {};
		return i !== "center" && (t ? s[Lg[i]] = `calc(100% - ${o(i)}px)` : s[i] = 0), a === "center" ? (i === "center" ? s.top = s.left = "50%" : s[{
			top: "left",
			bottom: "left",
			left: "top",
			right: "top"
		}[i]] = "50%", s.transform = {
			top: "translateX(-50%)",
			bottom: "translateX(-50%)",
			left: "translateY(-50%)",
			right: "translateY(-50%)",
			center: "translate(-50%, -50%)"
		}[i]) : t ? s[Lg[a]] = `calc(100% - ${o(a)}px)` : s[a] = 0, s;
	}) };
}
// node_modules/vuetify/lib/components/VProgressLinear/chunks.js
var Bg = Z({
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
		validator: (e) => ["split"].includes(e)
	}
}, "chunks");
function Vg(e, t, n, r, i) {
	let a = /* @__PURE__ */ R(() => e.variant === "split"), o = /* @__PURE__ */ R(() => a.value ? 2 : Number(e.chunkCount) || 0), s = /* @__PURE__ */ R(() => !a.value && (!!o.value || !!e.chunkWidth)), c = Y(() => {
		let n = pn(t);
		return n ? o.value ? (n - Number(e.chunkGap) * (o.value - 1)) / o.value : Number(e.chunkWidth) : 0;
	}), l = /* @__PURE__ */ R(() => Number(e.chunkGap)), u = Y(() => {
		if (!s.value) return {};
		let e = mf(l.value), t = mf(c.value);
		return {
			maskRepeat: "repeat-x",
			maskImage: `linear-gradient(90deg, #000, #000 ${t}, transparent ${t}, transparent)`,
			maskSize: `calc(${t} + ${e}) 100%`
		};
	}), d = Y(() => {
		if (!a.value) return;
		let e = mf(l.value / 2), t = pn(i) ? "right" : "left", o = pn(n);
		if (o >= 100) return;
		let s = pn(r), c = o > 0, u = s > o && s < 100;
		if (!c && !u) return;
		let d = mf(o, "%"), f = mf(s, "%"), p = u ? f : d;
		return {
			bar: c ? { width: `calc(${d} - ${e})` } : void 0,
			buffer: u ? {
				[t]: c ? `calc(${d} + ${e})` : 0,
				width: c ? `calc(${f} - ${d} - ${mf(l.value)})` : `calc(${f} - ${e})`
			} : void 0,
			background: {
				[t]: `calc(${p} + ${e})`,
				width: `calc(100% - ${p} - ${e})`
			}
		};
	});
	function f(e) {
		if (a.value) return e;
		let n = pn(t);
		if (!n) return e;
		let r = 100 * l.value / n, i = 100 * (c.value + l.value) / n;
		return Df(Math.floor((e + r) / i + 1e-9) * i - r / 2, 0, 100);
	}
	return {
		hasChunks: /* @__PURE__ */ R(() => s.value || a.value),
		isSplit: a,
		chunkCount: o,
		chunksMaskStyles: u,
		splitStyles: d,
		snapValueToChunk: f
	};
}
function Hg(e, { containerWidth: t, value: n, isActive: r, duration: i }) {
	let a = /* @__PURE__ */ R(() => e.shape === "wavy"), o = Y(() => {
		let n = pn(t);
		if (!a.value || !n) return;
		let r = parseFloat(e.height), i = e.indeterminate ? 20 : 40, o = r / 2 + 3, s = r / 2, c = Math.max(n - s, s + 1), l = c - s;
		return {
			width: n,
			stroke: r,
			wavelength: i,
			center: o,
			start: s,
			end: c,
			offset: i / l * 100,
			gap: (parseFloat(e.chunkGap) + r) / l * 100,
			track: `M ${s} ${o} H ${c}`,
			wave: e.indeterminate ? Eg(s - i, c, o, 3, i) : ""
		};
	}), s = /* @__PURE__ */ I(), c = /* @__PURE__ */ I(), l = /* @__PURE__ */ R(() => a.value && !e.indeterminate && pn(r) && !!s.value), u = pn(n), d = 0, f = +!!Tg(u), p = 0, m = 0, h = 0, g = -1;
	function _() {
		if (!o.value || !s.value || !c.value) return;
		let { start: e, end: t, center: n, wavelength: r } = o.value, i = e + (t - e) * u / 100, a = f * f * (3 - 2 * f);
		c.value.setAttribute("d", Eg(e, i, n, 3 * a, r, p)), s.value.style.setProperty("--v-progress-linear-value", String(u));
	}
	function v(e) {
		let t = h ? Math.min(e - h, 100) / 1e3 : 0;
		h = e;
		let r = pn(n), i = 4e3 / m;
		if (!Number.isFinite(i)) u = r, d = 0;
		else {
			let e = u - r, n = Math.exp(-i * t), a = d + i * e;
			u = r + (e + a * t) * n, d = (d - i * a * t) * n, Math.abs(u - r) < .01 && Math.abs(d) < .01 && (u = r, d = 0);
		}
		let a = +!!Tg(u);
		f = a > f ? Math.min(f + t * 2, 1) : Math.max(f - t * 2, 0);
		let s = uf(), c = o.value?.wavelength ?? 40;
		s || (p = (p - t * c) % c), _();
		let y = u === r && f === a;
		g = l.value && (!y || !s && f) ? requestAnimationFrame(v) : -1;
	}
	return V([l, () => pn(n)], () => {
		l.value && (m = i(), !(g >= 0) && (h = 0, g = requestAnimationFrame(v)));
	}, {
		immediate: !0,
		flush: "post"
	}), V([s, o], _, { flush: "post" }), Pe(() => cancelAnimationFrame(g)), {
		geometry: o,
		svgEl: s,
		waveEl: c
	};
}
// node_modules/vuetify/lib/components/VProgressLinear/VProgressLinear.js
var Ug = Z({
	absolute: Boolean,
	active: {
		type: Boolean,
		default: !0
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
		validator: (e) => ["flat", "wavy"].includes(e)
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
	...Bg(),
	...tf(),
	...Rg({ location: "top" }),
	...Og(),
	...Hh(),
	...vh(),
	...rh()
}, "VProgressLinear"), Wg = hm()({
	name: "VProgressLinear",
	props: Ug(),
	emits: { "update:modelValue": (e) => !0 },
	setup(e, { slots: t }) {
		let n = /* @__PURE__ */ I(), r = Lm(e, "modelValue"), { isRtl: i, rtlClasses: a } = th(), { themeClasses: o } = hh(e), { locationStyles: s } = zg(e), { textColorClasses: c, textColorStyles: l } = Jh(() => e.color), { backgroundColorClasses: u, backgroundColorStyles: d } = Yh(() => e.bgColor || e.color), { backgroundColorClasses: f, backgroundColorStyles: p } = Yh(() => e.bufferColor || e.bgColor || e.color), { backgroundColorClasses: m, backgroundColorStyles: h } = Yh(() => e.color), { textColorClasses: g, textColorStyles: _ } = Jh(() => e.bgColor), { roundedClasses: v, roundedStyles: y } = Uh(e), { isIntersecting: b } = Jd(n), { state: x, duration: S } = kg(e), C = Y(() => parseFloat(e.max)), w = Y(() => mf(e.height)), T = Y(() => Df(parseFloat(e.bufferValue) / C.value * 100, 0, 100)), E = Y(() => x.value === "initial" ? 0 : Df(parseFloat(r.value) / C.value * 100, 0, 100)), D = Y(() => i.value !== e.reverse), O = Y(() => e.transition === !1 ? void 0 : mf(/* @__PURE__ */ Bu(e.transition) ? e.transition.duration : void 0, "ms")), k = /* @__PURE__ */ R(() => /* @__PURE__ */ Wu(e.bgOpacity) ? void 0 : parseFloat(e.bgOpacity)), A = /* @__PURE__ */ R(() => e.shape === "wavy"), j = /* @__PURE__ */ R(() => !e.indeterminate && (A.value ? e.stopIndicator !== !1 : e.variant === "split" && e.stopIndicator === !0)), ee = Y(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), M = /* @__PURE__ */ I(0), { hasChunks: te, splitStyles: ne, chunksMaskStyles: re, snapValueToChunk: ie } = Vg(e, M, E, T, D);
		Im(() => te.value || A.value, () => {
			Gd(n, (e) => {
				M.value = e[0].contentRect.width;
			});
		});
		let ae = Y(() => te.value ? ie(T.value) : T.value), oe = Y(() => te.value ? ie(E.value) : E.value), { geometry: se, svgEl: ce, waveEl: le } = Hg(e, {
			containerWidth: M,
			value: E,
			isActive: () => e.active && b.value,
			duration: () => {
				if (x.value === "pending") return S.value;
				let e = getComputedStyle(n.value).getPropertyValue("--v-progress-linear-transition-duration").trim();
				return parseFloat(e) * (e.endsWith("ms") ? 1 : 1e3);
			}
		});
		function ue(e) {
			if (!n.value) return;
			let { left: t, right: i, width: a } = n.value.getBoundingClientRect(), o = D.value ? a - e.clientX + (i - a) : e.clientX - t;
			r.value = Math.round(o / a * C.value);
		}
		function fe() {
			return K("div", {
				class: ge(["v-progress-linear__background", u.value]),
				style: de([
					d.value,
					{
						opacity: k.value,
						width: e.stream ? 0 : void 0
					},
					e.indeterminate ? {} : ne.value?.background
				])
			}, null);
		}
		function pe() {
			if (!se.value) return null;
			let { width: t, stroke: n, wavelength: r, center: i, end: a, gap: o, track: s, wave: u, offset: d } = se.value;
			function f() {
				return K("path", {
					class: ge(["v-progress-linear__track", g.value]),
					style: de([_.value, { opacity: k.value }]),
					d: s,
					pathLength: "100"
				}, null);
			}
			function p(e) {
				return K("path", {
					class: ge(["v-progress-linear__wave", e]),
					d: u,
					pathLength: 100 + d
				}, null);
			}
			return K("svg", {
				ref: ce,
				class: ge([
					"v-progress-linear__wavy",
					{ "v-progress-linear__wavy--indeterminate": e.indeterminate },
					c.value
				]),
				style: de([l.value, {
					"--v-progress-linear-stroke": mf(n),
					"--v-progress-linear-wavelength": mf(r),
					"--v-progress-linear-wave-offset": d,
					"--v-progress-linear-wave-gap": o
				}]),
				viewBox: `0 0 ${t} ${i * 2}`
			}, [e.indeterminate ? K(as, null, [
				f(),
				f(),
				f(),
				p("long"),
				p("short")
			]) : K(as, null, [
				f(),
				j.value && K("circle", {
					class: "v-progress-linear__stop",
					cx: a,
					cy: i
				}, null),
				K("path", {
					ref: le,
					class: "v-progress-linear__wave"
				}, null)
			])]);
		}
		return km(() => q(e.tag, {
			ref: n,
			class: ge([
				"v-progress-linear",
				{
					"v-progress-linear--absolute": e.absolute,
					"v-progress-linear--active": e.active && b.value,
					"v-progress-linear--reverse": D.value,
					"v-progress-linear--rounded": e.rounded,
					"v-progress-linear--rounded-bar": e.roundedBar,
					"v-progress-linear--striped": e.striped,
					"v-progress-linear--clickable": e.clickable,
					"v-progress-linear--no-transition": e.transition === !1,
					"v-progress-linear--revealing": ["initial", "pending"].includes(x.value),
					"v-progress-linear--variant-split": e.variant === "split",
					"v-progress-linear--shape-wavy": A.value
				},
				v.value,
				o.value,
				a.value,
				e.class
			]),
			style: de([
				{
					bottom: e.location === "bottom" ? 0 : void 0,
					top: e.location === "top" ? 0 : void 0,
					height: e.active ? A.value ? mf(parseFloat(e.height) + 6) : w.value : 0,
					"--v-progress-linear-height": w.value,
					"--v-progress-linear-transition-duration": O.value,
					"--v-progress-reveal-duration": `${S.value}ms`,
					"--v-progress-chunk-gap": mf(e.chunkGap),
					...e.absolute ? s.value : {}
				},
				A.value ? void 0 : re.value,
				y.value,
				e.style
			]),
			role: "progressbar",
			"aria-hidden": e.active ? "false" : "true",
			"aria-valuemin": "0",
			"aria-valuemax": e.max,
			"aria-valuenow": e.indeterminate ? void 0 : Math.min(parseFloat(r.value), C.value),
			onClick: e.clickable && ue
		}, { default: () => [A.value ? pe() : K(as, null, [
			e.stream && K("div", {
				key: "stream",
				class: ge(["v-progress-linear__stream", c.value]),
				style: {
					...l.value,
					[D.value ? "left" : "right"]: `calc(${w.value} * -1)`,
					borderTop: `calc(${w.value} / 2) dotted`,
					opacity: e.bufferOpacity == null ? void 0 : parseFloat(e.bufferOpacity),
					top: `calc(50% - ${w.value} / 4)`,
					width: mf(100 - T.value, "%"),
					"--v-progress-linear-stream-to": `calc(${w.value} * ${D.value ? 1 : -1})`
				}
			}, null),
			(e.variant !== "split" || !e.indeterminate) && fe(),
			K("div", {
				class: ge(["v-progress-linear__buffer", f.value]),
				style: de([
					p.value,
					{
						opacity: e.bufferOpacity == null ? void 0 : parseFloat(e.bufferOpacity),
						width: mf(ae.value, "%")
					},
					ne.value?.buffer
				])
			}, null),
			j.value && K("div", {
				class: ge(["v-progress-linear__stop", m.value]),
				style: de(h.value)
			}, null),
			q(wc, { name: ee.value }, { default: () => [e.indeterminate ? K("div", { class: "v-progress-linear__indeterminate" }, [e.variant === "split" && K(as, null, [
				fe(),
				fe(),
				fe()
			]), ["long", "short"].map((e) => K("div", {
				key: e,
				class: ge([
					"v-progress-linear__indeterminate",
					e,
					m.value
				]),
				style: de(h.value)
			}, null))]) : K("div", {
				class: ge(["v-progress-linear__determinate", m.value]),
				style: de([
					h.value,
					{ width: mf(oe.value, "%") },
					ne.value?.bar
				])
			}, null)] })
		]), t.default && K("div", { class: "v-progress-linear__content" }, [t.default({
			value: E.value,
			buffer: T.value
		})])] })), {};
	}
}), Gg = Z({ loading: [Boolean, String] }, "loader");
function Kg(e, t = am()) {
	return { loaderClasses: /* @__PURE__ */ R(() => ({ [`${t}--loading`]: e.loading })) };
}
function qg(e, { slots: t }) {
	return K("div", { class: ge(`${e.name}__loader`) }, [t.default?.({
		color: e.color,
		isActive: e.active
	}) || q(Wg, {
		absolute: e.absolute,
		active: e.active,
		color: e.color,
		height: "2",
		indeterminate: !0
	}, null)]);
}
// node_modules/vuetify/lib/composables/position.js
var Jg = [
	"static",
	"relative",
	"fixed",
	"absolute",
	"sticky"
], Yg = Z({ position: {
	type: String,
	validator: /* istanbul ignore next */ (e) => Jg.includes(e)
} }, "position");
function Xg(e, t = am()) {
	return { positionClasses: /* @__PURE__ */ R(() => e.position ? `${t}--${e.position}` : void 0) };
}
// node_modules/vuetify/lib/composables/router.js
function Zg() {
	let e = im("useRoute");
	return Y(() => e?.proxy?.$route);
}
function Qg() {
	return im("useRouter")?.proxy?.$router;
}
function $g(e, t) {
	let n = sa("RouterLink"), r = /* @__PURE__ */ R(() => !!(e.href || e.to)), i = Y(() => r?.value || Bf(t, "click") || Bf(e, "click"));
	if (/* @__PURE__ */ Lu(n) || !("useLink" in n)) {
		let t = /* @__PURE__ */ R(() => e.href);
		return {
			isLink: r,
			isRouterLink: /* @__PURE__ */ R(() => !1),
			isClickable: i,
			href: t,
			linkProps: /* @__PURE__ */ Xt({ href: t }),
			route: /* @__PURE__ */ R(() => void 0),
			navigate: /* @__PURE__ */ R(() => void 0)
		};
	}
	let a = n.useLink({
		to: /* @__PURE__ */ R(() => e.to || ""),
		replace: /* @__PURE__ */ R(() => e.replace)
	}), o = Y(() => e.to ? a : void 0), s = Zg(), c = Y(() => o.value ? s.value && s.value.matched.length === 0 && s.value.name == null ? o.value.isExactActive?.value ?? !1 : e.exact ? s.value ? o.value.isExactActive?.value && vm(o.value.route.value.query, s.value.query) : o.value.isExactActive?.value ?? !1 : o.value.isActive?.value ?? !1 : !1), l = Y(() => e.to ? o.value?.route.value.href : e.href);
	return {
		isLink: r,
		isRouterLink: /* @__PURE__ */ R(() => !!e.to),
		isClickable: i,
		isActive: c,
		route: /* @__PURE__ */ R(() => o.value?.route.value),
		navigate: /* @__PURE__ */ R(() => o.value?.navigate),
		href: l,
		linkProps: /* @__PURE__ */ Xt({
			href: l,
			"aria-current": /* @__PURE__ */ R(() => c.value ? "page" : void 0),
			"aria-disabled": /* @__PURE__ */ R(() => e.disabled && r.value ? "true" : void 0),
			tabindex: /* @__PURE__ */ R(() => e.disabled && r.value ? "-1" : void 0)
		})
	};
}
var e_ = Z({
	href: String,
	replace: Boolean,
	to: [String, Object],
	exact: Boolean
}, "router"), t_ = !1;
function n_(e, t) {
	let n = !1, r = !1, i, a;
	of && e?.beforeEach && (z(() => {
		r || (window.addEventListener("popstate", o), i = e.beforeEach(() => t_ ? n ? t() : void 0 : (t_ = !0, new Promise((e) => {
			setTimeout(() => e(n ? t() : void 0));
		}))), a = e?.afterEach(() => {
			t_ = !1;
		}));
	}), Pe(() => {
		r = !0, window.removeEventListener("popstate", o), i?.(), a?.();
	}));
	function o(e) {
		e.state?.replaced || (n = !0, setTimeout(() => n = !1));
	}
}
// node_modules/vuetify/lib/composables/selectLink.js
function r_(e, t) {
	V(() => e.isActive?.value, (n) => {
		e.isLink.value && /* @__PURE__ */ zu(n) && t && z(() => {
			t(n);
		});
	}, { immediate: !0 });
}
// node_modules/vuetify/lib/directives/ripple/index.js
var i_ = Symbol("rippleStop"), a_ = 80;
function o_(e, t) {
	e.style.transform = t, e.style.webkitTransform = t;
}
function s_(e) {
	return e.constructor.name === "TouchEvent";
}
function c_(e) {
	return e.constructor.name === "KeyboardEvent";
}
var l_ = (e, t, n = {}) => {
	let r = 0, i = 0;
	if (!c_(e)) {
		let n = new ip(t), a = s_(e) ? e.touches[e.touches.length - 1] : e, o = op([a.clientX, a.clientY]);
		r = o.x - n.left, i = o.y - n.top;
	}
	let a = 0, o = .3;
	t._ripple?.circle ? (o = .15, a = t.clientWidth / 2, a = n.center ? a : a + Math.sqrt((r - a) ** 2 + (i - a) ** 2) / 4) : a = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
	let s = `${(t.clientWidth - a * 2) / 2}px`, c = `${(t.clientHeight - a * 2) / 2}px`, l = n.center ? s : `${r - a}px`, u = n.center ? c : `${i - a}px`;
	return {
		radius: a,
		scale: o,
		x: l,
		y: u,
		centerX: s,
		centerY: c
	};
}, u_ = {
	show(e, t, n = {}) {
		if (!t?._ripple?.enabled) return;
		let r = document.createElement("span"), i = document.createElement("span");
		r.appendChild(i), r.className = "v-ripple__container", n.class && (r.className += ` ${n.class}`);
		let { radius: a, scale: o, x: s, y: c, centerX: l, centerY: u } = l_(e, t, n), d = `${a * 2}px`;
		i.className = "v-ripple__animation", i.style.width = d, i.style.height = d, t.appendChild(r);
		let f = window.getComputedStyle(t);
		f && f.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), i.classList.add("v-ripple__animation--enter"), i.classList.add("v-ripple__animation--visible"), o_(i, `translate(${s}, ${c}) scale3d(${o},${o},${o})`), i.dataset.activated = String(performance.now()), requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				i.classList.remove("v-ripple__animation--enter"), i.classList.add("v-ripple__animation--in"), o_(i, `translate(${l}, ${u}) scale3d(1,1,1)`);
			});
		});
	},
	hide(e) {
		if (!e?._ripple?.enabled) return;
		let t = e.getElementsByClassName("v-ripple__animation");
		if (t.length === 0) return;
		let n = Array.from(t).findLast((e) => !e.dataset.isHiding);
		if (n) n.dataset.isHiding = "true";
		else return;
		let r = performance.now() - Number(n.dataset.activated), i = Math.max(250 - r, 0);
		setTimeout(() => {
			n.classList.remove("v-ripple__animation--in"), n.classList.add("v-ripple__animation--out"), setTimeout(() => {
				e.getElementsByClassName("v-ripple__animation").length === 1 && e.dataset.previousPosition && (e.style.position = e.dataset.previousPosition, delete e.dataset.previousPosition), n.parentNode?.parentNode === e && e.removeChild(n.parentNode);
			}, 300);
		}, i);
	}
};
function d_(e) {
	return e === void 0 || !!e;
}
function f_(e) {
	let t = {}, n = e.currentTarget;
	if (!(!n?._ripple || n._ripple.touched || e[i_])) {
		if (e[i_] = !0, s_(e)) n._ripple.touched = !0, n._ripple.isTouch = !0;
		else if (n._ripple.isTouch) return;
		if (t.center = n._ripple.centered || c_(e), n._ripple.class && (t.class = n._ripple.class), s_(e)) {
			if (n._ripple.showTimerCommit) return;
			n._ripple.showTimerCommit = () => {
				u_.show(e, n, t);
			}, n._ripple.showTimer = window.setTimeout(() => {
				n?._ripple?.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
			}, a_);
		} else u_.show(e, n, t);
	}
}
function p_(e) {
	e[i_] = !0;
}
function m_(e) {
	let t = e.currentTarget;
	t?._ripple && (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit ? (t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
		m_(e);
	})) : (window.setTimeout(() => {
		t._ripple && (t._ripple.touched = !1);
	}), u_.hide(t)));
}
function h_(e) {
	let t = e.currentTarget;
	t?._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
var g_ = !1;
function __(e, t) {
	!g_ && t.includes(e.key) && (g_ = !0, f_(e));
}
function v_(e) {
	g_ = !1, m_(e);
}
function y_(e) {
	g_ && (g_ = !1, m_(e));
}
function b_(e, t, n) {
	let { value: r, modifiers: i } = t, a = d_(r);
	a || u_.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = a, e._ripple.centered = i.center, e._ripple.circle = i.circle;
	let o = /* @__PURE__ */ Bu(r) ? r : {};
	o.class && (e._ripple.class = o.class);
	let s = o.keys ?? ["Enter", "Space"];
	if (e._ripple.keyDownHandler = (e) => __(e, s), a && !n) {
		if (i.stop) {
			e.addEventListener("touchstart", p_, { passive: !0 }), e.addEventListener("mousedown", p_);
			return;
		}
		e.addEventListener("touchstart", f_, { passive: !0 }), e.addEventListener("touchend", m_, { passive: !0 }), e.addEventListener("touchmove", h_, { passive: !0 }), e.addEventListener("touchcancel", m_), e.addEventListener("mousedown", f_), e.addEventListener("mouseup", m_), e.addEventListener("mouseleave", m_), e.addEventListener("keydown", e._ripple.keyDownHandler), e.addEventListener("keyup", v_), e.addEventListener("blur", y_), e.addEventListener("dragstart", m_, { passive: !0 });
	} else !a && n && x_(e);
}
function x_(e) {
	e.removeEventListener("touchstart", p_), e.removeEventListener("mousedown", p_), e.removeEventListener("touchstart", f_), e.removeEventListener("touchend", m_), e.removeEventListener("touchmove", h_), e.removeEventListener("touchcancel", m_), e.removeEventListener("mousedown", f_), e.removeEventListener("mouseup", m_), e.removeEventListener("mouseleave", m_), e._ripple?.keyDownHandler && e.removeEventListener("keydown", e._ripple.keyDownHandler), e.removeEventListener("keyup", v_), e.removeEventListener("blur", y_), e.removeEventListener("dragstart", m_);
}
function S_(e, t) {
	b_(e, t, !1);
}
function C_(e) {
	x_(e), delete e._ripple;
}
function w_(e, t) {
	t.value !== t.oldValue && b_(e, t, d_(t.oldValue));
}
var T_ = {
	mounted: S_,
	unmounted: C_,
	updated: w_
}, E_ = Z({
	active: {
		type: Boolean,
		default: void 0
	},
	activeColor: String,
	baseColor: String,
	symbol: {
		type: null,
		default: dg
	},
	flat: Boolean,
	icon: [
		Boolean,
		String,
		Function,
		Object
	],
	prependIcon: hg,
	appendIcon: hg,
	block: Boolean,
	readonly: Boolean,
	slim: Boolean,
	stacked: Boolean,
	spaced: String,
	ripple: {
		type: [Boolean, Object],
		default: !0
	},
	text: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	...jh(),
	...tf(),
	...Ph(),
	...Fg(),
	...Ih(),
	...ag(),
	...Gg(),
	...Rg(),
	...Yg(),
	...Hh(),
	...e_(),
	...Gh(),
	...vh({ tag: "button" }),
	...rh(),
	...eg({ variant: "elevated" })
}, "VBtn"), D_ = hm()({
	name: "VBtn",
	props: E_(),
	emits: { "group:selected": (e) => !0 },
	setup(e, { attrs: t, slots: n }) {
		let { themeClasses: r } = hh(e), { borderClasses: i } = Mh(e), { densityClasses: a } = Fh(e), { dimensionStyles: o } = Ig(e), { elevationClasses: s } = Lh(e), { loaderClasses: c } = Kg(e), { locationStyles: l } = zg(e), { positionClasses: u } = Xg(e), { roundedClasses: d, roundedStyles: f } = Uh(e), { sizeClasses: p, sizeStyles: m } = Kh(e), h = og(e, e.symbol, !1), g = $g(e, t), _ = Y(() => e.active === void 0 ? g.isRouterLink.value ? g.isActive?.value : h?.isSelected.value : e.active), v = /* @__PURE__ */ R(() => _.value ? e.activeColor ?? e.color : e.color), { colorClasses: y, colorStyles: b, variantClasses: x } = tg(Y(() => ({
			color: h?.isSelected.value && (!g.isLink.value || g.isActive?.value) || !h || g.isActive?.value ? v.value ?? e.baseColor : e.baseColor,
			variant: e.variant
		}))), S = Y(() => h?.disabled.value || e.disabled), C = /* @__PURE__ */ R(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), w = Y(() => {
			if (e.value !== void 0 && typeof e.value != "symbol") return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
		});
		function T(e) {
			S.value || g.isLink.value && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || t.target === "_blank") || (g.isRouterLink.value ? g.navigate.value?.(e) : h?.toggle());
		}
		return r_(g, h?.select), km(() => {
			let t = g.isLink.value ? "a" : e.tag, v = !!(e.prependIcon || n.prepend), E = !!(e.appendIcon || n.append), D = !!(e.icon && e.icon !== !0);
			return hr(q(t, ks(g.linkProps, {
				type: t === "a" ? void 0 : "button",
				class: [
					"v-btn",
					h?.selectedClass.value,
					{
						"v-btn--active": _.value,
						"v-btn--block": e.block,
						"v-btn--disabled": S.value,
						"v-btn--elevated": C.value,
						"v-btn--flat": e.flat,
						"v-btn--icon": !!e.icon,
						"v-btn--loading": e.loading,
						"v-btn--readonly": e.readonly,
						"v-btn--slim": e.slim,
						"v-btn--stacked": e.stacked
					},
					e.spaced ? ["v-btn--spaced", `v-btn--spaced-${e.spaced}`] : [],
					r.value,
					i.value,
					y.value,
					a.value,
					s.value,
					c.value,
					u.value,
					d.value,
					p.value,
					x.value,
					e.class
				],
				style: [
					b.value,
					o.value,
					l.value,
					m.value,
					f.value,
					e.style
				],
				"aria-busy": e.loading ? !0 : void 0,
				disabled: S.value && t !== "a" || void 0,
				tabindex: e.loading || e.readonly ? -1 : void 0,
				onClick: T,
				value: t === "a" ? void 0 : w.value
			}), { default: () => [
				$h(!0, "v-btn"),
				!e.icon && v && K("span", {
					key: "prepend",
					class: "v-btn__prepend"
				}, [n.prepend ? q(mg, {
					key: "prepend-defaults",
					disabled: !e.prependIcon,
					defaults: { VIcon: { icon: e.prependIcon } }
				}, n.prepend) : q(Cg, {
					key: "prepend-icon",
					icon: e.prependIcon
				}, null)]),
				K("span", {
					class: "v-btn__content",
					"data-no-activator": ""
				}, [!n.default && D ? q(Cg, {
					key: "content-icon",
					icon: e.icon
				}, null) : q(mg, {
					key: "content-defaults",
					disabled: !D,
					defaults: { VIcon: { icon: e.icon } }
				}, { default: () => [n.default?.() ?? N(e.text)] })]),
				!e.icon && E && K("span", {
					key: "append",
					class: "v-btn__append"
				}, [n.append ? q(mg, {
					key: "append-defaults",
					disabled: !e.appendIcon,
					defaults: { VIcon: { icon: e.appendIcon } }
				}, n.append) : q(Cg, {
					key: "append-icon",
					icon: e.appendIcon
				}, null)]),
				!!e.loading && K("span", {
					key: "loader",
					class: "v-btn__loader"
				}, [n.loader?.() ?? q(Pg, {
					color: /* @__PURE__ */ zu(e.loading) ? void 0 : e.loading,
					indeterminate: !0,
					width: "2"
				}, null)])
			] }), [[
				T_,
				!S.value && e.ripple,
				"",
				{ center: !!e.icon }
			]]);
		}), { group: h };
	}
}), O_ = {
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
}, k_ = { component: (e) => X(bg, {
	...e,
	class: "mdi"
}) };
// node_modules/vuetify/lib/icons.js
function A_() {
	return {
		svg: { component: yg },
		class: { component: bg }
	};
}
function j_(e) {
	let t = A_(), n = e?.defaultSet ?? "mdi";
	return n === "mdi" && !t.mdi && (t.mdi = k_), jf({
		defaultSet: n,
		sets: t,
		aliases: {
			...O_,
			vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", .6]],
			"vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z",
			"vuetify-play": ["m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z", ["M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z", .6]]
		}
	}, e);
}
// node_modules/vuetify/lib/composables/date/adapters/vuetify.js
function M_(e) {
	let t = e.slice(-2).toUpperCase();
	switch (!0) {
		case e === "GB-alt-variant": return {
			firstDay: 0,
			firstWeekSize: 4
		};
		case e === "001": return {
			firstDay: 1,
			firstWeekSize: 1
		};
		case "AG AS BD BR BS BT BW BZ CA CO DM DO ET GT GU HK HN ID IL IN JM JP KE\n    KH KR LA MH MM MO MT MX MZ NI NP PA PE PH PK PR PY SA SG SV TH TT TW UM US\n    VE VI WS YE ZA ZW".includes(t): return {
			firstDay: 0,
			firstWeekSize: 1
		};
		case "AI AL AM AR AU AZ BA BM BN BY CL CM CN CR CY EC GE HR KG KZ LB LK LV\n    MD ME MK MN MY NZ RO RS SI TJ TM TR UA UY UZ VN XK".includes(t): return {
			firstDay: 1,
			firstWeekSize: 1
		};
		case "AD AN AT AX BE BG CH CZ DE DK EE ES FI FJ FO FR GB GF GP GR HU IE IS\n    IT LI LT LU MC MQ NL NO PL RE RU SE SK SM VA".includes(t): return {
			firstDay: 1,
			firstWeekSize: 4
		};
		case "AE AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY".includes(t): return {
			firstDay: 6,
			firstWeekSize: 1
		};
		case t === "MV": return {
			firstDay: 5,
			firstWeekSize: 1
		};
		case t === "PT": return {
			firstDay: 0,
			firstWeekSize: 4
		};
		default: return null;
	}
}
function N_(e, t, n) {
	let r = [], i = [], a = I_(e), o = L_(e), s = n ?? M_(t)?.firstDay ?? 0, c = (a.getDay() - s + 7) % 7, l = (o.getDay() - s + 7) % 7;
	for (let e = 0; e < c; e++) {
		let t = new Date(a);
		t.setDate(t.getDate() - (c - e)), i.push(t);
	}
	for (let t = 1; t <= o.getDate(); t++) {
		let n = new Date(e.getFullYear(), e.getMonth(), t);
		i.push(n), i.length === 7 && (r.push(i), i = []);
	}
	for (let e = 1; e < 7 - l; e++) {
		let t = new Date(o);
		t.setDate(t.getDate() + e), i.push(t);
	}
	return i.length > 0 && r.push(i), r;
}
function P_(e, t, n) {
	let r = (n ?? M_(t)?.firstDay ?? 0) % 7;
	[
		0,
		1,
		2,
		3,
		4,
		5,
		6
	].includes(r) || (nf("Invalid firstDayOfWeek, expected discrete number in range [0-6]"), r = 0);
	let i = new Date(e);
	for (; i.getDay() !== r;) i.setDate(i.getDate() - 1);
	return i;
}
function F_(e, t) {
	let n = new Date(e), r = ((M_(t)?.firstDay ?? 0) + 6) % 7;
	for (; n.getDay() !== r;) n.setDate(n.getDate() + 1);
	return n;
}
function I_(e) {
	return new Date(e.getFullYear(), e.getMonth(), 1);
}
function L_(e) {
	return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function R_(e) {
	let t = e.split("-").map(Number);
	return new Date(t[0], t[1] - 1, t[2]);
}
var z_ = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function B_(e) {
	if (e == null) return /* @__PURE__ */ new Date();
	if (e instanceof Date) return e;
	if (typeof e == "string") {
		let t;
		if (z_.test(e)) return R_(e);
		if (t = Date.parse(e), !isNaN(t)) return new Date(t);
	}
	return null;
}
var V_ = new Date(2e3, 0, 2);
function H_(e, t, n) {
	let r = t ?? M_(e)?.firstDay ?? 0;
	return (/* @__PURE__ */ ed(7)).map((t) => {
		let i = new Date(V_);
		return i.setDate(V_.getDate() + r + t), new Intl.DateTimeFormat(e, { weekday: n ?? "narrow" }).format(i);
	});
}
function U_(e, t, n, r) {
	let i = B_(e) ?? /* @__PURE__ */ new Date(), a = r?.[t];
	if (typeof a == "function") return a(i, t, n);
	let o = {};
	switch (t) {
		case "fullDate":
			o = {
				year: "numeric",
				month: "short",
				day: "numeric"
			};
			break;
		case "fullDateWithWeekday":
			o = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric"
			};
			break;
		case "normalDate": return `${i.getDate()} ${new Intl.DateTimeFormat(n, { month: "long" }).format(i)}`;
		case "normalDateWithWeekday":
			o = {
				weekday: "short",
				day: "numeric",
				month: "short"
			};
			break;
		case "shortDate":
			o = {
				month: "short",
				day: "numeric"
			};
			break;
		case "year":
			o = { year: "numeric" };
			break;
		case "month":
			o = { month: "long" };
			break;
		case "monthShort":
			o = { month: "short" };
			break;
		case "monthAndYear":
			o = {
				month: "long",
				year: "numeric"
			};
			break;
		case "monthAndDate":
			o = {
				month: "long",
				day: "numeric"
			};
			break;
		case "weekday":
			o = { weekday: "long" };
			break;
		case "weekdayShort":
			o = { weekday: "short" };
			break;
		case "dayOfMonth": return new Intl.NumberFormat(n).format(i.getDate());
		case "hours12h":
			o = {
				hour: "numeric",
				hour12: !0
			};
			break;
		case "hours24h":
			o = {
				hour: "numeric",
				hour12: !1
			};
			break;
		case "minutes":
			o = { minute: "numeric" };
			break;
		case "seconds":
			o = { second: "numeric" };
			break;
		case "fullTime":
			o = {
				hour: "numeric",
				minute: "numeric"
			};
			break;
		case "fullTime12h":
			o = {
				hour: "numeric",
				minute: "numeric",
				hour12: !0
			};
			break;
		case "fullTime24h":
			o = {
				hour: "numeric",
				minute: "numeric",
				hour12: !1
			};
			break;
		case "fullDateTime":
			o = {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "numeric"
			};
			break;
		case "fullDateTime12h":
			o = {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
				hour12: !0
			};
			break;
		case "fullDateTime24h":
			o = {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
				hour12: !1
			};
			break;
		case "keyboardDate":
			o = {
				year: "numeric",
				month: "2-digit",
				day: "2-digit"
			};
			break;
		case "keyboardDateTime": return o = {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "numeric",
			minute: "numeric"
		}, new Intl.DateTimeFormat(n, o).format(i).replace(/, /g, " ");
		case "keyboardDateTime12h": return o = {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "numeric",
			minute: "numeric",
			hour12: !0
		}, new Intl.DateTimeFormat(n, o).format(i).replace(/, /g, " ");
		case "keyboardDateTime24h": return o = {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "numeric",
			minute: "numeric",
			hour12: !1
		}, new Intl.DateTimeFormat(n, o).format(i).replace(/, /g, " ");
		default: o = a ?? {
			timeZone: "UTC",
			timeZoneName: "short"
		};
	}
	return new Intl.DateTimeFormat(n, o).format(i);
}
function W_(e, t) {
	let n = e.toJsDate(t);
	return `${n.getFullYear()}-${kf(String(n.getMonth() + 1), 2, "0")}-${kf(String(n.getDate()), 2, "0")}`;
}
function G_(e) {
	let [t, n, r] = e.split("-").map(Number);
	return new Date(t, n - 1, r);
}
function K_(e, t) {
	let n = new Date(e);
	return n.setMinutes(n.getMinutes() + t), n;
}
function q_(e, t) {
	let n = new Date(e);
	return n.setHours(n.getHours() + t), n;
}
function J_(e, t) {
	let n = new Date(e);
	return n.setDate(n.getDate() + t), n;
}
function Y_(e, t) {
	let n = new Date(e);
	return n.setDate(n.getDate() + t * 7), n;
}
function X_(e, t) {
	let n = new Date(e);
	return n.setDate(1), n.setMonth(n.getMonth() + t), n;
}
function Z_(e) {
	return e.getFullYear();
}
function Q_(e) {
	return e.getMonth();
}
function $_(e, t, n, r) {
	let i = M_(t), a = n ?? i?.firstDay ?? 0, o = i?.firstWeekSize ?? 1;
	return r === void 0 ? tv(e, t, a, o) : ev(e, t, a, r);
}
function ev(e, t, n, r) {
	let i = (7 + r - n) % 7, a = P_(e, t, n), o = J_(a, 6);
	function s(e) {
		return (7 + new Date(e, 0, 1).getDay() - n) % 7;
	}
	let c = Z_(a);
	c < Z_(o) && s(c + 1) <= i && c++;
	let l = new Date(c, 0, 1), u = s(c), d = u <= i ? J_(l, -u) : J_(l, 7 - u);
	return 1 + vv(Tv(a), wv(d), "weeks");
}
function tv(e, t, n, r) {
	let i = P_(e, t, n), a = J_(P_(e, t, n), 6);
	function o(e) {
		let r = new Date(e, 0, 1);
		return 7 - vv(r, P_(r, t, n), "days");
	}
	let s = Z_(i);
	s < Z_(a) && o(s + 1) >= r && s++;
	let c = new Date(s, 0, 1), l = o(s), u = l >= r ? J_(c, l - 7) : J_(c, l);
	return 1 + vv(Tv(i), wv(u), "weeks");
}
function nv(e) {
	return e.getDate();
}
function rv(e) {
	return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function iv(e) {
	return new Date(e.getFullYear(), e.getMonth() - 1, 1);
}
function av(e) {
	return e.getHours();
}
function ov(e) {
	return e.getMinutes();
}
function sv(e) {
	return new Date(e.getFullYear(), 0, 1);
}
function cv(e) {
	return new Date(e.getFullYear(), 11, 31);
}
function lv(e, t) {
	return mv(e, t[0]) || mv(e, t[1]) || dv(e, t[0]) && pv(e, t[1]);
}
function uv(e) {
	let t = new Date(e);
	return t instanceof Date && !isNaN(t.getTime());
}
function dv(e, t) {
	return e.getTime() > t.getTime();
}
function fv(e, t) {
	return dv(wv(e), wv(t));
}
function pv(e, t) {
	return e.getTime() < t.getTime();
}
function mv(e, t) {
	return e.getTime() === t.getTime();
}
function hv(e, t) {
	return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function gv(e, t) {
	return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function _v(e, t) {
	return e.getFullYear() === t.getFullYear();
}
function vv(e, t, n) {
	let r = new Date(e), i = new Date(t);
	switch (n) {
		case "years": return r.getFullYear() - i.getFullYear();
		case "quarters": return Math.floor((r.getMonth() - i.getMonth() + (r.getFullYear() - i.getFullYear()) * 12) / 4);
		case "months": return r.getMonth() - i.getMonth() + (r.getFullYear() - i.getFullYear()) * 12;
		case "weeks": return Math.floor((r.getTime() - i.getTime()) / 6048e5);
		case "days": return Math.floor((r.getTime() - i.getTime()) / 864e5);
		case "hours": return Math.floor((r.getTime() - i.getTime()) / 36e5);
		case "minutes": return Math.floor((r.getTime() - i.getTime()) / 6e4);
		case "seconds": return Math.floor((r.getTime() - i.getTime()) / 1e3);
		default: return r.getTime() - i.getTime();
	}
}
function yv(e, t) {
	let n = new Date(e);
	return n.setHours(t), n;
}
function bv(e, t) {
	let n = new Date(e);
	return n.setMinutes(t), n;
}
function xv(e, t) {
	let n = new Date(e);
	return n.setMonth(t), n;
}
function Sv(e, t) {
	let n = new Date(e);
	return n.setDate(t), n;
}
function Cv(e, t) {
	let n = new Date(e);
	return n.setFullYear(t), n;
}
function wv(e) {
	return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0, 0);
}
function Tv(e) {
	return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
var Ev = class {
	constructor(e) {
		this.locale = e.locale, this.formats = e.formats;
	}
	date(e) {
		return B_(e);
	}
	toJsDate(e) {
		return e;
	}
	toISO(e) {
		return W_(this, e);
	}
	parseISO(e) {
		return G_(e);
	}
	addMinutes(e, t) {
		return K_(e, t);
	}
	addHours(e, t) {
		return q_(e, t);
	}
	addDays(e, t) {
		return J_(e, t);
	}
	addWeeks(e, t) {
		return Y_(e, t);
	}
	addMonths(e, t) {
		return X_(e, t);
	}
	getWeekArray(e, t) {
		let n = t === void 0 ? void 0 : Number(t);
		return N_(e, this.locale, n);
	}
	startOfWeek(e, t) {
		let n = t === void 0 ? void 0 : Number(t);
		return P_(e, this.locale, n);
	}
	endOfWeek(e) {
		return F_(e, this.locale);
	}
	startOfMonth(e) {
		return I_(e);
	}
	endOfMonth(e) {
		return L_(e);
	}
	format(e, t) {
		return U_(e, t, this.locale, this.formats);
	}
	isEqual(e, t) {
		return mv(e, t);
	}
	isValid(e) {
		return uv(e);
	}
	isWithinRange(e, t) {
		return lv(e, t);
	}
	isAfter(e, t) {
		return dv(e, t);
	}
	isAfterDay(e, t) {
		return fv(e, t);
	}
	isBefore(e, t) {
		return !dv(e, t) && !mv(e, t);
	}
	isSameDay(e, t) {
		return hv(e, t);
	}
	isSameMonth(e, t) {
		return gv(e, t);
	}
	isSameYear(e, t) {
		return _v(e, t);
	}
	setMinutes(e, t) {
		return bv(e, t);
	}
	setHours(e, t) {
		return yv(e, t);
	}
	setMonth(e, t) {
		return xv(e, t);
	}
	setDate(e, t) {
		return Sv(e, t);
	}
	setYear(e, t) {
		return Cv(e, t);
	}
	getDiff(e, t, n) {
		return vv(e, t, n);
	}
	getWeekdays(e, t) {
		let n = e === void 0 ? void 0 : Number(e);
		return H_(this.locale, n, t);
	}
	getYear(e) {
		return Z_(e);
	}
	getMonth(e) {
		return Q_(e);
	}
	getWeek(e, t, n) {
		let r = t === void 0 ? void 0 : Number(t), i = n === void 0 ? void 0 : Number(n);
		return $_(e, this.locale, r, i);
	}
	getDate(e) {
		return nv(e);
	}
	getNextMonth(e) {
		return rv(e);
	}
	getPreviousMonth(e) {
		return iv(e);
	}
	getHours(e) {
		return av(e);
	}
	getMinutes(e) {
		return ov(e);
	}
	startOfDay(e) {
		return wv(e);
	}
	endOfDay(e) {
		return Tv(e);
	}
	startOfYear(e) {
		return sv(e);
	}
	endOfYear(e) {
		return cv(e);
	}
}, Dv = Symbol.for("vuetify:date-options"), Ov = Symbol.for("vuetify:date-adapter");
function kv(e, t) {
	let n = jf({
		adapter: Ev,
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
	}, e);
	return {
		options: n,
		instance: Av(n, t)
	};
}
function Av(e, t) {
	let n = /* @__PURE__ */ Xt(/* @__PURE__ */ Iu(e.adapter) ? new e.adapter({
		locale: e.locale[t.current.value] ?? t.current.value,
		formats: e.formats
	}) : e.adapter);
	return V(t.current, (t) => {
		n.locale = e.locale[t] ?? t ?? n.locale;
	}), n;
}
// node_modules/vuetify/lib/composables/display.js
var jv = [
	"sm",
	"md",
	"lg",
	"xl",
	"xxl"
], Mv = Symbol.for("vuetify:display"), Nv = {
	mobileBreakpoint: "lg",
	thresholds: {
		xs: 0,
		sm: 600,
		md: 840,
		lg: 1145,
		xl: 1545,
		xxl: 2138
	}
}, Pv = (e = Nv) => jf(Nv, e);
function Fv(e) {
	let t = of && !e ? window.navigator.userAgent : "ssr";
	function n(e) {
		return !!t.match(e);
	}
	return {
		android: n(/android/i),
		ios: n(/iphone|ipad|ipod/i),
		cordova: n(/cordova/i),
		electron: n(/electron/i),
		chrome: n(/chrome/i),
		edge: n(/edge/i),
		firefox: n(/firefox/i),
		opera: n(/opera/i),
		win: n(/win/i),
		mac: n(/mac/i),
		linux: n(/linux/i),
		touch: cf,
		ssr: t === "ssr"
	};
}
function Iv(e, t) {
	let { thresholds: n, mobileBreakpoint: r } = Pv(e), i = /* @__PURE__ */ Bu(t) ? t : t ? {
		clientWidth: 0,
		clientHeight: 0
	} : void 0, a = Zd({
		breakpoints: n,
		mobileBreakpoint: r,
		ssr: i
	}), o = /* @__PURE__ */ I(Fv(t)), s = i ? Me() : void 0;
	function c() {
		s ? s.run(() => a.update()) : a.update(), o.value = Fv();
	}
	return {
		xs: a.xs,
		sm: a.sm,
		md: a.md,
		lg: a.lg,
		xl: a.xl,
		xxl: a.xxl,
		smAndUp: a.smAndUp,
		mdAndUp: a.mdAndUp,
		lgAndUp: a.lgAndUp,
		xlAndUp: a.xlAndUp,
		smAndDown: a.smAndDown,
		mdAndDown: a.mdAndDown,
		lgAndDown: a.lgAndDown,
		xlAndDown: a.xlAndDown,
		name: a.name,
		height: a.height,
		width: a.width,
		mobile: a.isMobile,
		mobileBreakpoint: /* @__PURE__ */ I(r),
		platform: o,
		thresholds: /* @__PURE__ */ I(n),
		ssr: !!t,
		update: c
	};
}
function Lv(e = { mobile: null }, t = am()) {
	let n = vr(Mv);
	if (!n) throw Error("Could not find Vuetify display injection");
	function r(e, t, n) {
		return n ? !window.matchMedia(`(min-width: ${e}px)`).matches : t < e;
	}
	let i = Y(() => {
		let t = n.width.value, i = lf && !n.platform.value.ssr;
		return e.mobile ? !0 : /* @__PURE__ */ Ru(e.mobileBreakpoint) ? r(e.mobileBreakpoint, t, i) : e.mobileBreakpoint ? r(n.thresholds.value[e.mobileBreakpoint], t, i) : /* @__PURE__ */ Uu(e.mobile) ? n.mobile.value : !1;
	}), a = /* @__PURE__ */ R(() => t ? { [`${t}--mobile`]: i.value } : {});
	return {
		...n,
		displayClasses: a,
		mobile: i
	};
}
// node_modules/vuetify/lib/composables/goto.js
var Rv = Symbol.for("vuetify:goto");
function zv() {
	return {
		container: void 0,
		duration: 300,
		layout: !1,
		offset: 0,
		easing: "easeInOutCubic",
		patterns: Cm
	};
}
function Bv(e, t) {
	return {
		rtl: t.isRtl,
		options: jf(zv(), e)
	};
}
// node_modules/vuetify/lib/composables/rules/rules.js
var Vv = Symbol.for("vuetify:rules");
function Hv(e) {
	let t = vr(Vv, null);
	if (!e) {
		if (!t) throw Error("Could not find Vuetify rules injection");
		return t.aliases;
	}
	return t?.resolve(e) ?? /* @__PURE__ */ R(e);
}
// node_modules/vuetify/lib/framework.js
function Uv(e = {}) {
	let { blueprint: t, ...n } = e, r = jf(t, n), { aliases: i = {}, components: a = {}, directives: o = {} } = r, s = Me();
	return s.run(() => {
		let e = lm(r.defaults), t = Iv(r.display, r.ssr), n = mh(r.theme), c = j_(r.icons), l = Zm(r.locale), u = kv(r.date, l), d = Bv(r.goTo, l);
		function f(s) {
			for (let e in o) s.directive(e, o[e]);
			for (let e in a) s.component(e, a[e]);
			for (let e in i) s.component(e, mm({
				...i[e],
				name: e,
				aliasName: i[e].name
			}));
			let f = Me();
			if (f.run(() => {
				n.install(s);
			}), s.onUnmount(() => f.stop()), s.provide(sm, e), s.provide(cm, e), s.provide(Mv, t), s.provide(nh, n), s.provide(gg, c), s.provide(Xm, l), s.provide(Dv, u.options), s.provide(Ov, u.instance), s.provide(Rv, d), of && r.ssr) {
				if (s.$nuxt) s.$nuxt.hook("app:suspense:resolve", () => {
					t.update();
				});
				else {
					let { mount: e } = s;
					s.mount = (...n) => {
						let r = e(...n);
						return z(() => t.update()), s.mount = e, r;
					};
				}
			}
			s.mixin({ computed: { $vuetify() {
				return /* @__PURE__ */ Xt({
					defaults: Wv.call(this, sm),
					display: Wv.call(this, Mv),
					theme: Wv.call(this, nh),
					icons: Wv.call(this, gg),
					locale: Wv.call(this, Xm),
					date: Wv.call(this, Ov)
				});
			} } });
		}
		function p() {
			s.stop();
		}
		return {
			install: f,
			unmount: p,
			defaults: e,
			display: t,
			theme: n,
			icons: c,
			locale: l,
			date: u,
			goTo: d
		};
	});
}
Uv.version = "4.3.0";
function Wv(e) {
	let t = this.$, n = t.parent?.provides ?? t.vnode.appContext?.provides;
	if (n && e in n) return n[e];
}
// node_modules/vuetify/lib/components/VMenu/shared.js
var Gv = Symbol.for("vuetify:v-menu");
// node_modules/vuetify/lib/components/VOverlay/util/point.js
function Kv(e, t) {
	return {
		x: e.x + t.x,
		y: e.y + t.y
	};
}
function qv(e, t) {
	return {
		x: e.x - t.x,
		y: e.y - t.y
	};
}
function Jv(e, t) {
	if (e.side === "top" || e.side === "bottom") {
		let { side: n, align: r } = e;
		return Kv({
			x: r === "left" ? 0 : r === "center" ? t.width / 2 : r === "right" ? t.width : r,
			y: n === "top" ? 0 : n === "bottom" ? t.height : n
		}, t);
	}
	if (e.side === "left" || e.side === "right") {
		let { side: n, align: r } = e;
		return Kv({
			x: n === "left" ? 0 : n === "right" ? t.width : n,
			y: r === "top" ? 0 : r === "center" ? t.height / 2 : r === "bottom" ? t.height : r
		}, t);
	}
	return Kv({
		x: t.width / 2,
		y: t.height / 2
	}, t);
}
// node_modules/vuetify/lib/components/VOverlay/locationStrategies.js
var Yv = {
	static: $v,
	connected: ny
}, Xv = Z({
	locationStrategy: {
		type: [String, Function],
		default: "static",
		validator: (e) => /* @__PURE__ */ Iu(e) || e in Yv
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
function Zv(e, t) {
	let n = /* @__PURE__ */ F({}), r = /* @__PURE__ */ F();
	of && Im(() => !!(t.isActive.value && e.locationStrategy), (s) => {
		V(() => e.locationStrategy, s), Pe(() => {
			window.removeEventListener("resize", i), visualViewport?.removeEventListener("resize", a), visualViewport?.removeEventListener("scroll", o), r.value = void 0, t.isActive.value && (n.value = {});
		}), window.addEventListener("resize", i, { passive: !0 }), visualViewport?.addEventListener("resize", a, { passive: !0 }), visualViewport?.addEventListener("scroll", o, { passive: !0 }), /* @__PURE__ */ Iu(e.locationStrategy) ? r.value = e.locationStrategy(t, e, n)?.updateLocation : r.value = Yv[e.locationStrategy](t, e, n)?.updateLocation;
	});
	function i(e) {
		r.value?.(e);
	}
	function a(e) {
		r.value?.(e);
	}
	function o(e) {
		r.value?.(e);
	}
	return {
		contentStyles: n,
		updateLocation: r
	};
}
function Qv(e) {
	if (!e) return;
	let t = e.includes(" ") ? e : `${e} center`, n = "center", r = "center", i = {
		left: "start",
		start: "start",
		right: "end",
		end: "end"
	}, a = {
		top: "start",
		bottom: "end"
	};
	for (let e of t.split(" ")) e in i ? n = i[e] : e in a && (r = a[e]);
	return {
		[`v-overlay--justify-${n}`]: !0,
		[`v-overlay--align-${r}`]: !0
	};
}
function $v(e, t, n) {
	function r() {
		if (t.origin !== "auto" && t.origin !== "overlap") {
			let { side: r, align: i } = Qf(t.origin, e.isRtl.value);
			n.value = { transformOrigin: `${r} ${i}` };
		} else n.value = {};
	}
	return V([() => t.origin, e.isRtl], r, { immediate: !0 }), { updateLocation: () => {} };
}
function ey(e, t, n) {
	let r = document.createElement("div");
	r.style.position = "absolute", r.style.visibility = "hidden", r.style[n ? "width" : "height"] = e, t.appendChild(r);
	let i = n ? r.offsetWidth : r.offsetHeight;
	return t.removeChild(r), i > 0 ? i : Infinity;
}
function ty(e, t) {
	let n = cp(e), r = getComputedStyle(e);
	function i(t) {
		return e.style[t] && parseFloat(r[t]) || 0;
	}
	return t ? n.x += i("right") : n.x -= i("left"), n.y -= i("top"), n;
}
function ny(e, t, n) {
	(Array.isArray(e.target.value) || Om(e.target.value)) && Object.assign(n.value, {
		position: "fixed",
		top: 0,
		[e.isRtl.value ? "right" : "left"]: 0
	});
	let { preferredAnchor: r, preferredOrigin: i } = If(() => {
		let n = Qf(t.location ?? "bottom", e.isRtl.value), r = t.origin === "overlap" ? n : t.origin === "auto" ? ep(n) : Qf(t.origin, e.isRtl.value);
		return n.side === r.side && n.align === tp(r).align ? {
			preferredAnchor: np(n),
			preferredOrigin: np(r)
		} : {
			preferredAnchor: n,
			preferredOrigin: r
		};
	}), [a, o, s, c] = [
		"minWidth",
		"minHeight",
		"maxWidth",
		"maxHeight"
	].map((n) => {
		let r = n.endsWith("Width");
		return () => {
			let i = t[n];
			if (i == null) return Infinity;
			let a = e.contentEl.value?.parentElement ?? document.documentElement;
			if (/* @__PURE__ */ Ru(i) || /^-?[\d.]+(?:px)?$/.test(i.trim())) return parseFloat(i);
			if (i.endsWith("%")) {
				let e = sp(a);
				return parseFloat(i) * (r ? e.width : e.height) / 100;
			}
			return ey(i, a, r);
		};
	}), l = Y(() => {
		if (Array.isArray(t.offset)) return t.offset;
		if (/* @__PURE__ */ Lu(t.offset)) {
			let e = t.offset.split(" ").map(parseFloat);
			return e.length < 2 && e.push(0), e;
		}
		return /* @__PURE__ */ Ru(t.offset) ? [t.offset, 0] : [0, 0];
	}), u = !1, d = -1, f = new Ff(4), p = new ResizeObserver(() => {
		if (!u) return;
		if (requestAnimationFrame((e) => {
			e !== d && f.clear(), requestAnimationFrame((e) => {
				d = e;
			});
		}), f.isFull) {
			let e = f.values();
			if (vm(e.at(-1), e.at(-3)) && !vm(e.at(-1), e.at(-2))) return;
		}
		let e = h();
		e && f.push(e.flipped);
	}), m = new ip({
		x: 0,
		y: 0,
		width: 0,
		height: 0
	});
	V(e.target, (e, t) => {
		t && !Array.isArray(t) && p.unobserve(t), Array.isArray(e) ? vm(e, t) || h() : e && p.observe(e);
	}, { immediate: !0 }), V(e.contentEl, (e, t) => {
		t && p.unobserve(t), e && p.observe(e);
	}, { immediate: !0 }), Pe(() => {
		p.disconnect();
	});
	function h() {
		if (u = !1, requestAnimationFrame(() => u = !0), !e.target.value || !e.contentEl.value) return;
		(Array.isArray(e.target.value) || e.target.value.offsetParent || e.target.value.getClientRects().length) && (m = op(e.target.value));
		let d = ty(e.contentEl.value, e.isRtl.value), f = Tm(e.contentEl.value), p = Number(t.viewportMargin), h = a(), g = o(), _ = s(), v = c();
		f.length || (f.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style[e.isRtl.value ? "right" : "left"] || (d.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), d.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
		let y = f.reduce((e, t) => {
			let n = sp(t);
			return e ? new ip({
				x: Math.max(e.left, n.left),
				y: Math.max(e.top, n.top),
				width: Math.min(e.right, n.right) - Math.max(e.left, n.left),
				height: Math.min(e.bottom, n.bottom) - Math.max(e.top, n.top)
			}) : n;
		}, void 0);
		t.stickToTarget ? (y.x += Math.min(p, m.x), y.y += Math.min(p, m.y), y.width = Math.max(y.width - p * 2, m.x + m.width - p), y.height = Math.max(y.height - p * 2, m.y + m.height - p)) : (y.x += p, y.y += p, y.width -= p * 2, y.height -= p * 2);
		let b = {
			anchor: r.value,
			origin: i.value
		};
		function x(e) {
			let t = new ip(d), { x: n, y: r } = qv(Jv(e.anchor, m), Jv(e.origin, t));
			switch (e.anchor.side) {
				case "top":
					r -= l.value[0];
					break;
				case "bottom":
					r += l.value[0];
					break;
				case "left":
					n -= l.value[0];
					break;
				case "right": n += l.value[0];
			}
			switch (e.anchor.align) {
				case "top":
					r -= l.value[1];
					break;
				case "bottom":
					r += l.value[1];
					break;
				case "left":
					n -= l.value[1];
					break;
				case "right": n += l.value[1];
			}
			return t.x += n, t.y += r, t.width = Math.min(t.width, _), t.height = Math.min(t.height, v), {
				overflows: ap(t, y),
				x: n,
				y: r
			};
		}
		let S = 0, C = 0, w = {
			x: 0,
			y: 0
		}, T = {
			x: !1,
			y: !1
		}, E = -1;
		for (;;) {
			if (E++ > 10) {
				rf("Infinite loop detected in connectedLocationStrategy");
				break;
			}
			let { x: e, y: t, overflows: n } = x(b);
			S += e, C += t, d.x += e, d.y += t;
			{
				let e = rp(b.anchor), t = n.x.before || n.x.after, r = n.y.before || n.y.after, i = !1;
				if (["x", "y"].forEach((a) => {
					if (a === "x" && t && !T.x || a === "y" && r && !T.y) {
						let t = {
							anchor: { ...b.anchor },
							origin: { ...b.origin }
						}, r = a === "x" ? e === "y" ? tp : ep : e === "y" ? ep : tp;
						t.anchor = r(t.anchor), t.origin = r(t.origin);
						let { overflows: o } = x(t);
						(o[a].before <= n[a].before && o[a].after <= n[a].after || o[a].before + o[a].after < (n[a].before + n[a].after) / 2) && (b = t, i = T[a] = !0);
					}
				}), i) continue;
			}
			n.x.before && (S += n.x.before, d.x += n.x.before), n.x.after && (S -= n.x.after, d.x -= n.x.after), n.y.before && (C += n.y.before, d.y += n.y.before), n.y.after && (C -= n.y.after, d.y -= n.y.after);
			{
				let e = ap(d, y);
				w.x = y.width - e.x.before - e.x.after, w.y = y.height - e.y.before - e.y.after, S += e.x.before, d.x += e.x.before, C += e.y.before, d.y += e.y.before;
			}
			break;
		}
		let D = rp(b.anchor), O = t.origin !== "auto" && t.origin !== "overlap" ? Qf(t.origin, e.isRtl.value) : b.origin;
		return Object.assign(n.value, {
			"--v-overlay-anchor-origin": `${b.anchor.side} ${b.anchor.align}`,
			transformOrigin: `${O.side} ${O.align}`,
			top: mf(ry(C)),
			left: e.isRtl.value ? void 0 : mf(ry(S)),
			right: e.isRtl.value ? mf(ry(-S)) : void 0,
			minWidth: mf(D === "y" ? Math.min(h, m.width) : h),
			maxWidth: mf(iy(Df(w.x, h === Infinity ? 0 : h, _))),
			maxHeight: mf(iy(Df(w.y, g === Infinity ? 0 : g, v)))
		}), {
			available: w,
			contentBox: d,
			flipped: T
		};
	}
	return V(() => [
		r.value,
		i.value,
		t.origin,
		t.offset,
		t.minWidth,
		t.minHeight,
		t.maxWidth,
		t.maxHeight
	], () => h()), z(() => {
		let e = h();
		if (!e) return;
		let { available: t, contentBox: n } = e;
		n.height > t.y && requestAnimationFrame(() => {
			h(), requestAnimationFrame(() => {
				h();
			});
		});
	}), { updateLocation: h };
}
function ry(e) {
	return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function iy(e) {
	return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
// node_modules/vuetify/lib/components/VOverlay/requestNewFrame.js
var ay = !0, oy = [];
function sy(e) {
	!ay || oy.length ? (oy.push(e), ly()) : (ay = !1, e(), ly());
}
var cy = -1;
function ly() {
	cancelAnimationFrame(cy), cy = requestAnimationFrame(() => {
		let e = oy.shift();
		e && e(), oy.length ? ly() : ay = !0;
	});
}
// node_modules/vuetify/lib/components/VOverlay/scrollStrategies.js
var uy = {
	none: null,
	close: py,
	block: my,
	reposition: hy
}, dy = Z({ scrollStrategy: {
	type: [String, Function],
	default: "block",
	validator: (e) => /* @__PURE__ */ Iu(e) || e in uy
} }, "VOverlay-scroll-strategies");
function fy(e, t) {
	if (!of) return;
	let n;
	Sr(async () => {
		n?.stop(), t.isActive.value && e.scrollStrategy && (n = Me(), await new Promise((e) => setTimeout(e)), n.active && n.run(() => {
			/* @__PURE__ */ Iu(e.scrollStrategy) ? e.scrollStrategy(t, e, n) : uy[e.scrollStrategy]?.(t, e, n);
		}));
	}), Pe(() => {
		n?.stop();
	});
}
function py(e) {
	function t(t) {
		e.isActive.value = !1;
	}
	_y(gy(e.target.value, e.contentEl.value), t);
}
function my(e, t) {
	let n = e.root.value?.offsetParent, r = gy(e.target.value, e.contentEl.value), i = [.../* @__PURE__ */ new Set([...Tm(r, t.contained ? n : void 0), ...Tm(e.contentEl.value, t.contained ? n : void 0)])].filter((e) => !e.classList.contains("v-overlay-scroll-blocked")), a = window.innerWidth - document.documentElement.offsetWidth, o = ((e) => Em(e) && e)(n || document.documentElement);
	o && e.root.value.classList.add("v-overlay--scroll-blocked"), i.forEach((e, t) => {
		e.style.setProperty("--v-body-scroll-x", mf(-e.scrollLeft)), e.style.setProperty("--v-body-scroll-y", mf(-e.scrollTop)), (e !== document.documentElement || getComputedStyle(e).overflowY !== "scroll") && e.style.setProperty("--v-scrollbar-offset", mf(a)), e.classList.add("v-overlay-scroll-blocked");
	}), Pe(() => {
		i.forEach((e, t) => {
			let n = parseFloat(e.style.getPropertyValue("--v-body-scroll-x")), r = parseFloat(e.style.getPropertyValue("--v-body-scroll-y")), i = e.style.scrollBehavior;
			e.style.scrollBehavior = "auto", e.style.removeProperty("--v-body-scroll-x"), e.style.removeProperty("--v-body-scroll-y"), e.style.removeProperty("--v-scrollbar-offset"), e.classList.remove("v-overlay-scroll-blocked"), e.scrollLeft = -n, e.scrollTop = -r, e.style.scrollBehavior = i;
		}), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
	});
}
function hy(e, t, n) {
	let r = !1, i = -1, a = -1;
	function o(t) {
		sy(() => {
			let n = performance.now();
			e.updateLocation.value?.(t), r = (performance.now() - n) / (1e3 / 60) > 2;
		});
	}
	a = (typeof requestIdleCallback > "u" ? (e) => e() : requestIdleCallback)(() => {
		n.run(() => {
			_y(gy(e.target.value, e.contentEl.value), (e) => {
				r ? (cancelAnimationFrame(i), i = requestAnimationFrame(() => {
					i = requestAnimationFrame(() => {
						o(e);
					});
				})) : o(e);
			});
		});
	}), Pe(() => {
		typeof cancelIdleCallback < "u" && cancelIdleCallback(a), cancelAnimationFrame(i);
	});
}
function gy(e, t) {
	return Array.isArray(e) ? document.elementsFromPoint(...e).find((e) => !t?.contains(e)) : e ?? t;
}
function _y(e, t) {
	let n = [document, ...Tm(e)];
	n.forEach((e) => {
		e.addEventListener("scroll", t, { passive: !0 });
	}), Pe(() => {
		n.forEach((e) => {
			e.removeEventListener("scroll", t);
		});
	});
}
// node_modules/vuetify/lib/composables/delay.js
var vy = Z({
	closeDelay: [Number, String],
	openDelay: [Number, String]
}, "delay");
function yy(e, t) {
	let n = () => {};
	function r(r, i) {
		n?.();
		let a = r ? e.openDelay : e.closeDelay, o = Math.max(i?.minDelay ?? 0, Number(a ?? 0));
		return new Promise((e) => {
			n = Kf(o, () => {
				t?.(r), e(r);
			});
		});
	}
	function i() {
		return r(!0);
	}
	function a(e) {
		return r(!1, e);
	}
	return {
		clearDelay: n,
		runOpenDelay: i,
		runCloseDelay: a
	};
}
// node_modules/vuetify/lib/directives/touch-hold/index.js
function by(e) {
	e.style.setProperty("-webkit-touch-callout", "none");
}
var xy = ["-webkit-user-select", "user-select"];
function Sy(e) {
	let t = xy.map((t) => e.style.getPropertyValue(t));
	return xy.forEach((t) => e.style.setProperty(t, "none")), () => xy.forEach((n, r) => t[r] ? e.style.setProperty(n, t[r]) : e.style.removeProperty(n));
}
var Cy = /* @__PURE__ */ new WeakSet();
function wy(e) {
	let t = -1, n = !1, r = !1, i, a = {
		options: e,
		onTouchstart: o,
		onMousedown: s,
		cancel: m
	};
	function o(e) {
		if (m(), n = !1, e.touches.length > 1 || Cy.has(e)) return;
		Cy.add(e);
		let r = e.currentTarget, { clientX: o, clientY: s } = e.touches[0], d = e.target;
		i = {
			el: r,
			x: o,
			y: s,
			unlock: Sy(r),
			detach: () => {
				d.removeEventListener("touchmove", l), d.removeEventListener("touchend", u), d.removeEventListener("touchcancel", u), window.removeEventListener("contextmenu", p, { capture: !0 });
			}
		}, d.addEventListener("touchmove", l, { passive: !0 }), d.addEventListener("touchend", u, { passive: !1 }), d.addEventListener("touchcancel", u), window.addEventListener("contextmenu", p, { capture: !0 }), t = window.setTimeout(() => c(e, !0), a.options.duration ?? 500);
	}
	function s(e) {
		m(), n = !1, !(e.button !== 0 || Cy.has(e)) && (Cy.add(e), i = {
			el: e.currentTarget,
			x: e.clientX,
			y: e.clientY,
			detach: () => {
				window.removeEventListener("mousemove", d), window.removeEventListener("click", f, { capture: !0 });
			}
		}, window.addEventListener("mousemove", d, { passive: !0 }), window.addEventListener("click", f, { capture: !0 }), t = window.setTimeout(() => c(e, !1), a.options.duration ?? 500));
	}
	function c(e, o) {
		clearTimeout(t), n = !0, getSelection()?.removeAllRanges(), r = !0;
		try {
			a.options.handler({
				originalEvent: e,
				touch: o,
				target: i.el,
				clientX: i.x,
				clientY: i.y
			});
		} finally {
			r = !1;
		}
	}
	function l(e) {
		if (!i || n) return;
		let { clientX: t, clientY: r } = e.touches[0];
		(e.touches.length > 1 || Math.hypot(t - i.x, r - i.y) > 10) && m();
	}
	function u(e) {
		n && e.cancelable && e.preventDefault(), m();
	}
	function d(e) {
		i && !n && Math.hypot(e.clientX - i.x, e.clientY - i.y) > 10 && m();
	}
	function f(e) {
		n && (e.preventDefault(), e.stopImmediatePropagation()), m();
	}
	function p(e) {
		!r && i?.el.contains(e.target) && (e.preventDefault(), e.stopImmediatePropagation(), n || c(e, !0));
	}
	function m() {
		if (clearTimeout(t), !i) return;
		let { detach: e, unlock: r } = i;
		i = void 0, e(), r && (n ? setTimeout(r, 10) : r());
	}
	return a;
}
// node_modules/vuetify/lib/components/VOverlay/useActivator.js
var Ty = Z({
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
	...vy()
}, "VOverlay-activator");
function Ey(e, { isActive: t, isTop: n, contentEl: r, isSubmenu: i = !1 }) {
	let a = im("useActivator"), o = /* @__PURE__ */ F(), s = vr(Gv, null), c = !1, l = !1, u = !0, d = /* @__PURE__ */ F(!1), f = !1, p = () => !i || (s?.rootOpenedByHover?.() ?? d.value), m = Y(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), h = Y(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !m.value && !e.contextMenu), { runOpenDelay: g, runCloseDelay: _ } = yy(e, (r) => {
		r === (e.openOnHover && c || m.value && l) && !(e.openOnHover && t.value && !n.value) && (t.value !== r && (u = !0, r && (f = !0, d.value = c && e.openOnHover)), t.value = r);
	}), v = !1;
	V(t, (e) => {
		e ? (f || (d.value = !1), f = !1) : (v = !0, setTimeout(() => v = !1, 50), d.value = !1, f = !1);
	});
	let y = /* @__PURE__ */ F(), b;
	function x(e) {
		y.value = e;
		let t = o.value?.getBoundingClientRect();
		b = e && t && [e[0] - t.left, e[1] - t.top];
	}
	let S = wy({ handler: ({ originalEvent: e, clientX: t, clientY: n }) => {
		e.target.dispatchEvent(new MouseEvent("contextmenu", {
			bubbles: !0,
			cancelable: !0,
			clientX: t,
			clientY: n
		}));
	} }), C = {
		onClick: (e) => {
			(!v || t.value) && (e.stopPropagation(), o.value = e.currentTarget || e.target, t.value || x([e.clientX, e.clientY]), t.value = !t.value);
		},
		onMouseenter: (t) => {
			c = !0, o.value = t.currentTarget || t.target, e.target === "cursor" && x([t.clientX, t.clientY]), g();
		},
		onMousemove: (e) => {
			x([e.clientX, e.clientY]);
		},
		onMouseleave: (t) => {
			c = !1, e.target === "cursor" && (l = !1), p() && _();
		},
		onFocus: (e) => {
			v || Gf(e.target, ":focus-visible") !== !1 && (l = !0, e.stopPropagation(), o.value = e.currentTarget || e.target, g());
		},
		onContextmenu: (e) => {
			e.preventDefault(), e.stopPropagation(), t.value ? t.value = !1 : (o.value = e.currentTarget || e.target, x(e.clientX || e.clientY ? [e.clientX, e.clientY] : void 0), t.value = !0);
		},
		onTouchstart: S.onTouchstart,
		onBlur: (e) => {
			let t = e.relatedTarget;
			t && !r.value?.contains(t) && (l = !1, e.stopPropagation(), _({ minDelay: 1 }));
		}
	}, w = Y(() => {
		let t = {};
		return h.value && (t.onClick = C.onClick), e.openOnHover && (t.onMouseenter = C.onMouseenter, t.onMouseleave = C.onMouseleave, e.target === "cursor" && !h.value && (t.onMousemove = C.onMousemove)), e.contextMenu && (t.onContextmenu = C.onContextmenu, t.onTouchstart = C.onTouchstart), m.value && (t.onFocus = C.onFocus, t.onBlur = C.onBlur), t;
	}), T = Y(() => {
		let n = {};
		if (e.openOnHover && (n.onMouseenter = () => {
			c = !0, g();
		}, n.onMouseleave = () => {
			c = !1, p() && _();
		}), m.value && (n.onFocusin = (e) => {
			e.target.matches(":focus-visible") && (l = !0, g());
		}, n.onFocusout = (e) => {
			let t = e.relatedTarget;
			t && !r.value?.contains(t) && (l = !1, _({ minDelay: 1 }));
		}), e.closeOnContentClick) {
			let e = vr(Gv, null);
			n.onClick = () => {
				t.value = !1, e?.closeParents();
			};
		}
		return n;
	}), E = Y(() => {
		let t = {};
		return e.openOnHover && (t.onMouseenter = () => {
			u && (c = !0, u = !1, g());
		}, t.onMouseleave = () => {
			c = !1, p() && _();
		}), t;
	});
	V(n, (t) => {
		!t || !p() || (!e.openOnHover || c || m.value && l) && (!m.value || l || e.openOnHover && c) || r.value?.contains(Uf()) || _();
	});
	function D() {
		let e = o.value?.getBoundingClientRect();
		b && e && (y.value = [e.left + b[0], e.top + b[1]]);
	}
	V(t, (t, n, r) => {
		t && e.contextMenu && !e.target && (document.addEventListener("scroll", D, {
			capture: !0,
			passive: !0
		}), r(() => document.removeEventListener("scroll", D, { capture: !0 })));
	}), Sr(() => {
		o.value && e.contextMenu && by(o.value);
	});
	function O() {
		t.value || x(void 0);
	}
	let k = qf();
	Sr(() => {
		k.value && z(() => {
			o.value = k.el;
		});
	});
	let A = qf(), j = Y(() => (e.target === "cursor" || e.contextMenu && !e.target) && y.value ? y.value : A.value ? A.el : Oy(e.target, a) || o.value), ee = Y(() => Array.isArray(j.value) ? void 0 : j.value), M;
	return V(() => !!e.activator, (t) => {
		t && of ? (M = Me(), M.run(() => {
			Dy(e, a, {
				activatorEl: o,
				activatorEvents: w
			});
		})) : M && M.stop();
	}, {
		flush: "post",
		immediate: !0
	}), Pe(() => {
		S.cancel(), M?.stop();
	}), {
		activatorEl: o,
		activatorRef: k,
		target: j,
		targetEl: ee,
		targetRef: A,
		activatorEvents: w,
		contentEvents: T,
		scrimEvents: E,
		openedByHover: d,
		onAfterLeave: O
	};
}
function Dy(e, t, { activatorEl: n, activatorEvents: r }) {
	V(() => e.activator, (e, t) => {
		if (t && e !== t) {
			let e = o(t);
			e && a(e);
		}
		e && z(() => i());
	}, { immediate: !0 }), V(() => e.activatorProps, () => {
		i();
	}), Pe(() => {
		a();
	});
	function i(t = o(), n = e.activatorProps) {
		t && dp(t, ks(r.value, n));
	}
	function a(t = o(), n = e.activatorProps) {
		t && fp(t, ks(r.value, n));
	}
	function o(r = e.activator) {
		let i = Oy(r, t);
		return n.value = i?.nodeType === Node.ELEMENT_NODE ? i : void 0, n.value;
	}
}
function Oy(e, t) {
	if (!e) return;
	let n;
	if (e === "parent") {
		let e = t?.proxy?.$el?.parentNode;
		for (; e?.hasAttribute("data-no-activator");) e = e.parentNode;
		n = e;
	} else n = /* @__PURE__ */ Lu(e) ? document.querySelector(e) : "$el" in e ? e.$el : e;
	return n;
}
// node_modules/vuetify/lib/composables/focusTrap.js
var ky = Z({
	retainFocus: Boolean,
	captureFocus: Boolean,
	disableInitialFocus: Boolean
}, "focusTrap"), Ay = /* @__PURE__ */ new Map(), jy = 0;
function My() {
	let e;
	for (let { isActive: t, contentEl: n } of Ay.values()) t.value && n.value && (e = n.value);
	return e;
}
function Ny(e) {
	let t = Uf();
	if (e.key !== "Tab" || !t) return;
	let n = Array.from(Ay.values()).filter(({ isActive: e, contentEl: n }) => e.value && n.value?.contains(t)).map((e) => e.contentEl.value), r, i = t;
	for (; i;) {
		if (n.includes(i)) {
			r = i;
			break;
		}
		i = i.parentElement;
	}
	if (!r) {
		let t = My();
		if (!t) return;
		let n = Hf(t).filter((e) => e.tabIndex >= 0);
		e.preventDefault(), n.length ? e.shiftKey ? n[n.length - 1].focus() : n[0].focus() : t.focus({ preventScroll: !0 });
		return;
	}
	let a = Hf(r).filter((e) => e.tabIndex >= 0);
	if (!a.length) return;
	if (a.length === 1 && a[0].classList.contains("v-list") && a[0].contains(t)) {
		e.preventDefault();
		return;
	}
	let o = a[0], s = a[a.length - 1], c = t === o || t === r || o.classList.contains("v-list") && o.contains(t), l = t === s || s.classList.contains("v-list") && s.contains(t);
	e.shiftKey && c && (e.preventDefault(), s.focus()), !e.shiftKey && l && (e.preventDefault(), o.focus());
}
function Py(e, { isActive: t, localTop: n, contentEl: r }) {
	let i = Symbol("trap"), a = !1, o = -1;
	async function s() {
		a = !0, o = window.setTimeout(() => {
			a = !1;
		}, 100);
	}
	async function c(e) {
		let i = e.relatedTarget, o = e.target;
		document.removeEventListener("pointerdown", s), document.removeEventListener("keydown", l), await new Promise((e) => requestAnimationFrame(e)), t.value && !a && i !== o && r.value && pn(n) && ![document, r.value].includes(o) && !r.value.contains(o) && Hf(r.value)[0]?.focus();
	}
	function l(e) {
		if (e.key === "Tab" && (document.removeEventListener("keydown", l), t.value && r.value && e.target && !r.value.contains(e.target))) {
			let t = Hf(document.documentElement);
			if (e.shiftKey && e.target === t.at(0) || !e.shiftKey && e.target === t.at(-1)) {
				let t = Hf(r.value);
				t.length > 0 && (e.preventDefault(), t[0].focus());
			}
		}
	}
	let u = /* @__PURE__ */ R(() => t.value && e.captureFocus && !e.disableInitialFocus);
	of && (V(() => e.retainFocus, (e) => {
		e ? Ay.set(i, {
			isActive: t,
			contentEl: r
		}) : Ay.delete(i);
	}, { immediate: !0 }), V(u, (e) => {
		e ? (document.addEventListener("pointerdown", s), document.addEventListener("focusin", c, { once: !0 }), document.addEventListener("keydown", l)) : (document.removeEventListener("pointerdown", s), document.removeEventListener("focusin", c), document.removeEventListener("keydown", l));
	}, { immediate: !0 }), jy++ < 1 && document.addEventListener("keydown", Ny)), Pe(() => {
		Ay.delete(i), of && (clearTimeout(o), document.removeEventListener("pointerdown", s), document.removeEventListener("focusin", c), document.removeEventListener("keydown", l), --jy < 1 && document.removeEventListener("keydown", Ny));
	});
}
// node_modules/vuetify/lib/composables/hydration.js
function Fy() {
	if (!of) return /* @__PURE__ */ I(!1);
	let { ssr: e } = Lv();
	if (e) {
		let e = /* @__PURE__ */ I(!1);
		return Yi(() => {
			e.value = !0;
		}), e;
	}
	return /* @__PURE__ */ I(!0);
}
// node_modules/vuetify/lib/composables/lazy.js
var Iy = Z({ eager: Boolean }, "lazy");
function Ly(e, t) {
	let n = /* @__PURE__ */ I(!1), r = /* @__PURE__ */ R(() => n.value || e.eager || t.value);
	V(t, () => n.value = !0);
	function i() {
		e.eager || (n.value = !1);
	}
	return {
		isBooted: n,
		hasContent: r,
		onAfterLeave: i
	};
}
// node_modules/vuetify/lib/composables/scopeId.js
function Ry() {
	let e = im("useScopeId").vnode.scopeId;
	return { scopeId: e ? { [e]: "" } : void 0 };
}
// node_modules/vuetify/lib/composables/stack.js
var zy = Symbol.for("vuetify:stack"), By = /* @__PURE__ */ Xt([]);
function Vy(e, t, n) {
	let r = im("useStack"), i = !n, a = vr(zy, void 0), o = /* @__PURE__ */ Xt({ activeChildren: /* @__PURE__ */ new Set() });
	_r(zy, o);
	let s = /* @__PURE__ */ I(Number(pn(t)));
	Im(e, () => {
		let e = By.at(-1)?.[1];
		s.value = e ? e + 10 : Number(pn(t)), i && By.push([r.uid, s.value]), a?.activeChildren.add(r.uid), Pe(() => {
			if (i) {
				let e = (/* @__PURE__ */ on(By)).findIndex((e) => e[0] === r.uid);
				By.splice(e, 1);
			}
			a?.activeChildren.delete(r.uid);
		});
	});
	let c = /* @__PURE__ */ I(!0);
	return i && Sr(() => {
		let e = By.at(-1)?.[0] === r.uid;
		setTimeout(() => c.value = e);
	}), {
		globalTop: /* @__PURE__ */ Qt(c),
		localTop: /* @__PURE__ */ R(() => !o.activeChildren.size),
		stackStyles: /* @__PURE__ */ R(() => ({ zIndex: s.value }))
	};
}
// node_modules/vuetify/lib/composables/teleport.js
function Hy(e) {
	return { teleportTarget: Y(() => {
		let t = e();
		if (t === !0 || !of) return;
		let n = t === !1 ? document.body : /* @__PURE__ */ Lu(t) ? document.querySelector(t) : t;
		if (!n) {
			oc(`Unable to locate target ${t}`);
			return;
		}
		let r = [...n.children].find((e) => e.matches(".v-overlay-container"));
		return r || (r = document.createElement("div"), r.className = "v-overlay-container", n.appendChild(r)), r;
	}) };
}
// node_modules/vuetify/lib/composables/transition.js
var Uy = Z({ transition: {
	type: null,
	default: "fade-transition",
	validator: (e) => e !== !0
} }, "transition"), Wy = (e, { slots: t }) => {
	let { transition: n, disabled: r, group: i, target: a, ...o } = e, { component: s = i ? Pl : wc, ...c } = /* @__PURE__ */ Bu(n) ? n : {}, l;
	return l = /* @__PURE__ */ Bu(n) ? ks(c, Yf({
		disabled: r,
		group: i,
		target: a
	}), o) : ks({ name: r || !n ? "" : n }, o), X(s, l, t);
};
// node_modules/vuetify/lib/directives/click-outside/index.js
function Gy() {
	return !0;
}
function Ky(e, t, n, r = !1) {
	if (!e || !r && qy(e, n) === !1) return !1;
	let i = ym(t);
	if (typeof ShadowRoot < "u" && i instanceof ShadowRoot && i.host === e.target) return !1;
	let a = n.value, o = ((/* @__PURE__ */ Iu(a) ? void 0 : a.include) || (() => []))();
	return o.push(t), !o.some((t) => t?.contains(e.target));
}
function qy(e, t) {
	let n = t.value;
	return ((/* @__PURE__ */ Iu(n) ? void 0 : n.closeConditional) || Gy)(e);
}
function Jy(e, t, n, r = t._clickOutside.lastMousedownWasOutside) {
	let i = /* @__PURE__ */ Iu(n.value) ? n.value : n.value.handler;
	e.shadowTarget = e.target, r && Ky(e, t, n) && setTimeout(() => {
		qy(e, n) && i && i(e);
	}, 0);
}
function Yy(e, t) {
	let n = ym(e);
	t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
var Xy = {
	mounted(e, t) {
		let n = (n) => Jy(n, e, t), r = (n) => Jy(n, e, t, !0), i = (e) => e.button !== 2 && n(e), a = (n) => {
			e._clickOutside.lastMousedownWasOutside = Ky(n, e, t, !0);
		};
		Yy(e, (e) => {
			e.addEventListener("click", n, !0), e.addEventListener("auxclick", i, !0), e.addEventListener("contextmenu", r, !0), e.addEventListener("mousedown", a, !0);
		}), e._clickOutside ||= { lastMousedownWasOutside: !1 }, e._clickOutside[t.instance.$.uid] = {
			onClick: n,
			onAuxclick: i,
			onContextmenu: r,
			onMousedown: a
		};
	},
	beforeUnmount(e, t) {
		e._clickOutside && (Yy(e, (n) => {
			if (!n || !e._clickOutside?.[t.instance.$.uid]) return;
			let { onClick: r, onAuxclick: i, onContextmenu: a, onMousedown: o } = e._clickOutside[t.instance.$.uid];
			n.removeEventListener("click", r, !0), n.removeEventListener("auxclick", i, !0), n.removeEventListener("contextmenu", a, !0), n.removeEventListener("mousedown", o, !0);
		}), delete e._clickOutside[t.instance.$.uid]);
	}
}, Zy = /* @__PURE__ */ new WeakMap();
function Qy(e) {
	let { modelValue: t, color: n, ...r } = e;
	return q(wc, {
		name: "fade-transition",
		appear: !0
	}, { default: () => [e.modelValue && K("div", ks({
		class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
		style: e.color.backgroundColorStyles.value
	}, r), null)] });
}
var $y = Z({
	absolute: Boolean,
	attach: [
		Boolean,
		String,
		Object
	],
	closeOnBack: {
		type: Boolean,
		default: !0
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
		default: !0
	},
	zIndex: {
		type: [Number, String],
		default: 2e3
	},
	...Ty(),
	...tf(),
	...Fg(),
	...Iy(),
	...Xv(),
	...dy(),
	...ky(),
	...rh(),
	...Uy()
}, "VOverlay"), eb = hm()({
	name: "VOverlay",
	directives: { vClickOutside: Xy },
	inheritAttrs: !1,
	props: {
		_disableGlobalStack: Boolean,
		_submenu: Boolean,
		...xf($y(), ["disableInitialFocus"])
	},
	emits: {
		"click:outside": (e) => !0,
		"update:modelValue": (e) => !0,
		keydown: (e) => !0,
		afterEnter: () => !0,
		afterLeave: () => !0
	},
	setup(e, { slots: t, attrs: n, emit: r }) {
		let i = im("VOverlay"), a = /* @__PURE__ */ F(), o = /* @__PURE__ */ F(), s = /* @__PURE__ */ F(), c = Lm(e, "modelValue"), l = Y({
			get: () => c.value,
			set: (t) => {
				t && e.disabled || (c.value = t);
			}
		}), { themeClasses: u } = hh(e), { rtlClasses: d, isRtl: f } = th(), { hasContent: p, onAfterLeave: m } = Ly(e, l), h = Yh(() => /* @__PURE__ */ Lu(e.scrim) ? e.scrim : null), { globalTop: g, localTop: _, stackStyles: v } = Vy(l, () => e.zIndex, e._disableGlobalStack), { activatorEl: y, activatorRef: b, target: x, targetEl: S, targetRef: C, activatorEvents: w, onAfterLeave: T, contentEvents: E, scrimEvents: D, openedByHover: O } = Ey(e, {
			isActive: l,
			isTop: _,
			contentEl: s,
			isSubmenu: e._submenu
		}), { teleportTarget: k } = Hy(() => {
			let t = e.attach || e.contained;
			if (t) return t;
			let n = y?.value?.getRootNode() || i.proxy?.$el?.getRootNode();
			return n instanceof ShadowRoot && n;
		}), { dimensionStyles: A } = Ig(e), j = Fy(), ee = Y(() => e.locationStrategy === "static" ? Qv(e.location) : void 0), { scopeId: M } = Ry();
		V(() => e.disabled, (e) => {
			e && (l.value = !1);
		});
		let { contentStyles: te, updateLocation: ne } = Zv(e, {
			isRtl: f,
			contentEl: s,
			target: x,
			isActive: l
		});
		fy(e, {
			root: a,
			contentEl: s,
			targetEl: S,
			target: x,
			isActive: l,
			updateLocation: ne
		});
		let re = vr(Gv, null);
		i.parent?.type?.name !== "VMenu" && _r(Gv, null);
		function ie(t) {
			r("click:outside", t), e.persistent ? pe() : l.value = !1, e.scrim || re?.closeParents(t);
		}
		function ae(t) {
			return l.value && _.value && (!e.scrim || t.target === o.value || t instanceof MouseEvent && t.shadowTarget === o.value);
		}
		Py(e, {
			isActive: l,
			localTop: _,
			contentEl: s
		});
		let oe = !1;
		Sr(() => {
			s.value && (y.value ? Zy.set(s.value, y.value) : Zy.delete(s.value));
		});
		function se(e) {
			let t = e, n = /* @__PURE__ */ new Set();
			for (; t;) {
				let e = t.closest(".v-overlay__content");
				if (!e || n.has(e)) return !1;
				if (e === s.value) return !0;
				n.add(e), t = Zy.get(e) ?? null;
			}
			return !1;
		}
		function ce() {
			let e = y.value;
			if (!e || !e.isConnected || e.closest(".v-overlay__content") || s.value?._clickOutside?.lastMousedownWasOutside) return;
			let t = Uf();
			if (!((!t || t === document.body) && oe || t === e || e.contains(t) || se(t))) return;
			let n = e.parentElement, r = n ? Hf(n) : [], i;
			if (r.includes(e)) i = e;
			else {
				let t = Hf(e);
				i = t.find((e) => e.tagName === "INPUT" || e.tagName === "TEXTAREA") ?? t[0];
			}
			i?.focus({ preventScroll: !0 });
		}
		V(l, (e) => {
			if (e) {
				let e = Uf(), t = y.value;
				oe = !!t && (e === t || t.contains(e)), s.value && (s.value.inert = !1), s.value?._clickOutside && (s.value._clickOutside.lastMousedownWasOutside = !1);
			} else s.value && (s.value.inert = !0), ce();
		}, { flush: "post" }), of && V(l, (e) => {
			e ? window.addEventListener("keydown", le) : window.removeEventListener("keydown", le);
		}, { immediate: !0 }), Qi(() => {
			of && window.removeEventListener("keydown", le);
		});
		function le(t) {
			t.key === "Escape" && g.value && (s.value?.contains(Uf()) || r("keydown", t), e.persistent ? pe() : (l.value = !1, s.value?.contains(Uf()) && y.value?.focus()));
		}
		function ue(e) {
			(e.key !== "Escape" || g.value) && r("keydown", e);
		}
		let de = Qg();
		Im(() => e.closeOnBack, () => {
			n_(de, () => {
				if (g.value && l.value) return e.persistent ? pe() : l.value = !1, !1;
			});
		});
		let fe = /* @__PURE__ */ F();
		V(() => l.value && (e.absolute || e.contained) && k.value == null, (e) => {
			if (e) {
				let e = wm(a.value);
				e && e !== document.scrollingElement && (fe.value = e.scrollTop);
			}
		});
		function pe() {
			e.noClickAnimation || s.value && lp(s.value, [
				{ transformOrigin: "center" },
				{ transform: "scale(1.03)" },
				{ transformOrigin: "center" }
			], {
				duration: 150,
				easing: "cubic-bezier(0.4, 0, 0.2, 1)"
			});
		}
		function me() {
			r("afterEnter");
		}
		function he() {
			m(), T(), r("afterLeave");
		}
		return km(() => K(as, null, [t.activator?.({
			isActive: l.value,
			targetRef: C,
			props: ks({ ref: b }, w.value, e.activatorProps)
		}), j.value && p.value && q(zr, {
			disabled: !k.value,
			to: k.value
		}, { default: () => [K("div", ks({
			class: [
				"v-overlay",
				{
					"v-overlay--absolute": e.absolute || e.contained,
					"v-overlay--active": l.value,
					"v-overlay--contained": e.contained
				},
				ee.value,
				u.value,
				d.value,
				e.class
			],
			style: [
				v.value,
				{
					"--v-overlay-opacity": e.opacity,
					top: mf(fe.value)
				},
				e.style
			],
			ref: a,
			onKeydown: ue
		}, M, n), [q(Qy, ks({
			color: h,
			modelValue: l.value && !!e.scrim,
			ref: o
		}, D.value), null), q(Wy, {
			appear: !0,
			persisted: !0,
			transition: e.transition,
			target: x.value,
			onAfterEnter: me,
			onAfterLeave: he
		}, { default: () => [hr(K("div", ks({
			ref: s,
			class: ["v-overlay__content", e.contentClass],
			style: [A.value, te.value]
		}, E.value, e.contentProps), [t.default?.({ isActive: l })]), [[Hc, l.value], [Xy, {
			handler: ie,
			closeConditional: ae,
			include: () => l.value ? [e.contextMenu && !e.openOnClick ? void 0 : y.value, ...Array.from(document.querySelectorAll(".v-overlay__content")).filter(se)] : []
		}]])] })])] })])), {
			activatorEl: y,
			scrimEl: o,
			target: x,
			animateClick: pe,
			contentEl: s,
			rootEl: a,
			globalTop: g,
			localTop: _,
			updateLocation: ne,
			openedByHover: O
		};
	}
}), tb = Symbol.for("vuetify:form"), nb = Z({
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
function rb(e) {
	let t = Lm(e, "modelValue"), n = /* @__PURE__ */ R(() => e.disabled), r = /* @__PURE__ */ R(() => e.readonly), i = /* @__PURE__ */ I(!1), a = /* @__PURE__ */ F([]), o = /* @__PURE__ */ F([]);
	async function s() {
		let t = [], n = !0;
		o.value = [], i.value = !0;
		for (let r of a.value) {
			let i = await r.validate();
			if (i.length > 0 && (n = !1, t.push({
				id: r.id,
				errorMessages: i
			})), !n && e.fastFail) break;
		}
		return o.value = t, i.value = !1, {
			valid: n,
			errors: o.value
		};
	}
	function c() {
		a.value.forEach((e) => e.reset());
	}
	function l() {
		a.value.forEach((e) => e.resetValidation());
	}
	return V(a, () => {
		let e = 0, n = 0, r = [];
		for (let t of a.value) t.isValid === !1 ? (n++, r.push({
			id: t.id,
			errorMessages: t.errorMessages
		})) : t.isValid === !0 && e++;
		o.value = r, t.value = n > 0 ? !1 : e === a.value.length || null;
	}, {
		deep: !0,
		flush: "post"
	}), _r(tb, {
		register: ({ id: e, vm: t, validate: n, reset: r, resetValidation: i }) => {
			a.value.some((t) => t.id === e) && nf(`Duplicate input name "${e}"`), a.value.push({
				id: e,
				validate: n,
				reset: r,
				resetValidation: i,
				vm: sn(t),
				isValid: null,
				errorMessages: []
			});
		},
		unregister: (e) => {
			a.value = a.value.filter((t) => t.id !== e);
		},
		update: (e, t, n) => {
			let r = a.value.find((t) => t.id === e);
			r && (r.isValid = t, r.errorMessages = n);
		},
		isDisabled: n,
		isReadonly: r,
		isValidating: i,
		isValid: t,
		items: a,
		validateOn: /* @__PURE__ */ R(() => e.validateOn)
	}), {
		errors: o,
		isDisabled: n,
		isReadonly: r,
		isValidating: i,
		isValid: t,
		items: a,
		validate: s,
		reset: c,
		resetValidation: l
	};
}
function ib(e) {
	let t = vr(tb, null);
	return {
		...t,
		isReadonly: Y(() => !!(e?.readonly ?? t?.isReadonly.value)),
		isDisabled: Y(() => !!(e?.disabled ?? t?.isDisabled.value))
	};
}
// node_modules/vuetify/lib/composables/forwardRefs.js
var ab = Symbol("Forwarded refs");
function ob(e, t) {
	let n = e;
	for (; n;) {
		let e = Reflect.getOwnPropertyDescriptor(n, t);
		if (e) return e;
		n = Object.getPrototypeOf(n);
	}
}
function sb(e, ...t) {
	return e[ab] = t, new Proxy(e, {
		get(e, n) {
			if (Reflect.has(e, n)) return Reflect.get(e, n);
			if (!(/* @__PURE__ */ Ku(n) || n.startsWith("$") || n.startsWith("__"))) {
				for (let e of t) if (e.value && Reflect.has(e.value, n)) {
					let t = Reflect.get(e.value, n);
					return /* @__PURE__ */ Iu(t) ? t.bind(e.value) : t;
				}
			}
		},
		has(e, n) {
			if (Reflect.has(e, n)) return !0;
			if (/* @__PURE__ */ Ku(n) || n.startsWith("$") || n.startsWith("__")) return !1;
			for (let e of t) if (e.value && Reflect.has(e.value, n)) return !0;
			return !1;
		},
		set(e, n, r) {
			if (Reflect.has(e, n)) return Reflect.set(e, n, r);
			if (/* @__PURE__ */ Ku(n) || n.startsWith("$") || n.startsWith("__")) return !1;
			for (let e of t) if (e.value && Reflect.has(e.value, n)) return Reflect.set(e.value, n, r);
			return !1;
		},
		getOwnPropertyDescriptor(e, n) {
			let r = Reflect.getOwnPropertyDescriptor(e, n);
			if (r) return r;
			if (!(/* @__PURE__ */ Ku(n) || n.startsWith("$") || n.startsWith("__"))) {
				for (let e of t) {
					if (!e.value) continue;
					let t = ob(e.value, n) ?? ("_" in e.value ? ob(e.value._?.setupState, n) : void 0);
					if (t) return t;
				}
				for (let e of t) {
					let t = e.value && e.value[ab];
					if (!t) continue;
					let r = t.slice();
					for (; r.length;) {
						let e = r.shift(), t = ob(e.value, n);
						if (t) return t;
						let i = e.value && e.value[ab];
						i && r.push(...i);
					}
				}
			}
		}
	});
}
// node_modules/vuetify/lib/components/VForm/VForm.js
var cb = Z({
	...tf(),
	...nb()
}, "VForm"), lb = hm()({
	name: "VForm",
	props: cb(),
	emits: {
		"update:modelValue": (e) => !0,
		submit: (e) => !0
	},
	setup(e, { slots: t, emit: n }) {
		let r = rb(e), i = /* @__PURE__ */ F();
		function a(e) {
			e.preventDefault(), r.reset();
		}
		function o(e) {
			let t = e, a = r.validate();
			t.then = a.then.bind(a), t.catch = a.catch.bind(a), t.finally = a.finally.bind(a), n("submit", t), t.defaultPrevented || a.then(({ valid: e }) => {
				e && i.value?.submit();
			}), t.preventDefault();
		}
		return km(() => K("form", {
			ref: i,
			class: ge(["v-form", e.class]),
			style: de(e.style),
			novalidate: !0,
			onReset: a,
			onSubmit: o
		}, [t.default?.({
			get errors() {
				return r.errors.value;
			},
			get isDisabled() {
				return r.isDisabled.value;
			},
			get isReadonly() {
				return r.isReadonly.value;
			},
			get isValidating() {
				return r.isValidating.value;
			},
			get isValid() {
				return r.isValid.value;
			},
			get items() {
				return r.items.value;
			},
			validate: r.validate,
			reset: r.reset,
			resetValidation: r.resetValidation
		})])), sb(r, i);
	}
}), ub = Z({
	disabled: Boolean,
	group: Boolean,
	hideOnLeave: Boolean,
	leaveAbsolute: Boolean,
	mode: String,
	origin: String
}, "transition");
function db(e, t, n) {
	return hm()({
		name: e,
		props: ub({
			mode: n,
			origin: t
		}),
		setup(t, { slots: n }) {
			let r = {
				onBeforeEnter(e) {
					t.origin && (e.style.transformOrigin = t.origin);
				},
				onLeave(e) {
					if (t.leaveAbsolute) {
						let { offsetTop: t, offsetLeft: n, offsetWidth: r, offsetHeight: i } = e;
						e._transitionInitialStyles = {
							position: e.style.position,
							top: e.style.top,
							left: e.style.left,
							width: e.style.width,
							height: e.style.height
						}, e.style.position = "absolute", e.style.top = `${t}px`, e.style.left = `${n}px`, e.style.width = `${r}px`, e.style.height = `${i}px`;
					}
					t.hideOnLeave && e.style.setProperty("display", "none", "important");
				},
				onAfterLeave(e) {
					if (t.leaveAbsolute && e?._transitionInitialStyles) {
						let { position: t, top: n, left: r, width: i, height: a } = e._transitionInitialStyles;
						delete e._transitionInitialStyles, e.style.position = t || "", e.style.top = n || "", e.style.left = r || "", e.style.width = i || "", e.style.height = a || "";
					}
				}
			};
			return () => X(t.group ? Pl : wc, {
				name: t.disabled ? "" : e,
				css: !t.disabled,
				...t.group ? void 0 : { mode: t.mode },
				...t.disabled ? {} : r
			}, n.default);
		}
	});
}
function fb(e, t, n = "in-out") {
	return hm()({
		name: e,
		props: {
			mode: {
				type: String,
				default: n
			},
			disabled: {
				type: Boolean,
				default: uf()
			},
			group: Boolean,
			hideOnLeave: Boolean
		},
		setup(n, { slots: r }) {
			let i = n.group ? Pl : wc;
			return () => X(i, {
				name: n.disabled ? "" : e,
				css: !n.disabled,
				...n.disabled ? {} : {
					...t,
					onLeave: (e) => {
						n.hideOnLeave ? e.style.setProperty("display", "none", "important") : t.onLeave?.(e);
					}
				}
			}, r.default);
		}
	});
}
// node_modules/vuetify/lib/components/transitions/expand-transition.js
function pb(e = "", t = "y") {
	return {
		onBeforeEnter(e) {
			e._parent = e.parentNode, e._initialStyle = {
				transition: e.style.transition,
				overflow: e.style.overflow,
				width: e.style.width,
				height: e.style.height
			};
		},
		onEnter(n) {
			let r = n._initialStyle;
			if (!r) return;
			n.style.setProperty("transition", "none", "important"), n.style.overflow = "hidden";
			let i = `${n.offsetWidth}px`, a = `${n.offsetHeight}px`;
			["x", "both"].includes(t) && (n.style.width = "0"), ["y", "both"].includes(t) && (n.style.height = "0"), n.offsetHeight, n.style.transition = r.transition, e && n._parent && n._parent.classList.add(e), requestAnimationFrame(() => {
				["x", "both"].includes(t) && (n.style.width = i), ["y", "both"].includes(t) && (n.style.height = a);
			});
		},
		onAfterEnter: r,
		onEnterCancelled: r,
		onLeave(e) {
			e._initialStyle = {
				transition: "",
				overflow: e.style.overflow,
				width: e.style.width,
				height: e.style.height
			}, e.style.overflow = "hidden", ["x", "both"].includes(t) && (e.style.width = `${e.offsetWidth}px`), ["y", "both"].includes(t) && (e.style.height = `${e.offsetHeight}px`), e.offsetHeight, requestAnimationFrame(() => {
				["x", "both"].includes(t) && (e.style.width = "0"), ["y", "both"].includes(t) && (e.style.height = "0");
			});
		},
		onAfterLeave: n,
		onLeaveCancelled: n
	};
	function n(t) {
		e && t._parent && t._parent.classList.remove(e), r(t);
	}
	function r(e) {
		if (!e._initialStyle) return;
		let { width: n, height: r } = e._initialStyle;
		e.style.overflow = e._initialStyle.overflow, n != null && ["x", "both"].includes(t) && (e.style.width = n), r != null && ["y", "both"].includes(t) && (e.style.height = r), delete e._initialStyle;
	}
}
// node_modules/vuetify/lib/components/transitions/dialog-transition.js
var mb = Z({ target: [Object, Array] }, "v-dialog-transition"), hb = /* @__PURE__ */ new WeakMap(), gb = hm()({
	name: "VDialogTransition",
	props: mb(),
	setup(e, { slots: t }) {
		let n = {
			onBeforeEnter(e) {
				e.style.pointerEvents = "none", e.style.visibility = "hidden";
			},
			async onEnter(t, n) {
				await new Promise((e) => requestAnimationFrame(e)), await new Promise((e) => requestAnimationFrame(e)), t.style.visibility = "";
				let r = vb(e.target, t), { x: i, y: a, sx: o, sy: s, speed: c } = r;
				if (hb.set(t, r), uf()) lp(t, [{ opacity: 0 }, {}], {
					duration: 125 * c,
					easing: xm
				}).finished.then(() => n());
				else {
					let e = lp(t, [{
						transform: `translate(${i}px, ${a}px) scale(${o}, ${s})`,
						opacity: 0
					}, {}], {
						duration: 225 * c,
						easing: xm
					});
					_b(t)?.forEach((e) => {
						lp(e, [
							{ opacity: 0 },
							{
								opacity: 0,
								offset: .33
							},
							{}
						], {
							duration: 450 * c,
							easing: bm
						});
					}), e.finished.then(() => n());
				}
			},
			onAfterEnter(e) {
				e.style.removeProperty("pointer-events");
			},
			onBeforeLeave(e) {
				e.style.pointerEvents = "none";
			},
			async onLeave(t, n) {
				await new Promise((e) => requestAnimationFrame(e));
				let r;
				r = !hb.has(t) || Array.isArray(e.target) || e.target.offsetParent || e.target.getClientRects().length ? vb(e.target, t) : hb.get(t);
				let { x: i, y: a, sx: o, sy: s, speed: c } = r;
				uf() ? lp(t, [{}, { opacity: 0 }], {
					duration: 85 * c,
					easing: Sm
				}).finished.then(() => n()) : (lp(t, [{}, {
					transform: `translate(${i}px, ${a}px) scale(${o}, ${s})`,
					opacity: 0
				}], {
					duration: 125 * c,
					easing: Sm
				}).finished.then(() => n()), _b(t)?.forEach((e) => {
					lp(e, [
						{},
						{
							opacity: 0,
							offset: .2
						},
						{ opacity: 0 }
					], {
						duration: 250 * c,
						easing: bm
					});
				}));
			},
			onAfterLeave(e) {
				e.style.removeProperty("pointer-events");
			}
		};
		return () => e.target ? q(wc, ks({ name: "dialog-transition" }, n, { css: !1 }), t) : q(wc, { name: "dialog-transition" }, t);
	}
});
function _b(e) {
	let t = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")?.children;
	return t && [...t];
}
function vb(e, t) {
	let n = op(e), r = cp(t), [i, a] = getComputedStyle(t).transformOrigin.split(" ").map((e) => parseFloat(e)), [o, s] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" "), c = n.left + n.width / 2;
	o === "left" || s === "left" ? c -= n.width / 2 : (o === "right" || s === "right") && (c += n.width / 2);
	let l = n.top + n.height / 2;
	o === "top" || s === "top" ? l -= n.height / 2 : (o === "bottom" || s === "bottom") && (l += n.height / 2);
	let u = n.width / r.width, d = n.height / r.height, f = Math.max(1, u, d), p = u / f || 0, m = d / f || 0, h = r.width * r.height / (window.innerWidth * window.innerHeight), g = h > .12 ? Math.min(1.5, (h - .12) * 10 + 1) : 1;
	return {
		x: c - (i + r.left),
		y: l - (a + r.top),
		sx: p,
		sy: m,
		speed: g
	};
}
db("fab-transition", "center center", "out-in"), db("dialog-bottom-transition"), db("dialog-top-transition"), db("fade-transition"), db("scale-transition"), db("scroll-x-transition"), db("scroll-x-reverse-transition"), db("scroll-y-transition"), db("scroll-y-reverse-transition"), db("slide-x-transition"), db("slide-x-reverse-transition");
var yb = db("slide-y-transition");
db("slide-y-reverse-transition"), fb("expand-transition", pb());
var bb = fb("expand-x-transition", pb("", "x"));
fb("expand-both-transition", pb("", "both"));
// node_modules/vuetify/lib/components/VDialog/VDialog.js
var xb = Z({
	fullscreen: Boolean,
	scrollable: Boolean,
	...xf($y({
		captureFocus: !0,
		location: "center center",
		origin: "center center",
		scrollStrategy: "block",
		transition: { component: gb },
		zIndex: 2400,
		retainFocus: !0
	}), ["disableInitialFocus"])
}, "VDialog"), Sb = hm()({
	name: "VDialog",
	props: xb(),
	emits: {
		"update:modelValue": (e) => !0,
		"click:outside": (e) => !0,
		afterEnter: () => !0,
		afterLeave: () => !0
	},
	setup(e, { emit: t, slots: n }) {
		let r = Lm(e, "modelValue"), { scopeId: i } = Ry(), a = /* @__PURE__ */ F();
		function o() {
			t("afterEnter"), (e.scrim || e.retainFocus) && a.value?.contentEl && !a.value.contentEl.contains(Uf()) && a.value.contentEl.focus({ preventScroll: !0 });
		}
		function s() {
			t("afterLeave");
		}
		return V(r, async (e) => {
			e || (await z(), a.value?.activatorEl?.focus({ preventScroll: !0 }));
		}), km(() => {
			let c = eb.filterProps(e), l = ks({ "aria-haspopup": "dialog" }, e.activatorProps), u = ks({ tabindex: -1 }, e.contentProps), d = e.fullscreen ? Wf : e.locationStrategy;
			return q(eb, ks({
				ref: a,
				class: [
					"v-dialog",
					{
						"v-dialog--fullscreen": e.fullscreen,
						"v-dialog--scrollable": e.scrollable
					},
					e.class
				],
				style: e.style
			}, c, {
				modelValue: r.value,
				"onUpdate:modelValue": (e) => r.value = e,
				"aria-modal": "true",
				activatorProps: l,
				contentProps: u,
				height: e.fullscreen ? void 0 : e.height,
				width: e.fullscreen ? void 0 : e.width,
				maxHeight: e.fullscreen ? void 0 : e.maxHeight,
				maxWidth: e.fullscreen ? void 0 : e.maxWidth,
				locationStrategy: d,
				role: "dialog",
				onAfterEnter: o,
				onAfterLeave: s,
				"onClick:outside": (e) => t("click:outside", e)
			}, i), {
				activator: n.activator,
				default: (...e) => q(mg, { root: "VDialog" }, { default: () => [n.default?.(...e)] })
			});
		}), sb({}, a);
	}
}), Cb = 0;
function wb(e, t = {}) {
	let n = () => ({
		fullText: "전체 내용",
		close: "닫기",
		viewFullText: (e) => e + " — 전체 내용 보기",
		...typeof t == "function" ? t() : t
	}), r = "sol-full-text-" + ++Cb, i = new AbortController(), a = i.signal, o = /* @__PURE__ */ new Map(), s = 0, c = 0, l = null, u = null, d = !1, f = null, p = null, m = !1, h = document.createElement("div");
	h.id = r + "-hint", h.className = "sol-tooltip sol-overflow-tooltip", h.role = "tooltip", h.hidden = !0;
	let g = document.createElement("dialog");
	g.className = "sol-dialog sol-full-text-dialog", g.setAttribute("aria-labelledby", r + "-title"), g.innerHTML = "<div class=\"row-between\"><h2 id=\"" + r + "-title\">전체 제목</h2><button type=\"button\" class=\"sol-button inline-action\" autofocus>닫기 ×</button></div><p class=\"sol-full-text-content\"></p>", document.body.append(h, g);
	let _ = g.querySelector("button"), v = (e, t, n, r = {}) => e.addEventListener(t, n, {
		...r,
		signal: a
	});
	function y() {
		if (clearTimeout(c), l) {
			let e = (l.getAttribute("aria-describedby") || "").split(" ").filter((e) => e && e !== h.id);
			e.length ? l.setAttribute("aria-describedby", e.join(" ")) : l.removeAttribute("aria-describedby");
		}
		h.hidden = !0, l = null;
	}
	function b(e) {
		if (f === e.trigger || g.open) return;
		y(), l = e.trigger, h.textContent = e.node.textContent, h.hidden = !1;
		let t = new Set((l.getAttribute("aria-describedby") || "").split(" ").filter(Boolean));
		t.add(h.id), l.setAttribute("aria-describedby", [...t].join(" "));
		let n = l.getBoundingClientRect(), r = h.getBoundingClientRect();
		h.style.left = Math.max(8, Math.min(n.left, innerWidth - r.width - 8)) + "px", h.style.top = Math.max(8, n.bottom + r.height + 8 < innerHeight ? n.bottom + 6 : n.top - r.height - 6) + "px";
	}
	function x() {
		clearTimeout(c), c = setTimeout(() => {
			l && u !== l && !d && !l.contains(document.activeElement) && y();
		}, 100);
	}
	function S() {
		s = 0, g.querySelector("h2").textContent = n().fullText, _.textContent = n().close + " ×";
		let t = w(document.activeElement);
		for (let [t, r] of o) e.contains(t) ? (r.key = t.closest("[data-row-id]")?.dataset.rowId || t.textContent, r.created && r.trigger.setAttribute("aria-label", n().viewFullText(t.textContent)), l === r.trigger && h.textContent !== t.textContent && b(r)) : (l === r.trigger && y(), o.delete(t));
		for (let t of e.querySelectorAll(".sol-record-title,.sol-ellipsis")) {
			if (o.has(t) || t.scrollWidth <= t.clientWidth + 1 || !t.getClientRects().length) continue;
			let e = t.closest("a,button"), r = !1;
			e || (e = document.createElement("button"), e.type = "button", e.className = "sol-title-preview", e.setAttribute("aria-haspopup", "dialog"), e.setAttribute("aria-label", n().viewFullText(t.textContent)), t.before(e), e.append(t), r = !0), o.set(t, {
				node: t,
				trigger: e,
				created: r,
				key: t.closest("[data-row-id]")?.dataset.rowId || t.textContent
			});
		}
		if (!g.open && t && !t.trigger.getClientRects().length) {
			let e = [...o.values()].find((e) => e.key === t.key && e.trigger.getClientRects().length);
			e && (f = e.trigger, e.trigger.focus({ preventScroll: !0 }));
		}
	}
	function C() {
		s ||= requestAnimationFrame(S);
	}
	function w(e) {
		for (let t of o.values()) if (t.trigger === e || t.trigger.contains(e)) return t;
		return null;
	}
	v(e, "pointerover", (e) => {
		let t = w(e.target);
		t && !t.trigger.contains(e.relatedTarget) && (u = t.trigger, b(t));
	}), v(e, "pointerout", (e) => {
		let t = w(e.target);
		t && !t.trigger.contains(e.relatedTarget) && (u = null, f === t.trigger && (f = null), x());
	}), v(e, "focusin", (e) => {
		let t = w(e.target);
		t && b(t);
	}), v(e, "focusout", (e) => {
		let t = w(e.target);
		t && (f === t.trigger && (f = null), x());
	}), v(h, "pointerenter", () => {
		d = !0, clearTimeout(c);
	}), v(h, "pointerleave", () => {
		d = !1, x();
	}), v(e, "click", (e) => {
		let t = w(e.target);
		t?.created && (p = t.trigger, f = p, y(), g.querySelector("p").textContent = t.node.textContent, g.showModal(), _.focus());
	}), v(_, "click", () => g.close()), v(g, "close", () => {
		if (!m) {
			S();
			let t = [...o.values()].find((e) => e.trigger === p), n = p?.isConnected && p.getClientRects().length ? p : [...o.values()].find((e) => e.key === t?.key && e.trigger.getClientRects().length)?.trigger || e.querySelector("h1,button,a,[tabindex]");
			n && (f = n, n.focus({ preventScroll: !0 }));
		}
	}), v(document, "keydown", (e) => {
		e.key === "Escape" && !e.isComposing && !h.hidden && (f = l, y());
	}), v(document, "scroll", (e) => {
		if (e.target === h) return;
		let t = l && w(l);
		t && l.contains(document.activeElement) ? b(t) : y();
	}, { capture: !0 }), v(window, "resize", () => {
		y(), C();
	});
	let T = new MutationObserver(C);
	T.observe(e, {
		childList: !0,
		subtree: !0,
		characterData: !0
	}), S();
	let E = () => {
		m = !0, i.abort(), T.disconnect(), clearTimeout(c), s && cancelAnimationFrame(s), y(), g.open && g.close(), g.remove(), h.remove();
		for (let e of o.values()) e.created && e.trigger.isConnected && e.trigger.replaceWith(e.node);
		o.clear();
	};
	return E.refresh = S, E;
}
// node_modules/solyi-ui/dist/core/index.js
var Tb = {
	version: "1.1.1",
	format: "Solyi plain JSON export (not a DTCG interchange format)",
	description: "CSS role tokens shared by the documentation and its examples. Violet is a starting theme, not a permanent brand requirement.",
	base: {
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
	reference: {
		"brand-purple": "#6666AA",
		"brand-sage": "#91A99A",
		"brand-light": "#EBECE7",
		"brand-paper": "#F9FAF7",
		"brand-ink": "#2F3040"
	},
	themes: {
		violet: {
			label: "Cool violet",
			description: "차분한 쿨 바이올렛. v0.1의 기본 출발점.",
			light: {
				canvas: "#F5F6FA",
				surface: "#FFFFFF",
				"surface-alt": "#ECEEF5",
				text: "#202330",
				muted: "#5F6375",
				border: "#D9DCE6",
				"control-border": "#818596",
				accent: "#7560B5",
				"accent-hover": "#604B9C",
				"accent-soft": "#F4F0FA",
				"on-accent": "#FFFFFF",
				focus: "#7560B5",
				success: "#256448",
				"success-soft": "#E6F2EA",
				warning: "#885019",
				"warning-soft": "#FFF2DB",
				danger: "#B33750",
				"danger-soft": "#FBEAF0",
				info: "#315D96",
				"info-soft": "#EAF0FA",
				"selected-surface": "#F4F0FA",
				"selected-text": "#202330",
				"selected-border": "#7560B5",
				"selected-indicator": "#7560B5",
				"categorical-1-foreground": "#1e40af",
				"categorical-1-background": "#dbeafe",
				"categorical-1-border": "#2563eb",
				"categorical-2-foreground": "#065f46",
				"categorical-2-background": "#d1fae5",
				"categorical-2-border": "#059669",
				"categorical-3-foreground": "#9a3412",
				"categorical-3-background": "#ffedd5",
				"categorical-3-border": "#c2410c",
				"categorical-4-foreground": "#6b21a8",
				"categorical-4-background": "#f3e8ff",
				"categorical-4-border": "#9333ea",
				"categorical-5-foreground": "#9d174d",
				"categorical-5-background": "#fce7f3",
				"categorical-5-border": "#db2777",
				"categorical-6-foreground": "#155e75",
				"categorical-6-background": "#cffafe",
				"categorical-6-border": "#0e7490",
				"categorical-7-foreground": "#854d0e",
				"categorical-7-background": "#fef9c3",
				"categorical-7-border": "#a16207",
				"categorical-8-foreground": "#334155",
				"categorical-8-background": "#f1f5f9",
				"categorical-8-border": "#64748b"
			},
			dark: {
				canvas: "#171821",
				surface: "#20222E",
				"surface-alt": "#292C3B",
				text: "#F0F0F7",
				muted: "#B7B9C9",
				border: "#424658",
				"control-border": "#85899D",
				accent: "#B8A3F1",
				"accent-hover": "#CAB8F9",
				"accent-soft": "#342C49",
				"on-accent": "#211A30",
				focus: "#C6B2FF",
				success: "#8DD3AD",
				"success-soft": "#213C31",
				warning: "#F2C27B",
				"warning-soft": "#403321",
				danger: "#FFA9B8",
				"danger-soft": "#452A35",
				info: "#AACCF6",
				"info-soft": "#26364C",
				"selected-surface": "#342C49",
				"selected-text": "#F0F0F7",
				"selected-border": "#B8A3F1",
				"selected-indicator": "#B8A3F1",
				"categorical-1-foreground": "#bfdbfe",
				"categorical-1-background": "#172554",
				"categorical-1-border": "#60a5fa",
				"categorical-2-foreground": "#a7f3d0",
				"categorical-2-background": "#022c22",
				"categorical-2-border": "#34d399",
				"categorical-3-foreground": "#fed7aa",
				"categorical-3-background": "#431407",
				"categorical-3-border": "#fb923c",
				"categorical-4-foreground": "#e9d5ff",
				"categorical-4-background": "#3b0764",
				"categorical-4-border": "#c084fc",
				"categorical-5-foreground": "#fbcfe8",
				"categorical-5-background": "#500724",
				"categorical-5-border": "#f472b6",
				"categorical-6-foreground": "#a5f3fc",
				"categorical-6-background": "#083344",
				"categorical-6-border": "#22d3ee",
				"categorical-7-foreground": "#fef08a",
				"categorical-7-background": "#422006",
				"categorical-7-border": "#facc15",
				"categorical-8-foreground": "#e2e8f0",
				"categorical-8-background": "#1e293b",
				"categorical-8-border": "#94a3b8"
			}
		},
		sage: {
			label: "Quiet sage",
			description: "공개 브랜드의 세이지에서 확장한 선택 테마. 액션 색은 대비를 위해 더 짙게 조정.",
			light: {
				canvas: "#F4F6F2",
				surface: "#FFFFFF",
				"surface-alt": "#E9EEE8",
				text: "#28372F",
				muted: "#58685E",
				border: "#D5DED5",
				"control-border": "#7B8B7F",
				accent: "#476A56",
				"accent-hover": "#355443",
				"accent-soft": "#E6EEE7",
				"on-accent": "#FFFFFF",
				focus: "#476A56",
				success: "#256448",
				"success-soft": "#E6F2EA",
				warning: "#885019",
				"warning-soft": "#FFF2DB",
				danger: "#B33750",
				"danger-soft": "#FBEAF0",
				info: "#315D96",
				"info-soft": "#EAF0FA",
				"selected-surface": "#E6EEE7",
				"selected-text": "#28372F",
				"selected-border": "#476A56",
				"selected-indicator": "#476A56",
				"categorical-1-foreground": "#1e40af",
				"categorical-1-background": "#dbeafe",
				"categorical-1-border": "#2563eb",
				"categorical-2-foreground": "#065f46",
				"categorical-2-background": "#d1fae5",
				"categorical-2-border": "#059669",
				"categorical-3-foreground": "#9a3412",
				"categorical-3-background": "#ffedd5",
				"categorical-3-border": "#c2410c",
				"categorical-4-foreground": "#6b21a8",
				"categorical-4-background": "#f3e8ff",
				"categorical-4-border": "#9333ea",
				"categorical-5-foreground": "#9d174d",
				"categorical-5-background": "#fce7f3",
				"categorical-5-border": "#db2777",
				"categorical-6-foreground": "#155e75",
				"categorical-6-background": "#cffafe",
				"categorical-6-border": "#0e7490",
				"categorical-7-foreground": "#854d0e",
				"categorical-7-background": "#fef9c3",
				"categorical-7-border": "#a16207",
				"categorical-8-foreground": "#334155",
				"categorical-8-background": "#f1f5f9",
				"categorical-8-border": "#64748b"
			},
			dark: {
				canvas: "#17201B",
				surface: "#202C25",
				"surface-alt": "#2B3930",
				text: "#EEF4EF",
				muted: "#B5C6B9",
				border: "#42594A",
				"control-border": "#829C8A",
				accent: "#A1CBB0",
				"accent-hover": "#BBDEC6",
				"accent-soft": "#2E4536",
				"on-accent": "#182E20",
				focus: "#BBDEC6",
				success: "#8DD3AD",
				"success-soft": "#213C31",
				warning: "#F2C27B",
				"warning-soft": "#403321",
				danger: "#FFA9B8",
				"danger-soft": "#452A35",
				info: "#AACCF6",
				"info-soft": "#26364C",
				"selected-surface": "#2E4536",
				"selected-text": "#EEF4EF",
				"selected-border": "#A1CBB0",
				"selected-indicator": "#A1CBB0",
				"categorical-1-foreground": "#bfdbfe",
				"categorical-1-background": "#172554",
				"categorical-1-border": "#60a5fa",
				"categorical-2-foreground": "#a7f3d0",
				"categorical-2-background": "#022c22",
				"categorical-2-border": "#34d399",
				"categorical-3-foreground": "#fed7aa",
				"categorical-3-background": "#431407",
				"categorical-3-border": "#fb923c",
				"categorical-4-foreground": "#e9d5ff",
				"categorical-4-background": "#3b0764",
				"categorical-4-border": "#c084fc",
				"categorical-5-foreground": "#fbcfe8",
				"categorical-5-background": "#500724",
				"categorical-5-border": "#f472b6",
				"categorical-6-foreground": "#a5f3fc",
				"categorical-6-background": "#083344",
				"categorical-6-border": "#22d3ee",
				"categorical-7-foreground": "#fef08a",
				"categorical-7-background": "#422006",
				"categorical-7-border": "#facc15",
				"categorical-8-foreground": "#e2e8f0",
				"categorical-8-background": "#1e293b",
				"categorical-8-border": "#94a3b8"
			}
		},
		sand: {
			label: "Warm sand",
			description: "공개 브랜드의 종이·베이지에서 확장한 읽기 중심 선택 테마.",
			light: {
				canvas: "#F6F0E8",
				surface: "#FFFDFA",
				"surface-alt": "#EFE8DF",
				text: "#352E2C",
				muted: "#6E625B",
				border: "#E0D5C9",
				"control-border": "#968374",
				accent: "#85614D",
				"accent-hover": "#6B4938",
				"accent-soft": "#F5ECE3",
				"on-accent": "#FFFFFF",
				focus: "#85614D",
				success: "#256448",
				"success-soft": "#E6F2EA",
				warning: "#885019",
				"warning-soft": "#FFF2DB",
				danger: "#B33750",
				"danger-soft": "#FBEAF0",
				info: "#315D96",
				"info-soft": "#EAF0FA",
				"selected-surface": "#E8D2BC",
				"selected-text": "#4A3020",
				"selected-border": "#8B6248",
				"selected-indicator": "#805338",
				"categorical-1-foreground": "#1e40af",
				"categorical-1-background": "#dbeafe",
				"categorical-1-border": "#2563eb",
				"categorical-2-foreground": "#065f46",
				"categorical-2-background": "#d1fae5",
				"categorical-2-border": "#059669",
				"categorical-3-foreground": "#9a3412",
				"categorical-3-background": "#ffedd5",
				"categorical-3-border": "#c2410c",
				"categorical-4-foreground": "#6b21a8",
				"categorical-4-background": "#f3e8ff",
				"categorical-4-border": "#9333ea",
				"categorical-5-foreground": "#9d174d",
				"categorical-5-background": "#fce7f3",
				"categorical-5-border": "#db2777",
				"categorical-6-foreground": "#155e75",
				"categorical-6-background": "#cffafe",
				"categorical-6-border": "#0e7490",
				"categorical-7-foreground": "#854d0e",
				"categorical-7-background": "#fef9c3",
				"categorical-7-border": "#a16207",
				"categorical-8-foreground": "#334155",
				"categorical-8-background": "#f1f5f9",
				"categorical-8-border": "#64748b"
			},
			dark: {
				canvas: "#211B17",
				surface: "#302720",
				"surface-alt": "#3A3129",
				text: "#F6EEE5",
				muted: "#CEBEB0",
				border: "#5B4A3E",
				"control-border": "#A28A77",
				accent: "#D9B394",
				"accent-hover": "#E8C8AB",
				"accent-soft": "#483629",
				"on-accent": "#302116",
				focus: "#E8C8AB",
				success: "#8DD3AD",
				"success-soft": "#213C31",
				warning: "#F2C27B",
				"warning-soft": "#403321",
				danger: "#FFA9B8",
				"danger-soft": "#452A35",
				info: "#AACCF6",
				"info-soft": "#26364C",
				"selected-surface": "#543E2E",
				"selected-text": "#FFF1E4",
				"selected-border": "#D9B394",
				"selected-indicator": "#EDC9A6",
				"categorical-1-foreground": "#bfdbfe",
				"categorical-1-background": "#172554",
				"categorical-1-border": "#60a5fa",
				"categorical-2-foreground": "#a7f3d0",
				"categorical-2-background": "#022c22",
				"categorical-2-border": "#34d399",
				"categorical-3-foreground": "#fed7aa",
				"categorical-3-background": "#431407",
				"categorical-3-border": "#fb923c",
				"categorical-4-foreground": "#e9d5ff",
				"categorical-4-background": "#3b0764",
				"categorical-4-border": "#c084fc",
				"categorical-5-foreground": "#fbcfe8",
				"categorical-5-background": "#500724",
				"categorical-5-border": "#f472b6",
				"categorical-6-foreground": "#a5f3fc",
				"categorical-6-background": "#083344",
				"categorical-6-border": "#22d3ee",
				"categorical-7-foreground": "#fef08a",
				"categorical-7-background": "#422006",
				"categorical-7-border": "#facc15",
				"categorical-8-foreground": "#e2e8f0",
				"categorical-8-background": "#1e293b",
				"categorical-8-border": "#94a3b8"
			}
		}
	},
	density: {
		comfortable: {
			"content-gap": "1rem",
			"row-padding": "1rem",
			"table-cell-padding-y": "0.375rem",
			"list-item-padding-y": "0.75rem"
		},
		compact: {
			"content-gap": "0.75rem",
			"row-padding": "0.75rem",
			"table-cell-padding-y": "0.25rem",
			"list-item-padding-y": "0.5rem"
		}
	}
};
function Eb(e, t, { theme: n = "violet", mode: r = "light" } = {}) {
	if (typeof t != "string" && (typeof t != "number" || !Number.isFinite(t))) throw TypeError("A category key must be a string or finite number");
	if (!Object.hasOwn(e.themes, n) || r !== "light" && r !== "dark") throw TypeError("Unknown categorical appearance");
	let i = typeof t == "number" ? "n:" + String(t) : "s:" + t, a = 2166136261;
	for (let e = 0; e < i.length; e++) a ^= i.charCodeAt(e), a = Math.imul(a, 16777619) >>> 0;
	let o = a % 8, s = "c" + (o + 1), c = e.themes[n][r], l = "categorical-" + (o + 1) + "-";
	return Object.freeze({
		category: s,
		index: o,
		foreground: c[l + "foreground"],
		background: c[l + "background"],
		border: c[l + "border"]
	});
}
function Db(e, t) {
	return Eb(Tb, e, t);
}
// node_modules/vuetify/lib/components/VGrid/VContainer.js
var Ob = Z({
	fluid: {
		type: Boolean,
		default: !1
	},
	...tf(),
	...Fg(),
	...vh()
}, "VContainer"), kb = hm()({
	name: "VContainer",
	props: Ob(),
	setup(e, { slots: t }) {
		let { rtlClasses: n } = th(), { dimensionStyles: r } = Ig(e);
		return km(() => q(e.tag, {
			class: ge([
				"v-container",
				{ "v-container--fluid": e.fluid },
				n.value,
				e.class
			]),
			style: de([r.value, e.style])
		}, t)), {};
	}
}), Ab = jv.reduce((e, t) => (e[t] = {
	type: [
		Boolean,
		String,
		Number
	],
	default: !1
}, e), {}), jb = jv.reduce((e, t) => {
	let n = "offset" + te(t);
	return e[n] = {
		type: [String, Number],
		default: null
	}, e;
}, {}), Mb = {
	col: _f(Ab),
	offset: _f(jb),
	order: [
		"order",
		"orderSm",
		"orderMd",
		"orderLg",
		"orderXl",
		"orderXxl"
	]
};
function Nb(e) {
	if (/* @__PURE__ */ Lu(e) && e.includes("/")) {
		let [t, n] = e.split("/");
		return {
			cols: Number(t),
			size: Number(n)
		};
	}
	return { cols: e };
}
function Pb(e, t, n) {
	if (n == null || n === !1) return {};
	let { cols: r, size: i } = Nb(n), a = t.replace(e, "").toLowerCase();
	return e === "offset" ? {
		className: `v-col--offset-${a}-${r}`,
		variables: [{ [`--v-col-offset-base-${a}`]: i }]
	} : e === "order" ? { className: `order-${a}-${r}` } : {
		className: r === "" || r === !0 ? `v-col--${a}` : `v-col--cols-${a}-${r}`,
		variables: [{ [`--v-col-size-base-${a}`]: i }]
	};
}
var Fb = [
	"auto",
	"start",
	"end",
	"center",
	"baseline",
	"stretch"
], Ib = (e) => Fb.includes(e), Lb = Z({
	cols: {
		type: [
			Boolean,
			String,
			Number
		],
		default: !1
	},
	...Ab,
	offset: {
		type: [String, Number],
		default: null
	},
	...jb,
	order: {
		type: [String, Number],
		default: null
	},
	orderSm: {
		type: [String, Number],
		default: null
	},
	orderMd: {
		type: [String, Number],
		default: null
	},
	orderLg: {
		type: [String, Number],
		default: null
	},
	orderXl: {
		type: [String, Number],
		default: null
	},
	orderXxl: {
		type: [String, Number],
		default: null
	},
	alignSelf: {
		type: String,
		default: null,
		validator: Ib
	},
	...tf(),
	...vh()
}, "VCol"), Rb = hm()({
	name: "VCol",
	props: Lb(),
	setup(e, { slots: t }) {
		let n = Y(() => Nb(e.cols).size), r = Y(() => Nb(e.offset).size), i = Y(() => {
			let t = ["v-col"], n = [], r;
			for (r in Mb) Mb[r].forEach((i) => {
				let a = e[i], { className: o, variables: s } = Pb(r, i, a);
				o && t.push(o), s && n.push(...s);
			});
			let { cols: i } = Nb(e.cols), { cols: a } = Nb(e.offset);
			return t.push({
				[`v-col--cols-${i}`]: i,
				[`v-col--offset-${a}`]: a,
				[`order-${e.order}`]: e.order,
				[`align-self-${e.alignSelf}`]: e.alignSelf
			}), {
				classes: t,
				variables: n
			};
		});
		return () => X(e.tag, {
			class: [i.value.classes, e.class],
			style: [
				{ "--v-col-size-base": n.value },
				{ "--v-col-offset-base": r.value },
				i.value.variables,
				e.style
			]
		}, t.default?.());
	}
}), zb = [
	"start",
	"end",
	"center"
], Bb = [
	"space-between",
	"space-around",
	"space-evenly"
], Vb = [
	...zb,
	"baseline",
	"stretch"
], Hb = (e) => Vb.includes(e), Ub = [...zb, ...Bb], Wb = (e) => Ub.includes(e), Gb = [
	...zb,
	...Bb,
	"stretch"
], Kb = (e) => Gb.includes(e), qb = {
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
}, Jb = [
	"gap",
	"gapSm",
	"gapMd",
	"gapLg",
	"gapXl",
	"gapXxl"
], Yb = {
	align: "align",
	justify: "justify",
	alignContent: "align-content"
};
function Xb(e, t, n) {
	let r = Yb[e];
	if (n != null) {
		if (t) {
			let n = t.replace(e, "");
			r += `-${n}`;
		}
		return r += `-${n}`, r.toLowerCase();
	}
}
var Zb = Z({
	dense: Boolean,
	align: {
		type: String,
		default: null,
		validator: Hb
	},
	alignSm: {
		type: String,
		default: null,
		validator: Hb
	},
	alignMd: {
		type: String,
		default: null,
		validator: Hb
	},
	alignLg: {
		type: String,
		default: null,
		validator: Hb
	},
	alignXl: {
		type: String,
		default: null,
		validator: Hb
	},
	alignXxl: {
		type: String,
		default: null,
		validator: Hb
	},
	justify: {
		type: String,
		default: null,
		validator: Wb
	},
	justifySm: {
		type: String,
		default: null,
		validator: Wb
	},
	justifyMd: {
		type: String,
		default: null,
		validator: Wb
	},
	justifyLg: {
		type: String,
		default: null,
		validator: Wb
	},
	justifyXl: {
		type: String,
		default: null,
		validator: Wb
	},
	justifyXxl: {
		type: String,
		default: null,
		validator: Wb
	},
	alignContent: {
		type: String,
		default: null,
		validator: Kb
	},
	alignContentSm: {
		type: String,
		default: null,
		validator: Kb
	},
	alignContentMd: {
		type: String,
		default: null,
		validator: Kb
	},
	alignContentLg: {
		type: String,
		default: null,
		validator: Kb
	},
	alignContentXl: {
		type: String,
		default: null,
		validator: Kb
	},
	alignContentXxl: {
		type: String,
		default: null,
		validator: Kb
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
	...tf(),
	...Ph(),
	...vh()
}, "VRow"), Qb = hm()({
	name: "VRow",
	props: Zb(),
	setup(e, { slots: t }) {
		e.dense && af("dense", "density=\"compact\"");
		let n = Y(() => {
			let t = [], n;
			for (n in qb) qb[n].forEach((r) => {
				let i = e[r], a = Xb(n, r, i);
				a && t.push(a);
			});
			return t.push({
				"v-row--no-gutters": e.noGutters,
				"v-row--density-default": e.density === "default" && !e.noGutters && !e.dense,
				"v-row--density-compact": e.density === "compact" || e.dense,
				"v-row--density-comfortable": e.density === "comfortable",
				[`align-${e.align}`]: e.align,
				[`justify-${e.justify}`]: e.justify,
				[`align-content-${e.alignContent}`]: e.alignContent
			}), t;
		}), r = Y(() => Jb.flatMap((t, n) => {
			let r = e[t];
			if (r == null) return [];
			let i = n ? `-${jv[n - 1]}` : "", [a, o] = Array.isArray(r) ? [r[0] || 0, r[1] || 0] : [r, r];
			return [{
				class: `v-row--gap${i}`,
				style: {
					[`--v-row-gap-x${i}`]: mf(a),
					[`--v-row-gap-y${i}`]: mf(o)
				}
			}];
		}));
		return () => X(e.tag, {
			class: [
				"v-row",
				n.value,
				r.value.map((e) => e.class),
				e.class
			],
			style: [
				{ "--v-row-columns": e.size },
				r.value.map((e) => e.style),
				e.style
			]
		}, t.default?.());
	}
}), $b = Z({
	active: Boolean,
	disabled: Boolean,
	max: [Number, String],
	value: {
		type: [Number, String],
		default: 0
	},
	...tf(),
	...Uy({ transition: { component: yb } })
}, "VCounter"), ex = hm()({
	name: "VCounter",
	functional: !0,
	props: $b(),
	setup(e, { slots: t }) {
		let n = /* @__PURE__ */ I(e.max);
		V(() => e.max, (e) => e != null && (n.value = e));
		let r = /* @__PURE__ */ R(() => e.active ? e.max : n.value), i = /* @__PURE__ */ R(() => r.value ? `${e.value} / ${r.value}` : String(e.value));
		return km(() => q(Wy, {
			transition: e.transition,
			appear: !0
		}, { default: () => [hr(K("div", {
			class: ge([
				"v-counter",
				{ "text-error": r.value && !e.disabled && parseFloat(e.value) > parseFloat(r.value) },
				e.class
			]),
			style: de(e.style)
		}, [t.default ? t.default({
			counter: i.value,
			max: r.value,
			value: e.value
		}) : i.value]), [[Hc, e.active]])] })), {};
	}
}), tx = Z({
	text: String,
	onClick: zf(),
	...tf(),
	...rh()
}, "VLabel"), nx = hm()({
	name: "VLabel",
	props: tx(),
	setup(e, { slots: t }) {
		return km(() => K("label", {
			class: ge([
				"v-label",
				{ "v-label--clickable": !!e.onClick },
				e.class
			]),
			style: de(e.style),
			onClick: e.onClick
		}, [e.text, t.default?.()])), {};
	}
}), rx = Z({
	floating: Boolean,
	...tf()
}, "VFieldLabel"), ix = hm()({
	name: "VFieldLabel",
	props: rx(),
	setup(e, { slots: t }) {
		return km(() => q(nx, {
			class: ge([
				"v-field-label",
				{ "v-field-label--floating": e.floating },
				e.class
			]),
			style: de(e.style)
		}, t)), {};
	}
});
// node_modules/vuetify/lib/components/VInput/InputIcon.js
function ax(e) {
	let { t } = Qm();
	function n({ name: n, color: r, ...i }) {
		let a = {
			prepend: "prependAction",
			prependInner: "prependAction",
			append: "appendAction",
			appendInner: "appendAction",
			clear: "clear"
		}[n], o = e[`onClick:${n}`];
		function s(e) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), e.stopPropagation(), Vf(o, new PointerEvent("click", e)));
		}
		let c = o && a ? t(`$vuetify.input.${a}`, e.label ?? "") : void 0;
		return q(Cg, ks({
			icon: e[`${n}Icon`],
			"aria-label": c,
			onClick: o,
			onKeydown: s,
			color: r
		}, i), null);
	}
	return { InputIcon: n };
}
// node_modules/vuetify/lib/composables/focus.js
var ox = Z({
	focused: Boolean,
	"onUpdate:focused": zf()
}, "focus");
function sx(e, t = am()) {
	let n = Lm(e, "focused"), r = /* @__PURE__ */ R(() => ({ [`${t}--focused`]: n.value }));
	function i() {
		n.value = !0;
	}
	function a() {
		n.value = !1;
	}
	return {
		focusClasses: r,
		isFocused: n,
		focus: i,
		blur: a
	};
}
// node_modules/vuetify/lib/components/VField/VField.js
var cx = [
	"underlined",
	"outlined",
	"filled",
	"solo",
	"solo-inverted",
	"solo-filled",
	"plain"
], lx = Z({
	appendInnerIcon: hg,
	bgColor: String,
	clearable: Boolean,
	clearIcon: {
		type: hg,
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
	prependInnerIcon: hg,
	reverse: Boolean,
	singleLine: Boolean,
	variant: {
		type: String,
		default: "filled",
		validator: (e) => cx.includes(e)
	},
	"onClick:clear": zf(),
	"onClick:appendInner": zf(),
	"onClick:prependInner": zf(),
	...tf(),
	...Gg(),
	...Hh(),
	...rh()
}, "VField"), ux = hm()({
	name: "VField",
	inheritAttrs: !1,
	props: {
		id: String,
		details: Boolean,
		labelId: String,
		...ox(),
		...lx()
	},
	emits: {
		"update:focused": (e) => !0,
		"update:modelValue": (e) => !0
	},
	setup(e, { attrs: t, emit: n, slots: r }) {
		let { themeClasses: i } = hh(e), { loaderClasses: a } = Kg(e), { focusClasses: o, isFocused: s, focus: c, blur: l } = sx(e), { InputIcon: u } = ax(e), { roundedClasses: d, roundedStyles: f } = Uh(e), { rtlClasses: p } = th(), m = /* @__PURE__ */ R(() => e.dirty || e.active), h = /* @__PURE__ */ R(() => !!(e.label || r.label)), g = /* @__PURE__ */ R(() => !e.singleLine && h.value), _ = ri(), v = Y(() => e.id || `input-${_}`), y = /* @__PURE__ */ R(() => e.details ? `${v.value}-messages` : void 0), b = /* @__PURE__ */ F(), x = /* @__PURE__ */ F(), S = /* @__PURE__ */ F(), C = Y(() => ["plain", "underlined"].includes(e.variant)), w = Y(() => e.error || e.disabled ? void 0 : m.value && s.value ? e.color : e.baseColor), T = Y(() => {
			if (e.iconColor === !0 || !e.iconColor && e.glow && s.value) return w.value;
			if (!(!e.iconColor || e.glow && !s.value)) return e.iconColor;
		}), { backgroundColorClasses: E, backgroundColorStyles: D } = Yh(() => e.bgColor), { textColorClasses: O, textColorStyles: k } = Jh(w);
		V(m, (e) => {
			if (g.value && !uf()) {
				let t = b.value.$el, n = x.value.$el;
				requestAnimationFrame(() => {
					let r = cp(t), i = new ip(n), a = i.x - r.x, o = i.y - r.y - (r.height / 2 - i.height / 2), s = i.width / .75, c = Math.abs(s - r.width) > 1 ? { maxWidth: mf(s) } : void 0, l = getComputedStyle(t), u = getComputedStyle(n), d = parseFloat(l.transitionDuration) * 1e3 || 150, f = parseFloat(u.getPropertyValue("--v-field-label-scale")), p = u.getPropertyValue("color");
					t.style.visibility = "visible", n.style.visibility = "hidden", lp(t, {
						transform: `translate(${a}px, ${o}px) scale(${f})`,
						color: p,
						...c
					}, {
						duration: d,
						easing: bm,
						direction: e ? "normal" : "reverse"
					}).finished.then(() => {
						t.style.removeProperty("visibility"), n.style.removeProperty("visibility");
					});
				});
			}
		}, { flush: "post" });
		let A = Y(() => ({
			isActive: m,
			isFocused: s,
			controlRef: S,
			iconColor: T,
			blur: l,
			focus: c
		})), j = /* @__PURE__ */ R(() => {
			let e = !m.value;
			return {
				"aria-hidden": e,
				for: e ? void 0 : v.value
			};
		}), ee = /* @__PURE__ */ R(() => {
			let e = g.value && m.value;
			return {
				"aria-hidden": e,
				for: e ? void 0 : v.value
			};
		});
		function M(e) {
			e.target !== Uf() && e.preventDefault();
		}
		return km(() => {
			let n = e.variant === "outlined", s = !!(r["prepend-inner"] || e.prependInnerIcon), _ = !!(e.clearable || r.clear) && !e.disabled, S = !!(r["append-inner"] || e.appendInnerIcon || _), w = () => r.label ? r.label({
				...A.value,
				label: e.label,
				props: { for: v.value }
			}) : e.label;
			return K("div", ks({
				class: [
					"v-field",
					{
						"v-field--active": m.value,
						"v-field--appended": S,
						"v-field--center-affix": e.centerAffix ?? !C.value,
						"v-field--disabled": e.disabled,
						"v-field--dirty": e.dirty,
						"v-field--error": e.error,
						"v-field--glow": e.glow,
						"v-field--flat": e.flat,
						"v-field--has-background": !!e.bgColor,
						"v-field--persistent-clear": e.persistentClear,
						"v-field--prepended": s,
						"v-field--reverse": e.reverse,
						"v-field--single-line": e.singleLine,
						"v-field--no-label": !w(),
						[`v-field--variant-${e.variant}`]: !0
					},
					i.value,
					E.value,
					o.value,
					a.value,
					d.value,
					p.value,
					e.class
				],
				style: [
					D.value,
					f.value,
					e.style
				],
				onClick: M
			}, t), [
				K("div", { class: "v-field__overlay" }, null),
				q(qg, {
					name: "v-field",
					active: !!e.loading,
					color: e.error ? "error" : /* @__PURE__ */ Lu(e.loading) ? e.loading : e.color
				}, { default: r.loader }),
				s && K("div", {
					key: "prepend",
					class: "v-field__prepend-inner"
				}, [r["prepend-inner"] ? r["prepend-inner"](A.value) : e.prependInnerIcon && q(u, {
					key: "prepend-icon",
					name: "prependInner",
					color: T.value
				}, null)]),
				K("div", {
					class: "v-field__field",
					"data-no-activator": ""
				}, [
					[
						"filled",
						"solo",
						"solo-inverted",
						"solo-filled"
					].includes(e.variant) && g.value && q(ix, ks({
						key: "floating-label",
						ref: x,
						class: [O.value],
						floating: !0
					}, j.value, { style: k.value }), { default: () => [w()] }),
					h.value && q(ix, ks({
						key: "label",
						ref: b,
						id: e.labelId
					}, ee.value), { default: () => [w()] }),
					r.default?.({
						...A.value,
						props: {
							id: v.value,
							class: "v-field__input",
							"aria-describedby": y.value
						},
						focus: c,
						blur: l
					}) ?? K("div", {
						id: v.value,
						class: "v-field__input",
						"aria-describedby": y.value
					}, null)
				]),
				_ && q(bb, { key: "clear" }, { default: () => [hr(K("div", {
					class: "v-field__clearable",
					onMousedown: (e) => {
						e.preventDefault(), e.stopPropagation();
					}
				}, [q(mg, { defaults: { VIcon: { icon: e.clearIcon } } }, { default: () => [r.clear ? r.clear({
					...A.value,
					props: {
						onFocus: c,
						onBlur: l,
						onClick: e["onClick:clear"],
						tabindex: -1
					}
				}) : q(u, {
					name: "clear",
					onFocus: c,
					onBlur: l,
					tabindex: -1
				}, null)] })]), [[Hc, e.dirty]])] }),
				S && K("div", {
					key: "append",
					class: "v-field__append-inner"
				}, [r["append-inner"] ? r["append-inner"](A.value) : e.appendInnerIcon && q(u, {
					key: "append-icon",
					name: "appendInner",
					color: T.value
				}, null)]),
				K("div", {
					class: ge(["v-field__outline", O.value]),
					style: de(k.value)
				}, [n && K(as, null, [
					K("div", { class: "v-field__outline__start" }, null),
					g.value && K("div", { class: "v-field__outline__notch" }, [q(ix, ks({
						ref: x,
						floating: !0
					}, j.value), { default: () => [w()] })]),
					K("div", { class: "v-field__outline__end" }, null)
				]), C.value && g.value && q(ix, ks({
					ref: x,
					floating: !0
				}, j.value), { default: () => [w()] })])
			]);
		}), {
			controlRef: S,
			fieldIconColor: T
		};
	}
}), dx = Z({
	active: Boolean,
	color: String,
	messages: {
		type: [Array, String],
		default: () => []
	},
	...tf(),
	...Uy({ transition: {
		component: yb,
		leaveAbsolute: !0,
		group: !0
	} })
}, "VMessages"), fx = hm()({
	name: "VMessages",
	props: dx(),
	setup(e, { slots: t }) {
		let n = Y(() => Ef(e.messages)), { textColorClasses: r, textColorStyles: i } = Jh(() => e.color);
		return km(() => q(Wy, {
			transition: e.transition,
			tag: "div",
			class: ge([
				"v-messages",
				r.value,
				e.class
			]),
			style: de([i.value, e.style])
		}, { default: () => [e.active && n.value.map((e, r) => K("div", {
			class: "v-messages__message",
			key: `${r}-${n.value}`
		}, [t.message ? t.message({ message: e }) : e]))] })), {};
	}
}), px = Z({
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
	...ox()
}, "validation");
function mx(e, t = am(), n = ri()) {
	let r = Lm(e, "modelValue"), i = Y(() => /* @__PURE__ */ Gu(e.validationValue) ? r.value : e.validationValue), a = ib(e), o = Hv(() => e.rules), s = /* @__PURE__ */ F([]), c = /* @__PURE__ */ I(!0), l = Y(() => !!(Ef(r.value === "" ? null : r.value).length || Ef(i.value === "" ? null : i.value).length)), u = Y(() => e.errorMessages?.length ? Ef(e.errorMessages).concat(s.value).slice(0, Math.max(0, Number(e.maxErrors))) : s.value), d = Y(() => {
		let t = (e.validateOn ?? a.validateOn?.value) || "input";
		t === "lazy" && (t = "input lazy"), t === "eager" && (t = "input eager");
		let n = new Set(t?.split(" ") ?? []);
		return {
			input: n.has("input"),
			blur: n.has("blur") || n.has("input") || n.has("invalid-input"),
			invalidInput: n.has("invalid-input"),
			lazy: n.has("lazy"),
			eager: n.has("eager")
		};
	}), f = Y(() => e.error || e.errorMessages?.length ? !1 : e.rules.length ? c.value ? s.value.length || d.value.lazy ? null : !0 : !s.value.length : !0), p = /* @__PURE__ */ I(!1), m = !1, h = Y(() => ({
		[`${t}--error`]: f.value === !1,
		[`${t}--dirty`]: l.value,
		[`${t}--disabled`]: a.isDisabled.value,
		[`${t}--readonly`]: a.isReadonly.value
	})), g = im("validation"), _ = Y(() => e.name ?? L(n));
	Ji(() => {
		a.register?.({
			id: _.value,
			vm: g,
			validate: b,
			reset: v,
			resetValidation: y
		});
	}), Qi(() => {
		a.unregister?.(_.value);
	}), Yi(async () => {
		d.value.lazy || await b(!d.value.eager), a.update?.(_.value, f.value, u.value);
	}), Im(() => d.value.input || d.value.invalidInput && f.value === !1, () => {
		V(i, () => {
			m || b();
		});
	}), Im(() => d.value.blur, () => {
		V(() => e.focused, (e) => {
			e || b();
		});
	}), V([f, u], () => {
		a.update?.(_.value, f.value, u.value);
	});
	async function v() {
		m = !0, r.value = null, await z(), m = !1, await y();
	}
	async function y() {
		c.value = !0, d.value.lazy ? s.value = [] : await b(!d.value.eager);
	}
	async function b(t = !1) {
		let n = [];
		p.value = !0;
		for (let t of o.value) {
			if (n.length >= Number(e.maxErrors ?? 1)) break;
			let r = await (/* @__PURE__ */ Iu(t) ? t : () => t)(i.value);
			r !== !0 && (r !== !1 && !/* @__PURE__ */ Lu(r) ? console.warn(`${r} is not a valid value. Rule functions must return boolean true or a string.`) : n.push(r || ""));
		}
		return s.value = n, p.value = !1, c.value = t, s.value;
	}
	return {
		errorMessages: u,
		isDirty: l,
		isDisabled: a.isDisabled,
		isReadonly: a.isReadonly,
		isPristine: c,
		isValid: f,
		isValidating: p,
		reset: v,
		resetValidation: y,
		validate: b,
		validationClasses: h
	};
}
// node_modules/vuetify/lib/components/VInput/VInput.js
var hx = Z({
	id: String,
	appendIcon: hg,
	baseColor: String,
	centerAffix: {
		type: Boolean,
		default: !0
	},
	color: String,
	glow: Boolean,
	iconColor: [Boolean, String],
	prependIcon: hg,
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
		validator: (e) => ["horizontal", "vertical"].includes(e)
	},
	"onClick:prepend": zf(),
	"onClick:append": zf(),
	...tf(),
	...Ph(),
	...yf(Fg(), [
		"maxWidth",
		"minWidth",
		"width"
	]),
	...rh(),
	...px()
}, "VInput"), gx = hm()({
	name: "VInput",
	props: { ...hx() },
	emits: { "update:modelValue": (e) => !0 },
	setup(e, { attrs: t, slots: n, emit: r }) {
		let { densityClasses: i } = Fh(e), { dimensionStyles: a } = Ig(e), { themeClasses: o } = hh(e), { rtlClasses: s } = th(), { InputIcon: c } = ax(e), l = ri(), u = Y(() => e.id || `input-${l}`), { errorMessages: d, isDirty: f, isDisabled: p, isReadonly: m, isPristine: h, isValid: g, isValidating: _, reset: v, resetValidation: y, validate: b, validationClasses: x } = mx(e, "v-input", u), S = Y(() => e.errorMessages?.length || !h.value && d.value.length ? d.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages), C = /* @__PURE__ */ R(() => S.value.length > 0), w = /* @__PURE__ */ R(() => !e.hideDetails || e.hideDetails === "auto" && (C.value || (e.detailsActive ?? !!n.details))), T = Y(() => w.value ? `${u.value}-messages` : void 0), E = Y(() => ({
			id: u,
			messagesId: T,
			isDirty: f,
			isDisabled: p,
			isReadonly: m,
			isPristine: h,
			isValid: g,
			isValidating: _,
			hasDetails: w,
			reset: v,
			resetValidation: y,
			validate: b
		})), D = /* @__PURE__ */ R(() => e.error || e.disabled ? void 0 : e.focused ? e.color : e.baseColor), O = /* @__PURE__ */ R(() => {
			if (e.iconColor) return e.iconColor === !0 ? D.value : e.iconColor;
		});
		return km(() => {
			let t = !!(n.prepend || e.prependIcon), r = !!(n.append || e.appendIcon);
			return K("div", {
				class: ge([
					"v-input",
					`v-input--${e.direction}`,
					{
						"v-input--center-affix": e.centerAffix,
						"v-input--focused": e.focused,
						"v-input--glow": e.glow,
						"v-input--hide-spin-buttons": e.hideSpinButtons,
						"v-input--indent-details": e.indentDetails
					},
					i.value,
					o.value,
					s.value,
					x.value,
					e.class
				]),
				style: de([a.value, e.style])
			}, [
				t && K("div", {
					key: "prepend",
					class: "v-input__prepend"
				}, [n.prepend ? n.prepend(E.value) : e.prependIcon && q(c, {
					key: "prepend-icon",
					name: "prepend",
					color: O.value
				}, null)]),
				n.default && K("div", { class: "v-input__control" }, [n.default?.(E.value)]),
				r && K("div", {
					key: "append",
					class: "v-input__append"
				}, [n.append ? n.append(E.value) : e.appendIcon && q(c, {
					key: "append-icon",
					name: "append",
					color: O.value
				}, null)]),
				e.hideDetails !== !0 && K("div", {
					id: T.value,
					class: ge(["v-input__details", { "v-input__details--hidden": !w.value }]),
					role: "alert",
					"aria-live": "polite"
				}, [q(fx, {
					active: C.value,
					messages: S.value
				}, { message: n.message }), n.details?.(E.value)])
			]);
		}), {
			reset: v,
			resetValidation: y,
			validate: b,
			isValid: g,
			errorMessages: d
		};
	}
}), _x = Z({ autocomplete: String }, "autocomplete");
function vx(e) {
	let t = ri(), n = /* @__PURE__ */ I(0), r = /* @__PURE__ */ R(() => e.autocomplete === "suppress");
	return {
		isSuppressing: r,
		fieldAutocomplete: /* @__PURE__ */ R(() => r.value ? "off" : e.autocomplete),
		fieldName: /* @__PURE__ */ R(() => {
			if (e.name) return r.value ? `${e.name}-${t}-${n.value}` : e.name;
		}),
		update: () => n.value = (/* @__PURE__ */ new Date()).getTime()
	};
}
// node_modules/vuetify/lib/composables/autofocus.js
function yx(e) {
	function t(t, n) {
		if (!e.autofocus || !t) return;
		let r = n[0].target, i = r.matches("input,textarea") ? r : r.querySelector("input,textarea");
		setTimeout(() => i?.focus(), 50);
	}
	return { onIntersect: t };
}
// node_modules/vuetify/lib/directives/intersect/index.js
function bx(e, t) {
	if (!sf) return;
	let n = t.modifiers || {}, r = t.value, i = /* @__PURE__ */ Iu(r) || !/* @__PURE__ */ Bu(r) ? r : r.handler, a = /* @__PURE__ */ Iu(r) || !/* @__PURE__ */ Bu(r) ? {} : r.options, o = new IntersectionObserver((r = [], a) => {
		let o = e._observe?.[t.instance.$.uid];
		if (!o) return;
		let s = r.some((e) => e.isIntersecting);
		i && (!n.quiet || o.init) && (!n.once || s || o.init) && i(s, r, a), s && n.once ? xx(e, t) : o.init = !0;
	}, a);
	e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
		init: !1,
		observer: o
	}, o.observe(e);
}
function xx(e, t) {
	let n = e._observe?.[t.instance.$.uid];
	n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
var Sx = {
	mounted: bx,
	unmounted: xx,
	updated: (e, t) => {
		e._observe?.[t.instance.$.uid] && (xx(e, t), bx(e, t));
	}
}, Cx = [
	"color",
	"file",
	"time",
	"date",
	"datetime-local",
	"week",
	"month"
], wx = Z({
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
	..._x(),
	...xf(hx(), ["direction"]),
	...lx()
}, "VTextField"), Tx = hm()({
	name: "VTextField",
	directives: { vIntersect: Sx },
	inheritAttrs: !1,
	props: wx(),
	emits: {
		"click:control": (e) => !0,
		"mousedown:control": (e) => !0,
		"update:focused": (e) => !0,
		"update:modelValue": (e) => !0
	},
	setup(e, { attrs: t, emit: n, slots: r }) {
		let i = Lm(e, "modelValue", void 0, (e) => Object.is(e, -0) ? "-0" : e), { isFocused: a, focus: o, blur: s } = sx(e), { onIntersect: c } = yx(e), l = Y(() => /* @__PURE__ */ Iu(e.counterValue) ? e.counterValue(i.value) : /* @__PURE__ */ Ru(e.counterValue) ? e.counterValue : (i.value ?? "").toString().length), u = Y(() => {
			if (t.maxlength) return t.maxlength;
			if (e.counter && (/* @__PURE__ */ Ru(e.counter) || /* @__PURE__ */ Lu(e.counter))) return e.counter;
		}), d = Y(() => ["plain", "underlined"].includes(e.variant)), f = /* @__PURE__ */ F(), p = /* @__PURE__ */ F(), m = /* @__PURE__ */ F();
		V(() => e.type, () => void m.value?.offsetHeight, { flush: "post" });
		let h = vx(e), g = Y(() => Cx.includes(e.type) || e.persistentPlaceholder || a.value || e.active);
		function _() {
			h.isSuppressing.value && h.update(), a.value || o(), z(() => {
				m.value !== Uf() && m.value?.focus();
			});
		}
		function v(e) {
			n("mousedown:control", e), e.target !== m.value && (_(), e.preventDefault());
		}
		function y(e) {
			n("click:control", e);
		}
		function b(t, n) {
			t.stopPropagation(), _(), z(() => {
				n(), Vf(e["onClick:clear"], t);
			});
		}
		function x(t) {
			let n = t.target;
			if (!(e.modelModifiers?.trim && [
				"text",
				"search",
				"password",
				"tel",
				"url"
			].includes(e.type))) {
				i.value = n.value;
				return;
			}
			let r = n.value, a = n.selectionStart, o = n.selectionEnd;
			i.value = r, z(() => {
				let e = 0;
				r.trimStart().length === n.value.length && (e = r.length - n.value.length), a != null && (n.selectionStart = a - e), o != null && (n.selectionEnd = o - e);
			});
		}
		return km(() => {
			let n = !!(r.counter || e.counter !== void 0), _ = e.counter !== !1 && e.counter !== null && (e.persistentCounter || a.value), S = e.hideDetails !== !0 && !!(r.details || n), C = !!(r.details || n && _), [w, T] = Tf(t), { modelValue: E, ...D } = gx.filterProps(e), O = ux.filterProps(e);
			return q(gx, ks({
				ref: f,
				modelValue: i.value,
				"onUpdate:modelValue": (e) => i.value = e,
				class: [
					"v-text-field",
					{
						"v-text-field--prefixed": e.prefix,
						"v-text-field--suffixed": e.suffix,
						"v-input--plain-underlined": d.value
					},
					e.class
				],
				style: e.style
			}, w, D, {
				centerAffix: !d.value,
				focused: a.value,
				detailsActive: C,
				indentDetails: e.indentDetails ?? !d.value
			}), {
				...r,
				default: ({ id: t, isDisabled: n, isDirty: l, isReadonly: u, isValid: d, hasDetails: f, reset: _ }) => q(ux, ks({
					ref: p,
					onMousedown: v,
					onClick: y,
					"onClick:clear": (e) => b(e, _),
					role: e.role
				}, xf(O, ["onClick:clear"]), {
					id: t.value,
					labelId: `${t.value}-label`,
					active: g.value || l.value,
					dirty: l.value || e.dirty,
					disabled: n.value,
					focused: a.value,
					details: f.value,
					error: d.value === !1
				}), {
					...r,
					default: ({ props: { class: a, ...l }, controlRef: d }) => {
						let f = K("input", ks({
							ref: (e) => m.value = d.value = e,
							value: i.value,
							onInput: x,
							autofocus: e.autofocus,
							readonly: u.value,
							disabled: n.value,
							name: h.fieldName.value,
							autocomplete: h.fieldAutocomplete.value,
							placeholder: e.placeholder,
							size: 1,
							role: e.role,
							type: e.type,
							onFocus: o,
							onBlur: s,
							"aria-labelledby": `${t.value}-label`
						}, l, T), null);
						return K(as, null, [
							e.prefix && K("span", { class: "v-text-field__prefix" }, [K("span", { class: "v-text-field__prefix__text" }, [e.prefix])]),
							hr(r.default ? K("div", {
								class: ge(a),
								"data-no-activator": ""
							}, [r.default({ id: t }), f]) : Cs(f, { class: a }), [[
								Sx,
								c,
								null,
								{ once: !0 }
							]]),
							e.suffix && K("span", { class: "v-text-field__suffix" }, [K("span", { class: "v-text-field__suffix__text" }, [e.suffix])])
						]);
					}
				}),
				details: S ? (t) => K(as, null, [r.details?.(t), n && K(as, null, [K("span", null, null), q(ex, {
					active: _,
					value: l.value,
					max: u.value,
					disabled: e.disabled
				}, r.counter)])]) : void 0
			});
		}), sb({}, f, p, m);
	}
}), Ex = Object.freeze({
	comboboxUncommitted: "입력한 내용을 확정하거나 후보를 선택해 주세요.",
	comboboxDetails: "후보 전체 내용",
	inputLoading: "입력 내용을 처리하는 중입니다.",
	monthCalendarYear: "연도",
	monthCalendarKeys: "방향키: 하루·한 주 · Home/End: 주 경계 · PageUp/Down: 월 이동(Shift: 연도) · Enter/Space: 날짜 선택 · Escape: 선택일 초점 복귀",
	monthCalendarInvalid: "달력의 월·날짜·marker 설정을 확인해 주세요.",
	monthCalendarEmpty: "표시할 날짜별 자료가 없습니다.",
	monthCalendarLoading: "달력 자료를 불러오는 중입니다.",
	monthCalendarReadonly: "보기 전용입니다. 월과 날짜를 탐색할 수 있습니다.",
	monthCalendarToday: "오늘",
	monthCalendarMore: (e) => "추가 " + Px(e, "ko-KR") + "개",
	monthCalendarDetails: "날짜별 자료",
	monthCalendarCount: (e) => "자료 " + Px(e, "ko-KR") + "개",
	sortableHandle: (e) => e + " 순서 조절",
	sortableMove: (e, t) => e + (t === -1 ? " 위로 이동" : " 아래로 이동"),
	sortableKeys: "손잡이를 위아래로 드래그할 수 있습니다. 키보드는 Space/Enter로 시작·확정, 위/아래와 Home/End로 이동, Escape 또는 Tab으로 취소합니다. 위/아래 이동 버튼도 사용할 수 있습니다.",
	sortableInvalid: "현재 목록을 정렬할 수 없습니다.",
	sortableStatus: (e, t, n, r) => ({
		start: "순서 조절 시작",
		preview: "이동 예정",
		commit: "순서 제안 완료",
		cancel: "순서 조절 취소",
		unchanged: "순서 유지"
	})[e] + ": " + t + (e === "cancel" ? "" : " · " + Px(n, "ko-KR") + " / " + Px(r, "ko-KR")),
	timeScrub: (e) => e === "input" ? "시간 드래그 조절" : "목록 드래그 조절",
	timeScrubKeys: "조절 손잡이를 위아래로 드래그하세요. 키보드: 화살표 한 단계, Shift/Page 열 단계, Home/End 경계. 키를 놓으면 확정, Escape 취소. 목록 본문은 스크롤할 수 있습니다.",
	timePreview: (e) => "미리보기 " + e,
	timeScrubCancelled: "시간 조절을 취소했습니다.",
	validationRequired: "필수 항목을 입력하거나 선택해 주세요.",
	validationInvalid: "입력값을 확인해 주세요.",
	validationMinLength: (e) => `${e}자 이상 입력해 주세요.`,
	breadcrumb: "현재 위치",
	steps: "진행 단계",
	currentStep: "현재 단계",
	completeStep: "완료한 단계",
	chartInvalid: "유효한 0 이상의 값과 축 범위를 확인해 주세요.",
	chartCategory: "항목",
	chartValue: "값",
	toastAccent: "강조",
	fileRemove: "제거",
	fileType: (e) => ({
		"text/plain": "텍스트",
		"image/png": "PNG 이미지",
		"image/jpeg": "JPEG 이미지",
		"application/pdf": "PDF 문서"
	})[e] || e,
	filesChoose: "파일 선택",
	filesClear: "모두 제거",
	dropFiles: "파일을 여기에 놓거나 선택해 주세요.",
	filesRejected: "선택하지 못한 파일",
	fileRequired: "파일을 하나 이상 선택해 주세요.",
	unknownFileType: "MIME 정보 없음",
	noFileExtension: "확장자 없음",
	duplicateFile: "이미 선택한 파일입니다.",
	unsupportedFile: "허용하지 않는 파일 형식입니다.",
	filesHelp: (e, t, n) => `${e || "모든 형식"} · 파일당 ${n} 이하 · 최대 ${Px(t, "ko-KR")}개`,
	oversizedFile: (e) => `파일당 ${e}를 초과했습니다.`,
	tooManyFiles: (e) => `최대 ${Px(e, "ko-KR")}개까지 선택할 수 있어요.`,
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
	splitStacked: "좁은 화면에서는 위아래로 드래그하거나 위/아래 화살표로 두 영역의 높이를 조절합니다.",
	remove: (e) => e + " 제거",
	selectionLimit: (e) => "최대 " + Px(e, "ko-KR") + "개까지 선택할 수 있어요.",
	selectionCount: (e, t) => Px(e, "ko-KR") + "개 선택" + (t === void 0 ? "" : " · 최대 " + Px(t, "ko-KR") + "개"),
	details: "상세",
	record: "자료",
	fullText: "전체 내용",
	viewFullText: (e) => e + " — 전체 내용 보기",
	selectRecord: (e) => e + " 선택",
	selectPage: "현재 페이지 모두 선택",
	selectRecords: "자료 선택",
	sortField: "정렬 항목",
	chooseSort: "정렬할 항목 선택",
	ascending: "오름차순",
	descending: "내림차순",
	sortDirection: (e) => "정렬 방향 바꾸기, 현재 " + e,
	tableLoading: "자료를 불러오는 중이에요.",
	tableRetry: "다시 시도",
	tableEmpty: "조건에 맞는 자료가 없어요.",
	timeGridEdit: "항목 수정",
	timeGridAdd: "항목 추가",
	timeGridRemove: "항목 삭제",
	timeGridCurrent: "현재 시각",
	timeGridMove: "이동",
	timeGridResizeStart: "시작 조절",
	timeGridResizeEnd: "끝 조절",
	timeGridDuplicate: "복제",
	timeGridActions: "미리보기 조작",
	timeGridPreviousColumn: "이전 열",
	timeGridNextColumn: "다음 열",
	timeGridEarlier: "앞 시간",
	timeGridLater: "뒤 시간",
	timeGridApply: "변경 제안",
	timeGridCancel: "취소",
	timeGridPreview: "미리보기",
	timeGridProposed: "변경 제안을 보냈어요.",
	timeGridCancelled: "변경을 취소했어요.",
	timeGridUnchanged: "변경된 좌표가 없어요.",
	timeGridPending: "변경 반영 대기 중",
	timeGridKeys: "Space: 시작 · 방향키: 이동 · Enter: 확정 · Escape/Tab: 취소.",
	timeGridEmpty: "표시할 시간 항목이 없어요.",
	timeGridInvalid: "시간표의 열·key·분 좌표를 확인해 주세요.",
	timeGridLoading: "시간 항목을 불러오는 중이에요.",
	timeGridScroll: "시간표 · 가로와 세로로 스크롤할 수 있습니다.",
	timeGridList: "항목 목록으로 보기",
	firstPage: "첫 페이지",
	lastPage: "마지막 페이지",
	paginationEmpty: "페이지가 없어요.",
	previousPage: "이전 페이지",
	nextPage: "다음 페이지",
	pages: (e) => e + " 페이지",
	pageLabel: (e, t) => Px(e, "ko-KR") + " 페이지, 전체 " + Px(t, "ko-KR") + " 페이지",
	pageSummary: (e, t, n) => Px(e, "ko-KR") + " / " + Px(t, "ko-KR") + "페이지 · 전체 선택 " + Px(n, "ko-KR") + "개",
	progressFailed: "! 오류 · 작업을 확인해 주세요.",
	progressPending: "처리 중",
	progressUnknown: "처리 중",
	progressInvalid: "! 진행 정보를 확인해 주세요.",
	progressComplete: "✓ 완료",
	progressRunning: (e) => e + " 진행",
	progressError: (e) => "! 오류 · 마지막 확인 " + e,
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
	count: (e, t) => t === void 0 ? Px(e, "ko-KR") : `${Px(e, "ko-KR")} / ${Px(t, "ko-KR")}`,
	numberHelp: (e, t, n) => [
		e === void 0 ? "" : `최소 ${Px(e, "ko-KR")}`,
		t === void 0 ? "" : `최대 ${Px(t, "ko-KR")}`,
		`${Px(n, "ko-KR")} 간격`
	].filter(Boolean).join(" · "),
	timeHelp: (e, t, n) => `HH:mm · ${e}–${t} · ${n}분 간격`
}), Dx = Object.freeze({
	comboboxUncommitted: "Confirm your text or choose an option.",
	comboboxDetails: "Full option content",
	inputLoading: "Working on this input.",
	monthCalendarYear: "Year",
	monthCalendarKeys: "Arrows: day/week; Home/End: week boundaries; PageUp/Down: month (Shift: year); Enter/Space: choose a date; Escape: focus the selected date.",
	monthCalendarInvalid: "Check the calendar month, date and marker configuration.",
	monthCalendarEmpty: "No date-specific data to show.",
	monthCalendarLoading: "Loading calendar data.",
	monthCalendarReadonly: "Read only. You can still browse months and dates.",
	monthCalendarToday: "Today",
	monthCalendarMore: (e) => Px(e, "en-US") + " more",
	monthCalendarDetails: "Date data",
	monthCalendarCount: (e) => Px(e, "en-US") + " markers",
	sortableHandle: (e) => "Reorder " + e,
	sortableMove: (e, t) => "Move " + e + (t === -1 ? " up" : " down"),
	sortableKeys: "Drag a handle up or down. With a keyboard, Space/Enter starts or confirms; Up/Down and Home/End propose a position; Escape or Tab cancels. You can also use the move up/down buttons.",
	sortableInvalid: "This list cannot be reordered right now.",
	sortableStatus: (e, t, n, r) => ({
		start: "Reordering",
		preview: "Proposed position",
		commit: "Order proposed",
		cancel: "Reordering cancelled",
		unchanged: "Order unchanged"
	})[e] + ": " + t + (e === "cancel" ? "" : " · " + Px(n, "en-US") + " / " + Px(r, "en-US")),
	timeScrub: (e) => e === "input" ? "Adjust time by dragging" : "Adjust time in list by dragging",
	timeScrubKeys: "Drag the adjustment handle up or down. Keyboard: arrows one step, Shift/Page ten steps, Home/End bounds. Release the key to commit; Escape cancels. The list body remains scrollable.",
	timePreview: (e) => "Preview " + e,
	timeScrubCancelled: "Time adjustment cancelled.",
	validationRequired: "Enter or choose a required value.",
	validationInvalid: "Check this value.",
	validationMinLength: (e) => `Use at least ${e} characters.`,
	breadcrumb: "Breadcrumb",
	steps: "Progress steps",
	currentStep: "Current step",
	completeStep: "Completed step",
	chartInvalid: "Check nonnegative finite values and the axis range.",
	chartCategory: "Category",
	chartValue: "Value",
	toastAccent: "Accent",
	fileRemove: "Remove",
	fileType: (e) => ({
		"text/plain": "Plain text",
		"image/png": "PNG image",
		"image/jpeg": "JPEG image",
		"application/pdf": "PDF document"
	})[e] || e,
	filesChoose: "Choose files",
	filesClear: "Remove all",
	dropFiles: "Drop files here or use the choose button.",
	filesRejected: "Files not selected",
	fileRequired: "Choose at least one file.",
	unknownFileType: "MIME type unavailable",
	noFileExtension: "No extension",
	duplicateFile: "This file is already selected.",
	unsupportedFile: "This file type is not allowed.",
	filesHelp: (e, t, n) => `${e || "All formats"} · Up to ${n} per file · Up to ${Px(t, "en-US")} files`,
	oversizedFile: (e) => `Exceeds ${e} per file.`,
	tooManyFiles: (e) => `Choose at most ${Px(e, "en-US")} files.`,
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
	splitStacked: "Narrow layout: drag up or down, or use the Up/Down arrows, to resize pane heights.",
	remove: (e) => "Remove " + e,
	selectionLimit: (e) => "Choose at most " + Px(e, "en-US") + " options.",
	selectionCount: (e, t) => Px(e, "en-US") + " selected" + (t === void 0 ? "" : " · maximum " + t),
	details: "Details",
	record: "Record",
	fullText: "Full content",
	viewFullText: (e) => "View full content: " + e,
	selectRecord: (e) => "Select " + e,
	selectPage: "Select all on this page",
	selectRecords: "Select record",
	sortField: "Sort by",
	chooseSort: "Choose a sort field",
	ascending: "Ascending",
	descending: "Descending",
	sortDirection: (e) => "Change sort direction, currently " + e,
	tableLoading: "Loading records.",
	tableRetry: "Retry",
	tableEmpty: "No matching records.",
	timeGridEdit: "Edit item",
	timeGridAdd: "Add item",
	timeGridRemove: "Remove item",
	timeGridCurrent: "Current time",
	timeGridMove: "Move",
	timeGridResizeStart: "Resize start",
	timeGridResizeEnd: "Resize end",
	timeGridDuplicate: "Duplicate",
	timeGridActions: "Preview controls",
	timeGridPreviousColumn: "Previous column",
	timeGridNextColumn: "Next column",
	timeGridEarlier: "Earlier time",
	timeGridLater: "Later time",
	timeGridApply: "Propose change",
	timeGridCancel: "Cancel",
	timeGridPreview: "Preview",
	timeGridProposed: "Change proposed.",
	timeGridCancelled: "Change cancelled.",
	timeGridUnchanged: "No coordinate change.",
	timeGridPending: "Change pending",
	timeGridKeys: "Space: start; arrows: move; Enter: commit; Escape/Tab: cancel.",
	timeGridEmpty: "No time items.",
	timeGridInvalid: "Check columns, keys and minute coordinates.",
	timeGridLoading: "Loading time items.",
	timeGridScroll: "Timeline · scroll horizontally and vertically.",
	timeGridList: "View item list",
	firstPage: "First page",
	lastPage: "Last page",
	paginationEmpty: "No pages.",
	previousPage: "Previous page",
	nextPage: "Next page",
	pages: (e) => e + " pages",
	pageLabel: (e, t) => "Page " + Px(e, "en-US") + " of " + Px(t, "en-US"),
	pageSummary: (e, t, n) => "Page " + Px(e, "en-US") + " of " + Px(t, "en-US") + " · " + Px(n, "en-US") + " selected",
	progressFailed: "! Error · check the task.",
	progressPending: "Working",
	progressUnknown: "Working",
	progressInvalid: "! Check the progress information.",
	progressComplete: "✓ Complete",
	progressRunning: (e) => e + " complete",
	progressError: (e) => "! Error · last confirmed " + e,
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
	count: (e, t) => t === void 0 ? Px(e, "en-US") : `${Px(e, "en-US")} / ${Px(t, "en-US")}`,
	numberHelp: (e, t, n) => [
		e === void 0 ? "" : `Min ${Px(e, "en-US")}`,
		t === void 0 ? "" : `Max ${Px(t, "en-US")}`,
		`Step ${Px(n, "en-US")}`
	].filter(Boolean).join(" · "),
	timeHelp: (e, t, n) => `HH:mm · ${e}–${t} · ${n} min step`
}), Ox = Symbol("SolLocale");
function kx(e, t) {
	let n = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return RegExp(`(?:^|[^\\p{L}\\p{N}])${n}(?=$|[^\\p{L}\\p{N}])`, "u").test(e) ? e : e ? `${t}, ${e}` : t;
}
var Ax = (e) => typeof e == "string" && [
	"ko",
	"ko-kr",
	"en",
	"en-us"
].includes(e.toLowerCase()) ? {
	ko: "ko-KR",
	"ko-kr": "ko-KR",
	en: "en-US",
	"en-us": "en-US"
}[e.toLowerCase()] : void 0;
function jx(e = {}, t = {}) {
	let n = typeof e == "string" ? { code: e } : e || {}, r = Ax(n.code) || "ko-KR", i = Ax(t.code) || r, a = i === "en-US" ? Dx : Ex, o = (e) => Object.fromEntries(Object.entries(e).filter(([e, t]) => Object.hasOwn(a, e) && typeof t == typeof a[e] && e !== "code" && (e !== "firstDay" || Number.isInteger(t) && Number(t) >= 0 && Number(t) <= 6))), s = {
		...a,
		...i === r ? o(n) : {},
		...o(t),
		code: i
	}, c = s.pageLabel;
	return {
		...s,
		pageLabel: (e, t) => kx(c(e, t), Px(e, i))
	};
}
function Mx(e, t = {}) {
	e.provide(Ox, t);
}
function Nx(e = () => void 0) {
	let t = vr(Ox, {});
	return Y(() => jx(pn(t), e()));
}
function Px(e, t) {
	return new Intl.NumberFormat(t, { maximumSignificantDigits: 21 }).format(e);
}
function Fx(e, t = "ko-KR", n = {}) {
	return new Intl.NumberFormat(jx(t).code, {
		maximumSignificantDigits: 21,
		...n
	}).format(e);
}
function Ix(e, t = "ko-KR") {
	jx(t);
	let n = e.trim();
	if (!/^[+-]?(?:(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d*)?|\.\d+)$/.test(n)) return null;
	let r = Number(n.replaceAll(",", ""));
	return Number.isFinite(r) ? r : null;
}
function Lx(e, t = "ko-KR", n = {}) {
	let r = wh(e);
	if (!r) return "";
	let i = /* @__PURE__ */ new Date(0);
	return i.setUTCHours(0, 0, 0, 0), i.setUTCFullYear(r.y, r.m - 1, r.d), new Intl.DateTimeFormat(jx(t).code, {
		year: "numeric",
		month: "short",
		day: "numeric",
		...n,
		calendar: "gregory",
		timeZone: "UTC"
	}).format(i);
}
var Rx = (e) => Number.isInteger(e) && e >= 0 && e <= 1440, zx = (e) => typeof e == "string" && !!e.trim();
function Bx(e, t, n, r, i, a = []) {
	if (!Rx(r) || !Rx(i) || r >= i || !Array.isArray(e) || !Array.isArray(t) || !Array.isArray(a)) throw TypeError("Invalid time grid range");
	let o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set(), l = t.map((e) => {
		if (!e || !zx(e.key) || !zx(e.label) || o.has(e.key) || e.date !== void 0 && !wh(e.date)) throw TypeError("Invalid time grid column");
		return o.add(e.key), Object.freeze({
			key: e.key,
			label: e.label,
			date: e.date
		});
	}), u = a.map((e) => {
		if (!e || !zx(e.id) || c.has(e.id) || !zx(e.label) || e.columnKey !== void 0 && !o.has(e.columnKey) || !Rx(e.startMinute) || !Rx(e.endMinute) || e.startMinute >= e.endMinute || e.category !== void 0 && (typeof e.category != "string" || !/^c[1-8]$/.test(e.category))) throw TypeError("Invalid time grid band");
		return c.add(e.id), Object.freeze({
			id: e.id,
			label: e.label,
			columnKey: e.columnKey,
			startMinute: e.startMinute,
			endMinute: e.endMinute,
			category: e.category
		});
	}), d = e.map((e, t) => {
		let r = n.key(e), i = n.label(e), a = n.column(e), c = n.start(e), l = n.end(e);
		if (typeof r != "string" && typeof r != "number" || typeof r == "number" && !Number.isFinite(r) || typeof r == "string" && !r.trim() || s.has(r) || !zx(i) || !o.has(a) || !Rx(c) || !Rx(l) || c >= l) throw TypeError("Invalid time grid item");
		return s.add(r), Object.freeze({
			key: r,
			item: e,
			label: i,
			columnKey: a,
			startMinute: c,
			endMinute: l,
			index: t
		});
	});
	return Object.freeze({
		columns: Object.freeze(l),
		entries: Object.freeze(d),
		bands: Object.freeze(u),
		startMinute: r,
		endMinute: i
	});
}
function Vx(e, t) {
	return !e || !t ? e === t : e.startMinute === t.startMinute && e.endMinute === t.endMinute && e.columns.length === t.columns.length && e.entries.length === t.entries.length && e.bands.length === t.bands.length && e.columns.every((e, n) => {
		let r = t.columns[n];
		return e.key === r.key && e.label === r.label && e.date === r.date;
	}) && e.entries.every((e, n) => {
		let r = t.entries[n];
		return e.key === r.key && e.item === r.item && e.label === r.label && e.columnKey === r.columnKey && e.startMinute === r.startMinute && e.endMinute === r.endMinute;
	}) && e.bands.every((e, n) => {
		let r = t.bands[n];
		return e.id === r.id && e.label === r.label && e.columnKey === r.columnKey && e.startMinute === r.startMinute && e.endMinute === r.endMinute && e.category === r.category;
	});
}
function Hx(e, t, n, r) {
	let i = e.filter((e) => e.columnKey === t && e.startMinute < r && e.endMinute > n).map((e) => ({
		...e,
		visibleStart: Math.max(n, e.startMinute),
		visibleEnd: Math.min(r, e.endMinute)
	})).sort((e, t) => e.visibleStart - t.visibleStart || e.index - t.index), a = [], o = [], s = [], c = -1, l = () => {
		for (let e of s) a.push(Object.freeze({
			...e,
			lanes: o.length
		}));
		s = [], o.length = 0;
	};
	for (let e of i) {
		e.visibleStart >= c && (l(), c = -1);
		let t = o.findIndex((t) => t <= e.visibleStart);
		t < 0 && (t = o.length);
		let n = Math.max(e.visibleEnd, e.visibleStart + 30);
		o[t] = n, c = Math.max(c, n), s.push({
			...e,
			lane: t
		});
	}
	return l(), a;
}
function Ux(e, t) {
	let n = [];
	for (let r = Math.ceil(e / 60) * 60; r <= t; r += 60) n.push(r);
	return n;
}
var Wx = {
	type: String,
	default: "neutral"
}, Gx = {
	type: String,
	default: "subtle"
}, Kx = {
	type: String,
	default: "md"
}, qx = {
	type: Number,
	default: 20
};
function Jx(e) {
	return (e || []).map((e) => typeof e.children == "string" ? e.children : Array.isArray(e.children) ? e.children.map((e) => typeof e == "object" && e ? Jx([e]) : String(e ?? "")).join("") : "").join("").trim();
}
function Yx(e, t, n, r = {}, i) {
	return X("svg", {
		...r,
		class: [
			"sol-icon",
			"sol-ui-icon-display",
			"size-" + t,
			r.class
		],
		width: t,
		height: t,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		"stroke-width": 1.6,
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		focusable: "false",
		role: i ? "img" : void 0,
		"aria-label": i,
		"aria-hidden": i ? void 0 : "true"
	}, e ? [X("path", {
		d: e,
		transform: n ? `rotate(${n} 12 12)` : void 0
	})] : []);
}
var Xx = /* @__PURE__ */ H({
	name: "SIcon",
	inheritAttrs: !1,
	props: {
		name: {
			type: String,
			required: !0
		},
		size: qx,
		decorative: {
			type: Boolean,
			default: void 0
		},
		label: String,
		rotate: {
			type: Number,
			default: 0
		}
	},
	setup(e, { attrs: t }) {
		return V(() => [
			e.name,
			e.decorative,
			e.label,
			e.size,
			e.rotate
		], () => {
			Object.hasOwn(Ah, e.name) || oc(`SIcon: unknown icon "${e.name}".`), e.decorative === !1 && !e.label?.trim() && oc("SIcon: a meaningful icon requires label."), [
				16,
				20,
				24
			].includes(e.size) || oc("SIcon: size must be 16, 20 or 24."), [
				0,
				90,
				180,
				270
			].includes(e.rotate) || oc("SIcon: rotate must be 0, 90, 180 or 270.");
		}, { immediate: !0 }), () => {
			let n = [
				16,
				20,
				24
			].includes(e.size) ? e.size : 20, r = e.decorative !== !0 && !!e.label?.trim();
			return Yx(Object.hasOwn(Ah, e.name) ? Ah[e.name] : void 0, n, [
				0,
				90,
				180,
				270
			].includes(e.rotate) ? e.rotate : 0, t, r ? e.label : void 0);
		};
	}
}), Zx = /* @__PURE__ */ H({
	name: "SChip",
	inheritAttrs: !1,
	props: {
		tone: Wx,
		variant: Gx,
		size: Kx,
		label: String,
		selectable: Boolean,
		selected: Boolean,
		disabled: Boolean,
		removable: Boolean,
		removeLabel: String,
		locale: Object
	},
	emits: {
		"update:selected": (e) => !0,
		click: (e) => !0,
		remove: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r }) {
		let i = Nx(() => e.locale);
		return () => {
			let a = n.default?.() || e.label, o = e.label || (Array.isArray(a) ? Jx(a) : a) || "", { class: s, style: c, ...l } = t, u = e.disabled || t["aria-disabled"] === !0 || t["aria-disabled"] === "true", d = [
				n.leading ? X("span", {
					class: "sol-ui-tag-icon",
					"aria-hidden": "true"
				}, n.leading()) : null,
				e.selectable && e.selected ? Yx(Ah.check, 16, 0) : null,
				X("span", { class: "sol-ui-tag-label" }, a),
				n.trailing ? X("span", {
					class: "sol-ui-tag-icon",
					"aria-hidden": "true"
				}, n.trailing()) : null
			];
			return X("span", {
				...e.selectable ? {} : l,
				class: [
					"sol-ui-tag",
					"sol-ui-chip",
					s
				],
				style: c,
				"data-tone": e.tone,
				"data-variant": e.variant,
				"data-size": e.size,
				"data-selected": e.selectable && e.selected ? "true" : void 0,
				"data-disabled": u ? "true" : void 0,
				title: t.title ?? o
			}, [e.selectable ? X("button", {
				...l,
				type: "button",
				class: "sol-ui-chip-main",
				disabled: u,
				"aria-pressed": String(e.selected),
				onClick: (t) => {
					u || (r("update:selected", !e.selected), r("click", t));
				}
			}, d) : X("span", { class: "sol-ui-chip-main" }, d), e.removable ? X("button", {
				type: "button",
				class: "sol-ui-chip-remove",
				disabled: u,
				"aria-label": e.removeLabel || i.value.remove(o || i.value.selectedItems),
				onClick: (e) => {
					e.stopPropagation(), u || r("remove", e);
				}
			}, Yx(Ah.close, 16, 0)) : null]);
		};
	}
}), Qx = /* @__PURE__ */ H({
	name: "SBadge",
	inheritAttrs: !1,
	props: {
		tone: Wx,
		variant: Gx,
		size: Kx,
		id: String,
		content: [String, Number],
		label: String,
		live: {
			type: String,
			default: "off"
		},
		placement: {
			type: String,
			default: "top-end"
		}
	},
	setup(e, { attrs: t, slots: n }) {
		let r = ri();
		return () => {
			let i = e.id || "sol-badge-" + r, a = n.default?.() ?? e.content, o = X("span", {
				...t,
				id: i,
				class: [
					"sol-ui-tag",
					"sol-ui-badge",
					t.class
				],
				"data-tone": e.tone,
				"data-variant": e.variant,
				"data-size": e.size,
				role: e.live === "polite" ? "status" : e.label ? "img" : void 0,
				"aria-label": e.live === "off" ? e.label : void 0,
				"aria-live": e.live === "polite" ? "polite" : void 0,
				"aria-atomic": e.live === "polite" ? "true" : void 0,
				title: t.title ?? e.label ?? (Array.isArray(a) ? Jx(a) : a)
			}, [X("span", {
				class: "sol-ui-badge-content",
				"aria-hidden": e.label ? "true" : void 0
			}, [n.icon ? X("span", {
				class: "sol-ui-tag-icon",
				"aria-hidden": "true"
			}, n.icon()) : null, X("span", { class: "sol-ui-tag-label" }, a)]), e.label && e.live === "polite" ? X("span", { class: "sol-ui-sr-only" }, e.label) : null]);
			return n.anchor ? X("span", {
				class: "sol-ui-badge-anchor",
				"data-placement": e.placement
			}, [n.anchor({ descriptionId: i }), o]) : o;
		};
	}
});
function $x(e) {
	return /* @__PURE__ */ H({
		name: "SIconBtn",
		inheritAttrs: !1,
		props: {
			label: {
				type: String,
				required: !0,
				validator: (e) => !!e.trim()
			},
			icon: String,
			size: qx,
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
		emits: { click: (e) => !0 },
		setup(t, { attrs: n, slots: r, emit: i }) {
			return V(() => [t.label, t.icon], () => {
				t.label?.trim() || oc("SIconBtn: label must be a nonempty accessible name."), !t.icon && !r.default && oc("SIconBtn: provide icon or a default icon slot.");
			}, { immediate: !0 }), () => !t.label?.trim() || !t.icon && !r.default ? X("span", { "aria-hidden": "true" }) : X(e, {
				...n,
				class: ["sol-ui-icon-button", n.class],
				"aria-label": t.label,
				type: t.type,
				variant: t.variant,
				tone: t.tone,
				disabled: t.disabled,
				loading: t.loading,
				onClick: (e) => i("click", e)
			}, { default: () => r.default?.() || (t.icon ? X(Xx, {
				name: t.icon,
				size: t.size,
				decorative: !0
			}) : null) });
		}
	});
}
var eS = /* @__PURE__ */ new Set([
	"move",
	"resize-start",
	"resize-end",
	"duplicate"
]), tS = (e) => typeof e.columnKey == "string" && !!e.columnKey.trim() && Number.isInteger(e.startMinute) && Number.isInteger(e.endMinute) && e.startMinute >= 0 && e.endMinute <= 1440 && e.startMinute < e.endMinute;
function nS(e, t, n, r = e.columnKey, i = 15) {
	if (!tS(e) || !eS.has(t) || !Number.isFinite(n) || typeof r != "string" || !r.trim() || !Number.isInteger(i) || i < 1 || i > 1440) throw TypeError("Invalid time grid proposal");
	let a = n === (t === "resize-end" ? e.endMinute : e.startMinute) ? n : Math.round(n / i) * i, o = e.startMinute, s = e.endMinute, c = e.columnKey;
	if (t === "move" || t === "duplicate") {
		let e = s - o;
		o = Math.max(0, Math.min(1440 - e, a)), s = o + e, c = r;
	} else t === "resize-start" ? o = Math.max(0, Math.min(s - 1, a)) : s = Math.min(1440, Math.max(o + 1, a));
	return Object.freeze({
		columnKey: c,
		startMinute: o,
		endMinute: s
	});
}
var rS = (e, t) => e.columnKey === t.columnKey && e.startMinute === t.startMinute && e.endMinute === t.endMinute;
function iS(e, t, n, r, i) {
	if (!tS(n) || !tS(r) || !eS.has(t) || ![
		"keyboard",
		"pointer",
		"button"
	].includes(i) || typeof e != "string" && typeof e != "number" || typeof e == "number" && !Number.isFinite(e) || typeof e == "string" && !e.trim()) throw TypeError("Invalid time grid proposal payload");
	return Object.freeze({
		key: e,
		action: t,
		from: Object.freeze({ ...n }),
		to: Object.freeze({ ...r }),
		input: i
	});
}
function aS(e, t) {
	return !e || !t ? e === t : e.columns.length === t.columns.length && e.entries.length === t.entries.length && e.columns.every((e, n) => {
		let r = t.columns[n];
		return e.key === r.key && e.label === r.label && e.date === r.date;
	}) && e.entries.every((e, n) => {
		let r = t.entries[n];
		return e.key === r.key && e.label === r.label && e.columnKey === r.columnKey && e.startMinute === r.startMinute && e.endMinute === r.endMinute;
	});
}
function oS(e) {
	let t = /* @__PURE__ */ I(null), n = 0, r = !1, i = !1, a = [];
	function o(i, a = !0) {
		let o = t.value;
		if (!o) return !1;
		let s = a ? e.prepareRestore(o.key) : void 0;
		return n++, r = !1, t.value = null, e.cancel(Object.freeze({
			...o,
			reason: i
		})), s && z(s), !0;
	}
	function s(s, c, l, u = "item") {
		if (i || e.blocked(s, c)) return !1;
		let d = e.source()?.entries.find((e) => e.key === s);
		if (!d) return !1;
		o("configuration", !1);
		let f = {
			columnKey: d.columnKey,
			startMinute: d.startMinute,
			endMinute: d.endMinute
		}, p = ++n;
		return a = [...e.configuration()], r = !1, t.value = iS(s, c, f, f, l), e.start(t.value), z(() => {
			!i && t.value && p === n && (r = !0, e.focus(s, u));
		}), !0;
	}
	function c(n, r, a) {
		let s = t.value;
		if (!s || i) return !1;
		let c = e.blocked(s.key, s.action);
		if (c) return o(c), !1;
		if (!e.source()?.columns.some((e) => e.key === r)) return o("external"), !1;
		try {
			let i = nS(s.from, s.action, n, r, e.snap());
			return !rS(s.to, i) && (t.value = iS(s.key, s.action, s.from, i, a), e.preview(t.value), !0);
		} catch {
			return o("configuration"), !1;
		}
	}
	function l() {
		let a = t.value;
		if (!a || !r || i) return !1;
		let s = e.blocked(a.key, a.action);
		if (s) return o(s), !1;
		if (a.action !== "duplicate" && rS(a.from, a.to)) return o("unchanged"), !1;
		let c = e.prepareRestore(a.key);
		return n++, r = !1, t.value = null, e.commit(a), z(c), !0;
	}
	return V(e.source, (n, r) => {
		if (t.value) {
			let i = e.configuration(), s = i.length !== a.length || i.some((e, t) => !Object.is(e, a[t]));
			if (!s && aS(n, r)) return;
			o(s ? "configuration" : e.blocked(t.value.key, t.value.action) || "external");
		}
	}), V(e.configuration, () => o("configuration")), Sr(() => {
		let n = t.value;
		if (n) {
			let t = e.blocked(n.key, n.action);
			t && o(t);
		}
	}), Qi(() => {
		o("unmount", !1), i = !0, n++;
	}), {
		state: t,
		begin: s,
		preview: c,
		commit: l,
		cancel: o
	};
}
function sS(e) {
	let t = null, n = 0, r, i, a = !1, o = {
		capture: !0,
		passive: !1
	};
	function s(e) {
		window[e]("pointermove", f, o), window[e]("pointerup", p, !0), window[e]("pointercancel", m, !0), window[e]("pointerdown", h, !0), window[e]("blur", g);
	}
	function c() {
		let e = t;
		if (t = null, n && cancelAnimationFrame(n), n = 0, r?.disconnect(), r = void 0, s("removeEventListener"), e) {
			e.dragging && (i = e.key);
			try {
				e.owner.hasPointerCapture(e.id) && e.owner.releasePointerCapture(e.id);
			} catch {}
		}
	}
	function l(n, r = !0) {
		let i = t?.dragging;
		c(), i && e.cancel(n, r);
	}
	function u(t) {
		let n = e.scroll(), r = e.state();
		if (!n || !r || r.key !== t.key) return;
		let i = e.columns().get(r.from.columnKey)?.getBoundingClientRect();
		if (!i || i.height !== t.columnHeight) {
			l("configuration");
			return;
		}
		let a = (t.action === "resize-end" ? r.from.endMinute : r.from.startMinute) + (t.lastY - t.y + t.originTop - i.top) / t.columnHeight * t.range, o = r.from.columnKey, s = Infinity;
		if (t.action === "move" || t.action === "duplicate") for (let [n, r] of e.columns()) {
			let e = r.getBoundingClientRect(), i = t.lastX < e.left ? e.left - t.lastX : t.lastX > e.right ? t.lastX - e.right : 0;
			i < s && (s = i, o = n);
		}
		e.preview(a, o);
	}
	function d() {
		let r = t, i = e.scroll();
		if (!r?.dragging || !i) return;
		let a = i.getBoundingClientRect(), o = r.owner.getBoundingClientRect().height || 40, s = Math.min(o, a.width / 4, a.height / 4), c = (e, t, n) => Math.max(-o / 4, Math.min(o / 4, e < t + s ? -Math.ceil((t + s - e) / 4) : e > n - s ? Math.ceil((e - (n - s)) / 4) : 0));
		i.scrollBy(c(r.lastX, a.left, a.right), c(r.lastY, Math.max(a.top, i.querySelector(".sol-ui-time-grid-head")?.getBoundingClientRect().bottom ?? a.top), a.bottom)), u(r), t === r && (n = requestAnimationFrame(d));
	}
	function f(i) {
		let a = t;
		if (a && i.pointerId === a.id) {
			if (a.lastX = i.clientX, a.lastY = i.clientY, !a.dragging) {
				if (Math.hypot(i.clientX - a.x, i.clientY - a.y) < 5) return;
				let o = e.scroll();
				if (!o || !e.begin(a.key, a.action)) {
					c();
					return;
				}
				let s = e.state(), u = s ? e.columns().get(s.from.columnKey) : void 0;
				if (!u) {
					l("external");
					return;
				}
				if (a.dragging = !0, a.columnHeight = u.getBoundingClientRect().height, a.range = e.range().endMinute - e.range().startMinute, a.columnHeight <= 0) {
					l("configuration");
					return;
				}
				typeof ResizeObserver < "u" && (r = new ResizeObserver(() => {
					t === a && (o.clientWidth !== a.width || o.clientHeight !== a.height || u.getBoundingClientRect().height !== a.columnHeight) && l("configuration");
				}), r.observe(o), r.observe(u)), n = requestAnimationFrame(d);
			}
			i.preventDefault(), u(a);
		}
	}
	function p(n) {
		let r = t;
		if (r && n.pointerId === r.id) {
			if (r.dragging) {
				r.lastX = n.clientX, r.lastY = n.clientY, u(r);
				let t = e.scroll(), i = t?.getBoundingClientRect(), a = t?.querySelector(".sol-ui-time-grid-head")?.getBoundingClientRect().bottom ?? i?.top ?? 0;
				i && n.clientY >= Math.max(i.top, a) && n.clientY <= i.bottom && [...e.columns().values()].some((e) => {
					let t = e.getBoundingClientRect();
					return n.clientX >= Math.max(i.left, t.left) && n.clientX <= Math.min(i.right, t.right);
				}) ? e.commit() : l("outside", !1);
			}
			c();
		}
	}
	function m(e) {
		t?.id === e.pointerId && l("pointercancel");
	}
	function h(e) {
		t && e.pointerId !== t.id && l("pointercancel");
	}
	function g() {
		l("outside", !1);
	}
	function _(n, r, a) {
		if (n.defaultPrevented || !n.isPrimary || n.button !== 0 || !(n.currentTarget instanceof HTMLElement)) return;
		c(), i = void 0;
		let o = e.scroll();
		if (!o) return;
		let l = e.range(), u = o.getBoundingClientRect();
		t = {
			key: r,
			action: a,
			id: n.pointerId,
			owner: n.currentTarget,
			x: n.clientX,
			y: n.clientY,
			lastX: n.clientX,
			lastY: n.clientY,
			dragging: !1,
			originTop: n.currentTarget.closest(".sol-ui-time-grid-column")?.getBoundingClientRect().top ?? u.top,
			columnHeight: 0,
			range: l.endMinute - l.startMinute,
			width: o.clientWidth,
			height: o.clientHeight
		};
		try {
			n.currentTarget.setPointerCapture(n.pointerId);
		} catch {
			c();
			return;
		}
		s("addEventListener");
	}
	return {
		down: _,
		stop: c,
		isDragging: () => !!t?.dragging,
		clearClick: (e) => {
			t || (i = void 0, a = !e.target.closest(".sol-ui-time-grid-item"));
		},
		lost: (e) => {
			t?.id === e.pointerId && l("capture");
		},
		consumeClick: (e, t) => {
			let n = e.detail > 0 || "pointerType" in e && e.pointerType === "touch";
			return n && i !== void 0 && (t === void 0 || t === i) ? (e.preventDefault(), e.stopPropagation(), !0) : n && t === void 0 && !a;
		}
	};
}
function cS(e, t, n, r) {
	let i = /* @__PURE__ */ F(""), a = n.locale, o = (e) => typeof e == "string" ? !!e.trim() : typeof e == "number" && Number.isFinite(e), s = Y(() => Number.isInteger(e.snapMinutes) && e.snapMinutes >= 1 && e.snapMinutes <= 1440 && Array.isArray(e.pendingKeys) && e.pendingKeys.every(o)), c = Y(() => {
		let n = /* @__PURE__ */ new Set();
		try {
			for (let r of t()?.entries || []) {
				let t = e.isItemDisabled?.(r.item) ?? !1;
				if (typeof t != "boolean") return {
					valid: !1,
					keys: n
				};
				t && n.add(r.key);
			}
			return {
				valid: !0,
				keys: n
			};
		} catch {
			return {
				valid: !1,
				keys: n
			};
		}
	}), l = Y(() => new Set(Array.isArray(e.pendingKeys) ? e.pendingKeys : [])), u = Y(() => new Map(t()?.entries.map((e) => [e.key, e]) || [])), d = (e) => l.value.has(e), f = (e) => u.value.get(e);
	function p(r, i) {
		return !s.value || !c.value.valid || !t() ? "configuration" : f(r) ? e.readonly ? "readonly" : e.disabled || c.value.keys.has(r) || n.host.value?.closest("[inert],[aria-disabled=true]") ? "disabled" : e.loading ? "loading" : d(r) ? "pending" : i === "move" && !e.allowMove || i === "duplicate" && !e.allowDuplicate || (i === "resize-start" || i === "resize-end") && !e.allowResize ? "configuration" : null : "external";
	}
	let m = oS({
		source: t,
		configuration: () => [
			e.snapMinutes,
			e.allowMove,
			e.allowResize,
			e.allowDuplicate,
			e.startMinute,
			e.endMinute
		],
		snap: () => e.snapMinutes,
		blocked: p,
		focus: n.focus,
		prepareRestore: (e) => {
			let t = typeof document > "u" ? null : document.activeElement, r = !!t && !!n.host.value?.contains(t);
			return () => {
				r && n.host.value?.isConnected && (document.activeElement === t || !t?.isConnected && document.activeElement === document.body) && n.focus(e);
			};
		},
		start: (e) => {
			i.value = "", r.start(e);
		},
		preview: r.preview,
		commit: (e) => {
			i.value = "commit", r.commit(e);
		},
		cancel: (e) => {
			i.value = e.reason === "unchanged" ? "unchanged" : "cancel", r.cancel(e);
		}
	}), h = sS({
		scroll: () => n.scroll.value,
		columns: () => n.columns,
		range: () => ({
			startMinute: e.startMinute,
			endMinute: e.endMinute
		}),
		state: () => m.state.value,
		begin: (e, t) => m.begin(e, t, "pointer"),
		preview: (e, t) => {
			m.preview(e, t, "pointer");
		},
		commit: () => {
			m.commit();
		},
		cancel: m.cancel
	});
	V(m.state, (e, t) => {
		!e && t && h.stop();
	}, { flush: "sync" });
	let g = (e) => e === "move" ? a.value.timeGridMove || "Move" : e === "resize-start" ? a.value.timeGridResizeStart || "Resize start" : e === "resize-end" ? a.value.timeGridResizeEnd || "Resize end" : a.value.timeGridDuplicate || "Duplicate";
	function _(n, r = 0, i = "button") {
		let a = m.state.value, o = t()?.columns;
		if (!a || !o) return;
		let s = o.findIndex((e) => e.key === a.to.columnKey), c = o[Math.max(0, Math.min(o.length - 1, s + r))];
		if (!c) return;
		let l = (a.action === "resize-end" ? a.to.endMinute : a.to.startMinute) + n * e.snapMinutes;
		m.preview(l, c.key, i);
	}
	function v(e) {
		if (e.isComposing || e.defaultPrevented) return;
		let t = e.target instanceof HTMLElement ? e.target : null, r = m.state.value;
		if (r && e.key === "Escape") e.preventDefault(), e.stopPropagation(), m.cancel("escape");
		else if (r && e.key === "Tab" && t?.closest(".sol-ui-time-grid-item")) m.cancel("tab", !1);
		else if (!(!t || t.closest("button,input,textarea,select,[contenteditable=true]") || e.ctrlKey || e.metaKey || e.altKey)) {
			if (r) {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault(), e.repeat || m.commit();
					return;
				}
				if ([
					"ArrowUp",
					"ArrowDown",
					"PageUp",
					"PageDown"
				].includes(e.key)) {
					e.preventDefault(), _((e.key === "ArrowUp" || e.key === "PageUp" ? -1 : 1) * (e.shiftKey || e.key.startsWith("Page") ? 10 : 1), 0, "keyboard");
					return;
				}
				if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && (r.action === "move" || r.action === "duplicate")) {
					e.preventDefault();
					let t = !!n.host.value && getComputedStyle(n.host.value).direction === "rtl";
					_(0, (e.key === "ArrowLeft" ? -1 : 1) * (t ? -1 : 1), "keyboard");
					return;
				}
				if (e.key === "Home" || e.key === "End") {
					e.preventDefault();
					let t = e.key === "Home" ? 0 : 1440;
					m.preview(t, r.to.columnKey, "keyboard");
				}
			} else if (e.key === " " && !e.repeat) {
				let r = [...n.nodes].find(([, e]) => e === t || e.contains(t));
				r && !p(r[0], "move") && (e.preventDefault(), m.begin(r[0], "move", "keyboard"));
			}
		}
	}
	function y(e) {
		!m.state.value || h.isDragging() || e.relatedTarget instanceof Node && n.host.value?.contains(e.relatedTarget) || z(() => {
			m.state.value && !n.host.value?.contains(document.activeElement) && m.cancel("blur", !1);
		});
	}
	let b = (e) => {
		m.state.value && e.target instanceof Node && !n.host.value?.contains(e.target) && m.cancel("outside", !1);
	}, x = () => m.cancel("outside", !1);
	Yi(() => {
		document.addEventListener("pointerdown", b, !0), window.addEventListener("blur", x);
	}), Qi(() => {
		h.stop(), document.removeEventListener("pointerdown", b, !0), window.removeEventListener("blur", x);
	});
	function S(e, t) {
		return {
			"data-draggable": p(e, t) ? void 0 : "true",
			onPointerdown: (n) => {
				p(e, t) || (m.cancel("configuration", !1), h.down(n, e, t));
			},
			onLostpointercapture: h.lost,
			onDragstart: (e) => e.preventDefault()
		};
	}
	function C(e) {
		let t = S(e.key, "move");
		return {
			...t,
			onPointerdown: (e) => {
				e.target.closest("button,a,input,textarea,select,[contenteditable]") || t.onPointerdown(e);
			},
			onClick: (t) => {
				h.consumeClick(t, e.key);
			}
		};
	}
	function w(t, r) {
		if (e.readonly) return [];
		let i = (e, r = 0) => X("button", {
			key: e,
			type: "button",
			class: ["sol-button sol-ui-time-grid-handle", "sol-ui-time-grid-handle--" + e],
			"aria-label": g(e) + " · " + t.label,
			disabled: !!p(t.key, e),
			"aria-describedby": n.keysId,
			...S(t.key, e),
			onClick: (n) => {
				h.consumeClick(n, t.key) || m.begin(t.key, e, "button");
			}
		}, [Yx(Ah.chevron, 16, r)]);
		return [...e.allowResize ? [i("resize-start", 180), i("resize-end")] : []];
	}
	function T(t) {
		let r = m.state.value;
		if (!r || r.to.columnKey !== t || r.to.startMinute >= e.endMinute || r.to.endMinute <= e.startMinute) return null;
		let i = Math.max(e.startMinute, r.to.startMinute), a = Math.min(e.endMinute, r.to.endMinute), o = e.endMinute - e.startMinute;
		return X("div", {
			key: "preview",
			class: "sol-ui-time-grid-preview",
			"aria-hidden": "true",
			style: {
				top: (i - e.startMinute) / o * 100 + "%",
				height: (Math.max(a, i + 30) - i) / o * 100 + "%"
			}
		}, [X("strong", { class: "sol-ui-time-grid-item-title" }, f(r.key)?.label), X("span", { class: "sol-ui-time-grid-item-time" }, n.time(r.to.startMinute) + "–" + n.time(r.to.endMinute))]);
	}
	function E() {
		let e = m.state.value, r = e ? t()?.columns.find((t) => t.key === e.to.columnKey) : void 0;
		return X("output", {
			class: ["sol-ui-hint sol-ui-time-grid-status", !e && !i.value ? "sol-ui-sr-only" : void 0],
			role: "status",
			"aria-live": "polite",
			"aria-atomic": "true"
		}, e ? (a.value.timeGridPreview || "Preview") + " · " + g(e.action) + " · " + (f(e.key)?.label || String(e.key)) + " · " + (r ? r.label + (r.date ? " · " + Lx(r.date, a.value) : "") : e.to.columnKey) + " · " + n.time(e.to.startMinute) + "–" + n.time(e.to.endMinute) : i.value === "commit" ? a.value.timeGridProposed || a.value.done : i.value === "unchanged" ? a.value.timeGridUnchanged || a.value.done : i.value === "cancel" ? a.value.timeGridCancelled || a.value.close : "");
	}
	return {
		state: m.state,
		begin: m.begin,
		commit: m.commit,
		events: {
			onPointerdownCapture: h.clearClick,
			onKeydown: v,
			onFocusout: y
		},
		cancel: () => m.cancel("api"),
		valid: Y(() => s.value && c.value.valid),
		blocked: p,
		pending: d,
		handles: w,
		pointerProps: C,
		controlProps: S,
		consumeClick: h.consumeClick,
		preview: T,
		status: E,
		scope: (t) => ({
			active: m.state.value?.key === t,
			readonly: e.readonly,
			disabled: e.disabled || e.loading || d(t) || c.value.keys.has(t) || !s.value || !c.value.valid,
			pending: d(t),
			proposal: m.state.value?.key === t ? m.state.value : null
		})
	};
}
function lS(e) {
	return String(Math.floor(e / 60)).padStart(2, "0") + ":" + String(e % 60).padStart(2, "0");
}
function uS(e, t, n) {
	let r = kh(e)?.minutes, i = kh(t)?.minutes;
	return r === void 0 || i === void 0 || r > i || !Number.isInteger(n) || n <= 0 ? [] : Array.from({ length: Math.floor((i - r) / n) + 1 }, (e, t) => lS(r + t * n));
}
function dS(e, t) {
	if (!Number.isFinite(t)) return e[0];
	let n, r = Infinity;
	for (let i of e) {
		let e = Math.abs(kh(i).minutes - t);
		e <= r && (n = i, r = e);
	}
	return n;
}
function fS(e = /* @__PURE__ */ new Date()) {
	return [
		e.getFullYear(),
		e.getMonth() + 1,
		e.getDate()
	].map((e, t) => String(e).padStart(t ? 2 : 4, "0")).join("-");
}
var pS = {
	type: String,
	required: !0
}, mS = {
	type: String,
	required: !0
}, hS = {
	type: Array,
	required: !0
}, gS = {
	type: Boolean,
	default: void 0
}, _S = (e) => !0, vS = (e) => !0, yS = () => !0, bS = (e) => !0, xS = {
	"update:open": _S,
	select: vS,
	open: yS,
	close: bS
};
function SS(e, t, n) {
	let r = /* @__PURE__ */ F(!1), i = Y(() => !e.disabled && !e.readonly && e.items.some((e) => !e.disabled) && (e.open ?? r.value)), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ F(""), s = /* @__PURE__ */ F({
		left: "8px",
		top: "8px"
	}), c = /* @__PURE__ */ new Map(), l = null, u = null, d = null, f = "programmatic", p = !0, m = !1, h = "", g, _ = !1, v = () => e.items.filter((e) => !e.disabled);
	function y(n) {
		e.open === void 0 && (r.value = n), t("update:open", n);
	}
	function b() {
		if (!i.value || !a.value) return;
		let e = a.value.getBoundingClientRect(), t = u?.getBoundingClientRect(), n = d?.x ?? t?.left ?? 8, r = d?.y ?? t?.bottom ?? 8;
		s.value = {
			left: Math.max(8, Math.min(n, window.innerWidth - e.width - 8)) + "px",
			top: Math.max(8, Math.min(r + 4, window.innerHeight - e.height - 8)) + "px"
		};
	}
	function x() {
		try {
			a.value?.showPopover?.();
		} catch {}
		b(), c.get(o.value)?.focus();
	}
	function S(t, n, r = !1) {
		e.disabled || e.readonly || !v().length || (m = !0, l = t, u = t, d = n || null, o.value = (r ? v().at(-1) : v()[0])?.id || "", i.value ? (m = !1, b(), z(() => c.get(o.value)?.focus())) : y(!0));
	}
	function C(e = "programmatic", t = !0) {
		i.value && (f = e, p = t, y(!1));
	}
	function w(n) {
		e.disabled || e.readonly || n.disabled || (t("select", n.id), C("select"));
	}
	function T(e) {
		if (e.isComposing) return;
		let t = v(), n = t.findIndex((e) => e.id === o.value), r;
		if (e.key === "Escape") e.preventDefault(), e.stopPropagation(), C("escape");
		else if (e.key === "Tab") C("tab", !1);
		else {
			if (e.key === "Home") r = 0;
			else if (e.key === "End") r = t.length - 1;
			else if (e.key === "ArrowDown") r = (n + 1) % t.length;
			else if (e.key === "ArrowUp") r = (n - 1 + t.length) % t.length;
			else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && e.key !== " ") {
				clearTimeout(g), h += e.key.toLowerCase(), g = setTimeout(() => h = "", 600);
				let i = (n + 1 + t.length) % t.length;
				for (let e = 0; e < t.length; e++) {
					let n = (i + e) % t.length;
					if (t[n].label.toLowerCase().startsWith(h)) {
						r = n;
						break;
					}
				}
			}
			r !== void 0 && t[r] && (e.preventDefault(), o.value = t[r].id, c.get(o.value)?.focus());
		}
	}
	let E = (e) => {
		i.value && !n.value?.contains(e.target) && C("outside", !1);
	};
	V(i, async (e, n) => {
		if (e) {
			if (!m && typeof document < "u" && (l = document.activeElement, u = l, d = null), m = !1, v().some((e) => e.id === o.value) || (o.value = v()[0]?.id || ""), await z(), _ || !i.value) return;
			x(), t("open");
		} else if (n) {
			let e = !!a.value?.contains(document.activeElement);
			try {
				a.value?.hidePopover?.();
			} catch {}
			clearTimeout(g), h = "", await z(), p && e && document.activeElement === document.body && l?.isConnected && !l.disabled && l.focus(), t("close", f), f = "programmatic", p = !0, m = !1;
		}
	}), V(() => [e.disabled, e.readonly], () => {
		(e.disabled || e.readonly) && (f = "disabled", p = !0, y(!1));
	}), V(() => e.items, async () => {
		i.value && (v().length ? v().some((e) => e.id === o.value) || (o.value = v()[0].id, await z(), c.get(o.value)?.focus()) : C());
	}, { deep: !0 });
	function D(e) {
		document[e]("pointerdown", E), document[e]("focusin", E), window[e]("resize", b), document[e]("scroll", b, !0);
	}
	return Yi(() => {
		D("addEventListener"), i.value && (l = document.activeElement, o.value = v()[0]?.id || "", z(x));
	}), Qi(() => {
		_ = !0, clearTimeout(g), D("removeEventListener"), a.value?.contains(document.activeElement) && l?.isConnected && l.focus();
		try {
			a.value?.hidePopover?.();
		} catch {}
	}), {
		expanded: i,
		open: S,
		close: C,
		render: () => i.value ? X("div", {
			ref: a,
			id: e.id + "-menu",
			popover: "manual",
			role: "menu",
			"aria-label": e.label,
			class: "sol-ui-action-menu",
			style: s.value,
			onKeydown: T
		}, e.items.map((t) => X("button", {
			ref: (e) => {
				e ? c.set(t.id, e) : c.delete(t.id);
			},
			id: e.id + "-item-" + t.id,
			type: "button",
			role: "menuitem",
			class: ["sol-button subtle", t.danger ? "sol-ui-menu-danger" : ""],
			"aria-disabled": t.disabled ? "true" : void 0,
			tabindex: !t.disabled && o.value === t.id ? 0 : -1,
			onFocus: () => {
				t.disabled || (o.value = t.id);
			},
			onClick: () => w(t)
		}, t.label))) : null
	};
}
function CS() {
	return Yx(Ah.chevron, 20, 0, { class: "sol-ui-icon" });
}
var wS = /* @__PURE__ */ H({
	name: "SSplitBtn",
	inheritAttrs: !1,
	props: {
		id: pS,
		label: mS,
		items: hS,
		disabled: Boolean,
		readonly: Boolean,
		open: gS,
		locale: Object,
		menuLabel: String
	},
	emits: {
		"update:open": _S,
		select: vS,
		open: yS,
		close: bS,
		primary: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r }) {
		let i = Nx(() => e.locale), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ F(null), s = SS(e, r, a);
		return () => X("div", {
			...t,
			ref: a,
			id: e.id,
			class: ["sol-ui-split-button", t.class],
			role: "group",
			"aria-label": e.label
		}, [
			X("button", {
				type: "button",
				class: "sol-button primary",
				disabled: e.disabled,
				"aria-disabled": e.readonly ? "true" : void 0,
				onClick: (t) => {
					!e.disabled && !e.readonly && r("primary", t);
				}
			}, n.default?.() || e.label),
			X("button", {
				ref: o,
				type: "button",
				class: "sol-button primary sol-ui-split-toggle",
				disabled: e.disabled,
				"aria-disabled": e.readonly ? "true" : void 0,
				"aria-label": e.menuLabel || e.label + " " + i.value.moreActions,
				"aria-haspopup": "menu",
				"aria-expanded": String(s.expanded.value),
				"aria-controls": s.expanded.value ? e.id + "-menu" : void 0,
				onClick: () => s.expanded.value ? s.close() : s.open(o.value),
				onKeydown: (e) => {
					(e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), s.open(o.value, void 0, e.key === "ArrowUp"));
				}
			}, CS()),
			s.render()
		]);
	}
}), TS = /* @__PURE__ */ H({
	name: "SContextMenu",
	inheritAttrs: !1,
	props: {
		id: pS,
		label: mS,
		items: hS,
		disabled: Boolean,
		readonly: Boolean,
		open: gS,
		locale: Object,
		triggerLabel: String
	},
	emits: xS,
	setup(e, { attrs: t, slots: n, emit: r }) {
		let i = Nx(() => e.locale), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ F(null), s = SS(e, r, a);
		function c(t) {
			e.disabled || e.readonly || t.target.isContentEditable || t.target.closest("input,textarea,select") || (t.preventDefault(), (t.target.closest("button,a,[tabindex]") || a.value)?.focus(), s.open(document.activeElement, {
				x: t.clientX,
				y: t.clientY
			}));
		}
		return () => X("div", {
			...t,
			ref: a,
			id: e.id,
			class: ["sol-ui-context", t.class]
		}, [
			X("div", {
				class: "sol-ui-context-target",
				tabindex: e.disabled ? -1 : 0,
				role: "group",
				"aria-label": e.label,
				"aria-disabled": e.disabled || e.readonly ? "true" : void 0,
				"aria-haspopup": "menu",
				"aria-controls": s.expanded.value ? e.id + "-menu" : void 0,
				onContextmenu: c,
				onKeydown: (t) => {
					if (t.key === "ContextMenu" || t.key === "F10" && t.shiftKey) {
						if (e.disabled || e.readonly) return;
						t.preventDefault(), s.open(document.activeElement);
					}
				}
			}, [n.default?.(), X("p", { class: "sol-hint" }, i.value.contextKeys)]),
			X("button", {
				ref: o,
				type: "button",
				class: "sol-button sol-ui-context-trigger",
				disabled: e.disabled,
				"aria-disabled": e.readonly ? "true" : void 0,
				"aria-haspopup": "menu",
				"aria-expanded": String(s.expanded.value),
				"aria-controls": s.expanded.value ? e.id + "-menu" : void 0,
				onClick: () => s.expanded.value ? s.close() : s.open(o.value)
			}, [X("span", e.triggerLabel || i.value.moreActions), CS()]),
			s.render()
		]);
	}
}), ES = /* @__PURE__ */ H({
	name: "STimeGrid",
	inheritAttrs: !1,
	props: {
		id: {
			type: String,
			required: !0
		},
		label: {
			type: String,
			required: !0
		},
		items: {
			type: Array,
			required: !0
		},
		columns: {
			type: Array,
			required: !0
		},
		itemKey: {
			type: Function,
			required: !0
		},
		itemLabel: {
			type: Function,
			required: !0
		},
		itemColumn: {
			type: Function,
			required: !0
		},
		itemStart: {
			type: Function,
			required: !0
		},
		itemEnd: {
			type: Function,
			required: !0
		},
		startMinute: {
			type: Number,
			default: 0
		},
		endMinute: {
			type: Number,
			default: 1440
		},
		bands: {
			type: Array,
			default: () => []
		},
		loading: Boolean,
		error: {
			type: String,
			default: ""
		},
		help: {
			type: String,
			default: ""
		},
		locale: Object,
		readonly: {
			type: Boolean,
			default: !0
		},
		disabled: Boolean,
		snapMinutes: {
			type: Number,
			default: 15
		},
		allowMove: {
			type: Boolean,
			default: !0
		},
		allowResize: Boolean,
		allowDuplicate: Boolean,
		allowCreate: Boolean,
		allowRemove: Boolean,
		allowEdit: Boolean,
		showCurrentTime: Boolean,
		currentTime: Object,
		pendingKeys: {
			type: Array,
			default: () => []
		},
		isItemDisabled: Function
	},
	slots: Object,
	emits: {
		create: (e) => !0,
		remove: (e) => !0,
		edit: (e) => !0,
		start: (e) => !0,
		preview: (e) => !0,
		commit: (e) => !0,
		cancel: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = /* @__PURE__ */ F(null), o, s = !1, c = Y(() => e.currentTime ?? a.value);
		function l() {
			if (clearTimeout(o), !s || !e.showCurrentTime || e.currentTime) return;
			let t = /* @__PURE__ */ new Date();
			a.value = {
				date: fS(t),
				minute: t.getHours() * 60 + t.getMinutes()
			}, o = setTimeout(l, 6e4 - Date.now() % 6e4);
		}
		Yi(() => {
			s = !0, l(), document.addEventListener("visibilitychange", l);
		}), V(() => [e.showCurrentTime, e.currentTime], l), Qi(() => {
			s = !1, clearTimeout(o), document.removeEventListener("visibilitychange", l);
		});
		let u = Nx(() => e.locale), d = /* @__PURE__ */ F(null), f = /* @__PURE__ */ F(null), p = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), g = Y((t) => {
			try {
				let n = Bx(e.items, e.columns, {
					key: e.itemKey,
					label: e.itemLabel,
					column: e.itemColumn,
					start: e.itemStart,
					end: e.itemEnd
				}, e.startMinute, e.endMinute, e.bands);
				return Vx(t, n) ? t : n;
			} catch {
				return null;
			}
		}), _ = (e) => {
			(e === void 0 ? p.values().next().value || d.value || f.value : p.get(e) || d.value || f.value)?.focus();
		}, v = lS, y = Y(() => {
			let e = g.value;
			return new Map(e?.columns.map((t) => [t.key, Hx(e.entries, t.key, e.startMinute, e.endMinute)]) || []);
		}), b = cS(e, () => g.value, {
			host: f,
			scroll: d,
			nodes: p,
			columns: m,
			focus: _,
			locale: u,
			time: v,
			keysId: e.id + "-keys"
		}, {
			start: (e) => r("start", e),
			preview: (e) => r("preview", e),
			commit: (e) => r("commit", e),
			cancel: (e) => r("cancel", e)
		}), x = () => e.allowCreate && !e.readonly && !e.disabled && !e.loading && b.valid.value && !!g.value;
		function S(t, n, i) {
			let a = g.value;
			if (!x() || !a?.columns.some((e) => e.key === t)) return;
			let o = Math.max(a.startMinute, Math.min(a.endMinute - e.snapMinutes, a.startMinute + Math.round((n - a.startMinute) / e.snapMinutes) * e.snapMinutes));
			b.cancel(), r("create", Object.freeze({
				columnKey: t,
				startMinute: o,
				endMinute: Math.min(a.endMinute, o + e.snapMinutes),
				input: i
			}));
		}
		function C(t, n, i) {
			(t === "edit" ? e.allowEdit : e.allowRemove) && g.value?.entries.some((e) => e.key === n) && !b.scope(n).disabled && !e.readonly && (b.cancel(), O.expanded.value && E.value === n && w?.isConnected && w.focus(), r(t, Object.freeze({
				key: n,
				input: i
			})));
		}
		let w = null, T = "button", E = /* @__PURE__ */ F(), D = Y(() => [
			...e.allowDuplicate ? [{
				id: "duplicate",
				label: u.value.timeGridDuplicate || "Duplicate",
				disabled: E.value === void 0 || b.scope(E.value).disabled
			}] : [],
			...e.allowEdit ? [{
				id: "edit",
				label: u.value.timeGridEdit || u.value.done,
				disabled: E.value === void 0 || b.scope(E.value).disabled
			}] : [],
			...e.allowRemove ? [{
				id: "remove",
				label: u.value.timeGridRemove || u.value.remove(""),
				danger: !0,
				disabled: E.value === void 0 || b.scope(E.value).disabled
			}] : []
		]), O = SS({
			get id() {
				return e.id + "-actions";
			},
			get label() {
				return u.value.moreActions;
			},
			get items() {
				return D.value;
			},
			get disabled() {
				return e.disabled || e.loading;
			},
			get readonly() {
				return e.readonly;
			},
			open: void 0
		}, (t, n) => {
			t === "select" && E.value !== void 0 && (n === "duplicate" && e.allowDuplicate ? b.begin(E.value, "duplicate", T) : (n === "edit" || n === "remove") && C(n, E.value, T));
		}, f);
		function k(t, n, r = !1) {
			e.readonly || b.scope(n).disabled || !D.value.length || (t.preventDefault(), t.stopPropagation(), b.cancel(), w = t.currentTarget, E.value = n, T = t.type === "keydown" || t.detail === 0 ? "keyboard" : "button", O.open(t.currentTarget, r && t instanceof MouseEvent ? {
				x: t.clientX,
				y: t.clientY
			} : void 0));
		}
		function A(t, n = !1) {
			return !e.readonly && (e.allowEdit || e.allowRemove || e.allowDuplicate) ? X("button", {
				type: "button",
				class: "sol-button subtle sol-ui-time-grid-menu-trigger",
				disabled: b.scope(t.key).disabled,
				"aria-label": u.value.moreActions + " · " + t.label,
				"aria-haspopup": "menu",
				"aria-expanded": String(O.expanded.value && E.value === t.key),
				"aria-controls": O.expanded.value && E.value === t.key ? e.id + "-actions-menu" : void 0,
				...n ? b.controlProps(t.key, "move") : {},
				onClick: (e) => {
					b.consumeClick(e, t.key) || k(e, t.key);
				}
			}, Yx(Ah.more, 20, 90)) : null;
		}
		return V(g, () => {
			E.value !== void 0 && !g.value?.entries.some((e) => e.key === E.value) && O.close("programmatic", !1);
		}), i({
			focus: _,
			cancel: () => {
				b.cancel();
			}
		}), V(g, async () => {
			if (typeof document > "u") return;
			let e = document.activeElement, t = [...h], n = t.findIndex(([, t]) => !!e && t.contains(e)), r = t[n]?.[0] ?? [...p].find(([, t]) => !!e && t.contains(e))?.[0];
			if (r === void 0 || !e) return;
			let i = [...t.slice(n + 1), ...t.slice(0, n).reverse()].map(([e]) => e);
			if (await z(), !e.isConnected && document.activeElement === document.body) {
				let e = i.map((e) => h.get(e)).find(Boolean);
				n >= 0 && e ? (e.querySelector("button:not(:disabled)") || e).focus() : _(r);
			}
		}), () => {
			let r = g.value, i = e.error || (!r || !b.valid.value ? u.value.timeGridInvalid || u.value.invalidTime : "");
			if (!r) return X("section", {
				...ks(t, b.events),
				class: ["sol-ui-time-grid", t.class],
				ref: f,
				tabindex: t.tabindex ?? -1,
				id: e.id,
				"aria-labelledby": e.id + "-label"
			}, [X("h3", { id: e.id + "-label" }, e.label), X("p", {
				class: "sol-ui-error",
				role: "alert"
			}, i)]);
			let a = r.endMinute - r.startMinute, o = Ux(r.startMinute, r.endMinute), s = (e) => (e - r.startMinute) / a * 100 + "%", l = (e, t) => (t - e) / a * 100 + "%", _ = `calc(var(--sol-control-height) * 1.5) repeat(${r.columns.length},minmax(calc(var(--sol-control-height) * 4),1fr))`, w = `calc(var(--sol-control-height) * ${a / 30})`, T = `calc(var(--sol-control-height) * ${1.5 + 4 * r.columns.length})`;
			return X("section", {
				...ks(t, b.events),
				class: ["sol-ui-time-grid", t.class],
				ref: f,
				tabindex: t.tabindex ?? -1,
				id: e.id,
				"aria-labelledby": e.id + "-label",
				"aria-busy": e.loading ? "true" : void 0
			}, [
				X("div", { class: "sol-ui-time-grid-top" }, [X("h3", { id: e.id + "-label" }, e.label), e.allowCreate ? X("button", {
					type: "button",
					class: "sol-button",
					disabled: !x() || !r.columns.length,
					style: { visibility: e.readonly ? "hidden" : void 0 },
					onClick: () => r.columns[0] && S(r.columns[0].key, r.startMinute, "button")
				}, u.value.timeGridAdd) : null]),
				e.help || n.help ? X("div", {
					class: "sol-ui-hint",
					id: e.id + "-help"
				}, n.help?.() || e.help) : null,
				i ? X("p", {
					class: "sol-ui-error",
					role: "alert"
				}, i) : null,
				r.columns.length ? X("div", {
					ref: d,
					class: "sol-ui-time-grid-scroll",
					tabindex: 0,
					role: "region",
					"aria-label": u.value.timeGridScroll || e.label,
					"aria-describedby": e.help || n.help ? e.id + "-help" : void 0
				}, [X("div", {
					class: "sol-ui-time-grid-head",
					style: {
						gridTemplateColumns: _,
						minWidth: T
					}
				}, [X("span", { "aria-hidden": "true" }), ...r.columns.map((t, n) => X("div", {
					key: t.key,
					id: e.id + "-column-" + n,
					class: "sol-ui-time-grid-heading"
				}, [X("strong", t.label), t.date ? X("time", { datetime: t.date }, Lx(t.date, u.value)) : null]))]), X("div", {
					class: "sol-ui-time-grid-body",
					style: {
						gridTemplateColumns: _,
						minWidth: T
					}
				}, [X("div", {
					class: "sol-ui-time-grid-axis",
					style: { height: w },
					"aria-hidden": "true"
				}, o.map((e) => X("span", {
					key: e,
					style: { top: s(e) }
				}, v(e)))), ...r.columns.map((t, i) => X("div", {
					key: t.key,
					ref: (e) => {
						e ? m.set(t.key, e) : m.delete(t.key);
					},
					role: "group",
					"aria-labelledby": e.id + "-column-" + i,
					class: "sol-ui-time-grid-column",
					style: { height: w },
					tabindex: x() ? 0 : void 0,
					"aria-describedby": x() ? e.id + "-keys" : void 0,
					onClick: (e) => {
						if (b.consumeClick(e) || !x() || e.target.closest(".sol-ui-time-grid-item,button,a,input,textarea,select,[contenteditable]")) return;
						let n = e.currentTarget.getBoundingClientRect();
						S(t.key, r.startMinute + (e.clientY - n.top) / n.height * a, "pointer");
					},
					onKeydown: (e) => {
						e.target === e.currentTarget && !e.isComposing && ["Enter", "Insert"].includes(e.key) && x() && (e.preventDefault(), e.stopPropagation(), S(t.key, r.startMinute, "keyboard"));
					}
				}, [
					e.showCurrentTime && c.value && wh(c.value.date) && Number.isInteger(c.value.minute) && c.value.minute >= r.startMinute && c.value.minute < r.endMinute && (!t.date || t.date === c.value.date) ? X("div", {
						class: "sol-ui-time-grid-now",
						role: "img",
						"aria-label": u.value.timeGridCurrent + " " + v(c.value.minute),
						style: { top: s(c.value.minute) }
					}, X("span", v(c.value.minute))) : null,
					...o.map((e) => X("div", {
						key: "line-" + e,
						class: "sol-ui-time-grid-line",
						style: { top: s(e) },
						"aria-hidden": "true"
					})),
					...r.bands.filter((e) => (e.columnKey === void 0 || e.columnKey === t.key) && e.startMinute < r.endMinute && e.endMinute > r.startMinute).map((e) => X("div", {
						key: "band-" + e.id,
						class: "sol-ui-time-grid-band",
						role: "note",
						"aria-label": e.label + " " + v(e.startMinute) + "–" + v(e.endMinute),
						style: {
							top: s(Math.max(e.startMinute, r.startMinute)),
							height: l(Math.max(e.startMinute, r.startMinute), Math.min(e.endMinute, r.endMinute)),
							background: e.category ? `var(--sol-color-categorical-${e.category.slice(1)}-background)` : void 0,
							color: e.category ? `var(--sol-color-categorical-${e.category.slice(1)}-foreground)` : void 0,
							borderColor: e.category ? `var(--sol-color-categorical-${e.category.slice(1)}-border)` : void 0
						}
					}, n.band?.({
						band: e,
						column: t
					}) || e.label)),
					...(y.value.get(t.key) || []).map((r) => {
						let i = {
							item: r.item,
							key: r.key,
							column: t,
							startMinute: r.startMinute,
							endMinute: r.endMinute,
							clipped: r.visibleStart !== r.startMinute || r.visibleEnd !== r.endMinute,
							...b.scope(r.key)
						};
						return X("article", {
							key: "item:" + typeof r.key + ":" + String(r.key),
							ref: (e) => {
								e ? p.set(r.key, e) : p.delete(r.key);
							},
							tabindex: 0,
							class: ["sol-ui-time-grid-item", e.readonly ? void 0 : "sol-ui-time-grid-item--editable"],
							"data-active": String(b.state.value?.key === r.key),
							"aria-busy": b.pending(r.key) ? "true" : void 0,
							"aria-describedby": e.readonly ? void 0 : e.id + "-keys",
							...b.pointerProps(r),
							onContextmenu: (e) => k(e, r.key, !0),
							onKeydown: (t) => {
								t.key === "ContextMenu" || t.key === "F10" && t.shiftKey ? k(t, r.key) : t.target === t.currentTarget && !t.isComposing && t.key === "Delete" && e.allowRemove && !e.readonly && (t.preventDefault(), t.stopPropagation(), C("remove", r.key, "keyboard"));
							},
							"aria-label": r.label + " · " + t.label + " · " + v(r.startMinute) + "–" + v(r.endMinute),
							style: {
								top: s(r.visibleStart),
								height: l(r.visibleStart, Math.max(r.visibleEnd, r.visibleStart + 30)),
								insetInlineStart: r.lane / r.lanes * 100 + "%",
								inlineSize: 100 / r.lanes + "%"
							}
						}, [
							...n.item?.(i) || [X("strong", { class: "sol-ui-time-grid-item-title" }, r.label), X("span", { class: "sol-ui-time-grid-item-time" }, v(r.startMinute) + "–" + v(r.endMinute))],
							A(r, !0),
							...b.handles(r, Math.max(30, r.visibleEnd - r.visibleStart))
						]);
					}),
					b.preview(t.key)
				]))])]) : null,
				e.readonly ? null : b.status(),
				b.state.value?.action === "duplicate" ? X("div", {
					class: "sol-actions sol-actions--commit sol-ui-time-grid-copy-actions",
					role: "group",
					"aria-label": u.value.timeGridDuplicate
				}, [
					X("span", { class: "sol-hint" }, u.value.timeGridPreview),
					X("button", {
						type: "button",
						class: "sol-button",
						onClick: b.cancel
					}, u.value.timeGridCancel),
					X("button", {
						type: "button",
						class: "sol-button primary",
						onClick: b.commit
					}, u.value.timeGridDuplicate)
				]) : null,
				e.readonly ? null : X("p", {
					class: "sol-ui-hint",
					id: e.id + "-keys"
				}, u.value.timeGridKeys),
				e.loading ? X("p", {
					class: "sol-ui-hint",
					role: "status"
				}, u.value.timeGridLoading || u.value.loading) : null,
				O.render(),
				r.entries.length ? X("details", {
					class: "sol-ui-time-grid-agenda",
					open: !e.readonly
				}, [X("summary", u.value.timeGridList || e.label), X("ul", r.entries.map((e) => {
					let t = r.columns.find((t) => t.key === e.columnKey);
					return X("li", {
						key: e.key,
						tabindex: -1,
						ref: (t) => {
							t instanceof HTMLElement ? h.set(e.key, t) : h.delete(e.key);
						}
					}, [
						X("strong", e.label),
						X("span", t.label + (t.date ? " · " + Lx(t.date, u.value) : "") + " · " + v(e.startMinute) + "–" + v(e.endMinute)),
						b.pending(e.key) ? X("span", { role: "status" }, u.value.timeGridPending || u.value.progressPending) : null,
						A(e)
					]);
				}))]) : null,
				r.entries.length ? null : X("div", { class: "sol-ui-hint" }, n.empty?.() || u.value.timeGridEmpty || u.value.noResults)
			]);
		};
	}
}), DS = /* @__PURE__ */ H({
	name: "SBtn",
	inheritAttrs: !1,
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
	emits: { click: (e) => !0 },
	setup(e, { attrs: t, slots: n, emit: r }) {
		return () => {
			let i = e.disabled || e.loading || t["aria-disabled"] === !0 || t["aria-disabled"] === "true";
			return X(D_, {
				...t,
				"data-tone": e.tone || t["data-tone"],
				class: [
					"sol-ui-button",
					"sol-ui-button--" + e.variant,
					e.tone ? "sol-tone" : void 0,
					t.class
				],
				type: e.type,
				disabled: e.disabled,
				loading: e.loading,
				tabindex: e.loading ? t.tabindex ?? 0 : t.tabindex,
				"aria-disabled": i ? "true" : t["aria-disabled"],
				"aria-busy": e.loading ? "true" : t["aria-busy"],
				ripple: !1,
				variant: "flat",
				onClick: (e) => {
					i ? e.preventDefault() : r("click", e);
				}
			}, {
				default: () => n.default?.(),
				loader: () => X("span", {
					class: "sol-ui-busy",
					"aria-hidden": "true"
				}, "◷")
			});
		};
	}
});
function OS(e) {
	return Number.isFinite(e) ? Math.min(2 ** 53 - 1, Math.max(0, Math.trunc(e))) : 0;
}
function kS(e, t) {
	return t ? Math.max(1, Math.min(t, Number.isFinite(e) ? Math.trunc(e) : 1)) : 0;
}
function AS(e, t, n = 1) {
	if (t = OS(t), e = kS(e, t), !t) return [];
	let r = Number.isFinite(n) ? Math.max(0, Math.min(5, Math.trunc(n))) : 1, i = /* @__PURE__ */ new Set([1, t]);
	for (let n = Math.max(1, e - r); n <= Math.min(t, e + r); n++) i.add(n);
	return [...i].sort((e, t) => e - t);
}
var jS = /* @__PURE__ */ H({
	name: "SPagination",
	inheritAttrs: !1,
	props: {
		modelValue: {
			type: Number,
			default: 1
		},
		pageCount: {
			type: Number,
			default: 1
		},
		siblingCount: {
			type: Number,
			default: 1
		},
		compactPagination: Boolean,
		label: String,
		disabled: Boolean,
		loading: Boolean,
		locale: Object
	},
	emits: { "update:modelValue": (e) => !0 },
	setup(e, { attrs: t, emit: n, expose: r }) {
		let i = Nx(() => e.locale), a = /* @__PURE__ */ F(null), { isRtl: o } = th(), s = () => a.value?.querySelector("button[aria-current=\"page\"]:not(:disabled),button:not(:disabled)")?.focus();
		r({ focus: s });
		async function c(t, r) {
			let i = OS(e.pageCount), a = kS(e.modelValue, i), o = kS(t, i);
			if (e.disabled || e.loading || !i || o === a) return;
			let c = r.currentTarget;
			n("update:modelValue", o), await z(), !c.isConnected && document.activeElement === document.body && s();
		}
		return () => {
			let n = OS(e.pageCount), r = kS(e.modelValue, n), s = AS(r, n, e.siblingCount), l = e.disabled || e.loading || !n, u = (e) => {
				let t = e === "first" || e === "previous", a = e === "first" ? 1 : e === "last" ? n : r + (t ? -1 : 1);
				return X(DS, {
					key: e,
					class: "sol-ui-pagination-edge",
					"data-edge": e,
					"aria-label": e === "first" ? i.value.firstPage || i.value.pageLabel(1, n) : e === "last" ? i.value.lastPage || i.value.pageLabel(n, n) : t ? i.value.previousPage : i.value.nextPage,
					disabled: l || (t ? r <= 1 : r >= n),
					onClick: (e) => void c(a, e)
				}, () => X(Xx, {
					name: e === "first" || e === "last" ? "chevrons" : "chevron",
					size: 16,
					rotate: t === o.value ? 270 : 90,
					decorative: !0
				}));
			};
			return X("div", {
				...t,
				ref: a,
				class: ["sol-ui-pagination", t.class],
				"aria-busy": e.loading ? "true" : void 0
			}, [X("nav", {
				class: "sol-pagination",
				"data-compact": e.compactPagination ? "true" : void 0,
				"aria-label": e.label || t["aria-label"] || i.value.pages(i.value.record)
			}, [
				u("first"),
				u("previous"),
				...s.flatMap((e, t) => [t && e - s[t - 1] > 1 ? X("span", {
					key: "gap-" + e,
					class: "sol-ui-pagination-gap",
					"aria-hidden": "true"
				}, "…") : null, X(DS, {
					key: e,
					class: "sol-ui-pagination-number",
					"aria-label": i.value.pageLabel(e, n),
					"aria-current": e === r ? "page" : void 0,
					disabled: l,
					onClick: (t) => void c(e, t)
				}, () => Fx(e, i.value))]),
				u("next"),
				u("last")
			]), X("p", {
				class: "sol-ui-hint",
				role: "status"
			}, n ? i.value.pageLabel(r, n) : i.value.paginationEmpty || i.value.noResults)]);
		};
	}
});
function MS(e, t, n, r = !1, i = !1, a = {}) {
	let o = /* @__PURE__ */ F({
		left: "16px",
		top: "16px"
	}), s = 0, c = !1, l;
	function u() {
		if (c || !e.value || !t.value || !n.value) return;
		let s = a.visualViewport ? window.visualViewport : void 0, l = s?.offsetLeft || 0, u = s?.offsetTop || 0, d = s?.width || document.documentElement.clientWidth || window.innerWidth, f = s?.height || window.innerHeight, p = t.value.getBoundingClientRect(), m = n.value.getBoundingClientRect(), h = a.margin?.() ?? 16, g = Math.min(r ? Math.max(160, p.width) : m.width, Math.max(0, d - h * 2));
		if (i) {
			let e = a.gap?.() ?? (parseFloat(getComputedStyle(n.value).getPropertyValue("--sol-space-2")) || 0), i = Math.max(0, u + f - p.bottom - e - h), s = Math.max(0, p.top - e - u - h), c = a.placement?.().startsWith("top") ? s >= m.height || s > i : i < m.height && s > i, _ = getComputedStyle(t.value).direction === "rtl", v = a.placement?.().endsWith("end") || !1;
			o.value = {
				left: Math.max(l + h, Math.min(_ === v ? p.left : p.right - g, l + d - g - h)) + "px",
				...c ? {
					bottom: Math.max(h, window.innerHeight - p.top + e, window.innerHeight - u - f + h) + "px",
					top: "auto"
				} : {
					top: Math.max(u + h, p.bottom + e) + "px",
					bottom: "auto"
				},
				maxWidth: Math.max(0, d - h * 2) + "px",
				maxHeight: Math.min(f - h * 2, c ? s : i) + "px",
				...r ? { width: g + "px" } : {}
			};
			return;
		}
		let _ = p.bottom + 8, v = _ + m.height <= f - 16 ? _ : Math.max(16, p.top - m.height - 8);
		o.value = {
			left: Math.max(16, Math.min(p.left, d - g - 16)) + "px",
			top: v + "px",
			maxWidth: Math.max(0, d - 32) + "px",
			maxHeight: Math.max(48, f - v - 16) + "px",
			...r ? { width: g + "px" } : {}
		};
	}
	return V(e, async (t) => {
		let r = ++s;
		if (!t) {
			if (a.manageNative !== !1) try {
				n.value?.hidePopover?.();
			} catch {}
		} else if (await z(), !c && r === s && e.value && n.value?.isConnected) {
			if (a.manageNative !== !1) try {
				n.value.showPopover?.();
			} catch {}
			u();
		}
	}, { immediate: !0 }), Yi(() => {
		window.addEventListener("resize", u), window.addEventListener("scroll", u, !0), a.visualViewport && (window.visualViewport?.addEventListener("resize", u), window.visualViewport?.addEventListener("scroll", u)), typeof ResizeObserver < "u" && (l = new ResizeObserver(u), n.value && l.observe(n.value), t.value && l.observe(t.value));
	}), V([n, t], ([t, n], [r, i]) => {
		l && (r && l.unobserve(r), i && l.unobserve(i), t && l.observe(t), n && l.observe(n)), e.value && z(u);
	}), Qi(() => {
		if (c = !0, s++, l?.disconnect(), window.removeEventListener("resize", u), window.removeEventListener("scroll", u, !0), window.visualViewport?.removeEventListener("resize", u), window.visualViewport?.removeEventListener("scroll", u), a.manageNative !== !1) try {
			n.value?.hidePopover?.();
		} catch {}
	}), {
		position: o,
		locate: u
	};
}
function NS() {
	let e = /* @__PURE__ */ F(null), t = () => {
		let t = window.visualViewport;
		e.value = {
			top: t?.offsetTop || 0,
			left: t?.offsetLeft || 0,
			width: t?.width || window.innerWidth,
			height: t?.height || window.innerHeight
		};
	};
	return Yi(() => {
		t(), window.addEventListener("resize", t), window.visualViewport?.addEventListener("resize", t), window.visualViewport?.addEventListener("scroll", t);
	}), Qi(() => {
		window.removeEventListener("resize", t), window.visualViewport?.removeEventListener("resize", t), window.visualViewport?.removeEventListener("scroll", t);
	}), e;
}
var PS = {
	"bottom-start": "bottom start",
	"bottom-end": "bottom end",
	"top-start": "top start",
	"top-end": "top end"
}, FS = /* @__PURE__ */ H({
	name: "SolInternalPickerHost",
	inheritAttrs: !1,
	props: {
		open: Boolean,
		id: {
			type: String,
			required: !0
		},
		labelledby: {
			type: String,
			required: !0
		},
		describedby: String,
		anchor: Object,
		returnFocus: Object,
		presentation: {
			type: String,
			default: "auto"
		},
		placement: {
			type: String,
			default: "bottom-start"
		},
		width: {
			type: String,
			default: "max-content"
		},
		panelClass: String,
		initialFocus: Function,
		focusOnOpen: {
			type: Boolean,
			default: !0
		},
		dismissible: {
			type: Boolean,
			default: !0
		}
	},
	emits: {
		requestClose: (e) => !0,
		ready: (e) => !0
	},
	setup(e, { slots: t, emit: n, expose: r }) {
		let i = /* @__PURE__ */ F(null), a = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(!0), l = /* @__PURE__ */ F(0), u = /* @__PURE__ */ F(), d = NS(), f = Y(() => e.anchor?.closest("dialog") ?? null), p = Y(() => f.value && !c.value ? "dialog" : e.presentation === "auto" ? a.value ? "dialog" : "popover" : e.presentation), m = Y(() => !!f.value && e.open && p.value === "popover"), h = Y(() => e.anchor ?? null), g = Y(() => f.value ? !0 : p.value === "popover" && e.anchor?.closest(".v-overlay__content") || !1), { position: _, locate: v } = MS(m, h, s, !1, !0, {
			manageNative: !1,
			placement: () => e.placement,
			gap: () => l.value,
			margin: () => u.value,
			visualViewport: !0
		}), y, b = !1, x = 0, S = 0, C = !0, w = !1, T = !1, E = () => i.value?.contentEl ?? null, D = () => !!i.value?.globalTop && !!i.value?.localTop, O = (t) => t instanceof Node && (!!E()?.contains(t) || t === e.anchor || !!e.anchor?.contains(t));
		function k() {
			let t = e.returnFocus || e.anchor;
			t?.isConnected && !t.matches(":disabled,[aria-disabled=\"true\"]") && t.focus({ preventScroll: !0 });
		}
		function A(t) {
			!b && e.open && e.dismissible && !w && D() && (w = !0, C = t !== "outside", n("requestClose", t), z(() => {
				w = !1;
			}));
		}
		function j(t) {
			!t.isComposing && t.key === "Escape" && e.open && D() && (t.preventDefault(), t.stopImmediatePropagation(), A("escape"));
		}
		function ee(t) {
			!T && e.open && p.value === "popover" && !O(t.target) && A("outside");
		}
		function M() {
			let t = E(), n = document.activeElement;
			if (!e.open || !D() || !t || !(n instanceof HTMLElement) || n === t || !t.contains(n)) return;
			let r = t.getBoundingClientRect(), i = n.getBoundingClientRect(), a = parseFloat(getComputedStyle(t).paddingBlockStart) || 0;
			i.top < r.top + a ? t.scrollTop += i.top - r.top - a : i.bottom > r.bottom - a && (t.scrollTop += i.bottom - r.bottom + a);
		}
		function te(t) {
			T || p.value !== "popover" || t.relatedTarget && O(t.relatedTarget) || z(() => {
				!T && e.open && p.value === "popover" && !O(document.activeElement) && A("outside");
			});
		}
		let ne = () => {
			!T && p.value === "popover" && A("outside");
		};
		function re() {
			let e = o.value;
			if (e) {
				try {
					e.matches(":popover-open") && e.hidePopover();
				} catch {}
				e.open && e.close();
			}
		}
		function ie() {
			let e = o.value;
			if (!f.value || !e) return;
			let t = p.value === "popover";
			(t ? e.matches(":popover-open") : e.open) || (re(), t ? e.showPopover() : e.showModal());
		}
		async function ae(t, r) {
			let a = ++x;
			if (cancelAnimationFrame(S), await z(), b || !e.open || a !== x) return;
			T = !0, ie(), s.value = E();
			let o = 0, c = () => {
				if (b || !e.open || a !== x) return;
				let s = E();
				if (!s?.isConnected || !s.getClientRects().length || getComputedStyle(s).visibility === "hidden") {
					++o < 10 && (S = requestAnimationFrame(c));
					return;
				}
				let d = getComputedStyle(s);
				l.value = parseFloat(d.paddingBlockStart) || 0, u.value = parseFloat(d.scrollMarginBlockStart) || void 0, z(async () => {
					!b && e.open && a === x && (m.value ? v() : i.value?.updateLocation?.(new Event("resize")), await z(), !b && e.open && a === x && M());
				});
				let f = document.activeElement, h = !t && r instanceof HTMLElement && r.isConnected && s.contains(r);
				if ((!t || e.focusOnOpen || p.value === "dialog") && (h || t || !s.contains(f)) && (f === r || f === document.body || O(f))) {
					let t = h ? r : e.initialFocus?.();
					(t?.isConnected && s.contains(t) ? t : s).focus({ preventScroll: !0 });
				}
				n("ready", p.value), T = !1;
			};
			S = requestAnimationFrame(c);
		}
		V(() => e.open, (e, t) => {
			if (e) C = !0, w = !1, ae(!0, document.activeElement);
			else if (t) {
				x++, cancelAnimationFrame(S);
				let e = document.activeElement, t = !!E()?.contains(e);
				T = !0, re();
				let n = f.value ? document.activeElement : null;
				s.value = null, z(() => {
					!b && C && t && (document.activeElement === e || document.activeElement === document.body || document.activeElement === n) && k(), T = !1;
				});
			}
		}), V(p, () => {
			e.open && ae(!1, document.activeElement);
		});
		let oe = () => {
			a.value = !!y?.matches;
		};
		V(d, () => void z(M)), Yi(() => {
			y = window.matchMedia("(max-width: 680px)"), c.value = typeof HTMLElement.prototype.showPopover == "function", oe(), y.addEventListener("change", oe), window.addEventListener("keydown", j, !0), document.addEventListener("focusin", ee), window.addEventListener("blur", ne), e.open && ae(!0, document.activeElement);
		}), Qi(() => {
			b = !0, x++, cancelAnimationFrame(S), y?.removeEventListener("change", oe), window.removeEventListener("keydown", j, !0), document.removeEventListener("focusin", ee), window.removeEventListener("blur", ne);
			let t = document.activeElement, n = e.open && !!E()?.contains(t);
			re(), n && z(() => {
				(document.activeElement === t || document.activeElement === document.body) && k();
			});
		}), r({ content: E });
		let se = () => X(eb, {
			ref: i,
			modelValue: e.open,
			"onUpdate:modelValue": (e) => {
				e || A("outside");
			},
			activator: e.returnFocus || e.anchor || void 0,
			target: e.anchor || void 0,
			attach: g.value,
			openOnClick: !1,
			openOnFocus: !1,
			openOnHover: !1,
			closeOnContentClick: !1,
			closeOnBack: !1,
			persistent: !0,
			noClickAnimation: !0,
			transition: !1,
			scrim: p.value === "dialog",
			captureFocus: p.value === "dialog",
			retainFocus: p.value === "dialog",
			scrollStrategy: p.value === "dialog" ? "block" : "reposition",
			locationStrategy: p.value === "dialog" || m.value ? "static" : "connected",
			location: p.value === "dialog" ? "center center" : PS[e.placement],
			offset: l.value,
			viewportMargin: u.value,
			width: e.width,
			maxWidth: `calc(${d.value ? d.value.width + "px" : "100vw"} - 2 * var(--sol-space-4))`,
			maxHeight: `calc(${d.value ? d.value.height + "px" : "100dvh"} - 2 * var(--sol-space-4))`,
			class: "sol-ui-overlay sol-ui-picker-host",
			style: p.value === "dialog" && d.value ? {
				top: d.value.top + "px",
				left: d.value.left + "px",
				width: d.value.width + "px",
				height: d.value.height + "px",
				right: "auto",
				bottom: "auto"
			} : void 0,
			contentClass: ["sol-ui-picker-host-panel", e.panelClass],
			contentProps: {
				id: e.id,
				role: f.value ? void 0 : "dialog",
				tabindex: -1,
				"aria-labelledby": f.value ? void 0 : e.labelledby,
				"aria-describedby": f.value ? void 0 : e.describedby,
				"aria-modal": f.value ? void 0 : String(p.value === "dialog"),
				"data-picker-presentation": p.value,
				style: m.value ? {
					..._.value,
					position: "fixed"
				} : void 0,
				onFocusout: te,
				onFocusin: () => void z(M)
			},
			"onClick:outside": () => A("outside")
		}, () => t.default?.());
		return () => f.value ? X(zr, { to: f.value }, [X("dialog", {
			ref: o,
			popover: "manual",
			role: "dialog",
			"aria-labelledby": e.labelledby,
			"aria-describedby": e.describedby,
			"aria-modal": String(p.value === "dialog"),
			class: "sol-ui-picker-native-host",
			onCancel: (e) => e.preventDefault()
		}, se())]) : se();
	}
});
function IS({ modelValue: e = 0, min: t = 0, max: n = 100, state: r = "determinate" } = {}) {
	let i = Number.isFinite(t) && Number.isFinite(n) && n > t && [
		"determinate",
		"indeterminate",
		"complete",
		"error"
	].includes(r) && (r === "indeterminate" || r === "complete" || Number.isFinite(e)), a = i && r !== "indeterminate", o = a ? r === "complete" ? n : Math.max(t, Math.min(n, e)) : void 0;
	return {
		valid: i,
		known: a,
		value: o,
		min: i ? t : 0,
		max: i ? n : 100,
		ratio: a ? (o - t) / (n - t) : void 0,
		state: r
	};
}
var LS = {
	id: {
		type: String,
		required: !0
	},
	label: {
		type: String,
		required: !0
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
		default: !0
	},
	showLabel: {
		type: Boolean,
		default: !0
	},
	showValue: {
		type: Boolean,
		default: !0
	},
	showMessage: {
		type: Boolean,
		default: !0
	},
	announce: {
		type: Boolean,
		default: !1
	},
	locale: Object,
	size: {
		type: Number,
		default: 96
	}
};
function RS(e, t) {
	return /* @__PURE__ */ H({
		name: e,
		inheritAttrs: !1,
		props: LS,
		setup(e, { attrs: n, slots: r }) {
			let i = Nx(() => e.locale);
			return () => {
				let a = IS(e), o = a.known ? Fx(a.ratio, i.value, {
					style: "percent",
					maximumSignificantDigits: 3
				}) : "", s = e.message || (a.valid ? e.state === "indeterminate" ? i.value.progressUnknown : e.state === "complete" ? i.value.progressComplete + " · " + o : e.state === "error" ? i.value.progressError(o) : i.value.progressRunning(o) : i.value.progressInvalid), c = e.message || (a.valid ? e.state === "indeterminate" ? i.value.progressUnknown : e.showValue ? s : e.state === "complete" ? i.value.progressComplete : e.state === "error" ? i.value.progressFailed : i.value.progressPending : i.value.progressInvalid), l = Number.isFinite(e.size) ? Math.max(48, Math.min(256, e.size)) : 96, u = {
					...n,
					id: e.id,
					role: "progressbar",
					"aria-labelledby": e.id + "-label",
					"aria-describedby": [e.id + "-status", n["aria-describedby"]].filter(Boolean).join(" "),
					"aria-valuemin": a.min,
					"aria-valuemax": a.max,
					"aria-valuenow": a.value,
					"aria-valuetext": s
				};
				return X("div", {
					class: "sol-ui-progress sol-progress-demo",
					"data-state": e.state,
					"data-shape": t ? "circular" : "linear",
					"data-animation": e.animated && a.valid && e.state === "indeterminate" ? "on" : "off"
				}, [
					X("span", {
						id: e.id + "-label",
						class: e.showLabel ? "sol-label" : "sol-ui-sr-only"
					}, r.label?.() || e.label),
					t ? X("div", {
						...u,
						class: ["sol-progress-circle sol-ui-progress-circle", n.class],
						style: [{ width: l + "px" }, n.style]
					}, [X("svg", {
						viewBox: "0 0 100 100",
						"aria-hidden": "true",
						focusable: "false"
					}, [X("circle", {
						class: "sol-progress-track",
						cx: 50,
						cy: 50,
						r: 40
					}), X("circle", {
						class: "sol-progress-arc",
						cx: 50,
						cy: 50,
						r: 40,
						pathLength: 100,
						style: {
							strokeDasharray: a.known ? "100" : "24 76",
							strokeDashoffset: a.known ? String(100 - a.ratio * 100) : "0",
							visibility: a.known && a.ratio === 0 ? "hidden" : void 0
						}
					})]), e.showValue ? X("span", {
						class: "sol-progress-circle-text",
						"aria-hidden": "true"
					}, a.valid ? e.state === "error" ? "! " + o : e.state === "complete" ? "✓ " + o : a.known ? o : i.value.progressPending : "!") : null]) : X("div", {
						...u,
						class: ["sol-progress sol-ui-progress-linear", n.class],
						style: n.style
					}, X("span", {
						"aria-hidden": "true",
						class: "sol-ui-progress-fill",
						style: { width: a.known ? String(a.ratio * 100) + "%" : "35%" }
					})),
					!t && e.showValue && !e.showMessage ? X("span", {
						class: "sol-ui-progress-value",
						"aria-hidden": "true"
					}, o) : null,
					X("p", {
						id: e.id + "-status",
						class: e.showMessage ? "sol-ui-progress-status" : "sol-ui-sr-only",
						role: e.announce ? "status" : void 0,
						"aria-live": e.announce ? "polite" : void 0,
						"aria-atomic": e.announce ? "true" : void 0
					}, e.showMessage ? c : s)
				]);
			};
		}
	});
}
var zS = RS("SProgressLinear", !1), BS = RS("SProgressCircular", !0), VS = /* @__PURE__ */ H({
	name: "SLoadingOverlay",
	inheritAttrs: !1,
	props: {
		modelValue: Boolean,
		title: {
			type: String,
			required: !0
		},
		description: String,
		scope: {
			type: String,
			default: "container"
		},
		blocking: {
			type: Boolean,
			default: !0
		},
		kind: {
			type: String,
			default: "circular"
		},
		delay: {
			type: Number,
			default: 150
		},
		minVisibleMs: {
			type: Number,
			default: 200
		},
		hideContent: Boolean
	},
	slots: Object,
	emits: { visibleChange: (e) => !0 },
	setup(e, { attrs: t, slots: n, emit: r }) {
		let i = /* @__PURE__ */ F(!1), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = NS(), l = "sol-loading-" + ri(), u, d = 0, f = !1, p = 0, m = null, h = !1, g = (e, t) => Number.isFinite(e) && e >= 0 ? Math.min(e, 2147483647) : t;
		function _() {
			u !== void 0 && clearTimeout(u), u = void 0;
		}
		function v() {
			let e = s.value;
			e?.isConnected && m && typeof document < "u" && (document.activeElement === m || m.contains(document.activeElement) || h && !m.isConnected && document.activeElement === document.body) && e.focus({ preventScroll: !0 }), m = null, h = !1;
		}
		function y(e) {
			f || i.value === e || (e ? (d = Date.now(), s.value = typeof document < "u" && document.activeElement instanceof HTMLElement ? document.activeElement : null) : h = !!m && typeof document < "u" && (document.activeElement === m || m.contains(document.activeElement)), i.value = e, r("visibleChange", e));
		}
		function b() {
			_();
			let t = ++p;
			if (typeof document < "u") {
				if (e.modelValue) {
					if (!i.value) {
						let n = g(e.delay, 150);
						n === 0 ? y(!0) : u = setTimeout(() => {
							t === p && e.modelValue && y(!0);
						}, n);
					}
				} else if (i.value) {
					let n = Math.max(0, g(e.minVisibleMs, 200) - (Date.now() - d));
					n === 0 ? y(!1) : u = setTimeout(() => {
						t === p && !e.modelValue && y(!1);
					}, n);
				}
			}
		}
		V(() => [
			e.modelValue,
			e.delay,
			e.minVisibleMs
		], b, { immediate: !0 }), V(() => [
			i.value,
			e.blocking,
			e.scope,
			e.hideContent
		], async () => {
			let t = e.scope === "container" || !e.blocking;
			if (!i.value || !(e.blocking || e.hideContent) || !t) {
				await z(), t && v();
				return;
			}
			let n = s.value;
			await z(), i.value && (e.blocking || e.hideContent) && (e.scope === "container" || !e.blocking) && n && a.value?.contains(n) && (m = o.value, m?.focus({ preventScroll: !0 }));
		}, { immediate: !0 }), Yi(b), Qi(() => {
			_(), p++, e.scope === "container" && v(), f = !0;
		});
		let x = (t) => {
			i.value && e.blocking && t.key === "Escape" && !t.isComposing && (t.preventDefault(), t.stopPropagation());
		}, S = () => X("div", {
			ref: o,
			class: "sol-ui-loading-panel",
			tabindex: -1,
			role: e.scope === "container" || !e.blocking ? "status" : void 0,
			"aria-live": "polite",
			"aria-atomic": "true",
			onKeydown: x
		}, [
			X(e.kind === "linear" ? zS : BS, {
				id: l + "-progress",
				label: e.title,
				state: "indeterminate",
				size: 48,
				showLabel: !1,
				showMessage: !1,
				showValue: !1
			}),
			X("strong", { id: l + "-title" }, e.title),
			e.description ? X("p", { id: l + "-description" }, e.description) : null
		]);
		return () => X("div", {
			...t,
			ref: a,
			class: ["sol-ui-loading", t.class],
			"aria-busy": String(e.modelValue)
		}, [X("div", {
			class: "sol-ui-loading-content",
			inert: i.value && (e.blocking || e.hideContent) || void 0,
			"aria-hidden": i.value && e.hideContent ? "true" : void 0,
			style: i.value && e.hideContent ? { visibility: "hidden" } : void 0
		}, [n.default?.()]), i.value ? e.scope === "container" ? X("div", {
			class: ["sol-ui-loading-container-layer", e.blocking ? void 0 : "sol-ui-loading-nonblocking"],
			onKeydown: x
		}, [S()]) : e.blocking ? X(FS, {
			open: !0,
			id: l + "-dialog",
			anchor: a.value,
			returnFocus: s.value,
			presentation: "dialog",
			labelledby: l + "-title",
			describedby: e.description ? l + "-description" : void 0,
			dismissible: !1,
			panelClass: "sol-ui-loading-host",
			initialFocus: () => o.value
		}, () => S()) : X(zr, { to: a.value?.closest(".v-overlay__content,dialog") || "body" }, [X("div", {
			class: "sol-ui-loading-nonblocking sol-ui-loading-viewport",
			style: c.value ? {
				top: c.value.top + "px",
				left: c.value.left + "px",
				width: c.value.width + "px",
				height: c.value.height + "px",
				right: "auto",
				bottom: "auto"
			} : void 0
		}, [S()])]) : null]);
	}
}), HS = /* @__PURE__ */ H({
	name: "SCard",
	inheritAttrs: !1,
	props: {
		id: String,
		title: String,
		description: String,
		eyebrow: String,
		headingLevel: {
			type: Number,
			default: 3
		}
	},
	slots: Object,
	setup(e, { attrs: t, slots: n }) {
		let r = ri();
		return () => {
			let i = (e.id || "sol-card-" + r) + "-title", a = !!(e.title || n.title);
			return X("article", {
				...t,
				id: e.id,
				class: ["sol-card sol-ui-card", t.class],
				"aria-labelledby": t["aria-labelledby"] || (a ? i : void 0)
			}, [
				a || e.eyebrow || e.description || n.leading || n.description || n.meta ? X("header", { class: "sol-ui-card-header" }, [
					n.leading ? X("div", { class: "sol-ui-card-leading" }, [n.leading()]) : null,
					X("div", { class: "sol-surface-heading" }, [
						e.eyebrow ? X("span", { class: "eyebrow" }, e.eyebrow) : null,
						a ? X("h" + e.headingLevel, { id: i }, [n.title?.() || e.title]) : null,
						n.description || e.description ? X("div", { class: "sol-ui-card-description" }, [n.description?.() || e.description]) : null
					]),
					n.meta ? X("div", { class: "sol-ui-card-meta" }, [n.meta()]) : null
				]) : null,
				n.default?.(),
				n.actions ? X("div", { class: "sol-ui-card-actions" }, [n.actions()]) : null
			]);
		};
	}
}), US = /* @__PURE__ */ H({
	name: "SEmptyState",
	inheritAttrs: !1,
	props: {
		id: String,
		title: {
			type: String,
			required: !0
		},
		description: String,
		icon: String,
		variant: {
			type: String,
			default: "card"
		},
		headingLevel: {
			type: Number,
			default: 3
		},
		minBlockSize: [String, Number]
	},
	slots: Object,
	setup(e, { attrs: t, slots: n }) {
		let r = ri();
		return () => {
			let i = (e.id || "sol-empty-" + r) + "-title", a = typeof e.minBlockSize == "number" ? Number.isFinite(e.minBlockSize) ? Math.max(0, e.minBlockSize) + "px" : void 0 : e.minBlockSize;
			return X("section", {
				...t,
				id: e.id,
				class: [
					"sol-ui-empty-state",
					e.variant === "card" ? "sol-card" : "sol-ui-empty-state--page",
					t.class
				],
				style: [{ minBlockSize: a }, t.style],
				"aria-labelledby": t["aria-labelledby"] || i
			}, [
				n.icon || e.icon ? X("div", { class: "sol-ui-empty-state-icon" }, [n.icon?.() || (e.icon ? X(Xx, {
					name: e.icon,
					size: 24,
					decorative: !0
				}) : null)]) : null,
				X("h" + e.headingLevel, { id: i }, e.title),
				n.description || e.description ? X("div", { class: "sol-ui-empty-state-description" }, [n.description?.() || e.description]) : null,
				n.actions ? X("div", { class: "sol-ui-empty-state-actions" }, [n.actions()]) : null
			]);
		};
	}
}), WS = /* @__PURE__ */ H({
	name: "SAlert",
	inheritAttrs: !1,
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
	setup(e, { attrs: t, slots: n }) {
		return () => X("div", {
			...t,
			class: ["sol-notice sol-tone sol-tone-notice sol-ui-alert", t.class],
			"data-tone": e.tone,
			role: e.live === "assertive" ? "alert" : e.live === "polite" ? "status" : t.role,
			"aria-live": e.live === "off" ? void 0 : e.live,
			"aria-atomic": e.live === "off" ? void 0 : "true"
		}, [
			e.title ? X("strong", e.title) : null,
			n.default?.(),
			n.actions ? X("div", { class: "sol-notice-actions" }, n.actions()) : null
		]);
	}
}), GS = /* @__PURE__ */ H({
	name: "STree",
	inheritAttrs: !1,
	props: {
		id: {
			type: String,
			required: !0
		},
		label: {
			type: String,
			required: !0
		},
		items: {
			type: Array,
			required: !0
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
		"update:modelValue": (e) => !0,
		"update:expanded": (e) => !0,
		select: (e) => !0
	},
	setup(e, { attrs: t, emit: n }) {
		let r = /* @__PURE__ */ F(null), i = /* @__PURE__ */ F(""), a = /* @__PURE__ */ new Map(), o = Y(() => {
			let t = [], n = /* @__PURE__ */ new Set(), r = (e, i, a) => {
				for (let o of e) o.id && !n.has(o.id) && (n.add(o.id), t.push({
					item: o,
					parent: i,
					level: a
				}), o.children && r(o.children, o.id, a + 1));
			};
			return r(e.items, null, 1), t;
		}), s = Y(() => new Map(o.value.map((e) => [e.item.id, e]))), c = Y(() => o.value.filter((t) => {
			let n = t.parent;
			for (; n;) {
				if (!e.expanded.includes(n)) return !1;
				n = s.value.get(n)?.parent || null;
			}
			return !0;
		})), l = async (t) => {
			!e.disabled && c.value.some((e) => e.item.id === t) && (i.value = t, await z(), a.get(t)?.focus());
		}, u = (t) => {
			let r = s.value.get(t)?.item;
			e.disabled || e.readonly || !r || r.disabled || (n("update:modelValue", t), n("select", t));
		}, d = (t, r) => {
			e.disabled || s.value.get(t)?.item.disabled || !s.value.get(t)?.item.children?.length || n("update:expanded", r ? [.../* @__PURE__ */ new Set([...e.expanded, t])] : e.expanded.filter((e) => e !== t));
		};
		V(c, async (e) => {
			if (e.some((e) => e.item.id === i.value)) return;
			let t = i.value;
			for (; t && !e.some((e) => e.item.id === t);) t = s.value.get(t)?.parent || "";
			let n = t || e[0]?.item.id || "", a = typeof document < "u" && !!r.value?.contains(document.activeElement);
			i.value = n, a && n && await l(n);
		}, { immediate: !0 });
		function f(t) {
			if (t.isComposing || e.disabled) return;
			let n = t.target.closest("[data-tree-id]");
			if (!n) return;
			let r = n.dataset.treeId, i = s.value.get(r), a = c.value, o = a.findIndex((e) => e.item.id === r);
			if (i) switch ([
				"ArrowDown",
				"ArrowUp",
				"ArrowLeft",
				"ArrowRight",
				"Home",
				"End",
				"Enter",
				" "
			].includes(t.key) && (t.preventDefault(), t.stopPropagation()), t.key) {
				case "ArrowDown":
					l(a[Math.min(o + 1, a.length - 1)].item.id);
					break;
				case "ArrowUp":
					l(a[Math.max(0, o - 1)].item.id);
					break;
				case "Home":
					a[0] && l(a[0].item.id);
					break;
				case "End":
					a.length && l(a.at(-1).item.id);
					break;
				case "ArrowRight":
					i.item.children?.length && (e.expanded.includes(r) ? a[o + 1]?.parent === r && l(a[o + 1].item.id) : d(r, !0));
					break;
				case "ArrowLeft":
					e.expanded.includes(r) ? d(r, !1) : i.parent && l(i.parent);
					break;
				case "Enter":
				case " ":
					u(r);
					break;
				default: if (t.key.length === 1 && !t.ctrlKey && !t.metaKey && !t.altKey) {
					let e = t.key.normalize("NFKC").toLocaleLowerCase(), n = [...a.slice(o + 1), ...a.slice(0, o + 1)].find((t) => t.item.label.normalize("NFKC").toLocaleLowerCase().startsWith(e));
					n && l(n.item.id);
				}
			}
		}
		function p(t, n = 1, r = /* @__PURE__ */ new Set()) {
			return t.filter((e) => s.value.get(e.id)?.level !== n || r.has(e.id) ? !1 : (r.add(e.id), !0)).map((t) => {
				let o = !!t.children?.length, s = e.expanded.includes(t.id);
				return X("li", {
					role: "treeitem",
					"data-tree-id": t.id,
					tabindex: !e.disabled && i.value === t.id ? 0 : -1,
					"aria-label": t.label,
					"aria-selected": String(e.modelValue === t.id),
					"aria-expanded": o ? String(s) : void 0,
					"aria-disabled": e.disabled || t.disabled ? "true" : void 0,
					"aria-level": n,
					ref: (e) => {
						e instanceof HTMLElement ? a.set(t.id, e) : a.delete(t.id);
					},
					onFocus: (e) => {
						e.target === e.currentTarget && (i.value = t.id);
					}
				}, [X("span", {
					class: "sol-tree-row",
					onClick: () => {
						l(t.id), u(t.id), o && d(t.id, !s);
					}
				}, [X("span", t.label), X("span", {
					class: "sol-tree-disclosure",
					"aria-hidden": "true",
					onClick: (e) => {
						o && (e.stopPropagation(), l(t.id), d(t.id, !s));
					}
				}, o ? Yx(Ah.chevron, 16, 0) : void 0)]), o ? X("ul", {
					role: "group",
					hidden: !s
				}, p(t.children, n + 1, r)) : null]);
			});
		}
		return () => X("ul", {
			...t,
			ref: r,
			id: e.id,
			class: ["sol-tree sol-ui-tree", t.class],
			role: "tree",
			"aria-label": e.label,
			"aria-disabled": e.disabled ? "true" : void 0,
			onKeydown: f
		}, p(e.items));
	}
}), KS = {
	id: {
		type: String,
		required: !0
	},
	label: {
		type: String,
		required: !0
	},
	modelValue: {
		type: Boolean,
		default: void 0
	},
	disabled: Boolean,
	readonly: Boolean,
	locale: Object
}, qS = {
	"update:modelValue": (e) => !0,
	open: () => !0,
	close: (e) => !0
}, JS = /* @__PURE__ */ H({
	name: "STooltip",
	inheritAttrs: !1,
	props: {
		...KS,
		text: {
			type: String,
			required: !0
		}
	},
	emits: qS,
	setup(e, { attrs: t, slots: n, emit: r }) {
		let i = /* @__PURE__ */ F(!1), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = Y(() => !e.disabled && !e.readonly && (e.modelValue ?? i.value)), { position: l } = MS(c, o, s), u = !1, d = !1, f, p = "programmatic";
		function m(t, n = "programmatic") {
			t && (e.disabled || e.readonly) || (p = n, e.modelValue === void 0 && (i.value = t), r("update:modelValue", t));
		}
		function h() {
			clearTimeout(f), u = !0, m(!0);
		}
		function g() {
			u = !1, clearTimeout(f), f = setTimeout(() => {
				!u && !d && m(!1, "outside");
			}, 120);
		}
		function _() {
			d = !0, clearTimeout(f), m(!0);
		}
		function v() {
			d = !1, u || m(!1, "focus");
		}
		function y(e) {
			e.key === "Escape" && !e.isComposing && c.value && (e.preventDefault(), e.stopPropagation(), m(!1, "escape"));
		}
		let b = (e) => {
			c.value && !a.value?.contains(e.target) && m(!1, "outside");
		};
		return V(c, (e, t) => {
			e ? r("open") : t && r("close", p);
		}), V(() => [e.disabled, e.readonly], () => {
			(e.disabled || e.readonly) && m(!1, "disabled");
		}), Yi(() => {
			document.addEventListener("pointerdown", b), document.addEventListener("keydown", y, !0);
		}), Qi(() => {
			clearTimeout(f), document.removeEventListener("pointerdown", b), document.removeEventListener("keydown", y, !0);
		}), () => {
			let r = {
				id: e.id + "-trigger",
				disabled: e.disabled,
				"aria-disabled": e.readonly ? "true" : void 0,
				"aria-describedby": [t["aria-describedby"], c.value ? e.id : void 0].filter(Boolean).join(" ") || void 0,
				onPointerenter: h,
				onPointerleave: g,
				onFocus: _,
				onBlur: v,
				onClick: () => m(!0),
				onKeydown: y
			};
			return X("span", {
				...t,
				ref: a,
				class: ["sol-ui-disclosure", t.class],
				onKeydown: y
			}, [X("span", {
				ref: o,
				class: "sol-ui-activator"
			}, n.activator?.({ props: r }) || X(DS, r, () => e.label)), X("span", {
				id: e.id,
				ref: s,
				popover: "manual",
				role: "tooltip",
				hidden: !c.value,
				class: "sol-tooltip sol-ui-floating",
				style: l.value,
				onPointerenter: h,
				onPointerleave: g
			}, e.text)]);
		};
	}
}), YS = /* @__PURE__ */ H({
	name: "SPopover",
	inheritAttrs: !1,
	props: {
		...KS,
		title: {
			type: String,
			required: !0
		}
	},
	emits: qS,
	setup(e, { attrs: t, slots: n, emit: r }) {
		let i = Nx(() => e.locale), a = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(null), u = Y(() => !e.disabled && !e.readonly && (e.modelValue ?? a.value)), { position: d } = MS(u, s, c), f = null, p = "programmatic", m = !0, h = !1;
		function g(t, n = "programmatic", i = !0) {
			t && (e.disabled || e.readonly) || (t && (f = document.activeElement instanceof HTMLElement ? document.activeElement : null), p = n, m = i, e.modelValue === void 0 && (a.value = t), r("update:modelValue", t));
		}
		function _(e) {
			e.key === "Escape" && u.value && (e.preventDefault(), e.stopPropagation(), g(!1, "escape"));
		}
		let v = (e) => {
			u.value && !o.value?.contains(e.target) && g(!1, "outside", !1);
		};
		function y(e) {
			let t = e.relatedTarget;
			t && !o.value?.contains(t) && g(!1, "focus", !1);
		}
		return V(u, async (e, t) => {
			if (e) {
				if (f ||= document.activeElement instanceof HTMLElement ? document.activeElement : null, await z(), h || !u.value) return;
				l.value?.$el?.focus({ preventScroll: !0 }), r("open");
			} else if (t) {
				let e = document.activeElement, t = !!c.value?.contains(e);
				await z(), !h && m && t && (document.activeElement === e || document.activeElement === document.body) && f?.isConnected && f.focus({ preventScroll: !0 }), f = null, r("close", p);
			}
		}, { immediate: !0 }), V(() => [e.disabled, e.readonly], () => {
			(e.disabled || e.readonly) && g(!1, "disabled");
		}), Yi(() => document.addEventListener("pointerdown", v)), Qi(() => {
			h = !0, document.removeEventListener("pointerdown", v), u.value && c.value?.contains(document.activeElement) && f?.isConnected && f.focus({ preventScroll: !0 });
		}), () => {
			let r = {
				id: e.id + "-trigger",
				disabled: e.disabled,
				"aria-disabled": e.readonly ? "true" : void 0,
				"aria-expanded": String(u.value),
				"aria-controls": e.id,
				"aria-haspopup": "dialog",
				onClick: () => g(!u.value, "trigger"),
				onKeydown: _
			};
			return X("div", {
				...t,
				ref: o,
				class: ["sol-ui-disclosure", t.class],
				onKeydown: _,
				onFocusout: y
			}, [X("span", {
				ref: s,
				class: "sol-ui-activator"
			}, n.activator?.({ props: r }) || X(DS, r, () => e.label)), X("section", {
				id: e.id,
				ref: c,
				popover: "manual",
				hidden: !u.value,
				role: "dialog",
				"aria-modal": "false",
				"aria-labelledby": e.id + "-title",
				class: "sol-ui-floating sol-ui-popover",
				style: d.value
			}, [
				X("header", { class: "sol-ui-popover-heading" }, [X("h3", { id: e.id + "-title" }, e.title), X(DS, {
					ref: l,
					variant: "inline",
					onClick: () => g(!1, "close")
				}, () => i.value.close)]),
				X("div", { class: "sol-ui-popover-body" }, n.default?.()),
				n.actions ? X("div", { class: "sol-actions" }, n.actions()) : null
			])]);
		};
	}
}), XS = /* @__PURE__ */ H({
	name: "SAccordion",
	inheritAttrs: !1,
	props: KS,
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r }) {
		let i = /* @__PURE__ */ F(!1), a = Y(() => e.modelValue ?? i.value);
		function o(t) {
			if (t.preventDefault(), e.disabled || e.readonly) return;
			let n = !a.value;
			e.modelValue === void 0 && (i.value = n), r("update:modelValue", n), r("change", n);
		}
		return () => X("details", {
			...t,
			id: e.id,
			open: a.value,
			class: ["sol-accordion", t.class]
		}, [X("summary", {
			id: e.id + "-summary",
			"aria-controls": e.id + "-content",
			"aria-disabled": e.disabled || e.readonly ? "true" : void 0,
			tabindex: e.disabled ? -1 : 0,
			onClick: o
		}, e.label), X("div", {
			id: e.id + "-content",
			class: "sol-accordion-content"
		}, n.default?.())]);
	}
});
function ZS(e) {
	return e != null && e !== !1 && (typeof e != "string" || e.trim().length > 0) && (!Array.isArray(e) || e.length > 0);
}
var QS = Object.freeze({
	required: (e) => (t, n) => ZS(t) || e || n.validationRequired,
	minLength: (e, t) => (n, r) => !Number.isInteger(e) || e < 0 ? t || r.validationInvalid : (typeof n == "string" || Array.isArray(n)) && n.length >= e || t || r.validationMinLength(e)
}), $S = {
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
}, eC = Symbol("SForm"), tC = /* @__PURE__ */ new WeakMap();
function nC(e) {
	return e.serverError || e.error || (typeof e.errorMessages == "string" ? e.errorMessages : e.errorMessages?.filter(Boolean).join(" ")) || "";
}
function rC(e) {
	return tC.get(e)?.error.value ?? nC(e);
}
function Q(e) {
	return !!e.disabled || !!tC.get(e)?.context?.disabled.value;
}
function $(e) {
	return !!e.readonly || !!tC.get(e)?.context?.readonly.value;
}
function iC(e, t, n) {
	let r = vr(eC, void 0), i = Nx(() => e.locale), a = /* @__PURE__ */ F(""), o = /* @__PURE__ */ F(!1), s = Y(() => Q(e) ? "" : nC(e) || n.intrinsicError?.() || a.value);
	tC.set(e, {
		error: s,
		context: r
	});
	function c() {
		if (Q(e)) {
			a.value = "";
			return;
		}
		let n = "";
		for (let r of e.rules || []) try {
			let e = r(t(), i.value);
			if (e !== !0) {
				n = typeof e == "string" && e ? e : i.value.validationInvalid;
				break;
			}
		} catch {
			n = i.value.validationInvalid;
			break;
		}
		!n && e.required && !ZS(t()) && (n = i.value.validationRequired), a.value = n;
	}
	function l() {
		if (Q(e)) return a.value = "", !0;
		o.value = !0;
		let t = n.validateIntrinsic?.() ?? !0;
		return c(), t && !s.value;
	}
	function u() {
		o.value = !1, a.value = "", n.resetIntrinsic?.();
	}
	V([
		t,
		() => e.rules,
		() => e.required,
		i
	], () => {
		o.value && c();
	}, { deep: !0 }), V(() => Q(e), (e) => {
		e && u();
	});
	let d = r?.register({
		id: e.id,
		label: () => e.label,
		disabled: () => Q(e),
		error: s,
		validate: l,
		resetValidation: u,
		focus: n.focus
	});
	return Qi(() => {
		d?.(), tC.delete(e);
	}), {
		focus: n.focus,
		validate: l,
		resetValidation: u
	};
}
var aC = /* @__PURE__ */ H({
	name: "SForm",
	inheritAttrs: !1,
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
		"update:modelValue": (e) => !0,
		submit: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ Zt(/* @__PURE__ */ new Map()), s = /* @__PURE__ */ F([]), c = /* @__PURE__ */ F([]), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(!1), d = /* @__PURE__ */ F(null), f = /* @__PURE__ */ new Set(), p = 0, m = !1;
		_r(eC, {
			disabled: Y(() => e.disabled),
			readonly: Y(() => e.readonly),
			register(e) {
				if (o.has(e.id)) throw Error("SForm field id must be unique: " + e.id);
				return o.set(e.id, e), () => o.delete(e.id);
			}
		});
		let h = () => [...o.values()].filter((e) => !e.disabled() && e.error.value).map((e) => ({
			id: e.id,
			label: e.label(),
			errorMessages: [e.error.value]
		})), g = () => [...h(), ...c.value.filter((e) => !o.has(e.id))];
		V(() => a.value?.errors, (e) => {
			m || (c.value = (e || []).map((e) => ({
				id: String(e.id),
				label: String(e.id),
				errorMessages: e.errorMessages
			})));
		}, { deep: !0 });
		let _ = Y(() => h().length || d.value === !1 ? !1 : l.value ? !0 : null);
		Sr(() => {
			l.value && (s.value = g()), r("update:modelValue", _.value);
		});
		function v() {
			return y();
		}
		async function y(t) {
			let n = ++p;
			f.add(n), m = !1, u.value = !0, l.value = !0;
			try {
				let r = await (t || a.value?.validate());
				if (n !== p) return {
					valid: !1,
					errors: [],
					cancelled: !0
				};
				d.value = r?.valid ?? !0;
				let i = [];
				for (let t of o.values()) if (!t.disabled() && (t.validate() || i.push({
					id: t.id,
					label: t.label(),
					errorMessages: [t.error.value || "입력값을 확인해 주세요."]
				}), e.fastFail && i.length)) break;
				for (let e of r?.errors || []) o.has(String(e.id)) || i.push({
					id: String(e.id),
					label: String(e.id),
					errorMessages: e.errorMessages
				});
				return s.value = i, d.value = !i.length, {
					valid: !i.length,
					errors: i
				};
			} finally {
				if (f.delete(n), u.value = f.size > 0, m && !f.size) {
					let e = p;
					a.value?.resetValidation(), c.value = [], d.value = null, await z(), await z(), e === p && !f.size && (m = !1);
				}
			}
		}
		function b() {
			p++, m = f.size > 0;
			for (let e of o.values()) e.resetValidation();
			a.value?.resetValidation(), s.value = [], c.value = [], l.value = !1, d.value = null;
		}
		function x() {
			let e = [...o.values()].filter((e) => !e.disabled());
			(e.find((e) => e.error.value) || e[0])?.focus();
		}
		return i({
			validate: v,
			resetValidation: b,
			focus: x
		}), Qi(() => {
			p++, m = !0;
		}), () => X(lb, {
			...t,
			ref: a,
			modelValue: d.value,
			disabled: e.disabled,
			readonly: e.readonly,
			fastFail: e.fastFail,
			"onUpdate:modelValue": (e) => {
				m || (d.value = e);
			},
			onSubmit: (e) => {
				e.preventDefault();
				let t = e, n = y(typeof t.then == "function" ? new Promise((e, n) => t.then(e, n)) : void 0), i = e;
				i.then = n.then.bind(n), i.catch = n.catch.bind(n), i.finally = n.finally.bind(n), r("submit", i);
			},
			onReset: () => b()
		}, { default: () => n.default?.({
			validate: v,
			resetValidation: b,
			focus: x,
			errors: s.value,
			isValid: _.value,
			isValidating: u.value
		}) });
	}
});
function oC(e, t, n, r) {
	if (!n) return t;
	try {
		let t = n(e, r);
		if (typeof t == "string" && t.trim()) return t;
		oc("A field display formatter must return a nonempty string; using the canonical display.");
	} catch {
		oc("A field display formatter failed; using the canonical display.");
	}
	return t;
}
var sC = {
	clearable: Boolean,
	loading: Boolean
}, cC = (e) => e.flat().filter((e) => e != null && e !== !1);
function lC(e, t) {
	document.activeElement === t && e.preventDefault();
}
function uC(e) {
	return e.detail > 0 || !!e.pointerType;
}
function dC(e, t, n) {
	let r = !1;
	Qi(() => {
		r = !0;
	});
	let i = () => ({
		hasValue: n.hasValue(),
		disabled: n.disabled(),
		readonly: n.readonly(),
		loading: e.loading || !!n.loading?.(),
		error: n.error(),
		clear: a
	});
	function a(e) {
		if (r || n.disabled() || n.readonly()) return;
		let t = typeof document > "u" ? null : document.activeElement;
		n.clear(), z(() => {
			if (r || (n.reconcile?.(), n.validate(), n.disabled() || typeof document > "u")) return;
			let i = document.activeElement, a = n.element();
			if (e && uC(e)) return;
			let o = a?.closest(".sol-ui-input-frame,.sol-ui-input-enhanced");
			(!i || i === document.body || i === t || i === a || o?.contains(i)) && n.focus();
		});
	}
	let o = () => e.clearable || e.loading || [
		"leading",
		"trailing",
		"indicator",
		"status",
		"loading"
	].some((e) => !!t[e]), s = () => n.always || o();
	function c() {
		return t.indicator?.(i()) || X(Xx, {
			name: n.icon || "chevron",
			size: 20,
			decorative: !0
		});
	}
	function l() {
		let e = t.leading?.(i());
		return e?.length ? X("span", { class: "sol-ui-input-leading" }, e) : null;
	}
	function u(r = !0) {
		let o = i(), s = n.locale(), l = cC([
			t.trailing?.(o),
			o.loading ? t.loading?.(o) || X("span", {
				class: "sol-ui-input-loading",
				role: "progressbar",
				"aria-label": s.inputLoading
			}, X("span", {
				class: "sol-ui-input-spinner",
				"aria-hidden": "true"
			})) : null,
			t.status?.(o) || (o.error ? X("span", {
				class: "sol-ui-input-status",
				"aria-hidden": "true"
			}, Yx(Ah.info, 16, 0)) : null),
			e.clearable && o.hasValue && !o.disabled && !o.readonly ? X("button", {
				type: "button",
				class: "sol-button sol-ui-input-clear",
				"aria-label": e.label + " " + s.clear,
				onMousedown: (e) => {
					e.preventDefault(), e.stopPropagation();
				},
				onPointerdown: (e) => lC(e, n.element()),
				onClick: a
			}, Yx(Ah.close, 16, 0)) : null,
			n.actions?.(),
			n.trigger ? Cs(n.trigger(c()), { class: "sol-ui-input-trigger" }) : r ? t.indicator?.(o) : null
		]);
		return l.length ? X("div", { class: "sol-ui-input-rail" }, l) : null;
	}
	function d(e, n = {}) {
		if (!s()) return e;
		let r = i(), a = n.select && !!t.indicator;
		return X("div", {
			class: ["sol-ui-input-frame", n.multiline ? "sol-ui-input-frame--multiline" : void 0],
			"data-disabled": r.disabled ? "true" : void 0,
			"data-error": r.error ? "true" : void 0,
			"aria-busy": r.loading ? "true" : void 0
		}, [
			l(),
			X("span", { class: "sol-ui-input-core" }, [Cs(e, {
				class: ["sol-ui-input-native", a ? "sol-ui-input-native--indicator" : void 0],
				"aria-busy": r.loading ? "true" : void 0
			}), a ? X("span", {
				class: "sol-ui-input-overlay-indicator",
				"aria-hidden": "true"
			}, t.indicator?.(r)) : null]),
			u(!n.select)
		]);
	}
	function f() {
		return s() ? {
			...t.leading ? { "prepend-inner": l } : {},
			"append-inner": () => u()
		} : {};
	}
	return {
		clear: a,
		scope: i,
		decorated: o,
		enhanced: s,
		native: d,
		vuetifySlots: f
	};
}
function fC(e) {
	let [t, n = "0"] = String(e).split("e"), r = t.split(".")[1] || "";
	return {
		coefficient: BigInt(t.replace(".", "")),
		exponent: Number(n) - r.length
	};
}
function pC(e, t) {
	return e.coefficient * 10n ** BigInt(e.exponent - t);
}
function mC(e, t) {
	if (!Number.isFinite(e) || !Number.isFinite(t)) return null;
	let n = fC(e), r = fC(t), i = Math.min(n.exponent, r.exponent), a = pC(n, i) + pC(r, i), o = Number(`${a}e${i}`);
	if (!Number.isFinite(o) || o === e) return null;
	let s = fC(o), c = Math.min(i, s.exponent);
	return pC({
		coefficient: a,
		exponent: i
	}, c) === pC(s, c) ? o : null;
}
function hC(e, t, n) {
	if (![
		e,
		t,
		n
	].every(Number.isFinite) || n <= 0) return !1;
	let r = fC(e), i = fC(t), a = fC(n), o = Math.min(r.exponent, i.exponent, a.exponent), s = pC(r, o) - pC(i, o), c = pC(a, o), l = s % c, u = l < 0n ? -l : l;
	return (u < c - u ? u : c - u) * 10000000n <= c;
}
function gC(e, t = !1) {
	return !/^[+-]?[\d,]+(?:\.\d*)?$/.test(e) || !t && !/^[+-]?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d*)?$/.test(e) ? e : e.replace(/^[^.]+/, (e) => e.replaceAll(",", "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}
function _C(e, t = !1) {
	let n = gC(e.value, t);
	if (n === e.value) return n;
	let r = e.selectionStart ?? e.value.length, i = [r, e.selectionEnd ?? r].map((t) => e.value.slice(0, t).replaceAll(",", "").length), a = e.selectionDirection;
	e.value = n;
	let o = (e) => {
		let t = 0;
		for (; t < n.length && e > 0;) n[t++] !== "," && e--;
		return t;
	};
	return e.setSelectionRange(o(i[0]), o(i[1]), a ?? void 0), n;
}
var vC = {
	id: {
		type: String,
		required: !0
	},
	label: {
		type: String,
		required: !0
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
	locale: Object
}, yC = {
	...$S,
	...vC,
	required: Boolean
};
function bC(e, t, n = rC(e), r) {
	return [
		e.help || t.help ? e.id + "-help" : "",
		n ? e.id + "-error" : "",
		r
	].filter(Boolean).join(" ") || void 0;
}
function xC(e, t, n = rC(e)) {
	return [e.help || t.help ? X("div", {
		id: e.id + "-help",
		class: "sol-hint"
	}, t.help?.() || e.help) : null, n ? X("p", {
		id: e.id + "-error",
		class: "sol-error",
		role: "alert"
	}, n) : null];
}
function SC(e, t, n) {
	return X("label", {
		id: e.id + "-label",
		for: e.id,
		class: "sol-label"
	}, [t.label?.() || e.label, e.required ? ` (${n})` : ""]);
}
var CC = (e, t) => {
	$(e) && t.preventDefault();
}, wC = (e, t) => {
	$(e) && ![
		"Tab",
		"Escape",
		"Shift",
		"Control",
		"Alt",
		"Meta"
	].includes(t.key) && t.preventDefault();
}, TC = /* @__PURE__ */ H({
	name: "SCheckbox",
	inheritAttrs: !1,
	props: {
		...yC,
		modelValue: Boolean
	},
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0,
		blur: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ F(null), s = iC(e, () => e.modelValue, { focus: () => o.value?.focus() });
		return i(s), () => X("div", { class: ["sol-ui-native-field", t.class] }, [X("label", {
			class: "sol-choice",
			for: e.id
		}, [
			X("input", {
				...t,
				ref: o,
				class: "sol-ui-choice-input",
				id: e.id,
				type: "checkbox",
				checked: e.modelValue,
				disabled: Q(e),
				required: e.required,
				"aria-readonly": $(e) ? "true" : void 0,
				"aria-invalid": rC(e) ? "true" : void 0,
				"aria-describedby": bC(e, n, rC(e), t["aria-describedby"]),
				onClick: (t) => CC(e, t),
				onChange: (t) => {
					let n = t.target;
					$(e) || Q(e) ? n.checked = e.modelValue : (r("update:modelValue", n.checked), r("change", n.checked));
				},
				onBlur: (e) => {
					s.validate(), r("blur", e);
				}
			}),
			X("span", n.label?.() || e.label),
			e.required ? X("span", { class: "sol-hint" }, ` (${a.value.required})`) : null
		]), ...xC(e, n)]);
	}
}), EC = /* @__PURE__ */ H({
	name: "SRadioGroup",
	inheritAttrs: !1,
	props: {
		...yC,
		modelValue: {
			type: String,
			default: null
		},
		options: {
			type: Array,
			required: !0
		},
		layout: {
			type: String,
			default: "list"
		},
		name: String
	},
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ new Map();
		return i(iC(e, () => e.modelValue, { focus: () => {
			let t = e.options.find((t) => !t.disabled && t.value === e.modelValue) || e.options.find((e) => !e.disabled);
			t && o.get(t.value)?.focus();
		} })), () => X("fieldset", {
			...t,
			id: e.id,
			disabled: Q(e),
			class: ["sol-ui-native-field sol-choice-fieldset", t.class],
			"aria-describedby": bC(e, n, rC(e), t["aria-describedby"]),
			"aria-invalid": rC(e) ? "true" : void 0
		}, [
			X("legend", {
				id: e.id + "-label",
				class: "sol-label"
			}, [n.label?.() || e.label, e.required ? ` (${a.value.required})` : ""]),
			...e.options.map((t, n) => X("label", {
				class: ["sol-choice", e.layout === "cards" ? "sol-ui-radio-card" : void 0],
				for: e.id + "-" + n
			}, [X("input", {
				id: e.id + "-" + n,
				type: "radio",
				ref: (e) => {
					e ? o.set(t.value, e) : o.delete(t.value);
				},
				name: e.name || e.id,
				value: t.value,
				checked: e.modelValue === t.value,
				disabled: Q(e) || t.disabled,
				required: e.required,
				"aria-disabled": $(e) ? "true" : void 0,
				onClick: (t) => CC(e, t),
				onKeydown: (t) => wC(e, t),
				onChange: (n) => {
					Q(e) || $(e) ? n.target.checked = e.modelValue === t.value : (r("update:modelValue", t.value), r("change", t.value));
				}
			}), X("span", [X("span", t.label), t.description ? X("span", { class: "sol-hint sol-ui-option-description" }, t.description) : null])])),
			...xC(e, n)
		]);
	}
}), DC = /* @__PURE__ */ H({
	name: "SSwitch",
	inheritAttrs: !1,
	props: {
		...yC,
		modelValue: Boolean,
		hideLabel: Boolean
	},
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ F(null);
		return i(iC(e, () => e.modelValue, { focus: () => o.value?.focus() })), () => X("div", { class: "sol-ui-native-field" }, [X("label", {
			class: "sol-choice",
			for: e.id
		}, [X("input", {
			...t,
			ref: o,
			id: e.id,
			type: "checkbox",
			role: "switch",
			class: ["sol-ui-switch-input", t.class],
			checked: e.modelValue,
			disabled: Q(e),
			required: e.required,
			"aria-checked": String(e.modelValue),
			"aria-readonly": $(e) ? "true" : void 0,
			"aria-describedby": bC(e, n, rC(e), t["aria-describedby"]),
			"aria-invalid": rC(e) ? "true" : void 0,
			onClick: (t) => CC(e, t),
			onChange: (t) => {
				let n = t.target;
				Q(e) || $(e) ? n.checked = e.modelValue : (r("update:modelValue", n.checked), r("change", n.checked));
			}
		}), X("span", { class: e.hideLabel ? "sol-ui-sr-only" : void 0 }, [n.label?.() || e.label, e.required ? " (" + a.value.required + ")" : ""])]), ...xC(e, n)]);
	}
}), OC = /* @__PURE__ */ H({
	name: "SSelect",
	inheritAttrs: !1,
	props: {
		...yC,
		...sC,
		modelValue: {
			type: String,
			default: null
		},
		options: {
			type: Array,
			required: !0
		},
		placeholder: String
	},
	slots: Object,
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0,
		blur: (e) => !0,
		clear: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ F(null), s = iC(e, () => e.modelValue, { focus: () => o.value?.focus() }), c = dC(e, n, {
			locale: () => a.value,
			hasValue: () => e.modelValue !== null && e.modelValue !== "",
			disabled: () => Q(e),
			readonly: () => $(e),
			error: () => rC(e),
			clear: () => {
				e.modelValue !== null && (r("update:modelValue", null), r("change", null)), r("clear", {
					value: null,
					reason: "clear"
				});
			},
			validate: s.validate,
			focus: s.focus,
			element: () => o.value
		});
		return i({
			...s,
			clear: c.clear
		}), () => X("div", { class: "sol-field sol-ui-native-field" }, [
			SC(e, n, a.value.required),
			c.native(X("select", {
				...t,
				ref: o,
				id: e.id,
				value: e.modelValue ?? "",
				class: ["sol-select", t.class],
				disabled: Q(e),
				required: e.required,
				"aria-readonly": $(e) ? "true" : void 0,
				"aria-invalid": rC(e) ? "true" : void 0,
				"aria-describedby": bC(e, n, rC(e), t["aria-describedby"]),
				onPointerdown: (t) => CC(e, t),
				onKeydown: (t) => wC(e, t),
				onChange: (t) => {
					let n = t.target;
					if (Q(e) || $(e)) {
						n.value = e.modelValue ?? "";
						return;
					}
					let i = n.value || null;
					r("update:modelValue", i), r("change", i);
				},
				onBlur: (e) => {
					s.validate(), r("blur", e);
				}
			}, [X("option", {
				value: "",
				disabled: e.required
			}, e.placeholder ?? a.value.choose), ...e.options.map((e) => X("option", {
				value: e.value,
				disabled: e.disabled
			}, e.label))]), { select: !0 }),
			...xC(e, n)
		]);
	}
}), kC = /* @__PURE__ */ H({
	name: "STextarea",
	inheritAttrs: !1,
	props: {
		...yC,
		...sC,
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
			default: !0
		}
	},
	slots: Object,
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0,
		blur: (e) => !0,
		clear: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ F(null), s = iC(e, () => e.modelValue, { focus: () => o.value?.focus() }), c = dC(e, n, {
			locale: () => a.value,
			hasValue: () => e.modelValue.length > 0,
			disabled: () => Q(e),
			readonly: () => $(e),
			error: () => rC(e),
			clear: () => {
				e.modelValue !== "" && (r("update:modelValue", ""), r("change", "")), r("clear", {
					value: "",
					reason: "clear"
				});
			},
			validate: s.validate,
			focus: s.focus,
			element: () => o.value
		});
		return i({
			...s,
			clear: c.clear
		}), () => X("div", { class: "sol-field sol-ui-native-field" }, [
			SC(e, n, a.value.required),
			c.native(X("textarea", {
				...t,
				ref: o,
				id: e.id,
				class: ["sol-input sol-textarea", t.class],
				value: e.modelValue,
				rows: Math.max(3, e.rows),
				maxlength: e.maxlength,
				disabled: Q(e),
				readonly: $(e),
				required: e.required,
				"aria-invalid": rC(e) ? "true" : void 0,
				"aria-describedby": bC(e, n, rC(e), t["aria-describedby"]),
				onInput: (t) => {
					!Q(e) && !$(e) && r("update:modelValue", t.target.value);
				},
				onChange: (t) => {
					!Q(e) && !$(e) && r("change", t.target.value);
				},
				onBlur: (e) => {
					s.validate(), r("blur", e);
				}
			}), { multiline: !0 }),
			X("div", { class: "sol-ui-field-footer" }, [X("div", xC(e, n)), e.showCount ? X("span", { class: "sol-hint sol-ui-counter" }, a.value.count(e.modelValue.length, e.maxlength)) : null])
		]);
	}
}), AC = /* @__PURE__ */ H({
	name: "SNumberInput",
	inheritAttrs: !1,
	props: {
		...yC,
		...sC,
		modelValue: {
			type: Number,
			default: null
		},
		min: Number,
		max: Number,
		step: {
			type: Number,
			default: 1
		},
		presets: {
			type: Array,
			default: () => []
		},
		formatValue: Function,
		useGrouping: {
			type: Boolean,
			default: !0
		},
		unit: {
			type: String,
			default: ""
		}
	},
	slots: Object,
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0,
		invalid: (e) => !0,
		blur: (e) => !0,
		clear: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = (t) => Fx(t, a.value, { useGrouping: e.useGrouping }), s = /* @__PURE__ */ F(e.modelValue === null ? "" : o(e.modelValue)), c = /* @__PURE__ */ F(""), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(null), d = () => s.value.trim() === "" ? null : Ix(s.value, a.value) ?? NaN;
		function f(t) {
			return t === null ? e.required ? a.value.invalidNumber : "" : !Number.isFinite(t) || !Number.isFinite(e.step) || e.step <= 0 || e.min !== void 0 && e.max !== void 0 && e.min > e.max ? a.value.invalidNumber : e.min !== void 0 && t < e.min || e.max !== void 0 && t > e.max ? a.value.numberRange : hC(t, e.min ?? 0, e.step) ? "" : a.value.numberStep;
		}
		let p = () => f(d());
		function m() {
			u.value?.setCustomValidity(rC(e) || p());
		}
		function h() {
			if ($(e) || Q(e)) return !rC(e) && !p();
			let t = p();
			if (c.value = t, t) return r("invalid", t), m(), !1;
			let n = d();
			return s.value = n === null ? "" : o(n), n !== e.modelValue && (r("update:modelValue", n), r("change", n)), !e.error && !e.serverError && !e.errorMessages.length;
		}
		function g(t) {
			if (!Number.isFinite(e.step) || e.step <= 0) return null;
			let n = e.modelValue ?? e.min ?? 0, r = e.modelValue === null ? n : mC(n, t * e.step);
			return r === null || !Number.isFinite(r) || e.min !== void 0 && r < e.min || e.max !== void 0 && r > e.max ? null : r;
		}
		function _(t) {
			if (Q(e) || $(e)) return;
			let n = g(t);
			n !== null && v(n);
		}
		function v(e) {
			let t = u.value, n = t && document.activeElement === t ? [
				t.selectionStart ?? 0,
				t.selectionEnd ?? 0,
				t.selectionDirection ?? void 0
			] : null;
			s.value = o(e), h(), n && z(() => t?.setSelectionRange(...n));
		}
		let y = (t) => Number.isFinite(t) && (e.min === void 0 || Number.isFinite(e.min)) && (e.max === void 0 || Number.isFinite(e.max)) && !f(t);
		function b(t) {
			return Q(e) || $(e) || !y(t) ? !1 : (v(t), !0);
		}
		let x = (t) => oC(t, Fx(t, a.value), e.formatValue, a.value);
		function S() {
			let t = d();
			return !e.formatValue || l.value || t === null || p() ? s.value : x(t);
		}
		function C() {
			l.value = !$(e) && !Q(e), l.value && e.formatValue && u.value && (u.value.value = s.value);
		}
		let w = (e) => {
			lC(e, u.value);
		}, T;
		function E(t) {
			if ($(e) || Q(e)) return;
			let n = t.target, r = t.inputType, i = t.data ?? (r === "insertFromPaste" ? T : void 0), o = /^(insertText|deleteContentBackward|deleteContentForward|deleteByCut|insertFromPaste)$/.test(r) && (r !== "insertFromPaste" || i !== void 0) && !i?.includes(",") && Ix(s.value, a.value) !== null;
			T = void 0, s.value = e.useGrouping && !t.isComposing ? _C(n, o) : n.value, c.value &&= p();
		}
		let D = iC(e, d, {
			focus: () => u.value?.focus(),
			validateIntrinsic: h,
			intrinsicError: () => c.value,
			resetIntrinsic: () => {
				c.value = "";
			}
		}), O = dC(e, n, {
			locale: () => a.value,
			hasValue: () => e.modelValue !== null || s.value.length > 0,
			disabled: () => Q(e),
			readonly: () => $(e),
			error: () => rC(e) || c.value,
			clear: () => {
				s.value = "", c.value = "", e.modelValue !== null && (r("update:modelValue", null), r("change", null)), r("clear", {
					value: null,
					reason: "clear"
				});
			},
			reconcile: () => {
				s.value = e.modelValue === null ? "" : o(e.modelValue), c.value = "";
			},
			validate: D.validate,
			focus: D.focus,
			element: () => u.value
		});
		return V(() => e.modelValue, (e) => {
			s.value = e === null ? "" : o(e), c.value = "";
		}), V(() => e.useGrouping, () => {
			let e = d();
			p() || (s.value = e === null ? "" : o(e));
		}), V(() => [
			s.value,
			rC(e),
			e.required,
			e.min,
			e.max,
			e.step
		], () => z(m)), V(() => [Q(e), $(e)], () => {
			(Q(e) || $(e)) && (l.value = !1);
		}), V(a, () => {
			c.value &&= p(), document.activeElement !== u.value && !p() && (s.value = e.modelValue === null ? "" : o(e.modelValue)), z(m);
		}), Yi(m), i({
			...D,
			clear: O.clear
		}), () => {
			let i = rC(e) || c.value, o = d(), f = o !== null && !p() && (e.formatValue || e.unit) ? [x(o), e.unit].filter(Boolean).join(" ") : void 0;
			return X("div", { class: "sol-field sol-ui-native-field" }, [
				SC(e, n, a.value.required),
				e.formatValue && t.name != null ? X("input", {
					type: "hidden",
					name: t.name,
					form: t.form,
					disabled: Q(e),
					value: e.modelValue === null ? "" : Fx(e.modelValue, a.value)
				}) : null,
				X("div", { class: ["sol-ui-number", e.unit ? "sol-ui-number--unit" : void 0] }, [
					O.native(X("input", ks({ onFocus: C }, {
						...t,
						ref: u,
						id: e.id,
						type: "text",
						inputmode: "decimal",
						class: ["sol-input", t.class],
						value: S(),
						name: e.formatValue ? void 0 : t.name,
						disabled: Q(e),
						readonly: $(e),
						required: e.required,
						role: "spinbutton",
						"aria-valuemin": e.min,
						"aria-valuemax": e.max,
						"aria-valuenow": o !== null && Number.isFinite(o) && !p() ? o : void 0,
						"aria-valuetext": f,
						"aria-invalid": i ? "true" : void 0,
						"aria-describedby": bC(e, n, i, [e.id + "-constraints", t["aria-describedby"]].filter(Boolean).join(" ")),
						onInput: E,
						onCompositionend: E,
						onPaste: (e) => {
							T = e.clipboardData?.getData("text/plain");
						},
						onBeforeinput: (t) => {
							let n = t.target, r = n.selectionStart ?? 0;
							if (!e.useGrouping || $(e) || Q(e) || n.selectionEnd !== r || Ix(s.value, a.value) === null) return;
							let i = t.inputType === "deleteContentBackward";
							if (i && n.value[r - 1] === "," || t.inputType === "deleteContentForward" && n.value[r] === ",") {
								t.preventDefault();
								let e = i ? r - 2 : r;
								n.setRangeText("", e, e + 2, "start"), E(t);
							}
						},
						onBlur: (t) => {
							!$(e) && !Q(e) && D.validate(), l.value = !1, r("blur", t);
						},
						onInvalid: (e) => {
							e.preventDefault(), h(), u.value?.focus();
						},
						onKeydown: (t) => {
							t.isComposing || $(e) || Q(e) || (t.key === "Enter" ? (t.preventDefault(), h()) : (t.key === "ArrowUp" || t.key === "ArrowDown") && (t.preventDefault(), _(t.key === "ArrowUp" ? 1 : -1)));
						}
					}))),
					e.unit ? X("span", {
						class: "sol-ui-number-unit",
						"aria-hidden": "true"
					}, e.unit) : null,
					X("div", {
						class: "sol-ui-number-stepper",
						role: "group",
						"aria-labelledby": e.id + "-label"
					}, [X("button", {
						type: "button",
						class: "sol-button",
						disabled: Q(e) || $(e) || g(-1) === null,
						onPointerdown: w,
						"aria-label": e.label + " " + a.value.decrease,
						onClick: () => _(-1)
					}, "−"), X("button", {
						type: "button",
						class: "sol-button",
						disabled: Q(e) || $(e) || g(1) === null,
						onPointerdown: w,
						"aria-label": e.label + " " + a.value.increase,
						onClick: () => _(1)
					}, "+")])
				]),
				e.presets.length || n.presets ? X("div", {
					class: "sol-ui-number-presets",
					role: "group",
					"aria-labelledby": e.id + "-label"
				}, n.presets?.({
					presets: e.presets,
					value: e.modelValue,
					setValue: b,
					isAllowed: y,
					disabled: Q(e),
					readonly: $(e)
				}) || e.presets.map((t, n) => X(Zx, {
					key: n,
					selectable: !0,
					selected: e.modelValue === t.value,
					disabled: Q(e) || $(e) || !!t.disabled || !y(t.value),
					label: t.label ?? [x(t.value), e.unit].filter(Boolean).join(" "),
					locale: e.locale,
					onClick: () => b(t.value),
					onPointerdown: w
				}))) : null,
				X("span", {
					id: e.id + "-constraints",
					class: "sol-hint"
				}, a.value.numberHelp(e.min, e.max, e.step)),
				...xC(e, n, i)
			]);
		};
	}
}), jC = (e, t) => e.name === t.name && e.size === t.size && e.type === t.type && e.lastModified === t.lastModified;
function MC(e) {
	return {
		maxFiles: Number.isFinite(e.maxFiles) && Number(e.maxFiles) >= 1 ? Math.floor(e.maxFiles) : 3,
		maxFileSize: Number.isFinite(e.maxFileSize) && Number(e.maxFileSize) >= 0 ? e.maxFileSize : 2097152
	};
}
function NC(e, t) {
	return e < 1024 ? Fx(e, t) + " B" : Fx(e / 1024, t, {
		maximumFractionDigits: 2,
		maximumSignificantDigits: void 0
	}) + " KiB";
}
function PC(e, t = "ko-KR") {
	let n = jx(t), r = e.name.includes(".") ? e.name.split(".").at(-1).toUpperCase() : n.noFileExtension;
	return {
		name: e.name,
		extension: r,
		mediaType: e.type ? n.fileType(e.type) : n.unknownFileType,
		size: NC(e.size, n)
	};
}
function FC(e, t, n = {}, r = "ko-KR") {
	let i = jx(r), a = MC(n), o = (n.accept || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean), s = [...t], c = [];
	for (let t of e) {
		let e, n = "";
		o.length && !o.some((e) => e.startsWith(".") ? t.name.toLowerCase().endsWith(e) : e.endsWith("/*") ? !!t.type && t.type.toLowerCase().startsWith(e.slice(0, -1)) : t.type.toLowerCase() === e) ? (e = "type", n = i.unsupportedFile) : t.size > a.maxFileSize ? (e = "size", n = i.oversizedFile(NC(a.maxFileSize, i))) : s.some((e) => jC(e, t)) ? (e = "duplicate", n = i.duplicateFile) : s.length >= a.maxFiles && (e = "count", n = i.tooManyFiles(a.maxFiles)), e ? c.push({
			file: t,
			code: e,
			message: n
		}) : s.push(t);
	}
	return {
		files: s,
		rejected: c
	};
}
var IC = /* @__PURE__ */ H({
	name: "SFileInput",
	inheritAttrs: !1,
	props: {
		...yC,
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
		preview: {
			type: Boolean,
			default: !0
		},
		drop: {
			type: Boolean,
			default: !0
		}
	},
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0,
		reject: (e) => !0,
		remove: (e) => !0,
		invalid: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F([]), d = /* @__PURE__ */ F(""), f = 0, p = /* @__PURE__ */ F(/* @__PURE__ */ new Map()), m = /* @__PURE__ */ new Set();
		function h(e) {
			typeof window < "u" && window.URL.revokeObjectURL?.(e);
		}
		function g() {
			let t = e.preview ? new Set(e.modelValue.filter((e) => e.type.startsWith("image/"))) : /* @__PURE__ */ new Set();
			for (let [e, n] of p.value) t.has(e) || (h(n), p.value.delete(e));
			for (let e of m) t.has(e) || m.delete(e);
			if (typeof window < "u" && typeof window.URL.createObjectURL == "function") {
				for (let e of t) if (!p.value.has(e) && !m.has(e)) try {
					p.value.set(e, window.URL.createObjectURL(e));
				} catch {
					m.add(e);
				}
			}
		}
		V(() => [e.modelValue, e.preview], g, { deep: !0 }), Yi(g), Qi(() => {
			for (let e of p.value.values()) h(e);
			p.value.clear(), m.clear();
		});
		let _ = () => !Q(e) && !$(e);
		function v() {
			f = 0, l.value = !1;
		}
		let y = () => c.value?.$el?.focus();
		function b(e) {
			r("update:modelValue", e), r("change", e), d.value = "";
		}
		function x(t) {
			if (!_()) return;
			let n = FC(t, e.modelValue, e, a.value);
			u.value = n.rejected, n.files.length !== e.modelValue.length && b(n.files), n.rejected.length && r("reject", n.rejected);
		}
		function S(e) {
			x(Array.from(e.target.files || [])), s.value && (s.value.value = "");
		}
		function C(t) {
			_() && (b(e.modelValue.filter((e) => e !== t)), u.value = [], r("remove", t), z(y));
		}
		function w() {
			_() && (b([]), u.value = [], s.value && (s.value.value = ""), z(y));
		}
		function T() {
			let t = e.required && !e.modelValue.length ? a.value.fileRequired : "";
			return d.value = t, t && r("invalid", t), !nC(e) && !t;
		}
		let E = (e) => Array.from(e.dataTransfer?.types || []).includes("Files");
		function D(t) {
			E(t) && (t.preventDefault(), e.drop && _() && (f++, l.value = !0));
		}
		function O() {
			f = Math.max(0, f - 1), f || (l.value = !1);
		}
		function k(t) {
			E(t) && (t.preventDefault(), l.value = e.drop && _(), t.dataTransfer && (t.dataTransfer.dropEffect = l.value ? "copy" : "none"));
		}
		function A(t) {
			E(t) && (t.preventDefault(), t.stopPropagation(), v(), e.drop && x(Array.from(t.dataTransfer?.files || [])));
		}
		function j(e) {
			E(e) && !o.value?.contains(e.target) && e.preventDefault();
		}
		Yi(() => {
			document.addEventListener("dragover", j), document.addEventListener("drop", j);
		}), Qi(() => {
			document.removeEventListener("dragover", j), document.removeEventListener("drop", j);
		});
		let ee = iC(e, () => e.modelValue, {
			focus: y,
			validateIntrinsic: T,
			intrinsicError: () => d.value,
			resetIntrinsic: () => {
				d.value = "";
			}
		});
		return V(() => [
			e.drop,
			Q(e),
			$(e)
		], () => {
			e.drop && _() || v();
		}), i({
			...ee,
			clear: w
		}), () => {
			let r = MC(e), i = rC(e) || d.value, f = e.drop && _() && l.value;
			return X("div", {
				...t,
				ref: o,
				class: ["sol-field sol-ui-file", t.class],
				role: "group",
				"aria-labelledby": e.id + "-label",
				"aria-describedby": bC(e, n, i, t["aria-describedby"]),
				"aria-invalid": i ? "true" : void 0
			}, [
				X("span", {
					id: e.id + "-label",
					class: "sol-label"
				}, [n.label?.() || e.label, e.required ? " (" + a.value.required + ")" : ""]),
				X("div", {
					class: e.drop ? "sol-dropzone" : "sol-ui-file-chooser",
					"data-dragging": String(f),
					"data-drag-state": f ? "over" : "idle",
					"aria-disabled": _() ? void 0 : "true",
					onDragenter: D,
					onDragover: k,
					onDragleave: O,
					onDrop: A
				}, [
					e.drop ? X("p", a.value.dropFiles) : null,
					X("p", {
						id: e.id + "-limits",
						class: "sol-hint"
					}, a.value.filesHelp(e.accept, r.maxFiles, NC(r.maxFileSize, a.value))),
					X(DS, {
						ref: c,
						id: e.id + "-choose",
						disabled: !_(),
						"aria-label": e.label + ": " + a.value.filesChoose,
						"aria-describedby": [e.id + "-limits", bC(e, n, i)].filter(Boolean).join(" "),
						onClick: () => {
							_() && s.value?.click();
						}
					}, () => a.value.filesChoose),
					X("input", {
						id: e.id,
						ref: s,
						type: "file",
						hidden: !0,
						disabled: !_(),
						accept: e.accept,
						multiple: r.maxFiles > 1,
						onChange: S
					})
				]),
				...xC(e, n, i),
				u.value.length ? X("div", {
					class: "sol-notice danger",
					role: "alert"
				}, [X("strong", a.value.filesRejected), X("ul", u.value.map((e, t) => X("li", { key: t }, e.file.name + ": " + e.message)))]) : null,
				X("ul", { class: "sol-ui-file-list" }, e.modelValue.map((e, t) => {
					let n = PC(e, a.value);
					return X("li", { key: t }, [
						p.value.has(e) ? X("img", {
							class: "sol-ui-file-preview",
							src: p.value.get(e),
							alt: "",
							"aria-hidden": "true",
							loading: "lazy",
							decoding: "async",
							onError: () => {
								let t = p.value.get(e);
								t && h(t), p.value.delete(e), m.add(e);
							}
						}) : null,
						X("div", { class: "sol-ui-file-meta" }, [X("strong", e.name), X("span", { class: "sol-hint" }, [
							n.extension,
							n.mediaType,
							n.size
						].join(" · "))]),
						X(DS, {
							variant: "inline",
							disabled: !_(),
							"aria-label": a.value.remove(e.name),
							onClick: () => C(e)
						}, () => a.value.fileRemove)
					]);
				})),
				X(DS, {
					variant: "inline",
					disabled: !_() || !e.modelValue.length,
					onClick: w
				}, () => a.value.filesClear)
			]);
		};
	}
});
function LC(e) {
	let t, n, r = 0, i = !1;
	function a() {
		clearTimeout(t), t = void 0, n?.abort(), n = void 0, r++, e.settled();
	}
	async function o(t) {
		let o = e.loader();
		if (i || !o || !e.available()) return;
		a();
		let s = r, c = new AbortController();
		n = c, e.pending();
		try {
			let n = await o(t, c.signal);
			!i && s === r && !c.signal.aborted && e.resolved(n);
		} catch {
			!i && s === r && !c.signal.aborted && e.rejected();
		} finally {
			!i && s === r && (n = void 0, e.settled());
		}
	}
	return {
		stop: a,
		run: o,
		schedule(n, r) {
			!i && e.loader() && e.available() && (a(), e.pending(), t = setTimeout(() => void o(typeof n == "function" ? n() : n), Number.isFinite(r) ? Math.max(0, r) : 0));
		},
		dispose() {
			i = !0, a();
		}
	};
}
var RC = /* @__PURE__ */ H({
	name: "SAutocomplete",
	inheritAttrs: !1,
	props: {
		...yC,
		...sC,
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
	slots: Object,
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0,
		search: (e) => !0,
		open: () => !0,
		close: () => !0,
		invalid: (e) => !0,
		clear: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(""), d = /* @__PURE__ */ F(-1), f = /* @__PURE__ */ F([]), p = /* @__PURE__ */ F(!1), m = /* @__PURE__ */ F(!1), h = /* @__PURE__ */ F(""), { position: g, locate: _ } = MS(l, s, c, !0), v = /* @__PURE__ */ new Map(), y = !1, b = !1, x, S = () => !Q(e) && !$(e), C = (e) => {
			let t = /* @__PURE__ */ new Set();
			return e.filter((e) => e && typeof e.value == "string" && !!e.value && typeof e.label == "string" && !t.has(e.value) && !!t.add(e.value)).map((e) => (v.set(e.value, e.label), e));
		}, w = (e) => e.normalize("NFKC").trim().toLocaleLowerCase(a.value.code), T = Y(() => e.loadOptions ? f.value : f.value.filter((e) => w(e.label).includes(w(u.value)))), E = () => T.value.map((e, t) => ({
			item: e,
			index: t
		})).filter(({ item: e }) => !e.disabled);
		V(() => e.options, (t) => {
			let n = C(t);
			e.loadOptions || (f.value = n), !l.value && e.modelValue !== null && (u.value = v.get(e.modelValue) || e.modelValue);
		}, {
			immediate: !0,
			deep: !0
		}), V(() => e.modelValue, (e) => {
			e !== x && (u.value = e === null ? "" : v.get(e) || e), x = void 0, h.value = "";
		}, { immediate: !0 });
		let D = LC({
			loader: () => e.loadOptions,
			available: () => l.value && S() && !b,
			pending: () => {
				p.value = !0, m.value = !1, f.value = [], d.value = -1;
			},
			resolved: (e) => {
				f.value = C(e), A();
			},
			rejected: () => {
				m.value = !0;
			},
			settled: () => {
				p.value = !1, z(_);
			}
		}), O = D.stop;
		function k() {
			l.value && (l.value = !1, d.value = -1, O(), r("close"));
		}
		function A() {
			d.value = E()[0]?.index ?? -1;
		}
		let j = () => D.run(u.value);
		function ee() {
			S() && !b && (r("search", u.value), e.loadOptions ? D.schedule(() => u.value, e.debounce) : A());
		}
		function M() {
			S() && (l.value || (l.value = !0, r("open")), ee());
		}
		function te(e) {
			x = e, r("update:modelValue", e), r("change", e), h.value = "";
		}
		function ne(t) {
			S() && (u.value = t.target.value, e.modelValue !== null && te(null), b || M());
		}
		function re(e) {
			S() && !e.disabled && (te(e.value), u.value = e.label, k(), s.value?.focus({ preventScroll: !0 }));
		}
		function ie() {
			de.enhanced() ? de.clear() : S() && (te(null), u.value = "", k(), s.value?.focus({ preventScroll: !0 }), r("clear", {
				value: null,
				reason: "clear"
			}));
		}
		function ae() {
			S() && (s.value?.focus({ preventScroll: !0 }), l.value || (l.value = !0, r("open")), j());
		}
		function oe() {
			let t = e.required && e.modelValue === null ? a.value.chooseAtLeastOne : "";
			return h.value = t, t && r("invalid", t), !nC(e) && !t;
		}
		function se(t) {
			if (b || t.isComposing || !S()) return;
			if (t.key === "Escape" && l.value) {
				t.preventDefault(), t.stopPropagation(), k(), s.value?.focus();
				return;
			}
			if (t.key === "Tab") {
				m.value || k();
				return;
			}
			let n = E();
			if (t.key === "ArrowDown" || t.key === "ArrowUp") {
				if (t.preventDefault(), !l.value) {
					M(), e.loadOptions || (d.value = (t.key === "ArrowUp" ? E().at(-1) : E()[0])?.index ?? -1);
					return;
				}
				let r = n.findIndex(({ index: e }) => e === d.value), i = t.key === "ArrowDown" ? 1 : -1;
				d.value = (r < 0 ? i === 1 ? n[0] : n.at(-1) : n[(r + i + n.length) % n.length])?.index ?? -1;
			} else l.value && d.value >= 0 && T.value[d.value] && (t.key === "Home" || t.key === "End" ? (t.preventDefault(), d.value = (t.key === "Home" ? n[0] : n.at(-1))?.index ?? -1) : t.key === "Enter" && (t.preventDefault(), re(T.value[d.value])));
			t.defaultPrevented && z(() => {
				let e = c.value, t = e?.querySelector("[aria-selected=\"true\"]");
				if (!e || !t) return;
				let n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
				r.top < n.top ? e.scrollTop -= n.top - r.top : r.bottom > n.bottom && (e.scrollTop += r.bottom - n.bottom);
			});
		}
		function ce(e) {
			let t = e.relatedTarget;
			t && !o.value?.contains(t) && k();
		}
		let le = (e) => {
			l.value && !o.value?.contains(e.target) && k();
		};
		V(() => [
			Q(e),
			$(e),
			e.loadOptions
		], () => {
			k(), e.loadOptions || (f.value = C(e.options));
		}), Yi(() => document.addEventListener("pointerdown", le)), Qi(() => {
			D.dispose(), document.removeEventListener("pointerdown", le);
		});
		let ue = iC(e, () => e.modelValue, {
			focus: () => s.value?.focus(),
			validateIntrinsic: oe,
			intrinsicError: () => h.value,
			resetIntrinsic: () => {
				h.value = "";
			}
		}), de = dC(e, n, {
			locale: () => a.value,
			hasValue: () => e.modelValue !== null || u.value.length > 0,
			disabled: () => Q(e),
			readonly: () => $(e),
			error: () => rC(e) || h.value,
			loading: () => p.value,
			clear: () => {
				y = b, b = !1, te(null), u.value = "", m.value = !1, k(), O(), r("clear", {
					value: null,
					reason: "clear"
				});
			},
			reconcile: () => {
				x = void 0, u.value = e.modelValue === null ? "" : v.get(e.modelValue) || e.modelValue;
			},
			validate: ue.validate,
			focus: ue.focus,
			element: () => s.value,
			trigger: (t) => X("button", {
				type: "button",
				class: "sol-button",
				disabled: !S(),
				"aria-label": e.label + " " + (l.value ? a.value.close : a.value.choose),
				"aria-haspopup": "listbox",
				"aria-expanded": String(l.value),
				"aria-controls": e.id + "-options",
				onMousedown: (e) => e.preventDefault(),
				onClick: () => {
					l.value ? k() : M(), s.value?.focus({ preventScroll: !0 });
				}
			}, [t])
		});
		return i({
			...ue,
			clear: ie,
			retry: ae
		}), () => {
			let r = rC(e) || h.value, i = l.value && !p.value && !m.value && d.value >= 0 ? T.value[d.value] : void 0;
			return X("div", {
				ref: o,
				class: ["sol-field sol-ui-autocomplete", t.class],
				onFocusout: ce
			}, [
				SC(e, n, a.value.required),
				de.native(X("input", {
					...t,
					id: e.id,
					ref: s,
					class: "sol-input",
					type: "text",
					value: u.value,
					placeholder: e.placeholder,
					disabled: Q(e),
					readonly: $(e),
					required: e.required,
					role: "combobox",
					"aria-autocomplete": "list",
					"aria-haspopup": "listbox",
					"aria-expanded": String(l.value),
					"aria-controls": e.id + "-options",
					"aria-activedescendant": i ? e.id + "-option-" + d.value : void 0,
					"aria-invalid": r ? "true" : void 0,
					"aria-describedby": [bC(e, n, r, t["aria-describedby"]), e.id + "-status"].filter(Boolean).join(" "),
					autocomplete: "off",
					onClick: M,
					onInput: ne,
					onKeydown: se,
					onCompositionstart: () => {
						y = !1, b = !0, O();
					},
					onCompositionend: (e) => {
						y ? (y = !1, b = !1, e.target.value = u.value) : (b = !1, ne(e));
					}
				})),
				...xC(e, n, r),
				X("div", {
					ref: c,
					popover: "manual",
					hidden: !l.value,
					class: "sol-ui-floating sol-ui-combo-panel",
					style: g.value,
					onKeydown: (e) => {
						e.key === "Escape" && l.value && (e.preventDefault(), e.stopPropagation(), k(), s.value?.focus());
					}
				}, [X("ul", {
					id: e.id + "-options",
					role: "listbox",
					"aria-label": e.label,
					hidden: p.value || m.value || !T.value.length
				}, T.value.map((t, n) => X("li", {
					id: e.id + "-option-" + n,
					key: t.value,
					role: "option",
					"aria-selected": String(d.value === n),
					"aria-disabled": t.disabled ? "true" : void 0,
					onMousedown: (e) => e.preventDefault(),
					onClick: () => re(t)
				}, [X("span", t.label), t.description ? X("span", { class: "sol-hint" }, t.description) : null]))), p.value ? X("p", { class: "sol-ui-combo-message" }, a.value.loading) : m.value ? X("div", { class: "sol-ui-combo-message" }, [X("p", a.value.loadFailed), X(DS, {
					variant: "inline",
					onClick: ae
				}, () => a.value.retry)]) : T.value.length ? null : X("p", { class: "sol-ui-combo-message" }, a.value.noResults)]),
				X("p", {
					id: e.id + "-status",
					class: "sol-ui-sr-only",
					role: "status"
				}, l.value ? p.value ? a.value.loading : m.value ? a.value.loadFailed : T.value.length ? "" : a.value.noResults : ""),
				e.clearable ? null : X(DS, {
					variant: "inline",
					disabled: !S() || !u.value && !e.modelValue,
					onClick: ie
				}, () => a.value.clear)
			]);
		};
	}
}), zC = /* @__PURE__ */ H({
	name: "SCombobox",
	inheritAttrs: !1,
	props: {
		...yC,
		...sC,
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
		openOnFocus: {
			type: Boolean,
			default: !0
		},
		commitOn: {
			type: Array,
			default: () => ["enter"]
		},
		placeholder: String
	},
	slots: Object,
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0,
		clear: (e) => !0,
		search: (e) => !0,
		open: () => !0,
		close: () => !0,
		invalid: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(null), u = /* @__PURE__ */ F(e.modelValue ?? ""), d = /* @__PURE__ */ F(!1), f = /* @__PURE__ */ F(-1), p = /* @__PURE__ */ F(!1), m = /* @__PURE__ */ F([]), h = /* @__PURE__ */ F(!1), g = /* @__PURE__ */ F(!1), _ = /* @__PURE__ */ F(""), v = /* @__PURE__ */ F(!1), { position: y, locate: b } = MS(d, s, l, !0, !0), x = Y(() => u.value !== (e.modelValue ?? "")), S = () => !Q(e) && !$(e), C = (e) => e.normalize("NFKC").trim().toLocaleLowerCase(a.value.code), w = Y(() => e.loadOptions ? m.value : m.value.filter((e) => C(e.label).includes(C(u.value)))), T = () => w.value.map((e, t) => ({
			item: e,
			index: t
		})).filter(({ item: e }) => !e.disabled), E = !1, D = !1, O = !1, k = !1, A = 0;
		function j(e) {
			let t = /* @__PURE__ */ new Set();
			return e.filter((e) => e && typeof e.value == "string" && !!e.value && typeof e.label == "string" && !t.has(e.value) && !!t.add(e.value)).map((e) => ({ ...e }));
		}
		function ee() {
			f.value = -1, p.value = !1;
		}
		let M = LC({
			loader: () => e.loadOptions,
			available: () => d.value && S() && !E,
			pending: () => {
				h.value = !0, g.value = !1, m.value = [], ee();
			},
			resolved: (e) => {
				m.value = j(e), ee();
			},
			rejected: () => {
				g.value = !0;
			},
			settled: () => {
				h.value = !1, z(b);
			}
		});
		function te() {
			M.stop(), ee(), v.value = !1, d.value && (d.value = !1, r("close"));
		}
		function ne() {
			k = !0, c.value?.focus({ preventScroll: !0 }), k = !1;
		}
		function re() {
			S() && !E && (r("search", u.value), e.loadOptions && M.schedule(u.value, e.debounce));
		}
		function ie() {
			!S() || E || d.value || (d.value = !0, r("open"), re());
		}
		function ae() {
			u.value = e.modelValue ?? "", _.value = "";
		}
		function oe(t) {
			let n = ++A;
			u.value = t.value ?? "", _.value = "", te(), e.modelValue !== t.value && r("update:modelValue", t.value), r("change", t), z(() => {
				O || n !== A || (ae(), pe.validate());
			});
		}
		function se() {
			S() && !E && (x.value ? oe({
				value: u.value === "" ? null : u.value,
				reason: "custom"
			}) : te());
		}
		function ce(e) {
			!S() || e.disabled || E || (oe({
				value: e.label,
				reason: "select",
				option: { ...e }
			}), ne());
		}
		function le(e) {
			S() && (A++, u.value = e.target.value, ee(), _.value = "", E || (d.value ? re() : ie()));
		}
		function ue() {
			A++, D = E, E = !1, ae(), te(), ne();
		}
		function de() {
			S() && !E && e.loadOptions && (ne(), d.value || (d.value = !0, r("open")), r("search", u.value), M.run(u.value));
		}
		function fe() {
			return x.value ? a.value.comboboxUncommitted : "";
		}
		let pe = iC(e, () => e.modelValue, {
			focus: () => c.value?.focus(),
			validateIntrinsic: () => (_.value = fe(), _.value && r("invalid", _.value), !_.value),
			intrinsicError: () => _.value,
			resetIntrinsic: () => {
				_.value = "";
			}
		}), me = dC(e, n, {
			always: !0,
			locale: () => a.value,
			hasValue: () => e.modelValue !== null || !!u.value,
			disabled: () => Q(e),
			readonly: () => $(e),
			error: () => rC(e),
			loading: () => h.value,
			clear: () => {
				A++, D = E, E = !1, u.value = "", _.value = "", g.value = !1, te(), e.modelValue !== null && r("update:modelValue", null), r("change", {
					value: null,
					reason: "clear"
				}), r("clear", {
					value: null,
					reason: "clear"
				});
			},
			reconcile: ae,
			validate: pe.validate,
			focus: ne,
			element: () => c.value,
			trigger: (t) => X("button", {
				type: "button",
				class: "sol-button",
				disabled: !S(),
				"aria-label": e.label + " " + (d.value ? a.value.close : a.value.choose),
				"aria-haspopup": "listbox",
				"aria-controls": e.id + "-options",
				"aria-expanded": String(d.value),
				onMousedown: (e) => e.preventDefault(),
				onClick: () => {
					d.value ? te() : ie(), ne();
				}
			}, [t])
		});
		function he(t) {
			if (!(!S() || E || t.isComposing || t.keyCode === 229)) {
				if (t.key === "Escape" && (d.value || x.value)) t.preventDefault(), t.stopPropagation(), ue();
				else if (t.key === "Enter") {
					let n = p.value && d.value ? w.value[f.value] : void 0;
					(n || e.commitOn.includes("enter") || x.value || d.value) && (t.preventDefault(), n ? ce(n) : e.commitOn.includes("enter") && se());
				} else {
					if (t.key === "ArrowDown" || t.key === "ArrowUp") {
						t.preventDefault(), ie();
						let e = T(), n = e.findIndex((e) => e.index === f.value), r = t.key === "ArrowDown" ? 1 : -1;
						f.value = (n < 0 ? r === 1 ? e[0] : e.at(-1) : e[(n + r + e.length) % e.length])?.index ?? -1, p.value = f.value >= 0;
					} else d.value && p.value && (t.key === "Home" || t.key === "End") && (t.preventDefault(), f.value = (t.key === "Home" ? T()[0] : T().at(-1))?.index ?? -1);
					t.defaultPrevented && z(() => l.value?.querySelector("[aria-selected=\"true\"]")?.scrollIntoView?.({ block: "nearest" }));
				}
			}
		}
		function ge(t) {
			let n = t.relatedTarget;
			if (n && o.value?.contains(n)) return;
			let r = A;
			z(() => {
				O || r !== A || o.value?.contains(document.activeElement) || (!E && e.commitOn.includes("blur") && se(), te(), pe.validate());
			});
		}
		let _e = (e) => {
			d.value && !o.value?.contains(e.target) && te();
		};
		return V(() => e.options, (t) => {
			e.loadOptions || (m.value = j(t)), ee();
		}, {
			immediate: !0,
			deep: !0
		}), V(() => e.modelValue, () => {
			A++, D ||= E, E = !1, ae(), te();
		}), V(() => [
			Q(e),
			$(e),
			e.loadOptions
		], () => {
			A++, D ||= E, E = !1, ae(), te(), e.loadOptions || (m.value = j(e.options));
		}), V([
			x,
			() => e.required,
			a
		], () => {
			c.value?.setCustomValidity(Q(e) ? "" : fe());
		}, { flush: "post" }), Yi(() => document.addEventListener("pointerdown", _e)), Qi(() => {
			O = !0, A++, M.dispose(), document.removeEventListener("pointerdown", _e);
		}), i({
			...pe,
			clear: me.clear,
			retry: de
		}), () => {
			let r = rC(e), i = p.value && d.value && !h.value && !g.value ? w.value[f.value] : void 0;
			return X("div", {
				ref: o,
				class: ["sol-field sol-ui-combobox", t.class],
				onFocusout: ge
			}, [
				SC(e, n, a.value.required),
				X("div", { ref: s }, me.native(X("input", ks(t, {
					ref: c,
					id: e.id,
					class: "sol-input",
					type: "text",
					name: void 0,
					value: u.value,
					placeholder: e.placeholder,
					disabled: Q(e),
					readonly: $(e),
					required: e.required,
					role: "combobox",
					"aria-autocomplete": "list",
					"aria-haspopup": "listbox",
					"aria-expanded": String(d.value),
					"aria-controls": e.id + "-options",
					"aria-activedescendant": i ? e.id + "-option-" + f.value : void 0,
					"aria-invalid": r ? "true" : void 0,
					"aria-describedby": [bC(e, n, r, t["aria-describedby"]), e.id + "-status"].filter(Boolean).join(" "),
					autocomplete: "off",
					onInput: le,
					onKeydown: he,
					onClick: ie,
					onFocus: () => {
						e.openOnFocus && !k && ie();
					},
					onCompositionstart: () => {
						D = !1, E = !0, M.stop(), ee();
					},
					onCompositionend: (t) => {
						E = !1, D ? (D = !1, t.target.value = u.value) : o.value?.contains(document.activeElement) ? le(t) : (A++, u.value = t.target.value, ee(), e.commitOn.includes("blur") && se(), te(), pe.validate());
					}
				})))),
				t.name ? X("input", {
					type: "hidden",
					name: t.name,
					value: e.modelValue ?? "",
					disabled: Q(e),
					form: t.form
				}) : null,
				...xC(e, n, r),
				X("div", {
					ref: l,
					popover: "manual",
					hidden: !d.value,
					class: "sol-ui-floating sol-ui-combo-panel sol-ui-combobox-panel",
					style: y.value,
					onKeydown: (e) => {
						e.key === "Escape" && d.value && (e.preventDefault(), e.stopPropagation(), ue());
					}
				}, [
					X("ul", {
						id: e.id + "-options",
						role: "listbox",
						"aria-label": e.label,
						hidden: h.value || g.value || !w.value.length
					}, w.value.map((t, n) => X("li", {
						id: e.id + "-option-" + n,
						key: t.value,
						role: "option",
						"aria-selected": String(p.value && f.value === n),
						"aria-disabled": t.disabled ? "true" : void 0,
						"aria-label": [t.label, t.description].filter(Boolean).join(" · "),
						onMousedown: (e) => e.preventDefault(),
						onClick: () => ce(t)
					}, [X("span", { class: "sol-ui-combobox-ellipsis" }, t.label), t.description ? X("span", { class: "sol-hint sol-ui-combobox-ellipsis" }, t.description) : null]))),
					h.value ? X("p", { class: "sol-ui-combo-message" }, a.value.loading) : g.value ? X("div", { class: "sol-ui-combo-message" }, [X("p", a.value.loadFailed), X("button", {
						class: "sol-button",
						type: "button",
						onClick: de
					}, a.value.retry)]) : w.value.length ? null : X("p", { class: "sol-ui-combo-message" }, a.value.noResults),
					!h.value && !g.value && w.value.length ? X("details", {
						open: v.value,
						class: "sol-ui-combobox-details",
						onToggle: (e) => {
							v.value = e.target.open, z(b);
						}
					}, [X("summary", a.value.comboboxDetails), v.value ? X("ul", w.value.map((e) => X("li", { key: e.value }, [
						e.label,
						e.description ? X("p", { class: "sol-hint" }, e.description) : null,
						e.disabled ? X("span", a.value.unavailable) : null
					]))) : null]) : null
				]),
				X("p", {
					id: e.id + "-status",
					class: "sol-ui-sr-only",
					role: "status"
				}, d.value ? h.value ? a.value.loading : g.value ? a.value.loadFailed : w.value.length ? "" : a.value.noResults : "")
			]);
		};
	}
}), BC = /* @__PURE__ */ H({
	name: "SBreadcrumbs",
	inheritAttrs: !1,
	props: {
		items: {
			type: Array,
			required: !0
		},
		current: String,
		label: String,
		locale: Object
	},
	emits: { navigate: (e, t) => !0 },
	setup(e, { attrs: t, emit: n }) {
		let r = Nx(() => e.locale);
		return () => X("nav", {
			...t,
			class: ["sol-breadcrumbs sol-ui-breadcrumbs", t.class],
			"aria-label": e.label || r.value.breadcrumb
		}, X("ol", e.items.map((t, r) => {
			let i = e.current === void 0 ? r === e.items.length - 1 : t.id === e.current;
			return X("li", {
				key: t.id,
				"aria-current": i ? "page" : void 0
			}, i ? X("span", t.label) : t.disabled ? X("span", { "aria-disabled": "true" }, t.label) : t.href ? X("a", {
				href: t.href,
				onClick: (e) => n("navigate", t, e)
			}, t.label) : X(DS, {
				variant: "inline",
				onClick: (e) => n("navigate", t, e)
			}, () => t.label));
		})));
	}
}), VC = /* @__PURE__ */ H({
	name: "SAvatar",
	inheritAttrs: !1,
	props: {
		label: {
			type: String,
			required: !0
		},
		src: String,
		initials: String,
		size: {
			type: Number,
			default: 40
		}
	},
	emits: { error: (e) => !0 },
	setup(e, { attrs: t, slots: n, emit: r }) {
		let i = /* @__PURE__ */ F(!1);
		return V(() => e.src, () => i.value = !1), () => X("span", {
			...t,
			class: ["sol-avatar sol-ui-avatar", t.class],
			role: "img",
			"aria-label": e.label,
			style: {
				width: e.size + "px",
				height: e.size + "px"
			}
		}, e.src && !i.value ? X("img", {
			src: e.src,
			alt: "",
			"aria-hidden": "true",
			onError: (e) => {
				i.value = !0, r("error", e);
			}
		}) : X("span", { "aria-hidden": "true" }, n.default?.() || e.initials || Array.from(e.label.trim()).slice(0, 2).join("")));
	}
}), HC = /* @__PURE__ */ H({
	name: "SStepper",
	inheritAttrs: !1,
	props: {
		id: {
			type: String,
			required: !0
		},
		label: String,
		labelPosition: {
			type: String,
			default: "inline"
		},
		items: {
			type: Array,
			required: !0
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
		"update:modelValue": (e) => !0,
		change: (e) => !0
	},
	setup(e, { attrs: t, emit: n }) {
		let r = Nx(() => e.locale), i = (t) => {
			e.interactive && !e.disabled && !e.readonly && !t.disabled && e.modelValue !== t.id && (n("update:modelValue", t.id), n("change", t.id));
		};
		return () => X("nav", {
			...t,
			id: e.id,
			class: ["sol-ui-stepper", t.class],
			"data-label-position": e.labelPosition,
			"aria-label": e.label || r.value.steps
		}, X("ol", e.items.map((t, n) => {
			let a = e.modelValue === t.id, o = e.completed.includes(t.id), s = () => [
				X("span", {
					class: "sol-ui-step-number",
					"aria-hidden": "true"
				}, o ? "✓" : Fx(n + 1, r.value)),
				X("span", { class: "sol-ui-step-copy" }, [X("span", t.label), t.description ? X("span", { class: "sol-hint" }, t.description) : null]),
				a || o ? X("span", { class: "sol-ui-sr-only" }, a ? r.value.currentStep : r.value.completeStep) : null
			];
			return X("li", {
				key: t.id,
				"aria-current": a ? "step" : void 0,
				"data-state": a ? "current" : o ? "complete" : "upcoming"
			}, [e.interactive ? X(DS, {
				variant: "subtle",
				disabled: e.disabled || !!t.disabled,
				"aria-disabled": e.readonly ? "true" : void 0,
				onClick: () => i(t)
			}, s) : X("div", {
				class: "sol-ui-step-content",
				"aria-disabled": t.disabled ? "true" : void 0
			}, s()), n < e.items.length - 1 ? X("span", {
				class: "sol-ui-step-connector",
				"aria-hidden": "true"
			}) : null]);
		})));
	}
}), UC = /* @__PURE__ */ H({
	name: "SBarChart",
	inheritAttrs: !1,
	props: {
		id: {
			type: String,
			required: !0
		},
		label: {
			type: String,
			required: !0
		},
		items: {
			type: Array,
			required: !0
		},
		type: {
			type: String,
			default: "bar"
		},
		max: Number,
		loading: Boolean,
		showTable: {
			type: Boolean,
			default: !0
		},
		categoryLabel: String,
		valueLabel: String,
		locale: Object
	},
	setup(e, { attrs: t }) {
		let n = Nx(() => e.locale), r = /* @__PURE__ */ F(null), i = /* @__PURE__ */ F(480), a = Y(() => e.max ?? Math.max(1, ...e.items.map((e) => e.value))), o = Y(() => Number.isFinite(a.value) && a.value > 0 && e.items.every((e) => Number.isFinite(e.value) && e.value >= 0 && e.value <= a.value));
		return V(r, (e, t, n) => {
			if (!e) return;
			let r = (e) => {
				e > 0 && (i.value = e);
			};
			if (r(e.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
			let a = new ResizeObserver(([e]) => {
				e && r(e.contentRect.width);
			});
			a.observe(e), n(() => a.disconnect());
		}, { flush: "post" }), () => {
			let s = Math.max(0, i.value - 32), c = s / e.items.length, l = Math.max(1, Math.min(8, Math.floor((c - 8) / 12))), u = e.items.reduce((e, t) => e + t.value, 0), d = (t) => [16 + c * (t + .5), 164 - e.items[t].value / a.value * 140], f = (e) => `var(--sol-color-categorical-${e % 8 + 1}-foreground)`, p = -Math.PI / 2, m = () => u === 0 ? [X("circle", {
				cx: i.value / 2,
				cy: 96,
				r: 72,
				fill: "none",
				stroke: "var(--sol-color-control-border)"
			})] : e.items.filter((e) => e.value > 0).map((t) => {
				let r = e.items.indexOf(t), a = t.value / u, o = p;
				p += a * Math.PI * 2;
				let s = i.value / 2, c = (e) => `${s + 72 * Math.cos(e)} ${96 + 72 * Math.sin(e)}`, l = `${r + 1}. ${t.label}: ${Fx(t.value, n.value)}`;
				return X("g", { key: t.id }, [a >= 1 ? X("circle", {
					cx: s,
					cy: 96,
					r: 72,
					fill: f(r)
				}, X("title", l)) : X("path", {
					d: `M ${s} 96 L ${c(o)} A 72 72 0 ${+(a > .5)} 1 ${c(p)} Z`,
					fill: f(r),
					stroke: "var(--sol-color-surface)",
					"stroke-width": 1
				}, X("title", l)), X("text", {
					x: s + 72 * .65 * Math.cos(o + a * Math.PI),
					y: 96 + 72 * .65 * Math.sin(o + a * Math.PI),
					"text-anchor": "middle",
					"dominant-baseline": "middle",
					fill: `var(--sol-color-categorical-${r % 8 + 1}-background)`,
					"font-size": 12
				}, String(r + 1))]);
			});
			return X("figure", {
				...t,
				id: e.id,
				class: ["sol-ui-bar-chart", t.class],
				"data-chart-type": e.type,
				"aria-labelledby": e.id + "-caption",
				"aria-busy": String(e.loading)
			}, [X("figcaption", { id: e.id + "-caption" }, e.label), e.loading ? X("p", { role: "status" }, n.value.tableLoading) : !o.value || e.type === "pie" && !Number.isFinite(u) ? X("p", { role: "alert" }, n.value.chartInvalid) : e.items.length ? [
				X("svg", {
					ref: r,
					viewBox: `0 0 ${i.value} 200`,
					role: "img",
					"aria-labelledby": e.id + "-svg-title",
					preserveAspectRatio: "xMidYMid meet"
				}, [X("title", { id: e.id + "-svg-title" }, e.label), ...e.type === "pie" ? m() : [
					X("line", {
						x1: 16,
						y1: 164,
						x2: 16 + s,
						y2: 164,
						stroke: "var(--sol-color-control-border)"
					}),
					e.type === "line" ? X("polyline", {
						points: e.items.map((e, t) => d(t).join(",")).join(" "),
						fill: "none",
						stroke: "var(--sol-color-accent)",
						"stroke-width": 2
					}) : null,
					...e.items.map((t, r) => {
						let i = Math.min(48, c * .6), o = 16 + c * (r + .5), s = t.value / a.value * 140, u = Array.from(t.label), d = u.length > l ? u.slice(0, l - 1).join("") + "…" : t.label;
						return X("g", { key: t.id }, [
							e.type === "line" ? X("circle", {
								cx: o,
								cy: 164 - s,
								r: 4,
								fill: "var(--sol-color-accent)"
							}) : X("rect", {
								x: o - i / 2,
								y: 164 - s,
								width: i,
								height: s,
								fill: "var(--sol-color-accent)"
							}),
							X("text", {
								x: o,
								y: Math.max(14, 156 - s),
								"text-anchor": "middle",
								class: "sol-ui-chart-value"
							}, Fx(t.value, n.value)),
							X("text", {
								x: o,
								y: 188,
								"text-anchor": "middle",
								class: "sol-ui-chart-label"
							}, d)
						]);
					})
				]]),
				e.type === "pie" ? X("ol", { class: "sol-ui-chart-legend" }, e.items.map((t, r) => X("li", { key: t.id }, [
					X("span", {
						"aria-hidden": "true",
						class: "sol-ui-chart-order"
					}, [X("span", {
						class: "sol-ui-chart-swatch",
						style: { background: f(r) }
					}), String(r + 1) + "."]),
					X("span", { class: "sol-ui-chart-name" }, t.label),
					X("span", { class: "sol-ui-chart-value" }, [X("span", { class: "sol-ui-chart-value-label" }, (e.valueLabel || n.value.chartValue) + " "), Fx(t.value, n.value)])
				]))) : null,
				X("table", { class: ["sol-ui-chart-table", e.showTable ? "" : "sol-ui-sr-only"] }, [
					X("caption", e.label),
					X("thead", X("tr", [X("th", { scope: "col" }, e.categoryLabel || n.value.chartCategory), X("th", { scope: "col" }, e.valueLabel || n.value.chartValue)])),
					X("tbody", e.items.map((e) => X("tr", { key: e.id }, [X("th", { scope: "row" }, e.label), X("td", Fx(e.value, n.value))])))
				])
			] : X("p", { role: "status" }, n.value.tableEmpty)]);
		};
	}
}), WC = /* @__PURE__ */ H({
	name: "STabs",
	inheritAttrs: !1,
	props: {
		...vC,
		modelValue: {
			type: String,
			required: !0
		},
		items: {
			type: Array,
			required: !0
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
		"update:modelValue": (e) => !0,
		change: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r }) {
		let i = /* @__PURE__ */ F(null), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ F(e.modelValue), s = () => e.items.filter((e) => !e.disabled), c = () => e.items.find((t) => t.value === e.modelValue && !t.disabled) || s()[0];
		function l(t) {
			e.disabled || e.readonly || !s().some((e) => e.value === t) || e.modelValue !== t && (r("update:modelValue", t), r("change", t));
		}
		V(() => [e.modelValue, ...e.items.flatMap((e) => [e.value, e.disabled])], async () => {
			let t = typeof document > "u" ? null : document.activeElement, n = !!t && !!i.value?.contains(t);
			s().some((e) => e.value === o.value) && n || (o.value = c()?.value || "");
			let l = c();
			l && l.value !== e.modelValue && !e.readonly && !e.disabled && r("update:modelValue", l.value), await z(), n && t && (!t.isConnected || t.disabled) && a.get(o.value)?.focus();
		}, { immediate: !0 });
		function u(t, n) {
			if (t.isComposing || e.disabled) return;
			let r = s(), i = r.findIndex((e) => e.value === n), c;
			if (t.key === "Home") c = 0;
			else if (t.key === "End") c = r.length - 1;
			else if (t.key === (e.orientation === "horizontal" ? "ArrowRight" : "ArrowDown")) c = (i + 1) % r.length;
			else if (t.key === (e.orientation === "horizontal" ? "ArrowLeft" : "ArrowUp")) c = (i - 1 + r.length) % r.length;
			else if (t.key === "Enter" || t.key === " ") {
				t.preventDefault(), l(n);
				return;
			}
			c !== void 0 && r.length && (t.preventDefault(), o.value = r[c].value, a.get(o.value)?.focus(), e.activation === "automatic" && l(o.value));
		}
		return () => X("div", {
			...t,
			class: ["sol-ui-tabs", t.class],
			"data-orientation": e.orientation
		}, [
			X("div", {
				class: "sol-label",
				id: e.id + "-label"
			}, n.label?.() || e.label),
			X("div", {
				ref: i,
				role: "tablist",
				"aria-labelledby": e.id + "-label",
				"aria-orientation": e.orientation,
				"aria-describedby": bC(e, n, e.error, t["aria-describedby"]),
				class: "sol-ui-tablist"
			}, e.items.map((t, n) => X("button", {
				ref: (e) => {
					e ? a.set(t.value, e) : a.delete(t.value);
				},
				type: "button",
				class: "sol-button subtle",
				id: e.id + "-tab-" + n,
				role: "tab",
				"aria-selected": String(c()?.value === t.value),
				"aria-controls": e.id + "-panel-" + n,
				"aria-disabled": e.readonly ? "true" : void 0,
				disabled: e.disabled || t.disabled,
				tabindex: !e.disabled && !t.disabled && o.value === t.value ? 0 : -1,
				onFocus: () => o.value = t.value,
				onClick: () => l(t.value),
				onKeydown: (e) => u(e, t.value)
			}, t.label))),
			...e.items.map((t, r) => X("section", {
				id: e.id + "-panel-" + r,
				role: "tabpanel",
				"aria-labelledby": e.id + "-tab-" + r,
				hidden: c()?.value !== t.value,
				tabindex: 0,
				class: "sol-ui-tabpanel"
			}, n["panel-" + t.value]?.({ item: t }) || n.default?.({ item: t }) || [])),
			...xC(e, n)
		]);
	}
}), GC = /* @__PURE__ */ H({
	name: "SSnackbar",
	inheritAttrs: !1,
	props: {
		id: {
			type: String,
			required: !0
		},
		modelValue: Boolean,
		message: {
			type: String,
			required: !0
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
			default: !0
		},
		returnFocus: Object,
		locale: Object
	},
	emits: {
		"update:modelValue": (e) => !0,
		close: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r }) {
		let i = Nx(() => e.locale), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ F(""), s, c = 0, l = 0, u = !1, d = !1, f = null, p = "programmatic", m = !1, h = () => {
			s !== void 0 && (clearTimeout(s), s = void 0, c = Math.max(0, c - (Date.now() - l)));
		}, g = (e) => {
			h(), p = e, r("update:modelValue", !1);
		};
		function _() {
			s !== void 0 || !m || !e.modelValue || e.duration <= 0 || !Number.isFinite(e.duration) || u || d || document.hidden || (l = Date.now(), s = setTimeout(() => {
				s = void 0, c = 0, g("timeout");
			}, c));
		}
		let v = (t) => {
			let n = e.returnFocus || f;
			t && n?.isConnected && n !== document.body && document.activeElement === document.body && n.focus();
		}, y = () => ({
			accent: i.value.toastAccent,
			info: i.value.toastInfo,
			success: i.value.toastSuccess,
			warning: i.value.toastWarning,
			danger: i.value.toastDanger
		})[e.tone] || i.value.notification;
		async function b() {
			o.value = "", await z(), e.modelValue && (o.value = y() + ": " + e.message);
		}
		V(() => [
			e.modelValue,
			e.message,
			e.duration,
			e.tone
		], async ([t], n) => {
			if (!m) return;
			let i = !!a.value?.contains(document.activeElement);
			h(), t ? (n?.[0] || (f = document.activeElement instanceof HTMLElement ? document.activeElement : null, u = !1, d = !1), c = Math.max(0, e.duration), await b(), _()) : (o.value = "", await z(), v(i), n?.[0] && (r("close", p), p = "programmatic"));
		});
		let x = () => document.hidden ? h() : _();
		return Yi(() => {
			m = !0, document.addEventListener("visibilitychange", x), e.modelValue && (f = document.activeElement instanceof HTMLElement ? document.activeElement : null, c = Math.max(0, e.duration), b(), _());
		}), Qi(() => {
			h(), document.removeEventListener("visibilitychange", x);
			let t = e.returnFocus || f;
			a.value?.contains(document.activeElement) && t?.isConnected && t.focus(), m = !1;
		}), () => X(zr, { to: "body" }, [X("p", {
			id: e.id + "-live",
			class: "sol-ui-sr-only",
			role: e.live === "off" ? void 0 : e.live === "assertive" ? "alert" : "status",
			"aria-live": e.live,
			"aria-atomic": "true"
		}, o.value), e.modelValue ? X("section", {
			...t,
			ref: a,
			id: e.id,
			class: ["sol-toast sol-tone sol-ui-toast", t.class],
			"data-tone": e.tone,
			role: "region",
			"aria-label": e.label || i.value.notification,
			onMouseenter: () => {
				u = !0, h();
			},
			onMouseleave: () => {
				u = !1, _();
			},
			onFocusin: () => {
				d = !0, h();
			},
			onFocusout: () => {
				z(() => {
					d = !!a.value?.contains(document.activeElement), _();
				});
			}
		}, [
			X("svg", {
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
			}, X("path", { d: Ah[e.tone === "success" ? "check" : e.tone === "danger" ? "close" : "info"] })),
			X("div", { class: "sol-ui-toast-message" }, [X("strong", { class: "sol-ui-toast-tone" }, y()), n.default?.() || e.message]),
			n.action?.(),
			e.dismissible ? X("button", {
				type: "button",
				class: "sol-button inline-action",
				"aria-label": i.value.close,
				onClick: () => g("close")
			}, i.value.close) : null
		]) : null]);
	}
});
function KC(e) {
	let t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(), r = /* @__PURE__ */ F(), i, a = (e) => ({
		source: e.source,
		input: e.input,
		previousValue: e.previousValue,
		value: e.choices[e.index]
	});
	function o() {
		let a = i;
		if (i = void 0, t.value = !1, n.value = void 0, r.value = void 0, window.removeEventListener("pointermove", p, !0), window.removeEventListener("pointerup", m, !0), window.removeEventListener("pointercancel", h, !0), window.removeEventListener("blur", _), window.removeEventListener("keydown", y, !0), window.removeEventListener("keyup", S, !0), document.removeEventListener("visibilitychange", v), a?.target?.removeEventListener("lostpointercapture", g), a?.pointerId !== void 0) try {
			a.target?.hasPointerCapture(a.pointerId) && a.target.releasePointerCapture(a.pointerId);
		} catch {}
		return e.stop?.(), a;
	}
	function s(t, n = !0) {
		if (!i) return;
		let r = o();
		e.cancel({
			...a(r),
			reason: t
		}), n && r.restore();
	}
	function c() {
		return i ? e.disabled(i.source) ? (s("disabled", !1), !1) : i.choices === e.choices() || (s("configuration"), !1) : !1;
	}
	function l(t, r = !1) {
		if (!c()) return;
		let o = i, s = Math.max(0, Math.min(o.choices.length - 1, t));
		(s !== o.index || r) && (o.index = s, o.changed = !0, n.value = o.choices[s], e.preview(a(o)));
	}
	function u() {
		if (!c()) return;
		let t = o();
		t.changed && e.commit(a(t));
	}
	function d(n, a, o) {
		if (e.disabled(n) || !e.choices().length || (s("close", !1), e.disabled(n) || !e.choices().length)) return !1;
		let c = e.choices(), l = e.pixels();
		i = {
			source: n,
			input: a,
			choices: c,
			previousValue: e.value(),
			index: Math.max(0, c.indexOf(o ?? "")),
			y: 0,
			remainder: 0,
			pixels: Number.isFinite(l) && l > 0 ? l : 10,
			changed: !1,
			restore: () => {}
		}, t.value = !0, r.value = n, window.addEventListener("blur", _), window.addEventListener("keydown", y, !0), document.addEventListener("visibilitychange", v);
		let u = i, d = e.start(n);
		return i === u && (u.restore = d, !0);
	}
	function f(t, n, r) {
		if (t.button !== 0 || t.isPrimary === !1 || e.disabled(n) || (t.preventDefault(), t.stopPropagation(), !d(n, "pointer", r))) return;
		let a = i;
		a.pointerId = t.pointerId, a.target = t.currentTarget, a.y = t.clientY, a.target.addEventListener("lostpointercapture", g), window.addEventListener("pointermove", p, {
			capture: !0,
			passive: !1
		}), window.addEventListener("pointerup", m, !0), window.addEventListener("pointercancel", h, !0);
		try {
			a.target.setPointerCapture(t.pointerId);
		} catch {}
		n === "list" && l(a.index, !0);
	}
	function p(t) {
		if (!i || t.pointerId !== i.pointerId || !c()) return;
		t.preventDefault();
		let n = i;
		if (n.source === "list") {
			let n = e.listIndex?.(t);
			n !== void 0 && l(n), i && e.listMove?.(t);
			return;
		}
		n.remainder += n.y - t.clientY, n.y = t.clientY;
		let r = Math.trunc(n.remainder / n.pixels);
		if (!r) return;
		n.remainder -= r * n.pixels;
		let a = n.index + r;
		(a < 0 || a >= n.choices.length) && (n.remainder = 0), l(a);
	}
	function m(e) {
		i && e.pointerId === i.pointerId && (p(e), i && (e.preventDefault(), u()));
	}
	function h(e) {
		e.pointerId === i?.pointerId && s("pointercancel");
	}
	function g(e) {
		e.pointerId === i?.pointerId && s("capture");
	}
	function _() {
		s("blur", !1);
	}
	function v() {
		document.hidden && s("blur", !1);
	}
	function y(e) {
		e.key === "Escape" && !e.isComposing && i && (e.preventDefault(), e.stopImmediatePropagation(), s("escape"));
	}
	let b = /* @__PURE__ */ new Set([
		"ArrowUp",
		"ArrowDown",
		"ArrowRight",
		"ArrowLeft",
		"PageUp",
		"PageDown",
		"Home",
		"End"
	]);
	function x(t, n) {
		if (t.isComposing || t.altKey || t.ctrlKey || t.metaKey || !b.has(t.key) || e.disabled("input") || (t.preventDefault(), t.stopPropagation(), i?.input === "pointer") || !i && !d("input", "keyboard", n)) return;
		window.addEventListener("keyup", S, !0);
		let r = i, a = t.shiftKey ? 10 : 1;
		l(t.key === "Home" ? 0 : t.key === "End" ? r.choices.length - 1 : r.index + (t.key === "PageUp" ? 10 : t.key === "PageDown" ? -10 : ["ArrowUp", "ArrowRight"].includes(t.key) ? a : -a), !r.changed);
	}
	function S(e) {
		i?.input === "keyboard" && b.has(e.key) && (e.preventDefault(), e.stopPropagation(), u());
	}
	return {
		active: t,
		preview: n,
		source: r,
		pointer: f,
		keyboard: x,
		cancel: s,
		propose: l,
		blur: _
	};
}
var qC = (e) => e && typeof e == "object" ? { ...e } : e, JC = (e, t) => e === t || !!e && !!t && typeof e == "object" && typeof t == "object" && e.start === t.start && e.end === t.end, YC = () => {
	let e = /* @__PURE__ */ new Date();
	return {
		y: e.getFullYear(),
		m: e.getMonth() + 1,
		d: e.getDate()
	};
}, XC = (e, t) => t === null ? "" : e === "single" && typeof t == "string" ? t : e === "range" && typeof t == "object" ? t.start + " ~ " + t.end : "";
function ZC(e, t) {
	return t === null || (e === "single" ? typeof t == "string" && !!wh(t) : typeof t == "object" && !!t && "start" in t && "end" in t && typeof t.start == "string" && typeof t.end == "string" && !!wh(t.start) && !!wh(t.end) && t.start <= t.end);
}
function QC(e) {
	let t = /* @__PURE__ */ new Date(0);
	return t.setUTCHours(0, 0, 0, 0), t.setUTCFullYear(e.y, e.m - 1, e.d), t;
}
function $C(e, t) {
	try {
		return new Intl.DateTimeFormat(e, {
			...t,
			calendar: "gregory",
			timeZone: "UTC"
		});
	} catch {
		return new Intl.DateTimeFormat("ko-KR", {
			...t,
			calendar: "gregory",
			timeZone: "UTC"
		});
	}
}
function ew(e, t) {
	return kx(e.formatToParts(QC(t)).map((e) => e.type === "day" ? ` ${e.value} ` : e.value).join("").replace(/\s+/g, " ").replace(/\s+([,.;])/g, "$1").trim(), String(t.d));
}
function tw(e, t) {
	return Yx(Ah[e], 20, 0, { class: ["sol-ui-picker-icon", t ? "sol-ui-picker-icon--" + t : void 0] });
}
var nw = {
	pickerPresentation: String,
	placement: {
		type: String,
		default: "bottom-start"
	}
}, rw = /* @__PURE__ */ H({
	name: "SDatePicker",
	inheritAttrs: !1,
	props: {
		...yC,
		...sC,
		mode: {
			type: String,
			default: "single"
		},
		modelValue: {
			type: [String, Object],
			default: null
		},
		displayFormatter: Function,
		...nw
	},
	slots: Object,
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0,
		invalid: (e) => !0,
		open: () => !0,
		close: (e) => !0,
		clear: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ F(XC(e.mode, e.modelValue)), s = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(""), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(YC()), d = /* @__PURE__ */ F(YC()), f = /* @__PURE__ */ F(null), p = /* @__PURE__ */ F(null), m = /* @__PURE__ */ F(null), h = /* @__PURE__ */ F(null), g = /* @__PURE__ */ F(null), _ = /* @__PURE__ */ new Map(), v = null, y = "close", b = 0, x = !1, S = !1, C = () => Number.isInteger(a.value.firstDay) && a.value.firstDay >= 0 && a.value.firstDay <= 6 ? a.value.firstDay : 0, w = () => !ZC(e.mode, e.modelValue) || e.modelValue === null ? null : typeof e.modelValue == "string" ? {
			start: e.modelValue,
			end: e.modelValue
		} : e.modelValue;
		function T() {
			let t = o.value.trim();
			if (!t) return {
				value: null,
				error: e.required ? a.value.dateRequired : ""
			};
			if (e.mode === "single") return {
				value: t,
				error: wh(t) ? "" : a.value.invalidDate
			};
			let n = /^(\d{4}-\d{2}-\d{2})\s*~\s*(\d{4}-\d{2}-\d{2})$/.exec(t);
			return n && wh(n[1]) && wh(n[2]) && n[1] <= n[2] ? {
				value: {
					start: n[1],
					end: n[2]
				},
				error: ""
			} : {
				value: null,
				error: a.value.invalidRange
			};
		}
		function E() {
			let t = T();
			if (!e.displayFormatter || s.value || t.error || t.value === null) return o.value;
			let n = (t) => oC(t, t, e.displayFormatter, a.value);
			return typeof t.value == "string" ? n(t.value) : n(t.value.start) + " ~ " + n(t.value.end);
		}
		function D() {
			s.value = !$(e) && !Q(e), s.value && e.displayFormatter && p.value && (p.value.value = o.value);
		}
		function O() {
			p.value?.setCustomValidity(rC(e) || T().error || (ZC(e.mode, e.modelValue) ? "" : a.value.invalidDate));
		}
		function k(t, n) {
			if (Q(e) || $(e)) return;
			let i = e.mode;
			o.value = XC(e.mode, t), c.value = "", JC(t, e.modelValue) || (r("update:modelValue", qC(t)), r("change", {
				mode: e.mode,
				value: qC(t),
				reason: n
			})), z(() => {
				!x && e.mode === i && !JC(t, e.modelValue) && (o.value = XC(e.mode, e.modelValue), c.value = ""), O();
			});
		}
		function A() {
			let t = T();
			return c.value = t.error, t.error ? (r("invalid", t.error), O(), !1) : (!Q(e) && !$(e) && k(t.value, "input"), !nC(e));
		}
		function j(e = "close") {
			y = e, l.value = !1, f.value = null;
		}
		function ee(t) {
			if (Q(e) || $(e)) return;
			v = t;
			let n = T(), r = n.error ? w()?.start : typeof n.value == "string" ? n.value : n.value?.start;
			u.value = wh(r) || YC(), d.value = u.value, f.value = null, l.value = !0;
		}
		async function M() {
			await z(), !x && l.value && (m.value?.open || h.value?.content()?.isConnected) && _.get(Sh(u.value))?.focus();
		}
		function te(t) {
			if (Q(e) || $(e)) return;
			u.value = t, d.value = t;
			let n = Sh(t);
			if (e.mode === "single") {
				k(n, "calendar"), j("select");
				return;
			}
			if (!f.value) {
				f.value = n, M();
				return;
			}
			let [r, i] = [f.value, n].sort();
			k({
				start: r,
				end: i
			}, "calendar"), j("select");
		}
		function ne(e) {
			if (e.isComposing) return;
			if (e.key === "Escape") {
				e.preventDefault(), e.stopPropagation(), j("escape");
				return;
			}
			if (!e.target.hasAttribute("data-calendar-day")) return;
			let t;
			if (e.key === "ArrowLeft") t = Dh(u.value, -1);
			else if (e.key === "ArrowRight") t = Dh(u.value, 1);
			else if (e.key === "ArrowUp") t = Dh(u.value, -7);
			else if (e.key === "ArrowDown") t = Dh(u.value, 7);
			else if (e.key === "Home") t = Dh(u.value, -((Eh(u.value) - C() + 7) % 7));
			else if (e.key === "End") t = Dh(u.value, 6 - (Eh(u.value) - C() + 7) % 7);
			else if (e.key === "PageUp" || e.key === "PageDown") t = Oh(u.value, (e.key === "PageUp" ? -1 : 1) * (e.shiftKey ? 12 : 1));
			else if (e.key === "Enter" || e.key === " ") {
				e.preventDefault(), te(u.value);
				return;
			}
			t && (e.preventDefault(), u.value = t, d.value = t, M());
		}
		V(l, async (t, n) => {
			let i = ++b;
			if (await z(), !(x || i !== b || t !== l.value)) {
				if (t) {
					if (e.pickerPresentation) return;
					m.value?.open || m.value?.showModal(), await M(), !x && l.value && i === b && r("open");
				} else if (n) {
					S = !1, m.value?.open && m.value.close();
					let t = v && !v.disabled ? v : p.value;
					!e.pickerPresentation && t?.isConnected && !Q(e) && t.focus(), r("close", y);
				}
			}
		}), V(() => e.pickerPresentation, (t, n) => {
			l.value && !!t != !!n && (j(), m.value?.open && m.value.close(), z(() => {
				let t = v && !v.disabled ? v : p.value;
				!x && !l.value && t?.isConnected && !Q(e) && t.focus();
			}));
		}), V(a, () => {
			c.value &&= T().error, z(O);
		}), V(() => e.modelValue, (t) => {
			o.value = XC(e.mode, t), c.value = "", f.value = null, z(O);
		}), V(() => e.mode, () => {
			j("mode"), o.value = "", c.value = "", r("update:modelValue", null), r("change", {
				mode: e.mode,
				value: null,
				reason: "mode"
			}), z(O);
		}), V(() => [Q(e), $(e)], () => {
			(Q(e) || $(e)) && (s.value = !1, j("disabled"));
		}), V(() => [
			rC(e),
			e.required,
			o.value
		], () => z(O)), Yi(O), Qi(() => {
			x = !0, b++, m.value?.open && (m.value.close(), v?.isConnected && v.focus());
		});
		let re = iC(e, () => T().value, {
			focus: () => p.value?.focus(),
			validateIntrinsic: A,
			intrinsicError: () => c.value,
			resetIntrinsic: () => {
				c.value = "";
			}
		}), ie = re.validate;
		function ae(t) {
			return X("button", {
				ref: g,
				type: "button",
				class: "sol-button sol-date-open",
				disabled: Q(e) || $(e),
				"aria-label": e.label + " " + a.value.calendar,
				"aria-haspopup": "dialog",
				"aria-controls": e.id + "-calendar",
				"aria-expanded": String(l.value),
				onClick: () => ee(g.value)
			}, [t]);
		}
		let oe = dC(e, n, {
			locale: () => a.value,
			hasValue: () => e.modelValue !== null || o.value.length > 0 || f.value !== null,
			disabled: () => Q(e),
			readonly: () => $(e),
			error: () => rC(e) || c.value,
			clear: () => {
				v = p.value, k(null, "clear"), j("select"), r("clear", {
					value: null,
					reason: "clear"
				});
			},
			reconcile: () => {
				o.value = XC(e.mode, e.modelValue), c.value = "", f.value = null;
			},
			validate: re.validate,
			focus: re.focus,
			element: () => p.value,
			icon: "calendar",
			trigger: ae
		});
		function se() {
			oe.enhanced() ? oe.clear() : Q(e) || $(e) || (k(null, "clear"), r("clear", {
				value: null,
				reason: "clear"
			}));
		}
		i({
			...re,
			clear: se
		});
		function ce(t, n) {
			return e.pickerPresentation ? X(FS, {
				ref: h,
				open: l.value,
				id: e.id + "-calendar",
				labelledby: e.id + "-title",
				describedby: e.id + "-keys",
				anchor: p.value?.closest(".sol-ui-input-frame,.sol-date-field") || p.value,
				returnFocus: v,
				presentation: e.pickerPresentation,
				placement: e.placement,
				width: "384px",
				panelClass: "sol-ui-calendar",
				initialFocus: () => _.get(Sh(u.value)),
				onRequestClose: j,
				onReady: () => {
					!x && l.value && !S && (S = !0, r("open"));
				}
			}, () => X("div", {
				class: "sol-ui-calendar-content",
				onKeydown: ne
			}, n)) : X("dialog", t, n);
		}
		return () => {
			let r = f.value ? {
				start: f.value,
				end: f.value
			} : w(), i = Sh(u.value), h = f.value ? [f.value, i].sort() : null, g = rC(e) || c.value || (ZC(e.mode, e.modelValue) ? "" : a.value.invalidDate), v = {
				...d.value,
				d: 1
			}, y = Sh(v), b = Array.from({ length: 42 }, (e, t) => {
				let n = t - (Eh(v) - C() + 7) % 7, r = Dh(v, n);
				return Sh(Dh(r, -n)) === y ? r : null;
			}), x = $C(a.value.code, {
				year: "numeric",
				month: "long",
				day: "numeric",
				weekday: "long"
			}), S = $C(a.value.code, { weekday: "short" }), O = $C(a.value.code, {
				year: "numeric",
				month: "long"
			}), k = Sh(YC()), A = X("input", ks({ onFocus: D }, {
				...t,
				ref: p,
				name: e.displayFormatter ? void 0 : t.name,
				id: e.id,
				type: "text",
				class: ["sol-input", t.class],
				value: E(),
				disabled: Q(e),
				readonly: $(e),
				required: e.required,
				maxlength: e.mode === "single" ? 10 : 25,
				autocomplete: "off",
				spellcheck: !1,
				placeholder: e.mode === "single" ? "YYYY-MM-DD" : "YYYY-MM-DD ~ YYYY-MM-DD",
				"aria-haspopup": "dialog",
				"aria-controls": e.id + "-calendar",
				...e.pickerPresentation ? { "aria-expanded": String(l.value) } : {},
				"aria-invalid": g ? "true" : void 0,
				"aria-describedby": bC(e, n, g, [e.id + "-format", t["aria-describedby"]].filter(Boolean).join(" ")),
				onInput: (t) => {
					Q(e) || $(e) || (o.value = t.target.value, c.value &&= T().error);
				},
				onBlur: () => {
					!Q(e) && !$(e) && ie(), s.value = !1;
				},
				onInvalid: (e) => {
					e.preventDefault(), ie(), p.value?.focus();
				},
				onKeydown: (e) => {
					e.isComposing || (e.key === "ArrowDown" && e.altKey ? (e.preventDefault(), ee(p.value)) : e.key === "Enter" && (e.preventDefault(), ie()));
				}
			}));
			return X("div", { class: "sol-field sol-ui-native-field sol-ui-date" }, [
				SC(e, n, a.value.required),
				e.displayFormatter && t.name != null ? X("input", {
					type: "hidden",
					name: t.name,
					form: t.form,
					value: XC(e.mode, e.modelValue),
					disabled: Q(e)
				}) : null,
				oe.enhanced() ? oe.native(A) : X("div", { class: "sol-date-field" }, [A, ae(tw("calendar"))]),
				X("span", {
					id: e.id + "-format",
					class: "sol-hint"
				}, e.mode === "single" ? "YYYY-MM-DD" : "YYYY-MM-DD ~ YYYY-MM-DD"),
				...xC(e, n, g),
				e.clearable ? null : X("button", {
					type: "button",
					class: "sol-button inline-action sol-ui-picker-clear",
					disabled: Q(e) || $(e),
					onPointerdown: (e) => lC(e, p.value),
					onClick: (e) => {
						se(), uC(e) || p.value?.focus();
					}
				}, a.value.clear),
				ce({
					ref: m,
					id: e.id + "-calendar",
					class: "sol-calendar-dialog sol-ui-calendar",
					"aria-labelledby": e.id + "-title",
					"aria-describedby": e.id + "-keys",
					onKeydown: ne,
					onCancel: (e) => {
						e.preventDefault(), j("escape");
					},
					onClose: () => {
						l.value && j();
					},
					onClick: (e) => {
						let t = m.value;
						if (!t || e.target !== t) return;
						let n = t.getBoundingClientRect();
						(e.clientX < n.left || e.clientX > n.right || e.clientY < n.top || e.clientY > n.bottom) && j("outside");
					}
				}, [
					X("div", { class: "sol-calendar-top" }, [X("strong", { id: e.id + "-title" }, e.mode === "single" ? a.value.singleDate : a.value.dateRange), X("button", {
						type: "button",
						class: "sol-button inline-action",
						onClick: () => j()
					}, a.value.close)]),
					X("p", {
						class: "sol-hint sol-calendar-status",
						role: "status",
						"aria-live": "polite"
					}, e.mode === "range" ? f.value ? a.value.chooseEnd : a.value.chooseStart : a.value.singleDate),
					X("div", { class: "sol-calendar-heading" }, [
						X("button", {
							type: "button",
							class: "sol-button subtle",
							"aria-label": a.value.previousMonth,
							onClick: () => {
								u.value = Oh(d.value, -1), d.value = u.value;
							}
						}, tw("chevron", "previous")),
						X("p", {
							id: e.id + "-month",
							class: "sol-ui-calendar-month",
							"aria-live": "polite"
						}, O.format(QC(d.value))),
						X("button", {
							type: "button",
							class: "sol-button subtle",
							"aria-label": a.value.nextMonth,
							onClick: () => {
								u.value = Oh(d.value, 1), d.value = u.value;
							}
						}, tw("chevron", "next"))
					]),
					X("table", {
						class: "sol-calendar-grid",
						role: "grid",
						"aria-labelledby": e.id + "-month"
					}, [X("thead", X("tr", Array.from({ length: 7 }, (e, t) => X("th", { scope: "col" }, S.format(QC(Dh({
						y: 2026,
						m: 10,
						d: 18
					}, t + C()))))))), X("tbody", Array.from({ length: 6 }, (t, n) => X("tr", b.slice(n * 7, n * 7 + 7).map((t) => {
						if (!t) return X("td", { role: "gridcell" });
						let n = Sh(t), o = !!r && r.start <= n && n <= r.end, s = !!r && (n === r.start || n === r.end), c = [
							ew(x, t),
							e.mode === "single" && o ? a.value.selected : r?.start === n ? a.value.start : "",
							e.mode === "range" && !f.value && r?.end === n ? a.value.end : ""
						].filter(Boolean).join(", ");
						return X("td", {
							role: "gridcell",
							"aria-selected": String(o)
						}, X("button", {
							ref: (e) => {
								e ? _.set(n, e) : _.delete(n);
							},
							type: "button",
							class: "sol-calendar-day",
							"data-calendar-day": n,
							"data-outside": String(t.m !== d.value.m),
							"data-range": String(o),
							"data-endpoint": String(s),
							"data-preview": String(!!h && h[0] <= n && n <= h[1]),
							"aria-label": c,
							"aria-current": n === k ? "date" : void 0,
							tabindex: n === i ? 0 : -1,
							onClick: () => te(t),
							onFocus: () => {
								u.value = t;
							}
						}, [t.d, n === k ? X("span", {
							class: "sol-calendar-dot",
							"aria-hidden": "true"
						}) : null]));
					}))))]),
					X("div", { class: "sol-calendar-footer" }, [X("button", {
						type: "button",
						class: "sol-button inline-action",
						onClick: () => {
							u.value = YC(), d.value = u.value, M();
						}
					}, a.value.today), X("button", {
						type: "button",
						class: "sol-button inline-action",
						onClick: () => {
							se(), oe.enhanced() || j("select");
						}
					}, a.value.clear)]),
					X("p", {
						id: e.id + "-keys",
						class: "sol-hint sol-calendar-keys"
					}, a.value.calendarKeys)
				])
			]);
		};
	}
}), iw = /* @__PURE__ */ H({
	name: "STimePicker",
	inheritAttrs: !1,
	props: {
		...yC,
		...sC,
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
		},
		allowManualInput: {
			type: Boolean,
			default: !0
		},
		presentation: {
			type: String,
			default: "native"
		},
		...nw,
		initialScrollValue: String,
		scrollToCurrentTime: Boolean,
		scrubbable: Boolean,
		listScrubbable: Boolean,
		scrubPixelsPerStep: Number
	},
	slots: Object,
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0,
		invalid: (e) => !0,
		open: () => !0,
		close: (e) => !0,
		preview: (e) => !0,
		interactionCommit: (e) => !0,
		interactionCancel: (e) => !0,
		clear: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ F(e.modelValue ?? ""), s = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F(!1), l = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(""), d = /* @__PURE__ */ F(), f = /* @__PURE__ */ F(null), p = /* @__PURE__ */ F(null), m = /* @__PURE__ */ F(null), h = /* @__PURE__ */ F(null), g = !0, _ = !1, v = /* @__PURE__ */ F(null), y = /* @__PURE__ */ F(null), b = /* @__PURE__ */ F(null), x = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ F(null), C = /* @__PURE__ */ F(), w = /* @__PURE__ */ F({
			left: "8px",
			top: "8px"
		}), T = Y(() => uS(e.min, e.max, e.step)), E, D = 0, O = 0, k = 0, A = null, j = "close", ee = !1, M = () => ({
			min: kh(e.min)?.minutes ?? NaN,
			max: kh(e.max)?.minutes ?? NaN
		}), te = (t) => {
			let n = M();
			return Number.isFinite(n.min) && Number.isFinite(n.max) && n.min <= n.max && Number.isInteger(e.step) && e.step > 0 && t >= n.min && t <= n.max && (t - n.min) % e.step === 0;
		};
		function ne() {
			if (!o.value.trim()) return {
				value: null,
				error: e.required ? a.value.timeRequired : ""
			};
			let t = kh(o.value);
			return t && te(t.minutes) ? {
				value: t.value,
				error: ""
			} : {
				value: null,
				error: a.value.invalidTime
			};
		}
		function re() {
			let e = kh(o.value);
			l.value = e && Array.from({ length: 60 }, (e, t) => t).some((t) => te(Math.floor(e.minutes / 60) * 60 + t)) ? e.value.slice(0, 2) : "", u.value = e && te(e.minutes) ? e.value.slice(3) : "";
		}
		function ie() {
			let t = rC(e) || ne().error;
			f.value?.setCustomValidity(t), p.value?.setCustomValidity(t);
		}
		function ae(t) {
			Q(e) || $(e) || (o.value = t ?? "", s.value = "", re(), t !== e.modelValue && (r("update:modelValue", t), r("change", t)), z(ie));
		}
		function oe() {
			ye.cancel("external", !1);
			let t = ne();
			return s.value = t.error, t.error ? (r("invalid", t.error), ie(), !1) : (!Q(e) && !$(e) && ae(t.value), !nC(e));
		}
		function se() {
			if (e.pickerPresentation || !c.value || !f.value || !h.value) return;
			let t = N.enhanced(), n = (t && f.value.closest(".sol-ui-input-frame") || f.value).getBoundingClientRect(), r = h.value.getBoundingClientRect(), i = document.documentElement.clientWidth || window.innerWidth;
			if (t) {
				let e = Math.max(0, parseFloat(getComputedStyle(h.value).paddingInlineStart) || 0), t = e / 2, a = window.innerHeight, o = Math.max(0, a - n.bottom - t - e), s = Math.max(0, n.top - t - e), c = r.height <= o || o >= s, l = Math.max(0, i - e * 2);
				w.value = {
					left: Math.max(e, Math.min(n.left, i - Math.min(r.width, l) - e)) + "px",
					top: c ? Math.max(e, n.bottom + t) + "px" : "auto",
					bottom: c ? "auto" : Math.max(e, a - n.top + t) + "px",
					maxHeight: (c ? o : s) + "px",
					maxWidth: l + "px"
				};
			} else w.value = {
				left: Math.max(8, Math.min(n.left, i - r.width - 8)) + "px",
				top: Math.max(8, Math.min(n.bottom + 6, window.innerHeight - r.height - 8)) + "px"
			};
		}
		function ce() {
			let t = kh(e.modelValue);
			if (t && te(t.minutes)) return t.value;
			let n = kh(e.initialScrollValue);
			if (n) return dS(T.value, n.minutes);
			if (e.scrollToCurrentTime) {
				let e = /* @__PURE__ */ new Date();
				return dS(T.value, e.getHours() * 60 + e.getMinutes());
			}
			return T.value[0];
		}
		function le(e = !1) {
			let t = b.value, n = d.value && x.get(d.value);
			if (!t || !n) return;
			let r = t.getBoundingClientRect(), i = n.getBoundingClientRect();
			e ? t.scrollTop += i.top - r.top - (t.clientHeight - i.height) / 2 : i.top < r.top ? t.scrollTop += i.top - r.top : i.bottom > r.bottom && (t.scrollTop += i.bottom - r.bottom);
		}
		function ue(t = "close", n = !0) {
			ye.cancel(t === "escape" ? "escape" : t === "disabled" ? "disabled" : t === "mode" ? "configuration" : "close", !1), c.value && (j = t, c.value = !1, n && !e.pickerPresentation && z(() => {
				let t = A && !A.disabled ? A : f.value;
				t?.isConnected && !Q(e) && t.focus();
			}));
		}
		async function de(t, n) {
			if (Q(e) || $(e)) return;
			A = n, g = t;
			let i = c.value;
			d.value = ce(), c.value = !0, await z(), !ee && c.value && f.value && (e.pickerPresentation || (se(), e.presentation === "list" ? (le(!0), t && b.value?.focus({ preventScroll: !0 })) : t && v.value?.focus(), i || r("open")));
		}
		function fe() {
			if (Q(e) || $(e) || !l.value || !u.value) return;
			let t = kh(l.value + ":" + u.value);
			t && te(t.minutes) ? ae(t.value) : (u.value = "", s.value = "");
		}
		function pe(t) {
			t && T.value.includes(t) && !Q(e) && !$(e) && (d.value = t, ae(t), ue("select"));
		}
		function me(t) {
			if (t.isComposing || Q(e) || $(e) || ye.active.value) return;
			let n = Math.max(0, T.value.indexOf(d.value || ""));
			if (t.key === "ArrowDown") n++;
			else if (t.key === "ArrowUp") n--;
			else if (t.key === "Home") n = 0;
			else if (t.key === "End") n = T.value.length - 1;
			else if (t.key === "PageDown") n += 10;
			else if (t.key === "PageUp") n -= 10;
			else if (t.key === "Enter" || t.key === " ") {
				t.preventDefault(), t.stopPropagation(), pe(d.value);
				return;
			} else return;
			t.preventDefault(), t.stopPropagation(), d.value = T.value[Math.max(0, Math.min(n, T.value.length - 1))], z(() => le());
		}
		let he = (t) => {
			if (e.pickerPresentation) return;
			let n = t.target;
			c.value && !h.value?.contains(n) && n !== f.value && !m.value?.contains(n) && !S.value?.contains(n) && ue("outside", !1);
		};
		function ge() {
			D && cancelAnimationFrame(D), D = 0, k = 0;
		}
		function _e(e) {
			let t = b.value, n = T.value[0] && x.get(T.value[0]);
			if (!t || !n) return;
			let r = t.getBoundingClientRect(), i = n.getBoundingClientRect();
			if (!i.height) return;
			let a = Math.max(r.top + t.clientTop, Math.min(e, r.bottom - 1));
			return Math.max(0, Math.min(T.value.length - 1, Math.floor((a - i.top) / i.height)));
		}
		function ve(e) {
			if (D = 0, !ye.active.value || ye.source.value !== "list" || !b.value) return;
			let t = b.value, n = t.getBoundingClientRect(), r = T.value[0] && x.get(T.value[0]), i = r ? r.getBoundingClientRect().height : 0;
			if (!i) return;
			let a = Math.min(i, n.height / 3), o = O < n.top + a ? -Math.min(1, (n.top + a - O) / a) : O > n.bottom - a ? Math.min(1, (O - n.bottom + a) / a) : 0;
			if (!o) {
				k = 0;
				return;
			}
			let s = t.scrollTop;
			t.scrollTop += o * i * 6 * Math.min(32, k ? e - k : 16) / 1e3, k = e;
			let c = _e(O);
			c !== void 0 && ye.propose(c), ye.active.value && t.scrollTop !== s && (D = requestAnimationFrame(ve));
		}
		let ye = KC({
			choices: () => T.value,
			value: () => e.modelValue,
			disabled: (t) => Q(e) || $(e) || !(t === "input" ? e.scrubbable : e.listScrubbable && e.presentation === "list" && c.value),
			pixels: () => e.scrubPixelsPerStep ?? Math.max(1, (f.value?.getBoundingClientRect().height || 40) / 4),
			start: (t) => {
				let n = document.activeElement, r = n === f.value ? [f.value?.selectionStart, f.value?.selectionEnd] : void 0;
				return E = d.value, (t === "input" ? S.value : b.value)?.focus({ preventScroll: !0 }), () => {
					if (Q(e) || ee) return;
					let t = n?.isConnected ? n : f.value;
					t?.focus({ preventScroll: !0 }), t === f.value && r && f.value?.setSelectionRange(r[0] ?? null, r[1] ?? null);
				};
			},
			preview: (e) => {
				e.source === "list" && (d.value = e.value), C.value = {
					kind: "preview",
					value: e.value
				}, r("preview", e);
			},
			commit: (e) => {
				ae(e.value), C.value = {
					kind: "commit",
					value: e.value
				}, r("interactionCommit", e), e.source === "list" && ue("select");
			},
			cancel: (e) => {
				e.source === "list" && (d.value = E, z(() => le())), C.value = {
					kind: "cancel",
					value: e.value
				}, r("interactionCancel", e);
			},
			listIndex: (e) => _e(e.clientY),
			listMove: (e) => {
				O = e.clientY, D ||= requestAnimationFrame(ve);
			},
			stop: ge
		}), be = () => {
			let e = kh(o.value);
			return e ? dS(T.value, e.minutes) : ce();
		};
		function xe(e) {
			ue("close", !1), ye.pointer(e, "input", be());
		}
		V(a, () => {
			s.value &&= ne().error, z(ie);
		}), V(() => e.modelValue, (e) => {
			ye.cancel("external"), o.value = e ?? "", s.value = "", re(), z(ie);
		}, { flush: "sync" }), V(() => [Q(e), $(e)], () => {
			(Q(e) || $(e)) && (ye.cancel("disabled", !1), ue("disabled", !Q(e)));
		}, { flush: "sync" }), V(() => [
			e.min,
			e.max,
			e.step,
			e.allowManualInput,
			e.scrubbable,
			e.listScrubbable,
			e.scrubPixelsPerStep,
			e.placement
		], () => ye.cancel("configuration"), { flush: "sync" }), V(() => [
			e.min,
			e.max,
			e.step,
			rC(e),
			e.required,
			e.allowManualInput
		], () => {
			re(), d.value && T.value.includes(d.value) || (d.value = ce()), z(() => {
				ie(), le();
			});
		}), V(() => e.presentation, () => ue("mode")), V(c, (e, t) => {
			!e && t && (_ = !1, r("close", j));
		}), V(() => e.pickerPresentation, (e, t) => {
			ye.cancel("configuration", !1), !!e != !!t && ue("mode");
		}), Yi(() => {
			re(), ie(), document.addEventListener("pointerdown", he), document.addEventListener("focusin", he), window.addEventListener("resize", se), document.addEventListener("scroll", se, !0);
		}), Qi(() => {
			ee = !0, ye.cancel("unmount", !1), ge(), document.removeEventListener("pointerdown", he), document.removeEventListener("focusin", he), window.removeEventListener("resize", se), document.removeEventListener("scroll", se, !0), h.value?.contains(document.activeElement) && A?.isConnected && A.focus();
		});
		let Se = iC(e, () => ne().value, {
			focus: () => f.value?.focus(),
			validateIntrinsic: oe,
			intrinsicError: () => s.value,
			resetIntrinsic: () => {
				s.value = "";
			}
		}), Ce = Se.validate;
		function we(t) {
			return e.pickerPresentation ? X(FS, {
				open: c.value,
				id: e.id + "-panel",
				labelledby: e.id + "-title",
				anchor: f.value?.closest(".sol-ui-input-frame,.sol-time-entry") || f.value,
				returnFocus: A,
				presentation: e.pickerPresentation,
				placement: e.placement,
				width: "320px",
				panelClass: "sol-ui-time-host",
				initialFocus: () => e.presentation === "list" ? b.value : v.value,
				focusOnOpen: g,
				onRequestClose: (e) => ue(e, e !== "outside"),
				onReady: () => {
					!ee && c.value && (_ ? ye.cancel("configuration", !1) : (le(!0), _ = !0, r("open")));
				}
			}, () => t) : X(zr, { to: f.value?.closest("dialog,.v-overlay__content") || "body" }, [t]);
		}
		function Te() {
			return e.scrubbable ? X("div", {
				ref: S,
				role: "spinbutton",
				class: "sol-ui-time-scrub",
				tabindex: Q(e) || $(e) || !T.value.length ? -1 : 0,
				"aria-label": e.label + " " + a.value.timeScrub("input"),
				"aria-disabled": String(Q(e) || $(e) || !T.value.length),
				"aria-valuemin": kh(T.value[0])?.minutes,
				"aria-valuemax": kh(T.value.at(-1))?.minutes,
				"aria-valuenow": kh(ye.preview.value ?? o.value)?.minutes,
				"aria-valuetext": (ye.preview.value ?? o.value) || a.value.choose,
				"aria-describedby": e.id + "-scrub-keys",
				onPointerdown: xe,
				onKeydown: (e) => {
					ye.active.value || ue("close", !1), ye.keyboard(e, be());
				},
				onBlur: () => {
					ye.source.value === "input" && ye.cancel("blur", !1);
				}
			}, [Yx(Ah.grip, 20, 0), X("span", { class: "sol-ui-time-scrub-label" }, a.value.timeScrub("input"))]) : null;
		}
		function Ee(t) {
			return X("button", {
				ref: m,
				type: "button",
				class: "sol-button",
				disabled: Q(e) || $(e),
				"aria-haspopup": "dialog",
				"aria-controls": c.value ? e.id + "-panel" : void 0,
				"aria-expanded": String(c.value),
				"aria-label": e.label + " " + a.value.time,
				onClick: () => c.value ? ue() : void de(!0, m.value)
			}, [t]);
		}
		let N = dC(e, n, {
			locale: () => a.value,
			hasValue: () => e.modelValue !== null || o.value.length > 0,
			disabled: () => Q(e),
			readonly: () => $(e),
			error: () => rC(e) || s.value,
			clear: () => {
				ye.cancel("external", !1), ue("close", !1), ae(null), d.value = void 0, C.value = void 0, r("clear", {
					value: null,
					reason: "clear"
				});
			},
			reconcile: () => {
				o.value = e.modelValue ?? "", s.value = "", re();
			},
			validate: Se.validate,
			focus: Se.focus,
			element: () => f.value,
			trigger: Ee
		});
		function De() {
			N.enhanced() ? N.clear() : (ye.cancel("external", !1), !(Q(e) || $(e)) && (ae(null), r("clear", {
				value: null,
				reason: "clear"
			})));
		}
		i({
			...Se,
			clear: De
		});
		let Oe = (t) => e.id + "-time-" + t.replace(":", "");
		return () => {
			let r = rC(e) || s.value, i = (e) => String(e).padStart(2, "0"), m = Array.from({ length: 24 }, (e, t) => t).filter((e) => Array.from({ length: 60 }, (e, t) => t).some((t) => te(e * 60 + t))), g = Array.from({ length: 60 }, (e, t) => t).filter((e) => l.value !== "" && te(Number(l.value) * 60 + e)), _ = kh(e.modelValue)?.value, S = (e) => {
				e.preventDefault(), Ce(), f.value?.focus();
			}, E = X("input", {
				...t,
				ref: f,
				id: e.id,
				type: "text",
				class: ["sol-input", t.class],
				inputmode: "numeric",
				maxlength: 5,
				autocomplete: "off",
				value: o.value,
				disabled: Q(e),
				readonly: $(e) || !e.allowManualInput,
				required: e.required,
				placeholder: "HH:mm",
				"aria-haspopup": "dialog",
				"aria-controls": c.value ? e.id + "-panel" : void 0,
				"aria-expanded": e.presentation === "list" ? String(c.value) : void 0,
				"aria-invalid": r ? "true" : void 0,
				"aria-describedby": bC(e, n, r, [e.id + "-format", t["aria-describedby"]].filter(Boolean).join(" ")),
				onBeforeinput: (t) => {
					(!e.allowManualInput || $(e) || Q(e)) && t.preventDefault();
				},
				onInput: (t) => {
					ye.cancel("external", !1), Q(e) || $(e) || !e.allowManualInput ? t.target.value = o.value : (o.value = t.target.value, re(), s.value &&= ne().error, ie());
				},
				onClick: () => e.allowManualInput ? ue("close", !1) : void de(!1, f.value),
				onBlur: () => {
					ye.active.value || $(e) || Q(e) || Ce();
				},
				onInvalid: S,
				onKeydown: (e) => {
					e.isComposing || (e.key === "ArrowDown" && e.altKey ? (e.preventDefault(), de(!0, f.value)) : e.key === "Escape" ? (e.preventDefault(), ue("escape")) : e.key === "Enter" && (e.preventDefault(), Ce()));
				}
			});
			return X("div", { class: "sol-field sol-ui-native-field" }, [
				SC(e, n, a.value.required),
				!e.allowManualInput && !$(e) ? X("input", {
					ref: p,
					type: "text",
					class: "sol-ui-sr-only",
					tabindex: -1,
					"aria-hidden": "true",
					form: t.form,
					value: o.value,
					required: e.required,
					disabled: Q(e),
					autocomplete: "off",
					onInvalid: S
				}) : null,
				N.enhanced() ? N.native(E) : X("div", { class: "sol-time-entry" }, [E, Ee(a.value.time)]),
				e.scrubbable ? X("div", { class: "sol-ui-time-scrub-actions" }, [Te()]) : null,
				X("span", {
					id: e.id + "-format",
					class: "sol-hint"
				}, a.value.timeHelp(e.min, e.max, e.step)),
				e.scrubbable || e.listScrubbable ? X("span", {
					id: e.id + "-scrub-keys",
					class: "sol-hint"
				}, a.value.timeScrubKeys) : null,
				e.scrubbable || e.listScrubbable ? X("output", {
					class: "sol-hint sol-ui-time-preview",
					role: "status",
					"aria-live": "polite"
				}, C.value ? C.value.kind === "preview" ? a.value.timePreview(C.value.value) : C.value.kind === "commit" ? a.value.done + " " + C.value.value : a.value.timeScrubCancelled : "") : null,
				...xC(e, n, r),
				e.clearable ? null : X("button", {
					type: "button",
					class: "sol-button inline-action sol-ui-picker-clear",
					disabled: Q(e) || $(e),
					onPointerdown: (e) => lC(e, f.value),
					onClick: (e) => {
						ue("close", !1), De(), uC(e) || f.value?.focus();
					}
				}, a.value.clear),
				we(c.value ? X("div", {
					ref: (t) => {
						h.value = t, !e.pickerPresentation && h.value?.isConnected && h.value.showPopover?.();
					},
					popover: e.pickerPresentation ? void 0 : "manual",
					id: e.pickerPresentation ? void 0 : e.id + "-panel",
					class: e.pickerPresentation ? "sol-ui-time-content" : "sol-time-panel sol-ui-time-panel",
					role: e.pickerPresentation ? void 0 : "dialog",
					"aria-labelledby": e.pickerPresentation ? void 0 : e.id + "-title",
					style: e.pickerPresentation ? void 0 : w.value,
					onKeydown: (e) => {
						e.key === "Escape" && !e.isComposing && (e.preventDefault(), e.stopPropagation(), ue("escape"));
					}
				}, [
					X("div", { class: "sol-ui-picker-top" }, [X("strong", { id: e.id + "-title" }, a.value.time), X("button", {
						type: "button",
						class: "sol-button inline-action",
						onClick: () => ue()
					}, a.value.close)]),
					e.presentation === "list" ? X("div", {
						ref: b,
						class: ["sol-ui-time-list", e.listScrubbable && "sol-ui-time-list--scrub"],
						role: "listbox",
						tabindex: 0,
						"aria-label": a.value.time,
						"aria-describedby": e.listScrubbable ? e.id + "-scrub-keys" : void 0,
						"aria-activedescendant": d.value ? Oe(d.value) : void 0,
						onKeydown: me
					}, T.value.length ? T.value.map((t) => X("div", {
						key: t,
						ref: (e) => {
							e ? x.set(t, e) : x.delete(t);
						},
						id: Oe(t),
						role: "option",
						"aria-selected": String(t === _),
						class: "sol-ui-time-option",
						"data-time-value": t,
						"data-active": t === d.value ? "true" : void 0,
						onClick: () => pe(t)
					}, [
						X("span", t),
						t === _ ? Yx(Ah.check, 16, 0) : null,
						e.listScrubbable ? X("span", {
							class: "sol-ui-time-list-grip",
							"aria-hidden": "true",
							onPointerdown: (e) => ye.pointer(e, "list", t),
							onClick: (e) => {
								e.preventDefault(), e.stopPropagation();
							}
						}, Yx(Ah.grip, 20, 0)) : null
					])) : X("p", {
						role: "status",
						class: "sol-hint"
					}, a.value.noResults)) : X("div", { class: "sol-time-options" }, [X("label", { class: "sol-ui-time-unit" }, [
						X("span", { class: "sol-ui-sr-only" }, a.value.hour),
						X("select", {
							ref: v,
							"aria-label": a.value.hour,
							class: "sol-select",
							value: l.value,
							onChange: (e) => {
								l.value = e.target.value, fe();
							}
						}, [X("option", { value: "" }, a.value.choose), ...m.map((e) => X("option", { value: i(e) }, i(e)))]),
						X("span", {
							class: "sol-ui-time-unit-label",
							"aria-hidden": "true"
						}, a.value.hour)
					]), X("label", { class: "sol-ui-time-unit" }, [
						X("span", { class: "sol-ui-sr-only" }, a.value.minute),
						X("select", {
							ref: y,
							"aria-label": a.value.minute,
							class: "sol-select",
							value: u.value,
							onChange: (e) => {
								u.value = e.target.value, fe();
							}
						}, [X("option", { value: "" }, a.value.choose), ...g.map((e) => X("option", { value: i(e) }, i(e)))]),
						X("span", {
							class: "sol-ui-time-unit-label",
							"aria-hidden": "true"
						}, a.value.minute)
					])]),
					X("div", { class: "sol-ui-time-actions" }, [X("button", {
						type: "button",
						class: "sol-button primary sol-ui-time-confirm",
						disabled: e.presentation === "list" && !d.value,
						onClick: () => {
							e.presentation === "list" ? pe(d.value) : l.value ? u.value ? Ce() && ue("select") : y.value?.focus() : v.value?.focus();
						}
					}, a.value.done)])
				]) : null)
			]);
		};
	}
}), aw = /* @__PURE__ */ H({
	name: "SSegmentedControl",
	inheritAttrs: !1,
	props: {
		...yC,
		modelValue: {
			type: String,
			default: null
		},
		options: {
			type: Array,
			required: !0
		},
		name: String
	},
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ new Map(), s = () => e.options.filter((e) => !e.disabled), c = () => s().find((t) => t.value === e.modelValue) || s()[0];
		function l(t) {
			Q(e) || $(e) || !s().some((e) => e.value === t) || t !== e.modelValue && (r("update:modelValue", t), r("change", t));
		}
		function u(t, n) {
			if (t.isComposing || Q(e)) return;
			let r = s(), i = r.findIndex((e) => e.value === n), a;
			t.key === "Home" ? a = 0 : t.key === "End" ? a = r.length - 1 : ["ArrowRight", "ArrowDown"].includes(t.key) ? a = (i + 1) % r.length : ["ArrowLeft", "ArrowUp"].includes(t.key) ? a = (i - 1 + r.length) % r.length : t.key === " " && $(e) && t.preventDefault(), a !== void 0 && r[a] && (t.preventDefault(), o.get(r[a].value)?.focus(), l(r[a].value));
		}
		return i(iC(e, () => e.modelValue, { focus: () => o.get(c()?.value || "")?.focus() })), () => X("fieldset", {
			...t,
			id: e.id,
			disabled: Q(e),
			class: ["sol-ui-native-field sol-ui-segments", t.class],
			"aria-describedby": bC(e, n)
		}, [
			X("legend", {
				class: "sol-label",
				id: e.id + "-label"
			}, [n.label?.() || e.label, e.required ? " (" + a.value.required + ")" : ""]),
			X("div", { class: "sol-ui-segment-options" }, e.options.map((t, r) => X("label", {
				class: "sol-ui-segment",
				for: e.id + "-" + r
			}, [X("input", {
				ref: (e) => {
					e ? o.set(t.value, e) : o.delete(t.value);
				},
				id: e.id + "-" + r,
				name: e.name || e.id,
				type: "radio",
				value: t.value,
				checked: e.modelValue === t.value,
				disabled: Q(e) || t.disabled,
				required: e.required,
				"aria-invalid": rC(e) ? "true" : void 0,
				"aria-describedby": bC(e, n),
				tabindex: !Q(e) && !t.disabled && c()?.value === t.value ? 0 : -1,
				"aria-disabled": $(e) ? "true" : void 0,
				onClick: (t) => {
					$(e) && t.preventDefault();
				},
				onChange: (n) => {
					Q(e) || $(e) ? n.target.checked = e.modelValue === t.value : l(t.value);
				},
				onKeydown: (e) => u(e, t.value)
			}), X("span", t.label)]))),
			...xC(e, n)
		]);
	}
}), ow = /* @__PURE__ */ H({
	name: "SMultiSelect",
	inheritAttrs: !1,
	props: {
		...yC,
		...sC,
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
	slots: Object,
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0,
		search: (e) => !0,
		open: () => !0,
		close: () => !0,
		invalid: (e) => !0,
		clear: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(!1), d = /* @__PURE__ */ F(""), f = /* @__PURE__ */ F([]), p = /* @__PURE__ */ F(!1), m = /* @__PURE__ */ F(""), h = /* @__PURE__ */ F(""), { position: g } = MS(u, Y(() => c.value?.closest(".sol-ui-input-frame") || c.value), s, !0, !0, { visualViewport: !0 }), _ = /* @__PURE__ */ new Map(), v = !1, y = !1, b = 0, x, S, C = !1, w = (e) => {
			let t = /* @__PURE__ */ new Set();
			return e.filter((e) => !!e.value && !t.has(e.value) && !!t.add(e.value)).map((e) => (_.set(e.value, e.label), e));
		};
		V(() => e.options, (t) => {
			let n = w(t);
			e.loadOptions || (f.value = n);
		}, {
			immediate: !0,
			deep: !0
		});
		let T = () => e.loadOptions ? f.value : f.value.filter((e) => e.label.toLowerCase().includes(l.value.trim().toLowerCase())), E = () => T().filter((e) => !e.disabled), D = () => [...new Set(e.modelValue)], O = (t) => D().includes(t.value) || e.maxSelected === void 0 || D().length < e.maxSelected;
		function k() {
			clearTimeout(S), S = void 0, x?.abort(), x = void 0, b++, p.value = !1;
		}
		async function A() {
			if (!e.loadOptions || y || !u.value || Q(e) || $(e)) return;
			k();
			let t = b, n = new AbortController();
			x = n, p.value = !0, m.value = "", f.value = [], d.value = "";
			try {
				let r = await e.loadOptions(l.value, n.signal);
				if (C || t !== b || n.signal.aborted) return;
				f.value = w(r), d.value = E()[0]?.value || "";
			} catch {
				if (C || t !== b || n.signal.aborted) return;
				m.value = a.value.loadFailed;
			} finally {
				!C && t === b && (p.value = !1);
			}
		}
		function j() {
			r("search", l.value), e.loadOptions ? (k(), m.value = "", f.value = [], S = setTimeout(() => void A(), Math.max(0, e.debounce))) : d.value = E()[0]?.value || "";
		}
		function ee() {
			if (Q(e) || $(e)) return;
			let t = u.value;
			u.value = !0, t || (e.loadOptions ? A() : d.value = E()[0]?.value || "");
		}
		function M() {
			u.value && (u.value = !1, d.value = "", k());
		}
		function te() {
			c.value?.setCustomValidity(rC(e) || (e.required && !D().length ? a.value.chooseAtLeastOne : ""));
		}
		function ne() {
			return h.value = e.required && !D().length ? a.value.chooseAtLeastOne : "", te(), h.value && r("invalid", h.value), !nC(e) && !h.value;
		}
		function re(t) {
			Q(e) || $(e) || (r("update:modelValue", t), r("change", t));
		}
		function ie(t) {
			if (Q(e) || $(e) || t.disabled || p.value || m.value) return;
			let n = D();
			n.includes(t.value) ? re(n.filter((e) => e !== t.value)) : O(t) ? re([...n, t.value]) : (h.value = a.value.selectionLimit(e.maxSelected), r("invalid", h.value)), c.value?.focus();
		}
		function ae(t) {
			Q(e) || $(e) || (re(D().filter((e) => e !== t)), c.value?.focus());
		}
		function oe(t) {
			if (!(t.isComposing || y || Q(e))) {
				if (t.key === "Escape" && u.value) t.preventDefault(), t.stopPropagation(), M();
				else if (!$(e)) {
					if (t.key === "ArrowDown" || t.key === "ArrowUp") {
						if (t.preventDefault(), !u.value) {
							ee();
							return;
						}
						let e = E(), n = e.findIndex((e) => e.value === d.value);
						d.value = e[(n + (t.key === "ArrowDown" ? 1 : -1) + e.length) % e.length]?.value || "", z(() => s.value?.querySelector("[data-active=\"true\"]")?.scrollIntoView?.({ block: "nearest" }));
					} else if (t.key === "Enter" && u.value) {
						t.preventDefault();
						let e = E().find((e) => e.value === d.value);
						e && ie(e);
					} else t.key === "Backspace" && !l.value && D().length && (t.preventDefault(), ae(D().at(-1)));
				}
			}
		}
		let se = (e) => {
			o.value?.contains(e.target) || M();
		};
		V(u, (e) => {
			r(e ? "open" : "close");
		}), V(a, () => {
			m.value &&= a.value.loadFailed, h.value &&= e.required && !D().length ? a.value.chooseAtLeastOne : a.value.selectionLimit(e.maxSelected), z(te);
		}), V(() => [...e.modelValue], () => {
			h.value = "", z(te);
		}), V(() => [Q(e), $(e)], () => {
			(Q(e) || $(e)) && M();
		}), V(() => [e.required, rC(e)], () => z(te)), V(() => e.loadOptions, () => {
			k(), f.value = e.loadOptions ? [] : w(e.options), u.value && e.loadOptions && A();
		}), Yi(() => {
			document.addEventListener("pointerdown", se), document.addEventListener("focusin", se), te();
		}), Qi(() => {
			C = !0, k(), document.removeEventListener("pointerdown", se), document.removeEventListener("focusin", se);
		});
		let ce = iC(e, () => e.modelValue, {
			focus: () => c.value?.focus(),
			validateIntrinsic: ne,
			intrinsicError: () => h.value,
			resetIntrinsic: () => {
				h.value = "";
			}
		}), le = ce.validate, ue = dC(e, n, {
			always: !0,
			locale: () => a.value,
			hasValue: () => D().length > 0 || l.value.length > 0,
			disabled: () => Q(e),
			readonly: () => $(e),
			error: () => rC(e) || h.value,
			loading: () => p.value,
			clear: () => {
				v = y, y = !1, re([]), l.value = "", h.value = "", m.value = "", M(), k(), r("clear", {
					value: [],
					reason: "clear"
				});
			},
			validate: ce.validate,
			focus: ce.focus,
			element: () => c.value,
			trigger: (t) => X("button", {
				type: "button",
				class: "sol-button",
				disabled: Q(e) || $(e),
				"aria-label": e.label + " " + (u.value ? a.value.close : a.value.choose),
				"aria-haspopup": "listbox",
				"aria-expanded": String(u.value),
				"aria-controls": u.value ? e.id + "-list" : void 0,
				onMousedown: (e) => e.preventDefault(),
				onClick: () => {
					u.value ? M() : ee(), c.value?.focus({ preventScroll: !0 });
				}
			}, [t])
		});
		function de() {
			ue.decorated() ? ue.clear() : Q(e) || $(e) || (re([]), r("clear", {
				value: [],
				reason: "clear"
			}));
		}
		return i({
			...ce,
			clear: de
		}), () => {
			let r = rC(e) || h.value, i = T();
			return X("div", {
				ref: o,
				class: "sol-field sol-ui-native-field sol-ui-multiselect",
				onKeydown: (e) => {
					e.key === "Escape" && u.value && !e.isComposing && !y && (e.preventDefault(), e.stopPropagation(), M(), c.value?.focus());
				}
			}, [
				SC(e, n, a.value.required),
				ue.native(X("span", { class: "sol-ui-multi-entry" }, [D().length ? X("span", {
					class: "sol-ui-tags sol-ui-multi-tags",
					role: "list",
					"aria-label": e.label + " " + a.value.selectedItems
				}, D().map((t) => X("span", {
					key: t,
					role: "listitem"
				}, X(Zx, {
					label: _.get(t) || t,
					size: "sm",
					removable: !$(e),
					disabled: Q(e),
					removeLabel: a.value.remove(_.get(t) || t),
					onRemove: () => ae(t)
				})))) : null, X("input", {
					...t,
					ref: c,
					id: e.id,
					type: "text",
					class: ["sol-input sol-ui-input-native sol-ui-multi-query", t.class],
					role: "combobox",
					value: l.value,
					placeholder: e.placeholder,
					disabled: Q(e),
					readonly: $(e),
					autocomplete: "off",
					"aria-autocomplete": "list",
					"aria-busy": e.loading || p.value ? "true" : void 0,
					"aria-expanded": String(u.value),
					"aria-controls": u.value ? e.id + "-list" : void 0,
					"aria-activedescendant": u.value && !p.value && !m.value && i.some((e) => e.value === d.value) ? e.id + "-option-" + i.findIndex((e) => e.value === d.value) : void 0,
					"aria-required": e.required ? "true" : void 0,
					"aria-invalid": r ? "true" : void 0,
					"aria-describedby": bC(e, n, r, [e.id + "-count", t["aria-describedby"]].filter(Boolean).join(" ")),
					onClick: ee,
					onInput: (t) => {
						Q(e) || $(e) || (l.value = t.target.value, y || (u.value ||= !0, j()));
					},
					onCompositionstart: () => {
						v = !1, y = !0, k();
					},
					onCompositionend: (t) => {
						v ? (v = !1, y = !1, t.target.value = l.value) : (y = !1, l.value = t.target.value, !Q(e) && !$(e) && (u.value = !0, j()));
					},
					onKeydown: oe,
					onInvalid: (e) => {
						e.preventDefault(), le(), c.value?.focus();
					}
				})])),
				u.value ? X("div", {
					ref: s,
					popover: "manual",
					hidden: !u.value,
					class: "sol-ui-floating sol-ui-multi-popup",
					style: g.value,
					onKeydown: (e) => {
						e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), M(), c.value?.focus());
					}
				}, [X("ul", {
					id: e.id + "-list",
					role: "listbox",
					"aria-label": e.label,
					"aria-multiselectable": "true",
					"aria-busy": String(p.value),
					class: "sol-ui-multi-options"
				}, !p.value && !m.value ? i.map((t, n) => X("li", {
					key: t.value,
					id: e.id + "-option-" + n,
					role: "option",
					"aria-selected": String(D().includes(t.value)),
					"aria-disabled": t.disabled ? "true" : void 0,
					"data-active": String(d.value === t.value),
					onPointerdown: (e) => e.preventDefault(),
					onClick: () => ie(t)
				}, [
					X("span", { "aria-hidden": "true" }, D().includes(t.value) ? "✓" : "○"),
					X("span", t.label),
					t.disabled ? X("small", a.value.unavailable) : null
				])) : []), p.value ? X("p", {
					role: "status",
					class: "sol-hint"
				}, a.value.loading) : m.value ? X("div", { role: "alert" }, [X("p", { class: "sol-error" }, m.value), X("button", {
					type: "button",
					class: "sol-button inline-action",
					onClick: () => {
						c.value?.focus(), A();
					},
					onKeydown: (e) => {
						e.key === "Escape" && (e.preventDefault(), M(), c.value?.focus());
					}
				}, a.value.retry)]) : i.length ? null : X("p", {
					role: "status",
					class: "sol-hint"
				}, a.value.noResults)]) : null,
				X("span", {
					id: e.id + "-count",
					class: "sol-hint",
					role: "status"
				}, a.value.selectionCount(D().length, e.maxSelected)),
				...xC(e, n, r)
			]);
		};
	}
}), sw = /* @__PURE__ */ H({
	name: "SRangeSlider",
	inheritAttrs: !1,
	props: {
		...yC,
		modelValue: {
			type: Array,
			required: !0
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
		"update:modelValue": (e) => !0,
		change: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ F(null), s = [], c = null, l = () => Number.isFinite(e.min) && Number.isFinite(e.max) && e.min < e.max && Number.isFinite(e.step) && e.step > 0, u = () => l() ? Number((e.min + Math.floor((e.max - e.min) / e.step + 1e-9) * e.step).toFixed(10)) : 1, d = (t) => l() ? Number(Math.max(e.min, Math.min(u(), e.min + Math.round((t - e.min) / e.step) * e.step)).toFixed(10)) : 0, f = () => {
			let t = d(Number.isFinite(e.modelValue[0]) ? e.modelValue[0] : e.min), n = d(Number.isFinite(e.modelValue[1]) ? e.modelValue[1] : u());
			return [Math.min(t, n), Math.max(t, n)];
		};
		function p(t, n, i = !0) {
			if (Q(e) || $(e) || !l()) return;
			let a = f();
			a[t] = t === 0 ? Math.min(d(n), a[1]) : Math.max(d(n), a[0]), (a[0] !== e.modelValue[0] || a[1] !== e.modelValue[1]) && (r("update:modelValue", a), c && (c.last = a), i && r("change", a));
		}
		function m(t, n) {
			if (t.isComposing || Q(e) || $(e)) return;
			let r = f(), i = e.step * (t.shiftKey ? 10 : 1), a;
			["ArrowRight", "ArrowUp"].includes(t.key) ? a = r[n] + i : ["ArrowLeft", "ArrowDown"].includes(t.key) ? a = r[n] - i : t.key === "Home" ? a = n === 0 ? e.min : r[0] : t.key === "End" ? a = n === 0 ? r[1] : u() : t.key === "PageUp" ? a = r[n] + e.step * 10 : t.key === "PageDown" && (a = r[n] - e.step * 10), a !== void 0 && (t.preventDefault(), p(n, a));
		}
		function h(t) {
			let n = o.value.getBoundingClientRect();
			return n.width ? e.min + (t - n.left) / n.width * (u() - e.min) : e.min;
		}
		function g(e, t = !0) {
			if (!c || e && e.pointerId !== c.id) return;
			let n = c;
			c = null;
			try {
				n.target.releasePointerCapture?.(n.id);
			} catch {}
			t && (n.last[0] !== n.start[0] || n.last[1] !== n.start[1]) && r("change", [...n.last]);
		}
		return V(() => [
			Q(e),
			$(e),
			e.min,
			e.max,
			e.step
		], () => g(void 0, !1)), Qi(() => {
			c = null;
		}), i(iC(e, () => e.modelValue, {
			focus: () => s[0]?.focus(),
			validateIntrinsic: l,
			intrinsicError: () => l() ? "" : a.value.invalidNumber
		})), () => {
			let r = f(), i = u() - e.min, d = (t) => i > 0 ? 100 * (t - e.min) / i : 0, _ = (t) => e.formatValue?.(t) ?? Fx(t, a.value);
			return X("div", {
				...t,
				class: ["sol-field sol-ui-range", t.class],
				role: "group",
				"aria-labelledby": e.id + "-label",
				"aria-describedby": bC(e, n)
			}, [
				X("div", {
					id: e.id + "-label",
					class: "sol-label"
				}, n.label?.() || e.label),
				X("div", { class: "sol-ui-range-values" }, [X("span", { id: e.id + "-lower" }, (e.lowerLabel || a.value.lower) + ": " + _(r[0])), X("span", { id: e.id + "-upper" }, (e.upperLabel || a.value.upper) + ": " + _(r[1]))]),
				X("div", {
					class: "sol-ui-range-target",
					onPointerdown: (t) => {
						if (t.target.closest("[role=slider]") || t.button !== 0 || Q(e) || $(e) || !l()) return;
						t.preventDefault();
						let n = h(t.clientX), i = n > r[1] ? 1 : n < r[0] || Math.abs(n - r[0]) <= Math.abs(n - r[1]) ? 0 : 1;
						p(i, n), s[i]?.focus();
					}
				}, [X("div", {
					ref: o,
					class: "sol-ui-range-rail"
				}, X("div", {
					class: "sol-ui-range-fill",
					style: {
						left: d(r[0]) + "%",
						width: d(r[1]) - d(r[0]) + "%"
					}
				})), ...[0, 1].map((t) => X("div", {
					ref: (e) => {
						s[t] = e;
					},
					id: e.id + (t === 0 ? "-lower-thumb" : "-upper-thumb"),
					role: "slider",
					tabindex: Q(e) || !l() ? -1 : 0,
					class: "sol-ui-range-thumb",
					style: { left: d(r[t]) + "%" },
					"aria-labelledby": e.id + "-label " + e.id + (t === 0 ? "-lower" : "-upper"),
					"aria-valuemin": t === 0 ? e.min : r[0],
					"aria-valuemax": t === 0 ? r[1] : u(),
					"aria-valuenow": r[t],
					"aria-valuetext": _(r[t]),
					"aria-disabled": Q(e) || !l() ? "true" : void 0,
					"aria-readonly": $(e) ? "true" : void 0,
					"aria-invalid": rC(e) ? "true" : void 0,
					"aria-describedby": bC(e, n, rC(e), e.id + "-keys"),
					onKeydown: (e) => m(e, t),
					onPointerdown: (n) => {
						c || n.button !== 0 || Q(e) || $(e) || !l() || (n.preventDefault(), s[t]?.focus(), c = {
							id: n.pointerId,
							index: t,
							start: r,
							last: r,
							target: n.currentTarget
						}, c.target.setPointerCapture?.(n.pointerId));
					},
					onPointermove: (e) => {
						c?.id === e.pointerId && p(t, h(e.clientX), !1);
					},
					onPointerup: g,
					onPointercancel: g,
					onLostpointercapture: () => g()
				}))]),
				X("p", {
					id: e.id + "-keys",
					class: "sol-hint"
				}, a.value.rangeKeys),
				...xC(e, n, rC(e) || (l() ? "" : a.value.invalidNumber))
			]);
		};
	}
}), cw = /* @__PURE__ */ H({
	name: "SResizableSplitPane",
	inheritAttrs: !1,
	props: {
		...vC,
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
			required: !0
		},
		secondaryLabel: {
			type: String,
			required: !0
		}
	},
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0,
		reflow: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r }) {
		let i = Nx(() => e.locale), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(null), u = /* @__PURE__ */ F(!1), d, f, p = !1, m = 50, h = null, g = () => !u.value && e.orientation === "horizontal", _ = () => Number.isFinite(e.min) && Number.isFinite(e.max) && e.min >= 0 && e.max <= 100 && e.min < e.max && Number.isFinite(e.step) && e.step > 0, v = () => _() ? e.min : 0, y = () => _() ? Number((e.min + Math.floor((e.max - e.min) / e.step + 1e-9) * e.step).toFixed(6)) : 100, b = (t) => _() ? Number(Math.max(v(), Math.min(y(), e.min + Math.round((t - e.min) / e.step) * e.step)).toFixed(6)) : 50, x = () => b(Number.isFinite(e.modelValue) ? e.modelValue : 50);
		function S(t, n = !0) {
			if (e.disabled || e.readonly || !_()) return;
			let i = b(t);
			i !== e.modelValue && (r("update:modelValue", i), h && (h.last = i), n && r("change", i));
		}
		function C(e) {
			if (!h || h.id !== e.pointerId) return;
			let t = h.horizontal ? e.clientX : e.clientY;
			S(h.start + (t - h.coordinate) / h.space * 100, !1);
		}
		function w(e, t = !0) {
			if (!h || e && h.id !== e.pointerId) return;
			let n = h;
			h = null, window.removeEventListener("pointermove", C), window.removeEventListener("pointerup", w), window.removeEventListener("pointercancel", T), window.removeEventListener("blur", E);
			try {
				n.target.releasePointerCapture?.(n.id);
			} catch {}
			t && n.last !== n.start && r("change", n.last);
		}
		function T(e) {
			w(e, !1);
		}
		function E() {
			w(void 0, !1);
		}
		function D(t) {
			if (h || t.button !== 0 || t.isPrimary === !1 || e.disabled || e.readonly || !_()) return;
			let n = o.value.getBoundingClientRect(), r = s.value.getBoundingClientRect(), i = g(), a = i ? n.width - r.width : n.height - r.height;
			if (!(a <= 0)) {
				t.preventDefault(), s.value?.focus({ preventScroll: !0 }), h = {
					id: t.pointerId,
					start: x(),
					last: x(),
					coordinate: i ? t.clientX : t.clientY,
					space: a,
					horizontal: i,
					target: t.currentTarget
				}, window.addEventListener("pointermove", C), window.addEventListener("pointerup", w), window.addEventListener("pointercancel", T), window.addEventListener("blur", E);
				try {
					h.target.setPointerCapture?.(t.pointerId);
				} catch {}
			}
		}
		function O() {
			let t = a.value?.getBoundingClientRect().width || 0, n = e.collapseBelow > 0 && t > 0 && t < e.collapseBelow;
			n !== u.value && (E(), u.value = n, r("reflow", n));
		}
		function k() {
			p || f !== void 0 || (f = requestAnimationFrame(() => {
				f = void 0, O();
			}));
		}
		function A(t) {
			if (t.isComposing || e.disabled || e.readonly) return;
			let n = x(), r = g() ? "ArrowRight" : "ArrowDown", i = g() ? "ArrowLeft" : "ArrowUp", a;
			t.key === r ? a = n + e.step * (t.shiftKey ? 10 : 1) : t.key === i ? a = n - e.step * (t.shiftKey ? 10 : 1) : t.key === "Home" ? a = v() : t.key === "End" ? a = y() : t.key === "Enter" && (n > v() ? (m = n, a = v()) : a = m > v() ? m : y()), a !== void 0 && (t.preventDefault(), S(a));
		}
		return V(() => [
			e.disabled,
			e.readonly,
			e.orientation,
			e.min,
			e.max,
			e.step
		], E), V(() => e.collapseBelow, () => z(k)), V(() => e.modelValue, async () => {
			let e = document.activeElement;
			(x() === 0 && c.value?.contains(e) || x() === 100 && l.value?.contains(e)) && (await z(), s.value?.focus());
		}), Yi(() => {
			m = x(), O(), typeof ResizeObserver < "u" && (d = new ResizeObserver(k), a.value && d.observe(a.value)), window.addEventListener("resize", k);
		}), Qi(() => {
			p = !0, f !== void 0 && cancelAnimationFrame(f), E(), d?.disconnect(), window.removeEventListener("resize", k);
		}), () => {
			let r = e.error || (_() ? "" : i.value.invalidNumber), d = x(), f = g(), p = `minmax(0,${d}fr) var(--sol-split-handle-size) minmax(0,${100 - d}fr)`, m = f ? { gridTemplateColumns: p } : { gridTemplateRows: p };
			return X("div", {
				...t,
				ref: a,
				id: e.id,
				class: ["sol-field sol-ui-split-pane", t.class],
				role: "group",
				"aria-labelledby": e.id + "-label",
				"aria-describedby": bC(e, n, r, t["aria-describedby"])
			}, [
				X("div", {
					id: e.id + "-label",
					class: "sol-label"
				}, n.label?.() || e.label),
				X("div", {
					ref: o,
					class: ["sol-ui-pane-layout", u.value ? "is-stacked" : ""],
					"data-orientation": f ? "horizontal" : "vertical",
					style: m
				}, [
					X("section", {
						ref: c,
						id: e.id + "-primary",
						class: "sol-ui-pane",
						role: "region",
						"aria-labelledby": e.id + "-primary-label",
						tabindex: -1,
						inert: d === 0 ? "" : void 0,
						"aria-hidden": d === 0 ? "true" : void 0
					}, [X("div", {
						id: e.id + "-primary-label",
						class: "sol-label"
					}, e.primaryLabel), n.primary?.({
						size: d,
						stacked: u.value
					})]),
					X("div", {
						ref: s,
						role: "separator",
						tabindex: e.disabled || !_() ? -1 : 0,
						class: "sol-ui-separator",
						"aria-labelledby": e.id + "-primary-label",
						"aria-controls": e.id + "-primary " + e.id + "-secondary",
						"aria-orientation": f ? "vertical" : "horizontal",
						"aria-valuemin": v(),
						"aria-valuemax": y(),
						"aria-valuenow": d,
						"aria-valuetext": Fx(d / 100, i.value, { style: "percent" }),
						"aria-disabled": e.disabled || e.readonly || !_() ? "true" : void 0,
						"aria-describedby": bC(e, n, r, e.id + "-keys"),
						onKeydown: A,
						onPointerdown: D,
						onLostpointercapture: T
					}, X("span", { "aria-hidden": "true" })),
					X("section", {
						ref: l,
						id: e.id + "-secondary",
						class: "sol-ui-pane",
						role: "region",
						"aria-labelledby": e.id + "-secondary-label",
						tabindex: -1,
						inert: d === 100 ? "" : void 0,
						"aria-hidden": d === 100 ? "true" : void 0
					}, [X("div", {
						id: e.id + "-secondary-label",
						class: "sol-label"
					}, e.secondaryLabel), n.secondary?.({
						size: 100 - d,
						stacked: u.value
					})])
				]),
				X("p", {
					id: e.id + "-keys",
					class: "sol-hint"
				}, [u.value ? i.value.splitStacked + " " : "", i.value.splitKeys]),
				...xC(e, n, r)
			]);
		};
	}
});
function lw(e, t) {
	if (!Array.isArray(e)) return {
		valid: !1,
		reason: "items",
		index: -1
	};
	let n = e.slice(), r = [], i = /* @__PURE__ */ new Set();
	for (let e = 0; e < n.length; e++) {
		if (!(e in n)) return {
			valid: !1,
			reason: "items",
			index: e
		};
		let a;
		try {
			a = t(n[e]);
		} catch {
			return {
				valid: !1,
				reason: "item-key",
				index: e
			};
		}
		if (typeof a != "string" && (typeof a != "number" || !Number.isFinite(a))) return {
			valid: !1,
			reason: "item-key",
			index: e
		};
		if (i.has(a)) return {
			valid: !1,
			reason: "duplicate-key",
			index: e
		};
		i.add(a), r.push(a);
	}
	return e.length !== n.length || n.some((t, n) => !Object.is(t, e[n])) ? {
		valid: !1,
		reason: "items",
		index: -1
	} : {
		valid: !0,
		snapshot: Object.freeze({
			source: e,
			items: Object.freeze(n),
			keys: Object.freeze(r)
		})
	};
}
function uw(e, t) {
	return e.source === t.source && e.items.length === t.items.length && e.items.every((n, r) => Object.is(n, t.items[r]) && e.keys[r] === t.keys[r]);
}
function dw(e, t, n, r) {
	let i = e.keys.indexOf(t);
	if (i < 0 || !Number.isInteger(n) || n < 0 || n >= e.items.length) return;
	let a = [...e.items], [o] = a.splice(i, 1);
	return a.splice(n, 0, o), {
		items: a,
		key: t,
		from: i,
		to: n,
		input: r
	};
}
function fw(e) {
	let t, n = 0, r = 0, i, a = 0;
	function o(e) {
		for (let t = e.parentElement; t && t !== document.documentElement && t !== document.body; t = t.parentElement) if (/auto|scroll/.test(getComputedStyle(t).overflowY) && t.scrollHeight > t.clientHeight) return t;
		return window;
	}
	function s(t) {
		let n = 0, r = window.innerHeight, i = e.list(), a = i?.getBoundingClientRect();
		if (!i || !a) return;
		for (let e = i.parentElement; e && e !== document.documentElement && e !== document.body; e = e.parentElement) if (/auto|scroll|hidden|clip/.test(getComputedStyle(e).overflowY)) {
			let t = e.getBoundingClientRect();
			n = Math.max(n, t.top + e.clientTop), r = Math.min(r, t.top + e.clientTop + e.clientHeight);
		}
		let o = t.scroll;
		if (o !== window) {
			let e = o, t = e.getBoundingClientRect();
			n = Math.max(n, t.top + e.clientTop), r = Math.min(r, t.top + e.clientTop + e.clientHeight);
		}
		return {
			top: n,
			bottom: r,
			left: a.left,
			right: a.right
		};
	}
	function c(o = !0) {
		let s = t;
		if (t = void 0, e.visual?.(null), n && cancelAnimationFrame(n), n = 0, r = 0, window.removeEventListener("pointermove", f, !0), window.removeEventListener("pointerup", p, !0), window.removeEventListener("pointercancel", m, !0), window.removeEventListener("keydown", g, !0), s?.target.removeEventListener("lostpointercapture", h), s) {
			o && (i = s.target, a = performance.now() + 500);
			try {
				s.target.hasPointerCapture(s.id) && s.target.releasePointerCapture(s.id);
			} catch {}
		}
	}
	function l() {
		return !!t && e.enabled() && t.guard();
	}
	function u(t) {
		let n = s(t);
		if (!n || n.bottom <= n.top || t.x < n.left || t.x > n.right) return;
		let r = Math.max(n.top, Math.min(t.y, n.bottom)), i = 0;
		for (let n of e.keys()) {
			if (n === t.key) continue;
			let a = e.row(n);
			if (!a) continue;
			let o = a.getBoundingClientRect();
			r >= o.top + o.height / 2 && i++;
		}
		e.move(i);
	}
	function d(i) {
		n = 0;
		let a = t;
		if (!a?.started) return;
		if (!l()) {
			e.cancel("external");
			return;
		}
		let o = s(a);
		if (!o || o.bottom <= o.top || a.x < o.left || a.x > o.right) {
			r = 0;
			return;
		}
		let c = Math.min(a.rowHeight, Math.max(1, (o.bottom - o.top) / 3)), f = a.y < o.top + c ? -Math.min(1, (o.top + c - a.y) / c) : a.y > o.bottom - c ? Math.min(1, (a.y - o.bottom + c) / c) : 0;
		if (!f) {
			r = 0;
			return;
		}
		let p = f * a.rowHeight * 8 * Math.min(32, r ? i - r : 16) / 1e3;
		r = i;
		let m, h;
		if (a.scroll === window) m = window.scrollY, window.scrollBy(0, p), h = window.scrollY;
		else {
			let e = a.scroll;
			m = e.scrollTop, e.scrollTop += p, h = e.scrollTop;
		}
		u(a), t === a && m !== h && (n = requestAnimationFrame(d));
	}
	function f(r) {
		let i = t;
		if (i && i.id === r.pointerId) {
			if (r.preventDefault(), !l()) e.cancel("external");
			else {
				if (i.x = r.clientX, i.y = r.clientY, !i.started) {
					if (Math.abs(i.y - i.startY) < i.threshold) return;
					if (i.started = !0, !e.begin(i.key)) {
						c();
						return;
					}
					if (t !== i) return;
				}
				u(i), t === i && !n && (n = requestAnimationFrame(d)), t === i && e.visual?.(i.key, i.x, i.y);
			}
		}
	}
	function p(n) {
		let r = t;
		if (!r || r.id !== n.pointerId || (f(n), t !== r)) return;
		let i = s(r);
		r.started ? (n.preventDefault(), !i || r.x < i.left || r.x > i.right ? e.cancel("outside") : e.finish()) : c();
	}
	function m(n) {
		n.pointerId === t?.id && e.cancel("pointercancel");
	}
	function h(n) {
		n.pointerId === t?.id && e.cancel("capture");
	}
	function g(n) {
		t && !n.isComposing && (n.key === "Escape" ? (n.preventDefault(), n.stopImmediatePropagation(), e.cancel("escape")) : n.key === "Tab" ? e.cancel("tab", !1) : [
			" ",
			"Enter",
			"ArrowUp",
			"ArrowDown",
			"Home",
			"End"
		].includes(n.key) && (n.preventDefault(), n.stopImmediatePropagation()));
	}
	function _(n, r, i) {
		if (n.button !== 0 || n.isPrimary === !1 || !e.enabled()) return;
		let a = n.currentTarget, s = e.list(), l = e.row(r);
		if (!s || !l) return;
		n.preventDefault(), n.stopPropagation(), c();
		let u = a.getBoundingClientRect(), d = l.getBoundingClientRect().height;
		t = {
			id: n.pointerId,
			key: r,
			target: a,
			startY: n.clientY,
			x: n.clientX,
			y: n.clientY,
			threshold: Math.max(1, (u.height || 40) / 8),
			rowHeight: d || u.height || 40,
			started: !1,
			guard: i,
			scroll: o(s)
		}, window.addEventListener("pointermove", f, {
			capture: !0,
			passive: !1
		}), window.addEventListener("pointerup", p, !0), window.addEventListener("pointercancel", m, !0), window.addEventListener("keydown", g, !0), a.addEventListener("lostpointercapture", h);
		try {
			a.setPointerCapture(n.pointerId);
		} catch {}
		a.focus({ preventScroll: !0 });
	}
	return {
		press: _,
		stop: c,
		valid: l,
		pending: () => !!t,
		active: () => !!t?.started,
		key: () => t?.key,
		consumeClick: (e) => e.detail > 0 && e.currentTarget === i && performance.now() < a
	};
}
var pw = /* @__PURE__ */ H({
	name: "SSortableList",
	inheritAttrs: !1,
	props: {
		...vC,
		modelValue: {
			type: Array,
			required: !0
		},
		itemKey: {
			type: Function,
			required: !0
		},
		itemLabel: {
			type: Function,
			required: !0
		},
		isItemDisabled: Function
	},
	slots: Object,
	emits: {
		"update:modelValue": (e) => !0,
		change: (e) => !0,
		start: (e) => !0,
		preview: (e) => !0,
		end: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = /* @__PURE__ */ F(), o = Nx(() => e.locale), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(0), l = /* @__PURE__ */ F(null), u = /* @__PURE__ */ F(null), d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), h = Y(() => {
			let t = /* @__PURE__ */ new Set(), n = lw(e.modelValue, e.itemKey);
			if (!n.valid) return {
				snapshot: void 0,
				labels: [],
				locked: t
			};
			let r = [];
			try {
				for (let i of n.snapshot.items) {
					let a = e.itemLabel(i);
					if (typeof a != "string" || !a.trim()) return {
						snapshot: void 0,
						labels: r,
						locked: t
					};
					let o = e.isItemDisabled ? e.isItemDisabled(i) : !1;
					if (typeof o != "boolean") return {
						snapshot: void 0,
						labels: r,
						locked: t
					};
					o && t.add(n.snapshot.keys[r.length]), r.push(a.trim());
				}
			} catch {
				return {
					snapshot: void 0,
					labels: r,
					locked: t
				};
			}
			return {
				snapshot: n.snapshot,
				labels: r,
				locked: t
			};
		}), g, _ = !1, v = /* @__PURE__ */ F(), y = () => e.disabled || e.readonly || !h.value.snapshot, b = (e) => y() || h.value.locked.has(e), x = (e, t = "") => {
			let n = h.value.snapshot?.keys.indexOf(e) ?? -1;
			return n >= 0 ? h.value.labels[n] : t;
		};
		function S(e) {
			return dw(e.snapshot, e.key, e.to, e.input);
		}
		function C(e, t) {
			v.value = {
				kind: e,
				key: t.key,
				label: x(t.key),
				to: t.to,
				count: t.items.length
			};
		}
		function w(t, n, r = "handle", i = 0) {
			z(() => {
				if (_ || e.disabled) return;
				let a = document.activeElement;
				if (a && a !== document.body && a !== n && !s.value?.contains(a)) return;
				let o = r === "up" ? f : r === "down" ? p : d, c = b(t) ? void 0 : o.get(t);
				if (b(t) || c && !c.disabled || (c = d.get(t)), !c || c.disabled) {
					let e = h.value.snapshot?.keys || [], t = Math.max(0, Math.min(i, e.length - 1));
					c = [...e.slice(t), ...e.slice(0, t).reverse()].filter((e) => !b(e)).map((e) => d.get(e)).find((e) => e && !e.disabled);
				}
				c && !c.disabled ? c.focus({ preventScroll: !0 }) : s.value?.focus({ preventScroll: !0 });
			});
		}
		function T(e = "api", t = !0) {
			if (A.stop(), !g) return;
			let n = g, i = S(n), a = document.activeElement;
			g = void 0, c.value++, C("cancel", i), r("end", {
				...i,
				status: "cancel",
				reason: e
			}), t && w(n.key, a, "handle", i.from);
		}
		function E(t, n = "keyboard") {
			if (b(t)) return !1;
			let i = h.value.snapshot, a = i.keys.indexOf(t);
			if (a < 0) return !1;
			n === "keyboard" && T("api", !1);
			let o = {
				snapshot: i,
				key: t,
				to: a,
				keyer: e.itemKey,
				labeler: e.itemLabel,
				input: n
			};
			if (g = o, c.value++, d.get(t)?.focus({ preventScroll: !0 }), g !== o || b(t)) return !1;
			let s = S(o);
			return C("start", s), r("start", s), g === o;
		}
		function D() {
			if (!g) return;
			let e = g, t = S(e), n = document.activeElement;
			if (A.stop(), g = void 0, c.value++, b(e.key) || !h.value.snapshot || !uw(e.snapshot, h.value.snapshot)) {
				C("cancel", t), r("end", {
					...t,
					status: "cancel",
					reason: "external"
				});
				return;
			}
			let i = t.from !== t.to;
			C(i ? "commit" : "unchanged", t), i && (r("update:modelValue", [...t.items]), r("change", {
				...t,
				items: [...t.items]
			})), r("end", {
				...t,
				items: [...t.items],
				status: i ? "commit" : "unchanged"
			}), w(e.key, n);
		}
		function O(e, t) {
			if (b(e)) return;
			T("api", !1);
			let n = h.value.snapshot, i = n.keys.indexOf(e), a = dw(n, e, i + t, "button");
			if (!a) return;
			let o = document.activeElement;
			C("commit", a), r("update:modelValue", [...a.items]), r("change", {
				...a,
				items: [...a.items]
			}), r("end", {
				...a,
				items: [...a.items],
				status: "commit"
			}), w(e, o, t === -1 ? "up" : "down", i);
		}
		function k(e, t) {
			if (e.isComposing || e.altKey || e.ctrlKey || e.metaKey) return;
			if (e.key === "Tab") {
				T("tab", !1);
				return;
			}
			if (e.key === "Escape" && g) {
				e.preventDefault(), e.stopPropagation(), T("escape");
				return;
			}
			if (b(t)) return;
			if (e.key === " " || e.key === "Enter") {
				if (e.preventDefault(), e.stopPropagation(), e.repeat) return;
				g?.key === t ? D() : E(t);
				return;
			}
			if (!g || g.key !== t) return;
			let n = g, i = n.to;
			if (e.key === "ArrowUp") i--;
			else if (e.key === "ArrowDown") i++;
			else if (e.key === "Home") i = 0;
			else if (e.key === "End") i = n.snapshot.items.length - 1;
			else return;
			if (e.preventDefault(), e.stopPropagation(), i = Math.max(0, Math.min(n.snapshot.items.length - 1, i)), i === n.to) return;
			n.to = i, c.value++;
			let a = S(n);
			C("preview", a), r("preview", a);
		}
		let A = fw({
			visual: (e, t, n) => {
				let r = e === null ? void 0 : m.get(e)?.getBoundingClientRect();
				u.value = e !== null && r && typeof n == "number" ? {
					key: e,
					left: r.left,
					top: Math.max(8, Math.min(n - r.height / 2, window.innerHeight - r.height - 8)),
					width: r.width
				} : null;
			},
			list: () => l.value,
			row: (e) => m.get(e),
			keys: () => g?.snapshot.keys || h.value.snapshot?.keys || [],
			enabled: () => !y(),
			begin: (e) => E(e, "pointer"),
			finish: D,
			cancel: T,
			move: (e) => {
				if (!g || g.input !== "pointer" || g.to === e) return;
				g.to = e, c.value++;
				let t = S(g);
				C("preview", t), r("preview", t);
			}
		});
		function j(e, t) {
			if (e.button !== 0 || e.isPrimary === !1 || b(t)) return;
			T("api", !1);
			let n = h.value.snapshot;
			A.press(e, t, () => !b(t) && !!h.value.snapshot && uw(n, h.value.snapshot));
		}
		V(h, (t) => {
			g && t.locked.has(g.key) ? T("disabled") : A.pending() && !A.valid() && !g ? T("external", !1) : !g || t.snapshot && uw(g.snapshot, t.snapshot) || T(g.snapshot.source === e.modelValue && (g.keyer !== e.itemKey || g.labeler !== e.itemLabel) ? "configuration" : "external");
		}, { flush: "sync" }), V(() => [e.disabled, e.readonly], () => {
			if (e.disabled || e.readonly) {
				let e = typeof document < "u" ? document.activeElement : null, t = e instanceof HTMLElement && s.value?.contains(e) && (e.matches(".sol-ui-sortable-handle") || e.closest(".sol-ui-sortable-moves"));
				T("disabled", !1), t && z(() => {
					_ || document.activeElement !== document.body && document.activeElement !== e || s.value?.focus({ preventScroll: !0 });
				});
			}
		}, { flush: "sync" });
		let ee = () => T("blur", !1), M = () => {
			document.hidden && T("blur", !1);
		};
		return Yi(() => {
			window.addEventListener("blur", ee), document.addEventListener("visibilitychange", M);
		}), Qi(() => {
			_ = !0, T("unmount", !1), window.removeEventListener("blur", ee), document.removeEventListener("visibilitychange", M);
		}), i({
			focus: (t) => {
				if (!e.disabled) {
					let e = t ?? h.value.snapshot?.keys.find((e) => !b(e)), n = e === void 0 || b(e) ? void 0 : d.get(e);
					n && !n.disabled ? n.focus() : s.value?.focus();
				}
			},
			cancel: () => T("api")
		}), () => {
			c.value;
			let r = h.value.snapshot, i = r?.items || (Array.isArray(e.modelValue) ? e.modelValue : []), _ = e.error || (r ? "" : o.value.sortableInvalid), y = g?.snapshot.keys.indexOf(g.key) ?? -1, S = bC(e, n, _, e.id + "-keys"), C = v.value, w = C ? o.value.sortableStatus(C.kind, x(C.key, C.label), C.to + 1, C.count) : "";
			return X("div", {
				...t,
				ref: s,
				id: e.id,
				class: ["sol-field sol-ui-sortable", t.class],
				tabindex: -1,
				role: "group",
				"aria-labelledby": e.id + "-label",
				"aria-describedby": S,
				"aria-disabled": e.disabled ? "true" : void 0
			}, [
				X("p", {
					id: e.id + "-label",
					class: "sol-label"
				}, e.label),
				X("p", {
					id: e.id + "-keys",
					class: "sol-hint"
				}, o.value.sortableKeys),
				X("ol", {
					ref: l,
					class: "sol-ui-sortable-list",
					"aria-labelledby": e.id + "-label"
				}, [X(Pl, {
					name: "sol-ui-sortable",
					css: !1
				}, () => i.map((t, s) => {
					let c = r?.keys[s] ?? "invalid-" + s, l = h.value.labels[s] || o.value.record + " " + (s + 1), u = g?.key === c, _ = b(c), v = {
						item: t,
						index: s,
						key: c,
						active: u,
						disabled: _
					};
					return X("li", {
						key: c,
						ref: (e) => {
							e ? m.set(c, e) : m.delete(c);
						},
						class: "sol-ui-sortable-row",
						"data-active": u ? "true" : void 0,
						"data-disabled": h.value.locked.has(c) ? "true" : void 0,
						"data-controls": _ ? "hidden" : void 0,
						"data-insert": g?.to === s && g.to !== y ? g.to > y ? "after" : "before" : void 0
					}, [
						X("button", {
							ref: (e) => {
								e ? d.set(c, e) : d.delete(c);
							},
							type: "button",
							class: "sol-button sol-ui-sortable-handle",
							disabled: _,
							"aria-label": o.value.sortableHandle(l),
							"aria-pressed": String(u),
							"aria-describedby": e.id + "-keys",
							"data-pointer-focus": a.value === c ? "true" : void 0,
							onKeydown: (e) => {
								a.value = void 0, k(e, c);
							},
							onPointerdown: (e) => {
								a.value = c, j(e, c);
							},
							onDragstart: (e) => e.preventDefault(),
							onClick: (e) => {
								A.consumeClick(e) || (g?.key === c ? D() : E(c));
							},
							onBlur: () => {
								a.value = void 0, (g?.key === c || A.key() === c) && T("blur", !1);
							}
						}, n["handle-icon"]?.(v) || Yx(Ah.grip, 20, 0)),
						X("div", { class: "sol-ui-sortable-content" }, [n.item?.(v) || l, h.value.locked.has(c) ? X("span", { class: "sol-hint" }, o.value.unavailable) : null]),
						X("div", { class: "sol-ui-sortable-moves" }, [-1, 1].map((t) => X("button", {
							ref: (e) => {
								let n = t === -1 ? f : p;
								e ? n.set(c, e) : n.delete(c);
							},
							type: "button",
							class: "sol-button",
							disabled: _ || (t === -1 ? s === 0 : s === i.length - 1),
							"aria-label": o.value.sortableMove(l, t),
							"aria-describedby": e.id + "-keys",
							onClick: () => O(c, t)
						}, Yx(Ah.arrow, 20, t === -1 ? 270 : 90))))
					]);
				}))]),
				u.value ? X("div", {
					popover: "manual",
					class: "sol-ui-sortable-ghost",
					"aria-hidden": "true",
					style: {
						left: u.value.left + "px",
						top: u.value.top + "px",
						width: u.value.width + "px"
					},
					ref: (e) => {
						if (e instanceof HTMLElement) try {
							e.showPopover?.();
						} catch {
							e.removeAttribute("popover");
						}
					}
				}, x(u.value.key)) : null,
				i.length ? null : X("div", { class: "sol-hint" }, n.empty?.() || o.value.noResults),
				...xC(e, n, _),
				X("output", {
					class: "sol-hint sol-ui-sortable-status",
					role: "status",
					"aria-live": "polite"
				}, w)
			]);
		};
	}
});
function mw(e) {
	return typeof e != "string" || !/^\d{4}-\d{2}$/.test(e) ? null : wh(e + "-01");
}
function hw(e) {
	return wh(e) ? e.slice(0, 7) : null;
}
function gw(e) {
	return Number.isInteger(e) && e >= 0 && e <= 6;
}
function _w(e, t) {
	let n = mw(e);
	if (!n) return {
		valid: !1,
		reason: "month"
	};
	if (!gw(t)) return {
		valid: !1,
		reason: "first-day"
	};
	let r = (Eh(n) - t + 7) % 7, i = Ch(n.y, n.m), a = Array.from({ length: 42 }, (e, a) => {
		let o = a - r + 1;
		return o < 1 || o > i ? null : Object.freeze({
			iso: Sh({
				...n,
				d: o
			}),
			day: o,
			weekday: (t + a) % 7
		});
	});
	return Object.freeze({
		valid: !0,
		month: e,
		firstDay: t,
		weekdays: Object.freeze(Array.from({ length: 7 }, (e, n) => (t + n) % 7)),
		cells: Object.freeze(a)
	});
}
function vw(e, t) {
	let n = mw(e);
	return n && Number.isSafeInteger(t) ? Sh(Oh(n, t)).slice(0, 7) : null;
}
function yw(e, t, n) {
	let r = mw(e);
	if (!r) return null;
	for (let r of [t, n]) if (hw(r) === e) return r;
	return Sh(r);
}
function bw(e, t, n, r = !1) {
	let i = wh(e);
	if (!i || !gw(n)) return null;
	let a = (Eh(i) - n + 7) % 7, o;
	switch (t) {
		case "ArrowLeft":
			o = Dh(i, -1);
			break;
		case "ArrowRight":
			o = Dh(i, 1);
			break;
		case "ArrowUp":
			o = Dh(i, -7);
			break;
		case "ArrowDown":
			o = Dh(i, 7);
			break;
		case "Home":
			o = Dh(i, -a);
			break;
		case "End":
			o = Dh(i, 6 - a);
			break;
		case "PageUp":
			o = Oh(i, r ? -12 : -1);
			break;
		case "PageDown":
			o = Oh(i, r ? 12 : 1);
			break;
		default: return null;
	}
	return Sh(o);
}
var xw = (e) => e.tone === void 0 && e.category ? {
	"--sol-tag-fg": `var(--sol-color-categorical-${e.category.slice(1)}-foreground)`,
	"--sol-tag-bg": `var(--sol-color-categorical-${e.category.slice(1)}-background)`,
	borderColor: `var(--sol-color-categorical-${e.category.slice(1)}-border)`
} : void 0, Sw = /* @__PURE__ */ new Set([
	"neutral",
	"accent",
	"info",
	"success",
	"warning",
	"danger"
]), Cw = /* @__PURE__ */ new Set([
	"ArrowLeft",
	"ArrowRight",
	"ArrowUp",
	"ArrowDown",
	"Home",
	"End",
	"PageUp",
	"PageDown"
]), ww = /* @__PURE__ */ H({
	name: "SMonthCalendar",
	inheritAttrs: !1,
	props: {
		...vC,
		modelValue: {
			type: String,
			default: null
		},
		month: {
			type: String,
			required: !0
		},
		firstDay: Number,
		today: String,
		markers: {
			type: Object,
			default: () => ({})
		},
		markerLimit: {
			type: Number,
			default: 2
		},
		isDateDisabled: Function,
		loading: Boolean
	},
	slots: Object,
	emits: {
		"update:modelValue": (e) => !0,
		"update:month": (e) => !0,
		change: (e) => !0,
		"month-change": (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ new Map(), l = fS(), u = Y(() => e.today === void 0 ? l : e.today), d = Y(() => e.firstDay === void 0 ? a.value.firstDay : e.firstDay), f = Y(() => _w(e.month, d.value)), p = /* @__PURE__ */ F(yw(e.month, e.modelValue, u.value)), m = /* @__PURE__ */ F(!0), h = !1, g, _ = Y(() => {
			let t = f.value, n = /* @__PURE__ */ new Map(), r = !t.valid || e.modelValue !== null && !wh(e.modelValue) || !wh(u.value) || !Number.isSafeInteger(e.markerLimit) || e.markerLimit < 0 || !e.markers || typeof e.markers != "object" || Array.isArray(e.markers);
			if (t.valid) {
				for (let i of t.cells) if (i) try {
					let t = e.isDateDisabled ? e.isDateDisabled(i.iso) : !1, r = e.markers?.[i.iso] ?? [], a = /* @__PURE__ */ new Set();
					if (typeof t != "boolean" || !Array.isArray(r)) throw Error("Invalid calendar data");
					let o = r.map((e) => {
						if (!e || typeof e.id != "string" || !e.id.trim() || a.has(e.id) || typeof e.label != "string" || !e.label.trim() || e.tone !== void 0 && !Sw.has(e.tone) || e.icon !== void 0 && !Object.hasOwn(Ah, e.icon) || e.category !== void 0 && (typeof e.category != "string" || !/^c[1-8]$/.test(e.category))) throw Error("Invalid calendar marker");
						return a.add(e.id), Object.freeze({
							id: e.id,
							label: e.label,
							tone: e.tone,
							icon: e.icon,
							category: e.category
						});
					});
					n.set(i.iso, {
						disabled: t,
						markers: Object.freeze(o)
					});
				} catch {
					r = !0, n.set(i.iso, {
						disabled: !0,
						markers: []
					});
				}
			}
			return {
				invalid: r,
				days: n,
				hasMarkers: [...n.values()].some((e) => e.markers.length > 0)
			};
		}), v = (t) => !!(e.disabled || e.readonly || e.loading || _.value.invalid || _.value.days.get(t)?.disabled);
		function y(t, n = null) {
			g = void 0, t && hw(t) === e.month && (p.value = t), z(() => {
				if (h || e.disabled) return;
				let t = document.activeElement;
				if (n && t && t !== document.body && t !== n && !o.value?.contains(t)) return;
				let r = p.value ? c.get(p.value) : void 0;
				r && !r.disabled ? (r.focus({ preventScroll: !0 }), r.scrollIntoView?.({
					block: "nearest",
					inline: "nearest"
				})) : o.value?.focus({ preventScroll: !0 });
			});
		}
		function b(t, n, i) {
			if (e.disabled || !f.value.valid || !t) return;
			if (t === e.month) {
				i && y(i, document.activeElement);
				return;
			}
			g = i ? {
				month: t,
				date: i,
				origin: document.activeElement
			} : void 0;
			let a = e.month;
			r("update:month", t), r("month-change", {
				month: t,
				previousMonth: a,
				reason: n
			});
		}
		function x(t) {
			let n = Number(t.value), r = Number(e.month.slice(0, 4));
			/^\d{1,4}$/.test(t.value) && Number.isInteger(n) && n >= 1 && n <= 9999 && b(String(n).padStart(4, "0") + e.month.slice(4), n < r ? "previous" : "next"), z(() => {
				t.value = e.month.slice(0, 4);
			});
		}
		function S(t, n) {
			if (e.disabled || e.loading || _.value.invalid || !_.value.days.has(t) || (g = void 0, p.value = t, m.value = !0, n === "pointer" && _.value.days.get(t)?.markers.length && z(() => {
				h || (s.value?.focus({ preventScroll: !0 }), s.value?.scrollIntoView?.({ block: "nearest" }));
			}), v(t) || t === e.modelValue)) return;
			let i = e.modelValue;
			r("update:modelValue", t), r("change", {
				value: t,
				previousValue: i,
				reason: n
			});
		}
		function C(t, n) {
			if (!(t.isComposing || t.altKey || t.ctrlKey || t.metaKey || e.disabled)) {
				if (Cw.has(t.key)) {
					t.preventDefault();
					let r = bw(n, t.key, d.value, t.shiftKey);
					if (!r) return;
					hw(r) === e.month ? y(r, t.currentTarget) : b(hw(r), "keyboard", r);
				} else t.key === "Enter" || t.key === " " ? (t.preventDefault(), t.repeat || S(n, "keyboard")) : t.key === "Escape" && (t.preventDefault(), y(yw(e.month, e.modelValue, u.value), t.currentTarget));
			}
		}
		return V(() => e.month, () => {
			let t = g;
			g = void 0, p.value = t?.month === e.month ? t.date : yw(e.month, e.modelValue, u.value), t?.month === e.month && y(t.date, t.origin);
		}, { flush: "post" }), V(() => e.modelValue, () => {
			o.value?.contains(document.activeElement) || (p.value = yw(e.month, e.modelValue, u.value));
		}), V(() => e.disabled, (e) => {
			e && (g = void 0);
		}), Qi(() => {
			h = !0, g = void 0, c.clear();
		}), i({ focus: (e) => y(e ?? p.value) }), () => {
			let r = f.value, i = e.error || (_.value.invalid ? a.value.monthCalendarInvalid : ""), l = e.loading, d = !l && !_.value.hasMarkers && !_.value.invalid, h = bC(e, n, i, [
				e.id + "-keys",
				d ? e.id + "-empty" : "",
				l ? e.id + "-loading" : "",
				e.readonly ? e.id + "-readonly" : "",
				t["aria-describedby"]
			].filter(Boolean).join(" ")), w = r.valid ? Lx(e.month + "-01", a.value, {
				year: "numeric",
				month: "long",
				day: void 0
			}) : e.month, T = (t) => X("button", {
				type: "button",
				class: "sol-button",
				"aria-label": t === -1 ? a.value.previousMonth : a.value.nextMonth,
				disabled: e.disabled || !r.valid || vw(e.month, t) === e.month,
				onClick: () => b(vw(e.month, t), t === -1 ? "previous" : "next")
			}, Yx(Ah.chevron, 20, t === -1 ? 90 : 270)), E = r.valid ? r.cells : Array.from({ length: 42 }, () => null), D = p.value && _.value.days.get(p.value)?.markers || [];
			return X("div", {
				...t,
				ref: o,
				id: e.id,
				class: ["sol-field sol-ui-month-calendar", t.class],
				role: "group",
				tabindex: -1,
				"aria-labelledby": e.id + "-label",
				"aria-describedby": h,
				"aria-busy": l ? "true" : void 0,
				"aria-disabled": e.disabled ? "true" : void 0
			}, [
				X("p", {
					id: e.id + "-label",
					class: "sol-label"
				}, e.label),
				X("div", { class: "sol-ui-month-toolbar" }, [
					X("h3", {
						id: e.id + "-month",
						"aria-live": "polite",
						"aria-atomic": "true"
					}, w),
					X("label", { class: "sol-ui-month-year" }, [X("span", { class: "sol-label" }, a.value.monthCalendarYear), X("input", {
						class: "sol-input",
						type: "number",
						min: 1,
						max: 9999,
						step: 1,
						inputmode: "numeric",
						value: r.valid ? e.month.slice(0, 4) : "",
						disabled: e.disabled || !r.valid,
						onChange: (e) => x(e.currentTarget),
						onKeydown: (e) => {
							e.key === "Enter" && !e.isComposing && (e.preventDefault(), x(e.currentTarget));
						}
					})]),
					X("div", { class: "sol-ui-month-navigation" }, [T(-1), T(1)]),
					X("button", {
						type: "button",
						class: "sol-button",
						disabled: e.disabled || !r.valid || !wh(u.value),
						onClick: () => b(hw(u.value), "today", u.value)
					}, a.value.today)
				]),
				X("p", {
					id: e.id + "-keys",
					class: "sol-hint"
				}, a.value.monthCalendarKeys),
				e.readonly ? X("p", {
					id: e.id + "-readonly",
					class: "sol-hint"
				}, a.value.monthCalendarReadonly) : null,
				X("table", {
					class: "sol-ui-month-table",
					"aria-labelledby": e.id + "-month"
				}, [X("thead", X("tr", Array.from({ length: 7 }, (e, t) => {
					let n = r.valid ? r.weekdays[t] : t, i = "2023-01-0" + (n + 1), o = {
						year: void 0,
						month: void 0,
						day: void 0
					};
					return X("th", {
						scope: "col",
						"data-sunday": n === 0 ? "true" : void 0
					}, X("abbr", { title: Lx(i, a.value, {
						...o,
						weekday: "long"
					}) }, Lx(i, a.value, {
						...o,
						weekday: "short"
					})));
				}))), X("tbody", Array.from({ length: 6 }, (t, i) => X("tr", { hidden: r.valid && !E.slice(i * 7, i * 7 + 7).some(Boolean) }, E.slice(i * 7, i * 7 + 7).map((t) => {
					if (!t) return X("td", {
						"aria-hidden": "true",
						class: "sol-ui-month-spacer"
					}, X("div", { class: "sol-ui-month-cell" }));
					let r = _.value.days.get(t.iso), i = e.modelValue === t.iso, o = t.iso === u.value, s = {
						date: t.iso,
						day: t.day,
						selected: i,
						today: o,
						disabled: v(t.iso),
						markers: r.markers
					}, l = [
						kx(Lx(t.iso, a.value, {
							year: "numeric",
							month: "long",
							day: "numeric",
							weekday: "long"
						}), String(t.day)),
						o ? a.value.monthCalendarToday : "",
						i ? a.value.selected : "",
						s.disabled ? a.value.unavailable : "",
						...r.markers.map((e) => e.label),
						r.markers.length ? a.value.monthCalendarCount(r.markers.length) : ""
					].filter(Boolean).join(" · ");
					return X("td", {
						key: t.iso,
						"data-date": t.iso
					}, X("div", { class: "sol-ui-month-cell" }, [X("button", {
						type: "button",
						class: "sol-button sol-ui-month-day",
						ref: (e) => {
							e ? c.set(t.iso, e) : c.delete(t.iso);
						},
						tabindex: t.iso === p.value ? 0 : -1,
						disabled: e.disabled,
						"aria-disabled": s.disabled ? "true" : void 0,
						"aria-pressed": String(i),
						"aria-current": o ? "date" : void 0,
						"aria-label": l,
						"aria-describedby": e.id + "-keys",
						"data-today": o ? "true" : void 0,
						"data-sunday": t.weekday === 0 ? "true" : void 0,
						onFocus: () => {
							g = void 0, p.value = t.iso;
						},
						onClick: (e) => S(t.iso, e.detail ? "pointer" : "keyboard"),
						onKeydown: (e) => C(e, t.iso)
					}, [
						X("span", { class: "sol-ui-month-number" }, [String(t.day), i ? X("span", { "aria-hidden": "true" }, " ✓") : null]),
						...r.markers.slice(0, Math.max(0, e.markerLimit)).map((e, r) => X("span", {
							key: e.id,
							class: "sol-ui-month-marker",
							title: e.label
						}, n.marker?.({
							date: t.iso,
							marker: e,
							index: r
						}) || X(Qx, {
							tone: e.tone ?? "neutral",
							size: "sm",
							style: xw(e)
						}, () => [e.icon ? X(Xx, {
							name: e.icon,
							size: 16,
							decorative: !0
						}) : null, X("span", e.label)]))),
						r.markers.length > e.markerLimit ? X("span", {
							class: "sol-ui-month-more",
							title: a.value.monthCalendarMore(r.markers.length - e.markerLimit)
						}, "+" + (r.markers.length - e.markerLimit)) : null,
						r.markers.length ? X("span", {
							class: "sol-ui-month-marker-count",
							"aria-hidden": "true",
							title: a.value.monthCalendarCount(r.markers.length)
						}, String(r.markers.length)) : null
					]), n.cell?.(s)]));
				}))))]),
				X("p", {
					id: e.id + "-loading",
					class: "sol-hint sol-ui-month-loading",
					role: l ? "status" : void 0,
					"aria-hidden": l ? void 0 : "true"
				}, l ? a.value.monthCalendarLoading : ""),
				!d || l ? X("section", {
					class: "sol-ui-month-details",
					hidden: !m.value,
					ref: s,
					tabindex: 0,
					role: "region",
					"aria-labelledby": e.id + "-details-label",
					onKeydown: (e) => {
						e.key === "Escape" && !e.isComposing && (e.preventDefault(), e.stopPropagation(), m.value = !1, y(p.value));
					}
				}, [X("div", { class: "sol-ui-month-details-header" }, [X("h4", { id: e.id + "-details-label" }, [p.value ? Lx(p.value, a.value) + " · " : "", a.value.monthCalendarDetails]), X("button", {
					type: "button",
					class: "sol-button subtle sol-ui-month-details-close",
					onClick: () => {
						m.value = !1, y(p.value);
					}
				}, a.value.close)]), D.length ? X("ul", {
					tabindex: 0,
					"aria-labelledby": e.id + "-details-label"
				}, D.map((e) => X("li", { key: e.id }, [e.icon ? X(Xx, {
					name: e.icon,
					size: 16,
					decorative: !0
				}) : null, X(Qx, {
					content: e.label,
					size: "sm",
					tone: e.tone,
					style: e.category && e.tone === void 0 ? xw(e) : void 0
				})]))) : X("p", { class: "sol-hint" }, l ? a.value.monthCalendarLoading : a.value.monthCalendarEmpty)]) : null,
				d ? X("div", {
					id: e.id + "-empty",
					class: "sol-hint"
				}, n.empty?.() || a.value.monthCalendarEmpty) : null,
				...xC(e, n, i)
			]);
		};
	}
}), Tw = "1.1.1", Ew = /* @__PURE__ */ H({
	name: "SBtnGroup",
	inheritAttrs: !1,
	props: {
		label: {
			type: String,
			required: !0
		},
		orientation: {
			type: String,
			default: "horizontal"
		}
	},
	slots: Object,
	setup(e, { attrs: t, slots: n }) {
		return () => X("div", {
			...t,
			role: "group",
			"aria-label": e.label,
			class: ["sol-ui-button-group", t.class],
			"data-orientation": e.orientation
		}, [n.default?.()]);
	}
}), Dw = /* @__PURE__ */ H({
	name: "SConfirmAction",
	inheritAttrs: !1,
	props: {
		label: {
			type: String,
			required: !0
		},
		confirmLabel: {
			type: String,
			required: !0
		},
		timeout: {
			type: Number,
			default: 5e3
		},
		cancelOnBlur: {
			type: Boolean,
			default: !0
		},
		disabled: Boolean,
		loading: Boolean,
		error: {
			type: String,
			default: ""
		},
		variant: {
			type: String,
			default: "secondary"
		},
		tone: String
	},
	slots: Object,
	emits: {
		confirm: (e) => !0,
		cancel: (e) => !0,
		armedChange: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F(""), s = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(null), l = ri(), u, d = !1, f = !1, p = () => e.disabled || e.loading || t["aria-disabled"] === !0 || t["aria-disabled"] === "true";
		function m() {
			u !== void 0 && clearTimeout(u), u = void 0;
		}
		function h(t) {
			m(), s.value = void 0, a.value && (a.value = !1, o.value = e.label, r("armedChange", !1), r("cancel", t));
		}
		function g(t) {
			if (t.preventDefault(), d || p() || f) return;
			if (f = !0, z(() => {
				f = !1;
			}), a.value) {
				m(), a.value = !1, s.value = void 0, o.value = "", r("armedChange", !1), r("confirm", t);
				return;
			}
			s.value = c.value?.$el?.getBoundingClientRect().width, a.value = !0, o.value = e.confirmLabel, r("armedChange", !0);
			let n = Number.isFinite(e.timeout) && e.timeout >= 0 ? Math.min(e.timeout, 2147483647) : 5e3;
			n > 0 && (u = setTimeout(() => h("timeout"), n));
		}
		function _(e) {
			(e.isComposing || e.repeat) && (e.key === "Enter" || e.key === " ") ? e.preventDefault() : e.key === "Escape" && !e.isComposing && a.value && (e.preventDefault(), e.stopPropagation(), h("escape"));
		}
		return V(() => [e.disabled, e.loading], () => {
			(e.disabled || e.loading) && h(e.disabled ? "disabled" : "loading");
		}), V(() => [
			e.label,
			e.confirmLabel,
			e.timeout,
			e.cancelOnBlur
		], () => h("configuration")), V(() => e.error, (e) => {
			e && h("error");
		}), Qi(() => {
			h("unmount"), d = !0, m();
		}), i({
			focus: () => {
				d || c.value?.$el?.focus();
			},
			reset: () => {
				d || (h("reset"), o.value = "");
			}
		}), () => {
			let { href: r, to: i, type: u, ...d } = t, f = {
				armed: a.value,
				disabled: p(),
				loading: e.loading
			};
			return X("span", {
				class: "sol-ui-confirm-action",
				"data-armed": String(a.value)
			}, [
				X(DS, {
					...d,
					ref: c,
					type: "button",
					variant: e.variant,
					tone: e.tone,
					disabled: e.disabled,
					loading: e.loading,
					style: [t.style, s.value ? { minInlineSize: `min(${s.value}px,100%)` } : void 0],
					"aria-describedby": [t["aria-describedby"], e.error ? l + "-error" : ""].filter(Boolean).join(" ") || void 0,
					onClick: g,
					onKeydown: _,
					onBlur: () => {
						e.cancelOnBlur && h("blur");
					}
				}, () => [n.leading?.(f), X("span", a.value ? e.confirmLabel : e.label)]),
				X("span", {
					class: "sol-ui-sr-only",
					role: "status",
					"aria-live": "polite",
					"aria-atomic": "true"
				}, o.value),
				e.error ? X("span", {
					id: l + "-error",
					class: "sol-error",
					role: "alert"
				}, e.error) : null
			]);
		};
	}
}), Ow = /* @__PURE__ */ H({
	name: "STextField",
	inheritAttrs: !1,
	props: {
		...yC,
		...sC,
		modelValue: {
			type: String,
			default: ""
		},
		type: {
			type: String,
			default: "text"
		}
	},
	slots: Object,
	emits: {
		"update:modelValue": (e) => !0,
		blur: (e) => !0,
		focus: (e) => !0,
		clear: (e) => !0
	},
	setup(e, { attrs: t, slots: n, emit: r, expose: i }) {
		let a = Nx(() => e.locale), o = /* @__PURE__ */ F(null), s = iC(e, () => e.modelValue, { focus: () => o.value?.focus?.() }), c = dC(e, n, {
			locale: () => a.value,
			hasValue: () => e.modelValue.length > 0,
			disabled: () => Q(e),
			readonly: () => $(e),
			error: () => rC(e),
			clear: () => {
				e.modelValue !== "" && r("update:modelValue", ""), r("clear", {
					value: "",
					reason: "clear"
				});
			},
			validate: s.validate,
			focus: s.focus,
			element: () => typeof document > "u" ? null : document.getElementById(e.id)
		});
		return i({
			...s,
			clear: c.clear
		}), () => {
			let i = rC(e);
			return X("div", { class: "sol-ui-field" }, [
				SC(e, n, a.value.required),
				X(Tx, {
					...t,
					ref: o,
					id: e.id,
					modelValue: e.modelValue,
					"onUpdate:modelValue": (e) => r("update:modelValue", String(e ?? "")),
					type: e.type,
					disabled: Q(e),
					readonly: $(e),
					required: e.required,
					error: !!i,
					"aria-invalid": String(!!i),
					"aria-busy": e.loading ? "true" : void 0,
					"aria-describedby": bC(e, n, i, t["aria-describedby"]),
					hideDetails: !0,
					variant: "outlined",
					density: "compact",
					clearable: !1,
					class: [
						"sol-ui-input",
						c.enhanced() ? "sol-ui-input-enhanced" : void 0,
						t.class
					],
					onBlur: (e) => {
						s.validate(), r("blur", e);
					},
					onFocus: (e) => r("focus", e)
				}, c.vuetifySlots()),
				...xC(e, n, i)
			]);
		};
	}
});
function kw(e = {}) {
	let t = {};
	for (let [e, n] of Object.entries(Tb.themes)) for (let r of ["light", "dark"]) {
		let i = n[r];
		t[e + "-" + r] = {
			dark: r === "dark",
			colors: {
				background: i.canvas,
				surface: i.surface,
				"surface-variant": i["surface-alt"],
				"on-background": i.text,
				"on-surface": i.text,
				primary: i.accent,
				"on-primary": i["on-accent"],
				secondary: i.accent,
				"on-secondary": i["on-accent"],
				error: i.danger,
				"on-error": i.surface,
				success: i.success,
				"on-success": i.surface,
				warning: i.warning,
				"on-warning": i.surface,
				info: i.info,
				"on-info": i.surface
			},
			variables: {
				"border-color": i["control-border"],
				"border-opacity": 1
			}
		};
	}
	let n = {
		VApp: { class: "sol-vuetify" },
		VBtn: {
			ripple: !1,
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
	}, r = {
		...n,
		...e.defaults
	};
	for (let t of Object.keys(n)) e.defaults?.[t] && (r[t] = {
		...n[t],
		...e.defaults[t]
	});
	return Uv({
		...e,
		defaults: r,
		theme: e.theme !== !1 && {
			...e.theme,
			defaultTheme: e.theme?.defaultTheme ?? "violet-light",
			themes: {
				...t,
				...e.theme?.themes
			}
		}
	});
}
function Aw(e, t, n) {
	let r = t.theme + "-" + t.mode;
	if (!Object.hasOwn(Tb.themes, t.theme) || !["light", "dark"].includes(t.mode) || t.density !== void 0 && !["comfortable", "compact"].includes(t.density) || !e.themes.value[r]) return !1;
	let i = n ?? (typeof document > "u" ? void 0 : document.documentElement);
	if (!i) throw Error("applySolyiAppearance requires a DOM target. Use defaultTheme for SSR.");
	return i.dataset.theme = t.theme, i.dataset.mode = t.mode, t.density && (i.dataset.density = t.density), e.change(r, !1), !0;
}
function jw(e, t) {
	let n = e === "close" ? 16 : 20;
	return Yx(Ah[e], n, 0, { class: [
		"sol-ui-icon",
		n === 16 ? "sol-ui-icon--small" : void 0,
		t ? "sol-ui-icon--" + t : void 0
	] });
}
var Mw = $x(DS), Nw = /* @__PURE__ */ H({
	name: "SDialog",
	inheritAttrs: !1,
	props: {
		locale: Object,
		id: {
			type: String,
			required: !0
		},
		title: {
			type: String,
			required: !0
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
		},
		busy: Boolean,
		busyScope: {
			type: String,
			default: "body"
		}
	},
	slots: Object,
	emits: {
		"update:modelValue": (e) => !0,
		close: () => !0
	},
	setup(e, { attrs: t, slots: n, emit: r }) {
		let i = Nx(() => e.locale), a = /* @__PURE__ */ F(null), o = NS(), s = /* @__PURE__ */ F(null), c = null, l = null, u = null, d = () => e.busy && e.busyScope === "all", f = (e) => {
			(e || !d()) && r("update:modelValue", e);
		}, p = () => {
			let t = e.returnFocus || c;
			t?.isConnected && t.focus({ preventScroll: !0 });
		};
		return V(() => e.modelValue, async (t, n) => {
			typeof document < "u" && (t ? (c = document.activeElement instanceof HTMLElement ? document.activeElement : null, await z(), e.modelValue && (d() ? s.value : a.value?.$el)?.focus()) : n && (await z(), p(), r("close")));
		}, { immediate: !0 }), Qi(() => {
			e.modelValue && p();
		}), V(() => [
			e.busy,
			e.busyScope,
			e.modelValue
		], async () => {
			if (typeof document < "u") {
				if (e.busy && e.modelValue) {
					let t = document.activeElement;
					if (t instanceof HTMLElement && s.value?.contains(t) && (t === u || d() || s.value.querySelector(".sol-ui-dialog-body")?.contains(t))) {
						if (l ??= t, await z(), !e.modelValue || !e.busy) return;
						u = d() ? s.value : a.value?.$el || null, u?.focus({ preventScroll: !0 });
					}
				} else {
					let t = l, n = u;
					l = null, u = null, await z(), e.modelValue && t?.isConnected && document.activeElement === n && t.focus({ preventScroll: !0 });
				}
			}
		}), () => {
			let r = {
				busy: e.busy,
				busyScope: e.busyScope
			};
			return X(Sb, {
				...t,
				style: [o.value ? {
					top: o.value.top + "px",
					left: o.value.left + "px",
					width: o.value.width + "px",
					height: o.value.height + "px",
					right: "auto",
					bottom: "auto",
					"--sol-dialog-viewport-height": o.value.height + "px"
				} : void 0, t.style],
				modelValue: e.modelValue,
				"onUpdate:modelValue": f,
				maxWidth: e.presentation === "drawer" ? 440 : e.maxWidth,
				transition: !1,
				persistent: d() ? !0 : t.persistent,
				"aria-labelledby": e.id + "-title",
				class: [
					"sol-ui-overlay",
					e.presentation === "drawer" ? "sol-ui-drawer-overlay" : void 0,
					t.class
				]
			}, () => X("section", {
				ref: s,
				class: "sol-ui-dialog",
				id: e.id,
				tabindex: -1,
				"aria-busy": e.busy ? "true" : void 0
			}, [
				X("div", { class: "sol-ui-dialog-heading" }, [X("div", { class: "sol-surface-heading" }, [e.eyebrow ? X("span", { class: "eyebrow" }, e.eyebrow) : null, X("h2", { id: e.id + "-title" }, e.title)]), X(Mw, {
					id: e.id + "-close",
					ref: a,
					variant: "subtle",
					icon: "close",
					label: e.closeLabel?.trim() || i.value.close,
					autofocus: !0,
					disabled: d(),
					onClick: () => f(!1)
				})]),
				X("div", {
					class: "sol-ui-dialog-body",
					inert: e.busy || void 0
				}, [n.default?.(r)]),
				n.feedback ? X("div", {
					class: "sol-ui-dialog-feedback",
					inert: d() || void 0
				}, [n.feedback(r)]) : null,
				n.actions || n["actions-start"] ? X("div", {
					class: "sol-ui-dialog-actions",
					inert: d()
				}, [n["actions-start"] ? X("div", { class: "sol-ui-dialog-actions-start" }, [n["actions-start"](r)]) : null, n.actions?.(r)]) : null
			]));
		};
	}
}), Pw = {
	STimeGrid: ES,
	SPagination: jS,
	SLoadingOverlay: VS,
	SEmptyState: US,
	SConfirmAction: Dw,
	SCombobox: zC,
	SMonthCalendar: ww,
	SSortableList: pw,
	SChip: Zx,
	SBadge: Qx,
	SIcon: Xx,
	SIconBtn: Mw,
	SForm: aC,
	SContainer: kb,
	SRow: Qb,
	SCol: Rb,
	SCard: HS,
	SAlert: WS,
	STree: GS,
	SProgressLinear: zS,
	SProgressCircular: BS,
	SBtnGroup: Ew,
	SBtn: DS,
	STextField: Ow,
	SDialog: Nw,
	SDataTable: /* @__PURE__ */ H({
		name: "SDataTable",
		inheritAttrs: !1,
		props: {
			locale: Object,
			columns: {
				type: Array,
				required: !0
			},
			rows: {
				type: Array,
				required: !0
			},
			caption: {
				type: String,
				required: !0
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
			siblingCount: {
				type: Number,
				default: 1
			},
			compactPagination: Boolean,
			loading: Boolean,
			error: {
				type: String,
				default: ""
			},
			emptyText: String
		},
		emits: {
			"update:selected": (e) => !0,
			"update:sort": (e) => !0,
			"update:page": (e) => !0,
			retry: () => !0,
			rowAction: (e) => !0
		},
		setup(e, { attrs: t, slots: n, emit: r }) {
			let i = Nx(() => e.locale), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(null), u = /* @__PURE__ */ F(null), d = "sol-table-" + ri(), f = () => {};
			Yi(() => {
				a.value && (f = wb(a.value, () => i.value));
			}), V(i, () => z(() => f.refresh?.()));
			let p = (e, t) => {
				let n = e[t.key];
				return t.format === "date" && typeof n == "string" ? Lx(n, i.value) : (t.format === "number" || !t.format && typeof n == "number") && typeof n == "number" ? Fx(n, i.value) : String(n ?? "—");
			};
			V(() => [e.loading, e.error], async () => {
				let e = document.activeElement, t = a.value?.querySelector(".sol-ui-table-retry");
				e && t?.contains(e) && (await z(), !e.isConnected && document.activeElement === document.body && o.value?.focus());
			});
			function m(t, n) {
				let i = new Set(e.selected);
				n ? i.add(t) : i.delete(t), r("update:selected", [...i]);
			}
			function h(t) {
				let n = new Set(e.selected);
				for (let r of e.rows) t ? n.add(r.id) : n.delete(r.id);
				r("update:selected", [...n]);
			}
			async function g(e) {
				r("update:page", e), await z(), a.value?.querySelector(".sol-pagination [aria-current=\"page\"]")?.focus();
			}
			V(() => [e.selectable, e.rows.map((t) => [t.id, e.selected.includes(t.id)])], async () => {
				await z();
				for (let t of [s.value, c.value]) t && (t.indeterminate = e.rows.some((t) => e.selected.includes(t.id)) && !e.rows.every((t) => e.selected.includes(t.id)));
			}, { immediate: !0 }), Qi(() => f());
			let _ = (e, t) => X("span", { class: t.ellipsis === !1 ? "" : "sol-ellipsis sol-ui-cell-clip" }, n["cell-" + t.key]?.({
				row: e,
				value: e[t.key]
			}) || p(e, t)), v = (t) => X(DS, {
				variant: "inline",
				"aria-label": i.value.details + " · " + String(t[e.columns[0]?.key] ?? i.value.record),
				onClick: (e) => {
					u.value = e.currentTarget, l.value = t, r("rowAction", t);
				}
			}, () => i.value.details), y = () => e.loading || !!e.error;
			return () => {
				let n = Math.max(1, Math.min(e.page, Math.max(1, e.pageCount))), f = Math.max(1, e.pageCount), b = AS(n, f, e.siblingCount);
				return X("div", {
					...t,
					ref: a,
					class: ["sol-ui-table", t.class],
					"aria-busy": String(e.loading)
				}, [
					X("div", { class: "sol-ui-table-desktop" }, X("table", { class: "sol-data-table" }, [
						X("caption", e.caption),
						X("colgroup", [
							e.selectable ? X("col", { style: { width: "48px" } }) : null,
							...e.columns.map((e) => X("col", { style: { width: e.width } })),
							X("col", { style: { width: "72px" } })
						]),
						X("thead", X("tr", [
							e.selectable ? X("th", { scope: "col" }, X("input", {
								ref: s,
								type: "checkbox",
								"aria-label": i.value.selectPage,
								checked: !!e.rows.length && e.rows.every((t) => e.selected.includes(t.id)),
								disabled: y() || !e.rows.length,
								onChange: (e) => h(e.target.checked)
							})) : null,
							...e.columns.map((t) => X("th", {
								scope: "col",
								style: { textAlign: t.align },
								"aria-sort": t.sortable ? e.sort?.key === t.key ? e.sort.direction : "none" : void 0
							}, t.sortable ? X(DS, {
								variant: "subtle",
								class: "sol-sort-button",
								disabled: y(),
								onClick: () => r("update:sort", {
									key: t.key,
									direction: e.sort?.key === t.key && e.sort.direction === "ascending" ? "descending" : "ascending"
								})
							}, () => [t.label, X("span", {
								"aria-hidden": "true",
								class: "sol-sort-symbol"
							}, e.sort?.key === t.key ? e.sort.direction === "ascending" ? "↑" : "↓" : "↕")]) : t.label)),
							X("th", { scope: "col" }, i.value.details)
						])),
						X("tbody", y() ? [] : e.rows.map((t) => X("tr", {
							key: t.id,
							"data-row-id": t.id,
							"data-selected": e.selected.includes(t.id)
						}, [
							e.selectable ? X("td", X("input", {
								type: "checkbox",
								"aria-label": i.value.selectRecord(String(t[e.columns[0]?.key] ?? i.value.record)),
								checked: e.selected.includes(t.id),
								onChange: (e) => m(t.id, e.target.checked)
							})) : null,
							...e.columns.map((e) => X("td", { style: { textAlign: e.align } }, _(t, e))),
							X("td", v(t))
						])))
					])),
					X("p", { class: "sol-ui-table-mobile-caption" }, e.caption),
					e.columns.some((e) => e.sortable) ? X("div", { class: "sol-ui-table-mobile-sort" }, [X("label", { class: "sol-field" }, [X("span", { class: "sol-label" }, i.value.sortField), X("select", {
						class: "sol-select",
						value: e.columns.some((t) => t.sortable && t.key === e.sort?.key) ? e.sort?.key : "",
						disabled: y(),
						onChange: (e) => r("update:sort", {
							key: e.target.value,
							direction: "ascending"
						})
					}, [X("option", {
						value: "",
						disabled: !0
					}, i.value.chooseSort), ...e.columns.filter((e) => e.sortable).map((e) => X("option", { value: e.key }, e.label))])]), X(DS, {
						disabled: y() || !e.columns.some((t) => t.sortable && t.key === e.sort?.key),
						"aria-label": i.value.sortDirection(e.sort?.direction === "descending" ? i.value.descending : i.value.ascending),
						onClick: () => {
							e.sort && r("update:sort", {
								key: e.sort.key,
								direction: e.sort.direction === "ascending" ? "descending" : "ascending"
							});
						}
					}, () => e.sort?.direction === "descending" ? i.value.descending : i.value.ascending)]) : null,
					e.selectable ? X("label", { class: "sol-choice sol-ui-table-mobile-select" }, [X("input", {
						ref: c,
						type: "checkbox",
						checked: !!e.rows.length && e.rows.every((t) => e.selected.includes(t.id)),
						disabled: y() || !e.rows.length,
						onChange: (e) => h(e.target.checked)
					}), i.value.selectPage]) : null,
					X("ul", {
						class: "sol-ui-table-mobile",
						"aria-label": e.caption
					}, y() ? [] : e.rows.map((t) => X("li", {
						key: t.id,
						"data-row-id": t.id,
						"data-selected": e.selected.includes(t.id)
					}, [
						e.selectable ? X("label", { class: "sol-choice" }, [X("input", {
							type: "checkbox",
							"aria-label": i.value.selectRecord(String(t[e.columns[0]?.key] ?? i.value.record)),
							checked: e.selected.includes(t.id),
							onChange: (e) => m(t.id, e.target.checked)
						}), i.value.selectRecords]) : null,
						X("dl", e.columns.flatMap((e) => [X("dt", e.label), X("dd", _(t, e))])),
						X("div", { class: "sol-ui-table-mobile-actions" }, v(t))
					]))),
					e.loading ? X("p", {
						role: "status",
						class: "sol-ui-hint"
					}, i.value.tableLoading) : e.error ? X("div", {
						role: "alert",
						class: "sol-notice danger"
					}, [X("p", e.error), X(DS, {
						class: "sol-ui-table-retry",
						variant: "inline",
						onClick: () => r("retry")
					}, () => i.value.tableRetry)]) : e.rows.length ? null : X("p", {
						role: "status",
						class: "sol-ui-hint"
					}, e.emptyText ?? i.value.tableEmpty),
					X("div", { class: "sol-ui-table-footer" }, [X("nav", {
						"aria-label": i.value.pages(e.caption),
						class: "sol-pagination",
						"data-compact": e.compactPagination ? "true" : void 0
					}, [
						X(DS, {
							class: "sol-ui-page-icon",
							disabled: y() || n === 1,
							"aria-label": i.value.previousPage,
							onClick: () => g(n - 1)
						}, () => jw("chevron", "previous")),
						...b.flatMap((e, t) => [t && e - b[t - 1] > 1 ? X("span", {
							"aria-hidden": "true",
							class: "sol-ui-page-gap"
						}, "…") : null, X(DS, {
							"aria-label": i.value.pageLabel(e, f),
							"aria-current": e === n ? "page" : void 0,
							disabled: y(),
							class: ["sol-page-button", Math.abs(e - n) > 1 ? "sol-ui-page-edge" : ""],
							onClick: () => g(e)
						}, () => Fx(e, i.value))]),
						X(DS, {
							class: "sol-ui-page-icon",
							disabled: y() || n === f,
							"aria-label": i.value.nextPage,
							onClick: () => g(n + 1)
						}, () => jw("chevron", "next"))
					]), X("p", {
						ref: o,
						role: "status",
						tabindex: -1,
						class: "sol-ui-hint sol-ui-table-summary"
					}, i.value.pageSummary(n, f, e.selected.length))]),
					X(Nw, {
						locale: i.value,
						id: d,
						title: i.value.fullText,
						modelValue: !!l.value,
						returnFocus: u.value,
						"onUpdate:modelValue": (e) => {
							e || (l.value = null);
						}
					}, () => l.value ? X("dl", { class: "sol-ui-detail" }, e.columns.flatMap((e) => [X("dt", e.label), X("dd", p(l.value, e))])) : null)
				]);
			};
		}
	}),
	SCheckbox: TC,
	SRadioGroup: EC,
	SSwitch: DC,
	SSelect: OC,
	STextarea: kC,
	SNumberInput: AC,
	STabs: WC,
	SSnackbar: GC,
	SDatePicker: rw,
	STimePicker: iw,
	SSegmentedControl: aw,
	SMultiSelect: ow,
	SRangeSlider: sw,
	SSplitBtn: wS,
	SContextMenu: TS,
	SResizableSplitPane: cw,
	STooltip: JS,
	SPopover: YS,
	SAccordion: XS,
	SFileInput: IC,
	SAutocomplete: RC,
	SBreadcrumbs: BC,
	SAvatar: VC,
	SStepper: HC,
	SBarChart: UC
}, Fw = { class: "sol-stack" }, Iw = { class: "sol-actions" }, Lw = { role: "status" }, Rw = { class: "sol-status sol-tone-badge" }, zw = { class: "sol-actions sol-actions--commit" }, Bw = /* @__PURE__ */ H({
	__name: "color-examples",
	setup(e) {
		let t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F("info"), r = /* @__PURE__ */ F(""), i = /* @__PURE__ */ F("example-a"), a = Y(() => Db(i.value)), o = (e) => ({
			"--sol-tag-fg": `var(--sol-color-categorical-${e}-foreground)`,
			"--sol-tag-bg": `var(--sol-color-categorical-${e}-background)`,
			borderColor: `var(--sol-color-categorical-${e}-border)`
		}), s = [
			{
				tone: "accent",
				label: "Accent",
				icon: "✦",
				note: "핵심 행동과 현재 선택을 절제해서 강조합니다."
			},
			{
				tone: "info",
				label: "Information",
				icon: "ⓘ",
				note: "설명과 중립적인 진행 안내입니다."
			},
			{
				tone: "success",
				label: "Success",
				icon: "✓",
				note: "확인된 성공과 완료 결과를 안내합니다."
			},
			{
				tone: "warning",
				label: "Warning",
				icon: "!",
				note: "진행 전 검토가 필요한 내용을 안내합니다."
			},
			{
				tone: "danger",
				label: "Error",
				icon: "!",
				note: "중요한 오류는 이 화면에도 남기고 다음 행동을 안내합니다."
			}
		];
		function c(e, i) {
			n.value = e, r.value = i + " · 가상 컬러 예시", t.value = !0;
		}
		return (e, l) => {
			let u = U("SBadge"), d = U("STextField"), f = U("SCard"), p = U("SBtn"), m = U("SAlert"), h = U("SSnackbar");
			return W(), hs("div", Fw, [
				q(f, {
					title: "서로 다른 범주 8색",
					"heading-level": 2
				}, {
					default: B(() => [
						l[2] ||= K("p", null, "성공·오류와 별도인 분류 색입니다. 색과 함께 항상 이름을 표시합니다.", -1),
						K("div", Iw, [(W(), hs(as, null, da(8, (e) => q(u, {
							key: e,
							content: `범주 ${e}`,
							style: de(o(e))
						}, null, 8, ["content", "style"])), 64))]),
						q(d, {
							id: "recipe-category-key",
							modelValue: L(i),
							"onUpdate:modelValue": l[0] ||= (e) => /* @__PURE__ */ P(i) ? i.value = e : null,
							label: "안정적인 분류 key"
						}, null, 8, ["modelValue"]),
						K("p", Lw, N(L(a).category) + " · 테마와 명암을 바꿔도 분류 ID는 유지합니다.", 1)
					]),
					_: 1
				}),
				(W(), hs(as, null, da(s, (e) => q(f, {
					key: e.tone,
					title: e.label,
					"heading-level": 2,
					class: "sol-tone",
					"data-tone": e.tone
				}, {
					default: B(() => [
						K("span", Rw, N(e.icon) + " " + N(e.label), 1),
						K("div", zw, [
							q(p, {
								variant: "subtle",
								tone: e.tone,
								onClick: (t) => c(e.tone, e.label)
							}, {
								default: B(() => [...l[3] ||= [J("옅은 배경", -1)]]),
								_: 1
							}, 8, ["tone", "onClick"]),
							q(p, {
								tone: e.tone,
								onClick: (t) => c(e.tone, e.label)
							}, {
								default: B(() => [...l[4] ||= [J("외곽선", -1)]]),
								_: 1
							}, 8, ["tone", "onClick"]),
							q(p, {
								tone: e.tone,
								disabled: ""
							}, {
								default: B(() => [...l[5] ||= [J("비활성", -1)]]),
								_: 1
							}, 8, ["tone"]),
							q(p, {
								variant: "primary",
								tone: e.tone,
								onClick: (t) => c(e.tone, e.label)
							}, {
								default: B(() => [...l[6] ||= [J("다음 단계", -1)]]),
								_: 1
							}, 8, ["tone", "onClick"])
						]),
						q(m, {
							tone: e.tone,
							title: e.icon + " " + e.label + " 안내"
						}, {
							actions: B(() => [q(p, {
								variant: "inline",
								tone: e.tone,
								onClick: (t) => c(e.tone, e.label)
							}, {
								default: B(() => [...l[7] ||= [J("스낵바 띄우기", -1)]]),
								_: 1
							}, 8, ["tone", "onClick"])]),
							default: B(() => [K("p", null, N(e.note), 1)]),
							_: 2
						}, 1032, ["tone", "title"])
					]),
					_: 2
				}, 1032, ["title", "data-tone"])), 64)),
				q(h, {
					id: "recipe-tone-toast",
					modelValue: L(t),
					"onUpdate:modelValue": l[1] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
					tone: L(n),
					message: L(r),
					duration: L(n) === "danger" ? 0 : 6e3
				}, null, 8, [
					"modelValue",
					"tone",
					"message",
					"duration"
				])
			]);
		};
	}
}), Vw = { class: "sol-actions sol-actions--commit" }, Hw = /* @__PURE__ */ H({
	__name: "writing",
	setup(e) {
		let t = /* @__PURE__ */ F(""), n = /* @__PURE__ */ F(!1), r = Y(() => n.value && !t.value.trim() ? "기록 이름을 입력해 주세요." : "");
		return (e, i) => {
			let a = U("STextField"), o = U("SBtn"), s = U("SAlert"), c = U("SCard");
			return W(), G(c, {
				"heading-level": 2,
				title: "구체적인 문구와 가까운 도움말"
			}, {
				default: B(() => [K("form", {
					class: "sol-stack",
					onSubmit: i[1] ||= du((e) => n.value = !0, ["prevent"]),
					novalidate: ""
				}, [
					q(a, {
						id: "recipe-writing",
						modelValue: L(t),
						"onUpdate:modelValue": i[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "기록 이름",
						help: "화면에서 찾기 쉬운 이름을 적어 주세요.",
						error: L(r),
						required: ""
					}, null, 8, ["modelValue", "error"]),
					K("div", Vw, [q(o, {
						type: "submit",
						variant: "primary"
					}, {
						default: B(() => [...i[2] ||= [J(" 기록 확인 ", -1)]]),
						_: 1
					})]),
					L(n) && !L(r) ? (W(), G(s, {
						key: 0,
						tone: "success",
						title: "✓ 가상 기록 이름을 확인했어요."
					})) : Ts("v-if", !0)
				], 32)]),
				_: 1
			});
		};
	}
}), Uw = { class: "sol-actions sol-actions--commit" }, Ww = { role: "status" }, Gw = /* @__PURE__ */ H({
	__name: "buttons",
	setup(e) {
		let t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(""), r;
		function i() {
			t.value || (t.value = !0, n.value = "처리 중입니다.", r = setTimeout(() => {
				n.value = "가상 확인을 마쳤어요.", t.value = !1;
			}, 700));
		}
		return Qi(() => clearTimeout(r)), (e, r) => {
			let a = U("SBtn"), o = U("SCard");
			return W(), G(o, {
				"heading-level": 2,
				title: "버튼 상태와 동작"
			}, {
				default: B(() => [
					K("div", Uw, [
						q(a, { onClick: r[0] ||= (e) => n.value = "보조 동작을 눌렀어요." }, {
							default: B(() => [...r[2] ||= [J("보조 동작", -1)]]),
							_: 1
						}),
						q(a, {
							variant: "inline",
							onClick: r[1] ||= (e) => n.value = ""
						}, {
							default: B(() => [...r[3] ||= [J("초기화", -1)]]),
							_: 1
						}),
						q(a, { disabled: "" }, {
							default: B(() => [...r[4] ||= [J("비활성", -1)]]),
							_: 1
						}),
						q(a, {
							variant: "primary",
							loading: L(t),
							onClick: i
						}, {
							default: B(() => [...r[5] ||= [J("확인", -1)]]),
							_: 1
						}, 8, ["loading"])
					]),
					K("p", Ww, N(L(n)), 1),
					r[6] ||= K("p", { class: "sol-hint" }, " 확인은 0.7초의 가상 작업을 실행합니다. 처리 중에는 중복 실행을 막고, 비활성 버튼은 조작할 수 없습니다. ", -1)
				]),
				_: 1
			});
		};
	}
}), Kw = { class: "sol-hint" }, qw = { role: "status" }, Jw = { class: "sol-actions sol-actions--commit" }, Yw = /* @__PURE__ */ H({
	__name: "fields",
	setup(e) {
		let t = ai("field"), n = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1), i = /* @__PURE__ */ F(""), a = /* @__PURE__ */ F(!1), o = Y(() => a.value && i.value.trim().length < 3 ? "3자 이상 입력해 주세요." : "");
		function s() {
			a.value = !0, o.value && z(() => t.value?.focus());
		}
		return (e, c) => {
			let l = U("SIcon"), u = U("STextField"), d = U("SCheckbox"), f = U("SBtn"), p = U("SAlert"), m = U("SCard");
			return W(), G(m, {
				"heading-level": 2,
				title: "텍스트 입력"
			}, {
				default: B(() => [K("form", {
					class: "sol-stack",
					onSubmit: du(s, ["prevent"]),
					novalidate: ""
				}, [
					q(u, {
						id: "recipe-field",
						ref_key: "field",
						ref: t,
						modelValue: L(i),
						"onUpdate:modelValue": c[0] ||= (e) => /* @__PURE__ */ P(i) ? i.value = e : null,
						clearable: "",
						loading: L(r),
						label: "가상 기록 제목",
						required: "",
						help: "3자 이상. 이 페이지 메모리에만 남습니다.",
						error: L(o),
						"server-error": L(n) ? "이미 사용 중인 가상 이름입니다. 다른 이름을 입력해 주세요." : ""
					}, {
						leading: B(() => [q(l, {
							name: "edit",
							decorative: "",
							size: 16
						})]),
						trailing: B(() => [K("span", Kw, N(L(i).length) + "자", 1)]),
						_: 1
					}, 8, [
						"modelValue",
						"loading",
						"error",
						"server-error"
					]),
					q(d, {
						id: "recipe-field-loading",
						modelValue: L(r),
						"onUpdate:modelValue": c[1] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
						label: "로딩 상태 시연 켜기"
					}, null, 8, ["modelValue"]),
					c[4] ||= K("p", { class: "sol-hint" }, " 로딩은 입력값과 별개인 작업 상태입니다. 동작 줄이기 설정에서는 회전 대신 상태 문구로 안내합니다. ", -1),
					K("p", qw, N(L(r) ? "불러오는 중…" : "대기 중"), 1),
					q(u, {
						id: "recipe-readonly",
						"model-value": "읽기 전용 예시",
						label: "수정할 수 없는 값",
						readonly: ""
					}),
					q(u, {
						id: "recipe-disabled-field",
						"model-value": "아직 만들 수 없어요",
						label: "공유 주소 · 비활성",
						disabled: ""
					}),
					K("div", Jw, [q(f, {
						type: "submit",
						variant: "primary"
					}, {
						default: B(() => [...c[2] ||= [J("입력 확인", -1)]]),
						_: 1
					})]),
					L(a) && !L(o) && !L(n) ? (W(), G(p, {
						key: 0,
						tone: "success",
						title: "✓ 사용할 수 있는 이름입니다."
					}, {
						default: B(() => [...c[3] ||= [K("p", null, "예시 입력값입니다.", -1)]]),
						_: 1
					})) : Ts("v-if", !0)
				], 32)]),
				_: 1
			});
		};
	}
}), Xw = { role: "status" }, Zw = /* @__PURE__ */ H({
	__name: "choices",
	setup(e) {
		let t = /* @__PURE__ */ F(!0), n = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F("list"), i = /* @__PURE__ */ F("recent"), a = [
			{
				value: "list",
				label: "목록"
			},
			{
				value: "cards",
				label: "카드"
			},
			{
				value: "map",
				label: "지도 · 비활성",
				disabled: !0
			}
		];
		return (e, o) => {
			let s = U("SCheckbox"), c = U("SRadioGroup"), l = U("SIcon"), u = U("SSelect"), d = U("SCard");
			return W(), G(d, {
				"heading-level": 2,
				title: "익숙한 기본 선택"
			}, {
				default: B(() => [
					q(s, {
						class: "sol-choice-row",
						id: "recipe-include",
						modelValue: L(t),
						"onUpdate:modelValue": o[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "완료한 항목 포함"
					}, null, 8, ["modelValue"]),
					q(s, {
						class: "sol-choice-row",
						id: "recipe-archived",
						modelValue: L(n),
						"onUpdate:modelValue": o[1] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						label: "보관한 항목 포함"
					}, null, 8, ["modelValue"]),
					q(s, {
						class: "sol-choice-row",
						id: "recipe-unavailable",
						label: "공유 항목 · 비활성",
						disabled: ""
					}),
					q(c, {
						class: "sol-choice-row",
						id: "recipe-view",
						modelValue: L(r),
						"onUpdate:modelValue": o[2] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
						label: "보기 방식",
						options: a
					}, null, 8, ["modelValue"]),
					q(u, {
						id: "recipe-sort",
						modelValue: L(i),
						"onUpdate:modelValue": o[3] ||= (e) => /* @__PURE__ */ P(i) ? i.value = e : null,
						clearable: "",
						label: "정렬 기준",
						options: [{
							value: "recent",
							label: "최근 변경순"
						}, {
							value: "name",
							label: "이름순"
						}]
					}, {
						indicator: B(() => [q(l, {
							name: "chevron",
							decorative: "",
							size: 16
						})]),
						_: 1
					}, 8, ["modelValue"]),
					K("p", Xw, " 완료 " + N(L(t) ? "포함" : "제외") + " · 보관 " + N(L(n) ? "포함" : "제외") + " · " + N(L(r)) + " · " + N(L(i)), 1)
				]),
				_: 1
			});
		};
	}
}), Qw = /* @__PURE__ */ H({
	__name: "feedback",
	setup(e) {
		let t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(!1);
		return (e, r) => {
			let i = U("SBtn"), a = U("SAlert"), o = U("SSnackbar"), s = U("SCard");
			return W(), G(s, {
				"heading-level": 2,
				title: "상태와 다음 행동"
			}, {
				default: B(() => [
					L(n) ? (W(), G(a, {
						key: 1,
						tone: "success",
						title: "✓ 가상 저장을 확인했어요."
					})) : (W(), G(a, {
						key: 0,
						tone: "danger",
						title: "가상 저장을 완료하지 못했어요."
					}, {
						actions: B(() => [q(i, {
							variant: "inline",
							onClick: r[0] ||= (e) => n.value = !0
						}, {
							default: B(() => [...r[3] ||= [J(" 다시 시도 ", -1)]]),
							_: 1
						})]),
						default: B(() => [r[4] ||= K("p", null, "입력 내용은 유지됩니다.", -1)]),
						_: 1
					})),
					q(i, { onClick: r[1] ||= (e) => t.value = !0 }, {
						default: B(() => [...r[5] ||= [J("짧은 완료 안내", -1)]]),
						_: 1
					}),
					q(o, {
						id: "recipe-feedback-toast",
						modelValue: L(t),
						"onUpdate:modelValue": r[2] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						tone: "success",
						message: "가상 작업을 확인했어요.",
						duration: 4e3
					}, null, 8, ["modelValue"])
				]),
				_: 1
			});
		};
	}
}), $w = { key: 0 }, eT = { role: "status" }, tT = /* @__PURE__ */ H({
	__name: "dialog",
	setup(e) {
		let t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(""), i = /* @__PURE__ */ F("dialog"), a = /* @__PURE__ */ F("one"), o = /* @__PURE__ */ F("body"), s = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(""), l;
		function u() {
			s.value || (s.value = !0, c.value = "잠시 기다려 주세요.", l = setTimeout(() => {
				s.value = !1, c.value = "예제 처리를 마쳤어요.";
			}, 1200));
		}
		return Qi(() => clearTimeout(l)), (e, l) => {
			let d = U("SSelect"), f = U("SCheckbox"), p = U("SBtn"), m = U("STextField"), h = U("SDialog"), g = U("SCard");
			return W(), G(g, {
				"heading-level": 2,
				title: "본문 스크롤과 고정 헤더"
			}, {
				default: B(() => [
					q(d, {
						id: "recipe-dialog-presentation",
						modelValue: L(i),
						"onUpdate:modelValue": l[0] ||= (e) => /* @__PURE__ */ P(i) ? i.value = e : null,
						label: "표시 방식",
						options: [{
							value: "dialog",
							label: "다이얼로그"
						}, {
							value: "drawer",
							label: "옆 패널"
						}]
					}, null, 8, ["modelValue"]),
					q(d, {
						id: "recipe-dialog-description",
						modelValue: L(a),
						"onUpdate:modelValue": l[1] ||= (e) => /* @__PURE__ */ P(a) ? a.value = e : null,
						label: "설명 길이",
						options: [
							{
								value: "none",
								label: "설명 없음"
							},
							{
								value: "one",
								label: "한 줄"
							},
							{
								value: "multi",
								label: "여러 줄"
							}
						]
					}, null, 8, ["modelValue"]),
					q(f, {
						id: "recipe-dialog-long",
						modelValue: L(n),
						"onUpdate:modelValue": l[2] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						label: "긴 본문으로 스크롤 확인"
					}, null, 8, ["modelValue"]),
					q(d, {
						id: "recipe-dialog-busy-scope",
						modelValue: L(o),
						"onUpdate:modelValue": l[3] ||= (e) => /* @__PURE__ */ P(o) ? o.value = e : null,
						label: "작업 중 잠금 범위",
						options: [{
							value: "body",
							label: "처리 중 본문 입력만 잠금 · 닫기 가능"
						}, {
							value: "all",
							label: "처리 중 창 전체 잠금 · 완료 후 닫기"
						}]
					}, null, 8, ["modelValue"]),
					l[13] ||= K("p", { class: "sol-hint" }, " 창을 연 뒤 ‘가상 처리’를 눌렀을 때만 잠금이 적용됩니다. 본문 잠금은 입력을 막고 닫기는 허용합니다. 전체 잠금은 제목의 닫기·바깥 클릭·Escape도 처리 완료까지 막습니다. 약 1.2초 후 자동 완료되며 실제 저장 작업은 없습니다. ", -1),
					q(p, {
						id: "recipe-dialog-open",
						onClick: l[4] ||= (e) => t.value = !0
					}, {
						default: B(() => [...l[9] ||= [J("창 열기", -1)]]),
						_: 1
					}),
					q(h, {
						id: "recipe-dialog",
						modelValue: L(t),
						"onUpdate:modelValue": l[8] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						presentation: L(i) === "drawer" ? "drawer" : "dialog",
						eyebrow: "UI EXAMPLE",
						title: "제목과 닫기는 자리를 유지합니다",
						busy: L(s),
						"busy-scope": L(o) === "all" ? "all" : "body"
					}, {
						feedback: B(() => [K("p", eT, N(L(c)), 1)]),
						"actions-start": B(({ busy: e }) => [q(p, {
							variant: "subtle",
							disabled: e,
							onClick: l[6] ||= (e) => r.value = ""
						}, {
							default: B(() => [...l[10] ||= [J("입력 초기화", -1)]]),
							_: 1
						}, 8, ["disabled"])]),
						actions: B(({ busy: e }) => [q(p, {
							disabled: e && L(o) === "all",
							onClick: l[7] ||= (e) => t.value = !1
						}, {
							default: B(() => [...l[11] ||= [J("닫기", -1)]]),
							_: 1
						}, 8, ["disabled"]), q(p, {
							id: "recipe-dialog-save",
							variant: "primary",
							loading: e,
							onClick: u
						}, {
							default: B(() => [...l[12] ||= [J("예제 처리", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						default: B(() => [
							L(a) === "none" ? Ts("v-if", !0) : (W(), hs("p", $w, N(L(a) === "multi" ? "본문만 스크롤되며 제목과 닫기는 자리를 유지합니다. ".repeat(8) : "본문만 스크롤되며 제목과 닫기는 자리를 유지합니다."), 1)),
							K("p", null, N(L(o) === "all" ? "전체 잠금 중에는 처리가 끝난 뒤 닫을 수 있습니다." : "Escape로 닫으면 열기 버튼으로 돌아갑니다."), 1),
							(W(!0), hs(as, null, da(L(n) ? 30 : 0, (e) => (W(), hs("p", { key: e }, "스크롤 확인용 내용 " + N(e), 1))), 128)),
							q(m, {
								id: "recipe-dialog-last",
								modelValue: L(r),
								"onUpdate:modelValue": l[5] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
								label: "마지막 입력"
							}, null, 8, ["modelValue"])
						]),
						_: 1
					}, 8, [
						"modelValue",
						"presentation",
						"busy",
						"busy-scope"
					])
				]),
				_: 1
			});
		};
	}
}), nT = { class: "sol-actions" }, rT = { role: "status" }, iT = /* @__PURE__ */ H({
	__name: "selection",
	setup(e) {
		let t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F("brief"), r = /* @__PURE__ */ F(!1), i = [{
			value: "brief",
			label: "간단히"
		}, {
			value: "full",
			label: "자세히"
		}], a = /* @__PURE__ */ F(!0);
		return (e, o) => {
			let s = U("SCheckbox"), c = U("SRadioGroup"), l = U("SSwitch"), u = U("SCard");
			return W(), G(u, {
				"heading-level": 2,
				title: "선택의 의미"
			}, {
				default: B(() => [
					q(s, {
						class: "sol-choice-row",
						id: "recipe-multiple",
						modelValue: L(t),
						"onUpdate:modelValue": o[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "자료 포함 · 다중 선택의 한 항목"
					}, null, 8, ["modelValue"]),
					q(c, {
						class: "sol-choice-row",
						id: "recipe-single",
						modelValue: L(n),
						"onUpdate:modelValue": o[1] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						label: "한 가지 표시 방식",
						options: i
					}, null, 8, ["modelValue"]),
					q(s, {
						id: "recipe-switch-label",
						modelValue: L(a),
						"onUpdate:modelValue": o[2] ||= (e) => /* @__PURE__ */ P(a) ? a.value = e : null,
						label: "외부 설정명이 있을 때 오른쪽 라벨 숨기기"
					}, null, 8, ["modelValue"]),
					K("div", nT, [o[4] ||= K("label", {
						id: "recipe-immediate-label",
						for: "recipe-immediate"
					}, "바뀌면 바로 적용", -1), q(l, {
						id: "recipe-immediate",
						modelValue: L(r),
						"onUpdate:modelValue": o[3] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
						label: "바뀌면 바로 적용",
						"hide-label": L(a),
						"aria-labelledby": "recipe-immediate-label"
					}, null, 8, ["modelValue", "hide-label"])]),
					K("p", rT, " 자료 " + N(L(t) ? "포함" : "제외") + " · " + N(L(n)) + " · 즉시 설정 " + N(L(r) ? "켬" : "끔"), 1)
				]),
				_: 1
			});
		};
	}
}), aT = { class: "sol-actions" }, oT = /* @__PURE__ */ H({
	__name: "help",
	setup(e) {
		let t = /* @__PURE__ */ F(!1);
		return (e, n) => {
			let r = U("STooltip"), i = U("SPopover"), a = U("SCard");
			return W(), G(a, {
				"heading-level": 2,
				title: "짧은 설명과 추가 정보"
			}, {
				default: B(() => [
					n[2] ||= K("p", null, "짧은 설명에는 툴팁, 읽을 내용과 행동이 있는 추가 정보에는 팝오버를 사용합니다.", -1),
					K("div", aT, [q(r, {
						id: "recipe-tooltip",
						label: "짧은 설명",
						text: "가상 기록을 찾는 도구예요."
					}), q(i, {
						id: "recipe-popover",
						modelValue: L(t),
						"onUpdate:modelValue": n[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "추가 정보",
						title: "추가 정보"
					}, {
						default: B(() => [...n[1] ||= [K("p", null, "읽을 내용과 닫기 행동이 있는 가상 정보입니다.", -1)]]),
						_: 1
					}, 8, ["modelValue"])]),
					n[3] ||= K("p", { class: "sol-hint" }, " 포커스·포인터·터치로 열고 Escape로 닫습니다. 팝오버는 닫기 버튼과 초점 복귀를 제공합니다. ", -1)
				]),
				_: 1
			});
		};
	}
}), sT = {
	class: "sol-stack",
	"aria-label": "단일 및 여러 추가 설명"
}, cT = { role: "status" }, lT = /* @__PURE__ */ H({
	__name: "accordion",
	setup(e) {
		let t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F({}), r = [
			{
				id: "purpose",
				label: "언제 사용하나요?",
				text: "필요할 때 확인하는 추가 설명을 제공합니다."
			},
			{
				id: "content",
				label: "어떤 내용을 넣나요?",
				text: "짧은 설명이나 보조 정보를 담습니다."
			},
			{
				id: "keyboard",
				label: "키보드로 여는 방법",
				text: "제목 버튼에 초점을 두고 Enter 또는 Space를 누릅니다."
			},
			{
				id: "independent",
				label: "여러 항목을 함께 열 수 있나요?",
				text: "이 예제의 항목은 서로 독립적으로 열고 닫힙니다."
			}
		];
		return (e, i) => {
			let a = U("SAccordion"), o = U("SCard");
			return W(), hs("section", sT, [q(o, {
				"heading-level": 2,
				title: "추가 설명 한 개"
			}, {
				default: B(() => [q(a, {
					id: "recipe-accordion",
					modelValue: L(t),
					"onUpdate:modelValue": i[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
					label: "가상 기록의 상세"
				}, {
					default: B(() => [...i[1] ||= [K("p", null, "접으면 이 안의 링크가 Tab 순서에서 제외됩니다.", -1), K("a", {
						href: "https://ui.solyi.kr/",
						target: "_blank",
						rel: "noopener"
					}, "문서 홈 · 새 창", -1)]]),
					_: 1
				}, 8, ["modelValue"]), K("p", cT, N(L(t) ? "상세를 펼쳤어요." : "상세를 접었어요."), 1)]),
				_: 1
			}), q(o, {
				"heading-level": 2,
				title: "추가 설명 여러 개 · 독립적으로 열기"
			}, {
				default: B(() => [i[2] ||= K("p", null, "각 항목을 별도로 여닫습니다. 한 항목을 열어도 다른 항목은 닫히지 않습니다.", -1), (W(), hs(as, null, da(r, (e) => q(a, {
					key: e.id,
					id: "recipe-accordion-multi-" + e.id,
					modelValue: L(n)[e.id],
					"onUpdate:modelValue": (t) => L(n)[e.id] = t,
					label: e.label
				}, {
					default: B(() => [K("p", null, N(e.text), 1)]),
					_: 2
				}, 1032, [
					"id",
					"modelValue",
					"onUpdate:modelValue",
					"label"
				])), 64))]),
				_: 1
			})]);
		};
	}
}), uT = { role: "status" }, dT = { class: "sol-actions" }, fT = /* @__PURE__ */ H({
	__name: "navigation",
	setup(e) {
		let t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1), i = /* @__PURE__ */ F(1), a = /* @__PURE__ */ F(20), o = /* @__PURE__ */ F(!0), s = /* @__PURE__ */ F(1), c = /* @__PURE__ */ F(3), l = /* @__PURE__ */ F(!1), u = Y(() => [{
			id: String(i.value),
			name: `가상 페이지 ${i.value}`
		}]);
		function d() {
			a.value = 1003, i.value = 500;
		}
		function f(e) {
			s.value = e, o.value && (i.value = e);
		}
		let p = Y(() => [{
			id: "home",
			label: "기록함"
		}, {
			id: "current",
			label: r.value ? "기록 상세" : "기록 목록"
		}]);
		return (e, m) => {
			let h = U("SNumberInput"), g = U("SCheckbox"), _ = U("SBtn"), v = U("SPagination"), y = U("SDataTable"), b = U("SBreadcrumbs"), x = U("SDialog"), S = U("SSnackbar"), C = U("SCard");
			return W(), G(C, {
				"heading-level": 2,
				title: "현재 위치와 짧은 상세"
			}, {
				default: B(() => [
					q(h, {
						id: "recipe-pagination-count",
						modelValue: L(a),
						"onUpdate:modelValue": m[0] ||= (e) => /* @__PURE__ */ P(a) ? a.value = e : null,
						label: "페이지 수",
						min: 0,
						step: 1
					}, null, 8, ["modelValue"]),
					q(g, {
						id: "recipe-pagination-accept",
						modelValue: L(o),
						"onUpdate:modelValue": m[1] ||= (e) => /* @__PURE__ */ P(o) ? o.value = e : null,
						label: "페이지 이동 제안 반영"
					}, null, 8, ["modelValue"]),
					q(h, {
						id: "recipe-pagination-siblings",
						modelValue: L(c),
						"onUpdate:modelValue": m[2] ||= (e) => /* @__PURE__ */ P(c) ? c.value = e : null,
						label: "현재 페이지 양옆에 표시할 번호 수",
						min: 0,
						max: 5,
						step: 1
					}, null, 8, ["modelValue"]),
					q(g, {
						id: "recipe-pagination-compact",
						modelValue: L(l),
						"onUpdate:modelValue": m[3] ||= (e) => /* @__PURE__ */ P(l) ? l.value = e : null,
						label: "현재 번호만 간단히 표시"
					}, null, 8, ["modelValue"]),
					q(_, {
						id: "recipe-pagination-many",
						onClick: d
					}, {
						default: B(() => [...m[10] ||= [J("1003페이지 중 500페이지 보기", -1)]]),
						_: 1
					}),
					q(v, {
						"model-value": L(i),
						"page-count": L(a) ?? 0,
						"sibling-count": L(c) ?? 1,
						"compact-pagination": L(l),
						label: "예제 항목 페이지",
						"onUpdate:modelValue": f
					}, null, 8, [
						"model-value",
						"page-count",
						"sibling-count",
						"compact-pagination"
					]),
					K("p", uT, "부모 페이지 " + N(L(i)) + " · 마지막 제안 " + N(L(s)), 1),
					q(y, {
						caption: "같은 페이지 설정을 사용하는 Table",
						columns: [{
							key: "name",
							label: "현재 자료"
						}],
						rows: L(u),
						page: L(i),
						"page-count": Math.max(1, L(a) ?? 0),
						"sibling-count": L(c) ?? 1,
						"compact-pagination": L(l),
						"onUpdate:page": f
					}, null, 8, [
						"rows",
						"page",
						"page-count",
						"sibling-count",
						"compact-pagination"
					]),
					q(b, {
						label: "가상 경로",
						items: L(p),
						onNavigate: m[4] ||= (e) => r.value = !1
					}, null, 8, ["items"]),
					K("div", dT, [
						q(_, { onClick: m[5] ||= (e) => r.value = !0 }, {
							default: B(() => [...m[11] ||= [J("가상 상세로 이동", -1)]]),
							_: 1
						}),
						q(_, { onClick: m[6] ||= (e) => t.value = !0 }, {
							default: B(() => [...m[12] ||= [J("사이드 패널 열기", -1)]]),
							_: 1
						}),
						q(_, { onClick: m[7] ||= (e) => n.value = !0 }, {
							default: B(() => [...m[13] ||= [J("완료 안내", -1)]]),
							_: 1
						})
					]),
					q(x, {
						id: "recipe-drawer",
						modelValue: L(t),
						"onUpdate:modelValue": m[8] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						presentation: "drawer",
						eyebrow: "FICTIONAL DETAIL",
						title: "작은 정원 기록"
					}, {
						default: B(() => [...m[14] ||= [K("p", null, "Dialog와 같은 제목·초점·Escape·복귀 계약을 쓰는 모달 사이드 패널입니다.", -1)]]),
						_: 1
					}, 8, ["modelValue"]),
					q(S, {
						id: "recipe-nav-toast",
						modelValue: L(n),
						"onUpdate:modelValue": m[9] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						tone: "success",
						message: "가상 설정을 적용했어요.",
						duration: 4e3
					}, null, 8, ["modelValue"])
				]),
				_: 1
			});
		};
	}
}), pT = {
	key: 1,
	role: "status"
}, mT = {
	key: 6,
	role: "status"
}, hT = {
	key: 8,
	role: "status"
}, gT = {
	key: 9,
	role: "status"
}, _T = /* @__PURE__ */ H({
	__name: "advanced-inputs",
	props: { part: {} },
	setup(e) {
		let t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(!0), r = /* @__PURE__ */ F(12e3), i = /* @__PURE__ */ F(0), a = (e, t) => new Intl.NumberFormat(t.code, {
			minimumFractionDigits: 1,
			maximumFractionDigits: 1
		}).format(e), o = /* @__PURE__ */ F(""), s = /* @__PURE__ */ F(2), c = /* @__PURE__ */ F([]), l = [
			{
				value: "garden",
				label: "정원"
			},
			{
				value: "book",
				label: "책장"
			},
			{
				value: "walk",
				label: "산책"
			}
		];
		return (u, d) => {
			let f = U("STextarea"), p = U("SCheckbox"), m = U("SNumberInput"), h = U("SMultiSelect"), g = U("SCard");
			return W(), G(g, {
				"heading-level": 2,
				title: e.part ? void 0 : "여러 줄·숫자·태그"
			}, {
				default: B(() => [
					!e.part || e.part === "textarea" ? (W(), G(f, {
						key: 0,
						id: "recipe-note",
						modelValue: L(o),
						"onUpdate:modelValue": d[0] ||= (e) => /* @__PURE__ */ P(o) ? o.value = e : null,
						clearable: "",
						onClear: d[1] ||= (e) => i.value++,
						label: "가상 기록 설명",
						maxlength: 120
					}, null, 8, ["modelValue"])) : Ts("v-if", !0),
					!e.part || e.part === "textarea" ? (W(), hs("p", pT, "내용 지움: " + N(L(i)) + "회", 1)) : Ts("v-if", !0),
					!e.part || e.part === "number" ? (W(), G(p, {
						key: 2,
						id: "recipe-number-format",
						modelValue: L(t),
						"onUpdate:modelValue": d[2] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "숫자 표시 포맷 · 모델은 숫자 유지"
					}, null, 8, ["modelValue"])) : Ts("v-if", !0),
					!e.part || e.part === "number" ? (W(), G(p, {
						key: 3,
						id: "recipe-number-grouping",
						modelValue: L(n),
						"onUpdate:modelValue": d[3] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						label: "입력 중 천 단위 구분"
					}, null, 8, ["modelValue"])) : Ts("v-if", !0),
					!e.part || e.part === "number" ? (W(), G(m, {
						key: 4,
						"use-grouping": L(n),
						id: "recipe-amount",
						modelValue: L(s),
						"onUpdate:modelValue": d[4] ||= (e) => /* @__PURE__ */ P(s) ? s.value = e : null,
						clearable: "",
						label: "가상 목표 개수",
						min: 0,
						max: 10,
						step: 2,
						unit: "개",
						presets: [
							{ value: 2 },
							{ value: 6 },
							{ value: 10 },
							{
								value: 5,
								label: "5 · 간격 불일치"
							}
						],
						"format-value": L(t) ? a : void 0
					}, null, 8, [
						"use-grouping",
						"modelValue",
						"format-value"
					])) : Ts("v-if", !0),
					!e.part || e.part === "number" ? (W(), G(m, {
						key: 5,
						id: "recipe-large-amount",
						modelValue: L(r),
						"onUpdate:modelValue": d[5] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
						"use-grouping": L(n),
						clearable: "",
						label: "큰 수 입력",
						min: -1e9,
						max: 1e9,
						step: .01,
						help: "입력 중 정수부는 세 자리로 구분하고, 모델은 숫자로 유지합니다. 위 0–10 예제의 범위 밖 초안은 모델로 반영하지 않습니다."
					}, null, 8, ["modelValue", "use-grouping"])) : Ts("v-if", !0),
					!e.part || e.part === "number" ? (W(), hs("p", mT, " 큰 수 모델: " + N(L(r) === null ? "null" : L(r)), 1)) : Ts("v-if", !0),
					!e.part || e.part === "multiselect" ? (W(), G(h, {
						key: 7,
						id: "recipe-tags",
						modelValue: L(c),
						"onUpdate:modelValue": d[6] ||= (e) => /* @__PURE__ */ P(c) ? c.value = e : null,
						clearable: "",
						label: "가상 분류",
						options: l,
						"max-selected": 2
					}, null, 8, ["modelValue"])) : Ts("v-if", !0),
					e.part ? Ts("v-if", !0) : (W(), hs("p", hT, N(L(s)) + "개 · " + N(L(c).join(", ") || "선택 없음"), 1)),
					e.part === "number" ? (W(), hs("p", gT, "숫자 모델: " + N(L(s) === null ? "null" : L(s)), 1)) : Ts("v-if", !0)
				]),
				_: 1
			}, 8, ["title"]);
		};
	}
}), vT = /* @__PURE__ */ H({
	__name: "content-tabs",
	setup(e) {
		let t = /* @__PURE__ */ F("summary"), n = /* @__PURE__ */ F(""), r = [
			{
				value: "summary",
				label: "요약"
			},
			{
				value: "detail",
				label: "상세"
			},
			{
				value: "blocked",
				label: "비활성",
				disabled: !0
			}
		];
		return (e, i) => {
			let a = U("STextField"), o = U("STabs"), s = U("SCard");
			return W(), G(s, {
				"heading-level": 2,
				title: "같은 맥락의 탭"
			}, {
				default: B(() => [q(o, {
					id: "recipe-tabs",
					modelValue: L(t),
					"onUpdate:modelValue": i[1] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
					label: "기록 보기",
					items: r
				}, {
					"panel-summary": B(() => [...i[2] ||= [K("p", null, "방향키로 탭을 바꾸세요.", -1)]]),
					"panel-detail": B(() => [q(a, {
						id: "recipe-tab-memo",
						modelValue: L(n),
						"onUpdate:modelValue": i[0] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						label: "탭을 바꾸어도 유지되는 메모"
					}, null, 8, ["modelValue"])]),
					_: 1
				}, 8, ["modelValue"])]),
				_: 1
			});
		};
	}
}), yT = { role: "status" }, bT = /* @__PURE__ */ H({
	__name: "action-menu",
	setup(e) {
		let t = /* @__PURE__ */ F(""), n = [
			{
				id: "copy",
				label: "가상 복제"
			},
			{
				id: "archive",
				label: "가상 보관"
			},
			{
				id: "disabled",
				label: "비활성",
				disabled: !0
			}
		];
		return (e, r) => {
			let i = U("SSplitBtn"), a = U("SContextMenu"), o = U("SCard");
			return W(), G(o, {
				"heading-level": 2,
				title: "더 많은 동작"
			}, {
				default: B(() => [
					q(i, {
						id: "recipe-actions",
						label: "가상 내보내기",
						items: n,
						onPrimary: r[0] ||= (e) => t.value = "주 동작 확인",
						onSelect: r[1] ||= (e) => t.value = e
					}),
					q(a, {
						id: "recipe-context",
						label: "가상 기록",
						items: n,
						onSelect: r[2] ||= (e) => t.value = e
					}, {
						default: B(() => [...r[3] ||= [K("p", null, "우클릭·Shift+F10 또는 표시된 동작 버튼으로 엽니다.", -1)]]),
						_: 1
					}),
					K("p", yT, N(L(t)), 1)
				]),
				_: 1
			});
		};
	}
}), xT = {
	key: 0,
	class: "sol-actions"
}, ST = { role: "status" }, CT = { class: "recipe-step-actions" }, wT = { class: "sol-actions sol-actions--commit" }, TT = /*@__PURE__*/ H({
	__name: "identity-progress",
	props: { part: {} },
	setup(e) {
		let t = ai("nameField"), n = ai("categoryField"), r = ai("review"), i = ai("finalResult"), a = /* @__PURE__ */ F(0), o = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(""), d = [{
			id: "profile",
			label: "가상 사용자 정보"
		}, {
			id: "settings",
			label: "가상 설정"
		}], f = [
			{
				id: "name",
				label: "이름"
			},
			{
				id: "category",
				label: "분류"
			},
			{
				id: "review",
				label: "검토"
			}
		], p = Y(() => f[a.value].id), m = /* @__PURE__ */ F("inline"), h = Y(() => f.slice(0, o.value ? 3 : a.value).map((e) => e.id));
		async function g(e) {
			l.value = "", e > 0 && a.value === 0 && !s.value.trim() && (l.value = "가상 이름을 입력해 주세요."), e > 0 && a.value === 1 && !c.value && (l.value = "가상 분류를 선택해 주세요."), l.value || (a.value === 2 && e > 0 ? o.value = !0 : (a.value = Math.max(0, Math.min(2, a.value + e)), o.value = !1)), await z(), o.value ? i.value?.focus() : a.value === 0 ? t.value?.focus() : a.value === 1 ? n.value?.focus() : r.value?.focus();
		}
		async function _() {
			a.value = 0, o.value = !1, s.value = "", c.value = null, l.value = "", await z(), t.value?.focus();
		}
		return (v, y) => {
			let b = U("SAvatar"), x = U("SSplitBtn"), S = U("SRadioGroup"), C = U("SStepper"), w = U("STextField"), T = U("SSelect"), E = U("SBtn"), D = U("SCard");
			return W(), G(D, {
				"heading-level": 2,
				title: e.part ? void 0 : "가상 사용자와 단계"
			}, {
				default: B(() => [!e.part || e.part === "avatar" ? (W(), hs("div", xT, [
					q(b, {
						label: "가상 사용자 민하",
						initials: "민"
					}),
					q(x, {
						id: "recipe-user",
						label: "민하 · 가상 사용자",
						items: d,
						onPrimary: y[0] ||= (e) => u.value = "가상 사용자 정보",
						onSelect: y[1] ||= (e) => u.value = e
					}),
					K("p", ST, N(L(u)), 1)
				])) : Ts("v-if", !0), !e.part || e.part === "steps" ? (W(), hs(as, { key: 1 }, [
					q(S, {
						id: "recipe-step-layout",
						modelValue: L(m),
						"onUpdate:modelValue": y[2] ||= (e) => /* @__PURE__ */ P(m) ? m.value = e : null,
						label: "단계 이름 위치",
						options: [{
							value: "inline",
							label: "숫자 오른쪽"
						}, {
							value: "below",
							label: "숫자 아래"
						}]
					}, null, 8, ["modelValue"]),
					q(C, {
						id: "recipe-steps",
						"model-value": L(p),
						items: f,
						completed: L(h),
						"label-position": L(m) === "below" ? "below" : "inline",
						label: "가상 작성 단계"
					}, null, 8, [
						"model-value",
						"completed",
						"label-position"
					]),
					L(o) ? (W(), hs("p", {
						key: 1,
						id: "recipe-step-result",
						ref_key: "finalResult",
						ref: i,
						role: "status",
						tabindex: "-1"
					}, " ✓ 가상 단계를 완료했어요. 실제 프로젝트는 만들지 않습니다. ", 512)) : (W(), hs(as, { key: 0 }, [L(a) === 0 ? (W(), G(w, {
						key: 0,
						id: "recipe-step-name",
						ref_key: "nameField",
						ref: t,
						modelValue: L(s),
						"onUpdate:modelValue": y[3] ||= (e) => /* @__PURE__ */ P(s) ? s.value = e : null,
						label: "가상 프로젝트 이름",
						error: L(l),
						required: ""
					}, null, 8, ["modelValue", "error"])) : L(a) === 1 ? (W(), G(T, {
						key: 1,
						id: "recipe-step-category",
						ref_key: "categoryField",
						ref: n,
						modelValue: L(c),
						"onUpdate:modelValue": y[4] ||= (e) => /* @__PURE__ */ P(c) ? c.value = e : null,
						label: "가상 분류",
						error: L(l),
						options: [{
							value: "notes",
							label: "기록"
						}, {
							value: "books",
							label: "독서"
						}],
						required: ""
					}, null, 8, ["modelValue", "error"])) : (W(), hs("p", {
						key: 2,
						id: "recipe-step-review",
						ref_key: "review",
						ref: r,
						tabindex: "-1"
					}, N(L(s)) + " · " + N(L(c)) + " · 서버에 저장하지 않는 가상 검토입니다. ", 513))], 64)),
					K("div", CT, [q(E, { onClick: _ }, {
						default: B(() => [...y[7] ||= [J("처음부터", -1)]]),
						_: 1
					}), K("div", wT, [q(E, {
						disabled: L(a) === 0 || L(o),
						onClick: y[5] ||= (e) => g(-1)
					}, {
						default: B(() => [...y[8] ||= [J("이전 단계", -1)]]),
						_: 1
					}, 8, ["disabled"]), q(E, {
						variant: "primary",
						disabled: L(o),
						onClick: y[6] ||= (e) => g(1)
					}, {
						default: B(() => [J(N(L(a) === 2 ? "가상 완료" : "다음 단계"), 1)]),
						_: 1
					}, 8, ["disabled"])])])
				], 64)) : Ts("v-if", !0)]),
				_: 1
			}, 8, ["title"]);
		};
	}
}), ET = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, DT = /*#__PURE__*/ ET(TT, [["__scopeId", "data-v-990346d4"]]), OT = { class: "sol-actions" }, kT = /* @__PURE__ */ H({
	__name: "progress",
	setup(e) {
		let t = /* @__PURE__ */ F("indeterminate"), n = /* @__PURE__ */ F(!0), r = /* @__PURE__ */ F(!0), i = /* @__PURE__ */ F(!0), a = Y(() => t.value), o = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F("container"), c = /* @__PURE__ */ F(!0), l = /* @__PURE__ */ F(!1), u;
		function d(e) {
			o.value || (o.value = !0, u = setTimeout(() => {
				o.value = !1;
			}, e));
		}
		Qi(() => clearTimeout(u));
		let f = [
			{
				value: "determinate",
				label: "35% 진행"
			},
			{
				value: "indeterminate",
				label: "진행률을 모르는 처리 중"
			},
			{
				value: "complete",
				label: "완료"
			},
			{
				value: "error",
				label: "오류"
			}
		];
		return (e, u) => {
			let p = U("SSelect"), m = U("SCheckbox"), h = U("SProgressLinear"), g = U("SBtn"), _ = U("SCard"), v = U("SLoadingOverlay");
			return W(), G(_, {
				"heading-level": 2,
				title: "값을 아는 진행과 처리 중 표시"
			}, {
				default: B(() => [
					q(p, {
						id: "recipe-progress-mode",
						modelValue: L(t),
						"onUpdate:modelValue": u[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "가상 작업 상태",
						options: f,
						required: ""
					}, null, 8, ["modelValue"]),
					q(m, {
						id: "recipe-progress-motion",
						modelValue: L(n),
						"onUpdate:modelValue": u[1] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						label: "아래 가로 진행 표시의 처리 중 반복 모션"
					}, null, 8, ["modelValue"]),
					u[12] ||= K("p", { class: "sol-hint" }, " 반복 모션은 진행률을 모르는 처리 중 상태에 적용합니다. 기기의 모션 감소 설정에서는 회전·이동을 줄이고 상태 문구를 유지합니다. ", -1),
					q(m, {
						id: "recipe-progress-value",
						modelValue: L(r),
						"onUpdate:modelValue": u[2] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
						label: "수치 표시"
					}, null, 8, ["modelValue"]),
					q(m, {
						id: "recipe-progress-message",
						modelValue: L(i),
						"onUpdate:modelValue": u[3] ||= (e) => /* @__PURE__ */ P(i) ? i.value = e : null,
						label: "상태 문구 표시"
					}, null, 8, ["modelValue"]),
					u[13] ||= K("h3", null, "가로 진행 · Progress Linear", -1),
					q(h, {
						id: "recipe-linear",
						label: "선형 진행",
						"model-value": 35,
						state: L(a),
						animated: L(n),
						"show-value": L(r),
						"show-message": L(i)
					}, null, 8, [
						"state",
						"animated",
						"show-value",
						"show-message"
					]),
					u[14] ||= K("p", null, " 알 수 없는 진행률에는 퍼센트를 만들지 않습니다. 움직임 줄이기 설정에서는 정적으로 표시합니다. ", -1),
					u[15] ||= K("h3", null, "작업 영역 위에 표시 · Loading Overlay", -1),
					u[16] ||= K("p", null, " 위 가로 진행은 수치를 읽는 요소이고, Overlay는 기존 작업 영역 위에 처리 상태를 겹쳐 보여주는 래퍼입니다. 작업 완료 여부는 부모가 제어합니다. ", -1),
					q(p, {
						id: "recipe-loading-scope",
						modelValue: L(s),
						"onUpdate:modelValue": u[4] ||= (e) => /* @__PURE__ */ P(s) ? s.value = e : null,
						label: "로딩 표시 범위",
						options: [{
							value: "container",
							label: "이 영역만"
						}, {
							value: "viewport",
							label: "화면 전체"
						}]
					}, null, 8, ["modelValue"]),
					q(m, {
						id: "recipe-loading-blocking",
						modelValue: L(c),
						"onUpdate:modelValue": u[5] ||= (e) => /* @__PURE__ */ P(c) ? c.value = e : null,
						label: "표시 중 영역 조작 잠금"
					}, null, 8, ["modelValue"]),
					q(m, {
						id: "recipe-loading-hide-content",
						modelValue: L(l),
						"onUpdate:modelValue": u[6] ||= (e) => /* @__PURE__ */ P(l) ? l.value = e : null,
						label: "표시 중 원본 내용 숨김"
					}, null, 8, ["modelValue"]),
					q(v, {
						"model-value": L(o),
						title: "예제를 처리하고 있어요.",
						description: "잠시 후 자동으로 완료됩니다.",
						scope: L(s) === "viewport" ? "viewport" : "container",
						blocking: L(c),
						"hide-content": L(l)
					}, {
						default: B(() => [q(_, { title: "독립 작업 영역" }, {
							default: B(() => [u[11] ||= K("p", null, "짧은 작업은 표시를 지연해 깜빡임을 줄입니다.", -1), K("div", OT, [q(g, {
								id: "recipe-loading-start",
								onClick: u[7] ||= (e) => d(1200)
							}, {
								default: B(() => [...u[9] ||= [J("로딩 예제", -1)]]),
								_: 1
							}), q(g, {
								id: "recipe-loading-short",
								onClick: u[8] ||= (e) => d(50)
							}, {
								default: B(() => [...u[10] ||= [J("짧은 작업", -1)]]),
								_: 1
							})])]),
							_: 1
						})]),
						_: 1
					}, 8, [
						"model-value",
						"scope",
						"blocking",
						"hide-content"
					])
				]),
				_: 1
			});
		};
	}
}), AT = /* @__PURE__ */ H({
	__name: "progress-circular",
	setup(e) {
		let t = /* @__PURE__ */ F("indeterminate"), n = /* @__PURE__ */ F(!0), r = /* @__PURE__ */ F(!0), i = /* @__PURE__ */ F(!0), a = Y(() => t.value), o = [
			{
				value: "determinate",
				label: "35% 진행"
			},
			{
				value: "indeterminate",
				label: "전체량을 모르는 처리 중"
			},
			{
				value: "complete",
				label: "완료"
			},
			{
				value: "error",
				label: "오류"
			}
		];
		return (e, s) => {
			let c = U("SSelect"), l = U("SCheckbox"), u = U("SProgressCircular"), d = U("SCard");
			return W(), G(d, {
				"heading-level": 2,
				title: "원형 진행률과 로딩"
			}, {
				default: B(() => [
					q(c, {
						id: "recipe-circle-state",
						modelValue: L(t),
						"onUpdate:modelValue": s[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "원형 진행 상태",
						options: o,
						required: ""
					}, null, 8, ["modelValue"]),
					q(l, {
						id: "recipe-circle-motion",
						modelValue: L(n),
						"onUpdate:modelValue": s[1] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						label: "처리 중 회전 모션"
					}, null, 8, ["modelValue"]),
					q(l, {
						id: "recipe-circle-value",
						modelValue: L(r),
						"onUpdate:modelValue": s[2] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
						label: "수치 표시"
					}, null, 8, ["modelValue"]),
					q(l, {
						id: "recipe-circle-message",
						modelValue: L(i),
						"onUpdate:modelValue": s[3] ||= (e) => /* @__PURE__ */ P(i) ? i.value = e : null,
						label: "상태 설명 표시"
					}, null, 8, ["modelValue"]),
					q(u, {
						id: "recipe-circle",
						label: "원형 진행",
						"model-value": 35,
						state: L(a),
						animated: L(n),
						"show-value": L(r),
						"show-message": L(i)
					}, null, 8, [
						"state",
						"animated",
						"show-value",
						"show-message"
					]),
					s[4] ||= K("p", { class: "sol-hint" }, " 전체량을 모르는 처리 중에 회전합니다. 기기의 모션 감소 설정에서는 회전을 줄이고 상태 설명을 유지합니다. ", -1)
				]),
				_: 1
			});
		};
	}
}), jT = { role: "status" }, MT = { role: "status" }, NT = { role: "status" }, PT = /* @__PURE__ */ H({
	__name: "time",
	setup(e) {
		let t = /* @__PURE__ */ F("09:00"), n = /* @__PURE__ */ F("legacy"), r = Y(() => n.value === "auto" || n.value === "popover" || n.value === "dialog" ? n.value : void 0), i = /* @__PURE__ */ F(null), a = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F("09:07"), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(10);
		function d(e) {
			s.value = `미리보기 ${e.value}`;
		}
		function f(e) {
			s.value = `확정 ${e.value}`;
		}
		function p(e) {
			s.value = `취소 ${e.reason}`;
		}
		return (e, m) => {
			let h = U("SSelect"), g = U("STimePicker"), _ = U("SCheckbox"), v = U("STextField"), y = U("SNumberInput"), b = U("SCard");
			return W(), G(b, {
				"heading-level": 2,
				title: "직접 입력과 시·분 선택"
			}, {
				default: B(() => [
					q(h, {
						id: "recipe-time-popup",
						modelValue: L(n),
						"onUpdate:modelValue": m[0] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						label: "시각 팝업 표시 방식",
						options: [
							{
								value: "legacy",
								label: "기존 연결 패널"
							},
							{
								value: "auto",
								label: "화면에 맞춰 자동 전환"
							},
							{
								value: "popover",
								label: "연결 팝업"
							},
							{
								value: "dialog",
								label: "모달 다이얼로그"
							}
						]
					}, null, 8, ["modelValue"]),
					q(g, {
						id: "recipe-time",
						"picker-presentation": L(r),
						modelValue: L(t),
						"onUpdate:modelValue": m[1] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						clearable: "",
						label: "가상 알림 시각",
						min: "09:00",
						max: "18:00",
						step: 15,
						required: "",
						help: "HH:mm 또는 HHmm으로 입력하거나 Alt+↓로 패널을 엽니다."
					}, null, 8, ["picker-presentation", "modelValue"]),
					K("p", jT, "완료값: " + N(L(t) || "없음") + " · 실제 알림을 예약하지 않습니다.", 1),
					q(_, {
						id: "recipe-time-manual",
						modelValue: L(a),
						"onUpdate:modelValue": m[2] ||= (e) => /* @__PURE__ */ P(a) ? a.value = e : null,
						label: "목록 예제의 직접 입력 허용"
					}, null, 8, ["modelValue"]),
					q(_, {
						id: "recipe-time-scrub",
						modelValue: L(o),
						"onUpdate:modelValue": m[3] ||= (e) => /* @__PURE__ */ P(o) ? o.value = e : null,
						label: "입력·목록 드래그 조절 사용"
					}, null, 8, ["modelValue"]),
					q(_, {
						id: "recipe-time-now",
						modelValue: L(l),
						"onUpdate:modelValue": m[4] ||= (e) => /* @__PURE__ */ P(l) ? l.value = e : null,
						label: "선택이 없으면 현재 시각 근처에서 목록 열기"
					}, null, 8, ["modelValue"]),
					q(v, {
						id: "recipe-time-initial",
						modelValue: L(c),
						"onUpdate:modelValue": m[5] ||= (e) => /* @__PURE__ */ P(c) ? c.value = e : null,
						label: "목록 초기 위치",
						disabled: L(l),
						help: "선택된 값이 우선입니다. 시각을 비우고 다시 열어 확인하세요."
					}, null, 8, ["modelValue", "disabled"]),
					q(y, {
						id: "recipe-time-pixels",
						modelValue: L(u),
						"onUpdate:modelValue": m[6] ||= (e) => /* @__PURE__ */ P(u) ? u.value = e : null,
						label: "드래그 한 단계 이동 거리 · px",
						min: 2,
						max: 40,
						step: 2,
						disabled: !L(o)
					}, null, 8, ["modelValue", "disabled"]),
					q(g, {
						id: "recipe-time-list",
						"picker-presentation": L(r),
						modelValue: L(i),
						"onUpdate:modelValue": m[7] ||= (e) => /* @__PURE__ */ P(i) ? i.value = e : null,
						clearable: "",
						label: "목록에서 시각 선택",
						presentation: "list",
						"allow-manual-input": L(a),
						scrubbable: L(o),
						"list-scrubbable": L(o),
						"scrub-pixels-per-step": L(u) ?? void 0,
						"scroll-to-current-time": L(l),
						onPreview: d,
						onInteractionCommit: f,
						onInteractionCancel: p,
						"initial-scroll-value": L(l) ? void 0 : L(c) || void 0,
						min: "00:07",
						max: "23:59",
						step: 15,
						help: "처음 위치는 선택이 아닙니다. 방향키·Home/End·Page로 이동하고 Enter/Space로 선택, Escape로 닫습니다."
					}, null, 8, [
						"picker-presentation",
						"modelValue",
						"allow-manual-input",
						"scrubbable",
						"list-scrubbable",
						"scrub-pixels-per-step",
						"scroll-to-current-time",
						"initial-scroll-value"
					]),
					K("p", MT, N(L(s)), 1),
					K("p", NT, "목록 완료값: " + N(L(i) || "선택 없음"), 1)
				]),
				_: 1
			});
		};
	}
}), FT = { role: "status" }, IT = { role: "status" }, LT = /* @__PURE__ */ H({
	__name: "chart-tree",
	props: { part: {} },
	setup(e) {
		let t = /* @__PURE__ */ F(null), n = /* @__PURE__ */ F([]), r = /* @__PURE__ */ F("current"), i = [{
			id: "notes",
			label: "기록",
			children: [{
				id: "garden",
				label: "작은 정원"
			}, {
				id: "book",
				label: "저녁 책장"
			}]
		}, {
			id: "archive",
			label: "보관",
			children: [{
				id: "walk",
				label: "주말 산책"
			}]
		}], a = Y(() => [
			"월요일",
			"화요일",
			"수요일",
			"목요일"
		].map((e, t) => ({
			id: String(t),
			label: e,
			value: (r.value === "current" ? [
				2,
				4,
				0,
				5
			] : [
				1,
				3,
				2,
				4
			])[t]
		}))), o = Y(() => a.value.reduce((e, t) => e + t.value, 0));
		return (s, c) => {
			let l = U("SSelect"), u = U("SBarChart"), d = U("STree"), f = U("SCard");
			return W(), G(f, {
				"heading-level": 2,
				title: e.part ? void 0 : "가상 자료의 차트와 계층"
			}, {
				default: B(() => [!e.part || e.part === "chart" ? (W(), hs(as, { key: 0 }, [
					q(l, {
						id: "recipe-chart-week",
						modelValue: L(r),
						"onUpdate:modelValue": c[0] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
						label: "가상 활동 주간",
						options: [{
							value: "current",
							label: "이번 주"
						}, {
							value: "previous",
							label: "지난주"
						}]
					}, null, 8, ["modelValue"]),
					K("p", FT, "총 " + N(L(o)) + "개 기록 · 가상 자료", 1),
					q(u, {
						id: "recipe-chart",
						label: "가상 활동 횟수 · 차트와 같은 자료",
						items: L(a),
						"category-label": "요일",
						"value-label": "기록 수"
					}, null, 8, ["items"])
				], 64)) : Ts("v-if", !0), !e.part || e.part === "tree" ? (W(), hs(as, { key: 1 }, [q(d, {
					id: "recipe-tree",
					modelValue: L(t),
					"onUpdate:modelValue": c[1] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
					expanded: L(n),
					"onUpdate:expanded": c[2] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
					label: "가상 기록 폴더",
					items: i
				}, null, 8, ["modelValue", "expanded"]), K("p", IT, "선택: " + N(L(t) || "없음"), 1)], 64)) : Ts("v-if", !0)]),
				_: 1
			}, 8, ["title"]);
		};
	}
}), RT = { class: "sol-actions sol-actions--commit" }, zT = {
	id: "recipe-form-validation-result",
	role: "status"
}, BT = /* @__PURE__ */ H({
	__name: "form",
	setup(e) {
		let t = ai("form"), n = /* @__PURE__ */ F(""), r = /* @__PURE__ */ F("note"), i = /* @__PURE__ */ F(!1), a = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F(""), l = [QS.required("이름을 입력해 주세요."), QS.minLength(3, "이름을 3자 이상 입력해 주세요.")], u;
		async function d(e) {
			a.value || (o.value = !1, s.value = "", c.value = "", (await e)?.valid ? (a.value = !0, u = setTimeout(() => {
				a.value = !1, i.value ? s.value = "가상 요청 실패입니다. 입력값은 유지됩니다. 실패 옵션을 끄고 다시 확인하세요." : o.value = !0;
			}, 400)) : t.value?.focus());
		}
		function f() {
			a.value || (t.value?.resetValidation(), s.value = "", o.value = !1, c.value = "검증 표시를 지웠어요. 입력값은 유지됩니다.");
		}
		return Qi(() => clearTimeout(u)), (e, u) => {
			let p = U("STextField"), m = U("SCol"), h = U("SSelect"), g = U("SRow"), _ = U("SCheckbox"), v = U("SAlert"), y = U("SBtn"), b = U("SForm"), x = U("SCard");
			return W(), G(x, {
				"heading-level": 2,
				title: "입력과 검증·복구"
			}, {
				default: B(() => [q(b, {
					ref_key: "form",
					ref: t,
					class: "sol-stack",
					onSubmit: du(d, ["prevent"])
				}, {
					default: B(() => [
						q(g, null, {
							default: B(() => [q(m, {
								cols: "12",
								md: "8"
							}, {
								default: B(() => [q(p, {
									id: "recipe-form-name",
									modelValue: L(n),
									"onUpdate:modelValue": u[0] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
									label: "가상 프로젝트 이름",
									rules: l,
									required: ""
								}, null, 8, ["modelValue"])]),
								_: 1
							}), q(m, {
								cols: "12",
								md: "4"
							}, {
								default: B(() => [q(h, {
									id: "recipe-form-kind",
									modelValue: L(r),
									"onUpdate:modelValue": u[1] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
									label: "프로젝트 종류",
									options: [{
										value: "note",
										label: "기록"
									}, {
										value: "search",
										label: "탐색"
									}],
									required: ""
								}, null, 8, ["modelValue"])]),
								_: 1
							})]),
							_: 1
						}),
						q(_, {
							id: "recipe-form-fail",
							modelValue: L(i),
							"onUpdate:modelValue": u[2] ||= (e) => /* @__PURE__ */ P(i) ? i.value = e : null,
							label: "실패를 흉내 내기"
						}, null, 8, ["modelValue"]),
						L(s) ? (W(), G(v, {
							key: 0,
							tone: "danger",
							title: L(s),
							live: "polite"
						}, null, 8, ["title"])) : Ts("v-if", !0),
						L(o) ? (W(), G(v, {
							key: 1,
							tone: "success",
							title: "✓ 가상 입력을 확인했어요.",
							live: "polite"
						})) : Ts("v-if", !0),
						K("div", RT, [q(y, {
							disabled: L(a),
							onClick: f
						}, {
							default: B(() => [...u[3] ||= [J("검증 표시 지우기", -1)]]),
							_: 1
						}, 8, ["disabled"]), q(y, {
							type: "submit",
							variant: "primary",
							loading: L(a)
						}, {
							default: B(() => [...u[4] ||= [J("프로젝트 확인", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						K("p", zT, N(L(c)), 1)
					]),
					_: 1
				}, 512)]),
				_: 1
			});
		};
	}
}), VT = { class: "sol-filterbar" }, HT = { role: "status" }, UT = /* @__PURE__ */ H({
	__name: "search",
	setup(e) {
		let t = /* @__PURE__ */ F(""), n = /* @__PURE__ */ F("all"), r = /* @__PURE__ */ F(!1), i = /* @__PURE__ */ F(""), a = [
			{
				name: "작은 정원",
				status: "진행 중"
			},
			{
				name: "저녁 책장",
				status: "초안"
			},
			{
				name: "주말 산책",
				status: "진행 중"
			}
		], o = Y(() => a.filter((e) => e.name.includes(t.value.trim()) && (n.value === "all" || e.status === n.value)));
		return (e, a) => {
			let s = U("STextField"), c = U("SSelect"), l = U("SBtn"), u = U("SCard"), d = U("SDialog");
			return W(), G(u, {
				"heading-level": 2,
				title: "검색과 상세"
			}, {
				default: B(() => [
					K("div", VT, [q(s, {
						id: "recipe-search",
						modelValue: L(t),
						"onUpdate:modelValue": a[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "가상 자료 검색",
						type: "search"
					}, null, 8, ["modelValue"]), q(c, {
						id: "recipe-search-filter",
						modelValue: L(n),
						"onUpdate:modelValue": a[1] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						label: "상태",
						options: [
							{
								value: "all",
								label: "전체"
							},
							{
								value: "진행 중",
								label: "진행 중"
							},
							{
								value: "초안",
								label: "초안"
							}
						],
						required: ""
					}, null, 8, ["modelValue"])]),
					K("p", HT, "결과 " + N(L(o).length) + "개", 1),
					(W(!0), hs(as, null, da(L(o), (e) => (W(), G(u, {
						key: e.name,
						title: e.name
					}, {
						default: B(() => [K("p", null, N(e.status), 1), q(l, { onClick: (t) => {
							i.value = e.name, r.value = !0;
						} }, {
							default: B(() => [J(N(e.name) + " 상세 보기 ", 1)]),
							_: 2
						}, 1032, ["onClick"])]),
						_: 2
					}, 1032, ["title"]))), 128)),
					L(o).length ? Ts("v-if", !0) : (W(), G(u, {
						key: 0,
						title: "조건에 맞는 자료가 없어요."
					}, {
						default: B(() => [q(l, { onClick: a[2] ||= (e) => {
							t.value = "", n.value = "all";
						} }, {
							default: B(() => [...a[4] ||= [J(" 조건 초기화 ", -1)]]),
							_: 1
						})]),
						_: 1
					})),
					q(d, {
						id: "recipe-search-detail",
						modelValue: L(r),
						"onUpdate:modelValue": a[3] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
						title: L(i)
					}, {
						default: B(() => [...a[5] ||= [K("p", null, "서버에 연결하지 않는 가상 상세입니다.", -1)]]),
						_: 1
					}, 8, ["modelValue", "title"])
				]),
				_: 1
			});
		};
	}
}), WT = { role: "status" }, GT = /* @__PURE__ */ H({
	__name: "compare",
	setup(e) {
		let t = /* @__PURE__ */ F("simple"), n = [{
			value: "simple",
			label: "가볍게 기록",
			description: "이름 + 메모 · 개인 기록"
		}, {
			value: "ordered",
			label: "차근차근 정리",
			description: "이름 + 메모 + 분류 · 작은 자료실"
		}];
		return (e, r) => {
			let i = U("SRadioGroup"), a = U("SCard");
			return W(), G(a, {
				"heading-level": 2,
				title: "같은 속성의 선택"
			}, {
				default: B(() => [q(i, {
					id: "recipe-compare",
					modelValue: L(t),
					"onUpdate:modelValue": r[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
					name: "recipe-compare",
					label: "작업 방식",
					layout: "cards",
					options: n
				}, null, 8, ["modelValue"]), K("p", WT, "선택: " + N(L(t) === "simple" ? "가볍게 기록" : "차근차근 정리"), 1)]),
				_: 1
			});
		};
	}
}), KT = { role: "status" }, qT = /* @__PURE__ */ H({
	__name: "empty",
	setup(e) {
		let t = Nx(), n = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(null), i = /* @__PURE__ */ F(null);
		async function a() {
			n.value = !n.value, await z(), (n.value ? r.value : i.value?.$el)?.focus();
		}
		return (e, o) => {
			let s = U("SBtn"), c = U("SEmptyState"), l = U("SCard");
			return W(), hs(as, null, [L(n) ? (W(), G(l, {
				key: 1,
				"heading-level": 2,
				title: L(t).code === "en-US" ? "Your first item" : "첫 항목"
			}, {
				actions: B(() => [q(s, { onClick: a }, {
					default: B(() => [J(N(L(t).code === "en-US" ? "Reset example" : "예제 초기화"), 1)]),
					_: 1
				})]),
				default: B(() => [K("p", {
					ref_key: "target",
					ref: r,
					tabindex: "-1"
				}, N(L(t).code === "en-US" ? "One example item is ready." : "예제 항목을 추가했어요."), 513)]),
				_: 1
			}, 8, ["title"])) : (W(), G(c, {
				key: 0,
				id: "recipe-empty",
				ref_key: "empty",
				ref: i,
				tabindex: "-1",
				"heading-level": 2,
				icon: "folder",
				title: L(t).code === "en-US" ? "No items yet" : "아직 항목이 없어요.",
				description: L(t).code === "en-US" ? "Create your first item to get started." : "첫 항목을 추가해 보세요.",
				"min-block-size": 240
			}, {
				actions: B(() => [q(s, {
					id: "recipe-empty-add",
					variant: "primary",
					onClick: a
				}, {
					default: B(() => [J(N(L(t).code === "en-US" ? "Add item" : "항목 추가"), 1)]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])), K("p", KT, N(L(t).code === "en-US" ? "Items: " : "항목 수: ") + N(+!!L(n)), 1)], 64);
		};
	}
}), JT = /* @__PURE__ */ H({
	__name: "data",
	setup(e) {
		let t = /* @__PURE__ */ F(""), n = /* @__PURE__ */ F(1), r = /* @__PURE__ */ F([]), i = /* @__PURE__ */ F({
			key: "date",
			direction: "descending"
		}), a = /* @__PURE__ */ F("ready"), o = [
			{
				key: "name",
				label: "이름",
				sortable: !0
			},
			{
				key: "status",
				label: "상태",
				width: "96px"
			},
			{
				key: "date",
				label: "변경일",
				width: "128px",
				sortable: !0
			}
		], s = [
			{
				id: "1",
				name: "작은 정원의 아주 긴 가상 기록 제목을 한 줄로 표시합니다",
				status: "진행 중",
				date: "2026-10-22"
			},
			{
				id: "2",
				name: "저녁 책장",
				status: "초안",
				date: "2026-10-21"
			},
			{
				id: "3",
				name: "주말 산책",
				status: "완료",
				date: "2026-10-20"
			},
			{
				id: "4",
				name: "계절 관찰",
				status: "진행 중",
				date: "2026-10-19"
			}
		], c = Y(() => s.filter((e) => String(e.name).includes(t.value.trim())).sort((e, t) => {
			let n = i.value;
			return n ? String(e[n.key]).localeCompare(String(t[n.key]), "ko") * (n.direction === "ascending" ? 1 : -1) : 0;
		})), l = Y(() => Math.max(1, Math.ceil(c.value.length / 2))), u = Y(() => c.value.slice((n.value - 1) * 2, n.value * 2)), d = /* @__PURE__ */ F(1), f = /* @__PURE__ */ F(!1);
		return V([t, i], () => n.value = 1), V(l, (e) => n.value = Math.min(n.value, e)), (e, s) => {
			let c = U("STextField"), p = U("SSelect"), m = U("SDataTable"), h = U("SNumberInput"), g = U("SCheckbox"), _ = U("SBtn"), v = U("SCard");
			return W(), G(v, {
				"heading-level": 2,
				title: "선택·정렬·페이지"
			}, {
				default: B(() => [
					q(c, {
						id: "recipe-table-search",
						modelValue: L(t),
						"onUpdate:modelValue": s[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "자료 검색",
						type: "search"
					}, null, 8, ["modelValue"]),
					q(p, {
						id: "recipe-table-state",
						modelValue: L(a),
						"onUpdate:modelValue": s[1] ||= (e) => /* @__PURE__ */ P(a) ? a.value = e : null,
						label: "가상 상태",
						options: [
							{
								value: "ready",
								label: "정상"
							},
							{
								value: "loading",
								label: "로딩"
							},
							{
								value: "error",
								label: "오류"
							}
						],
						required: ""
					}, null, 8, ["modelValue"]),
					q(m, {
						caption: "가상 자료 목록",
						columns: o,
						rows: L(u),
						selectable: "",
						selected: L(r),
						"onUpdate:selected": s[2] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
						sort: L(i),
						"onUpdate:sort": s[3] ||= (e) => /* @__PURE__ */ P(i) ? i.value = e : null,
						page: L(n),
						"onUpdate:page": s[4] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						"page-count": L(l),
						"sibling-count": L(d) ?? 1,
						"compact-pagination": L(f),
						loading: L(a) === "loading",
						error: L(a) === "error" ? "가상 오류입니다. 검색과 선택은 남습니다." : "",
						onRetry: s[5] ||= (e) => a.value = "ready"
					}, null, 8, [
						"rows",
						"selected",
						"sort",
						"page",
						"page-count",
						"sibling-count",
						"compact-pagination",
						"loading",
						"error"
					]),
					q(h, {
						id: "recipe-table-siblings",
						modelValue: L(d),
						"onUpdate:modelValue": s[6] ||= (e) => /* @__PURE__ */ P(d) ? d.value = e : null,
						label: "현재 페이지 양옆 번호 수",
						min: 0,
						max: 5,
						step: 1
					}, null, 8, ["modelValue"]),
					q(g, {
						id: "recipe-table-compact",
						modelValue: L(f),
						"onUpdate:modelValue": s[7] ||= (e) => /* @__PURE__ */ P(f) ? f.value = e : null,
						label: "페이지 이동을 현재 번호 중심으로 표시"
					}, null, 8, ["modelValue"]),
					q(_, {
						variant: "inline",
						disabled: !L(r).length,
						onClick: s[8] ||= (e) => r.value = []
					}, {
						default: B(() => [...s[9] ||= [J(" 선택 해제 ", -1)]]),
						_: 1
					}, 8, ["disabled"])
				]),
				_: 1
			});
		};
	}
}), YT = ["aria-labelledby"], XT = {
	key: 0,
	id: "recipe-inputs-title"
}, ZT = { role: "status" }, QT = { role: "status" }, $T = /* @__PURE__ */ H({
	__name: "inputs",
	props: { part: {} },
	setup(e) {
		let t = /* @__PURE__ */ F(!0), n = /* @__PURE__ */ F("range"), r = /* @__PURE__ */ F(null), i = Y(() => n.value === "single" ? "single" : "range"), a = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F("legacy"), s = /* @__PURE__ */ F("bottom-start"), c = Y(() => o.value === "auto" || o.value === "popover" || o.value === "dialog" ? o.value : void 0), l = Y(() => s.value === "top-start" || s.value === "top-end" || s.value === "bottom-end" ? s.value : "bottom-start"), u = (e, t) => e + " (" + Lx(e, t, {
			year: void 0,
			month: void 0,
			day: void 0,
			weekday: "short"
		}) + ")";
		V(i, () => r.value = null);
		let d = /* @__PURE__ */ F([]), f = /* @__PURE__ */ F(null), p = /* @__PURE__ */ F("local"), m = [
			"기록",
			"독서",
			"식물",
			"산책",
			"작은 정원"
		].map((e) => ({
			value: e,
			label: e
		})), h = !0;
		V(p, () => {
			h = !0, f.value = null;
		});
		let g = Y(() => {
			let e = p.value;
			if (e !== "local") return (t, n) => new Promise((r, i) => {
				let a = () => {
					clearTimeout(o), i(new DOMException("Cancelled", "AbortError"));
				}, o = setTimeout(() => {
					n.removeEventListener("abort", a), e === "error" && h ? (h = !1, i(/* @__PURE__ */ Error("Simulated response"))) : r(m.filter((e) => e.label.includes(t.trim())));
				}, t.includes("느림") ? 450 : 150);
				n.addEventListener("abort", a, { once: !0 }), n.aborted && a();
			});
		});
		return (h, _) => {
			let v = U("SRadioGroup"), y = U("SCheckbox"), b = U("SSelect"), x = U("SDatePicker"), S = U("SCard"), C = U("SFileInput"), w = U("SAutocomplete");
			return W(), hs("section", {
				class: "sol-stack",
				"aria-labelledby": e.part ? void 0 : "recipe-inputs-title"
			}, [
				e.part ? Ts("v-if", !0) : (W(), hs("h2", XT, "로컬 입력 조합")),
				!e.part || e.part === "date" ? (W(), G(S, {
					key: 1,
					"heading-level": e.part ? 2 : 3,
					title: "단일 날짜와 기간"
				}, {
					default: B(() => [
						q(v, {
							id: "recipe-date-mode",
							modelValue: L(n),
							"onUpdate:modelValue": _[0] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
							label: "개발 설정 시연",
							options: [{
								value: "single",
								label: "단일 날짜"
							}, {
								value: "range",
								label: "기간"
							}],
							required: ""
						}, null, 8, ["modelValue"]),
						q(y, {
							id: "recipe-date-weekday",
							modelValue: L(a),
							"onUpdate:modelValue": _[1] ||= (e) => /* @__PURE__ */ P(a) ? a.value = e : null,
							label: "요일 표시 · 저장값은 ISO 유지"
						}, null, 8, ["modelValue"]),
						q(b, {
							id: "recipe-date-presentation",
							modelValue: L(o),
							"onUpdate:modelValue": _[2] ||= (e) => /* @__PURE__ */ P(o) ? o.value = e : null,
							label: "팝업 표시 방식",
							options: [
								{
									value: "legacy",
									label: "기존 기본 모달"
								},
								{
									value: "auto",
									label: "화면에 맞춰 자동 전환"
								},
								{
									value: "popover",
									label: "입력창에 연결된 팝업"
								},
								{
									value: "dialog",
									label: "모달 다이얼로그"
								}
							]
						}, null, 8, ["modelValue"]),
						q(b, {
							id: "recipe-date-placement",
							modelValue: L(s),
							"onUpdate:modelValue": _[3] ||= (e) => /* @__PURE__ */ P(s) ? s.value = e : null,
							label: "연결 팝업의 기준 위치",
							disabled: !L(c),
							options: [
								{
									value: "bottom-start",
									label: "아래 · 시작"
								},
								{
									value: "bottom-end",
									label: "아래 · 끝"
								},
								{
									value: "top-start",
									label: "위 · 시작"
								},
								{
									value: "top-end",
									label: "위 · 끝"
								}
							]
						}, null, 8, ["modelValue", "disabled"]),
						q(x, {
							id: "recipe-date",
							modelValue: L(r),
							"onUpdate:modelValue": _[4] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
							clearable: "",
							label: "가상 일정",
							mode: L(i),
							"picker-presentation": L(c),
							placement: L(l),
							"display-formatter": L(a) ? u : void 0
						}, null, 8, [
							"modelValue",
							"mode",
							"picker-presentation",
							"placement",
							"display-formatter"
						]),
						K("p", ZT, "완료값: " + N(JSON.stringify(L(r))), 1)
					]),
					_: 1
				}, 8, ["heading-level"])) : Ts("v-if", !0),
				!e.part || e.part === "files" ? (W(), G(S, {
					key: 2,
					"heading-level": e.part ? 2 : 3,
					title: "로컬 파일 선택과 드롭"
				}, {
					default: B(() => [q(y, {
						id: "recipe-files-preview",
						modelValue: L(t),
						"onUpdate:modelValue": _[5] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "선택한 이미지의 로컬 미리보기"
					}, null, 8, ["modelValue"]), q(C, {
						preview: L(t),
						id: "recipe-files",
						modelValue: L(d),
						"onUpdate:modelValue": _[6] ||= (e) => /* @__PURE__ */ P(d) ? d.value = e : null,
						label: "가상 첨부 파일",
						accept: ".txt,.png,.jpg,.jpeg,.pdf",
						"max-files": 3,
						"max-file-size": 2097152,
						help: "선택한 이미지는 이 화면에서만 로컬 썸네일로 표시합니다. 파일을 외부로 보내지 않으며 제거하거나 화면을 닫으면 미리보기 URL을 해제합니다."
					}, null, 8, ["preview", "modelValue"])]),
					_: 1
				}, 8, ["heading-level"])) : Ts("v-if", !0),
				!e.part || e.part === "autocomplete" ? (W(), G(S, {
					key: 3,
					"heading-level": e.part ? 2 : 3,
					title: "단일 자동완성"
				}, {
					default: B(() => [
						q(b, {
							id: "recipe-autocomplete-mode",
							modelValue: L(p),
							"onUpdate:modelValue": _[7] ||= (e) => /* @__PURE__ */ P(p) ? p.value = e : null,
							label: "가상 응답",
							options: [
								{
									value: "local",
									label: "즉시 로컬"
								},
								{
									value: "async",
									label: "지연 응답"
								},
								{
									value: "error",
									label: "오류 후 재시도"
								}
							],
							required: ""
						}, null, 8, ["modelValue"]),
						q(w, {
							id: "recipe-autocomplete",
							modelValue: L(f),
							"onUpdate:modelValue": _[8] ||= (e) => /* @__PURE__ */ P(f) ? f.value = e : null,
							clearable: "",
							label: "가상 분류 검색",
							options: L(m),
							"load-options": L(g),
							debounce: 0,
							locale: { retry: "검색 다시 시도" },
							help: "방향키·Enter 선택, Escape 닫기. 직접 입력은 검색어이며 선택한 값만 반영합니다. 비동기 응답도 브라우저 안의 가상 처리입니다."
						}, null, 8, [
							"modelValue",
							"options",
							"load-options"
						]),
						K("p", QT, "선택값: " + N(L(f) || "없음"), 1)
					]),
					_: 1
				}, 8, ["heading-level"])) : Ts("v-if", !0)
			], 8, YT);
		};
	}
}), eE = /* @__PURE__ */ H({
	__name: "responses",
	setup(e) {
		let t = /* @__PURE__ */ F("ready"), n = ai("resultPanel");
		function r(e) {
			let r = e.currentTarget;
			t.value = "ready", z(() => {
				(document.activeElement === r || document.activeElement === document.body) && n.value?.focus({ preventScroll: !0 });
			});
		}
		return (e, i) => {
			let a = U("SSelect"), o = U("SProgressLinear"), s = U("SBtn"), c = U("SCard"), l = U("SAlert");
			return W(), G(c, {
				"heading-level": 2,
				title: "비어 있음과 오류를 구분"
			}, {
				default: B(() => [q(a, {
					id: "recipe-response",
					modelValue: L(t),
					"onUpdate:modelValue": i[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
					label: "가상 응답",
					options: [
						{
							value: "ready",
							label: "정상"
						},
						{
							value: "loading",
							label: "로딩"
						},
						{
							value: "empty",
							label: "결과 없음"
						},
						{
							value: "denied",
							label: "권한 없음"
						},
						{
							value: "error",
							label: "오류"
						}
					],
					required: ""
				}, null, 8, ["modelValue"]), L(t) === "loading" ? (W(), G(o, {
					key: 0,
					id: "recipe-response-loading",
					label: "가상 자료를 불러오는 중",
					state: "indeterminate"
				})) : L(t) === "empty" ? (W(), G(c, {
					key: 1,
					title: "조건에 맞는 자료가 없어요."
				}, {
					default: B(() => [q(s, { onClick: i[1] ||= (e) => t.value = "ready" }, {
						default: B(() => [...i[3] ||= [J("조건 초기화", -1)]]),
						_: 1
					})]),
					_: 1
				})) : L(t) === "denied" ? (W(), G(l, {
					key: 2,
					tone: "info",
					title: "이 가상 자료에 접근할 수 없어요."
				}, {
					actions: B(() => [q(s, {
						variant: "inline",
						onClick: i[2] ||= (e) => t.value = "ready"
					}, {
						default: B(() => [...i[4] ||= [J(" 공개 예시 보기 ", -1)]]),
						_: 1
					})]),
					default: B(() => [i[5] ||= K("p", null, "실제 계정 권한은 바꾸지 않습니다.", -1)]),
					_: 1
				})) : L(t) === "error" ? (W(), G(l, {
					key: 3,
					tone: "danger",
					title: "가상 자료를 불러오지 못했어요."
				}, {
					actions: B(() => [q(s, {
						variant: "inline",
						onClick: r
					}, {
						default: B(() => [...i[6] ||= [J(" 다시 시도 ", -1)]]),
						_: 1
					})]),
					_: 1
				})) : (W(), hs("p", {
					key: 4,
					id: "recipe-response-result",
					ref_key: "resultPanel",
					ref: n,
					tabindex: "-1",
					role: "status"
				}, " ✓ 가상 기록 2개를 확인했어요. ", 512))]),
				_: 1
			});
		};
	}
}), tE = { class: "sol-stack" }, nE = { class: "sol-filterbar" }, rE = {
	class: "starter-link sol-ui-card-link",
	href: "?view=recipes&example=empty",
	target: "_blank",
	rel: "noopener"
}, iE = /*#__PURE__*/ ET(/* @__PURE__ */ H({
	__name: "composition",
	setup(e) {
		let t = /* @__PURE__ */ F(""), n = /* @__PURE__ */ F("all"), r = /* @__PURE__ */ F(!0), i = /* @__PURE__ */ F(!1), a = ai("resultPanel");
		function o(e) {
			let t = e.currentTarget;
			r.value = !1, z(() => {
				(document.activeElement === t || document.activeElement === document.body) && a.value?.focus({ preventScroll: !0 });
			});
		}
		return (e, s) => {
			let c = U("STextField"), l = U("SSelect"), u = U("SBtn"), d = U("SAlert"), f = U("SCard"), p = U("SIcon"), m = U("SBadge");
			return W(), hs("div", tE, [q(f, {
				"heading-level": 2,
				title: "컨트롤과 보조 행동의 관계"
			}, {
				default: B(() => [K("div", nE, [q(c, {
					id: "recipe-composition-query",
					modelValue: L(t),
					"onUpdate:modelValue": s[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
					label: "검색",
					help: "도움말이 있어도 컨트롤 시작점은 같습니다."
				}, null, 8, ["modelValue"]), q(l, {
					id: "recipe-composition-state",
					modelValue: L(n),
					"onUpdate:modelValue": s[1] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
					label: "상태",
					options: [{
						value: "all",
						label: "전체"
					}, {
						value: "done",
						label: "완료"
					}],
					required: ""
				}, null, 8, ["modelValue"])]), L(r) ? (W(), G(d, {
					key: 0,
					tone: "danger",
					title: "가상 자료를 불러오지 못했어요."
				}, {
					actions: B(() => [q(u, {
						variant: "inline",
						onClick: o
					}, {
						default: B(() => [...s[3] ||= [J(" 다시 시도 ", -1)]]),
						_: 1
					})]),
					default: B(() => [s[4] ||= K("p", null, "현재 검색 조건은 유지됩니다.", -1)]),
					_: 1
				})) : (W(), hs("p", {
					key: 1,
					id: "recipe-composition-result",
					ref_key: "resultPanel",
					ref: a,
					tabindex: "-1",
					role: "status"
				}, " ✓ 가상 재시도를 확인했어요. ", 512))]),
				_: 1
			}), q(f, { description: "제목 링크와 보조 버튼을 독립적으로 조작할 수 있습니다." }, {
				leading: B(() => [q(p, {
					name: "folder",
					decorative: ""
				})]),
				title: B(() => [K("a", rE, [s[5] ||= J("항목 미리보기 · 새 탭 ", -1), q(p, {
					name: "external",
					decorative: "",
					size: 16
				})])]),
				meta: B(() => [q(m, { content: L(i) ? "보관됨" : "예제" }, null, 8, ["content"])]),
				actions: B(() => [q(u, { onClick: s[2] ||= (e) => i.value = !L(i) }, {
					default: B(() => [J(N(L(i) ? "보관 해제" : "보관"), 1)]),
					_: 1
				})]),
				_: 1
			})]);
		};
	}
}), [["__scopeId", "data-v-6026db63"]]), aE = { class: "layout-demo-box" }, oE = { class: "layout-demo-box" }, sE = {
	class: "sol-actions",
	"aria-label": "가상 화면"
}, cE = {
	key: 0,
	class: "sol-actions"
}, lE = { class: "sol-actions sol-actions--commit" }, uE = { role: "status" }, dE = /*#__PURE__*/ ET(/* @__PURE__ */ H({
	__name: "layouts",
	props: { part: {} },
	setup(e) {
		let t = /* @__PURE__ */ F(e.part || "composition"), n = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F("center"), i = /* @__PURE__ */ F("8"), a = Y(() => Number(i.value) || 8), o = ai("heading"), s = /* @__PURE__ */ F("list"), c = /* @__PURE__ */ F("작은 정원"), l = /* @__PURE__ */ F("가상 사용자"), u = /* @__PURE__ */ F("");
		function d(e) {
			s.value = e, z(() => o.value?.focus());
		}
		return (e, f) => {
			let p = U("SSelect"), m = U("SContainer"), h = U("SCard"), g = U("SCheckbox"), _ = U("SCol"), v = U("SRow"), y = U("SBtn"), b = U("STextField"), x = U("SForm");
			return W(), hs(as, null, [q(p, {
				id: "recipe-layout-demo",
				modelValue: L(t),
				"onUpdate:modelValue": f[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
				label: "레이아웃 예제",
				options: [
					{
						value: "container",
						label: "Container · 너비"
					},
					{
						value: "row",
						label: "Row · 간격과 정렬"
					},
					{
						value: "col",
						label: "Col · 반응형 비율"
					},
					{
						value: "composition",
						label: "화면틀 조합"
					}
				]
			}, null, 8, ["modelValue"]), L(t) === "container" ? (W(), G(h, {
				key: 0,
				"heading-level": 2,
				title: "Container · 제한 너비와 fluid"
			}, {
				default: B(() => [
					f[12] ||= K("p", null, "같은 부모 안에서 콘텐츠 너비를 제한하거나 전체 너비로 펼칩니다.", -1),
					q(m, {
						class: "layout-demo-box",
						style: { "max-inline-size": "28rem" }
					}, {
						default: B(() => [...f[10] ||= [K("strong", null, "최대 28rem · 가운데 정렬", -1), K("p", null, "긴 줄의 길이를 제한합니다.", -1)]]),
						_: 1
					}),
					q(m, {
						fluid: "",
						class: "layout-demo-box"
					}, {
						default: B(() => [...f[11] ||= [K("strong", null, "fluid · 부모 너비", -1), K("p", null, "대시보드처럼 넓은 영역을 활용합니다.", -1)]]),
						_: 1
					})
				]),
				_: 1
			})) : L(t) === "row" ? (W(), G(h, {
				key: 1,
				"heading-level": 2,
				title: "Row · 간격과 세로 정렬"
			}, {
				default: B(() => [
					q(g, {
						id: "recipe-row-dense",
						modelValue: L(n),
						"onUpdate:modelValue": f[1] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						label: "촘촘한 열 간격"
					}, null, 8, ["modelValue"]),
					q(p, {
						id: "recipe-row-align",
						modelValue: L(r),
						"onUpdate:modelValue": f[2] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
						label: "세로 정렬",
						options: [
							{
								value: "start",
								label: "위"
							},
							{
								value: "center",
								label: "가운데"
							},
							{
								value: "end",
								label: "아래"
							}
						]
					}, null, 8, ["modelValue"]),
					q(v, {
						dense: L(n),
						align: L(r) === "start" ? "start" : L(r) === "end" ? "end" : "center",
						class: "layout-demo-row"
					}, {
						default: B(() => [
							q(_, { cols: "4" }, {
								default: B(() => [...f[13] ||= [K("div", { class: "layout-demo-box" }, "짧은 열", -1)]]),
								_: 1
							}),
							q(_, { cols: "4" }, {
								default: B(() => [...f[14] ||= [K("div", { class: "layout-demo-box" }, [
									J("두 줄의"),
									K("br"),
									J("내용")
								], -1)]]),
								_: 1
							}),
							q(_, { cols: "4" }, {
								default: B(() => [...f[15] ||= [K("div", { class: "layout-demo-box" }, [
									J("세 줄의"),
									K("br"),
									J("내용을"),
									K("br"),
									J("정렬합니다.")
								], -1)]]),
								_: 1
							})
						]),
						_: 1
					}, 8, ["dense", "align"])
				]),
				_: 1
			})) : L(t) === "col" ? (W(), G(h, {
				key: 2,
				"heading-level": 2,
				title: "Col · 반응형 비율과 줄바꿈"
			}, {
				default: B(() => [
					q(p, {
						id: "recipe-col-ratio",
						modelValue: L(i),
						"onUpdate:modelValue": f[3] ||= (e) => /* @__PURE__ */ P(i) ? i.value = e : null,
						label: "600px 이상 첫 번째 열 비율",
						options: [
							{
								value: "8",
								label: "8 / 4"
							},
							{
								value: "6",
								label: "6 / 6"
							},
							{
								value: "4",
								label: "4 / 8"
							}
						]
					}, null, 8, ["modelValue"]),
					f[17] ||= K("p", null, "좁은 화면에서는 각 열이 12칸을 사용해 한 줄씩 쌓입니다.", -1),
					q(v, { class: "layout-demo-columns" }, {
						default: B(() => [
							q(_, {
								cols: "12",
								sm: L(a)
							}, {
								default: B(() => [K("div", aE, "첫 번째 · " + N(L(a)) + "/12", 1)]),
								_: 1
							}, 8, ["sm"]),
							q(_, {
								cols: "12",
								sm: 12 - L(a)
							}, {
								default: B(() => [K("div", oE, "두 번째 · " + N(12 - L(a)) + "/12", 1)]),
								_: 1
							}, 8, ["sm"]),
							q(_, { cols: "12" }, {
								default: B(() => [...f[16] ||= [K("div", { class: "layout-demo-box" }, "다음 행 · 12/12", -1)]]),
								_: 1
							})
						]),
						_: 1
					})
				]),
				_: 1
			})) : (W(), G(h, {
				key: 3,
				"heading-level": 2,
				title: "설정·목록·상세 화면틀"
			}, {
				actions: B(() => [K("nav", sE, [
					q(y, { onClick: f[4] ||= (e) => d("list") }, {
						default: B(() => [...f[18] ||= [J("목록", -1)]]),
						_: 1
					}),
					q(y, { onClick: f[5] ||= (e) => d("detail") }, {
						default: B(() => [...f[19] ||= [J("상세", -1)]]),
						_: 1
					}),
					q(y, { onClick: f[6] ||= (e) => d("settings") }, {
						default: B(() => [...f[20] ||= [J("설정", -1)]]),
						_: 1
					})
				])]),
				default: B(() => [q(m, {
					fluid: "",
					class: "pa-0"
				}, {
					default: B(() => [q(v, null, {
						default: B(() => [q(_, {
							cols: "12",
							md: "4"
						}, {
							default: B(() => [...f[21] ||= [K("p", null, "목록·상세·설정은 같은 여백과 반응형 열을 공유합니다.", -1)]]),
							_: 1
						}), q(_, {
							cols: "12",
							md: "8"
						}, {
							default: B(() => [K("section", null, [
								K("h3", {
									id: "recipe-layout-title",
									ref_key: "heading",
									ref: o,
									tabindex: "-1"
								}, N(L(s) === "list" ? "목록" : L(s) === "detail" ? "상세" : "설정"), 513),
								L(s) === "list" ? (W(), hs("div", cE, [(W(), hs(as, null, da(["작은 정원", "조용한 책장"], (e) => q(y, {
									key: e,
									onClick: (t) => {
										c.value = e, d("detail");
									}
								}, {
									default: B(() => [J(N(e), 1)]),
									_: 2
								}, 1032, ["onClick"])), 64))])) : L(s) === "detail" ? (W(), G(h, {
									key: 1,
									title: L(c)
								}, {
									actions: B(() => [q(y, { onClick: f[7] ||= (e) => d("list") }, {
										default: B(() => [...f[22] ||= [J("목록으로", -1)]]),
										_: 1
									})]),
									default: B(() => [f[23] ||= K("p", null, "가상 기록의 짧은 상세입니다.", -1)]),
									_: 1
								}, 8, ["title"])) : (W(), G(x, {
									key: 2,
									class: "sol-stack",
									onSubmit: f[9] ||= du((e) => u.value = "✓ 가상 설정을 확인했어요.", ["prevent"])
								}, {
									default: B(() => [q(b, {
										id: "recipe-layout-name",
										modelValue: L(l),
										"onUpdate:modelValue": f[8] ||= (e) => /* @__PURE__ */ P(l) ? l.value = e : null,
										label: "사용자 이름"
									}, null, 8, ["modelValue"]), K("div", lE, [q(y, { type: "submit" }, {
										default: B(() => [...f[24] ||= [J("설정 확인", -1)]]),
										_: 1
									})])]),
									_: 1
								})),
								K("p", uE, N(L(u)), 1)
							])]),
							_: 1
						})]),
						_: 1
					})]),
					_: 1
				})]),
				_: 1
			}))], 64);
		};
	}
}), [["__scopeId", "data-v-2c981521"]]), fE = { class: "sol-actions sol-actions--commit" }, pE = { class: "sol-actions" }, mE = /* @__PURE__ */ H({
	__name: "workflow",
	setup(e, { expose: t }) {
		let n = ai("editTitle"), r = ai("nameField"), i = ai("editButton"), a = ai("undoButton"), o = /* @__PURE__ */ F({
			title: "작은 정원",
			note: "가상 기록입니다."
		}), s = /* @__PURE__ */ F({ ...o.value }), c = /* @__PURE__ */ F(!1), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(!1), d = /* @__PURE__ */ F("leave"), f = /* @__PURE__ */ F(""), p = Y(() => s.value.title !== o.value.title || s.value.note !== o.value.note), m, h;
		function g() {
			return !c.value || !p.value ? Promise.resolve(!0) : h || (d.value = "leave", h = new Promise((e) => m = e), u.value = !0, h);
		}
		V(u, (e) => {
			if (!e && m) {
				let e = m;
				m = void 0, h = void 0, e(!1);
			}
		}), t({ confirmLeave: g });
		function _() {
			s.value = { ...o.value }, c.value = !0, z(() => n.value?.focus());
		}
		function v() {
			s.value.title.trim() ? (o.value = { ...s.value }, c.value = !1, f.value = "", z(() => i.value?.$el.focus())) : (f.value = "기록 제목을 입력해 주세요.", z(() => r.value?.focus()));
		}
		function y() {
			p.value ? (d.value = "leave", u.value = !0) : b();
		}
		function b() {
			c.value = !1, f.value = "", z(() => i.value?.$el.focus());
		}
		function x() {
			l.value = !1, z(() => i.value?.$el.focus());
		}
		function S() {
			d.value = "delete", u.value = !0;
		}
		function C() {
			let e = m;
			m = void 0, h = void 0, u.value = !1, d.value === "delete" ? (l.value = !0, z(() => a.value?.$el.focus())) : e ? (c.value = !1, f.value = "") : b(), e?.(!0);
		}
		function w(e) {
			c.value && p.value && (e.preventDefault(), e.returnValue = "");
		}
		return Yi(() => window.addEventListener("beforeunload", w)), Qi(() => {
			window.removeEventListener("beforeunload", w), m?.(!1);
		}), (e, t) => {
			let p = U("SBtn"), m = U("SAlert"), h = U("STextField"), g = U("STextarea"), w = U("SDialog"), T = U("SCard");
			return W(), G(T, {
				"heading-level": 2,
				title: "수정과 복구"
			}, {
				default: B(() => [L(l) ? (W(), G(m, {
					key: 0,
					title: "가상 기록을 삭제했어요."
				}, {
					actions: B(() => [q(p, {
						variant: "inline",
						id: "recipe-undo",
						ref_key: "undoButton",
						ref: a,
						onClick: x
					}, {
						default: B(() => [...t[4] ||= [J(" 삭제 되돌리기 ", -1)]]),
						_: 1
					}, 512)]),
					_: 1
				})) : L(c) ? (W(), hs("form", {
					key: 1,
					class: "sol-stack",
					onSubmit: du(v, ["prevent"]),
					novalidate: ""
				}, [
					K("h3", {
						id: "recipe-edit-title",
						ref_key: "editTitle",
						ref: n,
						tabindex: "-1"
					}, "가상 기록 수정", 512),
					q(h, {
						id: "recipe-edit-name",
						ref_key: "nameField",
						ref: r,
						modelValue: L(s).title,
						"onUpdate:modelValue": t[0] ||= (e) => L(s).title = e,
						label: "기록 제목",
						error: L(f),
						required: ""
					}, null, 8, ["modelValue", "error"]),
					q(g, {
						id: "recipe-edit-note",
						modelValue: L(s).note,
						"onUpdate:modelValue": t[1] ||= (e) => L(s).note = e,
						label: "기록 설명"
					}, null, 8, ["modelValue"]),
					K("div", fE, [
						q(p, { onClick: b }, {
							default: B(() => [...t[5] ||= [J("수정 취소", -1)]]),
							_: 1
						}),
						q(p, { onClick: y }, {
							default: B(() => [...t[6] ||= [J("다른 가상 화면으로", -1)]]),
							_: 1
						}),
						q(p, {
							type: "submit",
							variant: "primary"
						}, {
							default: B(() => [...t[7] ||= [J(" 저장 ", -1)]]),
							_: 1
						})
					])
				], 32)) : (W(), hs(as, { key: 2 }, [K("p", null, N(L(o).title) + " · " + N(L(o).note), 1), K("div", pE, [q(p, {
					id: "recipe-edit",
					ref_key: "editButton",
					ref: i,
					onClick: _
				}, {
					default: B(() => [...t[8] ||= [J(" 수정 ", -1)]]),
					_: 1
				}, 512), q(p, {
					variant: "secondary",
					onClick: S
				}, {
					default: B(() => [...t[9] ||= [J(" 가상 삭제 ", -1)]]),
					_: 1
				})])], 64)), q(w, {
					id: "recipe-edit-confirm",
					modelValue: L(u),
					"onUpdate:modelValue": t[3] ||= (e) => /* @__PURE__ */ P(u) ? u.value = e : null,
					title: L(d) === "delete" ? "가상 기록 1개를 삭제할까요?" : "저장하지 않은 변경이 있어요."
				}, {
					actions: B(() => [q(p, { onClick: t[2] ||= (e) => u.value = !1 }, {
						default: B(() => [...t[10] ||= [J("계속 작업", -1)]]),
						_: 1
					}), q(p, {
						variant: "secondary",
						onClick: C
					}, {
						default: B(() => [J(N(L(d) === "delete" ? "가상 삭제" : "변경 버리기"), 1)]),
						_: 1
					})]),
					default: B(() => [t[11] ||= K("p", null, "실제 파일과 서버에 연결되지 않습니다.", -1)]),
					_: 1
				}, 8, ["modelValue", "title"])]),
				_: 1
			});
		};
	}
}), hE = ["href", "onClick"], gE = { class: "sol-actions sol-actions--commit" }, _E = {
	key: 1,
	role: "status"
}, vE = /* @__PURE__ */ H({
	__name: "error-summary",
	setup(e) {
		let t = ai("summary"), n = ai("nameField"), r = ai("countField"), i = /* @__PURE__ */ F(""), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ F(!1), s = [QS.required("이름을 입력해 주세요."), QS.minLength(3, "이름을 3자 이상 입력해 주세요.")], c = Y(() => o.value ? [{
			id: "recipe-summary-name",
			label: "이름",
			message: !i.value.trim() || i.value.length < 3 ? "이름을 3자 이상 입력해 주세요." : "",
			focus: () => n.value?.focus()
		}, {
			id: "recipe-summary-count",
			label: "개수",
			message: a.value === null || a.value < 1 || a.value > 5 ? "1~5 사이 개수를 입력해 주세요." : "",
			focus: () => r.value?.focus()
		}].filter((e) => e.message) : []);
		async function l(e) {
			o.value = !0;
			let n = await e;
			await z(), n?.valid || t.value?.$el.focus();
		}
		return (e, u) => {
			let d = U("SAlert"), f = U("STextField"), p = U("SNumberInput"), m = U("SBtn"), h = U("SForm"), g = U("SCard");
			return W(), G(g, {
				"heading-level": 2,
				title: "오류 위치와 수정 방법"
			}, {
				default: B(() => [q(h, {
					class: "sol-stack",
					onSubmit: du(l, ["prevent"])
				}, {
					default: B(() => [
						L(c).length ? (W(), G(d, {
							key: 0,
							id: "recipe-summary",
							ref_key: "summary",
							ref: t,
							title: "입력을 확인해 주세요.",
							tone: "danger",
							tabindex: "-1"
						}, {
							default: B(() => [K("ul", null, [(W(!0), hs(as, null, da(L(c), (e) => (W(), hs("li", { key: e.id }, [K("a", {
								href: "#" + e.id,
								onClick: du((t) => e.focus(), ["prevent"])
							}, N(e.label) + " 확인하기", 9, hE)]))), 128))])]),
							_: 1
						}, 512)) : Ts("v-if", !0),
						q(f, {
							id: "recipe-summary-name",
							ref_key: "nameField",
							ref: n,
							modelValue: L(i),
							"onUpdate:modelValue": u[0] ||= (e) => /* @__PURE__ */ P(i) ? i.value = e : null,
							label: "기록 이름",
							rules: s,
							required: ""
						}, null, 8, ["modelValue"]),
						q(p, {
							id: "recipe-summary-count",
							ref_key: "countField",
							ref: r,
							modelValue: L(a),
							"onUpdate:modelValue": u[1] ||= (e) => /* @__PURE__ */ P(a) ? a.value = e : null,
							label: "목표 개수",
							min: 1,
							max: 5,
							required: ""
						}, null, 8, ["modelValue"]),
						K("div", gE, [q(m, {
							type: "submit",
							variant: "primary"
						}, {
							default: B(() => [...u[2] ||= [J("가상 입력 확인", -1)]]),
							_: 1
						})]),
						L(o) && !L(c).length ? (W(), hs("p", _E, "✓ 두 입력을 확인했어요.")) : Ts("v-if", !0)
					]),
					_: 1
				})]),
				_: 1
			});
		};
	}
}), yE = { class: "sol-actions sol-actions--commit" }, bE = /* @__PURE__ */ H({
	__name: "bulk-recovery",
	setup(e) {
		let t = ai("resultPanel"), n = ai("runButton"), r = ai("retryButton"), i = /* @__PURE__ */ F([
			1,
			2,
			3
		].map((e) => ({
			id: e,
			state: "idle",
			attempts: 0
		}))), a = /* @__PURE__ */ F({
			1: !0,
			2: !0,
			3: !0
		}), o = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F(""), c, l, u = !1, d = Y(() => i.value.some((e) => e.state === "error"));
		function f(e = !1) {
			if (o.value) return;
			let d = i.value.filter((t) => e ? t.state === "error" : a.value[t.id] && t.state === "idle");
			if (!d.length) return;
			let f = document.activeElement, p = f === n.value?.$el || f === r.value?.$el, m = (e) => {
				e.target !== f && e.target !== document.body && (p = !1);
			}, h = (e) => {
				f?.contains(e.target) || (p = !1);
			}, g = () => {
				document.removeEventListener("focusin", m, !0), document.removeEventListener("pointerdown", h, !0);
			};
			document.addEventListener("focusin", m, !0), document.addEventListener("pointerdown", h, !0), l = g, o.value = !0, s.value = "가상 항목 처리 중…", d.forEach((e) => {
				e.state = "pending", e.attempts++;
			}), c = setTimeout(() => {
				d.forEach((e) => e.state = e.id === 2 && e.attempts === 1 ? "error" : "success"), o.value = !1, s.value = "완료 " + i.value.filter((e) => e.state === "success").length + "개 · 실패 " + i.value.filter((e) => e.state === "error").length + "개", z(() => {
					let e = document.activeElement;
					u || !p || e !== f && e !== document.body && e || t.value?.$el.focus({ preventScroll: !0 }), g(), l === g && (l = void 0);
				});
			}, 350);
		}
		return Qi(() => {
			u = !0, clearTimeout(c), l?.();
		}), (e, c) => {
			let l = U("SCheckbox"), u = U("SBtn"), p = U("SAlert"), m = U("SCard");
			return W(), G(m, {
				"heading-level": 2,
				title: "일괄 작업의 일부 실패"
			}, {
				default: B(() => [
					c[4] ||= K("p", null, "처음에는 2번만 실패하는 가상 처리입니다. 외부 데이터를 바꾸지 않습니다.", -1),
					(W(!0), hs(as, null, da(L(i), (e) => (W(), hs("div", { key: e.id }, [q(l, {
						id: "recipe-bulk-" + e.id,
						"model-value": L(a)[e.id],
						"onUpdate:modelValue": (t) => L(a)[e.id] = t,
						label: "가상 기록 " + e.id,
						disabled: L(o) || e.state === "success"
					}, null, 8, [
						"id",
						"model-value",
						"onUpdate:modelValue",
						"label",
						"disabled"
					]), K("p", null, N(e.state) + " · 처리 " + N(e.attempts) + "회", 1)]))), 128)),
					K("div", yE, [q(u, {
						ref_key: "retryButton",
						ref: r,
						id: "recipe-bulk-retry",
						variant: "inline",
						disabled: L(o) || !L(d),
						onClick: c[0] ||= (e) => f(!0)
					}, {
						default: B(() => [...c[2] ||= [J(" 실패 항목만 다시 시도 ", -1)]]),
						_: 1
					}, 8, ["disabled"]), q(u, {
						ref_key: "runButton",
						ref: n,
						loading: L(o),
						onClick: c[1] ||= (e) => f()
					}, {
						default: B(() => [...c[3] ||= [J(" 선택한 가상 항목 처리 ", -1)]]),
						_: 1
					}, 8, ["loading"])]),
					L(s) ? (W(), G(p, {
						key: 0,
						id: "recipe-bulk-result",
						ref_key: "resultPanel",
						ref: t,
						tabindex: "-1",
						tone: L(o) ? "info" : L(d) ? "danger" : "success",
						title: L(s),
						live: "polite"
					}, null, 8, ["tone", "title"])) : Ts("v-if", !0)
				]),
				_: 1
			});
		};
	}
}), xE = { class: "sol-stack" }, SE = {
	id: "recipe-combobox-result",
	role: "status"
}, CE = { class: "sol-actions" }, wE = /* @__PURE__ */ H({
	__name: "combobox",
	setup(e) {
		let t = /* @__PURE__ */ F(null), n = /* @__PURE__ */ F(null), r = /* @__PURE__ */ F(null), i = /* @__PURE__ */ F(null), a = /* @__PURE__ */ F(null), o = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(!1), l = [
			{
				value: "option-alpha",
				label: "Alpha",
				description: "표시 문자열과 옵션 ID를 구분합니다."
			},
			{
				value: "option-blocked",
				label: "선택할 수 없는 후보",
				disabled: !0
			},
			{
				value: "option-beta",
				label: "Beta"
			},
			{
				value: "option-long",
				label: "여러 줄 전체 내용에서 확인할 수 있는 아주 긴 후보 이름 ".repeat(6),
				description: "후보 아래의 전체 내용 펼치기는 키보드와 터치로 사용할 수 있습니다."
			}
		], u = (e, t) => new Promise((n, r) => {
			if (t.aborted) {
				r(/* @__PURE__ */ Error("aborted"));
				return;
			}
			let i = () => {
				clearTimeout(a), r(/* @__PURE__ */ Error("aborted"));
			}, a = setTimeout(() => {
				t.removeEventListener("abort", i), c.value ? r(/* @__PURE__ */ Error("가상 목록 실패")) : n(l.filter((t) => t.label.toLowerCase().includes(e.toLowerCase())));
			}, 180);
			t.addEventListener("abort", i, { once: !0 });
		});
		return (e, d) => {
			let f = U("SIcon"), p = U("SCombobox"), m = U("SBtn"), h = U("SCheckbox"), g = U("SCard");
			return W(), G(g, {
				title: "자유 입력과 후보 선택",
				"heading-level": 2
			}, {
				default: B(() => [K("div", xE, [
					q(p, {
						id: "recipe-combobox",
						ref_key: "combo",
						ref: a,
						modelValue: L(t),
						"onUpdate:modelValue": d[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "문자열 또는 후보",
						options: l,
						clearable: "",
						readonly: L(o),
						disabled: L(s),
						help: "Enter는 직접 입력을 확정합니다. 방향키로 후보를 탐색한 뒤 Enter를 누르면 선택합니다. Escape는 편집을 취소합니다.",
						onChange: d[1] ||= (e) => i.value = e
					}, {
						leading: B(() => [q(f, {
							name: "edit",
							decorative: "",
							size: 16
						})]),
						_: 1
					}, 8, [
						"modelValue",
						"readonly",
						"disabled"
					]),
					K("p", SE, " 확정값: " + N(L(t) ?? "없음") + " · reason: " + N(L(i)?.reason ?? "없음") + " · option ID: " + N(L(i)?.reason === "select" ? L(i).option.value : "없음"), 1),
					K("div", CE, [q(m, { onClick: d[2] ||= (e) => L(a)?.clear() }, {
						default: B(() => [...d[9] ||= [J("메서드로 지우기", -1)]]),
						_: 1
					}), q(m, { onClick: d[3] ||= (e) => L(a)?.focus() }, {
						default: B(() => [...d[10] ||= [J("초점 이동", -1)]]),
						_: 1
					})]),
					q(h, {
						id: "recipe-combobox-readonly",
						modelValue: L(o),
						"onUpdate:modelValue": d[4] ||= (e) => /* @__PURE__ */ P(o) ? o.value = e : null,
						label: "보기 전용"
					}, null, 8, ["modelValue"]),
					q(h, {
						id: "recipe-combobox-disabled",
						modelValue: L(s),
						"onUpdate:modelValue": d[5] ||= (e) => /* @__PURE__ */ P(s) ? s.value = e : null,
						label: "비활성"
					}, null, 8, ["modelValue"]),
					q(p, {
						id: "recipe-combobox-blur",
						modelValue: L(n),
						"onUpdate:modelValue": d[6] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						label: "blur 확정 사용",
						options: l,
						"commit-on": ["enter", "blur"],
						"open-on-focus": !1,
						clearable: "",
						help: "입력 영역 밖으로 초점이 나가면 직접 입력을 확정합니다. 내부 X·목록·전체 내용 탐색은 확정하지 않습니다."
					}, null, 8, ["modelValue"]),
					q(p, {
						id: "recipe-combobox-async",
						modelValue: L(r),
						"onUpdate:modelValue": d[7] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
						label: "비동기 후보",
						"load-options": u,
						debounce: 150,
						clearable: "",
						help: "로컬 타이머를 사용한 가상 목록입니다. 서버 요청이나 저장은 하지 않습니다."
					}, null, 8, ["modelValue"]),
					q(h, {
						id: "recipe-combobox-fail",
						modelValue: L(c),
						"onUpdate:modelValue": d[8] ||= (e) => /* @__PURE__ */ P(c) ? c.value = e : null,
						label: "다음 목록 요청 실패"
					}, null, 8, ["modelValue"])
				])]),
				_: 1
			});
		};
	}
}), TE = { class: "sol-actions sol-actions--commit" }, EE = { class: "sol-hint" }, DE = /* @__PURE__ */ H({
	__name: "confirm-action",
	setup(e) {
		let t = Nx(), n = /* @__PURE__ */ F(!1), r = Y(() => t.value.code === "en-US"), i = /* @__PURE__ */ F(null);
		async function a() {
			n.value = !0, await z(), i.value?.focus();
		}
		return (e, t) => {
			let o = U("SConfirmAction"), s = U("SCard");
			return W(), G(s, {
				"heading-level": 2,
				title: L(r) ? "Confirm before removing" : "두 번 눌러 제거 확인"
			}, {
				default: B(() => [
					K("p", null, N(L(r) ? "The first press asks for confirmation. The second removes this fictional draft." : "한 번 누르면 확인 문구로 바뀌고, 한 번 더 누르면 이 화면의 가상 초안이 제거됩니다."), 1),
					K("div", TE, [q(o, {
						label: L(r) ? "Disabled action" : "비활성 동작",
						"confirm-label": L(r) ? "Confirm" : "확인",
						disabled: ""
					}, null, 8, ["label", "confirm-label"]), q(o, {
						label: L(r) ? "Remove draft" : "초안 제거",
						"confirm-label": L(r) ? "Press again to remove" : "한 번 더 눌러 제거",
						tone: "danger",
						disabled: L(n),
						onConfirm: a
					}, null, 8, [
						"label",
						"confirm-label",
						"disabled"
					])]),
					K("p", {
						id: "recipe-confirm-action-result",
						ref_key: "removalResult",
						ref: i,
						role: "status",
						tabindex: "-1"
					}, N(L(n) ? L(r) ? "The fictional draft was removed." : "가상 초안을 제거했습니다." : L(r) ? "The draft is still here." : "초안이 남아 있습니다."), 513),
					K("p", EE, N(L(r) ? "Escape, moving focus away or waiting cancels the confirmation." : "Escape, 다른 곳으로 초점 이동 또는 시간이 지나면 확인 상태가 취소됩니다."), 1)
				]),
				_: 1
			}, 8, ["title"]);
		};
	}
}), OE = { class: "sol-actions" }, kE = /* @__PURE__ */ H({
	__name: "chip",
	setup(e) {
		let t = Nx(), n = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1), i = Y(() => t.value.code === "en-US"), a = /* @__PURE__ */ F(null);
		async function o() {
			r.value = !0, await z(), a.value?.focus();
		}
		return (e, t) => {
			let s = U("SChip"), c = U("SCard");
			return W(), G(c, {
				"heading-level": 2,
				title: L(i) ? "Chip labels and selection" : "칩 표시·선택·제거"
			}, {
				default: B(() => [K("div", OE, [
					q(s, { label: L(i) ? "Display label" : "표시용 라벨" }, null, 8, ["label"]),
					q(s, {
						selected: L(n),
						"onUpdate:selected": t[0] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						selectable: "",
						label: L(i) ? "Select review" : "검토 선택",
						tone: "info"
					}, null, 8, ["selected", "label"]),
					L(r) ? Ts("v-if", !0) : (W(), G(s, {
						key: 0,
						removable: "",
						label: L(i) ? "Remove this label" : "이 라벨 제거",
						onRemove: o
					}, null, 8, ["label"])),
					q(s, {
						disabled: "",
						selectable: "",
						label: L(i) ? "Disabled selection" : "비활성 선택"
					}, null, 8, ["label"])
				]), K("p", {
					id: "recipe-chip-result",
					ref_key: "removalResult",
					ref: a,
					role: "status",
					tabindex: "-1"
				}, N(L(i) ? "Review selected: " : "검토 선택: ") + N(L(n) ? L(i) ? "yes" : "선택됨" : L(i) ? "no" : "선택 안 됨") + " · " + N(L(r) ? L(i) ? "Label removed" : "라벨 제거됨" : L(i) ? "Label retained" : "라벨 유지"), 513)]),
				_: 1
			}, 8, ["title"]);
		};
	}
}), AE = { class: "sol-actions" }, jE = /* @__PURE__ */ H({
	__name: "badge",
	setup(e) {
		let t = Nx(), n = Y(() => t.value.code === "en-US");
		return (e, t) => {
			let r = U("SBadge"), i = U("SCard");
			return W(), G(i, {
				"heading-level": 2,
				title: L(n) ? "Badge status indicators" : "배지로 상태 표시"
			}, {
				default: B(() => [K("p", null, N(L(n) ? "Badges describe a status; they are not action buttons." : "배지는 상태를 설명하는 표시이며 누르는 버튼이 아닙니다."), 1), K("div", AE, [
					q(r, {
						tone: "success",
						content: L(n) ? "Complete" : "완료"
					}, null, 8, ["content"]),
					q(r, {
						tone: "warning",
						variant: "outlined",
						content: L(n) ? "Needs review" : "확인 필요"
					}, null, 8, ["content"]),
					q(r, {
						tone: "danger",
						variant: "filled",
						content: L(n) ? "Error" : "오류"
					}, null, 8, ["content"]),
					q(r, { content: L(n) ? "New" : "새 항목" }, null, 8, ["content"])
				])]),
				_: 1
			}, 8, ["title"]);
		};
	}
}), ME = { class: "sol-actions" }, NE = { class: "sol-hint" }, PE = /* @__PURE__ */ H({
	__name: "icon",
	setup(e) {
		let t = Nx(), n = Y(() => t.value.code === "en-US");
		return (e, t) => {
			let r = U("SIcon"), i = U("SCard");
			return W(), G(i, {
				"heading-level": 2,
				title: L(n) ? "Icons with and without text" : "아이콘과 설명"
			}, {
				default: B(() => [K("div", ME, [
					q(r, {
						name: "info",
						label: L(n) ? "Information" : "정보"
					}, null, 8, ["label"]),
					K("span", null, [q(r, {
						name: "calendar",
						decorative: ""
					}), J(" " + N(L(n) ? "Calendar" : "달력"), 1)]),
					K("span", null, [q(r, {
						name: "folder",
						decorative: ""
					}), J(" " + N(L(n) ? "Folder" : "폴더"), 1)]),
					q(r, {
						name: "chevron",
						rotate: 270,
						label: L(n) ? "Next direction" : "다음 방향"
					}, null, 8, ["label"])
				]), K("p", NE, N(L(n) ? "Decorative icons beside visible text are hidden from assistive technology. An icon alone needs a label." : "옆에 설명이 있는 장식 아이콘은 중복 낭독하지 않습니다. 아이콘만 표시할 때는 label로 의미를 전달합니다."), 1)]),
				_: 1
			}, 8, ["title"]);
		};
	}
}), FE = { class: "sol-actions" }, IE = { role: "status" }, LE = /* @__PURE__ */ H({
	__name: "icon-button",
	setup(e) {
		let t = Nx(), n = Y(() => t.value.code === "en-US"), r = /* @__PURE__ */ F(!1), i = /* @__PURE__ */ F(!1), a;
		function o() {
			r.value || (r.value = !0, i.value = !1, a = setTimeout(() => {
				r.value = !1, i.value = !0;
			}, 700));
		}
		return Qi(() => clearTimeout(a)), (e, t) => {
			let a = U("SIconBtn"), s = U("SCard");
			return W(), G(s, {
				"heading-level": 2,
				title: L(n) ? "Icon-only actions" : "아이콘 버튼 동작"
			}, {
				default: B(() => [
					K("p", null, N(L(n) ? "Save performs a fictional local task. Delete demonstrates a disabled action." : "저장 아이콘은 가상 로컬 작업을 실행하고, 삭제 아이콘은 비활성 상태를 보여줍니다."), 1),
					K("div", FE, [q(a, {
						icon: "save",
						label: L(n) ? "Save example" : "예제 저장",
						title: L(n) ? "Save example" : "예제 저장",
						loading: L(r),
						onClick: o
					}, null, 8, [
						"label",
						"title",
						"loading"
					]), q(a, {
						icon: "trash",
						label: L(n) ? "Delete (unavailable)" : "삭제 (사용 불가)",
						title: L(n) ? "Delete (unavailable)" : "삭제 (사용 불가)",
						tone: "danger",
						disabled: ""
					}, null, 8, ["label", "title"])]),
					K("p", IE, N(L(r) ? L(n) ? "Saving…" : "저장 중…" : L(i) ? L(n) ? "The fictional task finished." : "가상 저장을 완료했습니다." : L(n) ? "Ready to save." : "저장할 수 있습니다."), 1)
				]),
				_: 1
			}, 8, ["title"]);
		};
	}
}), RE = { role: "status" }, zE = /* @__PURE__ */ H({
	__name: "checkbox",
	setup(e) {
		let t = /* @__PURE__ */ F(!0), n = /* @__PURE__ */ F(!1);
		return (e, r) => {
			let i = U("SCheckbox"), a = U("SCard");
			return W(), G(a, {
				"heading-level": 2,
				title: "독립된 항목 선택 · Checkbox"
			}, {
				default: B(() => [
					r[2] ||= K("p", null, "각 항목을 따로 선택합니다. 하나를 선택해도 다른 항목의 선택은 바뀌지 않습니다.", -1),
					q(i, {
						id: "recipe-checkbox-include",
						modelValue: L(t),
						"onUpdate:modelValue": r[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "완료한 항목 포함"
					}, null, 8, ["modelValue"]),
					q(i, {
						id: "recipe-checkbox-archived",
						modelValue: L(n),
						"onUpdate:modelValue": r[1] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						label: "보관한 항목 포함"
					}, null, 8, ["modelValue"]),
					q(i, {
						id: "recipe-checkbox-disabled",
						label: "선택할 수 없는 항목",
						disabled: ""
					}),
					K("p", RE, " 완료 " + N(L(t) ? "포함" : "제외") + " · 보관 " + N(L(n) ? "포함" : "제외"), 1)
				]),
				_: 1
			});
		};
	}
}), BE = { role: "status" }, VE = /* @__PURE__ */ H({
	__name: "radio-group",
	setup(e) {
		let t = /* @__PURE__ */ F("brief"), n = [
			{
				value: "brief",
				label: "간단히"
			},
			{
				value: "full",
				label: "자세히"
			},
			{
				value: "reserved",
				label: "준비 중인 표시",
				disabled: !0
			}
		];
		return (e, r) => {
			let i = U("SRadioGroup"), a = U("SCard");
			return W(), G(a, {
				"heading-level": 2,
				title: "서로 배타적인 한 가지 선택 · Radio Group"
			}, {
				default: B(() => [
					r[1] ||= K("p", null, "같은 그룹에서는 하나만 선택합니다. 방향키로 선택을 옮길 수 있습니다.", -1),
					q(i, {
						id: "recipe-radio-choice",
						modelValue: L(t),
						"onUpdate:modelValue": r[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "표시 방법",
						options: n,
						required: ""
					}, null, 8, ["modelValue"]),
					K("p", BE, "선택한 표시: " + N(L(t) === "brief" ? "간단히" : "자세히"), 1)
				]),
				_: 1
			});
		};
	}
}), HE = { class: "sol-actions" }, UE = { role: "status" }, WE = /* @__PURE__ */ H({
	__name: "switch",
	setup(e) {
		let t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1);
		return (e, i) => {
			let a = U("SCheckbox"), o = U("SSwitch"), s = U("SCard");
			return W(), G(s, {
				"heading-level": 2,
				title: "선택과 즉시 설정의 차이 · Switch"
			}, {
				default: B(() => [
					i[4] ||= K("p", null, " 체크박스는 항목의 선택을 확인하고, 스위치는 설정을 즉시 켜거나 끕니다. 모양을 합쳐도 같은 의미가 되지는 않습니다. ", -1),
					q(a, {
						id: "recipe-switch-choice",
						modelValue: L(t),
						"onUpdate:modelValue": i[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "확인 후 적용할 항목 선택 · Checkbox"
					}, null, 8, ["modelValue"]),
					q(o, {
						id: "recipe-switch-enabled",
						modelValue: L(n),
						"onUpdate:modelValue": i[1] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
						label: "즉시 알림 켜기 · Switch"
					}, null, 8, ["modelValue"]),
					K("div", HE, [i[3] ||= K("label", {
						id: "recipe-switch-external-label",
						for: "recipe-switch-external"
					}, "외부 라벨을 쓰는 설정", -1), q(o, {
						id: "recipe-switch-external",
						modelValue: L(r),
						"onUpdate:modelValue": i[2] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
						label: "외부 라벨을 쓰는 설정",
						"hide-label": "",
						"aria-labelledby": "recipe-switch-external-label"
					}, null, 8, ["modelValue"])]),
					K("p", UE, " 항목 " + N(L(t) ? "선택" : "미선택") + " · 알림 " + N(L(n) ? "켜짐" : "꺼짐") + " · 외부 설정 " + N(L(r) ? "켜짐" : "꺼짐"), 1)
				]),
				_: 1
			});
		};
	}
}), GE = { role: "status" }, KE = /* @__PURE__ */ H({
	__name: "select",
	setup(e) {
		let t = /* @__PURE__ */ F("recent");
		return (e, n) => {
			let r = U("SSelect"), i = U("SCard");
			return W(), G(i, {
				"heading-level": 2,
				title: "목록에서 한 가지 선택 · Select"
			}, {
				default: B(() => [q(r, {
					id: "recipe-owned-select",
					modelValue: L(t),
					"onUpdate:modelValue": n[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
					label: "정렬 기준",
					clearable: "",
					options: [
						{
							value: "recent",
							label: "최근 수정순"
						},
						{
							value: "name",
							label: "이름순"
						},
						{
							value: "reserved",
							label: "준비 중인 기준",
							disabled: !0
						}
					]
				}, null, 8, ["modelValue"]), K("p", GE, "선택값: " + N(L(t) ?? "없음"), 1)]),
				_: 1
			});
		};
	}
}), qE = { class: "sol-actions" }, JE = /* @__PURE__ */ H({
	__name: "breadcrumbs",
	setup(e) {
		let t = /* @__PURE__ */ F("detail"), n = /* @__PURE__ */ F(null), r = [
			{
				id: "home",
				label: "기록함"
			},
			{
				id: "list",
				label: "기록 목록"
			},
			{
				id: "detail",
				label: "항목 상세"
			}
		], i = Y(() => r.slice(0, t.value === "home" ? 1 : t.value === "list" ? 2 : 3));
		function a(e) {
			t.value = e, z(() => n.value?.focus());
		}
		function o(e) {
			(e.id === "home" || e.id === "list" || e.id === "detail") && a(e.id);
		}
		return (e, t) => {
			let r = U("SBreadcrumbs"), s = U("SBtn"), c = U("SCard");
			return W(), G(c, {
				"heading-level": 2,
				title: "현재 위치와 상위 경로 · Breadcrumbs"
			}, {
				default: B(() => [
					t[4] ||= K("p", null, "상위 위치를 누르면 예제의 현재 위치가 바뀝니다.", -1),
					q(r, {
						label: "예제 경로",
						items: L(i),
						onNavigate: o
					}, null, 8, ["items"]),
					K("h3", {
						id: "recipe-breadcrumb-view",
						ref_key: "title",
						ref: n,
						tabindex: "-1"
					}, N(L(i)[L(i).length - 1].label), 513),
					K("div", qE, [q(s, { onClick: t[0] ||= (e) => a("list") }, {
						default: B(() => [...t[2] ||= [J("목록 보기", -1)]]),
						_: 1
					}), q(s, { onClick: t[1] ||= (e) => a("detail") }, {
						default: B(() => [...t[3] ||= [J("상세 보기", -1)]]),
						_: 1
					})])
				]),
				_: 1
			});
		};
	}
}), YE = { class: "sol-stack" }, XE = { role: "status" }, ZE = /* @__PURE__ */ H({
	__name: "pagination",
	setup(e) {
		let t = /* @__PURE__ */ F(1), n = /* @__PURE__ */ F(20), r = /* @__PURE__ */ F(3), i = /* @__PURE__ */ F(!0), a = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F(null);
		function s(e) {
			o.value = e, i.value && (t.value = e);
		}
		function c() {
			n.value = 1003, t.value = 500, o.value = null;
		}
		return V(n, (e) => {
			t.value = Math.max(1, Math.min(t.value, Math.max(1, e ?? 0)));
		}), (e, l) => {
			let u = U("SNumberInput"), d = U("SCheckbox"), f = U("SBtn"), p = U("SPagination"), m = U("SCard");
			return W(), G(m, {
				"heading-level": 2,
				title: "부모가 수락하는 페이지 이동 · Pagination"
			}, {
				default: B(() => [
					K("fieldset", YE, [
						l[5] ||= K("legend", null, "예제 설정", -1),
						q(u, {
							id: "recipe-pagination-count",
							modelValue: L(n),
							"onUpdate:modelValue": l[0] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
							label: "페이지 수",
							min: 0,
							step: 1
						}, null, 8, ["modelValue"]),
						q(u, {
							id: "recipe-pagination-siblings",
							modelValue: L(r),
							"onUpdate:modelValue": l[1] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
							label: "현재 페이지 양옆의 번호 수",
							min: 0,
							max: 5,
							step: 1
						}, null, 8, ["modelValue"]),
						q(d, {
							id: "recipe-pagination-accept",
							modelValue: L(i),
							"onUpdate:modelValue": l[2] ||= (e) => /* @__PURE__ */ P(i) ? i.value = e : null,
							label: "이동 제안을 부모가 반영"
						}, null, 8, ["modelValue"]),
						q(d, {
							id: "recipe-pagination-compact",
							modelValue: L(a),
							"onUpdate:modelValue": l[3] ||= (e) => /* @__PURE__ */ P(a) ? a.value = e : null,
							label: "주변 번호를 접어서 표시"
						}, null, 8, ["modelValue"]),
						q(f, {
							id: "recipe-pagination-many",
							onClick: c
						}, {
							default: B(() => [...l[4] ||= [J("1003페이지 중 500페이지 보기", -1)]]),
							_: 1
						})
					]),
					q(p, {
						"model-value": L(t),
						"page-count": L(n) ?? 0,
						"sibling-count": L(r) ?? 1,
						"compact-pagination": L(a),
						label: "예제 페이지",
						"onUpdate:modelValue": s
					}, null, 8, [
						"model-value",
						"page-count",
						"sibling-count",
						"compact-pagination"
					]),
					K("p", XE, "부모 페이지 " + N(L(t)) + " · 최근 제안 " + N(L(o) ?? "아직 없음"), 1)
				]),
				_: 1
			});
		};
	}
}), QE = {};
function $E(e, t) {
	let n = U("SIconBtn"), r = U("STooltip"), i = U("SCard");
	return W(), G(i, {
		"heading-level": 2,
		title: "짧은 비대화형 설명 · Tooltip"
	}, {
		default: B(() => [
			t[0] ||= K("p", null, "아이콘에 포인터를 올리거나 키보드로 초점을 두면 짧은 설명을 보여줍니다.", -1),
			q(r, {
				id: "recipe-owned-tooltip",
				label: "정렬 도움말",
				text: "최근 변경한 항목부터 표시합니다."
			}, {
				activator: B(({ props: e }) => [q(n, ks(e, {
					icon: "info",
					label: "정렬 도움말",
					variant: "subtle"
				}), null, 16)]),
				_: 1
			}),
			t[1] ||= K("p", { class: "sol-hint" }, "설명 안에는 링크나 입력을 넣지 않습니다. Escape로 닫을 수 있습니다.", -1)
		]),
		_: 1
	});
}
var eD = /*#__PURE__*/ ET(QE, [["render", $E]]), tD = { role: "status" }, nD = /* @__PURE__ */ H({
	__name: "popover",
	setup(e) {
		let t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(!1);
		return (e, r) => {
			let i = U("SIcon"), a = U("SBtn"), o = U("SPopover"), s = U("SCard");
			return W(), G(s, {
				"heading-level": 2,
				title: "클릭해 여는 대화형 추가 정보 · Popover"
			}, {
				default: B(() => [
					r[5] ||= K("p", null, "버튼을 누르면 내용과 닫기·확인 동작이 있는 작은 창을 엽니다.", -1),
					q(o, {
						id: "recipe-owned-popover",
						modelValue: L(t),
						"onUpdate:modelValue": r[1] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
						label: "추가 정보 펼치기",
						title: "표시 순서 안내"
					}, {
						activator: B(({ props: e }) => [q(a, _e(Ss(e)), {
							default: B(() => [r[2] ||= J("추가 정보 ", -1), q(i, {
								name: "chevron",
								decorative: "",
								size: 16
							})]),
							_: 1
						}, 16)]),
						actions: B(() => [q(a, {
							variant: "primary",
							onClick: r[0] ||= (e) => {
								n.value = !0, t.value = !1;
							}
						}, {
							default: B(() => [...r[3] ||= [J("안내 확인", -1)]]),
							_: 1
						})]),
						default: B(() => [r[4] ||= K("p", null, " 현재 화면의 항목은 최근 변경 순서로 표시합니다. 설명을 확인해도 자료는 변경되지 않습니다. ", -1)]),
						_: 1
					}, 8, ["modelValue"]),
					K("p", tD, N(L(n) ? "안내를 확인했습니다." : "아직 안내를 확인하지 않았습니다."), 1),
					r[6] ||= K("p", { class: "sol-hint" }, " Tooltip과 달리 클릭으로 열고 안의 버튼을 조작합니다. Escape·바깥 클릭으로 닫습니다. ", -1)
				]),
				_: 1
			});
		};
	}
}), rD = {}, iD = { class: "sol-actions" };
function aD(e, t) {
	let n = U("SAvatar"), r = U("SCard");
	return W(), G(r, {
		"heading-level": 2,
		title: "사용자를 나타내는 이미지 자리 · Avatar"
	}, {
		default: B(() => [
			t[1] ||= K("p", null, " 동그라미 안의 ‘민’은 이미지가 없을 때 사용하는 대체 글자입니다. Avatar 자체는 메뉴 버튼이 아닙니다. ", -1),
			K("div", iD, [q(n, {
				label: "가상 사용자 민하",
				initials: "민",
				size: 48
			}), t[0] ||= K("span", null, "민하 · 가상 사용자", -1)]),
			t[2] ||= K("p", { class: "sol-hint" }, " 접근성 이름은 label로 제공합니다. 사용자 메뉴가 필요하면 소비 화면에서 별도 버튼을 조합합니다. ", -1)
		]),
		_: 1
	});
}
// src/recipe-registry.ts
var oD = {
	"color-examples": Bw,
	writing: Hw,
	buttons: Gw,
	fields: Yw,
	choices: Zw,
	feedback: Qw,
	dialog: tT,
	selection: iT,
	help: oT,
	accordion: lT,
	navigation: fT,
	"advanced-inputs": _T,
	"content-tabs": vT,
	"action-menu": bT,
	"identity-progress": DT,
	progress: kT,
	"progress-circular": AT,
	time: PT,
	"chart-tree": LT,
	form: BT,
	search: UT,
	compare: GT,
	empty: qT,
	data: JT,
	inputs: $T,
	responses: eE,
	composition: iE,
	layouts: dE,
	workflow: mE,
	"error-summary": vE,
	"bulk-recovery": bE,
	combobox: wE,
	"confirm-action": DE,
	chip: kE,
	badge: jE,
	icon: PE,
	"icon-button": LE,
	checkbox: zE,
	"radio-group": VE,
	switch: WE,
	select: KE,
	breadcrumbs: JE,
	pagination: ZE,
	tooltip: eD,
	popover: nD,
	avatar: /* @__PURE__ */ ET(rD, [["render", aD]]),
	chart: /* @__PURE__ */ H({
		__name: "chart",
		setup(e) {
			let t = /* @__PURE__ */ F("bar"), n = /* @__PURE__ */ F(!0), r = /* @__PURE__ */ F("normal"), i = Y(() => t.value === "line" || t.value === "pie" ? t.value : "bar"), a = Y(() => r.value === "empty" ? [] : [
				"월요일",
				"화요일",
				"수요일",
				"목요일"
			].map((e, t) => ({
				id: String(t),
				label: e,
				value: r.value === "zero" ? 0 : [
					2,
					4,
					0,
					5
				][t]
			})));
			return (e, o) => {
				let s = U("SRadioGroup"), c = U("SSelect"), l = U("SCheckbox"), u = U("SBarChart"), d = U("SCard");
				return W(), G(d, {
					"heading-level": 2,
					title: "같은 자료를 세 방식으로 보는 Chart"
				}, {
					default: B(() => [
						o[3] ||= K("p", null, " 막대는 항목별 크기, 선은 순서에 따른 변화, 원형은 전체에서 차지하는 비율을 보여줍니다. 실제 API 이름 SBarChart와 기존 막대 기본값을 유지합니다. ", -1),
						q(s, {
							id: "recipe-chart-type",
							modelValue: L(t),
							"onUpdate:modelValue": o[0] ||= (e) => /* @__PURE__ */ P(t) ? t.value = e : null,
							label: "차트 유형",
							options: [
								{
									value: "bar",
									label: "막대 · Bar"
								},
								{
									value: "line",
									label: "선 · Line"
								},
								{
									value: "pie",
									label: "원형 · Pie"
								}
							]
						}, null, 8, ["modelValue"]),
						q(c, {
							id: "recipe-chart-data",
							modelValue: L(r),
							"onUpdate:modelValue": o[1] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
							label: "예제 자료",
							options: [
								{
									value: "normal",
									label: "자료 있음"
								},
								{
									value: "zero",
									label: "모두 0"
								},
								{
									value: "empty",
									label: "자료 없음"
								},
								{
									value: "loading",
									label: "불러오는 중"
								}
							]
						}, null, 8, ["modelValue"]),
						q(l, {
							id: "recipe-chart-table",
							modelValue: L(n),
							"onUpdate:modelValue": o[2] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
							label: "같은 자료의 표 표시"
						}, null, 8, ["modelValue"]),
						q(u, {
							id: "recipe-owned-chart",
							label: "가상 활동 횟수",
							type: L(i),
							items: L(a),
							"show-table": L(n),
							loading: L(r) === "loading",
							"category-label": "요일",
							"value-label": "기록 수"
						}, null, 8, [
							"type",
							"items",
							"show-table",
							"loading"
						]),
						o[4] ||= K("p", { class: "sol-hint" }, " 외부 데이터를 호출하지 않는 가상 자료입니다. 색에만 의존하지 않도록 원형 조각 번호·범례와 같은 값의 텍스트 표를 제공합니다. ", -1)
					]),
					_: 1
				});
			};
		}
	}),
	"button-group": /* @__PURE__ */ H({
		__name: "button-group",
		setup(e) {
			let t = "Hello solyi", n = /* @__PURE__ */ F(t), r = /* @__PURE__ */ F("start"), i = /* @__PURE__ */ F("horizontal"), a = ai("textControl");
			function o() {
				n.value = t, z(() => a.value?.focus());
			}
			return (e, s) => {
				let c = U("STextarea"), l = U("SSelect"), u = U("SBtn"), d = U("SBtnGroup"), f = U("SSegmentedControl"), p = U("SCard");
				return W(), G(p, {
					"heading-level": 2,
					title: "연결된 명령 버튼과 선택 토글"
				}, {
					default: B(() => [
						q(c, {
							id: "recipe-group-text",
							ref_key: "textControl",
							ref: a,
							modelValue: L(n),
							"onUpdate:modelValue": s[0] ||= (e) => /* @__PURE__ */ P(n) ? n.value = e : null,
							label: "메모리 안의 예제 문구"
						}, null, 8, ["modelValue"]),
						q(l, {
							id: "recipe-group-orientation",
							modelValue: L(i),
							"onUpdate:modelValue": s[1] ||= (e) => /* @__PURE__ */ P(i) ? i.value = e : null,
							label: "버튼 묶음 방향",
							options: [{
								value: "horizontal",
								label: "가로 · 공간이 부족하면 묶음만 스크롤"
							}, {
								value: "vertical",
								label: "세로"
							}]
						}, null, 8, ["modelValue"]),
						s[8] ||= K("h3", null, "각각 실행하는 명령 · SBtnGroup", -1),
						q(d, {
							label: "문구 바꾸기",
							orientation: L(i) === "vertical" ? "vertical" : "horizontal"
						}, {
							default: B(() => [
								q(u, {
									disabled: !L(n),
									onClick: s[2] ||= (e) => n.value = L(n).toUpperCase()
								}, {
									default: B(() => [...s[5] ||= [J("대문자로", -1)]]),
									_: 1
								}, 8, ["disabled"]),
								q(u, {
									disabled: !L(n),
									onClick: s[3] ||= (e) => n.value = L(n).toLowerCase()
								}, {
									default: B(() => [...s[6] ||= [J("소문자로", -1)]]),
									_: 1
								}, 8, ["disabled"]),
								q(u, {
									disabled: L(n) === t,
									onClick: o
								}, {
									default: B(() => [...s[7] ||= [J("원문 복원", -1)]]),
									_: 1
								}, 8, ["disabled"])
							]),
							_: 1
						}, 8, ["orientation"]),
						s[9] ||= K("h3", null, "하나를 선택해 유지하는 토글 · SSegmentedControl", -1),
						q(f, {
							id: "recipe-group-align",
							modelValue: L(r),
							"onUpdate:modelValue": s[4] ||= (e) => /* @__PURE__ */ P(r) ? r.value = e : null,
							label: "미리보기 정렬",
							options: [
								{
									value: "start",
									label: "시작"
								},
								{
									value: "center",
									label: "가운데"
								},
								{
									value: "end",
									label: "끝"
								}
							]
						}, null, 8, ["modelValue"]),
						K("p", {
							style: de({ textAlign: L(r) === "center" ? "center" : L(r) === "end" ? "end" : "start" }),
							role: "status"
						}, N(L(n)), 5),
						s[10] ||= K("p", { class: "sol-hint" }, " 명령 묶음의 각 버튼은 자연스러운 Tab 순서와 자체 disabled/loading 상태를 유지합니다. 단일 선택은 기존 SegmentedControl의 방향키·라디오 의미를 재사용합니다. ", -1)
					]),
					_: 1
				});
			};
		}
	})
}, sD = ["aria-labelledby"], cD = { class: "starter-settings starter-demo-settings" }, lD = {
	class: "starter-result",
	role: "status"
}, uD = ["aria-labelledby"], dD = {
	key: 0,
	class: "starter-settings starter-demo-settings"
}, fD = { class: "starter-hint" }, pD = ["aria-labelledby"], mD = {
	key: 0,
	class: "starter-settings starter-demo-settings"
}, hD = { class: "starter-control-grid" }, gD = ["aria-labelledby"], _D = {
	key: 0,
	class: "starter-settings starter-demo-settings"
}, vD = {
	class: "starter-result",
	role: "status"
}, yD = ["aria-labelledby"], bD = {
	key: 0,
	class: "starter-settings starter-demo-settings"
}, xD = {
	class: "starter-hint",
	role: "status"
}, SD = ["aria-labelledby"], CD = { class: "starter-settings" }, wD = { role: "status" }, TD = { class: "starter-hint" }, ED = ["aria-labelledby"], DD = { class: "starter-settings" }, OD = ["id"], kD = ["aria-labelledby"], AD = { class: "starter-settings" }, jD = { class: "starter-settings" }, MD = ["id"], ND = {
	__name: "AdvancedExamples",
	props: {
		part: {
			type: String,
			default: ""
		},
		headingLevel: {
			type: Number,
			default: 2
		},
		idPrefix: {
			type: String,
			default: ""
		}
	},
	setup(e) {
		let t = e, n = (e) => t.idPrefix ? t.idPrefix + "-" + e : e, r = Y(() => [
			2,
			3,
			4,
			5,
			6
		].includes(t.headingLevel) ? "h" + t.headingLevel : "h2"), i = [
			"segmented",
			"multiselect",
			"range",
			"split-button",
			"context-menu",
			"split-pane",
			"sortable",
			"month-calendar",
			"time-grid"
		], a = Y(() => i.includes(t.part) ? t.part : ""), o = (...e) => !a.value || e.includes(a.value), s = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(!1), l = /* @__PURE__ */ F("brief"), u = /* @__PURE__ */ F(["garden"]), d = /* @__PURE__ */ F("local"), f = /* @__PURE__ */ F(0), p = [
			{
				value: "garden",
				label: "정원"
			},
			{
				value: "book",
				label: "책장"
			},
			{
				value: "walk",
				label: "산책"
			},
			{
				value: "season",
				label: "계절 관찰"
			},
			{
				value: "locked",
				label: "보관 · 선택 불가",
				disabled: !0
			}
		], m = Y(() => {
			let e = d.value;
			if (e !== "local") return async (t, n) => {
				let r = ++f.value;
				if (await new Promise((e, r) => {
					let i = setTimeout(() => {
						n.removeEventListener("abort", a), e();
					}, t.includes("느림") ? 600 : 180), a = () => {
						clearTimeout(i), r(new DOMException("Cancelled", "AbortError"));
					};
					n.addEventListener("abort", a, { once: !0 }), n.aborted && a();
				}), e === "retry" && r === 1) throw Error("가상 실패");
				return p.filter((e) => e.label.includes(t.trim()));
			};
		});
		V(d, () => f.value = 0);
		let h = /* @__PURE__ */ F([20, 80]), g = /* @__PURE__ */ F("아직 실행하지 않았어요."), _ = /* @__PURE__ */ F(0), v = /* @__PURE__ */ F(!1), y = [
			{
				id: "json",
				label: "JSON으로 내보내기 · 가상"
			},
			{
				id: "csv",
				label: "CSV로 내보내기 · 가상"
			},
			{
				id: "blocked",
				label: "예약 · 비활성",
				disabled: !0
			}
		], b = [
			{
				id: "pin",
				label: "자료 고정 · 가상"
			},
			{
				id: "copy",
				label: "복제 · 가상"
			},
			{
				id: "archive",
				label: "보관 · 비활성",
				disabled: !0
			}
		];
		function x(e) {
			g.value = "✓ " + [...y, ...b].find((t) => t.id === e)?.label + " 동작을 확인했습니다. 외부 작업은 없습니다.";
		}
		let S = /* @__PURE__ */ F(40), C = /* @__PURE__ */ F("horizontal"), w = /* @__PURE__ */ F("화면 폭을 바꾸어도 이 가상 메모는 유지됩니다."), T = /* @__PURE__ */ F(!1), E = /* @__PURE__ */ F(""), D = /* @__PURE__ */ F([
			{
				id: "a",
				label: "첫 번째 항목",
				details: { count: 4 }
			},
			{
				id: "b",
				label: "긴 텍스트를 가진 두 번째 항목도 줄바꿈합니다",
				details: { count: 7 }
			},
			{
				id: "c",
				label: "세 번째 항목",
				details: { count: 2 }
			}
		]), O = /* @__PURE__ */ F(!0), k = /* @__PURE__ */ F(!1), A = /* @__PURE__ */ F(""), j = /* @__PURE__ */ F("2026-10"), ee = /* @__PURE__ */ F("2026-10-07"), M = /* @__PURE__ */ F(!0), te = /* @__PURE__ */ F(!0), ne = /* @__PURE__ */ F(!1), re = /* @__PURE__ */ F(!1), ie = /* @__PURE__ */ F(!1), ae = /* @__PURE__ */ F(!1), oe = Object.freeze({ "2026-10-28": Object.freeze([
			Object.freeze({
				id: "a",
				label: "첫 번째 범주",
				category: Db("example-a").category
			}),
			Object.freeze({
				id: "b",
				label: "길게 입력한 두 번째 상태도 넘치지 않게 표시합니다",
				tone: "warning"
			}),
			Object.freeze({
				id: "c",
				label: "세 번째 상태는 추가 개수로 안내합니다"
			})
		]) }), se = /* @__PURE__ */ new Date(), ce = new Date(se);
		ce.setDate(ce.getDate() + 1);
		let le = (e) => e.getFullYear() + "-" + String(e.getMonth() + 1).padStart(2, "0") + "-" + String(e.getDate()).padStart(2, "0"), ue = Object.freeze([{
			key: "one",
			label: "열 A",
			date: le(se)
		}, {
			key: "two",
			label: "열 B",
			date: le(ce)
		}]), de = Object.freeze([
			Object.freeze({
				id: "a",
				column: "one",
				start: 480,
				end: 570,
				title: "첫 번째 항목"
			}),
			Object.freeze({
				id: "b",
				column: "one",
				start: 510,
				end: 600,
				title: "겹치는 항목도 원본 시간을 바꾸지 않습니다."
			}),
			Object.freeze({
				id: "c",
				column: "one",
				start: 600,
				end: 615,
				title: "짧은 항목 · 긴 이름은 아래 목록에서 전체 내용을 확인할 수 있습니다."
			}),
			Object.freeze({
				id: "d",
				column: "two",
				start: 780,
				end: 840,
				title: "두 번째 열 항목"
			})
		]), fe = /* @__PURE__ */ F(de), pe = /* @__PURE__ */ F(!0), me = /* @__PURE__ */ F(!1), he = /* @__PURE__ */ F(!1), ge = /* @__PURE__ */ F(!1), _e = /* @__PURE__ */ F(!0), ve = /* @__PURE__ */ F(null), ye = /* @__PURE__ */ F(""), be = /* @__PURE__ */ F(!1), xe = 0;
		function Se(e) {
			if (ve.value = null, ye.value = e.action + " · " + e.to.columnKey + " · " + Me(e.to.startMinute) + "–" + Me(e.to.endMinute), !_e.value) {
				ye.value += " · 부모가 반영하지 않아 원본 유지";
				return;
			}
			let t = fe.value.find((t) => t.id === e.key);
			if (!t) return;
			let n = Object.freeze({
				...t,
				column: e.to.columnKey,
				start: e.to.startMinute,
				end: e.to.endMinute,
				...e.action === "duplicate" ? {
					id: "copy-" + ++xe,
					title: t.title + " · 복제"
				} : {}
			});
			fe.value = Object.freeze(e.action === "duplicate" ? [...fe.value, n] : fe.value.map((t) => t.id === e.key ? n : t));
		}
		function Ce(e) {
			if (ve.value = null, ye.value = "추가 요청 · " + e.columnKey + " · " + Me(e.startMinute) + "–" + Me(e.endMinute), !_e.value) {
				ye.value += " · 원본 유지";
				return;
			}
			let t = Object.freeze({
				id: "new-" + ++xe,
				column: e.columnKey,
				start: e.startMinute,
				end: e.endMinute,
				title: "새 가상 항목 " + xe
			});
			fe.value = Object.freeze([...Ue.value ? [] : fe.value, t]), Ue.value = !1;
		}
		function we(e) {
			ve.value = null, ye.value = "삭제 요청 · " + e.key, _e.value ? fe.value = Object.freeze(fe.value.filter((t) => t.id !== e.key)) : ye.value += " · 원본 유지";
		}
		let Te = /* @__PURE__ */ F(""), Ee = /* @__PURE__ */ F(!1), De = /* @__PURE__ */ F(null), Oe = /* @__PURE__ */ F(""), ke = /* @__PURE__ */ F(480), Ae = /* @__PURE__ */ F(540), je = /* @__PURE__ */ F("one"), Me = (e) => Number.isFinite(e) ? String(Math.floor(e / 60)).padStart(2, "0") + ":" + String(e % 60).padStart(2, "0") : "", Ne = (e) => /^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(e || "") ? Number(e.slice(0, 2)) * 60 + Number(e.slice(3)) : NaN, Pe = Y({
			get: () => Me(ke.value),
			set: (e) => {
				ke.value = Ne(e);
			}
		}), Fe = Y({
			get: () => Me(Ae.value),
			set: (e) => {
				Ae.value = Ne(e);
			}
		}), Ie = ai("gridStartField"), Le = ai("gridEndField");
		function Re(e) {
			let t = fe.value.find((t) => t.id === e.key);
			t && (Te.value = "", De.value = t.id, Oe.value = t.title, ke.value = t.start, Ae.value = t.end, je.value = t.column, Ee.value = !0);
		}
		let ze = Y(() => !ue.some((e) => e.key === je.value) || !Oe.value.trim() || !Number.isInteger(ke.value) || !Number.isInteger(Ae.value) || ke.value < 480 || Ae.value > 1080 || ke.value >= Ae.value || ke.value % 15 != 0 || Ae.value % 15 != 0);
		function Be() {
			Te.value = "";
			let e = Ie.value?.validate(), t = Le.value?.validate();
			!e || !t ? (e ? Le.value : Ie.value)?.focus() : ze.value ? Te.value = "항목 내용과 시각을 확인해 주세요. 시작은 종료보다 빨라야 하며 15분 간격이어야 합니다." : ze.value || me.value || We.value || !pe.value || ge.value && De.value === "a" || he.value && De.value === "a" || (ye.value = "수정 요청 · " + De.value, _e.value ? fe.value = Object.freeze(fe.value.map((e) => e.id === De.value ? Object.freeze({
				...e,
				title: Oe.value.trim(),
				start: ke.value,
				end: Ae.value,
				column: je.value
			}) : e)) : ye.value += " · 원본 유지", Ee.value = !1);
		}
		function Ve() {
			fe.value = Object.freeze([...de]), ve.value = null, ye.value = "";
		}
		function He(e) {
			ve.value = null, ye.value = "취소 · " + e.reason;
		}
		let Ue = /* @__PURE__ */ F(!1), We = /* @__PURE__ */ F(!1), Ge = Object.freeze([{
			id: "band-a",
			label: "범용 구간",
			startMinute: 720,
			endMinute: 780,
			category: "c2"
		}]);
		function Ke(e) {
			O.value && (D.value = e);
		}
		function qe(e) {
			A.value = e.status === "cancel" ? "취소: " + e.reason : e.status === "unchanged" ? "순서 유지" : (O.value ? "새 순서 반영: " : "순서 제안만 확인: ") + e.key;
		}
		return V([s, c], () => {
			(s.value || c.value) && (v.value = !1);
		}), (e, t) => {
			let i = U("SSwitch"), se = U("SSegmentedControl"), ce = U("SSelect"), le = U("SMultiSelect"), de = U("SRangeSlider"), xe = U("SNumberInput"), De = U("SSplitBtn"), ke = U("SContextMenu"), Ae = U("STextarea"), Ne = U("SResizableSplitPane"), ze = U("SCheckbox"), Je = U("SBtn"), Ye = U("SSortableList"), Xe = U("SMonthCalendar"), Ze = U("STimeGrid"), Qe = U("STextField"), $e = U("STimePicker"), et = U("SAlert"), tt = U("SDialog");
			return W(), hs(as, null, [
				o("segmented") ? (W(), hs("section", {
					key: 0,
					class: "starter-card",
					"aria-labelledby": n("advanced-title")
				}, [
					(W(), G(sa(L(r)), { id: n("advanced-title") }, {
						default: B(() => [...t[53] ||= [J("설정 하나 선택 · SSegmentedControl", -1)]]),
						_: 1
					}, 8, ["id"])),
					t[54] ||= K("p", { class: "starter-hint" }, " 선택·범위·메뉴·분할 부품을 설치한 solyi-ui에서 가져옵니다. 아래 설정은 이 예제들에만 적용됩니다. 모든 데이터와 작업은 가상입니다. ", -1),
					K("div", cD, [q(i, {
						id: n("advanced-disabled"),
						modelValue: L(s),
						"onUpdate:modelValue": t[0] ||= (e) => /* @__PURE__ */ P(s) ? s.value = e : null,
						label: "확장 예시 비활성"
					}, null, 8, ["id", "modelValue"]), q(i, {
						id: n("advanced-readonly"),
						modelValue: L(c),
						"onUpdate:modelValue": t[1] ||= (e) => /* @__PURE__ */ P(c) ? c.value = e : null,
						label: "확장 예시 읽기 전용"
					}, null, 8, ["id", "modelValue"])]),
					q(se, {
						id: n("advanced-segment"),
						modelValue: L(l),
						"onUpdate:modelValue": t[2] ||= (e) => /* @__PURE__ */ P(l) ? l.value = e : null,
						label: "가상 표시 설정",
						options: [
							{
								value: "brief",
								label: "간단히"
							},
							{
								value: "full",
								label: "자세히"
							},
							{
								value: "locked",
								label: "보관 · 비활성",
								disabled: !0
							}
						],
						disabled: L(s),
						readonly: L(c),
						help: "설정 하나를 고릅니다. Tabs처럼 별도 패널을 전환하는 부품은 아닙니다."
					}, null, 8, [
						"id",
						"modelValue",
						"disabled",
						"readonly"
					]),
					K("p", lD, N(L(l) === "brief" ? "가상 기록 4개" : "가상 기록 4개 · 메모와 변경 정보를 함께 표시하는 설정"), 1)
				], 8, sD)) : Ts("v-if", !0),
				o("multiselect") ? (W(), hs("section", {
					key: 1,
					class: "starter-card",
					"aria-labelledby": n("advanced-multi-title")
				}, [
					(W(), G(sa(L(r)), { id: n("advanced-multi-title") }, {
						default: B(() => [...t[55] ||= [J("검색 가능한 MultiSelect", -1)]]),
						_: 1
					}, 8, ["id"])),
					L(a) ? (W(), hs("div", dD, [q(i, {
						id: n("advanced-disabled"),
						modelValue: L(s),
						"onUpdate:modelValue": t[3] ||= (e) => /* @__PURE__ */ P(s) ? s.value = e : null,
						label: "예제 비활성"
					}, null, 8, ["id", "modelValue"]), q(i, {
						id: n("advanced-readonly"),
						modelValue: L(c),
						"onUpdate:modelValue": t[4] ||= (e) => /* @__PURE__ */ P(c) ? c.value = e : null,
						label: "예제 읽기 전용"
					}, null, 8, ["id", "modelValue"])])) : Ts("v-if", !0),
					q(ce, {
						id: n("advanced-multi-scenario"),
						modelValue: L(d),
						"onUpdate:modelValue": t[5] ||= (e) => /* @__PURE__ */ P(d) ? d.value = e : null,
						required: "",
						label: "가상 목록 동작",
						options: [
							{
								value: "local",
								label: "로컬 검색"
							},
							{
								value: "async",
								label: "지연 응답 흉내"
							},
							{
								value: "retry",
								label: "첫 오류 후 재시도"
							}
						],
						help: "외부 요청 없이 브라우저 안에서 지연·실패를 흉내 냅니다. '없는값'으로 결과 없음을 확인할 수 있어요."
					}, null, 8, ["id", "modelValue"]),
					q(le, {
						id: n("advanced-multi"),
						modelValue: L(u),
						"onUpdate:modelValue": t[6] ||= (e) => /* @__PURE__ */ P(u) ? u.value = e : null,
						clearable: "",
						label: "가상 기록 분류",
						options: p,
						"load-options": L(m),
						"max-selected": 3,
						required: "",
						disabled: L(s),
						readonly: L(c),
						placeholder: "분류 이름 검색",
						help: "방향키·Enter로 선택/해제, 빈 검색칸에서 Backspace로 마지막 선택 제거. Escape는 목록만 닫습니다. Tab은 제거/재시도 버튼에도 접근합니다."
					}, null, 8, [
						"id",
						"modelValue",
						"load-options",
						"disabled",
						"readonly"
					]),
					K("p", fD, " 완료 값: " + N(JSON.stringify(L(u))) + " · 가상 요청 " + N(L(f)) + "회. 검색을 바꾸어도 기존 선택은 유지됩니다. ", 1)
				], 8, uD)) : Ts("v-if", !0),
				o("range") ? (W(), hs("section", {
					key: 2,
					class: "starter-card",
					"aria-labelledby": n("advanced-range-title")
				}, [
					(W(), G(sa(L(r)), { id: n("advanced-range-title") }, {
						default: B(() => [...t[56] ||= [J("양끝 RangeSlider", -1)]]),
						_: 1
					}, 8, ["id"])),
					L(a) ? (W(), hs("div", mD, [q(i, {
						id: n("advanced-disabled"),
						modelValue: L(s),
						"onUpdate:modelValue": t[7] ||= (e) => /* @__PURE__ */ P(s) ? s.value = e : null,
						label: "예제 비활성"
					}, null, 8, ["id", "modelValue"]), q(i, {
						id: n("advanced-readonly"),
						modelValue: L(c),
						"onUpdate:modelValue": t[8] ||= (e) => /* @__PURE__ */ P(c) ? c.value = e : null,
						label: "예제 읽기 전용"
					}, null, 8, ["id", "modelValue"])])) : Ts("v-if", !0),
					q(de, {
						id: n("advanced-range"),
						modelValue: L(h),
						"onUpdate:modelValue": t[9] ||= (e) => /* @__PURE__ */ P(h) ? h.value = e : null,
						label: "가상 점수 구간",
						"lower-label": "하한",
						"upper-label": "상한",
						min: 0,
						max: 100,
						step: 5,
						"format-value": (e) => e + "점",
						disabled: L(s),
						readonly: L(c),
						help: "두 핸들은 서로 넘어가지 않습니다. 핸들 드래그·방향키 또는 트랙 누르기로 조절하세요."
					}, null, 8, [
						"id",
						"modelValue",
						"format-value",
						"disabled",
						"readonly"
					]),
					K("div", hD, [q(xe, {
						id: n("advanced-lower"),
						required: "",
						modelValue: L(h)[0],
						"onUpdate:modelValue": t[10] ||= (e) => L(h)[0] = e,
						label: "하한 직접 입력",
						min: 0,
						max: L(h)[1],
						step: 5,
						disabled: L(s),
						readonly: L(c)
					}, null, 8, [
						"id",
						"modelValue",
						"max",
						"disabled",
						"readonly"
					]), q(xe, {
						id: n("advanced-upper"),
						required: "",
						modelValue: L(h)[1],
						"onUpdate:modelValue": t[11] ||= (e) => L(h)[1] = e,
						label: "상한 직접 입력",
						min: L(h)[0],
						max: 100,
						step: 5,
						disabled: L(s),
						readonly: L(c)
					}, null, 8, [
						"id",
						"modelValue",
						"min",
						"disabled",
						"readonly"
					])]),
					t[57] ||= K("p", { class: "starter-hint" }, " 숫자 입력도 같은 값을 사용합니다. 터치 보조기술의 사용자별 동작은 실제 기기에서 별도 확인해야 합니다. ", -1)
				], 8, pD)) : Ts("v-if", !0),
				o("split-button", "context-menu") ? (W(), hs("section", {
					key: 3,
					class: "starter-card",
					"aria-labelledby": n("advanced-actions-title")
				}, [
					(W(), G(sa(L(r)), { id: n("advanced-actions-title") }, {
						default: B(() => [J(N(L(a) === "split-button" ? "SplitButton" : L(a) === "context-menu" ? "ContextMenu" : "SplitButton · ContextMenu"), 1)]),
						_: 1
					}, 8, ["id"])),
					L(a) ? (W(), hs("div", _D, [q(i, {
						id: n("advanced-disabled"),
						modelValue: L(s),
						"onUpdate:modelValue": t[12] ||= (e) => /* @__PURE__ */ P(s) ? s.value = e : null,
						label: "예제 비활성"
					}, null, 8, ["id", "modelValue"]), q(i, {
						id: n("advanced-readonly"),
						modelValue: L(c),
						"onUpdate:modelValue": t[13] ||= (e) => /* @__PURE__ */ P(c) ? c.value = e : null,
						label: "예제 읽기 전용"
					}, null, 8, ["id", "modelValue"])])) : Ts("v-if", !0),
					t[59] ||= K("p", { class: "starter-hint" }, " 주 동작과 다른 동작을 분리합니다. 실제 파일을 만들거나 자료를 변경하지 않습니다. ", -1),
					o("split-button") ? (W(), G(De, {
						key: 1,
						id: n("advanced-split-button"),
						label: "가상 내보내기",
						items: y,
						disabled: L(s),
						readonly: L(c),
						onPrimary: t[14] ||= (e) => {
							_.value++, g.value = "✓ 주 동작 " + L(_) + "회 · 실제 전송이나 다운로드는 없습니다.";
						},
						onSelect: x
					}, null, 8, [
						"id",
						"disabled",
						"readonly"
					])) : Ts("v-if", !0),
					o("context-menu") ? (W(), G(ke, {
						key: 2,
						id: n("advanced-context"),
						open: L(v),
						"onUpdate:open": t[15] ||= (e) => /* @__PURE__ */ P(v) ? v.value = e : null,
						label: "가상 정원 기록",
						"trigger-label": "기록 동작 열기",
						items: b,
						disabled: L(s),
						readonly: L(c),
						onSelect: x
					}, {
						default: B(() => [...t[58] ||= [K("p", null, [K("strong", null, "작은 정원 기록")], -1), K("p", null, " 이 영역에서 우클릭하거나 초점을 두고 Shift+F10을 누르세요. 터치에서도 아래 버튼을 사용할 수 있어요. ", -1)]]),
						_: 1
					}, 8, [
						"id",
						"open",
						"disabled",
						"readonly"
					])) : Ts("v-if", !0),
					K("p", vD, N(L(g)), 1)
				], 8, gD)) : Ts("v-if", !0),
				o("split-pane") ? (W(), hs("section", {
					key: 4,
					class: "starter-card",
					"aria-labelledby": n("advanced-pane-title")
				}, [
					(W(), G(sa(L(r)), { id: n("advanced-pane-title") }, {
						default: B(() => [...t[60] ||= [J("ResizableSplitPane", -1)]]),
						_: 1
					}, 8, ["id"])),
					L(a) ? (W(), hs("div", bD, [q(i, {
						id: n("advanced-disabled"),
						modelValue: L(s),
						"onUpdate:modelValue": t[16] ||= (e) => /* @__PURE__ */ P(s) ? s.value = e : null,
						label: "예제 비활성"
					}, null, 8, ["id", "modelValue"]), q(i, {
						id: n("advanced-readonly"),
						modelValue: L(c),
						"onUpdate:modelValue": t[17] ||= (e) => /* @__PURE__ */ P(c) ? c.value = e : null,
						label: "예제 읽기 전용"
					}, null, 8, ["id", "modelValue"])])) : Ts("v-if", !0),
					q(ce, {
						id: n("advanced-pane-direction"),
						modelValue: L(C),
						"onUpdate:modelValue": t[18] ||= (e) => /* @__PURE__ */ P(C) ? C.value = e : null,
						required: "",
						label: "개발 설정 · 분할 방향",
						options: [{
							value: "horizontal",
							label: "좌우 두 영역"
						}, {
							value: "vertical",
							label: "위아래 두 영역"
						}]
					}, null, 8, ["id", "modelValue"]),
					q(Ne, {
						id: n("advanced-pane"),
						modelValue: L(S),
						"onUpdate:modelValue": t[20] ||= (e) => /* @__PURE__ */ P(S) ? S.value = e : null,
						label: "가상 목록과 메모",
						"primary-label": "가상 목록",
						"secondary-label": "가상 메모",
						orientation: L(C),
						min: 25,
						max: 75,
						step: 5,
						disabled: L(s),
						readonly: L(c),
						onReflow: t[21] ||= (e) => T.value = e,
						onChange: t[22] ||= (e) => E.value = "조절 완료: " + e + "%"
					}, {
						primary: B(() => [...t[61] ||= [K("p", null, [
							J("계절 관찰"),
							K("br"),
							J("작은 정원"),
							K("br"),
							J("저녁 책장")
						], -1), K("p", { class: "starter-hint" }, " 중앙 구분선을 드래그하거나 초점을 두고 방향키로 조절합니다. ", -1)]]),
						secondary: B(() => [q(Ae, {
							id: n("advanced-pane-memo"),
							modelValue: L(w),
							"onUpdate:modelValue": t[19] ||= (e) => /* @__PURE__ */ P(w) ? w.value = e : null,
							label: "유지되는 가상 메모",
							disabled: L(s),
							readonly: L(c)
						}, null, 8, [
							"id",
							"modelValue",
							"disabled",
							"readonly"
						])]),
						_: 1
					}, 8, [
						"id",
						"modelValue",
						"orientation",
						"disabled",
						"readonly"
					]),
					K("p", xD, " 저장 비율 " + N(L(S)) + "% · " + N(L(T) ? "좁은 폭: 위아래 높이 조절" : "크기 조절 가능") + " · " + N(L(E)), 1)
				], 8, yD)) : Ts("v-if", !0),
				o("sortable") ? (W(), hs("section", {
					key: 5,
					class: "starter-card",
					"aria-labelledby": n("advanced-sortable-title")
				}, [
					(W(), G(sa(L(r)), { id: n("advanced-sortable-title") }, {
						default: B(() => [...t[62] ||= [J("정렬 목록 · SSortableList", -1)]]),
						_: 1
					}, 8, ["id"])),
					t[65] ||= K("p", { class: "starter-hint" }, " 손잡이를 드래그하거나 키보드와 위·아래 이동 버튼으로 순서를 제안합니다. 원본 객체는 유지합니다. ", -1),
					K("div", CD, [
						q(ze, {
							id: n("advanced-sort-accept"),
							modelValue: L(O),
							"onUpdate:modelValue": t[23] ||= (e) => /* @__PURE__ */ P(O) ? O.value = e : null,
							label: "새 순서 반영"
						}, null, 8, ["id", "modelValue"]),
						q(ze, {
							id: n("advanced-sort-lock"),
							modelValue: L(k),
							"onUpdate:modelValue": t[24] ||= (e) => /* @__PURE__ */ P(k) ? k.value = e : null,
							label: "두 번째 항목 자체의 이동 막기"
						}, null, 8, ["id", "modelValue"]),
						L(a) ? (W(), G(i, {
							key: 0,
							id: n("advanced-sort-disabled"),
							modelValue: L(s),
							"onUpdate:modelValue": t[25] ||= (e) => /* @__PURE__ */ P(s) ? s.value = e : null,
							label: "정렬 비활성"
						}, null, 8, ["id", "modelValue"])) : Ts("v-if", !0),
						L(a) ? (W(), G(i, {
							key: 1,
							id: n("advanced-sort-readonly"),
							modelValue: L(c),
							"onUpdate:modelValue": t[26] ||= (e) => /* @__PURE__ */ P(c) ? c.value = e : null,
							label: "정렬 보기 전용"
						}, null, 8, ["id", "modelValue"])) : Ts("v-if", !0),
						q(Je, { onClick: t[27] ||= (e) => D.value = [...L(D)].reverse() }, {
							default: B(() => [...t[63] ||= [J("외부 목록 변경 시연", -1)]]),
							_: 1
						})
					]),
					q(Ye, {
						id: n("advanced-sortable"),
						label: "가상 항목 순서",
						"model-value": L(D),
						"item-key": (e) => e.id,
						"item-label": (e) => e.label,
						"is-item-disabled": (e) => L(k) && e.id === "b",
						disabled: L(s),
						readonly: L(c),
						"onUpdate:modelValue": Ke,
						onEnd: qe
					}, {
						item: B(({ item: e, index: n, active: r }) => [
							K("strong", null, N(n + 1) + ". " + N(e.label), 1),
							K("p", null, N(e.details.count.toFixed(0)) + "개 · " + N(r ? "이동 위치 선택 중" : "대기"), 1),
							q(Je, {
								variant: "inline",
								disabled: L(s),
								onClick: (t) => A.value = e.label + " 본문 버튼 확인"
							}, {
								default: B(() => [...t[64] ||= [J("본문 동작", -1)]]),
								_: 1
							}, 8, ["disabled", "onClick"])
						]),
						_: 1
					}, 8, [
						"id",
						"model-value",
						"item-key",
						"item-label",
						"is-item-disabled",
						"disabled",
						"readonly"
					]),
					K("p", wD, N(L(A)), 1),
					K("p", TD, "확정 순서: " + N(L(D).map((e) => e.id).join(" → ")), 1)
				], 8, SD)) : Ts("v-if", !0),
				o("month-calendar") ? (W(), hs("section", {
					key: 6,
					class: "starter-card",
					"aria-labelledby": n("advanced-month-title")
				}, [
					(W(), G(sa(L(r)), { id: n("advanced-month-title") }, {
						default: B(() => [...t[66] ||= [J("월간 달력 · SMonthCalendar", -1)]]),
						_: 1
					}, 8, ["id"])),
					t[67] ||= K("p", { class: "starter-hint" }, " 월과 날짜는 부모가 반영할 때 바뀝니다. 오늘 이동과 키보드 탐색은 선택을 자동 저장하지 않습니다. 날짜별 자료가 늦게 와도 선택은 남습니다. ", -1),
					K("div", DD, [
						q(ze, {
							id: n("advanced-month-accept"),
							modelValue: L(M),
							"onUpdate:modelValue": t[28] ||= (e) => /* @__PURE__ */ P(M) ? M.value = e : null,
							label: "표시 월 제안 반영"
						}, null, 8, ["id", "modelValue"]),
						q(ze, {
							id: n("advanced-month-accept-date"),
							modelValue: L(te),
							"onUpdate:modelValue": t[29] ||= (e) => /* @__PURE__ */ P(te) ? te.value = e : null,
							label: "선택 날짜 제안 반영"
						}, null, 8, ["id", "modelValue"]),
						q(ze, {
							id: n("advanced-month-monday"),
							modelValue: L(ie),
							"onUpdate:modelValue": t[30] ||= (e) => /* @__PURE__ */ P(ie) ? ie.value = e : null,
							label: "월요일 시작"
						}, null, 8, ["id", "modelValue"]),
						q(ze, {
							id: n("advanced-month-loading"),
							modelValue: L(ne),
							"onUpdate:modelValue": t[31] ||= (e) => /* @__PURE__ */ P(ne) ? ne.value = e : null,
							label: "자료 loading"
						}, null, 8, ["id", "modelValue"]),
						q(ze, {
							id: n("advanced-month-empty"),
							modelValue: L(re),
							"onUpdate:modelValue": t[32] ||= (e) => /* @__PURE__ */ P(re) ? re.value = e : null,
							label: "날짜별 자료 없음"
						}, null, 8, ["id", "modelValue"]),
						q(ze, {
							id: n("advanced-month-blocked"),
							modelValue: L(ae),
							"onUpdate:modelValue": t[33] ||= (e) => /* @__PURE__ */ P(ae) ? ae.value = e : null,
							label: "10일 선택 막기"
						}, null, 8, ["id", "modelValue"]),
						L(a) ? (W(), G(i, {
							key: 0,
							id: n("advanced-month-disabled"),
							modelValue: L(s),
							"onUpdate:modelValue": t[34] ||= (e) => /* @__PURE__ */ P(s) ? s.value = e : null,
							label: "달력 비활성"
						}, null, 8, ["id", "modelValue"])) : Ts("v-if", !0),
						L(a) ? (W(), G(i, {
							key: 1,
							id: n("advanced-month-readonly"),
							modelValue: L(c),
							"onUpdate:modelValue": t[35] ||= (e) => /* @__PURE__ */ P(c) ? c.value = e : null,
							label: "달력 보기 전용"
						}, null, 8, ["id", "modelValue"])) : Ts("v-if", !0)
					]),
					q(Xe, {
						id: n("advanced-month"),
						label: "범용 날짜 상태",
						month: L(j),
						"model-value": L(ee),
						today: "2026-10-28",
						"first-day": +!!L(ie),
						markers: L(re) ? {} : L(oe),
						"is-date-disabled": (e) => L(ae) && e.endsWith("-10"),
						loading: L(ne),
						disabled: L(s),
						readonly: L(c),
						"onUpdate:month": t[36] ||= (e) => {
							L(M) && (j.value = e);
						},
						"onUpdate:modelValue": t[37] ||= (e) => {
							L(te) && (ee.value = e);
						}
					}, null, 8, [
						"id",
						"month",
						"model-value",
						"first-day",
						"markers",
						"is-date-disabled",
						"loading",
						"disabled",
						"readonly"
					]),
					t[68] ||= K("p", { class: "starter-hint" }, " 항목이나 +N이 있는 날짜를 누르면 아래 상세 목록에서 전체 내용을 읽습니다. 키보드는 날짜를 선택한 뒤 Tab으로 목록을 읽고 Escape로 달력에 돌아옵니다. ", -1),
					K("p", {
						id: n("advanced-month-result"),
						class: "starter-hint"
					}, " 표시 월: " + N(L(j)) + " · 선택 ISO: " + N(L(ee)), 9, OD)
				], 8, ED)) : Ts("v-if", !0),
				o("time-grid") ? (W(), hs("section", {
					key: 7,
					class: "starter-card",
					"aria-labelledby": n("advanced-time-grid-title")
				}, [
					(W(), G(sa(L(r)), { id: n("advanced-time-grid-title") }, {
						default: B(() => [...t[69] ||= [J("시간 그리드 · 변경 제안", -1)]]),
						_: 1
					}, 8, ["id"])),
					t[73] ||= K("p", { class: "starter-hint" }, " 카드 본문을 드래그해 이동하고 위·아래 가장자리로 시간을 조절합니다. 빈 칸을 누르거나 오른쪽 위 추가 버튼으로 항목을 만들 수 있습니다. 반영 체크를 끄면 생성·삭제·이동 요청을 보여주되 원본은 유지합니다. 새 key·충돌·저장은 소비 앱에서 소유합니다. ", -1),
					K("div", AD, [q(ze, {
						id: n("advanced-time-grid-empty"),
						modelValue: L(Ue),
						"onUpdate:modelValue": t[38] ||= (e) => /* @__PURE__ */ P(Ue) ? Ue.value = e : null,
						label: "빈 항목"
					}, null, 8, ["id", "modelValue"]), q(ze, {
						id: n("advanced-time-grid-loading"),
						modelValue: L(We),
						"onUpdate:modelValue": t[39] ||= (e) => /* @__PURE__ */ P(We) ? We.value = e : null,
						label: "불러오는 중"
					}, null, 8, ["id", "modelValue"])]),
					K("div", jD, [
						q(ze, {
							id: n("advanced-time-grid-edit"),
							modelValue: L(pe),
							"onUpdate:modelValue": t[40] ||= (e) => /* @__PURE__ */ P(pe) ? pe.value = e : null,
							label: "편집 켜기 · 끄면 보기 전용"
						}, null, 8, ["id", "modelValue"]),
						q(ze, {
							id: n("advanced-time-grid-disabled"),
							modelValue: L(me),
							"onUpdate:modelValue": t[41] ||= (e) => /* @__PURE__ */ P(me) ? me.value = e : null,
							label: "편집 잠금 · 추가·드래그·삭제 방지"
						}, null, 8, ["id", "modelValue"]),
						q(ze, {
							id: n("advanced-time-grid-lock"),
							modelValue: L(he),
							"onUpdate:modelValue": t[42] ||= (e) => /* @__PURE__ */ P(he) ? he.value = e : null,
							label: "첫 항목만 잠금 · 항목별 권한 예제"
						}, null, 8, ["id", "modelValue"]),
						q(ze, {
							id: n("advanced-time-grid-pending"),
							modelValue: L(ge),
							"onUpdate:modelValue": t[43] ||= (e) => /* @__PURE__ */ P(ge) ? ge.value = e : null,
							label: "첫 항목 반영 대기"
						}, null, 8, ["id", "modelValue"]),
						q(ze, {
							id: n("advanced-time-grid-accept"),
							modelValue: L(_e),
							"onUpdate:modelValue": t[44] ||= (e) => /* @__PURE__ */ P(_e) ? _e.value = e : null,
							label: "요청을 실제 항목에 반영 · 끄면 원본 유지"
						}, null, 8, ["id", "modelValue"]),
						q(Je, {
							id: n("advanced-time-grid-reset"),
							onClick: Ve
						}, {
							default: B(() => [...t[70] ||= [J("원본으로 외부 갱신", -1)]]),
							_: 1
						}, 8, ["id"])
					]),
					q(ze, {
						id: n("advanced-time-grid-duplicate"),
						modelValue: L(be),
						"onUpdate:modelValue": t[45] ||= (e) => /* @__PURE__ */ P(be) ? be.value = e : null,
						label: "항목 복제 사용"
					}, null, 8, ["id", "modelValue"]),
					t[74] ||= K("p", { class: "starter-hint" }, " 복제 사용을 켠 뒤 세로점 메뉴에서 복제를 선택해 미리보기를 엽니다. 아래 복제 버튼으로 같은 시각에 새 항목을 추가하거나 취소합니다. 키보드는 방향키로 위치를 조절하고 Enter로 확정, Escape·Tab으로 취소합니다. 원본은 유지합니다. ", -1),
					q(Ze, {
						"allow-duplicate": L(be),
						id: n("advanced-time-grid"),
						label: "범용 시간 항목",
						items: L(Ue) ? [] : L(fe),
						columns: L(ue),
						bands: L(Ge),
						"item-key": (e) => e.id,
						"item-label": (e) => e.title,
						"item-column": (e) => e.column,
						"item-start": (e) => e.start,
						"item-end": (e) => e.end,
						"start-minute": 480,
						"end-minute": 1080,
						loading: L(We),
						readonly: !L(pe),
						disabled: L(me),
						"allow-resize": "",
						"allow-create": "",
						"allow-remove": "",
						"allow-edit": "",
						onEdit: Re,
						"show-current-time": "",
						onCreate: Ce,
						onRemove: we,
						"snap-minutes": 15,
						"pending-keys": L(ge) ? ["a"] : [],
						"is-item-disabled": (e) => L(he) && e.id === "a",
						onPreview: t[46] ||= (e) => ve.value = e,
						onCommit: Se,
						onCancel: He,
						help: "카드 드래그: 이동 · 위/아래 가장자리: 시간 조절 · 항목 Space: 키보드 편집 시작 · Enter: 변경 확정 · Escape: 취소 · Delete: 삭제 요청. 우클릭 또는 세로점 메뉴에서 내용·시간을 수정하거나 삭제합니다. 빨간 현재 시각선은 표시 중인 날짜와 08~18시 범위에서 분마다 갱신됩니다."
					}, null, 8, [
						"allow-duplicate",
						"id",
						"items",
						"columns",
						"bands",
						"item-key",
						"item-label",
						"item-column",
						"item-start",
						"item-end",
						"loading",
						"readonly",
						"disabled",
						"pending-keys",
						"is-item-disabled"
					]),
					q(tt, {
						id: n("advanced-time-grid-edit-dialog"),
						modelValue: L(Ee),
						"onUpdate:modelValue": t[52] ||= (e) => /* @__PURE__ */ P(Ee) ? Ee.value = e : null,
						title: "항목 수정"
					}, {
						actions: B(() => [q(Je, { onClick: t[51] ||= (e) => Ee.value = !1 }, {
							default: B(() => [...t[71] ||= [J("취소", -1)]]),
							_: 1
						}), q(Je, {
							variant: "primary",
							disabled: L(me) || L(We) || !L(pe),
							onClick: Be
						}, {
							default: B(() => [...t[72] ||= [J("저장", -1)]]),
							_: 1
						}, 8, ["disabled"])]),
						default: B(() => [
							q(Qe, {
								id: n("advanced-time-grid-edit-title"),
								modelValue: L(Oe),
								"onUpdate:modelValue": t[47] ||= (e) => /* @__PURE__ */ P(Oe) ? Oe.value = e : null,
								label: "항목 내용"
							}, null, 8, ["id", "modelValue"]),
							q(ce, {
								id: n("advanced-time-grid-edit-column"),
								modelValue: L(je),
								"onUpdate:modelValue": t[48] ||= (e) => /* @__PURE__ */ P(je) ? je.value = e : null,
								label: "열",
								options: L(ue).map((e) => ({
									value: e.key,
									label: e.label
								}))
							}, null, 8, [
								"id",
								"modelValue",
								"options"
							]),
							q($e, {
								ref_key: "gridStartField",
								ref: Ie,
								clearable: "",
								id: n("advanced-time-grid-edit-start"),
								modelValue: L(Pe),
								"onUpdate:modelValue": t[49] ||= (e) => /* @__PURE__ */ P(Pe) ? Pe.value = e : null,
								label: "시작 시각",
								min: "08:00",
								max: "17:45",
								step: 15,
								"picker-presentation": "auto",
								required: ""
							}, null, 8, ["id", "modelValue"]),
							q($e, {
								ref_key: "gridEndField",
								ref: Le,
								clearable: "",
								id: n("advanced-time-grid-edit-end"),
								modelValue: L(Fe),
								"onUpdate:modelValue": t[50] ||= (e) => /* @__PURE__ */ P(Fe) ? Fe.value = e : null,
								label: "종료 시각",
								min: "08:15",
								max: "18:00",
								step: 15,
								"picker-presentation": "auto",
								required: ""
							}, null, 8, ["id", "modelValue"]),
							L(Te) ? (W(), G(et, {
								key: 0,
								tone: "danger",
								title: L(Te),
								live: "polite"
							}, null, 8, ["title"])) : Ts("v-if", !0)
						]),
						_: 1
					}, 8, ["id", "modelValue"]),
					K("p", {
						id: n("advanced-time-grid-result"),
						class: "starter-hint",
						role: "status"
					}, N(L(ve) ? "미리보기 · " + L(ve).to.columnKey + " · " + Me(L(ve).to.startMinute) + "–" + Me(L(ve).to.endMinute) : L(ye)), 9, MD)
				], 8, kD)) : Ts("v-if", !0)
			], 64);
		};
	}
}, PD = /* @__PURE__ */ H({
	name: "SolDocumentPreviewCard",
	inheritAttrs: !1,
	setup(e, { attrs: t, slots: n }) {
		return () => {
			let e = { ...t };
			return delete e["heading-level"], delete e.headingLevel, X(HS, {
				...e,
				headingLevel: 4
			}, n);
		};
	}
});
function FD(e) {
	let t = document.createElement("div");
	t.dataset.inlinePreviewRuntime = "", document.body.append(t);
	let n = /* @__PURE__ */ I([]), r = /* @__PURE__ */ F("ko-KR"), i = /* @__PURE__ */ new Map(), a = kw({ components: {
		VApp: _h,
		VThemeProvider: bh
	} }), o = xu({ render: () => X(_h, { class: "sol-inline-runtime" }, () => n.value.map((e) => X(zr, {
		to: e.host,
		key: e.host.id
	}, X(bh, { withBackground: !1 }, () => X("div", {
		class: "sol-inline-preview v-application",
		"data-package-version": Tw
	}, [X(e.component)]))))) });
	Mx(o, Y(() => ({ code: r.value }))), o.use(a);
	for (let [e, t] of Object.entries(Pw)) o.component(e, e === "SCard" ? PD : t);
	o.mount(t);
	let s = !1;
	function c(e) {
		s || Aw(a.theme, e, t);
	}
	return c(e), {
		async mount(e) {
			if (s || n.value.some((t) => t.host === e.host)) return;
			let t = e.view === "advanced" ? ND : oD[e.recipe];
			if (!t) throw Error("Unknown preview recipe: " + e.recipe);
			let r = {
				...e,
				component: t,
				failed: !1,
				ready: !1
			};
			if (r.component = /* @__PURE__ */ H({
				name: "SolDocumentPreviewBoundary",
				setup() {
					return ra((t) => (r.failed = !0, r.failure = t, n.value = n.value.filter((e) => e !== r), r.ready && z(() => {
						s || e.onError?.(t);
					}), !1)), () => X(t, {
						...r.part ? { part: r.part } : {},
						...r.view === "advanced" ? {
							headingLevel: 4,
							idPrefix: r.host.id
						} : {},
						ref: (e) => {
							e ? i.set(r.host, e) : i.delete(r.host);
						}
					});
				}
			}), n.value = [...n.value, r], await z(), r.failed) throw r.failure;
			r.ready = !0;
		},
		sync: c,
		async requestLeave() {
			for (let e of i.values()) if (e.confirmLeave && !await e.confirmLeave()) return !1;
			return !0;
		},
		dispose() {
			s || (s = !0, o.unmount(), a.unmount(), i.clear(), t.remove());
		}
	};
}
export { FD as createInlinePreviewRuntime };
