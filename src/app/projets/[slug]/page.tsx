import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GitHubIcon } from "@/components/icons";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SystemDiagram } from "@/components/SystemDiagram";
import { getProject, projects } from "@/content/projects";
import { asset } from "@/lib/asset";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `projets/${p.slug}/` },
    openGraph: { title: p.name, description: p.summary, type: "article" },
  };
}

const wrap = "mx-auto max-w-6xl px-4 sm:px-8";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  const id = title.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\w]+/g, "-");
  return (
    <section aria-labelledby={id} className="grid gap-6 border-t border-trait py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
      <h2 id={id} className="font-display text-3xl font-semibold leading-tight tracking-[-0.01em] lg:col-span-4">
        {title}
      </h2>
      <div className="lg:col-span-8">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projets/[slug]">) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const index = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <ReadingProgress />
      <div className={`${wrap} pb-6 pt-8`}>
        <Link href="/#projets" className="inline-flex items-center gap-2 text-graphite transition-colors hover:text-encre">
          <ArrowLeft size={16} aria-hidden />
          Tous les projets
        </Link>
      </div>

      <header className={`${wrap} pb-12`}>
        <p className="text-graphite">
          {p.kind}, {p.period.toLowerCase()}
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.025em]">{p.name}</h1>
        <p className="mt-6 max-w-[42rem] text-xl leading-relaxed">{p.summary}</p>

        <dl className="mt-10 grid gap-x-10 gap-y-6 border-t border-encre pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-sm text-graphite">Mon rôle</dt>
            <dd className="mt-1">{p.role}</dd>
          </div>
          <div>
            <dt className="text-sm text-graphite">Technologies</dt>
            <dd className="mt-1">{p.stack.join(", ")}</dd>
          </div>
          {p.outcome && (
            <div>
              <dt className="text-sm text-graphite">Résultat</dt>
              <dd className="mt-1">{p.outcome}</dd>
            </div>
          )}
          {(p.repo || p.demo || p.portfolio) && (
            <div>
              <dt className="text-sm text-graphite">Liens</dt>
              <dd className="mt-1 space-y-1">
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="lien flex w-fit items-center gap-2">
                    <GitHubIcon size={15} />
                    Code sur GitHub
                  </a>
                )}
                {p.portfolio && (
                  <a href={p.portfolio} target="_blank" rel="noopener noreferrer" className="lien block w-fit">
                    Portfolio de stage détaillé
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="lien block">
                    Démonstration en ligne
                  </a>
                )}
              </dd>
            </div>
          )}
          {p.codeNote && (
            <div>
              <dt className="text-sm text-graphite">Code source</dt>
              <dd className="mt-1">{p.codeNote}</dd>
            </div>
          )}
        </dl>
      </header>

      <div className={`${wrap} pb-6 [&>figure]:max-w-4xl`}>
        <SystemDiagram slug={p.slug} immediate start={250} diagram={p.diagram} caption={`${p.diagram.title}. Survolez un bloc pour suivre ses liaisons.`} />
      </div>

      <div className={wrap}>
        <Block title="Le contexte">
          <div className="max-w-[40rem] space-y-4 text-lg leading-relaxed">
            {p.context.map((c) => (
              <p key={c.slice(0, 24)}>{c}</p>
            ))}
          </div>
        </Block>

        <Block title="Le problème">
          <p className="max-w-[40rem] font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-snug tracking-[-0.01em]">{p.problem}</p>
        </Block>

        {p.steps && (
          <Block title="Démarche">
            <ol className="max-w-[44rem] border-l border-encre">
              {p.steps.map((s) => (
                <li key={s.title} className="revele relative pb-8 pl-6 last:pb-0">
                  <span aria-hidden className="absolute -left-[5px] top-2 size-[9px] rounded-full bg-cobalt" />
                  <p className="text-sm font-medium text-graphite">{s.when}</p>
                  <h3 className="mt-0.5 text-lg font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-1 text-graphite">{s.body}</p>
                </li>
              ))}
            </ol>
          </Block>
        )}

        <Block title="Ce que fait l'application">
          <ul className="max-w-[44rem] divide-y divide-trait border-y border-trait">
            {p.features.map((f) => (
              <li key={f} className="py-3.5">
                {f}
              </li>
            ))}
          </ul>
        </Block>

        {p.screenshots.length > 0 && (
          <Block title="Captures">
            <div className="grid gap-12">
              {p.screenshots.map((sc) => (
                <figure key={sc.src} className="revele m-0">
                  <Image src={asset(sc.src)} alt={sc.alt} width={1600} height={730} sizes="(min-width: 1024px) 760px, 100vw" loading="lazy" className="h-auto max-h-[80vh] w-auto max-w-full rounded-md border border-trait shadow-[0_24px_60px_-34px_rgba(22,32,58,0.5)]" />
                  {sc.caption && <figcaption className="mt-3 max-w-[40rem] text-sm text-graphite">{sc.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </Block>
        )}

        <Block title="Choix techniques">
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {p.decisions.map((d) => (
              <div key={d.title}>
                <h3 className="text-lg font-semibold leading-snug">{d.title}</h3>
                <p className="mt-2 text-graphite">{d.body}</p>
              </div>
            ))}
          </div>
        </Block>

        {p.challenges.length > 0 && (
          <Block title="Difficultés et solutions">
            <div className="space-y-8">
              {p.challenges.map((c) => (
                <div key={c.title}>
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 max-w-[40rem] text-graphite">{c.body}</p>
                </div>
              ))}
            </div>
          </Block>
        )}

        {p.learnings && (
          <Block title="Ce que j'en retiens">
            <div className="max-w-[40rem] space-y-4 text-lg leading-relaxed">
              {p.learnings.map((l) => (
                <p key={l.slice(0, 24)}>{l}</p>
              ))}
            </div>
          </Block>
        )}
      </div>

      <nav aria-label="Projet suivant" className="border-t border-trait bg-surface">
        <Link href={`/projets/${next.slug}/`} className={`${wrap} group block py-14 lg:py-20`}>
          <span className="text-graphite">Projet suivant</span>
          <span className="mt-2 block font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.02em] transition-colors group-hover:text-cobalt">
            {next.name}
          </span>
        </Link>
      </nav>
    </article>
  );
}
