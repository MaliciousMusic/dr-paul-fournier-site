// Draft wording, kept general on purpose: every text is to be validated by Paul before going live.
// No brand of implant, no comparison, no promise of result.
// seo: the words people actually search; liees: the treatments a reader of this page looks at next.
export const PRATIQUES = [
  {
    slug: 'implants',
    titre: { fr: 'Les implants', en: 'Implants' },
    seo: { fr: 'Implants dentaires', en: 'Dental implants' },
    court: {
      fr: 'Une petite racine artificielle, placée dans l’os, pour porter une dent ou une prothèse.',
      en: 'A small artificial root, placed in the bone, to support a tooth or a prosthesis.',
    },
    liees: ['regeneration-osseuse', 'reconstruction-complete', 'impression-3d'],
    faq: [] as { q: Record<'fr' | 'en', string>; r: Record<'fr' | 'en', string> }[],
  },
  {
    slug: 'regeneration-osseuse',
    titre: { fr: 'La régénération osseuse', en: 'Bone regeneration' },
    seo: { fr: 'Greffe et régénération osseuse', en: 'Bone graft and regeneration' },
    court: {
      fr: 'Quand l’os manque pour poser un implant, il est parfois possible de le reconstruire.',
      en: 'When there is not enough bone for an implant, it can sometimes be rebuilt.',
    },
    liees: ['implants', 'reconstruction-complete', 'impression-3d'],
    faq: [],
  },
  {
    slug: 'reconstruction-complete',
    titre: { fr: 'La reconstruction complète', en: 'Full reconstruction' },
    seo: { fr: 'Reconstruction dentaire sur implants', en: 'Dental reconstruction on implants' },
    court: {
      fr: 'Remplacer toutes les dents d’une mâchoire, ou des deux, en s’appuyant sur des implants.',
      en: 'Replacing all the teeth of one jaw, or both, with the support of implants.',
    },
    liees: ['implants', 'regeneration-osseuse', 'anesthesie-generale'],
    faq: [],
  },
  {
    slug: 'dents-de-sagesse',
    titre: { fr: 'Les dents de sagesse', en: 'Wisdom teeth' },
    seo: { fr: 'Extraction des dents de sagesse', en: 'Wisdom teeth removal' },
    court: {
      fr: 'Les retirer quand elles posent un problème ou risquent d’en poser.',
      en: 'Removing them when they cause, or may cause, a problem.',
    },
    liees: ['anesthesie-generale', 'implants', 'chirurgie-plastique-parodontale'],
    faq: [],
  },
  {
    slug: 'chirurgie-plastique-parodontale',
    titre: { fr: 'La chirurgie plastique parodontale', en: 'Periodontal plastic surgery' },
    seo: { fr: 'Greffe de gencive, chirurgie parodontale', en: 'Gum graft, periodontal surgery' },
    court: {
      fr: 'Soigner la gencive quand elle s’est rétractée ou qu’elle manque autour d’une dent ou d’un implant.',
      en: 'Treating the gum when it has receded or is lacking around a tooth or an implant.',
    },
    liees: ['repositionnement-levre-superieure', 'implants', 'dents-de-sagesse'],
    faq: [],
  },
  {
    slug: 'repositionnement-levre-superieure',
    titre: { fr: 'Le repositionnement de la lèvre supérieure', en: 'Upper lip repositioning' },
    seo: { fr: 'Repositionnement de la lèvre', en: 'Upper lip repositioning' },
    court: {
      fr: 'Une intervention qui réduit la hauteur de gencive visible au sourire.',
      en: 'A procedure that reduces how much gum shows when smiling.',
    },
    liees: ['chirurgie-plastique-parodontale', 'anesthesie-generale', 'impression-3d'],
    faq: [],
  },
  {
    slug: 'anesthesie-generale',
    titre: { fr: 'L’anesthésie générale et les patients anxieux', en: 'General anaesthesia and anxious patients' },
    seo: { fr: 'Chirurgie dentaire sous anesthésie générale', en: 'Dental surgery under general anaesthesia' },
    court: {
      fr: 'À la clinique, pour la chirurgie et les implants, quand la peur rend les soins trop difficiles.',
      en: 'At the clinic, for surgery and implants, when fear makes treatment too difficult.',
    },
    liees: ['implants', 'dents-de-sagesse', 'reconstruction-complete'],
    faq: [],
  },
  {
    slug: 'impression-3d',
    titre: { fr: 'L’impression 3D', en: '3D printing' },
    seo: { fr: 'Impression 3D en chirurgie dentaire', en: '3D printing in dental surgery' },
    court: {
      fr: 'Préparer l’intervention sur un modèle et des guides imprimés à partir de votre examen.',
      en: 'Preparing the procedure with models and guides printed from your scan.',
    },
    liees: ['implants', 'regeneration-osseuse', 'reconstruction-complete'],
    faq: [],
  },
];
