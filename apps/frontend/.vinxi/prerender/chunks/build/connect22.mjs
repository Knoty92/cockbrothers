const c = "https://www.printful.com/oauth/authorize";
async function o(r) {
  var _a, _b;
  try {
    const s = new URL(r.request.url), n = (_a = s.searchParams.get("redirect")) != null ? _a : "/dashboard/integrations", t = (_b = process.env.PRINTFUL_CLIENT_ID) != null ? _b : "", a = crypto.randomUUID(), e = new URL(c);
    return e.searchParams.set("client_id", t), e.searchParams.set("redirect_uri", `${s.origin}/api/integrations/printful/callback`), e.searchParams.set("response_type", "code"), e.searchParams.set("state", a), e.searchParams.set("scope", "store_products"), Response.json({ data: { authUrl: e.toString() } });
  } catch (s) {
    return Response.json({ error: { code: "CONNECT_FAILED", message: s.message } }, { status: 500 });
  }
}

export { o as POST };
//# sourceMappingURL=connect22.mjs.map
