import Link from "next/link";
import { profile } from "@/content/site";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

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
          <NavLinks variant="desktop" />
          <ThemeToggle />
        </div>
      </nav>
      {/* Mobile : les mêmes liens sur une ligne, sous le nom */}
      <NavLinks variant="mobile" />
    </header>
  );
}
