# nicoblog.dev

Portfolio & blog statique construit avec Eleventy (11ty).

## Prérequis
- Node.js 18+ recommandé
- npm (fourni avec Node.js)

## Installation
```cmd
npm install
```

## Démarrer en local (dev server)
```cmd
npm run dev
```
Ouvre un serveur avec rechargement à `http://localhost:8080`.

## Build de production
```cmd
npm run build
```
Génère le site dans le dossier `_site/`.

## Structure
- `index.html`: page d’accueil (À propos, Compétences, Projets, Contact)
- `_includes/`: layout, header, footer
- `_data/meta.js`: données (héros, compétences, citations)
- `projects/`: pages des projets (collection Eleventy)
- `src/styles/main.css`: styles
- `src/scripts/quotes.js`: rotation des citations
- `src/scripts/menu.js`: menu responsive