"use client";

import { useTranslations } from "next-intl";
import { useSimulator } from "./SimulatorContext";
import { OPTIONS } from "@/lib/pricing";
import { motion } from "framer-motion";

export function StepOptions() {
	const t = useTranslations("simulator.options");
	const { state, dispatch } = useSimulator();

	return (
		<div className="space-y-3">
			<label className="text-xs font-bold tracking-widest uppercase text-[var(--color-muted)]">
				Options supplémentaires
			</label>
			<div className="grid gap-2">
				{OPTIONS.map((option) => {
					const selected = state.options.includes(option.id);
					return (
						<motion.button
							key={option.id}
							type="button"
							whileTap={{ scale: 0.98 }}
							onClick={() => dispatch({ type: "TOGGLE_OPTION", payload: option.id })}
							className={`flex items-center justify-between p-3.5 rounded-[var(--radius)] border text-left transition-all duration-200 ${
								selected
									? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
									: "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/40"
							}`}
						>
							<div className="flex items-center gap-3">
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
									{t(option.id)}
								</span>
							</div>
							<span className="text-xs text-[var(--color-muted)]/50 tabular-nums">
								{option.monthly
									? `${option.price.min}€/mois`
									: `+${option.price.min}–${option.price.max}€`}
							</span>
						</motion.button>
					);
				})}
			</div>
		</div>
	);
}
