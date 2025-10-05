import { Toaster } from "react-hot-toast";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { GlassFilter } from "@/components/ui/liquid-glass";
import Head from "@/components/Head";
import { ConsentBanner } from "@/components/ConsentBanner";
import { ConditionalLayoutWrapper } from "@/components/ConditionalLayoutWrapper";

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
					<ConditionalLayoutWrapper>{children}</ConditionalLayoutWrapper>
					<ConsentBanner />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
