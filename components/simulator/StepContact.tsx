"use client";

import { useTranslations } from "next-intl";
import { useSimulator } from "./SimulatorContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { simulatorContactSchema, type SimulatorContactInput } from "@/lib/simulator-validators";
import { calculatePriceRange, calculateMonthly } from "@/lib/pricing";
import { useState } from "react";
import { motion } from "framer-motion";

export function StepContact() {
	const t = useTranslations("simulator.contact");
	const { state } = useSimulator();
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");

	const range = calculatePriceRange(state);
	const monthly = calculateMonthly(state);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SimulatorContactInput>({
		resolver: zodResolver(simulatorContactSchema),
		defaultValues: {
			projectType: state.projectType ?? "creation",
			pageTier: state.pageTier,
			features: state.features,
			options: state.options,
			estimatedMin: range.min,
			estimatedMax: range.max,
			monthlyRecurring: monthly,
		},
	});

	const onSubmit = async (data: SimulatorContactInput) => {
		setError("");
		try {
			const res = await fetch("/api/simulator", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error("Erreur serveur");
			setSubmitted(true);
		} catch {
			setError("Une erreur est survenue. Réessayez ou contactez-moi directement.");
		}
	};

	if (submitted) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center py-8 space-y-4"
			>
				<div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M5 12l5 5L20 7" />
					</svg>
				</div>
				<h4 className="font-semibold text-lg text-[var(--color-primary)]">
					Demande envoyée !
				</h4>
				<p className="text-sm text-[var(--color-muted)]">
					Je vous recontacte sous 24h avec une estimation détaillée.
				</p>
			</motion.div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			<p className="text-sm text-[var(--color-muted)]">{t("subtitle")}</p>

			{/* Hidden simulator fields */}
			<input type="hidden" {...register("projectType")} />
			<input type="hidden" {...register("pageTier")} />
			<input type="hidden" {...register("estimatedMin", { valueAsNumber: true })} />
			<input type="hidden" {...register("estimatedMax", { valueAsNumber: true })} />
			<input type="hidden" {...register("monthlyRecurring", { valueAsNumber: true })} />
			{/* Honeypot */}
			<input type="text" {...register("website")} className="absolute opacity-0 pointer-events-none h-0" tabIndex={-1} autoComplete="off" />

			<div className="space-y-3">
				<div>
					<input
						{...register("firstName")}
						placeholder={t("fields.firstName")}
						className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-primary)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
					/>
					{errors.firstName && (
						<p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
					)}
				</div>

				<div>
					<input
						{...register("email")}
						type="email"
						placeholder={t("fields.email")}
						className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-primary)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
					/>
					{errors.email && (
						<p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
					)}
				</div>

				<div>
					<input
						{...register("phone")}
						type="tel"
						placeholder={t("fields.phone")}
						className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-primary)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
					/>
					{errors.phone && (
						<p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
					)}
				</div>

				<div>
					<input
						{...register("company")}
						placeholder={t("fields.company")}
						className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-primary)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
					/>
				</div>

				<div>
					<textarea
						{...register("message")}
						placeholder={t("fields.message")}
						rows={3}
						className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-primary)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
					/>
				</div>
			</div>

			{error && (
				<p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-[var(--radius)]">
					{error}
				</p>
			)}

			<button
				type="submit"
				disabled={isSubmitting}
				className="w-full py-3.5 rounded-atlas bg-[var(--color-accent)] text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
			>
				{isSubmitting ? t("submitting") : t("submit")}
			</button>

			<p className="text-[11px] text-[var(--color-muted)]/60 text-center">
				{t("consent")}
			</p>
		</form>
	);
}
