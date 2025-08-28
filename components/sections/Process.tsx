const steps = [
  "Call gratuit",
  "Devis clair",
  "Création",
  "Mise en ligne",
];

export function Process() {
  return (
    <section className="container py-24" id="process">
      <h2 className="h2 text-center mb-12">Process</h2>
      <ol className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        {steps.map((s, i) => (
          <li key={s} className="card p-6">
            <div className="text-2xl font-bold mb-2">{i + 1}</div>
            <p>{s}</p>
          </li>
        ))}
      </ol>
      <p className="text-center text-sm text-[var(--color-muted)] mt-4">
        Temps total ≤ 10 jours
      </p>
    </section>
  );
}
