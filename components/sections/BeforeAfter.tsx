"use client";
import { projects } from "@/content/projects";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { BeforeAfterSlider } from "../ui/before-after-slider";
import { ProjectModal } from "../ui/project-modal";

export function BeforeAfter() {
	const [selectedProject, setSelectedProject] = useState<string | null>(null);

	const openModal = (projectId: string) => {
		setSelectedProject(projectId);
	};

	const closeModal = () => {
		setSelectedProject(null);
	};

	const selectedProjectData = selectedProject
		? projects.find((p) => p.id === selectedProject)
		: null;

	return (
		<section className="relative py-32 overflow-hidden" id="avant-apres">
			<div
				className="absolute inset-0 pattern-grid opacity-30"
				aria-hidden="true"
			/>
			<div className="aurora a1" />
			<div className="aurora a2" />
			<div className="container relative">
				<h2 className="h2 text-center mb-6">Avant / Après</h2>
				<p className="lead mb-12">
					L'impact visuel et lisible d'une refonte structurée en un coup d'œil.
				</p>

				{/* Grille des projets */}
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{projects.map((project) => (
						<div
							key={project.id}
							className="group cursor-pointer"
							onClick={() => openModal(project.id)}
						>
							<div className="relative overflow-hidden rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1">
								{/* Mini slider avant/après */}
								<div className="aspect-[4/3] relative">
									<BeforeAfterSlider
										beforeSrc={project.beforeSrc}
										afterSrc={project.afterSrc}
										alt={project.alt}
										size="sm"
										showLabels={false}
										className="rounded-t-2xl"
									/>
								</div>

								{/* Contenu de la carte */}
								<div className="p-4">
									<h3 className="font-semibold text-[var(--color-fg)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
										{project.title}
									</h3>
									<p className="text-sm text-[var(--color-muted)] leading-relaxed">
										{project.subtitle}
									</p>
								</div>

								{/* Overlay au hover */}
								<div className="absolute inset-0 bg-[var(--color-accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
									<div className="px-4 py-2 rounded-full bg-[var(--color-card)]/90 backdrop-blur-sm text-sm font-medium text-[var(--color-accent)]">
										Voir les détails
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Modal pour les détails du projet */}
				{selectedProjectData && (
					<ProjectModal
						isOpen={!!selectedProject}
						onClose={closeModal}
						project={selectedProjectData}
					/>
				)}
			</div>
		</section>
	);
}
