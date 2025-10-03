"use client";

import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
	const t = useTranslations("language");
	const locale = useLocale();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const languages = [
		{ code: "fr", name: t("french"), flag: "🇫🇷" },
		{ code: "en", name: t("english"), flag: "🇬🇧" },
	];

	const currentLanguage = languages.find((lang) => lang.code === locale);

	const handleLanguageChange = async (newLocale: string) => {
		document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;

		router.refresh();
		setIsOpen(false);
	};

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				aria-label={t("switch")}
				aria-expanded={isOpen}
				className={cn(
					"relative cursor-pointer w-10 h-10 rounded-full soft-border flex items-center justify-center group overflow-hidden transition bg-[var(--color-bg-alt)]/70 hover:bg-[var(--color-bg-alt)] accent-ring",
					className
				)}
			>
				<span className="text-lg font-medium text-[var(--color-accent)]">
					{currentLanguage?.flag}
				</span>
				<span className="sr-only">{t("switch")}</span>
			</button>

			<div
				className={cn(
					"absolute right-0 top-12 z-50 min-w-[140px] rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/90 backdrop-blur-xl shadow-lg transition-all duration-200",
					isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
				)}
			>
				<div className="p-1">
					{languages.map((language) => (
						<button
							key={language.code}
							onClick={() => handleLanguageChange(language.code)}
							className={cn(
								"flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
								locale === language.code
									? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
									: "text-[var(--color-fg)] hover:bg-[var(--color-accent)]/10"
							)}
						>
							<span className="text-base">{language.flag}</span>
							<span className="font-medium">{language.name}</span>
							{locale === language.code && (
								<div className="ml-auto size-2 rounded-full bg-[var(--color-accent)]" />
							)}
						</button>
					))}
				</div>
			</div>

			{isOpen && (
				<div
					className="fixed inset-0 z-40"
					onClick={() => setIsOpen(false)}
					aria-hidden="true"
				/>
			)}
		</div>
	);
}
