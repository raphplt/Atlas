import Image from "next/image";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

interface Testimonial {
	name: string;
	role: string;
	text: string;
	avatar: string;
	highlight?: boolean;
}

export function Testimonials() {
	const t = useTranslations("testimonials");

	const testimonials: Testimonial[] = [
		{
			name: t("testimonials.0.name"),
			role: t("testimonials.0.role"),
			text: t("testimonials.0.text"),
			avatar: "/images/testimonials/mickael.jpg",
			highlight: true,
		},
		{
			name: t("testimonials.1.name"),
			role: t("testimonials.1.role"),
			text: t("testimonials.1.text"),
			avatar: "/images/testimonials/karima.jpg",
		},
		{
			name: t("testimonials.2.name"),
			role: t("testimonials.2.role"),
			text: t("testimonials.2.text"),
			avatar: "/images/testimonials/didier.jpg",
		},
		{
			name: t("testimonials.3.name"),
			role: t("testimonials.3.role"),
			text: t("testimonials.3.text"),
			avatar: "/images/testimonials/claire.jpg",
		},
	];

	return (
		<section className="py-24 bg-[var(--color-background-alt)] border-t border-[var(--color-border)] relative overflow-hidden" id="temoignages">
            <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
			<div className="container-width relative">
				<div className="text-center mb-16 max-w-2xl mx-auto">
                    <MotionWrapper variant="fade-up">
					    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6">
						    {t("title")}
					    </h2>
                    </MotionWrapper>
                    <MotionWrapper variant="fade-up" delay={0.1}>
					    <p className="text-lg text-[var(--color-muted)]">
						    {t("subtitle")}
					    </p>
                    </MotionWrapper>
				</div>
                
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
					{testimonials.map((t, i) => (
                        <MotionWrapper 
                            key={i} 
                            variant="fade-up" 
                            delay={0.1 * i} 
                            className={`${t.highlight ? 'md:col-span-2' : ''}`}
                        >
                            <div className="p-8 bg-white rounded-lg border border-[var(--color-border)] shadow-sm flex flex-col h-full hover:border-[var(--color-primary)] transition-colors">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                        <Image
                                            src={t.avatar}
                                            alt={t.name}
                                            fill
                                            sizes="48px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-bold text-[var(--color-primary)] text-lg">
                                            {t.name}
                                        </div>
                                        <div className="text-sm text-[var(--color-muted)]">
                                            {t.role}
                                        </div>
                                    </div>
                                    <div className="ml-auto flex text-[var(--color-warning)]">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                </div>
                                
                                <blockquote className="text-[var(--color-foreground)] leading-relaxed flex-1">
                                    "{t.text}"
                                </blockquote>
                            </div>
                        </MotionWrapper>
                    ))}
				</div>
			</div>
		</section>
	);
}
