import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/journal";
import { siteMeta } from "@/lib/meta";
export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = posts.find((p) => p.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.description,
      url: `/blog/${slug}`,
      images: ["/opengraph-image"],
    },
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = posts.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <main id="main-content" className="article-wrap">
      <Link className="article-back" href="/blog">
        ← Toutes les notes
      </Link>
      <article>
        <p className="eyebrow" style={{ marginTop: 40 }}>
          {p.category} / NOTES D’ATELIER
        </p>
        <h1>{p.title}</h1>
        <p className="article-meta">
          Par Raphaël Plassart · {p.readingTime} minutes de lecture
        </p>
        <p className="article-lead">{p.description}</p>
        {p.sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
          </section>
        ))}
      </article>
      <Link className="button" href="/#contact">
        Parlons de votre site ↗
      </Link>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            description: p.description,
            author: {
              "@type": "Person",
              name: "Raphaël Plassart",
              url: `${siteMeta.url}/about`,
            },
            mainEntityOfPage: `${siteMeta.url}/blog/${slug}`,
            image: `${siteMeta.url}/opengraph-image`,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
