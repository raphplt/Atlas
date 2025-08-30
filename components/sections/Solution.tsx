import { Card } from "@/components/ui/card";
import { ShieldCheck, TrendingUp, MapPin } from "lucide-react";

const items = [
	{
		title: "Crédibilité instantanée",
		body: "Design premium, hiérarchie claire, éléments de confiance.",
		icon: ShieldCheck,
	},
	{
		title: "Conversion optimisée",
		body: "CTA visibles, formulaires rapides, preuve sociale.",
		icon: TrendingUp,
	},
	{
		title: "Visibilité locale",
		body: "Structure SEO + optimisation Google Business Profile.",
		icon: MapPin,
	},
];

export function Solution() {
	return (
		<section className="relative py-32" id="solution">
			<div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-accent)]/10 via-transparent to-transparent" />
			<div className="container">
				<h2 className="h2 text-center mb-6">Ce que nous apportons</h2>
				<p className="text-center text-[var(--color-muted)] mb-14 max-w-2xl mx-auto">
					Une approche orientée performance : chaque bloc a une fonction mesurable.
				</p>
				<div className="grid gap-8 md:grid-cols-3">
					{items.map((it) => (
						<Card key={it.title} className="p-8 card-glow">
							<div className="icon-circle mb-6">
								<it.icon className="size-5" />
							</div>
							<h3 className="text-lg font-semibold mb-2 tracking-tight">{it.title}</h3>
							<p className="text-sm leading-relaxed text-[var(--color-muted)]">
								{it.body}
							</p>
						</Card>
					))}
				</div>
				<div className="mt-14 grid md:grid-cols-3 gap-6 text-xs text-[var(--color-muted)]">
					{[
						"Formulaire optimisé",
						"Google Maps intégré",
						"Tracking analytics",
						"Structure SEO locale",
						"Performance & vitesse",
						"Maintenance simple",
					].map((f) => (
						<div
							key={f}
							className="flex items-center gap-2 p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]/60"
						>
							<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
							{f}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
