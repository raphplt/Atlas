const faqs = [
  {
    q: "Quels délais ?",
    a: "Livraison en 10 jours." ,
  },
  {
    q: "Quels contenus fournir ?",
    a: "Texte, photos, logo." ,
  },
  {
    q: "Hébergement ?",
    a: "Nous pouvons conseiller un hébergeur." ,
  },
  {
    q: "SEO ?",
    a: "Optimisation locale de base." ,
  },
];

export function FAQ() {
  return (
    <section className="container py-24" id="faq">
      <h2 className="h2 text-center mb-12">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((f) => (
          <details key={f.q} className="card p-4">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
