"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { id: "projets", label: "Projets" },
  { id: "parcours", label: "Parcours" },
  { id: "cv", label: "CV" },
  { id: "contact", label: "Contact" },
];

// Section lue = la dernière dont le titre est passé au-dessus du milieu de l'écran.
function useSectionLue(actif: boolean) {
  const [lue, setLue] = useState<string | null>(null);
  useEffect(() => {
    if (!actif) return;
    const maj = () => {
      const milieu = window.innerHeight / 2;
      let courante: string | null = null;
      for (const { id } of links) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < milieu) courante = id;
      }
      setLue(courante);
    };
    maj();
    window.addEventListener("scroll", maj, { passive: true });
    window.addEventListener("resize", maj);
    return () => {
      window.removeEventListener("scroll", maj);
      window.removeEventListener("resize", maj);
    };
  }, [actif]);
  return actif ? lue : null;
}

export function NavLinks({ variant }: { variant: "desktop" | "mobile" }) {
  const lue = useSectionLue(usePathname() === "/");
  const desktop = variant === "desktop";

  return (
    <ul
      aria-label={desktop ? undefined : "Sections"}
      className={
        desktop
          ? "hidden items-center gap-1 md:flex"
          : "-mt-2 flex gap-1 overflow-x-auto px-2 pb-2 md:hidden"
      }
    >
      {links.map((l, i) => (
        <li key={l.id} className="apparait" style={{ animationDelay: `${120 + i * 70}ms` }}>
          <Link
            href={`/#${l.id}`}
            aria-current={lue === l.id ? "location" : undefined}
            className={`nav-lien block rounded-full px-3 text-[0.95rem] text-graphite ${desktop ? "py-2" : "py-1.5"}`}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
