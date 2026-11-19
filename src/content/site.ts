// Toutes les informations personnelles du site. Rien ici n'est inventé :
// source = CV, réponses d'Esteban et README de ses dépôts GitHub.

export const profile = {
  firstName: "Esteban",
  lastName: "Barthod-Malat",
  role: "Développeur d'applications",
  location: "Belfort (90)",
  email: "esteban.barthod-malat@edu.univ-fcomte.fr",
  github: "https://github.com/estebanEtudiant",
  githubLabel: "github.com/estebanEtudiant",
  // À compléter : laissé vide, le lien n'est affiché nulle part.
  linkedin: "",
  availability: "Disponible pour un stage du 11 janvier au 30 avril 2027 (16 semaines)",
  internship: "du 11 janvier au 30 avril 2027",
  cvFile: "/cv/Esteban-Barthod-Malat-CV-stage-2027.pdf",
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://estebanetudiant.github.io/portfolio";

export const intro =
  "Étudiant en 3ᵉ année de BUT Informatique à Belfort. Je conçois, développe et teste des applications, en Java, en Python ou pour le web, de la base de données jusqu'au déploiement.";

export const about = {
  paragraphs: [
    "Je suis en troisième année de BUT Informatique à l'IUT Nord Franche-Comté, à Belfort, dans le parcours Réalisation d'applications : conception, développement et validation. J'y travaille en Java, en Python et en SQL, je modélise avec UML et Merise, et j'écris des tests. Ce qui me plaît, c'est d'aller au bout d'un projet : partir d'un besoin et livrer une application qui tourne.",
    "Pendant mon stage chez APF France Handicap, j'ai conçu et développé une application de facturation qui a remplacé un suivi sur Excel et qui est utilisée aujourd'hui. En dehors des cours, je me sers de projets personnels pour apprendre ce que je n'utilise pas encore à l'IUT, comme NestJS, Redis ou Stripe.",
    "Je cherche un stage de fin d'études du 11 janvier au 30 avril 2027, puis une poursuite d'études en école d'ingénieurs ou en master.",
  ],
  ways: [
    {
      title: "Je vais jusqu'au déploiement",
      body: "Un projet n'est fini que lorsqu'il tourne ailleurs que sur ma machine : Docker Compose, variables d'environnement documentées, README d'installation.",
    },
    {
      title: "Je sais avancer en autonomie",
      body: "Pendant mon stage, j'ai mené l'application de facturation en autonomie, du schéma de la base aux factures envoyées par email.",
    },
    {
      title: "Je travaille bien en équipe",
      body: "Projets universitaires à quatre et à cinq, organisés en sprints avec des démonstrations régulières.",
    },
    {
      title: "Je fais de la veille",
      body: "Je lis Hacker News et Stack Overflow chaque jour, et je teste les outils qui m'intriguent sur mes propres projets.",
    },
  ],
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Langages", items: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "Bash", "C++ (notions)"] },
  { group: "Conception et qualité", items: ["UML", "Merise", "Conception d'API REST", "Tests unitaires et d'intégration", "CI/CD"] },
  { group: "Bases de données", items: ["PostgreSQL", "MySQL", "Redis"] },
  { group: "Web, interface", items: ["React", "Vue.js", "Tailwind CSS", "HTML", "CSS"] },
  { group: "Web, serveur", items: ["Node.js", "Express", "NestJS", "Prisma", "API REST", "JWT"] },
  { group: "Déploiement", items: ["Docker", "Docker Compose", "Nginx", "Linux (Debian, Ubuntu)"] },
  { group: "Outils", items: ["Git", "GitHub", "JetBrains", "VS Code", "Stripe", "GanttProject"] },
];

export type TimelineEntry = {
  when: string;
  title: string;
  place?: string;
  body?: string;
  kind: "formation" | "experience" | "projet" | "objectif";
  href?: string;
};

// Ordre chronologique : c'est une vraie séquence, d'où la frise.
export const timeline: TimelineEntry[] = [
  {
    when: "2023",
    title: "Baccalauréat STI2D, spécialité SIN",
    place: "Lycée Jules Haag, Besançon",
    kind: "formation",
  },
  {
    when: "Depuis 2023",
    title: "BUT Informatique, parcours Réalisation d'applications",
    place: "IUT Nord Franche-Comté, Belfort",
    body: "Conception, développement et validation d'applications. 3ᵉ année en cours.",
    kind: "formation",
  },
  {
    when: "Avril – juin 2024",
    title: "Jeu de plateau en Java avec IA",
    place: "Projet universitaire, équipe de 4",
    kind: "projet",
    href: "/projets/jeu-de-plateau-java/",
  },
  {
    when: "Sept. 2024 – mars 2025",
    title: "Quantic Grand Prix, application web en Vue.js",
    place: "Projet universitaire, équipe de 5",
    kind: "projet",
  },
  {
    when: "Mai – juillet 2025",
    title: "Stage de développement",
    place: "APF France Handicap",
    body: "Une application web de facturation, conçue et développée pendant le stage, aujourd'hui utilisée à la place d'Excel.",
    kind: "experience",
    href: "/projets/facturation-apf/",
  },
  {
    when: "Été 2025",
    title: "Facteur",
    place: "La Poste, Pontarlier",
    body: "Distribution quotidienne en autonomie, respect des délais, optimisation des tournées.",
    kind: "experience",
  },
  {
    when: "2026",
    title: "Plateforme de vente de licences logicielles",
    place: "Projet personnel",
    kind: "projet",
    href: "/projets/plateforme-licences/",
  },
  {
    when: "11 janv. – 30 avril 2027",
    title: "Stage de fin d'études",
    body: "Je cherche une équipe où livrer du code propre, de la conception à la mise en production.",
    kind: "objectif",
  },
  {
    when: "Après le BUT",
    title: "École d'ingénieurs ou master",
    kind: "objectif",
  },
];
