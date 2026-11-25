"use client";

import { Send } from "lucide-react";
import { useState } from "react";

// Site statique (GitHub Pages) : l'envoi passe par FormSubmit, qui transfère le message par mail.
// Le tout premier envoi déclenche un mail d'activation à confirmer une fois.
const champ =
  "mt-1.5 w-full rounded-md border border-trait bg-calque px-4 py-3 text-encre outline-none transition-colors focus:border-cobalt focus-visible:ring-2 focus-visible:ring-cobalt/30";

type Etat = "attente" | "envoi" | "ok" | "erreur";

export function ContactForm({ email }: { email: string }) {
  const [etat, setEtat] = useState<Etat>("attente");

  const envoyer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setEtat("envoi");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") throw new Error();
      form.reset();
      setEtat("ok");
    } catch {
      setEtat("erreur");
    }
  };

  return (
    <form onSubmit={envoyer} className="mt-10 grid max-w-[40rem] gap-5 sm:grid-cols-2">
      <input type="hidden" name="_subject" value="Message depuis le portfolio" />
      <input type="hidden" name="_template" value="table" />
      {/* Champ piège pour les robots, invisible pour les visiteurs */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <label className="font-medium">
        Nom <span aria-hidden className="text-cobalt">*</span>
        <input name="nom" required autoComplete="name" className={champ} />
      </label>
      <label className="font-medium">
        Entreprise
        <input name="entreprise" autoComplete="organization" className={champ} />
      </label>
      <label className="font-medium sm:col-span-2">
        Adresse mail <span aria-hidden className="text-cobalt">*</span>
        <input name="email" type="email" required autoComplete="email" className={champ} />
      </label>
      <label className="font-medium sm:col-span-2">
        Message <span aria-hidden className="text-cobalt">*</span>
        <textarea name="message" required rows={6} className={`${champ} resize-y`} />
      </label>

      <p className="text-sm text-graphite sm:col-span-2">
        <span aria-hidden className="text-cobalt">*</span> Champ obligatoire. Vos
        informations servent seulement à vous répondre : le message m&apos;arrive par mail
        via le service FormSubmit, rien n&apos;est gardé sur ce site.
      </p>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={etat === "envoi"}
          className="bouton inline-flex h-12 items-center gap-2 rounded-full bg-encre px-6 font-medium text-calque disabled:opacity-60"
        >
          <Send size={18} aria-hidden />
          {etat === "envoi" ? "Envoi…" : "Envoyer"}
        </button>
        <p aria-live="polite" className="text-graphite">
          {etat === "ok" && "Merci, votre message est bien parti. Je vous réponds vite."}
          {etat === "erreur" && (
            <>
              L&apos;envoi n&apos;a pas marché. Écrivez-moi directement à{" "}
              <a href={`mailto:${email}`} className="lien text-encre">
                {email}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
