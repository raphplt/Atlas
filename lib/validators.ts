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
    // Qualification fields
    projectGoal: z.enum(["creation", "redesign", "marketing", "other"], {
        required_error: "Veuillez sélectionner un objectif"
    }),
    timeline: z.enum(["urgent", "1month", "3months", "exploration"], {
        required_error: "Veuillez sélectionner un délai"
    }).optional(),
	budget: z.string().optional(),
    currentUrl: z.string().url("URL invalide").optional().or(z.literal("")),
    
	message: z.string().max(3000).optional(), // Made optional as goal is captured
	website: z.string().max(0).optional(), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;

export function validateContact(data: unknown): ContactInput {
	return contactSchema.parse(data);
}
