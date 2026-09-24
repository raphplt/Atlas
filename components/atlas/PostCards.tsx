import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { PostCard } from "@/lib/sanity/queries";
import { Reveal } from "./Reveal";

export async function PostCards({
  posts,
  locale,
  headingLevel = "h3",
}: {
  posts: PostCard[];
  locale: Locale;
  headingLevel?: "h2" | "h3";
}) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const Heading = headingLevel;
  if (!posts.length) return <p className="empty">{t("empty")}</p>;
  return (
    <div className="posts">
      {posts.map((p) => (
        <Reveal key={p._id}>
          <Link href={`/blog/${p.slug}`} className="post-card">
            <p className="post-card-meta">
              {[p.category, p.readingTime && t("readingTime", { minutes: p.readingTime })]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <Heading className="h3">{p.title}</Heading>
            {p.excerpt && <p className="body">{p.excerpt}</p>}
            <span className="link link-arrow">{t("read")}</span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
