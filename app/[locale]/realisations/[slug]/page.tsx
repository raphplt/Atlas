import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PortableBody } from "@/components/blog/PortableBody";
import { ContactBand } from "@/components/atlas/ContactBand";
import { ContourField } from "@/components/atlas/ContourField";
import { PageHero } from "@/components/atlas/PageHero";
import { Reveal } from "@/components/atlas/Reveal";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { quoted } from "@/lib/content";
import { alternatesFor, defaultOgImage, siteMeta } from "@/lib/meta";
import { getWorkDetail, getWorkPaths } from "@/lib/projects";

type Params = { locale: Locale; slug: string };

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const slugs = (await getWorkPaths())
    .filter((p) => p.locale === params.locale)
    .map((p) => ({ slug: p.slug }));
  // Même garde-fou que le blog : une liste vide ferait abandonner le prérendu.
  return slugs.length ? slugs : [{ slug: "_" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/realisations/[slug]">): Promise<Metadata> {
  const { locale, slug } = (await params) as Params;
  const work = await getWorkDetail(locale, slug);
  if (!work) return {};
  const title = work.seo.title || work.title;
  const description = work.seo.description || work.summary || undefined;
  const alternates = alternatesFor(work.paths, locale);
  const image = work.image
    ? { url: work.image.src, width: work.image.width, height: work.image.height }
    : defaultOgImage;
  return {
    title,
    description,
    alternates,
    openGraph: {
      type: "article",
      title,
      description,
      url: alternates.canonical,
      siteName: siteMeta.siteName,
      images: [image],
    },
  };
}

export default async function Case({
  params,
}: PageProps<"/[locale]/realisations/[slug]">) {
  const { locale, slug } = (await params) as Params;
  setRequestLocale(locale);
  const work = await getWorkDetail(locale, slug);
  if (!work) notFound();
  const t = await getTranslations({ locale, namespace: "work.case" });
  const facts = [
    [t("client"), work.client],
    [t("year"), work.year],
    [t("role"), work.role],
  ].filter(([, v]) => v);

  return (
    <main id="main-content">
      <PageHero
        title={work.title}
        lead={work.lead}
        back={
          <Link href="/realisations" className="back-link">
            {t("back")}
          </Link>
        }
      >
        {facts.length > 0 && (
          <dl className="facts">
            {facts.map(([label, value]) => (
              <div key={String(label)}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
        {work.url && (
          <div className="actions">
            <a
              href={work.url}
              className="link link-out"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("visit")}
            </a>
          </div>
        )}
      </PageHero>

      {work.image && (
        <section className="section">
          <div className="wrap">
            <Reveal className="shot">
              <Image
                src={work.image.src}
                width={work.image.width}
                height={work.image.height}
                alt={work.image.alt}
                sizes="(max-width: 1480px) 100vw, 1400px"
                priority
              />
            </Reveal>
          </div>
        </section>
      )}

      {work.sections.map((s) => (
        <section key={s.title} className="section">
          <div className="wrap case-body">
            <h2 className="h3">{s.title}</h2>
            <div>
              <div className="prose">
                <PortableBody value={s.body} />
              </div>
              {s.link && (
                <div className="actions case-link">
                  <a
                    href={s.link.href}
                    className="link link-out"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.link.label}
                  </a>
                </div>
              )}
            </div>
          </div>
          {s.image && (
            <div className="wrap case-shot">
              <Reveal className="shot">
                <Image
                  src={s.image.src}
                  width={s.image.width}
                  height={s.image.height}
                  alt={s.image.alt}
                  sizes="(max-width: 1480px) 100vw, 1400px"
                />
              </Reveal>
            </div>
          )}
        </section>
      ))}

      {work.metrics.length > 0 && (
        <section className="section">
          <div className="wrap">
            <dl className="metrics">
              {work.metrics.map((m) => (
                <div key={m.label}>
                  <dt>{m.value}</dt>
                  <dd>
                    {m.label}
                    {m.note && <small> ({m.note})</small>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {work.quote && (
        <section className="band section">
          <ContourField className="band-field" levels={10} />
          <div className="wrap">
            <blockquote className="big-quote">{quoted(work.quote.text, locale)}</blockquote>
            <p>
              {work.quote.author}
              {work.quote.url && (
                <>
                  {" · "}
                  <a
                    href={work.quote.url}
                    className="link link-out"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("source")}
                  </a>
                </>
              )}
            </p>
          </div>
        </section>
      )}

      <ContactBand />
    </main>
  );
}
