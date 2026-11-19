/**
 * Le seul moment animé au chargement : chaque ligne du nom monte derrière
 * un masque, comme une ligne tracée sur le calque. En CSS pur, pour démarrer
 * dès le premier affichage sans attendre le JavaScript (meilleur LCP).
 */
export function HeroName({ lines }: { lines: string[] }) {
  return (
    <h1 className="font-display font-semibold leading-[0.88] tracking-[-0.025em] text-[clamp(3.1rem,11.5vw,9.5rem)]">
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <span className="trace block" style={{ animationDelay: `${60 + i * 110}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
