"use client";

import { useTranslations } from "next-intl";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import Image from "next/image";
import { X } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const PORTAL_FEATURES = [
	{ key: "tasks", image: "/images/portal/taches.png" },
	{ key: "messages", image: "/images/portal/messagerie.png" },
	{ key: "files", image: "/images/portal/fichiers.png" },
	{ key: "payments", image: "/images/portal/paiements.png" },
	{ key: "tickets", image: "/images/portal/ticekts.png" },
];

/** Fullscreen image lightbox */
function ImageLightbox({ image, label, onClose }: { image: string; label: string; onClose: () => void }) {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleEsc);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handleEsc);
			document.body.style.overflow = "";
		};
	}, [onClose]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.25 }}
			className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
			onClick={onClose}
		>
			<button
				onClick={onClose}
				className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
				aria-label="Fermer"
			>
				<X className="size-5" />
			</button>

			<motion.div
				initial={{ scale: 0.9, opacity: 0, y: 20 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.95, opacity: 0, y: 10 }}
				transition={{ duration: 0.35, ease: EASE }}
				className="relative w-full max-w-4xl rounded-[var(--radius-lg)] overflow-hidden border border-white/10 shadow-2xl bg-[var(--color-card)]"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="relative aspect-[16/10]">
					<Image
						src={image}
						alt={label}
						fill
						sizes="(max-width: 768px) 95vw, 80vw"
						className="object-cover"
						priority
					/>
				</div>
				<div className="px-4 py-3 text-center border-t border-[var(--color-border)]">
					<span className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wide">
						{label}
					</span>
				</div>
			</motion.div>
		</motion.div>
	);
}

function FeatureCard({
	image,
	label,
	index,
	onClick,
}: {
	image: string;
	label: string;
	index: number;
	onClick: () => void;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.3, once: true });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
			animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: EASE }}
			whileHover={{ y: -4, transition: { duration: 0.25 } }}
			onClick={onClick}
			className="group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] transition-shadow duration-300 hover:shadow-[var(--shadow)] hover:border-[var(--color-accent)]/30 cursor-pointer"
		>
			<div className="relative aspect-[16/10] overflow-hidden">
				<Image
					src={image}
					alt={label}
					fill
					sizes="(max-width: 768px) 50vw, 20vw"
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>
			</div>
			<div className="px-3 py-2.5 text-center">
				<span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wide">
					{label}
				</span>
			</div>
		</motion.div>
	);
}

export function PortalAtlas() {
	const t = useTranslations("portalAtlas");
	const videoRef = useRef<HTMLDivElement>(null);
	const [selectedFeature, setSelectedFeature] = useState<{ image: string; label: string } | null>(null);

	const { scrollYProgress } = useScroll({
		target: videoRef,
		offset: ["start end", "end start"],
	});

	const videoY = useTransform(scrollYProgress, [0, 1], [30, -30]);

	const closeModal = useCallback(() => setSelectedFeature(null), []);

	return (
		<>
			<section
				className="section-padding bg-[var(--color-background)] relative overflow-hidden"
				id="portal-atlas"
			>
				<div className="container-width relative">
					{/* Header */}
					<div className="text-center mb-20 max-w-3xl mx-auto">
						<MotionWrapper variant="fade-up">
							<div className="inline-block mb-4 text-xs font-bold tracking-widest uppercase text-[var(--color-accent)]">
								{t("badge")}
							</div>
						</MotionWrapper>
						<MotionWrapper variant="reveal-up" delay={0.1}>
							<h2 className="text-[var(--color-primary)] mb-6">
								{t("title")}
							</h2>
						</MotionWrapper>
						<MotionWrapper variant="fade-up" delay={0.2}>
							<p className="text-lg text-[var(--color-muted)] leading-relaxed">
								{t("subtitle")}
							</p>
						</MotionWrapper>
					</div>

					{/* Main video with parallax */}
					<div ref={videoRef} className="mb-20">
						<MotionWrapper variant="scale-up" delay={0.2} duration={0.9}>
							<motion.div
								style={{ y: videoY }}
								className="relative rounded-atlas-alt overflow-hidden border border-[var(--color-border)] shadow-xl max-w-5xl mx-auto"
							>
								<video
									autoPlay
									muted
									loop
									playsInline
									className="w-full aspect-video object-cover"
								>
									<source src="/videos/AtlasPortal.mp4" type="video/mp4" />
								</video>

								<span className="absolute bottom-2 right-3 text-[9px] font-mono text-white/30 tracking-wider drop-shadow-sm">
									PORTAL ATLAS / v1.0
								</span>
							</motion.div>
						</MotionWrapper>
					</div>

					{/* Key message */}
					<MotionWrapper variant="fade-up" delay={0.1}>
						<p className="text-center text-base md:text-lg text-[var(--color-muted)] max-w-2xl mx-auto mb-16 leading-relaxed">
							{t("keyMessage")}
						</p>
					</MotionWrapper>

					{/* Feature grid — compact cards with images */}
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
						{PORTAL_FEATURES.map((feature, i) => {
							const label = t(`featureLabels.${feature.key}`);
							return (
								<FeatureCard
									key={feature.key}
									image={feature.image}
									label={label}
									index={i}
									onClick={() => setSelectedFeature({ image: feature.image, label })}
								/>
							);
						})}
					</div>
				</div>
			</section>

			{/* Image lightbox modal */}
			<AnimatePresence>
				{selectedFeature && (
					<ImageLightbox
						image={selectedFeature.image}
						label={selectedFeature.label}
						onClose={closeModal}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
