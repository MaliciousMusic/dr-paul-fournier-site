// Structured data: tells Google and AI assistants exactly who he is, on every page, in the same words.
import { LIEUX, PRATICIEN, SAME_AS, telIntl } from './config';
import { asset, href, type Lang } from './i18n';

const racine = (site: URL) => new URL(asset(''), site).href;
export const idPersonne = (site: URL) => `${racine(site)}#paul-fournier`;
export const idCabinet = (site: URL) => `${racine(site)}#cabinet`;

export function grapheBase(site: URL, lang: Lang) {
  // One entry per place, each with its own address and phone: that is what local search reads
  const lieux = LIEUX.filter((l) => l.adresse).map((l) => ({
    '@type': 'Dentist',
    '@id': `${racine(site)}#${l.id}`,
    name: `${PRATICIEN.nom}, ${l.nom[lang]}`,
    url: new URL(href(lang, 'contact'), site).href,
    image: new URL(asset('og.png'), site).href,
    parentOrganization: { '@id': idCabinet(site) },
    address: { '@type': 'PostalAddress', streetAddress: l.adresse, postalCode: l.cp, addressLocality: l.ville, addressRegion: 'Auvergne-Rhône-Alpes', addressCountry: 'FR' },
    ...(l.telephone && { telephone: telIntl(l.telephone) }),
  }));
  return [
    {
      '@type': 'Person',
      '@id': idPersonne(site),
      name: 'Paul Fournier',
      alternateName: ['Dr Paul Fournier', 'Docteur Paul Fournier'],
      honorificPrefix: 'Dr',
      jobTitle: PRATICIEN.titre[lang],
      description: `${PRATICIEN.nom}, ${PRATICIEN.titre[lang].toLowerCase()} à ${PRATICIEN.ville}.`,
      url: racine(site),
      worksFor: { '@id': idCabinet(site) },
      knowsAbout: ['Implantologie dentaire', 'Régénération osseuse', 'Dents de sagesse', 'Chirurgie plastique parodontale', 'Anesthésie générale en chirurgie dentaire', 'Impression 3D'],
      knowsLanguage: ['fr', 'en'],
      ...(SAME_AS.length && { sameAs: SAME_AS }),
    },
    {
      '@type': 'Dentist',
      '@id': idCabinet(site),
      name: PRATICIEN.nom,
      url: racine(site),
      image: new URL(asset('og.png'), site).href,
      founder: { '@id': idPersonne(site) },
      areaServed: [...new Set(LIEUX.map((l) => l.ville).filter(Boolean))].map((name) => ({ '@type': 'City', name })),
      ...(PRATICIEN.telephone && { telephone: telIntl(PRATICIEN.telephone) }),
      ...(lieux.length && { department: lieux.map((l) => ({ '@id': l['@id'] })) }),
    },
    ...lieux,
    { '@type': 'WebSite', '@id': `${racine(site)}#site`, url: racine(site), name: PRATICIEN.nom, inLanguage: ['fr', 'en'], publisher: { '@id': idPersonne(site) } },
  ];
}

export function fil(site: URL, lang: Lang, items: { nom: string; chemin: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((i, n) => ({ '@type': 'ListItem', position: n + 1, name: i.nom, item: new URL(href(lang, i.chemin), site).href })),
  };
}
