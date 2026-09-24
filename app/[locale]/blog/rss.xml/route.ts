import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { locales, routing } from "@/i18n/routing";
import { getPosts } from "@/lib/blog";
import { absoluteUrl, localizedPath, siteMeta } from "@/lib/meta";

// Flux RSS du journal, un par langue : /blog/rss.xml, /en/blog/rss.xml, /it/blog/rss.xml.
export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET(
  _req: Request,
  { params }: RouteContext<"/[locale]/blog/rss.xml">,
) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale))
    return new Response("Not found", { status: 404 });
  const [t, tMeta, posts] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getTranslations({ locale, namespace: "meta" }),
    getPosts(locale, 50),
  ]);
  const blogUrl = absoluteUrl(localizedPath("/blog", locale));
  const feedUrl = absoluteUrl(localizedPath("/blog/rss.xml", locale));
  const lastDate = posts.find((p) => p.updatedAt || p.publishedAt);

  const items = posts
    .map((p) => {
      const url = absoluteUrl(localizedPath(`/blog/${p.slug}`, locale));
      return [
        "<item>",
        `<title>${escape(p.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        p.excerpt ? `<description>${escape(p.excerpt)}</description>` : "",
        p.publishedAt
          ? `<pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>`
          : "",
        p.category ? `<category>${escape(p.category)}</category>` : "",
        "</item>",
      ].join("");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${escape(t("rssTitle"))}</title>
<link>${blogUrl}</link>
<description>${escape(tMeta("pages.blog.description"))}</description>
<language>${locale}</language>
<copyright>${escape(`© ${siteMeta.author}`)}</copyright>
${lastDate ? `<lastBuildDate>${new Date((lastDate.updatedAt || lastDate.publishedAt)!).toUTCString()}</lastBuildDate>` : ""}
<atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
