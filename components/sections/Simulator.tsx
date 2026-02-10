"use client";

import { useTranslations } from "next-intl";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { BlueprintIcon } from "@/components/atlas-icons";
import { SimulatorProvider } from "@/components/simulator/SimulatorContext";
import { SimulatorSection } from "@/components/simulator/SimulatorSection";

export function Simulator() {
	const t = useTranslations("simulator");

	return (
		<section
			className="section-padding bg-[var(--color-background)] bg-carto-grid relative overflow-hidden"
			id="simulateur"
		>
			{/* Animated decorative blobs */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)]/6 rounded-full blur-[140px] pointer-events-none animate-blob" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-primary)]/4 rounded-full blur-[120px] pointer-events-none animate-blob-delay" />

			<div className="container-width relative z-10">
				{/* Header */}
				<div className="text-center max-w-3xl mx-auto mb-20">
					<MotionWrapper variant="fade-up">
						<div className="inline-flex items-center gap-2 mb-6 text-xs font-bold tracking-widest uppercase text-[var(--color-accent)]">
							<BlueprintIcon size={16} />
							<span>{t("badge")}</span>
						</div>
					</MotionWrapper>
					<MotionWrapper variant="reveal-up" delay={0.1}>
						<h2 className="text-[var(--color-primary)] mb-6">{t("title")}</h2>
					</MotionWrapper>
					<MotionWrapper variant="fade-up" delay={0.2}>
						<p className="text-lg text-[var(--color-muted)]">{t("subtitle")}</p>
					</MotionWrapper>
				</div>

				{/* Simulator */}
				<MotionWrapper variant="scale-up" delay={0.3} duration={0.9}>
					<SimulatorProvider>
						<SimulatorSection />
					</SimulatorProvider>
				</MotionWrapper>
			</div>
		</section>
	);
}
