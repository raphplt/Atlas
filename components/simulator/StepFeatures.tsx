"use client";

import { useTranslations } from "next-intl";
import { useSimulator } from "./SimulatorContext";
import { FEATURES, PAGE_TIER_PRICES, type PageTier, type FeatureId } from "@/lib/pricing";
import { motion } from "framer-motion";

const PAGE_TIERS: PageTier[] = ["onePage", "threePages", "fivePages"];

export function StepFeatures() {
	const t = useTranslations("simulator.features");
	const { state, dispatch } = useSimulator();

	return (
		<div className="space-y-8">
			{/* Page tier selector */}
			<div className="space-y-3">
				<label className="text-xs font-bold tracking-widest uppercase text-[var(--color-muted)]">
					Nombre de pages
				</label>
				<div className="grid grid-cols-3 gap-2">
					{PAGE_TIERS.map((tier) => {
						const selected = state.pageTier === tier;
						const price = PAGE_TIER_PRICES[tier];
						return (
							<motion.button
								key={tier}
								type="button"
								whileTap={{ scale: 0.97 }}
								onClick={() => dispatch({ type: "SET_PAGE_TIER", payload: tier })}
								className={`relative p-3 rounded-[var(--radius)] border text-center transition-all duration-200 ${
									selected
										? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
										: "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/40"
								}`}
							>
								<span className={`block text-sm font-semibold ${selected ? "text-[var(--color-primary)]" : "text-[var(--color-muted)]"}`}>
									{t(tier)}
								</span>
								{price.min > 0 && (
									<span className="block text-[10px] text-[var(--color-muted)]/60 mt-0.5">
										+{price.min}–{price.max}€
									</span>
								)}
							</motion.button>
						);
					})}
				</div>
			</div>

			{/* Feature toggles */}
			<div className="space-y-3">
				<label className="text-xs font-bold tracking-widest uppercase text-[var(--color-muted)]">
					Fonctionnalités
				</label>
				<div className="grid gap-2">
					{FEATURES.map((feature) => {
						const selected = state.features.includes(feature.id);
						return (
							<motion.button
								key={feature.id}
								type="button"
								whileTap={{ scale: 0.98 }}
								onClick={() => dispatch({ type: "TOGGLE_FEATURE", payload: feature.id })}
								className={`flex items-center justify-between p-3.5 rounded-[var(--radius)] border text-left transition-all duration-200 ${
									selected
										? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
										: "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/40"
								}`}
							>
								<div className="flex items-center gap-3">
									{/* Toggle indicator */}
									<div
										className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all ${
											selected
												? "bg-[var(--color-accent)] border-[var(--color-accent)]"
												: "border-[var(--color-border)]"
										}`}
									>
										{selected && (
											<motion.svg
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												width="12"
												height="12"
												viewBox="0 0 12 12"
												fill="none"
											>
												<path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											</motion.svg>
										)}
									</div>
									<span className={`text-sm font-medium ${selected ? "text-[var(--color-primary)]" : "text-[var(--color-muted)]"}`}>
										{t(feature.id)}
									</span>
								</div>
								<span className="text-xs text-[var(--color-muted)]/50 tabular-nums">
									+{feature.price.min}–{feature.price.max}€
								</span>
							</motion.button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
