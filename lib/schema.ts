import { siteMeta } from "./site";
export function businessSchema(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Atlas — Raphaël Plassart",
    description,
    url: siteMeta.url,
    email: siteMeta.email,
    areaServed: { "@type": "Country", name: "France" },
    founder: { "@type": "Person", name: siteMeta.author },
    sameAs: [siteMeta.linkedin, siteMeta.github],
  };
}
export function faqSchema(
  questions: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}
/** Sérialise un objet JSON-LD sans risque d'injection </script>. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
