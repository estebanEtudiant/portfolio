"use client";

import { useEffect, useRef } from "react";

/** Grille de calque révélée autour du pointeur, sur toute la largeur de l'accueil. */
export function HeroHalo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const zone = el?.parentElement;
    if (!el || !zone || !matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = zone.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
      });
    };
    zone.addEventListener("pointermove", move);
    return () => {
      zone.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} aria-hidden className="grille halo pointer-events-none absolute inset-0 -z-10" />;
}
