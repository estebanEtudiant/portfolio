import type { CSSProperties } from "react";
import type { Diagram, DiagramNode, Side } from "@/content/types";

const NODE_H = 56;

type Pt = { x: number; y: number };

function anchor(n: DiagramNode, side: Side, at = 0.5): Pt {
  const h = n.h ?? NODE_H;
  if (side === "t") return { x: n.x + n.w * at, y: n.y };
  if (side === "b") return { x: n.x + n.w * at, y: n.y + h };
  if (side === "l") return { x: n.x, y: n.y + h * at };
  return { x: n.x + n.w, y: n.y + h * at };
}

const horizontal = (s: Side) => s === "l" || s === "r";

/** Trait orthogonal (coudé) entre deux ancres, et position de son étiquette. */
function route(a: Pt, sa: Side, b: Pt, sb: Side) {
  if (horizontal(sa) && horizontal(sb)) {
    if (Math.abs(a.y - b.y) < 0.5) {
      return { d: `M${a.x} ${a.y} H${b.x}`, lx: (a.x + b.x) / 2, ly: a.y - 8, anchor: "middle" as const };
    }
    const mx = Math.round((a.x + b.x) / 2);
    return { d: `M${a.x} ${a.y} H${mx} V${b.y} H${b.x}`, lx: (mx + b.x) / 2, ly: b.y - 8, anchor: "middle" as const };
  }
  if (!horizontal(sa) && !horizontal(sb)) {
    if (Math.abs(a.x - b.x) < 0.5) {
      return { d: `M${a.x} ${a.y} V${b.y}`, lx: a.x + 8, ly: (a.y + b.y) / 2 + 4, anchor: "start" as const };
    }
    const my = Math.round((a.y + b.y) / 2);
    return { d: `M${a.x} ${a.y} V${my} H${b.x} V${b.y}`, lx: b.x + 8, ly: (my + b.y) / 2 + 4, anchor: "start" as const };
  }
  if (horizontal(sa)) {
    return { d: `M${a.x} ${a.y} H${b.x} V${b.y}`, lx: b.x + 8, ly: (a.y + b.y) / 2, anchor: "start" as const };
  }
  return { d: `M${a.x} ${a.y} V${b.y} H${b.x}`, lx: (a.x + b.x) / 2, ly: b.y - 8, anchor: "middle" as const };
}

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/**
 * Schéma d'architecture rendu au build (aucun JavaScript hydraté) :
 * - les traits se dessinent en CSS quand la classe `vu` arrive (posée par
 *   <Revelateur />, ou dès le HTML avec `immediate` pour l'accueil) ;
 * - le survol d'un bloc met en avant ses liaisons grâce à `:has()` ;
 * - les points « données » (SMIL) sont lancés par <Revelateur />.
 */
