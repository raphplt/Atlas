"use client";

import { useTranslations } from "next-intl";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { ArrowRight, Maximize2, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Splits text into words and animates each one */
function AnimatedTitle({ text }: { text: string }) {
	const words = text.split(" ");

	return (
		<motion.h1
			className="font-heading text-[var(--color-primary)] text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] leading-[1.08] text-pretty"
			initial="hidden"
			animate="visible"
			variants={{
				hidden: {},
				visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
			}}
		>
			{words.map((word, i) => (
				<span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
					<motion.span
						className="inline-block"
						variants={{
							hidden: { y: "110%", rotateX: 40, opacity: 0 },
							visible: {
								y: "0%",
								rotateX: 0,
								opacity: 1,
								transition: { duration: 0.7, ease: EASE },
							},
						}}
					>
						{word}
					</motion.span>
				</span>
			))}
		</motion.h1>
	);
}

/** Fullscreen video lightbox */
function VideoLightbox({ onClose }: { onClose: () => void }) {
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
			transition={{ duration: 0.3 }}
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
			onClick={onClose}
		>
			<button
				onClick={onClose}
				className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
				aria-label="Fermer"
			>
				<X className="size-6" />
			</button>

			<motion.div
				initial={{ scale: 0.85, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				transition={{ duration: 0.4, ease: EASE }}
				className="w-[90vw] max-w-6xl aspect-video rounded-xl overflow-hidden shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				<video
					autoPlay
					muted
					loop
					playsInline
					className="w-full h-full object-cover"
				>
					<source src="/videos/HeroAtlas.mp4" type="video/mp4" />
				</video>
			</motion.div>
		</motion.div>
	);
}

export function Hero() {
	const t = useTranslations("hero");
	const sectionRef = useRef<HTMLDivElement>(null);
	const [lightboxOpen, setLightboxOpen] = useState(false);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});

	const videoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
	const videoScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
	const blobX = useTransform(scrollYProgress, [0, 1], [0, -40]);
	const blobY = useTransform(scrollYProgress, [0, 1], [0, 60]);

	const openLightbox = useCallback(() => setLightboxOpen(true), []);
	const closeLightbox = useCallback(() => setLightboxOpen(false), []);

	return (
		<>
			<section
				ref={sectionRef}
				className="relative min-h-[85vh] flex items-center pt-28 pb-16 md:pt-32 md:pb-20 bg-[var(--color-background-alt)] bg-carto-grid bg-paper-texture overflow-hidden"
				id="hero"
			>
				{/* Animated decorative blobs */}
				<motion.div
					style={{ x: blobX, y: blobY }}
					className="absolute top-20 -left-20 w-[500px] h-[500px] bg-[var(--color-accent)]/8 rounded-full blur-[120px] pointer-events-none animate-blob"
				/>
				<motion.div
					style={{ x: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
					className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--color-primary)]/6 rounded-full blur-[100px] pointer-events-none animate-blob-delay"
				/>

				<div className="container-width relative z-10 w-full">
					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						{/* Content — left column */}
						<div className="space-y-10">
							<AnimatedTitle text={t("title")} />

							<MotionWrapper variant="fade-up" delay={0.5} duration={0.8}>
								<p className="text-xl md:text-2xl text-[var(--color-muted)] leading-relaxed max-w-xl">
									{t("subtitle")}
								</p>
							</MotionWrapper>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
								className="flex flex-col sm:flex-row items-start gap-4 pt-2"
							>
								<a
									href="#simulateur"
									className={cn(
										buttonVariants({ size: "lg" }),
										"font-bold text-base px-8 gap-2 group btn-shimmer"
									)}
								>
									{t("ctaPrimary")}
									<ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
								</a>
								<a
									href="#portfolio"
									className={cn(
										buttonVariants({ variant: "secondary", size: "lg" }),
										"font-bold text-base px-8"
									)}
								>
									{t("ctaSecondary")}
								</a>
							</motion.div>
						</div>

						{/* Video — right column */}
						<div>
							<motion.div
								initial={{ opacity: 0, scale: 0.88, y: 30, filter: "blur(8px)" }}
								animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
								transition={{ duration: 1, delay: 0.4, ease: EASE }}
							>
								<motion.div
									style={{ y: videoY, scale: videoScale }}
									className="relative rounded-atlas overflow-hidden border border-[var(--color-border)] shadow-xl group"
								>
									<video
										autoPlay
										muted
										loop
										playsInline
										className="w-full aspect-video object-cover"
									>
										<source src="/videos/HeroAtlas.mp4" type="video/mp4" />
									</video>

									{/* Fullscreen expand button */}
									<button
										onClick={openLightbox}
										className="absolute top-3 right-3 p-2 rounded-[var(--radius)] bg-black/30 text-white/70 hover:bg-black/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
										aria-label="Plein écran"
									>
										<Maximize2 className="size-4" />
									</button>

									{/* Coordinate overlay */}
									<span className="absolute top-3 left-4 text-[10px] font-mono text-white/40 tracking-wider drop-shadow-sm">
										47.2°N — 2.1°E
									</span>
									<span className="absolute bottom-3 right-4 text-[10px] font-mono text-white/40 tracking-wider drop-shadow-sm">
										ATLAS / PREVIEW
									</span>
								</motion.div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* Video lightbox modal */}
			<AnimatePresence>
				{lightboxOpen && <VideoLightbox onClose={closeLightbox} />}
			</AnimatePresence>
		</>
	);
}
