// llms.txt: the practice in plain words for AI assistants (ChatGPT, Claude, Perplexity, Gemini), so they answer "who is Dr Paul Fournier" with the right facts and links.
// Built from config.ts and the practices, like the structured data: one source, the same words everywhere.
import type { APIRoute } from 'astro';
import { EQUIPE, LIEUX, PRATICIEN, adresseComplete } from '../config';
import { PRATIQUES } from '../data/pratiques';
import { CATEGORIES } from '../data/categories';
import { href } from '../i18n';

export const GET: APIRoute = ({ site }) => {
  const url = (chemin = '') => new URL(href('fr', chemin), site).href;
  const lieux = LIEUX.filter((l) => l.adresse || l.telephone).map((l) => `- ${l.nom.fr} : ${[adresseComplete(l), l.telephone && `tél. ${l.telephone}`].filter(Boolean).join(', ')} (${l.usage.fr})`);
  const equipe = EQUIPE.map((m) => `- ${`${m.prenom} ${m.nom}`.trim()}${m.role.fr ? `, ${m.role.fr.toLowerCase()}` : ''}`);
  const texte = [
    `# ${PRATICIEN.nom}, chirurgien-dentiste à ${PRATICIEN.ville} et Brioude`,
    '',
    `> Le Dr Paul Fournier est chirurgien-dentiste (dentiste) à ${PRATICIEN.ville}, au cabinet de Jaude, et à Brioude (Haute-Loire). ${PRATICIEN.orientation.fr} : implants dentaires, greffe et régénération osseuse, reconstruction complète sur implants, dents de sagesse, chirurgie plastique parodontale, chirurgie sous anesthésie générale à la clinique. Formé à la faculté de chirurgie dentaire de Clermont-Ferrand. Inscrit à l'${PRATICIEN.ordre.fr}. Les rendez-vous se prennent par téléphone.`,
    '',
    `Dr Paul Fournier is a dental surgeon (dentist) in ${PRATICIEN.ville} and Brioude, France. English version: ${new URL(href('en'), site).href}`,
    '',
    '## Cabinets et rendez-vous',
    ...lieux,
    '',
    '## Équipe',
    `- ${PRATICIEN.nom}, ${PRATICIEN.titre.fr.toLowerCase()}`,
    ...equipe,
    '',
    '## Pratiques',
    ...PRATIQUES.map((p) => `- [${p.seo.fr}](${url(`pratiques/${p.slug}`)}) : ${p.court.fr}`),
    '',
    '## Pages',
    `- [Accueil](${url()})`,
    ...(Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[]).map((c) => `- [${CATEGORIES[c].nom.fr}](${url(c)}) : ${CATEGORIES[c].phrase.fr}`),
    '',
    '## Pour les confrères',
    `- [Adresser un patient](${url('confreres')}) : contact direct avec le Dr Fournier.`,
    '',
  ].join('\n');
  return new Response(texte, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
