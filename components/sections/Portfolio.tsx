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

	// Sélectionner 2 projets pour les études de cas
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
				<p className="lead mb-12 text-center motion-slide-up motion-delay-100 motion-duration-1000 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
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
						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
							{projects.map((project, index) => (
								<div
									key={project.id}
									className="group cursor-pointer motion-scale-in motion-delay-400 motion-intersect-start motion-intersect-end motion-intersect-threshold-50"
									onClick={() => openModal(project.id)}
								>
									<div className="relative overflow-hidden rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 motion-slide-up motion-delay-500">
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
										<div className="p-4">
											<h3 className="font-semibold text-[var(--color-fg)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
												{project.title}
											</h3>
											<p className="text-sm text-[var(--color-muted)] leading-relaxed">
												{project.subtitle}
											</p>
										</div>
										<div className="absolute inset-0 bg-[var(--color-accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
											<div className="px-4 py-2 rounded-full bg-[var(--color-card)]/90 backdrop-blur-sm text-sm font-medium text-[var(--color-accent)]">
												{t("viewDetails")}
											</div>
										</div>
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
