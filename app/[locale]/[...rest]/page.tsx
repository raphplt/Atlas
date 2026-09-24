import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

// Toute URL inconnue sous une langue affiche la 404 localisée (app/[locale]/not-found.tsx).
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[...rest]">) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "meta" });
  return { title: t("pages.notFound.title") };
}

export default function CatchAll() {
  notFound();
}
