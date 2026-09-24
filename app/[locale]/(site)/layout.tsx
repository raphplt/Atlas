import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { businessSchema, jsonLd } from "@/lib/schema";
export default async function SiteLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "meta",
  });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(businessSchema(t("description")))}
      />
      {children}
    </>
  );
}
