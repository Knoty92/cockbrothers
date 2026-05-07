import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import destr from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, createError, sendRedirect, proxyRequest, getRequestURL, setResponseStatus, getResponseHeader, setResponseHeaders, send, getRequestHeader, removeResponseHeader, appendResponseHeader, setResponseHeader, H3Event, getRequestIP, parseCookies, getResponseStatus, getResponseStatusText, getCookie, setCookie, getResponseHeaders, getRequestWebStream, setHeader, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs';
import { createHooks } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/node-mock-http@1.0.4/node_modules/node-mock-http/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, decodePath, withLeadingSlash, withoutTrailingSlash } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_drizzle-orm@0.41.0_@opentelemetry+api@1.9.1_@types+pg@8.15.6_8110e06675a72f3bef1321277b073dd1/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_drizzle-orm@0.41.0_@opentelemetry+api@1.9.1_@types+pg@8.15.6_8110e06675a72f3bef1321277b073dd1/node_modules/unstorage/drivers/fs.mjs';
import unstorage_47drivers_47fs_45lite from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_drizzle-orm@0.41.0_@opentelemetry+api@1.9.1_@types+pg@8.15.6_8110e06675a72f3bef1321277b073dd1/node_modules/unstorage/drivers/fs-lite.mjs';
import { digest } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import _ssPrHrnBEydIxD7JwR9wxVELHSeB5ibPhnM3oRlQ1mY from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/vinxi@0.5.11_@types+node@25.6.0_db0@0.3.4_drizzle-orm@0.41.0_@opentelemetry+api@1.9.1_@_a4dec95cd6a71fa47c307ea28a95ef18/node_modules/vinxi/lib/app-fetch.js';
import _lFG9m1zjfhdV0uGGalQCBuhO6pGskTRU18qkHZCkEOc from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/vinxi@0.5.11_@types+node@25.6.0_db0@0.3.4_drizzle-orm@0.41.0_@opentelemetry+api@1.9.1_@_a4dec95cd6a71fa47c307ea28a95ef18/node_modules/vinxi/lib/app-manifest.js';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import { sharedConfig, lazy, createComponent, catchError, onCleanup } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/solid-js@1.9.12/node_modules/solid-js/dist/server.js';
import { renderToString, isServer, getRequestEvent, ssrElement, escape, mergeProps, ssr, createComponent as createComponent$1, ssrHydrationKey, NoHydration, ssrAttribute } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/solid-js@1.9.12/node_modules/solid-js/web/dist/server.js';
import { provideRequestEvent } from 'file:///home/node/.openclaw/workspace/cockbrothers/node_modules/.pnpm/solid-js@1.9.12/node_modules/solid-js/web/storage/dist/storage.js';

const serverAssets = [{"baseName":"server","dir":"/home/node/.openclaw/workspace/cockbrothers/apps/frontend/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));
storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/home/node/.openclaw/workspace/cockbrothers/apps/frontend"}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/home/node/.openclaw/workspace/cockbrothers/apps/frontend"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/home/node/.openclaw/workspace/cockbrothers/apps/frontend/.vinxi"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/home/node/.openclaw/workspace/cockbrothers/apps/frontend/.vinxi/cache"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {};



const appConfig$1 = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/"
  },
  "nitro": {
    "routeRules": {
      "/_build/assets/**": {
        "headers": {
          "cache-control": "public, immutable, max-age=31536000"
        }
      }
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  {
    return _sharedRuntimeConfig;
  }
}
_deepFreeze(klona(appConfig$1));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const nitroAsyncContext = getContext("nitro-app", {
  asyncContext: true,
  AsyncLocalStorage: AsyncLocalStorage 
});

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$0 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const appConfig = {"name":"vinxi","routers":[{"name":"public","type":"static","base":"/","dir":"./public","root":"/home/node/.openclaw/workspace/cockbrothers/apps/frontend","order":0,"outDir":"/home/node/.openclaw/workspace/cockbrothers/apps/frontend/.vinxi/build/public"},{"name":"ssr","type":"http","link":{"client":"client"},"handler":"src/entry-server.tsx","extensions":["js","jsx","ts","tsx"],"target":"server","root":"/home/node/.openclaw/workspace/cockbrothers/apps/frontend","base":"/","outDir":"/home/node/.openclaw/workspace/cockbrothers/apps/frontend/.vinxi/build/ssr","order":1},{"name":"client","type":"client","base":"/_build","handler":"src/entry-client.tsx","extensions":["js","jsx","ts","tsx"],"target":"browser","root":"/home/node/.openclaw/workspace/cockbrothers/apps/frontend","outDir":"/home/node/.openclaw/workspace/cockbrothers/apps/frontend/.vinxi/build/client","order":2},{"name":"server-fns","type":"http","base":"/_server","handler":"../../node_modules/.pnpm/@solidjs+start@1.3.2_solid-js@1.9.12_vinxi@0.5.11_@types+node@25.6.0_db0@0.3.4_drizzle-_e913b783da6112b1de10edf297c27947/node_modules/@solidjs/start/dist/runtime/server-handler.js","target":"server","root":"/home/node/.openclaw/workspace/cockbrothers/apps/frontend","outDir":"/home/node/.openclaw/workspace/cockbrothers/apps/frontend/.vinxi/build/server-fns","order":3}],"server":{"compressPublicAssets":{"brotli":true},"routeRules":{"/_build/assets/**":{"headers":{"cache-control":"public, immutable, max-age=31536000"}}},"experimental":{"asyncContext":true},"preset":"vercel","prerender":{}},"root":"/home/node/.openclaw/workspace/cockbrothers/apps/frontend"};
					const buildManifest = {"ssr":{"src/routes/api/integrations/printful/connect.ts?pick=GET":{"file":"connect.js","name":"connect","src":"src/routes/api/integrations/printful/connect.ts?pick=GET","isEntry":true,"isDynamicEntry":true},"src/routes/api/integrations/printful/connect.ts?pick=POST":{"file":"connect2.js","name":"connect","src":"src/routes/api/integrations/printful/connect.ts?pick=POST","isEntry":true,"isDynamicEntry":true},"src/routes/api/integrations/printify/connect.ts?pick=GET":{"file":"connect3.js","name":"connect","src":"src/routes/api/integrations/printify/connect.ts?pick=GET","isEntry":true,"isDynamicEntry":true},"src/routes/api/integrations/printify/connect.ts?pick=POST":{"file":"connect4.js","name":"connect","src":"src/routes/api/integrations/printify/connect.ts?pick=POST","isEntry":true,"isDynamicEntry":true},"src/routes/api/payments/subscribe.ts?pick=POST":{"file":"subscribe.js","name":"subscribe","src":"src/routes/api/payments/subscribe.ts?pick=POST","isEntry":true,"isDynamicEntry":true},"src/routes/api/payments/webhook.ts?pick=POST":{"file":"webhook.js","name":"webhook","src":"src/routes/api/payments/webhook.ts?pick=POST","isEntry":true,"isDynamicEntry":true},"virtual:$vinxi/handler/ssr":{"file":"ssr.js","name":"ssr","src":"virtual:$vinxi/handler/ssr","isEntry":true,"dynamicImports":["src/routes/api/integrations/printful/connect.ts?pick=GET","src/routes/api/integrations/printful/connect.ts?pick=GET","src/routes/api/integrations/printful/connect.ts?pick=GET","src/routes/api/integrations/printful/connect.ts?pick=GET","src/routes/api/integrations/printful/connect.ts?pick=POST","src/routes/api/integrations/printful/connect.ts?pick=POST","src/routes/api/integrations/printify/connect.ts?pick=GET","src/routes/api/integrations/printify/connect.ts?pick=GET","src/routes/api/integrations/printify/connect.ts?pick=GET","src/routes/api/integrations/printify/connect.ts?pick=GET","src/routes/api/integrations/printify/connect.ts?pick=POST","src/routes/api/integrations/printify/connect.ts?pick=POST","src/routes/api/payments/subscribe.ts?pick=POST","src/routes/api/payments/subscribe.ts?pick=POST","src/routes/api/payments/webhook.ts?pick=POST","src/routes/api/payments/webhook.ts?pick=POST"]}},"client":{"_AppShell-WHtggxiC.js":{"file":"assets/AppShell-WHtggxiC.js","name":"AppShell","imports":["_web-mN2KxWEl.js","_routing-B87cVCyJ.js","_Footer-DQsUiqGK.js","_Toast-DDyDzXhG.js"]},"_Badge-yEfM1VDs.js":{"file":"assets/Badge-yEfM1VDs.js","name":"Badge","imports":["_web-mN2KxWEl.js"]},"_BrandKitCreator-DX-QcfaX.js":{"file":"assets/BrandKitCreator-DX-QcfaX.js","name":"BrandKitCreator","imports":["_web-mN2KxWEl.js"]},"_BrandScoreIndicator-CvjaESeD.js":{"file":"assets/BrandScoreIndicator-CvjaESeD.js","name":"BrandScoreIndicator","imports":["_web-mN2KxWEl.js"]},"_Button-DNjmkYUH.js":{"file":"assets/Button-DNjmkYUH.js","name":"Button","imports":["_web-mN2KxWEl.js"]},"_Card-CeLD8oo-.js":{"file":"assets/Card-CeLD8oo-.js","name":"Card","imports":["_web-mN2KxWEl.js"]},"_Footer-DQsUiqGK.js":{"file":"assets/Footer-DQsUiqGK.js","name":"Footer","imports":["_web-mN2KxWEl.js"]},"_Input-CwjbpEBN.js":{"file":"assets/Input-CwjbpEBN.js","name":"Input","imports":["_web-mN2KxWEl.js"]},"_Toast-DDyDzXhG.js":{"file":"assets/Toast-DDyDzXhG.js","name":"Toast","imports":["_web-mN2KxWEl.js"]},"_client-D8T4IjhQ.js":{"file":"assets/client-D8T4IjhQ.js","name":"client"},"_components-D43TbKj7.js":{"file":"assets/components-D43TbKj7.js","name":"components","imports":["_web-mN2KxWEl.js","_routing-B87cVCyJ.js"]},"_mockupStore-B00iTYtE.js":{"file":"assets/mockupStore-B00iTYtE.js","name":"mockupStore","isDynamicEntry":true,"imports":["_store-BNroEFDV.js","_client-D8T4IjhQ.js"]},"_preload-helper-ug3pwPZ1.js":{"file":"assets/preload-helper-ug3pwPZ1.js","name":"preload-helper"},"_routing-B87cVCyJ.js":{"file":"assets/routing-B87cVCyJ.js","name":"routing","imports":["_web-mN2KxWEl.js"]},"_store-BNroEFDV.js":{"file":"assets/store-BNroEFDV.js","name":"store","imports":["_web-mN2KxWEl.js"]},"_templateStore-LDP1F54B.js":{"file":"assets/templateStore-LDP1F54B.js","name":"templateStore","imports":["_store-BNroEFDV.js","src/lib/api/templates.ts"]},"_useBrand-yWCYCryg.js":{"file":"assets/useBrand-yWCYCryg.js","name":"useBrand","imports":["_web-mN2KxWEl.js","_preload-helper-ug3pwPZ1.js","_store-BNroEFDV.js"],"dynamicImports":["src/lib/api/brands.ts","src/lib/api/brands.ts","src/lib/api/brands.ts","src/lib/api/brands.ts","src/lib/api/brands.ts","src/lib/api/brands.ts","src/lib/api/brands.ts","src/lib/api/brands.ts"]},"_web-mN2KxWEl.js":{"file":"assets/web-mN2KxWEl.js","name":"web"},"src/lib/api/brands.ts":{"file":"assets/brands-CQuAh464.js","name":"brands","src":"src/lib/api/brands.ts","isDynamicEntry":true},"src/lib/api/templates.ts":{"file":"assets/templates-LBMqgP8d.js","name":"templates","src":"src/lib/api/templates.ts","isDynamicEntry":true,"imports":["_client-D8T4IjhQ.js"]},"src/routes/dashboard/analytics.tsx?pick=default&pick=$css":{"file":"assets/analytics-CVg9lQOD.js","name":"analytics","src":"src/routes/dashboard/analytics.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_AppShell-WHtggxiC.js","_Card-CeLD8oo-.js","_routing-B87cVCyJ.js","_Footer-DQsUiqGK.js","_Toast-DDyDzXhG.js"]},"src/routes/dashboard/brands/[id].tsx?pick=default&pick=$css":{"file":"assets/_id_-BYM75TRm.js","name":"_id_","src":"src/routes/dashboard/brands/[id].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_useBrand-yWCYCryg.js","_BrandKitCreator-DX-QcfaX.js","_BrandScoreIndicator-CvjaESeD.js","_routing-B87cVCyJ.js","_preload-helper-ug3pwPZ1.js","_store-BNroEFDV.js"]},"src/routes/dashboard/brands/index.tsx?pick=default&pick=$css":{"file":"assets/index-DQ0NSVk_.js","name":"index","src":"src/routes/dashboard/brands/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_useBrand-yWCYCryg.js","_BrandScoreIndicator-CvjaESeD.js","_routing-B87cVCyJ.js","_preload-helper-ug3pwPZ1.js","_store-BNroEFDV.js"]},"src/routes/dashboard/brands/new.tsx?pick=default&pick=$css":{"file":"assets/new-DEN4KOWF.js","name":"new","src":"src/routes/dashboard/brands/new.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_useBrand-yWCYCryg.js","_BrandKitCreator-DX-QcfaX.js","_routing-B87cVCyJ.js","_preload-helper-ug3pwPZ1.js","_store-BNroEFDV.js"]},"src/routes/dashboard/index.tsx?pick=default&pick=$css":{"file":"assets/index-BY3aQfKW.js","name":"index","src":"src/routes/dashboard/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_AppShell-WHtggxiC.js","_Card-CeLD8oo-.js","_Button-DNjmkYUH.js","_Badge-yEfM1VDs.js","_components-D43TbKj7.js","_routing-B87cVCyJ.js","_Footer-DQsUiqGK.js","_Toast-DDyDzXhG.js"]},"src/routes/dashboard/integrations/index.tsx?pick=default&pick=$css":{"file":"assets/index-BPO61Of1.js","name":"index","src":"src/routes/dashboard/integrations/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_store-BNroEFDV.js"]},"src/routes/dashboard/mockups/index.tsx?pick=default&pick=$css":{"file":"assets/index-BIE36n4m.js","name":"index","src":"src/routes/dashboard/mockups/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_AppShell-WHtggxiC.js","_Card-CeLD8oo-.js","_Button-DNjmkYUH.js","_Badge-yEfM1VDs.js","_components-D43TbKj7.js","_routing-B87cVCyJ.js","_Footer-DQsUiqGK.js","_Toast-DDyDzXhG.js"]},"src/routes/dashboard/products/[id].tsx?pick=default&pick=$css":{"file":"assets/_id_-BYehx88Z.js","name":"_id_","src":"src/routes/dashboard/products/[id].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_preload-helper-ug3pwPZ1.js","_web-mN2KxWEl.js","_mockupStore-B00iTYtE.js","_routing-B87cVCyJ.js","_store-BNroEFDV.js","_client-D8T4IjhQ.js"],"dynamicImports":["src/lib/api/brands.ts","src/lib/api/templates.ts","_mockupStore-B00iTYtE.js"]},"src/routes/dashboard/products/index.tsx?pick=default&pick=$css":{"file":"assets/index-jUIDdaJo.js","name":"index","src":"src/routes/dashboard/products/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_mockupStore-B00iTYtE.js","_store-BNroEFDV.js","_client-D8T4IjhQ.js"]},"src/routes/dashboard/settings/billing.tsx?pick=default&pick=$css":{"file":"assets/billing-BmsDcYlL.js","name":"billing","src":"src/routes/dashboard/settings/billing.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_AppShell-WHtggxiC.js","_Card-CeLD8oo-.js","_Button-DNjmkYUH.js","_Badge-yEfM1VDs.js","_Toast-DDyDzXhG.js","_components-D43TbKj7.js","_routing-B87cVCyJ.js","_Footer-DQsUiqGK.js"]},"src/routes/dashboard/settings/index.tsx?pick=default&pick=$css":{"file":"assets/index-B3TWSIsR.js","name":"index","src":"src/routes/dashboard/settings/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_AppShell-WHtggxiC.js","_Card-CeLD8oo-.js","_Input-CwjbpEBN.js","_Button-DNjmkYUH.js","_Toast-DDyDzXhG.js","_routing-B87cVCyJ.js","_Footer-DQsUiqGK.js"]},"src/routes/dashboard/templates/[id].tsx?pick=default&pick=$css":{"file":"assets/_id_-B23SXld-.js","name":"_id_","src":"src/routes/dashboard/templates/[id].tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_preload-helper-ug3pwPZ1.js","_web-mN2KxWEl.js","_templateStore-LDP1F54B.js","_routing-B87cVCyJ.js","_store-BNroEFDV.js","src/lib/api/templates.ts","_client-D8T4IjhQ.js"],"dynamicImports":["src/lib/api/templates.ts","src/lib/api/templates.ts"]},"src/routes/dashboard/templates/index.tsx?pick=default&pick=$css":{"file":"assets/index-CuOjXPa5.js","name":"index","src":"src/routes/dashboard/templates/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_templateStore-LDP1F54B.js","_store-BNroEFDV.js","src/lib/api/templates.ts","_client-D8T4IjhQ.js"]},"src/routes/index.tsx?pick=default&pick=$css":{"file":"assets/index-Bu2R4vEs.js","name":"index","src":"src/routes/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_Button-DNjmkYUH.js","_Card-CeLD8oo-.js","_Footer-DQsUiqGK.js","_routing-B87cVCyJ.js","_components-D43TbKj7.js"]},"src/routes/login.tsx?pick=default&pick=$css":{"file":"assets/login-BvOluor0.js","name":"login","src":"src/routes/login.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_Button-DNjmkYUH.js","_Input-CwjbpEBN.js","_Card-CeLD8oo-.js","_routing-B87cVCyJ.js","_components-D43TbKj7.js"]},"src/routes/pricing.tsx?pick=default&pick=$css":{"file":"assets/pricing-yljqYrz9.js","name":"pricing","src":"src/routes/pricing.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_Button-DNjmkYUH.js","_Footer-DQsUiqGK.js","_routing-B87cVCyJ.js","_components-D43TbKj7.js"]},"src/routes/register.tsx?pick=default&pick=$css":{"file":"assets/register-DUGgMgNg.js","name":"register","src":"src/routes/register.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-mN2KxWEl.js","_Button-DNjmkYUH.js","_Input-CwjbpEBN.js","_Card-CeLD8oo-.js","_routing-B87cVCyJ.js","_components-D43TbKj7.js"]},"virtual:$vinxi/handler/client":{"file":"assets/client-4uR9Jg9n.js","name":"client","src":"virtual:$vinxi/handler/client","isEntry":true,"imports":["_web-mN2KxWEl.js","_preload-helper-ug3pwPZ1.js","_Toast-DDyDzXhG.js","_routing-B87cVCyJ.js"],"dynamicImports":["src/routes/dashboard/analytics.tsx?pick=default&pick=$css","src/routes/dashboard/brands/[id].tsx?pick=default&pick=$css","src/routes/dashboard/brands/index.tsx?pick=default&pick=$css","src/routes/dashboard/brands/new.tsx?pick=default&pick=$css","src/routes/dashboard/index.tsx?pick=default&pick=$css","src/routes/dashboard/integrations/index.tsx?pick=default&pick=$css","src/routes/dashboard/mockups/index.tsx?pick=default&pick=$css","src/routes/dashboard/products/[id].tsx?pick=default&pick=$css","src/routes/dashboard/products/index.tsx?pick=default&pick=$css","src/routes/dashboard/settings/billing.tsx?pick=default&pick=$css","src/routes/dashboard/settings/index.tsx?pick=default&pick=$css","src/routes/dashboard/templates/[id].tsx?pick=default&pick=$css","src/routes/dashboard/templates/index.tsx?pick=default&pick=$css","src/routes/index.tsx?pick=default&pick=$css","src/routes/login.tsx?pick=default&pick=$css","src/routes/pricing.tsx?pick=default&pick=$css","src/routes/register.tsx?pick=default&pick=$css"],"css":["assets/client-Bd3Yeva5.css"]}},"server-fns":{"_server-fns-0nXnM13H.js":{"file":"assets/server-fns-0nXnM13H.js","name":"server-fns","dynamicImports":["src/routes/api/integrations/printful/connect.ts?pick=GET","src/routes/api/integrations/printful/connect.ts?pick=GET","src/routes/api/integrations/printful/connect.ts?pick=GET","src/routes/api/integrations/printful/connect.ts?pick=GET","src/routes/api/integrations/printful/connect.ts?pick=POST","src/routes/api/integrations/printful/connect.ts?pick=POST","src/routes/api/integrations/printify/connect.ts?pick=GET","src/routes/api/integrations/printify/connect.ts?pick=GET","src/routes/api/integrations/printify/connect.ts?pick=GET","src/routes/api/integrations/printify/connect.ts?pick=GET","src/routes/api/integrations/printify/connect.ts?pick=POST","src/routes/api/integrations/printify/connect.ts?pick=POST","src/routes/api/payments/subscribe.ts?pick=POST","src/routes/api/payments/subscribe.ts?pick=POST","src/routes/api/payments/webhook.ts?pick=POST","src/routes/api/payments/webhook.ts?pick=POST","src/app.tsx"]},"src/app.tsx":{"file":"assets/app-BvOtGpCX.js","name":"app","src":"src/app.tsx","isDynamicEntry":true,"imports":["_server-fns-0nXnM13H.js"],"css":["assets/app-Bd3Yeva5.css"]},"src/routes/api/integrations/printful/connect.ts?pick=GET":{"file":"connect.js","name":"connect","src":"src/routes/api/integrations/printful/connect.ts?pick=GET","isEntry":true,"isDynamicEntry":true},"src/routes/api/integrations/printful/connect.ts?pick=POST":{"file":"connect2.js","name":"connect","src":"src/routes/api/integrations/printful/connect.ts?pick=POST","isEntry":true,"isDynamicEntry":true},"src/routes/api/integrations/printify/connect.ts?pick=GET":{"file":"connect3.js","name":"connect","src":"src/routes/api/integrations/printify/connect.ts?pick=GET","isEntry":true,"isDynamicEntry":true},"src/routes/api/integrations/printify/connect.ts?pick=POST":{"file":"connect4.js","name":"connect","src":"src/routes/api/integrations/printify/connect.ts?pick=POST","isEntry":true,"isDynamicEntry":true},"src/routes/api/payments/subscribe.ts?pick=POST":{"file":"subscribe.js","name":"subscribe","src":"src/routes/api/payments/subscribe.ts?pick=POST","isEntry":true,"isDynamicEntry":true},"src/routes/api/payments/webhook.ts?pick=POST":{"file":"webhook.js","name":"webhook","src":"src/routes/api/payments/webhook.ts?pick=POST","isEntry":true,"isDynamicEntry":true},"virtual:$vinxi/handler/server-fns":{"file":"server-fns.js","name":"server-fns","src":"virtual:$vinxi/handler/server-fns","isEntry":true,"imports":["_server-fns-0nXnM13H.js"]}}};

					const routeManifest = {"ssr":{},"client":{},"server-fns":{}};

        function createProdApp(appConfig) {
          return {
            config: { ...appConfig, buildManifest, routeManifest },
            getRouter(name) {
              return appConfig.routers.find(router => router.name === name)
            }
          }
        }

        function plugin(app) {
          const prodApp = createProdApp(appConfig);
          globalThis.app = prodApp;
        }

