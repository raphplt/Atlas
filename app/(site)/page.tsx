import { Navbar } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { Solution } from "@/components/sections/Solution";
import { Offers } from "@/components/sections/Offers";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Gallery } from "@/components/sections/Gallery";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Page() {
	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<Problems />
				<Solution />
				<BeforeAfter />
				<CaseStudies />
				<Testimonials />
				<Offers />
				<Process />
				<FAQ />
				<CTA />
			</main>
			<Footer />
		</>
	);
}
