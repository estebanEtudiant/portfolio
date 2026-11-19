"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const current = (): Theme =>
  (document.documentElement.dataset.theme as Theme | undefined) ??
  (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- le thème n'est connu que côté navigateur
  useEffect(() => setTheme(current()), []);

  const toggle = () => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // stockage indisponible (navigation privée) : le choix vaut pour la page
    }
    setTheme(next);
  };

  const label = theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-full text-graphite transition-colors hover:bg-surface hover:text-encre"
    >
      {theme === "dark" ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}

/** Avant l'affichage : thème mémorisé (évite un flash) et classe `js` (les schémas attendent d'être vus). */
export const themeScript = `document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
