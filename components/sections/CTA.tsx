"use client";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/app/(site)/actions";
import { track } from "@/lib/analytics";

export function CTA() {
  return (
			<section className="container py-32" id="contact">
				<div className="grid gap-12 md:grid-cols-2 items-start">
					<div className="space-y-6">
						<h2 className="h2">Votre site doit vous rapporter des clients.</h2>
						<p className="text-lg text-[var(--color-muted)] max-w-md">
							Expliquez votre activité, vos objectifs et voyons comment améliorer vos
							résultats en ligne.
						</p>
						<ul className="space-y-2 text-sm text-[var(--color-muted)]">
							<li>• Audit rapide de votre présence actuelle</li>
							<li>• Conseils actionnables</li>
							<li>• Pas d'engagement</li>
						</ul>
					</div>
					<div className="card p-8 shadow-[var(--shadow)]">
						<form
							action={submitContact}
							className="grid gap-5"
							aria-label="Formulaire de contact"
						>
							<div className="grid gap-5 md:grid-cols-2">
								<div className="field">
									<label htmlFor="firstName">Prénom</label>
									<input id="firstName" name="firstName" className="input" required />
								</div>
								<div className="field">
									<label htmlFor="company">Entreprise</label>
									<input id="company" name="company" className="input" required />
								</div>
							</div>
							<div className="grid gap-5 md:grid-cols-2">
								<div className="field">
									<label htmlFor="email">Email</label>
									<input
										id="email"
										name="email"
										type="email"
										className="input"
										required
									/>
								</div>
								<div className="field">
									<label htmlFor="phone">Téléphone</label>
									<input id="phone" name="phone" className="input" />
								</div>
							</div>
							<div className="field md:col-span-2">
								<label htmlFor="message">Message</label>
								<textarea
									id="message"
									name="message"
									className="input"
									placeholder="Parlez de votre activité..."
									required
								/>
							</div>
							<Button
								type="submit"
								onClick={() => track("cta-click")}
								className="h-12 text-base font-semibold tracking-wide"
							>
								Réserver un appel gratuit de 15 min
							</Button>
						</form>
					</div>
				</div>
			</section>
		);
}
