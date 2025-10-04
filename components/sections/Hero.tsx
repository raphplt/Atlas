import { Card } from "@/components/ui/card";
import {
	ShieldCheck,
	TrendingUp,
	MapPin,
	ArrowUpRight,
	CircleChevronDown,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ButtonColorful } from "../ui/ColorfulButton";

export function Hero() {
	const t = useTranslations("hero");

	return (
		<section
			className="relative pt-28 pb-24 overflow-hidden min-h-[100vh]"
			id="hero"
		>
			<div className="hero-bg" aria-hidden="true" />
			<div className="noise" aria-hidden="true" />
			<div className="aurora a1" />
			<div className="aurora a2" />
			<div className="container relative">
				<div className="text-center mb-16 max-w-5xl mx-auto">
					<div className="inline-flex items-center gap-2 px-5 py-1.5 mb-6 rounded-full btn-outline-gradient text-[10px] md:text-xs font-medium tracking-[.15em] uppercase text-[var(--color-muted)] backdrop-blur-sm motion-fade-in motion-delay-0">
						<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />{" "}
						{t("badge")}
					</div>

					<h1 className="h1 mb-6 max-w-5xl mx-auto motion-fade-in motion-delay-100 motion-duration-1000">
						{t("title")}
					</h1>

					<p className="text-lg md:text-xl text-[var(--color-muted)] mb-8 max-w-3xl mx-auto leading-relaxed motion-fade-in motion-delay-200 motion-duration-1000">
						{t("subtitle")}
					</p>

					<div className="flex items-center justify-center gap-6 mb-10 text-sm motion-fade-in motion-delay-300 motion-duration-1000">
						<div className="flex items-center gap-2">
							<div className="flex -space-x-2">
								{[1, 2, 3, 4].map((i) => (
									<div
										key={i}
										className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-alt)] border-2 border-[var(--color-bg)] flex items-center justify-center text-white text-xs font-semibold motion-scale-in motion-delay-400 motion-duration-500"
									>
										<Image
											src={`/images/people/${i}.jpg`}
											alt={`Client ${i}`}
											width={32}
											height={32}
											className="object-cover rounded-full"
										/>
									</div>
								))}
							</div>
							<span className="text-[var(--color-muted)]">
								{t("socialProof.clients")}
							</span>
						</div>
						<div className="hidden sm:flex items-center gap-2">
							<span className="text-2xl motion-wiggle motion-delay-500">⭐</span>
							<span className="font-semibold text-[var(--color-fg)]">
								{t("socialProof.rating")}
							</span>
							<span className="text-[var(--color-muted)]">
								{t("socialProof.reviews")}
							</span>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 motion-slide-up motion-delay-600 motion-duration-1000">
						<a href="#contact">
							<ButtonColorful>
								<div className="flex items-center gap-2">
									<CircleChevronDown className="size-3.5 text-black" />
									<p className="text-sm text-black">{t("ctaPrimary")}</p>
								</div>
							</ButtonColorful>
						</a>
						<a href="#portfolio">
							<ButtonColorful>
								<div className="flex items-center gap-2">
									<ArrowUpRight className="size-3.5 text-black" />
									<p className="text-sm text-black">{t("ctaSecondary")}</p>
								</div>
							</ButtonColorful>
						</a>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--color-muted)] motion-fade-in motion-delay-900">
						{[
							t("trustIndicators.0"),
							t("trustIndicators.1"),
							t("trustIndicators.2"),
						].map((indicator, i) => (
							<div
								key={i}
								className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-card)]/60 backdrop-blur-sm border border-[var(--color-border)] motion-scale-in motion-delay-1000"
							>
								<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
								{indicator}
							</div>
						))}
					</div>
				</div>

				<div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
					<Card className="p-6 card-glow text-center motion-fade-in motion-delay-1100 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
						<div className="icon-circle mx-auto mb-4 motion-scale-in motion-delay-1200">
							<ShieldCheck className="size-5" />
						</div>
						<h3 className="text-base font-semibold mb-2 tracking-tight motion-slide-up motion-delay-1300">
							{t("solutions.credibility.title")}
						</h3>
						<p className="text-sm leading-relaxed text-[var(--color-muted)] motion-fade-in motion-delay-1400">
							{t("solutions.credibility.description")}
						</p>
					</Card>
					<Card className="p-6 card-glow text-center ring-2 ring-[var(--color-accent)]/20 motion-fade-in motion-delay-1200 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
						<div className="icon-circle mx-auto mb-4 motion-scale-in motion-delay-1300">
							<TrendingUp className="size-5" />
						</div>
						<h3 className="text-base font-semibold mb-2 tracking-tight motion-slide-up motion-delay-1400">
							{t("solutions.conversion.title")}
						</h3>
						<p className="text-sm leading-relaxed text-[var(--color-muted)] motion-fade-in motion-delay-1500">
							{t("solutions.conversion.description")}
						</p>
					</Card>
					<Card className="p-6 card-glow text-center motion-fade-in motion-delay-1300 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
						<div className="icon-circle mx-auto mb-4 motion-scale-in motion-delay-1400">
							<MapPin className="size-5" />
						</div>
						<h3 className="text-base font-semibold mb-2 tracking-tight motion-slide-up motion-delay-1500">
							{t("solutions.visibility.title")}
						</h3>
						<p className="text-sm leading-relaxed text-[var(--color-muted)] motion-fade-in motion-delay-1600">
							{t("solutions.visibility.description")}
						</p>
					</Card>
				</div>
			</div>
		</section>
	);
}
