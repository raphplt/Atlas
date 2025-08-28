import Image from "next/image";
import { Card } from "@/components/ui/card";

const testimonials = [
	{
		name: "Jean Dupont",
		role: "Menuisier",
		text: "Refonte impeccable : plus pro, plus d'appels.",
		avatar: "/images/placeholders/after.png",
	},
	{
		name: "Sophie Martin",
		role: "Plombière",
		text: "Site moderne livré en une semaine, simple et efficace.",
		avatar: "/images/placeholders/after.png",
	},
	{
		name: "Alex Leroy",
		role: "Peintre",
		text: "Résultats rapides : +30% de demandes.",
		avatar: "/images/placeholders/after.png",
	},
];

export function Testimonials() {
	return (
		<section className="container py-24" id="temoignages">
			<h2 className="h2 text-center mb-6">Témoignages</h2>
			<p className="lead mb-12">Des clients locaux satisfaits (placeholders).</p>
			<div className="grid gap-6 md:grid-cols-3">
				{testimonials.map((t) => (
					<Card key={t.name} className="p-6 flex flex-col gap-4">
						<div className="flex items-center gap-3">
							<div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--color-border)]">
								<Image src={t.avatar} alt={t.name} fill className="object-cover" />
							</div>
							<div>
								<p className="font-semibold leading-tight">{t.name}</p>
								<p className="text-xs text-[var(--color-muted)]">{t.role}</p>
							</div>
						</div>
						<p className="text-sm text-[var(--color-fg-soft)]">“{t.text}”</p>
					</Card>
				))}
			</div>
		</section>
	);
}
