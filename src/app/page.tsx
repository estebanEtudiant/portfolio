import { Download, Mail } from "lucide-react";
import Link from "next/link";
import { CopyEmail } from "@/components/CopyEmail";
import { CvChoice } from "@/components/CvChoice";
import { HeroHalo } from "@/components/HeroHalo";
import { HeroName } from "@/components/HeroName";
import { GitHubIcon } from "@/components/icons";
import { SystemDiagram } from "@/components/SystemDiagram";
import { projects, sideProjects } from "@/content/projects";
import { about, intro, profile, siteUrl, skills, timeline } from "@/content/site";
import { asset } from "@/lib/asset";

const wrap = "mx-auto max-w-6xl px-4 sm:px-8";

function SectionTitle({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="titre font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.02em]"
    >
      {children}
    </h2>
  );
}

// Données structurées pour les moteurs de recherche : uniquement ce qui est affiché sur la page.
const personne = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: `${profile.firstName} ${profile.lastName}`,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  sameAs: [profile.github, ...(profile.linkedin ? [profile.linkedin] : [])],
  address: { "@type": "PostalAddress", addressLocality: "Belfort", postalCode: "90000", addressCountry: "FR" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "IUT Nord Franche-Comté" },
  knowsLanguage: ["fr", "en"],
  knowsAbout: skills.flatMap((s) => s.items),
};

