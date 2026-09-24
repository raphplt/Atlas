/**
 * Importe les articles statiques de content/journal.ts dans Sanity (articles FR).
 *
 * Usage :
 *   npm run sanity:seed            # écrit dans le dataset
 *   npm run sanity:seed -- --dry   # affiche les documents sans rien écrire
 *
 * Variables requises (.env.local) : NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET et SANITY_API_WRITE_TOKEN (jeton « Editor »).
 *
 * Idempotent : identifiants déterministes + createOrReplace.
 */
import { createClient } from "@sanity/client";
import { posts } from "../content/journal";
import { sectionsToPortableText } from "../lib/portable-text";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../sanity/env";

const dryRun = process.argv.includes("--dry");
const token = process.env.SANITY_API_WRITE_TOKEN;

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function main() {
  if (!dryRun && (!isSanityConfigured || !token)) {
    console.error(
      "NEXT_PUBLIC_SANITY_PROJECT_ID et SANITY_API_WRITE_TOKEN sont requis (ou utilisez --dry).",
    );
    process.exit(1);
  }

  const author = {
    _id: "author-raphael-plassart",
    _type: "author",
    name: "Raphaël Plassart",
    slug: { _type: "slug", current: "raphael-plassart" },
    role: "Designer & développeur freelance",
  };

  const categories = [...new Set(posts.map((p) => p.category))].map(
    (title) => ({
      _id: `category-${slugify(title)}`,
      _type: "category",
      title,
      slug: { _type: "slug", current: slugify(title) },
    }),
  );

  // Les articles statiques n'ont pas de date : on les date du jour de l'import
  // (à ajuster ensuite dans le Studio), en conservant leur ordre d'origine.
  const now = Date.now();
  const postDocs = posts.map((p, i) => ({
    _id: `post-fr-${p.slug}`,
    _type: "post",
    language: "fr",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    excerpt: p.description,
    readingTime: p.readingTime,
    publishedAt: new Date(now - i * 60_000).toISOString(),
    category: { _type: "reference", _ref: `category-${slugify(p.category)}` },
    author: { _type: "reference", _ref: author._id },
    body: sectionsToPortableText(p.sections),
  }));

  const docs: { _id: string; _type: string; [key: string]: unknown }[] = [
    author,
    ...categories,
    ...postDocs,
  ];

  if (dryRun) {
    console.log(JSON.stringify(docs, null, 2));
    return;
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc);
  const result = await tx.commit();
  console.log(
    `✓ ${docs.length} documents importés dans ${projectId}/${dataset} (transaction ${result.transactionId}).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
