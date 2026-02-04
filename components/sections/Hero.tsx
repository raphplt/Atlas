"use client";

import { ShieldCheck, TrendingUp, MapPin, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { PrimaryCta } from "../ui/PrimaryCta";
import { SecondaryCta } from "../ui/SecondaryCta";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

export function Hero() {
	const t = useTranslations("hero");

	return (
		<section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[var(--color-background-alt)] border-b border-[var(--color-border)] overflow-hidden" id="hero">
            <div className="absolute inset-0 bg-dot-pattern opacity-75 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none dark:from-[var(--color-background)]" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-background-alt)] to-transparent pointer-events-none" />
            
            <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-accent)]/15 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen dark:bg-[var(--color-accent)]/10 animate-blob pointer-events-none" />
            <div className="absolute top-40 right-10 w-72 h-72 bg-[var(--color-primary)]/15 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen dark:bg-[var(--color-primary)]/10 animate-blob animation-delay-2000 pointer-events-none" />

			<div className="container-width relative">
				<div className="max-w-4xl mx-auto text-center mb-16 px-4">
					<MotionWrapper variant="fade-up" delay={0.1}>
                        <div className="inline-block mb-6 text-xs font-bold tracking-widest uppercase text-[var(--color-accent)]">
                            {t("badge")}
                        </div>
                    </MotionWrapper>

					<MotionWrapper variant="fade-up" delay={0.2}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] mb-6 leading-[1.15]">
                            {t("title")}
                        </h1>
                    </MotionWrapper>

					<MotionWrapper variant="fade-up" delay={0.3}>
                        <p className="text-lg md:text-xl text-[var(--color-muted)] mb-10 max-w-2xl mx-auto leading-relaxed">
                            {t("subtitle")}
                        </p>
                    </MotionWrapper>

					<MotionWrapper variant="fade-up" delay={0.4}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <div className="w-full sm:w-auto">
                                <PrimaryCta
                                    location="hero"
                                    size="large"
                                    showSubtext={false}
                                    className="w-full sm:w-auto"
                                />
                            </div>
                            <SecondaryCta href="#portfolio" location="hero-secondary" className="w-full sm:w-auto">
                                {t("ctaSecondary")}
                            </SecondaryCta>
                        </div>
                    </MotionWrapper>

					<MotionWrapper variant="fade-in" delay={0.6}>
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <Image
                                        key={i}
                                        src={`/images/people/${i}.jpg`}
                                        alt={`Client ${i}`}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full border-2 border-white dark:border-[var(--color-background-alt)] object-cover"
                                    />
                                ))}
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-foreground)]">
                                 <div className="flex text-[var(--color-warning)]">
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                 </div>
                                 <span>{t("socialProof.rating")}</span>
                                 <span className="text-[var(--color-muted)]">• {t("socialProof.reviews")}</span>
                            </div>
                        </div>
                    </MotionWrapper>
				</div>

				<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
					<MotionWrapper variant="fade-up" delay={0.7} className="h-full">
                        <div className="card-base text-left transition-transform hover:-translate-y-1 duration-300 h-full">
                            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/5 flex items-center justify-center text-[var(--color-primary)] mb-4">
                                <ShieldCheck className="size-5" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-[var(--color-primary)]">
                                {t("solutions.credibility.title")}
                            </h3>
                            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                                {t("solutions.credibility.description")}
                            </p>
                        </div>
                    </MotionWrapper>

					<MotionWrapper variant="fade-up" delay={0.8} className="h-full">
                        <div className="card-base text-left transition-transform hover:-translate-y-1 duration-300 border-[var(--color-accent)]/20 shadow-md h-full">
                            <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] mb-4">
                                <TrendingUp className="size-5" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-[var(--color-primary)]">
                                {t("solutions.conversion.title")}
                            </h3>
                            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                                {t("solutions.conversion.description")}
                            </p>
                        </div>
                    </MotionWrapper>

					<MotionWrapper variant="fade-up" delay={0.9} className="h-full">
                        <div className="card-base text-left transition-transform hover:-translate-y-1 duration-300 h-full">
                            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/5 flex items-center justify-center text-[var(--color-primary)] mb-4">
                                <MapPin className="size-5" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-[var(--color-primary)]">
                                {t("solutions.visibility.title")}
                            </h3>
                            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                                {t("solutions.visibility.description")}
                            </p>
                        </div>
                    </MotionWrapper>
				</div>
			</div>
		</section>
	);
}
