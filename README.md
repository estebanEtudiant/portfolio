# Portfolio — Esteban Barthod-Malat

Site personnel de développeur d'applications : présentation, études de cas avec schémas d'architecture animés, compétences, parcours, CV et contact.

Site statique (Next.js 16, export HTML) : aucun serveur à maintenir, hébergeable gratuitement sur GitHub Pages.

## Lancer en local

Prérequis : Node.js 20 ou plus.

```bash
npm install
npm run dev        # http://localhost:3000, rechargement à chaud
```

Pour voir exactement ce qui sera publié :

```bash
npm run build      # génère le site dans out/
npx serve out -l 4321   # http://localhost:4321
```

Autres commandes : `npm run lint`.

## Modifier le contenu

Tout le texte est dans `src/content/`, pas besoin de toucher aux composants.

| Fichier | Contenu |
| --- | --- |
| `src/content/site.ts` | identité, email, liens, accroche, à propos, compétences, parcours |
| `src/content/projects.ts` | études de cas, schémas d'architecture, autres projets |
| `public/cv/` | le CV en PDF et son aperçu |

### À compléter

- **LinkedIn** : laissé vide volontairement. Pour l'afficher, renseigner `linkedin` dans `src/content/site.ts`. Le lien apparaît dans le contact dès qu'il n'est plus vide.
- **Captures d'écran** : déposer les images (WebP, 1 600 px de large) dans `public/projets/<slug>/`, puis les lister dans `screenshots` du projet avec `alt` et `caption`. La section « Captures » s'affiche automatiquement. Masquer les données réelles des usagers **et toute adresse ou numéro personnel**. Facturation APF en a déjà 4 (données de test).
- **Difficultés et solutions** : `challenges` (et `learnings`, « Ce que j'en retiens ») de chaque projet. Remplis pour Facturation APF ; masqués tant qu'ils sont vides pour les deux autres.
- **Jeu de plateau Java** : la page est courte (pas de dépôt public). Ajouter le nom du jeu, le rôle exact dans l'équipe et un lien si le code peut être publié.
- **Mettre à jour le CV** (dernier export : 19/11/2026) : réexporter le design Canva en PDF A4 vers `public/cv/Esteban-Barthod-Malat-CV-stage-2027.pdf`, et l'aperçu en `public/cv/apercu-cv.webp` (1 000 px de large).

### Schémas d'architecture

Chaque schéma est décrit par des blocs (`nodes`, coordonnées dans un repère de 640 px de large) et des liaisons (`edges`) entre deux côtés de blocs : `t`, `r`, `b`, `l` (haut, droite, bas, gauche). `flow: true` fait circuler un point « donnée » sur la liaison. Sur mobile, le schéma devient une liste verticale dans l'ordre `mobileOrder`.

## Publier sur GitHub Pages

1. Créer un dépôt public sur GitHub, par exemple `portfolio`.
2. Pousser ce dossier sur la branche `main` :
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/estebanEtudiant/portfolio.git
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages → Source : GitHub Actions**.
4. Le workflow `.github/workflows/deploy.yml` vérifie le lint, construit et publie le site à chaque push. Adresse : `https://estebanetudiant.github.io/portfolio/`.

Le préfixe d'URL (`/portfolio`) et l'adresse canonique sont fournis automatiquement par GitHub au moment du build. Si le dépôt s'appelle `estebanEtudiant.github.io`, le site est servi à la racine sans rien changer.

Pour un nom de dépôt différent en local : `NEXT_PUBLIC_BASE_PATH=/mon-depot npm run build`.

### Publication actuelle : branche `gh-pages` (sans GitHub Actions)

Le site est en ligne sur https://estebanetudiant.github.io/portfolio/ depuis le 19/11/2026. GitHub Actions étant bloqué sur le compte (problème de facturation), le workflow échoue à chaque push : le site est construit en local puis publié sur la branche `gh-pages` (Settings → Pages → Source : « Deploy from a branch », `gh-pages`, `/`).

Pour republier après une modification (depuis Git Bash) :

```bash
MSYS_NO_PATHCONV=1 NEXT_PUBLIC_BASE_PATH=/portfolio NEXT_PUBLIC_SITE_URL=https://estebanetudiant.github.io/portfolio npm run build
touch out/.nojekyll
cd out && git init -b gh-pages && git add -A && git commit -m "Publication"   && git push -f https://github.com/estebanEtudiant/portfolio.git gh-pages && cd ..
npm run build   # reconstruire sans préfixe pour tester en local
```

Une fois la facturation GitHub réglée, repasser la source de Pages sur « GitHub Actions » : le workflow publiera alors tout seul à chaque push.

## Choix techniques

- **Next.js 16 en export statique**, TypeScript, Tailwind CSS 4.
- **Pas de bibliothèque d'animation** : tout est en CSS et SVG natif.
  - Ouverture de l'accueil : le nom, puis le rôle, l'accroche, la disponibilité, les boutons, et le schéma qui se dessine, en une seule cascade CSS (rien n'attend le JavaScript).
  - Les schémas sont rendus au build (aucun JavaScript propre). Le survol d'un bloc met ses liaisons en avant grâce à `:has()`. Un seul petit composant client, `Revelateur`, pose la classe `vu` quand un schéma entre à l'écran et lance les points « données » (`animateMotion`).
  - Apparitions au défilement : `animation-timeline: view()` ; repli IntersectionObserver dans `Revelateur` pour Firefox.
  - En-tête et barre de lecture pilotés par le défilement en CSS (`animation-timeline: scroll()`).
  - Transitions entre pages : `<ViewTransition>` de React (fondu et léger glissement).
  - `prefers-reduced-motion` coupe toutes les animations.
- **Thème clair et sombre** : suit le système, avec un bouton pour forcer l'un ou l'autre (mémorisé dans le navigateur).
- **Polices** : IBM Plex Sans Condensed (titres), IBM Plex Sans (texte), IBM Plex Mono (schémas uniquement), auto-hébergées par `next/font`.
- **SEO** : métadonnées par page, Open Graph avec image générée au build, `sitemap.xml`, `robots.txt`, URL canoniques, données structurées JSON-LD `Person` sur l'accueil.
- **Build sous Windows** : `scripts/fix-segments.mjs` (lancé automatiquement après `npm run build`) corrige un bug de Next 16 qui range mal les fichiers de préchargement sous Windows (404 dans la console). Sans effet sous Linux, donc sur GitHub Actions.
- **Build avec préfixe depuis Git Bash** : `MSYS_NO_PATHCONV=1 NEXT_PUBLIC_BASE_PATH=/portfolio npm run build` (sinon Git Bash transforme `/portfolio` en chemin Windows).
- **Dépendances** : `next`, `react`, `lucide-react` (icônes). Rien d'autre.

## Mesures Lighthouse (build de production, en local, 19/11/2026)

| Page | Ordinateur | Mobile |
| --- | --- | --- |
| Accueil | 100 / 100 / 100 / 100 | 97 à 100 (médiane 100 sur 6 passages) / 100 / 100 / 100 |
| Études de cas (×3) | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

Ordre : performance, accessibilité, bonnes pratiques, SEO. Avant la refonte du 19/11, l'accueil mobile était à 94 (290 ms de blocage du processeur au chargement, 70 ms après). À refaire une fois le site en ligne, sur l'URL publique.
