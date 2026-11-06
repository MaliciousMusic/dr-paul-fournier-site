import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// One file per article in src/content/articles. "brouillon: true" = visible in the working version, never published.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    titre: z.string(),
    description: z.string(),
    langue: z.enum(['fr', 'en']).default('fr'),
    date: z.coerce.date().optional(),
    brouillon: z.boolean().default(true),
    pratique: z.string().optional(),
    sources: z.array(z.object({ nom: z.string(), lien: z.string() })).default([]),
  }),
});

export const collections = { articles };
