import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeScript } from "@/components/theme/ThemeScript";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr">
			<head>
				<ThemeScript />
			</head>
			<body className="font-sans min-h-screen flex flex-col" data-theme="light">
				<Toaster />
				{children}
			</body>
		</html>
	);
}
