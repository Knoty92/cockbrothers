import { createComponent, ssr, ssrHydrationKey, isServer, Portal, escape, getRequestEvent, delegateEvents } from 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/solid-js@1.9.12/node_modules/solid-js/web/dist/server.js';
import { a as au } from '../nitro/nitro.mjs';
import { Suspense, createSignal, onCleanup, For, children, createMemo, getOwner, sharedConfig, createRenderEffect, on, useContext, runWithOwner, createContext, untrack, Show, createRoot, startTransition, resetErrorBoundaries, batch, createComponent as createComponent$1 } from 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/solid-js@1.9.12/node_modules/solid-js/dist/server.js';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/node-mock-http@1.0.4/node_modules/node-mock-http/dist/index.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_drizzle-orm@0.41.0_@opentelemetry+api@1.9.1_@types+pg@8.15.6_8110e06675a72f3bef1321277b073dd1/node_modules/unstorage/dist/index.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_drizzle-orm@0.41.0_@opentelemetry+api@1.9.1_@types+pg@8.15.6_8110e06675a72f3bef1321277b073dd1/node_modules/unstorage/drivers/fs.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_drizzle-orm@0.41.0_@opentelemetry+api@1.9.1_@types+pg@8.15.6_8110e06675a72f3bef1321277b073dd1/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import 'node:async_hooks';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/vinxi@0.5.11_@types+node@25.6.0_db0@0.3.4_drizzle-orm@0.41.0_@opentelemetry+api@1.9.1_@_8641ea8fbdbe1d6e38d88d1499bb0cfd/node_modules/vinxi/lib/app-fetch.js';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/vinxi@0.5.11_@types+node@25.6.0_db0@0.3.4_drizzle-orm@0.41.0_@opentelemetry+api@1.9.1_@_8641ea8fbdbe1d6e38d88d1499bb0cfd/node_modules/vinxi/lib/app-manifest.js';
import 'node:fs';
import 'node:url';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import 'file:///home/node/.openclaw/workspace/cockbrothers/apps/frontend/node_modules/.pnpm/solid-js@1.9.12/node_modules/solid-js/web/storage/dist/storage.js';

