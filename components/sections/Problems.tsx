import { Card } from "@/components/ui/card";
import { FileWarning, MapPinOff, PhoneOff } from "lucide-react";

const items = [
	{
		title: "Site non mobile",
		body: "60%+ de vos visiteurs partent frustrés.",
		icon: PhoneOff,
	},
	{
		title: "Pas de devis rapide",
		body: "Vous perdez des prospects chauds.",
		icon: FileWarning,
	},
	{
		title: "Invisible en local",
		body: "Vos voisins ne vous trouvent pas.",
		icon: MapPinOff,
	},
];

export function Problems() {
	return (
		<section className="relative py-32" id="problemes">
			<div
				className="absolute inset-0 pattern-grid opacity-40"
				aria-hidden="true"
			/>
			<div className="container relative">
				<h2 className="h2 text-center mb-6">Ce qui vous freine</h2>
				<p className="text-center text-[var(--color-muted)] mb-14 max-w-2xl mx-auto">
					Des obstacles simples à corriger qui bloquent votre crédibilité et vos
					conversions.
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
			</div>
		</section>
	);
}
