"use client";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { getProjectsByCategory } from "@/content/projects";

export function CaseStudies() {
	// Sélectionner 2 projets pour les études de cas (plombier et photographe)
	const featuredProjects = getProjectsByCategory("services")
		.concat(getProjectsByCategory("creative"))
		.slice(0, 2);

	return (
		<section className="relative py-32 overflow-hidden" id="etudes-de-cas">
			<div className="aurora a1" />
			<div className="aurora a2" />
			<div className="container relative">
				<h2 className="h2 text-center mb-6">Études de cas</h2>
				<p className="lead mb-16">
					Analyse détaillée de l'impact d'une refonte sur deux secteurs différents.
				</p>

				<div className="space-y-24">
					{featuredProjects.map((project, index) => (
						<div
							key={project.id}
							className={`grid lg:grid-cols-2 gap-12 items-center ${
								index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
							}`}
						>
							{/* Slider large */}
							<div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
								<div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs px-3 py-1 rounded-full bg-[var(--color-bg)]/80 border border-[var(--color-border)]">
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

							{/* Description des bénéfices */}
							<div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
								<div>
									<h3 className="text-2xl md:text-3xl font-bold mb-4">
										{project.title}
									</h3>
									<p className="text-[var(--color-muted)] text-lg leading-relaxed">
										{project.subtitle}
									</p>
								</div>

								<div className="space-y-4">
									<h4 className="text-lg font-semibold text-[var(--color-fg)]">
										Bénéfices concrets
									</h4>
									<ul className="space-y-3">
										{project.improvements.map((improvement, idx) => (
											<li key={idx} className="flex items-start gap-3">
												<div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0" />
												<span className="text-[var(--color-fg-soft)] leading-relaxed">
													{improvement}
												</span>
											</li>
										))}
									</ul>
								</div>

								<div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/5 to-[var(--color-accent-alt)]/5 border border-[var(--color-accent)]/20">
									<h5 className="font-semibold text-[var(--color-accent)] mb-2">
										Résultats mesurables
									</h5>
									<div className="grid grid-cols-2 gap-4 text-sm">
										<div className="text-center">
											<div className="text-2xl font-bold text-[var(--color-accent)]">
												+150%
											</div>
											<div className="text-[var(--color-muted)]">Visites</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-[var(--color-accent)]">
												+80%
											</div>
											<div className="text-[var(--color-muted)]">Contacts</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
