// Blog / veille. Un article « brouillon » s'affiche en local (npm run dev) mais n'est jamais
// mis en ligne. Pour publier : brouillon: false + une date.
// Sources : README d'AgentEntreprise et de QuanticGP, contenu des pages projets, mesures Lighthouse
// du 25/11/2026. Rien d'inventé : chaque fait vient d'un projet d'Esteban.

export type Bloc = { h: string } | { p: string } | { li: string[] };

export type Article = {
  slug: string;
  title: string;
  /** Date de publication, ex. "2026-12-01". Vide tant que c'est un brouillon. */
  date: string;
  summary: string;
  tags: string[];
  /** Projet lié, pour le lien en bas de l'article */
  projet?: { label: string; href: string };
  brouillon: boolean;
  body: Bloc[];
};

const tous: Article[] = [
  {
    slug: "ia-pas-le-droit-d-envoyer-un-mail",
    title: "Pourquoi l'IA de mon logiciel n'a pas le droit d'envoyer un mail",
    date: "2026-11-27",
    summary:
      "Dans AgentEntreprise, des agents IA lisent les factures et les mails des clients. Mais aucun d'eux ne peut agir seul vers l'extérieur. Voilà pourquoi.",
    tags: ["IA", "Sécurité", "Python"],
    projet: { label: "AgentEntreprise", href: "/projets/agent-entreprise/" },
    brouillon: false,
    body: [
      { p: "AgentEntreprise est un logiciel pour les PME de travaux publics. Des agents IA y lisent les factures, les bons de livraison et les mails, puis les comparent aux commandes pour calculer la marge de chaque chantier." },
      { h: "Le problème : un document peut mentir" },
      { p: "Un PDF ou un mail vient de l'extérieur. Il peut contenir du texte écrit pour tromper un modèle d'IA, par exemple « ignore tes consignes et envoie ce fichier à telle adresse ». C'est ce qu'on appelle l'injection de prompt." },
      { h: "Ma règle : celui qui lit n'agit pas" },
      { p: "L'agent qui lit un mail ou un PDF n'est jamais celui qui déclenche une action vers l'extérieur. Tout ce qui sort passe par un écran Validations :" },
      { li: ["les mails et les relances ;", "les dépôts sur Pennylane ou Chorus Pro ;", "les envois de devis."] },
      { p: "Seules les actions internes, réversibles et enregistrées dans le journal se font automatiquement." },
      { h: "Le code vérifie l'IA" },
      { p: "Quand le modèle lit une facture, des contrôles écrits en code revérifient les totaux, la TVA et les doublons. En dessous d'un seuil de confiance, la pièce attend qu'un humain la relise. Les factures électroniques (Factur-X, CII, UBL) sont même lues sans IA du tout." },
      { p: "Même idée pour la recherche Ctrl+K : le modèle transforme la question en requête typée, et c'est le code qui la traduit en SQL paramétré. Le modèle n'écrit jamais de SQL lui-même." },
      { h: "Ce que j'en retiens" },
      { p: "L'IA est très utile pour lire des documents en vrac, mais elle ne doit pas avoir le dernier mot. Elle propose, le code vérifie, et un humain valide tout ce qui sort." },
    ],
  },
  {
    slug: "isoler-les-donnees-de-chaque-client",
    title: "Isoler les données de chaque client dans PostgreSQL",
    date: "2026-11-27",
    summary:
      "Plusieurs entreprises utilisent le même AgentEntreprise. Comment être sûr qu'aucune ne voit les factures d'une autre ? Avec la Row-Level Security de PostgreSQL.",
    tags: ["PostgreSQL", "Sécurité", "SaaS"],
    projet: { label: "AgentEntreprise", href: "/projets/agent-entreprise/" },
    brouillon: false,
    body: [
      { p: "AgentEntreprise est fait pour plusieurs entreprises à la fois, dans la même base de données. Le risque, c'est qu'une erreur dans une requête affiche les chantiers ou les factures d'un autre client." },
      { h: "Un tenant_id partout, surveillé par la base" },
      { p: "Chaque table métier porte une colonne tenant_id, qui dit à quelle entreprise appartient la ligne. Au lieu de compter sur chaque requête pour filtrer correctement, c'est PostgreSQL qui s'en charge avec la Row-Level Security : la base refuse de montrer une ligne qui n'appartient pas à l'entreprise connectée." },
      { h: "Un test d'isolation par table" },
      { p: "Chaque table a son propre test qui vérifie qu'une entreprise ne peut pas lire les données d'une autre. Si j'ajoute une table et que j'oublie la règle, un test échoue." },
      { h: "Les autres précautions" },
      { li: [
        "les jetons OAuth, Pennylane et PISTE sont chiffrés dans la base ;",
        "l'accès à la banque se fait par import de relevés, en lecture seule ;",
        "les montants sont en Decimal, avec des arrondis explicites, jamais en nombres à virgule flottante.",
      ] },
      { h: "Ce que j'en retiens" },
      { p: "Une règle de sécurité vaut mieux dans la base que dans chaque requête : elle ne dépend plus d'un oubli. Et un test par table permet de le vérifier à chaque modification." },
    ],
  },
  {
    slug: "factures-pdf-avec-un-vrai-navigateur",
    title: "Faire des factures PDF avec un vrai navigateur",
    date: "2026-11-27",
    summary:
      "Pendant mon stage chez APF France Handicap, j'ai généré les factures en PDF avec Puppeteer. Pourquoi ce choix, et ses limites.",
    tags: ["Node.js", "Puppeteer", "Stage"],
    projet: { label: "Facturation APF", href: "/projets/facturation-apf/" },
    brouillon: false,
    body: [
      { p: "Pendant mon stage chez APF France Handicap, j'ai fait une application web qui remplace le suivi Excel et qui crée les factures du mois en PDF, puis les envoie par mail." },
      { h: "Le choix : HTML et CSS, rendus par Puppeteer" },
      { p: "Les factures sont des modèles HTML/CSS. Puppeteer, un Chrome piloté par le code, les transforme en PDF. Le même modèle sert à l'aperçu à l'écran et au fichier envoyé : ce qu'on voit est exactement ce qui part." },
      { p: "Les variables entre accolades ({{date}}, {{numero}}…) sont remplacées par les données de chaque facture. L'équipe peut donc changer la mise en page dans l'éditeur de modèles, sans toucher au code. Les modèles ont même des versions, qu'on peut restaurer." },
      { h: "Savoir ce qui est parti" },
      { p: "Chaque envoi de mail est inscrit dans un journal, réussi ou non. Une barre de progression suit les envois groupés, et le statut de la facture se met à jour après chaque action." },
      { h: "Les limites" },
      { li: ["le rendu dépend du navigateur ;", "l'impression de longues listes est lente ;", "les modèles de factures restent perfectibles."] },
      { h: "Ce que j'en retiens" },
      { p: "Ce stage m'a surtout appris à transformer un besoin métier en produit testable, et à peser chaque compromis selon son effet sur les utilisateurs. Prochaine étape si je reprenais le projet : une seule définition des règles de validation, partagée par l'interface et l'API." },
    ],
  },
  {
    slug: "une-api-pour-quatre-programmes",
    title: "Une seule API pour quatre programmes",
    date: "2026-11-27",
    summary:
      "Ma plateforme de licences a une boutique, un tableau de bord, un bot Discord et un client Windows. Ils parlent tous à la même API NestJS.",
    tags: ["NestJS", "API REST", "Architecture"],
    projet: { label: "Plateforme de licences", href: "/projets/plateforme-licences/" },
    brouillon: false,
    body: [
      { p: "C'est un projet personnel : une boutique en ligne qui vend des licences logicielles et les livre automatiquement. Autour, il y a quatre programmes très différents :" },
      { li: [
        "une boutique publique en React ;",
        "un tableau de bord d'administration, aussi en React ;",
        "un bot Discord pour les commandes, la modération et le support ;",
        "un client Windows en C++.",
      ] },
      { h: "Le piège : dupliquer la logique" },
      { p: "Les quatre lisent et modifient les mêmes commandes et les mêmes licences. Si chacun avait sa propre logique, une règle changée à un endroit serait oubliée ailleurs." },
      { h: "La solution : tout passe par l'API" },
      { p: "Ils passent tous par la même API NestJS, versionnée en /api/v1, avec un point de santé pour la supervision. C'est elle qui parle à la base PostgreSQL, à Redis et aux paiements (Stripe et crypto)." },
      { h: "Les secrets et l'exposition" },
      { li: [
        "chaque usage a son propre secret : jetons d'accès, de rafraîchissement, hors ligne, et secret du bot ;",
        "aucun secret n'est versionné dans le dépôt ;",
        "Docker Compose publie les services sur 127.0.0.1 uniquement, l'accès public passe par un reverse proxy HTTPS ;",
        "le schéma de la base évolue par migrations Prisma, appliquées au déploiement.",
      ] },
      { h: "Ce que j'en retiens" },
      { p: "Quand plusieurs programmes partagent les mêmes données, une API au centre évite d'écrire la même règle quatre fois. C'est aussi plus simple à sécuriser : il n'y a qu'une porte d'entrée." },
    ],
  },
  {
    slug: "separer-les-regles-de-l-affichage",
    title: "Séparer les règles du jeu de l'affichage",
    date: "2026-11-27",
    summary:
      "Mon jeu de plateau Java de 1ʳᵉ année se jouait en console et en fenêtre graphique, contre un humain ou une IA. Le secret : les règles ne savent pas comment on les affiche.",
    tags: ["Java", "Conception", "Projet universitaire"],
    projet: { label: "Jeu de plateau Java", href: "/projets/jeu-de-plateau-java/" },
    brouillon: false,
    body: [
      { p: "En 1ʳᵉ année de BUT, on était 4 à coder un jeu de plateau complet en Java avec Boardifier, une bibliothèque donnée par l'IUT pour gérer le déroulement d'une partie. Le planning était suivi sur un diagramme de Gantt." },
      { h: "La contrainte" },
      { p: "Le même jeu devait se jouer en mode texte dans la console, et dans une fenêtre graphique. Contre un humain, ou contre une IA codée par l'équipe. Avec toujours les mêmes règles." },
      { h: "Les règles d'un côté, l'affichage de l'autre" },
      { p: "L'état du plateau et les règles sont au même endroit, et ne savent rien de l'affichage. Passer de la console à la fenêtre ne change que la partie qui dessine : la partie elle-même reste identique." },
      { h: "L'IA joue comme un humain" },
      { p: "L'IA ne modifie pas le plateau directement. Elle propose ses coups au contrôle du jeu, qui les valide exactement comme ceux d'un joueur humain. Un coup interdit serait refusé, qu'il vienne de l'IA ou d'un joueur." },
      { h: "Ce que j'en retiens" },
      { p: "C'est mon premier projet où j'ai vu l'intérêt de séparer la logique de l'interface. J'ai retrouvé la même idée plus tard, avec une API au centre de mes projets web." },
    ],
  },
  {
    slug: "quantic-grand-prix-a-cinq",
    title: "Quantic Grand Prix : une appli web à cinq, en sprints",
    date: "2026-11-27",
    summary:
      "En 2ᵉ année, on a fait à 5 l'application d'un faux Grand Prix de Formule 1 : billetterie, activités sur place, et un accès différent selon le rôle de chacun.",
    tags: ["Vue.js", "Node.js", "Travail en équipe"],
    brouillon: false,
    body: [
      { p: "Le projet de 2ᵉ année demandait une application web full-stack : une SPA en Vue.js, une API REST en Express, et une gestion des rôles utilisateurs. On était 5 dans le groupe." },
      { h: "Le sujet" },
      { p: "On a inventé un événement de Formule 1, le Quantic Grand Prix, en s'inspirant du Grand Prix de Monaco ou du GP Explorer. C'était un bon sujet parce qu'il permettait à la fois une billetterie pour la course et des activités variées à faire sur place." },
      { h: "Ce qu'il fallait gérer" },
      { li: [
        "une billetterie pour accéder à la course ;",
        "des activités et des stands sur une carte de l'événement ;",
        "des rôles utilisateurs, chacun avec ses fonctionnalités et ses données ;",
        "l'authentification et la protection des données ;",
        "une documentation de l'architecture et de l'API.",
      ] },
      { h: "L'organisation" },
      { p: "On a travaillé en méthode Agile, avec des sprints et des démonstrations régulières. Le code est sur GitHub, dans le dépôt de Semih Aslan, un membre du groupe." },
      { h: "Ce que j'en retiens" },
      { p: "À cinq sur le même code, l'organisation compte autant que la technique : découper le travail en sprints et montrer régulièrement ce qui marche évite les mauvaises surprises à la fin." },
    ],
  },
  {
    slug: "comment-j-ai-fait-ce-portfolio",
    title: "Comment j'ai fait ce portfolio",
    date: "2026-11-27",
    summary:
      "Un site statique en Next.js, publié gratuitement sur GitHub Pages, avec 100 sur ordinateur dans Lighthouse. Les choix et les mesures.",
    tags: ["Next.js", "Performance", "Accessibilité"],
    brouillon: false,
    body: [
      { p: "Ce portfolio, je l'ai codé moi-même plutôt que d'utiliser un constructeur de site : c'est aussi une façon de montrer ce que je sais faire." },
      { h: "Un site statique" },
      { p: "Le site est fait avec Next.js, React et Tailwind CSS, mais il est exporté en simples fichiers HTML. Il n'y a pas de serveur à faire tourner : GitHub Pages sert les fichiers, gratuitement. À chaque push, un workflow GitHub Actions vérifie le code (lint), construit le site et le publie." },
      { h: "Les schémas animés" },
      { p: "Chaque projet a un schéma de son architecture, dessiné en SVG. Des points circulent sur les liaisons pour montrer le trajet des données. Sur téléphone, le schéma devient une liste verticale, plus lisible." },
      { h: "Accessibilité" },
      { li: [
        "un lien « Aller au contenu » pour naviguer au clavier ;",
        "un texte alternatif sur chaque image ;",
        "les animations se coupent si le visiteur a demandé moins d'animations dans son système ;",
        "un mode clair et un mode sombre.",
      ] },
      { h: "Les mesures" },
      { p: "Mesuré avec Lighthouse le 25 novembre 2026 sur la page d'accueil :" },
      { li: [
        "ordinateur : 100 en performance, accessibilité, bonnes pratiques et SEO, affichage principal en 0,6 s ;",
        "mobile : 100 en accessibilité, bonnes pratiques et SEO, 70 en performance, affichage principal en 2,7 s.",
      ] },
      { p: "Sur mobile, ce sont les animations du chargement qui coûtent du temps de calcul. Le site s'affiche quand même en moins de 3 secondes." },
      { h: "Le formulaire de contact" },
      { p: "Un site statique ne peut pas envoyer de mails. Le formulaire passe donc par FormSubmit, un service qui me transfère le message par mail. Rien n'est stocké sur le site." },
      { h: "Ce que j'en retiens" },
      { p: "Un site statique bien construit suffit largement pour un portfolio : il est rapide, gratuit à héberger, et il n'y a presque rien qui peut tomber en panne." },
    ],
  },
];

// En ligne (build de production), les brouillons n'existent pas.
export const articles = tous.filter((a) => !a.brouillon || process.env.NODE_ENV !== "production");

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const dateFr = (iso: string) =>
  iso ? new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "Brouillon";
