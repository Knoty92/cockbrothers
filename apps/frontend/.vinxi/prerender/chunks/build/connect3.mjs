async function a(t) {
  const e = new URL(t.request.url), o = e.searchParams.get("code"), n = e.searchParams.get("state"), r = e.searchParams.get("error");
  if (r) return Response.json({ error: { code: "OAUTH_ERROR", message: `Printify denied: ${r}` } }, { status: 400 });
  if (!o || !n) return Response.json({ error: { code: "INVALID_PARAMS", message: "Missing code or state" } }, { status: 400 });
  try {
    const s = "/dashboard/integrations";
    return new Response(null, { status: 302, headers: { Location: s } });
  } catch (s) {
    return Response.json({ error: { code: "TOKEN_EXCHANGE_FAILED", message: s.message } }, { status: 500 });
  }
}

export { a as GET };
//# sourceMappingURL=connect3.mjs.map
