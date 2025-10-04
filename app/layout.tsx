import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { Navbar } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { NextIntlClientProvider } from "next-intl";
import { GlassFilter } from "@/components/ui/liquid-glass";
import Head from "@/components/Head";
import { ConsentBanner } from "@/components/ConsentBanner";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr">
			<Head />
			<body className="font-sans min-h-screen flex flex-col" data-theme="light">
				<GlassFilter />
				<NextIntlClientProvider>
					<Toaster />
					<Navbar />
					{children}
					<Footer />
					<StickyCTA />
					<ConsentBanner />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
