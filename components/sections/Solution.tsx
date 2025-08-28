import { Card } from "@/components/ui/card";

const items = [
  { title: "Crédibilité", body: "Une image pro qui rassure." },
  { title: "Conversion", body: "Des appels et devis en plus." },
  { title: "Visibilité locale", body: "Optimisé pour Google Maps." },
];

export function Solution() {
  return (
    <section className="container py-24" id="solution">
      <h2 className="h2 text-center mb-12">Notre solution</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <Card key={it.title} className="text-center">
            <h3 className="font-semibold mb-2">{it.title}</h3>
            <p className="text-sm text-[var(--color-muted)]">{it.body}</p>
          </Card>
        ))}
      </div>
      <p className="text-center mt-8 text-sm text-[var(--color-muted)]">
        Intégrations incluses : Google Maps, formulaire de devis, SEO de base
      </p>
    </section>
  );
}