export default function Home() {
  const [stage] = projects;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personne) }} />
      {/* Accueil */}
      <section aria-labelledby="nom" className="relative isolate">
        <HeroHalo />
        <div className={`${wrap} pb-20 pt-10 sm:pt-16 lg:pb-28`}>
          <div id="nom">
            <HeroName lines={[profile.firstName, profile.lastName]} />
          </div>

          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p
                className="apparait font-display text-2xl font-semibold leading-snug sm:text-[1.75rem]"
                style={{ animationDelay: "280ms" }}
              >
                {profile.role}
              </p>
              <p
                className="apparait mt-4 max-w-[34rem] text-lg text-graphite"
                style={{ animationDelay: "360ms" }}
              >
                {intro}
              </p>
              <p
                className="apparait mt-6 font-medium text-cobalt"
                style={{ animationDelay: "440ms" }}
              >
                {profile.availability}
              </p>

              <div
                className="apparait mt-8 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "520ms" }}
              >
                <Link
                  href="#projets"
                  className="bouton inline-flex h-12 items-center rounded-full bg-encre px-6 font-medium text-calque"
                >
                  Voir les projets
                </Link>
                <a
                  href={`mailto:${profile.email}`}
                  className="balaye inline-flex h-12 items-center gap-2 rounded-full border border-encre px-6 font-medium"
                >
                  <Mail size={18} aria-hidden />
                  M&apos;écrire
                </a>
              </div>
              <a
                href={asset(profile.cvFile)}
                download
                className="lien apparait mt-5 inline-flex items-center gap-2 text-graphite hover:text-encre"
                style={{ animationDelay: "580ms" }}
              >
                <Download size={16} aria-hidden />
                Télécharger mon CV (PDF)
              </a>
            </div>

            <div className="lg:col-span-7">
              <SystemDiagram
                slug="accueil"
                immediate
                start={600}
                diagram={stage.diagram}
                caption="L'application que j'ai conçue pendant mon stage chez APF France Handicap. Survolez un bloc pour suivre ses liaisons."
              />
            </div>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section aria-labelledby="a-propos" className="border-t border-trait">
        <div className={`${wrap} grid gap-10 py-20 lg:grid-cols-12 lg:py-28`}>
          <div className="lg:col-span-4">
            <SectionTitle id="a-propos">À propos</SectionTitle>
          </div>
          <div className="lg:col-span-8">
            <div className="max-w-[40rem] space-y-5 text-lg leading-relaxed">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <h3 className="mt-14 font-display text-2xl font-semibold">
              Ma façon de travailler
            </h3>
            <dl className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {about.ways.map((w) => (
                <div
                  key={w.title}
                  className="revele border-t border-encre pt-4"
                >
                  <dt className="font-semibold">{w.title}</dt>
                  <dd className="mt-1.5 text-graphite">{w.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Projets */}
      <section aria-labelledby="projets" className="border-t border-trait">
        <div className={`${wrap} py-20 lg:py-28`}>
          <SectionTitle id="projets">Projets</SectionTitle>
          <p className="mt-4 max-w-[36rem] text-lg text-graphite">
            Trois études de cas, chacune avec le schéma de son architecture. Les
            autres projets suivent en bref.
          </p>

          <ul className="mt-14 space-y-20 lg:space-y-28">
            {projects.map((p) => (
              <li
                key={p.slug}
                className="revele group grid gap-8 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-5">
                  <p className="text-sm text-graphite">
                    {p.kind}, {p.period.toLowerCase()}
                  </p>
                  <h3 className="mt-2 font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.015em]">
                    <Link
                      href={`/projets/${p.slug}/`}
                      className="transition-colors group-hover:text-cobalt"
                    >
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-4 text-lg">{p.summary}</p>
                  <p className="mt-4 text-sm text-graphite">
                    {p.stack.join(", ")}
                  </p>
                  <Link
                    href={`/projets/${p.slug}/`}
                    className="lien mt-6 inline-block font-medium text-cobalt"
                    aria-label={`Lire l'étude de cas : ${p.name}`}
                  >
                    Lire l&apos;étude de cas
                  </Link>
                </div>
                <div className="hidden sm:block lg:col-span-7">
                  <SystemDiagram slug={p.slug} diagram={p.diagram} mobile={false} />
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-24 font-display text-2xl font-semibold">
            Autres projets
          </h3>
          <ul className="mt-6 grid gap-10 md:grid-cols-3">
            {sideProjects.map((p) => (
              <li key={p.name} className="revele border-t border-encre pt-4">
                <p className="text-sm text-graphite">
                  {p.kind}, {p.period.toLowerCase()}
                </p>
                <h4 className="mt-1 text-lg font-semibold">{p.name}</h4>
                <p className="mt-2 text-graphite">{p.summary}</p>
                <p className="mt-3 text-sm text-graphite">
                  {p.stack.join(", ")}
                </p>
                {p.repo && (
                  <a
                    href={p.repo}
                    className="lien mt-3 inline-flex items-center gap-2 text-sm font-medium"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <GitHubIcon size={15} />
                    Voir le code
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Compétences */}
      <section aria-labelledby="competences" className="border-t border-trait">
        <div className={`${wrap} grid gap-10 py-20 lg:grid-cols-12 lg:py-28`}>
          <div className="lg:col-span-4">
            <SectionTitle id="competences">Compétences</SectionTitle>
            <p className="mt-4 max-w-[22rem] text-graphite">
              Seulement ce que j&apos;ai déjà utilisé dans un projet réel.
            </p>
          </div>
          <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {skills.map((s) => (
              <div key={s.group} className="revele">
                <dt className="font-display text-xl font-semibold">
                  {s.group}
                </dt>
                <dd className="mt-3">
                  <ul className="space-y-1.5 text-graphite">
                    {s.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Parcours */}
      <section aria-labelledby="parcours" className="border-t border-trait">
        <div className={`${wrap} grid gap-10 py-20 lg:grid-cols-12 lg:py-28`}>
          <div className="lg:col-span-4">
            <SectionTitle id="parcours">Parcours</SectionTitle>
          </div>
          <ol className="relative lg:col-span-8">
            {timeline.map((t, i) => {
              const future = t.kind === "objectif";
              const last = i === timeline.length - 1;
              return (
                <li
                  key={t.title}
                  className="relative grid grid-cols-[1.25rem_1fr] gap-x-5 pb-10 sm:grid-cols-[1.25rem_11rem_1fr]"
                >
                  {!last && (
                    <span
                      aria-hidden
                      className={`trait-temps absolute left-[0.5625rem] top-5 h-full w-px ${future || timeline[i + 1].kind === "objectif" ? "border-l border-dashed border-graphite/50" : "bg-encre"}`}
                    />
                  )}
                  <span
                    aria-hidden
                    className={`point-temps relative mt-1.5 size-3 rounded-full border-2 ${future ? "border-graphite bg-calque" : "border-encre bg-encre"}`}
                  />
                  <p
                    className={`text-sm sm:pt-0.5 ${future ? "text-graphite" : "text-encre"} font-medium`}
                  >
                    {t.when}
                  </p>
                  <div className="col-start-2 sm:col-start-3">
                    <p className="text-lg font-semibold leading-snug">
                      {t.title}
                    </p>
                    {t.place && <p className="text-graphite">{t.place}</p>}
                    {t.body && (
                      <p className="mt-1 max-w-[34rem] text-graphite">
                        {t.body}
                      </p>
                    )}
                    {t.href && (
                      <Link
                        href={t.href}
                        className="lien mt-1 inline-block text-sm font-medium text-cobalt"
                      >
                        Voir l&apos;étude de cas
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* CV */}
      <section aria-labelledby="cv" className="border-t border-trait">
        <div
          className={`${wrap} grid items-start gap-12 py-20 lg:grid-cols-12 lg:py-28`}
        >
          <CvChoice
            intro={
              <>
                <SectionTitle id="cv">CV</SectionTitle>
                <p className="mt-4 max-w-[28rem] text-lg text-graphite">
                  Toutes ces informations sur une page A4, pour une candidature
                  de stage {profile.internship}.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Contact */}
      <section
        aria-labelledby="contact"
        className="border-t border-trait bg-surface"
      >
        <div className={`${wrap} py-20 lg:py-28`}>
          <SectionTitle id="contact">Contact</SectionTitle>
          <p className="mt-4 max-w-[34rem] text-lg text-graphite">
            Une offre de stage, une question sur un projet ou une proposition
            d&apos;alternance : écrivez-moi.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="lien mt-10 block break-words font-display text-[clamp(1.35rem,4.2vw,3rem)] font-semibold leading-tight tracking-[-0.01em] hover:text-cobalt"
          >
            {profile.email}
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CopyEmail email={profile.email} />
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-trait px-4 py-2 text-sm transition-colors hover:border-encre"
            >
              <GitHubIcon size={16} />
              {profile.githubLabel}
            </a>
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-trait px-4 py-2 text-sm transition-colors hover:border-encre"
              >
                LinkedIn
              </a>
            )}
          </div>
          <p className="mt-8 text-graphite">{profile.location}. Permis B.</p>
        </div>
      </section>
    </>
  );
}
