import type { Lang } from '../i18n';

// Every section of the site, and the sections each one leads to next.
export const CATEGORIES = {
  parcours: {
    nom: { fr: 'Parcours', en: 'Background' },
    phrase: { fr: 'Sa formation à Clermont-Ferrand, le CHU, l’université.', en: 'His training in Clermont-Ferrand, the university hospital, the university.' },
    liees: ['articles', 'medias', 'confreres'],
  },
  pratiques: {
    nom: { fr: 'Pratiques', en: 'Treatments' },
    phrase: { fr: 'Implants, os, gencive, dents de sagesse, anesthésie générale.', en: 'Implants, bone, gums, wisdom teeth, general anaesthesia.' },
    liees: ['parcours', 'medias', 'articles'],
  },
  medias: {
    nom: { fr: 'Vidéos', en: 'Videos' },
    phrase: { fr: 'Voir une procédure, la préparation, les événements.', en: 'See a procedure, the preparation, the events.' },
    liees: ['pratiques', 'articles', 'evenements'],
  },
  articles: {
    nom: { fr: 'Articles et presse', en: 'Articles and press' },
    phrase: { fr: 'Comprendre, lire, écouter ce qui a été dit.', en: 'Understand, read, listen to what has been said.' },
    liees: ['pratiques', 'medias', 'parcours'],
  },
  evenements: {
    nom: { fr: 'Événements', en: 'Events' },
    phrase: { fr: 'Formations et rencontres pour les praticiens.', en: 'Courses and meetings for practitioners.' },
    liees: ['confreres', 'medias', 'parcours'],
  },
  confreres: {
    nom: { fr: 'Praticiens', en: 'Colleagues' },
    phrase: { fr: 'Adresser un patient, contact direct par e-mail.', en: 'Refer a patient, direct contact by e-mail.' },
    liees: ['pratiques', 'evenements', 'parcours'],
  },
  contact: {
    nom: { fr: 'Contact', en: 'Contact' },
    phrase: { fr: 'Le téléphone, les cabinets et la clinique.', en: 'The phone, the practices and the clinic.' },
    liees: ['parcours', 'pratiques', 'confreres'],
  },
} as const;

export type Categorie = keyof typeof CATEGORIES;
export const NAV: Categorie[] = ['parcours', 'pratiques', 'medias', 'articles', 'evenements', 'confreres', 'contact'];
export const nomCat = (c: Categorie, lang: Lang) => CATEGORIES[c].nom[lang];