function se() {
  let e = /* @__PURE__ */ new Set();
  function t(r) {
    return e.add(r), () => e.delete(r);
  }
  let n = false;
  function o(r, a) {
    if (n) return !(n = false);
    const s = { to: r, options: a, defaultPrevented: false, preventDefault: () => s.defaultPrevented = true };
    for (const i of e) i.listener({ ...s, from: i.location, retry: (h) => {
      h && (n = true), i.navigate(r, { ...a, resolve: false });
    } });
    return !s.defaultPrevented;
  }
  return { subscribe: t, confirm: o };
}
let H;
function J() {
  (!window.history.state || window.history.state._depth == null) && window.history.replaceState({ ...window.history.state, _depth: window.history.length - 1 }, ""), H = window.history.state._depth;
}
isServer || J();
function Be(e) {
  return { ...e, _depth: window.history.state && window.history.state._depth };
}
function Fe(e, t) {
  let n = false;
  return () => {
    const o = H;
    J();
    const r = o == null ? null : H - o;
    if (n) {
      n = false;
      return;
    }
    r && t(r) ? (n = true, window.history.go(-r)) : e();
  };
}
const je = /^(?:[a-z0-9]+:)?\/\//i, Te = /^\/+|(\/)\/+$/g, ie = "http://sr";
function M(e, t = false) {
  const n = e.replace(Te, "$1");
  return n ? t || /^[?#]/.test(n) ? n : "/" + n : "";
}
function W(e, t, n) {
  if (je.test(t)) return;
  const o = M(e), r = n && M(n);
  let a = "";
  return !r || t.startsWith("/") ? a = o : r.toLowerCase().indexOf(o.toLowerCase()) !== 0 ? a = o + r : a = r, (a || "/") + M(t, !a);
}
function Me(e, t) {
  return M(e).replace(/\/*(\*.*)?$/g, "") + M(t);
}
function ce(e) {
  const t = {};
  return e.searchParams.forEach((n, o) => {
    o in t ? Array.isArray(t[o]) ? t[o].push(n) : t[o] = [t[o], n] : t[o] = n;
  }), t;
}
function qe(e, t, n) {
  const [o, r] = e.split("/*", 2), a = o.split("/").filter(Boolean), s = a.length;
  return (i) => {
    const h = i.split("/").filter(Boolean), c = h.length - s;
    if (c < 0 || c > 0 && r === void 0 && !t) return null;
    const f = { path: s ? "" : "/", params: {} }, v = (m) => n === void 0 ? void 0 : n[m];
    for (let m = 0; m < s; m++) {
      const g = a[m], b = g[0] === ":", l = b ? h[m] : h[m].toLowerCase(), u = b ? g.slice(1) : g.toLowerCase();
      if (b && N(l, v(u))) f.params[u] = l;
      else if (b || !N(l, u)) return null;
      f.path += `/${l}`;
    }
    if (r) {
      const m = c ? h.slice(-c).join("/") : "";
      if (N(m, v(r))) f.params[r] = m;
      else return null;
    }
    return f;
  };
}
function N(e, t) {
  const n = (o) => o === e;
  return t === void 0 ? true : typeof t == "string" ? n(t) : typeof t == "function" ? t(e) : Array.isArray(t) ? t.some(n) : t instanceof RegExp ? t.test(e) : false;
}
function Ie(e) {
  const [t, n] = e.pattern.split("/*", 2), o = t.split("/").filter(Boolean);
  return o.reduce((r, a) => r + (a.startsWith(":") ? 2 : 3), o.length - (n === void 0 ? 0 : 1));
}
function le(e) {
  const t = /* @__PURE__ */ new Map(), n = getOwner();
  return new Proxy({}, { get(o, r) {
    return t.has(r) || runWithOwner(n, () => t.set(r, createMemo(() => e()[r]))), t.get(r)();
  }, getOwnPropertyDescriptor() {
    return { enumerable: true, configurable: true };
  }, ownKeys() {
    return Reflect.ownKeys(e());
  }, has(o, r) {
    return r in e();
  } });
}
function ue(e) {
  let t = /(\/?\:[^\/]+)\?/.exec(e);
  if (!t) return [e];
  let n = e.slice(0, t.index), o = e.slice(t.index + t[0].length);
  const r = [n, n += t[1]];
  for (; t = /^(\/\:[^\/]+)\?/.exec(o); ) r.push(n += t[1]), o = o.slice(t[0].length);
  return ue(o).reduce((a, s) => [...a, ...r.map((i) => i + s)], []);
}
const De = 100, We = createContext(), he = createContext();
function ze(e, t = "") {
  const { component: n, preload: o, load: r, children: a, info: s } = e, i = !a || Array.isArray(a) && !a.length, h = { key: e, component: n, preload: o || r, info: s };
  return de(e.path).reduce((c, f) => {
    for (const v of ue(f)) {
      const m = Me(t, v);
      let g = i ? m : m.split("/*", 1)[0];
      g = g.split("/").map((b) => b.startsWith(":") || b.startsWith("*") ? b : encodeURIComponent(b)).join("/"), c.push({ ...h, originalPath: f, pattern: g, matcher: qe(g, !i, e.matchFilters) });
    }
    return c;
  }, []);
}
function Ke(e, t = 0) {
  return { routes: e, score: Ie(e[e.length - 1]) * 1e4 - t, matcher(n) {
    const o = [];
    for (let r = e.length - 1; r >= 0; r--) {
      const a = e[r], s = a.matcher(n);
      if (!s) return null;
      o.unshift({ ...s, route: a });
    }
    return o;
  } };
}
function de(e) {
  return Array.isArray(e) ? e : [e];
}
function fe(e, t = "", n = [], o = []) {
  const r = de(e);
  for (let a = 0, s = r.length; a < s; a++) {
    const i = r[a];
    if (i && typeof i == "object") {
      i.hasOwnProperty("path") || (i.path = "");
      const h = ze(i, t);
      for (const c of h) {
        n.push(c);
        const f = Array.isArray(i.children) && i.children.length === 0;
        if (i.children && !f) fe(i.children, c.pattern, n, o);
        else {
          const v = Ke([...n], o.length);
          o.push(v);
        }
        n.pop();
      }
    }
  }
  return n.length ? o : o.sort((a, s) => s.score - a.score);
}
function q(e, t) {
  for (let n = 0, o = e.length; n < o; n++) {
    const r = e[n].matcher(t);
    if (r) return r;
  }
  return [];
}
function Ne(e, t, n) {
  const o = new URL(ie), r = createMemo((f) => {
    const v = e();
    try {
      return new URL(v, o);
    } catch {
      return console.error(`Invalid path ${v}`), f;
    }
  }, o, { equals: (f, v) => f.href === v.href }), a = createMemo(() => r().pathname), s = createMemo(() => r().search, true), i = createMemo(() => r().hash), h = () => "", c = on(s, () => ce(r()));
  return { get pathname() {
    return a();
  }, get search() {
    return s();
  }, get hash() {
    return i();
  }, get state() {
    return t();
  }, get key() {
    return h();
  }, query: n ? n(c) : le(c) };
}
let E;
function He() {
  return E;
}
function Ve(e, t, n, o = {}) {
  const { signal: [r, a], utils: s = {} } = e, i = s.parsePath || ((d) => d), h = s.renderPath || ((d) => d), c = s.beforeLeave || se(), f = W("", o.base || "");
  if (f === void 0) throw new Error(`${f} is not a valid base path`);
  f && !r().value && a({ value: f, replace: true, scroll: false });
  const [v, m] = createSignal(false);
  let g;
  const b = (d, p) => {
    p.value === l() && p.state === y() || (g === void 0 && m(true), E = d, g = p, startTransition(() => {
      g === p && (u(g.value), w(g.state), resetErrorBoundaries(), isServer || C[1]((x) => x.filter((O) => O.pending)));
    }).finally(() => {
      g === p && batch(() => {
        E = void 0, d === "navigate" && ve(g), m(false), g = void 0;
      });
    }));
  }, [l, u] = createSignal(r().value), [y, w] = createSignal(r().state), A = Ne(l, y, s.queryWrapper), L = [], C = createSignal(isServer ? be() : []), j = createMemo(() => typeof o.transformUrl == "function" ? q(t(), o.transformUrl(A.pathname)) : q(t(), A.pathname)), X = () => {
    const d = j(), p = {};
    for (let x = 0; x < d.length; x++) Object.assign(p, d[x].params);
    return p;
  }, pe = s.paramsWrapper ? s.paramsWrapper(X, t) : le(X), Q = { pattern: f, path: () => f, outlet: () => null, resolvePath(d) {
    return W(f, d);
  } };
  return createRenderEffect(on(r, (d) => b("native", d), { defer: true })), { base: Q, location: A, params: pe, isRouting: v, renderPath: h, parsePath: i, navigatorFactory: we, matches: j, beforeLeave: c, preloadRoute: ye, singleFlight: o.singleFlight === void 0 ? true : o.singleFlight, submissions: C };
  function ge(d, p, x) {
    untrack(() => {
      if (typeof p == "number") {
        p && (s.go ? s.go(p) : console.warn("Router integration does not support relative routing"));
        return;
      }
      const O = !p || p[0] === "?", { replace: I, resolve: _, scroll: D, state: U } = { replace: false, resolve: !O, scroll: true, ...x }, $ = _ ? d.resolvePath(p) : W(O && A.pathname || "", p);
      if ($ === void 0) throw new Error(`Path '${p}' is not a routable path`);
      if (L.length >= De) throw new Error("Too many redirects");
      const Y = l();
      if ($ !== Y || U !== y()) if (isServer) {
        const Z = getRequestEvent();
        Z && (Z.response = { status: 302, headers: new Headers({ Location: $ }) }), a({ value: $, replace: I, scroll: D, state: U });
      } else c.confirm($, x) && (L.push({ value: Y, replace: I, scroll: D, state: y() }), b("navigate", { value: $, state: U }));
    });
  }
  function we(d) {
    return d = d || useContext(he) || Q, (p, x) => ge(d, p, x);
  }
  function ve(d) {
    const p = L[0];
    p && (a({ ...d, replace: p.replace, scroll: p.scroll }), L.length = 0);
  }
  function ye(d, p) {
    const x = q(t(), d.pathname), O = E;
    E = "preload";
    for (let I in x) {
      const { route: _, params: D } = x[I];
      _.component && _.component.preload && _.component.preload();
      const { preload: U } = _;
      p && U && runWithOwner(n(), () => U({ params: D, location: { pathname: d.pathname, search: d.search, hash: d.hash, query: ce(d), state: null, key: "" }, intent: "preload" }));
    }
    E = O;
  }
  function be() {
    const d = getRequestEvent();
    return d && d.router && d.router.submission ? [d.router.submission] : [];
  }
}
function Ge(e, t, n, o) {
  const { base: r, location: a, params: s } = e, { pattern: i, component: h, preload: c } = o().route, f = createMemo(() => o().path);
  h && h.preload && h.preload();
  const v = c ? c({ params: s, location: a, intent: E || "initial" }) : void 0;
  return { parent: t, pattern: i, path: f, outlet: () => h ? createComponent$1(h, { params: s, location: a, data: v, get children() {
    return n();
  } }) : n(), resolvePath(g) {
    return W(r.path(), g, f());
  } };
}
const me = (e) => (t) => {
  const { base: n } = t, o = children(() => t.children), r = createMemo(() => fe(o(), t.base || ""));
  let a;
  const s = Ve(e, r, () => a, { base: n, singleFlight: t.singleFlight, transformUrl: t.transformUrl });
  return e.create && e.create(s), createComponent(We.Provider, { value: s, get children() {
    return createComponent(Je, { routerState: s, get root() {
      return t.root;
    }, get preload() {
      return t.rootPreload || t.rootLoad;
    }, get children() {
      return [(a = getOwner()) && null, createComponent(Xe, { routerState: s, get branches() {
        return r();
      } })];
    } });
  } });
};
function Je(e) {
  const t = e.routerState.location, n = e.routerState.params, o = createMemo(() => e.preload && untrack(() => {
    e.preload({ params: n, location: t, intent: He() || "initial" });
  }));
  return createComponent(Show, { get when() {
    return e.root;
  }, keyed: true, get fallback() {
    return e.children;
  }, children: (r) => createComponent(r, { params: n, location: t, get data() {
    return o();
  }, get children() {
    return e.children;
  } }) });
}
function Xe(e) {
  if (isServer) {
    const r = getRequestEvent();
    if (r && r.router && r.router.dataOnly) {
      Qe(r, e.routerState, e.branches);
      return;
    }
    r && ((r.router || (r.router = {})).matches || (r.router.matches = e.routerState.matches().map(({ route: a, path: s, params: i }) => ({ path: a.originalPath, pattern: a.pattern, match: s, params: i, info: a.info }))));
  }
  const t = [];
  let n;
  const o = createMemo(on(e.routerState.matches, (r, a, s) => {
    let i = a && r.length === a.length;
    const h = [];
    for (let c = 0, f = r.length; c < f; c++) {
      const v = a && a[c], m = r[c];
      s && v && m.route.key === v.route.key ? h[c] = s[c] : (i = false, t[c] && t[c](), createRoot((g) => {
        t[c] = g, h[c] = Ge(e.routerState, h[c - 1] || e.routerState.base, ee(() => o()[c + 1]), () => {
          var _a;
          const b = e.routerState.matches();
          return (_a = b[c]) != null ? _a : b[0];
        });
      }));
    }
    return t.splice(r.length).forEach((c) => c()), s && i ? s : (n = h[0], h);
  }));
  return ee(() => o() && n)();
}
const ee = (e) => () => createComponent(Show, { get when() {
  return e();
}, keyed: true, children: (t) => createComponent(he.Provider, { value: t, get children() {
  return t.outlet();
} }) });
function Qe(e, t, n) {
  const o = new URL(e.request.url), r = q(n, new URL(e.router.previousUrl || e.request.url).pathname), a = q(n, o.pathname);
  for (let s = 0; s < a.length; s++) {
    (!r[s] || a[s].route !== r[s].route) && (e.router.dataOnly = true);
    const { route: i, params: h } = a[s];
    i.preload && i.preload({ params: h, location: t.location, intent: "preload" });
  }
}
function Ye([e, t], n, o) {
  return [e, o ? (r) => t(o(r)) : t];
}
function Ze(e) {
  let t = false;
  const n = (r) => typeof r == "string" ? { value: r } : r, o = Ye(createSignal(n(e.get()), { equals: (r, a) => r.value === a.value && r.state === a.state }), void 0, (r) => (!t && e.set(r), sharedConfig.registry && !sharedConfig.done && (sharedConfig.done = true), r));
  return e.init && onCleanup(e.init((r = e.get()) => {
    t = true, o[1](n(r)), t = false;
  })), me({ signal: o, create: e.create, utils: e.utils });
}
function et(e, t, n) {
  return e.addEventListener(t, n), () => e.removeEventListener(t, n);
}
function tt(e, t) {
  const n = e && document.getElementById(e);
  n ? n.scrollIntoView() : t && window.scrollTo(0, 0);
}
function rt(e) {
  const t = new URL(e);
  return t.pathname + t.search;
}
function nt(e) {
  let t;
  const n = { value: e.url || (t = getRequestEvent()) && rt(t.request.url) || "" };
  return me({ signal: [() => n, (o) => Object.assign(n, o)] })(e);
}
const ot = /* @__PURE__ */ new Map();
function at({ preload: e = true, explicitLinks: t = false, actionBase: n = "/_server", transformUrl: o } = {}) {
  return (r) => {
    const a = r.base.path(), s = r.navigatorFactory(r.base);
    let i, h;
    function c(l) {
      return l.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function f(l) {
      if (l.defaultPrevented || l.button !== 0 || l.metaKey || l.altKey || l.ctrlKey || l.shiftKey) return;
      const u = l.composedPath().find((j) => j instanceof Node && j.nodeName.toUpperCase() === "A");
      if (!u || t && !u.hasAttribute("link")) return;
      const y = c(u), w = y ? u.href.baseVal : u.href;
      if ((y ? u.target.baseVal : u.target) || !w && !u.hasAttribute("state")) return;
      const L = (u.getAttribute("rel") || "").split(/\s+/);
      if (u.hasAttribute("download") || L && L.includes("external")) return;
      const C = y ? new URL(w, document.baseURI) : new URL(w);
      if (!(C.origin !== window.location.origin || a && C.pathname && !C.pathname.toLowerCase().startsWith(a.toLowerCase()))) return [u, C];
    }
    function v(l) {
      const u = f(l);
      if (!u) return;
      const [y, w] = u, A = r.parsePath(w.pathname + w.search + w.hash), L = y.getAttribute("state");
      l.preventDefault(), s(A, { resolve: false, replace: y.hasAttribute("replace"), scroll: !y.hasAttribute("noscroll"), state: L ? JSON.parse(L) : void 0 });
    }
    function m(l) {
      const u = f(l);
      if (!u) return;
      const [y, w] = u;
      o && (w.pathname = o(w.pathname)), r.preloadRoute(w, y.getAttribute("preload") !== "false");
    }
    function g(l) {
      clearTimeout(i);
      const u = f(l);
      if (!u) return h = null;
      const [y, w] = u;
      h !== y && (o && (w.pathname = o(w.pathname)), i = setTimeout(() => {
        r.preloadRoute(w, y.getAttribute("preload") !== "false"), h = y;
      }, 20));
    }
    function b(l) {
      if (l.defaultPrevented) return;
      let u = l.submitter && l.submitter.hasAttribute("formaction") ? l.submitter.getAttribute("formaction") : l.target.getAttribute("action");
      if (!u) return;
      if (!u.startsWith("https://action/")) {
        const w = new URL(u, ie);
        if (u = r.parsePath(w.pathname + w.search), !u.startsWith(n)) return;
      }
      if (l.target.method.toUpperCase() !== "POST") throw new Error("Only POST forms are supported for Actions");
      const y = ot.get(u);
      if (y) {
        l.preventDefault();
        const w = new FormData(l.target, l.submitter);
        y.call({ r, f: l.target }, l.target.enctype === "multipart/form-data" ? w : new URLSearchParams(w));
      }
    }
    delegateEvents(["click", "submit"]), document.addEventListener("click", v), e && (document.addEventListener("mousemove", g, { passive: true }), document.addEventListener("focusin", m, { passive: true }), document.addEventListener("touchstart", m, { passive: true })), document.addEventListener("submit", b), onCleanup(() => {
      document.removeEventListener("click", v), e && (document.removeEventListener("mousemove", g), document.removeEventListener("focusin", m), document.removeEventListener("touchstart", m)), document.removeEventListener("submit", b);
    });
  };
}
function st(e) {
  if (isServer) return nt(e);
  const t = () => {
    const o = window.location.pathname.replace(/^\/+/, "/") + window.location.search, r = window.history.state && window.history.state._depth && Object.keys(window.history.state).length === 1 ? void 0 : window.history.state;
    return { value: o + window.location.hash, state: r };
  }, n = se();
  return Ze({ get: t, set({ value: o, replace: r, scroll: a, state: s }) {
    r ? window.history.replaceState(Be(s), "", o) : window.history.pushState(s, "", o), tt(decodeURIComponent(window.location.hash.slice(1)), a), J();
  }, init: (o) => et(window, "popstate", Fe(o, (r) => {
    if (r) return !n.confirm(r);
    {
      const a = t();
      return !n.confirm(a.value, { state: a.state });
    }
  })), create: at({ preload: e.preload, explicitLinks: e.explicitLinks, actionBase: e.actionBase, transformUrl: e.transformUrl }), utils: { go: (o) => window.history.go(o), beforeLeave: n } })(e);
}
var it = ["<svg", ' class="h-5 w-5 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'], ct = ["<svg", ' class="h-5 w-5 text-[var(--color-error)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'], lt = ["<svg", ' class="h-5 w-5 text-[var(--color-info)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'], ut = ["<svg", ' class="h-5 w-5 text-[var(--color-warning)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>'], ht = ["<div", ' class="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-80">', "</div>"], dt = ["<div", ' class="', '" role="alert"><span class="shrink-0 mt-0.5">', '</span><div class="flex-1 min-w-0"><p class="text-sm font-medium text-[var(--color-text)]">', "</p><!--$-->", '<!--/--></div><button type="button" class="shrink-0 text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] cursor-pointer" aria-label="Dismiss"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>'], ft = ["<p", ' class="text-xs text-[var(--color-text-secondary)] mt-0.5">', "</p>"];
const mt = { success: ssr(it, ssrHydrationKey()), error: ssr(ct, ssrHydrationKey()), info: ssr(lt, ssrHydrationKey()), warning: ssr(ut, ssrHydrationKey()) }, pt = { success: "border-l-4 border-[var(--color-success)]", error: "border-l-4 border-[var(--color-error)]", info: "border-l-4 border-[var(--color-info)]", warning: "border-l-4 border-[var(--color-warning)]" }, gt = () => {
  const [e, t] = createSignal([]);
  return onCleanup(() => {
  }), createComponent(Portal, { get children() {
    return ssr(ht, ssrHydrationKey(), escape(createComponent(For, { get each() {
      return e();
    }, children: (n) => ssr(dt, ssrHydrationKey(), `
                toast-enter bg-white rounded-lg shadow-lg p-4 flex items-start gap-3
                ${escape(pt[n.type], true)}
              `, escape(mt[n.type]), escape(n.message), n.description && ssr(ft, ssrHydrationKey(), escape(n.description))) })));
  } });
};
var wt = ["<div", ' class="flex items-center justify-center min-h-screen bg-[var(--color-surface-secondary)]"><span class="h-8 w-8 block rounded-full border-2 border-current border-t-transparent animate-spin text-[var(--color-primary)]"></span></div>'];
function Pt() {
  return createComponent(st, { root: (e) => [createComponent(Suspense, { get fallback() {
    return ssr(wt, ssrHydrationKey());
  }, get children() {
    return e.children;
  } }), createComponent(gt, {})], get children() {
    return createComponent(au, {});
  } });
}

export { Pt as default };
//# sourceMappingURL=app-uwcYTPv8.mjs.map
