import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Label } from "@/components/studio/Shell";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPosts } from "@/lib/blog";
import { absoluteUrl, localizedPath, pageMetadata } from "@/lib/meta";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const meta = await pageMetadata({ locale, path: "/blog", page: "blog" });
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      types: {
        "application/rss+xml": [
          {
            url: absoluteUrl(localizedPath("/blog/rss.xml", locale)),
            title: t("rssTitle"),
          },
        ],
      },
    },
  };
}

export default async function Blog({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = await getPosts(locale);
  return (
    <main id="main-content" className="section-wrap">
      <Label>{t("eyebrow")}</Label>
      <div className="section-heading">
        <h1 style={{ fontSize: "clamp(44px,6vw,80px)" }}>
          {t("titleLine1")}
          <br />
          <em>{t("titleLine2")}</em>
        </h1>
        <p>
          {t("introLine1")}
          <br />
          {t("introLine2")}
        </p>
      </div>
      {posts.length === 0 ? (
        <p>{t("empty")}</p>
      ) : (
        <div className="journal-grid">
          {posts.map((p, i) => (
            <Link className="journal-card" href={`/blog/${p.slug}`} key={p._id}>
              <div
                className={`journal-art journal-art-${i % 3}`}
                aria-hidden="true"
              >
                <span>{["Aa", "↗", "</>"][i % 3]}</span>
                <small>ATLAS — NOTE {String(i + 1).padStart(2, "0")}</small>
              </div>
              <p className="eyebrow">
                {[
                  p.category,
                  p.readingTime && t("readingTime", { minutes: p.readingTime }),
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <h2 style={{ fontSize: 26 }}>{p.title} ↗</h2>
              {p.excerpt && (
                <p
                  style={{ fontSize: 13, lineHeight: 1.8, color: "var(--muted)" }}
                >
                  {p.excerpt}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
