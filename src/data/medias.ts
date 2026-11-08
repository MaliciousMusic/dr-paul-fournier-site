// src empty = slot waiting for an edited video. Rule: no recognisable patient, face blurred, no patient name or identifying x-ray.
// The first one plays on the landing. date = publication date, required for Google to show the video.
// Working version only, until Paul's own film exists: an 18 s extract of a free video, cropped and turned grey.
export const VIDEO_DEMO = {
  titre: { fr: 'Démonstration : un praticien et son assistante au fauteuil', en: 'Demo: a practitioner and his assistant at the chair' },
  src: 'video/accueil.mp4',
  poster: 'video/accueil.webp',
  son: false,
  credit: {
    fr: 'Vidéo de démonstration : Pavel Danilyuk, licence Pexels, passée en noir et blanc. Les personnes filmées ne sont pas liées au Dr Fournier.',
    en: 'Demo video: Pavel Danilyuk, Pexels licence, turned black and white. The people filmed have no link with Dr Fournier.',
  },
  source: 'https://www.pexels.com/video/dentists-working-on-a-patient-6192970/',
};

export const VIDEOS = [
  { id: 'presentation', titre: { fr: 'Le Dr Fournier présente sa pratique', en: 'Dr Fournier introduces his practice' }, src: '', poster: '', date: '' },
  { id: 'procedure', titre: { fr: 'Une procédure, étape par étape', en: 'A procedure, step by step' }, src: '', poster: '', date: '' },
  { id: 'impression-3d', titre: { fr: 'L’impression 3D au service de la préparation', en: '3D printing in preparation' }, src: '', poster: '', date: '' },
  { id: 'evenement', titre: { fr: 'En images : formations et événements', en: 'In pictures: courses and events' }, src: '', poster: '', date: '' },
];
