import { Card } from "@/components/ui/card";

const items = [
  { title: "Site non mobile", body: "Votre site ne s'adapte pas aux mobiles." },
  { title: "Pas de devis rapide", body: "Vous perdez des prospects." },
  { title: "Invisible en local", body: "Vos voisins ne vous trouvent pas." },
];

export function Problems() {
  return (
    <section className="container py-24" id="problemes">
      <h2 className="h2 text-center mb-12">Vos problèmes</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <Card key={it.title} className="text-center">
            <h3 className="font-semibold mb-2">{it.title}</h3>
            <p className="text-sm text-[var(--color-muted)]">{it.body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
