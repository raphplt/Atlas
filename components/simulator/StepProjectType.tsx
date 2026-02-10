"use client";

import { useTranslations } from "next-intl";
import { useSimulator } from "./SimulatorContext";
import type { ProjectType } from "@/lib/pricing";
import { motion } from "framer-motion";
import { CompassIcon, BlueprintIcon } from "@/components/atlas-icons";

const PROJECT_TYPES: { id: ProjectType; icon: typeof CompassIcon }[] = [
	{ id: "creation", icon: CompassIcon },
	{ id: "refonte", icon: BlueprintIcon },
];

export function StepProjectType() {
	const t = useTranslations("simulator.projectTypes");
	const { state, dispatch } = useSimulator();

	return (
		<div className="space-y-6">
			<div className="grid gap-4">
				{PROJECT_TYPES.map(({ id, icon: Icon }) => {
					const selected = state.projectType === id;
					return (
						<motion.button
							key={id}
							type="button"
							whileHover={{ scale: 1.01 }}
							whileTap={{ scale: 0.99 }}
							onClick={() => dispatch({ type: "SET_PROJECT_TYPE", payload: id })}
							className={`relative flex items-start gap-4 p-5 rounded-atlas border text-left transition-all duration-200 ${
								selected
									? "border-[var(--color-accent)] bg-[var(--color-accent)]/5 shadow-sm"
									: "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/40"
							}`}
						>
							<div
								className={`w-10 h-10 rounded-[var(--radius)] flex items-center justify-center flex-shrink-0 transition-colors ${
									selected
										? "bg-[var(--color-accent)] text-white"
										: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
								}`}
							>
								<Icon size={20} />
							</div>
							<div>
								<h4 className="font-semibold text-[var(--color-primary)]">
									{t(`${id}.label`)}
								</h4>
								<p className="text-sm text-[var(--color-muted)] mt-0.5">
									{t(`${id}.desc`)}
								</p>
							</div>
							{/* Selection indicator */}
							{selected && (
								<motion.div
									layoutId="project-check"
									className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[var(--color-accent)] flex items-center justify-center"
								>
									<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
										<path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</motion.div>
							)}
						</motion.button>
					);
				})}
			</div>
		</div>
	);
}
