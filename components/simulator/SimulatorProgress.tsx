"use client";

import { useTranslations } from "next-intl";
import { useSimulator } from "./SimulatorContext";
import { TOTAL_STEPS } from "@/lib/pricing";
import { motion } from "framer-motion";

const STEP_KEYS = ["projectType", "features", "options", "recap", "contact"] as const;

export function SimulatorProgress() {
	const t = useTranslations("simulator.steps");
	const { state, dispatch } = useSimulator();

	return (
		<div className="flex items-center gap-1 w-full">
			{STEP_KEYS.map((key, i) => {
				const isActive = state.step === i;
				const isDone = state.step > i;
				const isClickable = isDone;

				return (
					<button
						key={key}
						type="button"
						disabled={!isClickable}
						onClick={() => isClickable && dispatch({ type: "GO_TO_STEP", payload: i })}
						className="flex-1 group relative"
					>
						{/* Progress bar segment */}
						<div className="h-1 rounded-full bg-[var(--color-border)] overflow-hidden">
							<motion.div
								className="h-full rounded-full"
								initial={false}
								animate={{
									width: isDone || isActive ? "100%" : "0%",
									backgroundColor: isDone
										? "var(--color-accent)"
										: isActive
											? "var(--color-primary)"
											: "transparent",
								}}
								transition={{ duration: 0.4, ease: "easeOut" }}
							/>
						</div>
						{/* Step label */}
						<span
							className={`block mt-2 text-[11px] font-medium tracking-wide transition-colors ${
								isActive
									? "text-[var(--color-primary)]"
									: isDone
										? "text-[var(--color-accent)]"
										: "text-[var(--color-muted)]/60"
							} ${isClickable ? "cursor-pointer group-hover:text-[var(--color-primary)]" : "cursor-default"}`}
						>
							{t(key)}
						</span>
					</button>
				);
			})}
		</div>
	);
}
