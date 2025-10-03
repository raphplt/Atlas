import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { Portfolio } from "@/components/sections/Portfolio";
import { Offers } from "@/components/sections/Offers";
import { Guarantee } from "@/components/sections/Guarantee";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

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
