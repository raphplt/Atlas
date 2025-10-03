import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Check, Zap, Crown } from "lucide-react";
import { useTranslations } from "next-intl";

export function Offers() {
	const t = useTranslations("offers");

	// Utiliser les offres traduites avec des icônes
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
		<section className="relative py-32" id="offres">
			<div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-accent)]/8 via-transparent to-transparent" />
			<div className="container">
				<h2 className="h2 text-center mb-6 motion-fade-in motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("title")}
				</h2>
				<p className="text-center text-base text-[var(--color-muted)] mb-4 max-w-2xl mx-auto motion-slide-up motion-delay-100 motion-duration-1000 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("subtitle")}
				</p>
				<div className="text-center mb-12 motion-scale-in motion-delay-200 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-sm font-medium text-[var(--color-accent)] motion-wiggle motion-delay-300">
						<Zap className="w-4 h-4" />
						{t("limitedOffer")}
					</span>
				</div>
				<div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
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
									<div className="absolute top-4 right-4 text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] text-white shadow-lg motion-wiggle motion-delay-600">
										{offer.badge}
									</div>
								)}
								<div className="p-8">
									<div className="flex items-center gap-3 mb-4 motion-scale-in motion-delay-700">
										<div className="icon-circle motion-wiggle motion-delay-800">
											<Icon className="size-5" />
										</div>
										<h3 className="text-2xl font-bold tracking-tight motion-slide-up motion-delay-900">
											{offer.name}
										</h3>
									</div>
									<p className="text-sm text-[var(--color-muted)] mb-6 leading-relaxed motion-fade-in motion-delay-1000">
										{offer.description}
									</p>
									<div className="mb-6 motion-slide-up motion-delay-1100">
										{offer.originalPrice && (
											<p className="text-sm text-[var(--color-muted)] line-through mb-1 motion-scale-in motion-delay-1200">
												{offer.originalPrice}
											</p>
										)}
										<div className="flex items-baseline gap-2">
											<p className="text-4xl font-bold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] bg-clip-text text-transparent motion-wiggle motion-delay-1300">
												{offer.price}
											</p>
											<span className="text-sm text-[var(--color-muted)] motion-fade-in motion-delay-1400">
												{t("perProject")}
											</span>
										</div>
									</div>
									<ul className="flex-1 mb-8 space-y-3 text-sm motion-fade-in motion-delay-1500">
										{Array.from(
											{ length: offer.packageKey === "premium" ? 6 : 5 },
											(_, idx) => (
												<li
													key={idx}
													className="flex gap-3 items-start motion-slide-up motion-delay-1600"
												>
													<Check className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5 motion-scale-in motion-delay-1700" />
													<span className="text-[var(--color-fg-soft)] leading-relaxed">
														{t(`packages.${offer.packageKey}.features.${idx}`)}
													</span>
												</li>
											)
										)}
									</ul>
									<a
										href="#contact"
										className={buttonVariants({
											className: `w-full font-semibold h-12 motion-scale-in motion-delay-1800 ${
												isPopular ? "shadow-lg hover:shadow-xl" : ""
											}`,
											variant: isPopular ? "default" : "ghost",
										})}
									>
										{t("cta")}
									</a>
								</div>
							</Card>
						);
					})}
				</div>
				<p className="text-center mt-12 text-sm text-[var(--color-muted)] motion-fade-in motion-delay-1900 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("guarantee")}
				</p>
			</div>
		</section>
	);
}
