"use client";
import { useState, useEffect } from "react";
import { BeforeAfterSlider } from "./before-after-slider";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Maximize2, X } from "lucide-react";
import * as React from "react";
import { HairdresserHeroAfter } from "../showcase/hairdresser-after";
import { PlumberHeroAfter } from "../showcase/plumber-hero-after";
import { LandscaperHeroAfter } from "../showcase/landscaper-after";
import { PhotographerHeroAfter } from "../showcase/photographer-after";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

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
	const t = useTranslations("projectModal");
	const router = useRouter();

	// Gestion de la touche Échap
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				if (showShowcase) {
					setShowShowcase(false);
				} else {
					onClose();
				}
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}
	}, [isOpen, showShowcase, onClose]);

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

	const handleClickCTA = async () => {
		onClose();
		router.push("/#contact");
	};

	if (showShowcase) {
		return (
			<div className="fixed inset-0 z-50 bg-white">
				{/* Bouton de fermeture en mode showcase */}
				<button
					onClick={() => setShowShowcase(false)}
					className="fixed top-4 right-4 z-[100] p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
					aria-label={t("close")}
					title={`${t("close")} (Échap)`}
				>
					<X className="w-6 h-6" />
				</button>

				{/* Indication de la touche Échap */}
				<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[100] px-4 py-2 rounded-full bg-black/30 text-white text-sm backdrop-blur-sm border border-white/20">
					{t("closeHint")}
				</div>

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
				p-0 gap-0 overflow-hidden rounded-3xl border border-[var(--color-border)]
				bg-[var(--color-card)] shadow-[var(--shadow)]
			"
			>
				<DialogHeader className="modal-header-gradient relative px-8 lg:px-12 py-6 lg:py-8 border-b border-[var(--color-border)]">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="px-3 py-1 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] text-white text-xs font-semibold">
								{t(`categories.${project.id}`)}
							</div>
							<div className="flex items-center gap-3">
								<DialogTitle className="text-2xl md:text-3xl font-bold text-[var(--color-fg)]">
									{project.title}
								</DialogTitle>
								<button
									onClick={() => setShowShowcase(true)}
									className="p-2 rounded-xl hover:bg-[var(--color-bg-alt)] transition-all duration-300 hover:scale-105 group"
									aria-label={t("fullscreen")}
									title={t("fullscreen")}
								>
									<Maximize2 className="w-4 h-4 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors" />
								</button>
							</div>
						</div>
					</div>

					<div className="flex items-center gap-6 mt-4">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
							<span className="text-sm font-semibold text-[var(--color-accent)]">
								{t("metrics.visits")}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
							<span className="text-sm font-semibold text-[var(--color-accent)]">
								{t("metrics.contacts")}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
							<span className="text-sm font-semibold text-[var(--color-accent)]">
								{t("metrics.mobileFirst")}
							</span>
						</div>
					</div>
				</DialogHeader>

				<ScrollArea className="max-h-[82vh]">
					<div className="p-8 lg:p-12">
						<div className="grid gap-16 lg:grid-cols-2">
							<div className="space-y-6">
								<div className="text-center">
									<h3 className="text-xl font-bold text-[var(--color-fg)] mb-2">
										{t("transformation.title")}
									</h3>
									<p className="text-sm text-[var(--color-muted)]">
										{t("transformation.subtitle")}
									</p>
								</div>
								<BeforeAfterSlider
									beforeSrc={project.beforeSrc}
									afterSrc={project.afterSrc}
									alt={project.alt}
									size="lg"
									showLabels={true}
								/>

								<div className="p-6 rounded-3xl bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent-alt)]/10 border border-[var(--color-accent)]/20">
									<h3 className="text-xl font-bold text-[var(--color-fg)] mb-4 flex items-center gap-3">
										<div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] flex items-center justify-center">
											<span className="text-white text-sm font-bold">✓</span>
										</div>
										{t("results.title")}
									</h3>
									<div className="grid grid-cols-2 gap-4 mb-6">
										<div className="metric-badge text-center p-4 rounded-2xl bg-[var(--color-card)]/50 backdrop-blur-sm">
											<div className="metric-pulse text-2xl font-bold text-[var(--color-accent)] mb-1">
												+150%
											</div>
											<div className="text-xs text-[var(--color-muted)]">
												{t("results.visits")}
											</div>
										</div>
										<div className="metric-badge text-center p-4 rounded-2xl bg-[var(--color-card)]/50 backdrop-blur-sm">
											<div className="metric-pulse text-2xl font-bold text-[var(--color-accent)] mb-1">
												+80%
											</div>
											<div className="text-xs text-[var(--color-muted)]">
												{t("results.contacts")}
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="space-y-6">
								<div>
									<h4 className="text-lg font-semibold mb-6 text-[var(--color-fg)] flex items-center gap-2">
										<div className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] flex items-center justify-center">
											<span className="text-white text-xs">⚡</span>
										</div>
										{t("improvements.title")}
									</h4>
									<div className="space-y-4">
										{project.improvements.map((improvement, index) => (
											<div
												key={index}
												className="improvement-card group p-4 rounded-2xl bg-[var(--color-bg-alt)]/50 hover:bg-[var(--color-bg-alt)] border border-[var(--color-border)]/50 hover:border-[var(--color-accent)]/30"
											>
												<div className="flex items-start gap-4">
													<div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] flex items-center justify-center flex-shrink-0 mt-1">
														<span className="text-white text-sm font-bold">{index + 1}</span>
													</div>
													<div>
														<p className="text-[var(--color-fg-soft)] leading-relaxed font-medium">
															{improvement}
														</p>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>

								<div className="p-6 rounded-3xl bg-gradient-to-r from-[var(--color-accent)]/5 to-[var(--color-accent-alt)]/5 border-2 border-[var(--color-accent)]/20">
									<h5 className="font-bold text-[var(--color-accent)] mb-3 text-lg">
										{t("cta.title")}
									</h5>
									<p className="text-[var(--color-fg-soft)] text-sm leading-relaxed mb-4">
										{t("cta.description")}
									</p>
									<button
										onClick={handleClickCTA}
										className="w-full cursor-pointer px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
									>
										{t("cta.button")}
									</button>
								</div>
							</div>
						</div>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
