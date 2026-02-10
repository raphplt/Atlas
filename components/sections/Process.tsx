"use client";

import { useTranslations } from "next-intl";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { CompassIcon, BlueprintIcon, ScreenIcon, RouteIcon } from "@/components/atlas-icons";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type Step = {
	titleKey: string;
	descKey: string;
	icon: React.FC<{ size?: number }>;
};

const STEPS: Step[] = [
	{ titleKey: "steps.diagnostic.title", descKey: "steps.diagnostic.description", icon: CompassIcon },
	{ titleKey: "steps.creation.title", descKey: "steps.creation.description", icon: BlueprintIcon },
	{ titleKey: "steps.portal.title", descKey: "steps.portal.description", icon: ScreenIcon },
	{ titleKey: "steps.delivery.title", descKey: "steps.delivery.description", icon: RouteIcon },
];

function StepCard({ step, index, t }: { step: Step; index: number; t: ReturnType<typeof useTranslations> }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.4, once: true });
	const Icon = step.icon;

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
			animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
			transition={{ duration: 0.7, delay: 0.1 + index * 0.12, ease: EASE }}
			className="flex gap-8 md:gap-12 items-start group"
		>
			{/* Circle on the line */}
			<div className="relative z-10 flex-shrink-0">
				<motion.div
					initial={{ scale: 0.6, opacity: 0 }}
					animate={isInView ? { scale: 1, opacity: 1 } : {}}
					transition={{ duration: 0.5, delay: 0.2 + index * 0.12, ease: EASE }}
					className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--color-card)] border-2 border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] shadow-sm group-hover:border-[var(--color-accent)]/40 group-hover:shadow-md transition-all duration-500"
				>
					<Icon size={24} />
				</motion.div>
				<motion.div
					initial={{ scale: 0 }}
					animate={isInView ? { scale: 1 } : {}}
					transition={{ duration: 0.4, delay: 0.35 + index * 0.12, ease: EASE }}
					className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center"
				>
					{index + 1}
				</motion.div>
			</div>

			{/* Content */}
			<div className="flex-1 pt-2 md:pt-4">
				<h3 className="text-xl md:text-2xl font-bold text-[var(--color-primary)] mb-3">
					{t(step.titleKey)}
				</h3>
				<p className="text-[var(--color-muted)] leading-relaxed max-w-lg">
					{t(step.descKey)}
				</p>
			</div>
		</motion.div>
	);
}

export function Process() {
	const t = useTranslations("process");
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start 0.8", "end 0.6"],
	});

	const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

	return (
		<section className="section-padding bg-[var(--color-background-alt)] bg-carto-grid relative overflow-hidden" id="process">
			<div className="container-width relative">
				<div className="text-center mb-24 max-w-3xl mx-auto">
					<MotionWrapper variant="fade-up">
						<div className="inline-block mb-4 text-xs font-bold tracking-widest uppercase text-[var(--color-accent)]">
							{t("badge")}
						</div>
					</MotionWrapper>
					<MotionWrapper variant="reveal-up" delay={0.1}>
						<h2 className="text-[var(--color-primary)] mb-6">{t("title")}</h2>
					</MotionWrapper>
					<MotionWrapper variant="fade-up" delay={0.2}>
						<p className="text-lg text-[var(--color-muted)]">{t("subtitle")}</p>
					</MotionWrapper>
				</div>

				{/* Vertical timeline */}
				<div ref={containerRef} className="relative max-w-3xl mx-auto">
					{/* Static line track */}
					<div className="absolute left-8 md:left-10 top-0 bottom-0 w-px bg-[var(--color-border)]" />
					{/* Animated fill with glow */}
					<motion.div
						className="absolute left-8 md:left-10 top-0 w-px origin-top"
						style={{ height: lineHeight }}
					>
						<div className="absolute inset-0 bg-[var(--color-accent)]" />
						<div className="absolute inset-0 bg-[var(--color-accent)] blur-[3px] opacity-60" />
					</motion.div>

					<div className="space-y-20">
						{STEPS.map((step, i) => (
							<StepCard key={i} step={step} index={i} t={t} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
