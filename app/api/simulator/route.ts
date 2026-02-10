import { NextRequest, NextResponse } from "next/server";
import { simulatorContactSchema } from "@/lib/simulator-validators";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
	try {
		const json = await req.json();
		const data = simulatorContactSchema.parse(json);

		// Honeypot check
		if (data.website) {
			return NextResponse.json({ ok: true }, { status: 200 });
		}

		// Build readable summary for email
		const featureLabels: Record<string, string> = {
			contactForm: "Formulaire de contact",
			booking: "Réservation en ligne",
			blog: "Blog intégré",
			seo: "Optimisation SEO",
			maps: "Google Maps",
			gallery: "Galerie photos",
		};
		const optionLabels: Record<string, string> = {
			maintenance: "Maintenance mensuelle",
			cmsTraining: "Formation CMS",
			contentWriting: "Rédaction de contenu",
		};
		const pageTierLabels: Record<string, string> = {
			onePage: "1 page",
			threePages: "3 pages",
			fivePages: "5 pages",
		};

		const summary = [
			`Nouveau devis simulateur`,
			`─────────────────────────`,
			`Prénom: ${data.firstName}`,
			`Email: ${data.email}`,
			data.phone ? `Tél: ${data.phone}` : null,
			data.company ? `Entreprise: ${data.company}` : null,
			``,
			`Type: ${data.projectType === "creation" ? "Création" : "Refonte"}`,
			`Pages: ${pageTierLabels[data.pageTier] || data.pageTier}`,
			`Fonctionnalités: ${data.features.map((f) => featureLabels[f] || f).join(", ") || "Aucune"}`,
			`Options: ${data.options.map((o) => optionLabels[o] || o).join(", ") || "Aucune"}`,
			``,
			`Estimation: ${data.estimatedMin}€ – ${data.estimatedMax}€`,
			data.monthlyRecurring > 0 ? `Récurrent: ${data.monthlyRecurring}€/mois` : null,
			data.message ? `\nMessage:\n${data.message}` : null,
		]
			.filter(Boolean)
			.join("\n");

		// Send email via Resend
		if (process.env.RESEND_API_KEY) {
			const resend = new Resend(process.env.RESEND_API_KEY);
			await resend.emails.send({
				from: process.env.MAIL_FROM || "contact@yourdomain.dev",
				to: [process.env.MAIL_TO || "you@yourdomain.dev"],
				subject: `Devis simulateur: ${data.firstName} – ${data.estimatedMin}€-${data.estimatedMax}€`,
				replyTo: data.email,
				text: summary,
			});
		} else {
			console.log("[DEV] Simulator submission:", summary);
		}

		// Webhook Make if configured
		if (process.env.MAKE_WEBHOOK_URL) {
			try {
				await fetch(process.env.MAKE_WEBHOOK_URL, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						source: "simulator",
						firstName: data.firstName,
						email: data.email,
						phone: data.phone || "",
						company: data.company || "",
						projectType: data.projectType,
						pageTier: data.pageTier,
						features: data.features,
						options: data.options,
						estimatedMin: data.estimatedMin,
						estimatedMax: data.estimatedMax,
						monthlyRecurring: data.monthlyRecurring,
						message: data.message || "",
					}),
				});
			} catch (e) {
				console.error("Webhook Make error:", e);
			}
		}

		return NextResponse.json({ ok: true });
	} catch (e: any) {
		return NextResponse.json(
			{ error: e.message || "Erreur" },
			{ status: 400 }
		);
	}
}
