import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { Portfolio } from "@/components/sections/Portfolio";
import { Offers } from "@/components/sections/Offers";
import { Guarantee } from "@/components/sections/Guarantee";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Atlas | Sites Web pour Artisans & Services Locaux",
	description:
		"Augmentez vos demandes de devis avec un site web professionnel et optimisé. Spécialisé pour les artisans et TPE. Devis gratuit.",
};

export default function Page() {
	return (
		<main>
			<Hero />
			<Problems />
			<Portfolio />
			<Testimonials />
			<Offers />
			<Guarantee />
			<Process />
			<FAQ />
			<CTA />
		</main>
	);
}
