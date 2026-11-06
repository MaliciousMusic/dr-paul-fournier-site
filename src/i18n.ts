export type Lang = 'fr' | 'en';

export function localePaths() {
  return [
    { params: { lang: undefined }, props: { lang: 'fr' as Lang } },
    { params: { lang: 'en' }, props: { lang: 'en' as Lang } },
  ];
}

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const asset = (fichier: string) => `${BASE}${fichier}`;
export const href = (lang: Lang, path = '') => {
  const p = path ? `${path.replace(/^\/|\/$/g, '')}/` : '';
  return lang === 'fr' ? asset(p) : asset(`en/${p}`);
};

export const UI = {
  fr: {
    menu: 'Menu',
    appeler: 'Prendre rendez-vous',
    appelerCourt: 'Prendre rendez-vous',
    adresser: 'Adresser un patient',
    mentions: 'Mentions légales',
    confidentialite: 'Confidentialité',
    accesSoins: "Chacun a droit à l'accès à la prévention et aux soins, sans discrimination.",
    prudence: 'Chaque situation est différente. Seule une consultation permet de savoir ce qui convient, et aucun résultat ne peut être garanti.',
    skip: 'Aller au contenu',
    accueil: 'Accueil',
    aVoir: 'À voir aussi',
    bref: 'En bref',
  },
  en: {
    menu: 'Menu',
    appeler: 'Book an appointment',
    appelerCourt: 'Book an appointment',
    adresser: 'Refer a patient',
    mentions: 'Legal notice',
    confidentialite: 'Privacy',
    accesSoins: 'Everyone has the right to prevention and care, without discrimination.',
    prudence: 'Every situation is different. Only a consultation can tell what is suitable, and no result can be guaranteed.',
    skip: 'Skip to content',
    accueil: 'Home',
    aVoir: 'See also',
    bref: 'In short',
  },
} as const;
