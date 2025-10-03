import { Card } from "@/components/ui/card";
import { FileWarning, MapPinOff, PhoneOff } from "lucide-react";
import { useTranslations } from "next-intl";

export function Problems() {
	const t = useTranslations("problems");

	const items = [
		{
			title: t("items.mobile.title"),
			body: t("items.mobile.description"),
			icon: PhoneOff,
		},
		{
			title: t("items.quotes.title"),
			body: t("items.quotes.description"),
			icon: FileWarning,
		},
		{
			title: t("items.local.title"),
			body: t("items.local.description"),
			icon: MapPinOff,
		},
	];

	return (
		<section className="relative py-32" id="problems">
			<div
				className="absolute inset-0 pattern-grid opacity-40"
				aria-hidden="true"
			/>
			<div className="container relative">
				<h2 className="h2 text-center mb-6 motion-fade-in motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("title")}
				</h2>
				<p className="text-center text-[var(--color-muted)] mb-14 max-w-2xl mx-auto motion-slide-up motion-delay-100 motion-duration-1000 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("subtitle")}
				</p>
				<div className="grid gap-8 md:grid-cols-3">
					{items.map((it, index) => (
						<Card
							key={it.title}
							className="p-8 card-glow motion-fade-in motion-delay-200 motion-intersect-start motion-intersect-end motion-intersect-threshold-50"
						>
							<div className="icon-circle mb-6 motion-scale-in motion-delay-300">
								<it.icon className="size-5" />
							</div>
							<h3 className="text-lg font-semibold mb-2 tracking-tight motion-slide-up motion-delay-400">
								{it.title}
							</h3>
							<p className="text-sm leading-relaxed text-[var(--color-muted)] motion-fade-in motion-delay-500">
								{it.body}
							</p>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
