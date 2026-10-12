# 🕵️ Zhetikal OSINT Master-Toolkit v2

> Annuaire interactif de **1 227 outils OSINT** classés en **24 catégories**, avec recherche
> instantanée, filtres par type de ressource, favoris exportables et thème clair/sombre.

Interface 100 % statique (aucun backend) — React + TypeScript + Vite + Tailwind.

**Dépôt :** <https://github.com/jollncoelho/Osint-Zhetikal-Master-toolkit-v2>

---

## 🚀 Démarrage rapide

```bash
npm install
npm run dev        # serveur de développement  → http://localhost:5173
npm run build      # build de production       → dist/
npm run preview    # prévisualiser le build    → http://localhost:4173
```

### Vérifications

```bash
npm run typecheck  # TypeScript strict, sans émission
npm run lint       # ESLint
npm run verify     # typecheck + lint + build
```

---

## ✨ Fonctionnalités

### Recherche & navigation

- **Recherche instantanée** insensible à la casse **et aux accents** (`telephone` trouve « téléphone »).
  La recherche porte sur le nom, la description, la catégorie, le domaine et les tags.
- **Barre latérale** avec toutes les catégories et leur nombre d'outils.
- **Filtres par type de ressource** : outil web, GitHub, Google CSE, Tor, documentation, API, startpage.
- **Tri** : pertinence, nom (A→Z / Z→A), catégorie (A→Z / Z→A).
- **Liens profonds** : l'état (recherche, catégorie, filtres, vue, tri) est reflété dans l'URL —
  partagez ou mettez en favori une vue précise, par ex. `#q=phone&kind=github`.
- **Affichage progressif** : seules les premières cartes de chaque catégorie sont rendues,
  avec un bouton « afficher plus » et un bouton global « tout déplier / tout replier ».

### Favoris & historique

- **Favoris** persistés dans le navigateur, avec compteur.
- **Export** des favoris en JSON, Markdown ou liste d'URL (`.txt`), ou copie de tous les liens.
- **Onglet « Récents »** : les derniers outils ouverts, pour reprendre une investigation.

### Confort

- **Thème sombre / clair** (mémorisé, sans flash au chargement, respecte `prefers-color-scheme`).
- **Raccourcis clavier** : `/` ou `Ctrl/⌘ + K` pour rechercher, `Échap` pour effacer.
- **Outil au hasard**, limité à la sélection courante.
- **Notifications** discrètes (copie, exports, actions destructives).
- **Formulaire « Proposer un outil »** générant une issue GitHub pré-remplie, avec validation d'URL.
- **Accessibilité** : navigation clavier, anneau de focus homogène, lien d'évitement,
  libellés ARIA, `aria-live` sur le compteur de résultats, respect de `prefers-reduced-motion`.
- **Responsive** : barre latérale sur ordinateur, panneau de catégories et filtres défilables sur mobile.

---

## 🗂️ Catégories (24)

Réseaux sociaux · Outils IA · Moteurs de recherche · Domaines & DNS · Géolocalisation · Ressources ·
Monitoring & Threat Intel · People Search & Profils · Images inversées · Emails · Breaches & Leaks ·
Entreprises · Code & Repositories · Métadonnées · Telegram OSINT · Visualisation & DataViz ·
Archives web · Téléphones · Transport & Véhicules · Module Colombie · Web, Traffic & SEO ·
Usernames · Documents & Data · Fact-check & Vérification

---

## 📁 Structure du projet

```
├── index.html                  # coquille HTML : SEO, Open Graph, JSON-LD, manifest
├── public/                     # fichiers servis tels quels
│   ├── logo.svg                # logo (repris d'OSINT Investigator)
│   ├── favicon.svg             # icône vectorielle
│   ├── icon-192/512.png        # icônes PWA
│   ├── apple-touch-icon.png
│   ├── og-image.png            # image de partage social (1200×630)
│   ├── site.webmanifest
│   ├── robots.txt
│   ├── sitemap.xml
│   └── _redirects              # règles SPA (Netlify)
├── scripts/
│   ├── build-dataset.mjs       # génère src/data/toolkit.json depuis la source brute
│   ├── generate-assets.py      # génère icônes + image de partage (Pillow)
│   └── source/
│       ├── toolkit.raw.json    # données brutes d'origine (archive, entrée du script)
│       └── tools.legacy.json   # ancien src/tools.json, inutilisé (archive)
└── src/
    ├── App.tsx                 # orchestration : état, filtres, tri, raccourcis
    ├── data/
    │   ├── toolkit.json        # jeu de données généré (source de vérité)
    │   └── tools.ts            # types, index de recherche, helpers
    ├── components/
    │   ├── Sidebar.tsx         # navigation par catégorie
    │   ├── CategorySection.tsx # section + affichage progressif
    │   ├── ToolCard.tsx        # carte d'outil
    │   ├── RandomToolModal.tsx
    │   ├── SubmitToolModal.tsx
    │   ├── ScrollTopButton.tsx
    │   ├── Toasts.tsx
    │   └── ui.tsx              # Chip, StatPill, ConfirmButton
    ├── hooks/
    │   ├── useFavorites.ts     # favoris persistés (+ migration de l'ancien format)
    │   ├── useRecent.ts        # historique de consultation
    │   ├── useTheme.ts         # thème clair/sombre
    │   ├── useLocalStorage.ts
    │   └── useToasts.ts
    ├── utils/
    │   ├── exportFavorites.ts  # exports JSON / Markdown / URLs + presse-papiers
    │   └── urlState.ts         # synchronisation avec le fragment d'URL
    └── index.css               # jetons de thème + utilitaires
```

