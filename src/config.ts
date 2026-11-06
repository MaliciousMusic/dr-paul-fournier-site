// Everything about the practice lives here. An empty value leaves a blank on the page.

// Draft: keeps the site out of search engines and shows the placeholder photo. Set PUBLIC_LIVE=1 at launch only.
export const DRAFT = import.meta.env.PUBLIC_LIVE !== '1';

// Third-party testimonials are excluded by the dental code (R.4127-215-1). The section stays off until the Order or a lawyer has answered.
export const SHOW_PEER_WORDS = false;

export const PRATICIEN = {
  nom: 'Dr Paul Fournier',
  titre: { fr: 'Chirurgien-dentiste', en: 'Dental surgeon' },
  // Wording required by the Order for a practitioner without the oral surgery qualification. To replace if Paul holds it.
  orientation: {
    fr: "Oriente sa pratique aux actes d'odontologie chirurgicale",
    en: 'Practice focused on surgical dentistry',
  },
  ville: 'Clermont-Ferrand',
  rpps: '',
  ordre: { fr: 'Ordre national des chirurgiens-dentistes', en: 'French National Order of Dental Surgeons' },
  telephone: '', // one line for both practices, e.g. '04 73 00 00 00'. Empty: the header call goes to the contact page, which has a number per practice
  email: '', // direct address for colleagues
  statut: '', // legal form and registration numbers for the legal notice
};

// Addresses and phones of the two practices come from Santé.fr (November 2026), to be confirmed by Paul. Clinic: still to give.
export const LIEUX = [
  {
    id: 'jaude',
    nom: { fr: 'Cabinet de Jaude', en: 'Jaude practice' },
    adresse: '8 rue Maréchal Foch',
    cp: '63000',
    ville: 'Clermont-Ferrand',
    horaires: '',
    telephone: '04 73 75 80 58',
    usage: { fr: 'Consultations et chirurgie', en: 'Consultations and surgery' },
  },
  {
    id: 'brioude',
    nom: { fr: 'Cabinet de Brioude', en: 'Brioude practice' },
    adresse: '40 avenue Léon Blum',
    cp: '43100',
    ville: 'Brioude',
    horaires: '',
    telephone: '04 71 50 25 20',
    usage: { fr: 'Consultations et chirurgie', en: 'Consultations and surgery' },
  },
  {
    id: 'clinique',
    nom: { fr: 'La clinique', en: 'The clinic' },
    adresse: '',
    cp: '',
    ville: '',
    horaires: '',
    telephone: '',
    usage: { fr: 'Interventions sous anesthésie générale', en: 'Procedures under general anaesthesia' },
  },
];
export const adresseComplete = (l: (typeof LIEUX)[number]) => (l.adresse ? `${l.adresse}, ${l.cp} ${l.ville}` : '');
export const telIntl = (t: string) => `+33${t.replace(/\s/g, '').slice(1)}`;

// Directory and network profiles, for search engines and AI only: never shown as links on the pages.
export const SAME_AS: string[] = [
  // 'https://www.eugenol.com/profils/dr-paul-fournier-3500', // to enable once Paul has confirmed it is his
];
