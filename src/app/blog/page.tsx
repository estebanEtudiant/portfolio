import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, dateFr } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Ma veille et ce que j'apprends sur mes projets.",
  alternates: { canonical: "blog/" },
};

const wrap = "mx-auto max-w-6xl px-4 sm:px-8";

export default function BlogPage() {
  if (!articles.length) notFound();
  return (
    <div className={`${wrap} py-16 lg:py-24`}>
      <h1 className="titre font-display text-[clamp(2.75rem,8vw,5rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
        Blog
      </h1>
      <p className="mt-6 max-w-[38rem] text-lg text-graphite">
        Ma veille et ce que j&apos;apprends en faisant mes projets.
      </p>

      <ul className="mt-14 max-w-[48rem]">
        {articles.map((a) => (
          <li key={a.slug} className="revele border-t border-trait py-8">
            <p className="text-sm text-graphite">
              {dateFr(a.date)} · {a.tags.join(", ")}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold leading-snug sm:text-3xl">
              <Link href={`/blog/${a.slug}/`} className="transition-colors hover:text-cobalt">
                {a.title}
              </Link>
            </h2>
            <p className="mt-3 text-lg text-graphite">{a.summary}</p>
            <Link href={`/blog/${a.slug}/`} className="lien mt-4 inline-block font-medium text-cobalt" aria-label={`Lire : ${a.title}`}>
              Lire l&apos;article
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
