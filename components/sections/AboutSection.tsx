"use client";

import { useTranslations } from "next-intl";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import Image from "next/image";
import {
	CompassIcon,
	WaypointIcon,
	ChatIcon,
	AnchorIcon,
} from "@/components/atlas-icons";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const VALUES = [
	{ key: "understand", icon: CompassIcon },
	{ key: "deliver", icon: WaypointIcon },
	{ key: "reachable", icon: ChatIcon },
	{ key: "works", icon: AnchorIcon },
] as const;

function ValueCard({
	valueKey,
	icon: Icon,
	index,
	t,
}: {
	valueKey: string;
	icon: React.FC<{ size?: number }>;
	index: number;
	t: ReturnType<typeof useTranslations>;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.3, once: true });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 25, filter: "blur(3px)" }}
			animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: EASE }}
			whileHover={{ x: 4, transition: { duration: 0.2 } }}
			className="flex items-start gap-4 cursor-default"
		>
			<motion.div
				initial={{ scale: 0, rotate: -15 }}
				animate={isInView ? { scale: 1, rotate: 0 } : {}}
				transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: EASE }}
				className="w-11 h-11 rounded-[var(--radius)] bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] flex-shrink-0"
			>
				<Icon size={20} />
			</motion.div>
			<div>
				<h4 className="font-semibold text-[var(--color-primary)] mb-1 text-base">
					{t(`values.${valueKey}.title`)}
				</h4>
				<p className="text-sm text-[var(--color-muted)] leading-relaxed">
					{t(`values.${valueKey}.description`)}
				</p>
			</div>
		</motion.div>
	);
}

export function AboutSection() {
	const t = useTranslations("aboutSection");
	const photoRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: photoRef,
		offset: ["start end", "end start"],
	});

	const photoY = useTransform(scrollYProgress, [0, 1], [20, -20]);
	const photoScale = useTransform(scrollYProgress, [0, 0.5], [0.97, 1]);

	return (
		<section
			className="section-padding bg-[var(--color-background-alt)] bg-paper-texture relative overflow-hidden"
			id="about"
		>
			<div className="container-width relative z-10">
				<div className="grid lg:grid-cols-12 gap-20 items-center">
					{/* Photo — 5 cols with parallax */}
					<div className="lg:col-span-5 max-w-xs sm:max-w-sm mx-auto lg:max-w-none" ref={photoRef}>
						<MotionWrapper variant="scale-up" delay={0.1} duration={0.9}>
							<motion.div
								style={{ y: photoY, scale: photoScale }}
								className="relative rounded-atlas overflow-hidden border border-[var(--color-border)] shadow-lg"
							>
								<Image
									src="/images/Raphael-Plassart.png"
									alt="Raphaël Plassart"
									width={600}
									height={700}
									className="object-cover w-full aspect-[4/5]"
									sizes="(max-width: 640px) 320px, (max-width: 1024px) 384px, 40vw"
								/>
							</motion.div>
						</MotionWrapper>
					</div>

					{/* Content — 7 cols */}
					<div className="lg:col-span-7 space-y-10">
						<MotionWrapper variant="reveal-up">
							<h2 className="text-[var(--color-primary)]">{t("title")}</h2>
						</MotionWrapper>

						<MotionWrapper variant="fade-up" delay={0.15}>
							<p className="text-lg text-[var(--color-muted)] leading-relaxed">
								{t("intro")}
							</p>
						</MotionWrapper>

						<div className="grid sm:grid-cols-2 gap-8 pt-4">
							{VALUES.map((value, i) => (
								<ValueCard
									key={value.key}
									valueKey={value.key}
									icon={value.icon}
									index={i}
									t={t}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
