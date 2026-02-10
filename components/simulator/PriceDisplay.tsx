"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useSimulator } from "./SimulatorContext";
import { calculatePriceRange, calculateMonthly } from "@/lib/pricing";
import { useTranslations } from "next-intl";

function AnimatedNumber({ value }: { value: number }) {
	const spring = useSpring(0, { stiffness: 80, damping: 20 });
	const display = useTransform(spring, (v) => Math.round(v).toLocaleString("fr-FR"));

	useEffect(() => {
		spring.set(value);
	}, [value, spring]);

	return <motion.span>{display}</motion.span>;
}

export function PriceDisplay({ compact = false }: { compact?: boolean }) {
	const { state } = useSimulator();
	const t = useTranslations("simulator.recap");
	const range = calculatePriceRange(state);
	const monthly = calculateMonthly(state);

	if (!state.projectType) return null;

	if (compact) {
		return (
			<div className="flex items-baseline gap-1.5 text-sm font-medium text-[var(--color-primary)]">
				<AnimatedNumber value={range.min} />
				<span className="text-[var(--color-muted)]">—</span>
				<AnimatedNumber value={range.max} />
				<span className="text-[var(--color-muted)] text-xs">€</span>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			<div className="flex items-baseline gap-2">
				<span className="text-3xl font-bold tabular-nums text-[var(--color-primary)]">
					<AnimatedNumber value={range.min} />
				</span>
				<span className="text-lg text-[var(--color-muted)]">—</span>
				<span className="text-3xl font-bold tabular-nums text-[var(--color-primary)]">
					<AnimatedNumber value={range.max} />
				</span>
				<span className="text-lg text-[var(--color-muted)]">€</span>
			</div>
			{monthly > 0 && (
				<p className="text-sm text-[var(--color-accent)]">
					+ {monthly}€/mois (maintenance)
				</p>
			)}
		</div>
	);
}
