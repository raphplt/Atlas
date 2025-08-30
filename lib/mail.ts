import { ContactInput } from "./validators";

export async function sendMail(data: ContactInput) {
  if (!process.env.RESEND_API_KEY) {
			console.log("[dev mail]", data);
			return;
		}
		try {
			const { Resend } = await import("resend");
			const resend = new Resend(process.env.RESEND_API_KEY);
			await resend.emails.send({
				from: process.env.MAIL_FROM || "contact@yourdomain.dev",
				to: [process.env.MAIL_TO || "you@yourdomain.dev"],
				subject: `Nouveau contact: ${data.firstName} – ${data.company}`,
				replyTo: data.email,
				text: `Projet: ${data.projectType}\nBudget: ${data.budget}\nA un site: ${data.hasSite}\nTéléphone: ${data.phone || "-"}\n\nMessage:\n${data.message}`,
			});
		} catch (e) {
			console.error("Erreur envoi mail", e);
		}
}
