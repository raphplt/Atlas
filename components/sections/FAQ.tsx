"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, Search, Minimize2, Maximize2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface FaqItem {
	question: string;
	answer: string;
	id: string;
}

function slugify(str: string) {
	return str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");
}

export function FAQ() {
	const t = useTranslations("faq");
	const [query, setQuery] = useState("");
	const listRef = useRef<HTMLDivElement | null>(null);

	const faqs: FaqItem[] = Array.from({ length: 8 }, (_, i) => {
		const question = t(`questions.${i}.question`);
		const answer = t(`questions.${i}.answer`);
		return {
			question,
			answer,
			id: slugify(question),
		};
	});
	const [openIds, setOpenIds] = useState<string[]>([faqs[0]?.id || ""]);

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
				<h2 className="h2 text-center mb-6 motion-fade-in motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("title")}
				</h2>
				<p className="text-center text-sm text-[var(--color-muted)] mb-12 max-w-2xl mx-auto motion-slide-up motion-delay-100 motion-duration-1000 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("subtitle")}
				</p>
				<div className="flex flex-col md:flex-row gap-4 md:items-center mb-10 motion-scale-in motion-delay-200 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					<div className="relative flex-1 motion-slide-up motion-delay-300">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-muted)] motion-wiggle motion-delay-400" />
						<input
							placeholder={t("searchPlaceholder")}
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="w-full pl-9 pr-3 py-2 rounded-md bg-[var(--color-bg-alt)]/70 border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
							aria-label="Rechercher dans la FAQ"
						/>
					</div>
					<button
						onClick={() => (allExpanded ? collapseAll() : expandAll())}
						className="text-xs font-medium px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-card)]/70 hover:bg-[var(--color-bg-alt)] transition flex items-center gap-1 motion-scale-in motion-delay-500"
						aria-label={allExpanded ? t("collapseAll") : t("expandAll")}
					>
						{allExpanded ? (
							<Minimize2 className="size-3.5" />
						) : (
							<Maximize2 className="size-3.5" />
						)}
						{allExpanded ? t("collapseAll") : t("expandAll")}
					</button>
				</div>
				<div ref={listRef} className="space-y-4">
					{filtered.length === 0 && (
						<p className="text-sm text-[var(--color-muted)] motion-fade-in motion-delay-600">
							{t("noResults")}
						</p>
					)}
					{filtered.map((f, index) => {
						const isOpen = openIds.includes(f.id);
						return (
							<div
								key={f.id}
								id={f.id}
								className="group border border-[var(--color-border)] rounded-2xl bg-[var(--color-card)]/70 backdrop-blur-sm transition hover:border-[var(--color-accent)]/40 motion-fade-in motion-delay-600 motion-intersect-start motion-intersect-end motion-intersect-threshold-50"
							>
								<button
									onClick={() => toggle(f.id)}
									className="w-full flex items-start gap-4 text-left px-5 py-4 motion-scale-in motion-delay-700"
									aria-expanded={isOpen}
									aria-controls={`panel-${f.id}`}
								>
									<div className="mt-1 rounded-full size-6 flex items-center justify-center bg-[var(--color-accent)]/15 text-[var(--color-accent)] text-xs font-semibold motion-wiggle motion-delay-800">
										{isOpen ? "-" : "+"}
									</div>
									<span className="font-medium flex-1 leading-snug pr-6 motion-slide-up motion-delay-900">
										{f.question}
									</span>
									<ChevronDown
										className={`size-4 text-[var(--color-muted)] transition mt-1 motion-scale-in motion-delay-1000 ${
											isOpen ? "rotate-180 text-[var(--color-accent)]" : ""
										}`}
									/>
								</button>
								<div
									id={`panel-${f.id}`}
									role="region"
									aria-hidden={!isOpen}
									className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out motion-fade-in motion-delay-1100 ${
										isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
									} px-5`}
								>
									<div className="overflow-hidden pb-5 pt-0 text-sm leading-relaxed text-[var(--color-muted)] motion-slide-up motion-delay-1200">
										{f.answer}
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<p className="mt-12 text-center text-xs text-[var(--color-muted)] motion-fade-in motion-delay-1300 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("stillHaveQuestion")}{" "}
					<a
						href="#contact"
						className="text-[var(--color-accent)] hover:underline motion-wiggle motion-delay-1400"
					>
						{t("contactMe")}
					</a>
					.
				</p>
			</div>
		</section>
	);
}
