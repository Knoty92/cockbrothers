async function t(e) {
  try {
    const s = await e.request.json(), { priceId: r } = s;
    if (!r) return Response.json({ error: { code: "INVALID_PARAMS", message: "priceId is required" } }, { status: 400 });
    const o = new URL(e.request.url).origin;
    return Response.json({ data: { url: `${o}/dashboard/settings/billing?checkout=stub&price=${r}`, sessionId: `cs_stub_${crypto.randomUUID()}` } });
  } catch (s) {
    return Response.json({ error: { code: "SUBSCRIPTION_FAILED", message: s.message } }, { status: 500 });
  }
}

export { t as POST };
//# sourceMappingURL=subscribe2.mjs.map
