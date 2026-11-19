// Structured data: tells Google and AI assistants exactly who he is, on every page, in the same words.
import { EQUIPE, LIEUX, PRATICIEN, SAME_AS, adresseComplete, telIntl } from './config';
import { PRATIQUES } from './data/pratiques';
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
    medicalSpecialty: 'Dentistry',
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${PRATICIEN.nom}, ${adresseComplete(l)}`)}`,
    address: { '@type': 'PostalAddress', streetAddress: l.adresse, postalCode: l.cp, addressLocality: l.ville, addressRegion: 'Auvergne-Rhône-Alpes', addressCountry: 'FR' },
    ...(l.telephone && { telephone: telIntl(l.telephone) }),
  }));
  return [
    {
      '@type': 'Person',
      '@id': idPersonne(site),
      name: 'Paul Fournier',
      alternateName: ['Dr Paul Fournier', 'Docteur Paul Fournier', 'Dr Fournier', 'Paul Fournier dentiste', 'Paul Fournier chirurgien-dentiste'],
      givenName: 'Paul',
      familyName: 'Fournier',
      image: new URL(asset('og.png'), site).href,
      hasOccupation: { '@type': 'Occupation', name: PRATICIEN.titre[lang], occupationalCategory: '2261', occupationLocation: [...new Set(LIEUX.map((l) => l.ville).filter(Boolean))].map((name) => ({ '@type': 'City', name })) },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Faculté de chirurgie dentaire de Clermont-Ferrand' },
      workLocation: LIEUX.filter((l) => l.adresse).map((l) => ({ '@id': `${racine(site)}#${l.id}` })),
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
      alternateName: lang === 'fr' ? ['Cabinet dentaire du Dr Paul Fournier', 'Dentiste Paul Fournier'] : ['Dr Paul Fournier dental practice'],
      description: lang === 'fr'
        ? `Cabinet dentaire du Dr Paul Fournier, chirurgien-dentiste à ${PRATICIEN.ville} et Brioude : implants dentaires, greffe et régénération osseuse, dents de sagesse, chirurgie parodontale, chirurgie sous anesthésie générale.`
        : `Dental practice of Dr Paul Fournier, dental surgeon in ${PRATICIEN.ville} and Brioude, France: dental implants, bone grafting, wisdom teeth, periodontal surgery, surgery under general anaesthesia.`,
      image: new URL(asset('og.png'), site).href,
      logo: new URL(asset('apple-touch-icon.png'), site).href,
      medicalSpecialty: 'Dentistry',
      founder: { '@id': idPersonne(site) },
      employee: [{ '@id': idPersonne(site) }, ...EQUIPE.map((m) => ({ '@type': 'Person', name: `${m.prenom} ${m.nom}`.trim(), ...(m.role[lang] && { jobTitle: m.role[lang] }) }))],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: lang === 'fr' ? 'Soins et chirurgie dentaire' : 'Dental care and surgery',
        itemListElement: PRATIQUES.map((p) => ({ '@type': 'Offer', itemOffered: { '@type': 'MedicalProcedure', name: p.seo[lang], url: new URL(href(lang, `pratiques/${p.slug}`), site).href } })),
      },
      knowsLanguage: ['fr', 'en'],
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
