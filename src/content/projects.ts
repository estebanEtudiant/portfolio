import type { Diagram, Project, SideProject } from "./types";

// Sources : README des dépôts GitHub, CV et portfolio de stage d'Esteban
// (estebanetudiant.github.io/Portfolio_Esteban). Les sections « challenges »
// et « screenshots » vides sont masquées automatiquement.

const facturationDiagram: Diagram = {
  title: "Architecture de l'application de facturation",
  width: 640,
  height: 340,
  groups: [{ label: "Docker Compose", x: 206, y: 8, w: 426, h: 324 }],
  nodes: [
    { id: "nav", label: "Navigateur", detail: "utilisateurs", x: 10, y: 34, w: 160 },
    { id: "react", label: "React 18", detail: "servi par Nginx", x: 218, y: 34, w: 170 },
    { id: "api", label: "API Express 5", detail: "routes /api, JWT", x: 446, y: 34, w: 170 },
    { id: "pdf", label: "Puppeteer", detail: "factures en PDF", x: 218, y: 150, w: 170 },
    { id: "prisma", label: "Prisma 6", detail: "ORM", x: 446, y: 150, w: 170 },
    { id: "mail", label: "Nodemailer", detail: "envoi par SMTP", x: 218, y: 262, w: 170 },
    { id: "db", label: "PostgreSQL 15", detail: "base de données", x: 446, y: 262, w: 170 },
  ],
  edges: [
    { from: "nav", fromSide: "r", to: "react", toSide: "l", label: "HTTP", flow: true },
    { from: "react", fromSide: "r", to: "api", toSide: "l", label: "JWT", flow: true },
    { from: "api", fromSide: "b", fromAt: 0.5, to: "prisma", toSide: "t", flow: true },
    { from: "prisma", fromSide: "b", to: "db", toSide: "t", label: "SQL", flow: true },
    { from: "api", fromSide: "b", fromAt: 0.18, to: "pdf", toSide: "t", toAt: 0.82 },
    { from: "pdf", fromSide: "b", to: "mail", toSide: "t", label: "pièce jointe" },
  ],
  mobileOrder: ["nav", "react", "api", "prisma", "db", "pdf", "mail"],
};

const licencesDiagram: Diagram = {
  title: "Architecture de la plateforme de licences",
  width: 640,
  height: 380,
  nodes: [
    { id: "shop", label: "Boutique", detail: "React, Vite", x: 10, y: 20, w: 170 },
    { id: "admin", label: "Tableau de bord", detail: "React, Vite", x: 10, y: 112, w: 170 },
    { id: "bot", label: "Bot Discord", detail: "Node.js", x: 10, y: 204, w: 170 },
    { id: "client", label: "Client Windows", detail: "C++, CMake", x: 10, y: 296, w: 170 },
    { id: "api", label: "API NestJS", detail: "/api/v1, JWT", x: 250, y: 100, w: 150, h: 180 },
    { id: "db", label: "PostgreSQL 16", detail: "Prisma, migrations", x: 466, y: 40, w: 164 },
    { id: "redis", label: "Redis 7", detail: "clé-valeur", x: 466, y: 160, w: 164 },
    { id: "pay", label: "Paiements", detail: "Stripe, crypto", x: 466, y: 280, w: 164 },
  ],
  edges: [
    { from: "shop", fromSide: "r", to: "api", toSide: "l", toAt: 0.2, flow: true },
    { from: "admin", fromSide: "r", to: "api", toSide: "l", toAt: 0.4 },
    { from: "bot", fromSide: "r", to: "api", toSide: "l", toAt: 0.6 },
    { from: "client", fromSide: "r", to: "api", toSide: "l", toAt: 0.8 },
    { from: "api", fromSide: "r", fromAt: 0.25, to: "db", toSide: "l", flow: true },
    { from: "api", fromSide: "r", fromAt: 0.5, to: "redis", toSide: "l" },
    { from: "api", fromSide: "r", fromAt: 0.75, to: "pay", toSide: "l", flow: true },
  ],
  mobileOrder: ["shop", "admin", "bot", "client", "api", "db", "redis", "pay"],
};

