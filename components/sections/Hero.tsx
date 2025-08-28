import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
	return (
		<section className="relative pt-24 pb-32" id="hero">
			<div className="hero-bg" aria-hidden="true" />
			<div className="noise" aria-hidden="true" />
			<div className="container relative text-center">
				<div className="inline-block px-4 py-1 mb-6 rounded-full bg-[var(--color-bg-alt)]/60 border border-[var(--color-border)] text-xs font-medium tracking-wide uppercase text-[var(--color-muted)] backdrop-blur-sm">
					Sites vitrines premium
				</div>
				<h1 className="h1 mb-6 max-w-5xl mx-auto">
					Transformez votre présence locale avec un site{" "}
					<span className="gradient-text">ultra moderne</span>
				</h1>
				<p className="lead mb-10">
					Conçus pour convertir : plus d'appels, plus de demandes de devis. Livraison
					rapide (≤ 10 jours) et optimisation locale incluse.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
					<a
						href="#contact"
						className={buttonVariants({
							className: "relative overflow-hidden group font-semibold",
						})}
					>
						<span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] opacity-0 group-hover:opacity-100 transition" />
						<span className="relative">Réserver un appel</span>
					</a>
					<a
						href="#offres"
						className={buttonVariants({
							variant: "ghost",
							className: "font-semibold",
						})}
					>
						Voir les offres
					</a>
				</div>
				<div className="mx-auto max-w-5xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/50 backdrop-blur-sm p-4 shadow-[var(--shadow)]">
					<div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-alt)]/20 flex items-center justify-center">
						{/* Placeholder for video / mockup */}
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#fff2,transparent_60%)] mix-blend-overlay" />
						<div className="text-sm md:text-base font-medium text-[var(--color-muted)]">
							Mockup / Vidéo de démo (placeholder)
						</div>
						<Image
							src="/images/placeholders/after.png"
							alt="Mockup"
							fill
							className="object-cover opacity-0"
						/>
					</div>
				</div>
				<ul className="flex flex-wrap justify-center gap-3 mt-10 text-xs md:text-sm text-[var(--color-muted)]">
					{[
						"≤ 10 jours",
						"Mobile-first",
						"Optimisé local",
						"Prix fixe",
						"Conversion",
						"Design premium",
					].map((b) => (
						<li
							key={b}
							className="px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-alt)]/60 backdrop-blur-sm"
						>
							{b}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
