// Mailing list sign-up. Explicit consent only; the record keeps the date of consent and a token to unsubscribe.
const PROFILS = new Set([
  'Chirurgien-dentiste', 'Médecin', 'Interne ou étudiant', 'Assistant(e) dentaire', 'Autre professionnel de santé',
  'Dental surgeon', 'Physician', 'Resident or student', 'Dental assistant', 'Other health professional',
]);
const TAILLE_MAX = 4096;
const ESSAIS = 5;
const FENETRE = 10 * 60 * 1000;

const refus = (message, status) => new Response(message, { status, headers: { 'content-type': 'text/plain; charset=utf-8' } });

// Counts attempts per visitor. Only a hash of the address is kept, and only for the length of the window.
async function tropDEssais(request, env) {
  const ip = request.headers.get('cf-connecting-ip') || 'inconnu';
  const brut = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
  const cle = [...new Uint8Array(brut)].map((o) => o.toString(16).padStart(2, '0')).join('');
  const maintenant = Date.now();
  await env.DB.prepare('DELETE FROM essais WHERE quand < ?1').bind(maintenant - FENETRE).run();
  const { n } = await env.DB.prepare('SELECT COUNT(*) AS n FROM essais WHERE cle = ?1').bind(cle).first();
  if (n >= ESSAIS) return true;
  await env.DB.prepare('INSERT INTO essais (cle, quand) VALUES (?1, ?2)').bind(cle, maintenant).run();
  return false;
}

export async function onRequestPost({ request, env }) {
  const url = new URL(request.url);
  // Only our own pages may post here
  if (request.headers.get('origin') !== url.origin) return refus('Origine refusée.', 403);
  if (Number(request.headers.get('content-length') || 0) > TAILLE_MAX) return refus('Formulaire trop long.', 413);

  let form;
  try { form = await request.formData(); } catch { return refus('Formulaire illisible.', 400); }
  const email = String(form.get('email') || '').trim().toLowerCase();
  const profil = String(form.get('profil') || '');
  const langue = form.get('langue') === 'en' ? 'en' : 'fr';
  const retour = `${url.origin}${langue === 'en' ? '/en/evenements/' : '/evenements/'}?inscrit=1#liste`;

  // Bots fill the hidden field: pretend it worked, keep nothing.
  if (form.get('site')) return Response.redirect(retour, 303);

  const valide = email.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valide || !PROFILS.has(profil) || form.get('accord') !== 'on') return refus('Formulaire incomplet.', 400);
  if (await tropDEssais(request, env)) return refus('Trop de tentatives, réessayez plus tard.', 429);

  await env.DB.prepare(
    `INSERT INTO abonnes (email, profil, langue, accord_le, jeton) VALUES (?1, ?2, ?3, ?4, ?5)
     ON CONFLICT(email) DO UPDATE SET profil = ?2, langue = ?3, accord_le = ?4`,
  ).bind(email, profil, langue, new Date().toISOString(), crypto.randomUUID()).run();

  return Response.redirect(retour, 303);
}
