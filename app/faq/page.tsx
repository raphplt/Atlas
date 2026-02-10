import type { Metadata } from "next";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
	title: "FAQ — Atlas | Questions fréquentes",
	description:
		"Réponses aux questions les plus fréquentes sur la création de sites web pour artisans et services locaux. Délais, prix, fonctionnement.",
	alternates: { canonical: "/faq" },
};

export default function FaqPage() {
	return (
		<main className="pt-24">
			<FAQ />
		</main>
	);
}
