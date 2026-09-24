import "@/styles/tokens.css";
import "@/styles/base.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import { Footer } from "@/components/atlas/Footer";
import { Header } from "@/components/atlas/Header";
import { locales, routing } from "@/i18n/routing";
import { defaultOgImage, siteMeta } from "@/lib/meta";

const display = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel-display",
  display: "swap",
});
const text = Funnel_Sans({
  subsets: ["latin"],
  variable: "--font-funnel-sans",
  display: "swap",
});

export const viewport: Viewport = { themeColor: "#1f3bd9" };

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
    manifest: "/manifest.webmanifest",
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
    <html lang={locale} suppressHydrationWarning className={`${display.variable} ${text.variable}`}>
      <head>
        <script
          // Active les apparitions au défilement uniquement quand JS tourne.
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>
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
