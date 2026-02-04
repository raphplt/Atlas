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
		<section className="py-24 bg-[var(--color-background-alt)] border-y border-[var(--color-border)]">
			<div className="container-width">
				<div className="text-center mb-16 max-w-3xl mx-auto">
					<h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--color-primary)]">
						{t("title")}
					</h2>
					<p className="text-lg text-[var(--color-muted)]">
						{t("subtitle")}
					</p>
				</div>
                
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
					{guarantees.map((item, index) => {
						const Icon = item.icon;
						return (
							<div
								key={item.title}
								className="p-6 text-center bg-[var(--color-card)] rounded-lg border border-[var(--color-border)] shadow-sm"
							>
								<div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-primary)]/5 flex items-center justify-center text-[var(--color-primary)]">
									<Icon className="size-6" />
								</div>
								<h3 className="font-bold mb-2 text-[var(--color-primary)]">
									{item.title}
								</h3>
								<p className="text-sm text-[var(--color-muted)] leading-relaxed">
									{item.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
