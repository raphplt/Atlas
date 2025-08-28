import Image from "next/image";
import { Card } from "@/components/ui/card";

const works = [
  {
    before: "/images/placeholders/before.png",
    after: "/images/placeholders/after.png",
    caption: "Refonte menuisier local — +40% demandes de devis (placeholder)",
  },
  {
    before: "/images/placeholders/before.png",
    after: "/images/placeholders/after.png",
    caption: "Site plombier — +30% appels (placeholder)",
  },
];

export function Work() {
  return (
    <section className="container py-24" id="realisations">
      <h2 className="h2 text-center mb-12">Exemples de travaux</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {works.map((w, i) => (
          <Card key={i} className="p-2">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Image src={w.before} alt="Avant" width={300} height={200} />
              <Image src={w.after} alt="Après" width={300} height={200} />
            </div>
            <p className="text-sm text-[var(--color-muted)] text-center">{w.caption}</p>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="#contact" className="underline text-sm">
          Voir plus d'exemples
        </a>
      </div>
    </section>
  );
}
