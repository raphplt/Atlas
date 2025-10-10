"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { trackCtaClick } from "@/lib/analytics";

export function StickyCTA() {
	const [isVisible, setIsVisible] = useState(false);
	const [isDismissed, setIsDismissed] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [isFormVisible, setIsFormVisible] = useState(false);
	const t = useTranslations("stickyCta");

	const pathname = usePathname();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;

			// Check if form is in viewport
			const formElement = document.getElementById("contact");
			const formVisible = formElement
				? formElement.getBoundingClientRect().top < window.innerHeight
				: false;

			setIsFormVisible(formVisible);

			// Show CTA after scrolling 400px, but hide if form is visible
			const shouldShow = scrollPosition > 400 && !isDismissed && !formVisible;
			setIsVisible(shouldShow);
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isDismissed]);

	const handleClick = () => {
		trackCtaClick("sticky");
		setIsDismissed(true);
	};

	// Ne pas afficher si pas monté, pas sur la page d'accueil, ou pas visible
	if (!isMounted || pathname !== "/" || !isVisible) return null;

	return (
		<div
			className="fixed bottom-4 left-4 right-4 z-50 lg:hidden animate-in slide-in-from-bottom-full duration-300"
			role="complementary"
			aria-label="Call to action"
		>
			<div className="relative mx-auto max-w-md">
				<button
					onClick={() => setIsDismissed(true)}
					className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center shadow-lg hover:bg-[var(--color-bg-alt)] transition z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
					aria-label="Fermer la bannière"
				>
					<X className="w-3 h-3" />
				</button>
				<a
					href="#contact"
					onClick={handleClick}
					className="w-full h-14 text-base font-bold rounded-xl bg-[#2563EB] text-white shadow-[0_8px_24px_rgba(37,99,235,0.5)] hover:bg-[#1d4ed8] hover:shadow-[0_12px_32px_rgba(37,99,235,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 animate-pulse-subtle border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
					aria-live="polite"
				>
					<Search className="w-5 h-5" aria-hidden="true" />
					<span>{t("cta")}</span>
				</a>
			</div>
		</div>
	);
}