---

## 🧱 Le jeu de données

`src/data/toolkit.json` est **généré** — ne le modifiez pas à la main si vous voulez pouvoir
régénérer l'ensemble.

```bash
npm run dataset
```

Le script `scripts/build-dataset.mjs` :

1. **Nettoie les noms** (espaces, suffixes parasites type `Page ‹ Site`).
2. **Déduit le type de ressource** depuis l'URL (`github.com`, `.onion`, `cse.google.com`,
   documentation, API, outil web) — information fiable et vérifiable.
3. **Réécrit les descriptions inutilisables.** À l'origine, 1 109 outils sur 1 227 portaient
   « No description » ou « Outil *nom* ». Le script produit une description fonctionnelle en
   français, déduite du nom de l'outil (verbe : recherche, vérification, suivi, extraction…)
   et de sa catégorie, avec gestion des élisions (« de images » → « d'images »).
   Les **118 descriptions d'origine** réellement informatives sont conservées telles quelles.
4. **Dédoublonne** par URL, attribue un **identifiant stable** et calcule les statistiques.

Sortie : `1 227` outils, `24` catégories, `0` description vide, `0` doublon.

### Ajouter ou corriger un outil

- **Quelques outils** : éditez directement `src/data/toolkit.json` (respectez la forme
  `{ id, name, url, description, tags, kind, action? }`).
- **En masse / depuis la source** : modifiez `scripts/source/toolkit.raw.json`
  puis relancez `npm run dataset`.

---

## 🎨 Personnaliser le thème

Toutes les couleurs passent par des **jetons CSS** définis en haut de `src/index.css` :

```css
:root, [data-theme='dark'] { --c-accent-rgb: 34 211 238; /* … */ }
[data-theme='light']       { --c-accent-rgb: 14 139 168; /* … */ }
```

Les couleurs sont stockées en **canaux RGB** (`R G B`) et consommées via
`rgb(var(--x) / <alpha-value>)` dans `tailwind.config.js`. C'est ce qui permet d'utiliser les
modificateurs d'opacité de Tailwind (`bg-app-panel/70`, `border-app-accent/30`…).

> ⚠️ Ne remplacez pas ces variables par des valeurs hexadécimales : les modificateurs d'opacité
> cesseraient silencieusement de fonctionner.

---

## 🌐 Déploiement

### Production

Le site est en ligne sur **Vercel** :

**<https://ghostint.query-intel.com/>**

Vercel est relié au dépôt GitHub et **redéploie automatiquement à chaque push sur `main`** :
aucune action manuelle n'est nécessaire.

> ℹ️ Le site est servi depuis la **racine** du domaine. `vite.config.ts` ne définit donc
> **aucun `base`** — les assets sont référencés en `/assets/…`.
>
> ⚠️ Si le site devait un jour être servi depuis un **sous-chemin** (par exemple
> `utilisateur.github.io/mon-depot/` sur GitHub Pages), il faudrait définir
> `base: '/mon-depot/'` dans `vite.config.ts`, sinon tous les liens vers les assets
> renverraient un 404.

### Autres hébergeurs

Le build produit un site statique dans `dist/`, déployable tel quel (Netlify, Cloudflare
Pages, GitHub Pages…). `public/_redirects` est fourni pour les hébergeurs type Netlify.

### Changer de domaine

Si le domaine de référence change, mettez à jour l'URL dans :

- `index.html` — `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`, JSON-LD
- `public/sitemap.xml`, `public/robots.txt`

Ces URLs doivent être **absolues** : Open Graph et les sitemaps n'acceptent pas de chemins
relatifs.

---

## ⚠️ Avertissement

Ce projet est destiné à un usage **légal et éthique uniquement**. L'auteur ne peut être tenu
responsable d'une mauvaise utilisation des outils, d'activités illégales ou de violations de la
vie privée. **Respectez toujours les lois en vigueur.**

---

## 👤 Crédits

**Zhétikal / CyberZ7** — 🧠 OSINT • Investigation • Cyber

- GitHub : <https://github.com/CyberZ7>
- Toolkit : <https://cyberz7.github.io/Ghostint-Tools/>
- StartMe : <https://start.me/p/gGnJAQ/startpage>

## 🤝 Contribution

Les contributions sont bienvenues : ajout d'outils, correction de liens, suggestions.
Utilisez le bouton **« Proposer »** de l'interface (issue GitHub pré-remplie) ou une Pull Request.

---

💀 *Stay Anonymous. Stay Smart.*
