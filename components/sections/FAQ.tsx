"use client";
import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
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

	return (
		<section className="py-24 bg-[var(--color-background)]" id="faq">
			<div className="container-width max-w-3xl">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[var(--color-primary)]">
					{t("title")}
				</h2>
				<p className="text-center text-[var(--color-muted)] mb-12 text-lg">
					{t("subtitle")}
				</p>
                
				<div className="relative mb-10">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[var(--color-muted)]" />
					<input
						placeholder={t("searchPlaceholder")}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="w-full pl-12 pr-4 py-4 rounded-xl border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all shadow-sm"
					/>
				</div>

				<div className="space-y-4">
					{filtered.length === 0 && (
						<p className="text-sm text-[var(--color-muted)] text-center">
							{t("noResults")}
						</p>
					)}
					{filtered.map((f) => {
						const isOpen = openIds.includes(f.id);
						return (
							<div
								key={f.id}
								className={`border rounded-lg transition-all duration-200 ${isOpen ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]' : 'border-[var(--color-border)] bg-[var(--color-background-alt)]/30'}`}
							>
								<button
									onClick={() => toggle(f.id)}
									className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
									aria-expanded={isOpen}
								>
									<span className={`font-semibold text-lg ${isOpen ? 'text-[var(--color-primary)]' : 'text-[var(--color-foreground)]'}`}>
										{f.question}
									</span>
									<ChevronDown
										className={`size-5 text-[var(--color-muted)] transition-transform duration-300 flex-shrink-0 ${
											isOpen ? "rotate-180 text-[var(--color-primary)]" : ""
										}`}
									/>
								</button>
								<div
									className={`grid transition-[grid-template-rows,padding] duration-300 ease-out ${
										isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr] pb-0"
									} px-6`}
								>
									<div className="overflow-hidden leading-relaxed text-[var(--color-muted)]">
										{f.answer}
									</div>
								</div>
							</div>
						);
					})}
				</div>
                
				<p className="mt-12 text-center text-sm text-[var(--color-muted)]">
					{t("stillHaveQuestion")}{" "}
					<a
						href="#contact"
						className="text-[var(--color-primary)] font-semibold hover:underline underline-offset-2"
					>
						{t("contactMe")}
					</a>
					.
				</p>
			</div>
		</section>
	);
}
