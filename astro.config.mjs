import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // The demo builds under its own address; without these two variables it is the real site.
  site: process.env.SITE_URL || 'https://dr-fournier-paul.chirurgiens-dentistes.fr',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en' } },
    }),
  ],
});
