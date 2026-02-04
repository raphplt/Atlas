import { Toaster } from "react-hot-toast";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { ConsentBanner } from "@/components/ConsentBanner";
import { ConditionalLayoutWrapper } from "@/components/ConditionalLayoutWrapper";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import Script from "next/script";
import { ThemeScript } from "@/components/theme/ThemeScript";
import TawkMessenger from "@/components/TawkMessenger";

export const metadata: Metadata = {
	title: {
		template: "%s | Atlas",
		default: "Atlas - Sites web pour artisans et services locaux",
	},
	description:
		"Sites web optimisés pour artisans et services locaux. Plus de visibilité, plus de devis. Créé par Raphaël Plassart.",
	openGraph: {
		type: "website",
		locale: "fr_FR",
		url: "https://atlas.raphael-plassart.com",
		title: "Atlas - Sites web pour artisans",
		description: "Transformez votre site en machine à générer des clients.",
		siteName: "Atlas",
	},
};

import { Inter, Inter_Tight } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr" className={`${inter.variable} ${interTight.variable}`}>
			<body className="font-sans min-h-screen flex flex-col bg-white text-slate-900" data-theme="light">
				<ThemeScript />
				
				{/* Google Consent Mode V2 */}
				<Script id="consent-mode" strategy="beforeInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('consent', 'default', {
							'analytics_storage': 'denied',
							'ad_user_data': 'denied',
							'ad_personalization': 'denied',
							'wait_for_update': 500
						});
					`}
				</Script>

				{/* Google Analytics 4 */}
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=G-BEJ9SX02CT"
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-BEJ9SX02CT', {
							'anonymize_ip': true,
							'allow_google_signals': false,
							'allow_ad_personalization_signals': false
						});
					`}
				</Script>


				<NextIntlClientProvider>
					<Toaster />
					<ConditionalLayoutWrapper>{children}</ConditionalLayoutWrapper>
					<ConsentBanner />
					<TawkMessenger />
				</NextIntlClientProvider>
				<Analytics />
			</body>
		</html>
	);
}
