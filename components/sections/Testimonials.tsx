import Image from "next/image";
import { Card } from "@/components/ui/card";

interface Testimonial {
	name: string;
	role: string;
	text: string;
	avatar: string;
	highlight?: boolean;
}

const testimonials: Testimonial[] = [
	{
		name: "Mickaël Roussel",
		role: "Menuisier",
		text: "Refonte impeccable : image plus pro, et beaucoup plus d'appels.",
		avatar: "/images/testimonials/mickael.jpg",
		highlight: true,
	},
	{
		name: "Karima Bensaïd",
		role: "Plombière",
		text:
			"Site moderne livré en une semaine, mes clients trouvent enfin mes services facilement.",
		avatar: "/images/testimonials/karima.jpg",
	},
	{
		name: "Didier Lemoine",
		role: "Peintre en bâtiment",
		text:
			"Résultats rapides : +30% de demandes de devis depuis la mise en ligne.",
		avatar: "/images/testimonials/didier.jpg",
	},
	{
		name: "Claire Doucet",
		role: "Paysagiste",
		text:
			"Process fluide, rendu très qualitatif. Mes clients me prennent plus au sérieux.",
		avatar: "/images/testimonials/claire.jpg",
	},
];

export function Testimonials() {
	return (
		<section className="relative py-32 overflow-hidden" id="temoignages">
			<div
				className="absolute inset-0 tm-gradient opacity-60"
				aria-hidden="true"
			/>
			<div className="container relative">
				<h2 className="h2 text-center mb-6">Témoignages</h2>
				<p className="mb-16 text-sm md:text-base font-medium tracking-wide flex items-center justify-center gap-4 text-[var(--color-muted)]">
					<span className="hidden sm:inline-block h-px w-16 bg-gradient-to-r from-transparent via-[var(--color-border)] to-[var(--color-accent)]" />
					<span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] bg-clip-text text-transparent whitespace-nowrap">
						Ce qu'en disent nos clients
					</span>
					<span className="hidden sm:inline-block h-px w-16 bg-gradient-to-r from-[var(--color-accent-alt)] via-[var(--color-border)] to-transparent" />
				</p>
				<div className="grid gap-8 md:grid-cols-5 items-stretch">
					{/* Carte highlight */}
					{testimonials
						.filter((t) => t.highlight)
						.map((t) => (
							<Card
								key={t.name}
								className="md:col-span-2 p-10 flex flex-col justify-between relative overflow-hidden shadow-[var(--shadow)]"
							>
								<span className="quote-icon">“</span>
								<div className="flex items-center gap-4 mb-6">
									<div className="relative w-16 h-16 rounded-full overflow-hidden border border-[var(--color-border)]">
										<Image src={t.avatar} alt={t.name} fill className="object-cover" />
									</div>
									<div>
										<p className="font-semibold text-lg leading-tight">{t.name}</p>
										<p className="text-xs text-[var(--color-muted)]">{t.role}</p>
									</div>
								</div>
								<p className="text-base leading-relaxed text-[var(--color-fg-soft)] mb-8">
									{t.text}
								</p>
								<div className="flex gap-1 text-xs" aria-label="Note 5/5">
									{Array.from({ length: 5 }).map((_, i) => (
										<span key={i} className="star">
											★
										</span>
									))}
								</div>
							</Card>
						))}
					{/* Grille des autres */}
					<div className="md:col-span-3 grid gap-6 sm:grid-cols-2">
						{testimonials
							.filter((t) => !t.highlight)
							.map((t) => (
								<Card
									key={t.name}
									className="p-6 flex flex-col gap-4 relative overflow-hidden"
								>
									<div className="flex items-center gap-3">
										<div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--color-border)]">
											<Image src={t.avatar} alt={t.name} fill className="object-cover" />
										</div>
										<div>
											<p className="font-semibold leading-tight">{t.name}</p>
											<p className="text-xs text-[var(--color-muted)]">{t.role}</p>
										</div>
									</div>
									<p className="text-sm text-[var(--color-fg-soft)] leading-relaxed">
										“{t.text}”
									</p>
								</Card>
							))}
					</div>
				</div>
				{/* Marquee */}
				<div className="marquee mt-14 py-3 border-y border-[var(--color-border)] text-[11px] tracking-wide uppercase font-medium text-[var(--color-muted)]">
					<div className="marquee-track">
						{Array.from({ length: 2 }).map((_, loop) => (
							<span key={loop} className="flex gap-6">
								<span className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
									+30% demandes
								</span>
								<span className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
									Crédibilité renforcée
								</span>
								<span className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
									Process rapide
								</span>
								<span className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
									Design premium
								</span>
								<span className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
									Optimisation locale
								</span>
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
