"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { PhoneCall, Timer, ShieldCheck, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactInput } from "@/lib/validators";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function CTA() {
	const router = useRouter();
	const [serverError, setServerError] = useState<string | null>(null);
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
	} = form;

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
				track("contact-success");
				toast.success("Message envoyé. Réponse sous 24h ✅");
		} catch (e: any) {
				const msg = e.message || "Erreur serveur";
				setServerError(msg);
				toast.error(msg);
		}
	}

	return (
		<section className="relative py-40 overflow-hidden" id="contact">
			<div
				className="absolute inset-0 pointer-events-none opacity-[.35] md:opacity-40"
				aria-hidden="true"
			>
				<div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-[var(--color-accent)]/25 blur-3xl" />
				<div className="absolute bottom-[-300px] right-[-200px] w-[620px] h-[620px] rounded-full bg-[var(--color-accent-alt)]/25 blur-3xl" />
			</div>
			<div className="container relative">
				<div className="grid gap-20 lg:grid-cols-2 items-start">
					{/* Left content */}
					<div className="space-y-10 max-w-xl">
						<div className="space-y-6">
							<h2 className="h2 leading-tight">
								Votre site doit vous rapporter des clients.
							</h2>
							<p className="text-lg text-[var(--color-muted)]">
								Expliquez votre activité, vos objectifs et obtenez un plan
								d'amélioration concret.
							</p>
						</div>
						<div className="grid gap-6 sm:grid-cols-2">
							{[
								{
									icon: PhoneCall,
									label: "Diagnostic gratuit",
									desc: "Analyse rapide de votre présence.",
								},
								{
									icon: Sparkles,
									label: "Pistes concrètes",
									desc: "Recommandations actionnables.",
								},
								{
									icon: Timer,
									label: "Réponse ≤24h",
									desc: "Prise de contact rapide.",
								},
								{
									icon: ShieldCheck,
									label: "Pas d’engagement",
									desc: "Vous décidez ensuite.",
								},
							].map((b) => (
								<div key={b.label} className="flex gap-3 items-start">
									<div className="icon-circle shrink-0 size-11 flex items-center justify-center">
										<b.icon className="size-4" />
									</div>
									<div className="text-sm leading-relaxed">
										<p className="font-medium text-[var(--color-fg)]">{b.label}</p>
										<p className="text-[11px] text-[var(--color-muted)] mt-0.5">
											{b.desc}
										</p>
									</div>
								</div>
							))}
						</div>
						<div className="flex flex-wrap gap-4 pt-4 border-t border-[var(--color-border)] text-[11px] uppercase tracking-wide text-[var(--color-muted)]">
							{[
								"≤ 10 jours",
								"Design premium",
								"Mobile-first",
								"Optimisation locale",
							].map((t) => (
								<span
									key={t}
									className="px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/60"
								>
									{t}
								</span>
							))}
						</div>
					</div>
					{/* Form */}
					<div className="relative group">
						<div
							className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-[var(--color-accent)]/60 via-[var(--color-accent)]/10 to-[var(--color-accent-alt)]/60 opacity-70 blur-xl group-hover:opacity-90 transition"
							aria-hidden="true"
						/>
						<div
							className="absolute inset-0 rounded-3xl border border-[var(--color-border)] pointer-events-none [mask:linear-gradient(#000,transparent_70%)]"
							aria-hidden="true"
						/>
						<div className="relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)]/80 backdrop-blur-xl p-10 shadow-[var(--shadow)]">
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="grid gap-6"
								aria-label="Formulaire de contact"
								noValidate
							>
								{/* Honeypot */}
								<div className="hidden">
									<label>
										Ne pas remplir{" "}
										<input tabIndex={-1} autoComplete="off" {...register("website")} />
									</label>
								</div>
								<div className="grid gap-6 md:grid-cols-2">
									<div className="field">
										<label htmlFor="firstName">Prénom</label>
										<input
											id="firstName"
											className="input"
											autoComplete="given-name"
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
										<label htmlFor="company">Entreprise</label>
										<input
											id="company"
											className="input"
											autoComplete="organization"
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
								<div className="grid gap-6 md:grid-cols-2">
									<div className="field">
										<label htmlFor="email">Email</label>
										<input
											id="email"
											type="email"
											className="input"
											autoComplete="email"
											aria-invalid={!!errors.email}
											{...register("email")}
										/>
										{errors.email && (
											<p className="mt-1 text-[10px] text-[var(--color-accent)]">
												{errors.email.message}
											</p>
										)}
									</div>
									<div className="field">
										<label htmlFor="phone">
											Téléphone{" "}
											<span className="text-[var(--color-muted)] font-normal">
												(optionnel)
											</span>
										</label>
										<input
											id="phone"
											className="input"
											autoComplete="tel"
											aria-invalid={!!errors.phone}
											{...register("phone")}
										/>
										{errors.phone && (
											<p className="mt-1 text-[10px] text-[var(--color-accent)]">
												{errors.phone.message}
											</p>
										)}
									</div>
								</div>
								<div className="grid gap-6 md:grid-cols-2">
									<div className="field">
										<label htmlFor="projectType">Projet</label>
										<select
											id="projectType"
											className="input text-sm pr-8"
											{...register("projectType")}
										>
											<option value="site-vitrine">Site vitrine</option>
											<option value="refonte">Refonte</option>
											<option value="optimisation">Optimisation / SEO local</option>
											<option value="autre">Autre</option>
										</select>
									</div>
									<div className="field">
										<label htmlFor="budget">Budget estimé</label>
										<select
											id="budget"
											className="input text-sm pr-8"
											{...register("budget")}
										>
											<option value="<1000">&lt; 1000€</option>
											<option value="1000-2000">1000–2000€</option>
											<option value=">2000">&gt; 2000€</option>
											<option value="nd">À définir</option>
										</select>
									</div>
								</div>
								<fieldset className="flex flex-wrap gap-4 text-xs">
									<legend className="text-[11px] tracking-wide uppercase text-[var(--color-muted)] mb-1">
										Avez-vous déjà un site ?
									</legend>
									{[
										{ label: "Oui", value: "oui" },
										{ label: "Non", value: "non" },
									].map((r) => (
										<label
											key={r.value}
											className="flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-alt)]/40 cursor-pointer hover:border-[var(--color-accent)]/50"
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
									<label htmlFor="message">Message</label>
									<textarea
										id="message"
										className="input"
										placeholder="Décrivez votre activité, l'objectif, l'urgence..."
										aria-invalid={!!errors.message}
										{...register("message")}
									/>
									{errors.message && (
										<p className="mt-1 text-[10px] text-[var(--color-accent)]">
											{errors.message.message}
										</p>
									)}
								</div>
								<div className="flex flex-col gap-3">
									<Button
										type="submit"
										onClick={() => track("cta-click")}
										disabled={isSubmitting}
										className="h-14 text-sm md:text-base font-semibold tracking-wide relative"
									>
										<span
											className={`${
												isSubmitting ? "opacity-0" : "opacity-100"
											} transition`}
										>
											Réserver un appel gratuit de 15 min
										</span>
										{isSubmitting && (
											<span className="absolute inset-0 flex items-center justify-center gap-2 text-sm">
												<span className="size-4 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />{" "}
												Envoi...
											</span>
										)}
									</Button>
									<div className="text-[11px] text-[var(--color-muted)] leading-relaxed space-y-1">
										<p>
											En envoyant ce formulaire vous acceptez un contact email / téléphone.
											Aucune newsletter automatique.
										</p>
										<p className="flex flex-wrap gap-3 pt-1">
											{["Sécurisé", "RGPD", "Aucun spam"].map((b) => (
												<span
													key={b}
													className="px-2 py-0.5 rounded bg-[var(--color-bg-alt)]/60 border border-[var(--color-border)]"
												>
													{b}
												</span>
											))}
										</p>
									</div>
									<div
										aria-live="polite"
										className="text-xs text-[var(--color-accent)] min-h-[1rem]"
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
