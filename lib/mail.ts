import { ContactInput } from "./validators";
import { Resend } from "resend";
import { ContactEmail } from "@/components/email-templates/ContactEmail";

export async function sendMail(data: ContactInput) {
	if (
		process.env.NODE_ENV !== "production" &&
		process.env.ENABLE_MAIL_IN_DEV !== "true"
	) {
		console.log("[DEV] Email simulé:", {
			to: process.env.MAIL_TO,
			from: process.env.MAIL_FROM,
			subject: `Nouveau contact: ${data.firstName} – ${data.company}`,
			data: data,
		});
		return;
	}

	// En production, on envoie vraiment l'email
	if (!process.env.RESEND_API_KEY) {
		console.error("RESEND_API_KEY manquante");
		return;
	}

	try {
		const resend = new Resend(process.env.RESEND_API_KEY);

		const result = await resend.emails.send({
			from: process.env.MAIL_FROM || "contact@yourdomain.dev",
			to: [process.env.MAIL_TO || "you@yourdomain.dev"],
			subject: `Nouveau contact: ${data.firstName} – ${data.company}`,
			replyTo: data.email,
			react: ContactEmail({ data }),
		});

		console.log("Email envoyé avec succès:", result);
	} catch (e) {
		console.error("Erreur envoi mail", e);
		throw e; // Re-throw pour que l'API route puisse gérer l'erreur
	}
}
