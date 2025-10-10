"use client";

import { Card } from "@/components/ui/card";
import { FileWarning, MapPinOff, PhoneOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { PrimaryCta } from "@/components/ui/PrimaryCta";

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
		<section className="relative py-20 sm:py-32" id="problems">
			<div
				className="absolute inset-0 pattern-grid opacity-40"
				aria-hidden="true"
			/>
			<div className="container relative">
				<h2 className="h2 text-center mb-4 sm:mb-6 motion-fade-in motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("title")}
				</h2>
				<p className="text-center text-[var(--color-muted)] mb-10 sm:mb-14 max-w-2xl mx-auto motion-slide-up motion-delay-100 motion-duration-1000 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("subtitle")}
				</p>
				<div className="grid gap-6 sm:gap-8 md:grid-cols-3">
					{items.map((it, index) => (
						<Card
							key={it.title}
							className="p-6 sm:p-8 card-glow motion-fade-in motion-delay-200 motion-intersect-start motion-intersect-end motion-intersect-threshold-50"
						>
							<div className="icon-circle mb-4 sm:mb-6 motion-scale-in motion-delay-300">
								<it.icon className="size-4 sm:size-5" />
							</div>
							<h3 className="text-base sm:text-lg font-semibold mb-2 tracking-tight motion-slide-up motion-delay-400">
								{it.title}
							</h3>
							<p className="text-sm leading-relaxed text-[var(--color-muted)] motion-fade-in motion-delay-500">
								{it.body}
							</p>
						</Card>
					))}
				</div>

				{/* CTA to solve problems */}
				<div className="text-center mt-12 sm:mt-16">
					<PrimaryCta
						location="problems"
						size="default"
						showIcon={true}
						showSubtext={false}
					/>
				</div>
			</div>
		</section>
	);
}
