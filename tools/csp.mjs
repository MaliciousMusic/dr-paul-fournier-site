// After the build: lists the hash of every inline script, so the browser runs those and nothing else.
// Writes the policy into the Cloudflare headers, and into each page as a meta tag for hosts that cannot set headers.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const pages = readdirSync(DIST, { recursive: true }).map(String).filter((f) => f.endsWith('.html')).map((f) => join(DIST, f));
const scripts = /<script\b(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g;
const empreintes = new Set();
for (const p of pages) {
  for (const m of readFileSync(p, 'utf8').matchAll(scripts)) {
    empreintes.add(`'sha256-${createHash('sha256').update(m[1]).digest('base64')}'`);
  }
}
const politique = [
  "default-src 'self'",
  `script-src 'self' ${[...empreintes].sort().join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'self'",
].join('; ');
for (const p of pages) {
  const html = readFileSync(p, 'utf8');
  const a = '<meta charset="utf-8">';
  if (!html.includes(a)) throw new Error(`no charset tag in ${p}`);
  writeFileSync(p, html.replace(a, `${a}<meta http-equiv="Content-Security-Policy" content="${politique}">`));
}
const entetes = join(DIST, '_headers');
writeFileSync(entetes, readFileSync(entetes, 'utf8').replace('__CSP__', politique));
console.log(`CSP: ${empreintes.size} inline scripts, ${pages.length} pages`);
