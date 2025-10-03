"use client";

import { useState, useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";

export function StickyCTA() {
	const [isVisible, setIsVisible] = useState(false);
	const [isDismissed, setIsDismissed] = useState(false);
	const t = useTranslations("stickyCta");

	useEffect(() => {
		const handleScroll = () => {
			// Afficher après 400px de scroll
			const scrollPosition = window.scrollY;
			const shouldShow = scrollPosition > 400 && !isDismissed;
			setIsVisible(shouldShow);
		};

		// Vérifier immédiatement au chargement
		handleScroll();

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isDismissed]);

	if (!isVisible) return null;

	return (
		<div className="fixed bottom-4 left-4 right-4 z-50 lg:hidden animate-in slide-in-from-bottom-full duration-300">
			<div className="relative mx-auto max-w-md">
				<button
					onClick={() => setIsDismissed(true)}
					className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center shadow-lg hover:bg-[var(--color-bg-alt)] transition"
					aria-label="Fermer"
				>
					<X className="w-3 h-3" />
				</button>
				<a
					href="#contact"
					onClick={() => setIsDismissed(true)}
					className={buttonVariants({
						className:
							"w-full btn-base h-14 text-base font-semibold shadow-2xl flex items-center justify-center gap-2 animate-pulse-subtle",
					})}
				>
					<Phone className="w-5 h-5" />
					{t("cta")}
				</a>
			</div>
		</div>
	);
}
