import Link from "next/link";
import { profile } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/#projets", label: "Projets" },
  { href: "/#parcours", label: "Parcours" },
  { href: "/#cv", label: "CV" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header
      className="en-tete sticky top-0 z-40 border-b border-transparent bg-calque"
    >
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-encre focus:px-3 focus:py-2 focus:text-calque"
      >
        Aller au contenu
      </a>
      <nav aria-label="Navigation principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          {profile.firstName} {profile.lastName}
        </Link>
        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded-full px-3 py-2 text-[0.95rem] text-graphite transition-colors hover:text-encre">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
      {/* Mobile : les mêmes liens sur une ligne, sous le nom */}
      <ul aria-label="Sections" className="-mt-2 flex gap-1 overflow-x-auto px-2 pb-2 md:hidden">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="block rounded-full px-3 py-1.5 text-[0.95rem] text-graphite hover:text-encre">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