const boardDiagram: Diagram = {
  title: "Organisation du jeu de plateau",
  width: 640,
  height: 300,
  nodes: [
    { id: "human", label: "Joueur", detail: "humain", x: 10, y: 40, w: 160 },
    { id: "ai", label: "IA stratégique", detail: "développée par l'équipe", x: 10, y: 200, w: 160 },
    { id: "ctrl", label: "Contrôle du jeu", detail: "bibliothèque Boardifier", x: 236, y: 120, w: 170 },
    { id: "model", label: "Plateau et règles", detail: "état de la partie", x: 236, y: 230, w: 170 },
    { id: "text", label: "Interface texte", detail: "console", x: 470, y: 40, w: 160 },
    { id: "gui", label: "Interface graphique", detail: "fenêtre", x: 470, y: 200, w: 160 },
  ],
  edges: [
    { from: "human", fromSide: "r", to: "ctrl", toSide: "l", toAt: 0.3, label: "coup", flow: true },
    { from: "ai", fromSide: "r", to: "ctrl", toSide: "l", toAt: 0.7, label: "coup", flow: true },
    { from: "ctrl", fromSide: "b", to: "model", toSide: "t", label: "valide" },
    { from: "ctrl", fromSide: "r", fromAt: 0.3, to: "text", toSide: "l" },
    { from: "ctrl", fromSide: "r", fromAt: 0.7, to: "gui", toSide: "l" },
  ],
  mobileOrder: ["human", "ai", "ctrl", "model", "text", "gui"],
};

const agentDiagram: Diagram = {
  title: "Architecture d'AgentEntreprise",
  width: 640,
  height: 380,
  nodes: [
    { id: "web", label: "Next.js", detail: "web + PWA chantier", x: 10, y: 40, w: 170 },
    { id: "src", label: "Mails, photos, PDF", detail: "pièces entrantes", x: 10, y: 260, w: 170 },
    { id: "api", label: "API FastAPI", detail: "Pydantic, SQLAlchemy", x: 236, y: 40, w: 170 },
    { id: "worker", label: "Worker", detail: "Procrastinate", x: 236, y: 260, w: 170 },
    { id: "db", label: "PostgreSQL 16", detail: "isolation RLS", x: 466, y: 40, w: 164 },
    { id: "llm", label: "API Claude", detail: "agents, sorties typées", x: 466, y: 160, w: 164 },
    { id: "ext", label: "Intégrations", detail: "après validation", x: 466, y: 280, w: 164 },
  ],
  edges: [
    { from: "web", fromSide: "r", to: "api", toSide: "l", flow: true },
    { from: "src", fromSide: "r", to: "worker", toSide: "l", label: "lecture", flow: true },
    { from: "api", fromSide: "r", to: "db", toSide: "l", label: "SQL", flow: true },
    { from: "worker", fromSide: "t", to: "api", toSide: "b", label: "file de tâches" },
    { from: "worker", fromSide: "r", fromAt: 0.3, to: "llm", toSide: "l", flow: true },
    { from: "worker", fromSide: "r", fromAt: 0.7, to: "ext", toSide: "l" },
  ],
  mobileOrder: ["web", "api", "db", "src", "worker", "llm", "ext"],
};

