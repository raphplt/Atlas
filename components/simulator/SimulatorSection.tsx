"use client";

import { useSimulator } from "./SimulatorContext";
import { SimulatorProgress } from "./SimulatorProgress";
import { StepProjectType } from "./StepProjectType";
import { StepFeatures } from "./StepFeatures";
import { StepOptions } from "./StepOptions";
import { StepRecap } from "./StepRecap";
import { StepContact } from "./StepContact";
import { BlueprintVisual } from "./BlueprintVisual";
import { PriceDisplay } from "./PriceDisplay";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TOTAL_STEPS } from "@/lib/pricing";
import { useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;
const STEPS = [StepProjectType, StepFeatures, StepOptions, StepRecap, StepContact];

export function SimulatorSection() {
	const { state, dispatch } = useSimulator();
	const t = useTranslations("simulator");
	const CurrentStep = STEPS[state.step];

	const canGoNext =
		state.step === 0 ? state.projectType !== null : true;

	return (
		<div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
			{/* Left column — Form (7 cols) */}
			<div className="lg:col-span-7 space-y-6">
				{/* Progress */}
				<SimulatorProgress />

				{/* Step content */}
				<div className="min-h-[340px]">
					<AnimatePresence mode="wait">
						<motion.div
							key={state.step}
							initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
							animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
							exit={{ opacity: 0, x: -30, filter: "blur(4px)" }}
							transition={{ duration: 0.35, ease: EASE }}
						>
							<CurrentStep />
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Navigation */}
				<div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
					<div>
						<AnimatePresence>
							{state.step > 0 && (
								<motion.button
									type="button"
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -10 }}
									transition={{ duration: 0.2 }}
									onClick={() => dispatch({ type: "PREV_STEP" })}
									className="flex items-center gap-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors group"
								>
									<ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
									Retour
								</motion.button>
							)}
						</AnimatePresence>
					</div>

					<div className="flex items-center gap-4">
						{/* Compact price display in navigation */}
						<AnimatePresence>
							{state.projectType && state.step < TOTAL_STEPS - 1 && (
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 0.3 }}
								>
									<PriceDisplay compact />
								</motion.div>
							)}
						</AnimatePresence>

						{state.step < TOTAL_STEPS - 1 && (
							<motion.button
								type="button"
								disabled={!canGoNext}
								onClick={() => dispatch({ type: "NEXT_STEP" })}
								whileHover={canGoNext ? { scale: 1.02 } : {}}
								whileTap={canGoNext ? { scale: 0.98 } : {}}
								className="flex items-center gap-2 px-6 py-2.5 rounded-atlas bg-[var(--color-accent)] text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed btn-shimmer group"
							>
								{state.step === TOTAL_STEPS - 2 ? t("recap.cta") : "Continuer"}
								<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
							</motion.button>
						)}
					</div>
				</div>
			</div>

			{/* Right column — Blueprint (5 cols, sticky) */}
			<div className="lg:col-span-5 lg:sticky lg:top-28">
				<BlueprintVisual />
			</div>
		</div>
	);
}
