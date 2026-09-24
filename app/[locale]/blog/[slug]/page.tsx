import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { PageHero } from "@/components/atlas/PageHero";
import { PortableBody, SanityFigure } from "@/components/blog/PortableBody";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPost, getPostPaths, postAlternatePaths } from "@/lib/blog";
import {
  absoluteUrl,
  alternatesFor,
  defaultOgImage,
  localizedPath,
  siteMeta,
} from "@/lib/meta";
import { hasAsset, urlForImage } from "@/lib/sanity/image";
import type { Post } from "@/lib/sanity/queries";
import { jsonLd } from "@/lib/schema";

type Params = { locale: Locale; slug: string };

const EMPTY_SLUG = "_";

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const slugs = (await getPostPaths())
    .filter((p) => p.language === params.locale)
    .map((p) => ({ slug: p.slug }));
  // Next 16 abandonne le prérendu de TOUTE la route si une langue renvoie une
  // liste vide (paramètres incomplets). On renvoie alors un slug factice, qui
  // produit simplement une 404 statique.
  return slugs.length ? slugs : [{ slug: EMPTY_SLUG }];
}

function ogImageUrl(post: Post): string | undefined {
  const image = hasAsset(post.seo?.ogImage) ? post.seo?.ogImage : post.cover;
  return hasAsset(image)
    ? urlForImage(image).width(1200).height(630).fit("crop").url()
    : undefined;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = (await params) as Params;
  const post = await getPost(locale, slug);
  if (!post) return {};
  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt || undefined;
  const alternates = alternatesFor(postAlternatePaths(post), locale);
  const image = ogImageUrl(post);
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
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? post.publishedAt ?? undefined,
      authors: post.author ? [post.author.name] : undefined,
      images: [image ? { url: image, width: 1200, height: 630 } : defaultOgImage],
    },
  };
}

export default async function Article({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = (await params) as Params;
  setRequestLocale(locale);
  const post = await getPost(locale, slug);
  if (!post) notFound();
  const [t, tShell, format] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getTranslations({ locale, namespace: "shell" }),
    getFormatter({ locale }),
  ]);
  const url = absoluteUrl(localizedPath(`/blog/${post.slug}`, locale));
  const date = (iso: string) =>
    format.dateTime(new Date(iso), { dateStyle: "long" });
  const image = ogImageUrl(post);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    inLanguage: locale,
    url,
    mainEntityOfPage: url,
    image: image ?? absoluteUrl(siteMeta.ogImage),
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt ?? post.publishedAt ?? undefined,
    author: {
      "@type": "Person",
      name: post.author?.name ?? siteMeta.author,
      url: post.author?.url ?? absoluteUrl(localizedPath("/about", locale)),
    },
    publisher: {
      "@type": "Organization",
      name: siteMeta.siteName,
      url: siteMeta.url,
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumbHome"),
        item: absoluteUrl(localizedPath("/", locale)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tShell("nav.journal"),
        item: absoluteUrl(localizedPath("/blog", locale)),
      },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const meta = [
    t("by", { author: post.author?.name ?? siteMeta.author }),
    post.publishedAt && (
      <time key="published" dateTime={post.publishedAt}>
        {t("publishedOn", { date: date(post.publishedAt) })}
      </time>
    ),
    post.updatedAt && (
      <time key="updated" dateTime={post.updatedAt}>
        {t("updatedOn", { date: date(post.updatedAt) })}
      </time>
    ),
    post.readingTime && t("readingTimeLong", { minutes: post.readingTime }),
  ].filter(Boolean);

  return (
    <main id="main-content">
      <PageHero
        title={post.title}
        lead={post.excerpt}
        back={
          <Link href="/blog" className="back-link">
            {t("backToList")}
          </Link>
        }
      >
        <p className="article-meta">
          {post.category && <span>{post.category}</span>}
          {meta.map((part, i) => (
            <span key={i}>{part}</span>
          ))}
        </p>
      </PageHero>
      <section className="section">
        <div className="wrap">
          <article className="prose">
            <SanityFigure image={post.cover} priority />
            <PortableBody value={post.body} />
          </article>
          <div className="article-end">
            <h2 className="h3">{t("ctaTitle")}</h2>
            <p className="body">{t("ctaText")}</p>
            <div className="actions">
              <Link className="btn" href="/contact">
                {t("cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(articleLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd)}
      />
    </main>
  );
}
