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
			className="relative pt-20 sm:pt-28 pb-16 sm:pb-24 overflow-hidden min-h-[100vh] 2xl:min-h-[90vh]"
			id="hero"
		>
			<div className="hero-bg" aria-hidden="true" />
			<div className="noise" aria-hidden="true" />
			<div className="aurora a1" />
			<div className="aurora a2" />
			{/* Éléments décoratifs pour grands écrans */}
			<div className="hidden 2xl:block absolute top-1/4 left-8 w-32 h-32 bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent-alt)]/10 rounded-full blur-xl animate-pulse-subtle" />
			<div className="hidden 2xl:block absolute bottom-1/4 right-8 w-24 h-24 bg-gradient-to-br from-[var(--color-accent-alt)]/10 to-[var(--color-accent)]/10 rounded-full blur-xl animate-pulse-subtle" />

			<div className="container relative">
				<div className="text-center mb-12 sm:mb-16 max-w-5xl mx-auto 2xl:max-w-6xl">
					<div className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 mb-4 sm:mb-6 rounded-full btn-outline-gradient text-[9px] sm:text-[10px] font-medium tracking-[.15em] uppercase text-[var(--color-muted)] backdrop-blur-sm motion-fade-in motion-delay-0">
						<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />{" "}
						{t("badge")}
					</div>

					<h1 className="h1 mb-4 sm:mb-6 max-w-5xl mx-auto 2xl:text-8xl motion-fade-in motion-delay-100 motion-duration-1000">
						{t("title")}
					</h1>

					<p className="text-base sm:text-lg md:text-xl 2xl:text-2xl text-[var(--color-muted)] mb-6 sm:mb-8 max-w-3xl mx-auto 2xl:max-w-4xl leading-relaxed motion-fade-in motion-delay-200 motion-duration-1000">
						{t("subtitle")}
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-10 text-sm motion-fade-in motion-delay-300 motion-duration-1000">
						<div className="flex items-center gap-2">
							<div className="flex -space-x-2">
								{[1, 2, 3, 4].map((i) => (
									<div
										key={i}
										className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-alt)] border-2 border-[var(--color-bg)] flex items-center justify-center text-white text-xs font-semibold motion-scale-in motion-delay-400 motion-duration-500"
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
							<span className="text-[var(--color-muted)] text-xs sm:text-sm">
								{t("socialProof.clients")}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-xl sm:text-2xl motion-wiggle motion-delay-500">
								⭐
							</span>
							<span className="font-semibold text-[var(--color-fg)] text-xs sm:text-sm">
								{t("socialProof.rating")}
							</span>
							<span className="text-[var(--color-muted)] text-xs sm:text-sm">
								{t("socialProof.reviews")}
							</span>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 motion-slide-up motion-delay-600 motion-duration-1000">
						<a href="#contact" className="w-full sm:w-auto">
							<ButtonColorful className="w-full sm:w-auto">
								<div className="flex items-center justify-center gap-2">
									<CircleChevronDown className="size-3.5 text-black" />
									<p className="text-sm text-black">{t("ctaPrimary")}</p>
								</div>
							</ButtonColorful>
						</a>
						<a href="#portfolio" className="w-full sm:w-auto">
							<ButtonColorful className="w-full sm:w-auto">
								<div className="flex items-center justify-center gap-2">
									<ArrowUpRight className="size-3.5 text-black" />
									<p className="text-sm text-black">{t("ctaSecondary")}</p>
								</div>
							</ButtonColorful>
						</a>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-[var(--color-muted)] motion-fade-in motion-delay-900">
						{[
							t("trustIndicators.0"),
							t("trustIndicators.1"),
							t("trustIndicators.2"),
						].map((indicator, i) => (
							<div
								key={i}
								className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[var(--color-card)]/60 backdrop-blur-sm border border-[var(--color-border)] motion-scale-in motion-delay-1000"
							>
								<span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[var(--color-accent)]" />
								{indicator}
							</div>
						))}
					</div>
				</div>

				<div className="grid gap-4 sm:gap-6 md:grid-cols-3 max-w-5xl mx-auto 2xl:max-w-6xl">
					<Card className="p-4 sm:p-6 2xl:p-8 card-glow text-center motion-fade-in motion-delay-1100 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
						<div className="icon-circle mx-auto mb-3 sm:mb-4 2xl:mb-6 motion-scale-in motion-delay-1200">
							<ShieldCheck className="size-4 sm:size-5 2xl:size-6" />
						</div>
						<h3 className="text-sm sm:text-base 2xl:text-lg font-semibold mb-2 2xl:mb-3 tracking-tight motion-slide-up motion-delay-1300">
							{t("solutions.credibility.title")}
						</h3>
						<p className="text-xs sm:text-sm 2xl:text-base leading-relaxed text-[var(--color-muted)] motion-fade-in motion-delay-1400">
							{t("solutions.credibility.description")}
						</p>
					</Card>
					<Card className="p-4 sm:p-6 2xl:p-8 card-glow text-center ring-2 ring-[var(--color-accent)]/20 motion-fade-in motion-delay-1200 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
						<div className="icon-circle mx-auto mb-3 sm:mb-4 2xl:mb-6 motion-scale-in motion-delay-1300">
							<TrendingUp className="size-4 sm:size-5 2xl:size-6" />
						</div>
						<h3 className="text-sm sm:text-base 2xl:text-lg font-semibold mb-2 2xl:mb-3 tracking-tight motion-slide-up motion-delay-1400">
							{t("solutions.conversion.title")}
						</h3>
						<p className="text-xs sm:text-sm 2xl:text-base leading-relaxed text-[var(--color-muted)] motion-fade-in motion-delay-1500">
							{t("solutions.conversion.description")}
						</p>
					</Card>
					<Card className="p-4 sm:p-6 2xl:p-8 card-glow text-center motion-fade-in motion-delay-1300 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
						<div className="icon-circle mx-auto mb-3 sm:mb-4 2xl:mb-6 motion-scale-in motion-delay-1400">
							<MapPin className="size-4 sm:size-5 2xl:size-6" />
						</div>
						<h3 className="text-sm sm:text-base 2xl:text-lg font-semibold mb-2 2xl:mb-3 tracking-tight motion-slide-up motion-delay-1500">
							{t("solutions.visibility.title")}
						</h3>
						<p className="text-xs sm:text-sm 2xl:text-base leading-relaxed text-[var(--color-muted)] motion-fade-in motion-delay-1600">
							{t("solutions.visibility.description")}
						</p>
					</Card>
				</div>
			</div>
		</section>
	);
}
