"use client";

import { Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { profile } from "@/content/site";
import { asset } from "@/lib/asset";
import apercuFrance from "../../public/cv/apercu-cv.webp";
import apercuSuisse from "../../public/cv/apercu-cv-suisse.webp";

const versions = {
  france: { label: "France", file: profile.cvFile, preview: apercuFrance },
  suisse: { label: "Suisse", file: profile.cvFileSuisse, preview: apercuSuisse },
};
type Version = keyof typeof versions;

export function CvChoice({ intro }: { intro: React.ReactNode }) {
  const [version, setVersion] = useState<Version>("france");
  const cv = versions[version];
  const href = asset(cv.file);

  return (
    <>
      <div className="lg:col-span-5">
        {intro}
        <label className="mt-8 flex items-center gap-3 font-medium">
          Version
          <select
            value={version}
            onChange={(e) => setVersion(e.target.value as Version)}
            className="h-12 rounded-full border border-encre bg-transparent px-5 font-medium"
          >
            {Object.entries(versions).map(([key, v]) => (
              <option key={key} value={key}>
                {v.label}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={href}
            download
            className="bouton inline-flex h-12 items-center gap-2 rounded-full bg-encre px-6 font-medium text-calque"
          >
            <Download size={18} aria-hidden />
            Télécharger le PDF
          </a>
          <a
            href={href}
            target="_blank"
            rel="noopener"
            className="balaye inline-flex h-12 items-center rounded-full border border-encre px-6 font-medium"
          >
            Ouvrir dans un onglet
          </a>
        </div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        aria-label={`Ouvrir le CV (version ${cv.label}) en PDF`}
        className="group block [perspective:1200px] lg:col-span-6 lg:col-start-7"
      >
        <Image
          key={version}
          src={cv.preview}
          alt={`Aperçu du CV d'Esteban Barthod-Malat, version ${cv.label}`}
          sizes="(min-width: 1024px) 500px, 100vw"
          placeholder="blur"
          className="w-full rounded-sm border border-trait shadow-[0_24px_60px_-30px_rgba(22,32,58,0.45)] transition-transform duration-500 ease-out motion-safe:group-hover:[transform:rotateX(4deg)_rotateY(-7deg)_translateY(-6px)]"
        />
      </a>
    </>
  );
}
