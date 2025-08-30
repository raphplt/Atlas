import { PhoneCall, FileCheck2, Code2, Rocket } from "lucide-react";

type Step = {
	title: string;
	desc: string;
	icon: any; // lucide component
	duration: string;
};

const steps: Step[] = [
	{
		title: "Call gratuit",
		desc: "On cerne l'activité, objectifs, différenciation.",
		icon: PhoneCall,
		duration: "30 min",
	},
	{
		title: "Devis clair",
		desc: "Portée définie, plan du site, timing confirmé.",
		icon: FileCheck2,
		duration: "< 24h",
	},
	{
		title: "Création",
		desc: "Design + intégration + contenus. Points d'étape.",
		icon: Code2,
		duration: "5–7 j",
	},
	{
		title: "Mise en ligne",
		desc: "Tests, performance, SEO local, suivi analytics.",
		icon: Rocket,
		duration: "1 j",
	},
];

export function Process() {
	return (
		<section className="relative py-32 overflow-hidden" id="process">
			<div
				className="absolute inset-0 pattern-grid opacity-30"
				aria-hidden="true"
			/>
			<div className="container relative">
				<h2 className="h2 text-center mb-6">Étapes</h2>
				<p className="text-center text-[var(--color-muted)] mb-16 max-w-2xl mx-auto">
					Méthode courte, structurée et itérative — toujours orientée résultat.
				</p>
				<ol className="relative flex flex-col md:flex-row md:items-stretch gap-10 md:gap-8">
					{/* Ligne de progression (desktop) */}
					<div
						className="hidden md:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent"
						aria-hidden="true"
					/>
					{steps.map((step, i) => {
						const Icon = step.icon;
						return (
							<li key={step.title} className="relative flex-1 group">
								{/* Connector vertical mobile */}
								{i < steps.length - 1 && (
									<span
										className="md:hidden absolute left-8 top-[72px] h-10 w-px bg-[var(--color-border)]"
										aria-hidden="true"
									/>
								)}
								<div className="card-glow h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]/70 backdrop-blur-sm p-6 flex flex-col hover:-translate-y-1 transition relative">
									<div className="flex items-center gap-4 mb-4">
										<div className="relative">
											<div className="icon-circle size-[52px] flex items-center justify-center">
												<Icon className="size-5" />
											</div>
											<span className="absolute -bottom-1 -right-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
												{i + 1}
											</span>
										</div>
										<div>
											<h3 className="font-semibold leading-tight tracking-tight">
												{step.title}
											</h3>
											<p className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] font-medium mt-1">
												{step.duration}
											</p>
										</div>
									</div>
									<p className="text-sm text-[var(--color-muted)] leading-relaxed flex-1">
										{step.desc}
									</p>
									{i === steps.length - 1 && (
										<div className="mt-6 text-xs font-medium text-[var(--color-accent)] flex items-center gap-2">
											<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
											Mise en ligne + suivi initial
										</div>
									)}
								</div>
							</li>
						);
					})}
				</ol>
				<div className="mt-14 flex flex-col items-center gap-3">
					<div className="h-2 w-40 rounded-full bg-gradient-to-r from-[var(--color-accent)]/30 via-[var(--color-accent-alt)]/30 to-[var(--color-accent)]/30 relative overflow-hidden">
						<span className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent animate-[pulse_3s_ease-in-out_infinite]" />
					</div>
					<p className="text-center text-sm text-[var(--color-muted)]">
						Durée totale typique:{" "}
						<span className="font-medium text-[var(--color-fg)]">≤ 10 jours</span>
					</p>
				</div>
			</div>
		</section>
	);
}
