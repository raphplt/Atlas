"use client";

import { Card } from "@/components/ui/card";
import { Check, Zap, Crown } from "lucide-react";
import { useTranslations } from "next-intl";
import { trackCtaClick } from "@/lib/analytics";

export function Offers() {
	const t = useTranslations("offers");

	const translatedOffers = [
		{
			name: t("packages.essential.name"),
			price: t("packages.essential.price"),
			originalPrice: t("packages.essential.originalPrice"),
			packageKey: "essential",
			icon: Check,
			description: t("packages.essential.description"),
			badge: null,
		},
		{
			name: t("packages.standard.name"),
			price: t("packages.standard.price"),
			originalPrice: t("packages.standard.originalPrice"),
			packageKey: "standard",
			icon: Zap,
			description: t("packages.standard.description"),
			badge: t("popular"),
		},
		{
			name: t("packages.premium.name"),
			price: t("packages.premium.price"),
			originalPrice: t("packages.premium.originalPrice"),
			packageKey: "premium",
			icon: Crown,
			description: t("packages.premium.description"),
			badge: t("bestValue"),
		},
	];

	return (
		<section className="relative py-20 sm:py-32" id="offres">
			<div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-accent)]/8 via-transparent to-transparent" />
			<div className="container">
				<h2 className="h2 text-center mb-4 sm:mb-6 motion-fade-in motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("title")}
				</h2>
				<p className="text-center text-sm sm:text-base text-[var(--color-muted)] mb-4 max-w-2xl mx-auto motion-slide-up motion-delay-100 motion-duration-1000 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("subtitle")}
				</p>
				<div className="text-center mb-8 sm:mb-12 motion-scale-in motion-delay-200 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					<span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-xs sm:text-sm font-medium text-[var(--color-accent)] motion-wiggle motion-delay-300">
						<Zap className="w-3 h-3 sm:w-4 sm:h-4" />
						{t("limitedOffer")}
					</span>
				</div>
				<div className="grid gap-6 sm:gap-8 md:grid-cols-3 max-w-6xl mx-auto">
					{translatedOffers.map((offer, i) => {
						const Icon = offer.icon;
						const isPopular = i === 1;
						return (
							<Card
								key={offer.name}
								className={`flex flex-col relative overflow-hidden transition-all duration-300 motion-fade-in motion-delay-400 motion-intersect-start motion-intersect-end motion-intersect-threshold-50 ${
									isPopular
										? "ring-2 ring-[var(--color-accent)] scale-105 shadow-2xl motion-scale-in motion-delay-500"
										: "hover:scale-105 motion-slide-up motion-delay-500"
								}`}
							>
								{offer.badge && (
									<div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] text-white shadow-lg motion-wiggle motion-delay-600">
										{offer.badge}
									</div>
								)}
								<div className="p-4 sm:p-8">
									<div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 motion-scale-in motion-delay-700">
										<div className="icon-circle motion-wiggle motion-delay-800">
											<Icon className="size-4 sm:size-5" />
										</div>
										<h3 className="text-lg sm:text-2xl font-bold tracking-tight motion-slide-up motion-delay-900">
											{offer.name}
										</h3>
									</div>
									<p className="text-xs sm:text-sm text-[var(--color-muted)] mb-4 sm:mb-6 leading-relaxed motion-fade-in motion-delay-1000">
										{offer.description}
									</p>
									<div className="mb-4 sm:mb-6 motion-slide-up motion-delay-1100">
										{offer.originalPrice && (
											<p className="text-xs sm:text-sm text-[var(--color-muted)] line-through mb-1 motion-scale-in motion-delay-1200">
												{offer.originalPrice}
											</p>
										)}
										<div className="flex items-baseline gap-1 sm:gap-2">
											<p className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] bg-clip-text text-transparent motion-wiggle motion-delay-1300">
												{offer.price}
											</p>
											<span className="text-xs sm:text-sm text-[var(--color-muted)] motion-fade-in motion-delay-1400">
												{t("perProject")}
											</span>
										</div>
									</div>
									<ul className="flex-1 mb-6 sm:mb-8 space-y-2 sm:space-y-3 text-xs sm:text-sm motion-fade-in motion-delay-1500">
										{Array.from(
											{ length: offer.packageKey === "premium" ? 6 : 5 },
											(_, idx) => (
												<li
													key={idx}
													className="flex gap-2 sm:gap-3 items-start motion-slide-up motion-delay-1600"
												>
													<Check className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5 motion-scale-in motion-delay-1700" />
													<span className="text-[var(--color-fg-soft)] leading-relaxed">
														{t(`packages.${offer.packageKey}.features.${idx}`)}
													</span>
												</li>
											)
										)}
									</ul>
									<a
										href="#contact"
										onClick={() => trackCtaClick("offers", offer.packageKey)}
										className={`w-full h-10 sm:h-12 text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center transition-all duration-300 motion-scale-in motion-delay-1800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 ${
											isPopular
												? "bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
												: "border-2 border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-card)] hover:scale-[1.02] active:scale-[0.98]"
										}`}
									>
										{t("cta")}
									</a>
								</div>
							</Card>
						);
					})}
				</div>
				<p className="text-center mt-8 sm:mt-12 text-xs sm:text-sm text-[var(--color-muted)] motion-fade-in motion-delay-1900 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("guarantee")}
				</p>
			</div>
		</section>
	);
}
