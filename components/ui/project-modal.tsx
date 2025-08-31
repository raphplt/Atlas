"use client";
import { useState } from "react";
import { BeforeAfterSlider } from "./before-after-slider";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Maximize2 } from "lucide-react";
import * as React from "react";
import { HairdresserHeroAfter } from "../showcase/hairdresser-after";
import { PlumberHeroAfter } from "../showcase/plumber-hero-after";
import { LandscaperHeroAfter } from "../showcase/landscaper-after";
import { PhotographerHeroAfter } from "../showcase/photographer-after";

interface ProjectModalProps {
	isOpen: boolean;
	onClose: () => void;
	project: {
		id: string;
		title: string;
		beforeSrc: string;
		afterSrc: string;
		alt: string;
		improvements: string[];
	};
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
	const [showShowcase, setShowShowcase] = useState(false);

	// Mapping des projets vers les composants showcase
	const getShowcaseComponent = () => {
		switch (project.id) {
			case "coiffeur":
				return <HairdresserHeroAfter hideGlobalUI={true} />;
			case "plombier":
				return <PlumberHeroAfter hideGlobalUI={true} />;
			case "paysagiste":
				return <LandscaperHeroAfter hideGlobalUI={true} />;
			case "photographe":
				return <PhotographerHeroAfter hideGlobalUI={true} />;
			default:
				return null;
		}
	};

	// Si on affiche le showcase en plein écran
	if (showShowcase) {
		return (
			<div className="fixed inset-0 z-50 bg-white">
				{/* Bouton de fermeture */}
				<button
					onClick={() => setShowShowcase(false)}
					className="fixed top-4 right-4 z-[10001] p-3 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/30 transition-colors"
					aria-label="Fermer"
				>
					<X className="w-6 h-6 text-white" />
				</button>
				{getShowcaseComponent()}
			</div>
		);
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DialogContent
				className="
    p-0 gap-0 overflow-hidden rounded-3xl border border-[var(--color-border)]  bg-[var(--color-card)] shadow-[var(--shadow)] w-[min(99vw,1800px)] xl:w-[min(98vw,2000px)] 2xl:w-[min(96vw,2200px)]
  "
			>
				{/* Header */}
				<DialogHeader className="px-6 py-4 border-b border-[var(--color-border)]">
					<div className="flex items-center justify-between">
						<DialogTitle className="text-2xl md:text-3xl font-bold text-[var(--color-fg)]">
							{project.title}
						</DialogTitle>
						{/* Bouton plein écran avec meilleur alignement */}
						<div className="flex items-center">
							<button
								onClick={() => setShowShowcase(true)}
								className="p-2 rounded-full hover:bg-[var(--color-bg-alt)] transition-colors"
								aria-label="Voir en plein écran"
								title="Voir en plein écran"
							>
								<Maximize2 className="w-5 h-5 text-[var(--color-muted)]" />
							</button>
						</div>
					</div>
				</DialogHeader>
				{/* Content */}
				<ScrollArea className="max-h-[82vh]">
					<div className="p-6">
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
										Une refonte complète qui améliore l&apos;expérience utilisateur, la
										conversion et la visibilité en ligne de votre activité.
									</p>
								</div>
							</div>
						</div>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
