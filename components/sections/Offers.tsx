import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { offers } from "@/content/offers";

export function Offers() {
  return (
			<section className="relative py-32" id="offres">
				<div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-accent)]/8 via-transparent to-transparent" />
				<div className="container">
					<h2 className="h2 text-center mb-6">Offres claires</h2>
					<p className="text-center text-sm text-[var(--color-muted)] mb-12">
						Paiement en 2 fois possible — toutes les intégrations essentielles
						incluses.
					</p>
					<div className="grid gap-8 md:grid-cols-3">
						{offers.map((offer, i) => (
							<Card
								key={offer.name}
								className={`flex flex-col relative overflow-hidden ${
									i === 1 ? "ring-1 ring-[var(--color-accent)]" : ""
								}`}
							>
								{i === 1 && (
									<div className="absolute top-4 right-4 text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/40">
										Populaire
									</div>
								)}
								<div className="mb-6">
									<h3 className="text-xl font-semibold mb-1 tracking-tight">
										{offer.name}
									</h3>
									<p className="text-3xl font-bold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] bg-clip-text text-transparent">
										{offer.price}
									</p>
								</div>
								<ul className="flex-1 mb-8 space-y-2 text-sm text-[var(--color-muted)]">
									{offer.features.map((f) => (
										<li key={f} className="flex gap-2">
											<span className="w-1.5 h-1.5 mt-1 rounded-full bg-[var(--color-accent)]" />
											{f}
										</li>
									))}
								</ul>
								<a
									href="#contact"
									className={buttonVariants({ className: "w-full font-semibold" })}
								>
									Discuter de ce pack
								</a>
							</Card>
						))}
					</div>
				</div>
			</section>
		);
}
