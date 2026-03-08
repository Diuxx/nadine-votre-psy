# nadine-votre-psy.fr

Site statique de Nadine Marmot-Métayer (psycho-praticienne Gestalt), construit avec Eleventy (11ty).

## Domaine
- Production: `https://nadine-votre-psy.fr`
- Variante: `https://www.nadine-votre-psy.fr`

## Prérequis
- Node.js 18+
- npm
- (Déploiement serveur) Nginx, `sudo`, et Certbot

## Installation
```bash
npm install
```

## Développement local
```bash
npm run dev
```
Serveur local avec rechargement sur `http://localhost:8080`.

## Build de production
```bash
npm run build
```
Le site est généré dans `_site/`.

## SEO et pages techniques
- `sitemap.xml` générée via `sitemap.xml.njk`
- page 404 générée via `404.md` → `/404.html`
- URL canonique définie dans `_data/meta.js`

## Déploiement serveur
Script prêt à l’emploi:

```bash
./deploy.sh
```

Ce script :
- build le site Eleventy
- copie `_site/` vers `/var/www/nadine-votre-psy`
- installe/active la conf Nginx
- teste puis recharge Nginx
- génère le certificat SSL via Certbot si absent

## Configuration Nginx
- Fichier projet: `nginx/nadine-votre-psy.conf`
- Site activé sur serveur: `/etc/nginx/sites-available/nadine-votre-psy` + symlink dans `sites-enabled`

## Structure utile
- `index.html` : page d’accueil
- `404.md` : page 404
- `sitemap.xml.njk` : génération sitemap
- `_includes/` : layout, header, footer
- `_data/meta.js` : métadonnées (title, description, siteUrl)
- `src/styles/main.css` : styles + responsive