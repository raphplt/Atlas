"use client";

import { Check, Zap, Crown } from "lucide-react";
import { useTranslations } from "next-intl";
import { trackCtaClick } from "@/lib/analytics";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

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
		<section className="py-24 bg-[var(--color-background)]" id="offres">
			<div className="container-width">
				<div className="text-center mb-16 max-w-3xl mx-auto">
                    <MotionWrapper variant="fade-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6">
                            {t("title")}
                        </h2>
                    </MotionWrapper>
                    <MotionWrapper variant="fade-up" delay={0.1}>
                        <p className="text-lg text-[var(--color-muted)]">
                            {t("subtitle")}
                        </p>
                    </MotionWrapper>
				</div>
				
				<div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
					{translatedOffers.map((offer, i) => {
						const isPopular = i === 1;
						return (
                            <MotionWrapper 
                                key={offer.name} 
                                variant="fade-up" 
                                delay={0.1 * i}
                                className="h-full"
                            >
                                <div
                                    className={`flex flex-col relative p-8 rounded-xl border h-full ${
                                        isPopular 
                                            ? "border-[var(--color-primary)] shadow-md bg-[var(--color-primary)]/5" 
                                            : "border-[var(--color-border)] bg-[var(--color-card)]"
                                    }`}
                                >
                                    {isPopular && (
                                        <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                            {t("popular")}
                                        </div>
                                    )}
    
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2">
                                            {offer.name}
                                        </h3>
                                        <p className="text-sm text-[var(--color-muted)] min-h-[40px]">
                                            {offer.description}
                                        </p>
                                    </div>
                                    
                                    <div className="mb-8">
                                        <div className="text-3xl font-bold text-[var(--color-foreground)]">
                                            {offer.price}
                                        </div>
                                        <div className="text-sm text-[var(--color-muted)]">
                                            {t("perProject")}
                                        </div>
                                    </div>
                                    
                                    <ul className="space-y-4 mb-8 flex-1">
                                        {Array.from(
                                            { length: offer.packageKey === "premium" ? 6 : 5 },
                                            (_, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-[var(--color-foreground)]">
                                                    <Check className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" />
                                                    <span>{t(`packages.${offer.packageKey}.features.${idx}`)}</span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    
                                    <a
                                        href="#contact"
                                        onClick={() => trackCtaClick("offers", offer.packageKey)}
                                        className={cn(buttonVariants({ variant: isPopular ? "default" : "secondary" }), "w-full")}
                                    >
                                        {t("cta")}
                                    </a>
                                </div>
                            </MotionWrapper>
						);
					})}
				</div>
                
				<p className="text-center mt-12 text-sm text-[var(--color-muted)]">
					{t("guarantee")}
				</p>
			</div>
		</section>
	);
}
