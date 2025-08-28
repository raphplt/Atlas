import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { offers } from "@/content/offers";

export function Offers() {
  return (
    <section className="container py-24" id="offres">
      <h2 className="h2 text-center mb-12">Nos offres</h2>
      <p className="text-center text-sm text-[var(--color-muted)] mb-8">Paiement possible en 2 fois.</p>
      <div className="grid gap-6 md:grid-cols-3">
        {offers.map((offer) => (
          <Card key={offer.name} className="flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">{offer.name}</h3>
              <p className="text-2xl">{offer.price}</p>
            </div>
            <ul className="flex-1 mb-6 space-y-2 text-sm text-[var(--color-muted)]">
              {offer.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <a href="#contact" className={buttonVariants({})}>
              Discuter de ce pack
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}
