"use client";

import { useTranslations } from "next-intl";
import { useSimulator } from "./SimulatorContext";
import { PriceDisplay } from "./PriceDisplay";
import { FEATURES, OPTIONS } from "@/lib/pricing";
import { motion } from "framer-motion";

export function StepRecap() {
	const t = useTranslations("simulator");
	const { state } = useSimulator();

	return (
		<div className="space-y-6">
			{/* Price range */}
			<div className="p-5 rounded-atlas bg-[var(--color-primary)]/[0.03] border border-[var(--color-border)]">
				<p className="text-xs font-bold tracking-widest uppercase text-[var(--color-muted)] mb-3">
					{t("recap.title")}
				</p>
				<PriceDisplay />
			</div>

			{/* Summary */}
			<div className="space-y-4">
				{/* Project type */}
				<div className="flex justify-between items-center text-sm">
					<span className="text-[var(--color-muted)]">{t("recap.projectType")}</span>
					<span className="font-medium text-[var(--color-primary)]">
						{state.projectType ? t(`projectTypes.${state.projectType}.label`) : "—"}
					</span>
				</div>

				{/* Page tier */}
				<div className="flex justify-between items-center text-sm">
					<span className="text-[var(--color-muted)]">Pages</span>
					<span className="font-medium text-[var(--color-primary)]">
						{t(`features.${state.pageTier}`)}
					</span>
				</div>

				{/* Features */}
				{state.features.length > 0 && (
					<div>
						<p className="text-sm text-[var(--color-muted)] mb-2">{t("recap.selectedFeatures")}</p>
						<div className="flex flex-wrap gap-1.5">
							{state.features.map((fid) => (
								<motion.span
									key={fid}
									initial={{ scale: 0.9, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20"
								>
									{t(`features.${fid}`)}
								</motion.span>
							))}
						</div>
					</div>
				)}

				{/* Options */}
				{state.options.length > 0 && (
					<div>
						<p className="text-sm text-[var(--color-muted)] mb-2">{t("recap.selectedOptions")}</p>
						<div className="flex flex-wrap gap-1.5">
							{state.options.map((oid) => (
								<motion.span
									key={oid}
									initial={{ scale: 0.9, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20"
								>
									{t(`options.${oid}`)}
								</motion.span>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Note */}
			<p className="text-xs text-[var(--color-muted)] leading-relaxed italic">
				{t("recap.note")}
			</p>
		</div>
	);
}
