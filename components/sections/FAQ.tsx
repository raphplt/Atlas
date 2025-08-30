"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, Search, Minimize2, Maximize2 } from "lucide-react";

interface FaqItem {
	question: string;
	answer: string;
	id: string;
}

const rawFaqs: Omit<FaqItem, "id">[] = [
	{
		question: "Quels délais pour la création d’un site ?",
		answer:
			"Un site vitrine complet est livré en 7 à 10 jours maximum, selon la réactivité pour valider les contenus (textes, photos, logo). Le processus est rapide et structuré pour éviter les retards.",
	},
	{
		question: "Quels contenus dois-je fournir ?",
		answer:
			"Idéalement : votre logo, quelques photos de vos réalisations, la liste de vos services, vos coordonnées. Si vous n’avez pas tout, je peux vous proposer des textes optimisés et des images libres de droits.",
	},
	{
		question: "Dois-je gérer l’hébergement et le nom de domaine ?",
		answer:
			"Non, je m’occupe de tout. Je vous accompagne pour réserver un nom de domaine à votre nom et configurer un hébergement fiable. Vous êtes propriétaire du site et gardez un accès complet.",
	},
	{
		question: "Le site sera-t-il visible sur Google ?",
		answer:
			"Oui. Chaque site est livré optimisé pour le référencement local : structure claire, balises SEO, rapidité et compatibilité mobile. De plus, je peux créer ou améliorer votre fiche Google Business Profile pour renforcer votre visibilité locale.",
	},
	{
		question: "Puis-je mettre à jour mon site moi-même ?",
		answer:
			"Oui. Le site est conçu pour être simple à modifier. Je vous fournis un accès administrateur et une mini-formation pour faire des changements basiques (texte, photos, prix).",
	},
	{
		question: "Proposez-vous un suivi après la mise en ligne ?",
		answer:
			"Oui. Une option de maintenance mensuelle est disponible (30€/mois) : mises à jour techniques, sauvegardes, sécurité et petites modifications. Cela vous permet d’avoir un site toujours à jour et sécurisé.",
	},
	{
		question: "Comment se passe le paiement ?",
		answer:
			"Le paiement est simple et transparent : acompte de 30% au démarrage, solde à la livraison. Vous pouvez aussi régler en 2 fois sans frais. Pas de coûts cachés.",
	},
	{
		question: "Que se passe-t-il si je n’ai jamais eu de site ?",
		answer:
			"C’est fréquent, et je m’occupe de tout : réservation du domaine, hébergement, création du site, configuration email si besoin. Vous repartez avec une solution clé en main, prête à générer des clients.",
	},
];

function slugify(str: string) {
	return str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");
}

const faqs: FaqItem[] = rawFaqs.map((f) => ({ ...f, id: slugify(f.question) }));

export function FAQ() {
	const [query, setQuery] = useState("");
	const [openIds, setOpenIds] = useState<string[]>([faqs[0].id]);
	const listRef = useRef<HTMLDivElement | null>(null);

	// Auto-open if hash matches
	useEffect(() => {
		if (typeof window === "undefined") return;
		const hash = window.location.hash.replace("#", "");
		if (hash) {
			const exists = faqs.find((f) => f.id === hash);
			if (exists) setOpenIds((ids) => (ids.includes(hash) ? ids : [...ids, hash]));
		}
	}, []);

	const filtered = useMemo(() => {
		if (!query.trim()) return faqs;
		const q = query.toLowerCase();
		return faqs.filter(
			(f) =>
				f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
		);
	}, [query]);

	function toggle(id: string) {
		setOpenIds((ids) =>
			ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
		);
	}
	function expandAll() {
		setOpenIds(filtered.map((f) => f.id));
	}
	function collapseAll() {
		setOpenIds([]);
	}
	const allExpanded =
		filtered.length > 0 && filtered.every((f) => openIds.includes(f.id));

	return (
		<section className="relative py-32 overflow-hidden" id="faq">
			<div
				className="absolute inset-0 pattern-grid opacity-30"
				aria-hidden="true"
			/>
			<div className="container relative">
				<h2 className="h2 text-center mb-6">FAQ</h2>
				<p className="text-center text-sm text-[var(--color-muted)] mb-12 max-w-2xl mx-auto">
					Réponses aux questions fréquentes. Utilisez la recherche pour filtrer.
				</p>
				<div className="flex flex-col md:flex-row gap-4 md:items-center mb-10">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-muted)]" />
						<input
							placeholder="Rechercher une question (ex: paiement, google...)"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="w-full pl-9 pr-3 py-2 rounded-md bg-[var(--color-bg-alt)]/70 border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
							aria-label="Rechercher dans la FAQ"
						/>
					</div>
					<button
						onClick={() => (allExpanded ? collapseAll() : expandAll())}
						className="text-xs font-medium px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-card)]/70 hover:bg-[var(--color-bg-alt)] transition flex items-center gap-1"
						aria-label={allExpanded ? "Tout replier" : "Tout développer"}
					>
						{allExpanded ? (
							<Minimize2 className="size-3.5" />
						) : (
							<Maximize2 className="size-3.5" />
						)}
						{allExpanded ? "Replier tout" : "Tout ouvrir"}
					</button>
				</div>
				<div ref={listRef} className="space-y-4">
					{filtered.length === 0 && (
						<p className="text-sm text-[var(--color-muted)]">
							Aucun résultat. Essayez un autre terme.
						</p>
					)}
					{filtered.map((f) => {
						const isOpen = openIds.includes(f.id);
						return (
							<div
								key={f.id}
								id={f.id}
								className="group border border-[var(--color-border)] rounded-2xl bg-[var(--color-card)]/70 backdrop-blur-sm transition hover:border-[var(--color-accent)]/40"
							>
								<button
									onClick={() => toggle(f.id)}
									className="w-full flex items-start gap-4 text-left px-5 py-4"
									aria-expanded={isOpen}
									aria-controls={`panel-${f.id}`}
								>
									<div className="mt-1 rounded-full size-6 flex items-center justify-center bg-[var(--color-accent)]/15 text-[var(--color-accent)] text-xs font-semibold">
										{isOpen ? "-" : "+"}
									</div>
									<span className="font-medium flex-1 leading-snug pr-6">
										{f.question}
									</span>
									<ChevronDown
										className={`size-4 text-[var(--color-muted)] transition mt-1 ${
											isOpen ? "rotate-180 text-[var(--color-accent)]" : ""
										}`}
									/>
								</button>
								<div
									id={`panel-${f.id}`}
									role="region"
									aria-hidden={!isOpen}
									className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
										isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
									} px-5`}
								>
									<div className="overflow-hidden pb-5 pt-0 text-sm leading-relaxed text-[var(--color-muted)]">
										{f.answer}
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<p className="mt-12 text-center text-xs text-[var(--color-muted)]">
					Toujours une question ?{" "}
					<a href="#contact" className="text-[var(--color-accent)] hover:underline">
						Contactez-moi
					</a>
					.
				</p>
			</div>
		</section>
	);
}
