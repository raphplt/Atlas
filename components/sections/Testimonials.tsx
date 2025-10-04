import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";

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
		<section className="relative py-32 overflow-hidden" id="temoignages">
			<div
				className="absolute inset-0 tm-gradient opacity-60"
				aria-hidden="true"
			/>
			<div className="container relative">
				<h2 className="h2 text-center mb-6 motion-fade-in motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					{t("title")}
				</h2>
				<p className="mb-16 text-sm md:text-base font-medium tracking-wide flex items-center justify-center gap-4 text-[var(--color-muted)] motion-slide-up motion-delay-100 motion-duration-1000 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					<span className="hidden sm:inline-block h-px w-16 bg-gradient-to-r from-transparent via-[var(--color-border)] to-[var(--color-accent)] motion-scale-in motion-delay-200" />
					<span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] bg-clip-text text-transparent whitespace-nowrap">
						{t("subtitle")}
					</span>
					<span className="hidden sm:inline-block h-px w-16 bg-gradient-to-r from-[var(--color-accent-alt)] via-[var(--color-border)] to-transparent motion-scale-in motion-delay-300" />
				</p>
				<div className="grid gap-8 md:grid-cols-5 items-stretch">
					{/* Carte highlight */}
					{testimonials
						.filter((t) => t.highlight)
						.map((t) => (
							<Card
								key={t.name}
								className="md:col-span-2 p-10 flex flex-col justify-between relative overflow-hidden shadow-[var(--shadow)] motion-scale-in motion-delay-400 motion-intersect-start motion-intersect-end motion-intersect-threshold-50"
							>
								<span className="quote-icon motion-wiggle motion-delay-500">"</span>
								<div className="flex items-center gap-4 mb-6 motion-fade-in motion-delay-600">
									<div className="relative w-16 h-16 rounded-full overflow-hidden border border-[var(--color-border)] motion-scale-in motion-delay-700">
										<Image
											src={t.avatar}
											alt={t.name}
											fill
											sizes="(max-width: 768px) 100vw, 50vw"
											className="object-cover"
										/>
									</div>
									<div className="motion-slide-up motion-delay-800">
										<p className="font-semibold text-lg leading-tight">{t.name}</p>
										<p className="text-xs text-[var(--color-muted)]">{t.role}</p>
									</div>
								</div>
								<p className="text-base leading-relaxed text-[var(--color-fg-soft)] mb-8 motion-fade-in motion-delay-900">
									{t.text}
								</p>
								<div
									className="flex gap-1 text-xs motion-wiggle motion-delay-1000"
									aria-label="Note 5/5"
								>
									{Array.from({ length: 5 }).map((_, i) => (
										<span key={i} className="star motion-scale-in motion-delay-1100">
											★
										</span>
									))}
								</div>
							</Card>
						))}
					{/* Grille des autres */}
					<div className="md:col-span-3 grid gap-6 sm:grid-cols-2">
						{testimonials
							.filter((t) => !t.highlight)
							.map((t) => (
								<Card
									key={t.name}
									className="p-6 flex flex-col gap-4 relative overflow-hidden motion-fade-in motion-delay-500 motion-intersect-start motion-intersect-end motion-intersect-threshold-50"
								>
									<div className="flex items-center gap-3 motion-slide-up motion-delay-600">
										<div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--color-border)] motion-scale-in motion-delay-700">
											<Image
												src={t.avatar}
												alt={t.name}
												fill
												sizes="(max-width: 768px) 100vw, 50vw"
												className="object-cover"
											/>
										</div>
										<div className="motion-fade-in motion-delay-800">
											<p className="font-semibold leading-tight">{t.name}</p>
											<p className="text-xs text-[var(--color-muted)]">{t.role}</p>
										</div>
									</div>
									<p className="text-sm text-[var(--color-fg-soft)] leading-relaxed motion-slide-up motion-delay-900">
										"{t.text}"
									</p>
								</Card>
							))}
					</div>
				</div>
				{/* Marquee */}
				<div className="marquee mt-14 py-3 border-y border-[var(--color-border)] text-[11px] tracking-wide uppercase font-medium text-[var(--color-muted)] motion-slide-up motion-delay-1200 motion-intersect-start motion-intersect-end motion-intersect-threshold-75">
					<div className="marquee-track">
						{Array.from({ length: 2 }).map((_, loop) => (
							<span key={loop} className="flex gap-6">
								{Array.from({ length: 5 }, (_, idx) => (
									<span key={idx} className="flex items-center gap-2">
										<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] motion-wiggle motion-delay-1300" />
										{t(`marquee.${idx}`)}
									</span>
								))}
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
