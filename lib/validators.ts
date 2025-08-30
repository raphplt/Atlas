import { z } from "zod";

export const contactSchema = z.object({
	firstName: z.string().min(1, "Prénom requis").max(60),
	company: z.string().min(1, "Entreprise requise").max(120),
	email: z.string().email("Email invalide"),
	phone: z
		.string()
		.optional()
		.refine(
			(v: string | undefined) => !v || /^(\+|0)[0-9 .-]{6,}$/.test(v),
			"Téléphone invalide"
		),
	projectType: z.string().optional(),
	budget: z.string().optional(),
	hasSite: z.enum(["oui", "non"]).optional(),
	message: z.string().min(1, "Message requis").max(3000),
	website: z.string().max(0).optional(), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;

export function validateContact(data: ContactInput): ContactInput {
	return contactSchema.parse(data);
}
