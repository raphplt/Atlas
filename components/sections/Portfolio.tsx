"use client";

import { projects, type Project } from "@/content/projects";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { useTranslations } from "next-intl";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Single project card in the 2×2 grid */
function ProjectCard({
	project,
	index,
	onClick,
}: {
	project: Project;
	index: number;
	onClick: () => void;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, scale: 0.95 }}
			animate={isInView ? { opacity: 1, scale: 1 } : {}}
			transition={{
				type: "spring",
				stiffness: 200,
				damping: 25,
				delay: index * 0.1,
			}}
			onClick={onClick}
			className="group relative cursor-pointer overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
			style={{ perspective: "800px" }}
		>
			{/* After image only — device frame */}
			<div className="relative aspect-[3/2] overflow-hidden">
				<Image
					src={project.afterSrc}
					alt={project.alt}
					fill
					sizes="(max-width: 768px) 100vw, 50vw"
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>

				{/* Hover overlay */}
				<div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/80 transition-all duration-200 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
					<h3 className="text-xl md:text-2xl font-bold text-white text-center px-4">
						{project.title}
					</h3>
					<p className="text-sm text-white/70 text-center px-6 max-w-xs">
						{project.subtitle}
					</p>
					<span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] mt-2">
						Voir le détail
						<ArrowRight className="size-3.5" />
					</span>
				</div>
			</div>
		</motion.div>
	);
}

/** Expanded modal showing the before/after slider + details */
function ProjectModal({
	project,
	onClose,
	t,
}: {
	project: Project;
	onClose: () => void;
	t: ReturnType<typeof useTranslations>;
}) {
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
			className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm"
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.9, opacity: 0, y: 20 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.95, opacity: 0, y: 10 }}
				transition={{ duration: 0.35, ease: EASE }}
				className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[var(--radius-lg)] bg-[var(--color-background)] border border-[var(--color-border)] shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[var(--color-background)]/80 backdrop-blur-sm border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
					aria-label="Fermer"
				>
					<X className="size-5" />
				</button>

				<div className="p-6 md:p-10">
					{/* Before/After slider in full width */}
					<div className="mb-8 rounded-atlas overflow-hidden">
						<BeforeAfterSlider
							beforeSrc={project.beforeSrc}
							afterSrc={project.afterSrc}
							alt={project.alt}
							size="lg"
							showLabels={true}
							autoSlide={true}
						/>
					</div>

					{/* Project info */}
					<div className="space-y-6">
						<div>
							<h3 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-2">
								{project.title}
							</h3>
							<p className="text-lg text-[var(--color-muted)] leading-relaxed">
								{project.subtitle}
							</p>
						</div>

						{/* Benefits as horizontal cards */}
						<div>
							<h4 className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest mb-4">
								{t("benefitsTitle")}
							</h4>
							<div className="grid sm:grid-cols-3 gap-3">
								{project.improvements.map((improvement, idx) => (
									<div
										key={idx}
										className="flex items-start gap-3 p-4 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-card)]"
									>
										<span className="mt-1 w-2 h-2 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
										<span className="text-sm text-[var(--color-foreground)] leading-snug">
											{improvement}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}

export function Portfolio() {
	const t = useTranslations("portfolio");
	const featuredProjects = projects.slice(0, 4);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	const closeModal = useCallback(() => setSelectedProject(null), []);

	return (
		<>
			<section
				className="pt-16 pb-24 md:pt-24 md:pb-40 bg-[var(--color-background)]"
				id="portfolio"
			>
				<div className="container-width">
					<div className="text-center mb-20 max-w-3xl mx-auto">
						<MotionWrapper variant="fade-up">
							<div className="inline-block mb-4 text-xs font-bold tracking-widest uppercase text-[var(--color-accent)]">
								{t("badge")}
							</div>
						</MotionWrapper>
						<MotionWrapper variant="fade-up" delay={0.1}>
							<h2 className="text-[var(--color-primary)] mb-6">{t("title")}</h2>
						</MotionWrapper>
						<MotionWrapper variant="fade-up" delay={0.2}>
							<p className="text-lg text-[var(--color-muted)]">{t("subtitle")}</p>
						</MotionWrapper>
					</div>

					{/* 2×2 Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
						{featuredProjects.map((project, index) => (
							<ProjectCard
								key={project.id}
								project={project}
								index={index}
								onClick={() => setSelectedProject(project)}
							/>
						))}
					</div>

					{/* CTA transition */}
					<MotionWrapper variant="fade-up" delay={0.2}>
						<div className="text-center mt-20">
							<p className="text-lg text-[var(--color-muted)] mb-6">
								{t("ctaTransition")}
							</p>
							<a
								href="#simulateur"
								className="inline-flex items-center gap-2 px-8 py-3 rounded-[var(--radius)] border-2 border-[var(--color-accent)]/40 text-[var(--color-accent)] font-bold text-sm hover:bg-[var(--color-accent)]/5 hover:border-[var(--color-accent)] transition-all duration-300 group"
							>
								{t("ctaButton")}
								<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
							</a>
						</div>
					</MotionWrapper>
				</div>
			</section>

			{/* Project detail modal */}
			<AnimatePresence>
				{selectedProject && (
					<ProjectModal
						project={selectedProject}
						onClose={closeModal}
						t={t}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
