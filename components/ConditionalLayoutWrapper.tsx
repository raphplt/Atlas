"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Navbar } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { FloatingContact } from "@/components/FloatingContact";
import { Analytics } from "@vercel/analytics/next";

interface ConditionalLayoutWrapperProps {
	children: ReactNode;
}

export function ConditionalLayoutWrapper({
	children,
}: ConditionalLayoutWrapperProps) {
	const pathname = usePathname();

	if (pathname === "/links") {
		return (
			<>
				{children}
				<Analytics />
			</>
		);
	}

	return (
		<>
			<Navbar />
			{children}
			<Analytics />
			<Footer />
			<StickyCTA />
			<FloatingContact />
		</>
	);
}
