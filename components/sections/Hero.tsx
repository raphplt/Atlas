import { buttonVariants } from "@/components/ui/button";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";

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
					Un site qui transforme vos visiteurs
					<br /> en <span className="gradient-text">clients locaux</span>
				</h1>
				<p className="lead mb-12 max-w-3xl">
					Livraison en ≤ 10 jours. Expérience mobile irréprochable. Structure conçue
					pour déclencher appels & demandes de devis.
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
				<div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
					{/* Texte d'accroche */}
					<div className="text-left space-y-6">
						<div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full btn-outline-gradient text-[10px] md:text-xs font-medium tracking-[.15em] uppercase text-[var(--color-muted)] backdrop-blur-sm">
							<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
							Exemple concret
						</div>
						<h3 className="text-2xl md:text-3xl font-bold">Avant / Après</h3>
						<p className="text-[var(--color-muted)] leading-relaxed">
							Découvrez l'impact visuel d'une refonte professionnelle. Glissez pour
							comparer l'ancien site avec le nouveau.
						</p>
					</div>

					{/* Slider interactif */}
					<div className="relative">
						<div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs px-3 py-1 rounded-full bg-[var(--color-bg)]/80 border border-[var(--color-border)]">
							Site Coiffeur
						</div>
						<BeforeAfterSlider
							beforeSrc="/images/screenshots/before/coiffeur.png"
							afterSrc="/images/screenshots/after/coiffeur.png"
							alt="Refonte site coiffeur"
							size="lg"
							showLabels={true}
						/>
					</div>
				</div>
				<ul className="flex flex-wrap justify-center gap-3 mt-14 text-[11px] md:text-xs font-medium">
					{[
						"≤ 10 jours",
						"Mobile-first",
						"Optimisation locale",
						"Design premium",
						"Google Maps",
						"Prix fixe",
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
