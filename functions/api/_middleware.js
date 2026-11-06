// Pages' _headers file does not reach the functions: every API answer gets its own locked-down headers.
export async function onRequest({ next }) {
  const r = await next();
  const reponse = new Response(r.body, r);
  const h = reponse.headers;
  h.set('Cache-Control', 'no-store');
  h.set('X-Content-Type-Options', 'nosniff');
  h.set('X-Frame-Options', 'DENY');
  h.set('Referrer-Policy', 'no-referrer');
  h.set('X-Robots-Tag', 'noindex');
  h.set('Content-Security-Policy', "default-src 'none'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'");
  return reponse;
}
