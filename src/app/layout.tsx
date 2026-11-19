import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import { ViewTransition } from "react";
import { Revelateur } from "@/components/Revelateur";
import { SiteHeader } from "@/components/SiteHeader";
import { themeScript } from "@/components/ThemeToggle";
import { intro, profile, siteUrl } from "@/content/site";
import "./globals.css";

const plex = IBM_Plex_Sans({ variable: "--font-plex", subsets: ["latin"], weight: ["400", "500", "600"] });
const plexCondensed = IBM_Plex_Sans_Condensed({ variable: "--font-plex-condensed", subsets: ["latin"], weight: ["600"] });
// Le monospace ne sert que dans les schémas : pas de préchargement prioritaire.
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400"], preload: false });

const fullName = `${profile.firstName} ${profile.lastName}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`),
  title: { default: `${fullName}, ${profile.role.toLowerCase()}`, template: `%s | ${fullName}` },
  description: intro,
  authors: [{ name: fullName, url: profile.github }],
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: fullName,
    title: `${fullName}, ${profile.role.toLowerCase()}`,
    description: intro,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf0f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1830" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${plex.variable} ${plexCondensed.variable} ${plexMono.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <ViewTransition default="page">
          <main id="contenu" className="flex-1">
            {children}
          </main>
        </ViewTransition>
        <Revelateur />
        <footer className="border-t border-trait">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-graphite sm:flex-row sm:justify-between sm:px-8">
            <p>© {new Date().getFullYear()} {fullName}</p>
            <p>Site réalisé avec Next.js, publié sur GitHub Pages.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
