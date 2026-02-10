import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { PortalAtlas } from "@/components/sections/PortalAtlas";
import { AboutSection } from "@/components/sections/AboutSection";
import { Simulator } from "@/components/sections/Simulator";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Atlas | Sites Web pour Artisans & Services Locaux",
	description:
		"Sites web professionnels pour artisans et services locaux. Un vrai outil pour attirer de nouveaux clients. Estimez votre projet en ligne.",
};

export default function Page() {
	return (
		<main>
			<Hero />
			{/* Decorative separator — cartographic line */}
			<div className="container-width">
				<div className="carto-separator" />
			</div>
			<Portfolio />
			<Process />
			<PortalAtlas />
			<AboutSection />
			<Simulator />
		</main>
	);
}