export const projects: Project[] = [
  {
    slug: "facturation-apf",
    name: "Facturation APF",
    kind: "Stage chez APF France Handicap",
    period: "Mai – juillet 2025, 9 semaines",
    summary:
      "Une application web qui remplace le suivi Excel : présences des usagers, calcul des jours facturables, factures PDF générées et envoyées par email.",
    stack: ["React 18", "Tailwind CSS", "Node.js", "Express 5", "Prisma", "PostgreSQL", "Puppeteer", "Docker Compose"],
    context: [
      "Le suivi mensuel des usagers et la facturation se faisaient dans des fichiers Excel : présences, absences, transports, repas, puis calcul à la main des jours à facturer.",
      "Pendant mon stage, j'ai conçu et développé une application web qui reprend tout ce travail, de la saisie mensuelle jusqu'à l'envoi des factures.",
    ],
    problem:
      "Tout reposait sur des tableurs et des calculs faits à la main : il fallait une seule application pour saisir le mois, calculer les jours à facturer, produire les factures et les envoyer, avec des comptes et des droits pour chaque utilisateur.",
    features: [
      "Gestion des usagers : création, modification, archivage, rattachement à un département.",
      "Saisie mensuelle du suivi : jours présents, certificats médicaux, transports, vacances, absences, repas.",
      "Calcul automatique des jours facturables et génération des factures du mois.",
      "Numérotation et suivi du statut des factures (en attente, payée).",
      "Factures en PDF envoyées par email en pièce jointe.",
      "Éditeur de modèles de factures en HTML/CSS, avec versions, restauration et tags de couleur.",
      "Tableau de bord, page de statistiques et journal des actions.",
      "Comptes avec vérification par code email, réinitialisation du mot de passe et rôle administrateur.",
    ],
    decisions: [
      {
        title: "Des PDF rendus par un vrai navigateur",
        body: "Les factures sont des modèles HTML/CSS rendus en PDF par Puppeteer. Le même modèle sert à l'aperçu à l'écran et au fichier envoyé, et l'équipe peut modifier la mise en page dans l'éditeur sans toucher au code.",
      },
      {
        title: "Les secrets chiffrés en base",
        body: "La configuration SMTP et le mot de passe administrateur sont stockés chiffrés en AES-256-CBC, avec une clé gardée hors de la base. Les mots de passe des comptes sont hachés avec bcrypt.",
      },
      {
        title: "Une API protégée par défaut",
        body: "Toutes les routes passent par /api et la plupart par un middleware qui vérifie le jeton JWT envoyé dans l'en-tête Authorization.",
      },
      {
        title: "Trois services, une commande",
        body: "Le client (servi par Nginx), l'API et PostgreSQL sont orchestrés par Docker Compose. Le schéma SQL s'applique au premier démarrage de la base.",
      },
    ],
    steps: [
      { when: "13 – 16 mai 2025", title: "Comprendre l'existant", body: "Cartographie du processus sur Excel, recueil des besoins, périmètre fonctionnel priorisé." },
      { when: "19 – 30 mai", title: "Poser les fondations", body: "Modèle de données (MCD), structure du projet, premières routes de l'API, interface de base." },
      { when: "3 – 21 juin", title: "Construire les fonctionnalités clés", body: "Édition directement dans les tableaux, tri et filtres, calculs mensuels, génération des PDF, validations." },
      { when: "24 juin – 11 juillet", title: "Finaliser", body: "Interface simplifiée, corrections, documentation d'utilisation." },
    ],
    challenges: [
      {
        title: "Savoir ce qui a été envoyé, à qui et quand",
        body: "Chaque envoi d'email est inscrit dans un journal (succès ou échec), une barre de progression suit les envois groupés, et le statut de la facture se met à jour après chaque action : aperçu, renvoi, suppression, email.",
      },
      {
        title: "Des montants reproductibles",
        body: "Prix du repas, forfait jour, modèles par défaut et jours d'ouverture de chaque mois sont centralisés dans des paramètres enregistrés en base. Recalculer un mois donne toujours le même résultat.",
      },
      {
        title: "Protéger les réglages sensibles",
        body: "Les champs de configuration SMTP sont verrouillés : il faut un code administrateur pour les modifier, et ce code se réinitialise par email.",
      },
      {
        title: "Une liste de factures fiable",
        body: "Les colonnes filtrées sont indexées, et une contrainte d'unicité empêche deux factures de porter le même numéro. Les suppressions demandent une confirmation.",
      },
    ],
    learnings: [
      "Ce stage m'a surtout appris à transformer un besoin métier en produit testable, et à peser chaque compromis selon son effet sur les utilisateurs.",
      "Les limites que je connais : l'impression de longues listes est lente, le rendu PDF dépend du navigateur, et les modèles de factures restent perfectibles.",
      "Ce que j'améliorerais ensuite : une seule définition des règles de validation, partagée par l'interface et l'API ; l'export CSV des factures filtrées ; une pagination côté serveur.",
    ],
    role: "Conception et développement en autonomie : modèle de données, API, interface, génération des documents et conteneurisation.",
    outcome: "Utilisée aujourd'hui par APF France Handicap à la place du suivi sur Excel.",
    repo: "https://github.com/estebanEtudiant/Facturation",
    portfolio: "https://estebanetudiant.github.io/Portfolio_Esteban/",
    // Données de test uniquement. Captures « Sécurité » et « E-mail » écartées : adresse personnelle visible.
    screenshots: [
      { src: "/projets/facturation-apf/liste-factures.webp", alt: "Tableau des factures avec filtres, statuts et boutons d'action", caption: "La liste des factures : filtres par mois, modèle et tag, statut d'envoi, et actions (aperçu, renvoi, suppression, email). Données de test." },
      { src: "/projets/facturation-apf/apercu-facture.webp", alt: "Choix du mois et des modèles au-dessus de l'aperçu d'une facture", caption: "Choix du mois et des modèles, puis aperçu fidèle de la facture avant l'export en PDF." },
      { src: "/projets/facturation-apf/editeur-modeles.webp", alt: "Éditeur visuel d'un modèle de facture avec des variables entre accolades", caption: "L'éditeur de modèles : les variables entre accolades ({{date}}, {{numero}}…) sont remplacées par les données de chaque facture." },
      { src: "/projets/facturation-apf/parametres.webp", alt: "Formulaire des paramètres de facturation et des jours d'ouverture", caption: "Les paramètres de facturation : prix du repas, forfait jour, modèles par défaut et jours d'ouverture de chaque mois." },
    ],
    diagram: facturationDiagram,
  },
  {
    slug: "agent-entreprise",
    name: "AgentEntreprise",
    kind: "Projet personnel",
    period: "2026",
    summary:
      "Des agents IA pour le back-office des PME de travaux publics : ils lisent factures, bons de livraison et tickets de pesée, les rapprochent des commandes et calculent la marge de chaque chantier, au jour le jour.",
    stack: ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "PostgreSQL", "pgvector", "Next.js", "TypeScript", "Tailwind CSS", "API Claude", "pytest", "Playwright", "Docker"],
    context: [
      "Dans une PME de travaux publics de 10 à 100 salariés, les factures, bons de livraison et tickets de pesée arrivent par mail, en photo ou sur papier. Savoir si un chantier gagne ou perd de l'argent demande de tout ressaisir et de tout rapprocher à la main.",
      "AgentEntreprise se branche sur les outils déjà utilisés (boîte mail, logiciel comptable, banque, Chorus Pro). Ce n'est pas un ERP : rien à ressaisir, et rien ne part sans l'accord du dirigeant.",
    ],
    problem:
      "Faire lire des documents à une IA sans lui laisser le dernier mot : chaque montant extrait doit être vérifié par le code, chaque client isolé des autres, et aucune action externe ne doit partir sans validation humaine.",
    features: [
      "Lecture des pièces : factures électroniques (Factur-X, CII, UBL) lues sans IA ; pour le reste, extraction par le modèle puis contrôle des totaux, de la TVA et des doublons par le code.",
      "Rapprochement 3 voies commande, livraison ou pesée, facture, avec tolérances réglables et brouillon de réclamation.",
      "Marge de chaque chantier, ventilée par poste et comparée au budget ; carte des chantiers sur fonds IGN et planning en Gantt.",
      "Devis, situations en Factur-X déposées sur Chorus Pro après validation, suivi des encaissements et rapprochement bancaire.",
      "Recherche en français avec Ctrl+K : le modèle produit une requête typée, que le code traduit en SQL paramétré.",
      "Application mobile hors ligne pour le chef de chantier : rapport dicté, planning, pièces, sans aucun montant affiché.",
    ],
    decisions: [
      {
        title: "Isolation des clients dans la base",
        body: "Chaque table métier porte un tenant_id protégé par la Row-Level Security de PostgreSQL, et chaque table a son test d'isolation.",
      },
      {
        title: "Rien ne sort sans validation",
        body: "Mails, relances, dépôts Pennylane ou Chorus Pro et envois de devis passent par un écran Validations. Seules les actions internes, réversibles et journalisées sont automatiques.",
      },
      {
        title: "Les documents sont des données non fiables",
        body: "L'agent qui lit un mail ou un PDF n'est jamais celui qui déclenche une action externe : c'est la protection contre l'injection de prompt.",
      },
      {
        title: "Des règles métier pures et testées",
        body: "Le calcul de la marge, du rapprochement et des pénalités vit dans un paquet sans aucune entrée-sortie, testé avec pytest. L'argent est en Decimal, avec des arrondis explicites.",
      },
      {
        title: "Chaque action d'agent journalisée",
        body: "Modèle, version du prompt et coût sont enregistrés pour chaque action, avec un quota mensuel de lecture par entreprise.",
      },
    ],
    challenges: [],
    role: "Projet personnel : conception, API, interface web et mobile, agents et tests.",
    codeNote: "Dépôt privé : le code n'est pas public.",
    screenshots: [
      { src: "/projets/agent-entreprise/aujourdhui.webp", alt: "Écran du matin : synthèse rédigée par l'IA, marge globale et points bloquants", caption: "L'écran du matin : une synthèse rédigée à partir des chiffres calculés, puis ce qui bloque. Entreprise de démonstration, données fictives." },
      { src: "/projets/agent-entreprise/fiche-chantier.webp", alt: "Fiche d'un chantier dont les dépenses dépassent le budget", caption: "La fiche d'un chantier qui dérape : dépenses par poste comparées au budget." },
      { src: "/projets/agent-entreprise/carte.webp", alt: "Carte des chantiers avec l'état de leur marge", caption: "La carte des chantiers sur fonds IGN, avec l'état de la marge de chacun." },
      { src: "/projets/agent-entreprise/planning.webp", alt: "Planning des chantiers en diagramme de Gantt", caption: "Le planning en Gantt, avec dépendances entre phases." },
      { src: "/projets/agent-entreprise/recherche.webp", alt: "Palette de recherche Ctrl+K avec une question en français", caption: "Ctrl+K : une question en français devient une requête typée, traduite en SQL paramétré par le code." },
      { src: "/projets/agent-entreprise/mobile-rapport.webp", alt: "Rapport du jour saisi sur téléphone par le chef de chantier", caption: "Sur le chantier : le rapport du jour, dicté sur téléphone, même hors ligne." },
    ],
    diagram: agentDiagram,
  },
  {
    slug: "plateforme-licences",
    name: "Plateforme de licences",
    kind: "Projet personnel",
    period: "2026",
    summary:
      "Une boutique en ligne qui vend des licences logicielles et les livre automatiquement, avec son API, son tableau de bord, un bot Discord et un client Windows.",
    stack: ["NestJS", "Prisma", "PostgreSQL", "Redis", "Stripe", "React", "Vite", "Node.js", "C++", "Docker Compose"],
    context: [
      "Vendre une licence logicielle, ce n'est pas seulement encaisser un paiement : il faut attribuer la bonne clé, donner accès aux téléchargements, gérer le stock, répondre au support.",
      "J'ai monté une plateforme complète dans un seul dépôt : une API, deux interfaces web, un bot Discord et un client Windows qui partagent les mêmes données.",
    ],
    problem:
      "Quatre programmes différents (boutique, administration, bot, client Windows) devaient lire et modifier les mêmes commandes et les mêmes licences, sans dupliquer la logique ni exposer de secrets.",
    features: [
      "Boutique publique : catalogue, pages produit, commandes et paiement.",
      "Espace client : profil, licences achetées et téléchargements associés.",
      "Tableau de bord d'administration : produits, commandes, clients, paramètres de la boutique.",
      "Inventaire de clés fournisseur avec suivi des réservations et des livraisons.",
      "Paiement par carte avec Stripe et paiements crypto.",
      "Bot Discord pour les commandes, la modération et les tickets de support.",
    ],
    decisions: [
      {
        title: "Une API au centre",
        body: "La boutique, le tableau de bord, le bot et le client Windows passent tous par la même API NestJS versionnée (/api/v1), avec un point de santé pour la supervision.",
      },
      {
        title: "Un secret par usage",
        body: "Jetons d'accès, jetons de rafraîchissement, jetons hors ligne et secret du bot ont chacun leur propre clé, générée aléatoirement. Aucun secret n'est versionné.",
      },
      {
        title: "Rien d'exposé directement",
        body: "Docker Compose publie les services sur 127.0.0.1 uniquement. L'accès public passe par un reverse proxy HTTPS.",
      },
      {
        title: "Des migrations versionnées",
        body: "Le schéma PostgreSQL évolue par migrations Prisma, appliquées au déploiement avec prisma migrate deploy.",
      },
    ],
    challenges: [],
    role: "Projet personnel, de l'architecture au déploiement.",
    codeNote: "Dépôt privé : le code n'est pas public.",
    screenshots: [],
    diagram: licencesDiagram,
  },
  {
    slug: "jeu-de-plateau-java",
    name: "Jeu de plateau Java",
    kind: "Projet universitaire, équipe de 4",
    period: "Avril – juin 2024",
    summary:
      "Un jeu de plateau en Java, jouable contre une IA stratégique écrite par l'équipe, avec une interface texte et une interface graphique.",
    stack: ["Java", "Boardifier", "GanttProject"],
    context: [
      "Projet de première année : programmer un jeu de plateau complet en Java à partir de Boardifier, une bibliothèque fournie pour gérer le déroulement d'une partie.",
      "Nous étions quatre, avec un planning suivi sur un diagramme de Gantt.",
    ],
    problem:
      "Le même jeu devait se jouer en console et dans une fenêtre graphique, contre un humain ou contre une IA, en respectant toujours les mêmes règles.",
    features: [
      "Partie complète en respectant les règles du jeu.",
      "Adversaire contrôlé par une IA stratégique développée par l'équipe.",
      "Deux interfaces : une en mode texte, une graphique.",
    ],
    decisions: [
      {
        title: "Les règles séparées de l'affichage",
        body: "La même partie peut être jouée en console ou dans la fenêtre graphique : seul l'affichage change, l'état du plateau et les règles restent identiques.",
      },
      {
        title: "L'IA joue par le même chemin que l'humain",
        body: "L'IA propose ses coups au contrôle du jeu, qui les valide comme ceux d'un joueur humain.",
      },
    ],
    challenges: [],
    role: "Développement en équipe de quatre, planification avec un diagramme de Gantt.",
    codeNote: "Projet de 2024 : je n'ai plus le code.",
    screenshots: [],
    diagram: boardDiagram,
  },
];

