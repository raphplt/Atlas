"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	PhoneCall,
	Timer,
	ShieldCheck,
	Sparkles,
	CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactInput } from "@/lib/validators";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export function CTA() {
	const [serverError, setServerError] = useState<string | null>(null);
	const [showFullForm, setShowFullForm] = useState(false);
	const t = useTranslations("contact");
	const form = useForm<ContactInput>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			firstName: "",
			company: "",
			email: "",
			phone: "",
			projectType: "site-vitrine",
			budget: "nd",
			hasSite: "non",
			message: "",
			website: "",
		},
	});
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		watch,
	} = form;

	// Auto-expand si les champs de base sont remplis
	const firstName = watch("firstName");
	const email = watch("email");
	const company = watch("company");

	React.useEffect(() => {
		if (firstName && email && company && !showFullForm) {
			setShowFullForm(true);
		}
	}, [firstName, email, company, showFullForm]);

	async function onSubmit(values: ContactInput) {
		setServerError(null);
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.error || "Erreur inconnue");
			}
			reset();
			toast.success(t("form.successMessage"));
		} catch (e: any) {
			const msg = e.message || "Erreur serveur";
			setServerError(msg);
			toast.error(msg);
		}
	}

	return (
		<section className="relative py-24 sm:py-40 overflow-hidden" id="contact">
			<div
				className="absolute inset-0 pointer-events-none opacity-[.35] md:opacity-40"
				aria-hidden="true"
			>
				<div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-[var(--color-accent)]/25 blur-3xl" />
				<div className="absolute bottom-[-300px] right-[-200px] w-[620px] h-[620px] rounded-full bg-[var(--color-accent-alt)]/25 blur-3xl" />
			</div>
			<div className="container relative">
				<div className="grid gap-12 sm:gap-20 lg:grid-cols-2 items-start">
					{/* Left content */}
					<div className="space-y-6 sm:space-y-10 max-w-xl">
						<div className="space-y-4 sm:space-y-6">
							<h2 className="h2 leading-tight motion-fade-in motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
								{t("title")}
							</h2>
							<p className="text-base sm:text-lg text-[var(--color-muted)] motion-slide-up motion-delay-100 motion-duration-1000 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
								{t("subtitle")}
							</p>
						</div>
						<div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
							{[
								{
									icon: PhoneCall,
									label: t("benefits.diagnostic.label"),
									desc: t("benefits.diagnostic.description"),
								},
								{
									icon: Sparkles,
									label: t("benefits.recommendations.label"),
									desc: t("benefits.recommendations.description"),
								},
								{
									icon: Timer,
									label: t("benefits.response.label"),
									desc: t("benefits.response.description"),
								},
								{
									icon: ShieldCheck,
									label: t("benefits.commitment.label"),
									desc: t("benefits.commitment.description"),
								},
							].map((b, index) => (
								<div
									key={b.label}
									className="flex gap-2 sm:gap-3 items-start motion-fade-in motion-delay-200 motion-intersect-start motion-intersect-end motion-intersect-threshold-50"
								>
									<div className="icon-circle shrink-0 size-9 sm:size-11 flex items-center justify-center motion-scale-in motion-delay-300">
										<b.icon className="size-3.5 sm:size-4 motion-wiggle motion-delay-400" />
									</div>
									<div className="text-xs sm:text-sm leading-relaxed motion-slide-up motion-delay-500">
										<p className="font-medium text-[var(--color-fg)]">{b.label}</p>
										<p className="text-[10px] sm:text-[11px] text-[var(--color-muted)] mt-0.5">
											{b.desc}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* Form */}
					<div className="relative group">
						<div
							className="absolute -inset-[2px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[var(--color-accent)]/60 via-[var(--color-accent)]/10 to-[var(--color-accent-alt)]/60 opacity-70 blur-xl group-hover:opacity-90 transition motion-scale-in motion-delay-600"
							aria-hidden="true"
						/>
						<div
							className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-[var(--color-border)] pointer-events-none [mask:linear-gradient(#000,transparent_70%)] motion-fade-in motion-delay-700"
							aria-hidden="true"
						/>
						<div className="relative rounded-2xl sm:rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)]/80 backdrop-blur-xl p-6 sm:p-10 shadow-[var(--shadow)] motion-slide-up motion-delay-800 motion-intersect-start motion-intersect-end motion-intersect-threshold-50">
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="grid gap-4 sm:gap-6"
								aria-label={t("form.title")}
								noValidate
							>
								{/* Honeypot */}
								<div className="hidden">
									<label>
										{t("form.honeypot")}{" "}
										<input tabIndex={-1} autoComplete="off" {...register("website")} />
									</label>
								</div>

								{/* Étape 1 : Champs essentiels (toujours visibles) */}
								<div className="space-y-4 sm:space-y-6">
									<div className="text-center mb-4 sm:mb-6 motion-fade-in motion-delay-900">
										<h3 className="text-base sm:text-lg font-semibold mb-2 motion-slide-up motion-delay-1000">
											{t("form.stepTitle")}
										</h3>
										<p className="text-xs sm:text-sm text-[var(--color-muted)] motion-fade-in motion-delay-1100">
											{t("form.stepSubtitle")}
										</p>
									</div>

									<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
										<div className="field">
											<label htmlFor="firstName" className="flex items-center gap-2">
												{t("form.firstName")}
												{firstName && (
													<CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
												)}
											</label>
											<input
												id="firstName"
												className="input"
												autoComplete="given-name"
												placeholder="Jean"
												aria-invalid={!!errors.firstName}
												{...register("firstName")}
											/>
											{errors.firstName && (
												<p className="mt-1 text-[10px] text-[var(--color-accent)]">
													{errors.firstName.message}
												</p>
											)}
										</div>
										<div className="field">
											<label htmlFor="company" className="flex items-center gap-2">
												{t("form.company")}
												{company && (
													<CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
												)}
											</label>
											<input
												id="company"
												className="input"
												autoComplete="organization"
												placeholder="Mon Entreprise"
												aria-invalid={!!errors.company}
												{...register("company")}
											/>
											{errors.company && (
												<p className="mt-1 text-[10px] text-[var(--color-accent)]">
													{errors.company.message}
												</p>
											)}
										</div>
									</div>

									<div className="field">
										<label htmlFor="email" className="flex items-center gap-2">
											{t("form.email")}
											{email && (
												<CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
											)}
										</label>
										<input
											id="email"
											type="email"
											className="input"
											autoComplete="email"
											placeholder="jean@exemple.fr"
											aria-invalid={!!errors.email}
											{...register("email")}
										/>
										{errors.email && (
											<p className="mt-1 text-[10px] text-[var(--color-accent)]">
												{errors.email.message}
											</p>
										)}
									</div>
								</div>

								{/* Étape 2 : Détails (apparaît progressivement) */}
								{showFullForm && (
									<div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-top-4 duration-500 motion-fade-in motion-delay-1200">
										<div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent motion-scale-in motion-delay-1300" />

										<div className="field">
											<label htmlFor="phone">
												{t("form.phone")}{" "}
												<span className="text-[var(--color-muted)] font-normal">
													{t("form.phoneOptional")}
												</span>
											</label>
											<input
												id="phone"
												className="input"
												autoComplete="tel"
												placeholder="06 12 34 56 78"
												aria-invalid={!!errors.phone}
												{...register("phone")}
											/>
											{errors.phone && (
												<p className="mt-1 text-[10px] text-[var(--color-accent)]">
													{errors.phone.message}
												</p>
											)}
										</div>

										<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
											<div className="field">
												<label htmlFor="projectType">{t("form.project")}</label>
												<select
													id="projectType"
													className="input text-xs sm:text-sm pr-8"
													{...register("projectType")}
												>
													<option value="site-vitrine">
														{t("form.projectTypes.showcase")}
													</option>
													<option value="refonte">{t("form.projectTypes.redesign")}</option>
													<option value="optimisation">
														{t("form.projectTypes.optimization")}
													</option>
													<option value="autre">{t("form.projectTypes.other")}</option>
												</select>
											</div>
											<div className="field">
												<label htmlFor="budget">{t("form.budget")}</label>
												<select
													id="budget"
													className="input text-xs sm:text-sm pr-8"
													{...register("budget")}
												>
													<option value="<1000">{t("form.budgetRanges.under1000")}</option>
													<option value="1000-2000">
														{t("form.budgetRanges.1000to2000")}
													</option>
													<option value=">2000">{t("form.budgetRanges.over2000")}</option>
													<option value="nd">{t("form.budgetRanges.tbd")}</option>
												</select>
											</div>
										</div>

										<fieldset className="flex flex-wrap gap-3 sm:gap-4 text-xs">
											<legend className="text-[10px] sm:text-[11px] tracking-wide uppercase text-[var(--color-muted)] mb-1">
												{t("form.hasSite")}
											</legend>
											{[
												{ label: t("form.yes"), value: "oui" },
												{ label: t("form.no"), value: "non" },
											].map((r) => (
												<label
													key={r.value}
													className="flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-alt)]/40 cursor-pointer hover:border-[var(--color-accent)]/50 transition"
												>
													<input
														type="radio"
														value={r.value}
														className="accent-[var(--color-accent)]"
														{...register("hasSite")}
													/>
													<span>{r.label}</span>
												</label>
											))}
										</fieldset>

										<div className="field">
											<label htmlFor="message">{t("form.message")}</label>
											<textarea
												id="message"
												className="input"
												rows={3}
												placeholder={t("form.messagePlaceholder")}
												aria-invalid={!!errors.message}
												{...register("message")}
											/>
											{errors.message && (
												<p className="mt-1 text-[10px] text-[var(--color-accent)]">
													{errors.message.message}
												</p>
											)}
										</div>
									</div>
								)}
								<div className="flex flex-col gap-2 sm:gap-3">
									<Button
										type="submit"
										disabled={isSubmitting}
										className="h-12 sm:h-14 text-xs sm:text-sm md:text-base font-semibold tracking-wide relative"
									>
										<span
											className={`${
												isSubmitting ? "opacity-0" : "opacity-100"
											} transition`}
										>
											{t("form.submit")}
										</span>
										{isSubmitting && (
											<span className="absolute inset-0 flex items-center justify-center gap-2 text-xs sm:text-sm">
												<span className="size-3 sm:size-4 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />{" "}
												{t("form.submitting")}
											</span>
										)}
									</Button>
									<div className="text-[10px] sm:text-[11px] text-[var(--color-muted)] leading-relaxed space-y-1">
										<p>{t("form.consent")}</p>
										<p className="flex flex-wrap gap-2 sm:gap-3 pt-1">
											{Array.from({ length: 3 }, (_, idx) => (
												<span
													key={idx}
													className="px-1.5 sm:px-2 py-0.5 rounded bg-[var(--color-bg-alt)]/60 border border-[var(--color-border)] text-[9px] sm:text-[10px]"
												>
													{t(`form.badges.${idx}`)}
												</span>
											))}
										</p>
									</div>
									<div
										aria-live="polite"
										className="text-[10px] sm:text-xs text-[var(--color-accent)] min-h-[1rem]"
									>
										{serverError}
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
