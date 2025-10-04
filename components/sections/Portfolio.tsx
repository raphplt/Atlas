"use client";
import { projects } from "@/content/projects";
import { getProjectsByCategory } from "@/content/projects";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { ProjectModal } from "@/components/ui/project-modal";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function Portfolio() {
	const [selectedProject, setSelectedProject] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState<"gallery" | "case-studies">(
		"gallery"
	);
	const t = useTranslations("portfolio");

	const openModal = (projectId: string) => {
		setSelectedProject(projectId);
	};

	const closeModal = () => {
		setSelectedProject(null);
	};

	const selectedProjectData = selectedProject
		? projects.find((p) => p.id === selectedProject)
		: null;

	const featuredProjects = getProjectsByCategory("services")
		.concat(getProjectsByCategory("creative"))
		.slice(0, 2);

	const tabs = [
		{ id: "gallery", label: t("tabs.gallery"), projects: projects },
		{
			id: "case-studies",
			label: t("tabs.caseStudies"),
			projects: featuredProjects,
		},
	];

	return (
		<section className="relative py-32 overflow-hidden" id="portfolio">
			<div
				className="absolute inset-0 pattern-grid opacity-30"
				aria-hidden="true"
			/>
			<div className="aurora a1" />
			<div className="aurora a2" />
			<div className="container relative">
				<h2 className="h2 text-center mb-6 motion-fade-in motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("title")}
				</h2>
				<p className="lead mb-12 text-center motion-slide-up motion-delay-100 motion-duration-1000 motion-intersect-start motion-intersect-end motion-intersect-threshold-75 line-clamp-2">
					{t("subtitle")}
				</p>

				<div className="flex justify-center mb-12 motion-scale-in motion-delay-200 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					<div className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]/50 backdrop-blur-sm p-1">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id as "gallery" | "case-studies")}
								className={`px-6 py-3 text-sm font-medium rounded-md transition-all ${
									activeTab === tab.id
										? "bg-[var(--color-accent)]/15 text-[var(--color-accent)] shadow-sm"
										: "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
								}`}
							>
								{tab.label}
							</button>
						))}
					</div>
				</div>

				{activeTab === "gallery" && (
					<div className="space-y-12 motion-fade-in motion-delay-300 motion-intersect-start motion-intersect-end motion-intersect-threshold-50">
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{projects.map((project, index) => (
								<div
									key={project.id}
									className="group cursor-pointer motion-scale-in motion-delay-400 motion-intersect-start motion-intersect-end motion-intersect-threshold-50"
									onClick={() => openModal(project.id)}
								>
									<div className="project-card relative overflow-hidden rounded-3xl bg-[var(--color-card)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] motion-slide-up motion-delay-500 flex flex-col h-full">
										{/* Badge de résultat */}
										<div className="floating-badge absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
											<div className="metric-badge px-2 py-1 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] text-white text-xs font-semibold shadow-lg">
												+150% visites
											</div>
										</div>

										{/* Image avec overlay */}
										<div className="aspect-[4/3] relative overflow-hidden">
											<BeforeAfterSlider
												beforeSrc={project.beforeSrc}
												afterSrc={project.afterSrc}
												alt={project.alt}
												size="sm"
												showLabels={false}
												className="rounded-t-3xl"
											/>
											{/* Overlay gradient */}
											<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										</div>

										{/* Contenu de la card */}
										<div className="p-5 relative flex flex-col h-full">
											{/* Indicateur de secteur */}
											<div className="flex items-center gap-2 mb-3">
												<div className="w-2 h-2 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)]" />
												<span className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-wide">
													{project.category === "beauty"
														? "Beauté"
														: project.category === "services"
															? "Services"
															: project.category === "landscape"
																? "Paysage"
																: "Créatif"}
												</span>
											</div>

											<h3 className="font-bold text-lg text-[var(--color-fg)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
												{project.title}
											</h3>

											{/* Contenu avec hauteur fixe */}
											<div className="flex-1 flex flex-col">
												<p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3 min-h-[2.5rem] flex items-start">
													{project.subtitle}
												</p>

												{/* Métriques rapides */}
												<div className="flex items-center gap-4 text-xs text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 mt-auto">
													<div className="flex items-center gap-1">
														<div className="w-1.5 h-1.5 rounded-full bg-green-500" />
														<span>Mobile-first</span>
													</div>
													<div className="flex items-center gap-1">
														<div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
														<span>SEO optimisé</span>
													</div>
												</div>
											</div>
										</div>

										{/* CTA overlay */}
										<div className="absolute inset-0 bg-[var(--color-accent)]/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-3xl flex items-center justify-center backdrop-blur-sm">
											<div className="px-6 py-3 rounded-2xl bg-[var(--color-card)]/95 backdrop-blur-sm text-sm font-semibold text-[var(--color-accent)] shadow-lg border border-[var(--color-accent)]/20 transform scale-95 group-hover:scale-100 transition-transform duration-300">
												{t("viewDetails")} →
											</div>
										</div>

										{/* Effet de brillance */}
										<div className="project-card-shimmer" />
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{activeTab === "case-studies" && (
					<div className="space-y-24 motion-fade-in motion-delay-300 motion-intersect-start motion-intersect-end motion-intersect-threshold-50">
						{featuredProjects.map((project, index) => (
							<div
								key={project.id}
								className={`grid lg:grid-cols-2 gap-12 items-center motion-slide-up motion-delay-400 motion-intersect-start motion-intersect-end motion-intersect-threshold-50 ${
									index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
								}`}
							>
								<div
									className={`relative motion-scale-in motion-delay-500 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
								>
									<div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs px-3 py-1 rounded-full bg-[var(--color-bg)]/80 border border-[var(--color-border)] motion-fade-in motion-delay-600">
										{project.title}
									</div>
									<BeforeAfterSlider
										beforeSrc={project.beforeSrc}
										afterSrc={project.afterSrc}
										alt={project.alt}
										size="lg"
										showLabels={true}
									/>
								</div>

								<div
									className={`space-y-6 motion-fade-in motion-delay-700 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
								>
									<div className="motion-slide-up motion-delay-800">
										<h3 className="text-2xl md:text-3xl font-bold mb-4">
											{project.title}
										</h3>
										<p className="text-[var(--color-muted)] text-lg leading-relaxed">
											{project.subtitle}
										</p>
									</div>

									<div className="space-y-4 motion-scale-in motion-delay-900">
										<h4 className="text-lg font-semibold text-[var(--color-fg)]">
											{t("benefitsTitle")}
										</h4>
										<ul className="space-y-3">
											{project.improvements.map((improvement, idx) => (
												<li
													key={idx}
													className="flex items-start gap-3 motion-fade-in motion-delay-1000"
												>
													<div className="w-2 h-2 border-2 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0" />
													<span className="text-[var(--color-fg-soft)] leading-relaxed">
														{improvement}
													</span>
												</li>
											))}
										</ul>
									</div>

									<div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/5 to-[var(--color-accent-alt)]/5 border border-[var(--color-accent)]/20 motion-scale-in motion-delay-1100">
										<h5 className="font-semibold text-[var(--color-accent)] mb-2 motion-slide-up motion-delay-1200">
											{t("resultsTitle")}
										</h5>
										<div className="grid grid-cols-2 gap-4 text-sm">
											<div className="text-center motion-fade-in motion-delay-1300">
												<div className="text-2xl font-bold text-[var(--color-accent)] motion-wiggle motion-delay-1400">
													+150%
												</div>
												<div className="text-[var(--color-muted)]">
													{t("metrics.visits")}
												</div>
											</div>
											<div className="text-center motion-fade-in motion-delay-1400">
												<div className="text-2xl font-bold text-[var(--color-accent)] motion-wiggle motion-delay-1500">
													+80%
												</div>
												<div className="text-[var(--color-muted)]">
													{t("metrics.contacts")}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

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
