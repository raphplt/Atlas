"use client";
import { projects } from "@/content/projects";
import { getProjectsByCategory } from "@/content/projects";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function Portfolio() {
	const [selectedProject, setSelectedProject] = useState<string | null>(null);
	const t = useTranslations("portfolio");

    // Show all projects for the case studies
	const featuredProjects = projects.slice(0, 4);

	return (
		<section className="py-24 bg-[var(--color-background)]" id="portfolio">
			<div className="container-width">
				<div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-block mb-4 text-xs font-bold tracking-widest uppercase text-[var(--color-accent)]">
                        {t("tabs.caseStudies").toUpperCase()}
                    </div>
					<h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6">{t("title")}</h2>
					<p className="text-lg text-[var(--color-muted)]">
						{t("subtitle")}
					</p>
				</div>

                <div className="space-y-24">
                    {featuredProjects.map((project, index) => (
                        <div key={project.id} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Visual Side */}
                            <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                <div className="rounded-xl overflow-hidden">
                                    <BeforeAfterSlider
                                        beforeSrc={project.beforeSrc}
                                        afterSrc={project.afterSrc}
                                        alt={project.alt}
                                        size="lg"
                                        showLabels={true}
                                    />
                                </div>
                                {/* Technical Details - moved outside the image for cleanliness */}
                                <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
                                    <span className="font-semibold text-[var(--color-primary)]">{project.title}</span>
                                    <span>•</span>
                                    <span>{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4">{project.title}</h3>
                                <p className="text-lg text-[var(--color-muted)] leading-relaxed mb-8">
                                    {project.subtitle}
                                </p>

                                <div className="space-y-8">
                                    {/* Problem/Solution/Result Grid is implicitly handled by the benefits list and results box */}
                                    
                                    <div>
                                        <h4 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wide mb-4 border-b border-[var(--color-border)] pb-2 inline-block">
                                            {t("benefitsTitle")}
                                        </h4>
                                        <ul className="space-y-3">
                                            {project.improvements.map((improvement, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-[var(--color-foreground)]">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                                                    <span>{improvement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Results Box */}
                                    <div className="bg-[var(--color-background-alt)] rounded-lg p-6 border border-[var(--color-border)]">
                                        <h4 className="text-sm font-bold text-[var(--color-primary)] mb-4">
                                            {t("resultsTitle")}
                                        </h4>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <div className="text-3xl font-bold text-[var(--color-accent)] mb-1">+150%</div>
                                                <div className="text-sm text-[var(--color-muted)] font-medium uppercase tracking-wide">{t("metrics.visits")}</div>
                                            </div>
                                            <div>
                                                <div className="text-3xl font-bold text-[var(--color-accent)] mb-1">+80%</div>
                                                <div className="text-sm text-[var(--color-muted)] font-medium uppercase tracking-wide">{t("metrics.contacts")}</div>
                                            </div>
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
