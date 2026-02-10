import { z } from "zod";

export const simulatorContactSchema = z.object({
	firstName: z.string().min(1, "Prénom requis").max(60),
	email: z.string().email("Email invalide"),
	phone: z
		.string()
		.optional()
		.refine(
			(v: string | undefined) => !v || /^(\+|0)[0-9 .-]{6,}$/.test(v),
			"Téléphone invalide"
		),
	company: z.string().max(120).optional(),
	message: z.string().max(3000).optional(),
	// Simulator payload (auto-filled from state)
	projectType: z.enum(["creation", "refonte"]),
	pageTier: z.enum(["onePage", "threePages", "fivePages"]),
	features: z.array(z.string()),
	options: z.array(z.string()),
	estimatedMin: z.number(),
	estimatedMax: z.number(),
	monthlyRecurring: z.number(),
	// Honeypot
	website: z.string().max(0).optional(),
});

export type SimulatorContactInput = z.infer<typeof simulatorContactSchema>;
