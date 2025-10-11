"use client";
import { projects } from "@/content/projects";
import { getProjectsByCategory } from "@/content/projects";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { ProjectModal } from "@/components/ui/project-modal";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
		<section className="relative py-20 sm:py-32 overflow-hidden" id="portfolio">
			<div
				className="absolute inset-0 pattern-grid opacity-30"
				aria-hidden="true"
			/>
			<div className="aurora a1" />
			<div className="aurora a2" />
			<div className="container relative">
				<h2 className="h2 text-center mb-4 sm:mb-6">{t("title")}</h2>
				<p className="lead mb-8 sm:mb-12 text-center line-clamp-2">
					{t("subtitle")}
				</p>

				<div className="flex justify-center mb-8 sm:mb-12">
					<div className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]/50 backdrop-blur-sm p-1">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id as "gallery" | "case-studies")}
								className={`px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-md transition-all ${
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
					<div className="space-y-8 sm:space-y-12">
						<div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{projects.map((project, index) => (
								<div
									key={project.id}
									className="group cursor-pointer"
									onClick={() => openModal(project.id)}
								>
									<div className="project-card relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--color-card)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] flex flex-col h-full">
										<div className="floating-badge absolute top-2 sm:top-3 right-2 sm:right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
											<div className="metric-badge px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] text-white text-[10px] sm:text-xs font-semibold shadow-lg">
												+150% visites
											</div>
										</div>

										<div className="aspect-[4/3] relative overflow-hidden">
											<div className="grid grid-cols-2 h-full">
												<div className="relative">
													<Image
														src={project.beforeSrc}
														alt={`${project.alt} - Avant`}
														fill
														sizes="(max-width: 768px) 50vw, 25vw"
														className="object-cover rounded-tl-2xl sm:rounded-tl-3xl"
													/>
												</div>
												<div className="relative">
													<Image
														src={project.afterSrc}
														alt={`${project.alt} - Après`}
														fill
														sizes="(max-width: 768px) 50vw, 25vw"
														className="object-cover rounded-tr-2xl sm:rounded-tr-3xl"
													/>
												</div>
											</div>
											<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										</div>

										<div className="p-3 sm:p-5 relative flex flex-col h-full">
											<div className="flex items-center gap-2 mb-2 sm:mb-3">
												<div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)]" />
												<span className="text-[10px] sm:text-xs font-medium text-[var(--color-accent)] uppercase tracking-wide">
													{project.category === "beauty"
														? "Beauté"
														: project.category === "services"
															? "Services"
															: project.category === "landscape"
																? "Paysage"
																: "Créatif"}
												</span>
											</div>

											<h3 className="font-bold text-sm sm:text-lg text-[var(--color-fg)] mb-1 sm:mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
												{project.title}
											</h3>

											<div className="flex-1 flex flex-col">
												<p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed mb-2 sm:mb-3 min-h-[2rem] sm:min-h-[2.5rem] flex items-start">
													{project.subtitle}
												</p>

												<div className="flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-xs text-[var(--color-muted)] mt-auto">
													{project.improvementWords.map((word, index) => (
														<div
															key={index}
															className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-100border border-gray-200"
														>
															<div className="w-1.5 h-1.5 rounded-full bg-green-500" />
															<span className="font-medium text-gray-700">{word}</span>
														</div>
													))}
												</div>
											</div>
										</div>

										<div className="absolute inset-0 bg-[var(--color-accent)]/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl sm:rounded-3xl flex items-center justify-center backdrop-blur-sm">
											<div className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-[var(--color-card)]/95 backdrop-blur-sm text-xs sm:text-sm font-semibold text-[var(--color-accent)] shadow-lg border border-[var(--color-accent)]/20 transform scale-95 group-hover:scale-100 transition-transform duration-300">
												{t("viewDetails")} →
											</div>
										</div>

										<div className="project-card-shimmer" />
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{activeTab === "case-studies" && (
					<div className="space-y-16 sm:space-y-24">
						{featuredProjects.map((project, index) => (
							<div
								key={project.id}
								className={`grid lg:grid-cols-2 gap-8 sm:gap-12 items-center ${
									index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
								}`}
							>
								<div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
									<div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] md:text-xs px-2 sm:px-3 py-1 rounded-full bg-[var(--color-bg)]/80 border border-[var(--color-border)]">
										{project.title}
									</div>
									<BeforeAfterSlider
										beforeSrc={project.beforeSrc}
										afterSrc={project.afterSrc}
										alt={project.alt}
										size="lg"
										showLabels={true}
										className="mt-4"
									/>
								</div>

								<div
									className={`space-y-4 sm:space-y-6 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
								>
									<div>
										<h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
											{project.title}
										</h3>
										<p className="text-[var(--color-muted)] text-base sm:text-lg leading-relaxed">
											{project.subtitle}
										</p>
									</div>

									<div className="space-y-3 sm:space-y-4">
										<h4 className="text-base sm:text-lg font-semibold text-[var(--color-fg)]">
											{t("benefitsTitle")}
										</h4>
										<ul className="space-y-2 sm:space-y-3 flex flex-col gap-2">
											{project.improvements.map((improvement, idx) => (
												<li key={idx} className="flex items-start gap-2 sm:gap-3 w-full">
													<div className="w-1.5 h-1.5 sm:w-2 sm:h-2 border-2 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0" />
													<span className="text-sm sm:text-base text-[var(--color-fg-soft)] leading-relaxed ">
														{improvement}
													</span>
												</li>
											))}
										</ul>
									</div>

									<div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/5 to-[var(--color-accent-alt)]/5 border border-[var(--color-accent)]/20">
										<h5 className="font-semibold text-[var(--color-accent)] mb-2">
											{t("resultsTitle")}
										</h5>
										<div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
											<div className="text-center">
												<div className="text-xl sm:text-2xl font-bold text-[var(--color-accent)]">
													+150%
												</div>
												<div className="text-[var(--color-muted)]">
													{t("metrics.visits")}
												</div>
											</div>
											<div className="text-center">
												<div className="text-xl sm:text-2xl font-bold text-[var(--color-accent)]">
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