export function SystemDiagram({
  diagram,
  caption,
  slug,
  immediate = false,
  start = 0,
  mobile = true,
}: {
  diagram: Diagram;
  caption?: string;
  /** Préfixe unique de classes, pour isoler les règles de survol */
  slug: string;
  /** Dessiner dès le premier affichage, sans attendre le JavaScript */
  immediate?: boolean;
  /** Décalage du dessin (ms), pour s'enchaîner avec l'ouverture */
  start?: number;
  /** false quand le schéma est de toute façon masqué sur mobile : page plus légère */
  mobile?: boolean;
}) {
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]));
  const edges = diagram.edges.map((e) => {
    const a = anchor(byId[e.from], e.fromSide, e.fromAt);
    const b = anchor(byId[e.to], e.toSide, e.toAt);
    return { ...e, ...route(a, e.fromSide, b, e.toSide) };
  });
  const neighbours = (id: string) =>
    diagram.edges.flatMap((e) => (e.from === id ? [e.to] : e.to === id ? [e.from] : []));
  const end = start + 350 + edges.length * 120 + 700;

  const s = `s-${slug}`;
  const hoverRules = diagram.nodes
    .map(
      (n) =>
        `.${s}:has(.n-${n.id}:hover) :is(.noeud,.arete):not(.r-${n.id}){opacity:.28}` +
        `.${s}:has(.n-${n.id}:hover) .arete.r-${n.id} path{stroke:var(--cobalt);stroke-width:2}`,
    )
    .join("");

  const description = diagram.edges
    .map((e) => `${byId[e.from].label} vers ${byId[e.to].label}${e.label ? ` (${e.label})` : ""}`)
    .join(" ; ");

  return (
    <figure className={`schema ${s} m-0${immediate ? " vu" : ""}`} data-fin={end}>
      <style>{hoverRules}</style>
      {/* Bureau et tablette : le schéma complet */}
      <div className="grille hidden rounded-md border border-trait bg-surface/60 p-3 sm:block">
        <svg
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          className="h-auto w-full"
          role="img"
          aria-label={`${diagram.title}. ${description}.`}
        >
          <defs>
            <marker id={`m-${slug}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--graphite)" />
            </marker>
          </defs>

          {diagram.groups?.map((g) => (
            <g key={g.label} className="groupe" style={delay(start)}>
              <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={8} fill="none" strokeDasharray="5 5" stroke="var(--graphite)" strokeOpacity={0.45} />
              <text x={g.x + g.w - 10} y={g.y + 17} textAnchor="end" className="font-mono" fontSize={11} fill="var(--graphite)">
                {g.label}
              </text>
            </g>
          ))}

          {edges.map((e, i) => {
            const d = start + 350 + i * 120;
            return (
              <g key={`${e.from}-${e.to}-${i}`} className={`arete r-${e.from} r-${e.to}`}>
                <path d={e.d} fill="none" pathLength={1} strokeDasharray="1" markerEnd={`url(#m-${slug})`} style={delay(d)} />
                {e.label && (
                  <text x={e.lx} y={e.ly} textAnchor={e.anchor} className="etiquette font-mono" fontSize={11} fill="var(--graphite)" style={delay(d + 450)}>
                    {e.label}
                  </text>
                )}
                {e.flow && (
                  <circle className="point" r={4} visibility="hidden" data-decalage={(i % 4) * 800}>
                    <set attributeName="visibility" to="visible" begin="indefinite" />
                    <animateMotion dur="3.2s" begin="indefinite" repeatCount="indefinite" path={e.d} />
                  </circle>
                )}
              </g>
            );
          })}

          {diagram.nodes.map((n, i) => {
            const h = n.h ?? NODE_H;
            return (
              <g key={n.id} className={`noeud n-${n.id} ${[n.id, ...neighbours(n.id)].map((x) => `r-${x}`).join(" ")}`}>
                <g className="entree" style={delay(start + i * 60)}>
                  <rect x={n.x} y={n.y} width={n.w} height={h} rx={6} />
                  <text x={n.x + 14} y={n.y + h / 2 - 3} className="font-display" fontSize={16} fontWeight={600} fill="var(--encre)">
                    {n.label}
                  </text>
                  {n.detail && (
                    <text x={n.x + 14} y={n.y + h / 2 + 15} className="font-mono" fontSize={11} fill="var(--graphite)">
                      {n.detail}
                    </text>
                  )}
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile : chaque bloc et ses liaisons, lisibles sans zoomer */}
      {mobile && (
      <ol className="space-y-2 sm:hidden" aria-label={diagram.title}>
        {diagram.mobileOrder.map((id, i) => {
          const n = byId[id];
          const out = diagram.edges.filter((e) => e.from === id);
          return (
            <li key={id} className="maillon rounded-md border border-trait bg-surface px-4 py-3" style={delay(start + i * 70)}>
              <p className="font-display text-lg font-semibold leading-tight">{n.label}</p>
              {n.detail && <p className="font-mono text-xs text-graphite">{n.detail}</p>}
              {out.length > 0 && (
                <ul className="mt-2 space-y-0.5 border-t border-trait pt-2 text-sm text-graphite">
                  {out.map((e) => (
                    <li key={e.to}>
                      envoie vers <span className="text-encre">{byId[e.to].label}</span>
                      {e.label ? ` (${e.label})` : ""}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
      )}

      {caption && <figcaption className="mt-3 text-sm text-graphite">{caption}</figcaption>}
    </figure>
  );
}
