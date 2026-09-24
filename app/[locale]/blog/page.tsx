import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/atlas/PageHero";
import { PostCards } from "@/components/atlas/PostCards";
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
    <main id="main-content">
      <PageHero title={t("title")} lead={t("lead")} />
      <section className="section">
        <div className="wrap">
          <PostCards posts={posts} locale={locale} headingLevel="h2" />
        </div>
      </section>
    </main>
  );
}
