// robots.txt follows the draft switch: closed while the site is a draft, open at launch (PUBLIC_LIVE=1) with nothing else to change.
// AI search crawlers are named on purpose: being read by them is how the practice gets cited in AI answers.
import type { APIRoute } from 'astro';
import { DRAFT } from '../config';

const IA = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'MistralAI-User'];

export const GET: APIRoute = ({ site }) => {
  const base = new URL(import.meta.env.BASE_URL, site);
  const corps = DRAFT
    ? 'User-agent: *\nDisallow: /\n'
    : [
        'User-agent: *', 'Allow: /', 'Disallow: /api/', '',
        ...IA.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', 'Disallow: /api/', '']),
        `Sitemap: ${new URL('sitemap-index.xml', base).href}`, '',
      ].join('\n');
  return new Response(corps, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
