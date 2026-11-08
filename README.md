# Site du Dr Paul Fournier : squelette de démonstration

Version de travail du site vitrine du Dr Paul Fournier, chirurgien-dentiste à Clermont-Ferrand et Brioude.
Le contenu n'est pas validé et le site est fermé aux moteurs de recherche. Les textes peuvent contenir des informations à confirmer.

## Technique

- [Astro](https://astro.build), site statique en français et en anglais
- Hébergement prévu : Cloudflare Pages, avec une petite base D1 pour la liste de diffusion
- Démo publique : GitHub Pages, sans base de données ni formulaire actif

```bash
npm ci
npm run dev
```

`npm run build` construit le site, puis `tools/csp.mjs` calcule la politique de sécurité des scripts.

## Sécurité

- Aucun secret dans ce dépôt : les identifiants passent par les variables de l'hébergeur (`.env`, `.dev.vars` sont ignorés)
- `database_id` dans `wrangler.toml` est un exemple à remplacer au déploiement
- Pour signaler une faille : [formulaire privé de ce dépôt](https://github.com/MaliciousMusic/dr-paul-fournier-site/security/advisories/new)

## Droits

Tous droits réservés. Code, textes et images ne sont pas réutilisables sans autorisation.

Seule exception : `public/video/accueil.mp4`, vidéo de démonstration de Pavel Danilyuk ([Pexels](https://www.pexels.com/video/dentists-working-on-a-patient-6192970/)), utilisée sous la licence Pexels et passée en noir et blanc. Les personnes filmées ne sont pas liées au Dr Fournier. Elle sera remplacée par le film du cabinet.
