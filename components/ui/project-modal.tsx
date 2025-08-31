"use client";
import { useEffect } from "react";
import { BeforeAfterSlider } from "./before-after-slider";

interface ProjectModalProps {
	isOpen: boolean;
	onClose: () => void;
	project: {
		title: string;
		beforeSrc: string;
		afterSrc: string;
		alt: string;
		improvements: string[];
	};
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Overlay */}
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="relative w-full max-w-6xl max-h-[90vh] bg-[var(--color-card)] rounded-3xl shadow-[var(--shadow)] border border-[var(--color-border)] overflow-hidden">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
					<h2 className="text-2xl md:text-3xl font-bold">{project.title}</h2>
					<button
						onClick={onClose}
						className="p-2 rounded-full hover:bg-[var(--color-bg-alt)] transition-colors"
						aria-label="Fermer"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							className="text-[var(--color-muted)]"
						>
							<path
								d="M18 6L6 18M6 6L18 18"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>

				{/* Content */}
				<div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
					<div className="grid gap-8 lg:grid-cols-2">
						{/* Slider */}
						<div>
							<BeforeAfterSlider
								beforeSrc={project.beforeSrc}
								afterSrc={project.afterSrc}
								alt={project.alt}
								size="lg"
								showLabels={true}
							/>
						</div>

						{/* Improvements */}
						<div className="space-y-6">
							<div>
								<h3 className="text-xl font-semibold mb-4 text-[var(--color-fg)]">
									Améliorations apportées
								</h3>
								<ul className="space-y-3">
									{project.improvements.map((improvement, index) => (
										<li key={index} className="flex items-start gap-3">
											<div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0" />
											<span className="text-[var(--color-fg-soft)] leading-relaxed">
												{improvement}
											</span>
										</li>
									))}
								</ul>
							</div>

							<div className="p-4 rounded-2xl bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20">
								<h4 className="font-semibold text-[var(--color-accent)] mb-2">
									Résultat
								</h4>
								<p className="text-[var(--color-fg-soft)] text-sm leading-relaxed">
									Une refonte complète qui améliore l'expérience utilisateur, la
									conversion et la visibilité en ligne de votre activité.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
