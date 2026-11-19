"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Smil = SVGAnimationElement;

// Au premier chargement, les animations CSS ont démarré avec la page (t = 0).
let premierAffichage = true;

/**
 * Un seul observateur pour tout le site, relancé à chaque changement de page :
 * - pose `vu` sur les schémas qui entrent à l'écran (le dessin est en CSS),
 *   puis lance les points « données » une fois les traits tracés ;
 * - sans `animation-timeline: view()` (Firefox), fait apparaître `.revele`
 *   et les traits de titre à l'entrée dans l'écran.
 */
export function Revelateur() {
  const pathname = usePathname();

  useEffect(() => {
    const calme = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const origine = premierAffichage ? 0 : performance.now();
    premierAffichage = false;

    const schemas = new IntersectionObserver(
      (entries) => {
        for (const { isIntersecting, target } of entries) {
          if (!isIntersecting) continue;
          schemas.unobserve(target);
          const deja = target.classList.contains("vu");
          target.classList.add("vu");
          if (calme) continue;
          // Accueil : le dessin a démarré avec la page, on ne compte que le temps restant.
          const fin = Number((target as HTMLElement).dataset.fin);
          const attente = deja ? Math.max(0, fin - (performance.now() - origine)) : fin;
          timers.push(
            setTimeout(() => {
              target.querySelectorAll<SVGCircleElement>(".point").forEach((p) => {
                const decalage = Number(p.dataset.decalage) / 1000;
                p.querySelectorAll<Smil>("set, animateMotion").forEach((a) => a.beginElementAt(decalage));
              });
            }, attente),
          );
        }
      },
      { threshold: 0.3 },
    );
    document.querySelectorAll(".schema").forEach((el) => schemas.observe(el));

    let repli: IntersectionObserver | undefined;
    if (!calme && !CSS.supports("animation-timeline: view()")) {
      repli = new IntersectionObserver(
        (entries) => {
          for (const { isIntersecting, target, boundingClientRect } of entries) {
            if (isIntersecting) {
              target.classList.add("vu");
              repli?.unobserve(target);
            } else if (boundingClientRect.top > 0) {
              // Seulement ce qui est plus bas : rien ne disparaît sous les yeux.
              target.classList.add("cache");
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      document.querySelectorAll(".revele, .titre").forEach((el) => repli?.observe(el));
    }

    return () => {
      schemas.disconnect();
      repli?.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
}
