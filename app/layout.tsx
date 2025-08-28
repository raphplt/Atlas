import "./globals.css";
import { ThemeScript } from "@/components/theme/ThemeScript";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr" suppressHydrationWarning>
			<head>
				<ThemeScript />
			</head>
			<body className="font-sans min-h-screen flex flex-col" data-theme="light">
				{children}
			</body>
		</html>
	);
}