const chunks = {};
			 



			 function app() {
				 globalThis.$$chunks = chunks;
			 }

const plugins = [
  plugin,
_ssPrHrnBEydIxD7JwR9wxVELHSeB5ibPhnM3oRlQ1mY,
_lFG9m1zjfhdV0uGGalQCBuhO6pGskTRU18qkHZCkEOc,
app
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const __Zp5N9 = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
function Wr(e, t) {
  const r = (e || "").split(";").filter((c) => typeof c == "string" && !!c.trim()), n = r.shift() || "", a = Gr(n), o = a.name;
  let i = a.value;
  try {
    i = (t == null ? void 0 : t.decode) === false ? i : ((t == null ? void 0 : t.decode) || decodeURIComponent)(i);
  } catch {
  }
  const u = { name: o, value: i };
  for (const c of r) {
    const l = c.split("="), p = (l.shift() || "").trimStart().toLowerCase(), d = l.join("=");
    switch (p) {
      case "expires": {
        u.expires = new Date(d);
        break;
      }
      case "max-age": {
        u.maxAge = Number.parseInt(d, 10);
        break;
      }
      case "secure": {
        u.secure = true;
        break;
      }
      case "httponly": {
        u.httpOnly = true;
        break;
      }
      case "samesite": {
        u.sameSite = d;
        break;
      }
      default:
        u[p] = d;
    }
  }
  return u;
}
function Gr(e) {
  let t = "", r = "";
  const n = e.split("=");
  return n.length > 1 ? (t = n.shift(), r = n.join("=")) : r = e, { name: t, value: r };
}
function Xr(e = {}) {
  let t, r = false;
  const n = (i) => {
    if (t && t !== i) throw new Error("Context conflict");
  };
  let a;
  if (e.asyncContext) {
    const i = e.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    i ? a = new i() : console.warn("[unctx] `AsyncLocalStorage` is not provided.");
  }
  const o = () => {
    if (a) {
      const i = a.getStore();
      if (i !== void 0) return i;
    }
    return t;
  };
  return { use: () => {
    const i = o();
    if (i === void 0) throw new Error("Context is not available");
    return i;
  }, tryUse: () => o(), set: (i, u) => {
    u || n(i), t = i, r = true;
  }, unset: () => {
    t = void 0, r = false;
  }, call: (i, u) => {
    n(i), t = i;
    try {
      return a ? a.run(i, u) : u();
    } finally {
      r || (t = void 0);
    }
  }, async callAsync(i, u) {
    t = i;
    const c = () => {
      t = i;
    }, l = () => t === i ? c : void 0;
    Me$1.add(l);
    try {
      const p = a ? a.run(i, u) : u();
      return r || (t = void 0), await p;
    } finally {
      Me$1.delete(l);
    }
  } };
}
function Jr(e = {}) {
  const t = {};
  return { get(r, n = {}) {
    return t[r] || (t[r] = Xr({ ...e, ...n })), t[r];
  } };
}
const oe = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof global < "u" ? global : {}, He$1 = "__unctx__", Yr = oe[He$1] || (oe[He$1] = Jr()), Kr = (e, t = {}) => Yr.get(e, t), qe$1 = "__unctx_async_handlers__", Me$1 = oe[qe$1] || (oe[qe$1] = /* @__PURE__ */ new Set());
function Qr(e) {
  let t;
  const r = mt(e), n = { duplex: "half", method: e.method, headers: e.headers };
  return e.node.req.body instanceof ArrayBuffer ? new Request(r, { ...n, body: e.node.req.body }) : new Request(r, { ...n, get body() {
    return t || (t = cn(e), t);
  } });
}
function Zr(e) {
  var _a2;
  return (_a2 = e.web) != null ? _a2 : e.web = { request: Qr(e), url: mt(e) }, e.web.request;
}
function en() {
  return dn();
}
const bt = /* @__PURE__ */ Symbol("$HTTPEvent");
function tn(e) {
  return typeof e == "object" && (e instanceof H3Event || (e == null ? void 0 : e[bt]) instanceof H3Event || (e == null ? void 0 : e.__is_event__) === true);
}
function S(e) {
  return function(...t) {
    var _a2;
    let r = t[0];
    if (tn(r)) t[0] = r instanceof H3Event || r.__is_event__ ? r : r[bt];
    else {
      if (!((_a2 = globalThis.app.config.server.experimental) == null ? void 0 : _a2.asyncContext)) throw new Error("AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.");
      if (r = en(), !r) throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");
      t.unshift(r);
    }
    return e(...t);
  };
}
const mt = S(getRequestURL), rn = S(getRequestIP), ie = S(setResponseStatus), Be$1 = S(getResponseStatus), nn = S(getResponseStatusText), se = S(getResponseHeaders), Ve$1 = S(getResponseHeader), sn = S(setResponseHeader), yt = S(appendResponseHeader), an = S(parseCookies), on = S(getCookie), un = S(setCookie), D$1 = S(setHeader), cn = S(getRequestWebStream), ln = S(removeResponseHeader), fn = S(Zr);
function pn() {
  var _a2;
  return Kr("nitro-app", { asyncContext: !!((_a2 = globalThis.app.config.server.experimental) == null ? void 0 : _a2.asyncContext), AsyncLocalStorage: AsyncLocalStorage });
}
function dn() {
  return pn().use().event;
}
const de$1 = "Invariant Violation", { setPrototypeOf: hn = function(e, t) {
  return e.__proto__ = t, e;
} } = Object;
let Ae$1 = class Ae extends Error {
  constructor(t = de$1) {
    super(typeof t == "number" ? `${de$1}: ${t} (see https://github.com/apollographql/invariant-packages)` : t);
    __publicField$1(this, "framesToPop", 1);
    __publicField$1(this, "name", de$1);
    hn(this, Ae.prototype);
  }
};
function gn(e, t) {
  if (!e) throw new Ae$1(t);
}
const he$1 = "solidFetchEvent";
function bn(e) {
  return { request: fn(e), response: vn(e), clientAddress: rn(e), locals: {}, nativeEvent: e };
}
function mn(e) {
  return { ...e };
}
function yn(e) {
  if (!e.context[he$1]) {
    const t = bn(e);
    e.context[he$1] = t;
  }
  return e.context[he$1];
}
function We$1(e, t) {
  for (const [r, n] of t.entries()) yt(e, r, n);
}
class wn {
  constructor(t) {
    __publicField$1(this, "event");
    this.event = t;
  }
  get(t) {
    const r = Ve$1(this.event, t);
    return Array.isArray(r) ? r.join(", ") : r || null;
  }
  has(t) {
    return this.get(t) !== null;
  }
  set(t, r) {
    return sn(this.event, t, r);
  }
  delete(t) {
    return ln(this.event, t);
  }
  append(t, r) {
    yt(this.event, t, r);
  }
  getSetCookie() {
    const t = Ve$1(this.event, "Set-Cookie");
    return Array.isArray(t) ? t : [t];
  }
  forEach(t) {
    return Object.entries(se(this.event)).forEach(([r, n]) => t(Array.isArray(n) ? n.join(", ") : n, r, this));
  }
  entries() {
    return Object.entries(se(this.event)).map(([t, r]) => [t, Array.isArray(r) ? r.join(", ") : r])[Symbol.iterator]();
  }
  keys() {
    return Object.keys(se(this.event))[Symbol.iterator]();
  }
  values() {
    return Object.values(se(this.event)).map((t) => Array.isArray(t) ? t.join(", ") : t)[Symbol.iterator]();
  }
  [Symbol.iterator]() {
    return this.entries()[Symbol.iterator]();
  }
}
function vn(e) {
  return { get status() {
    return Be$1(e);
  }, set status(t) {
    ie(e, t);
  }, get statusText() {
    return nn(e);
  }, set statusText(t) {
    ie(e, Be$1(e), t);
  }, headers: new wn(e) };
}
const q$1 = { NORMAL: 0, WILDCARD: 1, PLACEHOLDER: 2 };
function Sn(e = {}) {
  const t = { options: e, rootNode: wt(), staticRoutesMap: {} }, r = (n) => e.strictTrailingSlash ? n : n.replace(/\/$/, "") || "/";
  if (e.routes) for (const n in e.routes) Ge$1(t, r(n), e.routes[n]);
  return { ctx: t, lookup: (n) => En(t, r(n)), insert: (n, a) => Ge$1(t, r(n), a), remove: (n) => kn(t, r(n)) };
}
function En(e, t) {
  const r = e.staticRoutesMap[t];
  if (r) return r.data;
  const n = t.split("/"), a = {};
  let o = false, i = null, u = e.rootNode, c = null;
  for (let l = 0; l < n.length; l++) {
    const p = n[l];
    u.wildcardChildNode !== null && (i = u.wildcardChildNode, c = n.slice(l).join("/"));
    const d = u.children.get(p);
    if (d === void 0) {
      if (u && u.placeholderChildren.length > 1) {
        const w = n.length - l;
        u = u.placeholderChildren.find((f) => f.maxDepth === w) || null;
      } else u = u.placeholderChildren[0] || null;
      if (!u) break;
      u.paramName && (a[u.paramName] = p), o = true;
    } else u = d;
  }
  return (u === null || u.data === null) && i !== null && (u = i, a[u.paramName || "_"] = c, o = true), u ? o ? { ...u.data, params: o ? a : void 0 } : u.data : null;
}
function Ge$1(e, t, r) {
  let n = true;
  const a = t.split("/");
  let o = e.rootNode, i = 0;
  const u = [o];
  for (const c of a) {
    let l;
    if (l = o.children.get(c)) o = l;
    else {
      const p = Rn(c);
      l = wt({ type: p, parent: o }), o.children.set(c, l), p === q$1.PLACEHOLDER ? (l.paramName = c === "*" ? `_${i++}` : c.slice(1), o.placeholderChildren.push(l), n = false) : p === q$1.WILDCARD && (o.wildcardChildNode = l, l.paramName = c.slice(3) || "_", n = false), u.push(l), o = l;
    }
  }
  for (const [c, l] of u.entries()) l.maxDepth = Math.max(u.length - c, l.maxDepth || 0);
  return o.data = r, n === true && (e.staticRoutesMap[t] = o), o;
}
function kn(e, t) {
  let r = false;
  const n = t.split("/");
  let a = e.rootNode;
  for (const o of n) if (a = a.children.get(o), !a) return r;
  if (a.data) {
    const o = n.at(-1) || "";
    a.data = null, Object.keys(a.children).length === 0 && a.parent && (a.parent.children.delete(o), a.parent.wildcardChildNode = null, a.parent.placeholderChildren = []), r = true;
  }
  return r;
}
function wt(e = {}) {
  return { type: e.type || q$1.NORMAL, maxDepth: 0, parent: e.parent || null, children: /* @__PURE__ */ new Map(), data: e.data || null, paramName: e.paramName || null, wildcardChildNode: null, placeholderChildren: [] };
}
function Rn(e) {
  return e.startsWith("**") ? q$1.WILDCARD : e[0] === ":" || e === "*" ? q$1.PLACEHOLDER : q$1.NORMAL;
}
const vt = [{ page: false, $GET: { src: "src/routes/api/integrations/printful/connect.ts?pick=GET", build: () => import('../build/connect.mjs'), import: () => import('../build/connect.mjs') }, $HEAD: { src: "src/routes/api/integrations/printful/connect.ts?pick=GET", build: () => import('../build/connect.mjs'), import: () => import('../build/connect.mjs') }, $POST: { src: "src/routes/api/integrations/printful/connect.ts?pick=POST", build: () => import('../build/connect2.mjs'), import: () => import('../build/connect2.mjs') }, path: "/api/integrations/printful/connect", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/api/integrations/printful/connect.ts" }, { page: false, $GET: { src: "src/routes/api/integrations/printify/connect.ts?pick=GET", build: () => import('../build/connect3.mjs'), import: () => import('../build/connect3.mjs') }, $HEAD: { src: "src/routes/api/integrations/printify/connect.ts?pick=GET", build: () => import('../build/connect3.mjs'), import: () => import('../build/connect3.mjs') }, $POST: { src: "src/routes/api/integrations/printify/connect.ts?pick=POST", build: () => import('../build/connect4.mjs'), import: () => import('../build/connect4.mjs') }, path: "/api/integrations/printify/connect", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/api/integrations/printify/connect.ts" }, { page: false, $POST: { src: "src/routes/api/payments/subscribe.ts?pick=POST", build: () => import('../build/subscribe.mjs'), import: () => import('../build/subscribe.mjs') }, path: "/api/payments/subscribe", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/api/payments/subscribe.ts" }, { page: false, $POST: { src: "src/routes/api/payments/webhook.ts?pick=POST", build: () => import('../build/webhook.mjs'), import: () => import('../build/webhook.mjs') }, path: "/api/payments/webhook", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/api/payments/webhook.ts" }, { page: true, path: "/dashboard/analytics", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/analytics.tsx" }, { page: true, path: "/dashboard/brands/:id", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/brands/[id].tsx" }, { page: true, path: "/dashboard/brands/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/brands/index.tsx" }, { page: true, path: "/dashboard/brands/new", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/brands/new.tsx" }, { page: true, path: "/dashboard/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/index.tsx" }, { page: true, path: "/dashboard/integrations/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/integrations/index.tsx" }, { page: true, path: "/dashboard/mockups/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/mockups/index.tsx" }, { page: true, path: "/dashboard/products/:id", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/products/[id].tsx" }, { page: true, path: "/dashboard/products/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/products/index.tsx" }, { page: true, path: "/dashboard/settings/billing", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/settings/billing.tsx" }, { page: true, path: "/dashboard/settings/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/settings/index.tsx" }, { page: true, path: "/dashboard/templates/:id", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/templates/[id].tsx" }, { page: true, path: "/dashboard/templates/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/templates/index.tsx" }, { page: true, path: "/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/index.tsx" }, { page: true, path: "/login", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/login.tsx" }, { page: true, path: "/pricing", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/pricing.tsx" }, { page: true, path: "/register", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/register.tsx" }], xn = An(vt.filter((e) => e.page));
function An(e) {
  function t(r, n, a, o) {
    const i = Object.values(r).find((u) => a.startsWith(u.id + "/"));
    return i ? (t(i.children || (i.children = []), n, a.slice(i.id.length)), r) : (r.push({ ...n, id: a, path: a.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/") }), r);
  }
  return e.sort((r, n) => r.path.length - n.path.length).reduce((r, n) => t(r, n, n.path, n.path), []);
}
function _n(e) {
  return e.$HEAD || e.$GET || e.$POST || e.$PUT || e.$PATCH || e.$DELETE;
}
Sn({ routes: vt.reduce((e, t) => {
  if (!_n(t)) return e;
  let r = t.path.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/").replace(/\*([^/]*)/g, (n, a) => `**:${a}`).split("/").map((n) => n.startsWith(":") || n.startsWith("*") ? n : encodeURIComponent(n)).join("/");
  if (/:[^/]*\?/g.test(r)) throw new Error(`Optional parameters are not supported in API routes: ${r}`);
  if (e[r]) throw new Error(`Duplicate API routes for "${r}" found at "${e[r].route.path}" and "${t.path}"`);
  return e[r] = { route: t }, e;
}, {}) });
var $n = " ";
const zn = { style: (e) => ssrElement("style", e.attrs, () => e.children, true), link: (e) => ssrElement("link", e.attrs, void 0, true), script: (e) => e.attrs.src ? ssrElement("script", mergeProps(() => e.attrs, { get id() {
  return e.key;
} }), () => ssr($n), true) : null, noscript: (e) => ssrElement("noscript", e.attrs, () => escape(e.children), true) };
function Cn(e, t) {
  let { tag: r, attrs: { key: n, ...a } = { key: void 0 }, children: o } = e;
  return zn[r]({ attrs: { ...a, nonce: t }, key: n, children: o });
}
function On(e, t, r, n = "default") {
  return lazy(async () => {
    var _a2;
    {
      const o = (await e.import())[n], u = (await ((_a2 = t.inputs) == null ? void 0 : _a2[e.src].assets())).filter((l) => l.tag === "style" || l.attrs.rel === "stylesheet");
      return { default: (l) => [...u.map((p) => Cn(p)), createComponent(o, l)] };
    }
  });
}
function St() {
  function e(r) {
    return { ...r, ...r.$$route ? r.$$route.require().route : void 0, info: { ...r.$$route ? r.$$route.require().route.info : {}, filesystem: true }, component: r.$component && On(r.$component, globalThis.MANIFEST.client, globalThis.MANIFEST.ssr), children: r.children ? r.children.map(e) : void 0 };
  }
  return xn.map(e);
}
let Xe$1;
const au = isServer ? () => getRequestEvent().routes : () => Xe$1 || (Xe$1 = St());
function Tn(e) {
  const t = on(e.nativeEvent, "flash");
  if (t) try {
    let r = JSON.parse(t);
    if (!r || !r.result) return;
    const n = [...r.input.slice(0, -1), new Map(r.input[r.input.length - 1])], a = r.error ? new Error(r.result) : r.result;
    return { input: n, url: r.url, pending: false, result: r.thrown ? void 0 : a, error: r.thrown ? a : void 0 };
  } catch (r) {
    console.error(r);
  } finally {
    un(e.nativeEvent, "flash", "", { maxAge: 0 });
  }
}
async function In(e) {
  const t = globalThis.MANIFEST.client;
  return globalThis.MANIFEST.ssr, e.response.headers.set("Content-Type", "text/html"), Object.assign(e, { manifest: await t.json(), assets: [...await t.inputs[t.handler].assets()], router: { submission: Tn(e) }, routes: St(), complete: false, $islands: /* @__PURE__ */ new Set() });
}
const Ln = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function Nn(e) {
  return e.status && Ln.has(e.status) ? e.status : 302;
}
const Fn = {};
var Et = ((e) => (e[e.AggregateError = 1] = "AggregateError", e[e.ArrowFunction = 2] = "ArrowFunction", e[e.ErrorPrototypeStack = 4] = "ErrorPrototypeStack", e[e.ObjectAssign = 8] = "ObjectAssign", e[e.BigIntTypedArray = 16] = "BigIntTypedArray", e[e.RegExp = 32] = "RegExp", e))(Et || {}), A$1 = Symbol.asyncIterator, kt = Symbol.hasInstance, M$1 = Symbol.isConcatSpreadable, _$1 = Symbol.iterator, Rt = Symbol.match, xt = Symbol.matchAll, At = Symbol.replace, _t = Symbol.search, Pt = Symbol.species, $t = Symbol.split, zt = Symbol.toPrimitive, B = Symbol.toStringTag, Ct = Symbol.unscopables, Un = { 0: "Symbol.asyncIterator", 1: "Symbol.hasInstance", 2: "Symbol.isConcatSpreadable", 3: "Symbol.iterator", 4: "Symbol.match", 5: "Symbol.matchAll", 6: "Symbol.replace", 7: "Symbol.search", 8: "Symbol.species", 9: "Symbol.split", 10: "Symbol.toPrimitive", 11: "Symbol.toStringTag", 12: "Symbol.unscopables" }, Ot = { [A$1]: 0, [kt]: 1, [M$1]: 2, [_$1]: 3, [Rt]: 4, [xt]: 5, [At]: 6, [_t]: 7, [Pt]: 8, [$t]: 9, [zt]: 10, [B]: 11, [Ct]: 12 }, jn = { 0: A$1, 1: kt, 2: M$1, 3: _$1, 4: Rt, 5: xt, 6: At, 7: _t, 8: Pt, 9: $t, 10: zt, 11: B, 12: Ct }, Dn = { 2: "!0", 3: "!1", 1: "void 0", 0: "null", 4: "-0", 5: "1/0", 6: "-1/0", 7: "0/0" }, s = void 0, Hn = { 2: true, 3: false, 1: s, 0: null, 4: -0, 5: Number.POSITIVE_INFINITY, 6: Number.NEGATIVE_INFINITY, 7: Number.NaN }, Tt = { 0: "Error", 1: "EvalError", 2: "RangeError", 3: "ReferenceError", 4: "SyntaxError", 5: "TypeError", 6: "URIError" }, qn = { 0: Error, 1: EvalError, 2: RangeError, 3: ReferenceError, 4: SyntaxError, 5: TypeError, 6: URIError };
function g$1(e, t, r, n, a, o, i, u, c, l, p, d) {
  return { t: e, i: t, s: r, c: n, m: a, p: o, e: i, a: u, f: c, b: l, o: p, l: d };
}
function O(e) {
  return g$1(2, s, e, s, s, s, s, s, s, s, s, s);
}
var It = O(2), Lt = O(3), Mn = O(1), Bn = O(0), Vn = O(4), Wn = O(5), Gn = O(6), Xn = O(7);
function Jn(e) {
  switch (e) {
    case '"':
      return '\\"';
    case "\\":
      return "\\\\";
    case `
`:
      return "\\n";
    case "\r":
      return "\\r";
    case "\b":
      return "\\b";
    case "	":
      return "\\t";
    case "\f":
      return "\\f";
    case "<":
      return "\\x3C";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return s;
  }
}
function R$1(e) {
  let t = "", r = 0, n;
  for (let a = 0, o = e.length; a < o; a++) n = Jn(e[a]), n && (t += e.slice(r, a) + n, r = a + 1);
  return r === 0 ? t = e : t += e.slice(r), t;
}
function Yn(e) {
  switch (e) {
    case "\\\\":
      return "\\";
    case '\\"':
      return '"';
    case "\\n":
      return `
`;
    case "\\r":
      return "\r";
    case "\\b":
      return "\b";
    case "\\t":
      return "	";
    case "\\f":
      return "\f";
    case "\\x3C":
      return "<";
    case "\\u2028":
      return "\u2028";
    case "\\u2029":
      return "\u2029";
    default:
      return e;
  }
}
function I$1(e) {
  return e.replace(/(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g, Yn);
}
var X = "__SEROVAL_REFS__", ue$1 = "$R", ae = `self.${ue$1}`;
function Kn(e) {
  return e == null ? `${ae}=${ae}||[]` : `(${ae}=${ae}||{})["${R$1(e)}"]=[]`;
}
var Nt = /* @__PURE__ */ new Map(), H$1 = /* @__PURE__ */ new Map();
function Ft(e) {
  return Nt.has(e);
}
function Qn(e) {
  return H$1.has(e);
}
function Zn(e) {
  if (Ft(e)) return Nt.get(e);
  throw new Ps(e);
}
function es(e) {
  if (Qn(e)) return H$1.get(e);
  throw new $s(e);
}
typeof globalThis < "u" ? Object.defineProperty(globalThis, X, { value: H$1, configurable: true, writable: false, enumerable: false }) : typeof self < "u" ? Object.defineProperty(self, X, { value: H$1, configurable: true, writable: false, enumerable: false }) : typeof global < "u" && Object.defineProperty(global, X, { value: H$1, configurable: true, writable: false, enumerable: false });
function _e$1(e) {
  return e instanceof EvalError ? 1 : e instanceof RangeError ? 2 : e instanceof ReferenceError ? 3 : e instanceof SyntaxError ? 4 : e instanceof TypeError ? 5 : e instanceof URIError ? 6 : 0;
}
function ts(e) {
  let t = Tt[_e$1(e)];
  return e.name !== t ? { name: e.name } : e.constructor.name !== t ? { name: e.constructor.name } : {};
}
function Ut(e, t) {
  let r = ts(e), n = Object.getOwnPropertyNames(e);
  for (let a = 0, o = n.length, i; a < o; a++) i = n[a], i !== "name" && i !== "message" && (i === "stack" ? t & 4 && (r = r || {}, r[i] = e[i]) : (r = r || {}, r[i] = e[i]));
  return r;
}
function jt(e) {
  return Object.isFrozen(e) ? 3 : Object.isSealed(e) ? 2 : Object.isExtensible(e) ? 0 : 1;
}
function rs(e) {
  switch (e) {
    case Number.POSITIVE_INFINITY:
      return Wn;
    case Number.NEGATIVE_INFINITY:
      return Gn;
  }
  return e !== e ? Xn : Object.is(e, -0) ? Vn : g$1(0, s, e, s, s, s, s, s, s, s, s, s);
}
function Dt(e) {
  return g$1(1, s, R$1(e), s, s, s, s, s, s, s, s, s);
}
function ns(e) {
  return g$1(3, s, "" + e, s, s, s, s, s, s, s, s, s);
}
function ss(e) {
  return g$1(4, e, s, s, s, s, s, s, s, s, s, s);
}
function as(e, t) {
  let r = t.valueOf();
  return g$1(5, e, r !== r ? "" : t.toISOString(), s, s, s, s, s, s, s, s, s);
}
function os(e, t) {
  return g$1(6, e, s, R$1(t.source), t.flags, s, s, s, s, s, s, s);
}
function is(e, t) {
  return g$1(17, e, Ot[t], s, s, s, s, s, s, s, s, s);
}
function us(e, t) {
  return g$1(18, e, R$1(Zn(t)), s, s, s, s, s, s, s, s, s);
}
function Ht(e, t, r) {
  return g$1(25, e, r, R$1(t), s, s, s, s, s, s, s, s);
}
function cs(e, t, r) {
  return g$1(9, e, s, s, s, s, s, r, s, s, jt(t), s);
}
function ls(e, t) {
  return g$1(21, e, s, s, s, s, s, s, t, s, s, s);
}
function fs(e, t, r) {
  return g$1(15, e, s, t.constructor.name, s, s, s, s, r, t.byteOffset, s, t.length);
}
function ps(e, t, r) {
  return g$1(16, e, s, t.constructor.name, s, s, s, s, r, t.byteOffset, s, t.byteLength);
}
function ds(e, t, r) {
  return g$1(20, e, s, s, s, s, s, s, r, t.byteOffset, s, t.byteLength);
}
function hs(e, t, r) {
  return g$1(13, e, _e$1(t), s, R$1(t.message), r, s, s, s, s, s, s);
}
function gs(e, t, r) {
  return g$1(14, e, _e$1(t), s, R$1(t.message), r, s, s, s, s, s, s);
}
function bs(e, t) {
  return g$1(7, e, s, s, s, s, s, t, s, s, s, s);
}
function ms(e, t) {
  return g$1(28, s, s, s, s, s, s, [e, t], s, s, s, s);
}
function ys(e, t) {
  return g$1(30, s, s, s, s, s, s, [e, t], s, s, s, s);
}
function ws(e, t, r) {
  return g$1(31, e, s, s, s, s, s, r, t, s, s, s);
}
function vs(e, t) {
  return g$1(32, e, s, s, s, s, s, s, t, s, s, s);
}
function Ss(e, t) {
  return g$1(33, e, s, s, s, s, s, s, t, s, s, s);
}
function Es(e, t) {
  return g$1(34, e, s, s, s, s, s, s, t, s, s, s);
}
function ks(e, t, r, n) {
  return g$1(35, e, r, s, s, s, s, t, s, s, s, n);
}
var Rs = { parsing: 1, serialization: 2, deserialization: 3 };
function xs(e) {
  return `Seroval Error (step: ${Rs[e]})`;
}
var As = (e, t) => xs(e), qt = class extends Error {
  constructor(t, r) {
    super(As(t)), this.cause = r;
  }
}, Je$1 = class Je extends qt {
  constructor(e) {
    super("parsing", e);
  }
}, _s = class extends qt {
  constructor(e) {
    super("deserialization", e);
  }
};
function P$1(e) {
  return `Seroval Error (specific: ${e})`;
}
var ce$1 = class ce extends Error {
  constructor(t) {
    super(P$1(1)), this.value = t;
  }
}, F = class extends Error {
  constructor(t) {
    super(P$1(2));
  }
}, Mt = class extends Error {
  constructor(e) {
    super(P$1(3));
  }
}, Z = class extends Error {
  constructor(t) {
    super(P$1(4));
  }
}, Ps = class extends Error {
  constructor(e) {
    super(P$1(5)), this.value = e;
  }
}, $s = class extends Error {
  constructor(e) {
    super(P$1(6));
  }
}, zs = class extends Error {
  constructor(e) {
    super(P$1(7));
  }
}, $$1 = class $ extends Error {
  constructor(t) {
    super(P$1(8));
  }
}, Bt = class extends Error {
  constructor(e) {
    super(P$1(9));
  }
}, Cs = class {
  constructor(e, t) {
    this.value = e, this.replacement = t;
  }
}, le$1 = () => {
  let e = { p: 0, s: 0, f: 0 };
  return e.p = new Promise((t, r) => {
    e.s = t, e.f = r;
  }), e;
}, Os = (e, t) => {
  e.s(t), e.p.s = 1, e.p.v = t;
}, Ts = (e, t) => {
  e.f(t), e.p.s = 2, e.p.v = t;
}, Is = le$1.toString(), Ls = Os.toString(), Ns = Ts.toString(), Vt = () => {
  let e = [], t = [], r = true, n = false, a = 0, o = (c, l, p) => {
    for (p = 0; p < a; p++) t[p] && t[p][l](c);
  }, i = (c, l, p, d) => {
    for (l = 0, p = e.length; l < p; l++) d = e[l], !r && l === p - 1 ? c[n ? "return" : "throw"](d) : c.next(d);
  }, u = (c, l) => (r && (l = a++, t[l] = c), i(c), () => {
    r && (t[l] = t[a], t[a--] = void 0);
  });
  return { __SEROVAL_STREAM__: true, on: (c) => u(c), next: (c) => {
    r && (e.push(c), o(c, "next"));
  }, throw: (c) => {
    r && (e.push(c), o(c, "throw"), r = false, n = false, t.length = 0);
  }, return: (c) => {
    r && (e.push(c), o(c, "return"), r = false, n = true, t.length = 0);
  } };
}, Fs = Vt.toString(), Wt = (e) => (t) => () => {
  let r = 0, n = { [e]: () => n, next: () => {
    if (r > t.d) return { done: true, value: void 0 };
    let a = r++, o = t.v[a];
    if (a === t.t) throw o;
    return { done: a === t.d, value: o };
  } };
  return n;
}, Us = Wt.toString(), Gt = (e, t) => (r) => () => {
  let n = 0, a = -1, o = false, i = [], u = [], c = (p = 0, d = u.length) => {
    for (; p < d; p++) u[p].s({ done: true, value: void 0 });
  };
  r.on({ next: (p) => {
    let d = u.shift();
    d && d.s({ done: false, value: p }), i.push(p);
  }, throw: (p) => {
    let d = u.shift();
    d && d.f(p), c(), a = i.length, o = true, i.push(p);
  }, return: (p) => {
    let d = u.shift();
    d && d.s({ done: true, value: p }), c(), a = i.length, i.push(p);
  } });
  let l = { [e]: () => l, next: () => {
    if (a === -1) {
      let w = n++;
      if (w >= i.length) {
        let f = t();
        return u.push(f), f.p;
      }
      return { done: false, value: i[w] };
    }
    if (n > a) return { done: true, value: void 0 };
    let p = n++, d = i[p];
    if (p !== a) return { done: false, value: d };
    if (o) throw d;
    return { done: true, value: d };
  } };
  return l;
}, js = Gt.toString(), Xt = (e) => {
  let t = atob(e), r = t.length, n = new Uint8Array(r);
  for (let a = 0; a < r; a++) n[a] = t.charCodeAt(a);
  return n.buffer;
}, Ds = Xt.toString();
function Hs(e) {
  return "__SEROVAL_SEQUENCE__" in e;
}
function Jt(e, t, r) {
  return { __SEROVAL_SEQUENCE__: true, v: e, t, d: r };
}
function qs(e) {
  let t = [], r = -1, n = -1, a = e[_$1]();
  for (; ; ) try {
    let o = a.next();
    if (t.push(o.value), o.done) {
      n = t.length - 1;
      break;
    }
  } catch (o) {
    r = t.length, t.push(o);
  }
  return Jt(t, r, n);
}
var Ms = Wt(_$1);
function Bs(e) {
  return Ms(e);
}
var Vs = {}, Ws = {}, Gs = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} }, Xs = { 0: "[]", 1: Is, 2: Ls, 3: Ns, 4: Fs, 5: Ds };
function Js(e) {
  return "__SEROVAL_STREAM__" in e;
}
function ee() {
  return Vt();
}
function Ys(e) {
  let t = ee(), r = e[A$1]();
  async function n() {
    try {
      let a = await r.next();
      a.done ? t.return(a.value) : (t.next(a.value), await n());
    } catch (a) {
      t.throw(a);
    }
  }
  return n().catch(() => {
  }), t;
}
var Ks = Gt(A$1, le$1);
function Qs(e) {
  return Ks(e);
}
function Zs(e, t) {
  return { plugins: t.plugins, mode: e, marked: /* @__PURE__ */ new Set(), features: 63 ^ (t.disabledFeatures || 0), refs: t.refs || /* @__PURE__ */ new Map(), depthLimit: t.depthLimit || 1e3 };
}
function ea(e, t) {
  e.marked.add(t);
}
function Yt(e, t) {
  let r = e.refs.size;
  return e.refs.set(t, r), r;
}
function fe$1(e, t) {
  let r = e.refs.get(t);
  return r != null ? (ea(e, r), { type: 1, value: ss(r) }) : { type: 0, value: Yt(e, t) };
}
function Pe$1(e, t) {
  let r = fe$1(e, t);
  return r.type === 1 ? r : Ft(t) ? { type: 2, value: us(r.value, t) } : r;
}
function L(e, t) {
  let r = Pe$1(e, t);
  if (r.type !== 0) return r.value;
  if (t in Ot) return is(r.value, t);
  throw new ce$1(t);
}
function U(e, t) {
  let r = fe$1(e, Gs[t]);
  return r.type === 1 ? r.value : g$1(26, r.value, t, s, s, s, s, s, s, s, s, s);
}
function ta(e) {
  let t = fe$1(e, Vs);
  return t.type === 1 ? t.value : g$1(27, t.value, s, s, s, s, s, s, L(e, _$1), s, s, s);
}
function ra(e) {
  let t = fe$1(e, Ws);
  return t.type === 1 ? t.value : g$1(29, t.value, s, s, s, s, s, [U(e, 1), L(e, A$1)], s, s, s, s);
}
function na(e, t, r, n) {
  return g$1(r ? 11 : 10, e, s, s, s, n, s, s, s, s, jt(t), s);
}
function sa(e, t, r, n) {
  return g$1(8, t, s, s, s, s, { k: r, v: n }, s, U(e, 0), s, s, s);
}
function aa(e, t, r) {
  return g$1(22, t, r, s, s, s, s, s, U(e, 1), s, s, s);
}
function oa(e, t, r) {
  let n = new Uint8Array(r), a = "";
  for (let o = 0, i = n.length; o < i; o++) a += String.fromCharCode(n[o]);
  return g$1(19, t, R$1(btoa(a)), s, s, s, s, s, U(e, 5), s, s, s);
}
var ia = ((e) => (e[e.Vanilla = 1] = "Vanilla", e[e.Cross = 2] = "Cross", e))(ia || {});
function Kt(e, t) {
  for (let r = 0, n = t.length; r < n; r++) {
    let a = t[r];
    e.has(a) || (e.add(a), a.extends && Kt(e, a.extends));
  }
}
function $e$1(e) {
  if (e) {
    let t = /* @__PURE__ */ new Set();
    return Kt(t, e), [...t];
  }
}
function ua(e) {
  switch (e) {
    case "Int8Array":
      return Int8Array;
    case "Int16Array":
      return Int16Array;
    case "Int32Array":
      return Int32Array;
    case "Uint8Array":
      return Uint8Array;
    case "Uint16Array":
      return Uint16Array;
    case "Uint32Array":
      return Uint32Array;
    case "Uint8ClampedArray":
      return Uint8ClampedArray;
    case "Float32Array":
      return Float32Array;
    case "Float64Array":
      return Float64Array;
    case "BigInt64Array":
      return BigInt64Array;
    case "BigUint64Array":
      return BigUint64Array;
    default:
      throw new zs(e);
  }
}
var ca = 1e6, la = 1e4, fa = 2e4;
function Qt(e, t) {
  switch (t) {
    case 3:
      return Object.freeze(e);
    case 1:
      return Object.preventExtensions(e);
    case 2:
      return Object.seal(e);
    default:
      return e;
  }
}
var pa = 1e3;
function da(e, t) {
  var r;
  let n = t.refs || /* @__PURE__ */ new Map();
  return "types" in n || Object.assign(n, { types: /* @__PURE__ */ new Map() }), { mode: e, plugins: t.plugins, refs: n, features: (r = t.features) != null ? r : 63 ^ (t.disabledFeatures || 0), depthLimit: t.depthLimit || pa };
}
function ha(e) {
  return { mode: 1, base: da(1, e), child: s, state: { marked: new Set(e.markedRefs) } };
}
var ga = class {
  constructor(e, t) {
    this._p = e, this.depth = t;
  }
  deserialize(e) {
    return m(this._p, this.depth, e);
  }
};
function Zt(e, t) {
  if (t < 0 || !Number.isFinite(t) || !Number.isInteger(t)) throw new $$1({ t: 4, i: t });
  if (e.refs.has(t)) throw new Error("Conflicted ref id: " + t);
}
function ba(e, t, r) {
  return Zt(e.base, t), e.state.marked.has(t) && e.base.refs.set(t, r), r;
}
function ma(e, t, r) {
  return Zt(e.base, t), e.base.refs.set(t, r), r;
}
function y$1(e, t, r) {
  return e.mode === 1 ? ba(e, t, r) : ma(e, t, r);
}
function Ee$1(e, t, r) {
  if (Object.hasOwn(t, r)) return t[r];
  throw new $$1(e);
}
function ya(e, t) {
  return y$1(e, t.i, es(I$1(t.s)));
}
function wa(e, t, r) {
  let n = r.a, a = n.length, o = y$1(e, r.i, new Array(a));
  for (let i = 0, u; i < a; i++) u = n[i], u && (o[i] = m(e, t, u));
  return Qt(o, r.o), o;
}
function va(e) {
  switch (e) {
    case "constructor":
    case "__proto__":
    case "prototype":
    case "__defineGetter__":
    case "__defineSetter__":
    case "__lookupGetter__":
    case "__lookupSetter__":
      return false;
    default:
      return true;
  }
}
function Sa(e) {
  switch (e) {
    case A$1:
    case M$1:
    case B:
    case _$1:
      return true;
    default:
      return false;
  }
}
function Ye$1(e, t, r) {
  va(t) ? e[t] = r : Object.defineProperty(e, t, { value: r, configurable: true, enumerable: true, writable: true });
}
function Ea(e, t, r, n, a) {
  if (typeof n == "string") Ye$1(r, I$1(n), m(e, t, a));
  else {
    let o = m(e, t, n);
    switch (typeof o) {
      case "string":
        Ye$1(r, o, m(e, t, a));
        break;
      case "symbol":
        Sa(o) && (r[o] = m(e, t, a));
        break;
      default:
        throw new $$1(n);
    }
  }
}
function er(e, t, r) {
  e.base.refs.types.set(t, r);
}
function te(e, t, r, n) {
  if (e.base.refs.types.get(r) !== n) throw new $$1(t);
}
function tr(e, t, r, n) {
  let a = r.k;
  if (a.length > 0) for (let o = 0, i = r.v, u = a.length; o < u; o++) Ea(e, t, n, a[o], i[o]);
  return n;
}
function ka(e, t, r) {
  let n = y$1(e, r.i, r.t === 10 ? {} : /* @__PURE__ */ Object.create(null));
  return tr(e, t, r.p, n), Qt(n, r.o), n;
}
function Ra(e, t) {
  return y$1(e, t.i, new Date(t.s));
}
function xa(e, t) {
  if (e.base.features & 32) {
    let r = I$1(t.c);
    if (r.length > fa) throw new $$1(t);
    return y$1(e, t.i, new RegExp(r, t.m));
  }
  throw new F(t);
}
function Aa(e, t, r) {
  let n = y$1(e, r.i, /* @__PURE__ */ new Set());
  for (let a = 0, o = r.a, i = o.length; a < i; a++) n.add(m(e, t, o[a]));
  return n;
}
function _a(e, t, r) {
  let n = y$1(e, r.i, /* @__PURE__ */ new Map());
  for (let a = 0, o = r.e.k, i = r.e.v, u = o.length; a < u; a++) n.set(m(e, t, o[a]), m(e, t, i[a]));
  return n;
}
function Pa(e, t) {
  if (t.s.length > ca) throw new $$1(t);
  return y$1(e, t.i, Xt(I$1(t.s)));
}
function $a(e, t, r) {
  var n;
  let a = ua(r.c), o = m(e, t, r.f), i = (n = r.b) != null ? n : 0;
  if (i < 0 || i > o.byteLength) throw new $$1(r);
  return y$1(e, r.i, new a(o, i, r.l));
}
function za(e, t, r) {
  var n;
  let a = m(e, t, r.f), o = (n = r.b) != null ? n : 0;
  if (o < 0 || o > a.byteLength) throw new $$1(r);
  return y$1(e, r.i, new DataView(a, o, r.l));
}
function rr(e, t, r, n) {
  if (r.p) {
    let a = tr(e, t, r.p, {});
    Object.defineProperties(n, Object.getOwnPropertyDescriptors(a));
  }
  return n;
}
function Ca(e, t, r) {
  let n = y$1(e, r.i, new AggregateError([], I$1(r.m)));
  return rr(e, t, r, n);
}
function Oa(e, t, r) {
  let n = Ee$1(r, qn, r.s), a = y$1(e, r.i, new n(I$1(r.m)));
  return rr(e, t, r, a);
}
function Ta(e, t, r) {
  let n = le$1(), a = y$1(e, r.i, n.p), o = m(e, t, r.f);
  return r.s ? n.s(o) : n.f(o), a;
}
function Ia(e, t, r) {
  return y$1(e, r.i, Object(m(e, t, r.f)));
}
function La(e, t, r) {
  let n = e.base.plugins;
  if (n) {
    let a = I$1(r.c);
    for (let o = 0, i = n.length; o < i; o++) {
      let u = n[o];
      if (u.tag === a) return y$1(e, r.i, u.deserialize(r.s, new ga(e, t), { id: r.i }));
    }
  }
  throw new Mt(r.c);
}
function Na(e, t) {
  let r = y$1(e, t.i, y$1(e, t.s, le$1()).p);
  return er(e, t.s, 22), r;
}
function Fa(e, t, r) {
  let n = e.base.refs.get(r.i);
  if (n) return te(e, r, r.i, 22), n.s(m(e, t, r.a[1])), s;
  throw new Z("Promise");
}
function Ua(e, t, r) {
  let n = e.base.refs.get(r.i);
  if (n) return te(e, r, r.i, 22), n.f(m(e, t, r.a[1])), s;
  throw new Z("Promise");
}
function ja(e, t, r) {
  m(e, t, r.a[0]);
  let n = m(e, t, r.a[1]);
  return Bs(n);
}
function Da(e, t, r) {
  m(e, t, r.a[0]);
  let n = m(e, t, r.a[1]);
  return Qs(n);
}
function Ha(e, t, r) {
  let n = y$1(e, r.i, ee());
  er(e, r.i, 31);
  let a = r.a, o = a.length;
  if (o) for (let i = 0; i < o; i++) m(e, t, a[i]);
  return n;
}
function qa(e, t, r) {
  let n = e.base.refs.get(r.i);
  if (n) return te(e, r, r.i, 31), n.next(m(e, t, r.f)), s;
  throw new Z("Stream");
}
function Ma(e, t, r) {
  let n = e.base.refs.get(r.i);
  if (n) return te(e, r, r.i, 31), n.throw(m(e, t, r.f)), s;
  throw new Z("Stream");
}
function Ba(e, t, r) {
  let n = e.base.refs.get(r.i);
  if (n) return te(e, r, r.i, 31), n.return(m(e, t, r.f)), s;
  throw new Z("Stream");
}
function Va(e, t, r) {
  return m(e, t, r.f), s;
}
function Wa(e, t, r) {
  return m(e, t, r.a[1]), s;
}
function Ga(e, t, r) {
  let n = y$1(e, r.i, Jt([], r.s, r.l));
  for (let a = 0, o = r.a.length; a < o; a++) n.v[a] = m(e, t, r.a[a]);
  return n;
}
function m(e, t, r) {
  if (t > e.base.depthLimit) throw new Bt(e.base.depthLimit);
  switch (t += 1, r.t) {
    case 2:
      return Ee$1(r, Hn, r.s);
    case 0:
      return Number(r.s);
    case 1:
      return I$1(String(r.s));
    case 3:
      if (String(r.s).length > la) throw new $$1(r);
      return BigInt(r.s);
    case 4:
      return e.base.refs.get(r.i);
    case 18:
      return ya(e, r);
    case 9:
      return wa(e, t, r);
    case 10:
    case 11:
      return ka(e, t, r);
    case 5:
      return Ra(e, r);
    case 6:
      return xa(e, r);
    case 7:
      return Aa(e, t, r);
    case 8:
      return _a(e, t, r);
    case 19:
      return Pa(e, r);
    case 16:
    case 15:
      return $a(e, t, r);
    case 20:
      return za(e, t, r);
    case 14:
      return Ca(e, t, r);
    case 13:
      return Oa(e, t, r);
    case 12:
      return Ta(e, t, r);
    case 17:
      return Ee$1(r, jn, r.s);
    case 21:
      return Ia(e, t, r);
    case 25:
      return La(e, t, r);
    case 22:
      return Na(e, r);
    case 23:
      return Fa(e, t, r);
    case 24:
      return Ua(e, t, r);
    case 28:
      return ja(e, t, r);
    case 30:
      return Da(e, t, r);
    case 31:
      return Ha(e, t, r);
    case 32:
      return qa(e, t, r);
    case 33:
      return Ma(e, t, r);
    case 34:
      return Ba(e, t, r);
    case 27:
      return Va(e, t, r);
    case 29:
      return Wa(e, t, r);
    case 35:
      return Ga(e, t, r);
    default:
      throw new F(r);
  }
}
function Xa(e, t) {
  try {
    return m(e, 0, t);
  } catch (r) {
    throw new _s(r);
  }
}
var Ja = () => T, Ya = Ja.toString(), nr = /=>/.test(Ya);
function sr(e, t) {
  return nr ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>" + (t.startsWith("{") ? "(" + t + ")" : t) : "function(" + e.join(",") + "){return " + t + "}";
}
function Ka(e, t) {
  return nr ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>{" + t + "}" : "function(" + e.join(",") + "){" + t + "}";
}
var ar = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_", Ke$1 = ar.length, or = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_", Qe$1 = or.length;
function Qa(e) {
  let t = e % Ke$1, r = ar[t];
  for (e = (e - t) / Ke$1; e > 0; ) t = e % Qe$1, r += or[t], e = (e - t) / Qe$1;
  return r;
}
var Za = /^[$A-Z_][0-9A-Z_$]*$/i;
function ir(e) {
  let t = e[0];
  return (t === "$" || t === "_" || t >= "A" && t <= "Z" || t >= "a" && t <= "z") && Za.test(e);
}
function J(e) {
  switch (e.t) {
    case 0:
      return e.s + "=" + e.v;
    case 2:
      return e.s + ".set(" + e.k + "," + e.v + ")";
    case 1:
      return e.s + ".add(" + e.v + ")";
    case 3:
      return e.s + ".delete(" + e.k + ")";
  }
}
function eo(e) {
  let t = [], r = e[0];
  for (let n = 1, a = e.length, o, i = r; n < a; n++) o = e[n], o.t === 0 && o.v === i.v ? r = { t: 0, s: o.s, k: s, v: J(r) } : o.t === 2 && o.s === i.s ? r = { t: 2, s: J(r), k: o.k, v: o.v } : o.t === 1 && o.s === i.s ? r = { t: 1, s: J(r), k: s, v: o.v } : o.t === 3 && o.s === i.s ? r = { t: 3, s: J(r), k: o.k, v: s } : (t.push(r), r = o), i = o;
  return t.push(r), t;
}
function ur(e) {
  if (e.length) {
    let t = "", r = eo(e);
    for (let n = 0, a = r.length; n < a; n++) t += J(r[n]) + ",";
    return t;
  }
  return s;
}
var to = "Object.create(null)", ro = "new Set", no = "new Map", so = "Promise.resolve", ao = "Promise.reject", oo = { 3: "Object.freeze", 2: "Object.seal", 1: "Object.preventExtensions", 0: s };
function io(e, t) {
  return { mode: e, plugins: t.plugins, features: t.features, marked: new Set(t.markedRefs), stack: [], flags: [], assignments: [] };
}
function uo(e) {
  return { mode: 2, base: io(2, e), state: e, child: s };
}
var co = class {
  constructor(e) {
    this._p = e;
  }
  serialize(e) {
    return h(this._p, e);
  }
};
function lo(e, t) {
  let r = e.valid.get(t);
  r == null && (r = e.valid.size, e.valid.set(t, r));
  let n = e.vars[r];
  return n == null && (n = Qa(r), e.vars[r] = n), n;
}
function fo(e) {
  return ue$1 + "[" + e + "]";
}
function b(e, t) {
  return e.mode === 1 ? lo(e.state, t) : fo(t);
}
function E(e, t) {
  e.marked.add(t);
}
function ke$1(e, t) {
  return e.marked.has(t);
}
function ze$1(e, t, r) {
  t !== 0 && (E(e.base, r), e.base.flags.push({ type: t, value: b(e, r) }));
}
function po(e) {
  let t = "";
  for (let r = 0, n = e.flags, a = n.length; r < a; r++) {
    let o = n[r];
    t += oo[o.type] + "(" + o.value + "),";
  }
  return t;
}
function ho(e) {
  let t = ur(e.assignments), r = po(e);
  return t ? r ? t + r : t : r;
}
function Ce$1(e, t, r) {
  e.assignments.push({ t: 0, s: t, k: s, v: r });
}
function go(e, t, r) {
  e.base.assignments.push({ t: 1, s: b(e, t), k: s, v: r });
}
function G(e, t, r, n) {
  e.base.assignments.push({ t: 2, s: b(e, t), k: r, v: n });
}
function Ze(e, t, r) {
  e.base.assignments.push({ t: 3, s: b(e, t), k: r, v: s });
}
function K(e, t, r, n) {
  Ce$1(e.base, b(e, t) + "[" + r + "]", n);
}
function Re$1(e, t, r, n) {
  Ce$1(e.base, b(e, t) + "." + r, n);
}
function bo(e, t, r, n) {
  Ce$1(e.base, b(e, t) + ".v[" + r + "]", n);
}
function x(e, t) {
  return t.t === 4 && e.stack.includes(t.i);
}
function W(e, t, r) {
  return e.mode === 1 && !ke$1(e.base, t) ? r : b(e, t) + "=" + r;
}
function mo(e) {
  return X + '.get("' + e.s + '")';
}
function et(e, t, r, n) {
  return r ? x(e.base, r) ? (E(e.base, t), K(e, t, n, b(e, r.i)), "") : h(e, r) : "";
}
function yo(e, t) {
  let r = t.i, n = t.a, a = n.length;
  if (a > 0) {
    e.base.stack.push(r);
    let o = et(e, r, n[0], 0), i = o === "";
    for (let u = 1, c; u < a; u++) c = et(e, r, n[u], u), o += "," + c, i = c === "";
    return e.base.stack.pop(), ze$1(e, t.o, t.i), "[" + o + (i ? ",]" : "]");
  }
  return "[]";
}
function tt(e, t, r, n) {
  if (typeof r == "string") {
    let a = Number(r), o = a >= 0 && a.toString() === r || ir(r);
    if (x(e.base, n)) {
      let i = b(e, n.i);
      return E(e.base, t.i), o && a !== a ? Re$1(e, t.i, r, i) : K(e, t.i, o ? r : '"' + r + '"', i), "";
    }
    return (o ? r : '"' + r + '"') + ":" + h(e, n);
  }
  return "[" + h(e, r) + "]:" + h(e, n);
}
function cr(e, t, r) {
  let n = r.k, a = n.length;
  if (a > 0) {
    let o = r.v;
    e.base.stack.push(t.i);
    let i = tt(e, t, n[0], o[0]);
    for (let u = 1, c = i; u < a; u++) c = tt(e, t, n[u], o[u]), i += (c && i && ",") + c;
    return e.base.stack.pop(), "{" + i + "}";
  }
  return "{}";
}
function wo(e, t) {
  return ze$1(e, t.o, t.i), cr(e, t, t.p);
}
function vo(e, t, r, n) {
  let a = cr(e, t, r);
  return a !== "{}" ? "Object.assign(" + n + "," + a + ")" : n;
}
function So(e, t, r, n, a) {
  let o = e.base, i = h(e, a), u = Number(n), c = u >= 0 && u.toString() === n || ir(n);
  if (x(o, a)) c && u !== u ? Re$1(e, t.i, n, i) : K(e, t.i, c ? n : '"' + n + '"', i);
  else {
    let l = o.assignments;
    o.assignments = r, c && u !== u ? Re$1(e, t.i, n, i) : K(e, t.i, c ? n : '"' + n + '"', i), o.assignments = l;
  }
}
function Eo(e, t, r, n, a) {
  if (typeof n == "string") So(e, t, r, n, a);
  else {
    let o = e.base, i = o.stack;
    o.stack = [];
    let u = h(e, a);
    o.stack = i;
    let c = o.assignments;
    o.assignments = r, K(e, t.i, h(e, n), u), o.assignments = c;
  }
}
function ko(e, t, r) {
  let n = r.k, a = n.length;
  if (a > 0) {
    let o = [], i = r.v;
    e.base.stack.push(t.i);
    for (let u = 0; u < a; u++) Eo(e, t, o, n[u], i[u]);
    return e.base.stack.pop(), ur(o);
  }
  return s;
}
function Oe$1(e, t, r) {
  if (t.p) {
    let n = e.base;
    if (n.features & 8) r = vo(e, t, t.p, r);
    else {
      E(n, t.i);
      let a = ko(e, t, t.p);
      if (a) return "(" + W(e, t.i, r) + "," + a + b(e, t.i) + ")";
    }
  }
  return r;
}
function Ro(e, t) {
  return ze$1(e, t.o, t.i), Oe$1(e, t, to);
}
function xo(e) {
  return 'new Date("' + e.s + '")';
}
function Ao(e, t) {
  if (e.base.features & 32) return "/" + t.c + "/" + t.m;
  throw new F(t);
}
function rt(e, t, r) {
  let n = e.base;
  return x(n, r) ? (E(n, t), go(e, t, b(e, r.i)), "") : h(e, r);
}
function _o(e, t) {
  let r = ro, n = t.a, a = n.length, o = t.i;
  if (a > 0) {
    e.base.stack.push(o);
    let i = rt(e, o, n[0]);
    for (let u = 1, c = i; u < a; u++) c = rt(e, o, n[u]), i += (c && i && ",") + c;
    e.base.stack.pop(), i && (r += "([" + i + "])");
  }
  return r;
}
function nt(e, t, r, n, a) {
  let o = e.base;
  if (x(o, r)) {
    let i = b(e, r.i);
    if (E(o, t), x(o, n)) {
      let c = b(e, n.i);
      return G(e, t, i, c), "";
    }
    if (n.t !== 4 && n.i != null && ke$1(o, n.i)) {
      let c = "(" + h(e, n) + ",[" + a + "," + a + "])";
      return G(e, t, i, b(e, n.i)), Ze(e, t, a), c;
    }
    let u = o.stack;
    return o.stack = [], G(e, t, i, h(e, n)), o.stack = u, "";
  }
  if (x(o, n)) {
    let i = b(e, n.i);
    if (E(o, t), r.t !== 4 && r.i != null && ke$1(o, r.i)) {
      let c = "(" + h(e, r) + ",[" + a + "," + a + "])";
      return G(e, t, b(e, r.i), i), Ze(e, t, a), c;
    }
    let u = o.stack;
    return o.stack = [], G(e, t, h(e, r), i), o.stack = u, "";
  }
  return "[" + h(e, r) + "," + h(e, n) + "]";
}
function Po(e, t) {
  let r = no, n = t.e.k, a = n.length, o = t.i, i = t.f, u = b(e, i.i), c = e.base;
  if (a > 0) {
    let l = t.e.v;
    c.stack.push(o);
    let p = nt(e, o, n[0], l[0], u);
    for (let d = 1, w = p; d < a; d++) w = nt(e, o, n[d], l[d], u), p += (w && p && ",") + w;
    c.stack.pop(), p && (r += "([" + p + "])");
  }
  return i.t === 26 && (E(c, i.i), r = "(" + h(e, i) + "," + r + ")"), r;
}
function $o(e, t) {
  return j(e, t.f) + '("' + t.s + '")';
}
function zo(e, t) {
  return "new " + t.c + "(" + h(e, t.f) + "," + t.b + "," + t.l + ")";
}
function Co(e, t) {
  return "new DataView(" + h(e, t.f) + "," + t.b + "," + t.l + ")";
}
function Oo(e, t) {
  let r = t.i;
  e.base.stack.push(r);
  let n = Oe$1(e, t, 'new AggregateError([],"' + t.m + '")');
  return e.base.stack.pop(), n;
}
function To(e, t) {
  return Oe$1(e, t, "new " + Tt[t.s] + '("' + t.m + '")');
}
function Io(e, t) {
  let r, n = t.f, a = t.i, o = t.s ? so : ao, i = e.base;
  if (x(i, n)) {
    let u = b(e, n.i);
    r = o + (t.s ? "().then(" + sr([], u) + ")" : "().catch(" + Ka([], "throw " + u) + ")");
  } else {
    i.stack.push(a);
    let u = h(e, n);
    i.stack.pop(), r = o + "(" + u + ")";
  }
  return r;
}
function Lo(e, t) {
  return "Object(" + h(e, t.f) + ")";
}
function j(e, t) {
  let r = h(e, t);
  return t.t === 4 ? r : "(" + r + ")";
}
function No(e, t) {
  if (e.mode === 1) throw new F(t);
  return "(" + W(e, t.s, j(e, t.f) + "()") + ").p";
}
function Fo(e, t) {
  if (e.mode === 1) throw new F(t);
  return j(e, t.a[0]) + "(" + b(e, t.i) + "," + h(e, t.a[1]) + ")";
}
function Uo(e, t) {
  if (e.mode === 1) throw new F(t);
  return j(e, t.a[0]) + "(" + b(e, t.i) + "," + h(e, t.a[1]) + ")";
}
function jo(e, t) {
  let r = e.base.plugins;
  if (r) for (let n = 0, a = r.length; n < a; n++) {
    let o = r[n];
    if (o.tag === t.c) return e.child == null && (e.child = new co(e)), o.serialize(t.s, e.child, { id: t.i });
  }
  throw new Mt(t.c);
}
function Do(e, t) {
  let r = "", n = false;
  return t.f.t !== 4 && (E(e.base, t.f.i), r = "(" + h(e, t.f) + ",", n = true), r += W(e, t.i, "(" + Us + ")(" + b(e, t.f.i) + ")"), n && (r += ")"), r;
}
function Ho(e, t) {
  return j(e, t.a[0]) + "(" + h(e, t.a[1]) + ")";
}
function qo(e, t) {
  let r = t.a[0], n = t.a[1], a = e.base, o = "";
  r.t !== 4 && (E(a, r.i), o += "(" + h(e, r)), n.t !== 4 && (E(a, n.i), o += (o ? "," : "(") + h(e, n)), o && (o += ",");
  let i = W(e, t.i, "(" + js + ")(" + b(e, n.i) + "," + b(e, r.i) + ")");
  return o ? o + i + ")" : i;
}
function Mo(e, t) {
  return j(e, t.a[0]) + "(" + h(e, t.a[1]) + ")";
}
function Bo(e, t) {
  let r = W(e, t.i, j(e, t.f) + "()"), n = t.a.length;
  if (n) {
    let a = h(e, t.a[0]);
    for (let o = 1; o < n; o++) a += "," + h(e, t.a[o]);
    return "(" + r + "," + a + "," + b(e, t.i) + ")";
  }
  return r;
}
function Vo(e, t) {
  return b(e, t.i) + ".next(" + h(e, t.f) + ")";
}
function Wo(e, t) {
  return b(e, t.i) + ".throw(" + h(e, t.f) + ")";
}
function Go(e, t) {
  return b(e, t.i) + ".return(" + h(e, t.f) + ")";
}
function st$1(e, t, r, n) {
  let a = e.base;
  return x(a, n) ? (E(a, t), bo(e, t, r, b(e, n.i)), "") : h(e, n);
}
function Xo(e, t) {
  let r = t.a, n = r.length, a = t.i;
  if (n > 0) {
    e.base.stack.push(a);
    let o = st$1(e, a, 0, r[0]);
    for (let i = 1, u = o; i < n; i++) u = st$1(e, a, i, r[i]), o += (u && o && ",") + u;
    if (e.base.stack.pop(), o) return "{__SEROVAL_SEQUENCE__:!0,v:[" + o + "],t:" + t.s + ",d:" + t.l + "}";
  }
  return "{__SEROVAL_SEQUENCE__:!0,v:[],t:-1,d:0}";
}
function Jo(e, t) {
  switch (t.t) {
    case 17:
      return Un[t.s];
    case 18:
      return mo(t);
    case 9:
      return yo(e, t);
    case 10:
      return wo(e, t);
    case 11:
      return Ro(e, t);
    case 5:
      return xo(t);
    case 6:
      return Ao(e, t);
    case 7:
      return _o(e, t);
    case 8:
      return Po(e, t);
    case 19:
      return $o(e, t);
    case 16:
    case 15:
      return zo(e, t);
    case 20:
      return Co(e, t);
    case 14:
      return Oo(e, t);
    case 13:
      return To(e, t);
    case 12:
      return Io(e, t);
    case 21:
      return Lo(e, t);
    case 22:
      return No(e, t);
    case 25:
      return jo(e, t);
    case 26:
      return Xs[t.s];
    case 35:
      return Xo(e, t);
    default:
      throw new F(t);
  }
}
function h(e, t) {
  switch (t.t) {
    case 2:
      return Dn[t.s];
    case 0:
      return "" + t.s;
    case 1:
      return '"' + t.s + '"';
    case 3:
      return t.s + "n";
    case 4:
      return b(e, t.i);
    case 23:
      return Fo(e, t);
    case 24:
      return Uo(e, t);
    case 27:
      return Do(e, t);
    case 28:
      return Ho(e, t);
    case 29:
      return qo(e, t);
    case 30:
      return Mo(e, t);
    case 31:
      return Bo(e, t);
    case 32:
      return Vo(e, t);
    case 33:
      return Wo(e, t);
    case 34:
      return Go(e, t);
    default:
      return W(e, t.i, Jo(e, t));
  }
}
function Yo(e, t) {
  let r = h(e, t), n = t.i;
  if (n == null) return r;
  let a = ho(e.base), o = b(e, n), i = e.state.scopeId, u = i == null ? "" : ue$1, c = a ? "(" + r + "," + a + o + ")" : r;
  if (u === "") return t.t === 10 && !a ? "(" + c + ")" : c;
  let l = i == null ? "()" : "(" + ue$1 + '["' + R$1(i) + '"])';
  return "(" + sr([u], c) + ")" + l;
}
var Ko = class {
  constructor(e, t) {
    this._p = e, this.depth = t;
  }
  parse(e) {
    return v$1(this._p, this.depth, e);
  }
}, Qo = class {
  constructor(e, t) {
    this._p = e, this.depth = t;
  }
  parse(e) {
    return v$1(this._p, this.depth, e);
  }
  parseWithError(e) {
    return N$1(this._p, this.depth, e);
  }
  isAlive() {
    return this._p.state.alive;
  }
  pushPendingState() {
    Ne$1(this._p);
  }
  popPendingState() {
    Q(this._p);
  }
  onParse(e) {
    V(this._p, e);
  }
  onError(e) {
    Ie$1(this._p, e);
  }
};
function Zo(e) {
  return { alive: true, pending: 0, initial: true, buffer: [], onParse: e.onParse, onError: e.onError, onDone: e.onDone };
}
function lr(e) {
  return { type: 2, base: Zs(2, e), state: Zo(e) };
}
function ei(e, t, r) {
  let n = [];
  for (let a = 0, o = r.length; a < o; a++) a in r ? n[a] = v$1(e, t, r[a]) : n[a] = 0;
  return n;
}
function ti(e, t, r, n) {
  return cs(r, n, ei(e, t, n));
}
function Te$1(e, t, r) {
  let n = Object.entries(r), a = [], o = [];
  for (let i = 0, u = n.length; i < u; i++) a.push(R$1(n[i][0])), o.push(v$1(e, t, n[i][1]));
  return _$1 in r && (a.push(L(e.base, _$1)), o.push(ms(ta(e.base), v$1(e, t, qs(r))))), A$1 in r && (a.push(L(e.base, A$1)), o.push(ys(ra(e.base), v$1(e, t, e.type === 1 ? ee() : Ys(r))))), B in r && (a.push(L(e.base, B)), o.push(Dt(r[B]))), M$1 in r && (a.push(L(e.base, M$1)), o.push(r[M$1] ? It : Lt)), { k: a, v: o };
}
function ge$1(e, t, r, n, a) {
  return na(r, n, a, Te$1(e, t, n));
}
function ri(e, t, r, n) {
  return ls(r, v$1(e, t, n.valueOf()));
}
function ni(e, t, r, n) {
  return fs(r, n, v$1(e, t, n.buffer));
}
function si(e, t, r, n) {
  return ps(r, n, v$1(e, t, n.buffer));
}
function ai(e, t, r, n) {
  return ds(r, n, v$1(e, t, n.buffer));
}
function at(e, t, r, n) {
  let a = Ut(n, e.base.features);
  return hs(r, n, a ? Te$1(e, t, a) : s);
}
function oi(e, t, r, n) {
  let a = Ut(n, e.base.features);
  return gs(r, n, a ? Te$1(e, t, a) : s);
}
function ii(e, t, r, n) {
  let a = [], o = [];
  for (let [i, u] of n.entries()) a.push(v$1(e, t, i)), o.push(v$1(e, t, u));
  return sa(e.base, r, a, o);
}
function ui(e, t, r, n) {
  let a = [];
  for (let o of n.keys()) a.push(v$1(e, t, o));
  return bs(r, a);
}
function ci(e, t, r, n) {
  let a = ws(r, U(e.base, 4), []);
  return e.type === 1 || (Ne$1(e), n.on({ next: (o) => {
    if (e.state.alive) {
      let i = N$1(e, t, o);
      i && V(e, vs(r, i));
    }
  }, throw: (o) => {
    if (e.state.alive) {
      let i = N$1(e, t, o);
      i && V(e, Ss(r, i));
    }
    Q(e);
  }, return: (o) => {
    if (e.state.alive) {
      let i = N$1(e, t, o);
      i && V(e, Es(r, i));
    }
    Q(e);
  } })), a;
}
function li(e, t, r) {
  if (this.state.alive) {
    let n = N$1(this, t, r);
    n && V(this, g$1(23, e, s, s, s, s, s, [U(this.base, 2), n], s, s, s, s)), Q(this);
  }
}
function fi(e, t, r) {
  if (this.state.alive) {
    let n = N$1(this, t, r);
    n && V(this, g$1(24, e, s, s, s, s, s, [U(this.base, 3), n], s, s, s, s));
  }
  Q(this);
}
function pi(e, t, r, n) {
  let a = Yt(e.base, {});
  return e.type === 2 && (Ne$1(e), n.then(li.bind(e, a, t), fi.bind(e, a, t))), aa(e.base, r, a);
}
function di(e, t, r, n, a) {
  for (let o = 0, i = a.length; o < i; o++) {
    let u = a[o];
    if (u.parse.sync && u.test(n)) return Ht(r, u.tag, u.parse.sync(n, new Ko(e, t), { id: r }));
  }
  return s;
}
function hi(e, t, r, n, a) {
  for (let o = 0, i = a.length; o < i; o++) {
    let u = a[o];
    if (u.parse.stream && u.test(n)) return Ht(r, u.tag, u.parse.stream(n, new Qo(e, t), { id: r }));
  }
  return s;
}
function fr(e, t, r, n) {
  let a = e.base.plugins;
  return a ? e.type === 1 ? di(e, t, r, n, a) : hi(e, t, r, n, a) : s;
}
function gi(e, t, r, n) {
  let a = [];
  for (let o = 0, i = n.v.length; o < i; o++) a[o] = v$1(e, t, n.v[o]);
  return ks(r, a, n.t, n.d);
}
function bi(e, t, r, n, a) {
  switch (a) {
    case Object:
      return ge$1(e, t, r, n, false);
    case s:
      return ge$1(e, t, r, n, true);
    case Date:
      return as(r, n);
    case Error:
    case EvalError:
    case RangeError:
    case ReferenceError:
    case SyntaxError:
    case TypeError:
    case URIError:
      return at(e, t, r, n);
    case Number:
    case Boolean:
    case String:
    case BigInt:
      return ri(e, t, r, n);
    case ArrayBuffer:
      return oa(e.base, r, n);
    case Int8Array:
    case Int16Array:
    case Int32Array:
    case Uint8Array:
    case Uint16Array:
    case Uint32Array:
    case Uint8ClampedArray:
    case Float32Array:
    case Float64Array:
      return ni(e, t, r, n);
    case DataView:
      return ai(e, t, r, n);
    case Map:
      return ii(e, t, r, n);
    case Set:
      return ui(e, t, r, n);
  }
  if (a === Promise || n instanceof Promise) return pi(e, t, r, n);
  let o = e.base.features;
  if (o & 32 && a === RegExp) return os(r, n);
  if (o & 16) switch (a) {
    case BigInt64Array:
    case BigUint64Array:
      return si(e, t, r, n);
  }
  if (o & 1 && typeof AggregateError < "u" && (a === AggregateError || n instanceof AggregateError)) return oi(e, t, r, n);
  if (n instanceof Error) return at(e, t, r, n);
  if (_$1 in n || A$1 in n) return ge$1(e, t, r, n, !!a);
  throw new ce$1(n);
}
function mi(e, t, r, n) {
  if (Array.isArray(n)) return ti(e, t, r, n);
  if (Js(n)) return ci(e, t, r, n);
  if (Hs(n)) return gi(e, t, r, n);
  let a = n.constructor;
  return a === Cs ? v$1(e, t, n.replacement) : fr(e, t, r, n) || bi(e, t, r, n, a);
}
function yi(e, t, r) {
  let n = Pe$1(e.base, r);
  if (n.type !== 0) return n.value;
  let a = fr(e, t, n.value, r);
  if (a) return a;
  throw new ce$1(r);
}
function v$1(e, t, r) {
  if (t >= e.base.depthLimit) throw new Bt(e.base.depthLimit);
  switch (typeof r) {
    case "boolean":
      return r ? It : Lt;
    case "undefined":
      return Mn;
    case "string":
      return Dt(r);
    case "number":
      return rs(r);
    case "bigint":
      return ns(r);
    case "object": {
      if (r) {
        let n = Pe$1(e.base, r);
        return n.type === 0 ? mi(e, t + 1, n.value, r) : n.value;
      }
      return Bn;
    }
    case "symbol":
      return L(e.base, r);
    case "function":
      return yi(e, t, r);
    default:
      throw new ce$1(r);
  }
}
function V(e, t) {
  e.state.initial ? e.state.buffer.push(t) : Le$1(e, t, false);
}
function Ie$1(e, t) {
  if (e.state.onError) e.state.onError(t);
  else throw t instanceof Je$1 ? t : new Je$1(t);
}
function pr(e) {
  e.state.onDone && e.state.onDone();
}
function Le$1(e, t, r) {
  try {
    e.state.onParse(t, r);
  } catch (n) {
    Ie$1(e, n);
  }
}
function Ne$1(e) {
  e.state.pending++;
}
function Q(e) {
  --e.state.pending <= 0 && pr(e);
}
function N$1(e, t, r) {
  try {
    return v$1(e, t, r);
  } catch (n) {
    return Ie$1(e, n), s;
  }
}
function dr(e, t) {
  let r = N$1(e, 0, t);
  r && (Le$1(e, r, true), e.state.initial = false, wi(e, e.state), e.state.pending <= 0 && Fe$1(e));
}
function wi(e, t) {
  for (let r = 0, n = t.buffer.length; r < n; r++) Le$1(e, t.buffer[r], false);
}
function Fe$1(e) {
  e.state.alive && (pr(e), e.state.alive = false);
}
function vi(e, t) {
  let r = $e$1(t.plugins), n = lr({ plugins: r, refs: t.refs, disabledFeatures: t.disabledFeatures, onParse(a, o) {
    let i = uo({ plugins: r, features: n.base.features, scopeId: t.scopeId, markedRefs: n.base.marked }), u;
    try {
      u = Yo(i, a);
    } catch (c) {
      t.onError && t.onError(c);
      return;
    }
    t.onSerialize(u, o);
  }, onError: t.onError, onDone: t.onDone });
  return dr(n, e), Fe$1.bind(null, n);
}
function Si(e, t) {
  let r = $e$1(t.plugins), n = lr({ plugins: r, refs: t.refs, disabledFeatures: t.disabledFeatures, depthLimit: t.depthLimit, onParse: t.onParse, onError: t.onError, onDone: t.onDone });
  return dr(n, e), Fe$1.bind(null, n);
}
function Ei(e, t = {}) {
  var r;
  let n = $e$1(t.plugins), a = t.disabledFeatures || 0, o = (r = e.f) != null ? r : 63, i = ha({ plugins: n, markedRefs: e.m, features: o & ~a, disabledFeatures: a });
  return Xa(i, e.t);
}
var xe$1 = (e) => {
  let t = new AbortController(), r = t.abort.bind(t);
  return e.then(r, r), t;
};
function ki(e) {
  e(this.reason);
}
function Ri(e) {
  this.addEventListener("abort", ki.bind(this, e), { once: true });
}
function ot(e) {
  return new Promise(Ri.bind(e));
}
var Y = {}, xi = { tag: "seroval-plugins/web/AbortControllerFactoryPlugin", test(e) {
  return e === Y;
}, parse: { sync() {
  return Y;
}, async async() {
  return await Promise.resolve(Y);
}, stream() {
  return Y;
} }, serialize() {
  return xe$1.toString();
}, deserialize() {
  return xe$1;
} }, Ai = { tag: "seroval-plugins/web/AbortSignal", extends: [xi], test(e) {
  return typeof AbortSignal > "u" ? false : e instanceof AbortSignal;
}, parse: { sync(e, t) {
  return e.aborted ? { reason: t.parse(e.reason) } : {};
}, async async(e, t) {
  if (e.aborted) return { reason: await t.parse(e.reason) };
  let r = await ot(e);
  return { reason: await t.parse(r) };
}, stream(e, t) {
  if (e.aborted) return { reason: t.parse(e.reason) };
  let r = ot(e);
  return { factory: t.parse(Y), controller: t.parse(r) };
} }, serialize(e, t) {
  return e.reason ? "AbortSignal.abort(" + t.serialize(e.reason) + ")" : e.controller && e.factory ? "(" + t.serialize(e.factory) + ")(" + t.serialize(e.controller) + ").signal" : "(new AbortController).signal";
}, deserialize(e, t) {
  return e.reason ? AbortSignal.abort(t.deserialize(e.reason)) : e.controller ? xe$1(t.deserialize(e.controller)).signal : new AbortController().signal;
} }, _i = Ai;
function be$1(e) {
  return { detail: e.detail, bubbles: e.bubbles, cancelable: e.cancelable, composed: e.composed };
}
var Pi = { tag: "seroval-plugins/web/CustomEvent", test(e) {
  return typeof CustomEvent > "u" ? false : e instanceof CustomEvent;
}, parse: { sync(e, t) {
  return { type: t.parse(e.type), options: t.parse(be$1(e)) };
}, async async(e, t) {
  return { type: await t.parse(e.type), options: await t.parse(be$1(e)) };
}, stream(e, t) {
  return { type: t.parse(e.type), options: t.parse(be$1(e)) };
} }, serialize(e, t) {
  return "new CustomEvent(" + t.serialize(e.type) + "," + t.serialize(e.options) + ")";
}, deserialize(e, t) {
  return new CustomEvent(t.deserialize(e.type), t.deserialize(e.options));
} }, $i = Pi, zi = { tag: "seroval-plugins/web/DOMException", test(e) {
  return typeof DOMException > "u" ? false : e instanceof DOMException;
}, parse: { sync(e, t) {
  return { name: t.parse(e.name), message: t.parse(e.message) };
}, async async(e, t) {
  return { name: await t.parse(e.name), message: await t.parse(e.message) };
}, stream(e, t) {
  return { name: t.parse(e.name), message: t.parse(e.message) };
} }, serialize(e, t) {
  return "new DOMException(" + t.serialize(e.message) + "," + t.serialize(e.name) + ")";
}, deserialize(e, t) {
  return new DOMException(t.deserialize(e.message), t.deserialize(e.name));
} }, Ci = zi;
function me$1(e) {
  return { bubbles: e.bubbles, cancelable: e.cancelable, composed: e.composed };
}
var Oi = { tag: "seroval-plugins/web/Event", test(e) {
  return typeof Event > "u" ? false : e instanceof Event;
}, parse: { sync(e, t) {
  return { type: t.parse(e.type), options: t.parse(me$1(e)) };
}, async async(e, t) {
  return { type: await t.parse(e.type), options: await t.parse(me$1(e)) };
}, stream(e, t) {
  return { type: t.parse(e.type), options: t.parse(me$1(e)) };
} }, serialize(e, t) {
  return "new Event(" + t.serialize(e.type) + "," + t.serialize(e.options) + ")";
}, deserialize(e, t) {
  return new Event(t.deserialize(e.type), t.deserialize(e.options));
} }, Ti = Oi, Ii = { tag: "seroval-plugins/web/File", test(e) {
  return typeof File > "u" ? false : e instanceof File;
}, parse: { async async(e, t) {
  return { name: await t.parse(e.name), options: await t.parse({ type: e.type, lastModified: e.lastModified }), buffer: await t.parse(await e.arrayBuffer()) };
} }, serialize(e, t) {
  return "new File([" + t.serialize(e.buffer) + "]," + t.serialize(e.name) + "," + t.serialize(e.options) + ")";
}, deserialize(e, t) {
  return new File([t.deserialize(e.buffer)], t.deserialize(e.name), t.deserialize(e.options));
} }, Li = Ii;
function ye$1(e) {
  let t = [];
  return e.forEach((r, n) => {
    t.push([n, r]);
  }), t;
}
var z = {}, hr = (e, t = new FormData(), r = 0, n = e.length, a) => {
  for (; r < n; r++) a = e[r], t.append(a[0], a[1]);
  return t;
}, Ni = { tag: "seroval-plugins/web/FormDataFactory", test(e) {
  return e === z;
}, parse: { sync() {
  return z;
}, async async() {
  return await Promise.resolve(z);
}, stream() {
  return z;
} }, serialize() {
  return hr.toString();
}, deserialize() {
  return z;
} }, Fi = { tag: "seroval-plugins/web/FormData", extends: [Li, Ni], test(e) {
  return typeof FormData > "u" ? false : e instanceof FormData;
}, parse: { sync(e, t) {
  return { factory: t.parse(z), entries: t.parse(ye$1(e)) };
}, async async(e, t) {
  return { factory: await t.parse(z), entries: await t.parse(ye$1(e)) };
}, stream(e, t) {
  return { factory: t.parse(z), entries: t.parse(ye$1(e)) };
} }, serialize(e, t) {
  return "(" + t.serialize(e.factory) + ")(" + t.serialize(e.entries) + ")";
}, deserialize(e, t) {
  return hr(t.deserialize(e.entries));
} }, Ui = Fi;
function we$1(e) {
  let t = [];
  return e.forEach((r, n) => {
    t.push([n, r]);
  }), t;
}
var ji = { tag: "seroval-plugins/web/Headers", test(e) {
  return typeof Headers > "u" ? false : e instanceof Headers;
}, parse: { sync(e, t) {
  return { value: t.parse(we$1(e)) };
}, async async(e, t) {
  return { value: await t.parse(we$1(e)) };
}, stream(e, t) {
  return { value: t.parse(we$1(e)) };
} }, serialize(e, t) {
  return "new Headers(" + t.serialize(e.value) + ")";
}, deserialize(e, t) {
  return new Headers(t.deserialize(e.value));
} }, Ue$1 = ji, C$1 = {}, gr = (e) => new ReadableStream({ start: (t) => {
  e.on({ next: (r) => {
    try {
      t.enqueue(r);
    } catch {
    }
  }, throw: (r) => {
    t.error(r);
  }, return: () => {
    try {
      t.close();
    } catch {
    }
  } });
} }), Di = { tag: "seroval-plugins/web/ReadableStreamFactory", test(e) {
  return e === C$1;
}, parse: { sync() {
  return C$1;
}, async async() {
  return await Promise.resolve(C$1);
}, stream() {
  return C$1;
} }, serialize() {
  return gr.toString();
}, deserialize() {
  return C$1;
} };
function it(e) {
  let t = ee(), r = e.getReader();
  async function n() {
    try {
      let a = await r.read();
      a.done ? t.return(a.value) : (t.next(a.value), await n());
    } catch (a) {
      t.throw(a);
    }
  }
  return n().catch(() => {
  }), t;
}
var Hi = { tag: "seroval/plugins/web/ReadableStream", extends: [Di], test(e) {
  return typeof ReadableStream > "u" ? false : e instanceof ReadableStream;
}, parse: { sync(e, t) {
  return { factory: t.parse(C$1), stream: t.parse(ee()) };
}, async async(e, t) {
  return { factory: await t.parse(C$1), stream: await t.parse(it(e)) };
}, stream(e, t) {
  return { factory: t.parse(C$1), stream: t.parse(it(e)) };
} }, serialize(e, t) {
  return "(" + t.serialize(e.factory) + ")(" + t.serialize(e.stream) + ")";
}, deserialize(e, t) {
  let r = t.deserialize(e.stream);
  return gr(r);
} }, je$1 = Hi;
function ut(e, t) {
  return { body: t, cache: e.cache, credentials: e.credentials, headers: e.headers, integrity: e.integrity, keepalive: e.keepalive, method: e.method, mode: e.mode, redirect: e.redirect, referrer: e.referrer, referrerPolicy: e.referrerPolicy };
}
var qi = { tag: "seroval-plugins/web/Request", extends: [je$1, Ue$1], test(e) {
  return typeof Request > "u" ? false : e instanceof Request;
}, parse: { async async(e, t) {
  return { url: await t.parse(e.url), options: await t.parse(ut(e, e.body && !e.bodyUsed ? await e.clone().arrayBuffer() : null)) };
}, stream(e, t) {
  return { url: t.parse(e.url), options: t.parse(ut(e, e.body && !e.bodyUsed ? e.clone().body : null)) };
} }, serialize(e, t) {
  return "new Request(" + t.serialize(e.url) + "," + t.serialize(e.options) + ")";
}, deserialize(e, t) {
  return new Request(t.deserialize(e.url), t.deserialize(e.options));
} }, Mi = qi;
function ct(e) {
  return { headers: e.headers, status: e.status, statusText: e.statusText };
}
var Bi = { tag: "seroval-plugins/web/Response", extends: [je$1, Ue$1], test(e) {
  return typeof Response > "u" ? false : e instanceof Response;
}, parse: { async async(e, t) {
  return { body: await t.parse(e.body && !e.bodyUsed ? await e.clone().arrayBuffer() : null), options: await t.parse(ct(e)) };
}, stream(e, t) {
  return { body: t.parse(e.body && !e.bodyUsed ? e.clone().body : null), options: t.parse(ct(e)) };
} }, serialize(e, t) {
  return "new Response(" + t.serialize(e.body) + "," + t.serialize(e.options) + ")";
}, deserialize(e, t) {
  return new Response(t.deserialize(e.body), t.deserialize(e.options));
} }, Vi = Bi, Wi = { tag: "seroval-plugins/web/URL", test(e) {
  return typeof URL > "u" ? false : e instanceof URL;
}, parse: { sync(e, t) {
  return { value: t.parse(e.href) };
}, async async(e, t) {
  return { value: await t.parse(e.href) };
}, stream(e, t) {
  return { value: t.parse(e.href) };
} }, serialize(e, t) {
  return "new URL(" + t.serialize(e.value) + ")";
}, deserialize(e, t) {
  return new URL(t.deserialize(e.value));
} }, Gi = Wi, Xi = { tag: "seroval-plugins/web/URLSearchParams", test(e) {
  return typeof URLSearchParams > "u" ? false : e instanceof URLSearchParams;
}, parse: { sync(e, t) {
  return { value: t.parse(e.toString()) };
}, async async(e, t) {
  return { value: await t.parse(e.toString()) };
}, stream(e, t) {
  return { value: t.parse(e.toString()) };
} }, serialize(e, t) {
  return "new URLSearchParams(" + t.serialize(e.value) + ")";
}, deserialize(e, t) {
  return new URLSearchParams(t.deserialize(e.value));
} }, Ji = Xi;
const De$1 = [_i, $i, Ci, Ti, Ui, Ue$1, je$1, Mi, Vi, Ji, Gi], Yi = 64, br = Et.RegExp;
function mr(e) {
  const t = new TextEncoder().encode(e), r = t.length, n = r.toString(16), a = "00000000".substring(0, 8 - n.length) + n, o = new TextEncoder().encode(`;0x${a};`), i = new Uint8Array(12 + r);
  return i.set(o), i.set(t, 12), i;
}
function lt(e, t) {
  return new ReadableStream({ start(r) {
    vi(t, { scopeId: e, plugins: De$1, onSerialize(n, a) {
      r.enqueue(mr(a ? `(${Kn(e)},${n})` : n));
    }, onDone() {
      r.close();
    }, onError(n) {
      r.error(n);
    } });
  } });
}
function Ki(e) {
  return new ReadableStream({ start(t) {
    Si(e, { disabledFeatures: br, depthLimit: Yi, plugins: De$1, onParse(r) {
      t.enqueue(mr(JSON.stringify(r)));
    }, onDone() {
      t.close();
    }, onError(r) {
      t.error(r);
    } });
  } });
}
async function ft(e) {
  return Ei(JSON.parse(e), { plugins: De$1, disabledFeatures: br });
}
async function Qi(e) {
  const t = yn(e), r = t.request, n = r.headers.get("X-Server-Id"), a = r.headers.get("X-Server-Instance"), o = r.headers.has("X-Single-Flight"), i = new URL(r.url);
  let u, c;
  if (n) gn(typeof n == "string", "Invalid server function"), [u, c] = decodeURIComponent(n).split("#");
  else if (u = i.searchParams.get("id"), c = i.searchParams.get("name"), !u || !c) return new Response(null, { status: 404 });
  const l = Fn[u];
  let p;
  if (!l) return new Response(null, { status: 404 });
  p = await l.importer();
  const d = p[l.functionName];
  let w = [];
  if (!a || e.method === "GET") {
    const f = i.searchParams.get("args");
    if (f) {
      const k = await ft(f);
      for (const re of k) w.push(re);
    }
  }
  if (e.method === "POST") {
    const f = r.headers.get("content-type"), k = e.node.req, re = k instanceof ReadableStream, yr = k.body instanceof ReadableStream, wr = re && k.locked || yr && k.body.locked, vr = re ? k : k.body, pe = wr ? r : new Request(r, { ...r, body: vr });
    r.headers.get("x-serialized") ? w = await ft(await pe.text()) : (f == null ? void 0 : f.startsWith("multipart/form-data")) || (f == null ? void 0 : f.startsWith("application/x-www-form-urlencoded")) ? w.push(await pe.formData()) : (f == null ? void 0 : f.startsWith("application/json")) && (w = await pe.json());
  }
  try {
    let f = await provideRequestEvent(t, async () => (sharedConfig.context = { event: t }, t.locals.serverFunctionMeta = { id: u + "#" + c }, d(...w)));
    if (o && a && (f = await dt(t, f)), f instanceof Response) {
      if (f.headers && f.headers.has("X-Content-Raw")) return f;
      a && (f.headers && We$1(e, f.headers), f.status && (f.status < 300 || f.status >= 400) && ie(e, f.status), f.customBody ? f = await f.customBody() : f.body == null && (f = null));
    }
    if (!a) return pt(f, r, w);
    return D$1(e, "x-serialized", "true"), D$1(e, "content-type", "text/javascript"), lt(a, f);
    return Ki(f);
  } catch (f) {
    if (f instanceof Response) o && a && (f = await dt(t, f)), f.headers && We$1(e, f.headers), f.status && (!a || f.status < 300 || f.status >= 400) && ie(e, f.status), f.customBody ? f = f.customBody() : f.body == null && (f = null), D$1(e, "X-Error", "true");
    else if (a) {
      const k = f instanceof Error ? f.message : typeof f == "string" ? f : "true";
      D$1(e, "X-Error", k.replace(/[\r\n]+/g, ""));
    } else f = pt(f, r, w, true);
    return a ? (D$1(e, "x-serialized", "true"), D$1(e, "content-type", "text/javascript"), lt(a, f)) : f;
  }
}
function pt(e, t, r, n) {
  const a = new URL(t.url), o = e instanceof Error;
  let i = 302, u;
  return e instanceof Response ? (u = new Headers(e.headers), e.headers.has("Location") && (u.set("Location", new URL(e.headers.get("Location"), a.origin + "").toString()), i = Nn(e))) : u = new Headers({ Location: new URL(t.headers.get("referer")).toString() }), e && u.append("Set-Cookie", `flash=${encodeURIComponent(JSON.stringify({ url: a.pathname + a.search, result: o ? e.message : e, thrown: n, error: o, input: [...r.slice(0, -1), [...r[r.length - 1].entries()]] }))}; Secure; HttpOnly;`), new Response(null, { status: i, headers: u });
}
let ve$1;
function Zi(e) {
  var _a2;
  const t = new Headers(e.request.headers), r = an(e.nativeEvent), n = e.response.headers.getSetCookie();
  t.delete("cookie");
  let a = false;
  return ((_a2 = e.nativeEvent.node) == null ? void 0 : _a2.req) && (a = true, e.nativeEvent.node.req.headers.cookie = ""), n.forEach((o) => {
    if (!o) return;
    const { maxAge: i, expires: u, name: c, value: l } = Wr(o);
    if (i != null && i <= 0) {
      delete r[c];
      return;
    }
    if (u != null && u.getTime() <= Date.now()) {
      delete r[c];
      return;
    }
    r[c] = l;
  }), Object.entries(r).forEach(([o, i]) => {
    t.append("cookie", `${o}=${i}`), a && (e.nativeEvent.node.req.headers.cookie += `${o}=${i};`);
  }), t;
}
async function dt(e, t) {
  let r, n = new URL(e.request.headers.get("referer")).toString();
  t instanceof Response && (t.headers.has("X-Revalidate") && (r = t.headers.get("X-Revalidate").split(",")), t.headers.has("Location") && (n = new URL(t.headers.get("Location"), new URL(e.request.url).origin + "").toString()));
  const a = mn(e);
  return a.request = new Request(n, { headers: Zi(e) }), await provideRequestEvent(a, async () => {
    await In(a), ve$1 || (ve$1 = (await import('../build/app-BvOtGpCX.mjs')).default), a.router.dataOnly = r || true, a.router.previousUrl = e.request.headers.get("referer");
    try {
      renderToString(() => {
        sharedConfig.context.event = a, ve$1();
      });
    } catch (u) {
      console.log(u);
    }
    const o = a.router.data;
    if (!o) return t;
    let i = false;
    for (const u in o) o[u] === void 0 ? delete o[u] : i = true;
    return i && (t instanceof Response ? t.customBody && (o._$value = t.customBody()) : (o._$value = t, t = new Response(null, { status: 200 })), t.customBody = () => o, t.headers.set("X-Single-Flight", "true")), t;
  });
}
const fu = eventHandler(Qi);

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
const ce = isServer ? (e) => {
  const t = getRequestEvent();
  return t.response.status = e.code, t.response.statusText = e.text, onCleanup(() => !t.nativeEvent.handled && !t.complete && (t.response.status = 200)), null;
} : (e) => null;
var pe = ["<span", ' style="font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;">500 | Internal Server Error</span>'];
const le = (e) => {
  let t = false;
  const r = catchError(() => e.children, (n) => {
    console.error(n), t = !!n;
  });
  return t ? [ssr(pe, ssrHydrationKey()), createComponent$1(ce, { code: 500 })] : r;
};
var de = " ";
const ue = { style: (e) => ssrElement("style", e.attrs, () => e.children, true), link: (e) => ssrElement("link", e.attrs, void 0, true), script: (e) => e.attrs.src ? ssrElement("script", mergeProps(() => e.attrs, { get id() {
  return e.key;
} }), () => ssr(de), true) : null, noscript: (e) => ssrElement("noscript", e.attrs, () => escape(e.children), true) };
function he(e, t) {
  let { tag: r, attrs: { key: n, ...o } = { key: void 0 }, children: a } = e;
  return ue[r]({ attrs: { ...o, nonce: t }, key: n, children: a });
}
var T$1 = ["<script", ">", "<\/script>"], v = ["<script", ' type="module"', "><\/script>"];
const fe = ssr("<!DOCTYPE html>");
function me(e) {
  const t = getRequestEvent(), r = t.nonce;
  return createComponent$1(NoHydration, { get children() {
    return [fe, createComponent$1(le, { get children() {
      return createComponent$1(e.document, { get assets() {
        return t.assets.map((n) => he(n));
      }, get scripts() {
        return r ? [ssr(T$1, ssrHydrationKey() + ssrAttribute("nonce", escape(r, true), false), `window.manifest = ${JSON.stringify(t.manifest)}`), ssr(v, ssrHydrationKey(), ssrAttribute("src", escape(globalThis.MANIFEST.client.inputs[globalThis.MANIFEST.client.handler].output.path, true), false))] : [ssr(T$1, ssrHydrationKey(), `window.manifest = ${JSON.stringify(t.manifest)}`), ssr(v, ssrHydrationKey(), ssrAttribute("src", escape(globalThis.MANIFEST.client.inputs[globalThis.MANIFEST.client.handler].output.path, true), false))];
      } });
    } })];
  } });
}
function ge(e = {}) {
  let t, r = false;
  const n = (i) => {
    if (t && t !== i) throw new Error("Context conflict");
  };
  let o;
  if (e.asyncContext) {
    const i = e.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    i ? o = new i() : console.warn("[unctx] `AsyncLocalStorage` is not provided.");
  }
  const a = () => {
    if (o) {
      const i = o.getStore();
      if (i !== void 0) return i;
    }
    return t;
  };
  return { use: () => {
    const i = a();
    if (i === void 0) throw new Error("Context is not available");
    return i;
  }, tryUse: () => a(), set: (i, s) => {
    s || n(i), t = i, r = true;
  }, unset: () => {
    t = void 0, r = false;
  }, call: (i, s) => {
    n(i), t = i;
    try {
      return o ? o.run(i, s) : s();
    } finally {
      r || (t = void 0);
    }
  }, async callAsync(i, s) {
    t = i;
    const p = () => {
      t = i;
    }, c = () => t === i ? p : void 0;
    A.add(c);
    try {
      const d = o ? o.run(i, s) : s();
      return r || (t = void 0), await d;
    } finally {
      A.delete(c);
    }
  } };
}
function be(e = {}) {
  const t = {};
  return { get(r, n = {}) {
    return t[r] || (t[r] = ge({ ...e, ...n })), t[r];
  } };
}
const k = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof global < "u" ? global : {}, P = "__unctx__", we = k[P] || (k[P] = be()), ye = (e, t = {}) => we.get(e, t), $ = "__unctx_async_handlers__", A = k[$] || (k[$] = /* @__PURE__ */ new Set());
function ke(e) {
  let t;
  const r = D(e), n = { duplex: "half", method: e.method, headers: e.headers };
  return e.node.req.body instanceof ArrayBuffer ? new Request(r, { ...n, body: e.node.req.body }) : new Request(r, { ...n, get body() {
    return t || (t = Ae(e), t);
  } });
}
function xe(e) {
  var _a;
  return (_a = e.web) != null ? _a : e.web = { request: ke(e), url: D(e) }, e.web.request;
}
function Re() {
  return _e();
}
const q = /* @__PURE__ */ Symbol("$HTTPEvent");
function Ee(e) {
  return typeof e == "object" && (e instanceof H3Event || (e == null ? void 0 : e[q]) instanceof H3Event || (e == null ? void 0 : e.__is_event__) === true);
}
function l(e) {
  return function(...t) {
    var _a;
    let r = t[0];
    if (Ee(r)) t[0] = r instanceof H3Event || r.__is_event__ ? r : r[q];
    else {
      if (!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext)) throw new Error("AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.");
      if (r = Re(), !r) throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");
      t.unshift(r);
    }
    return e(...t);
  };
}
const D = l(getRequestURL), Se = l(getRequestIP), C = l(setResponseStatus), H = l(getResponseStatus), Te = l(getResponseStatusText), y = l(getResponseHeaders), N = l(getResponseHeader), ve = l(setResponseHeader), Pe = l(appendResponseHeader), $e = l(sendRedirect), Ae = l(getRequestWebStream), Ce = l(removeResponseHeader), He = l(xe);
function Ne() {
  var _a;
  return ye("nitro-app", { asyncContext: !!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext), AsyncLocalStorage: AsyncLocalStorage });
}
function _e() {
  return Ne().use().event;
}
const g = { NORMAL: 0, WILDCARD: 1, PLACEHOLDER: 2 };
function Le(e = {}) {
  const t = { options: e, rootNode: I(), staticRoutesMap: {} }, r = (n) => e.strictTrailingSlash ? n : n.replace(/\/$/, "") || "/";
  if (e.routes) for (const n in e.routes) _(t, r(n), e.routes[n]);
  return { ctx: t, lookup: (n) => Oe(t, r(n)), insert: (n, o) => _(t, r(n), o), remove: (n) => qe(t, r(n)) };
}
function Oe(e, t) {
  const r = e.staticRoutesMap[t];
  if (r) return r.data;
  const n = t.split("/"), o = {};
  let a = false, i = null, s = e.rootNode, p = null;
  for (let c = 0; c < n.length; c++) {
    const d = n[c];
    s.wildcardChildNode !== null && (i = s.wildcardChildNode, p = n.slice(c).join("/"));
    const b = s.children.get(d);
    if (b === void 0) {
      if (s && s.placeholderChildren.length > 1) {
        const W = n.length - c;
        s = s.placeholderChildren.find((j) => j.maxDepth === W) || null;
      } else s = s.placeholderChildren[0] || null;
      if (!s) break;
      s.paramName && (o[s.paramName] = d), a = true;
    } else s = b;
  }
  return (s === null || s.data === null) && i !== null && (s = i, o[s.paramName || "_"] = p, a = true), s ? a ? { ...s.data, params: a ? o : void 0 } : s.data : null;
}
function _(e, t, r) {
  let n = true;
  const o = t.split("/");
  let a = e.rootNode, i = 0;
  const s = [a];
  for (const p of o) {
    let c;
    if (c = a.children.get(p)) a = c;
    else {
      const d = De(p);
      c = I({ type: d, parent: a }), a.children.set(p, c), d === g.PLACEHOLDER ? (c.paramName = p === "*" ? `_${i++}` : p.slice(1), a.placeholderChildren.push(c), n = false) : d === g.WILDCARD && (a.wildcardChildNode = c, c.paramName = p.slice(3) || "_", n = false), s.push(c), a = c;
    }
  }
  for (const [p, c] of s.entries()) c.maxDepth = Math.max(s.length - p, c.maxDepth || 0);
  return a.data = r, n === true && (e.staticRoutesMap[t] = a), a;
}
function qe(e, t) {
  let r = false;
  const n = t.split("/");
  let o = e.rootNode;
  for (const a of n) if (o = o.children.get(a), !o) return r;
  if (o.data) {
    const a = n.at(-1) || "";
    o.data = null, Object.keys(o.children).length === 0 && o.parent && (o.parent.children.delete(a), o.parent.wildcardChildNode = null, o.parent.placeholderChildren = []), r = true;
  }
  return r;
}
function I(e = {}) {
  return { type: e.type || g.NORMAL, maxDepth: 0, parent: e.parent || null, children: /* @__PURE__ */ new Map(), data: e.data || null, paramName: e.paramName || null, wildcardChildNode: null, placeholderChildren: [] };
}
function De(e) {
  return e.startsWith("**") ? g.WILDCARD : e[0] === ":" || e === "*" ? g.PLACEHOLDER : g.NORMAL;
}
const M = [{ page: false, $GET: { src: "src/routes/api/integrations/printful/connect.ts?pick=GET", build: () => import('../build/connect5.mjs'), import: () => import('../build/connect5.mjs') }, $HEAD: { src: "src/routes/api/integrations/printful/connect.ts?pick=GET", build: () => import('../build/connect5.mjs'), import: () => import('../build/connect5.mjs') }, $POST: { src: "src/routes/api/integrations/printful/connect.ts?pick=POST", build: () => import('../build/connect22.mjs'), import: () => import('../build/connect22.mjs') }, path: "/api/integrations/printful/connect", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/api/integrations/printful/connect.ts" }, { page: false, $GET: { src: "src/routes/api/integrations/printify/connect.ts?pick=GET", build: () => import('../build/connect32.mjs'), import: () => import('../build/connect32.mjs') }, $HEAD: { src: "src/routes/api/integrations/printify/connect.ts?pick=GET", build: () => import('../build/connect32.mjs'), import: () => import('../build/connect32.mjs') }, $POST: { src: "src/routes/api/integrations/printify/connect.ts?pick=POST", build: () => import('../build/connect42.mjs'), import: () => import('../build/connect42.mjs') }, path: "/api/integrations/printify/connect", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/api/integrations/printify/connect.ts" }, { page: false, $POST: { src: "src/routes/api/payments/subscribe.ts?pick=POST", build: () => import('../build/subscribe2.mjs'), import: () => import('../build/subscribe2.mjs') }, path: "/api/payments/subscribe", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/api/payments/subscribe.ts" }, { page: false, $POST: { src: "src/routes/api/payments/webhook.ts?pick=POST", build: () => import('../build/webhook2.mjs'), import: () => import('../build/webhook2.mjs') }, path: "/api/payments/webhook", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/api/payments/webhook.ts" }, { page: true, path: "/dashboard/analytics", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/analytics.tsx" }, { page: true, path: "/dashboard/brands/:id", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/brands/[id].tsx" }, { page: true, path: "/dashboard/brands/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/brands/index.tsx" }, { page: true, path: "/dashboard/brands/new", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/brands/new.tsx" }, { page: true, path: "/dashboard/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/index.tsx" }, { page: true, path: "/dashboard/integrations/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/integrations/index.tsx" }, { page: true, path: "/dashboard/mockups/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/mockups/index.tsx" }, { page: true, path: "/dashboard/products/:id", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/products/[id].tsx" }, { page: true, path: "/dashboard/products/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/products/index.tsx" }, { page: true, path: "/dashboard/settings/billing", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/settings/billing.tsx" }, { page: true, path: "/dashboard/settings/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/settings/index.tsx" }, { page: true, path: "/dashboard/templates/:id", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/templates/[id].tsx" }, { page: true, path: "/dashboard/templates/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/dashboard/templates/index.tsx" }, { page: true, path: "/", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/index.tsx" }, { page: true, path: "/login", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/login.tsx" }, { page: true, path: "/pricing", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/pricing.tsx" }, { page: true, path: "/register", filePath: "/home/node/.openclaw/workspace/cockbrothers/apps/frontend/src/routes/register.tsx" }];
Ie(M.filter((e) => e.page));
function Ie(e) {
  function t(r, n, o, a) {
    const i = Object.values(r).find((s) => o.startsWith(s.id + "/"));
    return i ? (t(i.children || (i.children = []), n, o.slice(i.id.length)), r) : (r.push({ ...n, id: o, path: o.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/") }), r);
  }
  return e.sort((r, n) => r.path.length - n.path.length).reduce((r, n) => t(r, n, n.path, n.path), []);
}
function Me(e, t) {
  const r = je.lookup(e);
  if (r && r.route) {
    const n = r.route, o = t === "HEAD" ? n.$HEAD || n.$GET : n[`$${t}`];
    if (o === void 0) return;
    const a = n.page === true && n.$component !== void 0;
    return { handler: o, params: r.params, isPage: a };
  }
}
function We(e) {
  return e.$HEAD || e.$GET || e.$POST || e.$PUT || e.$PATCH || e.$DELETE;
}
const je = Le({ routes: M.reduce((e, t) => {
  if (!We(t)) return e;
  let r = t.path.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/").replace(/\*([^/]*)/g, (n, o) => `**:${o}`).split("/").map((n) => n.startsWith(":") || n.startsWith("*") ? n : encodeURIComponent(n)).join("/");
  if (/:[^/]*\?/g.test(r)) throw new Error(`Optional parameters are not supported in API routes: ${r}`);
  if (e[r]) throw new Error(`Duplicate API routes for "${r}" found at "${e[r].route.path}" and "${t.path}"`);
  return e[r] = { route: t }, e;
}, {}) }), R = "solidFetchEvent";
function Ge(e) {
  return { request: He(e), response: Be(e), clientAddress: Se(e), locals: {}, nativeEvent: e };
}
function Fe(e) {
  if (!e.context[R]) {
    const t = Ge(e);
    e.context[R] = t;
  }
  return e.context[R];
}
class Ue {
  constructor(t) {
    __publicField(this, "event");
    this.event = t;
  }
  get(t) {
    const r = N(this.event, t);
    return Array.isArray(r) ? r.join(", ") : r || null;
  }
  has(t) {
    return this.get(t) !== null;
  }
  set(t, r) {
    return ve(this.event, t, r);
  }
  delete(t) {
    return Ce(this.event, t);
  }
  append(t, r) {
    Pe(this.event, t, r);
  }
  getSetCookie() {
    const t = N(this.event, "Set-Cookie");
    return Array.isArray(t) ? t : [t];
  }
  forEach(t) {
    return Object.entries(y(this.event)).forEach(([r, n]) => t(Array.isArray(n) ? n.join(", ") : n, r, this));
  }
  entries() {
    return Object.entries(y(this.event)).map(([t, r]) => [t, Array.isArray(r) ? r.join(", ") : r])[Symbol.iterator]();
  }
  keys() {
    return Object.keys(y(this.event))[Symbol.iterator]();
  }
  values() {
    return Object.values(y(this.event)).map((t) => Array.isArray(t) ? t.join(", ") : t)[Symbol.iterator]();
  }
  [Symbol.iterator]() {
    return this.entries()[Symbol.iterator]();
  }
}
function Be(e) {
  return { get status() {
    return H(e);
  }, set status(t) {
    C(e, t);
  }, get statusText() {
    return Te(e);
  }, set statusText(t) {
    C(e, H(e), t);
  }, headers: new Ue(e) };
}
const Ke = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function ze(e) {
  return e.status && Ke.has(e.status) ? e.status : 302;
}
function Je(e, t, r = {}, n) {
  return eventHandler({ handler: (o) => {
    const a = Fe(o);
    return provideRequestEvent(a, async () => {
      const i = Me(new URL(a.request.url).pathname, a.request.method);
      if (i) {
        const c = await i.handler.import(), d = a.request.method === "HEAD" ? c.HEAD || c.GET : c[a.request.method];
        a.params = i.params || {}, sharedConfig.context = { event: a };
        const b = await d(a);
        if (b !== void 0) return b;
        if (a.request.method !== "GET") throw new Error(`API handler for ${a.request.method} "${a.request.url}" did not return a response.`);
        if (!i.isPage) return;
      }
      const s = await t(a), p = typeof r == "function" ? await r(s) : { ...r };
      p.mode, p.nonce && (s.nonce = p.nonce);
      {
        const c = renderToString(() => (sharedConfig.context.event = s, e(s)), p);
        if (s.complete = true, s.response && s.response.headers.get("Location")) {
          const d = ze(s.response);
          return $e(o, s.response.headers.get("Location"), d);
        }
        return c;
      }
    });
  } });
}
function Ye(e, t, r) {
  return Je(e, Qe, t);
}
async function Qe(e) {
  const t = globalThis.MANIFEST.client;
  return Object.assign(e, { manifest: await t.json(), assets: [...await t.inputs[t.handler].assets()], routes: [], complete: false, $islands: /* @__PURE__ */ new Set() });
}
var Ve = ['<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Cockbrothers - AI-powered brand kit generator &amp; mockup studio for print-on-demand"><meta name="theme-color" content="#6366f1"><meta property="og:title" content="Cockbrothers - Brand Kit Generator"><meta property="og:description" content="AI-powered brand kit generator &amp; mockup studio for print-on-demand entrepreneurs."><meta property="og:type" content="website"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>Cockbrothers - Brand Kit Generator & Mockup Studio</title>', "</head>"], Xe = ["<html", ' lang="en" class="h-full">', '<body class="h-full"><div id="app">', "</div><!--$-->", "<!--/--></body></html>"];
const st = Ye(() => createComponent$1(me, { document: ({ assets: e, children: t, scripts: r }) => ssr(Xe, ssrHydrationKey(), createComponent$1(NoHydration, { get children() {
  return ssr(Ve, escape(e));
} }), escape(t), escape(r)) }));

const handlers = [
  { route: '', handler: __Zp5N9, lazy: false, middleware: true, method: undefined },
  { route: '/_server', handler: fu, lazy: false, middleware: true, method: undefined },
  { route: '/', handler: st, lazy: false, middleware: true, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  {
    const _handler = h3App.handler;
    h3App.handler = (event) => {
      const ctx = { event };
      return nitroAsyncContext.callAsync(ctx, () => _handler(event));
    };
  }
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const nitroApp = useNitroApp();
const localFetch = nitroApp.localFetch;
const closePrerenderer = () => nitroApp.hooks.callHook("close");
trapUnhandledNodeErrors();

export { au as a, closePrerenderer as c, localFetch as l };
//# sourceMappingURL=nitro.mjs.map
