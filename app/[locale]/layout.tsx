import "../globals.css";
import "../studio.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, Playfair_Display } from "next/font/google";
import { Footer, Header } from "@/components/studio/Shell";
import { locales, routing } from "@/i18n/routing";
import { defaultOgImage, siteMeta } from "@/lib/meta";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  const others = await Promise.all(
    locales
      .filter((l) => l !== locale)
      .map(async (l) =>
        (await getTranslations({ locale: l, namespace: "meta" }))("ogLocale"),
      ),
  );
  return {
    metadataBase: new URL(siteMeta.url),
    title: { default: t("defaultTitle"), template: "%s | Atlas" },
    description: t("description"),
    openGraph: {
      type: "website",
      locale: t("ogLocale"),
      alternateLocale: others,
      siteName: siteMeta.siteName,
      images: [defaultOgImage],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "shell" });
  return (
    <html lang={locale} className={`${inter.variable} ${serif.variable}`}>
      <body className="atlas-body">
        <NextIntlClientProvider>
          <a className="skip-link" href="#main-content">
            {t("skipLink")}
          </a>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
