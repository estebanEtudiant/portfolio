import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/ReadingProgress";
import { articles, dateFr, getArticle } from "@/content/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  // export statique : il faut au moins une route ; sans article publié, celle-ci renvoie une 404
  return articles.length ? articles.map((a) => ({ slug: a.slug })) : [{ slug: "aucun" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: `blog/${a.slug}/` },
    openGraph: { title: a.title, description: a.summary, type: "article" },
  };
}

const wrap = "mx-auto max-w-6xl px-4 sm:px-8";

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const a = getArticle((await params).slug);
  if (!a) notFound();

  return (
    <article>
      <ReadingProgress />
      <div className={`${wrap} pb-6 pt-8`}>
        <Link href="/blog/" className="inline-flex items-center gap-2 text-graphite transition-colors hover:text-encre">
          <ArrowLeft size={16} aria-hidden />
          Tous les articles
        </Link>
      </div>

      <div className={`${wrap} pb-24`}>
        <div className="max-w-[42rem]">
          {a.brouillon && (
            <p className="mb-8 rounded-md border border-surligneur bg-surligneur/15 px-4 py-3 text-sm">
              Brouillon visible seulement en local : à réécrire avant de le mettre en ligne.
            </p>
          )}
          <p className="text-graphite">
            {dateFr(a.date)} · {a.tags.join(", ")}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.25rem,6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            {a.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed">{a.summary}</p>

          <div className="mt-12 space-y-5 text-lg leading-relaxed">
            {a.body.map((b, i) =>
              "h" in b ? (
                <h2 key={i} className="pt-6 font-display text-2xl font-semibold leading-snug">
                  {b.h}
                </h2>
              ) : "li" in b ? (
                <ul key={i} className="list-disc space-y-1.5 pl-6 marker:text-cobalt">
                  {b.li.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              ) : (
                <p key={i}>{b.p}</p>
              ),
            )}
          </div>
          {a.projet && (
            <p className="mt-14 border-t border-trait pt-6 text-graphite">
              Le projet en détail :{" "}
              <Link href={a.projet.href} className="lien font-medium text-cobalt">
                {a.projet.label}
              </Link>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
