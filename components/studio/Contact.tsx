"use client";
import { useState } from "react";
import Link from "next/link";
export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }
  return (
    <section id="contact" className="contact-section section-wrap">
      <div>
        <p className="eyebrow">✳ LA SUITE S’ÉCRIT ENSEMBLE</p>
        <h2>
          Une idée en tête ?<br />
          <em>Donnons-lui forme.</em>
        </h2>
        <p>
          Parlez-moi de votre activité, de vos envies, de ce qui doit changer.
          On commence par une conversation.
        </p>
        <a className="text-link" href="mailto:contact@raphael-plassart.com">
          contact@raphael-plassart.com ↗
        </a>
      </div>
      <form onSubmit={submit} className="contact-form">
        <div className="form-row">
          <label>
            Votre prénom
            <input
              name="firstName"
              autoComplete="given-name"
              required
              maxLength={60}
              placeholder="Camille"
            />
          </label>
          <label>
            Votre entreprise
            <input
              name="company"
              autoComplete="organization"
              required
              maxLength={120}
              placeholder="Le nom de votre activité"
            />
          </label>
        </div>
        <label>
          Votre adresse e-mail
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="bonjour@entreprise.fr"
          />
        </label>
        <label>
          Votre projet
          <select name="projectGoal" required defaultValue="">
            <option value="" disabled>
              De quoi avez-vous besoin ?
            </option>
            <option value="creation">Créer mon site</option>
            <option value="redesign">Repenser mon site</option>
            <option value="marketing">Améliorer ma visibilité</option>
            <option value="other">Autre chose, discutons-en</option>
          </select>
        </label>
        <label>
          Quelques mots pour commencer
          <textarea
            name="message"
            rows={3}
            maxLength={3000}
            placeholder="Votre activité, vos objectifs, votre calendrier…"
          />
        </label>
        <div className="honeypot" aria-hidden="true">
          <label>
            Votre site
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <p className="form-privacy">
          Ces informations servent à répondre à votre demande.{" "}
          <Link href="/legal/politique-confidentialite">Confidentialité</Link>
        </p>
        <button className="button" disabled={state === "sending"} type="submit">
          {state === "sending" ? "Envoi en cours…" : "Envoyer mon message"}
          <span>↗</span>
        </button>
        <div role="status" aria-live="polite">
          {state === "success" && (
            <p>Merci, votre message a bien été envoyé. À très vite !</p>
          )}
          {state === "error" && (
            <p>
              L’envoi n’a pas abouti. Réessayez ou écrivez-moi directement par
              e-mail.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
