import { Card } from "@/components/ui/card";
import { Shield, Clock, RefreshCw, Headphones } from "lucide-react";
import { useTranslations } from "next-intl";

export function Guarantee() {
	const t = useTranslations("guarantee");

	const guarantees = [
		{
			icon: Shield,
			title: t("items.moneyBack.title"),
			description: t("items.moneyBack.description"),
		},
		{
			icon: Clock,
			title: t("items.delivery.title"),
			description: t("items.delivery.description"),
		},
		{
			icon: RefreshCw,
			title: t("items.revisions.title"),
			description: t("items.revisions.description"),
		},
		{
			icon: Headphones,
			title: t("items.support.title"),
			description: t("items.support.description"),
		},
	];

	return (
		<section className="relative py-16 sm:py-20 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/5 to-transparent" />
			<div className="container relative">
				<div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 motion-fade-in motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
						{t("title")}
					</h2>
					<p className="text-base sm:text-lg text-[var(--color-muted)] motion-slide-up motion-delay-100 motion-duration-1000 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
						{t("subtitle")}
					</p>
				</div>
				<div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
					{guarantees.map((item, index) => {
						const Icon = item.icon;
						return (
							<Card
								key={item.title}
								className="p-4 sm:p-6 text-center hover:scale-105 transition-transform duration-300 motion-fade-in motion-delay-200 motion-intersect-start motion-intersect-end motion-intersect-threshold-50"
							>
								<div className="icon-circle mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-alt)]/20 motion-scale-in motion-delay-300">
									<Icon className="size-4 sm:size-5 motion-wiggle motion-delay-400" />
								</div>
								<h3 className="font-semibold mb-2 text-sm sm:text-base text-[var(--color-fg)] motion-slide-up motion-delay-500">
									{item.title}
								</h3>
								<p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed motion-fade-in motion-delay-600">
									{item.description}
								</p>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
