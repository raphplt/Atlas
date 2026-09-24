import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { tags } from "@/lib/sanity/queries";

type WebhookPayload = { _type?: string; slug?: string; language?: string };

// Les articles embarquent le nom de la catégorie et de l'auteur :
// modifier l'un d'eux doit aussi invalider les articles.
const dependentTags: Record<string, string[]> = {
  category: [tags.post],
  author: [tags.post],
  testimonial: [tags.testimonial, tags.project],
};

/**
 * Webhook Sanity → revalidation à la demande.
 * Projection conseillée côté Sanity : {_type, "slug": slug.current, language}
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret)
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET manquant" },
      { status: 500 },
    );
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
      true, // attend la cohérence du Content Lake avant de revalider
    );
    if (!isValidSignature)
      return NextResponse.json({ message: "Signature invalide" }, { status: 401 });
    if (!body?._type)
      return NextResponse.json({ message: "Charge utile invalide" }, { status: 400 });

    const revalidated = [body._type, ...(dependentTags[body._type] ?? [])];
    // Webhook externe : expiration immédiate plutôt que stale-while-revalidate.
    for (const tag of revalidated) revalidateTag(tag, { expire: 0 });
    return NextResponse.json({ revalidated, now: Date.now() });
  } catch (error) {
    console.error("[revalidate]", error);
    return NextResponse.json({ message: "Erreur de revalidation" }, { status: 500 });
  }
}