export const sideProjects: SideProject[] = [
  {
    name: "Quantic Grand Prix",
    kind: "Projet universitaire, équipe de 5",
    period: "Sept. 2024 – mars 2025",
    summary: "Application web pour un événement fictif de Formule 1 : billetterie, activités sur place et accès selon le rôle de chacun. Menée en méthode Agile, avec sprints et démonstrations régulières.",
    stack: ["Vue.js", "Node.js", "Express", "PostgreSQL", "API REST"],
    repo: "https://github.com/SemihAslan123/QuanticGP",
  },
  {
    name: "Site e-commerce",
    kind: "Projet universitaire",
    period: "Avril – juin 2024",
    summary: "Comptes utilisateurs, authentification, gestion des produits, des stocks et des commandes, paiement en ligne.",
    stack: ["HTML", "CSS", "JavaScript", "MySQL"],
  },
  {
    name: "Site vitrine et espace client",
    kind: "Projet personnel",
    period: "2026",
    summary: "Une vingtaine de pages statiques avec composants React compilés dans le navigateur : compte, paiement, documentation, feuille de route, pages légales. Servi par Nginx, sans étape de build.",
    stack: ["React (JSX)", "HTML", "CSS", "Nginx"],
    repo: "https://github.com/estebanEtudiant/404ClientPage",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
