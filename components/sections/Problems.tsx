"use client";

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
		<section className="py-24 bg-[var(--color-background)]" id="problems">
			<div className="container-width">
				<div className="text-center mb-16 max-w-2xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6">
						{t("title")}
					</h2>
					<p className="text-lg text-[var(--color-muted)]">
						{t("subtitle")}
					</p>
				</div>
                
				<div className="grid gap-8 md:grid-cols-3">
					{items.map((it, index) => (
						<div
							key={it.title}
							className="p-8 bg-[var(--color-background-alt)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
						>
							<div className="mb-6 text-[var(--color-accent)]">
								<it.icon className="size-8" />
							</div>
							<h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">
								{it.title}
							</h3>
							<p className="text-sm leading-relaxed text-[var(--color-muted)]">
								{it.body}
							</p>
						</div>
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
