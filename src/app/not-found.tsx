import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-28 sm:px-8">
      <h1 className="font-display text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-none tracking-[-0.025em]">Page introuvable</h1>
      <p className="mt-6 max-w-[32rem] text-lg text-graphite">Cette adresse ne correspond à aucune page du site. Les projets sont listés sur l&apos;accueil.</p>
      <Link href="/#projets" className="mt-8 inline-flex h-12 items-center rounded-full bg-encre px-6 font-medium text-calque">
        Voir les projets
      </Link>
    </div>
  );
}
