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

	const handleLanguageChange = async (
		newLocale: string,
		event?: React.MouseEvent
	) => {
		event?.stopPropagation();
		document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
		router.refresh();
		setIsOpen(false);
	};

	return (
		<div className="relative z-[90]">
			<button
				onClick={() => setIsOpen(!isOpen)}
				aria-label={t("switch")}
				aria-expanded={isOpen}
				className={cn(
					"inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)]/60 bg-white/20 text-[var(--color-fg)] transition-all duration-300 hover:bg-[var(--color-accent)]/20 hover:scale-110 active:scale-95 backdrop-blur-sm",
					className
				)}
			>
				<span className="text-lg font-medium text-[var(--color-accent)]">
					{currentLanguage?.flag}
				</span>
				<span className="sr-only">{t("switch")}</span>
			</button>

			{/* Dropdown */}
			{isOpen && (
				<>
					<div
						className="fixed inset-0 z-[60]"
						onClick={() => setIsOpen(false)}
						aria-hidden="true"
					/>
					<div className="absolute right-0 top-12 z-[80] min-w-[140px] rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/95 backdrop-blur-xl shadow-lg">
						<div className="p-1">
							{languages.map((language) => (
								<button
									key={language.code}
									onClick={(e) => handleLanguageChange(language.code, e)}
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
				</>
			)}
		</div>
	);
}
