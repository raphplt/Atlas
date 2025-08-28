"use client";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/app/(site)/actions";
import { track } from "@/lib/analytics";

export function CTA() {
  return (
    <section className="container py-24" id="contact">
      <div className="card p-8 text-center">
        <h2 className="h2 mb-4">Votre site doit vous rapporter des clients.</h2>
        <form action={submitContact} className="grid gap-4 max-w-md mx-auto text-left">
          <input name="firstName" placeholder="Prénom" className="p-2 rounded bg-black/20" required />
          <input name="company" placeholder="Entreprise" className="p-2 rounded bg-black/20" required />
          <input name="email" type="email" placeholder="Email" className="p-2 rounded bg-black/20" required />
          <input name="phone" placeholder="Téléphone" className="p-2 rounded bg-black/20" />
          <textarea name="message" placeholder="Message" className="p-2 rounded bg-black/20" required />
          <Button type="submit" onClick={() => track('cta-click')}>
            Réserver un appel gratuit de 15 min
          </Button>
        </form>
      </div>
    </section>
  );
}
