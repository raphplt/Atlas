import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
	return (
		<section className="relative pt-28 pb-40 overflow-hidden" id="hero">
			<div className="hero-bg" aria-hidden="true" />
			<div className="noise" aria-hidden="true" />
			<div className="aurora a1" />
			<div className="aurora a2" />
			<div className="container relative text-center">
				<div className="inline-flex items-center gap-2 px-5 py-1.5 mb-7 rounded-full btn-outline-gradient text-[10px] md:text-xs font-medium tracking-[.15em] uppercase text-[var(--color-muted)] backdrop-blur-sm">
					<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />{" "}
					Sites vitrines premium
				</div>
				<h1 className="h1 mb-8 max-w-6xl mx-auto">
					Un site qui transforme vos visites
					<br /> en <span className="gradient-text">clients locaux</span>
				</h1>
				<p className="lead mb-12 max-w-3xl">
					Conception rapide (≤ 10 jours), expérience mobile parfaite, structure
					pensée pour générer appels & demandes de devis.
				</p>
				<div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
					<a
						href="#contact"
						className={buttonVariants({
							className: "btn-base h-14 px-10 text-base font-semibold tracking-wide",
						})}
					>
						Réserver un appel
					</a>
					<a
						href="#offres"
						className={buttonVariants({
							variant: "ghost",
							className:
								"h-14 px-10 text-base font-semibold tracking-wide btn-outline-gradient",
						})}
					>
						Voir les offres
					</a>
				</div>
				<div className="mx-auto max-w-6xl rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/60 backdrop-blur p-5 shadow-[var(--shadow)] relative">
					<div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs px-3 py-1 rounded-full bg-[var(--color-bg)]/80 border border-[var(--color-border)]">
						Aperçu
					</div>
					<div className="relative aspect-[16/8] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-accent)]/15 via-[var(--color-accent-alt)]/15 to-[var(--color-accent)]/10 flex items-center justify-center">
						<div className="absolute inset-0 pattern-grid opacity-30" />
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#fff3,transparent_60%)] mix-blend-overlay" />
						<div className="text-sm md:text-base font-medium text-[var(--color-muted)]">
							Mockup / Vidéo (placeholder)
						</div>
						<Image
							src="/images/placeholders/after.png"
							alt="Mockup"
							fill
							className="object-cover opacity-0"
						/>
					</div>
				</div>
				<ul className="flex flex-wrap justify-center gap-3 mt-14 text-[11px] md:text-xs font-medium">
					{[
						"≤ 10 jours",
						"Mobile-first",
						"Google Maps",
						"Prix fixe",
						"Optimisation locale",
						"Design premium",
						"Tracking analytics",
					].map((b) => (
						<li
							key={b}
							className="px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/70 backdrop-blur-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition"
						>
							{b}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
