import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="container py-24 text-center" id="hero">
      <h1 className="h1 mb-6">
        Sites vitrines <span className="gradient">modernes</span> pour artisans et services locaux
      </h1>
      <p className="lead mb-8">
        Livraison en 10 jours. Pensé pour générer des appels et des demandes de devis.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <a href="#contact" className={buttonVariants({})}>Réserver un appel</a>
        <a href="#offres" className={buttonVariants({ variant: "ghost" })}>
          Voir les offres
        </a>
      </div>
      <ul className="flex justify-center gap-4 text-sm text-[var(--color-muted)]">
        <li className="card px-3 py-1">≤ 10 jours</li>
        <li className="card px-3 py-1">Mobile-first</li>
        <li className="card px-3 py-1">Prix fixe</li>
      </ul>
    </section>
  );
}
