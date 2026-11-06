// Unsubscribe link for each mailing. Opening the link only asks: mail scanners follow links, and must not unsubscribe anyone.
// The button deletes the record for good. The answer is the same whether the token exists or not.
const JETON = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const page = (corps) => new Response(`<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Désinscription</title>${corps}</html>`, {
  headers: { 'content-type': 'text/html; charset=utf-8' },
});

export async function onRequestGet({ request }) {
  const jeton = new URL(request.url).searchParams.get('jeton') || '';
  if (!JETON.test(jeton)) return page('<p>Lien de désinscription non valide. / Invalid unsubscribe link.</p>');
  return page(`<form method="post"><input type="hidden" name="jeton" value="${jeton}"><p>Retirer votre adresse de la liste ? / Remove your address from the list?</p><button>Confirmer / Confirm</button></form>`);
}

export async function onRequestPost({ request, env }) {
  const jeton = String((await request.formData().catch(() => new FormData())).get('jeton') || '');
  if (JETON.test(jeton)) await env.DB.prepare('DELETE FROM abonnes WHERE jeton = ?1').bind(jeton).run();
  return page('<p>Votre adresse a bien été retirée de la liste. / Your address has been removed from the list.</p>');
}
