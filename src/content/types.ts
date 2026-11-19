export type Side = "t" | "r" | "b" | "l";

export type DiagramNode = {
  id: string;
  label: string;
  detail?: string;
  x: number;
  y: number;
  w: number;
  h?: number;
};

export type DiagramEdge = {
  from: string;
  fromSide: Side;
  fromAt?: number; // position le long du côté, 0 → 1 (0.5 par défaut)
  to: string;
  toSide: Side;
  toAt?: number;
  label?: string;
  flow?: boolean; // fait circuler un point « donnée » le long du trait
};

export type DiagramGroup = {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Diagram = {
  title: string;
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  groups?: DiagramGroup[];
  /** Ordre de lecture sur mobile, où le schéma devient une chaîne verticale */
  mobileOrder: string[];
};

export type Project = {
  slug: string;
  name: string;
  kind: string; // « Stage », « Projet personnel »…
  period: string;
  summary: string;
  stack: string[];
  context: string[];
  /** Le problème à résoudre, en une ou deux phrases */
  problem: string;
  features: string[];
  decisions: { title: string; body: string }[];
  /** Étapes datées du projet : c'est une vraie séquence, d'où la numérotation */
  steps?: { when: string; title: string; body: string }[];
  /** Difficultés racontées par Esteban : section masquée tant que la liste est vide */
  challenges: { title: string; body: string }[];
  /** Ce qu'il en retient : limites connues et suites prévues */
  learnings?: string[];
  role: string;
  outcome?: string;
  repo?: string;
  demo?: string;
  /** Portfolio détaillé du projet (ex. portfolio de stage) */
  portfolio?: string;
  /** Chemins sous /public/projets/<slug>/ : galerie masquée tant que la liste est vide */
  screenshots: { src: string; alt: string; caption?: string }[];
  diagram: Diagram;
};

export type SideProject = {
  name: string;
  kind: string;
  period: string;
  summary: string;
  stack: string[];
  repo?: string;
};
