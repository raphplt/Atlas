"use client";
import React, { useEffect, useRef, useState } from "react";
import {
	PhoneCall,
	Timer,
	ShieldCheck,
	Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { trackFormView } from "@/lib/analytics";
import { WizardForm } from "./contact/WizardForm";

export function CTA() {
	const [hasTrackedView, setHasTrackedView] = useState(false);
	const sectionRef = useRef<HTMLDivElement>(null);
	const t = useTranslations("contact");

	useEffect(() => {
		if (!sectionRef.current || hasTrackedView) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasTrackedView) {
						trackFormView("hero");
						setHasTrackedView(true);
					}
				});
			},
			{ threshold: 0.3 }
		);

		observer.observe(sectionRef.current);

		return () => observer.disconnect();
	}, [hasTrackedView]);

	return (
		<section className="py-48 md:py-60 bg-[var(--color-background-alt)] relative overflow-hidden" id="contact" ref={sectionRef}>
             <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
             
             {/* Decorative blob behind form */}
             <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/5 blur-[120px] rounded-full pointer-events-none" />

			<div className="container-width relative">
				<div className="grid gap-16 lg:grid-cols-12 lg:items-center">
					{/* Left content - Value Prop */}
					<div className="space-y-10 lg:col-span-5">
						<div className="space-y-6">
                            <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider border border-[var(--color-accent)]/20">
                                {t("badge")}
                            </span>
							<h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] leading-tight">
								{t("title")}
							</h2>
							<p className="text-lg text-[var(--color-muted)] leading-relaxed">
								{t("subtitle")}
							</p>
						</div>
						<div className="grid gap-8 sm:grid-cols-2">
							{[
								{
									icon: PhoneCall,
									label: t("benefits.diagnostic.label"),
									desc: t("benefits.diagnostic.description"),
								},
								{
									icon: Sparkles,
									label: t("benefits.recommendations.label"),
									desc: t("benefits.recommendations.description"),
								},
								{
									icon: Timer,
									label: t("benefits.response.label"),
									desc: t("benefits.response.description"),
								},
								{
									icon: ShieldCheck,
									label: t("benefits.commitment.label"),
									desc: t("benefits.commitment.description"),
								},
							].map((b, index) => (
								<div
									key={b.label}
									className="flex gap-4 items-start group"
								>
									<div className="w-12 h-12 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center shrink-0 text-[var(--color-accent)] shadow-sm group-hover:border-[var(--color-primary)]/30 transition-colors">
										<b.icon className="size-6" />
									</div>
									<div>
										<p className="font-bold text-[var(--color-primary)] mb-1 text-md">{b.label}</p>
										<p className="text-sm text-[var(--color-muted)] leading-relaxed">
											{b.desc}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
                    
					{/* Right Content - Wizard Form */}
					<div className="relative w-full max-w-[550px] mx-auto lg:mr-0 lg:ml-auto lg:col-span-7">
                        <WizardForm />
					</div>
				</div>
			</div>
		</section>
	);
}
